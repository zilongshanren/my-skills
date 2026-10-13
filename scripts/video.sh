#!/usr/bin/env bash
# Render a bundled page to MP4 (1920x1080, frame-exact via __seek, audio taken from the page itself).
# Usage: video.sh <html> [out.mp4] [fps=30]   -> default out: <html dir>/<html name>.mp4 + "<name> 封面.png"
# Cover = the page's start card (title/kicker/subtitle, no play button): saved as png, embedded as the mp4 thumbnail,
# and used as video frame 0 (players/platforms that take the first frame as poster show the cover).
# Music is ducked under narration like the live page (runtime.js syncMusic: .55/.9 × .85).
set -euo pipefail
[ $# -ge 1 ] || { echo "usage: video.sh <html> [out.mp4] [fps]" >&2; exit 1; }
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
html="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
out="${2:-${html%.html}.mp4}"; fps="${3:-30}"
url="file://$(python3 -c 'import sys,urllib.parse;print(urllib.parse.quote(sys.argv[1]))' "$html")?t=0"
[ -x "$CHROME" ] || { echo "video: Chrome not found at $CHROME (set CHROME=…)" >&2; exit 1; }
prof="$(mktemp -d)"; work="$(mktemp -d)"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --mute-audio --user-data-dir="$prof" \
  --window-size=1920,1080 --remote-debugging-port=0 about:blank >/dev/null 2>&1 &
cpid=$!; trap 'kill $cpid 2>/dev/null; wait $cpid 2>/dev/null; rm -rf "$prof" "$work"' EXIT
for i in $(seq 50); do [ -s "$prof/DevToolsActivePort" ] && break; sleep 0.2; done
[ -s "$prof/DevToolsActivePort" ] || { echo "video: Chrome did not start" >&2; exit 1; }
port=$(head -1 "$prof/DevToolsActivePort")
node - "$port" "$url" "$work" "$fps" <<'JS'
const [port,url,work,fps]=process.argv.slice(2);
const fs=require('fs'),{spawn}=require('child_process'),sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  const page=(await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(p=>p.type==='page');
  const ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
  let id=0;const cbs={};ws.onmessage=e=>{const m=JSON.parse(e.data);if(cbs[m.id]){cbs[m.id](m);delete cbs[m.id]}
    else if(m.method==='Runtime.exceptionThrown'){const d=m.params.exceptionDetails;console.error('page exception:',d.exception?.description||d.text)}};
  // Chrome dying mid-run (crash/OOM) closes the socket: fail loudly instead of hanging or exiting 0 with missing output
  let fin=false;ws.onclose=()=>{if(!fin){console.error('video: Chrome connection closed before finishing');process.exit(1)}};
  const cmd=(method,params={})=>new Promise((res,rej)=>{const n=++id,to=setTimeout(()=>{delete cbs[n];rej(new Error(`CDP ${method} timed out (60s)`))},60000);
    cbs[n]=m=>{clearTimeout(to);m.error?rej(new Error(JSON.stringify(m.error))):res(m.result)};ws.send(JSON.stringify({id:n,method,params}))});
  const ev=async e=>{const r=await cmd('Runtime.evaluate',{expression:e,awaitPromise:true,returnByValue:true});const d=r.exceptionDetails;if(d)throw new Error(d.exception?.description||d.text);return r.result.value};
  await cmd('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});
  await cmd('Runtime.enable');await cmd('Page.navigate',{url});
  for(let i=0;!(await ev('!!window.__ready').catch(()=>false));i++){if(i>300)throw new Error('page never set window.__ready');await sleep(100)}
  await ev(`(()=>{const s=$('#start');s.style.transition='none';s.classList.remove('hide');$('#startBtn').style.display=$('.st-tips').style.display='none';__seek(0)})()`);
  await sleep(300);
  fs.writeFileSync(`${work}/cover.png`,Buffer.from((await cmd('Page.captureScreenshot',{format:'png'})).data,'base64'));
  const coverJpg=(await cmd('Page.captureScreenshot',{format:'jpeg',quality:95})).data;
  await ev(`$('#start').classList.add('hide')`);
  // frame-exact: CSS transitions run on wall clock, not page time
  await ev(`document.head.insertAdjacentHTML('beforeend','<style>*{transition:none!important;animation:none!important}</style>')`);
  // audio straight from the bundle + music ducking envelope from the timeline
  fs.writeFileSync(`${work}/narr.mp3`,Buffer.from(await ev('AUDIO_NARR'),'base64'));
  fs.writeFileSync(`${work}/mus.mp3`,Buffer.from(await ev('AUDIO_MUS'),'base64'));
  const iv=[];for(const[a,b]of await ev('TL.secs.flatMap(s=>s.sents.map(x=>[x.t0-.25,x.t1+.25]))')){const l=iv[iv.length-1];if(l&&a<=l[1])l[1]=Math.max(l[1],b);else iv.push([a,b])}
  const w=iv.map(([a,b])=>`min(clip((t-${(a-.3).toFixed(3)})/0.3,0,1),clip((${(b+.3).toFixed(3)}-t)/0.3,0,1))`).join('+')||'0';
  fs.writeFileSync(`${work}/af.txt`,`[2:a]volume='0.765-0.2975*min(1,${w})':eval=frame[m];[1:a][m]amix=inputs=2:duration=first:normalize=0[a]`);
  const dur=await ev('DUR'),n=Math.ceil(dur*fps);
  const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',fps,'-c:v','mjpeg','-i','-',
    '-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p',`${work}/v.mp4`],{stdio:['pipe','inherit','inherit']});
  const done=new Promise((res,rej)=>ff.on('close',c=>c?rej(new Error('ffmpeg exit '+c)):res()));
  for(let i=0;i<n;i++){
    let data=coverJpg;
    if(i>0){await ev(`__seek(${i/fps}),new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))`);
      ({data}=await cmd('Page.captureScreenshot',{format:'jpeg',quality:95}))}
    if(!ff.stdin.write(Buffer.from(data,'base64')))await new Promise(r=>ff.stdin.once('drain',r));
    if(i%(fps*10)===0)process.stderr.write(`\rframe ${i}/${n}`);
  }
  ff.stdin.end();await done;process.stderr.write(`\rframe ${n}/${n}\n`);fin=true;ws.close();
})().catch(e=>{console.error('video:',e.message);process.exit(1)});
JS
cover="${out%.mp4} 封面.png"; cp "$work/cover.png" "$cover"
ffmpeg -y -loglevel error -i "$work/v.mp4" -i "$work/narr.mp3" -i "$work/mus.mp3" -i "$cover" -filter_complex_script "$work/af.txt" \
  -map 0:v -map '[a]' -map 3:v -c:v:0 copy -c:v:1 mjpeg -disposition:v:1 attached_pic -c:a aac -b:a 192k -movflags +faststart "$out"
echo "-> $out"; echo "-> $cover"

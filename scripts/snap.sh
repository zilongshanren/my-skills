#!/usr/bin/env bash
# Headless screenshots of a bundled page at given times (Chrome via CDP, needs node>=22).
# Usage: snap.sh <html> <outdir> <t1> [t2 ...]   -> <outdir>/t<sec>.png (1920x1080)
# Loads <html>?t=0 once, waits for window.__ready (fonts + assets), then __seek(t) per shot.
# Each shot is also layout-checked: visible scene text/images that leave the frame or enter
# the subtitle band (y>880), and any visible scene shape / subtitle / fact card touching the
# watermark (#wm, 8px margin), and any visible scene shape touching the chapter tag (#chapTag, top-left
# lesson/title/sub, 8px margin), are printed to stderr as `layout t=…:` lines.
set -euo pipefail
[ $# -ge 3 ] || { echo "usage: snap.sh <html> <outdir> <t1> [t2 ...]" >&2; exit 1; }
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
html="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"; out="$2"; shift 2
mkdir -p "$out"
url="file://$(python3 -c 'import sys,urllib.parse;print(urllib.parse.quote(sys.argv[1]))' "$html")?t=0"
[ -x "$CHROME" ] || { echo "snap: Chrome not found at $CHROME (set CHROME=…)" >&2; exit 1; }
prof="$(mktemp -d)"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --mute-audio --user-data-dir="$prof" \
  --window-size=1920,1080 --remote-debugging-port=0 about:blank >/dev/null 2>&1 &
cpid=$!; trap 'kill $cpid 2>/dev/null; wait $cpid 2>/dev/null; rm -rf "$prof"' EXIT
for i in $(seq 50); do [ -s "$prof/DevToolsActivePort" ] && break; sleep 0.2; done
[ -s "$prof/DevToolsActivePort" ] || { echo "snap: Chrome did not start (no DevToolsActivePort after 10s)" >&2; exit 1; }
port=$(head -1 "$prof/DevToolsActivePort")
node - "$port" "$url" "$out" "$@" <<'JS'
const [port,url,out,...ts]=process.argv.slice(2);
const fs=require('fs'),sleep=ms=>new Promise(r=>setTimeout(r,ms));
// runs in the page; returns problem descriptions in 1920x1080 stage coordinates
const layout=()=>{const st=document.getElementById('stage').getBoundingClientRect(),k=1920/st.width,out=[];
  const op=e=>{let o=1;for(;e&&e.id!=='stage';e=e.parentElement){const c=getComputedStyle(e);if(c.display==='none'||c.visibility==='hidden')return 0;o*=+c.opacity}return o};
  const box=e=>{const r=e.getBoundingClientRect();return [r.left-st.left,r.top-st.top,r.right-st.left,r.bottom-st.top].map(v=>Math.round(v*k))};
  const say=(why,e,[x0,y0,x1,y1])=>out.push(`${why}: ${e.closest('.scene')?.id||e.id||e.className} <${e.tagName}> "${e.textContent.trim().slice(0,24)}" [${x0},${y0} ${x1},${y1}]`);
  const wm=document.getElementById('wm'),w=wm&&wm.textContent.trim()&&op(wm)?box(wm):null;
  const ct=document.getElementById('chapTag'),c=ct&&op(ct)>=.3?box(ct):null;
  const hit=(w,b)=>w&&b[0]<w[2]+8&&b[2]>w[0]-8&&b[1]<w[3]+8&&b[3]>w[1]-8,onWm=b=>hit(w,b);
  for(const sc of document.querySelectorAll('#scenes>.scene'))if(sc.style.display!=='none')for(const e of sc.querySelectorAll('text,image,rect,path,circle,ellipse,polygon,polyline,line,use')){
    const r=e.getBoundingClientRect();if(r.width<1&&r.height<1||op(e)<.3)continue;
    const b=box(e),[x0,y0,x1,y1]=b;
    if(/^(text|image)$/.test(e.tagName)){const why=x0<-2||y0<-2||x1>1922||y1>1082?'off-frame':y1>882?'subtitle band':'';if(why)say(why,e,b)}
    if(x1-x0>=1800&&y1-y0>=1000)continue; // full-frame backdrop
    if(onWm(b))say('watermark overlap',e,b);
    if(hit(c,b))say('chapter tag overlap',e,b)}
  for(const e of document.querySelectorAll('#subLine,#chapTag,#facts .fact'))if(op(e)>=.3&&onWm(box(e)))say('watermark overlap',e,box(e));
  return out};
(async()=>{
  const page=(await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(p=>p.type==='page');
  const ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
  let id=0,err=null;const cbs={};ws.onmessage=e=>{const m=JSON.parse(e.data);if(cbs[m.id]){cbs[m.id](m);delete cbs[m.id]}
    else if(m.method==='Runtime.exceptionThrown'){const d=m.params.exceptionDetails;err=`${d.exception?.description||d.text} (line ${d.lineNumber+1})`;console.error('page exception:',err)}
    else if(m.method==='Runtime.consoleAPICalled'&&/^(warning|error)$/.test(m.params.type))console.error(`page ${m.params.type}:`,m.params.args.map(a=>a.value??a.description).join(' '))};
  const cmd=(method,params={})=>new Promise((res,rej)=>{cbs[++id]=m=>m.error?rej(new Error(JSON.stringify(m.error))):res(m.result);ws.send(JSON.stringify({id,method,params}))});
  const ev=async e=>{const r=await cmd('Runtime.evaluate',{expression:e,awaitPromise:true,returnByValue:true});const d=r.exceptionDetails;if(d)throw new Error(d.exception?.description||d.text);return r.result.value};
  await cmd('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});
  await cmd('Runtime.enable');await cmd('Page.navigate',{url});
  for(let i=0;!(await ev('!!window.__ready').catch(()=>false));i++){if(err)throw new Error('page threw during load');if(i>300)throw new Error('page never set window.__ready');await sleep(100)}
  await sleep(1200); // let #start fade (.9s) finish
  for(const t of ts){
    await ev(`__seek(${+t}),new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))`);
    await sleep(300); // short CSS transitions (subtitle colors)
    const {data}=await cmd('Page.captureScreenshot',{format:'png'});
    fs.writeFileSync(`${out}/t${t}.png`,Buffer.from(data,'base64'));console.log(`${out}/t${t}.png`);
    for(const b of await ev(`(${layout})()`))console.error(`layout t=${t}: ${b}`);
  }
  ws.close();
})().catch(e=>{console.error('snap:',e.message);process.exit(1)});
JS

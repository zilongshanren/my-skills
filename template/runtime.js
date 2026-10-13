/* science-explainer runtime: generic engine. Expects globals TL, AUDIO_NARR, AUDIO_MUS (injected by bundle.py)
   and theme hooks themeInit(), renderBG(t), drawAmbient(t), chapNum(idx) (theme.js). */
/* ========= utilities ========= */
const $=(s,r=document)=>r.querySelector(s);
const clamp=(x,a=0,b=1)=>x<a?a:x>b?b:x;
const lerp=(a,b,p)=>a+(b-a)*p;
const P=(t,a,b)=>clamp((t-a)/(b-a));
const E={
  out:p=>1-Math.pow(1-p,3), in:p=>p*p*p, io:p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2,
  q:p=>1-(1-p)*(1-p), sine:p=>-(Math.cos(Math.PI*p)-1)/2,
  back:p=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(p-1,3)+c1*Math.pow(p-1,2)},
  expo:p=>p>=1?1:1-Math.pow(2,-10*p)
};
const EP=(t,a,b,e='out')=>E[e](P(t,a,b));
const win=(t,a,b,fi=.6,fo=.6)=>Math.min(P(t,a,a+fi),1-P(t,b-fo,b));
const hash=i=>{let x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)};
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const f1=v=>Math.round(v*10)/10;
function tf(x,y,s=1,r=0,sy){let o=`translate(${f1(x)} ${f1(y)})`;if(r)o+=` rotate(${f1(r)})`;if(sy!==undefined)o+=` scale(${(+s).toFixed(4)} ${(+sy).toFixed(4)})`;else if(s!==1)o+=` scale(${(+s).toFixed(4)})`;return o}
function op(el,v){if(!el)return;v=v<.002?0:Math.round(v*1000)/1000;const c=el._c||(el._c={});if(c.o!==v){el.style.opacity=v;if((c.o===0)!==(v===0)||c.o===undefined)el.style.display=v===0?'none':'';c.o=v}}
function tr(el,x,y,s,r,sy){if(!el)return;const v=tf(x,y,s,r,sy);const c=el._c||(el._c={});if(c.t!==v){el.setAttribute('transform',v);c.t=v}}
function at(el,k,v){if(!el)return;const c=el._c||(el._c={});if(c[k]!==v){el.setAttribute(k,v);c[k]=v}}
function css(el,k,v){const c=el._c||(el._c={});if(c['s'+k]!==v){el.style[k]=v;c['s'+k]=v}}
/* ========= timeline data ========= */
const SEC={};TL.secs.forEach((s,i)=>{s.idx=i;SEC[s.key]=s});
const S=(k,i)=>SEC[k].sents[i].t0, SE=(k,i)=>SEC[k].sents[i].t1;
function W(k,i,str,n=0){const s=SEC[k].sents[i];let j=-1;for(let m=0;m<=n;m++){j=s.text.indexOf(str,j+1)}if(j<0){console.warn('W miss',k,i,str);return s.t0}return s.ct[j]}
function CH(k,i,c){return SEC[k].sents[i].chunks[c].ch[0]}
const DUR=TL.total;
/* ========= SVG helpers ========= */
const NS='http://www.w3.org/2000/svg';
const scenes=[];
function scene(id,t0,t1,markup,update,o={}){
  const s=document.createElementNS(NS,'svg');s.setAttribute('viewBox','0 0 1920 1080');s.setAttribute('class','scene');s.id='sc-'+id;
  s.innerHTML=markup;$('#scenes').appendChild(s);
  const R={};s.querySelectorAll('[k]').forEach(e=>{R[e.getAttribute('k')]=e});
  const sc={id,t0,t1,el:s,R,update,fi:o.fi??.7,fo:o.fo??.7,zoom:o.zoom??.035,shown:false};
  scenes.push(sc);return sc;
}
function vtext(str,x,y,size,gap,attrs=''){gap=gap||size*1.12;let o=`<text ${attrs} font-size="${size}" text-anchor="middle">`;[...str].forEach((c,i)=>{o+=`<tspan x="${x}" y="${y+i*gap+size*.88}">${c}</tspan>`});return o+'</text>'}
function vcols(lines,xRight,y,size,colGap,gap,attrs=''){let o='';lines.forEach((l,i)=>{o+=vtext(l,xRight-i*colGap,y,size,gap,attrs)});return o}
/* ========= assets ========= */
const ASSET={},ASSET_JOBS={};
function asset(k,job){ASSET_JOBS[k]=job} // job: ()=>Promise<url>|url, run once in init after fonts load
async function buildAssets(){const ks=Object.keys(ASSET_JOBS);const vs=await Promise.all(ks.map(k=>ASSET_JOBS[k]()));ks.forEach((k,i)=>ASSET[k]=vs[i])}
function defs(markup){$('#defs defs').insertAdjacentHTML('beforeend',markup)}
function svgURL(s){return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s)}
function rasterSVG(svg,w,h){return new Promise(res=>{const img=new Image();img.onload=()=>{try{const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);c.toBlob(b=>res(b?URL.createObjectURL(b):svgURL(svg)),'image/png')}catch(e){res(svgURL(svg))}};img.onerror=()=>res(svgURL(svg));img.src=svgURL(svg)})}
function canvasURL(c){return new Promise(res=>{try{c.toBlob(b=>res(URL.createObjectURL(b)),'image/png')}catch(e){res(c.toDataURL())}})}
const BUILDERS=[];function buildScenes(){BUILDERS.forEach(f=>f())}
/* ========= geometry ========= */
function smoothPath(pts){if(pts.length<2)return'';let d=`M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];d+=` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`}return d}
/* path measurement helper */
function pathAt(el,p){const L=el._len||(el._len=el.getTotalLength());const q=el.getPointAtLength(clamp(p)*L);const q2=el.getPointAtLength(clamp(p+.002)*L);return{x:q.x,y:q.y,a:Math.atan2(q2.y-q.y,q2.x-q.x)*180/Math.PI}}
function drawP(el,p){at(el,'stroke-dashoffset',(1-clamp(p)).toFixed(4))}
/* stamp anim: returns [opacity, scale] */
function stampA(t,t0){const p=P(t,t0,t0+.28);return[p>0?Math.min(1,p*3):0,lerp(2.1,1,E.out(p))]}
/* ========= FX canvas ========= */
const fxc=$('#fx'),fx=fxc.getContext('2d');
const fxList=[];
function addFX(t0,t1,draw){fxList.push({t0,t1,draw})}
/* ========= facts ========= */
const FACTS=[];
function fact(t0,t1,x,y,w,tag,title,body,dark){FACTS.push({t0,t1,x,y,w,tag,title,body,dark})}
function buildFacts(){const box=$('#facts');FACTS.forEach(f=>{const d=document.createElement('div');d.className='fact'+(f.dark?' dark':'');d.style.left=f.x+'px';d.style.top=f.y+'px';d.style.width=f.w+'px';d.innerHTML=(f.tag?`<div class="tag">${f.tag}</div>`:'')+(f.title?`<div class="ft">${f.title}</div>`:'')+(f.body?`<div class="fb">${f.body}</div>`:'');box.appendChild(d);f.el=d})}
function renderFacts(t){for(const f of FACTS){const a=P(t,f.t0,f.t0+.7),b=1-P(t,f.t1-.5,f.t1);const v=Math.min(a,b);if(v<=0){css(f.el,'display','none');continue}css(f.el,'display','block');css(f.el,'opacity',v.toFixed(3));css(f.el,'transform',`translate(${((1-E.out(a))*34).toFixed(1)}px,${((1-b)*-10).toFixed(1)}px)`)}}
/* ========= subtitles ========= */
const CHUNKS=[];TL.secs.forEach(s=>s.sents.forEach(se=>se.chunks.forEach((c,i)=>{CHUNKS.push({text:c.text,ch:c.ch,t0:c.ch[0]-.08,t1:i<se.chunks.length-1?se.chunks[i+1].ch[0]-.08:se.t1+.35})})));
let subIdx=-1,subSpans=[];const subLine=$('#subLine');
function renderSubs(t){let k=-1;for(let i=0;i<CHUNKS.length;i++){if(t>=CHUNKS[i].t0&&t<CHUNKS[i].t1){k=i;break}}
  if(k!==subIdx){subIdx=k;subLine.innerHTML='';subSpans=[];if(k>=0){[...CHUNKS[k].text].forEach(c=>{const s=document.createElement('span');s.textContent=c;subLine.appendChild(s);subSpans.push(s)})}}
  if(k<0){css(subLine,'opacity','0');return}
  const c=CHUNKS[k];css(subLine,'opacity',Math.min(1,P(t,c.t0,c.t0+.18)*1).toFixed(2));
  subSpans.forEach((s,i)=>{const on=t>=(c.ch[i]??c.t0)-.02;if(s._on!==on){s._on=on;s.className=on?'on':''}})}
/* ========= chapter tag ========= */
const chapTag=$('#chapTag');
const NIGHT=[];function nightWin(a,b){NIGHT.push([a,b])}
const isNight=t=>NIGHT.some(([a,b])=>t>a&&t<b);
function renderChap(t){let s=null;for(const x of TL.secs){if(x.key!=='intro'&&x.key!=='outro'&&t>=x.start-.1&&t<x.end-.3)s=x}
  if(!s){css(chapTag,'opacity','0');return}
  if(chapTag._k!==s.key){chapTag._k=s.key;$('#chapNum').textContent=chapNum(s.idx);$('#chapTitle').textContent=s.title.replace(/^(\d+\s+|.、)/,'');$('#chapSub').textContent=s.sub}
  const v=Math.min(P(t,s.start-.1,s.start+.8),1-P(t,s.end-.9,s.end-.3));css(chapTag,'opacity',v.toFixed(3));css(chapTag,'transform',`translateX(${((1-E.out(P(t,s.start-.1,s.start+.8)))*-30).toFixed(1)}px)`);
  const dk=isNight(t);if(chapTag._d!==dk){chapTag._d=dk;chapTag.classList.toggle('dark',dk)}}
/* ========= background mood ========= */
const MOOD=[]; // [t, intensity 0..1] keyframes pushed by scenes; theme's renderBG reads mood(t)
function mood(t){if(!MOOD.length)return .2;if(t<=MOOD[0][0])return MOOD[0][1];for(let i=1;i<MOOD.length;i++){if(t<MOOD[i][0]){const a=MOOD[i-1],b=MOOD[i];return lerp(a[1],b[1],E.sine(P(t,a[0],b[0])))}}return MOOD[MOOD.length-1][1]}
/* ========= roaming watermark (anti-piracy) ========= */
// deterministic in t, so the page and every exported frame agree; spots stay clear of the chapter tag and subtitles
const wm2=$('#wm2'),WM_SLOT=18;
function renderWm2(t){if(!wm2.textContent.trim())return;const i=Math.floor(t/WM_SLOT),u=t-i*WM_SLOT;
  css(wm2,'opacity',Math.min(P(u,0,.8),1-P(u,WM_SLOT-.8,WM_SLOT)).toFixed(3));
  css(wm2,'transform',`translate(${(260+hash(i)*1200).toFixed(0)}px,${(170+hash(i+.5)*620).toFixed(0)}px) rotate(-12deg)`)}
/* ========= render ========= */
let shakeX=0,shakeY=0;
function render(t){
  renderBG(t);
  for(const sc of scenes){let v=win(t,sc.t0,sc.t1,sc.fi,sc.fo);
    if(v<=0){if(sc.shown){sc.el.style.display='none';sc.shown=false}continue}
    if(!sc.shown){sc.el.style.display='block';sc.shown=true}
    css(sc.el,'opacity',v.toFixed(3));const z=1+sc.zoom*P(t,sc.t0,sc.t1);
    sc.update(t,sc.R,sc);
    const zz=sc.zoomOverride??z;sc._z=zz;css(sc.el,'transform',`translate(${(sc.sx||0).toFixed(1)}px,${(sc.sy||0).toFixed(1)}px) scale(${zz.toFixed(4)})`);
  }
  fx.clearRect(0,0,1920,1080);drawAmbient(t);
  for(const f of fxList){if(t>=f.t0&&t<=f.t1){fx.save();f.draw(fx,t);fx.restore()}}
  renderSubs(t);renderFacts(t);renderChap(t);renderWm2(t);
}
/* ========= audio & clock ========= */
function b64blob(b64,type){const bin=atob(b64);const u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return URL.createObjectURL(new Blob([u],{type}))}
const narr=new Audio(),mus=new Audio();narr.preload='auto';mus.preload='auto';
let started=false,debugT=null,musOn=true,subOn=true;
const qs=new URLSearchParams(location.search);
let clk={t:0,at:0};
function now(){if(debugT!==null)return debugT;const ct=narr.currentTime,pn=performance.now();
  if(narr.paused||narr.seeking||narr.ended){clk={ct,t:ct,at:pn};return ct}
  if(ct!==clk.ct){const est=clk.t+(pn-clk.at)/1000*narr.playbackRate;const base=Math.abs(est-ct)<.08?est:ct;clk={ct,t:base,at:pn};return base}
  return Math.min(clk.t+(pn-clk.at)/1000*narr.playbackRate,DUR)}
function speaking(t){for(const s of TL.secs)for(const x of s.sents)if(t>x.t0-.25&&t<x.t1+.25)return true;return false}
let musVol=0;
function syncMusic(t){if(!started)return;const want=musOn&&!narr.paused&&!narr.ended;
  if(want){if(mus.paused)mus.play().catch(()=>{});if(Math.abs(mus.currentTime-t)>.3&&mus.readyState>=2)mus.currentTime=t}else if(!mus.paused)mus.pause();
  const target=speaking(t)?.55:.9;musVol+= (target-musVol)*.05;mus.volume=clamp(musVol*.85)}
/* ========= UI ========= */
const fmt=s=>{s=Math.max(0,s);return`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`};
const chapStarts=TL.secs.map(s=>({key:s.key,t:s.key==='intro'?0:s.card,title:s.key==='intro'?'片头':s.title}));
function seek(t){t=clamp(t,0,DUR-.05);if(debugT!==null){debugT=t;return}narr.currentTime=t;if(mus.readyState>=1)mus.currentTime=t;clk={t,at:performance.now()};$('#endCard').classList.remove('show')}
function curChap(t){let c=0;chapStarts.forEach((x,i)=>{if(t>=x.t-.01)c=i});return c}
function setupUI(){
  const marks=$('#marks');chapStarts.forEach(c=>{const m=document.createElement('div');m.className='mk';m.style.left=(c.t/DUR*100)+'%';m.innerHTML=`<span>${c.title}</span>`;marks.appendChild(m)});
  const menu=$('#chapMenu');chapStarts.forEach((c,i)=>{const d=document.createElement('div');d.innerHTML=`<span>${c.title}</span><small>${fmt(c.t)}</small>`;d.onclick=e=>{e.stopPropagation();seek(c.t+.01);menu.classList.remove('open');if(started&&narr.paused)play()};menu.appendChild(d)});
  $('#bMenu').onclick=e=>{e.stopPropagation();menu.classList.toggle('open')};document.addEventListener('click',()=>menu.classList.remove('open'));
  const bar=$('#bar');let drag=false;const pos=e=>{const r=bar.getBoundingClientRect();return clamp((e.clientX-r.left)/r.width)*DUR};
  bar.addEventListener('pointerdown',e=>{drag=true;bar.setPointerCapture(e.pointerId);seek(pos(e))});
  bar.addEventListener('pointermove',e=>{const h=$('#barHover');const r=bar.getBoundingClientRect();const t=pos(e);h.style.display='block';h.style.left=(e.clientX-r.left)+'px';h.textContent=fmt(t)+' · '+chapStarts[curChap(t)].title;if(drag)seek(t)});
  bar.addEventListener('pointerup',()=>drag=false);bar.addEventListener('pointerleave',()=>$('#barHover').style.display='none');
  $('#bPlay').onclick=toggle;$('#bPrev').onclick=()=>{const t=now();let c=curChap(t);if(t-chapStarts[c].t<2&&c>0)c--;seek(chapStarts[c].t+.01)};$('#bNext').onclick=()=>{const c=curChap(now());if(c<chapStarts.length-1)seek(chapStarts[c+1].t+.01)};
  $('#bSub').onclick=toggleSub;$('#bMus').onclick=toggleMus;$('#bFs').onclick=toggleFs;
  $('#replayBtn').onclick=()=>{seek(0);play()};
  $('#stage').addEventListener('click',e=>{if(!started||e.target.closest('#endCard'))return;toggle()});
  document.addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();if(!started)startShow();else toggle()}else if(e.code==='ArrowRight'){seek(now()+5);poke()}else if(e.code==='ArrowLeft'){seek(now()-5);poke()}else if(e.key==='f'||e.key==='F')toggleFs();else if(e.key==='c'||e.key==='C')toggleSub();else if(e.key==='m'||e.key==='M')toggleMus()});
  let hideT=0;const ui=$('#ui');window.poke=()=>{ui.classList.add('show');document.body.classList.add('uishow');document.body.style.cursor='';clearTimeout(hideT);hideT=setTimeout(()=>{if(!narr.paused){ui.classList.remove('show');document.body.classList.remove('uishow');document.body.style.cursor='none'}},2600)};
  document.addEventListener('mousemove',poke);
  narr.addEventListener('ended',()=>{$('#endCard').classList.add('show');ui.classList.add('show');document.body.classList.add('uishow')});
  narr.addEventListener('pause',()=>{$('#bPlay').textContent='▶';ui.classList.add('show');document.body.classList.add('uishow')});narr.addEventListener('play',()=>{$('#bPlay').textContent='❚❚';poke()});
}
function play(){narr.play().catch(err=>console.warn(err))}
function toggle(){if(narr.paused)play();else narr.pause()}
function toggleSub(){subOn=!subOn;$('#subs').classList.toggle('off',!subOn);$('#bSub').classList.toggle('on',subOn)}
function toggleMus(){musOn=!musOn;$('#bMus').classList.toggle('on',musOn)}
function toggleFs(){if(!document.fullscreenElement)(document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen).call(document.documentElement);else document.exitFullscreen()}
function startShow(){if(started||$('#startBtn').disabled)return;started=true;$('#start').classList.add('hide');seek(0);play();if(musOn){mus.currentTime=0;musVol=.9;mus.volume=.75;mus.play().catch(()=>{})}}
function fit(){const k=Math.min(innerWidth/1920,innerHeight/1080);$('#stage').style.transform=`translate(${(innerWidth-1920*k)/2}px,${(innerHeight-1080*k)/2}px) scale(${k})`;$('#stage').style.left='0';$('#stage').style.top='0'}
let lastT=-1,uiT=0;
function frame(){const t=now();if(t!==lastT){render(t);lastT=t}
  syncMusic(t);const pn=performance.now();if(pn-uiT>100){uiT=pn;$('#barFill').style.width=(t/DUR*100)+'%';$('#knob').style.left=(t/DUR*100)+'%';$('#time').textContent=fmt(t)+' / '+fmt(DUR);const c=chapStarts[curChap(t)];$('#curChap').textContent=c.title;
    [...$('#chapMenu').children].forEach((d,i)=>d.classList.toggle('cur',i===curChap(t)))}
  requestAnimationFrame(frame)}
async function init(){
  fit();addEventListener('resize',fit);
  try{await Promise.all([...document.fonts].map(f=>f.load()))}catch(e){}
  await buildAssets();
  themeInit();
  buildScenes();buildFacts();setupUI();if(ASSET.sTitle){const si=document.createElement('img');si.src=ASSET.sTitle;$('.st-title').appendChild(si)}
  narr.src=b64blob(AUDIO_NARR,'audio/mpeg');mus.src=b64blob(AUDIO_MUS,'audio/mpeg');
  const btn=$('#startBtn');btn.disabled=false;$('#startLbl').textContent='点击开始';btn.onclick=e=>{e.stopPropagation();startShow()};
  if(qs.has('t')){debugT=parseFloat(qs.get('t'))||0;$('#start').classList.add('hide');started=false}
  window.__seek=t=>{debugT=t;render(t);lastT=t};window.__ready=true;
  requestAnimationFrame(frame);
}

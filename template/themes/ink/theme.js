/* ink theme (国风水墨). Contract: see reference/authoring.md § Theme contract.
   Provides: background DOM + themeInit/renderBG/drawAmbient, chapNum, chapterCard, makeSeal, generic SVG defs, theme assets. */
$('#scenes').insertAdjacentHTML('beforebegin','<div id="paper"></div><div id="mtns"><img id="m0" alt=""><img id="m1" alt=""><img id="m2" alt=""></div>');
$('#subs').insertAdjacentHTML('afterend','<div id="vignette"></div>');
defs(`
  <linearGradient id="gGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1d58e"/><stop offset=".5" stop-color="#c9a24f"/><stop offset="1" stop-color="#8f6a26"/></linearGradient>
  <linearGradient id="gGoldH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b58a3a" stop-opacity="0"/><stop offset=".5" stop-color="#d9b566"/><stop offset="1" stop-color="#b58a3a" stop-opacity="0"/></linearGradient>
  <linearGradient id="gSheet" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbf6ea"/><stop offset="1" stop-color="#efe5cf"/></linearGradient>
  <radialGradient id="gGlow"><stop offset="0" stop-color="#fff6d8" stop-opacity="1"/><stop offset=".35" stop-color="#f3cf7a" stop-opacity=".55"/><stop offset="1" stop-color="#e0a840" stop-opacity="0"/></radialGradient>
  <radialGradient id="gWash" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#3b352d" stop-opacity=".55"/><stop offset=".6" stop-color="#5a5145" stop-opacity=".22"/><stop offset="1" stop-color="#5a5145" stop-opacity="0"/></radialGradient>
  <radialGradient id="gShadow"><stop offset="0" stop-color="#2a2016" stop-opacity=".35"/><stop offset="1" stop-color="#2a2016" stop-opacity="0"/></radialGradient>
  <filter id="fGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="fShadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#2a1d10" flood-opacity=".28"/></filter>
  <filter id="fBlur8"><feGaussianBlur stdDeviation="8"/></filter>
`);
function paperTexture(){
  const N=1024,c=document.createElement('canvas');c.width=c.height=N;const g=c.getContext('2d');
  g.fillStyle='#ece2cb';g.fillRect(0,0,N,N);
  const id=g.getImageData(0,0,N,N),d=id.data,r=rng(7);
  // value noise (tileable) at two scales
  const grid=(n)=>{const a=new Float32Array(n*n);for(let i=0;i<n*n;i++)a[i]=r();return a};
  const g1=grid(16),g2=grid(64),g3=grid(256);
  const smp=(a,n,x,y)=>{x=x*n/N;y=y*n/N;const x0=Math.floor(x),y0=Math.floor(y),fx=x-x0,fy=y-y0;const X0=x0%n,Y0=y0%n,X1=(x0+1)%n,Y1=(y0+1)%n;const sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy);return lerp(lerp(a[Y0*n+X0],a[Y0*n+X1],sx),lerp(a[Y1*n+X0],a[Y1*n+X1],sx),sy)};
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){const v=smp(g1,16,x,y)*.5+smp(g2,64,x,y)*.3+smp(g3,256,x,y)*.2;const gr=(r()-.5)*10;const k=(y*N+x)*4;const dv=(v-.5)*22+gr;d[k]+=dv;d[k+1]+=dv*.95;d[k+2]+=dv*.8}
  g.putImageData(id,0,0);
  // fibers
  for(let i=0;i<900;i++){const x=r()*N,y=r()*N,l=8+r()*40,a=r()*Math.PI*2;g.strokeStyle=`rgba(${120+r()*60|0},${100+r()*40|0},${70},${.05+r()*.1})`;g.lineWidth=.4+r()*.9;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+Math.cos(a+.5)*l*.5,y+Math.sin(a+.5)*l*.5,x+Math.cos(a)*l,y+Math.sin(a)*l);g.stroke()}
  for(let i=0;i<260;i++){g.fillStyle=`rgba(90,70,40,${r()*.12})`;g.beginPath();g.arc(r()*N,r()*N,r()*1.4,0,7);g.fill()}
  return canvasURL(c);
}
function mountainSVG(seed,w,h,o){
  const r=rng(seed);const ys=[];const peaks=[];for(let i=0;i<o.n;i++)peaks.push([r()*w,o.amp*(.45+r()*.55),o.wid*(.6+r()*.8)]);
  let minY=h;for(let x=0;x<=w;x+=6){let y=o.base;for(const[c,a,wd]of peaks){const d=(x-c)/wd;y-=a*Math.exp(-d*d)}y-=Math.sin(x*.013+seed)*o.amp*.06+Math.sin(x*.041+seed*2)*o.amp*.03;minY=Math.min(minY,y);ys.push(y)}
  const k=Math.min(1,(o.base-60)/(o.base-minY)); // squash heights so peaks stay inside the canvas (else cropped flat)
  const pts=ys.map((y,i)=>`${i*6},${(o.base-(o.base-y)*k).toFixed(1)}`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="${minY}" x2="0" y2="${h}"><stop offset="0" stop-color="${o.col}" stop-opacity="${o.top}"/><stop offset=".45" stop-color="${o.col}" stop-opacity="${o.top*.55}"/><stop offset="1" stop-color="${o.col}" stop-opacity="0"/></linearGradient>
  <filter id="f" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.006 0.02" numOctaves="4" seed="${seed}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="${o.rough}" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency="0.012 0.07" numOctaves="3" seed="${seed+9}" result="n2"/><feColorMatrix in="n2" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.9 1.75" result="m"/><feComposite in="d" in2="m" operator="in" result="t"/><feGaussianBlur in="t" stdDeviation="${o.blur}"/></filter></defs>
  <path filter="url(#f)" fill="url(#g)" d="M0,${h} L${pts.join(' L')} L${w},${h} Z"/></svg>`;
}
function layerSVG(seed,w,h,peaks,base,col,top,rough,blur){
  let pts=[],minY=h;for(let x=0;x<=w;x+=4){let y=base;for(const[c,a,wd]of peaks){const d=(x-c)/wd;y-=a*Math.exp(-d*d*(d<0?1.4:1))}y-=Math.sin(x*.05+seed)*4;minY=Math.min(minY,y);pts.push(`${x},${y.toFixed(1)}`)}
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="${minY}" x2="0" y2="${base+20}"><stop offset="0" stop-color="${col}" stop-opacity="${top}"/><stop offset=".5" stop-color="${col}" stop-opacity="${top*.6}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></linearGradient>
  <filter id="f" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="4" seed="${seed}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="${rough}" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency="0.03 0.15" numOctaves="3" seed="${seed+5}" result="n2"/><feColorMatrix in="n2" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -2.2 1.9" result="m"/><feComposite in="d" in2="m" operator="in" result="t"/><feGaussianBlur in="t" stdDeviation="${blur}"/></filter></defs>
  <path filter="url(#f)" fill="url(#g)" d="M0,${h} L${pts.join(' L')} L${w},${h} Z"/></svg>`}
function blotSVG(seed){
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000"><defs><radialGradient id="g"><stop offset="0" stop-color="#1c1915" stop-opacity=".95"/><stop offset=".55" stop-color="#2a2620" stop-opacity=".6"/><stop offset=".85" stop-color="#3b352c" stop-opacity=".22"/><stop offset="1" stop-color="#3b352c" stop-opacity="0"/></radialGradient>
  <filter id="f" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.009" numOctaves="5" seed="${seed}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="160" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="1.4"/></filter></defs>
  <circle cx="500" cy="500" r="330" fill="url(#g)" filter="url(#f)"/><circle cx="520" cy="470" r="200" fill="url(#g)" opacity=".7" filter="url(#f)"/></svg>`;
}
function strokeSVG(seed,col='#16130f'){
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="340" viewBox="0 0 1500 340"><defs>
  <filter id="f" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.004 0.09" numOctaves="3" seed="${seed}" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -3.2 2.45" result="m"/><feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="${seed+3}" result="n2"/><feDisplacementMap in="SourceGraphic" in2="n2" scale="26" xChannelSelector="R" yChannelSelector="G" result="d"/><feComposite in="d" in2="m" operator="in"/></filter></defs>
  <path filter="url(#f)" fill="${col}" d="M40,190 C120,120 300,70 520,66 C800,60 1100,72 1380,96 C1440,102 1470,130 1460,165 C1450,205 1400,236 1330,246 C1100,272 820,282 560,276 C340,272 160,262 70,240 C30,230 20,210 40,190Z"/></svg>`;
}
function makeSeal(text,size,{shape='sq',font='MSZ'}={}){
  const c=document.createElement('canvas');const W=size*2,H=shape==='tall'?size*2*1.6:size*2;c.width=W;c.height=H;const g=c.getContext('2d');const r=rng(text.length*31+size);
  g.fillStyle='#b8321f';const pad=W*.04;const rr=W*.06;
  g.beginPath();g.roundRect?g.roundRect(pad,pad,W-2*pad,H-2*pad,rr):g.rect(pad,pad,W-2*pad,H-2*pad);g.fill();
  g.strokeStyle='#f6ead2';g.lineWidth=W*.022;g.strokeRect(pad+W*.06,pad+W*.06,W-2*pad-W*.12,H-2*pad-W*.12);
  g.fillStyle='#f6ead2';g.textAlign='center';g.textBaseline='middle';
  const ch=[...text];const fam=`"${font}","NSerif",serif`;
  if(ch.length===1){g.font=`${W*.62}px ${fam}`;g.fillText(ch[0],W/2,H/2+W*.02)}
  else if(ch.length===2){g.font=`${H*.36}px ${fam}`;g.fillText(ch[0],W/2,H*.31);g.fillText(ch[1],W/2,H*.69)}
  else if(ch.length===3){g.font=`${H*.26}px ${fam}`;ch.forEach((x,i)=>g.fillText(x,W/2,H*(.22+i*.28)))}
  else {g.font=`${W*.36}px ${fam}`;const pos=[[.71,.3],[.71,.7],[.29,.3],[.29,.7]];ch.slice(0,4).forEach((x,i)=>g.fillText(x,W*pos[i][0],H*pos[i][1]+W*.01))}
  g.globalCompositeOperation='destination-out';
  for(let i=0;i<260;i++){const x=r()*W,y=r()*H;g.globalAlpha=.25+r()*.6;g.beginPath();g.arc(x,y,r()*W*.012,0,7);g.fill()}
  for(let i=0;i<120;i++){const e=r()*4|0;const t=r();const x=e<2?t*W:(e===2?r()*pad*1.6:W-r()*pad*1.6),y=e>=2?t*H:(e===0?r()*pad*1.6:H-r()*pad*1.6);g.globalAlpha=.8;g.beginPath();g.arc(x,y,W*(.01+r()*.025),0,7);g.fill()}
  g.globalAlpha=1;g.globalCompositeOperation='source-over';
  return canvasURL(c);
}
asset('paper',paperTexture);
asset('m0',()=>rasterSVG(mountainSVG(11,2400,620,{n:9,amp:330,wid:200,base:600,col:'#7b8580',top:.42,rough:40,blur:2.4}),2400,620));
asset('m1',()=>rasterSVG(mountainSVG(23,2400,600,{n:7,amp:300,wid:170,base:590,col:'#4f5752',top:.55,rough:46,blur:1.4}),2400,600));
asset('m2',()=>rasterSVG(mountainSVG(37,2400,560,{n:6,amp:240,wid:150,base:560,col:'#24282a',top:.72,rough:50,blur:.8}),2400,560));
asset('blot',()=>rasterSVG(blotSVG(5),1000,1000));
asset('blot2',()=>rasterSVG(blotSVG(17),1000,1000));
asset('stroke',()=>rasterSVG(strokeSVG(4),1500,340));
asset('pl0',()=>rasterSVG(layerSVG(3,840,480,[[560,250,70],[660,190,60],[470,150,80],[760,120,60]],330,'#7d8a88',.5,22,1.6),840,480));
asset('pl1',()=>rasterSVG(layerSVG(8,840,480,[[600,170,55],[500,120,60],[700,100,50],[380,70,60]],400,'#454b48',.7,26,1),840,480));
asset('pl2',()=>rasterSVG(layerSVG(14,840,480,[[120,230,60],[40,180,70],[220,120,50]],470,'#1f2321',.85,30,.6),840,480));
/* ---- chapter card ---- */
function chapterCard(key,sealKey){
  const sec=SEC[key];const nc=TL.secs.length-2,end=key==='outro';const numeral=end?'终':chapNum(sec.idx),chapLabel=end?[...sec.title].join(' '):`第 ${CN[sec.idx]} 章`;const t0=sec.card,t1=sec.start+.6;const title=sec.title.replace(/^.、/,'');const n=[...title].length;
  let tc='';[...title].forEach((c,i)=>{tc+=`<text k="c${i}" class="msz" x="0" y="0" font-size="176" text-anchor="middle" fill="#f4ecd8">${c}</text>`});
  const ew=[...sec.sub].length*46;let dots='';for(let i=1;i<=nc;i++)dots+=`<rect x="${960+(i-(nc+1)/2)*34-6}" y="784" width="12" height="12" transform="rotate(45 ${960+(i-(nc+1)/2)*34} 790)" fill="${i===sec.idx?'#b5301f':'none'}" stroke="#b5301f" stroke-width="1.5"/>`;
  const m=`<text k="num" class="msz" x="1420" y="930" font-size="780" text-anchor="middle" fill="#1a1612">${numeral}</text>
  <g transform="translate(960 470)"><clipPath id="cc-${key}"><rect k="clip" x="-760" y="-180" width="0" height="360"/></clipPath><image href="${ASSET.stroke}" x="-750" y="-170" width="1500" height="340" clip-path="url(#cc-${key})"/></g>
  <g k="tg">${tc}</g>
  <text k="chap" x="960" y="262" font-size="30" letter-spacing="20" fill="#8a6d45" text-anchor="middle">${chapLabel}</text>
  <g k="eraG"><text x="960" y="724" font-size="44" letter-spacing="10" fill="#3e3022" text-anchor="middle">${sec.sub}</text>
  <rect k="gl" x="${960-ew/2-250}" y="708" width="210" height="2" fill="url(#gGoldH)"/><rect k="gr" x="${960+ew/2+40}" y="708" width="210" height="2" fill="url(#gGoldH)"/></g>
  <g k="dots">${sec.idx<=nc?dots:''}</g>
  <g k="seal"><image href="${ASSET[sealKey]}" x="-62" y="-62" width="124" height="124"/></g>`;
  scene('card-'+key,t0,t1,m,(t,R)=>{const lt=t-t0;
    op(R.num,.07*P(lt,0,.8));tr(R.num,-lt*6,0);
    at(R.clip,'width',(1520*E.out(P(lt,.15,1.05))).toFixed(1));
    [...title].forEach((c,i)=>{const p=P(lt,.55+i*.13,1.1+i*.13);op(R['c'+i],p);tr(R['c'+i],960+(i-(n-1)/2)*215,532+(1-E.out(p))*18-lt*3,1.18-.18*E.out(p))});
    op(R.chap,P(lt,.4,1));op(R.eraG,P(lt,1.15,1.8));tr(R.eraG,0,(1-E.out(P(lt,1.15,1.8)))*14);
    const g=E.out(P(lt,1.3,2.3)).toFixed(3),xl=960-ew/2-40,xr=960+ew/2+40;at(R.gl,'transform',`translate(${xl} 0) scale(${g} 1) translate(${-xl} 0)`);at(R.gr,'transform',`translate(${xr} 0) scale(${g} 1) translate(${-xr} 0)`);
    op(R.dots,P(lt,1.6,2.2));
    const[so,ss]=stampA(lt,2.0);op(R.seal,so);tr(R.seal,960+[...title].length*107+110,560,ss,-5);
  },{zoom:.02,fi:.5,fo:.6});
}
/* ========= hooks called by runtime ========= */
const NUMS=['','壹','贰','叁','肆','伍','陆','柒','捌','玖','拾'],CN='零一二三四五六七八九十';
function chapNum(i){return NUMS[i]}
const mImgs=[$('#m0'),$('#m1'),$('#m2')];
function themeInit(){$('#paper').style.backgroundImage=`url(${ASSET.paper})`;mImgs.forEach((im,i)=>im.src=ASSET['m'+i])}
function renderBG(t){const m=mood(t);mImgs.forEach((im,i)=>{const sp=[6,11,18][i];const x=-((t*sp)%480)+Math.sin(t*.05+i)*40;const v=m*[.75,.85,1][i];css(im,'opacity',v.toFixed(3));css(im,'transform',`translate3d(${(x+240*(i-1)*0).toFixed(1)}px,${(Math.sin(t*.07+i)*6).toFixed(1)}px,0)`)})}
function drawAmbient(t){const n=46;const night=isNight(t);for(let i=0;i<n;i++){const sx=hash(i)*1920,sy=hash(i+99)*1080;const vx=8+hash(i+7)*14,vy=-4-hash(i+3)*10;let x=(sx+t*vx)%1980-30,y=((sy+t*vy)%1140+1140)%1140-30;x+=Math.sin(t*.6+i)*12;const r=.8+hash(i+5)*2.2;const a=(.18+.25*Math.sin(t*1.3+i*2.1)**2)*(night?1.6:1);fx.fillStyle=night?`rgba(255,226,160,${a})`:`rgba(150,112,50,${a*.75})`;fx.beginPath();fx.arc(x,y,r,0,7);fx.fill()}}

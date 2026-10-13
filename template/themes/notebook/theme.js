/* notebook theme (清新笔记本风). Contract: see reference/authoring.md § Theme contract.
   Provides: grid-paper background + themeInit/renderBG/drawAmbient, chapNum, chapterCard, makeSeal,
   palette NB, helper wordCard(), generic SVG defs, assets ok/no. */
$('#scenes').insertAdjacentHTML('beforebegin','<div id="nbPaper"></div><div id="nbWash"></div>');
const NB={ink:'#1f2a44',sub:'#5b6785',blue:'#3d6df2',blueL:'#e3ebff',hl:'#ffd84d',mint:'#1fa974',mintL:'#daf4e8',
  coral:'#ef5a4c',coralL:'#fde4e1',purple:'#8b5cf6',purpleL:'#efe8ff',card:'#ffffff',line:'#dfe5f1'};
defs(`
  <filter id="fCard" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#1f2a44" flood-opacity=".08" result="a"/><feDropShadow in="a" dx="0" dy="14" stdDeviation="18" flood-color="#1f2a44" flood-opacity=".11"/></filter>
  <filter id="fCardS" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#1f2a44" flood-opacity=".12"/></filter>
  <filter id="fMarker" x="-5%" y="-20%" width="110%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.035 0.12" numOctaves="2" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G"/></filter>
  <linearGradient id="gHL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffe680" stop-opacity=".75"/><stop offset=".08" stop-color="#ffd84d" stop-opacity=".9"/><stop offset=".92" stop-color="#ffd84d" stop-opacity=".9"/><stop offset="1" stop-color="#ffe680" stop-opacity=".7"/></linearGradient>
`);
/* word card: English word + Chinese gloss, centered at origin (position it with tr(R[k],x,y)).
   en may contain <tspan fill="…"> for colored suffixes; o={k,w,size=72,color=NB.blue,zh size=size*.42} */
function wordCard(en,zh,o={}){
  const size=o.size||72,zs=Math.round(size*.42),plain=en.replace(/<[^>]*>/g,'');
  const w=o.w||Math.max(plain.length*size*.52,[...(zh||'')].length*zs)+size*1.3,h=size*1.25+(zh?zs*1.7:0)+28,col=o.color||NB.blue;
  const yEn=zh?-h/2+18+size*1.05:size*.36;
  return `<g${o.k?` k="${o.k}"`:''}><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="22" fill="#fff" filter="url(#fCard)"/>
  <rect x="-30" y="${-h/2+14}" width="60" height="8" rx="4" fill="${col}"/>
  <text class="en" x="0" y="${yEn}" font-size="${size}" font-weight="800" text-anchor="middle" fill="${NB.ink}">${en}</text>
  ${zh?`<text x="0" y="${h/2-zs*.9}" font-size="${zs}" text-anchor="middle" fill="${NB.sub}">${zh}</text>`:''}</g>`;
}
function markSVG(ok){
  const col=ok?NB.mint:NB.coral,d=ok?'M48,84 L72,108 L114,58':'M56,56 L104,104 M104,56 L56,104';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><circle cx="80" cy="82" r="70" fill="#1f2a44" opacity=".10"/><circle cx="80" cy="78" r="70" fill="#fff"/><circle cx="80" cy="78" r="60" fill="${col}"/><path d="${d}" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" transform="translate(0 -2)"/></svg>`;
}
asset('ok',()=>rasterSVG(markSVG(true),160,160));
asset('no',()=>rasterSVG(markSVG(false),160,160));
/* sticker: die-cut white border + colored disc/rounded square + dashed ring; shape 'round'(default)|'sq'|'tall'; color = fill */
function makeSeal(text,size,{shape='round',font='Nunito',color=NB.coral}={}){
  const W=size*2,H=shape==='tall'?W*1.6:W,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
  const path=(inset)=>{g.beginPath();if(shape==='round')g.arc(W/2,H/2,W/2-inset,0,Math.PI*2);else g.roundRect(inset,inset,W-2*inset,H-2*inset,W*.2-inset*.5)};
  g.save();g.shadowColor='rgba(31,42,68,.22)';g.shadowBlur=W*.05;g.shadowOffsetY=W*.02;g.fillStyle='#fff';path(W*.05);g.fill();g.restore();
  g.fillStyle=color;path(W*.1);g.fill();
  g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=W*.014;g.setLineDash([W*.035,W*.025]);path(W*.16);g.stroke();g.setLineDash([]);
  g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';const fam=`"${font}","NSans",sans-serif`;
  const cjk=/[㐀-鿿]/.test(text),ch=[...text];
  const lines=cjk&&ch.length>2&&shape!=='tall'?[ch.slice(0,Math.ceil(ch.length/2)).join(''),ch.slice(Math.ceil(ch.length/2)).join('')]:shape==='tall'&&cjk?ch:[text];
  const maxW=W*(shape==='round'?.6:.66),lh=Math.min(W*.5,(H*.62)/lines.length);
  lines.forEach((l,i)=>{let fs=lh;g.font=`800 ${fs}px ${fam}`;const m=g.measureText(l).width;if(m>maxW){fs*=maxW/m;g.font=`800 ${fs}px ${fam}`}
    g.fillText(l,W/2,H/2+(i-(lines.length-1)/2)*lh+fs*.06)});
  return canvasURL(c);
}
/* ---- chapter card ---- */
const nbStrip=s=>s.replace(/^(\d+\s*[、.．:：]?\s*|.、)/,'');
const nbWid=(s,fs)=>[...s].reduce((a,c)=>a+(c.charCodeAt(0)>0x2e80?fs:c===' '?fs*.28:fs*.56),0);
function chapterCard(key,sealKey){
  const sec=SEC[key],nc=TL.secs.length-2,end=key==='outro',t0=sec.card,t1=sec.start+.6;
  const title=end?sec.title:nbStrip(sec.title),label=end?'WRAP-UP':`LESSON ${chapNum(sec.idx)}`;
  const fs=Math.min(124,1000/nbWid(title,1)),tw=nbWid(title,fs),pw=nbWid(label,30)+30*.1*label.length+72;
  let dots='';for(let i=1;i<=nc;i++){const x=(i-(nc+1)/2)*40,cur=i===sec.idx,past=end||i<sec.idx;
    dots+=`<g k="d${i}">${cur?`<rect x="${x-20}" y="-8" width="40" height="16" rx="8" fill="${NB.blue}"/>`:`<circle cx="${x}" cy="0" r="8" fill="${past?'#9db6fb':'#fff'}" stroke="${past?'#9db6fb':'#c3cde2'}" stroke-width="2.5"/>`}</g>`}
  const m=`<g k="card"><rect x="-620" y="-300" width="1240" height="600" rx="40" fill="#fff" filter="url(#fCard)"/>
    <text class="en" x="590" y="275" font-size="200" font-weight="800" text-anchor="end" fill="${NB.blue}" opacity=".06">${end?'END':chapNum(sec.idx)}</text>
    <g k="tapes"><rect x="-90" y="-22" width="180" height="44" fill="${NB.hl}" opacity=".6" transform="translate(-590 -282) rotate(-38)"/>
      <rect x="-90" y="-22" width="180" height="44" fill="#9fd9c2" opacity=".55" transform="translate(590 282) rotate(-38)"/></g>
    <g k="pill"><rect x="${-pw/2}" y="-32" width="${pw}" height="64" rx="32" fill="${NB.blue}"/><text class="en" x="0" y="11" font-size="30" font-weight="800" letter-spacing="3" text-anchor="middle" fill="#fff">${label}</text></g>
    <rect k="hl" x="${-tw/2-24}" y="${30-fs*.42}" width="0" height="${fs*.48}" rx="8" fill="url(#gHL)" filter="url(#fMarker)"/>
    <text k="title" x="0" y="30" font-size="${fs.toFixed(1)}" font-weight="700" text-anchor="middle" fill="${NB.ink}">${title}</text>
    <text k="sub" x="0" y="122" font-size="38" text-anchor="middle" fill="${NB.sub}" letter-spacing="2">${sec.sub}</text>
    <g transform="translate(0 214)">${dots}</g>
    <g k="seal"><image href="${ASSET[sealKey]}" x="-75" y="-75" width="150" height="150"/></g></g>`;
  scene('card-'+key,t0,t1,m,(t,R)=>{const lt=t-t0,p=EP(lt,0,.75);
    op(R.card,P(lt,0,.4));tr(R.card,960,520+(1-p)*46-P(lt,0,5)*6,.95+.05*p);
    op(R.tapes,P(lt,.45,.85));
    const pp=P(lt,.3,.8);op(R.pill,Math.min(1,pp*3));tr(R.pill,0,-178,.6+.4*E.back(pp));
    const pt=P(lt,.55,1.15);op(R.title,pt);at(R.title,'transform',`translate(0 ${((1-E.out(pt))*18).toFixed(1)})`);
    at(R.hl,'width',((tw+48)*EP(lt,1.05,1.65,'io')).toFixed(1));
    const ps=P(lt,1.25,1.85);op(R.sub,ps);at(R.sub,'transform',`translate(0 ${((1-E.out(ps))*12).toFixed(1)})`);
    for(let i=1;i<=nc;i++){const q=P(lt,1.5+i*.07,1.85+i*.07);op(R['d'+i],q);at(R['d'+i],'opacity',q.toFixed(3))}
    const[so,ss]=stampA(lt,2.05);op(R.seal,so);tr(R.seal,560,-250,ss,10);
  },{zoom:0,fi:.5,fo:.6});
}
/* runtime strips only `X、` from the chapter-tag title; also strip a leading lesson number ("01 什么是名词") */
/* ========= hooks called by runtime ========= */
function chapNum(i){return String(i).padStart(2,'0')}
const nbWash=$('#nbWash');
function themeInit(){}
function renderBG(t){const m=mood(t);css(nbWash,'opacity',(.35+.55*m).toFixed(3));css(nbWash,'transform',`translate3d(${(Math.sin(t*.04)*40).toFixed(1)}px,${(Math.cos(t*.05)*24).toFixed(1)}px,0)`)}
const NB_DOODLE=[NB.blue,NB.hl,NB.mint,NB.coral,NB.purple];
function drawAmbient(t){fx.lineWidth=3;fx.lineCap='round';fx.lineJoin='round';
  for(let i=0;i<9;i++){const sx=hash(i+1)*1920,sy=hash(i+40)*1080,vy=6+hash(i+9)*6;
    const x=sx+Math.sin(t*.12+i*1.7)*30,y=((sy-t*vy)%1200+1200)%1200-60,r=10+hash(i+3)*8,a=t*.15*(hash(i+5)-.5)+i;
    fx.save();fx.translate(x,y);fx.rotate(a);fx.globalAlpha=.16;fx.strokeStyle=NB_DOODLE[i%5];fx.beginPath();
    switch(i%4){case 0:fx.moveTo(-r,0);fx.lineTo(r,0);fx.moveTo(0,-r);fx.lineTo(0,r);break;
      case 1:fx.arc(0,0,r*.8,0,7);break;
      case 2:for(let k=0;k<5;k++){const q=k*Math.PI*.8-Math.PI/2;fx[k?'lineTo':'moveTo'](Math.cos(q)*r,Math.sin(q)*r)}fx.closePath();break;
      default:fx.moveTo(-r*1.4,0);for(let k=1;k<=4;k++)fx.quadraticCurveTo(-r*1.4+(k-.5)*r*.7,(k%2?-1:1)*r*.5,-r*1.4+k*r*.7,0)}
    fx.stroke();fx.restore()}}

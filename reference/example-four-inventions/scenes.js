/* 中国古代四大发明 — topic scenes. Runs after runtime.js + theme.js; see reference/authoring.md. */
/* ---- topic SVG defs ---- */
defs(`
  <linearGradient id="gBronze" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7d8f72"/><stop offset=".45" stop-color="#4f6a5c"/><stop offset="1" stop-color="#2c3f38"/></linearGradient>
  <radialGradient id="gBronzeR" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#b3a26a"/><stop offset=".5" stop-color="#7a7448"/><stop offset="1" stop-color="#3e4a36"/></radialGradient>
  <linearGradient id="gWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c99a62"/><stop offset="1" stop-color="#9c6e3f"/></linearGradient>
  <linearGradient id="gWoodD" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a3a1e"/><stop offset=".5" stop-color="#8a5d33"/><stop offset="1" stop-color="#4a2f17"/></linearGradient>
  <linearGradient id="gClay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c47a4f"/><stop offset="1" stop-color="#8e4c2c"/></linearGradient>
  <linearGradient id="gBone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1e6cb"/><stop offset="1" stop-color="#cdb98f"/></linearGradient>
  <linearGradient id="gBamboo" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b59a5a"/><stop offset=".4" stop-color="#dcc58a"/><stop offset="1" stop-color="#a48748"/></linearGradient>
  <linearGradient id="gSilk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6ecd0"/><stop offset=".5" stop-color="#ead9ad"/><stop offset="1" stop-color="#f3e5c0"/></linearGradient>
  <linearGradient id="gNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1022"/><stop offset=".6" stop-color="#1a2140"/><stop offset="1" stop-color="#3a2a3a"/></linearGradient>
  <linearGradient id="gDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9dcc0"/><stop offset=".55" stop-color="#f1e2c0"/><stop offset="1" stop-color="#d9c9a5"/></linearGradient>
  <linearGradient id="gSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5f7a7a"/><stop offset="1" stop-color="#2b3d42"/></linearGradient>
  <linearGradient id="gIndigo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34466a"/><stop offset="1" stop-color="#1f2b45"/></linearGradient>
  <radialGradient id="gFire"><stop offset="0" stop-color="#fffbe8"/><stop offset=".25" stop-color="#ffd36b"/><stop offset=".6" stop-color="#f06a24" stop-opacity=".7"/><stop offset="1" stop-color="#b8321f" stop-opacity="0"/></radialGradient>
  <radialGradient id="gLantern" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#ffd27a"/><stop offset=".5" stop-color="#e2452b"/><stop offset="1" stop-color="#8f1d12"/></radialGradient>
  <radialGradient id="gWater" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#d9e6e0"/><stop offset=".7" stop-color="#a9c2bb"/><stop offset="1" stop-color="#7d9c95"/></radialGradient>
  <radialGradient id="gCeladon" cx=".5" cy=".5" r=".5"><stop offset=".86" stop-color="#9fb8a6"/><stop offset=".94" stop-color="#c8d8c8"/><stop offset="1" stop-color="#6f8a78"/></radialGradient>
`);
/* ---- topic assets (seals) ---- */
const SEALS={sTitle:['四大发明',90],sPaper:['纸',60],sPrint:['印',60],sCompass:['针',60],sGun:['火',60],sOutro:['华',60],
  sBen:['笨重',60,'tall'],sAng:['昂贵',60,'tall'],sCai:['蔡侯纸',60,'tall'],sEnd:['中华',60,'tall'],sQian:['前世今生',70]};
for(const k in SEALS){const[t,s,sh]=SEALS[k];asset(k,()=>makeSeal(t,s,{shape:sh||'sq'}))}
/* ---- icons (centered, ~r60) ---- */
const ICON={
paper:()=>`<g><path d="M-40,-50 L38,-56 L48,38 L-32,46Z" fill="#e3d1aa" stroke="#6b5434" stroke-width="2"/><path d="M-44,-44 L40,-44 L40,28 Q40,44 24,44 L-44,44Z" fill="#fbf5e6" stroke="#3a2d20" stroke-width="2.5"/><path d="M40,28 Q27,29 24,44" fill="#e2d2ae" stroke="#3a2d20" stroke-width="2"/><g stroke="#a08a63" stroke-width="1" fill="none" opacity=".55"><path d="M-36,-32 q20,6 40,-2 M-32,-14 q25,4 50,0 M-38,6 q22,6 44,-1 M-30,26 q18,3 36,0"/></g><text y="15" text-anchor="middle" class="msz" font-size="46" fill="#2a2219">纸</text></g>`,
type:()=>{let o='<g>';const ch='印活字书传文版刻万';for(let r=0;r<3;r++)for(let c=0;c<3;c++){const x=(c-1)*33,y=(r-1)*33;o+=`<rect x="${x-15}" y="${y-15}" width="30" height="30" rx="3" fill="url(#gClay)" stroke="#5a2e18" stroke-width="1.5"/><text transform="translate(${x} ${y+8}) scale(-1 1)" text-anchor="middle" font-size="21" font-weight="700" fill="#f6e3c8">${ch[r*3+c]}</text>`}return o+'</g>'},
compass:()=>`<g><rect x="-48" y="-48" width="96" height="96" rx="5" fill="url(#gBronzeR)" stroke="#3b3a24" stroke-width="2"/><circle r="36" fill="#cbb98a" stroke="#5c5232" stroke-width="2"/><circle r="28" fill="none" stroke="#6b6038" stroke-width="1" stroke-dasharray="2 4"/><ellipse cx="0" cy="-8" rx="13" ry="16" fill="#2a2a26"/><ellipse cx="-4" cy="-13" rx="4" ry="6" fill="#fff" opacity=".25"/><path d="M-5,5 L0,32 L5,5Z" fill="#2a2a26"/></g>`,
fire:()=>{let o='<g>';for(let i=0;i<14;i++){const a=i/14*Math.PI*2;o+=`<line x1="${10+Math.cos(a)*12}" y1="${-18+Math.sin(a)*12}" x2="${10+Math.cos(a)*(30+(i%2)*10)}" y2="${-18+Math.sin(a)*(30+(i%2)*10)}" stroke="${i%2?'#d9a54a':'#b5301f'}" stroke-width="3" stroke-linecap="round"/>`}o+=`<circle cx="10" cy="-18" r="7" fill="#f3c25c"/><g transform="translate(-22 30) rotate(-38)"><rect x="-6" y="-26" width="12" height="40" rx="2" fill="#b5301f" stroke="#5a1a10" stroke-width="1.5"/><path d="M-6,-26 L0,-36 L6,-26Z" fill="#7a1c10"/><line x1="0" y1="14" x2="0" y2="40" stroke="#5a3a1e" stroke-width="3"/></g></g>`;return o}
};
function medal(k,icon,label,era,r=72){return `<g k="${k}"><circle r="${r+14}" k="${k}g" fill="none" stroke="#e7c06a" stroke-width="3" opacity="0"/><circle r="${r}" fill="#f8f1e1" stroke="url(#gGold)" stroke-width="4" filter="url(#fShadow)"/><circle r="${r-9}" fill="none" stroke="#b58a3a" stroke-width="1" opacity=".7"/><g transform="scale(${r/72})">${ICON[icon]()}</g>${label?`<text y="${r+46}" text-anchor="middle" font-size="32" font-weight="700" fill="#2a2219" letter-spacing="3">${label}</text>`:''}${era?`<text y="${r+80}" text-anchor="middle" font-size="21" fill="#8a6d45" letter-spacing="2">${era}</text>`:''}</g>`}
function nameMedal(k,name,sub,seal,font='msz'){return `<g k="${k}"><circle r="160" fill="url(#gWash)"/><circle r="138" fill="none" stroke="url(#gGold)" stroke-width="2.5"/><circle r="128" fill="none" stroke="#b58a3a" stroke-width="1" opacity=".6"/>${vtext(name,-8,-104,104,104,`class="${font}" fill="#1a1612" ${font!=='msz'?'font-weight="700"':''}`)}${vtext(sub,84,-112,21,25,'fill="#6b5434"')}<image href="${ASSET[seal]}" x="-112" y="40" width="48" height="48"/></g>`}
const OLD=MAP.oldP,WP=MAP.worldP;
function projOld(lon,lat){return[(lon-OLD.lon0)/(OLD.lon1-OLD.lon0)*OLD.W,(OLD.lat1-lat)/(OLD.lat1-OLD.lat0)*OLD.H]}
function projW(lon,lat){return[(lon-WP.lon0)/(WP.lon1-WP.lon0)*WP.W,(WP.lat1-lat)/(WP.lat1-WP.lat0)*WP.H]}
function oldMap(fill='#e6d9bb',stroke='#9c8560'){return `<rect width="1920" height="1103" fill="#efe5cd" opacity=".55"/><g opacity=".35" stroke="#b9a37a" stroke-width="1" fill="none">${[...Array(9)].map((_,i)=>`<line x1="${i*240}" y1="0" x2="${i*240}" y2="1103" stroke-dasharray="3 9"/>`).join('')}${[...Array(5)].map((_,i)=>`<line x1="0" y1="${i*240+60}" x2="1920" y2="${i*240+60}" stroke-dasharray="3 9"/>`).join('')}</g><path d="${MAP.old}" fill="${fill}" stroke="${stroke}" stroke-width="1.4" stroke-linejoin="round"/>`}
function cityDot(k,x,y,label,sub,anchor='start',dx=16,dy=8){return `<g k="${k}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="16" fill="#b5301f" opacity=".18"/><circle r="6.5" fill="#b5301f" stroke="#fbf3e1" stroke-width="2"/><text x="${dx}" y="${dy}" text-anchor="${anchor}" font-size="27" font-weight="700" fill="#2a2018" paint-order="stroke" stroke="#f3eadb" stroke-width="5">${label}</text>${sub?`<text x="${dx}" y="${dy+30}" text-anchor="${anchor}" font-size="21" fill="#8a5a2a" paint-order="stroke" stroke="#f3eadb" stroke-width="4">${sub}</text>`:''}</g>`}
/* ================= INTRO ================= */
BUILDERS.push(()=>{
  const T1=S('intro',1)-.15;const title='中国古代四大发明';
  let chars='';[...title].forEach((c,i)=>chars+=`<text k="c${i}" class="msz" font-size="150" text-anchor="middle" fill="#1b1814">${c}</text>`);
  const words=['造纸术','印刷','指南针','火药'],wt=words.map(w=>W('intro',0,w));const mx=[-420,-140,140,420];
  const icons=['paper','type','compass','fire'],labels=['造纸术','印刷术','指南针','火药'],eras=['东汉 · 蔡伦','唐 · 北宋','战国 → 宋','唐 → 宋'];
  let meds='';for(let i=0;i<4;i++)meds+=`<g transform="translate(${mx[i]} -42)">${medal('md'+i,icons[i],labels[i],eras[i],64)}</g>`;
  const rod=k=>`<g k="${k}"><rect x="-15" y="-176" width="30" height="352" rx="11" fill="url(#gWoodD)"/><rect x="-6" y="-176" width="5" height="352" fill="#fff" opacity=".12"/><rect x="-20" y="-194" width="40" height="22" rx="7" fill="url(#gGold)"/><rect x="-20" y="172" width="40" height="22" rx="7" fill="url(#gGold)"/></g>`;
  const m=`<g k="blotG"><image href="${ASSET.blot}" x="-500" y="-500" width="1000" height="1000"/></g>
  <g k="drop"><ellipse rx="10" ry="14" fill="#16130f"/></g>
  <g k="titleG">${chars}<g k="seal"><image href="${ASSET.sTitle}" x="-62" y="-62" width="124" height="124"/></g></g>
  <g k="subG"><rect x="560" y="566" width="150" height="1.5" fill="url(#gGoldH)"/><rect x="1210" y="566" width="150" height="1.5" fill="url(#gGoldH)"/><text x="960" y="578" text-anchor="middle" font-size="36" letter-spacing="10" fill="#5b4630">造纸术 · 印刷术 · 指南针 · 火药</text></g>
  <g k="scroll" transform="translate(960 668)"><clipPath id="scClip"><rect k="clip" x="0" y="-180" width="0" height="360"/></clipPath>
   <g clip-path="url(#scClip)"><rect x="-610" y="-158" width="1220" height="316" fill="url(#gSheet)"/><rect x="-610" y="-158" width="1220" height="316" fill="#c9b48a" opacity=".12"/>
   <rect x="-588" y="-138" width="1176" height="276" fill="none" stroke="#b58a3a" stroke-width="1.5"/><rect x="-580" y="-130" width="1160" height="260" fill="none" stroke="#b58a3a" stroke-width=".8" opacity=".6"/>
   <g k="links" opacity="0"><path d="M-356,-42 L-204,-42 M-76,-42 L76,-42 M204,-42 L356,-42" stroke="#c9a24f" stroke-width="2" stroke-dasharray="4 6"/></g>${meds}</g>${rod('rodL')}${rod('rodR')}</g>`;
  scene('intro1',0,T1,m,(t,R)=>{
    const dp=P(t,.15,.72);op(R.drop,t<.74?P(t,.1,.2):0);tr(R.drop,960,lerp(-40,400,E.in(dp)),1,0,1+dp*.3);
    const mv=E.io(P(t,4.1,5.0));
    const bs=.04+.96*E.expo(P(t,.72,3.2));op(R.blotG,(.6*P(t,.72,.82))*(1-.72*mv));tr(R.blotG,960,400-185*mv,bs*(1+.05*Math.sin(t*.3)),t*1.5);
    [...title].forEach((c,i)=>{const p=E.out(P(t,1.1+i*.19,1.85+i*.19));op(R['c'+i],p);tr(R['c'+i],(i-3.5)*150,52+(1-p)*16,1.22-.22*p)});
    tr(R.titleG,960,lerp(400,212,mv),lerp(1,.6,mv));
    const[so,ss]=stampA(t,3.25);op(R.seal,so);tr(R.seal,690,-30,ss,-6);
    op(R.subG,P(t,2.7,3.5)*(1-P(t,3.95,4.35)));
    op(R.scroll,P(t,4.15,4.45));const half=Math.max(16,610*E.io(P(t,4.25,5.25)));tr(R.rodL,-half-2,0);tr(R.rodR,half+2,0);at(R.clip,'x',-half);at(R.clip,'width',2*half);
    for(let i=0;i<4;i++){const p=P(t,wt[i]-.2,wt[i]+.45);op(R['md'+i],p);tr(R['md'+i],0,(1-E.out(p))*24,.72+.28*E.back(p));
      const g=Math.max(0,Math.sin(Math.PI*P(t,8.9+i*.32,9.9+i*.32)));op(R['md'+i+'g'],g*.9);at(R['md'+i+'g'],'r',(78+g*10).toFixed(1))}
    op(R.links,P(t,9.0,10.2)*.9);
  },{zoom:.03,fi:.01});
  addFX(.7,1.6,(c,t)=>{const dt=t-.72;if(dt<0)return;for(let i=0;i<26;i++){const a=hash(i+3)*Math.PI*2,v=120+hash(i)*380;const x=960+Math.cos(a)*v*dt*(1-dt*.6),y=400+Math.sin(a)*v*dt*.55*(1-dt*.6)+dt*dt*90;c.fillStyle=`rgba(22,19,15,${(1-dt/.9)*.85})`;c.beginPath();c.arc(x,y,2+hash(i+9)*5*(1-dt),0,7);c.fill()}});

  /* ---- intro2: dynasty timeline ---- */
  const A0=T1-.35,A1=S('intro',2)+.35;const X=y=>160+(y+500)/1800*1600;
  const dyn=[['战国',-475,-221],['秦 · 汉',-221,220],['魏晋南北朝',220,589],['隋 · 唐',581,907],['五代',907,960],['宋',960,1279]];
  let dm='';dyn.forEach(([n,a,b],i)=>{dm+=`<g k="dy${i}"><rect x="${X(a)}" y="586" width="${X(b)-X(a)}" height="28" fill="${i%2?'#cdb991':'#ddcda9'}" opacity=".85"/>${n!=='五代'?`<text x="${(X(a)+X(b))/2}" y="652" text-anchor="middle" font-size="26" fill="#4a3a28" letter-spacing="3">${n}</text>`:''}</g>`});
  const yrs=[[-500,'前500年'],[0,'公元元年'],[500,'500年'],[1000,'1000年']];let ym='';yrs.forEach(([y,l])=>{ym+=`<line x1="${X(y)}" y1="620" x2="${X(y)}" y2="634" stroke="#8a6d45"/><text x="${X(y)}" y="700" text-anchor="middle" font-size="19" fill="#8a7458">${l}</text>`});
  const bands=[['指南针',-300,1120,'#4f6a5c','compass','司南 → 航海罗盘'],['造纸术',-150,1100,'#a0763a','paper','西汉麻纸 → 蔡侯纸'],['印刷术',600,1100,'#3a3530','type','雕版 → 活字'],['火药',800,1250,'#b5301f','fire','炼丹 → 火器']];
  let bm='';bands.forEach(([n,a,b,col,ic,sub],i)=>{const y=290+i*72;bm+=`<g k="bd${i}"><clipPath id="bc${i}"><rect k="bcr${i}" x="${X(a)}" y="${y-30}" width="0" height="60"/></clipPath><g clip-path="url(#bc${i})"><rect x="${X(a)}" y="${y-17}" width="${X(b)-X(a)}" height="34" rx="17" fill="${col}" opacity=".9"/><text x="${X(a)+30}" y="${y+9}" font-size="24" font-weight="700" fill="#f6eedb" letter-spacing="2">${n}<tspan font-size="18" font-weight="400" dx="14" fill="#efe0c0">${sub}</tspan></text></g><g transform="translate(${X(a)-28} ${y})"><circle r="25" fill="#f8f1e1" stroke="${col}" stroke-width="2.5"/><g transform="scale(.3)">${ICON[ic]()}</g></g></g>`});
  const keys=[[1,105,'105 · 蔡伦'],[2,868,'868 · 《金刚经》'],[2,1045,'庆历 · 毕昇'],[3,1044,'1044 · 《武经总要》'],[0,1088,'磁偏角']];
  let km='';keys.forEach(([b,y,l],i)=>{const yy=290+b*72;km+=`<g k="ky${i}" transform="translate(${X(y)} ${yy})"><circle r="9" fill="#f3d58c" stroke="#fff6e0" stroke-width="2.5"/><text y="${b===3?44:-26}" text-anchor="middle" font-size="18" fill="#3a2d20" paint-order="stroke" stroke="#efe6d2" stroke-width="4">${l}</text></g>`});
  const m2=`<text k="hd" x="960" y="170" text-anchor="middle" class="msz" font-size="60" fill="#1d1a16" letter-spacing="8">千年智慧 · 薪火相传</text><text k="hd2" x="960" y="214" text-anchor="middle" font-size="22" fill="#8a6d45" letter-spacing="6">公元前5世纪 — 公元13世纪</text>
   ${dm}<line k="axis" x1="150" y1="614" x2="1790" y2="614" stroke="#3a2d20" stroke-width="3" pathLength="1" stroke-dasharray="1 1"/><path k="arrow" d="M1770,602 L1796,614 L1770,626" fill="none" stroke="#3a2d20" stroke-width="3"/>${ym}${bm}${km}
   <rect k="sweep" x="-200" y="250" width="260" height="380" fill="url(#gGoldH)" opacity=".0"/><g k="world"><text x="1790" y="560" text-anchor="end" class="msz" font-size="46" fill="#b5301f">影响世界</text></g>`;
  const cw=W('intro',1,'改变');
  scene('intro2',A0,A1,m2,(t,R)=>{
    op(R.hd,P(t,A0+.4,A0+1.2));op(R.hd2,P(t,A0+.7,A0+1.4));
    drawP(R.axis,E.io(P(t,A0+.3,A0+1.5)));op(R.arrow,P(t,A0+1.4,A0+1.7));
    dyn.forEach((d,i)=>op(R['dy'+i],P(t,A0+.6+i*.15,A0+1.1+i*.15)));
    bands.forEach((b,i)=>{const s0=A0+1.4+i*.55;op(R['bd'+i],P(t,s0,s0+.3));at(R['bcr'+i],'width',((X(b[2])-X(b[1])+30)*E.io(P(t,s0,s0+1.4))).toFixed(1))});
    keys.forEach((k,i)=>{const p=P(t,A0+3.4+i*.2,A0+3.8+i*.2);op(R['ky'+i],p);tr(R['ky'+i],X(k[1]),290+k[0]*72,.5+.5*E.back(p))});
    const sw=P(t,cw-.2,cw+1.6);op(R.sweep,Math.sin(Math.PI*sw)*.85);at(R.sweep,'x',(lerp(80,1800,sw)-130).toFixed(1));
    op(R.world,P(t,cw+1.0,cw+1.7));tr(R.world,(1-E.out(P(t,cw+1,cw+1.7)))*-30,0);
  },{zoom:.03});

  /* ---- intro3: moon gate ---- */
  const G0=S('intro',2)-.3,G1=SEC.paper.card+.55;const cx=960,cy=470,RR=300;
  let bam='';const rb=rng(42);for(let s=0;s<4;s++){const x=90+s*85+rb()*30,w=13-s*2;let y=1080;bam+=`<g opacity="${.9-s*.15}">`;while(y>-40){const h=110+rb()*60;bam+=`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h-4}" rx="3" fill="#1f241f"/><rect x="${x-w/2-2}" y="${y-6}" width="${w+4}" height="4" fill="#1f241f"/>`;y-=h}bam+='</g>'}
  let leaves='';for(let i=0;i<34;i++){const x=60+rb()*420,y=60+rb()*620,a=-30+rb()*110,l=60+rb()*55;leaves+=`<path transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(${a.toFixed(0)})" d="M0,0 Q${l*.45},-${l*.12} ${l},0 Q${l*.45},${l*.12} 0,0Z" fill="#1f241f" opacity="${(.55+rb()*.4).toFixed(2)}"/>`}
  const m3=`<defs><clipPath id="gateClip"><circle cx="${cx}" cy="${cy}" r="${RR}"/></clipPath><pattern id="wallPat" patternUnits="userSpaceOnUse" width="1024" height="1024"><image href="${ASSET.paper}" width="1024" height="1024"/></pattern></defs>
   <g clip-path="url(#gateClip)"><rect x="600" y="100" width="720" height="760" fill="url(#gDusk)"/><circle k="sun" cx="1070" cy="330" r="46" fill="#c8452e" opacity=".55"/>
     <image k="gm0" href="${ASSET.m0}" x="300" y="300" width="1600" height="413"/><image k="gm1" href="${ASSET.m1}" x="200" y="400" width="1600" height="400"/><image k="gm2" href="${ASSET.m2}" x="100" y="520" width="1500" height="350"/>
     <g k="birds" fill="none" stroke="#2a2620" stroke-width="2.4" stroke-linecap="round"><path k="b0" d="M-12,0 Q-6,-6 0,0 Q6,-6 12,0"/><path k="b1" d="M-9,0 Q-4,-5 0,0 Q4,-5 9,0"/><path k="b2" d="M-10,0 Q-5,-5 0,0 Q5,-5 10,0"/></g>
     <g k="gmeds">${['paper','type','compass','fire'].map((ic,i)=>`<g k="gm${i}x">${medal('gmd'+i,ic,'','',40)}</g>`).join('')}</g></g>
   <path fill-rule="evenodd" fill="url(#wallPat)" d="M-400,-400 H2320 V1480 H-400Z M${cx-RR},${cy} a${RR},${RR} 0 1,0 ${2*RR},0 a${RR},${RR} 0 1,0 ${-2*RR},0Z"/>
   <path fill-rule="evenodd" fill="#9b8762" opacity=".22" d="M-400,-400 H2320 V1480 H-400Z M${cx-RR},${cy} a${RR},${RR} 0 1,0 ${2*RR},0 a${RR},${RR} 0 1,0 ${-2*RR},0Z"/>
   <circle cx="${cx}" cy="${cy}" r="${RR+8}" fill="none" stroke="#3b3128" stroke-width="16"/><circle cx="${cx}" cy="${cy}" r="${RR+26}" fill="none" stroke="url(#gGold)" stroke-width="2.5"/><circle cx="${cx}" cy="${cy}" r="${RR+34}" fill="none" stroke="#b58a3a" stroke-width="1" opacity=".5"/>
   <rect x="0" y="868" width="1920" height="212" fill="#8e7a58" opacity=".18"/>
   <g k="bamboo">${bam}${leaves}</g>
   <g k="vt">${vtext('前世今生',1480,250,84,96,'class="msz" fill="#1d1a16"')}<image href="${ASSET.sQian}" x="1440" y="660" width="82" height="82"/></g>
   <g k="vt2">${vtext('走进四大发明',1390,300,30,38,'fill="#6b5434" letter-spacing="2"')}</g>`;
  const sc3=scene('intro3',G0,G1,m3,(t,R,sc)=>{
    const lt=t-G0;tr(R.gm0,-lt*5,0);tr(R.gm1,-lt*9,0);tr(R.gm2,-lt*15,0);
    [0,1,2].forEach(i=>{const p=(lt*.06+i*.13)%1;tr(R['b'+i],lerp(700,1250,p),300+i*26+Math.sin(lt*2+i)*6,1)});
    [0,1,2,3].forEach(i=>{const a=lt*.25+i*Math.PI/2;const p=P(t,G0+.8+i*.25,G0+1.4+i*.25);op(R['gm'+i+'x'],p);tr(R['gm'+i+'x'],cx+Math.cos(a)*150,cy+40+Math.sin(a)*70,.7+.3*E.back(p))});
    op(R.vt,P(lt,.8,1.8));op(R.vt2,P(lt,1.4,2.2));
    const sway=Math.sin(lt*.9)*1.2;tr(R.bamboo,0,0,1,sway);
    const push=E.in(P(t,G1-2.6,G1-.1));sc.zoomOverride=1+push*3.2+.03*P(t,G0,G1);
  },{zoom:.03,fi:.7,fo:.5});
  sc3.el.style.transformOrigin=`${cx}px ${cy}px`;
  chapterCard('paper','sPaper');
});

/* ================= PAPER ================= */
BUILDERS.push(()=>{
  const K='paper';
  /* ---- P1 writing media ---- */
  const A0=S(K,0)-.45,A1=S(K,2)-.15;const XS=[300,730,1170,1600],GY=650;
  const r=rng(3);
  let cracks='';for(let i=0;i<9;i++){const x=-70+(i%3)*70+r()*10,y=-110+Math.floor(i/3)*85+r()*10;cracks+=`<path d="M${x},${y} v28 M${x},${y+8} l${12+r()*6},-7" stroke="#5f4428" stroke-width="2.2" fill="none" stroke-linecap="round"/>`}
  const og=['贞','王','雨','日','卜','月','受','年'];let ogt='';og.forEach((c,i)=>{ogt+=`<text x="${-84+(i%4)*56+(i>3?28:0)}" y="${-60+Math.floor(i/4)*140}" font-size="22" fill="#6e5232" opacity=".75" text-anchor="middle">${c}</text>`});
  const bone=`<ellipse cx="0" cy="4" rx="150" ry="16" fill="url(#gShadow)"/><g transform="translate(0 -180)"><path d="M0,-160 C62,-160 108,-128 112,-70 C116,-20 106,60 92,104 C80,142 44,160 0,160 C-44,160 -80,142 -92,104 C-106,60 -116,-20 -112,-70 C-108,-128 -62,-160 0,-160Z" fill="url(#gBone)" stroke="#8a7354" stroke-width="2.5" filter="url(#fShadow)"/><path d="M0,-156 V156 M-108,-40 Q-50,-30 0,-38 Q50,-30 108,-40 M-98,56 Q-50,64 0,56 Q50,64 98,56 M-80,-120 Q-40,-108 0,-116 Q40,-108 80,-120" stroke="#a8916a" stroke-width="1.5" fill="none"/>${cracks}${ogt}</g>`;
  let spk='';for(let i=0;i<40;i++)spk+=`<circle cx="${(-110+r()*220).toFixed(0)}" cy="${(-130+r()*140).toFixed(0)}" r="${(1+r()*4).toFixed(1)}" fill="#9cc2a6" opacity="${(.2+r()*.4).toFixed(2)}"/>`;
  let spir='';for(let i=0;i<8;i++){const x=-100+i*28.5;spir+=`<path d="M${x},-112 q8,-8 14,0 q-6,10 -12,2 M${x+14},-100 q8,8 14,0" stroke="#b4c49a" stroke-width="2" fill="none" opacity=".55"/>`}
  const ding=`<ellipse cx="0" cy="4" rx="160" ry="16" fill="url(#gShadow)"/><g transform="translate(0 -170)"><path d="M-102,-140 v-54 h30 v54 M72,-140 v-54 h30 v54" fill="none" stroke="#3f5a4e" stroke-width="13" stroke-linejoin="round"/>
   <path d="M-12,8 L-10,150 L12,150 L14,8Z" fill="#2c3f38"/><path d="M-84,0 L-98,150 L-70,150 L-58,6Z M84,0 L98,150 L70,150 L58,6Z" fill="url(#gBronze)" stroke="#22322c" stroke-width="2"/>
   <rect x="-134" y="-158" width="268" height="22" rx="5" fill="#4f6a5c" stroke="#22322c" stroke-width="2"/><path d="M-124,-138 H124 C124,-40 92,12 0,16 C-92,12 -124,-40 -124,-138Z" fill="url(#gBronze)" stroke="#22322c" stroke-width="2.5" filter="url(#fShadow)"/>
   <rect x="-118" y="-126" width="236" height="34" fill="#3d5549" opacity=".6"/>${spir}<ellipse cx="-22" cy="-108" rx="9" ry="6" fill="#c9b37a"/><ellipse cx="22" cy="-108" rx="9" ry="6" fill="#c9b37a"/><path d="M-60,-60 q60,40 120,0" stroke="#9cb08c" stroke-width="2" fill="none" opacity=".4"/>${spk}</g>`;
  const lunyu='学而时习之不亦说乎有朋自远方来不亦乐乎人不知而不愠不亦君子乎吾日三省吾身为人谋而不忠乎与朋友交而不信乎';
  let slips='';for(let i=0;i<9;i++){let tx='';for(let j=0;j<7;j++)tx+=lunyu[(i*7+j)%lunyu.length];slips+=`<g k="sl${i}"><rect x="-11" y="-330" width="22" height="306" rx="4" fill="url(#gBamboo)" stroke="#8a7140" stroke-width="1"/><rect x="-11" y="-250" width="22" height="2.5" fill="#9c8248"/><rect x="-11" y="-120" width="22" height="2.5" fill="#9c8248"/>${vtext(tx,0,-318,17,38,'fill="#2e2216" font-weight="700"')}</g>`}
  const bamboo=`<ellipse cx="0" cy="4" rx="170" ry="16" fill="url(#gShadow)"/>${slips}<rect k="cord1" x="-130" y="-268" width="260" height="3" fill="#6b4a2a"/><rect k="cord2" x="-130" y="-92" width="260" height="3" fill="#6b4a2a"/>`;
  let silkTxt='';const st='天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏';for(let c=0;c<7;c++){silkTxt+=`<line x1="${-96+c*30+15}" y1="-312" x2="${-96+c*30+15}" y2="-52" stroke="#b5301f" stroke-width="1.2" opacity=".55"/>`;if(c<7)silkTxt+=vtext(st.substr(c*4,4).replace(/./g,m=>m),-96+c*30,-300,20,30,'fill="#2b2218" opacity=".85"')}
  const silk=`<ellipse cx="0" cy="4" rx="150" ry="16" fill="url(#gShadow)"/><path k="silkP" fill="url(#gSilk)" stroke="#c9b27e" stroke-width="1.5" filter="url(#fShadow)"/>${silkTxt}`;
  const names=[['甲骨','商'],['青铜器','商 · 周'],['竹简','战国 · 秦汉'],['缣帛','战国 · 汉']];
  const items=[bone,ding,bamboo,silk];let im='';items.forEach((x,i)=>{im+=`<g k="it${i}"><g k="art${i}">${x}</g><text y="64" text-anchor="middle" font-size="34" font-weight="700" fill="#2a2018" letter-spacing="4">${names[i][0]}</text><text y="100" text-anchor="middle" font-size="22" fill="#8a6d45" letter-spacing="3">${names[i][1]}</text></g>`});
  const m=`<text k="h1" x="960" y="176" text-anchor="middle" font-size="36" fill="#5b4630" letter-spacing="6">纸出现以前，文字写在哪里？</text>
  <text k="h2" x="960" y="176" text-anchor="middle" font-size="36" fill="#b5301f" letter-spacing="6">人们需要一种轻便又廉价的书写材料</text>
  <line x1="300" y1="${GY+4}" x2="1620" y2="${GY+4}" stroke="#b9a37a" stroke-width="1" opacity=".5"/>${im}
  <g k="stB"><image href="${ASSET.sBen}" x="-45" y="-72" width="90" height="144"/></g><g k="stA"><image href="${ASSET.sAng}" x="-45" y="-72" width="90" height="144"/></g>`;
  const wts=[W(K,0,'甲骨'),W(K,0,'青铜'),W(K,0,'竹简'),W(K,0,'缣帛')];const s1=S(K,1);
  scene('p1',A0,A1,m,(t,R)=>{
    op(R.h1,P(t,A0+.3,A0+1.1)*(1-P(t,s1-.2,s1+.3)));op(R.h2,P(t,W(K,1,'都不'),W(K,1,'都不')+.6));
    const mv=E.io(P(t,s1-.1,s1+.9));
    for(let i=0;i<4;i++){const p=E.out(P(t,wts[i]-.25,wts[i]+.55));let x=XS[i],s=1,o=p;
      if(i<2){o*=1-P(t,s1-.2,s1+.5);x-=mv*120}
      if(i===2){x=lerp(XS[2],700,mv);s=1+.18*mv}if(i===3){x=lerp(XS[3],1230,mv);s=1+.18*mv}
      const hl=(t>wts[i]&&t<(wts[i+1]??s1))?1:0;
      op(R['it'+i],o);tr(R['it'+i],x,GY+(1-p)*40,s*(1+.0*hl))}
    const ur=E.io(P(t,wts[2]-.1,wts[2]+1.0));for(let i=0;i<9;i++)tr(R['sl'+i],(i-4)*28*ur,0);[R.cord1,R.cord2].forEach(c=>{at(c,'x',(-4*28*ur-14).toFixed(1));at(c,'width',(8*28*ur+28).toFixed(1))});
    // silk waving
    const w=k=>Math.sin(t*1.6+k)*6;at(R.silkP,'d',`M-112,-330 Q0,${-334+w(0)} 112,${-330+w(1)} Q${118+w(2)},-180 ${112+w(3)},-36 Q0,${-30+w(4)} -112,-36 Q${-116+w(5)*.5},-180 -112,-330Z`);
    const[bo,bs]=stampA(t,W(K,1,'笨重'));op(R.stB,bo);tr(R.stB,700+140,GY-300,bs,-8);
    const[ao,as]=stampA(t,W(K,1,'昂贵'));op(R.stA,ao);tr(R.stA,1230+148,GY-300,as,6);
    const dim=1-.45*P(t,W(K,1,'都不'),W(K,1,'都不')+.8);op(R.art2,dim);op(R.art3,dim);
  },{zoom:.03});
  fact(s1+.4,A1+.1,70,150,430,'史料','衡石量书','据《史记》记载，秦始皇每天批阅的竹简按<em>重量</em>计算，定额为“一石”，约合今<em>三十公斤</em>。');

  /* ---- P2a fragment ---- */
  const B0=S(K,2)-.35,B1=S(K,3)-.1;
  let fib='';const r2=rng(9);for(let i=0;i<110;i++){const x=-160+r2()*320,y=-100+r2()*200,a=r2()*Math.PI,l=10+r2()*34;fib+=`<path d="M${x.toFixed(0)},${y.toFixed(0)} q${(Math.cos(a+.6)*l*.5).toFixed(0)},${(Math.sin(a+.6)*l*.5).toFixed(0)} ${(Math.cos(a)*l).toFixed(0)},${(Math.sin(a)*l).toFixed(0)}" stroke="#a88c58" stroke-width="${(.6+r2()*1.2).toFixed(1)}" fill="none" opacity="${(.3+r2()*.5).toFixed(2)}"/>`}
  let torn='M';for(let i=0;i<36;i++){const a=i/36*Math.PI*2;const rr=(i%2?1:.94)*(150+30*Math.sin(a*3+1)+r2()*16);torn+=`${(Math.cos(a)*rr*1.25).toFixed(0)},${(Math.sin(a)*rr*.8).toFixed(0)} `}torn+='Z';
  let soil='';const cols=['#d4c09a','#c8b086','#bba072','#ad9264'];cols.forEach((c,i)=>{const y=640+i*48;soil+=`<path d="M0,${y} C400,${y-18} 800,${y+16} 1200,${y-6} C1500,${y-16} 1700,${y+10} 1920,${y-4} V880 H0Z" fill="${c}" opacity=".55"/>`});for(let i=0;i<70;i++)soil+=`<ellipse cx="${(r2()*1920).toFixed(0)}" cy="${(680+r2()*180).toFixed(0)}" rx="${(2+r2()*7).toFixed(0)}" ry="${(1.5+r2()*4).toFixed(0)}" fill="#8a7350" opacity=".35"/>`;
  const m2=`<g k="soil">${soil}</g>
   <g k="frag"><path d="${torn}" fill="#e7d3a2" stroke="#a88a55" stroke-width="2" filter="url(#fShadow)"/><path d="${torn}" fill="#c9a765" opacity=".18" transform="scale(.8)"/><clipPath id="fragClip"><path d="${torn}"/></clipPath><g clip-path="url(#fragClip)">${fib}</g></g>
   <g k="lens"><clipPath id="lensClip"><circle r="104"/></clipPath><g clip-path="url(#lensClip)"><circle r="104" fill="#ead8aa"/><g k="lensIn" transform="scale(3.2)">${fib}</g></g><circle r="108" fill="none" stroke="#3a2d20" stroke-width="12"/><circle r="100" fill="none" stroke="#fff" stroke-width="2" opacity=".35"/><rect x="-14" y="112" width="28" height="140" rx="10" fill="url(#gWoodD)" transform="rotate(-40)"/><text x="0" y="-130" text-anchor="middle" font-size="26" font-weight="700" fill="#2a2018">麻纤维</text></g>
   <g k="lab"><text x="960" y="640" text-anchor="middle" font-size="36" font-weight="700" fill="#2a2018" letter-spacing="4" paint-order="stroke" stroke="#efe6d2" stroke-width="6">西汉 · 麻纸残片</text><text x="960" y="680" text-anchor="middle" font-size="22" fill="#6b5434" letter-spacing="4" paint-order="stroke" stroke="#efe6d2" stroke-width="5">考古出土实物（示意）</text></g>`;
  scene('p2a',B0,B1,m2,(t,R)=>{const lt=t-B0;
    op(R.soil,P(lt,0,.6));const rise=E.out(P(lt,.3,1.8));op(R.frag,P(lt,.3,.9));tr(R.frag,900,lerp(720,420,rise),.9+.1*rise,-4+2*rise);
    const lp=E.io(P(lt,2.2,3.2));op(R.lens,P(lt,2.2,2.6));const lx=lerp(1500,1050,lp)+Math.sin(lt*.8)*14,ly=lerp(250,360,lp);tr(R.lens,lx,ly);
    // lens content shows fragment area under lens (frag at 900,420): offset
    at(R.lensIn,'transform',`scale(3.2) translate(${((900-lx)/1).toFixed(1)/1} ${(420-ly).toFixed(1)})`);
    op(R.lab,P(lt,1.3,2));
  },{zoom:.04});
  addFX(B0+.5,B0+2.6,(c,t)=>{const lt=t-B0-.5;for(let i=0;i<40;i++){const d=(lt*.9+hash(i))%1;const x=760+hash(i+4)*280+Math.sin(i+lt)*10,y=700-d*240;c.fillStyle=`rgba(140,110,70,${(1-d)*.5*Math.min(1,(B0+2.6-t))})`;c.beginPath();c.arc(x,y,1+hash(i+8)*2.5,0,7);c.fill()}});
  fact(B0+1.6,B1+.1,1380,150,450,'考古','比蔡伦更早的纸','灞桥、放马滩、悬泉置等多处<em>西汉遗址</em>都出土过古纸实物，说明造纸术在蔡伦之前已经出现。');

  /* ---- P2b Cai Lun & process ---- */
  const C0=S(K,3)-.35,C1=S(K,4)+.15;const SX=[600,930,1260,1590],SY=430;
  const ic={
   bark:`<path d="M-34,-12 C-12,-26 18,-24 36,-14 L32,14 C14,4 -12,4 -36,14Z" fill="#7a5534" stroke="#4a301a" stroke-width="2"/><path d="M-26,-6 q20,-6 50,-2 M-28,4 q22,-6 52,0" stroke="#4a301a" stroke-width="1.2" fill="none" opacity=".7"/>`,
   hemp:`<g stroke="#b59a5a" stroke-width="2.4" fill="none" stroke-linecap="round">${[...Array(9)].map((_,i)=>`<path d="M0,10 Q${(i-4)*4},-10 ${(i-4)*7},-30"/>`).join('')}${[...Array(7)].map((_,i)=>`<path d="M0,10 Q${(i-3)*4},20 ${(i-3)*6},32"/>`).join('')}</g><rect x="-10" y="4" width="20" height="9" rx="2" fill="#8a5a2a"/>`,
   rag:`<path d="M-34,-24 L-10,-30 L6,-22 L30,-28 L36,-4 L28,8 L34,26 L6,30 L-12,24 L-32,28 L-36,4Z" fill="#7d8597" stroke="#4a4f5c" stroke-width="2"/><rect x="-4" y="-12" width="22" height="18" fill="#a2785a" stroke="#5c4030" stroke-width="1.5" transform="rotate(8)"/><path d="M-28,-14 l50,0" stroke="#e8e0cc" stroke-width="1.5" stroke-dasharray="3 3"/>`,
   net:`<clipPath id="netc"><ellipse rx="36" ry="28"/></clipPath><g clip-path="url(#netc)" stroke="#5a4a32" stroke-width="1.8">${[...Array(9)].map((_,i)=>`<line x1="${-50+i*12}" y1="-40" x2="${-10+i*12}" y2="40"/><line x1="${-10+i*12}" y1="-40" x2="${-50+i*12}" y2="40"/>`).join('')}</g><ellipse rx="36" ry="28" fill="none" stroke="#5a4a32" stroke-width="2.5"/><circle cx="-30" cy="-18" r="5" fill="#c8823a"/><circle cx="30" cy="-18" r="5" fill="#c8823a"/>`};
  const mats=[['bark','树皮',-62,-140],['hemp','麻头',62,-140],['rag','破布',-62,-56],['net','渔网',62,-56]];
  let st0=`<path d="M-100,40 L100,40 L88,128 L-88,128Z" fill="url(#gWood)" stroke="#5a3a1e" stroke-width="2"/><rect x="-104" y="60" width="208" height="7" fill="#5a3a1e"/><rect x="-96" y="104" width="192" height="7" fill="#5a3a1e"/><ellipse cx="0" cy="40" rx="100" ry="15" fill="#9fb4ac" stroke="#5a3a1e" stroke-width="2"/><ellipse k="ripA" cx="0" cy="40" rx="40" ry="6" fill="none" stroke="#fff" stroke-width="1.5" opacity=".6"/>`;
  mats.forEach(([k,l,x,y],i)=>{st0+=`<g k="mt${i}" transform="translate(${x} ${y})">${ic[k]}<text y="50" text-anchor="middle" font-size="20" fill="#4a3a28" font-weight="700">${l}</text></g>`});
  const st1=`<g k="pestle"><rect x="-14" y="-130" width="28" height="136" rx="12" fill="url(#gWoodD)"/><rect x="-56" y="-124" width="112" height="15" rx="7" fill="#6b4524"/></g><path d="M-86,10 L86,10 L66,120 L-66,120Z" fill="#8c8478" stroke="#5c564c" stroke-width="2"/><ellipse cx="0" cy="10" rx="86" ry="16" fill="#6f685d"/><ellipse cx="0" cy="12" rx="62" ry="10" fill="#e5d7b5"/><g k="puff">${[...Array(7)].map((_,i)=>`<circle cx="${(i-3)*16}" cy="${-4-(i%3)*10}" r="${4+(i%2)*3}" fill="#efe3c5" opacity=".9"/>`).join('')}</g>`;
  const st2=`<path d="M-110,-6 L110,-6 L130,30 L-90,30Z" fill="#8fb0ab" stroke="#4d5c58" stroke-width="2"/><g k="screen"><path d="M-80,-10 L80,-10 L96,18 L-64,18Z" fill="#c9a96a" stroke="#6b4a2a" stroke-width="2.5"/>${[...Array(12)].map((_,i)=>`<line x1="${-76+i*13.5}" y1="-9" x2="${-60+i*13.5}" y2="17" stroke="#8a6a3a" stroke-width="1"/>`).join('')}<path k="sheet" d="M-70,-6 L70,-6 L84,14 L-56,14Z" fill="#f7f0de"/></g><path d="M-90,30 L130,30 L130,130 L-90,130Z" fill="url(#gWood)" stroke="#5a3a1e" stroke-width="2"/><path d="M-110,-6 L-90,30 L-90,130 L-110,96Z" fill="#7d5532" stroke="#5a3a1e" stroke-width="2"/><rect x="-90" y="60" width="220" height="6" fill="#5a3a1e" opacity=".7"/><g k="drips">${[...Array(6)].map((_,i)=>`<ellipse k="dr${i}" cx="${-60+i*26}" cy="0" rx="2.4" ry="4" fill="#7fa3a0"/>`).join('')}</g>`;
  let st3=`<rect x="-110" y="-150" width="220" height="250" fill="#d9d0c0" stroke="#9a8f7c" stroke-width="2"/>${[...Array(9)].map((_,i)=>`<line x1="-110" y1="${-150+i*28}" x2="110" y2="${-150+i*28}" stroke="#bfb4a0" stroke-width="1"/>`).join('')}`;
  for(let i=0;i<3;i++)st3+=`<g k="ws${i}"><rect x="${-92+i*64}" y="-126" width="56" height="170" fill="#faf5e8" stroke="#d8cdb6" stroke-width="1" transform="rotate(${(i-1)*1.5} ${-64+i*64} -40)"/></g>`;
  st3+=`<g k="steam" fill="none" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round">${[0,1,2].map(i=>`<path k="sm${i}" d="M${-64+i*64},-150 q-10,-20 0,-40 q10,-20 0,-40"/>`).join('')}</g><g transform="translate(70 108)">${[...Array(5)].map((_,i)=>`<rect x="-40" y="${-i*5}" width="80" height="6" fill="${i%2?'#f7f0de':'#ece2c9'}" stroke="#cbbd9c" stroke-width=".8"/>`).join('')}</g>`;
  const stN=[['原料','树皮 · 麻头 · 破布 · 渔网'],['舂捣','切碎蒸煮 · 捣成纸浆'],['抄纸','竹帘入槽 · 抄起纸膜'],['晒纸','贴壁烘晒 · 揭下成纸']];
  const stArt=[st0,st1,st2,st3];let stm='';
  stArt.forEach((a,i)=>{stm+=`<g k="st${i}"><rect x="-150" y="-175" width="300" height="350" rx="10" fill="#fbf6ea" opacity=".6" stroke="#c9a24f" stroke-width="1.2"/><g transform="translate(0 ${i===0?20:i===3?10:-10})">${a}</g><g transform="translate(0 222)"><circle cx="-${stN[i][0].length*17+30}" cy="-10" r="17" fill="#b5301f"/><text x="-${stN[i][0].length*17+30}" y="-2" text-anchor="middle" font-size="22" fill="#fff4dc" font-weight="700">${i+1}</text><text x="10" y="0" text-anchor="middle" font-size="34" font-weight="700" fill="#2a2018" letter-spacing="6">${stN[i][0]}</text><text y="40" text-anchor="middle" font-size="20" fill="#7a6040">${stN[i][1]}</text></g></g>`});
  let arr='';for(let i=0;i<3;i++){const x=(SX[i]+SX[i+1])/2;arr+=`<g k="ar${i}" transform="translate(${x} ${SY})"><path d="M-12,-16 L6,0 L-12,16" fill="none" stroke="#c9a24f" stroke-width="4" stroke-linecap="round"/></g>`}
  const m3=`<g k="cai" transform="translate(220 450)">${nameMedal('caiM','蔡伦','东汉 · 尚方令','sPaper')}</g>
   <g k="hd"><text x="1095" y="178" text-anchor="middle" font-size="36" font-weight="700" fill="#3a2d20" letter-spacing="8">蔡伦改进造纸术</text><rect x="900" y="196" width="390" height="2" fill="url(#gGoldH)"/></g>
   <g k="sts">${stm}${arr}</g><rect k="sweep" x="0" y="250" width="200" height="420" fill="url(#gGoldH)" opacity="0"/>`;
  const mt=[W(K,3,'树皮'),W(K,3,'麻头'),W(K,3,'破布'),W(K,3,'渔网')];const sr=[W(K,3,'蔡伦')+.6,W(K,3,'破布'),W(K,3,'渔网'),W(K,3,'原料')];const gy=W(K,3,'改进');
  scene('p2b',C0,C1,m3,(t,R)=>{
    op(R.cai,P(t,C0+.3,C0+1.1));tr(R.cai,220,450+(1-E.out(P(t,C0+.3,C0+1.1)))*20);
    op(R.hd,P(t,C0+.4,C0+1.2));
    for(let i=0;i<4;i++){const p=E.out(P(t,sr[i]-.1,sr[i]+.6));op(R['st'+i],p);tr(R['st'+i],SX[i],SY+(1-p)*30)}
    for(let i=0;i<3;i++){const p=P(t,sr[i+1]-.1,sr[i+1]+.4);op(R['ar'+i],p);tr(R['ar'+i],(SX[i]+SX[i+1])/2+Math.sin(t*4)*3*p,SY)}
    mats.forEach(([k,l,x,y],i)=>{const p=P(t,mt[i]-.25,mt[i]+.35);op(R['mt'+i],Math.min(1,p*3));tr(R['mt'+i],x,y-130*(1-E.out(p))*(1-p)+Math.abs(Math.sin(p*Math.PI))*-10)});
    at(R.ripA,'rx',(40+((t*30)%60)).toFixed(1));op(R.ripA,.6*(1-((t*30)%60)/60));
    // pestle
    const ph=(t*1.25)%1;const up=ph<.6?E.out(ph/.6):1-E.in((ph-.6)/.4);tr(R.pestle,0,-up*48);op(R.puff,ph<.15?1-ph/.15:0);tr(R.puff,0,0,1+(ph<.15?ph*4:0));
    // screen
    const c=(t-sr[2])/3.2,cp=((c%1)+1)%1;let sy;if(cp<.3)sy=lerp(-70,40,E.io(cp/.3));else if(cp<.5)sy=40+Math.sin(cp*60)*3;else if(cp<.8)sy=lerp(40,-70,E.io((cp-.5)/.3));else sy=-70;
    tr(R.screen,0,sy);op(R.sheet,cp>.5||cp<.25?1:0);
    for(let i=0;i<6;i++){const d=((t*1.6+hash(i))%1);const vis=cp>.62&&cp<1;op(R['dr'+i],vis?(1-d):0);at(R['dr'+i],'cy',(sy+18+d*60).toFixed(1))}
    for(let i=0;i<3;i++){const p=P(t,sr[3]+.2+i*.35,sr[3]+.6+i*.35);op(R['ws'+i],p);}
    for(let i=0;i<3;i++){const d=(t*.5+i*.33)%1;op(R['sm'+i],.6*Math.sin(Math.PI*d)*P(t,sr[3]+.5,sr[3]+1));tr(R['sm'+i],Math.sin(t+i)*4,-d*30)}
    const sw=P(t,gy,gy+1.3);op(R.sweep,Math.sin(Math.PI*sw)*.7);at(R.sweep,'x',(lerp(420,1750,sw)-100).toFixed(1));
  },{zoom:.025});

  /* ---- P3 : 105 ---- */
  const D0=S(K,4)-.3,D1=S(K,5)-.05;
  const roof=`<path d="M520,262 C600,250 660,214 720,170 L1200,170 C1260,214 1320,250 1400,262 L1380,276 L540,276Z" fill="#2a2420"/><path d="M700,170 L760,118 L1160,118 L1220,170Z" fill="#3a322c"/><rect x="740" y="108" width="440" height="12" rx="4" fill="#2a2420"/><path d="M736,108 q-14,-26 6,-38 q2,16 14,22Z M1184,108 q14,-26 -6,-38 q-2,16 -14,22Z" fill="#2a2420"/><rect x="560" y="276" width="800" height="8" fill="url(#gGoldH)"/>
   <linearGradient id="colG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a2a1c" stop-opacity=".55"/><stop offset="1" stop-color="#7a2a1c" stop-opacity="0"/></linearGradient>${[620,800,1120,1300].map(x=>`<rect x="${x-11}" y="284" width="22" height="200" fill="url(#colG)"/>`).join('')}`;
  const m4=`<g k="roof">${roof}<text k="emp" x="960" y="330" text-anchor="middle" font-size="26" fill="#6b5434" letter-spacing="6">汉和帝 · 刘肇</text></g>
   <g k="num"><text x="960" y="560" text-anchor="middle" font-weight="700" fill="url(#gGold)" stroke="#7a5a20" stroke-width="1.2"><tspan font-size="56" dy="-6">公元 </tspan><tspan k="n" font-size="190">105</tspan><tspan font-size="56" dy="-6"> 年</tspan></text>
   <text x="960" y="616" text-anchor="middle" font-size="26" fill="#8a6d45" letter-spacing="10">东汉 · 元兴元年</text></g>
   <g k="tray"><ellipse cx="0" cy="40" rx="220" ry="34" fill="url(#gShadow)"/><path d="M-200,0 L200,0 L180,36 L-180,36Z" fill="#7d1d12" stroke="#c9a24f" stroke-width="3"/><rect x="-200" y="-8" width="400" height="10" rx="3" fill="#9a2a1a" stroke="#c9a24f" stroke-width="2"/>${[0,1,2,3].map(i=>`<rect x="${-130+i*3}" y="${-20-i*6}" width="260" height="14" fill="${i%2?'#fbf6ea':'#efe5cf'}" stroke="#d8ccb0" stroke-width="1"/>`).join('')}<g k="stC"><image href="${ASSET.sCai}" x="-38" y="-62" width="76" height="122"/></g></g>`;
  const n0=W(K,4,'1'),wx=W(K,4,'献给'),wc=W(K,4,'蔡侯');
  scene('p3',D0,D1,m4,(t,R)=>{
    op(R.roof,P(t,D0+.1,D0+1));tr(R.roof,0,(1-E.out(P(t,D0+.1,D0+1.2)))*-30);op(R.emp,P(t,W(K,4,'汉和'),W(K,4,'汉和')+.6));
    const np=P(t,n0-.3,n0+.9);op(R.num,P(t,n0-.5,n0));R.n.textContent=String(Math.max(1,Math.round(105*E.out(np))));tr(R.num,0,0,1);
    const tp=E.out(P(t,wx-.5,wx+.6));op(R.tray,tp);tr(R.tray,960,lerp(860,750,tp));
    const[so,ss]=stampA(t,wc);op(R.stC,so);tr(R.stC,250,-20,ss,-4);
  },{zoom:.03});
  fact(wc-.4,D1+.1,1420,350,430,'知识点','为什么叫“蔡侯纸”？','元初元年（公元114年），蔡伦被封为<em>龙亭侯</em>，人们便把他改进的纸称为“蔡侯纸”。');

  /* ---- P4 : xuan paper + spread west ---- */
  const E0=S(K,5)-.3,E1=SEC[K].end+.3;const mapT=CH(K,5,1)-.7;
  const route=[[108.9,34.3],[100,38.5],[94.7,40.1],[80,41],[67,39.7],[58,37.5],[51.4,35.7],[44.4,33.3],[36.3,33.5],[31.2,30.0],[20,32],[10.2,36.8],[2,36.5],[-3.7,40.4]].map(p=>projOld(...p));
  const cities=[['ca','长安',108.9,34.3,'','start',18,-14],['sm','撒马尔罕',67,39.7,'8世纪','middle',0,-50],['bg','巴格达',44.4,33.3,'8世纪末','middle',0,44],['cr','开罗',31.2,30.0,'10世纪','end',-16,40],['es','西班牙',-3.7,40.4,'12世纪','middle',0,44]];
  const cm=cities.map(([k,l,lo,la,sub,an,dx,dy])=>{const[x,y]=projOld(lo,la);return cityDot(k,x,y,l,sub,an,dx,dy)}).join('');
  const wash=projOld(105,34);
  const m5=`<g k="mapG"><g k="mapIn">${oldMap()}<circle cx="${wash[0]}" cy="${wash[1]}" r="190" fill="url(#gGlow)" opacity=".5"/>
    <text x="${projOld(103,33)[0]}" y="${projOld(103,33)[1]+60}" text-anchor="middle" class="msz" font-size="64" fill="#b5301f" opacity=".85">中国</text>
    <text k="lAr" x="${projOld(45,25)[0]}" y="${projOld(45,25)[1]}" text-anchor="middle" class="msz" font-size="52" fill="#5b4630">阿拉伯地区</text>
    <text k="lEu" x="${projOld(14,47.5)[0]}" y="${projOld(14,47.5)[1]}" text-anchor="middle" class="msz" font-size="60" fill="#5b4630">欧洲</text>
    <path k="route" d="${smoothPath(route)}" fill="none" stroke="#b5301f" stroke-width="5" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>
    <path k="route2" d="${smoothPath(route)}" fill="none" stroke="#f3d58c" stroke-width="1.6" stroke-dasharray="6 10" opacity=".9"/>${cm}
    <g k="head"><circle r="22" fill="url(#gGlow)"/><rect x="-14" y="-10" width="28" height="20" fill="#fbf6ea" stroke="#8a6d45" stroke-width="1.5"/></g></g></g>
   <g k="sheetG"><rect x="-450" y="-270" width="900" height="540" fill="url(#gSheet)" filter="url(#fShadow)"/><clipPath id="xuanC"><rect k="xclip" x="-420" y="-240" width="840" height="480"/></clipPath>
    <g clip-path="url(#xuanC)"><image k="pl0" href="${ASSET.pl0}" x="-420" y="-240" width="840" height="480"/><image k="pl1" href="${ASSET.pl1}" x="-420" y="-240" width="840" height="480"/><image k="pl2" href="${ASSET.pl2}" x="-420" y="-240" width="840" height="480"/>
    <g k="boat"><path d="M120,150 q40,8 92,0 l-12,10 h-68Z" fill="#2a2420"/><line x1="160" y1="150" x2="168" y2="112" stroke="#2a2420" stroke-width="2"/><path d="M60,175 h60 M150,182 h90 M250,170 h40" stroke="#6b6b66" stroke-width="1.2" opacity=".6"/></g>
    <g k="ins">${vtext('纸寿千年',360,-200,40,46,'class="msz" fill="#1d1a16"')}<image href="${ASSET.sPaper}" x="338" y="-6" width="44" height="44"/></g></g>
    <text y="320" text-anchor="middle" font-size="34" font-weight="700" fill="#2a2018" letter-spacing="6">唐宋 · 宣纸</text></g>`;
  const xw=W(K,5,'宣纸');
  scene('p4',E0,E1,m5,(t,R)=>{
    const mp=E.io(P(t,mapT,mapT+1.2));
    const sp=E.out(P(t,E0+.2,E0+1.2));op(R.sheetG,sp*(1-mp));
    const [cx,cy]=projOld(108.9,34.3);
    tr(R.sheetG,lerp(960,cx,mp),lerp(430+(1-sp)*30,cy,mp),lerp(1,.05,mp),-1.5);
    op(R.pl0,P(t,E0+.5,E0+1.6));op(R.pl1,P(t,E0+1.3,E0+2.4));op(R.pl2,P(t,E0+2.1,E0+3.1));op(R.boat,P(t,E0+2.8,E0+3.6));op(R.ins,P(t,xw-.3,xw+.6));tr(R.boat,Math.sin(t*.8)*4,0);
    op(R.mapG,mp);const z=lerp(1.12,1.0,E.out(P(t,mapT,E1)));tr(R.mapIn,960,520,z);at(R.mapIn,'transform',`translate(960 500) scale(${z.toFixed(4)}) translate(-960 -520)`);
    const rp=E.io(P(t,mapT+.8,SE(K,5)+.2));drawP(R.route,rp);op(R.route2,rp>0.01?.9:0);at(R.route2,'stroke-dashoffset',(-t*30).toFixed(1));
    const h=pathAt(R.route,1-rp<0?1:rp);tr(R.head,h.x,h.y);op(R.head,rp>0&&rp<.999?1:rp>=.999?1:0);
    const thr=[0,.36,.58,.68,.98];cities.forEach((c,i)=>{const p=P(rp,thr[i]-.02,thr[i]+.06);op(R[c[0]],i===0?mp:p);});
    op(R.lAr,P(t,W(K,5,'阿拉伯')-.2,W(K,5,'阿拉伯')+.6));op(R.lEu,P(t,W(K,5,'欧洲')-.2,W(K,5,'欧洲')+.6));
  },{zoom:.0});
  fact(E0+1.2,mapT+.4,1430,230,430,'知识点','宣纸','因产于<em>宣州</em>（今安徽泾县一带）而得名，质地绵韧、洁白耐久，素有“纸寿千年”之誉。');

  /* ---- paper timeline overlay ---- */
  const L0=S(K,2)-.3,L1=SEC[K].end+.2;const NX=[520,840,1160,1480];const NL=['西汉 · 早期麻纸','105年 · 蔡侯纸','唐宋 · 宣纸','经阿拉伯 · 传入欧洲'];
  const nt=[S(K,2),S(K,3),S(K,5),W(K,5,'阿拉伯')];
  let nm='';NL.forEach((l,i)=>{nm+=`<g k="nd${i}" transform="translate(${NX[i]} 858)"><circle k="ndc${i}" r="9" fill="#efe6d2" stroke="#b58a3a" stroke-width="2.5"/><text y="-22" text-anchor="middle" font-size="22" fill="#4a3a28" font-weight="700" letter-spacing="2" paint-order="stroke" stroke="#efe6d2" stroke-width="5">${l}</text></g>`});
  const m6=`<rect x="380" y="815" width="1240" height="64" rx="32" fill="#f3ead6" opacity=".72"/><line x1="440" y1="858" x2="1560" y2="858" stroke="#b9a37a" stroke-width="2"/><line k="prog" x1="440" y1="858" x2="440" y2="858" stroke="#b5301f" stroke-width="3.5"/>${nm}`;
  scene('paperTL',L0,L1,m6,(t,R)=>{let x=440;for(let i=0;i<4;i++){const p=P(t,nt[i]-.4,nt[i]+.4);if(p>0)x=lerp(i?NX[i-1]:440,NX[i],E.io(p));const on=t>=nt[i];at(R['ndc'+i],'fill',on?'#b5301f':'#efe6d2');at(R['ndc'+i],'r',on?11:8);op(R['nd'+i],on?1:.55)}at(R.prog,'x2',x.toFixed(1))},{zoom:0,fi:.5});
  chapterCard('print','sPrint');
});

/* ================= PRINT ================= */
BUILDERS.push(()=>{
  const K='print';
  /* ---- R1 scribe + woodblock ---- */
  const A0=S(K,0)-.35,A1=S(K,2)-.1,S1=S(K,1);
  const ly='学而时习之不亦说乎有朋自远方来不亦乐乎人不知而不愠不亦君子乎';
  let sc='';for(let k=0;k<30;k++){const c=Math.floor(k/6),r=k%6;sc+=`<text k="w${k}" x="${880-c*76}" y="${290+r*70}" font-size="50" text-anchor="middle" class="msz" fill="#1d1a16">${ly[k]}</text>`}
  const brush=`<g k="brush"><rect x="-6" y="-200" width="12" height="170" rx="4" fill="url(#gWoodD)"/><rect x="-8" y="-40" width="16" height="14" fill="#2a2018"/><path d="M-8,-26 Q-9,-6 0,8 Q9,-6 8,-26Z" fill="#1a1612"/></g>`;
  const scribe=`<g k="scribe"><rect x="450" y="210" width="520" height="470" fill="url(#gSheet)" filter="url(#fShadow)"/>${[...Array(6)].map((_,i)=>`<line x1="${918-i*76}" y1="230" x2="${918-i*76}" y2="660" stroke="#b5301f" stroke-width="1" opacity=".35"/>`).join('')}${sc}${brush}
   <text x="1300" y="380" text-anchor="middle" class="msz" font-size="110" fill="#1d1a16">手抄</text><text x="1300" y="450" text-anchor="middle" font-size="28" fill="#6b5434" letter-spacing="6">一字一字 · 费时费力</text>
   <g k="faster"><text x="1300" y="560" text-anchor="middle" font-size="40" font-weight="700" fill="#b5301f" letter-spacing="6">如何更快地复制？</text></g></g>`;
  const sutra='如是我闻一时佛在舍卫国祇树给孤独园与大比';
  let bc='',pc='',gh='';for(let k=0;k<20;k++){const c=Math.floor(k/4),r=k%4;const px=240-c*120,y=-118+r*84+24;
    bc+=`<text k="b${k}" transform="translate(${-px} ${y}) scale(-1 1)" font-size="66" font-weight="700" text-anchor="middle" fill="none" stroke="#8a6d45" stroke-width="1.2">${sutra[k]}</text>`;
    pc+=`<text x="${px}" y="${y}" font-size="66" font-weight="700" text-anchor="middle" fill="#1a1612" opacity=".92">${sutra[k]}</text>`;
    gh+=`<text transform="translate(${px} ${y}) scale(-1 1)" font-size="66" font-weight="700" text-anchor="middle" fill="#1a1612" opacity=".12">${sutra[k]}</text>`}
  let grain='';const rg=rng(5);for(let i=0;i<26;i++){const y=-200+i*16+rg()*6;grain+=`<path d="M-370,${y.toFixed(0)} C-200,${(y+rg()*14-7).toFixed(0)} 0,${(y+rg()*14-7).toFixed(0)} 370,${(y+rg()*10-5).toFixed(0)}" stroke="#8a5d33" stroke-width="${(.6+rg()).toFixed(1)}" fill="none" opacity=".35"/>`}
  const colLines=[...Array(6)].map((_,i)=>`<line x1="${-300+i*120}" y1="-172" x2="${-300+i*120}" y2="172" stroke="#7a4f2a" stroke-width="2" opacity=".55"/>`).join('');
  const block=`<g k="block"><rect x="-372" y="-214" width="744" height="440" rx="8" fill="#6b4524"/><rect x="-360" y="-210" width="720" height="420" rx="6" fill="url(#gWood)"/>${grain}<rect x="-312" y="-180" width="624" height="360" fill="none" stroke="#6b4524" stroke-width="5"/>${colLines}
   <clipPath id="inkC"><rect k="inkR" x="-360" y="-210" width="0" height="420"/></clipPath><rect x="-360" y="-210" width="720" height="420" fill="#1a1612" opacity=".28" clip-path="url(#inkC)"/>${bc}</g>`;
  const knife=`<g k="knife"><rect x="-5" y="-120" width="10" height="90" rx="3" fill="#7a5a3a"/><path d="M-5,-30 L5,-30 L2,0 L-6,-6Z" fill="#b8bcc0" stroke="#5a5e62" stroke-width="1"/></g>`;
  const roller=`<g k="roller"><rect x="-40" y="-60" width="80" height="44" rx="10" fill="#6b4524"/><path d="M-44,-18 Q0,10 44,-18 L40,8 Q0,24 -40,8Z" fill="#2a2018"/></g>`;
  const pad=`<g k="pad"><ellipse rx="54" ry="30" fill="#5a3a1e"/><ellipse rx="44" ry="22" fill="#7a5532"/></g>`;
  const sheet=`<g k="sheet"><g k="back"><rect x="-370" y="-220" width="740" height="440" fill="#f6efdd" stroke="#d8ccb0"/>${gh}</g><g k="front"><rect x="-370" y="-220" width="740" height="440" fill="#fbf6ea" stroke="#d8ccb0"/><rect x="-312" y="-180" width="624" height="360" fill="none" stroke="#1a1612" stroke-width="5" opacity=".85"/>${colLines.replace(/#7a4f2a/g,'#1a1612')}${pc}</g></g>`;
  const steps=['反刻','刷墨','覆纸','印出'];let chips='';steps.forEach((s,i)=>{chips+=`<g k="cp${i}" transform="translate(${960+(i-1.5)*190} 176)"><rect x="-80" y="-26" width="160" height="50" rx="25" fill="#efe6d2" stroke="#b58a3a" stroke-width="1.5"/><rect k="cpb${i}" x="-80" y="-26" width="160" height="50" rx="25" fill="#b5301f" opacity="0"/><text k="cpt${i}" y="9" text-anchor="middle" font-size="25" font-weight="700" fill="#5b4630" letter-spacing="4">${['①','②','③','④'][i]} ${s}</text></g>`});
  const wb=`<g k="wb"><g k="chips">${chips}</g><g k="blockG">${block}${knife}${roller}</g><g k="sheetG">${sheet}</g>${pad}<g k="printLab"><text x="1500" y="760" text-anchor="middle" font-size="34" font-weight="700" fill="#b5301f" letter-spacing="6">印出一页</text></g><g k="title"><text x="960" y="770" text-anchor="middle" class="msz" font-size="54" fill="#1d1a16">雕版印刷</text></g></g>`;
  const cv0=S1+.6,cv1=W(K,1,'刷墨')-.25,ink=W(K,1,'刷墨'),cov=W(K,1,'覆纸'),prn=CH(K,1,2)-.1;
  scene('r1',A0,A1,scribe+wb,(t,R)=>{
    const sOp=1-P(t,S1-.6,S1);op(R.scribe,sOp);
    if(sOp>0){const w0=A0+.4,w1=S1-.5;const kk=(t-w0)/(w1-w0)*30;for(let k=0;k<30;k++)op(R['w'+k],clamp(kk-k));const kc=clamp(Math.floor(kk),0,29);const c=Math.floor(kc/6),rr=kc%6;tr(R.brush,880-c*76+14+Math.sin(t*20)*3,290+rr*70-10-Math.abs(Math.sin(t*14))*8,1,18);op(R.brush,kk<30?1:0);op(R.faster,P(t,W(K,0,'更快')-.1,W(K,0,'更快')+.5))}
    const wOp=P(t,S1-.4,S1+.3);op(R.wb,wOp);if(wOp<=0)return;
    const act=t<ink?0:t<cov?1:t<prn?2:3;for(let i=0;i<4;i++){op(R['cpb'+i],act===i?1:0);at(R['cpt'+i],'fill',act===i?'#fff4dc':'#5b4630')}
    const kk=(t-cv0)/(cv1-cv0)*20;const bx=-360+720*E.io(P(t,ink,ink+.75));
    for(let k=0;k<20;k++){const el=R['b'+k];const c=Math.floor(k/4);const x=-(240-c*120);const carved=kk>k+1,inked=x<bx-20&&t>=ink;at(el,'fill',inked?'#15120f':carved?'#7a4a24':'none');at(el,'stroke',inked?'#15120f':carved?'#4a2c14':'#8a6d45');at(el,'stroke-width',carved?1.6:1.2)}
    const kc=clamp(Math.floor(kk),0,19);const kc4=Math.floor(kc/4),kr=kc%4;op(R.knife,kk>-.5&&kk<20.5?1:0);tr(R.knife,-(240-kc4*120)+Math.sin(t*26)*14,-118+kr*84+10+Math.cos(t*26)*8,1,25);
    at(R.inkR,'width',(bx+360).toFixed(1));op(R.roller,P(t,ink-.2,ink)*(1-P(t,ink+.75,ink+.95)));tr(R.roller,bx,40+Math.sin(t*30)*3);
    // block & sheet movement
    const mv=E.io(P(t,prn+.4,prn+1.4));tr(R.blockG,lerp(960,620,mv),lerp(470,480,mv),lerp(1,.68,mv));
    const sd=E.out(P(t,cov-.1,cov+.45));const lift=E.io(P(t,prn,prn+.4));
    const fl=P(t,prn+.35,prn+1.35);const sx=Math.cos(Math.PI*fl);const front=fl>.5;
    op(R.sheetG,sd);op(R.back,front?0:1);op(R.front,front?1:0);
    const sxp=lerp(960,1430,E.io(fl)),syp=lerp(470-(1-sd)*70-lift*30,480,E.io(fl)),ss=lerp(1,.62,E.io(fl));
    tr(R.sheetG,sxp,syp,ss*Math.max(.02,Math.abs(sx)),0,ss);
    op(R.pad,P(t,cov+.3,cov+.5)*(1-P(t,prn-.15,prn)));tr(R.pad,960+Math.sin(t*9)*230,470+Math.sin(t*5.3)*120);
    op(R.printLab,P(t,prn+1.2,prn+1.7));op(R.title,P(t,S1+.2,S1+.9)*(1-P(t,prn+.3,prn+.8)));
  },{zoom:.02});
  /* ---- R2 Diamond Sutra ---- */
  const B0=S(K,2)-.35,B1=S(K,3)-.1;
  const txt='如是我闻一时佛在舍卫国祇树给孤独园与大比丘众千二百五十人俱尔时世尊食时著衣持钵入舍卫大城乞食于其城中次第乞已还至本处饭食讫收衣钵洗足已敷座而坐时长老须菩提在大众中即从座起偏袒右肩右膝著地合掌恭敬而白佛言希有世尊';
  let cols='';const nC=13;for(let c=0;c<nC;c++)cols+=vtext(txt.substr(c*9,9),1180-c*56,240,28,34,'fill="#2a2218"');
  const colo='咸通九年四月十五日王玠为二亲敬造普施';
  const fig=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle cy="-46" r="11" fill="#e9d9b0" stroke="#2a2218" stroke-width="2"/><path d="M-16,-34 Q-24,10 -22,40 L22,40 Q24,10 16,-34 Q0,-28 -16,-34Z" fill="#e2cfa2" stroke="#2a2218" stroke-width="2"/><path d="M-12,-20 Q0,-10 12,-20 M-16,10 Q0,18 16,10" stroke="#2a2218" stroke-width="1.4" fill="none"/></g>`;
  const front=`<rect x="1290" y="226" width="400" height="328" fill="none" stroke="#2a2218" stroke-width="3"/><rect x="1298" y="234" width="384" height="312" fill="none" stroke="#2a2218" stroke-width="1"/>
   <path d="M1400,270 Q1490,236 1580,270 L1570,286 Q1490,258 1410,286Z" fill="#d8c393" stroke="#2a2218" stroke-width="2"/>${[...Array(7)].map((_,i)=>`<line x1="${1420+i*23}" y1="${284-Math.sin(i/6*Math.PI)*12}" x2="${1420+i*23}" y2="${300-Math.sin(i/6*Math.PI)*12}" stroke="#2a2218" stroke-width="1.5"/>`).join('')}
   <circle cx="1490" cy="400" r="74" fill="none" stroke="#2a2218" stroke-width="1.6"/><circle cx="1490" cy="352" r="30" fill="none" stroke="#2a2218" stroke-width="1.6"/>${[...Array(18)].map((_,i)=>{const a=i/18*Math.PI*2;return`<line x1="${1490+Math.cos(a)*76}" y1="${400+Math.sin(a)*76}" x2="${1490+Math.cos(a)*84}" y2="${400+Math.sin(a)*84}" stroke="#2a2218" stroke-width="1.2"/>`}).join('')}
   <circle cx="1490" cy="350" r="16" fill="#e9d9b0" stroke="#2a2218" stroke-width="2"/><circle cx="1490" cy="332" r="6" fill="#2a2218"/><path d="M1462,372 Q1490,362 1518,372 L1540,452 Q1490,466 1440,452Z" fill="#e2cfa2" stroke="#2a2218" stroke-width="2"/><path d="M1470,400 Q1490,420 1510,400 M1456,436 Q1490,448 1524,436" stroke="#2a2218" stroke-width="1.4" fill="none"/>
   <path d="M1426,470 Q1490,452 1554,470 Q1490,492 1426,470Z" fill="#d8c393" stroke="#2a2218" stroke-width="2"/>${[...Array(6)].map((_,i)=>`<path d="M${1432+i*21},470 q10,-14 20,0" stroke="#2a2218" stroke-width="1.2" fill="none"/>`).join('')}
   ${fig(1350,400,.8)}${fig(1632,400,.8)}${fig(1380,330,.6)}${fig(1602,330,.6)}<g transform="translate(1380 510) scale(.7)"><circle cy="-30" r="11" fill="#e9d9b0" stroke="#2a2218" stroke-width="2"/><path d="M-18,-18 Q-10,0 -26,20 L26,20 Q16,0 18,-18Z" fill="#e2cfa2" stroke="#2a2218" stroke-width="2"/></g>
   <rect x="1450" y="500" width="80" height="24" fill="#d8c393" stroke="#2a2218" stroke-width="1.8"/>`;
  let stains='';const rs=rng(21);for(let i=0;i<14;i++)stains+=`<circle cx="${(220+rs()*1480).toFixed(0)}" cy="${(220+rs()*340).toFixed(0)}" r="${(10+rs()*40).toFixed(0)}" fill="#b08a4a" opacity="${(.04+rs()*.06).toFixed(2)}"/>`;
  const m2=`<clipPath id="sutC"><rect k="sc" x="1720" y="190" width="0" height="400"/></clipPath>
   <g clip-path="url(#sutC)"><rect x="200" y="206" width="1520" height="368" fill="#e8d5a8" filter="url(#fShadow)"/><rect x="200" y="206" width="1520" height="368" fill="#c9a865" opacity=".15"/>${stains}${front}
   ${vtext('金刚般若波罗蜜经',1240,236,32,38,'font-weight="700" fill="#1a1410"')}${cols}
   <g k="colo">${vtext(colo.substr(0,9),330,240,28,34,'fill="#2a2218" font-weight="700"')}${vtext(colo.substr(9),274,240,28,34,'fill="#2a2218" font-weight="700"')}</g>
   <rect k="coloBox" x="244" y="226" width="116" height="336" fill="none" stroke="#b5301f" stroke-width="3.5" rx="6"/></g>
   <g k="rod"><rect x="-16" y="186" width="32" height="408" rx="12" fill="url(#gWoodD)"/><rect x="-20" y="172" width="40" height="22" rx="6" fill="url(#gGold)"/><rect x="-20" y="586" width="40" height="22" rx="6" fill="url(#gGold)"/></g>
   <g k="cTag"><path d="M302,568 L302,620" stroke="#b5301f" stroke-width="2"/><text x="302" y="652" text-anchor="middle" font-size="26" font-weight="700" fill="#b5301f">咸通九年 = 公元868年</text></g>
   <g k="cap"><text x="900" y="700" text-anchor="middle" class="msz" font-size="66" fill="#1d1a16">《金刚经》</text><text x="900" y="752" text-anchor="middle" font-size="28" fill="#6b5434" letter-spacing="6">唐 · 现存最早有明确日期的印刷品</text></g>`;
  const w868=W(K,2,'8'),wjg=W(K,2,'金刚');
  scene('r2',B0,B1,m2,(t,R)=>{const u=E.io(P(t,B0+.3,B0+3.2));const rx=lerp(1720,200,u);tr(R.rod,rx,0);at(R.sc,'x',rx.toFixed(1));at(R.sc,'width',(1720-rx+2).toFixed(1));
    const cb=P(t,w868-.3,w868+.4);op(R.coloBox,cb);op(R.cTag,cb);op(R.cap,P(t,wjg-.6,wjg+.2));tr(R.cap,0,(1-E.out(P(t,wjg-.6,wjg+.2)))*16)},{zoom:.025});
  fact(wjg-.2,B1+.1,1330,630,470,'馆藏','敦煌藏经洞出土','1900年发现于敦煌莫高窟藏经洞，今藏<em>英国大英图书馆</em>。卷首配有精美的扉画。');

  /* ---- R3 Bi Sheng movable type ---- */
  const C0=S(K,3)-.35,C1=S(K,5)-.1,S4=S(K,4);
  const chars='毕昇活字反复排版印书万卷';const T=84;
  const slab=k=>[800+((k%4)-1.5)*96,480+(Math.floor(k/4)-1)*96];
  const frame=k=>[1330+(1-Math.floor(k/4))*96,480+((k%4)-1.5)*96];
  let tiles='';for(let k=0;k<12;k++)tiles+=`<g k="t${k}"><rect x="-42" y="-42" width="84" height="84" rx="6" fill="url(#gClay)" stroke="#5a2e18" stroke-width="2"/><rect k="tg${k}" x="-42" y="-42" width="84" height="84" rx="6" fill="#ff8a3a" opacity="0"/><text k="tc${k}" transform="translate(0 20) scale(-1 1)" text-anchor="middle" font-size="56" font-weight="700" fill="#f3dcc0">${chars[k]}</text></g>`;
  let printed='';for(let k=0;k<12;k++){const[x,y]=frame(k);printed+=`<text x="${x-1330}" y="${y-480+20}" text-anchor="middle" font-size="56" font-weight="700" fill="#1a1612">${chars[k]}</text>`}
  const m3=`<g k="bi" transform="translate(220 470)">${nameMedal('biM','毕昇','北宋 · 布衣','sPrint','nserif')}</g>
   <g k="q1"><text x="1060" y="178" text-anchor="middle" font-size="30" fill="#3a2d20" letter-spacing="3">“用胶泥刻字，薄如钱唇，每字为一印，火烧令坚。”</text><text x="1060" y="218" text-anchor="middle" font-size="22" fill="#8a6d45" letter-spacing="4">—— 沈括《梦溪笔谈》</text></g>
   <g k="q2"><text x="1060" y="178" text-anchor="middle" font-size="30" fill="#3a2d20" letter-spacing="2">“常作二铁板，一板印刷，一板已自布字……更互用之，瞬息可就。”</text><text x="1060" y="218" text-anchor="middle" font-size="22" fill="#8a6d45" letter-spacing="4">—— 沈括《梦溪笔谈》</text></g>
   <g k="slabG"><rect x="590" y="318" width="420" height="324" rx="10" fill="#a8643c" stroke="#6b3a1e" stroke-width="2"/><g k="grid" stroke="#5a2e18" stroke-width="3">${[1,2,3].map(i=>`<line x1="${800+(i-2)*96+48}" y1="330" x2="${800+(i-2)*96+48}" y2="630" pathLength="1" stroke-dasharray="1 1" k="gv${i}"/>`).join('')}${[1,2].map(i=>`<line x1="600" y1="${480+(i-1.5)*96}" x2="1000" y2="${480+(i-1.5)*96}" pathLength="1" stroke-dasharray="1 1" k="gh${i}"/>`).join('')}</g></g>
   <g k="tray">${[...Array(12)].map((_,k)=>{const[x,y]=slab(k);return `<rect x="${x-42}" y="${y-42}" width="84" height="84" rx="6" fill="#d9c7a3" stroke="#a88a5a" stroke-dasharray="4 4" opacity=".7"/>`}).join("")}<rect x="584" y="312" width="432" height="336" rx="8" fill="none" stroke="#6b4524" stroke-width="14"/><text x="800" y="690" text-anchor="middle" font-size="24" fill="#6b4524" font-weight="700" letter-spacing="6">字盘</text></g>
   <g k="frameG"><rect x="1170" y="276" width="320" height="408" rx="6" fill="#4a4d50" stroke="#2a2c2e" stroke-width="3"/><rect x="1180" y="286" width="300" height="388" fill="#6b6f72"/><text x="1330" y="724" text-anchor="middle" font-size="24" fill="#3a3c3e" font-weight="700" letter-spacing="6">铁范 · 排版</text></g>
   <g k="kiln"><text x="800" y="290" text-anchor="middle" font-size="26" fill="#b5301f" font-weight="700" letter-spacing="6">火烧令坚</text></g>
   ${tiles}
   <g k="pr"><rect x="-160" y="-204" width="320" height="408" fill="#fbf6ea" stroke="#d8ccb0" filter="url(#fShadow)"/>${printed}</g>
   <g k="loop"><path d="M1330,262 C1300,200 860,200 820,290" fill="none" stroke="#b5301f" stroke-width="3" stroke-dasharray="8 8" k="lp"/><path d="M806,272 L820,296 L838,276" fill="none" stroke="#b5301f" stroke-width="3"/><text x="1075" y="252" text-anchor="middle" font-size="25" fill="#b5301f" font-weight="700" letter-spacing="4">拆版 · 再排 · 反复使用</text></g>`;
  const eng0=W(K,3,'毕昇')-.4,fire=W(K,3,'胶泥')+.3,fly0=S4+.1,press=W(K,4,'反复')-.5,back0=press+1.3;
  scene('r3',C0,C1,m3,(t,R)=>{
    op(R.bi,P(t,C0+.3,C0+1.1));op(R.q1,P(t,C0+.6,C0+1.4)*(1-P(t,S4-.4,S4)));op(R.q2,P(t,S4,S4+.6));
    op(R.slabG,P(t,C0+.3,C0+.9)*(1-P(t,S4-.3,S4+.2)));
    [1,2,3].forEach(i=>drawP(R['gv'+i],P(t,C0+1.0+i*.15,C0+1.6+i*.15)));[1,2].forEach(i=>drawP(R['gh'+i],P(t,C0+1.5+i*.15,C0+2.1+i*.15)));
    op(R.tray,P(t,S4-.2,S4+.4));op(R.frameG,P(t,S4-.3,S4+.3));
    op(R.kiln,P(t,fire,fire+.4)*(1-P(t,S4-.3,S4)));
    for(let k=0;k<12;k++){const[ax,ay]=slab(k),[bx,by]=frame(k);
      const ap=P(t,C0+1.9+k*.06,C0+2.3+k*.06);let x=ax,y=ay,o=ap;
      const f1=E.io(P(t,fly0+k*.13,fly0+k*.13+.7));const f2=E.io(P(t,back0+k*.06,back0+k*.06+.6));
      if(f1>0){x=lerp(ax,bx,f1);y=lerp(ay,by,f1)-Math.sin(Math.PI*f1)*90}
      if(f2>0){x=lerp(bx,ax,f2);y=lerp(by,ay,f2)-Math.sin(Math.PI*f2)*70}
      op(R['t'+k],o);tr(R['t'+k],x,y,1+.12*Math.sin(Math.PI*(f1||f2)));
      op(R['tc'+k],P(t,eng0+k*.12,eng0+k*.12+.25));
      const g=P(t,fire,fire+.6)*(1-P(t,fire+1.2,fire+2.2));op(R['tg'+k],g*(.45+.2*Math.sin(t*9+k)))}
    const pp=P(t,press,press+.5);const pl=E.io(P(t,press+.5,press+1.1));op(R.pr,pp);tr(R.pr,lerp(1330,1690,pl),480-(1-pp)*40,lerp(1,.78,pl));
    op(R.loop,P(t,back0+.2,back0+.8));at(R.lp,'stroke-dashoffset',(-t*40).toFixed(0));
  },{zoom:.02});
  addFX(W(K,3,'胶泥')+.3,W(K,3,'胶泥')+2.6,(c,t)=>{const t0=W(K,3,'胶泥')+.3,lt=t-t0;c.globalCompositeOperation='lighter';for(let i=0;i<50;i++){const d=(lt*.7+hash(i))%1;const x=620+hash(i+2)*360+Math.sin(lt*3+i)*8,y=640-d*340;const a=(1-d)*Math.min(1,lt*2)*Math.min(1,(2.3-lt)*2);c.fillStyle=`rgba(255,${140+hash(i)*80|0},60,${a*.7})`;c.beginPath();c.arc(x,y,1.2+hash(i+5)*2.4,0,7);c.fill()}});
  /* ---- R4 梦溪笔谈 ---- */
  const D0=S(K,5)-.35,D1=S(K,6)-.1;
  const q='庆历中有布衣毕昇又为活板其法用胶泥刻字薄如钱唇每字为一印火烧令坚';
  let qc='';for(let c=0;c<4;c++){for(let r=0;r<9;r++){const k=c*9+r;if(k>=q.length)break;const hl=(k===5||k===6||k===10||k===11);qc+=`<text x="${900-c*84}" y="${282+r*50}" font-size="38" text-anchor="middle" fill="#1d1a16" font-weight="${hl?700:400}">${q[k]}</text>`;if(hl)qc+=`<circle k="hl${k}" cx="${900-c*84+30}" cy="${270+r*50}" r="4" fill="#b5301f"/>`}}
  const m4=`<g k="bookG"><ellipse cx="960" cy="736" rx="420" ry="26" fill="url(#gShadow)"/><rect x="576" y="206" width="768" height="512" fill="#e2d2ae"/><rect x="586" y="212" width="370" height="500" fill="#f6efdc"/><rect x="964" y="212" width="370" height="500" fill="#f6efdc"/>
   <rect x="610" y="236" width="322" height="452" fill="none" stroke="#b5301f" stroke-width="1.2" opacity=".5"/>${[1,2,3].map(i=>`<line x1="${942-i*84}" y1="236" x2="${942-i*84}" y2="688" stroke="#b5301f" stroke-width="1" opacity=".35"/>`).join('')}${qc}
   <g k="inner">${vtext('梦溪笔谈',1200,250,52,60,'class="msz" fill="#1d1a16"')}${vtext('卷十八 · 技艺',1110,280,26,32,'fill="#6b5434"')}${vtext('北宋 · 沈括 著',1050,300,24,30,'fill="#8a6d45"')}</g>
   <g k="cover"><rect x="0" y="-256" width="378" height="512" fill="url(#gIndigo)"/><rect x="0" y="-256" width="378" height="512" fill="none" stroke="#18213a" stroke-width="3"/>${[...Array(4)].map((_,i)=>`<circle cx="22" cy="${-200+i*133}" r="4" fill="#d9d0b8"/><line x1="0" y1="${-200+i*133}" x2="22" y2="${-200+i*133}" stroke="#d9d0b8" stroke-width="2"/>`).join('')}<rect x="270" y="-220" width="70" height="280" fill="#efe6d2" stroke="#c9b48a"/>${vtext('梦溪笔谈',305,-206,52,62,'class="msz" fill="#1d1a16"')}</g></g>
   <text k="lab" x="960" y="790" text-anchor="middle" font-size="30" fill="#4a3a28" letter-spacing="6">北宋 · 沈括《梦溪笔谈》记录了活字印刷</text>`;
  const opn=D0+.8,hl=W(K,5,'沈括');
  scene('r4',D0,D1,m4,(t,R)=>{const p=E.io(P(t,opn,opn+1.1));const sx=Math.cos(Math.PI*p);
    // cover: before flip covers left page (x 582..960), hinge at x=960 on its right edge.
    tr(R.cover,960-378*sx,460,sx,0,1);op(R.cover,p<.5?1:0);op(R.inner,P(t,opn+.5,opn+.9));
    [5,6,10,11].forEach(k=>op(R['hl'+k],P(t,hl,hl+.4)));op(R.lab,P(t,D0+1.2,D0+1.9));tr(R.bookG,0,(1-E.out(P(t,D0,D0+.8)))*20)},{zoom:.03});
  /* ---- R5 wood & metal type, spread ---- */
  const E0=S(K,6)-.35,E1=SEC[K].end+.3;
  const mats=[['gClay','#5a2e18','#f3dcc0','文字印书','泥活字','北宋 · 毕昇'],['gWood','#6b4524','#3a2414','木活字版','木活字','元 · 王祯'],['gGold','#6b4a14','#3a2a0a','铜活字印','金属活字','明 · 铜活字']];
  let cl='';mats.forEach(([g,st,tc,ch,n,sub],i)=>{let tl='';for(let k=0;k<4;k++){const x=((k%2)-.5)*108,y=(Math.floor(k/2)-.5)*108;tl+=`<rect x="${x-50}" y="${y-50}" width="100" height="100" rx="7" fill="url(#${g})" stroke="${st}" stroke-width="2.5"/>${i===2?`<rect x="${x-46}" y="${y-46}" width="40" height="92" rx="5" fill="#fff" opacity=".18"/>`:''}${i===1?`<path d="M${x-44},${y-20} q44,-10 88,0 M${x-44},${y+16} q44,10 88,0" stroke="#8a5d33" stroke-width="1.2" fill="none" opacity=".6"/>`:''}<text transform="translate(${x} ${y+22}) scale(-1 1)" text-anchor="middle" font-size="62" font-weight="700" fill="${tc}">${ch[k]}</text>`}
    cl+=`<g k="cl${i}">${tl}<text y="176" text-anchor="middle" font-size="36" font-weight="700" fill="#2a2018" letter-spacing="4">${n}</text><text y="214" text-anchor="middle" font-size="24" fill="#8a6d45" letter-spacing="3">${sub}</text></g>`});
  const book=`<g><rect x="-20" y="-28" width="40" height="56" rx="2" fill="url(#gIndigo)" stroke="#18213a" stroke-width="1.5"/><rect x="4" y="-22" width="10" height="32" fill="#efe6d2"/><line x1="-14" y1="-28" x2="-14" y2="28" stroke="#d9d0b8" stroke-width="1.5"/></g>`;
  let bks='';for(let i=0;i<36;i++)bks+=`<g k="bk${i}">${book}</g>`;
  const m5=`<g k="cls">${cl}<g k="a1" transform="translate(740 420)"><path d="M-16,-20 L8,0 L-16,20" fill="none" stroke="#c9a24f" stroke-width="5" stroke-linecap="round"/></g><g k="a2" transform="translate(1180 420)"><path d="M-16,-20 L8,0 L-16,20" fill="none" stroke="#c9a24f" stroke-width="5" stroke-linecap="round"/></g></g><circle k="glow" cx="960" cy="440" r="320" fill="url(#gGlow)"/>${bks}<g k="kn"><text x="960" y="470" text-anchor="middle" class="msz" font-size="110" fill="#1d1a16">知识广传</text></g>`;
  const ct=[S(K,6)-.1,W(K,6,'木活字')-.2,W(K,6,'金属')-.2],kn=W(K,6,'知识');const CX=[520,960,1400];
  scene('r5',E0,E1,m5,(t,R)=>{for(let i=0;i<3;i++){const p=E.out(P(t,ct[i],ct[i]+.7));op(R['cl'+i],p);tr(R['cl'+i],CX[i],420+(1-p)*30,1)}
    op(R.a1,P(t,ct[1]-.2,ct[1]+.3));op(R.a2,P(t,ct[2]-.2,ct[2]+.3));
    const d=P(t,kn-.2,kn+.6);op(R.cls,1-.75*d);op(R.glow,.8*Math.sin(Math.PI*P(t,kn-.2,kn+2.5)));op(R.kn,P(t,kn+.2,kn+1)*(1-P(t,E1-1,E1-.5)));tr(R.kn,0,0,1);
    for(let i=0;i<36;i++){const st=kn+hash(i)*1.6;const p=P(t,st,st+2.6);const a=hash(i+50)*Math.PI*2;const rr=60+E.out(p)*(560+hash(i+9)*420);const x=960+Math.cos(a+p*.8)*rr*1.3,y=440+Math.sin(a+p*.8)*rr*.75;op(R['bk'+i],p>0?Math.sin(Math.PI*Math.min(1,p*1.3))*.95:0);tr(R['bk'+i],x,y,.7+p*.5,(a*57+p*120)%360)}
  },{zoom:.03});
  fact(ct[1]+.3,kn+.2,1440,96,430,'知识点','王祯 · 转轮排字架','元代王祯造木活字三万多个，并发明转轮排字架，“以字就人”，排字更省力。');
  chapterCard('compass','sCompass');
});

/* ================= COMPASS ================= */
const DIR24='子癸丑艮寅甲卯乙辰巽巳丙午丁未坤申庚酉辛戌乾亥壬';
function dirRing(r,size,fill){let o='';for(let i=0;i<24;i++){const a=i/24*Math.PI*2-Math.PI/2;o+=`<text x="${(Math.cos(a)*r).toFixed(1)}" y="${(Math.sin(a)*r+size*.35).toFixed(1)}" text-anchor="middle" font-size="${size}" fill="${fill}" font-weight="700" transform="rotate(${i*15} ${(Math.cos(a)*r).toFixed(1)} ${(Math.sin(a)*r).toFixed(1)})">${DIR24[i]}</text>`}return o}
BUILDERS.push(()=>{
  const K='compass';
  /* ---- C1 lodestone + sinan ---- */
  const A0=S(K,0)-.35,A1=S(K,2)-.1,S1=S(K,1);
  const rp='M-130,-60 L-90,-104 L-20,-112 L50,-98 L118,-70 L138,-10 L120,56 L70,96 L-10,104 L-84,88 L-128,40Z';
  let spk='';const r=rng(77);for(let i=0;i<40;i++)spk+=`<circle cx="${(-110+r()*220).toFixed(0)}" cy="${(-90+r()*180).toFixed(0)}" r="${(1+r()*3).toFixed(1)}" fill="#c8ccd0" opacity="${(.2+r()*.5).toFixed(2)}"/>`;
  const rock=`<path d="${rp}" fill="#3a3734" stroke="#1d1b19" stroke-width="3"/><path d="M-90,-104 L-20,-112 L50,-98 L20,-40 L-60,-50Z" fill="#5a5651" opacity=".7"/><path d="M50,-98 L118,-70 L138,-10 L70,0 L20,-40Z" fill="#4a4743" opacity=".8"/>${spk}`;
  let fl='';for(let i=1;i<=5;i++){const w=110+i*85,h=30+i*38;fl+=`<path k="fl${i}a" d="M960,360 C${960-w},${360-h} ${960-w},${560+h} 960,560" fill="none" stroke="#8a6d45" stroke-width="1.6" opacity=".6" pathLength="1" stroke-dasharray="1 1"/><path k="fl${i}b" d="M960,360 C${960+w},${360-h} ${960+w},${560+h} 960,560" fill="none" stroke="#8a6d45" stroke-width="1.6" opacity=".6" pathLength="1" stroke-dasharray="1 1"/>`}
  const nail=`<g><rect x="-26" y="-3" width="46" height="6" rx="2" fill="#6d7276"/><rect x="18" y="-8" width="6" height="16" rx="2" fill="#4d5256"/></g>`;
  const nails=[[600,460,0],[1320,440,180],[700,290,30],[1230,640,210]];
  const plate=`<rect x="-245" y="-245" width="490" height="490" rx="10" fill="url(#gBronzeR)" stroke="#3b3a24" stroke-width="3" filter="url(#fShadow)"/><rect x="-228" y="-228" width="456" height="456" fill="none" stroke="#d8c58a" stroke-width="1.5" opacity=".6"/>
   <circle r="226" fill="none" stroke="#d8c58a" stroke-width="2" opacity=".7"/><circle r="186" fill="none" stroke="#d8c58a" stroke-width="2" opacity=".7"/>${dirRing(206,24,'#efe2b4')}
   <circle r="176" fill="#c9b98a"/><circle r="176" fill="url(#gGlow)" opacity=".35"/><circle r="150" fill="none" stroke="#8a7a4a" stroke-width="1" stroke-dasharray="2 6"/>
   ${[[-1,-1],[1,-1],[1,1],[-1,1]].map(([a,b])=>`<path d="M${a*228},${b*190} q${-a*0},${-b*30} ${-a*30},${-b*36} q${-a*10},${b*12} ${-a*4},${b*20}" stroke="#d8c58a" stroke-width="2" fill="none" opacity=".6"/>`).join('')}`;
  const spoon=`<g k="spoon"><ellipse cx="2" cy="6" rx="40" ry="52" fill="#000" opacity=".25"/><path d="M-6,30 L-4,150 Q0,158 4,150 L6,30Z" fill="#2a2826"/><ellipse rx="40" ry="50" fill="#33302c" stroke="#16140f" stroke-width="2"/><ellipse cx="-12" cy="-16" rx="12" ry="18" fill="#fff" opacity=".18"/></g>`;
  const m=`<g k="fls">${fl}</g><g k="rockG">${rock}<text y="150" text-anchor="middle" font-size="30" font-weight="700" fill="#2a2018" letter-spacing="6">天然磁石</text></g>
   <g k="poles"><g transform="translate(960 300)"><circle r="24" fill="#2a2420"/><text y="9" text-anchor="middle" font-size="26" fill="#f3ead6" font-weight="700">北</text></g><g transform="translate(960 625)"><circle r="24" fill="#b5301f"/><text y="9" text-anchor="middle" font-size="26" fill="#f3ead6" font-weight="700">南</text></g></g>
   ${nails.map((n,i)=>`<g k="n${i}">${nail}</g>`).join('')}
   <g k="plateG" transform="translate(1040 470)">${plate}${spoon}</g>
   <g k="sLab"><g transform="translate(1040 760)"><circle r="22" fill="#b5301f"/><text y="9" text-anchor="middle" font-size="25" fill="#f3ead6" font-weight="700">南</text></g><text x="1040" y="182" text-anchor="middle" font-size="24" fill="#6b5434" letter-spacing="4">北</text><text x="1040" y="828" text-anchor="middle" font-size="26" fill="#4a3a28" letter-spacing="6" font-weight="700">司南 · 复原示意</text></g>
   <g k="arrow"><path d="M420,380 C520,300 640,300 720,360" fill="none" stroke="#b58a3a" stroke-width="2.5" stroke-dasharray="6 8"/><path d="M708,346 L724,364 L700,370" fill="none" stroke="#b58a3a" stroke-width="2.5"/><text x="570" y="300" text-anchor="middle" font-size="24" fill="#8a6d45" letter-spacing="3">琢磨成勺</text></g>`;
  const wm=W(K,0,'磁石'),ws=W(K,1,'司南');
  scene('c1',A0,A1,m,(t,R)=>{
    const mv=E.io(P(t,S1-.3,S1+.8));
    op(R.rockG,P(t,A0+.2,A0+1));tr(R.rockG,lerp(960,300,mv),lerp(460,480,mv),lerp(1,.55,mv));
    for(let i=1;i<=5;i++){drawP(R['fl'+i+'a'],P(t,wm-.6+i*.12,wm+.4+i*.12));drawP(R['fl'+i+'b'],P(t,wm-.6+i*.12,wm+.4+i*.12))}
    op(R.fls,1-mv);op(R.poles,P(t,W(K,0,'南北')-.4,W(K,0,'南北')+.2)*(1-mv));
    nails.forEach(([x,y,a],i)=>{const p=E.in(P(t,wm+.2+i*.15,wm+.8+i*.15));const tx=960+(x>960?120:-120)*(i<2?1:.6),ty=460+(y-460)*.35;op(R['n'+i],P(t,A0+.6,A0+1.2)*(1-mv));tr(R['n'+i],lerp(x,tx,p),lerp(y,ty,p),1,a)});
    const pp=E.out(P(t,S1-.1,S1+.8));op(R.plateG,pp);tr(R.plateG,1040,470+(1-pp)*30);op(R.arrow,P(t,S1+.6,S1+1.2));
    const tau=t-(S1+.2);let th=1080;if(tau>0){th=1080*(1-E.out(clamp(tau/3.2)));if(tau>3.2)th+=22*Math.exp(-1.6*(tau-3.2))*Math.sin(5*(tau-3.2))}
    tr(R.spoon,0,0,1,th);op(R.sLab,P(t,ws-.4,ws+.4));
  },{zoom:.025});
  fact(wm+.2,S1-.2,1420,140,440,'知识点','“慈石召铁”','《吕氏春秋》有“慈石召铁”之说：古人觉得磁石吸铁，就像<em>慈母</em>召唤孩子。');
  fact(ws-.6,A1+.1,1400,300,440,'史料','东汉 · 王充《论衡》','“司南之杓，投之于地，其柢指南。”<br>勺柄（<em>柢</em>）所指的方向，就是南方。');

  /* ---- C2 magnetization, fish, needle ---- */
  const B0=S(K,2)-.35,B1=S(K,3)-.1;const rub0=W(K,2,'人工')-.4,rub1=W(K,2,'方法')+.2,wf=W(K,2,'指南鱼'),wn=W(K,2,'指南针');
  const needle=`<g k="needle"><path d="M-120,0 L110,-3 L124,0 L110,3Z" fill="#7d8489" stroke="#3d4246" stroke-width="1"/><circle cx="-112" cy="0" r="3" fill="none" stroke="#3d4246" stroke-width="1.5"/><path k="nGlow" d="M-120,0 L124,0" stroke="#7fb8e8" stroke-width="6" opacity="0" stroke-linecap="round"/></g>`;
  const fish=`<g k="fish"><path d="M0,78 C20,50 24,0 18,-40 L30,-74 L0,-58 L-30,-74 L-18,-40 C-24,0 -20,50 0,78Z" fill="#6d7276" stroke="#33373a" stroke-width="2"/><path d="M-12,20 Q0,30 12,20 M-12,0 Q0,10 12,0 M-12,-20 Q0,-10 12,-20" stroke="#9aa0a4" stroke-width="1.5" fill="none"/><circle cx="-7" cy="52" r="3.5" fill="#1a1a1a"/><circle cx="7" cy="52" r="3.5" fill="#1a1a1a"/></g>`;
  let rips='';for(let i=0;i<3;i++)rips+=`<circle k="rp${i}" r="40" fill="none" stroke="#f3faf6" stroke-width="2"/>`;
  const m2=`<g k="left"><g k="rk2" transform="translate(450 520) scale(.5)">${rock}</g><g k="sparks">${[...Array(6)].map((_,i)=>`<path k="sp${i}" d="M0,-10 L3,-3 L10,0 L3,3 L0,10 L-3,3 L-10,0 L-3,-3Z" fill="#f3d58c"/>`).join('')}</g>
     <g k="ring"><circle r="160" fill="#efe6d2" stroke="#8a6d45" stroke-width="3"/><circle r="146" fill="none" stroke="#b58a3a" stroke-width="1"/>${dirRing(128,18,'#8a6d45')}<g transform="translate(0 -182)"><circle r="18" fill="#2a2420"/><text y="7" text-anchor="middle" font-size="19" fill="#f3ead6" font-weight="700">北</text></g><g transform="translate(0 182)"><circle r="18" fill="#b5301f"/><text y="7" text-anchor="middle" font-size="19" fill="#f3ead6" font-weight="700">南</text></g></g>
     ${needle}<text k="lt1" x="450" y="790" text-anchor="middle" font-size="30" font-weight="700" fill="#2a2018" letter-spacing="4">磁石磨针 · 人工磁化</text><text k="lt2" x="450" y="790" text-anchor="middle" font-size="30" font-weight="700" fill="#2a2018" letter-spacing="4">指南针</text></g>
   <g k="bowl" transform="translate(1290 470)"><circle r="252" fill="url(#gCeladon)" filter="url(#fShadow)"/><circle r="224" fill="url(#gWater)"/>${rips}<g k="fishG">${fish}</g></g>
   <g k="lb"><text x="1290" y="790" text-anchor="middle" font-size="30" font-weight="700" fill="#2a2018" letter-spacing="4">指南鱼 · 鱼头指南</text></g>`;
  scene('c2',B0,B1,m2,(t,R)=>{
    op(R.left,P(t,B0+.2,B0+.9));op(R.bowl,P(t,B0+.5,B0+1.3));op(R.lb,P(t,wf-.4,wf+.3));
    const rub=P(t,rub0,rub1);const rubbing=rub>0&&rub<1;
    op(R.rk2,1-P(t,rub1,rub1+.5));
    let nx=450,ny=440,nr=0;if(rubbing){nx=450+Math.sin(rub*Math.PI*8)*70}
    const settle=t-wn;let ringOp=P(t,wn-.5,wn);op(R.ring,ringOp);
    if(t>rub1){const mvp=E.io(P(t,rub1,rub1+.6));ny=lerp(440,470,mvp);
      nr=ringOp>0?(settle<0?Math.sin(t*1.4)*30:90*(1-Math.exp(-2.2*settle)*Math.cos(4.5*settle))+0):Math.sin(t*1.4)*10}
    // needle points: south end = +x end (124) -> rotate 90 so +x -> down
    tr(R.needle,nx,ny,1,t>wn-.5?nr:0);tr(R.ring,450,470);
    op(R.nGlow,P(t,rub1-.4,rub1+.2)*.55);
    for(let i=0;i<6;i++){const d=(t*2.2+hash(i))%1;op(R['sp'+i],rubbing?Math.sin(Math.PI*d):0);tr(R['sp'+i],450+(hash(i+3)-.5)*160,470-20-d*60,.6+d)}
    op(R.lt1,P(t,rub0,rub0+.5)*(1-P(t,wn-.5,wn)));op(R.lt2,P(t,wn-.3,wn+.3));
    const fs=t-wf;let fa=fs<0?Math.sin(t*.9)*80+40:120*Math.exp(-1.8*fs)*Math.cos(3.8*fs);const fx=Math.sin(t*.5)*14,fy=Math.cos(t*.4)*10;tr(R.fishG,fx,fy,1,fa);
    for(let i=0;i<3;i++){const d=((t*.42)+i/3)%1;at(R['rp'+i],'r',(30+d*190).toFixed(1));at(R['rp'+i],'cx',fx.toFixed(1));at(R['rp'+i],'cy',fy.toFixed(1));op(R['rp'+i],(1-d)*.7)}
  },{zoom:.025});
  fact(wf-.2,B1+.1,1560,110,340,'史料','沈括 · 四种装置法','磁针可用<em>水浮、指爪、碗唇、缕悬</em>四法安置，“不若缕悬为最善”。');

  /* ---- C3 declination ---- */
  const C0=S(K,3)-.35,C1=S(K,4)-.1;const cx=740,cy=480,RR=290;const dl=12;
  const a0=Math.PI/2,a1=Math.PI/2-dl*Math.PI/180,ar=230;
  const wedge=`M${cx},${cy} L${cx+Math.cos(a0)*ar},${cy+Math.sin(a0)*ar} A${ar},${ar} 0 0,0 ${(cx+Math.cos(a1)*ar).toFixed(1)},${(cy+Math.sin(a1)*ar).toFixed(1)}Z`;
  const m3=`<g k="rose" transform="translate(${cx} ${cy})"><circle r="${RR}" fill="#f4ecda" stroke="#3a2d20" stroke-width="4" filter="url(#fShadow)"/><circle r="${RR-14}" fill="none" stroke="#b58a3a" stroke-width="1.5"/>${dirRing(RR-36,22,'#5b4630')}<circle r="${RR-62}" fill="none" stroke="#b58a3a" stroke-width="1"/>
     ${[...Array(72)].map((_,i)=>{const a=i/72*Math.PI*2;const l=i%3?6:12;return`<line x1="${Math.cos(a)*(RR-62)}" y1="${Math.sin(a)*(RR-62)}" x2="${Math.cos(a)*(RR-62-l)}" y2="${Math.sin(a)*(RR-62-l)}" stroke="#8a6d45" stroke-width="1"/>`}).join('')}
     <g transform="translate(0 ${-RR-34})"><circle r="22" fill="#2a2420"/><text y="8" text-anchor="middle" font-size="22" fill="#f3ead6" font-weight="700">北</text></g><text x="${RR+34}" y="8" text-anchor="middle" font-size="24" fill="#5b4630" font-weight="700">东</text><text x="${-RR-34}" y="8" text-anchor="middle" font-size="24" fill="#5b4630" font-weight="700">西</text></g>
   <line k="axis" x1="${cx}" y1="${cy-RR+20}" x2="${cx}" y2="${cy+RR-20}" stroke="#c9a24f" stroke-width="3" stroke-dasharray="10 8"/>
   <path k="wedge" d="${wedge}" fill="#b5301f" opacity=".22"/><path k="arc" d="M${cx+Math.cos(a0)*ar},${cy+Math.sin(a0)*ar} A${ar},${ar} 0 0,0 ${(cx+Math.cos(a1)*ar).toFixed(1)},${(cy+Math.sin(a1)*ar).toFixed(1)}" fill="none" stroke="#b5301f" stroke-width="3"/>
   <g k="ndl" transform="translate(${cx} ${cy})"><path d="M0,-250 L14,0 L-14,0Z" fill="#2a2420"/><path d="M0,250 L14,0 L-14,0Z" fill="#b5301f"/><circle r="10" fill="#c9a24f" stroke="#5b4630" stroke-width="2"/></g>
   <g k="lbZ"><text x="${cx-14}" y="${cy+RR+6}" text-anchor="end" font-size="24" fill="#a07a2a" font-weight="700">正南</text></g>
   <g k="lbD"><text x="${cx+70}" y="${cy+200}" class="msz" font-size="46" fill="#b5301f">磁偏角</text><text x="${cx+74}" y="${cy+236}" font-size="22" fill="#8a5a2a">磁针微偏东</text></g>
   <text k="note" x="${cx-RR}" y="${cy+RR+40}" font-size="20" fill="#8a7458">示意图：偏角已夸大</text>
   <g k="panel"><rect x="1150" y="250" width="680" height="440" fill="#fbf6ea" opacity=".9" stroke="#b58a3a" stroke-width="1.5"/><rect x="1162" y="262" width="656" height="416" fill="none" stroke="#b58a3a" stroke-width=".8" opacity=".6"/><rect x="1150" y="276" width="6" height="388" fill="#b5301f"/>
     <text x="1200" y="330" font-size="32" font-weight="700" fill="#2a2018" letter-spacing="3">沈括《梦溪笔谈》</text>
     <text x="1200" y="410" font-size="38" fill="#2a2018" letter-spacing="2">“方家以磁石磨针锋，</text><text x="1200" y="470" font-size="38" fill="#2a2018" letter-spacing="2">则能指南，然<tspan fill="#b5301f" font-weight="700">常微偏东，</tspan></text><text x="1200" y="530" font-size="38" fill="#b5301f" font-weight="700" letter-spacing="2">不全南也。<tspan fill="#2a2018" font-weight="400">”</tspan></text>
     <rect x="1200" y="566" width="580" height="1.5" fill="url(#gGoldH)"/><text x="1200" y="614" font-size="25" fill="#5b4630">世界上最早关于磁偏角的明确记载之一，</text><text x="1200" y="652" font-size="25" fill="#5b4630">比欧洲早约四百年。</text></g>`;
  const wz=W(K,3,'正南'),wd=W(K,3,'磁偏角'),wp=W(K,3,'磁针');
  scene('c3',C0,C1,m3,(t,R)=>{const p=E.out(P(t,C0+.1,C0+.9));op(R.rose,p);tr(R.rose,cx,cy+(1-p)*20);
    op(R.axis,P(t,wz-.5,wz+.1));op(R.lbZ,P(t,wz-.3,wz+.3));
    const s=t-wp;let ang=s<0?40*Math.sin(t*1.2):-dl*(1-Math.exp(-1.8*s)*Math.cos(3.6*s));tr(R.ndl,cx,cy,1,ang);op(R.ndl,P(t,C0+.4,C0+1));
    op(R.wedge,.22*P(t,wd-.4,wd+.3));op(R.arc,P(t,wd-.4,wd+.3));op(R.lbD,P(t,wd-.3,wd+.4));op(R.note,P(t,wd,wd+.6));
    op(R.panel,P(t,C0+1.2,C0+2));tr(R.panel,(1-E.out(P(t,C0+1.2,C0+2)))*40,0)},{zoom:.02});

  /* ---- C4 sea voyage + maritime route ---- */
  const D0=S(K,4)-.35,D1=SEC[K].end+.3;const mapT=CH(K,5,1)-.7;
  const sail=(x,H,w)=>{const top=-60-H;let o=`<path d="M${x-8},-62 L${x-14},${top+20} Q${x+w*.4},${top-10} ${x+w},${top+30} L${x+w*.82},-66Z" fill="#c4a064" stroke="#5a3a1e" stroke-width="2.5"/>`;for(let i=1;i<7;i++){const f=i/7;const y1=lerp(-62,top+20,f),y2=lerp(-66,top+30,f);o+=`<line x1="${x-10-4*f}" y1="${y1}" x2="${x+w*.82+(w*.18)*f}" y2="${y2}" stroke="#5a3a1e" stroke-width="2"/>`}o+=`<line x1="${x}" y1="-40" x2="${x}" y2="${top-10}" stroke="#3a2614" stroke-width="7"/>`;return o};
  const ship=`<g k="ship"><path d="M-280,-92 L-212,-50 L170,-50 L262,-96 L246,-36 Q200,40 0,44 Q-210,42 -262,0Z" fill="#3b2a1d" stroke="#1d140c" stroke-width="2.5"/><path d="M-262,-6 Q-200,30 0,34 Q200,30 248,-30" stroke="#c9a24f" stroke-width="3" fill="none"/><rect x="-262" y="-118" width="110" height="70" fill="#4d3626" stroke="#1d140c" stroke-width="2"/><rect x="-250" y="-104" width="18" height="18" fill="#c9a24f" opacity=".7"/><rect x="-222" y="-104" width="18" height="18" fill="#c9a24f" opacity=".7"/><rect x="-194" y="-104" width="18" height="18" fill="#c9a24f" opacity=".7"/>
    ${sail(-60,270,170)}${sail(110,200,130)}${sail(-200,150,90)}<path k="flag" d="M-60,-345 L-14,-338 L-60,-326Z" fill="#b5301f"/><circle k="cmpGlow" cx="-120" cy="-62" r="26" fill="url(#gGlow)"/><circle cx="-120" cy="-60" r="9" fill="#c9a24f" stroke="#5b4630" stroke-width="2"/><circle cx="182" cy="-40" r="8" fill="#f3ead6"/><circle cx="182" cy="-40" r="4" fill="#1d140c"/></g>`;
  const inset=`<g k="inset" transform="translate(1600 330)"><circle r="128" fill="#efe6d2" stroke="#3a2d20" stroke-width="5" filter="url(#fShadow)"/><circle r="108" fill="url(#gWater)"/><circle r="108" fill="none" stroke="url(#gCeladon)" stroke-width="10"/><g k="inN"><path d="M0,-80 L5,0 L-5,0Z" fill="#2a2420"/><path d="M0,80 L5,0 L-5,0Z" fill="#b5301f"/><rect x="-24" y="-4" width="48" height="8" rx="3" fill="#c9a865" opacity=".8"/></g><text y="170" text-anchor="middle" font-size="26" font-weight="700" fill="#2a2018" letter-spacing="3" paint-order="stroke" stroke="#efe6d2" stroke-width="6">浮针水罗盘</text></g>`;
  let waves='';const WC=['#9fb1aa','#7f958f','#5f7671','#3f5753'];for(let i=0;i<4;i++)waves+=`<path k="wv${i}" fill="${WC[i]}" opacity="${[.7,.82,.9,.96][i]}"/>`;
  // map
  const mainR=[[118.6,24.9],[117,21.5],[113,15],[109,8],[104.5,2],[100.5,3.5],[97,6.5],[92,6.5],[86,5.5],[80.5,5.0],[77.5,6.4],[75.6,8.6],[74.9,10.3],[75.6,11.3],[70,16],[63,21],[58.5,24.5],[56.3,26.4]].map(p=>projOld(...p));
  const brR=[[75.6,11.3],[70,13],[62,13],[54,12.5],[51.5,9],[48.5,3],[44,-1],[40.2,-3.2]].map(p=>projOld(...p));
  const mc=[['qz','泉州',118.6,24.9,'宋元东方大港','start',18,8],['gz','广州',113.3,23.1,'','end',-16,8],['ml','马六甲海峡',101.5,3,'','end',-14,40],['gl','古里',75.8,11.3,'今印度卡利卡特','start',16,-12],['bs','波斯湾',56.3,26.4,'','end',-16,-6],['df','东非',40.2,-3.2,'','end',-16,8]];
  const mcm=mc.map(([k,l,lo,la,sub,an,dx,dy])=>{const[x,y]=projOld(lo,la);return cityDot(k,x,y,l,sub,an,dx,dy)}).join('');
  const[lx,ly]=projOld(82,-3);
  const m4=`<g k="sea"><rect width="1920" height="1080" fill="url(#gDusk)"/><circle cx="1180" cy="236" r="84" fill="#c8452e" opacity=".5"/><image href="${ASSET.m0}" x="-200" y="330" width="2400" height="420" opacity=".55"/>
     <g k="mist"><ellipse cx="500" cy="520" rx="700" ry="40" fill="#f3ead6" opacity=".55"/><ellipse cx="1500" cy="560" rx="600" ry="30" fill="#f3ead6" opacity=".5"/></g>
     ${waves.replace('<path k="wv3"','<g k="shipG">'+ship+'</g><path k="wv3"').replace(/(<path k="wv2"[^>]*>)/,'$1')}<line k="lead" stroke="#b58a3a" stroke-width="2" stroke-dasharray="5 6"/>${inset}</g>
   <g k="mapG"><g k="mapIn" transform="translate(960 450) scale(1.6) translate(-1098 -568)">${oldMap()}
     <path k="rt" d="${smoothPath(mainR)}" fill="none" stroke="#b5301f" stroke-width="3.5" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>
     <path k="rt2" d="${smoothPath(brR)}" fill="none" stroke="#b5301f" stroke-width="3" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" opacity=".85"/>
     <g transform="translate(0 0)" font-size="0">${mcm.replace(/font-size="27"/g,'font-size="19"').replace(/font-size="21"/g,'font-size="14"').replace(/r="16"/g,'r="11"').replace(/r="6.5"/g,'r="4.5"')}</g>
     <text k="msr" x="${lx}" y="${ly}" text-anchor="middle" class="msz" font-size="40" fill="#5b4630" opacity=".9">海上丝绸之路</text>
     <g k="hd"><circle r="14" fill="url(#gGlow)"/><path d="M-12,2 L12,2 L8,7 L-8,7Z M-1,2 L-1,-12 L8,-2Z" fill="#3b2a1d"/></g></g></g>`;
  const wsr=W(K,5,'海上丝'),wyy=W(K,5,'远洋');
  const waveY=(i,x,t)=>{const b=[600,660,735,820][i],a=[8,12,16,22][i];return b+Math.sin(x*.006*(1+i*.3)+t*(.6+i*.25)+i)*a+Math.sin(x*.017+t*1.3+i*2)*a*.35};
  scene('c4',D0,D1,m4,(t,R)=>{
    const mp=E.io(P(t,mapT,mapT+1.2));op(R.sea,1-mp);op(R.mapG,mp);
    if(mp<1){for(let i=0;i<4;i++){let d='M-20,1100 ';for(let x=-20;x<=1960;x+=40)d+=`L${x},${waveY(i,x,t).toFixed(1)} `;d+='L1960,1100Z';at(R['wv'+i],'d',d)}
      const sx=lerp(620,900,P(t,D0,mapT));const y=waveY(2,sx,t)-6;const sl=(waveY(2,sx+120,t)-waveY(2,sx-120,t))/240;tr(R.shipG,sx,y,.85,Math.atan(sl)*57*.8);
      at(R.flag,'d',`M-60,-345 L${-14+Math.sin(t*5)*4},${-338+Math.sin(t*4)*3} L-60,-326Z`);op(R.cmpGlow,.6+.4*Math.sin(t*3));
      const ip=P(t,W(K,4,'指南针')-.3,W(K,4,'指南针')+.4);op(R.inset,ip);op(R.lead,ip);
      const c=Math.cos(Math.atan(sl)*.8),s=Math.sin(Math.atan(sl)*.8);const gx=sx+(-120*c+62*s)*.85,gy=y+(-120*s-62*c)*.85;at(R.lead,'x1',gx.toFixed(1));at(R.lead,'y1',gy.toFixed(1));at(R.lead,'x2',1600-90);at(R.lead,'y2',330+90);
      tr(R.inN,0,0,1,Math.sin(t*1.7)*4);tr(R.mist,Math.sin(t*.2)*30,0)}
    if(mp>0){const r1=E.io(P(t,wsr-.4,wyy));drawP(R.rt,r1);const r2=E.io(P(t,wyy,SE(K,5)+.3));drawP(R.rt2,r2);
      const h=r2>0?pathAt(R.rt2,r2):pathAt(R.rt,r1);tr(R.hd,h.x,h.y);op(R.hd,r1>0?1:0);
      const th=[0,.08,.3,.62,.99];['qz','gz','ml','gl','bs'].forEach((k,i)=>op(R[k],i<2?mp:P(r1,th[i]-.03,th[i]+.05)));op(R.df,P(r2,.9,1));op(R.msr,P(t,wsr,wsr+.8));
      const z=1+.04*P(t,mapT,D1);at(R.mapIn,'transform',`translate(960 450) scale(${(1.6*z).toFixed(4)}) translate(-1098 -568)`)}
  },{zoom:0});
  fact(W(K,4,'航海')-.2,mapT+.4,70,130,520,'史料','北宋 · 朱彧《萍洲可谈》','“舟师识地理，夜则观星，昼则观日，<em>阴晦观指南针</em>。”——世界上最早的航海罗盘记载之一。');
  chapterCard('gun','sGun');
});

/* ================= GUNPOWDER ================= */
function roofPath(x,w,y,h){const e=w*.12;return `M${x-e},${y} Q${x+w*.1},${y-h*.15} ${x+w*.2},${y-h*.55} L${x+w*.8},${y-h*.55} Q${x+w*.9},${y-h*.15} ${x+w+e},${y} Q${x+w+e*.6},${y-h*.08} ${x+w+e*1.2},${y-h*.22} L${x+w},${y+h*.12} L${x},${y+h*.12} L${x-e*1.2},${y-h*.22} Q${x-e*.6},${y-h*.08} ${x-e},${y}Z`}
BUILDERS.push(()=>{
  const K='gun';
  nightWin(S(K,3)-.4,S(K,4)-.2);nightWin(S(K,5)-.3,S(K,6)-.15);
  /* ---- G1 alchemy ---- */
  const A0=S(K,0)-.35,A1=S(K,2)-.1,S1=S(K,1);const FX0=960,FY0=440;
  const tri=['111','110','101','100','011','010','001','000'];let bag='';tri.forEach((b,i)=>{const a=i/8*Math.PI*2;const x=Math.cos(a)*300,y=Math.sin(a)*300;let ln='';[...b].forEach((c,j)=>{ln+=c==='1'?`<rect x="-34" y="${-18+j*14}" width="68" height="8"/>`:`<rect x="-34" y="${-18+j*14}" width="29" height="8"/><rect x="5" y="${-18+j*14}" width="29" height="8"/>`});bag+=`<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(${(a*57.3+90).toFixed(0)})">${ln}</g>`});
  const furnace=`<g k="furn"><ellipse cx="0" cy="250" rx="230" ry="26" fill="url(#gShadow)"/><g k="fire">${[0,1,2,3,4].map(i=>`<path k="fl${i}" d="M0,0 C-22,-30 -10,-60 0,-96 C10,-60 22,-30 0,0Z" fill="${i%2?'#f6a43a':'#e2552a'}" transform="translate(${(i-2)*34} 214)"/>`).join('')}<ellipse cx="0" cy="214" rx="120" ry="34" fill="url(#gFire)" opacity=".8"/></g>
   <path d="M-110,120 L-140,236 L-112,236 L-80,128Z M110,120 L140,236 L112,236 L80,128Z M-14,130 L-12,240 L12,240 L14,130Z" fill="url(#gBronze)" stroke="#22322c" stroke-width="2"/>
   <path d="M-170,-50 Q-190,110 -100,150 L100,150 Q190,110 170,-50Z" fill="url(#gBronzeR)" stroke="#2c2a1a" stroke-width="3" filter="url(#fShadow)"/><rect x="-184" y="-66" width="368" height="24" rx="6" fill="#5d5a3a" stroke="#2c2a1a" stroke-width="2"/>
   <g fill="#e2d39a" opacity=".55" transform="translate(0 40) scale(.9)">${tri.slice(0,3).map((b,i)=>`<g transform="translate(${(i-1)*90} 0)">${[...b].map((c,j)=>c==='1'?`<rect x="-26" y="${-16+j*13}" width="52" height="7"/>`:`<rect x="-26" y="${-16+j*13}" width="22" height="7"/><rect x="4" y="${-16+j*13}" width="22" height="7"/>`).join('')}</g>`).join('')}</g>
   <path d="M-140,-66 Q0,-200 140,-66Z" fill="#6b6a46" stroke="#2c2a1a" stroke-width="3"/><circle cx="0" cy="-150" r="18" fill="#c9a24f" stroke="#5b4630" stroke-width="2"/><ellipse cx="0" cy="-96" rx="60" ry="10" fill="#1d1a12" opacity=".5"/></g>`;
  let smoke='';for(let i=0;i<5;i++)smoke+=`<path k="sm${i}" d="M0,0 C-30,-40 30,-80 0,-120 C-30,-160 30,-200 0,-240" fill="none" stroke="#8a8478" stroke-width="${10-i}" stroke-linecap="round" opacity=".4"/>`;
  const jar=(c1,c2,lab,k)=>`<g k="${k}"><ellipse cx="0" cy="62" rx="70" ry="12" fill="url(#gShadow)"/><path d="M-40,-50 Q-74,-10 -60,40 Q-50,62 0,62 Q50,62 60,40 Q74,-10 40,-50Z" fill="#8a6a44" stroke="#4a3018" stroke-width="2.5"/><rect x="-44" y="-62" width="88" height="16" rx="5" fill="#6b4a2a" stroke="#4a3018" stroke-width="2"/><ellipse cx="0" cy="-62" rx="40" ry="9" fill="${c1}" stroke="${c2}" stroke-width="1.5"/><rect x="-30" y="-20" width="60" height="44" fill="#efe6d2" stroke="#b58a3a"/><text y="12" text-anchor="middle" font-size="26" font-weight="700" fill="#2a2018">${lab}</text></g>`;
  const JP=[[380,640],[600,760],[1520,660]];const JC=[['#f4f4f0','#b8b8b0','硝石'],['#2a2a2a','#000','木炭'],['#efcf3a','#a88a18','硫磺']];
  const m=`<g k="bag" transform="translate(${FX0} ${FY0})" fill="#3a2d20" opacity=".1"><circle r="360" fill="none" stroke="#3a2d20" stroke-width="3"/><circle r="240" fill="none" stroke="#3a2d20" stroke-width="2"/>${bag}</g>
   <g k="vt">${vtext('炼丹',230,190,110,120,'class="msz" fill="#1d1a16"')}</g>
   <g k="smk" transform="translate(${FX0} ${FY0-150})">${smoke}</g><g transform="translate(${FX0} ${FY0})">${furnace}</g>
   ${JC.map((c,i)=>jar(c[0],c[1],c[2],'j'+i)).join('')}
   <circle k="flash" cx="${FX0}" cy="${FY0-100}" r="200" fill="url(#gFire)"/><rect k="white" width="1920" height="1080" fill="#fff6dc" opacity="0"/>`;
  const wj=[W(K,1,'硝石'),W(K,1,'木炭'),W(K,1,'硫磺')],wb=W(K,1,'爆炸'),wr=W(K,1,'燃烧');
  const sc1=scene('g1',A0,A1,m,(t,R,sc)=>{
    tr(R.bag,FX0,FY0,1,t*4);op(R.vt,P(t,A0+.4,A0+1.2));
    for(let i=0;i<5;i++){const f=1+.18*Math.sin(t*11+i*1.7)+.1*Math.sin(t*23+i);tr(R['fl'+i],(i-2)*34,214,f*.9,Math.sin(t*7+i)*6,f)}
    const big=1+2*P(t,wr,wb)+3*P(t,wb,wb+.3)*(1-P(t,wb+1.5,wb+3));for(let i=0;i<5;i++){const d=(t*.35+i/5)%1;op(R['sm'+i],Math.sin(Math.PI*d)*.35*Math.min(2.2,big));tr(R['sm'+i],(i-2)*14+Math.sin(t+i)*10,-d*120*big*.6,1+d*.8*big*.5)}
    JP.forEach(([x,y],i)=>{const p=E.out(P(t,wj[i]-.3,wj[i]+.4));op(R['j'+i],p);tr(R['j'+i],x,y+(1-p)*30,1,p<1?0:Math.sin(t*3+i)*1.5)});
    const fp=P(t,wb-.05,wb+1.1);op(R.flash,fp>0?Math.sin(Math.PI*Math.min(1,fp*1.4))*.95:0);tr(R.flash,0,0,1);at(R.flash,'r',(120+fp*600).toFixed(0));
    op(R.white,fp>0?.55*(1-P(t,wb,wb+.5)):0);
    const sh=Math.exp(-4*(t-wb))*(t>wb?1:0);sc.sx=Math.sin(t*90)*14*sh;sc.sy=Math.cos(t*77)*10*sh;
  },{zoom:.03});
  addFX(wj[0],wb+.2,(c,t)=>{JP.forEach(([x0,y0],j)=>{if(t<wj[j])return;const col=['rgba(250,250,245,','rgba(30,30,30,','rgba(240,205,60,'][j];const cx=(x0+FX0)/2,cy=Math.min(y0,FY0)-260;for(let i=0;i<34;i++){const p=(t*.55+hash(i+j*40))%1;const q=1-p;const x=q*q*x0+2*q*p*cx+p*p*FX0+Math.sin(i*3+t*4)*6,y=q*q*(y0-60)+2*q*p*cy+p*p*(FY0-110)+Math.cos(i*2+t*3)*6;const a=Math.min(1,(t-wj[j])*2)*Math.sin(Math.PI*p)*(1-P(t,wb,wb+.2));c.fillStyle=col+(a*.9)+')';c.beginPath();c.arc(x,y,2+hash(i+7)*3,0,7);c.fill()}})});
  addFX(wb-.05,wb+2.6,(c,t)=>{const dt=t-wb;if(dt<0)return;c.globalCompositeOperation='lighter';for(let i=0;i<150;i++){const a=hash(i+1)*Math.PI*2,v=300+hash(i+2)*900;const dr=(1-Math.exp(-2.2*dt))/2.2;const x=FX0+Math.cos(a)*v*dr,y=FY0-100+Math.sin(a)*v*dr*.8+120*dt*dt;const al=Math.max(0,1-dt/(1.4+hash(i+3)*1.2));c.fillStyle=`rgba(255,${150+hash(i+4)*100|0},${40+hash(i)*60|0},${al})`;c.beginPath();c.arc(x,y,1.5+hash(i+5)*2.5,0,7);c.fill()}});
  fact(wj[2]+.3,A1+.1,1400,130,440,'知识点','黑火药的三种成分','<em>硝石</em>（硝酸钾）提供氧，<em>硫磺</em>与<em>木炭</em>作燃料，三者混合，燃烧极为迅猛。');

  /* ---- G2 Tang record + night battle ---- */
  const B0=S(K,2)-.35,B1=S(K,4)-.1,S3=S(K,3);
  const q='有以硫黄雄黄合硝石并蜜烧之焰起烧手面及烬屋舍者';
  let qc='';for(let c=0;c<3;c++)for(let r=0;r<8;r++){const k=c*8+r;if(k>=q.length)break;const hl=[13,14,16,17,18,20,21,22].includes(k);qc+=`<text x="${1060-c*80}" y="${300+r*50}" font-size="38" text-anchor="middle" fill="${hl?'#b5301f':'#1d1a16'}" font-weight="${hl?700:400}">${q[k]}</text>`}
  const page=`<g k="pageG"><rect x="680" y="220" width="560" height="470" fill="#ead8ae" filter="url(#fShadow)"/><rect x="700" y="240" width="520" height="430" fill="none" stroke="#8a5a2a" stroke-width="2" opacity=".6"/>${[1,2,3].map(i=>`<line x1="${1100-i*80}" y1="240" x2="${1100-i*80}" y2="670" stroke="#8a5a2a" stroke-width="1" opacity=".35"/>`).join('')}${qc}${vtext('真元妙道要略',800,262,30,36,'font-weight="700" fill="#5b4630"')}
    <text x="960" y="740" text-anchor="middle" font-size="30" font-weight="700" fill="#2a2018" letter-spacing="4">唐 · 道教典籍《真元妙道要略》</text><text x="960" y="782" text-anchor="middle" font-size="23" fill="#6b5434" letter-spacing="3">硫黄、雄黄与硝石合烧，火焰腾起，可烧伤手脸、焚毁房屋</text></g>`;
  let stars='';const rs=rng(12);for(let i=0;i<70;i++)stars+=`<circle cx="${(rs()*1920).toFixed(0)}" cy="${(rs()*500).toFixed(0)}" r="${(.6+rs()*1.6).toFixed(1)}" fill="#fff" opacity="${(.3+rs()*.6).toFixed(2)}"/>`;
  let cren='';for(let x=1160;x<1920;x+=46)cren+=`<rect x="${x}" y="606" width="28" height="26"/>`;
  const night=`<g k="night"><rect width="1920" height="1080" fill="url(#gNight)"/>${stars}<circle cx="1640" cy="170" r="52" fill="#f3ead6" opacity=".9"/><circle cx="1640" cy="170" r="120" fill="url(#gGlow)" opacity=".25"/>
    <path d="M0,760 C200,700 380,720 560,690 C700,670 820,720 960,740 L960,1080 L0,1080Z" fill="#141826"/>
    <g fill="#10131e">${cren}<rect x="1150" y="630" width="770" height="450"/><rect x="1420" y="560" width="200" height="80"/><path d="${roofPath(1400,240,560,90)}"/></g><path d="M1150,632 H1920" stroke="#c9a24f" stroke-width="1.2" opacity=".4"/>
    <g k="lA"><text x="640" y="330" text-anchor="middle" class="msz" font-size="64" fill="#ffcf7a" filter="url(#fGlow)">火箭</text></g><g k="lB"><text x="1020" y="200" text-anchor="middle" class="msz" font-size="64" fill="#ff9a5a" filter="url(#fGlow)">火球</text></g>
    <g k="arrowIll" transform="translate(300 860)"><line x1="-150" y1="0" x2="150" y2="0" stroke="#d9c7a0" stroke-width="3"/><path d="M150,-8 L172,0 L150,8Z" fill="#d9c7a0"/><path d="M-150,0 l-18,-12 M-150,0 l-18,12 M-136,0 l-18,-12 M-136,0 l-18,12" stroke="#d9c7a0" stroke-width="2"/><rect x="60" y="-14" width="70" height="20" rx="4" fill="#b5301f" stroke="#ffcf7a" stroke-width="1.5"/><text x="95" y="-24" text-anchor="middle" font-size="20" fill="#ffcf7a">火药筒</text></g></g>`;
  const m2=page+night;
  const wfa=W(K,3,'火箭'),wfb=W(K,3,'火球');
  scene('g2',B0,B1,m2,(t,R)=>{op(R.pageG,P(t,B0+.2,B0+.9)*(1-P(t,S3-.5,S3)));tr(R.pageG,0,(1-E.out(P(t,B0+.2,B0+.9)))*20);
    op(R.night,P(t,S3-.4,S3+.4));op(R.lA,P(t,wfa-.1,wfa+.4));op(R.lB,P(t,wfb-.1,wfb+.4));op(R.arrowIll,P(t,wfa+.3,wfa+.9))},{zoom:.02});
  const arrows=[];for(let i=0;i<20;i++){const st=W(K,3,'军事')-.4+i*.29+hash(i)*.15;arrows.push({st,x0:150+hash(i+1)*260,y0:780+hash(i+2)*60,x1:1180+hash(i+3)*600,y1:600+hash(i+4)*90,h:240+hash(i+5)*120,d:1.25+hash(i+6)*.3})}
  const balls=[];for(let i=0;i<5;i++){const st=wfb-.3+i*.55;balls.push({st,x0:260+hash(i+20)*200,y0:800,x1:1250+hash(i+21)*500,y1:620,h:460+hash(i+22)*80,d:2.0})}
  const traj=(a,p)=>[lerp(a.x0,a.x1,p),lerp(a.y0,a.y1,p)-a.h*Math.sin(Math.PI*p)];
  addFX(S3-.2,B1+.2,(c,t)=>{c.globalCompositeOperation='lighter';const fade=1-P(t,B1-.6,B1);
    for(const a of arrows){const p=(t-a.st)/a.d;if(p<0)continue;if(p<=1){for(let k=0;k<12;k++){const pp=p-k*.012;if(pp<0)break;const[x,y]=traj(a,pp);c.fillStyle=`rgba(255,${190-k*10},80,${(1-k/12)*.8*fade})`;c.beginPath();c.arc(x,y,3.2-k*.2,0,7);c.fill()}const[x,y]=traj(a,p);const g=c.createRadialGradient(x,y,0,x,y,16);g.addColorStop(0,`rgba(255,240,190,${fade})`);g.addColorStop(1,'rgba(255,120,30,0)');c.fillStyle=g;c.beginPath();c.arc(x,y,16,0,7);c.fill()}
      else{const dt=(p-1)*a.d;if(dt<.8){for(let k=0;k<10;k++){const an=hash(k+a.st)*Math.PI*2;const v=60+hash(k)*120;c.fillStyle=`rgba(255,${140+hash(k+1)*90|0},50,${(1-dt/.8)*fade})`;c.beginPath();c.arc(a.x1+Math.cos(an)*v*dt,a.y1+Math.sin(an)*v*dt*.6-20*dt,2,0,7);c.fill()}}}}
    for(const a of balls){const p=(t-a.st)/a.d;if(p<0||p>1.3)continue;const pc=Math.min(p,1);for(let k=0;k<20;k++){const pp=pc-k*.01;if(pp<0)break;const[x,y]=traj(a,pp);c.fillStyle=`rgba(${k>8?140:255},${k>8?120:150},${k>8?110:60},${(1-k/20)*.5*fade})`;c.beginPath();c.arc(x,y,9-k*.3,0,7);c.fill()}const[x,y]=traj(a,pc);const R0=p>1?22+(p-1)*300:22;const g=c.createRadialGradient(x,y,0,x,y,R0*2);g.addColorStop(0,`rgba(255,250,220,${fade*(p>1?1-(p-1)/.3:1)})`);g.addColorStop(.4,`rgba(255,140,40,${.8*fade*(p>1?1-(p-1)/.3:1)})`);g.addColorStop(1,'rgba(200,40,10,0)');c.fillStyle=g;c.beginPath();c.arc(x,y,R0*2,0,7);c.fill()}});
  fact(S(K,2)+.3,S3-.4,1380,250,440,'史料','唐代的火药记载','这是目前所知关于火药的较早记载之一，说明唐代炼丹家已注意到火药易燃易爆的危险。');
  fact(wfa+.2,B1+.05,70,130,470,'知识点','早期的“火箭”','在箭杆上绑缚火药包或火药筒，点燃后射出，用来纵火攻城。',true);

  /* ---- G3 武经总要 ---- */
  const C0=S(K,4)-.35,C1=S(K,5)-.1;
  const cols=['火炮火药法','晋州硫黄十四两','窝黄七两','焰硝二斤半','麻茹一两','乾漆一两','砒黄一两'];
  let tx='';cols.forEach((s,c)=>{[...s].forEach((ch,r)=>{const hl=(c===1&&(r===2||r===3))||(c===3&&(r===0||r===1));tx+=`<text x="${1290-c*50}" y="${282+r*54}" font-size="${c===0?40:36}" text-anchor="middle" fill="${hl?'#b5301f':'#1d1a16'}" font-weight="${hl||c===0?700:400}">${ch}</text>`})});
  let spikes='';for(let i=0;i<16;i++){const a=i/16*Math.PI*2;spikes+=`<path d="M${Math.cos(a)*60},${Math.sin(a)*60} L${Math.cos(a+.08)*82},${Math.sin(a+.08)*82} L${Math.cos(a+.18)*60},${Math.sin(a+.18)*60}" fill="#2a2420"/>`}
  const m3=`<g k="bk"><ellipse cx="960" cy="736" rx="420" ry="26" fill="url(#gShadow)"/><rect x="576" y="206" width="768" height="512" fill="#d9c69c"/><rect x="586" y="212" width="370" height="500" fill="#f2e8d0"/><rect x="964" y="212" width="370" height="500" fill="#f2e8d0"/><line x1="960" y1="212" x2="960" y2="712" stroke="#a88a5a" stroke-width="3"/>
    <g transform="translate(770 360)"><circle r="62" fill="#e2d2ae" stroke="#2a2420" stroke-width="3"/>${spikes}<path d="M0,-62 Q20,-100 50,-110" fill="none" stroke="#2a2420" stroke-width="3"/><text y="120" text-anchor="middle" font-size="28" font-weight="700" fill="#2a2018">蒺藜火球</text></g>
    <g transform="translate(770 590)"><circle r="46" fill="#e2d2ae" stroke="#2a2420" stroke-width="3"/><path d="M-46,0 Q0,-20 46,0 M-40,-22 Q0,-40 40,-22 M-40,22 Q0,6 40,22" stroke="#2a2420" stroke-width="2" fill="none"/><path d="M0,-46 Q14,-70 36,-74" fill="none" stroke="#2a2420" stroke-width="3"/><text x="0" y="86" text-anchor="middle" font-size="26" font-weight="700" fill="#2a2018">火球</text></g>${tx}</g>
    <g k="cap"><text x="960" y="790" text-anchor="middle" font-size="30" fill="#3a2d20" letter-spacing="4">北宋 · 曾公亮、丁度等编《武经总要》（1044年）</text></g>`;
  scene('g3',C0,C1,m3,(t,R)=>{const p=E.out(P(t,C0+.2,C0+1));op(R.bk,p);tr(R.bk,0,(1-p)*30);op(R.cap,P(t,C0+.9,C0+1.6))},{zoom:.03});
  fact(W(K,4,'记载')-.2,C1+.1,1400,120,440,'知识点','三种火药配方','书中记载了“毒药烟球”“蒺藜火球”“火炮火药法”三种火药配方，是世界上最早的军用火药配方。');

  /* ---- G4 festival fireworks ---- */
  const D0=S(K,5)-.35,D1=S(K,6)-.1;
  let lan='';for(let i=0;i<9;i++){const x=180+i*200,y=560+Math.sin(i*1.3)*20;lan+=`<g k="ln${i}" transform="translate(${x} ${y})"><line x1="0" y1="-60" x2="0" y2="-18" stroke="#1a1410" stroke-width="2"/><circle cy="20" r="70" fill="url(#gGlow)" opacity=".35"/><ellipse cy="10" rx="28" ry="34" fill="url(#gLantern)"/><rect x="-14" y="-28" width="28" height="7" rx="2" fill="#c9a24f"/><rect x="-14" y="42" width="28" height="7" rx="2" fill="#c9a24f"/><line x1="0" y1="49" x2="0" y2="70" stroke="#e2452b" stroke-width="3"/></g>`}
  const m4=`<rect width="1920" height="1080" fill="url(#gNight)"/>${stars}<circle cx="300" cy="180" r="56" fill="#f3ead6" opacity=".9"/><circle cx="300" cy="180" r="140" fill="url(#gGlow)" opacity=".22"/>
    <path d="M0,700 C300,620 500,660 760,610 C1000,570 1300,640 1600,600 C1760,580 1860,620 1920,610 V1080 H0Z" fill="#1a2034"/>
    <g fill="#0d1018"><path d="${roofPath(80,420,700,150)}"/><rect x="100" y="716" width="380" height="400"/><path d="${roofPath(700,520,660,180)}"/><path d="${roofPath(760,400,520,130)}"/><rect x="780" y="530" width="360" height="140"/><rect x="730" y="680" width="460" height="400"/><path d="${roofPath(1420,440,720,150)}"/><rect x="1440" y="736" width="400" height="400"/></g>
    <path d="M0,500 Q960,600 1920,500" stroke="#1a1410" stroke-width="2" fill="none"/>${lan}
    <g k="door" transform="translate(240 820)"><rect x="-60" y="-110" width="120" height="200" fill="#3a1410"/><path d="M0,-80 L26,-54 L0,-28 L-26,-54Z" fill="#c8302a"/><text y="-44" text-anchor="middle" class="msz" font-size="30" fill="#f3d58c">福</text></g>
    <g k="fc"><line x1="420" y1="700" x2="420" y2="900" stroke="#1a1410" stroke-width="2"/>${[...Array(10)].map((_,i)=>`<rect x="${i%2?422:404}" y="${710+i*18}" width="14" height="16" rx="2" fill="#c8302a" stroke="#f3d58c" stroke-width=".8"/>`).join('')}</g>
    <g k="poem">${vtext('爆竹声中一岁除',1790,150,46,54,'class="msz" fill="#f3d58c"')}${vtext('北宋 · 王安石《元日》',1720,320,22,26,'fill="#d9c7a0"')}</g>`;
  scene('g4',D0,D1,m4,(t,R)=>{for(let i=0;i<9;i++)tr(R['ln'+i],180+i*200,560+Math.sin(i*1.3)*20+(i===0||i===8?0:Math.sin(i)*0)+(i?0:0),1,Math.sin(t*1.4+i)*5);op(R.poem,P(t,W(K,5,'爆竹')-.2,W(K,5,'爆竹')+.8))},{zoom:.02});
  const FW=[];const pal=[[255,210,120],[255,120,80],[255,240,220],[255,170,60],[240,90,90],[255,225,150]];
  for(let i=0;i<16;i++){FW.push({t:D0+.6+i*.42+hash(i+40)*.2,x:260+hash(i+41)*1400,y:150+hash(i+42)*260,c:pal[i%pal.length],n:90+(i%3)*24,v:280+hash(i+43)*150})}
  window.FW_TIMES=FW.map(f=>f.t+.7);
  addFX(D0+.4,D1+.3,(c,t)=>{c.globalCompositeOperation='lighter';const fade=1-P(t,D1-.5,D1+.2);
    for(const f of FW){const dt=t-f.t;if(dt<0||dt>3.4)continue;const x0=f.x+(hash(f.t)-.5)*120,y0=900;
      if(dt<.7){const p=E.out(dt/.7);const x=lerp(x0,f.x,p),y=lerp(y0,f.y,p);for(let k=0;k<8;k++){const pp=Math.max(0,p-k*.03);c.fillStyle=`rgba(255,200,120,${(1-k/8)*.7*fade})`;c.beginPath();c.arc(lerp(x0,f.x,pp),lerp(y0,f.y,pp),2.4-k*.2,0,7);c.fill()}continue}
      const e=dt-.7;const life=2.4;if(e>life)continue;const al=(1-e/life);
      if(e<.15){const g=c.createRadialGradient(f.x,f.y,0,f.x,f.y,120);g.addColorStop(0,`rgba(255,250,230,${(1-e/.15)*.9*fade})`);g.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=g;c.beginPath();c.arc(f.x,f.y,120,0,7);c.fill()}
      c.lineCap='round';for(let i=0;i<f.n;i++){const a=i/f.n*Math.PI*2+hash(i+f.t)*.1;const v=f.v*(.8+hash(i*3+f.t)*.3);const pos=s=>{const d=(1-Math.exp(-1.6*s))/1.6;return[f.x+Math.cos(a)*v*d,f.y+Math.sin(a)*v*d+38*s*s]};const[x1,y1]=pos(e),[x2,y2]=pos(Math.max(0,e-.12));
        const tw=e>1.4?(Math.sin(e*40+i)>0?1:.3):1;c.strokeStyle=`rgba(${f.c[0]},${f.c[1]},${f.c[2]},${al*tw*fade})`;c.lineWidth=2.8;c.beginPath();c.moveTo(x2,y2);c.lineTo(x1,y1);c.stroke()}}
    // firecracker pops
    const fc0=W(K,5,'爆竹')-.2;if(t>fc0){for(let i=0;i<10;i++){const ph=(t*3.1+hash(i)*7)%1;if(ph<.25){const a=1-ph/.25;const y=718+((i*7+Math.floor(t*3.1+hash(i)*7))%10)*18;c.fillStyle=`rgba(255,240,200,${a*fade})`;c.beginPath();c.arc(412+(i%2)*18,y,6+10*(1-a),0,7);c.fill()}}}});

  /* ---- G5 spread map ---- */
  const E0=S(K,6)-.35,E1=SEC[K].end+.35;
  const route=[[108.9,34.3],[100,38.5],[94.7,40.1],[80,41],[67,39.7],[58,37.5],[51.4,35.7],[44.4,33.3],[38,36.5],[32.8,39.9],[29,41],[23,42.5],[18,45],[14,47.5]].map(p=>projOld(...p));
  const cs=[['zg','中国',108.9,34.3,'','start',18,-14],['ab','阿拉伯',44.4,33.3,'约13世纪','middle',0,44],['eu','欧洲',14,47.5,'13—14世纪','middle',0,-48]];
  const csm=cs.map(([k,l,lo,la,sub,an,dx,dy])=>{const[x,y]=projOld(lo,la);return cityDot(k,x,y,l,sub,an,dx,dy)}).join('');
  const [ax,ay]=projOld(44.4,33.3),[ex,ey]=projOld(14,47.5);
  const m5=`<g k="mapIn">${oldMap('#e3d4b2','#9c8560')}<path k="rt" d="${smoothPath(route)}" fill="none" stroke="#d2481f" stroke-width="6" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/><path k="rtg" d="${smoothPath(route)}" fill="none" stroke="#ffb35a" stroke-width="16" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" opacity=".25"/>${csm}
    <circle k="pa" cx="${ax}" cy="${ay}" r="30" fill="none" stroke="#d2481f" stroke-width="3"/><circle k="pe" cx="${ex}" cy="${ey}" r="30" fill="none" stroke="#d2481f" stroke-width="3"/>
    <g k="hd"><circle r="26" fill="url(#gFire)"/></g></g>`;
  const wa=W(K,6,'阿拉伯'),we=W(K,6,'欧洲'),wc=W(K,6,'改变');
  scene('g5',E0,E1,m5,(t,R)=>{const rp=E.io(P(t,S(K,6)+.4,we+.5));drawP(R.rt,rp);drawP(R.rtg,rp);const h=pathAt(R.rt,rp);tr(R.hd,h.x,h.y,1+.15*Math.sin(t*12));op(R.hd,rp>0&&rp<1?1:0);
    op(R.zg,1);op(R.ab,P(rp,.5,.6));op(R.eu,P(rp,.95,1));
    [R.pa,R.pe].forEach((el,i)=>{const d=(Math.max(0,t-wc)*.8+i*.5)%1;const on=t>wc;at(el,'r',(20+d*70).toFixed(1));op(el,on?(1-d)*.8:0)});
    at(R.mapIn,'transform',`translate(960 500) scale(${(1+.05*P(t,E0,E1)).toFixed(4)}) translate(-960 -520)`)},{zoom:0});
  fact(wa,E1-.4,1380,640,460,'知识点','“中国雪”','火药技术经丝绸之路西传，阿拉伯人把来自中国的硝石称为“<em>中国雪</em>”。');
  addFX(S(K,6)+.4,we+.6,(c,t)=>{});
  chapterCard('outro','sOutro');
});

/* ================= OUTRO ================= */
BUILDERS.push(()=>{
  const K='outro';
  const A0=S(K,0)-.35,A1=S(K,2)-.1,S1=S(K,1);
  const icons=['paper','type','compass','fire'],labels=['造纸术','印刷术','指南针','火药'];
  const WY=150;const[chx,chy]=projW(108,34);
  const dests=[[10,50,'欧洲'],[40,26,'阿拉伯'],[37,-4,'非洲'],[78,21,'印度'],[103,4,'东南亚'],[137,36,'日本'],[127,37.5,''],[-95,38,'美洲'],[-58,-14,''],[134,-25,'大洋洲']];
  let tr_='',dd='';dests.forEach(([lo,la,l],i)=>{const[x,y]=projW(lo,la);const mx=(x+chx)/2,my=Math.min(y,chy+WY)-120-Math.abs(x-chx)*.12;tr_+=`<path k="tl${i}" d="M${chx},${chy+WY} Q${mx},${my+WY*0} ${x},${y+WY}" fill="none" stroke="#e0b24e" stroke-width="3" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`;dd+=`<g k="dd${i}" transform="translate(${x} ${y+WY})"><circle r="7" fill="#e0b24e"/><circle k="ddp${i}" r="14" fill="none" stroke="#e0b24e" stroke-width="2"/>${l?`<text y="-16" text-anchor="middle" font-size="24" font-weight="700" fill="#3a2d20" paint-order="stroke" stroke="#f3eadb" stroke-width="5">${l}</text>`:''}</g>`});
  const bi=`<g k="bi"><circle r="150" fill="url(#gGlow)" opacity=".8"/><circle r="92" fill="#a9c4a8" stroke="#5f7d63" stroke-width="3"/><circle r="30" fill="#efe6d2" stroke="#5f7d63" stroke-width="3"/>${[...Array(30)].map((_,i)=>{const a=i/30*Math.PI*2;return`<circle cx="${(Math.cos(a)*62).toFixed(1)}" cy="${(Math.sin(a)*62).toFixed(1)}" r="5" fill="none" stroke="#6f8f73" stroke-width="1.6"/>`}).join('')}<circle r="80" fill="none" stroke="#e8f2e4" stroke-width="2" opacity=".6"/><ellipse cx="-30" cy="-40" rx="26" ry="14" fill="#fff" opacity=".25" transform="rotate(-30)"/></g>`;
  let meds='';for(let i=0;i<4;i++)meds+=medal('om'+i,icons[i],labels[i],'',80);
  const m=`<g k="world"><rect x="0" y="${WY-20}" width="1920" height="780" fill="#efe5cd" opacity=".35"/><path d="${MAP.world}" transform="translate(0 ${WY})" fill="#e3d6b8" stroke="#9c8560" stroke-width="1.2" stroke-linejoin="round"/>${tr_}${dd}</g>
   <g k="biG">${bi}</g>${meds}<g k="ring"><circle r="210" fill="none" stroke="url(#gGold)" stroke-width="2" stroke-dasharray="4 10"/></g>`;
  const wm=[W(K,0,'四'),W(K,0,'大'),W(K,0,'发'),W(K,0,'明')];const wz=W(K,0,'智慧'),wc=W(K,1,'传遍');
  scene('o1',A0,A1,m,(t,R)=>{
    const conv=E.io(P(t,wm[3]+.6,wz));const shrink=E.io(P(t,S1-.2,S1+1.4));
    const cX=lerp(960,chx,shrink),cY=lerp(450,chy+WY,shrink),cS=lerp(1,.32,shrink);
    for(let i=0;i<4;i++){const p=E.out(P(t,wm[i]-.2,wm[i]+.5));const a=i/4*Math.PI*2-Math.PI*.75+t*.25*conv;const qx=[520,1400,520,1400][i],qy=[300,300,640,640][i];
      const rx=lerp(qx,960+Math.cos(a)*210,conv),ry=lerp(qy,450+Math.sin(a)*210,conv);const x=lerp(rx,cX+(rx-960)*cS,shrink),y=lerp(ry,cY+(ry-450)*cS,shrink);
      op(R['om'+i],p*(1-shrink*.85));tr(R['om'+i],x,y,(.7+.3*E.back(p))*lerp(1,.4,shrink))}
    const bp=E.out(P(t,wz-.4,wz+.8));op(R.biG,bp*(1-shrink*.3));tr(R.biG,cX,cY,(.6+.4*bp)*lerp(1,.45,shrink),t*6);
    op(R.ring,P(t,wz-.2,wz+.6)*(1-shrink));tr(R.ring,960,450,1,-t*8);
    op(R.world,P(t,S1-.3,S1+.9));
    dests.forEach((d,i)=>{const st=wc-.4+i*.18;const p=E.io(P(t,st,st+1.1));drawP(R['tl'+i],p);op(R['dd'+i],P(p,.85,1));const q=(Math.max(0,t-st-1.1)*.7+i*.13)%1;at(R['ddp'+i],'r',(8+q*26).toFixed(1));op(R['ddp'+i],p>=1?(1-q):0)});
  },{zoom:.02});
  addFX(wc-.4,A1+.2,(c,t)=>{c.globalCompositeOperation='lighter';const sc=scenes.find(s=>s.id==='o1');if(!sc)return;const al=win(t,wc-.4,A1+.2,.3,.6);dests.forEach((d,i)=>{const el=sc.R['tl'+i];const st=wc-.4+i*.18;for(let k=0;k<3;k++){const p=((t-st)*.45+k/3)%1;if(t-st<1.1&&p>(t-st)/1.1)continue;const pt=pathAt(el,p);const z=sc._z||1,x=960+(pt.x-960)*z,y=540+(pt.y-540)*z;const g=c.createRadialGradient(x,y,0,x,y,12);g.addColorStop(0,`rgba(255,240,190,${al})`);g.addColorStop(1,'rgba(240,180,60,0)');c.fillStyle=g;c.beginPath();c.arc(x,y,12,0,7);c.fill()}})});
  /* ---- O2 closing ---- */
  const B0=S(K,2)-.35,B1=TL.total+.5;const title='智慧之光';
  let tc='';[...title].forEach((ch,i)=>tc+=`<g k="cg${i}"><image href="${ASSET.blot2}" x="-110" y="-110" width="220" height="220" opacity=".16"/><text k="c${i}" class="msz" y="70" font-size="200" text-anchor="middle" fill="#16130f">${ch}</text></g>`);
  let mm='';for(let i=0;i<4;i++)mm+=`<g transform="translate(${960+(i-1.5)*150} 690)">${medal('em'+i,icons[i],'','',44)}</g>`;
  const m2=`<g k="blot"><image href="${ASSET.blot}" x="460" y="0" width="1000" height="800" opacity=".18"/></g>${tc}<g k="seal"><image href="${ASSET.sEnd}" x="-45" y="-72" width="90" height="144"/></g>
   <g k="sub"><rect x="560" y="566" width="140" height="1.5" fill="url(#gGoldH)"/><rect x="1220" y="566" width="140" height="1.5" fill="url(#gGoldH)"/><text x="960" y="578" text-anchor="middle" font-size="36" letter-spacing="10" fill="#5b4630">造纸术 · 印刷术 · 指南针 · 火药</text></g>${mm}
   <g k="fin"><rect x="830" y="790" width="90" height="1.5" fill="url(#gGoldH)"/><rect x="1000" y="790" width="90" height="1.5" fill="url(#gGoldH)"/><text x="960" y="800" text-anchor="middle" font-size="28" fill="#8a6d45">完</text></g>`;
  const ws=W(K,2,'读懂');
  scene('o2',B0,B1,m2,(t,R)=>{const lt=t-B0;
    op(R.blot,P(lt,0,1.5)*.9);
    [...title].forEach((c,i)=>{const p=E.out(P(lt,.4+i*.35,1.3+i*.35));op(R['cg'+i],p);tr(R['cg'+i],960+(i-1.5)*230,380+(1-p)*16,1.15-.15*p)});
    const[so,ss]=stampA(t,ws+.6);op(R.seal,so);tr(R.seal,1488,360,ss,-4);
    op(R.sub,P(lt,2.2,3));for(let i=0;i<4;i++){const p=P(lt,2.6+i*.18,3.1+i*.18);op(R['em'+i],p);tr(R['em'+i],0,(1-E.out(p))*16,.8+.2*E.back(p))}
    op(R.fin,P(t,SE(K,2)+1.2,SE(K,2)+2.2));
  },{zoom:.03,fo:.01});
  /* ---- mood table ---- */
  MOOD.push([0,0],[1.2,0],[3.4,.55],[12,.5],[12.8,.18],[18.4,.16],[19,0]);
  TL.secs.forEach(s=>{if(s.key==='intro')return;MOOD.push([s.card-.4,s.idx===1?0:.12],[s.card+.4,.45],[s.start+.2,.45],[s.start+1.2,.12])});
  MOOD.push([S(K,2)-.6,.12],[S(K,2)+.8,.7],[TL.total,.7]);MOOD.sort((a,b)=>a[0]-b[0]);
});


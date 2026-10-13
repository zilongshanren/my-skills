# Authoring scenes.js

`scenes.js` is plain JS concatenated into the bundle. You write scene builders; the runtime renders
`render(t)` every frame as a **pure function of t**, so every visual must be computed from `t` only
(no accumulated state). This makes `?t=SEC` / seeking exact.

Worked example: `reference/example-four-inventions/` (script.json, scenes.js, data/map.json).

## Project layout

```
<proj>/
  script.json          {title, subtitle, kicker, theme, [watermark], [tts:"edge", voice, rate, voice_en, rate_en], secs:[{key,title,sub,sents:[text | N秒静音]}]}
  scenes.js            your code (this doc)
  data/*.json          optional; data/map.json -> const MAP, data/foo-bar.json -> const FOO_BAR
  build/               produced by tts_timeline.py / music.py / fonts.py
    timeline.json  narration.mp3  music.mp3  fonts.json  fonts/*.woff2
```

`uv run scripts/bundle.py <proj>` -> `<proj>/<title>.html`. Script order in the bundle:
consts (`TL`, data consts, `AUDIO_NARR`, `AUDIO_MUS`) -> `runtime.js` -> `themes/<theme>/theme.js` -> `scenes.js` -> `init();`.
Top-level code in scenes.js therefore runs before fonts/assets exist; put DOM work inside builders.

Section keys: first `intro`, last `outro`, chapters in between (chapter number = `SEC[key].idx`).

## Timeline (TL)

`TL={total, secs:[{key,title,sub,card,start,end,sents:[{t0,t1,text,chunks:[{text,ch:[...]}],ct:[...]}]}]}`
(`card` = chapter-card start, `start` = first sentence; `ct[j]` = time of char j of `text`; `ch` = per-char times of a subtitle chunk).

| helper | returns |
|---|---|
| `S(key,i)` / `SE(key,i)` | start / end of sentence i |
| `W(key,i,'词',n=0)` | time the n-th occurrence of `词` is spoken in sentence i (warns + falls back to t0 on miss) |
| `CH(key,i,c)` | start of subtitle chunk c |
| `SEC[key]` | section object (+`idx`) |
| `DUR` | total seconds |

Anchor events to words (`W`) rather than raw seconds so they survive re-narration.

Layout (tts_timeline.py constants): intro's first sentence starts at `LEAD`=5.2s (0..5.2 is silent — the first scene
must cover it, typically the title animation); sentences are `GAP`=0.55s apart; a section ends `TAIL`=1.3s after its
last sentence and the next section's `card` = that `end`; `start = card + CARD` (4.6s silent chapter card);
`total` = outro's last sentence end + `LAST_TAIL`=7.0s.

## Scenes

```js
BUILDERS.push(()=>{
  const K='paper',t0=SEC[K].start-.3,t1=S(K,2);
  scene('paper-a',t0,t1,`<g k="pile">…</g><path k="ln" pathLength="1" stroke-dasharray="1 1"/>`,(t,R,sc)=>{
    op(R.pile,EP(t,t0,t0+1));tr(R.pile,960,540,lerp(.9,1,EP(t,t0,t0+1)));drawP(R.ln,P(t,W(K,0,'竹简'),W(K,0,'竹简')+1));
  },{fi:.7,fo:.7,zoom:.035});
});
```

- `scene(id,t0,t1,markup,update(t,R,sc),{fi,fo,zoom})` — one full-frame `<svg viewBox="0 0 1920 1080">`.
  Visible on `win(t,t0,t1,fi,fo)`; slow zoom `1+zoom*P(t,t0,t1)`. `R[k]` = elements with attribute `k="…"`.
  In `update` you may set `sc.zoomOverride`, `sc.sx`, `sc.sy` (px shake/pan).
- DOM order = z-order during cross-fades: builders run in push order.
- `scenes.js` is one script: a SyntaxError anywhere (e.g. duplicate `const` in one scope) blanks the whole page; snap.sh prints it.
  It shares that scope with runtime.js and theme.js: never redeclare their top-level names (`fit`, `seek`, `play`, `render`,
  `scene`, `$`, `S`, `W`, `P`, `E`, `op`, `tr`, `at`, …; list them with `grep -o '^\(function\|const\) [A-Za-z_$]*' template/runtime.js`).

Timing conventions (from the example):
- first scene `t0=0`, `fi:.01`; last scene `t1=TL.total+.5`, `fo:.01`.
- a scene starts at `S(k,i)-.35` and the previous ends at `S(k,i)-.1`, so they cross-fade; a chapter's last scene ends at `SEC[k].end+.3` (= next card +.3).
- `chapterCard(next,seal)` is called at the end of the previous chapter's builder (intro's builder calls `chapterCard('paper',…)`);
  `outro` gets one too (ink renders its numeral as 「终」). The card scene spans `card..start+.6`.

Layout safe zones: chapter tag top-left (`top:44px`, ≈ y<110; hidden during intro/outro); subtitles bottom 200px;
fact cards at (70,130) sit just below the tag.
- Builders run after fonts and `ASSET`s are ready, so `ASSET.x` is usable inside markup.

### Value helpers
`P(t,a,b)` linear 0..1 · `EP(t,a,b,e='out')` eased · `E.{out,in,io,q,sine,back,expo}` ·
`win(t,a,b,fi=.6,fo=.6)` fade-in/out window · `lerp` · `clamp(x,a=0,b=1)` · `hash(i)` deterministic 0..1 ·
`rng(seed)` seeded PRNG.

### DOM setters (cached, cheap to call every frame)
`op(el,v)` opacity (+display none at 0) · `tr(el,x,y,s=1,r=0,sy)` SVG transform · `at(el,k,v)` attribute · `css(el,k,v)` style.

### SVG helpers
`vtext(str,x,y,size,gap,attrs)` vertical text · `vcols(lines,xRight,y,size,colGap,gap,attrs)` columns right-to-left ·
`smoothPath(pts)` Catmull-Rom `d` · `pathAt(el,p)` → `{x,y,a}` · `drawP(el,p)` stroke reveal (needs `pathLength="1" stroke-dasharray="1 1"`) ·
`stampA(t,t0)` → `[opacity,scale]` stamp-down anim.

### Overlay layers
- `fact(t0,t1,x,y,w,tag,title,body,dark)` — info card in HUD; `body` is HTML (`<em>` = accent).
- `addFX(t0,t1,(ctx,t)=>{})` — draw on the full-frame canvas above scenes (sparks, particles).
- `nightWin(a,b)` — mark a dark interval (chapter tag switches to `.dark`).
- `MOOD.push([t,v])` — background intensity keyframes 0..1; theme reads `mood(t)` in `renderBG`.

### Assets and defs
- `asset(key,()=>url|Promise<url>)` — registered at top level, run once in `init` after fonts load; result in `ASSET[key]`.
- `defs(markup)` — append `<linearGradient>/<filter>…` to the shared `<svg id="defs">`; reference with `url(#id)`.
- `ASSET.sTitle`, if registered, is appended to the start-screen title.

### Pitfalls
- A gradient with default `objectBoundingBox` units on a horizontal/vertical `<line>` renders nothing (zero-height bbox):
  use `gradientUnits="userSpaceOnUse"` or a thin `<rect>`/`<path>`.

### Debug
`page.html?t=42` freezes at t=42 with the start overlay hidden; `window.__seek(t)` re-renders; `window.__ready` is set after init.
`scripts/snap.sh page.html outdir 3 42 …` writes `outdir/t<sec>.png` at 1920×1080.

## Theme contract

A theme is `template/themes/<name>/` with three files; `script.json.theme` selects it. runtime.js knows nothing theme-specific.

**theme.css** — appended after the generic CSS. Must style: body/stage background and fonts, `#chapTag .seal/.ct-title/.ct-sub` (+`.dark`),
`.fact` (+`.tag .ft .fb em`, `.dark`), `#subs`/`#subLine` (+`span.on`), start overlay (`#start .st-kicker .st-title .st-sub #startBtn .ring .st-tips`),
`#replayBtn`, control accents (`#barFill #knob #marks .mk #btns button.on #curChap #chapMenu`), and `.msz` for display-font SVG text.

**theme.js** — must define these globals:

| hook | called |
|---|---|
| `themeInit()` | once, after assets, before builders |
| `renderBG(t)` | first in every `render(t)` |
| `drawAmbient(t)` | on the FX canvas each frame, before `addFX` drawers |
| `chapNum(idx)` | text for the chapter-tag badge |
| `chapterCard(key,sealKey)` | builds the chapter title scene; called at the end of the previous builder (see Timing conventions) |
| `makeSeal(text,size,{shape,font})` | returns Promise<url>; scenes use it via `asset(k,()=>makeSeal(…))` |

ink's `makeSeal`: `shape` `'sq'` (default, square) or `'tall'` (1.6× height); `font` = CSS family (default `'MSZ'`, fallback NSerif);
1–4 chars are laid out (4 = 2×2, read right column first).

Runtime helpers a theme uses (besides the scene API): `mood(t)`, `isNight(t)`, `rasterSVG(svg,w,h)` → Promise<url> (SVG string to PNG),
`canvasURL(canvas)` → Promise<url>, `fx` (2D context of the full-frame FX canvas, for `drawAmbient`).

It may insert its own background DOM (before `#scenes`), register assets (`asset`) and generic defs (`defs`).
ink provides defs `gGold gGoldH gSheet gGlow gWash gShadow fGlow fShadow fBlur8` and assets `paper m0 m1 m2 blot blot2 stroke pl0 pl1 pl2`;
scenes that reference these are tied to ink.
notebook (清新笔记本风, grid paper) provides palette const `NB` (`ink sub blue blueL hl mint mintL coral coralL purple purpleL`),
defs `fCard fCardS` (card shadows) `fMarker` (rough marker edge) `gHL` (yellow highlighter fill), assets `ok no` (✓/✗ round badges, 160px),
`wordCard(en,zh,{k,w,size=72,color})` → SVG markup of an English word card with Chinese gloss centered at the origin (place via `tr(R[k],x,y)`;
`en` may hold `<tspan fill="${NB.purple}">s</tspan>`), CSS classes `.en` (Nunito, SVG/HTML) and `.wd` (inline word chip in fact bodies);
its `makeSeal` draws a die-cut sticker: `shape` `'round'` (default) / `'sq'` / `'tall'`, extra option `color` (default `NB.coral`).
The chapter tag shows `LESSON 01`, and a leading `01 ` / `一、` is stripped from chapter titles.

**fonts.json** — `{"Family":{"google":"Google Family Name","weights":[400,700]}}`, consumed by fonts.py, which writes
`build/fonts.json` = `[{"family","weight":400|"400 700","file":"fonts/…woff2","unicodeRange"?}]`; bundle.py emits one `@font-face` per entry.

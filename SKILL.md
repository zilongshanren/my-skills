---
name: science-explainer
description: Produces a self-contained narrated animated explainer web page (single HTML, 1920×1080 SVG animation synced word-by-word to Mandarin TTS narration, subtitles, procedural background music, swappable visual themes; default theme is Chinese ink-wash 国风水墨). Use when the user wants to make a 科普网页, 动画讲解, 科普视频, 讲解动画, narrated explainer, or an animated documentary-style page on any topic.
---

# 科普动画网页

产物：一个自包含 HTML（字体、配音、配乐全部 base64 内联），双击即可播放，支持拖动进度、章节跳转。
动画是 `render(t)` 纯函数，画面事件用 `W(章,句,'词')` 锚定到配音念出该词的时刻。

范例：`reference/example-four-inventions/`（《中国古代四大发明》，4:14，25 场景）。动手前先读它的 `script.json` 和 `scenes.js` 开头。

## 依赖

`uv`（脚本自带 PEP 723 依赖：edge-tts、numpy 等）、`POE_API_KEY`（`.env`）、`ffmpeg`、Google Chrome、`node>=22`（截图用）、联网（TTS 与 Google Fonts）。

## 流程

下文 `$SK` = 本 skill 目录，`<proj>` = 新建的项目目录（一片一个目录）。

```
- [ ] 1. 写脚本    <proj>/script.json        按 reference/storyboard.md §1
- [ ] 2. 配音      uv run $SK/scripts/tts_timeline.py <proj>
- [ ] 3. 配乐      uv run $SK/scripts/music.py <proj> [--seed N]
- [ ] 4. 分镜表 → <proj>/scenes.js           按 storyboard.md §2-4 + reference/authoring.md
- [ ] 5. 字体子集  uv run $SK/scripts/fonts.py <proj>
- [ ] 6. 打包      uv run $SK/scripts/bundle.py <proj>     → <proj>/<title>.html
- [ ] 7. 截图检查  $SK/scripts/snap.sh <proj>/<title>.html /tmp/snap 3 30 …
- [ ] 8. 导出视频（可选） $SK/scripts/video.sh <proj>/<title>.html [out.mp4] [fps=30]  → 同目录 <title>.mp4 + 「<title> 封面.png」（开场标题卡，同时嵌入 mp4 作缩略图，并作为视频第 0 帧），逐帧 __seek，约 3×实时
```

**1. script.json**

```json
{"title":"中国古代四大发明","subtitle":"造纸术 · 印刷术 · 指南针 · 火药","kicker":"动画讲解 · 普通话配音",
 "theme":"ink","voice":"zh-CN-YunjianNeural","rate":"-5%",
 "secs":[{"key":"intro","title":"《中国古代四大发明》","sub":"从中国出发 · 传遍世界","sents":["……","……"]},
         {"key":"paper","title":"一、造纸术","sub":"东汉 · 蔡伦","sents":["……"]},
         {"key":"outro","title":"结语","sub":"……","sents":["……"]}]}
```

可选 `"watermark":"…"`：右下角水印，网页、封面、视频都带（`#wm`，见 template/index.html）。首段 key 必须是 `intro`，末段必须是 `outro`。`sents` 里写数字 N 表示 N 秒静音（思考/跟读停顿），照样占一个句子序号 i。写完先把旁白全文给用户过目，再往下做（改稿会让后面全部重跑）。

**2. 配音**：默认 Poe ElevenLabs `elevenlabs-v3`，整句一个女声读中英文。`POE_API_KEY` 从环境变量或 `<proj>` 及其任一上级目录的 `.env` 读取，不要写进脚本。Poe 无法选音色（`--voice` 会被读出来），也不返回逐字时间，逐字时间按有声段字数比例估算。语速比 edge-tts 慢约 15%。脚本按句缓存在 `build/tts/`，只改一句时只重新合成那一句。产物 `build/timeline.json` 包含逐字时间戳。退回 edge-tts 用 `"tts":"edge"`，此时 `voice`/`rate`/`voice_en` 生效（如云健 `zh-CN-YunjianNeural` `-5%`；`voice_en` 即中英双声）。小句超过 22 字会告警（字幕按 ≤20 字切块），回到第 1 步拆句。

**3. 配乐**：程序合成，长度自动对齐 `total`。换 `--seed` 得到另一首；同一 seed 结果完全一致。script.json 的 `"music"` 选情绪：
- `happy`：112 BPM 大调 I-V-vi-IV，马林巴琶音 + 沙锤 + 钟琴，轻快。学生反馈氛围乐太闷，面向学生/语言课一律用它；`notebook` 主题默认就是它
- `calm`：五声音阶氛围乐（pad + 拨弦 + 章节锣），纪录片腔；其他主题默认

**4. scenes.js**：先在对话里列出分镜表（场景 / 句子 / 画面 / 锚点词），再写代码。API 见 `reference/authoring.md`。
- 每个场景都包在 `BUILDERS.push(()=>{…})` 里；`chapterCard(key, sealKey)` 在上一章 builder 末尾调用，`outro` 也要调用
- 时间一律通过 `S/SE/W` 取，不写裸秒数；所有画面只由 `t` 算出，不保留累积状态
- 不用位图，全部手绘 SVG：主题提供 defs/纹理，题材相关的渐变用 `defs()` 自己加
- 地图之类的数据放 `data/xxx.json`，会自动变成常量 `XXX`

**5. 字体**：用到的字符集从 script.json 和 scenes.js 里收集，所以必须在 scenes.js 写完后跑；scenes.js 加了新字就重跑。

**7. 检查**：截图至少覆盖片头、每张章节卡（`card+2`）、每个场景的中段、夜景/知识卡出现时刻、片尾，然后用 Read 看图。时间从 `build/timeline.json` 读：
`python3 -c "import json;[print(s['key'],s['card'],s['start'],s['end']) for s in json.load(open('<proj>/build/timeline.json'))['secs']]"`
snap.sh 会打印页面异常、warning 和 `layout t=…:` 行（可见的场景文字/图片超出画面，或压进字幕区 y>880；任何可见场景图形、字幕、知识卡碰到水印 → `watermark overlap`；可见场景图形碰到左上角章节标签 `#chapTag` → `chapter tag overlap`），输出必须干净（不能有 `W miss`、`layout`）。几何问题交给它，可以密集采样（如每 2s 一帧）；看图只看拼板（ffmpeg tile），一轮即可，重点看它查不到的：
- 知识卡是否压住主体
- 元素之间互相重叠
- 场景切换时有没有空帧
- 浏览器里打开 `<title>.html?t=SEC` 可以定格在某一帧调试

## 主题

`script.json` 的 `theme` 字段选择 `template/themes/<name>/`：`ink`（宣纸、远山、印章、毛笔字）；`notebook`（清新笔记本风：方格纸、圆角卡片、荧光笔、贴纸，Nunito + 思源黑体，适合语言/学科微课，章节标题可写成 `01 什么是名词`）。
新建主题要实现 `theme.css`、`theme.js`（6 个钩子）、`fonts.json`，契约见 authoring.md 的 "Theme contract" 一节。
注意场景代码一旦引用了主题资源（如 `ASSET.m0`、`url(#gGold)`），就和该主题绑定了。

## 参考

- `reference/storyboard.md`：怎么写旁白、怎么分镜、知识卡与节奏
- `reference/authoring.md`：runtime API、TL 结构、主题契约
- `reference/example-four-inventions/`：完整范例

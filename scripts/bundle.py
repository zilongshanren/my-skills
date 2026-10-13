# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""Inline template + theme + project into one self-contained HTML.

Usage: uv run bundle.py <proj>
Reads <proj>/{script.json,scenes.js,data/*.json,build/{timeline.json,narration.mp3,music.mp3,fonts.json,fonts/*}},
writes <proj>/<title>.html.
"""
import base64, html, json, re, sys
from pathlib import Path

SKILL = Path(__file__).resolve().parent.parent
TPL = SKILL / "template"


def die(msg):
    sys.exit(f"bundle: {msg}")


def need(p: Path, hint=""):
    if not p.is_file():
        die(f"missing {p}" + (f" ({hint})" if hint else ""))
    return p


def js_json(text):
    """Validate JSON text and make it safe inside <script>."""
    json.loads(text)
    return text.strip().replace("</", "<\\/")


def b64(p: Path):
    return base64.b64encode(p.read_bytes()).decode()


def main():
    if len(sys.argv) != 2:
        die("usage: bundle.py <proj>")
    proj = Path(sys.argv[1]).expanduser().resolve()
    build = proj / "build"
    script = json.loads(need(proj / "script.json").read_text(encoding="utf-8"))
    theme_dir = TPL / "themes" / script.get("theme", "ink")
    if not theme_dir.is_dir():
        die(f"unknown theme {script.get('theme')!r}: {theme_dir} not found")
    hint = "run tts_timeline.py / music.py / fonts.py first"
    tl = json.loads(need(build / "timeline.json", hint).read_text(encoding="utf-8"))
    # chapter title/sub are display-only: take them from script.json so editing them needs no TTS rerun
    meta = {s["key"]: s for s in script["secs"]}
    for sec in tl["secs"]:
        if sec["key"] in meta:
            sec["title"], sec["sub"] = meta[sec["key"]].get("title", ""), meta[sec["key"]].get("sub", "")
    tl_text = json.dumps(tl, ensure_ascii=False)
    narr, mus = need(build / "narration.mp3", hint), need(build / "music.mp3", hint)
    fonts = json.loads(need(build / "fonts.json", hint).read_text(encoding="utf-8"))
    scenes = need(proj / "scenes.js").read_text(encoding="utf-8")

    faces = []
    for f in fonts:
        src = need(build / f["file"], "listed in build/fonts.json")
        ur = f";unicode-range:{f['unicodeRange']}" if f.get("unicodeRange") else ""
        faces.append(f'@font-face{{font-family:"{f["family"]}";src:url(data:font/woff2;base64,{b64(src)}) format("woff2");'
                     f'font-weight:{f["weight"]};font-style:normal;font-display:block{ur}}}')

    consts = [f"const TL={js_json(tl_text)};"]
    for p in sorted((proj / "data").glob("*.json")) if (proj / "data").is_dir() else []:
        name = re.sub(r"\W", "_", p.stem).upper()
        consts.append(f"const {name}={js_json(p.read_text(encoding='utf-8'))};")
    consts += [f'const AUDIO_NARR="{b64(narr)}";', f'const AUDIO_MUS="{b64(mus)}";']

    total = tl["total"]
    m, s = divmod(round(total), 60)
    esc = lambda k: html.escape(script.get(k, ""), quote=False)
    vals = {
        "TITLE": esc("title"), "SUBTITLE": esc("subtitle"), "KICKER": esc("kicker"), "WATERMARK": esc("watermark"),
        "DURATION": f"{m} 分 {s} 秒",
        "FONT_FACES": "\n".join(faces),
        "THEME_CSS": need(theme_dir / "theme.css").read_text(encoding="utf-8"),
        "SCRIPT": "\n".join(consts + [
            (TPL / "runtime.js").read_text(encoding="utf-8"),
            need(theme_dir / "theme.js").read_text(encoding="utf-8"),
            scenes,
            "init();",
        ]),
    }
    page = re.sub(r"\{\{(\w+)\}\}", lambda mt: vals[mt.group(1)], (TPL / "index.html").read_text(encoding="utf-8"))
    out = proj / f"{script['title'].replace('/', '／')}.html"
    out.write_text(page, encoding="utf-8")
    print(f"wrote {out} ({out.stat().st_size / 1e6:.1f} MB, {m}:{s:02d})")


if __name__ == "__main__":
    main()

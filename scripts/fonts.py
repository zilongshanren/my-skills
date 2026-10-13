# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""Download Google Fonts woff2 subsets covering all chars used by the project.

Usage: uv run fonts.py <proj>   (theme from script.json, like bundle.py)
Writes <proj>/build/fonts/<alias>-<weights>[-<i>].woff2 and <proj>/build/fonts.json.
"""
import json, re, sys, urllib.error, urllib.parse, urllib.request
from pathlib import Path

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
CHUNK = 500  # chars per text= request
EXTRA = "，。、；：？！“”‘’《》〈〉「」『』（）【】·—…～→←↑↓↺⛶▶❚▾⏮⏭■□●○◆◇★☆×÷°％"


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def main():
    if len(sys.argv) != 2:
        sys.exit("usage: fonts.py <proj>")
    proj = Path(sys.argv[1]).expanduser().resolve()
    template = Path(__file__).resolve().parent.parent / "template"
    for f in (proj / "script.json", proj / "scenes.js"):
        if not f.is_file():
            sys.exit(f"fonts: missing {f}")
    theme = template / "themes" / json.loads((proj / "script.json").read_text(encoding="utf-8")).get("theme", "ink")
    if not theme.is_dir():
        sys.exit(f"fonts: unknown theme dir {theme}")

    chars = set(chr(c) for c in range(0x20, 0x7F)) | set(EXTRA)
    for f in [proj / "script.json", proj / "scenes.js", *sorted((proj / "data").glob("*.json")),
              template / "index.html", template / "runtime.js", *(f for f in theme.iterdir() if f.is_file())]:
        chars |= {c for c in f.read_text(encoding="utf-8") if ord(c) > 0x7E and c.isprintable()}
    text = "".join(sorted(chars))
    print(f"charset: {len(text)} chars", file=sys.stderr)

    out_dir = proj / "build/fonts"
    out_dir.mkdir(parents=True, exist_ok=True)
    for old in out_dir.glob("*.woff2"):
        old.unlink()
    entries = []
    for alias, spec in json.loads((theme / "fonts.json").read_text()).items():
        ws = sorted(spec.get("weights", [400]))
        css = ""
        for i in range(0, len(text), CHUNK):  # long text= makes Google ignore subsetting and return all slices
            url = ("https://fonts.googleapis.com/css2?family=" + urllib.parse.quote(spec["google"]).replace("%20", "+")
                   + ":wght@" + ";".join(map(str, ws)) + "&text=" + urllib.parse.quote(text[i:i + CHUNK]) + "&display=block")
            try:
                css += get(url).decode()
            except urllib.error.HTTPError as e:
                if e.code != 400:  # 400 = font has none of this chunk's chars (e.g. Latin font, CJK-only chunk)
                    sys.exit(f"ERROR {alias}: CSS request failed ({e}); URL {len(url)} bytes")
                print(f"  {alias}: chunk {i // CHUNK} has no glyphs in this font, skipped", file=sys.stderr)
            except Exception as e:
                sys.exit(f"ERROR {alias}: CSS request failed ({e}); URL {len(url)} bytes")
        blocks = []  # merge blocks sharing one file (variable font serving several weights)
        for block in re.findall(r"@font-face\s*{([^}]*)}", css):
            w = int(re.search(r"font-weight:\s*(\d+)", block).group(1))
            src = re.search(r"url\(([^)]+)\)", block).group(1)
            ur = re.search(r"unicode-range:\s*([^;]+);", block)
            same = next((b for b in blocks if b["src"] == src), None)
            if same:
                same["ws"].append(w)
            else:
                blocks.append({"src": src, "ws": [w], "ur": ur and ur.group(1).strip()})
        for i, b in enumerate(blocks):
            wtag = "-".join(map(str, b["ws"]))
            n = sum(x["ws"] == b["ws"] for x in blocks[:i])
            name = f"{alias}-{wtag}" + (f"-{n}" if n else "") + ".woff2"
            try:
                data = get(b["src"])
            except urllib.error.HTTPError as e:
                if e.code != 400:  # 400 = kit subset has no glyphs in this font (CSS still returns 200)
                    raise
                print(f"  {name}: no glyphs in this font, skipped", file=sys.stderr)
                continue
            (out_dir / name).write_bytes(data)
            e = {"family": alias, "weight": b["ws"][0] if len(b["ws"]) == 1 else f"{min(b['ws'])} {max(b['ws'])}",
                 "file": f"fonts/{name}"}
            if b["ur"]:
                e["unicodeRange"] = b["ur"]
            entries.append(e)
            print(f"  {name}: {len(data) / 1024:.0f} KB", file=sys.stderr)
        if not blocks:
            sys.exit(f"ERROR {alias}: no @font-face in response")
    (proj / "build/fonts.json").write_text(json.dumps(entries, ensure_ascii=False, indent=1))
    print(f"fonts: {len(entries)} file(s) -> {proj / 'build/fonts.json'}")


if __name__ == "__main__":
    main()

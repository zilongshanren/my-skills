# /// script
# requires-python = ">=3.10"
# dependencies = ["edge-tts>=7,<8"]
# ///
"""Synthesize narration per sentence with edge-tts and lay out a global timeline.

Usage: uv run tts_timeline.py <proj>
TTS engine: Poe ElevenLabs "elevenlabs-v3" by default (POE_API_KEY from env or a .env in <proj> or any parent;
one female voice reads zh+en, no word timings -> estimated). script.json "tts": "edge" -> edge-tts voice/voice_en.
Reads <proj>/script.json, writes <proj>/build/{narration.mp3,timeline.json}, caches clips in build/tts/.
"""
import asyncio, hashlib, json, os, re, subprocess, sys, urllib.request
from array import array
from pathlib import Path

import edge_tts

SR = 24000
LEAD, GAP, TAIL, CARD, LAST_TAIL = 5.2, 0.55, 1.3, 4.6, 7.0
SEPS = set("，、；：。！？,;:!?")
CLOSERS = set("”’」』）》〉)\"'")
MAX_CHUNK, WARN_CLAUSE = 20, 22
# bilingual (voice_en): English runs, pause after punctuation (≈ edge-tts zh pauses), gap at a plain switch, trim threshold
EN = re.compile(r"[-'’]?[A-Za-z]+(?:[ '’-]+[A-Za-z]+)*['’]?[.!?]*")
PAUSE = dict.fromkeys("，、,", .23) | dict.fromkeys("；：;:", .32) | dict.fromkeys("。！？.!?", .65)
SWITCH, SILENT = .08, 184
EDGE = .2, .6  # silence kept before/after a bilingual sentence ≈ edge-tts clip padding, so GAP spacing matches single-voice


def r3(x):
    return round(x + 0.0, 3)


async def synth(text, voice, rate, mp3, meta, sem):
    async with sem:
        for attempt in range(5):
            try:
                if voice.startswith("elevenlabs"):
                    await asyncio.to_thread(poe_tts, voice, text, mp3, meta)
                    print(f"  tts ok: {text[:24]}", file=sys.stderr)
                    return
                audio, words = bytearray(), []
                comm = edge_tts.Communicate(text, voice, rate=rate, boundary="WordBoundary")
                async for c in comm.stream():
                    if c["type"] == "audio":
                        audio += c["data"]
                    elif c["type"] == "WordBoundary":
                        words.append({"o": c["offset"] / 1e7, "d": c["duration"] / 1e7, "w": c["text"]})
                if not audio:
                    raise RuntimeError("no audio")
                mp3.write_bytes(audio)
                meta.write_text(json.dumps(words, ensure_ascii=False))
                print(f"  tts ok: {text[:24]}", file=sys.stderr)
                return
            except Exception as e:
                if attempt == 4:
                    raise
                print(f"  tts retry {attempt + 1} ({e!r}): {text[:24]}", file=sys.stderr)
                await asyncio.sleep(2 ** attempt)


def poe_tts(model, text, mp3, meta):
    req = urllib.request.Request("https://api.poe.com/v1/chat/completions", headers={
        "Authorization": f"Bearer {os.environ['POE_API_KEY']}", "Content-Type": "application/json"},
        data=json.dumps({"model": model, "messages": [{"role": "user", "content": text}]}).encode())
    url = json.load(urllib.request.urlopen(req, timeout=300))["choices"][0]["message"]["content"].strip()
    if not url.startswith("http"):
        raise RuntimeError(f"no audio url: {url[:200]}")
    mp3.write_bytes(urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "curl/8"}), timeout=300).read())  # CDN 403s urllib UA
    meta.write_text(json.dumps(est_words(text, decode(mp3)), ensure_ascii=False))


def est_words(text, pcm):
    """No word boundaries from Poe: spread zh clauses / English runs over voiced time in proportion to length."""
    runs = [m for m in re.finditer(r"[-'’]?[A-Za-z]+(?:[ '’-]+[A-Za-z]+)*['’]?|[^\sA-Za-z，、；：。！？,;:!?”’」』）》〉)\"']+", text)]
    wts = [len(m.group()) * (.35 if m.group()[-1].isascii() else 1) for m in runs]
    a, f = array("h", pcm), SR // 100  # 10ms frames
    voiced = [max(abs(x) for x in a[i:i + f]) > SILENT * 4 for i in range(0, len(a) - f + 1, f)]
    vt = [i * .01 for i, v in enumerate(voiced) if v] or [0.0]  # voiced frame times
    words, acc, tot = [], 0.0, sum(wts) or 1
    for m, w in zip(runs, wts):
        i0, i1 = round(acc / tot * (len(vt) - 1)), round((acc + w) / tot * (len(vt) - 1))
        words.append({"o": vt[i0], "d": max(.05, vt[i1] - vt[i0]), "w": m.group()})
        acc += w
    return words


def decode(mp3):
    return subprocess.run(["ffmpeg", "-v", "error", "-i", str(mp3), "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"],
                          check=True, capture_output=True).stdout


def trim(pcm):
    """Cut leading/trailing silence (keep 10ms); returns (pcm, seconds cut at start)."""
    a = array("h", pcm)
    loud = [i for i, x in enumerate(a) if abs(x) > SILENT]
    if not loud:
        return b"", 0.0
    i, j = max(0, loud[0] - 240), min(len(a), loud[-1] + 241)
    return pcm[2 * i:2 * j], i / SR


def char_times(text, words, t0):
    ct = [None] * len(text)
    spans, cur = [], 0  # (start, end, word)
    for w in words:
        i = text.find(w["w"], cur)
        if i < 0:
            continue
        spans.append((i, i + len(w["w"]), w))
        cur = i + len(w["w"])
        n = len(w["w"])
        for k in range(n):
            ct[i + k] = t0 + w["o"] + w["d"] * k / n
    for j in range(len(text)):
        if ct[j] is None:
            prev = [s for s in spans if s[1] <= j]
            nxt = [s for s in spans if s[0] > j]
            if prev:
                ct[j] = t0 + prev[-1][2]["o"] + prev[-1][2]["d"]
            elif nxt:
                ct[j] = t0 + nxt[0][2]["o"]
            else:
                ct[j] = t0
    return [r3(x) for x in ct]


def clauses(text):
    """Split into (start, end) where end includes trailing separators/closing quotes."""
    out, s, i = [], 0, 0
    while i < len(text):
        if text[i] in SEPS:
            while i + 1 < len(text) and (text[i + 1] in SEPS or text[i + 1] in CLOSERS):
                i += 1
            out.append((s, i + 1))
            s = i + 1
        i += 1
    if s < len(text):
        out.append((s, len(text)))
    return out


def strip_end(text, s, e):
    while e > s and text[e - 1] in SEPS:
        e -= 1
    return e


def chunk(text, ct, warn_ctx, wid=len):
    cls = clauses(text)
    for s, e in cls:
        if wid(text[s:strip_end(text, s, e)]) > WARN_CLAUSE:
            print(f"WARN [{warn_ctx}] clause > {WARN_CLAUSE} chars, subtitle may overflow; rewrite: {text[s:e]}", file=sys.stderr)
    groups, gs, ge = [], None, None
    for s, e in cls:
        if gs is not None and wid(text[gs:strip_end(text, gs, e)]) <= MAX_CHUNK:
            ge = e
        else:
            if gs is not None:
                groups.append((gs, ge))
            gs, ge = s, e
    if gs is not None:
        groups.append((gs, ge))
    res = []
    for s, e in groups:
        e = strip_end(text, s, e)
        if e > s:
            res.append({"text": text[s:e], "ch": ct[s:e]})
    return res


def wid(s):
    """Subtitle width: Latin letters/spaces count half."""
    return sum(.5 if c == " " or c.isascii() and c.isalpha() else 1 for c in s)


def main():
    proj = Path(sys.argv[1]).resolve()
    sc = json.loads((proj / "script.json").read_text())
    voice, rate = sc.get("voice", "zh-CN-YunjianNeural"), sc.get("rate", "-5%")
    voice_en = sc.get("voice_en")
    eleven = sc.get("tts", "elevenlabs-v3").startswith("elevenlabs")
    if eleven:  # one multilingual voice: whole sentence per clip
        voice, rate, voice_en = sc.get("tts", "elevenlabs-v3"), "", None
        for d in [proj, *proj.parents]:
            if (d / ".env").exists():
                for line in (d / ".env").read_text().splitlines():
                    k, _, v = line.partition("=")
                    if _ and not line.lstrip().startswith("#"):
                        os.environ.setdefault(k.strip(), v.strip().strip("'\""))
        if not os.environ.get("POE_API_KEY"):
            sys.exit("tts: set POE_API_KEY (env or .env)")
    rate_en = sc.get("rate_en", rate)
    build = proj / "build"
    tts = build / "tts"
    tts.mkdir(parents=True, exist_ok=True)

    def paths(text, v=voice, r=rate):
        h = hashlib.sha1(f"{v}|{r}|{text}".encode()).hexdigest()[:16]
        return tts / f"{h}.mp3", tts / f"{h}.json"

    def pieces(st):
        """Spoken clips [(text, voice, rate, start, end)]: the whole sentence, or its zh/en runs when voice_en."""
        if not voice_en:
            return [(st, voice, rate, 0, len(st))]
        cuts = [0, *(x for m in EN.finditer(st) for x in m.span()), len(st)]  # zh, en, zh, en, …, zh
        return [(st[a:b].strip(), *((voice_en, rate_en) if k % 2 else (voice, rate)), a, b)
                for k, (a, b) in enumerate(zip(cuts, cuts[1:]))
                if re.search(r"\w", st[a:b])]  # punctuation/space-only runs are pauses, not clips

    def mix(st):
        """Bilingual sentence: trimmed run clips joined with pauses -> (pcm, words with sentence-relative offsets)."""
        pcm, words, last = bytearray(round(EDGE[0] * SR) * 2), [], None
        for say, v, r, a, b in pieces(st):
            w0 = a + re.search(r"\w", st[a:b]).start()
            if last is not None:
                pcm += bytes(round(max([SWITCH] + [PAUSE.get(c, 0) for c in st[last:w0]]) * SR) * 2)
            last = a + re.search(r"\w\W*$", st[a:b]).start() + 1
            mp3, meta = paths(say, v, r)
            data, cut = trim(decode(mp3))
            t, ws = len(pcm) / 2 / SR, json.loads(meta.read_text())
            for w, nx in zip(ws, ws[1:] + [None]):  # clamp each word into [audible start, next word / clip end]
                o, e = max(cut, w["o"]), min(w["o"] + w["d"], nx["o"] if nx else cut + len(data) / 2 / SR)
                words.append(dict(w, o=t + o - cut, d=max(0.0, e - o)))
            pcm += data
        return bytes(pcm) + bytes(round(EDGE[1] * SR) * 2), words

    todo = {}
    for sec in sc["secs"]:
        for st in sec["sents"]:
            if isinstance(st, str):
                for t, v, r, _, _ in pieces(st):
                    mp3, meta = paths(t, v, r)
                    if not (mp3.exists() and meta.exists()):
                        todo[(t, v, r)] = (mp3, meta)

    async def run_all():
        sem = asyncio.Semaphore(4)
        await asyncio.gather(*(synth(t, v, r, m, j, sem) for (t, v, r), (m, j) in todo.items()))

    if todo:
        print(f"synthesizing {len(todo)} clip(s)...", file=sys.stderr)
        asyncio.run(run_all())

    pcm, secs, t = bytearray(), [], 0.0

    def place(at, data):
        off = round(at * SR) * 2
        if len(pcm) < off:
            pcm.extend(bytes(off - len(pcm)))
        pcm[off:off + len(data)] = data

    for si, sec in enumerate(sc["secs"]):
        card = 0.0 if si == 0 else t
        start = r3(LEAD if si == 0 else card + CARD)
        sents, t1 = [], None
        for st in sec["sents"]:
            if not isinstance(st, str):  # number = N seconds of silence (think / repeat-after-me pause)
                data, words, st = bytes(round(st * SR) * 2), [], ""
            elif voice_en:
                data, words = mix(st)
            else:
                mp3, meta = paths(st)
                data, words = decode(mp3), json.loads(meta.read_text())
                if eleven:  # normalize clip padding to edge-tts-like EDGE so GAP spacing matches
                    data, cut = trim(data)
                    words = [dict(w, o=w["o"] - cut + EDGE[0]) for w in words]
                    data = bytes(round(EDGE[0] * SR) * 2) + data + bytes(round(EDGE[1] * SR) * 2)
            t0 = start if t1 is None else r3(t1 + GAP)
            t1 = r3(t0 + len(data) / 2 / SR)
            place(t0, data)
            ct = char_times(st, words, t0)
            sents.append({"t0": t0, "t1": t1, "text": st,
                          "chunks": chunk(st, ct, sec["key"], wid if voice_en or eleven else len), "ct": ct})
        end = r3((t1 if t1 is not None else start) + (LAST_TAIL if si == len(sc["secs"]) - 1 else TAIL))
        secs.append({"key": sec["key"], "title": sec.get("title", ""), "sub": sec.get("sub", ""),
                     "sents": sents, "card": r3(card), "start": start, "end": end})
        t = end
    total = t
    n = round(total * SR) * 2
    pcm = pcm[:n] + bytes(max(0, n - len(pcm)))

    out = build / "narration.mp3"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "s16le", "-ar", str(SR), "-ac", "1", "-i", "-",
                    "-c:a", "libmp3lame", "-b:a", "48k", str(out)], input=bytes(pcm), check=True)
    (build / "timeline.json").write_text(json.dumps({"total": total, "secs": secs}, ensure_ascii=False))

    print(f"{'section':<10}{'card':>9}{'start':>9}{'end':>9}{'sents':>7}")
    for s in secs:
        print(f"{s['key']:<10}{s['card']:>9.3f}{s['start']:>9.3f}{s['end']:>9.3f}{len(s['sents']):>7}")
    print(f"total {int(total // 60):02d}:{total % 60:06.3f} ({total:.3f}s) -> {out}")


if __name__ == "__main__":
    main()

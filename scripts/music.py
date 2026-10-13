# /// script
# requires-python = ">=3.10"
# dependencies = ["numpy"]
# ///
"""Deterministic background music, length = timeline total.

mood "calm":  pentatonic ambient bed (pad + sparse plucks + card gongs + reverb).
mood "happy": bright 112 BPM loop (I-V-vi-IV pad, bass, marimba arpeggio, shaker, glockenspiel).
Mood comes from script.json "music"; default happy for theme notebook, else calm.
Melodic/rhythmic layers (marimba, shaker, bells, plucks) drop to MEL_UNDER_SPEECH while narration speaks:
changing-state sound under speech hurts verbal working memory; pad + bass carry on, full music returns in pauses/cards.

Usage: uv run music.py <proj> [--seed N]   -> <proj>/build/music.mp3
"""
import argparse, json, subprocess
from pathlib import Path

import numpy as np

SR = 44100
ROOT = 146.83  # D3 as 宫
PENTA = [0, 2, 4, 7, 9]  # 宫商角徵羽
CHORDS = [[0, 7, 12], [9, 16, 21], [4, 9, 16], [7, 14, 19], [2, 9, 14]]  # semitones above ROOT
SEG = 20.0
TARGET_RMS_DB, PEAK_DB = -25.5, -3.0  # -6dB vs original: user found music too loud under narration
MEL_UNDER_SPEECH = 0.1  # melody gain while narration speaks (-20 dB)


def hz(semi, base=ROOT):
    return base * 2 ** (semi / 12)


def penta_note(i):
    return PENTA[i % 5] + 12 * (i // 5)


def add(buf, start, sig):
    a = max(0, start)
    b = min(len(buf), start + len(sig))
    if b > a:
        buf[a:b] += sig[a - start:b - start]


def pad(n, rng):
    out = np.zeros(n)
    L = int(SEG * SR)
    for k in range(n // L + 2):
        s = (k - 1) * L
        t = np.arange(2 * L) / SR
        win = np.sin(np.pi * np.arange(2 * L) / (2 * L)) ** 2  # Hann, hop L -> sums to 1
        seg = np.zeros(2 * L)
        for semi in CHORDS[k % len(CHORDS)]:
            f = hz(semi - 12)
            lfo = 0.7 + 0.3 * np.sin(2 * np.pi * t / rng.uniform(7, 13) + rng.uniform(0, 6.3))
            for det in (0.9985, 1.0015):
                for p, a in ((1, 1.0), (2, 0.3), (3, 0.1)):
                    seg += a * lfo * np.sin(2 * np.pi * f * det * p * t + rng.uniform(0, 6.3))
        add(out, s, seg * win * 0.05)
    t = np.arange(n) / SR  # soft root+fifth drone
    out += 0.035 * (np.sin(2 * np.pi * hz(-12) * t) + 0.5 * np.sin(2 * np.pi * hz(-5) * t)) * (0.8 + 0.2 * np.sin(2 * np.pi * t / 17))
    return out


def pluck(f, amp, dur=5.0):
    t = np.arange(int(dur * SR)) / SR
    sig = np.zeros_like(t)
    for k in range(1, 8):
        fk = k * f * np.sqrt(1 + 0.0002 * k * k)
        if fk > 8000:
            break
        sig += k ** -1.3 * np.exp(-(0.6 + 0.9 * k) * t) * np.sin(2 * np.pi * fk * t)
    att = np.minimum(1, t / 0.006)
    return amp * sig * att * np.minimum(1, (dur - t) / 0.5)


def gong(amp):
    t = np.arange(int(9 * SR)) / SR
    env = (1 - np.exp(-t / 0.35)) * np.exp(-t / 2.8)
    sig = sum(a * np.sin(2 * np.pi * hz(-12) * r * t) for r, a in ((1, 1), (1.48, 0.5), (1.97, 0.35), (2.53, 0.2), (3.1, 0.1)))
    return amp * env * sig * np.minimum(1, (9 - t) / 1.0)


BPM = 112
PROG = [[0, 4, 7], [7, 11, 14], [9, 12, 16], [5, 9, 12]]  # I V vi IV (semitones above ROOT)
ARP = [0, 1, 2, 3, 2, 1, 2, 1]  # 8th-note pattern over chord tones + octave


def mallet(f, amp, dur=0.8):  # marimba-ish: fundamental + quickly-dying 4th harmonic
    t = np.arange(int(dur * SR)) / SR
    sig = np.exp(-t / 0.25) * np.sin(2 * np.pi * f * t) + 0.3 * np.exp(-t / 0.04) * np.sin(2 * np.pi * 4 * f * t)
    return amp * sig * np.minimum(1, t / 0.003) * np.minimum(1, (dur - t) / 0.05)


def bell(f, amp, dur=2.5):  # glockenspiel: inharmonic partials
    t = np.arange(int(dur * SR)) / SR
    sig = sum(a * np.exp(-t / d) * np.sin(2 * np.pi * f * r * t) for r, a, d in ((1, 1, 0.9), (2.76, 0.35, 0.3), (5.4, 0.15, 0.12)))
    return amp * sig * np.minimum(1, t / 0.002) * np.minimum(1, (dur - t) / 0.3)


def chord_pad(semis, dur):
    t = np.arange(int(dur * SR)) / SR
    env = np.sin(np.pi * t / dur) ** 0.6
    return sum(np.sin(2 * np.pi * hz(s) * t) + 0.2 * np.sin(4 * np.pi * hz(s) * t) for s in semis) * env


def shaker(amp, rng):
    t = np.arange(int(0.07 * SR)) / SR
    return amp * np.diff(rng.standard_normal(len(t) + 1)) * np.exp(-t / 0.018)


def happy(put, mel, total, cards, rng):
    beat = 60 / BPM
    bar = 4 * beat
    for b in range(int(total / bar) + 1):
        t0 = b * bar
        tri = PROG[(b // 2) % len(PROG)]  # one chord per 2 bars
        put(0.012 * chord_pad(tri, bar * 1.05), t0, 0.5)
        for k in (0, 2):
            put(pluck(hz(tri[0] - 12), 0.05, 0.6), t0 + k * beat, 0.5)
        tones = tri + [tri[0] + 12]
        for j, a in enumerate(ARP):
            if rng.random() > 0.15:
                mel(mallet(hz(tones[a] + 12), 0.05 if j % 2 else 0.065), t0 + j * beat / 2, 0.35 + 0.3 * (j % 2))
        for j in range(8):
            mel(shaker(0.02 if j % 2 else 0.01, rng), t0 + j * beat / 2, 0.65)

    for c in cards:  # rising glockenspiel run at each section card
        i = int(rng.integers(5, 8))
        for j in range(5):
            mel(bell(hz(penta_note(i) + 12), 0.07), c + 0.4 + beat / 2 * j, rng.uniform(0.3, 0.7))
            i += 1

    t, i = 4 * bar, 8
    while t < total - 6:  # short bell motifs on the beat, skipping card windows
        if not any(c - 1 <= t < c + 4 for c in cards):
            for j in range(int(rng.integers(2, 4))):
                mel(bell(hz(penta_note(i) + 12), rng.uniform(0.03, 0.045)), t + j * beat, rng.uniform(0.3, 0.7))
                i = int(np.clip(i + rng.choice([-1, 1, 2]), 5, 12))
        t += bar * int(rng.integers(2, 5))


def reverb(x, rng, wet=0.3):
    n_ir = int(3 * SR)
    t = np.arange(n_ir) / SR
    ir = rng.standard_normal(n_ir) * np.exp(-t / 0.55) * (t > 0.02)
    ir /= np.sqrt(np.sum(ir ** 2))
    m = 1 << int(np.ceil(np.log2(len(x) + n_ir)))
    y = np.fft.irfft(np.fft.rfft(x, m) * np.fft.rfft(ir, m), m)[:len(x)]
    return (1 - wet) * x + wet * y


def speech_mask(tl, n):
    """1 in pauses, MEL_UNDER_SPEECH while narration speaks; gaps < 1.5 s stay down, 0.4 s ramps."""
    iv = []
    for a, b in sorted((x["t0"] - 0.3, x["t1"] + 0.3) for s in tl["secs"] for x in s["sents"] if x["text"].strip()):
        if iv and a - iv[-1][1] < 1.5:
            iv[-1][1] = max(iv[-1][1], b)
        else:
            iv.append([a, b])
    m = np.ones(n)
    for a, b in iv:
        m[max(0, int(a * SR)):int(b * SR)] = MEL_UNDER_SPEECH
    k = int(0.4 * SR)  # moving-average ramp
    c = np.concatenate([[0], np.cumsum(np.pad(m, (k // 2, k - k // 2), mode="edge"))])
    return (c[k:] - c[:-k])[:n] / k


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("proj")
    ap.add_argument("--seed", type=int, default=7)
    a = ap.parse_args()
    proj = Path(a.proj).resolve()
    tl = json.loads((proj / "build/timeline.json").read_text())
    total = tl["total"]
    cards = [s["card"] for s in tl["secs"]]
    cfg = json.loads((proj / "script.json").read_text())
    mood = cfg.get("music") or ("happy" if cfg.get("theme") == "notebook" else "calm")
    rng = np.random.default_rng(a.seed)
    n = round(total * SR)

    L, R, ML, MR = np.zeros(n), np.zeros(n), np.zeros(n), np.zeros(n)

    def put(sig, at, pan, l=L, r=R):
        s = int(at * SR)
        add(l, s, sig * np.sqrt(1 - pan))
        add(r, s, sig * np.sqrt(pan))

    def mel(sig, at, pan):
        put(sig, at, pan, ML, MR)

    if mood == "happy":
        happy(put, mel, total, cards, rng)
    else:
        p = pad(n, rng)
        L += p
        R += np.roll(p, int(0.012 * SR))

        for c in cards:  # gong + short arpeggio at each section card
            put(gong(0.22), c, 0.5)
            i = int(rng.integers(5, 10))
            for j in range(int(rng.integers(3, 6))):
                put(pluck(hz(penta_note(i)), 0.12), c + 0.6 + 0.38 * j, rng.uniform(0.3, 0.7))
                i += int(rng.choice([1, 2]))

        t, i = 2.0, 7
        while t < total - 6:  # sparse melody, skipping card windows
            if not any(c - 1 <= t < c + 4 for c in cards):
                mel(pluck(hz(penta_note(i)), rng.uniform(0.07, 0.11)), t, rng.uniform(0.25, 0.75))
            i = int(np.clip(i + rng.choice([-2, -1, 1, 2]), 4, 13))
            t += rng.uniform(1.4, 3.6) + (rng.uniform(3, 7) if rng.random() < 0.15 else 0)

    wet = 0.18 if mood == "happy" else 0.3  # drier keeps the rhythm crisp
    bed = np.stack([reverb(L, rng, wet), reverb(R, rng, wet)], 1)
    mx = np.stack([reverb(ML, rng, wet), reverb(MR, rng, wet)], 1)
    tt = np.arange(n) / SR
    fade = (np.clip(tt / 3, 0, 1) * np.clip((total - tt) / 5, 0, 1))[:, None]
    x = (bed + mx) * fade
    # level is set on the full mix, so pauses sound exactly as loud as before; only speech spans get quieter
    rms = np.sqrt(np.mean(x ** 2))
    g = min(10 ** (TARGET_RMS_DB / 20) / rms, 10 ** (PEAK_DB / 20) / np.max(np.abs(x)))
    x = ((bed + mx * speech_mask(tl, n)[:, None]) * fade * g).astype(np.float32)

    out = proj / "build/music.mp3"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-",
                    "-c:a", "libmp3lame", "-b:a", "96k", str(out)], input=x.tobytes(), check=True)
    dec = subprocess.run(["ffmpeg", "-v", "error", "-i", str(out), "-f", "s16le", "-"], capture_output=True, check=True).stdout
    dur = len(dec) / 4 / SR
    print(f"music[{mood}]: {dur:.3f}s (total {total:.3f}, diff {abs(dur - total) * 1000:.1f}ms) "
          f"peak {20 * np.log10(np.max(np.abs(x))):.1f} dBFS rms {20 * np.log10(np.sqrt(np.mean(x ** 2))):.1f} dBFS -> {out}")
    if abs(dur - total) > 0.05:
        raise SystemExit("duration mismatch")


if __name__ == "__main__":
    main()

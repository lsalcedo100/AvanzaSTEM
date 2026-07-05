"use client"

import { useCallback, useEffect, useState } from "react"

// Gentle, synthesized sound effects for the Density game.
//
// Sounds are generated with the Web Audio API instead of shipping audio files:
// they're tiny, always short, and stay soft by design. Everything is gated on a
// mute preference (persisted to localStorage) and only ever fires from a user
// gesture, so nothing loud can autoplay.

export type SoundName =
  | "pour"
  | "splash"
  | "correct"
  | "incorrect"
  | "levelComplete"
  | "badge"
  | "unlock"

const STORAGE_KEY = "avanza-density-sound-muted-v1"

// Module-level mute flag so the play helpers can read it without a hook.
let muted = false

let audioCtx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null
  try {
    if (!audioCtx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext
      if (!Ctor) return null
      audioCtx = new Ctor()
    }
    // Browsers start the context suspended until a user gesture resumes it.
    if (audioCtx.state === "suspended") void audioCtx.resume()
    return audioCtx
  } catch {
    return null
  }
}

/** A single soft note with a quick attack and gentle exponential release. */
function note(
  ctx: AudioContext,
  freq: number,
  start: number,
  duration: number,
  peak = 0.14,
  type: OscillatorType = "sine",
) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(peak, start + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(start)
  osc.stop(start + duration + 0.02)
}

/** A short filtered-noise burst — used for pour/splash water textures. */
function noiseBurst(ctx: AudioContext, start: number, duration: number, cutoff: number, peak = 0.08) {
  const frames = Math.floor(ctx.sampleRate * duration)
  const buffer = ctx.createBuffer(1, frames, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  // Deterministic-ish pseudo noise (no reliance on Math.random timing).
  for (let i = 0; i < frames; i++) {
    data[i] = (Math.sin(i * 12.9898) * 43758.5453) % 1
  }
  const src = ctx.createBufferSource()
  src.buffer = buffer
  const filter = ctx.createBiquadFilter()
  filter.type = "lowpass"
  filter.frequency.setValueAtTime(cutoff, start)
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(peak, start)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  src.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  src.start(start)
  src.stop(start + duration + 0.02)
}

export function playSound(name: SoundName) {
  if (muted) return
  const ctx = getCtx()
  if (!ctx) return
  const t = ctx.currentTime
  switch (name) {
    case "pour":
      // A soft descending water gurgle.
      noiseBurst(ctx, t, 0.28, 900, 0.05)
      note(ctx, 320, t, 0.22, 0.05, "sine")
      break
    case "splash":
      noiseBurst(ctx, t, 0.22, 1600, 0.07)
      note(ctx, 520, t, 0.12, 0.05, "sine")
      break
    case "correct":
      // Rising two-note chime.
      note(ctx, 659, t, 0.14, 0.12, "triangle")
      note(ctx, 988, t + 0.11, 0.2, 0.12, "triangle")
      break
    case "incorrect":
      // Soft, low, non-harsh "hmm" — never a buzzer.
      note(ctx, 300, t, 0.16, 0.1, "sine")
      note(ctx, 240, t + 0.13, 0.22, 0.1, "sine")
      break
    case "levelComplete":
      // Gentle three-note arpeggio.
      note(ctx, 523, t, 0.16, 0.12, "triangle")
      note(ctx, 659, t + 0.13, 0.16, 0.12, "triangle")
      note(ctx, 784, t + 0.26, 0.3, 0.13, "triangle")
      break
    case "badge":
      // Sparkly triad.
      note(ctx, 784, t, 0.14, 0.11, "triangle")
      note(ctx, 1047, t + 0.09, 0.14, 0.1, "triangle")
      note(ctx, 1319, t + 0.18, 0.26, 0.1, "triangle")
      break
    case "unlock":
      note(ctx, 587, t, 0.14, 0.11, "sine")
      note(ctx, 880, t + 0.12, 0.24, 0.11, "sine")
      break
  }
}

function loadMuted(): boolean {
  if (typeof window === "undefined") return false
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1"
  } catch {
    return false
  }
}

/** Shared sound controller. Instantiate once and pass down, like progress. */
export function useDensitySound() {
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const m = loadMuted()
    muted = m
    setIsMuted(m)
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev
      muted = next
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0")
      } catch {
        // Preference just won't persist if storage is blocked.
      }
      return next
    })
  }, [])

  const play = useCallback((name: SoundName) => playSound(name), [])

  return { muted: isMuted, toggleMute, play }
}

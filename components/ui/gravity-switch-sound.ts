"use client"

import { useCallback, useEffect, useState } from "react"

import { reportDebug } from "./gravity-switch-debug.ts"

/**
 * Gravity Switch: Zero-G Lab — sound.
 *
 * Three tiny synthesized cues, mirroring the Density lab's approach: no audio
 * files, always short, never loud. The switch clicks (up for on, down for
 * off), a win plays a soft three-note chime, a miss a gentle low "hmm". All
 * of it is gated on a persisted mute preference, and the audio context is
 * only ever created from a user gesture (the switch), so nothing autoplays.
 */

export type LabSound = "switchOn" | "switchOff" | "success" | "fail"

const STORAGE_KEY = "avanza-gravity-switch-sound-muted-v1"

/** Impacts closer together than this share one sound, so a pile-up never rattles. */
export const IMPACT_MIN_GAP_MS = 90
/** Impact speed, m/s, at and above which the thud is at full (still soft) volume. */
export const IMPACT_FULL_SPEED = 8

let muted = false
let audioCtx: AudioContext | null = null
let lastImpactAt = 0

/**
 * The shared context, created only by `unlockAudio()` from a user gesture.
 * Anything that wants to play before then simply stays silent, which is what
 * browsers would enforce anyway.
 */
function getCtx(): AudioContext | null {
  return audioCtx && audioCtx.state !== "closed" ? audioCtx : null
}

/** Call from a user gesture (pointer or key) so sound is allowed afterwards. */
export function unlockAudio(): void {
  if (typeof window === "undefined" || muted) return
  try {
    if (!audioCtx || audioCtx.state === "closed") {
      const Ctor =
        window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Ctor) return
      audioCtx = new Ctor()
      const created = audioCtx
      created.onstatechange = () => reportDebug({ audio: created.state })
    }
    if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {})
    reportDebug({ audio: audioCtx.state })
  } catch {
    audioCtx = null
  }
}

/** Release the context, for when the lab leaves the page. */
export function closeAudio(): void {
  const ctx = audioCtx
  audioCtx = null
  if (ctx && ctx.state !== "closed") ctx.close().catch(() => {})
}

/**
 * Whether an impact at `now` (ms) should make a sound, given the last one.
 * Pure, so the rate limit is testable.
 */
export function impactAllowed(now: number, last: number): boolean {
  return now - last >= IMPACT_MIN_GAP_MS
}

/** Impact volume, 0..1, from speed in m/s: quiet taps, never a bang. */
export function impactGain(speed: number): number {
  return Math.min(1, Math.max(0, speed / IMPACT_FULL_SPEED)) * 0.06
}

function note(ctx: AudioContext, freq: number, start: number, duration: number, peak = 0.12, type: OscillatorType = "sine") {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(peak, start + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(start)
  osc.stop(start + duration + 0.02)
}

/** A short click with a pitch slide: up when the switch goes on, down when it goes off. */
function click(ctx: AudioContext, start: number, from: number, to: number) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = "triangle"
  osc.frequency.setValueAtTime(from, start)
  osc.frequency.exponentialRampToValueAtTime(to, start + 0.07)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(0.14, start + 0.008)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.09)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(start)
  osc.stop(start + 0.11)
}

/** A soft, filtered thud for an object hitting something; louder for faster hits, never loud. */
export function playImpact(speed: number, now = typeof performance !== "undefined" ? performance.now() : 0): void {
  if (muted) return
  const ctx = getCtx()
  if (!ctx || ctx.state !== "running") return
  if (!impactAllowed(now, lastImpactAt)) return
  lastImpactAt = now
  const gain = impactGain(speed)
  if (gain <= 0) return
  const t = ctx.currentTime
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = "sine"
  osc.frequency.setValueAtTime(160 + Math.min(speed, 12) * 10, t)
  osc.frequency.exponentialRampToValueAtTime(70, t + 0.08)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(gain, t + 0.006)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09)
  osc.connect(g)
  g.connect(ctx.destination)
  osc.start(t)
  osc.stop(t + 0.1)
}

export function playLabSound(name: LabSound): void {
  if (muted) return
  const ctx = getCtx()
  if (!ctx || ctx.state !== "running") return
  const t = ctx.currentTime
  switch (name) {
    case "switchOn":
      click(ctx, t, 420, 720)
      break
    case "switchOff":
      click(ctx, t, 720, 380)
      break
    case "success":
      note(ctx, 523, t, 0.16, 0.11, "triangle")
      note(ctx, 659, t + 0.13, 0.16, 0.11, "triangle")
      note(ctx, 784, t + 0.26, 0.3, 0.12, "triangle")
      break
    case "fail":
      note(ctx, 300, t, 0.16, 0.09, "sine")
      note(ctx, 240, t + 0.13, 0.22, 0.09, "sine")
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

/** The lab's sound controller: one per lab, passed down. */
export function useLabSound() {
  const [isMuted, setIsMuted] = useState(false)

  // The stored preference is read after mount (server and client markup agree)
  // and applied from a frame callback rather than synchronously in the effect.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const stored = loadMuted()
      muted = stored
      setIsMuted(stored)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  // The lab leaving the page releases the audio context.
  useEffect(() => () => closeAudio(), [])

  const toggleMute = useCallback(() => {
    setIsMuted((previous) => {
      const next = !previous
      muted = next
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0")
      } catch {
        // The preference just does not persist if storage is blocked.
      }
      return next
    })
    // Unmuting is a gesture, so the context may be created now.
    unlockAudio()
  }, [])

  const play = useCallback((name: LabSound) => playLabSound(name), [])
  const impact = useCallback((speed: number) => playImpact(speed), [])

  return { muted: isMuted, toggleMute, play, impact }
}

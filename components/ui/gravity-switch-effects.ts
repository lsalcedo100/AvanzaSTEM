/**
 * Gravity Switch: Zero-G Lab — transient visual effects.
 *
 * Impact ripples where things hit, and a burst of confetti when a mission is
 * won. Pure bookkeeping with a time-based update, so lifetimes are tested
 * without a canvas; the renderer only draws whatever is alive. Everything
 * here is cosmetic and never feeds back into the physics.
 */

import type { Vec2 } from "./gravity-switch-types.ts"

export type Ripple = {
  x: number
  y: number
  bornMs: number
  color: string
  /** How big the ring grows, in room px; bigger for harder hits. */
  maxRadius: number
}

export type Confetto = {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  bornMs: number
  /** Width and height of the little rectangle, room px. */
  size: number
  spin: number
  angle: number
}

export const RIPPLE_LIFE_MS = 380
export const CONFETTI_LIFE_MS = 1500
/** Confetti only: a purely decorative pull, room px per s². */
const CONFETTI_GRAVITY = 420
export const MAX_RIPPLES = 24
export const CONFETTI_COUNT = 56
export const CONFETTI_COLORS = ["#2ecc71", "#1abc9c", "#8b5cf6", "#f97316", "#fbbf24", "#f8fafc"]

export class EffectsStore {
  private ripples: Ripple[] = []
  private confetti: Confetto[] = []

  /** A hit at `point`; `strength` is the impact speed in m/s and sets the ring size. */
  addRipple(point: Vec2, strength: number, color: string, nowMs: number): void {
    const maxRadius = Math.min(48, 14 + strength * 4)
    this.ripples.push({ x: point.x, y: point.y, bornMs: nowMs, color, maxRadius })
    if (this.ripples.length > MAX_RIPPLES) this.ripples.splice(0, this.ripples.length - MAX_RIPPLES)
  }

  /** A celebration bursting out of `origin`, deterministic for a given `random`. */
  celebrate(origin: Vec2, nowMs: number, random: () => number = Math.random): void {
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      const angle = -Math.PI / 2 + (random() - 0.5) * Math.PI * 0.9
      const speed = 260 + random() * 320
      this.confetti.push({
        x: origin.x,
        y: origin.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        bornMs: nowMs,
        size: 5 + random() * 5,
        spin: (random() - 0.5) * 12,
        angle: random() * Math.PI,
      })
    }
  }

  /** Advance the confetti and drop everything that has finished. */
  update(nowMs: number, dtMs: number): void {
    const dt = dtMs / 1000
    this.ripples = this.ripples.filter((ripple) => nowMs - ripple.bornMs < RIPPLE_LIFE_MS)
    this.confetti = this.confetti.filter((confetto) => nowMs - confetto.bornMs < CONFETTI_LIFE_MS)
    for (const confetto of this.confetti) {
      confetto.vy += CONFETTI_GRAVITY * dt
      confetto.vx *= 1 - 0.9 * dt
      confetto.x += confetto.vx * dt
      confetto.y += confetto.vy * dt
      confetto.angle += confetto.spin * dt
    }
  }

  get isEmpty(): boolean {
    return this.ripples.length === 0 && this.confetti.length === 0
  }

  liveRipples(): readonly Ripple[] {
    return this.ripples
  }

  liveConfetti(): readonly Confetto[] {
    return this.confetti
  }

  clear(): void {
    this.ripples = []
    this.confetti = []
  }
}

/** 0..1 progress of a ripple's life. */
export function rippleProgress(ripple: Ripple, nowMs: number): number {
  return Math.min(1, Math.max(0, (nowMs - ripple.bornMs) / RIPPLE_LIFE_MS))
}

/** 0..1 progress of a confetto's life. */
export function confettoProgress(confetto: Confetto, nowMs: number): number {
  return Math.min(1, Math.max(0, (nowMs - confetto.bornMs) / CONFETTI_LIFE_MS))
}

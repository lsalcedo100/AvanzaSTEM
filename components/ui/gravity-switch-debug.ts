/**
 * Development-only counters the browser checks read to prove there is exactly
 * one physics world and one render loop alive. A no-op in production builds.
 */

export type GravitySwitchDebug = {
  worlds: number
  loops: number
  /** Frames painted so far; stops advancing while the room is scrolled out of view. */
  frames: number
  /** The lab's AudioContext state, or "none" before the first gesture / after cleanup. */
  audio: string
}

type DebugWindow = Window & { __gravitySwitchDebug?: GravitySwitchDebug }

export function reportDebug(patch: Partial<GravitySwitchDebug>): void {
  if (process.env.NODE_ENV === "production" || typeof window === "undefined") return
  const target = window as DebugWindow
  target.__gravitySwitchDebug = { worlds: 0, loops: 0, frames: 0, audio: "none", ...target.__gravitySwitchDebug, ...patch }
}

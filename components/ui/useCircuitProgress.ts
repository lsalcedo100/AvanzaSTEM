"use client"

import { useCallback, useEffect, useState } from "react"

// v2 bumps the record shape: per-level star count (0–3) plus best parts/time.
const STORAGE_KEY = "avanza-circuit-game-progress-v2"
const LEGACY_KEY = "avanza-circuit-game-progress-v1"

/** What we remember about a single level. Bests are only ever raised, never
 *  lowered — replaying and doing worse can't take away what you already earned. */
export type LevelRecord = {
  solved: boolean
  /** Best stars earned, 0–3. */
  stars: number
  /** Fewest parts used on a winning solve (null until first solve). */
  bestParts: number | null
  /** Fastest solve time in ms (null until first solve). */
  bestTimeMs: number | null
}

export type CircuitProgress = {
  /** Highest level number the player is allowed to open (>= 1). */
  unlockedUpTo: number
  levels: Record<number, LevelRecord>
}

/** How a freshly-finished level scored, passed up from the play screen. */
export type SolveResult = {
  stars: number
  parts: number
  timeMs: number
}

const EMPTY: CircuitProgress = { unlockedUpTo: 1, levels: {} }

function normalizeRecord(raw: Partial<LevelRecord> & { star?: boolean }): LevelRecord {
  return {
    solved: raw.solved ?? false,
    // Migrate the old boolean `star` flag: a met target → 3 stars, else 2.
    stars: raw.stars ?? (raw.star ? 3 : raw.solved ? 2 : 0),
    bestParts: raw.bestParts ?? null,
    bestTimeMs: raw.bestTimeMs ?? null,
  }
}

function normalizeLevels(levels: Record<number, unknown> | undefined): Record<number, LevelRecord> {
  const out: Record<number, LevelRecord> = {}
  if (!levels) return out
  for (const [id, rec] of Object.entries(levels)) {
    out[Number(id)] = normalizeRecord((rec ?? {}) as Partial<LevelRecord> & { star?: boolean })
  }
  return out
}

function load(): CircuitProgress {
  if (typeof window === "undefined") return EMPTY
  try {
    // Prefer v2; fall back to migrating a v1 save so returning players keep
    // their solved levels (and get sensible stars for them).
    const raw = window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem(LEGACY_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<CircuitProgress>
    return {
      unlockedUpTo: parsed.unlockedUpTo ?? 1,
      levels: normalizeLevels(parsed.levels as Record<number, unknown> | undefined),
    }
  } catch {
    // localStorage can be blocked in private or restricted browser contexts.
    return EMPTY
  }
}

function save(progress: CircuitProgress) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Nothing else to do if localStorage is unavailable.
  }
}

export function useCircuitProgress() {
  const [progress, setProgress] = useState<CircuitProgress>(EMPTY)

  useEffect(() => {
    setProgress(load())
  }, [])

  const update = useCallback((updater: (prev: CircuitProgress) => CircuitProgress) => {
    setProgress((prev) => {
      const next = updater(prev)
      save(next)
      return next
    })
  }, [])

  const completeLevel = useCallback(
    (levelId: number, totalLevels: number, result: SolveResult) => {
      update((prev) => {
        const existing = prev.levels[levelId] ?? {
          solved: false,
          stars: 0,
          bestParts: null,
          bestTimeMs: null,
        }
        return {
          unlockedUpTo: Math.max(prev.unlockedUpTo, Math.min(levelId + 1, totalLevels)),
          levels: {
            ...prev.levels,
            [levelId]: {
              solved: true,
              // Never lower a previously-earned best.
              stars: Math.max(existing.stars, result.stars),
              bestParts:
                existing.bestParts == null ? result.parts : Math.min(existing.bestParts, result.parts),
              bestTimeMs:
                existing.bestTimeMs == null ? result.timeMs : Math.min(existing.bestTimeMs, result.timeMs),
            },
          },
        }
      })
    },
    [update],
  )

  const isUnlocked = useCallback(
    (levelId: number) => levelId <= progress.unlockedUpTo,
    [progress],
  )

  const resetProgress = useCallback(() => update(() => EMPTY), [update])

  const records = Object.values(progress.levels)
  const completedCount = records.filter((l) => l.solved).length
  const totalStars = records.reduce((sum, l) => sum + l.stars, 0)

  return { progress, completeLevel, isUnlocked, resetProgress, completedCount, totalStars }
}

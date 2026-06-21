"use client"

import { useCallback, useEffect, useState } from "react"
import type { LevelProgress, Progress } from "./types"

const STORAGE_KEY = "avanza-logic-game-progress-v1"

const EMPTY_PROGRESS: Progress = { tutorialDone: false, unlockedUpTo: 1, levels: {} }

function loadProgress(): Progress {
  if (typeof window === "undefined") return EMPTY_PROGRESS
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_PROGRESS
    const parsed = JSON.parse(raw) as Partial<Progress>
    return {
      tutorialDone: parsed.tutorialDone ?? false,
      unlockedUpTo: parsed.unlockedUpTo ?? 1,
      levels: parsed.levels ?? {},
    }
  } catch {
    // localStorage can be blocked in private or restricted browser contexts.
    return EMPTY_PROGRESS
  }
}

function saveProgress(progress: Progress) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Nothing else to do if localStorage is unavailable.
  }
}

export function useLogicGameProgress() {
  const [progress, setProgress] = useState<Progress>(EMPTY_PROGRESS)

  useEffect(() => {
    setProgress(loadProgress())
  }, [])

  const update = useCallback((updater: (prev: Progress) => Progress) => {
    setProgress((prev) => {
      const next = updater(prev)
      saveProgress(next)
      return next
    })
  }, [])

  const completeTutorial = useCallback(() => {
    update((prev) => ({ ...prev, tutorialDone: true }))
  }, [update])

  const completeLevel = useCallback(
    (levelId: number, totalLevels: number, result: { attempts: number; hintsUsed: number }) => {
      update((prev) => {
        const existing: LevelProgress = prev.levels[levelId] ?? { solved: false, attempts: 0, hintsUsed: 0 }
        return {
          ...prev,
          unlockedUpTo: Math.max(prev.unlockedUpTo, Math.min(levelId + 1, totalLevels)),
          levels: {
            ...prev.levels,
            [levelId]: {
              solved: true,
              attempts: Math.max(existing.attempts, result.attempts),
              hintsUsed: Math.max(existing.hintsUsed, result.hintsUsed),
            },
          },
        }
      })
    },
    [update],
  )

  const isUnlocked = useCallback(
    (levelId: number) => progress.tutorialDone && levelId <= progress.unlockedUpTo,
    [progress],
  )

  const resetProgress = useCallback(() => {
    update(() => EMPTY_PROGRESS)
  }, [update])

  const completedCount = Object.values(progress.levels).filter((l) => l.solved).length

  return { progress, completeTutorial, completeLevel, isUnlocked, resetProgress, completedCount }
}

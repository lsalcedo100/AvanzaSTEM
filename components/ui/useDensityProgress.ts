"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  type BadgeId,
  type BadgeStats,
  EMPTY_BADGE_STATS,
  earnedBadges,
} from "@/components/ui/density-badges"
import {
  type ObjectKey,
  STARTER_OBJECT_IDS,
  objectsUnlockedByLevel,
} from "@/components/ui/density-objects"
import { TOTAL_LEVELS } from "@/components/ui/density-levels"

const STORAGE_KEY = "avanza-density-game-progress-v1"

export type LevelRecord = {
  completed: boolean
  bestScore: number
  /** Best accuracy 0–1. */
  bestAccuracy: number
  perfect: boolean
}

export type DailyRecord = {
  /** "YYYY-MM-DD" of the last completed daily challenge, or null. */
  lastCompletedDate: string | null
  streak: number
  bestStreak: number
}

export type DensityProgress = {
  /** Highest level the player may open (>= 1). */
  unlockedUpTo: number
  levels: Record<number, LevelRecord>
  totalPoints: number
  unlockedObjects: ObjectKey[]
  badges: BadgeId[]
  stats: BadgeStats
  daily: DailyRecord
}

function emptyProgress(): DensityProgress {
  return {
    unlockedUpTo: 1,
    levels: {},
    totalPoints: 0,
    unlockedObjects: [...STARTER_OBJECT_IDS],
    badges: [],
    stats: { ...EMPTY_BADGE_STATS, testedObjects: [] },
    daily: { lastCompletedDate: null, streak: 0, bestStreak: 0 },
  }
}

function load(): DensityProgress {
  const base = emptyProgress()
  if (typeof window === "undefined") return base
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return base
    const p = JSON.parse(raw) as Partial<DensityProgress>
    // Merge defensively — an older/partial payload must never crash the game.
    const starterMerged = Array.from(
      new Set([...STARTER_OBJECT_IDS, ...(p.unlockedObjects ?? [])]),
    ) as ObjectKey[]
    return {
      unlockedUpTo: p.unlockedUpTo ?? 1,
      levels: p.levels ?? {},
      totalPoints: p.totalPoints ?? 0,
      unlockedObjects: starterMerged,
      badges: p.badges ?? [],
      stats: { ...base.stats, ...(p.stats ?? {}) },
      daily: { ...base.daily, ...(p.daily ?? {}) },
    }
  } catch {
    // localStorage can be blocked/corrupt in private or restricted contexts.
    return base
  }
}

function persist(progress: DensityProgress) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Nothing else to do if localStorage is unavailable.
  }
}

/** Local "YYYY-MM-DD" for the given date (defaults to now). */
export function isoDay(date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

/** True when `prev` is exactly the calendar day before `today` (both ISO days). */
function isYesterday(prev: string, today: string): boolean {
  const t = new Date(`${today}T00:00:00`)
  t.setDate(t.getDate() - 1)
  return isoDay(t) === prev
}

export type FinishLevelParams = {
  levelId: number
  tower: boolean
  score: number
  /** 0–1. */
  accuracy: number
  perfect: boolean
  statDelta: {
    correctSinkFloat: number
    correctPredictions: number
    correctCalcs: number
    maxStreak: number
    testedObjects: ObjectKey[]
  }
}

export function useDensityProgress() {
  const [progress, setProgress] = useState<DensityProgress>(emptyProgress)
  // Mirror so callbacks can compute "what changed" synchronously and return it.
  const ref = useRef(progress)

  useEffect(() => {
    const loaded = load()
    ref.current = loaded
    setProgress(loaded)
  }, [])

  const commit = useCallback((next: DensityProgress) => {
    ref.current = next
    persist(next)
    setProgress(next)
  }, [])

  const isUnlocked = useCallback(
    (levelId: number) => levelId <= progress.unlockedUpTo,
    [progress.unlockedUpTo],
  )

  const isObjectUnlocked = useCallback(
    (id: ObjectKey) => progress.unlockedObjects.includes(id),
    [progress.unlockedObjects],
  )

  /** Record a finished level. Returns the objects and badges newly earned so
   *  the level-end screen can celebrate them. */
  const finishLevel = useCallback(
    (params: FinishLevelParams): { newObjects: ObjectKey[]; newBadges: BadgeId[] } => {
      const prev = ref.current
      const prevRecord = prev.levels[params.levelId]

      const stats: BadgeStats = {
        correctSinkFloat: prev.stats.correctSinkFloat + params.statDelta.correctSinkFloat,
        correctPredictions:
          prev.stats.correctPredictions + params.statDelta.correctPredictions,
        correctCalcs: prev.stats.correctCalcs + params.statDelta.correctCalcs,
        bestStreak: Math.max(prev.stats.bestStreak, params.statDelta.maxStreak),
        testedObjects: Array.from(
          new Set([...prev.stats.testedObjects, ...params.statDelta.testedObjects]),
        ),
        perfectTower: prev.stats.perfectTower || (params.tower && params.perfect),
      }

      const unlockObjs = objectsUnlockedByLevel(params.levelId)
      const newObjects = unlockObjs.filter((o) => !prev.unlockedObjects.includes(o))
      const unlockedObjects = Array.from(new Set([...prev.unlockedObjects, ...unlockObjs]))

      const badgesAfter = earnedBadges(stats)
      const newBadges = badgesAfter.filter((b) => !prev.badges.includes(b))

      const next: DensityProgress = {
        ...prev,
        unlockedUpTo: Math.max(prev.unlockedUpTo, Math.min(params.levelId + 1, TOTAL_LEVELS)),
        levels: {
          ...prev.levels,
          [params.levelId]: {
            completed: true,
            bestScore: Math.max(prevRecord?.bestScore ?? 0, params.score),
            bestAccuracy: Math.max(prevRecord?.bestAccuracy ?? 0, params.accuracy),
            perfect: (prevRecord?.perfect ?? false) || params.perfect,
          },
        },
        totalPoints: prev.totalPoints + params.score,
        unlockedObjects,
        badges: badgesAfter,
        stats,
      }
      commit(next)
      return { newObjects, newBadges }
    },
    [commit],
  )

  /** Free Lab: record that an object was tested (for the Lab Explorer badge). */
  const noteTestedObject = useCallback(
    (id: ObjectKey) => {
      const prev = ref.current
      if (prev.stats.testedObjects.includes(id)) return
      const stats: BadgeStats = {
        ...prev.stats,
        testedObjects: [...prev.stats.testedObjects, id],
      }
      commit({ ...prev, stats, badges: earnedBadges(stats) })
    },
    [commit],
  )

  /** Daily challenge: record today's result. Returns the updated daily record. */
  const completeDaily = useCallback(
    (day: string, correct: boolean): DailyRecord => {
      const prev = ref.current
      if (prev.daily.lastCompletedDate === day) return prev.daily // already done today
      const streak = correct
        ? isYesterday(prev.daily.lastCompletedDate ?? "", day)
          ? prev.daily.streak + 1
          : 1
        : 0
      const daily: DailyRecord = {
        lastCompletedDate: day,
        streak,
        bestStreak: Math.max(prev.daily.bestStreak, streak),
      }
      commit({ ...prev, daily })
      return daily
    },
    [commit],
  )

  const resetProgress = useCallback(() => commit(emptyProgress()), [commit])

  const completedCount = Object.values(progress.levels).filter((l) => l.completed).length

  return {
    progress,
    isUnlocked,
    isObjectUnlocked,
    finishLevel,
    noteTestedObject,
    completeDaily,
    resetProgress,
    completedCount,
  }
}

"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  getMathCourseProgressSummary,
  getMathLessonBySlug,
  mathAdventuresCurriculum,
  mathLessonSlugs,
  type MathCourseProgressSummary,
  type MathLesson,
} from "@/features/curriculums/math-adventures"

const STORAGE_KEY = "avanza-math-adventures-progress-v1"

/** Lesson slugs in course order - the basis for locking and resuming. */
const ORDER = mathLessonSlugs()
const VALID_SLUGS = new Set(ORDER)

/**
 * Local, account-free progress for the Math Adventures course.
 *
 * Everything is tracked by lesson `slug` and persisted to one localStorage key,
 * so the hub and the lesson pages read and write the same source of truth. In
 * addition to completed/started weeks, it tracks the last visited week (for
 * "current lesson") and an `unlockAll` flag that lets a parent or teacher open
 * every week at once. By default the course uses gentle locked progression:
 * Week 1 is open, and each later week unlocks when the one before it is
 * completed. Completed weeks are always reachable for review.
 *
 * Reads run only on the client (inside an effect), and the server plus the first
 * client render both use the neutral empty state, so there is no hydration
 * mismatch. Mirrors `useEngineeringProgress`.
 */
export type MathProgress = {
  completed: string[]
  started: string[]
  /** The most recently opened week, used to surface the "current" lesson. */
  lastVisited: string | null
  /** Parent/teacher override that unlocks every week for review. */
  unlockAll: boolean
}

/** A week's display state on the hub and lesson list. */
export type MathLessonStatus = "completed" | "in-progress" | "not-started" | "locked"

function emptyProgress(): MathProgress {
  return { completed: [], started: [], lastVisited: null, unlockAll: false }
}

/** Keeps only known, de-duplicated lesson slugs, in course order. */
function sanitizeSlugs(slugs: unknown): string[] {
  if (!Array.isArray(slugs)) return []
  const valid = slugs.filter((s): s is string => typeof s === "string" && VALID_SLUGS.has(s))
  return ORDER.filter((slug) => valid.includes(slug))
}

function load(): MathProgress {
  if (typeof window === "undefined") return emptyProgress()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress()
    const p = JSON.parse(raw) as Partial<MathProgress>
    return {
      completed: sanitizeSlugs(p.completed),
      started: sanitizeSlugs(p.started),
      lastVisited:
        typeof p.lastVisited === "string" && VALID_SLUGS.has(p.lastVisited) ? p.lastVisited : null,
      unlockAll: p.unlockAll === true,
    }
  } catch {
    // localStorage can be blocked or corrupt in private/restricted contexts.
    return emptyProgress()
  }
}

function persist(progress: MathProgress) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // The UI still works if persistence is unavailable.
  }
}

/**
 * Whether a week is reachable. Unlocked when: the unlock-all override is on, the
 * week is already completed (always reviewable), it is Week 1, or the previous
 * week has been completed.
 */
function computeUnlocked(slug: string, completed: string[], unlockAll: boolean): boolean {
  if (unlockAll) return true
  if (completed.includes(slug)) return true
  const idx = ORDER.indexOf(slug)
  if (idx <= 0) return true
  return completed.includes(ORDER[idx - 1])
}

export function useMathProgress() {
  const [progress, setProgress] = useState<MathProgress>(emptyProgress)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef(progress)

  useEffect(() => {
    const initial = load()
    ref.current = initial
    setProgress(initial)
    setLoaded(true)
  }, [])

  const commit = useCallback((next: MathProgress) => {
    ref.current = next
    persist(next)
    setProgress(next)
  }, [])

  // Records a week as opened: updates "last visited" and marks it started.
  const markVisited = useCallback(
    (slug: string) => {
      if (!VALID_SLUGS.has(slug)) return
      const current = ref.current
      if (current.lastVisited === slug && current.started.includes(slug)) return
      commit({
        ...current,
        lastVisited: slug,
        started: sanitizeSlugs([...current.started, slug]),
      })
    },
    [commit],
  )

  const markComplete = useCallback(
    (slug: string) => {
      if (!VALID_SLUGS.has(slug)) return
      const current = ref.current
      commit({
        ...current,
        completed: sanitizeSlugs([...current.completed, slug]),
        started: sanitizeSlugs([...current.started, slug]),
      })
    },
    [commit],
  )

  // Parent/teacher override: unlock every week for review, or lock back to the
  // normal one-at-a-time progression.
  const setUnlockAll = useCallback(
    (value: boolean) => {
      commit({ ...ref.current, unlockAll: value })
    },
    [commit],
  )

  const reset = useCallback(() => {
    commit(emptyProgress())
  }, [commit])

  const summary: MathCourseProgressSummary = getMathCourseProgressSummary(progress.completed)
  const hasProgress =
    progress.completed.length > 0 || progress.started.length > 0 || progress.lastVisited !== null

  const isUnlocked = useCallback(
    (slug: string) => computeUnlocked(slug, progress.completed, progress.unlockAll),
    [progress.completed, progress.unlockAll],
  )

  // The week to resume: the first unlocked week that is not yet complete.
  const resumeSlug =
    ORDER.find(
      (slug) =>
        !progress.completed.includes(slug) &&
        computeUnlocked(slug, progress.completed, progress.unlockAll),
    ) ?? null
  const resumeLesson: MathLesson | null = resumeSlug ? getMathLessonBySlug(resumeSlug) ?? null : null

  const status = useCallback(
    (slug: string): MathLessonStatus => {
      if (progress.completed.includes(slug)) return "completed"
      if (!computeUnlocked(slug, progress.completed, progress.unlockAll)) return "locked"
      if (slug === resumeSlug || progress.started.includes(slug)) return "in-progress"
      return "not-started"
    },
    [progress.completed, progress.started, progress.unlockAll, resumeSlug],
  )

  return {
    loaded,
    /** Whole-course summary: totals, percent, next lesson, all-complete. */
    summary,
    /** True once any week has been started, completed, or visited. */
    hasProgress,
    totalWeeks: mathAdventuresCurriculum.totalWeeks,
    completedCount: summary.completedWeeks,
    percent: summary.percentComplete,
    allComplete: summary.allComplete,
    /** Whether the unlock-all override is active. */
    unlockAll: progress.unlockAll,
    /** The most recently opened week (or null). */
    lastVisited: progress.lastVisited,
    /** The first unlocked, not-yet-complete week - where "Continue" resumes. */
    resumeLesson,
    isCompleted: (slug: string) => progress.completed.includes(slug),
    isUnlocked,
    status,
    markVisited,
    markComplete,
    setUnlockAll,
    reset,
  }
}

"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { scienceExperimentsCurriculum } from "@/features/curriculums/science-experiments"

const STORAGE_KEY = "avanza-science-experiments-progress-v1"

const TOTAL_LESSONS = scienceExperimentsCurriculum.totalLessons

/**
 * Local, account-free progress for the Science Experiments course.
 *
 * Progress is tracked by lesson `week` (1..N). Like the Engineering course, and
 * unlike the Python curriculum, this course does NOT lock lessons - every week
 * is always reachable from the hub - so the stored state only drives the
 * "Start / Continue" button, the per-week completed marks, and the final
 * completion screen. Nothing here talks to a server; it is purely localStorage.
 */
export type ScienceProgress = {
  completed: number[]
  started: number[]
}

/** A lesson's display state on the course hub. */
export type ScienceLessonStatus = "completed" | "in-progress" | "not-started"

function emptyProgress(): ScienceProgress {
  return { completed: [], started: [] }
}

/** Keeps only valid, in-range, de-duplicated week numbers. */
function sanitizeWeeks(weeks: unknown): number[] {
  if (!Array.isArray(weeks)) return []
  const valid = weeks.filter(
    (w): w is number =>
      typeof w === "number" && Number.isInteger(w) && w >= 1 && w <= TOTAL_LESSONS,
  )
  return Array.from(new Set(valid)).sort((a, b) => a - b)
}

function load(): ScienceProgress {
  if (typeof window === "undefined") return emptyProgress()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress()
    const p = JSON.parse(raw) as Partial<ScienceProgress>
    return {
      completed: sanitizeWeeks(p.completed),
      started: sanitizeWeeks(p.started),
    }
  } catch {
    // localStorage can be blocked or corrupt in private/restricted contexts.
    return emptyProgress()
  }
}

function persist(progress: ScienceProgress) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // The UI still works if persistence is unavailable.
  }
}

/**
 * Reads and updates course progress. `loaded` starts false and flips true after
 * the first client effect reads localStorage; components should treat the
 * pre-loaded state as the neutral default to stay hydration-safe (the server and
 * first client render both see `emptyProgress()`).
 */
export function useScienceProgress() {
  const [progress, setProgress] = useState<ScienceProgress>(emptyProgress)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef(progress)

  useEffect(() => {
    const initial = load()
    ref.current = initial
    setProgress(initial)
    setLoaded(true)
  }, [])

  const commit = useCallback((next: ScienceProgress) => {
    ref.current = next
    persist(next)
    setProgress(next)
  }, [])

  const markStarted = useCallback(
    (week: number) => {
      const current = ref.current
      if (current.started.includes(week)) return
      commit({ ...current, started: sanitizeWeeks([...current.started, week]) })
    },
    [commit],
  )

  const markComplete = useCallback(
    (week: number) => {
      const current = ref.current
      commit({
        completed: sanitizeWeeks([...current.completed, week]),
        started: sanitizeWeeks([...current.started, week]),
      })
    },
    [commit],
  )

  const reset = useCallback(() => {
    commit(emptyProgress())
  }, [commit])

  const completedCount = progress.completed.length
  const hasProgress = completedCount > 0 || progress.started.length > 0
  const allComplete = completedCount >= TOTAL_LESSONS
  const percent = Math.round((completedCount / TOTAL_LESSONS) * 100)

  // The recommended next week to resume: the lowest-numbered week not yet
  // completed. If every week is complete, point back at the first for review.
  let currentWeek = 1
  for (let week = 1; week <= TOTAL_LESSONS; week += 1) {
    if (!progress.completed.includes(week)) {
      currentWeek = week
      break
    }
    currentWeek = TOTAL_LESSONS
  }

  const status = useCallback(
    (week: number): ScienceLessonStatus => {
      if (progress.completed.includes(week)) return "completed"
      if (progress.started.includes(week)) return "in-progress"
      return "not-started"
    },
    [progress.completed, progress.started],
  )

  return {
    loaded,
    totalLessons: TOTAL_LESSONS,
    completedCount,
    hasProgress,
    allComplete,
    percent,
    /** Lowest week not yet completed - the one "Continue" resumes at. */
    currentWeek,
    isCompleted: (week: number) => progress.completed.includes(week),
    status,
    markStarted,
    markComplete,
    reset,
  }
}

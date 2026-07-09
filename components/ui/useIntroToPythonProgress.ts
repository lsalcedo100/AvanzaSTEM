"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { introToPythonCurriculum } from "@/features/curriculums/intro-to-python"

const STORAGE_KEY = "avanza-intro-to-python-progress-v1"

const TOTAL_WEEKS = introToPythonCurriculum.totalWeeks

/** A lesson's display state on the curriculum overview. */
export type LessonStatus = "completed" | "in-progress" | "not-started"

/**
 * Local, account-free progress for the Intro to Python curriculum.
 *
 * - `completed`: week numbers the student marked complete.
 * - `started`: week numbers whose lesson page has been opened.
 * - `showAll`: a teacher/dev override that unlocks every lesson.
 */
export type IntroToPythonProgress = {
  completed: number[]
  started: number[]
  showAll: boolean
}

function emptyProgress(): IntroToPythonProgress {
  return { completed: [], started: [], showAll: false }
}

/** Keeps only valid, in-range, de-duplicated week numbers. */
function sanitizeWeeks(weeks: unknown): number[] {
  if (!Array.isArray(weeks)) return []
  const valid = weeks.filter(
    (w): w is number => typeof w === "number" && Number.isInteger(w) && w >= 1 && w <= TOTAL_WEEKS,
  )
  return Array.from(new Set(valid)).sort((a, b) => a - b)
}

function load(): IntroToPythonProgress {
  if (typeof window === "undefined") return emptyProgress()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress()
    const p = JSON.parse(raw) as Partial<IntroToPythonProgress>
    return {
      completed: sanitizeWeeks(p.completed),
      started: sanitizeWeeks(p.started),
      showAll: p.showAll === true,
    }
  } catch {
    // localStorage can be blocked or corrupt in private/restricted contexts.
    return emptyProgress()
  }
}

function persist(progress: IntroToPythonProgress) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // The UI still works if persistence is unavailable.
  }
}

/**
 * Reads and updates curriculum progress. `loaded` starts false and flips true
 * after the first client effect reads localStorage; components should treat the
 * pre-loaded state as the neutral default to stay hydration-safe (the server
 * and first client render both see `emptyProgress()`).
 */
export function useIntroToPythonProgress() {
  const [progress, setProgress] = useState<IntroToPythonProgress>(emptyProgress)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef(progress)

  useEffect(() => {
    const initial = load()
    ref.current = initial
    setProgress(initial)
    setLoaded(true)
  }, [])

  const commit = useCallback((next: IntroToPythonProgress) => {
    ref.current = next
    persist(next)
    setProgress(next)
  }, [])

  const isCompleted = useCallback(
    (week: number) => progress.completed.includes(week),
    [progress.completed],
  )

  const isUnlocked = useCallback(
    (week: number) => progress.showAll || week <= 1 || progress.completed.includes(week - 1),
    [progress.showAll, progress.completed],
  )

  const status = useCallback(
    (week: number): LessonStatus => {
      if (progress.completed.includes(week)) return "completed"
      if (progress.started.includes(week)) return "in-progress"
      return "not-started"
    },
    [progress.completed, progress.started],
  )

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
        ...current,
        completed: sanitizeWeeks([...current.completed, week]),
        started: sanitizeWeeks([...current.started, week]),
      })
    },
    [commit],
  )

  const setShowAll = useCallback(
    (value: boolean) => {
      commit({ ...ref.current, showAll: value })
    },
    [commit],
  )

  const reset = useCallback(() => {
    commit({ ...ref.current, completed: [], started: [] })
  }, [commit])

  return {
    loaded,
    totalWeeks: TOTAL_WEEKS,
    completedCount: progress.completed.length,
    showAll: progress.showAll,
    isCompleted,
    isUnlocked,
    status,
    markStarted,
    markComplete,
    setShowAll,
    reset,
  }
}

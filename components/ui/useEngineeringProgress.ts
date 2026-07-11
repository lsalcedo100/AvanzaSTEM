"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { engineeringFundamentalsCurriculum } from "@/features/curriculums/engineering-fundamentals"

const STORAGE_KEY = "avanza-engineering-fundamentals-progress-v1"

const TOTAL_LESSONS = engineeringFundamentalsCurriculum.totalLessons

/**
 * Local, account-free progress for the Engineering Fundamentals course.
 *
 * Progress is tracked by lesson `order` (1..N). Unlike the Python curriculum
 * this course does NOT lock lessons - every lesson is always reachable from the
 * overview - so the stored state only drives the "Start / Continue" button and
 * the completed count. This is intentionally a small, forward-compatible base:
 * later prompts can build a fuller progress view on top of the same key.
 */
export type EngineeringProgress = {
  completed: number[]
  started: number[]
}

/** A lesson's display state on the course overview. */
export type LessonProgressStatus = "completed" | "in-progress" | "not-started"

function emptyProgress(): EngineeringProgress {
  return { completed: [], started: [] }
}

/** Keeps only valid, in-range, de-duplicated lesson orders. */
function sanitizeOrders(orders: unknown): number[] {
  if (!Array.isArray(orders)) return []
  const valid = orders.filter(
    (o): o is number =>
      typeof o === "number" && Number.isInteger(o) && o >= 1 && o <= TOTAL_LESSONS,
  )
  return Array.from(new Set(valid)).sort((a, b) => a - b)
}

function load(): EngineeringProgress {
  if (typeof window === "undefined") return emptyProgress()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress()
    const p = JSON.parse(raw) as Partial<EngineeringProgress>
    return {
      completed: sanitizeOrders(p.completed),
      started: sanitizeOrders(p.started),
    }
  } catch {
    // localStorage can be blocked or corrupt in private/restricted contexts.
    return emptyProgress()
  }
}

function persist(progress: EngineeringProgress) {
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
export function useEngineeringProgress() {
  const [progress, setProgress] = useState<EngineeringProgress>(emptyProgress)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef(progress)

  useEffect(() => {
    const initial = load()
    ref.current = initial
    setProgress(initial)
    setLoaded(true)
  }, [])

  const commit = useCallback((next: EngineeringProgress) => {
    ref.current = next
    persist(next)
    setProgress(next)
  }, [])

  const markStarted = useCallback(
    (order: number) => {
      const current = ref.current
      if (current.started.includes(order)) return
      commit({ ...current, started: sanitizeOrders([...current.started, order]) })
    },
    [commit],
  )

  const markComplete = useCallback(
    (order: number) => {
      const current = ref.current
      commit({
        completed: sanitizeOrders([...current.completed, order]),
        started: sanitizeOrders([...current.started, order]),
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

  // The current lesson to resume: the lowest-numbered lesson not yet completed.
  // If every lesson is complete, point back at the final one for review.
  let currentOrder = 1
  for (let order = 1; order <= TOTAL_LESSONS; order += 1) {
    if (!progress.completed.includes(order)) {
      currentOrder = order
      break
    }
    currentOrder = TOTAL_LESSONS
  }

  const status = useCallback(
    (order: number): LessonProgressStatus => {
      if (progress.completed.includes(order)) return "completed"
      if (progress.started.includes(order)) return "in-progress"
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
    /** Lowest lesson not yet completed - the one "Continue" resumes at. */
    currentOrder,
    /** Alias kept for existing callers. */
    resumeOrder: currentOrder,
    isCompleted: (order: number) => progress.completed.includes(order),
    status,
    markStarted,
    markComplete,
    reset,
  }
}

"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { introToAiCourse } from "@/features/curriculums/intro-to-ai"
import type { KnowledgeCheckQuestion } from "@/features/curriculums/intro-to-ai-types"
import {
  courseProgressPercent,
  earnCertificate,
  emptyIntroToAiProgress,
  isCourseComplete,
  isLessonComplete,
  loadIntroToAiProgress,
  markLessonComplete,
  markLessonIncomplete,
  markLessonStarted,
  resumeTarget,
  saveAssessmentAttempt,
  saveActivityState,
  saveFinalBriefField,
  saveFinalSelfEval,
  saveIntroToAiProgress,
  saveKnowledgeCheckAttempt,
  saveNote,
  savePrediction,
  saveReflection,
  setFinalProjectChoice,
  setUnlockAll,
  weekCompletion,
  type IntroToAiProgress,
  type StorageLike,
} from "@/features/curriculums/intro-to-ai-progress"

/** Whether the most recent write reached storage. "idle" before any write. */
export type SaveStatus = "idle" | "saved" | "error"

function browserStorage(): StorageLike | undefined {
  if (typeof window === "undefined") return undefined
  try {
    return window.localStorage
  } catch {
    return undefined
  }
}

function now(): string {
  return new Date().toISOString()
}

/**
 * Thin client wrapper over the pure `intro-to-ai-progress` logic. SSR-safe: the
 * server and first client render use empty progress, then real progress loads in
 * an effect after mount (no hydration mismatch). Every mutation commits to
 * localStorage immediately.
 */
export function useIntroToAiProgress() {
  const [progress, setProgress] = useState<IntroToAiProgress>(() => emptyIntroToAiProgress())
  const [loaded, setLoaded] = useState(false)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle")
  const ref = useRef(progress)

  useEffect(() => {
    const initial = loadIntroToAiProgress(browserStorage())
    ref.current = initial
    setProgress(initial)
    setLoaded(true)
  }, [])

  const commit = useCallback((next: IntroToAiProgress) => {
    ref.current = next
    const ok = saveIntroToAiProgress(browserStorage(), next)
    setSaveStatus(ok ? "saved" : "error")
    setProgress(next)
  }, [])

  const saveActivity = useCallback((activityId: string, value: string) => commit(saveActivityState(ref.current, activityId, value, now())), [commit])

  const startLesson = useCallback(
    (lessonId: string, week: number, lessonSlug: string) => {
      commit(markLessonStarted(ref.current, lessonId, week, lessonSlug, now()))
    },
    [commit],
  )

  const completeLesson = useCallback((lessonId: string) => commit(markLessonComplete(ref.current, lessonId, now())), [commit])
  const uncompleteLesson = useCallback((lessonId: string) => commit(markLessonIncomplete(ref.current, lessonId, now())), [commit])

  const saveQuiz = useCallback(
    (checkId: string, questions: KnowledgeCheckQuestion[], answers: Record<string, string>) => {
      commit(saveKnowledgeCheckAttempt(ref.current, checkId, questions, answers, now()))
    },
    [commit],
  )

  const saveAssessment = useCallback(
    (questions: KnowledgeCheckQuestion[], answers: Record<string, string>) => {
      commit(saveAssessmentAttempt(ref.current, questions, answers, now()))
    },
    [commit],
  )

  const setPrediction = useCallback((promptId: string, value: string) => commit(savePrediction(ref.current, promptId, value, now())), [commit])
  const setReflection = useCallback((promptId: string, value: string) => commit(saveReflection(ref.current, promptId, value, now())), [commit])
  const setNote = useCallback((noteId: string, value: string) => commit(saveNote(ref.current, noteId, value, now())), [commit])
  const chooseFinalProject = useCallback((choiceId: string) => commit(setFinalProjectChoice(ref.current, choiceId, now())), [commit])
  const setBriefField = useCallback((fieldId: string, value: string) => commit(saveFinalBriefField(ref.current, fieldId, value, now())), [commit])
  const setSelfEval = useCallback((categoryId: string, level: string) => commit(saveFinalSelfEval(ref.current, categoryId, level, now())), [commit])
  const setUnlock = useCallback((value: boolean) => commit(setUnlockAll(ref.current, value, now())), [commit])
  const claimCertificate = useCallback((name: string) => commit(earnCertificate(ref.current, name, now())), [commit])
  const reset = useCallback(() => commit(emptyIntroToAiProgress()), [commit])

  return {
    loaded,
    progress,
    saveStatus,
    savedAt: progress.updatedAt,
    // mutations
    startLesson,
    completeLesson,
    uncompleteLesson,
    saveQuiz,
    saveAssessment,
    setPrediction,
    setReflection,
    setNote,
    saveActivity,
    chooseFinalProject,
    setBriefField,
    setSelfEval,
    setUnlock,
    claimCertificate,
    reset,
    // queries (bound to the real course)
    percent: courseProgressPercent(progress, introToAiCourse),
    complete: isCourseComplete(progress, introToAiCourse),
    resume: resumeTarget(progress, introToAiCourse),
    isLessonComplete: (lessonId: string) => isLessonComplete(progress, lessonId),
    weekCompletion: (week: number) => weekCompletion(progress, introToAiCourse, week),
  }
}

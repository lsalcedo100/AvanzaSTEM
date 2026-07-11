"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  emptyRoboticsProgress,
  roboticsCurriculum,
  type BlockKind,
  type EquipmentPathId,
  type RoboticsModule,
  type RoboticsProgress,
  type SavedSimulatorResult,
} from "@/features/curriculums/robotics"
import type { Program } from "@/features/curriculums/robotics-program"
import {
  computeModuleRequirements,
  courseCompletion,
  estimateRemainingTime,
  findResumeTarget,
  hasAnyProgress,
  isModuleUnlocked,
  lessonAvailability,
  loadRoboticsProgress,
  markLessonComplete,
  markLessonStarted,
  moduleStatus,
  resetActivity,
  resetCourse,
  resetLesson,
  saveDebugFinding,
  saveFinalPlanField,
  saveFinalSelfEval,
  saveFinalTestResults,
  saveJournalEntry,
  savePrediction,
  saveProgram,
  saveProgramAst,
  resetProgramAst,
  saveQuizAttempt,
  saveReflection,
  saveRoboticsProgress,
  saveActivityResult,
  saveActivityData,
  saveLessonStep,
  saveSimulatorResult,
  saveTestRecord,
  selectEquipmentPath,
  setAnswerReviewed,
  setUnlockAll,
  setFinalMissionChoice,
  type RoboticsResumeTarget,
  type StorageLike,
} from "@/features/curriculums/robotics-progress"

/** The browser localStorage, or undefined on the server (keeps the layer SSR-safe). */
function browserStorage(): StorageLike | undefined {
  if (typeof window === "undefined") return undefined
  return window.localStorage
}

/**
 * Device-local, account-free progress for the Robotics & Automation course.
 *
 * This is a thin React wrapper over the pure logic in
 * `features/curriculums/robotics-progress.ts`: it holds the progress in state,
 * reads/writes localStorage, and supplies each reducer with a timestamp. Reads
 * run only inside an effect, so the server and the first client render both use
 * the neutral empty state - no hydration mismatch. Mirrors `useMathProgress`.
 */
export function useRoboticsProgress() {
  const [progress, setProgress] = useState<RoboticsProgress>(emptyRoboticsProgress)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef(progress)

  useEffect(() => {
    const initial = loadRoboticsProgress(browserStorage())
    ref.current = initial
    setProgress(initial)
    setLoaded(true)
  }, [])

  // Apply a pure reducer to the current progress, persist, and update state.
  const commit = useCallback((next: RoboticsProgress) => {
    ref.current = next
    saveRoboticsProgress(browserStorage(), next)
    setProgress(next)
  }, [])

  // `apply` threads the current progress + a fresh timestamp through a reducer.
  const apply = useCallback(
    (reducer: (current: RoboticsProgress, at: string) => RoboticsProgress) => {
      const at = new Date().toISOString()
      commit(reducer(ref.current, at))
    },
    [commit],
  )

  const api = useMemo(
    () => ({
      markLessonStarted: (moduleId: string) => apply((p, at) => markLessonStarted(p, moduleId, at)),
      saveLessonStep: (moduleId: string, stepId: string) =>
        apply((p, at) => saveLessonStep(p, moduleId, stepId, at)),
      markLessonComplete: (moduleId: string) => apply((p, at) => markLessonComplete(p, moduleId, at)),
      saveQuizAttempt: (checkId: string, selectedAnswers: Record<string, string>, score: number, total: number) =>
        apply((p, at) => saveQuizAttempt(p, checkId, selectedAnswers, score, total, at)),
      setAnswerReviewed: (checkId: string, reviewed: boolean) =>
        apply((p, at) => setAnswerReviewed(p, checkId, reviewed, at)),
      savePrediction: (promptId: string, response: string) =>
        apply((p, at) => savePrediction(p, promptId, response, at)),
      saveActivityResult: (
        activityId: string,
        result: { pathId: EquipmentPathId | null; completed: boolean; notes?: string },
      ) => apply((p, at) => saveActivityResult(p, activityId, result, at)),
      saveActivityData: (key: string, value: string) => apply((p, at) => saveActivityData(p, key, value, at)),
      saveTestRecord: (recordId: string, rows: string[][]) =>
        apply((p, at) => saveTestRecord(p, recordId, rows, at)),
      saveDebugFinding: (missionId: string, finding: { bugIdentified: boolean; revisionMade: string }) =>
        apply((p, at) => saveDebugFinding(p, missionId, finding, at)),
      saveProgram: (specId: string, blocks: BlockKind[]) => apply((p, at) => saveProgram(p, specId, blocks, at)),
      saveProgramAst: (specId: string, program: Program) => apply((p, at) => saveProgramAst(p, specId, program, at)),
      resetProgramAst: (specId: string) => apply((p, at) => resetProgramAst(p, specId, at)),
      saveSimulatorResult: (result: Omit<SavedSimulatorResult, "savedAt">) =>
        apply((p, at) => saveSimulatorResult(p, result, at)),
      saveJournalEntry: (moduleId: string, promptId: string, value: string) =>
        apply((p, at) => saveJournalEntry(p, moduleId, promptId, value, at)),
      saveReflection: (promptId: string, response: string) =>
        apply((p, at) => saveReflection(p, promptId, response, at)),
      selectEquipmentPath: (pathId: EquipmentPathId) => apply((p, at) => selectEquipmentPath(p, pathId, at)),
      setUnlockAll: (value: boolean) => apply((p, at) => setUnlockAll(p, value, at)),
      setFinalMissionChoice: (choiceId: string) => apply((p, at) => setFinalMissionChoice(p, choiceId, at)),
      saveFinalPlanField: (fieldId: string, value: string) =>
        apply((p, at) => saveFinalPlanField(p, fieldId, value, at)),
      saveFinalTestResults: (rows: string[][]) => apply((p, at) => saveFinalTestResults(p, rows, at)),
      saveFinalSelfEval: (categoryId: string, level: string) =>
        apply((p, at) => saveFinalSelfEval(p, categoryId, level, at)),
      resetActivity: (activityId: string) => apply((p, at) => resetActivity(p, activityId, at)),
      resetLesson: (module: RoboticsModule) => apply((p, at) => resetLesson(p, module, at)),
      resetCourse: () => commit(resetCourse()),
    }),
    [apply, commit],
  )

  // Derived, re-computed from the live progress each render.
  const resume: RoboticsResumeTarget = useMemo(() => findResumeTarget(progress, roboticsCurriculum), [progress])
  const completion = useMemo(() => courseCompletion(progress, roboticsCurriculum), [progress])
  const availability = useMemo(() => lessonAvailability(progress, roboticsCurriculum), [progress])
  const remaining = useMemo(() => estimateRemainingTime(progress, roboticsCurriculum), [progress])

  const isUnlocked = useCallback((module: RoboticsModule) => isModuleUnlocked(progress, module), [progress])
  const status = useCallback(
    (module: RoboticsModule) => moduleStatus(progress, module, resume.moduleId),
    [progress, resume.moduleId],
  )
  const isCompleted = useCallback((moduleId: string) => progress.completed.includes(moduleId), [progress.completed])
  const moduleRequirements = useCallback(
    (module: RoboticsModule) => computeModuleRequirements(progress, module),
    [progress],
  )

  return {
    loaded,
    /** The full progress record (also the exportable structured data). */
    progress,
    /** The chosen equipment path, or null. */
    equipmentPath: progress.equipmentPath,
    /** Whether the unlock-all override is active. */
    unlockAll: progress.unlockAll,
    /** True once the student has any saved progress. */
    hasProgress: hasAnyProgress(progress),
    /** Whole-course completion: count, total, percent, complete. */
    completion,
    /** Per-module availability + status, in course order. */
    availability,
    /** Where "Continue" should go (route metadata). */
    resume,
    /** Estimated time left in the course, from the incomplete weeks. */
    remaining,
    isUnlocked,
    isCompleted,
    status,
    moduleRequirements,
    /** Returns a deep copy of progress for export/download. */
    exportData: () => JSON.parse(JSON.stringify(progress)) as RoboticsProgress,
    ...api,
  }
}

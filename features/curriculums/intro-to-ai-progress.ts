/**
 * Intro to AI — progress persistence (pure, framework-free).
 *
 * Mirrors the pattern used by `robotics-progress.ts`: all logic here is pure and
 * takes an injected `StorageLike`, so it is fully unit-testable and SSR-safe. The
 * thin `useIntroToAiProgress` hook (components/ui/useIntroToAiProgress.ts) is the
 * only place that touches `window.localStorage`.
 *
 * Storage is device-local only. No accounts, no server, no cookies, no personal
 * data leaves the browser. A `version` field is included from day one so future
 * schema changes can migrate instead of wiping. Everything is keyed by stable
 * content ids, never by visible text, so keys survive edits and translation.
 */
import type { IntroToAiCourse, KnowledgeCheckQuestion, Lesson } from "./intro-to-ai-types.ts"
import { scoreCheck } from "./intro-to-ai-quiz.ts"
import { parseStudio, projectComplete as studioComplete, STUDIO_ACTIVITY_ID } from "./intro-to-ai-final-project.ts"
import { FINAL_REFLECTION_PROMPTS } from "./intro-to-ai-mission.ts"

export const INTRO_TO_AI_PROGRESS_VERSION = 1 as const
export const INTRO_TO_AI_STORAGE_KEY = `avanza-intro-to-artificial-intelligence-progress-v${INTRO_TO_AI_PROGRESS_VERSION}`

export type StorageLike = {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

export type QuizAttempt = {
  answers: Record<string, string>
  score: number
  total: number
  savedAt: string
}

export type FinalProjectProgress = {
  choiceId: string | null
  brief: Record<string, string>
  selfEvaluation: Record<string, string>
  savedAt: string | null
}

export type CertificateInfo = {
  earned: boolean
  earnedAt: string | null
  /** Typed locally by the learner for the certificate; never transmitted. */
  studentName: string
}

export type IntroToAiProgress = {
  courseId: string
  version: number
  /** When the learner first started the course (first lesson opened). */
  startedAt: string | null
  /** Lesson ids the learner has marked complete. */
  completedLessons: string[]
  /** Lesson ids the learner has opened. */
  startedLessons: string[]
  /** Resume target. */
  lastVisited: { week: number; lessonSlug: string } | null
  /** Teacher override to unlock everything. */
  unlockAll: boolean
  knowledgeChecks: Record<string, QuizAttempt>
  assessment: QuizAttempt | null
  /** Predict-then-check responses, keyed by prediction prompt id. Never "wrong". */
  predictions: Record<string, string>
  reflections: Record<string, string>
  /** Free-text student notes, keyed by a stable id (e.g. "course-notebook"). */
  notes: Record<string, string>
  /** Generic saved activity state, keyed by activity id (forward-compatible with interactive engines). */
  activities: Record<string, string>
  finalProject: FinalProjectProgress
  certificate: CertificateInfo
  updatedAt: string | null
}

export function emptyIntroToAiProgress(courseId = "intro-to-artificial-intelligence"): IntroToAiProgress {
  return {
    courseId,
    version: INTRO_TO_AI_PROGRESS_VERSION,
    startedAt: null,
    completedLessons: [],
    startedLessons: [],
    lastVisited: null,
    unlockAll: false,
    knowledgeChecks: {},
    assessment: null,
    predictions: {},
    reflections: {},
    notes: {},
    activities: {},
    finalProject: { choiceId: null, brief: {}, selfEvaluation: {}, savedAt: null },
    certificate: { earned: false, earnedAt: null, studentName: "" },
    updatedAt: null,
  }
}

/* -------------------------------------------------------------------------- */
/* Load / save with defensive coercion                                        */
/* -------------------------------------------------------------------------- */

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : []
}

function asStringRecord(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object") return {}
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    if (typeof v === "string") out[k] = v
  }
  return out
}

function coerceAttempt(value: unknown): QuizAttempt | null {
  if (!value || typeof value !== "object") return null
  const v = value as Record<string, unknown>
  return {
    answers: asStringRecord(v.answers),
    score: typeof v.score === "number" ? v.score : 0,
    total: typeof v.total === "number" ? v.total : 0,
    savedAt: typeof v.savedAt === "string" ? v.savedAt : "",
  }
}

export function migrateIntroToAiProgress(data: unknown): IntroToAiProgress {
  const base = emptyIntroToAiProgress()
  if (!data || typeof data !== "object") return base
  const d = data as Record<string, unknown>

  const lastVisited =
    d.lastVisited && typeof d.lastVisited === "object"
      ? (() => {
          const lv = d.lastVisited as Record<string, unknown>
          return typeof lv.week === "number" && typeof lv.lessonSlug === "string"
            ? { week: lv.week, lessonSlug: lv.lessonSlug }
            : null
        })()
      : null

  const knowledgeChecks: Record<string, QuizAttempt> = {}
  if (d.knowledgeChecks && typeof d.knowledgeChecks === "object") {
    for (const [k, v] of Object.entries(d.knowledgeChecks as Record<string, unknown>)) {
      const a = coerceAttempt(v)
      if (a) knowledgeChecks[k] = a
    }
  }

  const fp = (d.finalProject && typeof d.finalProject === "object" ? d.finalProject : {}) as Record<string, unknown>
  const cert = (d.certificate && typeof d.certificate === "object" ? d.certificate : {}) as Record<string, unknown>

  return {
    ...base,
    startedAt: typeof d.startedAt === "string" ? d.startedAt : null,
    completedLessons: asStringArray(d.completedLessons),
    startedLessons: asStringArray(d.startedLessons),
    lastVisited,
    unlockAll: d.unlockAll === true,
    knowledgeChecks,
    assessment: coerceAttempt(d.assessment),
    predictions: asStringRecord(d.predictions),
    reflections: asStringRecord(d.reflections),
    notes: asStringRecord(d.notes),
    activities: asStringRecord(d.activities),
    finalProject: {
      choiceId: typeof fp.choiceId === "string" ? fp.choiceId : null,
      brief: asStringRecord(fp.brief),
      selfEvaluation: asStringRecord(fp.selfEvaluation),
      savedAt: typeof fp.savedAt === "string" ? fp.savedAt : null,
    },
    certificate: {
      earned: cert.earned === true,
      earnedAt: typeof cert.earnedAt === "string" ? cert.earnedAt : null,
      studentName: typeof cert.studentName === "string" ? cert.studentName : "",
    },
    updatedAt: typeof d.updatedAt === "string" ? d.updatedAt : null,
  }
}

export function loadIntroToAiProgress(storage: StorageLike | undefined): IntroToAiProgress {
  if (!storage) return emptyIntroToAiProgress()
  try {
    const raw = storage.getItem(INTRO_TO_AI_STORAGE_KEY)
    if (!raw) return emptyIntroToAiProgress()
    return migrateIntroToAiProgress(JSON.parse(raw))
  } catch {
    return emptyIntroToAiProgress()
  }
}

/**
 * Persists progress. Returns `true` on success and `false` if storage is
 * missing/blocked/full, so the UI can show an accurate "saved" vs "save error"
 * state instead of failing silently. Never throws.
 */
export function saveIntroToAiProgress(storage: StorageLike | undefined, progress: IntroToAiProgress): boolean {
  if (!storage) return false
  try {
    storage.setItem(INTRO_TO_AI_STORAGE_KEY, JSON.stringify(progress))
    return true
  } catch {
    // Storage full or unavailable (private mode).
    return false
  }
}

/* -------------------------------------------------------------------------- */
/* Pure mutators (return new state)                                           */
/* -------------------------------------------------------------------------- */

function withMeta(p: IntroToAiProgress, at: string): IntroToAiProgress {
  return { ...p, updatedAt: at }
}

function addUnique(list: string[], id: string): string[] {
  return list.includes(id) ? list : [...list, id]
}

export function markLessonStarted(p: IntroToAiProgress, lessonId: string, week: number, lessonSlug: string, at: string): IntroToAiProgress {
  return withMeta(
    {
      ...p,
      startedAt: p.startedAt ?? at,
      startedLessons: addUnique(p.startedLessons, lessonId),
      lastVisited: { week, lessonSlug },
    },
    at,
  )
}

export function saveActivityState(p: IntroToAiProgress, activityId: string, value: string, at: string): IntroToAiProgress {
  return withMeta({ ...p, activities: { ...p.activities, [activityId]: value } }, at)
}

export function markLessonComplete(p: IntroToAiProgress, lessonId: string, at: string): IntroToAiProgress {
  return withMeta(
    { ...p, completedLessons: addUnique(p.completedLessons, lessonId), startedLessons: addUnique(p.startedLessons, lessonId) },
    at,
  )
}

export function markLessonIncomplete(p: IntroToAiProgress, lessonId: string, at: string): IntroToAiProgress {
  return withMeta({ ...p, completedLessons: p.completedLessons.filter((id) => id !== lessonId) }, at)
}

export function saveKnowledgeCheckAttempt(
  p: IntroToAiProgress,
  checkId: string,
  questions: KnowledgeCheckQuestion[],
  answers: Record<string, string>,
  at: string,
): IntroToAiProgress {
  const { score, total } = scoreCheck(questions, answers)
  return withMeta(
    { ...p, knowledgeChecks: { ...p.knowledgeChecks, [checkId]: { answers, score, total, savedAt: at } } },
    at,
  )
}

export function saveAssessmentAttempt(
  p: IntroToAiProgress,
  questions: KnowledgeCheckQuestion[],
  answers: Record<string, string>,
  at: string,
): IntroToAiProgress {
  const { score, total } = scoreCheck(questions, answers)
  return withMeta({ ...p, assessment: { answers, score, total, savedAt: at } }, at)
}

export function savePrediction(p: IntroToAiProgress, promptId: string, value: string, at: string): IntroToAiProgress {
  return withMeta({ ...p, predictions: { ...p.predictions, [promptId]: value } }, at)
}

export function saveReflection(p: IntroToAiProgress, promptId: string, value: string, at: string): IntroToAiProgress {
  return withMeta({ ...p, reflections: { ...p.reflections, [promptId]: value } }, at)
}

export function saveNote(p: IntroToAiProgress, noteId: string, value: string, at: string): IntroToAiProgress {
  return withMeta({ ...p, notes: { ...p.notes, [noteId]: value } }, at)
}

export function setFinalProjectChoice(p: IntroToAiProgress, choiceId: string, at: string): IntroToAiProgress {
  return withMeta({ ...p, finalProject: { ...p.finalProject, choiceId, savedAt: at } }, at)
}

export function saveFinalBriefField(p: IntroToAiProgress, fieldId: string, value: string, at: string): IntroToAiProgress {
  return withMeta(
    { ...p, finalProject: { ...p.finalProject, brief: { ...p.finalProject.brief, [fieldId]: value }, savedAt: at } },
    at,
  )
}

export function saveFinalSelfEval(p: IntroToAiProgress, categoryId: string, level: string, at: string): IntroToAiProgress {
  return withMeta(
    { ...p, finalProject: { ...p.finalProject, selfEvaluation: { ...p.finalProject.selfEvaluation, [categoryId]: level }, savedAt: at } },
    at,
  )
}

export function setUnlockAll(p: IntroToAiProgress, value: boolean, at: string): IntroToAiProgress {
  return withMeta({ ...p, unlockAll: value }, at)
}

export function earnCertificate(p: IntroToAiProgress, studentName: string, at: string): IntroToAiProgress {
  return withMeta({ ...p, certificate: { earned: true, earnedAt: at, studentName } }, at)
}

export function resetIntroToAiProgress(): IntroToAiProgress {
  return emptyIntroToAiProgress()
}

/* -------------------------------------------------------------------------- */
/* Queries                                                                     */
/* -------------------------------------------------------------------------- */

export function isLessonComplete(p: IntroToAiProgress, lessonId: string): boolean {
  return p.completedLessons.includes(lessonId)
}

export type LessonRequirement = {
  id: string
  label: string
  met: boolean
  /** Required rules gate the "Mark complete" action; others are encouraged only. */
  required: boolean
}

/**
 * Transparent, meaningful lesson-completion rule (never route-visitation, never a
 * perfect quiz score). The one *required* rule is attempting the knowledge check;
 * saving a reflection is encouraged but optional. Returned as a checklist so the
 * UI can show exactly what's needed.
 */
export function lessonRequirements(p: IntroToAiProgress, lesson: Lesson): LessonRequirement[] {
  const checkAttempted = Boolean(p.knowledgeChecks[lesson.knowledgeCheck.id])
  const reflectionSaved = lesson.reflection.some((r) => (p.reflections[r.id] ?? "").trim().length > 0)
  return [
    { id: "knowledge-check", label: "Attempt the knowledge check", met: checkAttempted, required: true },
    { id: "reflection", label: "Save a reflection (recommended)", met: reflectionSaved, required: false },
  ]
}

/** True when every *required* rule is met, so the lesson may be marked complete. */
export function lessonRequirementsMet(p: IntroToAiProgress, lesson: Lesson): boolean {
  if (p.unlockAll) return true
  return lessonRequirements(p, lesson).every((r) => !r.required || r.met)
}

export function weekCompletion(p: IntroToAiProgress, course: IntroToAiCourse, week: number): { completed: number; total: number } {
  const w = course.weeks.find((x) => x.week === week)
  if (!w) return { completed: 0, total: 0 }
  const completed = w.lessons.filter((l) => p.completedLessons.includes(l.id)).length
  return { completed, total: w.lessons.length }
}

export function courseProgressPercent(p: IntroToAiProgress, course: IntroToAiCourse): number {
  const total = course.weeks.reduce((n, w) => n + w.lessons.length, 0)
  if (total === 0) return 0
  const completed = course.weeks.reduce(
    (n, w) => n + w.lessons.filter((l) => p.completedLessons.includes(l.id)).length,
    0,
  )
  return Math.round((completed / total) * 100)
}

export function allLessonsComplete(p: IntroToAiProgress, course: IntroToAiCourse): boolean {
  return course.weeks.every((w) => w.lessons.every((l) => p.completedLessons.includes(l.id)))
}

export function assessmentPassed(p: IntroToAiProgress, course: IntroToAiCourse): boolean {
  return p.assessment != null && p.assessment.score >= course.finalAssessment.passThreshold
}

/** The final assessment was attempted (a saved attempt exists), regardless of score. */
export function assessmentAttempted(p: IntroToAiProgress): boolean {
  return p.assessment != null
}

/** The final-project studio is complete (reads the studio blob from activities). */
export function finalProjectComplete(p: IntroToAiProgress): boolean {
  return studioComplete(parseStudio(p.activities[STUDIO_ACTIVITY_ID]))
}

/** At least one final-course-reflection prompt has a saved answer. */
export function finalReflectionComplete(p: IntroToAiProgress): boolean {
  return FINAL_REFLECTION_PROMPTS.some((r) => (p.reflections[r.id] ?? "").trim().length > 0)
}

export type CompletionRequirement = { id: string; label: string; met: boolean }

/**
 * Meaningful completion requirements — never a perfect quiz score, no camera,
 * upload, real name, or account. Completion needs: all lessons done, the final
 * assessment ATTEMPTED (not passed), the final project complete, and at least one
 * final reflection saved. The teacher `unlockAll` override marks everything met.
 */
export function courseCompletionRequirements(p: IntroToAiProgress, course: IntroToAiCourse): CompletionRequirement[] {
  const unlock = p.unlockAll
  return [
    { id: "lessons", label: "Finish all lessons", met: unlock || allLessonsComplete(p, course) },
    { id: "assessment", label: "Attempt the AI Review Mission", met: unlock || assessmentAttempted(p) },
    { id: "project", label: "Complete the final project", met: unlock || finalProjectComplete(p) },
    { id: "reflection", label: "Save a final reflection", met: unlock || finalReflectionComplete(p) },
  ]
}

/**
 * Course completion. The teacher `unlockAll` override also unlocks completion for
 * demos. Used to gate the completion page so a direct visit before requirements
 * are met shows the "not yet" state rather than a certificate.
 */
export function isCourseComplete(p: IntroToAiProgress, course: IntroToAiCourse): boolean {
  if (p.unlockAll) return true
  return courseCompletionRequirements(p, course).every((r) => r.met)
}

/** Where "Start Learning" / "Resume" should go: last visited, else the first lesson. */
export function resumeTarget(p: IntroToAiProgress, course: IntroToAiCourse): { week: number; lessonSlug: string } {
  if (p.lastVisited) {
    const stillExists = course.weeks
      .find((w) => w.week === p.lastVisited!.week)
      ?.lessons.some((l) => l.slug === p.lastVisited!.lessonSlug)
    if (stillExists) return p.lastVisited
  }
  const first = course.weeks[0]
  return { week: first.week, lessonSlug: first.lessons[0].slug }
}

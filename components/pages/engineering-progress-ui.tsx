"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/components/providers/language-provider"
import { getEngineeringFundamentalsCurriculum } from "@/features/curriculums/engineering-fundamentals/i18n"
import {
  engineeringFundamentalsPath,
  engineeringLessonPath,
  type EngineeringLesson,
} from "@/features/curriculums/engineering-fundamentals"
import {
  type LessonProgressStatus,
  useEngineeringProgress,
} from "@/components/ui/useEngineeringProgress"

import type { Translations } from "@/i18n/translations"

type EngStrings = Translations["courseUi"]["engineering"]["progress"]

/** The Engineering Fundamentals chrome in the reader's language. */
function useE(): EngStrings {
  return useLanguage().t.courseUi.engineering.progress
}

const statusLabels = (E: EngStrings): Record<LessonProgressStatus, string> => ({
  completed: E.completed,
  "in-progress": E.inProgress,
  "not-started": E.notStarted,
})

/** The course lessons in the reader's language. */
function useLessons(): EngineeringLesson[] {
  const { language } = useLanguage()
  return getEngineeringFundamentalsCurriculum(language).lessons
}

function lessonByOrder(lessons: EngineeringLesson[], order: number): EngineeringLesson {
  return lessons.find((lesson) => lesson.order === order) ?? lessons[0]
}

/**
 * Resolves the main call-to-action from the current progress state:
 *   - no progress (or pre-hydration) -> "Start Lesson 1"
 *   - all lessons complete           -> "Review course" (back to the first lesson)
 *   - otherwise                      -> "Continue Lesson X" / the final challenge
 */
function resolveCta(
  state: {
    loaded: boolean
    hasProgress: boolean
    allComplete: boolean
    currentOrder: number
  },
  lessons: EngineeringLesson[],
  E: EngStrings,
): { slug: string; label: string } {
  if (!state.loaded || !state.hasProgress) {
    return { slug: lessonByOrder(lessons, 1).slug, label: E.startLesson1 }
  }
  if (state.allComplete) {
    return { slug: lessonByOrder(lessons, 1).slug, label: E.reviewCourse }
  }
  const lesson = lessonByOrder(lessons, state.currentOrder)
  return {
    slug: lesson.slug,
    label: lesson.isFinal
      ? E.continueToFinal
      : E.continueLesson.replace("{n}", String(lesson.order)),
  }
}

const purpleButton =
  "inline-flex items-center rounded-md bg-avanza-purple px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-avanza-purple-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-purple focus-visible:ring-offset-2"

/**
 * The course-overview progress panel: a "X of N completed" count, a plain
 * progress bar, the main Start / Continue / Review call-to-action, and a small
 * reset control. Reads progress from localStorage after mount, so the server and
 * first client render both show the neutral empty state (no hydration mismatch).
 */
export function EngineeringCourseProgress() {
  const E = useE()
  const lessons = useLessons()
  const { loaded, totalLessons, completedCount, percent, hasProgress, allComplete, currentOrder, reset } =
    useEngineeringProgress()

  const cta = resolveCta({ loaded, hasProgress, allComplete, currentOrder }, lessons, E)

  const handleReset = () => {
    if (window.confirm(E.resetConfirm)) {
      reset()
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-foreground" aria-live="polite">
          {E.lessonsCompleted
            .replace("{done}", String(completedCount))
            .replace("{total}", String(totalLessons))}
        </p>
        <p className="text-sm text-muted-foreground">{percent}%</p>
      </div>

      <div
        className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalLessons}
        aria-valuenow={completedCount}
        aria-valuetext={E.lessonsCompleted
          .replace("{done}", String(completedCount))
          .replace("{total}", String(totalLessons))}
      >
        <div
          className="h-full rounded-full bg-avanza-purple transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      {loaded && allComplete && (
        <p className="mt-4 text-sm font-semibold text-foreground">
          {E.courseComplete.replace("{total}", String(totalLessons))}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href={engineeringLessonPath(cta.slug)} className={purpleButton}>
          {cta.label}
        </Link>

        {loaded && hasProgress && (
          <button
            type="button"
            onClick={handleReset}
            className="text-sm font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-purple focus-visible:ring-offset-2"
          >
            {E.resetProgress}
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * A lighter Start / Continue / Review button (no bar or reset), used in the
 * closing call-to-action further down the overview.
 */
export function EngineeringResumeButton() {
  const E = useE()
  const lessons = useLessons()
  const { loaded, hasProgress, allComplete, currentOrder } = useEngineeringProgress()
  const cta = resolveCta({ loaded, hasProgress, allComplete, currentOrder }, lessons, E)

  return (
    <Link href={engineeringLessonPath(cta.slug)} className={purpleButton}>
      {cta.label}
    </Link>
  )
}

/**
 * The course lesson list with per-lesson completion status. Lessons are never
 * locked, so every card links through; the status text and the action label
 * ("Open" / "Continue" / "Review") reflect saved progress once it has loaded.
 */
export function EngineeringLessonList() {
  const E = useE()
  const STATUS_LABEL = statusLabels(E)
  const lessons = useLessons()
  const { loaded, status } = useEngineeringProgress()

  return (
    <ol className="mt-8 space-y-4">
      {lessons.map((lesson) => {
        const lessonStatus = status(lesson.order)
        const noun = lesson.isFinal ? E.challengeNoun : E.lessonNoun
        const named = (action: string) =>
          E.actionNoun.replace("{action}", action).replace("{noun}", noun)
        const action =
          lessonStatus === "completed"
            ? named(E.actionReview)
            : lessonStatus === "in-progress"
              ? named(E.actionContinue)
              : named(E.actionOpen)

        return (
          <li
            key={lesson.slug}
            className="rounded-lg border border-border p-5 transition-colors hover:border-avanza-purple/60 md:p-6"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="md:pr-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm font-semibold text-muted-foreground">
                    {lesson.isFinal ? E.finalShort : `0${lesson.order}`}
                  </span>
                  <h3 className="text-lg font-bold text-foreground">{lesson.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">{lesson.summary}</p>

                <dl className="mt-4 space-y-1.5 text-sm">
                  <div className="flex gap-2">
                    <dt className="font-semibold text-foreground">{E.project}</dt>
                    <dd className="text-muted-foreground">{lesson.projectName}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold text-foreground">{E.time}</dt>
                    <dd className="text-muted-foreground">{lesson.estimatedTime}</dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                    <dt className="font-semibold text-foreground">{E.concepts}</dt>
                    <dd className="text-muted-foreground">
                      {lesson.concepts.map((concept) => concept.term).join(", ")}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex-none md:self-center md:text-right">
                {loaded && (
                  <p
                    className={
                      "text-sm font-semibold " +
                      (lessonStatus === "completed"
                        ? "text-avanza-purple"
                        : lessonStatus === "in-progress"
                          ? "text-foreground"
                          : "text-muted-foreground")
                    }
                  >
                    {STATUS_LABEL[lessonStatus]}
                  </p>
                )}
                <Link
                  href={engineeringLessonPath(lesson.slug)}
                  className="mt-2 inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-avanza-purple transition-colors hover:border-avanza-purple hover:bg-avanza-purple/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-purple focus-visible:ring-offset-2"
                >
                  {loaded ? action : named(E.actionOpen)}
                </Link>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

/**
 * Invisible marker dropped onto each lesson page. When a lesson is opened it
 * records that the lesson has been started, so the overview's status and
 * "Continue" button can resume at the right place. Renders nothing.
 */
export function EngineeringLessonVisit({ order }: { order: number }) {
  const { loaded, markStarted } = useEngineeringProgress()

  useEffect(() => {
    if (loaded) markStarted(order)
  }, [loaded, order, markStarted])

  return null
}

/**
 * "Mark lesson complete" control shown at the bottom of a lesson. Completing a
 * lesson persists to localStorage and advances the overview's progress. Lessons
 * are never locked, so this only tracks progress - it does not gate anything.
 * Disabled until progress has loaded so it never acts on stale state.
 */
export function EngineeringLessonComplete({ order }: { order: number }) {
  const E = useE()
  const lessons = useLessons()
  const { loaded, totalLessons, isCompleted, markComplete } = useEngineeringProgress()
  const lesson = lessonByOrder(lessons, order)
  const next = lessons.find((l) => l.order === order + 1) ?? null
  const done = isCompleted(order)

  const completeLabel = lesson.isFinal ? E.markFinalComplete : E.markLessonComplete
  const doneHeading = lesson.isFinal ? E.finalDoneHeading : E.lessonDoneHeading

  return (
    <div className="mt-12 rounded-md border border-border bg-secondary p-5">
      {done ? (
        <div>
          <p className="text-sm font-semibold text-foreground">{doneHeading}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {lesson.isFinal
              ? E.finishedCourse
              : next
                ? E.niceWork
                : E.finishedEveryLesson}
          </p>
          <p className="mt-3 text-sm">
            {lesson.isFinal ? (
              <Link
                href={engineeringFundamentalsPath}
                className="font-semibold text-avanza-purple underline underline-offset-2 hover:text-avanza-purple-dark"
              >
                {E.backToOverview}
              </Link>
            ) : next ? (
              <Link
                href={engineeringLessonPath(next.slug)}
                className="font-semibold text-avanza-purple underline underline-offset-2 hover:text-avanza-purple-dark"
              >
                {next.isFinal
                  ? E.continueToFinal
                  : E.continueToLesson
                      .replace("{n}", String(next.order))
                      .replace("{title}", next.title)}
              </Link>
            ) : (
              <Link
                href={engineeringFundamentalsPath}
                className="font-semibold text-avanza-purple underline underline-offset-2 hover:text-avanza-purple-dark"
              >
                {E.backToOverview}
              </Link>
            )}
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-muted-foreground">
            {lesson.isFinal
              ? E.promptFinal
              : E.promptLesson.replace("{total}", String(totalLessons))}
          </p>
          <button
            type="button"
            onClick={() => markComplete(order)}
            disabled={!loaded}
            className={`mt-3 ${purpleButton} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {completeLabel}
          </button>
        </div>
      )}
    </div>
  )
}

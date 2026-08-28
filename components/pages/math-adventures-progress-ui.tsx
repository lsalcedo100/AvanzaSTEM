"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Lock } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { getMathAdventuresCurriculum } from "@/features/curriculums/math-adventures/i18n"
import {
  getNextMathLesson,
  mathAdventuresPath,
  mathLessonPath,
  type MathLesson,
} from "@/features/curriculums/math-adventures"
import { type MathLessonStatus, useMathProgress } from "@/components/ui/useMathProgress"
import type { Translations } from "@/i18n/translations"

type MathStrings = Translations["courseUi"]["math"]["progress"]

/** The Math Adventures chrome in the reader's language. */
function useM(): MathStrings {
  return useLanguage().t.courseUi.math.progress
}

const statusLabels = (M: MathStrings): Record<MathLessonStatus, string> => ({
  completed: M.completed,
  "in-progress": M.inProgress,
  "not-started": M.notStarted,
  locked: M.locked,
})

/**
 * The course lessons in the reader's language, plus the two the CTA needs.
 * Slugs are shared with English, so links stay stable across locales.
 */
function useLessons(): {
  lessons: MathLesson[]
  firstLesson: MathLesson
  finalLesson: MathLesson
} {
  const { language } = useLanguage()
  const lessons = getMathAdventuresCurriculum(language).lessons
  return { lessons, firstLesson: lessons[0], finalLesson: lessons[lessons.length - 1] }
}

const tealButton =
  "inline-flex items-center justify-center rounded-md bg-avanza-teal px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-avanza-teal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

const outlineButton =
  "inline-flex items-center justify-center rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-avanza-teal hover:bg-avanza-teal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

type Cta = { href: string; label: string }

/**
 * Resolves the main call-to-action from progress:
 *   - no progress (or pre-hydration) -> "Start Week 1"
 *   - all weeks complete             -> "Review the course" (back to the hub)
 *   - otherwise                      -> "Continue Week X" at the first unlocked,
 *                                        unfinished week
 * Defaults to Week 1 before localStorage has loaded so the first render is
 * hydration-safe and always actionable.
 */
function resolveCta(
  state: {
    loaded: boolean
    hasProgress: boolean
    allComplete: boolean
    resumeLesson: MathLesson | null
  },
  bounds: { firstLesson: MathLesson; finalLesson: MathLesson },
  M: MathStrings,
): Cta {
  if (!state.loaded || !state.hasProgress) {
    return { href: mathLessonPath(bounds.firstLesson.slug), label: M.startWeek1 }
  }
  if (state.allComplete) {
    return { href: mathLessonPath(bounds.finalLesson.slug), label: M.viewFinalProject }
  }
  if (!state.resumeLesson) {
    return { href: mathAdventuresPath, label: M.reviewCourse }
  }
  const next = state.resumeLesson
  return {
    href: mathLessonPath(next.slug),
    label: next.isFinalProject
      ? M.continueToFinal
      : M.continueWeek.replace("{n}", String(next.weekNumber)),
  }
}

/** Human-readable overall course status for the summary panel. */
function courseStatus(state: { hasProgress: boolean; allComplete: boolean }, M: MathStrings): string {
  if (state.allComplete) return M.completed
  if (state.hasProgress) return M.inProgress
  return M.notStarted
}

/**
 * The course-hub progress panel: overall status, an "X of 10 weeks" count with a
 * plain progress bar, the current/next week, and the Start / Continue / Review
 * call-to-action. Reads progress from localStorage after mount, so the server and
 * first client render both show the neutral "Not started" state.
 */
export function MathCourseProgress() {
  const M = useM()
  const bounds = useLessons()
  const { loaded, hasProgress, totalWeeks, completedCount, percent, allComplete, resumeLesson } =
    useMathProgress()

  const cta = resolveCta({ loaded, hasProgress, allComplete, resumeLesson }, bounds, M)
  const status = courseStatus({ hasProgress, allComplete }, M)

  const nextLabel =
    allComplete || !resumeLesson
      ? M.finishedEveryWeek
      : M.weekTitleLine
          .replace("{n}", String(resumeLesson.weekNumber))
          .replace("{title}", resumeLesson.title)

  return (
    <div className="rounded-lg border border-border bg-card p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-sm font-semibold text-foreground" aria-live="polite">
          {M.weeksComplete.replace("{done}", String(completedCount)).replace("{total}", String(totalWeeks))}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{status}</span> &middot; {percent}%
        </p>
      </div>

      <div
        className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalWeeks}
        aria-valuenow={completedCount}
        aria-valuetext={M.weeksComplete
          .replace("{done}", String(completedCount))
          .replace("{total}", String(totalWeeks))}
      >
        <div
          className="h-full rounded-full bg-avanza-teal transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">
          {allComplete ? M.courseComplete : M.upNext}
        </span>{" "}
        {nextLabel}
      </p>

      <div className="mt-5">
        <Link href={cta.href} className={tealButton}>
          {cta.label}
        </Link>
      </div>
    </div>
  )
}

/**
 * A lighter Start / Continue / Review button (no bar) for the closing
 * call-to-action at the bottom of the hub.
 */
export function MathResumeButton() {
  const M = useM()
  const bounds = useLessons()
  const { loaded, hasProgress, allComplete, resumeLesson } = useMathProgress()
  const cta = resolveCta({ loaded, hasProgress, allComplete, resumeLesson }, bounds, M)

  return (
    <Link href={cta.href} className={tealButton}>
      {cta.label}
    </Link>
  )
}

/**
 * Invisible marker dropped onto each lesson page. When a week is opened it
 * records it as the last visited week (and marks it started), so the hub's
 * status and "Continue" button resume at the right place. Renders nothing.
 */
export function MathLessonVisit({ slug }: { slug: string }) {
  const { loaded, markVisited } = useMathProgress()

  useEffect(() => {
    if (loaded) markVisited(slug)
  }, [loaded, slug, markVisited])

  return null
}

/**
 * "Mark week complete" control shown near the bottom of a lesson. Completing a
 * week persists to localStorage, advances the hub's progress, and unlocks the
 * next week. Shows a clear completion state with a link to the next week.
 * Disabled until progress has loaded so it never acts on stale state.
 */
export function MathLessonComplete({ lesson }: { lesson: MathLesson }) {
  const M = useM()
  const { loaded, totalWeeks, isCompleted, markComplete } = useMathProgress()
  const next = getNextMathLesson(lesson.slug)
  const done = isCompleted(lesson.slug)

  const completeLabel = lesson.isFinalProject ? M.markFinalComplete : M.markWeekComplete
  const doneHeading = lesson.isFinalProject
    ? M.finalComplete
    : M.weekComplete.replace("{n}", String(lesson.weekNumber))

  return (
    <div className="mt-12 rounded-md border border-border bg-secondary p-5">
      {done ? (
        <div>
          <p className="text-sm font-semibold text-foreground">{doneHeading}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {lesson.isFinalProject ? M.courseFinished : M.niceWork}
          </p>
          <p className="mt-3 text-sm">
            {next ? (
              <Link
                href={mathLessonPath(next.slug)}
                className="font-semibold text-avanza-teal-dark underline underline-offset-2 hover:text-avanza-teal"
              >
                {next.isFinalProject ? M.nextFinal : M.nextLesson.replace("{title}", next.title)}
              </Link>
            ) : (
              <Link
                href={mathAdventuresPath}
                className="font-semibold text-avanza-teal-dark underline underline-offset-2 hover:text-avanza-teal"
              >
                {M.backToHub}
              </Link>
            )}
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-muted-foreground">
            {lesson.isFinalProject
              ? M.promptFinal
              : M.promptWeek.replace("{total}", String(totalWeeks))}
          </p>
          <button
            type="button"
            onClick={() => markComplete(lesson.slug)}
            disabled={!loaded}
            className={`mt-3 ${tealButton}`}
          >
            {completeLabel}
          </button>
        </div>
      )}
    </div>
  )
}

/**
 * The guided week-by-week path. Rendered as a numbered, vertically connected list
 * so it reads as one sequential course. Each week shows its state (Not started /
 * In progress / Complete / Locked). Unlocked and completed weeks link through;
 * locked weeks show why they are locked instead of a link. Before progress loads,
 * every week is shown as an open link (matching the server render) to avoid a
 * hydration mismatch and to keep the course reachable.
 */
export function MathLessonPath() {
  const M = useM()
  const STATUS_LABEL = statusLabels(M)
  const { lessons } = useLessons()
  const { loaded, status } = useMathProgress()

  return (
    <ol className="mt-8 space-y-4">
      {lessons.map((lesson) => {
        const lessonStatus: MathLessonStatus = loaded ? status(lesson.slug) : "not-started"
        const locked = lessonStatus === "locked"
        const action =
          lessonStatus === "completed"
            ? M.review
            : lessonStatus === "in-progress"
              ? M.continueLabel
              : lesson.isFinalProject
                ? M.startProject
                : M.start

        return (
          <li key={lesson.slug} className="flex gap-4">
            {/* Number rail: keeps the path feeling sequential and guided. */}
            <div className="flex flex-none flex-col items-center">
              <span
                className={
                  "flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm font-semibold " +
                  (locked
                    ? "border-border bg-secondary text-muted-foreground"
                    : "border-border bg-card text-foreground")
                }
              >
                {locked ? (
                  <Lock aria-hidden className="h-4 w-4" />
                ) : (
                  `0${lesson.weekNumber}`.slice(-2)
                )}
              </span>
              {lesson.weekNumber < lessons.length && (
                <span aria-hidden className="mt-1 w-px flex-1 bg-border" />
              )}
            </div>

            <div
              className={
                "flex-1 rounded-lg border border-border p-5 transition-colors " +
                (locked ? "bg-secondary/40" : "hover:border-avanza-teal/60")
              }
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="md:pr-6">
                  <p className="text-sm font-semibold text-muted-foreground">
                    {lesson.isFinalProject
                      ? M.finalProject
                      : M.weekLabel.replace("{n}", String(lesson.weekNumber))}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-foreground">{lesson.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                    {lesson.description}
                  </p>

                  <dl className="mt-4 space-y-1.5 text-sm">
                    <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                      <dt className="font-semibold text-foreground">{M.skillFocus}</dt>
                      <dd className="text-muted-foreground">{lesson.skillFocus.join(", ")}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-semibold text-foreground">{M.time}</dt>
                      <dd className="text-muted-foreground">{lesson.estimatedTime}</dd>
                    </div>
                  </dl>
                </div>

                <div className="flex-none md:self-center md:text-right">
                  {loaded && (
                    <p
                      className={
                        "inline-flex items-center gap-1 text-sm font-semibold " +
                        (lessonStatus === "completed"
                          ? "text-avanza-teal-dark"
                          : lessonStatus === "in-progress"
                            ? "text-foreground"
                            : "text-muted-foreground")
                      }
                    >
                      {locked && <Lock aria-hidden className="h-3 w-3" />}
                      {STATUS_LABEL[lessonStatus]}
                    </p>
                  )}

                  {locked ? (
                    <p className="mt-2 text-xs text-muted-foreground md:max-w-40">
                      {M.lockedHint.replace("{n}", String(lesson.weekNumber - 1))}
                    </p>
                  ) : (
                    <Link
                      href={mathLessonPath(lesson.slug)}
                      className="mt-2 inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-avanza-teal-dark transition-colors hover:border-avanza-teal hover:bg-avanza-teal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2"
                    >
                      {loaded ? action : lesson.isFinalProject ? M.startProject : M.start}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

/**
 * A small, non-intrusive parent/teacher panel for the hub: toggle locked
 * progression on or off (unlock all lessons for review), and reset progress on
 * this device behind a confirm dialog. Reset is disabled when there is nothing
 * to clear.
 */
export function MathTeacherControls() {
  const M = useM()
  const { loaded, hasProgress, unlockAll, setUnlockAll, reset } = useMathProgress()

  const handleReset = () => {
    if (window.confirm(M.resetConfirm)) {
      reset()
    }
  }

  return (
    <div className="mt-8 rounded-lg border border-border bg-card p-5">
      <p className="text-sm font-semibold text-foreground">{M.parentTeacherControls}</p>
      <p className="mt-1 text-sm text-muted-foreground">{M.adultControls}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setUnlockAll(!unlockAll)}
          disabled={!loaded}
          aria-pressed={unlockAll}
          className={outlineButton}
        >
          {unlockAll ? M.lockNormal : M.unlockAll}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={!loaded || !hasProgress}
          className="text-sm font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50"
        >
          {M.resetProgress}
        </button>
      </div>

      {loaded && (
        <p className="mt-3 text-xs text-muted-foreground">
          {unlockAll ? M.allUnlocked : M.unlockInOrder}
        </p>
      )}
    </div>
  )
}

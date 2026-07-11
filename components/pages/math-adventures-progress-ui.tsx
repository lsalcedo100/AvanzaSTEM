"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Lock } from "lucide-react"
import {
  getNextMathLesson,
  mathAdventuresCurriculum,
  mathAdventuresPath,
  mathLessonPath,
  type MathLesson,
} from "@/features/curriculums/math-adventures"
import { type MathLessonStatus, useMathProgress } from "@/components/ui/useMathProgress"

const STATUS_LABEL: Record<MathLessonStatus, string> = {
  completed: "Complete",
  "in-progress": "In progress",
  "not-started": "Not started",
  locked: "Locked",
}

const lessons = mathAdventuresCurriculum.lessons
const firstLesson = lessons[0]
const finalLesson = lessons[lessons.length - 1]

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
function resolveCta(state: {
  loaded: boolean
  hasProgress: boolean
  allComplete: boolean
  resumeLesson: MathLesson | null
}): Cta {
  if (!state.loaded || !state.hasProgress) {
    return { href: mathLessonPath(firstLesson.slug), label: "Start Week 1" }
  }
  if (state.allComplete) {
    return { href: mathLessonPath(finalLesson.slug), label: "View final project" }
  }
  if (!state.resumeLesson) {
    return { href: mathAdventuresPath, label: "Review the course" }
  }
  const next = state.resumeLesson
  return {
    href: mathLessonPath(next.slug),
    label: next.isFinalProject
      ? "Continue to the final project"
      : `Continue Week ${next.weekNumber}`,
  }
}

/** Human-readable overall course status for the summary panel. */
function courseStatus(state: { hasProgress: boolean; allComplete: boolean }): string {
  if (state.allComplete) return "Complete"
  if (state.hasProgress) return "In progress"
  return "Not started"
}

/**
 * The course-hub progress panel: overall status, an "X of 10 weeks" count with a
 * plain progress bar, the current/next week, and the Start / Continue / Review
 * call-to-action. Reads progress from localStorage after mount, so the server and
 * first client render both show the neutral "Not started" state.
 */
export function MathCourseProgress() {
  const { loaded, hasProgress, totalWeeks, completedCount, percent, allComplete, resumeLesson } =
    useMathProgress()

  const cta = resolveCta({ loaded, hasProgress, allComplete, resumeLesson })
  const status = courseStatus({ hasProgress, allComplete })

  const nextLabel =
    allComplete || !resumeLesson
      ? "You have finished every week."
      : `Week ${resumeLesson.weekNumber}: ${resumeLesson.title}`

  return (
    <div className="rounded-lg border border-border bg-card p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-sm font-semibold text-foreground" aria-live="polite">
          {completedCount} of {totalWeeks} weeks complete
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
        aria-valuetext={`${completedCount} of ${totalWeeks} weeks complete`}
      >
        <div
          className="h-full rounded-full bg-avanza-teal transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">
          {allComplete ? "Course complete" : "Up next:"}
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
  const { loaded, hasProgress, allComplete, resumeLesson } = useMathProgress()
  const cta = resolveCta({ loaded, hasProgress, allComplete, resumeLesson })

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
  const { loaded, totalWeeks, isCompleted, markComplete } = useMathProgress()
  const next = getNextMathLesson(lesson.slug)
  const done = isCompleted(lesson.slug)

  const completeLabel = lesson.isFinalProject ? "Mark final project complete" : "Mark week complete"
  const doneHeading = lesson.isFinalProject ? "Final project complete" : `Week ${lesson.weekNumber} complete`

  return (
    <div className="mt-12 rounded-md border border-border bg-secondary p-5">
      {done ? (
        <div>
          <p className="text-sm font-semibold text-foreground">{doneHeading}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {lesson.isFinalProject
              ? "You have finished the Math Adventures course. Nice work."
              : "Nice work. Your progress is saved on this device."}
          </p>
          <p className="mt-3 text-sm">
            {next ? (
              <Link
                href={mathLessonPath(next.slug)}
                className="font-semibold text-avanza-teal-dark underline underline-offset-2 hover:text-avanza-teal"
              >
                {next.isFinalProject
                  ? "Next: the final project"
                  : `Next: ${next.title}`}
              </Link>
            ) : (
              <Link
                href={mathAdventuresPath}
                className="font-semibold text-avanza-teal-dark underline underline-offset-2 hover:text-avanza-teal"
              >
                Back to course hub
              </Link>
            )}
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-muted-foreground">
            {lesson.isFinalProject
              ? "Finished designing, building, and presenting your city? Mark the final project complete to finish the course."
              : `Finished the lesson, activity, and challenge? Mark this week complete to track your progress through the ${totalWeeks}-week course.`}
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
  const { loaded, status } = useMathProgress()

  return (
    <ol className="mt-8 space-y-4">
      {lessons.map((lesson) => {
        const lessonStatus: MathLessonStatus = loaded ? status(lesson.slug) : "not-started"
        const locked = lessonStatus === "locked"
        const action =
          lessonStatus === "completed"
            ? "Review"
            : lessonStatus === "in-progress"
              ? "Continue"
              : lesson.isFinalProject
                ? "Start project"
                : "Start"

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
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {lesson.isFinalProject ? "Final project" : `Week ${lesson.weekNumber}`}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-foreground">{lesson.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                    {lesson.description}
                  </p>

                  <dl className="mt-4 space-y-1.5 text-sm">
                    <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                      <dt className="font-semibold text-foreground">Skill focus:</dt>
                      <dd className="text-muted-foreground">{lesson.skillFocus.join(", ")}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-semibold text-foreground">Time:</dt>
                      <dd className="text-muted-foreground">{lesson.estimatedTime}</dd>
                    </div>
                  </dl>
                </div>

                <div className="flex-none md:self-center md:text-right">
                  {loaded && (
                    <p
                      className={
                        "inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide " +
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
                      Complete Week {lesson.weekNumber - 1} to unlock, or unlock all lessons below.
                    </p>
                  ) : (
                    <Link
                      href={mathLessonPath(lesson.slug)}
                      className="mt-2 inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-avanza-teal-dark transition-colors hover:border-avanza-teal hover:bg-avanza-teal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2"
                    >
                      {loaded ? action : lesson.isFinalProject ? "Start project" : "Start"}
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
  const { loaded, hasProgress, unlockAll, setUnlockAll, reset } = useMathProgress()

  const handleReset = () => {
    if (
      window.confirm(
        "Reset your Math Adventures progress on this device? Completed weeks will be cleared. This cannot be undone.",
      )
    ) {
      reset()
    }
  }

  return (
    <div className="mt-8 rounded-lg border border-border bg-card p-5">
      <p className="text-sm font-semibold text-foreground">Parent &amp; teacher controls</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Progress is saved on this device only. By default each week unlocks once the week before it
        is complete.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setUnlockAll(!unlockAll)}
          disabled={!loaded}
          aria-pressed={unlockAll}
          className={outlineButton}
        >
          {unlockAll ? "Lock to normal progression" : "Unlock all lessons"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={!loaded || !hasProgress}
          className="text-sm font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50"
        >
          Reset progress
        </button>
      </div>

      {loaded && (
        <p className="mt-3 text-xs text-muted-foreground">
          {unlockAll
            ? "All lessons are unlocked. Weeks can be opened and reviewed in any order."
            : "Lessons unlock in order as each week is completed. Completed weeks stay open for review."}
        </p>
      )}
    </div>
  )
}

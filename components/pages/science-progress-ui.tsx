"use client"

import { useEffect } from "react"
import Link from "next/link"
import {
  scienceExperimentsCurriculum,
  scienceExperimentsPath,
  scienceLessonPath,
} from "@/features/curriculums/science-experiments"
import {
  type ScienceLessonStatus,
  useScienceProgress,
} from "@/components/ui/useScienceProgress"

const c = scienceExperimentsCurriculum
const lessons = c.lessons

const STATUS_LABEL: Record<ScienceLessonStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  "not-started": "Not started",
}

const orangeButton =
  "inline-flex items-center rounded-md bg-avanza-orange px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-avanza-orange-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background"

function lessonByWeek(week: number) {
  return lessons.find((lesson) => lesson.week === week) ?? lessons[0]
}

/**
 * Resolves the main call-to-action from progress state:
 *   - no progress (or pre-hydration) -> "Start Week 1"
 *   - all weeks complete             -> "Review the course"
 *   - otherwise                      -> "Continue Week X"
 */
function resolveCta(state: {
  loaded: boolean
  hasProgress: boolean
  allComplete: boolean
  currentWeek: number
}): { slug: string; label: string } {
  if (!state.loaded || !state.hasProgress) {
    return { slug: lessonByWeek(1).slug, label: "Start Week 1" }
  }
  if (state.allComplete) {
    return { slug: lessonByWeek(1).slug, label: "Review the course" }
  }
  const lesson = lessonByWeek(state.currentWeek)
  return { slug: lesson.slug, label: `Continue Week ${lesson.week}` }
}

/**
 * The course-hub progress panel: an "X of 6 completed" count, a plain progress
 * bar, the Start / Continue / Review call-to-action, and a small reset control.
 * Reads localStorage after mount, so the server and first client render both
 * show the neutral empty state (no hydration mismatch).
 */
export function ScienceCourseProgress() {
  const { loaded, totalLessons, completedCount, percent, hasProgress, allComplete, currentWeek, reset } =
    useScienceProgress()

  const cta = resolveCta({ loaded, hasProgress, allComplete, currentWeek })

  const handleReset = () => {
    if (
      window.confirm(
        "Reset your progress for this course? Your completed weeks will be cleared. This cannot be undone.",
      )
    ) {
      reset()
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-foreground" aria-live="polite">
          {completedCount} of {totalLessons} weeks completed
        </p>
        <p className="text-sm text-muted-foreground">{percent}%</p>
      </div>

      <div
        className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalLessons}
        aria-valuenow={completedCount}
        aria-valuetext={`${completedCount} of ${totalLessons} weeks completed`}
      >
        <div
          className="h-full rounded-full bg-avanza-orange transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      {loaded && allComplete && (
        <p className="mt-4 text-sm font-semibold text-foreground">
          Course complete. You have finished all {totalLessons} weeks.
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href={scienceLessonPath(cta.slug)} className={orangeButton}>
          {cta.label}
        </Link>

        {loaded && hasProgress && (
          <button
            type="button"
            onClick={handleReset}
            className="text-sm font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-orange focus-visible:ring-offset-2"
          >
            Reset progress
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * The 6-week learning path with per-week completion status. Weeks are never
 * locked - every card links through - but the current week (the lowest one not
 * yet completed) is gently marked "Recommended next" once a student has started.
 */
export function ScienceWeekList() {
  const { loaded, status, currentWeek, hasProgress, allComplete } = useScienceProgress()

  return (
    <ol className="mt-8">
      {lessons.map((lesson, idx) => {
        const lessonStatus = status(lesson.week)
        const done = loaded && lessonStatus === "completed"
        const isRecommended = loaded && hasProgress && !allComplete && lesson.week === currentWeek
        const isLast = idx === lessons.length - 1

        const nodeClass = done
          ? "border-avanza-orange bg-avanza-orange text-white"
          : isRecommended
            ? "border-avanza-orange bg-background text-avanza-orange-dark ring-2 ring-avanza-orange/30"
            : "border-border bg-background text-muted-foreground"

        const statusClass =
          lessonStatus === "completed"
            ? "text-avanza-orange-dark"
            : lessonStatus === "in-progress"
              ? "text-foreground"
              : "text-muted-foreground"

        return (
          <li key={lesson.slug} className="flex items-stretch gap-4 pb-5 last:pb-0">
            {/* Sequence rail: a numbered node per week, joined by a line. */}
            <div className="flex flex-none flex-col items-center">
              <span
                className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border font-mono text-sm font-semibold ${nodeClass}`}
                aria-hidden
              >
                {done ? "✓" : lesson.week}
              </span>
              {!isLast && <span aria-hidden className="mt-1 w-px flex-1 bg-border" />}
            </div>

            <Link
              href={scienceLessonPath(lesson.slug)}
              className="group mb-0 block flex-1 rounded-lg border border-border bg-card p-5 transition-colors hover:border-avanza-orange"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-avanza-orange-dark">
                    Week {lesson.week}
                  </p>
                  {loaded && (
                    <span className={`text-xs font-medium ${statusClass}`}>
                      &middot; {STATUS_LABEL[lessonStatus]}
                    </span>
                  )}
                  {isRecommended && (
                    <span className="text-xs font-semibold text-foreground">
                      &middot; Recommended next
                    </span>
                  )}
                </div>
                <span className="flex-none text-sm font-semibold text-muted-foreground transition-colors group-hover:text-avanza-orange-dark">
                  {done ? "Review" : "Open"} &rarr;
                </span>
              </div>
              <h3 className="mt-1 text-lg font-bold text-foreground">{lesson.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{lesson.bigQuestion}</p>
              <dl className="mt-4 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Experiment
                  </dt>
                  <dd className="mt-0.5 text-foreground/90">{lesson.activityTitle}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Main idea
                  </dt>
                  <dd className="mt-0.5 text-foreground/90">{lesson.mainConcepts[0]}</dd>
                </div>
              </dl>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}

/** The Start / Continue / Review button used in the hub's closing call-to-action. */
export function ScienceResumeButton() {
  const { loaded, hasProgress, allComplete, currentWeek } = useScienceProgress()
  const cta = resolveCta({ loaded, hasProgress, allComplete, currentWeek })

  return (
    <Link href={scienceLessonPath(cta.slug)} className={orangeButton}>
      {cta.label}
    </Link>
  )
}

/**
 * Invisible marker dropped onto each lesson page. When a lesson is opened it
 * records that the week has been started, so the hub's status and "Continue"
 * button can resume at the right place. Renders nothing.
 */
export function ScienceLessonVisit({ week }: { week: number }) {
  const { loaded, markStarted } = useScienceProgress()

  useEffect(() => {
    if (loaded) markStarted(week)
  }, [loaded, week, markStarted])

  return null
}

/**
 * "Mark week complete" control shown near the bottom of a lesson. Completing a
 * week persists to localStorage and advances the hub's progress. Weeks are never
 * locked, so this only tracks progress - it does not gate anything. Disabled
 * until progress has loaded so it never acts on stale state.
 */
export function ScienceLessonComplete({ week }: { week: number }) {
  const { loaded, totalLessons, isCompleted, markComplete } = useScienceProgress()
  const done = isCompleted(week)
  const next = lessons.find((l) => l.week === week + 1) ?? null
  const isLast = week >= totalLessons

  return (
    <div className="print-hidden mt-12 rounded-md border border-border bg-secondary p-5">
      {done ? (
        <div>
          <p className="text-sm font-semibold text-foreground">
            <span aria-hidden className="font-mono text-avanza-orange-dark">[{"✓"}] </span>
            Week {week} completed
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {isLast
              ? "You have finished every week of the course. Your progress is saved on this device."
              : "Nice work. Your progress is saved on this device."}
          </p>
          <p className="mt-3 text-sm">
            {isLast ? (
              <Link
                href={`${scienceExperimentsPath}#complete`}
                className="font-semibold text-avanza-orange-dark underline underline-offset-2 hover:text-avanza-orange"
              >
                Go to your course reflection
              </Link>
            ) : next ? (
              <Link
                href={scienceLessonPath(next.slug)}
                className="font-semibold text-avanza-orange-dark underline underline-offset-2 hover:text-avanza-orange"
              >
                Continue to Week {next.week}: {next.title}
              </Link>
            ) : null}
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-muted-foreground">
            Finished the experiment and your reflection? Mark this week complete to track your
            progress through the {totalLessons}-week course.
          </p>
          <button
            type="button"
            onClick={() => markComplete(week)}
            disabled={!loaded}
            className={`mt-3 ${orangeButton} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            Mark Week {week} complete
          </button>
        </div>
      )}
    </div>
  )
}

/**
 * The end-of-course reflection area at the hub's #complete anchor. It always
 * shows the look-back reflection and next-step guidance so Week 6's "Finish the
 * course" link always lands somewhere meaningful. Once every week is marked
 * complete, it also shows a calm completion note, the four sentence-starter
 * prompts, and a clean printable certificate - no trophies or badges.
 */
export function ScienceCompletion() {
  const { loaded, allComplete, completedCount, totalLessons } = useScienceProgress()
  const done = loaded && allComplete

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-avanza-orange-dark">
        After week 6
      </p>
      <h2 className="mt-2 text-xl font-bold text-foreground md:text-2xl">{c.completion.title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {c.completion.summary}
      </p>

      {done ? (
        <div className="mt-8 rounded-lg border border-avanza-orange/40 bg-card p-6" id="science-certificate">
          <p className="text-sm font-semibold uppercase tracking-wide text-avanza-orange-dark">
            Course complete
          </p>
          <p className="mt-2 text-lg font-bold text-foreground md:text-xl">
            You completed the Science Experiments course.
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/90">
            Across six weeks you practiced the whole science loop: asking questions, making
            predictions, testing them with fair tests, observing closely, explaining your results
            with evidence, and improving your designs.
          </p>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-foreground">
            Finish these sentences
          </h3>
          <ul className="mt-3 space-y-3">
            {c.completion.finalPrompts.map((prompt) => (
              <li key={prompt}>
                <p className="text-sm font-medium text-foreground/90">{prompt}</p>
                <span aria-hidden className="mt-1 block border-b border-dashed border-border" />
              </li>
            ))}
          </ul>

          <div className="print-hidden mt-6">
            <CertificatePrintButton />
          </div>
        </div>
      ) : (
        <p className="mt-6 rounded-md border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          {loaded
            ? `You have completed ${completedCount} of ${totalLessons} weeks. Mark all six complete to unlock your course reflection and printable certificate.`
            : "Work through all six weeks, then come back here for your course reflection."}
        </p>
      )}

      <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-foreground">
        Look back and reflect
      </h3>
      <ul className="mt-3 space-y-2">
        {c.completion.reflectionPrompts.map((prompt) => (
          <li key={prompt} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-orange" />
            <span>{prompt}</span>
          </li>
        ))}
      </ul>

      <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-foreground">Keep exploring</h3>
      <ul className="mt-3 space-y-2">
        {c.completion.nextSteps.map((step) => (
          <li key={step} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-orange" />
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Prints just the completion certificate. Toggles a body class so the print
 * stylesheet can hide everything except the #science-certificate block, then
 * removes it after the dialog returns.
 */
function CertificatePrintButton() {
  const handlePrint = () => {
    document.body.classList.add("printing-certificate")
    const cleanup = () => {
      document.body.classList.remove("printing-certificate")
      window.removeEventListener("afterprint", cleanup)
    }
    window.addEventListener("afterprint", cleanup)
    window.print()
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="print-hidden inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-avanza-orange hover:text-avanza-orange-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-orange focus-visible:ring-offset-2"
    >
      Print a certificate
    </button>
  )
}

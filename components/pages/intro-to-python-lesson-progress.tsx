"use client"

import { useEffect } from "react"
import Link from "next/link"
import {
  introToPythonCurriculum,
  introToPythonPath,
  introToPythonWeekPath,
} from "@/features/curriculums/intro-to-python"
import { useIntroToPythonProgress } from "@/components/ui/useIntroToPythonProgress"

/**
 * Gates a lesson behind sequential unlocking. Week 1 is always open; later weeks
 * require the previous week to be complete (or the teacher "show all" override).
 *
 * To stay hydration-safe it renders `children` until progress has loaded from
 * localStorage - the server and first client render therefore match. Once
 * loaded, a locked lesson is replaced with a clear message instead of a broken
 * page, and an unlocked lesson is marked "started".
 */
export function IntroToPythonLessonGate({
  week,
  children,
}: {
  week: number
  children: React.ReactNode
}) {
  const { loaded, isUnlocked, markStarted } = useIntroToPythonProgress()
  const unlocked = isUnlocked(week)

  useEffect(() => {
    if (loaded && unlocked) markStarted(week)
  }, [loaded, unlocked, week, markStarted])

  if (loaded && !unlocked) {
    return <LockedNotice week={week} />
  }

  return <>{children}</>
}

function LockedNotice({ week }: { week: number }) {
  const total = introToPythonCurriculum.totalWeeks
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <nav className="text-sm">
          <Link
            href={introToPythonPath}
            className="font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
          >
            Intro to Python Programming
          </Link>
        </nav>
        <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Week {week} of {total}
        </p>
        <h1 className="mt-3 text-2xl font-extrabold text-foreground md:text-3xl">
          This lesson is locked
        </h1>
        <p className="mt-4 text-base leading-relaxed text-foreground/90">
          Complete the previous lesson first.
        </p>
        <div className="mt-6 flex flex-col gap-2 text-sm">
          {week > 1 && (
            <Link
              href={introToPythonWeekPath(week - 1)}
              className="font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
            >
              Go to Week {week - 1}
            </Link>
          )}
          <Link
            href={introToPythonPath}
            className="font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
          >
            Back to the curriculum overview
          </Link>
        </div>
      </div>
    </div>
  )
}

/**
 * "Mark lesson complete" control shown at the bottom of a lesson. Completing a
 * lesson persists to localStorage and unlocks the next week. Disabled until
 * progress has loaded so the button never acts on stale state.
 */
export function IntroToPythonLessonComplete({ week }: { week: number }) {
  const { loaded, totalWeeks, isCompleted, markComplete } = useIntroToPythonProgress()
  const done = isCompleted(week)
  const next = week < totalWeeks ? week + 1 : null

  return (
    <div className="mt-12 rounded-md border border-border bg-secondary p-5">
      {done ? (
        <div>
          <p className="text-sm font-semibold text-foreground">Lesson completed</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {next
              ? `Week ${next} is now unlocked.`
              : "You have finished every lesson in the curriculum."}
          </p>
          <p className="mt-3 text-sm">
            {next ? (
              <Link
                href={introToPythonWeekPath(next)}
                className="font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
              >
                Go to Week {next}
              </Link>
            ) : (
              <Link
                href={introToPythonPath}
                className="font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
              >
                Back to the curriculum overview
              </Link>
            )}
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-muted-foreground">
            Finished this lesson? Mark it complete to unlock the next week.
          </p>
          <button
            type="button"
            onClick={() => markComplete(week)}
            disabled={!loaded}
            className="mt-3 inline-flex items-center rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-avanza-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Mark lesson complete
          </button>
        </div>
      )}
    </div>
  )
}

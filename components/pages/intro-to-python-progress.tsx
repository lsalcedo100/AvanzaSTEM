"use client"

import Link from "next/link"
import {
  introToPythonCurriculum,
  introToPythonWeekPath,
} from "@/features/curriculums/intro-to-python"
import {
  type LessonStatus,
  useIntroToPythonProgress,
} from "@/components/ui/useIntroToPythonProgress"

const STATUS_LABEL: Record<LessonStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  "not-started": "Not started",
}

/**
 * Client-rendered weekly overview with local progress tracking: each week shows
 * a plain-text status, locked weeks are not linked, and a small footer offers a
 * progress reset and a teacher override to show all lessons. Progress is read
 * from localStorage after mount, so the server and first client render both use
 * the neutral default (no hydration mismatch).
 */
export function IntroToPythonProgress() {
  const c = introToPythonCurriculum
  const { loaded, totalWeeks, completedCount, showAll, status, isUnlocked, setShowAll, reset } =
    useIntroToPythonProgress()

  const handleReset = () => {
    if (
      window.confirm(
        "Reset your progress for this curriculum? Your completed lessons will be cleared. This cannot be undone.",
      )
    ) {
      reset()
    }
  }

  return (
    <div>
      <p className="text-sm font-semibold text-foreground" aria-live="polite">
        {completedCount} of {totalWeeks} lessons completed
      </p>

      <ol className="mt-6 divide-y divide-border border-t border-b border-border">
        {c.weeks.map((week) => {
          const unlocked = isUnlocked(week.week)
          const weekStatus = status(week.week)
          return (
            <li
              key={week.week}
              className="grid gap-x-6 gap-y-3 py-7 md:grid-cols-[5.5rem_1fr_auto]"
            >
              <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Week {week.week}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{week.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  {week.description}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Project:</span>{" "}
                  {week.projectName}
                  <span className="px-2 text-border">|</span>
                  {week.estimatedTime}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {STATUS_LABEL[weekStatus]}
                </p>
              </div>
              <div className="md:justify-self-end md:self-center">
                {unlocked ? (
                  <Link
                    href={introToPythonWeekPath(week.week)}
                    className="inline-flex items-center text-sm font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
                  >
                    {weekStatus === "completed"
                      ? "Review lesson"
                      : weekStatus === "in-progress"
                        ? "Continue lesson"
                        : "Start lesson"}
                  </Link>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Locked
                    <span className="mt-1 block text-xs">
                      Complete Week {week.week - 1} first
                    </span>
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleReset}
          disabled={!loaded}
          className="text-sm font-semibold text-muted-foreground underline underline-offset-2 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset progress
        </button>

        {showAll ? (
          <p className="text-sm text-muted-foreground">
            Showing all lessons (teacher mode).{" "}
            <button
              type="button"
              onClick={() => setShowAll(false)}
              className="font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
            >
              Turn off
            </button>
          </p>
        ) : (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            disabled={!loaded}
            className="text-left text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:text-right"
          >
            Show all lessons (for teachers)
          </button>
        )}
      </div>
    </div>
  )
}

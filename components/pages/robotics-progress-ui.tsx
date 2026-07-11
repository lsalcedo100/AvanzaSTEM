"use client"

import { useEffect } from "react"
import Link from "next/link"
import {
  getRoboticsModuleById,
  roboticsCurriculum,
  roboticsLessonPath,
  roboticsPath,
  type RoboticsModule,
} from "@/features/curriculums/robotics"
import { useRoboticsProgress } from "@/components/ui/useRoboticsProgress"
import { LESSON_STEP_LABELS } from "@/components/pages/robotics-lesson-steps"
import type {
  RoboticsModuleStatus,
  RoboticsRemainingTime,
} from "@/features/curriculums/robotics-progress"

const MODULES = [...roboticsCurriculum.modules].sort((a, b) => a.order - b.order)

const STATUS_LABEL: Record<RoboticsModuleStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  "not-started": "Not started",
  locked: "Locked",
}

const roboticsReviewPath = `${roboticsPath}/review`
const roboticsJournalPath = `${roboticsPath}/journal`

const greenButton =
  "inline-flex items-center rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"

const outlineButton =
  "inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-avanza-green-dark transition-colors hover:border-avanza-green hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"

/** The main Start / Continue / Review call-to-action, derived from live progress. */
function resolveCta(state: {
  loaded: boolean
  hasProgress: boolean
  complete: boolean
  resumePath: string
  resumeModuleId: string
}): { href: string; label: string } {
  if (!state.loaded || !state.hasProgress) {
    return { href: roboticsLessonPath(MODULES[0].slug), label: "Start Week 1" }
  }
  if (state.complete) {
    return { href: roboticsReviewPath, label: "Review the course" }
  }
  const resumeModule = getRoboticsModuleById(state.resumeModuleId)
  const label = resumeModule
    ? resumeModule.isFinal
      ? "Continue to the final project"
      : `Continue Week ${resumeModule.week}: ${resumeModule.title}`
    : "Continue"
  return { href: state.resumePath, label }
}

/**
 * The hub progress panel: an "X of N completed" count, a progress bar, the
 * Start / Continue / Review call-to-action, and quick links. Reads progress in
 * an effect after mount, so the server and first client render use the neutral
 * empty state - no hydration mismatch. Mirrors the other courses' progress UI.
 */
export function RoboticsCourseProgress() {
  const { loaded, completion, hasProgress, resume } = useRoboticsProgress()
  const cta = resolveCta({
    loaded,
    hasProgress,
    complete: completion.complete,
    resumePath: resume.path,
    resumeModuleId: resume.moduleId,
  })

  return (
    <div className="rounded-lg border border-border bg-card p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-foreground" aria-live="polite">
          {completion.completedCount} of {completion.total} weeks completed
        </p>
        <p className="text-sm text-muted-foreground">{completion.percent}%</p>
      </div>

      <div
        className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={completion.total}
        aria-valuenow={completion.completedCount}
        aria-valuetext={`${completion.completedCount} of ${completion.total} weeks completed`}
      >
        <div
          className="h-full rounded-full bg-avanza-green transition-all duration-500"
          style={{ width: `${completion.percent}%` }}
        />
      </div>

      {loaded && completion.complete && (
        <p className="mt-4 text-sm font-semibold text-foreground">
          Course complete. You have finished all {completion.total} weeks.
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href={cta.href} className={greenButton}>
          {cta.label}
        </Link>
        <Link href={roboticsReviewPath} className="text-sm font-medium text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green">
          Review area
        </Link>
        <Link href={roboticsJournalPath} className="text-sm font-medium text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green">
          Design journal
        </Link>
      </div>
    </div>
  )
}

/** A lighter Start / Continue / Review button used in the closing call-to-action. */
export function RoboticsResumeButton() {
  const { loaded, hasProgress, completion, resume } = useRoboticsProgress()
  const cta = resolveCta({
    loaded,
    hasProgress,
    complete: completion.complete,
    resumePath: resume.path,
    resumeModuleId: resume.moduleId,
  })
  return (
    <Link href={cta.href} className={greenButton}>
      {cta.label}
    </Link>
  )
}

/** Names the first incomplete prerequisite for a locked module. */
function firstMissingPrerequisite(module: RoboticsModule, completed: string[]): RoboticsModule | null {
  const missing = module.prerequisites.find((pre) => !completed.includes(pre.moduleId))
  return missing ? getRoboticsModuleById(missing.moduleId) ?? null : null
}

/** A short, plain summary of a week's required materials for the module list. */
function keyMaterials(module: RoboticsModule): string {
  const required = module.materials.filter((m) => !m.optional).map((m) => m.name)
  if (required.length === 0) return "No special materials"
  const shown = required.slice(0, 3).join(", ")
  return required.length > 3 ? `${shown}, and more` : shown
}

/** Formats an estimated-remaining-time record for display. */
function formatRemaining(remaining: RoboticsRemainingTime): string {
  if (remaining.weeksLeft === 0) return "You have completed every week."
  const weeks = `${remaining.weeksLeft} week${remaining.weeksLeft === 1 ? "" : "s"} left`
  const lowH = Math.max(1, Math.round(remaining.lowMinutes / 60))
  const highH = Math.max(lowH, Math.round(remaining.highMinutes / 60))
  const hours = lowH === highH ? `about ${lowH} hour${lowH === 1 ? "" : "s"}` : `about ${lowH}-${highH} hours`
  return `${weeks} · ${hours} of activities`
}

/**
 * The weekly module list with per-week status. Weeks unlock in order (each week
 * lists the earlier weeks it needs); a locked week explains the prerequisite and
 * links to it, and the teacher unlock-all override opens everything. Before
 * progress loads, every week is shown open so the page is usable without JS/state.
 */
export function RoboticsModuleList() {
  const { loaded, status, progress } = useRoboticsProgress()

  return (
    <ol className="mt-8 space-y-4">
      {MODULES.map((module) => {
        const moduleStatus = loaded ? status(module) : "not-started"
        const locked = moduleStatus === "locked"
        const noun = module.isFinal ? "final project" : "lesson"
        const action =
          moduleStatus === "completed"
            ? "Review"
            : moduleStatus === "in-progress"
              ? "Continue"
              : "Open"
        const missing = locked ? firstMissingPrerequisite(module, progress.completed) : null

        return (
          <li
            key={module.slug}
            className="rounded-lg border border-border p-5 transition-colors hover:border-avanza-green/60 md:p-6"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="md:pr-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm font-semibold text-muted-foreground">
                    {module.isFinal ? "Final" : `0${module.week}`}
                  </span>
                  <h3 className="text-lg font-bold text-foreground">{module.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">{module.summary}</p>

                <dl className="mt-4 space-y-1.5 text-sm">
                  <div className="flex gap-2">
                    <dt className="font-semibold text-foreground">Mission:</dt>
                    <dd className="text-muted-foreground">{module.mainMission}</dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                    <dt className="font-semibold text-foreground">Time &amp; parts:</dt>
                    <dd className="text-muted-foreground">
                      {module.estimatedTime} · {module.lessonFlow.length}-part lesson
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                    <dt className="font-semibold text-foreground">Key materials:</dt>
                    <dd className="text-muted-foreground">{keyMaterials(module)}</dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                    <dt className="font-semibold text-foreground">New ideas:</dt>
                    <dd className="text-muted-foreground">
                      {module.vocabulary.slice(0, 4).map((v) => v.term).join(", ")}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex-none md:self-center md:text-right">
                {loaded && (
                  <p
                    className={
                      "text-xs font-semibold uppercase tracking-wide " +
                      (moduleStatus === "completed"
                        ? "text-avanza-green-dark"
                        : moduleStatus === "in-progress"
                          ? "text-foreground"
                          : moduleStatus === "locked"
                            ? "text-muted-foreground"
                            : "text-muted-foreground")
                    }
                  >
                    {STATUS_LABEL[moduleStatus]}
                  </p>
                )}

                {locked ? (
                  <p className="mt-2 max-w-52 text-xs leading-relaxed text-muted-foreground md:text-right">
                    {missing ? (
                      <>
                        Finish{" "}
                        <Link
                          href={roboticsLessonPath(missing.slug)}
                          className="font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
                        >
                          Week {missing.week}
                        </Link>{" "}
                        first, or unlock all weeks below.
                      </>
                    ) : (
                      "Finish the earlier weeks first, or unlock all weeks below."
                    )}
                  </p>
                ) : (
                  <Link
                    href={roboticsLessonPath(module.slug)}
                    className="mt-2 inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-avanza-green-dark transition-colors hover:border-avanza-green hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
                  >
                    {loaded ? `${action} ${noun}` : `Open ${noun}`}
                  </Link>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

/**
 * Parent/teacher controls on the hub: unlock every week for review (bypassing
 * the normal one-at-a-time progression) and reset saved progress. Plain,
 * non-punitive wording. Disabled until progress loads so it never acts on stale
 * state.
 */
export function RoboticsTeacherControls() {
  const { loaded, unlockAll, hasProgress, setUnlockAll, resetCourse } = useRoboticsProgress()

  const handleReset = () => {
    if (
      window.confirm(
        "Reset your progress for this course? Completed weeks, saved programs, journal entries, and quiz scores on this device will be cleared. This cannot be undone.",
      )
    ) {
      resetCourse()
    }
  }

  // Turning the override ON needs a confirmation so it isn't triggered by
  // accident; turning it back off is harmless and immediate.
  const handleUnlockToggle = () => {
    if (unlockAll) {
      setUnlockAll(false)
      return
    }
    if (
      window.confirm(
        "Unlock all eight weeks now? This opens every week for review and skips the normal one-week-at-a-time progression. You can switch back to normal progression anytime.",
      )
    ) {
      setUnlockAll(true)
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <p className="text-sm font-semibold text-foreground">Parent &amp; teacher controls</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Progress is saved on this device only. By default each week unlocks once the week before it
        is complete. Completed weeks stay open for review.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleUnlockToggle}
          disabled={!loaded}
          aria-pressed={unlockAll}
          className={`${outlineButton} disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {unlockAll ? "Lock to normal progression" : "Unlock all weeks"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={!loaded || !hasProgress}
          className="text-sm font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
        >
          Reset progress
        </button>
      </div>
      {loaded && (
        <p className="mt-3 text-xs text-muted-foreground">
          {unlockAll
            ? "All weeks are unlocked and can be opened in any order."
            : "Weeks unlock in order as each one is completed."}
        </p>
      )}
    </div>
  )
}

/**
 * Wraps a lesson's body. When a week is locked (its prerequisites are not yet
 * complete and unlock-all is off), it explains which week to finish first and
 * links to it, instead of showing the lesson. Honors the teacher override. Marks
 * the lesson started once it is open. Server and first client render show the
 * children, so direct links work and there is no hydration flash of a locked
 * state.
 */
export function RoboticsLessonGate({
  module,
  children,
}: {
  module: RoboticsModule
  children: React.ReactNode
}) {
  const { loaded, isUnlocked, progress, markLessonStarted } = useRoboticsProgress()
  const unlocked = isUnlocked(module)

  useEffect(() => {
    if (loaded && unlocked) markLessonStarted(module.id)
  }, [loaded, unlocked, module.id, markLessonStarted])

  if (loaded && !unlocked) {
    const missing = firstMissingPrerequisite(module, progress.completed)
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Week {module.week}
        </p>
        <h1 className="mt-3 text-2xl font-extrabold text-foreground md:text-3xl">{module.title}</h1>
        <div className="mt-6 rounded-lg border border-border bg-secondary p-5">
          <p className="text-sm font-semibold text-foreground">This week isn&apos;t open yet.</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {missing ? (
              <>
                It builds on <span className="font-semibold text-foreground">Week {missing.week}: {missing.title}</span>.
                Finish that week first and this one will open.
              </>
            ) : (
              <>Finish the earlier weeks first and this one will open.</>
            )}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {missing && (
              <Link href={roboticsLessonPath(missing.slug)} className={greenButton}>
                Go to Week {missing.week}
              </Link>
            )}
            <Link
              href={roboticsPath}
              className="text-sm font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
            >
              Back to course overview
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            A parent or teacher can unlock every week from the course overview.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

/**
 * "Mark this week complete" control at the bottom of a lesson. Persists
 * completion (advancing the hub and unlocking the next week) and links on to the
 * next week or the review area. Disabled until progress loads.
 */
export function RoboticsLessonComplete({ module }: { module: RoboticsModule }) {
  const { loaded, isCompleted, markLessonComplete, moduleRequirements } = useRoboticsProgress()
  const done = isCompleted(module.id)
  const next = module.nextWeek.moduleId ? getRoboticsModuleById(module.nextWeek.moduleId) : null
  const requirements = moduleRequirements(module)
  const allMet = requirements.every((r) => r.done)

  return (
    <div className="mt-12 rounded-md border border-border bg-secondary p-5">
      {done ? (
        <div>
          <p className="text-sm font-semibold text-foreground">
            {module.isFinal ? "Final project complete" : `Week ${module.week} completed`}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {module.isFinal
              ? "You have finished the Robotics & Automation course."
              : "Nice work. Your progress is saved on this device."}
          </p>
          <p className="mt-3 text-sm">
            {next ? (
              <Link
                href={roboticsLessonPath(next.slug)}
                className="font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
              >
                Continue to Week {next.week}: {next.title}
              </Link>
            ) : (
              <Link
                href={roboticsReviewPath}
                className="font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
              >
                Go to the review area
              </Link>
            )}
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm font-semibold text-foreground">
            {module.isFinal ? "Finish the final project" : `Finish Week ${module.week}`}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete these to mark the week done and unlock the next one:
          </p>
          <ul className="mt-3 space-y-1.5">
            {requirements.map((req) => (
              <li key={req.id} className="flex items-start gap-2 text-sm">
                <span
                  aria-hidden
                  className={
                    "mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-sm border text-[10px] " +
                    (loaded && req.done
                      ? "border-avanza-green bg-avanza-green/10 text-avanza-green-dark"
                      : "border-border text-transparent")
                  }
                >
                  ✓
                </span>
                <span className={loaded && req.done ? "text-muted-foreground line-through" : "text-foreground/90"}>
                  {req.label}
                </span>
                <span className="sr-only">{loaded && req.done ? " (done)" : " (not done yet)"}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => markLessonComplete(module.id)}
            disabled={!loaded || !allMet}
            className={`mt-4 ${greenButton} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {module.isFinal ? "Mark final project complete" : "Mark week complete"}
          </button>
          {loaded && !allMet && (
            <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
              Finish the steps above to complete this week.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * The hub resume area: an "X of N weeks completed" bar, then either a Begin
 * course action (new students) or a Resume area showing the current week, the
 * next lesson step, and an estimate of the time left. When the course is
 * finished it points to the review area. All state comes from the progress hook;
 * server and first render use the neutral empty state so there is no hydration
 * mismatch.
 */
export function RoboticsResumeArea() {
  const { loaded, completion, hasProgress, resume, remaining } = useRoboticsProgress()
  const current = getRoboticsModuleById(resume.moduleId)
  const stepLabel =
    (resume.stepId ? LESSON_STEP_LABELS[resume.stepId] : undefined) ??
    current?.lessonFlow.find((f) => f.id === resume.stepId)?.title
  const started = loaded && hasProgress
  const complete = loaded && completion.complete

  return (
    <div className="rounded-lg border border-border bg-card p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-foreground" aria-live="polite">
          {completion.completedCount} of {completion.total} weeks completed
        </p>
        <p className="text-sm text-muted-foreground">{completion.percent}%</p>
      </div>

      <div
        className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={completion.total}
        aria-valuenow={completion.completedCount}
        aria-valuetext={`${completion.completedCount} of ${completion.total} weeks completed`}
      >
        <div
          className="h-full rounded-full bg-avanza-green transition-all duration-500 motion-reduce:transition-none"
          style={{ width: `${completion.percent}%` }}
        />
      </div>

      {!started && (
        <div className="mt-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            New here? Start with Week 1 - it needs no kit and takes about {MODULES[0].estimatedTime}.
          </p>
          <Link href={roboticsLessonPath(MODULES[0].slug)} className={`mt-4 ${greenButton}`}>
            Begin course
          </Link>
        </div>
      )}

      {started && !complete && current && (
        <div className="mt-5">
          <dl className="space-y-1.5 text-sm">
            <div className="flex gap-2">
              <dt className="font-semibold text-foreground">
                {current.isFinal ? "Up next:" : "Current week:"}
              </dt>
              <dd className="text-muted-foreground">
                {current.isFinal ? "Final project" : `Week ${current.week}: ${current.title}`}
              </dd>
            </div>
            {stepLabel && (
              <div className="flex gap-2">
                <dt className="font-semibold text-foreground">Pick up at:</dt>
                <dd className="text-muted-foreground">{stepLabel}</dd>
              </div>
            )}
            <div className="flex gap-2">
              <dt className="font-semibold text-foreground">Time left:</dt>
              <dd className="text-muted-foreground">{formatRemaining(remaining)}</dd>
            </div>
          </dl>
          <Link href={resume.path} className={`mt-4 ${greenButton}`}>
            Resume course
          </Link>
        </div>
      )}

      {complete && (
        <div className="mt-5">
          <p className="text-sm font-semibold text-foreground">
            Course complete. You have finished all {completion.total} weeks.
          </p>
          <Link href={roboticsReviewPath} className={`mt-4 ${greenButton}`}>
            Review the course
          </Link>
        </div>
      )}
    </div>
  )
}

/**
 * A preview of the Week 8 final project on the hub: its purpose, example mission
 * choices, the core requirements, what earlier weeks prepare, and whether it is
 * unlocked yet. The locked/available state comes from the real unlock rules.
 */
export function RoboticsFinalProjectPreview() {
  const { loaded, isUnlocked, progress } = useRoboticsProgress()
  const finalModule = MODULES.find((m) => m.isFinal)
  const fp = finalModule?.finalProject
  if (!finalModule || !fp) return null

  const unlocked = loaded ? isUnlocked(finalModule) : false
  const missing = firstMissingPrerequisite(finalModule, progress.completed)
  const coreRequirements = fp.requirements.filter((r) => r.required).slice(0, 6)

  return (
    <div className="rounded-lg border border-border p-5 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-bold text-foreground">{fp.title}</h3>
        {loaded && (
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {unlocked ? "Available" : "Unlocks after Week 7"}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{fp.overview}</p>

      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Example missions
          </p>
          <ul className="mt-2 space-y-1.5">
            {fp.missionChoices.map((choice) => (
              <li key={choice.id} className="flex gap-2 text-sm text-foreground/90">
                <span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-avanza-green" />
                <span>{choice.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Core requirements
          </p>
          <ul className="mt-2 space-y-1.5">
            {coreRequirements.map((req) => (
              <li key={req.id} className="flex gap-2 text-sm text-foreground/90">
                <span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-avanza-green" />
                <span>{req.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">Weeks 1-7 prepare you: </span>
        the base that moves, exact programs, sensors, loops and conditions, and testing all come
        together here.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        {loaded && unlocked ? (
          <Link href={`${roboticsPath}/final-project`} className={greenButton}>
            Open the final project
          </Link>
        ) : (
          <>
            <span className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-muted-foreground">
              Final project
            </span>
            <p className="text-xs text-muted-foreground">
              {missing
                ? `Finish Week ${missing.week} and the earlier weeks to unlock it.`
                : "Finish the earlier weeks to unlock it."}
            </p>
          </>
        )}
        <Link
          href={roboticsLessonPath(finalModule.slug)}
          className="text-sm font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
        >
          Preview Week {finalModule.week}
        </Link>
      </div>
    </div>
  )
}

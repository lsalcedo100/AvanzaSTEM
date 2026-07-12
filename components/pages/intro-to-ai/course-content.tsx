"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import {
  getLesson,
  introToAiCourse,
  introToAiLessonPath,
  introToAiPath,
  introToAiWeekPath,
} from "@/features/curriculums/intro-to-ai"
import type { CourseWeek } from "@/features/curriculums/intro-to-ai-types"
import { useIntroToAiProgress } from "@/components/ui/useIntroToAiProgress"
import { ConfirmDialog, SaveState } from "@/components/pages/intro-to-ai/ui"
import { IntroToAiVocabulary } from "@/components/pages/intro-to-ai/vocabulary"
import { IntroToAiNotes } from "@/components/pages/intro-to-ai/notes"
import { JourneyDiagram } from "@/components/pages/intro-to-ai/journey-diagram"

const c = introToAiCourse
const TOTAL_LESSONS = c.weeks.reduce((n, w) => n + w.lessons.length, 0)

type WeekStatus = "completed" | "in-progress" | "not-started"

const COURSE_PROMISE = [
  "Identify what AI is and is not",
  "Organize data and train simple models",
  "Test image-classification systems",
  "Build a rule-based chatbot and a recommendation system",
  "Investigate bias, privacy, and misinformation",
  "Design a responsible AI helper",
]

const MATERIALS = [
  { label: "A web browser", note: "on a school Chromebook, tablet, or laptop" },
  { label: "A keyboard, mouse, or touchscreen", note: "" },
  { label: "A notebook or printed worksheet", note: "optional" },
  { label: "Built-in fictional datasets", note: "included — no downloads" },
  { label: "A camera or image upload", note: "optional, only in some later activities" },
  { label: "No microphone required", note: "" },
  { label: "No external AI account required", note: "" },
]

export function IntroToAiCourseContent() {
  const p = useIntroToAiProgress()
  const started = p.loaded && p.percent > 0
  const completedLessons = c.weeks.reduce(
    (n, w) => n + w.lessons.filter((l) => p.progress.completedLessons.includes(l.id)).length,
    0,
  )
  const resumeLesson = getLesson(p.resume.week, p.resume.lessonSlug)
  const resumeHref = introToAiLessonPath(p.resume.week, p.resume.lessonSlug)

  return (
    <div className="bg-background">
      {/* A. Introduction + D. Primary action */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Course · Grades 5–8</p>
          <h1 className="mt-3 text-3xl font-extrabold text-foreground md:text-5xl">{c.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/90 md:text-lg">{c.subtitle}</p>

          <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            {[c.gradeRange, `${c.totalWeeks} weeks`, c.estimatedTotalTime, "No coding required", "Browser-based", "No camera or microphone", "Built-in datasets"].map(
              (fact, i) => (
                <li key={fact} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="text-border">|</span>}
                  <span className="font-medium text-foreground">{fact}</span>
                </li>
              ),
            )}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={resumeHref}
              className="inline-flex items-center gap-2 rounded-md bg-avanza-green px-6 py-3 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
            >
              {started ? `Continue Week ${p.resume.week}` : "Begin Course"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            {started && resumeLesson && (
              <span className="text-sm text-muted-foreground">
                Next up: <span className="font-medium text-foreground">{resumeLesson.title}</span>
              </span>
            )}
          </div>

          <div className="mt-10 rounded-lg border border-border bg-card p-5">
            <JourneyDiagram className="mx-auto aspect-[8/3] w-full max-w-xl" />
          </div>
        </div>
      </section>

      {/* F. Progress summary */}
      {started && (
        <section className="border-b border-border bg-secondary/30">
          <div className="mx-auto max-w-3xl px-6 py-8">
            <ProgressSummary p={p} completedLessons={completedLessons} resumeHref={resumeHref} resumeTitle={resumeLesson?.title} />
          </div>
        </section>
      )}

      {/* B. Course promise + C. Learning goals */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-3xl gap-10 px-6 py-14 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-foreground">What you&apos;ll do</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-foreground/90">
              {COURSE_PROMISE.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">What you&apos;ll be able to do</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-foreground/90">
              {c.learningOutcomes.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* E. Six-week roadmap */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h2 className="text-xl font-bold text-foreground">Six-week roadmap</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Every week is open — jump ahead to preview, or follow the path in order.
          </p>
          <ol className="mt-6 space-y-3">
            {c.weeks.map((w) => (
              <li key={w.id}>
                <RoadmapWeek week={w} p={p} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* J. Final-project preview */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <FinalProjectPreview />
        </div>
      </section>

      {/* G. Materials */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h2 className="text-xl font-bold text-foreground">What you need</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {MATERIALS.map((m) => (
              <li key={m.label} className="flex items-start gap-2 text-sm text-foreground/90">
                <Check className="mt-0.5 h-4 w-4 flex-none text-avanza-green-dark" aria-hidden />
                <span>
                  {m.label}
                  {m.note && <span className="text-muted-foreground"> — {m.note}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* H. Vocabulary reference */}
      <section id="vocabulary" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h2 className="text-xl font-bold text-foreground">Vocabulary reference</h2>
          <p className="mt-2 text-sm text-muted-foreground">Every key term from the course, with kid-friendly definitions.</p>
          <div className="mt-6">
            <IntroToAiVocabulary />
          </div>
        </div>
      </section>

      {/* I. Notes */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h2 className="text-xl font-bold text-foreground">Notes &amp; reflections</h2>
          <div className="mt-4">
            <IntroToAiNotes progress={p} />
          </div>
        </div>
      </section>

      {/* K. Reset + teacher controls */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-10">
          <ManageProgress p={p} />
        </div>
      </section>
    </div>
  )
}

/* -------------------------------- sections ------------------------------- */

function ProgressSummary({
  p,
  completedLessons,
  resumeHref,
  resumeTitle,
}: {
  p: ReturnType<typeof useIntroToAiProgress>
  completedLessons: number
  resumeHref: string
  resumeTitle?: string
}) {
  const savedLabel = p.savedAt ? formatSaved(p.savedAt) : null
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Your progress</h2>
        {savedLabel && <SaveState status="idle" idleHint={`Last saved ${savedLabel}`} />}
      </div>

      <div
        className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={p.percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${p.percent}% complete, ${completedLessons} of ${TOTAL_LESSONS} lessons`}
      >
        <div className="h-full rounded-full bg-avanza-green" style={{ width: `${p.percent}%` }} />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-foreground">
          <span className="font-bold">{p.percent}% complete</span>
          <span className="text-muted-foreground"> · {completedLessons} of {TOTAL_LESSONS} lessons</span>
          {resumeTitle && (
            <span className="text-muted-foreground"> · Current: Week {p.resume.week}, {resumeTitle}</span>
          )}
        </p>
        <Link
          href={resumeHref}
          className="inline-flex items-center gap-1 text-sm font-semibold text-avanza-green-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 rounded"
        >
          Continue <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  )
}

function RoadmapWeek({ week, p }: { week: CourseWeek; p: ReturnType<typeof useIntroToAiProgress> }) {
  const { completed, total } = p.weekCompletion(week.week)
  const status: WeekStatus =
    p.loaded && completed === total && total > 0
      ? "completed"
      : (p.loaded && completed > 0) || p.progress.lastVisited?.week === week.week
        ? "in-progress"
        : "not-started"
  const activityCount = week.lessons.filter((l) => l.activity).length

  const statusText = status === "completed" ? "Completed" : status === "in-progress" ? "In progress" : "Not started"
  const statusClass =
    status === "completed"
      ? "border-avanza-green/40 bg-avanza-green/10 text-avanza-green-dark"
      : status === "in-progress"
        ? "border-avanza-orange/40 bg-avanza-orange/10 text-avanza-orange-dark"
        : "border-border bg-secondary text-muted-foreground"

  // Not-started weeks are still available; link to the week overview. In-progress
  // links straight to the current lesson if it's in this week.
  const href =
    status === "in-progress" && p.progress.lastVisited?.week === week.week
      ? introToAiLessonPath(week.week, p.progress.lastVisited.lessonSlug)
      : introToAiWeekPath(week.week)

  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-lg border border-border p-4 transition-colors hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
    >
      <span
        className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border text-sm font-bold ${
          status === "completed" ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground"
        }`}
        aria-hidden
      >
        {status === "completed" ? <Check className="h-4 w-4" /> : week.week}
      </span>
      <span className="flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-bold text-foreground">
            Week {week.week}: {week.title}
          </span>
          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${statusClass}`}>
            {statusText}
          </span>
        </span>
        <span className="mt-1 block text-sm text-muted-foreground">{week.subtitle}</span>
        <span className="mt-2 block text-xs text-muted-foreground">
          {week.estimatedTime} · {week.lessons.length} lessons · {activityCount} activities
          {p.loaded && <span className="sr-only"> · {statusText}</span>}
        </span>
      </span>
      <ArrowRight className="mt-1 h-4 w-4 flex-none text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  )
}

function FinalProjectPreview() {
  const fp = c.finalProject
  const required = fp.requirements.filter((r) => r.required)
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-foreground">Final project preview</h2>
        <Link
          href={`${introToAiPath}/final-project`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-avanza-green-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 rounded"
        >
          Open the project studio <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">{fp.overview}</p>
      <p className="mt-2 text-xs text-muted-foreground">You can preview the project any time — you&apos;ll build it in Week 6.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Your project will include</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/90">
            {required.map((r) => (
              <li key={r.id}>{r.label}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Choose a direction</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground/90">
            {fp.choices.map((choice) => (
              <li key={choice.id}>
                <span className="font-medium text-foreground">{choice.name}</span> — {choice.scenario}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function ManageProgress({ p }: { p: ReturnType<typeof useIntroToAiProgress> }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [announce, setAnnounce] = useState("")

  const confirmReset = () => {
    p.reset()
    setDialogOpen(false)
    setAnnounce("Your progress for this course has been reset.")
  }

  return (
    <div className="rounded-lg border border-border p-5">
      <h2 className="text-sm font-bold text-foreground">Manage your progress</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Your progress, notes, and answers are saved only in this browser on this device. Nothing is sent anywhere, and no personal
        information is required.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          disabled={!p.loaded}
          className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-avanza-orange hover:text-avanza-orange-dark disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
        >
          Reset course progress
        </button>
        <SaveState status={p.saveStatus} idleHint="" />
      </div>

      <details className="mt-5 border-t border-border pt-4">
        <summary className="cursor-pointer text-sm font-semibold text-foreground">For teachers</summary>
        <label className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={p.progress.unlockAll}
            disabled={!p.loaded}
            onChange={(e) => p.setUnlock(e.target.checked)}
            className="h-4 w-4 rounded border-border text-avanza-green focus-visible:ring-avanza-green"
          />
          <span>Mark the course as unlocked for demos (also unlocks the completion page).</span>
        </label>
      </details>

      {/* Screen-reader announcement for reset result. */}
      <p className="sr-only" role="status" aria-live="polite">
        {announce}
      </p>

      <ConfirmDialog
        open={dialogOpen}
        destructive
        title="Reset course progress?"
        description="This erases your saved progress, notes, reflections, knowledge-check answers, final-project plan, and certificate for the Intro to Artificial Intelligence course on this device. Progress for other courses is not affected. This cannot be undone."
        confirmLabel="Reset this course"
        cancelLabel="Cancel"
        onConfirm={confirmReset}
        onCancel={() => setDialogOpen(false)}
      />
    </div>
  )
}

/** Human-friendly "last saved" without pulling in a date library. */
function formatSaved(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return "recently"
  return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
}

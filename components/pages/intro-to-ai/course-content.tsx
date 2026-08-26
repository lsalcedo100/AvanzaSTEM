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
import {
  Callout,
  CheckGrid,
  CourseButton,
  CourseActions,
  CourseClosing,
  CourseHero,
  CourseJumpNav,
  CourseSection,
  CourseShell,
  CourseTextLink,
  PhotoBand,
  StatRow,
  courseThemes,
} from "@/components/pages/courses/course-ui"

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
    <CourseShell theme={courseThemes.ai}>
      <CourseHero
        eyebrow="6-week AI course · Grades 5-8"
        title={c.title}
        lead={c.subtitle}
        facts={[
          { label: "Ages", value: c.gradeRange },
          { label: "Length", value: `${c.totalWeeks} weeks` },
          { label: "Total time", value: c.estimatedTotalTime },
          { label: "You need", value: "A browser" },
        ]}
        media={
          <div className="rounded-3xl bg-white p-6 shadow-[0_24px_60px_-24px_rgba(26,26,46,0.45)] ring-1 ring-black/5 sm:p-8">
            <JourneyDiagram className="mx-auto aspect-8/3 w-full" />
          </div>
        }
        mediaCaption="Six weeks from &ldquo;what even is AI?&rdquo; to designing a responsible AI helper of your own."
        note="No coding required. No camera, no microphone, and no external AI account."
      >
        <CourseActions>
          <CourseButton href={resumeHref}>
            {started ? `Continue Week ${p.resume.week}` : "Begin the course"}
          </CourseButton>
          <CourseTextLink href="#roadmap">See the six weeks</CourseTextLink>
        </CourseActions>
        {started && resumeLesson && (
          <p className="mt-4 text-sm font-semibold text-avanza-dark/70">
            Next up: <span className="text-avanza-dark">{resumeLesson.title}</span>
          </p>
        )}
      </CourseHero>

      <CourseJumpNav
        items={[
          { href: "#roadmap", label: "The 6 weeks" },
          { href: "#outcomes", label: "What you'll learn" },
          { href: "#final-project", label: "Final project" },
          { href: "#vocabulary", label: "Vocabulary" },
          { href: "#notes", label: "Your notes" },
        ]}
      />

      {/* Progress summary, once there is any. */}
      {started && (
        <section className="border-b border-border bg-[var(--c-tint)]">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="max-w-2xl">
              <ProgressSummary
                p={p}
                completedLessons={completedLessons}
                resumeHref={resumeHref}
                resumeTitle={resumeLesson?.title}
              />
            </div>
          </div>
        </section>
      )}

      {/* What students do, and what they can do afterwards. */}
      <CourseSection
        id="outcomes"
        eyebrow="What you'll do"
        title="You don't read about AI. You take it apart."
        lead="Every week students train, test, and break a real system - then work out why it behaved the way it did."
        aside={
          <StatRow
            stats={[
              { value: `${TOTAL_LESSONS}`, label: "Lessons" },
              { value: "0", label: "Lines of code" },
            ]}
          />
        }
      >
        <CheckGrid items={COURSE_PROMISE} />

        <h3 className="mt-14 text-2xl font-extrabold text-avanza-dark">
          What you&apos;ll be able to do by the end
        </h3>
        <div className="mt-6">
          <CheckGrid items={c.learningOutcomes} />
        </div>
      </CourseSection>

      {/* Real AI workshop photos. */}
      <CourseSection
        tone="tint"
        eyebrow="In the room"
        title="Avanza teaches this in person, too"
        lead="The course is the same one Avanza runs as a workshop in public libraries - the browser version just lets you do it at your own pace."
      >
        <PhotoBand
          photos={[
            {
              src: "/images/workshops/AI Workshop Description.JPG",
              alt: "An Avanza STEM instructor presenting an artificial intelligence workshop to students",
              caption:
                "Week 1 starts with the question every kid actually asks: what counts as AI?",
            },
            {
              src: "/images/shared/ai-workshop.jpg",
              alt: "Students taking part in an Avanza STEM artificial intelligence workshop",
              caption:
                "Students sort data, train a model, and find out where it gets things wrong.",
            },
            {
              src: "/images/workshops/past-coding.jpg",
              alt: "Students working on laptops at an Avanza STEM workshop",
              caption:
                "Everything runs in a browser tab on a Chromebook, tablet, or laptop.",
            },
          ]}
        />
      </CourseSection>

      {/* Roadmap. */}
      <CourseSection
        id="roadmap"
        eyebrow="The path"
        title="Six weeks, six systems"
        lead="Every week is open - jump ahead to preview, or follow the path in order."
      >
        <ol className="grid gap-4 lg:grid-cols-2">
          {c.weeks.map((w) => (
            <li key={w.id}>
              <RoadmapWeek week={w} p={p} />
            </li>
          ))}
        </ol>
      </CourseSection>

      {/* Final project. */}
      <CourseSection
        id="final-project"
        tone="band"
        eyebrow="Capstone"
        title="Design a responsible AI helper"
        lead={c.finalProject.overview}
      >
        <FinalProjectPreview />
      </CourseSection>

      {/* What you need. */}
      <CourseSection
        tone="tint"
        eyebrow="What you need"
        title="Almost certainly, you already have it"
      >
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <ul className="grid gap-x-10 border-t border-avanza-dark/10 sm:grid-cols-2">
            {MATERIALS.map((m) => (
              <li
                key={m.label}
                className="flex gap-4 border-b border-avanza-dark/10 py-4"
              >
                <Check
                  className="mt-1 h-4 w-4 flex-none text-[var(--c-accent)]"
                  strokeWidth={3}
                  aria-hidden
                />
                <span className="text-base leading-relaxed text-avanza-dark/85">
                  <span className="font-bold text-avanza-dark">{m.label}</span>
                  {m.note && <span className="text-avanza-dark/60"> - {m.note}</span>}
                </span>
              </li>
            ))}
          </ul>

          <div className="space-y-5">
            <Callout title="Nothing to install">
              Every activity runs in the browser using datasets built into the course. There is
              nothing to download and no external AI service involved.
            </Callout>
            <Callout title="Nothing leaves the device">
              Progress, notes, and answers are saved only in this browser. No account, no personal
              information, and nothing sent anywhere.
            </Callout>
          </div>
        </div>
      </CourseSection>

      {/* Vocabulary. */}
      <CourseSection
        id="vocabulary"
        eyebrow="Reference"
        title="Vocabulary"
        lead="Every key term from the course, defined in language a fifth grader can actually use."
      >
        <IntroToAiVocabulary />
      </CourseSection>

      {/* Notes. */}
      <CourseSection
        id="notes"
        tone="paper"
        eyebrow="Your work"
        title="Notes & reflections"
      >
        <div className="max-w-3xl">
          <IntroToAiNotes progress={p} />
          <div className="mt-8">
            <ManageProgress p={p} />
          </div>
        </div>
      </CourseSection>

      <CourseClosing
        title={started ? "Pick up where you left off" : "Ready to find out how AI actually works?"}
        description={
          started
            ? `You are ${p.percent}% through the course. Your notes and answers are saved on this device.`
            : "Start with Week 1 and work through all six weeks at your own pace. No account, no cost, nothing to install."
        }
      >
        <CourseButton href={resumeHref} className="bg-avanza-green text-avanza-dark">
          {started ? `Continue Week ${p.resume.week}` : "Begin the course"}
        </CourseButton>
      </CourseClosing>
    </CourseShell>
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
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
        <div>
          <h3 className="border-b-2 border-[var(--c-accent)] pb-2 text-base font-extrabold text-avanza-dark">
            Your project will include
          </h3>
          <ul className="mt-4 space-y-3">
            {required.map((r) => (
              <li key={r.id} className="flex gap-3 text-base leading-relaxed text-avanza-dark/85">
                <Check
                  className="mt-1 h-4 w-4 flex-none text-[var(--c-accent-dark)]"
                  strokeWidth={3}
                  aria-hidden
                />
                {r.label}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="border-b-2 border-[var(--c-accent)] pb-2 text-base font-extrabold text-avanza-dark">
            Choose a direction
          </h3>
          <ul className="mt-4 space-y-4">
            {fp.choices.map((choice) => (
              <li key={choice.id}>
                <p className="font-bold text-avanza-dark">{choice.name}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-avanza-dark/70">
                  {choice.scenario}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          href={`${introToAiPath}/final-project`}
          className="text-base font-bold text-avanza-dark underline decoration-[var(--c-accent)] decoration-2 underline-offset-[6px] transition-all hover:decoration-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
        >
          Open the project studio
        </Link>
        <p className="text-sm text-avanza-dark/60">
          You can preview the project any time — you&apos;ll build it in Week 6.
        </p>
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

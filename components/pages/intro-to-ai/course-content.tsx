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
import { useLanguage } from "@/components/providers/language-provider"
import { getIntroToAiCourse } from "@/features/curriculums/intro-to-ai-i18n"
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

const AI_PHOTO_SRCS = [
  "/images/workshops/AI Workshop Description.JPG",
  "/images/shared/ai-workshop.jpg",
  "/images/workshops/past-coding.jpg",
]

type WeekStatus = "completed" | "in-progress" | "not-started"

export function IntroToAiCourseContent() {
  const { language, t } = useLanguage()
  const c = getIntroToAiCourse(language)
  const totalLessons = c.weeks.reduce((n, w) => n + w.lessons.length, 0)
  const al = t.courseLanding.ai
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
        eyebrow={al.heroEyebrow}
        title={al.title}
        lead={al.lead}
        facts={al.facts}
        media={
          <div className="rounded-lg bg-white p-6 shadow-[0_24px_60px_-28px_rgba(26,26,46,0.5)] sm:p-10">
            <JourneyDiagram className="mx-auto aspect-8/3 w-full" />
          </div>
        }
        mediaCaption={al.mediaCaption}
        note={al.note}
      >
        <CourseActions>
          <CourseButton href={resumeHref}>
            {started ? al.continueWeekTpl.replace("{n}", String(p.resume.week)) : al.beginBtn}
          </CourseButton>
          <CourseTextLink href="#roadmap">{al.seeWeeksBtn}</CourseTextLink>
        </CourseActions>
        {started && resumeLesson && (
          <p className="mt-4 text-sm font-semibold text-avanza-dark/70">
            {al.nextUpLabel} <span className="text-avanza-dark">{resumeLesson.title}</span>
          </p>
        )}
      </CourseHero>

      <CourseJumpNav
        label={t.courseLanding.onThisPage}
        items={[
          { href: "#roadmap", label: al.jumpNav[0] },
          { href: "#outcomes", label: al.jumpNav[1] },
          { href: "#final-project", label: al.jumpNav[2] },
          { href: "#vocabulary", label: al.jumpNav[3] },
          { href: "#notes", label: al.jumpNav[4] },
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
        eyebrow={al.outcomesEyebrow}
        title={al.outcomesTitle}
        lead={al.outcomesLead}
        aside={
          <StatRow
            stats={[
              { value: `${totalLessons}`, label: al.statLessons },
              { value: "0", label: al.statCode },
            ]}
          />
        }
      >
        <CheckGrid items={al.coursePromise} />

        <h3 className="mt-14 text-2xl font-extrabold text-avanza-dark">{al.byEndTitle}</h3>
        <div className="mt-6">
          <CheckGrid items={al.learningOutcomes} />
        </div>
      </CourseSection>

      {/* Real AI workshop photos. */}
      <CourseSection tone="tint" eyebrow={al.photosEyebrow} title={al.photosTitle} lead={al.photosLead}>
        <PhotoBand
          photos={al.photos.map((photo, i) => ({
            src: AI_PHOTO_SRCS[i],
            alt: photo.alt,
            caption: photo.caption,
          }))}
        />
      </CourseSection>

      {/* Roadmap. */}
      <CourseSection id="roadmap" eyebrow={al.roadmapEyebrow} title={al.roadmapTitle} lead={al.roadmapLead}>
        <ol className="grid gap-4 lg:grid-cols-2">
          {c.weeks.map((w) => (
            <li key={w.id}>
              <RoadmapWeek week={w} p={p} />
            </li>
          ))}
        </ol>
      </CourseSection>

      {/* Final project. */}
      <CourseSection id="final-project" tone="band" eyebrow={al.finalEyebrow} title={al.finalTitle} lead={al.finalLead}>
        <FinalProjectPreview />
      </CourseSection>

      {/* What you need. */}
      <CourseSection tone="tint" eyebrow={al.needEyebrow} title={al.needTitle}>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <ul className="grid gap-x-10 border-t border-avanza-dark/10 sm:grid-cols-2">
            {al.materials.map((m) => (
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
            <Callout title={al.calloutInstallTitle}>{al.calloutInstallBody}</Callout>
            <Callout title={al.calloutDeviceTitle}>{al.calloutDeviceBody}</Callout>
          </div>
        </div>
      </CourseSection>

      {/* Vocabulary. */}
      <CourseSection id="vocabulary" eyebrow={al.vocabularyEyebrow} title={al.vocabularyTitle} lead={al.vocabularyLead}>
        <IntroToAiVocabulary />
      </CourseSection>

      {/* Notes. */}
      <CourseSection id="notes" tone="paper" eyebrow={al.notesEyebrow} title={al.notesTitle}>
        <div className="max-w-3xl">
          <IntroToAiNotes progress={p} />
          <div className="mt-8">
            <ManageProgress p={p} />
          </div>
        </div>
      </CourseSection>

      <CourseClosing
        title={started ? al.closingStartedTitle : al.closingTitle}
        description={
          started
            ? al.closingStartedDescTpl.replace("{percent}", String(p.percent))
            : al.closingDesc
        }
        backLabel={t.courseLanding.backToCurriculums}
      >
        <CourseButton href={resumeHref} className="bg-avanza-green text-avanza-dark">
          {started ? al.continueWeekTpl.replace("{n}", String(p.resume.week)) : al.beginBtn}
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
  const { language, t } = useLanguage()
  const al = t.courseLanding.ai
  const totalLessons = getIntroToAiCourse(language).weeks.reduce(
    (n, w) => n + w.lessons.length,
    0,
  )
  const savedLabel = p.savedAt ? formatSaved(p.savedAt) : null
  const percentText = al.percentCompleteTpl.replace("{percent}", String(p.percent))
  const lessonsText = al.lessonsCountTpl
    .replace("{done}", String(completedLessons))
    .replace("{total}", String(totalLessons))
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-bold text-avanza-dark/55">{al.progressTitle}</h2>
        {savedLabel && <SaveState status="idle" idleHint={al.lastSavedTpl.replace("{x}", savedLabel)} />}
      </div>

      <div
        className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={p.percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${percentText}, ${lessonsText}`}
      >
        <div className="h-full rounded-full bg-avanza-green" style={{ width: `${p.percent}%` }} />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-foreground">
          <span className="font-bold">{percentText}</span>
          <span className="text-muted-foreground"> · {lessonsText}</span>
          {resumeTitle && (
            <span className="text-muted-foreground"> · {al.currentTpl.replace("{n}", String(p.resume.week)).replace("{title}", resumeTitle)}</span>
          )}
        </p>
        <Link
          href={resumeHref}
          className="inline-flex items-center gap-1 text-sm font-semibold text-avanza-green-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 rounded"
        >
          {al.continueLink} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  )
}

function RoadmapWeek({ week, p }: { week: CourseWeek; p: ReturnType<typeof useIntroToAiProgress> }) {
  const { t } = useLanguage()
  const al = t.courseLanding.ai
  const { completed, total } = p.weekCompletion(week.week)
  const status: WeekStatus =
    p.loaded && completed === total && total > 0
      ? "completed"
      : (p.loaded && completed > 0) || p.progress.lastVisited?.week === week.week
        ? "in-progress"
        : "not-started"
  const activityCount = week.lessons.filter((l) => l.activity).length

  const statusText = status === "completed" ? al.statusCompleted : status === "in-progress" ? al.statusInProgress : al.statusNotStarted
  const weekCopy = al.weeks[week.week - 1]
  const statusClass =
    status === "completed"
      ? "text-avanza-green-dark"
      : status === "in-progress"
        ? "text-avanza-orange-dark"
        : "text-avanza-dark/45"

  // Not-started weeks are still available; link to the week overview. In-progress
  // links straight to the current lesson if it's in this week.
  const href =
    status === "in-progress" && p.progress.lastVisited?.week === week.week
      ? introToAiLessonPath(week.week, p.progress.lastVisited.lessonSlug)
      : introToAiWeekPath(week.week)

  return (
    <Link
      href={href}
      className="group flex items-start gap-5 border-t-2 border-avanza-dark/10 py-5 transition-colors hover:border-[var(--c-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
    >
      <span
        aria-hidden
        className="font-mono text-2xl font-bold leading-none text-[var(--c-accent)]"
      >
        {status === "completed" ? <Check className="h-6 w-6" strokeWidth={3} /> : String(week.week).padStart(2, "0")}
      </span>
      <span className="flex-1">
        <span className="block text-lg font-extrabold text-avanza-dark underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-[var(--c-accent)]">
          {al.weekLabelTpl.replace("{n}", String(week.week)).replace("{title}", weekCopy.title)}
        </span>
        <span className="mt-1 block text-base leading-relaxed text-avanza-dark/70">
          {weekCopy.subtitle}
        </span>
        <span className="mt-2 block text-sm text-avanza-dark/50">
          {al.weekMetaTpl
            .replace("{time}", week.estimatedTime)
            .replace("{lessons}", String(week.lessons.length))
            .replace("{activities}", String(activityCount))}{" "}
          ·{" "}
          <span className={`font-semibold ${statusClass}`}>{statusText}</span>
        </span>
      </span>
    </Link>
  )
}

function FinalProjectPreview() {
  const { language, t } = useLanguage()
  const al = t.courseLanding.ai
  const fp = getIntroToAiCourse(language).finalProject
  const required = fp.requirements
    .map((r, i) => ({ r, label: al.requirementLabels[i] }))
    .filter(({ r }) => r.required)
  return (
    <div>
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
        <div>
          <h3 className="border-b-2 border-[var(--c-accent)] pb-2 text-base font-extrabold text-avanza-dark">
            {al.projectIncludeHeading}
          </h3>
          <ul className="mt-4 space-y-3">
            {required.map(({ r, label }) => (
              <li key={r.id} className="flex gap-3 text-base leading-relaxed text-avanza-dark/85">
                <Check
                  className="mt-1 h-4 w-4 flex-none text-[var(--c-accent-dark)]"
                  strokeWidth={3}
                  aria-hidden
                />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="border-b-2 border-[var(--c-accent)] pb-2 text-base font-extrabold text-avanza-dark">
            {al.chooseDirectionHeading}
          </h3>
          <ul className="mt-4 space-y-4">
            {fp.choices.map((choice, i) => (
              <li key={choice.id}>
                <p className="font-bold text-avanza-dark">{al.choices[i].name}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-avanza-dark/70">
                  {al.choices[i].scenario}
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
          {al.openStudioLink}
        </Link>
        <p className="text-sm text-avanza-dark/60">{al.previewNote}</p>
      </div>
    </div>
  )
}

function ManageProgress({ p }: { p: ReturnType<typeof useIntroToAiProgress> }) {
  const { t } = useLanguage()
  const al = t.courseLanding.ai
  const [dialogOpen, setDialogOpen] = useState(false)
  const [announce, setAnnounce] = useState("")

  const confirmReset = () => {
    p.reset()
    setDialogOpen(false)
    setAnnounce(al.resetAnnounce)
  }

  return (
    <div className="rounded-lg border border-border p-5">
      <h2 className="text-sm font-bold text-foreground">{al.manageTitle}</h2>
      <p className="mt-1 text-xs text-muted-foreground">{al.manageBody}</p>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          disabled={!p.loaded}
          className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-avanza-orange hover:text-avanza-orange-dark disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
        >
          {al.resetBtn}
        </button>
        <SaveState status={p.saveStatus} idleHint="" />
      </div>

      <details className="mt-5 border-t border-border pt-4">
        <summary className="cursor-pointer text-sm font-semibold text-foreground">{al.forTeachers}</summary>
        <label className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={p.progress.unlockAll}
            disabled={!p.loaded}
            onChange={(e) => p.setUnlock(e.target.checked)}
            className="h-4 w-4 rounded border-border text-avanza-green focus-visible:ring-avanza-green"
          />
          <span>{al.unlockLabel}</span>
        </label>
      </details>

      {/* Screen-reader announcement for reset result. */}
      <p className="sr-only" role="status" aria-live="polite">
        {announce}
      </p>

      <ConfirmDialog
        open={dialogOpen}
        destructive
        title={al.dialogTitle}
        description={al.dialogDesc}
        confirmLabel={al.dialogConfirm}
        cancelLabel={al.dialogCancel}
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

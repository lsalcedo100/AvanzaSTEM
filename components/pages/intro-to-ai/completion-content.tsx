"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { getIntroToAiCourse } from "@/features/curriculums/intro-to-ai/i18n"

import Link from "next/link"
import { introToAiLessonPath, introToAiPath } from "@/features/curriculums/intro-to-ai"
import { courseCompletionRequirements, finalProjectComplete } from "@/features/curriculums/intro-to-ai/progress"
import { computeSkillStates, summarizeSkills, skillDefs, statusLabels, type SkillStatus } from "@/features/curriculums/intro-to-ai/skills"
import { FINAL_REFLECTION_IDS } from "@/features/curriculums/intro-to-ai/mission"
import { useIntroToAiProgress } from "@/components/ui/useIntroToAiProgress"
import { Breadcrumbs } from "@/components/pages/intro-to-ai/shared"
import type { Translations } from "@/i18n/translations"

/** Related STEM courses already on the site, for next steps. */
const relatedCourses = (C: CompletionStrings) => [
  { name: C.relRobotics, href: "/courses/robotics" },
  { name: C.relEngineering, href: "/courses/engineering-fundamentals" },
  { name: C.relScience, href: "/courses/science-experiments" },
]

type CompletionStrings = Translations["courseUi"]["ai"]["completion"]

/** The completion-page chrome in the reader's language. */
function useC(): CompletionStrings {
  return useLanguage().t.courseUi.ai.completion
}

export function IntroToAiCompletionContent() {
  const { language, t } = useLanguage()
  const S = t.courseUi.ai.shared
  const C = t.courseUi.ai.completion
  const course = getIntroToAiCourse(language)
  const p = useIntroToAiProgress()

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        <div className="print-hidden">
          <Breadcrumbs trail={[{ label: S.courseTitle, href: introToAiPath }, { label: C.completionCrumb }]} />
        </div>

        {!p.loaded ? (
          <p className="mt-8 text-sm text-muted-foreground">{S.loadingProgress}</p>
        ) : p.complete ? (
          <Complete p={p} />
        ) : (
          <NotYet p={p} />
        )}
      </div>
    </div>
  )
}

function NotYet({ p }: { p: ReturnType<typeof useIntroToAiProgress> }) {
  const { language, t } = useLanguage()
  const C = t.courseUi.ai.completion
  const M = t.courseUi.ai.mission
  const course = getIntroToAiCourse(language)
  const reqs = courseCompletionRequirements(p.progress, course)
  const resumeHref = introToAiLessonPath(p.resume.week, p.resume.lessonSlug)

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">{C.almostThere}</h1>
      <p className="mt-3 text-base leading-relaxed text-foreground/90">{C.almostThereIntro}</p>

      <ul className="mt-6 space-y-3" aria-live="polite">
        {reqs.map((r) => (
          <Requirement key={r.id} met={r.met} label={r.label} />
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={resumeHref} className={primaryLink}>{C.keepLearning}</Link>
        <Link href={`${introToAiPath}/final-assessment`} className={outlineLink}>{M.missionTitle}</Link>
        <Link href={`${introToAiPath}/final-project`} className={outlineLink}>{C.finalProject}</Link>
      </div>
    </div>
  )
}

const primaryLink = "inline-flex items-center rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
const outlineLink = "inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"

function Requirement({ met, label }: { met: boolean; label: string }) {
  const C = useC()
  return (
    <li className="flex items-start gap-3 rounded-md border border-border p-3 text-sm">
      <span className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border text-xs font-bold ${met ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground"}`} aria-hidden>
        {met ? "✓" : ""}
      </span>
      <span className={met ? "text-foreground" : "text-muted-foreground"}>
        {label}
        <span className="sr-only">{met ? C.srDone : C.srNotDone}</span>
      </span>
    </li>
  )
}

const STATUS_TONE: Record<SkillStatus, string> = {
  demonstrated: "border-avanza-green/50 bg-avanza-green/10 text-avanza-green-dark",
  developing: "border-avanza-purple/40 bg-avanza-purple/5 text-avanza-purple-dark",
  "review-recommended": "border-avanza-orange/50 bg-avanza-orange/10 text-avanza-orange-dark",
  "not-attempted": "border-border bg-secondary text-muted-foreground",
}

function Complete({ p }: { p: ReturnType<typeof useIntroToAiProgress> }) {
  const { language, t } = useLanguage()
  const C = t.courseUi.ai.completion
  const M = t.courseUi.ai.mission
  const STATUS_LABEL = statusLabels(t.courseUi.ai.skills)
  const course = getIntroToAiCourse(language)
  const name = p.progress.certificate.studentName
  const projectDone = finalProjectComplete(p.progress)
  const skillStates = computeSkillStates(p.progress, course, projectDone, skillDefs(t.courseUi.ai.skills))
  const skillCounts = summarizeSkills(skillStates)
  const weeksComplete = course.weeks.filter((w) => w.lessons.every((l) => p.progress.completedLessons.includes(l.id))).length
  const reflectionsSaved = FINAL_REFLECTION_IDS.filter((id) => (p.progress.reflections[id] ?? "").trim().length > 0).length

  const printCertificate = () => {
    const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40)
    const prev = document.title
    document.title = `Intro-to-AI-Certificate${slug ? `-${slug}` : ""}`
    window.print()
    document.title = prev
  }

  return (
    <div className="mt-8">
      <div className="print-hidden">
        <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">{C.youFinished}</h1>
        <p className="mt-3 text-base leading-relaxed text-foreground/90">{C.youFinishedIntro}</p>

        {/* Recap */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat
            label={C.weeksCompleted}
            value={C.ofTotal
              .replace("{done}", String(weeksComplete))
              .replace("{total}", String(course.weeks.length))}
          />
          <Stat
            label={C.skillsDemonstrated}
            value={C.ofTotal
              .replace("{done}", String(skillCounts.demonstrated))
              .replace("{total}", String(skillStates.length))}
          />
          <Stat label={C.finalProject} value={projectDone ? C.statComplete : C.statInProgress} />
        </div>

        {/* Skill review */}
        <section aria-label={C.skillReview} className="mt-8">
          <h2 className="text-xl font-bold text-foreground">{C.yourSkills}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{C.yourSkillsIntro}</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {skillStates.map((s) => (
              <li key={s.skill.id} className="flex items-start justify-between gap-2 rounded-md border border-border p-3">
                <span className="text-sm text-foreground">{s.skill.label}</span>
                <span className={`flex-none rounded-full border px-2 py-0.5 text-xs font-semibold ${STATUS_TONE[s.status]}`}>{STATUS_LABEL[s.status]}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Final project summary */}
        <section aria-label={C.finalProject} className="mt-8 rounded-md border border-border p-4">
          <h2 className="text-sm font-bold text-foreground">{C.yourFinalProject}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{projectDone ? C.projectDoneNote : C.projectOpenNote}</p>
          <Link href={`${introToAiPath}/final-project`} className="mt-2 inline-block text-sm font-semibold text-avanza-green-dark underline-offset-2 hover:underline">{C.openStudio}</Link>
        </section>

        {/* Certificate form */}
        <div className="mt-8 max-w-sm">
          <label htmlFor="cert-name" className="block text-sm font-medium text-foreground">{C.certNameLabel}</label>
          <input
            id="cert-name"
            type="text"
            defaultValue={name}
            onBlur={(e) => p.claimCertificate(e.target.value)}
            placeholder={C.certNamePlaceholder}
            className="mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
          />
          <p className="mt-1 text-xs text-muted-foreground">{C.certNameNote}</p>
        </div>
        <div className="mt-4">
          <button type="button" onClick={printCertificate} className={`${outlineLink} print-hidden`}>{C.printCertificate}</button>
        </div>
      </div>

      {/* Printable certificate */}
      <div className="mt-8 rounded-xl border-2 border-avanza-green/40 bg-card p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{C.certificateOfCompletion}</p>
        <p className="mt-6 text-sm text-muted-foreground">{C.thisCertifies}</p>
        <p className="mt-2 text-2xl font-extrabold text-foreground">{name || "________________"}</p>
        <p className="mt-4 text-sm text-muted-foreground">{C.hasCompleted}</p>
        <p className="mt-1 text-xl font-bold text-foreground">{course.title}</p>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">{course.gradeRange} · {course.duration}</p>

        <div className="mx-auto mt-6 max-w-lg text-left">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{C.skillsDemonstrated}</p>
          <ul className="mt-2 grid gap-1 text-sm text-foreground sm:grid-cols-2">
            {skillStates.filter((s) => s.status === "demonstrated").length > 0
              ? skillStates.filter((s) => s.status === "demonstrated").map((s) => <li key={s.skill.id}>{s.skill.label}</li>)
              : course.skills.map((s) => <li key={s.id}>{s.label}</li>)}
          </ul>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">{C.certFooter}</p>
      </div>

      {/* Next steps */}
      <div className="mt-8 print-hidden">
        <h2 className="text-xl font-bold text-foreground">{C.nextSteps}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {C.reflectionsSaved
            .replace("{done}", String(reflectionsSaved))
            .replace("{total}", String(FINAL_REFLECTION_IDS.length))}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {relatedCourses(C).map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="rounded-md border border-border px-3 py-1.5 text-sm font-semibold text-foreground hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={introToAiPath} className={outlineLink}>{C.backToOverview}</Link>
          <Link href={`${introToAiPath}/final-assessment`} className={outlineLink}>{C.revisitMission}</Link>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-extrabold text-foreground">{value}</p>
    </div>
  )
}

"use client"

import Link from "next/link"
import { introToAiCourse, introToAiLessonPath, introToAiPath } from "@/features/curriculums/intro-to-ai"
import { courseCompletionRequirements, finalProjectComplete } from "@/features/curriculums/intro-to-ai-progress"
import { computeSkillStates, summarizeSkills, STATUS_LABEL, type SkillStatus } from "@/features/curriculums/intro-to-ai-skills"
import { FINAL_REFLECTION_PROMPTS } from "@/features/curriculums/intro-to-ai-mission"
import { useIntroToAiProgress } from "@/components/ui/useIntroToAiProgress"
import { Breadcrumbs } from "@/components/pages/intro-to-ai/shared"

/** Related STEM courses already on the site, for next steps. */
const RELATED_COURSES = [
  { name: "Robotics & Automation", href: "/courses/robotics" },
  { name: "Engineering Fundamentals", href: "/courses/engineering-fundamentals" },
  { name: "Science Experiments", href: "/courses/science-experiments" },
]

export function IntroToAiCompletionContent() {
  const p = useIntroToAiProgress()

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        <div className="print-hidden">
          <Breadcrumbs trail={[{ label: "Intro to AI", href: introToAiPath }, { label: "Completion" }]} />
        </div>

        {!p.loaded ? (
          <p className="mt-8 text-sm text-muted-foreground">Loading your progress…</p>
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
  const reqs = courseCompletionRequirements(p.progress, introToAiCourse)
  const resumeHref = introToAiLessonPath(p.resume.week, p.resume.lessonSlug)

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">Almost there</h1>
      <p className="mt-3 text-base leading-relaxed text-foreground/90">
        Your certificate unlocks once you finish these. You don&apos;t need a perfect score — just to work through each part.
      </p>

      <ul className="mt-6 space-y-3" aria-live="polite">
        {reqs.map((r) => (
          <Requirement key={r.id} met={r.met} label={r.label} />
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={resumeHref} className={primaryLink}>Keep learning</Link>
        <Link href={`${introToAiPath}/final-assessment`} className={outlineLink}>AI Review Mission</Link>
        <Link href={`${introToAiPath}/final-project`} className={outlineLink}>Final project</Link>
      </div>
    </div>
  )
}

const primaryLink = "inline-flex items-center rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
const outlineLink = "inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"

function Requirement({ met, label }: { met: boolean; label: string }) {
  return (
    <li className="flex items-start gap-3 rounded-md border border-border p-3 text-sm">
      <span className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border text-xs font-bold ${met ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground"}`} aria-hidden>
        {met ? "✓" : ""}
      </span>
      <span className={met ? "text-foreground" : "text-muted-foreground"}>
        {label}
        <span className="sr-only">{met ? " — done" : " — not done"}</span>
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
  const name = p.progress.certificate.studentName
  const projectDone = finalProjectComplete(p.progress)
  const skillStates = computeSkillStates(p.progress, introToAiCourse, projectDone)
  const skillCounts = summarizeSkills(skillStates)
  const weeksComplete = introToAiCourse.weeks.filter((w) => w.lessons.every((l) => p.progress.completedLessons.includes(l.id))).length
  const reflectionsSaved = FINAL_REFLECTION_PROMPTS.filter((r) => (p.progress.reflections[r.id] ?? "").trim().length > 0).length

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
        <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">You finished the course</h1>
        <p className="mt-3 text-base leading-relaxed text-foreground/90">
          You completed all six weeks, reviewed a real AI product, and built your own project. Here&apos;s a recap and your certificate.
        </p>

        {/* Recap */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat label="Weeks completed" value={`${weeksComplete} of ${introToAiCourse.weeks.length}`} />
          <Stat label="Skills demonstrated" value={`${skillCounts.demonstrated} of ${skillStates.length}`} />
          <Stat label="Final project" value={projectDone ? "Complete" : "In progress"} />
        </div>

        {/* Skill review */}
        <section aria-label="Skill review" className="mt-8">
          <h2 className="text-xl font-bold text-foreground">Your skills</h2>
          <p className="mt-1 text-sm text-muted-foreground">Learning isn&apos;t one score. Each skill shows where you are — and what to revisit.</p>
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
        <section aria-label="Final project" className="mt-8 rounded-md border border-border p-4">
          <h2 className="text-sm font-bold text-foreground">Your final project</h2>
          <p className="mt-1 text-sm text-muted-foreground">{projectDone ? "Complete — review or print your project report." : "Still open — finish it in the studio."}</p>
          <Link href={`${introToAiPath}/final-project`} className="mt-2 inline-block text-sm font-semibold text-avanza-green-dark underline-offset-2 hover:underline">Open the project studio →</Link>
        </section>

        {/* Certificate form */}
        <div className="mt-8 max-w-sm">
          <label htmlFor="cert-name" className="block text-sm font-medium text-foreground">Your name (optional, for the certificate)</label>
          <input
            id="cert-name"
            type="text"
            defaultValue={name}
            onBlur={(e) => p.claimCertificate(e.target.value)}
            placeholder="Type a name, or leave blank"
            className="mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
          />
          <p className="mt-1 text-xs text-muted-foreground">Optional. Saved only on this device and used only to print your certificate — no full legal name needed.</p>
        </div>
        <div className="mt-4">
          <button type="button" onClick={printCertificate} className={`${outlineLink} print-hidden`}>Print certificate</button>
        </div>
      </div>

      {/* Printable certificate */}
      <div className="mt-8 rounded-xl border-2 border-avanza-green/40 bg-card p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Certificate of Completion</p>
        <p className="mt-6 text-sm text-muted-foreground">This certifies that</p>
        <p className="mt-2 text-2xl font-extrabold text-foreground">{name || "________________"}</p>
        <p className="mt-4 text-sm text-muted-foreground">has completed the six-week course</p>
        <p className="mt-1 text-xl font-bold text-foreground">{introToAiCourse.title}</p>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">{introToAiCourse.gradeRange} · {introToAiCourse.duration}</p>

        <div className="mx-auto mt-6 max-w-lg text-left">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Skills demonstrated</p>
          <ul className="mt-2 grid gap-1 text-sm text-foreground sm:grid-cols-2">
            {skillStates.filter((s) => s.status === "demonstrated").length > 0
              ? skillStates.filter((s) => s.status === "demonstrated").map((s) => <li key={s.skill.id}>{s.skill.label}</li>)
              : introToAiCourse.skills.map((s) => <li key={s.id}>{s.label}</li>)}
          </ul>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">Avanza STEM · Intro to Artificial Intelligence</p>
      </div>

      {/* Next steps */}
      <div className="mt-8 print-hidden">
        <h2 className="text-xl font-bold text-foreground">Next steps</h2>
        <p className="mt-1 text-sm text-muted-foreground">{reflectionsSaved} of {FINAL_REFLECTION_PROMPTS.length} final reflections saved. Explore more STEM courses on the site:</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {RELATED_COURSES.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="rounded-md border border-border px-3 py-1.5 text-sm font-semibold text-foreground hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={introToAiPath} className={outlineLink}>Back to course overview</Link>
          <Link href={`${introToAiPath}/final-assessment`} className={outlineLink}>Revisit the AI Review Mission</Link>
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

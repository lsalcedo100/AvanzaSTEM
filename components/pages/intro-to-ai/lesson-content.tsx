"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import type { Lesson, LessonSection } from "@/features/curriculums/intro-to-ai-types"
import {
  introToAiLessonPath,
  introToAiPath,
  introToAiWeekPath,
  lessonNeighbors,
  lessonSections,
} from "@/features/curriculums/intro-to-ai"
import { lessonRequirements, lessonRequirementsMet } from "@/features/curriculums/intro-to-ai-progress"
import { useIntroToAiProgress } from "@/components/ui/useIntroToAiProgress"
import { IntroToAiKnowledgeCheck } from "@/components/pages/intro-to-ai/knowledge-check"
import { Breadcrumbs, VisualBlock } from "@/components/pages/intro-to-ai/shared"
import { ActivityBriefing } from "@/components/pages/intro-to-ai/activity-frame"
import { renderActivity } from "@/components/pages/intro-to-ai/activity-registry"
import { IntroToAiPrediction } from "@/components/pages/intro-to-ai/prediction"
import { IntroToAiReflection } from "@/components/pages/intro-to-ai/reflection"
import { IntroToAiWorkedExample } from "@/components/pages/intro-to-ai/worked-example"
import { SaveState } from "@/components/pages/intro-to-ai/ui"

export function IntroToAiLessonContent({ week, lesson }: { week: number; lesson: Lesson }) {
  const p = useIntroToAiProgress()
  const { prev, next } = lessonNeighbors(week, lesson.slug)
  const sections = lessonSections(lesson)
  const done = p.isLessonComplete(lesson.id)
  const requirements = lessonRequirements(p.progress, lesson)
  const canComplete = lessonRequirementsMet(p.progress, lesson)
  const requiredMaterials = lesson.materials.filter((m) => !m.optional)

  // Record the visit so "Resume" returns here. Runs once the hook has loaded.
  const { loaded, startLesson } = p
  useEffect(() => {
    if (loaded) startLesson(lesson.id, week, lesson.slug)
  }, [loaded, startLesson, lesson.id, week, lesson.slug])

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Breadcrumbs
            trail={[
              { label: "Intro to AI", href: introToAiPath },
              { label: `Week ${week}`, href: introToAiWeekPath(week) },
              { label: lesson.title },
            ]}
          />
          <Link
            href={introToAiPath}
            className="text-sm font-semibold text-avanza-green-dark underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 rounded"
          >
            Return to course
          </Link>
        </div>

        {/* Lesson header — compact, not sticky, readable on mobile. */}
        <header className="mt-6 border-b border-border pb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Week {week} · Lesson {lesson.order} · {lesson.estimatedTime}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">{lesson.title}</h1>
          <p className="mt-3 text-base leading-relaxed text-foreground/90">{lesson.summary}</p>

          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Materials</dt>
              <dd className="mt-1 text-foreground">{requiredMaterials.map((m) => m.name).join(" · ")}</dd>
            </div>
            <div className="sm:text-right">
              <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">This lesson</dt>
              <dd className="mt-1 inline-flex items-center gap-2 sm:justify-end">
                {done ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-avanza-green-dark">
                    <Check className="h-4 w-4" aria-hidden /> Complete
                  </span>
                ) : (
                  <span className="text-muted-foreground">In progress</span>
                )}
                <span aria-hidden className="text-border">|</span>
                <SaveState status={p.saveStatus} idleHint="Auto-saves on this device" />
              </dd>
            </div>
          </dl>
        </header>

        <div className="mt-10 space-y-12">
          {sections.map((section, i) => (
            <SectionBlock key={sectionKey(section, i)} section={section} progress={p} />
          ))}
        </div>

        {/* Transparent completion + navigation */}
        <div className="mt-14 border-t border-border pt-8">
          <div className="rounded-lg border border-border p-5">
            <h2 className="text-sm font-bold text-foreground">Finish this lesson</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {requirements.map((r) => (
                <li key={r.id} className="flex items-start gap-2">
                  <span
                    className={`mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full border text-[10px] font-bold ${
                      r.met ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground"
                    }`}
                    aria-hidden
                  >
                    {r.met ? "✓" : ""}
                  </span>
                  <span className={r.met ? "text-foreground" : "text-muted-foreground"}>
                    {r.label}
                    <span className="sr-only">{r.met ? " — done" : " — not done"}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => (done ? p.uncompleteLesson(lesson.id) : p.completeLesson(lesson.id))}
                disabled={!p.loaded || (!done && !canComplete)}
                aria-pressed={done}
                className={
                  done
                    ? "inline-flex items-center gap-2 rounded-md border border-avanza-green bg-avanza-green/10 px-5 py-2.5 text-sm font-bold text-avanza-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
                    : "inline-flex items-center gap-2 rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
                }
              >
                {done ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden /> Lesson complete — undo
                  </>
                ) : (
                  "Mark lesson complete"
                )}
              </button>
              {!done && !canComplete && (
                <p className="text-xs text-muted-foreground">Attempt the knowledge check to finish this lesson.</p>
              )}
            </div>
          </div>

          <nav aria-label="Lesson navigation" className="mt-8 flex items-stretch justify-between gap-4">
            {prev ? (
              <Link
                href={introToAiLessonPath(prev.week, prev.lesson.slug)}
                className="group flex max-w-[48%] flex-col rounded-md border border-border px-4 py-3 text-left transition-colors hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
              >
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Previous lesson
                </span>
                <span className="mt-1 text-sm font-semibold text-foreground">{prev.lesson.title}</span>
              </Link>
            ) : (
              <Link
                href={introToAiWeekPath(week)}
                className="group flex max-w-[48%] flex-col rounded-md border border-border px-4 py-3 text-left transition-colors hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
              >
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Back
                </span>
                <span className="mt-1 text-sm font-semibold text-foreground">Week {week} overview</span>
              </Link>
            )}
            {next ? (
              <Link
                href={introToAiLessonPath(next.week, next.lesson.slug)}
                className="group flex max-w-[48%] flex-col items-end rounded-md border border-border px-4 py-3 text-right transition-colors hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
              >
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                  {next.week !== week ? "Next week" : "Next lesson"} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="mt-1 text-sm font-semibold text-foreground">{next.lesson.title}</span>
              </Link>
            ) : (
              <Link
                href={`${introToAiPath}/final-assessment`}
                className="group flex max-w-[48%] flex-col items-end rounded-md border border-border px-4 py-3 text-right transition-colors hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
              >
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                  Next <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="mt-1 text-sm font-semibold text-foreground">Final assessment</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}

function sectionKey(section: LessonSection, i: number): string {
  switch (section.kind) {
    case "concept":
      return section.concept.id
    case "visual":
      return section.visual.id
    case "worked-example":
      return section.example.id
    case "activity":
      return section.activity.id
    case "knowledge-check":
      return section.check.id
    case "challenge":
      return section.challenge.id
    case "recap":
      return section.recap.id
    case "extension":
      return section.extension.id
    case "opening":
      return section.scenario.id
    case "prediction":
      return section.prompt.id
    default:
      return `${section.kind}-${i}`
  }
}

const H2 = "text-xl font-bold text-foreground"
const KICKER = "text-xs font-bold uppercase tracking-wide text-avanza-green-dark"

function SectionBlock({
  section,
  progress,
}: {
  section: LessonSection
  progress: ReturnType<typeof useIntroToAiProgress>
}) {
  switch (section.kind) {
    case "objectives":
      return (
        <section aria-label="Learning objectives">
          <p className={KICKER}>What you&apos;ll be able to do</p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-foreground">
            {section.objectives.map((o) => (
              <li key={o.id}>{o.text}</li>
            ))}
          </ul>
        </section>
      )
    case "opening":
      return (
        <section aria-label="Opening question">
          <p className={KICKER}>Think about it</p>
          <p className="mt-2 text-lg font-semibold text-foreground">{section.scenario.prompt}</p>
          {section.scenario.context && <p className="mt-2 text-sm text-muted-foreground">{section.scenario.context}</p>}
        </section>
      )
    case "prediction":
      return <IntroToAiPrediction prompt={section.prompt} progress={progress} />
    case "vocabulary":
      return (
        <section aria-label="Vocabulary">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className={H2}>Vocabulary</h2>
            <Link
              href={`${introToAiPath}#vocabulary`}
              className="text-xs font-semibold text-avanza-green-dark underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 rounded"
            >
              See the full course vocabulary
            </Link>
          </div>
          <dl className="mt-3 space-y-3">
            {section.terms.map((t) => (
              <div key={t.id} className="rounded-md border border-border bg-card p-4">
                <dt className="text-sm font-bold text-foreground">{t.term}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{t.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      )
    case "concept":
      return (
        <section aria-label={section.concept.title}>
          <h2 className={H2}>{section.concept.title}</h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/90">
            {section.concept.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          {section.concept.examples && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {section.concept.examples.map((ex, i) => (
                <li key={i}>{ex}</li>
              ))}
            </ul>
          )}
          {section.concept.misconception && (
            <p className="mt-3 rounded-md border-l-2 border-avanza-orange/60 bg-avanza-orange/5 px-4 py-2 text-sm text-foreground">
              <span className="font-semibold text-avanza-orange-dark">Common mix-up: </span>
              {section.concept.misconception}
            </p>
          )}
        </section>
      )
    case "worked-example":
      return <IntroToAiWorkedExample example={section.example} />
    case "visual":
      return (
        <section aria-label={section.visual.title}>
          <VisualBlock visual={section.visual} />
        </section>
      )
    case "activity": {
      const interactive = renderActivity({ activity: section.activity, progress })
      return (
        <section aria-label={section.activity.title}>
          <p className={KICKER}>Activity</p>
          <div className="mt-2">{interactive ?? <ActivityBriefing activity={section.activity} />}</div>
        </section>
      )
    }
    case "knowledge-check": {
      const saved = progress.progress.knowledgeChecks[section.check.id]
      return (
        <section aria-label="Knowledge check">
          <h2 className={H2}>Check your understanding</h2>
          <div className="mt-3">
            <IntroToAiKnowledgeCheck
              key={`${section.check.id}:${progress.loaded}`}
              instructions={section.check.instructions}
              questions={section.check.questions}
              passThreshold={section.check.passThreshold}
              loaded={progress.loaded}
              savedAnswers={saved?.answers}
              onSave={(answers) => progress.saveQuiz(section.check.id, section.check.questions, answers)}
            />
          </div>
        </section>
      )
    }
    case "challenge":
      return (
        <section aria-label={section.challenge.title}>
          <p className={KICKER}>Try it yourself</p>
          <h2 className={`mt-1 ${H2}`}>{section.challenge.title}</h2>
          <p className="mt-2 text-sm text-foreground">{section.challenge.prompt}</p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-foreground">
            {section.challenge.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
          <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">Success looks like</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {section.challenge.successCriteria.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      )
    case "reflection":
      return <IntroToAiReflection prompts={section.prompts} progress={progress} />
    case "recap":
      return (
        <section aria-label="Recap" className="rounded-lg border border-border bg-secondary/40 p-5">
          <p className={KICKER}>Recap</p>
          <p className="mt-2 text-sm font-medium text-foreground">{section.recap.summary}</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {section.recap.keyPoints.map((k, i) => (
              <li key={i}>{k}</li>
            ))}
          </ul>
        </section>
      )
    case "extension":
      return (
        <section aria-label={section.extension.title} className="rounded-lg border border-avanza-purple/30 bg-avanza-purple/5 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-avanza-purple-dark">Grades 7–8 extension</p>
          <h2 className={`mt-1 ${H2}`}>{section.extension.title}</h2>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-foreground/90">
            {section.extension.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>
      )
  }
}

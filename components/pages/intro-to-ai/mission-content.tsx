"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { introToAiCourse, introToAiLessonPath, introToAiPath } from "@/features/curriculums/intro-to-ai"
import { isCorrect } from "@/features/curriculums/intro-to-ai-quiz"
import {
  MISSION_ID,
  MISSION_SCENARIO,
  MISSION_QUESTIONS,
  MISSION_SECTIONS,
  MISSION_PASS_THRESHOLD,
  RECOMMENDATION_DECISIONS,
  REASON_FIELDS,
  FINAL_REFLECTION_PROMPTS,
  parseRecommendation,
  evaluateRecommendation,
  type RecommendationAnswer,
  type RecommendationDecision,
} from "@/features/curriculums/intro-to-ai-mission"
import { SKILLS } from "@/features/curriculums/intro-to-ai-skills"
import { useIntroToAiProgress } from "@/components/ui/useIntroToAiProgress"
import { IntroToAiKnowledgeCheck } from "@/components/pages/intro-to-ai/knowledge-check"
import { Breadcrumbs } from "@/components/pages/intro-to-ai/shared"

/** Find a lesson's week + slug by id, for "review this" links. */
function lessonLocation(lessonId: string): { week: number; slug: string } | null {
  for (const w of introToAiCourse.weeks) {
    const l = w.lessons.find((x) => x.id === lessonId)
    if (l) return { week: w.week, slug: l.slug }
  }
  return null
}
function skillReviewLink(skillId: string | undefined) {
  const skill = SKILLS.find((s) => s.id === skillId)
  const loc = skill && lessonLocation(skill.lessonIds[0])
  return skill && loc ? { label: skill.label, href: introToAiLessonPath(loc.week, loc.slug) } : null
}

export function IntroToAiFinalAssessmentContent() {
  const p = useIntroToAiProgress()
  const saved = p.progress.assessment
  const [rec, setRec] = useState<RecommendationAnswer>(() => parseRecommendation(undefined))
  const recRef = useRef(false)
  const announceRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (p.loaded && !recRef.current) {
      recRef.current = true
      setRec(parseRecommendation(p.progress.activities[MISSION_ID]))
    }
  }, [p.loaded, p.progress.activities])

  const saveRec = (next: RecommendationAnswer) => {
    setRec(next)
    p.saveActivity(MISSION_ID, JSON.stringify(next))
  }
  const recEval = evaluateRecommendation(rec)

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        <Breadcrumbs trail={[{ label: "Intro to AI", href: introToAiPath }, { label: "AI Review Mission" }]} />
        <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

        <header className="mt-6 border-b border-border pb-6">
          <h1 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">AI Review Mission</h1>
          <p className="mt-3 text-base leading-relaxed text-foreground/90">
            You&apos;re on a review board checking a fictional AI product before it launches. Answer the questions, then write your recommendation. This is for your learning — there are no grades, nothing is sent anywhere, and you can retry any part.
          </p>
          <p className="mt-3 rounded-md border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground"><span className="font-semibold">The product:</span> {MISSION_SCENARIO}</p>
          {p.loaded && saved && (
            <p className="mt-3 text-sm font-medium text-muted-foreground" aria-live="polite">
              Your last attempt: {saved.score} of {saved.total} concept questions correct.
            </p>
          )}
        </header>

        {/* Section overview */}
        <ol className="mt-6 grid gap-2 sm:grid-cols-2">
          {MISSION_SECTIONS.map((s) => (
            <li key={s.id} className="rounded-md border border-border p-3 text-sm">
              <span className="font-bold text-foreground">{s.id}. {s.title}</span>
              <span className="mt-0.5 block text-muted-foreground">{s.description}</span>
            </li>
          ))}
        </ol>

        {/* Objective questions (A–D) */}
        <div className="mt-8">
          <IntroToAiKnowledgeCheck
            key={`mission:${p.loaded}`}
            instructions={`Answer all ${MISSION_QUESTIONS.length} questions across sections A–D. ${MISSION_PASS_THRESHOLD} correct is a strong pass — but you don't need a perfect score to finish the course.`}
            questions={MISSION_QUESTIONS}
            passThreshold={MISSION_PASS_THRESHOLD}
            loaded={p.loaded}
            savedAnswers={saved?.answers}
            saveLabel="Save my answers"
            onSave={(answers) => {
              p.saveAssessment(MISSION_QUESTIONS, answers)
              announceRef.current && (announceRef.current.textContent = "Answers saved. See your strengths and what to review below.")
            }}
          />
        </div>

        {/* Feedback: strengths + concepts to review (after an attempt) */}
        {p.loaded && saved && <FeedbackPanel answers={saved.answers} />}

        {/* E · Written recommendation */}
        <section aria-label="Written recommendation" className="mt-10 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-foreground">E · Your recommendation</h2>
          <p className="mt-1 text-sm text-muted-foreground">Any of these can be the right call — what matters is your reasoning. Don&apos;t include private information.</p>

          <fieldset className="mt-4">
            <legend className="text-sm font-semibold text-foreground">Decision</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {RECOMMENDATION_DECISIONS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  aria-pressed={rec.decision === d.id}
                  onClick={() => saveRec({ ...rec, decision: d.id as RecommendationDecision })}
                  className={`rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${rec.decision === d.id ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground hover:text-foreground"}`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-4 space-y-4">
            {REASON_FIELDS.map((f) => (
              <div key={f.id}>
                <label htmlFor={`rec-${f.id}`} className="block text-sm font-semibold text-foreground">{f.label}</label>
                <p className="text-xs text-muted-foreground">{f.hint}</p>
                <textarea
                  id={`rec-${f.id}`}
                  value={rec.reasons[f.id] ?? ""}
                  onChange={(e) => saveRec({ ...rec, reasons: { ...rec.reasons, [f.id]: e.target.value } })}
                  rows={2}
                  className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm" aria-live="polite">
            {recEval.complete ? (
              <span className="font-semibold text-avanza-green-dark">Your recommendation covers a decision and all six reasons.</span>
            ) : (
              <span className="text-muted-foreground">
                {recEval.hasDecision ? "Decision chosen" : "Choose a decision"} · {REASON_FIELDS.length - recEval.missing.length} of {REASON_FIELDS.length} reasons written.
              </span>
            )}
          </p>
        </section>

        {/* Final reflection */}
        <section aria-label="Final reflection" className="mt-10 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-foreground">Final reflection</h2>
          <p className="mt-1 text-sm text-muted-foreground">Saved on this device. Don&apos;t include private information.</p>
          <div className="mt-4 space-y-4">
            {FINAL_REFLECTION_PROMPTS.map((r) => (
              <div key={r.id}>
                <label htmlFor={`fr-${r.id}`} className="block text-sm font-medium text-foreground">{r.prompt}</label>
                <textarea
                  id={`fr-${r.id}`}
                  key={`fr-${r.id}:${p.loaded}`}
                  defaultValue={p.progress.reflections[r.id] ?? ""}
                  onBlur={(e) => p.setReflection(r.id, e.target.value)}
                  rows={2}
                  className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
                />
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={`${introToAiPath}/completion`} className="inline-flex items-center rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2">
            Go to completion & certificate
          </Link>
          <Link href={introToAiPath} className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2">
            Course overview
          </Link>
        </div>
      </div>
    </div>
  )
}

function FeedbackPanel({ answers }: { answers: Record<string, string> }) {
  const sections = MISSION_SECTIONS.map((s) => {
    const qs = s.questionIds.map((id) => MISSION_QUESTIONS.find((q) => q.id === id)!).filter(Boolean)
    const correct = qs.filter((q) => isCorrect(q, answers[q.id])).length
    return { section: s, qs, correct, total: qs.length }
  })
  const strengths = sections.filter((s) => s.correct === s.total)
  const toReview = sections.filter((s) => s.correct < s.total)
  const reviewLinks = toReview.flatMap((s) => s.qs.filter((q) => !isCorrect(q, answers[q.id])).map((q) => skillReviewLink(q.skillId)).filter(Boolean))
  const uniqueLinks = Array.from(new Map(reviewLinks.map((l) => [l!.href, l!])).values())

  return (
    <div className="mt-6 rounded-lg border border-border bg-secondary/30 p-5" aria-live="polite">
      <p className="text-sm font-bold text-foreground">Your feedback</p>
      <div className="mt-2 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-avanza-green-dark">Strengths</p>
          {strengths.length > 0 ? (
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-foreground">
              {strengths.map((s) => <li key={s.section.id}>{s.section.title} — all correct</li>)}
            </ul>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">Keep going — read the explanations and try again.</p>
          )}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-avanza-orange-dark">Concepts to review</p>
          {toReview.length > 0 ? (
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-foreground">
              {toReview.map((s) => <li key={s.section.id}>{s.section.title} ({s.correct}/{s.total})</li>)}
            </ul>
          ) : (
            <p className="mt-1 text-sm text-avanza-green-dark">Every section is complete — nicely done.</p>
          )}
        </div>
      </div>
      {uniqueLinks.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Lessons that can help</p>
          <ul className="mt-1 flex flex-wrap gap-2">
            {uniqueLinks.map((l) => (
              <li key={l!.href}>
                <Link href={l!.href} className="rounded-md border border-border px-2.5 py-1 text-xs font-semibold text-avanza-green-dark hover:border-avanza-green/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1">
                  Review: {l!.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">This is just for your learning — no ranking, no comparison with anyone else. Use “Try the check again” above to retry.</p>
    </div>
  )
}

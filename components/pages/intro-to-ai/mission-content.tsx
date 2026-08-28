"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { getIntroToAiCourse } from "@/features/curriculums/intro-to-ai/i18n"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { introToAiCourse, introToAiLessonPath, introToAiPath } from "@/features/curriculums/intro-to-ai"
import { isCorrect } from "@/features/curriculums/intro-to-ai/quiz"
import {
  MISSION_ID,
  MISSION_PASS_THRESHOLD,
  missionScenario,
  missionQuestions,
  missionSections,
  recommendationDecisions,
  reasonFields,
  finalReflectionPrompts,
  parseRecommendation,
  evaluateRecommendation,
  type MissionStrings,
  type RecommendationAnswer,
  type RecommendationDecision,
} from "@/features/curriculums/intro-to-ai/mission"
import { skillDefs, type SkillStrings } from "@/features/curriculums/intro-to-ai/skills"
import { useIntroToAiProgress } from "@/components/ui/useIntroToAiProgress"
import { IntroToAiKnowledgeCheck } from "@/components/pages/intro-to-ai/knowledge-check"
import { Breadcrumbs } from "@/components/pages/intro-to-ai/shared"

/**
 * Find a lesson's week + slug by id, for "review this" links.
 *
 * Reads the English base deliberately: this only produces route parts, and week
 * numbers and slugs are shared across locales, so there is nothing to localize.
 */
function lessonLocation(lessonId: string): { week: number; slug: string } | null {
  for (const w of introToAiCourse.weeks) {
    const l = w.lessons.find((x) => x.id === lessonId)
    if (l) return { week: w.week, slug: l.slug }
  }
  return null
}
function skillReviewLink(skillId: string | undefined, K: SkillStrings) {
  const skill = skillDefs(K).find((s) => s.id === skillId)
  const loc = skill && lessonLocation(skill.lessonIds[0])
  return skill && loc ? { label: skill.label, href: introToAiLessonPath(loc.week, loc.slug) } : null
}

export function IntroToAiFinalAssessmentContent() {
  const { language, t } = useLanguage()
  const S = t.courseUi.ai.shared
  const M = t.courseUi.ai.mission
  const MISSION_QUESTIONS = missionQuestions(M)
  const MISSION_SECTIONS = missionSections(M)
  const RECOMMENDATION_DECISIONS = recommendationDecisions(M)
  const REASON_FIELDS = reasonFields(M)
  const FINAL_REFLECTION_PROMPTS = finalReflectionPrompts(M)
  const course = getIntroToAiCourse(language)
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
        <Breadcrumbs trail={[{ label: S.courseTitle, href: introToAiPath }, { label: M.missionTitle }]} />
        <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

        <header className="mt-6 border-b border-border pb-6">
          <h1 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">{M.missionTitle}</h1>
          <p className="mt-3 text-base leading-relaxed text-foreground/90">
            {M.missionIntro}
          </p>
          <p className="mt-3 rounded-md border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground"><span className="font-semibold">{M.theProduct}</span> {missionScenario(M)}</p>
          {p.loaded && saved && (
            <p className="mt-3 text-sm font-medium text-muted-foreground" aria-live="polite">
              {M.lastAttempt
                .replace("{score}", String(saved.score))
                .replace("{total}", String(saved.total))}
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
            instructions={M.checkInstructions
              .replace("{n}", String(MISSION_QUESTIONS.length))
              .replace("{pass}", String(MISSION_PASS_THRESHOLD))}
            questions={MISSION_QUESTIONS}
            passThreshold={MISSION_PASS_THRESHOLD}
            loaded={p.loaded}
            savedAnswers={saved?.answers}
            saveLabel={M.saveMyAnswers}
            onSave={(answers) => {
              p.saveAssessment(MISSION_QUESTIONS, answers)
              announceRef.current && (announceRef.current.textContent = M.answersSaved)
            }}
          />
        </div>

        {/* Feedback: strengths + concepts to review (after an attempt) */}
        {p.loaded && saved && <FeedbackPanel answers={saved.answers} />}

        {/* E · Written recommendation */}
        <section aria-label={M.writtenRecommendation} className="mt-10 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-foreground">{M.sectionETitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{M.sectionEIntro}</p>

          <fieldset className="mt-4">
            <legend className="text-sm font-semibold text-foreground">{M.decisionLegend}</legend>
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
              <span className="font-semibold text-avanza-green-dark">{M.recComplete}</span>
            ) : (
              <span className="text-muted-foreground">
                {recEval.hasDecision ? M.decisionChosen : M.chooseDecision} ·{" "}
                {M.reasonsWritten
                  .replace("{done}", String(REASON_FIELDS.length - recEval.missing.length))
                  .replace("{total}", String(REASON_FIELDS.length))}
              </span>
            )}
          </p>
        </section>

        {/* Final reflection */}
        <section aria-label={M.finalReflection} className="mt-10 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-foreground">{M.finalReflection}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{M.finalReflectionNote}</p>
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
            {M.goToCompletion}
          </Link>
          <Link href={introToAiPath} className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2">
            {M.courseOverview}
          </Link>
        </div>
      </div>
    </div>
  )
}

function FeedbackPanel({ answers }: { answers: Record<string, string> }) {
  const t = useLanguage().t
  const M: MissionStrings = t.courseUi.ai.mission
  const K = t.courseUi.ai.skills
  const MISSION_QUESTIONS = missionQuestions(M)
  const sections = missionSections(M).map((s) => {
    const qs = s.questionIds.map((id) => MISSION_QUESTIONS.find((q) => q.id === id)!).filter(Boolean)
    const correct = qs.filter((q) => isCorrect(q, answers[q.id])).length
    return { section: s, qs, correct, total: qs.length }
  })
  const strengths = sections.filter((s) => s.correct === s.total)
  const toReview = sections.filter((s) => s.correct < s.total)
  const reviewLinks = toReview.flatMap((s) => s.qs.filter((q) => !isCorrect(q, answers[q.id])).map((q) => skillReviewLink(q.skillId, K)).filter(Boolean))
  const uniqueLinks = Array.from(new Map(reviewLinks.map((l) => [l!.href, l!])).values())

  return (
    <div className="mt-6 rounded-lg border border-border bg-secondary/30 p-5" aria-live="polite">
      <p className="text-sm font-bold text-foreground">{M.yourFeedback}</p>
      <div className="mt-2 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-avanza-green-dark">{M.strengths}</p>
          {strengths.length > 0 ? (
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-foreground">
              {strengths.map((s) => (
                <li key={s.section.id}>{M.allCorrect.replace("{title}", s.section.title)}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">{M.keepGoing}</p>
          )}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-avanza-orange-dark">{M.conceptsToReview}</p>
          {toReview.length > 0 ? (
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-foreground">
              {toReview.map((s) => (
                <li key={s.section.id}>
                  {M.sectionScore
                    .replace("{title}", s.section.title)
                    .replace("{correct}", String(s.correct))
                    .replace("{total}", String(s.total))}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-sm text-avanza-green-dark">{M.everySectionComplete}</p>
          )}
        </div>
      </div>
      {uniqueLinks.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{M.lessonsThatHelp}</p>
          <ul className="mt-1 flex flex-wrap gap-2">
            {uniqueLinks.map((l) => (
              <li key={l!.href}>
                <Link href={l!.href} className="rounded-md border border-border px-2.5 py-1 text-xs font-semibold text-avanza-green-dark hover:border-avanza-green/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1">
                  {M.reviewLink.replace("{label}", l!.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">{M.noRankingNote}</p>
    </div>
  )
}

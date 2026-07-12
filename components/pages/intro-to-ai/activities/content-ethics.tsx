"use client"

import { useEffect, useRef, useState } from "react"
import {
  POSTS,
  EVIDENCE_ITEMS,
  VERDICTS,
  evidenceScore,
  ETHICS_SCENARIOS,
  getEthicsScenario,
  evaluateEthics,
  DECISIONS,
  SAFEGUARDS,
  APPEAL_FIELDS,
  appealComplete,
  type Verdict,
  type Decision,
  type SafeguardId,
} from "@/features/curriculums/intro-to-ai-week5-content"
import type { ActivityComponentProps } from "@/components/pages/intro-to-ai/activity-registry"
import { ActivityFrame } from "@/components/pages/intro-to-ai/activity-frame"

type CEState = {
  verdicts: Record<string, Verdict | "">
  ethicsScenarioId: string
  decision: Record<string, Decision | "">
  safeguards: Record<string, SafeguardId[]>
  appeal: Record<string, string>
}

function emptyState(): CEState {
  return { verdicts: {}, ethicsScenarioId: ETHICS_SCENARIOS[0].id, decision: {}, safeguards: {}, appeal: {} }
}
function parseState(raw: string | undefined): CEState {
  const base = emptyState()
  if (!raw) return base
  try {
    const d = JSON.parse(raw) as Partial<CEState>
    return {
      verdicts: (d.verdicts as CEState["verdicts"]) ?? {},
      ethicsScenarioId: ETHICS_SCENARIOS.some((s) => s.id === d.ethicsScenarioId) ? d.ethicsScenarioId! : base.ethicsScenarioId,
      decision: (d.decision as CEState["decision"]) ?? {},
      safeguards: (d.safeguards as CEState["safeguards"]) ?? {},
      appeal: (d.appeal as Record<string, string>) ?? {},
    }
  } catch {
    return base
  }
}

export function ContentEthicsActivity({ activity, progress }: ActivityComponentProps) {
  const [state, setState] = useState<CEState>(emptyState)
  const announceRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (progress.loaded) setState(parseState(progress.progress.activities[activity.id]))
  }, [progress.loaded, progress.progress.activities, activity.id])

  const persist = (next: CEState) => {
    setState(next)
    progress.saveActivity(activity.id, JSON.stringify(next))
  }
  const announce = (msg: string) => {
    if (announceRef.current) announceRef.current.textContent = msg
  }

  const scenario = getEthicsScenario(state.ethicsScenarioId)!
  const decision = state.decision[scenario.id] ?? ""
  const safeguards = state.safeguards[scenario.id] ?? []
  const feedback = decision ? evaluateEthics(scenario, decision, safeguards) : null
  const appealState = appealComplete(state.appeal)

  return (
    <ActivityFrame
      title={activity.title}
      purpose={activity.goal}
      instructions={[
        "Part 1 — investigate posts: run the seven source-and-context checks, then judge each one.",
        "Part 2 — ethics committee: weigh a proposed AI system, choose a decision, and pick safeguards.",
        "Part 3 — design an appeal: how a person learns AI was involved, gets an explanation, and can be reviewed.",
      ]}
      status="ready"
      saveStatus={progress.saveStatus}
      onReset={() => {
        persist(emptyState())
        announce("Reset.")
      }}
    >
      <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />
      <p className="mt-3 rounded-md bg-secondary px-3 py-2 text-xs text-muted-foreground">Every post, school, and person here is fictional. No real accounts are visited. Don&apos;t put personal details in your notes.</p>

      {/* Part 1 — misinformation */}
      <h4 className="mt-4 text-sm font-bold text-foreground">Part 1 · Investigate the posts</h4>
      <p className="mt-1 text-sm text-muted-foreground">
        A visual &ldquo;tell&rdquo; like strange hands or odd text is <strong>not</strong> reliable proof. Verification means checking the source, date, and context — the seven questions below.
      </p>
      <ul className="mt-3 space-y-4">
        {POSTS.map((post) => {
          const verdict = state.verdicts[post.id] ?? ""
          const revealed = verdict !== ""
          const score = evidenceScore(post)
          return (
            <li key={post.id} className="rounded-md border border-border p-3">
              <p className="text-sm font-bold text-foreground">{post.headline}</p>
              <p className="mt-0.5 text-xs uppercase tracking-wide text-muted-foreground">{post.kind}</p>
              <p className="mt-1 text-sm text-muted-foreground">{post.imageDescription}</p>
              <p className="mt-1 text-sm text-foreground"><span className="font-semibold">Claim:</span> {post.claim}</p>

              <div className="mt-2 rounded-md border border-border/60 p-2">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Evidence ({score.good}/{score.total} checks look healthy)</p>
                <ul className="mt-1 space-y-0.5 text-xs">
                  {EVIDENCE_ITEMS.map((item) => {
                    const good = item.good(post.evidence)
                    return (
                      <li key={item.key} className="flex gap-1.5">
                        <span className={`font-semibold ${good ? "text-avanza-green-dark" : "text-avanza-orange-dark"}`}>{good ? "OK" : "Flag"}:</span>
                        <span className="text-muted-foreground"><span className="text-foreground">{item.question}</span> {item.describe(post.evidence)}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground">Your judgment:</span>
                {VERDICTS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    aria-pressed={verdict === v.id}
                    onClick={() => persist({ ...state, verdicts: { ...state.verdicts, [post.id]: v.id } })}
                    className={`rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${verdict === v.id ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground hover:text-foreground"}`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
              {revealed && (
                <div className="mt-2 rounded-md bg-secondary px-3 py-2 text-xs" aria-live="polite">
                  <p className="font-semibold text-foreground">Recommended: {VERDICTS.find((v) => v.id === post.verdict)!.label}{verdict === post.verdict ? " — matches your call." : ""}</p>
                  <p className="mt-0.5 text-muted-foreground">{post.explanation}</p>
                  <p className="mt-0.5 text-muted-foreground"><span className="font-semibold">Remember:</span> {post.teachingNote}</p>
                </div>
              )}
            </li>
          )
        })}
      </ul>
      <p className="mt-2 text-xs text-muted-foreground">This activity can&apos;t perfectly detect AI-made content, and it doesn&apos;t try to — it checks sources and context, which is what actually holds up.</p>

      {/* Part 2 — ethics committee */}
      <h4 className="mt-8 border-t border-border pt-6 text-sm font-bold text-foreground">Part 2 · AI ethics committee</h4>
      <div className="mt-2 flex flex-wrap gap-2">
        {ETHICS_SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={s.id === scenario.id}
            onClick={() => persist({ ...state, ethicsScenarioId: s.id })}
            className={`rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${s.id === scenario.id ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="mt-3 rounded-md border border-border p-3 text-sm">
        <p className="text-foreground"><span className="font-semibold">Proposal:</span> {scenario.proposal}</p>
        <p className="mt-1 text-muted-foreground"><span className="font-semibold text-foreground">Intended benefit:</span> {scenario.intendedBenefit}</p>
        <p className="mt-1 text-muted-foreground"><span className="font-semibold text-foreground">Likely mistakes:</span> {scenario.likelyMistakes.join("; ")}</p>
        <p className="mt-1 text-muted-foreground"><span className="font-semibold text-foreground">People affected:</span> {scenario.peopleAffected.join(", ")}</p>
        <p className="mt-1 text-muted-foreground"><span className="font-semibold text-foreground">Stakes:</span> {scenario.stakes === "high" ? "high" : "low"}. <span className="italic">{scenario.nonAiSaferHint}</span></p>
      </div>

      <div className="mt-3">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Your decision</p>
        <div className="mt-1 flex flex-wrap gap-2">
          {DECISIONS.map((d) => (
            <button
              key={d.id}
              type="button"
              aria-pressed={decision === d.id}
              onClick={() => persist({ ...state, decision: { ...state.decision, [scenario.id]: d.id } })}
              className={`rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${decision === d.id ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Safeguards you&apos;d require</p>
        <div className="mt-1 grid gap-1 sm:grid-cols-2">
          {SAFEGUARDS.map((sg) => {
            const on = safeguards.includes(sg.id)
            return (
              <label key={sg.id} className="flex items-center gap-2 rounded-md border border-border px-2 py-1 text-sm">
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => {
                    const next = on ? safeguards.filter((x) => x !== sg.id) : [...safeguards, sg.id]
                    persist({ ...state, safeguards: { ...state.safeguards, [scenario.id]: next } })
                  }}
                  className="focus-visible:ring-2 focus-visible:ring-avanza-green"
                />
                <span className="text-foreground">{sg.label}</span>
              </label>
            )
          })}
        </div>
      </div>

      {feedback && (
        <div className="mt-3 rounded-md bg-secondary px-3 py-3 text-sm" aria-live="polite">
          <p className="font-semibold text-foreground">
            Committee read: {feedback.soundness === "well-reasoned" ? "well-reasoned" : feedback.soundness === "needs-more-safeguards" ? "needs more safeguards" : "reconsider this"}
          </p>
          {feedback.strengths.length > 0 && (
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-avanza-green-dark">
              {feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          )}
          {feedback.concerns.length > 0 && (
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-avanza-orange-dark">
              {feedback.concerns.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          )}
          <p className="mt-1 text-xs text-muted-foreground">There isn&apos;t one “correct” choice — your decision is judged by whether your safeguards and reasoning fit the stakes.</p>
        </div>
      )}

      {/* Part 3 — appeal design */}
      <h4 className="mt-8 border-t border-border pt-6 text-sm font-bold text-foreground">Part 3 · Design an appeal process</h4>
      <p className="mt-1 text-sm text-muted-foreground">High-stakes AI needs a way for people to understand and challenge a decision. Design one:</p>
      <div className="mt-3 space-y-3">
        {APPEAL_FIELDS.map((f) => (
          <div key={f.id}>
            <label htmlFor={`appeal-${f.id}`} className="block text-sm font-medium text-foreground">{f.prompt}</label>
            <input
              id={`appeal-${f.id}`}
              value={state.appeal[f.id] ?? ""}
              onChange={(e) => persist({ ...state, appeal: { ...state.appeal, [f.id]: e.target.value } })}
              placeholder={f.hint}
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
            />
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm" aria-live="polite">
        {appealState.complete ? (
          <span className="font-semibold text-avanza-green-dark">Your appeal process covers all six parts.</span>
        ) : (
          <span className="text-muted-foreground">{APPEAL_FIELDS.length - appealState.missing.length} of {APPEAL_FIELDS.length} parts designed — fill the rest to complete the appeal process.</span>
        )}
      </p>
    </ActivityFrame>
  )
}

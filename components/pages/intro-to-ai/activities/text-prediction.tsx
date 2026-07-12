"use client"

import { useEffect, useRef, useState } from "react"
import { Check, HelpCircle, X } from "lucide-react"
import {
  PROMPT_PRESETS,
  fillTemplate,
  predictNext,
  explainPrediction,
  FLUENCY_CARDS,
  type PredictionResult,
} from "@/features/curriculums/intro-to-ai-week4-text"
import type { ActivityComponentProps } from "@/components/pages/intro-to-ai/activity-registry"
import { ActivityFrame } from "@/components/pages/intro-to-ai/activity-frame"

type Mark = "true" | "false" | "check" | ""
type TPState = { presetId: string; theme: string; context: string; marks: Record<string, Mark> }

function emptyState(): TPState {
  const preset = PROMPT_PRESETS[0]
  return { presetId: preset.id, theme: preset.themes[0] ?? "", context: fillTemplate(preset.template, preset.themes[0] ?? ""), marks: {} }
}

function parseState(raw: string | undefined): TPState {
  const base = emptyState()
  if (!raw) return base
  try {
    const d = JSON.parse(raw) as Partial<TPState>
    const marks: Record<string, Mark> = {}
    if (d.marks && typeof d.marks === "object") for (const [k, v] of Object.entries(d.marks)) if (["true", "false", "check", ""].includes(v as string)) marks[k] = v as Mark
    return {
      presetId: typeof d.presetId === "string" ? d.presetId : base.presetId,
      theme: typeof d.theme === "string" ? d.theme : base.theme,
      context: typeof d.context === "string" ? d.context : base.context,
      marks,
    }
  } catch {
    return base
  }
}

export function TextPredictionActivity({ activity, progress }: ActivityComponentProps) {
  const [state, setState] = useState<TPState>(emptyState)
  const announceRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (progress.loaded) setState(parseState(progress.progress.activities[activity.id]))
  }, [progress.loaded, progress.progress.activities, activity.id])

  const persist = (next: TPState) => {
    setState(next)
    progress.saveActivity(activity.id, JSON.stringify(next))
  }
  const announce = (msg: string) => {
    if (announceRef.current) announceRef.current.textContent = msg
  }

  const preset = PROMPT_PRESETS.find((p) => p.id === state.presetId) ?? PROMPT_PRESETS[0]
  const result = predictNext(state.context)

  const selectPreset = (id: string) => {
    const p = PROMPT_PRESETS.find((x) => x.id === id)!
    const theme = p.themes[0] ?? ""
    persist({ ...state, presetId: id, theme, context: fillTemplate(p.template, theme) })
  }
  const setTheme = (theme: string) => {
    persist({ ...state, theme, context: fillTemplate(preset.template, theme) })
    announce(`Context changed to “${fillTemplate(preset.template, theme)}”. Predictions updated.`)
  }
  const setMark = (id: string, mark: Mark) => persist({ ...state, marks: { ...state.marks, [id]: mark } })

  // Comparison across all theme options for the swappable preset.
  const comparison = preset.themes.length > 1 ? preset.themes.map((t) => ({ theme: t, top: predictNext(fillTemplate(preset.template, t)).predictions[0]?.word ?? "—" })) : []

  return (
    <ActivityFrame
      title={activity.title}
      purpose={activity.goal}
      instructions={[
        "Pick a prompt and see the words the model rates as most likely to come next.",
        "Swap a word (like storm → parade) or add your own words, and watch the likelihoods change.",
        "Then judge the fluency cards: a smooth sentence can still be false.",
      ]}
      status="ready"
      saveStatus={progress.saveStatus}
    >
      <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

      {/* Prompt picker */}
      <fieldset className="mt-4">
        <legend className="text-sm font-bold text-foreground">1 · Pick a prompt</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {PROMPT_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={p.id === state.presetId}
              onClick={() => selectPreset(p.id)}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${
                p.id === state.presetId ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground hover:border-avanza-green/50 hover:text-foreground"
              }`}
            >
              {fillTemplate(p.display, p.themes[0] ?? "")}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Theme swap + context edit */}
      <div className="mt-4 rounded-md border border-border p-3">
        {preset.themes.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="tp-theme" className="text-sm font-semibold text-foreground">Swap the word:</label>
            <select id="tp-theme" value={state.theme} onChange={(e) => setTheme(e.target.value)} className="rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green">
              {preset.themes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        )}
        <label htmlFor="tp-context" className="mt-3 block text-sm font-semibold text-foreground">Context (edit or add words):</label>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <input id="tp-context" value={state.context} onChange={(e) => persist({ ...state, context: e.target.value })} className="flex-1 rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green" />
          <span className="text-sm text-muted-foreground">___ ?</span>
        </div>
      </div>

      {/* Predictions */}
      <div className="mt-4 rounded-md border border-border bg-card p-4">
        <p className="text-sm font-bold text-foreground">Most likely next words</p>
        <ProbBars result={result} />
        <p className="mt-2 text-xs text-muted-foreground">{explainPrediction(result)} This is pattern-matching over a small word list — not real understanding, and not a fact-check.</p>
      </div>

      {/* Comparison */}
      {comparison.length > 0 && (
        <div className="mt-3 rounded-md border border-avanza-purple/30 bg-avanza-purple/5 p-3 text-sm">
          <p className="font-semibold text-foreground">Same sentence, different word:</p>
          <ul className="mt-1 space-y-0.5 text-muted-foreground">
            {comparison.map((c) => (
              <li key={c.theme}>
                “{fillTemplate(preset.template, c.theme)} <span className="font-semibold text-foreground">{c.top}</span>…” — changing one word changes the likely continuation.
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Fluency vs truth */}
      <div className="mt-6 border-t border-border pt-5">
        <h4 className="text-sm font-bold text-foreground">Fluent is not the same as true</h4>
        <p className="mt-1 text-sm text-muted-foreground">Each sentence below sounds smooth and confident. Decide if it&apos;s actually true, then reveal the answer.</p>
        <ul className="mt-3 space-y-3">
          {FLUENCY_CARDS.map((card) => {
            const mark = state.marks[card.id] ?? ""
            const revealed = mark !== ""
            return (
              <li key={card.id} className="rounded-md border border-border p-3">
                <p className="text-sm text-foreground">
                  “{card.prompt} <span className="font-semibold">{card.continuation}</span>”
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">Your call:</span>
                  {([["true", "True", Check], ["false", "False", X], ["check", "Need to check", HelpCircle]] as [Mark, string, typeof Check][]).map(([m, label, Icon]) => (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={mark === m}
                      onClick={() => setMark(card.id, m)}
                      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${
                        mark === m ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3 w-3" aria-hidden /> {label}
                    </button>
                  ))}
                </div>
                {revealed && (
                  <div className={`mt-2 rounded-md px-3 py-2 text-sm ${card.isTrue ? "bg-avanza-green/10 text-avanza-green-dark" : "bg-avanza-orange/10 text-avanza-orange-dark"}`} aria-live="polite">
                    <p className="font-semibold">Actually {card.isTrue ? "true" : "false"} ({card.claimType}). {mark === (card.isTrue ? "true" : "false") ? "You got it." : ""}</p>
                    <p className="mt-0.5">{card.why}</p>
                    <p className="mt-0.5"><span className="font-semibold">How to check:</span> {card.howToVerify}</p>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </ActivityFrame>
  )
}

function ProbBars({ result }: { result: PredictionResult }) {
  const max = Math.max(0.0001, ...result.predictions.map((p) => p.probability))
  if (result.predictions.length === 0) return <p className="mt-2 text-sm text-muted-foreground">No prediction available for this context.</p>
  const summary = result.predictions.map((p) => `${p.word} ${Math.round(p.probability * 100)}%`).join(", ")
  return (
    <div className="mt-2 space-y-1.5" role="img" aria-label={`Likely next words: ${summary}`}>
      {result.predictions.map((p) => (
        <div key={p.word} className="grid grid-cols-[6rem_1fr_4.5rem] items-center gap-2 text-sm">
          <span className="truncate font-medium text-foreground">{p.word}</span>
          <span className="h-3 rounded-sm bg-secondary" aria-hidden>
            <span className="block h-3 rounded-sm bg-avanza-green" style={{ width: `${Math.round((p.probability / max) * 100)}%` }} />
          </span>
          <span className="text-right tabular-nums text-muted-foreground">{Math.round(p.probability * 100)}% ({p.count})</span>
        </div>
      ))}
      <p className="sr-only">{summary}</p>
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import {
  CATALOG,
  features,
  localizeItems,
  valueText,
  type Week4RecommendStrings,
  recommend,
  defaultWeights,
  topicDistribution,
  distinctTopics,
  getItem,
  type Ratings,
  type Weights,
  type FeatureKey,
  type Recommendation,
} from "@/features/curriculums/intro-to-ai/activities/week4-recommend"
import { useLanguage } from "@/components/providers/language-provider"

/** The Week 4 recommender wording in the reader's language. */
function useS() {
  return useLanguage().t.courseUi.ai.week4Recommend
}
import type { ActivityComponentProps } from "@/components/pages/intro-to-ai/activity-registry"
import { ActivityFrame } from "@/components/pages/intro-to-ai/activity-frame"

type RBState = { ratings: Ratings; weights: Weights; explore: boolean; snapshot: string[] | null }

function emptyState(): RBState {
  return { ratings: {}, weights: defaultWeights(), explore: false, snapshot: null }
}

function parseState(raw: string | undefined): RBState {
  const base = emptyState()
  if (!raw) return base
  try {
    const d = JSON.parse(raw) as Partial<RBState>
    const ratings: Ratings = {}
    if (d.ratings && typeof d.ratings === "object") for (const [k, v] of Object.entries(d.ratings)) if (typeof v === "number" && getItem(k)) ratings[k] = v
    const weights = { ...base.weights }
    if (d.weights && typeof d.weights === "object") for (const { key } of features()) if (typeof (d.weights as Record<string, unknown>)[key] === "number") weights[key] = (d.weights as Weights)[key]
    return {
      ratings,
      weights,
      explore: d.explore === true,
      snapshot: Array.isArray(d.snapshot) ? d.snapshot.filter((x): x is string => typeof x === "string") : null,
    }
  } catch {
    return base
  }
}

export function RecommendationBuilderActivity({ activity, progress }: ActivityComponentProps) {
  const S = useS()
  const [state, setState] = useState<RBState>(emptyState)
  const announceRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (progress.loaded) setState(parseState(progress.progress.activities[activity.id]))
  }, [progress.loaded, progress.progress.activities, activity.id])

  const persist = (next: RBState) => {
    setState(next)
    progress.saveActivity(activity.id, JSON.stringify(next))
  }
  const announce = (msg: string) => {
    if (announceRef.current) announceRef.current.textContent = msg
  }

  const ITEMS = localizeItems(CATALOG, S)
  const result = recommend(state.ratings, state.weights, { explore: state.explore, topN: 6 }, S)
  const dist = topicDistribution(result.recommendations)

  const rate = (id: string, value: number) => {
    const ratings = { ...state.ratings }
    if (ratings[id] === value) delete ratings[id]
    else ratings[id] = value
    persist({ ...state, ratings })
    announce(
      S.rbRateAnnounce
        .replace("{title}", getItem(id, S)?.title ?? id)
        .replace("{verdict}", value >= 4 ? S.rbLiked : S.rbDisliked),
    )
  }
  const setWeight = (key: FeatureKey, value: number) => persist({ ...state, weights: { ...state.weights, [key]: value } })

  return (
    <ActivityFrame
      title={activity.title}
      purpose={activity.goal}
      instructions={[
        S.rbInstr1,
        S.rbInstr2,
        S.rbInstr3,
      ]}
      status="ready"
      saveStatus={progress.saveStatus}
      onReset={() => {
        persist(emptyState())
        announce("Reset.")
      }}
    >
      <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

      <p className="mt-3 rounded-md bg-secondary px-3 py-2 text-xs text-muted-foreground">{S.rbCatalogNote}</p>

      {/* Catalog */}
      <fieldset className="mt-4">
        <legend className="text-sm font-bold text-foreground">{S.rbStep1}</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {ITEMS.map((item) => {
            const r = state.ratings[item.id]
            return (
              <div key={item.id} className="flex items-start justify-between gap-2 rounded-md border border-border p-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {valueText(item.topic, S)} · {valueText(item.category, S)} · {valueText(item.difficulty, S)} ·{" "}
                    {valueText(item.format, S)}
                  </p>
                </div>
                <div className="flex flex-none gap-1">
                  <button type="button" aria-label={S.rbLike.replace("{title}", item.title)} aria-pressed={r === 5} onClick={() => rate(item.id, 5)} className={`inline-flex h-7 w-7 items-center justify-center rounded-md border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${r === 5 ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground hover:text-foreground"}`}>
                    <ThumbsUp className="h-3.5 w-3.5" aria-hidden />
                  </button>
                  <button type="button" aria-label={S.rbNotForMe.replace("{title}", item.title)} aria-pressed={r === 1} onClick={() => rate(item.id, 1)} className={`inline-flex h-7 w-7 items-center justify-center rounded-md border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${r === 1 ? "border-avanza-orange bg-avanza-orange/15 text-avanza-orange-dark" : "border-border text-muted-foreground hover:text-foreground"}`}>
                    <ThumbsDown className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </fieldset>

      {/* Weights */}
      <fieldset className="mt-5">
        <legend className="text-sm font-bold text-foreground">{S.rbStep2}</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features(S).map(({ key, label }) => (
            <label key={key} className="text-sm">
              <span className="flex items-center justify-between text-foreground">
                {label} <span className="tabular-nums text-muted-foreground">{S.rbWeight.replace("{n}", String(state.weights[key]))}</span>
              </span>
              <input type="range" min={0} max={6} step={1} value={state.weights[key]} onChange={(e) => setWeight(key, Number(e.target.value))} className="mt-1 w-full accent-avanza-green" aria-label={S.rbWeightAria.replace("{label}", label)} />
            </label>
          ))}
        </div>
      </fieldset>

      {/* Low-data warning */}
      {result.lowData && (
        <p className="mt-4 rounded-md border border-avanza-orange/40 bg-avanza-orange/10 px-3 py-2 text-sm text-avanza-orange-dark" role="status">
          {S.rbLowData.replace("{reason}", result.lowDataReason ?? "")}
        </p>
      )}

      {/* Recommendations */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-sm font-bold text-foreground">{S.rbStep3}</h4>
        <label className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <input type="checkbox" checked={state.explore} onChange={(e) => persist({ ...state, explore: e.target.checked })} /> {S.rbExploreMode}
        </label>
      </div>
      {result.recommendations.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">{S.rbRateToGet}</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {result.recommendations.map((rec) => (
            <RecCard key={rec.item.id} rec={rec} />
          ))}
        </ul>
      )}

      {/* Filter bubble */}
      <div className="mt-6 border-t border-border pt-5">
        <h4 className="text-sm font-bold text-foreground">{S.rbStep4}</h4>
        <ol className="mt-1 list-decimal space-y-0.5 pl-5 text-sm text-muted-foreground">
          <li>
            {S.rbExp1.split(S.rbExp1Strong)[0]}
            <strong>{S.rbExp1Strong}</strong>
            {S.rbExp1.split(S.rbExp1Strong)[1]}
          </li>
          <li>
            {S.rbExp2.split(S.rbExp2Strong)[0]}
            <strong>{S.rbExp2Strong}</strong>
            {S.rbExp2.split(S.rbExp2Strong)[1]}
          </li>
          <li>{S.rbExp3}</li>
        </ol>

        <div className="mt-3 rounded-md border border-border p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            {S.rbTopicsInFeed.replace("{n}", String(distinctTopics(result.recommendations)))}
          </p>
          <div className="mt-2 space-y-1.5">
            {dist.map((d) => (
              <div key={d.topic} className="grid grid-cols-[5rem_1fr_2rem] items-center gap-2 text-sm">
                <span className="text-muted-foreground">{valueText(d.topic, S)}</span>
                <span className="h-3 rounded-sm bg-secondary" aria-hidden><span className="block h-3 rounded-sm bg-avanza-purple" style={{ width: `${Math.round(d.share * 100)}%` }} /></span>
                <span className="text-right tabular-nums text-foreground">{d.count}</span>
              </div>
            ))}
            {dist.length === 0 && <p className="text-sm text-muted-foreground">{S.rbRateFirst}</p>}
          </div>
          <p className="sr-only">
            {S.rbCurrentTopics.replace("{list}", dist.map((d) => `${valueText(d.topic, S)} ${d.count}`).join(", "))}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => { persist({ ...state, snapshot: result.recommendations.map((r) => r.item.id) }); announce(S.rbSnapshotSaved) }} className="rounded-md border border-border px-2.5 py-1 text-xs font-semibold text-foreground hover:border-avanza-green/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1">
              {S.rbSnapshotFeed}
            </button>
            {state.snapshot && <button type="button" onClick={() => persist({ ...state, snapshot: null })} className="rounded-md border border-border px-2.5 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1">{S.rbClearSnapshot}</button>}
          </div>

          {state.snapshot && (
            <div className="mt-3 rounded-md bg-secondary px-3 py-2 text-sm" aria-live="polite">
              <p className="font-semibold text-foreground">{S.rbSnapshotVsNow}</p>
              <p className="mt-1 text-muted-foreground">
                {S.rbSnapshotLine
                  .replace(
                    "{before}",
                    snapshotTopics(state.snapshot, S).map((t) => valueText(t, S)).join(", ") || S.rbDash,
                  )
                  .replace(
                    "{after}",
                    result.recommendations
                      .map((r) => r.item.topic)
                      .filter((v, i, a) => a.indexOf(v) === i)
                      .map((t) => valueText(t, S))
                      .join(", "),
                  )}
              </p>
            </div>
          )}
        </div>
      </div>
    </ActivityFrame>
  )
}

function snapshotTopics(ids: string[], S: Week4RecommendStrings): string[] {
  const topics = ids.map((id) => getItem(id, S)?.topic).filter(Boolean) as string[]
  return topics.filter((v, i, a) => a.indexOf(v) === i)
}

function RecCard({ rec }: { rec: Recommendation }) {
  const S = useS()
  return (
    <li className="rounded-md border border-border p-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-semibold text-foreground">{rec.item.title}</p>
        <p className="text-xs tabular-nums text-muted-foreground">{S.rbScore.replace("{n}", rec.score.toFixed(1))}</p>
      </div>
      <p className="text-xs text-muted-foreground">{rec.item.topic} · {rec.item.category} · {rec.item.difficulty} · {rec.item.format}</p>
      <div className="mt-1.5 text-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{S.rbWhySeeing}</p>
        <ul className="mt-0.5 list-disc space-y-0.5 pl-5 text-muted-foreground">
          {rec.reasons.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
      {(rec.positives.length > 0 || rec.reducers.length > 0) && (
        <p className="mt-1.5 text-xs text-muted-foreground">
          {rec.positives.length > 0 && <>Added: {rec.positives.map((c) => `${c.label}=${c.value}`).join(", ")}. </>}
          {rec.reducers.length > 0 && <>Reduced: {rec.reducers.map((c) => `${c.label}=${c.value}`).join(", ")}.</>}
        </p>
      )}
    </li>
  )
}

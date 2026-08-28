"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  WORKSPACE_EXAMPLES,
  spaceFruitFeatures,
  localizeFruits,
  groundTruthReason,
  duplicateIds,
  findDuplicateGroups,
  incompleteIds,
  labelCounts,
  featureValueCounts,
  labelText,
  optionText,
  type FeatureKey,
  type SpaceFruit,
  type SpaceFruitLabel,
} from "@/features/curriculums/intro-to-ai/activities/week2-activities"
import { useLanguage } from "@/components/providers/language-provider"
import type { ActivityComponentProps } from "@/components/pages/intro-to-ai/activity-registry"
import { ActivityFrame } from "@/components/pages/intro-to-ai/activity-frame"
import { CountBars, FlagChip, FruitDataTable, LabelPicker, type FruitRow } from "@/components/pages/intro-to-ai/activities/week2-shared"

type Filter = "all" | "safe" | "unsafe" | "unlabeled" | "flagged"
type WSState = { labels: Record<string, SpaceFruitLabel | ""> }
const EMPTY: WSState = { labels: {} }

function parseState(raw: string | undefined): WSState {
  if (!raw) return EMPTY
  try {
    const d = JSON.parse(raw) as Partial<WSState>
    const labels: Record<string, SpaceFruitLabel | ""> = {}
    if (d.labels && typeof d.labels === "object") {
      for (const [k, v] of Object.entries(d.labels)) if (v === "safe" || v === "unsafe" || v === "") labels[k] = v
    }
    return { labels }
  } catch {
    return EMPTY
  }
}

// Duplicate + missing flags are static (features never change here).
const DUP_IDS = duplicateIds(WORKSPACE_EXAMPLES)
const DUP_GROUPS = findDuplicateGroups(WORKSPACE_EXAMPLES)
const MISSING_IDS = incompleteIds(WORKSPACE_EXAMPLES)

function dupPartnerNames(fruit: SpaceFruit, all: SpaceFruit[]): string {
  const group = DUP_GROUPS.find((g) => g.ids.includes(fruit.id))
  if (!group) return ""
  return group.ids
    .filter((id) => id !== fruit.id)
    .map((id) => all.find((e) => e.id === id)?.name ?? id)
    .join(", ")
}

export function DatasetWorkspaceActivity({ activity, progress }: ActivityComponentProps) {
  const S = useLanguage().t.courseUi.ai.week2
  const SPACE_FRUIT_FEATURES = spaceFruitFeatures(S)
  const EXAMPLES = localizeFruits(WORKSPACE_EXAMPLES, S)
  const [state, setState] = useState<WSState>(EMPTY)
  const [filter, setFilter] = useState<Filter>("all")
  const [sortKey, setSortKey] = useState<FeatureKey | "name">("name")
  const [revealed, setRevealed] = useState(false)
  const announceRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (progress.loaded) setState(parseState(progress.progress.activities[activity.id]))
  }, [progress.loaded, progress.progress.activities, activity.id])

  const persist = (next: WSState) => {
    setState(next)
    progress.saveActivity(activity.id, JSON.stringify(next))
  }

  const setLabel = (id: string, label: SpaceFruitLabel | "") =>
    persist({ labels: { ...state.labels, [id]: label } })

  const labeledFruits: SpaceFruit[] = useMemo(
    () => EXAMPLES.map((f) => ({ ...f, label: state.labels[f.id] || undefined })),
    [state.labels],
  )

  const counts = labelCounts(labeledFruits, false)
  const textureCounts = featureValueCounts(EXAMPLES, "texture")

  const visible = useMemo(() => {
    let list = labeledFruits
    if (filter === "safe" || filter === "unsafe") list = list.filter((f) => f.label === filter)
    else if (filter === "unlabeled") list = list.filter((f) => !f.label)
    else if (filter === "flagged") list = list.filter((f) => DUP_IDS.has(f.id) || MISSING_IDS.has(f.id))
    const sorted = [...list].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name)
      const meta = SPACE_FRUIT_FEATURES.find((m) => m.key === sortKey)!
      const av = a.features[sortKey]
      const bv = b.features[sortKey]
      if (meta.type === "number") return (av as number) - (bv as number)
      return String(av).localeCompare(String(bv))
    })
    return sorted
  }, [labeledFruits, filter, sortKey])

  const incompleteCount = MISSING_IDS.size
  const remaining = labeledFruits.filter((f) => !f.label).length

  // After-reveal accuracy against the answer key.
  const revealChecked = revealed ? labeledFruits.filter((f) => f.label) : []
  const revealCorrect = revealChecked.filter((f) => f.label === f.canonicalLabel).length

  const announce = (msg: string) => {
    if (announceRef.current) announceRef.current.textContent = msg
  }

  const rows: FruitRow[] = visible.map((fruit) => {
    const isDup = DUP_IDS.has(fruit.id)
    const isMissing = MISSING_IDS.has(fruit.id)
    const studentLabel = fruit.label
    const mismatched = revealed && studentLabel && studentLabel !== fruit.canonicalLabel
    return {
      fruit,
      flags: (
        <>
          {isDup && <FlagChip tone="warn">{S.wsDuplicateOf.replace("{names}", dupPartnerNames(fruit, EXAMPLES))}</FlagChip>}
          {isMissing && (
            <FlagChip tone="info">
              {S.wsMissing.replace(
                "{fields}",
                (fruit.incomplete ?? []).map((k) => SPACE_FRUIT_FEATURES.find((m) => m.key === k)?.label ?? k).join(", "),
              )}
            </FlagChip>
          )}
          {mismatched && <FlagChip tone="warn">{S.wsReconsider}</FlagChip>}
        </>
      ),
      controls: (
        <LabelPicker value={studentLabel ?? ""} onChange={(l) => setLabel(fruit.id, l)} idBase={`ws-${fruit.id}`} />
      ),
      note:
        revealed && studentLabel ? (
          <span
            className={`block rounded-md px-2 py-1 text-xs ${
              studentLabel === fruit.canonicalLabel
                ? "bg-avanza-green/10 text-avanza-green-dark"
                : "bg-avanza-orange/10 text-avanza-orange-dark"
            }`}
          >
            {studentLabel === fruit.canonicalLabel
              ? `${S.wsMatchesKey} `
              : `${S.wsAnswerKeySays.replace("{label}", labelText(fruit.canonicalLabel, S))} `}
            {groundTruthReason(fruit.features, S)}
          </span>
        ) : undefined,
    }
  })

  return (
    <ActivityFrame
      title={activity.title}
      purpose={activity.goal}
      instructions={[S.wsInstr1, S.wsInstr2, S.wsInstr3]}
      status="ready"
      saveStatus={progress.saveStatus}
      onReset={() => {
        setRevealed(false)
        setFilter("all")
        setSortKey("name")
        persist(EMPTY)
      }}
    >
      <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

      {/* Live counts */}
      <div className="mt-4 grid gap-4 rounded-md border border-border bg-secondary/40 p-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{S.wsGlance}</p>
          <ul className="mt-2 space-y-0.5 text-sm text-foreground">
            <li>{S.wsTotal} <span className="font-semibold tabular-nums">{labeledFruits.length}</span></li>
            <li>{S.wsYourLabels} <span className="font-semibold tabular-nums">{counts.safe}</span>, Not safe: <span className="font-semibold tabular-nums">{counts.unsafe}</span>, left to do: <span className="font-semibold tabular-nums">{remaining}</span></li>
            <li>{S.wsDuplicatesFound} <span className="font-semibold tabular-nums">{DUP_IDS.size}</span> · Missing values: <span className="font-semibold tabular-nums">{incompleteCount}</span></li>
          </ul>
        </div>
        <CountBars
          title={S.wsCountByTexture}
          unit={S.wsExamplesUnit}
          bars={textureCounts.map((c) => ({ label: optionText(c.value, S), value: c.count, tone: "neutral" as const }))}
        />
      </div>

      {(DUP_IDS.size > 0 || incompleteCount > 0) && (
        <div className="mt-3 rounded-md border border-avanza-orange/40 bg-avanza-orange/5 p-3 text-sm text-foreground">
          <p className="font-semibold text-avanza-orange-dark">{S.wsHeadsUp}</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-muted-foreground">
            {DUP_IDS.size > 0 && <li>{S.wsDupWarning.replace("{n}", String(DUP_IDS.size))}</li>}
            {incompleteCount > 0 && <li>{S.wsMissingWarning.replace("{n}", String(incompleteCount))}</li>}
            <li className="text-xs">{S.wsRemember}</li>
          </ul>
        </div>
      )}

      {/* Filter + sort controls */}
      <div className="mt-5 flex flex-wrap items-end gap-4">
        <div>
          <span className="block text-xs font-bold uppercase tracking-wide text-muted-foreground">{S.wsFilter}</span>
          <div className="mt-1 flex flex-wrap gap-1" role="group" aria-label={S.wsFilterExamples}>
            {(
              [
                ["all", S.wsAll],
                ["safe", S.wsLabeledSafe],
                ["unsafe", S.wsLabeledUnsafe],
                ["unlabeled", S.unlabeled],
                ["flagged", S.wsFlagged],
              ] as [Filter, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={filter === id}
                onClick={() => {
                  setFilter(id)
                  announce(S.wsFilterAnnounce.replace("{label}", label))
                }}
                className={`rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${
                  filter === id ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground hover:border-avanza-green/50 hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="ws-sort" className="block text-xs font-bold uppercase tracking-wide text-muted-foreground">
            {S.wsSortBy}
          </label>
          <select
            id="ws-sort"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as FeatureKey | "name")}
            className="mt-1 rounded-md border border-border bg-card px-2 py-1.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
          >
            <option value="name">{S.wsFruitName}</option>
            {SPACE_FRUIT_FEATURES.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {S.wsShowing.replace("{n}", String(visible.length)).replace("{total}", String(labeledFruits.length))}
        </p>
      </div>

      {/* Data table */}
      <div className="mt-4">
        <FruitDataTable
          caption={S.wsTableCaption}
          rows={rows}
          controlHeader={S.wsYourLabel}
        />
        {visible.length === 0 && <p className="mt-3 text-sm text-muted-foreground">{S.wsNoMatch}</p>}
      </div>

      {/* Reveal / check */}
      <div className="mt-6 border-t border-border pt-5">
        {!revealed ? (
          <>
            <button
              type="button"
              onClick={() => {
                setRevealed(true)
                announce(S.wsKeyRevealed)
              }}
              disabled={counts.safe + counts.unsafe === 0}
              className="inline-flex items-center rounded-md bg-avanza-green px-4 py-2 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
            >
              {S.wsCheckLabels}
            </button>
            <p className="mt-2 text-xs text-muted-foreground">{S.wsLabelFirst}</p>
          </>
        ) : (
          <div className="rounded-md bg-secondary px-4 py-3 text-sm" aria-live="polite">
            <p className="font-semibold text-foreground">
              {S.wsMatchCount
                .replace("{correct}", String(revealCorrect))
                .replace("{total}", String(revealChecked.length))}
            </p>
            <p className="mt-1 text-muted-foreground">{S.wsRuleNote.replace("{rule}", S.groundTruthRule)}</p>
            <button
              type="button"
              onClick={() => setRevealed(false)}
              className="mt-2 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-avanza-green/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1"
            >
              {S.wsHideKey}
            </button>
          </div>
        )}
      </div>
    </ActivityFrame>
  )
}

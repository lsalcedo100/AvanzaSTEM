"use client"

import type { ReactNode } from "react"
import { Check, X } from "lucide-react"
import {
  SPACE_FRUIT_FEATURES,
  labelText,
  type FeatureKey,
  type SpaceFruit,
  type SpaceFruitLabel,
} from "@/features/curriculums/intro-to-ai-week2-activities"

/**
 * Shared, accessible primitives for the Week 2 "data lab" activities: a label
 * badge (text + shape, never color alone), a bar-count chart with a text summary,
 * and a dataset table that becomes a stacked card layout on narrow screens. No
 * animation, reduced-motion safe, keyboard-neutral (controls come from callers).
 */

/** Formats a feature value for display, showing "—" for a missing value. */
export function featureValue(fruit: SpaceFruit, key: FeatureKey): string {
  if (fruit.incomplete?.includes(key)) return "—"
  const meta = SPACE_FRUIT_FEATURES.find((f) => f.key === key)!
  const v = fruit.features[key]
  return meta.type === "number" && meta.unit ? `${v} ${meta.unit}` : String(v)
}

/** A label shown as text with a distinct icon/shape, so it never relies on color. */
export function LabelBadge({ label }: { label: SpaceFruitLabel | "" | undefined }) {
  if (label === "safe") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-avanza-green/50 bg-avanza-green/10 px-2 py-0.5 text-xs font-semibold text-avanza-green-dark">
        <Check className="h-3 w-3" aria-hidden /> Safe
      </span>
    )
  }
  if (label === "unsafe") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-avanza-orange/50 bg-avanza-orange/10 px-2 py-0.5 text-xs font-semibold text-avanza-orange-dark">
        <X className="h-3 w-3" aria-hidden /> Not safe
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2 py-0.5 text-xs font-semibold text-muted-foreground">
      Unlabeled
    </span>
  )
}

/** A small flag chip (e.g. "Duplicate", "Missing value"). Text-first. */
export function FlagChip({ tone, children }: { tone: "warn" | "info"; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] font-semibold ${
        tone === "warn"
          ? "border-avanza-orange/50 bg-avanza-orange/10 text-avanza-orange-dark"
          : "border-avanza-purple/40 bg-avanza-purple/5 text-avanza-purple-dark"
      }`}
    >
      {children}
    </span>
  )
}

export type CountBar = { label: string; value: number; tone?: "safe" | "unsafe" | "neutral" }

/** Accessible horizontal bar counts with a text summary. */
export function CountBars({ title, unit, bars }: { title: string; unit: string; bars: CountBar[] }) {
  const max = Math.max(1, ...bars.map((b) => b.value))
  const summary = bars.map((b) => `${b.label}: ${b.value}`).join(", ")
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{title}</p>
      <div className="mt-2 space-y-1.5" role="img" aria-label={`${title}. ${summary} (${unit}).`}>
        {bars.map((b) => (
          <div key={b.label} className="grid grid-cols-[7rem_1fr_2.5rem] items-center gap-2 text-sm">
            <span className="truncate text-muted-foreground">{b.label}</span>
            <span className="h-3 rounded-sm bg-secondary">
              <span
                className={`block h-3 rounded-sm ${
                  b.tone === "unsafe" ? "bg-avanza-orange" : b.tone === "neutral" ? "bg-avanza-purple" : "bg-avanza-green"
                }`}
                style={{ width: `${Math.round((b.value / max) * 100)}%` }}
              />
            </span>
            <span className="text-right tabular-nums text-foreground">{b.value}</span>
          </div>
        ))}
      </div>
      <p className="sr-only">
        {title}: {summary}.
      </p>
    </div>
  )
}

export type FruitRow = {
  fruit: SpaceFruit
  /** Chips shown under/next to the name (duplicate, missing, incorrect…). */
  flags?: ReactNode
  /** Per-row controls (label picker, remove button, assignment toggle…). */
  controls?: ReactNode
  /** A note shown after the row (e.g. feedback). */
  note?: ReactNode
  highlighted?: boolean
}

/**
 * Dataset table with a real caption and header on wide screens, and an equivalent
 * stacked card list on narrow screens (the `md:hidden` / `hidden md:block` pair).
 * Both render the same data; neither relies on color to convey meaning.
 */
export function FruitDataTable({
  caption,
  rows,
  controlHeader,
}: {
  caption: string
  rows: FruitRow[]
  controlHeader?: string
}) {
  return (
    <div>
      {/* Wide screens: semantic table. */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <th scope="col" className="border-b border-border px-2 py-2 text-left font-semibold text-foreground">
                Fruit
              </th>
              {SPACE_FRUIT_FEATURES.map((f) => (
                <th key={f.key} scope="col" className="border-b border-border px-2 py-2 text-left font-semibold text-foreground">
                  {f.label}
                </th>
              ))}
              {controlHeader && (
                <th scope="col" className="border-b border-border px-2 py-2 text-left font-semibold text-foreground">
                  {controlHeader}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ fruit, flags, controls, note, highlighted }) => (
              <tr key={fruit.id} className={highlighted ? "bg-avanza-green/5" : undefined}>
                <th scope="row" className="border-b border-border/60 px-2 py-2 text-left align-top font-medium text-foreground">
                  {fruit.name}
                  {flags && <span className="mt-1 flex flex-wrap gap-1">{flags}</span>}
                  {note && <span className="mt-1 block font-normal">{note}</span>}
                </th>
                {SPACE_FRUIT_FEATURES.map((f) => (
                  <td key={f.key} className="border-b border-border/60 px-2 py-2 align-top text-muted-foreground">
                    {featureValue(fruit, f.key)}
                  </td>
                ))}
                {controlHeader && <td className="border-b border-border/60 px-2 py-2 align-top">{controls}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Narrow screens: stacked cards (no table). */}
      <ul className="space-y-3 md:hidden">
        {rows.map(({ fruit, flags, controls, note, highlighted }) => (
          <li key={fruit.id} className={`rounded-md border p-3 ${highlighted ? "border-avanza-green/50 bg-avanza-green/5" : "border-border"}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-bold text-foreground">{fruit.name}</p>
              {flags && <span className="flex flex-wrap gap-1">{flags}</span>}
            </div>
            <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
              {SPACE_FRUIT_FEATURES.map((f) => (
                <div key={f.key} className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">{f.label}</dt>
                  <dd className="text-right font-medium text-foreground">{featureValue(fruit, f.key)}</dd>
                </div>
              ))}
            </dl>
            {controls && <div className="mt-3">{controls}</div>}
            {note && <div className="mt-2">{note}</div>}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** A label picker used by several activities. Keyboard + tap friendly. */
export function LabelPicker({
  value,
  onChange,
  idBase,
}: {
  value: SpaceFruitLabel | ""
  onChange: (label: SpaceFruitLabel | "") => void
  idBase: string
}) {
  return (
    <span className="inline-flex flex-wrap gap-1" role="group" aria-label="Assign a label">
      {(["safe", "unsafe"] as SpaceFruitLabel[]).map((l) => {
        const active = value === l
        return (
          <button
            key={l}
            type="button"
            id={`${idBase}-${l}`}
            aria-pressed={active}
            onClick={() => onChange(active ? "" : l)}
            className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 ${
              active
                ? l === "safe"
                  ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark"
                  : "border-avanza-orange bg-avanza-orange/15 text-avanza-orange-dark"
                : "border-border text-muted-foreground hover:border-avanza-green/50 hover:text-foreground"
            }`}
          >
            {l === "safe" ? <Check className="h-3 w-3" aria-hidden /> : <X className="h-3 w-3" aria-hidden />}
            {labelText(l)}
          </button>
        )
      })}
    </span>
  )
}

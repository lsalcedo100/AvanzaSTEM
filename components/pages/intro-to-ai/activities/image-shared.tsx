"use client"

import { Check, X } from "lucide-react"
import {
  GRID_SIZE,
  gridAt,
  rasterize,
  categoryName,
  type Grid,
  type ImageSpec,
  type Topic,
  type ClassifyResult,
  type Evaluation,
} from "@/features/curriculums/intro-to-ai/activities/week3-images"
import { useLanguage } from "@/components/providers/language-provider"

/** The Week 3 wording in the reader's language. */
function useS() {
  return useLanguage().t.courseUi.ai.week3
}

/**
 * Shared, accessible UI for the Week 3 image lab. All pictures are drawn from
 * generated pixel grids as inline SVG (so they can never fail to load and always
 * carry text alternatives); confidence is always shown as a number; the confusion
 * matrix has a caption, per-cell labels, and a text summary; nothing relies on
 * color alone.
 */

/** Renders a generated pixel grid as crisp inline SVG squares (an accessible image). */
export function PixelImage({ spec, alt, size = 96 }: { spec: ImageSpec; alt: string; size?: number }) {
  const grid: Grid = rasterize(spec)
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${GRID_SIZE} ${GRID_SIZE}`}
      role="img"
      aria-label={alt}
      className="rounded-sm border border-border bg-white"
      shapeRendering="crispEdges"
    >
      <title>{alt}</title>
      <rect x={0} y={0} width={GRID_SIZE} height={GRID_SIZE} fill="#ffffff" />
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
        const row = Math.floor(i / GRID_SIZE)
        const col = i % GRID_SIZE
        const v = gridAt(grid, row, col)
        if (v <= 0.02) return null
        const shade = Math.round(255 * (1 - v))
        return <rect key={i} x={col} y={row} width={1.02} height={1.02} fill={`rgb(${shade},${shade},${shade})`} />
      })}
    </svg>
  )
}

/** A single confidence/similarity bar with an always-present numeric value. */
export function ConfidenceBar({ label, value, emphasis }: { label: string; value: number; emphasis?: boolean }) {
  const pct = Math.round(value * 100)
  return (
    <div className="grid grid-cols-[6rem_1fr_2.5rem] items-center gap-2 text-sm">
      <span className={`truncate ${emphasis ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{label}</span>
      <span className="h-3 rounded-sm bg-secondary" aria-hidden>
        <span className={`block h-3 rounded-sm ${emphasis ? "bg-avanza-green" : "bg-avanza-purple/60"}`} style={{ width: `${pct}%` }} />
      </span>
      <span className="text-right tabular-nums text-foreground">{pct}%</span>
    </div>
  )
}

/** Confidence across every category for one prediction (normalized similarity mass). */
export function ConfidenceBars({ topic, result }: { topic: Topic; result: ClassifyResult }) {
  const S = useS()
  const total = Object.values(result.scores).reduce((a, b) => a + b, 0) || 1
  return (
    <div className="space-y-1.5" role="group" aria-label={S.isConfidenceEach}>
      {topic.categories.map((c) => (
        <ConfidenceBar key={c.id} label={c.name} value={(result.scores[c.id] ?? 0) / total} emphasis={c.id === result.predicted} />
      ))}
    </div>
  )
}

export function ResultBadge({ correct }: { correct: boolean }) {
  const S = useS()
  return correct ? (
    <span className="inline-flex items-center gap-1 font-semibold text-avanza-green-dark">
      <Check className="h-3.5 w-3.5" aria-hidden /> {S.isCorrect}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 font-semibold text-avanza-orange-dark">
      <X className="h-3.5 w-3.5" aria-hidden /> {S.isWrong}
    </span>
  )
}

/**
 * Confusion matrix for any number of categories. Row = actual, column = predicted;
 * the diagonal (correct) cells are marked with text and a border, not color alone.
 * Scrolls on narrow screens and is paired with a text summary and a how-to-read line.
 */
export function ConfusionMatrix({ topic, evaluation }: { topic: Topic; evaluation: Evaluation }) {
  const S = useS()
  const cats = topic.categories
  const total = evaluation.total
  const summary = cats
    .map((cat, i) => {
      const row = evaluation.matrix[i]
      const parts = cats
        .map((c, j) => S.isAsCategory.replace("{n}", String(row[j])).replace("{category}", c.name))
        .join(", ")
      return S.isSummaryRow
        .replace("{n}", String(row.reduce((a, b) => a + b, 0)))
        .replace("{category}", cat.name)
        .replace("{parts}", parts)
    })
    .join(". ")

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="border-collapse text-sm">
          <caption className="sr-only">{S.isMatrixCaption}</caption>
          <thead>
            <tr>
              <th className="px-2 py-1" />
              <th scope="colgroup" colSpan={cats.length} className="px-2 py-1 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {S.isModelPredicted}
              </th>
            </tr>
            <tr>
              <th scope="col" className="px-2 py-1 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {S.isActual}
              </th>
              {cats.map((c) => (
                <th key={c.id} scope="col" className="border-b border-border px-3 py-2 text-center font-semibold text-foreground">
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cats.map((rowCat, i) => (
              <tr key={rowCat.id}>
                <th scope="row" className="border-r border-border px-3 py-2 text-left font-semibold text-foreground">
                  {rowCat.name}
                </th>
                {cats.map((colCat, j) => {
                  const n = evaluation.matrix[i][j]
                  const onDiag = i === j
                  return (
                    <td
                      key={colCat.id}
                      className={`px-4 py-2 text-center tabular-nums ${onDiag ? "border-2 border-avanza-green/60 font-bold text-foreground" : "border border-border/40 text-muted-foreground"}`}
                      aria-label={S.isCellAria
                        .replace("{n}", String(n))
                        .replace("{actual}", rowCat.name)
                        .replace("{predicted}", colCat.name)
                        .replace("{correct}", onDiag ? S.isCorrectSuffix : "")}
                    >
                      {n}
                      {onDiag && <span className="sr-only">{S.isCorrectSr}</span>}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{S.isHowToRead}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {S.isSummaryLine.replace("{n}", String(total)).replace("{summary}", summary)}
      </p>
    </div>
  )
}

/** Per-category accuracy list with counts, percentages, and a low-sample warning. */
export function CategoryAccuracy({ topic, evaluation }: { topic: Topic; evaluation: Evaluation }) {
  const S = useS()
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{S.isAccuracyByCategory}</p>
      <ul className="mt-2 space-y-1 text-sm">
        {topic.categories.map((c) => {
          const s = evaluation.perCategory[c.id]
          const pct = s.total === 0 ? null : Math.round((s.correct / s.total) * 100)
          return (
            <li key={c.id} className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-foreground">{c.name}</span>
              <span className="tabular-nums text-muted-foreground">
                {S.isPerCatLine.replace("{correct}", String(s.correct)).replace("{total}", String(s.total))}
                {pct === null ? "" : ` · ${pct}%`}
                {s.total > 0 && s.total < 2 && <span className="ml-1 text-avanza-orange-dark">{S.isTooFew}</span>}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { categoryName }

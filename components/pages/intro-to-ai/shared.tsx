import Link from "next/link"
import type { VisualExplanation } from "@/features/curriculums/intro-to-ai-types"
import { BeforeAfterDiagram, DecisionTreeDiagram, FlowDiagram } from "@/components/pages/intro-to-ai/diagrams"

/** Breadcrumb trail. Semantic <nav> + ordered list; last item is the current page. */
export function Breadcrumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground">
        {trail.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-border">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="font-medium text-avanza-green-dark underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 rounded"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * Renders a visual explanation. Every visual always shows a text summary (the
 * accessible description). When structured data is present, a real table,
 * confusion matrix, or bar chart is drawn alongside the summary; otherwise the
 * summary itself is the honest description of the diagram (no decorative or fake
 * graphics).
 */
export function VisualBlock({ visual }: { visual: VisualExplanation }) {
  return (
    <figure className="rounded-lg border border-border bg-card p-5">
      <figcaption className="text-sm font-bold text-foreground">{visual.title}</figcaption>

      {visual.kind === "table" && visual.table && <DataTable columns={visual.table.columns} rows={visual.table.rows} />}
      {visual.kind === "confusion-matrix" && visual.matrix && <ConfusionMatrixView labels={visual.matrix.labels} counts={visual.matrix.counts} />}
      {visual.kind === "bar-chart" && visual.chart && <BarChartView unit={visual.chart.unit} bars={visual.chart.bars} />}
      {visual.flow && <FlowDiagram data={visual.flow} label={visual.summary} />}
      {visual.beforeAfter && <BeforeAfterDiagram data={visual.beforeAfter} label={visual.summary} />}
      {visual.tree && <DecisionTreeDiagram node={visual.tree} label={visual.summary} />}

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{visual.summary}</p>
      {visual.caption && <p className="mt-2 text-xs text-muted-foreground">{visual.caption}</p>}
    </figure>
  )
}

function DataTable({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col" className="border-b border-border px-3 py-2 text-left font-semibold text-foreground">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className="border-b border-border/60 px-3 py-2 text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ConfusionMatrixView({ labels, counts }: { labels: string[]; counts: number[][] }) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="border-collapse text-sm">
        <thead>
          <tr>
            <th className="px-3 py-2" />
            <th scope="colgroup" colSpan={labels.length} className="px-3 py-1 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Predicted
            </th>
          </tr>
          <tr>
            <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actual</th>
            {labels.map((l) => (
              <th key={l} scope="col" className="border-b border-border px-3 py-2 text-center font-semibold text-foreground">
                {l}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {counts.map((row, ri) => (
            <tr key={labels[ri] ?? ri}>
              <th scope="row" className="border-r border-border px-3 py-2 text-left font-semibold text-foreground">
                {labels[ri]}
              </th>
              {row.map((n, ci) => {
                const onDiagonal = ri === ci
                return (
                  <td
                    key={ci}
                    className={`px-4 py-2 text-center tabular-nums ${onDiagonal ? "bg-avanza-green/10 font-semibold text-foreground" : "text-muted-foreground"}`}
                  >
                    {n}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function BarChartView({ unit, bars }: { unit: string; bars: { label: string; value: number }[] }) {
  const max = Math.max(1, ...bars.map((b) => b.value))
  return (
    <div className="mt-3 space-y-2" role="img" aria-label={`Bar chart in ${unit}`}>
      {bars.map((b) => (
        <div key={b.label} className="grid grid-cols-[8rem_1fr_3rem] items-center gap-2 text-sm">
          <span className="truncate text-muted-foreground">{b.label}</span>
          <span className="h-3 rounded-sm bg-secondary">
            <span
              className="block h-3 rounded-sm bg-avanza-green"
              style={{ width: `${Math.round((b.value / max) * 100)}%` }}
            />
          </span>
          <span className="text-right tabular-nums text-foreground">{b.value}</span>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">Values shown in {unit}.</p>
    </div>
  )
}

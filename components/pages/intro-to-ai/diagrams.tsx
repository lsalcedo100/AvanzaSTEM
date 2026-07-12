import type { BeforeAfterData, DecisionTreeNode, FlowData } from "@/features/curriculums/intro-to-ai-types"

/**
 * Static, restrained diagram primitives for the lesson system. All are plain
 * layout (no SVG animation, no canvas), so they render identically in
 * reduced-motion mode and in print. Meaning is carried by text, never by color
 * alone; each accepts an accessible label. Used by VisualBlock when a visual
 * provides structured data, and available for future lessons.
 */

/** Input → process → output style flow. Arrows are decorative (aria-hidden). */
export function FlowDiagram({ data, label }: { data: FlowData; label: string }) {
  return (
    <div className="mt-3" role="img" aria-label={label}>
      <ol className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {data.nodes.map((node, i) => (
          <li key={node.id} className="flex flex-col items-stretch gap-2 sm:flex-1 sm:flex-row sm:items-center">
            <div className="flex-1 rounded-md border border-border bg-card px-4 py-3 text-center">
              <p className="text-sm font-semibold text-foreground">{node.label}</p>
              {node.note && <p className="mt-1 text-xs text-muted-foreground">{node.note}</p>}
            </div>
            {i < data.nodes.length - 1 && (
              <span aria-hidden className="self-center text-lg font-bold text-muted-foreground">
                <span className="hidden sm:inline">→</span>
                <span className="sm:hidden">↓</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Two-column comparison (e.g. rules vs. learned patterns, before vs. after). */
export function BeforeAfterDiagram({ data, label }: { data: BeforeAfterData; label: string }) {
  return (
    <div className="mt-3 grid gap-3 sm:grid-cols-2" role="group" aria-label={label}>
      {[data.before, data.after].map((col, i) => (
        <div key={i} className="rounded-md border border-border bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{col.label}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground">
            {col.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/** Nested decision tree, rendered as an accessible indented outline. */
export function DecisionTreeDiagram({ node, label }: { node: DecisionTreeNode; label: string }) {
  return (
    <div className="mt-3" role="group" aria-label={label}>
      <TreeNode node={node} top />
    </div>
  )
}

function TreeNode({ node, top = false }: { node: DecisionTreeNode; top?: boolean }) {
  const isLeaf = !node.branches || node.branches.length === 0
  return (
    <div className={top ? "" : "mt-2"}>
      <p
        className={`inline-block rounded-md border px-3 py-1.5 text-sm ${
          isLeaf ? "border-avanza-green/40 bg-avanza-green/10 font-medium text-foreground" : "border-border bg-card font-semibold text-foreground"
        }`}
      >
        {node.label}
      </p>
      {node.branches && node.branches.length > 0 && (
        <ul className="mt-2 space-y-2 border-l border-border pl-4">
          {node.branches.map((b, i) => (
            <li key={i}>
              <span className="text-xs font-semibold text-muted-foreground">If {b.condition}:</span>
              <TreeNode node={b.child} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

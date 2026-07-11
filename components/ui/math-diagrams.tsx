import type { MathActivityType } from "@/features/curriculums/math-adventures"

/**
 * Small, plain math visuals used inside the lesson activity shell.
 *
 * These are deliberately simple, illustrative diagrams - a number line, fraction
 * bar, bar graph, place-value board, or grid - drawn in the site's muted palette
 * with a teal accent, like a classroom handout rather than decorative art. They
 * give each activity a concrete visual anchor now; a fully interactive version of
 * each activity can replace the matching diagram in a later phase. All are pure
 * SVG (no client JS) and carry an aria-label describing what they show.
 */
export function MathActivityVisual({ type }: { type: MathActivityType }) {
  switch (type) {
    case "number-line":
    case "input-output-machine":
      return <NumberLineViz />
    case "fraction-model":
      return <FractionBarViz />
    case "graph-builder":
      return <BarGraphViz />
    case "place-value-builder":
      return <PlaceValueViz />
    default:
      return <GridViz />
  }
}

/** A 0-10 number line with evenly spaced, numbered ticks. */
function NumberLineViz() {
  const width = 560
  const height = 72
  const marginX = 24
  const y = 32
  const max = 10
  const step = (width - marginX * 2) / max

  return (
    <Frame>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="A number line from 0 to 10 with a tick at each whole number."
        className="w-full text-muted-foreground"
      >
        <line x1={marginX} y1={y} x2={width - marginX} y2={y} stroke="currentColor" strokeWidth={1.5} />
        {Array.from({ length: max + 1 }, (_, i) => {
          const x = marginX + i * step
          return (
            <g key={i}>
              <line x1={x} y1={y - 6} x2={x} y2={y + 6} stroke="currentColor" strokeWidth={1.5} />
              <text
                x={x}
                y={y + 24}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontSize="12"
                fontWeight="600"
                fill="var(--foreground)"
              >
                {i}
              </text>
            </g>
          )
        })}
      </svg>
    </Frame>
  )
}

/** A whole bar split into four equal parts with three shaded (three fourths). */
function FractionBarViz() {
  const width = 560
  const height = 80
  const marginX = 24
  const barY = 20
  const barH = 40
  const parts = 4
  const shaded = 3
  const partW = (width - marginX * 2) / parts

  return (
    <Frame>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="A fraction bar split into four equal parts with three parts shaded, showing three fourths."
        className="w-full text-muted-foreground"
      >
        {Array.from({ length: parts }, (_, i) => (
          <rect
            key={i}
            x={marginX + i * partW}
            y={barY}
            width={partW}
            height={barH}
            fill={i < shaded ? "var(--avanza-teal)" : "var(--card)"}
            stroke="currentColor"
            strokeWidth={1.5}
          />
        ))}
        <text
          x={width / 2}
          y={barY + barH + 16}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="12"
          fontWeight="600"
          fill="var(--foreground)"
        >
          3/4 shaded
        </text>
      </svg>
    </Frame>
  )
}

/** A four-bar graph with a baseline, standing in for a simple data display. */
function BarGraphViz() {
  const width = 560
  const height = 150
  const marginX = 32
  const baseY = 120
  const bars = [80, 50, 40, 30]
  const barW = 56
  const gap = (width - marginX * 2 - bars.length * barW) / (bars.length - 1)

  return (
    <Frame>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="A bar graph with four bars of different heights sharing one baseline."
        className="w-full text-muted-foreground"
      >
        <line x1={marginX} y1={baseY} x2={width - marginX} y2={baseY} stroke="currentColor" strokeWidth={1.5} />
        {bars.map((h, i) => {
          const x = marginX + i * (barW + gap)
          return (
            <g key={i}>
              <rect
                x={x}
                y={baseY - h}
                width={barW}
                height={h}
                fill="var(--avanza-teal)"
                opacity={0.85}
              />
              <text
                x={x + barW / 2}
                y={baseY + 18}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontSize="12"
                fontWeight="600"
                fill="var(--foreground)"
              >
                {["A", "B", "C", "D"][i]}
              </text>
            </g>
          )
        })}
      </svg>
    </Frame>
  )
}

/** A place-value board: four labeled columns holding the digits of 2,345. */
function PlaceValueViz() {
  const columns = [
    { label: "Thousands", digit: "2" },
    { label: "Hundreds", digit: "3" },
    { label: "Tens", digit: "4" },
    { label: "Ones", digit: "5" },
  ]

  return (
    <Frame>
      <div className="grid grid-cols-4 gap-3">
        {columns.map((col) => (
          <div key={col.label} className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {col.label}
            </p>
            <div className="mt-2 flex h-16 items-center justify-center rounded-md border border-border bg-card font-mono text-2xl font-bold text-foreground">
              {col.digit}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center font-mono text-xs font-semibold text-muted-foreground">
        2,345 = 2,000 + 300 + 40 + 5
      </p>
    </Frame>
  )
}

/** A plain square grid ("math paper"), a neutral anchor for any activity. */
function GridViz() {
  return (
    <Frame>
      <div
        className="h-32 w-full rounded-md border border-border"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        role="img"
        aria-label="A blank square grid for working out the activity on paper."
      />
    </Frame>
  )
}

/** Shared padded container so every visual sits in a consistent card. */
function Frame({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-border bg-secondary p-5">{children}</div>
}

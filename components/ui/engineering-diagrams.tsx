import { type EngineeringDiagramKind } from "@/features/curriculums/engineering-fundamentals"

/**
 * Simple force/motion figures for the Engineering Fundamentals lessons.
 *
 * These are deliberately plain blueprint-style line drawings - thin strokes,
 * a couple of labelled arrows, no shading or decoration - like a classroom
 * handout sketch. Pure SVG, no client code. Colors come from the theme via
 * `currentColor` (set by the wrapper's text color) and CSS variables for the
 * label text, so they read in light and dark and print cleanly.
 */
export function EngineeringDiagram({ kind }: { kind: EngineeringDiagramKind }) {
  switch (kind) {
    case "bridge-forces":
      return <BridgeForces />
    case "lever":
      return <Lever />
    case "flight":
      return <Flight />
    case "material-layers":
      return <MaterialLayers />
    default:
      return null
  }
}

function Figure({
  caption,
  label,
  children,
}: {
  caption: string
  label: string
  children: React.ReactNode
}) {
  return (
    <figure className="rounded-lg border border-border p-4">
      <svg
        viewBox="0 0 320 210"
        role="img"
        aria-label={label}
        className="mx-auto block w-full max-w-md text-muted-foreground"
      >
        {children}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">{caption}</figcaption>
    </figure>
  )
}

/** Shared arrowhead marker. `id` must be unique per rendered SVG. */
function ArrowMarker({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
      </marker>
    </defs>
  )
}

const labelProps = {
  fill: "var(--foreground)",
  fontSize: 12,
  fontWeight: 600,
} as const

function BridgeForces() {
  const arrow = "bridge-arrow"
  return (
    <Figure
      label="A bridge deck resting on two supports, with the load pushing down in the middle and the supports pushing up."
      caption="The load pushes down; the supports push up."
    >
      <ArrowMarker id={arrow} />
      {/* Ground */}
      <line x1="30" y1="170" x2="290" y2="170" stroke="currentColor" strokeWidth="1.5" />
      {/* Supports */}
      <rect x="56" y="110" width="12" height="60" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="252" y="110" width="12" height="60" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Deck */}
      <rect x="44" y="96" width="232" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Load arrow (down, center) */}
      <line x1="160" y1="46" x2="160" y2="92" stroke="currentColor" strokeWidth="2" markerEnd={`url(#${arrow})`} />
      <text x="160" y="38" textAnchor="middle" {...labelProps}>
        Load
      </text>
      {/* Support reaction arrows (up) */}
      <line x1="62" y1="150" x2="62" y2="116" stroke="currentColor" strokeWidth="1.5" markerEnd={`url(#${arrow})`} />
      <line x1="258" y1="150" x2="258" y2="116" stroke="currentColor" strokeWidth="1.5" markerEnd={`url(#${arrow})`} />
      <text x="62" y="192" textAnchor="middle" {...labelProps}>
        Support
      </text>
      <text x="258" y="192" textAnchor="middle" {...labelProps}>
        Support
      </text>
    </Figure>
  )
}

function Lever() {
  const arrow = "lever-arrow"
  return (
    <Figure
      label="A lever bar resting on a pivot, with a push down on the long end lifting a load on the short end."
      caption="A push on the long end lifts the load. The bar turns around the pivot."
    >
      <ArrowMarker id={arrow} />
      {/* Ground */}
      <line x1="40" y1="160" x2="280" y2="160" stroke="currentColor" strokeWidth="1.5" />
      {/* Lever bar */}
      <line x1="52" y1="100" x2="272" y2="100" stroke="currentColor" strokeWidth="3" />
      {/* Fulcrum / pivot */}
      <path d="M120,100 L104,150 L136,150 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="120" y="176" textAnchor="middle" {...labelProps}>
        Pivot
      </text>
      {/* Load box on short (left) end */}
      <rect x="48" y="78" width="20" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="58" y="66" textAnchor="middle" {...labelProps}>
        Load
      </text>
      {/* Push arrow (down) on long (right) end */}
      <line x1="256" y1="54" x2="256" y2="94" stroke="currentColor" strokeWidth="2" markerEnd={`url(#${arrow})`} />
      <text x="256" y="46" textAnchor="middle" {...labelProps}>
        Push
      </text>
    </Figure>
  )
}

function Flight() {
  const arrow = "flight-arrow"
  return (
    <Figure
      label="A glider with arrows: lift pushing up, weight pulling down, drag pushing back, and motion forward."
      caption="Weight pulls down, lift holds up, drag slows it, motion carries it forward."
    >
      <ArrowMarker id={arrow} />
      {/* Glider body (simple dart at center) */}
      <path d="M148,100 L178,92 L170,100 L178,108 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Lift (up) */}
      <line x1="160" y1="90" x2="160" y2="44" stroke="currentColor" strokeWidth="2" markerEnd={`url(#${arrow})`} />
      <text x="160" y="36" textAnchor="middle" {...labelProps}>
        Lift
      </text>
      {/* Weight (down) */}
      <line x1="160" y1="110" x2="160" y2="158" stroke="currentColor" strokeWidth="2" markerEnd={`url(#${arrow})`} />
      <text x="160" y="176" textAnchor="middle" {...labelProps}>
        Weight
      </text>
      {/* Drag (back, left) */}
      <line x1="146" y1="100" x2="92" y2="100" stroke="currentColor" strokeWidth="2" markerEnd={`url(#${arrow})`} />
      <text x="84" y="104" textAnchor="end" {...labelProps}>
        Drag
      </text>
      {/* Motion (forward, right) */}
      <line x1="184" y1="100" x2="236" y2="100" stroke="currentColor" strokeWidth="2" markerEnd={`url(#${arrow})`} />
      <text x="244" y="104" textAnchor="start" {...labelProps}>
        Motion
      </text>
    </Figure>
  )
}

function MaterialLayers() {
  const arrow = "layers-arrow"
  // Layer separator lines, with x-edges interpolated along the cup's sloped sides.
  const bands = [
    { y: 84, label: "Cotton" },
    { y: 116, label: "Sand" },
    { y: 148, label: "Gravel" },
  ]
  const edgeAt = (y: number) => {
    const t = (y - 55) / 120
    return { left: 110 + 18 * t, right: 210 - 18 * t }
  }
  return (
    <Figure
      label="A cup filled with layers of cotton, sand, and gravel. Cloudy water goes in the top and clearer water comes out the bottom."
      caption="Water passes through layers of material and comes out clearer."
    >
      <ArrowMarker id={arrow} />
      {/* Cloudy water in */}
      <line x1="160" y1="24" x2="160" y2="50" stroke="currentColor" strokeWidth="2" markerEnd={`url(#${arrow})`} />
      <text x="160" y="16" textAnchor="middle" {...labelProps}>
        Cloudy water
      </text>
      {/* Cup */}
      <path d="M110,55 L210,55 L192,175 L128,175 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Layers + labels */}
      {bands.map((band) => {
        const { left, right } = edgeAt(band.y)
        return (
          <g key={band.label}>
            <line x1={left} y1={band.y} x2={right} y2={band.y} stroke="currentColor" strokeWidth="1.5" />
            <line x1={right} y1={band.y} x2="238" y2={band.y} stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <text x="242" y={band.y + 4} textAnchor="start" {...labelProps}>
              {band.label}
            </text>
          </g>
        )
      })}
      {/* Clearer water out */}
      <line x1="160" y1="178" x2="160" y2="200" stroke="currentColor" strokeWidth="2" markerEnd={`url(#${arrow})`} />
      <text x="160" y="209" textAnchor="middle" {...labelProps}>
        Clearer water
      </text>
    </Figure>
  )
}

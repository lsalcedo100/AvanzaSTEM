import { type ScienceDiagramKind } from "@/features/curriculums/science-experiments"

/**
 * Simple, labeled concept figures for the Science Experiments lessons.
 *
 * Like the Engineering diagrams, these are deliberately plain line drawings -
 * thin strokes, a few labeled parts and arrows, no shading or decoration - the
 * kind of sketch a teacher would draw on a whiteboard. Pure SVG, no client code.
 * Strokes use `currentColor` (set by the wrapper's text color) and labels use
 * the theme's foreground variable, so they read in light and dark and print
 * cleanly. Every figure carries an `aria-label` describing what it shows.
 */
export function ScienceDiagram({ kind }: { kind: ScienceDiagramKind }) {
  switch (kind) {
    case "paper-helicopter":
      return <PaperHelicopter />
    case "balloon-gas":
      return <BalloonGas />
    case "ice-insulation":
      return <IceInsulation />
    case "ramp-forces":
      return <RampForces />
    case "triangle-tower":
      return <TriangleTower />
    case "plant-growth":
      return <PlantGrowth />
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
    <figure className="rounded-lg border border-border bg-card p-4">
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
  fontSize: 11,
  fontWeight: 600,
} as const

/** A thin dashed leader line pointing from a label toward the thing it names. */
function Leader({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number | string
  y1: number | string
  x2: number | string
  y2: number | string
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="3 3"
    />
  )
}

function PaperHelicopter() {
  const arrow = "heli-arrow"
  return (
    <Figure
      label="A paper helicopter: two blades at the top, a straight body, and a paper clip on the bottom. It spins as it falls."
      caption="The blades catch air and spin, so the helicopter falls slowly."
    >
      <ArrowMarker id={arrow} />
      {/* Blades (folded in opposite directions from a top hub) */}
      <path d="M160,66 L96,52 L96,64 L160,74 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M160,66 L224,52 L224,64 L160,74 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Body */}
      <rect x="153" y="74" width="14" height="72" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Paper clip */}
      <rect x="149" y="146" width="22" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="155" y1="149" x2="155" y2="161" stroke="currentColor" strokeWidth="1" />
      {/* Spin arrow */}
      <path d="M188,60 A22 10 0 0 1 232,62" fill="none" stroke="currentColor" strokeWidth="1.5" markerEnd={`url(#${arrow})`} />
      <text x="210" y="40" textAnchor="middle" {...labelProps}>Spins</text>
      {/* Labels + leaders */}
      <Leader x1="70" y1="58" x2="112" y2="58" />
      <text x="66" y="62" textAnchor="end" {...labelProps}>Blade</text>
      <Leader x1="250" y1="58" x2="208" y2="58" />
      <text x="254" y="62" textAnchor="start" {...labelProps}>Blade</text>
      <Leader x1="210" y1="110" x2="169" y2="110" />
      <text x="214" y="114" textAnchor="start" {...labelProps}>Body</text>
      <Leader x1="160" y1="184" x2="160" y2="166" />
      <text x="160" y="198" textAnchor="middle" {...labelProps}>Paper clip</text>
    </Figure>
  )
}

function BalloonGas() {
  const arrow = "gas-arrow"
  return (
    <Figure
      label="A bottle of vinegar with a balloon on top. Gas from the reaction rises out of the liquid and fills the balloon."
      caption="The reaction makes carbon dioxide gas, which rises and fills the balloon."
    >
      <ArrowMarker id={arrow} />
      {/* Balloon */}
      <ellipse cx="160" cy="46" rx="34" ry="28" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Bottle neck */}
      <rect x="150" y="70" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Bottle body */}
      <path d="M126,90 L194,90 L188,186 L132,186 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Liquid line */}
      <line x1="135" y1="150" x2="185" y2="150" stroke="currentColor" strokeWidth="1.5" />
      {/* Bubbles */}
      <circle cx="146" cy="164" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="160" cy="170" r="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="173" cy="162" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      {/* Gas rising arrow */}
      <line x1="160" y1="146" x2="160" y2="76" stroke="currentColor" strokeWidth="2" markerEnd={`url(#${arrow})`} />
      {/* Labels */}
      <text x="160" y="14" textAnchor="middle" {...labelProps}>Balloon fills up</text>
      <Leader x1="214" y1="110" x2="172" y2="110" />
      <text x="218" y="114" textAnchor="start" {...labelProps}>Gas</text>
      <Leader x1="96" y1="150" x2="133" y2="150" />
      <text x="92" y="154" textAnchor="end" {...labelProps}>Vinegar</text>
      <Leader x1="214" y1="170" x2="176" y2="168" />
      <text x="218" y="174" textAnchor="start" {...labelProps}>Bubbles</text>
    </Figure>
  )
}

function IceInsulation() {
  const arrow = "ice-arrow"
  return (
    <Figure
      label="Two ice cubes. The left one is wrapped in an insulating material and melts slower. The right one is bare and melts faster."
      caption="Heat from the room reaches bare ice faster; a wrap slows the heat down."
    >
      <ArrowMarker id={arrow} />
      {/* Heat arrows from the top */}
      <line x1="82" y1="44" x2="82" y2="86" stroke="currentColor" strokeWidth="1.5" markerEnd={`url(#${arrow})`} />
      <line x1="238" y1="44" x2="238" y2="118" stroke="currentColor" strokeWidth="1.5" markerEnd={`url(#${arrow})`} />
      <text x="160" y="34" textAnchor="middle" {...labelProps}>Heat from the warm room</text>
      {/* Left: wrapped */}
      <rect x="52" y="92" width="60" height="60" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" />
      <rect x="70" y="108" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="82" y="176" textAnchor="middle" {...labelProps}>Wrapped</text>
      <text x="82" y="190" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10">melts slower</text>
      {/* Right: bare */}
      <rect x="214" y="118" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="226" y="176" textAnchor="middle" {...labelProps}>Bare</text>
      <text x="226" y="190" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10">melts faster</text>
      {/* Ice labels */}
      <text x="82" y="124" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10">ice</text>
      <text x="226" y="134" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10">ice</text>
    </Figure>
  )
}

function RampForces() {
  const arrow = "ramp-arrow"
  return (
    <Figure
      label="A car on a ramp. Gravity pulls it down the ramp, it moves down the slope, and friction from the surface slows it."
      caption="Gravity pulls the car down the ramp; friction from the surface slows it."
    >
      <ArrowMarker id={arrow} />
      {/* Ground */}
      <line x1="28" y1="178" x2="292" y2="178" stroke="currentColor" strokeWidth="1.5" />
      {/* Ramp triangle */}
      <path d="M60,80 L60,178 L260,178 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Car (box on the slope) */}
      <rect
        x="118"
        y="103"
        width="26"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(25 131 111)"
      />
      {/* Gravity (down) */}
      <line x1="131" y1="122" x2="131" y2="162" stroke="currentColor" strokeWidth="2" markerEnd={`url(#${arrow})`} />
      <text x="131" y="176" textAnchor="middle" {...labelProps}>Gravity</text>
      {/* Motion (down the slope) */}
      <line x1="150" y1="120" x2="196" y2="142" stroke="currentColor" strokeWidth="2" markerEnd={`url(#${arrow})`} />
      <text x="212" y="146" textAnchor="start" {...labelProps}>Motion</text>
      {/* Friction (up the slope) */}
      <line x1="120" y1="102" x2="86" y2="86" stroke="currentColor" strokeWidth="2" markerEnd={`url(#${arrow})`} />
      <text x="80" y="82" textAnchor="end" {...labelProps}>Friction</text>
      {/* Surface label */}
      <Leader x1="215" y1="196" x2="200" y2="178" />
      <text x="219" y="200" textAnchor="start" {...labelProps}>Surface</text>
    </Figure>
  )
}

function TriangleTower() {
  const arrow = "tower-arrow"
  return (
    <Figure
      label="A tower braced with triangles. A load pushes down on top, the triangle braces hold their shape, and a wide base keeps it steady."
      caption="Triangles keep their shape and a wide base stays steady, so the tower holds the load."
    >
      <ArrowMarker id={arrow} />
      {/* Legs */}
      <line x1="100" y1="176" x2="145" y2="72" stroke="currentColor" strokeWidth="1.5" />
      <line x1="220" y1="176" x2="175" y2="72" stroke="currentColor" strokeWidth="1.5" />
      {/* Top and base beams */}
      <line x1="145" y1="72" x2="175" y2="72" stroke="currentColor" strokeWidth="1.5" />
      <line x1="100" y1="176" x2="220" y2="176" stroke="currentColor" strokeWidth="1.5" />
      {/* Horizontal cross beams */}
      <line x1="115" y1="141" x2="205" y2="141" stroke="currentColor" strokeWidth="1.5" />
      <line x1="130" y1="107" x2="190" y2="107" stroke="currentColor" strokeWidth="1.5" />
      {/* Diagonal braces (make triangles) */}
      <line x1="100" y1="176" x2="205" y2="141" stroke="currentColor" strokeWidth="1.5" />
      <line x1="115" y1="141" x2="190" y2="107" stroke="currentColor" strokeWidth="1.5" />
      <line x1="130" y1="107" x2="175" y2="72" stroke="currentColor" strokeWidth="1.5" />
      {/* Load arrow */}
      <line x1="160" y1="34" x2="160" y2="68" stroke="currentColor" strokeWidth="2" markerEnd={`url(#${arrow})`} />
      <text x="160" y="26" textAnchor="middle" {...labelProps}>Load</text>
      {/* Labels */}
      <Leader x1="246" y1="120" x2="200" y2="124" />
      <text x="250" y="124" textAnchor="start" {...labelProps}>Triangle brace</text>
      <text x="160" y="196" textAnchor="middle" {...labelProps}>Wide base</text>
    </Figure>
  )
}

function PlantGrowth() {
  return (
    <Figure
      label="A plant with roots below the soil and a stem and leaves above it. A sun gives light and water goes to the roots."
      caption="A plant needs light, water, and air to grow leaves, a stem, and roots."
    >
      {/* Sun with rays */}
      <circle cx="56" cy="46" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const a = (deg * Math.PI) / 180
        return (
          <line
            key={deg}
            x1={56 + 19 * Math.cos(a)}
            y1={46 + 19 * Math.sin(a)}
            x2={56 + 26 * Math.cos(a)}
            y2={46 + 26 * Math.sin(a)}
            stroke="currentColor"
            strokeWidth="1.5"
          />
        )
      })}
      <text x="56" y="86" textAnchor="middle" {...labelProps}>Light</text>
      {/* Soil line */}
      <line x1="70" y1="150" x2="270" y2="150" stroke="currentColor" strokeWidth="1.5" />
      {/* Stem */}
      <line x1="176" y1="150" x2="176" y2="84" stroke="currentColor" strokeWidth="1.5" />
      {/* Leaves */}
      <path d="M176,110 Q150,98 134,116 Q156,124 176,110 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M176,96 Q202,84 218,102 Q196,110 176,96 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Roots */}
      <path d="M176,150 L160,178 M176,150 L176,186 M176,150 L192,176 M176,168 L166,180 M176,170 L188,182" fill="none" stroke="currentColor" strokeWidth="1.2" />
      {/* Water droplets */}
      <path d="M104,150 q-5,8 0,12 q5,-4 0,-12 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M118,156 q-4,7 0,10 q4,-3 0,-10 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      {/* Labels */}
      <Leader x1="250" y1="98" x2="214" y2="100" />
      <text x="254" y="102" textAnchor="start" {...labelProps}>Leaves</text>
      <Leader x1="212" y1="130" x2="178" y2="130" />
      <text x="216" y="134" textAnchor="start" {...labelProps}>Stem</text>
      <text x="176" y="200" textAnchor="middle" {...labelProps}>Roots</text>
      <text x="98" y="186" textAnchor="middle" {...labelProps}>Water</text>
    </Figure>
  )
}

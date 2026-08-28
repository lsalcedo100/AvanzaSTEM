"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"

type LabCard = {
  href: string
  eyebrow: string
  title: string
  description: string
  preview: "code" | "bridge" | "tower" | "atom"
}

export function InteractiveLabTeasers() {
  const { t } = useLanguage()
  const labs: LabCard[] = [
    {
      href: "/games#python",
      eyebrow: t.home.pyEyebrow,
      title: t.home.pyTitle,
      description: t.home.pyDesc,
      preview: "code",
    },
    {
      href: "/games#bridge",
      eyebrow: t.home.bridgeEyebrow,
      title: t.home.bridgeTitle,
      description: t.home.bridgeDesc,
      preview: "bridge",
    },
    {
      href: "/games#tower",
      eyebrow: t.home.jengaEyebrow,
      title: t.home.jengaTitle,
      description: t.home.jengaDesc,
      preview: "tower",
    },
    {
      href: "/games#atom",
      eyebrow: t.home.atomEyebrow,
      title: t.home.atomTitle,
      description: t.home.atomDesc,
      preview: "atom",
    },
  ]

  return (
    <section className="bg-[#fff8e7] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
            {t.home.labsTeaserTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.home.labsTeaserDesc}
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {labs.map((lab, index) => (
            <FadeIn key={lab.href} delay={index * 70} className="h-full">
              <LabCard lab={lab} cta={t.gamesPage.cardOpen} />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 flex justify-center">
          <Link
            href="/games"
            className="group inline-flex items-center gap-2 rounded-lg bg-avanza-dark px-7 py-3.5 text-base font-extrabold text-primary-foreground shadow-[0_16px_36px_-18px_rgba(26,26,46,0.65)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_44px_-18px_rgba(26,26,46,0.75)]"
          >
            {t.home.labsTeaserCta}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}

function LabCard({ lab, cta }: { lab: LabCard; cta: string }) {
  return (
    <Link
      href={lab.href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_48px_-30px_rgba(26,26,46,0.42)] ring-1 ring-avanza-dark/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_58px_-30px_rgba(26,26,46,0.5)]"
    >
      <StaticPreview type={lab.preview} />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
          {lab.eyebrow}
        </p>
        <h3 className="mt-2 text-xl font-extrabold leading-snug text-foreground">
          {lab.title}
        </h3>
        <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {lab.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold text-avanza-green transition-all duration-200 group-hover:gap-2.5">
          {cta}
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

function StaticPreview({ type }: { type: LabCard["preview"] }) {
  // Each preview mirrors the backdrop of the real activity it links to, so the
  // card reads as a thumbnail of the lab rather than a generic illustration.
  const backdrop = {
    code: "bg-[#fff8e8]",
    bridge: "bg-[#f5fbf3]",
    tower: "bg-[#0d3b66]",
    atom: "bg-[#fbf6ff]",
  }[type]

  return (
    <div className={cn("relative h-40 overflow-hidden", backdrop)}>
      {type === "code" && (
        <div className="relative flex h-full items-center justify-center px-4">
          <CodePreview />
        </div>
      )}
      {type === "bridge" && <BridgePreview />}
      {type === "tower" && <TowerPreview />}
      {type === "atom" && <AtomPreview />}
    </div>
  )
}

function CodePreview() {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-[#0f1024] shadow-[0_14px_30px_-16px_rgba(15,16,36,0.7)] ring-1 ring-white/10">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-[#16172e] px-2.5 py-1.5">
        <span className="font-mono text-[9px] font-medium text-white/40">main.py</span>
        <span className="inline-flex items-center gap-1 rounded-md bg-avanza-green px-2 py-[3px] text-[9px] font-bold text-avanza-dark">
          <svg viewBox="0 0 8 8" className="h-2 w-2" aria-hidden="true">
            <path d="M1 0.5 7 4 1 7.5Z" fill="currentColor" />
          </svg>
          Run
        </span>
      </div>

      <div className="flex bg-[#0c0d1f] py-2 font-mono text-[9px] leading-[1.7]">
        <div className="w-6 shrink-0 pr-2 text-right text-[#3c4256]">
          <p>1</p>
          <p>2</p>
        </div>
        <div className="min-w-0 pr-2">
          <p className="truncate text-[#6b7688]"># Write code, then Run.</p>
          <p className="truncate">
            <span className="text-[#82aaff]">print</span>
            <span className="text-[#8b93a7]">(</span>
            <span className="text-[#c3e88d]">&quot;Hello, world!&quot;</span>
            <span className="text-[#8b93a7]">)</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 border-t border-white/10 bg-[#0b0c1a] px-2.5 py-1.5 font-mono text-[9px]">
        <span className="text-avanza-green">&gt;_</span>
        <span className="truncate text-[#d8dee9]">Hello, world!</span>
      </div>
    </div>
  )
}

// Six-panel truss under load: the deck sags, members recolour by stress, and a
// stack of weight blocks sits mid-span, matching the loaded state of the lab.
const BRIDGE_PANELS = 6
const BRIDGE_SPAN_START = 42
const BRIDGE_SPAN_END = 278
const BRIDGE_DECK_Y = 108
const BRIDGE_CHORD_Y = 62
const BRIDGE_DECK_SAG = 11
const BRIDGE_CHORD_SAG = 9

function bridgeNode(index: number, top: boolean) {
  const t = index / BRIDGE_PANELS
  const baseY = top ? BRIDGE_CHORD_Y : BRIDGE_DECK_Y
  const sag = top ? BRIDGE_CHORD_SAG : BRIDGE_DECK_SAG
  return {
    x: BRIDGE_SPAN_START + (BRIDGE_SPAN_END - BRIDGE_SPAN_START) * t,
    y: baseY + 4 * sag * t * (1 - t),
  }
}

const BRIDGE_TOP = Array.from({ length: BRIDGE_PANELS + 1 }, (_, i) => bridgeNode(i, true))
const BRIDGE_BOTTOM = Array.from({ length: BRIDGE_PANELS + 1 }, (_, i) => bridgeNode(i, false))

// Weight blocks keep the randomised palette feel of the real load stack.
const BRIDGE_WEIGHTS = ["#14a58c", "#3b2f17", "#dfe12b", "#3b3fc0", "#7b1338"]

function BridgePreview() {
  const points = (nodes: { x: number; y: number }[]) =>
    nodes.map((n) => `${n.x},${n.y}`).join(" ")
  const mid = BRIDGE_BOTTOM[BRIDGE_PANELS / 2]

  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="Truss bridge lab preview: weight stacked on a sagging deck"
    >
      <defs>
        <linearGradient id="lab-bridge-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff8e8" />
          <stop offset="100%" stopColor="#ecfbf4" />
        </linearGradient>
        <linearGradient id="lab-bridge-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bdeefa" />
          <stop offset="100%" stopColor="#7ccbdc" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#lab-bridge-sky)" />

      {/* River and the stone abutments the span rests on */}
      <rect x="30" y="122" width="260" height="58" fill="url(#lab-bridge-water)" />
      <path
        d="M46 140h228M46 158h228"
        fill="none"
        stroke="#e8fbff"
        strokeOpacity="0.55"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <g>
        <rect x="0" y="112" width="52" height="10" fill="#d5d0bf" />
        <rect x="268" y="112" width="52" height="10" fill="#d5d0bf" />
        <rect x="4" y="122" width="44" height="58" fill="#bcb4a0" />
        <rect x="272" y="122" width="44" height="58" fill="#bcb4a0" />
        <g stroke="#938b79" strokeOpacity="0.55" strokeWidth="1.5">
          <path d="M4 140h44M4 158h44M26 122v18M15 140v18M37 140v18M26 158v22" />
          <path d="M272 140h44M272 158h44M294 122v18M283 140v18M305 140v18M294 158v22" />
        </g>
      </g>

      {/* Truss members, tinted by how hard each one is working */}
      <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points={points(BRIDGE_TOP)} stroke="#1a1a2e" strokeWidth="4" />
        {Array.from({ length: BRIDGE_PANELS }, (_, panel) => {
          const outer = panel === 0 || panel === BRIDGE_PANELS - 1
          const a = BRIDGE_TOP[panel]
          const b = BRIDGE_TOP[panel + 1]
          const c = BRIDGE_BOTTOM[panel]
          const d = BRIDGE_BOTTOM[panel + 1]
          return (
            <g key={panel} stroke={outer ? "#fbbf24" : "#f97316"}>
              <path d={`M${a.x} ${a.y}L${d.x} ${d.y}`} />
              <path d={`M${b.x} ${b.y}L${c.x} ${c.y}`} />
            </g>
          )
        })}
        {BRIDGE_TOP.map((node, i) => (
          <path
            key={i}
            d={`M${node.x} ${node.y}L${BRIDGE_BOTTOM[i].x} ${BRIDGE_BOTTOM[i].y}`}
            stroke="#1a1a2e"
          />
        ))}
      </g>

      {/* Deck: wooden roadway that bows under the load */}
      <polyline points={points(BRIDGE_BOTTOM)} fill="none" stroke="#1a1a2e" strokeWidth="12" strokeLinecap="round" />
      <polyline points={points(BRIDGE_BOTTOM)} fill="none" stroke="#fff4d8" strokeWidth="8" strokeLinecap="round" />
      <g stroke="#e6d3a4" strokeWidth="1.1">
        {Array.from({ length: 15 }, (_, i) => {
          const node = bridgeNode(((i + 1) * BRIDGE_PANELS) / 16, false)
          return <path key={i} d={`M${node.x} ${node.y - 3.5}v7`} />
        })}
      </g>

      {/* The load itself, stacked block by block at mid-span */}
      <g>
        {BRIDGE_WEIGHTS.map((color, i) => (
          <rect
            key={color}
            x={mid.x - 20}
            y={mid.y - 6 - (i + 1) * 10}
            width="40"
            height="10"
            rx="2"
            fill={color}
            stroke="#1a1a2e"
            strokeWidth="1.5"
          />
        ))}
        <rect
          x={mid.x - 22}
          y={mid.y - 6 - (BRIDGE_WEIGHTS.length + 1) * 10 - 2}
          width="44"
          height="14"
          rx="3"
          fill="#8fce3f"
          stroke="#1a1a2e"
          strokeWidth="1.5"
        />
        <text
          x={mid.x}
          y={mid.y - 6 - (BRIDGE_WEIGHTS.length + 1) * 10 + 8}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fontWeight="800"
          fill="#1a1a2e"
        >
          20 kg
        </text>
      </g>
    </svg>
  )
}

// Blueprint board with a supply tray, a goal line and hand-stacked planks,
// mirroring the Tower Stability Lab canvas.
const TOWER_PLANKS = [
  { x: 146, y: 129, fill: "#d98b35", rotate: -1.5 },
  { x: 151, y: 117, fill: "#edb765", rotate: 1.5 },
  { x: 144, y: 105, fill: "#c9792d", rotate: -2.5 },
  { x: 153, y: 93, fill: "#e39a45", rotate: 2 },
  { x: 147, y: 81, fill: "#dda85b", rotate: -1 },
]

const TOWER_TRAY_PLANKS = [
  { x: 18, y: 78, fill: "#e39a45" },
  { x: 18, y: 92, fill: "#c9792d" },
  { x: 18, y: 106, fill: "#edb765" },
]

function TowerPlank({
  x,
  y,
  width = 52,
  fill,
  rotate = 0,
}: {
  x: number
  y: number
  width?: number
  fill: string
  rotate?: number
}) {
  return (
    <g transform={`rotate(${rotate} ${x + width / 2} ${y + 5.5})`}>
      <rect x={x} y={y} width={width} height="11" rx="2" fill={fill} stroke="#8a4a24" strokeOpacity="0.6" strokeWidth="1" />
      <rect x={x + 3} y={y + 2} width={width - 6} height="2" rx="1" fill="#fff" fillOpacity="0.32" />
      <rect x={x + 3} y={y + 7} width={width - 6} height="2" rx="1" fill="#70401f" fillOpacity="0.3" />
    </g>
  )
}

function TowerPreview() {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="Tower lab preview: wooden blocks stacked toward the goal line"
    >
      <defs>
        <pattern id="lab-tower-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="#fff" strokeOpacity="0.055" strokeWidth="1" />
        </pattern>
        <pattern id="lab-tower-grid-major" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M64 0H0V64" fill="none" stroke="#fff" strokeOpacity="0.11" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="320" height="180" fill="#0d3b66" />
      <rect width="320" height="180" fill="url(#lab-tower-grid)" />
      <rect width="320" height="180" fill="url(#lab-tower-grid-major)" />

      {/* Supply tray you drag blocks out of */}
      <rect x="10" y="62" width="68" height="66" rx="5" fill="#0a2f52" fillOpacity="0.6" stroke="#e0f2fe" strokeOpacity="0.25" />
      {TOWER_TRAY_PLANKS.map((plank) => (
        <TowerPlank key={plank.y} x={plank.x} y={plank.y} width={44} fill={plank.fill} />
      ))}

      {/* Build zone, goal line and the base platform */}
      <rect x="104" y="72" width="152" height="72" fill="#6ee7b7" fillOpacity="0.1" />
      <path d="M104 72v72M256 72v72" stroke="#a7f3d0" strokeOpacity="0.6" strokeWidth="1" />
      <path d="M84 72h172" stroke="#fcd34d" strokeOpacity="0.65" strokeWidth="1.5" strokeDasharray="6 5" />
      <rect x="254" y="65" width="52" height="14" rx="2" fill="#fcd34d" />
      <text
        x="280"
        y="75"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="8.5"
        fontWeight="900"
        fill="#020617"
      >
        5 rows
      </text>

      {TOWER_PLANKS.map((plank) => (
        <TowerPlank key={plank.y} {...plank} />
      ))}

      <rect x="104" y="141" width="152" height="12" fill="#24324a" stroke="#111827" strokeWidth="1" />
    </svg>
  )
}

// Oxygen-16: a packed nucleus of protons and neutrons inside two dashed
// electron shells, exactly what the chemistry bench draws.
const ATOM_CX = 160
const ATOM_CY = 90

function atomRing(count: number, radius: number, offset: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = offset + (i * 2 * Math.PI) / count
    return { x: ATOM_CX + radius * Math.cos(angle), y: ATOM_CY + radius * Math.sin(angle) }
  })
}

const ATOM_NUCLEONS = [
  { x: ATOM_CX, y: ATOM_CY },
  ...atomRing(6, 12, 0),
  ...atomRing(8, 21, Math.PI / 8),
].map((pos, i) => ({ ...pos, kind: i % 2 === 0 ? "p" : "n" }))

const ATOM_SHELLS = [
  { radius: 40, electrons: atomRing(2, 40, -Math.PI / 2) },
  { radius: 58, electrons: atomRing(6, 58, -Math.PI / 3) },
]

function AtomPreview() {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="Atom lab preview: an oxygen nucleus inside two electron shells"
    >
      <defs>
        <radialGradient id="lab-atom-bg" cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor="#f6efff" />
          <stop offset="100%" stopColor="#ffffff" />
        </radialGradient>
        <radialGradient id="lab-atom-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.42" />
          <stop offset="70%" stopColor="#a7f3d0" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="320" height="180" fill="url(#lab-atom-bg)" />
      <circle cx={ATOM_CX} cy={ATOM_CY} r="34" fill="url(#lab-atom-glow)" />

      {ATOM_SHELLS.map((shell) => (
        <circle
          key={shell.radius}
          cx={ATOM_CX}
          cy={ATOM_CY}
          r={shell.radius}
          fill="none"
          stroke="#9ca3af"
          strokeWidth="1.1"
          strokeDasharray="4 6"
        />
      ))}

      {ATOM_NUCLEONS.map((nucleon, i) => (
        <g key={i}>
          <circle
            cx={nucleon.x}
            cy={nucleon.y}
            r="6"
            fill={nucleon.kind === "p" ? "#f97316" : "#cbd5e1"}
            stroke="#1a1a2e"
            strokeWidth="1"
          />
          <text
            x={nucleon.x}
            y={nucleon.y + 2.6}
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize="7"
            fontWeight="800"
            fill={nucleon.kind === "p" ? "#fff" : "#1a1a2e"}
          >
            {nucleon.kind === "p" ? "+" : "n"}
          </text>
        </g>
      ))}

      {ATOM_SHELLS.flatMap((shell) =>
        shell.electrons.map((electron, i) => (
          <g key={`${shell.radius}-${i}`}>
            <circle cx={electron.x} cy={electron.y} r="5.8" fill="#1abc9c" />
            <text
              x={electron.x}
              y={electron.y + 2.5}
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontSize="7"
              fontWeight="800"
              fill="#fff"
            >
              e
            </text>
          </g>
        )),
      )}
    </svg>
  )
}

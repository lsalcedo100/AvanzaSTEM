"use client"

import { useEffect, useMemo, useState } from "react"
import { Minus, Plus, RotateCcw, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"

const ELEMENTS: Array<{ symbol: string; name: string }> = [
  { symbol: "?", name: "None" }, // index 0 = empty
  { symbol: "H", name: "Hydrogen" },
  { symbol: "He", name: "Helium" },
  { symbol: "Li", name: "Lithium" },
  { symbol: "Be", name: "Beryllium" },
  { symbol: "B", name: "Boron" },
  { symbol: "C", name: "Carbon" },
  { symbol: "N", name: "Nitrogen" },
  { symbol: "O", name: "Oxygen" },
  { symbol: "F", name: "Fluorine" },
  { symbol: "Ne", name: "Neon" },
  { symbol: "Na", name: "Sodium" },
  { symbol: "Mg", name: "Magnesium" },
]
const MAX_PROTONS = ELEMENTS.length - 1

type ParticleKind = "proton" | "neutron" | "electron"

const SHELL_CAPACITIES = [2, 8, 8] // we cap electrons at 12 for max proton 12

export function AtomBuilder() {
  const { t } = useLanguage()
  const [protons, setProtons] = useState(1)
  const [neutrons, setNeutrons] = useState(0)
  const [electrons, setElectrons] = useState(1)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [])

  const element = ELEMENTS[Math.min(protons, MAX_PROTONS)]
  const massNumber = protons + neutrons
  const charge = protons - electrons
  const isNeutral = charge === 0
  const isStableLike = isNeutral && Math.abs(neutrons - protons) <= 2

  const inc = (kind: ParticleKind) => {
    if (kind === "proton" && protons < MAX_PROTONS) setProtons((p) => p + 1)
    if (kind === "neutron" && neutrons < MAX_PROTONS + 4) setNeutrons((n) => n + 1)
    if (kind === "electron" && electrons < MAX_PROTONS) setElectrons((e) => e + 1)
  }
  const dec = (kind: ParticleKind) => {
    if (kind === "proton" && protons > 0) setProtons((p) => p - 1)
    if (kind === "neutron" && neutrons > 0) setNeutrons((n) => n - 1)
    if (kind === "electron" && electrons > 0) setElectrons((e) => e - 1)
  }

  const reset = () => {
    setProtons(1)
    setNeutrons(0)
    setElectrons(1)
  }

  // Distribute electrons across shells.
  const shells = useMemo(() => {
    const out: number[] = []
    let remaining = electrons
    for (const cap of SHELL_CAPACITIES) {
      const take = Math.min(cap, remaining)
      out.push(take)
      remaining -= take
      if (remaining <= 0) break
    }
    return out
  }, [electrons])

  return (
    <section className="relative overflow-hidden bg-[#fbf6ff] py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 14% 14%, rgba(139,92,246,0.18) 0 5px, transparent 6px), radial-gradient(circle at 86% 22%, rgba(46,204,113,0.16) 0 4px, transparent 5px), radial-gradient(circle at 18% 84%, rgba(249,115,22,0.16) 0 4px, transparent 5px), radial-gradient(circle at 84% 88%, rgba(26,188,156,0.18) 0 5px, transparent 6px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-teal">
            {t.home.atomEyebrow}
          </p>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.home.atomTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.home.atomDesc}
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            {/* Atom visual */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(-0.7deg)]"
              />
              <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_28px_64px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10 md:p-8">
                <div className="aspect-square w-full">
                  <AtomSVG
                    protons={protons}
                    neutrons={neutrons}
                    shells={shells}
                    reduced={reduced}
                  />
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(0.6deg)]"
              />
              <div className="relative flex h-full flex-col gap-5 rounded-3xl bg-avanza-dark p-7 text-primary-foreground shadow-[0_28px_64px_-30px_rgba(26,26,46,0.4)]">
                {/* Element name card */}
                <div className="flex items-center gap-4 rounded-2xl bg-white p-5 text-avanza-dark shadow-inner ring-1 ring-white/5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-avanza-purple/15 font-mono text-2xl font-extrabold text-avanza-purple">
                    {protons === 0 ? "?" : element.symbol}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
                      {t.home.atomElementLabel}
                    </p>
                    <p className="truncate text-2xl font-extrabold">
                      {protons === 0 ? t.home.atomNoElement : element.name}
                    </p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {t.home.atomMassNumber}: {massNumber} ·{" "}
                      {t.home.atomCharge}: {charge > 0 ? `+${charge}` : charge}
                    </p>
                  </div>
                </div>

                <ParticleRow
                  label={t.home.atomProtons}
                  hint={t.home.atomProtonHint}
                  count={protons}
                  onInc={() => inc("proton")}
                  onDec={() => dec("proton")}
                  dotClass="bg-avanza-orange"
                />
                <ParticleRow
                  label={t.home.atomNeutrons}
                  hint={t.home.atomNeutronHint}
                  count={neutrons}
                  onInc={() => inc("neutron")}
                  onDec={() => dec("neutron")}
                  dotClass="bg-white/70"
                />
                <ParticleRow
                  label={t.home.atomElectrons}
                  hint={t.home.atomElectronHint}
                  count={electrons}
                  onInc={() => inc("electron")}
                  onDec={() => dec("electron")}
                  dotClass="bg-avanza-teal"
                />

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest shadow-sm",
                      isStableLike
                        ? "bg-avanza-green text-avanza-dark"
                        : isNeutral
                          ? "bg-avanza-orange text-avanza-dark"
                          : "bg-avanza-purple text-white",
                    )}
                  >
                    <Sparkles className="h-3 w-3" />
                    {isStableLike
                      ? t.home.atomStableNote
                      : isNeutral
                        ? t.home.atomIsotopeNote
                        : t.home.atomIonNote}
                  </span>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {t.home.atomReset}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function ParticleRow({
  label,
  hint,
  count,
  onInc,
  onDec,
  dotClass,
}: {
  label: string
  hint: string
  count: number
  onInc: () => void
  onDec: () => void
  dotClass: string
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="flex min-w-0 items-center gap-3">
        <span className={cn("h-3 w-3 shrink-0 rounded-full shadow", dotClass)} />
        <div className="min-w-0">
          <p className="text-sm font-extrabold uppercase tracking-wider">
            {label}
          </p>
          <p className="truncate text-xs text-white/65">{hint}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDec}
          aria-label={`${label} -1`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-mono text-lg font-extrabold tabular-nums">
          {count}
        </span>
        <button
          type="button"
          onClick={onInc}
          aria-label={`${label} +1`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-avanza-green text-avanza-dark transition-colors hover:bg-emerald-400 active:scale-95"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function AtomSVG({
  protons,
  neutrons,
  shells,
  reduced,
}: {
  protons: number
  neutrons: number
  shells: number[]
  reduced: boolean
}) {
  const size = 400
  const cx = size / 2
  const cy = size / 2
  const nucleusR = 38

  // Generate proton/neutron positions inside nucleus on a small spiral.
  const total = protons + neutrons
  const nucleons = Array.from({ length: total }).map((_, i) => {
    if (total === 1) return { x: cx, y: cy, kind: i < protons ? "p" : "n" }
    const angle = i * 2.4
    const radius = Math.min(nucleusR - 8, 4 + Math.sqrt(i) * 8)
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
      kind: i < protons ? "p" : "n",
    }
  })

  // Shell radii
  const shellRadii = [78, 122, 168]

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" role="img" aria-label="Atom builder">
      <defs>
        <radialGradient id="atomBg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#f6efff" />
          <stop offset="100%" stopColor="#ffffff" />
        </radialGradient>
        <radialGradient id="nucleusGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(249,115,22,0.35)" />
          <stop offset="100%" stopColor="rgba(249,115,22,0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width={size} height={size} fill="url(#atomBg)" rx="20" />

      {/* Shells */}
      {shells.map((count, idx) => {
        const r = shellRadii[idx]
        return (
          <g key={idx}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="rgba(26,26,46,0.18)"
              strokeWidth={1.4}
              strokeDasharray="4 6"
            />
            <g
              style={{
                transformOrigin: `${cx}px ${cy}px`,
                animation: reduced
                  ? undefined
                  : `atomSpin${idx} ${10 + idx * 4}s linear infinite`,
              }}
            >
              {Array.from({ length: count }).map((_, i) => {
                const angle = (i / count) * Math.PI * 2
                const x = cx + Math.cos(angle) * r
                const y = cy + Math.sin(angle) * r
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r={9} fill="#1abc9c" />
                    <text
                      x={x}
                      y={y + 3}
                      textAnchor="middle"
                      fontFamily="monospace"
                      fontSize="10"
                      fontWeight="800"
                      fill="#fff"
                    >
                      e
                    </text>
                  </g>
                )
              })}
            </g>
          </g>
        )
      })}

      {/* Nucleus glow */}
      {protons + neutrons > 0 && (
        <circle cx={cx} cy={cy} r={nucleusR + 14} fill="url(#nucleusGlow)" />
      )}

      {/* Nucleons */}
      {nucleons.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r={9}
            fill={n.kind === "p" ? "#f97316" : "#cbd5e1"}
            stroke="#1a1a2e"
            strokeWidth={1.2}
          />
          <text
            x={n.x}
            y={n.y + 3.5}
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="10"
            fontWeight="800"
            fill={n.kind === "p" ? "#fff" : "#1a1a2e"}
          >
            {n.kind === "p" ? "+" : "n"}
          </text>
        </g>
      ))}

      {/* Empty state */}
      {protons + neutrons === 0 && (
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="12"
          fontWeight="700"
          fill="#9ca3af"
        >
          add a proton
        </text>
      )}

      <style>{`
        @keyframes atomSpin0 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes atomSpin1 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes atomSpin2 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          [style*="atomSpin"] { animation: none !important; }
        }
      `}</style>
    </svg>
  )
}

"use client"

import { useMemo, useState } from "react"
import {
  AlertTriangle,
  Droplet,
  FlaskConical,
  Lightbulb,
  Lock,
  RotateCcw,
  Sparkles,
  Trash2,
  Trophy,
  Volume2,
  VolumeX,
} from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import {
  DENSITY_OBJECTS,
  OBJECT_BY_ID,
  OBJECT_CATEGORIES,
  ObjectArt,
  type ObjectCategory,
  type ObjectKey,
} from "@/components/ui/density-objects"
import {
  ALL_LIQUID_KEYS,
  LIQUIDS,
  type LiquidKey,
} from "@/components/ui/density-levels"
import {
  type DropResult,
  type WaterComparison,
  describeDrop,
  pourPosition,
  waterComparison,
} from "@/components/ui/density-model"
import { DensityChallenge } from "@/components/ui/density-challenge"
import { useDensityProgress } from "@/components/ui/useDensityProgress"
import { useDensitySound } from "@/components/ui/density-sound"
import { useReducedMotion } from "@/components/ui/useReducedMotion"
import { cn } from "@/lib/utils"

type DensitySound = ReturnType<typeof useDensitySound>

type Pour = { id: number; key: LiquidKey }
type DroppedObject = { id: number; key: ObjectKey; xPct: number }

// A snapshot of the most recent action, resolved to teaching feedback.
type Feedback =
  | { type: "drop"; object: ObjectKey; result: DropResult }
  | { type: "pour"; liquid: LiquidKey; position: ReturnType<typeof pourPosition> }

// Deterministic pseudo-random offset from an id (stable across renders, and
// safe in this project where Math.random is disallowed in some contexts).
function jitter(id: number, seed: number, range: number) {
  const v = Math.sin(id * 99.13 + seed * 57.7) * 43758.5453
  return (v - Math.floor(v) - 0.5) * 2 * range
}

function randomTubeX(id: number) {
  const v = Math.sin(id * 131.9 + 23.17) * 43758.5453
  const unit = v - Math.floor(v)
  return 18 + unit * 64
}

let pourId = 1
let objId = 1

// How many "pours" of liquid fill the tube completely.
const MAX_UNITS = 9
const TOTAL_LIQUIDS = ALL_LIQUID_KEYS.length

// All liquids sorted lightest → densest, for the reference density scale.
const LIQUIDS_BY_DENSITY = [...ALL_LIQUID_KEYS].sort(
  (a, b) => LIQUIDS[a].density - LIQUIDS[b].density,
)

type Mode = "challenge" | "freelab"

/**
 * Top-level shell for the Density game. Challenge Mode (levels, badges, a
 * collection and a daily challenge) is the main polished experience; Free Lab
 * stays available for open-ended experimenting with no score or locks. Both
 * share a single progress store.
 */
export function DensityTower() {
  const { t } = useLanguage()
  const progress = useDensityProgress()
  const sound = useDensitySound()
  const [mode, setMode] = useState<Mode>("challenge")

  return (
    <section className="relative overflow-hidden bg-[#eef9fb] py-20 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 14% 14%, rgba(125,211,252,0.18) 0 5px, transparent 6px), radial-gradient(circle at 86% 22%, rgba(217,119,6,0.18) 0 4px, transparent 5px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-avanza-teal">
            {t.gamesPage.densityEyebrow}
          </p>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.gamesPage.densityTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.gamesPage.densityDesc}
          </p>

          {/* Mode switch + sound toggle */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-avanza-dark/10">
              <ModeTab
                active={mode === "challenge"}
                onClick={() => setMode("challenge")}
                icon={<Trophy className="h-4 w-4" />}
                label={t.gamesPage.densityChallengeMode}
              />
              <ModeTab
                active={mode === "freelab"}
                onClick={() => setMode("freelab")}
                icon={<FlaskConical className="h-4 w-4" />}
                label={t.gamesPage.densityFreeLabTab}
              />
            </div>
            <button
              type="button"
              onClick={sound.toggleMute}
              aria-pressed={!sound.muted}
              aria-label={sound.muted ? t.gamesPage.densitySoundOn : t.gamesPage.densitySoundOff}
              title={sound.muted ? t.gamesPage.densitySoundOn : t.gamesPage.densitySoundOff}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-avanza-dark/10 transition hover:-translate-y-0.5 hover:shadow",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal",
                sound.muted ? "text-avanza-dark/40" : "text-avanza-teal",
              )}
            >
              {sound.muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          {mode === "challenge" ? (
            <DensityChallenge progress={progress} sound={sound} />
          ) : (
            <DensityFreeLab progress={progress} sound={sound} />
          )}
        </FadeIn>
      </div>
    </section>
  )
}

function ModeTab({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-extrabold transition",
        active
          ? "bg-avanza-teal text-white shadow"
          : "text-avanza-dark/60 hover:text-avanza-dark",
      )}
    >
      {icon}
      {label}
    </button>
  )
}

// ---------------------------------------------------------------------------
// Free Lab — open-ended experiment (no score, no locks besides object unlocks)
// ---------------------------------------------------------------------------

function DensityFreeLab({
  progress,
  sound,
}: {
  progress: ReturnType<typeof useDensityProgress>
  sound: DensitySound
}) {
  const { t, language } = useLanguage()
  const reduced = useReducedMotion()
  const [pours, setPours] = useState<Pour[]>([])
  const [objects, setObjects] = useState<DroppedObject[]>([])
  // Transient visual state (all self-clearing) for the experiment animations.
  const [pourAnim, setPourAnim] = useState<{ id: number; key: LiquidKey } | null>(
    null,
  )
  const [splashes, setSplashes] = useState<
    { id: number; surface: number; xPct: number }[]
  >([])
  const [resetting, setResetting] = useState(false)
  // Dynamic, action-specific teaching feedback (computed at action time so it
  // stays stable). `expanded` toggles the "Learn more" detail.
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [expanded, setExpanded] = useState(false)

  // Group pours by liquid key, count volume per liquid.
  const layers = useMemo(() => {
    const counts = new Map<LiquidKey, number>()
    for (const p of pours) {
      counts.set(p.key, (counts.get(p.key) ?? 0) + 1)
    }
    // Sort by density ascending (lightest first → sits at the top).
    const arr = Array.from(counts.entries()).map(([key, count]) => ({
      key,
      count,
      density: LIQUIDS[key].density,
    }))
    arr.sort((a, b) => a.density - b.density)
    const totalUnits = arr.reduce((s, l) => s + l.count, 0)
    return { layers: arr, totalUnits }
  }, [pours])

  // Layer boxes measured as fractions of the tube height (0 = rim, 1 = base).
  // Densest layer sits at the bottom; lightest floats to the top.
  type LayerBox = {
    key: LiquidKey
    density: number
    topFrac: number
    bottomFrac: number
  }
  const boxes: LayerBox[] = useMemo(() => {
    if (layers.layers.length === 0) return []
    const sortedDesc = [...layers.layers].sort((a, b) => b.density - a.density)
    const result: LayerBox[] = []
    let y = 1 // base of the tube
    for (const lay of sortedDesc) {
      const h = lay.count / MAX_UNITS
      const topFrac = y - h
      result.push({ key: lay.key, density: lay.density, topFrac, bottomFrac: y })
      y = topFrac
    }
    return result
  }, [layers])

  // Place each object using the SAME model that generates the feedback, so what
  // the tube shows always matches what the text explains.
  const placedObjects = useMemo(() => {
    const boxByKey = new Map<string, LayerBox>(boxes.map((b) => [b.key, b]))
    return objects.map((o) => {
      const obj = OBJECT_BY_ID[o.key]
      const result = describeDrop(obj.density, layers.layers)
      let frac: number
      let floats: boolean
      switch (result.kind) {
        case "no-liquid":
        case "sinks":
          frac = 0.94
          floats = false
          break
        case "floats":
        case "between": {
          const box = boxByKey.get(result.restKey)
          frac = box ? box.topFrac + 0.03 : 0.94
          floats = true
          break
        }
        case "hover": {
          const box = boxByKey.get(result.nearKey)
          // Sits partly submerged, dipping just below the boundary.
          frac = box ? box.topFrac + 0.08 : 0.9
          floats = true
          break
        }
      }
      // Clamp so the object always stays inside the visible tube.
      return { ...o, floats, frac: Math.min(0.95, Math.max(0.05, frac)) }
    })
  }, [objects, boxes, layers.layers])

  const isFull = layers.totalUnits >= MAX_UNITS
  const distinctLiquids = layers.layers.length
  const fillPct = Math.round((layers.totalUnits / MAX_UNITS) * 100)

  function pour(key: LiquidKey) {
    if (layers.totalUnits >= MAX_UNITS) return
    const id = pourId++
    sound.play("pour")
    // Feedback: where this liquid lands vs the OTHER liquids already present.
    const others = layers.layers
      .filter((l) => l.key !== key)
      .map((l) => l.density)
    setFeedback({ type: "pour", liquid: key, position: pourPosition(LIQUIDS[key].density, others) })
    setExpanded(false)
    setPours((p) => [...p, { id, key }])
    if (!reduced) {
      // Show a brief pouring stream; the new layer then animates its height and
      // the flex re-sort slides it to its density position.
      setPourAnim({ id, key })
      window.setTimeout(
        () => setPourAnim((a) => (a?.id === id ? null : a)),
        650,
      )
    }
  }
  function drop(key: ObjectKey) {
    const id = objId++
    const xPct = randomTubeX(id)
    sound.play("splash")
    // Track that this object has been tested (Lab Explorer badge).
    progress.noteTestedObject(key)
    // Feedback: computed against the tube as it is right now.
    setFeedback({
      type: "drop",
      object: key,
      result: describeDrop(OBJECT_BY_ID[key].density, layers.layers),
    })
    setExpanded(false)
    setObjects((p) => [...p, { id, key, xPct }])
    // Splash + bubbles where the object breaks the liquid surface.
    if (!reduced && layers.totalUnits > 0) {
      const surface = 1 - layers.totalUnits / MAX_UNITS
      setSplashes((s) => [...s, { id, surface, xPct }])
      window.setTimeout(
        () => setSplashes((s) => s.filter((x) => x.id !== id)),
        950,
      )
    }
  }
  function clearTube() {
    if (pours.length === 0 && objects.length === 0) return
    setFeedback(null)
    if (reduced) {
      setPours([])
      setObjects([])
      return
    }
    // Let the liquids drain/fade before clearing state.
    setResetting(true)
    window.setTimeout(() => {
      setPours([])
      setObjects([])
      setResetting(false)
    }, 460)
  }

  const liquidName = (key: LiquidKey) => LIQUIDS[key].nameLoc[language]
  const objectName = (key: ObjectKey) => OBJECT_BY_ID[key].nameLoc[language]
  const materialName = (key: ObjectKey) => OBJECT_BY_ID[key].materialLoc[language]

  function comparisonLabel(density: number) {
    const map: Record<WaterComparison, string> = {
      muchLess: t.gamesPage.densityCmpMuchLess,
      less: t.gamesPage.densityCmpLess,
      same: t.gamesPage.densityCmpSame,
      slightly: t.gamesPage.densityCmpSlightly,
      denser: t.gamesPage.densityCmpDenser,
      muchDenser: t.gamesPage.densityCmpMuchDenser,
    }
    return map[waterComparison(density)]
  }
  function categoryLabel(cat: ObjectCategory) {
    const map: Record<ObjectCategory, string> = {
      everyday: t.gamesPage.densityCatEveryday,
      nature: t.gamesPage.densityCatNature,
      engineering: t.gamesPage.densityCatEngineering,
      mystery: t.gamesPage.densityCatMystery,
    }
    return map[cat]
  }

  // Build the localized short + expanded teaching text for the last action.
  function feedbackText(fb: Feedback): { short: string; long: string } {
    const g = t.gamesPage
    const fill = (tpl: string, vars: Record<string, string | number>) =>
      tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""))

    if (fb.type === "pour") {
      const vars = {
        liquid: liquidName(fb.liquid),
        liquidD: LIQUIDS[fb.liquid].density,
      }
      const tpl = {
        only: g.densityFbPourOnly,
        top: g.densityFbPourTop,
        bottom: g.densityFbPourBottom,
        middle: g.densityFbPourMiddle,
      }[fb.position]
      return { short: fill(tpl, vars), long: g.densityFbPourMore }
    }

    const obj = OBJECT_BY_ID[fb.object]
    const base = { object: objectName(fb.object), objD: obj.density }
    const r = fb.result
    switch (r.kind) {
      case "no-liquid":
        return {
          short: fill(g.densityFbNoLiquid, base),
          long: fill(g.densityFbNoLiquidMore, base),
        }
      case "sinks":
        return {
          short: fill(g.densityFbSink, base),
          long: fill(g.densityFbSinkMore, base),
        }
      case "floats": {
        const v = {
          ...base,
          liquid: liquidName(r.restKey as LiquidKey),
          liquidD: LIQUIDS[r.restKey as LiquidKey].density,
        }
        return { short: fill(g.densityFbFloat, v), long: fill(g.densityFbFloatMore, v) }
      }
      case "between": {
        const v = {
          ...base,
          liquid: liquidName(r.restKey as LiquidKey),
          liquidD: LIQUIDS[r.restKey as LiquidKey].density,
          upper: liquidName(r.upperKey as LiquidKey),
          upperD: LIQUIDS[r.upperKey as LiquidKey].density,
        }
        return { short: fill(g.densityFbBetween, v), long: fill(g.densityFbBetweenMore, v) }
      }
      case "hover": {
        const v = {
          ...base,
          liquid: liquidName(r.nearKey as LiquidKey),
          liquidD: LIQUIDS[r.nearKey as LiquidKey].density,
        }
        return { short: fill(g.densityFbHover, v), long: fill(g.densityFbHoverMore, v) }
      }
    }
  }

  const fb = feedback ? feedbackText(feedback) : null
  const mercuryPresent = pours.some((p) => p.key === "mercury")

  return (
    <div className="mt-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_1.4fr]">
        {/* Tube */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(-0.6deg)]"
          />
          <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl bg-white p-6 shadow-[0_28px_64px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10 sm:p-7">
            <div className="flex w-full items-stretch justify-center gap-2 sm:gap-3">
              {/* Reference density scale — explains WHY layers sort */}
              <div className="flex w-14 shrink-0 flex-col py-1 text-center sm:w-[72px]">
                <p className="text-[8px] font-extrabold uppercase leading-tight tracking-wide text-slate-400">
                  {t.gamesPage.densityScaleTop}
                </p>
                <div className="relative my-1.5 flex-1">
                  <div
                    aria-hidden="true"
                    className="absolute left-2 top-0 h-full w-1.5 -translate-x-1/2 rounded-full"
                    style={{
                      background:
                        "linear-gradient(to bottom, #bae6fd, #38bdf8, #0369a1)",
                    }}
                  />
                  {LIQUIDS_BY_DENSITY.map((k, i) => {
                    const topPct =
                      LIQUIDS_BY_DENSITY.length > 1
                        ? (i / (LIQUIDS_BY_DENSITY.length - 1)) * 100
                        : 0
                    return (
                      <div
                        key={k}
                        className="absolute left-0 flex items-center gap-1"
                        style={{ top: `${topPct}%`, transform: "translateY(-50%)" }}
                      >
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-black/10"
                          style={{ backgroundColor: LIQUIDS[k].color }}
                        />
                        <span className="whitespace-nowrap font-mono text-[8px] font-bold text-slate-500">
                          {LIQUIDS[k].density}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <p className="text-[8px] font-extrabold uppercase leading-tight tracking-wide text-slate-400">
                  {t.gamesPage.densityScaleBottom}
                </p>
              </div>

              {/* Tube column */}
              <div className="relative w-full max-w-[200px]">
                {/* Faint soft shadow behind the glass cylinder */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-3 bottom-2 top-7 rounded-[26px] bg-avanza-dark/15 blur-xl"
                />
                {/* Beaker neck / rim with a rounded lip */}
                <div
                  aria-hidden="true"
                  className="relative z-10 mx-auto h-4 w-24 rounded-t-md border-2 border-b-0 border-slate-300/80 bg-gradient-to-b from-white to-slate-200"
                />
                {/* Glass interior — overflow-hidden clips every layer + object */}
                <div
                  className={cn(
                    "relative z-10 h-[360px] w-full overflow-hidden rounded-b-[22px] rounded-t-lg border-2 border-slate-300/80 shadow-[inset_0_2px_6px_rgba(255,255,255,0.6),inset_0_-10px_20px_-10px_rgba(0,0,0,0.15)] transition-shadow duration-500",
                    isFull && "shadow-[0_0_0_3px_rgba(16,185,129,0.35)]",
                  )}
                  style={{
                    background:
                      "linear-gradient(100deg, rgba(255,255,255,0.55) 0%, rgba(226,240,247,0.28) 18%, rgba(255,255,255,0.05) 50%, rgba(148,163,184,0.14) 100%)",
                  }}
                  role="img"
                  aria-label={`${t.gamesPage.densityLiquidsAdded} ${distinctLiquids}/${TOTAL_LIQUIDS}. ${t.gamesPage.densityObjectsTested} ${objects.length}.`}
                >
                  {/* Liquid layers, stacked from the base upward */}
                  <div
                    className={cn(
                      "absolute inset-0 flex flex-col justify-end",
                      resetting && !reduced && "density-draining",
                    )}
                  >
                    {layers.layers.map((l, idx) => {
                      const heightPct = (l.count / MAX_UNITS) * 100
                      const color = LIQUIDS[l.key].color
                      return (
                        <div
                          key={l.key}
                          className="relative flex w-full items-center justify-center transition-[height] duration-500 ease-out"
                          style={{
                            height: `${heightPct}%`,
                            background: `linear-gradient(180deg, color-mix(in srgb, white 16%, ${color}) 0%, ${color} 42%, color-mix(in srgb, black 9%, ${color}) 100%)`,
                          }}
                        >
                          {/* Curved meniscus at the liquid surface / boundary */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 -top-[4px] h-2.5 rounded-[50%]"
                            style={{
                              background: `color-mix(in srgb, white 32%, ${color})`,
                              boxShadow: "0 1px 1.5px rgba(0,0,0,0.12)",
                            }}
                          />
                          {/* Soft separation highlight line */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/40"
                          />
                          <span
                            className={cn(
                              "pointer-events-none z-[1] max-w-[88%] truncate whitespace-nowrap rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-bold text-slate-800 shadow-sm ring-1 ring-black/5",
                              idx === 0 && "translate-y-1",
                            )}
                          >
                            {liquidName(l.key)} · {l.density}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Dropped objects — fall in, slow through the layers, then
                      bob (float) or settle (sink). */}
                  {placedObjects.map((o) => {
                    const jy = jitter(o.id, 2, 5)
                    const rot = jitter(o.id, 3, 14)
                    const anim = reduced
                      ? undefined
                      : o.floats
                        ? "density-drop 850ms cubic-bezier(.34,.08,.28,1) both, density-bob 3.4s ease-in-out 900ms infinite"
                        : "density-drop 900ms cubic-bezier(.5,.03,.6,1) both"
                    return (
                      <span
                        key={o.id}
                        className="absolute z-10"
                        style={{
                          top: `calc(${o.frac * 100}% + ${jy}px)`,
                          left: `${o.xPct}%`,
                          transform: "translate(-50%, -50%)",
                          opacity: resetting ? 0 : 1,
                          transition: "opacity 360ms ease",
                        }}
                      >
                        <span
                          role="img"
                          aria-label={objectName(o.key)}
                          className="block drop-shadow-[0_2px_3px_rgba(0,0,0,0.28)]"
                          style={{ animation: anim }}
                        >
                          <span
                            className="block"
                            style={{ transform: `rotate(${rot}deg)` }}
                          >
                            <ObjectArt type={o.key} className="h-9 w-9" />
                          </span>
                        </span>
                      </span>
                    )
                  })}

                  {/* Glass gloss overlay — wet under-the-surface sheen */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-20"
                    style={{
                      background:
                        "linear-gradient(95deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.04) 22%, rgba(255,255,255,0.02) 60%, rgba(0,0,0,0.06) 100%)",
                    }}
                  />
                  {/* Bright vertical highlight streaks for glass roundness */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-3 left-[14%] z-20 w-2 rounded-full bg-white/45 blur-[1px]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-4 left-[24%] z-20 w-0.5 rounded-full bg-white/40"
                  />

                  {/* Measurement marks — graduated to the 9-unit fill scale */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 z-30 w-9"
                  >
                    {Array.from({ length: 9 }, (_, i) => {
                      const level = i + 1
                      const major = level % 3 === 0
                      return (
                        <div
                          key={level}
                          className="absolute right-0 flex items-center justify-end gap-1"
                          style={{
                            top: `${(1 - level / MAX_UNITS) * 100}%`,
                            width: "100%",
                          }}
                        >
                          {major && (
                            <span className="font-mono text-[7px] font-semibold text-slate-400/90">
                              {level}
                            </span>
                          )}
                          <span
                            className="block bg-slate-400/60"
                            style={{
                              height: "1.5px",
                              width: major ? "12px" : "7px",
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>

                  {/* Splash + rising bubbles at the entry point */}
                  {splashes.map((s) => (
                    <div
                      key={s.id}
                      aria-hidden="true"
                      className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        top: `${s.surface * 100}%`,
                        left: `${s.xPct}%`,
                      }}
                    >
                      <span
                        className="block h-3 w-9 rounded-[50%] border-2 border-white/70"
                        style={{ animation: "density-splash 700ms ease-out forwards" }}
                      />
                      {[0, 1, 2].map((b) => (
                        <span
                          key={b}
                          className="absolute top-0 h-1.5 w-1.5 rounded-full bg-white/70"
                          style={{
                            left: `calc(50% + ${(b - 1) * 6}px)`,
                            animation: `density-bubble 850ms ease-out ${b * 90}ms forwards`,
                          }}
                        />
                      ))}
                    </div>
                  ))}

                  {/* Pouring stream */}
                  {pourAnim && !reduced && (
                    <div
                      key={pourAnim.id}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-1/2 top-0 z-30"
                      style={{
                        transformOrigin: "top center",
                        animation: "density-stream 650ms ease-in forwards",
                      }}
                    >
                      <span
                        className="block w-2 rounded-b-full"
                        style={{
                          height: "170px",
                          background: `linear-gradient(to bottom, color-mix(in srgb, white 25%, ${LIQUIDS[pourAnim.key].color}), ${LIQUIDS[pourAnim.key].color})`,
                        }}
                      />
                    </div>
                  )}

                  {/* Completed-tower shimmer sweep (plays once when full) */}
                  {isFull && !reduced && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
                    >
                      <div
                        className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                        style={{ animation: "density-shimmer 1200ms ease-out" }}
                      />
                    </div>
                  )}

                  {/* Empty hint */}
                  {pours.length === 0 && objects.length === 0 && (
                    <p className="absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 px-4 text-center text-xs font-bold text-slate-400">
                      {t.gamesPage.densityEmpty}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Status readouts */}
            <div className="w-full max-w-[280px] space-y-3">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-avanza-teal/12 px-2.5 py-1 text-[11px] font-bold text-avanza-teal">
                  {t.gamesPage.densityLiquidsAdded} {distinctLiquids}/
                  {TOTAL_LIQUIDS}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-avanza-orange/12 px-2.5 py-1 text-[11px] font-bold text-avanza-orange">
                  {t.gamesPage.densityObjectsTested} {objects.length}
                </span>
                {isFull && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                    ✓ {t.gamesPage.densityTowerComplete}
                  </span>
                )}
              </div>

              {/* Fill meter */}
              <div
                role="progressbar"
                aria-valuenow={layers.totalUnits}
                aria-valuemin={0}
                aria-valuemax={MAX_UNITS}
                aria-label={`${t.gamesPage.densityFillLabel} ${fillPct}%`}
                className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
              >
                <div
                  className="h-full rounded-full bg-avanza-teal transition-all duration-500"
                  style={{ width: `${fillPct}%` }}
                />
              </div>

              {isFull && (
                <p
                  role="status"
                  className="rounded-xl bg-amber-50 px-3 py-2 text-center text-xs font-semibold leading-relaxed text-amber-800 ring-1 ring-amber-200"
                >
                  {t.gamesPage.densityFull}
                </p>
              )}
            </div>

            {/* Dynamic, action-specific teaching feedback */}
            <div className="w-full max-w-[300px]" aria-live="polite">
              {fb ? (
                <div className="rounded-2xl bg-avanza-teal/8 p-3 text-left ring-1 ring-avanza-teal/25">
                  <p className="text-xs font-semibold leading-relaxed text-avanza-dark">
                    {fb.short}
                  </p>
                  {expanded && (
                    <p className="mt-2 border-t border-avanza-teal/20 pt-2 text-[11px] leading-relaxed text-slate-600">
                      {fb.long}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setExpanded((e) => !e)}
                    aria-expanded={expanded}
                    className="mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-extrabold text-avanza-teal transition hover:bg-avanza-teal/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal"
                  >
                    {expanded
                      ? t.gamesPage.densityLearnLess
                      : t.gamesPage.densityLearnMore}
                  </button>
                </div>
              ) : (
                <p className="rounded-2xl bg-slate-100 px-3 py-2 text-center text-[11px] font-medium text-slate-400">
                  {t.gamesPage.densityFeedbackHint}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Palette */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(0.6deg)]"
          />
          <div className="relative flex h-full flex-col gap-5 rounded-3xl bg-avanza-dark p-6 text-primary-foreground shadow-[0_28px_64px_-30px_rgba(26,26,46,0.4)] sm:p-7">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white/85">
                <Droplet className="h-3.5 w-3.5 text-avanza-teal" />
                {t.gamesPage.densityLiquids}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {ALL_LIQUID_KEYS.map((k) => {
                  const info = LIQUIDS[k]
                  const disabled = isFull
                  const safety =
                    k === "mercury" ? t.gamesPage.densityMercuryNote : ""
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => pour(k)}
                      disabled={disabled}
                      aria-disabled={disabled}
                      title={
                        disabled
                          ? t.gamesPage.densityLockedHint
                          : safety || undefined
                      }
                      aria-label={`${liquidName(k)}, ρ ${info.density} g/cm³, ${comparisonLabel(
                        info.density,
                      )}${safety ? ` — ${safety}` : ""}${
                        disabled ? ` — ${t.gamesPage.densityLockedHint}` : ""
                      }`}
                      className={cn(
                        "group flex min-h-[68px] flex-col items-start gap-1 rounded-2xl bg-white/5 p-2.5 text-left ring-1 ring-white/10 transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2 focus-visible:ring-offset-avanza-dark",
                        disabled
                          ? "cursor-not-allowed opacity-45 ring-dashed"
                          : "hover:bg-white/10 active:scale-[0.98]",
                      )}
                    >
                      <span className="flex w-full items-center justify-between">
                        <span
                          className="h-3 flex-1 rounded-full"
                          style={{ backgroundColor: info.color }}
                        />
                        {disabled && (
                          <Lock className="ml-1.5 h-3 w-3 shrink-0 text-white/60" />
                        )}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-extrabold">
                        {liquidName(k)}
                        {k === "mercury" && (
                          <AlertTriangle className="h-3 w-3 shrink-0 text-amber-400" />
                        )}
                      </span>
                      <span className="font-mono text-[10px] text-white/65">
                        ρ = {info.density} g/cm³
                      </span>
                      <span className="text-[9px] font-semibold leading-tight text-white/55">
                        {comparisonLabel(info.density)}
                      </span>
                    </button>
                  )
                })}
              </div>
              {isFull && (
                <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-amber-300">
                  <Lock className="h-3 w-3 shrink-0" />
                  {t.gamesPage.densityLockedHint}
                </p>
              )}
              {mercuryPresent && (
                <p className="mt-2 flex items-start gap-1.5 rounded-xl bg-amber-500/15 px-2.5 py-1.5 text-[10px] font-semibold leading-relaxed text-amber-200 ring-1 ring-amber-400/25">
                  <AlertTriangle className="mt-px h-3 w-3 shrink-0" />
                  {t.gamesPage.densityMercuryNote}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white/85">
                <Sparkles className="h-3.5 w-3.5 text-avanza-orange" />
                {t.gamesPage.densityObjects}
              </div>

              {OBJECT_CATEGORIES.map((cat) => {
                const items = DENSITY_OBJECTS.filter((o) => o.category === cat)
                if (items.length === 0) return null
                return (
                  <div key={cat} className="space-y-2">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-white/45">
                      {categoryLabel(cat)}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {items.map((o) => {
                        const unlocked = progress.isObjectUnlocked(o.id)
                        if (!unlocked) {
                          return (
                            <div
                              key={o.id}
                              title={t.gamesPage.densityObjectLockedHint}
                              className="flex items-center gap-2.5 rounded-2xl bg-white/5 p-2.5 ring-1 ring-dashed ring-white/15"
                            >
                              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
                                <Lock className="h-4 w-4 text-white/40" />
                              </span>
                              <span className="min-w-0 flex-1 text-[10px] font-semibold leading-tight text-white/40">
                                {t.gamesPage.densityLockedObject}
                              </span>
                            </div>
                          )
                        }
                        return (
                          <button
                            key={o.id}
                            type="button"
                            onClick={() => drop(o.id)}
                            aria-label={`${objectName(o.id)}, ${materialName(
                              o.id,
                            )}, ρ ${o.density} g/cm³ — ${comparisonLabel(
                              o.density,
                            )}`}
                            className={cn(
                              "flex flex-col gap-2 rounded-2xl bg-white/5 p-2.5 text-left ring-1 ring-white/10 transition",
                              "hover:bg-white/10 active:scale-[0.98]",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-orange focus-visible:ring-offset-2 focus-visible:ring-offset-avanza-dark",
                            )}
                          >
                            <span className="flex items-start gap-2.5">
                              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/90 ring-1 ring-black/5">
                                <ObjectArt type={o.svgType} className="h-8 w-8" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-xs font-extrabold">
                                  {objectName(o.id)}
                                </span>
                                <span className="block truncate text-[10px] text-white/55">
                                  {materialName(o.id)}
                                </span>
                              </span>
                            </span>
                            <span className="flex items-end justify-between gap-2">
                              <span className="text-[10px] font-semibold leading-tight text-white/70">
                                {comparisonLabel(o.density)}
                              </span>
                              <span className="shrink-0 whitespace-nowrap font-mono text-[10px] font-bold text-avanza-teal">
                                {o.density} g/cm³
                              </span>
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-auto space-y-2 rounded-2xl bg-white/5 p-3 text-sm leading-relaxed text-white/80 ring-1 ring-white/10">
              <p className="text-base font-extrabold text-white">
                {t.gamesPage.densityNotesTitle}
              </p>
              <p className="text-[13px]">{t.gamesPage.densityModelNote}</p>
              <p className="flex items-start gap-1.5 text-[13px] text-amber-200/90">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                {t.gamesPage.densityMercuryNote}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setObjects([])}
                disabled={objects.length === 0}
                aria-disabled={objects.length === 0}
                aria-label={t.gamesPage.densityRemoveObjects}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white/85 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-avanza-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {t.gamesPage.densityRemoveObjects}
              </button>
              <button
                type="button"
                onClick={clearTube}
                disabled={pours.length === 0 && objects.length === 0}
                aria-disabled={pours.length === 0 && objects.length === 0}
                aria-label={t.gamesPage.densityReset}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white/85 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-avanza-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {t.gamesPage.densityReset}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Learning cards — the "why" behind the experiment */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {/* Density formula */}
        <div className="rounded-3xl bg-white p-6 shadow-[0_18px_44px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10">
          <div className="inline-flex items-center gap-2 rounded-full bg-avanza-teal/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-avanza-teal">
            <FlaskConical className="h-3.5 w-3.5" />
            {t.gamesPage.densityHowTitle}
          </div>
          <p className="mt-3 font-mono text-2xl font-extrabold text-avanza-dark">
            {t.gamesPage.densityFormula}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {t.gamesPage.densityFormulaWhat}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {t.gamesPage.densityFormulaHeavy}
          </p>
          <div className="mt-3 rounded-2xl bg-avanza-teal/8 p-3 ring-1 ring-avanza-teal/15">
            <p className="text-sm font-extrabold text-avanza-dark">
              {t.gamesPage.densityUnit}
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              {t.gamesPage.densityUnitWhat}
            </p>
          </div>
        </div>

        {/* Real-world connections */}
        <div className="rounded-3xl bg-white p-6 shadow-[0_18px_44px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10">
          <div className="inline-flex items-center gap-2 rounded-full bg-avanza-orange/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-avanza-orange">
            <Lightbulb className="h-3.5 w-3.5" />
            {t.gamesPage.densityRealTitle}
          </div>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            {[
              t.gamesPage.densityRealWood,
              t.gamesPage.densityRealRock,
              t.gamesPage.densityRealOil,
              t.gamesPage.densityRealIce,
              t.gamesPage.densityRealMetal,
              t.gamesPage.densityRealBoat,
            ].map((line, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-avanza-orange/70" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

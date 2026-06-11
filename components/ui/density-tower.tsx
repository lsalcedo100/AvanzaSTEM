"use client"

import { useMemo, useState } from "react"
import { Beaker, Droplet, RotateCcw, Sparkles, Trash2 } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"

// Real-world densities in g/cm³
type LiquidKey =
  | "oil"
  | "water"
  | "milk"
  | "saltwater"
  | "syrup"
  | "honey"
  | "mercury"

type ObjectKey = "cork" | "ice" | "grape" | "tomato" | "penny" | "ring"

const LIQUIDS: Record<
  LiquidKey,
  { name: string; density: number; color: string; emoji: string }
> = {
  oil: { name: "Vegetable oil", density: 0.92, color: "#fde68a", emoji: "🫒" },
  water: { name: "Water", density: 1.0, color: "#7dd3fc", emoji: "💧" },
  milk: { name: "Milk", density: 1.03, color: "#fafafa", emoji: "🥛" },
  saltwater: { name: "Saltwater", density: 1.1, color: "#a5f3fc", emoji: "🌊" },
  syrup: { name: "Corn syrup", density: 1.36, color: "#fcd34d", emoji: "🍯" },
  honey: { name: "Honey", density: 1.42, color: "#d97706", emoji: "🍯" },
  mercury: { name: "Mercury", density: 13.5, color: "#cbd5e1", emoji: "⚪" },
}

const OBJECTS: Record<
  ObjectKey,
  { name: string; density: number; emoji: string }
> = {
  cork: { name: "Cork", density: 0.24, emoji: "🟫" },
  ice: { name: "Ice cube", density: 0.92, emoji: "🧊" },
  grape: { name: "Grape", density: 1.05, emoji: "🍇" },
  tomato: { name: "Tomato", density: 1.1, emoji: "🍅" },
  penny: { name: "Penny", density: 8.96, emoji: "🟠" },
  ring: { name: "Gold ring", density: 19.3, emoji: "💍" },
}

type Pour = { id: number; key: LiquidKey }
type DroppedObject = { id: number; key: ObjectKey }

let pourId = 1
let objId = 1

const TUBE_W = 220
const TUBE_H = 380

export function DensityTower() {
  const { t } = useLanguage()
  const [pours, setPours] = useState<Pour[]>([])
  const [objects, setObjects] = useState<DroppedObject[]>([])

  // Group pours by liquid key, count volume per liquid
  const layers = useMemo(() => {
    const counts = new Map<LiquidKey, number>()
    for (const p of pours) {
      counts.set(p.key, (counts.get(p.key) ?? 0) + 1)
    }
    // Sort by density ascending (lightest first → goes to top)
    const arr = Array.from(counts.entries()).map(([key, count]) => ({
      key,
      count,
      density: LIQUIDS[key].density,
    }))
    arr.sort((a, b) => a.density - b.density)
    const totalUnits = arr.reduce((s, l) => s + l.count, 0)
    return { layers: arr, totalUnits }
  }, [pours])

  // Compute layer positions in tube (top=0, bottom=TUBE_H)
  // Lightest liquid is at top.
  // We want at most some max height; if fewer units, layers occupy proportional space at the bottom.
  const MAX_UNITS = 9
  const unitsToShow = Math.min(layers.totalUnits, MAX_UNITS)
  const usedH = (unitsToShow / MAX_UNITS) * TUBE_H

  // For object placement:
  // - Build "layer top y" (smaller y = higher)
  // - Densest layer at bottom: occupies bottom of usedH
  // - For each object: find topmost layer with density >= object density. Object sits at that layer's TOP surface.
  // - If denser than all layers: sits at the very bottom.
  // - If lighter than all layers: floats on top of the topmost layer.
  // - If no layers exist: floats at the bottom of the tube.

  type LayerBox = { key: LiquidKey; density: number; topY: number; bottomY: number }
  const boxes: LayerBox[] = useMemo(() => {
    if (layers.layers.length === 0) return []
    // Reverse so densest is first (we'll lay them from bottom up)
    const sortedDesc = [...layers.layers].sort((a, b) => b.density - a.density)
    const result: LayerBox[] = []
    let y = TUBE_H // bottom of tube
    for (const lay of sortedDesc) {
      const h = (lay.count / MAX_UNITS) * TUBE_H
      const topY = y - h
      result.push({ key: lay.key, density: lay.density, topY, bottomY: y })
      y = topY
    }
    return result
  }, [layers])

  // Place objects
  const placedObjects = useMemo(() => {
    return objects.map((o) => {
      const obj = OBJECTS[o.key]
      let yPos: number
      if (boxes.length === 0) {
        yPos = TUBE_H - 18
      } else {
        // From densest (bottom) to lightest (top)
        // Find the topmost (smallest topY = highest in tube, but smallest density value)
        // Actually we want: the lightest layer that is denser-or-equal to the object.
        // Sort ascending by density:
        const ascending = [...boxes].sort((a, b) => a.density - b.density)
        let chosen: LayerBox | null = null
        for (const layer of ascending) {
          if (layer.density >= obj.density) {
            chosen = layer
            break
          }
        }
        if (chosen) {
          // Object sits at the TOP of this chosen layer (it floats on it)
          yPos = chosen.topY + 8
        } else {
          // Denser than all layers: sinks to bottom
          yPos = TUBE_H - 14
        }
      }
      return { ...o, y: yPos }
    })
  }, [objects, boxes])

  function pour(key: LiquidKey) {
    if (layers.totalUnits >= MAX_UNITS) return
    setPours((p) => [...p, { id: pourId++, key }])
  }
  function drop(key: ObjectKey) {
    setObjects((p) => [...p, { id: objId++, key }])
  }
  function clearTube() {
    setPours([])
    setObjects([])
  }

  // Localize liquid names
  function liquidName(key: LiquidKey) {
    return (
      ({
        oil: t.gamesPage.densityOil,
        water: t.gamesPage.densityWater,
        milk: t.gamesPage.densityMilk,
        saltwater: t.gamesPage.densitySaltwater,
        syrup: t.gamesPage.densitySyrup,
        honey: t.gamesPage.densityHoney,
        mercury: t.gamesPage.densityMercury,
      } as Record<LiquidKey, string>)[key] ?? LIQUIDS[key].name
    )
  }
  function objectName(key: ObjectKey) {
    return (
      ({
        cork: t.gamesPage.densityCork,
        ice: t.gamesPage.densityIce,
        grape: t.gamesPage.densityGrape,
        tomato: t.gamesPage.densityTomato,
        penny: t.gamesPage.densityPenny,
        ring: t.gamesPage.densityRing,
      } as Record<ObjectKey, string>)[key] ?? OBJECTS[key].name
    )
  }

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
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Beaker className="h-3.5 w-3.5 text-avanza-teal" />
            {t.gamesPage.densityEyebrow}
          </span>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.gamesPage.densityTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.gamesPage.densityDesc}
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            {/* Tube */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(-0.6deg)]"
              />
              <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl bg-white p-7 shadow-[0_28px_64px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10">
                <svg
                  viewBox={`0 0 ${TUBE_W + 60} ${TUBE_H + 80}`}
                  className="h-[440px] max-w-full"
                >
                  <defs>
                    <linearGradient id="tubeGloss" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
                      <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
                    </linearGradient>
                  </defs>
                  {/* Beaker neck */}
                  <rect
                    x={30 + 20}
                    y={20}
                    width={TUBE_W - 40}
                    height={20}
                    fill="#e2e8f0"
                    stroke="#94a3b8"
                    strokeWidth={1.5}
                    rx={3}
                  />
                  {/* Beaker glass */}
                  <rect
                    x={30}
                    y={40}
                    width={TUBE_W}
                    height={TUBE_H}
                    rx={12}
                    fill="rgba(255,255,255,0.4)"
                    stroke="#94a3b8"
                    strokeWidth={2}
                  />
                  {/* Liquids: render densest at bottom */}
                  {boxes.map((box) => (
                    <g key={box.key}>
                      <rect
                        x={32}
                        y={40 + box.topY}
                        width={TUBE_W - 4}
                        height={Math.max(0, box.bottomY - box.topY)}
                        fill={LIQUIDS[box.key].color}
                        opacity={0.9}
                        style={{ transition: "all 600ms cubic-bezier(.4,0,.2,1)" }}
                      />
                      {/* Top surface line */}
                      <line
                        x1={32}
                        y1={40 + box.topY}
                        x2={30 + TUBE_W - 2}
                        y2={40 + box.topY}
                        stroke="rgba(0,0,0,0.18)"
                        strokeWidth={0.8}
                      />
                      <text
                        x={30 + TUBE_W + 6}
                        y={40 + (box.topY + box.bottomY) / 2 + 3}
                        fontFamily="monospace"
                        fontSize="9"
                        fontWeight="700"
                        fill="#1a1a2e"
                      >
                        {liquidName(box.key).slice(0, 8)} · {box.density}
                      </text>
                    </g>
                  ))}
                  {/* Glass gloss */}
                  <rect
                    x={30}
                    y={40}
                    width={TUBE_W}
                    height={TUBE_H}
                    rx={12}
                    fill="url(#tubeGloss)"
                    pointerEvents="none"
                  />
                  {/* Objects */}
                  {placedObjects.map((o, i) => (
                    <g key={o.id} style={{ transition: "transform 700ms cubic-bezier(.4,0,.2,1)" }}>
                      <text
                        x={30 + TUBE_W / 2 + ((i % 3) - 1) * 26}
                        y={40 + o.y + 4}
                        textAnchor="middle"
                        fontSize="20"
                      >
                        {OBJECTS[o.key].emoji}
                      </text>
                    </g>
                  ))}
                  {/* Empty hint */}
                  {pours.length === 0 && objects.length === 0 && (
                    <text
                      x={30 + TUBE_W / 2}
                      y={40 + TUBE_H / 2}
                      textAnchor="middle"
                      fontFamily="sans-serif"
                      fontSize="12"
                      fontWeight="700"
                      fill="#94a3b8"
                    >
                      {t.gamesPage.densityEmpty}
                    </text>
                  )}
                </svg>
                <p className="text-center text-xs font-bold text-muted-foreground">
                  {t.gamesPage.densityCapacity} {layers.totalUnits}/{MAX_UNITS}
                </p>
              </div>
            </div>

            {/* Palette */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(0.6deg)]"
              />
              <div className="relative flex h-full flex-col gap-5 rounded-3xl bg-avanza-dark p-7 text-primary-foreground shadow-[0_28px_64px_-30px_rgba(26,26,46,0.4)]">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white/85">
                    <Droplet className="h-3.5 w-3.5 text-avanza-teal" />
                    {t.gamesPage.densityLiquids}
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {(Object.keys(LIQUIDS) as LiquidKey[]).map((k) => {
                      const info = LIQUIDS[k]
                      const disabled = layers.totalUnits >= MAX_UNITS
                      return (
                        <button
                          key={k}
                          type="button"
                          onClick={() => pour(k)}
                          disabled={disabled}
                          className={cn(
                            "flex flex-col items-start gap-1 rounded-2xl bg-white/5 p-2.5 text-left ring-1 ring-white/10 transition disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:bg-white/10",
                          )}
                        >
                          <span
                            className="h-3 w-full rounded-full"
                            style={{ backgroundColor: info.color }}
                          />
                          <span className="text-xs font-extrabold">
                            {liquidName(k)}
                          </span>
                          <span className="font-mono text-[10px] text-white/65">
                            ρ = {info.density} g/cm³
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white/85">
                    <Sparkles className="h-3.5 w-3.5 text-avanza-orange" />
                    {t.gamesPage.densityObjects}
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {(Object.keys(OBJECTS) as ObjectKey[]).map((k) => {
                      const info = OBJECTS[k]
                      return (
                        <button
                          key={k}
                          type="button"
                          onClick={() => drop(k)}
                          className="flex items-center gap-2 rounded-2xl bg-white/5 p-2.5 text-left ring-1 ring-white/10 transition hover:bg-white/10"
                        >
                          <span className="text-xl">{info.emoji}</span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-xs font-extrabold">
                              {objectName(k)}
                            </span>
                            <span className="block font-mono text-[10px] text-white/65">
                              ρ = {info.density}
                            </span>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-auto rounded-2xl bg-white/5 p-3 text-sm leading-relaxed text-white/80 ring-1 ring-white/10">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-avanza-green">
                    {t.gamesPage.densityFactEyebrow}
                  </p>
                  <p className="mt-1.5">{t.gamesPage.densityFactBody}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setObjects([])}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/85 transition hover:bg-white/20"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {t.gamesPage.densityRemoveObjects}
                  </button>
                  <button
                    type="button"
                    onClick={clearTube}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/85 transition hover:bg-white/20"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {t.gamesPage.densityReset}
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

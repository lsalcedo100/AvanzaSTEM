// Challenge-mode content + engine for the Density game.
//
// The challenge is a prediction quiz: each level is a short list of rounds, and
// each round asks the player to predict an outcome (sink/float, resting layer,
// stacking order, or a mass ÷ volume calculation). Answers are checked against
// the same pure physics model the Free Lab uses, so the game can never teach
// something the simulation contradicts.
//
// All display text lives in Loc bundles here (mirroring circuit-levels) so the
// bulk of the content stays beside the logic instead of bloating translations.

import {
  type Liquid,
  type Loc,
  computeDensity,
  describeDrop,
  floatsInWater,
  sortByDensityAsc,
} from "@/components/ui/density-model"
import { type ObjectKey, OBJECT_BY_ID } from "@/components/ui/density-objects"

// ---------------------------------------------------------------------------
// Liquids (shared source of truth for the whole density game)
// ---------------------------------------------------------------------------

export type LiquidKey =
  | "oil"
  | "water"
  | "milk"
  | "saltwater"
  | "syrup"
  | "honey"
  | "mercury"

export const LIQUIDS: Record<
  LiquidKey,
  { density: number; color: string; emoji: string; nameLoc: Loc }
> = {
  oil: {
    density: 0.92,
    color: "#fde68a",
    emoji: "🫒",
    nameLoc: { en: "Oil", es: "Aceite", zh: "油" },
  },
  water: {
    density: 1.0,
    color: "#7dd3fc",
    emoji: "💧",
    nameLoc: { en: "Water", es: "Agua", zh: "水" },
  },
  milk: {
    density: 1.03,
    color: "#fafafa",
    emoji: "🥛",
    nameLoc: { en: "Milk", es: "Leche", zh: "牛奶" },
  },
  saltwater: {
    density: 1.1,
    color: "#a5f3fc",
    emoji: "🌊",
    nameLoc: { en: "Saltwater", es: "Agua salada", zh: "盐水" },
  },
  syrup: {
    density: 1.36,
    color: "#fcd34d",
    emoji: "🍯",
    nameLoc: { en: "Corn syrup", es: "Jarabe de maíz", zh: "玉米糖浆" },
  },
  honey: {
    density: 1.42,
    color: "#d97706",
    emoji: "🍯",
    nameLoc: { en: "Honey", es: "Miel", zh: "蜂蜜" },
  },
  mercury: {
    density: 13.5,
    color: "#cbd5e1",
    emoji: "⚪",
    nameLoc: { en: "Mercury", es: "Mercurio", zh: "水银" },
  },
}

export const ALL_LIQUID_KEYS = Object.keys(LIQUIDS) as LiquidKey[]

/** Turn a list of liquid keys into the {key, density} shape the model wants. */
function toLiquids(keys: LiquidKey[]): Liquid[] {
  return keys.map((k) => ({ key: k, density: LIQUIDS[k].density }))
}

// ---------------------------------------------------------------------------
// Rounds
// ---------------------------------------------------------------------------

export type RoundType = "sinkFloat" | "layer" | "order" | "calc"

export type Round =
  // Predict whether the object floats or sinks in plain water.
  | { type: "sinkFloat"; objectId: ObjectKey }
  // Predict where the object comes to rest among the given liquids.
  | { type: "layer"; objectId: ObjectKey; liquids: LiquidKey[] }
  // Predict the order the liquids will stack (lightest on top).
  | { type: "order"; liquids: LiquidKey[] }
  // Compute the object's density from its mass and volume.
  | { type: "calc"; objectId: ObjectKey }

/** Which distinct object(s) a round exercises — used for the "test 10 objects" badge. */
export function roundObjects(round: Round): ObjectKey[] {
  return round.type === "order" ? [] : [round.objectId]
}

// --- sink / float ----------------------------------------------------------

/** "float" or "sink" — the correct answer for a sink/float round in water. */
export function sinkFloatAnswer(objectId: ObjectKey): "float" | "sink" {
  return floatsInWater(OBJECT_BY_ID[objectId].density) ? "float" : "sink"
}

// --- resting layer ---------------------------------------------------------

/** The liquid key the object rests on, or "bottom" when it sinks past them all. */
export function layerAnswer(objectId: ObjectKey, liquids: LiquidKey[]): LiquidKey | "bottom" {
  const density = OBJECT_BY_ID[objectId].density
  const result = describeDrop(density, toLiquids(liquids))
  switch (result.kind) {
    case "floats":
    case "between":
      return result.restKey as LiquidKey
    case "hover":
      return result.nearKey as LiquidKey
    case "sinks":
    case "no-liquid":
      return "bottom"
  }
}

/** Answer options for a layer round: every liquid present, plus "bottom",
 *  ordered lightest → densest so the choices read top-to-bottom like the tube. */
export function layerOptions(liquids: LiquidKey[]): (LiquidKey | "bottom")[] {
  const sorted = [...liquids].sort((a, b) => LIQUIDS[a].density - LIQUIDS[b].density)
  return [...sorted, "bottom"]
}

// --- stacking order --------------------------------------------------------

/** The correct top → bottom stack (lightest liquid floats to the top). */
export function orderAnswer(liquids: LiquidKey[]): LiquidKey[] {
  return sortByDensityAsc(liquids.map((k) => ({ key: k, density: LIQUIDS[k].density }))).map(
    (l) => l.key as LiquidKey,
  )
}

/** Three candidate orderings (top → bottom): the correct one plus two wrong
 *  ones. Deterministic (no RNG) so results are stable across renders. */
export function orderOptions(liquids: LiquidKey[]): LiquidKey[][] {
  const correct = orderAnswer(liquids)
  const reversed = [...correct].reverse()
  // A single adjacent swap of the first two — a plausible "close but wrong".
  const swapped = [...correct]
  if (swapped.length >= 2) [swapped[0], swapped[1]] = [swapped[1], swapped[0]]
  const seen = new Set<string>()
  const out: LiquidKey[][] = []
  for (const cand of [correct, reversed, swapped]) {
    const sig = cand.join(",")
    if (!seen.has(sig)) {
      seen.add(sig)
      out.push(cand)
    }
  }
  return out
}

// --- calculation -----------------------------------------------------------

/** Correct density for a calc round (mass ÷ volume, 2 decimals). */
export function calcAnswer(objectId: ObjectKey): number {
  const o = OBJECT_BY_ID[objectId]
  return computeDensity(o.mass, o.volume)
}

/** Four numeric options for a calc round: the answer plus common-mistake
 *  distractors (inverse, forgot-to-divide), sorted ascending. Deterministic. */
export function calcOptions(objectId: ObjectKey): number[] {
  const o = OBJECT_BY_ID[objectId]
  const correct = computeDensity(o.mass, o.volume)
  const round2 = (n: number) => Math.round(n * 100) / 100
  const candidates = [
    correct,
    round2(o.volume / o.mass), // inverse mistake
    round2(o.mass), // forgot to divide
    round2(correct * 2), // doubling mistake
    round2(correct + 1),
  ]
  const out: number[] = []
  for (const c of candidates) {
    if (c > 0 && !out.includes(c)) out.push(c)
    if (out.length === 4) break
  }
  // Guarantee four options even for awkward numbers.
  let pad = 1
  while (out.length < 4) {
    const c = round2(correct + pad * 0.5)
    if (!out.includes(c)) out.push(c)
    pad++
  }
  return out.sort((a, b) => a - b)
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

export const POINTS_PER_CORRECT = 100

/** Points awarded for a correct answer given the current in-a-row streak
 *  (streak counts THIS answer). A gentle bonus rewards consistency; wrong
 *  answers simply score 0 — never negative — to keep it kid-friendly. */
export function roundPoints(streak: number): number {
  return POINTS_PER_CORRECT + Math.min(Math.max(streak - 1, 0), 5) * 20
}

// ---------------------------------------------------------------------------
// Shared explanation snippets (physics reasoning that isn't object-specific)
// ---------------------------------------------------------------------------

export const ORDER_EXPLAIN: Loc = {
  en: "Liquids sort themselves by density: the lightest floats to the top and the densest sinks to the bottom.",
  es: "Los líquidos se ordenan por densidad: el más ligero flota arriba y el más denso se hunde al fondo.",
  zh: "液体会按密度分层：最轻的浮在最上面，最重的沉到最底部。",
}

// ---------------------------------------------------------------------------
// Levels
// ---------------------------------------------------------------------------

export type DensityLevel = {
  id: number
  titleLoc: Loc
  goalLoc: Loc
  /** Marks a tower/layer-ordering level — a perfect here earns Layer Master. */
  tower?: boolean
  rounds: Round[]
}

export const LEVELS: DensityLevel[] = [
  {
    id: 1,
    titleLoc: { en: "Sink or Float", es: "Se hunde o flota", zh: "沉还是浮" },
    goalLoc: {
      en: "Drop each object into plain water. Will it float on top or sink to the bottom?",
      es: "Deja caer cada objeto en agua. ¿Flotará arriba o se hundirá al fondo?",
      zh: "把每个物体放进清水里。它会浮在上面还是沉到底？",
    },
    rounds: [
      { type: "sinkFloat", objectId: "cork" },
      { type: "sinkFloat", objectId: "penny" },
      { type: "sinkFloat", objectId: "ice" },
      { type: "sinkFloat", objectId: "rock" },
    ],
  },
  {
    id: 2,
    titleLoc: { en: "Oil vs Water", es: "Aceite vs agua", zh: "油与水" },
    goalLoc: {
      en: "Oil floats on water because it's less dense. Where will each object come to rest?",
      es: "El aceite flota sobre el agua porque es menos denso. ¿Dónde quedará cada objeto?",
      zh: "油比水轻，会浮在水面上。每个物体会停在哪里？",
    },
    rounds: [
      { type: "layer", objectId: "cork", liquids: ["oil", "water"] },
      { type: "layer", objectId: "plastic", liquids: ["oil", "water"] },
      { type: "layer", objectId: "tomato", liquids: ["oil", "water"] },
      { type: "layer", objectId: "grape", liquids: ["oil", "water"] },
    ],
  },
  {
    id: 3,
    titleLoc: { en: "Build a Density Tower", es: "Construye una torre de densidad", zh: "搭建密度塔" },
    tower: true,
    goalLoc: {
      en: "Pour three liquids in. Which order will they stack, lightest on top?",
      es: "Vierte tres líquidos. ¿En qué orden se apilan, el más ligero arriba?",
      zh: "倒入三种液体。它们会怎样分层，最轻的在上面？",
    },
    rounds: [
      { type: "order", liquids: ["water", "oil", "honey"] },
      { type: "order", liquids: ["oil", "honey", "saltwater"] },
      { type: "order", liquids: ["milk", "water", "syrup"] },
    ],
  },
  {
    id: 4,
    titleLoc: { en: "Predict the Layer", es: "Predice la capa", zh: "预测所在层" },
    goalLoc: {
      en: "The tube has oil, water, and honey. Predict which layer each object settles on.",
      es: "El tubo tiene aceite, agua y miel. Predice en qué capa se queda cada objeto.",
      zh: "管里有油、水和蜂蜜。预测每个物体会停在哪一层。",
    },
    rounds: [
      { type: "layer", objectId: "cork", liquids: ["oil", "water", "honey"] },
      { type: "layer", objectId: "ice", liquids: ["oil", "water", "honey"] },
      { type: "layer", objectId: "grape", liquids: ["oil", "water", "honey"] },
      { type: "layer", objectId: "ring", liquids: ["oil", "water", "honey"] },
    ],
  },
  {
    id: 5,
    titleLoc: { en: "Mass ÷ Volume", es: "Masa ÷ volumen", zh: "质量 ÷ 体积" },
    goalLoc: {
      en: "Density = mass ÷ volume. Work out the density of each object.",
      es: "Densidad = masa ÷ volumen. Calcula la densidad de cada objeto.",
      zh: "密度 = 质量 ÷ 体积。算出每个物体的密度。",
    },
    rounds: [
      { type: "calc", objectId: "cork" },
      { type: "calc", objectId: "ice" },
      { type: "calc", objectId: "aluminum" },
      { type: "calc", objectId: "rock" },
      { type: "calc", objectId: "steel" },
    ],
  },
  {
    id: 6,
    titleLoc: { en: "Mystery Materials", es: "Materiales misteriosos", zh: "神秘材料" },
    goalLoc: {
      en: "Two secret materials! Predict what they do, then discover what they are.",
      es: "¡Dos materiales secretos! Predice qué hacen y luego descubre qué son.",
      zh: "两种神秘材料！先预测它们的表现，再揭晓它们是什么。",
    },
    rounds: [
      { type: "sinkFloat", objectId: "mysteryA" },
      { type: "sinkFloat", objectId: "mysteryB" },
      { type: "layer", objectId: "mysteryA", liquids: ["oil", "water"] },
      { type: "layer", objectId: "mysteryB", liquids: ["water", "mercury"] },
    ],
  },
  {
    id: 7,
    titleLoc: { en: "Engineering Materials", es: "Materiales de ingeniería", zh: "工程材料" },
    goalLoc: {
      en: "Metals on mercury! Most metals sink in water — but mercury is far denser.",
      es: "¡Metales sobre mercurio! Casi todos los metales se hunden en agua, pero el mercurio es mucho más denso.",
      zh: "金属遇上水银！大多数金属在水里会沉——但水银的密度大得多。",
    },
    rounds: [
      { type: "layer", objectId: "aluminum", liquids: ["water", "mercury"] },
      { type: "layer", objectId: "steel", liquids: ["water", "mercury"] },
      { type: "layer", objectId: "penny", liquids: ["water", "mercury"] },
      { type: "layer", objectId: "ring", liquids: ["water", "mercury"] },
    ],
  },
  {
    id: 8,
    titleLoc: { en: "Expert Challenge", es: "Reto experto", zh: "专家挑战" },
    goalLoc: {
      en: "Everything you've learned, all mixed together. Ready, scientist?",
      es: "Todo lo que aprendiste, mezclado. ¿List@, científic@?",
      zh: "把你学到的全部混在一起。准备好了吗，小科学家？",
    },
    rounds: [
      { type: "calc", objectId: "ring" },
      { type: "layer", objectId: "grape", liquids: ["oil", "water", "honey"] },
      { type: "order", liquids: ["oil", "water", "saltwater", "honey"] },
      { type: "sinkFloat", objectId: "mysteryA" },
      { type: "layer", objectId: "steel", liquids: ["water", "mercury"] },
      { type: "calc", objectId: "rock" },
    ],
  },
]

export const TOTAL_LEVELS = LEVELS.length

export const LEVEL_BY_ID: Record<number, DensityLevel> = LEVELS.reduce(
  (acc, l) => {
    acc[l.id] = l
    return acc
  },
  {} as Record<number, DensityLevel>,
)

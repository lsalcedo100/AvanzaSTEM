// Pure density physics for the Density Tower game.
//
// Everything here is framework-free and i18n-free so it can be unit-tested and
// reused. The UI layer turns these results into localized, kid-friendly text.
//
// Core rule (simplified for the game):
//   • object density  >  liquid density  → it SINKS through that liquid
//   • object density  <  liquid density  → it FLOATS on that liquid
//   • densities within HOVER_EPS          → it HOVERS, partly submerged
//
// Run the sanity checks with:  npx tsx components/ui/density-model.test.ts

export const WATER_DENSITY = 1.0

/** A localized string bundle. Mirrors the pattern used by circuit-levels so
 *  game content can live beside the code instead of bloating translations. */
export type Loc = { en: string; es: string; zh: string }

/** density = mass ÷ volume, rounded to 2 decimals (kid-friendly). */
export function computeDensity(mass: number, volume: number): number {
  if (volume === 0) return 0
  return Math.round((mass / volume) * 100) / 100
}

/** Does an object of this density float in plain water? (hover counts as float
 *  since it stays at the surface rather than sinking to the bottom). */
export function floatsInWater(density: number): boolean {
  return density <= WATER_DENSITY + HOVER_EPS
}

// How close two densities must be (g/cm³) before we treat them as "the same"
// and let the object hover at the boundary instead of clearly sinking/floating.
export const HOVER_EPS = 0.03

export interface Liquid {
  key: string
  density: number
}

/** Sort any density-bearing items lightest → densest (does not mutate input). */
export function sortByDensityAsc<T extends { density: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.density - b.density)
}

/** Simple sink/float verdict of one object against one liquid. */
export type SinkFloat = "sinks" | "floats" | "hovers"

export function compareToLiquid(
  objectDensity: number,
  liquidDensity: number,
): SinkFloat {
  if (Math.abs(objectDensity - liquidDensity) <= HOVER_EPS) return "hovers"
  return objectDensity > liquidDensity ? "sinks" : "floats"
}

/**
 * Where an object comes to rest when dropped into a set of liquid layers.
 * `liquids` is the list of DISTINCT liquids currently in the tube (any order).
 *
 *  - no-liquid : the tube has no liquid yet
 *  - floats    : lighter than every liquid → floats on the topmost (`restKey`)
 *  - between   : sinks through lighter liquid(s) (`upperKey`) and floats on `restKey`
 *  - sinks     : denser than every liquid → settles at the bottom (`bottomKey`)
 *  - hover     : density ≈ a liquid's → hovers at that boundary (`nearKey`)
 */
export type DropResult =
  | { kind: "no-liquid" }
  | { kind: "floats"; restKey: string }
  | { kind: "between"; upperKey: string; restKey: string }
  | { kind: "sinks"; bottomKey: string }
  | { kind: "hover"; nearKey: string }

/** Find the resting layer + verdict for an object dropped into `liquids`. */
export function describeDrop(
  objectDensity: number,
  liquids: Liquid[],
): DropResult {
  if (liquids.length === 0) return { kind: "no-liquid" }

  const asc = sortByDensityAsc(liquids)

  // Lightest liquid the object cannot sink through (density ≥ object).
  const rest = asc.find((l) => l.density >= objectDensity) ?? null

  if (!rest) {
    // Denser than everything → sinks to the very bottom.
    const densest = asc[asc.length - 1]
    if (Math.abs(objectDensity - densest.density) <= HOVER_EPS) {
      return { kind: "hover", nearKey: densest.key }
    }
    return { kind: "sinks", bottomKey: densest.key }
  }

  // Very close density → hover at that boundary.
  if (Math.abs(objectDensity - rest.density) <= HOVER_EPS) {
    return { kind: "hover", nearKey: rest.key }
  }

  // Liquids it sank through (all lighter than the object).
  const passed = asc.filter((l) => l.density < objectDensity)
  if (passed.length === 0) {
    // Lighter than every liquid → floats on the topmost layer.
    return { kind: "floats", restKey: rest.key }
  }
  // Rests between: sank through the densest of the lighter liquids, floats on `rest`.
  return { kind: "between", upperKey: passed[passed.length - 1].key, restKey: rest.key }
}

/** Where a freshly poured liquid ends up relative to the others already in the tube. */
export type PourPosition = "only" | "top" | "bottom" | "middle"

export function pourPosition(
  newDensity: number,
  otherDensities: number[],
): PourPosition {
  if (otherDensities.length === 0) return "only"
  if (newDensity <= Math.min(...otherDensities)) return "top"
  if (newDensity >= Math.max(...otherDensities)) return "bottom"
  return "middle"
}

/** Kid-friendly "compared to water" bucket, used for both liquids and objects. */
export type WaterComparison =
  | "muchLess"
  | "less"
  | "same"
  | "slightly"
  | "denser"
  | "muchDenser"

export function waterComparison(density: number): WaterComparison {
  if (density < 0.5) return "muchLess"
  if (density < 0.97) return "less"
  if (density <= 1.04) return "same"
  if (density < 1.2) return "slightly"
  if (density < 5) return "denser"
  return "muchDenser"
}

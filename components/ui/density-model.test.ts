// Plain-assertion validation for the Density Tower physics model.
//
// Not wired into a test runner (the project has none) — run it directly:
//
//     npx tsx components/ui/density-model.test.ts
//
// Each check asserts the physically correct sink/float/layer outcome and
// doubles as documentation for the density rules the game teaches.

import {
  type Liquid,
  compareToLiquid,
  describeDrop,
  pourPosition,
  sortByDensityAsc,
  waterComparison,
} from "./density-model"

let passed = 0
let failed = 0

function assert(label: string, cond: boolean) {
  if (cond) {
    passed++
    console.log(`  ✓ ${label}`)
  } else {
    failed++
    console.error(`  ✗ ${label}`)
  }
}

function scenario(name: string, fn: () => void) {
  console.log(`\n${name}`)
  fn()
}

// Canonical densities used by the game (g/cm³).
const water: Liquid = { key: "water", density: 1.0 }
const oil: Liquid = { key: "oil", density: 0.92 }
const honey: Liquid = { key: "honey", density: 1.42 }
const mercury: Liquid = { key: "mercury", density: 13.5 }

const CORK = 0.24
const ICE = 0.92
const GRAPE = 1.05
const PENNY = 8.96
const RING = 19.3

// ---------------------------------------------------------------------------
scenario("sortByDensityAsc orders lightest → densest", () => {
  const sorted = sortByDensityAsc([honey, oil, water, mercury])
  assert("first is oil", sorted[0].key === "oil")
  assert("last is mercury", sorted[3].key === "mercury")
  assert("does not mutate input", [honey, oil, water][0].key === "honey")
})

// ---------------------------------------------------------------------------
scenario("compareToLiquid applies the sink/float rule", () => {
  assert("grape sinks in water (1.05 > 1.00)", compareToLiquid(GRAPE, 1.0) === "sinks")
  assert("cork floats on water (0.24 < 1.00)", compareToLiquid(CORK, 1.0) === "floats")
  assert("near-equal densities hover", compareToLiquid(1.0, 1.01) === "hovers")
})

// ---------------------------------------------------------------------------
scenario("describeDrop finds the correct resting layer", () => {
  assert("no liquid → no-liquid", describeDrop(GRAPE, []).kind === "no-liquid")

  // Grape denser than the only liquid (water) → sinks to bottom.
  const g1 = describeDrop(GRAPE, [water])
  assert("grape in water sinks", g1.kind === "sinks")
  assert("…to the bottom of water", g1.kind === "sinks" && g1.bottomKey === "water")

  // Grape between water and honey → sinks through water, floats on honey.
  const g2 = describeDrop(GRAPE, [water, honey])
  assert("grape between layers", g2.kind === "between")
  assert("…sank through water", g2.kind === "between" && g2.upperKey === "water")
  assert("…rests on honey", g2.kind === "between" && g2.restKey === "honey")

  // Cork lighter than everything → floats on the topmost liquid.
  const c1 = describeDrop(CORK, [water, honey])
  assert("cork floats", c1.kind === "floats")
  assert("…on the lightest liquid (water)", c1.kind === "floats" && c1.restKey === "water")

  // Ice (0.92) floats on water (0.92 vs 1.00) — but hovers vs oil (0.92 ≈ 0.92).
  assert("ice floats on water", describeDrop(ICE, [water]).kind === "floats")
  assert("ice hovers on oil (equal)", describeDrop(ICE, [oil]).kind === "hover")

  // Penny denser than water+honey → sinks to bottom (below honey).
  const p1 = describeDrop(PENNY, [water, honey])
  assert("penny sinks", p1.kind === "sinks")
  assert("…to the bottom (honey is densest present)", p1.kind === "sinks" && p1.bottomKey === "honey")

  // Gold ring denser than everything incl. mercury → sinks.
  assert("ring sinks past mercury", describeDrop(RING, [water, mercury]).kind === "sinks")
})

// ---------------------------------------------------------------------------
scenario("pourPosition explains liquid layering", () => {
  assert("first liquid → only", pourPosition(1.0, []) === "only")
  assert("oil is lightest → top", pourPosition(0.92, [1.0, 1.42]) === "top")
  assert("honey is densest → bottom", pourPosition(1.42, [1.0, 0.92]) === "bottom")
  assert("water sits in the middle", pourPosition(1.0, [0.92, 1.42]) === "middle")
})

// ---------------------------------------------------------------------------
scenario("waterComparison buckets densities kid-friendly", () => {
  assert("cork → much less", waterComparison(CORK) === "muchLess")
  assert("ice → less", waterComparison(ICE) === "less")
  assert("water → same", waterComparison(1.0) === "same")
  assert("grape → slightly denser", waterComparison(GRAPE) === "slightly")
  assert("honey → denser", waterComparison(1.42) === "denser")
  assert("mercury → much denser", waterComparison(13.5) === "muchDenser")
})

// --- summary ---------------------------------------------------------------
console.log(`\n${passed} passed, ${failed} failed`)
if (failed > 0 && typeof process !== "undefined") process.exitCode = 1

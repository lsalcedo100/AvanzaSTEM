// Plain-assertion validation examples for the circuit engine.
//
// These are not wired into a test runner (the project has none) — they are a
// self-contained sanity check you can run directly:
//
//     npx tsx components/ui/circuit-levels.test.ts
//
// Each example builds a tiny grid, runs `simulate`, and asserts the physically
// correct outcome. They double as living documentation of what the engine
// should do for the canonical circuit shapes.

import {
  type Cell,
  checkSolved,
  emptyGrid,
  getCircuitExplanation,
  getDeadEndWires,
  hasShortCircuit,
  isBulbBypassed,
  isClosedLoop,
  simulate,
} from "./circuit-levels"

// --- tiny test harness -----------------------------------------------------

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

// Build a grid by mutating an empty one. `orient` is battery orientation.
function mk(rows: number, cols: number, cells: Record<string, Cell>): Cell[][] {
  const g = emptyGrid(rows, cols)
  for (const [rc, cell] of Object.entries(cells)) {
    const [r, c] = rc.split(",").map(Number)
    g[r][c] = cell
  }
  return g
}

const wire: Cell = { kind: "wire" }
const bulb: Cell = { kind: "bulb" }
const batV: Cell = { kind: "battery", orientation: "v" } // + south, − north
const batH: Cell = { kind: "battery", orientation: "h" } // + east, − west

// ---------------------------------------------------------------------------
// 1. Working circuit — one bulb on a complete loop.
// ---------------------------------------------------------------------------
scenario("Working circuit", () => {
  const g = mk(3, 4, {
    "0,0": wire, "0,1": bulb, "0,2": wire, "0,3": wire,
    "1,0": batV, "1,3": wire,
    "2,0": wire, "2,1": wire, "2,2": wire, "2,3": wire,
  })
  const sim = simulate(g)
  assert("loop is closed", isClosedLoop(g))
  assert("not shorted", !hasShortCircuit(g))
  assert("the bulb is lit", sim.litBulbs.has("0,1"))
  assert("exactly one bulb lit", sim.litBulbs.size === 1)
  assert("state is 'working'", sim.state === "working")
})

// ---------------------------------------------------------------------------
// 2. Open circuit — same loop with one wire missing.
// ---------------------------------------------------------------------------
scenario("Open circuit", () => {
  const g = mk(3, 4, {
    "0,0": wire, "0,1": bulb, "0,2": wire, "0,3": wire,
    "1,0": batV, "1,3": wire,
    "2,0": wire, /* (2,1) MISSING */ "2,2": wire, "2,3": wire,
  })
  const sim = simulate(g)
  assert("loop is NOT closed", !isClosedLoop(g))
  assert("no bulb lit", sim.litBulbs.size === 0)
  assert("bulb reported unpowered", sim.unlitBulbs.has("0,1"))
  assert("state is 'incomplete' (open)", sim.state === "incomplete")
})

// ---------------------------------------------------------------------------
// 3. Short circuit — a bare-wire loop with no load.
// ---------------------------------------------------------------------------
scenario("Short circuit", () => {
  const g = mk(3, 3, {
    "0,0": wire, "0,1": wire, "0,2": wire,
    "1,0": batV, "1,2": wire,
    "2,0": wire, "2,1": wire, "2,2": wire,
  })
  const sim = simulate(g)
  assert("short detected", hasShortCircuit(g))
  assert("sim flags shorted", sim.shorted)
  assert("no bulb lit", sim.litBulbs.size === 0)
  assert("state is 'short'", sim.state === "short")
})

// ---------------------------------------------------------------------------
// 4. Series circuit — two bulbs on the same single loop, both light.
// ---------------------------------------------------------------------------
scenario("Series circuit", () => {
  const g = mk(3, 4, {
    "0,0": wire, "0,1": bulb, "0,2": wire, "0,3": wire,
    "1,0": batV, "1,3": wire,
    "2,0": wire, "2,1": bulb, "2,2": wire, "2,3": wire,
  })
  const sim = simulate(g)
  assert("loop is closed", isClosedLoop(g))
  assert("not shorted", !hasShortCircuit(g))
  assert("top bulb lit", sim.litBulbs.has("0,1"))
  assert("bottom bulb lit", sim.litBulbs.has("2,1"))
  assert("both bulbs lit", sim.litBulbs.size === 2)
  assert("state is 'working'", sim.state === "working")
  assert("classified as series", sim.circuitType === "series")
  // Two bulbs split one battery → each glows at "medium" (level 2), dimmer than
  // a single bulb (which sits at level 3).
  assert("top bulb is dimmed (medium)", sim.bulbBrightness.get("0,1") === 2)
  assert("bottom bulb is dimmed (medium)", sim.bulbBrightness.get("2,1") === 2)
})

// ---------------------------------------------------------------------------
// 4b. More bulbs in series ⇒ each one dimmer still.
// ---------------------------------------------------------------------------
scenario("Series dims with more bulbs", () => {
  const one = mk(3, 4, {
    "0,0": wire, "0,1": bulb, "0,2": wire, "0,3": wire,
    "1,0": batV, "1,3": wire,
    "2,0": wire, "2,1": wire, "2,2": wire, "2,3": wire,
  })
  const three = mk(3, 5, {
    "0,0": wire, "0,1": bulb, "0,2": bulb, "0,3": bulb, "0,4": wire,
    "1,0": batV, "1,4": wire,
    "2,0": wire, "2,1": wire, "2,2": wire, "2,3": wire, "2,4": wire,
  })
  assert("one bulb alone is bright (level 3)", simulate(one).bulbBrightness.get("0,1") === 3)
  const sim3 = simulate(three)
  assert("three in series all light", sim3.litBulbs.size === 3)
  assert("three in series are dim (level 1)", sim3.bulbBrightness.get("0,2") === 1)
  assert("three-bulb loop is series", sim3.circuitType === "series")
})

// ---------------------------------------------------------------------------
// 5. Parallel circuit — two bulbs each on their own branch, both light.
// ---------------------------------------------------------------------------
scenario("Parallel circuit", () => {
  const g = mk(3, 3, {
    "0,0": wire, "0,1": bulb, "0,2": wire,
    "1,0": wire, "1,1": bulb, "1,2": wire,
    "2,0": wire, "2,1": batH, "2,2": wire,
  })
  const sim = simulate(g)
  assert("loop is closed", isClosedLoop(g))
  assert("not shorted", !hasShortCircuit(g))
  assert("top branch bulb lit", sim.litBulbs.has("0,1"))
  assert("middle branch bulb lit", sim.litBulbs.has("1,1"))
  assert("both bulbs lit", sim.litBulbs.size === 2)
  assert("state is 'working'", sim.state === "working")
  assert("classified as parallel", sim.circuitType === "parallel")
  // Each parallel branch sees the full battery, so both stay bright (level 3).
  assert("top branch bulb bright", sim.bulbBrightness.get("0,1") === 3)
  assert("middle branch bulb bright", sim.bulbBrightness.get("1,1") === 3)
})

// ---------------------------------------------------------------------------
// 5b. A broken parallel branch leaves the other branch still lit.
// ---------------------------------------------------------------------------
scenario("Parallel branch keeps working when another breaks", () => {
  // Two independent rungs across a top (−) and bottom (+) rail. Rung A is whole;
  // rung B's bottom lead is missing, so only rung B goes dark.
  const g = mk(3, 4, {
    "0,0": wire, "0,1": wire, "0,2": wire, "0,3": wire,
    "1,0": batV, "1,1": bulb,              "1,3": bulb,
    "2,0": wire, "2,1": wire, "2,2": wire, /* (2,3) MISSING — breaks rung B */
  })
  const sim = simulate(g)
  assert("intact branch still lit", sim.litBulbs.has("1,1"))
  assert("broken branch is dark", !sim.litBulbs.has("1,3"))
  assert("only the intact bulb lit", sim.litBulbs.size === 1)
})

// ---------------------------------------------------------------------------
// 5c. checkSolved enforces the required circuit type.
// ---------------------------------------------------------------------------
scenario("A parallel goal rejects a series solution", () => {
  const seriesGrid = mk(3, 4, {
    "0,0": wire, "0,1": bulb, "0,2": wire, "0,3": wire,
    "1,0": batV, "1,3": wire,
    "2,0": wire, "2,1": bulb, "2,2": wire, "2,3": wire,
  })
  const parallelGrid = mk(3, 3, {
    "0,0": wire, "0,1": bulb, "0,2": wire,
    "1,0": wire, "1,1": bulb, "1,2": wire,
    "2,0": wire, "2,1": batH, "2,2": wire,
  })
  const parallelLevel = {
    id: 0,
    title: { en: "", es: "", zh: "" },
    goal: { en: "", es: "", zh: "" },
    tools: [] as never[],
    targetParts: 99,
    success: { minLit: 2, requireType: "parallel" as const },
    build: () => parallelGrid,
  }
  assert(
    "series build lights two bulbs but is NOT a parallel solution",
    simulate(seriesGrid).litBulbs.size === 2 &&
      !checkSolved(parallelLevel, simulate(seriesGrid), seriesGrid),
  )
  assert(
    "the parallel build solves the parallel goal",
    checkSolved(parallelLevel, simulate(parallelGrid), parallelGrid),
  )
})

// ---------------------------------------------------------------------------
// Bonus A: an open switch stops the current mid-loop.
// ---------------------------------------------------------------------------
scenario("Open switch", () => {
  const g = mk(3, 4, {
    "0,0": wire, "0,1": bulb, "0,2": wire, "0,3": wire,
    "1,0": batV, "1,3": wire,
    "2,0": wire, "2,1": { kind: "switch", closed: false }, "2,2": wire, "2,3": wire,
  })
  const sim = simulate(g)
  assert("loop is NOT closed", !isClosedLoop(g))
  assert("bulb dark", sim.litBulbs.size === 0)
  assert("state is 'switch-open'", sim.state === "switch-open")

  // Closing the switch should light the bulb.
  const closed = mk(3, 4, {
    "0,0": wire, "0,1": bulb, "0,2": wire, "0,3": wire,
    "1,0": batV, "1,3": wire,
    "2,0": wire, "2,1": { kind: "switch", closed: true }, "2,2": wire, "2,3": wire,
  })
  assert("closing the switch lights the bulb", simulate(closed).litBulbs.has("0,1"))
})

// ---------------------------------------------------------------------------
// Bonus B: a dead-end wire / one-sided component carries no current.
// ---------------------------------------------------------------------------
scenario("Dead-end stub", () => {
  // Working loop plus a stub wire hanging below the bottom rail at (3,1);
  // its only neighbour is (2,1), so no current can return through it.
  const g = mk(4, 4, {
    "0,0": wire, "0,1": bulb, "0,2": wire, "0,3": wire,
    "1,0": batV, "1,3": wire,
    "2,0": wire, "2,1": wire, "2,2": wire, "2,3": wire,
    "3,1": wire /* dead-end stub */,
  })
  const sim = simulate(g)
  const deadEnds = getDeadEndWires(g)
  assert("main bulb still lit", sim.litBulbs.has("0,1"))
  assert("stub reported as dead-end", deadEnds.some((p) => p.r === 3 && p.c === 1))
  assert("stub is not powered", !sim.poweredCells.has("3,1"))
})

// ---------------------------------------------------------------------------
// Bonus C: explanations + no-battery / bypass sanity.
// ---------------------------------------------------------------------------
scenario("Explanations & edge cases", () => {
  const noBattery = mk(2, 2, { "0,0": wire, "0,1": bulb })
  assert("no-battery state", simulate(noBattery).state === "no-battery")
  assert("explanation key matches", getCircuitExplanation(noBattery).titleKey === "circuitStateNoBatteryTitle")

  // A bulb with a wire straight across it (parallel) is bypassed.
  // Left/right rails joined at the top by bare wire → the (1,1) bulb sees the
  // same node on both sides.
  const bypass = mk(3, 3, {
    "0,0": wire, "0,1": wire, "0,2": wire,
    "1,0": wire, "1,1": bulb, "1,2": wire,
    "2,0": wire, "2,1": batH, "2,2": wire,
  })
  assert("bypassed bulb not lit", !simulate(bypass).litBulbs.has("1,1"))
  assert("bulb flagged bypassed", isBulbBypassed(bypass, 1, 1))
})

// --- summary ---------------------------------------------------------------
console.log(`\n${passed} passed, ${failed} failed`)
if (failed > 0 && typeof process !== "undefined") process.exitCode = 1

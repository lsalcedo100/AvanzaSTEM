// Circuit game engine + level definitions.
//
// The board is a variable-sized grid of cells. Each level ships a partial,
// *unsolved* starting layout that the player completes/repairs with a limited
// set of tools. A simple topological simulation decides which bulbs light up.

export type Side = "N" | "E" | "S" | "W"
export const SIDES: Side[] = ["N", "E", "S", "W"]
export const OPPOSITE: Record<Side, Side> = { N: "S", S: "N", E: "W", W: "E" }
export const DELTA: Record<Side, [number, number]> = {
  N: [0, -1],
  S: [0, 1],
  E: [1, 0],
  W: [-1, 0],
}

export type CellKind = "empty" | "wire" | "bulb" | "switch" | "battery"

export type Cell = {
  kind: CellKind
  // For battery: "h" = − west / + east, "v" = − north / + south
  orientation?: "h" | "v"
  // For switch
  closed?: boolean
  // Level-fixed cells cannot be edited by placement/eraser tools (a switch can
  // still be toggled with the Hand tool so "close the switch" puzzles work).
  locked?: boolean
}

export type Tool = "hand" | "wire" | "bulb" | "switch" | "battery" | "eraser"

export function emptyGrid(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ kind: "empty" as const })),
  )
}

export function clone(grid: Cell[][]): Cell[][] {
  return grid.map((row) => row.map((c) => ({ ...c })))
}

const key = (r: number, c: number) => `${r},${c}`
const portKey = (r: number, c: number, side: Side) => `${r},${c},${side}`

/**
 * Which sides of a cell can carry current *right now*.
 * - Wire and bulb are open on every side (a wire is a junction, a bulb is a
 *   two-terminal load that current can enter/leave from any wired side).
 * - A switch conducts on all sides only when it is closed; open, it blocks.
 * - A battery only exposes its two terminals.
 */
export function openSidesForCell(c: Cell): Set<Side> {
  if (c.kind === "wire" || c.kind === "bulb") return new Set(SIDES)
  if (c.kind === "switch") return c.closed ? new Set(SIDES) : new Set()
  if (c.kind === "battery") {
    if (c.orientation === "v") return new Set<Side>(["N", "S"])
    return new Set<Side>(["E", "W"])
  }
  return new Set()
}

/**
 * Like {@link openSidesForCell} but pretends every switch is closed. Used for
 * *layout* questions ("which way does this switch face?", "would closing the
 * switches complete the loop?") that must ignore the live open/closed state.
 */
function potentialSidesForCell(c: Cell): Set<Side> {
  if (c.kind === "switch") return new Set(SIDES)
  return openSidesForCell(c)
}

function batteryTerminals(c: Cell): { plus: Side; minus: Side } {
  if (c.orientation === "v") return { plus: "S", minus: "N" }
  return { plus: "E", minus: "W" }
}

/** Every discrete state the circuit can be in, from the player's point of view. */
export type CircuitState =
  | "working" // current flows through every required load — success
  | "open" // the loop is broken somewhere, no current can flow
  | "short" // + and − are joined by bare wire, bypassing the load — dangerous
  | "incomplete" // parts are placed but they do not yet form a loop
  | "bulb-disconnected" // a bulb is not on the current path (dead-end / one-sided)
  | "bulb-bypassed" // a wire runs around the bulb, so it never gets current
  | "switch-open" // the only thing stopping the current is an open switch
  | "no-battery" // there is no power source on the board
  | "no-load" // a loop exists but there is nothing (bulb) to power
  | "invalid" // nothing meaningful to analyse yet

/**
 * How the *lit* bulbs are wired relative to each other — the lesson the game is
 * teaching. Detected from the solved network, not guessed from the layout.
 * - "single":   exactly one bulb is lit (no series/parallel to compare).
 * - "series":   every lit bulb sits on one shared loop; they split the voltage.
 * - "parallel": lit bulbs sit on separate branches, each with its own path back.
 * - "mixed":    parallel branches where at least one branch stacks bulbs in series.
 * - "none":     nothing is lit.
 */
export type CircuitType = "none" | "single" | "series" | "parallel" | "mixed"

export type SimResult = {
  /** True when + and − are joined by a complete conductive path (loads included). */
  closed: boolean
  /** "r,c" of every bulb that is genuinely lit (real current, not bypassed). */
  litBulbs: Set<string>
  /** "r,c" → brightness level for lit bulbs on a simple 0–3 scale:
   *  0 = off, 1 = dim, 2 = medium, 3 = bright. A bulb alone across the battery
   *  is bright; bulbs sharing a series loop split the voltage and dim. */
  bulbBrightness: Map<string, number>
  /** How the lit bulbs are arranged relative to each other (series/parallel/…). */
  circuitType: CircuitType
  /** True when + and − are joined by a path with no load (a dead short). */
  shorted: boolean
  /** The single best description of what the circuit is doing. */
  state: CircuitState
  /** "r,c" of every cell that carries current (battery, live wires, lit bulbs…). */
  poweredCells: Set<string>
  /** "r,c" of bulbs on the board that are NOT lit. */
  unlitBulbs: Set<string>
  /** "r,c" of bulbs that are shorted out by a parallel wire. */
  bypassedBulbs: Set<string>
  /** "r,c" of conductive cells wired on only one side (dead-end stubs). */
  deadEndCells: Set<string>
  /** Actual connections per cell — the sides that truly touch a neighbour. */
  connections: Map<string, Set<Side>>
  /** Layout connections (switches treated as closed) — used to orient glyphs. */
  potentialConnections: Map<string, Set<Side>>
  /** "r,c" of cells worth flagging as the break/fault (open switch, loose
   *  battery terminal, dead-end stub, disconnected bulb) — for highlighting. */
  breakPoints: Set<string>
}

/**
 * Sides of each cell that face a neighbour they *could* connect to, treating
 * switches as closed. Independent of the live open/closed state, so the
 * renderer can always draw a switch/battery pointing the right way.
 */
export function computePotentialConnections(grid: Cell[][]): Map<string, Set<Side>> {
  const rows = grid.length
  const cols = grid[0]?.length ?? 0
  const out = new Map<string, Set<Side>>()
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = grid[r][c]
      if (cell.kind === "empty") continue
      const open = potentialSidesForCell(cell)
      const connected = new Set<Side>()
      for (const side of SIDES) {
        if (!open.has(side)) continue
        const [dx, dy] = DELTA[side]
        const nx = c + dx
        const ny = r + dy
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue
        const nb = grid[ny][nx]
        if (nb.kind === "empty") continue
        if (potentialSidesForCell(nb).has(OPPOSITE[side])) connected.add(side)
      }
      out.set(key(r, c), connected)
    }
  }
  return out
}

// ---------------------------------------------------------------------------
// Core electrical solver
// ---------------------------------------------------------------------------

type Core = {
  rows: number
  cols: number
  /** Root id of the electrical node a port belongs to. */
  find: (k: string) => string
  /** Node id of the battery's + terminal (null when there is no battery). */
  sNode: string | null
  /** Node id of the battery's − terminal. */
  tNode: string | null
  /** Location of the battery, if any. */
  battery: { r: number; c: number } | null
  /** How many batteries are on the board (2+ is unsupported → invalid). */
  batteryCount: number
  /** Load edges (one per current-capable bulb) linking two electrical nodes. */
  loadEdges: { a: string; b: string; owner: string }[]
  /** Per-cell: the sides that actually connect to a live neighbour. */
  connections: Map<string, Set<Side>>
}

/**
 * Build the electrical graph.
 *
 * The trick that keeps the physics honest: **wires and closed switches are
 * zero-resistance**, so we merge all of their sides into one "node" (a single
 * electrical point). **Bulbs and the battery are NOT merged** — a bulb is a
 * load that sits *between* two nodes, and the battery's two terminals must stay
 * apart so current is forced to travel the long way round through the circuit.
 */
function buildCore(grid: Cell[][], treatSwitchesClosed = false): Core {
  const rows = grid.length
  const cols = grid[0]?.length ?? 0
  const openSides = (cell: Cell) =>
    treatSwitchesClosed ? potentialSidesForCell(cell) : openSidesForCell(cell)

  // Union-find over port keys "r,c,side".
  const parent = new Map<string, string>()
  const find = (k: string): string => {
    if (!parent.has(k)) {
      parent.set(k, k)
      return k
    }
    let cur = k
    while (parent.get(cur) !== cur) cur = parent.get(cur)!
    let walk = k
    while (parent.get(walk) !== cur) {
      const next = parent.get(walk)!
      parent.set(walk, cur)
      walk = next
    }
    return cur
  }
  const union = (a: string, b: string) => {
    const ra = find(a)
    const rb = find(b)
    if (ra !== rb) parent.set(ra, rb)
  }

  // 1. Internal merges. Only zero-resistance conductors collapse their sides
  //    into a single node: wires always, switches when conducting. Bulbs and
  //    batteries deliberately keep their sides separate.
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = grid[r][c]
      const conducts =
        cell.kind === "wire" ||
        (cell.kind === "switch" && (cell.closed || treatSwitchesClosed))
      if (!conducts) continue
      const sidesArr = Array.from(openSides(cell))
      for (let i = 1; i < sidesArr.length; i++) {
        union(portKey(r, c, sidesArr[0]), portKey(r, c, sidesArr[i]))
      }
    }
  }

  // 2. External merges between adjacent cells that face each other with open
  //    sides. This also records the real connection mask used by the renderer.
  const connections = new Map<string, Set<Side>>()
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = grid[r][c]
      if (cell.kind === "empty") continue
      const live = openSidesForCell(cell) // renderer/dead-end use the LIVE state
      const connected = new Set<Side>()
      for (const side of SIDES) {
        const [dx, dy] = DELTA[side]
        const nx = c + dx
        const ny = r + dy
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue
        const nb = grid[ny][nx]
        if (nb.kind === "empty") continue
        // Record the *live* connection for the renderer / dead-end detection.
        if (live.has(side) && openSidesForCell(nb).has(OPPOSITE[side])) {
          connected.add(side)
        }
        // Merge nodes using the (possibly switch-relaxed) solver view — done
        // independently so a relaxed switch still joins its neighbours.
        if (openSides(cell).has(side) && openSides(nb).has(OPPOSITE[side])) {
          union(portKey(r, c, side), portKey(ny, nx, OPPOSITE[side]))
        }
      }
      connections.set(key(r, c), connected)
    }
  }

  // 3. Locate the battery and its two terminal nodes.
  let battery: { r: number; c: number } | null = null
  let sNode: string | null = null
  let tNode: string | null = null
  let batteryCount = 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c].kind !== "battery") continue
      batteryCount++
      if (battery) continue
      battery = { r, c }
      const { plus, minus } = batteryTerminals(grid[r][c])
      sNode = find(portKey(r, c, plus))
      tNode = find(portKey(r, c, minus))
    }
  }

  // 4. Turn every current-capable bulb into a load edge between two nodes.
  //    A bulb whose wired sides all land on the *same* node has no voltage
  //    across it (it is bypassed / dead-ended) and is not a load edge.
  const loadEdges: { a: string; b: string; owner: string }[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c].kind !== "bulb") continue
      // Terminal nodes come from the *solver* view (so potential mode, which
      // treats switches as closed, sees the bulb wired through them).
      const nodes = new Set<string>()
      for (const s of SIDES) {
        const [dx, dy] = DELTA[s]
        const nx = c + dx
        const ny = r + dy
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue
        const nb = grid[ny][nx]
        if (nb.kind === "empty") continue
        if (openSides(grid[r][c]).has(s) && openSides(nb).has(OPPOSITE[s])) {
          nodes.add(find(portKey(r, c, s)))
        }
      }
      const arr = Array.from(nodes)
      // Connect the first terminal to each other distinct terminal so current
      // can flow across the bulb between any of its wired nodes.
      for (let i = 1; i < arr.length; i++) {
        loadEdges.push({ a: arr[0], b: arr[i], owner: key(r, c) })
      }
    }
  }

  return { rows, cols, find, sNode, tNode, battery, batteryCount, loadEdges, connections }
}

/** Can we get from node `from` to node `to` across load edges, skipping `skipOwner`? */
function reachable(
  core: Core,
  from: string,
  to: string,
  skipOwner: string | null,
): boolean {
  if (from === to) return true
  const seen = new Set<string>([from])
  const queue = [from]
  while (queue.length) {
    const cur = queue.shift()!
    for (const edge of core.loadEdges) {
      if (edge.owner === skipOwner) continue
      let next: string | null = null
      if (edge.a === cur) next = edge.b
      else if (edge.b === cur) next = edge.a
      if (next == null || seen.has(next)) continue
      if (next === to) return true
      seen.add(next)
      queue.push(next)
    }
  }
  return false
}

// ---------------------------------------------------------------------------
// Simplified physics: how bright is each bulb, and are the bulbs in series or
// parallel? We model every bulb as an identical resistor and the battery as a
// 1-volt source, then solve for the voltage at each electrical node. The
// voltage a bulb sees tells us how brightly it glows — a single bulb gets the
// whole volt, two in series split it in half, three share a third each — which
// is exactly the "more bulbs in series ⇒ dimmer" idea the game teaches. It is
// deliberately simple (unit resistances, one battery) rather than a full SPICE.
// ---------------------------------------------------------------------------

/** Solve `A x = b` in place by Gauss–Jordan; the answer lands in column `n`. */
function gaussianSolve(A: number[][], n: number) {
  for (let col = 0; col < n; col++) {
    let pivot = col
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(A[r][col]) > Math.abs(A[pivot][col])) pivot = r
    }
    if (Math.abs(A[pivot][col]) < 1e-9) continue // singular column — leave at 0
    const tmp = A[col]
    A[col] = A[pivot]
    A[pivot] = tmp
    const d = A[col][col]
    for (let j = col; j <= n; j++) A[col][j] /= d
    for (let r = 0; r < n; r++) {
      if (r === col) continue
      const f = A[r][col]
      if (f === 0) continue
      for (let j = col; j <= n; j++) A[r][j] -= f * A[col][j]
    }
  }
}

/**
 * Node voltages for the load network: the battery pins its − terminal to 0 and
 * its + terminal to 1, bulbs are unit resistors, and Kirchhoff's current law at
 * every other node gives one equation each. Nodes not connected to the battery
 * (floating branches) are left out — their bulbs never light anyway.
 */
function solveNodeVoltages(core: Core): Map<string, number> {
  const V = new Map<string, number>()
  const { sNode, tNode, loadEdges } = core
  if (!sNode || !tNode || sNode === tNode) return V // no source, or a dead short

  // Adjacency across load edges (bulbs).
  const adj = new Map<string, string[]>()
  const link = (a: string, b: string) => {
    if (!adj.has(a)) adj.set(a, [])
    adj.get(a)!.push(b)
  }
  for (const e of loadEdges) {
    link(e.a, e.b)
    link(e.b, e.a)
  }

  // Nodes electrically connected to + through bulbs.
  const comp = new Set<string>([sNode])
  const stack = [sNode]
  while (stack.length) {
    const cur = stack.pop()!
    for (const nb of adj.get(cur) ?? []) {
      if (!comp.has(nb)) {
        comp.add(nb)
        stack.push(nb)
      }
    }
  }
  if (!comp.has(tNode)) return V // + and − aren't joined through any load

  // Unknowns are every connected node except the two fixed battery terminals.
  const unknowns = Array.from(comp).filter((n) => n !== sNode && n !== tNode)
  const idx = new Map(unknowns.map((n, i) => [n, i]))
  const N = unknowns.length
  const fixedVoltage = (n: string): number | null =>
    n === sNode ? 1 : n === tNode ? 0 : null

  // Assemble the reduced conductance system (each bulb contributes conductance 1).
  const A = Array.from({ length: N }, () => new Array<number>(N + 1).fill(0))
  for (const e of loadEdges) {
    for (const [p, q] of [
      [e.a, e.b],
      [e.b, e.a],
    ]) {
      const ip = idx.get(p)
      if (ip == null) continue // p is a fixed terminal — handled from q's own row
      A[ip][ip] += 1
      const fq = fixedVoltage(q)
      if (fq != null) A[ip][N] += fq // known neighbour → move to the right-hand side
      else A[ip][idx.get(q)!] -= 1
    }
  }

  gaussianSolve(A, N)
  V.set(sNode, 1)
  V.set(tNode, 0)
  for (const n of unknowns) V.set(n, A[idx.get(n)!][N])
  return V
}

/** Map the voltage a bulb sees (0–1 of the battery) to the 0–3 brightness scale. */
function brightnessLevel(voltage: number): number {
  if (voltage >= 0.85) return 3 // essentially the full battery → bright
  if (voltage >= 0.45) return 2 // roughly half (two in series) → medium
  if (voltage >= 0.05) return 1 // a small share (three+ in series) → dim
  return 0
}

/** Largest voltage difference across any pair of a bulb's terminal nodes. */
function bulbVoltage(voltages: Map<string, number>, terminals: string[]): number {
  let v = 0
  for (let i = 0; i < terminals.length; i++) {
    for (let j = i + 1; j < terminals.length; j++) {
      const a = voltages.get(terminals[i])
      const b = voltages.get(terminals[j])
      if (a != null && b != null) v = Math.max(v, Math.abs(a - b))
    }
  }
  return v
}

/** What a single lit bulb looks like electrically — used to classify the whole. */
type LitBulbInfo = {
  /** True when one of the bulb's terminals sits on the battery's + node. */
  spansPlus: boolean
  /** The share of the battery voltage this bulb sees (1 = the full battery). */
  voltage: number
}

/**
 * Classify the lit bulbs as series / parallel / mixed from the solved network.
 * - A bulb wired straight across + and − sees the *full* battery voltage; a bulb
 *   sharing a loop with others sees only a fraction — that fraction is how we
 *   tell "in series with something" apart from "on its own branch".
 * - Counting the bulbs that touch + tells us how many independent branches leave
 *   the battery: one branch ⇒ a single series loop, two or more ⇒ parallel.
 */
function classifyTopology(lit: LitBulbInfo[]): CircuitType {
  if (lit.length === 0) return "none"
  if (lit.length === 1) return "single"

  const branchesAtPlus = lit.filter((b) => b.spansPlus).length
  const hasSeries = lit.some((b) => b.voltage < 0.95)

  if (branchesAtPlus >= 2) return hasSeries ? "mixed" : "parallel"
  // A single branch carrying two or more bulbs is a series loop.
  return hasSeries ? "series" : "parallel"
}

/**
 * Full simulation: decides which bulbs light and classifies the circuit.
 * This is the single source of truth the UI and the solve-checker both read.
 */
export function simulate(grid: Cell[][]): SimResult {
  const core = buildCore(grid)
  const { find, sNode, tNode, connections } = core
  const potentialConnections = computePotentialConnections(grid)

  const litBulbs = new Set<string>()
  const bulbBrightness = new Map<string, number>()
  const unlitBulbs = new Set<string>()
  const bypassedBulbs = new Set<string>()
  const poweredCells = new Set<string>()
  const deadEndCells = deadEndCellSet(grid, connections)

  // No power source → nothing can ever flow.
  if (!sNode || !tNode) {
    for (let r = 0; r < grid.length; r++)
      for (let c = 0; c < core.cols; c++)
        if (grid[r][c].kind === "bulb") unlitBulbs.add(key(r, c))
    return {
      closed: false,
      litBulbs,
      bulbBrightness,
      circuitType: "none",
      shorted: false,
      state: core.batteryCount > 1 ? "invalid" : classifyNoBattery(grid),
      poweredCells,
      unlitBulbs,
      bypassedBulbs,
      deadEndCells,
      connections,
      potentialConnections,
      breakPoints: new Set(),
    }
  }

  // A short: + and − are the same electrical node, i.e. joined by bare
  // conductor with no load in between. When shorted the voltage collapses, so
  // NO bulb lights (any bulb across the short is bypassed).
  const shorted = sNode === tNode
  // Closed = + and − are joined by *some* complete path (through loads too).
  const closed = shorted || reachable(core, sNode, tNode, null)

  // Solve the node voltages once so each bulb's brightness reflects how much of
  // the battery it actually gets (full when alone, split when in series).
  const voltages = solveNodeVoltages(core)

  // Decide each bulb individually.
  const litInfo: LitBulbInfo[] = []
  const poweredNodes = new Set<string>()
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < core.cols; c++) {
      if (grid[r][c].kind !== "bulb") continue
      const id = key(r, c)
      const sides = connections.get(id) ?? new Set<Side>()
      const nodes = new Set<string>()
      for (const s of sides) nodes.add(find(portKey(r, c, s)))
      const terminals = Array.from(nodes)

      let lit = false
      if (!shorted && terminals.length >= 2) {
        // The bulb lights when current can enter one terminal from + and leave
        // another terminal toward − (using the rest of the network, not this
        // bulb itself). That is exactly what a completed series/parallel loop
        // provides — and exactly what a dead-end branch cannot.
        outer: for (let i = 0; i < terminals.length; i++) {
          for (let j = 0; j < terminals.length; j++) {
            if (i === j) continue
            const a = terminals[i]
            const b = terminals[j]
            if (reachable(core, sNode, a, id) && reachable(core, tNode, b, id)) {
              lit = true
              break outer
            }
          }
        }
      }

      if (lit) {
        litBulbs.add(id)
        // Brightness (0–3) from the share of the battery voltage this bulb sees:
        // full across the battery ⇒ bright, split across a series loop ⇒ dimmer.
        // A genuinely lit bulb always glows at least dimly.
        const voltage = bulbVoltage(voltages, terminals)
        bulbBrightness.set(id, Math.max(1, brightnessLevel(voltage)))
        litInfo.push({ spansPlus: terminals.includes(sNode), voltage })
        for (const n of terminals) poweredNodes.add(n)
      } else {
        unlitBulbs.add(id)
        // Two+ wired sides but only one node ⇒ a wire loops around the bulb.
        if (terminals.length < 2 && sides.size >= 2) bypassedBulbs.add(id)
      }
    }
  }

  // Mark everything sitting on a live node as powered (drives wire colouring).
  if (closed) {
    poweredNodes.add(sNode)
    poweredNodes.add(tNode)
  }
  if (poweredNodes.size) {
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < core.cols; c++) {
        const id = key(r, c)
        const sides = connections.get(id)
        if (!sides || sides.size === 0) continue
        for (const s of sides) {
          if (poweredNodes.has(find(portKey(r, c, s)))) {
            poweredCells.add(id)
            break
          }
        }
      }
    }
  }

  // Dead-end stubs sit on a live node but no current actually flows through
  // them, so they do not count as "powered" (carrying current).
  for (const id of deadEndCells) poweredCells.delete(id)

  // Collect the spots worth pointing the player at: open switches, battery
  // terminals wired to nothing, dead-end stubs and disconnected bulbs.
  const breakPoints = new Set<string>(deadEndCells)
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < core.cols; c++) {
      const cell = grid[r][c]
      const id = key(r, c)
      if (cell.kind === "switch" && !cell.closed) {
        breakPoints.add(id)
      } else if (cell.kind === "battery") {
        const { plus, minus } = batteryTerminals(cell)
        const sides = connections.get(id) ?? new Set<Side>()
        if (!sides.has(plus) || !sides.has(minus)) breakPoints.add(id)
      } else if (cell.kind === "bulb" && unlitBulbs.has(id)) {
        // A bulb wired on fewer than two sides is a disconnected part.
        if ((connections.get(id)?.size ?? 0) < 2) breakPoints.add(id)
      }
    }
  }

  const state = classify(grid, core, {
    closed,
    shorted,
    litBulbs,
    unlitBulbs,
    bypassedBulbs,
  })

  const circuitType = classifyTopology(litInfo)

  return {
    closed,
    litBulbs,
    bulbBrightness,
    circuitType,
    shorted,
    state,
    poweredCells,
    unlitBulbs,
    bypassedBulbs,
    deadEndCells,
    connections,
    potentialConnections,
    breakPoints,
  }
}

/** Conductive cells wired on only one side (a stub current can't return from). */
function deadEndCellSet(
  grid: Cell[][],
  connections: Map<string, Set<Side>>,
): Set<string> {
  const out = new Set<string>()
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < (grid[0]?.length ?? 0); c++) {
      const cell = grid[r][c]
      if (cell.kind !== "wire" && cell.kind !== "bulb" && cell.kind !== "switch") continue
      if (cell.kind === "switch" && !cell.closed) continue
      if ((connections.get(key(r, c))?.size ?? 0) === 1) out.add(key(r, c))
    }
  }
  return out
}

function classifyNoBattery(grid: Cell[][]): CircuitState {
  // Distinguish "empty board" from "you forgot the battery".
  let anything = false
  for (const row of grid) for (const cell of row) if (cell.kind !== "empty") anything = true
  return anything ? "no-battery" : "invalid"
}

/** Pick the single most helpful description of the circuit for the player. */
function classify(
  grid: Cell[][],
  core: Core,
  s: {
    closed: boolean
    shorted: boolean
    litBulbs: Set<string>
    unlitBulbs: Set<string>
    bypassedBulbs: Set<string>
  },
): CircuitState {
  if (core.batteryCount === 0) return classifyNoBattery(grid)
  if (core.batteryCount > 1) return "invalid"

  const bulbCount = countKind(grid, "bulb")

  // A bare-wire loop across the battery is the classic short.
  if (s.shorted) return "short"
  // A closed loop with nothing to power is a "no load" teaching moment.
  if (bulbCount === 0) return s.closed ? "no-load" : "incomplete"

  if (s.closed) {
    if (s.unlitBulbs.size === 0) return "working"
    if (s.bypassedBulbs.size > 0) return "bulb-bypassed"
    return "bulb-disconnected"
  }

  // Not closed. If merely closing the open switches would light things, that's
  // the friendliest thing to point out.
  const hasOpenSwitch = grid.some((row) =>
    row.some((c) => c.kind === "switch" && !c.closed),
  )
  if (hasOpenSwitch) {
    const potential = buildCore(grid, true)
    if (
      potential.sNode &&
      potential.tNode &&
      potential.sNode !== potential.tNode &&
      reachable(potential, potential.sNode, potential.tNode, null)
    ) {
      return "switch-open"
    }
  }

  // Otherwise it is just an unfinished / broken loop.
  return "incomplete"
}

export function countKind(grid: Cell[][], kind: CellKind): number {
  let n = 0
  for (const row of grid) for (const cell of row) if (cell.kind === kind) n++
  return n
}

// ---------------------------------------------------------------------------
// Explainer helpers — each answers one question about the circuit so the game
// (and its tests) can describe *why* a circuit does or doesn't work.
// ---------------------------------------------------------------------------

/** Is there a complete conductive path from + to − (loads count as a path)? */
export function isClosedLoop(grid: Cell[][]): boolean {
  const core = buildCore(grid)
  if (!core.sNode || !core.tNode) return false
  return core.sNode === core.tNode || reachable(core, core.sNode, core.tNode, null)
}

/** Are + and − joined by bare conductor with no load between them? */
export function hasShortCircuit(grid: Cell[][]): boolean {
  const core = buildCore(grid)
  return core.sNode != null && core.sNode === core.tNode
}

/** "r,c" of every cell that carries current. */
export function getPoweredComponents(grid: Cell[][]): Set<string> {
  return simulate(grid).poweredCells
}

/** "r,c" of every bulb on the board that is not lit. */
export function getUnpoweredBulbs(grid: Cell[][]): Set<string> {
  return simulate(grid).unlitBulbs
}

/**
 * Places where the current path is broken. Reports open switches (current
 * stops here) and battery terminals that connect to nothing.
 */
export function getOpenBreakPoints(
  grid: Cell[][],
): { r: number; c: number; reason: "switch-open" | "battery-terminal" }[] {
  const out: { r: number; c: number; reason: "switch-open" | "battery-terminal" }[] = []
  const core = buildCore(grid)
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < (grid[0]?.length ?? 0); c++) {
      const cell = grid[r][c]
      if (cell.kind === "switch" && !cell.closed) {
        out.push({ r, c, reason: "switch-open" })
      } else if (cell.kind === "battery") {
        const { plus, minus } = batteryTerminals(cell)
        const sides = core.connections.get(key(r, c)) ?? new Set<Side>()
        if (!sides.has(plus) || !sides.has(minus)) {
          out.push({ r, c, reason: "battery-terminal" })
        }
      }
    }
  }
  return out
}

/** Conductive cells wired on only one side — a lead that goes nowhere. */
export function getDeadEndWires(grid: Cell[][]): { r: number; c: number }[] {
  const { deadEndCells } = simulate(grid)
  return Array.from(deadEndCells).map((id) => {
    const [r, c] = id.split(",").map(Number)
    return { r, c }
  })
}

/** Is the bulb at (r,c) shorted out by a wire running around it? */
export function isBulbBypassed(grid: Cell[][], r: number, c: number): boolean {
  return simulate(grid).bypassedBulbs.has(key(r, c))
}

/** A translation-key pair describing the circuit state for the UI. */
export type CircuitExplanation = {
  state: CircuitState
  /** i18n key for a short title, e.g. "circuitStateShortTitle". */
  titleKey: string
  /** i18n key for a one-line explanation, e.g. "circuitStateShortBody". */
  bodyKey: string
}

const STATE_KEY: Record<CircuitState, string> = {
  working: "Working",
  open: "Open",
  short: "Short",
  incomplete: "Incomplete",
  "bulb-disconnected": "BulbDisconnected",
  "bulb-bypassed": "BulbBypassed",
  "switch-open": "SwitchOpen",
  "no-battery": "NoBattery",
  "no-load": "NoLoad",
  invalid: "Invalid",
}

/** Human-facing explanation of the current circuit state (i18n keys). */
export function getCircuitExplanation(grid: Cell[][]): CircuitExplanation {
  const { state } = simulate(grid)
  const suffix = STATE_KEY[state]
  return {
    state,
    titleKey: `circuitState${suffix}Title`,
    bodyKey: `circuitState${suffix}Body`,
  }
}

// ---------------------------------------------------------------------------
// Levels
// ---------------------------------------------------------------------------

export type Loc = { en: string; es: string; zh: string }

export type SuccessSpec = {
  /** At least this many bulbs must be lit. */
  minLit?: number
  /** Every bulb currently on the board must be lit. */
  allBulbsLit?: boolean
  /** The circuit must not be a dead short. */
  noShort?: boolean
  /** At least this many switches must be present on the board. */
  minSwitches?: number
  /** The lit bulbs must be wired this way (e.g. a parallel goal rejects a
   *  series solution even when both bulbs light). */
  requireType?: CircuitType
}

export type Level = {
  id: number
  title: Loc
  goal: Loc
  /** Allowed tools shown in the toolbar (Hand is always usable to flip switches). */
  tools: Tool[]
  success: SuccessSpec
  /** 3-star target: solving with at most this many parts on the board earns
   *  the full three stars. Using more still solves the level (two stars). */
  targetParts: number
  /** Optional bonus challenge — encouraging flavour text shown on the goal and
   *  complete screens (e.g. "Can you avoid short circuits?"). Purely cosmetic. */
  challenge?: Loc
  /** Three escalating hints: 1) general nudge, 2) points at the problem,
   *  3) close to the solution. Revealed one at a time when the player asks. */
  hints?: [Loc, Loc, Loc]
  build: () => Cell[][]
}

/** Small builder helper: mutate specific cells of an empty grid and mark the
 * given ones as locked (level scaffolding the player shouldn't delete). */
function board(
  rows: number,
  cols: number,
  place: (set: (r: number, c: number, cell: Cell, locked?: boolean) => void) => void,
): Cell[][] {
  const g = emptyGrid(rows, cols)
  place((r, c, cell, locked = true) => {
    g[r][c] = { ...cell, locked }
  })
  return g
}

const wire: Cell = { kind: "wire" }
const bulb: Cell = { kind: "bulb" }
const batV: Cell = { kind: "battery", orientation: "v" }
const batH: Cell = { kind: "battery", orientation: "h" }
const swOpen: Cell = { kind: "switch", closed: false }

export function checkSolved(level: Level, sim: SimResult, grid: Cell[][]): boolean {
  const s = level.success
  if (s.noShort && sim.shorted) return false
  if (s.minLit != null && sim.litBulbs.size < s.minLit) return false
  if (s.allBulbsLit) {
    const bulbs = countKind(grid, "bulb")
    if (bulbs === 0 || sim.litBulbs.size < bulbs) return false
  }
  if (s.minSwitches != null && countKind(grid, "switch") < s.minSwitches) return false
  if (s.requireType != null && sim.circuitType !== s.requireType) return false
  return true
}

/** How many parts (non-empty cells) sit on the board — the "parts used" score. */
export function partsUsed(grid: Cell[][]): number {
  let n = 0
  for (const row of grid) for (const cell of row) if (cell.kind !== "empty") n++
  return n
}

/**
 * Stars earned for a *solved* level (1–3). Scoring is meant to encourage, not
 * punish: any correct solution is worth at least two stars, and hints only
 * gently lower the reward so a stuck player is never afraid to ask for help.
 *
 *  - 3 stars: solved with the target number of parts or fewer, no hints used.
 *  - 2 stars: solved correctly but with extra parts (still a win!).
 *  - 1 star:  solved after revealing a hint.
 */
export function computeStars(level: Level, grid: Cell[][], hintsUsed: boolean): 1 | 2 | 3 {
  if (hintsUsed) return 1
  return partsUsed(grid) <= level.targetParts ? 3 : 2
}

export const LEVELS: Level[] = [
  // 1 — Complete a simple circuit to light one bulb.
  {
    id: 1,
    targetParts: 10,
    challenge: {
      en: "Can you close the loop with just one wire?",
      es: "¿Puedes cerrar el circuito con un solo cable?",
      zh: "你能只用一根电线闭合回路吗？",
    },
    title: { en: "First light", es: "Primera luz", zh: "第一盏灯" },
    hints: [
      {
        en: "Follow the wire around the loop and look for a gap.",
        es: "Sigue el cable por el circuito y busca un hueco.",
        zh: "沿着回路走一圈，找出缺口。",
      },
      {
        en: "The bulb needs to connect all the way back to the battery.",
        es: "El foco tiene que conectarse de vuelta hasta la pila.",
        zh: "灯泡需要一路连回电池。",
      },
      {
        en: "Place a wire in the empty square on the bottom row to close the loop.",
        es: "Coloca un cable en el cuadro vacío de la fila de abajo para cerrar el circuito.",
        zh: "在最下面一行的空格里放一根电线，闭合回路。",
      },
    ],
    goal: {
      en: "The loop is missing one wire. Add it so current can flow all the way around and the bulb lights up.",
      es: "Al circuito le falta un cable. Agrégalo para que la corriente dé la vuelta y el foco se encienda.",
      zh: "回路缺了一段电线。补上它，让电流绕一圈把灯泡点亮。",
    },
    tools: ["wire", "eraser"],
    success: { minLit: 1 },
    build: () =>
      board(3, 4, (set) => {
        set(0, 0, wire)
        set(0, 1, bulb)
        set(0, 2, wire)
        set(0, 3, wire)
        set(1, 0, batV)
        set(1, 3, wire)
        set(2, 0, wire)
        // (2,1) intentionally missing — the player adds it
        set(2, 2, wire)
        set(2, 3, wire)
      }),
  },

  // 2 — Add or close a switch to complete the circuit.
  {
    id: 2,
    targetParts: 10,
    title: { en: "Flip the switch", es: "Cierra el interruptor", zh: "合上开关" },
    hints: [
      {
        en: "Something on the board can be turned on or off.",
        es: "Algo en el tablero se puede encender o apagar.",
        zh: "棋盘上有个东西可以打开或关闭。",
      },
      {
        en: "The switch is open, so the current stops there.",
        es: "El interruptor está abierto, así que la corriente se detiene ahí.",
        zh: "开关是断开的，电流在那里停住了。",
      },
      {
        en: "Use the Hand tool and tap the switch to close it.",
        es: "Usa la Mano y toca el interruptor para cerrarlo.",
        zh: "用「手」工具点一下开关把它合上。",
      },
    ],
    goal: {
      en: "Everything is wired, but the switch is open. Use the Hand tool to close it and turn on the light.",
      es: "Todo está conectado, pero el interruptor está abierto. Usa la Mano para cerrarlo y encender la luz.",
      zh: "线路都接好了，但开关是断开的。用「手」工具合上开关，把灯点亮。",
    },
    tools: ["hand"],
    success: { minLit: 1 },
    build: () =>
      board(3, 4, (set) => {
        set(0, 0, wire)
        set(0, 1, bulb)
        set(0, 2, wire)
        set(0, 3, wire)
        set(1, 0, batV)
        set(1, 3, wire)
        set(2, 0, wire)
        set(2, 1, swOpen)
        set(2, 2, wire)
        set(2, 3, wire)
      }),
  },

  // 3 — Fix a missing wire in a broken circuit.
  {
    id: 3,
    targetParts: 12,
    title: { en: "Broken loop", es: "Circuito roto", zh: "断掉的回路" },
    hints: [
      {
        en: "This loop was working — one small piece went missing.",
        es: "Este circuito funcionaba: falta una pieza pequeña.",
        zh: "这个回路本来是好的——少了一小段。",
      },
      {
        en: "Check the right-hand side. The current can't get back down.",
        es: "Revisa el lado derecho. La corriente no puede bajar de vuelta.",
        zh: "检查右边，电流没法回下去。",
      },
      {
        en: "Add a wire on the right rail so the bulb connects back to the battery.",
        es: "Agrega un cable en el riel derecho para que el foco vuelva a la pila.",
        zh: "在右侧导轨上补一根电线，让灯泡连回电池。",
      },
    ],
    goal: {
      en: "This circuit was working until a wire went missing. Find the gap and bridge it so the bulb glows again.",
      es: "Este circuito funcionaba hasta que se perdió un cable. Encuentra el hueco y conéctalo para que el foco brille otra vez.",
      zh: "这个电路本来是好的，直到少了一段电线。找到缺口接上，让灯泡重新亮起来。",
    },
    tools: ["wire", "eraser"],
    success: { minLit: 1 },
    build: () =>
      board(3, 5, (set) => {
        set(0, 0, wire)
        set(0, 1, wire)
        set(0, 2, bulb)
        set(0, 3, wire)
        set(0, 4, wire)
        set(1, 0, batV)
        // (1,4) missing — the gap on the right rail
        set(2, 0, wire)
        set(2, 1, wire)
        set(2, 2, { kind: "switch", closed: true })
        set(2, 3, wire)
        set(2, 4, wire)
      }),
  },

  // 4 — Light two bulbs in series.
  {
    id: 4,
    targetParts: 10,
    challenge: {
      en: "Can you light both bulbs on one loop?",
      es: "¿Puedes encender los dos focos en un solo circuito?",
      zh: "你能用一个回路点亮两盏灯吗？",
    },
    title: { en: "Two in a row", es: "Dos en serie", zh: "串联两盏灯" },
    hints: [
      {
        en: "You need two bulbs glowing, and there's an empty square.",
        es: "Necesitas dos focos encendidos y hay un cuadro vacío.",
        zh: "你需要点亮两盏灯，而且有一个空格。",
      },
      {
        en: "A plain wire would light only one bulb — the gap wants a bulb.",
        es: "Un cable simple encendería solo un foco: el hueco necesita un foco.",
        zh: "光放电线只能点亮一盏——缺口需要一盏灯。",
      },
      {
        en: "Place a second bulb in the empty square so both share the loop in a row.",
        es: "Coloca un segundo foco en el cuadro vacío para que ambos compartan el circuito en serie.",
        zh: "在空格里放第二盏灯，让两盏灯串联共用回路。",
      },
    ],
    goal: {
      en: "One bulb already sits on the loop. Add a second bulb in the gap so both light up in series.",
      es: "Ya hay un foco en el circuito. Coloca un segundo foco en el hueco para que ambos se enciendan en serie.",
      zh: "回路上已经有一盏灯。在缺口处再放一盏灯，让两盏灯串联发光。",
    },
    tools: ["bulb", "wire", "eraser"],
    success: { minLit: 2 },
    build: () =>
      board(3, 4, (set) => {
        set(0, 0, wire)
        set(0, 1, bulb)
        set(0, 2, wire)
        set(0, 3, wire)
        set(1, 0, batV)
        set(1, 3, wire)
        set(2, 0, wire)
        // (2,1) missing — player drops the 2nd bulb here (a plain wire only lights one)
        set(2, 2, wire)
        set(2, 3, wire)
      }),
  },

  // 5 — Light two bulbs in parallel.
  {
    id: 5,
    targetParts: 9,
    title: { en: "Side by side", es: "Lado a lado", zh: "并联两盏灯" },
    hints: [
      {
        en: "One bulb already glows on its own branch.",
        es: "Un foco ya brilla en su propia rama.",
        zh: "一盏灯已经在自己的支路上亮着。",
      },
      {
        en: "There's room for a second bulb on another path between the rails.",
        es: "Hay espacio para un segundo foco en otro camino entre los rieles.",
        zh: "两条导轨之间还有一条路可以放第二盏灯。",
      },
      {
        en: "Drop a bulb in the middle square so both light up side by side.",
        es: "Pon un foco en el cuadro del medio para que ambos se enciendan lado a lado.",
        zh: "在中间的格子放一盏灯，让两盏灯并排点亮。",
      },
    ],
    goal: {
      en: "The top bulb lights on its own branch. Add a second bulb in the middle so both shine in parallel.",
      es: "El foco de arriba se enciende en su rama. Agrega un segundo foco en el medio para que ambos brillen en paralelo.",
      zh: "上面的灯泡在自己的支路上亮着。在中间再加一盏灯，让两盏灯并联发光。",
    },
    tools: ["bulb", "wire", "eraser"],
    success: { minLit: 2 },
    build: () =>
      board(3, 3, (set) => {
        set(0, 0, wire)
        set(0, 1, bulb)
        set(0, 2, wire)
        set(1, 0, wire)
        // (1,1) missing — player adds the parallel bulb
        set(1, 2, wire)
        set(2, 0, wire)
        set(2, 1, batH)
        set(2, 2, wire)
      }),
  },

  // 6 — One switch controls two bulbs.
  {
    id: 6,
    targetParts: 10,
    challenge: {
      en: "Can you light both bulbs with one switch?",
      es: "¿Puedes encender los dos focos con un solo interruptor?",
      zh: "你能用一个开关点亮两盏灯吗？",
    },
    title: { en: "One switch, two lights", es: "Un interruptor, dos luces", zh: "一个开关控两灯" },
    hints: [
      {
        en: "Both bulbs share one loop with a single control.",
        es: "Ambos focos comparten un circuito con un solo control.",
        zh: "两盏灯共用一个回路和一个开关。",
      },
      {
        en: "The switch is open, so no current reaches either bulb.",
        es: "El interruptor está abierto, así que no llega corriente a ningún foco.",
        zh: "开关断开，两盏灯都没有电流。",
      },
      {
        en: "Close the switch with the Hand tool to light both at once.",
        es: "Cierra el interruptor con la Mano para encender ambos a la vez.",
        zh: "用「手」工具合上开关，同时点亮两盏灯。",
      },
    ],
    goal: {
      en: "Two bulbs share a single loop with one switch. Close the switch to turn both on at once.",
      es: "Dos focos comparten un circuito con un solo interruptor. Cierra el interruptor para encender ambos a la vez.",
      zh: "两盏灯共用一个带单个开关的回路。合上开关，同时点亮两盏灯。",
    },
    tools: ["hand"],
    success: { minLit: 2, minSwitches: 1 },
    build: () =>
      board(3, 4, (set) => {
        set(0, 0, wire)
        set(0, 1, bulb)
        set(0, 2, swOpen)
        set(0, 3, wire)
        set(1, 0, batV)
        set(1, 3, wire)
        set(2, 0, wire)
        set(2, 1, wire)
        set(2, 2, bulb)
        set(2, 3, wire)
      }),
  },

  // 7 — Each bulb controlled by its own switch.
  {
    id: 7,
    targetParts: 12,
    title: { en: "Your own switch", es: "Cada quien su interruptor", zh: "各自的开关" },
    hints: [
      {
        en: "The top branch has its own switch. The bottom branch is missing something.",
        es: "La rama de arriba tiene su interruptor. A la de abajo le falta algo.",
        zh: "上支路有自己的开关，下支路缺了点东西。",
      },
      {
        en: "Each bulb should have its own switch to control it.",
        es: "Cada foco debería tener su propio interruptor.",
        zh: "每盏灯都应该有自己的开关来控制。",
      },
      {
        en: "Add a switch to the bottom branch, then close both switches.",
        es: "Agrega un interruptor a la rama de abajo y luego cierra ambos.",
        zh: "给下支路加一个开关，然后合上两个开关。",
      },
    ],
    goal: {
      en: "The top branch has its own switch; the bottom branch is missing one. Add a switch to the bottom branch, then close both so each bulb has its own control.",
      es: "La rama de arriba tiene su interruptor; a la de abajo le falta uno. Agrega un interruptor a la rama de abajo y cierra ambos para que cada foco tenga su control.",
      zh: "上支路有自己的开关，下支路还缺一个。给下支路加一个开关，然后合上两个开关，让每盏灯都有独立控制。",
    },
    tools: ["switch", "hand", "wire", "eraser"],
    success: { minLit: 2, minSwitches: 2 },
    build: () =>
      board(3, 4, (set) => {
        // Two parallel branches. Left column is the − rail, right column + rail.
        // Top branch already has its switch; the bottom branch's switch slot is
        // empty for the player to fill.
        set(0, 0, wire)
        set(0, 1, swOpen) // top branch switch
        set(0, 2, bulb)
        set(0, 3, wire)
        set(1, 0, wire)
        // (1,1) missing — player adds the second switch here
        set(1, 2, bulb)
        set(1, 3, wire)
        set(2, 0, wire)
        set(2, 1, batH) // battery bridges the − rail (left) and + rail (right)
        set(2, 2, wire)
        set(2, 3, wire)
      }),
  },

  // 8 — Fix a short circuit.
  {
    id: 8,
    targetParts: 8,
    challenge: {
      en: "Can you avoid a short circuit?",
      es: "¿Puedes evitar el cortocircuito?",
      zh: "你能避免短路吗？",
    },
    title: { en: "Stop the short", es: "Detén el corto", zh: "修好短路" },
    hints: [
      {
        en: "The current races around the loop, but nothing is using it.",
        es: "La corriente da vueltas al circuito, pero nada la usa.",
        zh: "电流在回路里空转，但没有东西用到它。",
      },
      {
        en: "A loop of only wire is a short circuit — it needs a load.",
        es: "Un circuito de puro cable es un cortocircuito: necesita una carga.",
        zh: "全是电线的回路会短路——它需要一个负载。",
      },
      {
        en: "Replace one wire with a bulb so the current has something to power.",
        es: "Reemplaza un cable por un foco para que la corriente tenga algo que alimentar.",
        zh: "把一段电线换成灯泡，让电流有东西可以点亮。",
      },
    ],
    goal: {
      en: "This loop is all wire with no load — a dead short! Replace one wire with a bulb so the current has something to power.",
      es: "Este circuito es puro cable sin carga: ¡un cortocircuito! Reemplaza un cable por un foco para que la corriente tenga algo que alimentar.",
      zh: "这个回路全是电线、没有负载——短路了！把其中一段电线换成灯泡，让电流有东西可以点亮。",
    },
    tools: ["bulb", "wire", "eraser"],
    success: { minLit: 1, noShort: true },
    build: () =>
      board(3, 3, (set) => {
        set(0, 0, wire, false)
        set(0, 1, wire, false)
        set(0, 2, wire, false)
        set(1, 0, batV)
        set(1, 2, wire, false)
        set(2, 0, wire, false)
        set(2, 1, wire, false)
        set(2, 2, wire, false)
      }),
  },

  // 9 — Fewest parts.
  {
    id: 9,
    targetParts: 8,
    challenge: {
      en: "Can you solve it with only 6 wires?",
      es: "¿Puedes resolverlo con solo 6 cables?",
      zh: "你能只用 6 段电线完成吗？",
    },
    title: { en: "Keep it short", es: "Lo más corto", zh: "用最少的零件" },
    hints: [
      {
        en: "Connect the battery to the bulb and back into one loop.",
        es: "Conecta la pila al foco y de regreso en un solo circuito.",
        zh: "把电池和灯泡连成一个回路。",
      },
      {
        en: "Current must leave the + side and return to the − side through the bulb.",
        es: "La corriente debe salir del lado + y volver al lado − pasando por el foco.",
        zh: "电流要从 + 出发，经过灯泡回到 − 。",
      },
      {
        en: "Wire the shortest loop you can around the outside — try 6 wires or fewer.",
        es: "Haz el circuito más corto posible por el borde: intenta con 6 cables o menos.",
        zh: "沿着外圈接出最短的回路——试试用 6 段电线以内。",
      },
    ],
    goal: {
      en: "Wire the battery to the bulb and back. Try to close the loop using as few wires as possible.",
      es: "Conecta la pila al foco y de regreso. Intenta cerrar el circuito usando la menor cantidad de cables posible.",
      zh: "把电池和灯泡连成一个回路。尽量用最少的电线闭合回路。",
    },
    tools: ["wire", "eraser"],
    success: { minLit: 1 },
    build: () =>
      board(3, 3, (set) => {
        set(1, 0, batV)
        set(1, 2, bulb)
      }),
  },

  // 10 — Repair a house circuit with multiple branches.
  {
    id: 10,
    targetParts: 14,
    challenge: {
      en: "Can you light every room without a short?",
      es: "¿Puedes encender cada cuarto sin un cortocircuito?",
      zh: "你能点亮每个房间且不短路吗？",
    },
    title: { en: "House rewire", es: "Cablea la casa", zh: "房屋线路维修" },
    hints: [
      {
        en: "Every room should light up — check each one.",
        es: "Cada cuarto debe encenderse: revisa uno por uno.",
        zh: "每个房间都要亮——逐个检查。",
      },
      {
        en: "One room has no bulb, and the top rail has a gap.",
        es: "Un cuarto no tiene foco y al riel de arriba le falta un tramo.",
        zh: "有个房间没有灯泡，上面的导轨也有缺口。",
      },
      {
        en: "Add the missing bulb in the empty room and mend the broken top rail.",
        es: "Agrega el foco que falta en el cuarto vacío y repara el riel de arriba.",
        zh: "在空房间补上缺失的灯泡，并修好断开的上导轨。",
      },
    ],
    goal: {
      en: "Three rooms share the same supply. Add the missing bulb and repair the broken rail so every light turns on.",
      es: "Tres cuartos comparten la misma corriente. Agrega el foco que falta y repara el riel roto para que todas las luces enciendan.",
      zh: "三个房间共用同一路电源。补上缺失的灯泡、修好断开的导轨，让每盏灯都亮起来。",
    },
    tools: ["bulb", "wire", "eraser"],
    success: { allBulbsLit: true, minLit: 3, noShort: true },
    build: () =>
      board(3, 5, (set) => {
        // top rail (minus) — broken above room 3
        set(0, 0, wire)
        set(0, 1, wire)
        set(0, 2, wire)
        // (0,3) missing — broken rail
        set(0, 4, wire)
        // battery bridges the rails on the left
        set(1, 0, batV)
        // room bulbs between the rails
        set(1, 1, bulb) // room 1 (works)
        // (1,2) missing — room 2 needs a bulb
        set(1, 3, bulb) // room 3 (dark until the rail is fixed)
        // bottom rail (plus)
        set(2, 0, wire)
        set(2, 1, wire)
        set(2, 2, wire)
        set(2, 3, wire)
        set(2, 4, wire)
      }),
  },

  // 11 — Two bulbs in series: close the loop, then see them share (and dim).
  {
    id: 11,
    targetParts: 10,
    challenge: {
      en: "Can you say why two bulbs in a row look dimmer?",
      es: "¿Puedes explicar por qué dos focos en fila se ven más tenues?",
      zh: "你能说出为什么串在一起的两盏灯更暗吗？",
    },
    title: { en: "Sharing the current", es: "Compartiendo la corriente", zh: "共享电流" },
    hints: [
      {
        en: "The loop is nearly complete — one wire is missing on the bottom-right.",
        es: "El circuito casi está completo: falta un cable abajo a la derecha.",
        zh: "回路快接好了——右下角还缺一段电线。",
      },
      {
        en: "Both bulbs sit on the same single path, so the current must pass through both.",
        es: "Ambos focos están en el mismo camino, así que la corriente pasa por los dos.",
        zh: "两盏灯在同一条路径上，电流必须依次流过两盏。",
      },
      {
        en: "Add the last wire. The bulbs share the battery's energy, so each glows dimmer.",
        es: "Agrega el último cable. Los focos comparten la energía de la pila, así que cada uno brilla más tenue.",
        zh: "补上最后一段电线。两盏灯分享电池的能量，所以各自都更暗一些。",
      },
    ],
    goal: {
      en: "Close the loop so both bulbs light in series. They sit on one shared path — so they split the battery's energy and each glows dimmer than a single bulb would. (Erase either bulb and the whole path goes dark!)",
      es: "Cierra el circuito para que ambos focos se enciendan en serie. Están en un mismo camino, así que reparten la energía de la pila y cada uno brilla más tenue que un solo foco. (¡Borra cualquiera de los focos y todo el camino se apaga!)",
      zh: "闭合回路，让两盏灯串联点亮。它们在同一条路径上，因此分享电池的能量，每盏都比单独一盏更暗。（擦掉任意一盏灯，整条路径都会熄灭！）",
    },
    tools: ["wire", "eraser"],
    success: { minLit: 2, requireType: "series" },
    build: () =>
      board(3, 4, (set) => {
        set(0, 0, wire)
        set(0, 1, bulb)
        set(0, 2, wire)
        set(0, 3, wire)
        set(1, 0, batV)
        set(1, 3, wire)
        set(2, 0, wire)
        set(2, 1, bulb)
        set(2, 2, wire)
        // (2,3) intentionally missing — add it to close the series loop
      }),
  },

  // 12 — Parallel branches required: a single series loop is NOT accepted.
  {
    id: 12,
    targetParts: 11,
    challenge: {
      en: "Both bulbs bright, and each on its own branch?",
      es: "¿Ambos focos brillantes y cada uno en su propia rama?",
      zh: "两盏灯都很亮，而且各自在自己的支路上？",
    },
    title: { en: "Bright branches", es: "Ramas brillantes", zh: "明亮的支路" },
    hints: [
      {
        en: "Build a top rail and a bottom rail so each bulb bridges between them.",
        es: "Arma un riel arriba y otro abajo para que cada foco los conecte.",
        zh: "接出上下两条导轨，让每盏灯都跨接在它们之间。",
      },
      {
        en: "Each bulb needs its own path from + back to −, not a single shared loop.",
        es: "Cada foco necesita su propio camino de + a −, no un solo lazo compartido.",
        zh: "每盏灯都要有从 + 回到 − 的独立路径，而不是共用一个回路。",
      },
      {
        en: "Wire the whole top row and the whole bottom row; both bulbs then shine bright in parallel.",
        es: "Cablea toda la fila de arriba y toda la de abajo; los dos focos brillarán en paralelo.",
        zh: "把最上面一行和最下面一行都接上，两盏灯就会并联发亮。",
      },
    ],
    goal: {
      en: "Light both bulbs so each stays BRIGHT. They must be in parallel — each bulb on its own branch back to the battery, so each gets the full voltage. A single series loop lights them dimly and will NOT be accepted here.",
      es: "Enciende ambos focos para que cada uno quede BRILLANTE. Deben estar en paralelo: cada foco en su propia rama de vuelta a la pila, para que cada uno reciba todo el voltaje. Un solo lazo en serie los enciende tenues y NO será aceptado aquí.",
      zh: "点亮两盏灯，让每盏都保持明亮。它们必须并联——每盏灯都有自己回到电池的支路，从而获得完整的电压。单个串联回路只会让它们暗淡发光，在这里不会被接受。",
    },
    tools: ["wire", "eraser"],
    success: { minLit: 2, requireType: "parallel" },
    build: () =>
      board(3, 4, (set) => {
        // Battery on the left; two bulbs waiting to become parallel rungs.
        set(1, 0, batV) // − north (top rail), + south (bottom rail)
        set(1, 1, bulb)
        set(1, 3, bulb)
        // The player wires the top rail (−) and bottom rail (+) so each bulb
        // bridges between them on its own branch.
      }),
  },
]

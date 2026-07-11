/**
 * Robotics block-programming model: a typed, serializable, executable program
 * representation, a safe step interpreter, and static validation. Framework-free
 * and fully unit-testable.
 *
 * Design (see the Phase-1 audit: no Blockly, no drag-drop library is installed):
 * this is a small custom system rather than a heavy dependency. The program is a
 * plain typed AST (independent of any visual block ids), so the same program can
 * be built by a drag editor or an accessible keyboard/command-list editor, saved
 * as JSON, validated, versioned, and executed by the (future) simulator through
 * the `RobotWorld` interface below. Execution is a tree-walking generator with a
 * hard step budget - there is NO eval and no way to run arbitrary code, and a
 * `forever` loop can never hang the browser.
 */

export const ROBOTICS_PROGRAM_VERSION = 1 as const

/* -------------------------------------------------------------------------- */
/* Expressions                                                                */
/* -------------------------------------------------------------------------- */

/** A value that evaluates to a number against the robot + world. */
export type NumberExpr =
  | { type: "num"; value: number }
  | { type: "var"; name: string }
  | { type: "distance" } // distance to the nearest wall/edge ahead, in cells
  | { type: "light" } // reflected-light value 0-100 (dark line = low)

/** A value that evaluates to true/false against the robot + world. */
export type BoolExpr =
  | { type: "compare"; op: "<" | ">" | "==" | "!=" | "<=" | ">="; left: NumberExpr; right: NumberExpr }
  | { type: "touch" } // touch sensor pressed (wall directly ahead)
  | { type: "color"; color: string } // color under the robot equals `color`
  | { type: "onLine" } // robot is over a line
  | { type: "not"; expr: BoolExpr }

/* -------------------------------------------------------------------------- */
/* Statements                                                                 */
/* -------------------------------------------------------------------------- */

export type Statement =
  // movement
  | { type: "move"; direction: "forward" | "backward"; distance: number }
  | { type: "turn"; direction: "left" | "right"; angle: number }
  | { type: "setSpeed"; target: "both" | "left" | "right"; speed: number }
  | { type: "stopMotors" }
  | { type: "moveForDuration"; direction: "forward" | "backward"; ms: number }
  // events / execution
  | { type: "wait"; ms: number }
  | { type: "safeStop" } // stop safely and end the program
  | { type: "missionComplete" } // signal the mission is done
  | { type: "log"; value: NumberExpr }
  // control
  | { type: "repeat"; count: number; body: Statement[] }
  | { type: "forever"; body: Statement[] }
  | { type: "repeatUntil"; condition: BoolExpr; body: Statement[] }
  | { type: "waitUntil"; condition: BoolExpr }
  | { type: "if"; condition: BoolExpr; body: Statement[] }
  | { type: "ifElse"; condition: BoolExpr; body: Statement[]; elseBody: Statement[] }
  // data
  | { type: "setVar"; name: string; value: NumberExpr }
  | { type: "changeVar"; name: string; by: NumberExpr }
  | { type: "resetCounter"; name: string }

/** A complete program: a versioned, serializable AST. */
export type Program = {
  version: number
  /** Declared variable/counter names (the safe supported set). */
  variables: string[]
  body: Statement[]
}

/** Statement kinds that contain a nested body, for editors and traversal. */
export const CONTAINER_TYPES = ["repeat", "forever", "repeatUntil", "if", "ifElse"] as const

export function emptyProgram(): Program {
  return { version: ROBOTICS_PROGRAM_VERSION, variables: [], body: [] }
}

/* -------------------------------------------------------------------------- */
/* World + robot state (the interface the simulator implements)               */
/* -------------------------------------------------------------------------- */

/** A cell key "x,y". */
type Cell = string
const cellKey = (x: number, y: number): Cell => `${x},${y}`

/** The grid world a program runs in. The full simulator will produce these. */
export type RobotWorld = {
  cols: number
  rows: number
  start: { x: number; y: number; dir: Dir }
  walls: Cell[]
  lines: Cell[]
  colors: Record<Cell, string>
  objects: Cell[]
  goal?: { x: number; y: number }
}

/** Facing direction: 0 up, 1 right, 2 down, 3 left. */
export type Dir = 0 | 1 | 2 | 3
const DELTA: Record<Dir, { dx: number; dy: number }> = {
  0: { dx: 0, dy: -1 },
  1: { dx: 1, dy: 0 },
  2: { dx: 0, dy: 1 },
  3: { dx: -1, dy: 0 },
}

/** The mutable robot state during execution. */
export type RobotState = {
  x: number
  y: number
  dir: Dir
  motorLeft: number
  motorRight: number
  vars: Record<string, number>
  log: number[]
  /** Objects the robot has counted/detected via a touch/over event. */
  reached: string[]
  done: boolean
  missionComplete: boolean
}

function initialState(world: RobotWorld): RobotState {
  return {
    x: world.start.x,
    y: world.start.y,
    dir: world.start.dir,
    motorLeft: 0,
    motorRight: 0,
    vars: {},
    log: [],
    reached: [],
    done: false,
    missionComplete: false,
  }
}

function inBounds(world: RobotWorld, x: number, y: number): boolean {
  return x >= 0 && y >= 0 && x < world.cols && y < world.rows
}
function isWall(world: RobotWorld, x: number, y: number): boolean {
  return world.walls.includes(cellKey(x, y))
}
function blocked(world: RobotWorld, x: number, y: number): boolean {
  return !inBounds(world, x, y) || isWall(world, x, y)
}

/* -------------------------------------------------------------------------- */
/* Sensors (read from the world at the current pose)                          */
/* -------------------------------------------------------------------------- */

/** Cells to the nearest wall/edge directly ahead (0 = wall right in front). */
export function readDistance(world: RobotWorld, s: RobotState): number {
  const { dx, dy } = DELTA[s.dir]
  let d = 0
  let x = s.x
  let y = s.y
  for (;;) {
    const nx = x + dx
    const ny = y + dy
    if (blocked(world, nx, ny)) return d
    d += 1
    x = nx
    y = ny
    if (d > world.cols + world.rows) return d // safety
  }
}
function touchPressed(world: RobotWorld, s: RobotState): boolean {
  const { dx, dy } = DELTA[s.dir]
  return blocked(world, s.x + dx, s.y + dy)
}
function onLine(world: RobotWorld, s: RobotState): boolean {
  return world.lines.includes(cellKey(s.x, s.y))
}
function colorHere(world: RobotWorld, s: RobotState): string {
  return world.colors[cellKey(s.x, s.y)] ?? "none"
}
/** Reflected light: a dark line reads low (20), plain floor reads high (80). */
export function readLight(world: RobotWorld, s: RobotState): number {
  return onLine(world, s) ? 20 : 80
}

/** All sensor readings at the current pose - for the live display and trace. */
export type SensorReadings = {
  distance: number
  touch: boolean
  onLine: boolean
  light: number
  color: string
}
export function readSensors(world: RobotWorld, s: RobotState): SensorReadings {
  return {
    distance: readDistance(world, s),
    touch: touchPressed(world, s),
    onLine: onLine(world, s),
    light: readLight(world, s),
    color: colorHere(world, s),
  }
}

/* -------------------------------------------------------------------------- */
/* Evaluation                                                                 */
/* -------------------------------------------------------------------------- */

function evalNumber(expr: NumberExpr, world: RobotWorld, s: RobotState): number {
  switch (expr.type) {
    case "num":
      return expr.value
    case "var":
      return s.vars[expr.name] ?? 0
    case "distance":
      return readDistance(world, s)
    case "light":
      return readLight(world, s)
  }
}

function evalBool(expr: BoolExpr, world: RobotWorld, s: RobotState): boolean {
  switch (expr.type) {
    case "compare": {
      const l = evalNumber(expr.left, world, s)
      const r = evalNumber(expr.right, world, s)
      switch (expr.op) {
        case "<":
          return l < r
        case ">":
          return l > r
        case "==":
          return l === r
        case "!=":
          return l !== r
        case "<=":
          return l <= r
        case ">=":
          return l >= r
      }
      return false
    }
    case "touch":
      return touchPressed(world, s)
    case "color":
      return colorHere(world, s) === expr.color
    case "onLine":
      return onLine(world, s)
    case "not":
      return !evalBool(expr.expr, world, s)
  }
}

/* -------------------------------------------------------------------------- */
/* Execution                                                                  */
/* -------------------------------------------------------------------------- */

/** Raised when a program exceeds its step budget (infinite-loop protection). */
export class ExecutionLimitError extends Error {
  constructor() {
    super("This program ran for too long. Check for a loop that never ends.")
    this.name = "ExecutionLimitError"
  }
}

/** One executed primitive, yielded so an editor can animate/step/pause. */
export type ExecEvent = {
  /** A snapshot of the robot after this step. */
  state: RobotState
  /** A short label of what happened, for logs/step view. */
  action: string
}

export type ExecResult = {
  state: RobotState
  steps: number
  /** True if it ended via safeStop/missionComplete or ran out of program. */
  completedNormally: boolean
}

export type ExecuteOptions = { maxSteps?: number }
export const DEFAULT_MAX_STEPS = 2000

/**
 * Execute a program against a world, yielding after each primitive so callers
 * can step/animate. Throws ExecutionLimitError past the step budget - so a
 * `forever` loop can never hang. Pure: it clones the world's start into fresh
 * state and never mutates the world.
 */
export function* execute(
  program: Program,
  world: RobotWorld,
  options: ExecuteOptions = {},
): Generator<ExecEvent, ExecResult, unknown> {
  const max = options.maxSteps ?? DEFAULT_MAX_STEPS
  const state = initialState(world)
  // Seed declared variables at 0.
  for (const name of program.variables) state.vars[name] = 0
  let steps = 0

  function bump(action: string): ExecEvent {
    steps += 1
    if (steps > max) throw new ExecutionLimitError()
    return { state: cloneState(state), action }
  }

  function turnBy(dir: "left" | "right", quarterTurns: number) {
    const sign = dir === "right" ? 1 : -1
    state.dir = (((state.dir + sign * quarterTurns) % 4) + 4) % 4 as Dir
  }

  function stepForward(dir: "forward" | "backward"): boolean {
    const facing = dir === "forward" ? state.dir : (((state.dir + 2) % 4) as Dir)
    const { dx, dy } = DELTA[facing]
    const nx = state.x + dx
    const ny = state.y + dy
    if (blocked(world, nx, ny)) return false
    state.x = nx
    state.y = ny
    if (world.objects.includes(cellKey(nx, ny)) && !state.reached.includes(cellKey(nx, ny))) {
      state.reached.push(cellKey(nx, ny))
    }
    return true
  }

  function* runBlock(stmts: Statement[]): Generator<ExecEvent, void, unknown> {
    for (const s of stmts) {
      if (state.done) return
      yield* runStmt(s)
    }
  }

  function* runStmt(s: Statement): Generator<ExecEvent, void, unknown> {
    if (state.done) return
    switch (s.type) {
      case "move": {
        for (let i = 0; i < Math.max(1, Math.round(s.distance)); i++) {
          if (!stepForward(s.direction)) {
            yield bump(`bump (${s.direction} blocked)`)
            break
          }
          yield bump(`move ${s.direction}`)
        }
        break
      }
      case "turn": {
        const quarters = Math.max(1, Math.round(Math.abs(s.angle) / 90))
        for (let i = 0; i < quarters; i++) {
          turnBy(s.direction, 1)
          yield bump(`turn ${s.direction}`)
        }
        break
      }
      case "setSpeed": {
        if (s.target === "both" || s.target === "left") state.motorLeft = s.speed
        if (s.target === "both" || s.target === "right") state.motorRight = s.speed
        yield bump(`set ${s.target} speed ${s.speed}`)
        break
      }
      case "stopMotors": {
        state.motorLeft = 0
        state.motorRight = 0
        yield bump("stop motors")
        break
      }
      case "moveForDuration": {
        // Grid model: cells driven scale with average motor speed and duration;
        // a speed difference curves the robot (left>right -> curves right).
        const avg = (state.motorLeft + state.motorRight) / 2
        const cells = Math.max(0, Math.round((avg / 100) * (s.ms / 500)))
        const curve = state.motorLeft - state.motorRight
        for (let i = 0; i < cells; i++) {
          if (curve > 0) turnBy("right", 1)
          else if (curve < 0) turnBy("left", 1)
          if (!stepForward(s.direction)) {
            yield bump("bump")
            break
          }
          yield bump(`drive ${s.direction}`)
        }
        if (cells === 0) yield bump("drive (no motion)")
        break
      }
      case "wait":
        yield bump(`wait ${s.ms}ms`)
        break
      case "safeStop":
        state.motorLeft = 0
        state.motorRight = 0
        state.done = true
        yield bump("safe stop")
        break
      case "missionComplete":
        state.missionComplete = true
        state.done = true
        yield bump("mission complete")
        break
      case "log":
        state.log.push(evalNumber(s.value, world, state))
        yield bump(`log ${state.log[state.log.length - 1]}`)
        break
      case "repeat": {
        const n = Math.max(0, Math.round(s.count))
        for (let i = 0; i < n; i++) {
          if (state.done) return
          yield* runBlock(s.body)
        }
        break
      }
      case "forever":
        for (;;) {
          if (state.done) return
          yield* runBlock(s.body)
          // A body with no primitive would spin: bump once to consume budget.
          if (s.body.length === 0) yield bump("forever (empty)")
        }
      case "repeatUntil":
        while (!evalBool(s.condition, world, state)) {
          if (state.done) return
          yield* runBlock(s.body)
          if (s.body.length === 0) yield bump("repeat-until (empty)")
        }
        break
      case "waitUntil":
        while (!evalBool(s.condition, world, state)) {
          yield bump("wait until")
        }
        break
      case "if":
        if (evalBool(s.condition, world, state)) yield* runBlock(s.body)
        break
      case "ifElse":
        if (evalBool(s.condition, world, state)) yield* runBlock(s.body)
        else yield* runBlock(s.elseBody)
        break
      case "setVar":
        state.vars[s.name] = evalNumber(s.value, world, state)
        yield bump(`set ${s.name}`)
        break
      case "changeVar":
        state.vars[s.name] = (state.vars[s.name] ?? 0) + evalNumber(s.by, world, state)
        yield bump(`change ${s.name}`)
        break
      case "resetCounter":
        state.vars[s.name] = 0
        yield bump(`reset ${s.name}`)
        break
    }
  }

  yield* runBlock(program.body)
  if (!state.done) {
    state.motorLeft = 0
    state.motorRight = 0
  }
  return { state, steps, completedNormally: true }
}

function cloneState(s: RobotState): RobotState {
  return {
    ...s,
    vars: { ...s.vars },
    log: [...s.log],
    reached: [...s.reached],
  }
}

/** Run a program to completion and return the final result (used by tests/validation). */
export function run(program: Program, world: RobotWorld, options: ExecuteOptions = {}): ExecResult {
  const gen = execute(program, world, options)
  let next = gen.next()
  while (!next.done) next = gen.next()
  return next.value
}

/* -------------------------------------------------------------------------- */
/* Serialization                                                              */
/* -------------------------------------------------------------------------- */

export function serializeProgram(program: Program): string {
  return JSON.stringify(program)
}

/**
 * Parse and structurally validate an untrusted program string/object. Returns a
 * clean Program, or null when it is malformed (never throws, never trusts shape).
 */
export function parseProgram(raw: unknown): Program | null {
  let data: unknown = raw
  if (typeof raw === "string") {
    try {
      data = JSON.parse(raw)
    } catch {
      return null
    }
  }
  if (!isObject(data)) return null
  if (!Array.isArray(data.body)) return null
  const variables = Array.isArray(data.variables)
    ? data.variables.filter((v): v is string => typeof v === "string")
    : []
  const body = parseStatements(data.body)
  if (body === null) return null
  return { version: ROBOTICS_PROGRAM_VERSION, variables, body }
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

function parseStatements(list: unknown): Statement[] | null {
  if (!Array.isArray(list)) return null
  const out: Statement[] = []
  for (const item of list) {
    const stmt = parseStatement(item)
    if (stmt === null) return null
    out.push(stmt)
  }
  return out
}

function num(v: unknown, fallback = 0): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback
}
function str(v: unknown): string {
  return typeof v === "string" ? v : ""
}

function parseNumberExpr(v: unknown): NumberExpr | null {
  if (!isObject(v)) return null
  switch (v.type) {
    case "num":
      return { type: "num", value: num(v.value) }
    case "var":
      return { type: "var", name: str(v.name) }
    case "distance":
      return { type: "distance" }
    case "light":
      return { type: "light" }
    default:
      return null
  }
}

const COMPARE_OPS = new Set(["<", ">", "==", "!=", "<=", ">="])
function parseBoolExpr(v: unknown): BoolExpr | null {
  if (!isObject(v)) return null
  switch (v.type) {
    case "compare": {
      const left = parseNumberExpr(v.left)
      const right = parseNumberExpr(v.right)
      if (!left || !right || !COMPARE_OPS.has(str(v.op))) return null
      return { type: "compare", op: str(v.op) as "<", left, right }
    }
    case "touch":
      return { type: "touch" }
    case "color":
      return { type: "color", color: str(v.color) }
    case "onLine":
      return { type: "onLine" }
    case "not": {
      const inner = parseBoolExpr(v.expr)
      return inner ? { type: "not", expr: inner } : null
    }
    default:
      return null
  }
}

function parseStatement(v: unknown): Statement | null {
  if (!isObject(v)) return null
  switch (v.type) {
    case "move":
      return { type: "move", direction: v.direction === "backward" ? "backward" : "forward", distance: num(v.distance, 1) }
    case "turn":
      return { type: "turn", direction: v.direction === "left" ? "left" : "right", angle: num(v.angle, 90) }
    case "setSpeed":
      return {
        type: "setSpeed",
        target: v.target === "left" || v.target === "right" ? v.target : "both",
        speed: num(v.speed, 50),
      }
    case "stopMotors":
      return { type: "stopMotors" }
    case "moveForDuration":
      return { type: "moveForDuration", direction: v.direction === "backward" ? "backward" : "forward", ms: num(v.ms, 1000) }
    case "wait":
      return { type: "wait", ms: num(v.ms, 500) }
    case "safeStop":
      return { type: "safeStop" }
    case "missionComplete":
      return { type: "missionComplete" }
    case "log": {
      const value = parseNumberExpr(v.value)
      return value ? { type: "log", value } : null
    }
    case "repeat": {
      const body = parseStatements(v.body)
      return body ? { type: "repeat", count: num(v.count, 1), body } : null
    }
    case "forever": {
      const body = parseStatements(v.body)
      return body ? { type: "forever", body } : null
    }
    case "repeatUntil": {
      const condition = parseBoolExpr(v.condition)
      const body = parseStatements(v.body)
      return condition && body ? { type: "repeatUntil", condition, body } : null
    }
    case "waitUntil": {
      const condition = parseBoolExpr(v.condition)
      return condition ? { type: "waitUntil", condition } : null
    }
    case "if": {
      const condition = parseBoolExpr(v.condition)
      const body = parseStatements(v.body)
      return condition && body ? { type: "if", condition, body } : null
    }
    case "ifElse": {
      const condition = parseBoolExpr(v.condition)
      const body = parseStatements(v.body)
      const elseBody = parseStatements(v.elseBody)
      return condition && body && elseBody ? { type: "ifElse", condition, body, elseBody } : null
    }
    case "setVar": {
      const value = parseNumberExpr(v.value)
      return value ? { type: "setVar", name: str(v.name), value } : null
    }
    case "changeVar": {
      const by = parseNumberExpr(v.by)
      return by ? { type: "changeVar", name: str(v.name), by } : null
    }
    case "resetCounter":
      return { type: "resetCounter", name: str(v.name) }
    default:
      return null
  }
}

/* -------------------------------------------------------------------------- */
/* Validation                                                                 */
/* -------------------------------------------------------------------------- */

export type ValidationIssue = {
  level: "error" | "warning"
  message: string
}

/** Walk every statement (depth-first), calling `fn` on each. */
export function walk(stmts: Statement[], fn: (s: Statement) => void): void {
  for (const s of stmts) {
    fn(s)
    if (s.type === "repeat" || s.type === "forever" || s.type === "repeatUntil" || s.type === "if") {
      walk(s.body, fn)
    } else if (s.type === "ifElse") {
      walk(s.body, fn)
      walk(s.elseBody, fn)
    }
  }
}

export function countStatements(program: Program): number {
  let n = 0
  walk(program.body, () => (n += 1))
  return n
}

/**
 * Static validation with specific, teachable feedback - it points at problems
 * but never hands over the whole solution.
 */
export function validateProgram(program: Program): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const all: Statement[] = []
  walk(program.body, (s) => all.push(s))

  if (all.length === 0) {
    issues.push({ level: "error", message: "The program is empty. Add some blocks to tell the robot what to do." })
  }

  // A `forever` loop with no exit and no safe stop inside will never end.
  walk(program.body, (s) => {
    if (s.type === "forever") {
      let hasStop = false
      walk(s.body, (inner) => {
        if (inner.type === "safeStop" || inner.type === "missionComplete") hasStop = true
      })
      if (!hasStop) {
        issues.push({
          level: "warning",
          message: "A forever loop has no safe stop inside it, so the robot never reaches the blocks after it. Add a stop when the job is done.",
        })
      }
    }
  })

  // No safe stopping behavior anywhere.
  const hasSafeStop = all.some((s) => s.type === "safeStop" || s.type === "missionComplete" || s.type === "stopMotors")
  if (all.length > 0 && !hasSafeStop) {
    issues.push({
      level: "warning",
      message: "This program has no safe stop behavior. Add a safe stop so the robot stops when it is done or blocked.",
    })
  }

  // Unequal motor speeds -> the robot curves.
  const speeds = all.filter((s): s is Extract<Statement, { type: "setSpeed" }> => s.type === "setSpeed")
  let left: number | undefined
  let right: number | undefined
  for (const s of speeds) {
    if (s.target === "both") {
      left = s.speed
      right = s.speed
    } else if (s.target === "left") left = s.speed
    else if (s.target === "right") right = s.speed
  }
  if (left !== undefined && right !== undefined && left !== right) {
    issues.push({
      level: "warning",
      message: "Both motors have different speeds, so the robot will curve instead of driving straight. Match the speeds to go straight.",
    })
  }

  // A counter that is changed but never reset.
  const changed = new Set<string>()
  const reset = new Set<string>()
  const set = new Set<string>()
  for (const s of all) {
    if (s.type === "changeVar") changed.add(s.name)
    if (s.type === "resetCounter") reset.add(s.name)
    if (s.type === "setVar") set.add(s.name)
  }
  for (const name of changed) {
    if (!reset.has(name) && !set.has(name)) {
      issues.push({
        level: "warning",
        message: `The counter "${name}" is changed but never reset or set to a start value. Reset it before you count.`,
      })
    }
  }

  // A distance-threshold compare that looks reversed (obstacle avoidance usually
  // reacts when distance is SMALL). Heuristic hint, not an error.
  walk(program.body, (s) => {
    if (s.type === "if" || s.type === "ifElse" || s.type === "repeatUntil") {
      const c = s.condition
      if (c.type === "compare" && c.left.type === "distance" && c.right.type === "num") {
        if (c.op === ">" && c.right.value <= 2) {
          issues.push({
            level: "warning",
            message: "The sensor threshold may be reversed: to react to a close obstacle, check whether distance is LESS than the threshold, not greater.",
          })
        }
      }
    }
  })

  // safeStop / missionComplete that sits at the top level after a forever loop is
  // unreachable (already covered), but also flag a stop placed outside any
  // condition/loop when the program otherwise loops forever first.
  const topLevelForeverIndex = program.body.findIndex((s) => s.type === "forever")
  if (topLevelForeverIndex >= 0) {
    const after = program.body.slice(topLevelForeverIndex + 1)
    if (after.some((s) => s.type === "safeStop" || s.type === "missionComplete")) {
      issues.push({
        level: "warning",
        message: "The stop command is after a forever loop, so it is outside the loop and never runs. Move the stop inside the loop where the condition is checked.",
      })
    }
  }

  return issues
}

export function programErrors(program: Program): ValidationIssue[] {
  return validateProgram(program).filter((i) => i.level === "error")
}
export function canRun(program: Program): boolean {
  return programErrors(program).length === 0
}

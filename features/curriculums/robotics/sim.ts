/**
 * Robot simulator engine: runs a typed program against a mission world, records
 * a full trace (poses, collisions, sensor readings), and derives specific,
 * likely-cause feedback plus a saveable result record. Pure and framework-free,
 * so it is deterministic and fully unit-testable; the simulator component is a
 * thin visual layer over this.
 *
 * Feedback rules inspect the actual run (not just the block text) and point at a
 * probable cause without handing over the whole solution.
 */

import {
  DEFAULT_MAX_STEPS,
  ExecutionLimitError,
  execute,
  readSensors,
  walk,
  type BoolExpr,
  type Dir,
  type Program,
  type RobotState,
  type RobotWorld,
  type SensorReadings,
  type Statement,
} from "./program.ts"
import { validateMission, type Mission } from "./missions.ts"

/** Simulated time per executed step (deterministic; used for mission time). */
export const SIM_TICK_MS = 200

export type SimFrame = {
  x: number
  y: number
  dir: Dir
  action: string
  sensors: SensorReadings
}

export type SimTrace = {
  frames: SimFrame[]
  collisions: number
  collisionCells: string[]
  visitedGoal: boolean
  /** Frames where a sensor was "active" (touch pressed or over a line). */
  sensorEvents: number
  finalState: RobotState
  steps: number
  ranTooLong: boolean
  missionTimeMs: number
}

const key = (x: number, y: number) => `${x},${y}`

/**
 * Run a program against a world and capture a full trace. Safe against endless
 * loops (the interpreter caps steps and we mark `ranTooLong`). Deterministic:
 * the same program + world always produces the same trace.
 */
export function traceRun(program: Program, world: RobotWorld, maxSteps: number = DEFAULT_MAX_STEPS): SimTrace {
  const frames: SimFrame[] = []
  const collisionCells: string[] = []
  let collisions = 0
  let sensorEvents = 0
  let visitedGoal = false
  let ranTooLong = false
  let last: RobotState = { x: world.start.x, y: world.start.y, dir: world.start.dir, motorLeft: 0, motorRight: 0, vars: {}, log: [], reached: [], done: false, missionComplete: false }

  const gen = execute(program, world, { maxSteps })
  try {
    let next = gen.next()
    while (!next.done) {
      const ev = next.value
      last = ev.state
      const sensors = readSensors(world, ev.state)
      frames.push({ x: ev.state.x, y: ev.state.y, dir: ev.state.dir, action: ev.action, sensors })
      if (ev.action.startsWith("bump")) {
        collisions += 1
        collisionCells.push(key(ev.state.x, ev.state.y))
      }
      if (sensors.touch || sensors.onLine) sensorEvents += 1
      if (world.goal && ev.state.x === world.goal.x && ev.state.y === world.goal.y) visitedGoal = true
      next = gen.next()
    }
    last = next.value.state
  } catch (error) {
    if (error instanceof ExecutionLimitError) ranTooLong = true
    else throw error
  }

  return {
    frames,
    collisions,
    collisionCells,
    visitedGoal,
    sensorEvents,
    finalState: last,
    steps: frames.length,
    ranTooLong,
    missionTimeMs: frames.length * SIM_TICK_MS,
  }
}

/* -------------------------------------------------------------------------- */
/* Behavioural feedback                                                       */
/* -------------------------------------------------------------------------- */

/**
 * A stable id for one piece of run feedback. The simulator stays pure and
 * language-independent; the block editor maps these to
 * `t.courseUi.robotics.editor` for display.
 */
export type SimFeedbackId =
  | "ranTooLong"
  | "crossedZone"
  | "thresholdLate"
  | "stopAfterMove"
  | "motorsCurve"
  | "lineNoSteer"
  | "countedTwice"
  | "didNotReachZone"

export type SimFeedback = { level: "info" | "warning"; message: SimFeedbackId }

function collect(program: Program): Statement[] {
  const all: Statement[] = []
  walk(program.body, (s) => all.push(s))
  return all
}

function conditionUsesDistance(c: BoolExpr): boolean {
  if (c.type === "compare") return c.left.type === "distance" || c.right.type === "distance"
  if (c.type === "not") return conditionUsesDistance(c.expr)
  return false
}

function usesDistanceCondition(program: Program): boolean {
  let found = false
  walk(program.body, (s) => {
    if ((s.type === "if" || s.type === "ifElse" || s.type === "repeatUntil") && conditionUsesDistance(s.condition)) {
      found = true
    }
  })
  return found
}

/** True when the top level has a movement block immediately followed by a stop. */
function moveThenStopAtTop(program: Program): boolean {
  const body = program.body
  for (let i = 0; i < body.length - 1; i++) {
    const a = body[i]
    const b = body[i + 1]
    const isMove = a.type === "move" || a.type === "moveForDuration"
    const isStop = b.type === "safeStop" || b.type === "stopMotors"
    if (isMove && isStop) return true
  }
  return false
}

function speedMismatch(program: Program): boolean {
  let left: number | undefined
  let right: number | undefined
  for (const s of collect(program)) {
    if (s.type === "setSpeed") {
      if (s.target === "both") {
        left = s.speed
        right = s.speed
      } else if (s.target === "left") left = s.speed
      else if (s.target === "right") right = s.speed
    }
  }
  return left !== undefined && right !== undefined && left !== right
}

function redMarkerCount(world: RobotWorld): number {
  return Object.values(world.colors).filter((c) => c === "red").length
}

/**
 * Likely-cause feedback for a run, shown only when the mission was NOT passed.
 * Each rule looks at the trace and/or the program shape and points at a probable
 * cause - it never reveals the full solution.
 */
export function feedbackFor(trace: SimTrace, program: Program, mission: Mission, passed: boolean): SimFeedback[] {
  const out: SimFeedback[] = []
  const world = mission.world
  const s = trace.finalState

  if (trace.ranTooLong) {
    out.push({ level: "warning", message: "ranTooLong" })
    return out
  }
  if (passed) return out

  // Crossed the goal/delivery zone then ended elsewhere.
  if (world.goal && trace.visitedGoal && (s.x !== world.goal.x || s.y !== world.goal.y)) {
    out.push({ level: "warning", message: "crossedZone" })
  }

  // Hit an obstacle despite having a distance check -> reacted too late.
  if (trace.collisions > 0 && usesDistanceCondition(program)) {
    out.push({ level: "warning", message: "thresholdLate" })
  }

  // Move-then-stop at the top level and a collision -> stop ran after the move.
  if (trace.collisions > 0 && moveThenStopAtTop(program)) {
    out.push({ level: "warning", message: "stopAfterMove" })
  }

  // Mismatched motor speeds -> the robot curves.
  if (speedMismatch(program)) {
    out.push({ level: "warning", message: "motorsCurve" })
  }

  // Line-following: saw the line but never turned.
  if (mission.id === "line-following") {
    const sawLine = trace.frames.some((f) => f.sensors.onLine)
    const dirs = new Set(trace.frames.map((f) => f.dir))
    if (sawLine && dirs.size <= 1) {
      out.push({ level: "warning", message: "lineNoSteer" })
    }
  }

  // Counting: a counter went higher than the number of markers.
  if (mission.id === "counting") {
    const markers = redMarkerCount(world)
    const overCounted = Object.values(s.vars).some((v) => v > markers)
    if (overCounted) {
      out.push({ level: "warning", message: "countedTwice" })
    }
  }

  // No collision, no goal reached, nothing specific -> a gentle general nudge.
  if (out.length === 0 && world.goal && (s.x !== world.goal.x || s.y !== world.goal.y)) {
    out.push({ level: "info", message: "didNotReachZone" })
  }

  return out
}

/* -------------------------------------------------------------------------- */
/* Mission run + result record                                                */
/* -------------------------------------------------------------------------- */

export type MissionRunOutcome = {
  passed: boolean
  ranTooLong: boolean
  checks: Array<{ id: string; label: string; passed: boolean }>
  feedback: SimFeedback[]
  trace: SimTrace
}

/** Run a mission: trace + pass/fail checks + likely-cause feedback in one call. */
export function runMission(program: Program, mission: Mission): MissionRunOutcome {
  const trace = traceRun(program, mission.world)
  const validation = validateMission(program, mission)
  const feedback = feedbackFor(trace, program, mission, validation.passed)
  return { passed: validation.passed, ranTooLong: trace.ranTooLong, checks: validation.checks, feedback, trace }
}

/** The saveable record of one simulator attempt. */
export type SimResultRecord = {
  missionId: string
  specId: string
  success: boolean
  trial: number
  steps: number
  missionTimeMs: number
  collisions: number
  sensorEvents: number
  finalX: number
  finalY: number
  programRevision: number
  ranTooLong: boolean
  notes: string
  revisionMade: string
}

export function buildResultRecord(args: {
  mission: Mission
  specId: string
  outcome: MissionRunOutcome
  trial: number
  programRevision: number
  notes?: string
  revisionMade?: string
}): SimResultRecord {
  const { mission, specId, outcome, trial, programRevision } = args
  return {
    missionId: mission.id,
    specId,
    success: outcome.passed,
    trial,
    steps: outcome.trace.steps,
    missionTimeMs: outcome.trace.missionTimeMs,
    collisions: outcome.trace.collisions,
    sensorEvents: outcome.trace.sensorEvents,
    finalX: outcome.trace.finalState.x,
    finalY: outcome.trace.finalState.y,
    programRevision,
    ranTooLong: outcome.ranTooLong,
    notes: args.notes ?? "",
    revisionMade: args.revisionMade ?? "",
  }
}

/* -------------------------------------------------------------------------- */
/* Accessibility: text descriptions of the world + state                      */
/* -------------------------------------------------------------------------- */

/**
 * Strings the accessibility describers need. Passing them in keeps this module
 * pure and free of any dependency on the translations barrel.
 */
export type SimDescribeStrings = {
  dirUp: string
  dirRight: string
  dirDown: string
  dirLeft: string
  gridSize: string
  startsAt: string
  goalAt: string
  oneWall: string
  manyWalls: string
  lineAcross: string
  oneMarker: string
  manyMarkers: string
  robotAt: string
  distanceAhead: string
  cell: string
  cells: string
  touchPressed: string
  touchClear: string
  overLineYes: string
  overLineNo: string
  lightIs: string
  inGoalZone: string
  notInGoalZone: string
}

const dirWords = (d: SimDescribeStrings): Record<Dir, string> => ({
  0: d.dirUp,
  1: d.dirRight,
  2: d.dirDown,
  3: d.dirLeft,
})

/** A plain-text description of the mission map, for screen readers. */
export function describeWorld(world: RobotWorld, d: SimDescribeStrings): string {
  const DIR = dirWords(d)
  const parts: string[] = [
    d.gridSize.replace("{cols}", String(world.cols)).replace("{rows}", String(world.rows)),
  ]
  parts.push(
    d.startsAt
      .replace("{col}", String(world.start.x + 1))
      .replace("{row}", String(world.start.y + 1))
      .replace("{dir}", DIR[world.start.dir]),
  )
  if (world.goal) {
    parts.push(
      d.goalAt.replace("{col}", String(world.goal.x + 1)).replace("{row}", String(world.goal.y + 1)),
    )
  }
  if (world.walls.length) {
    parts.push(
      world.walls.length === 1 ? d.oneWall : d.manyWalls.replace("{n}", String(world.walls.length)),
    )
  }
  if (world.lines.length) parts.push(d.lineAcross.replace("{n}", String(world.lines.length)))
  const markers = Object.keys(world.colors).length
  if (markers) {
    parts.push(markers === 1 ? d.oneMarker : d.manyMarkers.replace("{n}", String(markers)))
  }
  return parts.join(" ")
}

/** A live, structured text summary of the robot + sensors, for screen readers. */
export function describeState(world: RobotWorld, state: RobotState, d: SimDescribeStrings): string {
  const DIR = dirWords(d)
  const sensors = readSensors(world, state)
  const bits = [
    d.robotAt
      .replace("{col}", String(state.x + 1))
      .replace("{row}", String(state.y + 1))
      .replace("{dir}", DIR[state.dir]),
    d.distanceAhead
      .replace("{n}", String(sensors.distance))
      .replace("{unit}", sensors.distance === 1 ? d.cell : d.cells),
    sensors.touch ? d.touchPressed : d.touchClear,
    sensors.onLine ? d.overLineYes : d.overLineNo,
    d.lightIs.replace("{n}", String(sensors.light)),
  ]
  if (world.goal) {
    const atGoal = state.x === world.goal.x && state.y === world.goal.y
    bits.push(atGoal ? d.inGoalZone : d.notInGoalZone)
  }
  return bits.join(" ")
}

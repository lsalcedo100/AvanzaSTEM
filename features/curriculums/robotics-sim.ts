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
} from "./robotics-program.ts"
import { validateMission, type Mission } from "./robotics-missions.ts"

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

export type SimFeedback = { level: "info" | "warning"; message: string }

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
    out.push({ level: "warning", message: "The program ran for too long - check for a loop that never ends, or add a safe stop." })
    return out
  }
  if (passed) return out

  // Crossed the goal/delivery zone then ended elsewhere.
  if (world.goal && trace.visitedGoal && (s.x !== world.goal.x || s.y !== world.goal.y)) {
    out.push({ level: "warning", message: "The robot stopped after crossing the delivery zone. Add a stop as soon as it reaches the zone." })
  }

  // Hit an obstacle despite having a distance check -> reacted too late.
  if (trace.collisions > 0 && usesDistanceCondition(program)) {
    out.push({ level: "warning", message: "The distance threshold triggered too late at the current speed. Try reacting when the distance is a little larger." })
  }

  // Move-then-stop at the top level and a collision -> stop ran after the move.
  if (trace.collisions > 0 && moveThenStopAtTop(program)) {
    out.push({ level: "warning", message: "The robot touched the obstacle because the stop command ran after the movement command. Check the sensor before moving." })
  }

  // Mismatched motor speeds -> the robot curves.
  if (speedMismatch(program)) {
    out.push({ level: "warning", message: "The left and right motor speeds caused the robot to curve. Match the speeds to drive straight." })
  }

  // Line-following: saw the line but never turned.
  if (mission.id === "line-following") {
    const sawLine = trace.frames.some((f) => f.sensors.onLine)
    const dirs = new Set(trace.frames.map((f) => f.dir))
    if (sawLine && dirs.size <= 1) {
      out.push({ level: "warning", message: "The robot detected the line but your condition did not change its direction. Use the sensor to steer." })
    }
  }

  // Counting: a counter went higher than the number of markers.
  if (mission.id === "counting") {
    const markers = redMarkerCount(world)
    const overCounted = Object.values(s.vars).some((v) => v > markers)
    if (overCounted) {
      out.push({ level: "warning", message: "The counter increased several times for the same object. Only count once each time you first detect it." })
    }
  }

  // No collision, no goal reached, nothing specific -> a gentle general nudge.
  if (out.length === 0 && world.goal && (s.x !== world.goal.x || s.y !== world.goal.y)) {
    out.push({ level: "info", message: "The robot did not reach the zone. Check each check below and adjust one thing at a time." })
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

const DIR_WORDS: Record<Dir, string> = { 0: "up", 1: "right", 2: "down", 3: "left" }

/** A plain-text description of the mission map, for screen readers. */
export function describeWorld(world: RobotWorld): string {
  const parts: string[] = [`A ${world.cols} by ${world.rows} grid.`]
  parts.push(`The robot starts at column ${world.start.x + 1}, row ${world.start.y + 1}, facing ${DIR_WORDS[world.start.dir]}.`)
  if (world.goal) parts.push(`The goal zone is at column ${world.goal.x + 1}, row ${world.goal.y + 1}.`)
  if (world.walls.length) parts.push(`There ${world.walls.length === 1 ? "is 1 wall" : `are ${world.walls.length} walls`}.`)
  if (world.lines.length) parts.push(`A line runs across ${world.lines.length} cells.`)
  const markers = Object.keys(world.colors).length
  if (markers) parts.push(`There ${markers === 1 ? "is 1 coloured marker" : `are ${markers} coloured markers`}.`)
  return parts.join(" ")
}

/** A live, structured text summary of the robot + sensors, for screen readers. */
export function describeState(world: RobotWorld, state: RobotState): string {
  const sensors = readSensors(world, state)
  const bits = [
    `Robot at column ${state.x + 1}, row ${state.y + 1}, facing ${DIR_WORDS[state.dir]}.`,
    `Distance ahead: ${sensors.distance} cell${sensors.distance === 1 ? "" : "s"}.`,
    `Touch: ${sensors.touch ? "pressed" : "clear"}.`,
    `Over a line: ${sensors.onLine ? "yes" : "no"}.`,
    `Light: ${sensors.light}.`,
  ]
  if (world.goal) {
    const atGoal = state.x === world.goal.x && state.y === world.goal.y
    bits.push(atGoal ? "In the goal zone." : "Not in the goal zone.")
  }
  return bits.join(" ")
}

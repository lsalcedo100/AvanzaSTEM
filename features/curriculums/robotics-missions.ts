/**
 * Robotics simulator missions: the grid worlds, starter programs, worked example
 * programs, and behaviour-inspecting success checks for each challenge type
 * (timed delivery, maze, obstacle detection, obstacle avoidance, line following,
 * counting, stop-in-zone, and a final-project mission).
 *
 * Every `example` is a real, passing solution (the tests run each one and assert
 * it satisfies the mission), and every `starter` is an incomplete beginning the
 * editor loads and can reset to. Challenge validation runs the student's program
 * in the interpreter and inspects the resulting robot behaviour - it never just
 * checks the block text.
 */

import {
  emptyProgram,
  run,
  walk,
  type ExecResult,
  type Program,
  type RobotWorld,
  type Statement,
} from "./robotics-program.ts"

export type MissionKind =
  | "timed-delivery"
  | "maze"
  | "obstacle-detection"
  | "debug-stopper"
  | "obstacle-avoidance"
  | "line-following"
  | "counting"
  | "stop-in-zone"
  | "autonomous-mission"
  | "final-project"

export type MissionCheck = {
  id: string
  label: string
  /** Passes by inspecting the run result and/or the program structure. */
  check: (result: ExecResult, program: Program, world: RobotWorld) => boolean
}

export type Mission = {
  id: MissionKind
  title: string
  description: string
  world: RobotWorld
  starter: Program
  example: Program
  checks: MissionCheck[]
}

/* -------------------------------------------------------------------------- */
/* Small builders                                                             */
/* -------------------------------------------------------------------------- */

const P = (...body: Statement[]): Program => ({ version: 1, variables: [], body })
const PV = (variables: string[], ...body: Statement[]): Program => ({ version: 1, variables, body })

const fwd = (distance = 1): Statement => ({ type: "move", direction: "forward", distance })
const turn = (direction: "left" | "right", angle = 90): Statement => ({ type: "turn", direction, angle })
const safeStop = (): Statement => ({ type: "safeStop" })
const missionComplete = (): Statement => ({ type: "missionComplete" })

/** Program-structure predicates, used inside behaviour checks. */
function usesKind(program: Program, kind: Statement["type"]): boolean {
  let found = false
  walk(program.body, (s) => {
    if (s.type === kind) found = true
  })
  return found
}
function usesLoop(program: Program): boolean {
  return usesKind(program, "repeat") || usesKind(program, "forever") || usesKind(program, "repeatUntil")
}
function usesCondition(program: Program): boolean {
  return usesKind(program, "if") || usesKind(program, "ifElse") || usesKind(program, "repeatUntil") || usesKind(program, "waitUntil")
}
function stoppedSafely(result: ExecResult): boolean {
  return result.state.done && result.state.motorLeft === 0 && result.state.motorRight === 0
}
function atGoal(result: ExecResult, world: RobotWorld): boolean {
  return !!world.goal && result.state.x === world.goal.x && result.state.y === world.goal.y
}

/* -------------------------------------------------------------------------- */
/* Missions                                                                   */
/* -------------------------------------------------------------------------- */

export const MISSIONS: Record<MissionKind, Mission> = {
  "timed-delivery": {
    id: "timed-delivery",
    title: "Timed delivery",
    description: "Drive straight to the drop-off zone and stop there safely.",
    world: { cols: 5, rows: 1, start: { x: 0, y: 0, dir: 1 }, walls: [], lines: [], colors: {}, objects: [], goal: { x: 4, y: 0 } },
    starter: P(fwd(1)),
    example: P(fwd(4), safeStop()),
    checks: [
      { id: "reach", label: "Reaches the drop-off zone", check: (r, _p, w) => atGoal(r, w) },
      { id: "stop", label: "Stops safely at the end", check: (r) => stoppedSafely(r) },
    ],
  },

  maze: {
    id: "maze",
    title: "Maze navigation",
    description: "Turn through the course to reach the goal.",
    world: { cols: 3, rows: 3, start: { x: 0, y: 0, dir: 1 }, walls: ["1,0"], lines: [], colors: {}, objects: [], goal: { x: 2, y: 2 } },
    starter: P(fwd(1)),
    // (0,0) blocked ahead -> go down, right x2, up... simplest: down 2, right 2, up 0 -> (2,2)
    example: P(turn("right"), fwd(2), turn("left"), fwd(2), safeStop()),
    checks: [
      { id: "reach", label: "Reaches the goal", check: (r, _p, w) => atGoal(r, w) },
      { id: "stop", label: "Stops safely", check: (r) => stoppedSafely(r) },
    ],
  },

  "obstacle-detection": {
    id: "obstacle-detection",
    title: "Obstacle detection",
    description: "Drive forward and stop right before the wall.",
    world: { cols: 4, rows: 1, start: { x: 0, y: 0, dir: 1 }, walls: ["3,0"], lines: [], colors: {}, objects: [], goal: { x: 2, y: 0 } },
    starter: P(fwd(1)),
    example: P({ type: "repeatUntil", condition: { type: "compare", op: "==", left: { type: "distance" }, right: { type: "num", value: 0 } }, body: [fwd(1)] }, missionComplete()),
    checks: [
      { id: "stopBefore", label: "Stops in the cell right before the wall", check: (r) => r.state.x === 2 },
      { id: "signal", label: "Signals mission complete", check: (r) => r.state.missionComplete },
      { id: "usesSensor", label: "Uses the distance sensor", check: (_r, p) => usesKind(p, "repeatUntil") },
    ],
  },

  "debug-stopper": {
    id: "debug-stopper",
    title: "Fix the broken stopper",
    description: "This robot is supposed to stop right before the wall, but a wrong value in its distance check makes it stop in the wrong place. Diagnose it, change the one value, and re-run.",
    world: { cols: 5, rows: 1, start: { x: 0, y: 0, dir: 1 }, walls: ["4,0"], lines: [], colors: {}, objects: [], goal: { x: 3, y: 0 } },
    // Broken on purpose: the threshold is 1 instead of 0, so it stops one cell
    // too early (at x=2) and never reaches the square before the wall.
    starter: P({ type: "repeatUntil", condition: { type: "compare", op: "==", left: { type: "distance" }, right: { type: "num", value: 1 } }, body: [fwd(1)] }, missionComplete()),
    // Fixed: stop when the distance reads 0 (the square right before the wall).
    example: P({ type: "repeatUntil", condition: { type: "compare", op: "==", left: { type: "distance" }, right: { type: "num", value: 0 } }, body: [fwd(1)] }, missionComplete()),
    checks: [
      { id: "stopBefore", label: "Stops in the square right before the wall", check: (r, _p, w) => atGoal(r, w) },
      { id: "signal", label: "Signals mission complete", check: (r) => r.state.missionComplete },
      { id: "usesSensor", label: "Still uses the distance sensor to decide", check: (_r, p) => usesKind(p, "repeatUntil") },
    ],
  },

  "obstacle-avoidance": {
    id: "obstacle-avoidance",
    title: "Obstacle avoidance",
    description: "A wall blocks the direct path - detect it and drive around to the goal.",
    world: { cols: 3, rows: 2, start: { x: 0, y: 0, dir: 1 }, walls: ["1,0"], lines: [], colors: {}, objects: [], goal: { x: 2, y: 0 } },
    starter: P(fwd(2)),
    // touch ahead at (1,0): down, right x2, up -> (2,0)
    example: P(
      {
        type: "if",
        condition: { type: "touch" },
        body: [turn("right"), fwd(1), turn("left"), fwd(2), turn("left"), fwd(1), safeStop()],
      },
    ),
    checks: [
      { id: "reach", label: "Reaches the goal around the wall", check: (r, _p, w) => atGoal(r, w) },
      { id: "usesCondition", label: "Uses a sensor condition", check: (_r, p) => usesCondition(p) },
      { id: "stop", label: "Stops safely", check: (r) => stoppedSafely(r) },
    ],
  },

  "line-following": {
    id: "line-following",
    title: "Line following",
    description: "Follow the line to the end using the light sensor.",
    world: {
      cols: 5,
      rows: 1,
      start: { x: 0, y: 0, dir: 1 },
      walls: [],
      lines: ["0,0", "1,0", "2,0", "3,0", "4,0"],
      colors: {},
      objects: [],
      goal: { x: 4, y: 0 },
    },
    starter: P(fwd(1)),
    example: P(
      {
        type: "repeatUntil",
        condition: { type: "compare", op: "==", left: { type: "distance" }, right: { type: "num", value: 0 } },
        body: [
          {
            type: "ifElse",
            condition: { type: "compare", op: "<", left: { type: "light" }, right: { type: "num", value: 50 } },
            body: [fwd(1)],
            elseBody: [safeStop()],
          },
        ],
      },
      safeStop(),
    ),
    checks: [
      { id: "reach", label: "Reaches the end of the line", check: (r, _p, w) => atGoal(r, w) },
      { id: "onLine", label: "Ends on the line", check: (r, _p, w) => w.lines.includes(`${r.state.x},${r.state.y}`) },
      { id: "usesLight", label: "Uses the light sensor", check: (_r, p) => programUsesLight(p) },
    ],
  },

  counting: {
    id: "counting",
    title: "Count the markers",
    description: "Drive to the end and count the red markers you pass.",
    world: {
      cols: 6,
      rows: 1,
      start: { x: 0, y: 0, dir: 1 },
      walls: [],
      lines: [],
      colors: { "1,0": "red", "3,0": "red", "5,0": "red" },
      objects: [],
      goal: { x: 5, y: 0 },
    },
    starter: PV(["count"], { type: "resetCounter", name: "count" }, fwd(5)),
    example: PV(
      ["count"],
      { type: "resetCounter", name: "count" },
      {
        type: "repeatUntil",
        condition: { type: "compare", op: "==", left: { type: "distance" }, right: { type: "num", value: 0 } },
        body: [
          fwd(1),
          { type: "if", condition: { type: "color", color: "red" }, body: [{ type: "changeVar", name: "count", by: { type: "num", value: 1 } }] },
        ],
      },
      { type: "log", value: { type: "var", name: "count" } },
      safeStop(),
    ),
    checks: [
      { id: "count", label: "Counts all three markers", check: (r) => r.state.vars.count === 3 },
      { id: "reach", label: "Reaches the end", check: (r, _p, w) => atGoal(r, w) },
      { id: "usesCounter", label: "Uses a counter", check: (_r, p) => usesKind(p, "changeVar") },
    ],
  },

  "stop-in-zone": {
    id: "stop-in-zone",
    title: "Stop in the zone",
    description: "Stop exactly inside the marked zone - not past it.",
    world: { cols: 5, rows: 1, start: { x: 0, y: 0, dir: 1 }, walls: [], lines: [], colors: {}, objects: [], goal: { x: 3, y: 0 } },
    starter: P(fwd(5)),
    example: P(fwd(3), safeStop()),
    checks: [
      { id: "inZone", label: "Stops inside the zone", check: (r, _p, w) => atGoal(r, w) },
      { id: "stop", label: "Stops safely", check: (r) => stoppedSafely(r) },
    ],
  },

  "autonomous-mission": {
    id: "autonomous-mission",
    title: "Autonomous mission",
    description: "Drive on your own: sense the obstacle, go around it, reach the zone, and stop safely.",
    world: { cols: 4, rows: 3, start: { x: 0, y: 1, dir: 1 }, walls: ["2,1"], lines: [], colors: {}, objects: [], goal: { x: 3, y: 1 } },
    starter: P(fwd(1)),
    example: P(
      {
        type: "repeatUntil",
        condition: { type: "touch" },
        body: [fwd(1)],
      },
      turn("left"),
      fwd(1),
      turn("right"),
      fwd(2),
      turn("right"),
      fwd(1),
      safeStop(),
    ),
    checks: [
      { id: "reach", label: "Reaches the mission zone", check: (r, _p, w) => atGoal(r, w) },
      { id: "loop", label: "Uses a loop to drive", check: (_r, p) => usesLoop(p) },
      { id: "condition", label: "Reacts to a sensor", check: (_r, p) => usesCondition(p) },
      { id: "stop", label: "Stops safely at the zone", check: (r) => stoppedSafely(r) },
    ],
  },

  "final-project": {
    id: "final-project",
    title: "Final mission",
    description: "Use a loop, a sensor condition, and a safe stop to reach the goal.",
    world: { cols: 5, rows: 1, start: { x: 0, y: 0, dir: 1 }, walls: [], lines: [], colors: {}, objects: [], goal: { x: 4, y: 0 } },
    starter: P(fwd(1)),
    example: P(
      {
        type: "repeatUntil",
        condition: { type: "compare", op: "==", left: { type: "distance" }, right: { type: "num", value: 0 } },
        body: [fwd(1)],
      },
      safeStop(),
    ),
    checks: [
      { id: "reach", label: "Reaches the goal", check: (r, _p, w) => atGoal(r, w) },
      { id: "loop", label: "Uses a loop", check: (_r, p) => usesLoop(p) },
      { id: "condition", label: "Uses a condition", check: (_r, p) => usesCondition(p) },
      { id: "stop", label: "Has a safe stop", check: (r) => stoppedSafely(r) },
    ],
  },
}

function programUsesLight(program: Program): boolean {
  let found = false
  const scan = (s: Statement) => {
    if ((s.type === "if" || s.type === "ifElse" || s.type === "repeatUntil") && condHasLight(s.condition)) found = true
  }
  walk(program.body, scan)
  return found
}
function condHasLight(c: import("./robotics-program.ts").BoolExpr): boolean {
  if (c.type === "compare") return c.left.type === "light" || c.right.type === "light"
  if (c.type === "not") return condHasLight(c.expr)
  return false
}

/** Look up a mission by kind. */
export function getMission(kind: MissionKind): Mission {
  return MISSIONS[kind]
}

export type MissionResult = {
  passed: boolean
  checks: Array<{ id: string; label: string; passed: boolean }>
  /** True if the program hit the step budget (likely an endless loop). */
  ranTooLong: boolean
}

/**
 * Run a student's program against a mission and report which behaviour checks
 * passed. Safe against endless loops (the interpreter caps steps).
 */
export function validateMission(program: Program, mission: Mission): MissionResult {
  let result: ExecResult | null = null
  let ranTooLong = false
  try {
    result = run(program, mission.world)
  } catch {
    ranTooLong = true
  }
  if (!result) {
    return { passed: false, ranTooLong, checks: mission.checks.map((c) => ({ id: c.id, label: c.label, passed: false })) }
  }
  const checks = mission.checks.map((c) => ({ id: c.id, label: c.label, passed: c.check(result!, program, mission.world) }))
  return { passed: checks.every((c) => c.passed), ranTooLong, checks }
}

/** A fresh, empty program for the editor's blank state. */
export { emptyProgram }

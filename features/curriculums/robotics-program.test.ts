// Tests for the block-programming model: serialization, validation, execution
// (movement, loops, conditions, sensors, variables, counters, safe stopping),
// infinite-loop protection, and the challenge missions.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import {
  DEFAULT_MAX_STEPS,
  ExecutionLimitError,
  canRun,
  countStatements,
  emptyProgram,
  execute,
  parseProgram,
  run,
  serializeProgram,
  validateProgram,
  type Program,
  type RobotWorld,
  type Statement,
} from "./robotics-program.ts"
import { MISSIONS, getMission, validateMission, type MissionKind } from "./robotics-missions.ts"

const P = (...body: Statement[]): Program => ({ version: 1, variables: [], body })
const line5: RobotWorld = { cols: 5, rows: 1, start: { x: 0, y: 0, dir: 1 }, walls: [], lines: [], colors: {}, objects: [], goal: { x: 4, y: 0 } }

/* Serialization ------------------------------------------------------------ */

test("programs round-trip through serialize/parse", () => {
  const program: Program = P(
    { type: "move", direction: "forward", distance: 2 },
    { type: "repeat", count: 3, body: [{ type: "turn", direction: "left", angle: 90 }] },
    { type: "safeStop" },
  )
  const parsed = parseProgram(serializeProgram(program))
  assert.deepEqual(parsed, program)
})

test("parseProgram rejects malformed input safely (no throw)", () => {
  assert.equal(parseProgram("not json"), null)
  assert.equal(parseProgram({ body: "nope" }), null)
  assert.equal(parseProgram({ body: [{ type: "unknownBlock" }] }), null)
  assert.equal(parseProgram({ body: [{ type: "if", condition: { type: "bad" }, body: [] }] }), null)
  // A valid nested program parses.
  assert.ok(parseProgram({ body: [{ type: "forever", body: [{ type: "safeStop" }] }] }))
})

/* Movement ----------------------------------------------------------------- */

test("movement blocks change position and heading", () => {
  const r = run(P({ type: "move", direction: "forward", distance: 3 }), line5)
  assert.equal(r.state.x, 3)
  const t = run(P({ type: "turn", direction: "right", angle: 90 }, { type: "move", direction: "forward", distance: 1 }), line5)
  assert.equal(t.state.dir, 2) // was facing right(1) -> turned right -> down(2)
})

test("a robot cannot drive through a wall or off the grid", () => {
  const r = run(P({ type: "move", direction: "forward", distance: 10 }), line5)
  assert.equal(r.state.x, 4) // stops at the last in-bounds cell
})

test("set motor speeds drive with moveForDuration, and unequal speeds curve", () => {
  const straight = run(
    P({ type: "setSpeed", target: "both", speed: 100 }, { type: "moveForDuration", direction: "forward", ms: 1000 }),
    line5,
  )
  assert.ok(straight.state.x > 0, "equal speeds move forward")
  const curve = run(
    P(
      { type: "setSpeed", target: "left", speed: 100 },
      { type: "setSpeed", target: "right", speed: 0 },
      { type: "moveForDuration", direction: "forward", ms: 1000 },
    ),
    { ...line5, cols: 5, rows: 5, start: { x: 2, y: 2, dir: 0 } },
  )
  assert.notEqual(curve.state.dir, 0, "unequal speeds change the heading (curve)")
})

/* Control flow ------------------------------------------------------------- */

test("repeat runs its body a fixed number of times", () => {
  const r = run(P({ type: "repeat", count: 3, body: [{ type: "move", direction: "forward", distance: 1 }] }), line5)
  assert.equal(r.state.x, 3)
})

test("if / ifElse branch on a sensor condition", () => {
  const wall: RobotWorld = { ...line5, walls: ["1,0"] }
  const r = run(
    P({
      type: "ifElse",
      condition: { type: "touch" },
      body: [{ type: "turn", direction: "right", angle: 90 }],
      elseBody: [{ type: "move", direction: "forward", distance: 1 }],
    }),
    wall,
  )
  assert.equal(r.state.dir, 2) // touch true -> turned right
})

test("repeatUntil stops when its condition becomes true", () => {
  const r = run(
    P({
      type: "repeatUntil",
      condition: { type: "compare", op: "==", left: { type: "distance" }, right: { type: "num", value: 0 } },
      body: [{ type: "move", direction: "forward", distance: 1 }],
    }),
    line5,
  )
  assert.equal(r.state.x, 4)
})

/* Data --------------------------------------------------------------------- */

test("variables and counters set, change, and reset", () => {
  const r = run(
    {
      version: 1,
      variables: ["count"],
      body: [
        { type: "resetCounter", name: "count" },
        { type: "changeVar", name: "count", by: { type: "num", value: 1 } },
        { type: "changeVar", name: "count", by: { type: "num", value: 1 } },
        { type: "log", value: { type: "var", name: "count" } },
      ],
    },
    line5,
  )
  assert.equal(r.state.vars.count, 2)
  assert.deepEqual(r.state.log, [2])
})

/* Safe stopping + infinite-loop protection --------------------------------- */

test("safeStop ends the program and cuts the motors", () => {
  const r = run(P({ type: "safeStop" }, { type: "move", direction: "forward", distance: 5 }), line5)
  assert.equal(r.state.done, true)
  assert.equal(r.state.x, 0) // the move after safeStop never runs
  assert.equal(r.state.motorLeft, 0)
})

test("a forever loop is capped by the step budget (no hang)", () => {
  const program = P({ type: "forever", body: [{ type: "move", direction: "forward", distance: 1 }] })
  assert.throws(() => run(program, line5), ExecutionLimitError)
})

test("the step budget is configurable and enforced", () => {
  const gen = execute(P({ type: "forever", body: [{ type: "wait", ms: 1 }] }), line5, { maxSteps: 10 })
  let count = 0
  assert.throws(() => {
    let n = gen.next()
    while (!n.done) {
      count += 1
      n = gen.next()
    }
  }, ExecutionLimitError)
  assert.ok(count <= 10 + 1)
  assert.ok(DEFAULT_MAX_STEPS > 100)
})

/* Validation --------------------------------------------------------------- */

test("validation flags an empty program", () => {
  assert.ok(validateProgram(emptyProgram()).some((i) => i.level === "error"))
  assert.equal(canRun(emptyProgram()), false)
})

test("validation warns about a forever loop with no safe stop", () => {
  const issues = validateProgram(P({ type: "forever", body: [{ type: "move", direction: "forward", distance: 1 }] }))
  assert.ok(issues.some((i) => i.message.includes("forever loop")))
})

test("validation warns about mismatched motor speeds (curving)", () => {
  const issues = validateProgram(
    P({ type: "setSpeed", target: "left", speed: 80 }, { type: "setSpeed", target: "right", speed: 30 }, { type: "safeStop" }),
  )
  assert.ok(issues.some((i) => i.message.toLowerCase().includes("curve")))
})

test("validation warns about a counter that is never reset", () => {
  const issues = validateProgram({
    version: 1,
    variables: ["c"],
    body: [{ type: "changeVar", name: "c", by: { type: "num", value: 1 } }, { type: "safeStop" }],
  })
  assert.ok(issues.some((i) => i.message.includes("counter")))
})

test("validation warns about a stop placed after a forever loop", () => {
  const issues = validateProgram(
    P({ type: "forever", body: [{ type: "move", direction: "forward", distance: 1 }] }, { type: "safeStop" }),
  )
  assert.ok(issues.some((i) => i.message.includes("outside the loop")))
})

/* Missions ----------------------------------------------------------------- */

test("every mission's example program passes all of its checks", () => {
  for (const kind of Object.keys(MISSIONS) as MissionKind[]) {
    const mission = getMission(kind)
    const result = validateMission(mission.example, mission)
    assert.ok(
      result.passed,
      `${kind} example should pass but failed: ${result.checks.filter((c) => !c.passed).map((c) => c.id).join(", ")}`,
    )
    assert.equal(result.ranTooLong, false)
  }
})

test("every mission's starter program does NOT fully pass (validation is meaningful)", () => {
  for (const kind of Object.keys(MISSIONS) as MissionKind[]) {
    const mission = getMission(kind)
    const result = validateMission(mission.starter, mission)
    assert.equal(result.passed, false, `${kind} starter should be incomplete`)
  }
})

test("challenge validation is safe against an endless-loop program", () => {
  const mission = getMission("timed-delivery")
  const endless: Program = P({ type: "forever", body: [{ type: "turn", direction: "left", angle: 90 }] })
  const result = validateMission(endless, mission)
  assert.equal(result.ranTooLong, true)
  assert.equal(result.passed, false)
})

test("countStatements counts nested statements", () => {
  const program = P(
    { type: "move", direction: "forward", distance: 1 },
    { type: "repeat", count: 2, body: [{ type: "turn", direction: "left", angle: 90 }, { type: "safeStop" }] },
  )
  assert.equal(countStatements(program), 4)
})

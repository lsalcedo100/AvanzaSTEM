// Tests for the simulator engine: tracing, collisions, sensor readings,
// behavioural feedback, result records, and deterministic repeated runs.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import type { Program, RobotWorld, Statement } from "./robotics-program.ts"
import { getMission } from "./robotics-missions.ts"
import {
  SIM_TICK_MS,
  buildResultRecord,
  describeState,
  describeWorld,
  feedbackFor,
  runMission,
  traceRun,
} from "./robotics-sim.ts"

const P = (...body: Statement[]): Program => ({ version: 1, variables: [], body })
const PV = (variables: string[], ...body: Statement[]): Program => ({ version: 1, variables, body })
const line5: RobotWorld = { cols: 5, rows: 1, start: { x: 0, y: 0, dir: 1 }, walls: [], lines: [], colors: {}, objects: [], goal: { x: 4, y: 0 } }

/* Tracing / movement / sensors --------------------------------------------- */

test("traceRun records a frame per step with pose and sensor readings", () => {
  const trace = traceRun(P({ type: "move", direction: "forward", distance: 3 }), line5)
  assert.equal(trace.frames.length, 3)
  assert.equal(trace.finalState.x, 3)
  assert.equal(trace.frames[0].sensors.distance, 3) // from (1,0): 3 cells to the edge
  assert.equal(trace.missionTimeMs, 3 * SIM_TICK_MS)
})

test("collisions are detected when the robot hits a wall", () => {
  const world: RobotWorld = { ...line5, walls: ["2,0"] }
  const trace = traceRun(P({ type: "move", direction: "forward", distance: 4 }), world)
  assert.ok(trace.collisions >= 1)
  assert.ok(trace.collisionCells.includes("1,0")) // blocked trying to enter (2,0) from (1,0)
})

test("touch and line sensors read from the world", () => {
  const wallWorld: RobotWorld = { ...line5, walls: ["1,0"] }
  const touchTrace = traceRun(P({ type: "wait", ms: 1 }), wallWorld)
  assert.equal(touchTrace.frames[0].sensors.touch, true)
  const lineWorld: RobotWorld = { ...line5, lines: ["0,0"] }
  const lineTrace = traceRun(P({ type: "wait", ms: 1 }), lineWorld)
  assert.equal(lineTrace.frames[0].sensors.onLine, true)
  assert.equal(lineTrace.frames[0].sensors.light, 20)
})

test("differential speeds curve the heading in the trace", () => {
  const world: RobotWorld = { cols: 5, rows: 5, start: { x: 2, y: 2, dir: 0 }, walls: [], lines: [], colors: {}, objects: [], goal: undefined }
  const trace = traceRun(
    P(
      { type: "setSpeed", target: "left", speed: 100 },
      { type: "setSpeed", target: "right", speed: 0 },
      { type: "moveForDuration", direction: "forward", ms: 1000 },
    ),
    world,
  )
  assert.notEqual(trace.finalState.dir, 0)
})

test("repeated runs are deterministic", () => {
  const program = getMission("maze").example
  const a = traceRun(program, getMission("maze").world)
  const b = traceRun(program, getMission("maze").world)
  assert.deepEqual(a.frames, b.frames)
  assert.deepEqual(a.finalState, b.finalState)
})

test("an endless program is capped and flagged, not hung", () => {
  const trace = traceRun(P({ type: "forever", body: [{ type: "turn", direction: "left", angle: 90 }] }), line5)
  assert.equal(trace.ranTooLong, true)
})

/* Mission success / failure ------------------------------------------------ */

test("runMission passes for a correct program and fails for a stub", () => {
  const mission = getMission("timed-delivery")
  const pass = runMission(mission.example, mission)
  assert.equal(pass.passed, true)
  assert.equal(pass.feedback.length, 0)
  const fail = runMission(mission.starter, mission)
  assert.equal(fail.passed, false)
})

/* Behavioural feedback ----------------------------------------------------- */

function fb(program: Program, kind: Parameters<typeof getMission>[0]): string[] {
  const mission = getMission(kind)
  const outcome = runMission(program, mission)
  return outcome.feedback.map((f) => f.message)
}

test("feedback: stopped after crossing the delivery/goal zone", () => {
  // stop-in-zone goal is (3,0); driving 5 overshoots to (4,0) after visiting it.
  const messages = fb(P({ type: "move", direction: "forward", distance: 5 }), "stop-in-zone")
  assert.ok(messages.some((m) => m.includes("crossing the delivery zone")))
})

test("feedback: touched the obstacle because stop ran after the move", () => {
  const messages = fb(P({ type: "move", direction: "forward", distance: 5 }, { type: "safeStop" }), "obstacle-detection")
  assert.ok(messages.some((m) => m.includes("stop command ran after the movement")))
})

test("feedback: distance threshold triggered too late (collision with a distance check)", () => {
  const program = P(
    { type: "if", condition: { type: "compare", op: "<", left: { type: "distance" }, right: { type: "num", value: 0 } }, body: [{ type: "safeStop" }] },
    { type: "move", direction: "forward", distance: 5 },
  )
  const messages = fb(program, "obstacle-detection")
  assert.ok(messages.some((m) => m.includes("threshold triggered too late")))
})

test("feedback: mismatched motor speeds cause a curve", () => {
  const program = P(
    { type: "setSpeed", target: "left", speed: 80 },
    { type: "setSpeed", target: "right", speed: 20 },
    { type: "moveForDuration", direction: "forward", ms: 500 },
  )
  const messages = fb(program, "timed-delivery")
  assert.ok(messages.some((m) => m.includes("curve")))
})

test("feedback: detected the line but never changed direction", () => {
  const messages = fb(P({ type: "move", direction: "forward", distance: 2 }), "line-following")
  assert.ok(messages.some((m) => m.includes("did not change its direction")))
})

test("feedback: the counter increased several times for the same object", () => {
  const program = PV(
    ["count"],
    { type: "resetCounter", name: "count" },
    {
      type: "repeatUntil",
      condition: { type: "compare", op: "==", left: { type: "distance" }, right: { type: "num", value: 0 } },
      body: [{ type: "move", direction: "forward", distance: 1 }, { type: "changeVar", name: "count", by: { type: "num", value: 1 } }],
    },
    { type: "safeStop" },
  )
  const messages = fb(program, "counting")
  assert.ok(messages.some((m) => m.includes("same object")))
})

test("feedback: an endless program gets the too-long message", () => {
  const messages = fb(P({ type: "forever", body: [{ type: "turn", direction: "left", angle: 90 }] }), "timed-delivery")
  assert.ok(messages.some((m) => m.includes("ran for too long")))
})

test("no feedback is given when the mission passes", () => {
  const mission = getMission("final-project")
  assert.deepEqual(runMission(mission.example, mission).feedback, [])
})

/* Result record ------------------------------------------------------------ */

test("buildResultRecord captures the full attempt", () => {
  const mission = getMission("timed-delivery")
  const outcome = runMission(mission.example, mission)
  const record = buildResultRecord({ mission, specId: "w3-prog", outcome, trial: 2, programRevision: 3, notes: "went well", revisionMade: "added a stop" })
  assert.equal(record.missionId, "timed-delivery")
  assert.equal(record.specId, "w3-prog")
  assert.equal(record.success, true)
  assert.equal(record.trial, 2)
  assert.equal(record.programRevision, 3)
  assert.equal(record.finalX, 4)
  assert.equal(record.finalY, 0)
  assert.equal(record.notes, "went well")
  assert.equal(record.revisionMade, "added a stop")
  assert.ok(record.missionTimeMs > 0)
})

/* Accessibility text ------------------------------------------------------- */

test("describeWorld and describeState produce readable text", () => {
  const mission = getMission("obstacle-avoidance")
  const worldText = describeWorld(mission.world)
  assert.ok(worldText.includes("grid"))
  assert.ok(worldText.includes("goal zone"))
  const trace = traceRun(mission.example, mission.world)
  const stateText = describeState(mission.world, trace.finalState)
  assert.ok(stateText.includes("Distance ahead"))
  assert.ok(stateText.includes("Touch"))
})

test("feedbackFor returns nothing extra on a passing run", () => {
  const mission = getMission("maze")
  const trace = traceRun(mission.example, mission.world)
  assert.deepEqual(feedbackFor(trace, mission.example, mission, true), [])
})

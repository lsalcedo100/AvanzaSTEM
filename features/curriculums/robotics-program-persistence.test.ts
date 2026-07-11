// Persistence tests for saved block-editor programs (the full typed AST).
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import { emptyRoboticsProgress } from "./robotics.ts"
import { emptyProgram, type Program } from "./robotics-program.ts"
import {
  loadRoboticsProgress,
  resetProgramAst,
  saveProgramAst,
  saveActivityData,
  saveSimulatorResult,
  saveRoboticsProgress,
  type StorageLike,
} from "./robotics-progress.ts"

const AT = "2026-07-10T12:00:00.000Z"

function mockStorage(seed: Record<string, string> = {}): StorageLike {
  const map = new Map(Object.entries(seed))
  return {
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => void map.set(k, v),
    removeItem: (k) => void map.delete(k),
  }
}

const demo: Program = {
  version: 1,
  variables: ["count"],
  body: [
    { type: "resetCounter", name: "count" },
    { type: "repeatUntil", condition: { type: "touch" }, body: [{ type: "move", direction: "forward", distance: 1 }] },
    { type: "safeStop" },
  ],
}

test("a saved AST program survives a storage round-trip", () => {
  const storage = mockStorage()
  let p = emptyRoboticsProgress()
  p = saveProgramAst(p, "w5-prog-obstacle", demo, AT)
  saveRoboticsProgress(storage, p)

  const reloaded = loadRoboticsProgress(storage)
  assert.deepEqual(reloaded.savedProgramAsts["w5-prog-obstacle"].program, demo)
  assert.equal(reloaded.savedProgramAsts["w5-prog-obstacle"].revisions, 1)
})

test("saving again increments the revision count", () => {
  let p = emptyRoboticsProgress()
  p = saveProgramAst(p, "spec-a", emptyProgram(), AT)
  p = saveProgramAst(p, "spec-a", demo, AT)
  assert.equal(p.savedProgramAsts["spec-a"].revisions, 2)
  assert.deepEqual(p.savedProgramAsts["spec-a"].program, demo)
})

test("saving one program never overwrites another lesson's program", () => {
  let p = emptyRoboticsProgress()
  p = saveProgramAst(p, "spec-a", demo, AT)
  p = saveProgramAst(p, "spec-b", emptyProgram(), AT)
  assert.deepEqual(p.savedProgramAsts["spec-a"].program, demo)
  assert.deepEqual(p.savedProgramAsts["spec-b"].program, emptyProgram())
  assert.equal(Object.keys(p.savedProgramAsts).length, 2)
})

test("resetProgramAst clears a program (reset to starter) without touching others", () => {
  let p = emptyRoboticsProgress()
  p = saveProgramAst(p, "spec-a", demo, AT)
  p = saveProgramAst(p, "spec-b", demo, AT)
  p = resetProgramAst(p, "spec-a", AT)
  assert.equal(p.savedProgramAsts["spec-a"], undefined)
  assert.ok(p.savedProgramAsts["spec-b"])
})

test("a corrupted saved AST is dropped on load, not crashed on", () => {
  const bad = JSON.stringify({
    ...emptyRoboticsProgress(),
    savedProgramAsts: { "spec-x": { specId: "spec-x", program: { body: "nope" }, savedAt: AT, revisions: 1 } },
  })
  const storage = mockStorage({ "avanza-robotics-progress-v2": bad })
  const loaded = loadRoboticsProgress(storage)
  assert.equal(loaded.savedProgramAsts["spec-x"], undefined)
})

test("a full simulator result record saves and restores by spec id", () => {
  const storage = mockStorage()
  let p = emptyRoboticsProgress()
  const record = {
    missionId: "obstacle-avoidance",
    specId: "w5-prog-obstacle",
    success: true,
    trial: 2,
    steps: 7,
    missionTimeMs: 1400,
    collisions: 0,
    sensorEvents: 3,
    finalX: 2,
    finalY: 0,
    programRevision: 4,
    ranTooLong: false,
    notes: "worked on the second try",
    revisionMade: "added a turn after the sensor",
  }
  p = saveSimulatorResult(p, record, AT)
  saveRoboticsProgress(storage, p)

  const reloaded = loadRoboticsProgress(storage)
  const saved = reloaded.savedSimulatorResults["w5-prog-obstacle"]
  assert.ok(saved)
  assert.equal(saved.success, true)
  assert.equal(saved.trial, 2)
  assert.equal(saved.collisions, 0)
  assert.equal(saved.revisionMade, "added a turn after the sensor")
  assert.equal(saved.savedAt, AT)
})

test("saving a sim result for one spec does not overwrite another spec's", () => {
  let p = emptyRoboticsProgress()
  const base = { missionId: "maze", success: false, trial: 1, steps: 3, missionTimeMs: 600, collisions: 1, sensorEvents: 0, finalX: 0, finalY: 0, programRevision: 1, ranTooLong: false, notes: "", revisionMade: "" }
  p = saveSimulatorResult(p, { ...base, specId: "spec-a" }, AT)
  p = saveSimulatorResult(p, { ...base, specId: "spec-b" }, AT)
  assert.equal(Object.keys(p.savedSimulatorResults).length, 2)
})

test("interactive activity data saves, restores, and clears", () => {
  const storage = mockStorage()
  let p = emptyRoboticsProgress()
  p = saveActivityData(p, "robot-or-not:w1-a-robot-or-not", '{"door":"robot"}', AT)
  p = saveActivityData(p, "chassis-lab:w2-a-chassis-investigation", '{"wheelSize":3}', AT)
  saveRoboticsProgress(storage, p)
  const reloaded = loadRoboticsProgress(storage)
  assert.equal(reloaded.activityData["robot-or-not:w1-a-robot-or-not"], '{"door":"robot"}')
  assert.equal(reloaded.activityData["chassis-lab:w2-a-chassis-investigation"], '{"wheelSize":3}')
})

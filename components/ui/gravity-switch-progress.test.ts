// Gravity Switch: Zero-G Lab — saved progress tests.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import { MISSION_IDS } from "./gravity-switch-missions.ts"
import {
  PROGRESS_STORAGE_KEY,
  clearProgress,
  completedCount,
  emptyProgress,
  emptyStats,
  loadProgress,
  parseProgress,
  persistableMissions,
  saveProgress,
} from "./gravity-switch-progress.ts"
import type { ProgressStats } from "./gravity-switch-types.ts"

function fakeStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial))
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value)
    },
    removeItem: (key: string) => {
      data.delete(key)
    },
    data,
  }
}

const richStats: ProgressStats = {
  completions: { "drop-in": 3, "hang-time": 1 },
  lastMissionId: "hang-time",
  experimentsDone: ["heavy-light", "zero-g-push"],
  predictionsRight: 2,
  predictionsTotal: 3,
  planetsTried: ["earth", "moon"],
}

test("the whole record round-trips through storage, missions in progression order", () => {
  const storage = fakeStorage()
  saveProgress(storage, ["hang-time", "drop-in"], richStats)
  const loaded = loadProgress(storage)
  assert.deepEqual(loaded.completed, ["drop-in", "hang-time"])
  assert.deepEqual(loaded.stats, richStats)
  assert.ok(storage.data.get(PROGRESS_STORAGE_KEY)?.includes('"version":1'))
  assert.equal(completedCount(loaded.completed), 2)
})

test("junk, missing and foreign data all read as an empty record", () => {
  for (const raw of [null, "", "not json", "42", "[]", '{"completed":"drop-in"}', '{"version":1,"completions":"lots"}']) {
    assert.deepEqual(parseProgress(raw), emptyProgress(), String(raw))
  }
  assert.deepEqual(loadProgress(null), emptyProgress())
  assert.deepEqual(loadProgress(undefined), emptyProgress())
})

test("unknown ids, bad counts and impossible numbers are dropped, not trusted", () => {
  const loaded = parseProgress(
    JSON.stringify({
      version: 1,
      completed: ["drop-in", "made-up", 7, null, "drop-in"],
      completions: { "drop-in": 2.9, "moon-shot": -4, "dev-check": 5, nonsense: 1 },
      lastMissionId: "dev-check",
      experimentsDone: ["heavy-light", "bogus", "heavy-light"],
      predictionsRight: 9,
      predictionsTotal: 2,
      planetsTried: ["moon", "pluto", "moon"],
    }),
  )
  assert.deepEqual(loaded.completed, ["drop-in"])
  assert.deepEqual(loaded.stats.completions, { "drop-in": 2 })
  assert.equal(loaded.stats.lastMissionId, null, "the dev scenario is never the last mission")
  assert.deepEqual(loaded.stats.experimentsDone, ["heavy-light"])
  assert.equal(loaded.stats.predictionsTotal, 2)
  assert.equal(loaded.stats.predictionsRight, 2, "right can never exceed total")
  assert.deepEqual(loaded.stats.planetsTried, ["moon"])
})

test("a completed mission always counts as completed at least once", () => {
  const loaded = parseProgress(JSON.stringify({ version: 1, completed: ["bank-shot"], completions: {} }))
  assert.deepEqual(loaded.stats.completions, { "bank-shot": 1 })
})

test("the development scenario is never persisted", () => {
  assert.deepEqual(persistableMissions(["dev-check", "moon-shot"]), ["moon-shot"])
  const storage = fakeStorage()
  saveProgress(storage, ["dev-check"], { ...emptyStats(), completions: { "dev-check": 4 }, lastMissionId: "dev-check" })
  const loaded = loadProgress(storage)
  assert.deepEqual(loaded.completed, [])
  assert.deepEqual(loaded.stats.completions, {})
  assert.equal(loaded.stats.lastMissionId, null)
})

test("a throwing or missing storage is tolerated, and clearing removes the key", () => {
  const broken = {
    getItem: () => {
      throw new Error("blocked")
    },
    setItem: () => {
      throw new Error("blocked")
    },
    removeItem: () => {
      throw new Error("blocked")
    },
  }
  assert.deepEqual(loadProgress(broken), emptyProgress())
  assert.doesNotThrow(() => saveProgress(broken, MISSION_IDS, emptyStats()))
  assert.doesNotThrow(() => clearProgress(broken))
  const storage = fakeStorage()
  saveProgress(storage, ["drop-in"], emptyStats())
  assert.ok(storage.data.has(PROGRESS_STORAGE_KEY))
  clearProgress(storage)
  assert.equal(storage.data.has(PROGRESS_STORAGE_KEY), false)
  assert.doesNotThrow(() => clearProgress(null))
})

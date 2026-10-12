// Gravity Switch: Zero-G Lab — achievement tests.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import { ACHIEVEMENT_IDS, earnedAchievements, isAchievementId, newlyEarned } from "./gravity-switch-achievements.ts"
import { MISSION_IDS } from "./gravity-switch-missions.ts"
import { emptyStats } from "./gravity-switch-progress.ts"
import { impactAllowed, impactGain, IMPACT_MIN_GAP_MS } from "./gravity-switch-sound.ts"

test("nothing is earned from an empty record", () => {
  assert.deepEqual(earnedAchievements([], emptyStats()), [])
  assert.equal(ACHIEVEMENT_IDS.length, 5)
  assert.ok(isAchievementId("scientist"))
  assert.equal(isAchievementId("trophy"), false)
})

test("each achievement follows from the record that justifies it", () => {
  assert.deepEqual(earnedAchievements(["drop-in"], emptyStats()), ["first-mission"])
  assert.deepEqual(earnedAchievements(MISSION_IDS, emptyStats()), ["first-mission", "all-missions"])
  assert.deepEqual(earnedAchievements(["dev-check"], emptyStats()), [], "the dev scenario does not count")
  assert.deepEqual(
    earnedAchievements([], { ...emptyStats(), experimentsDone: ["falling-ball-off", "heavy-light", "zero-g-push"] }),
    ["scientist"],
  )
  assert.deepEqual(earnedAchievements([], { ...emptyStats(), experimentsDone: ["heavy-light"] }), [])
  assert.deepEqual(earnedAchievements([], { ...emptyStats(), predictionsRight: 1, predictionsTotal: 4 }), ["good-guess"])
  assert.deepEqual(
    earnedAchievements([], { ...emptyStats(), planetsTried: ["earth", "moon", "mars", "jupiter", "zero"] }),
    ["planet-hopper"],
  )
  assert.deepEqual(earnedAchievements([], { ...emptyStats(), planetsTried: ["earth", "moon", "mars", "jupiter"] }), [])
})

test("newlyEarned reports only what was not there before", () => {
  assert.deepEqual(newlyEarned([], ["first-mission"]), ["first-mission"])
  assert.deepEqual(newlyEarned(["first-mission"], ["first-mission", "good-guess"]), ["good-guess"])
  assert.deepEqual(newlyEarned(["first-mission"], ["first-mission"]), [])
})

test("impact sounds are rate limited and scale with speed but stay quiet", () => {
  assert.equal(impactAllowed(1000, 1000 - IMPACT_MIN_GAP_MS + 1), false)
  assert.equal(impactAllowed(1000, 1000 - IMPACT_MIN_GAP_MS), true)
  assert.equal(impactGain(0), 0)
  assert.ok(impactGain(2) < impactGain(6))
  assert.equal(impactGain(8), impactGain(50), "capped")
  assert.ok(impactGain(50) <= 0.06)
})

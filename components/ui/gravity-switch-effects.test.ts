// Gravity Switch: Zero-G Lab — effects store tests.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import {
  CONFETTI_COUNT,
  CONFETTI_LIFE_MS,
  EffectsStore,
  MAX_RIPPLES,
  RIPPLE_LIFE_MS,
  confettoProgress,
  rippleProgress,
} from "./gravity-switch-effects.ts"

test("ripples grow with impact speed, live for their lifetime, and are capped in number", () => {
  const store = new EffectsStore()
  store.addRipple({ x: 10, y: 10 }, 1, "#fff", 0)
  store.addRipple({ x: 20, y: 10 }, 20, "#fff", 0)
  const [soft, hard] = store.liveRipples()
  assert.ok(hard.maxRadius > soft.maxRadius)
  assert.equal(hard.maxRadius, 48, "capped")
  assert.equal(rippleProgress(soft, 0), 0)
  assert.equal(rippleProgress(soft, RIPPLE_LIFE_MS / 2), 0.5)
  store.update(RIPPLE_LIFE_MS - 1, 16)
  assert.equal(store.liveRipples().length, 2)
  store.update(RIPPLE_LIFE_MS, 16)
  assert.equal(store.liveRipples().length, 0)
  for (let i = 0; i < MAX_RIPPLES + 10; i++) store.addRipple({ x: i, y: 0 }, 2, "#fff", 1000)
  assert.equal(store.liveRipples().length, MAX_RIPPLES)
})

test("confetti bursts upward from the origin, falls under its own pretend gravity, and expires", () => {
  const store = new EffectsStore()
  let seed = 1
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  store.celebrate({ x: 480, y: 270 }, 0, random)
  assert.equal(store.liveConfetti().length, CONFETTI_COUNT)
  assert.ok(store.liveConfetti().every((confetto) => confetto.vy < 0), "all start moving up")
  store.update(500, 500)
  const after = store.liveConfetti()
  assert.ok(after.some((confetto) => confetto.y < 270), "some are above the origin half a second in")
  assert.ok(after.every((confetto) => confetto.vy > -600), "slowing on the way up")
  assert.ok(confettoProgress(after[0], 500) > 0.3)
  store.update(CONFETTI_LIFE_MS + 1, 16)
  assert.ok(store.isEmpty)
})

test("clear empties everything at once", () => {
  const store = new EffectsStore()
  store.addRipple({ x: 0, y: 0 }, 3, "#fff", 0)
  store.celebrate({ x: 0, y: 0 }, 0, () => 0.5)
  assert.equal(store.isEmpty, false)
  store.clear()
  assert.ok(store.isEmpty)
})

// Gravity Switch: Zero-G Lab — viewport conversion tests.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import { ROOM_HEIGHT, ROOM_WIDTH } from "./gravity-switch-config.ts"
import {
  MAX_DPR,
  createViewport,
  insideRoom,
  roomTransform,
  sameViewport,
  toCss,
  toRoom,
} from "./gravity-switch-viewport.ts"

test("a viewport scales the room to the canvas width and keeps the aspect ratio", () => {
  const viewport = createViewport(480, 2)
  assert.equal(viewport.scale, 0.5)
  assert.equal(viewport.cssWidth, 480)
  assert.equal(viewport.cssHeight, ROOM_HEIGHT * 0.5)
  assert.equal(viewport.cssWidth / viewport.cssHeight, ROOM_WIDTH / ROOM_HEIGHT)
  assert.equal(viewport.dpr, 2)
  assert.equal(viewport.backingWidth, 960)
  assert.equal(viewport.backingHeight, 540)
})

test("the backing store follows the device pixel ratio, within limits", () => {
  assert.equal(createViewport(960, 1).backingWidth, 960)
  assert.equal(createViewport(960, 1.5).backingWidth, 1440)
  assert.equal(createViewport(960, 0.5).dpr, 1, "never below 1")
  assert.equal(createViewport(960, 8).dpr, MAX_DPR, "never above the cap")
  assert.equal(createViewport(960, Number.NaN).dpr, 1)
  assert.equal(createViewport(333, 3).backingWidth, 999)
  assert.equal(createViewport(333, 3).backingHeight, Math.round(ROOM_HEIGHT * (333 / ROOM_WIDTH) * 3))
})

test("degenerate sizes do not produce a zero or NaN viewport", () => {
  for (const width of [0, -10, Number.NaN, Number.POSITIVE_INFINITY]) {
    const viewport = createViewport(width, 2)
    assert.ok(viewport.cssWidth >= 1, String(width))
    assert.ok(Number.isFinite(viewport.scale) && viewport.scale > 0)
    assert.ok(viewport.backingWidth >= 1 && viewport.backingHeight >= 1)
  }
})

test("css and room coordinates round-trip", () => {
  const viewport = createViewport(640, 2)
  const points = [
    { x: 0, y: 0 },
    { x: ROOM_WIDTH, y: ROOM_HEIGHT },
    { x: 123.4, y: 56.7 },
  ]
  for (const point of points) {
    const css = toCss(viewport, point.x, point.y)
    const back = toRoom(viewport, css.x, css.y)
    assert.ok(Math.abs(back.x - point.x) < 1e-9 && Math.abs(back.y - point.y) < 1e-9)
  }
  assert.deepEqual(toRoom(viewport, 320, 180), { x: 480, y: 270 }, "the css centre is the room centre")
  assert.ok(insideRoom(viewport, { x: 480, y: 270 }))
  assert.equal(insideRoom(viewport, { x: -1, y: 10 }), false)
  assert.equal(insideRoom(viewport, { x: 10, y: ROOM_HEIGHT + 1 }), false)
})

test("the room transform combines scale and pixel ratio with no translation", () => {
  const viewport = createViewport(480, 2)
  assert.deepEqual(roomTransform(viewport), [1, 0, 0, 1, 0, 0], "half size at 2× density is 1:1 in device pixels")
  assert.deepEqual(roomTransform(createViewport(960, 3)), [3, 0, 0, 3, 0, 0])
})

test("sameViewport only differs when the canvas would need resizing", () => {
  const a = createViewport(480, 2)
  assert.ok(sameViewport(a, createViewport(480, 2)))
  assert.equal(sameViewport(a, createViewport(481, 2)), false)
  assert.equal(sameViewport(a, createViewport(480, 1)), false)
})

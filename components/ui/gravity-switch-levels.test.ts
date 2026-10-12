// Gravity Switch: Zero-G Lab — the first three missions, played on the real engine.
//
// A scripted "player" flips the switch at chosen moments while the physics
// world and the mission tracker run headlessly, exactly as the canvas loop
// drives them in the browser. Each mission is shown to be solvable with
// generous timing, to fail the way its design intends, and to reset cleanly.
//
//     npm test

import { test } from "node:test"
import assert from "node:assert/strict"

import { PHYSICS_STEP_MS } from "./gravity-switch-config.ts"
import { getMission, validateMission } from "./gravity-switch-missions.ts"
import { MissionTracker, type TrackerEvent } from "./gravity-switch-objectives.ts"
import { GravitySwitchWorld, resolveMatterModule } from "./gravity-switch-physics.ts"
import type { GravityState, MissionDefinition, ObjectState } from "./gravity-switch-types.ts"

const Matter = resolveMatterModule(await import("matter-js"))
const FRAME_MS = PHYSICS_STEP_MS * 2

type Player = (now: { seconds: number; ball: ObjectState; world: GravitySwitchWorld; flips: number }) => GravityState | null

/**
 * Run a mission until it ends or `maxSeconds` pass; `player` may return a new
 * gravity setting each frame, and `observe` sees the world after every step,
 * including the one that ends the attempt.
 */
function play(
  def: MissionDefinition,
  player: Player,
  maxSeconds = 30,
  world?: GravitySwitchWorld,
  observe?: (now: { seconds: number; world: GravitySwitchWorld }) => void,
) {
  const own = !world
  const live = world ?? new GravitySwitchWorld(Matter, def.world, def.gravity)
  if (!own) live.reset()
  const tracker = new MissionTracker(def)
  const log: TrackerEvent[] = []
  let flips = 0
  let minY = Number.POSITIVE_INFINITY
  while (!tracker.finished && live.elapsedMs < maxSeconds * 1000) {
    const ball = live.getObject("ball") ?? live.getObjects()[0]
    minY = Math.min(minY, ball.position.y)
    const wanted = player({ seconds: live.elapsedMs / 1000, ball, world: live, flips })
    const current = live.getGravity()
    if (wanted && (wanted.switchOn !== current.switchOn || wanted.preset !== current.preset)) {
      if (wanted.switchOn !== current.switchOn) flips += 1
      live.setGravity(wanted)
    }
    live.stepExactly(2)
    observe?.({ seconds: live.elapsedMs / 1000, world: live })
    log.push(
      ...tracker.update(
        {
          objects: live.getObjects(),
          contacts: live.takeContacts(),
          gravity: live.getGravity(),
          elapsedMs: live.elapsedMs,
          flips,
          room: def.world,
        },
        FRAME_MS,
      ),
    )
  }
  const result = { log, seconds: live.elapsedMs / 1000, flips, minY, last: live.getObject("ball") ?? live.getObjects()[0] }
  if (own) live.dispose()
  return result
}

const won = (log: TrackerEvent[]) => log.some((event) => event.type === "mission-complete")
const lost = (log: TrackerEvent[]) => log.find((event) => event.type === "mission-failed")
const ON: GravityState = { preset: "earth", switchOn: true }
const OFF: GravityState = { preset: "earth", switchOn: false }

// ---------------------------------------------------------------------------
// Mission 1: Drop In
// ---------------------------------------------------------------------------

test("Drop In validates and starts with the ball floating above the cup", () => {
  const def = getMission("drop-in")
  assert.deepEqual(validateMission(def), [])
  assert.equal(def.gravity.switchOn, false)
  const cup = def.world.zones.find((zone) => zone.id === "basket")!
  const ball = def.world.objects[0]
  assert.ok(ball.x > cup.x && ball.x < cup.x + cup.width, "the ball is directly above the cup")
  assert.ok(ball.y < cup.y, "and above it")
  assert.ok(def.text.failure, "it explains a failed attempt")
})

test("Drop In: flipping gravity on wins within a few seconds, and nothing happens without it", () => {
  const def = getMission("drop-in")
  const solved = play(def, ({ seconds }) => (seconds >= 0.5 ? ON : null), 15)
  assert.ok(won(solved.log), JSON.stringify(solved.log))
  assert.ok(solved.seconds < 6, `won after ${solved.seconds.toFixed(1)} s`)
  assert.equal(solved.flips, 1)

  const idle = play(def, () => null, 21)
  assert.equal(won(idle.log), false)
  assert.equal(lost(idle.log)?.reason, "time-limit")
  assert.ok(Math.abs(idle.last.position.y - def.world.objects[0].y) < 1e-6, "the ball never moved")
})

// ---------------------------------------------------------------------------
// Mission 2: Hang Time
// ---------------------------------------------------------------------------

const MOON_OFF: GravityState = { preset: "moon", switchOn: false }
const MOON_ON: GravityState = { preset: "moon", switchOn: true }

const hangTime = () => {
  const def = getMission("hang-time")
  const ledge = def.world.obstacles.find((obstacle) => obstacle.id === "ledge-left")!
  const platform = def.world.obstacles.find((obstacle) => obstacle.id === "ledge-right")!
  const edgeX = ledge.x + ledge.width
  return { def, edgeX, platform }
}

/** Flips off `offDelay` seconds after the ball leaves the ledge, and back on once it is over the far platform. */
function hangTimePlayer(edgeX: number, platform: { x: number }, offDelay: number): Player {
  let leftEdgeAt: number | null = null
  return ({ seconds, ball }) => {
    if (leftEdgeAt === null && ball.position.x > edgeX) leftEdgeAt = seconds
    if (ball.position.x >= platform.x + 60) return MOON_ON
    if (leftEdgeAt !== null && seconds >= leftEdgeAt + offDelay) return MOON_OFF
    return null
  }
}

test("Hang Time validates and is laid out as a ledge, a gap with a pit, and a lower landing platform on the Moon", () => {
  const { def, edgeX, platform } = hangTime()
  assert.deepEqual(validateMission(def), [])
  const pit = def.world.zones.find((zone) => zone.id === "pit")!
  const left = def.world.obstacles.find((obstacle) => obstacle.id === "ledge-left")!
  const cliff = def.world.obstacles.find((obstacle) => obstacle.id === "cliff")!
  assert.ok(platform.y > left.y + 100, "the far platform is well below the ledge, which is what makes a late flip survivable")
  assert.equal(pit.x, edgeX, "the pit starts where the ledge ends")
  assert.equal(cliff.x + cliff.width, platform.x, "the platform's face is its own body, so only its top counts as landing")
  assert.equal(def.gravity.preset, "moon", "gentle gravity for generous timing")
  assert.equal(def.trailsByDefault, true, "the path is the lesson, so trails are on")
  assert.deepEqual(def.objectives.map((objective) => objective.kind), ["enter-zone", "bounce-off"])
})

test("Hang Time: a prompt flip glides across and lands on the far platform", () => {
  const { def, edgeX, platform } = hangTime()
  const run = play(def, hangTimePlayer(edgeX, platform, 0.05), 25)
  assert.ok(won(run.log), JSON.stringify(run.log))
  assert.deepEqual(
    run.log.map((event) => event.type),
    ["objective-complete", "objective-complete", "mission-complete"],
  )
  assert.ok(run.seconds < 12, `won after ${run.seconds.toFixed(1)} s`)
  assert.equal(run.flips, 2)
})

test("Hang Time: flipping up to 0.6 s late is still fine for a young player", () => {
  const { def, edgeX, platform } = hangTime()
  for (const delay of [0.2, 0.4, 0.6]) {
    const run = play(def, hangTimePlayer(edgeX, platform, delay), 25)
    assert.ok(won(run.log), `flipping ${delay} s late: ${JSON.stringify(run.log)}`)
  }
})

test("Hang Time: never flipping drops the ball into the pit", () => {
  const { def } = hangTime()
  const run = play(def, () => null, 25)
  assert.equal(lost(run.log)?.reason, "touch-hazard")
  assert.ok(run.seconds < 6, `fell in after ${run.seconds.toFixed(1)} s`)
})

test("Hang Time: turning gravity back on over the gap also ends in the pit", () => {
  const { def, edgeX } = hangTime()
  let leftEdgeAt: number | null = null
  const run = play(
    def,
    ({ seconds, ball }) => {
      if (leftEdgeAt === null && ball.position.x > edgeX) leftEdgeAt = seconds
      if (leftEdgeAt === null) return null
      if (seconds < leftEdgeAt + 0.3) return MOON_OFF
      return MOON_ON // far too early: the ball is still over the gap
    },
    25,
  )
  assert.equal(lost(run.log)?.reason, "touch-hazard")
})

test("Hang Time: with gravity left on, the ball falls well short of the far side", () => {
  const { def, edgeX } = hangTime()
  const cliff = def.world.obstacles.find((obstacle) => obstacle.id === "cliff")!
  const pit = def.world.zones.find((zone) => zone.id === "pit")!
  let fellAtX = 0
  const run = play(
    def,
    ({ ball }) => {
      // Note where the ball is just before it reaches the pit; the hazard ends the run on contact.
      if (fellAtX === 0 && ball.position.y > pit.y - 50) fellAtX = ball.position.x
      return null
    },
    25,
  )
  assert.equal(lost(run.log)?.reason, "touch-hazard")
  assert.ok(fellAtX > edgeX && fellAtX < cliff.x - 60, `reached the pit at x=${fellAtX.toFixed(0)}, well before the cliff at ${cliff.x}`)
})

test("Hang Time: flipping far too late cannot be won", () => {
  const { def, edgeX, platform } = hangTime()
  const run = play(def, hangTimePlayer(edgeX, platform, 1.4), 26)
  assert.equal(won(run.log), false)
  assert.ok(lost(run.log), "the attempt ends in a loss")
})

test("Hang Time: never restoring gravity cannot be won and the clock ends the attempt", () => {
  const { def, edgeX } = hangTime()
  let leftEdgeAt: number | null = null
  const run = play(
    def,
    ({ seconds, ball }) => {
      if (leftEdgeAt === null && ball.position.x > edgeX) leftEdgeAt = seconds
      return leftEdgeAt !== null && seconds >= leftEdgeAt + 0.1 ? MOON_OFF : null
    },
    26,
  )
  assert.equal(won(run.log), false)
  assert.ok(lost(run.log), "floating about never lands on the platform; the attempt ends by the clock or by drifting into the pit")
  assert.deepEqual(run.log.map((event) => event.type), ["objective-complete", "mission-failed"], "it did glide over, then floated about")
})

// ---------------------------------------------------------------------------
// Mission 3: Straight Up
// ---------------------------------------------------------------------------

test("Straight Up validates: a spring under the ball, a hatch in the roof, an exit above", () => {
  const def = getMission("straight-up")
  assert.deepEqual(validateMission(def), [])
  assert.equal(def.world.walls.ceiling, false)
  const spring = def.world.launchers![0]
  const hatch = def.world.zones.find((zone) => zone.id === "hatch")!
  assert.equal(spring.objectId, "ball")
  assert.ok(def.world.objects[0].x > hatch.x && def.world.objects[0].x < hatch.x + hatch.width, "the spring aims at the hatch")
  assert.deepEqual(def.objectives.map((objective) => objective.kind), ["exit"])
  assert.ok(def.text.failure)
})

test("Straight Up: with gravity left on the ball rises, stops, falls back, and the attempt times out", () => {
  const def = getMission("straight-up")
  const run = play(def, () => null, 16)
  assert.equal(won(run.log), false)
  assert.equal(lost(run.log)?.reason, "time-limit")
  const start = def.world.objects[0].y
  assert.ok(run.minY < start - 150, `it rose ${Math.round(start - run.minY)} px`)
  assert.ok(run.minY > 100, "but never reached the roof")
  assert.ok(run.last.position.y > start - 40, "and came back down to the spring")
})

test("Straight Up: flipping gravity off while rising carries the ball out through the hatch", () => {
  const def = getMission("straight-up")
  for (const flipAt of [0.1, 0.3, 0.6, 0.8]) {
    const run = play(def, ({ seconds }) => (seconds >= flipAt ? OFF : null), 10)
    assert.ok(won(run.log), `flip at ${flipAt} s: ${JSON.stringify(run.log)}`)
    assert.ok(run.seconds < 6, `flip at ${flipAt} s won after ${run.seconds.toFixed(1)} s`)
  }
  // Right at the top of the hop the ball is barely rising: it still gets out, just slowly.
  const lastMoment = play(def, ({ seconds }) => (seconds >= 0.95 ? OFF : null), 20)
  assert.ok(won(lastMoment.log), JSON.stringify(lastMoment.log))
})

test("Straight Up: the spring fires on the first step, not at build time, so briefing is still", () => {
  const def = getMission("straight-up")
  const world = new GravitySwitchWorld(Matter, def.world, def.gravity)
  assert.equal(world.hasLaunched, false)
  assert.deepEqual(world.getObject("ball")!.velocity, { x: 0, y: 0 }, "nothing moves until the room advances")
  world.stepExactly(1)
  assert.equal(world.hasLaunched, true)
  assert.ok(world.getObject("ball")!.velocity.y < -9, `launched upward at ${(-world.getObject("ball")!.velocity.y).toFixed(2)} m/s`)
  world.dispose()
})

test("Straight Up: every reset replays the identical launch", () => {
  const def = getMission("straight-up")
  const world = new GravitySwitchWorld(Matter, def.world, def.gravity)
  const trace = () => {
    const points: number[] = []
    for (let i = 0; i < 6; i++) {
      world.stepExactly(20)
      points.push(world.getObject("ball")!.position.y)
    }
    return points
  }
  const first = trace()
  world.reset()
  assert.equal(world.hasLaunched, false, "reset re-arms the spring")
  const second = trace()
  assert.deepEqual(second, first)
  const again = play(def, ({ seconds }) => (seconds >= 0.3 ? OFF : null), 10, world)
  assert.ok(won(again.log), "and a reset world is still winnable")
  world.dispose()
})

// ---------------------------------------------------------------------------
// Mission 4: Hammer and Feather
// ---------------------------------------------------------------------------

test("Hammer and Feather: different masses, airless, both released by the switch, landing together", () => {
  const def = getMission("hammer-and-feather")
  assert.deepEqual(validateMission(def), [])
  assert.equal(def.world.air, "vacuum")
  assert.ok(def.prediction && def.prediction.choices.length === 3)
  const world = new GravitySwitchWorld(Matter, def.world, def.gravity)
  const hammer = world.getObject("hammer")!
  const feather = world.getObject("feather")!
  assert.ok(hammer.mass > feather.mass * 50, `hammer ${hammer.mass} kg vs feather ${feather.mass} kg`)
  world.dispose()

  // Time each impact separately (the moment its fall is stopped), leaving the tracker's contacts alone.
  let hammerAt: number | null = null
  let featherAt: number | null = null
  let hammerFalling = false
  let featherFalling = false
  const run = play(
    def,
    ({ seconds }) => (seconds >= 0.5 ? MOON_ON : null),
    15,
    undefined,
    ({ seconds, world }) => {
      const h = world.getObject("hammer")!.velocity.y
      const f = world.getObject("feather")!.velocity.y
      if (h > 1) hammerFalling = true
      if (f > 1) featherFalling = true
      if (hammerAt === null && hammerFalling && h < 0.3) hammerAt = seconds
      if (featherAt === null && featherFalling && f < 0.3) featherAt = seconds
    },
  )
  assert.ok(won(run.log), JSON.stringify(run.log))
  assert.ok(hammerAt !== null && featherAt !== null, "both landed")
  assert.ok(Math.abs(hammerAt! - featherAt!) < 0.03, `landed ${Math.abs(hammerAt! - featherAt!).toFixed(3)} s apart`)
})

// ---------------------------------------------------------------------------
// Mission 5: Bank Shot
// ---------------------------------------------------------------------------

/**
 * Flips gravity on `delay` seconds after the bounce. The bounce is the moment
 * the ball reverses direction; contacts are left alone, they belong to the tracker.
 */
function bankShotPlayer(delay: number): Player {
  let bouncedAt: number | null = null
  return ({ seconds, ball }) => {
    if (bouncedAt === null && ball.velocity.x < 0) bouncedAt = seconds
    return bouncedAt !== null && seconds >= bouncedAt + delay ? ON : null
  }
}

test("Bank Shot validates and bounces the ball off a tilted bumper at 45° down-left", () => {
  const def = getMission("bank-shot")
  assert.deepEqual(validateMission(def), [])
  assert.equal(def.gravity.switchOn, false)
  const world = new GravitySwitchWorld(Matter, def.world, def.gravity)
  let bounced = false
  for (let i = 0; i < 120 * 6 && !bounced; i++) {
    world.stepExactly(1)
    bounced = world.takeContacts().some((contact) => [contact.a, contact.b].includes("obstacle:bumper"))
  }
  assert.ok(bounced, "the drifting ball reaches the bumper")
  world.stepExactly(12)
  const after = world.getObject("ball")!.velocity
  assert.ok(after.x < 0 && after.y > 0, `comes away down-left: ${JSON.stringify(after)}`)
  const ratio = Math.abs(after.x / after.y)
  assert.ok(ratio > 0.8 && ratio < 1.25, `close to 45°: ratio ${ratio.toFixed(2)}`)
  assert.ok(Math.hypot(after.x, after.y) > 2.2, "a springy bumper keeps most of the speed")
  world.dispose()
})

test("Bank Shot: flipping gravity on 0.4 to 1.6 s after the bounce sinks the cup", () => {
  const def = getMission("bank-shot")
  for (const delay of [0.4, 0.8, 1.2, 1.6]) {
    const run = play(def, bankShotPlayer(delay), 25)
    assert.ok(won(run.log), `flip ${delay} s after the bounce: ${JSON.stringify(run.log)}`)
    assert.ok(run.seconds < 15, `won after ${run.seconds.toFixed(1)} s`)
  }
})

test("Bank Shot: never flipping, or flipping far too late, both miss the cup", () => {
  const def = getMission("bank-shot")
  const never = play(def, () => null, 26)
  assert.equal(won(never.log), false)
  assert.equal(lost(never.log)?.reason, "time-limit")
  assert.ok(never.last.position.x < 400, `with gravity off the ball lands short, at x=${never.last.position.x.toFixed(0)}`)
  const late = play(def, bankShotPlayer(2.4), 26)
  assert.equal(won(late.log), false, JSON.stringify(late.log))
  // Flipping the instant it bounces lands on the far lip and can ricochet in.
  // That is honest physics and still needed the switch, so it is not a miss by design.
})

test("a bumper really is springy: 95% of the speed comes back, where a wall returns the ball's own 60%", () => {
  const def = getMission("bank-shot")
  const world = new GravitySwitchWorld(Matter, def.world, def.gravity)
  const bumper = Matter.Composite.allBodies(world.engine.world).find((body) => body.label === "obstacle:bumper")!
  assert.equal(bumper.restitution, 0.95, "set after Matter's static-body reset")
  assert.equal(bumper.friction, 0)
  const lip = Matter.Composite.allBodies(world.engine.world).find((body) => body.label === "obstacle:cup-lip-left")!
  assert.equal(lip.restitution, 0)
  world.dispose()
})

// ---------------------------------------------------------------------------
// Mission 6: Moon Shot
// ---------------------------------------------------------------------------

test("Moon Shot validates and fires the same 4 m/s at 45° on every attempt", () => {
  const def = getMission("moon-shot")
  assert.deepEqual(validateMission(def), [])
  assert.equal(def.switchLocked, true)
  // Measured with gravity off so the first step does not already bend the launch.
  const world = new GravitySwitchWorld(Matter, def.world, { preset: "earth", switchOn: false })
  const launch = () => {
    world.stepExactly(1)
    const v = world.getObject("ball")!.velocity
    return { speed: Math.hypot(v.x, v.y), angle: Math.atan2(v.x, -v.y) }
  }
  const first = launch()
  assert.ok(Math.abs(first.speed - 4) < 0.05, `${first.speed.toFixed(2)} m/s`)
  assert.ok(Math.abs(first.angle - Math.PI / 4) < 0.02, `${((first.angle * 180) / Math.PI).toFixed(1)}°`)
  world.reset()
  const second = launch()
  assert.deepEqual(second, first)
  world.dispose()
})

test("Moon Shot: Earth falls a metre short and fails at once; the Moon reaches the cup", () => {
  const def = getMission("moon-shot")
  const cup = def.world.zones.find((zone) => zone.id === "cup")!
  let farthest = 0
  const earth = play(
    def,
    ({ ball }) => {
      farthest = Math.max(farthest, ball.position.x)
      return null
    },
    20,
  )
  assert.equal(won(earth.log), false)
  assert.equal(lost(earth.log)?.reason, "touch-hazard")
  assert.ok(earth.seconds < 3, `the short shot ends after ${earth.seconds.toFixed(1)} s`)
  assert.ok(farthest < cup.x - 300, `on Earth it only reached x=${farthest.toFixed(0)}, the cup starts at ${cup.x}`)

  const moon = play(def, () => MOON_ON, 20)
  assert.ok(won(moon.log), JSON.stringify(moon.log))
  assert.ok(moon.seconds < 6, `sank after ${moon.seconds.toFixed(1)} s`)

  for (const preset of ["mars", "jupiter"] as const) {
    const run = play(def, () => ({ preset, switchOn: true }), 20)
    assert.equal(won(run.log), false, `${preset} should fall short`)
    assert.equal(lost(run.log)?.reason, "touch-hazard")
  }
})

// ---------------------------------------------------------------------------
// How forgiving are the timed missions? Measured, not assumed.
// ---------------------------------------------------------------------------

/** The longest run of consecutive wins in `samples`, in seconds. */
function widestWindow(samples: { at: number; won: boolean }[], step: number): number {
  let best = 0
  let run = 0
  for (const sample of samples) {
    run = sample.won ? run + 1 : 0
    best = Math.max(best, run)
  }
  return best > 0 ? (best - 1) * step + step : 0
}

test("every timed mission accepts the switch for at least a full second", () => {
  const step = 0.1
  const { def: hang, edgeX, platform } = hangTime()
  const hangWindow = widestWindow(
    Array.from({ length: 13 }, (_, i) => -0.4 + i * step).map((delay) => ({
      at: delay,
      won: won(
        play(
          hang,
          (() => {
            let left: number | null = null
            return ({ seconds, ball }) => {
              if (left === null && ball.position.x > edgeX) left = seconds
              if (ball.position.x >= platform.x + 60) return MOON_ON
              if (delay < 0 && left === null && ball.position.x > edgeX + delay * 100) return MOON_OFF
              if (left !== null && seconds >= left + delay) return MOON_OFF
              return null
            }
          })(),
          25,
        ).log,
      ),
    })),
    step,
  )
  assert.ok(hangWindow >= 1.0, `Hang Time: the off-flip is accepted for ${hangWindow.toFixed(1)} s around the edge`)

  const up = getMission("straight-up")
  const upWindow = widestWindow(
    Array.from({ length: 11 }, (_, i) => i * step).map((at) => ({ at, won: won(play(up, ({ seconds }) => (seconds >= at ? OFF : null), 20).log) })),
    step,
  )
  assert.ok(upWindow >= 0.9, `Straight Up: the off-flip is accepted for ${upWindow.toFixed(1)} s of the rise`)

  const bank = getMission("bank-shot")
  const bankWindow = widestWindow(
    Array.from({ length: 21 }, (_, i) => i * step).map((delay) => ({ at: delay, won: won(play(bank, bankShotPlayer(delay), 26).log) })),
    step,
  )
  assert.ok(bankWindow >= 1.5, `Bank Shot: the on-flip is accepted for ${bankWindow.toFixed(1)} s after the bounce`)
})

test("all six missions validate and read as a gentle difficulty ramp", () => {
  const ids = ["drop-in", "hang-time", "straight-up", "hammer-and-feather", "bank-shot", "moon-shot"] as const
  for (const id of ids) assert.deepEqual(validateMission(getMission(id)), [], id)
  assert.equal(getMission("drop-in").objectives.length, 1)
  assert.equal(getMission("bank-shot").objectives.length, 2)
  for (const id of ids) {
    const def = getMission(id)
    for (const language of ["en", "es", "zh", "pt"] as const) {
      assert.ok(def.text.failure?.[language].trim().length, `${id} explains failure in ${language}`)
    }
  }
})

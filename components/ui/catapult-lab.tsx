"use client"

import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"
import {
  LEVELS,
  levelHasMotion,
  movedPoint,
  movedRect,
  type LevelDefinition,
  type ObstacleDefinition,
} from "./catapult-levels"
import {
  PROJECTILE_SPECS,
  add,
  clamp,
  createProjectile,
  distance,
  integrateProjectile,
  length,
  multiply,
  reflectVelocity,
  segmentCircleCollision,
  segmentExpandedRotatedRectCollision,
  subtract,
  type ProjectileKind,
  type ProjectileState,
  type RotatedRect,
  type SegmentRectHit,
  type Vec,
} from "./catapult-physics"
import { createLevelUpSounds, playRandomLevelUpSound, stopLevelUpSounds } from "./level-up-sounds"

const DEBUG_COLLISION = false

const SVG_W = 960
const SVG_H = 540
const WORLD_SCALE = 8
const GROUND_Y = 500
const WORLD_W = SVG_W / WORLD_SCALE
const WORLD_H = GROUND_Y / WORLD_SCALE
const LAUNCHER: Vec = { x: 8, y: 3.2 }

const MIN_ANGLE = 8
const MAX_ANGLE = 82
const MIN_POWER = 14
const MAX_POWER = 58
const FIXED_STEP = 1 / 90
const MAX_FRAME_DT = 0.055
const MAX_SHOT_TIME = 9.5
const OUT_OF_BOUNDS_X_MARGIN = 90
const OUT_OF_BOUNDS_Y_MARGIN = 130
const RESOLVE_DELAY = 0.42
const EFFECT_LIFE = 0.5
const TRAIL_LIMIT = 180
const MARK_LIMIT = 16
const LAUNCHER_AIM_RADIUS = 16
const SCORE_TARGET_CLEAR = 100
const SCORE_MAX_TIME = 150
const SCORE_TIME_DECAY_SECONDS = 90
const SCORE_REMAINING_SHOT = 50
const SCORE_MULTI_HIT = 75
const SCORE_OBSTACLE_BREAK = 25
const PLAYFIELD_BACKGROUND_SRC = "/Scenic%20outdoor%20landscape%20for%20launch%20game.png"
const TARGET_DESTROY_SOUND_PATHS = [
  "/audio/49053354-explosion-3-307469.mp3",
  "/audio/floraphonic-exploding-building-1-185114.mp3",
  "/audio/flutie8211-bomb-and-echo-2-540400.mp3",
  "/audio/freesound_community-break06-36414.mp3",
  "/audio/freesound_community-rock-destroy-6409.mp3",
  "/audio/freesound_community-table-smash-47690.mp3",
  "/audio/freesound_community-wood-crate-destory-2-97263.mp3",
]
const BOUNCE_SOUND_PATH = "/audio/freesound-community-ball-bounce-94853_5lOSYfqc.mp3"
const GROUND_HIT_SOUND_PATH = "/audio/freesound-community-body-falling-to-ground-100474_sxqzUwRI.mp3"
const CANNON_FIRE_SOUND_PATH = "/audio/lordsonny-cannon-fire-161072_f6xsFbxO.mp3"
const WEAK_WALL_BREAK_SOUND_PATHS = [
  "/audio/freesound_community-wood-crate-destory-2-97263.mp3",
  "/audio/freesound_community-break06-36414.mp3",
  "/audio/freesound_community-table-smash-47690.mp3",
]
const LOSE_SOUND_PATH = "/audio/freesound_community-8bit-lose-life-sound-wav-97245.mp3"
const CATAPULT_PROGRESS_COOKIE = "avanza_catapult_game_progress"
const CATAPULT_PROGRESS_MAX_AGE = 60 * 60 * 24 * 365

type GamePhase = "aiming" | "firing" | "resolving" | "levelComplete" | "levelFailed"

type TargetState = {
  id: string
  x: number
  y: number
  radius: number
  movement?: {
    axis: "x" | "y"
    amplitude: number
    period: number
    phase?: number
  }
  hit: boolean
  hitAt?: number
}

type ObstacleState = ObstacleDefinition & {
  destroyed: boolean
}

type ImpactEffect = {
  id: number
  x: number
  y: number
  age: number
  kind: "hit" | "block" | "break" | "bounce" | "ground"
}

type ImpactMark = {
  id: number
  x: number
  y: number
  kind: ImpactEffect["kind"]
}

type ScoreBreakdown = {
  targetsCleared: number
  targetClear: number
  timeBonus: number
  multiHitBonus: number
  obstacleBreakBonus: number
  remainingShotBonus: number
}

type LevelResult = ScoreBreakdown & {
  finalScore: number
  shotsUsed: number
  shotLimit: number
  totalTargets: number
  targetsLeft: number
  reason?: string
}

type ActiveShot = {
  kind: ProjectileKind
  angle: number
  power: number
  projectile: ProjectileState
  hitsThisShot: number
  resolution: string | null
}

type GameState = {
  levelIndex: number
  phase: GamePhase
  sceneTime: number
  firstShotSceneTime: number | null
  shotsUsed: number
  score: number
  scoreBreakdown: ScoreBreakdown
  status: string
  targets: TargetState[]
  obstacles: ObstacleState[]
  trail: Vec[]
  projectile: ProjectileState | null
  activeShot: ActiveShot | null
  effects: ImpactEffect[]
  impactMarks: ImpactMark[]
  resolveTimer: number
  nextPhase: GamePhase | null
  lastSegment: { from: Vec; to: Vec } | null
  result: LevelResult | null
}

type CatapultProgressCookie = {
  levelIndex: number
  completedLevelIndexes: number[]
  bestScores: Record<number, number>
}

type ShotSettings = {
  angle: number
  power: number
  kind: ProjectileKind
}

type ObstacleHit = {
  obstacle: ObstacleState
  collision: SegmentRectHit
}

type TerminalHit = {
  kind: "ground" | "obstacle"
  point: Vec
  normal: Vec
  t: number
  obstacle?: ObstacleState
}

let effectId = 0

export function CatapultLab() {
  const [game, setGame] = useState<GameState>(() => createLevelState(0))
  const [angle, setAngle] = useState(LEVELS[0].startAngle)
  const [power, setPower] = useState(LEVELS[0].startPower)
  const [projectileKind, setProjectileKind] = useState<ProjectileKind>(
    LEVELS[0].startProjectile ?? "standard",
  )
  const [dragPoint, setDragPoint] = useState<Vec | null>(null)
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set())
  const [bestScores, setBestScores] = useState<Record<number, number>>({})
  const svgRef = useRef<SVGSVGElement | null>(null)
  const gameRef = useRef(game)
  const targetSoundsRef = useRef<HTMLAudioElement[]>([])
  const weakWallBreakSoundsRef = useRef<HTMLAudioElement[]>([])
  const bounceSoundRef = useRef<HTMLAudioElement | null>(null)
  const groundHitSoundRef = useRef<HTMLAudioElement | null>(null)
  const cannonFireSoundRef = useRef<HTMLAudioElement | null>(null)
  const loseSoundRef = useRef<HTMLAudioElement | null>(null)
  const winSoundsRef = useRef<HTMLAudioElement[]>([])
  const nextTargetSoundRef = useRef(0)
  const nextWeakWallBreakSoundRef = useRef(0)
  const audioUnlockedRef = useRef(false)
  const playedHitEffectIdsRef = useRef<Set<number>>(new Set())
  const playedBreakEffectIdsRef = useRef<Set<number>>(new Set())
  const playedBounceEffectIdsRef = useRef<Set<number>>(new Set())
  const playedGroundEffectIdsRef = useRef<Set<number>>(new Set())
  const completedLevelSoundIdsRef = useRef<Set<number>>(new Set())
  const previousPhaseRef = useRef<GamePhase>(game.phase)
  const progressReadyRef = useRef(false)
  const dragRef = useRef<{
    active: boolean
    pointerId: number | null
    moved: boolean
    lastSettings: ShotSettings | null
  }>({
    active: false,
    pointerId: null,
    moved: false,
    lastSettings: null,
  })

  const level = LEVELS[game.levelIndex]
  const selectedProjectileKind = level.allowedProjectiles.includes(projectileKind)
    ? projectileKind
    : (level.startProjectile ?? level.allowedProjectiles[0] ?? "standard")
  const spec = PROJECTILE_SPECS[selectedProjectileKind]
  const canAim = game.phase === "aiming"
  const targetsHit = game.targets.filter((target) => target.hit).length
  const shotsRemaining = Math.max(0, level.shotLimit - game.shotsUsed)
  const bestScore = bestScores[game.levelIndex]

  useEffect(() => {
    gameRef.current = game
  }, [game])

  useEffect(() => {
    const progress = readCatapultProgressCookie()
    const timeout = window.setTimeout(() => {
      if (progress) {
        const restoredCompletedLevels = new Set(progress.completedLevelIndexes)
        setCompletedLevels(restoredCompletedLevels)
        setBestScores(progress.bestScores)
        restartLevel(getResumeLevelIndex(progress.levelIndex, restoredCompletedLevels))
      }
      progressReadyRef.current = true
    }, 0)

    return () => window.clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    targetSoundsRef.current = TARGET_DESTROY_SOUND_PATHS.map((src) => {
      const audio = new Audio(src)
      audio.preload = "auto"
      audio.volume = 0.65
      return audio
    })

    weakWallBreakSoundsRef.current = WEAK_WALL_BREAK_SOUND_PATHS.map((src) => {
      const audio = new Audio(src)
      audio.preload = "auto"
      audio.volume = 0.72
      return audio
    })

    const bounceAudio = new Audio(BOUNCE_SOUND_PATH)
    bounceAudio.preload = "auto"
    bounceAudio.volume = 0.55
    bounceSoundRef.current = bounceAudio

    const groundHitAudio = new Audio(GROUND_HIT_SOUND_PATH)
    groundHitAudio.preload = "auto"
    groundHitAudio.volume = 0.58
    groundHitSoundRef.current = groundHitAudio

    const cannonFireAudio = new Audio(CANNON_FIRE_SOUND_PATH)
    cannonFireAudio.preload = "auto"
    cannonFireAudio.volume = 0.62
    cannonFireSoundRef.current = cannonFireAudio

    const loseAudio = new Audio(LOSE_SOUND_PATH)
    loseAudio.preload = "auto"
    loseAudio.volume = 0.65
    loseSoundRef.current = loseAudio

    winSoundsRef.current = createLevelUpSounds(0.7)
  }, [])

  useEffect(() => {
    const hitEffects = game.effects.filter(
      (effect) => effect.kind === "hit" && !playedHitEffectIdsRef.current.has(effect.id),
    )
    if (hitEffects.length === 0) return

    for (const effect of hitEffects) {
      playedHitEffectIdsRef.current.add(effect.id)
      playNextSound(targetSoundsRef.current, nextTargetSoundRef)
    }
  }, [game.effects])

  useEffect(() => {
    const breakEffects = game.effects.filter(
      (effect) => effect.kind === "break" && !playedBreakEffectIdsRef.current.has(effect.id),
    )
    if (breakEffects.length === 0) return

    for (const effect of breakEffects) {
      playedBreakEffectIdsRef.current.add(effect.id)
      playNextSound(weakWallBreakSoundsRef.current, nextWeakWallBreakSoundRef)
    }
  }, [game.effects])

  useEffect(() => {
    const bounceEffects = game.effects.filter(
      (effect) => effect.kind === "bounce" && !playedBounceEffectIdsRef.current.has(effect.id),
    )
    if (bounceEffects.length === 0) return

    for (const effect of bounceEffects) {
      playedBounceEffectIdsRef.current.add(effect.id)
      playSingleSound(bounceSoundRef.current)
    }
  }, [game.effects])

  useEffect(() => {
    const groundEffects = game.effects.filter(
      (effect) => effect.kind === "ground" && !playedGroundEffectIdsRef.current.has(effect.id),
    )
    if (groundEffects.length === 0) return

    for (const effect of groundEffects) {
      playedGroundEffectIdsRef.current.add(effect.id)
      playSingleSound(groundHitSoundRef.current)
    }
  }, [game.effects])

  useEffect(() => {
    if (game.phase !== "levelComplete") return
    if (completedLevelSoundIdsRef.current.has(game.levelIndex)) return

    completedLevelSoundIdsRef.current.add(game.levelIndex)
    playRandomLevelUpSound(winSoundsRef.current)
  }, [game.levelIndex, game.phase])

  useEffect(() => {
    const previousPhase = previousPhaseRef.current
    previousPhaseRef.current = game.phase

    if (previousPhase === "levelFailed" || game.phase !== "levelFailed") return
    playSingleSound(loseSoundRef.current)
  }, [game.phase])

  useEffect(() => {
    if (game.phase !== "levelComplete" || !game.result) return

    const completedLevelIndex = game.levelIndex
    const finalScore = game.result.finalScore
    const timeout = window.setTimeout(() => {
      setCompletedLevels((previous) => {
        if (previous.has(completedLevelIndex)) return previous
        const next = new Set(previous)
        next.add(completedLevelIndex)
        return next
      })

      setBestScores((previous) => {
        const currentBest = previous[completedLevelIndex] ?? 0
        if (currentBest >= finalScore) return previous
        return { ...previous, [completedLevelIndex]: finalScore }
      })
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [game.levelIndex, game.phase, game.result])

  useEffect(() => {
    if (!progressReadyRef.current) return

    writeCatapultProgressCookie({
      levelIndex: game.levelIndex,
      completedLevelIndexes: Array.from(completedLevels).sort((a, b) => a - b),
      bestScores,
    })
  }, [bestScores, completedLevels, game.levelIndex])

  useEffect(() => {
    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = clamp((now - last) / 1000, 0, MAX_FRAME_DT)
      last = now

      setGame((previous) => {
        const next = advanceGame(previous, dt)
        gameRef.current = next
        return next
      })

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement
      ) {
        return
      }

      const current = gameRef.current
      const key = event.key.toLowerCase()
      unlockAudio()

      if (key === "r") {
        event.preventDefault()
        restartLevel()
        return
      }

      if (key === "n") {
        event.preventDefault()
        nextLevel()
        return
      }

      if (key === " " && current.phase === "aiming") {
        event.preventDefault()
        launchShot({ angle, power, kind: selectedProjectileKind })
        return
      }

      if (current.phase !== "aiming") return

      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault()
        setAngle((value) =>
          clamp(value + (event.key === "ArrowRight" ? 1 : -1), MIN_ANGLE, MAX_ANGLE),
        )
      }

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault()
        setPower((value) =>
          clamp(value + (event.key === "ArrowUp" ? 1 : -1), MIN_POWER, MAX_POWER),
        )
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  })

  const visibleTargets = useMemo(
    () =>
      game.targets.map((target) => ({
        ...target,
        position: movedPoint({ x: target.x, y: target.y }, target.movement, game.sceneTime),
      })),
    [game.sceneTime, game.targets],
  )

  const visibleObstacles = useMemo(
    () =>
      game.obstacles.map((obstacle) => ({
        ...obstacle,
        rect: movedRect(obstacle, obstacle.movement, game.sceneTime),
      })),
    [game.obstacles, game.sceneTime],
  )

  const predictionPath = useMemo(
    () =>
      simulatePrediction(
        { angle, power, kind: selectedProjectileKind },
        level,
        game.obstacles,
        level.prediction,
        game.sceneTime,
      ),
    [angle, game.obstacles, game.sceneTime, level, power, selectedProjectileKind],
  )

  function updateGame(updater: (previous: GameState) => GameState) {
    setGame((previous) => {
      const next = updater(previous)
      gameRef.current = next
      return next
    })
  }

  function launchShot(settings: ShotSettings = { angle, power, kind: selectedProjectileKind }) {
    unlockAudio()
    const current = gameRef.current
    if (current.phase !== "aiming") return
    const currentLevel = LEVELS[current.levelIndex]
    const allowedKind = currentLevel.allowedProjectiles.includes(settings.kind)
      ? settings.kind
      : (currentLevel.startProjectile ?? currentLevel.allowedProjectiles[0] ?? "standard")

    const locked = {
      angle: clamp(Math.round(settings.angle), MIN_ANGLE, MAX_ANGLE),
      power: clamp(Math.round(settings.power), MIN_POWER, MAX_POWER),
      kind: allowedKind,
    }
    const activeProjectile = createProjectile(
      locked.angle,
      locked.power,
      LAUNCHER,
      PROJECTILE_SPECS[locked.kind].launchSpeedScale,
    )
    playSingleSound(cannonFireSoundRef.current)

    updateGame((previous) => {
      if (previous.phase !== "aiming") return previous

      return {
        ...previous,
        phase: "firing",
        firstShotSceneTime: previous.firstShotSceneTime ?? previous.sceneTime,
        shotsUsed: previous.shotsUsed + 1,
        status: "In flight.",
        trail: [activeProjectile.position],
        projectile: activeProjectile,
        activeShot: {
          ...locked,
          projectile: activeProjectile,
          hitsThisShot: 0,
          resolution: null,
        },
        resolveTimer: 0,
        nextPhase: null,
        lastSegment: null,
        result: null,
      }
    })
  }

  function restartLevel(index = gameRef.current.levelIndex) {
    const nextLevel = LEVELS[index]
    setAngle(nextLevel.startAngle)
    setPower(nextLevel.startPower)
    setProjectileKind(nextLevel.startProjectile ?? nextLevel.allowedProjectiles[0] ?? "standard")
    setDragPoint(null)
    dragRef.current = { active: false, pointerId: null, moved: false, lastSettings: null }
    updateGame(() => createLevelState(index))
  }

  function nextLevel() {
    const current = gameRef.current
    if (current.phase !== "levelComplete" || current.levelIndex >= LEVELS.length - 1) return
    stopLevelUpSounds(winSoundsRef.current)
    restartLevel(current.levelIndex + 1)
  }

  function unlockAudio() {
    if (audioUnlockedRef.current) return

    const sounds = [
      ...targetSoundsRef.current,
      ...weakWallBreakSoundsRef.current,
      bounceSoundRef.current,
      groundHitSoundRef.current,
      cannonFireSoundRef.current,
      loseSoundRef.current,
      ...winSoundsRef.current,
    ].filter((sound): sound is HTMLAudioElement => Boolean(sound))

    if (!sounds.length) return
    audioUnlockedRef.current = true

    for (const sound of sounds) {
      const primer = sound.cloneNode() as HTMLAudioElement
      primer.muted = true
      primer.volume = 0
      primer.currentTime = 0
      void primer
        .play()
        .then(() => {
          primer.pause()
          primer.currentTime = 0
        })
        .catch(() => {})
    }
  }

  function setAimFromWorld(point: Vec) {
    const next = aimFromDragPoint(point)
    setAngle(next.angle)
    setPower(next.power)
    return next
  }

  function handlePointerDown(event: PointerEvent<SVGSVGElement>) {
    unlockAudio()
    if (!canAim) return

    const world = eventToWorld(event)
    if (distance(world, LAUNCHER) > LAUNCHER_AIM_RADIUS) return

    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      moved: false,
      lastSettings: null,
    }
    setDragPoint(world)
  }

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    const drag = dragRef.current
    if (!drag.active || drag.pointerId !== event.pointerId) return

    const world = eventToWorld(event)
    const next = setAimFromWorld(world)
    dragRef.current = {
      ...drag,
      moved: drag.moved || next.pullDistance > 2.2,
      lastSettings: { angle: next.angle, power: next.power, kind: selectedProjectileKind },
    }
    setDragPoint(world)
  }

  function handlePointerUp(event: PointerEvent<SVGSVGElement>) {
    const drag = dragRef.current
    if (!drag.active || drag.pointerId !== event.pointerId) return

    const world = eventToWorld(event)
    const next = setAimFromWorld(world)
    const shouldFire = drag.moved || next.pullDistance > 2.2

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    dragRef.current = { active: false, pointerId: null, moved: false, lastSettings: null }
    setDragPoint(null)

    if (shouldFire) {
      launchShot({ angle: next.angle, power: next.power, kind: selectedProjectileKind })
    }
  }

  function handlePointerCancel(event: PointerEvent<SVGSVGElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    dragRef.current = { active: false, pointerId: null, moved: false, lastSettings: null }
    setDragPoint(null)
  }

  function eventToWorld(event: PointerEvent<SVGSVGElement>): Vec {
    const svg = svgRef.current
    if (!svg) return LAUNCHER

    const rect = svg.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * SVG_W
    const y = ((event.clientY - rect.top) / rect.height) * SVG_H

    return {
      x: clamp(x / WORLD_SCALE, 0, WORLD_W),
      y: clamp((GROUND_Y - y) / WORLD_SCALE, 0, WORLD_H),
    }
  }

  const projectilePosition = game.projectile?.position

  return (
    <section className="bg-[#f7f8f5] py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <FadeIn>
          <div className="border border-[#d6d8d2] bg-white">
            <div className="grid gap-4 border-b border-[#d6d8d2] px-4 py-4 md:grid-cols-[1fr_auto] md:items-end md:px-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6d746b]">
                  Level {game.levelIndex + 1} of {LEVELS.length}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold leading-tight text-[#1d211c] md:text-3xl">
                  {level.name}
                </h2>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#5c6259]">
                  {level.objective}
                </p>
                {level.hint && (
                  <p className="mt-1 max-w-2xl text-xs font-bold leading-relaxed text-[#6a5a4d]">
                    {level.hint}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-4 border border-[#d6d8d2] text-sm md:min-w-[520px]">
                <TopStat label="Targets" value={`${targetsHit}/${game.targets.length}`} />
                <TopStat label="Shots" value={`${game.shotsUsed}/${level.shotLimit}`} />
                <TopStat label="Score" value={String(game.score)} />
                <TopStat label="Best" value={bestScore === undefined ? "--" : String(bestScore)} />
              </div>
            </div>

            <div className="bg-[#eef0e9] p-2 md:p-4">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                className={cn(
                  "block aspect-[16/9] w-full touch-none border border-[#c9ccc4] bg-transparent",
                  canAim && "cursor-crosshair",
                )}
                role="img"
                aria-label="Projectile puzzle playfield"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
              >
                <image
                  href={PLAYFIELD_BACKGROUND_SRC}
                  width={SVG_W}
                  height={SVG_H}
                  preserveAspectRatio="xMidYMid slice"
                  pointerEvents="none"
                />
                <rect width={SVG_W} height={SVG_H} fill="#f8faf7" opacity="0.05" pointerEvents="none" />
                <PlayfieldGrid />
                <rect
                  y={GROUND_Y}
                  width={SVG_W}
                  height={SVG_H - GROUND_Y}
                  fill="#dfe7d2"
                  opacity="0.28"
                  pointerEvents="none"
                />
                <line
                  x1="0"
                  y1={GROUND_Y}
                  x2={SVG_W}
                  y2={GROUND_Y}
                  stroke="#6f7c68"
                  strokeWidth="2"
                  pointerEvents="none"
                />

                {game.phase === "aiming" && predictionPath.length > 1 && (
                  <polyline
                    points={predictionPath.map((point) => toSvgPair(point)).join(" ")}
                    fill="none"
                    stroke="#59615a"
                    strokeDasharray="6 8"
                    strokeLinecap="round"
                    strokeOpacity="0.38"
                    strokeWidth="2.5"
                  />
                )}

                {game.trail.length > 1 && <Trail points={game.trail} />}

                {level.targets.map((target) =>
                  target.movement ? (
                    <MotionPath
                      key={`${target.id}-motion`}
                      x={target.x}
                      y={target.y}
                      movement={target.movement}
                    />
                  ) : null,
                )}

                {level.obstacles.map((obstacle) =>
                  obstacle.movement ? (
                    <MotionPath
                      key={`${obstacle.id}-motion`}
                      x={obstacle.x + obstacle.width / 2}
                      y={obstacle.y + obstacle.height / 2}
                      movement={obstacle.movement}
                    />
                  ) : null,
                )}

                {visibleObstacles.map((obstacle) =>
                  obstacle.destroyed ? null : (
                    <ObstacleBlock key={obstacle.id} obstacle={obstacle} rect={obstacle.rect} />
                  ),
                )}

                {game.impactMarks.map((mark) => (
                  <ImpactMarkView key={mark.id} mark={mark} />
                ))}

                {visibleTargets.map((target) => (
                  <TargetMarker
                    key={target.id}
                    center={target.position}
                    radius={target.radius}
                    hit={target.hit}
                    hitAt={target.hitAt}
                    sceneTime={game.sceneTime}
                  />
                ))}

                {game.effects.map((effect) => (
                  <ImpactBurst key={effect.id} effect={effect} />
                ))}

                {dragPoint && canAim && (
                  <g>
                    <line
                      x1={toSvgX(LAUNCHER)}
                      y1={toSvgY(LAUNCHER)}
                      x2={toSvgX(dragPoint)}
                      y2={toSvgY(dragPoint)}
                      stroke="#d96d1f"
                      strokeDasharray="5 5"
                      strokeWidth="2"
                    />
                    <circle
                      cx={toSvgX(dragPoint)}
                      cy={toSvgY(dragPoint)}
                      r="7"
                      fill="#fffdf7"
                      stroke="#d96d1f"
                      strokeWidth="2"
                    />
                  </g>
                )}

                {projectilePosition && (
                  <circle
                    cx={toSvgX(projectilePosition)}
                    cy={toSvgY(projectilePosition)}
                    r={
                      (game.activeShot ? PROJECTILE_SPECS[game.activeShot.kind] : spec).radius *
                      WORLD_SCALE
                    }
                    fill="#d96d1f"
                    stroke="#1d211c"
                    strokeWidth="1.5"
                  />
                )}

                <g>
                  <Cannon angle={angle} origin={LAUNCHER} />
                  <circle
                    cx={toSvgX(LAUNCHER)}
                    cy={toSvgY(LAUNCHER)}
                    r="72"
                    fill="transparent"
                    pointerEvents={canAim ? "all" : "none"}
                  />
                </g>

                {DEBUG_COLLISION && (
                  <DebugOverlay
                    targets={visibleTargets}
                    projectile={game.projectile}
                    projectileRadius={(game.activeShot ? PROJECTILE_SPECS[game.activeShot.kind] : spec).radius}
                    lastSegment={game.lastSegment}
                  />
                )}
              </svg>
            </div>

            {(game.phase === "levelComplete" || game.phase === "levelFailed") && game.result && (
              <ResultPanel
                phase={game.phase}
                result={game.result}
                levelIndex={game.levelIndex}
                isLastLevel={game.levelIndex >= LEVELS.length - 1}
                onRetry={() => restartLevel()}
                onNext={nextLevel}
              />
            )}

            <div className="grid gap-3 border-t border-[#d6d8d2] bg-white px-4 py-4 lg:grid-cols-[1fr_auto] lg:items-center md:px-5">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <Readout label="Angle" value={`${angle} deg`} />
                <Readout label="Power" value={`${power} m/s`} />
                <Readout label="Projectile" value={PROJECTILE_SPECS[selectedProjectileKind].label} />
                <Readout label="Shots Left" value={String(shotsRemaining)} />
              </div>

              <div className="flex flex-wrap gap-2 lg:justify-end">
                <button
                  type="button"
                  onPointerDown={unlockAudio}
                  onClick={() => launchShot()}
                  disabled={!canAim}
                  className="border border-[#1d211c] bg-[#d96d1f] px-4 py-2 text-sm font-extrabold text-white transition hover:enabled:bg-[#c65f18] disabled:cursor-not-allowed disabled:border-[#b8bbb4] disabled:bg-[#d7d9d3] disabled:text-[#73786f]"
                >
                  Fire
                </button>
              </div>
            </div>

            <div className="grid gap-4 border-t border-[#d6d8d2] px-4 py-4 md:grid-cols-[1fr_1.25fr] md:px-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <ControlSlider
                  label="Angle"
                  value={angle}
                  min={MIN_ANGLE}
                  max={MAX_ANGLE}
                  unit=" deg"
                  disabled={!canAim}
                  onChange={setAngle}
                />
                <ControlSlider
                  label="Power"
                  value={power}
                  min={MIN_POWER}
                  max={MAX_POWER}
                  unit=" m/s"
                  disabled={!canAim}
                  onChange={setPower}
                />
              </div>

              <div className="grid gap-3">
                <ProjectilePicker
                  allowed={level.allowedProjectiles}
                  value={selectedProjectileKind}
                  disabled={!canAim}
                  onChange={setProjectileKind}
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function createLevelState(levelIndex: number): GameState {
  const level = LEVELS[levelIndex]

  return {
    levelIndex,
    phase: "aiming",
    sceneTime: 0,
    firstShotSceneTime: null,
    shotsUsed: 0,
    score: 0,
    scoreBreakdown: emptyScoreBreakdown(),
    status: level.hint ?? level.objective,
    targets: level.targets.map((target) => ({ ...target, hit: false })),
    obstacles: level.obstacles.map((obstacle) => ({ ...obstacle, destroyed: false })),
    trail: [],
    projectile: null,
    activeShot: null,
    effects: [],
    impactMarks: [],
    resolveTimer: 0,
    nextPhase: null,
    lastSegment: null,
    result: null,
  }
}

function readCatapultProgressCookie(): CatapultProgressCookie | null {
  if (typeof document === "undefined") return null
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${CATAPULT_PROGRESS_COOKIE}=`))
  if (!cookie) return null

  try {
    const raw = decodeURIComponent(cookie.slice(CATAPULT_PROGRESS_COOKIE.length + 1))
    const parsed = JSON.parse(raw) as Partial<CatapultProgressCookie>
    if (typeof parsed.levelIndex !== "number") return null

    const completedLevelIndexes = Array.from(
      new Set(
        (Array.isArray(parsed.completedLevelIndexes) ? parsed.completedLevelIndexes : []).filter(
          isValidLevelIndex,
        ),
      ),
    )
    const bestScores: Record<number, number> = {}

    if (
      parsed.bestScores &&
      typeof parsed.bestScores === "object" &&
      !Array.isArray(parsed.bestScores)
    ) {
      for (const [key, value] of Object.entries(parsed.bestScores)) {
        const levelIndex = Number(key)
        if (!isValidLevelIndex(levelIndex) || typeof value !== "number" || !Number.isFinite(value)) {
          continue
        }
        bestScores[levelIndex] = Math.max(0, Math.round(value))
      }
    }

    return {
      levelIndex: clampLevelIndex(parsed.levelIndex),
      completedLevelIndexes,
      bestScores,
    }
  } catch {
    return null
  }
}

function writeCatapultProgressCookie(progress: CatapultProgressCookie) {
  if (typeof document === "undefined") return

  const safeProgress: CatapultProgressCookie = {
    levelIndex: clampLevelIndex(progress.levelIndex),
    completedLevelIndexes: Array.from(new Set(progress.completedLevelIndexes.filter(isValidLevelIndex))),
    bestScores: Object.fromEntries(
      Object.entries(progress.bestScores)
        .map(([key, value]) => [Number(key), value] as const)
        .filter(
          ([levelIndex, value]) =>
            isValidLevelIndex(levelIndex) && typeof value === "number" && Number.isFinite(value),
        )
        .map(([levelIndex, value]) => [levelIndex, Math.max(0, Math.round(value))]),
    ),
  }
  const value = encodeURIComponent(JSON.stringify(safeProgress))
  document.cookie = `${CATAPULT_PROGRESS_COOKIE}=${value}; Max-Age=${CATAPULT_PROGRESS_MAX_AGE}; Path=/; SameSite=Lax`
}

function isValidLevelIndex(levelIndex: unknown): levelIndex is number {
  return (
    typeof levelIndex === "number" &&
    Number.isInteger(levelIndex) &&
    levelIndex >= 0 &&
    levelIndex < LEVELS.length
  )
}

function clampLevelIndex(levelIndex: number) {
  return Math.min(Math.max(Math.round(levelIndex), 0), LEVELS.length - 1)
}

function getUnlockedLevelIndex(completedLevelIndexes: Set<number>) {
  return LEVELS.reduce((highestUnlockedIndex, _level, levelIndex) => {
    if (!completedLevelIndexes.has(levelIndex)) return highestUnlockedIndex
    return Math.max(highestUnlockedIndex, Math.min(levelIndex + 1, LEVELS.length - 1))
  }, 0)
}

function getResumeLevelIndex(savedLevelIndex: number, completedLevelIndexes: Set<number>) {
  const safeSavedLevelIndex = clampLevelIndex(savedLevelIndex)
  const unlockedLevelIndex = getUnlockedLevelIndex(completedLevelIndexes)

  if (completedLevelIndexes.has(safeSavedLevelIndex) && safeSavedLevelIndex < unlockedLevelIndex) {
    return Math.min(safeSavedLevelIndex + 1, unlockedLevelIndex)
  }

  return Math.min(safeSavedLevelIndex, unlockedLevelIndex)
}

function playNextSound(sounds: HTMLAudioElement[], nextSoundRef: { current: number }) {
  if (sounds.length === 0) return

  const sound = sounds[nextSoundRef.current % sounds.length]
  nextSoundRef.current = (nextSoundRef.current + 1) % sounds.length
  sound.currentTime = 0
  void sound.play().catch(() => {
    // Browsers can block audio if the shot was not started by a user gesture.
  })
}

function playSingleSound(sound: HTMLAudioElement | null) {
  if (!sound) return

  sound.currentTime = 0
  void sound.play().catch(() => {
    // Browsers can block audio if the shot was not started by a user gesture.
  })
}

function advanceGame(state: GameState, dt: number): GameState {
  const level = LEVELS[state.levelIndex]
  const agedEffects = ageEffects(state.effects, dt)

  if (state.phase === "firing" && state.activeShot) {
    let next: GameState = { ...state, effects: agedEffects }
    let remaining = dt

    while (remaining > 0 && next.phase === "firing" && next.activeShot) {
      const step = Math.min(FIXED_STEP, remaining)
      next = advanceShot(next, step)
      remaining -= step
    }

    return next
  }

  if (state.phase === "resolving") {
    const timer = Math.max(0, state.resolveTimer - dt)
    if (timer > 0) {
      return {
        ...state,
        sceneTime: state.sceneTime + dt,
        effects: agedEffects,
        resolveTimer: timer,
      }
    }

    const nextPhase = state.nextPhase ?? "aiming"
    return {
      ...state,
      phase: nextPhase,
      sceneTime: state.sceneTime + dt,
      effects: agedEffects,
      resolveTimer: 0,
      nextPhase: null,
      status:
        nextPhase === "levelFailed"
          ? state.result?.reason ?? "No shots remaining."
          : nextPhase === "levelComplete"
            ? state.levelIndex === LEVELS.length - 1
              ? "Final line clear."
              : "Level clear."
            : state.status,
    }
  }

  if (levelHasMotion(level) || agedEffects !== state.effects) {
    return {
      ...state,
      sceneTime: state.sceneTime + dt,
      effects: agedEffects,
    }
  }

  return state
}

function advanceShot(state: GameState, dt: number): GameState {
  const shot = state.activeShot
  if (!shot) return state

  const spec = PROJECTILE_SPECS[shot.kind]
  const previousPosition = shot.projectile.position
  let nextProjectile = integrateProjectile(shot.projectile, spec, dt)
  const currentPosition = nextProjectile.position
  const sceneTime = state.sceneTime + dt
  const obstacleHits = getObstacleHits(
    previousPosition,
    currentPosition,
    state.obstacles,
    spec.radius,
    sceneTime,
  )
  const groundHit = getGroundHit(previousPosition, currentPosition, spec.radius)
  const terminalHit = getTerminalHit(obstacleHits, groundHit, spec.canBreakWeak)
  const collisionLimit = terminalHit?.t ?? 1
  const breakHits = spec.canBreakWeak
    ? obstacleHits.filter(
        (hit) =>
          hit.obstacle.kind === "weak" &&
          hit.collision.t <= collisionLimit &&
          !hit.obstacle.destroyed,
      )
    : []

  let targets = state.targets
  let obstacles = state.obstacles
  let effects = state.effects
  let impactMarks = state.impactMarks
  let score = state.score
  let scoreBreakdown = state.scoreBreakdown
  let hitsThisShot = shot.hitsThisShot
  let resolution = shot.resolution
  let status = resolution ?? state.status

  for (const target of targets) {
    if (target.hit) continue

    const center = movedPoint({ x: target.x, y: target.y }, target.movement, sceneTime)
    const hit = segmentCircleCollision(
      previousPosition,
      currentPosition,
      center,
      target.radius + spec.radius,
    )

    if (!hit.hit || hit.t > collisionLimit + 0.0001) continue

    const multiHitBonus = hitsThisShot > 0 ? SCORE_MULTI_HIT : 0
    scoreBreakdown = addScoreBreakdown(scoreBreakdown, {
      targetsCleared: 1,
      targetClear: SCORE_TARGET_CLEAR,
      multiHitBonus,
    })
    score = scoreFromBreakdown(scoreBreakdown)
    hitsThisShot += 1
    resolution = formatTargetResolution(hitsThisShot)
    status = resolution
    targets = targets.map((current) =>
      current.id === target.id ? { ...current, hit: true, hitAt: sceneTime } : current,
    )
    const hitEffect = {
      id: effectId++,
      x: hit.point.x,
      y: hit.point.y,
      age: 0,
      kind: "hit" as const,
    }
    effects = [
      ...effects,
      hitEffect,
    ]
    impactMarks = appendImpactMark(impactMarks, hitEffect)
  }

  if (breakHits.length > 0) {
    const brokenIds = new Set(breakHits.map((hit) => hit.obstacle.id))
    obstacles = obstacles.map((obstacle) =>
      brokenIds.has(obstacle.id) ? { ...obstacle, destroyed: true } : obstacle,
    )
    const breakEffects = breakHits.map((hit) => ({
        id: effectId++,
        x: hit.collision.point.x,
        y: hit.collision.point.y,
        age: 0,
        kind: "break" as const,
      }))
    effects = [...effects, ...breakEffects]
    impactMarks = breakEffects.reduce(appendImpactMark, impactMarks)
    scoreBreakdown = addScoreBreakdown(scoreBreakdown, {
      obstacleBreakBonus: breakHits.length * SCORE_OBSTACLE_BREAK,
    })
    score = scoreFromBreakdown(scoreBreakdown)
    nextProjectile = {
      ...nextProjectile,
      velocity: multiply(nextProjectile.velocity, 0.86),
    }
    resolution = resolution ?? "Cover broken."
    status = resolution
  }

  const nextTrail = appendTrail(state.trail, terminalHit?.point ?? nextProjectile.position)
  const allTargetsHit = targets.every((target) => target.hit)

  if (terminalHit) {
    const groundHitCount =
      terminalHit.kind === "ground" ? nextProjectile.groundHits + 1 : nextProjectile.groundHits
    const canBounce =
      shot.kind === "bouncy" && nextProjectile.bouncesUsed < spec.maxBounces

    if (canBounce) {
      const bounced = {
        ...nextProjectile,
        position: add(terminalHit.point, multiply(terminalHit.normal, 0.05)),
        velocity: reflectVelocity(nextProjectile.velocity, terminalHit.normal, spec.restitution),
        bouncesUsed: nextProjectile.bouncesUsed + 1,
        groundHits: groundHitCount,
      }
      const bounceEffect = {
        id: effectId++,
        x: terminalHit.point.x,
        y: terminalHit.point.y,
        age: 0,
        kind: "bounce" as const,
      }

      return {
        ...state,
        sceneTime,
        targets,
        obstacles,
        effects: [...effects, bounceEffect],
        impactMarks: appendImpactMark(impactMarks, bounceEffect),
        score,
        scoreBreakdown,
        status: "Bounce used.",
        trail: nextTrail,
        projectile: bounced,
        activeShot: { ...shot, projectile: bounced, hitsThisShot, resolution },
        lastSegment: { from: previousPosition, to: terminalHit.point },
      }
    }

    const message = resolution ?? classifyTerminalHit(terminalHit, targets, shot.kind, spec)
    const resolvedProjectile = {
      ...nextProjectile,
      position: terminalHit.point,
      groundHits: groundHitCount,
    }
    const terminalEffect = {
      id: effectId++,
      x: terminalHit.point.x,
      y: terminalHit.point.y,
      age: 0,
      kind: terminalHit.kind === "obstacle" ? ("block" as const) : ("ground" as const),
    }

    return finishShot(
      {
        ...state,
        sceneTime,
        targets,
        obstacles,
        effects: [...effects, terminalEffect],
        impactMarks: appendImpactMark(impactMarks, terminalEffect),
        score,
        scoreBreakdown,
        status: message,
        trail: nextTrail,
        projectile: resolvedProjectile,
        activeShot: { ...shot, projectile: resolvedProjectile, hitsThisShot, resolution },
        lastSegment: { from: previousPosition, to: terminalHit.point },
      },
      message,
    )
  }

  if (allTargetsHit) {
    return finishShot(
      {
        ...state,
        sceneTime,
        targets,
        obstacles,
        effects,
        impactMarks,
        score,
        scoreBreakdown,
        status: resolution ?? "Target cleared.",
        trail: nextTrail,
        projectile: nextProjectile,
        activeShot: { ...shot, projectile: nextProjectile, hitsThisShot, resolution },
        lastSegment: { from: previousPosition, to: currentPosition },
      },
      resolution ?? "Target cleared.",
    )
  }

  if (isOutOfBounds(nextProjectile.position)) {
    const message = resolution ?? classifyMiss(nextProjectile.position, targets)

    return finishShot(
      {
        ...state,
        sceneTime,
        targets,
        obstacles,
        effects,
        impactMarks,
        score,
        scoreBreakdown,
        status: message,
        trail: nextTrail,
        projectile: nextProjectile,
        activeShot: { ...shot, projectile: nextProjectile, hitsThisShot, resolution },
        lastSegment: { from: previousPosition, to: currentPosition },
      },
      message,
    )
  }

  if (
    length(nextProjectile.velocity) < 1.1 &&
    nextProjectile.position.y < spec.radius + 0.5
  ) {
    const message =
      resolution ??
      (shot.kind === "bouncy" && nextProjectile.bouncesUsed >= spec.maxBounces
        ? "Bounce spent."
        : "Shot stopped.")

    return finishShot(
      {
        ...state,
        sceneTime,
        targets,
        obstacles,
        effects,
        impactMarks,
        score,
        scoreBreakdown,
        status: message,
        trail: nextTrail,
        projectile: nextProjectile,
        activeShot: { ...shot, projectile: nextProjectile, hitsThisShot, resolution },
        lastSegment: { from: previousPosition, to: currentPosition },
      },
      message,
    )
  }

  return {
    ...state,
    sceneTime,
    targets,
    obstacles,
    effects,
    impactMarks,
    score,
    scoreBreakdown,
    status,
    trail: nextTrail,
    projectile: nextProjectile,
    activeShot: { ...shot, projectile: nextProjectile, hitsThisShot, resolution },
    lastSegment: { from: previousPosition, to: currentPosition },
  }
}

function finishShot(state: GameState, message: string): GameState {
  const level = LEVELS[state.levelIndex]
  const complete = state.targets.every((target) => target.hit)
  const failed = !complete && state.shotsUsed >= level.shotLimit
  const nextPhase: GamePhase = complete ? "levelComplete" : failed ? "levelFailed" : "aiming"
  const remainingShots = Math.max(0, level.shotLimit - state.shotsUsed)
  const scoreBreakdown = complete
    ? addScoreBreakdown(state.scoreBreakdown, {
        timeBonus: calculateTimeBonus(getTimedElapsedSeconds(state)),
        remainingShotBonus: remainingShots * SCORE_REMAINING_SHOT,
      })
    : state.scoreBreakdown
  const score = scoreFromBreakdown(scoreBreakdown)
  const targetsLeft = state.targets.filter((target) => !target.hit).length
  const reason = failed ? `No shots remaining. Targets left: ${targetsLeft}.` : undefined
  const result =
    complete || failed
      ? createLevelResult(state, level, scoreBreakdown, score, reason)
      : state.result

  return {
    ...state,
    phase: "resolving",
    score,
    scoreBreakdown,
    status: complete ? "Level clear." : failed ? "No shots remaining." : message,
    activeShot: null,
    resolveTimer: RESOLVE_DELAY,
    nextPhase,
    result,
  }
}

function getObstacleHits(
  from: Vec,
  to: Vec,
  obstacles: ObstacleState[],
  projectileRadius: number,
  sceneTime: number,
): ObstacleHit[] {
  return obstacles
    .filter((obstacle) => !obstacle.destroyed)
    .map((obstacle) => {
      const rect = movedRect(obstacle, obstacle.movement, sceneTime)
      return {
        obstacle: { ...obstacle, ...rect },
        collision: segmentExpandedRotatedRectCollision(from, to, rect, projectileRadius),
      }
    })
    .filter((hit) => hit.collision.hit)
    .sort((a, b) => a.collision.t - b.collision.t)
}

function getTerminalHit(
  obstacleHits: ObstacleHit[],
  groundHit: TerminalHit | null,
  canBreakWeak: boolean,
): TerminalHit | null {
  const blockingObstacle = obstacleHits.find(
    (hit) => !(canBreakWeak && hit.obstacle.kind === "weak"),
  )
  const obstacleTerminal = blockingObstacle
    ? {
        kind: "obstacle" as const,
        point: blockingObstacle.collision.point,
        normal: blockingObstacle.collision.normal,
        t: blockingObstacle.collision.t,
        obstacle: blockingObstacle.obstacle,
      }
    : null

  if (!groundHit) return obstacleTerminal
  if (!obstacleTerminal) return groundHit
  return groundHit.t < obstacleTerminal.t ? groundHit : obstacleTerminal
}

function getGroundHit(from: Vec, to: Vec, radius: number): TerminalHit | null {
  const fromBottom = from.y - radius
  const toBottom = to.y - radius

  if (toBottom > 0) return null

  const denominator = fromBottom - toBottom
  const t = denominator === 0 ? 0 : clamp(fromBottom / denominator, 0, 1)
  const point = add(from, multiply(subtract(to, from), t))

  return {
    kind: "ground",
    point: { x: point.x, y: radius },
    normal: { x: 0, y: 1 },
    t,
  }
}

function classifyMiss(point: Vec, targets: TargetState[]) {
  const openTargets = targets.filter((target) => !target.hit)
  if (openTargets.length === 0) return "Missed."

  if (isOutOfBounds(point)) return "Out of bounds."

  const minX = Math.min(...openTargets.map((target) => target.x))
  const maxX = Math.max(...openTargets.map((target) => target.x))

  if (point.x < minX - 8) return "Short."
  if (point.x > maxX + 8) return "Overshot."
  return point.y < 2.5 ? "Too low." : "Missed."
}

function classifyTerminalHit(
  terminalHit: TerminalHit,
  targets: TargetState[],
  projectileKind: ProjectileKind,
  spec: (typeof PROJECTILE_SPECS)[ProjectileKind],
) {
  if (
    projectileKind === "bouncy" &&
    spec.maxBounces > 0
  ) {
    return "Bounce spent."
  }

  if (terminalHit.kind === "obstacle") {
    if (terminalHit.obstacle?.kind === "weak") return "Blocked by weak cover. Heavy required."
    return "Blocked by cover."
  }

  return classifyMiss(terminalHit.point, targets)
}

function emptyScoreBreakdown(): ScoreBreakdown {
  return {
    targetsCleared: 0,
    targetClear: 0,
    timeBonus: 0,
    multiHitBonus: 0,
    obstacleBreakBonus: 0,
    remainingShotBonus: 0,
  }
}

function addScoreBreakdown(
  current: ScoreBreakdown,
  delta: Partial<ScoreBreakdown>,
): ScoreBreakdown {
  return {
    targetsCleared: (current.targetsCleared ?? 0) + (delta.targetsCleared ?? 0),
    targetClear: (current.targetClear ?? 0) + (delta.targetClear ?? 0),
    timeBonus: (current.timeBonus ?? 0) + (delta.timeBonus ?? 0),
    multiHitBonus: (current.multiHitBonus ?? 0) + (delta.multiHitBonus ?? 0),
    obstacleBreakBonus: (current.obstacleBreakBonus ?? 0) + (delta.obstacleBreakBonus ?? 0),
    remainingShotBonus: (current.remainingShotBonus ?? 0) + (delta.remainingShotBonus ?? 0),
  }
}

function scoreFromBreakdown(score: ScoreBreakdown) {
  return (
    (score.targetClear ?? 0) +
    (score.timeBonus ?? 0) +
    (score.multiHitBonus ?? 0) +
    (score.obstacleBreakBonus ?? 0) +
    (score.remainingShotBonus ?? 0)
  )
}

function calculateTimeBonus(elapsedSeconds: number) {
  const speed = 1 - Math.min(1, elapsedSeconds / SCORE_TIME_DECAY_SECONDS)
  return Math.round(speed * SCORE_MAX_TIME)
}

function getTimedElapsedSeconds(state: GameState) {
  if (state.firstShotSceneTime == null) return 0
  return Math.max(0, state.sceneTime - state.firstShotSceneTime)
}

function formatTargetResolution(hitsThisShot: number) {
  if (hitsThisShot <= 1) return "Target cleared."
  return `${hitsThisShot} targets cleared.`
}

function createLevelResult(
  state: GameState,
  level: LevelDefinition,
  scoreBreakdown: ScoreBreakdown,
  finalScore: number,
  reason?: string,
): LevelResult {
  const targetsLeft = state.targets.filter((target) => !target.hit).length

  return {
    ...scoreBreakdown,
    finalScore,
    shotsUsed: state.shotsUsed,
    shotLimit: level.shotLimit,
    totalTargets: state.targets.length,
    targetsLeft,
    reason,
  }
}

function ageEffects(effects: ImpactEffect[], dt: number) {
  if (effects.length === 0) return effects
  return effects
    .map((effect) => ({ ...effect, age: effect.age + dt }))
    .filter((effect) => effect.age < EFFECT_LIFE)
}

function appendTrail(trail: Vec[], point: Vec) {
  const previous = trail[trail.length - 1]
  if (previous && distance(previous, point) < 0.15) return trail
  return [...trail, point].slice(-TRAIL_LIMIT)
}

function appendImpactMark(marks: ImpactMark[], effect: ImpactEffect) {
  return [...marks, { id: effect.id, x: effect.x, y: effect.y, kind: effect.kind }].slice(
    -MARK_LIMIT,
  )
}

function isOutOfBounds(point: Vec) {
  return (
    point.x < -OUT_OF_BOUNDS_X_MARGIN ||
    point.x > WORLD_W + OUT_OF_BOUNDS_X_MARGIN ||
    point.y > WORLD_H + OUT_OF_BOUNDS_Y_MARGIN
  )
}

function simulatePrediction(
  settings: ShotSettings,
  level: (typeof LEVELS)[number],
  obstacles: ObstacleState[],
  mode: "full" | "partial",
  sceneTime: number,
) {
  const spec = PROJECTILE_SPECS[settings.kind]
  let projectile = createProjectile(
    settings.angle,
    settings.power,
    LAUNCHER,
    spec.launchSpeedScale,
  )
  const points: Vec[] = [projectile.position]
  const destroyed = new Set(obstacles.filter((obstacle) => obstacle.destroyed).map((obstacle) => obstacle.id))
  const maxTime = mode === "partial" ? 3.2 : MAX_SHOT_TIME

  for (let elapsed = 0; elapsed < maxTime; elapsed += 0.06) {
    const previous = projectile.position
    let next = integrateProjectile(projectile, spec, 0.06)
    const obstacleHits = getObstacleHits(
      previous,
      next.position,
      obstacles.filter((obstacle) => !destroyed.has(obstacle.id)),
      spec.radius,
      sceneTime + elapsed,
    )
    const groundHit = getGroundHit(previous, next.position, spec.radius)
    const terminal = getTerminalHit(obstacleHits, groundHit, spec.canBreakWeak)
    const breakHits = spec.canBreakWeak
      ? obstacleHits.filter(
          (hit) =>
            hit.obstacle.kind === "weak" && hit.collision.t <= (terminal?.t ?? 1),
        )
      : []

    for (const hit of breakHits) {
      destroyed.add(hit.obstacle.id)
      next = { ...next, velocity: multiply(next.velocity, 0.86) }
    }

    if (terminal) {
      const groundHitCount =
        terminal.kind === "ground" ? next.groundHits + 1 : next.groundHits
      const canBounce =
        settings.kind === "bouncy" && next.bouncesUsed < spec.maxBounces
      points.push(terminal.point)

      if (!canBounce) break

      projectile = {
        ...next,
        position: add(terminal.point, multiply(terminal.normal, 0.05)),
        velocity: reflectVelocity(next.velocity, terminal.normal, spec.restitution),
        bouncesUsed: next.bouncesUsed + 1,
        groundHits: groundHitCount,
      }
      points.push(projectile.position)
      continue
    }

    projectile = next
    points.push(projectile.position)

    if (isOutOfBounds(projectile.position)) break
  }

  return points
}

function aimFromDragPoint(point: Vec) {
  const aim = subtract(point, LAUNCHER)
  const pullDistance = length(aim)
  const angle = clamp(
    Math.round((Math.atan2(aim.y, Math.max(0.12, aim.x)) * 180) / Math.PI),
    MIN_ANGLE,
    MAX_ANGLE,
  )
  const power = clamp(Math.round(pullDistance * 2.35), MIN_POWER, MAX_POWER)

  return { angle, power, pullDistance }
}

function toSvgX(point: Pick<Vec, "x">) {
  return point.x * WORLD_SCALE
}

function toSvgY(point: Pick<Vec, "y">) {
  return GROUND_Y - point.y * WORLD_SCALE
}

function toSvgPair(point: Vec) {
  return `${toSvgX(point).toFixed(1)},${toSvgY(point).toFixed(1)}`
}

function PlayfieldGrid() {
  const vertical = Array.from({ length: 13 }, (_, index) => index * 10)
  const horizontal = Array.from({ length: 7 }, (_, index) => index * 10)

  return (
    <g opacity="0.13">
      {vertical.map((x) => (
        <line
          key={`v-${x}`}
          x1={x * WORLD_SCALE}
          x2={x * WORLD_SCALE}
          y1="0"
          y2={GROUND_Y}
          stroke="#eef2ea"
          strokeWidth="1"
        />
      ))}
      {horizontal.map((y) => (
        <line
          key={`h-${y}`}
          x1="0"
          x2={SVG_W}
          y1={GROUND_Y - y * WORLD_SCALE}
          y2={GROUND_Y - y * WORLD_SCALE}
          stroke="#eef2ea"
          strokeWidth="1"
        />
      ))}
    </g>
  )
}

function MotionPath({
  x,
  y,
  movement,
}: {
  x: number
  y: number
  movement: NonNullable<TargetState["movement"]>
}) {
  const start =
    movement.axis === "x"
      ? { x: x - movement.amplitude, y }
      : { x, y: y - movement.amplitude }
  const end =
    movement.axis === "x"
      ? { x: x + movement.amplitude, y }
      : { x, y: y + movement.amplitude }

  return (
    <line
      x1={toSvgX(start)}
      y1={toSvgY(start)}
      x2={toSvgX(end)}
      y2={toSvgY(end)}
      stroke="#7b8177"
      strokeDasharray="3 7"
      strokeOpacity="0.45"
      strokeWidth="1.5"
    />
  )
}

function Cannon({ angle, origin }: { angle: number; origin: Vec }) {
  const x = toSvgX(origin)
  const y = toSvgY(origin)
  const barrelLength = 58
  const barrelHeight = 14

  return (
    <g aria-hidden="true">
      <g transform={`translate(${x} ${y}) rotate(${-angle})`}>
        <rect
          x="0"
          y={-barrelHeight / 2}
          width={barrelLength}
          height={barrelHeight}
          fill="#2a2f28"
          stroke="#11140f"
          strokeWidth="2"
        />
        <rect
          x="6"
          y={-barrelHeight / 2 + 3}
          width={barrelLength - 13}
          height="3"
          fill="#545d50"
          opacity="0.75"
        />
      </g>
      <circle cx={x} cy={y} r="18" fill="#4d5549" stroke="#1d211c" strokeWidth="2" />
      <circle cx={x} cy={y} r="8" fill="#252a23" />
      <rect
        x={x - 28}
        y={GROUND_Y - 18}
        width="58"
        height="18"
        fill="#4b533f"
        stroke="#1d211c"
        strokeWidth="2"
      />
    </g>
  )
}

function ObstacleBlock({ obstacle, rect }: { obstacle: ObstacleState; rect: RotatedRect }) {
  const x = toSvgX(rect)
  const y = toSvgY({ y: rect.y + rect.height })
  const width = rect.width * WORLD_SCALE
  const height = rect.height * WORLD_SCALE
  const centerX = x + width / 2
  const centerY = y + height / 2
  const fill =
    obstacle.kind === "weak" ? "#8d715e" : obstacle.kind === "bounce" ? "#56685a" : "#2f342d"
  const highlight =
    obstacle.kind === "weak" ? "#b4937b" : obstacle.kind === "bounce" ? "#7d927f" : "#555d50"

  return (
    <g transform={rect.rotation ? `rotate(${-rect.rotation} ${centerX} ${centerY})` : undefined}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        stroke="#1d211c"
        strokeWidth="1.5"
      />
      <path
        d={`M ${x + 4} ${y + 5} H ${x + width - 4}`}
        stroke={highlight}
        strokeLinecap="round"
        strokeOpacity="0.65"
        strokeWidth="2"
      />
      {obstacle.kind === "weak" && (
        <path
          d={`M ${x + width * 0.35} ${y + 3} l ${width * 0.12} ${height * 0.42} l ${-width * 0.1} ${height * 0.24}`}
          fill="none"
          stroke="#654d40"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      )}
    </g>
  )
}

function Trail({ points }: { points: Vec[] }) {
  return (
    <g>
      {points.slice(1).map((point, index) => {
        const previous = points[index]
        const opacity = 0.16 + (index / Math.max(1, points.length - 1)) * 0.58

        return (
          <line
            key={`${point.x.toFixed(2)}-${point.y.toFixed(2)}-${index}`}
            x1={toSvgX(previous)}
            y1={toSvgY(previous)}
            x2={toSvgX(point)}
            y2={toSvgY(point)}
            stroke="#d96d1f"
            strokeLinecap="round"
            strokeOpacity={opacity}
            strokeWidth="3"
          />
        )
      })}
    </g>
  )
}

function TargetMarker({
  center,
  radius,
  hit,
  hitAt,
  sceneTime,
}: {
  center: Vec
  radius: number
  hit: boolean
  hitAt?: number
  sceneTime: number
}) {
  const r = radius * WORLD_SCALE
  const hitAge = hitAt === undefined ? Number.POSITIVE_INFINITY : sceneTime - hitAt
  const flash = hit && hitAge < 0.22
  const recoil = flash ? Math.sin(hitAge * 70) * (1 - hitAge / 0.22) * 2.5 : 0
  const scale = flash ? 1.08 - hitAge * 0.2 : 1
  const cx = toSvgX(center) + recoil
  const cy = toSvgY(center) - recoil * 0.35

  return (
    <g opacity={hit && !flash ? 0.48 : 1} transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <circle
        cx="0"
        cy="0"
        r={r}
        fill={flash ? "#fff7dc" : hit ? "#c8cdc2" : "#f6f2e8"}
        stroke={hit ? "#70766d" : "#9b3326"}
        strokeWidth="2"
      />
      <circle
        cx="0"
        cy="0"
        r={r * 0.62}
        fill="none"
        stroke={hit ? "#70766d" : "#9b3326"}
        strokeWidth="2"
      />
      <circle cx="0" cy="0" r={r * 0.24} fill={hit ? "#70766d" : "#9b3326"} />
      {hit && (
        <g stroke="#53584f" strokeLinecap="round" strokeWidth="3">
          <line x1={-r * 0.48} y1={-r * 0.48} x2={r * 0.48} y2={r * 0.48} />
          <line x1={r * 0.48} y1={-r * 0.48} x2={-r * 0.48} y2={r * 0.48} />
        </g>
      )}
    </g>
  )
}

function ImpactMarkView({ mark }: { mark: ImpactMark }) {
  const cx = toSvgX(mark)
  const cy = toSvgY(mark)
  const color =
    mark.kind === "hit"
      ? "#793329"
      : mark.kind === "break"
        ? "#745846"
        : mark.kind === "bounce"
          ? "#b85f22"
          : "#2f342d"

  return (
    <g stroke={color} strokeLinecap="round" strokeOpacity="0.48" strokeWidth="1.6">
      <line x1={cx - 4} y1={cy - 3} x2={cx + 4} y2={cy + 3} />
      <line x1={cx + 3} y1={cy - 4} x2={cx - 3} y2={cy + 4} />
    </g>
  )
}

function ImpactBurst({ effect }: { effect: ImpactEffect }) {
  const progress = effect.age / EFFECT_LIFE
  const radius = 8 + progress * 16
  const opacity = Math.max(0, 1 - progress)
  const color =
    effect.kind === "hit"
      ? "#9b3326"
      : effect.kind === "break"
        ? "#8d715e"
        : effect.kind === "bounce"
          ? "#d96d1f"
          : "#2f342d"
  const cx = toSvgX(effect)
  const cy = toSvgY(effect)

  return (
    <g opacity={opacity} stroke={color} strokeLinecap="round" strokeWidth="2">
      <circle cx={cx} cy={cy} r={radius * 0.55} fill="none" />
      <line x1={cx - radius} y1={cy} x2={cx - radius * 0.45} y2={cy} />
      <line x1={cx + radius * 0.45} y1={cy} x2={cx + radius} y2={cy} />
      <line x1={cx} y1={cy - radius} x2={cx} y2={cy - radius * 0.45} />
      <line x1={cx} y1={cy + radius * 0.45} x2={cx} y2={cy + radius} />
    </g>
  )
}

function DebugOverlay({
  targets,
  projectile,
  projectileRadius,
  lastSegment,
}: {
  targets: Array<TargetState & { position: Vec }>
  projectile: ProjectileState | null
  projectileRadius: number
  lastSegment: { from: Vec; to: Vec } | null
}) {
  return (
    <g pointerEvents="none">
      {targets.map((target) => (
        <circle
          key={`debug-${target.id}`}
          cx={toSvgX(target.position)}
          cy={toSvgY(target.position)}
          r={(target.radius + projectileRadius) * WORLD_SCALE}
          fill="none"
          stroke="#2563eb"
          strokeDasharray="4 4"
          strokeOpacity="0.75"
        />
      ))}
      {projectile && (
        <circle
          cx={toSvgX(projectile.position)}
          cy={toSvgY(projectile.position)}
          r={projectileRadius * WORLD_SCALE}
          fill="none"
          stroke="#111827"
          strokeWidth="2"
        />
      )}
      {lastSegment && (
        <g stroke="#111827" strokeWidth="1.5">
          <line
            x1={toSvgX(lastSegment.from)}
            y1={toSvgY(lastSegment.from)}
            x2={toSvgX(lastSegment.to)}
            y2={toSvgY(lastSegment.to)}
          />
          <circle cx={toSvgX(lastSegment.from)} cy={toSvgY(lastSegment.from)} r="4" fill="#111827" />
          <circle cx={toSvgX(lastSegment.to)} cy={toSvgY(lastSegment.to)} r="4" fill="#ffffff" stroke="#111827" />
        </g>
      )}
    </g>
  )
}

function TopStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-[#d6d8d2] px-3 py-2 last:border-r-0">
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6d746b]">{label}</div>
      <div className="mt-1 text-lg font-extrabold leading-none text-[#1d211c]">{value}</div>
    </div>
  )
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[#d6d8d2] bg-[#fbfcf8] px-3 py-2">
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6d746b]">{label}</div>
      <div className="mt-1 text-sm font-extrabold text-[#1d211c]">{value}</div>
    </div>
  )
}

function ResultPanel({
  phase,
  result,
  levelIndex,
  isLastLevel,
  onRetry,
  onNext,
}: {
  phase: Extract<GamePhase, "levelComplete" | "levelFailed">
  result: LevelResult
  levelIndex: number
  isLastLevel: boolean
  onRetry: () => void
  onNext: () => void
}) {
  const cleared = phase === "levelComplete"
  const finalScore = Number.isFinite(result.finalScore)
    ? result.finalScore
    : scoreFromBreakdown(result)

  return (
    <div className="border-t border-[#d6d8d2] bg-[#f8faf7] px-4 py-4 md:px-5">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#6d746b]">
            Level {levelIndex + 1} {cleared ? "clear" : "failed"}
          </p>
          <h3 className="mt-1 text-xl font-extrabold text-[#1d211c]">
            {cleared ? "Level clear." : (result.reason ?? "No shots remaining.")}
          </h3>
          <div className="mt-3 grid gap-2 text-sm text-[#3e453c] sm:grid-cols-2 lg:grid-cols-5">
            <ResultLine label="Targets cleared" value={`${result.targetsCleared}/${result.totalTargets}`} />
            <ResultLine label="Shots used" value={`${result.shotsUsed}/${result.shotLimit}`} />
            <ResultLine label="Time bonus" value={String(result.timeBonus ?? 0)} />
            <ResultLine label="Remaining shot bonus" value={String(result.remainingShotBonus ?? 0)} />
            <ResultLine label="Final score" value={String(finalScore)} strong />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          <button
            type="button"
            onClick={onRetry}
            className="border border-[#9fa49a] bg-white px-4 py-2 text-sm font-bold text-[#252a23] transition hover:bg-[#f1f2ed]"
          >
            Retry Level
          </button>
          {cleared && !isLastLevel && (
            <button
              type="button"
              onClick={onNext}
              className="border border-[#1d211c] bg-[#252a23] px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#11140f]"
            >
              Next Level
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function ResultLine({
  label,
  value,
  strong,
}: {
  label: string
  value: string
  strong?: boolean
}) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6d746b]">
        {label}
      </div>
      <div className={cn("mt-0.5 font-bold", strong && "text-lg text-[#1d211c]")}>{value}</div>
    </div>
  )
}

function ProjectilePicker({
  allowed,
  value,
  disabled,
  onChange,
}: {
  allowed: ProjectileKind[]
  value: ProjectileKind
  disabled: boolean
  onChange: (kind: ProjectileKind) => void
}) {
  return (
    <div>
      <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#5c6259]">
        Projectile Type
      </div>
      <div className="mt-1 grid gap-2 sm:grid-cols-2">
        {allowed.map((kind) => {
          const selected = kind === value

          return (
            <button
              key={kind}
              type="button"
              disabled={disabled}
              onClick={() => onChange(kind)}
              className={cn(
                "border px-3 py-2 text-left text-sm font-bold transition disabled:cursor-not-allowed",
                selected
                  ? "border-[#1d211c] bg-[#252a23] text-white"
                  : "border-[#aeb3aa] bg-white text-[#252a23] hover:enabled:bg-[#f1f2ed]",
                disabled && !selected && "bg-[#eff0eb] text-[#7f857b]",
              )}
            >
              {PROJECTILE_SPECS[kind].label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ControlSlider({
  label,
  value,
  min,
  max,
  unit,
  disabled,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  unit: string
  disabled?: boolean
  onChange: (value: number) => void
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#5c6259]">
        <span>{label}</span>
        <span className="font-mono normal-case tracking-normal text-[#1d211c]">
          {value}
          {unit}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
        className={cn("mt-2 w-full accent-[#d96d1f]", disabled && "opacity-50")}
      />
    </label>
  )
}

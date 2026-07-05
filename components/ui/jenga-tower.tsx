"use client"

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { useLanguage } from "@/components/providers/language-provider"
import type {
  Body as MatterBody,
  Engine as MatterEngine,
  Render as MatterRender,
  Runner as MatterRunner,
} from "matter-js"
import { FadeIn } from "@/components/ui/animate"
import type { Language } from "@/i18n/translations"

const PLAYFIELD_W = 760
const RIGHT_FALLOFF_W = 120
const CANVAS_W = PLAYFIELD_W + RIGHT_FALLOFF_W
const CANVAS_H = 520
const BLOCK_W = 96
const BLOCK_H = 28
const PLATFORM_Y = 454
const PLATFORM_H = 30
const TOWER_CENTER_X = 510
const PLATFORM_CENTER_X = TOWER_CENTER_X + 72
const BUILD_ZONE_WIDTH = 360
const SUPPLY_TRAY_X = 26
const SUPPLY_TRAY_Y = 64
const SUPPLY_TRAY_W = 238
const SUPPLY_TRAY_H = 406
const SUPPLY_TRAY_BOTTOM_CLEARANCE = 64
const SUPPLY_COLUMNS = 2
const STABLE_WINDOW_MS = 750
const HOLD_ARM_MS = 1000
const HOLD_SECONDS = 5
const MAX_SPEED = 4.8
const COLLAPSE_GRACE_MS = 760

type GamePhase = "loading" | "ready" | "building" | "holding" | "success" | "collapsed" | "error"
type StabilityBand = "stable" | "wobbling" | "danger" | "collapsed"
type BlockKind = "normal" | "heavy" | "light"

type Level = {
  name: string
  targetRows: number
  supportWidth: number
  totalBlocks: number
  tip: string
  stabilityRequired: number
  mixedWeights?: boolean
  wind?: boolean
}

type BlockMeta = {
  home: { x: number; y: number }
  kind: BlockKind
  stableSince: number | null
  used: boolean
  dropped: boolean
}

type GameStats = {
  stableHeight: number
  bestHeight: number
  stability: number
  band: StabilityBand
  coach: string
  holdRemaining: number
  centerOfMass: { x: number; y: number } | null
  movingShare: number
  collapseReason: string
}

const LEVELS: Level[] = [
  {
    name: "First Tower",
    targetRows: 5,
    supportWidth: 320,
    totalBlocks: 14,
    tip: "Normal blocks only. Build a simple centered stack from the tray.",
    stabilityRequired: 66,
  },
  {
    name: "Taller Build",
    targetRows: 7,
    supportWidth: 320,
    totalBlocks: 18,
    tip: "More height means small offsets matter. Keep each row over the middle.",
    stabilityRequired: 68,
  },
  {
    name: "Narrow Base",
    targetRows: 7,
    supportWidth: 220,
    totalBlocks: 18,
    tip: "The support zone is visibly narrower, so center of weight matters more.",
    stabilityRequired: 70,
  },
  {
    name: "Heavy Blocks",
    targetRows: 8,
    supportWidth: 300,
    totalBlocks: 20,
    tip: "Darker blocks are heavier. They help near the bottom and hurt near the top.",
    stabilityRequired: 72,
    mixedWeights: true,
  },
  {
    name: "Wind Test",
    targetRows: 9,
    supportWidth: 300,
    totalBlocks: 24,
    tip: "Wind starts during the hold. A centered, wide tower survives the gusts.",
    stabilityRequired: 68,
    mixedWeights: true,
    wind: true,
  },
]

const JENGA_COPY: Record<Language, {
  levels: Array<{ name: string; tip: string }>
  initialCoach: string
  holdCoach: string
  lostSupport: string
  lostSupportRebuild: string
  continueCoach: string
  mission: string
  levelCount: string
  start: string
  nextChallenge: string
  keepBuilding: string
  tryAgain: string
  rebuildTower: string
  state: string
  hold: string
  stableHeight: string
  bestHeight: string
  target: string
  row: string
  rows: string
  stability: string
  supplyTray: string
  notTested: string
  closeComplete: string
  levelComplete: string
  greatBuild: string
  success: string
  rebuildThisLevel: string
  towerCollapsed: string
  rebuildSupport: string
  collapseTip: string
  phase: Record<GamePhase, string>
  band: Record<StabilityBand, string>
}> = {
  en: {
    levels: LEVELS.map((level) => ({ name: level.name, tip: level.tip })),
    initialCoach: "Build to the goal line, then let the tower settle.",
    holdCoach: "Hold steady. Do not move blocks during the countdown.",
    lostSupport: "The tower lost its support path.",
    lostSupportRebuild: "The tower lost its support path. Rebuild from a wider base.",
    continueCoach: "Keep building from the same tower, or adjust blocks before trying the hold again.",
    mission: "Build a tower {rows} rows tall and keep it standing for {seconds} seconds.",
    levelCount: "Level {current} of {total}",
    start: "Start",
    nextChallenge: "Next Challenge",
    keepBuilding: "Keep Building",
    tryAgain: "Try Again",
    rebuildTower: "Rebuild Tower",
    state: "State",
    hold: "Hold",
    stableHeight: "Stable Height",
    bestHeight: "Best Height",
    target: "Target",
    row: "row",
    rows: "rows",
    stability: "Stability",
    supplyTray: "Supply tray",
    notTested: "Not tested",
    closeComplete: "Close level complete message and keep building",
    levelComplete: "Level Complete!",
    greatBuild: "Great build.",
    success: "You reached {rows} stable rows and kept the tower standing for {seconds} seconds.",
    rebuildThisLevel: "Rebuild This Level",
    towerCollapsed: "Tower collapsed!",
    rebuildSupport: "Rebuild the support path.",
    collapseTip: "Try a wider bottom, keep the next block closer to center, and let the tower settle before going taller.",
    phase: { loading: "Loading", ready: "Ready", building: "Building", holding: "Holding", success: "Complete", collapsed: "Collapsed", error: "Error" },
    band: { stable: "Stable", wobbling: "Unsteady", danger: "Danger", collapsed: "Collapsed" },
  },
  es: {
    levels: [
      { name: "Primera torre", tip: "Solo bloques normales. Construye una torre centrada usando la bandeja." },
      { name: "Construccion mas alta", tip: "A mayor altura, los pequenos desplazamientos importan. Mantén cada fila sobre el centro." },
      { name: "Base estrecha", tip: "La zona de apoyo es mas angosta, asi que el centro de peso importa mas." },
      { name: "Bloques pesados", tip: "Los bloques oscuros pesan mas. Ayudan abajo y estorban arriba." },
      { name: "Prueba de viento", tip: "El viento empieza durante la cuenta. Una torre ancha y centrada sobrevive mejor a las rafagas." },
    ],
    initialCoach: "Construye hasta la linea de meta y deja que la torre se estabilice.",
    holdCoach: "Mantenla estable. No muevas bloques durante la cuenta regresiva.",
    lostSupport: "La torre perdio su camino de soporte.",
    lostSupportRebuild: "La torre perdio su camino de soporte. Reconstruye con una base mas ancha.",
    continueCoach: "Sigue construyendo desde la misma torre o ajusta bloques antes de intentar la cuenta otra vez.",
    mission: "Construye una torre de {rows} filas y mantenla de pie durante {seconds} segundos.",
    levelCount: "Nivel {current} de {total}",
    start: "Empezar",
    nextChallenge: "Siguiente reto",
    keepBuilding: "Seguir construyendo",
    tryAgain: "Intentar de nuevo",
    rebuildTower: "Reconstruir torre",
    state: "Estado",
    hold: "Cuenta",
    stableHeight: "Altura estable",
    bestHeight: "Mejor altura",
    target: "Meta",
    row: "fila",
    rows: "filas",
    stability: "Estabilidad",
    supplyTray: "Bandeja de bloques",
    notTested: "Sin probar",
    closeComplete: "Cerrar mensaje de nivel completado y seguir construyendo",
    levelComplete: "Nivel completado!",
    greatBuild: "Gran construccion.",
    success: "Alcanzaste {rows} filas estables y mantuviste la torre de pie durante {seconds} segundos.",
    rebuildThisLevel: "Reconstruir este nivel",
    towerCollapsed: "La torre colapso!",
    rebuildSupport: "Reconstruye el camino de soporte.",
    collapseTip: "Prueba una base mas ancha, coloca el siguiente bloque mas cerca del centro y deja que la torre se estabilice antes de subir mas.",
    phase: { loading: "Cargando", ready: "Listo", building: "Construyendo", holding: "Sosteniendo", success: "Completo", collapsed: "Colapsada", error: "Error" },
    band: { stable: "Estable", wobbling: "Inestable", danger: "Peligro", collapsed: "Colapsada" },
  },
  zh: {
    levels: [
      { name: "第一座塔", tip: "只使用普通木块。从托盘中搭一个简单、居中的塔。" },
      { name: "更高的搭建", tip: "越高时，小小的偏移越重要。让每一层尽量压在中间。" },
      { name: "窄底座", tip: "支撑区域明显更窄，所以重心位置更关键。" },
      { name: "重木块", tip: "颜色较深的木块更重。放在底部有帮助，放在顶部会更危险。" },
      { name: "风力测试", tip: "倒计时阶段会开始刮风。居中、宽底的塔更能撑住风。" },
    ],
    initialCoach: "搭到目标线，然后让塔稳定下来。",
    holdCoach: "保持稳定。倒计时时不要移动木块。",
    lostSupport: "塔失去了支撑路径。",
    lostSupportRebuild: "塔失去了支撑路径。用更宽的底座重新搭建。",
    continueCoach: "可以继续从这座塔往上搭，或先调整木块再尝试保持倒计时。",
    mission: "搭一座 {rows} 层高的塔，并让它站立 {seconds} 秒。",
    levelCount: "第 {current} / {total} 关",
    start: "开始",
    nextChallenge: "下一项挑战",
    keepBuilding: "继续搭建",
    tryAgain: "再试一次",
    rebuildTower: "重建塔",
    state: "状态",
    hold: "保持",
    stableHeight: "稳定高度",
    bestHeight: "最佳高度",
    target: "目标",
    row: "层",
    rows: "层",
    stability: "稳定性",
    supplyTray: "木块托盘",
    notTested: "尚未测试",
    closeComplete: "关闭关卡完成提示并继续搭建",
    levelComplete: "关卡完成！",
    greatBuild: "搭得很好。",
    success: "你达到了 {rows} 层稳定高度，并让塔站立了 {seconds} 秒。",
    rebuildThisLevel: "重建本关",
    towerCollapsed: "塔倒了！",
    rebuildSupport: "重新建立支撑路径。",
    collapseTip: "试试更宽的底部，让下一块更靠近中心，并在继续加高前等塔稳定下来。",
    phase: { loading: "加载中", ready: "准备好", building: "搭建中", holding: "保持中", success: "完成", collapsed: "已倒塌", error: "错误" },
    band: { stable: "稳定", wobbling: "不稳", danger: "危险", collapsed: "已倒塌" },
  },
}

function formatJenga(text: string, values: Record<string, string | number>) {
  return text.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? `{${key}}`))
}

const WOOD_COLORS: Record<BlockKind, string[]> = {
  normal: ["#d98b35", "#e39a45", "#c9792d"],
  heavy: ["#9f5a2c", "#8a4a24", "#70401f"],
  light: ["#edb765", "#f0c177", "#dda85b"],
}

const initialStats: GameStats = {
  stableHeight: 0,
  bestHeight: 0,
  stability: 100,
  band: "stable",
  coach: "Build to the goal line, then let the tower settle.",
  holdRemaining: HOLD_SECONDS,
  centerOfMass: null,
  movingShare: 0,
  collapseReason: "",
}

type MatterModule = typeof import("matter-js")

export function JengaTower() {
  const { language } = useLanguage()
  const copy = JENGA_COPY[language]
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const matterRef = useRef<MatterModule | null>(null)
  const worldRef = useRef<{
    engine: MatterEngine
    render: MatterRender
    runner: MatterRunner
    blocks: MatterBody[]
    blockMeta: Map<number, BlockMeta>
    cleanup: Array<() => void>
  } | null>(null)

  const [levelIndex, setLevelIndex] = useState(0)
  const [phase, setPhase] = useState<GamePhase>("loading")
  const [stats, setStats] = useState<GameStats>(() => ({ ...initialStats, coach: copy.initialCoach }))
  const [resetKey, setResetKey] = useState(0)
  const [completedLevelIndex, setCompletedLevelIndex] = useState<number | null>(null)

  const phaseRef = useRef<GamePhase>("loading")
  const selectedBodyRef = useRef<MatterBody | null>(null)
  const dragRef = useRef<{
    body: MatterBody
    pointerId: number
    last: { x: number; y: number; at: number }
  } | null>(null)
  const lastInteractionAtRef = useRef(0)
  const holdingStartedAtRef = useRef<number | null>(null)
  const goalStableSinceRef = useRef<number | null>(null)
  const holdSuppressedUntilInteractionRef = useRef(false)
  const collapseCandidateRef = useRef<{ reason: string; since: number } | null>(null)
  const bestHeightRef = useRef(0)
  const completedLevelIndexRef = useRef<number | null>(null)

  const level = LEVELS[levelIndex]
  const levelCopy = copy.levels[levelIndex] ?? copy.levels[0]
  const targetLineRows = level.targetRows - 1
  const targetLineY = PLATFORM_Y - targetLineRows * BLOCK_H
  const supportLeft = TOWER_CENTER_X - level.supportWidth / 2

  function buildWorld(Matter: MatterModule, canvas: HTMLCanvasElement, currentLevel: Level) {
    destroyWorld()

    const { Body, Bodies, Engine, Events, Render, Runner, World } = Matter
    const engine = Engine.create({
      gravity: { x: 0, y: 1, scale: 0.00115 },
    })
    engine.enableSleeping = false

    const render = Render.create({
      canvas,
      engine,
      options: {
        width: CANVAS_W,
        height: CANVAS_H,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio || 1,
      },
    })

    const platform = Bodies.rectangle(PLATFORM_CENTER_X, PLATFORM_Y + PLATFORM_H / 2, currentLevel.supportWidth + 36, PLATFORM_H, {
      isStatic: true,
      friction: 1,
      frictionStatic: 1.2,
      render: { visible: false },
    })
    const leftWall = Bodies.rectangle(-28, CANVAS_H / 2, 56, CANVAS_H * 2, {
      isStatic: true,
      friction: 0.8,
      render: { visible: false },
    })
    const shelfRows = Math.ceil(currentLevel.totalBlocks / SUPPLY_COLUMNS)
    const supplyShelves = Array.from({ length: shelfRows }, (_, row) => {
      const slot = supplySlot(row * SUPPLY_COLUMNS)
      return Bodies.rectangle(SUPPLY_TRAY_X + SUPPLY_TRAY_W / 2, slot.y + BLOCK_H / 2 + 7, SUPPLY_TRAY_W - 28, 12, {
        isStatic: true,
        friction: 1,
        frictionStatic: 1.25,
        render: { fillStyle: "rgba(15, 23, 42, 0.3)", strokeStyle: "rgba(255,255,255,0.16)", lineWidth: 1 },
      })
    })
    const blocks: MatterBody[] = []
    const blockMeta = new Map<number, BlockMeta>()

    for (let i = 0; i < currentLevel.totalBlocks; i++) {
      const slot = supplySlot(i)
      addBlock(slot.x, slot.y, i, false)
    }

    function addBlock(x: number, y: number, index: number, used: boolean) {
      const kind = getBlockKind(currentLevel, index)
      const palette = WOOD_COLORS[kind]
      const block = Bodies.rectangle(x, y, BLOCK_W, BLOCK_H, {
        density: kind === "heavy" ? 0.0062 : kind === "light" ? 0.0026 : 0.0039,
        friction: 0.92,
        frictionStatic: 1.18,
        frictionAir: 0.035,
        restitution: 0.015,
        chamfer: { radius: 5 },
        render: {
          fillStyle: palette[index % palette.length],
          strokeStyle: "rgba(30, 41, 59, 0.38)",
          lineWidth: 1.5,
        },
      })
      blocks.push(block)
      blockMeta.set(block.id, {
        home: { x, y },
        kind,
        stableSince: null,
        used,
        dropped: false,
      })
    }

    World.add(engine.world, [leftWall, platform, ...supplyShelves, ...blocks])

    const onAfterUpdate = () => {
      const now = performance.now()

      for (const block of blocks) {
        const meta = blockMeta.get(block.id)
        if (!meta) continue
        if (meta.dropped) continue

        if (block === selectedBodyRef.current) {
          Body.setAngularVelocity(block, clamp(block.angularVelocity, -0.18, 0.18))
        } else {
          Body.setAngularVelocity(block, block.angularVelocity * 0.975)
        }

        const speed = Math.hypot(block.velocity.x, block.velocity.y)
        if (speed > MAX_SPEED) {
          const scale = MAX_SPEED / speed
          Body.setVelocity(block, {
            x: block.velocity.x * scale,
            y: block.velocity.y * scale,
          })
        }

        if (isBlockInBuildZone(block, currentLevel)) {
          meta.used = true
        }

        if (shouldDespawnBlock(block, meta, currentLevel) && block !== selectedBodyRef.current) {
          meta.dropped = true
          meta.used = false
          meta.stableSince = null
          block.render.visible = false
          block.collisionFilter.mask = 0
          Body.setPosition(block, { x: block.position.x, y: CANVAS_H + 240 })
          Body.setVelocity(block, { x: 0, y: 0 })
          Body.setAngularVelocity(block, 0)
        }
      }

      if (currentLevel.wind && phaseRef.current === "holding") {
        const gust = Math.sin(now / 420) * 0.000012
        for (const block of blocks) {
          const meta = blockMeta.get(block.id)
          if (!meta?.used || block.position.y > PLATFORM_Y - BLOCK_H) continue
          Body.applyForce(block, block.position, { x: gust * block.mass, y: 0 })
        }
      }

      if (now - lastMetricsAt.current < 120) return
      lastMetricsAt.current = now

      const metrics = measureTower(blocks, blockMeta, selectedBodyRef.current, currentLevel, now)
      bestHeightRef.current = Math.max(bestHeightRef.current, metrics.stableHeight)

      const holdRemaining = updateGamePhase(metrics, now)
      setStats({
        stableHeight: metrics.stableHeight,
        bestHeight: bestHeightRef.current,
        stability: metrics.stability,
        band: metrics.band,
        coach:
          phaseRef.current === "holding"
            ? copy.holdCoach
            : metrics.band === "collapsed"
              ? metrics.collapseReason || copy.lostSupportRebuild
              : metrics.coach,
        holdRemaining,
        centerOfMass: metrics.centerOfMass,
        movingShare: metrics.movingShare,
        collapseReason: metrics.collapseReason,
      })
    }

    const onAfterRender = () => {
      const ctx = render.context
      ctx.save()
      drawBlockDetails(ctx, blocks, blockMeta, selectedBodyRef.current)
      ctx.restore()
    }

    const lastMetricsAt = { current: 0 }
    Events.on(engine, "afterUpdate", onAfterUpdate)
    Events.on(render, "afterRender", onAfterRender)

    Render.run(render)
    const runner = Runner.create()
    Runner.run(runner, engine)

    worldRef.current = {
      engine,
      render,
      runner,
      blocks,
      blockMeta,
      cleanup: [
        () => Events.off(engine, "afterUpdate", onAfterUpdate),
        () => Events.off(render, "afterRender", onAfterRender),
      ],
    }

    function updateGamePhase(metrics: TowerMetrics, now: number) {
      const activePhase = phaseRef.current
      let holdRemaining = HOLD_SECONDS

      if (activePhase === "success" || activePhase === "ready" || activePhase === "collapsed") {
        return activePhase === "success" ? 0 : HOLD_SECONDS
      }

      if (completedLevelIndexRef.current === levelIndex) {
        collapseCandidateRef.current = null
        return 0
      }

      if (
        activePhase === "holding" &&
        metrics.stableHeight < currentLevel.targetRows &&
        bestHeightRef.current >= currentLevel.targetRows
      ) {
        metrics.collapseReason = "The target was reached, then the tower fell below the goal line."
        metrics.band = "collapsed"
        setStats((current) => ({
          ...current,
          collapseReason: metrics.collapseReason,
          band: "collapsed",
        }))
        setPhase("collapsed")
        return HOLD_SECONDS
      }

      const heightDropped =
        bestHeightRef.current >= 2 &&
        metrics.stableHeight <= Math.max(0, bestHeightRef.current - 2) &&
        metrics.movingShare > 0.18
      const collapseReason = heightDropped
        ? "Stable height dropped sharply after the tower started falling."
        : metrics.collapseReason

      if (collapseReason && metrics.placedCount >= 3 && now - lastInteractionAtRef.current > 420) {
        const candidate = collapseCandidateRef.current
        if (candidate?.reason === collapseReason) {
          if (now - candidate.since >= COLLAPSE_GRACE_MS || activePhase === "holding") {
            metrics.collapseReason = collapseReason
            metrics.band = "collapsed"
            setStats((current) => ({
              ...current,
              collapseReason,
              band: "collapsed",
              stability: Math.min(current.stability, metrics.stability),
            }))
            setPhase("collapsed")
            return HOLD_SECONDS
          }
        } else {
          collapseCandidateRef.current = { reason: collapseReason, since: now }
        }
      } else {
        collapseCandidateRef.current = null
      }

      const canArmHold =
        metrics.goalReached &&
        metrics.stableHeight >= currentLevel.targetRows &&
        metrics.stability >= Math.min(currentLevel.stabilityRequired, 68) &&
        (metrics.band === "stable" || metrics.stability >= 68) &&
        metrics.movingShare < 0.12 &&
        metrics.scatteredShare === 0 &&
        metrics.disconnectedCount === 0 &&
        metrics.comOffset <= 0.9 &&
        !selectedBodyRef.current &&
        completedLevelIndexRef.current !== levelIndex &&
        !holdSuppressedUntilInteractionRef.current &&
        now - lastInteractionAtRef.current > 800

      if (canArmHold) {
        goalStableSinceRef.current ??= now
      } else {
        goalStableSinceRef.current = null
      }

      const canHold = canArmHold && goalStableSinceRef.current !== null && now - goalStableSinceRef.current >= HOLD_ARM_MS

      if (activePhase === "holding") {
        if (canHold) {
          if (holdingStartedAtRef.current === null) holdingStartedAtRef.current = now
          const elapsed = (now - holdingStartedAtRef.current) / 1000
          holdRemaining = Math.max(0, HOLD_SECONDS - elapsed)
          if (elapsed >= HOLD_SECONDS) {
            engine.timing.timeScale = 0.55
            completedLevelIndexRef.current = levelIndex
            setCompletedLevelIndex(levelIndex)
            setPhase("success")
            return 0
          }
        } else {
          holdingStartedAtRef.current = null
          setPhase("building")
        }
      } else if (canHold) {
        holdingStartedAtRef.current = now
        setPhase("holding")
        holdRemaining = HOLD_SECONDS
      }

      return holdRemaining
    }
  }

  function destroyWorld() {
    const w = worldRef.current
    const Matter = matterRef.current
    if (!w || !Matter) return

    try {
      for (const cleanup of w.cleanup) cleanup()
      Matter.Render.stop(w.render)
      Matter.Runner.stop(w.runner)
      Matter.World.clear(w.engine.world, false)
      Matter.Engine.clear(w.engine)
      const ctx = canvasRef.current?.getContext("2d")
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    } catch {
      /* Keep reset resilient even if Matter is mid-frame. */
    }
    worldRef.current = null
  }

  function rebuildTower() {
    setStats({ ...initialStats })
    completedLevelIndexRef.current = null
    setCompletedLevelIndex(null)
    bestHeightRef.current = 0
    holdingStartedAtRef.current = null
    goalStableSinceRef.current = null
    holdSuppressedUntilInteractionRef.current = false
    collapseCandidateRef.current = null
    selectedBodyRef.current = null
    setPhase("loading")
    setResetKey((key) => key + 1)
  }

  function startMission() {
    if (phase === "loading" || phase === "error") return
    if (phase === "success" || phase === "collapsed") {
      rebuildTower()
      return
    }
    setPhase("building")
  }

  function continueBuilding() {
    const w = worldRef.current
    if (w) w.engine.timing.timeScale = 1
    holdingStartedAtRef.current = null
    goalStableSinceRef.current = null
    holdSuppressedUntilInteractionRef.current = true
    collapseCandidateRef.current = null
    lastInteractionAtRef.current = performance.now()
    setStats((current) => ({
      ...current,
      holdRemaining: HOLD_SECONDS,
      coach: copy.continueCoach,
    }))
    setPhase("building")
  }

  function nextLevel() {
    setLevelIndex((index) => Math.min(index + 1, LEVELS.length - 1))
    setStats({ ...initialStats, coach: copy.initialCoach })
    completedLevelIndexRef.current = null
    setCompletedLevelIndex(null)
    bestHeightRef.current = 0
    holdingStartedAtRef.current = null
    goalStableSinceRef.current = null
    holdSuppressedUntilInteractionRef.current = false
    collapseCandidateRef.current = null
    setPhase("loading")
  }

  function getCanvasPoint(event: ReactPointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    return {
      x: ((event.clientX - rect.left) / rect.width) * CANVAS_W,
      y: ((event.clientY - rect.top) / rect.height) * CANVAS_H,
    }
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLCanvasElement>) {
    const w = worldRef.current
    const Matter = matterRef.current
    if (!w || !Matter || phaseRef.current === "loading" || phaseRef.current === "error") return
    if (phaseRef.current === "success" || phaseRef.current === "collapsed") return

    const point = getCanvasPoint(event)
    const body = [...w.blocks].reverse().find((candidate) => pointInBody(candidate, point))
    if (!body) return

    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      body,
      pointerId: event.pointerId,
      last: { x: point.x, y: point.y, at: performance.now() },
    }
    selectedBodyRef.current = body
    lastInteractionAtRef.current = performance.now()
    holdSuppressedUntilInteractionRef.current = false

    const meta = w.blockMeta.get(body.id)
    if (meta) {
      meta.stableSince = null
    }

    body.render.strokeStyle = "#fef08a"
    body.render.lineWidth = 3
    Matter.Sleeping.set(body, false)
    Matter.Body.setVelocity(body, {
      x: body.velocity.x * 0.2,
      y: body.velocity.y * 0.2,
    })
    Matter.Body.setAngularVelocity(body, body.angularVelocity * 0.15)
    Matter.Composite.remove(w.engine.world, body)
    Matter.Composite.add(w.engine.world, body)
    w.blocks = w.blocks.filter((block) => block.id !== body.id)
    w.blocks.push(body)

    if (phaseRef.current === "ready" || phaseRef.current === "holding") {
      holdingStartedAtRef.current = null
      goalStableSinceRef.current = null
      setPhase("building")
    }
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLCanvasElement>) {
    const drag = dragRef.current
    const Matter = matterRef.current
    if (!drag || !Matter || drag.pointerId !== event.pointerId) return

    event.preventDefault()
    const point = getCanvasPoint(event)
    const now = performance.now()
    const dt = Math.max(16, now - drag.last.at)
    const target = {
      x: clamp(point.x, BLOCK_W / 2 + 6, CANVAS_W - BLOCK_W / 2 - 6),
      y: clamp(point.y, BLOCK_H / 2 + 6, PLATFORM_Y - BLOCK_H / 2),
    }
    const next = {
      x: drag.body.position.x + (target.x - drag.body.position.x) * 0.72,
      y: drag.body.position.y + (target.y - drag.body.position.y) * 0.72,
    }

    Matter.Sleeping.set(drag.body, false)
    Matter.Body.setPosition(drag.body, next)
    Matter.Body.setVelocity(drag.body, {
      x: clamp(((next.x - drag.last.x) / dt) * 16.67, -3.2, 3.2),
      y: clamp(((next.y - drag.last.y) / dt) * 16.67, -3.2, 3.2),
    })
    Matter.Body.setAngularVelocity(drag.body, drag.body.angularVelocity * 0.35)
    drag.last = { x: next.x, y: next.y, at: now }
    lastInteractionAtRef.current = now
  }

  function releaseDraggedBlock(event: ReactPointerEvent<HTMLCanvasElement>) {
    const drag = dragRef.current
    const Matter = matterRef.current
    if (!drag || !Matter || drag.pointerId !== event.pointerId) return

    event.preventDefault()
    try {
      event.currentTarget.releasePointerCapture(event.pointerId)
    } catch {
      /* Pointer capture may already be gone if the browser cancelled it. */
    }

    drag.body.render.strokeStyle = "rgba(30, 41, 59, 0.38)"
    drag.body.render.lineWidth = 1.5
    const w = worldRef.current
    const meta = w?.blockMeta.get(drag.body.id)
    if (meta) {
      meta.used = isBlockInBuildZone(drag.body, level)
      meta.stableSince = null
    }
    Matter.Body.setVelocity(drag.body, {
      x: clamp(drag.body.velocity.x, -2.4, 2.4),
      y: clamp(drag.body.velocity.y, -2.4, 2.4),
    })
    Matter.Body.setAngularVelocity(drag.body, clamp(drag.body.angularVelocity, -0.1, 0.1))
    selectedBodyRef.current = null
    dragRef.current = null
    holdingStartedAtRef.current = null
    goalStableSinceRef.current = null
    lastInteractionAtRef.current = performance.now()
  }

  const buildWorldRef = useRef(buildWorld)
  const destroyWorldRef = useRef(destroyWorld)
  buildWorldRef.current = buildWorld
  destroyWorldRef.current = destroyWorld

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    completedLevelIndexRef.current = completedLevelIndex
  }, [completedLevelIndex])

  useEffect(() => {
    let cancelled = false
    bestHeightRef.current = 0
    holdingStartedAtRef.current = null
    goalStableSinceRef.current = null
    holdSuppressedUntilInteractionRef.current = false
    collapseCandidateRef.current = null
    selectedBodyRef.current = null

    import("matter-js")
      .then((Matter) => {
        if (cancelled || !canvasRef.current) return
        matterRef.current = Matter
        buildWorldRef.current(Matter, canvasRef.current, level)
        setPhase("ready")
      })
      .catch(() => {
        if (!cancelled) setPhase("error")
      })

    return () => {
      cancelled = true
      destroyWorldRef.current()
    }
  }, [copy.holdCoach, copy.lostSupportRebuild, level, resetKey])

  const missionText = formatJenga(copy.mission, { rows: level.targetRows, seconds: HOLD_SECONDS })
  const phaseLabel = getPhaseLabel(phase, stats.band, copy)
  const hasNextLevel = levelIndex < LEVELS.length - 1
  const levelCompleted = phase === "success" || completedLevelIndex === levelIndex
  const supportGuideHeight = PLATFORM_Y - targetLineY
  const primaryActionLabel =
    phase === "ready"
      ? copy.start
      : levelCompleted
        ? hasNextLevel
          ? copy.nextChallenge
          : copy.keepBuilding
        : phase === "collapsed"
          ? copy.tryAgain
          : ""
  const showPrimaryAction = phase === "ready" || levelCompleted || phase === "collapsed"
  const primaryAction = levelCompleted ? (hasNextLevel ? nextLevel : continueBuilding) : startMission
  const hasTestedTower =
    stats.bestHeight > 0 || stats.stableHeight > 0 || phase === "holding" || levelCompleted || phase === "collapsed"
  const stabilityPercent = hasTestedTower ? stats.stability : 0
  const stabilityName = hasTestedTower ? stabilityLabel(stats.band, copy) : copy.notTested

  return (
    <section className="relative overflow-hidden bg-[#e9f4ff] py-16 md:py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <FadeIn className="max-w-4xl">
          <h2 className="text-balance text-3xl font-black leading-tight text-avanza-dark md:text-5xl">
            Tower Stability Lab
          </h2>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-slate-700 md:text-lg">
            Build to the goal line, balance the weight over the base, and keep the tower standing while the lab checks your design.
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <FadeIn delay={80}>
            <div
              role="application"
              aria-label={copy.stability}
              className="relative overflow-visible rounded-lg border border-sky-900/20 bg-[#0d3b66] shadow-[0_24px_60px_-32px_rgba(15,23,42,0.55)]"
              style={{ touchAction: "none" }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0"
                style={{
                  width: `${(CANVAS_W / PLAYFIELD_W) * 100}%`,
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.11) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
                  backgroundSize: "64px 64px, 64px 64px, 16px 16px, 16px 16px",
                }}
              />
              <canvas
                ref={canvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                className="relative z-10 block w-full cursor-grab active:cursor-grabbing"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={releaseDraggedBlock}
                onPointerCancel={releaseDraggedBlock}
                style={{
                  aspectRatio: `${CANVAS_W} / ${CANVAS_H}`,
                  maxWidth: "none",
                  width: `${(CANVAS_W / PLAYFIELD_W) * 100}%`,
                }}
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute z-[1] rounded-lg border border-sky-100/25 bg-slate-950/18 shadow-inner"
                style={{
                  left: `${(SUPPLY_TRAY_X / PLAYFIELD_W) * 100}%`,
                  top: `${(SUPPLY_TRAY_Y / CANVAS_H) * 100}%`,
                  width: `${(SUPPLY_TRAY_W / PLAYFIELD_W) * 100}%`,
                  height: `${(SUPPLY_TRAY_H / CANVAS_H) * 100}%`,
                }}
              >
                <span className="absolute left-4 top-3 text-[10px] font-black uppercase tracking-[0.2em] text-sky-50/85">
                  {copy.supplyTray}
                </span>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute z-[1] border-x border-emerald-200/60 bg-emerald-300/10"
                style={{
                  left: `${(supportLeft / PLAYFIELD_W) * 100}%`,
                  top: `${(targetLineY / CANVAS_H) * 100}%`,
                  width: `${(level.supportWidth / PLAYFIELD_W) * 100}%`,
                  height: `${(supportGuideHeight / CANVAS_H) * 100}%`,
                }}
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute z-20 bg-[#24324a] ring-1 ring-[#111827]"
                style={{
                  left: `${(supportLeft / PLAYFIELD_W) * 100}%`,
                  top: `${(PLATFORM_Y / CANVAS_H) * 100}%`,
                  width: `${(level.supportWidth / PLAYFIELD_W) * 100}%`,
                  height: `${(PLATFORM_H / CANVAS_H) * 100}%`,
                }}
              />

              <div className="pointer-events-none absolute top-3 z-30 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.16em] text-sky-50/85" style={{ left: `${(TOWER_CENTER_X / PLAYFIELD_W) * 100}%` }}>
                Build zone
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 z-[1] border-t-2 border-dashed border-amber-300/65"
                style={{
                  left: `${((SUPPLY_TRAY_X + SUPPLY_TRAY_W) / PLAYFIELD_W) * 100}%`,
                  top: `${(targetLineY / CANVAS_H) * 100}%`,
                }}
              >
                <span className="absolute right-3 z-30 -translate-y-1/2 rounded-sm bg-amber-300 px-2 py-1 text-xs font-black text-slate-950">
                  Goal: {level.targetRows} rows
                </span>
              </div>

              {level.wind && phase === "holding" && (
                <div className="pointer-events-none absolute inset-y-0 left-8 z-30 flex items-center gap-2 text-3xl font-black text-sky-100/80">
                  <span className="animate-pulse">→</span>
                  <span className="animate-pulse [animation-delay:120ms]">→</span>
                  <span className="animate-pulse [animation-delay:240ms]">→</span>
                </div>
              )}

              {phase === "loading" && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/45 backdrop-blur-sm">
                  <div className="rounded-lg bg-white px-5 py-4 text-center text-sm font-black text-avanza-dark shadow-lg">
                    Warming up the physics lab...
                  </div>
                </div>
              )}

              {phase === "error" && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/95 p-6 text-center text-sm font-black text-destructive">
                  The physics engine did not load. Refresh the page to try again.
                </div>
              )}

              {phase === "success" && (
                <OutcomeOverlay
                  level={level}
                  hasNextLevel={hasNextLevel}
                  onClose={continueBuilding}
                  onNext={nextLevel}
                  onRetry={rebuildTower}
                  copy={copy}
                />
              )}

              {phase === "collapsed" && (
                <CollapseOverlay
                  reason={stats.collapseReason || copy.lostSupport}
                  onRetry={rebuildTower}
                  onRebuild={rebuildTower}
                  copy={copy}
                />
              )}
            </div>
          </FadeIn>

          <FadeIn delay={160}>
            <aside className="grid gap-4">
              <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-avanza-teal-dark">
                  {formatJenga(copy.levelCount, { current: levelIndex + 1, total: LEVELS.length })}
                </p>
                <h3 className="mt-2 text-2xl font-black text-avanza-dark">{levelCopy.name}</h3>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">{missionText}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {showPrimaryAction && (
                    <button
                      type="button"
                      onClick={primaryAction}
                      className="rounded-md bg-avanza-orange px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-avanza-orange-dark"
                    >
                      {primaryActionLabel}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={rebuildTower}
                    className="rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-black text-avanza-dark transition hover:bg-slate-50"
                  >
                    {copy.rebuildTower}
                  </button>
                </div>
              </section>

              <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{copy.state}</p>
                    <p className="mt-1 text-xl font-black text-avanza-dark">{phaseLabel}</p>
                  </div>
                  {phase === "holding" && (
                    <div className="text-right">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{copy.hold}</p>
                      <p className="mt-1 text-3xl font-black text-avanza-orange">{stats.holdRemaining.toFixed(1)}s</p>
                    </div>
                  )}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <StatBox label={copy.stableHeight} value={stats.stableHeight} suffix={copy.rows} singularSuffix={copy.row} />
                  <StatBox label={copy.bestHeight} value={stats.bestHeight} suffix={copy.rows} singularSuffix={copy.row} />
                  <StatBox label={copy.target} value={level.targetRows} suffix={copy.rows} singularSuffix={copy.row} />
                </div>
              </section>

              <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black text-avanza-dark">{copy.stability}</p>
                  <p className={`text-sm font-black ${bandTextClass(stats.band)}`}>
                    {stabilityName} · {Math.round(stabilityPercent)}%
                  </p>
                </div>
                <div className="mt-3 h-4 overflow-hidden rounded-sm bg-slate-200" aria-label={`${copy.stability} ${Math.round(stabilityPercent)} percent, ${stabilityName}`}>
                  <div
                    className={`h-full transition-all duration-200 ${bandBarClass(stats.band)}`}
                    style={{ width: `${stabilityPercent}%` }}
                  />
                </div>
              </section>
            </aside>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

type TowerMetrics = {
  stableHeight: number
  goalReached: boolean
  stability: number
  band: StabilityBand
  coach: string
  centerOfMass: { x: number; y: number } | null
  movingShare: number
  scatteredShare: number
  comOffset: number
  heavyAbove: boolean
  collapseReason: string
  placedCount: number
  connectedCount: number
  disconnectedCount: number
  baseWidth: number
  leanOffset: number
}

function measureTower(
  blocks: MatterBody[],
  blockMeta: Map<number, BlockMeta>,
  selectedBody: MatterBody | null,
  level: Level,
  now: number,
): TowerMetrics {
  const supportLeft = TOWER_CENTER_X - level.supportWidth / 2
  const supportRight = TOWER_CENTER_X + level.supportWidth / 2
  const placedBlocks = blocks.filter((block) => {
    const meta = blockMeta.get(block.id)
    return Boolean(
      meta &&
        !meta.dropped &&
        !shouldDespawnBlock(block, meta, level) &&
        (meta.used || isBlockInBuildZone(block, level)),
    )
  })
  const buildBlocks = placedBlocks.filter((block) => block !== selectedBody && block.position.y < PLATFORM_Y + BLOCK_H * 1.25)
  const candidates = buildBlocks.filter((block) => {
    const speed = Math.hypot(block.velocity.x, block.velocity.y)
    const isSlow = speed < 0.55 && Math.abs(block.angularVelocity) < 0.075
    return isSlow && isBlockInBuildZone(block, level) && block.bounds.max.y <= PLATFORM_Y + 8
  })

  const prelimSupported = getSupportedBlocks(candidates, level)
  for (const block of blocks) {
    const meta = blockMeta.get(block.id)
    if (!meta || meta.dropped) continue
    if (prelimSupported.has(block)) {
      meta.stableSince ??= now
    } else {
      meta.stableSince = null
    }
  }

  const stableCandidates = candidates.filter((block) => {
    const meta = blockMeta.get(block.id)
    return meta?.stableSince !== null && meta?.stableSince !== undefined && now - meta.stableSince >= STABLE_WINDOW_MS
  })
  const supportedStableSet = getSupportedBlocks(stableCandidates, level)
  const stableBlocks = stableCandidates.filter((block) => supportedStableSet.has(block))
  const disconnectedBlocks = stableCandidates.filter((block) => !supportedStableSet.has(block) && isBlockInBuildZone(block, level))
  const baseBlocks = stableBlocks.filter((block) => isSupportedByBase(block, supportLeft, supportRight))

  const measuredBlocks = buildBlocks.length > 0 ? buildBlocks : stableBlocks
  const centerOfMass = getCenterOfMass(measuredBlocks)
  const comOffset = centerOfMass ? Math.abs(centerOfMass.x - TOWER_CENTER_X) / (level.supportWidth / 2) : 0
  const signedComOffset = centerOfMass ? (centerOfMass.x - TOWER_CENTER_X) / (level.supportWidth / 2) : 0
  const movingBlocks = buildBlocks.filter((block) => Math.hypot(block.velocity.x, block.velocity.y) > 0.7 || Math.abs(block.angularVelocity) > 0.075)
  const fastBlocks = buildBlocks.filter((block) => Math.hypot(block.velocity.x, block.velocity.y) > 2.4 || Math.abs(block.angularVelocity) > 0.22)
  const scatteredBlocks = placedBlocks.filter((block) => {
    const farSideways = Math.abs(block.position.x - TOWER_CENTER_X) > BUILD_ZONE_WIDTH / 2 + 68
    const belowPlatform = block.position.y > PLATFORM_Y + 28
    return farSideways || belowPlatform
  })
  const airborneBlocks = buildBlocks.filter((block) => {
    const fallingOrFlying = Math.abs(block.velocity.y) > 0.55 || Math.hypot(block.velocity.x, block.velocity.y) > 1.2
    return fallingOrFlying && !prelimSupported.has(block)
  })
  const movingShare = buildBlocks.length ? movingBlocks.length / buildBlocks.length : 0
  const scatteredShare = placedBlocks.length ? scatteredBlocks.length / placedBlocks.length : 0
  const disconnectedShare = buildBlocks.length ? disconnectedBlocks.length / buildBlocks.length : 0
  const airborneShare = buildBlocks.length ? airborneBlocks.length / buildBlocks.length : 0
  const leanAverage = buildBlocks.length
    ? buildBlocks.reduce((sum, block) => sum + Math.abs(normalizedAngle(block.angle)), 0) / buildBlocks.length
    : 0

  const highestTop = stableBlocks.length
    ? Math.min(...stableBlocks.map((block) => block.bounds.min.y))
    : PLATFORM_Y
  const heightPx = Math.max(0, PLATFORM_Y - highestTop)
  const goalReached = highestTop <= PLATFORM_Y - (level.targetRows - 1) * BLOCK_H
  const stableHeight = clampInt(Math.ceil((heightPx - 2) / BLOCK_H), 0, level.targetRows + 3)

  const baseWidth = baseBlocks.length
    ? Math.max(...baseBlocks.map((block) => block.bounds.max.x)) - Math.min(...baseBlocks.map((block) => block.bounds.min.x))
    : 0
  const baseCenter = baseBlocks.length
    ? baseBlocks.reduce((sum, block) => sum + block.position.x, 0) / baseBlocks.length
    : TOWER_CENTER_X
  const topBlocks = stableBlocks.filter((block) => block.bounds.min.y <= highestTop + BLOCK_H * 1.25)
  const topCenter = topBlocks.length
    ? topBlocks.reduce((sum, block) => sum + block.position.x, 0) / topBlocks.length
    : baseCenter
  const leanOffset = stableHeight >= 2 ? (topCenter - baseCenter) / (level.supportWidth / 2) : 0

  const heavyAbove = buildBlocks.some((block) => {
    const meta = blockMeta.get(block.id)
    return meta?.kind === "heavy" && block.position.y < PLATFORM_Y - BLOCK_H * Math.max(3, level.targetRows * 0.45)
  })
  const narrowBasePenalty = stableHeight >= 4 && baseWidth > 0 && baseWidth < BLOCK_W * 1.45 ? 6 : 0

  const stability = clamp(
    100 -
      comOffset * 38 -
      Math.abs(leanOffset) * 28 -
      movingShare * 74 -
      scatteredShare * 88 -
      disconnectedShare * 66 -
      airborneShare * 58 -
      leanAverage * 72 -
      (heavyAbove ? 14 : 0) -
      narrowBasePenalty,
    0,
    100,
  )
  const collapseReason = getCollapseReason({
    airborneBlocks: airborneBlocks.length,
    buildBlocks: buildBlocks.length,
    comOffset,
    disconnectedBlocks: disconnectedBlocks.length,
    fastBlocks: fastBlocks.length,
    heavyAbove,
    leanOffset,
    scatteredBlocks: scatteredBlocks.length,
    stableHeight,
    stability,
  })
  const band: StabilityBand = collapseReason
    ? "collapsed"
    : stability >= 68
      ? "stable"
      : stability >= 44
        ? "wobbling"
        : "danger"

  return {
    stableHeight,
    goalReached,
    stability,
    band,
    coach: getCoachMessage({
      band,
      comOffset,
      disconnectedCount: disconnectedBlocks.length,
      heavyAbove,
      level,
      leanOffset,
      movingShare,
      signedComOffset,
      stableHeight,
      baseWidth,
    }),
    centerOfMass,
    movingShare,
    scatteredShare,
    comOffset,
    heavyAbove,
    collapseReason,
    placedCount: buildBlocks.length,
    connectedCount: stableBlocks.length,
    disconnectedCount: disconnectedBlocks.length,
    baseWidth,
    leanOffset,
  }
}

function getBuildZoneBounds() {
  return {
    left: TOWER_CENTER_X - BUILD_ZONE_WIDTH / 2,
    right: TOWER_CENTER_X + BUILD_ZONE_WIDTH / 2,
  }
}

function shouldDespawnBlock(block: MatterBody, meta: BlockMeta, level: Level) {
  if (meta.dropped) return false
  if (isBlockOffScreen(block)) return true
  return meta.used && hasFallenOffPlatform(block, level)
}

function isBlockOffScreen(block: MatterBody) {
  return (
    block.bounds.max.x < -RIGHT_FALLOFF_W ||
    block.bounds.min.x > CANVAS_W + RIGHT_FALLOFF_W ||
    block.bounds.min.y > CANVAS_H + 80 ||
    block.bounds.max.y < -160
  )
}

function hasFallenOffPlatform(block: MatterBody, level: Level) {
  const platformLeft = PLATFORM_CENTER_X - (level.supportWidth + 36) / 2
  const platformRight = PLATFORM_CENTER_X + (level.supportWidth + 36) / 2
  const platformOverlap = horizontalOverlap(block.bounds.min.x, block.bounds.max.x, platformLeft, platformRight)

  return block.bounds.min.y > PLATFORM_Y + 6 && platformOverlap < BLOCK_W * 0.12
}

function isBlockInBuildZone(block: MatterBody, level: Level) {
  const { left, right } = getBuildZoneBounds()
  const margin = Math.max(34, (BUILD_ZONE_WIDTH - level.supportWidth) / 2)
  return (
    block.position.x > left - margin * 0.25 &&
    block.position.x < right + margin * 0.25 &&
    block.position.y < PLATFORM_Y + BLOCK_H * 0.8 &&
    block.position.y > PLATFORM_Y - BLOCK_H * (level.targetRows + 3.2)
  )
}

function getSupportedBlocks(blocks: MatterBody[], level: Level) {
  const supportLeft = TOWER_CENTER_X - level.supportWidth / 2
  const supportRight = TOWER_CENTER_X + level.supportWidth / 2
  const baseBlocks = blocks.filter((block) => isSupportedByBase(block, supportLeft, supportRight))
  const visited = new Set<MatterBody>()
  const components: MatterBody[][] = []

  for (const base of baseBlocks) {
    if (visited.has(base)) continue
    const group: MatterBody[] = []
    const queue = [base]
    visited.add(base)

    while (queue.length) {
      const current = queue.shift()
      if (!current) continue
      group.push(current)

      for (const next of blocks) {
        if (visited.has(next) || !blocksAreConnected(current, next)) continue
        visited.add(next)
        queue.push(next)
      }
    }

    components.push(group)
  }

  if (!components.length) return new Set<MatterBody>()
  components.sort((a, b) => {
    const heightA = PLATFORM_Y - Math.min(...a.map((block) => block.bounds.min.y))
    const heightB = PLATFORM_Y - Math.min(...b.map((block) => block.bounds.min.y))
    const countDiff = b.length - a.length
    if (Math.abs(heightB - heightA) > BLOCK_H * 0.6) return heightB - heightA
    if (countDiff !== 0) return countDiff
    const centerA = Math.abs(a.reduce((sum, block) => sum + block.position.x, 0) / a.length - TOWER_CENTER_X)
    const centerB = Math.abs(b.reduce((sum, block) => sum + block.position.x, 0) / b.length - TOWER_CENTER_X)
    return centerA - centerB
  })

  return new Set(components[0])
}

function isSupportedByBase(block: MatterBody, supportLeft: number, supportRight: number) {
  const overlap = horizontalOverlap(block.bounds.min.x, block.bounds.max.x, supportLeft, supportRight)
  const bottomCloseToPlatform = block.bounds.max.y >= PLATFORM_Y - 5 && block.bounds.max.y <= PLATFORM_Y + 10
  return bottomCloseToPlatform && overlap >= Math.min(BLOCK_W * 0.28, block.bounds.max.x - block.bounds.min.x)
}

function isSupportedByBlock(block: MatterBody, below: MatterBody) {
  if (block === below || block.position.y >= below.position.y) return false
  const verticalGap = Math.abs(block.bounds.max.y - below.bounds.min.y)
  if (verticalGap > 9) return false
  const overlap = horizontalOverlap(block.bounds.min.x, block.bounds.max.x, below.bounds.min.x, below.bounds.max.x)
  return overlap >= BLOCK_W * 0.24
}

function blocksAreConnected(a: MatterBody, b: MatterBody) {
  return isSupportedByBlock(a, b) || isSupportedByBlock(b, a) || blocksTouchSideBySide(a, b)
}

function blocksTouchSideBySide(a: MatterBody, b: MatterBody) {
  const verticalOverlap = horizontalOverlap(a.bounds.min.y, a.bounds.max.y, b.bounds.min.y, b.bounds.max.y)
  const gap = Math.min(Math.abs(a.bounds.max.x - b.bounds.min.x), Math.abs(b.bounds.max.x - a.bounds.min.x))
  return verticalOverlap >= BLOCK_H * 0.45 && gap <= 8
}

function horizontalOverlap(leftA: number, rightA: number, leftB: number, rightB: number) {
  return Math.max(0, Math.min(rightA, rightB) - Math.max(leftA, leftB))
}

function getCollapseReason({
  airborneBlocks,
  buildBlocks,
  comOffset,
  disconnectedBlocks,
  fastBlocks,
  heavyAbove,
  leanOffset,
  scatteredBlocks,
  stableHeight,
  stability,
}: {
  airborneBlocks: number
  buildBlocks: number
  comOffset: number
  disconnectedBlocks: number
  fastBlocks: number
  heavyAbove: boolean
  leanOffset: number
  scatteredBlocks: number
  stableHeight: number
  stability: number
}) {
  if (buildBlocks < 3) return ""
  if (scatteredBlocks >= 2) return "Blocks scattered outside the build zone."
  if (fastBlocks >= Math.max(3, Math.ceil(buildBlocks * 0.34))) return "Too many blocks were moving at once."
  if (stableHeight >= 3 && Math.abs(leanOffset) > 1.08) return "The top leaned too far outside the base."
  if (stableHeight >= 2 && comOffset > 1.24) return "The center of weight moved outside the support zone."
  if (buildBlocks >= 5 && disconnectedBlocks >= Math.max(2, Math.ceil(buildBlocks * 0.34))) {
    return "The tower split into separate piles."
  }
  if (buildBlocks >= 5 && airborneBlocks >= Math.max(2, Math.ceil(buildBlocks * 0.32))) {
    return "Too many blocks were airborne or falling."
  }
  if (heavyAbove && stability < 45) return "A heavy block near the top made the tower unstable."
  return ""
}

function getCoachMessage({
  band,
  comOffset,
  disconnectedCount,
  heavyAbove,
  level,
  leanOffset,
  movingShare,
  signedComOffset,
  stableHeight,
  baseWidth,
}: {
  band: StabilityBand
  comOffset: number
  disconnectedCount: number
  heavyAbove: boolean
  level: Level
  leanOffset: number
  movingShare: number
  signedComOffset: number
  stableHeight: number
  baseWidth: number
}) {
  if (band === "collapsed") {
    return "The tower lost its support path. Rebuild from a wider, calmer base."
  }
  if (stableHeight >= level.targetRows && band === "stable") {
    return "Great build. Keep your hands off and let the tower prove it can stand."
  }
  if (disconnectedCount > 0) {
    return "That block is not supported by the main tower yet. Connect it back to the base."
  }
  if (movingShare > 0.18) {
    return "Let the tower settle before adding another block."
  }
  if (Math.abs(leanOffset) > 0.68) {
    return leanOffset < 0
      ? "The top is leaning left. Place the next block slightly to the right."
      : "The top is leaning right. Move weight back toward the center."
  }
  if (comOffset > 1.08) {
    return "The weight center is outside the support zone. Shift the top back over the base."
  }
  if (comOffset > 0.72) {
    return signedComOffset < 0
      ? "Your tower is leaning left. Place the next block slightly to the right."
      : "Your tower is leaning right. Move weight back toward the center."
  }
  if (heavyAbove) {
    return "Heavy blocks are safer near the bottom where they can support lighter pieces."
  }
  if (stableHeight >= 3 && baseWidth > 0 && baseWidth < BLOCK_W * 1.65) {
    return "Your base is narrow. A wider bottom will support more height."
  }
  if (level.supportWidth < 260 && stableHeight >= 3) {
    return "On a narrow base, tiny leaning errors matter. Keep each row centered."
  }
  if (band === "danger") {
    return "Danger zone. Slow down and rebuild the base before going taller."
  }
  if (band === "wobbling") {
    return "The tower is unsteady. Lower blocks should be wide and centered before you build up."
  }
  if (stableHeight <= 1) {
    return "Start with a wide base, then stack blocks near the center line."
  }
  return "Nice. Your tower is centered and settling well."
}

function drawBlockDetails(
  ctx: CanvasRenderingContext2D,
  blocks: MatterBody[],
  blockMeta: Map<number, BlockMeta>,
  selectedBody: MatterBody | null,
) {
  for (const block of blocks) {
    const meta = blockMeta.get(block.id)
    if (!meta || meta.dropped || block.render.visible === false) continue

    ctx.save()
    ctx.translate(block.position.x, block.position.y)
    ctx.rotate(block.angle)
    ctx.fillStyle = "rgba(255, 255, 255, 0.18)"
    ctx.fillRect(-BLOCK_W / 2 + 8, -BLOCK_H / 2 + 5, BLOCK_W - 16, 2)
    ctx.fillStyle = meta.kind === "heavy" ? "rgba(255,255,255,0.72)" : "rgba(68,38,18,0.22)"
    ctx.fillRect(-BLOCK_W / 2 + 10, BLOCK_H / 2 - 7, BLOCK_W - 20, 2)
    if (meta.kind === "heavy") {
      ctx.fillStyle = "rgba(255,255,255,0.24)"
      for (let mark = -1; mark <= 1; mark++) {
        ctx.beginPath()
        ctx.arc(mark * 12, 0, 4, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    ctx.restore()
  }

  if (selectedBody) {
    ctx.save()
    ctx.beginPath()
    selectedBody.vertices.forEach((vertex, index) => {
      if (index === 0) ctx.moveTo(vertex.x, vertex.y)
      else ctx.lineTo(vertex.x, vertex.y)
    })
    ctx.closePath()
    ctx.strokeStyle = "#fef08a"
    ctx.lineWidth = 5
    ctx.shadowColor = "rgba(254, 240, 138, 0.75)"
    ctx.shadowBlur = 18
    ctx.stroke()
    ctx.restore()
  }
}

function supplySlot(index: number) {
  const column = index % SUPPLY_COLUMNS
  const row = Math.floor(index / SUPPLY_COLUMNS)
  return {
    x: SUPPLY_TRAY_X + 66 + column * 106,
    y: SUPPLY_TRAY_Y + SUPPLY_TRAY_H - BLOCK_H / 2 - SUPPLY_TRAY_BOTTOM_CLEARANCE - row * (BLOCK_H + 4),
  }
}

function getBlockKind(level: Level, index: number): BlockKind {
  if (!level.mixedWeights) return "normal"
  if (index % 5 === 0 || index % 7 === 0) return "heavy"
  if (index % 4 === 0) return "light"
  return "normal"
}

function getCenterOfMass(blocks: MatterBody[]) {
  if (!blocks.length) return null
  const totalMass = blocks.reduce((sum, block) => sum + block.mass, 0)
  return {
    x: blocks.reduce((sum, block) => sum + block.position.x * block.mass, 0) / totalMass,
    y: blocks.reduce((sum, block) => sum + block.position.y * block.mass, 0) / totalMass,
  }
}

function normalizedAngle(angle: number) {
  let normalized = angle % Math.PI
  if (normalized > Math.PI / 2) normalized -= Math.PI
  if (normalized < -Math.PI / 2) normalized += Math.PI
  return normalized
}

function pointInBody(body: MatterBody, point: { x: number; y: number }) {
  if (
    point.x < body.bounds.min.x ||
    point.x > body.bounds.max.x ||
    point.y < body.bounds.min.y ||
    point.y > body.bounds.max.y
  ) {
    return false
  }

  let inside = false
  const vertices = body.vertices
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const current = vertices[i]
    const previous = vertices[j]
    const intersects =
      current.y > point.y !== previous.y > point.y &&
      point.x < ((previous.x - current.x) * (point.y - current.y)) / (previous.y - current.y) + current.x
    if (intersects) inside = !inside
  }
  return inside
}

function OutcomeOverlay({
  level,
  hasNextLevel,
  onClose,
  onNext,
  onRetry,
  copy,
}: {
  level: Level
  hasNextLevel: boolean
  onClose: () => void
  onNext: () => void
  onRetry: () => void
  copy: (typeof JENGA_COPY)[Language]
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/62 p-4 backdrop-blur-sm">
      <Confetti />
      <div className="relative max-w-md rounded-lg bg-white p-6 text-center shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.closeComplete}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md text-xl font-black text-slate-500 transition hover:bg-slate-100 hover:text-avanza-dark focus:outline-none focus:ring-2 focus:ring-avanza-orange"
        >
          x
        </button>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-avanza-green-dark">
          {copy.levelComplete}
        </p>
        <h3 className="mt-2 text-3xl font-black text-avanza-dark">
          {copy.greatBuild}
        </h3>
        <p className="mt-3 text-sm font-bold leading-relaxed text-slate-700">
          {formatJenga(copy.success, { rows: level.targetRows, seconds: HOLD_SECONDS })}
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onRetry}
            className="rounded-md bg-avanza-dark px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
          >
            {copy.rebuildThisLevel}
          </button>
          {hasNextLevel && (
            <button
              type="button"
              onClick={onNext}
              className="rounded-md bg-avanza-orange px-5 py-3 text-sm font-black text-white transition hover:bg-avanza-orange-dark"
            >
              {copy.nextChallenge}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function CollapseOverlay({
  reason,
  onRetry,
  onRebuild,
  copy,
}: {
  reason: string
  onRetry: () => void
  onRebuild: () => void
  copy: (typeof JENGA_COPY)[Language]
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/68 p-4 backdrop-blur-sm">
      <div className="max-w-md rounded-lg bg-white p-6 text-center shadow-2xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-destructive">
          {copy.towerCollapsed}
        </p>
        <h3 className="mt-2 text-3xl font-black text-avanza-dark">
          {copy.rebuildSupport}
        </h3>
        <p className="mt-3 text-sm font-bold leading-relaxed text-slate-700">{reason}</p>
        <p className="mt-3 border-l-4 border-avanza-orange bg-orange-50 px-3 py-3 text-left text-sm font-bold leading-relaxed text-slate-700">
          {copy.collapseTip}
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onRetry}
            className="rounded-md bg-avanza-orange px-5 py-3 text-sm font-black text-white transition hover:bg-avanza-orange-dark"
          >
            {copy.tryAgain}
          </button>
          <button
            type="button"
            onClick={onRebuild}
            className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-black text-avanza-dark transition hover:bg-slate-50"
          >
            {copy.rebuildTower}
          </button>
        </div>
      </div>
    </div>
  )
}

function Confetti() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 26 }, (_, index) => (
        <span
          key={index}
          className="absolute h-3 w-2 animate-[confetti-fall_1.6s_ease-in_forwards]"
          style={{
            left: `${(index * 37) % 100}%`,
            top: "-8%",
            backgroundColor: ["#2ecc71", "#f97316", "#06b6d4", "#8b5cf6", "#facc15"][index % 5],
            animationDelay: `${(index % 9) * 0.08}s`,
            "--confetti-spin": `${180 + index * 38}deg`,
          } as CSSProperties}
        />
      ))}
    </div>
  )
}

function StatBox({
  label,
  value,
  suffix,
  singularSuffix,
}: {
  label: string
  value: number
  suffix: string
  singularSuffix: string
}) {
  const displaySuffix = value === 1 ? singularSuffix : suffix

  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-[10px] font-black uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-black text-avanza-dark">{value}</p>
      <p className="text-[11px] font-bold text-slate-500">{displaySuffix}</p>
    </div>
  )
}

function getPhaseLabel(phase: GamePhase, band: StabilityBand, copy: (typeof JENGA_COPY)[Language]) {
  if (band === "collapsed") return copy.band.collapsed
  if (phase === "building") return copy.band[band]
  return copy.phase[phase]
}

function stabilityLabel(band: StabilityBand, copy: (typeof JENGA_COPY)[Language]) {
  return copy.band[band]
}

function bandTextClass(band: StabilityBand) {
  if (band === "stable") return "text-avanza-green-dark"
  if (band === "wobbling") return "text-amber-700"
  return "text-destructive"
}

function bandBarClass(band: StabilityBand) {
  if (band === "stable") return "bg-avanza-green"
  if (band === "wobbling") return "bg-amber-400"
  return "bg-destructive"
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function clampInt(value: number, min: number, max: number) {
  return Math.round(clamp(value, min, max))
}

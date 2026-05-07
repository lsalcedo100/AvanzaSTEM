"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Globe2, Pause, Play, RotateCcw, Sparkles, Trash2 } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"

const CANVAS_W = 720
const CANVAS_H = 460
const G = 0.5 // tuned for visual demo
const SOFTEN = 14 // softening to avoid singularity

type Body = {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  m: number
  color: string
  trail: Array<[number, number]>
}

const COLORS = [
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#22c55e",
  "#ec4899",
]

let nextId = 1

function defaultScene(): Body[] {
  return [
    {
      id: nextId++,
      x: CANVAS_W / 2,
      y: CANVAS_H / 2,
      vx: 0,
      vy: 0,
      m: 1800,
      color: "#fbbf24",
      trail: [],
    },
    {
      id: nextId++,
      x: CANVAS_W / 2 + 140,
      y: CANVAS_H / 2,
      vx: 0,
      vy: 1.6,
      m: 18,
      color: "#06b6d4",
      trail: [],
    },
    {
      id: nextId++,
      x: CANVAS_W / 2 - 200,
      y: CANVAS_H / 2,
      vx: 0,
      vy: -1.3,
      m: 14,
      color: "#ef4444",
      trail: [],
    },
  ]
}

export function GravitySandbox() {
  const { t } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bodiesRef = useRef<Body[]>(defaultScene())
  const animRef = useRef<number | null>(null)
  const [paused, setPaused] = useState(false)
  const [mass, setMass] = useState(40)
  const [bodyCount, setBodyCount] = useState(3)

  // For drag-to-launch: pointer state
  const dragRef = useRef<{
    active: boolean
    startX: number
    startY: number
    currentX: number
    currentY: number
  }>({ active: false, startX: 0, startY: 0, currentX: 0, currentY: 0 })

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    if (canvas.width !== CANVAS_W * dpr || canvas.height !== CANVAS_H * dpr) {
      canvas.width = CANVAS_W * dpr
      canvas.height = CANVAS_H * dpr
      ctx.scale(dpr, dpr)
    }

    // Background
    ctx.fillStyle = "#0b0e1f"
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

    // Stars (cheap deterministic background)
    ctx.fillStyle = "rgba(255,255,255,0.55)"
    for (let i = 0; i < 60; i++) {
      const sx = (i * 53) % CANVAS_W
      const sy = (i * 89 + (i % 7) * 17) % CANVAS_H
      const r = (i % 5) === 0 ? 1.4 : 0.7
      ctx.beginPath()
      ctx.arc(sx, sy, r, 0, Math.PI * 2)
      ctx.fill()
    }

    // Trails
    for (const b of bodiesRef.current) {
      if (b.trail.length < 2) continue
      ctx.beginPath()
      ctx.strokeStyle = b.color + "55"
      ctx.lineWidth = 1.5
      ctx.moveTo(b.trail[0][0], b.trail[0][1])
      for (let i = 1; i < b.trail.length; i++) {
        ctx.lineTo(b.trail[i][0], b.trail[i][1])
      }
      ctx.stroke()
    }

    // Bodies
    for (const b of bodiesRef.current) {
      const r = Math.max(4, Math.cbrt(b.m) * 1.4)
      // Glow
      const grd = ctx.createRadialGradient(b.x, b.y, r * 0.5, b.x, b.y, r * 3)
      grd.addColorStop(0, b.color + "cc")
      grd.addColorStop(1, b.color + "00")
      ctx.fillStyle = grd
      ctx.beginPath()
      ctx.arc(b.x, b.y, r * 3, 0, Math.PI * 2)
      ctx.fill()
      // Body
      ctx.fillStyle = b.color
      ctx.beginPath()
      ctx.arc(b.x, b.y, r, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "rgba(0,0,0,0.4)"
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Drag-to-launch arrow preview
    const drag = dragRef.current
    if (drag.active) {
      ctx.strokeStyle = "rgba(255,255,255,0.7)"
      ctx.lineWidth = 2
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(drag.startX, drag.startY)
      ctx.lineTo(drag.currentX, drag.currentY)
      ctx.stroke()
      ctx.setLineDash([])
      // Phantom planet at start
      const r = Math.max(3, Math.cbrt(mass) * 1.4)
      ctx.fillStyle = "rgba(255,255,255,0.85)"
      ctx.beginPath()
      ctx.arc(drag.startX, drag.startY, r, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [mass])

  const stepPhysics = useCallback(() => {
    const bodies = bodiesRef.current
    // Compute accelerations
    const ax = new Array(bodies.length).fill(0)
    const ay = new Array(bodies.length).fill(0)
    for (let i = 0; i < bodies.length; i++) {
      for (let j = 0; j < bodies.length; j++) {
        if (i === j) continue
        const dx = bodies[j].x - bodies[i].x
        const dy = bodies[j].y - bodies[i].y
        const r2 = dx * dx + dy * dy + SOFTEN * SOFTEN
        const r = Math.sqrt(r2)
        const f = (G * bodies[j].m) / r2
        ax[i] += (f * dx) / r
        ay[i] += (f * dy) / r
      }
    }
    // Integrate (semi-implicit Euler)
    for (let i = 0; i < bodies.length; i++) {
      bodies[i].vx += ax[i]
      bodies[i].vy += ay[i]
      bodies[i].x += bodies[i].vx
      bodies[i].y += bodies[i].vy
      // Trail
      bodies[i].trail.push([bodies[i].x, bodies[i].y])
      if (bodies[i].trail.length > 220) bodies[i].trail.shift()
    }
    // Bounce off walls (light)
    for (const b of bodies) {
      if (b.x < 0) {
        b.x = 0
        b.vx = -b.vx * 0.7
      } else if (b.x > CANVAS_W) {
        b.x = CANVAS_W
        b.vx = -b.vx * 0.7
      }
      if (b.y < 0) {
        b.y = 0
        b.vy = -b.vy * 0.7
      } else if (b.y > CANVAS_H) {
        b.y = CANVAS_H
        b.vy = -b.vy * 0.7
      }
    }
    // Merge close bodies (simple)
    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        const dx = bodies[j].x - bodies[i].x
        const dy = bodies[j].y - bodies[i].y
        const d = Math.hypot(dx, dy)
        const ri = Math.cbrt(bodies[i].m) * 1.4
        const rj = Math.cbrt(bodies[j].m) * 1.4
        if (d < (ri + rj) * 0.55) {
          // Conservation of momentum
          const totalM = bodies[i].m + bodies[j].m
          const big = bodies[i].m >= bodies[j].m ? bodies[i] : bodies[j]
          const small = bodies[i].m >= bodies[j].m ? bodies[j] : bodies[i]
          big.vx = (big.vx * big.m + small.vx * small.m) / totalM
          big.vy = (big.vy * big.m + small.vy * small.m) / totalM
          big.m = totalM
          // remove small
          const smallIdx = bodies.indexOf(small)
          bodies.splice(smallIdx, 1)
          break
        }
      }
    }
    setBodyCount(bodies.length)
  }, [])

  useEffect(() => {
    const tick = () => {
      if (!paused) stepPhysics()
      draw()
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [draw, stepPhysics, paused])

  const getPos = (e: PointerEvent | React.PointerEvent): { x: number; y: number } => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * CANVAS_W
    const y = ((e.clientY - rect.top) / rect.height) * CANVAS_H
    return { x, y }
  }

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault()
    canvasRef.current?.setPointerCapture(e.pointerId)
    const { x, y } = getPos(e)
    dragRef.current = {
      active: true,
      startX: x,
      startY: y,
      currentX: x,
      currentY: y,
    }
  }
  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!dragRef.current.active) return
    const { x, y } = getPos(e)
    dragRef.current.currentX = x
    dragRef.current.currentY = y
  }
  function onPointerUp(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!dragRef.current.active) return
    canvasRef.current?.releasePointerCapture(e.pointerId)
    const { startX, startY, currentX, currentY } = dragRef.current
    const dx = currentX - startX
    const dy = currentY - startY
    // Velocity from drag distance / 40
    const vx = dx / 40
    const vy = dy / 40
    bodiesRef.current.push({
      id: nextId++,
      x: startX,
      y: startY,
      vx,
      vy,
      m: mass,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      trail: [],
    })
    setBodyCount(bodiesRef.current.length)
    dragRef.current.active = false
  }

  function reset() {
    bodiesRef.current = defaultScene()
    setBodyCount(bodiesRef.current.length)
    setPaused(false)
  }
  function clearAll() {
    bodiesRef.current = []
    setBodyCount(0)
    setPaused(false)
  }

  return (
    <section className="relative overflow-hidden bg-[#0b0e1f] py-20 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 14% 14%, rgba(139,92,246,0.18) 0 6px, transparent 8px), radial-gradient(circle at 86% 22%, rgba(46,204,113,0.18) 0 5px, transparent 7px), radial-gradient(circle at 18% 84%, rgba(249,115,22,0.18) 0 4px, transparent 6px), radial-gradient(circle at 84% 88%, rgba(26,188,156,0.18) 0 5px, transparent 7px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-white/30 bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            <Globe2 className="h-3.5 w-3.5 text-avanza-teal" />
            {t.gamesPage.gravityEyebrow}
          </span>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-primary-foreground md:text-5xl">
            {t.gamesPage.gravityTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            {t.gamesPage.gravityDesc}
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            {/* Canvas card */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-white/10 [transform:rotate(-0.6deg)]"
              />
              <div className="relative overflow-hidden rounded-3xl bg-[#0b0e1f] p-3 shadow-[0_28px_64px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
                <canvas
                  ref={canvasRef}
                  width={CANVAS_W}
                  height={CANVAS_H}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                  className="block w-full cursor-crosshair touch-none rounded-2xl"
                  style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}
                />
                <div className="mt-3 flex flex-wrap items-center gap-3 px-2">
                  <div className="flex-1 min-w-[180px]">
                    <label className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-white/60">
                      <span>{t.gamesPage.gravityMass}</span>
                      <span className="font-mono text-white/80">{mass}</span>
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={500}
                      value={mass}
                      onChange={(e) => setMass(Number(e.target.value))}
                      className="mt-1 w-full accent-avanza-teal"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setPaused((p) => !p)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/85 transition hover:bg-white/20"
                  >
                    {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                    {paused ? t.gamesPage.gravityPlay : t.gamesPage.gravityPause}
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/85 transition hover:bg-white/20"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {t.gamesPage.gravityReset}
                  </button>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/85 transition hover:bg-white/20"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {t.gamesPage.gravityClear}
                  </button>
                </div>
              </div>
            </div>

            {/* Side info */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-white/10 [transform:rotate(0.7deg)]"
              />
              <div className="relative flex h-full flex-col gap-4 rounded-3xl bg-white/8 p-7 text-white shadow-[0_28px_64px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/15 backdrop-blur-md">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-avanza-teal/30 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
                  <Sparkles className="h-3.5 w-3.5 text-avanza-teal" />
                  {t.gamesPage.gravityFactEyebrow}
                </div>
                <h3 className="text-2xl font-extrabold leading-tight md:text-3xl">
                  {t.gamesPage.gravityFactTitle}
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  {t.gamesPage.gravityFactBody}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <Stat label={t.gamesPage.gravityBodies} value={String(bodyCount)} />
                  <Stat label={t.gamesPage.gravityStatus} value={paused ? t.gamesPage.gravityPaused : t.gamesPage.gravityRunning} />
                </div>
                <ul className="mt-2 space-y-2 text-sm text-white/85">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-avanza-orange" />
                    {t.gamesPage.gravityTip1}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-avanza-green" />
                    {t.gamesPage.gravityTip2}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-avanza-purple" />
                    {t.gamesPage.gravityTip3}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className={cn("rounded-2xl bg-white/8 p-3 ring-1 ring-white/10")}>
      <dt className="text-[10px] font-extrabold uppercase tracking-wider text-white/60">{label}</dt>
      <dd className="mt-0.5 font-mono text-base font-extrabold text-white">{value}</dd>
    </div>
  )
}

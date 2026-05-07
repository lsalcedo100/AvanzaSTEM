"use client"

import { useEffect, useRef, useState } from "react"
import { Hammer, RotateCcw, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"

declare global {
  interface Window {
    // matter-js is attached as window.Matter when the CDN script loads
    // We type it as unknown to avoid taking on @types/matter-js as a dep.
    Matter?: unknown
  }
}

const ROWS = 7
const COLS = 3
const BLOCK_W = 100
const BLOCK_H = 24
const GAP = 2
const CANVAS_W = 520
const CANVAS_H = 460

const TONES = [
  "#f59e0b",
  "#f97316",
  "#ea580c",
  "#dc2626",
  "#ec4899",
  "#8b5cf6",
  "#06b6d4",
] as const

export function JengaTower() {
  const { t } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const worldRef = useRef<{ engine: any; render: any; runner: any; blocks: any[]; stackTop: number } | null>(null)
  const [status, setStatus] = useState<"loading" | "playing" | "error">("loading")
  const [stackedAbove, setStackedAbove] = useState(0)
  const [highestRows, setHighestRows] = useState(0)
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    const loadMatter = (): Promise<unknown> =>
      new Promise((resolve, reject) => {
        if (window.Matter) return resolve(window.Matter)
        const id = "matter-js-cdn"
        const existing = document.getElementById(
          id,
        ) as HTMLScriptElement | null
        if (existing) {
          existing.addEventListener("load", () => resolve(window.Matter))
          existing.addEventListener("error", () => reject())
          return
        }
        const script = document.createElement("script")
        script.id = id
        script.src =
          "https://cdn.jsdelivr.net/npm/matter-js@0.20.0/build/matter.min.js"
        script.async = true
        script.crossOrigin = "anonymous"
        script.onload = () => resolve(window.Matter)
        script.onerror = () => reject()
        document.head.appendChild(script)
      })

    loadMatter()
      .then((MatterAny) => {
        if (cancelled || !canvasRef.current) return
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Matter = MatterAny as any
        const {
          Engine,
          Render,
          Runner,
          Bodies,
          Mouse,
          MouseConstraint,
          Events,
          World,
        } = Matter

        const engine = Engine.create({
          gravity: { x: 0, y: 1, scale: 0.0014 },
        })

        const render = Render.create({
          canvas: canvasRef.current,
          engine,
          options: {
            width: CANVAS_W,
            height: CANVAS_H,
            wireframes: false,
            background: "transparent",
            pixelRatio: window.devicePixelRatio || 1,
          },
        })

        const ground = Bodies.rectangle(CANVAS_W / 2, CANVAS_H - 8, CANVAS_W * 2, 18, {
          isStatic: true,
          friction: 0.95,
          render: { fillStyle: "#1a1a2e" },
        })
        const leftWall = Bodies.rectangle(-30, CANVAS_H / 2, 60, CANVAS_H * 2, {
          isStatic: true,
          render: { visible: false },
        })
        const rightWall = Bodies.rectangle(CANVAS_W + 30, CANVAS_H / 2, 60, CANVAS_H * 2, {
          isStatic: true,
          render: { visible: false },
        })

        // Build the original stack
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const blocks: any[] = []
        const groundTop = CANVAS_H - 18
        const totalRowW = COLS * BLOCK_W + (COLS - 1) * GAP
        const startX = (CANVAS_W - totalRowW) / 2 + BLOCK_W / 2
        for (let r = 0; r < ROWS; r++) {
          const tone = TONES[r % TONES.length]
          const y = groundTop - BLOCK_H / 2 - r * (BLOCK_H + GAP)
          for (let c = 0; c < COLS; c++) {
            const x = startX + c * (BLOCK_W + GAP)
            const block = Bodies.rectangle(x, y, BLOCK_W, BLOCK_H, {
              density: 0.0035,
              friction: 0.85,
              frictionStatic: 1.1,
              restitution: 0.02,
              chamfer: { radius: 3 },
              render: {
                fillStyle: tone,
                strokeStyle: "rgba(26,26,46,0.18)",
                lineWidth: 1.5,
              },
            })
            blocks.push(block)
          }
        }
        const stackTop = groundTop - BLOCK_H / 2 - (ROWS - 1) * (BLOCK_H + GAP) - BLOCK_H / 2

        const mouse = Mouse.create(canvasRef.current)
        const mouseConstraint = MouseConstraint.create(engine, {
          mouse,
          constraint: {
            stiffness: 0.16,
            damping: 0.06,
            render: { visible: false },
          },
        })
        // Don't capture wheel scroll on the canvas — let the page scroll.
        if (mouse.element && mouse.mousewheel) {
          mouse.element.removeEventListener("wheel", mouse.mousewheel)
          mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel)
        }
        // Sync mouse pixel ratio for sharp interaction on retina
        Mouse.setOffset(mouse, { x: 0, y: 0 })

        World.add(engine.world, [
          ground,
          leftWall,
          rightWall,
          ...blocks,
          mouseConstraint,
        ])

        Render.run(render)
        const runner = Runner.create()
        Runner.run(runner, engine)

        // Score updates: count blocks resting above the original stack height.
        let lastScoreUpdate = 0
        const onAfter = () => {
          const now = performance.now()
          if (now - lastScoreUpdate < 120) return
          lastScoreUpdate = now
          let aboveCount = 0
          let topMost = stackTop
          for (const b of blocks) {
            const settled =
              Math.abs(b.velocity.x) < 0.5 && Math.abs(b.velocity.y) < 0.5
            if (b.position.y < stackTop - 6 && settled) aboveCount++
            if (b.position.y < topMost) topMost = b.position.y
          }
          setStackedAbove(aboveCount)
          const heightPx = Math.max(0, stackTop - topMost)
          const heightInRows = heightPx / (BLOCK_H + GAP)
          setHighestRows((prev) => Math.max(prev, Math.round(heightInRows)))
        }
        Events.on(engine, "afterUpdate", onAfter)

        worldRef.current = { engine, render, runner, blocks, stackTop }
        setStatus("playing")
      })
      .catch(() => {
        if (!cancelled) setStatus("error")
      })

    return () => {
      cancelled = true
      const w = worldRef.current
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Matter = window.Matter as any
      if (w && Matter) {
        try {
          Matter.Render.stop(w.render)
          Matter.Runner.stop(w.runner)
          Matter.World.clear(w.engine.world, false)
          Matter.Engine.clear(w.engine)
          // Clear canvas of leftover frame
          const ctx = canvasRef.current?.getContext("2d")
          if (ctx && canvasRef.current) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          }
        } catch {
          /* ignore */
        }
      }
      worldRef.current = null
    }
  }, [resetKey])

  const reset = () => {
    setStackedAbove(0)
    setHighestRows(0)
    setResetKey((k) => k + 1)
    setStatus("loading")
  }

  return (
    <section className="relative overflow-hidden bg-[#fff8e7] py-20 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(26,26,46,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,46,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-12 hidden h-32 w-32 rotate-[14deg] text-avanza-orange/40 lg:block"
      >
        <Sparkles className="h-full w-full" strokeWidth={1.2} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Hammer className="h-3.5 w-3.5 text-avanza-orange" />
            {t.home.jengaEyebrow}
          </span>
          <h2 className="mt-5 text-balance text-3xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.home.jengaTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.home.jengaDesc}
          </p>
        </FadeIn>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
          <FadeIn className="relative" delay={80}>
            <div
              role="application"
              aria-label={t.home.jengaTowerAria}
              className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-3xl bg-white p-3 ring-1 ring-avanza-dark/10 shadow-[0_24px_60px_-30px_rgba(26,26,46,0.4)]"
              style={{ touchAction: "none" }}
            >
              {/* Sky background gradient inside canvas frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-3 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(180deg, #fef3c7 0%, #fde68a 70%, #fbbf24 100%)",
                }}
              />
              <canvas
                ref={canvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                className="relative block w-full cursor-grab active:cursor-grabbing"
                style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}
              />

              {status === "loading" && (
                <div className="pointer-events-none absolute inset-3 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-2 text-sm font-bold text-avanza-dark">
                    <span className="inline-flex h-3 w-3 animate-ping rounded-full bg-avanza-orange" />
                    {t.home.jengaLoading}
                  </div>
                </div>
              )}
              {status === "error" && (
                <div className="pointer-events-none absolute inset-3 flex items-center justify-center rounded-2xl bg-white/95 p-6 text-center text-sm font-bold text-destructive">
                  {t.home.jengaError}
                </div>
              )}
            </div>

            <p className="mt-4 text-center text-xs font-semibold text-muted-foreground">
              {t.home.jengaInstruction}
            </p>
          </FadeIn>

          <FadeIn delay={160} className="flex flex-col gap-4">
            <div className="rounded-3xl border-2 border-avanza-orange/35 bg-white p-6 shadow-sm">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground">
                {t.home.jengaScore}
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-5xl font-black text-avanza-orange">
                  {stackedAbove}
                </span>
                <span className="text-sm font-semibold text-muted-foreground">
                  blocks
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-avanza-dark/10 pt-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t.home.jengaHighest}
                  </p>
                  <p className="mt-1 text-2xl font-black text-avanza-purple">
                    {highestRows}
                    <span className="ml-1 text-xs font-bold text-muted-foreground">
                      {t.home.jengaRows}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Status
                  </p>
                  <span
                    className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider ${
                      status === "playing"
                        ? "bg-avanza-green/15 text-avanza-green"
                        : status === "loading"
                          ? "bg-avanza-orange/15 text-avanza-orange"
                          : "bg-destructive/15 text-destructive"
                    }`}
                  >
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        status === "playing"
                          ? "bg-avanza-green"
                          : status === "loading"
                            ? "animate-pulse bg-avanza-orange"
                            : "bg-destructive"
                      }`}
                    />
                    {status === "playing"
                      ? "Live"
                      : status === "loading"
                        ? "Loading"
                        : "Error"}
                  </span>
                </div>
              </div>
            </div>

            <ul className="space-y-2 rounded-2xl bg-white p-5 ring-1 ring-avanza-dark/10">
              <Tip text={t.home.jengaTipDrag} />
              <Tip text={t.home.jengaTipStack} />
              <Tip text={t.home.jengaTipReset} />
            </ul>

            <div className="rounded-2xl bg-avanza-dark p-5 text-primary-foreground">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-avanza-green">
                {t.home.jengaLessonTitle}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
                {t.home.jengaLessonText}
              </p>
            </div>

            <button
              type="button"
              onClick={reset}
              className="group inline-flex items-center justify-center gap-2 self-start rounded-full border-2 border-avanza-dark/15 bg-white px-5 py-3 text-sm font-extrabold text-avanza-dark transition-all duration-200 hover:border-avanza-dark/35 hover:bg-avanza-dark/5"
            >
              <RotateCcw className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-180" />
              {t.home.jengaResetLabel}
            </button>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function Tip({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-avanza-orange" />
      <span>{text}</span>
    </li>
  )
}

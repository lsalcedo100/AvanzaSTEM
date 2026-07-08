"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Award, ChevronLeft, Crosshair, FolderOpen, Lock, Move, Orbit, Pause, Play, RotateCcw, Save, SkipForward, Sparkles, Star, Trash2, Trophy, X, ZoomIn, ZoomOut } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"

const CANVAS_W = 720
const CANVAS_H = 460
const CX = CANVAS_W / 2
const CY = CANVAS_H / 2
const G = 0.5 // tuned for visual demo
const SOFTEN = 14 // softening to avoid singularity
const VEL_SCALE = 40 // drag pixels per velocity unit
const STAR_M = 1800 // mass of the central star in every mission

const STAR_MASS = 900 // bodies this heavy count as a "star" for crash detection
const ESCAPE_MARGIN = 340 // how far past the edge a body flies before it counts as escaped
const ORBIT_FRAMES = 60 * 7 // surviving ~7s on screen counts as a stable orbit
const CHAOS_COUNT = 7 // this many bodies interacting at once reads as chaotic
const HIST_LEN = 600 // distance-history window per body (~10s)

const STORAGE_KEY = "avanza-gravity-progress-v1"

type LaunchZone = "slow" | "good" | "fast"

const ZONE_COLOR: Record<LaunchZone, string> = { slow: "#f87171", good: "#4ade80", fast: "#fbbf24" }
const ZONE_GUIDE_KEY: Record<LaunchZone, "gravityGuideSlow" | "gravityGuideGood" | "gravityGuideFast"> = {
  slow: "gravityGuideSlow",
  good: "gravityGuideGood",
  fast: "gravityGuideFast",
}

type Body = {
  id: number
  planetNo: number // 0 = the starting star; used for the display name
  x: number
  y: number
  vx: number
  vy: number
  m: number
  color: string
  trail: Array<[number, number]>
  rHist: number[] // distance-to-star history, for orbit analysis
  born: number
  user: boolean
  orbited: boolean
  role?: "host" | "drifter" // mission-specific pre-placed bodies
  kind?: ObjKind // forces render style regardless of mass
  name?: string // custom name from the inspector
  hideLabel?: boolean
  noTrail?: boolean
}

type ObjKind = "star" | "planet" | "moon" | "asteroid" | "comet"

type Particle = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string }
type Flash = { x: number; y: number; r: number; maxR: number; life: number; maxLife: number; color: string }
type Floater = { x: number; y: number; key: FloaterKey; color: string; life: number; maxLife: number }
type FloaterKey = "gravityLabelMerged" | "gravityLabelCrashed" | "gravityLabelEscaped"

type FeedbackKind = "idle" | "aim" | "escape" | "crash" | "orbit" | "elliptical" | "merge" | "chaos"

type WhyKey =
  | "gravityWhyIdle"
  | "gravityWhyMutual"
  | "gravityWhyEscape"
  | "gravityWhyCrash"
  | "gravityWhyStable"
  | "gravityWhyElliptical"
  | "gravityWhyCollision"
  | "gravityWhyChaos"

const KIND_WHY: Record<FeedbackKind, WhyKey> = {
  idle: "gravityWhyIdle",
  aim: "gravityWhyIdle",
  escape: "gravityWhyEscape",
  crash: "gravityWhyCrash",
  orbit: "gravityWhyStable",
  elliptical: "gravityWhyElliptical",
  merge: "gravityWhyCollision",
  chaos: "gravityWhyChaos",
}
const KIND_DOT: Record<FeedbackKind, string> = {
  idle: "rgba(255,255,255,0.4)",
  aim: "#2dd4bf",
  escape: "#fbbf24",
  crash: "#f87171",
  orbit: "#4ade80",
  elliptical: "#a3e635",
  merge: "#c084fc",
  chaos: "#fb923c",
}

type StatusKey =
  | "gravityStatOrbiting"
  | "gravityStatEscaping"
  | "gravityStatStable"
  | "gravityStatUnstable"
  | "gravityStatElliptical"
  | "gravityStatCollision"
  | "gravityStatChaotic"
  | "gravityStatStar"
type TipKey = "gravityTipSlower" | "gravityTipSideways" | "gravityTipFarther" | "gravityTipReduceMass" | "gravityTipNice"
type RealKey = "gravityRealInner" | "gravityRealOuter" | "gravityRealMass" | "gravityRealScale"
type CatKey = "gravityCatAsteroid" | "gravityCatMoon" | "gravityCatRocky" | "gravityCatGiant" | "gravityCatStar"

const STAB_COLOR: Record<StatusKey, string> = {
  gravityStatOrbiting: "#2dd4bf",
  gravityStatEscaping: "#fbbf24",
  gravityStatStable: "#4ade80",
  gravityStatUnstable: "#f87171",
  gravityStatElliptical: "#a3e635",
  gravityStatCollision: "#f87171",
  gravityStatChaotic: "#fb923c",
  gravityStatStar: "#facc15",
}

type SelectedInfo = {
  id: number
  planetNo: number
  customName: string | null
  noTrail: boolean
  hideLabel: boolean
  typeKey: CatKey
  mass: number
  speed: number
  distance: number
  statusKey: StatusKey
  stabKey: StatusKey
  score: number
  tipKey: TipKey | null
  whyKey: WhyKey
  realKey: RealKey
  periodFrames: number | null
  isStar: boolean
  cmp: { key: string; planet: string } | null
}

type Overlays = {
  velocity: boolean
  force: boolean
  rings: boolean
  distance: boolean
  labels: boolean
  trails: boolean
  path: boolean
  field: boolean
}

const OVERLAY_DEFS: Array<{
  key: keyof Overlays
  label: "gravityOvVelocity" | "gravityOvForce" | "gravityOvRings" | "gravityOvDistance" | "gravityOvLabels" | "gravityOvTrails" | "gravityOvPath" | "gravityOvField"
}> = [
  { key: "trails", label: "gravityOvTrails" },
  { key: "velocity", label: "gravityOvVelocity" },
  { key: "force", label: "gravityOvForce" },
  { key: "rings", label: "gravityOvRings" },
  { key: "path", label: "gravityOvPath" },
  { key: "distance", label: "gravityOvDistance" },
  { key: "labels", label: "gravityOvLabels" },
  { key: "field", label: "gravityOvField" },
]

const COLORS = ["#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#22c55e", "#ec4899"]

// Shared control styling for a consistent, polished toolbar
const BTN_BASE = "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition active:scale-[0.97] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal/70 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0b0e1f]"

// Priority of live-feedback messages: higher wins and can't be stomped by a
// lower-priority event for a short window (keeps the panel from flickering).
const FEEDBACK_PRIORITY: Record<FeedbackKind, number> = {
  idle: 0,
  aim: 1,
  chaos: 1,
  elliptical: 2,
  orbit: 3,
  merge: 3,
  escape: 4,
  crash: 4,
}
const BTN_NEUTRAL = "bg-white/10 text-white/85 hover:bg-white/20 ring-1 ring-white/10"
const BTN_PRIMARY = "bg-avanza-teal/90 text-[#06121a] hover:bg-avanza-teal ring-1 ring-avanza-teal/40"
const BTN_SKY = "bg-sky-500/15 text-sky-200 hover:bg-sky-500/25 ring-1 ring-sky-400/25"
const BTN_DANGER = "bg-red-500/15 text-red-200 hover:bg-red-500/25 ring-1 ring-red-400/25"
const SLIDER_CLASS = "mt-2 h-1.5 w-full cursor-pointer rounded-full accent-avanza-teal"

// Object-type presets: default mass, allowed range, and colour per tool.
const TOOL_DEFS: Record<ObjKind, { mass: number; min: number; max: number; color: string }> = {
  star: { mass: 1400, min: 800, max: 2600, color: "#fbbf24" },
  planet: { mass: 60, min: 15, max: 380, color: "#06b6d4" },
  moon: { mass: 12, min: 3, max: 26, color: "#a7adba" },
  asteroid: { mass: 6, min: 1, max: 18, color: "#9a8f83" },
  comet: { mass: 8, min: 2, max: 24, color: "#dbeafe" },
}
const TOOL_ORDER: ObjKind[] = ["star", "planet", "moon", "asteroid", "comet"]

// Real-planet presets. Distances and masses are scaled for playability.
type Preset = { key: string; kind: ObjKind; mass: number; orbitR: number; color: string; speedMul?: number }
const PRESETS: Preset[] = [
  { key: "mercury", kind: "planet", mass: 22, orbitR: 60, color: "#b0a08f" },
  { key: "venus", kind: "planet", mass: 55, orbitR: 88, color: "#e8c37a" },
  { key: "earth", kind: "planet", mass: 60, orbitR: 116, color: "#4f9fe0" },
  { key: "mars", kind: "planet", mass: 34, orbitR: 150, color: "#e06a4f" },
  { key: "jupiter", kind: "planet", mass: 320, orbitR: 210, color: "#d8a56b" },
  { key: "saturn", kind: "planet", mass: 260, orbitR: 285, color: "#e3c88f" },
  { key: "moon", kind: "moon", mass: 10, orbitR: 96, color: "#a7adba" },
  { key: "asteroid", kind: "asteroid", mass: 5, orbitR: 175, color: "#9a8f83" },
  { key: "comet", kind: "comet", mass: 8, orbitR: 130, color: "#dbeafe", speedMul: 1.32 },
]

// Scaled real solar-system orbit radii, used by comparison mode.
const REAL_ORBITS: { key: string; r: number; color: string }[] = [
  { key: "mercury", r: 60, color: "#b0a08f" },
  { key: "venus", r: 88, color: "#e8c37a" },
  { key: "earth", r: 116, color: "#4f9fe0" },
  { key: "mars", r: 150, color: "#e06a4f" },
  { key: "jupiter", r: 210, color: "#d8a56b" },
  { key: "saturn", r: 285, color: "#e3c88f" },
]

// Compare a body's orbit to the nearest real planet's scaled orbit.
function compareFeedback(r: number, speed: number, starM: number): { key: string; planet: string } | null {
  let nearest = REAL_ORBITS[0]
  let best = Infinity
  for (const o of REAL_ORBITS) {
    const d = Math.abs(o.r - r)
    if (d < best) {
      best = d
      nearest = o
    }
  }
  const vCirc = Math.sqrt((G * starM) / Math.max(SOFTEN, r))
  if (best < 15) {
    if (speed > vCirc * 1.25) return { key: "gravityCmpFast", planet: nearest.key }
    if (speed < vCirc * 0.75) return { key: "gravityCmpSlow", planet: nearest.key }
    return { key: "gravityCmpClose", planet: nearest.key }
  }
  return { key: r > nearest.r ? "gravityCmpWider" : "gravityCmpNarrower", planet: nearest.key }
}

let nextId = 1
let nextPlanetNo = 3

// ── Challenge data ──────────────────────────────────────────────────────────

type Ring = { r: number; color: string; dashed?: boolean }
type FailEvent = "crash" | "escape" | "merge"

type ChallengeState = {
  levelId: number | null
  target: number // frames of continuous success needed
  hold: number
  attempts: number
  startFrame: number
  startCrash: number
  startEscape: number
  startMerge: number
  bestAccuracy: number
  trackId: number | null
  resolved: "win" | "fail" | null
}

type LevelDef = {
  id: number
  holdSeconds: number
  setup: () => Body[]
  rings?: Ring[]
  failOn?: FailEvent[]
  // Returns whether the goal is currently met, plus an accuracy score (level 5).
  evaluate: (bodies: Body[], star: Body, cr: ChallengeState) => { ok: boolean; accuracy?: number }
}

function circSpeed(R: number) {
  return Math.sqrt((G * STAR_M) / R)
}

function radiusForMass(m: number) {
  return Math.max(3, Math.cbrt(m) * 1.5)
}
function glowRadiusForMass(r: number) {
  return Math.min(r * 2.6, r + 26)
}
function massCategoryKey(m: number): CatKey {
  if (m < 20) return "gravityCatAsteroid"
  if (m < 70) return "gravityCatMoon"
  if (m < 180) return "gravityCatRocky"
  if (m < 380) return "gravityCatGiant"
  return "gravityCatStar"
}
function dominantBody(bodies: Body[]): Body | null {
  let star: Body | null = null
  for (const b of bodies) if (!star || b.m > star.m) star = b
  return star
}

// ── Colour helpers ──────────────────────────────────────────────────────────
function hexRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  return [parseInt(h.slice(0, 2), 16) || 0, parseInt(h.slice(2, 4), 16) || 0, parseInt(h.slice(4, 6), 16) || 0]
}
// t > 0 lightens toward white, t < 0 darkens toward black.
function shade(hex: string, t: number) {
  const [r, g, b] = hexRgb(hex)
  const tgt = t >= 0 ? 255 : 0
  const k = Math.min(1, Math.abs(t))
  return `rgb(${Math.round(r + (tgt - r) * k)},${Math.round(g + (tgt - g) * k)},${Math.round(b + (tgt - b) * k)})`
}

// ── Space background ────────────────────────────────────────────────────────
function seeded(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let x = Math.imul(a ^ (a >>> 15), 1 | a)
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}
type BgStar = { x: number; y: number; r: number; a: number; tw: number }
function makeStarLayer(count: number, seed: number, maxR: number, maxA: number): BgStar[] {
  const rnd = seeded(seed)
  const out: BgStar[] = []
  for (let i = 0; i < count; i++) out.push({ x: rnd() * CANVAS_W, y: rnd() * CANVAS_H, r: 0.4 + rnd() * maxR, a: 0.2 + rnd() * maxA, tw: rnd() * Math.PI * 2 })
  return out
}
const STAR_LAYERS = [
  { stars: makeStarLayer(72, 12345, 0.7, 0.22), speed: 0.015, tw: 0.5 },
  { stars: makeStarLayer(46, 67890, 1.0, 0.32), speed: 0.04, tw: 1.0 },
  { stars: makeStarLayer(22, 24680, 1.6, 0.5), speed: 0.09, tw: 1.7 },
]
type Dust = { x: number; y: number; vx: number; vy: number; a: number; r: number }
const DUST: Dust[] = (() => {
  const rnd = seeded(999)
  const out: Dust[] = []
  for (let i = 0; i < 36; i++) out.push({ x: rnd() * CANVAS_W, y: rnd() * CANVAS_H, vx: (rnd() - 0.5) * 0.05, vy: (rnd() - 0.5) * 0.05, a: 0.05 + rnd() * 0.1, r: 0.5 + rnd() * 0.8 })
  return out
})()
const NEBULAE = [
  { x: CANVAS_W * 0.22, y: CANVAS_H * 0.26, r: 280, c: [99, 102, 241] },
  { x: CANVAS_W * 0.82, y: CANVAS_H * 0.34, r: 300, c: [16, 122, 140] },
  { x: CANVAS_W * 0.6, y: CANVAS_H * 0.84, r: 250, c: [150, 55, 120] },
]
type Comet = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }
const COMETS: Comet[] = []

function drawBackground(ctx: CanvasRenderingContext2D, frame: number) {
  ctx.fillStyle = "#070912"
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

  for (const n of NEBULAE) {
    const pulse = 0.5 + 0.5 * Math.sin(frame * 0.004 + n.x)
    const r = n.r * (0.95 + 0.05 * pulse)
    const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r)
    g.addColorStop(0, `rgba(${n.c[0]},${n.c[1]},${n.c[2]},0.10)`)
    g.addColorStop(0.5, `rgba(${n.c[0]},${n.c[1]},${n.c[2]},0.035)`)
    g.addColorStop(1, `rgba(${n.c[0]},${n.c[1]},${n.c[2]},0)`)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
  }

  for (const layer of STAR_LAYERS) {
    const dx = (frame * layer.speed) % CANVAS_W
    for (const s of layer.stars) {
      const x = (s.x + dx) % CANVAS_W
      const tw = 0.7 + 0.3 * Math.sin(frame * 0.03 * layer.tw + s.tw)
      ctx.fillStyle = `rgba(222,232,255,${(s.a * tw).toFixed(3)})`
      ctx.beginPath()
      ctx.arc(x, s.y, s.r, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  for (const d of DUST) {
    d.x = (d.x + d.vx + CANVAS_W) % CANVAS_W
    d.y = (d.y + d.vy + CANVAS_H) % CANVAS_H
    ctx.fillStyle = `rgba(180,200,255,${d.a})`
    ctx.beginPath()
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
    ctx.fill()
  }

  // Occasional distant comet streak
  if (frame % 320 === 40 && Math.random() < 0.7) {
    const fromLeft = Math.random() < 0.5
    const speed = 2.4 + Math.random() * 1.6
    COMETS.push({
      x: fromLeft ? -20 : CANVAS_W + 20,
      y: -10 + Math.random() * CANVAS_H * 0.45,
      vx: (fromLeft ? 1 : -1) * speed * (0.85 + Math.random() * 0.3),
      vy: speed * (0.22 + Math.random() * 0.2),
      life: 220,
      maxLife: 220,
    })
  }
  for (let i = COMETS.length - 1; i >= 0; i--) {
    const cm = COMETS[i]
    const p = cm.life / cm.maxLife
    const tx = cm.x - cm.vx * 13
    const ty = cm.y - cm.vy * 13
    const g = ctx.createLinearGradient(cm.x, cm.y, tx, ty)
    g.addColorStop(0, `rgba(200,230,255,${(0.5 * p).toFixed(3)})`)
    g.addColorStop(1, "rgba(200,230,255,0)")
    ctx.strokeStyle = g
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(cm.x, cm.y)
    ctx.lineTo(tx, ty)
    ctx.stroke()
    ctx.fillStyle = `rgba(235,248,255,${(0.7 * p).toFixed(3)})`
    ctx.beginPath()
    ctx.arc(cm.x, cm.y, 1.3, 0, Math.PI * 2)
    ctx.fill()
    cm.x += cm.vx
    cm.y += cm.vy
    cm.life -= 1
    if (cm.life <= 0 || cm.x < -40 || cm.x > CANVAS_W + 40 || cm.y > CANVAS_H + 40) COMETS.splice(i, 1)
  }
}

function drawVignette(ctx: CanvasRenderingContext2D) {
  const g = ctx.createRadialGradient(CX, CY, CANVAS_H * 0.34, CX, CY, CANVAS_W * 0.72)
  g.addColorStop(0, "rgba(0,0,0,0)")
  g.addColorStop(1, "rgba(0,0,0,0.5)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
}

// ── Astronomy-style body rendering ──────────────────────────────────────────
function softGlow(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  const glow = glowRadiusForMass(r) * 1.25
  const g = ctx.createRadialGradient(x, y, r * 0.6, x, y, glow)
  g.addColorStop(0, color + "40")
  g.addColorStop(1, color + "00")
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(x, y, glow, 0, Math.PI * 2)
  ctx.fill()
}
function sphere(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r * 1.05)
  g.addColorStop(0, shade(color, 0.5))
  g.addColorStop(0.55, color)
  g.addColorStop(1, shade(color, -0.5))
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
}
function renderStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, frame: number) {
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.05)
  const cr = r * 3.1 + pulse * r * 0.7
  const g = ctx.createRadialGradient(x, y, r * 0.6, x, y, cr)
  g.addColorStop(0, "rgba(255,240,200,0.5)")
  g.addColorStop(0.28, "rgba(255,196,110,0.22)")
  g.addColorStop(1, "rgba(255,170,70,0)")
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(x, y, cr, 0, Math.PI * 2)
  ctx.fill()

  const bg = ctx.createRadialGradient(x - r * 0.22, y - r * 0.22, r * 0.2, x, y, r)
  bg.addColorStop(0, "#fff7e0")
  bg.addColorStop(0.5, "#ffd873")
  bg.addColorStop(1, "#f59e0b")
  ctx.fillStyle = bg
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = `rgba(255,255,255,${(0.22 + 0.16 * pulse).toFixed(3)})`
  ctx.beginPath()
  ctx.arc(x - r * 0.15, y - r * 0.15, r * 0.34, 0, Math.PI * 2)
  ctx.fill()
}
function renderGasGiant(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  sphere(ctx, x, y, r, color)
  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.clip()
  const bands = [-0.55, -0.2, 0.12, 0.42, 0.7]
  for (let i = 0; i < bands.length; i++) {
    const o = bands[i]
    ctx.fillStyle = i % 2 === 0 ? shade(color, 0.18) : shade(color, -0.22)
    ctx.globalAlpha = 0.35
    ctx.beginPath()
    ctx.ellipse(x, y + o * r, r * 1.1, r * 0.12, 0, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
  ctx.restore()
}
function renderRocky(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, id: number) {
  sphere(ctx, x, y, r, color)
  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.clip()
  const rnd = seeded(id * 733 + 7)
  ctx.fillStyle = shade(color, -0.3)
  for (let i = 0; i < 3; i++) {
    const a = rnd() * Math.PI * 2
    const d = rnd() * r * 0.6
    ctx.globalAlpha = 0.35
    ctx.beginPath()
    ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, r * (0.16 + rnd() * 0.16), 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
  ctx.restore()
}
function renderMoon(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, id: number) {
  sphere(ctx, x, y, r, "#a7adba")
  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.clip()
  const rnd = seeded(id * 211 + 3)
  ctx.fillStyle = "rgba(90,96,108,0.5)"
  for (let i = 0; i < 3; i++) {
    const a = rnd() * Math.PI * 2
    const d = rnd() * r * 0.6
    ctx.beginPath()
    ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, r * (0.12 + rnd() * 0.14), 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.restore()
}
function renderAsteroid(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, id: number, frame: number) {
  const rnd = seeded(id * 97 + 11)
  const n = 9
  const verts: Array<[number, number]> = []
  const rot = frame * 0.008 + id
  for (let i = 0; i < n; i++) {
    const ang = rot + (i / n) * Math.PI * 2
    const rad = r * (0.72 + rnd() * 0.5)
    verts.push([x + Math.cos(ang) * rad, y + Math.sin(ang) * rad])
  }
  const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r * 1.3)
  g.addColorStop(0, "#b0a596")
  g.addColorStop(0.6, "#8a7f72")
  g.addColorStop(1, "#59514a")
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.moveTo(verts[0][0], verts[0][1])
  for (let i = 1; i < n; i++) ctx.lineTo(verts[i][0], verts[i][1])
  ctx.closePath()
  ctx.fill()
}
function renderComet(ctx: CanvasRenderingContext2D, b: Body, r: number) {
  const sp = Math.hypot(b.vx, b.vy) || 0.001
  const ux = -b.vx / sp
  const uy = -b.vy / sp
  const tl = 24 + Math.min(46, sp * 8)
  const tx = b.x + ux * tl
  const ty = b.y + uy * tl
  const g = ctx.createLinearGradient(b.x, b.y, tx, ty)
  g.addColorStop(0, "rgba(150,220,255,0.55)")
  g.addColorStop(1, "rgba(150,220,255,0)")
  ctx.strokeStyle = g
  ctx.lineWidth = r * 1.5
  ctx.lineCap = "round"
  ctx.beginPath()
  ctx.moveTo(b.x, b.y)
  ctx.lineTo(tx, ty)
  ctx.stroke()
  ctx.lineCap = "butt"
  const coma = ctx.createRadialGradient(b.x, b.y, r * 0.3, b.x, b.y, r * 2.4)
  coma.addColorStop(0, "rgba(210,240,255,0.6)")
  coma.addColorStop(1, "rgba(210,240,255,0)")
  ctx.fillStyle = coma
  ctx.beginPath()
  ctx.arc(b.x, b.y, r * 2.4, 0, Math.PI * 2)
  ctx.fill()
  sphere(ctx, b.x, b.y, Math.max(2.5, r), "#dbeafe")
}
function renderBody(ctx: CanvasRenderingContext2D, b: Body, isStar: boolean, frame: number) {
  const r = radiusForMass(b.m)
  const cat = massCategoryKey(b.m)
  const kind = b.kind
  if (isStar || kind === "star" || (!kind && cat === "gravityCatStar")) {
    renderStar(ctx, b.x, b.y, r, frame)
    return
  }
  if (kind === "comet" || b.role === "drifter") {
    softGlow(ctx, b.x, b.y, r, "#93c5fd")
    renderComet(ctx, b, r)
    return
  }
  if (kind === "asteroid") {
    softGlow(ctx, b.x, b.y, r, b.color)
    renderAsteroid(ctx, b.x, b.y, r, b.id, frame)
    return
  }
  if (kind === "moon") {
    softGlow(ctx, b.x, b.y, r, "#a7adba")
    renderMoon(ctx, b.x, b.y, r, b.id)
    return
  }
  softGlow(ctx, b.x, b.y, r, b.color)
  if (kind === "planet") {
    if (b.m >= 180) renderGasGiant(ctx, b.x, b.y, r, b.color)
    else renderRocky(ctx, b.x, b.y, r, b.color, b.id)
    return
  }
  if (cat === "gravityCatGiant") renderGasGiant(ctx, b.x, b.y, r, b.color)
  else if (cat === "gravityCatMoon") renderMoon(ctx, b.x, b.y, r, b.id)
  else if (cat === "gravityCatAsteroid") renderAsteroid(ctx, b.x, b.y, r, b.id, frame)
  else renderRocky(ctx, b.x, b.y, r, b.color, b.id)
}

function isBound(b: Body, star: Body) {
  const dx = b.x - star.x
  const dy = b.y - star.y
  const r = Math.hypot(dx, dy) || 0.001
  if (r > 330) return false
  const speed = Math.hypot(b.vx, b.vy)
  const vEsc = Math.SQRT2 * Math.sqrt((G * star.m) / Math.max(SOFTEN, r))
  const radialOut = (b.vx * dx + b.vy * dy) / r > 0
  return !(speed > vEsc && radialOut)
}
function avgR(b: Body, star: Body) {
  if (b.rHist.length < 5) return Math.hypot(b.x - star.x, b.y - star.y)
  const w = b.rHist.slice(-90)
  return w.reduce((a, c) => a + c, 0) / w.length
}
const userPlanets = (bodies: Body[], star: Body) => bodies.filter((b) => b !== star && b.user)

function launchZone(speed: number, startX: number, startY: number, bodies: Body[]) {
  const star = dominantBody(bodies)
  if (!star) return { zone: "good" as LaunchZone }
  const r = Math.max(SOFTEN, Math.hypot(star.x - startX, star.y - startY))
  const vCirc = Math.sqrt((G * star.m) / r)
  const vEsc = Math.SQRT2 * vCirc
  let zone: LaunchZone
  if (speed < vCirc * 0.55) zone = "slow"
  else if (speed > vEsc) zone = "fast"
  else zone = "good"
  return { zone }
}

function starBody(): Body {
  return { id: nextId++, planetNo: 0, x: CX, y: CY, vx: 0, vy: 0, m: STAR_M, color: "#fbbf24", trail: [], rHist: [], born: 0, user: false, orbited: true }
}
function sceneBody(x: number, y: number, vx: number, vy: number, m: number, color: string, role?: "host" | "drifter"): Body {
  return { id: nextId++, planetNo: nextPlanetNo++, x, y, vx, vy, m, color, trail: [], rHist: [], born: 0, user: false, orbited: true, role }
}

const LEVELS: LevelDef[] = [
  {
    id: 1,
    holdSeconds: 10,
    setup: () => [starBody()],
    evaluate: (b, s) => ({ ok: userPlanets(b, s).some((p) => isBound(p, s)) }),
  },
  {
    id: 2,
    holdSeconds: 20,
    setup: () => [starBody()],
    rings: [{ r: 110, color: "#4ade80" }, { r: 170, color: "#4ade80" }],
    evaluate: (b, s) => ({
      ok: userPlanets(b, s).some((p) => {
        const r = Math.hypot(p.x - s.x, p.y - s.y)
        return r >= 110 && r <= 170 && isBound(p, s)
      }),
    }),
  },
  {
    id: 3,
    holdSeconds: 20,
    setup: () => [starBody()],
    failOn: ["crash"],
    evaluate: (b, s) => ({ ok: userPlanets(b, s).some((p) => isBound(p, s)) }),
  },
  {
    id: 4,
    holdSeconds: 20,
    setup: () => [starBody()],
    failOn: ["escape"],
    evaluate: (b, s) => ({ ok: userPlanets(b, s).some((p) => isBound(p, s)) }),
  },
  {
    id: 5,
    holdSeconds: 6,
    setup: () => [starBody()],
    rings: [{ r: 150, color: "#60a5fa" }],
    evaluate: (b, s) => {
      let best = 0
      let okAny = false
      for (const p of userPlanets(b, s)) {
        if (!isBound(p, s)) continue
        const r = avgR(p, s)
        const distAcc = 1 - Math.min(1, Math.abs(r - 150) / 150)
        const vCirc = circSpeed(r)
        const speed = Math.hypot(p.vx, p.vy)
        const spdAcc = 1 - Math.min(1, Math.abs(speed - vCirc) / vCirc)
        const acc = distAcc * 0.6 + spdAcc * 0.4
        if (acc > best) best = acc
        if (Math.abs(r - 150) < 16) okAny = true
      }
      return { ok: okAny, accuracy: best }
    },
  },
  {
    id: 6,
    holdSeconds: 8,
    setup: () => [starBody()],
    rings: [{ r: 110, color: "#38bdf8", dashed: true }, { r: 190, color: "#f472b6", dashed: true }],
    evaluate: (b, s) => {
      const bound = userPlanets(b, s).filter((p) => isBound(p, s))
      const inner = bound.some((p) => avgR(p, s) < 120)
      const outer = bound.some((p) => avgR(p, s) > 190)
      return { ok: inner && outer }
    },
  },
  {
    id: 7,
    holdSeconds: 30,
    setup: () => [starBody()],
    failOn: ["merge"],
    evaluate: (b, s) => ({ ok: userPlanets(b, s).filter((p) => isBound(p, s)).length >= 2 }),
  },
  {
    id: 8,
    holdSeconds: 6,
    setup: () => [starBody(), sceneBody(CX + 150, CY, 0, circSpeed(150), 150, "#22d3ee", "host")],
    evaluate: (b, s) => {
      const host = b.find((x) => x.role === "host")
      if (!host || !isBound(host, s)) return { ok: false }
      const moon = b.find((x) => x.user && x !== host)
      if (!moon) return { ok: false }
      const dHost = Math.hypot(moon.x - host.x, moon.y - host.y)
      const dStar = Math.hypot(moon.x - s.x, moon.y - s.y)
      const relV = Math.hypot(moon.vx - host.vx, moon.vy - host.vy)
      return { ok: dHost < 75 && dHost < dStar * 0.55 && relV > 0.2 && relV < 2.6 }
    },
  },
  {
    id: 9,
    holdSeconds: 15,
    setup: () => [starBody(), sceneBody(CX + 120, CY, 2.7, -3.1, 26, "#ef4444", "drifter")],
    evaluate: (b, s, cr) => {
      const d = b.find((x) => x.id === cr.trackId || x.role === "drifter")
      if (!d) return { ok: false }
      return { ok: isBound(d, s) }
    },
  },
  {
    id: 10,
    holdSeconds: 60,
    setup: () => [starBody()],
    failOn: ["crash", "escape", "merge"],
    evaluate: (b, s) => ({ ok: userPlanets(b, s).filter((p) => isBound(p, s)).length >= 3 }),
  },
]

const LEVEL_ACH: Record<number, string[]> = {
  1: ["firstOrbit"],
  4: ["escapeVelocity"],
  5: ["earthMatch"],
  7: ["stableSystem", "noCollisions"],
  8: ["moonMaker"],
}
const ACH_KEYS = ["firstOrbit", "stableSystem", "escapeVelocity", "moonMaker", "earthMatch", "noCollisions", "gravityMaster"] as const

function computeStars(level: LevelDef, cr: ChallengeState) {
  if (level.id === 5) return cr.bestAccuracy >= 0.9 ? 3 : cr.bestAccuracy >= 0.72 ? 2 : 1
  return cr.attempts <= 1 ? 3 : cr.attempts <= 3 ? 2 : 1
}

type Progress = { unlocked: number; stars: Record<number, number>; ach: string[] }
function emptyProgress(): Progress {
  return { unlocked: 1, stars: {}, ach: [] }
}
function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const p = JSON.parse(raw)
      return { unlocked: p.unlocked || 1, stars: p.stars || {}, ach: Array.isArray(p.ach) ? p.ach : [] }
    }
  } catch {
    /* ignore */
  }
  return emptyProgress()
}
function saveProgress(p: Progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
  } catch {
    /* ignore */
  }
}

// Analyze a body's orbit relative to the dominant star.
function analyzeBody(b: Body, bodies: Body[], star: Body): SelectedInfo {
  const typeKey = massCategoryKey(b.m)
  const speed = Math.hypot(b.vx, b.vy)

  const base = { id: b.id, planetNo: b.planetNo, customName: b.name ?? null, noTrail: !!b.noTrail, hideLabel: !!b.hideLabel }

  if (b === star) {
    const massive = b.m >= STAR_MASS
    return {
      ...base,
      typeKey,
      mass: b.m,
      speed,
      distance: 0,
      statusKey: massive ? "gravityStatStar" : "gravityStatOrbiting",
      stabKey: massive ? "gravityStatStar" : "gravityStatOrbiting",
      score: 1,
      tipKey: null,
      whyKey: massive ? "gravityWhyMutual" : "gravityWhyStable",
      realKey: massive ? "gravityRealMass" : "gravityRealScale",
      periodFrames: null,
      isStar: true,
      cmp: null,
    }
  }

  const dx = b.x - star.x
  const dy = b.y - star.y
  const r = Math.hypot(dx, dy) || 0.001
  const vCirc = Math.sqrt((G * star.m) / r)
  const vEsc = Math.SQRT2 * vCirc
  const radialV = (b.vx * dx + b.vy * dy) / r
  const starR = radiusForMass(star.m)

  const win = b.rHist
  let rMin = r
  let rMax = r
  for (const d of win) {
    if (d < rMin) rMin = d
    if (d > rMax) rMax = d
  }
  const ecc = rMax + rMin > 0 ? (rMax - rMin) / (rMax + rMin) : 0
  const enough = win.length > 90

  let statusKey: StatusKey
  let score: number
  let tipKey: TipKey | null
  let whyKey: WhyKey

  if (speed > vEsc && radialV > 0) {
    statusKey = "gravityStatEscaping"
    score = 0.05
    tipKey = "gravityTipSlower"
    whyKey = "gravityWhyEscape"
  } else if (enough && rMin < starR * 1.9) {
    statusKey = "gravityStatCollision"
    score = 0.12
    tipKey = "gravityTipSideways"
    whyKey = "gravityWhyCrash"
  } else if (!enough) {
    statusKey = "gravityStatOrbiting"
    score = 0.55
    tipKey = speed > vCirc ? "gravityTipSlower" : "gravityTipSideways"
    whyKey = "gravityWhyStable"
  } else if (ecc < 0.12) {
    statusKey = "gravityStatStable"
    score = 1 - ecc
    tipKey = "gravityTipNice"
    whyKey = "gravityWhyStable"
  } else if (ecc < 0.45) {
    statusKey = "gravityStatElliptical"
    score = 1 - ecc
    tipKey = speed > vCirc ? "gravityTipSlower" : "gravityTipSideways"
    whyKey = "gravityWhyElliptical"
  } else {
    statusKey = "gravityStatUnstable"
    score = Math.max(0.1, 1 - ecc)
    tipKey = "gravityTipFarther"
    whyKey = "gravityWhyElliptical"
  }

  if (b.m > 250 && bodies.length > 3 && (statusKey === "gravityStatStable" || statusKey === "gravityStatElliptical")) {
    tipKey = "gravityTipReduceMass"
  }

  let periodFrames: number | null = null
  if ((statusKey === "gravityStatStable" || statusKey === "gravityStatElliptical") && enough) {
    const a = (rMin + rMax) / 2
    periodFrames = 2 * Math.PI * Math.sqrt((a * a * a) / (G * star.m))
  }

  const stabKey = statusKey
  if (bodies.length >= CHAOS_COUNT && statusKey !== "gravityStatEscaping" && statusKey !== "gravityStatCollision") {
    statusKey = "gravityStatChaotic"
  }

  let realKey: RealKey
  if (r < 110) realKey = "gravityRealInner"
  else if (r > 250) realKey = "gravityRealOuter"
  else if (b.m >= 250) realKey = "gravityRealMass"
  else realKey = "gravityRealScale"

  const cmp = compareFeedback(r, speed, star.m)

  return { ...base, typeKey, mass: b.m, speed, distance: r, statusKey, stabKey, score, tipKey, whyKey, realKey, periodFrames, isStar: false, cmp }
}

function predictPath(startX: number, startY: number, vx: number, vy: number, bodies: Body[], excludeId?: number) {
  const pts: Array<[number, number]> = [[startX, startY]]
  let px = startX
  let py = startY
  let pvx = vx
  let pvy = vy
  const steps = 170
  for (let s = 0; s < steps; s++) {
    let ax = 0
    let ay = 0
    for (const b of bodies) {
      if (b.id === excludeId) continue
      const dx = b.x - px
      const dy = b.y - py
      const r2 = dx * dx + dy * dy + SOFTEN * SOFTEN
      const r = Math.sqrt(r2)
      const f = (G * b.m) / r2
      ax += (f * dx) / r
      ay += (f * dy) / r
      if (r < radiusForMass(b.m) + 2) return pts
    }
    pvx += ax
    pvy += ay
    px += pvx
    py += pvy
    pts.push([px, py])
    if (px < -ESCAPE_MARGIN || px > CANVAS_W + ESCAPE_MARGIN || py < -ESCAPE_MARGIN || py > CANVAS_H + ESCAPE_MARGIN) break
  }
  return pts
}

function defaultScene(): Body[] {
  nextPlanetNo = 3
  return [
    starBody(),
    { id: nextId++, planetNo: 1, x: CX + 140, y: CY, vx: 0, vy: 1.6, m: 18, color: "#06b6d4", trail: [], rHist: [], born: 0, user: false, orbited: true },
    { id: nextId++, planetNo: 2, x: CX - 200, y: CY, vx: 0, vy: -1.3, m: 14, color: "#ef4444", trail: [], rHist: [], born: 0, user: false, orbited: true },
  ]
}

type ResultInfo = { kind: "win" | "fail"; levelId: number; stars: number; score: number; newAch: string[] } | null

export function GravitySandbox() {
  const { t } = useLanguage()
  const c = t.gamesPage.gravityCh
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bodiesRef = useRef<Body[]>(defaultScene())
  const animRef = useRef<number | null>(null)
  const frameRef = useRef(0)
  const particlesRef = useRef<Particle[]>([])
  const flashesRef = useRef<Flash[]>([])
  const floatersRef = useRef<Floater[]>([])
  const selectedIdRef = useRef<number | null>(null)
  const selDirtyRef = useRef(false)
  const eventsRef = useRef({ crash: 0, escape: 0, merge: 0 })

  const [mode, setMode] = useState<"sandbox" | "challenge">("challenge")
  const [paused, setPaused] = useState(false)
  const [mass, setMass] = useState(40)
  const [bodyCount, setBodyCount] = useState(3)
  const [trailLength, setTrailLength] = useState(160)
  const trailLengthRef = useRef(160)
  const [feedbackKind, setFeedbackKind] = useState<FeedbackKind>("idle")
  const [selected, setSelected] = useState<SelectedInfo | null>(null)
  const [overlays, setOverlays] = useState<Overlays>({
    velocity: false,
    force: false,
    rings: false,
    distance: false,
    labels: false,
    trails: true,
    path: false,
    field: false,
  })
  const [tool, setTool] = useState<ObjKind>("planet")
  const [timeScale, setTimeScale] = useState<0.5 | 1 | 2>(1)
  const timeScaleRef = useRef<0.5 | 1 | 2>(1)
  const slowTickRef = useRef(0)
  const [compare, setCompare] = useState(false)
  const compareRef = useRef(false)
  const [savedExists, setSavedExists] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  // Camera: world point at screen centre + zoom. follow tracks the selection.
  const camRef = useRef({ x: CX, y: CY, zoom: 1 })
  const [zoomPct, setZoomPct] = useState(100)
  const [follow, setFollow] = useState(false)
  const followRef = useRef(false)
  const [panMode, setPanMode] = useState(false)
  const panRef = useRef({ active: false, sx: 0, sy: 0, camX: 0, camY: 0 })

  const [progress, setProgress] = useState<Progress>(emptyProgress)
  const progressRef = useRef(progress)
  const [activeLevel, setActiveLevel] = useState<number | null>(null)
  const [hud, setHud] = useState<{ pct: number; hold: number; target: number; attempts: number }>({ pct: 0, hold: 0, target: 0, attempts: 0 })
  const [result, setResult] = useState<ResultInfo>(null)
  const challengeRef = useRef<ChallengeState>({
    levelId: null,
    target: 0,
    hold: 0,
    attempts: 0,
    startFrame: 0,
    startCrash: 0,
    startEscape: 0,
    startMerge: 0,
    bestAccuracy: 0,
    trackId: null,
    resolved: null,
  })

  useEffect(() => {
    setProgress(loadProgress())
  }, [])
  useEffect(() => {
    progressRef.current = progress
  }, [progress])
  useEffect(() => {
    trailLengthRef.current = trailLength
  }, [trailLength])
  useEffect(() => {
    timeScaleRef.current = timeScale
  }, [timeScale])
  useEffect(() => {
    compareRef.current = compare
  }, [compare])
  useEffect(() => {
    followRef.current = follow
  }, [follow])
  useEffect(() => {
    try {
      setSavedExists(!!localStorage.getItem("avanza-gravity-system-v1"))
    } catch {
      /* ignore */
    }
  }, [])

  const feedbackRef = useRef<{ kind: FeedbackKind; frame: number }>({ kind: "idle", frame: 0 })
  const setFeedback = useCallback((kind: FeedbackKind) => {
    const cur = feedbackRef.current
    // Let user-driven states (aim/idle) always show; otherwise don't let a
    // lower-priority event overwrite a fresh higher-priority one for ~1.5s.
    if (kind !== "aim" && kind !== "idle" && frameRef.current - cur.frame < 90 && FEEDBACK_PRIORITY[kind] < FEEDBACK_PRIORITY[cur.kind]) return
    feedbackRef.current = { kind, frame: frameRef.current }
  }, [])

  const dragRef = useRef<{ active: boolean; startX: number; startY: number; currentX: number; currentY: number }>({
    active: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  })

  const spawnBurst = useCallback((x: number, y: number, color: string, count: number) => {
    for (let i = 0; i < count; i++) {
      const a = (Math.PI * 2 * i) / count + i * 0.7
      const sp = 1.2 + (i % 4) * 0.5
      particlesRef.current.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 26 + (i % 6), maxLife: 32, color })
    }
    // Safety cap so a burst of collisions can't grow the pool unbounded.
    if (particlesRef.current.length > 420) particlesRef.current.splice(0, particlesRef.current.length - 420)
    // Bright core flash + expanding shockwave ring
    flashesRef.current.push({ x, y, r: 4, maxR: 44, life: 20, maxLife: 20, color })
    flashesRef.current.push({ x, y, r: 2, maxR: 68, life: 26, maxLife: 26, color: "#ffffff" })
  }, [])

  const bodyName = useCallback(
    (planetNo: number) => (planetNo === 0 ? t.gamesPage.gravityNameStar : `${t.gamesPage.gravityNamePlanet} ${planetNo}`),
    [t],
  )

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const ov = overlays

    const dpr = window.devicePixelRatio || 1
    if (canvas.width !== CANVAS_W * dpr || canvas.height !== CANVAS_H * dpr) {
      canvas.width = CANVAS_W * dpr
      canvas.height = CANVAS_H * dpr
      ctx.scale(dpr, dpr)
    }

    const bodies = bodiesRef.current
    const star = dominantBody(bodies)

    drawBackground(ctx, frameRef.current)
    drawVignette(ctx)

    // Camera transform: everything below is drawn in world coordinates.
    const cam = camRef.current
    ctx.save()
    ctx.translate(CANVAS_W / 2, CANVAS_H / 2)
    ctx.scale(cam.zoom, cam.zoom)
    ctx.translate(-cam.x, -cam.y)

    // Solar-system comparison rings with labels
    if (compareRef.current && star) {
      ctx.textAlign = "left"
      for (const o of REAL_ORBITS) {
        ctx.strokeStyle = o.color + "3a"
        ctx.lineWidth = 1
        ctx.setLineDash([4, 6])
        ctx.beginPath()
        ctx.arc(star.x, star.y, o.r, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])
        ctx.font = "700 10px ui-sans-serif, system-ui, sans-serif"
        ctx.fillStyle = o.color + "cc"
        ctx.fillText(t.gamesPage.gravityCh.planets[o.key as keyof typeof t.gamesPage.gravityCh.planets], star.x + o.r + 3, star.y - 2)
      }
    }

    if (ov.field) {
      const step = 52
      for (let gx = step / 2; gx < CANVAS_W; gx += step) {
        for (let gy = step / 2; gy < CANVAS_H; gy += step) {
          let ax = 0
          let ay = 0
          for (const b of bodies) {
            const dx = b.x - gx
            const dy = b.y - gy
            const r2 = dx * dx + dy * dy + SOFTEN * SOFTEN
            const rr = Math.sqrt(r2)
            const f = (G * b.m) / r2
            ax += (f * dx) / rr
            ay += (f * dy) / rr
          }
          const mag = Math.hypot(ax, ay)
          if (mag < 1e-4) continue
          const alpha = Math.min(0.42, mag * 6)
          const len = Math.min(step * 0.44, 6 + mag * 26)
          const ux = ax / mag
          const uy = ay / mag
          ctx.strokeStyle = `rgba(125,170,255,${alpha.toFixed(3)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(gx, gy)
          ctx.lineTo(gx + ux * len, gy + uy * len)
          ctx.stroke()
          ctx.fillStyle = `rgba(160,200,255,${alpha.toFixed(3)})`
          ctx.beginPath()
          ctx.arc(gx + ux * len, gy + uy * len, 1.1, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    // Mission target rings
    const activeCr = challengeRef.current
    if (activeCr.levelId != null && star) {
      const level = LEVELS[activeCr.levelId - 1]
      if (level.rings) {
        for (const ring of level.rings) {
          ctx.strokeStyle = ring.color + "88"
          ctx.lineWidth = 1.5
          if (ring.dashed) ctx.setLineDash([5, 7])
          ctx.beginPath()
          ctx.arc(star.x, star.y, ring.r, 0, Math.PI * 2)
          ctx.stroke()
          ctx.setLineDash([])
        }
      }
    }

    if (ov.rings && star) {
      // Fixed distance guide rings, then a ring at each body's current radius.
      ctx.lineWidth = 1
      for (const gr of [80, 150, 220, 290]) {
        ctx.strokeStyle = "rgba(125,170,255,0.07)"
        ctx.setLineDash([2, 8])
        ctx.beginPath()
        ctx.arc(star.x, star.y, gr, 0, Math.PI * 2)
        ctx.stroke()
      }
      ctx.setLineDash([])
      for (const b of bodies) {
        if (b === star) continue
        ctx.strokeStyle = "rgba(255,255,255,0.07)"
        ctx.beginPath()
        ctx.arc(star.x, star.y, Math.hypot(b.x - star.x, b.y - star.y), 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    if (ov.trails) {
      const selId = selectedIdRef.current
      for (const b of bodies) {
        if (b.noTrail) continue
        const n = b.trail.length
        if (n < 2) continue
        const sel = b.id === selId
        const [cr, cg, cb] = hexRgb(b.color)
        // Draw fewer, longer segments for long trails to keep the frame cheap.
        const stride = n > 200 ? 2 : 1
        for (let i = stride; i < n; i += stride) {
          const f = i / n // 0 = oldest, 1 = newest
          const alpha = (sel ? 0.95 : 0.5) * f * f
          if (alpha < 0.02) continue
          ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`
          ctx.lineWidth = (sel ? 2.6 : 1.7) * f
          ctx.beginPath()
          ctx.moveTo(b.trail[i - stride][0], b.trail[i - stride][1])
          ctx.lineTo(b.trail[i][0], b.trail[i][1])
          ctx.stroke()
        }
      }
    }

    if (ov.distance && star) {
      ctx.font = "700 11px ui-monospace, monospace"
      for (const b of bodies) {
        if (b === star) continue
        ctx.strokeStyle = "rgba(255,255,255,0.14)"
        ctx.setLineDash([2, 5])
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
        ctx.setLineDash([])
        ctx.fillStyle = "rgba(255,255,255,0.55)"
        ctx.fillText(String(Math.round(Math.hypot(b.x - star.x, b.y - star.y))), (star.x + b.x) / 2, (star.y + b.y) / 2)
      }
    }

    // Subtle glow around bodies that have settled into a stable orbit
    for (const b of bodies) {
      if (b === star || !b.orbited) continue
      const r = radiusForMass(b.m)
      const pulse = 0.5 + 0.5 * Math.sin(frameRef.current * 0.08 + b.id)
      ctx.strokeStyle = `rgba(74,222,128,${(0.14 + 0.14 * pulse).toFixed(3)})`
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.arc(b.x, b.y, r + 5 + pulse * 2, 0, Math.PI * 2)
      ctx.stroke()
    }

    for (const b of bodies) {
      renderBody(ctx, b, b === star && b.m >= STAR_MASS, frameRef.current)
    }

    if (ov.velocity) {
      for (const b of bodies) {
        if (b === star) continue
        if (Math.hypot(b.vx, b.vy) < 0.03) continue
        drawArrow(ctx, b.x, b.y, b.x + b.vx * 18, b.y + b.vy * 18, "#5eead4", 2)
      }
    }

    if (ov.force) {
      for (const b of bodies) {
        let ax = 0
        let ay = 0
        for (const o of bodies) {
          if (o === b) continue
          const dx = o.x - b.x
          const dy = o.y - b.y
          const r2 = dx * dx + dy * dy + SOFTEN * SOFTEN
          const rr = Math.sqrt(r2)
          const f = (G * o.m) / r2
          ax += (f * dx) / rr
          ay += (f * dy) / rr
        }
        const mag = Math.hypot(ax, ay)
        if (mag < 1e-4) continue
        const len = Math.min(42, Math.max(8, mag * 260))
        drawArrow(ctx, b.x, b.y, b.x + (ax / mag) * len, b.y + (ay / mag) * len, "#f0abfc", 2)
      }
    }

    if (ov.labels) {
      ctx.font = "700 11px ui-sans-serif, system-ui, sans-serif"
      ctx.fillStyle = "rgba(255,255,255,0.82)"
      ctx.textAlign = "left"
      for (const b of bodies) {
        if (b.hideLabel) continue
        const r = radiusForMass(b.m)
        ctx.fillText(b.name ?? bodyName(b.planetNo), b.x + r + 4, b.y - r - 2)
      }
    }

    if (ov.path && selectedIdRef.current != null) {
      const sb = bodies.find((b) => b.id === selectedIdRef.current)
      if (sb && sb !== star) {
        const path = predictPath(sb.x, sb.y, sb.vx, sb.vy, bodies, sb.id)
        if (path.length > 1) {
          ctx.strokeStyle = "#93c5fd66"
          ctx.lineWidth = 1.5
          ctx.setLineDash([3, 6])
          ctx.beginPath()
          ctx.moveTo(path[0][0], path[0][1])
          for (let i = 1; i < path.length; i++) ctx.lineTo(path[i][0], path[i][1])
          ctx.stroke()
          ctx.setLineDash([])
        }
      }
    }

    if (selectedIdRef.current != null) {
      const sb = bodies.find((b) => b.id === selectedIdRef.current)
      if (sb) {
        const pulse = 4 + Math.sin(frameRef.current * 0.12) * 2
        ctx.strokeStyle = "rgba(255,255,255,0.9)"
        ctx.lineWidth = 1.5
        ctx.setLineDash([4, 4])
        ctx.beginPath()
        ctx.arc(sb.x, sb.y, radiusForMass(sb.m) + pulse, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])
      }
    }

    for (const fl of flashesRef.current) {
      const p = fl.life / fl.maxLife
      const rad = fl.r + (fl.maxR - fl.r) * (1 - p)
      ctx.strokeStyle = fl.color + Math.round(p * 200).toString(16).padStart(2, "0")
      ctx.lineWidth = 2.5 * p + 0.5
      ctx.beginPath()
      ctx.arc(fl.x, fl.y, rad, 0, Math.PI * 2)
      ctx.stroke()
      fl.life -= 1
    }
    flashesRef.current = flashesRef.current.filter((f) => f.life > 0)

    for (const p of particlesRef.current) {
      const a = Math.max(0, p.life / p.maxLife)
      ctx.fillStyle = p.color + Math.round(a * 255).toString(16).padStart(2, "0")
      ctx.beginPath()
      ctx.arc(p.x, p.y, 1.6 + a * 1.6, 0, Math.PI * 2)
      ctx.fill()
      p.x += p.vx
      p.y += p.vy
      p.vx *= 0.94
      p.vy *= 0.94
      p.life -= 1
    }
    particlesRef.current = particlesRef.current.filter((p) => p.life > 0)

    ctx.textAlign = "center"
    ctx.font = "700 13px ui-sans-serif, system-ui, sans-serif"
    for (const f of floatersRef.current) {
      const a = Math.max(0, f.life / f.maxLife)
      ctx.fillStyle = f.color + Math.round(a * 255).toString(16).padStart(2, "0")
      ctx.fillText(t.gamesPage[f.key], f.x, f.y)
      f.y -= 0.4
      f.life -= 1
    }
    floatersRef.current = floatersRef.current.filter((f) => f.life > 0)
    ctx.textAlign = "start"

    const drag = dragRef.current
    if (drag.active) {
      const vx = (drag.currentX - drag.startX) / VEL_SCALE
      const vy = (drag.currentY - drag.startY) / VEL_SCALE
      const speed = Math.hypot(vx, vy)
      const { zone } = launchZone(speed, drag.startX, drag.startY, bodies)
      const color = ZONE_COLOR[zone]

      if (speed > 0.05) {
        const path = predictPath(drag.startX, drag.startY, vx, vy, bodies)
        if (path.length > 1) {
          ctx.strokeStyle = color + "40"
          ctx.lineWidth = 1.5
          ctx.setLineDash([3, 6])
          ctx.beginPath()
          ctx.moveTo(path[0][0], path[0][1])
          for (let i = 1; i < path.length; i++) ctx.lineTo(path[i][0], path[i][1])
          ctx.stroke()
          ctx.setLineDash([])
        }
      }

      drawArrow(ctx, drag.startX, drag.startY, drag.currentX, drag.currentY, color, Math.min(2 + speed * 1.1, 7))
      ctx.fillStyle = "rgba(255,255,255,0.85)"
      ctx.beginPath()
      ctx.arc(drag.startX, drag.startY, radiusForMass(mass), 0, Math.PI * 2)
      ctx.fill()

      if (speed > 0.05) {
        const lx = drag.currentX + 10
        const ly = drag.currentY - 6
        ctx.font = "700 12px ui-monospace, monospace"
        ctx.fillStyle = "rgba(255,255,255,0.95)"
        ctx.fillText(`${t.gamesPage.gravitySpeedLabel} ${speed.toFixed(2)}`, lx, ly)
        ctx.font = "700 11px ui-sans-serif, system-ui, sans-serif"
        ctx.fillStyle = color
        ctx.fillText(t.gamesPage[ZONE_GUIDE_KEY[zone]], lx, ly + 14)
      }
    }

    ctx.restore()
  }, [mass, t, bodyName, overlays])

  const stepPhysics = useCallback(() => {
    frameRef.current += 1
    const frame = frameRef.current
    const bodies = bodiesRef.current
    const star = dominantBody(bodies)

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
    for (let i = 0; i < bodies.length; i++) {
      bodies[i].vx += ax[i]
      bodies[i].vy += ay[i]
      bodies[i].x += bodies[i].vx
      bodies[i].y += bodies[i].vy
      bodies[i].trail.push([bodies[i].x, bodies[i].y])
      while (bodies[i].trail.length > trailLengthRef.current) bodies[i].trail.shift()
      if (star && bodies[i] !== star) {
        bodies[i].rHist.push(Math.hypot(bodies[i].x - star.x, bodies[i].y - star.y))
        if (bodies[i].rHist.length > HIST_LEN) bodies[i].rHist.shift()
      }
    }

    for (let i = bodies.length - 1; i >= 0; i--) {
      const b = bodies[i]
      if (b.x < -ESCAPE_MARGIN || b.x > CANVAS_W + ESCAPE_MARGIN || b.y < -ESCAPE_MARGIN || b.y > CANVAS_H + ESCAPE_MARGIN) {
        const fx = Math.max(16, Math.min(CANVAS_W - 16, b.x))
        const fy = Math.max(18, Math.min(CANVAS_H - 8, b.y))
        floatersRef.current.push({ x: fx, y: fy, key: "gravityLabelEscaped", color: "#fbbf24", life: 70, maxLife: 70 })
        // Fade out at the boundary
        for (let k = 0; k < 8; k++) {
          const a = (Math.PI * 2 * k) / 8
          particlesRef.current.push({ x: fx, y: fy, vx: Math.cos(a) * 0.6, vy: Math.sin(a) * 0.6, life: 22, maxLife: 22, color: b.color })
        }
        flashesRef.current.push({ x: fx, y: fy, r: 3, maxR: 30, life: 16, maxLife: 16, color: b.color })
        setFeedback("escape")
        eventsRef.current.escape += 1
        if (selectedIdRef.current === b.id) {
          selectedIdRef.current = null
          selDirtyRef.current = true
        }
        bodies.splice(i, 1)
      }
    }

    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        const dx = bodies[j].x - bodies[i].x
        const dy = bodies[j].y - bodies[i].y
        const d = Math.hypot(dx, dy)
        const ri = radiusForMass(bodies[i].m)
        const rj = radiusForMass(bodies[j].m)
        if (d < (ri + rj) * 0.6) {
          const totalM = bodies[i].m + bodies[j].m
          const big = bodies[i].m >= bodies[j].m ? bodies[i] : bodies[j]
          const small = bodies[i].m >= bodies[j].m ? bodies[j] : bodies[i]
          const cx = (bodies[i].x * bodies[i].m + bodies[j].x * bodies[j].m) / totalM
          const cy = (bodies[i].y * bodies[i].m + bodies[j].y * bodies[j].m) / totalM
          big.vx = (big.vx * big.m + small.vx * small.m) / totalM
          big.vy = (big.vy * big.m + small.vy * small.m) / totalM
          big.m = totalM
          big.user = big.user || small.user
          big.rHist = []
          const isCrash = big.m >= STAR_MASS
          if (isCrash) eventsRef.current.crash += 1
          else eventsRef.current.merge += 1
          spawnBurst(cx, cy, big.color, isCrash ? 20 : 12)
          if (isCrash) {
            // Bright stellar flare
            flashesRef.current.push({ x: cx, y: cy, r: 6, maxR: 110, life: 30, maxLife: 30, color: "#fff3c4" })
            for (let k = 0; k < 10; k++) {
              const a = (Math.PI * 2 * k) / 10
              particlesRef.current.push({ x: cx, y: cy, vx: Math.cos(a) * 2.6, vy: Math.sin(a) * 2.6, life: 30, maxLife: 34, color: "#ffd873" })
            }
          }
          floatersRef.current.push({
            x: cx,
            y: cy - 14,
            key: isCrash ? "gravityLabelCrashed" : "gravityLabelMerged",
            color: isCrash ? "#f87171" : "#c084fc",
            life: 70,
            maxLife: 70,
          })
          setFeedback(isCrash ? "crash" : "merge")
          if (selectedIdRef.current === small.id) {
            selectedIdRef.current = big.id
            selDirtyRef.current = true
          }
          bodies.splice(bodies.indexOf(small), 1)
          break
        }
      }
    }

    for (const b of bodies) {
      if (b.user && !b.orbited && b.m < STAR_MASS && frame - b.born > ORBIT_FRAMES && b.x > 0 && b.x < CANVAS_W && b.y > 0 && b.y < CANVAS_H) {
        b.orbited = true
        let rMin = Infinity
        let rMax = 0
        for (const dh of b.rHist) {
          if (dh < rMin) rMin = dh
          if (dh > rMax) rMax = dh
        }
        const ecc = rMax + rMin > 0 ? (rMax - rMin) / (rMax + rMin) : 0
        setFeedback(ecc < 0.18 ? "orbit" : "elliptical")
      }
    }

    if (bodies.length >= CHAOS_COUNT && frame - feedbackRef.current.frame > 100) setFeedback("chaos")

    setBodyCount(bodies.length)
  }, [setFeedback, spawnBurst])

  const finishLevel = useCallback((kind: "win" | "fail") => {
    const cr = challengeRef.current
    if (cr.resolved || cr.levelId == null) return
    cr.resolved = kind
    const level = LEVELS[cr.levelId - 1]
    if (kind === "win") {
      const stars = computeStars(level, cr)
      const timeSec = (frameRef.current - cr.startFrame) / 60
      const score = stars * 1000 + Math.max(0, 500 - Math.round(timeSec * 5)) + Math.max(0, 300 - cr.attempts * 50) + Math.round((level.id === 5 ? cr.bestAccuracy : 0) * 300)
      const prev = progressRef.current
      const stars2 = { ...prev.stars, [level.id]: Math.max(prev.stars[level.id] || 0, stars) }
      const ach = [...prev.ach]
      for (const a of LEVEL_ACH[level.id] || []) if (!ach.includes(a)) ach.push(a)
      if (LEVELS.every((l) => (stars2[l.id] || 0) >= 1) && !ach.includes("gravityMaster")) ach.push("gravityMaster")
      const next: Progress = { unlocked: Math.max(prev.unlocked, Math.min(LEVELS.length, level.id + 1)), stars: stars2, ach }
      const newAch = ach.filter((a) => !prev.ach.includes(a))
      progressRef.current = next
      setProgress(next)
      saveProgress(next)
      // Clean success animation: golden rings + sparkles at the star
      const s = dominantBody(bodiesRef.current)
      const sx = s ? s.x : CX
      const sy = s ? s.y : CY
      flashesRef.current.push({ x: sx, y: sy, r: 8, maxR: 220, life: 46, maxLife: 46, color: "#ffd873" })
      flashesRef.current.push({ x: sx, y: sy, r: 8, maxR: 150, life: 40, maxLife: 40, color: "#5eead4" })
      for (let k = 0; k < 24; k++) {
        const a = (Math.PI * 2 * k) / 24
        const sp = 2 + (k % 5) * 0.6
        particlesRef.current.push({ x: sx, y: sy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 46, maxLife: 52, color: k % 2 ? "#ffd873" : "#5eead4" })
      }
      setResult({ kind: "win", levelId: level.id, stars, score, newAch })
    } else {
      setResult({ kind: "fail", levelId: level.id, stars: 0, score: 0, newAch: [] })
    }
  }, [])

  useEffect(() => {
    const tick = () => {
      if (!paused) {
        const ts = timeScaleRef.current
        if (ts === 2) {
          stepPhysics()
          stepPhysics()
        } else if (ts === 0.5) {
          slowTickRef.current = (slowTickRef.current + 1) % 2
          if (slowTickRef.current === 0) stepPhysics()
        } else {
          stepPhysics()
        }
      }

      // Camera follows the selected body when enabled.
      if (followRef.current) {
        const sb = bodiesRef.current.find((b) => b.id === selectedIdRef.current)
        if (sb) {
          camRef.current.x += (sb.x - camRef.current.x) * 0.12
          camRef.current.y += (sb.y - camRef.current.y) * 0.12
        }
      }

      if (dragRef.current.active) setFeedback("aim")

      draw()

      setFeedbackKind(feedbackRef.current.kind)

      // Challenge evaluation
      const cr = challengeRef.current
      if (cr.levelId != null && !cr.resolved && !paused) {
        const bodies = bodiesRef.current
        const star = dominantBody(bodies)
        if (star) {
          const level = LEVELS[cr.levelId - 1]
          const ev = eventsRef.current
          let failed = false
          if (level.failOn?.includes("crash") && ev.crash > cr.startCrash) failed = true
          else if (level.failOn?.includes("escape") && ev.escape > cr.startEscape) failed = true
          else if (level.failOn?.includes("merge") && ev.merge > cr.startMerge) failed = true
          // Rescue mission: fail only if the tracked drifter itself is lost.
          else if (cr.trackId != null && !bodies.some((b) => b.id === cr.trackId)) failed = true
          if (failed) {
            finishLevel("fail")
          } else {
            const res = level.evaluate(bodies, star, cr)
            if (res.accuracy != null && res.accuracy > cr.bestAccuracy) cr.bestAccuracy = res.accuracy
            if (res.ok) {
              cr.hold += 1
              if (cr.hold >= cr.target) finishLevel("win")
            } else {
              cr.hold = 0
            }
          }
          if (frameRef.current % 6 === 0) {
            setHud({ pct: Math.min(1, cr.hold / cr.target), hold: cr.hold, target: cr.target, attempts: cr.attempts })
          }
        }
      }

      const selId = selectedIdRef.current
      if (selId == null) {
        setSelected(null)
      } else if (frameRef.current % 6 === 0 || selDirtyRef.current) {
        selDirtyRef.current = false
        const bodies = bodiesRef.current
        const sb = bodies.find((b) => b.id === selId)
        const star = dominantBody(bodies)
        if (!sb || !star) {
          selectedIdRef.current = null
          setSelected(null)
        } else {
          setSelected(analyzeBody(sb, bodies, star))
        }
      }

      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [draw, stepPhysics, paused, setFeedback, finishLevel])

  // Screen (canvas-local) coordinates, before the camera transform.
  const getScreen = (e: PointerEvent | React.PointerEvent): { x: number; y: number } => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return { x: ((e.clientX - rect.left) / rect.width) * CANVAS_W, y: ((e.clientY - rect.top) / rect.height) * CANVAS_H }
  }
  // World coordinates (used by launching and hit-testing).
  const getPos = (e: PointerEvent | React.PointerEvent): { x: number; y: number } => {
    const s = getScreen(e)
    const cam = camRef.current
    return { x: (s.x - CANVAS_W / 2) / cam.zoom + cam.x, y: (s.y - CANVAS_H / 2) / cam.zoom + cam.y }
  }
  const bodyAt = (x: number, y: number): Body | null => {
    const bodies = bodiesRef.current
    for (let i = bodies.length - 1; i >= 0; i--) {
      const b = bodies[i]
      if (Math.hypot(b.x - x, b.y - y) < radiusForMass(b.m) + 7) return b
    }
    return null
  }

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault()
    // Pan mode drags the camera instead of launching, so it never interferes.
    if (panMode) {
      const s = getScreen(e)
      canvasRef.current?.setPointerCapture(e.pointerId)
      panRef.current = { active: true, sx: s.x, sy: s.y, camX: camRef.current.x, camY: camRef.current.y }
      return
    }
    const { x, y } = getPos(e)
    const hit = bodyAt(x, y)
    if (hit) {
      selectedIdRef.current = hit.id
      selDirtyRef.current = true
      dragRef.current.active = false
      return
    }
    canvasRef.current?.setPointerCapture(e.pointerId)
    dragRef.current = { active: true, startX: x, startY: y, currentX: x, currentY: y }
  }
  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (panRef.current.active) {
      const s = getScreen(e)
      const cam = camRef.current
      cam.x = panRef.current.camX - (s.x - panRef.current.sx) / cam.zoom
      cam.y = panRef.current.camY - (s.y - panRef.current.sy) / cam.zoom
      return
    }
    if (!dragRef.current.active) return
    const { x, y } = getPos(e)
    dragRef.current.currentX = x
    dragRef.current.currentY = y
  }
  function onPointerUp(e: React.PointerEvent<HTMLCanvasElement>) {
    if (panRef.current.active) {
      panRef.current.active = false
      canvasRef.current?.releasePointerCapture(e.pointerId)
      return
    }
    if (!dragRef.current.active) return
    canvasRef.current?.releasePointerCapture(e.pointerId)
    const { startX, startY, currentX, currentY } = dragRef.current
    const id = nextId++
    // In sandbox the toolbar picks the object kind; challenge mode uses a planet.
    const useTool = mode === "sandbox" ? tool : "planet"
    const color = useTool === "planet" ? COLORS[id % COLORS.length] : TOOL_DEFS[useTool].color
    bodiesRef.current.push({
      id,
      planetNo: nextPlanetNo++,
      x: startX,
      y: startY,
      vx: (currentX - startX) / VEL_SCALE,
      vy: (currentY - startY) / VEL_SCALE,
      m: mass,
      color,
      trail: [],
      rHist: [],
      born: frameRef.current,
      user: true,
      orbited: false,
      kind: useTool,
    })
    setBodyCount(bodiesRef.current.length)
    dragRef.current.active = false
    selectedIdRef.current = id
    selDirtyRef.current = true
    setFeedback("idle")
    const cr = challengeRef.current
    if (cr.levelId != null && !cr.resolved) cr.attempts += 1
  }

  function deselect() {
    selectedIdRef.current = null
    selDirtyRef.current = true
    setSelected(null)
  }

  const startLevel = useCallback((id: number) => {
    const level = LEVELS[id - 1]
    const scene = level.setup()
    bodiesRef.current = scene
    particlesRef.current = []
    flashesRef.current = []
    floatersRef.current = []
    selectedIdRef.current = null
    setSelected(null)
    const ev = eventsRef.current
    const track = scene.find((b) => b.role === "drifter")?.id ?? null
    challengeRef.current = {
      levelId: id,
      target: level.holdSeconds * 60,
      hold: 0,
      attempts: 0,
      startFrame: frameRef.current,
      startCrash: ev.crash,
      startEscape: ev.escape,
      startMerge: ev.merge,
      bestAccuracy: 0,
      trackId: track,
      resolved: null,
    }
    setActiveLevel(id)
    setHud({ pct: 0, hold: 0, target: level.holdSeconds * 60, attempts: 0 })
    setResult(null)
    setPaused(false)
    setBodyCount(scene.length)
    setFeedback("idle")
  }, [setFeedback])

  const exitToMissions = useCallback(() => {
    challengeRef.current.levelId = null
    challengeRef.current.resolved = null
    setActiveLevel(null)
    setResult(null)
    bodiesRef.current = defaultScene()
    selectedIdRef.current = null
    setSelected(null)
    setBodyCount(bodiesRef.current.length)
    setFeedback("idle")
  }, [setFeedback])

  function switchMode(next: "sandbox" | "challenge") {
    if (next === mode) return
    setMode(next)
    challengeRef.current.levelId = null
    challengeRef.current.resolved = null
    setActiveLevel(null)
    setResult(null)
    bodiesRef.current = defaultScene()
    selectedIdRef.current = null
    setSelected(null)
    setBodyCount(bodiesRef.current.length)
    setPaused(false)
    setFeedback("idle")
    resetCamera()
    setCompare(false)
    setPanMode(false)
  }

  function reset() {
    if (mode === "challenge" && activeLevel != null) {
      startLevel(activeLevel)
      return
    }
    bodiesRef.current = defaultScene()
    particlesRef.current = []
    flashesRef.current = []
    floatersRef.current = []
    selectedIdRef.current = null
    setSelected(null)
    setBodyCount(bodiesRef.current.length)
    setPaused(false)
    setFeedback("idle")
  }
  function clearAll() {
    bodiesRef.current = []
    particlesRef.current = []
    flashesRef.current = []
    floatersRef.current = []
    selectedIdRef.current = null
    setSelected(null)
    setBodyCount(0)
    setPaused(false)
    setFeedback("idle")
  }
  function clearTrails() {
    for (const b of bodiesRef.current) b.trail = []
  }

  function pickTool(k: ObjKind) {
    setTool(k)
    setMass(TOOL_DEFS[k].mass)
  }

  // Spawn a scaled real-planet preset already on a matching circular orbit.
  function spawnPreset(p: Preset) {
    const star = dominantBody(bodiesRef.current)
    const cx = star ? star.x : CX
    const cy = star ? star.y : CY
    const starM = star ? star.m : STAR_M
    const vc = Math.sqrt((G * starM) / p.orbitR) * (p.speedMul ?? 1)
    const id = nextId++
    bodiesRef.current.push({
      id,
      planetNo: nextPlanetNo++,
      x: cx + p.orbitR,
      y: cy,
      vx: 0,
      vy: vc,
      m: p.mass,
      color: p.color,
      trail: [],
      rHist: [],
      born: frameRef.current,
      user: true,
      orbited: false,
      kind: p.kind,
      name: t.gamesPage.gravityCh.planets[p.key as keyof typeof t.gamesPage.gravityCh.planets],
    })
    setBodyCount(bodiesRef.current.length)
    setTool(p.kind)
    setMass(p.mass)
    selectedIdRef.current = id
    selDirtyRef.current = true
  }

  function stepForward() {
    setPaused(true)
    stepPhysics()
    draw()
  }

  function saveSystem() {
    try {
      const data = bodiesRef.current.map((b) => ({ x: b.x, y: b.y, vx: b.vx, vy: b.vy, m: b.m, color: b.color, kind: b.kind, name: b.name, planetNo: b.planetNo }))
      localStorage.setItem("avanza-gravity-system-v1", JSON.stringify(data))
      setSavedExists(true)
    } catch {
      /* ignore */
    }
  }
  function loadSystem() {
    try {
      const raw = localStorage.getItem("avanza-gravity-system-v1")
      if (!raw) return
      const data = JSON.parse(raw) as Array<Partial<Body>>
      bodiesRef.current = data.map((d) => ({
        id: nextId++,
        planetNo: d.planetNo ?? nextPlanetNo++,
        x: d.x ?? CX,
        y: d.y ?? CY,
        vx: d.vx ?? 0,
        vy: d.vy ?? 0,
        m: d.m ?? 40,
        color: d.color ?? "#06b6d4",
        trail: [],
        rHist: [],
        born: frameRef.current,
        user: true,
        orbited: false,
        kind: d.kind,
        name: d.name,
      }))
      particlesRef.current = []
      flashesRef.current = []
      floatersRef.current = []
      selectedIdRef.current = null
      setSelected(null)
      setBodyCount(bodiesRef.current.length)
    } catch {
      /* ignore */
    }
  }

  // Camera helpers
  function zoomBy(factor: number) {
    const cam = camRef.current
    cam.zoom = Math.max(0.4, Math.min(3, cam.zoom * factor))
    setZoomPct(Math.round(cam.zoom * 100))
  }
  function resetCamera() {
    camRef.current = { x: CX, y: CY, zoom: 1 }
    setZoomPct(100)
    setFollow(false)
  }
  function onWheel(e: React.WheelEvent<HTMLCanvasElement>) {
    if (mode !== "sandbox") return
    e.preventDefault()
    zoomBy(e.deltaY < 0 ? 1.1 : 0.9)
  }

  // Inspector actions operate on the currently selected body.
  const withSelected = (fn: (b: Body) => void) => {
    const b = bodiesRef.current.find((x) => x.id === selectedIdRef.current)
    if (b) {
      fn(b)
      selDirtyRef.current = true
    }
  }
  function renameSelected(name: string) {
    withSelected((b) => {
      b.name = name.trim() || undefined
    })
  }
  function deleteSelected() {
    const id = selectedIdRef.current
    if (id == null) return
    bodiesRef.current = bodiesRef.current.filter((b) => b.id !== id)
    selectedIdRef.current = null
    setSelected(null)
    setBodyCount(bodiesRef.current.length)
  }
  function adjustSelectedMass(m: number) {
    withSelected((b) => {
      b.m = m
    })
  }
  function toggleSelectedTrail() {
    withSelected((b) => {
      b.noTrail = !b.noTrail
      if (b.noTrail) b.trail = []
    })
  }
  function toggleSelectedLabel() {
    withSelected((b) => {
      b.hideLabel = !b.hideLabel
    })
  }
  function focusSelected() {
    withSelected((b) => {
      camRef.current.x = b.x
      camRef.current.y = b.y
    })
    setFollow(true)
  }

  // Keyboard shortcuts. The handler is kept fresh in a ref so the window
  // listener is attached only once.
  const shortcutRef = useRef<(e: KeyboardEvent) => void>(() => {})
  useEffect(() => {
    shortcutRef.current = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const k = e.key.toLowerCase()
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault()
        setPaused((p) => !p)
      } else if (k === "r") {
        e.preventDefault()
        reset()
      } else if (k === "c") {
        if (mode === "sandbox") {
          e.preventDefault()
          clearAll()
        }
      } else if (k === "t") {
        e.preventDefault()
        setOverlays((o) => ({ ...o, trails: !o.trails }))
      } else if (k === "l") {
        e.preventDefault()
        setOverlays((o) => ({ ...o, labels: !o.labels }))
      }
    }
  })
  useEffect(() => {
    const fn = (e: KeyboardEvent) => shortcutRef.current(e)
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [])

  const catLabel = t.gamesPage[massCategoryKey(mass)]
  const panelWhy: WhyKey = selected ? selected.whyKey : KIND_WHY[feedbackKind]
  const inMission = mode === "challenge" && activeLevel != null
  const levelText = (id: number) =>
    (c.levels as Record<string, { title: string; goal: string; teaches: string; win: string; fail: string; tip: string }>)[`l${id}`]
  const achText = (key: string) => (c.ach as Record<string, { name: string; desc: string }>)[key]
  const completedCount = LEVELS.filter((l) => (progress.stars[l.id] || 0) >= 1).length

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
          <p className="text-sm font-bold uppercase tracking-wider text-white/70">{t.gamesPage.gravityEyebrow}</p>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-primary-foreground md:text-5xl">
            {t.gamesPage.gravityTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{t.gamesPage.gravityDesc}</p>

          {/* Mode switch */}
          <div className="mx-auto mt-8 inline-flex rounded-full bg-white/10 p-1 ring-1 ring-white/15">
            {(["challenge", "sandbox"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-bold transition",
                  mode === m ? "bg-avanza-teal text-[#0b0e1f]" : "text-white/70 hover:text-white",
                )}
              >
                {m === "challenge" ? c.challenge : c.sandbox}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.7fr_0.9fr] xl:grid-cols-[2fr_0.9fr]">
            {/* Canvas card */}
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-2 rounded-[28px] bg-white/10 [transform:rotate(-0.6deg)]" />
              <div className="relative overflow-hidden rounded-3xl bg-[#0b0e1f] p-3 shadow-[0_28px_64px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    width={CANVAS_W}
                    height={CANVAS_H}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                    onWheel={onWheel}
                    className={cn("block w-full touch-none rounded-2xl", panMode ? "cursor-grab active:cursor-grabbing" : "cursor-crosshair")}
                    style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}
                  />
                  {/* Result overlay */}
                  {result && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/70 p-6 backdrop-blur-sm">
                      <div className="w-full max-w-sm rounded-2xl bg-[#141935] p-6 text-center ring-1 ring-white/15">
                        <h3 className="text-xl font-extrabold text-white">{result.kind === "win" ? c.complete : c.notYet}</h3>
                        {result.kind === "win" && <StarRow count={result.stars} />}
                        <p className="mt-3 text-sm leading-relaxed text-white/80">
                          {result.kind === "win" ? levelText(result.levelId).win : levelText(result.levelId).fail}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-white/55">
                          <span className="font-bold text-white/70">{c.conceptLabel}: </span>
                          {levelText(result.levelId).teaches}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-white/55">
                          <span className="font-bold text-white/70">{c.tipLabel}: </span>
                          {levelText(result.levelId).tip}
                        </p>
                        {result.kind === "win" && (
                          <p className="mt-3 font-mono text-sm font-bold text-avanza-teal">
                            {c.score}: {result.score}
                          </p>
                        )}
                        {result.newAch.length > 0 && (
                          <div className="mt-3 space-y-1">
                            {result.newAch.map((a) => (
                              <div key={a} className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-300">
                                <Trophy className="h-3.5 w-3.5" />
                                {c.achUnlocked} {achText(a).name}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="mt-5 flex flex-wrap justify-center gap-2">
                          {result.kind === "win" && result.levelId < LEVELS.length && (
                            <button
                              type="button"
                              onClick={() => startLevel(result.levelId + 1)}
                              className="rounded-full bg-avanza-teal px-4 py-2 text-sm font-bold text-[#0b0e1f] transition hover:brightness-110"
                            >
                              {c.next}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => startLevel(result.levelId)}
                            className="rounded-full bg-white/12 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20"
                          >
                            {c.retry}
                          </button>
                          <button
                            type="button"
                            onClick={exitToMissions}
                            className="rounded-full bg-white/12 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20"
                          >
                            {c.back}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {mode === "sandbox" && (
                  <>
                    {/* Object-type toolbar */}
                    <div className="mt-4 flex flex-wrap items-center gap-1.5 px-2">
                      <span className="mr-1 text-[10px] font-extrabold uppercase tracking-wider text-white/40">{t.gamesPage.gravityObjType}</span>
                      {TOOL_ORDER.map((k) => (
                        <button
                          key={k}
                          type="button"
                          aria-pressed={tool === k}
                          onClick={() => pickTool(k)}
                          className={cn("rounded-full px-3 py-1 text-[11px] font-bold transition", tool === k ? "bg-avanza-teal text-[#0b0e1f]" : "bg-white/10 text-white/75 hover:bg-white/20")}
                        >
                          {t.gamesPage.gravityKind[k]}
                        </button>
                      ))}
                    </div>
                    {/* Real planet presets */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 px-2">
                      <span className="mr-1 text-[10px] font-extrabold uppercase tracking-wider text-white/40">{t.gamesPage.gravityPresets}</span>
                      {PRESETS.map((p) => (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => spawnPreset(p)}
                          className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white/80 ring-1 ring-white/10 transition hover:bg-white/20"
                          style={{ boxShadow: `inset 0 -2px 0 ${p.color}88` }}
                        >
                          {t.gamesPage.gravityCh.planets[p.key as keyof typeof t.gamesPage.gravityCh.planets]}
                        </button>
                      ))}
                    </div>
                    <p className="mt-1.5 px-2 text-[11px] leading-tight text-white/45">{t.gamesPage.gravityRealScale}</p>
                  </>
                )}

                <div className="mt-3 flex flex-col gap-3 px-2">
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    <div className="min-w-[190px] flex-1">
                      <label className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-white/65">
                        <span>{t.gamesPage.gravityMass}</span>
                        <span className="flex items-center gap-2">
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold normal-case tracking-normal text-white/80">{catLabel}</span>
                          <span className="font-mono text-white/80">{mass}</span>
                        </span>
                      </label>
                      <input
                        type="range"
                        min={mode === "sandbox" ? TOOL_DEFS[tool].min : 5}
                        max={mode === "sandbox" ? TOOL_DEFS[tool].max : 500}
                        value={mass}
                        onChange={(e) => setMass(Number(e.target.value))}
                        className={SLIDER_CLASS}
                      />
                      <p className="mt-1.5 text-[11px] leading-tight text-white/45">{t.gamesPage.gravityMassHint}</p>
                    </div>
                    <div className="min-w-[190px] flex-1">
                      <label className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-white/65">
                        <span>{t.gamesPage.gravityTrailLength}</span>
                        <span className="font-mono text-white/80">{trailLength}</span>
                      </label>
                      <input type="range" min={0} max={360} value={trailLength} onChange={(e) => setTrailLength(Number(e.target.value))} className={SLIDER_CLASS} />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button type="button" onClick={() => setPaused((p) => !p)} className={cn(BTN_BASE, BTN_PRIMARY)}>
                      {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                      {paused ? t.gamesPage.gravityPlay : t.gamesPage.gravityPause}
                    </button>
                    {mode === "sandbox" && (
                      <button type="button" onClick={stepForward} className={cn(BTN_BASE, BTN_NEUTRAL)} aria-label={t.gamesPage.gravityStep}>
                        <SkipForward className="h-3.5 w-3.5" />
                        {t.gamesPage.gravityStep}
                      </button>
                    )}
                    <button type="button" onClick={reset} className={cn(BTN_BASE, BTN_NEUTRAL)}>
                      <RotateCcw className="h-3.5 w-3.5" />
                      {t.gamesPage.gravityReset}
                    </button>
                    <button type="button" onClick={clearTrails} className={cn(BTN_BASE, BTN_SKY)}>
                      <Sparkles className="h-3.5 w-3.5" />
                      {t.gamesPage.gravityClearTrails}
                    </button>
                    {mode === "sandbox" && (
                      <button type="button" onClick={clearAll} className={cn(BTN_BASE, BTN_DANGER)}>
                        <Trash2 className="h-3.5 w-3.5" />
                        {t.gamesPage.gravityClear}
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-1.5 px-2">
                  <span className="mr-1 text-[10px] font-extrabold uppercase tracking-wider text-white/40">{t.gamesPage.gravityOverlays}</span>
                  {OVERLAY_DEFS.map((o) => {
                    const active = overlays[o.key]
                    return (
                      <button
                        key={o.key}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setOverlays((prev) => ({ ...prev, [o.key]: !prev[o.key] }))}
                        className={cn("rounded-full px-2.5 py-1 text-[10px] font-bold transition", active ? "bg-avanza-teal text-[#0b0e1f]" : "bg-white/10 text-white/70 hover:bg-white/20")}
                      >
                        {t.gamesPage[o.label]}
                      </button>
                    )
                  })}
                </div>

                {mode === "sandbox" && (
                  <p className="mt-2 px-2 text-[11px] leading-tight text-white/35">{t.gamesPage.gravityKeysHint}</p>
                )}

                {mode === "sandbox" && (
                  <details open={showAdvanced} onToggle={(e) => setShowAdvanced((e.target as HTMLDetailsElement).open)} className="mt-3 px-2">
                    <summary className="cursor-pointer select-none text-[11px] font-extrabold uppercase tracking-wider text-white/50 transition hover:text-white/80">
                      {t.gamesPage.gravityAdvanced}
                    </summary>
                    <div className="mt-3 flex flex-col gap-3">
                      {/* Time scale */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/40">{t.gamesPage.gravityTimeScale}</span>
                        {([0.5, 1, 2] as const).map((s) => (
                          <button
                            key={s}
                            type="button"
                            aria-pressed={timeScale === s}
                            onClick={() => setTimeScale(s)}
                            className={cn("rounded-full px-3 py-1 text-[11px] font-bold transition", timeScale === s ? "bg-avanza-teal text-[#0b0e1f]" : "bg-white/10 text-white/75 hover:bg-white/20")}
                          >
                            {s === 0.5 ? t.gamesPage.gravitySlow : s === 1 ? t.gamesPage.gravityNormal : t.gamesPage.gravityFast}
                          </button>
                        ))}
                      </div>

                      {/* Comparison + save/load */}
                      <div className="flex flex-wrap items-center gap-2">
                        <button type="button" aria-pressed={compare} onClick={() => setCompare((v) => !v)} className={cn(BTN_BASE, compare ? BTN_PRIMARY : BTN_NEUTRAL)}>
                          <Orbit className="h-3.5 w-3.5" />
                          {t.gamesPage.gravityCompare}
                        </button>
                        <button type="button" onClick={saveSystem} className={cn(BTN_BASE, BTN_NEUTRAL)}>
                          <Save className="h-3.5 w-3.5" />
                          {t.gamesPage.gravitySave}
                        </button>
                        <button type="button" onClick={loadSystem} disabled={!savedExists} className={cn(BTN_BASE, BTN_NEUTRAL)}>
                          <FolderOpen className="h-3.5 w-3.5" />
                          {t.gamesPage.gravityLoad}
                        </button>
                      </div>

                      {/* Camera */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/40">{t.gamesPage.gravityCamera}</span>
                        <button type="button" onClick={() => zoomBy(1.2)} aria-label={t.gamesPage.gravityZoomIn} className={cn(BTN_BASE, BTN_NEUTRAL, "px-2.5")}>
                          <ZoomIn className="h-3.5 w-3.5" />
                        </button>
                        <button type="button" onClick={() => zoomBy(1 / 1.2)} aria-label={t.gamesPage.gravityZoomOut} className={cn(BTN_BASE, BTN_NEUTRAL, "px-2.5")}>
                          <ZoomOut className="h-3.5 w-3.5" />
                        </button>
                        <span className="font-mono text-[11px] text-white/60">{zoomPct}%</span>
                        <button type="button" aria-pressed={panMode} onClick={() => setPanMode((v) => !v)} className={cn(BTN_BASE, panMode ? BTN_PRIMARY : BTN_NEUTRAL)}>
                          <Move className="h-3.5 w-3.5" />
                          {t.gamesPage.gravityPan}
                        </button>
                        <button type="button" aria-pressed={follow} onClick={() => setFollow((v) => !v)} className={cn(BTN_BASE, follow ? BTN_PRIMARY : BTN_NEUTRAL)}>
                          <Crosshair className="h-3.5 w-3.5" />
                          {t.gamesPage.gravityFollow}
                        </button>
                        <button type="button" onClick={resetCamera} className={cn(BTN_BASE, BTN_NEUTRAL)}>
                          <RotateCcw className="h-3.5 w-3.5" />
                          {t.gamesPage.gravityResetView}
                        </button>
                      </div>
                    </div>
                  </details>
                )}
              </div>
            </div>

            {/* Side panel */}
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-2 rounded-[28px] bg-white/10 [transform:rotate(0.7deg)]" />
              <div className="relative flex h-full flex-col gap-4 rounded-3xl bg-white/8 p-7 text-white shadow-[0_28px_64px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/15 backdrop-blur-md">
                {mode === "challenge" && !inMission && (
                  <LevelSelect
                    c={c}
                    progress={progress}
                    levelText={levelText}
                    achText={achText}
                    completedCount={completedCount}
                    onStart={startLevel}
                  />
                )}

                {inMission && activeLevel != null && (
                  <MissionPanel
                    c={c}
                    lt={levelText(activeLevel)}
                    levelId={activeLevel}
                    hud={hud}
                    panelWhy={t.gamesPage[panelWhy]}
                    dotColor={KIND_DOT[feedbackKind]}
                    onBack={exitToMissions}
                  />
                )}

                {mode === "sandbox" && (
                  <>
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-white/55">
                        <span className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: KIND_DOT[feedbackKind] }} />
                        {t.gamesPage.gravityWhatsHappening}
                      </div>
                      <p className="mt-2 text-base font-semibold leading-snug text-white/90">{t.gamesPage[panelWhy]}</p>
                    </div>
                    {selected ? (
                      <ObjectInspector
                        info={selected}
                        bodyName={bodyName}
                        onDeselect={deselect}
                        compare={compare}
                        massRange={{ min: TOOL_DEFS[tool].min, max: TOOL_DEFS[tool].max }}
                        onRename={renameSelected}
                        onDelete={deleteSelected}
                        onAdjustMass={adjustSelectedMass}
                        onToggleTrail={toggleSelectedTrail}
                        onToggleLabel={toggleSelectedLabel}
                        onFocus={focusSelected}
                      />
                    ) : (
                      <div className="rounded-2xl bg-black/25 p-4 text-sm leading-relaxed text-white/75 ring-1 ring-white/10">
                        <p>{t.gamesPage.gravityWhyMutual}</p>
                        <p className="mt-2 text-white/60">{t.gamesPage.gravityRealScale}</p>
                        <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">{t.gamesPage.gravityClickHint}</p>
                      </div>
                    )}
                    <div className="mt-auto grid grid-cols-2 gap-3">
                      <Stat label={t.gamesPage.gravityBodies} value={String(bodyCount)} />
                      <Stat label={t.gamesPage.gravityStatus} value={paused ? t.gamesPage.gravityPaused : t.gamesPage.gravityRunning} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

type ChallengeStrings = ReturnType<typeof useLanguage>["t"]["gamesPage"]["gravityCh"]
type LevelStrings = { title: string; goal: string; teaches: string; win: string; fail: string; tip: string }

function LevelSelect({
  c,
  progress,
  levelText,
  achText,
  completedCount,
  onStart,
}: {
  c: ChallengeStrings
  progress: Progress
  levelText: (id: number) => LevelStrings
  achText: (key: string) => { name: string; desc: string }
  completedCount: number
  onStart: (id: number) => void
}) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <h3 className="text-2xl font-extrabold leading-tight">{c.missions}</h3>
        <p className="mt-1 text-sm leading-relaxed text-white/70">{c.selectPrompt}</p>
        <p className="mt-2 font-mono text-xs font-bold text-avanza-teal">
          {completedCount} / {LEVELS.length}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {LEVELS.map((l) => {
          const unlocked = progress.unlocked >= l.id
          const stars = progress.stars[l.id] || 0
          const lt = levelText(l.id)
          return (
            <button
              key={l.id}
              type="button"
              disabled={!unlocked}
              onClick={() => onStart(l.id)}
              className={cn(
                "flex flex-col gap-1 rounded-xl p-3 text-left ring-1 transition",
                unlocked ? "bg-white/8 ring-white/10 hover:bg-white/15" : "cursor-not-allowed bg-black/20 ring-white/5 opacity-60",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/45">{l.id}</span>
                {unlocked ? (
                  <span className="flex gap-0.5">
                    {[1, 2, 3].map((s) => (
                      <Star key={s} className={cn("h-3 w-3", s <= stars ? "fill-amber-300 text-amber-300" : "text-white/25")} />
                    ))}
                  </span>
                ) : (
                  <Lock className="h-3.5 w-3.5 text-white/40" />
                )}
              </div>
              <span className="text-sm font-bold leading-tight text-white">{unlocked ? lt.title : c.locked}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-white/50">
          <Award className="h-3.5 w-3.5" />
          {c.achievements}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {ACH_KEYS.map((a) => {
            const got = progress.ach.includes(a)
            return (
              <span
                key={a}
                title={achText(a).desc}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 transition",
                  got ? "bg-amber-300/20 text-amber-200 ring-amber-300/40" : "bg-white/5 text-white/35 ring-white/10",
                )}
              >
                {achText(a).name}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function MissionPanel({
  c,
  lt,
  levelId,
  hud,
  panelWhy,
  dotColor,
  onBack,
}: {
  c: ChallengeStrings
  lt: LevelStrings
  levelId: number
  hud: { pct: number; hold: number; target: number; attempts: number }
  panelWhy: string
  dotColor: string
  onBack: () => void
}) {
  const secLeft = Math.max(0, Math.ceil((hud.target - hud.hold) / 60))
  return (
    <div className="flex h-full flex-col gap-4">
      <button type="button" onClick={onBack} className="inline-flex w-fit items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 transition hover:bg-white/20">
        <ChevronLeft className="h-3.5 w-3.5" />
        {c.back}
      </button>

      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/45">
          {c.challenge} {levelId}
        </span>
        <h3 className="text-2xl font-extrabold leading-tight">{lt.title}</h3>
      </div>

      <div className="rounded-2xl bg-black/25 p-4 ring-1 ring-white/10">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-white/45">{c.goalLabel}</p>
        <p className="mt-1 text-sm font-semibold leading-snug text-white/90">{lt.goal}</p>
        <p className="mt-3 text-[10px] font-extrabold uppercase tracking-wider text-white/45">{c.teachesLabel}</p>
        <p className="mt-1 text-sm leading-snug text-white/70">{lt.teaches}</p>
      </div>

      <div>
        <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-white/50">
          <span>{c.hold}</span>
          <span className="font-mono text-white/80">{secLeft}s</span>
        </div>
        <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-avanza-teal transition-all" style={{ width: `${Math.round(hud.pct * 100)}%` }} />
        </div>
        <p className="mt-1.5 text-[11px] text-white/45">
          {c.attempts}: {hud.attempts}
        </p>
      </div>

      <div className="mt-auto rounded-2xl bg-black/25 p-4 ring-1 ring-white/10">
        <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-white/45">
          <span className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: dotColor }} />
          {lt.tip}
        </div>
        <p className="mt-2 text-sm leading-snug text-white/80">{panelWhy}</p>
      </div>
    </div>
  )
}

function StarRow({ count }: { count: number }) {
  return (
    <div className="mt-3 flex justify-center gap-1.5">
      {[1, 2, 3].map((s) => (
        <Star key={s} className={cn("h-7 w-7", s <= count ? "fill-amber-300 text-amber-300" : "text-white/25")} />
      ))}
    </div>
  )
}

function ObjectInspector({
  info,
  bodyName,
  onDeselect,
  compare,
  massRange,
  onRename,
  onDelete,
  onAdjustMass,
  onToggleTrail,
  onToggleLabel,
  onFocus,
}: {
  info: SelectedInfo
  bodyName: (planetNo: number) => string
  onDeselect: () => void
  compare: boolean
  massRange: { min: number; max: number }
  onRename: (name: string) => void
  onDelete: () => void
  onAdjustMass: (m: number) => void
  onToggleTrail: () => void
  onToggleLabel: () => void
  onFocus: () => void
}) {
  const { t } = useLanguage()
  const stabColor = STAB_COLOR[info.stabKey]
  const periodText = info.periodFrames != null ? `~${(info.periodFrames / 60).toFixed(1)}${t.gamesPage.gravityUnitSeconds}` : "—"
  const displayName = info.customName ?? bodyName(info.planetNo)
  const cmpText =
    compare && info.cmp
      ? (t.gamesPage[info.cmp.key as "gravityCmpWider"] as string).replace(
          "{p}",
          t.gamesPage.gravityCh.planets[info.cmp.planet as keyof typeof t.gamesPage.gravityCh.planets],
        )
      : null

  return (
    <div className="rounded-2xl bg-black/25 p-4 ring-1 ring-white/10">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/45">{t.gamesPage.gravityInspector}</span>
        <button type="button" onClick={onDeselect} aria-label={t.gamesPage.gravityDeselect} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold text-white/70 transition hover:bg-white/20">
          <X className="h-3 w-3" />
          {t.gamesPage.gravityDeselect}
        </button>
      </div>

      {/* Rename (uncontrolled; remounts when a different body is selected) */}
      <input
        key={info.id}
        type="text"
        defaultValue={displayName}
        onChange={(e) => onRename(e.target.value)}
        aria-label={t.gamesPage.gravityRename}
        className="mt-2 w-full rounded-lg bg-white/10 px-2.5 py-1.5 text-sm font-bold text-white outline-none ring-1 ring-white/10 transition focus:ring-avanza-teal/60"
      />

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <Row label={t.gamesPage.gravityInsType} value={t.gamesPage[info.typeKey]} />
        <Row label={t.gamesPage.gravityInsMass} value={String(Math.round(info.mass))} />
        <Row label={t.gamesPage.gravityInsSpeed} value={info.speed.toFixed(2)} />
        <Row label={t.gamesPage.gravityInsDistance} value={info.isStar ? "—" : String(Math.round(info.distance))} />
        <Row label={t.gamesPage.gravityInsStatus} value={t.gamesPage[info.statusKey]} valueColor={STAB_COLOR[info.statusKey]} />
        <Row label={t.gamesPage.gravityInsPeriod} value={periodText} />
      </dl>

      {/* Adjust mass */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-white/45">
          <span>{t.gamesPage.gravityInsMass}</span>
          <span className="font-mono text-white/70">{Math.round(info.mass)}</span>
        </div>
        <input type="range" min={massRange.min} max={massRange.max} value={Math.round(info.mass)} onChange={(e) => onAdjustMass(Number(e.target.value))} className={SLIDER_CLASS} />
      </div>

      {!info.isStar && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-white/45">
            <span>{t.gamesPage.gravityInsStability}</span>
            <span style={{ color: stabColor }}>{t.gamesPage[info.stabKey]}</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full transition-all" style={{ width: `${Math.round(Math.max(0.05, Math.min(1, info.score)) * 100)}%`, backgroundColor: stabColor }} />
          </div>
          {info.tipKey && <p className="mt-2 text-xs leading-snug text-white/70">{t.gamesPage[info.tipKey]}</p>}
        </div>
      )}

      {cmpText && <p className="mt-3 rounded-lg bg-avanza-teal/10 px-2.5 py-2 text-xs font-semibold leading-snug text-avanza-teal ring-1 ring-avanza-teal/20">{cmpText}</p>}

      {/* Actions */}
      <div className="mt-3 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
        <button type="button" onClick={onFocus} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white/75 transition hover:bg-white/20">
          <Crosshair className="h-3 w-3" />
          {t.gamesPage.gravityFocus}
        </button>
        <button type="button" onClick={onToggleTrail} className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold transition", info.noTrail ? "bg-white/10 text-white/50 hover:bg-white/20" : "bg-avanza-teal/20 text-avanza-teal hover:bg-avanza-teal/30")}>
          <Sparkles className="h-3 w-3" />
          {t.gamesPage.gravityInsTrail}
        </button>
        <button type="button" onClick={onToggleLabel} className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold transition", info.hideLabel ? "bg-white/10 text-white/50 hover:bg-white/20" : "bg-avanza-teal/20 text-avanza-teal hover:bg-avanza-teal/30")}>
          {t.gamesPage.gravityInsLabel}
        </button>
        {!info.isStar && (
          <button type="button" onClick={onDelete} className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2.5 py-1 text-[10px] font-bold text-red-200 ring-1 ring-red-400/25 transition hover:bg-red-500/25">
            <Trash2 className="h-3 w-3" />
            {t.gamesPage.gravityDelete}
          </button>
        )}
      </div>

      <p className="mt-3 border-t border-white/10 pt-2 text-xs leading-relaxed text-white/60">{t.gamesPage[info.realKey]}</p>
    </div>
  )
}

function Row({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-white/45">{label}</dt>
      <dd className="font-mono text-sm font-bold" style={{ color: valueColor ?? "#fff" }}>
        {value}
      </dd>
    </div>
  )
}

function drawArrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, width: number) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const len = Math.hypot(x2 - x1, y2 - y1)
  const head = Math.min(14, Math.max(7, len * 0.25))
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineCap = "round"
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  if (len < 6) return
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(x2, y2)
  ctx.lineTo(x2 - head * Math.cos(angle - 0.4), y2 - head * Math.sin(angle - 0.4))
  ctx.lineTo(x2 - head * Math.cos(angle + 0.4), y2 - head * Math.sin(angle + 0.4))
  ctx.closePath()
  ctx.fill()
  ctx.lineCap = "butt"
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className={cn("rounded-2xl bg-white/8 p-3 ring-1 ring-white/10")}>
      <dt className="text-[10px] font-extrabold uppercase tracking-wider text-white/60">{label}</dt>
      <dd className="mt-0.5 font-mono text-base font-extrabold text-white">{value}</dd>
    </div>
  )
}

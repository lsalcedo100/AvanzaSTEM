/**
 * Gravity Switch: Zero-G Lab — canvas viewport maths.
 *
 * The room is a fixed 960 × 540 px world. The canvas it is drawn on is
 * whatever width the layout gives it, on a screen with whatever pixel
 * density. A `Viewport` captures that mapping once per resize so the renderer
 * can draw in room units and pointer input can be converted back. Pure, so
 * the conversions are unit-tested without a DOM.
 */

import { ROOM_HEIGHT, ROOM_WIDTH } from "./gravity-switch-config.ts"
import type { Vec2 } from "./gravity-switch-types.ts"

export type Viewport = {
  /** CSS size of the canvas element. */
  cssWidth: number
  cssHeight: number
  /** Device pixel ratio actually used, clamped to a sane range. */
  dpr: number
  /** CSS px per room px. */
  scale: number
  /** Size of the canvas backing store, in device pixels. */
  backingWidth: number
  backingHeight: number
  roomWidth: number
  roomHeight: number
}

export const MIN_DPR = 1
/** Above this the backing store costs more than the extra sharpness is worth. */
export const MAX_DPR = 3

export function createViewport(
  cssWidth: number,
  devicePixelRatio: number,
  roomWidth = ROOM_WIDTH,
  roomHeight = ROOM_HEIGHT,
): Viewport {
  const width = Math.max(1, Number.isFinite(cssWidth) ? cssWidth : 1)
  const dpr = Math.min(MAX_DPR, Math.max(MIN_DPR, Number.isFinite(devicePixelRatio) ? devicePixelRatio : 1))
  const scale = width / roomWidth
  const cssHeight = roomHeight * scale
  return {
    cssWidth: width,
    cssHeight,
    dpr,
    scale,
    backingWidth: Math.round(width * dpr),
    backingHeight: Math.round(cssHeight * dpr),
    roomWidth,
    roomHeight,
  }
}

export function sameViewport(a: Viewport, b: Viewport): boolean {
  return (
    a.backingWidth === b.backingWidth &&
    a.backingHeight === b.backingHeight &&
    a.dpr === b.dpr &&
    a.cssWidth === b.cssWidth &&
    a.roomWidth === b.roomWidth &&
    a.roomHeight === b.roomHeight
  )
}

/** A point in CSS px measured from the canvas's top-left corner → room px. */
export function toRoom(viewport: Viewport, cssX: number, cssY: number): Vec2 {
  return { x: cssX / viewport.scale, y: cssY / viewport.scale }
}

/** Room px → CSS px from the canvas's top-left corner. */
export function toCss(viewport: Viewport, roomX: number, roomY: number): Vec2 {
  return { x: roomX * viewport.scale, y: roomY * viewport.scale }
}

/** True when a room-space point lies inside the room. */
export function insideRoom(viewport: Viewport, point: Vec2): boolean {
  return point.x >= 0 && point.y >= 0 && point.x <= viewport.roomWidth && point.y <= viewport.roomHeight
}

/** The 2D transform that lets a context draw in room px on this viewport. */
export function roomTransform(viewport: Viewport): [number, number, number, number, number, number] {
  const k = viewport.scale * viewport.dpr
  return [k, 0, 0, k, 0, 0]
}

export function applyViewport(ctx: CanvasRenderingContext2D, viewport: Viewport): void {
  const [a, b, c, d, e, f] = roomTransform(viewport)
  ctx.setTransform(a, b, c, d, e, f)
}

/**
 * Size the canvas's backing store and CSS box to the viewport. Returns true
 * when the backing store changed (which also clears the canvas).
 */
export function resizeCanvas(canvas: HTMLCanvasElement, viewport: Viewport): boolean {
  canvas.style.width = `${viewport.cssWidth}px`
  canvas.style.height = `${viewport.cssHeight}px`
  if (canvas.width === viewport.backingWidth && canvas.height === viewport.backingHeight) return false
  canvas.width = viewport.backingWidth
  canvas.height = viewport.backingHeight
  return true
}

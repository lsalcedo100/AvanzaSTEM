export type Vec = {
  x: number
  y: number
}

export type Rect = {
  x: number
  y: number
  width: number
  height: number
}

export type RotatedRect = Rect & {
  rotation?: number
}

export type ProjectileKind = "standard" | "heavy" | "light" | "bouncy"

export type ProjectileSpec = {
  label: string
  radius: number
  launchSpeedScale: number
  drag: number
  restitution: number
  maxBounces: number
  canBreakWeak: boolean
}

export type ProjectileState = {
  position: Vec
  velocity: Vec
  age: number
  bouncesUsed: number
  groundHits: number
}

export type SegmentCircleHit = {
  hit: boolean
  distance: number
  point: Vec
  t: number
}

export type SegmentRectHit = {
  hit: boolean
  point: Vec
  normal: Vec
  t: number
}

export const GRAVITY = 9.8

const EPSILON = 0.000001

export const PROJECTILE_SPECS: Record<ProjectileKind, ProjectileSpec> = {
  standard: {
    label: "Standard",
    radius: 1.05,
    launchSpeedScale: 1,
    drag: 0.006,
    restitution: 0,
    maxBounces: 0,
    canBreakWeak: false,
  },
  heavy: {
    label: "Heavy",
    radius: 1.25,
    launchSpeedScale: 0.82,
    drag: 0.003,
    restitution: 0,
    maxBounces: 0,
    canBreakWeak: true,
  },
  light: {
    label: "Light",
    radius: 0.85,
    launchSpeedScale: 1.18,
    drag: 0.011,
    restitution: 0,
    maxBounces: 0,
    canBreakWeak: false,
  },
  bouncy: {
    label: "Bouncy",
    radius: 1,
    launchSpeedScale: 0.96,
    drag: 0.007,
    restitution: 0.62,
    maxBounces: 1,
    canBreakWeak: false,
  },
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function add(a: Vec, b: Vec): Vec {
  return { x: a.x + b.x, y: a.y + b.y }
}

export function subtract(a: Vec, b: Vec): Vec {
  return { x: a.x - b.x, y: a.y - b.y }
}

export function multiply(v: Vec, scalar: number): Vec {
  return { x: v.x * scalar, y: v.y * scalar }
}

export function dot(a: Vec, b: Vec) {
  return a.x * b.x + a.y * b.y
}

export function length(v: Vec) {
  return Math.hypot(v.x, v.y)
}

export function distance(a: Vec, b: Vec) {
  return length(subtract(a, b))
}

export function normalize(v: Vec): Vec {
  const magnitude = length(v)
  if (magnitude < EPSILON) return { x: 0, y: 0 }
  return { x: v.x / magnitude, y: v.y / magnitude }
}

export function createProjectile(
  angleDeg: number,
  power: number,
  origin: Vec,
  launchSpeedScale = 1,
): ProjectileState {
  const radians = (angleDeg * Math.PI) / 180
  const launchSpeed = power * launchSpeedScale

  return {
    position: origin,
    velocity: {
      x: Math.cos(radians) * launchSpeed,
      y: Math.sin(radians) * launchSpeed,
    },
    age: 0,
    bouncesUsed: 0,
    groundHits: 0,
  }
}

export function integrateProjectile(
  projectile: ProjectileState,
  spec: ProjectileSpec,
  dt: number,
): ProjectileState {
  const ax = -projectile.velocity.x * spec.drag
  const ay = -GRAVITY - projectile.velocity.y * spec.drag * 0.35
  const velocity = {
    x: projectile.velocity.x + ax * dt,
    y: projectile.velocity.y + ay * dt,
  }

  return {
    position: {
      x: projectile.position.x + velocity.x * dt,
      y: projectile.position.y + velocity.y * dt,
    },
    velocity,
    age: projectile.age + dt,
    bouncesUsed: projectile.bouncesUsed,
    groundHits: projectile.groundHits,
  }
}

export function segmentCircleCollision(a: Vec, b: Vec, center: Vec, radius: number): SegmentCircleHit {
  const segment = subtract(b, a)
  const segmentLengthSq = dot(segment, segment)
  const rawT =
    segmentLengthSq <= EPSILON ? 0 : dot(subtract(center, a), segment) / segmentLengthSq
  const t = clamp(rawT, 0, 1)
  const point = add(a, multiply(segment, t))
  const minimumDistance = distance(point, center)

  return {
    hit: minimumDistance <= radius,
    distance: minimumDistance,
    point,
    t,
  }
}

export function segmentExpandedRectCollision(
  a: Vec,
  b: Vec,
  rect: Rect,
  radius: number,
): SegmentRectHit {
  const expanded = {
    minX: rect.x - radius,
    maxX: rect.x + rect.width + radius,
    minY: rect.y - radius,
    maxY: rect.y + rect.height + radius,
  }
  const direction = subtract(b, a)
  let tEnter = 0
  let tExit = 1
  let normal: Vec = { x: 0, y: 0 }

  const axes: Array<{
    origin: number
    direction: number
    min: number
    max: number
    lowNormal: Vec
    highNormal: Vec
  }> = [
    {
      origin: a.x,
      direction: direction.x,
      min: expanded.minX,
      max: expanded.maxX,
      lowNormal: { x: -1, y: 0 },
      highNormal: { x: 1, y: 0 },
    },
    {
      origin: a.y,
      direction: direction.y,
      min: expanded.minY,
      max: expanded.maxY,
      lowNormal: { x: 0, y: -1 },
      highNormal: { x: 0, y: 1 },
    },
  ]

  for (const axis of axes) {
    if (Math.abs(axis.direction) < EPSILON) {
      if (axis.origin < axis.min || axis.origin > axis.max) {
        return noRectHit(a)
      }
      continue
    }

    const inv = 1 / axis.direction
    let near = (axis.min - axis.origin) * inv
    let far = (axis.max - axis.origin) * inv
    let axisNormal = axis.lowNormal

    if (near > far) {
      const temp = near
      near = far
      far = temp
      axisNormal = axis.highNormal
    }

    if (near > tEnter) {
      tEnter = near
      normal = axisNormal
    }
    tExit = Math.min(tExit, far)

    if (tEnter > tExit) {
      return noRectHit(a)
    }
  }

  if (tExit < 0 || tEnter > 1) {
    return noRectHit(a)
  }

  const t = clamp(tEnter, 0, 1)
  return {
    hit: true,
    point: add(a, multiply(direction, t)),
    normal,
    t,
  }
}

export function segmentExpandedRotatedRectCollision(
  a: Vec,
  b: Vec,
  rect: RotatedRect,
  radius: number,
): SegmentRectHit {
  const rotation = rect.rotation ?? 0
  if (Math.abs(rotation) < EPSILON) {
    return segmentExpandedRectCollision(a, b, rect, radius)
  }

  const center = {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  }
  const localA = rotateAround(a, center, -rotation)
  const localB = rotateAround(b, center, -rotation)
  const hit = segmentExpandedRectCollision(localA, localB, rect, radius)

  if (!hit.hit) return hit

  return {
    ...hit,
    point: rotateAround(hit.point, center, rotation),
    normal: rotateVec(hit.normal, rotation),
  }
}

export function reflectVelocity(velocity: Vec, normal: Vec, restitution: number): Vec {
  const normalized = normalize(normal)
  const impact = dot(velocity, normalized)
  if (impact >= 0) return velocity

  const reflected = subtract(velocity, multiply(normalized, (1 + restitution) * impact))
  return {
    x: reflected.x * 0.9,
    y: reflected.y * 0.9,
  }
}

export function circleRectOverlap(center: Vec, radius: number, rect: Rect) {
  const closestX = clamp(center.x, rect.x, rect.x + rect.width)
  const closestY = clamp(center.y, rect.y, rect.y + rect.height)
  return distance(center, { x: closestX, y: closestY }) <= radius
}

function noRectHit(point: Vec): SegmentRectHit {
  return {
    hit: false,
    point,
    normal: { x: 0, y: 0 },
    t: Number.POSITIVE_INFINITY,
  }
}

function rotateAround(point: Vec, center: Vec, degrees: number): Vec {
  const translated = subtract(point, center)
  const rotated = rotateVec(translated, degrees)
  return add(center, rotated)
}

function rotateVec(vector: Vec, degrees: number): Vec {
  const radians = (degrees * Math.PI) / 180
  const cos = Math.cos(radians)
  const sin = Math.sin(radians)
  return {
    x: vector.x * cos - vector.y * sin,
    y: vector.x * sin + vector.y * cos,
  }
}

/**
 * Week 3 image-recognition lab — deterministic, framework-free engine.
 *
 * There is NO fake training, NO randomness, and NO network. Every image is a small
 * grayscale pixel grid GENERATED locally by a pure rasterizer (so "an image is
 * numbers" is literally true here); every feature is COMPUTED from those pixels;
 * and predictions come from a real nearest-neighbor classifier over the features.
 * The same data always produces the same result.
 *
 * This is intentionally the lightest possible approach (a local feature extractor +
 * k-NN, options 2–3 in the phase's preferred order): no GPU, WebGL, WASM, canvas,
 * web worker, or remote model. It therefore runs on the lowest-spec school device
 * and IS its own fallback — there is no heavier tier to degrade from.
 *
 * Assets: all illustrations are generated from the specs below; nothing is fetched
 * at runtime and no third-party image is used, so no external license applies.
 */

/* ========================================================================== */
/* Pixel grid + rasterizer                                                    */
/* ========================================================================== */

export const GRID_SIZE = 16 as const
export type Grid = number[] // length GRID_SIZE*GRID_SIZE, each value 0..1 (ink coverage)

export function gridAt(grid: Grid, row: number, col: number): number {
  return grid[row * GRID_SIZE + col] ?? 0
}

type Point = [number, number] // unit space, 0..1, y-down

type Primitive =
  | { kind: "disc"; cx: number; cy: number; r: number }
  | { kind: "ring"; cx: number; cy: number; r: number; thickness: number }
  | { kind: "rectFill"; x: number; y: number; w: number; h: number }
  | { kind: "rectOutline"; x: number; y: number; w: number; h: number; thickness: number }
  | { kind: "polyFill"; points: Point[] }
  | { kind: "polyOutline"; points: Point[]; thickness: number }
  | { kind: "line"; a: Point; b: Point; thickness: number }

/** A drawable illustration in unit space, with an optional global transform. */
export type ImageSpec = {
  draw: Primitive[]
  /** Occluders erase ink in IMAGE space (partial-obstruction edge cases). */
  occlude?: Primitive[]
  rotate?: number // radians, about the center
  scale?: number // about the center
  /** Deterministic background speckle density, 0..1 (unusual-background cases). */
  noise?: number
  /** Deterministic box-blur passes (blurred edge cases). */
  blur?: number
}

function distToSegment(px: number, py: number, [ax, ay]: Point, [bx, by]: Point): number {
  const dx = bx - ax
  const dy = by - ay
  const len2 = dx * dx + dy * dy || 1e-9
  let t = ((px - ax) * dx + (py - ay) * dy) / len2
  t = Math.max(0, Math.min(1, t))
  const cx = ax + t * dx
  const cy = ay + t * dy
  return Math.hypot(px - cx, py - cy)
}

function pointInPolygon(px: number, py: number, pts: Point[]): boolean {
  let inside = false
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i]
    const [xj, yj] = pts[j]
    const intersects = yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi + 1e-12) + xi
    if (intersects) inside = !inside
  }
  return inside
}

function inPrimitive(prim: Primitive, x: number, y: number): boolean {
  switch (prim.kind) {
    case "disc":
      return Math.hypot(x - prim.cx, y - prim.cy) <= prim.r
    case "ring":
      return Math.abs(Math.hypot(x - prim.cx, y - prim.cy) - prim.r) <= prim.thickness / 2
    case "rectFill":
      return x >= prim.x && x <= prim.x + prim.w && y >= prim.y && y <= prim.y + prim.h
    case "rectOutline": {
      const inside = x >= prim.x && x <= prim.x + prim.w && y >= prim.y && y <= prim.y + prim.h
      const innerX = prim.x + prim.thickness
      const innerY = prim.y + prim.thickness
      const innerInside = x >= innerX && x <= prim.x + prim.w - prim.thickness && y >= innerY && y <= prim.y + prim.h - prim.thickness
      return inside && !innerInside
    }
    case "polyFill":
      return pointInPolygon(x, y, prim.points)
    case "polyOutline": {
      const n = prim.points.length
      for (let i = 0; i < n; i++) {
        if (distToSegment(x, y, prim.points[i], prim.points[(i + 1) % n]) <= prim.thickness / 2) return true
      }
      return false
    }
    case "line":
      return distToSegment(x, y, prim.a, prim.b) <= prim.thickness / 2
  }
}

/** Rasterizes a spec to a grayscale grid using deterministic 2×2 supersampling. */
export function rasterize(spec: ImageSpec): Grid {
  const grid: Grid = new Array(GRID_SIZE * GRID_SIZE).fill(0)
  const rot = spec.rotate ?? 0
  const scale = spec.scale ?? 1
  const cos = Math.cos(-rot)
  const sin = Math.sin(-rot)
  const offsets = [0.25, 0.75]

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      let hits = 0
      for (const oy of offsets) {
        for (const ox of offsets) {
          const gx = (col + ox) / GRID_SIZE
          const gy = (row + oy) / GRID_SIZE
          // Inverse global transform (rotate + scale about center) into shape space.
          const sx = (gx - 0.5) / scale
          const sy = (gy - 0.5) / scale
          const rx = sx * cos - sy * sin + 0.5
          const ry = sx * sin + sy * cos + 0.5
          let ink = false
          for (const prim of spec.draw) {
            if (inPrimitive(prim, rx, ry)) {
              ink = true
              break
            }
          }
          // Occluders are tested in image space (they cover the picture, unrotated).
          if (ink && spec.occlude) {
            for (const occ of spec.occlude) if (inPrimitive(occ, gx, gy)) ink = false
          }
          if (ink) hits++
        }
      }
      grid[row * GRID_SIZE + col] = hits / 4
    }
  }

  // Deterministic background speckle (no Math.random).
  if (spec.noise && spec.noise > 0) {
    const density = Math.round(spec.noise * 100)
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === 0 && (i * 37 + 11) % 100 < density) grid[i] = 0.5
    }
  }

  // Deterministic box blur.
  for (let pass = 0; pass < (spec.blur ?? 0); pass++) {
    const copy = grid.slice()
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        let sum = 0
        let n = 0
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const r = row + dr
            const c = col + dc
            if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) continue
            sum += copy[r * GRID_SIZE + c]
            n++
          }
        }
        grid[row * GRID_SIZE + col] = sum / n
      }
    }
  }

  return grid
}

/* ========================================================================== */
/* Feature extraction (from pixels, not from the generating spec)             */
/* ========================================================================== */

export const FEATURE_NAMES = [
  "ink coverage",
  "shape width ÷ height",
  "fill inside its box",
  "top-heavy vs bottom-heavy",
  "left-heavy vs right-heavy",
  "top-left corner",
  "top-right corner",
  "bottom-left corner",
  "bottom-right corner",
  "left-right symmetry",
  "top-bottom symmetry",
  "edge (outline) amount",
  "diagonal (↘) ink",
  "diagonal (↗) ink",
  "center fill",
  "widest row band",
  "tallest column band",
] as const

export type FeatureVector = number[]

function density(grid: Grid, r0: number, r1: number, c0: number, c1: number): number {
  let sum = 0
  let n = 0
  for (let r = r0; r < r1; r++)
    for (let c = c0; c < c1; c++) {
      sum += gridAt(grid, r, c)
      n++
    }
  return n === 0 ? 0 : sum / n
}

/** Computes an explainable, normalized feature vector from a pixel grid. */
export function extractFeatures(grid: Grid): FeatureVector {
  const N = GRID_SIZE
  const inkRatio = density(grid, 0, N, 0, N)

  // Bounding box of ink (coverage > 0.25).
  let minR: number = N,
    maxR = -1,
    minC: number = N,
    maxC = -1,
    inkCells = 0
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++) {
      if (gridAt(grid, r, c) > 0.25) {
        inkCells++
        if (r < minR) minR = r
        if (r > maxR) maxR = r
        if (c < minC) minC = c
        if (c > maxC) maxC = c
      }
    }
  const bw = maxC >= minC ? maxC - minC + 1 : 1
  const bh = maxR >= minR ? maxR - minR + 1 : 1
  const aspect = bw / bh / 2 // ~0..1 after /2 for typical ranges
  const fill = inkCells / (bw * bh)

  const half = N / 2
  const top = density(grid, 0, half, 0, N)
  const bottom = density(grid, half, N, 0, N)
  const left = density(grid, 0, N, 0, half)
  const right = density(grid, 0, N, half, N)
  const topBottom = top + bottom === 0 ? 0.5 : top / (top + bottom)
  const leftRight = left + right === 0 ? 0.5 : left / (left + right)

  const q = N / 4
  const tl = density(grid, 0, half, 0, half)
  const tr = density(grid, 0, half, half, N)
  const bl = density(grid, half, N, 0, half)
  const br = density(grid, half, N, half, N)

  // Symmetry (1 = perfectly symmetric).
  let vsDiff = 0,
    hsDiff = 0
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++) {
      vsDiff += Math.abs(gridAt(grid, r, c) - gridAt(grid, r, N - 1 - c))
      hsDiff += Math.abs(gridAt(grid, r, c) - gridAt(grid, N - 1 - r, c))
    }
  const vSym = 1 - vsDiff / (N * N)
  const hSym = 1 - hsDiff / (N * N)

  // Edge amount: ink cells that touch a background cell.
  let edges = 0
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++) {
      if (gridAt(grid, r, c) <= 0.25) continue
      const neighbors = [
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1],
      ]
      if (neighbors.some(([nr, nc]) => nr < 0 || nr >= N || nc < 0 || nc >= N || gridAt(grid, nr, nc) <= 0.25)) edges++
    }
  const edgeDensity = inkCells === 0 ? 0 : edges / inkCells

  // Diagonal ink (main ↘ vs anti ↗).
  let mainDiag = 0,
    antiDiag = 0
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++) {
      const v = gridAt(grid, r, c)
      if (Math.abs(r - c) <= 1) mainDiag += v
      if (Math.abs(r - (N - 1 - c)) <= 1) antiDiag += v
    }
  mainDiag /= 3 * N
  antiDiag /= 3 * N

  const center = density(grid, q, N - q, q, N - q)

  // Widest contiguous row band and column band (bar detectors).
  let rowMax = 0,
    colMax = 0
  for (let r = 0; r < N; r++) rowMax = Math.max(rowMax, density(grid, r, r + 1, 0, N))
  for (let c = 0; c < N; c++) colMax = Math.max(colMax, density(grid, 0, N, c, c + 1))

  return [
    clamp01(inkRatio),
    clamp01(aspect),
    clamp01(fill),
    clamp01(topBottom),
    clamp01(leftRight),
    clamp01(tl),
    clamp01(tr),
    clamp01(bl),
    clamp01(br),
    clamp01(vSym),
    clamp01(hSym),
    clamp01(edgeDensity),
    clamp01(mainDiag),
    clamp01(antiDiag),
    clamp01(center),
    clamp01(rowMax),
    clamp01(colMax),
  ]
}

function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x))
}

/* ========================================================================== */
/* Image dataset (generated locally)                                          */
/* ========================================================================== */

export type TopicId = "shapes" | "school" | "recycling"

export type Topic = {
  id: TopicId
  name: string
  description: string
  /** Ordered category ids (also the confusion-matrix axis order). */
  categories: { id: string; name: string; definition: string }[]
  note?: string
}

export const TOPICS: Topic[] = [
  {
    id: "shapes",
    name: "Geometric shapes",
    description: "Simple outlines and solids: circles, triangles, and squares.",
    categories: [
      { id: "circle", name: "Circle", definition: "A round shape with no corners." },
      { id: "triangle", name: "Triangle", definition: "A shape with three straight sides and three corners." },
      { id: "square", name: "Square", definition: "A shape with four equal straight sides and four corners." },
    ],
  },
  {
    id: "school",
    name: "School supplies",
    description: "Everyday classroom items drawn as simple silhouettes.",
    categories: [
      { id: "writing", name: "Writing tool", definition: "Something you write or draw with, like a pencil — long and thin." },
      { id: "measuring", name: "Measuring tool", definition: "Something you measure with, like a ruler — a wide flat bar." },
      { id: "paper", name: "Paper", definition: "A sheet of paper — an upright rectangle." },
    ],
  },
  {
    id: "recycling",
    name: "Recycling items",
    description: "Illustrations of common recyclables. These are teaching pictures, not a guide to your local rules.",
    note: "Recycling rules differ by place. Do not treat these categories as universal instructions for what is actually recyclable where you live.",
    categories: [
      { id: "paper", name: "Paper", definition: "A flat paper item, like a sheet or card — an upright rectangle." },
      { id: "plastic", name: "Plastic", definition: "A plastic bottle — tall with a narrow neck at the top." },
      { id: "metal", name: "Metal", definition: "A metal can — a short rounded cylinder." },
    ],
  },
]

export function getTopic(id: string): Topic | undefined {
  return TOPICS.find((t) => t.id === id)
}

export type ImageRecord = {
  id: string
  topic: TopicId
  label: string // canonical category id
  spec: ImageSpec
  description: string
  tags: string[]
  split: "train" | "test"
}

/* --- generators -------------------------------------------------------- */

export function square(size: number, rotate: number): ImageSpec {
  const h = size / 2
  return {
    draw: [{ kind: "polyFill", points: [[0.5 - h, 0.5 - h], [0.5 + h, 0.5 - h], [0.5 + h, 0.5 + h], [0.5 - h, 0.5 + h]] }],
    rotate,
  }
}
export function triangle(size: number, rotate: number): ImageSpec {
  const h = size / 2
  return {
    draw: [{ kind: "polyFill", points: [[0.5, 0.5 - h], [0.5 + h, 0.5 + h], [0.5 - h, 0.5 + h]] }],
    rotate,
  }
}
export function circle(size: number): ImageSpec {
  return { draw: [{ kind: "disc", cx: 0.5, cy: 0.5, r: size / 2 }] }
}

function pencil(rotate: number): ImageSpec {
  return { draw: [{ kind: "line", a: [0.24, 0.76], b: [0.76, 0.24], thickness: 0.13 }], rotate }
}
function ruler(): ImageSpec {
  const ticks: Primitive[] = [0.28, 0.4, 0.5, 0.6, 0.72].map((x) => ({ kind: "line", a: [x, 0.44], b: [x, 0.5], thickness: 0.03 }))
  return { draw: [{ kind: "rectFill", x: 0.14, y: 0.43, w: 0.72, h: 0.14 }, ...ticks] }
}
function sheet(lines: boolean): ImageSpec {
  const stripes: Primitive[] = lines
    ? [0.34, 0.46, 0.58, 0.7].map((y) => ({ kind: "line", a: [0.36, y], b: [0.64, y], thickness: 0.02 }))
    : []
  return { draw: [{ kind: "rectFill", x: 0.33, y: 0.17, w: 0.34, h: 0.66 }, ...stripes] }
}
function bottle(): ImageSpec {
  return {
    draw: [
      { kind: "rectFill", x: 0.37, y: 0.4, w: 0.26, h: 0.45 }, // body
      { kind: "rectFill", x: 0.45, y: 0.22, w: 0.1, h: 0.18 }, // neck
      { kind: "rectFill", x: 0.43, y: 0.15, w: 0.14, h: 0.07 }, // cap
    ],
  }
}
function can(): ImageSpec {
  return {
    draw: [
      { kind: "rectFill", x: 0.31, y: 0.36, w: 0.38, h: 0.34 }, // body
      { kind: "disc", cx: 0.5, cy: 0.36, r: 0.19 }, // rounded top rim
    ],
  }
}

function rec(
  id: string,
  topic: TopicId,
  label: string,
  spec: ImageSpec,
  description: string,
  split: "train" | "test",
  tags: string[] = [],
): ImageRecord {
  return { id, topic, label, spec, description, tags, split }
}

/** Builds a topic's training + test images with controlled variation. */
function buildShapes(): ImageRecord[] {
  const out: ImageRecord[] = []
  // Training (indices 0–2) spans the wider rotations; testing (3–4) stays inside
  // that range so the base model generalizes. Extreme rotations live in EDGE_CASES.
  const rots = [0, 0.22, -0.22, 0.1, -0.1]
  const sizes = [0.5, 0.44, 0.56, 0.48, 0.52]
  // circles
  sizes.forEach((s, i) =>
    out.push(rec(`sh-circle-${i + 1}`, "shapes", "circle", circle(s), `A solid circle, ${i % 2 ? "smaller" : "medium"} size, centered.`, i < 3 ? "train" : "test", i === 1 ? ["small"] : [])),
  )
  rots.forEach((r, i) =>
    out.push(rec(`sh-tri-${i + 1}`, "shapes", "triangle", triangle(sizes[i], r), `A solid triangle rotated ${Math.round((r * 180) / Math.PI)} degrees.`, i < 3 ? "train" : "test", r !== 0 ? ["rotated"] : [])),
  )
  rots.forEach((r, i) =>
    out.push(rec(`sh-sq-${i + 1}`, "shapes", "square", square(sizes[i], r), `A solid square rotated ${Math.round((r * 180) / Math.PI)} degrees.`, i < 3 ? "train" : "test", r !== 0 ? ["rotated"] : [])),
  )
  return out
}

function buildSchool(): ImageRecord[] {
  const out: ImageRecord[] = []
  const pRot = [0, 0.1, -0.1, 0.2, -0.15]
  pRot.forEach((r, i) => out.push(rec(`sc-pen-${i + 1}`, "school", "writing", pencil(r), "A thin pencil drawn as a diagonal line.", i < 3 ? "train" : "test", r !== 0 ? ["rotated"] : [])))
  for (let i = 0; i < 5; i++) out.push(rec(`sc-rul-${i + 1}`, "school", "measuring", { ...ruler(), scale: 1 - i * 0.05 }, "A ruler drawn as a wide flat bar with tick marks.", i < 3 ? "train" : "test", []))
  for (let i = 0; i < 5; i++) out.push(rec(`sc-pap-${i + 1}`, "school", "paper", { ...sheet(true), scale: 1 - i * 0.05 }, "A sheet of paper drawn as an upright rectangle with lines.", i < 3 ? "train" : "test", []))
  return out
}

function buildRecycling(): ImageRecord[] {
  const out: ImageRecord[] = []
  for (let i = 0; i < 5; i++) out.push(rec(`re-pap-${i + 1}`, "recycling", "paper", { ...sheet(false), scale: 1 - i * 0.05 }, "A flat paper item drawn as an upright rectangle.", i < 3 ? "train" : "test", []))
  for (let i = 0; i < 5; i++) out.push(rec(`re-pla-${i + 1}`, "recycling", "plastic", { ...bottle(), scale: 1 - i * 0.04 }, "A plastic bottle drawn tall with a narrow neck.", i < 3 ? "train" : "test", []))
  for (let i = 0; i < 5; i++) out.push(rec(`re-met-${i + 1}`, "recycling", "metal", { ...can(), scale: 1 - i * 0.04 }, "A metal can drawn as a short rounded cylinder.", i < 3 ? "train" : "test", []))
  return out
}

export const IMAGES: ImageRecord[] = [...buildShapes(), ...buildSchool(), ...buildRecycling()]

export function topicImages(topic: TopicId): ImageRecord[] {
  return IMAGES.filter((im) => im.topic === topic)
}
export function trainingPool(topic: TopicId): ImageRecord[] {
  return topicImages(topic).filter((im) => im.split === "train")
}
export function testSet(topic: TopicId): ImageRecord[] {
  return topicImages(topic).filter((im) => im.split === "test")
}
export function getImage(id: string): ImageRecord | undefined {
  return IMAGES.find((im) => im.id === id)
}

/* ========================================================================== */
/* Edge cases — "Confuse the Model" challenges                                */
/* ========================================================================== */

export type EdgeCase = {
  id: string
  topic: TopicId
  label: string
  spec: ImageSpec
  description: string
  tag: string
  /** Why this image tends to confuse a simple classifier. */
  why: string
}

export const EDGE_CASES: EdgeCase[] = [
  { id: "ec-tri-rot", topic: "shapes", label: "square", spec: square(0.5, Math.PI / 4), description: "A square rotated 45 degrees, so it looks like a diamond.", tag: "rotated", why: "Rotated 45°, a square sits like a diamond; its corners no longer fill the picture's corners, so it can look more like a circle or triangle to the model." },
  { id: "ec-circ-occ", topic: "shapes", label: "circle", spec: { ...circle(0.56), occlude: [{ kind: "rectFill", x: 0.5, y: 0, w: 0.5, h: 1 }] }, description: "A circle with its right half hidden behind a block.", tag: "obstructed", why: "Half the circle is covered, so the model sees a half-moon and may match it to a different shape." },
  { id: "ec-sq-noise", topic: "shapes", label: "square", spec: { ...square(0.46, 0), noise: 0.18 }, description: "A square on a noisy, speckled background.", tag: "unusual background", why: "Background speckles add stray ink the model may read as part of the shape." },
  { id: "ec-tri-blur", topic: "shapes", label: "triangle", spec: { ...triangle(0.52, 0), blur: 2 }, description: "A blurred triangle with soft, fuzzy edges.", tag: "blurred", why: "Blurring softens the sharp corners a triangle is known by, weakening the strongest clue." },
  { id: "ec-circ-small", topic: "shapes", label: "circle", spec: circle(0.2), description: "A very small circle in the middle of the picture.", tag: "very small", why: "A tiny shape leaves most of the picture empty, so the model has little ink to judge." },
  { id: "ec-pen-thick", topic: "school", label: "writing", spec: { draw: [{ kind: "line", a: [0.22, 0.78], b: [0.78, 0.22], thickness: 0.26 }] }, description: "A very thick pencil that looks more like a bar.", tag: "shared features", why: "Drawn thick, a pencil starts to look like a ruler — the two categories share the 'long bar' feature." },
  { id: "ec-mixed", topic: "shapes", label: "square", spec: { draw: [{ kind: "polyFill", points: [[0.28, 0.3], [0.62, 0.3], [0.62, 0.64], [0.28, 0.64]] }, { kind: "disc", cx: 0.68, cy: 0.66, r: 0.14 }] }, description: "A square with a small circle overlapping one corner.", tag: "mixed category", why: "Two shapes appear at once, so the model must pick one label for a picture that honestly contains two." },
]

export function edgeCasesForTopic(topic: TopicId): EdgeCase[] {
  return EDGE_CASES.filter((e) => e.topic === topic)
}

/* ========================================================================== */
/* Classifier — nearest neighbors over features, with similarity confidence   */
/* ========================================================================== */

/** Precompute a record's feature vector (deterministic; safe to memoize). */
const FEATURE_CACHE = new Map<string, FeatureVector>()
export function featuresFor(im: { id: string; spec: ImageSpec }): FeatureVector {
  const cached = FEATURE_CACHE.get(im.id)
  if (cached) return cached
  const f = extractFeatures(rasterize(im.spec))
  FEATURE_CACHE.set(im.id, f)
  return f
}

export function euclidean(a: FeatureVector, b: FeatureVector): number {
  let s = 0
  for (let i = 0; i < a.length; i++) s += (a[i] - b[i]) ** 2
  return Math.sqrt(s)
}

/** Similarity in (0,1]: 1 = identical features. A documented transform of distance. */
export function similarity(a: FeatureVector, b: FeatureVector): number {
  return 1 / (1 + euclidean(a, b))
}

export type NeighborMatch = { image: ImageRecord; distance: number; similarity: number; label: string }

export type ClassifyResult = {
  predicted: string
  /** Confidence in (0,1]: the predicted category's share of neighbor similarity. */
  confidence: number
  neighbors: NeighborMatch[]
  /** Similarity mass per category (for the confidence explanation). */
  scores: Record<string, number>
}

/**
 * k-NN classification. Confidence is the fraction of the k neighbors' total
 * similarity that belongs to the winning category — a real number from the model,
 * never an arbitrary value. Deterministic: neighbor ties break by image id.
 */
export function classify(training: ImageRecord[], targetFeatures: FeatureVector, k = 3): ClassifyResult {
  const kk = Math.max(1, Math.min(k, training.length))
  const neighbors: NeighborMatch[] = training
    .map((im) => {
      const d = euclidean(featuresFor(im), targetFeatures)
      return { image: im, distance: d, similarity: 1 / (1 + d), label: im.label }
    })
    .sort((a, b) => a.distance - b.distance || a.image.id.localeCompare(b.image.id))
    .slice(0, kk)

  const scores: Record<string, number> = {}
  let totalSim = 0
  for (const n of neighbors) {
    scores[n.label] = (scores[n.label] ?? 0) + n.similarity
    totalSim += n.similarity
  }
  let predicted = neighbors[0]?.label ?? ""
  let best = -1
  for (const [label, s] of Object.entries(scores)) {
    if (s > best || (s === best && label < predicted)) {
      best = s
      predicted = label
    }
  }
  const confidence = totalSim === 0 ? 0 : (scores[predicted] ?? 0) / totalSim
  return { predicted, confidence, neighbors, scores }
}

export function classifyImage(training: ImageRecord[], target: ImageRecord, k = 3): ClassifyResult {
  return classify(training, featuresFor(target), k)
}

/** Human explanation of what the model matched. */
export function explainResult(topic: Topic, result: ClassifyResult): string {
  const names = result.neighbors.map((n) => `${categoryName(topic, n.label)} (${Math.round(n.similarity * 100)}% similar)`).join(", ")
  return `The closest training pictures were: ${names}. The model added up the similarities and chose ${categoryName(topic, result.predicted)}, giving it ${Math.round(
    result.confidence * 100,
  )}% confidence. Confidence compares the categories to each other — it is not a promise the answer is right.`
}

export function categoryName(topic: Topic, id: string): string {
  return topic.categories.find((c) => c.id === id)?.name ?? id
}

/* ========================================================================== */
/* Evaluation — accuracy, per-category, confusion matrix, FP/FN               */
/* ========================================================================== */

export type Evaluation = {
  results: {
    image: ImageRecord
    predicted: string
    actual: string
    correct: boolean
    confidence: number
    result: ClassifyResult
  }[]
  correct: number
  total: number
  accuracy: number
  perCategory: Record<string, { correct: number; total: number }>
  /** matrix[actualIndex][predictedIndex] over topic.categories order. */
  matrix: number[][]
}

export function evaluate(topic: Topic, training: ImageRecord[], test: ImageRecord[], k = 3): Evaluation {
  const cats = topic.categories.map((c) => c.id)
  const perCategory: Record<string, { correct: number; total: number }> = {}
  for (const c of cats) perCategory[c] = { correct: 0, total: 0 }
  const matrix = cats.map(() => cats.map(() => 0))

  const results = test.map((image) => {
    const result = classify(training, featuresFor(image), k)
    const predicted = result.predicted
    const actual = image.label
    const correct = predicted === actual
    perCategory[actual].total++
    if (correct) perCategory[actual].correct++
    const ai = cats.indexOf(actual)
    const pi = cats.indexOf(predicted)
    if (ai >= 0 && pi >= 0) matrix[ai][pi]++
    return { image, predicted, actual, correct, confidence: result.confidence, result }
  })

  const correct = results.filter((r) => r.correct).length
  return { results, correct, total: results.length, accuracy: results.length === 0 ? 0 : correct / results.length, perCategory, matrix }
}

/** Binary false-positive / false-negative labeling relative to a focus category. */
export type BinaryOutcome = "true-positive" | "true-negative" | "false-positive" | "false-negative"

export function binaryOutcome(actual: string, predicted: string, focus: string): BinaryOutcome {
  const a = actual === focus
  const p = predicted === focus
  if (a && p) return "true-positive"
  if (!a && !p) return "true-negative"
  if (!a && p) return "false-positive"
  return "false-negative"
}

export function accuracyPercent(evaluation: Evaluation): number {
  return Math.round(evaluation.accuracy * 100)
}

export function validateTraining(topic: Topic, training: ImageRecord[], test: ImageRecord[]): { errors: string[]; warnings: string[]; ok: boolean } {
  const errors: string[] = []
  const warnings: string[] = []
  const counts = topic.categories.map((c) => training.filter((im) => im.label === c.id).length)
  const empties = topic.categories.filter((c, i) => counts[i] === 0)
  for (const c of empties) errors.push(`“${c.name}” has no training pictures. The model can never predict it.`)
  if (training.length > 0) {
    const max = Math.max(...counts)
    const min = Math.min(...counts.filter((_, i) => counts[i] > 0))
    if (max >= 3 * min) warnings.push("The categories are very unbalanced. The model will favor the category with the most pictures.")
  }
  if (training.length < topic.categories.length * 2) warnings.push("Very few training pictures — results may be unreliable. Add a couple more per category.")
  const trainIds = new Set(training.map((im) => im.id))
  const overlap = test.filter((im) => trainIds.has(im.id))
  if (overlap.length > 0) errors.push(`${overlap.length} test picture(s) are also in training — testing on training pictures is not a fair check.`)
  return { errors, warnings, ok: errors.length === 0 }
}

/* ========================================================================== */
/* First-vs-improved comparison                                               */
/* ========================================================================== */

export type ComparisonResult = {
  first: Evaluation
  improved: Evaluation
  /** Test image ids that were wrong before and right after. */
  fixed: string[]
  /** Test image ids that were right before and wrong after. */
  broke: string[]
  overallDelta: number
}

export function compareModels(topic: Topic, firstTraining: ImageRecord[], improvedTraining: ImageRecord[], test: ImageRecord[], k = 3): ComparisonResult {
  const first = evaluate(topic, firstTraining, test, k)
  const improved = evaluate(topic, improvedTraining, test, k)
  const firstMap = new Map(first.results.map((r) => [r.image.id, r.correct]))
  const fixed: string[] = []
  const broke: string[] = []
  for (const r of improved.results) {
    const was = firstMap.get(r.image.id)
    if (was === false && r.correct) fixed.push(r.image.id)
    if (was === true && !r.correct) broke.push(r.image.id)
  }
  return { first, improved, fixed, broke, overallDelta: improved.accuracy - first.accuracy }
}

"use client"

import { useEffect, useRef, useState } from "react"
import { Upload } from "lucide-react"
import {
  TOPICS,
  trainingPool,
  testSet,
  featuresFor,
  classify,
  classifyImage,
  explainResult,
  extractFeatures,
  categoryName,
  FEATURE_NAMES,
  GRID_SIZE,
  EDGE_CASES,
  type ImageRecord,
  type Grid,
  type ClassifyResult,
} from "@/features/curriculums/intro-to-ai-week3-images"
import type { ActivityComponentProps } from "@/components/pages/intro-to-ai/activity-registry"
import { ActivityFrame } from "@/components/pages/intro-to-ai/activity-frame"
import { ConfidenceBars, PixelImage, ResultBadge } from "@/components/pages/intro-to-ai/activities/image-shared"

const TOPIC = TOPICS[0] // shapes — the clearest for a first walkthrough
const TRAIN = trainingPool(TOPIC.id)
const CHOICES = testSet(TOPIC.id)
// A deliberately confident-but-wrong demo: a 45° square that reads as another shape.
const CONFIDENT_WRONG = EDGE_CASES.find((e) => e.id === "ec-tri-rot")!

/** The few features most useful to name in plain language during the walkthrough. */
const HIGHLIGHT_FEATURES = [0, 2, 5, 9, 11] // ink, fill, top-left corner, symmetry, edges

export function ClassifierWalkthroughActivity({ activity, progress }: ActivityComponentProps) {
  const [selectedId, setSelectedId] = useState<string>(CHOICES[0].id)
  const announceRef = useRef<HTMLParagraphElement>(null)

  const selected = CHOICES.find((im) => im.id === selectedId) ?? CHOICES[0]
  const features = featuresFor(selected)
  const result = classifyImage(TRAIN, selected, 3)

  const announce = (msg: string) => {
    if (announceRef.current) announceRef.current.textContent = msg
  }

  return (
    <ActivityFrame
      title={activity.title}
      purpose={activity.goal}
      instructions={[
        "Pick a picture. See it the way a computer does — a grid of numbered pixels.",
        "Look at the visual features the model measured, then its prediction and confidence.",
        "Notice that confidence compares the categories; it is not a promise the answer is right.",
      ]}
      status="ready"
      saveStatus={progress.saveStatus}
    >
      <p ref={announceRef} className="sr-only" role="status" aria-live="polite" />

      {/* Picker */}
      <fieldset className="mt-4">
        <legend className="text-sm font-bold text-foreground">1 · Choose a picture</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {CHOICES.map((im) => (
            <button
              key={im.id}
              type="button"
              aria-pressed={im.id === selectedId}
              onClick={() => {
                setSelectedId(im.id)
                announce(`Selected ${categoryName(TOPIC, im.label)} picture.`)
              }}
              className={`rounded-md border p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 ${
                im.id === selectedId ? "border-avanza-green ring-1 ring-avanza-green" : "border-border hover:border-avanza-green/60"
              }`}
            >
              <PixelImage spec={im.spec} alt={im.description} size={56} />
            </button>
          ))}
        </div>
      </fieldset>

      {/* Pixels + features */}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold text-foreground">2 · A picture is a grid of pixels</p>
          <div className="mt-2 flex items-start gap-3">
            <PixelImage spec={selected.spec} alt={selected.description} size={128} />
            <p className="text-sm text-muted-foreground">
              {selected.description} The computer stores this {GRID_SIZE}×{GRID_SIZE} grid as {GRID_SIZE * GRID_SIZE} numbers — one brightness value per pixel.
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">3 · Features measured from the pixels</p>
          <ul className="mt-2 space-y-1 text-sm">
            {HIGHLIGHT_FEATURES.map((fi) => (
              <li key={fi} className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">{FEATURE_NAMES[fi]}</span>
                <span className="tabular-nums text-foreground">{Math.round(features[fi] * 100)}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Prediction + confidence */}
      <div className="mt-6 rounded-md border border-border bg-card p-4">
        <p className="text-sm font-bold text-foreground">4 · Prediction and confidence</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
          <span>
            Predicted: <span className="font-semibold text-foreground">{categoryName(TOPIC, result.predicted)}</span>
          </span>
          <span>
            Actual: <span className="font-semibold text-foreground">{categoryName(TOPIC, selected.label)}</span>
          </span>
          <ResultBadge correct={result.predicted === selected.label} />
        </div>
        <div className="mt-3">
          <ConfidenceBars topic={TOPIC} result={result} />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{explainResult(TOPIC, result)}</p>
      </div>

      {/* Confident-but-wrong demo */}
      <ConfidentWrong />

      {/* Optional upload */}
      <OptionalImageUpload />
    </ActivityFrame>
  )
}

function ConfidentWrong() {
  const result = classify(TRAIN, featuresFor(CONFIDENT_WRONG), 3)
  const pct = Math.round(result.confidence * 100)
  const wrong = result.predicted !== CONFIDENT_WRONG.label
  return (
    <div className="mt-6 rounded-md border-l-2 border-avanza-orange/60 bg-avanza-orange/5 p-4">
      <p className="text-sm font-bold text-avanza-orange-dark">Confidence is not certainty</p>
      <div className="mt-2 flex items-start gap-3">
        <PixelImage spec={CONFIDENT_WRONG.spec} alt={CONFIDENT_WRONG.description} size={96} />
        <div className="text-sm text-muted-foreground">
          <p>{CONFIDENT_WRONG.description}</p>
          <p className="mt-1">
            The real answer is <span className="font-semibold text-foreground">{categoryName(TOPICS[0], CONFIDENT_WRONG.label)}</span>, but the model predicts{" "}
            <span className="font-semibold text-foreground">{categoryName(TOPICS[0], result.predicted)}</span> with {pct}% confidence.{" "}
            {wrong ? "A model can be confident and still wrong — high confidence only means the categories looked lopsided to the model, not that it is correct." : ""}
          </p>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Optional local image upload — private, on-device only                       */
/* -------------------------------------------------------------------------- */

function canvasSupported(): boolean {
  if (typeof document === "undefined") return false
  try {
    return !!document.createElement("canvas").getContext("2d")
  } catch {
    return false
  }
}

/** Downscales an uploaded image to the grid on the device (which also strips
 *  metadata). Never stores or transmits the image; nothing is sent to any service. */
async function fileToGrid(file: File): Promise<Grid> {
  const url = URL.createObjectURL(file)
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image()
      el.onload = () => resolve(el)
      el.onerror = () => reject(new Error("Could not read that image."))
      el.src = url
    })
    const canvas = document.createElement("canvas")
    canvas.width = GRID_SIZE
    canvas.height = GRID_SIZE
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Canvas is not available.")
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, GRID_SIZE, GRID_SIZE)
    ctx.drawImage(img, 0, 0, GRID_SIZE, GRID_SIZE)
    const { data } = ctx.getImageData(0, 0, GRID_SIZE, GRID_SIZE)
    const grid: Grid = new Array(GRID_SIZE * GRID_SIZE)
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      const r = data[i * 4]
      const g = data[i * 4 + 1]
      const b = data[i * 4 + 2]
      const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255
      grid[i] = Math.max(0, Math.min(1, 1 - luma)) // dark pixels = ink
    }
    return grid
  } finally {
    URL.revokeObjectURL(url)
  }
}

function OptionalImageUpload() {
  const [open, setOpen] = useState(false)
  const [supported, setSupported] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [grid, setGrid] = useState<Grid | null>(null)
  const [result, setResult] = useState<ClassifyResult | null>(null)

  useEffect(() => setSupported(canvasSupported()), [])

  const onFile = async (file: File | undefined) => {
    setError(null)
    setResult(null)
    setGrid(null)
    if (!file) return
    if (!file.type.startsWith("image/")) return setError("Please choose an image file.")
    if (file.size > 5_000_000) return setError("That image is larger than 5 MB. Please choose a smaller one.")
    try {
      const g = await fileToGrid(file)
      setGrid(g)
      setResult(classify(TRAIN, extractFeatures(g), 3))
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong reading that image.")
    }
  }

  return (
    <div className="mt-6 rounded-md border border-dashed border-border p-4">
      <p className="text-sm font-bold text-foreground">Optional: try your own picture</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Everything above works with the built-in pictures — this is an extra. If you upload a picture, it is shrunk to a {GRID_SIZE}×{GRID_SIZE} grid and
        classified <strong>entirely on your device</strong>. It is never saved and never sent to any service. Draw a big circle, triangle, or square on white
        paper for the best result.
      </p>
      {!supported ? (
        <p className="mt-2 text-sm text-avanza-orange-dark">Your browser can&apos;t process images here, but the built-in walkthrough above works fully.</p>
      ) : !open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
        >
          <Upload className="h-4 w-4" aria-hidden /> Turn on optional upload
        </button>
      ) : (
        <div className="mt-3">
          <label className="inline-flex items-center gap-2 text-sm">
            <span className="rounded-md bg-avanza-green px-3 py-1.5 font-bold text-avanza-dark">Choose an image…</span>
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
          {error && <p className="mt-2 text-sm text-avanza-orange-dark" role="alert">{error}</p>}
          {grid && result && (
            <div className="mt-3 flex flex-wrap items-start gap-4" aria-live="polite">
              <UploadedGrid grid={grid} />
              <div className="text-sm">
                <p>
                  Predicted: <span className="font-semibold text-foreground">{categoryName(TOPIC, result.predicted)}</span> ·{" "}
                  {Math.round(result.confidence * 100)}% confidence
                </p>
                <p className="mt-1 text-muted-foreground">The same simple model that runs on the built-in pictures — no camera required, nothing stored.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/** Renders an arbitrary grid (from an upload) as pixels. */
function UploadedGrid({ grid }: { grid: Grid }) {
  const size = 96
  return (
    <svg width={size} height={size} viewBox={`0 0 ${GRID_SIZE} ${GRID_SIZE}`} role="img" aria-label="Your uploaded picture shrunk to a pixel grid" className="rounded-sm border border-border bg-white" shapeRendering="crispEdges">
      <rect x={0} y={0} width={GRID_SIZE} height={GRID_SIZE} fill="#fff" />
      {grid.map((v, i) => {
        if (v <= 0.05) return null
        const shade = Math.round(255 * (1 - v))
        return <rect key={i} x={i % GRID_SIZE} y={Math.floor(i / GRID_SIZE)} width={1.02} height={1.02} fill={`rgb(${shade},${shade},${shade})`} />
      })}
    </svg>
  )
}

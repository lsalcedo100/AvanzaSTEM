"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Check, Circle, X } from "lucide-react"
import { MathLessonVisit } from "@/components/pages/math-adventures-progress-ui"
import { useMathProgress } from "@/components/ui/useMathProgress"
import {
  getPreviousMathLesson,
  mathAdventuresPath,
  mathLessonPath,
  type MathLesson,
} from "@/features/curriculums/math-adventures"

/* -------------------------------------------------------------------------- */
/* Planner configuration                                                      */
/* -------------------------------------------------------------------------- */

const COLS = 6
const ROWS = 5
const GRID_SIZE = COLS * ROWS
const BUDGET = 50
const STORAGE_KEY = "avanza-math-city-project-v1"

type Shape = "rectangle" | "square" | "circle" | "triangle" | "hexagon" | "path"
type Category = "building" | "park" | "road"

type CityItem = {
  id: string
  name: string
  abbr: string
  /** Cost per grid square placed. */
  cost: number
  shape: Shape
  category: Category
  tint: string
}

const ITEMS: CityItem[] = [
  { id: "school", name: "School", abbr: "Sch", cost: 8, shape: "rectangle", category: "building", tint: "bg-avanza-teal/15 text-avanza-teal-dark" },
  { id: "store", name: "Store", abbr: "Sto", cost: 5, shape: "rectangle", category: "building", tint: "bg-avanza-orange/15 text-avanza-orange-dark" },
  { id: "house", name: "House", abbr: "Hse", cost: 3, shape: "square", category: "building", tint: "bg-avanza-purple/15 text-avanza-purple-dark" },
  { id: "library", name: "Library", abbr: "Lib", cost: 7, shape: "hexagon", category: "building", tint: "bg-avanza-teal/15 text-avanza-teal-dark" },
  { id: "playground", name: "Playground", abbr: "Play", cost: 4, shape: "circle", category: "building", tint: "bg-avanza-purple/15 text-avanza-purple-dark" },
  { id: "park", name: "Park", abbr: "Park", cost: 2, shape: "triangle", category: "park", tint: "bg-avanza-green/20 text-avanza-green-dark" },
  { id: "road", name: "Road", abbr: "Rd", cost: 1, shape: "path", category: "road", tint: "bg-secondary text-muted-foreground" },
]

const ITEM_MAP: Record<string, CityItem> = Object.fromEntries(ITEMS.map((it) => [it.id, it]))
const VALID_IDS = new Set(ITEMS.map((it) => it.id))

const REQUIREMENTS = [
  "At least 5 buildings",
  "Roads or paths through your city",
  "A park or green space",
  "A school",
  "A store or market",
  "A budget of $50 you stay within",
  "Measurements — each grid square is 1 unit",
  "At least 5 different geometric shapes",
  "One fraction rule (for example, the park is about 1/4 of the city)",
  "One graph or data display (your budget spending graph)",
  "A written explanation of your choices",
]

type ReflectionQ = { id: string; label: string; multiline: boolean }

const REFLECTION_QS: ReflectionQ[] = [
  { id: "total", label: "What is the total cost of your city?", multiline: false },
  { id: "shapes", label: "Which shapes did you use, and where?", multiline: true },
  { id: "parkFraction", label: "What fraction of your city is park or green space?", multiline: false },
  { id: "graph", label: "What does your spending graph show?", multiline: true },
  { id: "hardest", label: "What was the hardest math decision you made, and why?", multiline: true },
]

/* -------------------------------------------------------------------------- */
/* Small helpers                                                              */
/* -------------------------------------------------------------------------- */

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

/** Reduced "a/b", or null when it cannot be simplified further / is trivial. */
function reducedFraction(n: number, d: number): string | null {
  if (n === 0 || d === 0) return null
  const g = gcd(n, d)
  if (g === d) return null
  return `${n / g}/${d / g}`
}

function ShapeMark({ shape }: { shape: Shape }) {
  const p = { stroke: "currentColor", strokeWidth: 1.5, fill: "currentColor", fillOpacity: 0.15 }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      {shape === "rectangle" && <rect x="3" y="7" width="18" height="10" {...p} />}
      {shape === "square" && <rect x="4" y="4" width="16" height="16" {...p} />}
      {shape === "circle" && <circle cx="12" cy="12" r="9" {...p} />}
      {shape === "triangle" && <polygon points="12,3 21,21 3,21" {...p} />}
      {shape === "hexagon" && <polygon points="12,3 19.8,7.5 19.8,16.5 12,21 4.2,16.5 4.2,7.5" {...p} />}
      {shape === "path" && (
        <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      )}
    </svg>
  )
}

const primaryBtn =
  "inline-flex items-center justify-center rounded-md bg-avanza-teal px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-avanza-teal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

/** One live requirement row: icon + text + optional detail, with SR-only status. */
function Requirement({ met, label, detail }: { met: boolean; label: string; detail?: string }) {
  const Icon = met ? Check : Circle
  return (
    <li className="flex items-start gap-2 text-sm">
      <Icon aria-hidden className={"mt-0.5 h-4 w-4 flex-none " + (met ? "text-avanza-teal-dark" : "text-muted-foreground")} />
      <span className={met ? "text-foreground" : "text-muted-foreground"}>
        {label}
        {detail && <span className="ml-1 font-mono text-xs text-muted-foreground">({detail})</span>}
        <span className="sr-only">{met ? " — done" : " — not done yet"}</span>
      </span>
    </li>
  )
}

/* -------------------------------------------------------------------------- */
/* Final project page                                                         */
/* -------------------------------------------------------------------------- */

export function MathFinalProjectContent({ lesson }: { lesson: MathLesson }) {
  const prev = getPreviousMathLesson(lesson.slug)

  const {
    loaded: progressLoaded,
    isCompleted,
    markComplete,
    completedCount,
    totalWeeks,
  } = useMathProgress()
  const done = isCompleted(lesson.slug)

  // Planner state, persisted to localStorage (loaded only on the client).
  const [loaded, setLoaded] = useState(false)
  const [grid, setGrid] = useState<(string | null)[]>(() => Array(GRID_SIZE).fill(null))
  const [reflections, setReflections] = useState<Record<string, string>>({})
  const [selectedTool, setSelectedTool] = useState<string>("school")

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as { grid?: unknown; reflections?: unknown }
        if (Array.isArray(parsed.grid) && parsed.grid.length === GRID_SIZE) {
          setGrid(parsed.grid.map((c) => (typeof c === "string" && VALID_IDS.has(c) ? c : null)))
        }
        if (parsed.reflections && typeof parsed.reflections === "object") {
          const clean: Record<string, string> = {}
          for (const q of REFLECTION_QS) {
            const v = (parsed.reflections as Record<string, unknown>)[q.id]
            if (typeof v === "string") clean[q.id] = v
          }
          setReflections(clean)
        }
      }
    } catch {
      // Ignore corrupt/blocked storage; the planner still works in memory.
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded || typeof window === "undefined") return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ grid, reflections }))
    } catch {
      // Persistence is best-effort.
    }
  }, [loaded, grid, reflections])

  /* ---- derived planner values ---- */
  const filled = grid.filter(Boolean).length
  const cost = grid.reduce((sum, id) => sum + (id ? ITEM_MAP[id].cost : 0), 0)
  const remaining = BUDGET - cost
  const over = remaining < 0
  const buildingCells = grid.filter((id) => id && ITEM_MAP[id].category === "building").length
  const parkCells = grid.filter((id) => id === "park").length
  const roadCells = grid.filter((id) => id === "road").length
  const shapesUsed = new Set(
    grid.filter(Boolean).map((id) => ITEM_MAP[id as string].shape).filter((s) => s !== "path"),
  )
  const spendByCategory: Record<Category, number> = { building: 0, park: 0, road: 0 }
  for (const id of grid) if (id) spendByCategory[ITEM_MAP[id].category] += ITEM_MAP[id].cost
  const categoriesWithSpend = (Object.values(spendByCategory) as number[]).filter((v) => v > 0).length
  const reflectionsComplete = REFLECTION_QS.every((q) => (reflections[q.id] ?? "").trim().length > 0)
  const parkFractionReduced = reducedFraction(parkCells, filled)

  const checklist = [
    { label: "At least 5 buildings placed", met: buildingCells >= 5, detail: `${buildingCells}/5` },
    { label: "At least one park", met: parkCells >= 1 },
    { label: "At least one road or path", met: roadCells >= 1 },
    { label: "Budget is not exceeded", met: cost <= BUDGET, detail: `$${cost} / $${BUDGET}` },
    { label: "At least 5 shapes used", met: shapesUsed.size >= 5, detail: `${shapesUsed.size}/5` },
    { label: "Fraction rule included (park fraction)", met: parkCells >= 1 && filled > 0 },
    { label: "Graph / data display completed", met: categoriesWithSpend >= 2 },
    { label: "Reflection completed", met: reflectionsComplete },
  ]
  const metCount = checklist.filter((c) => c.met).length
  const allMet = metCount === checklist.length

  /* ---- grid interactions ---- */
  const toolName = selectedTool === "erase" ? "the eraser" : ITEM_MAP[selectedTool].name
  const setCell = (i: number, value: string | null) =>
    setGrid((g) => g.map((c, j) => (j === i ? value : c)))
  const handleCell = (i: number) => {
    if (selectedTool === "erase") setCell(i, null)
    else setCell(i, grid[i] === selectedTool ? null : selectedTool)
  }
  const clearGrid = () => setGrid(Array(GRID_SIZE).fill(null))

  const setReflection = (id: string, value: string) =>
    setReflections((r) => ({ ...r, [id]: value }))

  return (
    <div className="bg-background">
      <MathLessonVisit slug={lesson.slug} />
      <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {/* Header */}
        <nav aria-label="Lesson" className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm">
          <Link
            href={mathAdventuresPath}
            className="font-semibold text-avanza-teal-dark underline underline-offset-2 hover:text-avanza-teal"
          >
            Math Adventures
          </Link>
          {prev && (
            <Link
              href={mathLessonPath(prev.slug)}
              className="font-semibold text-avanza-teal-dark underline underline-offset-2 hover:text-avanza-teal"
            >
              &larr; Week {prev.weekNumber}
            </Link>
          )}
        </nav>

        <header className="mt-6 border-b border-border pb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Final project &middot; Week {lesson.weekNumber} of {totalWeeks}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">{lesson.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-foreground/90 md:text-lg">
            {lesson.description}
          </p>
          <dl className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Estimated time</dt>
              <dd className="mt-1 text-sm text-foreground">{lesson.estimatedTime}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Skills used</dt>
              <dd className="mt-1 text-sm text-foreground">{lesson.skillFocus.join(", ")}</dd>
            </div>
          </dl>
        </header>

        {/* 1. Scenario */}
        <Section title="You're the city planner">
          <div className="rounded-lg border border-border bg-secondary p-5 md:p-6">
            <p className="text-base leading-relaxed text-foreground/90">{lesson.introStory}</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Design a small city on the grid below. Every part of your city uses math from the course:
            buildings are geometric shapes with a cost, the whole city has a budget, the park is a
            fraction of the space, and your spending becomes a graph. Plan carefully — the budget is
            real.
          </p>
        </Section>

        {/* 2. Requirements */}
        <Section title="What your city must include">
          <ul className="grid gap-x-10 gap-y-2 sm:grid-cols-2">
            {REQUIREMENTS.map((req) => (
              <li key={req} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-teal" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* 3. Planner */}
        <Section title="Math City planner">
          <p className="text-sm text-muted-foreground">
            Pick an item, then click grid squares to place it. Click a filled square with the same
            item to remove it, or choose Erase. Each square is 1 unit; each item costs money per
            square.
          </p>

          {/* Palette */}
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="City items">
            {ITEMS.map((item) => {
              const selected = selectedTool === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedTool(item.id)}
                  aria-pressed={selected}
                  className={
                    "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-1 " +
                    (selected
                      ? "border-avanza-teal bg-avanza-teal/10 text-foreground"
                      : "border-border text-foreground hover:border-avanza-teal")
                  }
                >
                  <span className="text-muted-foreground">
                    <ShapeMark shape={item.shape} />
                  </span>
                  {item.name}
                  <span className="font-mono text-xs text-muted-foreground">${item.cost}</span>
                </button>
              )
            })}
            <button
              type="button"
              onClick={() => setSelectedTool("erase")}
              aria-pressed={selectedTool === "erase"}
              className={
                "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-1 " +
                (selectedTool === "erase"
                  ? "border-avanza-orange bg-avanza-orange/10 text-foreground"
                  : "border-border text-foreground hover:border-avanza-orange")
              }
            >
              <X aria-hidden className="h-4 w-4" /> Erase
            </button>
          </div>

          <p className="mt-3 text-sm text-foreground">
            Selected: <span className="font-semibold">{toolName}</span>
          </p>

          {/* Grid */}
          <div
            className="mt-3 grid gap-1"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`, maxWidth: "22rem" }}
            role="group"
            aria-label={`City grid, ${ROWS} rows by ${COLS} columns`}
          >
            {grid.map((cell, i) => {
              const item = cell ? ITEM_MAP[cell] : null
              const row = Math.floor(i / COLS) + 1
              const col = (i % COLS) + 1
              const label = item
                ? `Row ${row}, column ${col}: ${item.name}. Activate to ${selectedTool === "erase" || cell === selectedTool ? "remove it" : "replace with " + toolName}.`
                : `Row ${row}, column ${col}: empty. Activate to place ${toolName}.`
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleCell(i)}
                  aria-label={label}
                  className={
                    "flex aspect-square items-center justify-center rounded-sm border text-xs font-bold leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-avanza-teal " +
                    (item ? `${item.tint} border-transparent` : "border-border bg-background hover:bg-avanza-teal/5")
                  }
                >
                  {item ? item.abbr : ""}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={clearGrid}
            className="mt-3 text-sm font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2"
          >
            Clear the grid
          </button>

          {/* Budget + shapes */}
          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border border-border p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Budget</dt>
              <dd className="mt-1 font-mono text-xl font-bold text-foreground">${BUDGET}</dd>
            </div>
            <div className="rounded-md border border-border p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Spent</dt>
              <dd className="mt-1 font-mono text-xl font-bold text-foreground">${cost}</dd>
            </div>
            <div className="rounded-md border border-border p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {over ? "Over by" : "Left"}
              </dt>
              <dd className="mt-1 font-mono text-xl font-bold text-foreground">${Math.abs(remaining)}</dd>
            </div>
          </dl>

          <div className="mt-4 rounded-md border border-border p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Shapes used ({shapesUsed.size})
            </p>
            <p className="mt-1 text-sm text-foreground">
              {shapesUsed.size > 0
                ? Array.from(shapesUsed).map((s) => s[0].toUpperCase() + s.slice(1)).join(", ")
                : "None yet — place some buildings to add shapes."}
            </p>
            {parkCells > 0 && filled > 0 && (
              <p className="mt-2 text-sm text-foreground">
                Park &amp; green space:{" "}
                <span className="font-mono font-semibold">
                  {parkCells}/{filled}
                  {parkFractionReduced ? ` = ${parkFractionReduced}` : ""}
                </span>{" "}
                of your city.
              </p>
            )}
          </div>

          {over && (
            <p role="status" aria-live="polite" className="mt-4 flex items-center gap-2 rounded-md border border-avanza-orange/50 bg-avanza-orange/5 p-4 text-sm text-foreground">
              <X aria-hidden className="h-4 w-4 flex-none" />
              You are ${Math.abs(remaining)} over budget. Remove an item or choose cheaper ones.
            </p>
          )}
        </Section>

        {/* 4. Data display */}
        <Section title="Your spending graph">
          <p className="text-sm text-muted-foreground">
            This bar graph updates from your plan and shows how you spent your budget by category.
          </p>
          <div className="mt-4 space-y-2">
            {(["building", "park", "road"] as Category[]).map((cat) => {
              const amount = spendByCategory[cat]
              const label = cat === "building" ? "Buildings" : cat === "park" ? "Park" : "Roads"
              return (
                <div key={cat} className="flex items-center gap-3">
                  <span className="w-20 flex-none text-sm font-semibold text-foreground">{label}</span>
                  <span
                    aria-hidden
                    className="h-6 rounded-sm bg-avanza-teal"
                    style={{ width: `${(amount / BUDGET) * 100}%`, minWidth: amount ? "0.5rem" : "0" }}
                  />
                  <span className="font-mono text-sm font-semibold text-foreground">${amount}</span>
                </div>
              )
            })}
          </div>
        </Section>

        {/* 5. Requirement checklist */}
        <Section title="Requirement checklist">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            <span className="font-semibold text-foreground">{metCount} of {checklist.length}</span>{" "}
            requirements met.
          </p>
          <ul className="mt-4 space-y-2">
            {checklist.map((item) => (
              <Requirement key={item.label} met={item.met} label={item.label} detail={item.detail} />
            ))}
          </ul>
        </Section>

        {/* 6. Reflection */}
        <Section title="Explain your city">
          <p className="text-sm text-muted-foreground">
            Write a short answer for each. Your answers are saved on this device.
          </p>
          <div className="mt-4 space-y-5">
            {REFLECTION_QS.map((q) => {
              const value = reflections[q.id] ?? ""
              const hint = reflectionHint(q.id, { cost, parkCells, filled, parkFractionReduced })
              return (
                <div key={q.id}>
                  <label htmlFor={`reflect-${q.id}`} className="block text-sm font-semibold text-foreground">
                    {q.label}
                  </label>
                  {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
                  {q.multiline ? (
                    <textarea
                      id={`reflect-${q.id}`}
                      value={value}
                      onChange={(e) => setReflection(q.id, e.target.value)}
                      rows={2}
                      className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-1"
                    />
                  ) : (
                    <input
                      id={`reflect-${q.id}`}
                      type="text"
                      value={value}
                      onChange={(e) => setReflection(q.id, e.target.value)}
                      className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-1"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </Section>

        {/* 7. Advanced constraints */}
        <Section title="Advanced constraints (older students)">
          <p className="text-sm text-muted-foreground">
            Optional challenges. The statuses update live from your plan.
          </p>
          <ul className="mt-4 space-y-2">
            <Requirement
              met={filled > 0 && Math.abs(parkCells / filled - 0.25) <= 0.08}
              label="The park is about 1/4 of the city"
              detail={filled > 0 ? `${Math.round((parkCells / filled) * 100)}% now` : "0% now"}
            />
            <Requirement met={roadCells >= 12} label="Roads are at least 12 units long" detail={`${roadCells}/12`} />
            <Requirement met={cost > 0 && cost <= BUDGET} label="The city stays within $50" detail={`$${cost}`} />
            <Requirement met={categoriesWithSpend >= 2} label="A graph shows how the budget was spent" />
            <Requirement
              met={(reflections.hardest ?? "").trim().length > 0}
              label="You explained one tradeoff you made"
            />
          </ul>
        </Section>

        {/* 8. Completion */}
        {done ? (
          <div
            role="status"
            aria-live="polite"
            className="mt-12 rounded-lg border border-avanza-teal/50 bg-avanza-teal/5 p-6"
          >
            <p className="text-lg font-bold text-foreground">You completed Math Adventures.</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              You used numbers, patterns, fractions, measurement, geometry, money, data, and logic to
              solve real problems — and put them all together to plan a working city.
            </p>
            <p className="mt-3 text-sm font-semibold text-foreground">
              {completedCount} of {totalWeeks} weeks complete.
            </p>
            <p className="mt-4 text-sm">
              <Link
                href={mathAdventuresPath}
                className="font-semibold text-avanza-teal-dark underline underline-offset-2 hover:text-avanza-teal"
              >
                Back to course hub
              </Link>
            </p>
          </div>
        ) : (
          <div className="mt-12 rounded-md border border-border bg-secondary p-5">
            <p className="text-sm font-semibold text-foreground">Finish your final project</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {allMet
                ? "Every requirement is met — you're ready to finish the course."
                : `You have met ${metCount} of ${checklist.length} requirements. You can complete the checklist above, or mark the project complete when you're ready.`}
            </p>
            <button
              type="button"
              onClick={() => markComplete(lesson.slug)}
              disabled={!progressLoaded}
              className={`mt-3 ${primaryBtn}`}
            >
              Mark final project complete
            </button>
          </div>
        )}

        {/* Footer navigation */}
        <nav className="mt-12 border-t border-border pt-6">
          <div className="flex items-center justify-between gap-4 text-sm">
            {prev ? (
              <Link
                href={mathLessonPath(prev.slug)}
                className="font-semibold text-avanza-teal-dark underline underline-offset-2 hover:text-avanza-teal"
              >
                &larr; Previous: Week {prev.weekNumber}
              </Link>
            ) : (
              <span />
            )}
            <Link
              href={mathAdventuresPath}
              className="text-right font-semibold text-avanza-teal-dark underline underline-offset-2 hover:text-avanza-teal"
            >
              Finish course &middot; back to hub &rarr;
            </Link>
          </div>
        </nav>
      </article>
    </div>
  )
}

/** Scaffolding hints under some reflection questions, computed from the plan. */
function reflectionHint(
  id: string,
  data: { cost: number; parkCells: number; filled: number; parkFractionReduced: string | null },
): string | null {
  if (id === "total") return `Your planner total is currently $${data.cost}.`
  if (id === "parkFraction") {
    if (data.parkCells > 0 && data.filled > 0) {
      return `Right now the park is ${data.parkCells}/${data.filled}${
        data.parkFractionReduced ? ` = ${data.parkFractionReduced}` : ""
      } of your city.`
    }
    return "Place a park to create some green space."
  }
  if (id === "graph") return "Look at your spending graph above."
  return null
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

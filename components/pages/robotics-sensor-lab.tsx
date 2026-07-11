"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  readSensors,
  type RobotState,
  type RobotWorld,
  type SensorReadings,
} from "@/features/curriculums/robotics-program"
import { useRoboticsProgress } from "@/components/ui/useRoboticsProgress"

/**
 * Week 4 "Sensor Investigation Lab" for the Robotics & Automation course
 * (grades 4-6). The student places an object at a set distance and on a light or
 * dark surface, reads LIVE deterministic sensor values, records a saved data
 * table, and chooses a threshold. All readings come from the real simulator
 * sensor engine (`readSensors`) so they are deterministic and debuggable - no
 * invented values.
 *
 * The robot always faces up (dir 0) from the bottom of a 1-wide column. A wall
 * placed `distance` cells above the robot is the "object" it senses. A line under
 * the robot's own cell makes the reflected-light sensor read 20 (dark) instead of
 * 80 (light). Distances beyond `MAX_RANGE` are treated as out of range, to teach
 * that real sensors have a detection limit.
 *
 * Progress loads only after mount, so the server and first client render use the
 * neutral empty state (no hydration mismatch); controls stay disabled until then.
 */

const MIN_DISTANCE = 1
const MAX_DISTANCE = 6
/** The furthest distance the sensor can still resolve; beyond this = out of range. */
const MAX_RANGE = 5
/** A tall column so we always have room to place the object above the robot. */
const ROWS = MAX_DISTANCE + 2

const cellClass =
  "w-full rounded-md border border-border bg-card px-2 py-1.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"

const inputClass =
  "mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"

/** A recorded reading in the saved data table. */
type Reading = {
  whatISet: string
  distance: string
  light: string
  notes: string
}

/** The JSON shape saved through `saveActivityData`. */
type SavedLab = {
  rows: Reading[]
  threshold: string
  reason: string
}

const TABLE_COLUMNS = ["What I set", "Distance", "Light", "Notes"]

const emptyLab: SavedLab = { rows: [], threshold: "", reason: "" }

/**
 * Build a 1-wide world with the robot at the bottom facing up and a wall
 * (the "object") `distance` cells directly ahead. If `dark` is true, the robot's
 * own cell is a line, so reflected light reads 20; otherwise 80.
 *
 * `readDistance` counts empty cells to the nearest wall/edge ahead, so with the
 * object wall `distance` cells above the robot it reads exactly `distance`.
 */
function buildScene(distance: number, dark: boolean): { world: RobotWorld; state: RobotState } {
  const robotY = ROWS - 1
  const wallY = robotY - distance
  const walls = wallY >= 0 ? [`0,${wallY}`] : []
  const world: RobotWorld = {
    cols: 1,
    rows: ROWS,
    start: { x: 0, y: robotY, dir: 0 },
    walls,
    lines: dark ? [`0,${robotY}`] : [],
    colors: {},
    objects: [],
  }
  const state: RobotState = {
    x: 0,
    y: robotY,
    dir: 0,
    motorLeft: 0,
    motorRight: 0,
    vars: {},
    log: [],
    reached: [],
    done: false,
    missionComplete: false,
  }
  return { world, state }
}

/** A raw distance reading of MAX_RANGE+ counts as out of range (detection limit). */
function isOutOfRange(rawDistance: number): boolean {
  return rawDistance > MAX_RANGE
}

/** How the live distance reading should be shown as text. */
function distanceLabel(rawDistance: number): string {
  return isOutOfRange(rawDistance) ? "Out of range" : `${rawDistance} cells`
}

export function SensorInvestigationLab({ activityId }: { activityId: string }) {
  const { loaded, progress, equipmentPath, saveActivityData, saveActivityResult } = useRoboticsProgress()

  const storageKey = `sensor-lab:${activityId}`

  // Live control state.
  const [distance, setDistance] = useState<number>(3)
  const [dark, setDark] = useState<boolean>(false)

  // Saved lab state (rows + threshold + reason).
  const [lab, setLab] = useState<SavedLab>(emptyLab)

  // Restore saved data once progress has hydrated, exactly once.
  const restored = useRef(false)
  useEffect(() => {
    if (!loaded || restored.current) return
    restored.current = true
    const raw = progress.activityData[storageKey]
    if (raw) {
      const parsed = parseSavedLab(raw)
      if (parsed) setLab(parsed)
    }
  }, [loaded, progress.activityData, storageKey])

  // Persist the whole lab whenever it changes, but only after we have restored
  // (so we never overwrite saved data with the initial empty state).
  const persist = (next: SavedLab) => {
    setLab(next)
    if (loaded) saveActivityData(storageKey, JSON.stringify(next))
  }

  // The live readings come straight from the real sensor engine.
  const readings: SensorReadings = useMemo(() => {
    const { world, state } = buildScene(distance, dark)
    return readSensors(world, state)
  }, [distance, dark])

  const outOfRange = isOutOfRange(readings.distance)
  const threshold = lab.threshold.trim() === "" ? null : Number(lab.threshold)
  const thresholdValid = threshold !== null && Number.isFinite(threshold)

  // The threshold decision: NEAR if the live distance is at or below the
  // threshold, FAR otherwise. Out-of-range readings are always FAR.
  const decision: "NEAR" | "FAR" | null = !thresholdValid
    ? null
    : outOfRange
      ? "FAR"
      : readings.distance <= (threshold as number)
        ? "NEAR"
        : "FAR"

  // Completion: at least 3 recorded readings AND a valid threshold.
  const meetsCompletion = lab.rows.length >= 3 && thresholdValid

  // Save the activity result once the requirements are first met.
  const savedResult = loaded && (progress.activityResults[activityId]?.completed ?? false)
  const resultSaved = useRef(false)
  useEffect(() => {
    if (!loaded || resultSaved.current) return
    if (meetsCompletion && !savedResult) {
      resultSaved.current = true
      saveActivityResult(activityId, { pathId: equipmentPath ?? null, completed: true })
    }
  }, [loaded, meetsCompletion, savedResult, activityId, equipmentPath, saveActivityResult])

  const addCurrentReading = () => {
    const whatISet = `${outOfRange ? `${distance} cells (out of range)` : `${distance} cells`}, ${
      dark ? "dark surface" : "light surface"
    }`
    const row: Reading = {
      whatISet,
      distance: distanceLabel(readings.distance),
      light: String(readings.light),
      notes: "",
    }
    persist({ ...lab, rows: [...lab.rows, row] })
  }

  const updateNotes = (index: number, value: string) => {
    const rows = lab.rows.map((r, i) => (i === index ? { ...r, notes: value } : r))
    persist({ ...lab, rows })
  }

  const removeRow = (index: number) => {
    persist({ ...lab, rows: lab.rows.filter((_, i) => i !== index) })
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Week 4 lab</p>
        <h1 className="mt-3 text-2xl font-extrabold text-foreground md:text-3xl">Sensor Investigation Lab</h1>
        <p className="mt-4 text-sm leading-relaxed text-foreground/90">
          Place an object at different distances and try a light or a dark surface. Read the live sensor values,
          record them in your table, and pick a threshold. A sensor returns a measurement - a number - not an
          understanding of what the object is.
        </p>
      </header>

      {/* Controls + live readings */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Controls */}
        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="text-lg font-bold text-foreground">Set up the test</h2>

          {/* Object distance */}
          <fieldset className="mt-5" disabled={!loaded}>
            <legend className="text-sm font-semibold text-foreground">Object distance</legend>
            <p className="mt-1 text-xs text-muted-foreground">
              How many cells ahead of the robot the object sits. Beyond {MAX_RANGE} cells the sensor cannot see it.
            </p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Object distance in cells">
              {Array.from({ length: MAX_DISTANCE - MIN_DISTANCE + 1 }, (_, i) => MIN_DISTANCE + i).map((d) => {
                const active = distance === d
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDistance(d)}
                    disabled={!loaded}
                    aria-pressed={active}
                    className={
                      "min-w-[2.75rem] rounded-md border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 " +
                      (active
                        ? "border-avanza-green bg-avanza-green/10 text-foreground"
                        : "border-border text-foreground/90 hover:border-avanza-green/60")
                    }
                  >
                    {d}
                  </button>
                )
              })}
            </div>
            <label htmlFor="distance-range" className="mt-4 block text-xs font-semibold text-muted-foreground">
              Or use the slider
            </label>
            <input
              id="distance-range"
              type="range"
              min={MIN_DISTANCE}
              max={MAX_DISTANCE}
              step={1}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              disabled={!loaded}
              aria-valuetext={`${distance} cells`}
              className="mt-2 w-full accent-avanza-green disabled:opacity-50"
            />
          </fieldset>

          {/* Surface */}
          <fieldset className="mt-6" disabled={!loaded}>
            <legend className="text-sm font-semibold text-foreground">Surface</legend>
            <p className="mt-1 text-xs text-muted-foreground">
              A dark surface reflects less light, so the light sensor reads a low number.
            </p>
            <div className="mt-3 flex gap-2" role="group" aria-label="Surface under the robot">
              {[
                { value: false, label: "Light surface" },
                { value: true, label: "Dark surface" },
              ].map((opt) => {
                const active = dark === opt.value
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setDark(opt.value)}
                    disabled={!loaded}
                    aria-pressed={active}
                    className={
                      "flex-1 rounded-md border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 " +
                      (active
                        ? "border-avanza-green bg-avanza-green/10 text-foreground"
                        : "border-border text-foreground/90 hover:border-avanza-green/60")
                    }
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </fieldset>
        </div>

        {/* Live readings */}
        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="text-lg font-bold text-foreground">Live sensor read-out</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            These update the moment you change the setup. Same setup, same numbers - every time.
          </p>
          <dl className="mt-4 space-y-3 text-sm" aria-live="polite">
            <ReadingRow
              label="Distance"
              value={distanceLabel(readings.distance)}
              indicator={outOfRange ? "limit" : "ok"}
            />
            <ReadingRow label="Touch" value={readings.touch ? "Pressed" : "Not pressed"} indicator={readings.touch ? "on" : "off"} />
            <ReadingRow label="Light" value={`${readings.light} of 100`} indicator={readings.light <= 50 ? "on" : "off"} />
            <ReadingRow
              label="Over a line"
              value={readings.onLine ? "Yes" : "No"}
              indicator={readings.onLine ? "on" : "off"}
            />
          </dl>
        </div>
      </section>

      {/* Data table */}
      <section className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-foreground">Your data table</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Record at least three readings. Try different distances, an edge-of-range reading, the same reading
              twice, a light surface, and a dark surface.
            </p>
          </div>
          <button
            type="button"
            onClick={addCurrentReading}
            disabled={!loaded}
            className="rounded-md border border-avanza-green bg-avanza-green/10 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-avanza-green/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add current reading
          </button>
        </div>

        <div className="mt-5 overflow-x-auto rounded-lg border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-secondary">
                {TABLE_COLUMNS.map((col) => (
                  <th
                    key={col}
                    className="border-b border-border px-3 py-2 text-xs font-bold uppercase tracking-wide text-muted-foreground"
                  >
                    {col}
                  </th>
                ))}
                <th className="border-b border-border px-3 py-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <span className="sr-only">Remove</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {lab.rows.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_COLUMNS.length + 1} className="px-3 py-6 text-center text-sm text-muted-foreground">
                    No readings yet. Set up a test above and press &ldquo;Add current reading&rdquo;.
                  </td>
                </tr>
              ) : (
                lab.rows.map((row, r) => (
                  <tr key={r} className="align-top">
                    <td className="border-b border-border px-3 py-2 text-foreground/90">{row.whatISet}</td>
                    <td className="border-b border-border px-3 py-2 font-mono text-foreground/90">{row.distance}</td>
                    <td className="border-b border-border px-3 py-2 font-mono text-foreground/90">{row.light}</td>
                    <td className="border-b border-border px-3 py-2">
                      <input
                        type="text"
                        value={row.notes}
                        onChange={(e) => updateNotes(r, e.target.value)}
                        disabled={!loaded}
                        aria-label={`Notes for reading ${r + 1}`}
                        placeholder="What did you notice?"
                        className={cellClass}
                      />
                    </td>
                    <td className="border-b border-border px-3 py-2">
                      <button
                        type="button"
                        onClick={() => removeRow(r)}
                        disabled={!loaded}
                        aria-label={`Remove reading ${r + 1}`}
                        className="rounded-md border border-border px-2 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
          {lab.rows.length} reading{lab.rows.length === 1 ? "" : "s"} recorded.
        </p>
      </section>

      {/* Threshold */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-foreground">Choose a threshold</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A threshold is the number your robot compares against to decide. Here: if the distance is at or below your
          threshold, the robot calls the object NEAR.
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="threshold" className="block text-sm font-semibold text-foreground">
              My chosen threshold (cells)
            </label>
            <input
              id="threshold"
              type="number"
              inputMode="numeric"
              min={0}
              value={lab.threshold}
              onChange={(e) => persist({ ...lab, threshold: e.target.value })}
              disabled={!loaded}
              placeholder="e.g. 3"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="threshold-reason" className="block text-sm font-semibold text-foreground">
              Why this threshold?
            </label>
            <input
              id="threshold-reason"
              type="text"
              value={lab.reason}
              onChange={(e) => persist({ ...lab, reason: e.target.value })}
              disabled={!loaded}
              placeholder="Explain your choice"
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-border bg-secondary p-4" aria-live="polite">
          {thresholdValid ? (
            <p className="text-sm text-foreground/90">
              With a threshold of{" "}
              <span className="font-semibold text-foreground">{threshold}</span> and the current distance of{" "}
              <span className="font-semibold text-foreground">{distanceLabel(readings.distance)}</span>, the robot
              would decide:{" "}
              <span className="font-bold text-foreground">{decision}</span>
              {decision === "FAR" && outOfRange ? " (the object is past the sensor's range)" : ""}.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Enter a threshold number to see what the robot would decide right now.
            </p>
          )}
        </div>
      </section>

      {/* Saved confirmation */}
      <section className="mt-10">
        {loaded && (meetsCompletion || savedResult) ? (
          <div className="rounded-lg border border-avanza-green bg-avanza-green/10 p-4">
            <p className="text-sm font-semibold text-foreground">Lab saved.</p>
            <p className="mt-1 text-sm text-foreground/90">
              You recorded {lab.rows.length} readings and chose a threshold. This activity is marked complete on this
              device.
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">
              Record at least three readings and enter a threshold to finish this lab.
            </p>
          </div>
        )}
      </section>

      <p className="mt-10 text-xs text-muted-foreground">Everything on this page is saved on this device only.</p>
    </div>
  )
}

/**
 * One live reading row: a label, the value as screen-reader-friendly text, and a
 * small non-color-only indicator (a shape + word) so the state does not rely on
 * color alone.
 */
function ReadingRow({
  label,
  value,
  indicator,
}: {
  label: string
  value: string
  indicator: "on" | "off" | "ok" | "limit"
}) {
  const glyph =
    indicator === "on" ? "●" : indicator === "limit" ? "△" : indicator === "off" ? "○" : "■"
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="flex items-center gap-2 font-semibold text-foreground">
        <span aria-hidden className="font-mono text-xs text-muted-foreground">
          {glyph}
        </span>
        <span>{value}</span>
      </dd>
    </div>
  )
}

/** Parse the saved JSON blob without ever trusting its shape. */
function parseSavedLab(raw: string): SavedLab | null {
  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    return null
  }
  if (typeof data !== "object" || data === null) return null
  const obj = data as Record<string, unknown>
  const rows = Array.isArray(obj.rows)
    ? obj.rows
        .filter((r): r is Record<string, unknown> => typeof r === "object" && r !== null)
        .map((r) => ({
          whatISet: typeof r.whatISet === "string" ? r.whatISet : "",
          distance: typeof r.distance === "string" ? r.distance : "",
          light: typeof r.light === "string" ? r.light : "",
          notes: typeof r.notes === "string" ? r.notes : "",
        }))
    : []
  return {
    rows,
    threshold: typeof obj.threshold === "string" ? obj.threshold : "",
    reason: typeof obj.reason === "string" ? obj.reason : "",
  }
}

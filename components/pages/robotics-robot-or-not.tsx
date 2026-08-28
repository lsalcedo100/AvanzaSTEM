"use client"

import { useEffect, useMemo, useState } from "react"
import { useRoboticsProgress } from "@/components/ui/useRoboticsProgress"
import { useLanguage } from "@/components/providers/language-provider"
import type { Translations } from "@/i18n/translations"

/* -------------------------------------------------------------------------- */
/* Device data                                                                */
/* -------------------------------------------------------------------------- */

type Classification = "robot" | "in-between" | "machine"

type Device = {
  id: string
  name: string
  /** The intended classification. */
  answer: Classification
  /** Which of the three robot parts this device actually has. */
  input: boolean
  processing: boolean
  output: boolean
  /** One-sentence reason, shown after checking. */
  explanation: string
}

type RonStrings = Translations["courseUi"]["robotics"]["robotOrNot"]

const devices = (N: RonStrings): readonly Device[] => [
  { id: "sliding-door", name: N.slidingDoor, answer: "robot", input: true, processing: true, output: true, explanation: N.slidingDoorWhy },
  { id: "rc-car", name: N.rcCar, answer: "machine", input: true, processing: false, output: true, explanation: N.rcCarWhy },
  { id: "toaster", name: N.toaster, answer: "machine", input: false, processing: false, output: true, explanation: N.toasterWhy },
  { id: "mars-rover", name: N.marsRover, answer: "robot", input: true, processing: true, output: true, explanation: N.marsRoverWhy },
  { id: "washing-machine", name: N.washingMachine, answer: "in-between", input: true, processing: true, output: true, explanation: N.washingMachineWhy },
  { id: "robotic-arm", name: N.roboticArm, answer: "robot", input: true, processing: true, output: true, explanation: N.roboticArmWhy },
  { id: "wind-up-toy", name: N.windUpToy, answer: "machine", input: false, processing: false, output: true, explanation: N.windUpToyWhy },
  { id: "voice-speaker", name: N.voiceSpeaker, answer: "robot", input: true, processing: true, output: true, explanation: N.voiceSpeakerWhy },
]

/** Device ids in display order. These are the saved-state keys, so they never change with language. */
const DEVICE_IDS = [
  "sliding-door",
  "rc-car",
  "toaster",
  "mars-rover",
  "washing-machine",
  "robotic-arm",
  "wind-up-toy",
  "voice-speaker",
] as const

const classOptions = (N: RonStrings): readonly { id: Classification; label: string }[] => [
  { id: "robot", label: N.classRobot },
  { id: "in-between", label: N.classInBetween },
  { id: "machine", label: N.classMachine },
]

const partOptions = (
  N: RonStrings,
): readonly { id: "input" | "processing" | "output"; label: string; hint: string }[] => [
  { id: "input", label: N.partInput, hint: N.hintInput },
  { id: "processing", label: N.partProcessing, hint: N.hintProcessing },
  { id: "output", label: N.partOutput, hint: N.hintOutput },
]

/* -------------------------------------------------------------------------- */
/* Local state shape (serialized to progress.activityData)                    */
/* -------------------------------------------------------------------------- */

type DeviceEntry = {
  classification: Classification | null
  input: boolean
  processing: boolean
  output: boolean
}

type State = {
  entries: Record<string, DeviceEntry>
  checked: boolean
}

function emptyEntry(): DeviceEntry {
  return { classification: null, input: false, processing: false, output: false }
}

function parseState(raw: string): State {
  try {
    const value = JSON.parse(raw) as Partial<State>
    return {
      entries: value.entries ?? {},
      checked: value.checked ?? false,
    }
  } catch {
    return { entries: {}, checked: false }
  }
}

function entryFor(state: State, id: string): DeviceEntry {
  return state.entries[id] ?? emptyEntry()
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Robot-or-Not: a classification activity where students sort eight everyday
 * devices into Robot / In between / Just a machine, and check off which of
 * Input, Processing, and Output each one has. Checking the parts is the point -
 * it forces reasoning about sense/decide/act instead of guessing by looks.
 *
 * Work is saved as it happens (serialized into progress.activityData under a
 * per-activity key). "Check my answers" reveals the intended answer and a short
 * reason for each device; students can change anything and check again. Once all
 * eight are classified and checked, the activity is marked done so it counts
 * toward lesson completion.
 */
export function RobotOrNot({ activityId }: { activityId: string }) {
  const N = useLanguage().t.courseUi.robotics.robotOrNot
  const DEVICES = devices(N)
  const CLASS_OPTIONS = classOptions(N)
  const PART_OPTIONS = partOptions(N)
  const { loaded, progress, saveActivityData, saveActivityResult } = useRoboticsProgress()
  const key = `robot-or-not:${activityId}`

  const [state, setState] = useState<State>({ entries: {}, checked: false })

  // Re-key the inputs on `loaded` so the seeded (saved) state only appears after
  // the first client render, matching the server's empty render (no hydration
  // mismatch). Initialize from saved activityData exactly once.
  useEffect(() => {
    if (!loaded) return
    setState(parseState(progress.activityData[key] ?? "{}"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, key])

  // Persist on every change, but only once loaded (never overwrite storage with
  // the empty pre-load state).
  const update = (next: State) => {
    setState(next)
    if (loaded) saveActivityData(key, JSON.stringify(next))
  }

  const setClassification = (deviceId: string, classification: Classification) => {
    const current = entryFor(state, deviceId)
    update({
      ...state,
      entries: { ...state.entries, [deviceId]: { ...current, classification } },
    })
  }

  const togglePart = (deviceId: string, part: "input" | "processing" | "output") => {
    const current = entryFor(state, deviceId)
    update({
      ...state,
      entries: {
        ...state.entries,
        [deviceId]: { ...current, [part]: !current[part] },
      },
    })
  }

  const allClassified = useMemo(
    () => DEVICES.every((d) => entryFor(state, d.id).classification !== null),
    [state],
  )

  const classifiedCount = useMemo(
    () => DEVICES.filter((d) => entryFor(state, d.id).classification !== null).length,
    [state],
  )

  const correctCount = useMemo(
    () => DEVICES.filter((d) => entryFor(state, d.id).classification === d.answer).length,
    [state],
  )

  // Whether the finished activity has been recorded toward lesson completion.
  const savedDone = progress.activityResults[activityId]?.completed ?? false

  const check = () => {
    const next = { ...state, checked: true }
    update(next)
  }

  const clearCheck = () => {
    update({ ...state, checked: false })
  }

  // Once everything is classified and the answers have been checked, record the
  // result so this activity counts. Runs whenever those conditions become true.
  useEffect(() => {
    if (!loaded) return
    if (state.checked && allClassified && !savedDone) {
      saveActivityResult(activityId, {
        pathId: progress.equipmentPath ?? null,
        completed: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, state.checked, allClassified, savedDone])

  const total = String(DEVICES.length)
  const feedback = !state.checked
    ? N.sortedCount.replace("{done}", String(classifiedCount)).replace("{total}", total)
    : allClassified
      ? N.matchedCount.replace("{n}", String(correctCount)).replace("{total}", total)
      : N.sortAll.replace("{total}", total)

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {N.introA}
        <span className="font-semibold text-foreground">{N.introRobot}</span>
        {N.introB}
        <span className="font-semibold text-foreground">{N.introInBetween}</span>
        {N.introC}
        <span className="font-semibold text-foreground">{N.introMachine}</span>
        {N.introD}
      </p>

      <ol className="mt-6 space-y-4">
        {DEVICES.map((device, index) => {
          const entry = entryFor(state, device.id)
          const revealed = state.checked && entry.classification !== null
          const correct = entry.classification === device.answer
          return (
            <li key={device.id} className="rounded-lg border border-border p-5">
              <p className="font-semibold text-foreground">
                <span className="font-mono text-sm text-muted-foreground">{index + 1}. </span>
                {device.name}
              </p>

              <div className="mt-3">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{N.yourCall}</p>
                <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={`Classify ${device.name}`}>
                  {CLASS_OPTIONS.map((opt) => {
                    const chosen = entry.classification === opt.id
                    const state_ =
                      revealed && device.answer === opt.id
                        ? "border-avanza-green bg-avanza-green/10 text-avanza-green-dark"
                        : revealed && chosen
                          ? "border-avanza-orange bg-avanza-orange/10 text-avanza-orange-dark"
                          : chosen
                            ? "border-avanza-green text-foreground"
                            : "border-border text-foreground hover:border-avanza-green/60"
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setClassification(device.id, opt.id)}
                        disabled={!loaded}
                        aria-pressed={chosen}
                        className={
                          "rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 " +
                          state_
                        }
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {N.whatParts}
                </p>
                <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={`Parts of ${device.name}`}>
                  {PART_OPTIONS.map((part) => {
                    const on = entry[part.id]
                    return (
                      <button
                        key={part.id}
                        type="button"
                        onClick={() => togglePart(device.id, part.id)}
                        disabled={!loaded}
                        role="checkbox"
                        aria-checked={on}
                        className={
                          "rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 " +
                          (on
                            ? "border-avanza-green bg-avanza-green/10 text-avanza-green-dark"
                            : "border-border text-foreground hover:border-avanza-green/60")
                        }
                      >
                        <span aria-hidden>{on ? "☑ " : "☐ "}</span>
                        {part.label}
                        <span className="ml-1 font-normal text-muted-foreground">({part.hint})</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {revealed && (
                <div className="mt-3 rounded-md bg-secondary px-3 py-2 text-sm" aria-live="polite">
                  <p
                    className={
                      correct
                        ? "font-semibold text-avanza-green-dark"
                        : "font-semibold text-avanza-orange-dark"
                    }
                  >
                    {correct
                      ? N.thatFits
                      : N.rethink.replace(
                          "{label}",
                          CLASS_OPTIONS.find((c) => c.id === device.answer)?.label ?? "",
                        )}
                  </p>
                  <p className="mt-1 text-foreground/90">{device.explanation}</p>
                </div>
              )}
            </li>
          )
        })}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        {!state.checked ? (
          <button
            type="button"
            onClick={check}
            disabled={!loaded || classifiedCount === 0}
            className="inline-flex items-center rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
          >
            {N.checkAnswers}
          </button>
        ) : (
          <button
            type="button"
            onClick={clearCheck}
            disabled={!loaded}
            className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-avanza-green-dark transition-colors hover:border-avanza-green hover:bg-avanza-green/5 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
          >
            {N.hideAnswers}
          </button>
        )}

        <p className="text-sm text-muted-foreground" aria-live="polite">
          {feedback}
        </p>
      </div>

      {loaded && savedDone && (
        <p className="mt-3 text-sm font-medium text-avanza-green-dark" aria-live="polite">
          {N.savedNote}
        </p>
      )}
    </div>
  )
}

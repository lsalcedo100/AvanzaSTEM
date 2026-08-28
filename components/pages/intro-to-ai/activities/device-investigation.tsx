"use client"

import { useEffect, useState } from "react"
import {
  type DetectiveCategory,
  type DeviceExample,
} from "@/features/curriculums/intro-to-ai/activities/week1-activities"
import { getWeek1Activities } from "@/features/curriculums/intro-to-ai/activities/week1-i18n"
import { useLanguage } from "@/components/providers/language-provider"
import type { ActivityComponentProps } from "@/components/pages/intro-to-ai/activity-registry"
import { ActivityFrame } from "@/components/pages/intro-to-ai/activity-frame"

type DeviceEntry = {
  name: string
  input: string
  output: string
  possibleFixedRules: string
  possibleLearnedPatterns: string
  evidence: string
  infoNeeded: string
  classification: DetectiveCategory | ""
}

const BLANK: DeviceEntry = {
  name: "",
  input: "",
  output: "",
  possibleFixedRules: "",
  possibleLearnedPatterns: "",
  evidence: "",
  infoNeeded: "",
  classification: "",
}

type DIState = { devices: DeviceEntry[] }
const EMPTY: DIState = { devices: [structuredCloneEntry(), structuredCloneEntry(), structuredCloneEntry()] }

function structuredCloneEntry(): DeviceEntry {
  return { ...BLANK }
}

function parseState(raw: string | undefined): DIState {
  if (!raw) return EMPTY
  try {
    const d = JSON.parse(raw) as Partial<DIState>
    const devices = Array.isArray(d.devices) ? d.devices.slice(0, 3) : []
    while (devices.length < 3) devices.push(structuredCloneEntry())
    return {
      devices: devices.map((entry) => ({ ...BLANK, ...(entry && typeof entry === "object" ? entry : {}) })),
    }
  } catch {
    return EMPTY
  }
}

function fromExample(ex: DeviceExample): DeviceEntry {
  return {
    name: ex.name,
    input: ex.input,
    output: ex.output,
    possibleFixedRules: ex.possibleFixedRules,
    possibleLearnedPatterns: ex.possibleLearnedPatterns,
    evidence: ex.evidence,
    infoNeeded: ex.infoNeeded,
    classification: ex.suggestedCategory,
  }
}

export function DeviceInvestigationActivity({ activity, progress }: ActivityComponentProps) {
  const { language, t } = useLanguage()
  const W = t.courseUi.ai.week1
  const content = getWeek1Activities(language)
  const DEVICE_EXAMPLES = content.deviceExamples
  const DEVICE_FIELDS = content.deviceFields
  const DETECTIVE_CATEGORIES = content.detectiveCategories
  const [state, setState] = useState<DIState>(EMPTY)

  useEffect(() => {
    if (progress.loaded) setState(parseState(progress.progress.activities[activity.id]))
  }, [progress.loaded, progress.progress.activities, activity.id])

  const persist = (next: DIState) => {
    setState(next)
    progress.saveActivity(activity.id, JSON.stringify(next))
  }

  const update = (index: number, patch: Partial<DeviceEntry>) =>
    persist({ devices: state.devices.map((d, i) => (i === index ? { ...d, ...patch } : d)) })

  const loadExample = (index: number, exampleId: string) => {
    const ex = DEVICE_EXAMPLES.find((e) => e.id === exampleId)
    if (ex) update(index, fromExample(ex))
  }

  const completed = state.devices.filter((d) => d.name.trim() && d.classification).length

  return (
    <ActivityFrame
      title={activity.title}
      purpose={activity.goal}
      instructions={[W.diInstr1, W.diInstr2, W.diInstr3]}
      status="ready"
      saveStatus={progress.saveStatus}
      onReset={() => persist(EMPTY)}
    >
      <p className="mt-3 rounded-md border border-border bg-secondary/40 px-4 py-2 text-xs text-muted-foreground">
        {W.diPrivacy}
      </p>
      <p className="mt-2 text-sm text-muted-foreground" aria-live="polite">
        {W.diInvestigationsStarted.replace("{done}", String(completed))}
      </p>

      <div className="mt-4 space-y-6">
        {state.devices.map((device, i) => (
          <div key={i} className="rounded-lg border border-border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-foreground">Investigation {i + 1}</h4>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                {W.diLoadExample}
                <select
                  value=""
                  onChange={(e) => {
                    if (e.target.value) loadExample(i, e.target.value)
                  }}
                  className="rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
                >
                  <option value="">{W.diChoose}</option>
                  {DEVICE_EXAMPLES.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {DEVICE_FIELDS.map((field) => (
                <div key={field.id} className={field.id === "name" ? "sm:col-span-2" : ""}>
                  <label htmlFor={`dev-${i}-${field.id}`} className="block text-sm font-medium text-foreground">
                    {field.label}
                  </label>
                  <p className="text-xs text-muted-foreground">{field.hint}</p>
                  {field.id === "name" ? (
                    <input
                      id={`dev-${i}-${field.id}`}
                      value={device[field.id]}
                      onChange={(e) => update(i, { [field.id]: e.target.value })}
                      className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
                    />
                  ) : (
                    <textarea
                      id={`dev-${i}-${field.id}`}
                      value={device[field.id]}
                      onChange={(e) => update(i, { [field.id]: e.target.value })}
                      rows={2}
                      className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
                    />
                  )}
                </div>
              ))}
            </div>

            <fieldset className="mt-3">
              <legend className="text-sm font-medium text-foreground">{W.diYourClassification}</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {DETECTIVE_CATEGORIES.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2 text-sm text-foreground">
                    <input
                      type="radio"
                      name={`dev-${i}-class`}
                      checked={device.classification === cat.id}
                      onChange={() => update(i, { classification: cat.id })}
                      className="h-4 w-4 text-avanza-green focus-visible:ring-avanza-green"
                    />
                    <span>{cat.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        ))}
      </div>
    </ActivityFrame>
  )
}

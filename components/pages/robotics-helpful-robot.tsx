"use client"

import { useMemo, useState } from "react"
import { PrintButton } from "@/components/ui/print-button"
import { useRoboticsProgress } from "@/components/ui/useRoboticsProgress"

/** The saved design record. Every field is optional text until the student fills it in. */
type HelpfulRobotDesign = {
  problem?: string
  user?: string
  input?: string
  processing?: string
  output?: string
  sketch?: string
  safety?: string
}

/** The fields, in order, that must all be non-empty for the design to count as complete. */
const REQUIRED_FIELDS = ["problem", "input", "processing", "output", "safety"] as const

function parseDesign(raw: string | undefined): HelpfulRobotDesign {
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw) as unknown
    return parsed && typeof parsed === "object" ? (parsed as HelpfulRobotDesign) : {}
  } catch {
    return {}
  }
}

function isComplete(design: HelpfulRobotDesign): boolean {
  return REQUIRED_FIELDS.every((field) => (design[field] ?? "").trim().length > 0)
}

const fieldClass =
  "mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:cursor-not-allowed disabled:opacity-50"

/**
 * The "Helpful Robot" design challenge. The student describes a robot that helps
 * someone by breaking it into sense -> decide -> act, then adds a safety note.
 * Everything is written on paper for the sketch and typed here; no hardware is
 * needed. Work is saved as one JSON blob under `helpful-robot:${activityId}` and
 * the finished design can be printed as a labeled description.
 */
export function HelpfulRobotDesigner({ activityId }: { activityId: string }) {
  const { loaded, progress, saveActivityData, saveActivityResult } = useRoboticsProgress()
  const storageKey = `helpful-robot:${activityId}`

  // The saved starting point, read once loading finishes. Also used as the
  // `defaultValue` for each field, so inputs re-key on `loaded` and never
  // mismatch between server and first client render.
  const initial = useMemo(
    () => (loaded ? parseDesign(progress.activityData[storageKey]) : {}),
    [loaded, progress.activityData, storageKey],
  )

  // Edits made this session, merged over the saved starting point. Keeping only
  // the deltas here means the completeness check and "Saved" confirmation
  // reflect already-finished saved work without an effect to seed state.
  const [edits, setEdits] = useState<HelpfulRobotDesign>({})
  const design = useMemo<HelpfulRobotDesign>(() => ({ ...initial, ...edits }), [initial, edits])
  const complete = isComplete(design)

  // Merge one field into the saved JSON on blur, persist it, and re-evaluate
  // whether the design now counts as complete.
  function saveField(field: keyof HelpfulRobotDesign, value: string) {
    const next: HelpfulRobotDesign = { ...design, [field]: value }
    setEdits((prev) => ({ ...prev, [field]: value }))
    saveActivityData(storageKey, JSON.stringify(next))
    if (isComplete(next)) {
      saveActivityResult(activityId, { pathId: progress.equipmentPath ?? null, completed: true })
    }
  }

  return (
    <div className="rounded-lg border border-border p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-foreground">Helpful Robot design challenge</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Design a robot that helps a real person. Break your idea into what it senses, the
            decision it makes, and what it does. Sketch it on paper, then describe it here.
          </p>
        </div>
        <div className="print-hidden">
          <PrintButton label="Print this design" tone="green" />
        </div>
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <label htmlFor="hr-problem" className="block text-sm font-semibold text-foreground">
            The problem your robot solves
          </label>
          <p className="mt-1 text-xs text-muted-foreground">
            For example: carrying books, sorting recycling, finding lost objects, watering plants,
            or inspecting unsafe areas.
          </p>
          <textarea
            key={`problem-${loaded}`}
            id="hr-problem"
            defaultValue={initial.problem ?? ""}
            onBlur={(e) => saveField("problem", e.target.value)}
            disabled={!loaded}
            rows={3}
            placeholder="What problem will your robot help with?"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="hr-user" className="block text-sm font-semibold text-foreground">
            Who it helps (the intended user)
          </label>
          <input
            key={`user-${loaded}`}
            id="hr-user"
            type="text"
            defaultValue={initial.user ?? ""}
            onBlur={(e) => saveField("user", e.target.value)}
            disabled={!loaded}
            placeholder="Who will use it or benefit from it?"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="hr-input" className="block text-sm font-semibold text-foreground">
            What it senses (input)
          </label>
          <textarea
            key={`input-${loaded}`}
            id="hr-input"
            defaultValue={initial.input ?? ""}
            onBlur={(e) => saveField("input", e.target.value)}
            disabled={!loaded}
            rows={2}
            placeholder="What does your robot detect or measure?"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="hr-processing" className="block text-sm font-semibold text-foreground">
            The decision it makes (processing)
          </label>
          <textarea
            key={`processing-${loaded}`}
            id="hr-processing"
            defaultValue={initial.processing ?? ""}
            onBlur={(e) => saveField("processing", e.target.value)}
            disabled={!loaded}
            rows={2}
            placeholder="How does it decide what to do with what it senses?"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="hr-output" className="block text-sm font-semibold text-foreground">
            What it does (output action)
          </label>
          <textarea
            key={`output-${loaded}`}
            id="hr-output"
            defaultValue={initial.output ?? ""}
            onBlur={(e) => saveField("output", e.target.value)}
            disabled={!loaded}
            rows={2}
            placeholder="What action does your robot take?"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="hr-sketch" className="block text-sm font-semibold text-foreground">
            Describe your labeled design / sketch
          </label>
          <p className="mt-1 text-xs text-muted-foreground">
            Draw your robot on paper and label its parts, then describe the sketch here so it is
            saved with your design.
          </p>
          <textarea
            key={`sketch-${loaded}`}
            id="hr-sketch"
            defaultValue={initial.sketch ?? ""}
            onBlur={(e) => saveField("sketch", e.target.value)}
            disabled={!loaded}
            rows={3}
            placeholder="What does your sketch show, and what are the labeled parts?"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="hr-safety" className="block text-sm font-semibold text-foreground">
            One safety or responsibility consideration
          </label>
          <textarea
            key={`safety-${loaded}`}
            id="hr-safety"
            defaultValue={initial.safety ?? ""}
            onBlur={(e) => saveField("safety", e.target.value)}
            disabled={!loaded}
            rows={2}
            placeholder="How will you keep it safe and use it responsibly?"
            className={fieldClass}
          />
        </div>
      </div>

      {complete && (
        <p className="mt-5 text-sm font-semibold text-avanza-green-dark" role="status">
          Saved. Your Helpful Robot design is complete.
        </p>
      )}
    </div>
  )
}

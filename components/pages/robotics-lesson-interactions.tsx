"use client"

import {
  ROBOTICS_EQUIPMENT_PATHS,
  type Activity,
  type EquipmentPathId,
  type InteractiveActivityKind,
  type PredictionPrompt,
  type ReflectionPrompt,
} from "@/features/curriculums/robotics"
import { useRoboticsProgress } from "@/components/ui/useRoboticsProgress"
import { RobotOrNot } from "@/components/pages/robotics-robot-or-not"
import { RobotSystemMapper } from "@/components/pages/robotics-system-mapper"
import { HelpfulRobotDesigner } from "@/components/pages/robotics-helpful-robot"
import { VirtualChassisLab } from "@/components/pages/robotics-chassis-lab"
import { SensorInvestigationLab } from "@/components/pages/robotics-sensor-lab"

/** Renders the interactive widget attached to an activity (saves real work). */
function InteractiveActivity({ kind, activityId }: { kind: InteractiveActivityKind; activityId: string }) {
  switch (kind) {
    case "robot-or-not":
      return <RobotOrNot activityId={activityId} />
    case "system-mapper":
      return <RobotSystemMapper activityId={activityId} />
    case "helpful-robot":
      return <HelpfulRobotDesigner activityId={activityId} />
    case "chassis-lab":
      return <VirtualChassisLab activityId={activityId} />
    case "sensor-lab":
      return <SensorInvestigationLab activityId={activityId} />
  }
}

const chip =
  "rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"

/**
 * Lets the student pick which of the three paths they are doing this course on
 * (kit / simulator / unplugged). The choice is saved and shared across the
 * course, and every activity below shows that path's version. Switching paths
 * never clears any saved work.
 */
export function RoboticsEquipmentPathPicker() {
  const { loaded, equipmentPath, selectEquipmentPath } = useRoboticsProgress()

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <p className="text-sm font-semibold text-foreground">Choose your path</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Do this course with a robot kit, the browser simulator, or unplugged with household
        materials. Pick one - you can switch anytime without losing your work.
      </p>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Equipment path">
        {ROBOTICS_EQUIPMENT_PATHS.map((path) => {
          const active = equipmentPath === path.id
          return (
            <button
              key={path.id}
              type="button"
              onClick={() => selectEquipmentPath(path.id)}
              disabled={!loaded}
              aria-pressed={active}
              className={
                chip +
                " " +
                (active
                  ? "border-avanza-green bg-avanza-green/10 text-avanza-green-dark"
                  : "border-border text-foreground hover:border-avanza-green/60") +
                " disabled:cursor-not-allowed disabled:opacity-50"
              }
            >
              {path.label}
            </button>
          )
        })}
      </div>
      {loaded && (
        <p className="mt-3 text-xs text-muted-foreground">
          {equipmentPath
            ? ROBOTICS_EQUIPMENT_PATHS.find((p) => p.id === equipmentPath)?.needs
            : "No path chosen yet - activities below show the robot-kit version by default."}
        </p>
      )}
    </div>
  )
}

/**
 * One activity, shown for the student's chosen path. Renders the shared framing
 * plus the selected path's variant (materials, instructions, safety, expected
 * result, success criteria, troubleshooting, optional extension). Falls back to
 * the kit variant before a path is picked.
 */
export function RoboticsActivity({ activity }: { activity: Activity }) {
  const { loaded, equipmentPath, progress, saveActivityResult } = useRoboticsProgress()
  const pathId: EquipmentPathId = equipmentPath ?? "kit"
  const variant = activity.variants[pathId]
  const pathLabel = ROBOTICS_EQUIPMENT_PATHS.find((p) => p.id === pathId)?.label ?? "Robot kit"
  const done = progress.activityResults[activity.id]?.completed ?? false

  return (
    <div className="mt-6 rounded-lg border border-border p-5 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-bold text-foreground">{activity.title}</h3>
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {pathLabel}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{activity.goal}</p>

      {activity.shared.length > 0 && (
        <ul className="mt-4 space-y-2">
          {activity.shared.map((line, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-green" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 rounded-md border border-border bg-secondary p-4">
        <p className="text-sm font-bold text-foreground">{variant.title}</p>

        {variant.materials.length > 0 && (
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">You need: </span>
            {variant.materials.join(", ")}
          </p>
        )}

        <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">Steps</p>
        <ol className="mt-2 space-y-1.5">
          {variant.instructions.map((step, i) => (
            <li key={i} className="grid grid-cols-[1.5rem_1fr] gap-2 text-sm leading-relaxed text-foreground/90">
              <span className="font-mono text-xs font-semibold text-muted-foreground">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <p className="text-sm text-foreground/90">
            <span className="font-semibold text-foreground">What success looks like: </span>
            {variant.expectedResult}
          </p>
          {variant.successCriteria.length > 0 && (
            <div className="text-sm text-foreground/90">
              <span className="font-semibold text-foreground">Check for:</span>
              <ul className="mt-1 space-y-1">
                {variant.successCriteria.map((c, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-avanza-green" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {variant.safetyNotes.length > 0 && (
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Safety: </span>
            {variant.safetyNotes.join(" ")}
          </p>
        )}

        {variant.troubleshooting.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              If it doesn&apos;t work
            </p>
            <dl className="mt-1 space-y-1 text-sm">
              {variant.troubleshooting.map((tip, i) => (
                <div key={i} className="text-foreground/90">
                  <dt className="inline font-semibold text-foreground">{tip.problem} </dt>
                  <dd className="inline text-muted-foreground">- {tip.fix}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {variant.extension && (
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Go further: </span>
            {variant.extension}
          </p>
        )}
      </div>

      {activity.interactive && (
        <div className="mt-6">
          <InteractiveActivity kind={activity.interactive} activityId={activity.id} />
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => saveActivityResult(activity.id, { pathId, completed: !done })}
          disabled={!loaded}
          aria-pressed={done}
          className={
            "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 " +
            (done
              ? "border-avanza-green bg-avanza-green/10 text-avanza-green-dark"
              : "border-border text-foreground hover:border-avanza-green/60")
          }
        >
          {done ? "✓ Marked as done" : "Mark this activity done"}
        </button>
      </div>
    </div>
  )
}


/** Prediction prompts saved as the student types (predict-then-test). */
export function RoboticsPredictions({ prompts }: { prompts: PredictionPrompt[] }) {
  const { loaded, savePrediction, progress } = useRoboticsProgress()
  if (prompts.length === 0) return null

  return (
    <div className="space-y-5">
      {prompts.map((p) => (
        <div key={p.id}>
          <label htmlFor={`pred-${p.id}`} className="block text-sm font-semibold text-foreground">
            {p.prompt}
          </label>
          <p className="mt-1 text-xs text-muted-foreground">How to check: {p.howToCheck}</p>
          <textarea
            id={`pred-${p.id}`}
            defaultValue={progress.predictions[p.id] ?? ""}
            onBlur={(e) => savePrediction(p.id, e.target.value)}
            disabled={!loaded}
            rows={2}
            placeholder="Write your prediction..."
            className="mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"
          />
        </div>
      ))}
    </div>
  )
}

/** Reflection prompts saved as the student types. */
export function RoboticsReflection({ prompts }: { prompts: ReflectionPrompt[] }) {
  const { loaded, saveReflection, progress } = useRoboticsProgress()
  if (prompts.length === 0) return null

  return (
    <div className="space-y-5">
      {prompts.map((p) => (
        <div key={p.id}>
          <label htmlFor={`refl-${p.id}`} className="block text-sm font-semibold text-foreground">
            {p.prompt}
          </label>
          <textarea
            id={`refl-${p.id}`}
            defaultValue={progress.reflections[p.id] ?? ""}
            onBlur={(e) => saveReflection(p.id, e.target.value)}
            disabled={!loaded}
            rows={2}
            placeholder="Write your reflection..."
            className="mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"
          />
        </div>
      ))}
    </div>
  )
}

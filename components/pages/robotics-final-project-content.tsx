"use client"

import { useState } from "react"
import Link from "next/link"
import {
  roboticsCurriculum,
  roboticsLessonPath,
  roboticsPath,
  type FinalProjectRequirement,
} from "@/features/curriculums/robotics"
import { useRoboticsProgress } from "@/components/ui/useRoboticsProgress"
import { RoboticsBlockEditor } from "@/components/pages/robotics-block-editor"
import { PrintButton } from "@/components/ui/print-button"

const textareaClass =
  "mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"

const cellClass =
  "w-full rounded-md border border-border bg-card px-2 py-1.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"

/**
 * Stable planning-brief fields, keyed by id (never by display text). These are
 * the required planning captures for the final project; the program itself is
 * captured by the block editor and the three runs by the test table below.
 */
const PLAN_FIELDS: { id: string; label: string; hint: string; rows: number }[] = [
  { id: "problem", label: "Problem", hint: "The real problem your robot solves, and why it matters.", rows: 2 },
  { id: "intended-user", label: "Intended user", hint: "Who this robot is for and what they need.", rows: 2 },
  { id: "required-behavior", label: "Required robot behavior", hint: "What the robot MUST do, step by step, to do the job.", rows: 3 },
  { id: "safety-limits", label: "Safety limits", hint: "What the robot must never do, and when it should stop.", rows: 2 },
  { id: "sensors", label: "Sensors", hint: "Which sensor(s) the robot uses and what each one reads.", rows: 2 },
  { id: "outputs", label: "Outputs", hint: "What the robot does or shows: movement, sound, or light.", rows: 2 },
  { id: "materials", label: "Materials", hint: "The parts (or simulator blocks and zones) you need.", rows: 2 },
  { id: "labeled-design", label: "Labeled design", hint: "Describe your drawing and the parts you labeled.", rows: 3 },
  { id: "ipo-diagram", label: "Input - processing - output", hint: "What the robot senses, decides, and does.", rows: 3 },
  { id: "flowchart", label: "Flowchart", hint: "The step-by-step order of the program, with its decision.", rows: 3 },
  { id: "test-plan", label: "Test plan", hint: "How you will test it and what counts as a pass.", rows: 2 },
  { id: "revision", label: "Revision", hint: "The one improvement you made after testing, and its effect.", rows: 2 },
  { id: "final-explanation", label: "Final explanation", hint: "How the robot helps, how you know it works, and how it stays safe.", rows: 3 },
]

const TEST_COLUMNS = ["Run", "What happened", "Mission complete? (Y/N)", "What to change"]

const REQUIREMENT_CATEGORIES: {
  id: FinalProjectRequirement["category"]
  label: string
}[] = [
  { id: "planning", label: "Planning" },
  { id: "mechanical", label: "Mechanical" },
  { id: "programming", label: "Programming" },
  { id: "testing", label: "Testing" },
  { id: "communication", label: "Communication" },
]

const RUBRIC_LEVELS = ["Beginning", "Developing", "Proficient", "Exemplary"]

/**
 * The Week 8 final-project workspace. The student picks a mission, writes a
 * planning brief, records three test runs, and self-scores against the rubric.
 * Every interactive piece saves through `useRoboticsProgress`, keyed by stable
 * ids. Progress loads only after mount, so the server and first client render
 * use the neutral empty state (no hydration mismatch); inputs stay disabled and
 * are re-keyed on `loaded` so saved values appear once hydrated.
 */
export function RoboticsFinalProjectContent() {
  const finalModule = roboticsCurriculum.modules.find((m) => m.isFinal)

  const { loaded, progress, setFinalMissionChoice, saveFinalPlanField, saveFinalTestResults, saveFinalSelfEval } =
    useRoboticsProgress()

  // Seed the test table from saved progress (used to initialise the child
  // component's local state; the child is re-keyed on `loaded`).
  const requiredTestRuns = finalModule?.finalProject?.requiredTestRuns ?? 0
  const savedRows = progress.finalProject.testResults?.rows ?? []
  const initialRows: string[][] = Array.from({ length: requiredTestRuns }, (_, r) =>
    Array.from({ length: TEST_COLUMNS.length }, (_, c) => savedRows[r]?.[c] ?? ""),
  )

  if (!finalModule || !finalModule.finalProject) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm text-muted-foreground">The final project isn&apos;t available right now.</p>
      </div>
    )
  }

  const fp = finalModule.finalProject
  const finalProject = progress.finalProject

  // Weighted rubric score. Each level is worth a quarter of its category's
  // weight (Beginning = 1/4 ... Exemplary = 4/4); the total is out of 100.
  const LEVEL_POINTS: Record<string, number> = { Beginning: 1, Developing: 2, Proficient: 3, Exemplary: 4 }
  const scoredCategories = fp.rubric.filter((c) => finalProject.selfEvaluation[c.id])
  const allScored = scoredCategories.length === fp.rubric.length
  const estimatedScore = Math.round(
    fp.rubric.reduce((sum, c) => {
      const level = finalProject.selfEvaluation[c.id]
      const points = level ? LEVEL_POINTS[level] ?? 0 : 0
      return sum + c.weightPercent * (points / 4)
    }, 0),
  )

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Header */}
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Final project</p>
        <h1 className="mt-3 text-2xl font-extrabold text-foreground md:text-3xl">{fp.title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-foreground/90">{fp.overview}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            href={roboticsLessonPath(finalModule.slug)}
            className="text-sm font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
          >
            Open the Week {finalModule.week} lesson
          </Link>
          <Link
            href={roboticsPath}
            className="text-sm font-medium text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
          >
            Back to course overview
          </Link>
          <PrintButton label="Print project brief" tone="green" className="ml-auto" />
        </div>
      </header>

      {/* Choose your mission */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-foreground">Choose your mission</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick one mission for your robot. Your choice is saved on this device.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {fp.missionChoices.map((choice) => {
            const active = loaded && finalProject.missionChoiceId === choice.id
            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => setFinalMissionChoice(choice.id)}
                disabled={!loaded}
                aria-pressed={active}
                className={
                  "flex flex-col rounded-lg border p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 " +
                  (active
                    ? "border-avanza-green bg-avanza-green/10"
                    : "border-border hover:border-avanza-green/60")
                }
              >
                <span className="text-base font-bold text-foreground">{choice.name}</span>
                <span className="mt-2 text-sm leading-relaxed text-foreground/90">{choice.scenario}</span>
                <span className="mt-3 text-sm text-foreground/90">
                  <span className="font-semibold text-foreground">Example goal: </span>
                  {choice.exampleGoal}
                </span>
                {choice.sensorIdeas.length > 0 && (
                  <span className="mt-3 block text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Sensor ideas: </span>
                    {choice.sensorIdeas.join("; ")}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </section>

      {/* Planning brief */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-foreground">Planning brief</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Write your plan before you build. Each box saves when you click away.
        </p>
        <div className="mt-5 space-y-5">
          {PLAN_FIELDS.map((field) => (
            <div key={`${field.id}:${loaded}`}>
              <label htmlFor={`plan-${field.id}`} className="block text-sm font-semibold text-foreground">
                {field.label}
              </label>
              <p className="mt-1 text-xs text-muted-foreground">{field.hint}</p>
              <textarea
                id={`plan-${field.id}`}
                defaultValue={finalProject.plan[field.id] ?? ""}
                onBlur={(e) => saveFinalPlanField(field.id, e.target.value)}
                disabled={!loaded}
                rows={field.rows}
                placeholder="Write here..."
                className={textareaClass}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Program your robot (block editor + simulator) */}
      <section className="mt-12 print-hidden">
        <h2 className="text-lg font-bold text-foreground">Program your robot</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Build and run your mission program from your flowchart. Use a sequence, a loop, a
          condition on a sensor, and a safe stop. On the kit path, mirror these steps in your
          robot&apos;s app; unplugged, act the blocks out on your floor course. Your program and each
          run save on this device.
        </p>
        <div className="mt-5">
          <RoboticsBlockEditor
            specId="w8-prog-final"
            mission="final-project"
            title="Final mission program"
            description="Program your chosen mission: leave the start, use a sensor to react to the world, do the job, and stop safely at the goal."
          />
        </div>
      </section>

      {/* What your robot must include */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-foreground">What your robot must include</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A checklist to plan and check your build against. This is a reference - it is not saved.
        </p>
        <div className="mt-5 space-y-6">
          {REQUIREMENT_CATEGORIES.map((cat) => {
            const items = fp.requirements.filter((req) => req.category === cat.id)
            if (items.length === 0) return null
            return (
              <div key={cat.id} className="rounded-lg border border-border bg-card p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{cat.label}</p>
                <ul className="mt-3 space-y-3">
                  {items.map((req) => (
                    <li key={req.id} className="flex gap-3 text-sm leading-relaxed">
                      <span
                        aria-hidden
                        className="mt-1.5 h-3.5 w-3.5 flex-none rounded-sm border border-border"
                      />
                      <span className="text-foreground/90">
                        <span className="font-semibold text-foreground">{req.label}</span>
                        <span
                          className={
                            "ml-2 text-xs font-semibold uppercase tracking-wide " +
                            (req.required ? "text-avanza-green-dark" : "text-muted-foreground")
                          }
                        >
                          {req.required ? "Required" : "Stretch"}
                        </span>
                        <span className="mt-0.5 block text-muted-foreground">{req.description}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* Three test runs */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-foreground">Three test runs</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Run your mission {fp.requiredTestRuns} times and record what happened. Each cell saves when you click
          away.
        </p>
        <TestRunsTable
          key={String(loaded)}
          runs={fp.requiredTestRuns}
          initialRows={initialRows}
          disabled={!loaded}
          onSave={saveFinalTestResults}
        />
      </section>

      {/* Score your work (rubric) */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-foreground">Score your work</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Read each level and pick where your project lands. Your scores save on this device.
        </p>
        <div className="mt-5 space-y-5">
          {fp.rubric.map((category) => (
            <div key={category.id} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-semibold text-foreground">{category.name}</p>
                <span className="flex-none text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {category.weightPercent}% of grade
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
              <dl className="mt-3 space-y-1 text-sm">
                {category.levels.map((level) => (
                  <div key={level.label} className="text-foreground/90">
                    <dt className="inline font-semibold text-foreground">{level.label}: </dt>
                    <dd className="inline text-muted-foreground">{level.descriptor}</dd>
                  </div>
                ))}
              </dl>
              <label
                htmlFor={`rubric-${category.id}`}
                className="mt-4 block text-xs font-bold uppercase tracking-wide text-muted-foreground"
              >
                My level
              </label>
              <select
                id={`rubric-${category.id}`}
                value={finalProject.selfEvaluation[category.id] ?? ""}
                onChange={(e) => saveFinalSelfEval(category.id, e.target.value)}
                disabled={!loaded}
                className="mt-2 w-full max-w-xs rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"
              >
                <option value="">Not scored yet</option>
                {RUBRIC_LEVELS.map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Weighted estimated score */}
        <div className="mt-6 rounded-lg border border-avanza-green/40 bg-avanza-green/5 p-5">
          {allScored ? (
            <p className="text-sm font-semibold text-foreground">
              Estimated score: <span className="text-avanza-green-dark">{estimatedScore}%</span>
            </p>
          ) : (
            <p className="text-sm font-semibold text-foreground">
              Estimated score so far: <span className="text-avanza-green-dark">{estimatedScore}%</span>{" "}
              <span className="font-normal text-muted-foreground">
                ({scoredCategories.length} of {fp.rubric.length} categories scored)
              </span>
            </p>
          )}
          <p className="mt-2 text-sm text-muted-foreground">
            Each category is weighted by how much it counts toward the grade. A simple, reliable,
            well-tested robot that meets the requirements scores highly - you do not need extra
            features to do well.
          </p>
        </div>
      </section>

      <p className="mt-10 text-xs text-muted-foreground">
        Everything on this page is saved on this device only.
      </p>
    </div>
  )
}

/**
 * The editable three-run test table. Owns its own row state (seeded from saved
 * progress) so cell edits never write a ref during render. The parent re-keys it
 * on `loaded`, which re-seeds the state once progress has hydrated. Each edit
 * saves the full rows grid through `onSave`.
 */
function TestRunsTable({
  runs,
  initialRows,
  disabled,
  onSave,
}: {
  runs: number
  initialRows: string[][]
  disabled: boolean
  onSave: (rows: string[][]) => void
}) {
  const [rows, setRows] = useState<string[][]>(initialRows)

  const updateCell = (r: number, c: number, value: string) => {
    const next = rows.map((row) => [...row])
    if (!next[r]) next[r] = Array.from({ length: TEST_COLUMNS.length }, () => "")
    next[r][c] = value
    setRows(next)
    onSave(next)
  }

  return (
    <div className="mt-5 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-secondary">
            {TEST_COLUMNS.map((col) => (
              <th
                key={col}
                className="border-b border-border px-3 py-2 text-xs font-bold uppercase tracking-wide text-muted-foreground"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: runs }, (_, r) => (
            <tr key={r} className="align-top">
              {TEST_COLUMNS.map((col, c) => (
                <td key={c} className="border-b border-border px-3 py-2">
                  {c === 0 ? (
                    <span className="font-mono text-sm font-semibold text-muted-foreground">{r + 1}</span>
                  ) : (
                    <input
                      type="text"
                      defaultValue={rows[r]?.[c] ?? ""}
                      onBlur={(e) => updateCell(r, c, e.target.value)}
                      disabled={disabled}
                      aria-label={`Run ${r + 1} - ${col}`}
                      className={cellClass}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

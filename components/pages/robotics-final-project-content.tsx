"use client"

import { useState } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import type { Translations } from "@/i18n/translations"
import { getRoboticsModules } from "@/features/curriculums/robotics/i18n"
import Link from "next/link"
import {
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
type FinalStrings = Translations["courseUi"]["robotics"]["final"]

const planFields = (F: FinalStrings): { id: string; label: string; hint: string; rows: number }[] => [
  { id: "problem", label: F.planProblem, hint: F.planProblemHint, rows: 2 },
  { id: "intended-user", label: F.planUser, hint: F.planUserHint, rows: 2 },
  { id: "required-behavior", label: F.planBehavior, hint: F.planBehaviorHint, rows: 3 },
  { id: "safety-limits", label: F.planSafety, hint: F.planSafetyHint, rows: 2 },
  { id: "sensors", label: F.planSensors, hint: F.planSensorsHint, rows: 2 },
  { id: "outputs", label: F.planOutputs, hint: F.planOutputsHint, rows: 2 },
  { id: "materials", label: F.planMaterials, hint: F.planMaterialsHint, rows: 2 },
  { id: "labeled-design", label: F.planDesign, hint: F.planDesignHint, rows: 3 },
  { id: "ipo-diagram", label: F.planIpo, hint: F.planIpoHint, rows: 3 },
  { id: "flowchart", label: F.planFlowchart, hint: F.planFlowchartHint, rows: 3 },
  { id: "test-plan", label: F.planTestPlan, hint: F.planTestPlanHint, rows: 2 },
  { id: "revision", label: F.planRevision, hint: F.planRevisionHint, rows: 2 },
  { id: "final-explanation", label: F.planExplanation, hint: F.planExplanationHint, rows: 3 },
]

const testColumns = (F: FinalStrings) => [F.colRun, F.colWhatHappened, F.colMissionComplete, F.colWhatToChange]

const requirementCategories = (
  F: FinalStrings,
): { id: FinalProjectRequirement["category"]; label: string }[] => [
  { id: "planning", label: F.catPlanning },
  { id: "mechanical", label: F.catMechanical },
  { id: "programming", label: F.catProgramming },
  { id: "testing", label: F.catTesting },
  { id: "communication", label: F.catCommunication },
]

/**
 * The rubric levels, in order. These strings are the stored scoring keys - they
 * index `LEVEL_POINTS` below and are typed as `RubricLevel["label"]` - so they
 * stay English everywhere. `t.courseUi.rubricLevels` supplies what the student
 * actually reads.
 */
const RUBRIC_LEVELS = ["Beginning", "Developing", "Proficient", "Exemplary"] as const

/**
 * The Week 8 final-project workspace. The student picks a mission, writes a
 * planning brief, records three test runs, and self-scores against the rubric.
 * Every interactive piece saves through `useRoboticsProgress`, keyed by stable
 * ids. Progress loads only after mount, so the server and first client render
 * use the neutral empty state (no hydration mismatch); inputs stay disabled and
 * are re-keyed on `loaded` so saved values appear once hydrated.
 */
export function RoboticsFinalProjectContent() {
  const { language, t } = useLanguage()
  const ui = t.courseUi.robotics
  const F = ui.final
  const PLAN_FIELDS = planFields(F)
  const TEST_COLUMNS = testColumns(F)
  const REQUIREMENT_CATEGORIES = requirementCategories(F)
  const levelName = (label: string) => t.courseUi.rubricLevels[label as keyof typeof t.courseUi.rubricLevels] ?? label
  const finalModule = getRoboticsModules(language).find((m) => m.isFinal)

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
        <p className="text-sm text-muted-foreground">{F.notAvailable}</p>
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
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{ui.finalProject}</p>
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
            {ui.progress.backToOverview}
          </Link>
          <PrintButton label={F.printBrief} tone="green" className="ml-auto" />
        </div>
      </header>

      {/* Choose your mission */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-foreground">{F.chooseMission}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {F.chooseMissionIntro}
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
                  <span className="font-semibold text-foreground">{F.exampleGoal}</span>
                  {choice.exampleGoal}
                </span>
                {choice.sensorIdeas.length > 0 && (
                  <span className="mt-3 block text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{F.sensorIdeas}</span>
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
        <h2 className="text-lg font-bold text-foreground">{F.planningBrief}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {F.planningIntro}
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
                placeholder={F.writeHere}
                className={textareaClass}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Program your robot (block editor + simulator) */}
      <section className="mt-12 print-hidden">
        <h2 className="text-lg font-bold text-foreground">{F.programRobot}</h2>
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
            title={F.programTitle}
            description={F.programDescription}
          />
        </div>
      </section>

      {/* What your robot must include */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-foreground">{F.mustInclude}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {F.checklistIntro}
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
                          {req.required ? F.required : F.stretch}
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
        <h2 className="text-lg font-bold text-foreground">{F.threeTestRuns}</h2>
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
        <h2 className="text-lg font-bold text-foreground">{F.scoreWork}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {F.scoreIntro}
        </p>
        <div className="mt-5 space-y-5">
          {fp.rubric.map((category) => (
            <div key={category.id} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-semibold text-foreground">{category.name}</p>
                <span className="flex-none text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {F.percentOfGrade.replace("{n}", String(category.weightPercent))}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
              <dl className="mt-3 space-y-1 text-sm">
                {category.levels.map((level) => (
                  <div key={level.label} className="text-foreground/90">
                    <dt className="inline font-semibold text-foreground">{levelName(level.label)}: </dt>
                    <dd className="inline text-muted-foreground">{level.descriptor}</dd>
                  </div>
                ))}
              </dl>
              <label
                htmlFor={`rubric-${category.id}`}
                className="mt-4 block text-xs font-bold uppercase tracking-wide text-muted-foreground"
              >
                {F.myLevel}
              </label>
              <select
                id={`rubric-${category.id}`}
                value={finalProject.selfEvaluation[category.id] ?? ""}
                onChange={(e) => saveFinalSelfEval(category.id, e.target.value)}
                disabled={!loaded}
                className="mt-2 w-full max-w-xs rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"
              >
                <option value="">{F.notScoredYet}</option>
                {RUBRIC_LEVELS.map((label) => (
                  <option key={label} value={label}>
                    {levelName(label)}
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
              {F.estimatedScore} <span className="text-avanza-green-dark">{estimatedScore}%</span>
            </p>
          ) : (
            <p className="text-sm font-semibold text-foreground">
              {F.estimatedScoreSoFar} <span className="text-avanza-green-dark">{estimatedScore}%</span>{" "}
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
        {F.savedOnDevice}
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
  const TEST_COLUMNS = testColumns(useLanguage().t.courseUi.robotics.final)
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

"use client"

import Link from "next/link"
import {
  roboticsCurriculum,
  roboticsLessonPath,
  roboticsPath,
  roboticsTeacherGuidePath,
  roboticsWorksheetPath,
} from "@/features/curriculums/robotics"
import { useRoboticsProgress } from "@/components/ui/useRoboticsProgress"
import { countStatements } from "@/features/curriculums/robotics-program"
import type { RoboticsModuleStatus } from "@/features/curriculums/robotics-progress"

const MODULES = [...roboticsCurriculum.modules].sort((a, b) => a.order - b.order)

// Look-up tables so saved artifacts (keyed by stable id) can show their titles.
const PROGRAM_SPECS = new Map(MODULES.flatMap((m) => m.savedPrograms).map((s) => [s.id, s]))
const SIM_MISSIONS = new Map(MODULES.flatMap((m) => m.simulatorMissions).map((s) => [s.id, s]))
const PREDICTION_PROMPTS = new Map(MODULES.flatMap((m) => m.predictionPrompts).map((p) => [p.id, p]))
const TEST_RECORDS = new Map(MODULES.flatMap((m) => m.testRecords).map((r) => [r.id, r]))
const DEBUG_MISSIONS = new Map(MODULES.flatMap((m) => m.debuggingMissions).map((d) => [d.id, d]))
// Journal + knowledge-check questions carry their owning week, so entries can be grouped/labelled.
const JOURNAL_PROMPTS = new Map(
  MODULES.flatMap((m) => m.journalPrompts.map((p) => [p.id, { module: m, prompt: p }] as const)),
)
const KNOWLEDGE_CHECK_MODULES = new Map(MODULES.map((m) => [m.knowledgeCheck.id, m]))

/** True when a filled test table has at least one non-empty cell. */
function hasFilledCell(rows: string[][]): boolean {
  return rows.some((row) => row.some((cell) => cell.trim() !== ""))
}

const STATUS_LABEL: Record<RoboticsModuleStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  "not-started": "Not started",
  locked: "Locked",
}

const roboticsJournalPath = `${roboticsPath}/journal`
const roboticsFinalProjectPath = `${roboticsPath}/final-project`

const greenButton =
  "inline-flex items-center rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"

/**
 * The main call-to-action for the review area, derived from live progress.
 * Mirrors the resolveCta pattern in robotics-progress-ui.tsx: start when there is
 * no progress, finish when the course is complete, otherwise resume in place.
 */
function resolveCta(state: {
  loaded: boolean
  hasProgress: boolean
  complete: boolean
  resumePath: string
}): { href: string; label: string } {
  if (!state.loaded || !state.hasProgress) {
    return { href: roboticsLessonPath(MODULES[0].slug), label: "Start Week 1" }
  }
  if (state.complete) {
    return { href: roboticsPath, label: "You've finished the course" }
  }
  return { href: state.resumePath, label: "Continue where you left off" }
}

/**
 * The course review area: overall completion, a resume call-to-action, and a
 * per-week list with each week's status, knowledge-check score, and a link into
 * the lesson. Reads progress in an effect after mount (via the hook), so the
 * server and first client render use the neutral empty state - no hydration
 * mismatch. Matches the visual style of robotics-progress-ui.tsx.
 */
export function RoboticsReviewContent() {
  const { loaded, completion, hasProgress, resume, status, progress } = useRoboticsProgress()

  const savedPrograms = Object.values(progress.savedPrograms)
  const savedProgramAsts = Object.values(progress.savedProgramAsts)
  const savedSimulations = Object.values(progress.savedSimulatorResults)

  // Saved predictions with a non-empty response, matched to their prompt text.
  const savedPredictions = Object.entries(progress.predictions)
    .filter(([, response]) => response.trim() !== "")
    .map(([promptId, response]) => ({ promptId, response, prompt: PREDICTION_PROMPTS.get(promptId) }))

  // Filled test tables (at least one non-empty cell), matched to their record spec.
  const savedTestRecords = Object.values(progress.testRecords)
    .filter((record) => hasFilledCell(record.rows))
    .map((record) => ({ record, spec: TEST_RECORDS.get(record.recordId) }))

  // Debugging findings the student actually wrote a revision for.
  const savedDebugFindings = Object.values(progress.debugFindings)
    .filter((finding) => finding.revisionMade.trim() !== "")
    .map((finding) => ({ finding, mission: DEBUG_MISSIONS.get(finding.missionId) }))

  // Journal entries with a saved value, matched to their week + prompt.
  const savedJournalEntries = Object.values(progress.journal)
    .filter((entry) => entry.value.trim() !== "")
    .map((entry) => ({ entry, lookup: JOURNAL_PROMPTS.get(entry.promptId) }))

  // Weeks with a saved knowledge-check attempt, so their explanations can be re-read.
  const reviewableChecks = Object.values(progress.knowledgeChecks)
    .map((attempt) => KNOWLEDGE_CHECK_MODULES.get(attempt.checkId))
    .filter((module): module is (typeof MODULES)[number] => module !== undefined)
    .sort((a, b) => a.order - b.order)

  const cta = resolveCta({
    loaded,
    hasProgress,
    complete: completion.complete,
    resumePath: resume.path,
  })

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Robotics &amp; Automation
        </p>
        <h1 className="mt-3 text-2xl font-extrabold text-foreground md:text-3xl">Course review</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          A single place to see how far you have come, jump back to where you left off, and revisit
          any week. Your progress is saved on this device.
        </p>
      </header>

      {/* Overall completion */}
      <section className="mt-8 rounded-lg border border-border bg-card p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-foreground" aria-live="polite">
            {completion.completedCount} of {completion.total} weeks completed
          </p>
          <p className="text-sm text-muted-foreground">{completion.percent}%</p>
        </div>

        <div
          className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={completion.total}
          aria-valuenow={completion.completedCount}
          aria-valuetext={`${completion.completedCount} of ${completion.total} weeks completed`}
        >
          <div
            className="h-full rounded-full bg-avanza-green transition-all duration-500"
            style={{ width: `${completion.percent}%` }}
          />
        </div>

        {loaded && completion.complete && (
          <p className="mt-4 text-sm font-semibold text-foreground">
            Course complete. You have finished all {completion.total} weeks.
          </p>
        )}

        <div className="mt-5">
          <Link href={cta.href} className={greenButton}>
            {cta.label}
          </Link>
        </div>
      </section>

      {/* Empty state */}
      {loaded && !hasProgress && (
        <section className="mt-6 rounded-lg border border-border bg-secondary p-5">
          <p className="text-sm font-semibold text-foreground">You haven&apos;t started yet.</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Once you begin the course, this page will fill in with your weekly progress and knowledge
            check scores. Start with the first week whenever you are ready.
          </p>
          <div className="mt-4">
            <Link href={roboticsLessonPath(MODULES[0].slug)} className={greenButton}>
              Start Week 1
            </Link>
          </div>
        </section>
      )}

      {/* Per-week list */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-foreground">Weeks</h2>
        <ul className="mt-4 space-y-3">
          {MODULES.map((module) => {
            const moduleStatus: RoboticsModuleStatus = loaded ? status(module) : "not-started"
            const locked = loaded && moduleStatus === "locked"
            const label = module.isFinal ? "Final project" : `Week ${module.week}: ${module.title}`

            const action =
              moduleStatus === "completed"
                ? "Review"
                : moduleStatus === "in-progress"
                  ? "Continue"
                  : "Open"

            const attempt = progress.knowledgeChecks[module.knowledgeCheck.id]
            const total = module.knowledgeCheck.questions.length

            return (
              <li
                key={module.slug}
                className="rounded-lg border border-border p-4 transition-colors hover:border-avanza-green/60 md:p-5"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="md:pr-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-sm font-semibold text-muted-foreground">
                        {module.isFinal ? "Final" : `0${module.week}`}
                      </span>
                      <h3 className="text-base font-bold text-foreground">
                        {module.isFinal ? "Final project" : module.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      <span className="sr-only">{label}. </span>
                      <span className="font-semibold text-foreground">Status: </span>
                      {loaded ? STATUS_LABEL[moduleStatus] : "Not started"}
                      {loaded && attempt && (
                        <>
                          <span aria-hidden="true"> · </span>
                          <span className="font-semibold text-foreground">Knowledge check: </span>
                          {attempt.score} of {total}
                        </>
                      )}
                    </p>
                  </div>

                  <div className="flex-none md:text-right">
                    {locked ? (
                      <p className="text-sm font-medium text-muted-foreground">Locked</p>
                    ) : (
                      <Link
                        href={roboticsLessonPath(module.slug)}
                        className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-avanza-green-dark transition-colors hover:border-avanza-green hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
                      >
                        {loaded ? action : "Open"}
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Saved programs */}
      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">Saved programs</h2>
        {loaded && (savedProgramAsts.length > 0 || savedPrograms.length > 0) ? (
          <ul className="mt-4 space-y-2">
            {savedProgramAsts.map((prog) => {
              const spec = PROGRAM_SPECS.get(prog.specId)
              const count = countStatements(prog.program)
              return (
                <li key={`ast-${prog.specId}`} className="rounded-lg border border-border p-4 text-sm">
                  <p className="font-semibold text-foreground">{spec?.title ?? prog.specId}</p>
                  <p className="mt-1 text-muted-foreground">
                    {count} block{count === 1 ? "" : "s"} · revision {prog.revisions}
                    {spec ? ` · ${spec.description}` : ""}
                  </p>
                </li>
              )
            })}
            {savedPrograms
              .filter((prog) => !progress.savedProgramAsts[prog.specId])
              .map((prog) => {
                const spec = PROGRAM_SPECS.get(prog.specId)
                return (
                  <li key={prog.specId} className="rounded-lg border border-border p-4 text-sm">
                    <p className="font-semibold text-foreground">{spec?.title ?? prog.specId}</p>
                    <p className="mt-1 text-muted-foreground">
                      {prog.blocks.length} block{prog.blocks.length === 1 ? "" : "s"}
                      {spec ? ` · ${spec.description}` : ""}
                    </p>
                  </li>
                )
              })}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Programs you build and save in the programming weeks will appear here.
          </p>
        )}
      </section>

      {/* Completed simulations */}
      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">Simulator runs</h2>
        {loaded && savedSimulations.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {savedSimulations.map((run) => {
              const mission = SIM_MISSIONS.get(run.missionId)
              const label = mission?.title ?? run.missionId.replace(/-/g, " ")
              return (
                <li key={run.specId || run.missionId} className="rounded-lg border border-border p-4 text-sm">
                  <p className="font-semibold text-foreground capitalize">{label}</p>
                  <p className="mt-1 text-muted-foreground">
                    {run.success ? "Completed" : "Attempted"} · trial {run.trial} · {run.steps} step
                    {run.steps === 1 ? "" : "s"} · {run.collisions} collision{run.collisions === 1 ? "" : "s"}
                    {run.ranTooLong ? " · ran too long" : ""}
                  </p>
                  {run.revisionMade.trim() !== "" && (
                    <p className="mt-1 text-muted-foreground">
                      <span className="font-semibold text-foreground">Changed: </span>
                      {run.revisionMade}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Simulator missions you complete will be listed here.
          </p>
        )}
      </section>

      {/* Printable resources + adult guidance */}
      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">Printable resources &amp; adult guidance</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Each week has a print-friendly student worksheet and a parent &amp; teacher guide (with the
          learning purpose, pacing, common misconceptions, questions to ask, safety notes, and the
          knowledge-check answer key). Open one and use your browser&apos;s Print option.
        </p>
        <ul className="mt-4 space-y-2">
          {MODULES.map((module) => (
            <li
              key={module.slug}
              className="flex flex-col gap-2 rounded-lg border border-border p-4 text-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="font-semibold text-foreground">
                {module.isFinal ? "Final project" : `Week ${module.week}: ${module.title}`}
              </span>
              <span className="flex flex-wrap gap-x-5 gap-y-1">
                <Link
                  href={roboticsWorksheetPath(module.slug)}
                  className="font-medium text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
                >
                  Worksheet
                </Link>
                <Link
                  href={roboticsTeacherGuidePath(module.slug)}
                  className="font-medium text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
                >
                  Teacher &amp; parent guide
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Vocabulary reference */}
      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">Vocabulary reference</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Every robotics term from the course, week by week.
        </p>
        <div className="mt-4 space-y-6">
          {MODULES.map((module) => (
            <div key={module.slug}>
              <h3 className="text-sm font-bold text-foreground">
                {module.isFinal ? "Final project" : `Week ${module.week}: ${module.title}`}
              </h3>
              <dl className="mt-2 space-y-2">
                {module.vocabulary.map((term) => (
                  <div key={term.term} className="text-sm leading-relaxed">
                    <dt className="inline font-semibold text-foreground">{term.term}: </dt>
                    <dd className="inline text-muted-foreground">{term.definition}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* Predictions */}
      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">Predictions</h2>
        {loaded && savedPredictions.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {savedPredictions.map(({ promptId, response, prompt }) => (
              <li key={promptId} className="rounded-lg border border-border p-4 text-sm">
                <p className="font-semibold text-foreground">{prompt?.prompt ?? promptId}</p>
                <p className="mt-1 whitespace-pre-wrap text-muted-foreground">{response}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Predictions you write before an experiment will appear here.
          </p>
        )}
      </section>

      {/* Test records */}
      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">Test records</h2>
        {loaded && savedTestRecords.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {savedTestRecords.map(({ record, spec }) => (
              <li key={record.recordId} className="rounded-lg border border-border p-4 text-sm">
                <p className="font-semibold text-foreground">{spec?.title ?? record.recordId}</p>
                {spec && spec.columns.length > 0 && (
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm">
                      <thead>
                        <tr>
                          {spec.columns.map((column) => (
                            <th
                              key={column}
                              className="border-b border-border px-2 py-1 font-semibold text-foreground"
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {record.rows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {spec.columns.map((column, colIndex) => (
                              <td
                                key={column}
                                className="border-b border-border px-2 py-1 text-muted-foreground"
                              >
                                {row[colIndex] ?? ""}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Test tables you fill in during the testing weeks will appear here.
          </p>
        )}
      </section>

      {/* Bugs & fixes */}
      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">Bugs &amp; fixes</h2>
        {loaded && savedDebugFindings.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {savedDebugFindings.map(({ finding, mission }) => (
              <li key={finding.missionId} className="rounded-lg border border-border p-4 text-sm">
                <p className="font-semibold text-foreground">{mission?.title ?? finding.missionId}</p>
                <p className="mt-1 whitespace-pre-wrap text-muted-foreground">{finding.revisionMade}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Fixes you note in the debugging missions will appear here.
          </p>
        )}
      </section>

      {/* Journal entries */}
      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">Journal entries</h2>
        {loaded && savedJournalEntries.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {savedJournalEntries.map(({ entry, lookup }) => (
              <li
                key={`${entry.moduleId}:${entry.promptId}`}
                className="rounded-lg border border-border p-4 text-sm"
              >
                <p className="font-semibold text-foreground">
                  {lookup
                    ? `Week ${lookup.module.week} — ${lookup.prompt.prompt}`
                    : `${entry.moduleId} — ${entry.promptId}`}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-muted-foreground">{entry.value}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Design-journal answers you save will appear here.
          </p>
        )}
      </section>

      {/* Answer explanations */}
      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">Answer explanations</h2>
        {loaded && reviewableChecks.length > 0 ? (
          <div className="mt-4 space-y-6">
            {reviewableChecks.map((module) => (
              <div key={module.slug}>
                <h3 className="text-sm font-bold text-foreground">
                  {module.isFinal ? "Final project" : `Week ${module.week}: ${module.title}`}
                </h3>
                <ul className="mt-2 space-y-3">
                  {module.knowledgeCheck.questions.map((question) => (
                    <li key={question.id} className="text-sm leading-relaxed">
                      <p className="font-semibold text-foreground">{question.prompt}</p>
                      <p className="mt-1 text-muted-foreground">{question.explanation}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Once you take a knowledge check, its answer explanations will appear here to re-read.
          </p>
        )}
      </section>

      {/* Quick links */}
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6">
        <Link
          href={roboticsJournalPath}
          className="text-sm font-medium text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
        >
          Design journal
        </Link>
        <Link
          href={roboticsFinalProjectPath}
          className="text-sm font-medium text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
        >
          Final project
        </Link>
        <Link
          href={roboticsPath}
          className="text-sm font-medium text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
        >
          Back to course overview
        </Link>
      </div>
    </div>
  )
}

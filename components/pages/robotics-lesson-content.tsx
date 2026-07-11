import Link from "next/link"
import {
  nextRoboticsModule,
  previousRoboticsModule,
  roboticsLessonPath,
  roboticsPath,
  roboticsTeacherGuidePath,
  roboticsWorksheetPath,
  type RoboticsModule,
  type SavedProgramSpec,
} from "@/features/curriculums/robotics"
import {
  RoboticsLessonComplete,
  RoboticsLessonGate,
} from "@/components/pages/robotics-progress-ui"
import {
  RoboticsActivity,
  RoboticsEquipmentPathPicker,
  RoboticsPredictions,
  RoboticsReflection,
} from "@/components/pages/robotics-lesson-interactions"
import { RoboticsKnowledgeCheck } from "@/components/pages/robotics-knowledge-check"
import { RoboticsDebugMission, RoboticsTestRecord } from "@/components/pages/robotics-test-record"
import { RoboticsLessonSteps, type LessonStep } from "@/components/pages/robotics-lesson-steps"
import { RoboticsBlockEditor, type StatementType } from "@/components/pages/robotics-block-editor"
import type { MissionKind } from "@/features/curriculums/robotics-missions"

/**
 * Which simulator mission each programming week's block editor targets. Only
 * weeks that both have a saved-program spec and an entry here show the editor.
 */
const MODULE_MISSION: Record<string, MissionKind> = {
  "week-3": "timed-delivery",
  "week-4": "obstacle-detection",
  "week-5": "obstacle-avoidance",
  "week-6": "counting",
  "week-7": "autonomous-mission",
  "week-8": "final-project",
}

/**
 * Executable mission for a specific saved-program spec, keyed by `spec.id`.
 * This lets a single week offer more than one playable block-editor mission
 * (e.g. Week 3 has both a delivery path and a maze). The first saved program
 * falls back to {@link MODULE_MISSION} so every week keeps its primary mission
 * without needing an entry here; only additional missions must be listed.
 */
const PROGRAM_MISSION: Record<string, MissionKind> = {
  "w3-prog-delivery": "timed-delivery",
  "w3-prog-maze": "maze",
  "w4-prog-sensor-stop": "obstacle-detection",
  "w5-prog-obstacle": "obstacle-avoidance",
  "w5-prog-line-follow": "line-following",
  "w6-prog-counter": "counting",
  "w6-prog-debug-stopper": "debug-stopper",
  "w7-prog-practice": "autonomous-mission",
  "w8-prog-final": "final-project",
}

/**
 * Block types offered by the editor for a given saved-program spec. When a spec
 * is absent here, the editor offers the full palette. Week 3 is a
 * sequences-only week, so its programs are limited to movement and event blocks
 * (no loops, conditions, or sensor reads).
 */
const SEQUENCE_ONLY_BLOCKS: StatementType[] = [
  "move",
  "turn",
  "setSpeed",
  "stopMotors",
  "moveForDuration",
  "wait",
  "safeStop",
]
// Week 5 adds loops and conditions but not variables/counters (those arrive in
// Week 6), so its reactive programs offer everything except the data blocks.
const REACTIVE_BLOCKS: StatementType[] = [
  "move",
  "turn",
  "setSpeed",
  "stopMotors",
  "moveForDuration",
  "wait",
  "safeStop",
  "missionComplete",
  "repeat",
  "forever",
  "repeatUntil",
  "waitUntil",
  "if",
  "ifElse",
  "log",
]
const PROGRAM_ALLOWED_BLOCKS: Record<string, StatementType[]> = {
  "w3-prog-delivery": SEQUENCE_ONLY_BLOCKS,
  "w3-prog-maze": SEQUENCE_ONLY_BLOCKS,
  "w5-prog-obstacle": REACTIVE_BLOCKS,
  "w5-prog-line-follow": REACTIVE_BLOCKS,
}

type ProgramMission = {
  spec: SavedProgramSpec
  mission: MissionKind
  allowedBlocks?: StatementType[]
}

/** Resolve every saved program this week exposes to a playable mission. */
function programMissionsFor(module: RoboticsModule): ProgramMission[] {
  const resolved: ProgramMission[] = []
  module.savedPrograms.forEach((spec, index) => {
    const mission = PROGRAM_MISSION[spec.id] ?? (index === 0 ? MODULE_MISSION[module.id] : undefined)
    if (mission) resolved.push({ spec, mission, allowedBlocks: PROGRAM_ALLOWED_BLOCKS[spec.id] })
  })
  return resolved
}

/**
 * A single week's lesson page (/courses/robotics/[lesson]).
 *
 * Because the course is one lesson per week, this page IS the weekly module
 * overview and the lesson. It reads entirely from the passed `RoboticsModule`.
 * The whole body is wrapped in `RoboticsLessonGate`, which shows a clear
 * "finish Week N first" message (with a link) when the week is locked, and marks
 * the week started when it is open.
 */
export function RoboticsLessonContent({ module }: { module: RoboticsModule }) {
  const previous = previousRoboticsModule(module.slug)
  const next = nextRoboticsModule(module.slug)
  const label = module.isFinal ? "Final project" : `Week ${module.week}`

  const hasPredict = module.predictionPrompts.length > 0
  const hasTest = module.testRecords.length > 0 || module.debuggingMissions.length > 0
  const programMissions = programMissionsFor(module)
  const hasProgram = programMissions.length > 0

  // Only include steps that this week actually has, keeping the canonical order.
  const steps: LessonStep[] = [
    { key: "learn", label: "Learn", sectionId: "lesson-learn" },
    { key: "do", label: "Do", sectionId: "lesson-do" },
    ...(hasProgram ? [{ key: "program", label: "Program", sectionId: "lesson-program" }] : []),
    ...(hasPredict ? [{ key: "predict", label: "Predict", sectionId: "lesson-predict" }] : []),
    ...(hasTest ? [{ key: "test", label: "Test & improve", sectionId: "lesson-test" }] : []),
    { key: "check", label: "Knowledge check", sectionId: "lesson-check" },
    { key: "reflect", label: "Reflect", sectionId: "lesson-reflect" },
  ]

  return (
    <RoboticsLessonGate module={module}>
      <article className="bg-background">
        {/* Breadcrumb + header */}
        <header className="border-b border-border">
          <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link href={roboticsPath} className="underline underline-offset-2 hover:text-foreground">
                Robotics &amp; Automation
              </Link>
              <span aria-hidden> / </span>
              <span className="text-foreground">{label}</span>
            </nav>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {label}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">{module.title}</h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/90">{module.subtitle}</p>

            <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              <li className="font-medium text-foreground">{module.estimatedTime}</li>
              <li aria-hidden className="text-border">|</li>
              <li className="font-medium text-foreground">Mission: {module.mainMission}</li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link
                href={roboticsWorksheetPath(module.slug)}
                className="font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
              >
                Printable worksheet
              </Link>
              <Link
                href={roboticsTeacherGuidePath(module.slug)}
                className="font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
              >
                Parent &amp; teacher guide
              </Link>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 pb-12 md:pb-16">
          <RoboticsLessonSteps moduleId={module.id} steps={steps} />

          {/* Summary */}
          <p className="mt-8 text-base leading-relaxed text-foreground/90">{module.summary}</p>

          {/* Learning goals */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-foreground">By the end of this week you can</h2>
            <ul className="mt-4 space-y-2">
              {module.learningGoals.map((goal) => (
                <li key={goal.id} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-green" />
                  <span>{goal.text}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Learn: concepts */}
          <section id="lesson-learn" className="mt-12 scroll-mt-20">
            <h2 className="text-xl font-bold text-foreground">Learn</h2>
            <div className="mt-4 space-y-6">
              {module.concepts.map((concept) => (
                <div key={concept.id}>
                  <h3 className="font-bold text-foreground">{concept.title}</h3>
                  {concept.body.map((para, i) => (
                    <p key={i} className="mt-2 text-sm leading-relaxed text-foreground/90">
                      {para}
                    </p>
                  ))}
                  {concept.examples && concept.examples.length > 0 && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">For example: </span>
                      {concept.examples.join("; ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Vocabulary */}
          <section className="mt-12">
            <h2 className="text-xl font-bold text-foreground">Words to know</h2>
            <dl className="mt-4 space-y-3">
              {module.vocabulary.map((term) => (
                <div key={term.term} className="text-sm leading-relaxed">
                  <dt className="inline font-semibold text-foreground">{term.term}: </dt>
                  <dd className="inline text-foreground/90">{term.definition}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Stay safe (contextual safety for this week's activities) */}
          {module.safetyNotes.length > 0 && (
            <section id="lesson-safety" className="mt-12 scroll-mt-20">
              <div className="rounded-md border border-avanza-orange/50 bg-avanza-orange/5 p-5">
                <h2 className="text-base font-bold text-foreground">Stay safe</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Read these before you build or run a robot this week.
                </p>
                <ul className="mt-3 space-y-2">
                  {module.safetyNotes.map((note) => (
                    <li key={note.id} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                      <span
                        className={
                          "mt-px flex-none font-bold uppercase tracking-wide " +
                          (note.severity === "caution" ? "text-avanza-orange-dark" : "text-muted-foreground")
                        }
                      >
                        {note.severity === "caution" ? "Caution:" : "Note:"}
                      </span>
                      <span>{note.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Choose a path + activities */}
          <section id="lesson-do" className="mt-12 scroll-mt-20">
            <h2 className="text-xl font-bold text-foreground">Do it</h2>
            <div className="mt-4">
              <RoboticsEquipmentPathPicker />
            </div>
            {module.activities.map((activity) => (
              <RoboticsActivity key={activity.id} activity={activity} />
            ))}
          </section>

          {/* Program the robot (block editor + simulator) */}
          {hasProgram && (
            <section id="lesson-program" className="mt-12 scroll-mt-20">
              <h2 className="text-xl font-bold text-foreground">Program the robot</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Build a program from blocks, then run it on the simulator. On the kit path, use the
                same steps in your robot&apos;s app; unplugged, act the blocks out on a floor grid.
                Your program saves on this device.
              </p>
              {programMissions.map(({ spec, mission, allowedBlocks }) => (
                <div key={spec.id} className="mt-6">
                  <RoboticsBlockEditor
                    specId={spec.id}
                    mission={mission}
                    title={spec.title}
                    description={spec.description}
                    allowedBlocks={allowedBlocks}
                  />
                </div>
              ))}
            </section>
          )}

          {/* Predict */}
          {hasPredict && (
            <section id="lesson-predict" className="mt-12 scroll-mt-20">
              <h2 className="text-xl font-bold text-foreground">Predict</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Commit to a guess before you test - then see how close you were. Your predictions
                save automatically.
              </p>
              <div className="mt-4">
                <RoboticsPredictions prompts={module.predictionPrompts} />
              </div>
            </section>
          )}

          {/* Test and improve: editable, saved test records + debugging missions */}
          {hasTest && (
            <section id="lesson-test" className="mt-12 scroll-mt-20">
              <h2 className="text-xl font-bold text-foreground">Test &amp; improve</h2>

              {module.testRecords.length > 0 && (
                <div className="mt-4 space-y-6">
                  {module.testRecords.map((record) => (
                    <RoboticsTestRecord key={record.id} record={record} />
                  ))}
                </div>
              )}

              {module.debuggingMissions.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-bold text-foreground">Debugging missions</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Each robot below misbehaves on purpose. Work out whether the bug is mechanical, in
                    the program, or with a sensor - then check the fix.
                  </p>
                  <div className="mt-4 space-y-4">
                    {module.debuggingMissions.map((mission) => (
                      <RoboticsDebugMission key={mission.id} mission={mission} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Knowledge check */}
          <section id="lesson-check" className="mt-12 scroll-mt-20">
            <h2 className="text-xl font-bold text-foreground">Knowledge check</h2>
            <div className="mt-4">
              <RoboticsKnowledgeCheck check={module.knowledgeCheck} />
            </div>
          </section>

          {/* Reflection */}
          <section id="lesson-reflect" className="mt-12 scroll-mt-20">
            <h2 className="text-xl font-bold text-foreground">Reflect</h2>
            <p className="mt-2 text-sm text-muted-foreground">Your reflections save automatically.</p>
            <div className="mt-4">
              <RoboticsReflection prompts={module.reflection} />
            </div>
          </section>

          {/* Next week */}
          <section className="mt-12 rounded-lg border border-border bg-secondary p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">
              {module.isFinal ? "After the course" : "Coming up next week"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">{module.nextWeek.teaser}</p>
            {module.nextWeek.prepare.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {module.nextWeek.prepare.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-avanza-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Mark complete */}
          <RoboticsLessonComplete module={module} />

          {/* Prev / next navigation */}
          <nav className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6 text-sm">
            {previous ? (
              <Link
                href={roboticsLessonPath(previous.slug)}
                className="font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
              >
                ← Week {previous.week}: {previous.title}
              </Link>
            ) : (
              <Link
                href={roboticsPath}
                className="font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
              >
                ← Course overview
              </Link>
            )}
            {next ? (
              <Link
                href={roboticsLessonPath(next.slug)}
                className="text-right font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
              >
                Week {next.week}: {next.title} →
              </Link>
            ) : (
              <Link
                href={`${roboticsPath}/review`}
                className="text-right font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
              >
                Review area →
              </Link>
            )}
          </nav>
        </div>
      </article>
    </RoboticsLessonGate>
  )
}

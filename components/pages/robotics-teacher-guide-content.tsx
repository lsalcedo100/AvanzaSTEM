import Link from "next/link"
import {
  ROBOTICS_SAFETY,
  roboticsLessonPath,
  roboticsWorksheetPath,
  type EquipmentPathId,
  type KnowledgeCheckQuestion,
  type RoboticsModule,
} from "@/features/curriculums/robotics"
import { PrintButton } from "@/components/ui/print-button"

const PATH_ORDER: EquipmentPathId[] = ["kit", "simulator", "unplugged"]

const PATH_LABELS: Record<string, string> = {
  kit: "Kit",
  simulator: "Simulator",
  unplugged: "Unplugged",
}

/** A plain-language correct answer for the teacher answer key, per question kind. */
function answerKeyText(question: KnowledgeCheckQuestion): string {
  switch (question.kind) {
    case "single":
    case "trace":
    case "scenario": {
      const correct = question.options.find((o) => o.id === question.correctOptionId)
      return correct?.text ?? "See explanation"
    }
    case "multiple": {
      const correct = question.options.filter((o) => o.correct).map((o) => o.text)
      return correct.join("; ")
    }
    case "true-false":
      return question.answer ? "True" : "False"
    case "ordering":
      return question.correctOrder
        .map((id) => question.items.find((it) => it.id === id)?.text ?? id)
        .join(" -> ")
    case "matching":
      return question.pairs.map((p) => `${p.left} -> ${p.right}`).join("; ")
    case "short":
      return question.sampleAnswer
  }
}

/**
 * The parent/teacher facilitation guide for one robotics week
 * (/courses/robotics/[lesson]/teacher-guide).
 *
 * This is the adult-facing companion to the lesson: it lays out how to set up,
 * run, and stretch the session, and - unlike the student worksheet - it reveals
 * the knowledge-check answer key. It reads entirely from the passed
 * `RoboticsModule` and mirrors the lesson page's clean, printable style.
 */
export function RoboticsTeacherGuideContent({ module }: { module: RoboticsModule }) {
  const label = module.isFinal ? "Final project" : `Week ${module.week}: ${module.title}`
  const guidance = module.teacherGuidance

  return (
    <article className="bg-background">
      {/* Print / navigation bar - hidden in the printed handout */}
      <div className="print-hidden border-b border-border">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              href={roboticsLessonPath(module.slug)}
              className="font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
            >
              ← Back to the lesson
            </Link>
            <Link
              href={roboticsWorksheetPath(module.slug)}
              className="font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
            >
              Printable worksheet
            </Link>
          </div>
          <PrintButton tone="green" />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {/* Header */}
        <header>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Parent &amp; teacher guide
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">{label}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Session length: </span>
            {module.estimatedTime}
          </p>
        </header>

        {/* Learning purpose */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">Learning purpose</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/90">{module.summary}</p>
        </section>

        {/* Learning goals / expected outcomes */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">Expected student outcomes</h2>
          <p className="mt-1 text-sm text-muted-foreground">By the end of this week, students can:</p>
          <ul className="mt-4 space-y-2">
            {module.learningGoals.map((goal) => (
              <li key={goal.id} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-green" />
                <span>{goal.text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Suggested pacing */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">Suggested pacing</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            About {module.estimatedTime}. Adjust to your group - these are guides, not limits.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className="border border-border bg-secondary px-3 py-2 font-semibold text-foreground">Step</th>
                  <th className="border border-border bg-secondary px-3 py-2 font-semibold text-foreground">Focus</th>
                  <th className="border border-border bg-secondary px-3 py-2 font-semibold text-foreground">Minutes</th>
                </tr>
              </thead>
              <tbody>
                {module.lessonFlow.map((step) => (
                  <tr key={step.id} className="align-top">
                    <td className="border border-border px-3 py-2 font-semibold text-foreground">{step.title}</td>
                    <td className="border border-border px-3 py-2 text-foreground/90">{step.focus}</td>
                    <td className="border border-border px-3 py-2 text-muted-foreground">
                      {step.minutes ? `${step.minutes} min` : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Before you start */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">Before you start</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Set up</h3>
              <ul className="mt-3 space-y-2">
                {guidance.setup.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Prepare ahead</h3>
              <ul className="mt-3 space-y-2">
                {guidance.prep.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Materials */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">Materials</h2>
          <ul className="mt-4 space-y-3">
            {module.materials.map((material) => (
              <li key={material.id} className="text-sm leading-relaxed text-foreground/90">
                <span className="font-semibold text-foreground">{material.name}</span>
                {material.optional && (
                  <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Optional
                  </span>
                )}
                <span className="ml-2 text-xs text-muted-foreground">
                  ({material.paths.map((p) => PATH_LABELS[p] ?? p).join(", ")})
                </span>
                {material.note && (
                  <span className="mt-1 block text-sm text-muted-foreground">{material.note}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Safety */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">Safety</h2>
          <ul className="mt-4 space-y-3">
            {module.safetyNotes.map((note) => (
              <li key={note.id} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span
                  aria-hidden
                  className={
                    note.severity === "caution"
                      ? "mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-orange"
                      : "mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-green"
                  }
                />
                <span>
                  <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {note.severity}
                  </span>
                  {note.text}
                  {note.paths && note.paths.length > 0 && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({note.paths.map((p) => PATH_LABELS[p] ?? p).join(", ")})
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Full safety briefing (course-wide reference) */}
        <section className="mt-12 print-avoid-break">
          <h2 className="text-xl font-bold text-foreground">Full safety briefing</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Review these once with your group. They apply across the whole course; the notes above
            are what matters most this week.
          </p>
          <div className="mt-4 space-y-5">
            {ROBOTICS_SAFETY.map((cat) => (
              <div key={cat.id}>
                <h3 className="text-sm font-bold text-foreground">
                  {cat.title}
                  {cat.paths && cat.paths.length > 0 && (
                    <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {cat.paths.map((p) => PATH_LABELS[p] ?? p).join(", ")}
                    </span>
                  )}
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {cat.rules.map((rule, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                      <span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-foreground/60" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Running the session */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">Running the session</h2>
          <ol className="mt-4 space-y-3">
            {guidance.facilitation.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span className="flex-none font-semibold text-avanza-green-dark">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Common misconceptions */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">Common misconceptions</h2>
          <ul className="mt-4 space-y-2">
            {guidance.commonMisconceptions.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-green" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Questions to ask */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">Questions to ask</h2>
          <ul className="mt-4 space-y-2">
            {guidance.questionsToAsk.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-green" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Adaptations: easier / harder / group */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">Classroom &amp; group adaptations</h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-border p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Make it easier</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{guidance.easierVersion}</p>
            </div>
            <div className="rounded-lg border border-border p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Make it harder</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{guidance.harderVersion}</p>
            </div>
            <div className="rounded-lg border border-border p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Groups &amp; whole class</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                In pairs or small groups, give each student a role that rotates - driver (builds or
                types), navigator (reads the plan), and recorder (fills the worksheet) - so everyone
                participates. For a whole-class demo, run one shared robot or simulator on the board,
                have students predict together, then let groups repeat it on their own path. Groups can
                also mix paths: one builds on the kit while another checks the same idea in the
                simulator or unplugged, then they compare results.
              </p>
            </div>
          </div>
        </section>

        {/* Hardware and no-hardware notes */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">Hardware and no-hardware notes</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Every activity this week runs three ways - all three teach the same core idea, so pick
            whichever fits your room. No specific product is required.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {PATH_ORDER.map((path) => {
              const mats = module.materials.filter((m) => m.paths.includes(path))
              return (
                <div key={path} className="rounded-lg border border-border p-4">
                  <h3 className="text-sm font-bold text-foreground">{PATH_LABELS[path]}</h3>
                  {mats.length > 0 ? (
                    <ul className="mt-2 space-y-1 text-sm text-foreground/90">
                      {mats.map((m) => (
                        <li key={m.id}>{m.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">Uses the shared materials above.</p>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Troubleshooting (aggregated from the activities' equipment variants) */}
        {(() => {
          const tips = module.activities.flatMap((a) =>
            PATH_ORDER.flatMap((path) =>
              (a.variants[path]?.troubleshooting ?? []).map((t) => ({ ...t, activity: a.title, path })),
            ),
          )
          if (tips.length === 0) return null
          return (
            <section className="mt-12">
              <h2 className="text-xl font-bold text-foreground">Troubleshooting</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Common problems from this week&apos;s activities and what to try.
              </p>
              <ul className="mt-4 space-y-3">
                {tips.map((t, i) => (
                  <li key={i} className="text-sm leading-relaxed text-foreground/90">
                    <span className="font-semibold text-foreground">{t.problem}</span>
                    <span className="ml-2 text-xs uppercase tracking-wide text-muted-foreground">
                      {PATH_LABELS[t.path]}
                    </span>
                    <span className="mt-0.5 block text-muted-foreground">Try: {t.fix}</span>
                  </li>
                ))}
              </ul>
            </section>
          )
        })()}

        {/* Knowledge-check answer key */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">Knowledge-check answer key</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Answers are shown here for the adult only - the student worksheet keeps them hidden.
          </p>
          <ol className="mt-4 space-y-6">
            {module.knowledgeCheck.questions.map((question, i) => (
              <li key={question.id}>
                <p className="text-sm font-semibold leading-relaxed text-foreground">
                  {i + 1}. {question.prompt}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  <span className="font-semibold text-avanza-green-dark">Correct answer: </span>
                  {answerKeyText(question)}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">Why: </span>
                  {question.explanation}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  )
}

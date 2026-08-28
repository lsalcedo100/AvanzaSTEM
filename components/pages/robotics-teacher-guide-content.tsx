"use client"

import { useLanguage } from "@/components/providers/language-provider"
import type { Translations } from "@/i18n/translations"
import {
  findRoboticsModule,
  getRoboticsModules,
} from "@/features/curriculums/robotics/i18n"
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

type TeacherStrings = Translations["courseUi"]["robotics"]["teacher"]

const pathLabels = (T: TeacherStrings): Record<string, string> => ({
  kit: T.pathKit,
  simulator: T.pathSimulator,
  unplugged: T.pathUnplugged,
})

/** A plain-language correct answer for the teacher answer key, per question kind. */
function answerKeyText(question: KnowledgeCheckQuestion, T: TeacherStrings): string {
  switch (question.kind) {
    case "single":
    case "trace":
    case "scenario": {
      const correct = question.options.find((o) => o.id === question.correctOptionId)
      return correct?.text ?? T.seeExplanation
    }
    case "multiple": {
      const correct = question.options.filter((o) => o.correct).map((o) => o.text)
      return correct.join("; ")
    }
    case "true-false":
      return question.answer ? T.trueLabel : T.falseLabel
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
export function RoboticsTeacherGuideContent({ slug }: { slug: string }) {
  const { language, t } = useLanguage()
  const ui = t.courseUi.robotics
  const T = ui.teacher
  const weekModule = findRoboticsModule(language, slug) ?? getRoboticsModules(language)[0]
  const label = weekModule.isFinal
    ? ui.finalProject
    : ui.progress.weekTitleLine.replace("{n}", String(weekModule.week)).replace("{title}", weekModule.title)
  const guidance = weekModule.teacherGuidance

  return (
    <article className="bg-background">
      {/* Print / navigation bar - hidden in the printed handout */}
      <div className="print-hidden border-b border-border">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              href={roboticsLessonPath(weekModule.slug)}
              className="font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
            >
              ← Back to the lesson
            </Link>
            <Link
              href={roboticsWorksheetPath(weekModule.slug)}
              className="font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
            >
              {ui.lesson.printableWorksheet}
            </Link>
          </div>
          <PrintButton tone="green" />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {/* Header */}
        <header>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {ui.lesson.teacherGuide}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">{label}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{T.sessionLength}</span>
            {weekModule.estimatedTime}
          </p>
        </header>

        {/* Learning purpose */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">{T.learningPurpose}</h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/90">{weekModule.summary}</p>
        </section>

        {/* Learning goals / expected outcomes */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">{T.expectedOutcomes}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{T.byEndStudents}</p>
          <ul className="mt-4 space-y-2">
            {weekModule.learningGoals.map((goal) => (
              <li key={goal.id} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-green" />
                <span>{goal.text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Suggested pacing */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">{T.suggestedPacing}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            About {weekModule.estimatedTime}. Adjust to your group - these are guides, not limits.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className="border border-border bg-secondary px-3 py-2 font-semibold text-foreground">{T.step}</th>
                  <th className="border border-border bg-secondary px-3 py-2 font-semibold text-foreground">{T.focus}</th>
                  <th className="border border-border bg-secondary px-3 py-2 font-semibold text-foreground">{T.minutes}</th>
                </tr>
              </thead>
              <tbody>
                {weekModule.lessonFlow.map((step) => (
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
          <h2 className="text-xl font-bold text-foreground">{T.beforeYouStart}</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{T.setUp}</h3>
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
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{T.prepareAhead}</h3>
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
          <h2 className="text-xl font-bold text-foreground">{T.materials}</h2>
          <ul className="mt-4 space-y-3">
            {weekModule.materials.map((material) => (
              <li key={material.id} className="text-sm leading-relaxed text-foreground/90">
                <span className="font-semibold text-foreground">{material.name}</span>
                {material.optional && (
                  <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {T.optional}
                  </span>
                )}
                <span className="ml-2 text-xs text-muted-foreground">
                  ({material.paths.map((p) => pathLabels(T)[p] ?? p).join(", ")})
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
          <h2 className="text-xl font-bold text-foreground">{T.safety}</h2>
          <ul className="mt-4 space-y-3">
            {weekModule.safetyNotes.map((note) => (
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
                      ({note.paths.map((p) => pathLabels(T)[p] ?? p).join(", ")})
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Full safety briefing (course-wide reference) */}
        <section className="mt-12 print-avoid-break">
          <h2 className="text-xl font-bold text-foreground">{T.fullSafetyBriefing}</h2>
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
                      {cat.paths.map((p) => pathLabels(T)[p] ?? p).join(", ")}
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
          <h2 className="text-xl font-bold text-foreground">{T.runningSession}</h2>
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
          <h2 className="text-xl font-bold text-foreground">{T.commonMisconceptions}</h2>
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
          <h2 className="text-xl font-bold text-foreground">{T.questionsToAsk}</h2>
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
          <h2 className="text-xl font-bold text-foreground">{T.adaptations}</h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-border p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{T.makeEasier}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{guidance.easierVersion}</p>
            </div>
            <div className="rounded-lg border border-border p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{T.makeHarder}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{guidance.harderVersion}</p>
            </div>
            <div className="rounded-lg border border-border p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{T.groupsWholeClass}</h3>
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
          <h2 className="text-xl font-bold text-foreground">{T.hardwareNotes}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Every activity this week runs three ways - all three teach the same core idea, so pick
            whichever fits your room. No specific product is required.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {PATH_ORDER.map((path) => {
              const mats = weekModule.materials.filter((m) => m.paths.includes(path))
              return (
                <div key={path} className="rounded-lg border border-border p-4">
                  <h3 className="text-sm font-bold text-foreground">{pathLabels(T)[path]}</h3>
                  {mats.length > 0 ? (
                    <ul className="mt-2 space-y-1 text-sm text-foreground/90">
                      {mats.map((m) => (
                        <li key={m.id}>{m.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">{T.usesSharedMaterials}</p>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Troubleshooting (aggregated from the activities' equipment variants) */}
        {(() => {
          const tips = weekModule.activities.flatMap((a) =>
            PATH_ORDER.flatMap((path) =>
              (a.variants[path]?.troubleshooting ?? []).map((t) => ({ ...t, activity: a.title, path })),
            ),
          )
          if (tips.length === 0) return null
          return (
            <section className="mt-12">
              <h2 className="text-xl font-bold text-foreground">{T.troubleshooting}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {T.troubleshootingIntro}
              </p>
              <ul className="mt-4 space-y-3">
                {tips.map((t, i) => (
                  <li key={i} className="text-sm leading-relaxed text-foreground/90">
                    <span className="font-semibold text-foreground">{t.problem}</span>
                    <span className="ml-2 text-xs uppercase tracking-wide text-muted-foreground">
                      {pathLabels(T)[t.path]}
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
          <h2 className="text-xl font-bold text-foreground">{T.answerKey}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {T.answerKeyIntro}
          </p>
          <ol className="mt-4 space-y-6">
            {weekModule.knowledgeCheck.questions.map((question, i) => (
              <li key={question.id}>
                <p className="text-sm font-semibold leading-relaxed text-foreground">
                  {i + 1}. {question.prompt}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  <span className="font-semibold text-avanza-green-dark">{T.correctAnswer}</span>
                  {answerKeyText(question, T)}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">{T.why}</span>
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

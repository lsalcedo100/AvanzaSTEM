"use client"

import { useLanguage } from "@/components/providers/language-provider"
import {
  findEngineeringLesson,
  getEngineeringFundamentalsCurriculum,
} from "@/features/curriculums/engineering-fundamentals/i18n"
import Link from "next/link"
import { PrintButton } from "@/components/ui/print-button"
import {
  engineeringLessonPath,
  engineeringTeacherGuidePath,
  type EngineeringLesson,
  type EngineeringTest,
} from "@/features/curriculums/engineering-fundamentals"

/**
 * A printable student worksheet for one Engineering Fundamentals lesson.
 *
 * Built to print as a clean black-and-white classroom handout: the on-screen
 * controls carry `.print-hidden`, the site chrome is already hidden when
 * printing, and every write-in area (sketch box, ruled lines, results table)
 * uses plain foreground borders so it reads clearly on paper. The final
 * challenge gets a mission-style variant with a solution-path picker.
 */
export function EngineeringWorksheetContent({ slug }: { slug: string }) {
  const { language, t } = useLanguage()
  const H = t.courseUi.engineering.handouts
  const c = getEngineeringFundamentalsCurriculum(language)
  const lesson = findEngineeringLesson(language, slug) ?? c.lessons[0]
  const total = c.totalLessons
  const label = lesson.isFinal
    ? H.finalChallenge
    : H.lessonOfTotal.replace("{n}", String(lesson.order)).replace("{total}", String(total))

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {/* On-screen controls (hidden when printing) */}
        <div className="print-hidden">
          <nav className="text-sm">
            <Link
              href={engineeringLessonPath(lesson.slug)}
              className="font-semibold text-avanza-purple underline underline-offset-2 hover:text-avanza-purple-dark"
            >
              &larr;{" "}
              {lesson.isFinal
                ? H.backToFinal
                : H.backToLesson.replace("{n}", String(lesson.order))}
            </Link>
          </nav>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {H.studentWorksheet}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">
            {lesson.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-foreground/90">
            {H.worksheetIntro}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PrintButton label={H.printWorksheet} tone="purple" />
            <Link
              href={engineeringTeacherGuidePath(lesson.slug)}
              className="text-sm font-semibold text-avanza-purple underline underline-offset-2 hover:text-avanza-purple-dark"
            >
              {H.parentTeacherGuide}
            </Link>
          </div>
        </div>

        {/* The printable handout */}
        <article className="mt-10 print:mt-0">
          <header className="border-b-2 border-foreground pb-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {H.courseTitle} &middot; {label}
              </p>
              <p className="text-xs text-muted-foreground">
                {H.nameDate}
              </p>
            </div>
            <h2 className="mt-2 text-2xl font-bold text-foreground">
              {lesson.projectName}
            </h2>
          </header>

          {lesson.isFinal ? (
            <FinalWorksheet lesson={lesson} />
          ) : (
            <StandardWorksheet lesson={lesson} />
          )}
        </article>
      </div>
    </div>
  )
}

function StandardWorksheet({ lesson }: { lesson: EngineeringLesson }) {
  const H = useLanguage().t.courseUi.engineering.handouts
  return (
    <>
      <Field title={H.wsProblem}>
        <p className="text-sm leading-relaxed text-foreground/90">
          {lesson.problem ?? lesson.designBrief}
        </p>
      </Field>

      <Field title={H.wsMaterialsChecklist}>
        <Checklist items={lesson.materials} />
      </Field>

      <Field title={H.wsDesignSketch}>
        <p className="text-sm text-muted-foreground">{H.wsDrawPlan}</p>
        <SketchBox />
      </Field>

      <Field title={H.wsPrediction}>
        <p className="text-sm text-muted-foreground">{H.wsPredictionIntro}</p>
        <WriteLines count={3} />
      </Field>

      <Field title={H.wsBuildNotes}>
        <p className="text-sm text-muted-foreground">{H.wsBuildNotesIntro}</p>
        <WriteLines count={3} />
      </Field>

      <Field title={H.wsTestResults}>
        <ResultsTable tests={lesson.testingChallenges} />
      </Field>

      <Field title={H.wsWhatFailed}>
        <WriteLines count={2} />
      </Field>

      <Field title={H.wsWhatChanged}>
        <WriteLines count={2} />
      </Field>

      <Field title={H.wsReflection}>
        <QuestionLines questions={lesson.reflectionQuestions} />
      </Field>

      <Field title={H.wsExtension}>
        {lesson.extensionChallenges.length > 0 && (
          <p className="text-sm leading-relaxed text-foreground/90">
            {lesson.extensionChallenges[0]}
          </p>
        )}
        <WriteLines count={2} />
      </Field>
    </>
  )
}

function FinalWorksheet({ lesson }: { lesson: EngineeringLesson }) {
  const H = useLanguage().t.courseUi.engineering.handouts
  return (
    <>
      <Field title={H.wsMissionBrief}>
        <p className="text-sm leading-relaxed text-foreground/90">
          {lesson.problem ?? lesson.designBrief}
        </p>
      </Field>

      {lesson.solutionPaths && lesson.solutionPaths.length > 0 && (
        <Field title={H.wsChosenPath}>
          <p className="text-sm text-muted-foreground">{H.wsCheckOne}</p>
          <Checklist items={lesson.solutionPaths} />
        </Field>
      )}

      <Field title={H.wsConstraints}>
        <ul className="space-y-1.5">
          {lesson.constraints.map((rule) => (
            <li key={rule} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
              <span aria-hidden>&bull;</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </Field>

      <Field title={H.wsPlanningSketch}>
        <p className="text-sm text-muted-foreground">{H.wsDrawDesign}</p>
        <SketchBox />
      </Field>

      <Field title={H.wsMaterialsUsed}>
        <Checklist items={lesson.materials} />
      </Field>

      <Field title={H.wsTestResults}>
        <ResultsTable tests={lesson.testingChallenges} />
      </Field>

      <Field title={H.wsRedesignNotes}>
        <p className="text-sm text-muted-foreground">{H.wsRedesignIntro}</p>
        <WriteLines count={3} />
      </Field>

      {lesson.presentationPrompts && lesson.presentationPrompts.length > 0 && (
        <Field title={H.wsFinalPresentation}>
          <QuestionLines questions={lesson.presentationPrompts} />
        </Field>
      )}
    </>
  )
}

function Field({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="print-avoid-break mt-6">
      <h3 className="border-b border-foreground pb-1 text-sm font-bold uppercase tracking-wide text-foreground">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </section>
  )
}

/** A checklist with empty square boxes drawn from borders (print-safe, no icons). */
function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90">
          <span
            aria-hidden
            className="mt-0.5 h-4 w-4 flex-none rounded-[3px] border border-foreground"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** A blank box for sketching, with a plain border so it prints cleanly. */
function SketchBox() {
  return <div aria-hidden className="mt-2 h-52 w-full rounded-md border border-foreground/50" />
}

/** A set of ruled write-in lines. */
function WriteLines({ count }: { count: number }) {
  return (
    <div className="mt-1 space-y-5" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border-b border-foreground/50" />
      ))}
    </div>
  )
}

/** Each question followed by a blank line to answer on. */
function QuestionLines({ questions }: { questions: string[] }) {
  return (
    <ol className="space-y-4">
      {questions.map((question, i) => (
        <li key={question}>
          <p className="text-sm leading-relaxed text-foreground/90">
            {i + 1}. {question}
          </p>
          <div aria-hidden className="mt-3 border-b border-foreground/50" />
        </li>
      ))}
    </ol>
  )
}

/** A results table: one row per test with blank columns for three tries. */
function ResultsTable({ tests }: { tests: EngineeringTest[] }) {
  const H = useLanguage().t.courseUi.engineering.handouts
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b-2 border-foreground">
            <th className="py-2 pr-3 font-bold text-foreground">{H.colTest}</th>
            <th className="py-2 pr-3 font-bold text-foreground">{H.colWhatToRecord}</th>
            <th className="py-2 pr-3 font-bold text-foreground">{H.colTry1}</th>
            <th className="py-2 pr-3 font-bold text-foreground">{H.colTry2}</th>
            <th className="py-2 font-bold text-foreground">{H.colTry3}</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test.test} className="border-b border-foreground/40 align-top">
              <td className="py-3 pr-3 font-medium text-foreground">{test.test}</td>
              <td className="py-3 pr-3 text-muted-foreground">{test.measure}</td>
              <td className="py-3 pr-3" />
              <td className="py-3 pr-3" />
              <td className="py-3" />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

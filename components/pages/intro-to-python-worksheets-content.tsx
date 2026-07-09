import Link from "next/link"
import { PrintButton } from "@/components/ui/print-button"
import {
  introToPythonCurriculum,
  introToPythonTeacherGuidePath,
  type CurriculumWeek,
} from "@/features/curriculums/intro-to-python"

/**
 * Printable student worksheets for the Intro to Python curriculum. Each lesson
 * becomes a one-page paper handout with a key idea, vocabulary, a space to plan
 * code, a debugging question, and a reflection question. Built to print cleanly:
 * the site chrome is hidden and each worksheet starts on a fresh page.
 */
export function IntroToPythonWorksheetsContent() {
  const c = introToPythonCurriculum

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {/* On-screen intro (hidden when printing) */}
        <div className="print-hidden">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Student worksheets
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
            {c.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground/90">
            One printable worksheet per lesson, for students working on paper or away from a screen.
            Use your browser&apos;s print option to print all worksheets, or a single page.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PrintButton label="Print worksheets" />
            <Link
              href={introToPythonTeacherGuidePath}
              className="text-sm font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
            >
              Back to teacher resources
            </Link>
          </div>
        </div>

        <div className="mt-10 space-y-16 print:mt-0 print:space-y-0">
          {c.weeks.map((week, i) => (
            <Worksheet key={week.week} week={week} first={i === 0} total={c.totalWeeks} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Worksheet({
  week,
  first,
  total,
}: {
  week: CurriculumWeek
  first: boolean
  total: number
}) {
  return (
    <section
      className={`print-avoid-break border-t-2 border-foreground pt-6 ${
        first ? "" : "print-break-before"
      }`}
    >
      {/* Handout header */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Intro to Python &middot; Worksheet {week.week} of {total}
        </p>
        <p className="text-xs text-muted-foreground">Name: _______________ Date: __________</p>
      </div>
      <h2 className="mt-3 text-2xl font-bold text-foreground">
        Week {week.week}: {week.title}
      </h2>

      {/* Key idea */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Key idea
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/90">{week.mainConcept}</p>
      </div>

      {/* Vocabulary */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Vocabulary
        </h3>
        <dl className="mt-2 divide-y divide-border border-t border-b border-border">
          {week.vocabulary.map((item) => (
            <div key={item.term} className="grid gap-1 py-2 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <dt className="font-mono text-sm font-semibold text-foreground">{item.term}</dt>
              <dd className="text-sm leading-relaxed text-foreground/90">{item.definition}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Code planning space */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Plan your code
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Project: {week.projectName}. Write, step by step, what your program should do.
        </p>
        <WritingLines lines={6} />
      </div>

      {/* Debugging question */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Debugging question
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/90">
          {week.debuggingChallenge.prompt}
        </p>
        <pre className="mt-3 overflow-x-auto rounded-md border border-border bg-secondary p-4 text-sm text-foreground print:bg-white">
          <code className="font-mono">{week.debuggingChallenge.brokenCode}</code>
        </pre>
        <p className="mt-3 text-sm text-muted-foreground">Write the fix:</p>
        <WritingLines lines={3} />
      </div>

      {/* Reflection */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Reflection
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/90">{week.reflectionQuestion}</p>
        <WritingLines lines={3} />
      </div>
    </section>
  )
}

/** Blank ruled lines for handwriting on the printed worksheet. */
function WritingLines({ lines }: { lines: number }) {
  return (
    <div className="mt-3 space-y-6" aria-hidden>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="border-b border-border" />
      ))}
    </div>
  )
}

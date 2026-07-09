import Link from "next/link"
import { IntroToPythonProgress } from "@/components/pages/intro-to-python-progress"
import {
  introToPythonCurriculum,
  introToPythonTeacherGuidePath,
  introToPythonWeekPath,
  introToPythonWorksheetsPath,
} from "@/features/curriculums/intro-to-python"

/**
 * Landing page for the Intro to Python Programming curriculum.
 *
 * Reads entirely from `introToPythonCurriculum`. Repeated lesson data (weeks,
 * outcomes, lesson flow) comes from the data file rather than being hardcoded
 * here. The design is deliberately plain: no chips, badges, or decorative icons
 * - it should read like a real course syllabus.
 */
export function IntroToPythonCurriculumContent() {
  const c = introToPythonCurriculum

  return (
    <div className="bg-background">
      {/* 1. Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-14 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Curriculum
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
            {c.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/90 md:text-lg">
            {c.description}
          </p>

          <dl className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            <HeaderDetail label="Audience" value={c.gradeRange} />
            <HeaderDetail label="Format" value={`${c.totalWeeks} lessons`} />
            <HeaderDetail label="Each session" value={c.estimatedTimePerWeek} />
            <HeaderDetail label="Requirements" value={c.requirement} />
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={introToPythonWeekPath(1)}
              className="inline-flex items-center rounded-md bg-avanza-green px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-avanza-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
            >
              Start with Week 1
            </Link>
            <Link
              href="/games"
              className="text-sm font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
            >
              Open the Python playground
            </Link>
          </div>
        </div>
      </section>

      {/* 2. What students will learn */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-14">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            What students will learn
          </h2>
          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {c.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex gap-3 text-sm leading-relaxed text-foreground/90"
              >
                <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-green" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. How each lesson works */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-14">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            How each lesson works
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Every week follows the same five steps, so students always know what to expect.
          </p>
          <ol className="mt-6 divide-y divide-border border-t border-b border-border">
            {c.lessonFlow.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-4 py-4">
                <span className="text-sm font-bold text-muted-foreground">{i + 1}</span>
                <div>
                  <p className="font-semibold text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. 8-week curriculum overview */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            {c.totalWeeks}-week overview
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            One concept per week. Each week ends with a project students build and run themselves.
            Complete a lesson to unlock the next one.
          </p>

          <div className="mt-8">
            <IntroToPythonProgress />
          </div>
        </div>
      </section>

      {/* 5. Final project */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-14">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">The final project</h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/90">
            Week 8 is a capstone. Instead of learning a new idea, students combine everything from
            the program - variables, input, conditionals, loops, functions, lists, and randomness -
            to design and build their own Python mini game.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/90">
            They start from a short plan, add one feature at a time, and test as they go. The result
            is a small game that is entirely their own, showing they can go from a blank file to a
            working program.
          </p>
          <p className="mt-6 text-sm">
            <Link
              href={introToPythonWeekPath(c.totalWeeks)}
              className="font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
            >
              View the final lesson
            </Link>
          </p>
        </div>
      </section>

      {/* 6. Teacher / librarian note */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-14">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            For teachers and librarians
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/90">
            Because every lesson runs in the browser with no setup, this curriculum works in a range
            of settings: library coding clubs, after-school and weekend workshops, classroom
            enrichment, or self-paced learning at home. Each lesson is self-contained and includes
            teacher notes on pacing and common mistakes, so a facilitator does not need a
            programming background to lead it.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/90">
            The teacher and librarian guide walks through how to run each session, what to explain,
            common mistakes, and offline backup activities. Printable student worksheets are also
            available for students working on paper.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link
              href={introToPythonTeacherGuidePath}
              className="font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
            >
              Teacher &amp; librarian guide
            </Link>
            <Link
              href={introToPythonWorksheetsPath}
              className="font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
            >
              Printable worksheets
            </Link>
            <Link
              href="/curriculums"
              className="font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
            >
              Back to all curriculums
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function HeaderDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-foreground">{value}</dd>
    </div>
  )
}

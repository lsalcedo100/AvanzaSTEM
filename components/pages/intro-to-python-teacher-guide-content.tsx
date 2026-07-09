import Link from "next/link"
import { PrintButton } from "@/components/ui/print-button"
import {
  introToPythonCurriculum,
  introToPythonPath,
  introToPythonWorksheetsPath,
} from "@/features/curriculums/intro-to-python"

/**
 * Teacher / librarian resources for the Intro to Python curriculum: an adult
 * overview of how to run the program plus a lesson-by-lesson facilitation guide.
 * Reads entirely from `introToPythonCurriculum`. Designed to print cleanly - the
 * site chrome is hidden on print and each lesson starts on a fresh page.
 */
export function IntroToPythonTeacherGuideContent() {
  const c = introToPythonCurriculum
  const f = c.facilitator

  return (
    <div className="bg-background">
      <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {/* Header */}
        <header className="border-b border-border pb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Teacher &amp; librarian resources
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
            {c.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Facilitation guide for workshops, libraries, and classrooms
          </p>
          <p className="mt-6 text-base leading-relaxed text-foreground/90">{f.audience}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 print-hidden">
            <PrintButton label="Print this guide" />
            <Link
              href={introToPythonWorksheetsPath}
              className="text-sm font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
            >
              Printable student worksheets
            </Link>
            <Link
              href={introToPythonPath}
              className="text-sm font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
            >
              Back to curriculum overview
            </Link>
          </div>
        </header>

        {/* Overview for adults */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">Before you start</h2>

          <dl className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Who it is for
              </dt>
              <dd className="mt-1 text-sm text-foreground">{c.gradeRange}, no experience needed</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Length
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {c.totalWeeks} lessons, {c.estimatedTimePerWeek} each
              </dd>
            </div>
          </dl>

          <GuideList title="What students need" items={f.studentNeeds} />
          <GuideList title="Running a session in a library or classroom" items={f.runningTheLesson} />
          <GuideList
            title="Supporting students who have never coded"
            items={f.supportingBeginners}
          />
        </section>

        {/* Per-week facilitation guide */}
        <section className="mt-14">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            Lesson-by-lesson facilitation guide
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            One section per week. Each is written so you can lead it without a coding background.
          </p>

          <div className="mt-8 space-y-12">
            {c.weeks.map((week, i) => (
              <section
                key={week.week}
                className={`print-avoid-break border-t border-border pt-8 ${
                  i > 0 ? "print-break-before" : ""
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Week {week.week}
                </p>
                <h3 className="mt-2 text-xl font-bold text-foreground">{week.title}</h3>

                <div className="mt-4 grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <p className="text-sm font-semibold text-foreground">Lesson goal</p>
                  <p className="text-sm leading-relaxed text-foreground/90">{week.facilitation.goal}</p>
                </div>

                <GuideList title="Materials needed" items={week.facilitation.materials} />
                <GuideList title="What to explain" items={week.facilitation.explain} />
                <GuideList title="Common student mistakes" items={week.facilitation.commonMistakes} />
                <GuideList title="Questions to ask" items={week.facilitation.questionsToAsk} />

                <div className="mt-6 grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <p className="text-sm font-semibold text-foreground">Optional extension</p>
                  <p className="text-sm leading-relaxed text-foreground/90">{week.extensionChallenge}</p>
                </div>
                <div className="mt-4 grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <p className="text-sm font-semibold text-foreground">If computers are limited</p>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {week.facilitation.offlineActivity}
                  </p>
                </div>
              </section>
            ))}
          </div>
        </section>

        <p className="mt-12 border-t border-border pt-6 text-sm print-hidden">
          <Link
            href={introToPythonWorksheetsPath}
            className="font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
          >
            Open the printable student worksheets
          </Link>
        </p>
      </article>
    </div>
  )
}

function GuideList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
            <span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-foreground/50" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

import Link from "next/link"
import { PythonWorkspace } from "@/components/ui/python-workspace"
import {
  IntroToPythonLessonComplete,
  IntroToPythonLessonGate,
} from "@/components/pages/intro-to-python-lesson-progress"
import {
  introToPythonCurriculum,
  introToPythonPath,
  introToPythonTeacherGuidePath,
  introToPythonWeekPath,
  type CurriculumWeek,
} from "@/features/curriculums/intro-to-python"

/**
 * A single week's lesson page for the Intro to Python curriculum.
 *
 * Renders one `CurriculumWeek` from the data file. All lesson content - goals,
 * vocabulary, starter code, challenges, reflection, and teacher notes - comes
 * from the data, so this component is pure layout.
 */
export function IntroToPythonLessonContent({ week }: { week: CurriculumWeek }) {
  const total = introToPythonCurriculum.totalWeeks
  const prev = week.week > 1 ? week.week - 1 : null
  const next = week.week < total ? week.week + 1 : null

  return (
    <IntroToPythonLessonGate week={week.week}>
      <div className="bg-background">
        <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {/* Breadcrumb */}
        <nav className="text-sm">
          <Link
            href={introToPythonPath}
            className="font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
          >
            Intro to Python Programming
          </Link>
        </nav>

        {/* Header */}
        <header className="mt-6 border-b border-border pb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Week {week.week} of {total}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
            {week.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground/90 md:text-lg">
            {week.description}
          </p>
          <dl className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            <HeaderDetail label="Estimated time" value={week.estimatedTime} />
            <HeaderDetail label="Project" value={week.projectName} />
          </dl>
        </header>

        {/* The idea */}
        <Section title="The idea">
          <p className="text-base leading-relaxed text-foreground/90">{week.mainConcept}</p>
        </Section>

        {/* Learning goals */}
        <Section title="What you will learn">
          <ul className="space-y-2">
            {week.learningGoals.map((goal) => (
              <li key={goal} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-green" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Vocabulary */}
        <Section title="New words">
          <dl className="divide-y divide-border border-t border-b border-border">
            {week.vocabulary.map((item) => (
              <div key={item.term} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="font-mono text-sm font-semibold text-foreground">{item.term}</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">{item.definition}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* Project */}
        <Section title={`Project: ${week.projectName}`}>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Edit the starter code below and press Run to see it work. Use Reset starter code to go
            back to the original at any time.
          </p>
          <PythonWorkspace
            key={week.week}
            starterCode={week.starterCode}
            storageKey={`avanza-py-lesson-week-${week.week}`}
            resetLabel="Reset starter code"
            finishedMessage="Program finished."
            className="mt-4"
          />
          <p className="mt-6 text-sm font-semibold text-foreground">Expected output</p>
          <CodeBlock>{week.expectedOutput}</CodeBlock>
        </Section>

        {/* Mini challenge */}
        <Section title="Mini challenge">
          <p className="text-sm leading-relaxed text-foreground/90">{week.miniChallenge}</p>
        </Section>

        {/* Debugging challenge */}
        <Section title="Debugging challenge">
          <p className="text-sm leading-relaxed text-foreground/90">{week.debuggingChallenge.prompt}</p>
          <p className="mt-4 text-sm font-semibold text-foreground">Broken code</p>
          <CodeBlock>{week.debuggingChallenge.brokenCode}</CodeBlock>
          <details className="group mt-4 rounded-md border border-border">
            <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-avanza-green marker:content-none hover:text-avanza-teal">
              <span className="group-open:hidden">Show solution</span>
              <span className="hidden group-open:inline">Hide solution</span>
            </summary>
            <div className="border-t border-border px-4 py-3">
              <CodeBlock>{week.debuggingChallenge.solution}</CodeBlock>
            </div>
          </details>
        </Section>

        {/* Extension challenge */}
        <Section title="Extension challenge">
          <p className="text-sm leading-relaxed text-foreground/90">{week.extensionChallenge}</p>
        </Section>

        {/* Reflection */}
        <Section title="Reflect">
          <p className="text-base leading-relaxed text-foreground/90">{week.reflectionQuestion}</p>
        </Section>

        {/* Teacher notes */}
        <Section title="Teacher notes">
          <div className="rounded-md border border-border bg-secondary p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">{week.teacherNotes}</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Facilitating this lesson? See the{" "}
            <Link
              href={introToPythonTeacherGuidePath}
              className="font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
            >
              teacher &amp; librarian guide
            </Link>{" "}
            for how to run it, common mistakes, and an offline backup activity.
          </p>
        </Section>

        {/* Completion + unlock */}
        <IntroToPythonLessonComplete week={week.week} />

        {/* Prev / next navigation */}
        <nav className="mt-12 flex items-center justify-between border-t border-border pt-6 text-sm">
          {prev ? (
            <Link
              href={introToPythonWeekPath(prev)}
              className="font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
            >
              Previous: Week {prev}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={introToPythonWeekPath(next)}
              className="font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
            >
              Next: Week {next}
            </Link>
          ) : (
            <Link
              href={introToPythonPath}
              className="font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
            >
              Back to overview
            </Link>
          )}
        </nav>
        </article>
      </div>
    </IntroToPythonLessonGate>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
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

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-2 overflow-x-auto rounded-md border border-border bg-secondary p-4 text-sm text-foreground">
      <code className="font-mono">{children}</code>
    </pre>
  )
}

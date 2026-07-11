import Link from "next/link"
import {
  MathLessonComplete,
  MathLessonVisit,
} from "@/components/pages/math-adventures-progress-ui"
import { MathActivity } from "@/components/pages/math-activities"
import {
  getNextMathLesson,
  getPreviousMathLesson,
  mathAdventuresCurriculum,
  mathAdventuresPath,
  mathLessonPath,
  type MathLesson,
} from "@/features/curriculums/math-adventures"

/**
 * The reusable lesson template for Math Adventures.
 *
 * Renders one `MathLesson` from the data file through a fixed sequence of
 * sections (story -> goals -> key ideas -> main lesson -> examples -> interactive
 * practice -> hands-on challenge -> checkpoint -> reflection -> challenge ->
 * complete -> next). All ten weeks share this one component; no lesson text lives
 * here. Answer reveals use native <details>/<summary>, so they are keyboard- and
 * screen-reader-friendly with no client JavaScript. Only the progress controls
 * (visit + mark-complete) are client components.
 */
export function MathAdventuresLessonContent({ lesson }: { lesson: MathLesson }) {
  const total = mathAdventuresCurriculum.totalWeeks
  const prev = getPreviousMathLesson(lesson.slug)
  const next = getNextMathLesson(lesson.slug)
  const label = lesson.isFinalProject
    ? "Final project"
    : `Week ${lesson.weekNumber} of ${total}`

  return (
    <div className="bg-background">
      <MathLessonVisit slug={lesson.slug} />
      <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {/* 1. Lesson header */}
        <nav
          aria-label="Lesson"
          className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm"
        >
          <Link
            href={mathAdventuresPath}
            className="font-semibold text-avanza-teal-dark underline underline-offset-2 hover:text-avanza-teal"
          >
            Math Adventures
          </Link>
          <LessonNav prev={prev} next={next} compact />
        </nav>

        <header className="mt-6 border-b border-border pb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">{lesson.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-foreground/90 md:text-lg">
            {lesson.description}
          </p>
          <dl className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            <HeaderDetail label="Estimated time" value={lesson.estimatedTime} />
            <HeaderDetail label="Grade range" value={lesson.gradeRange} />
            <HeaderDetail label="Skill focus" value={lesson.skillFocus.join(", ")} />
            <HeaderDetail label="Theme" value={lesson.theme} />
          </dl>
        </header>

        {/* 2. Intro story / real-world problem */}
        <Section title="The story">
          <div className="rounded-lg border border-border bg-secondary p-5 md:p-6">
            <p className="text-base leading-relaxed text-foreground/90">{lesson.introStory}</p>
          </div>
        </Section>

        {/* 3. What you'll learn */}
        <Section title="What you'll learn">
          <ul className="space-y-3">
            {lesson.learningGoals.map((goal) => (
              <li key={goal} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <Dot />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* 4. Key concepts and vocabulary */}
        <Section title="Key ideas">
          <ul className="space-y-2">
            {lesson.keyConcepts.map((concept) => (
              <li key={concept} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <Dot />
                <span>{concept}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Words to know
          </h3>
          <dl className="mt-3 divide-y divide-border border-t border-b border-border">
            {lesson.vocabulary.map((term) => (
              <div key={term.term} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
                <dt className="text-sm font-semibold text-foreground">{term.term}</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">{term.definition}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* 5. Main lesson + worked examples */}
        <Section title="The lesson">
          <div className="space-y-4">
            {lesson.mainLesson.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-foreground/90">
                {paragraph}
              </p>
            ))}
          </div>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Worked examples
          </h3>
          <div className="mt-4 grid gap-4">
            {lesson.examples.map((example) => (
              <div key={example.problem} className="rounded-lg border border-border p-5">
                <p className="text-sm font-semibold text-foreground">{example.problem}</p>
                <p className="mt-2 font-mono text-sm text-avanza-teal-dark">{example.solution}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {example.explanation}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* 6 + 7. Interactive practice / mini-game area */}
        <Section title="Try it: interactive practice">
          <p className="text-sm text-muted-foreground">
            This is the week&apos;s practice game. Work through it right here - try each step
            yourself, then check your thinking.
          </p>

          <div className="mt-5 rounded-lg border border-border p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Activity
            </p>
            <h3 className="mt-1 text-lg font-bold text-foreground">
              {lesson.interactiveActivity.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              {lesson.interactiveActivity.conceptConnection}
            </p>

            <div className="mt-5">
              <MathActivity activity={lesson.interactiveActivity} />
            </div>
          </div>
        </Section>

        {/* 8. Hands-on challenge */}
        <Section title="Hands-on challenge">
          <h3 className="text-lg font-bold text-foreground">{lesson.handsOnChallenge.title}</h3>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            What you need
          </p>
          <ul className="mt-2 grid gap-x-10 gap-y-2 sm:grid-cols-2">
            {lesson.materials.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <Dot />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Steps
          </p>
          <ol className="mt-2 space-y-4">
            {lesson.handsOnChallenge.instructions.map((step, i) => (
              <li key={step} className="grid grid-cols-[2rem_1fr] gap-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border font-mono text-sm font-semibold text-muted-foreground">
                  {i + 1}
                </span>
                <p className="self-center text-sm leading-relaxed text-foreground/90">{step}</p>
              </li>
            ))}
          </ol>

          <p className="mt-5 rounded-md border border-border bg-secondary px-4 py-3 text-sm text-foreground/90">
            <span className="font-semibold text-foreground">You&apos;ve got it when:</span>{" "}
            {lesson.handsOnChallenge.successLooksLike}
          </p>
        </Section>

        {/* 9. Checkpoint / review with reveal-able answers */}
        <Section title="Checkpoint">
          <p className="text-sm text-muted-foreground">
            Quick checks before you move on. Try each one first, then reveal the answer.
          </p>
          <ol className="mt-5 space-y-3">
            {lesson.checkpointQuestions.map((item, i) => (
              <li key={item.question} className="rounded-lg border border-border p-5">
                <div className="flex gap-3">
                  <span className="font-mono text-sm font-semibold text-muted-foreground">
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-foreground">
                    {item.question}
                  </p>
                </div>
                <details className="group mt-3">
                  <summary className="inline-flex cursor-pointer list-none items-center rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-avanza-teal-dark transition-colors hover:border-avanza-teal hover:bg-avanza-teal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2 group-open:border-avanza-teal">
                    Show answer
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                </details>
              </li>
            ))}
          </ol>
        </Section>

        {/* 10. Reflection */}
        <Section title="Think about it">
          <div className="rounded-lg border border-border bg-secondary p-5">
            <p className="text-base leading-relaxed text-foreground/90">
              {lesson.reflectionQuestion}
            </p>
          </div>
        </Section>

        {/* 11. Challenge problem + extension */}
        <Section title="Challenge problem">
          <div className="rounded-lg border border-border p-5">
            <p className="text-sm font-medium leading-relaxed text-foreground">
              {lesson.challengeProblem.prompt}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <details className="group">
                <summary className="inline-flex cursor-pointer list-none items-center rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-avanza-teal-dark transition-colors hover:border-avanza-teal hover:bg-avanza-teal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2 group-open:border-avanza-teal">
                  Show hint
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {lesson.challengeProblem.hint}
                </p>
              </details>
              <details className="group">
                <summary className="inline-flex cursor-pointer list-none items-center rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-avanza-teal-dark transition-colors hover:border-avanza-teal hover:bg-avanza-teal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-teal focus-visible:ring-offset-2 group-open:border-avanza-teal">
                  Show answer
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {lesson.challengeProblem.answer}
                </p>
              </details>
            </div>
          </div>

          <div className="mt-6 rounded-md border border-border bg-secondary p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Extension &middot; go further
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              {lesson.extensionChallenge}
            </p>
          </div>
        </Section>

        {/* 12. Mark lesson complete */}
        <MathLessonComplete lesson={lesson} />

        {/* 13. Next-lesson call to action + footer navigation */}
        <nav className="mt-12 border-t border-border pt-6">
          <LessonNav prev={prev} next={next} />
        </nav>
      </article>
    </div>
  )
}

function LessonNav({
  prev,
  next,
  compact = false,
}: {
  prev: MathLesson | null
  next: MathLesson | null
  compact?: boolean
}) {
  const prevLabel = prev ? (prev.isFinalProject ? "Final project" : `Week ${prev.weekNumber}`) : null
  const nextLabel = next
    ? next.isFinalProject
      ? "Final project"
      : `Week ${next.weekNumber}: ${next.title}`
    : null

  if (compact) {
    return (
      <span className="flex items-center gap-4 text-sm">
        {prev && (
          <Link
            href={mathLessonPath(prev.slug)}
            className="font-semibold text-avanza-teal-dark underline underline-offset-2 hover:text-avanza-teal"
          >
            &larr; {prevLabel}
          </Link>
        )}
        {next && (
          <Link
            href={mathLessonPath(next.slug)}
            className="font-semibold text-avanza-teal-dark underline underline-offset-2 hover:text-avanza-teal"
          >
            {next.isFinalProject ? "Final project" : `Week ${next.weekNumber}`} &rarr;
          </Link>
        )}
      </span>
    )
  }

  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      {prev ? (
        <Link
          href={mathLessonPath(prev.slug)}
          className="font-semibold text-avanza-teal-dark underline underline-offset-2 hover:text-avanza-teal"
        >
          &larr; Previous: {prevLabel}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={mathLessonPath(next.slug)}
          className="text-right font-semibold text-avanza-teal-dark underline underline-offset-2 hover:text-avanza-teal"
        >
          Next: {nextLabel} &rarr;
        </Link>
      ) : (
        <Link
          href={mathAdventuresPath}
          className="text-right font-semibold text-avanza-teal-dark underline underline-offset-2 hover:text-avanza-teal"
        >
          Finish course &middot; back to hub &rarr;
        </Link>
      )}
    </div>
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

/** Small bullet marker used across the lesson, in the course accent color. */
function Dot() {
  return <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-teal" />
}

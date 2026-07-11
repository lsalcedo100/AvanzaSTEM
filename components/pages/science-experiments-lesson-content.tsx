import Link from "next/link"
import {
  nextScienceLesson,
  previousScienceLesson,
  scienceExperimentsCurriculum,
  scienceExperimentsPath,
  scienceLessonPath,
  type ScienceLesson,
} from "@/features/curriculums/science-experiments"
import {
  ScienceLessonComplete,
  ScienceLessonVisit,
} from "@/components/pages/science-progress-ui"
import { ScienceDiagram } from "@/components/ui/science-diagrams"
import { ScienceLabJournal } from "@/components/pages/science-lab-journal"

/**
 * A single weekly lesson page for the Science Experiments course
 * (/courses/science-experiments/[lesson]).
 *
 * This is the routing-complete lesson view: it renders the full lesson from the
 * `scienceExperimentsCurriculum` data - big question, concepts, the experiment
 * and why it works, discussion, and challenges - plus prev/next navigation. It
 * intentionally stays free of progress tracking, worksheets, and teacher-guide
 * sub-routes, which are a later phase. Styling matches the course hub: a plain
 * lab-journal look with a single avanza-orange accent, no badges or emoji.
 */
export function ScienceExperimentsLessonContent({ lesson }: { lesson: ScienceLesson }) {
  const prev = previousScienceLesson(lesson.slug)
  const next = nextScienceLesson(lesson.slug)

  return (
    <div className="bg-background">
      <ScienceLessonVisit week={lesson.week} />
      {/* Lesson header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <p className="text-sm">
            <Link
              href={scienceExperimentsPath}
              className="font-semibold text-avanza-orange-dark underline underline-offset-2 hover:text-avanza-orange"
            >
              Science Experiments
            </Link>
            <span className="text-muted-foreground"> / Week {lesson.week}</span>
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-avanza-orange-dark">
            Week {lesson.week} of {scienceExperimentsCurriculum.totalLessons}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">{lesson.title}</h1>

          <div className="mt-5 border-l-4 border-avanza-orange pl-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-avanza-orange-dark">
              Big question
            </p>
            <p className="mt-1 max-w-2xl text-lg font-semibold leading-snug text-foreground md:text-xl">
              {lesson.bigQuestion}
            </p>
          </div>
          <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            {[lesson.activityTitle, lesson.estimatedTime].map((detail, i) => (
              <li key={detail} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="text-border">|</span>}
                <span className="font-medium text-foreground">{detail}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-md border border-border bg-secondary px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              This week follows the science loop
            </p>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-sm font-semibold text-foreground">
              {scienceExperimentsCurriculum.investigationLoop.map((step, i) => (
                <span key={step.stage} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden className="text-avanza-orange">&rarr;</span>}
                  {step.stage}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* The big idea */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">The big idea</h2>
          <ul className="mt-6 space-y-3">
            {lesson.mainConcepts.map((concept) => (
              <li key={concept} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-orange" />
                <span>{concept}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-foreground/90">
            {lesson.explanation}
          </p>

          <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-foreground">Words to know</h3>
          <dl className="mt-3 space-y-3">
            {lesson.vocabulary.map((term) => (
              <div key={term.term} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="font-semibold text-foreground">{term.term}</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">{term.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Materials and safety */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-foreground md:text-2xl">Materials</h2>
              <ul className="mt-4 space-y-2">
                {lesson.materials.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-orange" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm">
                <Link
                  href={`${scienceExperimentsPath}#materials`}
                  className="font-semibold text-avanza-orange-dark underline underline-offset-2 hover:text-avanza-orange"
                >
                  See all course materials &rarr;
                </Link>
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground md:text-2xl">Safety</h2>
              <ul className="mt-4 space-y-2">
                {lesson.safetyNotes.map((note) => (
                  <li key={note} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-orange" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm">
                <Link
                  href={`${scienceExperimentsPath}#safety`}
                  className="font-semibold text-avanza-orange-dark underline underline-offset-2 hover:text-avanza-orange"
                >
                  See all safety notes &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The experiment */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            Experiment: {lesson.activityTitle}
          </h2>

          <div className="mt-6">
            <ScienceDiagram kind={lesson.diagram} />
          </div>

          <div className="mt-6 rounded-lg border-l-4 border-avanza-orange bg-card p-5">
            <h3 className="text-sm font-bold uppercase tracking-wide text-avanza-orange-dark">
              Predict first
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              Before you touch any materials, write down what you think will happen in this
              experiment - and why. Making a prediction first is what turns building into science.
              You will compare your prediction to what you actually observe.
            </p>
          </div>

          <div className="notebook-grid mt-6 rounded-lg border border-border bg-card p-5 md:p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">Steps</h3>
            <ol className="mt-4 space-y-4">
              {lesson.steps.map((step, i) => (
                <li key={step} className="grid grid-cols-[1.75rem_1fr] gap-3">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-avanza-orange bg-background font-mono text-xs font-semibold text-avanza-orange-dark">
                    {i + 1}
                  </span>
                  <p className="self-center text-sm leading-relaxed text-foreground/90">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-bold uppercase tracking-wide text-avanza-orange-dark">
              Why it happens
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">{lesson.whyItHappens}</p>
          </div>

          <div className="mt-6 rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-bold uppercase tracking-wide text-avanza-orange-dark">
              How engineers use this
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              {lesson.engineeringConnection}
            </p>
          </div>

          {lesson.relatedProject && (
            <div className="mt-6 rounded-lg border border-border bg-card p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                Related project
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                {lesson.relatedProject.note}
              </p>
              <p className="mt-3 text-sm">
                <Link
                  href={lesson.relatedProject.href}
                  className="font-semibold text-avanza-orange-dark underline underline-offset-2 hover:text-avanza-orange"
                >
                  {lesson.relatedProject.title} &rarr;
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Talk, reflect, and go further */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">What did you notice?</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Look back at your prediction and your results, then talk these through together.
          </p>
          <ul className="mt-4 space-y-2">
            {lesson.discussionQuestions.map((q) => (
              <li key={q} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-orange" />
                <span>{q}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">Reflect</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{lesson.reflectionPrompt}</p>
              <div aria-hidden className="mt-4 space-y-4">
                <span className="block border-b border-dashed border-border" />
                <span className="block border-b border-dashed border-border" />
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">Mini challenge</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{lesson.miniChallenge}</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
              Want to go further?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">{lesson.extension}</p>
          </div>

          <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-foreground">
            Before you finish
          </h3>
          <ul className="mt-3 space-y-2">
            {lesson.completionChecklist.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span
                  aria-hidden
                  className="mt-0.5 flex-none font-mono text-avanza-orange-dark"
                >
                  [ ]
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <ScienceLessonComplete week={lesson.week} />
        </div>
      </section>

      {/* Lab journal */}
      <ScienceLabJournal slug={lesson.slug} />

      {/* Lesson navigation */}
      <section className="print-hidden">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between">
            {prev ? (
              <Link
                href={scienceLessonPath(prev.slug)}
                className="flex-1 rounded-lg border border-border bg-card p-4 transition-colors hover:border-avanza-orange"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  &larr; Week {prev.week}
                </span>
                <span className="mt-1 block font-semibold text-foreground">{prev.title}</span>
              </Link>
            ) : (
              <span className="flex-1" />
            )}
            {next ? (
              <Link
                href={scienceLessonPath(next.slug)}
                className="flex-1 rounded-lg border border-border bg-card p-4 text-right transition-colors hover:border-avanza-orange"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Week {next.week} &rarr;
                </span>
                <span className="mt-1 block font-semibold text-foreground">{next.title}</span>
              </Link>
            ) : (
              <Link
                href={`${scienceExperimentsPath}#complete`}
                className="flex-1 rounded-lg border border-border bg-card p-4 text-right transition-colors hover:border-avanza-orange"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Finish the course &rarr;
                </span>
                <span className="mt-1 block font-semibold text-foreground">
                  {scienceExperimentsCurriculum.completion.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

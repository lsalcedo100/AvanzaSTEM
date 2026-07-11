import Link from "next/link"
import {
  scienceExperimentsCurriculum,
  scienceLessonPath,
} from "@/features/curriculums/science-experiments"
import {
  ScienceCompletion,
  ScienceCourseProgress,
  ScienceResumeButton,
  ScienceWeekList,
} from "@/components/pages/science-progress-ui"

/**
 * Overview page for the Science Experiments course (/courses/science-experiments).
 *
 * Reads entirely from `scienceExperimentsCurriculum`, so the six-week path,
 * materials, safety notes, goals, and outcomes all come from the data file
 * rather than being hardcoded here. The design is deliberately a science
 * notebook / lab journal: plain ruled sections, warm paper-toned surfaces, small
 * text labels instead of pill badges, and a single accent color (avanza-orange).
 * No gamified badges, emoji labels, glossy gradients, or floating cards.
 */
export function ScienceExperimentsContent() {
  const c = scienceExperimentsCurriculum
  const firstLesson = c.lessons[0]

  const heroDetails = [
    c.gradeRange,
    `${c.totalLessons} weeks`,
    `${c.estimatedTimePerLesson} per lesson`,
    "No lab or computer needed",
  ]

  return (
    <div className="bg-background">
      {/* 1. Course hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-avanza-orange-dark">
            6-week science course
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-foreground md:text-5xl">
            {c.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/90 md:text-lg">
            {c.subtitle}
          </p>

          <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            {heroDetails.map((detail, i) => (
              <li key={detail} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="text-border">|</span>}
                <span className="font-medium text-foreground">{detail}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href={scienceLessonPath(firstLesson.slug)}
              className="inline-flex items-center rounded-md bg-avanza-orange px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-avanza-orange-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Start Week 1
            </Link>
            <a
              href="#materials"
              className="inline-flex items-center rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-avanza-orange hover:text-avanza-orange-dark"
            >
              View materials
            </a>
            <a
              href="#safety"
              className="inline-flex items-center rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-avanza-orange hover:text-avanza-orange-dark"
            >
              Safety notes
            </a>
          </div>

          <div className="mt-10">
            <ScienceCourseProgress />
          </div>
        </div>
      </section>

      {/* 2. Course goals */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">What this course is for</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {c.summary}
          </p>
          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {c.goals.map((goal) => (
              <li key={goal} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-orange" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. The investigation loop */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">How every week works</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Each week runs on the same loop that real scientists use. Students never aim for a perfect
            first try - they predict, test, see what happens, and improve.
          </p>

          <ol className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-2">
            {c.investigationLoop.map((step, i) => (
              <li
                key={step.stage}
                className="relative flex items-start gap-4 sm:flex-col sm:items-center sm:gap-3 sm:text-center"
              >
                {/* Connector line linking the numbered nodes (desktop only). */}
                {i > 0 && (
                  <span
                    aria-hidden
                    className="absolute left-[-50%] top-4 hidden h-px w-full bg-border sm:block"
                  />
                )}
                <span className="relative z-10 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-avanza-orange bg-background font-mono text-sm font-semibold text-avanza-orange-dark">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{step.stage}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-xs">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. The 6-week learning path */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">The 6-week path</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Six weeks in order. Each week starts with a big question and answers it through one
            hands-on experiment.
          </p>

          <ScienceWeekList />
        </div>
      </section>

      {/* 5. What students will be able to do */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            What kids can do by the end
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {c.completion.summary}
          </p>
          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {c.learningOutcomes.map((outcome) => (
              <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-orange" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Materials, grouped by week */}
      <section id="materials" className="scroll-mt-24 border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">Materials by week</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Everything is common and low-cost. You only need a small handful for any single week, so
            gather as you go.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {c.lessons.map((lesson) => (
              <div key={lesson.slug} className="rounded-lg border border-border bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-avanza-orange-dark">
                  Week {lesson.week}
                </p>
                <h3 className="mt-0.5 text-sm font-bold text-foreground">{lesson.title}</h3>
                <ul className="mt-3 space-y-2">
                  {lesson.materials.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-orange"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-6 rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground">
            {c.materialsNote}
          </p>
        </div>
      </section>

      {/* 7. Safety notes */}
      <section id="safety" className="scroll-mt-24 border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">Safety notes</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            These experiments are safe, but a few habits keep them that way. Read these before you
            start, and each week adds its own specific notes.
          </p>
          <ul className="mt-6 space-y-3">
            {c.safetyNotes.map((note) => (
              <li key={note} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-orange"
                />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. For parents and teachers */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">For parents and teachers</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            You do not need a science background to run this course. A little preparation makes each
            week go smoothly:
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Skim the week ahead of time and set out the small list of materials before you start.",
              "Have students write their prediction before they test - being wrong is useful, not a mistake.",
              "Ask \"what did you notice?\" and \"why do you think that happened?\" instead of giving the answer.",
              "Plan about 45-60 minutes per week; the seed lab in week 6 also needs a quick daily check-in.",
              "Do the experiments together and keep water, vinegar, and scissors supervised.",
            ].map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-orange"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. Finishing the course (linked from Week 6) */}
      <section id="complete" className="scroll-mt-24 border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <ScienceCompletion />
        </div>
      </section>

      {/* 10. Closing call to action */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">Ready to start?</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Begin with {firstLesson.title} and the {firstLesson.activityTitle}, then work through all
            six weeks at your own pace.
          </p>
          <div className="mt-6">
            <ScienceResumeButton />
          </div>
          <p className="mt-6 text-sm">
            <Link
              href="/curriculums"
              className="font-semibold text-avanza-orange-dark underline underline-offset-2 hover:text-avanza-orange"
            >
              Back to all curriculums
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}

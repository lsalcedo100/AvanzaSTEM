"use client"

import { useLanguage } from "@/components/providers/language-provider"
import {
  findEngineeringLesson,
  getEngineeringFundamentalsCurriculum,
} from "@/features/curriculums/engineering-fundamentals/i18n"
import Link from "next/link"
import {
  EngineeringLessonComplete,
  EngineeringLessonVisit,
} from "@/components/pages/engineering-progress-ui"
import {
  DesignJournal,
  FailurePointSelector,
} from "@/components/pages/engineering-lesson-interactions"
import { EngineeringDiagram } from "@/components/ui/engineering-diagrams"
import { EngineeringMaterialComparison } from "@/components/ui/engineering-material-comparison"
import {
  engineeringFundamentalsPath,
  engineeringLessonPath,
  engineeringTeacherGuidePath,
  engineeringWorksheetPath,
  getEngineeringMaterialProperties,
  nextEngineeringLesson,
  previousEngineeringLesson,
  type EngineeringLesson,
} from "@/features/curriculums/engineering-fundamentals"

/**
 * The reusable lesson template for Engineering Fundamentals.
 *
 * Renders one `EngineeringLesson` from the data file through a fixed sequence of
 * sections (problem -> real world -> key ideas -> materials -> plan -> build ->
 * test -> record -> improve -> reflect -> extend -> complete). Fully written
 * lessons (1-3) supply the optional fields (problem, build steps, redesign
 * prompts, substitutions, real-world connection); lessons that do not yet have
 * them fall back gracefully, so every page stays coherent. The component is pure
 * layout - no lesson text lives here.
 */
export function EngineeringFundamentalsLessonContent({ slug }: { slug: string }) {
  const { language, t } = useLanguage()
  const L = t.courseUi.engineering.lesson
  const c = getEngineeringFundamentalsCurriculum(language)
  const lesson = findEngineeringLesson(language, slug) ?? c.lessons[0]
  const total = c.totalLessons
  const prev = previousEngineeringLesson(lesson.slug)
  const next = nextEngineeringLesson(lesson.slug)
  const label = lesson.isFinal
    ? L.finalChallenge
    : L.lessonOfTotal.replace("{n}", String(lesson.order)).replace("{total}", String(total))

  return (
    <div className="bg-background">
      <EngineeringLessonVisit order={lesson.order} />
      <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {/* 1. Lesson header */}
        <nav
          aria-label={L.navLesson}
          className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm"
        >
          <Link
            href={engineeringFundamentalsPath}
            className="font-semibold text-avanza-purple underline underline-offset-2 hover:text-avanza-purple-dark"
          >
            {L.courseTitle}
          </Link>
          <LessonNav prev={prev} next={next} compact />
        </nav>

        <header className="mt-6 border-b border-border pb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
            {lesson.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground/90 md:text-lg">
            {lesson.summary}
          </p>
          <dl className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            <HeaderDetail label={L.estimatedTime} value={lesson.estimatedTime} />
            <HeaderDetail label={L.mainProject} value={lesson.projectName} />
          </dl>

          {/* Lesson resources */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={engineeringWorksheetPath(lesson.slug)}
              className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-avanza-purple transition-colors hover:border-avanza-purple hover:bg-avanza-purple/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-purple focus-visible:ring-offset-2"
            >
              {L.printWorksheet}
            </Link>
            <Link
              href={engineeringTeacherGuidePath(lesson.slug)}
              className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-semibold text-avanza-purple transition-colors hover:border-avanza-purple hover:bg-avanza-purple/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-purple focus-visible:ring-offset-2"
            >
              {L.viewGuide}
            </Link>
          </div>
        </header>

        {/* 2. The problem */}
        <Section title={L.theProblem}>
          <p className="text-base leading-relaxed text-foreground/90">
            {lesson.problem ?? lesson.designBrief}
          </p>
          {lesson.constraints.length > 0 && (
            <div className="mt-5 rounded-md border border-border bg-secondary p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {L.theRules}
              </p>
              <ul className="mt-3 space-y-2">
                {lesson.constraints.map((rule) => (
                  <li key={rule} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                    <Dot />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Section>

        {/* 3. Real-world connection */}
        <Section title={L.realLife}>
          {lesson.realWorldConnection ? (
            <>
              <p className="text-base leading-relaxed text-foreground/90">
                {lesson.realWorldConnection.intro}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm text-foreground/90">
                {lesson.realWorldConnection.appearsIn.map((place, i) => (
                  <li key={place} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden className="text-border">|</span>}
                    <span className="font-medium text-foreground">{place}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <ul className="space-y-2">
              {lesson.realWorldExamples.map((example) => (
                <li key={example} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                  <Dot />
                  <span>{example}</span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        {/* 4. Key ideas */}
        <Section title={L.keyIdeas}>
          {lesson.conceptsReviewed && lesson.conceptsReviewed.length > 0 && (
            <div className="mb-6">
              <p className="text-sm leading-relaxed text-foreground/90">
                {L.finalIntro}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm">
                {lesson.conceptsReviewed.map((concept, i) => (
                  <li key={concept} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden className="text-border">|</span>}
                    <span className="font-medium text-foreground">{concept}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <dl className="divide-y divide-border border-t border-b border-border">
            {lesson.concepts.map((concept) => (
              <div key={concept.term} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
                <dt className="text-sm font-semibold text-foreground">{concept.term}</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">
                  {concept.definition}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* Force / motion diagram */}
        {lesson.diagram && (
          <Section title={L.seeHowItWorks}>
            <EngineeringDiagram kind={lesson.diagram} />
          </Section>
        )}

        {/* 5. Materials */}
        <Section title={L.materials}>
          <ul className="grid gap-x-10 gap-y-2 sm:grid-cols-2">
            {lesson.materials.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <Dot />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {lesson.substitutions && lesson.substitutions.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {L.noProblemMissing}
              </p>
              <ul className="mt-3 space-y-2">
                {lesson.substitutions.map((sub) => (
                  <li key={sub} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                    <Dot />
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Section>

        {/* Material comparison (structure / motion / materials lessons) */}
        {lesson.comparedMaterials && lesson.comparedMaterials.length > 0 && (
          <Section title={L.compareMaterials}>
            <p className="text-sm text-muted-foreground">
              {L.compareMaterialsIntro}
            </p>
            <div className="mt-4">
              <EngineeringMaterialComparison
                materials={getEngineeringMaterialProperties(lesson.comparedMaterials)}
              />
            </div>
          </Section>
        )}

        {/* Choose your solution path (final challenge only) */}
        {lesson.solutionPaths && lesson.solutionPaths.length > 0 && (
          <Section title={L.choosePath}>
            <p className="text-sm text-muted-foreground">
              Pick one direction. There is no single right answer - each path can complete the
              mission if you design it well.
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {lesson.solutionPaths.map((path) => (
                <li
                  key={path}
                  className="rounded-md border border-border p-4 text-sm leading-relaxed text-foreground/90"
                >
                  {path}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* 6. Plan before building */}
        <Section title={L.planBeforeBuild}>
          <p className="text-sm text-muted-foreground">
            {L.planIntro}
          </p>
          <ol className="mt-4 space-y-2">
            {c.planningPrompts.map((prompt, i) => (
              <li key={prompt} className="grid grid-cols-[1.5rem_1fr] gap-3">
                <span className="font-mono text-sm font-semibold text-muted-foreground">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-foreground/90">{prompt}</span>
              </li>
            ))}
          </ol>
          <SketchArea />
        </Section>

        {/* 7. Build instructions */}
        <Section title={L.buildIt}>
          <p className="text-sm text-muted-foreground">
            These are guides, not rules. Two students can follow them and build very different
            designs - that is the point.
          </p>
          {lesson.buildSteps && lesson.buildSteps.length > 0 ? (
            <ol className="mt-5 space-y-4">
              {lesson.buildSteps.map((step, i) => (
                <li key={step} className="grid grid-cols-[2rem_1fr] gap-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border font-mono text-sm font-semibold text-muted-foreground">
                    {i + 1}
                  </span>
                  <p className="self-center text-sm leading-relaxed text-foreground/90">{step}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-foreground/90">
              Use the problem and the rules above to plan your own build. Sketch it, gather your
              materials, and make a first version you can test.
            </p>
          )}
        </Section>

        {/* 8. Testing challenge */}
        <Section title={L.testingChallenge}>
          <p className="text-sm leading-relaxed text-foreground/90">
            A design is only finished when it passes a fair test. Run each test the same way every
            time.
          </p>
          <ul className="mt-4 space-y-3">
            {lesson.testingChallenges.map((challenge) => (
              <li key={challenge.test} className="rounded-md border border-border p-4">
                <p className="text-sm font-semibold text-foreground">{challenge.test}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {challenge.howTo}
                </p>
                <p className="mt-2 text-sm text-foreground/90">
                  <span className="font-semibold">{L.measure}</span> {challenge.measure}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* 9. Record your results */}
        <Section title={L.recordResults}>
          <p className="text-sm text-muted-foreground">
            Write down what happens each time you test. Your numbers tell you what to improve. Print
            this page or copy the table into your notebook.
          </p>
          <div className="mt-4 overflow-x-auto rounded-md border border-border">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary">
                  <th className="px-4 py-3 font-semibold text-foreground">{L.colTest}</th>
                  <th className="px-4 py-3 font-semibold text-foreground">{L.colWhatToRecord}</th>
                  <th className="px-4 py-3 font-semibold text-foreground">{L.colTry1}</th>
                  <th className="px-4 py-3 font-semibold text-foreground">{L.colTry2}</th>
                  <th className="px-4 py-3 font-semibold text-foreground">{L.colTry3}</th>
                </tr>
              </thead>
              <tbody>
                {lesson.testingChallenges.map((challenge) => (
                  <tr key={challenge.test} className="border-b border-border align-top last:border-b-0">
                    <td className="px-4 py-4 font-medium text-foreground">{challenge.test}</td>
                    <td className="px-4 py-4 text-muted-foreground">{challenge.measure}</td>
                    <ResultCell />
                    <ResultCell />
                    <ResultCell />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* 10. Improve your design */}
        <Section title={L.improveDesign}>
          <p className="text-sm text-muted-foreground">
            Your first version is a prototype, not the final answer. Change one thing based on what
            failed, then test again.
          </p>
          {lesson.redesignPrompts && lesson.redesignPrompts.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {lesson.redesignPrompts.map((prompt) => (
                <li key={prompt} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                  <Dot />
                  <span>{prompt}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-foreground/90">
              Look at what failed first in testing. Change that one part, keep everything else the
              same, and run the same test again to see if it helped.
            </p>
          )}

          {/* Interactive diagnostic: pick what failed to see targeted fixes. */}
          <div className="mt-6 border-t border-border pt-6">
            <FailurePointSelector />
          </div>
        </Section>

        {/* 11. Reflection questions */}
        <Section title={L.thinkAboutIt}>
          <ol className="space-y-3">
            {lesson.reflectionQuestions.map((question, i) => (
              <li key={question} className="grid grid-cols-[1.5rem_1fr] gap-3">
                <span className="font-mono text-sm font-semibold text-muted-foreground">
                  {i + 1}
                </span>
                <span className="text-base leading-relaxed text-foreground/90">{question}</span>
              </li>
            ))}
          </ol>
        </Section>

        {/* 12. Optional extension challenge */}
        <Section title={L.finishedEarly}>
          <ul className="space-y-2">
            {lesson.extensionChallenges.map((challenge) => (
              <li key={challenge} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <Dot />
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Design journal (interactive, saved to localStorage) */}
        <Section title={L.designJournal}>
          <DesignJournal slug={lesson.slug} />
        </Section>

        {/* Present your design (final challenge only) */}
        {lesson.presentationPrompts && lesson.presentationPrompts.length > 0 && (
          <Section title={L.presentDesign}>
            <p className="text-sm text-muted-foreground">
              {L.presentIntro}
            </p>
            <ol className="mt-4 space-y-3">
              {lesson.presentationPrompts.map((prompt, i) => (
                <li key={prompt} className="grid grid-cols-[1.5rem_1fr] gap-3">
                  <span className="font-mono text-sm font-semibold text-muted-foreground">
                    {i + 1}
                  </span>
                  <span className="text-base leading-relaxed text-foreground/90">{prompt}</span>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Facilitator notes (extra, for the adult running the session) */}
        <Section title={L.teacherNotes}>
          <div className="rounded-md border border-border bg-secondary p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">{lesson.teacherNotes}</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Running this lesson? The{" "}
            <Link
              href={engineeringTeacherGuidePath(lesson.slug)}
              className="font-semibold text-avanza-purple underline underline-offset-2 hover:text-avanza-purple-dark"
            >
              parent &amp; teacher guide
            </Link>{" "}
            has setup, materials prep, safety notes, common failure points, and questions to ask.
          </p>
        </Section>

        {/* 13. Mark lesson complete */}
        <EngineeringLessonComplete order={lesson.order} />

        {/* Footer navigation */}
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
  prev: EngineeringLesson | null
  next: EngineeringLesson | null
  compact?: boolean
}) {
  const L = useLanguage().t.courseUi.engineering.lesson
  const name = (lesson: EngineeringLesson) =>
    lesson.isFinal ? L.finalChallenge : L.lessonLabel.replace("{n}", String(lesson.order))
  const prevLabel = prev ? name(prev) : null
  const nextLabel = next ? name(next) : null

  if (compact) {
    return (
      <span className="flex items-center gap-4 text-sm">
        {prev && (
          <Link
            href={engineeringLessonPath(prev.slug)}
            className="font-semibold text-avanza-purple underline underline-offset-2 hover:text-avanza-purple-dark"
          >
            &larr; {prevLabel}
          </Link>
        )}
        {next && (
          <Link
            href={engineeringLessonPath(next.slug)}
            className="font-semibold text-avanza-purple underline underline-offset-2 hover:text-avanza-purple-dark"
          >
            {nextLabel} &rarr;
          </Link>
        )}
      </span>
    )
  }

  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      {prev ? (
        <Link
          href={engineeringLessonPath(prev.slug)}
          className="font-semibold text-avanza-purple underline underline-offset-2 hover:text-avanza-purple-dark"
        >
          &larr; {L.previousLabel.replace("{label}", prevLabel ?? "")}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={engineeringLessonPath(next.slug)}
          className="text-right font-semibold text-avanza-purple underline underline-offset-2 hover:text-avanza-purple-dark"
        >
          {L.nextLabel.replace("{label}", nextLabel ?? "")} &rarr;
        </Link>
      ) : (
        <Link
          href={engineeringFundamentalsPath}
          className="text-right font-semibold text-avanza-purple underline underline-offset-2 hover:text-avanza-purple-dark"
        >
          {L.backToOverviewArrow} &rarr;
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
  return <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-purple" />
}

/** A blank blueprint-grid box for sketching a design plan (also prints cleanly). */
function SketchArea() {
  const L = useLanguage().t.courseUi.engineering.lesson
  return (
    <div className="mt-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {L.sketchTitle}
      </p>
      <div
        className="mt-2 h-44 w-full rounded-md border border-dashed border-border"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />
      <p className="mt-2 text-xs text-muted-foreground">
        {L.sketchIntro}
      </p>
    </div>
  )
}

/** An empty table cell with a faint writing line, for recording a test result. */
function ResultCell() {
  return (
    <td className="px-4 py-4">
      <span aria-hidden className="block h-5 border-b border-dashed border-border" />
    </td>
  )
}

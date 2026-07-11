import Link from "next/link"
import {
  MathCourseProgress,
  MathLessonPath,
  MathResumeButton,
  MathTeacherControls,
} from "@/components/pages/math-adventures-progress-ui"
import { mathAdventuresCurriculum } from "@/features/curriculums/math-adventures"

/**
 * Overview / hub page for the Math Adventures course (/courses/math-adventures).
 *
 * Reads entirely from `mathAdventuresCurriculum`. Every week, topic, and detail
 * comes from the data file rather than being hardcoded here, so the hub and the
 * lesson pages stay in sync. The design follows the existing course hubs
 * (Engineering, Science): a real guided-course syllabus, not a gamified page -
 * no achievement badges, mascots, emoji, or heavy gradients. The one visual is a
 * plain number line standing in for the ten-week path, matching the course's
 * math theme without decoration for its own sake.
 */
export function MathAdventuresContent() {
  const c = mathAdventuresCurriculum

  const heroDetails = [
    c.gradeRange,
    `${c.totalWeeks} weeks`,
    `${c.estimatedTimePerLesson} per lesson`,
    "Self-paced",
    "No computer required",
  ]

  return (
    <div className="bg-background">
      {/* 1. Course hero + progress summary */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            10-week guided math course
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-foreground md:text-5xl">{c.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/90 md:text-lg">
            {c.description}
          </p>

          <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            {heroDetails.map((detail, i) => (
              <li key={detail} className="flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden className="text-border">
                    |
                  </span>
                )}
                <span className="font-medium text-foreground">{detail}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <MathCourseProgress />
          </div>
        </div>
      </section>

      {/* 2. What you'll cover */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">What you&apos;ll cover</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Ten topics, one per week, each building on the last - from reading numbers to running a
            whole math city.
          </p>
          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {c.topics.map((topic) => (
              <li
                key={topic}
                className="flex gap-3 text-sm leading-relaxed text-foreground/90"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-teal"
                />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Week-by-week lesson path */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">The 10-week path</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Work through the weeks in order at your own pace. Each week teaches one idea, then puts
            it to work in an activity and a hands-on challenge. The last week combines everything
            into a final project.
          </p>

          <NumberLinePath total={c.totalWeeks} />

          <MathLessonPath />
        </div>
      </section>

      {/* 4. How each week works */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">How each week works</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Every week follows the same rhythm, so students always know what to expect. A full week
            takes about {c.estimatedTimePerLesson} and can be split across a few short sessions.
          </p>

          <ol className="mt-8 space-y-4">
            {WEEK_STRUCTURE.map((part, i) => (
              <li key={part.title} className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="font-mono text-sm font-semibold text-muted-foreground">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{part.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {part.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. For parents and teachers */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">For parents and teachers</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            You do not need to be a math teacher to run this course. A few things make the weeks work
            well:
          </p>
          <ul className="mt-6 space-y-3">
            {PARENT_NOTES.map((note) => (
              <li key={note} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-teal"
                />
                <span>{note}</span>
              </li>
            ))}
          </ul>

          <MathTeacherControls />
        </div>
      </section>

      {/* 6. Final project preview */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Week 10 &middot; Final project
          </p>
          <h2 className="mt-2 text-xl font-bold text-foreground md:text-2xl">
            {c.finalProjectTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/90">
            {c.finalProjectDescription}
          </p>
          <div className="mt-6 rounded-lg border border-border bg-card p-5">
            <p className="text-sm font-semibold text-foreground">
              Skills the final project pulls together
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {FINAL_PROJECT_SKILLS.map((skill) => (
                <li key={skill} className="flex items-center gap-2">
                  <span aria-hidden className="h-1 w-4 flex-none rounded-full bg-avanza-teal" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Closing call to action */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">Ready to start?</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Begin with Week 1: Number Detectives and work through all ten weeks at your own pace.
            Your progress is saved on this device.
          </p>
          <div className="mt-6">
            <MathResumeButton />
          </div>
          <p className="mt-6 text-sm">
            <Link
              href="/curriculums"
              className="font-semibold text-avanza-teal-dark underline underline-offset-2 hover:text-avanza-teal"
            >
              Back to all curriculums
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}

/** What every week contains - shown in the "How each week works" section. */
const WEEK_STRUCTURE = [
  {
    title: "Explanation",
    description:
      "A short story hook and a clear main lesson that introduces the week's idea in plain language.",
  },
  {
    title: "Worked examples",
    description:
      "Practice problems solved step by step, so students see the reasoning, not just the answer.",
  },
  {
    title: "Interactive activity",
    description:
      "A hands-on, on-screen activity - a number line, a fraction model, a graph builder - that makes the idea concrete.",
  },
  {
    title: "Hands-on challenge",
    description:
      "An off-screen build or game using cheap, common materials, so learning leaves the screen.",
  },
  {
    title: "Checkpoint",
    description:
      "Quick self-check questions and a reflection prompt that asks students to explain their thinking.",
  },
  {
    title: "Extension",
    description:
      "A tougher challenge problem and an optional stretch task for students who want to go further.",
  },
]

/** Guidance points for the parent / teacher section. */
const PARENT_NOTES = [
  "Each week is designed for about 45-60 minutes and can be split across a few short sessions instead of one sitting.",
  'Ask questions rather than giving answers. "How did you figure that out?" teaches more than correcting a step.',
  "Every week uses common, low-cost materials - paper, coins, a ruler, dice - and never needs a computer to complete.",
  "Each week ends with a checkpoint and a reflection question, so students practice explaining their own reasoning.",
  "Progress is saved on this device as students complete each week - no account or sign-in is needed.",
]

/** The course strands the Week 10 project combines. */
const FINAL_PROJECT_SKILLS = [
  "Geometry",
  "Measurement",
  "Money",
  "Data",
  "Fractions",
  "Operations",
  "Logic",
]

/**
 * A plain number line standing in for the ten-week path: evenly spaced ticks
 * numbered 1-10, with the final week marked as the endpoint. Deliberately
 * minimal - thin strokes and monospace numerals, like a classroom handout, not
 * decorative art. Purely illustrative, so it is hidden from assistive tech.
 */
function NumberLinePath({ total }: { total: number }) {
  // A narrower viewBox keeps the numerals legible when the SVG scales down to
  // phone widths (a wide viewBox would shrink the labels to a few pixels).
  const width = 460
  const height = 66
  const marginX = 22
  const y = 28
  const step = (width - marginX * 2) / (total - 1)
  const ticks = Array.from({ length: total }, (_, i) => ({
    x: marginX + i * step,
    label: i + 1,
    isFinal: i === total - 1,
  }))

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`A number line marking the ${total} weeks of the course, from Week 1 to Week ${total}.`}
      className="mt-8 w-full text-muted-foreground"
    >
      <line
        x1={marginX}
        y1={y}
        x2={width - marginX}
        y2={y}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      {ticks.map((tick) => (
        <g key={tick.label}>
          <line
            x1={tick.x}
            y1={y - 6}
            x2={tick.x}
            y2={y + 6}
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <circle
            cx={tick.x}
            cy={y}
            r={tick.isFinal ? 5 : 3}
            fill={tick.isFinal ? "var(--avanza-teal)" : "var(--card)"}
            stroke={tick.isFinal ? "var(--avanza-teal)" : "currentColor"}
            strokeWidth={1.5}
          />
          <text
            x={tick.x}
            y={y + 26}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="15"
            fontWeight="600"
            fill="var(--foreground)"
          >
            {tick.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

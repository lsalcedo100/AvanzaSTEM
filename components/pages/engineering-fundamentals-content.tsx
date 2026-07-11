import Link from "next/link"
import {
  EngineeringCourseProgress,
  EngineeringLessonList,
  EngineeringResumeButton,
} from "@/components/pages/engineering-progress-ui"
import {
  engineeringFundamentalsCurriculum,
  type EngineeringDesignStep,
} from "@/features/curriculums/engineering-fundamentals"

/**
 * Overview page for the Engineering Fundamentals course (/courses/engineering-fundamentals).
 *
 * Reads entirely from `engineeringFundamentalsCurriculum`. All repeated content
 * (lessons, learning goals, grouped materials, design process) comes from the
 * data file rather than being hardcoded here. The design is deliberately a real
 * course syllabus - not a gamified education page: no pills, badges, achievement
 * icons, emoji, mascots, or glossy illustrations. The one diagram is a plain
 * blueprint-style SVG of the design-process loop.
 */
export function EngineeringFundamentalsContent() {
  const c = engineeringFundamentalsCurriculum

  const heroDetails = [
    c.gradeRange,
    `${c.totalLessons} lessons`,
    `${c.estimatedTimePerLesson} per lesson`,
    "Beginner-friendly",
    "No special tools needed",
  ]

  return (
    <div className="bg-background">
      {/* 1. Course hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            6-week engineering course
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

          <div className="mt-10">
            <EngineeringCourseProgress />
          </div>
        </div>
      </section>

      {/* 2. What students will learn */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            What students will learn
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            By the end of the course, every student can:
          </p>
          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {c.learningGoals.map((goal) => (
              <li key={goal} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-purple" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Course lesson list */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">Course lessons</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Six lessons in order. Each one teaches an engineering idea, then puts it to work in a
            hands-on build you test and improve.
          </p>

          <EngineeringLessonList />
        </div>
      </section>

      {/* 4. Materials for the full course */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            Materials for the full course
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Everything is common and low-cost. Gather what you can and add the rest over time.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {c.materialGroups.map((group) => (
              <div key={group.label} className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
                  {group.label}
                </h3>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-foreground/90"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-purple"
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

      {/* 5. How the course works */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">How the course works</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Every lesson runs on the same six-step loop that real engineers use. Students do not aim
            for a perfect first try - they build something testable, see what fails, and improve it.
            The loop repeats until the design meets the challenge.
          </p>

          <div className="mt-10 grid items-center gap-10 md:grid-cols-[300px_1fr]">
            <DesignProcessDiagram steps={c.designProcess} />

            <ol className="space-y-4">
              {c.designProcess.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="font-mono text-sm font-semibold text-muted-foreground">
                    {i + 1}
                  </span>
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
        </div>
      </section>

      {/* 6. Parent / teacher guide preview */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            For parents and teachers
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            You do not need an engineering background to run this course. A few things make the
            lessons work well:
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Lessons work best when students are allowed to test imperfect designs. A design that fails a test is not a mistake - it is the information used to improve it.",
              "Ask questions instead of fixing the design too early. \"What happened when you tested it?\" teaches more than handing a student the answer.",
              "Every lesson ends with reflection and a redesign, so students practice improving their own work.",
              "Each lesson links to a printable student worksheet and a parent/teacher guide with setup, safety notes, and questions to ask.",
            ].map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-purple"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Closing call to action */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">Ready to build?</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Start with the Paper Tower Challenge and work through all six lessons at your own pace.
            Your progress is saved on this device.
          </p>
          <div className="mt-6">
            <EngineeringResumeButton />
          </div>
          <p className="mt-6 text-sm">
            <Link
              href="/curriculums"
              className="font-semibold text-avanza-purple underline underline-offset-2 hover:text-avanza-purple-dark"
            >
              Back to all curriculums
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}

/**
 * A plain blueprint-style diagram of the six-step design loop: numbered nodes
 * arranged in a ring with arrows showing the cycle. Deliberately minimal - thin
 * strokes and a monospace feel, like a classroom handout, not decorative art.
 * Node numbers correspond to the ordered step list beside it.
 */
function DesignProcessDiagram({ steps }: { steps: EngineeringDesignStep[] }) {
  const size = 300
  const cx = size / 2
  const cy = size / 2
  const radius = 104
  const nodeR = 30
  const n = steps.length

  const points = steps.map((_, i) => {
    const angle = (-90 + i * (360 / n)) * (Math.PI / 180)
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) }
  })

  const edges = points.map((a, i) => {
    const b = points[(i + 1) % n]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const len = Math.hypot(dx, dy) || 1
    const ux = dx / len
    const uy = dy / len
    const gap = nodeR + 5
    return {
      x1: a.x + ux * gap,
      y1: a.y + uy * gap,
      x2: b.x - ux * (gap + 3),
      y2: b.y - uy * (gap + 3),
    }
  })

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="The design process is a loop: ask, imagine, plan, create, test, improve, and repeat."
      className="mx-auto w-full max-w-75 text-muted-foreground"
    >
      <defs>
        <marker
          id="ef-design-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
        </marker>
      </defs>

      {edges.map((edge, i) => (
        <line
          key={i}
          x1={edge.x1}
          y1={edge.y1}
          x2={edge.x2}
          y2={edge.y2}
          stroke="currentColor"
          strokeWidth={1.5}
          markerEnd="url(#ef-design-arrow)"
        />
      ))}

      {points.map((point, i) => (
        <g key={i}>
          <circle
            cx={point.x}
            cy={point.y}
            r={nodeR}
            fill="var(--card)"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <text
            x={point.x}
            y={point.y - 4}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="12"
            fontWeight="600"
            fill="var(--muted-foreground)"
          >
            {i + 1}
          </text>
          <text
            x={point.x}
            y={point.y + 12}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--foreground)"
          >
            {steps[i].title}
          </text>
        </g>
      ))}
    </svg>
  )
}

import {
  EngineeringCourseProgress,
  EngineeringLessonList,
  EngineeringResumeButton,
} from "@/components/pages/engineering-progress-ui"
import {
  engineeringFundamentalsCurriculum,
  engineeringLessonPath,
  type EngineeringDesignStep,
} from "@/features/curriculums/engineering-fundamentals"
import {
  Callout,
  CheckGrid,
  CourseButton,
  CourseActions,
  CourseClosing,
  CourseHero,
  CourseJumpNav,
  CourseSection,
  CourseShell,
  CourseTextLink,
  MaterialsGrid,
  PhotoBand,
  StatRow,
  StepFlow,
  courseThemes,
} from "@/components/pages/courses/course-ui"

/**
 * Overview page for the Engineering Fundamentals course (/courses/engineering-fundamentals).
 *
 * Reads entirely from `engineeringFundamentalsCurriculum`, so lessons, learning
 * goals, grouped materials, and the design process all come from the data file.
 *
 * Design: the shared course kit (`components/pages/courses/course-ui`) in the
 * purple "blueprint" palette. The page leads with the builds themselves,
 * because what convinces a nine-year-old (and their parent) is seeing the
 * bridge, not reading about load tolerance. The design-process ring is kept as
 * the one real diagram and recolored to the course accent.
 */
export function EngineeringFundamentalsContent() {
  const c = engineeringFundamentalsCurriculum
  const firstLesson = c.lessons[0]

  return (
    <CourseShell theme={courseThemes.engineering}>
      <CourseHero
        eyebrow="6-week engineering course"
        title={c.title}
        lead={c.subtitle}
        facts={[
          { label: "Ages", value: c.gradeRange },
          { label: "Length", value: `${c.totalLessons} lessons` },
          { label: "Per lesson", value: c.estimatedTimePerLesson },
          { label: "You need", value: "Paper & tape" },
        ]}
        media={{
          src: "/images/workshops/past-engineering.jpg",
          alt: "Students building a structure together at an Avanza STEM engineering workshop",
        }}
        mediaCaption="Six challenges. Build it, test it, watch it fail, make it better."
        note="No computer, no kit, and no engineering background needed."
      >
        <CourseActions>
          <CourseButton href={engineeringLessonPath(firstLesson.slug)}>Start Lesson 1</CourseButton>
          <CourseTextLink href="#builds">See what you&apos;ll build</CourseTextLink>
        </CourseActions>
      </CourseHero>

      <CourseJumpNav
        items={[
          { href: "#builds", label: "What you'll build" },
          { href: "#lessons", label: "The 6 lessons" },
          { href: "#process", label: "How it works" },
          { href: "#materials", label: "Materials" },
          { href: "#grown-ups", label: "For grown-ups" },
        ]}
      />

      {/* The builds - photos first, because the builds are the whole pitch. */}
      <CourseSection
        id="builds"
        tone="tint"
        eyebrow="The builds"
        title="Six things you'll actually make"
        lead="Every lesson ends with something you can hold, load up, knock over, and rebuild better. All of it comes from paper, cardboard, tape, and string."
      >
        <PhotoBand
          photos={[
            {
              src: "/images/projects/popsicle-stick-bridge/cover.jpg",
              alt: "A bridge built from popsicle sticks spanning between two supports",
              caption:
                "Bridges and towers: find out how shape - not strength - carries the weight.",
            },
            {
              src: "/images/workshops/upcoming-bridge-building.jpg",
              alt: "Students testing a hand-built bridge at an Avanza STEM building workshop",
              caption: "Load testing with coins and washers, then redesigning what buckled.",
            },
            {
              src: "/images/projects/simple-circuit-light/cover.jpg",
              alt: "A simple hand-built circuit lighting a small bulb",
              caption: "Machines and mechanisms that move, lift, and light up when you build them right.",
            },
          ]}
        />

        <ol className="mt-12 grid gap-x-12 border-t border-avanza-dark/10 sm:grid-cols-2 lg:grid-cols-3">
          {c.lessons.map((lesson) => (
            <li
              key={lesson.slug}
              className="flex gap-5 border-b border-avanza-dark/10 py-6"
            >
              <span
                aria-hidden
                className="font-mono text-2xl font-bold leading-none text-[var(--c-accent)]"
              >
                {lesson.isFinal ? "06" : String(lesson.order).padStart(2, "0")}
              </span>
              <div>
                <p className="text-lg font-extrabold text-avanza-dark">{lesson.projectName}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-avanza-dark/70">{lesson.title}</p>
              </div>
            </li>
          ))}
        </ol>
      </CourseSection>

      {/* Learning goals. */}
      <CourseSection
        eyebrow="What students learn"
        title="Engineering is a way of thinking, not a subject"
        lead={c.summary}
        aside={
          <StatRow
            stats={[
              { value: `${c.totalLessons}`, label: "Hands-on builds" },
              { value: "$0", label: "Special equipment" },
            ]}
          />
        }
      >
        <CheckGrid items={c.learningGoals} />
      </CourseSection>

      {/* Lesson list + progress. */}
      <CourseSection
        id="lessons"
        tone="tint"
        eyebrow="The path"
        title="Six lessons, in order"
        lead="Each one teaches an engineering idea, then puts it to work in a build you test and improve. Your progress saves on this device - no account needed."
      >
        <div className="mb-10 max-w-2xl">
          <EngineeringCourseProgress />
        </div>
        <EngineeringLessonList />
      </CourseSection>

      {/* The design process, on dark. */}
      <CourseSection
        id="process"
        tone="dark"
        eyebrow="The method"
        title="The loop real engineers use"
        lead="Students do not aim for a perfect first try. They build something testable, find out what fails, and improve it. The loop repeats until the design meets the challenge."
      >
        <div className="grid items-center gap-12 lg:grid-cols-[320px_1fr]">
          <DesignProcessDiagram steps={c.designProcess} />
          <StepFlow
            dark
            columns={2}
            steps={c.designProcess.map((step) => ({
              title: step.title,
              description: step.description,
            }))}
          />
        </div>
      </CourseSection>

      {/* Materials. */}
      <CourseSection
        id="materials"
        eyebrow="Shopping list"
        title="What to have on hand"
        lead="Everything is common and low-cost. Gather what you can and add the rest over time - no lesson is blocked by one missing item."
      >
        <MaterialsGrid groups={c.materialGroups} />
        <div className="mt-8">
          <Callout title="Good to know">
            {c.materialsNote}
          </Callout>
        </div>
      </CourseSection>

      {/* Parents and teachers. */}
      <CourseSection
        id="grown-ups"
        tone="paper"
        eyebrow="For grown-ups"
        title="You do not need an engineering background"
        lead="The hardest part of running this course is resisting the urge to fix the design yourself. Here is what makes the lessons work."
      >
        <CheckGrid
          columns={2}
          items={[
            "Let students test imperfect designs. A design that fails a test is not a mistake - it is the information used to improve it.",
            'Ask questions instead of fixing the build. "What happened when you tested it?" teaches more than handing over the answer.',
            "Every lesson ends with reflection and a redesign, so students practice improving their own work.",
            "Each lesson links to a printable student worksheet and a parent & teacher guide with setup, safety notes, and questions to ask.",
          ]}
        />
        <div className="mt-8">
          <Callout title="Where this fits">
            {c.requirement}. It works as a library club, an after-school program, classroom
            enrichment, or a weekend project at the kitchen table.
          </Callout>
        </div>
      </CourseSection>

      <CourseClosing
        title="Ready to build something?"
        description={`Start with the ${firstLesson.projectName} and work through all six lessons at your own pace. Your progress is saved on this device.`}
      >
        <EngineeringResumeButton />
      </CourseClosing>
    </CourseShell>
  )
}

/**
 * The six-step design loop as a ring of numbered nodes with arrows. The one
 * real diagram on the page - kept from the original build, but recolored to the
 * course accent and sized to sit beside the step cards on a dark band.
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
      className="mx-auto w-full max-w-80 text-[var(--c-accent)]"
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
            fill="var(--c-accent)"
            stroke="var(--c-accent)"
            strokeWidth={1.5}
          />
          <text
            x={point.x}
            y={point.y - 4}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="12"
            fontWeight="700"
            fill="#ffffff"
          >
            {i + 1}
          </text>
          <text
            x={point.x}
            y={point.y + 12}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#ffffff"
          >
            {steps[i].title}
          </text>
        </g>
      ))}
    </svg>
  )
}

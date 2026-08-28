"use client"

import { useLanguage } from "@/components/providers/language-provider"
import {
  EngineeringCourseProgress,
  EngineeringLessonList,
  EngineeringResumeButton,
} from "@/components/pages/engineering-progress-ui"
import { getEngineeringFundamentalsCurriculum } from "@/features/curriculums/engineering-fundamentals/i18n"
import {
  engineeringLessonPath,
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
 * Reads entirely from the localized engineering curriculum, so lessons, learning
 * goals, grouped materials, and the design process all come from the data file.
 *
 * Design: the shared course kit (`components/pages/courses/course-ui`) in the
 * purple "blueprint" palette. The page leads with the builds themselves,
 * because what convinces a nine-year-old (and their parent) is seeing the
 * bridge, not reading about load tolerance. The design-process ring is kept as
 * the one real diagram and recolored to the course accent.
 */
export function EngineeringFundamentalsContent() {
  const { language, t } = useLanguage()
  const el = t.courseLanding.engineering
  const c = getEngineeringFundamentalsCurriculum(language)
  const firstLesson = c.lessons[0]
  const photoSrcs = [
    "/images/projects/popsicle-stick-bridge/cover.jpg",
    "/images/workshops/upcoming-bridge-building.jpg",
    "/images/projects/simple-circuit-light/cover.jpg",
  ]

  return (
    <CourseShell theme={courseThemes.engineering}>
      <CourseHero
        eyebrow={el.heroEyebrow}
        title={el.title}
        lead={el.lead}
        facts={el.facts}
        media={{
          src: "/images/workshops/past-engineering.jpg",
          alt: el.heroAlt,
        }}
        mediaCaption={el.mediaCaption}
        note={el.note}
      >
        <CourseActions>
          <CourseButton href={engineeringLessonPath(firstLesson.slug)}>{el.startBtn}</CourseButton>
          <CourseTextLink href="#builds">{el.buildsBtn}</CourseTextLink>
        </CourseActions>
      </CourseHero>

      <CourseJumpNav
        label={t.courseLanding.onThisPage}
        items={[
          { href: "#builds", label: el.jumpNav[0] },
          { href: "#lessons", label: el.jumpNav[1] },
          { href: "#process", label: el.jumpNav[2] },
          { href: "#materials", label: el.jumpNav[3] },
          { href: "#grown-ups", label: el.jumpNav[4] },
        ]}
      />

      {/* The builds - photos first, because the builds are the whole pitch. */}
      <CourseSection id="builds" tone="tint" eyebrow={el.buildsEyebrow} title={el.buildsTitle} lead={el.buildsLead}>
        <PhotoBand
          photos={el.photos.map((photo, i) => ({
            src: photoSrcs[i],
            alt: photo.alt,
            caption: photo.caption,
          }))}
        />

        <ol className="mt-12 grid gap-x-12 border-t border-avanza-dark/10 sm:grid-cols-2 lg:grid-cols-3">
          {c.lessons.map((lesson, i) => (
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
                <p className="text-lg font-extrabold text-avanza-dark">{el.lessons[i].projectName}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-avanza-dark/70">{el.lessons[i].title}</p>
              </div>
            </li>
          ))}
        </ol>
      </CourseSection>

      {/* Learning goals. */}
      <CourseSection
        eyebrow={el.goalsEyebrow}
        title={el.goalsTitle}
        lead={el.goalsLead}
        aside={
          <StatRow
            stats={[
              { value: `${c.totalLessons}`, label: el.statBuilds },
              { value: "$0", label: el.statEquipment },
            ]}
          />
        }
      >
        <CheckGrid items={el.learningGoals} />
      </CourseSection>

      {/* Lesson list + progress. */}
      <CourseSection id="lessons" tone="tint" eyebrow={el.lessonsEyebrow} title={el.lessonsTitle} lead={el.lessonsLead}>
        <div className="mb-10 max-w-2xl">
          <EngineeringCourseProgress />
        </div>
        <EngineeringLessonList />
      </CourseSection>

      {/* The design process, on dark. */}
      <CourseSection id="process" tone="dark" eyebrow={el.processEyebrow} title={el.processTitle} lead={el.processLead}>
        <div className="grid items-center gap-12 lg:grid-cols-[320px_1fr]">
          <DesignProcessDiagram steps={el.designProcess} ariaLabel={el.diagramAria} />
          <StepFlow dark columns={2} steps={el.designProcess} />
        </div>
      </CourseSection>

      {/* Materials. */}
      <CourseSection id="materials" eyebrow={el.materialsEyebrow} title={el.materialsTitle} lead={el.materialsLead}>
        <MaterialsGrid groups={el.materialGroups} />
        <div className="mt-8">
          <Callout title={el.materialsNoteTitle}>{el.materialsNote}</Callout>
        </div>
      </CourseSection>

      {/* Parents and teachers. */}
      <CourseSection id="grown-ups" tone="paper" eyebrow={el.grownupsEyebrow} title={el.grownupsTitle} lead={el.grownupsLead}>
        <CheckGrid columns={2} items={el.parentNotes} />
        <div className="mt-8">
          <Callout title={el.whereFitsTitle}>{el.whereFits}</Callout>
        </div>
      </CourseSection>

      <CourseClosing title={el.closingTitle} description={el.closingDesc} backLabel={t.courseLanding.backToCurriculums}>
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
function DesignProcessDiagram({
  steps,
  ariaLabel,
}: {
  steps: { title: string }[]
  ariaLabel: string
}) {
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
      aria-label={ariaLabel}
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

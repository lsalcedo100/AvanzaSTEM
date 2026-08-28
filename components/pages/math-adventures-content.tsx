"use client"

import { useLanguage } from "@/components/providers/language-provider"
import {
  MathCourseProgress,
  MathLessonPath,
  MathResumeButton,
  MathTeacherControls,
} from "@/components/pages/math-adventures-progress-ui"
import { getMathAdventuresCurriculum } from "@/features/curriculums/math-adventures/i18n"
import {
  mathLessonPath,
} from "@/features/curriculums/math-adventures"
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
  StatRow,
  StepFlow,
  courseThemes,
} from "@/components/pages/courses/course-ui"

/**
 * Overview / hub page for the Math Adventures course (/courses/math-adventures).
 *
 * Reads entirely from `mathAdventuresCurriculum`, so every week, topic, and
 * detail comes from the data file and the hub stays in sync with the lessons.
 *
 * Design: the shared course kit (`components/pages/courses/course-ui`) in the
 * teal palette. This is the one course with no authentic workshop photography,
 * so instead of reaching for a stock image the cover is a built visual - the
 * ten topic tiles the course actually covers - which doubles as the syllabus at
 * a glance for a parent skimming the page.
 */
export function MathAdventuresContent() {
  const { language, t } = useLanguage()
  const ml = t.courseLanding.math
  const c = getMathAdventuresCurriculum(language)
  const firstLesson = c.lessons[0]

  return (
    <CourseShell theme={courseThemes.math}>
      <CourseHero
        eyebrow={ml.heroEyebrow}
        title={ml.title}
        lead={ml.lead}
        facts={ml.facts}
        media={<TopicTiles label={ml.topicTilesLabel} topics={ml.topics} />}
        mediaCaption={ml.mediaCaption}
        note={ml.note}
      >
        <CourseActions>
          <CourseButton href={mathLessonPath(firstLesson.slug)}>{ml.startBtn}</CourseButton>
          <CourseTextLink href="#final-project">{ml.finalBtn}</CourseTextLink>
        </CourseActions>
      </CourseHero>

      <CourseJumpNav
        label={t.courseLanding.onThisPage}
        items={[
          { href: "#weeks", label: ml.jumpNav[0] },
          { href: "#week-shape", label: ml.jumpNav[1] },
          { href: "#final-project", label: ml.jumpNav[2] },
          { href: "#grown-ups", label: ml.jumpNav[3] },
        ]}
      />

      {/* What the course covers. */}
      <CourseSection
        tone="tint"
        eyebrow={ml.coverEyebrow}
        title={ml.coverTitle}
        lead={ml.coverLead}
        aside={
          <StatRow
            stats={[
              { value: `${c.totalWeeks}`, label: ml.statAdventures },
              { value: "0", label: ml.statScreens },
            ]}
          />
        }
      >
        <CheckGrid items={ml.coverItems} />
      </CourseSection>

      {/* The ten weeks + progress. */}
      <CourseSection id="weeks" eyebrow={ml.weeksEyebrow} title={ml.weeksTitle} lead={ml.weeksLead}>
        <div className="mb-10 max-w-2xl">
          <MathCourseProgress />
        </div>
        <MathLessonPath />
      </CourseSection>

      {/* The shape of a week, on dark. */}
      <CourseSection id="week-shape" tone="dark" eyebrow={ml.weekShapeEyebrow} title={ml.weekShapeTitle} lead={ml.weekShapeLead}>
        <StepFlow dark steps={ml.weekStructure} />
      </CourseSection>

      {/* Final project. */}
      <CourseSection id="final-project" tone="tint" eyebrow={ml.finalEyebrow} title={ml.finalTitle} lead={ml.finalLead}>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="border-b-2 border-[var(--c-accent)] pb-2 text-base font-extrabold text-avanza-dark">
              {ml.finalSkillsHeading}
            </p>
            <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
              {ml.finalSkills.map((skill) => (
                <li
                  key={skill}
                  className="border-b border-avanza-dark/10 py-2.5 text-base font-medium text-avanza-dark/85"
                >
                  {skill}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-relaxed text-avanza-dark/75">{ml.finalPara}</p>
          </div>

          <Callout title={ml.finalCalloutTitle}>{ml.finalCalloutBody}</Callout>
        </div>
      </CourseSection>

      {/* Parents and teachers. */}
      <CourseSection id="grown-ups" tone="paper" eyebrow={ml.grownupsEyebrow} title={ml.grownupsTitle} lead={ml.grownupsLead}>
        <CheckGrid columns={2} items={ml.parentNotes} />
        <div className="mt-8">
          <Callout title={ml.groupCalloutTitle}>{ml.groupCalloutBody}</Callout>
        </div>
        <div className="mt-8">
          <MathTeacherControls />
        </div>
      </CourseSection>

      <CourseClosing title={ml.closingTitle} description={ml.closingDesc} backLabel={t.courseLanding.backToCurriculums}>
        <MathResumeButton />
      </CourseClosing>
    </CourseShell>
  )
}

/**
 * The course cover for a course with no authentic photography: the ten topics
 * as bright tiles, numbered by week. Honest about what the course is (a
 * syllabus you can read in three seconds) rather than a stock photo of a child
 * at a whiteboard.
 */
function TopicTiles({ label, topics }: { label: string; topics: string[] }) {
  return (
    <div className="rounded-lg bg-white px-7 py-8 shadow-[0_24px_60px_-28px_rgba(26,26,46,0.5)] sm:px-9 sm:py-10">
      <p className="text-sm font-bold text-[var(--c-accent-dark)]">{label}</p>
      <ol className="mt-5 grid gap-x-10 border-t border-avanza-dark/10 sm:grid-cols-2">
        {topics.map((topic, i) => (
          <li
            key={topic}
            className="flex items-baseline gap-4 border-b border-avanza-dark/10 py-3"
          >
            <span aria-hidden className="font-mono text-sm font-bold text-[var(--c-accent)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-base font-bold leading-snug text-avanza-dark">{topic}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

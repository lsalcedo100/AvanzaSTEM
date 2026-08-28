"use client"

import Image from "next/image"

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
 * so the cover is an illustration rather than a stock photo of someone else's
 * classroom. The syllabus-at-a-glance job the cover used to do now belongs to
 * the lesson path in the "weeks" section, which lists all ten adventures.
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
        media={<CoverIllustration alt={ml.title} />}
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
 * Hero cover for the course.
 *
 * Math Adventures is the one course with no authentic workshop photography, so
 * it uses an illustration rather than a stock photo of someone else's class.
 * The art is a 2:1 panel on a flat #dbeff6 field, so it is shown with
 * `object-contain` over that same colour: the panel reads as one continuous
 * surface instead of the heavy left/right crop `object-cover` would force in
 * the shared 4:3 photo frame.
 */
function CoverIllustration({ alt }: { alt: string }) {
  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-[#dbeff6] shadow-[0_24px_60px_-28px_rgba(26,26,46,0.5)]">
      <Image
        src="/images/curriculums/math-adventures.jpg"
        alt={alt}
        fill
        priority
        sizes="(min-width: 1024px) 44rem, 100vw"
        className="object-contain"
      />
    </div>
  )
}

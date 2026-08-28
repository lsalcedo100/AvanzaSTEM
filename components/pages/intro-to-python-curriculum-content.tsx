"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { getIntroToPythonCurriculum } from "@/features/curriculums/intro-to-python/i18n"
import { IntroToPythonProgress } from "@/components/pages/intro-to-python-progress"
import {
  introToPythonTeacherGuidePath,
  introToPythonWeekPath,
  introToPythonWorksheetsPath,
} from "@/features/curriculums/intro-to-python"
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
  PhotoBand,
  ResourceCard,
  StatRow,
  StepFlow,
  courseThemes,
} from "@/components/pages/courses/course-ui"

/**
 * Landing page for the Intro to Python Programming curriculum
 * (/curriculums/intro-to-python).
 *
 * Reads entirely from `introToPythonCurriculum` - weeks, outcomes, and the
 * lesson flow all come from the data file rather than being hardcoded here.
 *
 * Design: the shared course kit (`components/pages/courses/course-ui`) in the
 * green palette. Because the whole course runs in the browser, the cover shows
 * the actual first program a student writes next to a photo of a real Avanza
 * coding session - the two things a kid and a parent each want to see.
 */
export function IntroToPythonCurriculumContent() {
  const { language, t } = useLanguage()
  const pl = t.courseLanding.python
  const c = getIntroToPythonCurriculum(language)
  const photoSrcs = [
    "/images/workshops/past-coding.jpg",
    "/images/workshops/roseland-free-public-library-coding.jpeg",
    "/images/projects/my-first-python-program/cover.jpeg",
  ]

  return (
    <CourseShell theme={courseThemes.python}>
      <CourseHero
        eyebrow={pl.heroEyebrow}
        title={pl.title}
        lead={pl.lead}
        facts={pl.facts}
        media={<FirstProgram />}
        mediaCaption={pl.mediaCaption}
        note={pl.note}
      >
        <CourseActions>
          <CourseButton href={introToPythonWeekPath(1)}>{pl.startBtn}</CourseButton>
          <CourseTextLink href="/games">{pl.playgroundBtn}</CourseTextLink>
        </CourseActions>
      </CourseHero>

      <CourseJumpNav
        label={t.courseLanding.onThisPage}
        items={[
          { href: "#weeks", label: pl.jumpNav[0] },
          { href: "#lesson-shape", label: pl.jumpNav[1] },
          { href: "#final-project", label: pl.jumpNav[2] },
          { href: "#grown-ups", label: pl.jumpNav[3] },
          { href: "#resources", label: pl.jumpNav[4] },
        ]}
      />

      {/* Outcomes. */}
      <CourseSection
        tone="tint"
        eyebrow={pl.outcomesEyebrow}
        title={pl.outcomesTitle}
        lead={pl.outcomesLead}
        aside={
          <StatRow
            stats={[
              { value: `${c.totalWeeks}`, label: pl.statWeeklyProjects },
              { value: "0", label: pl.statSetupSteps },
            ]}
          />
        }
      >
        <CheckGrid items={pl.outcomes} />
      </CourseSection>

      {/* Real photos of the course being taught. */}
      <CourseSection eyebrow={pl.photosEyebrow} title={pl.photosTitle} lead={pl.photosLead}>
        <PhotoBand
          photos={pl.photos.map((photo, i) => ({
            src: photoSrcs[i],
            alt: photo.alt,
            caption: photo.caption,
          }))}
        />
      </CourseSection>

      {/* The lesson shape, on dark. */}
      <CourseSection
        id="lesson-shape"
        tone="dark"
        eyebrow={pl.lessonShapeEyebrow}
        title={pl.lessonShapeTitle}
        lead={pl.lessonShapeLead}
      >
        <StepFlow dark steps={pl.lessonFlow} />
      </CourseSection>

      {/* Weeks + progress. */}
      <CourseSection id="weeks" eyebrow={pl.weeksEyebrow} title={pl.weeksTitle} lead={pl.weeksLead}>
        <IntroToPythonProgress />
      </CourseSection>

      {/* Final project. */}
      <CourseSection
        id="final-project"
        tone="tint"
        eyebrow={pl.finalEyebrow}
        title={pl.finalTitle}
        lead={pl.finalLead}
      >
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="text-base leading-relaxed text-avanza-dark/80">{pl.finalP1}</p>
            <p className="mt-4 text-base leading-relaxed text-avanza-dark/80">{pl.finalP2}</p>
            <div className="mt-6">
              <CourseTextLink href={introToPythonWeekPath(c.totalWeeks)}>
                {pl.finalLink}
              </CourseTextLink>
            </div>
          </div>

          <Callout title={pl.finalCalloutTitle}>{pl.finalCalloutBody}</Callout>
        </div>
      </CourseSection>

      {/* Parents, teachers, librarians. */}
      <CourseSection
        id="grown-ups"
        tone="paper"
        eyebrow={pl.grownupsEyebrow}
        title={pl.grownupsTitle}
        lead={pl.grownupsLead}
      >
        <CheckGrid columns={2} items={pl.format} />
        <div className="mt-8">
          <Callout title={pl.studentNeedsTitle}>{pl.studentNeeds}</Callout>
        </div>
      </CourseSection>

      {/* Resources. */}
      <CourseSection
        id="resources"
        eyebrow={pl.resourcesEyebrow}
        title={pl.resourcesTitle}
        lead={pl.resourcesLead}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            href={introToPythonTeacherGuidePath}
            title={pl.resourceCards[0].title}
            description={pl.resourceCards[0].description}
          />
          <ResourceCard
            href={introToPythonWorksheetsPath}
            title={pl.resourceCards[1].title}
            description={pl.resourceCards[1].description}
          />
          <ResourceCard
            href="/games"
            title={pl.resourceCards[2].title}
            description={pl.resourceCards[2].description}
          />
        </div>
      </CourseSection>

      <CourseClosing title={pl.closingTitle} description={pl.closingDesc} backLabel={t.courseLanding.backToCurriculums}>
        <CourseButton href={introToPythonWeekPath(1)} className="bg-avanza-green text-avanza-dark">
          {pl.closingBtn}
        </CourseButton>
      </CourseClosing>
    </CourseShell>
  )
}

/**
 * The cover visual: a small mock editor showing the exact program a student
 * writes in Week 1 and what it prints. The course has no hardware to
 * photograph, so the honest cover is the thing students actually make.
 */
function FirstProgram() {
  const { t } = useLanguage()
  const ui = t.courseUi.python
  return (
    <div className="overflow-hidden rounded-lg bg-avanza-dark shadow-[0_24px_60px_-28px_rgba(26,26,46,0.6)]">
      <div className="border-b border-white/10 px-6 py-3.5">
        <span className="font-mono text-sm font-semibold text-white/50">week1.py</span>
      </div>
      <pre className="overflow-x-auto px-6 py-6 font-mono text-sm leading-relaxed text-white/90 sm:text-base">
        <code>{ui.coverCode}</code>
      </pre>
      <div className="border-t border-white/10 bg-black/25 px-6 py-5 font-mono text-sm leading-relaxed text-avanza-green">
        <p className="text-sm font-semibold text-white/40">{ui.coverOutput}</p>
        <p className="mt-2">{ui.coverGreeting}</p>
        <p>{ui.coverFun}</p>
        <p>{ui.coverFun}</p>
        <p>{ui.coverFun}</p>
      </div>
    </div>
  )
}

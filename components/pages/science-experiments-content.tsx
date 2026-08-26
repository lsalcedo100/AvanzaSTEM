"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { scienceLessonPath } from "@/features/curriculums/science-experiments"
import { getScienceExperimentsCurriculum } from "@/features/curriculums/science-experiments-i18n"
import {
  ScienceCompletion,
  ScienceCourseProgress,
  ScienceResumeButton,
  ScienceWeekList,
} from "@/components/pages/science-progress-ui"
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
  StepFlow,
  courseThemes,
} from "@/components/pages/courses/course-ui"

/**
 * Overview page for the Science Experiments course (/courses/science-experiments).
 *
 * Reads entirely from the localized science curriculum, so the six-week path,
 * materials, safety notes, goals, and outcomes all come from the data file.
 *
 * Design: built on the shared course kit (`components/pages/courses/course-ui`)
 * in the orange "lab notebook" palette. Kids and parents read this page, so it
 * leads with a real photo of an Avanza science session, shows the messy fun of
 * the actual experiments, and keeps the practical answers a parent needs -
 * materials, time, safety - one click away in the jump nav.
 */
export function ScienceExperimentsContent() {
  const { language, t } = useLanguage()
  const sl = t.courseLanding.science
  const c = getScienceExperimentsCurriculum(language)
  const firstLesson = c.lessons[0]
  const photoSrcs = [
    "/images/projects/baking-soda-volcano/cover.jpg",
    "/images/projects/making-oobleck/cover.jpg",
    "/images/projects/elephant-toothpaste-experiment/cover.jpg",
  ]

  return (
    <CourseShell theme={courseThemes.science}>
      <CourseHero
        eyebrow={sl.heroEyebrow}
        title={sl.title}
        lead={sl.lead}
        facts={sl.facts}
        media={{
          src: "/images/workshops/past-science.jpg",
          alt: "Students running a hands-on science experiment at an Avanza STEM workshop",
        }}
        mediaCaption={sl.mediaCaption}
        note={sl.note}
      >
        <CourseActions>
          <CourseButton href={scienceLessonPath(firstLesson.slug)}>{sl.startBtn}</CourseButton>
          <CourseTextLink href="#materials">{sl.needBtn}</CourseTextLink>
        </CourseActions>
      </CourseHero>

      <CourseJumpNav
        label={t.courseLanding.onThisPage}
        items={[
          { href: "#experiments", label: sl.jumpNav[0] },
          { href: "#weeks", label: sl.jumpNav[1] },
          { href: "#materials", label: sl.jumpNav[2] },
          { href: "#safety", label: sl.jumpNav[3] },
          { href: "#grown-ups", label: sl.jumpNav[4] },
        ]}
      />

      {/* What the course actually looks like, in real photos. */}
      <CourseSection id="experiments" tone="tint" eyebrow={sl.experimentsEyebrow} title={sl.experimentsTitle} lead={sl.experimentsLead}>
        <PhotoBand
          photos={sl.photos.map((photo, i) => ({
            src: photoSrcs[i],
            alt: photo.alt,
            caption: photo.caption,
          }))}
        />
      </CourseSection>

      {/* Course purpose + goals. */}
      <CourseSection eyebrow={sl.goalsEyebrow} title={sl.goalsTitle} lead={sl.goalsLead}>
        <CheckGrid items={sl.goals} />
      </CourseSection>

      {/* The investigation loop, on a dark band so it reads as the big idea. */}
      <CourseSection tone="dark" eyebrow={sl.methodEyebrow} title={sl.methodTitle} lead={sl.methodLead}>
        <StepFlow dark steps={sl.investigationLoop} />
      </CourseSection>

      {/* The six weeks + progress. */}
      <CourseSection id="weeks" eyebrow={sl.weeksEyebrow} title={sl.weeksTitle} lead={sl.weeksLead}>
        <div className="mb-10 max-w-2xl">
          <ScienceCourseProgress />
        </div>
        <ScienceWeekList />
      </CourseSection>

      {/* Outcomes. */}
      <CourseSection tone="tint" eyebrow={sl.outcomesEyebrow} title={sl.outcomesTitle} lead={sl.outcomesLead}>
        <CheckGrid items={sl.learningOutcomes} />
      </CourseSection>

      {/* Materials, grouped by week. */}
      <CourseSection id="materials" eyebrow={sl.materialsEyebrow} title={sl.materialsTitle} lead={sl.materialsLead}>
        <MaterialsGrid groups={sl.materialGroups} />
        <div className="mt-8">
          <Callout title={sl.materialsNoteTitle}>{sl.materialsNote}</Callout>
        </div>
      </CourseSection>

      {/* Safety. */}
      <CourseSection id="safety" tone="paper" eyebrow={sl.safetyEyebrow} title={sl.safetyTitle} lead={sl.safetyLead}>
        <CheckGrid items={sl.safetyNotes} columns={2} />
        <div className="mt-8">
          <Callout title={sl.safetyCalloutTitle}>{sl.safetyCalloutBody}</Callout>
        </div>
      </CourseSection>

      {/* Parents and teachers. */}
      <CourseSection id="grown-ups" eyebrow={sl.grownupsEyebrow} title={sl.grownupsTitle} lead={sl.grownupsLead}>
        <CheckGrid columns={2} items={sl.parentNotes} />
      </CourseSection>

      {/* End-of-course reflection (linked from Week 6). */}
      <CourseSection id="complete" tone="tint" eyebrow={sl.completeEyebrow} title={sl.completeTitle}>
        <div className="max-w-3xl">
          <ScienceCompletion />
        </div>
      </CourseSection>

      <CourseClosing title={sl.closingTitle} description={sl.closingDesc} backLabel={t.courseLanding.backToCurriculums}>
        <ScienceResumeButton />
      </CourseClosing>
    </CourseShell>
  )
}

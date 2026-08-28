"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { getRoboticsModules } from "@/features/curriculums/robotics/i18n"
import { roboticsPath } from "@/features/curriculums/robotics"
import {
  RoboticsFinalProjectPreview,
  RoboticsModuleList,
  RoboticsResumeArea,
  RoboticsResumeButton,
  RoboticsTeacherControls,
} from "@/components/pages/robotics-progress-ui"
import { RoboticsEquipmentPathPicker } from "@/components/pages/robotics-lesson-interactions"
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
  courseThemes,
} from "@/components/pages/courses/course-ui"

/** Course modules in the reader's language, in course order. */
function useModules() {
  const { language } = useLanguage()
  return getRoboticsModules(language)
}

const ROBOTICS_PHOTO_SRCS = [
  "/images/shared/lego-robotics.jpeg",
  "/images/workshops/roseland-free-public-library-coding.jpeg",
  "/images/workshops/past-coding.jpg",
]

/**
 * Course hub for Robotics & Automation (/courses/robotics).
 *
 * Reads entirely from `roboticsCurriculum`; module content, learning goals,
 * equipment paths, and the final project all come from the data file. The
 * interactive pieces (resume, path picker, module list, teacher controls,
 * final-project preview) are client components reading the real progress hook.
 *
 * Design: the shared course kit (`components/pages/courses/course-ui`). This is
 * the one course with a dark cover - a robot control panel rather than a pastel
 * band - which sets it apart from the other five hubs while keeping the Avanza
 * green its simulator, block editor, and knowledge checks already use.
 */
export function RoboticsCourseContent() {
  const modules = useModules()
  const { t } = useLanguage()
  const rl = t.courseLanding.robotics
  const firstModule = modules[0]

  return (
    <CourseShell theme={courseThemes.robotics}>
      <CourseHero
        dark
        eyebrow={rl.heroEyebrow}
        title={rl.title}
        lead={rl.lead}
        facts={rl.facts}
        media={{
          src: "/images/workshops/upcoming-robotics.jpg",
          alt: rl.mediaAlt,
        }}
        mediaCaption={rl.mediaCaption}
        note={rl.note}
      >
        <CourseActions>
          <CourseButton href={`${roboticsPath}/${firstModule.slug}`}>{rl.startBtn}</CourseButton>
          <CourseTextLink href="#paths" dark>
            {rl.chooseBtn}
          </CourseTextLink>
        </CourseActions>
      </CourseHero>

      <CourseJumpNav
        label={t.courseLanding.onThisPage}
        items={[
          { href: "#missions", label: rl.jumpNav[0] },
          { href: "#paths", label: rl.jumpNav[1] },
          { href: "#weeks", label: rl.jumpNav[2] },
          { href: "#final-project", label: rl.jumpNav[3] },
          { href: "#grown-ups", label: rl.jumpNav[4] },
        ]}
      />

      {/* Progress / resume, right below the cover. */}
      <section className="border-b border-border bg-[var(--c-tint)]">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="max-w-2xl">
            <RoboticsResumeArea />
          </div>
        </div>
      </section>

      {/* The weekly missions. */}
      <CourseSection
        id="missions"
        eyebrow={rl.missionsEyebrow}
        title={rl.missionsTitle}
        lead={rl.missionsLead}
        aside={
          <StatRow
            stats={[
              { value: `${modules.length}`, label: rl.statMissions },
              { value: "3", label: rl.statWays },
            ]}
          />
        }
      >
        <ol className="grid gap-x-12 border-t border-avanza-dark/10 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((module, i) => (
            <li
              key={module.slug}
              className="flex gap-4 border-b border-avanza-dark/10 py-5"
            >
              <span
                aria-hidden
                className="font-mono text-xl font-bold leading-none text-[var(--c-accent)]"
              >
                {module.isFinal ? "FIN" : String(module.week).padStart(2, "0")}
              </span>
              <p className="text-base font-bold leading-snug text-avanza-dark">
                {rl.missions[i]}
              </p>
            </li>
          ))}
        </ol>
      </CourseSection>

      {/* Photos. */}
      <CourseSection tone="tint" eyebrow={rl.photosEyebrow} title={rl.photosTitle} lead={rl.photosLead}>
        <PhotoBand
          photos={rl.photos.map((photo, i) => ({
            src: ROBOTICS_PHOTO_SRCS[i],
            alt: photo.alt,
            caption: photo.caption,
          }))}
        />
      </CourseSection>

      {/* Learning goals, on dark. */}
      <CourseSection tone="dark" eyebrow={rl.goalsEyebrow} title={rl.goalsTitle} lead={rl.goalsLead}>
        <CheckGrid dark items={rl.learningGoals} />
      </CourseSection>

      {/* Choose your path. */}
      <CourseSection id="paths" tone="tint" eyebrow={rl.pathsEyebrow} title={rl.pathsTitle} lead={rl.pathsLead}>
        <RoboticsEquipmentPathPicker />
        <div className="mt-8">
          <Callout title={rl.pathsCalloutTitle}>{rl.pathsCalloutBody}</Callout>
        </div>
      </CourseSection>

      {/* The eight weeks. */}
      <CourseSection id="weeks" eyebrow={rl.weeksEyebrow} title={rl.weeksTitle} lead={rl.weeksLead}>
        <RoboticsModuleList />
      </CourseSection>

      {/* How the course works + safety. */}
      <CourseSection tone="paper" eyebrow={rl.howEyebrow} title={rl.howTitle}>
        <CheckGrid columns={2} items={rl.format} />
        <div className="mt-8">
          <Callout title={rl.safetyCalloutTitle}>{rl.safetyCalloutBody}</Callout>
        </div>
      </CourseSection>

      {/* Final project. */}
      <CourseSection id="final-project" eyebrow={rl.finalEyebrow} title={rl.finalTitle} lead={rl.finalLead}>
        <RoboticsFinalProjectPreview />
      </CourseSection>

      {/* Resources. */}
      <CourseSection tone="tint" eyebrow={rl.resourcesEyebrow} title={rl.resourcesTitle}>
        <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          <ResourceCard
            href={`${roboticsPath}/review`}
            title={rl.resourceCards[0].title}
            description={rl.resourceCards[0].description}
          />
          <ResourceCard
            href={`${roboticsPath}/journal`}
            title={rl.resourceCards[1].title}
            description={rl.resourceCards[1].description}
          />
          <ResourceCard
            href={`${roboticsPath}/final-project`}
            title={rl.resourceCards[2].title}
            description={rl.resourceCards[2].description}
          />
          <ResourceCard
            href={firstModule ? `${roboticsPath}/${firstModule.slug}/worksheet` : roboticsPath}
            title={rl.resourceCards[3].title}
            description={rl.resourceCards[3].description}
          />
        </div>
      </CourseSection>

      {/* Parents and teachers. */}
      <CourseSection
        id="grown-ups"
        eyebrow={rl.grownupsEyebrow}
        title={rl.grownupsTitle}
        lead={rl.grownupsLead}
        aside={
          <div className="w-full sm:w-80">
            <ResourceCard
              href={`${roboticsPath}/${firstModule.slug}/teacher-guide`}
              title={rl.teacherGuideCard.title}
              description={rl.teacherGuideCard.description}
            />
          </div>
        }
      >
        <RoboticsTeacherControls />
      </CourseSection>

      <CourseClosing title={rl.closingTitle} description={rl.closingDesc} backLabel={t.courseLanding.backToCurriculums}>
        <RoboticsResumeButton />
      </CourseClosing>
    </CourseShell>
  )
}

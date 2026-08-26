import { roboticsCurriculum, roboticsPath } from "@/features/curriculums/robotics"
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

const MODULES = [...roboticsCurriculum.modules].sort((a, b) => a.order - b.order)

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
  const c = roboticsCurriculum
  const firstModule = MODULES[0]

  return (
    <CourseShell theme={courseThemes.robotics}>
      <CourseHero
        dark
        eyebrow="8-week robotics course"
        title={c.title}
        lead={c.subtitle}
        facts={[
          { label: "Ages", value: "Grades 4-6" },
          { label: "Length", value: `${c.totalModules} weeks` },
          { label: "Per week", value: c.estimatedTimePerModule },
          { label: "You need", value: "Nothing special" },
        ]}
        media={{
          src: "/images/workshops/upcoming-robotics.jpg",
          alt: "Students working with a robotics kit at an Avanza STEM workshop",
        }}
        mediaCaption="Build with a kit, program in the browser simulator, or go unplugged with cardboard - same course, same final project."
        note="No hardware required. You can switch how you work at any time without losing anything."
      >
        <CourseActions>
          <CourseButton href={`${roboticsPath}/${firstModule.slug}`}>Start Week 1</CourseButton>
          <CourseTextLink href="#paths" dark>
            Choose how you&apos;ll work
          </CourseTextLink>
        </CourseActions>
      </CourseHero>

      <CourseJumpNav
        items={[
          { href: "#missions", label: "What you'll build" },
          { href: "#paths", label: "Kit, sim, or unplugged" },
          { href: "#weeks", label: "The 8 weeks" },
          { href: "#final-project", label: "Final project" },
          { href: "#grown-ups", label: "For grown-ups" },
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
        eyebrow="The missions"
        title="One robot mission every week"
        lead={c.summary}
        aside={
          <StatRow
            stats={[
              { value: `${c.totalModules}`, label: "Weekly missions" },
              { value: "3", label: "Ways to build" },
            ]}
          />
        }
      >
        <ol className="grid gap-x-12 border-t border-avanza-dark/10 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((module) => (
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
                {module.mainMission}
              </p>
            </li>
          ))}
        </ol>
      </CourseSection>

      {/* Photos. */}
      <CourseSection
        tone="tint"
        eyebrow="In the room"
        title="Robots, but real ones"
        lead="Avanza runs robotics sessions in libraries and community rooms with whatever equipment is on hand - which is exactly how this course is built to work."
      >
        <PhotoBand
          photos={[
            {
              src: "/images/shared/lego-robotics.jpeg",
              alt: "A student-built robot made from a plastic brick robotics kit",
              caption: "Have a kit? Build the chassis, wire the sensors, and drive it around.",
            },
            {
              src: "/images/workshops/roseland-free-public-library-coding.jpeg",
              alt: "An Avanza STEM session running an unplugged Human Robots activity at a public library",
              caption:
                "No kit? The Human Robots activity teaches the same idea with nothing but instructions.",
            },
            {
              src: "/images/workshops/past-coding.jpg",
              alt: "Students programming on laptops at an Avanza STEM workshop",
              caption:
                "Or program the browser simulator - it runs the same missions with no hardware at all.",
            },
          ]}
        />
      </CourseSection>

      {/* Learning goals, on dark. */}
      <CourseSection
        tone="dark"
        eyebrow="By the end"
        title="What every student understands"
        lead="Not how to follow a build guide - how a machine senses the world, decides what to do, and acts on it."
      >
        <CheckGrid dark items={c.learningGoals} />
      </CourseSection>

      {/* Choose your path. */}
      <CourseSection
        id="paths"
        tone="tint"
        eyebrow="Your setup"
        title="Kit, simulator, or unplugged"
        lead="All three paths teach the same robotics ideas and reach the same final project. None is a lesser version - pick the one that fits what you have."
      >
        <RoboticsEquipmentPathPicker />
        <div className="mt-8">
          <Callout title="You can switch any time">
            Some activities use household materials like cardboard, bottle caps, and string. Each
            activity lists exactly what it needs before you start, so you can gather ahead of time.
            Choosing or switching a path never deletes your saved work.
          </Callout>
        </div>
      </CourseSection>

      {/* The eight weeks. */}
      <CourseSection
        id="weeks"
        eyebrow="The path"
        title="The eight weeks"
        lead="Each week teaches one robotics idea, then puts it to work. Weeks build on each other, so they unlock in order as you finish them - Week 1 is open now."
      >
        <RoboticsModuleList />
      </CourseSection>

      {/* How the course works + safety. */}
      <CourseSection
        tone="paper"
        eyebrow="How it runs"
        title="What a week actually involves"
      >
        <CheckGrid columns={2} items={c.format} />
        <div className="mt-8">
          <Callout title="Safety">
            Activities are low-risk. On the kit path, keep fingers, hair, and loose clothing away
            from moving wheels and gears, and give the robot a clear test area. On the unplugged
            path, use child-safe scissors with an adult for any cutting. Every week&apos;s parent
            &amp; teacher guide lists the specific safety notes for that activity.
          </Callout>
        </div>
      </CourseSection>

      {/* Final project. */}
      <CourseSection
        id="final-project"
        eyebrow="Capstone"
        title="The final project"
        lead="The course ends with a mission that brings every week together: plan it, build it, test it, and score your own work."
      >
        <RoboticsFinalProjectPreview />
      </CourseSection>

      {/* Resources. */}
      <CourseSection
        tone="tint"
        eyebrow="Resources"
        title="Everything you save, in one place"
      >
        <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          <ResourceCard
            href={`${roboticsPath}/review`}
            title="Course review"
            description="Weekly progress, knowledge-check scores, saved programs, completed simulations, and a vocabulary reference."
          />
          <ResourceCard
            href={`${roboticsPath}/journal`}
            title="Design journal"
            description="Every sketch, plan, and reflection you saved, ready to review or print."
          />
          <ResourceCard
            href={`${roboticsPath}/final-project`}
            title="Final project studio"
            description="Choose a mission, write a planning brief, record test runs, and score your work."
          />
          <ResourceCard
            href={firstModule ? `${roboticsPath}/${firstModule.slug}/worksheet` : roboticsPath}
            title="Printable worksheets"
            description="Each week has a print-friendly worksheet and a parent & teacher guide, linked from the lesson."
          />
        </div>
      </CourseSection>

      {/* Parents and teachers. */}
      <CourseSection
        id="grown-ups"
        eyebrow="For grown-ups"
        title="You do not need a robotics background"
        lead="Each week includes a printable worksheet and a guide with setup, safety notes, and questions to ask. By default weeks unlock one at a time; you can open them all for review."
        aside={
          <div className="w-full sm:w-80">
            <ResourceCard
              href={`${roboticsPath}/${firstModule.slug}/teacher-guide`}
              title="Parent & teacher guide"
              description="Setup, safety notes, and questions to ask - start with the Week 1 guide."
            />
          </div>
        }
      >
        <RoboticsTeacherControls />
      </CourseSection>

      <CourseClosing
        title="Ready to build your first robot?"
        description="Begin with Week 1 and work through all eight weeks at your own pace. Your progress, saved programs, and journal are stored on this device."
      >
        <RoboticsResumeButton />
      </CourseClosing>
    </CourseShell>
  )
}

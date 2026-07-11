import Link from "next/link"
import { roboticsCurriculum, roboticsPath } from "@/features/curriculums/robotics"
import {
  RoboticsFinalProjectPreview,
  RoboticsModuleList,
  RoboticsResumeArea,
  RoboticsResumeButton,
  RoboticsTeacherControls,
} from "@/components/pages/robotics-progress-ui"
import { RoboticsEquipmentPathPicker } from "@/components/pages/robotics-lesson-interactions"

const MODULES = [...roboticsCurriculum.modules].sort((a, b) => a.order - b.order)

/**
 * Course hub for Robotics & Automation (/courses/robotics).
 *
 * Reads entirely from `roboticsCurriculum`; all module content, learning goals,
 * equipment paths, and the final project come from the data file rather than
 * being hardcoded here. The interactive pieces (resume, path picker, module
 * list, teacher controls, final-project preview) are client components that read
 * the real progress hook. Deliberately a course syllabus, not a gamified page:
 * clear typography and spacing, restrained borders and a single progress bar, no
 * pills/badges/points/emoji/illustrations.
 */
export function RoboticsCourseContent() {
  const c = roboticsCurriculum

  const introFacts = [
    "Grades 4-6",
    `${c.totalModules}-week course`,
    `${c.estimatedTimePerModule} per week`,
    "No hardware required",
  ]

  return (
    <div className="bg-background">
      {/* 1. Course introduction */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            8-week robotics course · beginner-friendly
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-foreground md:text-5xl">{c.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/90 md:text-lg">
            {c.subtitle}
          </p>

          <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            {introFacts.map((fact, i) => (
              <li key={fact} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="text-border">|</span>}
                <span className="font-medium text-foreground">{fact}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {c.summary}
          </p>

          <p className="mt-4 max-w-2xl rounded-md border border-border bg-secondary px-4 py-3 text-sm font-medium text-foreground">
            Physical hardware is optional. You can do every week with a robot kit, in the browser
            simulator, or unplugged with household materials - and switch anytime without losing your
            work.
          </p>

          <div className="mt-10">
            <RoboticsResumeArea />
          </div>
        </div>
      </section>

      {/* 2. What you'll build, and what you'll understand */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-foreground md:text-2xl">
                What you&apos;ll build and program
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">One main mission each week:</p>
              <ul className="mt-6 space-y-3">
                {MODULES.map((module) => (
                  <li key={module.slug} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                    <span className="font-mono text-xs font-semibold text-muted-foreground">
                      {module.isFinal ? "F" : `0${module.week}`}
                    </span>
                    <span>{module.mainMission}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground md:text-2xl">
                What you&apos;ll understand by the end
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">Every student can:</p>
              <ul className="mt-6 space-y-3">
                {c.learningGoals.map((goal) => (
                  <li key={goal} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-green"
                    />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Choose your path */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">Choose how you&apos;ll work</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            All three paths teach the same robotics ideas and reach the same final project - none is a
            lesser version. Pick the one that fits what you have.
          </p>
          <div className="mt-8">
            <RoboticsEquipmentPathPicker />
          </div>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            Some activities use household materials (like cardboard, bottle caps, and string). Each
            activity lists exactly what it needs before you start, so you can gather materials ahead
            of time. Choosing or switching a path never deletes your saved work.
          </p>
        </div>
      </section>

      {/* 4. Safety and course expectations */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">How the course works</h2>
          <ul className="mt-6 space-y-3">
            {c.format.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-avanza-green" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-foreground">Safety</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Activities are low-risk. On the kit path, keep fingers, hair, and loose clothing away from
            moving wheels and gears, and give the robot a clear test area. On the unplugged path, use
            child-safe scissors with an adult for any cutting. Every week&apos;s parent &amp; teacher
            guide lists the specific safety notes for that activity.
          </p>
        </div>
      </section>

      {/* 5. The eight weeks */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">The eight weeks</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Each week teaches one robotics idea, then puts it to work. Weeks build on each other, so
            they unlock in order as you finish them - Week 1 is open now.
          </p>
          <RoboticsModuleList />
        </div>
      </section>

      {/* 6. Parent / teacher controls */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">For parents and teachers</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            You do not need a robotics background. Each week includes a printable worksheet and a
            guide with setup, safety notes, and questions to ask. By default weeks unlock one at a
            time; you can open them all for review.
          </p>
          <div className="mt-6">
            <RoboticsTeacherControls />
          </div>
        </div>
      </section>

      {/* 7. Review and resources */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">Review &amp; resources</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Everything you save as you go, in one place.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ResourceLink
              href={`${roboticsPath}/review`}
              title="Course review"
              description="Your weekly progress, knowledge-check scores, saved programs, completed simulations, and a vocabulary reference."
            />
            <ResourceLink
              href={`${roboticsPath}/journal`}
              title="Design journal"
              description="Your saved sketches, plans, and reflections from every week, ready to review or print."
            />
            <ResourceLink
              href={`${roboticsPath}/final-project`}
              title="Final project"
              description="Choose a mission, write a planning brief, record test runs, and score your work."
            />
            <ResourceLink
              href={MODULES[0] ? `${roboticsPath}/${MODULES[0].slug}/worksheet` : roboticsPath}
              title="Printable worksheets"
              description="Each week has a print-friendly worksheet and a parent & teacher guide, linked from the lesson."
            />
          </div>
        </div>
      </section>

      {/* 8. Final-project preview */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">The final project</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The course ends with a capstone that brings every week together.
          </p>
          <div className="mt-6">
            <RoboticsFinalProjectPreview />
          </div>
        </div>
      </section>

      {/* 9. Closing call to action */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">Ready to start?</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Begin with Week 1 and work through all eight weeks at your own pace. Your progress, saved
            programs, and journal are stored on this device.
          </p>
          <div className="mt-6">
            <RoboticsResumeButton />
          </div>
          <p className="mt-6 text-sm">
            <Link
              href="/curriculums"
              className="font-semibold text-avanza-green-dark underline underline-offset-2 hover:text-avanza-green"
            >
              Back to all curriculums
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}

/** A plain, bordered link card for the review & resources section. */
function ResourceLink({
  href,
  title,
  description,
}: {
  href: string
  title: string
  description: string
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-border p-5 transition-colors hover:border-avanza-green/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
    >
      <p className="text-sm font-bold text-foreground">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </Link>
  )
}

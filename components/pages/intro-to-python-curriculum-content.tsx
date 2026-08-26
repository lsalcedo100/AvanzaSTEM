import { IntroToPythonProgress } from "@/components/pages/intro-to-python-progress"
import {
  introToPythonCurriculum,
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
  const c = introToPythonCurriculum
  const finalWeek = c.weeks[c.weeks.length - 1]

  return (
    <CourseShell theme={courseThemes.python}>
      <CourseHero
        eyebrow={c.subtitle}
        title={c.title}
        lead={c.description}
        facts={[
          { label: "Ages", value: c.gradeRange },
          { label: "Length", value: `${c.totalWeeks} weeks` },
          { label: "Per session", value: c.estimatedTimePerWeek },
          { label: "You need", value: "A browser" },
        ]}
        media={<FirstProgram />}
        mediaCaption="Week 1, minute 5: your kid's first program runs and prints something back."
        note={`${c.requirement}. Nothing to install, no account, and no cost.`}
      >
        <CourseActions>
          <CourseButton href={introToPythonWeekPath(1)}>Start Week 1</CourseButton>
          <CourseTextLink href="/games">Try the playground first</CourseTextLink>
        </CourseActions>
      </CourseHero>

      <CourseJumpNav
        items={[
          { href: "#weeks", label: "The 8 weeks" },
          { href: "#lesson-shape", label: "How a lesson works" },
          { href: "#final-project", label: "Final project" },
          { href: "#grown-ups", label: "For grown-ups" },
          { href: "#resources", label: "Guides & worksheets" },
        ]}
      />

      {/* Outcomes. */}
      <CourseSection
        tone="tint"
        eyebrow="What students learn"
        title="Real code, from the very first week"
        lead={c.summary}
        aside={
          <StatRow
            stats={[
              { value: `${c.totalWeeks}`, label: "Weekly projects" },
              { value: "0", label: "Setup steps" },
            ]}
          />
        }
      >
        <CheckGrid items={c.outcomes} />
      </CourseSection>

      {/* Real photos of the course being taught. */}
      <CourseSection
        eyebrow="In the room"
        title="This is what a session looks like"
        lead="Avanza runs this curriculum in public libraries and community rooms. It works the same way at a kitchen table."
      >
        <PhotoBand
          photos={[
            {
              src: "/images/workshops/past-coding.jpg",
              alt: "Students coding on laptops at an Avanza STEM workshop in a library",
              caption:
                "Kids work at their own pace, on whatever laptop or Chromebook is in the room.",
            },
            {
              src: "/images/workshops/roseland-free-public-library-coding.jpeg",
              alt: "An Avanza STEM coding session running at Roseland Free Public Library",
              caption:
                "A volunteer or a parent can lead a session - the lesson page does the teaching.",
            },
            {
              src: "/images/projects/my-first-python-program/cover.jpeg",
              alt: "A first Python program on screen, printing a message",
              caption:
                "Every week ends with a program that runs and does something the student chose.",
            },
          ]}
        />
      </CourseSection>

      {/* The lesson shape, on dark. */}
      <CourseSection
        id="lesson-shape"
        tone="dark"
        eyebrow="The rhythm"
        title="Every week follows the same five steps"
        lead="So students always know what is coming, and a facilitator always knows what happens next."
      >
        <StepFlow
          dark
          steps={c.lessonFlow.map((step) => ({
            title: step.title,
            description: step.description,
          }))}
        />
      </CourseSection>

      {/* Weeks + progress. */}
      <CourseSection
        id="weeks"
        eyebrow="The path"
        title={`${c.totalWeeks} weeks, ${c.totalWeeks} programs`}
        lead="One concept per week. Each week ends with a project students build and run themselves - complete a lesson to unlock the next one."
      >
        <IntroToPythonProgress />
      </CourseSection>

      {/* Final project. */}
      <CourseSection
        id="final-project"
        tone="tint"
        eyebrow={`Week ${c.totalWeeks} - Capstone`}
        title={finalWeek.projectName}
        lead={finalWeek.description}
      >
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="text-base leading-relaxed text-avanza-dark/80">
              Instead of learning a new idea, students combine everything from the program -
              variables, input, conditionals, loops, functions, lists, and randomness - to design
              and build their own Python mini game.
            </p>
            <p className="mt-4 text-base leading-relaxed text-avanza-dark/80">
              They start from a short plan, add one feature at a time, and test as they go. The
              result is a small game that is entirely their own, and proof they can get from a blank
              file to a working program.
            </p>
            <div className="mt-6">
              <CourseTextLink href={introToPythonWeekPath(c.totalWeeks)}>
                View the final lesson
              </CourseTextLink>
            </div>
          </div>

          <Callout title="It really runs">
            Python runs right in the browser tab - the same code, the same errors, and the same
            satisfaction as running it on a real machine. Students can share the finished game by
            handing over the code they wrote.
          </Callout>
        </div>
      </CourseSection>

      {/* Parents, teachers, librarians. */}
      <CourseSection
        id="grown-ups"
        tone="paper"
        eyebrow="For grown-ups"
        title="You do not need to know how to code"
        lead="Every lesson runs in the browser with no setup, so this works as a library coding club, an after-school or weekend workshop, classroom enrichment, or self-paced learning at home."
      >
        <CheckGrid columns={2} items={c.format} />
        <div className="mt-8">
          <Callout title="What each student needs">
            {c.facilitator.studentNeeds.join(". ")}.
          </Callout>
        </div>
      </CourseSection>

      {/* Resources. */}
      <CourseSection
        id="resources"
        eyebrow="Resources"
        title="Everything a facilitator needs"
        lead="Each lesson is self-contained and includes teacher notes on pacing and common mistakes, so a facilitator does not need a programming background to lead it."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            href={introToPythonTeacherGuidePath}
            title="Teacher & librarian guide"
            description="How to run each session, what to explain, the mistakes students make, and offline backup activities."
          />
          <ResourceCard
            href={introToPythonWorksheetsPath}
            title="Printable worksheets"
            description="Paper versions of every week, for students working away from a screen."
          />
          <ResourceCard
            href="/games"
            title="Python playground"
            description="A free-form editor for experimenting between lessons, with no lesson attached."
          />
        </div>
      </CourseSection>

      <CourseClosing
        title="Ready to write the first line?"
        description={`Start with Week 1 and work through all ${c.totalWeeks} weeks at your own pace. Your progress is saved on this device - no sign-in, no cost.`}
      >
        <CourseButton href={introToPythonWeekPath(1)} className="bg-avanza-green text-avanza-dark">
          Start Week 1
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
  return (
    <div className="overflow-hidden rounded-3xl bg-avanza-dark shadow-[0_24px_60px_-24px_rgba(26,26,46,0.55)] ring-1 ring-black/10">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
        <span aria-hidden className="h-3 w-3 rounded-full bg-white/20" />
        <span aria-hidden className="h-3 w-3 rounded-full bg-white/20" />
        <span aria-hidden className="h-3 w-3 rounded-full bg-white/20" />
        <span className="ml-2 font-mono text-xs font-semibold text-white/50">week1.py</span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 font-mono text-sm leading-relaxed text-white/90 sm:text-base">
        <code>
          {`name = input("What's your name? ")
print("Hello, " + name + "!")

for i in range(3):
    print("Python is fun!")`}
        </code>
      </pre>
      <div className="border-t border-white/10 bg-black/25 px-5 py-4 font-mono text-sm leading-relaxed text-avanza-green">
        <p className="text-xs font-bold uppercase tracking-wider text-white/40">Output</p>
        <p className="mt-2">Hello, Maya!</p>
        <p>Python is fun!</p>
        <p>Python is fun!</p>
        <p>Python is fun!</p>
      </div>
    </div>
  )
}

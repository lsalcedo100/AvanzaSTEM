import {
  MathCourseProgress,
  MathLessonPath,
  MathResumeButton,
  MathTeacherControls,
} from "@/components/pages/math-adventures-progress-ui"
import {
  mathAdventuresCurriculum,
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
  const c = mathAdventuresCurriculum
  const firstLesson = c.lessons[0]
  const finalLesson = c.lessons.find((lesson) => lesson.isFinalProject) ?? c.lessons[c.lessons.length - 1]

  return (
    <CourseShell theme={courseThemes.math}>
      <CourseHero
        eyebrow="10-week guided math course"
        title={c.title}
        lead="Ten weeks that turn the math kids already meet at school into something they build, play, and argue about - ending with a whole paper city they design themselves."
        facts={[
          { label: "Ages", value: c.gradeRange },
          { label: "Length", value: `${c.totalWeeks} weeks` },
          { label: "Per week", value: c.estimatedTimePerLesson },
          { label: "You need", value: "Paper & dice" },
        ]}
        media={<TopicTiles topics={c.topics} />}
        mediaCaption="Ten big ideas, one per week, each one turned into an adventure."
        note="No computer required, and nothing to buy beyond a ruler and some paper."
      >
        <CourseActions>
          <CourseButton href={mathLessonPath(firstLesson.slug)}>Start Week 1</CourseButton>
          <CourseTextLink href="#final-project">See the final project</CourseTextLink>
        </CourseActions>
      </CourseHero>

      <CourseJumpNav
        items={[
          { href: "#weeks", label: "The 10 weeks" },
          { href: "#week-shape", label: "How a week works" },
          { href: "#final-project", label: "Final project" },
          { href: "#grown-ups", label: "For grown-ups" },
        ]}
      />

      {/* What the course covers. */}
      <CourseSection
        tone="tint"
        eyebrow="What you'll cover"
        title="From reading numbers to running a city"
        lead={c.description}
        aside={
          <StatRow
            stats={[
              { value: `${c.totalWeeks}`, label: "Weekly adventures" },
              { value: "0", label: "Screens required" },
            ]}
          />
        }
      >
        <CheckGrid
          items={c.lessons.map((lesson) => `Week ${lesson.weekNumber} - ${lesson.theme}`)}
        />
      </CourseSection>

      {/* The ten weeks + progress. */}
      <CourseSection
        id="weeks"
        eyebrow="The path"
        title="Ten weeks, in order"
        lead="Each week teaches one idea, then puts it to work in an on-screen activity and an off-screen challenge. Work at your own pace - your progress saves on this device."
      >
        <div className="mb-10 max-w-2xl">
          <MathCourseProgress />
        </div>
        <MathLessonPath />
      </CourseSection>

      {/* The shape of a week, on dark. */}
      <CourseSection
        id="week-shape"
        tone="dark"
        eyebrow="The rhythm"
        title="Every week follows the same six beats"
        lead={`So students always know what is coming. A full week takes about ${c.estimatedTimePerLesson} and splits comfortably across a few short sittings.`}
      >
        <StepFlow dark steps={WEEK_STRUCTURE} />
      </CourseSection>

      {/* Final project. */}
      <CourseSection
        id="final-project"
        tone="tint"
        eyebrow={`Week ${c.totalWeeks} - Final project`}
        title={c.finalProjectTitle}
        lead={c.finalProjectDescription}
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="border-b-2 border-[var(--c-accent)] pb-2 text-base font-extrabold text-avanza-dark">
              Math the city pulls together
            </p>
            <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
              {FINAL_PROJECT_SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="border-b border-avanza-dark/10 py-2.5 text-base font-medium text-avanza-dark/85"
                >
                  {skill}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-relaxed text-avanza-dark/75">
              Students present the finished city and explain the math behind three of its features -
              which is where you find out how much actually stuck.
            </p>
          </div>

          <Callout title="It is a real presentation">
            The city is built on paper, on a grid, with measured buildings, a bakery that sells in
            fractions, and a bank that makes change. Nothing is simulated and nothing is graded by a
            computer - a grown-up listens while the child explains their reasoning.
          </Callout>
        </div>
      </CourseSection>

      {/* Parents and teachers. */}
      <CourseSection
        id="grown-ups"
        tone="paper"
        eyebrow="For grown-ups"
        title="You do not need to be a math teacher"
        lead="You need about an hour a week and a willingness to ask questions instead of correcting steps. Here is what makes the weeks work."
      >
        <CheckGrid columns={2} items={PARENT_NOTES} />
        <div className="mt-8">
          <Callout title="Running this for a group?">
            Weeks unlock in order by default so students follow the path. If you are teaching a
            class or reviewing the course, you can open every week at once below.
          </Callout>
        </div>
        <div className="mt-8">
          <MathTeacherControls />
        </div>
      </CourseSection>

      <CourseClosing
        title="Ready for Week 1?"
        description={`Begin with ${firstLesson.title} and work through all ten weeks at your own pace, ending with ${finalLesson.title}. Your progress is saved on this device.`}
      >
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
function TopicTiles({ topics }: { topics: string[] }) {
  return (
    <div className="rounded-lg bg-white px-7 py-8 shadow-[0_24px_60px_-28px_rgba(26,26,46,0.5)] sm:px-9 sm:py-10">
      <p className="text-sm font-bold text-[var(--c-accent-dark)]">The ten weeks</p>
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

/** What every week contains - shown in the "How a week works" section. */
const WEEK_STRUCTURE = [
  {
    title: "A story hook",
    description:
      "A short story and a clear main lesson that introduces the week's idea in plain language.",
  },
  {
    title: "Worked examples",
    description:
      "Practice problems solved step by step, so students see the reasoning and not just the answer.",
  },
  {
    title: "An interactive activity",
    description:
      "A number line, a fraction model, a graph builder - something on screen that makes the idea concrete.",
  },
  {
    title: "A hands-on challenge",
    description:
      "An off-screen build or game using cheap, common materials, so the learning leaves the screen.",
  },
  {
    title: "A checkpoint",
    description:
      "Quick self-check questions and a reflection prompt that asks students to explain their thinking.",
  },
  {
    title: "An extension",
    description:
      "A tougher challenge problem and an optional stretch task for students who want to keep going.",
  },
]

/** Guidance points for the parent / teacher section. */
const PARENT_NOTES = [
  "Each week is designed for about 45-60 minutes and can be split across a few short sessions instead of one sitting.",
  'Ask questions rather than giving answers. "How did you figure that out?" teaches more than correcting a step.',
  "Every week uses common, low-cost materials - paper, coins, a ruler, dice - and never needs a computer to complete.",
  "Each week ends with a checkpoint and a reflection question, so students practice explaining their own reasoning.",
  "Progress is saved on this device as students complete each week - no account or sign-in is needed.",
  "Weeks build on each other, so the order matters more than the pace. Slow is fine; skipping is not.",
]

/** The course strands the Week 10 project combines. */
const FINAL_PROJECT_SKILLS = [
  "Geometry",
  "Measurement",
  "Money",
  "Data",
  "Fractions",
  "Operations",
  "Logic",
]

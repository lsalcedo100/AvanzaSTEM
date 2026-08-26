import {
  scienceExperimentsCurriculum,
  scienceLessonPath,
} from "@/features/curriculums/science-experiments"
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
 * Reads entirely from `scienceExperimentsCurriculum`, so the six-week path,
 * materials, safety notes, goals, and outcomes all come from the data file.
 *
 * Design: built on the shared course kit (`components/pages/courses/course-ui`)
 * in the orange "lab notebook" palette. Kids and parents read this page, so it
 * leads with a real photo of an Avanza science session, shows the messy fun of
 * the actual experiments, and keeps the practical answers a parent needs -
 * materials, time, safety - one click away in the jump nav.
 */
export function ScienceExperimentsContent() {
  const c = scienceExperimentsCurriculum
  const firstLesson = c.lessons[0]

  return (
    <CourseShell theme={courseThemes.science}>
      <CourseHero
        eyebrow="6-week science course"
        title={c.title}
        lead={c.subtitle}
        facts={[
          { label: "Ages", value: c.gradeRange },
          { label: "Length", value: `${c.totalLessons} weeks` },
          { label: "Per week", value: c.estimatedTimePerLesson },
          { label: "You need", value: "Kitchen supplies" },
        ]}
        media={{
          src: "/images/workshops/past-science.jpg",
          alt: "Students running a hands-on science experiment at an Avanza STEM workshop",
        }}
        mediaCaption="Every week is one real experiment you can run on a kitchen table."
        note="No lab, no computer, and no science background needed."
      >
        <CourseActions>
          <CourseButton href={scienceLessonPath(firstLesson.slug)}>Start Week 1</CourseButton>
          <CourseTextLink href="#materials">What you&apos;ll need</CourseTextLink>
        </CourseActions>
      </CourseHero>

      <CourseJumpNav
        items={[
          { href: "#experiments", label: "The experiments" },
          { href: "#weeks", label: "6-week path" },
          { href: "#materials", label: "Materials" },
          { href: "#safety", label: "Safety" },
          { href: "#grown-ups", label: "For grown-ups" },
        ]}
      />

      {/* What the course actually looks like, in real photos. */}
      <CourseSection
        id="experiments"
        tone="tint"
        eyebrow="See it first"
        title="The kind of science you'll be doing"
        lead="Real reactions, real messes, real results - not worksheets. These are experiments from Avanza sessions and projects that pair with the course."
      >
        <PhotoBand
          photos={[
            {
              src: "/images/projects/baking-soda-volcano/cover.jpg",
              alt: "A baking soda and vinegar volcano erupting with orange foam",
              caption:
                "Week 2 chemistry: mix two safe ingredients and watch a brand-new gas appear.",
            },
            {
              src: "/images/projects/making-oobleck/cover.jpg",
              alt: "Hands squeezing oobleck, a cornstarch and water mixture",
              caption:
                "Week 3 matter: a goo that acts solid when you hit it and liquid when you let go.",
            },
            {
              src: "/images/projects/elephant-toothpaste-experiment/cover.jpg",
              alt: "A tall column of foam erupting from a bottle in the elephant toothpaste experiment",
              caption:
                "Reactions can be fast, foamy, and completely explainable once you know why.",
            },
          ]}
        />
      </CourseSection>

      {/* Course purpose + goals. */}
      <CourseSection
        eyebrow="What this course is for"
        title="Kids stop guessing and start investigating"
        lead={c.summary}
      >
        <CheckGrid items={c.goals} />
      </CourseSection>

      {/* The investigation loop, on a dark band so it reads as the big idea. */}
      <CourseSection
        tone="dark"
        eyebrow="The method"
        title="Every week runs on the same loop"
        lead="This is the loop real scientists use. Nobody aims for a perfect first try - you predict, test, see what happens, and improve."
      >
        <StepFlow
          dark
          steps={c.investigationLoop.map((step) => ({
            title: step.stage,
            description: step.description,
          }))}
        />
      </CourseSection>

      {/* The six weeks + progress. */}
      <CourseSection
        id="weeks"
        eyebrow="The path"
        title={`${c.totalLessons} weeks, ${c.totalLessons} big questions`}
        lead="Each week opens with a question, answers it with one hands-on experiment, and ends with what you figured out. Work at your own pace - your progress saves on this device."
      >
        <div className="mb-10 max-w-2xl">
          <ScienceCourseProgress />
        </div>
        <ScienceWeekList />
      </CourseSection>

      {/* Outcomes. */}
      <CourseSection
        tone="tint"
        eyebrow="By the end"
        title="What your kid can do after six weeks"
        lead={c.completion.summary}
      >
        <CheckGrid items={c.learningOutcomes} />
      </CourseSection>

      {/* Materials, grouped by week. */}
      <CourseSection
        id="materials"
        eyebrow="Shopping list"
        title="Everything you need, week by week"
        lead="All of it is common and low-cost, and you only need a small handful for any single week - so gather as you go rather than buying it all up front."
      >
        <MaterialsGrid
          groups={c.lessons.map((lesson) => ({
            label: `Week ${lesson.week}`,
            caption: lesson.title,
            items: lesson.materials,
          }))}
        />
        <div className="mt-8">
          <Callout title="Good to know">
            {c.materialsNote}
          </Callout>
        </div>
      </CourseSection>

      {/* Safety. */}
      <CourseSection
        id="safety"
        tone="paper"
        eyebrow="Before you start"
        title="Safety, in plain language"
        lead="These experiments are safe, and a few habits keep them that way. Each week adds its own specific notes on the lesson page."
      >
        <CheckGrid items={c.safetyNotes} columns={2} />
        <div className="mt-8">
          <Callout title="An adult should be nearby">
            Do the experiments together, and keep water, vinegar, and scissors supervised. Nothing
            in this course uses a heat source, a flame, or a chemical you cannot buy at a grocery
            store.
          </Callout>
        </div>
      </CourseSection>

      {/* Parents and teachers. */}
      <CourseSection
        id="grown-ups"
        eyebrow="For grown-ups"
        title="You do not need a science background"
        lead="Your job is not to have the answers. It is to set out the materials and ask good questions - here is what makes each week go smoothly."
      >
        <CheckGrid
          columns={2}
          items={[
            "Skim the week ahead of time and set out the small list of materials before you start.",
            "Have your kid write a prediction before they test. Being wrong is useful information, not a mistake.",
            'Ask "what did you notice?" and "why do you think that happened?" instead of giving the answer.',
            "Plan about 45-60 minutes per week. The seed lab in week 6 also needs a quick daily check-in.",
            "Do the experiments together and keep water, vinegar, and scissors supervised.",
            "Progress saves in this browser. There is no account, no sign-in, and nothing to pay for.",
          ]}
        />
      </CourseSection>

      {/* End-of-course reflection (linked from Week 6). */}
      <CourseSection
        id="complete"
        tone="tint"
        eyebrow="Finish line"
        title="Finishing the course"
      >
        <div className="max-w-3xl">
          <ScienceCompletion />
        </div>
      </CourseSection>

      <CourseClosing
        title="Ready to run the first experiment?"
        description={`Start with ${firstLesson.title} and the ${firstLesson.activityTitle}, then work through all six weeks at whatever pace fits your week.`}
      >
        <ScienceResumeButton />
      </CourseClosing>
    </CourseShell>
  )
}

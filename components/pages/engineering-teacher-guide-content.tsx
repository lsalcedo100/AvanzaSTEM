import Link from "next/link"
import { PrintButton } from "@/components/ui/print-button"
import {
  engineeringFundamentalsCurriculum,
  engineeringLessonPath,
  engineeringWorksheetPath,
  type EngineeringLesson,
} from "@/features/curriculums/engineering-fundamentals"

/**
 * A printable parent/teacher guide for one Engineering Fundamentals lesson.
 *
 * Reads the lesson's structured `teacherGuide` (with a fallback to the shorter
 * `teacherNotes` if a lesson has not been fully written yet). Built to print
 * cleanly - on-screen controls are `.print-hidden` - and written to be specific:
 * exact setup steps, the real ways the build fails, and the actual questions an
 * adult should ask instead of fixing the design.
 */
export function EngineeringTeacherGuideContent({ lesson }: { lesson: EngineeringLesson }) {
  const total = engineeringFundamentalsCurriculum.totalLessons
  const label = lesson.isFinal ? "Final challenge" : `Lesson ${lesson.order} of ${total}`
  const guide = lesson.teacherGuide

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {/* On-screen controls (hidden when printing) */}
        <div className="print-hidden">
          <nav className="text-sm">
            <Link
              href={engineeringLessonPath(lesson.slug)}
              className="font-semibold text-avanza-purple underline underline-offset-2 hover:text-avanza-purple-dark"
            >
              &larr; Back to {lesson.isFinal ? "the final challenge" : `Lesson ${lesson.order}`}
            </Link>
          </nav>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Parent &amp; teacher guide
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">
            {lesson.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-foreground/90">
            How to run this lesson: what to set up, what to watch for, and what to say. No
            engineering background needed.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PrintButton label="Print this guide" tone="purple" />
            <Link
              href={engineeringWorksheetPath(lesson.slug)}
              className="text-sm font-semibold text-avanza-purple underline underline-offset-2 hover:text-avanza-purple-dark"
            >
              Student worksheet
            </Link>
          </div>
        </div>

        {/* The printable guide */}
        <article className="mt-10 print:mt-0">
          <header className="border-b-2 border-foreground pb-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Engineering Fundamentals &middot; {label} &middot; Facilitator guide
            </p>
            <h2 className="mt-2 text-2xl font-bold text-foreground">{lesson.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Project: {lesson.projectName}</p>
          </header>

          <Field title="Estimated time">
            <p className="text-sm leading-relaxed text-foreground/90">{lesson.estimatedTime}</p>
          </Field>

          {guide ? (
            <>
              <ListField title="Setup instructions" items={guide.setup} />
              <ListField title="Materials prep" items={guide.materialsPrep} />
              <ListField title="Safety notes" items={guide.safetyNotes} />
              <ListField title="What students should learn" items={guide.learningObjectives} />
              <ListField title="Common failure points" items={guide.commonFailures} />
              <ListField title="Questions to ask students" items={guide.questionsToAsk} />

              <Field title="Easier version">
                <p className="text-sm leading-relaxed text-foreground/90">{guide.easierVersion}</p>
              </Field>
              <Field title="Harder version">
                <p className="text-sm leading-relaxed text-foreground/90">{guide.harderVersion}</p>
              </Field>

              <ListField title="Cleanup tips" items={guide.cleanup} />
            </>
          ) : (
            <Field title="Facilitator notes">
              <p className="text-sm leading-relaxed text-foreground/90">{lesson.teacherNotes}</p>
            </Field>
          )}
        </article>
      </div>
    </div>
  )
}

function Field({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="print-avoid-break mt-6">
      <h3 className="border-b border-foreground pb-1 text-sm font-bold uppercase tracking-wide text-foreground">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function ListField({ title, items }: { title: string; items: string[] }) {
  return (
    <Field title={title}>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-foreground" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Field>
  )
}

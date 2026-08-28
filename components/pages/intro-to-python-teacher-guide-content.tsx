"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { getIntroToPythonCurriculum } from "@/features/curriculums/intro-to-python/i18n"
import Link from "next/link"
import { PrintButton } from "@/components/ui/print-button"
import {
  introToPythonPath,
  introToPythonWorksheetsPath,
} from "@/features/curriculums/intro-to-python"
import { formatTemplate } from "@/lib/format-template"

/**
 * Teacher / librarian resources for the Intro to Python curriculum: an adult
 * overview of how to run the program plus a lesson-by-lesson facilitation guide.
 * Reads entirely from `introToPythonCurriculum`. Designed to print cleanly - the
 * site chrome is hidden on print and each lesson starts on a fresh page.
 */
export function IntroToPythonTeacherGuideContent() {
  const { language, t } = useLanguage()
  const c = getIntroToPythonCurriculum(language)
  const ui = t.courseUi.python
  const f = c.facilitator

  return (
    <div className="bg-background">
      <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {/* Header */}
        <header className="border-b border-border pb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {ui.teacherResources}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
            {c.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {ui.facilitationGuide}
          </p>
          <p className="mt-6 text-base leading-relaxed text-foreground/90">{f.audience}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 print-hidden">
            <PrintButton label={ui.printGuide} />
            <Link
              href={introToPythonWorksheetsPath}
              className="text-sm font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
            >
              {ui.printableWorksheets}
            </Link>
            <Link
              href={introToPythonPath}
              className="text-sm font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
            >
              {ui.backToCurriculum}
            </Link>
          </div>
        </header>

        {/* Overview for adults */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">{ui.beforeYouStart}</h2>

          <dl className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {ui.whoItIsFor}
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {formatTemplate(ui.noExperienceNeeded, { grades: c.gradeRange })}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {ui.length}
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {formatTemplate(ui.lengthValue, {
                  total: c.totalWeeks,
                  time: c.estimatedTimePerWeek,
                })}
              </dd>
            </div>
          </dl>

          <GuideList title={ui.whatStudentsNeed} items={f.studentNeeds} />
          <GuideList title={ui.runningASession} items={f.runningTheLesson} />
          <GuideList
            title={ui.supportingNewCoders}
            items={f.supportingBeginners}
          />
        </section>

        {/* Per-week facilitation guide */}
        <section className="mt-14">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">
            {ui.lessonByLesson}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {ui.oneSectionPerWeek}
          </p>

          <div className="mt-8 space-y-12">
            {c.weeks.map((week, i) => (
              <section
                key={week.week}
                className={`print-avoid-break border-t border-border pt-8 ${
                  i > 0 ? "print-break-before" : ""
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {formatTemplate(t.courseUi.shared.weekNumber, { n: week.week })}
                </p>
                <h3 className="mt-2 text-xl font-bold text-foreground">{week.title}</h3>

                <div className="mt-4 grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <p className="text-sm font-semibold text-foreground">{ui.lessonGoal}</p>
                  <p className="text-sm leading-relaxed text-foreground/90">{week.facilitation.goal}</p>
                </div>

                <GuideList title={ui.materialsNeeded} items={week.facilitation.materials} />
                <GuideList title={ui.whatToExplain} items={week.facilitation.explain} />
                <GuideList title={ui.commonMistakes} items={week.facilitation.commonMistakes} />
                <GuideList title={ui.questionsToAsk} items={week.facilitation.questionsToAsk} />

                <div className="mt-6 grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <p className="text-sm font-semibold text-foreground">{ui.optionalExtension}</p>
                  <p className="text-sm leading-relaxed text-foreground/90">{week.extensionChallenge}</p>
                </div>
                <div className="mt-4 grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <p className="text-sm font-semibold text-foreground">{ui.ifComputersLimited}</p>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {week.facilitation.offlineActivity}
                  </p>
                </div>
              </section>
            ))}
          </div>
        </section>

        <p className="mt-12 border-t border-border pt-6 text-sm print-hidden">
          <Link
            href={introToPythonWorksheetsPath}
            className="font-semibold text-avanza-green underline underline-offset-2 hover:text-avanza-teal"
          >
            {ui.openWorksheets}
          </Link>
        </p>
      </article>
    </div>
  )
}

function GuideList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
            <span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-foreground/50" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

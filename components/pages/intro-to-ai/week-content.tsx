"use client"

import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import type { CourseWeek } from "@/features/curriculums/intro-to-ai-types"
import {
  introToAiLessonPath,
  introToAiPath,
  introToAiWeekPath,
  weekNumbers,
} from "@/features/curriculums/intro-to-ai"
import { useIntroToAiProgress } from "@/components/ui/useIntroToAiProgress"
import { Breadcrumbs } from "@/components/pages/intro-to-ai/shared"

export function IntroToAiWeekContent({ week }: { week: CourseWeek }) {
  const p = useIntroToAiProgress()
  const totalWeeks = weekNumbers().length
  const { completed, total } = p.weekCompletion(week.week)
  const nextWeek = week.week < totalWeeks ? week.week + 1 : null
  const prevWeek = week.week > 1 ? week.week - 1 : null

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        <Breadcrumbs
          trail={[
            { label: "Intro to AI", href: introToAiPath },
            { label: `Week ${week.week}` },
          ]}
        />

        <header className="mt-6 border-b border-border pb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Week {week.week} of {totalWeeks} · {week.estimatedTime}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">{week.title}</h1>
          <p className="mt-3 text-base leading-relaxed text-foreground/90">{week.subtitle}</p>

          <p className="mt-5 rounded-md border border-border bg-secondary/40 px-4 py-3 text-sm font-medium text-foreground">
            <span className="font-bold">Big question: </span>
            {week.bigQuestion}
          </p>

          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wide text-avanza-green-dark">By the end of this week</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground">
              {week.objectives.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>

          <p className="mt-5 text-sm text-muted-foreground" aria-live="polite">
            {p.loaded ? `${completed} of ${total} lessons complete` : "Loading your progress…"}
          </p>
        </header>

        <ol className="mt-8 space-y-3">
          {week.lessons.map((lesson) => {
            const done = p.isLessonComplete(lesson.id)
            return (
              <li key={lesson.id}>
                <Link
                  href={introToAiLessonPath(week.week, lesson.slug)}
                  className="group flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
                >
                  <span
                    className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border text-sm font-bold ${
                      done ? "border-avanza-green bg-avanza-green/15 text-avanza-green-dark" : "border-border text-muted-foreground"
                    }`}
                    aria-hidden
                  >
                    {done ? <Check className="h-4 w-4" /> : lesson.order}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold text-foreground">{lesson.title}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{lesson.summary}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 flex-none text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </li>
            )
          })}
        </ol>

        <nav aria-label="Week navigation" className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6 text-sm">
          {prevWeek ? (
            <Link href={introToAiWeekPath(prevWeek)} className="font-semibold text-avanza-green-dark hover:underline">
              ← Week {prevWeek}
            </Link>
          ) : (
            <Link href={introToAiPath} className="font-semibold text-avanza-green-dark hover:underline">
              ← Course overview
            </Link>
          )}
          {nextWeek ? (
            <Link href={introToAiWeekPath(nextWeek)} className="font-semibold text-avanza-green-dark hover:underline">
              Week {nextWeek} →
            </Link>
          ) : (
            <Link href={`${introToAiPath}/final-project`} className="font-semibold text-avanza-green-dark hover:underline">
              Final project →
            </Link>
          )}
        </nav>
      </div>
    </div>
  )
}

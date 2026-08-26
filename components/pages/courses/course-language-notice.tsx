"use client"

import Link from "next/link"
import { Info } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

/**
 * A graceful fallback banner for the course pages (`/courses/*`,
 * `/curriculums/intro-to-python`). The full course content is not translated
 * yet, so when a non-English language is active this explains that the lessons
 * below are in English for now and points to the parts of the site that are
 * fully localized. Renders nothing for English readers.
 *
 * Mirrors the "this article is in English" pattern the blog already uses, and
 * reads the active language from the shared client language provider so it
 * follows the navbar language switcher like the rest of the site.
 */
export function CourseLanguageNotice() {
  const { language, t } = useLanguage()

  if (language === "en") return null

  const notice = t.courseNotice

  return (
    <div className="border-b border-avanza-dark/10 bg-secondary print:hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-avanza-green-dark" />
          <div>
            <p className="text-sm font-bold text-foreground">{notice.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{notice.body}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-2 pl-8 sm:pl-0">
          <Link
            href="/projects"
            className="whitespace-nowrap text-sm font-bold text-avanza-green-dark underline underline-offset-4 transition-colors hover:text-avanza-teal"
          >
            {notice.projectsCta}
          </Link>
          <Link
            href="/curriculums"
            className="whitespace-nowrap text-sm font-bold text-avanza-green-dark underline underline-offset-4 transition-colors hover:text-avanza-teal"
          >
            {notice.curriculumsCta}
          </Link>
        </div>
      </div>
    </div>
  )
}

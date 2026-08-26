import type { ReactNode } from "react"
import { CourseLanguageNotice } from "@/components/pages/courses/course-language-notice"

/**
 * Shared layout for the Intro to Python curriculum and its sub-pages. Unlike
 * the other courses this one lives under `/curriculums/*`, so the notice is
 * scoped here rather than at `/curriculums` (whose overview page is already
 * translated). Shows a localized "lessons are in English for now" notice to
 * non-English readers; renders nothing for English.
 */
export default function IntroToPythonLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CourseLanguageNotice />
      {children}
    </>
  )
}

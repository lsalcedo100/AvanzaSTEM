import type { ReactNode } from "react"
import { CourseLanguageNotice } from "@/components/pages/courses/course-language-notice"

/**
 * Shared layout for every course under `/courses/*`. Shows a localized notice
 * to non-English readers that the course lessons are in English for now, then
 * renders the course page beneath it. The notice renders nothing for English.
 */
export default function CoursesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CourseLanguageNotice />
      {children}
    </>
  )
}

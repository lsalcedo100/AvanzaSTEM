import type { Metadata } from "next"
import { RoboticsCourseContent } from "@/components/pages/robotics-course-content"
import { generateRoboticsMetadata } from "@/features/curriculums/metadata"
import { roboticsPath } from "@/features/curriculums/robotics"
import {
  getCourseBreadcrumbJsonLd,
  getCourseJsonLd,
} from "@/features/curriculums/structured-data"

export function generateMetadata(): Metadata {
  return generateRoboticsMetadata()
}

const courseJsonLd = getCourseJsonLd(roboticsPath)
const breadcrumbJsonLd = getCourseBreadcrumbJsonLd(roboticsPath)

export default function RoboticsCoursePage() {
  return (
    <>
      {courseJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
        />
      ) : null}
      {breadcrumbJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      ) : null}
      <RoboticsCourseContent />
    </>
  )
}

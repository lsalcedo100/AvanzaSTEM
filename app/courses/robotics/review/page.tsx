import type { Metadata } from "next"
import { RoboticsReviewContent } from "@/components/pages/robotics-review-content"
import { generateRoboticsReviewMetadata } from "@/features/curriculums/metadata"
import { CourseBreadcrumbJsonLd } from "@/features/curriculums/components/course-breadcrumb-json-ld"
import { roboticsPath } from "@/features/curriculums/robotics"

export function generateMetadata(): Metadata {
  return generateRoboticsReviewMetadata()
}

export default function RoboticsReviewPage() {
  return (
    <>
      <CourseBreadcrumbJsonLd path={`${roboticsPath}/review`} leafName={"Course review"} />
      <RoboticsReviewContent />
    </>
  )
}

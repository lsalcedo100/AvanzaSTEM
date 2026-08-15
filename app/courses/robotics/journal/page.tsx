import type { Metadata } from "next"
import { RoboticsJournalContent } from "@/components/pages/robotics-journal-content"
import { generateRoboticsJournalMetadata } from "@/features/curriculums/metadata"
import { CourseBreadcrumbJsonLd } from "@/features/curriculums/components/course-breadcrumb-json-ld"
import { roboticsPath } from "@/features/curriculums/robotics"

export function generateMetadata(): Metadata {
  return generateRoboticsJournalMetadata()
}

export default function RoboticsJournalPage() {
  return (
    <>
      <CourseBreadcrumbJsonLd path={`${roboticsPath}/journal`} leafName={"Design journal"} />
      <RoboticsJournalContent />
    </>
  )
}

import type { Metadata } from "next"
import { RoboticsFinalProjectContent } from "@/components/pages/robotics-final-project-content"
import { generateRoboticsFinalProjectMetadata } from "@/features/curriculums/metadata"
import { CourseBreadcrumbJsonLd } from "@/features/curriculums/components/course-breadcrumb-json-ld"
import { roboticsPath } from "@/features/curriculums/robotics"

export function generateMetadata(): Metadata {
  return generateRoboticsFinalProjectMetadata()
}

export default function RoboticsFinalProjectPage() {
  return (
    <>
      <CourseBreadcrumbJsonLd path={`${roboticsPath}/final-project`} leafName={"Capstone project"} />
      <RoboticsFinalProjectContent />
    </>
  )
}

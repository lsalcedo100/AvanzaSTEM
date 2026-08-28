import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RoboticsWorksheetContent } from "@/components/pages/robotics-worksheet-content"
import { getRoboticsModule, roboticsModuleSlugs, roboticsWorksheetPath } from "@/features/curriculums/robotics"
import { generateRoboticsWorksheetMetadata } from "@/features/curriculums/metadata"
import { CourseBreadcrumbJsonLd } from "@/features/curriculums/components/course-breadcrumb-json-ld"

export const dynamicParams = false

export function generateStaticParams() {
  return roboticsModuleSlugs().map((lesson) => ({ lesson }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lesson: string }>
}): Promise<Metadata> {
  const { lesson } = await params
  return generateRoboticsWorksheetMetadata(lesson)
}

export default async function RoboticsWorksheetPage({
  params,
}: {
  params: Promise<{ lesson: string }>
}) {
  const { lesson } = await params
  const courseModule = getRoboticsModule(lesson)

  if (!courseModule) {
    notFound()
  }

  return (
    <>
      <CourseBreadcrumbJsonLd path={roboticsWorksheetPath(lesson)} leafName={`${courseModule.title} worksheet`} />
      <RoboticsWorksheetContent slug={lesson} />
    </>
  )
}

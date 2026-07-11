import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RoboticsWorksheetContent } from "@/components/pages/robotics-worksheet-content"
import { getRoboticsModule, roboticsModuleSlugs } from "@/features/curriculums/robotics"
import { generateRoboticsWorksheetMetadata } from "@/features/curriculums/metadata"

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

  return <RoboticsWorksheetContent module={courseModule} />
}

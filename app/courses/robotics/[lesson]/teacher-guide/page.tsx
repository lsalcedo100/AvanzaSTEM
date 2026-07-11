import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RoboticsTeacherGuideContent } from "@/components/pages/robotics-teacher-guide-content"
import { getRoboticsModule, roboticsModuleSlugs } from "@/features/curriculums/robotics"
import { generateRoboticsTeacherGuideMetadata } from "@/features/curriculums/metadata"

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
  return generateRoboticsTeacherGuideMetadata(lesson)
}

export default async function RoboticsTeacherGuidePage({
  params,
}: {
  params: Promise<{ lesson: string }>
}) {
  const { lesson } = await params
  const courseModule = getRoboticsModule(lesson)

  if (!courseModule) {
    notFound()
  }

  return <RoboticsTeacherGuideContent module={courseModule} />
}

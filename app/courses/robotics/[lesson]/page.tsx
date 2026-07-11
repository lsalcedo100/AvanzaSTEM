import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RoboticsLessonContent } from "@/components/pages/robotics-lesson-content"
import { getRoboticsModule, roboticsModuleSlugs } from "@/features/curriculums/robotics"
import { generateRoboticsLessonMetadata } from "@/features/curriculums/metadata"

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
  return generateRoboticsLessonMetadata(lesson)
}

export default async function RoboticsLessonPage({
  params,
}: {
  params: Promise<{ lesson: string }>
}) {
  const { lesson } = await params
  const courseModule = getRoboticsModule(lesson)

  if (!courseModule) {
    notFound()
  }

  return <RoboticsLessonContent module={courseModule} />
}

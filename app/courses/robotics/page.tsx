import type { Metadata } from "next"
import { RoboticsCourseContent } from "@/components/pages/robotics-course-content"
import { generateRoboticsMetadata } from "@/features/curriculums/metadata"

export function generateMetadata(): Metadata {
  return generateRoboticsMetadata()
}

export default function RoboticsCoursePage() {
  return <RoboticsCourseContent />
}

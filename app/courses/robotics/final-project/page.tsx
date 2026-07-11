import type { Metadata } from "next"
import { RoboticsFinalProjectContent } from "@/components/pages/robotics-final-project-content"
import { generateRoboticsFinalProjectMetadata } from "@/features/curriculums/metadata"

export function generateMetadata(): Metadata {
  return generateRoboticsFinalProjectMetadata()
}

export default function RoboticsFinalProjectPage() {
  return <RoboticsFinalProjectContent />
}

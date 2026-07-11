import type { Metadata } from "next"
import { RoboticsJournalContent } from "@/components/pages/robotics-journal-content"
import { generateRoboticsJournalMetadata } from "@/features/curriculums/metadata"

export function generateMetadata(): Metadata {
  return generateRoboticsJournalMetadata()
}

export default function RoboticsJournalPage() {
  return <RoboticsJournalContent />
}

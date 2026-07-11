import type { Metadata } from "next"
import { RoboticsReviewContent } from "@/components/pages/robotics-review-content"
import { generateRoboticsReviewMetadata } from "@/features/curriculums/metadata"

export function generateMetadata(): Metadata {
  return generateRoboticsReviewMetadata()
}

export default function RoboticsReviewPage() {
  return <RoboticsReviewContent />
}

import { notFound } from "next/navigation"
import { MyFirstPythonGuide } from "@/features/projects/components/my-first-python-guide"
import { getProjectGuide } from "@/features/projects/data"
import { generateProjectMetadata } from "@/features/projects/metadata"

export async function generateMetadata() {
  return generateProjectMetadata("my-first-python-program")
}

export default function MyFirstPythonProgramPage() {
  const project = getProjectGuide("my-first-python-program")

  if (!project) {
    notFound()
  }

  return <MyFirstPythonGuide project={project} />
}

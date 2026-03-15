import { notFound } from "next/navigation"
import { MyFirstPythonGuide } from "@/components/projects/my-first-python-guide"
import { getProjectGuide } from "@/lib/project-guides"

export default function MyFirstPythonProgramPage() {
  const project = getProjectGuide("my-first-python-program")

  if (!project) {
    notFound()
  }

  return <MyFirstPythonGuide project={project} />
}

import { notFound } from "next/navigation"
import { MyFirstPythonGuide } from "@/features/projects/components/my-first-python-guide"
import { getProjectGuide } from "@/features/projects/data"

export default function MyFirstPythonProgramPage() {
  const project = getProjectGuide("my-first-python-program")

  if (!project) {
    notFound()
  }

  return <MyFirstPythonGuide project={project} />
}

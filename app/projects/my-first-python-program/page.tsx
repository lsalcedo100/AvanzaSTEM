import { notFound } from "next/navigation"
import { MyFirstPythonGuide } from "@/features/projects/components/my-first-python-guide"
import { getProjectGuide } from "@/features/projects/data"
import { generateProjectMetadata } from "@/features/projects/metadata"
import { getProjectHowToJsonLd } from "@/features/projects/structured-data"

export async function generateMetadata() {
  return generateProjectMetadata("my-first-python-program")
}

export default function MyFirstPythonProgramPage() {
  const project = getProjectGuide("my-first-python-program")
  const howToJsonLd = getProjectHowToJsonLd("my-first-python-program")

  if (!project) {
    notFound()
  }

  return (
    <>
      {howToJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      ) : null}
      <MyFirstPythonGuide project={project} />
    </>
  )
}

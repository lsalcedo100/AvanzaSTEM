import type { Metadata } from "next"
import { projectGuides } from "@/features/projects/data"
import { generateProjectMetadata } from "@/features/projects/metadata"
import { ProjectGuidePage } from "@/features/projects/components/project-guide-page"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  return generateProjectMetadata(slug, "en")
}

export function generateStaticParams() {
  return projectGuides
    .filter(
      (project) =>
        ![
          "popsicle-stick-bridge",
          "simple-circuit-light",
          "my-first-python-program",
          "baking-soda-volcano",
          "lego-robot-builder",
          "balloon-powered-car",
          "lemon-powered-batteries",
          "rubber-band-powered-car",
        ].includes(project.slug),
    )
    .map((project) => ({
      slug: project.slug,
    }))
}

export default async function ProjectSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <ProjectGuidePage slug={slug} language="en" />
}

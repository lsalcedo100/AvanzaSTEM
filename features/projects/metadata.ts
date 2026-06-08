import type { Metadata } from "next"
import { getProjectGuide } from "@/features/projects/data"
import { getLanguage } from "@/lib/get-language"

const BASE_URL = "https://avanzastem.org"

export async function generateProjectMetadata(slug: string): Promise<Metadata> {
  const language = await getLanguage()
  const project = getProjectGuide(slug, language)

  if (!project) return {}

  const title = `${project.title} - Avanza STEM`
  const description = project.description
  const url = `${BASE_URL}/projects/${slug}`

  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: project.image, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image],
    },
  }
}

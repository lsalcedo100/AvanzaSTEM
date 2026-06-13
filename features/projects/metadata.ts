import type { Metadata } from "next"
import { getProjectGuide } from "@/features/projects/data"
import { getLanguage } from "@/lib/get-language"
import { siteConfig } from "@/lib/site-config"

export async function generateProjectMetadata(slug: string): Promise<Metadata> {
  const language = await getLanguage()
  const project = getProjectGuide(slug, language)

  if (!project) return {}

  const title = `${project.title} - Avanza STEM`
  const description = project.description
  const url = `${siteConfig.url}/projects/${slug}`

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

import type { Metadata } from "next"
import { cookies } from "next/headers"
import { getProjectGuide } from "@/features/projects/data"
import type { Language } from "@/i18n/translations"

const BASE_URL = "https://avanzastem.org"
const VALID_LANGUAGES: Language[] = ["en", "es", "zh"]

function isLanguage(value: string | undefined): value is Language {
  return VALID_LANGUAGES.includes(value as Language)
}

export async function generateProjectMetadata(slug: string): Promise<Metadata> {
  const cookieStore = await cookies()
  const cookieLanguage = cookieStore.get("avanza-lang")?.value
  const language: Language = isLanguage(cookieLanguage) ? cookieLanguage : "en"
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

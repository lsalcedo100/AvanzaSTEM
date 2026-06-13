import type { Metadata } from "next"
import { ProjectGuidePage } from "@/features/projects/components/project-guide-page"
import { projectGuides } from "@/features/projects/data"
import { generateProjectMetadata } from "@/features/projects/metadata"
import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

const LOCALIZED_LANGUAGES = VALID_LANGUAGES.filter(
  (language): language is Exclude<Language, "en"> => language !== "en",
)

export function generateStaticParams() {
  return LOCALIZED_LANGUAGES.flatMap((locale) =>
    projectGuides.map((project) => ({ locale, slug: project.slug })),
  )
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  return generateProjectMetadata(slug, locale as Language)
}

export default async function LocaleProjectGuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  return <ProjectGuidePage slug={slug} language={locale as Language} />
}

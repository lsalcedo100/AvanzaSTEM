import { notFound } from "next/navigation"
import { LanguageProvider } from "@/components/providers/language-provider"
import { VALID_LANGUAGES, type Language } from "@/i18n/translations"

const LOCALIZED_LANGUAGES = VALID_LANGUAGES.filter(
  (language): language is Exclude<Language, "en"> => language !== "en",
)

export function generateStaticParams() {
  return LOCALIZED_LANGUAGES.map((locale) => ({ locale }))
}

// Only "es" and "zh" are valid here - "en" lives at the unprefixed routes.
export const dynamicParams = false

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!LOCALIZED_LANGUAGES.includes(locale as Exclude<Language, "en">)) {
    notFound()
  }

  return (
    <LanguageProvider initialLanguage={locale as Language} syncFromUrl>
      {children}
    </LanguageProvider>
  )
}

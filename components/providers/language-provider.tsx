"use client"

import { usePathname } from "next/navigation"
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { type Language, type Translations, translations, VALID_LANGUAGES } from "@/i18n/translations"

const COOKIE_NAME = "avanza-lang"

/**
 * The language a locale-prefixed route asks for, e.g. "pt" for /pt/about.
 *
 * English lives at the unprefixed routes, so "/en/..." is not a real path and
 * returns null along with every non-locale first segment.
 */
function languageFromPathname(pathname: string | null): Language | null {
  if (!pathname) return null
  const segment = pathname.split("/")[1]
  if (!segment || segment === "en") return null
  return VALID_LANGUAGES.includes(segment as Language) ? (segment as Language) : null
}

function getStoredLanguage(): Language {
  if (typeof document === "undefined") return "en"
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`))
  const value = match ? decodeURIComponent(match[1]) : null
  if (value && VALID_LANGUAGES.includes(value as Language)) {
    return value as Language
  }
  return "en"
}

function storeLanguage(lang: Language) {
  document.cookie = `${COOKIE_NAME}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({
  children,
  initialLanguage = "en",
  syncFromUrl = false,
}: {
  children: ReactNode
  initialLanguage?: Language
  /**
   * When true, initialLanguage was derived from a locale-prefixed URL (e.g.
   * /es/projects) and is treated as the source of truth: the cookie is
   * synced to match instead of overriding initialLanguage on mount.
   */
  syncFromUrl?: boolean
}) {
  /*
   * The root layout renders the nav and footer around every page, including the
   * locale-prefixed ones, so it cannot pass a locale down - it never sees the
   * [locale] param. Reading the prefix off the pathname lets that outer
   * provider resolve the right language while the page is still being
   * rendered on the server, which is what makes the chrome translate in the
   * served HTML rather than only after hydration.
   */
  const urlLanguage = languageFromPathname(usePathname())
  const resolvedLanguage = urlLanguage ?? initialLanguage
  const urlIsSourceOfTruth = syncFromUrl || urlLanguage !== null

  const [language, setLanguageState] = useState<Language>(resolvedLanguage)

  useEffect(() => {
    if (urlIsSourceOfTruth) {
      setLanguageState(resolvedLanguage)
      document.documentElement.lang = resolvedLanguage
      storeLanguage(resolvedLanguage)
      return
    }
    const storedLanguage = getStoredLanguage()
    setLanguageState(storedLanguage)
    document.documentElement.lang = storedLanguage
  }, [resolvedLanguage, urlIsSourceOfTruth])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    document.documentElement.lang = lang
    storeLanguage(lang)
  }, [])

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

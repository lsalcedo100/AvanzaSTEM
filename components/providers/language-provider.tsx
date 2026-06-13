"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { type Language, type Translations, translations, VALID_LANGUAGES } from "@/i18n/translations"

const COOKIE_NAME = "avanza-lang"

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
  const [language, setLanguageState] = useState<Language>(initialLanguage)

  useEffect(() => {
    if (syncFromUrl) {
      setLanguageState(initialLanguage)
      document.documentElement.lang = initialLanguage
      storeLanguage(initialLanguage)
      return
    }
    const storedLanguage = getStoredLanguage()
    setLanguageState(storedLanguage)
    document.documentElement.lang = storedLanguage
  }, [initialLanguage, syncFromUrl])

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

"use client"

import { useLanguage } from "@/components/providers/language-provider"

/**
 * The skip link lives in the root layout, which is a server component and so
 * cannot read the language itself. Keeping the link in its own client
 * component lets it pick the locale up from the provider, so a keyboard user
 * on /pt hears the Portuguese label rather than an English one.
 */
export function SkipToContent() {
  const { t } = useLanguage()

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-lg focus:bg-avanza-green focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-avanza-dark focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
    >
      {t.nav.skipToContent}
    </a>
  )
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { Menu, X, Globe } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { type Language, languageLabels } from "@/i18n/translations"

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const desktopLangRef = useRef<HTMLDivElement>(null)
  const mobileLangRef = useRef<HTMLDivElement>(null)

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/curriculums", label: t.nav.curriculums },
    { href: "/projects", label: t.nav.projects },
    { href: "/blog", label: t.nav.blog },
    { href: "/workshops", label: t.nav.workshops },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      const isInsideDesktop = desktopLangRef.current?.contains(target)
      const isInsideMobile = mobileLangRef.current?.contains(target)
      if (!isInsideDesktop && !isInsideMobile) {
        setLangOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-[#dbf2a5]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4.5">
        <Link
          href="/"
          className="flex items-center gap-3 text-avanza-dark transition-opacity hover:opacity-90"
        >
          <Image
            src="/avanza-logo.svg"
            alt="Avanza STEM logo"
            width={56}
            height={56}
            className="h-11 w-11 shrink-0 sm:h-14 sm:w-14"
            priority
          />
          <span className="text-2xl font-extrabold tracking-tight sm:text-4xl">
            Avanza STEM
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${isActive
                    ? "border-2 border-avanza-dark bg-avanza-dark/8 text-avanza-dark"
                    : "text-avanza-dark/85 hover:bg-avanza-dark/8 hover:text-avanza-dark"
                  }`}
              >
                {link.label}
              </Link>
            )
          })}

          {/* Language Switcher */}
          <div className="relative ml-3" ref={desktopLangRef}>
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-avanza-dark/25 px-3 py-1.5 text-sm font-semibold text-avanza-dark transition-colors hover:border-avanza-dark/45 hover:bg-avanza-dark/8"
              aria-label="Switch language"
              aria-expanded={langOpen}
              aria-haspopup="menu"
              aria-controls="desktop-language-menu"
            >
              <Globe className="h-4 w-4" />
              <span>{languageLabels[language]}</span>
            </button>

            {langOpen && (
              <div
                id="desktop-language-menu"
                role="menu"
                aria-label="Choose language"
                className="absolute right-0 top-full z-[60] mt-2 w-36 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
              >
                {(Object.keys(languageLabels) as Language[]).map((lang) => (
                  <button
                    type="button"
                    key={lang}
                    onClick={() => {
                      setLanguage(lang)
                      setLangOpen(false)
                    }}
                    role="menuitemradio"
                    aria-checked={language === lang}
                    className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium transition-colors ${language === lang
                        ? "bg-avanza-green/10 text-avanza-green"
                        : "text-card-foreground hover:bg-secondary"
                      }`}
                  >
                    {languageLabels[lang]}
                    {language === lang && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-avanza-green" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Language */}
          <div className="relative" ref={mobileLangRef}>
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="inline-flex items-center gap-1 rounded-full border border-avanza-dark/25 px-2.5 py-1.5 text-xs font-semibold text-avanza-dark"
              aria-label="Switch language"
              aria-expanded={langOpen}
              aria-haspopup="menu"
              aria-controls="mobile-language-menu"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{language.toUpperCase()}</span>
            </button>
            {langOpen && (
              <div
                id="mobile-language-menu"
                role="menu"
                aria-label="Choose language"
                className="absolute right-0 top-full z-[60] mt-2 w-36 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
              >
                {(Object.keys(languageLabels) as Language[]).map((lang) => (
                  <button
                    type="button"
                    key={lang}
                    onClick={() => {
                      setLanguage(lang)
                      setLangOpen(false)
                    }}
                    role="menuitemradio"
                    aria-checked={language === lang}
                    className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium transition-colors ${language === lang
                        ? "bg-avanza-green/10 text-avanza-green"
                        : "text-card-foreground hover:bg-secondary"
                      }`}
                  >
                    {languageLabels[lang]}
                    {language === lang && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-avanza-green" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-avanza-dark"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={`overflow-hidden border-t border-avanza-dark/15 bg-[#dbf2a5] transition-all duration-300 ease-in-out md:hidden ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4 pt-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 ${isActive
                    ? "bg-avanza-dark/10 text-avanza-dark"
                    : "text-avanza-dark/85 hover:bg-avanza-dark/8 hover:text-avanza-dark"
                  }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

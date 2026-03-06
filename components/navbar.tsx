"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { Menu, X, Globe } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { type Language, languageLabels } from "@/lib/translations"

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
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#16a34a] via-[#65a30d] to-[#eab308]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4.5">
        <Link href="/" className="text-3xl font-extrabold tracking-tight text-primary-foreground">
          Avanza STEM
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
                    ? "border-2 border-primary-foreground text-primary-foreground"
                    : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
              >
                {link.label}
              </Link>
            )
          })}

          {/* Language Switcher */}
          <div className="relative ml-3" ref={desktopLangRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-primary-foreground/30 px-3 py-1.5 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/60 hover:bg-primary-foreground/10"
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4" />
              <span>{languageLabels[language]}</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                {(Object.keys(languageLabels) as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang)
                      setLangOpen(false)
                    }}
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
              onClick={() => setLangOpen(!langOpen)}
              className="inline-flex items-center gap-1 rounded-full border border-primary-foreground/30 px-2.5 py-1.5 text-xs font-semibold text-primary-foreground"
              aria-label="Switch language"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{language.toUpperCase()}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                {(Object.keys(languageLabels) as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang)
                      setLangOpen(false)
                    }}
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
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-primary-foreground"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-primary-foreground/20 bg-gradient-to-r from-[#16a34a] via-[#65a30d] to-[#eab308] px-6 pb-4 md:hidden">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-4 py-3 text-sm font-semibold transition-all ${isActive
                    ? "bg-primary-foreground/15 text-primary-foreground"
                    : "text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}

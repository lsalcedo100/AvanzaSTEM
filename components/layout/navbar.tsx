"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { Menu, X, Globe, ChevronDown } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { type Language, languageLabels } from "@/i18n/translations"

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [learnOpen, setLearnOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const desktopLangRef = useRef<HTMLDivElement>(null)
  const mobileLangRef = useRef<HTMLDivElement>(null)
  const learnRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Hysteresis to prevent oscillation when the navbar's height change
    // shifts scrollY back across a single threshold.
    const ENTER = 48 // become collapsed pill once we're well past the top
    const EXIT = 4 // only go back to expanded once we're nearly at the top
    let isScrolled = window.scrollY > ENTER
    setScrolled(isScrolled)
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        const y = window.scrollY
        if (!isScrolled && y > ENTER) {
          isScrolled = true
          setScrolled(true)
        } else if (isScrolled && y < EXIT) {
          isScrolled = false
          setScrolled(false)
        }
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  const topNavLinks = [
    { href: "/projects", label: t.nav.projects },
    { href: "/games", label: t.nav.games },
    { href: "/workshops", label: t.nav.workshops },
    { href: "/host", label: t.nav.host },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/about", label: t.nav.about },
  ]

  const learnLinks = [
    { href: "/curriculums", label: t.nav.curriculums },
    { href: "/blog", label: t.nav.blog },
  ]

  const isLearnActive = learnLinks.some((link) => pathname === link.href)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      const isInsideDesktop = desktopLangRef.current?.contains(target)
      const isInsideMobile = mobileLangRef.current?.contains(target)
      if (!isInsideDesktop && !isInsideMobile) {
        setLangOpen(false)
      }
      if (!learnRef.current?.contains(target)) {
        setLearnOpen(false)
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (mobileOpen) {
          setMobileOpen(false)
          hamburgerRef.current?.focus()
        }
        setLangOpen(false)
        setLearnOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [mobileOpen])

  const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1"

  return (
    <nav
      className={`sticky z-50 transition-[top,padding,background-color] duration-300 ease-out ${
        scrolled
          ? "top-3 bg-transparent px-3 sm:top-4 sm:px-6"
          : "top-0 bg-avanza-navbar px-0"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-300 ease-out ${
          scrolled
            ? "max-w-5xl rounded-full border border-avanza-dark/10 bg-avanza-navbar/85 px-4 py-2 shadow-[0_12px_30px_-12px_rgba(26,26,46,0.35)] backdrop-blur-md sm:px-6 sm:py-2.5"
            : "w-full max-w-7xl rounded-none border border-transparent bg-transparent px-6 py-4.5 shadow-none"
        }`}
      >
        <Link
          href="/"
          className={`flex items-center gap-3 text-avanza-dark transition-opacity hover:opacity-90 ${focusRing} rounded-lg`}
        >
          <Image
            src="/avanza-logo.svg"
            alt="Avanza STEM logo"
            width={56}
            height={56}
            className={`shrink-0 transition-all duration-300 ${
              scrolled ? "h-9 w-9 sm:h-10 sm:w-10" : "h-11 w-11 sm:h-14 sm:w-14"
            }`}
            priority
          />
          <span
            className={`font-extrabold tracking-tight transition-all duration-300 ${
              scrolled ? "text-lg sm:text-2xl" : "text-2xl sm:text-4xl"
            }`}
          >
            Avanza STEM
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {/* Learn dropdown */}
          <div className="relative" ref={learnRef}>
            <button
              type="button"
              onClick={() => setLearnOpen(!learnOpen)}
              className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-all ${focusRing} ${
                isLearnActive
                  ? "border-2 border-avanza-dark bg-avanza-dark/8 text-avanza-dark"
                  : "text-avanza-dark/85 hover:bg-avanza-dark/8 hover:text-avanza-dark"
              }`}
              aria-expanded={learnOpen}
              aria-haspopup="menu"
              aria-controls="desktop-learn-menu"
            >
              {t.nav.learn}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${learnOpen ? "rotate-180" : ""}`}
              />
            </button>

            {learnOpen && (
              <div
                id="desktop-learn-menu"
                role="menu"
                className="absolute left-0 top-full z-60 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
              >
                {learnLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    onClick={() => setLearnOpen(false)}
                    className={`block px-4 py-2.5 text-sm font-medium transition-colors ${focusRing} ${
                      pathname === link.href
                        ? "bg-avanza-green/10 text-avanza-green"
                        : "text-card-foreground hover:bg-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Remaining top-level links */}
          {topNavLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${focusRing} ${
                  isActive
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
              className={`inline-flex items-center gap-1.5 rounded-full border-2 border-avanza-dark/25 px-3 py-1.5 text-sm font-semibold text-avanza-dark transition-colors hover:border-avanza-dark/45 hover:bg-avanza-dark/8 ${focusRing}`}
              aria-label={t.nav.switchLanguage}
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
                aria-label={t.nav.chooseLanguage}
                className="absolute right-0 top-full z-60 mt-2 w-36 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
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
                    className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium transition-colors ${focusRing} ${
                      language === lang
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
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Language */}
          <div className="relative" ref={mobileLangRef}>
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className={`inline-flex items-center gap-1 rounded-full border border-avanza-dark/25 px-2.5 py-1.5 text-xs font-semibold text-avanza-dark ${focusRing}`}
              aria-label={t.nav.switchLanguage}
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
                aria-label={t.nav.chooseLanguage}
                className="absolute right-0 top-full z-60 mt-2 w-36 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
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
                    className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium transition-colors ${focusRing} ${
                      language === lang
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
            ref={hamburgerRef}
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`rounded text-avanza-dark ${focusRing}`}
            aria-label={t.nav.toggleNavigation}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        id="mobile-nav"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen || undefined}
        className={`mx-auto overflow-hidden bg-avanza-navbar transition-all duration-300 ease-in-out lg:hidden ${
          scrolled
            ? "mt-2 max-w-5xl rounded-2xl border border-avanza-dark/10 shadow-[0_12px_30px_-12px_rgba(26,26,46,0.35)]"
            : "w-full border-t border-avanza-dark/15"
        } ${mobileOpen ? "max-h-120 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 pb-4 pt-1">
          {/* Home */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={`block rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 ${focusRing} ${
              pathname === "/"
                ? "bg-avanza-dark/10 text-avanza-dark"
                : "text-avanza-dark/85 hover:bg-avanza-dark/8 hover:text-avanza-dark"
            }`}
          >
            {t.nav.home}
          </Link>

          {/* Learn section */}
          <p className="mt-2 px-4 pb-1 text-[10px] font-bold uppercase tracking-widest text-avanza-dark/40">
            {t.nav.learn}
          </p>
          {learnLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg py-2.5 pl-8 pr-4 text-sm font-semibold transition-all duration-200 ${focusRing} ${
                  isActive
                    ? "bg-avanza-dark/10 text-avanza-dark"
                    : "text-avanza-dark/85 hover:bg-avanza-dark/8 hover:text-avanza-dark"
                }`}
              >
                {link.label}
              </Link>
            )
          })}

          {/* Remaining top-level links */}
          {topNavLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 ${focusRing} ${
                  isActive
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

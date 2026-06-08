"use client"

import Link from "next/link"
import { useLanguage } from "@/components/providers/language-provider"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-avanza-dark text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-extrabold text-primary-foreground">Avanza STEM</h3>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-avanza-green">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: t.nav.home },
                { href: "/curriculums", label: t.nav.curriculums },
                { href: "/projects", label: t.nav.projects },
                { href: "/blog", label: t.nav.blog },
                { href: "/workshops", label: t.nav.workshops },
                { href: "/faq", label: t.faqPage.title },
                { href: "/host", label: t.hostPage.title },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-avanza-green"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-avanza-green">
              {t.footer.followUs}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://instagram.com/avanzastem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors hover:text-avanza-green"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-avanza-green">
              {t.footer.getInTouch}
            </h4>
            <p className="text-sm text-primary-foreground/70">
              {t.footer.haveQuestions}
            </p>
            <a
              href="mailto:liam@avanzastem.org"
              className="mt-2 inline-block text-sm font-semibold text-avanza-green transition-colors hover:text-avanza-teal"
            >
              liam@avanzastem.org
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-sm text-primary-foreground/50">
            © 2025–{new Date().getFullYear()} {t.footer.copyright}
          </p>
          <p className="mt-3">
            <Link
              href="/privacy"
              className="text-xs text-primary-foreground/40 transition-colors hover:text-avanza-green"
            >
              {t.footer.privacy}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

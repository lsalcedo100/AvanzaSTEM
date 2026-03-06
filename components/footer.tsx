"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

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

          {/* Programs */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-avanza-green">
              {t.footer.programs}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/curriculums" className="text-sm text-primary-foreground/70 transition-colors hover:text-avanza-green">
                  {t.footer.onlineCurriculums}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sm text-primary-foreground/70 transition-colors hover:text-avanza-green">
                  {t.footer.diyProjects}
                </Link>
              </li>
              <li>
                <Link href="/workshops" className="text-sm text-primary-foreground/70 transition-colors hover:text-avanza-green">
                  {t.footer.localWorkshops}
                </Link>
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
              href="mailto:hello@avanzastem.org"
              className="mt-2 inline-block text-sm font-semibold text-avanza-green transition-colors hover:text-avanza-teal"
            >
              hello@avanzastem.org
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-sm text-primary-foreground/50">
            {new Date().getFullYear()} {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

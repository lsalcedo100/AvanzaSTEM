import type { Metadata } from 'next'
import { Roboto_Mono, Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { ImageLightboxProvider } from '@/components/providers/image-lightbox-provider'
import { LanguageProvider } from '@/components/providers/language-provider'
import { SkipToContent } from '@/components/layout/skip-to-content'
import { generateHomeMetadata } from '@/features/home/metadata'
import { siteConfig } from '@/lib/site-config'
import { publisherLogoUrl } from '@/lib/structured-data'

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

/**
 * Sitewide metadata defaults.
 *
 * Deliberately omits `alternates`. Every route sets its own canonical (the
 * home page does so via app/page.tsx), so inheriting one here changed nothing
 * for real pages but did leak `canonical: https://www.avanzastem.org` onto the
 * generated 404, which Next also marks `noindex`. A page that says "do not
 * index me" and "the canonical version of me is the home page" sends Google
 * two contradictory instructions about the home page; Search Central
 * explicitly advises against combining the two.
 */
export function generateMetadata(): Metadata {
  const { alternates: _alternates, ...defaults } = generateHomeMetadata('en')

  return {
    ...defaults,
    metadataBase: new URL(siteConfig.url),
    icons: {
      icon: '/icon-light-32x32.png',
      shortcut: '/icon-light-32x32.png',
      apple: '/apple-icon.png',
    },
  }
}

// Sitewide entity graph. The Organization node carries a stable @id so other
// schemas on the site can reference the same entity, and its logo is an
// ImageObject (the bare URL string form is not eligible for Google's
// organization logo treatment). The WebSite node declares the four languages
// the site publishes in. No SearchAction is declared: the site has no search
// endpoint, and Google retired the sitelinks searchbox result in 2024.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'EducationalOrganization'],
  '@id': `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: {
    '@type': 'ImageObject',
    url: publisherLogoUrl,
    width: 180,
    height: 180,
  },
  image: `${siteConfig.url}/images/og-default-en.png`,
  alternateName: 'AvanzaSTEM',
  email: 'liam@avanzastem.org',
  description:
    'A youth-led program publishing free STEM resources for kids - project guides, course paths, printable worksheets and browser labs - and running free hands-on STEM workshops for students, with a special focus on Hispanic and underrepresented communities.',
  knowsLanguage: ['en', 'es', 'zh', 'pt'],
  // The in-person workshops run with New Jersey libraries and community
  // partners; the published resources are online and reachable anywhere, which
  // is why the audience is declared separately from areaServed.
  areaServed: {
    '@type': 'State',
    name: 'New Jersey',
  },
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student',
    audienceType: 'Kids, parents, teachers, and librarians',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'liam@avanzastem.org',
    contactType: 'educational program inquiries',
    availableLanguage: ['English', 'Spanish', 'Chinese', 'Portuguese'],
  },
}

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: ['en', 'es', 'zh', 'pt'],
  publisher: { '@id': `${siteConfig.url}/#organization` },
}

export const viewport = {
  themeColor: '#2ecc71',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${robotoMono.variable} ${nunito.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <LanguageProvider initialLanguage="en">
          <SkipToContent />
          <ImageLightboxProvider>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </ImageLightboxProvider>
        </LanguageProvider>
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  )
}

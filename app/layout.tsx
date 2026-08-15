import type { Metadata } from 'next'
import { Roboto_Mono, Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { ImageLightboxProvider } from '@/components/providers/image-lightbox-provider'
import { LanguageProvider } from '@/components/providers/language-provider'
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

export function generateMetadata(): Metadata {
  return {
    ...generateHomeMetadata('en'),
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
// organization logo treatment). The WebSite node declares the three languages
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
  email: 'liam@avanzastem.org',
  description:
    'A youth-led program bringing free hands-on STEM workshops and beginner-friendly projects to students, with a special focus on Hispanic and underrepresented communities.',
  knowsLanguage: ['en', 'es', 'zh'],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'liam@avanzastem.org',
    contactType: 'educational program inquiries',
    availableLanguage: ['English', 'Spanish', 'Chinese'],
  },
}

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: ['en', 'es', 'zh'],
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-lg focus:bg-avanza-green focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-avanza-dark focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
        >
          Skip to content
        </a>
        <LanguageProvider initialLanguage="en">
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

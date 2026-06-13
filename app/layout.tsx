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

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/avanza-logo.svg`,
  description:
    'A youth-led program bringing free hands-on STEM workshops and beginner-friendly projects to students, with a special focus on Hispanic and underrepresented communities.',
  sameAs: ['https://instagram.com/avanzastem'],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'liam@avanzastem.org',
    contactType: 'educational program inquiries',
  },
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

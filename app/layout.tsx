import type { Metadata } from 'next'
import { Roboto_Mono, Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { ImageLightboxProvider } from '@/components/providers/image-lightbox-provider'
import { LanguageProvider } from '@/components/providers/language-provider'
import { type Language } from '@/i18n/translations'
import { getLanguage } from '@/lib/get-language'
import { siteConfig } from '@/lib/site-config'

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

const metadataByLanguage: Record<Language, Pick<Metadata, 'title' | 'description'>> = {
  en: {
    title: 'Free Hands-On STEM Workshops and Projects | Avanza STEM',
    description:
      'Avanza STEM is a youth-led program bringing free hands-on STEM workshops and beginner-friendly projects to students, with a special focus on Hispanic and underrepresented communities.',
  },
  es: {
    title: 'Talleres y proyectos STEM gratuitos | Avanza STEM',
    description:
      'Avanza STEM es un programa juvenil que ofrece talleres STEM practicos gratuitos y proyectos para principiantes, con un enfoque especial en comunidades hispanas y subrepresentadas.',
  },
  zh: {
    title: '免费的动手 STEM 工作坊和项目 | Avanza STEM',
    description:
      'Avanza STEM 是一个由青年主导的项目，为学生带来免费的动手 STEM 工作坊和适合初学者的项目，特别关注西班牙裔和代表性不足的社区。',
  },
}

const ogImageByLanguage: Record<Language, string> = {
  en: '/images/og-default-en.png',
  es: '/images/og-default-es.png',
  zh: '/images/og-default-zh.png',
}

const ogLocaleByLanguage: Record<Language, string> = {
  en: 'en_US',
  es: 'es_US',
  zh: 'zh_CN',
}

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLanguage()
  const { title, description } = metadataByLanguage[language]
  const ogImage = ogImageByLanguage[language]

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: title as string,
      description: description as string,
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: ogLocaleByLanguage[language],
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Avanza STEM',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title as string,
      description: description as string,
      images: [ogImage],
    },
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const language = await getLanguage()

  return (
    <html lang={language} suppressHydrationWarning>
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
        <LanguageProvider initialLanguage={language}>
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

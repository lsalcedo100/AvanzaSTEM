import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Roboto_Mono, Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { ImageLightboxProvider } from '@/components/providers/image-lightbox-provider'
import { LanguageProvider } from '@/components/providers/language-provider'
import { type Language } from '@/i18n/translations'

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

const VALID_LANGUAGES: Language[] = ['en', 'es', 'zh']

const metadataByLanguage: Record<Language, Pick<Metadata, 'title' | 'description'>> = {
  en: {
    title: 'Free STEM Education for Hispanic Kids | Avanza STEM',
    description:
      'Free multilingual STEM resources for Hispanic kids in grades 2 and up. Explore online curriculums, DIY projects, and local workshops in your community.',
  },
  es: {
    title: 'Avanza STEM - Inspirando a jovenes hispanos en STEM',
    description:
      'Recursos STEM multilingues gratuitos, proyectos divertidos y talleres locales para jovenes estudiantes hispanos. Explora ciencia, tecnologia, ingenieria y matematicas con Avanza STEM.',
  },
  zh: {
    title: 'Avanza STEM - 启发年轻西班牙裔学生学习 STEM',
    description:
      '为年轻西班牙裔学生提供免费的多语言 STEM 资源、有趣项目和本地工作坊。和 Avanza STEM 一起探索科学、技术、工程和数学。',
  },
}

function isLanguage(value: string | undefined): value is Language {
  return VALID_LANGUAGES.includes(value as Language)
}

async function getCookieLanguage(): Promise<Language> {
  const cookieStore = await cookies()
  const cookieLanguage = cookieStore.get('avanza-lang')?.value

  return isLanguage(cookieLanguage) ? cookieLanguage : 'en'
}

const BASE_URL = 'https://avanzastem.org'

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
  const language = await getCookieLanguage()
  const { title, description } = metadataByLanguage[language]
  const ogImage = ogImageByLanguage[language]

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: title as string,
      description: description as string,
      url: BASE_URL,
      siteName: 'Avanza STEM',
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
  name: 'Avanza STEM',
  url: BASE_URL,
  logo: `${BASE_URL}/avanza-logo.svg`,
  description:
    'Free multilingual STEM resources for young Hispanic students including online curriculums, DIY projects, and local workshops.',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'liam@avanzastem.org',
    contactType: 'customer support',
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
  const language = await getCookieLanguage()

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

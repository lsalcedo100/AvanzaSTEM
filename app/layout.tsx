import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Roboto_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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

const VALID_LANGUAGES: Language[] = ['en', 'es', 'zh']

const metadataByLanguage: Record<Language, Pick<Metadata, 'title' | 'description'>> = {
  en: {
    title: 'Avanza STEM - Inspiring Young Hispanic Minds in STEM',
    description:
      'Free online STEM learning, fun projects, and local workshops designed for young Hispanic students. Explore science, technology, engineering, and math with Avanza STEM.',
  },
  es: {
    title: 'Avanza STEM - Inspirando a jovenes hispanos en STEM',
    description:
      'Aprendizaje STEM gratuito, proyectos divertidos y talleres locales para jovenes estudiantes hispanos. Explora ciencia, tecnologia, ingenieria y matematicas con Avanza STEM.',
  },
  zh: {
    title: 'Avanza STEM - 启发年轻西班牙裔学生学习 STEM',
    description:
      '为年轻西班牙裔学生提供免费的 STEM 在线学习、有趣项目和本地工作坊。和 Avanza STEM 一起探索科学、技术、工程和数学。',
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

export async function generateMetadata(): Promise<Metadata> {
  const language = await getCookieLanguage()

  return {
    ...metadataByLanguage[language],
    icons: {
      icon: '/icon-light-32x32.png',
      shortcut: '/icon-light-32x32.png',
      apple: '/apple-icon.png',
    },
  }
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
      <body className={`${robotoMono.variable} font-sans antialiased`}>
        <LanguageProvider initialLanguage={language}>
          <ImageLightboxProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ImageLightboxProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}

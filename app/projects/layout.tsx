import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { type Language } from '@/i18n/translations'

const VALID_LANGUAGES: Language[] = ['en', 'es', 'zh']

async function getCookieLanguage(): Promise<Language> {
  const cookieStore = await cookies()
  const value = cookieStore.get('avanza-lang')?.value
  return VALID_LANGUAGES.includes(value as Language) ? (value as Language) : 'en'
}

const metadataByLanguage: Record<Language, { title: string; description: string }> = {
  en: {
    title: 'STEM Projects for Kids - Avanza STEM',
    description:
      'Free hands-on STEM projects for kids — build bridges, wire circuit lights, code Python programs, launch volcanoes, and more. Step-by-step guides for young Hispanic students.',
  },
  es: {
    title: 'Proyectos STEM para Niños - Avanza STEM',
    description:
      'Proyectos STEM gratuitos para niños — construye puentes, circuitos eléctricos, programa en Python, lanza volcanes y más. Guías paso a paso para jóvenes estudiantes hispanos.',
  },
  zh: {
    title: 'STEM 儿童项目 - Avanza STEM',
    description:
      '为儿童提供免费的动手 STEM 项目——搭建桥梁、制作电路灯、用 Python 编程、发射火山等。为西班牙裔学生提供的分步指南。',
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const language = await getCookieLanguage()
  const { title, description } = metadataByLanguage[language]
  return {
    title,
    description,
    alternates: { canonical: '/projects' },
    openGraph: {
      title,
      description,
      url: 'https://avanzastem.org/projects',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}

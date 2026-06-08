import type { Metadata } from 'next'
import { type Language } from '@/i18n/translations'
import { getLanguage } from '@/lib/get-language'

const metadataByLanguage: Record<Language, { title: string; description: string }> = {
  en: {
    title: 'STEM Projects for Kids - Avanza STEM',
    description:
      'Fun DIY STEM projects for kids including building bridges, coding games, and science experiments. Free step-by-step guides for grades 2 and up.',
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
  const language = await getLanguage()
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
      images: [{ url: '/images/og-default-en.png', width: 1200, height: 630, alt: 'Avanza STEM Projects' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-default-en.png'],
    },
  }
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}

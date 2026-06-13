import type { Metadata } from 'next'
import { type Language } from '@/i18n/translations'
import { getLanguage } from '@/lib/get-language'
import { siteConfig } from '@/lib/site-config'

const metadataByLanguage: Record<Language, { title: string; description: string }> = {
  en: {
    title: 'Free STEM Projects for Kids: Bridges, Circuits, Python & Science Experiments | Avanza STEM',
    description:
      'Free beginner-friendly STEM projects for kids, parents, students, and educators, including engineering bridges, simple circuits, Python, science experiments, and more.',
  },
  es: {
    title: 'Proyectos STEM para Niños - Avanza STEM',
    description:
      'Proyectos STEM gratuitos para niños: construye puentes, circuitos eléctricos, programa en Python, lanza volcanes y más. Guías paso a paso para jóvenes estudiantes hispanos.',
  },
  zh: {
    title: 'STEM 儿童项目 - Avanza STEM',
    description:
      '为儿童提供免费的动手 STEM 项目：搭建桥梁、制作电路灯、用 Python 编程、发射火山等。为西班牙裔学生提供的分步指南。',
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
      url: `${siteConfig.url}/projects`,
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

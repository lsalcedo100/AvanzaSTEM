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
    title: 'STEM Blog for Hispanic Students - Avanza STEM',
    description:
      'STEM tips, fun activity ideas, and inspiration for young Hispanic students and their families. Science experiments, coding tutorials, and engineering projects on the Avanza STEM blog.',
  },
  es: {
    title: 'Blog STEM para Estudiantes Hispanos - Avanza STEM',
    description:
      'Consejos STEM, ideas de actividades divertidas e inspiración para jóvenes estudiantes hispanos. Experimentos de ciencias, tutoriales de programación y proyectos de ingeniería en el blog de Avanza STEM.',
  },
  zh: {
    title: 'STEM 博客 - Avanza STEM',
    description:
      '为西班牙裔学生和家庭提供 STEM 技巧、有趣活动创意和灵感。Avanza STEM 博客上的科学实验、编程教程和工程项目。',
  },
}

const blogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Avanza STEM Blog',
  description: 'STEM tips, activity ideas, and inspiration for young Hispanic students',
  url: 'https://avanzastem.org/blog',
  publisher: {
    '@type': 'Organization',
    name: 'Avanza STEM',
    url: 'https://avanzastem.org',
  },
  inLanguage: 'en',
}

export async function generateMetadata(): Promise<Metadata> {
  const language = await getCookieLanguage()
  const { title, description } = metadataByLanguage[language]
  return {
    title,
    description,
    alternates: { canonical: '/blog' },
    openGraph: {
      title,
      description,
      url: 'https://avanzastem.org/blog',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      {children}
    </>
  )
}

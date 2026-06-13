import type { Metadata } from 'next'
import { type Language } from '@/i18n/translations'
import { getLanguage } from '@/lib/get-language'
import { siteConfig } from '@/lib/site-config'

const metadataByLanguage: Record<Language, { title: string; description: string }> = {
  en: {
    title: 'STEM Blog for Hispanic Students - Avanza STEM',
    description:
      'STEM tips, tutorials, and how-to guides for young Hispanic students. Learn coding, science, engineering, and math in a fun and engaging way.',
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
  url: `${siteConfig.url}/blog`,
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  inLanguage: 'en',
}

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLanguage()
  const { title, description } = metadataByLanguage[language]
  return {
    title,
    description,
    alternates: { canonical: '/blog' },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/blog`,
      type: 'website',
      images: [{ url: '/images/og-default-en.png', width: 1200, height: 630, alt: 'Avanza STEM Blog' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-default-en.png'],
    },
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

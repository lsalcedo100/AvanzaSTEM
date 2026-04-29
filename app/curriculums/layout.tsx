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
    title: 'Free STEM Curricula for Kids Grades 2-8 - Avanza STEM',
    description:
      'Free online STEM curriculums for Hispanic students in grades 2 and up. Structured courses in coding, science, engineering, and math.',
  },
  es: {
    title: 'Currícula STEM Gratuita para Niños Grados 2-8 - Avanza STEM',
    description:
      'Currícula STEM gratuita para grados 2-8 — Python, ingeniería, robótica, IA, ciencias y matemáticas. Planes de lecciones completos para jóvenes estudiantes hispanos.',
  },
  zh: {
    title: '2-8 年级免费 STEM 课程 - Avanza STEM',
    description:
      '为 2-8 年级提供免费 STEM 课程——Python 编程、工程学、机器人、AI、科学和数学。专为西班牙裔学生设计的完整教案。',
  },
}

const curriculumsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Avanza STEM Curricula',
  description: 'Free STEM curricula for grades 2-8 designed for young Hispanic students',
  url: 'https://avanzastem.org/curriculums',
  itemListElement: [
    {
      '@type': 'Course',
      position: 1,
      name: 'Python Coding for Kids',
      description: 'Learn Python programming — variables, loops, functions, and build a mini game',
      provider: { '@type': 'Organization', name: 'Avanza STEM', url: 'https://avanzastem.org' },
      educationalLevel: 'Grades 3-6',
      timeRequired: 'PT8W',
      isAccessibleForFree: true,
      inLanguage: 'en',
    },
    {
      '@type': 'Course',
      position: 2,
      name: 'Engineering for Kids',
      description: 'Explore structures, forces, and design challenges through hands-on building',
      provider: { '@type': 'Organization', name: 'Avanza STEM', url: 'https://avanzastem.org' },
      educationalLevel: 'Grades 2-5',
      timeRequired: 'PT6W',
      isAccessibleForFree: true,
      inLanguage: 'en',
    },
    {
      '@type': 'Course',
      position: 3,
      name: 'Science Exploration',
      description: 'Chemical reactions, states of matter, simple machines, and life sciences',
      provider: { '@type': 'Organization', name: 'Avanza STEM', url: 'https://avanzastem.org' },
      educationalLevel: 'Grades 2-4',
      timeRequired: 'PT6W',
      isAccessibleForFree: true,
      inLanguage: 'en',
    },
    {
      '@type': 'Course',
      position: 4,
      name: 'Math Adventures',
      description: 'Number patterns, geometry, measurement, and problem solving',
      provider: { '@type': 'Organization', name: 'Avanza STEM', url: 'https://avanzastem.org' },
      educationalLevel: 'Grades 2-5',
      timeRequired: 'PT10W',
      isAccessibleForFree: true,
      inLanguage: 'en',
    },
    {
      '@type': 'Course',
      position: 5,
      name: 'Robotics for Kids',
      description: 'Robot components, sensors, motors, basic programming, and robot challenges',
      provider: { '@type': 'Organization', name: 'Avanza STEM', url: 'https://avanzastem.org' },
      educationalLevel: 'Grades 4-6',
      timeRequired: 'PT8W',
      isAccessibleForFree: true,
      inLanguage: 'en',
    },
    {
      '@type': 'Course',
      position: 6,
      name: 'Introduction to AI',
      description: 'What is AI, training models, image recognition, and AI ethics for kids',
      provider: { '@type': 'Organization', name: 'Avanza STEM', url: 'https://avanzastem.org' },
      educationalLevel: 'Grades 5-8',
      timeRequired: 'PT6W',
      isAccessibleForFree: true,
      inLanguage: 'en',
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const language = await getCookieLanguage()
  const { title, description } = metadataByLanguage[language]
  return {
    title,
    description,
    alternates: { canonical: '/curriculums' },
    openGraph: {
      title,
      description,
      url: 'https://avanzastem.org/curriculums',
      type: 'website',
      images: [{ url: '/images/og-default-en.png', width: 1200, height: 630, alt: 'Avanza STEM Curriculums' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-default-en.png'],
    },
  }
}

export default function CurriculumsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(curriculumsJsonLd) }}
      />
      {children}
    </>
  )
}

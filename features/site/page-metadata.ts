import type { Metadata } from "next"

import { OG_LOCALE_BY_LANGUAGE } from "@/features/blog/metadata"
import { translations, type Language } from "@/i18n/translations"
import { languageAlternates, localizedPath } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

/**
 * Titles and descriptions for the standalone site pages, in every language.
 *
 * These pages render fully translated content, so they are served from the
 * `app/[locale]` tree as well as the unprefixed English routes. Both trees read
 * their metadata from here, so a title can never say one thing at `/faq` and
 * another at `/es/faq`.
 *
 * Course and blog metadata live with their own features; this file only covers
 * the flat pages (about, faq, gallery, ...).
 */
type PageCopy = { title: string; description: string }

export type SitePageKey =
  | "about"
  | "faq"
  | "findAWorkshop"
  | "gallery"
  | "games"
  | "host"
  | "privacy"
  | "pythonIde"
  | "workshops"

const PAGE_COPY: Partial<Record<SitePageKey, Record<Language, PageCopy>>> = {
  about: {
    en: {
      title: "About Avanza STEM: Free Bilingual STEM Workshops",
      description:
        "Learn about Avanza STEM, a youth-led volunteer program bringing free bilingual STEM workshops and beginner-friendly projects to students.",
    },
    es: {
      title: "Nosotros | Avanza STEM",
      description:
        "Conoce Avanza STEM, un programa juvenil de voluntariado que ofrece talleres STEM practicos gratuitos y proyectos para principiantes.",
    },
    zh: {
      title: "关于我们 | Avanza STEM",
      description:
        "了解 Avanza STEM，一个由青年主导的志愿项目，为学生带来免费的动手 STEM 工作坊和适合初学者的项目。",
    },
    pt: {
      title: "Sobre nós | Avanza STEM",
      description:
        "Conheça a Avanza STEM, um programa de voluntariado juvenil que leva oficinas de STEM práticas e gratuitas e projetos para iniciantes aos estudantes.",
    },
  },
  workshops: {
    en: {
      title: "Free Hands-On STEM Workshops for Libraries & Schools",
      description:
        "A free three-part STEM workshop series for young learners, covering building, coding, and responsible AI. Hosted with libraries and community partners in New Jersey.",
    },
    es: {
      title: "Serie Mentes Creadoras | Avanza STEM",
      description:
        "Explora la Serie Mentes Creadoras de Avanza STEM, un programa gratuito de tres talleres STEM practicos para jovenes estudiantes sobre construccion, programacion e IA responsable con bibliotecas y socios comunitarios.",
    },
    zh: {
      title: "小小创客系列 | Avanza STEM",
      description:
        "了解 Avanza STEM 的小小创客系列，这是面向年轻学生的免费三部分动手 STEM 工作坊项目，通过图书馆和社区伙伴教授建造、编程和负责任 AI。",
    },
    pt: {
      title: "Série Mentes Criadoras | Avanza STEM",
      description:
        "Conheça a Série Mentes Criadoras da Avanza STEM, um programa gratuito de três oficinas práticas de STEM para jovens estudantes sobre construção, programação e IA responsável, com bibliotecas e parceiros comunitários.",
    },
  },
  faq: {
    en: {
      title: "Free STEM Workshop FAQ | Avanza STEM",
      description:
        "Answers to common questions about Avanza STEM workshops, curricula, costs, and how to get involved.",
    },
    es: {
      title: "Preguntas frecuentes sobre talleres STEM gratuitos | Avanza STEM",
      description:
        "Respuestas a las preguntas más comunes sobre los talleres, los cursos, los costos y cómo participar en Avanza STEM.",
    },
    zh: {
      title: "免费 STEM 工作坊常见问题 | Avanza STEM",
      description:
        "关于 Avanza STEM 工作坊、课程、费用以及如何参与的常见问题解答。",
    },
    pt: {
      title: "Perguntas frequentes sobre oficinas de STEM gratuitas | Avanza STEM",
      description:
        "Respostas às perguntas mais comuns sobre as oficinas, os cursos, os custos e como participar da Avanza STEM.",
    },
  },
  gallery: {
    en: {
      title: "STEM Workshop Photos | Avanza STEM",
      description:
        "Browse photos from Avanza STEM workshops and free hands-on programs for students.",
    },
    es: {
      title: "Fotos de talleres STEM | Avanza STEM",
      description:
        "Mira fotos de los talleres de Avanza STEM y de los programas prácticos gratuitos para estudiantes.",
    },
    zh: {
      title: "STEM 工作坊照片 | Avanza STEM",
      description: "浏览 Avanza STEM 工作坊和面向学生的免费动手项目的照片。",
    },
    pt: {
      title: "Fotos das oficinas de STEM | Avanza STEM",
      description:
        "Veja fotos das oficinas da Avanza STEM e dos programas práticos e gratuitos para estudantes.",
    },
  },
  host: {
    en: {
      title: "Host a Workshop | Avanza STEM",
      description:
        "Bring Avanza STEM to your school or library. Contact us to host a free STEM workshop for your community.",
    },
    es: {
      title: "Organiza un taller | Avanza STEM",
      description:
        "Lleva Avanza STEM a tu escuela o biblioteca. Contáctanos para organizar un taller STEM gratuito para tu comunidad.",
    },
    zh: {
      title: "举办一场工作坊 | Avanza STEM",
      description:
        "把 Avanza STEM 带到你的学校或图书馆。联系我们，为你的社区举办一场免费的 STEM 工作坊。",
    },
    pt: {
      title: "Receba uma oficina | Avanza STEM",
      description:
        "Leve a Avanza STEM para a sua escola ou biblioteca. Fale com a gente para receber uma oficina de STEM gratuita na sua comunidade.",
    },
  },
  privacy: {
    en: {
      title: "Privacy Policy | Avanza STEM",
      description: "Learn how Avanza STEM collects, uses, and protects your personal information.",
    },
    es: {
      title: "Política de privacidad | Avanza STEM",
      description:
        "Conoce cómo Avanza STEM recopila, usa y protege tu información personal.",
    },
    zh: {
      title: "隐私政策 | Avanza STEM",
      description: "了解 Avanza STEM 如何收集、使用和保护你的个人信息。",
    },
    pt: {
      title: "Política de privacidade | Avanza STEM",
      description:
        "Saiba como a Avanza STEM coleta, usa e protege as suas informações pessoais.",
    },
  },
  pythonIde: {
    en: {
      title: "Avanza STEM Python IDE | Free Online Python Editor",
      description:
        "Write and run real Python in your browser, free. Code editor, Run and Stop controls, and a live output terminal. No account, no install, nothing to download.",
    },
    es: {
      title: "IDE de Python de Avanza STEM | Editor de Python en línea gratis",
      description:
        "Escribe y ejecuta Python de verdad en tu navegador, gratis. Editor de código, controles de Ejecutar y Detener, y una terminal de salida en vivo. Sin cuenta, sin instalar, sin descargar nada.",
    },
    zh: {
      title: "Avanza STEM Python IDE | 免费在线 Python 编辑器",
      description:
        "在浏览器里免费编写并运行真正的 Python。代码编辑器、运行与停止按钮，还有实时输出终端。无需账号、无需安装、无需下载。",
    },
    pt: {
      title: "IDE de Python da Avanza STEM | Editor de Python online e gratuito",
      description:
        "Escreva e execute Python de verdade no seu navegador, de graça. Editor de código, controles de Executar e Parar e um terminal de saída ao vivo. Sem conta, sem instalar, sem baixar nada.",
    },
  },
}

/**
 * Pages whose title and description already live in `i18n/translations.ts`
 * alongside their on-page copy, so they are read from there rather than
 * duplicated above.
 */
const COPY_FROM_TRANSLATIONS: Partial<Record<SitePageKey, (language: Language) => PageCopy>> = {
  games: (language) => ({
    title: translations[language].gamesPage.metaTitle,
    description: translations[language].gamesPage.metaDesc,
  }),
  findAWorkshop: (language) => ({
    title: translations[language].home.finderMetaTitle,
    description: translations[language].home.finderMetaDesc,
  }),
}

const PAGE_PATH: Record<SitePageKey, string> = {
  about: "/about",
  findAWorkshop: "/find-a-workshop",
  games: "/games",
  workshops: "/workshops",
  faq: "/faq",
  gallery: "/gallery",
  host: "/host",
  privacy: "/privacy",
  pythonIde: "/python-ide",
}

/**
 * Metadata for one flat site page in one language.
 *
 * The canonical points at the locale's own URL and the `alternates.languages`
 * map advertises every translation, which is only correct because these pages
 * are genuinely translated end to end.
 */
export function generateSitePageMetadata(page: SitePageKey, language: Language): Metadata {
  const { title, description } = sitePageCopy(page, language)
  const path = PAGE_PATH[page]
  const image = "/images/og-default-en.png"

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath(path, language),
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${localizedPath(path, language)}`,
      siteName: siteConfig.name,
      locale: OG_LOCALE_BY_LANGUAGE[language],
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

function sitePageCopy(page: SitePageKey, language: Language): PageCopy {
  const fromTranslations = COPY_FROM_TRANSLATIONS[page]
  if (fromTranslations) return fromTranslations(language)
  const copy = PAGE_COPY[page]
  if (!copy) throw new Error(`No metadata copy registered for site page "${page}"`)
  return copy[language]
}

/** The page's meta description in one language, for reuse in JSON-LD. */
export function sitePageDescription(page: SitePageKey, language: Language): string {
  return sitePageCopy(page, language).description
}

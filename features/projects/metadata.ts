import type { Metadata } from "next"
import { OG_LOCALE_BY_LANGUAGE } from "@/features/blog/metadata"
import { getProjectGuide } from "@/features/projects/data"
import { type Language } from "@/i18n/translations"
import { languageAlternates, localizedPath } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

/**
 * English title/description overrides for the project guides that carry real
 * search demand. Titles are kept under ~60 characters so they are not
 * truncated in the SERP, and lead with the phrasing the Search Console query
 * export actually shows for each page (6 months to 2026-08-13). The site name
 * is dropped where including it would push the title past the truncation
 * point - Google renders the site name beside the title regardless.
 */
const metadataOverrides: Record<string, { title: string; description: string }> = {
  // 3,969 impressions / 1.26% CTR / avg position 7.6 - the site's largest page
  // by impressions. Its query cluster is dominated by "warren truss bridge
  // popsicle sticks" and "truss bridge designs popsicle sticks" variants
  // (~450 impressions on Warren-truss phrasings alone), none of which appeared
  // in the old 74-character title.
  "popsicle-stick-bridge": {
    title: "How to Build a Warren Truss Popsicle Stick Bridge",
    description:
      "Build a Warren truss bridge out of popsicle sticks step by step: truss patterns, triangle bracing, glue joints, and a load test to see how much weight it holds.",
  },
  // 233 impressions / avg position 8.45. Queries are "grabber spike prime",
  // "spike prime grabber" and "super clean up spike prime"; the guide builds a
  // grabber-style robot, so leading with that matches the page.
  "lego-robot-builder": {
    title: "LEGO SPIKE Prime Grabber Robot: Super Cleanup Build",
    description:
      "Build and program the LEGO SPIKE Prime Super Cleanup grabber robot step by step, with the parts list, build stages, pseudocode, and troubleshooting for beginners.",
  },
  // 371 impressions / 0.54% CTR / avg position 9.8. Nearly every query uses
  // the phrase "copy and paste" ("python quiz code copy and paste",
  // "python game code copy and paste", "quiz game python code").
  "my-first-python-program": {
    title: "Python Quiz Game Code: Copy and Paste Starter Project",
    description:
      "A beginner Python quiz game you can copy, paste, and run, then customize. Learn print, input, variables, and if statements by building your first real program.",
  },
  // 246 impressions / 0 clicks / avg position 22. Every query phrases this as a
  // "science fair project", which the old 75-character title buried.
  "coke-mentos-experiment": {
    title: "Coke and Mentos Science Fair Project: Steps & Data",
    description:
      "Turn the Coke and Mentos geyser into a science fair project: hypothesis, variables, step-by-step procedure, data table, comparison tests, and safety notes.",
  },
  // 173 impressions / 0 clicks / avg position 12.2. Queries split between
  // "rubber band powered car explanation" and "self propelled car rubber
  // band", plus energy-focused phrasings like "elastic potential energy car".
  "rubber-band-powered-car": {
    title: "Rubber Band Powered Car: Build It and How It Works",
    description:
      "Build a self-propelled rubber band car from simple materials, then learn how elastic potential energy becomes motion and how to make yours travel further.",
  },
}

export function generateProjectMetadata(slug: string, language: Language = "en"): Metadata {
  const project = getProjectGuide(slug, language)

  if (!project) return {}

  const override = language === "en" ? metadataOverrides[slug] : undefined
  const title = override?.title ?? `${project.title} - Avanza STEM`
  const description = override?.description ?? project.description
  const path = `/projects/${slug}`
  const url = `${siteConfig.url}${localizedPath(path, language)}`

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
      url,
      siteName: siteConfig.name,
      locale: OG_LOCALE_BY_LANGUAGE[language],
      type: "article",
      images: [{ url: project.image, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image],
    },
  }
}

const projectsIndexMetadataByLanguage: Record<Language, { title: string; description: string }> = {
  en: {
    // Was 94 characters and truncated in the SERP; 478 impressions at 0.84% CTR.
    title: "Free STEM Projects for Kids: Bridges, Circuits & Python",
    description:
      "Free step-by-step STEM projects for kids, parents, and teachers: truss bridges, simple circuits, Python programs, rubber band cars, and science fair experiments.",
  },
  es: {
    title: "Proyectos STEM para Niños - Avanza STEM",
    description:
      "Proyectos STEM gratuitos para niños: construye puentes, circuitos eléctricos, programa en Python, lanza volcanes y más. Guías paso a paso para jóvenes estudiantes hispanos.",
  },
  zh: {
    title: "STEM 儿童项目 - Avanza STEM",
    description:
      "为儿童提供免费的动手 STEM 项目：搭建桥梁、制作电路灯、用 Python 编程、发射火山等。为西班牙裔学生提供的分步指南。",
  },
  pt: {
    title: "Projetos de STEM Gratuitos para Crianças: Pontes, Circuitos e Python",
    description:
      "Projetos de STEM gratuitos e passo a passo para crianças, pais e professores: pontes treliçadas, circuitos simples, programas em Python, carrinhos a elástico e experimentos de feira de ciências.",
  },
}

export function generateProjectsIndexMetadata(language: Language = "en"): Metadata {
  const { title, description } = projectsIndexMetadataByLanguage[language]
  return {
    title,
    description,
    alternates: {
      canonical: localizedPath("/projects", language),
      languages: languageAlternates("/projects"),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${localizedPath("/projects", language)}`,
      siteName: siteConfig.name,
      locale: OG_LOCALE_BY_LANGUAGE[language],
      type: "website",
      images: [{ url: "/images/og-default-en.png", width: 1200, height: 630, alt: "Avanza STEM Projects" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default-en.png"],
    },
  }
}

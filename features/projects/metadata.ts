import type { Metadata } from "next"
import { getProjectGuide } from "@/features/projects/data"
import { type Language } from "@/i18n/translations"
import { languageAlternates, localizedPath } from "@/lib/i18n-routes"
import { siteConfig } from "@/lib/site-config"

const metadataOverrides: Record<string, { title: string; description: string }> = {
  "popsicle-stick-bridge": {
    title: "Popsicle Stick Bridge: Step-by-Step Truss Design + Load Test | Avanza STEM",
    description:
      "Learn how to make a Warren truss bridge out of popsicle sticks (or a chopstick bridge), build popsicle stick triangle trusses for strength, and load test the finished bridge in this step-by-step STEM project.",
  },
  "lego-robot-builder": {
    title: "LEGO SPIKE Prime Super Cleanup Robot: Beginner Robotics Guide | Avanza STEM",
    description:
      "Build your own LEGO SPIKE Prime Super Cleanup robot step by step. A beginner-friendly STEM robotics activity for kids, with parts lists, build steps, pseudocode, and troubleshooting tips.",
  },
  "my-first-python-program": {
    title: "First Python Quiz Game for Kids: Copy/Paste Starter Code | Avanza STEM",
    description:
      "A beginner Python project for kids: copy, paste, and customize a first quiz game while learning print, input, variables, and if statements.",
  },
  "coke-mentos-experiment": {
    title: "Coke and Mentos Science Project: Hypothesis, Variables & Data | Avanza STEM",
    description:
      "Turn the Coke and Mentos geyser into a science fair project with a hypothesis, variables, procedure, data table, safety notes, and comparison tests.",
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
    title: "Free STEM Projects for Kids: Bridges, Circuits, Python & Science Experiments | Avanza STEM",
    description:
      "Free beginner-friendly STEM projects for kids, parents, students, and educators, including engineering bridges, simple circuits, Python, science experiments, and more.",
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

import type { Metadata } from "next"
import { getProjectGuide } from "@/features/projects/data"
import { getLanguage } from "@/lib/get-language"
import { siteConfig } from "@/lib/site-config"

const metadataOverrides: Record<string, { title: string; description: string }> = {
  "popsicle-stick-bridge": {
    title: "How to Build a Popsicle Stick Truss Bridge | Avanza STEM",
    description:
      "Build a popsicle stick truss bridge with Warren truss triangles, then load test it in this step-by-step STEM project for kids and students.",
  },
  "lego-robot-builder": {
    title: "LEGO SPIKE Prime Super Cleanup Robot Guide | Avanza STEM",
    description:
      "Build a LEGO SPIKE Prime Super Cleanup-style robot with parts, setup steps, pseudocode, troubleshooting, and testing guidance for students.",
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

export async function generateProjectMetadata(slug: string): Promise<Metadata> {
  const language = await getLanguage()
  const project = getProjectGuide(slug, language)

  if (!project) return {}

  const override = language === "en" ? metadataOverrides[slug] : undefined
  const title = override?.title ?? `${project.title} - Avanza STEM`
  const description = override?.description ?? project.description
  const url = `${siteConfig.url}/projects/${slug}`

  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
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

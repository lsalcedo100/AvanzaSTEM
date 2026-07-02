import { notFound } from "next/navigation"
import { BakingSodaVolcanoGuide } from "@/features/projects/components/baking-soda-volcano-guide"
import { BalloonPoweredCarGuide } from "@/features/projects/components/balloon-powered-car-guide"
import { GenericProjectGuide } from "@/features/projects/components/generic-project-guide"
import { LegoRobotGuide } from "@/features/projects/components/lego-robot-guide"
import { LemonPoweredBatteriesGuide } from "@/features/projects/components/lemon-powered-batteries-guide"
import { MyFirstPythonGuide } from "@/features/projects/components/my-first-python-guide"
import { PopsicleStickBridgeGuide } from "@/features/projects/components/popsicle-stick-bridge-guide"
import { RubberBandPoweredCarGuide } from "@/features/projects/components/rubber-band-powered-car-guide"
import { SimpleCircuitLightGuide } from "@/features/projects/components/simple-circuit-light-guide"
import { getProjectGuide } from "@/features/projects/data"
import {
  getProjectBreadcrumbJsonLd,
  getProjectFaqJsonLd,
  getProjectHowToJsonLd,
} from "@/features/projects/structured-data"
import type { Language } from "@/i18n/translations"

// Slugs handled by a dedicated guide component with its own page layout. Any
// other slug falls back to GenericProjectGuide, which renders the project
// data (intro, steps, materials, etc.) generically.
const DEDICATED_FAQ_SLUGS = new Set(["popsicle-stick-bridge", "lego-robot-builder"])

/**
 * Shared project guide page used by both the generic English route
 * (app/projects/[slug]) and the locale-prefixed route
 * (app/[locale]/projects/[slug]) so /es and /zh project pages render with
 * correctly localized content and JSON-LD without duplicating page markup.
 */
export function ProjectGuidePage({ slug, language }: { slug: string; language: Language }) {
  const project = getProjectGuide(slug, language)

  if (!project) {
    notFound()
  }

  switch (slug) {
    case "baking-soda-volcano":
    case "balloon-powered-car":
    case "lego-robot-builder":
    case "lemon-powered-batteries":
    case "my-first-python-program":
    case "popsicle-stick-bridge":
    case "rubber-band-powered-car":
    case "simple-circuit-light": {
      const howToJsonLd = getProjectHowToJsonLd(slug, language)
      const faqJsonLd = DEDICATED_FAQ_SLUGS.has(slug) ? getProjectFaqJsonLd(slug, language) : null
      const breadcrumbJsonLd = getProjectBreadcrumbJsonLd(slug, language)

      return (
        <>
          {howToJsonLd ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
            />
          ) : null}
          {faqJsonLd ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
          ) : null}
          {breadcrumbJsonLd ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
          ) : null}
          {slug === "baking-soda-volcano" && <BakingSodaVolcanoGuide project={project} />}
          {slug === "balloon-powered-car" && <BalloonPoweredCarGuide project={project} />}
          {slug === "lego-robot-builder" && <LegoRobotGuide project={project} />}
          {slug === "lemon-powered-batteries" && <LemonPoweredBatteriesGuide project={project} />}
          {slug === "my-first-python-program" && <MyFirstPythonGuide project={project} />}
          {slug === "popsicle-stick-bridge" && <PopsicleStickBridgeGuide project={project} />}
          {slug === "rubber-band-powered-car" && <RubberBandPoweredCarGuide project={project} />}
          {slug === "simple-circuit-light" && <SimpleCircuitLightGuide project={project} />}
        </>
      )
    }
    default:
      return <GenericProjectGuide slug={slug} language={language} />
  }
}

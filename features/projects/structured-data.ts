import { getProjectGuide, type ProjectGuide } from "@/features/projects/data"
import { siteConfig } from "@/lib/site-config"

const howToEligibleSlugs = new Set([
  "popsicle-stick-bridge",
  "baking-soda-volcano",
  "lemon-powered-batteries",
  "balloon-powered-car",
  "rubber-band-powered-car",
  "simple-circuit-light",
  "my-first-python-program",
  "lego-robot-builder",
  "coke-mentos-experiment",
])

function getTotalTime(time: string) {
  const normalized = time.toLowerCase()
  if (normalized.includes("20 minutes")) return "PT20M"
  if (normalized.includes("30 minutes")) return "PT30M"
  if (normalized.includes("45-60 minutes")) return "PT1H"
  if (normalized.includes("1 hour")) return "PT1H"
  if (normalized.includes("1-2 hours")) return "PT2H"
  if (normalized.includes("2-3 hours")) return "PT3H"
  return undefined
}

function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  return encodeURI(`${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`)
}

function getTools(project: ProjectGuide) {
  return project.materials
    .filter((material) =>
      /\b(gun|scissors|cutters|ruler|marker|keyboard|computer|tablet|app|editor|voltmeter)\b/i.test(
        material,
      ),
    )
    .map((material) => ({
      "@type": "HowToTool",
      name: material,
    }))
}

export function getProjectHowToJsonLd(slug: string) {
  if (!howToEligibleSlugs.has(slug)) return null

  const project = getProjectGuide(slug)
  if (!project || project.steps.length === 0 || project.materials.length === 0) return null

  const tools = getTools(project)
  const totalTime = getTotalTime(project.time)

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: project.title,
    description: project.description,
    mainEntityOfPage: `${siteConfig.url}/projects/${slug}`,
    image: [absoluteUrl(project.image)],
    url: `${siteConfig.url}/projects/${slug}`,
    ...(totalTime ? { totalTime } : {}),
    supply: project.materials.map((material) => ({
      "@type": "HowToSupply",
      name: material,
    })),
    ...(tools.length > 0 ? { tool: tools } : {}),
    step: project.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step,
      name: step,
    })),
  }
}

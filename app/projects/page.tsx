import { getLanguage } from "@/lib/get-language"
import { getProjectGuides } from "@/features/projects/data"
import { translations } from "@/i18n/translations"
import { ProjectsPageContent } from "@/components/pages/projects-page-content"

export default async function ProjectsPage() {
  const language = await getLanguage()
  const projects = getProjectGuides(language)
  const t = translations[language]
  return <ProjectsPageContent projects={projects} t={t} />
}

import type { Metadata } from "next"
import { IntroToPythonWorksheetsContent } from "@/components/pages/intro-to-python-worksheets-content"
import { generateIntroToPythonWorksheetsMetadata } from "@/features/curriculums/metadata"
import { CourseBreadcrumbJsonLd } from "@/features/curriculums/components/course-breadcrumb-json-ld"
import { introToPythonWorksheetsPath } from "@/features/curriculums/intro-to-python"

export function generateMetadata(): Metadata {
  return generateIntroToPythonWorksheetsMetadata()
}

export default function IntroToPythonWorksheetsPage() {
  return (
    <>
      <CourseBreadcrumbJsonLd path={introToPythonWorksheetsPath} leafName={"Printable worksheets"} />
      <IntroToPythonWorksheetsContent />
    </>
  )
}

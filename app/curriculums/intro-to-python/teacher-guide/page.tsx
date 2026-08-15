import type { Metadata } from "next"
import { IntroToPythonTeacherGuideContent } from "@/components/pages/intro-to-python-teacher-guide-content"
import { generateIntroToPythonTeacherGuideMetadata } from "@/features/curriculums/metadata"
import { CourseBreadcrumbJsonLd } from "@/features/curriculums/components/course-breadcrumb-json-ld"
import { introToPythonTeacherGuidePath } from "@/features/curriculums/intro-to-python"

export function generateMetadata(): Metadata {
  return generateIntroToPythonTeacherGuideMetadata()
}

export default function IntroToPythonTeacherGuidePage() {
  return (
    <>
      <CourseBreadcrumbJsonLd path={introToPythonTeacherGuidePath} leafName={"Teacher and librarian guide"} />
      <IntroToPythonTeacherGuideContent />
    </>
  )
}

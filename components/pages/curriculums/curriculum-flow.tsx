import Link from "next/link"
import {
  scienceExperimentsCurriculum,
  scienceLessonPath,
} from "@/features/curriculums/science-experiments"
import type { Translations } from "@/i18n/translations"

/**
 * Section 1 — "What you'll do in each curriculum".
 *
 * Two parts:
 *  1. The four-stage learning arc (Learn / Try / Build / Improve) as plain
 *     editorial rows separated by subtle dividers — no numbered circles, icons,
 *     rounded cards, pills, badges, or connecting arrows.
 *  2. A preview of one *real* lesson, rendered straight from the Science course
 *     data (Week 1) so nothing here is placeholder content. It links to the live
 *     lesson page.
 */
export function CurriculumFlow({
  c,
}: {
  c: Translations["curriculumsPage"]
}) {
  const s = c.sections
  const lesson = scienceExperimentsCurriculum.lessons[0]

  return (
    <>
      {/* Four-stage learning arc — editorial rows with hairline dividers. */}
      <dl className="mt-8 divide-y divide-border border-y border-border">
        {s.stages.map((stage) => (
          <div key={stage.title} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="text-base font-bold text-foreground">{stage.title}</dt>
            <dd className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {stage.desc}
            </dd>
          </div>
        ))}
      </dl>

      {/* One real lesson preview, sourced from live course data. */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-foreground">{s.lessonPreviewHeading}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{s.lessonPreviewNote}</p>

        <div className="mt-4 rounded-lg border border-border bg-card p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-avanza-green-dark">
            {lesson.title} · {lesson.estimatedTime}
          </p>

          <dl className="mt-4 divide-y divide-border">
            <PreviewRow label={s.labelObjective}>{lesson.bigQuestion}</PreviewRow>
            <PreviewRow label={s.labelMaterials}>{lesson.materials.join(" · ")}</PreviewRow>
            <PreviewRow label={s.labelExplanation}>{lesson.explanation}</PreviewRow>
            <PreviewRow label={s.labelActivity}>
              {lesson.activityTitle}. {lesson.steps[0]}
            </PreviewRow>
            <PreviewRow label={s.labelReflection}>{lesson.reflectionPrompt}</PreviewRow>
          </dl>

          <Link
            href={scienceLessonPath(lesson.slug)}
            className="mt-6 inline-flex items-center justify-center rounded-md border border-avanza-green px-4 py-2 text-sm font-bold text-avanza-green-dark transition-colors hover:bg-avanza-green hover:text-avanza-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2"
          >
            {s.previewLessonCta}
          </Link>
        </div>
      </div>
    </>
  )
}

function PreviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-5">
      <dt className="text-sm font-semibold text-foreground">{label}</dt>
      <dd className="text-sm leading-relaxed text-muted-foreground">{children}</dd>
    </div>
  )
}

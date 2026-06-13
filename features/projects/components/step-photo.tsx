import Image from "next/image"
import type { ProjectStepImage } from "@/features/projects/data"

/**
 * Renders an optional photo for a single project step. Used by project guide
 * components so that pages render cleanly whether or not a step has a photo
 * yet - see the `stepImages` convention documented on `ProjectStepImage`.
 */
export function ProjectStepPhoto({ stepImage }: { stepImage: ProjectStepImage }) {
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-lg border border-border">
      <Image
        src={stepImage.src}
        alt={stepImage.alt}
        fill
        sizes="(min-width: 1024px) 640px, calc(100vw - 88px)"
        className="object-cover"
      />
    </div>
  )
}

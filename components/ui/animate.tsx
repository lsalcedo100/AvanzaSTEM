"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  /** Delay in ms — use for stagger effects in grouped lists */
  delay?: number
  as?: React.ElementType
  rootMargin?: string
  threshold?: number
}

/**
 * Wraps children in a fade-up reveal animation triggered by IntersectionObserver.
 * Respects prefers-reduced-motion (stays visible if reduced motion is preferred).
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  rootMargin,
  threshold,
}: FadeInProps) {
  const { ref, state } = useInView({ rootMargin, threshold })

  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out",
        state === "hidden" && "opacity-0 translate-y-5",
        state === "visible" && "opacity-100 translate-y-0",
        className
      )}
      style={{ transitionDelay: state === "visible" ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  )
}

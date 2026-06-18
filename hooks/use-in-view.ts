"use client"

import { useEffect, useRef, useState } from "react"

type AnimState = "idle" | "hidden" | "visible"

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
}

const DEFAULT_THRESHOLD = 0.01
const DEFAULT_ROOT_MARGIN = "0px 0px 160px 0px"
const MIN_BOTTOM_ROOT_MARGIN_PX = 120

function expandRootMargin(parts: string[]) {
  if (parts.length === 1) return [parts[0], parts[0], parts[0], parts[0]]
  if (parts.length === 2) return [parts[0], parts[1], parts[0], parts[1]]
  if (parts.length === 3) return [parts[0], parts[1], parts[2], parts[1]]
  return parts.slice(0, 4)
}

function getRevealRootMargin(rootMargin?: string) {
  if (!rootMargin) return DEFAULT_ROOT_MARGIN

  const parts = expandRootMargin(rootMargin.trim().split(/\s+/))
  const bottom = parts[2]?.match(/^(-?\d+(?:\.\d+)?)px$/)

  if (!bottom) return rootMargin

  const bottomPx = Number(bottom[1])
  if (bottomPx >= MIN_BOTTOM_ROOT_MARGIN_PX) return rootMargin

  parts[2] = `${MIN_BOTTOM_ROOT_MARGIN_PX}px`
  return parts.join(" ")
}

export function useInView({ threshold = DEFAULT_THRESHOLD, rootMargin }: UseInViewOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const [state, setState] = useState<AnimState>("idle")

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const el = ref.current
    if (!el) return

    setState("hidden")

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible")
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin: getRevealRootMargin(rootMargin),
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return { ref, state }
}

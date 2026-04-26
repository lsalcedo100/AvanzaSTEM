"use client"

import { useEffect, useRef, useState } from "react"

type AnimState = "idle" | "hidden" | "visible"

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
}

export function useInView(options?: UseInViewOptions) {
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
        threshold: options?.threshold ?? 0.08,
        rootMargin: options?.rootMargin ?? "0px 0px -48px 0px",
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, state }
}

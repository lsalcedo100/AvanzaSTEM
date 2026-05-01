"use client"

import { useEffect, useRef, useState } from "react"
import type { RefObject } from "react"
import { useInView } from "@/hooks/use-in-view"

interface CountUpProps {
  to: number
  suffix?: string
  duration?: number
}

export function CountUp({ to, suffix = "", duration = 1500 }: CountUpProps) {
  const { ref, state } = useInView()
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (state !== "visible" || started.current) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setCount(to)
      return
    }

    started.current = true
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * to))
      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [state, to, duration])

  return <span ref={ref as unknown as RefObject<HTMLSpanElement>}>{count}{suffix}</span>
}

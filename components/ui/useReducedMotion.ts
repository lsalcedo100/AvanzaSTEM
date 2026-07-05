"use client"

import { useEffect, useState } from "react"

/**
 * Tracks the OS "reduce motion" setting so components can skip transient
 * JS-driven effects (confetti, particle bursts). The global stylesheet already
 * neutralises CSS animations for these users; this hook covers the JS side.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return reduced
}

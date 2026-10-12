"use client"

import { useEffect, useRef, type RefObject } from "react"

/**
 * Whether the element behind `ref` is meaningfully on screen.
 *
 * Several activities on /games listen for keys at the window level (Space to
 * fire the catapult, R to restart, arrows to aim). Thirteen of them share one
 * page, so a key pressed while reading one lab must never act on another.
 *
 * "On screen" means at least `fraction` of the element, or of the viewport
 * when the element is taller than the viewport, is visible. A lab three
 * screens tall is on screen while it fills the window, even though only a
 * third of it can ever be seen at once; a lab with a sliver peeking in at the
 * bottom edge is not.
 *
 * Read `.current` inside the key handler; it is a ref, not state, so it never
 * re-renders the lab and is always current when the key arrives.
 */
export function useOnScreen<T extends Element>(ref: RefObject<T | null>, fraction = 0.3): RefObject<boolean> {
  const onScreen = useRef(false)
  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === "undefined") {
      onScreen.current = true
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1]
        const viewportHeight = entry.rootBounds?.height ?? window.innerHeight
        const needed = fraction * Math.min(entry.boundingClientRect.height, viewportHeight)
        onScreen.current = entry.isIntersecting && entry.intersectionRect.height >= needed
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, fraction])
  return onScreen
}

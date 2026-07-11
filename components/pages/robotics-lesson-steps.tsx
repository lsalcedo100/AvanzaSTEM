"use client"

import { useEffect, useRef, useState } from "react"
import { useRoboticsProgress } from "@/components/ui/useRoboticsProgress"

/** One step in the lesson stepper: a stable key, a label, and the section id it scrolls to. */
export type LessonStep = {
  key: string
  label: string
  sectionId: string
}

/** Friendly labels for the canonical lesson steps (also used by the hub resume area). */
export const LESSON_STEP_LABELS: Record<string, string> = {
  learn: "Learn",
  do: "Do",
  program: "Program",
  predict: "Predict",
  test: "Test & improve",
  check: "Knowledge check",
  reflect: "Reflect",
}

/**
 * The lesson step navigator. Renders a wrapping row of steps that jump to each
 * section of the lesson. The student's current step is saved (as they click a
 * step, and as they scroll past sections) and restored on the next visit, so
 * "Continue" returns to the right place. Navigating between steps never marks the
 * lesson complete. Server and first client render show the same neutral bar (no
 * active highlight), so there is no hydration mismatch; it wraps rather than
 * scrolls horizontally, so there is no overflow on mobile.
 */
export function RoboticsLessonSteps({ moduleId, steps }: { moduleId: string; steps: LessonStep[] }) {
  const { loaded, progress, saveLessonStep } = useRoboticsProgress()
  const [active, setActive] = useState<string>(steps[0]?.key ?? "")
  const lastSaved = useRef<string>("")

  const goToStep = (step: LessonStep) => {
    const el = typeof document !== "undefined" ? document.getElementById(step.sectionId) : null
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
    setActive(step.key)
    if (step.key !== lastSaved.current) {
      lastSaved.current = step.key
      saveLessonStep(moduleId, step.key)
    }
  }

  // Restore the saved step on load, and keep the active highlight in sync with
  // scrolling (saving the latest step the student reaches).
  useEffect(() => {
    if (!loaded) return
    const saved = progress.currentStep[moduleId]
    lastSaved.current = saved ?? ""
    if (saved && saved !== steps[0]?.key) {
      const step = steps.find((s) => s.key === saved)
      const el = step && document.getElementById(step.sectionId)
      if (step && el) {
        setActive(step.key)
        el.scrollIntoView({ block: "start" })
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const step = steps.find((s) => s.sectionId === visible.target.id)
        if (!step) return
        setActive(step.key)
        if (step.key !== lastSaved.current) {
          lastSaved.current = step.key
          saveLessonStep(moduleId, step.key)
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.5, 1] },
    )
    for (const step of steps) {
      const el = document.getElementById(step.sectionId)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
    // Re-run only when progress finishes loading or the step list changes.
  }, [loaded, moduleId, steps, progress.currentStep, saveLessonStep])

  if (steps.length === 0) return null

  return (
    <nav
      aria-label="Lesson steps"
      className="sticky top-0 z-10 -mx-6 border-b border-border bg-background/95 px-6 py-3 backdrop-blur"
    >
      <ol className="flex flex-wrap gap-2">
        {steps.map((step, i) => {
          const isActive = loaded && active === step.key
          return (
            <li key={step.key}>
              <button
                type="button"
                onClick={() => goToStep(step)}
                aria-current={isActive ? "step" : undefined}
                className={
                  "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 " +
                  (isActive
                    ? "border-avanza-green bg-avanza-green/10 text-avanza-green-dark"
                    : "border-border text-foreground hover:border-avanza-green/60")
                }
              >
                <span className="font-mono text-muted-foreground">{i + 1}</span>
                {step.label}
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

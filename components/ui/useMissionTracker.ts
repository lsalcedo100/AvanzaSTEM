"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { MissionTracker, type TrackerEvent, type TrackerSnapshot } from "./gravity-switch-objectives"
import type { GravityState, TrackedScenario } from "./gravity-switch-types"
import type { FrameSample } from "./useGravitySwitchCanvas"

type Args = {
  /** A mission or a sandbox experiment; null when nothing is being tracked. */
  scenario: TrackedScenario | null
  /** Changes for every fresh attempt; a new tracker is made for it. */
  attemptKey: string | null
  /** True only while the attempt is live and should be judged. */
  running: boolean
  gravity: GravityState
  flips: number
  /** Receives every tracker event; the caller decides what each means. */
  onEvent: (event: TrackerEvent) => void
}

/** How often the step list re-renders while nothing notable happens, ms. */
const MIRROR_INTERVAL_MS = 120

/**
 * Runs a `MissionTracker` for the live attempt off the canvas loop's frame
 * samples, hands its events to the caller, and mirrors the tracker's
 * progress into React state at a gentle rate so checklists and hold bars can
 * animate without re-rendering every frame.
 *
 * The tracker is created lazily on the first frame of an attempt rather than
 * in an effect, so nothing here sets state synchronously during render or
 * effects; progress for an attempt that has not started yet is derived.
 */
export function useMissionTracker({ scenario, attemptKey, running, gravity, flips, onEvent }: Args) {
  const trackerRef = useRef<MissionTracker | null>(null)
  const gravityRef = useRef(gravity)
  const flipsRef = useRef(flips)
  const onEventRef = useRef(onEvent)
  const lastMirrorRef = useRef(0)
  const [mirror, setMirror] = useState<{ key: string | null; snapshot: TrackerSnapshot } | null>(null)

  useEffect(() => {
    gravityRef.current = gravity
  }, [gravity])
  useEffect(() => {
    flipsRef.current = flips
  }, [flips])
  useEffect(() => {
    onEventRef.current = onEvent
  }, [onEvent])

  const tracker = useCallback((): MissionTracker | null => {
    if (!scenario || attemptKey === null) return null
    const current = trackerRef.current
    if (current && current.attemptKey === attemptKey && current.mission === scenario) return current
    const fresh = new MissionTracker(scenario, attemptKey)
    trackerRef.current = fresh
    return fresh
  }, [scenario, attemptKey])

  const publish = useCallback((events: TrackerEvent[], live: MissionTracker, force: boolean) => {
    for (const event of events) onEventRef.current(event)
    const now = performance.now()
    if (force || events.length > 0 || now - lastMirrorRef.current > MIRROR_INTERVAL_MS) {
      lastMirrorRef.current = now
      setMirror({ key: live.attemptKey, snapshot: live.snapshot() })
    }
  }, [])

  const onFrame = useCallback(
    (sample: FrameSample) => {
      if (!running || !scenario) return
      const live = tracker()
      if (!live || live.finished) return
      const events = live.update(
        {
          objects: sample.objects,
          contacts: sample.contacts,
          gravity: gravityRef.current,
          elapsedMs: sample.elapsedMs,
          flips: flipsRef.current,
          room: scenario.world,
        },
        sample.dtMs,
      )
      publish(events, live, false)
    },
    [running, scenario, tracker, publish],
  )

  const answer = useCallback(
    (choiceId: string) => {
      if (!running) return
      const live = tracker()
      if (!live || live.finished) return
      publish(live.answer(choiceId), live, true)
    },
    [running, tracker, publish],
  )

  // Progress for the current attempt, or a clean slate before its first frame.
  // Derived from mirrored state, never from the tracker ref, so render stays pure.
  const snapshot: TrackerSnapshot | null = useMemo(() => {
    if (!scenario || attemptKey === null) return null
    if (mirror && mirror.key === attemptKey) return mirror.snapshot
    return new MissionTracker(scenario, attemptKey).snapshot()
  }, [scenario, attemptKey, mirror])

  const question = useMemo(() => {
    if (!running || !scenario || !snapshot || snapshot.finished) return null
    const status = snapshot.statuses.find((candidate) => candidate.kind === "answer" && candidate.state === "active")
    if (!status) return null
    const objective = scenario.objectives[status.index]
    return objective.kind === "answer" ? { ...objective, index: status.index } : null
  }, [running, scenario, snapshot])

  return { onFrame, answer, snapshot, question }
}

"use client"

import { useCallback, useEffect, useRef, useState, type RefObject } from "react"
import { InsightEngine, type Insight, type PlayerEvent } from "./gravity-switch-insights"
import type { GravitySwitchWorld } from "./gravity-switch-physics"
import type { GravityState } from "./gravity-switch-types"
import type { FrameSample } from "./useGravitySwitchCanvas"

type Args = {
  /** Only free play gets a narrator; experiments and missions have their own guidance. */
  enabled: boolean
  worldRef: RefObject<GravitySwitchWorld | null>
  /** A new room means a fresh narrator. */
  readyKey: string | null
  gravity: GravityState
}

/**
 * Feeds the "What's happening?" engine with frames from the canvas loop and
 * with the things the player does, and mirrors its one current insight into
 * React state only when it changes.
 */
export function useSandboxInsights({ enabled, worldRef, readyKey, gravity }: Args) {
  const engineRef = useRef<{ key: string | null; engine: InsightEngine } | null>(null)
  const gravityRef = useRef(gravity)
  const [insight, setInsight] = useState<Insight>({ kind: "idle", at: 0, token: 0 })

  useEffect(() => {
    gravityRef.current = gravity
  }, [gravity])

  const engine = useCallback((): InsightEngine => {
    const current = engineRef.current
    if (current && current.key === readyKey) return current.engine
    const fresh = new InsightEngine()
    engineRef.current = { key: readyKey, engine: fresh }
    return fresh
  }, [readyKey])

  const onFrame = useCallback(
    (sample: FrameSample) => {
      if (!enabled) return
      const live = engine()
      const changed = live.update({
        objects: sample.objects,
        contacts: sample.contacts,
        gravity: gravityRef.current,
        elapsedMs: sample.elapsedMs,
      })
      if (changed) setInsight(live.insight)
    },
    [enabled, engine],
  )

  const note = useCallback(
    (event: PlayerEvent) => {
      if (!enabled) return
      const world = worldRef.current
      const live = engine()
      live.note(event, world && !world.isDisposed ? world.getObjects() : [], world && !world.isDisposed ? world.elapsedMs : 0)
      setInsight(live.insight)
    },
    [enabled, engine, worldRef],
  )

  return { onFrame, note, insight: enabled ? insight : null }
}

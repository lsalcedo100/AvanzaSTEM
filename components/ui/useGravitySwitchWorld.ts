"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { reportDebug } from "./gravity-switch-debug"
import { GravitySwitchWorld, type MatterModule, resolveMatterModule } from "./gravity-switch-physics"
import type { GravityState, WorldConfig } from "./gravity-switch-types"

/**
 * Loads Matter.js once, on demand, so the library is not part of the page's
 * initial JavaScript. Every caller shares the same promise.
 */
let matterPromise: Promise<MatterModule> | null = null
export function loadMatter(): Promise<MatterModule> {
  if (!matterPromise) {
    matterPromise = import("matter-js").then(resolveMatterModule)
  }
  return matterPromise
}

export type WorldStatus = "idle" | "loading" | "ready" | "error"

type Args = {
  /** Identifies the world to have built; null tears the current one down. */
  worldKey: string | null
  /** The room for `worldKey`. Stable for as long as the key is. */
  config: WorldConfig | null
  gravity: GravityState
  paused: boolean
}

/**
 * Owns the one live `GravitySwitchWorld` for the component.
 *
 * The world is rebuilt from scratch whenever `worldKey` changes and disposed
 * when the key becomes null or the component unmounts, so no bodies ever
 * leak between rooms. Gravity and pause are pushed into the live world as
 * they change without rebuilding it.
 *
 * Status is derived from which key last finished building rather than set
 * synchronously in effects: the component always sees "loading" for a key it
 * has not built yet, and "ready" only for the current one.
 */
export function useGravitySwitchWorld({ worldKey, config, gravity, paused }: Args) {
  const worldRef = useRef<GravitySwitchWorld | null>(null)
  const gravityRef = useRef(gravity)
  const [readyKey, setReadyKey] = useState<string | null>(null)
  const [failedKey, setFailedKey] = useState<string | null>(null)
  const [objectCount, setObjectCount] = useState(0)

  useEffect(() => {
    gravityRef.current = gravity
  }, [gravity])

  useEffect(() => {
    if (!worldKey || !config) return
    let cancelled = false
    loadMatter()
      .then((Matter) => {
        if (cancelled) return
        const world = new GravitySwitchWorld(Matter, config, gravityRef.current)
        worldRef.current = world
        reportDebug({ worlds: GravitySwitchWorld.liveCount })
        setObjectCount(world.objectCount)
        setReadyKey(worldKey)
      })
      .catch(() => {
        if (!cancelled) setFailedKey(worldKey)
      })
    return () => {
      cancelled = true
      worldRef.current?.dispose()
      worldRef.current = null
      reportDebug({ worlds: GravitySwitchWorld.liveCount })
    }
  }, [worldKey, config])

  useEffect(() => {
    const world = worldRef.current
    if (!world || world.isDisposed) return
    world.setGravity(gravity)
  }, [gravity, readyKey])

  useEffect(() => {
    const world = worldRef.current
    if (!world || world.isDisposed) return
    if (paused) world.pause()
    else world.resume()
  }, [paused, readyKey])

  /** Re-read how many objects the live world holds, after a spawn or a clear. */
  const refreshObjectCount = useCallback(() => {
    const world = worldRef.current
    setObjectCount(world && !world.isDisposed ? world.objectCount : 0)
  }, [])

  const status: WorldStatus =
    worldKey === null ? "idle" : readyKey === worldKey ? "ready" : failedKey === worldKey ? "error" : "loading"

  return { worldRef, status, objectCount, readyKey, refreshObjectCount }
}

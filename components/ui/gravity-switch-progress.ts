/**
 * Gravity Switch: Zero-G Lab — saved progress.
 *
 * One versioned localStorage key holds everything the lab remembers about a
 * player: completed missions, how many times each was completed, the mission
 * last opened, the guided experiments done, the prediction record and the
 * planets tried. Parsing is defensive: anything missing or malformed falls
 * back to an empty record rather than crashing, unknown ids are dropped, and
 * the dev-only scenario is never written. Where storage is unavailable the
 * game simply runs from memory.
 */

import { isGravityPresetId } from "./gravity-switch-config.ts"
import { isExperimentId } from "./gravity-switch-experiments.ts"
import { MISSION_IDS, isMissionId } from "./gravity-switch-missions.ts"
import type { ExperimentId, GravityPresetId, MissionId, ProgressStats } from "./gravity-switch-types.ts"

export const PROGRESS_STORAGE_KEY = "avanza-gravity-switch-progress-v1"

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">

export type LoadedProgress = { completed: MissionId[]; stats: ProgressStats }

type SavedProgress = {
  version: 1
  completed: MissionId[]
  completions: Partial<Record<MissionId, number>>
  lastMissionId: MissionId | null
  experimentsDone: ExperimentId[]
  predictionsRight: number
  predictionsTotal: number
  planetsTried: GravityPresetId[]
}

export function emptyStats(): ProgressStats {
  return {
    completions: {},
    lastMissionId: null,
    experimentsDone: [],
    predictionsRight: 0,
    predictionsTotal: 0,
    planetsTried: [],
  }
}

export function emptyProgress(): LoadedProgress {
  return { completed: [], stats: emptyStats() }
}

/** The browser's localStorage, or null where even touching it throws (some private modes). */
export function browserStorage(): StorageLike | null {
  if (typeof window === "undefined") return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

/** Only real progression missions are ever persisted. */
export function persistableMissions(completed: MissionId[]): MissionId[] {
  return MISSION_IDS.filter((id) => completed.includes(id))
}

function count(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.floor(value) : 0
}

function stringList<T extends string>(value: unknown, keep: (candidate: unknown) => candidate is T): T[] {
  if (!Array.isArray(value)) return []
  return [...new Set(value.filter(keep))]
}

export function parseProgress(raw: string | null): LoadedProgress {
  if (!raw) return emptyProgress()
  try {
    const parsed = JSON.parse(raw) as Partial<SavedProgress> | null
    if (!parsed || typeof parsed !== "object") return emptyProgress()
    const completed = persistableMissions(stringList(parsed.completed, isMissionId))
    const completions: Partial<Record<MissionId, number>> = {}
    if (parsed.completions && typeof parsed.completions === "object") {
      for (const [id, times] of Object.entries(parsed.completions)) {
        if (isMissionId(id) && MISSION_IDS.includes(id) && count(times) > 0) completions[id] = count(times)
      }
    }
    // A completed mission was completed at least once, whatever the counter says.
    for (const id of completed) completions[id] = Math.max(1, completions[id] ?? 0)
    const lastMissionId = isMissionId(parsed.lastMissionId) && MISSION_IDS.includes(parsed.lastMissionId) ? parsed.lastMissionId : null
    const predictionsTotal = count(parsed.predictionsTotal)
    return {
      completed,
      stats: {
        completions,
        lastMissionId,
        experimentsDone: stringList(parsed.experimentsDone, isExperimentId),
        predictionsRight: Math.min(count(parsed.predictionsRight), predictionsTotal),
        predictionsTotal,
        planetsTried: stringList(parsed.planetsTried, isGravityPresetId),
      },
    }
  } catch {
    return emptyProgress()
  }
}

export function loadProgress(storage: StorageLike | null | undefined): LoadedProgress {
  if (!storage) return emptyProgress()
  try {
    return parseProgress(storage.getItem(PROGRESS_STORAGE_KEY))
  } catch {
    return emptyProgress()
  }
}

export function saveProgress(storage: StorageLike | null | undefined, completed: MissionId[], stats: ProgressStats): void {
  if (!storage) return
  const kept = persistableMissions(completed)
  const completions: Partial<Record<MissionId, number>> = {}
  for (const [id, times] of Object.entries(stats.completions)) {
    if (isMissionId(id) && MISSION_IDS.includes(id) && count(times) > 0) completions[id] = count(times)
  }
  const payload: SavedProgress = {
    version: 1,
    completed: kept,
    completions,
    lastMissionId: stats.lastMissionId && MISSION_IDS.includes(stats.lastMissionId) ? stats.lastMissionId : null,
    experimentsDone: stats.experimentsDone,
    predictionsRight: stats.predictionsRight,
    predictionsTotal: stats.predictionsTotal,
    planetsTried: stats.planetsTried,
  }
  try {
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // Private mode or a full quota: progress just does not persist this time.
  }
}

/** Forget everything. Used by the deliberate reset in settings. */
export function clearProgress(storage: StorageLike | null | undefined): void {
  if (!storage) return
  try {
    storage.removeItem(PROGRESS_STORAGE_KEY)
  } catch {
    // Nothing to do.
  }
}

/** Total number of distinct missions completed. */
export function completedCount(completed: MissionId[]): number {
  return persistableMissions(completed).length
}

/**
 * Gravity Switch: Zero-G Lab — achievements.
 *
 * Five small milestones that follow from what the game already asks a
 * player to do: finish a mission, finish them all, run the three guided
 * experiments, make a correct prediction, and try every planet. They are
 * derived from the saved record rather than stored, so they can never
 * disagree with it.
 */

import { EXPERIMENT_IDS } from "./gravity-switch-experiments.ts"
import { GRAVITY_PRESET_ORDER } from "./gravity-switch-config.ts"
import { MISSION_IDS } from "./gravity-switch-missions.ts"
import type { AchievementId, MissionId, ProgressStats } from "./gravity-switch-types.ts"

export const ACHIEVEMENT_IDS: AchievementId[] = ["first-mission", "all-missions", "scientist", "good-guess", "planet-hopper"]

export function earnedAchievements(completed: MissionId[], stats: ProgressStats): AchievementId[] {
  const done = MISSION_IDS.filter((id) => completed.includes(id))
  const earned: AchievementId[] = []
  if (done.length >= 1) earned.push("first-mission")
  if (done.length === MISSION_IDS.length) earned.push("all-missions")
  if (EXPERIMENT_IDS.every((id) => stats.experimentsDone.includes(id))) earned.push("scientist")
  if (stats.predictionsRight >= 1) earned.push("good-guess")
  if (GRAVITY_PRESET_ORDER.every((preset) => stats.planetsTried.includes(preset))) earned.push("planet-hopper")
  return earned
}

/** Achievements in `after` that were not in `before`. */
export function newlyEarned(before: AchievementId[], after: AchievementId[]): AchievementId[] {
  return after.filter((id) => !before.includes(id))
}

export function isAchievementId(value: unknown): value is AchievementId {
  return typeof value === "string" && (ACHIEVEMENT_IDS as string[]).includes(value)
}

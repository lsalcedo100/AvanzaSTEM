// Badge definitions for the Density game.
//
// Framework-free and i18n-free (content lives in Loc bundles) so it can be
// unit-reasoned about and reused by both the progress hook and the UI.

import type { Loc } from "@/components/ui/density-model"

/** Running tallies the game keeps so badges can be awarded. */
export type BadgeStats = {
  /** Correct sink-or-float predictions, all-time. */
  correctSinkFloat: number
  /** Correct predictions of ANY type, all-time. */
  correctPredictions: number
  /** Correct density (mass ÷ volume) calculations, all-time. */
  correctCalcs: number
  /** Longest run of correct answers in a row, all-time. */
  bestStreak: number
  /** Distinct object ids the player has tested (challenge or free lab). */
  testedObjects: string[]
  /** True once a tower/layer level has been finished with a perfect score. */
  perfectTower: boolean
}

export const EMPTY_BADGE_STATS: BadgeStats = {
  correctSinkFloat: 0,
  correctPredictions: 0,
  correctCalcs: 0,
  bestStreak: 0,
  testedObjects: [],
  perfectTower: false,
}

export type BadgeId =
  | "floatFinder"
  | "densityDetective"
  | "layerMaster"
  | "formulaPro"
  | "labExplorer"
  | "streakScientist"

export type Badge = {
  id: BadgeId
  nameLoc: Loc
  descLoc: Loc
  /** Emoji shown in a coloured medallion. */
  emoji: string
  /** Tailwind background tint for the medallion. */
  accent: string
  /** How far along the player is toward earning it (0–1), for a progress ring. */
  progress: (s: BadgeStats) => number
  /** True when the badge is earned. */
  met: (s: BadgeStats) => boolean
}

const ratio = (have: number, need: number) => Math.min(1, have / need)

export const BADGES: Badge[] = [
  {
    id: "floatFinder",
    nameLoc: { en: "Float Finder", es: "Buscaflotes", zh: "浮沉侦探" },
    descLoc: {
      en: "Make 5 correct sink-or-float predictions.",
      es: "Acierta 5 predicciones de flota o se hunde.",
      zh: "正确预测 5 次沉浮。",
    },
    emoji: "🎈",
    accent: "bg-sky-100 text-sky-700",
    progress: (s) => ratio(s.correctSinkFloat, 5),
    met: (s) => s.correctSinkFloat >= 5,
  },
  {
    id: "densityDetective",
    nameLoc: { en: "Density Detective", es: "Detective de densidad", zh: "密度侦探" },
    descLoc: {
      en: "Make 10 correct predictions of any kind.",
      es: "Acierta 10 predicciones de cualquier tipo.",
      zh: "任意类型共答对 10 次。",
    },
    emoji: "🔍",
    accent: "bg-violet-100 text-violet-700",
    progress: (s) => ratio(s.correctPredictions, 10),
    met: (s) => s.correctPredictions >= 10,
  },
  {
    id: "layerMaster",
    nameLoc: { en: "Layer Master", es: "Maestro de capas", zh: "分层大师" },
    descLoc: {
      en: "Score perfectly on a density tower level.",
      es: "Logra un puntaje perfecto en un nivel de torre de densidad.",
      zh: "在密度塔关卡中拿到满分。",
    },
    emoji: "🏆",
    accent: "bg-amber-100 text-amber-700",
    progress: (s) => (s.perfectTower ? 1 : 0),
    met: (s) => s.perfectTower,
  },
  {
    id: "formulaPro",
    nameLoc: { en: "Formula Pro", es: "Pro de la fórmula", zh: "公式高手" },
    descLoc: {
      en: "Nail 5 correct density calculations.",
      es: "Resuelve 5 cálculos de densidad correctos.",
      zh: "正确计算 5 次密度。",
    },
    emoji: "🧮",
    accent: "bg-teal-100 text-teal-700",
    progress: (s) => ratio(s.correctCalcs, 5),
    met: (s) => s.correctCalcs >= 5,
  },
  {
    id: "labExplorer",
    nameLoc: { en: "Lab Explorer", es: "Explorador de laboratorio", zh: "实验室探险家" },
    descLoc: {
      en: "Test 10 different objects.",
      es: "Prueba 10 objetos diferentes.",
      zh: "测试 10 种不同的物体。",
    },
    emoji: "🧪",
    accent: "bg-emerald-100 text-emerald-700",
    progress: (s) => ratio(s.testedObjects.length, 10),
    met: (s) => s.testedObjects.length >= 10,
  },
  {
    id: "streakScientist",
    nameLoc: { en: "Streak Scientist", es: "Científico en racha", zh: "连胜科学家" },
    descLoc: {
      en: "Get 5 correct answers in a row.",
      es: "Consigue 5 respuestas correctas seguidas.",
      zh: "连续答对 5 次。",
    },
    emoji: "⚡",
    accent: "bg-orange-100 text-orange-700",
    progress: (s) => ratio(s.bestStreak, 5),
    met: (s) => s.bestStreak >= 5,
  },
]

export const BADGE_BY_ID: Record<BadgeId, Badge> = BADGES.reduce(
  (acc, b) => {
    acc[b.id] = b
    return acc
  },
  {} as Record<BadgeId, Badge>,
)

/** All badge ids currently satisfied by these stats. */
export function earnedBadges(stats: BadgeStats): BadgeId[] {
  return BADGES.filter((b) => b.met(stats)).map((b) => b.id)
}

import { type AtomAnalysis, analyzeAtom, formatCharge } from "@/lib/atom-analysis"

export type AtomGameMode = "sandbox" | "challenge"

export type ParticleCounts = {
  protons: number
  neutrons: number
  electrons: number
}

export type ChallengeLevel = {
  id: string
  number: number
  title: string
  mission: string
  lesson: string
  clue?: string
  start: ParticleCounts
  acceptedAnswers: ParticleCounts[]
  perfectMoves: number
  successMessage: string
}

export type MissionResult = {
  complete: boolean
  feedback: string
}

export type AtomGameProgress = {
  completedLevelIds: string[]
  unlockedLevelIds: string[]
  bestScoreByLevel: Record<string, number>
  starsByLevel: Record<string, number>
  achievementIds: string[]
  lastSelectedMode: AtomGameMode
  lastSandboxAtom: ParticleCounts
}

export type LevelCompletion = {
  score: number
  stars: number
  achievementIds: string[]
  progress: AtomGameProgress
}

export const ATOM_GAME_PROGRESS_KEY = "avanza-atom-builder-progress-v1"

export const ACHIEVEMENTS = [
  {
    id: "first-atom",
    name: "First Atom",
    description: "Complete your first atom mission.",
  },
  {
    id: "carbon-12",
    name: "Built Carbon-12",
    description: "Build stable Carbon-12.",
  },
  {
    id: "balanced-charge",
    name: "Balanced Your First Charge",
    description: "Fix an atom by balancing its electrons.",
  },
  {
    id: "first-ion",
    name: "Made Your First Ion",
    description: "Build a positive or negative ion.",
  },
  {
    id: "isotope-expert",
    name: "Isotope Expert",
    description: "Fix an unrealistic isotope.",
  },
  {
    id: "found-10-elements",
    name: "Found 10 Elements",
    description: "Reach the final mixed challenge.",
  },
  {
    id: "perfect-level",
    name: "Perfect Level",
    description: "Earn 3 stars on a mission.",
  },
] as const

export const CHALLENGE_LEVELS: ChallengeLevel[] = [
  {
    id: "hydrogen",
    number: 1,
    title: "Build Hydrogen",
    mission: "Build neutral Hydrogen-1.",
    lesson:
      "Protons define the element. Electrons balance the positive charge.",
    start: { protons: 0, neutrons: 0, electrons: 0 },
    acceptedAnswers: [{ protons: 1, neutrons: 0, electrons: 1 }],
    perfectMoves: 2,
    successMessage:
      "Hydrogen-1 is correct: 1 proton makes hydrogen and 1 electron makes it neutral.",
  },
  {
    id: "helium",
    number: 2,
    title: "Build Helium",
    mission: "Build neutral Helium-4.",
    lesson: "A nucleus has protons and neutrons. Neutral atoms balance electrons.",
    start: { protons: 0, neutrons: 0, electrons: 0 },
    acceptedAnswers: [{ protons: 2, neutrons: 2, electrons: 2 }],
    perfectMoves: 6,
    successMessage:
      "Helium-4 is correct: 2 protons make helium, 2 neutrons make Helium-4, and 2 electrons balance the charge.",
  },
  {
    id: "carbon-12",
    number: 3,
    title: "Build Carbon-12",
    mission: "Build a neutral carbon atom with mass number 12.",
    lesson: "Atomic number is protons. Mass number is protons plus neutrons.",
    start: { protons: 0, neutrons: 0, electrons: 0 },
    acceptedAnswers: [{ protons: 6, neutrons: 6, electrons: 6 }],
    perfectMoves: 18,
    successMessage:
      "Carbon-12 is correct: 6 protons make carbon, and 6 protons plus 6 neutrons make mass number 12.",
  },
  {
    id: "oxygen-16",
    number: 4,
    title: "Build Oxygen-16",
    mission: "Build stable neutral Oxygen-16.",
    lesson: "Some isotope combinations are stable and common.",
    start: { protons: 0, neutrons: 0, electrons: 0 },
    acceptedAnswers: [{ protons: 8, neutrons: 8, electrons: 8 }],
    perfectMoves: 24,
    successMessage:
      "Oxygen-16 is correct: 8 protons make oxygen and 8 neutrons make this stable isotope.",
  },
  {
    id: "fix-magnesium",
    number: 5,
    title: "Fix the Unstable Atom",
    mission: "Start with unrealistic magnesium. Add neutrons to make a stable magnesium isotope.",
    lesson: "Changing neutrons changes isotope stability, not the element.",
    start: { protons: 12, neutrons: 0, electrons: 12 },
    acceptedAnswers: [
      { protons: 12, neutrons: 12, electrons: 12 },
      { protons: 12, neutrons: 13, electrons: 12 },
      { protons: 12, neutrons: 14, electrons: 12 },
    ],
    perfectMoves: 12,
    successMessage:
      "Stable magnesium fixed: Magnesium-24, Magnesium-25, and Magnesium-26 are stable isotopes.",
  },
  {
    id: "sodium-cation",
    number: 6,
    title: "Make a Positive Ion",
    mission: "Create sodium with a +1 charge.",
    lesson: "A positive ion, or cation, has fewer electrons than protons.",
    start: { protons: 0, neutrons: 0, electrons: 0 },
    acceptedAnswers: [{ protons: 11, neutrons: 12, electrons: 10 }],
    perfectMoves: 33,
    successMessage:
      "Sodium ion complete: 11 protons and 10 electrons give sodium a +1 charge.",
  },
  {
    id: "chlorine-anion",
    number: 7,
    title: "Make a Negative Ion",
    mission: "Create chlorine with a -1 charge.",
    lesson: "A negative ion, or anion, has more electrons than protons.",
    start: { protons: 0, neutrons: 0, electrons: 0 },
    acceptedAnswers: [{ protons: 17, neutrons: 18, electrons: 18 }],
    perfectMoves: 53,
    successMessage:
      "Chloride ion complete: 17 protons and 18 electrons give chlorine a -1 charge.",
  },
  {
    id: "balance-carbon",
    number: 8,
    title: "Balance the Charge",
    mission: "Start with Carbon-12 missing electrons. Add electrons until it is neutral.",
    lesson: "Charge changes when electrons change.",
    start: { protons: 6, neutrons: 6, electrons: 4 },
    acceptedAnswers: [{ protons: 6, neutrons: 6, electrons: 6 }],
    perfectMoves: 2,
    successMessage:
      "Charge balanced: Carbon-12 has 6 protons and 6 electrons, so its charge is 0.",
  },
  {
    id: "guess-oxygen",
    number: 9,
    title: "Guess the Element",
    mission: "Use the clue to build the right stable atom.",
    clue: "This element has 8 protons and is part of the oxygen gas your body uses.",
    lesson: "A clue about protons is a clue about the element.",
    start: { protons: 0, neutrons: 0, electrons: 0 },
    acceptedAnswers: [{ protons: 8, neutrons: 8, electrons: 8 }],
    perfectMoves: 24,
    successMessage:
      "Clue solved: 8 protons means oxygen, and 8 neutrons makes Oxygen-16.",
  },
  {
    id: "calcium-40",
    number: 10,
    title: "Mixed Challenge",
    mission: "Build a neutral atom with atomic number 20 and mass number 40.",
    lesson: "Use atomic number, mass number, isotope, and charge together.",
    start: { protons: 0, neutrons: 0, electrons: 0 },
    acceptedAnswers: [{ protons: 20, neutrons: 20, electrons: 20 }],
    perfectMoves: 60,
    successMessage:
      "Calcium-40 complete: atomic number 20 means calcium, mass number 40 means 20 neutrons, and 20 electrons makes it neutral.",
  },
]

export function getDefaultProgress(): AtomGameProgress {
  return {
    completedLevelIds: [],
    unlockedLevelIds: [CHALLENGE_LEVELS[0].id],
    bestScoreByLevel: {},
    starsByLevel: {},
    achievementIds: [],
    lastSelectedMode: "sandbox",
    lastSandboxAtom: { protons: 1, neutrons: 0, electrons: 1 },
  }
}

export function loadAtomGameProgress(): AtomGameProgress {
  if (typeof window === "undefined") return getDefaultProgress()

  try {
    const raw = window.localStorage.getItem(ATOM_GAME_PROGRESS_KEY)
    if (!raw) return getDefaultProgress()
    return normalizeProgress(JSON.parse(raw) as Partial<AtomGameProgress>)
  } catch {
    return getDefaultProgress()
  }
}

export function saveAtomGameProgress(progress: AtomGameProgress) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(ATOM_GAME_PROGRESS_KEY, JSON.stringify(progress))
}

export function updateProgress(
  progress: AtomGameProgress,
  updater: (progress: AtomGameProgress) => AtomGameProgress,
): AtomGameProgress {
  const next = normalizeProgress(updater(progress))
  saveAtomGameProgress(next)
  return next
}

export function evaluateLevel(
  level: ChallengeLevel,
  counts: ParticleCounts,
  analysis: AtomAnalysis = analyzeAtom(
    counts.protons,
    counts.neutrons,
    counts.electrons,
  ),
): MissionResult {
  if (level.acceptedAnswers.some((answer) => sameCounts(answer, counts))) {
    return {
      complete: true,
      feedback: level.successMessage,
    }
  }

  if (analysis.validStatus === "invalid" || analysis.neutralIonStatus === "not-an-atom") {
    return {
      complete: false,
      feedback: analysis.shortExplanation,
    }
  }

  const nearest = getNearestAnswer(level, counts)
  const targetAnalysis = analyzeAtom(
    nearest.protons,
    nearest.neutrons,
    nearest.electrons,
  )

  if (counts.protons !== nearest.protons) {
    return {
      complete: false,
      feedback: `You built ${analysis.elementName || "no element"}, but this mission needs ${targetAnalysis.elementName}. ${targetAnalysis.elementName} needs ${nearest.protons} protons.`,
    }
  }

  const currentMass = counts.protons + counts.neutrons
  const targetMass = nearest.protons + nearest.neutrons
  if (currentMass !== targetMass) {
    const diff = nearest.neutrons - counts.neutrons
    return {
      complete: false,
      feedback: `You have the right element, but the isotope is off. ${targetAnalysis.isotopeName} needs mass number ${targetMass}. ${moveInstruction("neutron", diff)}`,
    }
  }

  if (counts.electrons !== nearest.electrons) {
    const targetCharge = nearest.protons - nearest.electrons
    const diff = nearest.electrons - counts.electrons
    return {
      complete: false,
      feedback: `You have the right element and isotope, but the charge is wrong. ${moveInstruction("electron", diff)} to make the charge ${formatCharge(targetCharge)}.`,
    }
  }

  return {
    complete: false,
    feedback: "You are close. Check the mission goal and adjust one particle at a time.",
  }
}

export function completeLevel(
  progress: AtomGameProgress,
  level: ChallengeLevel,
  moves: number,
  mistakes: number,
): LevelCompletion {
  const stars = calculateStars(level, moves, mistakes)
  const score = calculateScore(level, moves, mistakes, stars)
  const completed = new Set(progress.completedLevelIds)
  completed.add(level.id)

  const unlocked = new Set(progress.unlockedLevelIds)
  const nextLevel = CHALLENGE_LEVELS[level.number]
  if (nextLevel) unlocked.add(nextLevel.id)

  const previousBest = progress.bestScoreByLevel[level.id] ?? 0
  const previousStars = progress.starsByLevel[level.id] ?? 0
  const achievementIds = getEarnedAchievements(progress, level, stars)
  const allAchievements = new Set(progress.achievementIds)
  for (const id of achievementIds) allAchievements.add(id)

  const nextProgress = normalizeProgress({
    ...progress,
    completedLevelIds: Array.from(completed),
    unlockedLevelIds: Array.from(unlocked),
    bestScoreByLevel: {
      ...progress.bestScoreByLevel,
      [level.id]: Math.max(previousBest, score),
    },
    starsByLevel: {
      ...progress.starsByLevel,
      [level.id]: Math.max(previousStars, stars),
    },
    achievementIds: Array.from(allAchievements),
  })

  saveAtomGameProgress(nextProgress)
  return { score, stars, achievementIds, progress: nextProgress }
}

export function getLevelById(levelId: string): ChallengeLevel {
  return CHALLENGE_LEVELS.find((level) => level.id === levelId) ?? CHALLENGE_LEVELS[0]
}

export function isLevelUnlocked(
  progress: AtomGameProgress,
  level: ChallengeLevel,
): boolean {
  return progress.unlockedLevelIds.includes(level.id)
}

export function isLevelCompleted(
  progress: AtomGameProgress,
  level: ChallengeLevel,
): boolean {
  return progress.completedLevelIds.includes(level.id)
}

export function calculateStars(
  level: ChallengeLevel,
  moves: number,
  mistakes: number,
): number {
  if (moves <= level.perfectMoves + 1 && mistakes === 0) return 3
  if (moves <= level.perfectMoves + 5 && mistakes <= 2) return 2
  return 1
}

function calculateScore(
  level: ChallengeLevel,
  moves: number,
  mistakes: number,
  stars: number,
): number {
  return Math.max(
    100,
    1000 + stars * 250 - moves * 12 - mistakes * 60 + level.number * 25,
  )
}

function getEarnedAchievements(
  progress: AtomGameProgress,
  level: ChallengeLevel,
  stars: number,
): string[] {
  const earned = new Set<string>()
  const completedCount = new Set([...progress.completedLevelIds, level.id]).size

  if (completedCount >= 1) earned.add("first-atom")
  if (level.id === "carbon-12") earned.add("carbon-12")
  if (level.id === "balance-carbon") earned.add("balanced-charge")
  if (level.id === "sodium-cation" || level.id === "chlorine-anion") {
    earned.add("first-ion")
  }
  if (level.id === "fix-magnesium") earned.add("isotope-expert")
  if (completedCount >= 10) earned.add("found-10-elements")
  if (stars === 3) earned.add("perfect-level")

  return Array.from(earned).filter(
    (id) => !progress.achievementIds.includes(id),
  )
}

function normalizeProgress(progress: Partial<AtomGameProgress>): AtomGameProgress {
  const defaults = getDefaultProgress()
  const unlocked = new Set([
    ...defaults.unlockedLevelIds,
    ...(progress.unlockedLevelIds ?? []),
  ])

  return {
    completedLevelIds: cleanLevelIds(progress.completedLevelIds ?? []),
    unlockedLevelIds: cleanLevelIds(Array.from(unlocked)),
    bestScoreByLevel: progress.bestScoreByLevel ?? {},
    starsByLevel: progress.starsByLevel ?? {},
    achievementIds: (progress.achievementIds ?? []).filter((id) =>
      ACHIEVEMENTS.some((achievement) => achievement.id === id),
    ),
    lastSelectedMode:
      progress.lastSelectedMode === "challenge" ? "challenge" : "sandbox",
    lastSandboxAtom: isParticleCounts(progress.lastSandboxAtom)
      ? progress.lastSandboxAtom
      : defaults.lastSandboxAtom,
  }
}

function cleanLevelIds(levelIds: string[]): string[] {
  return levelIds.filter((id) =>
    CHALLENGE_LEVELS.some((level) => level.id === id),
  )
}

function isParticleCounts(value: unknown): value is ParticleCounts {
  if (!value || typeof value !== "object") return false
  const counts = value as ParticleCounts
  return (
    Number.isInteger(counts.protons) &&
    Number.isInteger(counts.neutrons) &&
    Number.isInteger(counts.electrons)
  )
}

function sameCounts(a: ParticleCounts, b: ParticleCounts): boolean {
  return (
    a.protons === b.protons &&
    a.neutrons === b.neutrons &&
    a.electrons === b.electrons
  )
}

function getNearestAnswer(
  level: ChallengeLevel,
  counts: ParticleCounts,
): ParticleCounts {
  return level.acceptedAnswers.reduce((best, answer) =>
    distance(answer, counts) < distance(best, counts) ? answer : best,
  )
}

function distance(a: ParticleCounts, b: ParticleCounts): number {
  return (
    Math.abs(a.protons - b.protons) +
    Math.abs(a.neutrons - b.neutrons) +
    Math.abs(a.electrons - b.electrons)
  )
}

function moveInstruction(particle: "neutron" | "electron", diff: number): string {
  if (diff === 0) return `Keep the ${particle}s the same.`
  const action = diff > 0 ? "Add" : "Remove"
  const amount = Math.abs(diff)
  return `${action} ${amount} ${particle}${amount === 1 ? "" : "s"}.`
}

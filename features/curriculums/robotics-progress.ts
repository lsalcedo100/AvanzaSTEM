/**
 * Robotics course progress: pure, framework-free persistence logic.
 *
 * This module owns everything about reading, migrating, updating, and querying a
 * student's saved progress, with NO React and NO direct `window` access. That
 * keeps it fully unit-testable and lets the thin `useRoboticsProgress` hook
 * (components/ui/useRoboticsProgress.ts) stay a small wrapper that only handles
 * localStorage and React state.
 *
 * Storage decision (see the Phase-1 audit): the site has no accounts and no
 * server-backed progress - every existing course persists to a single versioned
 * localStorage key. This follows that established pattern rather than inventing a
 * new one, but factors the load/migrate/reduce/select logic out so it is testable
 * and reusable. All records are keyed off stable curriculum ids, never display
 * text, so progress survives content edits and future localization.
 */

import {
  ROBOTICS_COURSE_ID,
  ROBOTICS_PROGRESS_VERSION,
  emptyFinalProjectProgress,
  emptyRoboticsProgress,
  roboticsCurriculum,
  roboticsLessonPath,
  type ActivityResult,
  type BlockKind,
  type EquipmentPathId,
  type RoboticsCurriculum,
  type RoboticsModule,
  type RoboticsProgress,
  type SavedSimulatorResult,
} from "./robotics.ts"
import { parseProgram, type Program } from "./robotics-program.ts"

// Re-exported so consumers of the progress module (and its tests) can import the
// progress type from here alongside the functions that operate on it. The type
// is authored in robotics.ts; this is a type-only re-export (erased at runtime).
export type { RoboticsProgress } from "./robotics.ts"

/* -------------------------------------------------------------------------- */
/* Storage keys                                                               */
/* -------------------------------------------------------------------------- */

/** Current schema's localStorage key. */
export const ROBOTICS_STORAGE_KEY = `avanza-robotics-progress-v${ROBOTICS_PROGRESS_VERSION}`

/**
 * Older keys to read and migrate from, newest-first. The v1 key is the Phase-2
 * minimal shape; reading it lets a returning student keep their saved work.
 */
export const ROBOTICS_LEGACY_KEYS = ["avanza-robotics-progress-v1"] as const

/** The minimal storage surface this module needs; `window.localStorage` satisfies it. */
export type StorageLike = {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

/* -------------------------------------------------------------------------- */
/* Small, defensive coercion helpers                                          */
/* -------------------------------------------------------------------------- */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback
}

function asBool(value: unknown): boolean {
  return value === true
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : []
}

function asStringRecord(value: unknown): Record<string, string> {
  const out: Record<string, string> = {}
  if (isRecord(value)) {
    for (const [k, v] of Object.entries(value)) if (typeof v === "string") out[k] = v
  }
  return out
}

/** Maps each entry of a record through `coerce`, dropping anything that fails. */
function coerceRecord<T>(value: unknown, coerce: (v: unknown) => T | null): Record<string, T> {
  const out: Record<string, T> = {}
  if (isRecord(value)) {
    for (const [k, v] of Object.entries(value)) {
      const coerced = coerce(v)
      if (coerced !== null) out[k] = coerced
    }
  }
  return out
}

/** Coerce one saved simulator result, defaulting fields absent in older saves. */
function coerceSimResult(v: unknown): RoboticsProgress["savedSimulatorResults"][string] | null {
  if (!isRecord(v)) return null
  return {
    missionId: asString(v.missionId),
    specId: asString(v.specId),
    success: asBool(v.success),
    trial: asNumber(v.trial, 1),
    steps: asNumber(v.steps),
    missionTimeMs: asNumber(v.missionTimeMs),
    collisions: asNumber(v.collisions),
    sensorEvents: asNumber(v.sensorEvents),
    finalX: asNumber(v.finalX),
    finalY: asNumber(v.finalY),
    programRevision: asNumber(v.programRevision),
    ranTooLong: asBool(v.ranTooLong),
    notes: asString(v.notes),
    revisionMade: asString(v.revisionMade),
    savedAt: asString(v.savedAt),
  }
}

const PATH_IDS: readonly EquipmentPathId[] = ["kit", "simulator", "unplugged"]
function asPath(value: unknown): EquipmentPathId | null {
  return typeof value === "string" && (PATH_IDS as readonly string[]).includes(value)
    ? (value as EquipmentPathId)
    : null
}

const BLOCK_KINDS: readonly BlockKind[] = [
  "move-forward",
  "move-backward",
  "turn-left",
  "turn-right",
  "wait",
  "repeat",
  "repeat-until",
  "forever",
  "if",
  "if-else",
  "read-sensor",
  "set-variable",
  "stop",
]
function asBlocks(value: unknown): BlockKind[] {
  return Array.isArray(value)
    ? value.filter((v): v is BlockKind => typeof v === "string" && (BLOCK_KINDS as readonly string[]).includes(v))
    : []
}

/* -------------------------------------------------------------------------- */
/* Deserialize / migrate / recover                                            */
/* -------------------------------------------------------------------------- */

/**
 * Coerce an arbitrary object into a valid v2 progress record, filling every
 * missing or malformed field with its default. This is the corruption-safety
 * layer: partial, garbage, or hand-edited data can never crash a consumer, it
 * just falls back field by field.
 */
function coerceV2(data: Record<string, unknown>): RoboticsProgress {
  const base = emptyRoboticsProgress()
  const validSlugs = new Set(roboticsCurriculum.modules.map((m) => m.id))
  const keepModuleIds = (ids: string[]) => ids.filter((id) => validSlugs.has(id))

  const fp = isRecord(data.finalProject) ? data.finalProject : {}

  return {
    courseId: ROBOTICS_COURSE_ID,
    version: ROBOTICS_PROGRESS_VERSION,
    equipmentPath: asPath(data.equipmentPath),
    completed: keepModuleIds(asStringArray(data.completed)),
    started: keepModuleIds(asStringArray(data.started)),
    lastVisited:
      typeof data.lastVisited === "string" && validSlugs.has(data.lastVisited) ? data.lastVisited : null,
    currentStep: asStringRecord(data.currentStep),
    startedAt: asStringRecord(data.startedAt),
    completedAt: asStringRecord(data.completedAt),
    unlockAll: asBool(data.unlockAll),
    knowledgeChecks: coerceRecord(data.knowledgeChecks, (v) => {
      if (!isRecord(v)) return null
      return {
        checkId: asString(v.checkId),
        selectedAnswers: asStringRecord(v.selectedAnswers),
        score: asNumber(v.score),
        total: asNumber(v.total),
        reviewed: asBool(v.reviewed),
        attempts: asNumber(v.attempts, 1),
        savedAt: asString(v.savedAt),
      }
    }),
    predictions: asStringRecord(data.predictions),
    activityResults: coerceRecord(data.activityResults, (v) => {
      if (!isRecord(v)) return null
      return {
        activityId: asString(v.activityId),
        pathId: asPath(v.pathId),
        completed: asBool(v.completed),
        notes: asString(v.notes),
        savedAt: asString(v.savedAt),
      }
    }),
    activityData: asStringRecord(data.activityData),
    testRecords: coerceRecord(data.testRecords, (v) => {
      if (!isRecord(v)) return null
      const rows = Array.isArray(v.rows)
        ? v.rows.map((row) => (Array.isArray(row) ? row.map((c) => asString(c)) : [])).filter((r) => r.length > 0)
        : []
      return { recordId: asString(v.recordId), rows, savedAt: asString(v.savedAt) }
    }),
    debugFindings: coerceRecord(data.debugFindings, (v) => {
      if (!isRecord(v)) return null
      return {
        missionId: asString(v.missionId),
        bugIdentified: asBool(v.bugIdentified),
        revisionMade: asString(v.revisionMade),
        savedAt: asString(v.savedAt),
      }
    }),
    savedPrograms: coerceRecord(data.savedPrograms, (v) => {
      if (!isRecord(v)) return null
      return { specId: asString(v.specId), blocks: asBlocks(v.blocks), savedAt: asString(v.savedAt) }
    }),
    savedProgramAsts: coerceRecord(data.savedProgramAsts, (v) => {
      if (!isRecord(v)) return null
      const program = parseProgram(v.program)
      if (!program) return null
      return { specId: asString(v.specId), program, savedAt: asString(v.savedAt), revisions: asNumber(v.revisions, 1) }
    }),
    savedSimulatorResults: coerceRecord(data.savedSimulatorResults, coerceSimResult),
    journal: coerceRecord(data.journal, (v) => {
      if (!isRecord(v)) return null
      return {
        moduleId: asString(v.moduleId),
        promptId: asString(v.promptId),
        value: asString(v.value),
        savedAt: asString(v.savedAt),
      }
    }),
    reflections: asStringRecord(data.reflections),
    finalProject: {
      missionChoiceId: typeof fp.missionChoiceId === "string" ? fp.missionChoiceId : null,
      plan: asStringRecord(fp.plan),
      testResults: isRecord(fp.testResults)
        ? {
            recordId: asString((fp.testResults as Record<string, unknown>).recordId),
            rows: Array.isArray((fp.testResults as Record<string, unknown>).rows)
              ? ((fp.testResults as Record<string, unknown>).rows as unknown[]).map((row) =>
                  Array.isArray(row) ? row.map((c) => asString(c)) : [],
                )
              : [],
            savedAt: asString((fp.testResults as Record<string, unknown>).savedAt),
          }
        : null,
      selfEvaluation: asStringRecord(fp.selfEvaluation),
      savedAt: typeof fp.savedAt === "string" ? fp.savedAt : null,
    },
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : base.updatedAt,
  }
}

/**
 * Migrate the v1 (Phase-2 minimal) shape to v2. v1 stored knowledge-check
 * *scores* only (a number per check); we lift those into full attempt records so
 * a returning student keeps their scores. Everything else v1 stored maps across
 * one-to-one; new v2 fields start empty.
 */
function migrateV1toV2(data: Record<string, unknown>): RoboticsProgress {
  const next = emptyRoboticsProgress()
  const validSlugs = new Set(roboticsCurriculum.modules.map((m) => m.id))

  next.completed = asStringArray(data.completed).filter((id) => validSlugs.has(id))
  next.started = asStringArray(data.started).filter((id) => validSlugs.has(id))
  next.lastVisited =
    typeof data.lastVisited === "string" && validSlugs.has(data.lastVisited) ? data.lastVisited : null
  next.unlockAll = asBool(data.unlockAll)

  // v1 knowledgeCheckScores: Record<checkId, number> -> v2 attempt records.
  if (isRecord(data.knowledgeCheckScores)) {
    for (const [checkId, score] of Object.entries(data.knowledgeCheckScores)) {
      if (typeof score === "number") {
        next.knowledgeChecks[checkId] = {
          checkId,
          selectedAnswers: {},
          score,
          total: 0,
          reviewed: false,
          attempts: 1,
          savedAt: "",
        }
      }
    }
  }

  // v1 savedPrograms / savedSimulatorResults / journal map straight across.
  next.savedPrograms = coerceRecord(data.savedPrograms, (v) =>
    isRecord(v) ? { specId: asString(v.specId), blocks: asBlocks(v.blocks), savedAt: asString(v.savedAt) } : null,
  )
  next.savedSimulatorResults = coerceRecord(data.savedSimulatorResults, coerceSimResult)
  next.journal = coerceRecord(data.journal, (v) =>
    isRecord(v)
      ? {
          moduleId: asString(v.moduleId),
          promptId: asString(v.promptId),
          value: asString(v.value),
          savedAt: asString(v.savedAt),
        }
      : null,
  )
  return next
}

/**
 * Turn an arbitrary parsed value into a valid progress record. Handles: the
 * current version, the v1 legacy version, unversioned legacy data, and anything
 * unrecognized (never discarded outright - recognizable fields are carried into
 * a coerced v2 record; the rest default).
 */
export function migrateRoboticsProgress(data: unknown): RoboticsProgress {
  if (!isRecord(data)) return emptyRoboticsProgress()

  const version = asNumber(data.version, 0)

  if (version === ROBOTICS_PROGRESS_VERSION) return coerceV2(data)
  if (version === 1) return migrateV1toV2(data)

  // Unversioned legacy data that looks like the v1 shape.
  if (version === 0 && ("knowledgeCheckScores" in data || "journal" in data || "completed" in data)) {
    return migrateV1toV2(data)
  }

  // Unknown/newer version: keep whatever we can recognize rather than wiping it.
  return coerceV2(data)
}

/** Parse a raw localStorage string into progress, recovering from corruption. */
export function parseRoboticsProgress(raw: string | null): RoboticsProgress {
  if (!raw) return emptyRoboticsProgress()
  try {
    return migrateRoboticsProgress(JSON.parse(raw))
  } catch {
    // Malformed JSON (truncated write, hand-editing) - start fresh rather than crash.
    return emptyRoboticsProgress()
  }
}

/** Serialize progress for storage. */
export function serializeRoboticsProgress(progress: RoboticsProgress): string {
  return JSON.stringify(progress)
}

/**
 * Load progress from a storage-like object, or return the empty state when no
 * storage is available (server render). Reads the current key first, then any
 * legacy key, migrating as needed. Server-safe: pass `undefined` on the server.
 */
export function loadRoboticsProgress(storage: StorageLike | undefined): RoboticsProgress {
  if (!storage) return emptyRoboticsProgress()
  try {
    const current = storage.getItem(ROBOTICS_STORAGE_KEY)
    if (current) return parseRoboticsProgress(current)
    for (const legacyKey of ROBOTICS_LEGACY_KEYS) {
      const legacy = storage.getItem(legacyKey)
      if (legacy) return parseRoboticsProgress(legacy)
    }
    return emptyRoboticsProgress()
  } catch {
    return emptyRoboticsProgress()
  }
}

/** Persist progress to a storage-like object. No-op when storage is unavailable. */
export function saveRoboticsProgress(storage: StorageLike | undefined, progress: RoboticsProgress): void {
  if (!storage) return
  try {
    storage.setItem(ROBOTICS_STORAGE_KEY, serializeRoboticsProgress(progress))
  } catch {
    // Storage can be full or blocked (private mode); the UI still works in-memory.
  }
}

/* -------------------------------------------------------------------------- */
/* Reducers - pure, immutable updates. Each returns a NEW progress object.    */
/* Callers pass `at` (an ISO timestamp) so the layer stays deterministic and  */
/* free of Date; the hook supplies `new Date().toISOString()`.                */
/* -------------------------------------------------------------------------- */

/** Stamp the last-updated time on a fresh copy. */
function touch(progress: RoboticsProgress, at: string): RoboticsProgress {
  return { ...progress, updatedAt: at }
}

function addUnique(list: string[], value: string): string[] {
  return list.includes(value) ? list : [...list, value]
}

/** Mark a lesson opened: record it as started, set last-visited, stamp start time. */
export function markLessonStarted(progress: RoboticsProgress, moduleId: string, at: string): RoboticsProgress {
  return touch(
    {
      ...progress,
      started: addUnique(progress.started, moduleId),
      lastVisited: moduleId,
      startedAt: progress.startedAt[moduleId] ? progress.startedAt : { ...progress.startedAt, [moduleId]: at },
    },
    at,
  )
}

/** Save the current lesson-flow step within a module (for resume-to-step). */
export function saveLessonStep(
  progress: RoboticsProgress,
  moduleId: string,
  stepId: string,
  at: string,
): RoboticsProgress {
  return touch(
    { ...progress, lastVisited: moduleId, currentStep: { ...progress.currentStep, [moduleId]: stepId } },
    at,
  )
}

/** Mark a lesson/module complete: adds to completed + started, stamps completion time. */
export function markLessonComplete(progress: RoboticsProgress, moduleId: string, at: string): RoboticsProgress {
  return touch(
    {
      ...progress,
      completed: addUnique(progress.completed, moduleId),
      started: addUnique(progress.started, moduleId),
      completedAt: progress.completedAt[moduleId]
        ? progress.completedAt
        : { ...progress.completedAt, [moduleId]: at },
    },
    at,
  )
}

/** Record a knowledge-check attempt (increments the attempt counter). */
export function saveQuizAttempt(
  progress: RoboticsProgress,
  checkId: string,
  selectedAnswers: Record<string, string>,
  score: number,
  total: number,
  at: string,
): RoboticsProgress {
  const previous = progress.knowledgeChecks[checkId]
  return touch(
    {
      ...progress,
      knowledgeChecks: {
        ...progress.knowledgeChecks,
        [checkId]: {
          checkId,
          selectedAnswers,
          score,
          total,
          reviewed: previous?.reviewed ?? false,
          attempts: (previous?.attempts ?? 0) + 1,
          savedAt: at,
        },
      },
    },
    at,
  )
}

/** Flag that the student opened the answer review for a knowledge check. */
export function setAnswerReviewed(
  progress: RoboticsProgress,
  checkId: string,
  reviewed: boolean,
  at: string,
): RoboticsProgress {
  const previous = progress.knowledgeChecks[checkId]
  if (!previous) return progress
  return touch(
    { ...progress, knowledgeChecks: { ...progress.knowledgeChecks, [checkId]: { ...previous, reviewed } } },
    at,
  )
}

/** Save a prediction response. */
export function savePrediction(
  progress: RoboticsProgress,
  promptId: string,
  response: string,
  at: string,
): RoboticsProgress {
  return touch({ ...progress, predictions: { ...progress.predictions, [promptId]: response } }, at)
}

/** Save an activity result. */
export function saveActivityResult(
  progress: RoboticsProgress,
  activityId: string,
  result: { pathId: EquipmentPathId | null; completed: boolean; notes?: string },
  at: string,
): RoboticsProgress {
  const entry: ActivityResult = {
    activityId,
    pathId: result.pathId,
    completed: result.completed,
    notes: result.notes ?? "",
    savedAt: at,
  }
  return touch({ ...progress, activityResults: { ...progress.activityResults, [activityId]: entry } }, at)
}

/** Save (or clear) the serialized state of an interactive in-lesson activity. */
export function saveActivityData(progress: RoboticsProgress, key: string, value: string, at: string): RoboticsProgress {
  return touch({ ...progress, activityData: { ...progress.activityData, [key]: value } }, at)
}

/** Save a filled-in testing table. */
export function saveTestRecord(
  progress: RoboticsProgress,
  recordId: string,
  rows: string[][],
  at: string,
): RoboticsProgress {
  return touch(
    { ...progress, testRecords: { ...progress.testRecords, [recordId]: { recordId, rows, savedAt: at } } },
    at,
  )
}

/** Save a debugging-mission finding (bug identified + revision made). */
export function saveDebugFinding(
  progress: RoboticsProgress,
  missionId: string,
  finding: { bugIdentified: boolean; revisionMade: string },
  at: string,
): RoboticsProgress {
  return touch(
    {
      ...progress,
      debugFindings: {
        ...progress.debugFindings,
        [missionId]: { missionId, bugIdentified: finding.bugIdentified, revisionMade: finding.revisionMade, savedAt: at },
      },
    },
    at,
  )
}

/** Save a block program by its spec id. */
export function saveProgram(
  progress: RoboticsProgress,
  specId: string,
  blocks: BlockKind[],
  at: string,
): RoboticsProgress {
  return touch(
    { ...progress, savedPrograms: { ...progress.savedPrograms, [specId]: { specId, blocks, savedAt: at } } },
    at,
  )
}

/**
 * Save a block-editor program (full typed AST) by its spec id, tracking a
 * revision count. Only this spec's program is touched, so one lesson's program
 * never overwrites another's.
 */
export function saveProgramAst(
  progress: RoboticsProgress,
  specId: string,
  program: Program,
  at: string,
): RoboticsProgress {
  const previous = progress.savedProgramAsts[specId]
  return touch(
    {
      ...progress,
      savedProgramAsts: {
        ...progress.savedProgramAsts,
        [specId]: { specId, program, savedAt: at, revisions: (previous?.revisions ?? 0) + 1 },
      },
    },
    at,
  )
}

/** Clear one saved block-editor program (e.g. "reset to starter"). */
export function resetProgramAst(progress: RoboticsProgress, specId: string, at: string): RoboticsProgress {
  if (!(specId in progress.savedProgramAsts)) return progress
  const savedProgramAsts = { ...progress.savedProgramAsts }
  delete savedProgramAsts[specId]
  return touch({ ...progress, savedProgramAsts }, at)
}

/**
 * Save a full simulator mission-result record, keyed by the program spec so one
 * lesson's latest run never overwrites another's.
 */
export function saveSimulatorResult(
  progress: RoboticsProgress,
  result: Omit<SavedSimulatorResult, "savedAt">,
  at: string,
): RoboticsProgress {
  return touch(
    {
      ...progress,
      savedSimulatorResults: {
        ...progress.savedSimulatorResults,
        [result.specId || result.missionId]: { ...result, savedAt: at },
      },
    },
    at,
  )
}

/** Save a design-journal entry (keyed by module + prompt). */
export function saveJournalEntry(
  progress: RoboticsProgress,
  moduleId: string,
  promptId: string,
  value: string,
  at: string,
): RoboticsProgress {
  const key = `${moduleId}:${promptId}`
  return touch(
    { ...progress, journal: { ...progress.journal, [key]: { moduleId, promptId, value, savedAt: at } } },
    at,
  )
}

/** Save a reflection response. */
export function saveReflection(
  progress: RoboticsProgress,
  promptId: string,
  response: string,
  at: string,
): RoboticsProgress {
  return touch({ ...progress, reflections: { ...progress.reflections, [promptId]: response } }, at)
}

/**
 * Select the equipment path WITHOUT touching any other saved work. Switching
 * between kit / simulator / unplugged only changes which variant is shown; all
 * completed lessons, quizzes, programs, and journal entries are shared and kept.
 */
export function selectEquipmentPath(
  progress: RoboticsProgress,
  pathId: EquipmentPathId,
  at: string,
): RoboticsProgress {
  return touch({ ...progress, equipmentPath: pathId }, at)
}

/** Parent/teacher override: unlock every week, or lock back to normal progression. */
export function setUnlockAll(progress: RoboticsProgress, value: boolean, at: string): RoboticsProgress {
  return touch({ ...progress, unlockAll: value }, at)
}

/* Final project ----------------------------------------------------------- */

export function setFinalMissionChoice(progress: RoboticsProgress, choiceId: string, at: string): RoboticsProgress {
  return touch(
    { ...progress, finalProject: { ...progress.finalProject, missionChoiceId: choiceId, savedAt: at } },
    at,
  )
}

export function saveFinalPlanField(
  progress: RoboticsProgress,
  fieldId: string,
  value: string,
  at: string,
): RoboticsProgress {
  return touch(
    {
      ...progress,
      finalProject: { ...progress.finalProject, plan: { ...progress.finalProject.plan, [fieldId]: value }, savedAt: at },
    },
    at,
  )
}

export function saveFinalTestResults(progress: RoboticsProgress, rows: string[][], at: string): RoboticsProgress {
  return touch(
    {
      ...progress,
      finalProject: { ...progress.finalProject, testResults: { recordId: "w8-tr1", rows, savedAt: at }, savedAt: at },
    },
    at,
  )
}

export function saveFinalSelfEval(
  progress: RoboticsProgress,
  categoryId: string,
  level: string,
  at: string,
): RoboticsProgress {
  return touch(
    {
      ...progress,
      finalProject: {
        ...progress.finalProject,
        selfEvaluation: { ...progress.finalProject.selfEvaluation, [categoryId]: level },
        savedAt: at,
      },
    },
    at,
  )
}

/* Resets ------------------------------------------------------------------ */

/** Clear one activity's saved result. */
export function resetActivity(progress: RoboticsProgress, activityId: string, at: string): RoboticsProgress {
  if (!(activityId in progress.activityResults)) return progress
  const activityResults = { ...progress.activityResults }
  delete activityResults[activityId]
  return touch({ ...progress, activityResults }, at)
}

/**
 * Reset a whole lesson: clears completion, timestamps, step, and every saved
 * artifact that belongs to that module (its activities, quiz, predictions, test
 * records, debug findings, programs, simulator results, journal, reflections).
 * Other lessons' work is untouched. Requires the module so it can target the
 * exact ids that belong to it.
 */
export function resetLesson(progress: RoboticsProgress, module: RoboticsModule, at: string): RoboticsProgress {
  const next = emptyRoboticsProgress()
  // Start from a shallow copy of everything, then strip this module's entries.
  const copy: RoboticsProgress = {
    ...progress,
    completed: progress.completed.filter((id) => id !== module.id),
    started: progress.started.filter((id) => id !== module.id),
    lastVisited: progress.lastVisited === module.id ? null : progress.lastVisited,
    currentStep: { ...progress.currentStep },
    startedAt: { ...progress.startedAt },
    completedAt: { ...progress.completedAt },
    knowledgeChecks: { ...progress.knowledgeChecks },
    predictions: { ...progress.predictions },
    activityResults: { ...progress.activityResults },
    activityData: { ...progress.activityData },
    testRecords: { ...progress.testRecords },
    debugFindings: { ...progress.debugFindings },
    savedPrograms: { ...progress.savedPrograms },
    savedProgramAsts: { ...progress.savedProgramAsts },
    savedSimulatorResults: { ...progress.savedSimulatorResults },
    journal: { ...progress.journal },
    reflections: { ...progress.reflections },
    finalProject: module.isFinal ? emptyFinalProjectProgress() : progress.finalProject,
  }

  delete copy.currentStep[module.id]
  delete copy.startedAt[module.id]
  delete copy.completedAt[module.id]
  delete copy.knowledgeChecks[module.knowledgeCheck.id]

  for (const a of module.activities) {
    delete copy.activityResults[a.id]
    // Interactive-activity state is keyed like "<kind>:<activityId>"; clear any
    // entry that belongs to this module's activities.
    for (const dataKey of Object.keys(copy.activityData)) {
      if (dataKey.includes(a.id)) delete copy.activityData[dataKey]
    }
  }
  for (const p of module.predictionPrompts) delete copy.predictions[p.id]
  for (const t of module.testRecords) delete copy.testRecords[t.id]
  for (const d of module.debuggingMissions) delete copy.debugFindings[d.id]
  for (const s of module.savedPrograms) {
    delete copy.savedPrograms[s.id]
    delete copy.savedProgramAsts[s.id]
    delete copy.savedSimulatorResults[s.id]
  }
  for (const m of module.simulatorMissions) delete copy.savedSimulatorResults[m.id]
  for (const r of module.reflection) delete copy.reflections[r.id]
  for (const j of module.journalPrompts) delete copy.journal[`${module.id}:${j.id}`]

  // Keep the neutral course-level fields from a fresh record where relevant.
  copy.courseId = next.courseId
  copy.version = next.version
  return touch(copy, at)
}

/** Reset the entire course to a fresh state. */
export function resetCourse(): RoboticsProgress {
  return emptyRoboticsProgress()
}

/* -------------------------------------------------------------------------- */
/* Selectors - deterministic queries over progress + curriculum              */
/* -------------------------------------------------------------------------- */

function orderedModules(curriculum: RoboticsCurriculum): RoboticsModule[] {
  return [...curriculum.modules].sort((a, b) => a.order - b.order)
}

/** Whether a module is complete (authoritative: it was marked complete). */
export function isModuleComplete(progress: RoboticsProgress, moduleId: string): boolean {
  return progress.completed.includes(moduleId)
}

/**
 * Whether a module is unlocked. Unlocked when the teacher override is on, the
 * module is already complete (always reviewable), or every prerequisite module
 * has been completed. Deterministic and data-driven off the module's declared
 * prerequisites, so the sequential chain falls out of the curriculum itself.
 */
export function isModuleUnlocked(progress: RoboticsProgress, module: RoboticsModule): boolean {
  if (progress.unlockAll) return true
  if (progress.completed.includes(module.id)) return true
  return module.prerequisites.every((pre) => progress.completed.includes(pre.moduleId))
}

/** Display status for a module on the hub/list. */
export type RoboticsModuleStatus = "completed" | "in-progress" | "not-started" | "locked"

export function moduleStatus(
  progress: RoboticsProgress,
  module: RoboticsModule,
  resumeModuleId: string | null,
): RoboticsModuleStatus {
  if (progress.completed.includes(module.id)) return "completed"
  if (!isModuleUnlocked(progress, module)) return "locked"
  if (module.id === resumeModuleId || progress.started.includes(module.id)) return "in-progress"
  return "not-started"
}

/** Availability of every module, in course order. */
export function lessonAvailability(
  progress: RoboticsProgress,
  curriculum: RoboticsCurriculum = roboticsCurriculum,
): Array<{ moduleId: string; slug: string; unlocked: boolean; completed: boolean; status: RoboticsModuleStatus }> {
  const resume = findResumeTarget(progress, curriculum)
  return orderedModules(curriculum).map((module) => ({
    moduleId: module.id,
    slug: module.slug,
    unlocked: isModuleUnlocked(progress, module),
    completed: progress.completed.includes(module.id),
    status: moduleStatus(progress, module, resume.moduleId),
  }))
}

/** Whole-course completion summary. */
export type RoboticsCourseCompletion = {
  completedCount: number
  total: number
  percent: number
  complete: boolean
}

export function courseCompletion(
  progress: RoboticsProgress,
  curriculum: RoboticsCurriculum = roboticsCurriculum,
): RoboticsCourseCompletion {
  const total = curriculum.modules.length
  const completedCount = curriculum.modules.filter((m) => progress.completed.includes(m.id)).length
  return {
    completedCount,
    total,
    percent: total === 0 ? 0 : Math.round((completedCount / total) * 100),
    complete: completedCount === total,
  }
}

/**
 * An advisory breakdown of a module's completion requirements against saved
 * evidence. Non-blocking: `markLessonComplete` stays authoritative (matching the
 * other courses), but the UI can use this to show a "what's left" checklist.
 */
export function computeModuleRequirements(
  progress: RoboticsProgress,
  module: RoboticsModule,
): Array<{ id: string; label: string; done: boolean }> {
  // Completion is based on real engagement, not on passing: a submitted check
  // counts, so a student is never blocked from finishing by a wrong answer.
  const quizSubmitted = !!progress.knowledgeChecks[module.knowledgeCheck.id]
  const anyReflection = module.reflection.some((r) => (progress.reflections[r.id] ?? "").trim().length > 0)
  const anyActivity = module.activities.some((a) => progress.activityResults[a.id]?.completed)
  const started = progress.started.includes(module.id)

  // The final project is finished by real participation in its workspace, not by
  // marking the week started: a mission must be chosen, the planning brief filled
  // in, the required number of test runs recorded with a documented revision, a
  // program saved, and the final explanation written.
  if (module.isFinal && module.finalProject) {
    const fp = progress.finalProject
    const planFilled = (id: string) => (fp.plan[id] ?? "").trim().length > 0
    const filledPlanCount = Object.values(fp.plan).filter((v) => (v ?? "").trim().length > 0).length
    const missionChosen = !!fp.missionChoiceId
    const rows = fp.testResults?.rows ?? []
    const filledRuns = rows.filter((r) => r.slice(1).some((c) => (c ?? "").trim().length > 0)).length
    const requiredRuns = module.finalProject.requiredTestRuns
    const hasProgram = module.savedPrograms.some((sp) => !!progress.savedProgramAsts[sp.id])
    return module.completion.requirements.map((req) => {
      let done: boolean
      switch (req.sectionKind) {
        case "learn": // planning brief + a chosen mission
          done = missionChosen && filledPlanCount >= 3
          break
        case "build":
          done = hasProgram || anyActivity
          break
        case "program":
          done = hasProgram || anyActivity
          break
        case "test": // three recorded runs and a documented revision
          done = filledRuns >= requiredRuns && planFilled("revision")
          break
        case "reflection": // final explanation
          done = planFilled("final-explanation") || anyReflection
          break
        case "knowledge-check":
          done = quizSubmitted
          break
        default:
          done = missionChosen
      }
      return { id: req.id, label: req.label, done }
    })
  }

  return module.completion.requirements.map((req) => {
    let done: boolean
    switch (req.sectionKind) {
      case "knowledge-check":
        done = quizSubmitted
        break
      case "reflection":
        done = anyReflection
        break
      case "build":
      case "program":
      case "explore":
      case "test":
        done = anyActivity
        break
      case "learn":
        done = started
        break
      default:
        done = started
    }
    return { id: req.id, label: req.label, done }
  })
}

/** Whether every configured completion requirement for a module is met. */
export function moduleRequirementsMet(progress: RoboticsProgress, module: RoboticsModule): boolean {
  return computeModuleRequirements(progress, module).every((r) => r.done)
}

/** Where "Continue" should send a student, as route metadata. */
export type RoboticsResumeTarget = {
  moduleId: string
  slug: string
  /** The lesson-flow step to resume at within the module, if one was saved. */
  stepId: string | null
  /** The lesson route to navigate to. */
  path: string
  /** True when every module is complete (resume points at the final week). */
  courseComplete: boolean
}

/**
 * The resume destination: the first unlocked, not-yet-complete module in course
 * order, resumed at its last-open step. If everything is complete, points at the
 * final module. Deterministic - depends only on progress + curriculum.
 */
export function findResumeTarget(
  progress: RoboticsProgress,
  curriculum: RoboticsCurriculum = roboticsCurriculum,
): RoboticsResumeTarget {
  const ordered = orderedModules(curriculum)
  const next = ordered.find(
    (module) => !progress.completed.includes(module.id) && isModuleUnlocked(progress, module),
  )
  const courseComplete = !next
  const target = next ?? ordered[ordered.length - 1]
  const savedStep = progress.currentStep[target.id]
  const stepId = savedStep ?? target.lessonFlow[0]?.id ?? null
  return {
    moduleId: target.id,
    slug: target.slug,
    stepId,
    path: roboticsLessonPath(target.slug),
    courseComplete,
  }
}

/** An estimate of the time left in the course, from the incomplete weeks. */
export type RoboticsRemainingTime = {
  weeksLeft: number
  lowMinutes: number
  highMinutes: number
}

/**
 * Estimates remaining course time by parsing each incomplete module's
 * `estimatedTime` string (e.g. "60-75 minutes") and summing the low and high
 * bounds. Deterministic and data-driven; the hub formats it for display.
 */
export function estimateRemainingTime(
  progress: RoboticsProgress,
  curriculum: RoboticsCurriculum = roboticsCurriculum,
): RoboticsRemainingTime {
  const incomplete = curriculum.modules.filter((m) => !progress.completed.includes(m.id))
  let low = 0
  let high = 0
  for (const m of incomplete) {
    const nums = (m.estimatedTime.match(/\d+/g) ?? []).map(Number)
    if (nums.length >= 2) {
      low += nums[0]
      high += nums[1]
    } else if (nums.length === 1) {
      low += nums[0]
      high += nums[0]
    }
  }
  return { weeksLeft: incomplete.length, lowMinutes: low, highMinutes: high }
}

/** True once the student has any saved progress at all. */
export function hasAnyProgress(progress: RoboticsProgress): boolean {
  return (
    progress.completed.length > 0 ||
    progress.started.length > 0 ||
    progress.lastVisited !== null ||
    progress.equipmentPath !== null ||
    Object.keys(progress.knowledgeChecks).length > 0 ||
    Object.keys(progress.savedPrograms).length > 0 ||
    Object.keys(progress.journal).length > 0
  )
}

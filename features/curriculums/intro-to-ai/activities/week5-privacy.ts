/**
 * Week 5 — Privacy & Data Minimization Lab engine (framework-free, deterministic).
 *
 * For each fictional app scenario and each possible data field, an authored answer
 * key gives the recommended classification plus guidance: why the data may or may
 * not be needed, a safer alternative, whether consent is needed, how long to keep
 * it, and whether on-device processing could reduce risk. No real data is
 * collected; students only classify built-in fields. Privacy here is about
 * collecting the minimum necessary — not just passwords.
 */

import { translations, type Translations } from "../../../../i18n/translations.ts"

/**
 * The Week 5 privacy wording. Scenario ids, field ids and classification ids stay
 * English because the answer key and the student's saved choices key on them.
 */
export type Week5PrivacyStrings = Translations["courseUi"]["ai"]["week5Privacy"]

const EN: Week5PrivacyStrings = translations.en.courseUi.ai.week5Privacy

export type Classification = "required" | "helpful" | "unnecessary" | "too-sensitive"

export const classifications = (S: Week5PrivacyStrings = EN): { id: Classification; label: string }[] => [
  { id: "required", label: S.classifications.required },
  { id: "helpful", label: S.classifications.helpful },
  { id: "unnecessary", label: S.classifications.unnecessary },
  { id: "too-sensitive", label: S.classifications["too-sensitive"] },
]

/** The English base, for code that only needs the ids and their order. */
export const CLASSIFICATIONS = classifications()

export type Scenario = { id: string; name: string; purpose: string }

const SCENARIO_IDS = ["books", "events", "recycling", "study", "museum"] as const

export const scenarios = (S: Week5PrivacyStrings = EN): Scenario[] =>
  SCENARIO_IDS.map((id) => ({
    id,
    name: (S.scenarioNames as Record<string, string>)[id],
    purpose: (S.scenarioPurposes as Record<string, string>)[id],
  }))

/** The English base, for code that only needs the ids. */
export const SCENARIOS: Scenario[] = scenarios()

export type DataField = { id: string; label: string }

const FIELD_IDS = [
  "firstName", "exactBirthday", "ageRange", "schoolName", "exactLocation",
  "broadRegion", "voiceRecording", "photo", "favoriteSubject",
  "anonymousChoices", "deviceId", "contactList", "accessibilityPref",
] as const

export const fields = (S: Week5PrivacyStrings = EN): DataField[] =>
  FIELD_IDS.map((id) => ({ id, label: (S.fieldLabels as Record<string, string>)[id] }))

/** The English base, for code that only needs the ids and their order. */
export const FIELDS: DataField[] = fields()

export type FieldGuidance = {
  classification: Classification
  why: string
  saferAlternative: string
  consentNeeded: boolean
  retention: string
  localProcessing: boolean
}

/** Default guidance for a field when a scenario doesn't override it. */
type GuidanceShape = Omit<FieldGuidance, "why" | "saferAlternative" | "retention">

/** The machine-readable half of the answer key; the prose comes from the strings. */
const DEFAULTS: Record<string, GuidanceShape> = {
  firstName: { classification: "helpful", consentNeeded: false, localProcessing: true },
  exactBirthday: { classification: "too-sensitive", consentNeeded: true, localProcessing: true },
  ageRange: { classification: "helpful", consentNeeded: false, localProcessing: true },
  schoolName: { classification: "unnecessary", consentNeeded: true, localProcessing: true },
  exactLocation: { classification: "too-sensitive", consentNeeded: true, localProcessing: true },
  broadRegion: { classification: "helpful", consentNeeded: false, localProcessing: true },
  voiceRecording: { classification: "too-sensitive", consentNeeded: true, localProcessing: true },
  photo: { classification: "too-sensitive", consentNeeded: true, localProcessing: true },
  favoriteSubject: { classification: "helpful", consentNeeded: false, localProcessing: true },
  anonymousChoices: { classification: "helpful", consentNeeded: false, localProcessing: true },
  deviceId: { classification: "unnecessary", consentNeeded: true, localProcessing: true },
  contactList: { classification: "too-sensitive", consentNeeded: true, localProcessing: true },
  accessibilityPref: { classification: "helpful", consentNeeded: false, localProcessing: true },
}

/** Per-scenario overrides where a field's role genuinely changes. */
const OVERRIDES: Record<string, Record<string, Classification>> = {
  books: { favoriteSubject: "required", anonymousChoices: "required" },
  events: { broadRegion: "helpful", ageRange: "helpful" },
  recycling: { broadRegion: "helpful", favoriteSubject: "unnecessary" },
  study: { favoriteSubject: "helpful", anonymousChoices: "required" },
  museum: { broadRegion: "helpful", accessibilityPref: "helpful" },
}

export function guidanceFor(scenarioId: string, fieldId: string, S: Week5PrivacyStrings = EN): FieldGuidance {
  const base = DEFAULTS[fieldId]
  const overrideClass = OVERRIDES[scenarioId]?.[fieldId]
  const overrideWhy = (S.overrideWhy as Record<string, string>)[`${scenarioId}.${fieldId}`]
  return {
    ...base,
    classification: overrideClass ?? base.classification,
    why: overrideWhy ?? (S.why as Record<string, string>)[fieldId],
    saferAlternative: (S.saferAlternative as Record<string, string>)[fieldId],
    retention: (S.retention as Record<string, string>)[fieldId],
  }
}

export type ChoiceEvaluation = { matches: boolean; recommended: Classification; guidance: FieldGuidance }

/** Compares a student's classification to the recommended one and returns guidance. */
export function evaluateChoice(scenarioId: string, fieldId: string, choice: Classification, S: Week5PrivacyStrings = EN): ChoiceEvaluation {
  const guidance = guidanceFor(scenarioId, fieldId, S)
  return { matches: choice === guidance.classification, recommended: guidance.classification, guidance }
}

/** Summary of how many of a scenario's fields the student classified sensibly. */
export function scoreScenario(scenarioId: string, choices: Record<string, Classification>): { matched: number; total: number; unnecessaryOrSensitiveKept: number } {
  let matched = 0
  let unnecessaryOrSensitiveKept = 0
  for (const field of FIELDS) {
    const rec = guidanceFor(scenarioId, field.id).classification
    const choice = choices[field.id]
    if (choice === rec) matched++
    // A "collect it" answer (required/helpful) for data that should not be collected.
    if ((choice === "required" || choice === "helpful") && (rec === "unnecessary" || rec === "too-sensitive")) unnecessaryOrSensitiveKept++
  }
  return { matched, total: FIELDS.length, unnecessaryOrSensitiveKept }
}

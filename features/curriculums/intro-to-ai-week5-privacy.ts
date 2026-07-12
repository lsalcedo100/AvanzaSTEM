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

export type Classification = "required" | "helpful" | "unnecessary" | "too-sensitive"

export const CLASSIFICATIONS: { id: Classification; label: string }[] = [
  { id: "required", label: "Required" },
  { id: "helpful", label: "Helpful but optional" },
  { id: "unnecessary", label: "Unnecessary" },
  { id: "too-sensitive", label: "Too sensitive for this purpose" },
]

export type Scenario = { id: string; name: string; purpose: string }

export const SCENARIOS: Scenario[] = [
  { id: "books", name: "Book recommender", purpose: "Suggests books a student might enjoy." },
  { id: "events", name: "School-event reminder", purpose: "Reminds students about upcoming school events." },
  { id: "recycling", name: "Recycling helper", purpose: "Explains which bin common items go in." },
  { id: "study", name: "Study-planning tool", purpose: "Helps a student plan homework time." },
  { id: "museum", name: "Museum guide", purpose: "Guides a visitor around museum exhibits." },
]

export type DataField = { id: string; label: string }

export const FIELDS: DataField[] = [
  { id: "firstName", label: "First name" },
  { id: "exactBirthday", label: "Exact birthday" },
  { id: "ageRange", label: "Age range" },
  { id: "schoolName", label: "School name" },
  { id: "exactLocation", label: "Exact location" },
  { id: "broadRegion", label: "Broad region (city/area)" },
  { id: "voiceRecording", label: "Voice recording" },
  { id: "photo", label: "Photo" },
  { id: "favoriteSubject", label: "Favorite subject" },
  { id: "anonymousChoices", label: "Anonymous activity choices" },
  { id: "deviceId", label: "Device identifier" },
  { id: "contactList", label: "Contact list" },
  { id: "accessibilityPref", label: "Accessibility preference" },
]

export type FieldGuidance = {
  classification: Classification
  why: string
  saferAlternative: string
  consentNeeded: boolean
  retention: string
  localProcessing: boolean
}

/** Default guidance for a field when a scenario doesn't override it. */
const DEFAULTS: Record<string, FieldGuidance> = {
  firstName: { classification: "helpful", why: "A first name can make the app friendlier, but it isn't required to work.", saferAlternative: "Let the student pick a nickname, or skip it.", consentNeeded: false, retention: "Only for this session, or until the student deletes it.", localProcessing: true },
  exactBirthday: { classification: "too-sensitive", why: "An exact birthday is personal and usually more than an app needs.", saferAlternative: "Ask for an age range instead.", consentNeeded: true, retention: "Should not be stored at all.", localProcessing: true },
  ageRange: { classification: "helpful", why: "An age range can tailor content to be age-appropriate without identifying anyone.", saferAlternative: "Use broad bands (e.g., 8–10) rather than an exact age.", consentNeeded: false, retention: "Kept only while needed, then discarded.", localProcessing: true },
  schoolName: { classification: "unnecessary", why: "A school name can help identify a specific child and usually isn't needed.", saferAlternative: "Skip it, or use a broad region instead.", consentNeeded: true, retention: "Should not be stored.", localProcessing: true },
  exactLocation: { classification: "too-sensitive", why: "Exact location can reveal where a child is — rarely necessary and risky.", saferAlternative: "Ask for a broad region only if truly needed.", consentNeeded: true, retention: "Should not be stored.", localProcessing: true },
  broadRegion: { classification: "helpful", why: "A broad region (city or area) can localize content without pinpointing anyone.", saferAlternative: "Let the student type a nearby city rather than share GPS.", consentNeeded: false, retention: "Kept only while needed.", localProcessing: true },
  voiceRecording: { classification: "too-sensitive", why: "A voice recording is biometric and personal; it should never be collected without a real need and clear consent.", saferAlternative: "Use typed input instead of voice.", consentNeeded: true, retention: "Should not be stored; process and discard.", localProcessing: true },
  photo: { classification: "too-sensitive", why: "A photo can identify a child and is rarely necessary.", saferAlternative: "Use an avatar or no image at all.", consentNeeded: true, retention: "Should not be stored.", localProcessing: true },
  favoriteSubject: { classification: "helpful", why: "A favorite subject can improve suggestions and isn't sensitive.", saferAlternative: "Make it optional and easy to change.", consentNeeded: false, retention: "Kept only while needed.", localProcessing: true },
  anonymousChoices: { classification: "helpful", why: "Anonymous choices (what a student clicked) can power recommendations without identifying anyone.", saferAlternative: "Keep them on the device, not tied to a name.", consentNeeded: false, retention: "Kept locally only.", localProcessing: true },
  deviceId: { classification: "unnecessary", why: "A device identifier can be used to track people across apps and usually isn't needed.", saferAlternative: "Don't collect it; use a random per-session id if you must.", consentNeeded: true, retention: "Should not be stored.", localProcessing: true },
  contactList: { classification: "too-sensitive", why: "A contact list exposes other people who never agreed — almost never appropriate.", saferAlternative: "Never request it; let users share a link manually.", consentNeeded: true, retention: "Should not be collected.", localProcessing: true },
  accessibilityPref: { classification: "helpful", why: "An accessibility preference (like larger text) improves the experience and isn't identifying.", saferAlternative: "Store it as a simple setting on the device.", consentNeeded: false, retention: "Kept locally as a setting.", localProcessing: true },
}

/** Per-scenario overrides where a field's role genuinely changes. */
const OVERRIDES: Record<string, Record<string, Partial<FieldGuidance>>> = {
  books: {
    favoriteSubject: { classification: "required", why: "For a book recommender, a favorite subject is the main signal it needs." },
    anonymousChoices: { classification: "required", why: "The books a student liked or skipped are what the recommender learns from." },
  },
  events: {
    broadRegion: { classification: "helpful", why: "A broad region can help show the right campus's events." },
    ageRange: { classification: "helpful", why: "An age range can filter events to the right grade." },
  },
  recycling: {
    broadRegion: { classification: "helpful", why: "Recycling rules differ by area, so a broad region can localize the guidance." },
    favoriteSubject: { classification: "unnecessary", why: "A recycling helper has no use for a favorite subject." },
  },
  study: {
    favoriteSubject: { classification: "helpful", why: "Knowing subjects can help a study planner organize tasks." },
    anonymousChoices: { classification: "required", why: "The planner needs the student's own task list to make a plan." },
  },
  museum: {
    broadRegion: { classification: "helpful", why: "A broad region can pick the nearest museum." },
    accessibilityPref: { classification: "helpful", why: "Accessibility preferences help route a visitor (e.g., step-free paths)." },
  },
}

export function guidanceFor(scenarioId: string, fieldId: string): FieldGuidance {
  const base = DEFAULTS[fieldId]
  const override = OVERRIDES[scenarioId]?.[fieldId]
  return override ? { ...base, ...override } : base
}

export type ChoiceEvaluation = { matches: boolean; recommended: Classification; guidance: FieldGuidance }

/** Compares a student's classification to the recommended one and returns guidance. */
export function evaluateChoice(scenarioId: string, fieldId: string, choice: Classification): ChoiceEvaluation {
  const guidance = guidanceFor(scenarioId, fieldId)
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

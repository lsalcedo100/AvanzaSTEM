import { getEngineeringFundamentalsCurriculum } from "./engineering-fundamentals/i18n.ts"
import { getIntroToAiCourse } from "./intro-to-ai/i18n.ts"
import { getIntroToPythonCurriculum } from "./intro-to-python/i18n.ts"
import { getMathAdventuresCurriculum } from "./math-adventures/i18n.ts"
import { getRoboticsCurriculum } from "./robotics/i18n.ts"
import { getScienceExperimentsCurriculum } from "./science-experiments/i18n.ts"
import { VALID_LANGUAGES, type Language } from "../../i18n/translations.ts"

/**
 * Translation coverage for the six courses.
 *
 * The overlays in `features/curriculums/*-i18n.ts` are sparse on purpose, so
 * "is this course translated?" is not a yes/no question - it is a count. This
 * walks the resolved curriculum for a language beside the English base and
 * reports which leaf strings still match English, i.e. fell through untranslated.
 *
 * Run it with:  npx tsx features/curriculums/i18n-coverage.ts
 */

/**
 * Keys whose values are identifiers, not prose: route slugs, diagram names,
 * accent colours, stable progress ids. These are shared with English by design,
 * so matching English is correct rather than a gap.
 */
const IDENTIFIER_KEYS = new Set([
  "slug",
  "href",
  "id",
  "diagram",
  "accent",
  "kind",
  "type",
  "variant",
  "icon",
  "image",
  "src",
  "videoId",
  "specId",
  "missionId",
  "promptId",
  "checkId",
  "lessonIds",
  "code",
  "language",
  // Prev/next navigation between lessons stores route slugs, which are
  // language-independent for the same reason `slug` itself is.
  "nextLessonSlug",
  "previousLessonSlug",
  // Widget enums in the math activities' `sampleData`/`activityConfig`. Those
  // two fields are typed `unknown`, so `DeepPartial` cannot narrow them the way
  // it narrows a string-literal union - nothing would stop an overlay from
  // translating "subtract" or "thousands" and silently breaking the widget that
  // switches on it. Listing the keys here keeps them out of the report.
  // `ActivityStatus` ("briefing" | "interactive") picks which activity shell to
  // render, exactly like the neighbouring `kind`.
  "status",
  "operation",
  "heroes",
  "allowedRuleTypes",
  "places",
  "maxPlace",
  "quantity",
  "views",
  "currency",
  // Robotics and Intro to AI string-literal unions. `DeepPartial` already stops
  // an overlay from translating these (the compiler narrows them to their own
  // literals), so listing them here only keeps the report honest.
  "severity",
  "captures",
  "bugType",
  "category",
  "sectionKind",
  "expectedBlocks",
  "paths",
  "pathId",
])

/**
 * Syntax tokens from the languages taught in these courses. They are typed
 * verbatim regardless of the student's spoken language, so a locale overlay
 * that repeats the English spelling is correct, not a missing translation.
 *
 * Only reserved words and syntax names belong here. Ordinary words that happen
 * to be spelled the same in another language (a Spanish "variable", a
 * Portuguese "item") are deliberately left out, so a human still reviews them.
 */
const RESERVED_WORDS = new Set([
  // Python keywords longer than the 3-character floor above.
  "elif",
  "else",
  "None",
  "True",
  "False",
  "assert",
  "async",
  "await",
  "break",
  "class",
  "continue",
  "except",
  "finally",
  "from",
  "global",
  "import",
  "lambda",
  "nonlocal",
  "pass",
  "raise",
  "return",
  "while",
  "with",
  "yield",
  // Python syntax features referred to by name in the vocabulary lists.
  "f-string",
].map((word) => word.toLowerCase()))

/**
 * Paths whose leaf is a stored key rather than prose. `rubric[].levels[].label`
 * is typed `"Beginning" | "Developing" | "Proficient" | "Exemplary"` and is what
 * a saved self-evaluation is keyed on, so `DeepPartial` refuses to translate it
 * and an overlay must not try. The student never reads these: the robotics final
 * project renders them through `t.courseUi.rubricLevels`, and the Intro to AI
 * rubric is only validated, never displayed.
 */
const IDENTIFIER_PATHS = [/(^|\.)rubric\[\d+\]\.levels\[\d+\]\.label$/]

/**
 * Metric units, spelled the same in every language we ship. Longest first so the
 * alternation below prefers "cm" and "km" over a bare "m".
 */
const METRIC_UNITS = "mm|cm|km|kg|ml|m|g|l"

/**
 * A worked answer written as notation rather than a sentence: "348 < 384",
 * "407 = 400 + 0 + 7", "$25 - $18 = $7", "3 cm (30 - 27 = 3).". The digits and
 * operators carry the whole meaning, so repeating them is correct. Anything with
 * a word in it fails this test and is still reported.
 */
const MATH_NOTATION = new RegExp(
  `^(?:[\\d\\s.,:;/×x%°+\\-<>=$()]|\\b(?:${METRIC_UNITS})\\b)+$`,
  "i",
)

/**
 * Cognates and loanwords that are genuinely the right word in the target
 * language, reviewed one at a time on 2026-08-29 against the surrounding
 * overlay prose. `pt` "Face", for instance, sits beside a Portuguese definition
 * the overlay author wrote deliberately; `es` "variable" and `pt` "string" are
 * the words those courses actually use.
 *
 * Keep this list exact and per-language, never a shared set: "Color" is right in
 * Spanish and wrong in Portuguese ("Cor"), and every entry here is a gap the
 * report will stop showing, so it should only grow after a human has looked.
 */
const REVIEWED_COGNATES: Partial<Record<Language, Set<string>>> = {
  es: new Set([
    "Color",
    "Deepfake",
    "Drones",
    "Motor",
    "Robot",
    "Sensor",
    "Variable",
    "error",
    "plan",
    "variable",
  ]),
  pt: new Set([
    "Banana",
    "Deepfake",
    "Drones",
    "Face",
    "Imagine",
    "Item",
    "Motor",
    "Observe",
    "Pixel",
    "Sensor",
    "Torque",
    "item",
    "prompt",
    "string",
  ]),
  zh: new Set([]),
}

/**
 * Values that are the same word in every language we ship, or are not really
 * text at all: numerals, measurements, code identifiers, and single symbols.
 * Counting these as untranslated would bury the real gaps in noise.
 */
function isLanguageNeutral(value: string): boolean {
  const trimmed = value.trim()
  if (trimmed.length <= 3) return true
  // Pure numbers, measurements, ranges: "45-60", "2 cm", "1/2", "100%", and
  // worked answers written as notation: "348 < 384", "$25 - $18 = $7".
  if (MATH_NOTATION.test(trimmed)) return true
  // Looks like code or a path rather than a sentence. The dotted form catches
  // attribute calls such as "random.choice()" and "str.upper()".
  if (/^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)*\(|^\//.test(trimmed)) return true
  if (/^https?:/.test(trimmed)) return true
  // A hyphenated lowercase token is a machine identifier, not a sentence:
  // material and question ids ("w3-m1", "w1l2-kc-q2-i1"), simulator block names
  // ("move-forward"), lesson section kinds ("knowledge-check"). These are keyed
  // on by name or looked up across files, so an overlay must leave them alone.
  // Real prose in these courses always contains a space.
  if (/^[a-z0-9]+(-[a-z0-9]+)+$/.test(trimmed)) return true
  // Reserved words of a language we teach. These are syntax, not prose: a
  // Spanish student still types `elif`, so an overlay repeating the English
  // spelling is correct rather than missing.
  if (RESERVED_WORDS.has(trimmed.toLowerCase())) return true
  return false
}

export type CoverageGap = { path: string; value: string }

export type CoverageReport = {
  course: string
  language: Language
  totalStrings: number
  translated: number
  gaps: CoverageGap[]
}

function walk(
  base: unknown,
  localized: unknown,
  path: string,
  counters: { total: number; translated: number },
  gaps: CoverageGap[],
  language: Language,
): void {
  if (typeof base === "string") {
    if (isLanguageNeutral(base)) return
    if (REVIEWED_COGNATES[language]?.has(base.trim())) return
    counters.total += 1
    if (base === localized) {
      gaps.push({ path, value: base.length > 60 ? `${base.slice(0, 60)}...` : base })
    } else {
      counters.translated += 1
    }
    return
  }
  if (Array.isArray(base)) {
    base.forEach((entry, index) => {
      walk(
        entry,
        (localized as unknown[] | undefined)?.[index],
        `${path}[${index}]`,
        counters,
        gaps,
        language,
      )
    })
    return
  }
  if (base && typeof base === "object") {
    for (const key of Object.keys(base as Record<string, unknown>)) {
      if (IDENTIFIER_KEYS.has(key)) continue
      const childPath = path ? `${path}.${key}` : key
      if (IDENTIFIER_PATHS.some((pattern) => pattern.test(childPath))) continue
      walk(
        (base as Record<string, unknown>)[key],
        (localized as Record<string, unknown> | undefined)?.[key],
        childPath,
        counters,
        gaps,
        language,
      )
    }
  }
}

const COURSES: { name: string; resolve: (language: Language) => unknown }[] = [
  { name: "science-experiments", resolve: getScienceExperimentsCurriculum },
  { name: "engineering-fundamentals", resolve: getEngineeringFundamentalsCurriculum },
  { name: "math-adventures", resolve: getMathAdventuresCurriculum },
  { name: "intro-to-python", resolve: getIntroToPythonCurriculum },
  { name: "robotics", resolve: getRoboticsCurriculum },
  { name: "intro-to-ai", resolve: getIntroToAiCourse },
]

/** Coverage for one course in one language. */
export function courseCoverage(
  course: { name: string; resolve: (language: Language) => unknown },
  language: Language,
): CoverageReport {
  const counters = { total: 0, translated: 0 }
  const gaps: CoverageGap[] = []
  walk(course.resolve("en"), course.resolve(language), "", counters, gaps, language)
  return {
    course: course.name,
    language,
    totalStrings: counters.total,
    translated: counters.translated,
    gaps,
  }
}

/** Coverage for every course in every non-English language. */
export function allCoverage(): CoverageReport[] {
  const languages = VALID_LANGUAGES.filter((language) => language !== "en")
  return COURSES.flatMap((course) => languages.map((language) => courseCoverage(course, language)))
}

function main(): void {
  const reports = allCoverage()
  const showGaps = process.argv.includes("--gaps")
  let lastCourse = ""

  for (const report of reports) {
    if (report.course !== lastCourse) {
      process.stdout.write(`\n${report.course}\n`)
      lastCourse = report.course
    }
    const percent =
      report.totalStrings === 0
        ? 100
        : Math.round((report.translated / report.totalStrings) * 100)
    process.stdout.write(
      `  ${report.language}  ${String(percent).padStart(3)}%  ` +
        `${report.translated}/${report.totalStrings} strings\n`,
    )
    if (showGaps) {
      for (const gap of report.gaps.slice(0, 20)) {
        process.stdout.write(`      - ${gap.path}: ${gap.value}\n`)
      }
      if (report.gaps.length > 20) {
        process.stdout.write(`      ... and ${report.gaps.length - 20} more\n`)
      }
    }
  }

  const totals = reports.reduce(
    (acc, report) => ({
      translated: acc.translated + report.translated,
      total: acc.total + report.totalStrings,
    }),
    { translated: 0, total: 0 },
  )
  const overall = Math.round((totals.translated / totals.total) * 100)
  process.stdout.write(
    `\noverall: ${overall}%  ${totals.translated}/${totals.total} strings across all courses and languages\n`,
  )
}

if (process.argv[1]?.endsWith("i18n-coverage.ts")) {
  main()
}

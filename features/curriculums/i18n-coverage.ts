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
 * Values that are the same word in every language we ship, or are not really
 * text at all: numerals, measurements, code identifiers, and single symbols.
 * Counting these as untranslated would bury the real gaps in noise.
 */
function isLanguageNeutral(value: string): boolean {
  const trimmed = value.trim()
  if (trimmed.length <= 3) return true
  // Pure numbers, measurements, ranges: "45-60", "2 cm", "1/2", "100%".
  if (/^[\d\s.,:/×x%°+-]+$/.test(trimmed)) return true
  // Looks like code or a path rather than a sentence. The dotted form catches
  // attribute calls such as "random.choice()" and "str.upper()".
  if (/^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)*\(|^\//.test(trimmed)) return true
  if (/^https?:/.test(trimmed)) return true
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
): void {
  if (typeof base === "string") {
    if (isLanguageNeutral(base)) return
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
      walk(entry, (localized as unknown[] | undefined)?.[index], `${path}[${index}]`, counters, gaps)
    })
    return
  }
  if (base && typeof base === "object") {
    for (const key of Object.keys(base as Record<string, unknown>)) {
      if (IDENTIFIER_KEYS.has(key)) continue
      walk(
        (base as Record<string, unknown>)[key],
        (localized as Record<string, unknown> | undefined)?.[key],
        path ? `${path}.${key}` : key,
        counters,
        gaps,
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
  walk(course.resolve("en"), course.resolve(language), "", counters, gaps)
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

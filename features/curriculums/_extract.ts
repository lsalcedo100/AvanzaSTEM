// Temporary tooling: dump every translatable leaf string of a course as a flat
// {path: english} JSON, using the same walk rules as i18n-coverage.
import { writeFileSync } from "node:fs"
import { getEngineeringFundamentalsCurriculum } from "./engineering-fundamentals/i18n.ts"
import { getIntroToAiCourse } from "./intro-to-ai/i18n.ts"
import { getMathAdventuresCurriculum } from "./math-adventures/i18n.ts"
import { getRoboticsCurriculum } from "./robotics/i18n.ts"

const IDENTIFIER_KEYS = new Set(["slug","href","id","diagram","accent","kind","type","variant","icon","image","src","videoId","specId","missionId","promptId","checkId","lessonIds","code","language","status","severity","captures","bugType","category","sectionKind","expectedBlocks","paths","pathId","nextLessonSlug","previousLessonSlug","operation","heroes","allowedRuleTypes","places","maxPlace","quantity","views","currency"])
const RESERVED = new Set(["elif","else","none","true","false","assert","async","await","break","class","continue","except","finally","from","global","import","lambda","nonlocal","pass","raise","return","while","with","yield","f-string"])
function neutral(v: string): boolean {
  const t = v.trim()
  if (t.length <= 3) return true
  if (/^[\d\s.,:/×x%°+-]+$/.test(t)) return true
  if (/^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)*\(|^\//.test(t)) return true
  if (/^https?:/.test(t)) return true
  if (/^[a-z0-9]+(-[a-z0-9]+)+$/.test(t)) return true
  if (RESERVED.has(t.toLowerCase())) return true
  return false
}
const out: Record<string, string> = {}
function walk(base: unknown, path: string): void {
  if (typeof base === "string") { if (!neutral(base)) out[path] = base; return }
  if (Array.isArray(base)) { base.forEach((e, i) => walk(e, `${path}[${i}]`)); return }
  if (base && typeof base === "object") {
    for (const k of Object.keys(base as Record<string, unknown>)) {
      if (IDENTIFIER_KEYS.has(k)) continue
      walk((base as Record<string, unknown>)[k], path ? `${path}.${k}` : k)
    }
  }
}
const COURSES: Record<string, () => unknown> = {
  "engineering-fundamentals": () => getEngineeringFundamentalsCurriculum("en"),
  "math-adventures": () => getMathAdventuresCurriculum("en"),
  "robotics": () => getRoboticsCurriculum("en"),
  "intro-to-ai": () => getIntroToAiCourse("en"),
}
const name = process.argv[2]
walk(COURSES[name](), "")
writeFileSync(process.argv[3], JSON.stringify(out, null, 1))
const chars = Object.values(out).reduce((a, b) => a + b.length, 0)
console.log(`${name}: ${Object.keys(out).length} strings, ${chars} chars`)

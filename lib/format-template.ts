/**
 * Fills `{name}` placeholders in a translated string.
 *
 * Course UI copy has to interpolate week numbers and counts ("Week 3 of 6",
 * "2 of 6 completed"), and word order for those differs by language - Chinese
 * puts the ordinal marker on the other side of the number. Keeping the whole
 * sentence in the translation file with named holes lets each locale place the
 * numbers wherever its grammar wants them.
 *
 * An unknown placeholder is left visible rather than silently blanked, so a
 * typo in a translation shows up as `{tota}` in review instead of a gap.
 */
export function formatTemplate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  )
}

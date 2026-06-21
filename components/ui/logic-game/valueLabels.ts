export function onOffLabel(value: number): string {
  if (value === 1) return "On"
  if (value === 0) return "Off"
  return "?"
}

export function compactSignalList(values: number[]): string {
  return values.map(onOffLabel).join(", ")
}

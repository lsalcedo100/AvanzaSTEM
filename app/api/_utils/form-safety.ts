export function isHoneypotFilled(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
}

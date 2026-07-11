import { type EngineeringMaterialProperty } from "@/features/curriculums/engineering-fundamentals"

/**
 * A plain material comparison table: each material paired with a kid-friendly
 * note on how it behaves, so students can reason about which material fits which
 * job. No icons or ratings - just clear language, like a reference sheet.
 * Renders as a two-column table on wider screens and a stacked list on mobile.
 */
export function EngineeringMaterialComparison({
  materials,
}: {
  materials: EngineeringMaterialProperty[]
}) {
  if (materials.length === 0) return null

  return (
    <div className="overflow-hidden rounded-md border border-border">
      <dl className="divide-y divide-border">
        {materials.map((material) => (
          <div key={material.name} className="grid gap-1 px-4 py-3 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="text-sm font-semibold text-foreground">{material.name}</dt>
            <dd className="text-sm leading-relaxed text-muted-foreground">{material.property}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

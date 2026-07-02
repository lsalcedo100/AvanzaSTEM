"use client"

import { explainRow, type RowResult } from "./gates"
import { formatLogicText, type LogicGameCopy } from "./copy"
import type { GateType, Level } from "./types"

function inputValueText(level: Level, value: number, copy: LogicGameCopy): string {
  if (value === 1) return level.truthTable.inputOnText ?? copy.yes
  if (value === 0) return level.truthTable.inputOffText ?? copy.no
  return copy.notSure
}

function outputValueText(level: Level, outputName: string, value: number, copy: LogicGameCopy): string {
  const outputText = level.truthTable.outputs.find((o) => o.name === outputName)
  if (value === 1) return outputText?.onText ?? copy.yes
  if (value === 0) return outputText?.offText ?? copy.no
  return "-"
}

function outputColumnLabel(level: Level, outputName: string, index: number, copy: LogicGameCopy): string {
  return level.truthTable.outputs.find((o) => o.name === outputName)?.label ?? formatLogicText(copy.output, { number: index + 1 })
}

export function TruthTable({
  level,
  selections,
  results,
  allSelected,
  copy,
}: {
  level: Level
  selections: Record<string, GateType | undefined>
  results: RowResult[]
  allSelected: boolean
  copy: LogicGameCopy
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white/85">
        {copy.truthTable}
      </div>

      <p className="text-xs leading-relaxed text-white/60">
        {level.truthTable.helperText}
      </p>

      <div className="overflow-x-auto rounded-2xl bg-white/5 ring-1 ring-white/10">
        <table className="w-full min-w-[560px] text-xs sm:text-sm">
          <thead className="bg-white/5 text-[10px] uppercase tracking-wider text-white/60">
            <tr>
              {level.inputs.map((n, i) => (
                <th key={n} className="px-3 py-2 text-center font-extrabold">
                  {level.truthTable.inputNames[n] ?? `Input ${i + 1}`}
                </th>
              ))}
              {level.outputs.map((o, i) => (
                <th key={`target-${o.name}`} className="px-3 py-2 text-center font-extrabold">
                  {copy.targetColumn}
                  {level.outputs.length > 1 ? (
                    <span className="block pt-0.5 normal-case tracking-normal text-white/45">
                      {outputColumnLabel(level, o.name, i, copy)}
                    </span>
                  ) : null}
                </th>
              ))}
              {level.outputs.map((o, i) => (
                <th key={`got-${o.name}`} className="px-3 py-2 text-center font-extrabold">
                  {copy.circuitColumn}
                  {level.outputs.length > 1 ? (
                    <span className="block pt-0.5 normal-case tracking-normal text-white/45">
                      {outputColumnLabel(level, o.name, i, copy)}
                    </span>
                  ) : null}
                </th>
              ))}
              <th className="px-3 py-2 text-center font-extrabold">{copy.result}</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, i) => (
              <tr key={i} className="border-t border-white/5">
                {res.row.inputs.map((v, j) => (
                  <td key={j} className="px-3 py-2 font-bold text-white/80 text-center">
                    {inputValueText(level, v, copy)}
                  </td>
                ))}
                {res.row.outputs.map((v, j) => (
                  <td key={j} className="px-3 py-2 text-white/80 text-center">
                    {outputValueText(level, level.outputs[j]?.name ?? "", v, copy)}
                  </td>
                ))}
                {res.got.map((v, j) => (
                  <td key={j} className="px-3 py-2 text-white/80 text-center">
                    {outputValueText(level, level.outputs[j]?.name ?? "", v, copy)}
                  </td>
                ))}
                <td className="px-3 py-2 text-center">
                  {allSelected ? (
                    res.matches ? (
                      <span className="inline-flex items-center gap-1 font-extrabold text-avanza-green">
                        {copy.correct}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-extrabold text-avanza-orange">
                        {copy.tryAgain}
                      </span>
                    )
                  ) : (
                    <span className="font-bold text-white/35">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {allSelected && (
        <ul className="flex flex-col gap-1.5 text-xs leading-relaxed text-white/70">
          {results
            .filter((r) => !r.matches)
            .slice(0, 3)
            .map((r, i) => (
              <li key={i} className="rounded-lg bg-avanza-orange/10 px-3 py-2 text-avanza-orange">
                {explainRow(level, selections, r, copy)}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

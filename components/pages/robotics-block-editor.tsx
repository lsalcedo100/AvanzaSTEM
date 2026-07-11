"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { useRoboticsProgress } from "@/components/ui/useRoboticsProgress"
import { useReducedMotion } from "@/components/ui/useReducedMotion"
import {
  ExecutionLimitError,
  canRun,
  execute,
  readSensors,
  validateProgram,
  type BoolExpr,
  type ExecEvent,
  type NumberExpr,
  type Program,
  type RobotState,
  type RobotWorld,
  type Statement,
} from "@/features/curriculums/robotics-program"
import {
  getMission,
  type MissionKind,
} from "@/features/curriculums/robotics-missions"
import {
  buildResultRecord,
  describeState,
  describeWorld,
  runMission,
  type MissionRunOutcome,
} from "@/features/curriculums/robotics-sim"

/* -------------------------------------------------------------------------- */
/* Shared class vocabulary (matches the sibling robotics components)          */
/* -------------------------------------------------------------------------- */

const greenButton =
  "inline-flex items-center justify-center rounded-md bg-avanza-green px-4 py-2 text-sm font-bold text-avanza-dark transition-colors hover:bg-avanza-green-dark hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

const outlineButton =
  "inline-flex items-center justify-center rounded-md border border-border px-3 py-2 text-sm font-semibold text-avanza-green-dark transition-colors hover:border-avanza-green hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

const iconButton =
  "inline-flex h-7 w-7 flex-none items-center justify-center rounded-md border border-border text-xs font-semibold text-foreground transition-colors hover:border-avanza-green/60 hover:bg-avanza-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40"

const numberInput =
  "w-16 rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"

const selectInput =
  "rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"

/* -------------------------------------------------------------------------- */
/* Block metadata                                                             */
/* -------------------------------------------------------------------------- */

export type StatementType = Statement["type"]

/** Short, grade-4-6 friendly one-line help for each block. */
const BLOCK_INFO: Record<StatementType, { label: string; help: string }> = {
  move: { label: "Move", help: "Move forward — drive ahead one or more cells." },
  turn: { label: "Turn", help: "Turn left or right by a number of degrees." },
  setSpeed: { label: "Set speed", help: "Set how fast the motors spin (0–100)." },
  stopMotors: { label: "Stop motors", help: "Stop the motors but keep the program going." },
  moveForDuration: { label: "Drive for a time", help: "Drive for a number of milliseconds." },
  wait: { label: "Wait", help: "Pause for a number of milliseconds." },
  safeStop: { label: "Safe stop", help: "Stop safely and end the program." },
  missionComplete: { label: "Mission complete", help: "Signal that the mission is done and stop." },
  log: { label: "Log a value", help: "Write a number to the output log." },
  repeat: { label: "Repeat", help: "Do the blocks inside a set number of times." },
  forever: { label: "Forever", help: "Do the blocks inside over and over (needs a safe stop)." },
  repeatUntil: { label: "Repeat until", help: "Repeat the blocks inside until something is true." },
  waitUntil: { label: "Wait until", help: "Pause until something is true." },
  if: { label: "If", help: "Do the blocks inside only if something is true." },
  ifElse: { label: "If / else", help: "Do one set of blocks if true, another if false." },
  setVar: { label: "Set variable", help: "Set a variable to a value." },
  changeVar: { label: "Change variable", help: "Add a value to a variable (counting)." },
  resetCounter: { label: "Reset counter", help: "Set a counter back to zero." },
}

/** Palette categories, in teaching order. */
const PALETTE: { heading: string; blocks: StatementType[] }[] = [
  { heading: "Events & execution", blocks: ["wait", "safeStop", "missionComplete"] },
  { heading: "Movement", blocks: ["move", "turn", "setSpeed", "stopMotors", "moveForDuration"] },
  { heading: "Control", blocks: ["repeat", "forever", "repeatUntil", "waitUntil", "if", "ifElse"] },
  { heading: "Data", blocks: ["setVar", "changeVar", "resetCounter"] },
  { heading: "Output", blocks: ["log"] },
]

const CONTAINER_SET = new Set<StatementType>(["repeat", "forever", "repeatUntil", "if", "ifElse"])

/** Names a student may add as variables/counters (short allowlist). */
const VAR_ALLOWLIST = ["count", "distance", "speed", "n"]

/* -------------------------------------------------------------------------- */
/* Default factories (a fresh, valid statement for each block type)           */
/* -------------------------------------------------------------------------- */

function numExpr(value = 0): NumberExpr {
  return { type: "num", value }
}
function defaultCondition(): BoolExpr {
  return { type: "compare", op: "<", left: { type: "distance" }, right: numExpr(1) }
}

function newStatement(type: StatementType, variables: string[]): Statement {
  const firstVar = variables[0] ?? "count"
  switch (type) {
    case "move":
      return { type: "move", direction: "forward", distance: 1 }
    case "turn":
      return { type: "turn", direction: "right", angle: 90 }
    case "setSpeed":
      return { type: "setSpeed", target: "both", speed: 50 }
    case "stopMotors":
      return { type: "stopMotors" }
    case "moveForDuration":
      return { type: "moveForDuration", direction: "forward", ms: 1000 }
    case "wait":
      return { type: "wait", ms: 500 }
    case "safeStop":
      return { type: "safeStop" }
    case "missionComplete":
      return { type: "missionComplete" }
    case "log":
      return { type: "log", value: numExpr(0) }
    case "repeat":
      return { type: "repeat", count: 2, body: [] }
    case "forever":
      return { type: "forever", body: [] }
    case "repeatUntil":
      return { type: "repeatUntil", condition: defaultCondition(), body: [] }
    case "waitUntil":
      return { type: "waitUntil", condition: defaultCondition() }
    case "if":
      return { type: "if", condition: defaultCondition(), body: [] }
    case "ifElse":
      return { type: "ifElse", condition: defaultCondition(), body: [], elseBody: [] }
    case "setVar":
      return { type: "setVar", name: firstVar, value: numExpr(0) }
    case "changeVar":
      return { type: "changeVar", name: firstVar, by: numExpr(1) }
    case "resetCounter":
      return { type: "resetCounter", name: firstVar }
  }
}

/* -------------------------------------------------------------------------- */
/* Immutable tree edits addressed by a path of indices                        */
/* -------------------------------------------------------------------------- */

/**
 * A path locates a statement: each hop is a body index, optionally through the
 * "elseBody" of an ifElse. We encode "into elseBody" as a hop marked with a
 * separate flag list kept alongside the numeric indices.
 */
type Hop = { index: number; branch: "body" | "elseBody" }
type Path = Hop[]

function getList(program: Program, path: Path): Statement[] {
  let list = program.body
  for (const hop of path) {
    const stmt = list[hop.index]
    if (hop.branch === "elseBody" && stmt.type === "ifElse") list = stmt.elseBody
    else if ("body" in stmt) list = (stmt as Extract<Statement, { body: Statement[] }>).body
    else return []
  }
  return list
}

/** Rebuild `program` with `list` replacing the body at `path`. */
function withListAt(program: Program, path: Path, list: Statement[]): Program {
  if (path.length === 0) return { ...program, body: list }

  function rebuild(current: Statement[], depth: number): Statement[] {
    const hop = path[depth]
    return current.map((stmt, i) => {
      if (i !== hop.index) return stmt
      const isLast = depth === path.length - 1
      if (hop.branch === "elseBody" && stmt.type === "ifElse") {
        const nextElse = isLast ? list : rebuild(stmt.elseBody, depth + 1)
        return { ...stmt, elseBody: nextElse }
      }
      if ("body" in stmt) {
        const container = stmt as Extract<Statement, { body: Statement[] }>
        const nextBody = isLast ? list : rebuild(container.body, depth + 1)
        return { ...container, body: nextBody } as Statement
      }
      return stmt
    })
  }

  return { ...program, body: rebuild(program.body, 0) }
}

function updateStatementAt(
  program: Program,
  path: Path,
  index: number,
  next: Statement,
): Program {
  const list = getList(program, path)
  const copy = list.slice()
  copy[index] = next
  return withListAt(program, path, copy)
}

function insertStatementAt(program: Program, path: Path, stmt: Statement): Program {
  const list = getList(program, path)
  return withListAt(program, path, [...list, stmt])
}

function removeStatementAt(program: Program, path: Path, index: number): Program {
  const list = getList(program, path)
  const copy = list.slice()
  copy.splice(index, 1)
  return withListAt(program, path, copy)
}

function moveStatementAt(program: Program, path: Path, index: number, delta: number): Program {
  const list = getList(program, path)
  const target = index + delta
  if (target < 0 || target >= list.length) return program
  const copy = list.slice()
  const [item] = copy.splice(index, 1)
  copy.splice(target, 0, item)
  return withListAt(program, path, copy)
}

/* -------------------------------------------------------------------------- */
/* Expression editors                                                         */
/* -------------------------------------------------------------------------- */

function NumberExprEditor({
  label,
  expr,
  variables,
  disabled,
  onChange,
}: {
  label: string
  expr: NumberExpr
  variables: string[]
  disabled: boolean
  onChange: (next: NumberExpr) => void
}) {
  return (
    <span className="inline-flex items-center gap-1">
      <label className="text-xs text-muted-foreground">
        {label}
        <select
          aria-label={`${label} kind`}
          className={selectInput + " ml-1"}
          value={expr.type}
          disabled={disabled}
          onChange={(e) => {
            const kind = e.target.value as NumberExpr["type"]
            if (kind === "num") onChange(numExpr(0))
            else if (kind === "var") onChange({ type: "var", name: variables[0] ?? "count" })
            else if (kind === "distance") onChange({ type: "distance" })
            else onChange({ type: "light" })
          }}
        >
          <option value="num">a number</option>
          <option value="var">variable</option>
          <option value="distance">distance sensor</option>
          <option value="light">light sensor</option>
        </select>
      </label>
      {expr.type === "num" && (
        <input
          type="number"
          aria-label={`${label} number`}
          className={numberInput}
          value={expr.value}
          disabled={disabled}
          onChange={(e) => onChange(numExpr(Number(e.target.value) || 0))}
        />
      )}
      {expr.type === "var" && (
        <select
          aria-label={`${label} variable`}
          className={selectInput}
          value={expr.name}
          disabled={disabled || variables.length === 0}
          onChange={(e) => onChange({ type: "var", name: e.target.value })}
        >
          {variables.length === 0 && <option value="">(add a variable first)</option>}
          {variables.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      )}
    </span>
  )
}

const COMPARE_OPS: ("<" | ">" | "==" | "!=" | "<=" | ">=")[] = ["<", ">", "==", "!=", "<=", ">="]

const COLOR_CHOICES = ["red", "green", "blue", "yellow", "black", "white"]

function BoolExprEditor({
  expr,
  variables,
  disabled,
  onChange,
}: {
  expr: BoolExpr
  variables: string[]
  disabled: boolean
  onChange: (next: BoolExpr) => void
}) {
  const negated = expr.type === "not"
  const inner = expr.type === "not" ? expr.expr : expr

  const setInner = (next: BoolExpr) => {
    onChange(negated ? { type: "not", expr: next } : next)
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      <label className="inline-flex items-center gap-1 text-xs text-muted-foreground">
        <input
          type="checkbox"
          aria-label="Not (opposite)"
          className="accent-avanza-green"
          checked={negated}
          disabled={disabled}
          onChange={(e) => {
            if (e.target.checked) onChange({ type: "not", expr: inner })
            else onChange(inner)
          }}
        />
        not
      </label>
      <select
        aria-label="Condition kind"
        className={selectInput}
        value={inner.type}
        disabled={disabled}
        onChange={(e) => {
          const kind = e.target.value as BoolExpr["type"]
          if (kind === "compare") setInner(defaultCondition())
          else if (kind === "touch") setInner({ type: "touch" })
          else if (kind === "color") setInner({ type: "color", color: "red" })
          else if (kind === "onLine") setInner({ type: "onLine" })
        }}
      >
        <option value="compare">compare numbers</option>
        <option value="touch">touch sensor</option>
        <option value="color">color under robot</option>
        <option value="onLine">on a line</option>
      </select>
      {inner.type === "compare" && (
        <span className="inline-flex flex-wrap items-center gap-1">
          <NumberExprEditor
            label="left"
            expr={inner.left}
            variables={variables}
            disabled={disabled}
            onChange={(left) => setInner({ ...inner, left })}
          />
          <select
            aria-label="Compare operator"
            className={selectInput}
            value={inner.op}
            disabled={disabled}
            onChange={(e) => setInner({ ...inner, op: e.target.value as "<" })}
          >
            {COMPARE_OPS.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
          <NumberExprEditor
            label="right"
            expr={inner.right}
            variables={variables}
            disabled={disabled}
            onChange={(right) => setInner({ ...inner, right })}
          />
        </span>
      )}
      {inner.type === "color" && (
        <select
          aria-label="Color"
          className={selectInput}
          value={inner.color}
          disabled={disabled}
          onChange={(e) => setInner({ type: "color", color: e.target.value })}
        >
          {COLOR_CHOICES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      )}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Statement (block) row                                                      */
/* -------------------------------------------------------------------------- */

type EditorApi = {
  variables: string[]
  disabled: boolean
  update: (path: Path, index: number, next: Statement) => void
  remove: (path: Path, index: number) => void
  move: (path: Path, index: number, delta: number) => void
  insertInside: (path: Path, index: number, branch: "body" | "elseBody") => void
}

function StatementParams({
  stmt,
  variables,
  disabled,
  onChange,
}: {
  stmt: Statement
  variables: string[]
  disabled: boolean
  onChange: (next: Statement) => void
}) {
  switch (stmt.type) {
    case "move":
      return (
        <span className="inline-flex items-center gap-1">
          <select
            aria-label="Move direction"
            className={selectInput}
            value={stmt.direction}
            disabled={disabled}
            onChange={(e) => onChange({ ...stmt, direction: e.target.value as "forward" })}
          >
            <option value="forward">forward</option>
            <option value="backward">backward</option>
          </select>
          <label className="text-xs text-muted-foreground">
            cells
            <input
              type="number"
              min={1}
              aria-label="Distance in cells"
              className={numberInput + " ml-1"}
              value={stmt.distance}
              disabled={disabled}
              onChange={(e) => onChange({ ...stmt, distance: Number(e.target.value) || 0 })}
            />
          </label>
        </span>
      )
    case "turn":
      return (
        <span className="inline-flex items-center gap-1">
          <select
            aria-label="Turn direction"
            className={selectInput}
            value={stmt.direction}
            disabled={disabled}
            onChange={(e) => onChange({ ...stmt, direction: e.target.value as "left" })}
          >
            <option value="left">left</option>
            <option value="right">right</option>
          </select>
          <label className="text-xs text-muted-foreground">
            degrees
            <input
              type="number"
              step={90}
              aria-label="Angle in degrees"
              className={numberInput + " ml-1"}
              value={stmt.angle}
              disabled={disabled}
              onChange={(e) => onChange({ ...stmt, angle: Number(e.target.value) || 0 })}
            />
          </label>
        </span>
      )
    case "setSpeed":
      return (
        <span className="inline-flex items-center gap-1">
          <select
            aria-label="Motor target"
            className={selectInput}
            value={stmt.target}
            disabled={disabled}
            onChange={(e) => onChange({ ...stmt, target: e.target.value as "both" })}
          >
            <option value="both">both motors</option>
            <option value="left">left motor</option>
            <option value="right">right motor</option>
          </select>
          <label className="text-xs text-muted-foreground">
            speed
            <input
              type="number"
              min={0}
              max={100}
              aria-label="Speed 0 to 100"
              className={numberInput + " ml-1"}
              value={stmt.speed}
              disabled={disabled}
              onChange={(e) => onChange({ ...stmt, speed: Number(e.target.value) || 0 })}
            />
          </label>
        </span>
      )
    case "moveForDuration":
      return (
        <span className="inline-flex items-center gap-1">
          <select
            aria-label="Drive direction"
            className={selectInput}
            value={stmt.direction}
            disabled={disabled}
            onChange={(e) => onChange({ ...stmt, direction: e.target.value as "forward" })}
          >
            <option value="forward">forward</option>
            <option value="backward">backward</option>
          </select>
          <label className="text-xs text-muted-foreground">
            ms
            <input
              type="number"
              min={0}
              aria-label="Duration in milliseconds"
              className={numberInput + " ml-1"}
              value={stmt.ms}
              disabled={disabled}
              onChange={(e) => onChange({ ...stmt, ms: Number(e.target.value) || 0 })}
            />
          </label>
        </span>
      )
    case "wait":
      return (
        <label className="text-xs text-muted-foreground">
          ms
          <input
            type="number"
            min={0}
            aria-label="Wait in milliseconds"
            className={numberInput + " ml-1"}
            value={stmt.ms}
            disabled={disabled}
            onChange={(e) => onChange({ ...stmt, ms: Number(e.target.value) || 0 })}
          />
        </label>
      )
    case "log":
      return (
        <NumberExprEditor
          label="value"
          expr={stmt.value}
          variables={variables}
          disabled={disabled}
          onChange={(value) => onChange({ ...stmt, value })}
        />
      )
    case "repeat":
      return (
        <label className="text-xs text-muted-foreground">
          times
          <input
            type="number"
            min={0}
            aria-label="Repeat count"
            className={numberInput + " ml-1"}
            value={stmt.count}
            disabled={disabled}
            onChange={(e) => onChange({ ...stmt, count: Number(e.target.value) || 0 })}
          />
        </label>
      )
    case "repeatUntil":
    case "waitUntil":
    case "if":
    case "ifElse":
      return (
        <BoolExprEditor
          expr={stmt.condition}
          variables={variables}
          disabled={disabled}
          onChange={(condition) => onChange({ ...stmt, condition })}
        />
      )
    case "setVar":
      return (
        <span className="inline-flex items-center gap-1">
          <VarPicker
            value={stmt.name}
            variables={variables}
            disabled={disabled}
            onChange={(name) => onChange({ ...stmt, name })}
          />
          <span className="text-xs text-muted-foreground">to</span>
          <NumberExprEditor
            label="value"
            expr={stmt.value}
            variables={variables}
            disabled={disabled}
            onChange={(value) => onChange({ ...stmt, value })}
          />
        </span>
      )
    case "changeVar":
      return (
        <span className="inline-flex items-center gap-1">
          <VarPicker
            value={stmt.name}
            variables={variables}
            disabled={disabled}
            onChange={(name) => onChange({ ...stmt, name })}
          />
          <span className="text-xs text-muted-foreground">by</span>
          <NumberExprEditor
            label="amount"
            expr={stmt.by}
            variables={variables}
            disabled={disabled}
            onChange={(by) => onChange({ ...stmt, by })}
          />
        </span>
      )
    case "resetCounter":
      return (
        <VarPicker
          value={stmt.name}
          variables={variables}
          disabled={disabled}
          onChange={(name) => onChange({ ...stmt, name })}
        />
      )
    default:
      return null
  }
}

function VarPicker({
  value,
  variables,
  disabled,
  onChange,
}: {
  value: string
  variables: string[]
  disabled: boolean
  onChange: (name: string) => void
}) {
  return (
    <select
      aria-label="Variable name"
      className={selectInput}
      value={value}
      disabled={disabled || variables.length === 0}
      onChange={(e) => onChange(e.target.value)}
    >
      {variables.length === 0 && <option value="">(add a variable first)</option>}
      {variables.map((v) => (
        <option key={v} value={v}>
          {v}
        </option>
      ))}
    </select>
  )
}

function BlockRow({
  stmt,
  path,
  index,
  siblingCount,
  api,
}: {
  stmt: Statement
  path: Path
  index: number
  siblingCount: number
  api: EditorApi
}) {
  const info = BLOCK_INFO[stmt.type]
  const isContainer = CONTAINER_SET.has(stmt.type)
  const isIfElse = stmt.type === "ifElse"

  return (
    <li className="rounded-md border border-border bg-card">
      <div className="flex flex-wrap items-center gap-2 p-2">
        <span className="text-sm font-semibold text-foreground" title={info.help}>
          {info.label}
        </span>
        <StatementParams
          stmt={stmt}
          variables={api.variables}
          disabled={api.disabled}
          onChange={(next) => api.update(path, index, next)}
        />
        <span className="ml-auto flex items-center gap-1">
          <button
            type="button"
            className={iconButton}
            aria-label={`Move ${info.label} up`}
            disabled={api.disabled || index === 0}
            onClick={() => api.move(path, index, -1)}
          >
            ↑
          </button>
          <button
            type="button"
            className={iconButton}
            aria-label={`Move ${info.label} down`}
            disabled={api.disabled || index === siblingCount - 1}
            onClick={() => api.move(path, index, 1)}
          >
            ↓
          </button>
          {isContainer && (
            <button
              type="button"
              className={iconButton + " w-auto px-2"}
              aria-label={`Add a block inside ${info.label}`}
              disabled={api.disabled}
              onClick={() => api.insertInside(path, index, "body")}
            >
              + inside
            </button>
          )}
          <button
            type="button"
            className={iconButton}
            aria-label={`Delete ${info.label}`}
            disabled={api.disabled}
            onClick={() => api.remove(path, index)}
          >
            ✕
          </button>
        </span>
      </div>

      {isContainer && "body" in stmt && (
        <div className="border-t border-border/70 pl-4">
          <BlockList
            list={(stmt as Extract<Statement, { body: Statement[] }>).body}
            path={[...path, { index, branch: "body" }]}
            api={api}
            emptyHint="Empty — use “+ inside” to add blocks here."
          />
        </div>
      )}

      {isIfElse && stmt.type === "ifElse" && (
        <div className="border-t border-border/70 pl-4">
          <p className="px-2 pt-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Else
          </p>
          <div className="flex items-center justify-between gap-2 px-2 pb-1">
            <span className="sr-only">Else branch</span>
            <button
              type="button"
              className={iconButton + " w-auto px-2"}
              aria-label="Add a block inside the else branch"
              disabled={api.disabled}
              onClick={() => api.insertInside(path, index, "elseBody")}
            >
              + inside else
            </button>
          </div>
          <BlockList
            list={stmt.elseBody}
            path={[...path, { index, branch: "elseBody" }]}
            api={api}
            emptyHint="Empty — add blocks that run when the condition is false."
          />
        </div>
      )}
    </li>
  )
}

function BlockList({
  list,
  path,
  api,
  emptyHint,
}: {
  list: Statement[]
  path: Path
  api: EditorApi
  emptyHint: string
}) {
  if (list.length === 0) {
    return <p className="px-2 py-2 text-xs italic text-muted-foreground">{emptyHint}</p>
  }
  return (
    <ul className="space-y-2 p-2">
      {list.map((stmt, i) => (
        <BlockRow
          key={i}
          stmt={stmt}
          path={path}
          index={i}
          siblingCount={list.length}
          api={api}
        />
      ))}
    </ul>
  )
}

/* -------------------------------------------------------------------------- */
/* Simulator grid (SVG)                                                       */
/* -------------------------------------------------------------------------- */

function WorldGrid({
  world,
  robot,
}: {
  world: RobotWorld
  robot: { x: number; y: number; dir: number }
}) {
  const cell = 40
  const w = world.cols * cell
  const h = world.rows * cell
  const cx = robot.x * cell + cell / 2
  const cy = robot.y * cell + cell / 2

  // Triangle pointing in the robot's direction (0 up, 1 right, 2 down, 3 left).
  const r = cell * 0.32
  const points = (() => {
    const angles: Record<number, number> = { 0: -90, 1: 0, 2: 90, 3: 180 }
    const base = (angles[robot.dir] ?? -90) * (Math.PI / 180)
    const tip = [cx + r * Math.cos(base), cy + r * Math.sin(base)]
    const left = [cx + r * Math.cos(base + 2.5), cy + r * Math.sin(base + 2.5)]
    const right = [cx + r * Math.cos(base - 2.5), cy + r * Math.sin(base - 2.5)]
    return [tip, left, right].map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ")
  })()

  const isWall = (x: number, y: number) => world.walls.includes(`${x},${y}`)
  const isLine = (x: number, y: number) => world.lines.includes(`${x},${y}`)
  const colorAt = (x: number, y: number) => world.colors[`${x},${y}`]

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      role="img"
      aria-label={`Robot world, ${world.cols} by ${world.rows} cells. Robot at column ${robot.x + 1}, row ${robot.y + 1}.`}
      className="mx-auto block h-auto max-h-64 w-full max-w-md"
    >
      {Array.from({ length: world.rows }).map((_, y) =>
        Array.from({ length: world.cols }).map((__, x) => {
          const wall = isWall(x, y)
          const line = isLine(x, y)
          const color = colorAt(x, y)
          let fill = "var(--color-card, #ffffff)"
          if (wall) fill = "#6b7280"
          else if (line) fill = "#d1d5db"
          const cellLabel = `Column ${x + 1}, row ${y + 1}${wall ? " — wall" : ""}${
            line ? " — line" : ""
          }${color ? ` — ${color} marker` : ""}`
          const ox = x * cell
          const oy = y * cell
          return (
            <g key={`${x},${y}`}>
              <rect
                x={ox}
                y={oy}
                width={cell}
                height={cell}
                fill={fill}
                stroke="#cbd5e1"
                strokeWidth={1}
              >
                <title>{cellLabel}</title>
              </rect>
              {/* Wall marked with an X pattern, not colour alone. */}
              {wall && (
                <g stroke="#1f2937" strokeWidth={2} strokeLinecap="round">
                  <line x1={ox + 8} y1={oy + 8} x2={ox + cell - 8} y2={oy + cell - 8} />
                  <line x1={ox + cell - 8} y1={oy + 8} x2={ox + 8} y2={oy + cell - 8} />
                </g>
              )}
              {/* Line cell marked with a dashed centre stripe. */}
              {line && !wall && (
                <line
                  x1={ox + 6}
                  y1={oy + cell / 2}
                  x2={ox + cell - 6}
                  y2={oy + cell / 2}
                  stroke="#4b5563"
                  strokeWidth={3}
                  strokeDasharray="3 3"
                />
              )}
              {color && !wall && (
                <circle
                  cx={ox + cell / 2}
                  cy={oy + cell / 2}
                  r={cell * 0.18}
                  fill={color}
                  stroke="#1f2937"
                  strokeWidth={1.5}
                >
                  <title>{`${color} marker at column ${x + 1}, row ${y + 1}`}</title>
                </circle>
              )}
            </g>
          )
        }),
      )}
      {world.goal && (
        <rect
          x={world.goal.x * cell + 3}
          y={world.goal.y * cell + 3}
          width={cell - 6}
          height={cell - 6}
          fill="none"
          stroke="var(--color-avanza-green, #16a34a)"
          strokeWidth={3}
          strokeDasharray="4 3"
          rx={4}
        >
          <title>{`Goal zone at column ${world.goal.x + 1}, row ${world.goal.y + 1}`}</title>
        </rect>
      )}
      <polygon points={points} fill="var(--color-avanza-green, #16a34a)" stroke="#0f5132" strokeWidth={1.5}>
        <title>{`Robot at column ${robot.x + 1}, row ${robot.y + 1}`}</title>
      </polygon>
    </svg>
  )
}

/** Text legend so map meaning is not conveyed by colour alone. */
function WorldLegend({ world }: { world: RobotWorld }) {
  const items: { swatch: ReactNode; label: string }[] = [
    {
      swatch: <span aria-hidden className="text-avanza-green-dark">▲</span>,
      label: "Robot (arrow points where it faces)",
    },
  ]
  if (world.goal) {
    items.push({
      swatch: (
        <span aria-hidden className="rounded-sm border-2 border-dashed border-avanza-green px-1 leading-none">
          ▢
        </span>
      ),
      label: "Goal zone (dashed outline)",
    })
  }
  if (world.walls.length) {
    items.push({ swatch: <span aria-hidden className="font-bold text-slate-700">✕</span>, label: "Wall (grey, X mark)" })
  }
  if (world.lines.length) {
    items.push({ swatch: <span aria-hidden className="text-slate-600">– –</span>, label: "Line (dashed stripe)" })
  }
  if (Object.keys(world.colors).length) {
    items.push({ swatch: <span aria-hidden className="text-slate-600">●</span>, label: "Coloured marker (dot)" })
  }
  return (
    <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
      {items.map((it) => (
        <li key={it.label} className="inline-flex items-center gap-1">
          {it.swatch}
          <span>{it.label}</span>
        </li>
      ))}
    </ul>
  )
}

/* -------------------------------------------------------------------------- */
/* Run engine (a small state machine over the execute generator)              */
/* -------------------------------------------------------------------------- */

type RunStatus = "idle" | "running" | "paused" | "finished" | "error"

function poseFromWorld(world: RobotWorld) {
  return { x: world.start.x, y: world.start.y, dir: world.start.dir as number }
}

/* -------------------------------------------------------------------------- */
/* Main component                                                             */
/* -------------------------------------------------------------------------- */

export function RoboticsBlockEditor({
  specId,
  mission,
  title,
  description,
  allowedBlocks,
}: {
  specId: string
  mission: MissionKind
  title?: string
  description?: string
  /**
   * When set, the palette only offers these block types. Used to keep a
   * "sequences only" week (e.g. Week 3) from offering loops, conditions, or
   * sensors. Omit to offer the full palette.
   */
  allowedBlocks?: StatementType[]
}) {
  // Restrict the palette to the allowed block types when provided.
  const palette = useMemo(() => {
    if (!allowedBlocks) return PALETTE
    const allowed = new Set(allowedBlocks)
    return PALETTE.map((group) => ({
      ...group,
      blocks: group.blocks.filter((type) => allowed.has(type)),
    })).filter((group) => group.blocks.length > 0)
  }, [allowedBlocks])
  const { loaded, progress, saveProgramAst, resetProgramAst, saveSimulatorResult } =
    useRoboticsProgress()
  const missionDef = useMemo(() => getMission(mission), [mission])
  const world = missionDef.world

  const [program, setProgram] = useState<Program>(() => missionDef.starter)
  const [seeded, setSeeded] = useState(false)

  // Seed from saved progress (or the mission starter) once progress has loaded.
  useEffect(() => {
    if (!loaded || seeded) return
    const saved = progress.savedProgramAsts[specId]?.program
    setProgram(saved ?? missionDef.starter)
    setSeeded(true)
  }, [loaded, seeded, progress.savedProgramAsts, specId, missionDef.starter])

  // Persist edits (debounced) once the student's own state is in control.
  const saveRef = useRef(saveProgramAst)
  useEffect(() => {
    saveRef.current = saveProgramAst
  }, [saveProgramAst])
  useEffect(() => {
    if (!loaded || !seeded) return
    const id = setTimeout(() => saveRef.current(specId, program), 400)
    return () => clearTimeout(id)
  }, [program, loaded, seeded, specId])

  const reducedMotion = useReducedMotion()

  /* ---- Run state ---- */
  const [runStatus, setRunStatus] = useState<RunStatus>("idle")
  const [robot, setRobot] = useState(() => poseFromWorld(world))
  const [log, setLog] = useState<number[]>([])
  const [stepCount, setStepCount] = useState(0)
  const [runMessage, setRunMessage] = useState("")
  const [speed, setSpeed] = useState(2) // 1x–4x
  const [collisions, setCollisions] = useState(0)

  const genRef = useRef<Generator<ExecEvent, unknown> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const runningEdits = runStatus === "running" || runStatus === "paused"

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const applyEvent = useCallback((state: RobotState) => {
    setRobot({ x: state.x, y: state.y, dir: state.dir })
    setLog(state.log)
  }, [])

  /** Advance the generator by exactly one event. Returns false when done. */
  const advance = useCallback((): boolean => {
    const gen = genRef.current
    if (!gen) return false
    try {
      const next = gen.next()
      if (next.done) {
        setRunStatus((s) => (s === "error" ? s : "finished"))
        setRunMessage("The program finished.")
        return false
      }
      const event = next.value as ExecEvent
      applyEvent(event.state)
      setStepCount((n) => n + 1)
      if (event.action.startsWith("bump")) setCollisions((n) => n + 1)
      return true
    } catch (err) {
      if (err instanceof ExecutionLimitError) {
        setRunStatus("error")
        setRunMessage("This program ran too long — check for a loop that never ends.")
      } else {
        setRunStatus("error")
        setRunMessage("Something went wrong while running.")
      }
      return false
    }
  }, [applyEvent])

  const stopRun = useCallback(() => {
    clearTimer()
    genRef.current = null
    setRunStatus("idle")
    setRobot(poseFromWorld(world))
    setLog([])
    setStepCount(0)
    setCollisions(0)
    setRunMessage("")
  }, [clearTimer, world])

  /** Put the robot back at the world start but keep everything else. */
  const resetRobot = useCallback(() => {
    clearTimer()
    genRef.current = null
    setRunStatus("idle")
    setRobot(poseFromWorld(world))
    setLog([])
    setStepCount(0)
    setCollisions(0)
    setRunMessage("Robot back at the start.")
  }, [clearTimer, world])

  // Restart the interval whenever speed changes mid-run.
  const startTimer = useCallback(() => {
    clearTimer()
    const delay = 600 / speed
    intervalRef.current = setInterval(() => {
      const more = advance()
      if (!more) clearTimer()
    }, delay)
  }, [advance, clearTimer, speed])

  const handleRun = useCallback(() => {
    if (!canRun(program)) return
    // Fresh run.
    clearTimer()
    genRef.current = null

    if (reducedMotion) {
      // No frame-by-frame animation: compute the whole run and jump to the end.
      const outcome = runMission(program, missionDef)
      const fs = outcome.trace.finalState
      setRobot({ x: fs.x, y: fs.y, dir: fs.dir })
      setLog(fs.log)
      setStepCount(outcome.trace.steps)
      setCollisions(outcome.trace.collisions)
      setRunStatus(outcome.ranTooLong ? "error" : "finished")
      setRunMessage(
        outcome.ranTooLong
          ? "This program ran too long — check for a loop that never ends."
          : "The program finished. The robot jumped to the end (reduced motion is on).",
      )
      return
    }

    genRef.current = execute(program, world)
    setRobot(poseFromWorld(world))
    setLog([])
    setStepCount(0)
    setCollisions(0)
    setRunMessage("Running…")
    setRunStatus("running")
  }, [program, world, clearTimer, reducedMotion, missionDef])

  const handlePause = useCallback(() => {
    clearTimer()
    setRunStatus("paused")
    setRunMessage("Paused.")
  }, [clearTimer])

  const handleResume = useCallback(() => {
    setRunStatus("running")
    setRunMessage("Running…")
  }, [])

  const handleStep = useCallback(() => {
    if (runStatus === "idle" || runStatus === "finished" || runStatus === "error") {
      // Begin a fresh stepped run.
      if (!canRun(program)) return
      genRef.current = execute(program, world)
      setRobot(poseFromWorld(world))
      setLog([])
      setStepCount(0)
      setCollisions(0)
      setRunStatus("paused")
      setRunMessage("Stepped one block.")
      // advance one after the generator is set
      queueMicrotask(() => advance())
      return
    }
    setRunStatus("paused")
    advance()
    setRunMessage("Stepped one block.")
  }, [runStatus, program, world, advance])

  // Drive the interval based on status/speed.
  useEffect(() => {
    if (runStatus === "running") startTimer()
    else clearTimer()
    return clearTimer
  }, [runStatus, speed, startTimer, clearTimer])

  // Clean up on unmount.
  useEffect(() => clearTimer, [clearTimer])

  // Pause the animation when the tab is hidden (saves work; resume on return).
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && runStatus === "running") {
        clearTimer()
        setRunStatus("paused")
        setRunMessage("Paused — the tab was in the background.")
      }
    }
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [runStatus, clearTimer])

  // If the world changes (mission switch), reset the run.
  useEffect(() => {
    stopRun()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mission])

  /* ---- Validation + challenge ---- */
  const issues = useMemo(() => validateProgram(program), [program])
  const errors = issues.filter((i) => i.level === "error")
  const warnings = issues.filter((i) => i.level === "warning")
  const runnable = errors.length === 0

  const [challenge, setChallenge] = useState<MissionRunOutcome | null>(null)
  const [trial, setTrial] = useState(0)
  const [notes, setNotes] = useState("")
  const [revisionMade, setRevisionMade] = useState("")
  const [savedTrial, setSavedTrial] = useState<number | null>(null)

  const handleCheck = useCallback(() => {
    const outcome = runMission(program, missionDef)
    const nextTrial = trial + 1
    setTrial(nextTrial)
    setChallenge(outcome)

    const programRevision = progress.savedProgramAsts[specId]?.revisions ?? 1
    saveSimulatorResult(
      buildResultRecord({
        mission: missionDef,
        specId,
        outcome,
        trial: nextTrial,
        programRevision,
        notes,
        revisionMade,
      }),
    )
    setSavedTrial(nextTrial)
  }, [program, missionDef, trial, progress.savedProgramAsts, specId, saveSimulatorResult, notes, revisionMade])

  /* ---- Program-editing API ---- */
  const editApi: EditorApi = useMemo(
    () => ({
      variables: program.variables,
      disabled: runningEdits,
      update: (path, index, next) => setProgram((p) => updateStatementAt(p, path, index, next)),
      remove: (path, index) => setProgram((p) => removeStatementAt(p, path, index)),
      move: (path, index, delta) => setProgram((p) => moveStatementAt(p, path, index, delta)),
      insertInside: (path, index, branch) =>
        setProgram((p) => {
          const innerPath: Path = [...path, { index, branch }]
          return insertStatementAt(p, innerPath, newStatement("move", p.variables))
        }),
    }),
    [program.variables, runningEdits],
  )

  const addTopLevel = useCallback(
    (type: StatementType) => {
      setProgram((p) => insertStatementAt(p, [], newStatement(type, p.variables)))
    },
    [],
  )

  const addVariable = useCallback((name: string) => {
    const clean = name.trim().slice(0, 12).replace(/[^a-zA-Z0-9_]/g, "")
    if (!clean) return
    setProgram((p) =>
      p.variables.includes(clean) ? p : { ...p, variables: [...p.variables, clean] },
    )
  }, [])

  const removeVariable = useCallback((name: string) => {
    setProgram((p) => ({ ...p, variables: p.variables.filter((v) => v !== name) }))
  }, [])

  const handleResetStarter = useCallback(() => {
    if (!window.confirm("Reset this program back to the starter? Your changes here will be cleared.")) {
      return
    }
    resetProgramAst(specId)
    setProgram(missionDef.starter)
    setChallenge(null)
    stopRun()
  }, [resetProgramAst, specId, missionDef.starter, stopRun])

  const handleLoadStarter = useCallback(() => {
    if (!window.confirm("Load the starter program? This replaces your current blocks.")) return
    setProgram(missionDef.starter)
    setChallenge(null)
    stopRun()
  }, [missionDef.starter, stopRun])

  const handleShowExample = useCallback(() => {
    if (
      !window.confirm(
        "Show an example program? This replaces your current blocks with one worked solution so you can study it.",
      )
    ) {
      return
    }
    setProgram(missionDef.example)
    setChallenge(null)
    stopRun()
  }, [missionDef.example, stopRun])

  /** Reset the whole mission view: robot to start AND clear the check results. */
  const handleResetMission = useCallback(() => {
    stopRun()
    setChallenge(null)
    setSavedTrial(null)
    setRunMessage("Mission reset. Ready to run.")
  }, [stopRun])

  const savedProgram = progress.savedProgramAsts[specId]?.program
  const handleRestartFromSaved = useCallback(() => {
    const saved = progress.savedProgramAsts[specId]?.program
    if (!saved) return
    setProgram(saved)
    setChallenge(null)
    stopRun()
    setRunMessage("Loaded your saved program.")
  }, [progress.savedProgramAsts, specId, stopRun])

  /* ---- Expand / fullscreen ---- */
  const [expanded, setExpanded] = useState(false)
  const expandButtonRef = useRef<HTMLButtonElement>(null)

  // Escape closes the full-screen editor and returns focus to the toggle,
  // matching the dialog keyboard convention.
  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpanded(false)
        expandButtonRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [expanded])

  const statusLabel =
    runStatus === "running"
      ? "Running"
      : runStatus === "paused"
        ? "Paused"
        : runStatus === "finished"
          ? "Finished"
          : runStatus === "error"
            ? "Stopped (ran too long)"
            : "Ready"

  /* ---- Live, accessible robot-state summary ---- */
  // A minimal RobotState around the visible pose, enough for the sensors + text.
  const liveState: RobotState = useMemo(
    () => ({
      x: robot.x,
      y: robot.y,
      dir: robot.dir as RobotState["dir"],
      motorLeft: 0,
      motorRight: 0,
      vars: {},
      log,
      reached: [],
      done: runStatus === "finished",
      missionComplete: false,
    }),
    [robot.x, robot.y, robot.dir, log, runStatus],
  )
  const sensors = useMemo(() => readSensors(world, liveState), [world, liveState])
  const inGoal = world.goal ? robot.x === world.goal.x && robot.y === world.goal.y : false
  const stateText = useMemo(() => describeState(world, liveState), [world, liveState])
  const worldText = useMemo(() => describeWorld(world), [world])

  const [newVarName, setNewVarName] = useState("")

  /* ---- Layout ---- */
  const shell = expanded
    ? "fixed inset-0 z-50 overflow-auto bg-background p-4"
    : "rounded-lg border border-border bg-card p-4 md:p-5"

  return (
    <section className={shell} aria-label={title ?? "Block programming editor"}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-foreground">{title ?? missionDef.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description ?? missionDef.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="rounded-md border border-border px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            aria-live="polite"
          >
            {statusLabel}
          </span>
          <button
            ref={expandButtonRef}
            type="button"
            className={outlineButton}
            aria-pressed={expanded}
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? "Close" : "Expand"}
            <span className="sr-only"> full-screen editor{expanded ? " (or press Escape)" : ""}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* ---------------- Editor column ---------------- */}
        <div className="min-w-0">
          {/* Palette */}
          <div className="rounded-md border border-border bg-secondary p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Add a block</p>
            <div className="mt-2 space-y-3">
              {palette.map((group) => (
                <div key={group.heading}>
                  <p className="text-xs font-semibold text-foreground">{group.heading}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {group.blocks.map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={outlineButton + " px-2 py-1"}
                        title={BLOCK_INFO[type].help}
                        disabled={runningEdits}
                        onClick={() => addTopLevel(type)}
                        aria-label={`Add ${BLOCK_INFO[type].label} block — ${BLOCK_INFO[type].help}`}
                      >
                        {BLOCK_INFO[type].label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Variables */}
            <div className="mt-4 border-t border-border pt-3">
              <p className="text-xs font-semibold text-foreground">Variables &amp; counters</p>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                {program.variables.length === 0 && (
                  <span className="text-xs italic text-muted-foreground">None yet.</span>
                )}
                {program.variables.map((v) => (
                  <span
                    key={v}
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs font-semibold text-foreground"
                  >
                    {v}
                    <button
                      type="button"
                      aria-label={`Remove variable ${v}`}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-40"
                      disabled={runningEdits}
                      onClick={() => removeVariable(v)}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <label className="sr-only" htmlFor={`newvar-${specId}`}>
                  New variable name
                </label>
                <input
                  id={`newvar-${specId}`}
                  list={`varlist-${specId}`}
                  className="w-28 rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green disabled:opacity-50"
                  placeholder="count"
                  value={newVarName}
                  disabled={runningEdits}
                  onChange={(e) => setNewVarName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addVariable(newVarName)
                      setNewVarName("")
                    }
                  }}
                />
                <datalist id={`varlist-${specId}`}>
                  {VAR_ALLOWLIST.map((v) => (
                    <option key={v} value={v} />
                  ))}
                </datalist>
                <button
                  type="button"
                  className={outlineButton + " px-2 py-1"}
                  disabled={runningEdits || newVarName.trim() === ""}
                  onClick={() => {
                    addVariable(newVarName)
                    setNewVarName("")
                  }}
                >
                  Add variable
                </button>
              </div>
            </div>
          </div>

          {/* Program body */}
          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Your program</p>
            {seeded || !loaded ? (
              <div className="mt-2">
                {program.body.length === 0 ? (
                  <p className="rounded-md border border-dashed border-border p-3 text-sm italic text-muted-foreground">
                    No blocks yet. Use “Add a block” above to start.
                  </p>
                ) : (
                  <BlockList
                    list={program.body}
                    path={[]}
                    api={editApi}
                    emptyHint="No blocks yet."
                  />
                )}
              </div>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">Loading your saved program…</p>
            )}
          </div>

          {/* Program actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className={outlineButton} disabled={runningEdits} onClick={handleLoadStarter}>
              Load starter
            </button>
            <button type="button" className={outlineButton} disabled={runningEdits} onClick={handleShowExample}>
              Show an example
            </button>
            <button
              type="button"
              className="text-sm font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={runningEdits}
              onClick={handleResetStarter}
            >
              Reset to starter
            </button>
          </div>
        </div>

        {/* ---------------- Simulator column ---------------- */}
        <div className="min-w-0">
          <div className="rounded-md border border-border bg-secondary p-3">
            <WorldGrid world={world} robot={robot} />
            <WorldLegend world={world} />
            <p className="mt-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Map: </span>
              {worldText}
            </p>
          </div>

          {/* Run controls */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {runStatus !== "running" ? (
              <button
                type="button"
                className={greenButton}
                aria-label={runStatus === "paused" ? "Resume the run" : "Run the program"}
                disabled={!runnable}
                onClick={runStatus === "paused" ? handleResume : handleRun}
              >
                {runStatus === "paused" ? "Resume" : "Run"}
              </button>
            ) : (
              <button
                type="button"
                className={outlineButton}
                aria-label="Pause the run"
                onClick={handlePause}
              >
                Pause
              </button>
            )}
            <button
              type="button"
              className={outlineButton}
              aria-label="Step forward one block"
              disabled={!runnable || runStatus === "running"}
              onClick={handleStep}
            >
              Step
            </button>
            <button
              type="button"
              className={outlineButton}
              aria-label="Stop the run"
              disabled={runStatus === "idle"}
              onClick={stopRun}
            >
              Stop
            </button>
            <button
              type="button"
              className={outlineButton}
              aria-label="Reset robot to the start, keep the program"
              onClick={resetRobot}
            >
              Reset robot
            </button>
            <button
              type="button"
              className={outlineButton}
              aria-label="Reset the mission: robot to start and clear the check results"
              onClick={handleResetMission}
            >
              Reset mission
            </button>
            {savedProgram && (
              <button
                type="button"
                className={outlineButton}
                aria-label="Restart from your last saved program"
                onClick={handleRestartFromSaved}
              >
                Restart from saved program
              </button>
            )}
            <label className="ml-1 inline-flex items-center gap-2 text-xs text-muted-foreground">
              Speed
              <input
                type="range"
                min={1}
                max={4}
                step={1}
                value={speed}
                aria-label="Run speed, 1x to 4x"
                className="accent-avanza-green"
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
              <span className="font-semibold text-foreground">{speed}x</span>
            </label>
          </div>

          {reducedMotion && (
            <p className="mt-2 text-xs text-muted-foreground">
              Reduced motion is on: “Run” jumps the robot to the end instead of animating. Use “Step”
              to move one block at a time.
            </p>
          )}

          {/* Run status announcement */}
          <p className="sr-only" role="status" aria-live="polite">
            {statusLabel}. {runMessage}
          </p>

          <p className="mt-2 text-sm text-muted-foreground" aria-live="polite">
            {runMessage || (runnable ? "Ready to run." : "Fix the errors below before running.")}
            {" · "}
            <span className="font-semibold text-foreground">{stepCount} steps</span>
          </p>

          {/* Live, accessible mission-state summary */}
          <div className="mt-3 rounded-md border border-border bg-card p-3" aria-live="polite">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Robot state
            </p>
            <dl className="mt-1 grid grid-cols-2 gap-x-3 gap-y-1 text-sm text-foreground">
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">Column</dt>
                <dd className="font-semibold">{robot.x + 1}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">Row</dt>
                <dd className="font-semibold">{robot.y + 1}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">Facing</dt>
                <dd className="font-semibold">
                  {(["up", "right", "down", "left"] as const)[robot.dir] ?? "up"}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">Distance ahead</dt>
                <dd className="font-semibold">
                  {sensors.distance} cell{sensors.distance === 1 ? "" : "s"}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">Touch</dt>
                <dd className="font-semibold">{sensors.touch ? "pressed" : "clear"}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">On a line</dt>
                <dd className="font-semibold">{sensors.onLine ? "yes" : "no"}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">Light</dt>
                <dd className="font-semibold">{sensors.light}</dd>
              </div>
              {world.goal && (
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">In goal zone</dt>
                  <dd className="font-semibold">{inGoal ? "yes" : "no"}</dd>
                </div>
              )}
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">Collisions</dt>
                <dd className="font-semibold">{collisions}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-muted-foreground">Steps</dt>
                <dd className="font-semibold">{stepCount}</dd>
              </div>
            </dl>
            <p className="sr-only">{stateText}</p>
          </div>

          {/* Log output */}
          <div className="mt-2">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Log output</p>
            <p className="mt-1 rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground">
              {log.length === 0 ? (
                <span className="italic text-muted-foreground">Nothing logged yet.</span>
              ) : (
                log.join(", ")
              )}
            </p>
          </div>

          {/* Validation */}
          <div className="mt-3" aria-live="polite">
            {errors.length > 0 && (
              <div className="rounded-md border border-red-400/60 bg-red-50 p-3 text-sm dark:bg-red-950/30">
                <p className="font-semibold text-red-700 dark:text-red-300">Fix these before running:</p>
                <ul className="mt-1 space-y-1">
                  {errors.map((e, i) => (
                    <li key={i} className="text-red-700 dark:text-red-300">
                      {e.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {warnings.length > 0 && (
              <ul className="mt-2 space-y-1">
                {warnings.map((wn, i) => (
                  <li key={i} className="text-xs text-muted-foreground">
                    Heads up: {wn.message}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Challenge check */}
          <div className="mt-4 border-t border-border pt-3">
            {/* Optional notes recorded with each saved result. */}
            <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <label className="text-xs text-muted-foreground">
                Notes (optional)
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
                  placeholder="What happened this time?"
                  value={notes}
                  maxLength={200}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </label>
              <label className="text-xs text-muted-foreground">
                What did you change? (optional)
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avanza-green"
                  placeholder="e.g. added a stop after the sensor check"
                  value={revisionMade}
                  maxLength={200}
                  onChange={(e) => setRevisionMade(e.target.value)}
                />
              </label>
            </div>

            <button type="button" className={greenButton} onClick={handleCheck}>
              Check challenge
            </button>

            {savedTrial !== null && (
              <p className="mt-2 text-xs font-semibold text-avanza-green-dark" aria-live="polite">
                Saved result — trial {savedTrial}.
              </p>
            )}

            {challenge && (
              <div className="mt-3" aria-live="polite">
                <p className="text-sm font-semibold text-foreground">
                  {challenge.passed ? "All checks passed. Well done." : "Not quite yet — keep going."}
                </p>
                {challenge.ranTooLong && (
                  <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                    This program ran too long — check for a loop that never ends.
                  </p>
                )}
                <ul className="mt-2 space-y-1">
                  {challenge.checks.map((c) => (
                    <li key={c.id} className="flex items-start gap-2 text-sm">
                      <span aria-hidden className="font-semibold text-foreground">
                        {c.passed ? "Pass" : "Not yet"}
                      </span>
                      <span className={c.passed ? "text-muted-foreground" : "text-foreground/90"}>
                        {c.label}
                      </span>
                      <span className="sr-only">{c.passed ? " (passed)" : " (not passed yet)"}</span>
                    </li>
                  ))}
                </ul>

                {/* Likely-cause hints — never reveal the solution. */}
                {challenge.feedback.length > 0 && (
                  <div
                    className="mt-3 rounded-md border border-amber-400/60 bg-amber-50 p-3 text-sm dark:bg-amber-950/30"
                    aria-live="polite"
                  >
                    <p className="font-semibold text-amber-800 dark:text-amber-200">
                      What likely went wrong
                    </p>
                    <ul className="mt-1 space-y-1">
                      {challenge.feedback.map((f, i) => (
                        <li key={i} className="text-amber-800 dark:text-amber-200">
                          {f.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

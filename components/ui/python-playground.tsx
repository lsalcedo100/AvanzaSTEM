"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { Play, Sparkles, Terminal, Loader2, RotateCcw } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { FadeIn } from "@/components/ui/animate"
import { cn } from "@/lib/utils"

const MAX_LINES = 10

const PYODIDE_VERSION = "0.26.4"
const PYODIDE_INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`
const PYODIDE_SCRIPT_URL = `${PYODIDE_INDEX_URL}pyodide.js`

type PyodideAPI = {
  runPythonAsync: (code: string) => Promise<unknown>
  setStdout: (opts: { batched?: (s: string) => void; raw?: (n: number) => void }) => void
  setStderr: (opts: { batched?: (s: string) => void; raw?: (n: number) => void }) => void
}

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideAPI>
    __avanzaPyodidePromise?: Promise<PyodideAPI>
  }
}

function loadPyodideOnce(): Promise<PyodideAPI> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Pyodide is browser-only"))
  }
  if (window.__avanzaPyodidePromise) return window.__avanzaPyodidePromise

  window.__avanzaPyodidePromise = new Promise<PyodideAPI>((resolve, reject) => {
    const finish = () => {
      if (!window.loadPyodide) {
        reject(new Error("loadPyodide not found after script load"))
        return
      }
      window
        .loadPyodide({ indexURL: PYODIDE_INDEX_URL })
        .then(resolve)
        .catch(reject)
    }

    if (window.loadPyodide) {
      finish()
      return
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-avanza-pyodide]`,
    )
    if (existing) {
      existing.addEventListener("load", finish, { once: true })
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Pyodide script")),
        { once: true },
      )
      return
    }

    const script = document.createElement("script")
    script.src = PYODIDE_SCRIPT_URL
    script.async = true
    script.dataset.avanzaPyodide = "true"
    script.addEventListener("load", finish, { once: true })
    script.addEventListener(
      "error",
      () => reject(new Error("Failed to load Pyodide script")),
      { once: true },
    )
    document.head.appendChild(script)
  })

  return window.__avanzaPyodidePromise
}

type SnippetKey = "hello" | "multiply" | "pyramid"

export function PythonPlayground() {
  const { t } = useLanguage()

  const snippets = useMemo<Record<SnippetKey, { label: string; code: string }>>(
    () => ({
      hello: {
        label: t.home.pyHelloLabel,
        code: 'print("Hello, scientist!")\nname = "Avanza"\nprint("Welcome,", name)',
      },
      multiply: {
        label: t.home.pyMultiplyLabel,
        code: "a = 7\nb = 6\nproduct = a * b\nprint(a, 'x', b, '=', product)",
      },
      pyramid: {
        label: t.home.pyPyramidLabel,
        code: "for i in range(1, 6):\n    print('*' * i)",
      },
    }),
    [t.home.pyHelloLabel, t.home.pyMultiplyLabel, t.home.pyPyramidLabel],
  )

  const [code, setCode] = useState<string>(snippets.hello.code)
  const [output, setOutput] = useState<string>("")
  const [errorOutput, setErrorOutput] = useState<string>("")
  const [status, setStatus] = useState<"idle" | "loading" | "running" | "ready">(
    "idle",
  )
  const [activeSnippet, setActiveSnippet] = useState<SnippetKey>("hello")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const lines = code.split("\n")
  const lineCount = lines.length
  const overLimit = lineCount > MAX_LINES

  const handleCodeChange = useCallback((value: string) => {
    const splitLines = value.split("\n")
    if (splitLines.length > MAX_LINES) {
      // Hard-cap at MAX_LINES
      const trimmed = splitLines.slice(0, MAX_LINES).join("\n")
      setCode(trimmed)
      return
    }
    setCode(value)
  }, [])

  const handleRun = useCallback(async () => {
    if (overLimit) return
    setErrorOutput("")
    setOutput("")

    const wasCold = status === "idle"
    setStatus(wasCold ? "loading" : "running")

    try {
      const pyodide = await loadPyodideOnce()
      setStatus("running")

      let stdoutBuf = ""
      let stderrBuf = ""
      pyodide.setStdout({
        batched: (s: string) => {
          stdoutBuf += s + "\n"
        },
      })
      pyodide.setStderr({
        batched: (s: string) => {
          stderrBuf += s + "\n"
        },
      })

      try {
        await pyodide.runPythonAsync(code)
        setOutput(stdoutBuf.trimEnd() || t.home.pyNoOutput)
        if (stderrBuf) setErrorOutput(stderrBuf.trimEnd())
      } catch (err) {
        if (stdoutBuf) setOutput(stdoutBuf.trimEnd())
        const message =
          err && typeof err === "object" && "message" in err
            ? String((err as { message?: unknown }).message)
            : String(err)
        setErrorOutput(message)
      }
    } catch (err) {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message?: unknown }).message)
          : String(err)
      setErrorOutput(`${t.home.pyLoadFailed}\n${message}`)
    } finally {
      setStatus("ready")
    }
  }, [code, overLimit, status, t.home.pyLoadFailed, t.home.pyNoOutput])

  const handleSnippet = useCallback(
    (key: SnippetKey) => {
      setActiveSnippet(key)
      setCode(snippets[key].code)
      setOutput("")
      setErrorOutput("")
      // Refocus the editor so kids can immediately edit
      requestAnimationFrame(() => textareaRef.current?.focus())
    },
    [snippets],
  )

  const handleClear = useCallback(() => {
    setCode("")
    setOutput("")
    setErrorOutput("")
  }, [])

  const isBusy = status === "loading" || status === "running"

  return (
    <section className="relative overflow-hidden bg-[#fff8e8] py-20 md:py-24">
      {/* Notebook dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 22%, rgba(46,204,113,0.18) 0 5px, transparent 6px), radial-gradient(circle at 86% 18%, rgba(139,92,246,0.16) 0 4px, transparent 5px), radial-gradient(circle at 18% 82%, rgba(249,115,22,0.16) 0 4px, transparent 5px), radial-gradient(circle at 82% 86%, rgba(26,188,156,0.18) 0 5px, transparent 6px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-avanza-dark/25 bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-avanza-dark">
            <Sparkles className="h-3.5 w-3.5 text-avanza-orange" />
            {t.home.pyEyebrow}
          </span>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {t.home.pyTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.home.pyDesc}
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
            {/* Editor card */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(-0.8deg)]"
              />
              <div className="relative overflow-hidden rounded-3xl bg-[#0f1024] shadow-[0_28px_64px_-30px_rgba(26,26,46,0.55)] ring-1 ring-avanza-dark/30">
                {/* Window chrome */}
                <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#16172e] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                    <span className="ml-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white/55">
                      <Terminal className="h-3.5 w-3.5" />
                      {t.home.pyEditorTitle}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold tracking-wide",
                      overLimit
                        ? "bg-red-500/20 text-red-300"
                        : lineCount === MAX_LINES
                          ? "bg-amber-400/20 text-amber-200"
                          : "bg-white/10 text-white/70",
                    )}
                  >
                    {lineCount} / {MAX_LINES} {t.home.pyLines}
                  </span>
                </div>

                {/* Code area */}
                <div className="relative grid grid-cols-[auto_1fr] gap-0">
                  {/* Line numbers */}
                  <div
                    aria-hidden="true"
                    className="select-none bg-[#0c0d1f] py-4 pl-4 pr-3 text-right font-mono text-[13px] leading-[1.55] text-white/35"
                  >
                    {Array.from({ length: Math.max(lineCount, 1) }).map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    onKeyDown={(e) => handleEditorKeyDown(e, textareaRef, handleCodeChange)}
                    spellCheck={false}
                    autoCorrect="off"
                    autoCapitalize="off"
                    aria-label={t.home.pyEditorAria}
                    className="block w-full resize-none bg-transparent py-4 pl-3 pr-4 font-mono text-[13px] leading-[1.55] text-emerald-200 caret-emerald-200 outline-none placeholder:text-white/30"
                    rows={Math.max(lineCount + 1, 8)}
                    style={{ minHeight: "220px" }}
                    placeholder={t.home.pyPlaceholder}
                  />
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-3 border-t border-white/10 bg-[#0c0d1f] px-4 py-3">
                  <button
                    type="button"
                    onClick={handleRun}
                    disabled={isBusy || overLimit || code.trim().length === 0}
                    className={cn(
                      "group inline-flex items-center gap-2 rounded-full bg-avanza-green px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_8px_24px_-10px_rgba(46,204,113,0.7)] transition-all duration-200",
                      "hover:scale-[1.04] hover:bg-emerald-400",
                      "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100",
                    )}
                  >
                    {isBusy ? (
                      <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" />
                    ) : (
                      <Play className="h-4 w-4 fill-white" />
                    )}
                    {status === "loading"
                      ? t.home.pyWarming
                      : status === "running"
                        ? t.home.pyRunning
                        : t.home.pyRun}
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={isBusy}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2.5 text-xs font-bold text-white/70 transition-colors hover:bg-white/15 hover:text-white disabled:opacity-50"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {t.home.pyClear}
                  </button>
                  {overLimit && (
                    <span className="ml-auto text-[11px] font-bold uppercase tracking-wider text-red-300">
                      {t.home.pyTooLong}
                    </span>
                  )}
                </div>
              </div>

              {/* Snippet chips */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {t.home.pyTryThese}
                </span>
                {(Object.keys(snippets) as SnippetKey[]).map((key, i) => {
                  const tones = [
                    "bg-avanza-green text-white",
                    "bg-avanza-purple text-white",
                    "bg-avanza-orange text-white",
                  ]
                  const tilts = ["-rotate-[1.4deg]", "rotate-[1deg]", "-rotate-[0.6deg]"]
                  const isActive = activeSnippet === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSnippet(key)}
                      aria-pressed={isActive}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider shadow-md transition-transform duration-200 hover:scale-[1.05]",
                        tones[i],
                        tilts[i],
                        isActive && "ring-2 ring-avanza-dark/50 ring-offset-2 ring-offset-[#fff8e8]",
                      )}
                    >
                      {snippets[key].label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Output card */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[28px] bg-avanza-dark/8 [transform:rotate(0.7deg)]"
              />
              <div className="relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_28px_64px_-30px_rgba(26,26,46,0.35)] ring-1 ring-avanza-dark/10">
                <div className="flex items-center justify-between gap-3 border-b border-avanza-dark/10 bg-[#fafff5] px-5 py-3">
                  <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-avanza-dark/75">
                    <Terminal className="h-3.5 w-3.5 text-avanza-green" />
                    {t.home.pyOutputTitle}
                  </span>
                  <StatusPill status={status} t={t} />
                </div>

                <div className="relative flex flex-1 flex-col gap-3 overflow-auto p-5 font-mono text-[13px] leading-[1.55]">
                  {status === "loading" && (
                    <div className="flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-amber-800 ring-1 ring-amber-200">
                      <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" />
                      <span className="font-bold">{t.home.pyWarmingLong}</span>
                    </div>
                  )}

                  {output && (
                    <pre className="m-0 whitespace-pre-wrap break-words text-avanza-dark">
                      {output}
                    </pre>
                  )}

                  {errorOutput && (
                    <pre className="m-0 whitespace-pre-wrap break-words rounded-2xl bg-red-50 px-4 py-3 text-red-700 ring-1 ring-red-200">
                      {errorOutput}
                    </pre>
                  )}

                  {!output && !errorOutput && status !== "loading" && (
                    <p className="text-sm font-semibold text-muted-foreground">
                      {t.home.pyOutputEmpty}
                    </p>
                  )}
                </div>

                <div className="border-t border-avanza-dark/10 bg-white px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {t.home.pySandboxNote}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function StatusPill({
  status,
  t,
}: {
  status: "idle" | "loading" | "running" | "ready"
  t: ReturnType<typeof useLanguage>["t"]
}) {
  const map: Record<typeof status, { label: string; tone: string; dot: string }> = {
    idle: {
      label: t.home.pyStatusIdle,
      tone: "bg-avanza-dark/8 text-avanza-dark/65",
      dot: "bg-avanza-dark/50",
    },
    loading: {
      label: t.home.pyStatusLoading,
      tone: "bg-amber-100 text-amber-700",
      dot: "bg-amber-500",
    },
    running: {
      label: t.home.pyStatusRunning,
      tone: "bg-avanza-green/15 text-avanza-green",
      dot: "bg-avanza-green",
    },
    ready: {
      label: t.home.pyStatusReady,
      tone: "bg-avanza-teal/15 text-avanza-teal",
      dot: "bg-avanza-teal",
    },
  }
  const v = map[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest",
        v.tone,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", v.dot)} />
      {v.label}
    </span>
  )
}

const INDENT = "    " // 4 spaces (Python convention)

/**
 * Editor key handling: smart auto-indent for Python.
 * - Enter on a line ending with ':' or '\\' adds an extra indent level.
 * - Enter normally preserves the previous line's leading whitespace.
 * - Tab inserts 4 spaces (or indents the selected lines if a range is selected).
 * - Shift+Tab dedents one level on the current line / selected lines.
 * - Backspace at the start of an indented line removes one indent level.
 */
function handleEditorKeyDown(
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  ref: React.RefObject<HTMLTextAreaElement | null>,
  setValue: (next: string) => void,
) {
  const ta = ref.current
  if (!ta) return
  const value = ta.value
  const start = ta.selectionStart
  const end = ta.selectionEnd

  const lineStart = value.lastIndexOf("\n", start - 1) + 1
  const lineEnd = value.indexOf("\n", end)
  const lineEndIdx = lineEnd === -1 ? value.length : lineEnd
  const currentLine = value.slice(lineStart, start)
  const leading = currentLine.match(/^[\t ]*/)?.[0] ?? ""

  if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
    // Determine if previous (current) line ends with `:` (block opener) or `\\`
    const beforeCursor = value.slice(lineStart, start)
    const trimmed = beforeCursor.replace(/\s+$/, "")
    const opensBlock = /[:\\]$/.test(trimmed)
    const indent = leading + (opensBlock ? INDENT : "")
    e.preventDefault()
    const next = value.slice(0, start) + "\n" + indent + value.slice(end)
    setValue(next)
    requestAnimationFrame(() => {
      const pos = start + 1 + indent.length
      ta.selectionStart = ta.selectionEnd = pos
    })
    return
  }

  if (e.key === "Tab") {
    e.preventDefault()
    // Multi-line indent / dedent if a range covers a newline
    const hasMulti = value.slice(start, end).includes("\n") || start !== end
    if (hasMulti) {
      const segStart = value.lastIndexOf("\n", start - 1) + 1
      const segEndIdx = lineEndIdx
      const segment = value.slice(segStart, segEndIdx)
      let updated: string
      if (e.shiftKey) {
        updated = segment
          .split("\n")
          .map((l) => (l.startsWith(INDENT) ? l.slice(INDENT.length) : l.replace(/^\t/, "")))
          .join("\n")
      } else {
        updated = segment
          .split("\n")
          .map((l) => INDENT + l)
          .join("\n")
      }
      const next = value.slice(0, segStart) + updated + value.slice(segEndIdx)
      setValue(next)
      const delta = updated.length - segment.length
      requestAnimationFrame(() => {
        ta.selectionStart = segStart
        ta.selectionEnd = segEndIdx + delta
      })
      return
    }
    if (e.shiftKey) {
      // Dedent current line one level
      if (currentLine.startsWith(INDENT)) {
        const next =
          value.slice(0, lineStart) +
          currentLine.slice(INDENT.length) +
          value.slice(start)
        setValue(next)
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = Math.max(
            lineStart,
            start - INDENT.length,
          )
        })
      }
      return
    }
    // Insert 4 spaces
    const next = value.slice(0, start) + INDENT + value.slice(end)
    setValue(next)
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = start + INDENT.length
    })
    return
  }

  if (e.key === "Backspace" && start === end && start > 0) {
    // If cursor is at the end of the leading whitespace and that whitespace is
    // a multiple of INDENT, eat one full indent on backspace.
    const beforeCursor = value.slice(lineStart, start)
    if (beforeCursor.length > 0 && /^[ ]+$/.test(beforeCursor) && beforeCursor.length % INDENT.length === 0) {
      e.preventDefault()
      const next = value.slice(0, start - INDENT.length) + value.slice(start)
      setValue(next)
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start - INDENT.length
      })
    }
    return
  }
}

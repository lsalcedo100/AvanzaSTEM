"use client"

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react"
import { EditorState, Compartment, Annotation, type Extension } from "@codemirror/state"
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  drawSelection,
  dropCursor,
  placeholder as cmPlaceholder,
} from "@codemirror/view"
import { history, historyKeymap, defaultKeymap, indentWithTab } from "@codemirror/commands"
import {
  indentUnit,
  indentOnInput,
  bracketMatching,
  syntaxHighlighting,
  foldGutter,
  foldKeymap,
  codeFolding,
} from "@codemirror/language"
import { python } from "@codemirror/lang-python"
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search"
import {
  autocompletion,
  completionKeymap,
  closeBrackets,
  closeBracketsKeymap,
} from "@codemirror/autocomplete"
import { lintGutter, lintKeymap, setDiagnostics, type Diagnostic } from "@codemirror/lint"
import { cn } from "@/lib/utils"
import {
  pythonEditorTheme,
  pythonHighlightStyle,
  pythonKeywordCompletions,
} from "@/components/ui/python-editor-setup"

/** A run-time error/warning the execution system located on a specific line. */
export type EditorDiagnostic = {
  /** 1-based line number in the current document. */
  line: number
  message: string
  severity?: "error" | "warning" | "info"
}

export type PythonCodeEditorProps = {
  code: string
  /** Called with the full next value whenever the user edits the code. */
  onCodeChange: (next: string) => void
  ariaLabel: string
  placeholder: string
  /** Fired on Ctrl/Cmd+Enter so the editor can trigger a run from the keyboard. */
  onRun?: () => void
  /** Fired with the 1-based caret position whenever the selection moves. */
  onCursorChange?: (pos: { line: number; column: number }) => void
  /**
   * Error/warning markers to show in the gutter and under the offending line.
   * Pass a stable (memoized) array - it is diffed by reference.
   */
  diagnostics?: readonly EditorDiagnostic[]
  /**
   * Classes for the box the editor fills. The caller sets the height here (e.g.
   * a fixed `h-105` card or a flexing `flex-1 min-h-0` IDE panel); the editor
   * fills it and reflows on resize.
   */
  containerClassName?: string
}

export type PythonCodeEditorHandle = {
  focus: () => void
  /** Move the caret to the start of a 1-based line, scroll to it, and focus. */
  goToLine: (line: number) => void
}

// Marks doc changes we push in programmatically (reset, load example, restore
// saved code) so the update listener doesn't echo them back as user edits.
const External = Annotation.define<boolean>()

function dynamicExtensions(ariaLabel: string, placeholder: string): Extension {
  return [
    cmPlaceholder(placeholder),
    EditorView.contentAttributes.of({ "aria-label": ariaLabel }),
  ]
}

/**
 * The Python editor surface, backed by CodeMirror 6. Provides real-editor
 * behavior - syntax highlighting, line numbers, auto-indent, bracket matching,
 * active-line highlight, search/replace, undo/redo, autocomplete, and gutter
 * error markers - while filling whatever height its container is given and
 * reflowing when the browser or a sibling panel resizes.
 *
 * Value is controlled: user edits flow out through {@link onCodeChange};
 * programmatic changes flow in through the `code` prop without clobbering the
 * cursor or looping. Layout-agnostic so every editor surface in the app (home
 * playground, lessons, standalone IDE) renders the same component.
 */
export const PythonCodeEditor = forwardRef<PythonCodeEditorHandle, PythonCodeEditorProps>(
  function PythonCodeEditor(
    { code, onCodeChange, ariaLabel, placeholder, onRun, onCursorChange, diagnostics, containerClassName },
    ref,
  ) {
    const hostRef = useRef<HTMLDivElement>(null)
    const viewRef = useRef<EditorView | null>(null)
    const dynamicCompartment = useMemo(() => new Compartment(), [])
    // Whether error markers from the last run are currently shown, so we can
    // drop them the moment the student edits (a fixed line shouldn't keep its
    // red underline until the next run).
    const hasDiagnosticsRef = useRef(false)

    // Keep the latest callbacks/values reachable from CodeMirror's long-lived
    // extensions without rebuilding the editor on every render.
    const onCodeChangeRef = useRef(onCodeChange)
    const onRunRef = useRef(onRun)
    const onCursorChangeRef = useRef(onCursorChange)
    const codeRef = useRef(code)
    const dynamicRef = useRef({ ariaLabel, placeholder })
    onCodeChangeRef.current = onCodeChange
    onRunRef.current = onRun
    onCursorChangeRef.current = onCursorChange
    codeRef.current = code
    dynamicRef.current = { ariaLabel, placeholder }

    useImperativeHandle(ref, () => ({
      focus: () => viewRef.current?.focus(),
      goToLine: (line: number) => {
        const view = viewRef.current
        if (!view) return
        const lineNo = Math.min(Math.max(Math.trunc(line), 1), view.state.doc.lines)
        const target = view.state.doc.line(lineNo)
        view.dispatch({ selection: { anchor: target.from }, scrollIntoView: true })
        view.focus()
      },
    }))

    // Create the editor once. Later prop changes reconfigure it in place.
    useEffect(() => {
      const host = hostRef.current
      if (!host) return

      const state = EditorState.create({
        doc: codeRef.current,
        extensions: [
          lineNumbers(),
          highlightActiveLineGutter(),
          foldGutter(),
          history(),
          drawSelection(),
          dropCursor(),
          EditorState.allowMultipleSelections.of(true),
          indentUnit.of("    "),
          EditorState.tabSize.of(4),
          python(),
          // Re-indent the current line as you type block keywords like `else:`
          // / `elif:` (Enter-to-indent already comes from the default keymap).
          indentOnInput(),
          pythonKeywordCompletions,
          syntaxHighlighting(pythonHighlightStyle),
          bracketMatching(),
          closeBrackets(),
          autocompletion(),
          highlightActiveLine(),
          highlightSelectionMatches(),
          codeFolding(),
          lintGutter(),
          keymap.of([
            {
              key: "Mod-Enter",
              preventDefault: true,
              run: () => {
                onRunRef.current?.()
                return true
              },
            },
            indentWithTab,
            ...closeBracketsKeymap,
            ...searchKeymap,
            ...historyKeymap,
            ...foldKeymap,
            ...completionKeymap,
            ...lintKeymap,
            ...defaultKeymap,
          ]),
          pythonEditorTheme,
          dynamicCompartment.of(
            dynamicExtensions(dynamicRef.current.ariaLabel, dynamicRef.current.placeholder),
          ),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const isExternal = update.transactions.some((tr) => tr.annotation(External))
              if (!isExternal) {
                onCodeChangeRef.current(update.state.doc.toString())
                // Editing invalidates last run's error markers - clear them so a
                // now-correct line drops its underline. Deferred: a listener may
                // not dispatch during an update.
                if (hasDiagnosticsRef.current) {
                  hasDiagnosticsRef.current = false
                  queueMicrotask(() => {
                    const v = viewRef.current
                    if (v) v.dispatch(setDiagnostics(v.state, []))
                  })
                }
              }
            }
            if (update.docChanged || update.selectionSet) {
              const head = update.state.selection.main.head
              const line = update.state.doc.lineAt(head)
              onCursorChangeRef.current?.({ line: line.number, column: head - line.from + 1 })
            }
          }),
        ],
      })

      const view = new EditorView({ state, parent: host })
      viewRef.current = view
      return () => {
        view.destroy()
        viewRef.current = null
      }
    }, [dynamicCompartment])

    // Push external `code` changes (reset, load example, restore saved) into the
    // editor without echoing them back as edits.
    useEffect(() => {
      const view = viewRef.current
      if (!view) return
      const current = view.state.doc.toString()
      if (code === current) return
      view.dispatch({
        changes: { from: 0, to: current.length, insert: code },
        annotations: External.of(true),
      })
    }, [code])

    // Keep the screen-reader label and placeholder in sync (e.g. on locale change).
    useEffect(() => {
      const view = viewRef.current
      if (!view) return
      view.dispatch({
        effects: dynamicCompartment.reconfigure(dynamicExtensions(ariaLabel, placeholder)),
      })
    }, [ariaLabel, placeholder, dynamicCompartment])

    // Reflect execution-system error markers in the gutter / under the line.
    useEffect(() => {
      const view = viewRef.current
      if (!view) return
      const docLines = view.state.doc.lines
      const cmDiags: Diagnostic[] = (diagnostics ?? []).map((d) => {
        const lineNo = Math.min(Math.max(Math.trunc(d.line), 1), docLines)
        const line = view.state.doc.line(lineNo)
        return { from: line.from, to: line.to, severity: d.severity ?? "error", message: d.message }
      })
      view.dispatch(setDiagnostics(view.state, cmDiags))
      hasDiagnosticsRef.current = cmDiags.length > 0
    }, [diagnostics])

    return (
      <div className={cn("relative min-w-0 overflow-hidden", containerClassName)}>
        <div ref={hostRef} className="h-full" />
      </div>
    )
  },
)

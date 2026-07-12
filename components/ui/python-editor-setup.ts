import { EditorView } from "@codemirror/view"
import { HighlightStyle } from "@codemirror/language"
import { pythonLanguage } from "@codemirror/lang-python"
import { completeFromList, type CompletionSource } from "@codemirror/autocomplete"
import { tags as t } from "@lezer/highlight"

/**
 * Dark editor theme for the in-browser Python editor. Tuned to sit inside the
 * app's charcoal-navy panels (#0f1120) and reuse the same accent colours as the
 * rest of the workspace (avanza-green cursor/selection, subtle gutters). Kept
 * beginner-calm: no glows, thin lines, comfortable line height.
 */
export const pythonEditorTheme = EditorView.theme(
  {
    "&": {
      color: "#d8dee9",
      backgroundColor: "transparent",
      height: "100%",
      fontSize: "14px",
    },
    "&.cm-focused": {
      outline: "2px solid rgba(46,204,113,0.55)",
      outlineOffset: "-2px",
    },
    ".cm-scroller": {
      fontFamily: "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
      lineHeight: "1.6",
      overflow: "auto",
    },
    ".cm-content": {
      caretColor: "#2ecc71",
      padding: "12px 0",
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: "#2ecc71",
      borderLeftWidth: "2px",
    },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection": {
      backgroundColor: "rgba(120,144,255,0.28)",
    },
    ".cm-gutters": {
      backgroundColor: "#0c0d1f",
      color: "rgba(255,255,255,0.28)",
      border: "none",
    },
    ".cm-lineNumbers .cm-gutterElement": {
      padding: "0 0.75rem 0 1rem",
      minWidth: "2.5ch",
    },
    ".cm-foldGutter .cm-gutterElement": {
      color: "rgba(255,255,255,0.3)",
    },
    ".cm-activeLine": {
      backgroundColor: "rgba(255,255,255,0.035)",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "rgba(255,255,255,0.04)",
      color: "rgba(255,255,255,0.55)",
    },
    ".cm-matchingBracket, &.cm-focused .cm-matchingBracket": {
      backgroundColor: "rgba(46,204,113,0.25)",
      outline: "1px solid rgba(46,204,113,0.45)",
      color: "inherit",
    },
    ".cm-selectionMatch": {
      backgroundColor: "rgba(46,204,113,0.14)",
    },
    ".cm-placeholder": {
      color: "rgba(255,255,255,0.28)",
    },
    // Search / replace panel + autocomplete + lint tooltips, matched to the
    // dark toolbar surfaces so they never look bolted on.
    ".cm-panels": {
      backgroundColor: "#161927",
      color: "#d8dee9",
    },
    ".cm-panels.cm-panels-bottom": {
      borderTop: "1px solid #242838",
    },
    ".cm-panel.cm-search": {
      padding: "6px 8px",
    },
    ".cm-panel.cm-search input, .cm-panel.cm-search button, .cm-panel.cm-search label": {
      fontFamily: "var(--font-sans), system-ui, sans-serif",
      fontSize: "12px",
    },
    ".cm-panel.cm-search input": {
      backgroundColor: "#0f1120",
      color: "#d8dee9",
      border: "1px solid #2b3042",
      borderRadius: "4px",
      padding: "2px 6px",
    },
    ".cm-panel.cm-search button": {
      backgroundColor: "#242838",
      color: "#d8dee9",
      border: "1px solid #2b3042",
      borderRadius: "4px",
      cursor: "pointer",
    },
    ".cm-panel.cm-search button[name='close']": {
      color: "rgba(255,255,255,0.6)",
    },
    ".cm-tooltip": {
      backgroundColor: "#161927",
      border: "1px solid #2b3042",
      borderRadius: "6px",
      color: "#d8dee9",
    },
    ".cm-tooltip.cm-tooltip-autocomplete > ul": {
      fontFamily: "var(--font-mono), ui-monospace, monospace",
      fontSize: "13px",
    },
    ".cm-tooltip.cm-tooltip-autocomplete > ul > li[aria-selected]": {
      backgroundColor: "rgba(46,204,113,0.22)",
      color: "#ffffff",
    },
    ".cm-tooltip.cm-completionInfo": {
      backgroundColor: "#161927",
    },
    ".cm-diagnosticText": {
      fontFamily: "var(--font-sans), system-ui, sans-serif",
    },
  },
  { dark: true },
)

/**
 * Syntax colours matched to the previous hand-rolled highlighter so the editor
 * keeps its familiar look after the CodeMirror swap.
 */
export const pythonHighlightStyle = HighlightStyle.define([
  { tag: t.comment, color: "#6b7688" },
  { tag: [t.string, t.special(t.string), t.docString], color: "#c3e88d" },
  { tag: [t.number, t.integer, t.float], color: "#82aaff" },
  { tag: [t.bool, t.null, t.atom], color: "#82aaff" },
  {
    tag: [t.keyword, t.controlKeyword, t.moduleKeyword, t.operatorKeyword, t.definitionKeyword, t.self],
    color: "#c792ea",
  },
  { tag: [t.function(t.variableName), t.function(t.propertyName)], color: "#82aaff" },
  { tag: [t.className, t.typeName, t.namespace], color: "#61afef" },
  { tag: [t.variableName, t.propertyName, t.attributeName, t.labelName], color: "#d7aefb" },
  { tag: [t.operator, t.arithmeticOperator, t.logicOperator, t.compareOperator], color: "#f78c6c" },
  { tag: [t.bracket, t.paren, t.squareBracket, t.brace, t.punctuation], color: "#8b93a7" },
  { tag: t.invalid, color: "#ff5370" },
])

// Common beginner keywords and builtins, offered alongside CodeMirror's own
// local-identifier completions. Deliberately small - this is a learning editor,
// not a full IDE, so we surface what a beginner actually reaches for.
const PY_KEYWORDS = [
  "False", "None", "True", "and", "as", "assert", "break", "class", "continue",
  "def", "del", "elif", "else", "except", "finally", "for", "from", "global",
  "if", "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass",
  "raise", "return", "try", "while", "with", "yield",
]

const PY_BUILTINS = [
  "print", "input", "len", "range", "str", "int", "float", "bool", "list",
  "dict", "set", "tuple", "type", "sum", "max", "min", "sorted", "reversed",
  "enumerate", "zip", "map", "filter", "abs", "round", "isinstance", "open",
]

const keywordCompletion: CompletionSource = completeFromList([
  ...PY_KEYWORDS.map((label) => ({ label, type: "keyword" })),
  ...PY_BUILTINS.map((label) => ({ label, type: "function" })),
])

/** Registers the keyword/builtin completions with the Python language. */
export const pythonKeywordCompletions = pythonLanguage.data.of({
  autocomplete: keywordCompletion,
})

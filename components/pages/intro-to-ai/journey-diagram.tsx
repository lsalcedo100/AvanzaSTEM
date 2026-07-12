/**
 * Purposeful, accessible course illustration for Intro to AI.
 *
 * A restrained diagrammatic composition — NOT AI-marketing imagery. It shows the
 * four things students actually do in this course: label example data, split it
 * into training and testing, read a prediction, and find and fix a mistake. Pure
 * inline SVG (no next/image, no external asset), theme-aware via `currentColor`,
 * and completely static so it is identical under reduced motion. The accessible
 * label describes all four steps for screen readers.
 */

const STEP_LABEL = "The course in four steps: label example data, split it into training and testing, read a prediction, and find and fix a mistake."

export function JourneyDiagram({ variant = "full", className }: { variant?: "full" | "card"; className?: string }) {
  const compact = variant === "card"
  return (
    <div className={className}>
      <svg
        viewBox="0 0 400 150"
        role="img"
        aria-label={STEP_LABEL}
        className="h-full w-full"
        preserveAspectRatio={compact ? "xMidYMid slice" : "xMidYMid meet"}
      >
        <title>{STEP_LABEL}</title>

        {/* connecting arrows */}
        <g className="text-border" stroke="currentColor" strokeWidth="1.5" fill="none">
          <line x1="92" y1="60" x2="108" y2="60" />
          <line x1="192" y1="60" x2="208" y2="60" />
          <line x1="292" y1="60" x2="308" y2="60" />
        </g>
        <g className="text-muted-foreground" fill="currentColor" aria-hidden>
          <polygon points="108,56 108,64 114,60" />
          <polygon points="208,56 208,64 214,60" />
          <polygon points="308,56 308,64 314,60" />
        </g>

        {/* 1 · Label — a small data table with a tag */}
        <g transform="translate(20,24)">
          <rect x="0" y="0" width="72" height="52" rx="6" className="text-border" stroke="currentColor" fill="none" strokeWidth="1.5" />
          <g className="text-muted-foreground" stroke="currentColor" strokeWidth="1">
            <line x1="0" y1="17" x2="72" y2="17" />
            <line x1="0" y1="34" x2="72" y2="34" />
            <line x1="36" y1="0" x2="36" y2="52" />
          </g>
          <g className="text-avanza-green" fill="currentColor">
            <rect x="44" y="6" width="20" height="7" rx="3.5" />
            <rect x="44" y="23" width="20" height="7" rx="3.5" />
            <rect x="44" y="40" width="20" height="7" rx="3.5" opacity="0.55" />
          </g>
        </g>

        {/* 2 · Train / Test — a split box */}
        <g transform="translate(120,24)">
          <rect x="0" y="0" width="72" height="52" rx="6" className="text-border" stroke="currentColor" fill="none" strokeWidth="1.5" />
          <g className="text-avanza-teal" fill="currentColor">
            <rect x="6" y="8" width="40" height="36" rx="3" opacity="0.35" />
          </g>
          <g className="text-avanza-purple" fill="currentColor">
            <rect x="50" y="8" width="16" height="36" rx="3" opacity="0.4" />
          </g>
        </g>

        {/* 3 · Predict — a result with a check */}
        <g transform="translate(220,24)">
          <rect x="0" y="0" width="72" height="52" rx="6" className="text-border" stroke="currentColor" fill="none" strokeWidth="1.5" />
          <g className="text-muted-foreground" stroke="currentColor" strokeWidth="1.5" fill="none">
            <circle cx="24" cy="26" r="13" />
          </g>
          <g className="text-avanza-green" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18,26 22,31 31,20" />
          </g>
          <g className="text-muted-foreground" fill="currentColor">
            <rect x="44" y="18" width="22" height="5" rx="2.5" />
            <rect x="44" y="28" width="16" height="5" rx="2.5" opacity="0.6" />
          </g>
        </g>

        {/* 4 · Fix a mistake — an X corrected to a check */}
        <g transform="translate(320,24)">
          <rect x="0" y="0" width="60" height="52" rx="6" className="text-border" stroke="currentColor" fill="none" strokeWidth="1.5" />
          <g className="text-avanza-orange" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <line x1="12" y1="18" x2="24" y2="30" />
            <line x1="24" y1="18" x2="12" y2="30" />
          </g>
          <g className="text-muted-foreground" aria-hidden stroke="currentColor" strokeWidth="1.5" fill="none">
            <line x1="30" y1="24" x2="38" y2="24" />
            <polygon points="38,21 38,27 43,24" fill="currentColor" stroke="none" />
          </g>
          <g className="text-avanza-green" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="45,24 49,29 56,19" />
          </g>
        </g>

        {/* step labels */}
        <g className="text-foreground" fill="currentColor" fontSize="9" fontWeight="600" textAnchor="middle">
          <text x="56" y="92">Label</text>
          <text x="156" y="92">Train / Test</text>
          <text x="256" y="92">Predict</text>
          <text x="350" y="92">Fix mistakes</text>
        </g>
        {!compact && (
          <text x="200" y="118" className="text-muted-foreground" fill="currentColor" fontSize="9" textAnchor="middle">
            A hands-on path through how AI systems really work
          </text>
        )}
      </svg>
    </div>
  )
}

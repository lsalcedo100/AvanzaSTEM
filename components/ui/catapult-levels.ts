import type { ProjectileKind, Rect, Vec } from "./catapult-physics"

export type Movement = {
  axis: "x" | "y"
  amplitude: number
  period: number
  phase?: number
}

export type TargetDefinition = {
  id: string
  x: number
  y: number
  radius: number
  movement?: Movement
}

export type ObstacleDefinition = Rect & {
  id: string
  kind: "solid" | "weak" | "bounce"
  rotation?: number
  movement?: Movement
}

export type LevelDefinition = {
  name: string
  objective: string
  hint?: string
  shotLimit: number
  targets: TargetDefinition[]
  obstacles: ObstacleDefinition[]
  allowedProjectiles: ProjectileKind[]
  startAngle: number
  startPower: number
  startProjectile?: ProjectileKind
  prediction: "full" | "partial"
}

export const LEVELS: LevelDefinition[] = [
  {
    name: "First Line",
    objective: "Drag from the launcher and clear the near target.",
    hint: "Release the drag to fire. The gray path previews the shot.",
    shotLimit: 3,
    allowedProjectiles: ["standard"],
    startAngle: 34,
    startPower: 29,
    prediction: "full",
    obstacles: [],
    targets: [{ id: "intro-plate", x: 42, y: 4.4, radius: 2.6 }],
  },
  {
    name: "Range Check",
    objective: "Clear three distances with four shots.",
    hint: "Small power changes matter more than they look.",
    shotLimit: 4,
    allowedProjectiles: ["standard"],
    startAngle: 36,
    startPower: 31,
    prediction: "full",
    obstacles: [],
    targets: [
      { id: "near-low", x: 39, y: 4.3, radius: 2.35 },
      { id: "mid-rise", x: 59, y: 10.8, radius: 2.35 },
      { id: "far-low", x: 79, y: 4.4, radius: 2.35 },
    ],
  },
  {
    name: "High Window",
    objective: "Use a higher arc to reach the raised plate.",
    hint: "More angle, not just more power.",
    shotLimit: 4,
    allowedProjectiles: ["standard", "light"],
    startAngle: 61,
    startPower: 37,
    prediction: "full",
    obstacles: [{ id: "low-lip", kind: "solid", x: 47, y: 0, width: 5, height: 11 }],
    targets: [
      { id: "window", x: 62, y: 29, radius: 2.7 },
      { id: "drop", x: 86, y: 8.5, radius: 2.4 },
    ],
  },
  {
    name: "Covered Yard",
    objective: "Arc over the wall and clear the yard.",
    hint: "A direct shot is covered. Try a high arc or a controlled bounce.",
    shotLimit: 5,
    allowedProjectiles: ["standard", "light", "bouncy"],
    startAngle: 62,
    startPower: 45,
    prediction: "full",
    obstacles: [{ id: "front-wall", kind: "solid", x: 43, y: 0, width: 5, height: 21 }],
    targets: [
      { id: "behind-wall", x: 70, y: 5.2, radius: 2.5 },
      { id: "back-ledge", x: 90, y: 14, radius: 2.4 },
    ],
  },
  {
    name: "Open Reach",
    objective: "Clear the staggered plates across the open field.",
    hint: "Use projectile choice to manage distance and arc.",
    shotLimit: 5,
    allowedProjectiles: ["standard", "heavy", "light"],
    startAngle: 43,
    startPower: 34,
    prediction: "partial",
    obstacles: [],
    targets: [
      { id: "reach-a", x: 52, y: 7, radius: 2.3 },
      { id: "reach-b", x: 75, y: 17, radius: 2.4 },
      { id: "reach-c", x: 100, y: 7, radius: 2.5 },
    ],
  },
  {
    name: "Moving Line",
    objective: "Time the moving plate, then finish the far mark.",
    hint: "The path is fixed. Waiting can be better than forcing the shot.",
    shotLimit: 5,
    allowedProjectiles: ["standard"],
    startAngle: 46,
    startPower: 38,
    prediction: "partial",
    obstacles: [{ id: "low-block", kind: "solid", x: 48, y: 0, width: 9, height: 7 }],
    targets: [
      {
        id: "slider",
        x: 73,
        y: 14,
        radius: 2.7,
        movement: { axis: "x", amplitude: 11, period: 3.4, phase: 0.3 },
      },
      { id: "fixed-far", x: 98, y: 6.5, radius: 2.5 },
    ],
  },
  {
    name: "Weak Cover",
    objective: "Break the weak cover and clear the plate behind it.",
    hint: "Heavy shots travel with more mass and can break weak cover.",
    shotLimit: 3,
    allowedProjectiles: ["heavy"],
    startAngle: 50,
    startPower: 43,
    startProjectile: "heavy",
    prediction: "partial",
    obstacles: [
      { id: "weak-cover", kind: "weak", x: 59, y: 0, width: 6, height: 12 },
      { id: "high-cover", kind: "solid", x: 82, y: 0, width: 5, height: 17 },
    ],
    targets: [
      { id: "front", x: 48, y: 5.2, radius: 2.35 },
      { id: "covered", x: 72, y: 5.5, radius: 2.35 },
      { id: "high", x: 101, y: 22, radius: 2.6 },
    ],
  },
  {
    name: "Bank Shot",
    objective: "Use one bounce to reach the covered plate.",
    hint: "The bounce preview is approximate but uses the same surface rules.",
    shotLimit: 4,
    allowedProjectiles: ["bouncy"],
    startAngle: 28,
    startPower: 46,
    startProjectile: "bouncy",
    prediction: "full",
    obstacles: [
      { id: "screen", kind: "solid", x: 56, y: 0, width: 5, height: 18 },
      { id: "angled-screen", kind: "solid", x: 69.5, y: 25, width: 22, height: 3.2, rotation: 60 },
      { id: "bank-pad", kind: "bounce", x: 66, y: 0, width: 16, height: 2.8 },
    ],
    targets: [{ id: "bank-target", x: 91, y: 17.5, radius: 2.55 }],
  },
  {
    name: "Narrow Margin",
    objective: "Choose the clean route through the gap.",
    hint: "Standard is direct, light floats, bouncy can recover from a shallow miss.",
    shotLimit: 5,
    allowedProjectiles: ["standard", "light", "bouncy"],
    startAngle: 42,
    startPower: 41,
    prediction: "partial",
    obstacles: [
      { id: "lower-gate", kind: "solid", x: 53, y: 0, width: 5, height: 15 },
      { id: "upper-gate", kind: "solid", x: 53, y: 26, width: 5, height: 18 },
      {
        id: "sliding-block",
        kind: "solid",
        x: 73,
        y: 0,
        width: 5,
        height: 12,
        movement: { axis: "y", amplitude: 5, period: 3.2, phase: 1.1 },
      },
    ],
    targets: [
      { id: "gap-mid", x: 76, y: 20.5, radius: 2.35 },
      { id: "gap-far", x: 101, y: 7, radius: 2.45 },
    ],
  },
  {
    name: "High Side",
    objective: "Clear the high plate behind the mid cover.",
    hint: "Light shots can reach higher arcs; heavy shots punch through lower lines.",
    shotLimit: 4,
    allowedProjectiles: ["standard", "heavy", "light"],
    startAngle: 50,
    startPower: 45,
    prediction: "partial",
    obstacles: [
      { id: "mid-cover", kind: "solid", x: 61, y: 0, width: 5, height: 18 },
    ],
    targets: [
      { id: "side-high", x: 82, y: 27, radius: 2.55 },
      { id: "side-low", x: 103, y: 6, radius: 2.45 },
    ],
  },
  {
    name: "Thread the Needle",
    objective: "Find the clean routes through the split gate.",
    hint: "One target wants a flatter line. The other needs a taller arc.",
    shotLimit: 4,
    allowedProjectiles: ["standard", "light"],
    startAngle: 43,
    startPower: 39,
    prediction: "partial",
    obstacles: [
      { id: "lower-needle", kind: "solid", x: 55, y: 0, width: 4, height: 13 },
      { id: "upper-needle", kind: "solid", x: 55, y: 25, width: 4, height: 18 },
      { id: "back-stop", kind: "solid", x: 88, y: 0, width: 4, height: 14 },
    ],
    targets: [
      { id: "needle-high", x: 70, y: 20, radius: 2.45 },
      { id: "needle-low", x: 99, y: 6.2, radius: 2.45 },
    ],
  },
  {
    name: "Drop Zone",
    objective: "Work around the roof and clear the far skip zone.",
    hint: "A low shot can slide under the roof. A taller shot can drop over it.",
    shotLimit: 5,
    allowedProjectiles: ["standard", "light", "bouncy"],
    startAngle: 34,
    startPower: 40,
    prediction: "partial",
    obstacles: [
      { id: "roof", kind: "solid", x: 48, y: 18, width: 30, height: 4 },
      { id: "right-wall", kind: "solid", x: 83, y: 0, width: 5, height: 20 },
      { id: "skip-pad", kind: "bounce", x: 91, y: 0, width: 14, height: 2.8 },
    ],
    targets: [
      { id: "under-roof", x: 63, y: 7, radius: 2.35 },
      { id: "over-roof", x: 82, y: 27, radius: 2.5 },
      { id: "skip-end", x: 108, y: 11, radius: 2.5 },
    ],
  },
  {
    name: "Hammer Gate",
    objective: "Break the gate, then solve the pocket behind it.",
    hint: "Heavy shots can break weak cover, but they need more careful aim.",
    shotLimit: 5,
    allowedProjectiles: ["heavy", "standard", "light"],
    startAngle: 48,
    startPower: 43,
    startProjectile: "heavy",
    prediction: "partial",
    obstacles: [
      { id: "weak-gate", kind: "weak", x: 52, y: 0, width: 5, height: 16 },
      { id: "upper-cap", kind: "solid", x: 68, y: 22, width: 22, height: 4 },
      { id: "back-wall", kind: "solid", x: 91, y: 0, width: 5, height: 19 },
    ],
    targets: [
      { id: "gate-front", x: 43, y: 5.3, radius: 2.35 },
      { id: "gate-pocket", x: 63, y: 6.2, radius: 2.35 },
      { id: "cap-high", x: 84, y: 31, radius: 2.6 },
      { id: "back-low", x: 105, y: 5.8, radius: 2.45 },
    ],
  },
  {
    name: "Elevator Plates",
    objective: "Read the moving plates and choose a launch window.",
    hint: "The plate paths repeat. Wait for a clean line before firing.",
    shotLimit: 5,
    allowedProjectiles: ["standard", "light"],
    startAngle: 45,
    startPower: 38,
    prediction: "partial",
    obstacles: [
      { id: "center-post", kind: "solid", x: 61, y: 0, width: 4, height: 18 },
      { id: "far-post", kind: "solid", x: 90, y: 0, width: 4, height: 15 },
    ],
    targets: [
      {
        id: "lift-one",
        x: 50,
        y: 16,
        radius: 2.7,
        movement: { axis: "y", amplitude: 5, period: 3.2, phase: 0.4 },
      },
      {
        id: "lift-two",
        x: 76,
        y: 24,
        radius: 2.7,
        movement: { axis: "y", amplitude: 6, period: 3.8, phase: 1.2 },
      },
      { id: "lift-three", x: 104, y: 12, radius: 2.5 },
    ],
  },
  {
    name: "Ricochet Alley",
    objective: "Use the bounce pad to reach plates tucked behind cover.",
    hint: "Bouncy shots lose speed after impact, so angle matters as much as power.",
    shotLimit: 5,
    allowedProjectiles: ["bouncy", "standard"],
    startAngle: 29,
    startPower: 43,
    startProjectile: "bouncy",
    prediction: "full",
    obstacles: [
      { id: "front-screen", kind: "solid", x: 48, y: 0, width: 5, height: 17 },
      { id: "alley-pad", kind: "bounce", x: 58, y: 0, width: 20, height: 2.8 },
      { id: "rear-screen", kind: "solid", x: 82, y: 0, width: 5, height: 18 },
    ],
    targets: [
      { id: "alley-mid", x: 72, y: 13, radius: 2.55 },
      { id: "alley-far", x: 101, y: 20, radius: 2.55 },
    ],
  },
  {
    name: "Final Line",
    objective: "Use cover, bounce, and limited shots to clear every plate.",
    hint: "Break the weak cover when it matters. Save a shot for the moving plate.",
    shotLimit: 5,
    allowedProjectiles: ["standard", "heavy", "light", "bouncy"],
    startAngle: 47,
    startPower: 42,
    prediction: "partial",
    obstacles: [
      { id: "weak-front", kind: "weak", x: 50, y: 0, width: 5, height: 12 },
      { id: "tall-cover", kind: "solid", x: 74, y: 0, width: 5, height: 21 },
      { id: "late-bank", kind: "bounce", x: 88, y: 0, width: 12, height: 2.8 },
    ],
    targets: [
      { id: "final-near", x: 61, y: 5.5, radius: 2.35 },
      {
        id: "final-moving",
        x: 84,
        y: 17.5,
        radius: 2.55,
        movement: { axis: "x", amplitude: 8, period: 3.6, phase: 0.7 },
      },
      { id: "final-far", x: 108, y: 9.5, radius: 2.45 },
    ],
  },
  {
    name: "Fast Double",
    objective: "Clear the paired lane with one shot, then finish the high crest before the time bonus fades.",
    hint: "The first two plates sit on the same low arc. Save the second shot for the crest.",
    shotLimit: 2,
    allowedProjectiles: ["standard", "light"],
    startAngle: 32,
    startPower: 39,
    startProjectile: "standard",
    prediction: "full",
    obstacles: [],
    targets: [
      { id: "double-lane-a", x: 58, y: 23.2, radius: 2.35 },
      { id: "double-lane-b", x: 66, y: 24.3, radius: 2.35 },
      { id: "crest-finish", x: 92, y: 44.8, radius: 2.45 },
    ],
  },
  {
    name: "Shutter Window",
    objective: "Wait for the shutter to drop out of the lane, then thread the target behind it.",
    hint: "Firing right away blocks on the shutter. Watch one cycle before committing.",
    shotLimit: 2,
    allowedProjectiles: ["standard"],
    startAngle: 20,
    startPower: 45,
    prediction: "partial",
    obstacles: [
      { id: "shutter-lower-frame", kind: "solid", x: 54, y: 0, width: 4, height: 12 },
      { id: "shutter-upper-frame", kind: "solid", x: 54, y: 20, width: 4, height: 24 },
      {
        id: "shutter-block",
        kind: "solid",
        x: 65,
        y: 11,
        width: 5,
        height: 10,
        movement: { axis: "y", amplitude: 8, period: 3.2 },
      },
    ],
    targets: [{ id: "shutter-mark", x: 90, y: 14.5, radius: 2.45 }],
  },
  {
    name: "Ceiling Kiss",
    objective: "Clip the underside pad so the bouncy shot drops into the covered pocket.",
    hint: "A direct line rides too high; the ceiling bounce turns it downward.",
    shotLimit: 2,
    allowedProjectiles: ["bouncy"],
    startAngle: 28,
    startPower: 48,
    startProjectile: "bouncy",
    prediction: "full",
    obstacles: [
      { id: "ceiling-front-wall", kind: "solid", x: 52, y: 0, width: 4, height: 17 },
      { id: "ceiling-pocket-wall", kind: "solid", x: 75, y: 0, width: 4, height: 18 },
      { id: "ceiling-pad", kind: "bounce", x: 61, y: 24, width: 22, height: 3 },
      { id: "ceiling-back-stop", kind: "solid", x: 89, y: 0, width: 4, height: 18 },
    ],
    targets: [{ id: "ceiling-pocket", x: 83, y: 18.3, radius: 2.45 }],
  },
  {
    name: "Breaker Hatch",
    objective: "Use heavy force to crack the low hatch, then finish the high tag with a light arc.",
    hint: "Light cannot open the pocket; heavy clears the lid and keeps moving.",
    shotLimit: 3,
    allowedProjectiles: ["heavy", "light"],
    startAngle: 24,
    startPower: 42,
    startProjectile: "heavy",
    prediction: "partial",
    obstacles: [
      { id: "hatch-front-fence", kind: "solid", x: 50, y: 0, width: 5, height: 11 },
      { id: "weak-hatch-lid", kind: "weak", x: 55, y: 12, width: 28, height: 4 },
      { id: "hatch-back-post", kind: "solid", x: 87, y: 0, width: 5, height: 18 },
    ],
    targets: [
      { id: "hatch-pocket", x: 78, y: 6, radius: 2.45 },
      { id: "hatch-upper-tag", x: 101, y: 31, radius: 2.5 },
    ],
  },
  {
    name: "Rising Slot",
    objective: "Time the plate as it rides through the narrow slot.",
    hint: "The lane is fixed. Wait until the rider crosses the previewed arc.",
    shotLimit: 2,
    allowedProjectiles: ["standard"],
    startAngle: 28,
    startPower: 40,
    prediction: "partial",
    obstacles: [
      { id: "slot-lower-stack", kind: "solid", x: 57, y: 0, width: 5, height: 17 },
      { id: "slot-upper-stack", kind: "solid", x: 57, y: 23, width: 5, height: 23 },
      { id: "slot-back-rail", kind: "solid", x: 96, y: 0, width: 4, height: 16 },
    ],
    targets: [
      {
        id: "slot-rider",
        x: 86,
        y: 20,
        radius: 2.25,
        movement: { axis: "y", amplitude: 8, period: 3.4, phase: 1.5 },
      },
    ],
  },
  {
    name: "Runway Skip",
    objective: "Clear the close switch, then use a low bounce to skip over the screen quickly.",
    hint: "The bouncy shot should spend its bounce on the runway before the far plate.",
    shotLimit: 3,
    allowedProjectiles: ["standard", "bouncy"],
    startAngle: 10,
    startPower: 41,
    startProjectile: "standard",
    prediction: "full",
    obstacles: [
      { id: "runway-pad", kind: "bounce", x: 48, y: 0, width: 24, height: 2.8 },
      { id: "runway-screen", kind: "solid", x: 75, y: 0, width: 5, height: 12 },
      { id: "runway-high-rail", kind: "solid", x: 52, y: 22, width: 28, height: 3 },
    ],
    targets: [
      { id: "runway-near-switch", x: 43, y: 8, radius: 2.35 },
      { id: "runway-skip-target", x: 94, y: 13, radius: 2.55 },
    ],
  },
  {
    name: "Toolbox Fork",
    objective: "Match each plate to the right tool: flat, heavy, and light.",
    hint: "Standard handles the flat switch, heavy breaks the brace, and light reaches the high drift.",
    shotLimit: 3,
    allowedProjectiles: ["standard", "heavy", "light"],
    startAngle: 8,
    startPower: 39,
    startProjectile: "standard",
    prediction: "partial",
    obstacles: [
      { id: "toolbox-weak-brace", kind: "weak", x: 56, y: 0, width: 5, height: 14 },
      { id: "toolbox-high-canopy", kind: "solid", x: 68, y: 18, width: 23, height: 4 },
      { id: "toolbox-back-post", kind: "solid", x: 92, y: 0, width: 5, height: 16 },
    ],
    targets: [
      { id: "toolbox-flat-switch", x: 41, y: 4.7, radius: 2.3 },
      { id: "toolbox-brace-pocket", x: 70, y: 6, radius: 2.4 },
      { id: "toolbox-high-drift", x: 101, y: 31, radius: 2.5 },
    ],
  },
  {
    name: "Cross Traffic",
    objective: "Wait for the crossing block to leave the lane, then fire through the opening.",
    hint: "The blocker moves side to side. A short wait opens the clean line.",
    shotLimit: 2,
    allowedProjectiles: ["standard"],
    startAngle: 20,
    startPower: 45,
    prediction: "partial",
    obstacles: [
      { id: "traffic-lower-frame", kind: "solid", x: 54, y: 0, width: 4, height: 12 },
      { id: "traffic-upper-frame", kind: "solid", x: 54, y: 20, width: 4, height: 24 },
      {
        id: "traffic-block",
        kind: "solid",
        x: 68,
        y: 8,
        width: 6,
        height: 12,
        movement: { axis: "x", amplitude: 22, period: 3.1, phase: 0.4 },
      },
    ],
    targets: [{ id: "traffic-mark", x: 91, y: 14.5, radius: 2.4 }],
  },
  {
    name: "High Chimney",
    objective: "Drop a high arc into the chimney between the tall stacks.",
    hint: "Power is less important than a steep descent into the slot.",
    shotLimit: 3,
    allowedProjectiles: ["standard", "light"],
    startAngle: 74,
    startPower: 34,
    prediction: "full",
    obstacles: [
      { id: "chimney-left-stack", kind: "solid", x: 55, y: 0, width: 5, height: 25 },
      { id: "chimney-right-stack", kind: "solid", x: 74, y: 0, width: 5, height: 25 },
      { id: "chimney-back-roof", kind: "solid", x: 79, y: 18, width: 16, height: 4 },
    ],
    targets: [{ id: "chimney-drop", x: 66.5, y: 8, radius: 2.45 }],
  },
  {
    name: "Final Circuit",
    objective: "Clear the switch, bounce lane, weak gate, and moving high plate in four shots.",
    hint: "Every shot has a job. Save heavy for the weak gate and bouncy for the skip.",
    shotLimit: 4,
    allowedProjectiles: ["standard", "heavy", "light", "bouncy"],
    startAngle: 10,
    startPower: 41,
    startProjectile: "standard",
    prediction: "partial",
    obstacles: [
      { id: "circuit-runway-pad", kind: "bounce", x: 48, y: 0, width: 24, height: 2.8 },
      { id: "circuit-skip-screen", kind: "solid", x: 75, y: 0, width: 5, height: 12 },
      { id: "circuit-high-rail", kind: "solid", x: 52, y: 22, width: 28, height: 3 },
      { id: "circuit-weak-gate", kind: "weak", x: 96, y: 0, width: 5, height: 13 },
    ],
    targets: [
      { id: "circuit-near-switch", x: 43, y: 8, radius: 2.35 },
      { id: "circuit-skip-target", x: 94, y: 13, radius: 2.45 },
      { id: "circuit-gate-pocket", x: 110, y: 6, radius: 2.45 },
      {
        id: "circuit-moving-high",
        x: 88,
        y: 27,
        radius: 2.55,
        movement: { axis: "x", amplitude: 8, period: 3.6, phase: 0.6 },
      },
    ],
  },
]

export function movedPoint(base: Vec, movement: Movement | undefined, time: number): Vec {
  if (!movement) return base

  const offset =
    Math.sin((time / movement.period) * Math.PI * 2 + (movement.phase ?? 0)) * movement.amplitude

  if (movement.axis === "x") return { x: base.x + offset, y: base.y }
  return { x: base.x, y: base.y + offset }
}

export function movedRect<T extends Rect>(rect: T, movement: Movement | undefined, time: number): T {
  const point = movedPoint({ x: rect.x, y: rect.y }, movement, time)
  return { ...rect, x: point.x, y: point.y }
}

export function levelHasMotion(level: LevelDefinition) {
  return (
    level.targets.some((target) => target.movement) ||
    level.obstacles.some((obstacle) => obstacle.movement)
  )
}

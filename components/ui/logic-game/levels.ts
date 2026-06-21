import { BADGES_BY_LEVEL } from "./badges"
import type { Level, TruthRow } from "./types"

function rows2(cb: (a: number, b: number) => number[]): TruthRow[] {
  const out: TruthRow[] = []
  for (const a of [0, 1]) for (const b of [0, 1]) out.push({ inputs: [a, b], outputs: cb(a, b) })
  return out
}

function rows1(cb: (a: number) => number[]): TruthRow[] {
  return [0, 1].map((a) => ({ inputs: [a], outputs: cb(a) }))
}

function rows3(cb: (a: number, b: number, c: number) => number[]): TruthRow[] {
  const out: TruthRow[] = []
  for (const a of [0, 1]) for (const b of [0, 1]) for (const c of [0, 1]) out.push({ inputs: [a, b, c], outputs: cb(a, b, c) })
  return out
}

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Level 1: AND Gate",
    concept: "Both conditions must be true.",
    missionTitle: "Robot Door Challenge",
    missionStory: "The door opens only if the robot sees a badge AND hears the password.",
    plainGoal: "Make the output turn ON only when both A and B are ON.",
    behaviorDescription: "Output turns ON only when both inputs are ON.",
    inputs: ["A", "B"],
    gates: [{ id: "g1", inputs: ["A", "B"], arity: 2, options: ["AND", "OR", "XOR", "NAND", "NOR"] }],
    outputs: [{ name: "Y", label: "Y (door)", source: { gate: "g1" } }],
    truthTable: {
      inputNames: { A: "Badge seen?", B: "Password heard?" },
      outputs: [{ name: "Y", label: "Door opens?", onText: "Door opens", offText: "Door stays closed" }],
      helperText: "Test every possible badge/password combination and see when the door should open.",
    },
    target: rows2((a, b) => [a & b]),
    hints: [
      "Look at how many times the output turns ON.",
      "The output turns on only when A and B are both ON.",
      "This is the AND gate.",
    ],
    successExplanation:
      "You learned that AND is used when two conditions must both be true, like needing a username and password.",
    realWorldConnection: "Logins, door locks, and safety checks all use AND when two things must both be true.",
    badge: BADGES_BY_LEVEL[1],
  },
  {
    id: 2,
    title: "Level 2: OR Gate",
    concept: "One true condition is enough.",
    missionTitle: "Safety Alarm Challenge",
    missionStory: "The warning light turns on if smoke OR heat is detected.",
    plainGoal: "Make the output turn ON when at least one input is ON.",
    behaviorDescription: "Output turns ON when at least one input is ON.",
    inputs: ["A", "B"],
    gates: [{ id: "g1", inputs: ["A", "B"], arity: 2, options: ["AND", "OR", "XOR", "NAND", "NOR"] }],
    outputs: [{ name: "Y", label: "Y (alarm)", source: { gate: "g1" } }],
    truthTable: {
      inputNames: { A: "Smoke detected?", B: "Heat detected?" },
      outputs: [
        { name: "Y", label: "Warning light turns on?", onText: "Warning light turns on", offText: "Warning light stays off" },
      ],
      helperText: "Test every possible smoke/heat combination and see when the warning light should turn on.",
    },
    target: rows2((a, b) => [a | b]),
    hints: [
      "Look at how many rows have an ON output.",
      "The output turns on when A is on, B is on, or both are on.",
      "This is the OR gate.",
    ],
    successExplanation:
      "You learned that OR is used when one of several conditions can trigger something, like a smoke alarm or heat sensor.",
    realWorldConnection: "Smoke detectors, alarms, and notifications often use OR — any one trigger is enough.",
    badge: BADGES_BY_LEVEL[2],
  },
  {
    id: 3,
    title: "Level 3: NOT Gate",
    concept: "NOT flips the signal.",
    missionTitle: "Night Light Challenge",
    missionStory: "The light turns on when it is NOT bright outside.",
    plainGoal: "Make the output the opposite of the input.",
    behaviorDescription: "Output flips the input. ON becomes OFF, and OFF becomes ON.",
    inputs: ["A"],
    gates: [{ id: "g1", inputs: ["A"], arity: 1, options: ["NOT", "AND", "OR"] }],
    outputs: [{ name: "Y", label: "Y (light)", source: { gate: "g1" } }],
    truthTable: {
      inputNames: { A: "Bright outside?" },
      outputs: [{ name: "Y", label: "Night light turns on?", onText: "Night light turns on", offText: "Night light stays off" }],
      helperText: "Test both outside-light conditions and see when the night light should turn on.",
    },
    target: rows1((a) => [a ? 0 : 1]),
    hints: [
      "Compare the input to the output in each row — are they ever the same?",
      "When A is ON, the output is OFF, and when A is OFF, the output is ON.",
      "This is the NOT gate.",
    ],
    successExplanation:
      "You learned that NOT flips a signal. This is useful when a system should react to something being false.",
    realWorldConnection: "Night lights, \"away mode\" sensors, and inverted switches all rely on NOT.",
    badge: BADGES_BY_LEVEL[3],
  },
  {
    id: 4,
    title: "Level 4: XOR Gate",
    concept: "True only when inputs differ.",
    missionTitle: "Choice Machine Challenge",
    missionStory: "The machine turns on when exactly one button is pressed.",
    plainGoal: "Make the output turn ON only when A and B are different.",
    behaviorDescription: "Output turns ON when exactly one input is ON.",
    inputs: ["A", "B"],
    gates: [{ id: "g1", inputs: ["A", "B"], arity: 2, options: ["AND", "OR", "XOR", "NAND", "NOR"] }],
    outputs: [{ name: "Y", label: "Y (machine)", source: { gate: "g1" } }],
    truthTable: {
      inputNames: { A: "Left button pressed?", B: "Right button pressed?" },
      outputs: [{ name: "Y", label: "Machine turns on?", onText: "Machine turns on", offText: "Machine stays off" }],
      helperText: "Test every button combination and see when exactly one button should turn the machine on.",
    },
    target: rows2((a, b) => [a ^ b]),
    hints: [
      "Look for rows where the inputs are different.",
      "The output turns ON when exactly one input is ON.",
      "This is the XOR gate.",
    ],
    successExplanation:
      "You learned that XOR is used when exactly one condition should be true. It is important in computer circuits.",
    realWorldConnection: "XOR shows up in toggle switches and in how computers compare bits without carrying.",
    badge: BADGES_BY_LEVEL[4],
  },
  {
    id: 5,
    title: "Level 5: NAND Gate",
    concept: "The opposite of AND.",
    missionTitle: "Safety Override Challenge",
    missionStory: "The system stays on unless two dangerous conditions happen together.",
    plainGoal: "Make the output turn OFF only when both A and B are ON.",
    behaviorDescription: "Output is the opposite of AND.",
    inputs: ["A", "B"],
    gates: [{ id: "g1", inputs: ["A", "B"], arity: 2, options: ["AND", "OR", "XOR", "NAND", "NOR"] }],
    outputs: [{ name: "Y", label: "Y (system on)", source: { gate: "g1" } }],
    truthTable: {
      inputNames: { A: "Overheating?", B: "Pressure unsafe?" },
      outputs: [{ name: "Y", label: "System stays on?", onText: "System stays on", offText: "System shuts off" }],
      helperText: "Test every dangerous-condition combination and see when the safety system should stay on.",
    },
    target: rows2((a, b) => [a & b ? 0 : 1]),
    hints: [
      "Find the one row where the output is different from the rest.",
      "The output turns off only when both inputs are ON — every other case is ON.",
      "This is the NAND gate.",
    ],
    successExplanation:
      "You learned that NAND is the opposite of AND. It keeps things running unless every dangerous condition is true at once.",
    realWorldConnection: "Safety overrides use NAND so a system only shuts off when every risky condition lines up.",
    badge: BADGES_BY_LEVEL[5],
  },
  {
    id: 6,
    title: "Level 6: NOR Gate",
    concept: "The opposite of OR.",
    missionTitle: "Quiet Room Challenge",
    missionStory: "The signal turns on only when no sensors are active.",
    plainGoal: "Make the output turn ON only when both A and B are OFF.",
    behaviorDescription: "Output is the opposite of OR.",
    inputs: ["A", "B"],
    gates: [{ id: "g1", inputs: ["A", "B"], arity: 2, options: ["AND", "OR", "XOR", "NAND", "NOR"] }],
    outputs: [{ name: "Y", label: "Y (quiet)", source: { gate: "g1" } }],
    truthTable: {
      inputNames: { A: "Sound sensor active?", B: "Motion sensor active?" },
      outputs: [{ name: "Y", label: "Quiet signal turns on?", onText: "Quiet signal turns on", offText: "Quiet signal stays off" }],
      helperText: "Test every sensor combination and see when the quiet-room signal should turn on.",
    },
    target: rows2((a, b) => [a | b ? 0 : 1]),
    hints: [
      "Find the one row where the output is different from the rest.",
      "The output turns on only when both inputs are OFF — every other case is OFF.",
      "This is the NOR gate.",
    ],
    successExplanation:
      "You learned that NOR is the opposite of OR. It only switches on when every condition is false.",
    realWorldConnection: "A \"do not disturb\" indicator can use NOR — quiet only when nothing at all is active.",
    badge: BADGES_BY_LEVEL[6],
  },
  {
    id: 7,
    title: "Level 7: Combine Two Gates",
    concept: "Chaining gates builds bigger decisions.",
    missionTitle: "Smart Sensor Challenge",
    missionStory:
      "Build logic from more than one decision: the sensor should fire if motion is detected AND the room is dark, or if the manual override is pressed.",
    plainGoal: "Chain two gates so the circuit fires when motion and darkness happen together, or when the manual override is on.",
    behaviorDescription: "Output turns ON when motion is detected and the room is dark, or when the manual override is on.",
    inputs: ["A", "B", "C"],
    gates: [
      { id: "g1", inputs: ["A", "B"], arity: 2, options: ["AND", "OR"] },
      { id: "g2", inputs: [{ gate: "g1" }, "C"], arity: 2, options: ["AND", "OR", "XOR", "NAND", "NOR"] },
    ],
    outputs: [{ name: "Y", label: "Y (sensor)", source: { gate: "g2" } }],
    truthTable: {
      inputNames: { A: "Motion detected?", B: "Room is dark?", C: "Manual override pressed?" },
      outputs: [{ name: "Y", label: "Sensor fires?", onText: "Sensor fires", offText: "Sensor stays quiet" }],
      helperText: "Test every motion/darkness/override combination and see when the sensor should fire.",
    },
    target: rows3((a, b, c) => [(a & b) | c]),
    hints: [
      "First decide what gate makes g1 true only when A and B are both on.",
      "Then decide what gate combines g1's result with C so either one being true is enough.",
      "g1 should be AND, and g2 should be OR.",
    ],
    successExplanation: "You learned that gates can be chained — one gate's output becomes another gate's input.",
    realWorldConnection: "Smart sensors often combine several rules this way: a motion sensor AND darkness, OR a manual override.",
    badge: BADGES_BY_LEVEL[7],
  },
  {
    id: 8,
    title: "Level 8: Half-Adder",
    concept: "Computers add numbers using logic gates.",
    missionTitle: "Tiny Computer Challenge",
    missionStory: "Build a circuit that adds two one-bit numbers.",
    plainGoal: "Add two one-bit numbers using gates: find the Sum and the Carry.",
    behaviorDescription:
      "Add two one-bit numbers. Sum shows the answer bit. Carry shows when a value moves to the next place.",
    inputs: ["A", "B"],
    gates: [
      { id: "g1", inputs: ["A", "B"], arity: 2, options: ["XOR", "OR", "AND"] },
      { id: "g2", inputs: ["A", "B"], arity: 2, options: ["AND", "OR", "XOR"] },
    ],
    outputs: [
      { name: "S", label: "Sum", source: { gate: "g1" } },
      { name: "C", label: "Carry", source: { gate: "g2" } },
    ],
    truthTable: {
      inputNames: { A: "First bit", B: "Second bit" },
      inputOnText: "1",
      inputOffText: "0",
      outputs: [
        { name: "S", label: "Sum bit", onText: "Sum bit is 1", offText: "Sum bit is 0" },
        { name: "C", label: "Carry bit", onText: "Carry bit is 1", offText: "Carry bit is 0" },
      ],
      helperText: "Test every pair of one-bit numbers and compare the sum bit and carry bit.",
    },
    target: rows2((a, b) => [a ^ b, a & b]),
    hints: [
      "Look at the Sum column first — when are A and B different?",
      "Sum needs the gate that's true when exactly one input is on. Carry needs the gate that's true only when both are on.",
      "Sum = XOR(A, B). Carry = AND(A, B).",
    ],
    successExplanation: "You built a tiny version of how computers add numbers. XOR finds the Sum, and AND finds the Carry.",
    realWorldConnection: "Every calculator and computer chip adds binary numbers using half-adders and full-adders like this one.",
    badge: BADGES_BY_LEVEL[8],
  },
  {
    id: 9,
    title: "Level 9: Security System Challenge",
    concept: "Translate a real sentence into Boolean logic.",
    missionTitle: "Security System Challenge",
    missionStory:
      "Design a school security system. The alarm should turn on if the door is open AND the teacher is NOT present.",
    plainGoal: "Build logic so the alarm turns on only when the door is open and the teacher is away.",
    behaviorDescription: "Output turns ON when A (door open) is ON and B (teacher present) is OFF.",
    inputs: ["A", "B"],
    gates: [
      { id: "g1", inputs: ["B"], arity: 1, options: ["NOT"] },
      { id: "g2", inputs: ["A", { gate: "g1" }], arity: 2, options: ["AND", "OR", "NAND", "NOR"] },
    ],
    outputs: [{ name: "Y", label: "Y (alarm)", source: { gate: "g2" } }],
    truthTable: {
      inputNames: { A: "Door open?", B: "Teacher present?" },
      outputs: [{ name: "Y", label: "Alarm turns on?", onText: "Alarm turns on", offText: "Alarm stays off" }],
      helperText: "Test every door/teacher combination and see when the school alarm should turn on.",
    },
    target: rows2((a, b) => [a & (b ? 0 : 1)]),
    hints: [
      "First flip \"teacher present\" so it reads \"teacher NOT present.\"",
      "Then combine \"door open\" with \"teacher NOT present\" so both must be true.",
      "g1 should be NOT(B), and g2 should be AND(A, g1).",
    ],
    successExplanation: "You translated a real sentence into Boolean logic — the same skill used to write real security software.",
    realWorldConnection: "Real security systems, smart locks, and alarms are built by turning sentences like this into AND/OR/NOT logic.",
    badge: BADGES_BY_LEVEL[9],
  },
]

/** 9 guided levels + level 10, the sandbox challenge (handled by SandboxChallenge). */
export const TOTAL_LEVELS = LEVELS.length + 1
export const SANDBOX_LEVEL_ID = 10

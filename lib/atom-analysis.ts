export type NeutralIonStatus = "not-an-atom" | "neutral" | "ion"
export type IonChargeStatus = "none" | "cation" | "anion"
export type AtomValidStatus = "valid" | "invalid"
export type AtomStabilityStatus =
  | "not-an-atom"
  | "stable"
  | "unstable"
  | "unrealistic"
  | "unknown"

export type AtomAnalysis = {
  elementName: string
  elementSymbol: string
  atomicNumber: number
  massNumber: number
  charge: number
  chargeLabel: string
  isotopeName: string
  neutralIonStatus: NeutralIonStatus
  ionChargeStatus: IonChargeStatus
  validStatus: AtomValidStatus
  stabilityStatus: AtomStabilityStatus
  stableIsotopeNames: string[]
  shortExplanation: string
  explanationMessage: string
  warningMessage?: string
}

type ElementInfo = {
  symbol: string
  name: string
}

type IsotopeInfo = {
  stableMassNumbers: readonly number[]
  minKnownMassNumber: number
  maxKnownMassNumber: number
}

export const MAX_PROTONS = 118
export const MAX_NEUTRONS = 180
export const MAX_ELECTRONS = 118

export const ELEMENTS: ReadonlyArray<ElementInfo | undefined> = [
  undefined,
  { symbol: "H", name: "Hydrogen" },
  { symbol: "He", name: "Helium" },
  { symbol: "Li", name: "Lithium" },
  { symbol: "Be", name: "Beryllium" },
  { symbol: "B", name: "Boron" },
  { symbol: "C", name: "Carbon" },
  { symbol: "N", name: "Nitrogen" },
  { symbol: "O", name: "Oxygen" },
  { symbol: "F", name: "Fluorine" },
  { symbol: "Ne", name: "Neon" },
  { symbol: "Na", name: "Sodium" },
  { symbol: "Mg", name: "Magnesium" },
  { symbol: "Al", name: "Aluminum" },
  { symbol: "Si", name: "Silicon" },
  { symbol: "P", name: "Phosphorus" },
  { symbol: "S", name: "Sulfur" },
  { symbol: "Cl", name: "Chlorine" },
  { symbol: "Ar", name: "Argon" },
  { symbol: "K", name: "Potassium" },
  { symbol: "Ca", name: "Calcium" },
  { symbol: "Sc", name: "Scandium" },
  { symbol: "Ti", name: "Titanium" },
  { symbol: "V", name: "Vanadium" },
  { symbol: "Cr", name: "Chromium" },
  { symbol: "Mn", name: "Manganese" },
  { symbol: "Fe", name: "Iron" },
  { symbol: "Co", name: "Cobalt" },
  { symbol: "Ni", name: "Nickel" },
  { symbol: "Cu", name: "Copper" },
  { symbol: "Zn", name: "Zinc" },
  { symbol: "Ga", name: "Gallium" },
  { symbol: "Ge", name: "Germanium" },
  { symbol: "As", name: "Arsenic" },
  { symbol: "Se", name: "Selenium" },
  { symbol: "Br", name: "Bromine" },
  { symbol: "Kr", name: "Krypton" },
  { symbol: "Rb", name: "Rubidium" },
  { symbol: "Sr", name: "Strontium" },
  { symbol: "Y", name: "Yttrium" },
  { symbol: "Zr", name: "Zirconium" },
  { symbol: "Nb", name: "Niobium" },
  { symbol: "Mo", name: "Molybdenum" },
  { symbol: "Tc", name: "Technetium" },
  { symbol: "Ru", name: "Ruthenium" },
  { symbol: "Rh", name: "Rhodium" },
  { symbol: "Pd", name: "Palladium" },
  { symbol: "Ag", name: "Silver" },
  { symbol: "Cd", name: "Cadmium" },
  { symbol: "In", name: "Indium" },
  { symbol: "Sn", name: "Tin" },
  { symbol: "Sb", name: "Antimony" },
  { symbol: "Te", name: "Tellurium" },
  { symbol: "I", name: "Iodine" },
  { symbol: "Xe", name: "Xenon" },
  { symbol: "Cs", name: "Cesium" },
  { symbol: "Ba", name: "Barium" },
  { symbol: "La", name: "Lanthanum" },
  { symbol: "Ce", name: "Cerium" },
  { symbol: "Pr", name: "Praseodymium" },
  { symbol: "Nd", name: "Neodymium" },
  { symbol: "Pm", name: "Promethium" },
  { symbol: "Sm", name: "Samarium" },
  { symbol: "Eu", name: "Europium" },
  { symbol: "Gd", name: "Gadolinium" },
  { symbol: "Tb", name: "Terbium" },
  { symbol: "Dy", name: "Dysprosium" },
  { symbol: "Ho", name: "Holmium" },
  { symbol: "Er", name: "Erbium" },
  { symbol: "Tm", name: "Thulium" },
  { symbol: "Yb", name: "Ytterbium" },
  { symbol: "Lu", name: "Lutetium" },
  { symbol: "Hf", name: "Hafnium" },
  { symbol: "Ta", name: "Tantalum" },
  { symbol: "W", name: "Tungsten" },
  { symbol: "Re", name: "Rhenium" },
  { symbol: "Os", name: "Osmium" },
  { symbol: "Ir", name: "Iridium" },
  { symbol: "Pt", name: "Platinum" },
  { symbol: "Au", name: "Gold" },
  { symbol: "Hg", name: "Mercury" },
  { symbol: "Tl", name: "Thallium" },
  { symbol: "Pb", name: "Lead" },
  { symbol: "Bi", name: "Bismuth" },
  { symbol: "Po", name: "Polonium" },
  { symbol: "At", name: "Astatine" },
  { symbol: "Rn", name: "Radon" },
  { symbol: "Fr", name: "Francium" },
  { symbol: "Ra", name: "Radium" },
  { symbol: "Ac", name: "Actinium" },
  { symbol: "Th", name: "Thorium" },
  { symbol: "Pa", name: "Protactinium" },
  { symbol: "U", name: "Uranium" },
  { symbol: "Np", name: "Neptunium" },
  { symbol: "Pu", name: "Plutonium" },
  { symbol: "Am", name: "Americium" },
  { symbol: "Cm", name: "Curium" },
  { symbol: "Bk", name: "Berkelium" },
  { symbol: "Cf", name: "Californium" },
  { symbol: "Es", name: "Einsteinium" },
  { symbol: "Fm", name: "Fermium" },
  { symbol: "Md", name: "Mendelevium" },
  { symbol: "No", name: "Nobelium" },
  { symbol: "Lr", name: "Lawrencium" },
  { symbol: "Rf", name: "Rutherfordium" },
  { symbol: "Db", name: "Dubnium" },
  { symbol: "Sg", name: "Seaborgium" },
  { symbol: "Bh", name: "Bohrium" },
  { symbol: "Hs", name: "Hassium" },
  { symbol: "Mt", name: "Meitnerium" },
  { symbol: "Ds", name: "Darmstadtium" },
  { symbol: "Rg", name: "Roentgenium" },
  { symbol: "Cn", name: "Copernicium" },
  { symbol: "Nh", name: "Nihonium" },
  { symbol: "Fl", name: "Flerovium" },
  { symbol: "Mc", name: "Moscovium" },
  { symbol: "Lv", name: "Livermorium" },
  { symbol: "Ts", name: "Tennessine" },
  { symbol: "Og", name: "Oganesson" },
]

const BEGINNER_ISOTOPES: Record<number, IsotopeInfo> = {
  1: { stableMassNumbers: [1, 2], minKnownMassNumber: 1, maxKnownMassNumber: 7 },
  2: { stableMassNumbers: [3, 4], minKnownMassNumber: 3, maxKnownMassNumber: 10 },
  3: { stableMassNumbers: [6, 7], minKnownMassNumber: 3, maxKnownMassNumber: 13 },
  4: { stableMassNumbers: [9], minKnownMassNumber: 5, maxKnownMassNumber: 16 },
  5: { stableMassNumbers: [10, 11], minKnownMassNumber: 6, maxKnownMassNumber: 21 },
  6: { stableMassNumbers: [12, 13], minKnownMassNumber: 8, maxKnownMassNumber: 22 },
  7: { stableMassNumbers: [14, 15], minKnownMassNumber: 10, maxKnownMassNumber: 24 },
  8: { stableMassNumbers: [16, 17, 18], minKnownMassNumber: 11, maxKnownMassNumber: 28 },
  9: { stableMassNumbers: [19], minKnownMassNumber: 13, maxKnownMassNumber: 31 },
  10: { stableMassNumbers: [20, 21, 22], minKnownMassNumber: 16, maxKnownMassNumber: 34 },
  11: { stableMassNumbers: [23], minKnownMassNumber: 18, maxKnownMassNumber: 37 },
  12: { stableMassNumbers: [24, 25, 26], minKnownMassNumber: 19, maxKnownMassNumber: 40 },
  13: { stableMassNumbers: [27], minKnownMassNumber: 21, maxKnownMassNumber: 42 },
  14: { stableMassNumbers: [28, 29, 30], minKnownMassNumber: 22, maxKnownMassNumber: 44 },
  15: { stableMassNumbers: [31], minKnownMassNumber: 24, maxKnownMassNumber: 46 },
  16: { stableMassNumbers: [32, 33, 34, 36], minKnownMassNumber: 26, maxKnownMassNumber: 49 },
  17: { stableMassNumbers: [35, 37], minKnownMassNumber: 28, maxKnownMassNumber: 51 },
  18: { stableMassNumbers: [36, 38, 40], minKnownMassNumber: 30, maxKnownMassNumber: 53 },
  19: { stableMassNumbers: [39, 41], minKnownMassNumber: 32, maxKnownMassNumber: 55 },
  20: { stableMassNumbers: [40, 42, 43, 44, 46], minKnownMassNumber: 34, maxKnownMassNumber: 57 },
}

export function sanitizeParticleCount(value: number, max: number): number {
  if (!Number.isFinite(value) || !Number.isInteger(value)) return 0
  return Math.min(Math.max(value, 0), max)
}

export function formatCharge(charge: number): string {
  if (charge > 0) return `+${charge}`
  return String(charge)
}

export function analyzeAtom(
  rawProtons: number,
  rawNeutrons: number,
  rawElectrons: number,
): AtomAnalysis {
  const hasInvalidInput = [rawProtons, rawNeutrons, rawElectrons].some(
    (value) => !Number.isFinite(value) || !Number.isInteger(value) || value < 0,
  )

  if (hasInvalidInput) {
    return {
      elementName: "",
      elementSymbol: "",
      atomicNumber: 0,
      massNumber: 0,
      charge: 0,
      chargeLabel: "0",
      isotopeName: "",
      neutralIonStatus: "not-an-atom",
      ionChargeStatus: "none",
      validStatus: "invalid",
      stabilityStatus: "not-an-atom",
      stableIsotopeNames: [],
      shortExplanation:
        "Not an atom yet. You need whole-number particle counts and at least 1 proton.",
      explanationMessage:
        "Particle counts must be whole numbers that are 0 or greater.",
      warningMessage:
        "Use whole-number counts only. Negative values, decimals, and empty values are not valid atom inputs.",
    }
  }

  const protons = rawProtons
  const neutrons = rawNeutrons
  const electrons = rawElectrons
  const massNumber = protons + neutrons
  const charge = protons - electrons
  const chargeLabel = formatCharge(charge)

  if (protons === 0) {
    return {
      elementName: "",
      elementSymbol: "",
      atomicNumber: 0,
      massNumber,
      charge,
      chargeLabel,
      isotopeName: "",
      neutralIonStatus: "not-an-atom",
      ionChargeStatus: "none",
      validStatus: "invalid",
      stabilityStatus: "not-an-atom",
      stableIsotopeNames: [],
      shortExplanation:
        "Not an atom yet. You need at least 1 proton to create an element.",
      explanationMessage:
        "Not an atom yet. Add at least 1 proton to create an element.",
      warningMessage:
        electrons > 0 || neutrons > 0
          ? "Electrons or neutrons without protons do not make an atom, and electrons without protons are not an ion."
          : undefined,
    }
  }

  if (protons > MAX_PROTONS) {
    return {
      elementName: "",
      elementSymbol: "",
      atomicNumber: protons,
      massNumber,
      charge,
      chargeLabel,
      isotopeName: "",
      neutralIonStatus: "not-an-atom",
      ionChargeStatus: "none",
      validStatus: "invalid",
      stabilityStatus: "unknown",
      stableIsotopeNames: [],
      shortExplanation:
        "Invalid atom. This game supports confirmed elements 1 through 118.",
      explanationMessage:
        "Invalid atom: no confirmed element with this many protons is supported.",
      warningMessage:
        "Protons determine the element, and this game supports confirmed elements 1 through 118.",
    }
  }

  if (neutrons > MAX_NEUTRONS || electrons > MAX_ELECTRONS) {
    return {
      elementName: "",
      elementSymbol: "",
      atomicNumber: protons,
      massNumber,
      charge,
      chargeLabel,
      isotopeName: "",
      neutralIonStatus: "not-an-atom",
      ionChargeStatus: "none",
      validStatus: "invalid",
      stabilityStatus: "unknown",
      stableIsotopeNames: [],
      shortExplanation:
        "Invalid input. One or more particle counts is above this model's safe limit.",
      explanationMessage:
        "Invalid atom input: one or more particle counts is above the safe limit for this model.",
      warningMessage: `Use at most ${MAX_NEUTRONS} neutrons and ${MAX_ELECTRONS} electrons.`,
    }
  }

  const element = ELEMENTS[protons]
  if (!element) {
    return {
      elementName: "",
      elementSymbol: "",
      atomicNumber: protons,
      massNumber,
      charge,
      chargeLabel,
      isotopeName: "",
      neutralIonStatus: "not-an-atom",
      ionChargeStatus: "none",
      validStatus: "invalid",
      stabilityStatus: "unknown",
      stableIsotopeNames: [],
      shortExplanation:
        "Invalid atom. This proton count does not match a supported element.",
      explanationMessage:
        "Invalid atom: this proton count does not match a supported element.",
    }
  }

  const isotopeName = `${element.name}-${massNumber}`
  const isotopeInfo = BEGINNER_ISOTOPES[protons]
  const stableIsotopeNames =
    isotopeInfo?.stableMassNumbers.map((mass) => `${element.name}-${mass}`) ?? []
  const stabilityStatus = getStabilityStatus(
    protons,
    massNumber,
    isotopeInfo,
  )
  const validStatus: AtomValidStatus =
    stabilityStatus === "unrealistic" ? "invalid" : "valid"
  const neutralIonStatus: NeutralIonStatus = charge === 0 ? "neutral" : "ion"
  const ionChargeStatus: IonChargeStatus =
    charge > 0 ? "cation" : charge < 0 ? "anion" : "none"

  const explanationParts = [
    `${protons} ${particleLabel("proton", protons)} ${protons === 1 ? "makes" : "make"} this ${element.name} (atomic number ${protons}).`,
    `Its mass number is ${massNumber}, so the isotope is ${isotopeName}. Changing neutrons changes the isotope, not the element.`,
    getChargeExplanation(protons, electrons, charge),
    getStabilityExplanation(isotopeName, stabilityStatus, isotopeInfo),
  ]

  const warningMessage = getWarningMessage({
    elementName: element.name,
    isotopeName,
    stableIsotopeNames,
    stabilityStatus,
    charge,
    protons,
    electrons,
  })

  return {
    elementName: element.name,
    elementSymbol: element.symbol,
    atomicNumber: protons,
    massNumber,
    charge,
    chargeLabel,
    isotopeName,
    neutralIonStatus,
    ionChargeStatus,
    validStatus,
    stabilityStatus,
    stableIsotopeNames,
    shortExplanation: getShortExplanation({
      elementName: element.name,
      isotopeName,
      stableIsotopeNames,
      protons,
      neutrons,
      electrons,
      charge,
      stabilityStatus,
      validStatus,
      neutralIonStatus,
    }),
    explanationMessage: explanationParts.join(" "),
    warningMessage,
  }
}

function getStabilityStatus(
  protons: number,
  massNumber: number,
  isotopeInfo: IsotopeInfo | undefined,
): AtomStabilityStatus {
  if (!isotopeInfo) return "unknown"
  if (isotopeInfo.stableMassNumbers.includes(massNumber)) return "stable"
  if (
    massNumber < isotopeInfo.minKnownMassNumber ||
    massNumber > isotopeInfo.maxKnownMassNumber
  ) {
    return "unrealistic"
  }

  const neutrons = massNumber - protons
  if (protons > 1 && neutrons === 0) return "unrealistic"

  return "unstable"
}

function getChargeExplanation(
  protons: number,
  electrons: number,
  charge: number,
): string {
  if (charge === 0) {
    return `It is neutral because it has ${protons} proton${protons === 1 ? "" : "s"} and ${electrons} electron${electrons === 1 ? "" : "s"}.`
  }

  if (charge > 0) {
    return `This is a positive ion, or cation, because it has ${protons} proton${protons === 1 ? "" : "s"} and only ${electrons} electron${electrons === 1 ? "" : "s"}, giving it a ${formatCharge(charge)} charge.`
  }

  return `This is a negative ion, or anion, because it has ${protons} proton${protons === 1 ? "" : "s"} and ${electrons} electrons, giving it a ${charge} charge.`
}

function getStabilityExplanation(
  isotopeName: string,
  stabilityStatus: AtomStabilityStatus,
  isotopeInfo: IsotopeInfo | undefined,
): string {
  if (stabilityStatus === "stable") {
    return `${isotopeName} is a known stable isotope.`
  }

  if (stabilityStatus === "unstable") {
    return `${isotopeName} is not one of the known stable isotopes in this game, so label it unstable.`
  }

  if (stabilityStatus === "unrealistic") {
    return `${isotopeName} is not a realistic isotope for this beginner atom model, so it should not be treated as a normal atom.`
  }

  if (isotopeInfo) {
    return `${isotopeName} needs more isotope data before this game can label its stability.`
  }

  return `${isotopeName} is outside the beginner isotope table, so its stability is not labeled here.`
}

function getWarningMessage({
  elementName,
  isotopeName,
  stableIsotopeNames,
  stabilityStatus,
  charge,
  protons,
  electrons,
}: {
  elementName: string
  isotopeName: string
  stableIsotopeNames: string[]
  stabilityStatus: AtomStabilityStatus
  charge: number
  protons: number
  electrons: number
}): string | undefined {
  const warnings: string[] = []

  if (stabilityStatus === "unrealistic") {
    const suggestion =
      stableIsotopeNames.length > 0
        ? ` Try ${formatList(stableIsotopeNames)}.`
        : ""
    warnings.push(
      `${isotopeName} has an unrealistic neutron count for ${elementName}; do not call it stable or normal.${suggestion}`,
    )
  }

  if (Math.abs(charge) >= 4) {
    warnings.push(
      `This is mathematically a ${formatCharge(charge)} ion, but that charge is extremely unrealistic for a beginner atom model.`,
    )
  }

  if (charge > 0 && electrons === 0 && protons > 1) {
    warnings.push(
      `This is mathematically a ${formatCharge(charge)} ion, but atoms usually do not lose all their electrons.`,
    )
  }

  return warnings.length > 0 ? warnings.join(" ") : undefined
}

function particleLabel(particle: "proton" | "electron", count: number): string {
  return `${particle}${count === 1 ? "" : "s"}`
}

function getShortExplanation({
  elementName,
  isotopeName,
  stableIsotopeNames,
  protons,
  neutrons,
  electrons,
  charge,
  stabilityStatus,
  validStatus,
  neutralIonStatus,
}: {
  elementName: string
  isotopeName: string
  stableIsotopeNames: string[]
  protons: number
  neutrons: number
  electrons: number
  charge: number
  stabilityStatus: AtomStabilityStatus
  validStatus: AtomValidStatus
  neutralIonStatus: NeutralIonStatus
}): string {
  if (validStatus === "invalid" && stabilityStatus === "unrealistic") {
    const suggestion =
      stableIsotopeNames.length > 0
        ? ` Try ${formatList(stableIsotopeNames)}.`
        : ""
    return `${protons} protons means ${elementName}, but ${neutrons} neutrons makes this nucleus unrealistic.${suggestion}`
  }

  if (validStatus === "invalid") {
    return "Not an atom yet. You need at least 1 proton to create an element."
  }

  if (Math.abs(charge) >= 4) {
    return `This has a ${formatCharge(charge)} charge. That comes from protons minus electrons, but it is extremely unrealistic here.`
  }

  if (stabilityStatus === "unstable") {
    return `This is ${isotopeName}. It is an unstable isotope, not a common stable ${elementName} atom.`
  }

  if (neutralIonStatus === "ion") {
    const extraCount = Math.abs(charge)
    const chargeWord = charge < 0 ? "extra negative" : "missing negative"
    return `This is ${articleFor(elementName)} ${elementName.toLowerCase()} ion with a ${formatCharge(charge)} charge. It has ${protons} protons and ${electrons} electrons, so there are ${extraCount} ${chargeWord} charge${extraCount === 1 ? "" : "s"}.`
  }

  if (stabilityStatus === "stable") {
    return `Correct: neutral ${isotopeName}. ${protons} protons make ${elementName}, ${neutrons} neutrons make ${isotopeName}, and ${electrons} electrons balance the charge.`
  }

  return `${isotopeName} is a neutral atom. Its isotope stability is not labeled in this beginner table.`
}

function formatList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? ""
  if (items.length === 2) return `${items[0]} or ${items[1]}`
  return `${items.slice(0, -1).join(", ")}, or ${items[items.length - 1]}`
}

function articleFor(word: string): "a" | "an" {
  return /^[aeiou]/i.test(word) ? "an" : "a"
}

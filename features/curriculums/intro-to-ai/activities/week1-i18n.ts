import {
  AI_DETECTIVE_SYSTEMS,
  BODY_COLORS,
  BODY_SHAPES,
  CREATURE_CATEGORIES,
  DETECTIVE_CATEGORIES,
  DEVICE_EXAMPLES,
  DEVICE_FIELDS,
  RULE_FIELDS,
  STARTER_CREATURES,
  WITHHELD_CREATURES,
  type RuleField,
  type RuleWording,
} from "./week1-activities.ts"
import {
  createLocalizedResolver,
  type DeepPartial,
  hasLocaleOverlay,
  type LocaleOverlays,
} from "../../../../lib/localize-content.ts"
import type { Language } from "../../../../i18n/translations.ts"

/**
 * Translations for the Week 1 activities (AI Detective, Human Rule Builder, and
 * the Device Investigation example library).
 *
 * English is the structural source of truth; each locale supplies only the
 * strings it translates and they are deep-merged onto it. Deliberately NOT
 * translated: every `id`, the `bestCategory` / `alsoReasonable` / `suggestedCategory`
 * classifications, each creature's `features` and `canonicalCategory`, and the
 * body-colour and body-shape values. Those are compared against saved rule sets,
 * so a student who switches language keeps the rules they built. The display
 * names for them live in `categoryLabels`, `colorLabels` and `shapeLabels`.
 */

const base = {
  detectiveCategories: DETECTIVE_CATEGORIES,
  systems: AI_DETECTIVE_SYSTEMS,
  starterCreatures: STARTER_CREATURES,
  withheldCreatures: WITHHELD_CREATURES,
  deviceExamples: DEVICE_EXAMPLES,
  deviceFields: DEVICE_FIELDS,
  /** Widened from the `as const` source so the labels stay translatable. */
  ruleFields: RULE_FIELDS.map((f) => ({
    id: f.id as RuleField,
    label: f.label as string,
    type: f.type as "boolean" | "number" | "string",
  })),
  /** Display names for the values kept in English above. */
  categoryLabels: Object.fromEntries(CREATURE_CATEGORIES.map((c) => [c, c])) as Record<string, string>,
  colorLabels: Object.fromEntries(BODY_COLORS.map((c) => [c, c[0].toUpperCase() + c.slice(1)])) as Record<string, string>,
  shapeLabels: Object.fromEntries(BODY_SHAPES.map((c) => [c, c[0].toUpperCase() + c.slice(1)])) as Record<string, string>,
  /** Sentence fragments the rule preview builds on. */
  fieldSubjects: {
    hasWings: "it has wings",
    livesInWater: "it lives in water",
    hasAntennae: "it has antennae",
    canGlow: "it can glow",
    legs: "the number of legs",
    bodyColor: "the body color",
    bodyShape: "the body shape",
  } as Record<RuleField, string>,
  ruleWording: {
    addAtLeastOne: "Add at least one rule.",
    chooseFeature: "Rule {n}: choose a feature.",
    chooseCondition: "Rule {n}: choose a condition.",
    chooseCategory: "Rule {n}: choose a category to assign.",
    enterValue: "Rule {n}: enter a value.",
    not: "NOT ({subject})",
    isAtLeast: "{subject} is at least {value}",
    isAtMost: "{subject} is at most {value}",
    is: "{subject} is {value}",
    ifThen: "If {condition} → {category}",
  } as RuleWording,
}

export type Week1Content = typeof base

const es: DeepPartial<Week1Content> = {
  detectiveCategories: [
    {
      label: "Sistema de aprendizaje automático",
      short: "Aprende patrones a partir de ejemplos",
    },
    {
      label: "Automatización de reglas fijas o programa tradicional",
      short: "Sigue reglas que escribió una persona",
    },
    {
      label: "Herramienta sin IA",
      short: "Una herramienta que una persona controla directamente",
    },
    {
      label: "No hay suficiente información",
      short: "Podría ser más de una: todavía no se puede saber",
    },
  ],
  systems: [
    {
      name: "Calculadora",
      description: "Una app de calculadora básica que suma, resta, multiplica y divide.",
      input: "Los números y la operación que escribes",
      output: "La respuesta exacta",
      evidence: [
        {
          text: "Da la misma respuesta cada vez para la misma entrada",
        },
        {
          text: "Una persona escribió las reglas exactas de la aritmética",
        },
        {
          text: "Nunca necesitó ejemplos para aprender",
        },
      ],
      reasoning: "Una calculadora sigue reglas aritméticas exactas que escribió una persona. Nunca aprendió de ejemplos, así que es un programa tradicional de reglas fijas, no IA.",
      ruleOrPattern: "Regla fija: la aritmética está escrita directamente en el código.",
    },
    {
      name: "Asistente de voz",
      description: "Una bocina inteligente que entiende preguntas habladas y las responde.",
      input: "Tus palabras habladas",
      output: "Texto reconocido y una respuesta hablada",
      evidence: [
        {
          text: "Maneja muchas voces y acentos que nunca había escuchado",
        },
        {
          text: "Se entrenó con enormes cantidades de habla grabada",
        },
        {
          text: "Su reconocimiento de voz mejora al ver más ejemplos",
        },
      ],
      reasoning: "Convertir habla tan variada en texto y entender el lenguaje es demasiado enredado para reglas escritas a mano. Los asistentes de voz suelen usar aprendizaje automático entrenado con mucha habla y texto.",
      ruleOrPattern: "Patrón aprendido: modelos de habla y lenguaje entrenados con ejemplos.",
    },
    {
      name: "Puerta corrediza automática",
      description: "La puerta de una tienda que se abre cuando un sensor de movimiento detecta que alguien se acerca.",
      input: "Movimiento detectado por un sensor",
      output: "La puerta se abre o se cierra",
      evidence: [
        {
          text: "Se abre cada vez que detecta movimiento: una sola regla simple",
        },
        {
          text: "No reconoce quién ni qué se está moviendo",
        },
        {
          text: "Una persona puso la regla 'movimiento → abrir'",
        },
      ],
      reasoning: "La puerta sigue una regla fija: si el sensor ve movimiento, se abre. No aprende ni reconoce nada, así que es automatización de reglas fijas: automática, pero no IA.",
      ruleOrPattern: "Regla fija: movimiento detectado → abrir.",
    },
    {
      name: "Feed de recomendaciones de video",
      description: "Una app de video que arma qué clips mostrarte a continuación.",
      input: "Lo que has visto, marcado con me gusta y saltado",
      output: "Una lista ordenada de videos para sugerirte",
      evidence: [
        {
          text: "Aprende tus gustos a partir de lo que hiciste antes",
        },
        {
          text: "Personas distintas reciben recomendaciones distintas",
        },
        {
          text: "Se entrenó con patrones de millones de espectadores",
        },
      ],
      reasoning: "No hay una regla simple para 'qué te va a gustar después'. Los feeds de recomendaciones suelen usar aprendizaje automático que encuentra patrones en lo que tú y otras personas vieron.",
      ruleOrPattern: "Patrón aprendido: predicciones a partir del historial de reproducción.",
    },
    {
      name: "Luz con sensor de movimiento",
      description: "Una luz de exterior que se enciende cuando su sensor detecta movimiento.",
      input: "Movimiento cerca del sensor",
      output: "La luz se enciende un rato",
      evidence: [
        {
          text: "Una regla: movimiento → luz encendida",
        },
        {
          text: "No distingue a una persona de un animal",
        },
        {
          text: "Nunca aprendió de ejemplos",
        },
      ],
      reasoning: "Igual que la puerta corrediza, esto es una sola regla fija (el movimiento enciende la luz). No reconoce nada ni aprende, así que es automatización de reglas fijas, no IA.",
      ruleOrPattern: "Regla fija: movimiento → luz encendida.",
    },
    {
      name: "Desbloqueo facial",
      description: "Un teléfono que se desbloquea cuando reconoce la cara de su dueño.",
      input: "Una imagen de una cara tomada por la cámara",
      output: "Se desbloquea o sigue bloqueado",
      evidence: [
        {
          text: "Reconoce una cara con muchas luces y ángulos distintos",
        },
        {
          text: "Aprendió patrones faciales a partir de imágenes de ejemplo",
        },
        {
          text: "Sigue funcionando aunque cambies de peinado",
        },
      ],
      reasoning: "Reconocer una cara específica con distintos ángulos e iluminación necesita patrones aprendidos. El desbloqueo facial suele usar reconocimiento de imágenes con aprendizaje automático.",
      ruleOrPattern: "Patrón aprendido: reconocimiento de imágenes entrenado con ejemplos de caras.",
    },
    {
      name: "Temporizador del microondas",
      description: "Un microondas que funciona exactamente el tiempo que le pones y después se detiene.",
      input: "El tiempo que ingresas",
      output: "El microondas funciona y luego se apaga",
      evidence: [
        {
          text: "Funciona exactamente el tiempo que pusiste, siempre",
        },
        {
          text: "No hicieron falta ejemplos",
        },
        {
          text: "Una persona escribió la regla de la cuenta regresiva",
        },
      ],
      reasoning: "Un temporizador cuenta hacia atrás tal como lo programaron. Es un programa tradicional de reglas fijas, sin nada de aprendizaje.",
      ruleOrPattern: "Regla fija: funcionar el tiempo indicado y luego parar.",
    },
    {
      name: "Filtro de correo no deseado",
      description: "Un filtro que separa el correo que llega en 'spam' y 'no spam'.",
      input: "Un mensaje de correo",
      output: "Una etiqueta: spam o no spam",
      evidence: [
        {
          text: "Atrapa spam nuevo que nunca había visto exactamente así",
        },
        {
          text: "Aprendió de millones de correos que la gente marcó",
        },
        {
          text: "Algunos filtros simples también usan listas de bloqueo fijas",
        },
      ],
      reasoning: "La mayoría de los filtros de spam modernos usan aprendizaje automático entrenado con correo etiquetado, así que 'sistema de aprendizaje automático' es lo que mejor encaja. Pero las implementaciones varían (algunas también usan listas de bloqueo fijas), así que 'no hay suficiente información' puede ser razonable si no conoces los detalles.",
      ruleOrPattern: "Casi siempre un patrón aprendido, a veces mezclado con reglas fijas.",
      infoNeeded: "Si este filtro en particular aprende de ejemplos o solo usa listas de bloqueo fijas.",
    },
    {
      name: "Carrito de juguete a control remoto",
      description: "Un carrito de juguete que un niño maneja con un control en la mano.",
      input: "Los botones que presionas en el control",
      output: "El carrito se mueve como le indicas",
      evidence: [
        {
          text: "Una persona decide cada movimiento",
        },
        {
          text: "No tiene sensores ni toma decisiones propias",
        },
        {
          text: "Nunca actúa por su cuenta",
        },
      ],
      reasoning: "El carrito hace exactamente lo que la persona le ordena y no toma ninguna decisión. Es una herramienta sin IA controlada por una persona: ni automatización ni IA.",
      ruleOrPattern: "Ninguno de los dos: una persona lo controla directamente.",
    },
    {
      name: "Sistema de pronóstico del tiempo",
      description: "Un servicio que pronostica el clima de mañana.",
      input: "Mediciones como temperatura, presión y viento",
      output: "Un pronóstico (por ejemplo, la probabilidad de lluvia)",
      evidence: [
        {
          text: "Algunos pronósticos usan ecuaciones de física (reglas numéricas)",
        },
        {
          text: "Algunos pronósticos usan aprendizaje automático con el clima pasado",
        },
        {
          text: "Muchos sistemas modernos combinan las dos cosas",
        },
      ],
      reasoning: "Los sistemas del clima pueden usar ecuaciones basadas en física, aprendizaje automático, o las dos cosas. Sin saber cuál, la respuesta honesta es 'no hay suficiente información'. Si aprende del clima pasado es aprendizaje automático; si solo resuelve ecuaciones fijas es un programa basado en reglas.",
      ruleOrPattern: "Depende: podrían ser reglas numéricas, patrones aprendidos o una mezcla.",
      infoNeeded: "Si este sistema resuelve ecuaciones físicas fijas, aprende de datos del clima pasado, o las dos cosas.",
    },
    {
      name: "Corrector ortográfico",
      description: "Una herramienta que marca las palabras mal escritas mientras escribes.",
      input: "Las palabras que escribes",
      output: "Marcas y correcciones sugeridas",
      evidence: [
        {
          text: "Algunos correctores solo comparan las palabras con una lista de diccionario",
        },
        {
          text: "Algunos usan estadística o modelos de lenguaje para adivinar tu intención",
        },
        {
          text: "No puedes saber cuál es solo con usarlo",
        },
      ],
      reasoning: "Los correctores varían mucho. Uno simple compara las palabras con un diccionario fijo (basado en reglas). Uno más listo usa estadística o un modelo de lenguaje (aprendizaje automático). Sin saber cuál es, 'no hay suficiente información' es la respuesta más honesta.",
      ruleOrPattern: "Mezclado: reglas de diccionario, estadística o modelos de lenguaje.",
      infoNeeded: "Si este corrector usa un diccionario fijo, un modelo estadístico o un modelo de lenguaje.",
    },
    {
      name: "Robot de juguete que sigue un recorrido fijo",
      description: "Un robot de juguete que siempre recorre el mismo camino preprogramado.",
      input: "Su programa interno (el mismo camino cada vez)",
      output: "El robot recorre el camino fijo",
      evidence: [
        {
          text: "Repite exactamente el mismo camino todas las veces",
        },
        {
          text: "No detecta ni se adapta a lo que hay a su alrededor",
        },
        {
          text: "Una persona programó el camino de antemano",
        },
      ],
      reasoning: "Tener cuerpo de robot no lo hace inteligente. Este solo repite un camino fijo y preprogramado, sin sensores ni aprendizaje, así que es automatización de reglas fijas.",
      ruleOrPattern: "Regla fija: seguir el camino preprogramado.",
    },
  ],
  starterCreatures: [
    {
      name: "Aleteante",
      description: "Una criatura pequeña, redonda y amarilla con dos alas, seis patas y antenas. Vive en tierra y no brilla.",
    },
    {
      name: "Pez Destello",
      description: "Una criatura larga y azul sin alas ni patas. Vive en el agua y puede brillar.",
    },
    {
      name: "Rodante",
      description: "Una criatura redonda y café con cuatro patas y sin alas. Vive en tierra y no brilla.",
    },
    {
      name: "Polilla Chispa",
      description: "Una criatura gris con dos alas, seis patas y antenas. Vive en tierra y puede brillar.",
    },
    {
      name: "Charquero",
      description: "Una criatura verde con cuatro patas y sin alas. Vive en el agua y no brilla.",
    },
    {
      name: "Lomo de Roca",
      description: "Una criatura gris y redonda con seis patas y sin alas. Vive en tierra y no brilla.",
    },
  ],
  withheldCreatures: [
    {
      name: "Ala Buceadora",
      description: "Una criatura azul con dos alas que vive bajo el agua. No tiene patas y no brilla. Aunque tiene alas, es un animal de agua.",
    },
    {
      name: "Aleta Rayo",
      description: "Una criatura café de tierra con cuatro patas y aletas decorativas en la espalda. No tiene alas y vive en tierra.",
    },
    {
      name: "Ala Rota",
      description: "Una criatura gris con las alas rotas que no puede volar, así que no tiene alas funcionales. Camina en dos patas y vive en tierra.",
    },
    {
      name: "Vacío",
      description: "Una criatura verde y pequeña sin alas, sin patas y sin antenas. Vive en tierra y no brilla: una combinación poco común.",
    },
  ],
  deviceExamples: [
    {
      name: "Termostato",
      input: "La temperatura del cuarto",
      output: "Enciende o apaga la calefacción o el aire",
      possibleFixedRules: "Si está por debajo de la temperatura fijada, enciende la calefacción",
      possibleLearnedPatterns: "Un termostato 'inteligente' podría aprender tu rutina diaria",
      evidence: "Un termostato básico sigue una sola regla de temperatura y no aprende.",
      infoNeeded: "Si aprende tu rutina (inteligente) o solo sigue un valor fijo.",
    },
    {
      name: "Búsqueda de fotos ('encontrar perros')",
      input: "Tus fotos y una palabra de búsqueda",
      output: "Las fotos que coinciden con la palabra",
      possibleFixedRules: "Ninguna obvia: 'qué es un perro' es difícil de escribir como regla",
      possibleLearnedPatterns: "Aprendió cómo se ven los perros a partir de muchas imágenes etiquetadas",
      evidence: "Reconocer objetos en cualquier foto necesita patrones aprendidos.",
      infoNeeded: "Poca: la búsqueda de imágenes es una tarea clásica de aprendizaje automático.",
    },
    {
      name: "Elevador",
      input: "Los botones que se presionan",
      output: "Va al piso elegido y abre",
      possibleFixedRules: "Ir a los pisos pedidos en un orden eficiente",
      possibleLearnedPatterns: "Normalmente ninguno: casi todos los elevadores solo siguen reglas",
      evidence: "Los elevadores siguen reglas de recorrido, no patrones aprendidos.",
      infoNeeded: "Si usa alguna predicción de las horas con más gente (poco común).",
    },
    {
      name: "App de traducción",
      input: "Texto en un idioma",
      output: "Texto en otro idioma",
      possibleFixedRules: "Los traductores viejos usaban reglas de diccionario palabra por palabra",
      possibleLearnedPatterns: "Los modernos aprendieron de millones de oraciones traducidas",
      evidence: "Las apps de traducción modernas suelen usar aprendizaje automático.",
      infoNeeded: "Si es un traductor viejo basado en reglas o uno moderno que aprendió.",
    },
    {
      name: "Máquina expendedora",
      input: "Dinero y una selección",
      output: "Entrega el producto elegido",
      possibleFixedRules: "Si hay dinero suficiente y el producto está en existencia, lo entrega",
      possibleLearnedPatterns: "Ninguno en una máquina básica",
      evidence: "Una máquina expendedora sigue reglas fijas y no aprende nada.",
      infoNeeded: "Si algún modelo sofisticado predice cuándo reabastecer (poco común).",
    },
  ],
  deviceFields: [
    {
      label: "Nombre del aparato o sistema",
      hint: "Un aparato, no tu nombre. Por ejemplo, 'termostato'.",
    },
    {
      label: "Entrada",
      hint: "¿Qué información entra?",
    },
    {
      label: "Salida",
      hint: "¿Qué produce o qué hace?",
    },
    {
      label: "Posibles reglas fijas",
      hint: "Reglas que alguien podría haber escrito.",
    },
    {
      label: "Posibles patrones aprendidos",
      hint: "Algo que podría haber aprendido de ejemplos.",
    },
    {
      label: "Evidencia de tu clasificación",
      hint: "¿Por qué lo crees?",
    },
    {
      label: "Información que todavía falta",
      hint: "¿Qué te ayudaría a estar más seguro?",
    },
  ],
  ruleFields: [
    {
      label: "Tiene alas",
    },
    {
      label: "Vive en el agua",
    },
    {
      label: "Tiene antenas",
    },
    {
      label: "Puede brillar",
    },
    {
      label: "Número de patas",
    },
    {
      label: "Color del cuerpo",
    },
    {
      label: "Forma del cuerpo",
    },
  ],
  categoryLabels: {
    "Sky Creature": "Criatura del cielo",
    "Water Creature": "Criatura del agua",
    "Land Creature": "Criatura de tierra",
  },
  colorLabels: {
    yellow: "Amarillo",
    blue: "Azul",
    green: "Verde",
    brown: "Café",
    gray: "Gris",
  },
  shapeLabels: {
    round: "Redonda",
    long: "Larga",
    finned: "Con aletas",
    spiky: "Con púas",
  },
  fieldSubjects: {
    hasWings: "tiene alas",
    livesInWater: "vive en el agua",
    hasAntennae: "tiene antenas",
    canGlow: "puede brillar",
    legs: "el número de patas",
    bodyColor: "el color del cuerpo",
    bodyShape: "la forma del cuerpo",
  },
  ruleWording: {
    addAtLeastOne: "Agrega al menos una regla.",
    chooseFeature: "Regla {n}: elige una característica.",
    chooseCondition: "Regla {n}: elige una condición.",
    chooseCategory: "Regla {n}: elige una categoría para asignar.",
    enterValue: "Regla {n}: escribe un valor.",
    not: "NO ({subject})",
    isAtLeast: "{subject} es al menos {value}",
    isAtMost: "{subject} es como máximo {value}",
    is: "{subject} es {value}",
    ifThen: "Si {condition} → {category}",
  },
}

const zh: DeepPartial<Week1Content> = {
  detectiveCategories: [
    {
      label: "机器学习系统",
      short: "从例子里学出规律",
    },
    {
      label: "固定规则的自动化，或传统程序",
      short: "照着人写好的规则做",
    },
    {
      label: "非人工智能的工具",
      short: "由人直接操控的工具",
    },
    {
      label: "信息不足",
      short: "可能不止一种，现在还判断不了",
    },
  ],
  systems: [
    {
      name: "计算器",
      description: "一个做加减乘除的基础计算器应用。",
      input: "你输入的数字和运算",
      output: "精确的答案",
      evidence: [
        {
          text: "同样的输入，每次都给出同样的答案",
        },
        {
          text: "算术的确切规则是人写好的",
        },
        {
          text: "它从来不需要靠例子来学习",
        },
      ],
      reasoning: "计算器执行的是人写好的精确算术规则。它从没从例子里学过任何东西，所以是传统的规则式程序，不是人工智能。",
      ruleOrPattern: "固定规则：算术直接写在代码里。",
    },
    {
      name: "语音助手",
      description: "一台能听懂口头提问并回答的智能音箱。",
      input: "你说出的话",
      output: "识别出的文字和一段口头回答",
      evidence: [
        {
          text: "能应付大量它从没听过的嗓音和口音",
        },
        {
          text: "用海量录制的语音训练过",
        },
        {
          text: "见的例子越多，语音识别就越准",
        },
      ],
      reasoning: "把千差万别的语音转成文字、再理解语言，远远不是手写规则能覆盖的。语音助手通常使用在大量语音和文本上训练出来的机器学习模型。",
      ruleOrPattern: "学出来的规律：用例子训练出的语音和语言模型。",
    },
    {
      name: "自动感应门",
      description: "商店的门，感应器察觉到有人靠近就打开。",
      input: "感应器检测到的动作",
      output: "门打开或关上",
      evidence: [
        {
          text: "只要感应到动静就开门：一条简单的规则",
        },
        {
          text: "它分不清动的是谁、是什么",
        },
        {
          text: "「有动静 → 开门」这条规则是人设定的",
        },
      ],
      reasoning: "这扇门执行的是一条固定规则：感应器看到动静就开。它不学习，也不认得任何东西，所以是固定规则的自动化：自动，但不是人工智能。",
      ruleOrPattern: "固定规则：检测到动静 → 开门。",
    },
    {
      name: "视频推荐流",
      description: "一个视频应用，负责安排接下来给你看哪些片子。",
      input: "你看过、点过赞、划走过的内容",
      output: "一份排好序的推荐视频列表",
      evidence: [
        {
          text: "它从你以前的行为里学出你的口味",
        },
        {
          text: "不同的人拿到不同的推荐",
        },
        {
          text: "它是在几百万观众的行为规律上训练出来的",
        },
      ],
      reasoning: "「你接下来会喜欢什么」没有简单的规则可写。推荐流通常使用机器学习，从你和别人看过的内容里找规律。",
      ruleOrPattern: "学出来的规律：根据观看历史做预测。",
    },
    {
      name: "感应灯",
      description: "室外的灯，感应器察觉到动静就亮起来。",
      input: "感应器附近的动静",
      output: "灯亮一段时间",
      evidence: [
        {
          text: "一条规则：有动静 → 灯亮",
        },
        {
          text: "它分不清是人还是动物",
        },
        {
          text: "它从来没有从例子里学过",
        },
      ],
      reasoning: "和感应门一样，这只是一条固定规则（有动静就把灯打开）。它不认得什么，也不学习，所以是固定规则的自动化，不是人工智能。",
      ruleOrPattern: "固定规则：有动静 → 灯亮。",
    },
    {
      name: "人脸解锁",
      description: "认出机主的脸就解锁的手机。",
      input: "摄像头拍到的人脸图像",
      output: "解锁，或者继续锁着",
      evidence: [
        {
          text: "在各种光线和角度下都能认出同一张脸",
        },
        {
          text: "它从示例图像里学出了人脸的特征",
        },
        {
          text: "你换了发型它照样能用",
        },
      ],
      reasoning: "要在不同角度和光线下认出某一张特定的脸，必须靠学出来的规律。人脸解锁通常使用机器学习的图像识别。",
      ruleOrPattern: "学出来的规律：用人脸样本训练出的图像识别。",
    },
    {
      name: "微波炉定时器",
      description: "微波炉按你设定的时间精确运行，到点就停。",
      input: "你输入的时间",
      output: "微波炉运行，然后停机",
      evidence: [
        {
          text: "每一次都精确运行你设定的时间",
        },
        {
          text: "不需要任何例子",
        },
        {
          text: "倒计时的规则是人写的",
        },
      ],
      reasoning: "定时器就是照着编好的程序倒数。它是传统的固定规则程序，完全没有学习。",
      ruleOrPattern: "固定规则：按设定时间运行，然后停止。",
    },
    {
      name: "垃圾邮件过滤器",
      description: "把收到的邮件分成「垃圾邮件」和「非垃圾邮件」的过滤器。",
      input: "一封电子邮件",
      output: "一个标签：垃圾邮件或非垃圾邮件",
      evidence: [
        {
          text: "它能拦下从没一模一样见过的新垃圾邮件",
        },
        {
          text: "它从上百万封被人标记过的邮件里学习",
        },
        {
          text: "有些简单的过滤器也会用固定的黑名单",
        },
      ],
      reasoning: "现在多数垃圾邮件过滤器都用带标签的邮件训练出的机器学习，所以「机器学习系统」最贴切。但各家做法不同，有的也会加固定黑名单规则，所以如果你不清楚细节，选「信息不足」也说得通。",
      ruleOrPattern: "多半是学出来的规律，有时也混着固定规则。",
      infoNeeded: "这个过滤器到底是从例子里学习，还是只用固定黑名单。",
    },
    {
      name: "遥控玩具车",
      description: "小孩用手持遥控器开的玩具车。",
      input: "遥控器上按下的按钮",
      output: "车按指令移动",
      evidence: [
        {
          text: "去哪儿全由人来决定",
        },
        {
          text: "它自己既不感知也不做判断",
        },
        {
          text: "它从不自行行动",
        },
      ],
      reasoning: "这辆车完全照人的指令走，自己不做任何决定。它是由人直接操控的非人工智能工具：既不是自动化，也不是人工智能。",
      ruleOrPattern: "两者都不是：由人直接操控。",
    },
    {
      name: "天气预报系统",
      description: "预报明天天气的服务。",
      input: "温度、气压、风力等测量数据",
      output: "一份预报（例如降雨概率）",
      evidence: [
        {
          text: "有些预报用物理方程（数值规则）",
        },
        {
          text: "有些预报用机器学习分析过去的天气",
        },
        {
          text: "很多现代系统两种都用",
        },
      ],
      reasoning: "天气系统可能用基于物理的方程，可能用机器学习，也可能两者都用。在不知道是哪一种的情况下，诚实的回答是「信息不足」。如果它从过去的天气里学习，那就是机器学习；如果只是解固定方程，那就是规则式程序。",
      ruleOrPattern: "看情况：可能是数值规则、学出来的规律，或者两者混合。",
      infoNeeded: "这个系统是解固定的物理方程、从过去的天气数据里学习，还是两者都有。",
    },
    {
      name: "拼写检查器",
      description: "你打字时会标出拼错单词的工具。",
      input: "你输入的词",
      output: "标记和建议的更正",
      evidence: [
        {
          text: "有些检查器只是把词和词典列表对一遍",
        },
        {
          text: "有些用统计或语言模型来猜你想写什么",
        },
        {
          text: "光是用它，你看不出是哪一种",
        },
      ],
      reasoning: "拼写检查器差别很大。简单的会把词和固定词典对照（规则式）。聪明一点的会用统计或语言模型（机器学习）。在不知道是哪一种的情况下，「信息不足」是最诚实的答案。",
      ruleOrPattern: "混合：词典规则、统计，或者语言模型。",
      infoNeeded: "这个检查器用的是固定词典、统计模型，还是语言模型。",
    },
    {
      name: "按固定路线走的玩具机器人",
      description: "一个玩具机器人，每次都沿着同一条事先编好的路线走。",
      input: "它内置的程序（每次都是同一条路线）",
      output: "机器人沿固定路线行驶",
      evidence: [
        {
          text: "它每次都重复完全相同的路线",
        },
        {
          text: "它不感知周围，也不随环境调整",
        },
        {
          text: "路线是人事先编好的",
        },
      ],
      reasoning: "有个机器人的外形并不代表它聪明。这一个只是重复一条事先编好的固定路线，既不感知也不学习，所以是固定规则的自动化。",
      ruleOrPattern: "固定规则：沿着事先编好的路线走。",
    },
  ],
  starterCreatures: [
    {
      name: "扑翼虫",
      description: "一只圆圆的黄色小生物，有两只翅膀、六条腿和触角。它住在陆地上，不会发光。",
    },
    {
      name: "闪光鱼",
      description: "一只细长的蓝色生物，没有翅膀也没有腿。它住在水里，会发光。",
    },
    {
      name: "滚滚兽",
      description: "一只圆圆的棕色生物，有四条腿，没有翅膀。它住在陆地上，不会发光。",
    },
    {
      name: "火花蛾",
      description: "一只灰色的生物，有两只翅膀、六条腿和触角。它住在陆地上，会发光。",
    },
    {
      name: "戏水兽",
      description: "一只绿色的生物，有四条腿，没有翅膀。它住在水里，不会发光。",
    },
    {
      name: "岩背兽",
      description: "一只圆圆的灰色生物，有六条腿，没有翅膀。它住在陆地上，不会发光。",
    },
  ],
  withheldCreatures: [
    {
      name: "潜翼兽",
      description: "一只蓝色的生物，长着两只翅膀，却生活在水下。它没有腿，也不会发光。虽然有翅膀，它是水生动物。",
    },
    {
      name: "鳍棘兽",
      description: "一只棕色的陆生生物，有四条腿，背上长着装饰性的鳍。它没有翅膀，住在陆地上。",
    },
    {
      name: "破翼兽",
      description: "一只灰色的生物，翅膀已经破了、飞不起来，所以没有能用的翅膀。它用两条腿走路，住在陆地上。",
    },
    {
      name: "空空兽",
      description: "一只绿色的小生物，没有翅膀、没有腿，也没有触角。它住在陆地上，不会发光，是很少见的组合。",
    },
  ],
  deviceExamples: [
    {
      name: "温控器",
      input: "房间温度",
      output: "打开或关闭制热、制冷",
      possibleFixedRules: "如果低于设定温度，就开启制热",
      possibleLearnedPatterns: "「智能」温控器可能会学出你每天的作息",
      evidence: "普通温控器只按一条温度规则运行，不会学习。",
      infoNeeded: "它是会学你的作息（智能款），还是只照着设定值执行。",
    },
    {
      name: "照片搜索（「找出狗」）",
      input: "你的照片和一个搜索词",
      output: "与这个词匹配的照片",
      possibleFixedRules: "没有明显的规则：「什么是狗」很难写成规则",
      possibleLearnedPatterns: "从大量带标签的图片里学出了狗长什么样",
      evidence: "要在任意照片里认出物体，必须靠学出来的规律。",
      infoNeeded: "几乎不用问：图像搜索是机器学习的经典任务。",
    },
    {
      name: "电梯",
      input: "按下的按钮",
      output: "开到选定的楼层并开门",
      possibleFixedRules: "按高效的顺序去往被请求的楼层",
      possibleLearnedPatterns: "通常没有：多数电梯只是照规则运行",
      evidence: "电梯执行的是调度规则，不是学出来的规律。",
      infoNeeded: "它有没有用到对高峰时段的预测（很少见）。",
    },
    {
      name: "翻译应用",
      input: "一种语言的文字",
      output: "另一种语言的文字",
      possibleFixedRules: "老式翻译器用逐词的词典规则",
      possibleLearnedPatterns: "现代的从上百万条翻译好的句子里学习",
      evidence: "现代翻译应用通常使用机器学习。",
      infoNeeded: "它是老式的规则翻译器，还是现代的学习型翻译器。",
    },
    {
      name: "自动售货机",
      input: "投的钱和选择",
      output: "送出选中的商品",
      possibleFixedRules: "如果钱够、货有存，就把商品送出来",
      possibleLearnedPatterns: "基础机型里没有",
      evidence: "自动售货机执行固定规则，完全不学习。",
      infoNeeded: "有没有高级机型会预测补货（不常见）。",
    },
  ],
  deviceFields: [
    {
      label: "设备或系统的名称",
      hint: "写设备，不要写你的名字。例如「温控器」。",
    },
    {
      label: "输入",
      hint: "有什么信息进来？",
    },
    {
      label: "输出",
      hint: "它产出什么，或者做什么？",
    },
    {
      label: "可能的固定规则",
      hint: "人可能写下的规则。",
    },
    {
      label: "可能学出来的规律",
      hint: "它可能从例子里学到的东西。",
    },
    {
      label: "你分类的依据",
      hint: "你为什么这么想？",
    },
    {
      label: "还缺少的信息",
      hint: "知道什么能让你更有把握？",
    },
  ],
  ruleFields: [
    {
      label: "有翅膀",
    },
    {
      label: "住在水里",
    },
    {
      label: "有触角",
    },
    {
      label: "会发光",
    },
    {
      label: "腿的数量",
    },
    {
      label: "身体颜色",
    },
    {
      label: "身体形状",
    },
  ],
  categoryLabels: {
    "Sky Creature": "空中生物",
    "Water Creature": "水生生物",
    "Land Creature": "陆生生物",
  },
  colorLabels: {
    yellow: "黄色",
    blue: "蓝色",
    green: "绿色",
    brown: "棕色",
    gray: "灰色",
  },
  shapeLabels: {
    round: "圆形",
    long: "细长",
    finned: "带鳍",
    spiky: "带刺",
  },
  fieldSubjects: {
    hasWings: "它有翅膀",
    livesInWater: "它住在水里",
    hasAntennae: "它有触角",
    canGlow: "它会发光",
    legs: "腿的数量",
    bodyColor: "身体颜色",
    bodyShape: "身体形状",
  },
  ruleWording: {
    addAtLeastOne: "至少加一条规则。",
    chooseFeature: "第 {n} 条规则：选一个特征。",
    chooseCondition: "第 {n} 条规则：选一个条件。",
    chooseCategory: "第 {n} 条规则：选一个要归入的类别。",
    enterValue: "第 {n} 条规则：填一个值。",
    not: "非（{subject}）",
    isAtLeast: "{subject} 至少是 {value}",
    isAtMost: "{subject} 最多是 {value}",
    is: "{subject} 是 {value}",
    ifThen: "如果 {condition} → {category}",
  },
}

const pt: DeepPartial<Week1Content> = {
  detectiveCategories: [
    {
      label: "Sistema de aprendizado de máquina",
      short: "Aprende padrões a partir de exemplos",
    },
    {
      label: "Automação de regras fixas ou programa tradicional",
      short: "Segue regras que uma pessoa escreveu",
    },
    {
      label: "Ferramenta sem IA",
      short: "Uma ferramenta que uma pessoa controla diretamente",
    },
    {
      label: "Informação insuficiente",
      short: "Pode ser mais de uma: ainda não dá para dizer",
    },
  ],
  systems: [
    {
      name: "Calculadora",
      description: "Um aplicativo de calculadora básica que soma, subtrai, multiplica e divide.",
      input: "Os números e a operação que você digita",
      output: "A resposta exata",
      evidence: [
        {
          text: "Dá a mesma resposta toda vez para a mesma entrada",
        },
        {
          text: "Uma pessoa escreveu as regras exatas da aritmética",
        },
        {
          text: "Ela nunca precisou de exemplos para aprender",
        },
      ],
      reasoning: "Uma calculadora segue regras aritméticas exatas que uma pessoa escreveu. Ela nunca aprendeu com exemplos, então é um programa tradicional de regras fixas, não IA.",
      ruleOrPattern: "Regra fixa: a aritmética está escrita direto no código.",
    },
    {
      name: "Assistente de voz",
      description: "Uma caixa de som inteligente que entende perguntas faladas e responde.",
      input: "As suas palavras faladas",
      output: "Texto reconhecido e uma resposta falada",
      evidence: [
        {
          text: "Dá conta de muitas vozes e sotaques que nunca ouviu antes",
        },
        {
          text: "Foi treinada com uma quantidade enorme de fala gravada",
        },
        {
          text: "O reconhecimento de voz melhora conforme vê mais exemplos",
        },
      ],
      reasoning: "Transformar uma fala tão variada em texto e entender a linguagem é bagunçado demais para regras escritas à mão. Assistentes de voz costumam usar aprendizado de máquina treinado com muita fala e muito texto.",
      ruleOrPattern: "Padrão aprendido: modelos de fala e linguagem treinados com exemplos.",
    },
    {
      name: "Porta automática de correr",
      description: "A porta de uma loja que abre quando um sensor de movimento detecta alguém chegando.",
      input: "Movimento detectado por um sensor",
      output: "A porta abre ou fecha",
      evidence: [
        {
          text: "Abre sempre que sente movimento: uma regra simples",
        },
        {
          text: "Ela não reconhece quem nem o que está se movendo",
        },
        {
          text: "Uma pessoa definiu a regra 'movimento → abrir'",
        },
      ],
      reasoning: "A porta segue uma regra fixa: se o sensor vê movimento, abre. Ela não aprende nem reconhece nada, então é automação de regra fixa: automática, mas não IA.",
      ruleOrPattern: "Regra fixa: movimento detectado → abrir.",
    },
    {
      name: "Feed de recomendação de vídeos",
      description: "Um aplicativo de vídeo que organiza quais clipes mostrar em seguida.",
      input: "O que você assistiu, curtiu e pulou",
      output: "Uma lista ordenada de vídeos para sugerir",
      evidence: [
        {
          text: "Ele aprende o seu gosto pelo que você fez antes",
        },
        {
          text: "Pessoas diferentes recebem recomendações diferentes",
        },
        {
          text: "Foi treinado com padrões de milhões de espectadores",
        },
      ],
      reasoning: "Não existe regra simples para 'do que você vai gostar em seguida'. Feeds de recomendação costumam usar aprendizado de máquina que encontra padrões no que você e outras pessoas assistiram.",
      ruleOrPattern: "Padrão aprendido: previsões a partir do histórico de exibição.",
    },
    {
      name: "Lâmpada com sensor de movimento",
      description: "Uma luz externa que acende quando o sensor detecta movimento.",
      input: "Movimento perto do sensor",
      output: "A luz acende por um tempo",
      evidence: [
        {
          text: "Uma regra: movimento → luz acesa",
        },
        {
          text: "Ela não diferencia uma pessoa de um animal",
        },
        {
          text: "Nunca aprendeu com exemplos",
        },
      ],
      reasoning: "Igual à porta de correr, isto é uma regra fixa só (movimento acende a luz). Ela não reconhece nada e não aprende, então é automação de regra fixa, não IA.",
      ruleOrPattern: "Regra fixa: movimento → luz acesa.",
    },
    {
      name: "Desbloqueio por rosto",
      description: "Um celular que desbloqueia quando reconhece o rosto do dono.",
      input: "Uma imagem de rosto captada pela câmera",
      output: "Desbloquear ou continuar bloqueado",
      evidence: [
        {
          text: "Reconhece um rosto em muitas condições de luz e ângulos",
        },
        {
          text: "Aprendeu padrões faciais a partir de imagens de exemplo",
        },
        {
          text: "Continua funcionando mesmo se você mudar o cabelo",
        },
      ],
      reasoning: "Reconhecer um rosto específico em vários ângulos e iluminações precisa de padrões aprendidos. O desbloqueio por rosto costuma usar reconhecimento de imagem com aprendizado de máquina.",
      ruleOrPattern: "Padrão aprendido: reconhecimento de imagem treinado com exemplos de rostos.",
    },
    {
      name: "Timer do micro-ondas",
      description: "Um micro-ondas que funciona exatamente o tempo que você marca e depois para.",
      input: "O tempo que você digita",
      output: "O micro-ondas funciona e depois desliga",
      evidence: [
        {
          text: "Funciona exatamente o tempo marcado, sempre",
        },
        {
          text: "Nenhum exemplo foi necessário",
        },
        {
          text: "Uma pessoa escreveu a regra da contagem regressiva",
        },
      ],
      reasoning: "Um timer conta para trás exatamente como foi programado. É um programa tradicional de regras fixas, sem nenhum aprendizado.",
      ruleOrPattern: "Regra fixa: funcionar pelo tempo marcado e depois parar.",
    },
    {
      name: "Filtro de spam de e-mail",
      description: "Um filtro que separa os e-mails que chegam em 'spam' e 'não spam'.",
      input: "Uma mensagem de e-mail",
      output: "Um rótulo: spam ou não spam",
      evidence: [
        {
          text: "Pega spam novo que nunca viu exatamente assim antes",
        },
        {
          text: "Aprendeu com milhões de e-mails que as pessoas marcaram",
        },
        {
          text: "Alguns filtros simples também usam listas de bloqueio fixas",
        },
      ],
      reasoning: "A maioria dos filtros de spam modernos usa aprendizado de máquina treinado com e-mails rotulados, então 'sistema de aprendizado de máquina' é o que encaixa melhor. Mas as implementações variam (algumas também usam listas de bloqueio fixas), então 'informação insuficiente' pode ser razoável se você não sabe os detalhes.",
      ruleOrPattern: "Quase sempre um padrão aprendido, às vezes misturado com regras fixas.",
      infoNeeded: "Se este filtro em particular aprende com exemplos ou só usa listas de bloqueio fixas.",
    },
    {
      name: "Carrinho de controle remoto",
      description: "Um carrinho de brinquedo que uma criança dirige com um controle na mão.",
      input: "Os botões apertados no controle",
      output: "O carrinho anda conforme o comando",
      evidence: [
        {
          text: "Uma pessoa decide cada movimento",
        },
        {
          text: "Ele não tem sensor nem toma decisões próprias",
        },
        {
          text: "Nunca age por conta própria",
        },
      ],
      reasoning: "O carrinho faz exatamente o que a pessoa manda e não toma nenhuma decisão. É uma ferramenta sem IA controlada por uma pessoa: nem automação nem IA.",
      ruleOrPattern: "Nenhum dos dois: uma pessoa está no controle direto.",
    },
    {
      name: "Sistema de previsão do tempo",
      description: "Um serviço que prevê o tempo de amanhã.",
      input: "Medições como temperatura, pressão e vento",
      output: "Uma previsão (por exemplo, chance de chuva)",
      evidence: [
        {
          text: "Algumas previsões usam equações da física (regras numéricas)",
        },
        {
          text: "Algumas previsões usam aprendizado de máquina sobre o tempo passado",
        },
        {
          text: "Muitos sistemas modernos combinam os dois",
        },
      ],
      reasoning: "Sistemas de previsão podem usar equações baseadas em física, aprendizado de máquina, ou os dois. Sem saber qual, a resposta honesta é 'informação insuficiente'. Se aprende com o tempo passado é aprendizado de máquina; se só resolve equações fixas é um programa baseado em regras.",
      ruleOrPattern: "Depende: podem ser regras numéricas, padrões aprendidos ou uma mistura.",
      infoNeeded: "Se este sistema resolve equações físicas fixas, aprende com dados do tempo passado, ou os dois.",
    },
    {
      name: "Corretor ortográfico",
      description: "Uma ferramenta que marca palavras erradas enquanto você digita.",
      input: "As palavras que você digita",
      output: "Marcações e correções sugeridas",
      evidence: [
        {
          text: "Alguns corretores só comparam as palavras com uma lista de dicionário",
        },
        {
          text: "Alguns usam estatística ou modelos de linguagem para adivinhar a sua intenção",
        },
        {
          text: "Só usando, você não descobre qual é",
        },
      ],
      reasoning: "Corretores variam bastante. Um simples compara as palavras com um dicionário fixo (baseado em regras). Um mais esperto usa estatística ou um modelo de linguagem (aprendizado de máquina). Sem saber qual é, 'informação insuficiente' é a resposta mais honesta.",
      ruleOrPattern: "Misto: regras de dicionário, estatística ou modelos de linguagem.",
      infoNeeded: "Se este corretor usa um dicionário fixo, um modelo estatístico ou um modelo de linguagem.",
    },
    {
      name: "Robô de brinquedo que segue um trajeto fixo",
      description: "Um robô de brinquedo que sempre percorre o mesmo trajeto pré-programado.",
      input: "O programa interno dele (o mesmo trajeto toda vez)",
      output: "O robô percorre o trajeto fixo",
      evidence: [
        {
          text: "Repete exatamente o mesmo trajeto toda vez",
        },
        {
          text: "Não percebe nem se adapta ao que está em volta",
        },
        {
          text: "Uma pessoa programou o trajeto de antemão",
        },
      ],
      reasoning: "Ter corpo de robô não deixa nada inteligente. Este só repete um trajeto fixo e pré-programado, sem sensor e sem aprendizado, então é automação de regra fixa.",
      ruleOrPattern: "Regra fixa: seguir o trajeto pré-programado.",
    },
  ],
  starterCreatures: [
    {
      name: "Esvoaçante",
      description: "Uma criatura pequena, redonda e amarela com duas asas, seis pernas e antenas. Vive em terra e não brilha.",
    },
    {
      name: "Peixe-brilho",
      description: "Uma criatura comprida e azul, sem asas e sem pernas. Vive na água e brilha.",
    },
    {
      name: "Rolante",
      description: "Uma criatura redonda e marrom com quatro pernas e sem asas. Vive em terra e não brilha.",
    },
    {
      name: "Mariposa-faísca",
      description: "Uma criatura cinza com duas asas, seis pernas e antenas. Vive em terra e brilha.",
    },
    {
      name: "Poçador",
      description: "Uma criatura verde com quatro pernas e sem asas. Vive na água e não brilha.",
    },
    {
      name: "Costas-de-pedra",
      description: "Uma criatura cinza e redonda com seis pernas e sem asas. Vive em terra e não brilha.",
    },
  ],
  withheldCreatures: [
    {
      name: "Asa-mergulhadora",
      description: "Uma criatura azul com duas asas que vive embaixo d'água. Não tem pernas e não brilha. Mesmo tendo asas, é um animal de água.",
    },
    {
      name: "Raio-de-barbatana",
      description: "Uma criatura marrom de terra com quatro pernas e barbatanas decorativas nas costas. Não tem asas e vive em terra.",
    },
    {
      name: "Asa-rasgada",
      description: "Uma criatura cinza com as asas rasgadas, que não consegue voar, então não tem asas funcionais. Anda sobre duas pernas e vive em terra.",
    },
    {
      name: "Vazinho",
      description: "Uma criatura verde e pequena, sem asas, sem pernas e sem antenas. Vive em terra e não brilha: uma combinação incomum.",
    },
  ],
  deviceExamples: [
    {
      name: "Termostato",
      input: "A temperatura do ambiente",
      output: "Liga ou desliga o aquecimento ou o resfriamento",
      possibleFixedRules: "Se estiver abaixo da temperatura definida, liga o aquecimento",
      possibleLearnedPatterns: "Um termostato 'inteligente' pode aprender a sua rotina diária",
      evidence: "Um termostato básico segue uma regra de temperatura e não aprende.",
      infoNeeded: "Se ele aprende a sua rotina (inteligente) ou só segue um valor definido.",
    },
    {
      name: "Busca de fotos ('achar cachorros')",
      input: "As suas fotos e uma palavra de busca",
      output: "As fotos que combinam com a palavra",
      possibleFixedRules: "Nenhuma óbvia: 'o que é um cachorro' é difícil de escrever como regra",
      possibleLearnedPatterns: "Aprendeu a aparência de cachorros a partir de muitas imagens rotuladas",
      evidence: "Reconhecer objetos em qualquer foto precisa de padrões aprendidos.",
      infoNeeded: "Pouca: busca de imagens é uma tarefa clássica de aprendizado de máquina.",
    },
    {
      name: "Elevador",
      input: "Os botões apertados",
      output: "Vai até o andar escolhido e abre",
      possibleFixedRules: "Ir aos andares pedidos numa ordem eficiente",
      possibleLearnedPatterns: "Normalmente nenhum: quase todo elevador só segue regras",
      evidence: "Elevadores seguem regras de trajeto, não padrões aprendidos.",
      infoNeeded: "Se ele usa alguma previsão de horários de pico (raro).",
    },
    {
      name: "Aplicativo de tradução",
      input: "Texto em um idioma",
      output: "Texto em outro idioma",
      possibleFixedRules: "Tradutores antigos usavam regras de dicionário, palavra por palavra",
      possibleLearnedPatterns: "Os modernos aprenderam com milhões de frases traduzidas",
      evidence: "Aplicativos de tradução modernos costumam usar aprendizado de máquina.",
      infoNeeded: "Se é um tradutor antigo baseado em regras ou um moderno que aprendeu.",
    },
    {
      name: "Máquina de vendas",
      input: "Dinheiro e uma escolha",
      output: "Entrega o produto escolhido",
      possibleFixedRules: "Se o dinheiro for suficiente e o produto estiver em estoque, entrega",
      possibleLearnedPatterns: "Nenhum numa máquina básica",
      evidence: "Uma máquina de vendas segue regras fixas e não aprende nada.",
      infoNeeded: "Se algum modelo sofisticado prevê a reposição (incomum).",
    },
  ],
  deviceFields: [
    {
      label: "Nome do aparelho ou sistema",
      hint: "Um aparelho, não o seu nome. Por exemplo, 'termostato'.",
    },
    {
      label: "Entrada",
      hint: "Que informação entra?",
    },
    {
      label: "Saída",
      hint: "O que ele produz ou faz?",
    },
    {
      label: "Possíveis regras fixas",
      hint: "Regras que alguém poderia ter escrito.",
    },
    {
      label: "Possíveis padrões aprendidos",
      hint: "Algo que ele pode ter aprendido com exemplos.",
    },
    {
      label: "Evidência da sua classificação",
      hint: "Por que você acha isso?",
    },
    {
      label: "Informação que ainda falta",
      hint: "O que ajudaria você a ter mais certeza?",
    },
  ],
  ruleFields: [
    {
      label: "Tem asas",
    },
    {
      label: "Vive na água",
    },
    {
      label: "Tem antenas",
    },
    {
      label: "Consegue brilhar",
    },
    {
      label: "Número de pernas",
    },
    {
      label: "Cor do corpo",
    },
    {
      label: "Formato do corpo",
    },
  ],
  categoryLabels: {
    "Sky Creature": "Criatura do céu",
    "Water Creature": "Criatura da água",
    "Land Creature": "Criatura de terra",
  },
  colorLabels: {
    yellow: "Amarelo",
    blue: "Azul",
    green: "Verde",
    brown: "Marrom",
    gray: "Cinza",
  },
  shapeLabels: {
    round: "Redondo",
    long: "Comprido",
    finned: "Com barbatanas",
    spiky: "Espinhoso",
  },
  fieldSubjects: {
    hasWings: "ela tem asas",
    livesInWater: "ela vive na água",
    hasAntennae: "ela tem antenas",
    canGlow: "ela consegue brilhar",
    legs: "o número de pernas",
    bodyColor: "a cor do corpo",
    bodyShape: "o formato do corpo",
  },
  ruleWording: {
    addAtLeastOne: "Acrescente pelo menos uma regra.",
    chooseFeature: "Regra {n}: escolha uma característica.",
    chooseCondition: "Regra {n}: escolha uma condição.",
    chooseCategory: "Regra {n}: escolha uma categoria para atribuir.",
    enterValue: "Regra {n}: escreva um valor.",
    not: "NÃO ({subject})",
    isAtLeast: "{subject} é pelo menos {value}",
    isAtMost: "{subject} é no máximo {value}",
    is: "{subject} é {value}",
    ifThen: "Se {condition} → {category}",
  },
}

const overlays: LocaleOverlays<Week1Content> = { es, zh, pt }

/** The Week 1 activity content in the requested language. */
export const getWeek1Activities = createLocalizedResolver(base, overlays)

/** Whether Week 1 has been translated into `language` at all. */
export function week1HasTranslation(language: Language): boolean {
  return hasLocaleOverlay(overlays, language)
}

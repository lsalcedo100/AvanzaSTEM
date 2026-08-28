import type {
  IntroToAiCourse,
  CourseWeek,
  Lesson,
} from "./types.ts"
import { introToAiCourse } from "./index.ts"
import {
  createLocalizedResolver,
  hasLocaleOverlay,
  type DeepPartial,
  type LocaleOverlays,
} from "../../../lib/localize-content.ts"
import type { Language } from "../../../i18n/translations.ts"

/**
 * Translations for the Intro to Artificial Intelligence course.
 *
 * Sparse overlays merged onto the English `introToAiCourse` by
 * `lib/localize-content`. Only prose lives here: slugs, week numbers, hrefs,
 * answer keys, and diagram/accent identifiers stay shared with English so the
 * course cannot structurally drift between locales.
 *
 * Untranslated strings fall through to English automatically, so this file can
 * grow one week at a time.
 */
const es: DeepPartial<IntroToAiCourse> = {
  title: "Introducción a la Inteligencia Artificial",
  subtitle: "Un curso de seis semanas donde los estudiantes de 5.º a 8.º grado aprenden qué es realmente la IA, cómo los datos entrenan un modelo, dónde se equivoca la IA y cómo usarla de forma responsable.",
  description: "Descubre qué es la IA y cómo funciona con actividades adecuadas para tu edad. Explora cómo los datos le enseñan a un modelo, cómo funcionan la IA de imágenes y la de texto y dónde fallan, y cómo usar la IA de forma justa y segura, para terminar diseñando tu propia IA en un estudio de diseño. No se necesita experiencia en programación.",
  gradeRange: "5.º a 8.º grado",
  duration: "6 semanas",
  estimatedTotalTime: "Unas 7-9 horas",
  requirements: [
    "No se necesita experiencia en programación",
    "Funciona en un navegador web, en las Chromebooks, tabletas o laptops de la escuela",
    "Los conjuntos de datos vienen incluidos: no hay que descargar nada ni crear cuentas",
    "No se necesita cámara ni micrófono",
    "No se necesita información personal",
  ],
  learningOutcomes: [
    "Distinguir la inteligencia artificial del software común y de la automatización.",
    "Explicar cómo los ejemplos, las etiquetas y las características entrenan un modelo, y por qué importa que los datos estén equilibrados y bien etiquetados.",
    "Leer la exactitud y la confianza de un modelo, e interpretar los falsos positivos, los falsos negativos y una matriz de confusión.",
    "Describir cómo funcionan los chatbots, los modelos de lenguaje y los sistemas de recomendación, y dónde se equivocan.",
    "Revisar si una IA tiene sesgos, proteger la privacidad, verificar la información y saber cuándo las personas deben mantener el control.",
    "Diseñar, prototipar, probar y presentar una solución de IA responsable para un problema real.",
  ],
  finalProjectPreview: "En el Estudio de Diseño de IA de la semana 6, diseñas una herramienta de IA que ayuda a un grupo real de personas: defines el problema, decides si la IA encaja, planeas las entradas y las salidas, dibujas un prototipo, escribes casos de prueba y explicas cómo la mantendrías justa, privada y bajo supervisión humana.",
  skills: [
    {
      label: "Distinguir la IA del software común",
      description: "Decidir si una tecnología sigue reglas escritas o aprende patrones a partir de ejemplos.",
    },
    {
      label: "Razonar sobre los datos",
      description: "Usar ejemplos, etiquetas y características, y juzgar si un conjunto de datos está equilibrado y bien etiquetado.",
    },
    {
      label: "Evaluar un modelo",
      description: "Leer la exactitud, la confianza y las matrices de confusión, y detectar falsos positivos, falsos negativos y casos límite.",
    },
    {
      label: "Entender la IA de texto y las recomendaciones",
      description: "Explicar los árboles de decisión, la predicción del texto que sigue, y cómo se forman las recomendaciones y las burbujas de filtros.",
    },
    {
      label: "Usar la IA de forma responsable",
      description: "Revisar si hay sesgos, proteger la privacidad, verificar las fuentes y saber cuándo hacen falta supervisión humana y derecho a apelación.",
    },
    {
      label: "Diseñar una solución de IA",
      description: "Definir un problema, decidir si la IA encaja, planear entradas y salidas, prototipar, probar y presentar.",
    },
  ],
  materials: {
    required: [
      {
        name: "Un navegador web en una Chromebook, tableta o laptop de la escuela",
        note: "No hay que instalar nada. Funciona en los equipos que da la escuela.",
      },
      {
        name: "Papel y lápiz, o una app de notas",
      },
      {
        name: "Conjuntos de datos incluidos",
        note: "Vienen dentro del curso: no hay que descargar nada ni crear cuentas.",
      },
    ],
    optional: [
      {
        name: "Un dispositivo personal para explorar sus aplicaciones",
        note: "Solo para buscar ejemplos de IA en la vida real; nunca es obligatorio y no se recopila ningún dato personal.",
      },
      {
        name: "Hojas de trabajo impresas",
        note: "Para los grupos que prefieren trabajar en papel.",
      },
    ],
  },
  weeks: [
    {
      title: "Qué es y qué no es la IA",
      subtitle: "Distingue la inteligencia artificial del software común y detecta la IA que ya tienes alrededor.",
      summary: "Los estudiantes aprenden qué significa realmente la inteligencia artificial, en qué se diferencia de los programas tradicionales y de la automatización, y cómo reconocer la IA cotidiana que ya usan, preguntándose siempre si el software sigue reglas escritas o aprende patrones a partir de ejemplos.",
      bigQuestion: "¿Qué hace que algo sea \"inteligencia artificial\" y no software común?",
      estimatedTime: "2.5-3 horas",
      objectives: [
        "Definir la inteligencia artificial y distinguirla del software tradicional.",
        "Explicar la diferencia entre automatización y aprendizaje automático.",
        "Seguir el rastro de la entrada, las reglas, la salida y los patrones aprendidos.",
        "Reconocer la IA cotidiana y las decisiones humanas que hay detrás.",
      ],
      requiredConcepts: [
        "Inteligencia artificial",
        "Automatización",
        "Programas tradicionales",
        "Aprendizaje automático",
        "Entrada",
        "Regla",
        "Salida",
        "Patrón aprendido",
        "Las decisiones humanas detrás de la IA",
      ],
      lessons: [
        {
          title: "¿Es IA o no?",
          summary: "Clasifica la tecnología de todos los días en inteligencia artificial y software común, y aprende la única pregunta que las distingue.",
          estimatedTime: "45-55 minutos",
          objectives: [
            {
              text: "Explicar con tus propias palabras qué significa inteligencia artificial.",
            },
            {
              text: "Distinguir entre la IA y el software común (tradicional).",
            },
            {
              text: "Dar tres ejemplos de IA que te encuentras en la vida diaria.",
            },
          ],
          materials: [
            {
              name: "Esta lección en un navegador web",
            },
            {
              name: "Papel y lápiz, o una app de notas",
            },
            {
              name: "Un dispositivo que uses seguido (teléfono, tableta, laptop) para revisar sus aplicaciones",
              note: "Para reunir tus propios ejemplos.",
            },
          ],
          vocabulary: [
            {
              term: "Inteligencia artificial (IA)",
              definition: "Software de computadora que hace tareas que normalmente parecen necesitar el pensamiento humano, como reconocer imágenes, entender el lenguaje o hacer predicciones.",
            },
            {
              term: "Programa tradicional",
              definition: "Software que sigue reglas exactas que escribió una persona, paso a paso, y que hace siempre lo mismo con la misma entrada.",
            },
            {
              term: "Entrada",
              definition: "La información que le das a un programa, como una foto, una oración o presionar un botón.",
            },
            {
              term: "Salida",
              definition: "El resultado que devuelve un programa, como una respuesta, una etiqueta o una acción.",
            },
          ],
          openingScenario: {
            prompt: "Una calculadora suma números. Una app de fotos encuentra todas las imágenes de tu perro. Las dos son software. ¿Alguna de ellas es \"inteligencia artificial\"? ¿Cómo podrías decidirlo?",
            context: "Ten presente tu primera respuesta: la vas a revisar al final de la lección.",
          },
          predictionPrompt: {
            prompt: "Predice: de una calculadora, un filtro de spam, un apagador de luz y un asistente de voz, ¿cuáles crees que usan IA?",
            howToCheck: "Mientras lees los conceptos de abajo, decide si cada uno solo sigue reglas fijas o si aprende patrones a partir de ejemplos.",
          },
          concepts: [
            {
              title: "Qué significa realmente \"inteligencia artificial\"",
              body: [
                "La inteligencia artificial es software que hace trabajos que normalmente parecen necesitar el pensamiento humano, como distinguir un gato de un perro en una foto, entender una pregunta hablada o adivinar qué película te podría gustar.",
                "La palabra \"artificial\" significa hecho por personas, e \"inteligencia\" apunta a esas tareas parecidas al pensamiento. La IA no es un cuerpo de robot y no está viva. Es un programa corriendo en una computadora.",
              ],
              misconception: "Un robot no es lo mismo que la IA. Muchos robots solo siguen instrucciones fijas, y mucha IA (como un filtro de spam) no tiene cuerpo alguno.",
              examples: [
                "Un teléfono que se desbloquea cuando reconoce tu cara",
                "Una app que convierte tu voz en texto",
                "Un sitio de videos que te recomienda qué ver a continuación",
              ],
            },
            {
              title: "El software tradicional sigue reglas exactas",
              body: [
                "Casi todo el software es un programa tradicional: una persona escribió reglas exactas y la computadora las sigue igual cada vez. Una calculadora siempre da 4 para 2 + 2 porque alguien programó esa regla.",
                "Los programas tradicionales son predecibles. Si conoces la entrada y las reglas, puedes saber la salida. Nadie tuvo que mostrarle a la calculadora miles de ejemplos de sumas: la regla se escribió directamente.",
              ],
              examples: [
                "Una app de calculadora",
                "Un controlador de luz que enciende un foco cuando tocas un botón",
                "Una alarma que suena exactamente a la hora que programaste",
              ],
            },
            {
              title: "La IA aprende patrones en lugar de solo seguir reglas escritas",
              body: [
                "La IA funciona distinto. En lugar de que una persona escriba cada regla, al software se le muestran muchos ejemplos y él encuentra patrones en ellos. Por eso una app de fotos puede detectar un perro que nunca ha visto: aprendió cómo suelen verse los perros a partir de muchísimas fotos de perros.",
                "Así que la pregunta clave es: ¿alguien escribió reglas exactas para esto, o el software aprendió patrones a partir de ejemplos? Si aprendió de ejemplos, probablemente es IA.",
              ],
              examples: [
                "Un filtro de spam que aprendió cómo se ve el correo basura a partir de millones de mensajes",
                "Un asistente de voz que aprendió a reconocer muchas voces y acentos",
                "Una app de mapas que predice el tráfico a partir de los patrones de viajes anteriores",
              ],
            },
          ],
          workedExample: {
            title: "Decidir: ¿un filtro de spam es IA?",
            steps: [
              "Nombra la entrada y la salida. Entrada: un correo. Salida: una etiqueta, \"spam\" o \"no spam\".",
              "Pregunta: ¿alguien escribió una regla exacta para cada correo? No, hay demasiados correos posibles y quienes mandan spam cambian sus palabras todo el tiempo.",
              "Pregunta: ¿le mostraron ejemplos? Sí, aprendió de millones de correos que la gente ya había marcado como spam o no spam.",
              "Como aprendió patrones a partir de ejemplos en lugar de seguir una regla fija escrita a mano, el filtro de spam es IA.",
            ],
            takeaway: "Para clasificar algo, halla su entrada y su salida, y luego pregunta si sigue reglas escritas o si aprendió de ejemplos.",
          },
          visuals: [
            {
              title: "Dos maneras en que puede funcionar el software",
              summary: "Dos caminos de la entrada a la salida. Camino tradicional: la entrada pasa a \"Reglas que escribió una persona\", que produce la salida. Camino de IA: la entrada pasa a \"Patrones aprendidos de ejemplos\", que produce la salida. La diferencia está en la caja del medio: reglas escritas a mano frente a patrones aprendidos.",
              caption: "El paso del medio es lo que separa al software tradicional de la IA.",
              beforeAfter: {
                before: {
                  label: "Software tradicional",
                  items: [
                    "Llega la entrada",
                    "Deciden las reglas que escribió una persona",
                    "Salida",
                  ],
                },
                after: {
                  items: [
                    "Llega la entrada",
                    "Deciden los patrones aprendidos de ejemplos",
                    "Salida",
                  ],
                },
              },
            },
            {
              title: "Reglas frente a patrones aprendidos, de un vistazo",
              summary: "Una tabla comparativa. Calculadora: reglas escritas por una persona, la misma salida siempre, no es IA. Filtro de spam: patrones aprendidos de ejemplos, puede manejar correos nuevos, sí es IA. Apagador de luz: regla escrita por una persona, no es IA. Asistente de voz: patrones aprendidos de ejemplos, sí es IA.",
              table: {
                columns: [
                  "Tecnología",
                  "Cómo decide",
                ],
                rows: [
                  [
                    "Calculadora",
                    "Reglas fijas que escribió una persona",
                  ],
                  [
                    "Apagador de luz",
                    "Regla fija (botón → luz)",
                  ],
                  [
                    "Filtro de spam",
                    "Patrones aprendidos de ejemplos",
                  ],
                  [
                    "Asistente de voz",
                    "Patrones aprendidos de ejemplos",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "Detective de IA",
            goal: "Decidir si cada tecnología de uso diario usa IA, y dar la razón.",
            overview: "Vas a revisar un conjunto de tecnologías de uso diario y clasificar cada una como \"usa IA\" o \"software común\". Para cada una escribes la entrada, la salida y la única razón de tu elección.",
            steps: [
              "Para cada tecnología, anota su entrada y su salida.",
              "Hazte la pregunta clave: ¿reglas fijas que escribió una persona, o patrones aprendidos de ejemplos?",
              "Clasifícala como \"usa IA\" o \"software común\" y escribe tu razón en una oración.",
              "Compara con un compañero y conversen sobre aquellas en las que no coincidieron.",
            ],
            materials: [
              "Papel y lápiz, o una app de notas",
            ],
            successCriteria: [
              "Cada tecnología tiene anotadas una entrada y una salida.",
              "Cada elección tiene una razón clara basada en reglas frente a patrones aprendidos.",
              "Puedes explicar al menos un caso que te haya resultado difícil.",
            ],
            dataset: {
              name: "Tarjetas de tecnología cotidiana",
              description: "Un conjunto incluido de tecnologías conocidas (calculadora, desbloqueo facial, termostato, búsqueda de fotos, corrector ortográfico, feed de recomendaciones y más) para clasificar.",
            },
          },
          knowledgeCheck: {
            instructions: "Responde esto para comprobar que sabes distinguir la IA del software común.",
            questions: [
              {
                prompt: "¿Cuál es la mejor pista de que un programa es IA y no un programa tradicional?",
                explanation: "Lo que define a la IA es que aprende patrones a partir de ejemplos, en lugar de seguir únicamente reglas que una persona escribió a mano.",
                choices: [
                  {
                    text: "Funciona en una computadora.",
                    explanation: "Todo el software funciona en una computadora, así que esto no distingue a la IA de nada más.",
                  },
                  {
                    text: "Aprendió patrones a partir de muchos ejemplos.",
                    explanation: "Correcto: aprender patrones a partir de ejemplos es la señal clave de la IA.",
                  },
                  {
                    text: "Es rápido.",
                    explanation: "La velocidad no decide si algo es IA; una calculadora es rápida y no es IA.",
                  },
                  {
                    text: "Tiene una pantalla.",
                    explanation: "Tener pantalla es cosa del dispositivo, no de si el software aprende.",
                  },
                ],
              },
              {
                prompt: "Decide si la afirmación es verdadera o falsa.",
                statement: "Una calculadora básica es un ejemplo de inteligencia artificial.",
                explanation: "Una calculadora sigue reglas exactas que escribió una persona y nunca aprende de ejemplos, así que es software tradicional, no IA.",
              },
              {
                prompt: "¿Cuál de las tecnologías de esta situación está usando IA?",
                scenario: "Maya pone una alarma para las 7:00. Su teléfono también le sugiere un recuerdo fotográfico de \"hace un año\" al encontrar imágenes parecidas de ella en la playa.",
                explanation: "La alarma sigue una regla fija (sonar a las 7:00). Encontrar fotos parecidas de la playa exige reconocer patrones en imágenes, y eso es IA.",
                choices: [
                  {
                    text: "Que la alarma suene a las 7:00",
                    explanation: "La alarma solo sigue la regla exacta de la hora que pusiste: software tradicional.",
                  },
                  {
                    text: "Agrupar fotos parecidas de la playa en un recuerdo",
                    explanation: "Correcto: reconocer qué fotos se parecen es una tarea de patrones aprendidos, así que es IA.",
                  },
                  {
                    text: "Ninguna de las dos usa IA",
                    explanation: "El recuerdo fotográfico sí usa IA para reconocer imágenes parecidas.",
                  },
                ],
              },
              {
                prompt: "¿Cuál de estos robots muestra señales de IA?",
                scenario: "El robot A siempre recorre exactamente el mismo camino cuadrado que una persona programó. El robot B usa una cámara para reconocer y recoger solo los bloques rojos que aprendió a detectar.",
                explanation: "Tener cuerpo de robot no hace que algo sea IA. El robot A solo repite instrucciones fijas. El robot B reconoce objetos a partir de patrones aprendidos, y eso sí es IA.",
                choices: [
                  {
                    text: "El robot A, porque se mueve solo",
                    explanation: "Moverse solo no basta: el robot A únicamente repite un camino fijo y preprogramado.",
                  },
                  {
                    text: "El robot B, porque reconoce objetos que aprendió",
                    explanation: "Correcto: reconocer objetos aprendidos es una tarea de aprendizaje automático, así que el robot B sí muestra IA.",
                  },
                  {
                    text: "Los dos, porque ambos son robots",
                    explanation: "Ser un robot no hace que algo sea inteligente; el robot A solo sigue pasos fijos.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Encuentra tres IA en tu día",
            prompt: "Por tu cuenta, encuentra tres ejemplos de IA que hayas usado o visto en el último día, y un ejemplo de software común.",
            steps: [
              "Enumera tres tecnologías que hayas usado hace poco y que aprendan de ejemplos.",
              "Para cada una, nombra la entrada y la salida.",
              "Agrega un ejemplo de software común y explica por qué no es IA.",
            ],
            successCriteria: [
              "Tres ejemplos reales de IA, cada uno con entrada y salida.",
              "Un ejemplo de software común con una razón por la que no es IA.",
            ],
          },
          reflection: [
            {
              prompt: "¿Qué fue lo que más te sorprendió sobre qué tecnologías usan IA y cuáles no?",
            },
            {
              prompt: "¿Tu predicción del principio fue correcta? ¿Qué te hizo cambiar de opinión?",
            },
          ],
          recap: {
            summary: "La IA es software que aprende patrones a partir de ejemplos, mientras que los programas tradicionales siguen reglas exactas que escribió una persona.",
            keyPoints: [
              "La IA hace tareas que parecen necesitar pensamiento humano, como reconocer imágenes o lenguaje.",
              "La pregunta clave es: ¿reglas escritas, o patrones aprendidos de ejemplos?",
              "La vida diaria está llena de IA: desbloqueo facial, recomendaciones, asistentes de voz.",
            ],
          },
          extension: {
            title: "¿Dónde está la línea?",
            body: [
              "Algunas tecnologías mezclan los dos enfoques. Una app de correo moderna podría usar una regla escrita a mano para bloquear una dirección ya conocida como maliciosa Y un modelo de IA para atrapar spam nuevo que nunca ha visto.",
              "Encuentra una tecnología que creas que usa tanto reglas fijas como patrones aprendidos. Describe qué parte es cada cosa y por qué quien la diseñó podría querer combinarlas.",
            ],
          },
        },
        {
          title: "Reglas frente a patrones aprendidos",
          summary: "Observa de cerca la automatización y el aprendizaje automático: cuándo es una persona la que escribe las reglas y cuándo el software aprende patrones a partir de ejemplos.",
          estimatedTime: "45-55 minutos",
          objectives: [
            {
              text: "Definir la automatización y el aprendizaje automático, y distinguirlos.",
            },
            {
              text: "Seguir cómo funcionan la entrada, las reglas y la salida en un programa tradicional.",
            },
            {
              text: "Explicar cómo un patrón aprendido sustituye a las reglas escritas a mano en el aprendizaje automático.",
            },
          ],
          materials: [
            {
              name: "Esta lección en un navegador web",
            },
            {
              name: "Papel y lápiz, o una app de notas",
            },
          ],
          vocabulary: [
            {
              term: "Automatización",
              definition: "Hacer que una tarea ocurra por sí sola mediante reglas fijas, sin que una persona haga cada paso.",
            },
            {
              term: "Aprendizaje automático",
              definition: "Un tipo de IA en el que el software aprende patrones a partir de muchos ejemplos en lugar de recibir cada regla.",
            },
            {
              term: "Regla",
              definition: "Una instrucción exacta que escribe una persona, como \"si la temperatura baja de 20 grados, enciende la calefacción\".",
            },
            {
              term: "Patrón aprendido",
              definition: "Una regularidad que el software descubrió a partir de ejemplos y que usa para tomar decisiones sobre entradas nuevas.",
            },
          ],
          openingScenario: {
            prompt: "Un termostato enciende la calefacción cuando un cuarto baja de 20 grados. Una app de música te arma una lista de canciones que \"te podrían gustar\". Las dos actúan por su cuenta. ¿Están haciendo el mismo tipo de razonamiento?",
          },
          predictionPrompt: {
            prompt: "Predice: de los dos, el termostato o el armador de listas, ¿cuál necesitó que alguien le mostrara miles de ejemplos?",
            howToCheck: "Lee los conceptos y decide cuál funciona con una regla fija y cuál aprendió un patrón.",
          },
          concepts: [
            {
              title: "Automatización: una tarea que se ejecuta sola con reglas fijas",
              body: [
                "Automatización significa que una tarea ocurre automáticamente siguiendo reglas que fijó una persona. Un termostato automatiza la calefacción: \"si el cuarto está por debajo de 20 grados, enciende la calefacción\". Nadie tiene que mover un interruptor, pero una persona igual escribió la regla exacta.",
                "La automatización puede ser muy útil y aun así no ser IA. La máquina no está aprendiendo: está repitiendo instrucciones al pie de la letra.",
              ],
              examples: [
                "Un termostato que calienta un cuarto a una temperatura fija",
                "Una puerta automática que se abre cuando se activa un sensor",
                "Un lavavajillas que ejecuta un ciclo de lavado con tiempo programado",
              ],
            },
            {
              title: "Entrada, regla, salida: la forma de un programa tradicional",
              body: [
                "Los programas tradicionales y la automatización sencilla comparten la misma forma: entra una entrada, una regla decide qué hacer y sale una salida. Entrada: la temperatura del cuarto. Regla: por debajo de 20 → calefacción encendida. Salida: se enciende el calentador.",
                "Como una persona escribió la regla, puedes predecir la salida para cualquier entrada. Esto es muy potente en tareas con reglas claras que no cambian.",
              ],
              examples: [
                "Entrada: una moneda; Regla: moneda detectada → entregar goma de mascar; Salida: goma de mascar",
                "Entrada: una contraseña; Regla: coincide con la contraseña guardada → desbloquear; Salida: desbloqueado",
              ],
            },
            {
              title: "Aprendizaje automático: el software encuentra el patrón",
              body: [
                "Algunas tareas son demasiado enredadas para que una persona escriba cada regla. ¿Qué regla distingue una buena recomendación musical de una mala, para ti? En vez de eso, el aprendizaje automático le muestra al software muchos ejemplos (canciones que te gustaron y que te saltaste) y él aprende un patrón que puede aplicar a canciones nuevas.",
                "El gran cambio: en el aprendizaje automático, un patrón aprendido ocupa el lugar de las reglas escritas a mano. Las personas siguen eligiendo los ejemplos y revisando los resultados, pero no detallan cada regla.",
              ],
              examples: [
                "Un armador de listas que aprendió tus gustos a partir de las canciones que escuchaste y las que te saltaste",
                "Un lector de escritura a mano que aprendió las formas de las letras a partir de muchas muestras",
              ],
            },
          ],
          workedExample: {
            title: "¿Regla o patrón aprendido? Dos maneras de clasificar fruta",
            steps: [
              "Tarea: clasificar fotos de manzanas y plátanos.",
              "Por reglas: una persona escribe \"si la forma es alargada y amarilla → plátano; si no, manzana\". Esto funciona hasta que aparece un plátano verde o una manzana amarilla.",
              "Por aprendizaje: le muestras al software cientos de fotos etiquetadas de manzanas y plátanos; él aprende los patrones de cada uno, incluidos los colores difíciles.",
              "La vía de las reglas es simple pero frágil. La vía del aprendizaje maneja mejor los ejemplos nuevos y raros, y por eso las tareas enredadas usan aprendizaje automático.",
            ],
            takeaway: "Usa reglas fijas cuando la regla es clara y no cambia; usa aprendizaje automático cuando el patrón es demasiado enredado para escribirlo a mano.",
          },
          visuals: [
            {
              title: "Entrada, regla, salida",
              summary: "Un flujo de tres pasos: Entrada (temperatura del cuarto) → Regla (\"por debajo de 20 → calefacción encendida\") → Salida (se enciende el calentador). Esta es la forma de la automatización y de los programas tradicionales.",
              caption: "En la automatización, una persona escribe la regla del medio.",
              flow: {
                nodes: [
                  {
                    label: "Entrada",
                    note: "Temperatura del cuarto",
                  },
                  {
                    label: "Regla",
                    note: "Por debajo de 20 → calefacción encendida",
                  },
                  {
                    label: "Salida",
                    note: "Se enciende el calentador",
                  },
                ],
              },
            },
            {
              title: "De dónde sale el patrón",
              summary: "Antes (tradicional): una persona escribe la regla y luego el programa la usa. Después (aprendizaje automático): una persona reúne ejemplos etiquetados, el software aprende un patrón a partir de ellos y luego el programa usa ese patrón aprendido. El trabajo de la persona pasa de escribir reglas a elegir buenos ejemplos.",
              beforeAfter: {
                before: {
                  label: "Tradicional",
                  items: [
                    "Una persona escribe la regla",
                    "El programa sigue la regla",
                  ],
                },
                after: {
                  label: "Aprendizaje automático",
                  items: [
                    "Una persona reúne ejemplos etiquetados",
                    "El software aprende un patrón",
                    "El programa usa el patrón aprendido",
                  ],
                },
              },
            },
          ],
          activity: {
            title: "Reto de armar reglas",
            goal: "Intentar escribir reglas fijas para una tarea y luego ver dónde se rompen las reglas fijas y dónde ayudaría el aprendizaje.",
            overview: "Vas a escribir reglas paso a paso para clasificar un grupo pequeño de elementos (por ejemplo, \"¿este animal es un ave?\"). Después vas a probar tus reglas con ejemplos difíciles y marcar dónde fallan: exactamente los puntos donde un patrón aprendido lo haría mejor.",
            steps: [
              "Elige la tarea y escribe tus reglas como pasos claros del tipo \"si … entonces …\".",
              "Aplica tus reglas a mano con los ejemplos fáciles.",
              "Ahora prueba con los ejemplos difíciles (un pingüino, un avestruz) y marca dónde tus reglas dan la respuesta equivocada.",
              "Escribe una oración: ¿por qué aprender de muchos ejemplos manejaría mejor estos casos?",
            ],
            materials: [
              "Papel y lápiz, o una app de notas",
            ],
            successCriteria: [
              "Al menos tres reglas claras escritas como \"si … entonces …\".",
              "Al menos un ejemplo difícil donde las reglas fallan queda identificado.",
              "Una oración que explique por qué los patrones aprendidos manejan mejor los casos enredados.",
            ],
            dataset: {
              name: "Tarjetas de \"¿es un ave?\"",
              description: "Un conjunto incluido de animales, con casos fáciles y otros difíciles (pingüino, murciélago, avestruz) para poner a prueba las reglas escritas a mano.",
            },
          },
          knowledgeCheck: {
            instructions: "Comprueba que sabes distinguir la automatización del aprendizaje automático.",
            questions: [
              {
                prompt: "¿Cuál es la diferencia principal entre automatización y aprendizaje automático?",
                explanation: "La automatización sigue reglas fijas que escribió una persona; el aprendizaje automático encuentra patrones a partir de ejemplos.",
                choices: [
                  {
                    text: "La automatización es más rápida que el aprendizaje automático.",
                    explanation: "La velocidad no es la diferencia; los dos pueden ser rápidos o lentos.",
                  },
                  {
                    text: "La automatización sigue reglas escritas; el aprendizaje automático aprende patrones a partir de ejemplos.",
                    explanation: "Correcto: esa es la diferencia central.",
                  },
                  {
                    text: "Solo el aprendizaje automático usa una computadora.",
                    explanation: "Los dos funcionan en computadoras.",
                  },
                  {
                    text: "Son dos nombres para lo mismo.",
                    explanation: "Son distintos: reglas frente a patrones aprendidos.",
                  },
                ],
              },
              {
                prompt: "Ordena los pasos de un programa tradicional.",
                explanation: "Un programa tradicional toma una entrada, aplica una regla y produce una salida.",
                items: [
                  {
                    text: "Llega una entrada (como una lectura de temperatura)",
                  },
                  {
                    text: "Una regla que escribió una persona decide qué hacer",
                  },
                  {
                    text: "Ocurre una salida (como que se encienda el calentador)",
                  },
                ],
              },
              {
                prompt: "¿Qué tarea encaja mejor con el aprendizaje automático que con reglas escritas a mano?",
                scenario: "Quieres un programa que (A) encienda un ventilador cuando el cuarto pase de 27 grados, o (B) diga si una foto muestra un perro o un gato.",
                explanation: "El ventilador es una regla fija y clara. Distinguir perros de gatos en cualquier foto es demasiado enredado para reglas escritas a mano y encaja con el aprendizaje automático.",
                choices: [
                  {
                    text: "Encender un ventilador por encima de 27 grados",
                    explanation: "Esa es una regla clara: la automatización la resuelve sin problema.",
                  },
                  {
                    text: "Distinguir un perro de un gato en una foto",
                    explanation: "Correcto: ese patrón es demasiado enredado para escribirlo a mano, así que el aprendizaje automático encaja.",
                  },
                  {
                    text: "Las dos son igual de fáciles de escribir como reglas",
                    explanation: "La tarea de la foto es muy difícil de captar con reglas fijas.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "¿Con reglas o con aprendizaje?",
            prompt: "Propón dos tareas: una que las reglas fijas resuelvan bien y otra que necesite aprendizaje automático.",
            steps: [
              "Describe una tarea en la que una persona pueda escribir la regla con facilidad. Enuncia la regla.",
              "Describe una tarea demasiado enredada para reglas fijas. Explica por qué.",
              "Para la tarea enredada, ¿qué ejemplos reunirías para enseñarla?",
            ],
            successCriteria: [
              "Una tarea clara basada en reglas, con su regla.",
              "Una tarea basada en aprendizaje, con una razón por la que las reglas no funcionarían.",
              "Una descripción de los ejemplos necesarios para enseñar la tarea enredada.",
            ],
          },
          reflection: [
            {
              prompt: "¿Cuándo es mejor escribir tú mismo las reglas en lugar de usar aprendizaje automático?",
            },
            {
              prompt: "¿Dónde se rompieron tus reglas escritas a mano durante la actividad?",
            },
          ],
          recap: {
            summary: "La automatización repite reglas fijas; el aprendizaje automático aprende patrones a partir de ejemplos para tareas demasiado enredadas como para resolverlas con reglas hechas a mano.",
            keyPoints: [
              "Los programas tradicionales siguen entrada → regla → salida.",
              "El aprendizaje automático sustituye las reglas escritas a mano por un patrón aprendido.",
              "En el aprendizaje automático, las personas siguen eligiendo los ejemplos y revisando los resultados.",
            ],
          },
          extension: {
            title: "¿Quién decide los ejemplos?",
            body: [
              "En el aprendizaje automático, los ejemplos de los que aprende un sistema los eligen personas. Eso significa que hay decisiones humanas incorporadas en todo modelo: qué ejemplos incluir y cuál es la etiqueta correcta.",
              "Piensa en una tarea que le enseñarías a un modelo. ¿Quién elegiría los ejemplos y cómo podrían sus decisiones cambiar lo que el modelo aprende?",
            ],
          },
        },
        {
          title: "Investigación de dispositivos de la semana 1",
          summary: "Investiga los dispositivos y aplicaciones que tienes alrededor, traza sus entradas y salidas, y descubre las decisiones humanas detrás de las funciones de IA en las que confías.",
          estimatedTime: "45-60 minutos",
          objectives: [
            {
              text: "Investigar dispositivos y aplicaciones reales para encontrar funciones de IA.",
            },
            {
              text: "Trazar la entrada y la salida de una función de IA que uses.",
            },
            {
              text: "Identificar las decisiones humanas detrás de una IA cotidiana.",
            },
          ],
          materials: [
            {
              name: "Esta lección en un navegador web",
            },
            {
              name: "Papel y lápiz, o una app de notas",
            },
            {
              name: "Un dispositivo que uses seguido, para explorar sus aplicaciones y ajustes",
              note: "No hace falta cambiar cuentas ni dar datos personales: solo observa las funciones.",
            },
          ],
          vocabulary: [
            {
              term: "Función de IA",
              definition: "Una parte de una app o un dispositivo que usa IA, como la búsqueda de fotos, el autocompletado o las recomendaciones.",
            },
            {
              term: "Decisión humana",
              definition: "Una elección que hizo una persona al construir una IA, como qué ejemplos usar o qué cuenta como respuesta correcta.",
            },
            {
              term: "IA cotidiana",
              definition: "IA con la que te topas en la vida diaria normal, muchas veces sin darte cuenta.",
            },
          ],
          openingScenario: {
            prompt: "Seguramente usaste varias IA antes de la comida sin notarlo. ¿Cuáles apps de un teléfono o una laptop crees que tienen una función de IA escondida adentro?",
          },
          predictionPrompt: {
            prompt: "Predice cuántas funciones de IA vas a poder encontrar entre las apps y los dispositivos que más usas.",
            howToCheck: "Investiga cada app y cuenta las funciones que aprenden patrones en lugar de seguir reglas fijas.",
          },
          concepts: [
            {
              title: "La IA está escondida a plena vista",
              body: [
                "Muchas apps usan IA en silencio. Tu teclado sugiere la siguiente palabra, tu cámara aclara las caras, tu mapa predice la hora de llegada y tu app de videos deja listo el siguiente clip. Todas son funciones de IA trabajando en segundo plano.",
                "Saber detectarlas es una habilidad de verdad. En cuanto empiezas a buscar \"patrones aprendidos\", comienzas a ver IA por todas partes.",
              ],
              examples: [
                "Las sugerencias de palabras del teclado",
                "Buscar fotos por lo que aparece en la imagen (\"perro\", \"playa\")",
                "La hora estimada de llegada en una app de mapas",
              ],
            },
            {
              title: "Toda función de IA tiene una entrada y una salida",
              body: [
                "Puedes entender cualquier función de IA nombrando su entrada y su salida. Autocompletado: la entrada son las letras que has escrito, la salida es una palabra sugerida. Búsqueda de fotos: la entrada son tus fotos y una palabra de búsqueda, la salida son las imágenes que coinciden.",
                "Trazar la entrada y la salida convierte una función misteriosa en algo que puedes explicar y cuestionar.",
              ],
            },
            {
              title: "Detrás de cada IA hubo personas tomando decisiones",
              body: [
                "Una función de IA no apareció sola. Hubo personas que decidieron qué debía hacer, con qué ejemplos entrenarla y cómo se ve una respuesta \"correcta\". Esas decisiones humanas dan forma a cómo se comporta la IA, y a si funciona bien para todo el mundo.",
                "Cuando una IA hace algo sorprendente o injusto, muchas veces se puede rastrear hasta una decisión humana, como qué ejemplos se reunieron.",
              ],
              examples: [
                "Decidir que el autocorrector sugiera palabras comunes",
                "Elegir qué fotos mostrarle a un modelo de búsqueda de imágenes mientras aprende",
              ],
            },
          ],
          workedExample: {
            title: "Investigando el autocompletado",
            steps: [
              "Elige la función: el teclado que sugiere tu siguiente palabra.",
              "Entrada: las letras y palabras que has escrito hasta ahora.",
              "Salida: una o más palabras sugeridas.",
              "¿Aprendido o por reglas? Aprendió patrones de palabras comunes a partir de cantidades enormes de texto: eso es IA.",
              "Decisión humana: hubo personas que eligieron el texto del que aprendió, y por eso sugiere unas palabras y no otras.",
            ],
            takeaway: "Cualquier función de IA se aclara en cuanto nombras su entrada, su salida y una decisión humana detrás de ella.",
          },
          visuals: [
            {
              title: "Anatomía de una función de IA cotidiana",
              summary: "Un diagrama con etiquetas de una función de IA. A la izquierda: \"Entrada\" (lo que tú le das). En el medio: \"Patrón aprendido\" (entrenado con ejemplos elegidos por personas). A la derecha: \"Salida\" (lo que te devuelve). Una nota señala el medio: \"Decisiones humanas: qué ejemplos, qué cuenta como correcto\".",
              caption: "La entrada y la salida se ven; el patrón aprendido y las decisiones humanas quedan escondidos adentro.",
            },
          ],
          activity: {
            title: "Investigación de dispositivos",
            goal: "Investigar las apps y los dispositivos que usas y documentar las funciones de IA que encuentres.",
            overview: "Vas a investigar apps y dispositivos conocidos, enumerar las funciones de IA que encuentres y, para cada una, trazar la entrada, la salida y una decisión humana detrás de ella. No hacen falta cuentas, datos personales, cámara ni micrófono: solo vas a describir funciones.",
            steps: [
              "Enumera las apps y los dispositivos que más usas.",
              "En cada uno, busca alguna función que aprenda patrones (recomendaciones, autocompletado, búsqueda de fotos, aclarado de caras, etcétera).",
              "Para al menos tres funciones, escribe la entrada, la salida y una decisión humana detrás de ella.",
              "Comparte con el grupo tu hallazgo más sorprendente.",
            ],
            materials: [
              "Papel y lápiz, o una app de notas",
              "Un dispositivo que uses seguido (opcional)",
            ],
            successCriteria: [
              "Al menos tres funciones de IA encontradas entre tus apps y dispositivos.",
              "Cada una tiene documentadas una entrada, una salida y una decisión humana.",
              "Puedes explicar por qué cada función es IA y no reglas fijas.",
            ],
            dataset: {
              name: "Lista de apps comunes",
              description: "Una lista incluida de tipos de app comunes (mensajería, mapas, fotos, video, música, navegador) con pistas sobre dónde suelen esconderse las funciones de IA, para quienes no tengan un dispositivo a la mano.",
            },
          },
          knowledgeCheck: {
            instructions: "Comprueba que sabes investigar y explicar la IA cotidiana.",
            questions: [
              {
                prompt: "¿Cuáles son las dos cosas que deberías nombrar para entender cualquier función de IA?",
                explanation: "Nombrar la entrada y la salida convierte una función misteriosa en una que puedes explicar.",
                choices: [
                  {
                    text: "Su precio y su marca",
                    explanation: "El precio y la marca no explican cómo funciona la función.",
                  },
                  {
                    text: "Su entrada y su salida",
                    explanation: "Correcto: la entrada y la salida son la clave para entender cualquier función de IA.",
                  },
                  {
                    text: "Su color y su tamaño",
                    explanation: "Eso describe el dispositivo, no la función de IA.",
                  },
                  {
                    text: "Su batería y su pantalla",
                    explanation: "Esas son partes del equipo, no la forma en que decide la IA.",
                  },
                ],
              },
              {
                prompt: "Decide si la afirmación es verdadera o falsa.",
                statement: "La forma en que se comporta una IA se puede rastrear hasta decisiones humanas, como de qué ejemplos aprendió.",
                explanation: "Verdadero: las personas deciden los ejemplos, las etiquetas y qué cuenta como correcto, y esas elecciones dan forma al comportamiento de la IA.",
              },
              {
                prompt: "¿Cuál es un ejemplo de una función de IA cotidiana?",
                scenario: "En el camión, el teléfono de Leo le sugiere la palabra \"biblioteca\" mientras él escribe \"bibl\", y sus audífonos se pausan cuando se los quita.",
                explanation: "La sugerencia de palabras aprendió patrones a partir de mucho texto, así que es una función de IA. La pausa de los audífonos es una regla fija de un sensor.",
                choices: [
                  {
                    text: "Que los audífonos se pausen al quitárselos",
                    explanation: "Esa es una regla fija de un sensor, no un patrón aprendido.",
                  },
                  {
                    text: "Que el teclado sugiera \"biblioteca\"",
                    explanation: "Correcto: la sugerencia de palabras aprendió patrones a partir de texto, así que es IA.",
                  },
                  {
                    text: "Ninguna de las dos es una función de IA",
                    explanation: "La sugerencia de palabras sí es una función de IA.",
                  },
                ],
              },
              {
                prompt: "¿Cuál es la clasificación más honesta en este caso?",
                scenario: "Un amigo dice que una app del clima \"definitivamente es IA\". Pero no sabes si usa ecuaciones de física, aprendizaje automático a partir del clima pasado, o las dos cosas.",
                explanation: "Sin saber cómo funciona por dentro, no puedes estar seguro. Algunos sistemas del clima usan ecuaciones fijas, otros usan aprendizaje automático y muchos combinan ambos, así que \"no hay suficiente información\" es la respuesta honesta.",
                choices: [
                  {
                    text: "Definitivamente es aprendizaje automático",
                    explanation: "No puedes estar seguro: podría usar ecuaciones de física en lugar de aprender de ejemplos.",
                  },
                  {
                    text: "Definitivamente es un programa de reglas fijas",
                    explanation: "Tampoco puedes estar seguro de eso: podría aprender de datos del clima pasado.",
                  },
                  {
                    text: "No hay suficiente información para asegurarlo",
                    explanation: "Correcto: sin saber qué hay adentro, la respuesta honesta es que hace falta más información.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Guía de campo de funciones de IA",
            prompt: "Haz una \"guía de campo\" corta con cinco funciones de IA que hayas encontrado, como una guía de naturaleza pero de IA.",
            steps: [
              "Elige cinco funciones de IA de tu investigación.",
              "Para cada una, escribe un nombre, su entrada, su salida y una decisión humana detrás de ella.",
              "Ordénalas de la \"más útil\" a la \"menos útil\" para ti, con una razón.",
            ],
            successCriteria: [
              "Cinco funciones de IA, cada una con entrada, salida y una decisión humana.",
              "Un orden con al menos una razón clara.",
            ],
          },
          reflection: [
            {
              prompt: "¿De qué función de IA dependes más sin siquiera pensarlo?",
            },
            {
              prompt: "Ahora que sabes detectar las decisiones humanas detrás de la IA, ¿qué preguntas quieres hacer sobre la IA que usas?",
            },
          ],
          recap: {
            summary: "La IA cotidiana está en todas partes; puedes entender cualquier función nombrando su entrada, su salida y las decisiones humanas detrás de ella.",
            keyPoints: [
              "Las funciones de IA suelen trabajar en silencio, en segundo plano, en las apps que usas.",
              "Toda función de IA tiene una entrada y una salida que puedes nombrar.",
              "Las decisiones humanas, sobre todo qué ejemplos se usaron, dan forma al comportamiento de la IA.",
            ],
          },
          extension: {
            title: "Diseña una IA cotidiana mejor",
            body: [
              "Elige una función de IA cotidiana que hayas encontrado e imagina que pudieras mejorarla. ¿Qué ejemplos adicionales le ayudarían a funcionar mejor para más personas?",
              "Escribe una propuesta corta: la función, un problema que tiene, y los ejemplos o las decisiones humanas que podrían arreglarlo.",
            ],
          },
        },
      ],
    },
    {
      title: "Cómo los datos le enseñan a un modelo",
      subtitle: "Descubre cómo los ejemplos, las etiquetas y las características se convierten en los datos de los que aprende un modelo, y por qué importa que los datos estén limpios y equilibrados.",
      summary: "Los estudiantes miran dentro de un conjunto de datos para encontrar sus ejemplos, etiquetas y características; aprenden por qué un modelo se entrena con un grupo de ejemplos y se prueba con otro para medir la generalización y la exactitud; y practican reparando problemas reales de los datos, como duplicados, etiquetas incorrectas y categorías desequilibradas.",
      bigQuestion: "¿Cómo le enseñan los datos a un modelo, y qué hace que unos datos sean lo bastante buenos para aprender de ellos?",
      estimatedTime: "2.5-3 horas",
      objectives: [
        "Identificar los ejemplos, las etiquetas, las características y las categorías de un conjunto de datos.",
        "Explicar cómo los patrones conectan las características con las categorías.",
        "Describir por qué los modelos se entrenan con un conjunto de datos y se prueban con otro, y definir generalización y exactitud.",
        "Encontrar y reparar duplicados, etiquetas incorrectas y categorías desequilibradas.",
      ],
      requiredConcepts: [
        "Conjunto de datos",
        "Ejemplo",
        "Etiqueta",
        "Característica",
        "Categoría",
        "Patrón",
        "Entrenamiento",
        "Prueba",
        "Datos equilibrados",
        "Duplicado",
        "Etiqueta incorrecta",
        "Generalización",
        "Exactitud",
      ],
      lessons: [
        {
          title: "Ejemplos, etiquetas y características",
          summary: "Abre un conjunto de datos y conoce sus piezas básicas: cada ejemplo, la etiqueta que dice a qué categoría pertenece, y las características que lo describen.",
          estimatedTime: "45-55 minutos",
          objectives: [
            {
              text: "Nombrar las partes de un conjunto de datos: ejemplos, etiquetas y características.",
            },
            {
              text: "Leer una tabla de datos y señalar un ejemplo, sus características y su etiqueta.",
            },
            {
              text: "Explicar cómo las características y las etiquetas ayudan a un modelo a aprender un patrón para una categoría.",
            },
          ],
          materials: [
            {
              name: "Esta lección en un navegador web",
            },
            {
              name: "Papel y lápiz, o una app de notas",
            },
            {
              name: "El conjunto de datos de frutas incluido que aparece en esta lección",
              note: "No hay que descargar nada ni usar datos externos: viene incluido aquí.",
            },
          ],
          vocabulary: [
            {
              term: "Conjunto de datos",
              definition: "Una colección de ejemplos reunidos para que un modelo aprenda de ellos, muchas veces presentada como una tabla de filas y columnas.",
            },
            {
              term: "Ejemplo",
              definition: "Un elemento del conjunto de datos, normalmente una fila, como una sola fruta, una foto o un mensaje.",
            },
            {
              term: "Etiqueta",
              definition: "La respuesta correcta asociada a un ejemplo, que dice a qué categoría pertenece, como \"manzana\" o \"plátano\".",
            },
            {
              term: "Característica",
              definition: "Un dato que describe un ejemplo, como su color, su peso o su forma. Cada característica suele ser una columna de la tabla.",
            },
            {
              term: "Categoría",
              definition: "Uno de los grupos en los que un modelo clasifica los ejemplos. Las etiquetas salen de la lista de categorías.",
            },
            {
              term: "Patrón",
              definition: "Una regularidad en las características que suele ir junto con una categoría, como \"largo y amarillo casi siempre significa plátano\".",
            },
          ],
          openingScenario: {
            prompt: "Imagina una tabla donde cada fila es una fruta. Las columnas dicen su color, su peso y su forma, y la última columna dice qué fruta es. Si taparas esa última columna, ¿podrías igual adivinar cada fruta? ¿En qué te fijarías?",
            context: "Ten presente tu respuesta: esta lección le pone nombre a cada parte de esa tabla.",
          },
          predictionPrompt: {
            prompt: "Predice: de toda la información de la tabla de frutas, ¿cuál es la \"respuesta\" que el modelo intenta aprender, y cuáles son las pistas?",
            howToCheck: "Mientras lees los conceptos, relaciona \"respuesta\" con la palabra etiqueta y \"pistas\" con la palabra características.",
          },
          concepts: [
            {
              title: "Un conjunto de datos es una tabla de ejemplos",
              body: [
                "Un conjunto de datos es una colección de ejemplos de los que aprende un modelo. La forma más fácil de imaginarlo es una tabla: cada fila es un ejemplo y cada columna guarda un tipo de información sobre ese ejemplo.",
                "Si el conjunto de datos es sobre frutas, una fila podría ser un solo plátano. Si es sobre correo, una fila es un mensaje. El sentido de un conjunto de datos es reunir muchos ejemplos en un mismo lugar para que un modelo pueda hallar patrones entre ellos.",
              ],
              examples: [
                "Una tabla con una fila por fruta y columnas de color, peso y forma",
                "Una tabla con una fila por correo y una columna que dice \"spam\" o \"no spam\"",
                "Una tabla con una fila por foto y una columna que nombra al animal que aparece",
              ],
            },
            {
              title: "Las características describen; las etiquetas responden",
              body: [
                "En cada ejemplo, las características son las descripciones, o sea, las pistas. En la tabla de frutas, el color, el peso y la forma son características. Las características suelen ser las columnas que te dicen cómo es un ejemplo.",
                "La etiqueta es la respuesta correcta de ese ejemplo: la categoría a la que pertenece. Para un plátano, la etiqueta es \"plátano\". Las características y las etiquetas tienen trabajos distintos: las características son las pistas que observas y la etiqueta es la respuesta a la que quieres llegar.",
              ],
              examples: [
                "Características de una fruta: color = amarillo, forma = alargada, peso = 120 gramos",
                "Etiqueta de esa fruta: plátano",
                "Características de un correo: muchos enlaces, la palabra \"gratis\"; Etiqueta: spam",
              ],
            },
            {
              title: "Las categorías y los patrones que les corresponden",
              body: [
                "Una categoría es uno de los grupos en los que puedes clasificar los ejemplos. Si un conjunto de datos solo tiene manzanas y plátanos, entonces \"manzana\" y \"plátano\" son las dos categorías, y toda etiqueta es una de ellas.",
                "Un modelo aprende hallando un patrón: una forma en que las características suelen alinearse con una categoría. A partir de muchas frutas etiquetadas puede aprender que \"largo y amarillo casi siempre significa plátano\" y que \"redondo y rojo casi siempre significa manzana\". Después puede usar ese patrón para etiquetar una fruta nueva que nunca ha visto, solo a partir de sus características.",
              ],
              examples: [
                "Categorías: manzana, plátano",
                "Patrón aprendido: redondo + rojo → manzana; largo + amarillo → plátano",
                "Una fruta nueva con las características redonda y roja → el modelo predice \"manzana\"",
              ],
            },
          ],
          workedExample: {
            title: "Leer una fila del conjunto de datos de frutas",
            steps: [
              "Mira una fila: color = amarillo, forma = alargada, peso = 120 gramos, fruta = plátano.",
              "Encuentra el ejemplo: toda esta fila es un ejemplo, una sola fruta.",
              "Encuentra las características: el color, la forma y el peso son las características que la describen.",
              "Encuentra la etiqueta: \"plátano\" es la etiqueta, la categoría correcta de este ejemplo.",
              "Fíjate en el patrón que se va formando: las filas etiquetadas como plátano siguen mostrando \"amarillo\" y \"alargada\", así que esas características se vuelven pistas de la categoría plátano.",
            ],
            takeaway: "Cada ejemplo es una fila; sus características son las columnas que lo describen y su etiqueta es la columna de la respuesta.",
          },
          visuals: [
            {
              title: "Un conjunto de datos de frutas, con sus partes señaladas",
              summary: "Una tabla pequeña de datos. Cada fila es una fruta de ejemplo. Las columnas Color, Peso y Forma son características. La última columna, Fruta, es la etiqueta, la categoría de ese ejemplo. Fila 1: roja, 150 gramos, redonda, manzana. Fila 2: amarilla, 120 gramos, alargada, plátano. Fila 3: verde, 160 gramos, redonda, manzana. Fila 4: amarilla, 115 gramos, alargada, plátano.",
              caption: "Las tres primeras columnas son características; la última columna es la etiqueta.",
              table: {
                columns: [
                  "Color",
                  "Peso (g)",
                  "Forma",
                  "Fruta (etiqueta)",
                ],
                rows: [
                  [
                    null,
                    null,
                    "Redonda",
                    "Manzana",
                  ],
                  [
                    "Amarilla",
                    null,
                    "Alargada",
                    "Plátano",
                  ],
                  [
                    "Verde",
                    null,
                    "Redonda",
                    "Manzana",
                  ],
                  [
                    "Amarilla",
                    null,
                    "Alargada",
                    "Plátano",
                  ],
                ],
              },
            },
            {
              title: "Las partes de un ejemplo",
              summary: "Un diagrama de una sola fila del conjunto de datos. Una flecha señala toda la fila, marcada como \"Ejemplo\". Tres celdas (color, peso, forma) están agrupadas y marcadas como \"Características: las pistas\". Una celda al final (fruta) está marcada como \"Etiqueta: la respuesta\". Una nota dice: \"La etiqueta nombra la categoría a la que pertenece este ejemplo\".",
              caption: "Las características son las pistas que describen un ejemplo; la etiqueta es su categoría.",
            },
          ],
          activity: {
            title: "Espacio de trabajo para etiquetar datos",
            goal: "Revisar un conjunto de datos incluido de frutas espaciales, asignarle a cada ejemplo la etiqueta Segura o No segura usando solo sus características, y cazar duplicados y valores faltantes.",
            overview: "Trabaja en una tabla de datos en vivo de frutas espaciales imaginarias. Cada fila tiene ocho características (color, forma, textura, semillas, dulzor, nivel de brillo, tamaño y dónde crece), pero todavía no tiene etiqueta. Asigna etiquetas, filtra y ordena para investigar, fíjate en las filas duplicadas y en los valores faltantes, y después compara tus etiquetas con la clave de respuestas de la lección.",
            steps: [
              "Lee las características de cada fruta en la tabla.",
              "Asigna la etiqueta Segura o No segura a tantas frutas como puedas.",
              "Usa el filtro y el ordenamiento para detectar filas duplicadas y valores faltantes.",
              "Compara tus etiquetas con la clave de respuestas y anota qué características decidieron cada una.",
            ],
            materials: [
              "El conjunto de datos incluido de frutas espaciales de esta actividad",
              "Opcional: papel y lápiz para tomar notas",
            ],
            successCriteria: [
              "Casi todos los ejemplos quedan etiquetados como Segura o No segura.",
              "Las filas duplicadas y los valores faltantes se encuentran usando las marcas y los filtros.",
              "Las etiquetas se comparan con la clave de respuestas, con una razón para el patrón.",
            ],
            dataset: {
              name: "Conjunto de etiquetado de frutas espaciales",
              description: "Una tabla segura e inventada de frutas espaciales con ocho columnas de características y dos categorías: Segura para comer y No segura para comer. Incluye filas duplicadas y algunos valores faltantes por descubrir. Sin datos reales, personales ni externos.",
              columns: [
                "Color",
                "Forma",
                "Textura",
                "Dónde crece",
                "Semillas",
                "Dulzor",
                "Nivel de brillo",
                "Tamaño",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responde esto para comprobar que sabes nombrar las partes de un conjunto de datos.",
            questions: [
              {
                prompt: "En la tabla de frutas, la columna que dice \"manzana\" o \"plátano\" es la…",
                explanation: "La etiqueta es la respuesta correcta de cada ejemplo, la categoría a la que pertenece.",
                choices: [
                  {
                    text: "Característica",
                    explanation: "Las características son las columnas que describen, como el color y el peso, no la respuesta.",
                  },
                  {
                    text: "Etiqueta",
                    explanation: "Correcto: la etiqueta es la respuesta de categoría de cada ejemplo.",
                  },
                  {
                    text: "Ejemplo",
                    explanation: "Un ejemplo es toda una fila, no una sola columna de respuesta.",
                  },
                  {
                    text: "Conjunto de datos",
                    explanation: "El conjunto de datos es la tabla entera, no una columna.",
                  },
                ],
              },
              {
                prompt: "¿Cuáles de estas son características en un conjunto de datos de frutas? Elige todas las que correspondan.",
                explanation: "Las características son los datos que describen un ejemplo. El color, el peso y la forma describen la fruta; el nombre de la fruta es la etiqueta.",
                choices: [
                  {
                    text: "Color",
                    explanation: "Correcto: el color describe la fruta, así que es una característica.",
                  },
                  {
                    text: "Peso",
                    explanation: "Correcto: el peso describe la fruta, así que es una característica.",
                  },
                  {
                    text: "Forma",
                    explanation: "Correcto: la forma describe la fruta, así que es una característica.",
                  },
                  {
                    text: "El nombre de la fruta (manzana/plátano)",
                    explanation: "El nombre de la fruta es la etiqueta, o sea la respuesta, no una característica que describa.",
                  },
                ],
              },
              {
                prompt: "Decide si la afirmación es verdadera o falsa.",
                statement: "Un ejemplo de un conjunto de datos suele ser una sola fila de la tabla.",
                explanation: "Verdadero: cada fila es un ejemplo, y sus columnas contienen las características y la etiqueta de ese ejemplo.",
              },
            ],
          },
          challenge: {
            title: "Diseña tu propio conjunto de datos pequeñito",
            prompt: "Inventa un conjunto de datos pequeño para una categoría que conozcas bien, como \"perro o gato\" o \"día de semana o fin de semana\".",
            steps: [
              "Elige dos categorías y anótalas como tus etiquetas.",
              "Elige tres características que ayuden a distinguir las categorías.",
              "Haz una tabla con cinco filas de ejemplo, llenando las características y la etiqueta correcta de cada una.",
            ],
            successCriteria: [
              "Dos categorías claras usadas como etiquetas.",
              "Tres características bien elegidas.",
              "Cinco filas de ejemplo, cada una con características y una etiqueta correcta.",
            ],
          },
          reflection: [
            {
              prompt: "¿Qué característica de la tabla de frutas te resultó más útil para distinguir manzanas de plátanos, y por qué?",
            },
            {
              prompt: "¿Tu predicción sobre la columna de la \"respuesta\" fue correcta? ¿Cómo te ayudaron las palabras etiqueta y característica a explicarlo?",
            },
          ],
          recap: {
            summary: "Un conjunto de datos es una tabla de ejemplos; cada ejemplo tiene características que lo describen y una etiqueta que nombra su categoría, y los modelos aprenden patrones que conectan las características con las categorías.",
            keyPoints: [
              "Un ejemplo es una fila; las características son las columnas que describen y la etiqueta es la columna de la respuesta.",
              "Las categorías son los grupos; toda etiqueta es una de las categorías.",
              "Un modelo aprende patrones que conectan las características con una categoría.",
            ],
          },
          extension: {
            title: "¿Qué características importan de verdad?",
            body: [
              "No todas las características son útiles. En la tabla de frutas, \"forma\" y \"color\" separan bien las manzanas de los plátanos, pero una característica como \"día en que se cosechó la fruta\" probablemente no le dice nada útil al modelo.",
              "Mira tu propio conjunto de datos pequeñito. ¿Qué característica hace más trabajo para separar las categorías, y hay alguna que podrías quitar sin dañar el patrón? Explica tu razonamiento.",
            ],
          },
        },
        {
          title: "Datos de entrenamiento frente a datos de prueba",
          summary: "Descubre por qué a un modelo se le enseña con un conjunto de ejemplos y se le revisa con otro, y cómo probarlo con ejemplos que nunca vio mide si de verdad aprendió el patrón.",
          estimatedTime: "45-55 minutos",
          objectives: [
            {
              text: "Explicar la diferencia entre datos de entrenamiento y datos de prueba.",
            },
            {
              text: "Describir por qué un modelo debe probarse con ejemplos de los que no aprendió.",
            },
            {
              text: "Definir generalización y exactitud y conectarlas con las pruebas.",
            },
          ],
          materials: [
            {
              name: "Esta lección en un navegador web",
            },
            {
              name: "Papel y lápiz, o una app de notas",
            },
            {
              name: "El conjunto de datos de animales incluido que aparece en esta lección",
              note: "Viene incluido aquí: sin datos externos ni descargas.",
            },
          ],
          vocabulary: [
            {
              term: "Entrenamiento",
              definition: "Mostrarle a un modelo muchos ejemplos etiquetados para que pueda aprender el patrón que conecta las características con una categoría.",
            },
            {
              term: "Prueba",
              definition: "Revisar un modelo con ejemplos etiquetados nuevos, de los que no aprendió, para ver qué tan bien funciona de verdad.",
            },
            {
              term: "Datos de entrenamiento",
              definition: "Los ejemplos de los que aprende un modelo durante el entrenamiento.",
            },
            {
              term: "Datos de prueba",
              definition: "Un conjunto aparte de ejemplos, apartados del entrenamiento, que se usa solo para revisar el modelo.",
            },
            {
              term: "Generalización",
              definition: "Qué tan bien funciona un modelo con ejemplos nuevos que nunca ha visto, no solo con aquellos de los que aprendió.",
            },
            {
              term: "Exactitud",
              definition: "La proporción de ejemplos de prueba que un modelo etiqueta correctamente, muchas veces escrita como fracción o como porcentaje.",
            },
          ],
          openingScenario: {
            prompt: "Un maestro reparte una hoja de práctica y luego pone un examen con exactamente las mismas preguntas y respuestas. Si todos sacan 100 por ciento, ¿eso prueba que aprendieron el tema, o solo que memorizaron esas respuestas?",
            context: "Guarda esta idea: un modelo revisado con los mismos ejemplos de los que aprendió tiene el mismo problema.",
          },
          predictionPrompt: {
            prompt: "Predice: si pruebas un modelo solo con los mismos ejemplos con los que se entrenó, ¿su calificación te dirá qué tan bien maneja ejemplos completamente nuevos?",
            howToCheck: "Lee los conceptos y decide qué necesita una prueba justa: ejemplos ya vistos o ejemplos nuevos.",
          },
          concepts: [
            {
              title: "Entrenamiento: aprender el patrón a partir de ejemplos",
              body: [
                "El entrenamiento es el paso en el que un modelo observa muchos ejemplos etiquetados y aprende un patrón que conecta las características con las categorías. Los ejemplos que se usan para esto son los datos de entrenamiento.",
                "Durante el entrenamiento, el modelo puede ver tanto las características como la etiqueta correcta de cada ejemplo, así que puede ajustarse hasta que sus respuestas tiendan a coincidir con las etiquetas.",
              ],
              examples: [
                "Mostrarle a un modelo 100 filas de animales etiquetadas para que aprenda que \"tener alas casi siempre significa ave\"",
                "Alimentar un filtro de spam con miles de correos ya marcados como spam o no spam",
              ],
            },
            {
              title: "Prueba: una revisión justa con ejemplos nunca vistos",
              body: [
                "Si solo revisaras un modelo con los mismos ejemplos de los que aprendió, podría limitarse a repetir respuestas que ya memorizó, como un estudiante al que le preguntan exactamente la hoja de práctica que estudió. Eso no probaría que aprendió nada útil.",
                "Por eso apartamos algunos ejemplos como datos de prueba. El modelo nunca se entrena con ellos. Probar significa aplicar el modelo a ese conjunto aparte, nunca visto, y comparar sus respuestas con las etiquetas verdaderas. Esa sí es una revisión justa de lo que realmente aprendió.",
              ],
              examples: [
                "Apartar 20 filas de animales; entrenar con las otras 80; luego probar con las 20 filas apartadas",
                "Una hoja de práctica para estudiar y un examen aparte con el que te califican",
              ],
            },
            {
              title: "Generalización y exactitud",
              body: [
                "La generalización es qué tan bien le va a un modelo con ejemplos nuevos que nunca ha visto. Un modelo que generaliza bien aprendió el patrón real, no solo las filas exactas del entrenamiento. Probar con datos nunca vistos es la manera de medir la generalización.",
                "La exactitud es una calificación sencilla de esa revisión: de todos los ejemplos de prueba, ¿qué proporción etiquetó bien el modelo? Si etiqueta correctamente 18 de 20 animales de prueba, su exactitud es 18/20, o sea 90 por ciento. Una exactitud alta con datos de prueba nunca vistos es la señal de que un modelo realmente generaliza.",
              ],
              examples: [
                "16 de 20 ejemplos de prueba correctos → exactitud del 80 por ciento",
                "Un modelo con calificación alta en las filas de entrenamiento pero baja en las de prueba no generalizó",
              ],
            },
          ],
          workedExample: {
            title: "Dividir 20 animales en entrenamiento y prueba",
            steps: [
              "Empieza con un conjunto de datos de 20 animales etiquetados (cada fila tiene características y una etiqueta de \"ave\" o \"no ave\").",
              "Divídelo: pon 15 filas en el conjunto de entrenamiento y aparta 5 filas como conjunto de prueba.",
              "Entrena: deja que el modelo aprenda el patrón usando solo las 15 filas de entrenamiento.",
              "Prueba: muéstrale al modelo las 5 filas apartadas sin sus etiquetas y anota sus respuestas.",
              "Calcula la exactitud: compara sus 5 respuestas con las etiquetas verdaderas. Si 4 son correctas, la exactitud es 4/5, o sea 80 por ciento, una medida de qué tan bien generaliza.",
            ],
            takeaway: "Entrena con una parte de los datos, prueba con una parte apartada y mide la exactitud sobre la parte nunca vista para juzgar la generalización.",
          },
          visuals: [
            {
              title: "Divide los datos y luego revisa",
              summary: "Dos etapas. Etapa 1 (Entrenamiento): los datos de entrenamiento, la mayoría de las filas, entran al modelo, que aprende un patrón. Etapa 2 (Prueba): entran los datos de prueba apartados, que el modelo nunca vio; sus respuestas se comparan con las etiquetas verdaderas para obtener una exactitud. La idea clave: las filas de prueba se mantienen completamente separadas del entrenamiento.",
              caption: "El modelo aprende de los datos de entrenamiento y se califica con datos de prueba aparte.",
            },
            {
              title: "El mismo modelo, dos calificaciones",
              summary: "Una gráfica de barras que compara la exactitud de un mismo modelo con los datos con los que se entrenó frente a datos de prueba nunca vistos, medida en porcentaje. Barra 1, \"Con datos de entrenamiento\", 98 por ciento. Barra 2, \"Con datos de prueba nunca vistos\", 82 por ciento. La calificación de prueba es la medida honesta de qué tan bien generaliza el modelo; una barra de prueba mucho más baja advierte que el modelo sobre todo memorizó.",
              chart: {
                unit: "% de aciertos",
                bars: [
                  {
                    label: "Con datos de entrenamiento",
                  },
                  {
                    label: "Con datos de prueba nunca vistos",
                  },
                ],
              },
            },
          ],
          activity: {
            title: "Entrena, prueba y cambia los datos",
            goal: "Dividir un conjunto de datos de frutas espaciales en entrenamiento y prueba, correr un modelo transparente y luego experimentar con cómo los datos equilibrados, desequilibrados y mal etiquetados cambian los resultados.",
            overview: "Divide dieciséis frutas espaciales en un conjunto de entrenamiento del que el modelo aprende y un conjunto de prueba con el que se le revisa. El modelo es un clasificador sencillo y transparente de vecinos más cercanos: compara cada fruta de prueba con las frutas de entrenamiento más parecidas y copia la etiqueta más común entre ellas, y te muestra exactamente qué vecinos decidieron cada predicción. Después realiza tres experimentos (datos equilibrados, desequilibrados y mal etiquetados) contra el mismo conjunto de prueba apartado, prediciendo primero cada resultado.",
            steps: [
              "Predice por qué hay que esconderle algunos ejemplos al entrenamiento y luego divide las frutas en entrenamiento y prueba.",
              "Corre el modelo y lee su exactitud general y sus resultados por categoría.",
              "Para cada experimento, predice qué va a pasar, ejecútalo y compara el resultado con tu predicción.",
              "Opcional (7.º y 8.º grado): abre el cálculo de la exactitud para obtener aciertos ÷ total como porcentaje.",
            ],
            materials: [
              "El conjunto de datos incluido de frutas espaciales de esta actividad",
              "Opcional: papel y lápiz para tomar notas",
            ],
            successCriteria: [
              "Cada fruta queda en exactamente un conjunto, y las dos categorías están representadas en el conjunto de prueba.",
              "El modelo se ejecuta y se leen su exactitud y sus resultados por categoría.",
              "Cada experimento tiene una predicción guardada y el resultado se compara con ella.",
            ],
            dataset: {
              name: "Conjunto de entrenamiento y prueba de frutas espaciales",
              description: "Un conjunto de datos seguro, inventado y correctamente etiquetado de frutas espaciales (Segura / No segura), dividido en ejemplos de entrenamiento y ejemplos de prueba apartados, con versiones equilibrada, desequilibrada y mal etiquetada para los experimentos. Sin datos reales, personales ni externos.",
              columns: [
                "Color",
                "Forma",
                "Textura",
                "Dónde crece",
                "Semillas",
                "Dulzor",
                "Nivel de brillo",
                "Tamaño",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responde esto para comprobar que entiendes el entrenamiento, la prueba y la exactitud.",
            questions: [
              {
                prompt: "¿Por qué probamos un modelo con ejemplos con los que no se entrenó?",
                explanation: "Probar con ejemplos nunca vistos comprueba si el modelo aprendió el patrón real en lugar de solo memorizar las filas de entrenamiento.",
                choices: [
                  {
                    text: "Para que la prueba tarde más",
                    explanation: "El objetivo es una revisión justa, no volver todo más lento.",
                  },
                  {
                    text: "Para ver si de verdad aprendió el patrón y no solo memorizó las respuestas",
                    explanation: "Correcto: los ejemplos nunca vistos revelan si el modelo generaliza.",
                  },
                  {
                    text: "Porque hay demasiados ejemplos de entrenamiento",
                    explanation: "La cantidad de datos de entrenamiento no es el motivo; el motivo es que la revisión sea justa.",
                  },
                  {
                    text: "Para darle al modelo preguntas más fáciles",
                    explanation: "Los ejemplos de prueba no están pensados para ser más fáciles, sino para ser nuevos.",
                  },
                ],
              },
              {
                prompt: "¿El resultado de quién es una medida justa de aprendizaje?",
                scenario: "Ava estudia una hoja de práctica y luego la evalúan con preguntas totalmente nuevas del mismo tipo. Ben estudia una hoja de práctica y luego lo evalúan con exactamente las mismas preguntas, con las respuestas que ya vio durante la práctica.",
                explanation: "A Ava la evalúan con preguntas nuevas, así que su calificación muestra aprendizaje real (generalización). El examen de Ben repite las preguntas de práctica, así que una calificación alta podría ser pura memorización.",
                choices: [
                  {
                    text: "El de Ava, porque su examen usó preguntas nuevas",
                    explanation: "Correcto: evaluar con preguntas nuevas mide si ella generalizó.",
                  },
                  {
                    text: "El de Ben, porque ya había visto las respuestas",
                    explanation: "Haber visto antes las respuestas exactas hace que su calificación alta pueda ser solo memorización.",
                  },
                  {
                    text: "Los dos son igual de justos",
                    explanation: "No son iguales: las preguntas repetidas de Ben hacen que su resultado no sea confiable.",
                  },
                ],
              },
              {
                prompt: "Un modelo etiqueta correctamente 15 de 20 ejemplos de prueba. ¿Cuál es su exactitud?",
                explanation: "La exactitud es la proporción etiquetada correctamente: 15 de 20 es 15/20, que equivale al 75 por ciento.",
                choices: [
                  {
                    text: "Alrededor del 75 por ciento",
                    explanation: "Correcto: 15 dividido entre 20 es 0.75, o sea 75 por ciento.",
                  },
                  {
                    text: "Alrededor del 15 por ciento",
                    explanation: "15 es la cantidad de aciertos, no la proporción; la proporción es 15 de 20.",
                  },
                  {
                    text: "Alrededor del 50 por ciento",
                    explanation: "La mitad de 20 serían 10 aciertos, pero el modelo tuvo 15.",
                  },
                  {
                    text: "Alrededor del 95 por ciento",
                    explanation: "El 95 por ciento de 20 serían 19 aciertos, no 15.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Planea una prueba justa",
            prompt: "Diseña un plan justo de entrenamiento y prueba para un modelo que clasifique mensajes en \"pregunta\" o \"no es pregunta\".",
            steps: [
              "Decide cuántos mensajes de ejemplo reunirías en total.",
              "Elige cómo dividirlos en un conjunto de entrenamiento y uno de prueba, y explica por qué.",
              "Explica cómo calcularías la exactitud a partir de los resultados de la prueba.",
            ],
            successCriteria: [
              "Un número total claro de ejemplos y una división entre entrenamiento y prueba.",
              "Una razón por la que el conjunto de prueba se mantiene aparte del entrenamiento.",
              "Una descripción correcta de cómo se mediría la exactitud.",
            ],
          },
          reflection: [
            {
              prompt: "¿Por qué un modelo puede sacar una calificación altísima con sus datos de entrenamiento y aun así fallar con ejemplos nuevos?",
            },
            {
              prompt: "¿En qué se parece apartar datos de prueba a que un maestro escriba un examen distinto de la hoja de práctica?",
            },
          ],
          recap: {
            summary: "Los modelos se entrenan con un conjunto de ejemplos y se prueban con un conjunto aparte y nunca visto; la exactitud sobre esos datos de prueba mide qué tan bien generaliza el modelo.",
            keyPoints: [
              "Los datos de entrenamiento le enseñan al modelo; los datos de prueba lo revisan.",
              "Las filas de prueba deben apartarse y nunca verse durante el entrenamiento.",
              "Generalizar es irle bien con ejemplos nuevos; la exactitud es la proporción de ejemplos de prueba etiquetados correctamente.",
            ],
          },
          extension: {
            title: "Cuando el entrenamiento se ve genial pero la prueba se ve mal",
            body: [
              "A veces un modelo saca una calificación casi perfecta con sus datos de entrenamiento pero muy baja con los datos de prueba. Eso suele significar que memorizó las filas exactas de entrenamiento en lugar de aprender el patrón general.",
              "Describe un caso donde esto podría pasar, por ejemplo, un modelo que memorizó frutas concretas por su peso exacto. ¿Qué podrías cambiar en los datos o en la división para tener una imagen más honesta de cómo se va a comportar?",
            ],
          },
        },
        {
          title: "Repara el conjunto de datos",
          summary: "Juega a ser detective de datos: caza duplicados, etiquetas incorrectas y categorías desequilibradas, y arréglalos para que un modelo pueda aprender un patrón justo y exacto.",
          estimatedTime: "45-60 minutos",
          objectives: [
            {
              text: "Detectar los problemas comunes de los datos: duplicados, etiquetas incorrectas y categorías desequilibradas.",
            },
            {
              text: "Explicar cómo cada problema puede dañar la exactitud o la justicia de un modelo.",
            },
            {
              text: "Reparar un conjunto de datos pequeño para que sus ejemplos sean correctos y sus categorías estén equilibradas.",
            },
          ],
          materials: [
            {
              name: "Esta lección en un navegador web",
            },
            {
              name: "Papel y lápiz, o una app de notas",
            },
            {
              name: "El conjunto de datos desordenado incluido que aparece en esta lección",
              note: "Viene incluido aquí: sin datos externos, descargas ni información personal.",
            },
          ],
          vocabulary: [
            {
              term: "Datos equilibrados",
              definition: "Un conjunto de datos donde cada categoría tiene una cantidad justa y más o menos igual de ejemplos, para que el modelo aprenda bien todas las categorías.",
            },
            {
              term: "Duplicado",
              definition: "Un ejemplo que aparece más de una vez en un conjunto de datos, lo que puede hacer que el modelo se concentre de más en ese caso repetido.",
            },
            {
              term: "Etiqueta incorrecta",
              definition: "Un ejemplo al que se le puso la respuesta equivocada, como un plátano etiquetado \"manzana\", lo que le enseña al modelo un patrón falso.",
            },
            {
              term: "Exactitud",
              definition: "La proporción de ejemplos que un modelo etiqueta correctamente; los datos malos casi siempre la bajan.",
            },
            {
              term: "Generalización",
              definition: "Qué tan bien funciona un modelo con ejemplos nuevos; los datos limpios y equilibrados ayudan a que un modelo generalice.",
            },
          ],
          openingScenario: {
            prompt: "Un estudiante le está enseñando a un modelo a distinguir manzanas de plátanos. Su tabla tiene 18 manzanas y solo 2 plátanos, un plátano está copiado tres veces, y una manzana quedó etiquetada como \"plátano\" por error. ¿Qué podría salir mal cuando el modelo aprenda de esto?",
            context: "Al terminar la lección vas a poder nombrar y arreglar los tres problemas.",
          },
          predictionPrompt: {
            prompt: "Predice: si un conjunto de datos tiene 18 manzanas y solo 2 plátanos, ¿qué categoría crees que va a aprender mejor el modelo, y por qué?",
            howToCheck: "Lee el concepto de datos equilibrados y comprueba si tener más ejemplos de una categoría ayuda al modelo a aprenderla.",
          },
          concepts: [
            {
              title: "Duplicados: el mismo ejemplo contado dos veces",
              body: [
                "Un duplicado es un ejemplo que aparece más de una vez. Puede parecer inofensivo, pero una fila duplicada hace que el modelo trate ese único caso como si fueran muchos, dándole demasiado peso.",
                "Si un mismo plátano aparece tres veces, el modelo puede concentrarse de más en ese plátano específico en lugar de aprender cómo son los plátanos en general. Quitar los duplicados hace que cada ejemplo real cuente una sola vez.",
              ],
              examples: [
                "La fila idéntica del plátano copiada tres veces en la tabla",
                "La misma foto pegada dos veces en un conjunto de datos",
              ],
            },
            {
              title: "Etiquetas incorrectas: la respuesta equivocada enseña el patrón equivocado",
              body: [
                "Una etiqueta incorrecta es un ejemplo marcado con la categoría equivocada, como una manzana etiquetada \"plátano\" por accidente. Como el modelo confía en sus etiquetas como si fueran la verdad, una etiqueta equivocada le enseña un patrón falso.",
                "Incluso unas pocas etiquetas incorrectas pueden bajar la exactitud, porque el modelo intenta satisfacer respuestas que nunca fueron correctas. Arreglar una etiqueta significa cambiarla a la categoría correcta (o quitar el ejemplo si no puedes saberlo).",
              ],
              examples: [
                "Una fruta redonda y roja etiquetada \"plátano\"",
                "La foto de un gato etiquetada \"perro\" en un conjunto de datos de animales",
              ],
            },
            {
              title: "Datos equilibrados: dale a cada categoría una parte justa",
              body: [
                "Datos equilibrados significa que cada categoría tiene una cantidad justa y más o menos igual de ejemplos. Si un conjunto de datos tiene 18 manzanas pero solo 2 plátanos, el modelo ve muchísimas más manzanas y quizá casi no aprenda cómo se ve un plátano, así que responde \"manzana\" demasiado seguido.",
                "Equilibrar las categorías, ya sea reuniendo más ejemplos de plátano o recortando las manzanas, ayuda al modelo a aprender todas las categorías y a generalizar de forma justa. Unos datos limpios, correctos y equilibrados son la base de un modelo exacto.",
              ],
              examples: [
                "10 manzanas y 10 plátanos está más equilibrado que 18 manzanas y 2 plátanos",
                "Un modelo entrenado sobre todo con una categoría tiende a predecir esa categoría de más",
              ],
            },
          ],
          workedExample: {
            title: "Reparar paso a paso una tabla de frutas desordenada",
            steps: [
              "Empieza con una tabla desordenada: 18 manzanas y 2 plátanos, una fila de plátano copiada tres veces y una manzana etiquetada como \"plátano\".",
              "Encuentra los duplicados: el plátano idéntico aparece tres veces, así que quita dos copias y conserva una.",
              "Arregla las etiquetas incorrectas: la fruta redonda y roja etiquetada \"plátano\" en realidad es una manzana, así que cambia su etiqueta a \"manzana\".",
              "Revisa el equilibrio: ahora las categorías están muy disparejas, así que agrega más ejemplos reales de plátano hasta que las manzanas y los plátanos queden más o menos parejos.",
              "Resultado: un conjunto de datos limpio, bien etiquetado y equilibrado, del que el modelo puede aprender un patrón justo.",
            ],
            takeaway: "Repara un conjunto de datos quitando duplicados, corrigiendo etiquetas equivocadas y equilibrando las categorías antes de que un modelo aprenda de él.",
          },
          visuals: [
            {
              title: "Antes y después de equilibrar",
              summary: "Una gráfica de barras de cuántos ejemplos tiene cada categoría, contados en ejemplos. Antes de reparar: Manzana 18, Plátano 2, muy desequilibrado. Después de reparar: Manzana 10, Plátano 10, equilibrado. Equilibrar las categorías le da al modelo una oportunidad justa de aprender las dos frutas en lugar de predecir manzana de más.",
              chart: {
                unit: "ejemplos",
                bars: [
                  {
                    label: "Manzana (antes)",
                  },
                  {
                    label: "Plátano (antes)",
                  },
                  {
                    label: "Manzana (después)",
                  },
                  {
                    label: "Plátano (después)",
                  },
                ],
              },
            },
            {
              title: "Tres problemas y sus reparaciones",
              summary: "Una tabla que relaciona cada problema de datos con su arreglo y con por qué importa. Duplicado: un ejemplo repetido; se arregla quitando las copias de más; importa porque le da demasiado peso a un solo caso. Etiqueta incorrecta: la respuesta equivocada en un ejemplo; se arregla corrigiendo la etiqueta; importa porque enseña un patrón falso. Categorías desequilibradas: una categoría tiene muchos más ejemplos; se arregla agregando a la categoría pequeña o recortando la grande; importa porque el modelo aprende de menos la categoría rara.",
              table: {
                columns: [
                  "Problema",
                  "Cómo repararlo",
                  "Por qué importa",
                ],
                rows: [
                  [
                    "Duplicado",
                    "Quitar las copias de más",
                    "Un solo caso recibe demasiado peso",
                  ],
                  [
                    "Etiqueta incorrecta",
                    "Cambiarla a la categoría correcta",
                    "Una respuesta equivocada enseña un patrón falso",
                  ],
                  [
                    "Categorías desequilibradas",
                    "Agregar a la categoría pequeña o recortar la grande",
                    "El modelo aprende de menos la categoría rara",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "Repara el conjunto de datos defectuoso",
            goal: "Arreglar un conjunto de datos desordenado de frutas espaciales (quitar duplicados, corregir etiquetas equivocadas y mejorar el equilibrio) y luego volver a correr el modelo y comparar el antes y el después.",
            overview: "Empieza con un conjunto de entrenamiento defectuoso de frutas espaciales que tiene filas duplicadas, varias etiquetas incorrectas y un fuerte desequilibrio hacia Segura. Quita duplicados, arregla etiquetas y agrega más ejemplos de la categoría rara para equilibrarlo, mientras las frutas de prueba permanecen ocultas y sin cambios. Después revisa tu trabajo y vuelve a correr el modelo transparente para ver una comparación completa del antes y el después en la salud del conjunto de datos y en la exactitud.",
            steps: [
              "Revisa el conjunto de datos defectuoso; las filas duplicadas quedan marcadas automáticamente.",
              "Arregla las etiquetas que se vean mal y quita las copias duplicadas.",
              "Agrega ejemplos de la categoría subrepresentada para mejorar el equilibrio.",
              "Revisa tu conjunto de datos y vuelve a correr el modelo, luego compara los resultados de antes y después.",
            ],
            materials: [
              "El conjunto de datos defectuoso de frutas espaciales incluido en esta actividad",
              "Opcional: papel y lápiz para tomar notas",
            ],
            successCriteria: [
              "Las filas duplicadas se quitan y las etiquetas equivocadas se corrigen.",
              "Las categorías quedan más equilibradas al agregar ejemplos.",
              "El modelo se vuelve a correr y se compara la exactitud de antes y después.",
            ],
            dataset: {
              name: "Conjunto de datos defectuoso de frutas espaciales",
              description: "Un conjunto de entrenamiento seguro e inventado de frutas espaciales con problemas puestos a propósito (filas duplicadas, etiquetas incorrectas y desequilibrio hacia Segura), más un conjunto de prueba apartado y ejemplos de repuesto bien etiquetados para agregar. Sin datos reales, personales ni externos.",
              columns: [
                "Color",
                "Forma",
                "Textura",
                "Dónde crece",
                "Semillas",
                "Dulzor",
                "Nivel de brillo",
                "Tamaño",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responde esto para comprobar que sabes detectar y arreglar problemas en los datos.",
            questions: [
              {
                prompt: "¿Cuáles de estos son problemas que deberías arreglar antes de entrenar un modelo? Elige todos los que correspondan.",
                explanation: "Los duplicados, las etiquetas incorrectas y las categorías desequilibradas dañan lo que aprende un modelo, así que los tres deben repararse.",
                choices: [
                  {
                    text: "El mismo ejemplo repetido varias veces",
                    explanation: "Correcto: los duplicados le dan demasiado peso a un solo caso y deben quitarse.",
                  },
                  {
                    text: "Un ejemplo con la etiqueta equivocada",
                    explanation: "Correcto: una etiqueta incorrecta enseña un patrón falso y debe arreglarse.",
                  },
                  {
                    text: "Una categoría con muchísimos más ejemplos que otra",
                    explanation: "Correcto: las categorías desequilibradas hacen que el modelo aprenda de menos la categoría rara.",
                  },
                  {
                    text: "Que la tabla tenga nombres de columna claros",
                    explanation: "Tener nombres de columna claros ayuda; no es un problema que haya que arreglar.",
                  },
                ],
              },
              {
                prompt: "Decide si la afirmación es verdadera o falsa.",
                statement: "Un conjunto de datos con 18 manzanas y solo 2 plátanos está bien equilibrado.",
                explanation: "Falso: datos equilibrados significa una cantidad más o menos igual de ejemplos por categoría. Con 18 manzanas y 2 plátanos, el modelo casi no aprendería los plátanos.",
              },
              {
                prompt: "Ordena de forma sensata los pasos para reparar un conjunto de datos.",
                explanation: "Primero revisa los datos, luego quita duplicados y arregla etiquetas equivocadas para que cada ejemplo sea correcto, después equilibra las categorías y, al final, vuelve a entrenar y revisa la exactitud.",
                items: [
                  {
                    text: "Revisar el conjunto de datos para encontrar problemas",
                  },
                  {
                    text: "Quitar las filas duplicadas y corregir las etiquetas equivocadas",
                  },
                  {
                    text: "Equilibrar las categorías",
                  },
                  {
                    text: "Volver a entrenar el modelo y revisar su exactitud",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Rómpelo y luego arréglalo",
            prompt: "Toma un conjunto de datos pequeño y limpio, agrégale a propósito cada uno de los tres problemas, luego repáralo y describe el efecto.",
            steps: [
              "Empieza con un conjunto de datos pequeño, limpio y equilibrado, de dos categorías.",
              "Agrega una fila duplicada, cambia una etiqueta para que quede incorrecta y quita ejemplos para que una categoría sea mucho más grande.",
              "Ahora repara los tres problemas y explica, para cada uno, cómo debería ayudar el arreglo a la exactitud o la justicia del modelo.",
            ],
            successCriteria: [
              "Los tres problemas se agregan a propósito y quedan claramente marcados.",
              "Los tres quedan reparados.",
              "Cada reparación tiene una razón ligada a la exactitud o a la justicia.",
            ],
          },
          reflection: [
            {
              prompt: "¿Cuál de los tres problemas de datos crees que es el más difícil de notar, y por qué?",
            },
            {
              prompt: "¿Cómo se conecta limpiar y equilibrar un conjunto de datos con la idea de entrenamiento y prueba de la lección pasada?",
            },
          ],
          recap: {
            summary: "Los duplicados, las etiquetas incorrectas y las categorías desequilibradas dañan un modelo; repararlos produce datos limpios y equilibrados que mejoran la exactitud y ayudan al modelo a generalizar de forma justa.",
            keyPoints: [
              "Quita los duplicados para que ningún ejemplo tenga peso de más.",
              "Corrige las etiquetas incorrectas para que el modelo no aprenda un patrón falso.",
              "Equilibra las categorías para que el modelo aprenda cada una y generalice de forma justa.",
            ],
          },
          extension: {
            title: "Cuando no puedes reunir más datos",
            body: [
              "Equilibrar agregando más ejemplos de la categoría rara es lo ideal, pero a veces no puedes reunir más con facilidad. Otra opción es recortar la categoría grande para que las cantidades coincidan, aunque eso signifique desechar ejemplos reales.",
              "Para la tabla de frutas desordenada, argumenta qué enfoque elegirías (agregar más plátanos o quitar algunas manzanas) y explica qué compensación implica cada elección para la exactitud y la justicia del modelo.",
            ],
          },
        },
      ],
    },
    {
      title: "Reconocimiento de imágenes y errores del modelo",
      subtitle: "Descubre cómo un clasificador de imágenes convierte píxeles en predicciones, mide qué tan bien funciona y encuentra y corrige los errores que comete.",
      summary: "Los estudiantes abren la clasificación de imágenes: cómo un clasificador lee los píxeles como características visuales para hacer una predicción con una confianza, cómo medirlo de forma justa usando la exactitud y la exactitud por categoría sobre un conjunto de prueba apartado, y cómo leer una matriz de confusión para hallar falsos positivos, falsos negativos y casos límite, y después mejorar el modelo con ejemplos dirigidos.",
      bigQuestion: "¿Cómo convierte un clasificador los píxeles en una predicción, y cómo encontramos y corregimos los errores que comete?",
      estimatedTime: "2.5-3 horas",
      objectives: [
        "Explicar cómo un clasificador de imágenes convierte los píxeles en características visuales, una predicción y una confianza.",
        "Medir un clasificador de forma justa usando la exactitud y la exactitud por categoría sobre un conjunto de prueba aparte.",
        "Distinguir los falsos positivos de los falsos negativos y detectar los casos límite que los provocan.",
        "Leer una matriz de confusión y proponer mejoras dirigidas para reducir un error concreto.",
      ],
      requiredConcepts: [
        "Píxel",
        "Característica visual",
        "Clasificación",
        "Predicción",
        "Confianza",
        "Exactitud",
        "Falso positivo",
        "Falso negativo",
        "Caso límite",
        "Matriz de confusión",
        "Exactitud por categoría",
      ],
      lessons: [
        {
          title: "Cómo funciona un clasificador de imágenes",
          summary: "Sigue una foto desde los píxeles hasta la etiqueta y aprende cómo un clasificador de imágenes convierte las características visuales en una predicción con una puntuación de confianza.",
          estimatedTime: "45-55 minutos",
          objectives: [
            {
              text: "Explicar que una imagen está hecha de píxeles que la computadora lee como números.",
            },
            {
              text: "Describir cómo un clasificador usa las características visuales para hacer una predicción.",
            },
            {
              text: "Leer una puntuación de confianza y decir qué significa y qué no significa.",
            },
            {
              text: "Seguir el recorrido de una imagen por un clasificador, de la entrada a la salida etiquetada.",
            },
          ],
          materials: [
            {
              name: "Esta lección en un navegador web",
            },
            {
              name: "Papel y lápiz, o una app de notas",
            },
            {
              name: "Los conjuntos de imágenes etiquetadas incluidos que aparecen en la lección",
              note: "Se describen en la lección: no subes ninguna foto tuya.",
            },
          ],
          vocabulary: [
            {
              term: "Píxel",
              definition: "Un puntito diminuto de una imagen. Una foto es una cuadrícula de píxeles, y la computadora guarda cada uno como números que indican su color y su brillo.",
            },
            {
              term: "Característica visual",
              definition: "Un patrón de una imagen al que el clasificador presta atención, como bordes, colores, formas o texturas.",
            },
            {
              term: "Clasificación",
              definition: "Poner algo en uno de un conjunto de grupos con nombre, llamados categorías o clases.",
            },
            {
              term: "Predicción",
              definition: "La categoría que el clasificador elige como su mejor respuesta para una imagen de entrada.",
            },
            {
              term: "Confianza",
              definition: "Un número, muchas veces mostrado como porcentaje, que indica qué tan segura está la predicción del clasificador. Más alto significa más seguro, pero no siempre más correcto.",
            },
          ],
          openingScenario: {
            prompt: "Le muestras una imagen a una app de fotos y al instante dice \"gato, 96% de seguridad\". Nunca había visto esa foto exacta. ¿Cómo puede una computadora, que solo ve números, decidir que es un gato?",
            context: "Ten presente tu primera respuesta: la vas a revisar después de ver cómo los píxeles se convierten en una predicción.",
          },
          predictionPrompt: {
            prompt: "Predice: cuando un clasificador mira una foto, ¿crees que reconoce todo el \"gato\" de una sola vez, o que arma su respuesta a partir de patrones más pequeños, como bordes y formas?",
            howToCheck: "Lee los conceptos de abajo y observa cómo los píxeles se convierten en características visuales, y cómo las características se convierten en una predicción.",
          },
          concepts: [
            {
              title: "Una imagen es una cuadrícula de píxeles, y los píxeles son números",
              body: [
                "Una computadora no puede \"ver\" una foto como tú. Para una computadora, una imagen es una cuadrícula de puntitos llamados píxeles, y cada píxel se guarda como números que describen su color y su brillo. Una foto pequeña puede tener cientos de miles de píxeles.",
                "Así que lo primero que recibe un clasificador no es un \"gato\": es una gran cuadrícula de números. Todo lo que el clasificador decida tiene que construirse a partir de esos números.",
              ],
              examples: [
                "Un píxel en blanco y negro puede guardarse como un número del 0 (negro) al 255 (blanco).",
                "Un píxel a color suele guardarse como tres números: cuánto rojo, verde y azul tiene.",
                "Una foto de 100 por 100 son 10,000 píxeles: muchísimos números para una imagen pequeña.",
              ],
            },
            {
              title: "De los píxeles a las características visuales",
              body: [
                "Trabajar solo con píxeles crudos es difícil, así que un clasificador busca características visuales: patrones útiles como bordes, esquinas, colores, texturas y formas. Unas formas triangulares y puntiagudas cerca de la parte de arriba podrían ser una característica que suele aparecer con los gatos (las orejas).",
                "El clasificador aprendió qué características importan estudiando muchos ejemplos etiquetados durante el entrenamiento previo. Nadie le dijo como regla \"los gatos tienen orejas puntiagudas\": halló patrones así a partir de los ejemplos, la misma idea de aprendizaje de las semanas anteriores.",
              ],
              examples: [
                "Bordes donde una zona oscura se junta con una clara",
                "Formas redondas, que podrían ser ojos o ruedas",
                "Texturas como pelaje, escamas o metal liso",
              ],
            },
            {
              title: "Predicción y confianza",
              body: [
                "Después de sumar las características visuales, el clasificador hace una predicción: elige la categoría que mejor coincide, como \"gato\" o \"perro\". Junto con la predicción suele reportar una confianza, un número que indica qué tan seguro está, muchas veces mostrado como porcentaje.",
                "La confianza es útil pero engañosa. Una confianza alta significa que las características coincidieron mucho con una categoría, no que la respuesta sea seguramente correcta. Un clasificador puede equivocarse con toda seguridad, y ese es justo el tipo de error que vas a estudiar esta semana.",
              ],
              examples: [
                "\"Perro, 91%\": las características coincidieron con perro mucho más que con cualquier otra categoría.",
                "\"Gato 55%, perro 45%\": el clasificador no está seguro, la imagen tenía características de los dos.",
                "Un seguro 98% puede seguir siendo incorrecto si la foto es rara.",
              ],
            },
          ],
          workedExample: {
            title: "Seguir una foto de los píxeles a la etiqueta",
            steps: [
              "Entrada: la foto de un gato llega como una cuadrícula de píxeles, solo números de color y brillo.",
              "Hallar características: el clasificador detecta bordes, luego dos formas puntiagudas cerca de arriba, formas redondas de ojos y una textura de pelaje.",
              "Puntuar cada categoría: esas características coinciden mucho con \"gato\" y solo un poco con \"perro\".",
              "Predecir con una confianza: da como salida \"gato\" con un 96% de confianza, porque las características de gato puntuaron mucho más alto que las demás.",
              "Salida: se te muestran la etiqueta \"gato\" y la confianza. Toda la respuesta se construyó a partir de píxeles, no de que la computadora de verdad \"viera\" un gato.",
            ],
            takeaway: "Un clasificador convierte los píxeles en características visuales, puntúa cada categoría a partir de esas características y reporta la mejor coincidencia como una predicción con su confianza.",
          },
          visuals: [
            {
              title: "De los píxeles a una predicción etiquetada",
              summary: "Un flujo de cuatro pasos. Paso 1: imagen de entrada, dibujada como una cuadrícula de píxeles (números). Paso 2: hallar características visuales: bordes, formas, colores, texturas. Paso 3: puntuar cada categoría a partir de las características, por ejemplo gato 96, perro 3, conejo 1. Paso 4: dar como salida la categoría más alta como predicción, con su confianza: \"gato, 96%\". La flecha deja claro que la etiqueta se construye a partir de los píxeles, no se ve directamente.",
              caption: "Toda predicción se construye a partir de los píxeles, pasando por las características, hasta llegar a una respuesta puntuada.",
            },
            {
              title: "La confianza en cada categoría para una foto",
              summary: "Una gráfica de barras de la confianza del clasificador para cada categoría en una sola foto de gato, en porcentaje. Gato es con mucho la barra más alta, con 96 por ciento; perro tiene 3 por ciento y conejo 1 por ciento. La barra más alta es la predicción; su altura es la confianza. Las barras suman alrededor de 100 por ciento porque el clasificador reparte su certeza entre las categorías.",
              caption: "La barra más alta es la predicción; su altura es la confianza.",
              chart: {
                unit: "% de confianza",
                bars: [
                  null,
                  null,
                  {
                    label: "Conejo",
                  },
                ],
              },
            },
          ],
          activity: {
            title: "Recorrido por el clasificador",
            goal: "Seguir una imagen incluida desde los píxeles hasta una predicción etiquetada, y ver cómo la confianza compara las categorías sin garantizar la respuesta.",
            overview: "Elige una imagen de figuras generada y mírala como la ve una computadora: una cuadrícula de 16×16 píxeles numerados. La actividad muestra las características visuales que midió a partir de esos píxeles, su predicción y una barra de confianza para cada categoría, con una explicación en palabras sencillas de las imágenes de entrenamiento más parecidas con las que coincidió. Un ejemplo resuelto muestra un caso en el que el modelo está seguro y aun así se equivoca. De forma opcional, puedes subir una imagen tuya que se procesa solo en tu dispositivo; nunca se guarda ni se envía a ningún lado.",
            steps: [
              "Elige una imagen y observa su cuadrícula de píxeles.",
              "Lee las características visuales que el modelo midió a partir de los píxeles.",
              "Lee la predicción y la barra de confianza de cada categoría, y la explicación de con qué coincidió.",
              "Observa el ejemplo de seguro pero equivocado, y toma nota de que la confianza no es certeza.",
            ],
            materials: [
              "Las imágenes generadas incluidas en esta actividad",
              "Opcional: un dibujo tuyo para subir (se procesa solo en tu dispositivo)",
            ],
            successCriteria: [
              "Se sigue el recorrido de una imagen de los píxeles a las características y a una predicción.",
              "Las barras de confianza se leen como una comparación entre categorías, no como una garantía.",
              "Se entiende el caso de seguro pero equivocado.",
            ],
            dataset: {
              name: "Imágenes de figuras generadas (etiquetadas)",
              description: "Imágenes de 16×16 píxeles de círculos, triángulos y cuadrados generadas localmente, cada una dibujada a partir de una especificación (no se descarga ni se sube ningún archivo). El clasificador y su confianza se calculan en tu dispositivo a partir de los píxeles.",
              columns: [
                "imagen",
                "etiqueta verdadera",
                "etiqueta predicha",
                "confianza",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responde esto para comprobar que entiendes cómo un clasificador de imágenes convierte los píxeles en una predicción.",
            questions: [
              {
                prompt: "¿Qué recibe realmente un clasificador de imágenes como entrada?",
                explanation: "Para una computadora, una imagen es una cuadrícula de píxeles guardados como números; el clasificador construye todo lo demás a partir de esos números.",
                choices: [
                  {
                    text: "El nombre del objeto que aparece en la foto",
                    explanation: "El nombre es la salida que el clasificador intenta producir, no la entrada con la que empieza.",
                  },
                  {
                    text: "Una cuadrícula de píxeles guardados como números",
                    explanation: "Correcto: el clasificador parte de los píxeles (números de color y brillo) y construye a partir de ahí.",
                  },
                  {
                    text: "Una lista escrita de las características del objeto",
                    explanation: "Nadie le entrega al clasificador una lista de características; él mismo las halla a partir de los píxeles.",
                  },
                  {
                    text: "Una puntuación de confianza",
                    explanation: "La confianza es parte de la salida, se produce al final, no es la entrada.",
                  },
                ],
              },
              {
                prompt: "Ordena los pasos de la clasificación de imágenes, desde que llega la foto hasta que se muestra la respuesta.",
                explanation: "Un clasificador va de los píxeles a las características visuales, de ahí a una puntuación para cada categoría, y de ahí a la predicción más alta con su confianza.",
                items: [
                  {
                    text: "Recibir la imagen como una cuadrícula de píxeles",
                  },
                  {
                    text: "Hallar características visuales como bordes, formas y texturas",
                  },
                  {
                    text: "Puntuar qué tan bien coinciden las características con cada categoría",
                  },
                  {
                    text: "Dar como salida la categoría más alta como predicción, con su confianza",
                  },
                ],
              },
              {
                prompt: "Decide si la afirmación es verdadera o falsa.",
                statement: "Una predicción con 98% de confianza tiene garantizado ser correcta.",
                explanation: "Falso: una confianza alta significa que las características coincidieron mucho con una categoría, pero un clasificador puede equivocarse con toda seguridad, sobre todo con fotos poco comunes.",
              },
            ],
          },
          challenge: {
            title: "Sé tú el clasificador",
            prompt: "Elige un objeto sencillo que puedas imaginar (una manzana, una bicicleta, una casa) y describe cómo un clasificador podría distinguirlo de un pariente cercano usando características visuales.",
            steps: [
              "Elige tu objeto y otro parecido con el que se podría confundir (manzana o jitomate, bicicleta o motocicleta).",
              "Enumera tres características visuales que empujarían la predicción hacia tu objeto.",
              "Enumera una característica que los dos objetos comparten y que podría dejar inseguro al clasificador.",
            ],
            successCriteria: [
              "Se elige un par de objetos parecidos.",
              "Se enumeran tres características visuales que los distinguen.",
              "Se nombra una característica compartida que podría bajar la confianza.",
            ],
          },
          reflection: [
            {
              prompt: "Ahora que sabes que para una computadora una foto son solo píxeles, ¿qué te sorprendió más de cómo llega a una etiqueta?",
            },
            {
              prompt: "¿En qué casos querrías ver la puntuación de confianza antes de confiar en la predicción de un clasificador?",
            },
          ],
          recap: {
            summary: "Un clasificador de imágenes convierte una cuadrícula de píxeles en características visuales, puntúa cada categoría y da como salida la mejor coincidencia como una predicción con su confianza.",
            keyPoints: [
              "Para una computadora, una imagen es una cuadrícula de píxeles guardados como números.",
              "Los clasificadores trabajan a partir de características visuales como bordes, formas, colores y texturas.",
              "Una predicción viene con una confianza, y una confianza alta no garantiza una respuesta correcta.",
            ],
          },
          extension: {
            title: "Por qué la confianza puede engañarte",
            body: [
              "La confianza te dice qué tan fuerte coincidieron las características con una categoría, no qué tan correcta es la respuesta. Un clasificador entrenado solo con fotos claras de día podría estar 95% seguro y equivocarse con una foto nocturna borrosa, porque esos píxeles raros de todos modos coincidieron mejor con una categoría.",
              "Describe una situación en la que querrías que un sistema dijera \"no estoy seguro\" en lugar de dar una respuesta con seguridad. ¿Por qué alguien que lo diseña podría poner una regla como \"si la confianza es menor al 60%, pregúntale a una persona\"?",
            ],
          },
        },
        {
          title: "Entrena y prueba un clasificador",
          summary: "Aprende por qué se revisa un clasificador con fotos con las que nunca se entrenó, y mide qué tan bien le va usando la exactitud sobre un conjunto de prueba justo.",
          estimatedTime: "45-55 minutos",
          objectives: [
            {
              text: "Explicar por qué un clasificador se prueba con fotos aparte con las que no se entrenó.",
            },
            {
              text: "Calcular la exactitud como predicciones correctas sobre el total de predicciones.",
            },
            {
              text: "Leer la exactitud por categoría y detectar cuál categoría es la más débil.",
            },
            {
              text: "Explicar por qué un solo número de exactitud general puede esconder una categoría débil.",
            },
          ],
          materials: [
            {
              name: "Esta lección en un navegador web",
            },
            {
              name: "Papel y lápiz, o una app de notas",
            },
            {
              name: "El conjunto de prueba etiquetado incluido que aparece en la lección",
              note: "Fotos ya divididas en grupos de entrenamiento y de prueba; los estudiantes no agregan fotos.",
            },
          ],
          vocabulary: [
            {
              term: "Exactitud",
              definition: "Con qué frecuencia acierta un clasificador; normalmente el número de predicciones correctas dividido entre el total de predicciones, mostrado como porcentaje.",
            },
            {
              term: "Exactitud por categoría",
              definition: "La exactitud medida por separado para cada categoría, para que puedas ver cuáles maneja bien el clasificador y con cuáles batalla.",
            },
            {
              term: "Conjunto de prueba",
              definition: "Un grupo de fotos etiquetadas apartadas y nunca usadas en el entrenamiento, que sirve para revisar de forma justa qué tan bien le va al clasificador con imágenes nuevas.",
            },
            {
              term: "Conjunto de entrenamiento",
              definition: "Las fotos etiquetadas de las que el clasificador aprende sus patrones antes de que se le ponga a prueba.",
            },
          ],
          openingScenario: {
            prompt: "Un clasificador acierta absolutamente todas las fotos de entrenamiento. Quienes lo hicieron dicen que es \"perfecto\". Después se topa con fotos totalmente nuevas y falla en muchas. ¿Qué salió mal en la forma en que lo midieron?",
            context: "Piensa en la diferencia entre memorizar las respuestas y de verdad aprender el patrón.",
          },
          predictionPrompt: {
            prompt: "Predice: si un clasificador saca 90% de exactitud general con gatos, perros y conejos, ¿crees que le va igual de bien en las tres categorías?",
            howToCheck: "Lee sobre la exactitud por categoría y mira la tabla de resultados incluida para comprobar tu predicción.",
          },
          concepts: [
            {
              title: "Por qué se prueba con fotos con las que el clasificador nunca se entrenó",
              body: [
                "Un clasificador aprende de un conjunto de entrenamiento. Si después lo pruebas con esas mismas fotos, puede verse fantástico simplemente por haberlas memorizado, como un estudiante que vio de antemano las preguntas exactas del examen. Esa calificación no te diría cómo le va con fotos nuevas.",
                "Por eso guardamos un conjunto de prueba aparte: fotos etiquetadas apartadas y nunca usadas en el entrenamiento. Probar con fotos que el clasificador no ha visto es la forma justa de medir si de verdad aprendió el patrón.",
              ],
              examples: [
                "Entrenar con 800 fotos de mascotas y luego probar con 200 fotos distintas de mascotas.",
                "Una calificación alta de entrenamiento junto con una baja de prueba es señal de alerta de memorización.",
                "Las fotos de prueba también deben estar etiquetadas, para poder revisar cada predicción.",
              ],
            },
            {
              title: "Exactitud: con qué frecuencia acierta el clasificador",
              body: [
                "La exactitud es la calificación más sencilla: el número de predicciones correctas dividido entre el total de predicciones, escrito como porcentaje. Si el clasificador acierta 90 de 100 fotos de prueba, su exactitud es del 90%.",
                "La exactitud es fácil de entender, y por eso es tan común. Pero un solo número lo cubre todo a la vez, así que puede esconder problemas, y ahí es donde entra la exactitud por categoría.",
              ],
              examples: [
                "45 aciertos de 50 fotos es 90% de exactitud.",
                "Dos clasificadores pueden tener la misma exactitud y cometer errores muy distintos.",
                "La exactitud solo tiene sentido con un conjunto etiquetado, donde conoces las respuestas correctas.",
              ],
            },
            {
              title: "La exactitud por categoría cuenta la historia completa",
              body: [
                "La exactitud por categoría mide la calificación de cada categoría por separado. La exactitud general podría ser del 90%, pero el clasificador podría acertar los gatos el 98% de las veces y los conejos solo el 74%. El número general promedió calladito la categoría débil.",
                "Desglosar la exactitud por categoría te muestra exactamente dónde mejorar. Suele ser el primer paso para descubrir qué categoría confunde el clasificador, el tema de la siguiente lección.",
              ],
              examples: [
                "General 90%, pero gatos 98%, perros 92%, conejos 74%.",
                "Una categoría débil puede quedar escondida si tiene pocas fotos en el conjunto de prueba.",
                "Arreglar la categoría más débil suele ser lo que más sube la exactitud general.",
              ],
            },
          ],
          workedExample: {
            title: "Medir de forma justa un clasificador de mascotas",
            steps: [
              "Divide las fotos: 800 van al conjunto de entrenamiento y otras 200 distintas al conjunto de prueba.",
              "Entrena: el clasificador aprende los patrones de gato, perro y conejo solo con las 800 fotos de entrenamiento.",
              "Prueba: pasa las 200 fotos apartadas y compara cada predicción con la etiqueta verdadera.",
              "Exactitud general: 180 de las 200 fueron correctas, así que 180 ÷ 200 = 90% de exactitud.",
              "Por categoría: gatos 98%, perros 92%, conejos 74%. Los conejos están jalando todo hacia abajo, aunque el 90% general se veía sólido.",
            ],
            takeaway: "Prueba con fotos apartadas, calcula la exactitud como aciertos sobre el total, y luego desglósala por categoría para hallar el punto débil que esconde el número general.",
          },
          visuals: [
            {
              title: "Exactitud por categoría en el conjunto de prueba",
              summary: "Una gráfica de barras de la exactitud por categoría, en porcentaje, sobre el conjunto de prueba de 200 fotos. Los gatos están en 98 por ciento, los perros en 92 por ciento y los conejos apenas en 74 por ciento. Una línea punteada de referencia marca el 90 por ciento de exactitud general. La gráfica deja claro que los conejos son la categoría más débil y están jalando hacia abajo la calificación general, aunque el número general por sí solo se veía sólido.",
              caption: "El 90% general esconde que los conejos están muchísimo más débiles que los gatos y los perros.",
              chart: {
                unit: "% de exactitud",
                bars: [
                  {
                    label: "Gatos",
                  },
                  {
                    label: "Perros",
                  },
                  {
                    label: "Conejos",
                  },
                ],
              },
            },
            {
              title: "Por qué un conjunto de prueba aparte es justo",
              summary: "Antes (injusto): el clasificador se prueba con exactamente las mismas fotos con las que se entrenó, así que puede sacar una calificación alta solo por haberlas memorizado, y esa calificación no predice cómo maneja fotos nuevas. Después (justo): las fotos se dividen para que el entrenamiento y la prueba usen fotos distintas; el clasificador se califica solo con fotos que nunca vio en el entrenamiento, lo que muestra si de verdad aprendió el patrón.",
              caption: "Probar con fotos que el clasificador no ha visto es lo que hace confiable la calificación.",
            },
          ],
          activity: {
            title: "Entrena y prueba un clasificador",
            goal: "Elegir un tema, escoger las imágenes de entrenamiento, entrenar de verdad un clasificador en tu dispositivo, y leer la exactitud general, la exactitud por categoría y una matriz de confusión sobre imágenes nunca vistas.",
            overview: "Elige uno de tres temas (figuras geométricas, útiles escolares o materiales reciclables) y después selecciona con qué imágenes generadas se entrena el clasificador. Observa los conteos por categoría y las advertencias de validación, predice cuál será la categoría más fácil y cuál la más difícil, y entrena. El modelo calcula características reales a partir de los píxeles y clasifica un conjunto de prueba apartado. Tú lees la exactitud general y por categoría, una matriz de confusión, los falsos positivos frente a los falsos negativos de una categoría que elijas, y una revisión imagen por imagen con barras de confianza y explicaciones. No se sube nada; todo corre en tu dispositivo.",
            steps: [
              "Elige un tema y lee las definiciones de las categorías.",
              "Selecciona las imágenes de entrenamiento y observa los conteos por categoría y cualquier advertencia.",
              "Predice cuál será la categoría más fácil y cuál la más difícil, y luego entrena el clasificador.",
              "Lee la exactitud general, la matriz de confusión, la exactitud por categoría y los conteos de falsos positivos y falsos negativos.",
            ],
            materials: [
              "Los conjuntos de imágenes generadas incluidos en esta actividad",
            ],
            successCriteria: [
              "Se entrena un clasificador con imágenes elegidas por el estudiante y se prueba con imágenes nunca vistas.",
              "Se leen la exactitud general, la exactitud por categoría y la matriz de confusión.",
              "Se identifican falsos positivos y falsos negativos para una categoría elegida.",
            ],
            dataset: {
              name: "Tres temas de imágenes generadas (entrenamiento/prueba)",
              description: "Tres temas generados localmente: figuras (círculo/triángulo/cuadrado), útiles escolares (para escribir/para medir/de papel) y reciclaje (papel/plástico/metal), cada uno con un grupo de entrenamiento y un conjunto de prueba apartado. Las imágenes se dibujan en tu dispositivo a partir de especificaciones; no se descarga ni se sube nada.",
              columns: [
                "imagen",
                "división",
                "etiqueta verdadera",
                "etiqueta predicha",
                "confianza",
                "¿correcta?",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responde esto para comprobar que sabes medir un clasificador de forma justa con la exactitud.",
            questions: [
              {
                prompt: "Un clasificador acierta 45 de 50 fotos de prueba. ¿Cuál es su exactitud?",
                explanation: "La exactitud son las predicciones correctas divididas entre el total de predicciones: 45 ÷ 50 = 0.90, o sea 90%.",
                choices: [
                  {
                    explanation: "45 es la cantidad de aciertos, no la exactitud; todavía hay que dividir entre el total de 50.",
                  },
                  {
                    explanation: "Correcto: 45 ÷ 50 = 0.90, que es 90% de exactitud.",
                  },
                  {
                    explanation: "50 es el total de fotos, no la exactitud.",
                  },
                  {
                    explanation: "5 es la cantidad que falló, no la exactitud.",
                  },
                ],
              },
              {
                prompt: "¿Cuál clasificador se midió de forma justa?",
                scenario: "El equipo A prueba su clasificador con exactamente las mismas 500 fotos con las que se entrenó y reporta 99%. El equipo B aparta 100 fotos, entrena con el resto y prueba solo con las 100 apartadas.",
                explanation: "Probar con las mismas fotos que se usaron para entrenar premia la memorización. El equipo B apartó fotos, así que su calificación refleja cómo le va al clasificador con imágenes nuevas.",
                choices: [
                  {
                    text: "El equipo A, porque 99% es más alto",
                    explanation: "Una calificación alta significa poco si salió de probar con las fotos de entrenamiento; puede ser pura memorización.",
                  },
                  {
                    text: "El equipo B, porque probó con fotos apartadas",
                    explanation: "Correcto: probar con fotos que nunca se usaron en el entrenamiento es la forma justa de medir el desempeño real.",
                  },
                  {
                    text: "Los dos son igual de justos",
                    explanation: "No son iguales; el equipo A probó con sus propias fotos de entrenamiento, y eso no es una prueba justa.",
                  },
                  {
                    text: "A ninguno se le puede medir con la exactitud",
                    explanation: "Los dos pueden usar la exactitud; el problema es con qué fotos se hizo la prueba.",
                  },
                ],
              },
              {
                prompt: "Decide si la afirmación es verdadera o falsa.",
                statement: "Un solo número de exactitud general puede esconder que al clasificador le va mal en una categoría concreta.",
                explanation: "Verdadero: la exactitud general promedia todas las categorías juntas, así que una categoría débil (como los conejos con 74%) puede quedar tapada por las fuertes. La exactitud por categoría la deja al descubierto.",
              },
            ],
          },
          challenge: {
            title: "Divídelo de forma justa",
            prompt: "Diseña un plan justo de entrenamiento y prueba para un clasificador que ordene fotos de tres tipos de fruta, y describe qué medirías.",
            steps: [
              "Decide cuántas fotos van al conjunto de entrenamiento y cuántas se apartan para el conjunto de prueba.",
              "Explica por qué las fotos de prueba no deben usarse durante el entrenamiento.",
              "Enumera los números de exactitud que reportarías: la exactitud general y la exactitud de cada fruta.",
            ],
            successCriteria: [
              "Una división clara de las fotos en grupos de entrenamiento y de prueba.",
              "Una razón por la que las fotos de prueba deben quedar fuera del entrenamiento.",
              "Se nombran tanto la exactitud general como la exactitud por categoría entre las cosas que hay que reportar.",
            ],
          },
          reflection: [
            {
              prompt: "¿Fue correcta tu predicción de que a las tres categorías les iría igual de bien? ¿Qué reveló la exactitud por categoría?",
            },
            {
              prompt: "¿Por qué podría ser arriesgado confiar en un producto que solo anuncia un número de exactitud general?",
            },
          ],
          recap: {
            summary: "Un clasificador se mide de forma justa sobre un conjunto de prueba apartado usando la exactitud, y desglosar la exactitud por categoría revela puntos débiles que el número general esconde.",
            keyPoints: [
              "Prueba con un conjunto aparte de fotos con las que el clasificador nunca se entrenó.",
              "La exactitud son las predicciones correctas divididas entre el total de predicciones.",
              "La exactitud por categoría muestra cuál categoría es la más débil, incluso cuando la calificación general se ve sólida.",
            ],
          },
          extension: {
            title: "Cuando la exactitud puede engañar",
            body: [
              "Imagina un conjunto de prueba que es 95% gatos y solo 5% conejos. Un clasificador flojo que respondiera \"gato\" siempre sacaría 95% de exactitud fallando en todos los conejos. La exactitud alta esconde un fracaso total con los conejos.",
              "Explica por qué importa la mezcla de categorías de un conjunto de prueba. ¿Qué podrías medir o cambiar para que un clasificador no pueda \"hacer trampa\" ignorando una categoría poco frecuente?",
            ],
          },
        },
        {
          title: "Confunde y mejora el modelo",
          summary: "Encuentra los casos límite que engañan a un clasificador, lee sus errores en una matriz de confusión y propón cambios que lo hagan mejor.",
          estimatedTime: "50-60 minutos",
          objectives: [
            {
              text: "Distinguir un falso positivo de un falso negativo para una categoría.",
            },
            {
              text: "Identificar los casos límite que probablemente confundan a un clasificador.",
            },
            {
              text: "Leer una matriz de confusión para ver qué categorías se confunden entre sí.",
            },
            {
              text: "Proponer un cambio, como agregar ejemplos, que reduzca un error concreto.",
            },
          ],
          materials: [
            {
              name: "Esta lección en un navegador web",
            },
            {
              name: "Papel y lápiz, o una app de notas",
            },
            {
              name: "El conjunto de errores y la matriz de confusión incluidos que aparecen en la lección",
              note: "Predicciones y etiquetas verdaderas ya registradas; los estudiantes no suben fotos.",
            },
          ],
          vocabulary: [
            {
              term: "Falso positivo",
              definition: "Cuando el clasificador dice que algo SÍ pertenece a una categoría y no es así; por ejemplo, llamar \"gato\" a una foto que en realidad es de un perro.",
            },
            {
              term: "Falso negativo",
              definition: "Cuando el clasificador dice que algo NO pertenece a una categoría y en realidad sí; por ejemplo, dejar pasar un gato de verdad y llamarlo perro.",
            },
            {
              term: "Caso límite",
              definition: "Una entrada rara o difícil, cerca de la frontera entre categorías, como un perro peludo que se parece un poco a un gato, y que es fácil de fallar.",
            },
            {
              term: "Matriz de confusión",
              definition: "Una tabla que alinea las etiquetas verdaderas contra las predicciones del clasificador, para que veas exactamente qué categorías se confunden y con qué frecuencia.",
            },
          ],
          openingScenario: {
            prompt: "Un clasificador de mascotas insiste en llamar \"gato\" a un perrito peludo específico. Y está seguro cada vez. ¿Es pura mala suerte, o podría haber un patrón en sus errores que sí puedas encontrar y arreglar?",
            context: "Esta lección trata de hallar el patrón de los errores de un clasificador, no solo de notar que los comete.",
          },
          predictionPrompt: {
            prompt: "Predice: en un clasificador de gato, perro y conejo, ¿qué dos categorías crees que se confunden más entre sí, y por qué?",
            howToCheck: "Lee la matriz de confusión de abajo y observa qué celda fuera de la diagonal tiene más errores.",
          },
          concepts: [
            {
              title: "Falsos positivos y falsos negativos",
              body: [
                "No todos los errores son iguales. Un falso positivo de \"gato\" es cuando el clasificador dice \"gato\" pero la foto no es de un gato. Un falso negativo de \"gato\" es cuando la foto sí es de un gato pero el clasificador dice que es otra cosa. Toda categoría tiene los dos tipos.",
                "La diferencia importa porque los dos errores pueden tener costos muy distintos. No detectar una alarma de incendio real (un falso negativo) podría ser mucho más grave que una falsa alarma (un falso positivo), así que a la gente muchas veces le importa qué tipo de error comete un sistema.",
              ],
              examples: [
                "Falso positivo de \"gato\": la foto de un conejo etiquetada como \"gato\".",
                "Falso negativo de \"gato\": la foto de un gato de verdad etiquetada como \"perro\".",
                "Que un filtro de spam marque un mensaje real como spam es un falso positivo de \"spam\".",
              ],
            },
            {
              title: "Los casos límite están cerca de la frontera",
              body: [
                "Los clasificadores cometen la mayoría de sus errores en casos límite: entradas raras que están cerca de la frontera entre dos categorías. Un perrito peludo comparte características con los gatos, un conejo fotografiado con las orejas hacia abajo pierde una característica clave, y una foto oscura y borrosa esconde las características de todas las categorías.",
                "Los casos límite no son al azar. Si puedes predecir qué entradas están cerca de la frontera, puedes predecir dónde va a batallar el clasificador, y reunir mejores ejemplos justo para esos casos.",
              ],
              examples: [
                "Un gato sin pelo, al que le falta la textura de pelaje habitual.",
                "Un perro con un disfraz que esconde su forma.",
                "Una foto tomada con muy poca luz, donde los colores y los bordes no se ven claros.",
              ],
            },
            {
              title: "Leer una matriz de confusión y después mejorar el modelo",
              body: [
                "Una matriz de confusión coloca las etiquetas verdaderas frente a las predicciones en una cuadrícula. Los números de la diagonal (gato verdadero predicho como gato) son aciertos; los números fuera de la diagonal son errores, y cada celda fuera de la diagonal te dice exactamente qué confusión ocurrió y con qué frecuencia. Un número grande en la celda \"perro verdadero, predicho gato\" significa que a los perros se les confunde seguido con gatos.",
                "Una vez que ves el error más grande, puedes mejorar el modelo a propósito. El arreglo más común es agregar más y mejores ejemplos del caso confuso, como más fotos de perritos peludos, para que el clasificador aprenda las características que los distinguen. Mejoras donde apunta la matriz y vuelves a medir.",
              ],
              examples: [
                "Que la celda \"conejo verdadero, predicho gato\" sea grande significa que a los conejos se les llama gatos muy seguido.",
                "Agregar fotos de conejos más claras ataca justo ese error.",
                "Después de un arreglo, vuelves a revisar la exactitud y la matriz para confirmar que el error se redujo.",
              ],
            },
          ],
          workedExample: {
            title: "De un error confuso a un arreglo dirigido",
            steps: [
              "Mira la matriz de confusión y halla el número más grande fuera de la diagonal: \"conejo verdadero, predicho gato\", con 9 errores.",
              "Nombra el tipo de error: para la categoría gato son falsos positivos (los llamó gato, pero en realidad eran conejos); para la categoría conejo son falsos negativos (conejos de verdad que no detectó).",
              "Pregunta por qué: los conejos y los gatos pueden compartir textura de pelaje y formas redondeadas, y los conejos con las orejas hacia abajo pierden la característica que los distingue; casos límite clásicos.",
              "Propón un arreglo: agrega más fotos de conejos al conjunto de entrenamiento, sobre todo conejos con las orejas hacia abajo y en ángulos parecidos a los de un gato, para que el clasificador aprenda las diferencias.",
              "Vuelve a medir: prueba otra vez y revisa si la celda \"conejo verdadero, predicho gato\" se hizo más pequeña y si subió la exactitud de conejo.",
            ],
            takeaway: "Halla el error más grande de la matriz de confusión, nombra de qué tipo es, explica el caso límite que hay detrás, agrega ejemplos dirigidos y vuelve a medir.",
          },
          visuals: [
            {
              title: "Matriz de confusión del clasificador de mascotas",
              summary: "Una matriz de confusión de 3 por 3 para un clasificador de gato, perro y conejo sobre el conjunto de prueba. Las filas son la etiqueta verdadera y las columnas la etiqueta predicha. Gatos verdaderos: 47 predichos como gato, 2 como perro, 1 como conejo. Perros verdaderos: 3 gato, 44 perro, 3 conejo. Conejos verdaderos: 9 gato, 4 perro, 37 conejo. La diagonal (47, 44, 37) son los aciertos. El error más grande es el 9 de la celda \"conejo verdadero, predicho gato\", que muestra que a los conejos se les confunde sobre todo con gatos, la misma categoría débil de la gráfica de exactitud.",
              caption: "Las celdas de la diagonal son aciertos; el 9 de \"conejo verdadero, predicho gato\" es el error más grande por arreglar.",
              matrix: {
                labels: [
                  null,
                  null,
                  "Conejo",
                ],
              },
            },
            {
              title: "Mejorar la categoría más débil",
              summary: "Antes: el conjunto de entrenamiento tenía pocas fotos de conejos con las orejas hacia abajo, así que muchos de esos conejos se predecían como gatos y la exactitud de conejo se quedaba en 74 por ciento. Después: se agregaron más fotos de conejos, sobre todo casos límite con las orejas hacia abajo y en ángulos parecidos a los de un gato; el clasificador aprendió la diferencia, los errores de \"conejo verdadero, predicho gato\" bajaron y la exactitud de conejo subió. El arreglo atacó justo el error que señalaba la matriz de confusión.",
              caption: "Agregar ejemplos apuntados a la confusión más grande es como se mejora a propósito.",
            },
          ],
          activity: {
            title: "Confunde y mejora",
            goal: "Intentar confundir al clasificador con casos límite y luego mejorar un modelo débil agregando unas cuantas imágenes de entrenamiento variadas y comparando el primer modelo con el mejorado.",
            overview: "Parte 1: aplica el clasificador a los casos límite incluidos: una figura girada, una figura tapada en parte, un fondo con ruido, una imagen borrosa, una figura diminuta, un trazo demasiado grueso y una imagen mezclada. Predice cada resultado antes, y después observa la respuesta del modelo, su confianza y la posible fuente de confusión, y decide si esa imagen va en entrenamiento, en prueba o en ninguno. Parte 2: un modelo inicial débil solo ha visto círculos y cuadrados, nunca un triángulo, así que falla en todos los triángulos; agrega hasta cuatro imágenes variadas, vuelve a entrenar y compara lado a lado el primer modelo y el mejorado: conteos de entrenamiento, exactitud general y por categoría, las dos matrices de confusión, y exactamente qué imágenes de prueba se arreglaron o se echaron a perder. Todo se genera y corre en tu dispositivo.",
            steps: [
              "Para cada caso límite, predice la respuesta del modelo, ejecútalo y lee la fuente de la confusión.",
              "Decide si cada caso límite va en entrenamiento, en prueba o en ninguno.",
              "Agrega hasta cuatro imágenes variadas al modelo inicial débil y vuelve a entrenarlo.",
              "Compara el primer modelo con el mejorado y explica por qué tus cambios ayudaron o no.",
            ],
            materials: [
              "Los casos límite y los conjuntos de imágenes generados incluidos en esta actividad",
            ],
            successCriteria: [
              "Cada caso límite tiene una predicción guardada y su confusión queda explicada.",
              "El modelo mejorado se construye agregando imágenes de entrenamiento variadas y volviendo a entrenar.",
              "Se comparan el primer modelo y el mejorado, identificando las imágenes arregladas y las que se echaron a perder.",
            ],
            dataset: {
              name: "Casos límite generados + conjuntos de entrenamiento y prueba de figuras",
              description: "Imágenes de casos límite generadas localmente (giradas, tapadas, con ruido, borrosas, muy pequeñas, con características compartidas y mezcladas), más el grupo de entrenamiento de figuras y el conjunto de prueba apartado que se usan para la comparación entre el primer modelo y el mejorado. Todo se dibuja en tu dispositivo a partir de especificaciones; no se sube nada.",
              columns: [
                "imagen",
                "tipo de caso límite",
                "etiqueta verdadera",
                "etiqueta predicha",
                "confianza",
                "por qué (confusión)",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responde esto para comprobar que sabes leer los errores de un clasificador y mejorarlo.",
            questions: [
              {
                prompt: "¿Qué tipo de error es este para la categoría \"gato\"?",
                scenario: "Una foto es en realidad de un conejo, pero el clasificador predice \"gato\".",
                explanation: "El clasificador metió algo que no es gato en la categoría gato, así que es un falso positivo de gato. (También es un falso negativo de conejo, porque no detectó un conejo de verdad.)",
                choices: [
                  {
                    text: "Un falso positivo de gato",
                    explanation: "Correcto: dijo \"gato\" sobre algo que no es un gato, y eso es un falso positivo de la categoría gato.",
                  },
                  {
                    text: "Un falso negativo de gato",
                    explanation: "Un falso negativo de gato sería un gato de verdad que el clasificador no detectó; aquí la foto no es de un gato en absoluto.",
                  },
                  {
                    text: "Una predicción correcta",
                    explanation: "Es un error: la foto es de un conejo, no de un gato.",
                  },
                  {
                    text: "Un error que una matriz de confusión no puede mostrar",
                    explanation: "Una matriz de confusión muestra justo esto: aparecería en la celda \"conejo verdadero, predicho gato\".",
                  },
                ],
              },
              {
                prompt: "¿Cuáles de estas son buenas formas de reducir un error concreto que revela una matriz de confusión? Elige todas las que correspondan.",
                explanation: "Mejorar de forma dirigida significa actuar sobre la confusión más grande: agregar ejemplos del caso confuso, enfocarse en los casos límite y volver a medir para confirmar el arreglo. Simplemente borrar la categoría débil u ocultar la confianza no arregla el error de fondo.",
                choices: [
                  {
                    text: "Agregar más ejemplos de entrenamiento de la categoría que se confunde, incluidos casos límite",
                    explanation: "Correcto: más y mejores ejemplos del caso confuso ayudan al clasificador a aprender la diferencia.",
                  },
                  {
                    text: "Volver a probar después del cambio para ver si ese error se redujo",
                    explanation: "Correcto: vuelves a medir para confirmar que el arreglo de verdad redujo el error.",
                  },
                  {
                    text: "Borrar la categoría débil para que nunca pueda fallar",
                    explanation: "Quitar una categoría no mejora al clasificador; solo hace que deje de hacer un trabajo que se supone que debe hacer.",
                  },
                  {
                    text: "Ocultar la puntuación de confianza para que los errores se noten menos",
                    explanation: "Ocultar información no arregla ningún error; solo hace que los errores sean más difíciles de notar.",
                  },
                ],
              },
              {
                prompt: "Decide si la afirmación es verdadera o falsa.",
                statement: "En una matriz de confusión, los números de la diagonal son las predicciones correctas.",
                explanation: "Verdadero: una celda de la diagonal es donde la etiqueta verdadera y la predicha coinciden (gato verdadero predicho como gato), así que esas son las predicciones correctas; las celdas fuera de la diagonal son los errores.",
              },
            ],
          },
          challenge: {
            title: "Caza la confusión",
            prompt: "Elige un par de categorías que esperes que un clasificador confunda y planea cómo hallarías y arreglarías esa confusión.",
            steps: [
              "Elige dos categorías parecidas (por ejemplo, panquecitos y cupcakes, o lobos y perros).",
              "Describe un caso límite cerca de la frontera y predice si se convierte en falso positivo o falso negativo para cada categoría.",
              "Di qué celda de una matriz de confusión crecería, y qué ejemplos agregarías para reducirla.",
            ],
            successCriteria: [
              "Un par confundible creíble, con un caso límite en la frontera.",
              "El error queda planteado correctamente como falso positivo o falso negativo.",
              "Un arreglo dirigido, ligado a una celda concreta de la matriz de confusión.",
            ],
          },
          reflection: [
            {
              prompt: "¿Fue correcta tu predicción sobre qué dos categorías se confunden más? ¿Qué mostró la matriz de confusión?",
            },
            {
              prompt: "¿Cuándo sería más peligroso un falso negativo que un falso positivo, o al revés? Da un ejemplo real.",
            },
          ],
          recap: {
            summary: "Una matriz de confusión muestra exactamente qué categorías confunde un clasificador, y los casos límite explican por qué; mejoras el modelo agregando ejemplos dirigidos y volviendo a medir.",
            keyPoints: [
              "Los falsos positivos y los falsos negativos son errores distintos con costos distintos.",
              "Los casos límite cerca de la frontera de una categoría causan la mayoría de las confusiones.",
              "Lee la matriz de confusión, agrega ejemplos para el error más grande y vuelve a medir.",
            ],
          },
          extension: {
            title: "¿Qué error preferirías cometer?",
            body: [
              "En muchos sistemas reales no puedes eliminar todos los errores, así que quienes los diseñan eligen hacia qué tipo inclinarse. Una herramienta de tamizaje médico podría aceptar más falsos positivos (revisiones de más) para evitar falsos negativos (una enfermedad que se pasa por alto), mientras que un filtro de spam podría aceptar más falsos negativos (que se cuele algo de spam) para evitar falsos positivos (perder un mensaje real).",
              "Elige un clasificador real y argumenta qué error debería evitar más. ¿Cómo podrían sus creadores ajustar el modelo o su umbral para cambiar un tipo de error por el otro?",
            ],
          },
        },
      ],
    },
    {
      title: "IA de texto, chatbots y recomendaciones",
      subtitle: "Descubre cómo la IA maneja el lenguaje y las sugerencias: de los chatbots de palabras clave a la predicción de texto y a los feeds que moldean lo que ves.",
      summary: "Los estudiantes exploran la IA detrás del texto y las sugerencias de todos los días: construyen un chatbot de reglas con palabras clave, intenciones y una respuesta de reserva; miran por dentro los modelos de lenguaje que predicen el siguiente trozo de texto probable y aprenden por qué un texto fluido no es lo mismo que un texto verdadero; y auditan sistemas de recomendación que funcionan con similitud y retroalimentación, examinando con honestidad cómo pueden crear burbujas de filtros.",
      bigQuestion: "¿Cómo trabaja la IA con el lenguaje y las sugerencias, y cuándo deberíamos cuestionar lo que nos dice o nos muestra?",
      estimatedTime: "2.5-3 horas",
      objectives: [
        "Construir un chatbot de reglas usando palabras clave, intenciones, un árbol de decisión y una respuesta de reserva.",
        "Explicar cómo un modelo de lenguaje predice el siguiente trozo de texto probable a partir de una indicación.",
        "Explicar por qué un texto fluido de IA no es lo mismo que un texto verdadero o correcto.",
        "Auditar cómo las recomendaciones usan la similitud y la retroalimentación, y cómo forman burbujas de filtros.",
      ],
      requiredConcepts: [
        "Palabra clave",
        "Intención",
        "Árbol de decisión",
        "Respuesta de reserva",
        "Modelo de lenguaje",
        "Token o trozo de texto",
        "Texto siguiente probable",
        "Indicación",
        "Recomendación",
        "Similitud",
        "Retroalimentación",
        "Burbuja de filtros",
      ],
      lessons: [
        {
          title: "Construye un chatbot de reglas",
          summary: "Diseña un chatbot a la antigua, con palabras clave, intenciones y un árbol de decisión, y descubre por qué necesita una respuesta de reserva para todo aquello que no se construyó para manejar.",
          estimatedTime: "50-60 minutos",
          objectives: [
            {
              text: "Explicar cómo un chatbot de reglas usa palabras clave para adivinar la intención de un usuario.",
            },
            {
              text: "Trazar un conjunto de intenciones y respuestas como un árbol de decisión.",
            },
            {
              text: "Explicar por qué un chatbot necesita una respuesta de reserva para los mensajes que no entiende.",
            },
            {
              text: "Comparar un chatbot de reglas con una IA que aprende de ejemplos.",
            },
          ],
          materials: [
            {
              name: "Esta lección en un navegador web",
            },
            {
              name: "Papel y lápiz, o una app de notas",
            },
            {
              name: "Una regla o un borde recto para dibujar un diagrama de árbol ordenado",
              note: "Solo ayuda a que el árbol de decisión quede limpio; a mano alzada está bien.",
            },
          ],
          vocabulary: [
            {
              term: "Palabra clave",
              definition: "Una palabra importante que el chatbot busca en un mensaje para descubrir qué quiere la persona, como \"horario\" o \"precio\".",
            },
            {
              term: "Intención",
              definition: "Lo que la persona en realidad intenta hacer o preguntar, como \"averiguar el horario de apertura\", aunque lo diga de muchas maneras distintas.",
            },
            {
              term: "Árbol de decisión",
              definition: "Un conjunto de opciones ramificadas de sí/no o si/entonces que lleva de un mensaje a una respuesta, como un diagrama de flujo.",
            },
            {
              term: "Respuesta de reserva",
              definition: "La respuesta de seguridad que da un chatbot cuando no coincide con ninguna palabra clave ni intención, como \"Perdón, no entendí eso\".",
            },
          ],
          openingScenario: {
            prompt: "La ventana de chat de una pizzería responde al instante a \"¿A qué hora cierran?\", pero contesta \"Perdón, no entendí\" cuando escribes \"¿hasta cuándo atienden?\". Las dos preguntas significan lo mismo. ¿Por qué una funciona y la otra falla?",
            context: "Guarda tu respuesta: al final vas a poder explicar exactamente qué salió mal.",
          },
          predictionPrompt: {
            prompt: "Predice: si un chatbot solo conoce la palabra clave \"cierran\", ¿de cuántas maneras distintas podría un cliente preguntar por la hora de cierre sin usar nunca esa palabra?",
            howToCheck: "Mientras lees, haz una lista de formas en que un cliente podría preguntarlo y cuenta cuántas se pierden la palabra clave \"cierran\".",
          },
          concepts: [
            {
              title: "Palabras clave: las palabras que el chatbot vigila",
              body: [
                "Un chatbot de reglas no entiende el lenguaje como tú. En vez de eso, una persona le da una lista de palabras clave que debe buscar. Cuando tu mensaje contiene una palabra clave como \"horario\", \"abren\" o \"cierran\", el bot elige la respuesta que un humano escribió para esa palabra.",
                "Esto es rápido y predecible, pero frágil. Si preguntas lo mismo con otras palabras, la palabra clave no está ahí y el bot no lo detecta en absoluto.",
              ],
              examples: [
                "Palabra clave \"horario\" → responder con el horario de apertura",
                "Palabra clave \"precio\" o \"cuesta\" → responder con los precios del menú",
                "Palabra clave \"devolución\" → responder con la política de devoluciones",
              ],
            },
            {
              title: "Intención: lo que la persona realmente quiere",
              body: [
                "Detrás de las palabras hay una intención: aquello que la persona de verdad intenta hacer. \"¿A qué hora cierran?\", \"¿Abren hasta tarde?\" y \"¿Hasta cuándo atienden?\" son tres oraciones distintas con una sola intención: averiguar el horario.",
                "Un buen diseño de chatbot agrupa muchas palabras clave y formas de decirlo bajo la misma intención. Mientras más palabras clave le pongas a una intención, más maneras de preguntar puede atrapar el bot, pero alguien tiene que pensarlas todas de antemano.",
              ],
              examples: [
                "La intención \"consultar horario\" coincide con: horario, abren, cierran, cierre, tarde, cuándo",
                "La intención \"encontrar ubicación\" coincide con: dónde, dirección, cómo llegar, ubicados",
                "La intención \"hacer un pedido\" coincide con: pedido, comprar, entrega, recoger",
              ],
            },
            {
              title: "Árbol de decisión y respuesta de reserva: llevar un mensaje hasta una respuesta",
              body: [
                "Un chatbot de reglas sigue un árbol de decisión: revisa las palabras clave de la primera intención; si las encuentra, da esa respuesta; si no, revisa la siguiente intención, y así por las ramas. Cada rama termina en una respuesta que escribió una persona.",
                "Pero ninguna lista de palabras clave cubre todos los mensajes posibles. Cuando nada coincide, el árbol llega a su última rama: la respuesta de reserva. Esa respuesta es un honesto \"no entendí eso\" y, en los buenos diseños, además una pista de con qué sí puede ayudar el bot. Sin una respuesta de reserva, un mensaje sin coincidencias no recibiría respuesta alguna.",
              ],
              examples: [
                "El mensaje \"¿hasta cuándo atienden?\", sin la palabra clave \"horario\" → cae en la respuesta de reserva",
                "Respuesta de reserva: \"Perdón, puedo ayudarte con horarios, ubicación y pedidos. Prueba preguntando por alguno de esos temas.\"",
              ],
            },
          ],
          workedExample: {
            title: "Seguir un mensaje por el árbol",
            steps: [
              "Una persona configuró tres intenciones en el bot: \"consultar horario\" (palabras clave: horario, abren, cierran), \"encontrar ubicación\" (dónde, dirección) y \"hacer un pedido\" (pedido, entrega).",
              "Un cliente escribe: \"¿Cuánto cuesta una pizza grande?\"",
              "Rama 1: ¿contiene horario, abren o cierran? No. Sigue adelante.",
              "Rama 2: ¿contiene dónde o dirección? No. Sigue adelante.",
              "Rama 3: ¿contiene pedido o entrega? No. Sigue adelante.",
              "Ninguna rama coincidió, así que el árbol llega a la respuesta de reserva: \"Perdón, no entendí. Puedo ayudarte con horarios, ubicación y pedidos.\" El cliente en realidad quería el precio, una intención que nunca se le dio al bot.",
            ],
            takeaway: "Un bot de reglas solo puede responder a las intenciones que alguien programó; cualquier otra cosa cae en la respuesta de reserva, incluso cuando la pregunta es perfectamente clara para una persona.",
          },
          visuals: [
            {
              title: "Cómo un chatbot de reglas encamina un mensaje",
              summary: "Un árbol de decisión que empieza arriba con el mensaje que llega y baja pasando por una revisión por cada intención. El nodo 1 pregunta: \"¿El mensaje contiene horario, abren o cierran?\". Si sí, la rama termina en la respuesta \"Abrimos de 11 de la mañana a 10 de la noche\". Si no, baja al nodo 2: \"¿Contiene dónde o dirección?\". Si sí, la rama termina en \"Estamos en Calle Principal 5\". Si no, pasa al nodo 3: \"¿Contiene pedido o entrega?\". Si sí, la rama termina en \"Pide en línea o llama al 555-1234\". Si no, la última rama es la respuesta de reserva: \"Perdón, no entendí. Puedo ayudarte con horarios, ubicación y pedidos\". Cada rama de sí es una hoja con una respuesta escrita por una persona; la última rama de no es siempre la respuesta de reserva, para que ningún mensaje quede sin contestar.",
              caption: "Cada intención es una revisión; la última rama es la respuesta de reserva que atrapa todo lo que no coincidió.",
              tree: {
                label: "Mensaje entrante",
                branches: [
                  {
                    condition: "menciona horario, abren o cierran",
                    child: {
                      label: "Respuesta: \"Abrimos de 11 de la mañana a 10 de la noche.\"",
                    },
                  },
                  {
                    condition: "menciona dónde o dirección",
                    child: {
                      label: "Respuesta: \"Estamos en Calle Principal 5.\"",
                    },
                  },
                  {
                    condition: "menciona pedido o entrega",
                    child: {
                      label: "Respuesta: \"Pide en línea o llama al 555-1234.\"",
                    },
                  },
                  {
                    condition: "no coincide con nada de lo anterior",
                    child: {
                      label: "Respuesta de reserva: \"Perdón, no entendí. Puedo ayudarte con horarios, ubicación y pedidos.\"",
                    },
                  },
                ],
              },
            },
            {
              title: "La misma intención, muchas formas de decirlo",
              summary: "Una tabla que muestra que una misma intención, \"consultar horario\", se puede preguntar de muchas maneras. Filas: \"¿A qué hora cierran?\" contiene la palabra clave \"cierran\", así que coincide. \"¿Abren hasta tarde?\" contiene \"abren\", así que coincide. \"¿Hasta cuándo atienden?\" no contiene ninguna palabra clave de la lista, así que falla y cae en la respuesta de reserva. \"¿Siguen sirviendo?\" tampoco contiene ninguna palabra clave, así que también falla. La lección: agregar más palabras clave atrapa más formas de decirlo, pero una persona tiene que pensarlas todas.",
              table: {
                columns: [
                  "Mensaje del cliente",
                  "¿Palabra clave encontrada?",
                  "Resultado",
                ],
                rows: [
                  [
                    "¿A qué hora cierran?",
                    "cierran",
                    "Coincide con \"consultar horario\"",
                  ],
                  [
                    "¿Abren hasta tarde?",
                    "abren",
                    "Coincide con \"consultar horario\"",
                  ],
                  [
                    "¿Hasta cuándo atienden?",
                    null,
                    "Cae en la respuesta de reserva",
                  ],
                  [
                    "¿Siguen sirviendo comida?",
                    null,
                    "Cae en la respuesta de reserva",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "Constructor de chatbots de reglas",
            goal: "Construir un chatbot de reglas que funcione a partir de una plantilla (intenciones, palabras clave, una rama de seguimiento y una respuesta de reserva) y probarlo en una vista previa en vivo que muestra exactamente qué regla coincidió.",
            overview: "Parte de una plantilla segura (biblioteca, reciclaje, museo, club o apoyo con la tarea) y edítala con controles estructurados, sin programar. Agrega y reordena intenciones, dale a cada una sus palabras clave y su respuesta, agrega una rama de seguimiento, y define una respuesta de reserva, un límite de privacidad y una opción de ayuda humana. Un esquema del árbol de decisión y una validación en vivo señalan callejones sin salida, nodos inalcanzables y la falta de una respuesta de reserva. Después conversa con tu bot en una vista previa en vivo que muestra la regla que coincidió en cada respuesta, y conserva una transcripción de prueba que puedes borrar sin eliminar el bot. No se envía nada a ningún servicio externo; la coincidencia es real, por palabras clave y determinista.",
            steps: [
              "Elige una plantilla y edita el saludo, las intenciones (palabras clave + respuestas), una rama de seguimiento y la respuesta de reserva.",
              "Observa el esquema del árbol de decisión y las revisiones de callejones sin salida, nodos inalcanzables y falta de respuesta de reserva.",
              "Prueba el bot en vivo: preguntas normales, entradas inesperadas y pedir hablar con una persona.",
              "Lee el rastro de la regla de cada respuesta y el registro de la transcripción de prueba.",
            ],
            materials: [
              "El constructor de chatbots y las plantillas incluidos en esta actividad",
            ],
            successCriteria: [
              "Un chatbot con al menos tres intenciones, una rama de seguimiento, una respuesta de reserva, un límite de privacidad y una opción de ayuda humana.",
              "Las revisiones de validación pasan (sin callejones sin salida, nodos inalcanzables ni falta de respuesta de reserva).",
              "El bot se prueba con entradas normales e inesperadas, y la regla que coincidió queda a la vista.",
            ],
            dataset: {
              name: "Plantillas de chatbot (temas seguros)",
              description: "Cinco plantillas de chatbot de reglas incluidas y editables, sobre temas seguros (biblioteca escolar, reciclaje, museo, club, planeación de tareas). Sin consejos médicos, legales ni de crisis; no se envía nada a un servicio externo; la coincidencia por palabras clave es determinista.",
              columns: [
                "Plantilla",
                "Intenciones",
                "Rama de seguimiento",
                "Respuesta de reserva",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responde esto para comprobar que entiendes cómo funciona un chatbot de reglas.",
            questions: [
              {
                prompt: "¿Qué es una \"intención\" en un chatbot?",
                explanation: "Una intención es el objetivo que hay detrás de un mensaje, lo que la persona quiere, sin importar qué palabras exactas use.",
                choices: [
                  {
                    text: "Las palabras exactas que escribió la persona",
                    explanation: "Las palabras exactas son solo el mensaje; muchas palabras distintas pueden compartir una misma intención.",
                  },
                  {
                    text: "Lo que la persona de verdad intenta hacer o preguntar",
                    explanation: "Correcto: la intención es el objetivo de fondo, como \"consultar el horario\", sin importar cómo se diga.",
                  },
                  {
                    text: "La respuesta que envía el chatbot",
                    explanation: "Esa es la respuesta de salida, no la intención detrás del mensaje de la persona.",
                  },
                  {
                    text: "Una palabra que el bot no reconoció",
                    explanation: "Una palabra no reconocida lleva a la respuesta de reserva; no es la definición de una intención.",
                  },
                ],
              },
              {
                prompt: "Decide si la afirmación es verdadera o falsa.",
                statement: "Un chatbot de reglas necesita una respuesta de reserva para que los mensajes que no coinciden reciban de todos modos alguna respuesta.",
                explanation: "Verdadero: sin una respuesta de reserva, cualquier mensaje que falle todas las palabras clave no recibiría respuesta alguna. La respuesta de reserva es la última rama que lo atrapa todo.",
              },
              {
                prompt: "Ordena correctamente los pasos con los que un chatbot de reglas responde un mensaje.",
                explanation: "El bot recibe el mensaje, lo compara por turnos con las palabras clave de cada intención, envía la respuesta que coincide, y usa la respuesta de reserva solo si nada coincidió.",
                items: [
                  {
                    text: "Llega un mensaje de la persona",
                  },
                  {
                    text: "El bot revisa el mensaje buscando las palabras clave de cada intención, rama por rama",
                  },
                  {
                    text: "Si una rama coincide, el bot envía la respuesta de esa rama",
                  },
                  {
                    text: "Si ninguna rama coincidió, el bot envía la respuesta de reserva",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Rompe tu propio chatbot",
            prompt: "Toma el chatbot que diseñaste e intenta engañarlo. Encuentra tres mensajes que una persona real podría enviar y que tus palabras clave no atrapan.",
            steps: [
              "Escribe tres mensajes que signifiquen algo que tu bot debería manejar, pero que eviten todas tus palabras clave.",
              "Sigue cada uno por tu árbol y confirma que llega a la respuesta de reserva.",
              "Para cada uno, decide: ¿podrías arreglarlo agregando una palabra clave, o es demasiado distinto como para atraparlo con reglas?",
            ],
            successCriteria: [
              "Tres mensajes que llegan a la respuesta de reserva aunque una persona los entendería.",
              "Para cada uno, una nota sobre si una palabra clave podría arreglarlo.",
              "Un ejemplo claro que las palabras clave por sí solas no pueden resolver.",
            ],
          },
          reflection: [
            {
              prompt: "¿Qué tipo de pregunta manejó bien tu chatbot, y cuál siguió fallando?",
            },
            {
              prompt: "¿Cómo ayudaría a un chatbot aprender de miles de mensajes reales para atrapar formas de decir las cosas que nunca se te ocurrieron?",
            },
          ],
          recap: {
            summary: "Un chatbot de reglas empareja palabras clave para adivinar la intención del usuario, lleva el mensaje por un árbol de decisión y usa una respuesta de reserva para todo lo que no puede emparejar.",
            keyPoints: [
              "Las palabras clave son las palabras que el bot vigila; las intenciones son lo que la persona realmente quiere.",
              "Un árbol de decisión revisa una intención por rama y termina en una respuesta de reserva.",
              "Los bots de reglas solo manejan las intenciones que alguien programó; todo lo demás se les escapa.",
            ],
          },
          extension: {
            title: "De las reglas al aprendizaje",
            body: [
              "Los chatbots reales grandes no dependen solo de listas de palabras clave. Muchos usan aprendizaje automático entrenado con miles de mensajes reales, así que pueden reconocer una intención incluso en formas de decirlo que nadie escribió a mano.",
              "Describe una ventaja y un riesgo de un chatbot basado en aprendizaje frente al tuyo, basado en reglas. Piensa en qué pasa cuando los mensajes de entrenamiento no incluyen la forma de hablar de algunas personas.",
            ],
          },
        },
        {
          title: "Cómo predicen texto los modelos de lenguaje",
          summary: "Mira por dentro la IA detrás del autocompletado y los asistentes de chat: parte el texto en trozos y predice el siguiente trozo probable, lo que suena fluido pero no es lo mismo que ser verdadero.",
          estimatedTime: "50-60 minutos",
          objectives: [
            {
              text: "Explicar que un modelo de lenguaje predice el siguiente trozo de texto probable.",
            },
            {
              text: "Describir cómo el texto se parte en tokens (trozos) con los que trabaja el modelo.",
            },
            {
              text: "Explicar cómo una indicación inicia y dirige la predicción.",
            },
            {
              text: "Explicar por qué un texto que suena fluido no es lo mismo que un texto verdadero o correcto.",
            },
          ],
          materials: [
            {
              name: "Esta lección en un navegador web",
            },
            {
              name: "Papel y lápiz, o una app de notas",
            },
          ],
          vocabulary: [
            {
              term: "Modelo de lenguaje",
              definition: "Una IA entrenada con cantidades enormes de texto que predice qué texto es probable que venga a continuación.",
            },
            {
              term: "Token (trozo de texto)",
              definition: "Un pedacito de texto con el que trabaja el modelo, muchas veces una palabra o parte de una palabra, como \"jug\", \"ando\", o un signo de puntuación.",
            },
            {
              term: "Texto siguiente probable",
              definition: "Los trozos que el modelo estima más probables a continuación, según los patrones del texto del que aprendió.",
            },
            {
              term: "Indicación",
              definition: "El texto inicial que le das a un modelo de lenguaje, que él continúa prediciendo lo que viene después.",
            },
            {
              term: "Fluido",
              definition: "Que se lee de corrido y suena natural. Un texto fluido puede seguir siendo incorrecto, porque sonar bien no es lo mismo que estar bien.",
            },
          ],
          openingScenario: {
            prompt: "Escribes \"Había una vez\" en un teléfono y te sugiere \"un\". Escribes \"La capital de Australia es\" en un asistente de chat y podría responder con toda fluidez \"Sídney\", lo cual es falso; es Canberra. Si las dos respuestas suenan naturales, ¿cómo decide la IA qué decir?",
            context: "Ten esto presente: sonar bien y estar bien son dos cosas distintas.",
          },
          predictionPrompt: {
            prompt: "Predice: cuando escribes \"pan con\", ¿qué palabra crees que es más probable que agregue un modelo de lenguaje, y por qué justo esa?",
            howToCheck: "Mientras lees, fíjate en que el modelo elige el trozo que más seguido siguió a textos parecidos en aquello de lo que aprendió.",
          },
          concepts: [
            {
              title: "El texto se parte en trozos llamados tokens",
              body: [
                "Un modelo de lenguaje no lee ensayos enteros de una sola vez. Parte el texto en pedacitos llamados tokens. Un token suele ser una palabra, pero las palabras largas o poco comunes se parten: \"increíble\" podría volverse \"in\", \"creí\" y \"ble\". Los espacios y la puntuación también cuentan.",
                "Trabajar con tokens le permite al modelo manejar cualquier texto, incluso palabras que nunca ha visto, combinando pedazos conocidos.",
              ],
              examples: [
                "\"Me gusta la pizza\" → tokens: \"Me\", \" gusta\", \" la\", \" pizza\"",
                "\"jugando\" → tokens: \"jug\", \"ando\"",
                "Un punto \".\" es un token por sí solo",
              ],
            },
            {
              title: "El modelo predice el siguiente trozo probable",
              body: [
                "Un modelo de lenguaje tiene una sola tarea central: dado el texto hasta ahora, predecir el siguiente token. Aprendió de cantidades enormes de texto qué trozos suelen seguir a cuáles. Después de \"pan con\", el trozo \"mermelada\" es muy probable, así que eso es lo que predice.",
                "Y lo hace una y otra vez: predice un trozo, lo agrega, y luego predice el siguiente, para construir oraciones completas. Tu indicación es el texto inicial que lo pone todo en marcha; cambia la indicación y también cambian los trozos siguientes más probables.",
              ],
              examples: [
                "Indicación \"El cielo está\" → siguiente trozo probable \"azul\"",
                "Indicación \"Estimada directora:\" → los siguientes trozos probables empiezan una carta formal",
                "Indicación \"def sumar(a, b):\" → los siguientes trozos probables parecen código de computadora",
              ],
            },
            {
              title: "Fluido no es lo mismo que verdadero",
              body: [
                "Esta es la idea más importante de la lección. Un modelo de lenguaje predice qué texto es probable, no qué es verdadero. \"Probable\" significa que encaja con los patrones del lenguaje que aprendió, no que una persona haya verificado los datos.",
                "Así que un modelo puede producir una oración fluida, segura y bien escrita que sencillamente es falsa. A veces a esto se le llama una respuesta inventada o \"alucinada\". Que la salida sea fluida significa que las palabras encajan bien entre sí; no dice nada sobre si la afirmación es correcta. Verifica siempre los datos importantes con una fuente confiable, y no solo porque la IA \"sonaba segura\".",
              ],
              examples: [
                "Un modelo puede dar el título de un libro falso dentro de una oración perfectamente natural",
                "Puede dar con toda seguridad una fecha equivocada que se lee de corrido",
                "Puede inventar una fuente que parece real pero no existe",
              ],
            },
          ],
          workedExample: {
            title: "Predecir trozo por trozo a partir de una indicación",
            steps: [
              "Indicación: \"Lo mejor del verano es\".",
              "El modelo la parte en tokens y observa los patrones del texto que siguió a comienzos parecidos.",
              "Predice el siguiente trozo más probable, tal vez \" nadar\", y lo agrega.",
              "Ahora el texto es \"Lo mejor del verano es nadar\"; predice otra vez, tal vez \" en\", luego \" la\", luego \" alberca\".",
              "Trozo por trozo construye una oración fluida. Fíjate: en ningún momento comprobó si nadar de verdad es lo mejor del verano; solo siguió patrones probables.",
            ],
            takeaway: "Un modelo de lenguaje construye texto un trozo probable a la vez a partir de tu indicación; el resultado suena natural, pero es una predicción, no un dato verificado.",
          },
          visuals: [
            {
              title: "Predecir, agregar, repetir",
              summary: "Un ciclo presentado como flujo. Inicio: el texto de la indicación. Paso 1: partirlo en tokens (trozos). Paso 2: predecir el siguiente trozo más probable. Paso 3: agregar ese trozo al texto. Una flecha va del paso 3 de vuelta al paso 2 para predecir otra vez, y otra, haciendo crecer el texto trozo por trozo hasta que se detiene. El flujo destaca que cada paso solo pregunta \"¿qué trozo es probable a continuación?\", nunca \"¿esto es verdad?\".",
              caption: "El modelo repite una sola pregunta, qué trozo es probable a continuación, nunca \"¿esto es correcto?\".",
            },
            {
              title: "Qué tan probable es cada trozo siguiente después de \"El cielo está\"",
              summary: "Una gráfica de barras con probabilidades inventadas pero realistas para el siguiente trozo después de la indicación \"El cielo está\". \"azul\" es con mucho la barra más alta, alrededor de 60 de 100; \"despejado\" ronda 15, \"cayéndose\" ronda 8, \"gris\" ronda 7, y \"verde\" es una barra muy corta, de alrededor de 2. El modelo suele elegir una barra alta, y por eso normalmente dice \"azul\", pero una barra corta como \"verde\" sigue siendo posible, y \"probable\" nunca significa \"comprobado como verdadero\".",
              chart: {
                unit: "probabilidad sobre 100",
                bars: [
                  {
                    label: "azul",
                  },
                  {
                    label: "despejado",
                  },
                  {
                    label: "cayéndose",
                  },
                  {
                    label: "gris",
                  },
                  {
                    label: "verde",
                  },
                ],
              },
            },
          ],
          activity: {
            title: "Laboratorio de predicción del texto siguiente",
            goal: "Correr un pequeño predictor local de la siguiente palabra: ver las palabras siguientes probables para una indicación, cambiar una palabra para observar cómo se mueven las probabilidades, y juzgar si un texto fluido es realmente verdadero.",
            overview: "Un modelo de n-gramas diminuto, construido a partir de una lista local de palabras seleccionada, predice las palabras siguientes más probables para una indicación y muestra sus probabilidades relativas en una gráfica pequeña, sin ningún modelo de lenguaje externo ni conexión a la red. Cambia una palabra (tormenta → desfile) o agrega tus propias palabras y las predicciones se recalculan de forma determinista, con una explicación de si usó las dos últimas palabras o si se apoyó solo en una. Después juzga las tarjetas de fluidez: oraciones suaves y seguras que aun así pueden inventar una fecha, una cita o una afirmación falsa, cada una con una forma de verificarla.",
            steps: [
              "Elige una indicación y lee las palabras siguientes más probables y sus probabilidades.",
              "Cambia una palabra o agrega las tuyas, y observa cómo cambian las probabilidades.",
              "Lee la explicación de con qué coincidió el modelo: está emparejando patrones, no comprendiendo.",
              "Juzga las tarjetas de fluidez: decide verdadero / falso / hay que verificar, luego revélalas y observa cómo comprobarlo.",
            ],
            materials: [
              "El laboratorio de predicción del texto siguiente incluido en esta actividad",
            ],
            successCriteria: [
              "Se leen las palabras siguientes probables para al menos dos indicaciones, incluido un cambio de palabra.",
              "Se observa el efecto de cambiar el contexto sobre las probabilidades.",
              "Se identifica una tarjeta fluida pero falsa, con una forma de verificarla.",
            ],
            dataset: {
              name: "Corpus local + tarjetas de fluidez",
              description: "Una lista de palabras pequeña, seleccionada y apropiada para la edad, con la que se construye el modelo local de n-gramas, más las tarjetas de fluidez: oraciones bien escritas que son verdaderas o fluidas pero falsas (una fecha inventada, una cita mal atribuida), con notas de verificación. No se envía ningún texto a un servicio de IA.",
              columns: [
                "Indicación",
                "Palabras siguientes probables",
                "Continuación",
                "¿Es verdad?",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responde esto para comprobar que entiendes cómo predice texto un modelo de lenguaje.",
            questions: [
              {
                prompt: "¿Qué está haciendo en realidad un modelo de lenguaje cuando escribe una respuesta?",
                explanation: "Un modelo de lenguaje predice una y otra vez el siguiente trozo de texto probable; no está consultando datos verificados.",
                choices: [
                  {
                    text: "Consultar datos verificados en una enciclopedia confiable",
                    explanation: "No verifica datos; predice texto probable, que puede estar equivocado.",
                  },
                  {
                    text: "Predecir el siguiente trozo de texto probable, una y otra vez",
                    explanation: "Correcto: construye el texto un trozo probable a la vez, con base en patrones aprendidos.",
                  },
                  {
                    text: "Copiar una respuesta completa palabra por palabra de un sitio web",
                    explanation: "Genera texto trozo por trozo a partir de patrones, no copiando una página.",
                  },
                  {
                    text: "Preguntarle la respuesta a una persona cada vez",
                    explanation: "No hay ninguna persona respondiendo; el modelo predice por su cuenta.",
                  },
                ],
              },
              {
                prompt: "Decide si la afirmación es verdadera o falsa.",
                statement: "Si la respuesta de un modelo de lenguaje es fluida y suena segura, eso prueba que la respuesta es verdadera.",
                explanation: "Falso: fluido significa que las palabras encajan bien, no que la afirmación sea correcta. Un modelo puede decir algo equivocado con mucha soltura, así que los datos importantes hay que verificarlos.",
              },
              {
                prompt: "¿Cuál es el siguiente paso más inteligente en esta situación?",
                scenario: "Para un trabajo, Priya le pregunta a un asistente de chat cuándo se construyó un puente famoso. Este responde con una oración fluida y un año concreto que ella nunca había visto.",
                explanation: "La respuesta es una predicción de texto probable, no un dato verificado, así que Priya debería confirmar el año con una fuente confiable antes de usarlo.",
                choices: [
                  {
                    text: "Usar el año de inmediato porque la oración sonaba segura",
                    explanation: "Sonar seguro es fluidez, no prueba; el modelo pudo haber predicho un año equivocado.",
                  },
                  {
                    text: "Verificar el año con una fuente confiable antes de usarlo",
                    explanation: "Correcto: verifica los datos importantes, porque el modelo predice texto probable, no verdad comprobada.",
                  },
                  {
                    text: "Suponer que debe estar mal e ignorarlo por completo",
                    explanation: "Podría estar bien o mal; el punto es verificar, no confiar ni rechazar a ciegas.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Detective de lo probable frente a lo verdadero",
            prompt: "Reúne dos ejemplos donde \"el texto siguiente probable\" y \"lo verdadero\" jalen en direcciones distintas.",
            steps: [
              "Escribe una indicación donde la continuación probable también sea verdadera (por ejemplo, \"Dos más dos es\").",
              "Escribe una indicación donde una continuación que suene probable podría ser falsa con facilidad (por ejemplo, una fecha concreta o el autor de un libro).",
              "Para la arriesgada, describe exactamente cómo comprobarías si la respuesta es verdadera.",
            ],
            successCriteria: [
              "Una indicación donde lo probable y lo verdadero coinciden.",
              "Una indicación donde una respuesta fluida podría ser falsa.",
              "Un plan claro para verificar la respuesta arriesgada con una fuente confiable.",
            ],
          },
          reflection: [
            {
              prompt: "¿Cuándo está bien confiar en una respuesta fluida de una IA, y cuándo deberías comprobarla siempre?",
            },
            {
              prompt: "¿Cómo cambió tu forma de pensar sobre la escritura con IA ver el texto como \"trozos con probabilidades\"?",
            },
          ],
          recap: {
            summary: "Un modelo de lenguaje parte el texto en trozos y predice el siguiente trozo probable a partir de una indicación; la salida suena fluida, pero es una predicción, no un dato verificado.",
            keyPoints: [
              "El texto se parte en tokens (trozos); el modelo predice el siguiente probable, una y otra vez.",
              "Tu indicación es el texto inicial que dirige las predicciones.",
              "Fluido no es lo mismo que verdadero: verifica siempre los datos importantes.",
            ],
          },
          extension: {
            title: "Por qué los modelos inventan cosas",
            body: [
              "Como un modelo de lenguaje siempre predice el texto que más probable parece, va a llenar un hueco con toda seguridad incluso cuando no tiene información real, produciendo una respuesta inventada que encaja con el patrón de una verdadera. La gente le llama a esto una \"alucinación\".",
              "Explica en unas cuantas oraciones por qué un sistema construido para predecir texto probable inventaría una fuente falsa en lugar de decir \"no sé\", y propón un hábito que te proteja de dejarte engañar.",
            ],
          },
        },
        {
          title: "Construye y cuestiona las recomendaciones",
          summary: "Descubre cómo los sistemas de recomendación usan la similitud y tu retroalimentación para sugerirte qué sigue, y cuestiona cómo ese mismo sistema puede atraparte en una burbuja de filtros.",
          estimatedTime: "50-60 minutos",
          objectives: [
            {
              text: "Explicar cómo un sistema de recomendación usa la similitud para sugerir contenidos.",
            },
            {
              text: "Describir cómo tu retroalimentación (me gusta, saltos, tiempo de reproducción) entrena las recomendaciones.",
            },
            {
              text: "Explicar qué es una burbuja de filtros y cómo las recomendaciones pueden crear una.",
            },
            {
              text: "Auditar un feed de recomendaciones y proponer maneras de ver una variedad más amplia.",
            },
          ],
          materials: [
            {
              name: "Esta lección en un navegador web",
            },
            {
              name: "Papel y lápiz, o una app de notas",
            },
          ],
          vocabulary: [
            {
              term: "Recomendación",
              definition: "Una sugerencia de algo que te podría gustar a continuación (un video, una canción, un producto o una publicación) elegida por un sistema de IA.",
            },
            {
              term: "Similitud",
              definition: "Qué tan parecidos son dos contenidos o dos personas. Los recomendadores sugieren contenidos parecidos a los que te gustaron, o que le gustaron a gente parecida a ti.",
            },
            {
              term: "Retroalimentación",
              definition: "Las señales que le das a un sistema (me gusta, saltos, clics, tiempo de reproducción) y que usa para aprender tus gustos.",
            },
            {
              term: "Burbuja de filtros",
              definition: "Cuando un sistema te sigue mostrando cosas parecidas, así que ves sobre todo una rebanada estrecha de ideas o contenidos y te pierdes el resto.",
            },
          ],
          openingScenario: {
            prompt: "Ves un video sobre trucos de patineta. Al poco rato todo tu feed es patineta, y los videos de cualquier otro tema desaparecen. ¿Cómo decidió la app mostrarte solo esto, y qué te podrías estar perdiendo?",
            context: "Vas a aprender tanto cómo está construido esto como por qué vale la pena cuestionarlo.",
          },
          predictionPrompt: {
            prompt: "Predice: si una app de música solo te pusiera canciones parecidas a tus tres favoritas, ¿qué tipos de música probablemente nunca descubrirías?",
            howToCheck: "Mientras lees, conecta tu respuesta con la forma en que la similitud y la retroalimentación van estrechando lo que muestra un feed.",
          },
          concepts: [
            {
              title: "Las recomendaciones funcionan con similitud",
              body: [
                "Un sistema de recomendación sugiere contenidos midiendo la similitud. Si te gustó un video, busca otros videos parecidos (mismo tema, estilo o creador) o videos que también le gustaron a gente parecida a ti. Y luego pone esos hasta arriba de tu feed.",
                "Esto es genuinamente útil: te ayuda a encontrar cosas que disfrutarías sin tener que buscarlas. El sistema está respondiendo a \"¿qué es lo más parecido a lo que a esta persona ya le gustó?\".",
              ],
              examples: [
                "Te gustó un video de cocina → te recomienda más videos de cocina",
                "\"Quienes compraron esto también compraron…\" en un sitio de compras",
                "Una estación de canciones armada a partir de un artista que te gusta",
              ],
            },
            {
              title: "Tu retroalimentación entrena el sistema",
              body: [
                "El sistema no conoce tus gustos de antemano: los aprende de tu retroalimentación. Cada me gusta, salto, clic, repetición e incluso cuánto tiempo ves algo es una señal. Si lo ves hasta el final, cuenta como un fuerte \"más de esto\". Si lo saltas a los dos segundos, cuenta como \"menos de esto\".",
                "Así que estás entrenando tu propio feed todo el tiempo, muchas veces sin querer. Detenerte en un video lo suficiente puede empujar al sistema a mostrarte más de ese tipo, quisieras más o no.",
              ],
              examples: [
                "Terminar un video → más de ese tema",
                "Saltar rápido → menos de ese tipo",
                "Darle me gusta a una publicación → más de ese creador y de creadores parecidos",
              ],
            },
            {
              title: "Burbujas de filtros: cuando la similitud estrecha tu mundo",
              body: [
                "Aquí está la compensación honesta. Como el sistema te sigue mostrando lo más parecido a lo que ya te gustó, tu feed puede volverse cada vez más estrecho. A esto se le llama burbuja de filtros: acabas viendo una sola rebanada de contenido y te pierdes por completo otros temas, puntos de vista y creadores.",
                "Las burbujas de filtros importan más allá del entretenimiento. Si un feed de noticias u opiniones solo te muestra puntos de vista con los que ya estás de acuerdo, podrías pensar que todo el mundo opina igual y rara vez encontrarte con buenas ideas que te desafíen. Las burbujas de filtros no las causa una IA \"mala\": son un efecto secundario de un sistema haciendo exactamente aquello para lo que se construyó, maximizar la similitud con tu comportamiento pasado. Saber esto te permite contrarrestarlas: buscando temas nuevos, siguiendo a creadores distintos o usando controles que agreguen variedad.",
              ],
              examples: [
                "Un feed que se vuelve puro un solo pasatiempo después de un único video",
                "Un feed de noticias que solo muestra un lado de un tema",
                "Un sitio de compras que nunca te muestra una marca más barata o distinta",
              ],
            },
          ],
          workedExample: {
            title: "Cómo un solo clic puede encoger un feed",
            steps: [
              "Abres una app de videos; el feed es variado: deportes, ciencia, música, comedia, cocina.",
              "Ves un video de ciencia completo, de principio a fin. Esa es una fuerte retroalimentación positiva.",
              "El sistema busca los videos más parecidos a ese y los sube de lugar, porque la similitud dice \"muestra más como aquello que terminó\".",
              "Ves un par más de videos de ciencia; cada uno que terminas es más retroalimentación apuntando en la misma dirección.",
              "Ahora el feed es casi todo ciencia. Los videos de música y comedia, que también te podrían encantar, rara vez aparecen: te deslizaste hacia una burbuja de filtros construida con tu propia retroalimentación.",
              "Para ampliarla, buscas a propósito un tema nuevo, saltas unos cuantos videos de ciencia o usas un control de \"no me interesa\" para enviar otra retroalimentación.",
            ],
            takeaway: "La similitud más tu retroalimentación hacen útiles a las recomendaciones, pero ese mismo ciclo puede estrechar calladamente tu feed hasta volverlo una burbuja de filtros, a menos que actúes para ampliarlo.",
          },
          visuals: [
            {
              title: "El ciclo de retroalimentación de las recomendaciones",
              summary: "Un flujo circular con cuatro etapas. Etapa 1: ves, marcas me gusta o saltas algo (retroalimentación). Etapa 2: el sistema actualiza su idea de tus gustos. Etapa 3: busca los contenidos más parecidos a lo que te gustó. Etapa 4: te muestra esos contenidos, lo que moldea lo que ves después, y la flecha regresa a la etapa 1. El pie de imagen señala que el ciclo es útil, pero que con el tiempo tiende a cerrarse alrededor de un conjunto estrecho de contenidos, formando una burbuja de filtros.",
              caption: "El ciclo aprende rápido, pero cada vuelta puede jalar tu feed hacia un conjunto más estrecho de contenidos parecidos.",
            },
            {
              title: "Un feed antes y después de una burbuja de filtros",
              summary: "Antes: un feed equilibrado con cinco temas en proporciones más o menos iguales: deportes, ciencia, música, comedia y cocina. Después: tras terminar un video de ciencia y unos cuantos más, ese mismo feed es ahora casi todo ciencia, con apenas rebanadas diminutas de lo demás. El cambio muestra cómo la similitud y la retroalimentación pueden convertir un feed variado en uno estrecho, y señala acciones (buscar temas nuevos, saltar, marcar \"no me interesa\") que devuelven la variedad.",
            },
          ],
          activity: {
            title: "Constructor de sistemas de recomendación",
            goal: "Construir un recomendador basado en contenido: calificar elementos, elegir qué características importan, leer recomendaciones que se explican solas, y hacer un experimento de burbuja de filtros.",
            overview: "Califica elementos de un catálogo ficticio y define cuánto importa cada característica. Un recomendador transparente y determinista construye un perfil de preferencias y puntúa cada uno de los demás elementos por similitud ponderada de características, y cada recomendación viene con un \"por qué estás viendo esto\" en palabras sencillas, junto con las características que subieron o bajaron su puntuación. Aparece una advertencia de datos insuficientes cuando no hay lo bastante para trabajar. Después haz el experimento de la burbuja de filtros: califica un solo tema y observa cómo se estrecha el feed, toma una instantánea, agrega un tema distinto o activa el modo Explorar, y compara. Sin cuentas ni datos personales; solo el catálogo incluido.",
            steps: [
              "Califica varios elementos del catálogo que te gusten o no.",
              "Elige qué características importan con los controles de peso.",
              "Lee las recomendaciones, junto con la explicación y las características que contribuyeron a cada una.",
              "Haz el experimento de la burbuja de filtros: un solo tema, instantánea, luego agrega un tema o activa el modo Explorar y compara.",
            ],
            materials: [
              "El constructor de recomendaciones y el catálogo incluidos en esta actividad",
            ],
            successCriteria: [
              "Se construye un perfil calificando elementos y se generan recomendaciones.",
              "Cada recomendación tiene una explicación, y se entiende la advertencia de datos insuficientes.",
              "Se hace el experimento de la burbuja de filtros y se describe el estrechamiento (y cómo ampliarlo).",
            ],
            dataset: {
              name: "Catálogo ficticio de actividades de aprendizaje",
              description: "Un catálogo incluido e inventado de elementos de aprendizaje (actividades, libros, juegos, exposiciones) de seis temas, cada uno con características estructuradas (tema, tipo, dificultad, duración, formato, rango de edad, popularidad ficticia). Sin datos personales ni cuentas; la puntuación y las explicaciones son deterministas y se calculan en tu dispositivo.",
              columns: [
                "Elemento",
                "Tema",
                "Tipo",
                "Dificultad",
                "Formato",
                "Rango de edad",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responde esto para comprobar que sabes explicar y cuestionar las recomendaciones.",
            questions: [
              {
                prompt: "¿Qué usa principalmente un sistema de recomendación para decidir qué sugerir a continuación?",
                explanation: "Los recomendadores sugieren contenidos parecidos a los que te gustaron, o que le gustaron a personas parecidas a ti: eso es la similitud.",
                choices: [
                  {
                    text: "La similitud entre contenidos, y entre los gustos de las personas",
                    explanation: "Correcto: busca contenidos parecidos a lo que te gustó, o que le gustaron a personas parecidas.",
                  },
                  {
                    text: "Una elección al azar, sin ningún patrón",
                    explanation: "Las recomendaciones no son al azar; las impulsan la similitud y tu retroalimentación.",
                  },
                  {
                    text: "El orden alfabético de los títulos",
                    explanation: "Ordenar por título no es la forma en que los recomendadores eligen qué mostrar.",
                  },
                  {
                    text: "Lo más nuevo, sin importar tus gustos",
                    explanation: "Que algo sea nuevo puede importar un poco, pero el motor principal es la similitud con tus gustos.",
                  },
                ],
              },
              {
                prompt: "¿Cuáles de estas son formas de ampliar un feed y salir de una burbuja de filtros? (Elige todas las que correspondan.)",
                explanation: "Enviar una retroalimentación distinta y buscar variedad a propósito alejan al sistema de una burbuja estrecha; terminar pasivamente videos parecidos solo la cierra más.",
                choices: [
                  {
                    text: "Buscar un tema completamente nuevo que no hayas visto antes",
                    explanation: "Correcto: las búsquedas nuevas le dan al sistema señales frescas y amplían tus recomendaciones.",
                  },
                  {
                    text: "Seguir a creadores distintos de los de siempre",
                    explanation: "Correcto: creadores distintos aportan una variedad que el ciclo de similitud no ofrecería por su cuenta.",
                  },
                  {
                    text: "Seguir viendo hasta el final solo videos idénticos al anterior",
                    explanation: "Esa es una fuerte retroalimentación de \"más de esto\", que cierra la burbuja en lugar de ampliarla.",
                  },
                  {
                    text: "Usar el control de \"no me interesa\" en las sugerencias repetitivas",
                    explanation: "Correcto: eso envía retroalimentación de \"menos de esto\" y deja lugar para otros temas.",
                  },
                ],
              },
              {
                prompt: "¿Qué opción explica mejor lo que está pasando en esta situación?",
                scenario: "Después de que Sam termina varios videos que defienden un lado de un debate escolar, su feed deja de mostrarle el otro lado por completo, y él empieza a sentir que todo el mundo está de acuerdo con él.",
                explanation: "El sistema sigue recomendando contenido parecido al que Sam terminó, estrechando su feed hasta un solo punto de vista: una burbuja de filtros, que importa sobre todo con noticias y opiniones.",
                choices: [
                  {
                    text: "A la app se le acabaron los videos sobre el otro lado",
                    explanation: "El otro lado sigue existiendo; el sistema simplemente dejó de mostrarlo porque se parece menos a lo que Sam vio.",
                  },
                  {
                    text: "Sam está en una burbuja de filtros construida con su propia retroalimentación",
                    explanation: "Correcto: la similitud, sumada a los videos que terminó, estrechó el feed hasta un solo punto de vista, una burbuja de filtros.",
                  },
                  {
                    text: "El sistema está descompuesto y muestra contenido al azar",
                    explanation: "Está funcionando tal como se diseñó; maximizar la similitud es justo lo que creó la burbuja.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Diseña una función rompeburbujas",
            prompt: "Inventa una función para una app de videos o de música que ayude a la gente a salir de las burbujas de filtros sin dejar de dar recomendaciones útiles.",
            steps: [
              "Describe la función y qué botón o control vería el usuario.",
              "Explica cómo cambia la retroalimentación o la similitud que usa el sistema.",
              "Nombra una desventaja (por ejemplo, que algunos usuarios no quieran más variedad) y cómo la manejarías.",
            ],
            successCriteria: [
              "Una función clara, con un control que el usuario pueda usar.",
              "Una explicación de cómo amplía el feed.",
              "Una desventaja honesta y una respuesta a ella.",
            ],
          },
          reflection: [
            {
              prompt: "¿En qué parte de tu propia vida has notado que un feed se va estrechando con el tiempo?",
            },
            {
              prompt: "¿Cuándo es una burbuja de filtros bastante inofensiva, y cuándo podría de verdad importar?",
            },
          ],
          recap: {
            summary: "Los sistemas de recomendación usan la similitud y tu retroalimentación para sugerirte qué sigue, lo cual es útil, pero puede estrechar tu feed hasta volverlo una burbuja de filtros, a menos que actúes para ampliarlo.",
            keyPoints: [
              "Los recomendadores sugieren contenidos parecidos a los que te gustaron a ti (o a gente como tú).",
              "Tus me gusta, tus saltos y tu tiempo de reproducción son la retroalimentación que entrena tu feed.",
              "Ese mismo ciclo puede crear burbujas de filtros; buscar y dar retroalimentación variada amplían el feed.",
            ],
          },
          extension: {
            title: "¿A quién le sirve tu retroalimentación?",
            body: [
              "Los sistemas de recomendación muchas veces se diseñan para que sigas viendo, porque más tiempo de reproducción puede significar más ganancias para la empresa. Ese objetivo no siempre coincide con tu objetivo de aprender ampliamente o de usar bien tu tiempo.",
              "Explica cómo el objetivo de una empresa (más tiempo de reproducción) y el de un usuario (variedad, tiempo bien usado) pueden jalar en direcciones distintas, y propón un cambio de diseño honesto que sirviera mejor a los usuarios aunque bajara el tiempo de reproducción.",
            ],
          },
        },
      ],
    },
    {
      title: "Justicia, privacidad e información confiable",
      subtitle: "Audita la IA en busca de sesgos, protege los datos de las personas y comprueba si el contenido que ves es confiable.",
      summary: "Los estudiantes aprenden a juzgar la IA de forma responsable: cómo unos datos desparejos crean sesgos y cómo los resultados por grupo los revelan; por qué importan la privacidad y el consentimiento y cómo la minimización de datos reduce el riesgo; y cómo verificar contenido hecho por IA y contenido en línea buscando la fuente original, revisando el contexto y confirmando de forma independiente, todo mientras las personas siguen al mando gracias a la supervisión y al derecho de apelación.",
      bigQuestion: "¿Cómo podemos saber si un sistema de IA es justo, respeta la privacidad y nos da información en la que podemos confiar?",
      estimatedTime: "2.5-3 horas",
      objectives: [
        "Explicar cómo el sesgo surge de una representación despareja y leer resultados por grupo para detectarlo.",
        "Definir privacidad, datos personales y consentimiento, y aplicar la minimización de datos a una función.",
        "Verificar contenido usando la fuente original, el contexto y la confirmación independiente.",
        "Explicar por qué las decisiones importantes de una IA necesitan supervisión humana y derecho de apelación.",
      ],
      requiredConcepts: [
        "Sesgo",
        "Representación",
        "Resultado por grupo",
        "Justicia",
        "Privacidad",
        "Consentimiento",
        "Datos personales",
        "Minimización de datos",
        "Deepfake",
        "Desinformación",
        "Fuente original",
        "Contexto",
        "Confirmación independiente",
        "Supervisión humana",
        "Apelación",
      ],
      lessons: [
        {
          title: "Audita un conjunto de datos en busca de justicia",
          summary: "Aprende cómo unos ejemplos desparejos crean sesgos, lee resultados por grupo para ver para quién funciona bien un sistema, y audita un conjunto de datos en busca de justicia.",
          estimatedTime: "50-60 minutos",
          objectives: [
            {
              text: "Definir sesgo y representación y explicar cómo están conectados.",
            },
            {
              text: "Leer un resultado por grupo para comparar qué tan bien funciona un sistema con distintos grupos.",
            },
            {
              text: "Explicar qué significa la justicia cuando una IA trata a los grupos de forma distinta.",
            },
            {
              text: "Auditar un conjunto de datos descrito y nombrar una forma en que sus ejemplos están desequilibrados.",
            },
          ],
          materials: [
            {
              name: "Esta lección en un navegador web",
            },
            {
              name: "Papel y lápiz, o una app de notas",
            },
          ],
          vocabulary: [
            {
              term: "Sesgo",
              definition: "Cuando un sistema funciona de forma habitual mejor o peor con unas personas o cosas que con otras, normalmente por los ejemplos de los que aprendió.",
            },
            {
              term: "Representación",
              definition: "Cuánto aparece un grupo en un conjunto de datos. Un grupo está bien representado si tiene muchos ejemplos, y subrepresentado si tiene pocos.",
            },
            {
              term: "Resultado por grupo",
              definition: "Una calificación medida por separado para cada grupo, en lugar de un solo número para todos, para que puedas ver con quién funciona bien un sistema.",
            },
            {
              term: "Justicia",
              definition: "Tratar a los grupos de una manera que la gente consideraría pareja y razonable, para que ningún grupo quede peor sin una buena razón.",
            },
          ],
          openingScenario: {
            prompt: "Un asistente de voz entiende a un amigo casi siempre, pero no deja de oír mal a otro amigo que tiene un acento distinto. El software es el mismo para los dos. ¿Por qué podría funcionar tan diferente con cada uno?",
            context: "Ten presente tu primera respuesta: más adelante en la lección la vas a poner a prueba con números reales por grupo.",
          },
          predictionPrompt: {
            prompt: "Predice: si un sistema de reconocimiento facial aprendió sobre todo con fotos de personas adultas, ¿crees que funcionará igual de bien con fotos de niños?",
            howToCheck: "Mientras lees los conceptos y la gráfica por grupo de abajo, fíjate en si la cantidad de ejemplos de un grupo cambia qué tan bien funciona el sistema con ese grupo.",
          },
          concepts: [
            {
              title: "El sesgo viene de los ejemplos, no de que la computadora \"quiera\" algo",
              body: [
                "Una computadora no tiene opiniones ni sentimientos. Cuando decimos que una IA tiene sesgo, queremos decir que funciona de forma habitual mejor con unas personas o cosas que con otras. Casi siempre eso ocurre por los ejemplos de los que aprendió.",
                "Si un sistema aprende de ejemplos desparejos, se vuelve bueno en los casos comunes y más flojo en los raros. El software está haciendo exactamente aquello para lo que se entrenó: lo desparejo vino de los datos que le dieron las personas.",
              ],
              examples: [
                "Un sistema de voz entrenado sobre todo con un acento entiende mejor ese acento.",
                "Un clasificador de fotos entrenado sobre todo con imágenes de día batalla de noche.",
                "Una herramienta de traducción entrenada con escritura formal maneja mal la jerga.",
              ],
            },
            {
              title: "Representación: quién aparece en los ejemplos, y cuánto",
              body: [
                "La representación tiene que ver con cuánto aparece cada grupo en los datos. Un grupo está bien representado cuando tiene muchos ejemplos, y subrepresentado cuando tiene pocos. Un conjunto de datos puede tener miles de ejemplos y aun así dejar a algunos grupos casi sin ninguno.",
                "La subrepresentación es una de las mayores fuentes de sesgo. Un modelo solo puede aprender patrones que ha visto. Si un grupo casi no aparece en los ejemplos, el modelo tiene poco de dónde aprender, así que tiende a cometer más errores con ese grupo.",
              ],
              examples: [
                "Un conjunto de 10,000 fotos de perros con solo 20 fotos de una raza.",
                "Un conjunto de datos médicos reunido sobre todo con personas adultas y con pocos niños.",
                "Un conjunto de escritura a mano con mucha letra de molde y muy poca cursiva.",
              ],
            },
            {
              title: "Los resultados por grupo muestran lo que esconde una sola calificación general",
              body: [
                "Es tentador juzgar un sistema por un solo número, como \"tiene 92 por ciento de exactitud\". Pero un solo número es un promedio de todo el mundo. Puede verse fantástico y aun así fallar feo con un grupo pequeño cuyos errores quedan enterrados en el promedio.",
                "Un resultado por grupo mide la exactitud por separado para cada grupo. Cuando desglosas la calificación, puedes ver con quién funciona bien el sistema y con quién funciona mal. Las preguntas de justicia casi siempre necesitan resultados por grupo, no solo un número general.",
              ],
              examples: [
                "92 por ciento en general, pero solo 74 por ciento con un grupo de acento.",
                "Exactitud general alta, pero muchísimos más errores en fotos nocturnas que en las de día.",
                "Una prueba que en promedio aprueba, pero que falla seguido con quienes escriben con la mano izquierda.",
              ],
            },
            {
              title: "Justicia: ¿alguien queda peor sin una buena razón?",
              body: [
                "La justicia significa tratar a los grupos de una manera que la gente consideraría pareja y razonable. No siempre exige resultados idénticos, pero sí pregunta si algún grupo está quedando peor, y si hay una buena razón para esa diferencia.",
                "La justicia es un juicio humano, no algo que decida la computadora. Son las personas quienes tienen que mirar los resultados por grupo, decidir si una diferencia es aceptable y hacerse responsables de corregirla, muchas veces reuniendo ejemplos más equilibrados.",
              ],
              examples: [
                "Decidir que una diferencia de 74 por ciento frente a 92 por ciento de exactitud es demasiado grande como para lanzar el producto.",
                "Elegir reunir más ejemplos de los grupos subrepresentados.",
                "Preguntarse a quién perjudica que el sistema cometa un error con un grupo en particular.",
              ],
            },
          ],
          workedExample: {
            title: "Auditar el conjunto de datos de un detector de sonrisas",
            steps: [
              "Nombra la tarea. Una app de cámara intenta tomar la foto cuando todos están sonriendo. Entrada: un rostro. Salida: \"sonriendo\" o \"no sonriendo\".",
              "Mira la representación. El conjunto de entrenamiento tiene 8,000 fotos de personas adultas y solo 500 fotos de niños pequeños.",
              "Predice el efecto. Con tan pocos ejemplos de niños, el modelo tiene poco de dónde aprender cómo sonríen los niños, así que seguramente cometerá más errores con ellos.",
              "Revisa el resultado por grupo, no solo el promedio. La exactitud general es del 90 por ciento, pero desglosada por grupo es del 94 por ciento con personas adultas y del 71 por ciento con niños.",
              "Toma la decisión de justicia. La diferencia es grande y los niños quedan peor sin una buena razón, así que la solución justa es reunir más ejemplos de niños y volver a probar antes de lanzarlo.",
            ],
            takeaway: "Audita un conjunto de datos preguntando quién está subrepresentado, y luego revisa los resultados por grupo para ver si esa desigualdad se convirtió en errores injustos.",
          },
          visuals: [
            {
              title: "Exactitud por grupo: un promedio esconde una diferencia real",
              summary: "Una gráfica de barras de la exactitud de un sistema de reconocimiento de voz, medida por separado para cuatro grupos de acento, en porcentaje. El promedio general es del 88 por ciento, pero los grupos están desparejos: grupo de acento A, 94 por ciento; grupo de acento B, 91 por ciento; grupo de acento C, 82 por ciento; y grupo de acento D, 74 por ciento. Los grupos C y D, que tuvieron menos ejemplos de entrenamiento, quedan muy por debajo del promedio, así que el número general por sí solo esconde una diferencia real de unos 20 puntos entre el mejor y el peor grupo.",
              caption: "Desglosa el promedio y queda claro que el sistema funciona mejor con unos grupos que con otros.",
              chart: {
                unit: "% de exactitud",
                bars: [
                  {
                    label: "Promedio general",
                  },
                  {
                    label: "Grupo de acento A",
                  },
                  {
                    label: "Grupo de acento B",
                  },
                  {
                    label: "Grupo de acento C",
                  },
                  {
                    label: "Grupo de acento D",
                  },
                ],
              },
            },
            {
              title: "La representación coincide con la diferencia de exactitud",
              summary: "Una tabla que relaciona cuántos ejemplos de entrenamiento tuvo cada grupo de acento con su exactitud. Grupo A: 5,000 ejemplos, 94 por ciento de exactitud. Grupo B: 4,200 ejemplos, 91 por ciento. Grupo C: 900 ejemplos, 82 por ciento. Grupo D: 400 ejemplos, 74 por ciento. Los grupos con menos ejemplos tienen la exactitud más baja, lo que muestra cómo la subrepresentación se convierte en sesgo.",
              table: {
                columns: [
                  "Grupo de acento",
                  "Ejemplos de entrenamiento",
                  "Exactitud",
                ],
              },
            },
          ],
          activity: {
            title: "Auditoría de justicia",
            goal: "Auditar el recomendador de programas de ciencia y tecnología de una escuela ficticia: ver cómo una exactitud general esconde un mal resultado para un grupo más pequeño, y luego corregirlo limitando una característica sustituta y agregando ejemplos subrepresentados.",
            overview: "Una escuela inventada recomienda programas extraescolares de ciencia y tecnología. Un modelo transparente de vecinos más cercanos predice si un programa encaja bien; tú comparas la exactitud general con la exactitud de cada grupo (Hillside y el más pequeño y lejano Riverside). El modelo defectuoso depende demasiado de una característica sustituta engañosa, \"vive cerca del plantel\", que refleja el barrio y no la afinidad, y además se entrenó con muy pocos ejemplos de buen encaje de Riverside. Baja el peso de esa característica sustituta y agrega los ejemplos faltantes, después vuelve a correrlo y compáralo con la versión defectuosa. Todo es ficticio y determinista; mejorar la representación ayuda, pero nunca garantiza una justicia perfecta.",
            steps: [
              "Lee la exactitud general y luego la exactitud de cada grupo; fíjate en la diferencia.",
              "Baja el peso de la característica sustituta engañosa \"cerca del plantel\".",
              "Agrega los ejemplos faltantes de buen encaje del grupo subrepresentado de Riverside.",
              "Vuelve a correrlo y compara la exactitud por grupo, las aprobaciones equivocadas y los estudiantes que se quedaron fuera, antes y después.",
            ],
            materials: [
              "La auditoría de justicia incluida en esta actividad",
            ],
            successCriteria: [
              "Se identifica la diferencia por grupo que escondía el número general.",
              "Se limita la característica sustituta y se agregan ejemplos subrepresentados.",
              "Se compara la exactitud por grupo de antes y después, señalando que la justicia mejoró pero no está garantizada.",
            ],
            dataset: {
              name: "Conjunto de auditoría del recomendador de programas de ciencia y tecnología",
              description: "Un conjunto de datos ficticio y determinista para el recomendador de programas de ciencia y tecnología de una escuela: registros de estudiantes con una etiqueta de grupo (Hillside/Riverside), características relevantes, una característica sustituta engañosa de \"cerca del plantel\", una representación despareja entre grupos y un conjunto de prueba apartado. Sin datos reales ni personales.",
              columns: [
                "Grupo",
                "Características",
                "Característica sustituta",
                "¿Buen encaje?",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responde esto para comprobar que sabes detectar sesgos, leer resultados por grupo y juzgar la justicia.",
            questions: [
              {
                prompt: "¿De dónde viene con más frecuencia el sesgo en un sistema de IA?",
                explanation: "Una computadora no tiene opiniones; el sesgo casi siempre se rastrea hasta unos ejemplos desparejos en los datos de entrenamiento.",
                choices: [
                  {
                    text: "La computadora decide que un grupo no le agrada.",
                    explanation: "El software no tiene simpatías ni antipatías; solo refleja los patrones de sus datos.",
                  },
                  {
                    text: "Los ejemplos de los que aprendió estaban desparejos, así que aprendió mejor unos grupos que otros.",
                    explanation: "Correcto: la representación despareja en los datos es la fuente más común de sesgo.",
                  },
                  {
                    text: "La computadora es demasiado lenta.",
                    explanation: "La velocidad no tiene nada que ver con que un sistema tenga sesgo.",
                  },
                  {
                    text: "El sesgo solo ocurre cuando alguien hackea el sistema.",
                    explanation: "El sesgo suele venir de datos desparejos y corrientes, no de un hackeo.",
                  },
                ],
              },
              {
                prompt: "Decide si la afirmación es verdadera o falsa.",
                statement: "Un solo número de exactitud general basta para demostrar que un sistema es justo con todos los grupos.",
                explanation: "Un solo número es un promedio que puede esconder malos resultados con un grupo más pequeño; para juzgar la justicia hacen falta resultados por grupo.",
              },
              {
                prompt: "Con base en los resultados por grupo, ¿cuál es el siguiente paso más razonable?",
                scenario: "Una app de fotos reporta 90 por ciento de exactitud general. Desglosada por grupo, es del 95 por ciento con personas adultas y del 70 por ciento con niños. El conjunto de entrenamiento tenía muy pocas fotos de niños.",
                explanation: "La baja calificación con niños coincide con que había muy pocos ejemplos de niños, así que la solución justa es reunir más ejemplos de niños y volver a probar.",
                choices: [
                  {
                    text: "Lanzarla, porque 90 por ciento en general es suficiente.",
                    explanation: "El promedio del 90 por ciento esconde que el sistema funciona mal con los niños.",
                  },
                  {
                    text: "Reunir más fotos de niños para equilibrar los datos, y luego volver a probar.",
                    explanation: "Correcto: una representación más equilibrada ataca directamente la causa de la diferencia.",
                  },
                  {
                    text: "Borrar las fotos de personas adultas para que los números coincidan.",
                    explanation: "Tirar datos buenos no ayuda a los niños y debilita el sistema para todo el mundo.",
                  },
                  {
                    text: "Nada, porque las computadoras no pueden tener sesgos.",
                    explanation: "La diferencia por grupo es evidencia clara de un sesgo que hay que atender.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Diseña un conjunto de datos más justo",
            prompt: "Elige una tarea sencilla de IA y planea un conjunto de datos que sería justo entre grupos, antes de entrenar ningún modelo.",
            steps: [
              "Elige una tarea, como leer escritura a mano o reconocer mascotas.",
              "Enumera los grupos con los que el sistema debería funcionar bien.",
              "Decide más o menos cuántos ejemplos necesita cada grupo para que ninguno quede subrepresentado.",
              "Escribe cómo revisarías el resultado con una exactitud por grupo, y no solo con un promedio general.",
            ],
            successCriteria: [
              "Se nombran al menos tres grupos a los que el sistema debería servir.",
              "Un plan le da a cada grupo suficientes ejemplos para evitar la subrepresentación.",
              "El plan revisa la justicia usando resultados por grupo.",
            ],
          },
          reflection: [
            {
              prompt: "Piensa en una herramienta que uses y que podría funcionar mejor con unas personas que con otras. ¿De quién podrían faltar ejemplos en sus datos?",
            },
            {
              prompt: "¿Por qué un sistema puede parecer justo cuando solo lees su calificación general, y ser injusto cuando lees sus resultados por grupo?",
            },
          ],
          recap: {
            summary: "El sesgo suele venir de una representación despareja, y solo los resultados por grupo revelan si un sistema es justo con todos los grupos.",
            keyPoints: [
              "El sesgo significa que un sistema funciona de forma habitual mejor con unos grupos que con otros, normalmente por sus ejemplos.",
              "Los grupos subrepresentados suelen recibir más errores, porque el modelo vio menos de ellos.",
              "Una sola calificación general puede esconder una diferencia real; los resultados por grupo muestran con quién funciona el sistema.",
              "La justicia es un juicio humano sobre si una diferencia es aceptable y cómo corregirla.",
            ],
          },
          extension: {
            title: "Cuando una exactitud igual sigue sin ser justa",
            body: [
              "A veces dos grupos tienen la misma exactitud, pero los errores pesan más para uno de ellos. Imagina un sistema que marca libros de la biblioteca como \"atrasados\". Una marca equivocada podría ser una molestia menor para un grupo, pero impedirle a otro grupo pedir libros prestados del todo.",
              "Elige una decisión que podría tomar una IA y describe un caso en el que una exactitud igual entre grupos aun así lleve a un resultado injusto, porque el costo de un error no es igual. ¿Qué información adicional necesitarías para darte cuenta de eso?",
            ],
          },
        },
        {
          title: "Protege la privacidad y minimiza los datos",
          summary: "Aprende qué cuenta como datos personales, por qué importa el consentimiento, y cómo la minimización de datos deja funcionando una función de IA recopilando muchísimo menos sobre las personas.",
          estimatedTime: "45-55 minutos",
          objectives: [
            {
              text: "Definir privacidad y datos personales y dar ejemplos de cada uno.",
            },
            {
              text: "Explicar qué significa el consentimiento y por qué tiene que ser informado.",
            },
            {
              text: "Aplicar la minimización de datos para quedarse solo con los datos que una función de verdad necesita.",
            },
            {
              text: "Rediseñar una función descrita para que recopile menos datos personales.",
            },
          ],
          materials: [
            {
              name: "Esta lección en un navegador web",
            },
            {
              name: "Papel y lápiz, o una app de notas",
            },
          ],
          vocabulary: [
            {
              term: "Privacidad",
              definition: "El derecho de una persona a controlar quién puede ver y usar información sobre ella.",
            },
            {
              term: "Datos personales",
              definition: "Cualquier información que sea sobre una persona en particular, como un nombre, una dirección, una ubicación exacta, una fecha de nacimiento, una foto o unos mensajes.",
            },
            {
              term: "Consentimiento",
              definition: "Que una persona acepte con claridad que se recopilen o se usen sus datos, después de que se le explique en palabras sencillas qué va a pasar con ellos.",
            },
            {
              term: "Minimización de datos",
              definition: "Recopilar y guardar solo los datos que una función de verdad necesita para funcionar, y nada más.",
            },
          ],
          openingScenario: {
            prompt: "Una app de linterna gratuita te pide ver tus contactos, tu ubicación exacta y tus fotos antes de encender la luz. Una linterna solo necesita controlar la luz. ¿Por qué una app pediría muchísimos más datos de los que su trabajo requiere?",
            context: "Guarda tu respuesta: al final vas a poder rediseñar una función para que deje de recopilar de más.",
          },
          predictionPrompt: {
            prompt: "Predice: para que una app del clima te muestre el pronóstico de hoy, ¿qué basta: tu ciudad, o tu dirección exacta y todo tu historial de ubicaciones?",
            howToCheck: "Mientras lees sobre la minimización de datos, decide cuál es el dato más pequeño que aun así le permite a la función hacer su trabajo.",
          },
          concepts: [
            {
              title: "Privacidad y datos personales: qué hay que proteger",
              body: [
                "La privacidad es tu derecho a controlar quién puede ver y usar información sobre ti. Los datos personales son cualquier información que sea sobre una persona en particular: un nombre, una dirección, una ubicación exacta, una fecha de nacimiento, la foto de un rostro o mensajes privados.",
                "No todos los datos son personales. \"El martes llovió\" no es sobre nadie en particular. Pero \"Ana estaba en el parque a las 4:00\" sí es un dato personal, porque le dice algo a alguien sobre una persona concreta. Las funciones de IA muchas veces trabajan con datos personales, y por eso justo aquí importa la privacidad.",
              ],
              examples: [
                "Datos personales: nombre completo, domicilio, ubicación GPS exacta, foto del rostro.",
                "Normalmente no personales: el clima actual, el horario de un camión público.",
                "Datos personales sensibles: información de salud, mensajes privados.",
              ],
            },
            {
              title: "El consentimiento es un sí informado, no un sí escondido",
              body: [
                "El consentimiento es que una persona acepte con claridad que se recopilen o se usen sus datos. Para que el consentimiento sea real, tiene que ser informado: a la persona se le dice, en palabras sencillas, qué datos se toman y para qué se usan, y puede decir que no.",
                "Un consentimiento enterrado en letra chiquita, en casillas ya marcadas o en una ventana confusa no es un consentimiento real, porque la persona nunca entendió de verdad ni eligió libremente. Un buen diseño pregunta con claridad y hace que decir \"no\" sea una opción fácil y segura.",
              ],
              examples: [
                "Consentimiento claro: \"¿Compartir tu ubicación para mostrarte las paradas cercanas? Sí / No\".",
                "No es consentimiento real: un contrato larguísimo que esconde en el párrafo 40 que se comparten datos.",
                "No es consentimiento real: una app que no funciona a menos que permitas un rastreo que no tiene nada que ver.",
              ],
            },
            {
              title: "Minimización de datos: recopila solo lo que el trabajo necesita",
              body: [
                "La minimización de datos es una regla sencilla y muy potente: recopila y guarda solo los datos que una función de verdad necesita para funcionar. Si una función puede hacer su trabajo con menos, debería hacerlo. Los datos que nunca recopilas no se pueden filtrar, ni usar mal, ni caer en manos equivocadas.",
                "Para minimizar, pregúntate por cada dato: \"¿la función de verdad necesita esto para funcionar?\". Un pronóstico del clima necesita tu zona general, no tu dirección exacta ni todo tu historial de ubicaciones. Recortar los datos de más mantiene útil la función y baja el riesgo para las personas.",
              ],
              examples: [
                "Un pronóstico que usa tu ciudad en lugar de tu recorrido exacto por GPS.",
                "Un contador de pasos que guarda el total de hoy, no todos los lugares por donde caminaste.",
                "Un registro que pide un apodo en lugar de tu nombre legal completo.",
              ],
            },
            {
              title: "Menos datos, el mismo trabajo: la minimización en la práctica",
              body: [
                "Minimizar no significa romper la función. Casi todas las funciones se pueden rediseñar para necesitar menos, usando una versión más amplia o de vida más corta del dato. En lugar de una ubicación exacta, usa una zona general. En lugar de guardar los datos para siempre, bórralos cuando la tarea termine.",
                "Esta es una decisión de diseño que toman personas. Cuando construyas o juzgues una función de IA, puedes insistir en la versión que recopile la menor cantidad de datos personales sin dejar de hacer su trabajo: eso es respetar la privacidad por diseño, no por accidente.",
              ],
              examples: [
                "Convertir \"dirección exacta\" en \"ciudad\" para una función del clima.",
                "Convertir \"guardar para siempre\" en \"borrar cuando termine el viaje\" para una ruta en un mapa.",
                "Convertir \"nombre real y fecha de nacimiento\" en \"solo apodo\" para la tabla de puntajes de un juego.",
              ],
            },
          ],
          workedExample: {
            title: "Minimizar la función de rastreo del camión escolar",
            steps: [
              "Nombra el trabajo de la función. Avisarle a un estudiante cuando su camión esté a unos cinco minutos, para que pueda ir a la parada.",
              "Enumera lo que podría recopilar una versión descuidada. La ubicación GPS exacta del estudiante todo el día, su nombre completo, su domicilio y todo su historial de ubicaciones.",
              "Hazte la pregunta de minimización para cada dato. Para avisar \"el camión está cerca de tu parada\", la función necesita la única parada que usa el estudiante, no un día entero de rastreo.",
              "Rediseña con menos. Deja que el estudiante elija su parada de una lista. Guarda solo esa parada, y compárala con la ubicación del camión únicamente mientras el camión está en ruta.",
              "Revisa el consentimiento. Pregunta con claridad: \"¿Te avisamos cuando el camión se acerque a tu parada? Sí / No\", y asegúrate de que el estudiante y su familia lo entiendan y puedan negarse.",
            ],
            takeaway: "Parte del trabajo real de la función, y luego quédate solo con el dato más pequeño que aun así haga ese trabajo, y pídelo con un consentimiento claro.",
          },
          visuals: [
            {
              title: "Rediseñar una función para que recopile menos",
              summary: "Una comparación de antes y después de una función de rastreo de camión escolar. Antes (recopilando de más): guarda la ubicación exacta del estudiante todo el día, su nombre legal completo, su domicilio y todo su historial de ubicaciones, conservado para siempre. Después (minimizada): guarda solo la parada de camión que el estudiante eligió, la compara con la ubicación del camión únicamente mientras el camión está en ruta, y la borra al final del día. La versión de \"después\" hace el mismo trabajo, avisarle al estudiante cuando el camión está cerca, guardando muchísimos menos datos personales.",
              caption: "El mismo trabajo, muchísimos menos datos personales: el diseño minimizado baja el riesgo para el estudiante.",
            },
            {
              title: "¿La función de verdad lo necesita?",
              summary: "Una tabla que pone a prueba cada dato que podría pedir una función del clima, según si de verdad hace falta. Zona general o ciudad: hace falta, porque el pronóstico es local. Dirección GPS exacta: no hace falta, con la ciudad basta. Historial completo de ubicaciones: no hace falta, solo importa la zona actual. Lista de contactos: no hace falta, no tiene nada que ver con el clima. La regla práctica es quedarse solo con las filas marcadas como \"hace falta\".",
              table: {
                columns: [
                  "Dato solicitado",
                  "¿Hace falta para un pronóstico local?",
                  "¿Conservarlo?",
                ],
                rows: [
                  [
                    "Zona general o ciudad",
                    "Sí, el pronóstico es local",
                    "Conservar",
                  ],
                  [
                    "Dirección GPS exacta",
                    "No, con la ciudad basta",
                    "Descartar",
                  ],
                  [
                    "Historial completo de ubicaciones",
                    "No, solo importa la zona actual",
                    "Descartar",
                  ],
                  [
                    "Lista de contactos",
                    "No, no tiene relación con el clima",
                    "Descartar",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "Laboratorio de privacidad y minimización de datos",
            goal: "Para varias apps ficticias, clasificar cada campo de datos como obligatorio, útil, innecesario o demasiado sensible, y luego compararlo con orientaciones sobre alternativas más seguras, consentimiento y cuánto tiempo conservar los datos.",
            overview: "Elige una app ficticia (recomendador de libros, recordatorio de eventos, ayudante de reciclaje, planeador de estudio o guía de museo) y ve campo por campo (nombre de pila, fecha de nacimiento exacta, rango de edad, ubicación exacta, grabación de voz, foto, identificador del dispositivo y más) decidiendo si es obligatorio, útil pero opcional, innecesario o demasiado sensible para ese propósito. Revela las orientaciones para ver por qué cada campo puede hacer falta o no, una alternativa más segura, si se necesita consentimiento, cuánto tiempo conservarlo, y si procesarlo en el propio dispositivo baja el riesgo. La meta es la minimización de datos: recopilar solo lo que de verdad hace falta. No se ingresa nada personal; las apps y los campos vienen incluidos.",
            steps: [
              "Elige una app y lee para qué sirve.",
              "Clasifica cada campo de datos: obligatorio, útil, innecesario o demasiado sensible.",
              "Revela las orientaciones y compara, leyendo la alternativa más segura, el consentimiento y el tiempo de conservación de cada uno.",
              "Fíjate en cómo un mismo campo puede ser obligatorio para una app e innecesario para otra.",
            ],
            materials: [
              "El laboratorio de privacidad incluido en esta actividad",
            ],
            successCriteria: [
              "Todos los campos quedan clasificados para al menos una app.",
              "Se reconocen los campos innecesarios y los demasiado sensibles (minimización de datos).",
              "Se leen las alternativas más seguras, las necesidades de consentimiento y las orientaciones de conservación.",
            ],
            dataset: {
              name: "Escenarios de apps y campos de datos",
              description: "Cinco escenarios de apps ficticias incluidos y trece campos de datos posibles, cada uno con una clave de respuestas escrita (clasificación recomendada, por qué, alternativa más segura, consentimiento, conservación, procesamiento en el dispositivo). No se ingresa ningún dato personal real.",
              columns: [
                null,
                "Campo de datos",
                "Clasificación",
                "Alternativa más segura",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responde esto para comprobar que entiendes los datos personales, el consentimiento y la minimización de datos.",
            questions: [
              {
                prompt: "¿Cuáles de estos cuentan como datos personales? Elige todos los que correspondan.",
                explanation: "Los datos personales son información sobre una persona en particular; el horario público de un camión no es sobre nadie en particular.",
                choices: [
                  {
                    text: "El domicilio de una persona",
                    explanation: "Correcto: un domicilio es información sobre una persona concreta.",
                  },
                  {
                    text: "Una foto donde se ve el rostro de alguien",
                    explanation: "Correcto: la foto de un rostro identifica a una persona en particular, así que es un dato personal.",
                  },
                  {
                    text: "El horario público de los camiones de una ciudad",
                    explanation: "Un horario público no es sobre nadie en particular, así que no es un dato personal.",
                  },
                  {
                    text: "La ubicación exacta de una persona en este momento",
                    explanation: "Correcto: una ubicación exacta dice dónde está una persona concreta, así que es un dato personal.",
                  },
                ],
              },
              {
                prompt: "¿Qué opción sigue mejor la minimización de datos?",
                scenario: "Una app de juego de preguntas necesita un nombre para mostrar en la lista de puntajes. Ofrece tres opciones de qué recopilar de cada jugador.",
                explanation: "La tabla de puntajes solo necesita un nombre para mostrar, así que un apodo es el dato personal más pequeño que aun así hace el trabajo.",
                choices: [
                  {
                    text: "Recopilar un apodo que el jugador escriba.",
                    explanation: "Correcto: un apodo hace el trabajo con la menor cantidad de datos personales.",
                  },
                  {
                    text: "Recopilar el nombre legal completo y la fecha de nacimiento del jugador.",
                    explanation: "La tabla de puntajes no necesita un nombre legal ni una fecha de nacimiento, así que esto recopila de más.",
                  },
                  {
                    text: "Recopilar también los contactos y la ubicación del jugador.",
                    explanation: "Los contactos y la ubicación no tienen nada que ver con mostrar un puntaje, así que esto es muchísimo más de lo necesario.",
                  },
                ],
              },
              {
                prompt: "Decide si la afirmación es verdadera o falsa.",
                statement: "Esconder un acuerdo para compartir datos en letra chiquita, donde es poco probable que la gente lo lea, sigue contando como un consentimiento real e informado.",
                explanation: "Un consentimiento informado significa que a la persona se le explica con claridad y puede elegir libremente; compartir datos escondido en letra chiquita no es consentimiento informado.",
              },
            ],
          },
          challenge: {
            title: "Minimiza una función que uses",
            prompt: "Elige una función común de alguna app y rediséñala para que recopile la menor cantidad de datos personales sin dejar de funcionar.",
            steps: [
              "Describe la función y su trabajo real en una oración.",
              "Enumera los datos personales que podría recopilar.",
              "Tacha todo lo que el trabajo no necesita de verdad.",
              "Escribe la versión minimizada y una pregunta de consentimiento clara para ella.",
            ],
            successCriteria: [
              "El trabajo de la función queda enunciado con claridad.",
              "Se quita al menos un dato personal innecesario.",
              "Se escribe una pregunta de consentimiento clara, con una manera fácil de negarse.",
            ],
          },
          reflection: [
            {
              prompt: "¿Qué app de tu dispositivo crees que recopila más datos de los que su trabajo necesita? ¿Qué podría dejar de pedir?",
            },
            {
              prompt: "¿Por qué recopilar menos datos personales protege a la gente incluso si nadie llega a usarlos mal?",
            },
          ],
          recap: {
            summary: "La privacidad es controlar los datos personales; el consentimiento tiene que ser informado, y la minimización de datos deja solo lo que una función de verdad necesita.",
            keyPoints: [
              "Los datos personales son información sobre una persona en particular, como un nombre, una dirección o una ubicación exacta.",
              "Un consentimiento real es informado y se da libremente, no escondido en letra chiquita.",
              "La minimización de datos significa recopilar solo lo que la función necesita para funcionar.",
              "Los datos que nunca recopilas no se pueden filtrar ni usar mal, así que menos datos significa menos riesgo.",
            ],
          },
          extension: {
            title: "La compensación detrás de las apps \"gratis\"",
            body: [
              "Muchas apps son gratis porque recopilan y usan datos sobre quienes las usan. Eso no vuelve dañina a toda app gratuita, pero sí significa que vale la pena hacerse la pregunta \"¿qué obtiene esta app de mí?\".",
              "Elige una app o un servicio gratuito y describe el posible intercambio: ¿qué obtiene la persona usuaria, y qué datos podría recopilar la empresa a cambio? ¿Cuáles de esos datos diría la minimización de datos que la app en realidad no necesita?",
            ],
          },
        },
        {
          title: "Investiga el contenido de IA y toma una decisión ética",
          summary: "Aprende a verificar contenido hecho por IA y contenido en línea buscando la fuente original, revisando el contexto y confirmando de forma independiente, y luego toma una decisión ética con supervisión humana y derecho de apelación.",
          estimatedTime: "50-60 minutos",
          objectives: [
            {
              text: "Definir deepfake y desinformación y explicar cómo pueden engañar.",
            },
            {
              text: "Verificar una afirmación buscando su fuente original y revisando el contexto.",
            },
            {
              text: "Usar la confirmación independiente de fuentes separadas y confiables.",
            },
            {
              text: "Explicar por qué las decisiones importantes de una IA necesitan supervisión humana y derecho de apelación.",
            },
          ],
          materials: [
            {
              name: "Esta lección en un navegador web",
            },
            {
              name: "Papel y lápiz, o una app de notas",
            },
          ],
          vocabulary: [
            {
              term: "Deepfake",
              definition: "Una foto, un video o un audio hecho o alterado por IA para mostrar a una persona diciendo o haciendo algo que en realidad no dijo ni hizo.",
            },
            {
              term: "Desinformación",
              definition: "Información falsa o engañosa que se difunde, sin importar si quien la comparte tiene o no la intención de engañar.",
            },
            {
              term: "Fuente original",
              definition: "El primer lugar de donde realmente salió una afirmación, una cita o una imagen, antes de que se copiara o se volviera a compartir.",
            },
            {
              term: "Contexto",
              definition: "Toda la historia alrededor (cuándo, dónde y por qué pasó algo) que le da a un hecho su significado real.",
            },
            {
              term: "Confirmación independiente",
              definition: "Comprobar una afirmación con dos o más fuentes separadas y confiables que no se copiaron entre sí.",
            },
            {
              term: "Supervisión humana",
              definition: "Que una persona revise las decisiones importantes de una IA y siga siendo responsable de ellas, en lugar de dejar que el software decida solo.",
            },
            {
              term: "Apelación",
              definition: "El derecho a pedirle a una persona que revise, y si hace falta cambie, una decisión que una IA tomó sobre ti.",
            },
          ],
          openingScenario: {
            prompt: "Un video circula en internet mostrando a una científica famosa diciendo algo escandaloso. Se ve y se oye real. Antes de creerlo o de compartirlo, ¿qué querrías comprobar primero?",
            context: "La IA ya puede crear imágenes, videos y audios falsos muy convincentes, así que \"se ve real\" ya no basta para confiar en algo.",
          },
          predictionPrompt: {
            prompt: "Predice: si la misma afirmación sorprendente aparece en cinco cuentas que todas copiaron una misma publicación, ¿eso cuenta como cinco confirmaciones independientes?",
            howToCheck: "Mientras lees sobre la confirmación independiente, decide si las copias de una sola fuente cuentan como confirmaciones separadas.",
          },
          concepts: [
            {
              title: "Deepfakes y desinformación: por qué \"se ve real\" no es prueba",
              body: [
                "Un deepfake es una foto, un video o un audio que la IA creó o alteró para mostrar a una persona diciendo o haciendo algo que nunca hizo. Como la IA es cada vez mejor en esto, un video puede verse y sonar convincente y aun así ser falso.",
                "La desinformación es información falsa o engañosa que se difunde. No siempre es un deepfake, y quien la comparte no siempre quiere engañar: una foto real puede circular con un pie de foto falso. En cualquier caso, la solución es la misma: no confíes en algo solo porque se ve real o porque mucha gente lo compartió.",
              ],
              examples: [
                "Un video en el que la IA alteró la boca y la voz de una persona para falsificar una cita.",
                "Una foto vieja y real que se vuelve a compartir con la afirmación falsa de que pasó hoy.",
                "Una \"estadística\" inventada, repetida tantas veces que empieza a sentirse verdadera.",
              ],
            },
            {
              title: "Busca la fuente original y revisa el contexto",
              body: [
                "Para verificar una afirmación, rastréala hasta su fuente original: el primer lugar de donde realmente salió, antes de que se copiara y se volviera a compartir. Una captura de pantalla de una cita no es la fuente; el artículo, el video o la página oficial de verdad sí lo son. Si no puedes encontrar ninguna fuente original, eso es una señal de alerta.",
                "Después revisa el contexto: cuándo, dónde y por qué pasó. Una foto real puede ser engañosa si es vieja, si es de otro lugar o si le falta la historia alrededor. El contexto es lo que convierte un dato suelto en un dato honesto.",
              ],
              examples: [
                "Rastrear una cita hasta la entrevista completa de la que se recortó.",
                "Descubrir que una foto de \"última hora\" es en realidad de un evento de hace años.",
                "Leer la declaración completa y ver que una cita quedó cortada a la mitad.",
              ],
            },
            {
              title: "Confirmación independiente: fuentes separadas, no ecos",
              body: [
                "Una sola fuente puede equivocarse, así que las afirmaciones fuertes necesitan confirmación independiente: dos o más fuentes separadas y confiables que no se copiaron entre sí. Diez cuentas volviendo a compartir la misma publicación siguen siendo una sola fuente haciendo eco, no diez confirmaciones.",
                "Para confirmar de forma independiente, busca reportes o registros que hayan llegado a la afirmación por su cuenta: otro medio de comunicación, una página oficial, una persona experta. Si fuentes independientes coinciden, es mucho más probable que la afirmación sea cierta. Si solo una fuente la tiene, mantente cauteloso.",
              ],
              examples: [
                "Dos medios de comunicación distintos que cada uno reportó la historia por su cuenta.",
                "La página propia de una organización oficial confirmando su propio anuncio.",
                "Darse cuenta de que cinco \"fuentes\" enlazan todas a la misma publicación.",
              ],
            },
            {
              title: "Supervisión humana y derecho de apelación",
              body: [
                "La IA puede ayudar a marcar posibles falsificaciones o a ordenar información, pero comete errores, así que las decisiones importantes necesitan supervisión humana: una persona que revise la decisión y siga siendo responsable de ella. Esto importa sobre todo cuando una decisión afecta la vida de alguien, como marcar una publicación como falsa, calificar un trabajo o bloquear una cuenta.",
                "Las personas afectadas por una decisión de una IA también deberían tener derecho de apelación: poder pedirle a un ser humano que revise la decisión y la cambie si la IA se equivocó. La supervisión y la apelación son la forma de mantener a las personas, y no al software, al mando de las decisiones que importan.",
              ],
              examples: [
                "Una persona revisando las publicaciones que marcó una IA antes de que se elimine alguna.",
                "Un estudiante pidiéndole a su maestra que vuelva a revisar una respuesta calificada por una IA.",
                "Una persona usuaria apelando ante un humano después de que una IA bloqueó su cuenta por error.",
              ],
            },
          ],
          workedExample: {
            title: "Investigar un video viral escandaloso",
            steps: [
              "Detente antes de compartir. El video es sorprendente y emotivo, y ese es justo el momento en que la desinformación se difunde más rápido.",
              "Busca la fuente original. Busca el video completo o la declaración oficial, no solo el fragmento corto que alguien volvió a publicar.",
              "Revisa el contexto. Nota que el fragmento se recortó de una charla más larga en la que la persona decía lo contrario; la cita se sacó de contexto.",
              "Confirma de forma independiente. Busca una fuente separada y confiable. Ningún medio independiente reporta la afirmación escandalosa, lo que es una fuerte señal de que no es real.",
              "Decide con supervisión y apelación. Como hay mucho en juego, es una persona moderadora, y no la IA sola, quien lo revisa y lo etiqueta como engañoso, y quien lo publicó puede apelar si tiene evidencia real.",
            ],
            takeaway: "Verifica por fuente y contexto, confirma de forma independiente, y mantén a una persona al mando con una vía de apelación antes de actuar frente a una afirmación seria.",
          },
          visuals: [
            {
              title: "Una lista de verificación para el contenido en línea",
              summary: "Un flujo de cuatro pasos para revisar una afirmación antes de creerla o compartirla. Paso 1: busca la fuente original (el primer lugar de donde salió, no una captura de pantalla). Paso 2: revisa el contexto (cuándo, dónde y por qué pasó). Paso 3: confirma de forma independiente (dos o más fuentes separadas y confiables que no se copiaron entre sí). Paso 4: decide con supervisión humana y conserva un derecho de apelación. Si algún paso falla, no lo compartas como cierto.",
              caption: "Sigue los cuatro pasos en orden; una afirmación que falla en un paso no debería compartirse como cierta.",
            },
            {
              title: "Confirmación real frente a un eco",
              summary: "Una tabla que distingue una confirmación independiente real del eco de una sola fuente. Cinco veces compartida la misma publicación original: no es independiente, porque todo se remonta a una sola fuente. Dos medios de comunicación distintos reportando por su cuenta: sí es independiente, porque llegaron a la afirmación por separado. Una organización oficial confirmando su propia noticia: independiente y confiable. Una sola cuenta anónima sin fuente: no es confirmación, trátala con cautela.",
              table: {
                columns: [
                  "Lo que encontraste",
                  "¿Es confirmación independiente?",
                ],
                rows: [
                  [
                    "Cinco veces compartida la misma publicación original",
                    "No, una sola fuente haciendo eco",
                  ],
                  [
                    "Dos medios de comunicación distintos, cada uno reportando por su cuenta",
                    "Sí, es independiente",
                  ],
                  [
                    "Una organización oficial confirmando su propia noticia",
                    "Sí, fuente confiable",
                  ],
                  [
                    "Una sola cuenta anónima sin ninguna fuente enlazada",
                    "No, verifica antes de confiar",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "Investigación de contenido y decisión ética",
            goal: "Investigar publicaciones ficticias usando evidencia de fuente y contexto, y luego actuar como comité de ética frente a sistemas de IA propuestos y diseñar un proceso de apelación.",
            overview: "Parte 1: investiga una colección de publicaciones ficticias: una ilustración hecha por IA y etiquetada con honestidad, una foto real con un pie de foto engañoso, una cita inventada, una fecha falsa, una afirmación sin fuente, una afirmación con fuente confiable y una publicación en cadena que apela a las emociones. Para cada una, haz las siete comprobaciones de fuente y contexto (quién la publicó, si hay una fuente original, si la fecha es correcta, si el pie de foto coincide con el contexto, si hay evidencia, si fuentes independientes lo confirman y si apresura tus emociones) y decide si confiar, cuestionar o dejarla sin confirmar. Las \"señales\" visuales, como manos raras, se tratan como poco confiables, y la actividad no pretende detectar contenido de IA a la perfección. Parte 2: como comité de ética, evalúa seis sistemas de IA propuestos, eligiendo una decisión y unas salvaguardas, con retroalimentación basada en si tus salvaguardas van acordes con lo que está en juego, no en una única respuesta \"correcta\". Parte 3: diseña un proceso de apelación. Todo es ficticio; no se envía nada a ningún lado.",
            steps: [
              "Para cada publicación, lee las siete comprobaciones de evidencia y decide: confiar, cuestionar o dejarla sin confirmar.",
              "Compara con la recomendación y con la nota didáctica sobre fuente y contexto.",
              "Como comité de ética, elige una decisión y unas salvaguardas para un sistema de IA propuesto.",
              "Diseña un proceso de apelación: aviso, explicación, quién revisa, corrección, documentación y capacidad de anular la decisión.",
            ],
            materials: [
              "La investigación de contenido, el comité de ética y el diseñador de apelaciones incluidos en esta actividad",
            ],
            successCriteria: [
              "Las publicaciones se juzgan usando evidencia de fuente y contexto, no un truco visual.",
              "Se toma una decisión ética con salvaguardas acordes con lo que está en juego.",
              "Se diseña un proceso de apelación completo, con supervisión humana y una forma de corregir errores.",
            ],
            dataset: {
              name: "Publicaciones, escenarios de ética y diseñador de apelaciones",
              description: "Una colección incluida de ocho publicaciones ficticias (cada una con siete comprobaciones de evidencia de fuente y contexto y un veredicto recomendado), seis escenarios para el comité de ética (con lo que está en juego, los errores probables y las salvaguardas clave) y un diseñador de procesos de apelación de seis partes. Todo ficticio; sin cuentas, personas ni datos personales reales.",
              columns: [
                "Publicación / escenario",
                "Evidencia o lo que está en juego",
                "Veredicto recomendado / salvaguardas",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responde esto para comprobar que sabes verificar contenido y razonar sobre supervisión y apelación.",
            questions: [
              {
                prompt: "Ordena de forma sensata los pasos para verificar una afirmación sorprendente.",
                explanation: "Verifica buscando la fuente original, revisando su contexto, confirmando con fuentes independientes, y solo entonces decidiendo qué hacer.",
                items: [
                  {
                    text: "Buscar la fuente original de donde salió la afirmación",
                  },
                  {
                    text: "Revisar el contexto: cuándo, dónde y por qué pasó",
                  },
                  {
                    text: "Confirmarla con dos o más fuentes independientes",
                  },
                  {
                    text: "Decidir qué hacer, con una persona revisando la decisión",
                  },
                ],
              },
              {
                prompt: "¿Cuál de estas es una verdadera confirmación independiente de una afirmación?",
                explanation: "La confirmación independiente necesita fuentes separadas que hayan llegado a la afirmación por su cuenta, no copias de una sola publicación.",
                choices: [
                  {
                    text: "La misma publicación compartida por muchas cuentas",
                    explanation: "Las veces que se comparte una publicación son una sola fuente haciendo eco, no una confirmación independiente.",
                  },
                  {
                    text: "Dos fuentes separadas y confiables que cada una lo reportó por su cuenta",
                    explanation: "Correcto: unas fuentes separadas que no se copiaron entre sí sí son una confirmación independiente real.",
                  },
                  {
                    text: "Una cuenta anónima que dice \"confía en mí\"",
                    explanation: "Una sola cuenta sin nombre y sin fuente no es ninguna confirmación.",
                  },
                  {
                    text: "Que la afirmación se sienta cierta porque es sorprendente",
                    explanation: "Una sensación no es evidencia; las afirmaciones sorprendentes necesitan comprobarse todavía más.",
                  },
                ],
              },
              {
                prompt: "¿Cuál es la forma más responsable de manejar esta decisión de una IA?",
                scenario: "Una app escolar usa IA para marcar los ensayos que predice que fueron copiados. Marca el ensayo de Priya, que en realidad ella misma escribió.",
                explanation: "La IA puede equivocarse, así que una persona debería revisar la marca y Priya debería poder apelar ante un ser humano.",
                choices: [
                  {
                    text: "Ponerle cero automáticamente, porque la IA nunca se equivoca.",
                    explanation: "La IA sí comete errores, así que actuar sobre la marca sin revisión humana es injusto.",
                  },
                  {
                    text: "Que una maestra revise la marca, y dejar que Priya apele y explique.",
                    explanation: "Correcto: la supervisión humana más el derecho de apelación protegen a las personas de los errores de la IA.",
                  },
                  {
                    text: "Esconderle la marca a Priya para que no pueda reclamar.",
                    explanation: "Esconder la decisión elimina cualquier posibilidad de apelar, lo cual es injusto para Priya.",
                  },
                  {
                    text: "Borrar el ensayo para que nadie tenga que decidir.",
                    explanation: "Borrar su trabajo castiga a Priya y sigue sin darle una revisión justa.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Escribe una guía de verificación",
            prompt: "Haz una guía corta que un amigo pueda usar para comprobar si una publicación viral es confiable antes de compartirla.",
            steps: [
              "Escribe los cuatro pasos: fuente original, contexto, confirmación independiente y una revisión humana.",
              "Para cada paso, agrega una pregunta sencilla que esa persona pueda hacerse.",
              "Agrega una línea sobre cuándo una decisión necesita supervisión humana y una vía de apelación.",
            ],
            successCriteria: [
              "Los cuatro pasos de verificación aparecen en un orden claro.",
              "Cada paso tiene una pregunta sencilla y usable.",
              "La guía menciona la supervisión humana y el derecho de apelación.",
            ],
          },
          reflection: [
            {
              prompt: "Piensa en alguna vez en que algo sorprendente se difundió en línea. ¿Qué habría ayudado a la gente a comprobarlo antes de compartirlo?",
            },
            {
              prompt: "¿Por qué es importante el derecho a apelar una decisión de una IA, incluso cuando la IA suele acertar?",
            },
          ],
          recap: {
            summary: "Como la IA puede falsificar y difundir contenido convincente, verifica por fuente y contexto, confirma de forma independiente, y mantén a las personas al mando con derecho de apelación.",
            keyPoints: [
              "Los deepfakes y la desinformación significan que \"se ve real\" no es prueba.",
              "Rastrea las afirmaciones hasta la fuente original y revisa el contexto que las rodea.",
              "La confirmación independiente necesita fuentes separadas, no copias de una sola publicación.",
              "Las decisiones importantes de una IA necesitan supervisión humana y derecho de apelación.",
            ],
          },
          extension: {
            title: "Cuando la rapidez pelea contra la exactitud",
            body: [
              "En internet, ser el primero muchas veces recibe más atención que tener la razón, así que el contenido engañoso puede difundirse antes de que nadie lo verifique. Verificar con cuidado toma un tiempo que un feed veloz no recompensa.",
              "Describe una situación en la que la presión por compartir rápido choque con los pasos para verificar una afirmación. ¿Qué podría hacer una plataforma, o una persona, para que la opción correcta sea más fácil que la rápida?",
            ],
          },
        },
      ],
    },
  ],
}

const zh: DeepPartial<IntroToAiCourse> = {
  title: "人工智能入门",
  subtitle: "为期六周的课程，让 5 至 8 年级的学生弄清人工智能到底是什么、数据如何训练模型、人工智能会在哪里出错，以及如何负责任地使用它。",
  description: "通过适合这个年龄的活动，了解人工智能是什么、又是怎样运作的。探索数据如何教会一个模型，图像人工智能和文本人工智能如何工作、又在哪里失灵，以及怎样公平、安全地使用人工智能，最后在设计工作室里设计属于你自己的人工智能。无需任何编程基础。",
  gradeRange: "5 至 8 年级",
  duration: "6 周",
  estimatedTotalTime: "大约 7-9 小时",
  requirements: [
    "无需编程基础",
    "在学校的 Chromebook、平板或笔记本电脑的网页浏览器中即可运行",
    "数据集已内置，无需下载，也不用注册账号",
    "不需要摄像头或麦克风",
    "不需要提供任何个人信息",
  ],
  learningOutcomes: [
    "把人工智能与普通软件和自动化区分开来。",
    "说明样例、标签和特征如何训练模型，以及为什么数据必须均衡且标注正确。",
    "读懂模型的准确率和置信度，并解读假阳性、假阴性和混淆矩阵。",
    "描述聊天机器人、语言模型和推荐系统如何运作，以及它们会在哪里出错。",
    "检查人工智能是否存在偏见、保护隐私、核实信息，并知道什么时候必须由人来掌控。",
    "为一个真实问题设计、制作原型、测试并展示一套负责任的人工智能方案。",
  ],
  finalProjectPreview: "在第 6 周的人工智能设计工作室里，你要设计一个能帮助某个真实人群的人工智能工具：界定问题，判断人工智能是否合适，规划输入和输出，画出原型草图，写出测试用例，并说明你会如何让它保持公平、保护隐私并处于人的监督之下。",
  skills: [
    {
      label: "把人工智能与普通软件区分开",
      description: "判断一项技术是在遵循写好的规则，还是在从样例中学习规律。",
    },
    {
      label: "对数据进行推理",
      description: "使用样例、标签和特征，并判断一个数据集是否均衡、标注是否正确。",
    },
    {
      label: "评估模型",
      description: "读懂准确率、置信度和混淆矩阵，并发现假阳性、假阴性和边缘情况。",
    },
    {
      label: "理解文本人工智能与推荐系统",
      description: "解释决策树、下一段文本的预测，以及推荐和过滤气泡是如何形成的。",
    },
    {
      label: "负责任地使用人工智能",
      description: "检查偏见、保护隐私、核实来源，并知道何时需要人的监督和申诉渠道。",
    },
    {
      label: "设计人工智能方案",
      description: "界定问题，判断人工智能是否合适，规划输入和输出，制作原型，测试并展示。",
    },
  ],
  materials: {
    required: [
      {
        name: "学校的 Chromebook、平板或笔记本电脑上的网页浏览器",
        note: "无需安装。在学校配发的设备上即可运行。",
      },
      {
        name: "纸和笔，或者一个记事应用",
      },
      {
        name: "内置数据集",
        note: "已包含在课程中，无需下载，也不用注册账号。",
      },
    ],
    optional: [
      {
        name: "一台可以查看其应用的个人设备",
        note: "仅用于寻找现实中的人工智能例子；从不强制要求，也不会收集任何个人数据。",
      },
      {
        name: "打印出来的练习纸",
        note: "供更习惯在纸上做题的班级使用。",
      },
    ],
  },
  weeks: [
    {
      title: "人工智能是什么，不是什么",
      subtitle: "把人工智能与普通软件区分开，并发现身边早已存在的人工智能。",
      summary: "学生弄清人工智能到底意味着什么、它与传统程序和自动化有何不同，以及如何认出自己每天已经在用的人工智能，并始终追问：这个软件是在遵循写好的规则，还是在从样例中学习规律？",
      bigQuestion: "是什么让一样东西成为「人工智能」，而不是普通软件？",
      estimatedTime: "2.5-3 小时",
      objectives: [
        "给人工智能下定义，并把它与传统软件区分开。",
        "说明自动化与机器学习的区别。",
        "梳理输入、规则、输出和学到的规律。",
        "认出日常生活中的人工智能，以及背后的人为决定。",
      ],
      requiredConcepts: [
        "人工智能",
        "自动化",
        "传统程序",
        "机器学习",
        "输入",
        "规则",
        "输出",
        "学到的规律",
        "人工智能背后的人为决定",
      ],
      lessons: [
        {
          title: "是不是人工智能？",
          summary: "把日常技术分成人工智能和普通软件两类，并学会那个能区分它们的关键问题。",
          estimatedTime: "45-55 分钟",
          objectives: [
            {
              text: "用自己的话说明人工智能是什么意思。",
            },
            {
              text: "说出人工智能与普通（传统）软件的区别。",
            },
            {
              text: "举出三个你在日常生活中遇到的人工智能例子。",
            },
          ],
          materials: [
            {
              name: "在网页浏览器中打开的这节课",
            },
            {
              name: "纸和笔，或者一个记事应用",
            },
            {
              name: "一台你常用的设备（手机、平板、笔记本电脑），用来查看上面的应用",
              note: "用来收集你自己的例子。",
            },
          ],
          vocabulary: [
            {
              term: "人工智能（AI）",
              definition: "能完成那些通常看起来需要人类思考的任务的计算机软件，比如识别图片、理解语言或做出预测。",
            },
            {
              term: "传统程序",
              definition: "按照人写好的精确规则一步步执行的软件，对同样的输入每次都做同样的事。",
            },
            {
              term: "输入",
              definition: "你交给程序的信息，比如一张照片、一句话，或者按下一个按钮。",
            },
            {
              term: "输出",
              definition: "程序返回的结果，比如一个答案、一个标签或一个动作。",
            },
          ],
          openingScenario: {
            prompt: "计算器会做加法。相册应用能找出你家狗狗的每一张照片。两者都是软件。它们当中有哪个算「人工智能」吗？你要怎么判断？",
            context: "记住你的第一个答案，课程结束时你会回来核对它。",
          },
          predictionPrompt: {
            prompt: "预测一下：计算器、垃圾邮件过滤器、电灯开关和语音助手，你觉得哪些用到了人工智能？",
            howToCheck: "读下面的概念时，判断每一个究竟只是在遵循固定规则，还是在从样例中学习规律。",
          },
          concepts: [
            {
              title: "「人工智能」到底是什么意思",
              body: [
                "人工智能是能完成那些通常看起来需要人类思考的工作的软件，比如在照片里分辨猫和狗、听懂一句问话，或者猜出你可能喜欢哪部电影。",
                "「人工」的意思是由人制造，「智能」指的则是那些类似思考的任务。人工智能不是一具机器人身体，也不是活的。它就是一个在计算机上运行的程序。",
              ],
              misconception: "机器人和人工智能不是一回事。很多机器人只是照着固定指令做事，而许多人工智能（比如垃圾邮件过滤器）根本没有身体。",
              examples: [
                "认出你的脸就解锁的手机",
                "把你说的话变成文字的应用",
                "推荐你接下来看什么的视频网站",
              ],
            },
            {
              title: "传统软件遵循精确的规则",
              body: [
                "大多数软件都是传统程序：有人写下了精确的规则，计算机每次都照着同样的方式执行。计算器对 2 + 2 永远给出 4，因为有人把这条规则编写了进去。",
                "传统程序是可预测的。只要你知道输入和规则，就能知道输出。没人需要给计算器看成千上万个加法的例子，那条规则是直接写进去的。",
              ],
              examples: [
                "一个计算器应用",
                "你一按按钮就点亮灯泡的开关控制器",
                "在你设定的确切时间响起的闹钟",
              ],
            },
            {
              title: "人工智能学习规律，而不只是遵循写好的规则",
              body: [
                "人工智能的运作方式不一样。不是由人写下每一条规则，而是让软件看大量样例，自己从中找出规律。这就是为什么相册应用能认出一只它从没见过的狗：它从许多狗的照片里学到了狗通常长什么样。",
                "所以关键问题是：这件事是有人写了精确的规则，还是软件从样例中学到了规律？如果是从样例中学来的，那它很可能就是人工智能。",
              ],
              examples: [
                "从数百万封邮件中学会垃圾邮件长什么样的过滤器",
                "学会识别多种嗓音和口音的语音助手",
                "根据以往行程的规律预测路况的地图应用",
              ],
            },
          ],
          workedExample: {
            title: "判断：垃圾邮件过滤器算人工智能吗？",
            steps: [
              "说出输入和输出。输入：一封邮件。输出：一个标签，「垃圾邮件」或「不是垃圾邮件」。",
              "问一问：有人为每一封邮件都写了精确的规则吗？没有，可能的邮件太多了，而且发垃圾邮件的人一直在换用词。",
              "问一问：有没有给它看过样例？有，它从数百万封人们已经标记为垃圾或非垃圾的邮件中学习。",
              "因为它是从样例中学到规律，而不是遵循一条手写的固定规则，所以垃圾邮件过滤器属于人工智能。",
            ],
            takeaway: "要给一样东西分类，先找出它的输入和输出，再问它是遵循写好的规则，还是从样例中学来的。",
          },
          visuals: [
            {
              title: "软件工作的两种方式",
              summary: "从输入到输出的两条路径。传统路径：输入进入「人写好的规则」，由它产生输出。人工智能路径：输入进入「从样例中学到的规律」，由它产生输出。区别就在中间那个方框：手写的规则，还是学到的规律。",
              caption: "中间这一步，正是传统软件与人工智能的分界。",
              beforeAfter: {
                before: {
                  label: "传统软件",
                  items: [
                    "输入到达",
                    "由人写好的规则做决定",
                    "输出",
                  ],
                },
                after: {
                  items: [
                    "输入到达",
                    "由从样例中学到的规律做决定",
                    "输出",
                  ],
                },
              },
            },
            {
              title: "一眼看清：规则与学到的规律",
              summary: "一张对比表。计算器：人写好的规则，每次输出都一样，不是人工智能。垃圾邮件过滤器：从样例中学到的规律，能应付没见过的新邮件，是人工智能。电灯开关：人写好的规则，不是人工智能。语音助手：从样例中学到的规律，是人工智能。",
              table: {
                columns: [
                  "技术",
                  "它如何做决定",
                ],
                rows: [
                  [
                    "计算器",
                    "人写好的固定规则",
                  ],
                  [
                    "电灯开关",
                    "固定规则（按钮 → 灯亮）",
                  ],
                  [
                    "垃圾邮件过滤器",
                    "从样例中学到的规律",
                  ],
                  [
                    "语音助手",
                    "从样例中学到的规律",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "人工智能小侦探",
            goal: "判断每一项日常技术是否用到人工智能，并说明理由。",
            overview: "你会看到一组日常技术，把每一项归入「用了人工智能」或「普通软件」。对每一项，你都要写下输入、输出，以及你做出这个判断的那一条理由。",
            steps: [
              "对每项技术，写下它的输入和输出。",
              "问那个关键问题：是人写好的固定规则，还是从样例中学到的规律？",
              "把它归入「用了人工智能」或「普通软件」，并用一句话写出你的理由。",
              "和同伴对比，讨论你们意见不一致的那些。",
            ],
            materials: [
              "纸和笔，或者一个记事应用",
            ],
            successCriteria: [
              "每一项技术都写下了输入和输出。",
              "每个判断都有清晰理由，依据是规则还是学到的规律。",
              "你能讲清楚至少一个你觉得难判断的例子。",
            ],
            dataset: {
              name: "日常技术卡片",
              description: "一组内置的常见技术（计算器、人脸解锁、恒温器、照片搜索、拼写检查、推荐信息流等），供你分类。",
            },
          },
          knowledgeCheck: {
            instructions: "回答这些题，检验你能否把人工智能和普通软件区分开。",
            questions: [
              {
                prompt: "判断一个软件是人工智能而不是传统程序，最好的线索是什么？",
                explanation: "人工智能的定义在于它从样例中学习规律，而不是只遵循人手写的规则。",
                choices: [
                  {
                    text: "它在计算机上运行。",
                    explanation: "所有软件都在计算机上运行，所以这一点区分不了人工智能和别的东西。",
                  },
                  {
                    text: "它从大量样例中学到了规律。",
                    explanation: "正确：从样例中学习规律是人工智能的关键标志。",
                  },
                  {
                    text: "它很快。",
                    explanation: "速度决定不了一样东西是不是人工智能；计算器很快，但不是人工智能。",
                  },
                  {
                    text: "它有一块屏幕。",
                    explanation: "有没有屏幕是设备的事，和软件会不会学习无关。",
                  },
                ],
              },
              {
                prompt: "判断这句话是对还是错。",
                statement: "普通计算器是人工智能的一个例子。",
                explanation: "计算器遵循人写好的精确规则，从不从样例中学习，所以它是传统软件，不是人工智能。",
              },
              {
                prompt: "这个情景里，哪项技术用到了人工智能？",
                scenario: "玛雅把闹钟定在 7:00。她的手机还找出她在海滩上的相似照片，推送了一个「一年前的今天」相册回忆。",
                explanation: "闹钟遵循的是固定规则（7:00 响铃）。而找出相似的海滩照片需要识别图像中的规律，那才是人工智能。",
                choices: [
                  {
                    text: "闹钟在 7:00 响起",
                    explanation: "闹钟只是遵循你设定的确切时间规则，属于传统软件。",
                  },
                  {
                    text: "把相似的海滩照片归到一个回忆里",
                    explanation: "正确：判断哪些照片看起来相似，是一项依靠学到的规律的任务，所以属于人工智能。",
                  },
                  {
                    text: "两者都没有用人工智能",
                    explanation: "相册回忆确实用了人工智能来识别相似的图像。",
                  },
                ],
              },
              {
                prompt: "下面哪个机器人显示出了人工智能的迹象？",
                scenario: "机器人 A 总是沿着有人给它编好的、一模一样的方形路线行驶。机器人 B 用摄像头识别并只捡起它学会辨认的红色积木。",
                explanation: "有机器人的身体并不代表就是人工智能。机器人 A 只是在重复固定指令。机器人 B 依靠学到的规律来识别物体，那才是人工智能。",
                choices: [
                  {
                    text: "机器人 A，因为它自己会动",
                    explanation: "自己会动还不够，机器人 A 只是在重复一条固定的、事先编好的路线。",
                  },
                  {
                    text: "机器人 B，因为它能识别自己学过的物体",
                    explanation: "正确：识别学过的物体是一项机器学习任务，所以机器人 B 体现了人工智能。",
                  },
                  {
                    text: "两个都是，因为它们都是机器人",
                    explanation: "是机器人并不等于有智能；机器人 A 只是照着固定步骤做事。",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "在你的一天里找出三个人工智能",
            prompt: "自己动手，找出过去一天里你真正用过或见过的三个人工智能例子，再找一个普通软件的例子。",
            steps: [
              "列出你最近用过的三项会从样例中学习的技术。",
              "对每一项，说出它的输入和输出。",
              "再加上一个普通软件的例子，并解释它为什么不是人工智能。",
            ],
            successCriteria: [
              "三个真实的人工智能例子，每个都有输入和输出。",
              "一个普通软件的例子，并说明它不是人工智能的理由。",
            ],
          },
          reflection: [
            {
              prompt: "关于哪些技术用了人工智能、哪些没用，最让你意外的是什么？",
            },
            {
              prompt: "你一开始的预测对吗？是什么让你改变了想法？",
            },
          ],
          recap: {
            summary: "人工智能是从样例中学习规律的软件，而传统程序遵循的是人写好的精确规则。",
            keyPoints: [
              "人工智能完成的是那些看起来需要人类思考的任务，比如识别图像或语言。",
              "关键问题是：写好的规则，还是从样例中学到的规律？",
              "日常生活里处处是人工智能：人脸解锁、推荐、语音助手。",
            ],
          },
          extension: {
            title: "界线在哪里？",
            body: [
              "有些技术把两种做法混在一起。现代的邮件应用可能既用一条手写规则去拦截已知的坏地址，又用一个人工智能模型去抓从没见过的新型垃圾邮件。",
              "找一项你认为同时用到固定规则和学到的规律的技术。说明哪部分对应哪一种，以及设计者为什么可能想把两者结合起来。",
            ],
          },
        },
        {
          title: "规则与学到的规律",
          summary: "仔细看看自动化和机器学习：什么时候是人来写规则，什么时候是软件自己从样例中学习规律。",
          estimatedTime: "45-55 分钟",
          objectives: [
            {
              text: "给自动化和机器学习下定义，并把两者区分开。",
            },
            {
              text: "梳理输入、规则和输出在传统程序中是怎样运作的。",
            },
            {
              text: "说明在机器学习中，学到的规律是怎样取代手写规则的。",
            },
          ],
          materials: [
            {
              name: "在网页浏览器中打开的这节课",
            },
            {
              name: "纸和笔，或者一个记事应用",
            },
          ],
          vocabulary: [
            {
              term: "自动化",
              definition: "用固定规则让一件事自己发生，不需要人一步步去做。",
            },
            {
              term: "机器学习",
              definition: "人工智能的一种，软件从大量样例中学习规律，而不是被告知每一条规则。",
            },
            {
              term: "规则",
              definition: "人写下的精确指令，比如「如果温度低于 20 度，就打开暖气」。",
            },
            {
              term: "学到的规律",
              definition: "软件从样例中总结出的一种规律性，用来对新的输入做判断。",
            },
          ],
          openingScenario: {
            prompt: "房间温度低于 20 度时，恒温器会打开暖气。音乐应用会给你生成一份「你可能喜欢」的歌单。两者都能自己行动。它们在做同一种思考吗？",
          },
          predictionPrompt: {
            prompt: "预测一下：恒温器和歌单生成器，哪一个需要有人给它看成千上万个样例？",
            howToCheck: "读一读这些概念，判断哪一个靠固定规则运作，哪一个学到了规律。",
          },
          concepts: [
            {
              title: "自动化：靠固定规则自行运转的任务",
              body: [
                "自动化的意思是，一件事按照人设定好的规则自动发生。恒温器把供暖自动化了：「如果房间低于 20 度，就打开暖气。」没人需要去拨开关，但那条精确的规则仍然是人写下的。",
                "自动化可以非常有用，同时又不是人工智能。机器并没有在学习，它只是在忠实地重复指令。",
              ],
              examples: [
                "把房间加热到设定温度的恒温器",
                "传感器被触发就打开的自动门",
                "按定时程序运行洗涤周期的洗碗机",
              ],
            },
            {
              title: "输入、规则、输出：传统程序的样子",
              body: [
                "传统程序和简单的自动化有着同样的结构：输入进来，规则决定该做什么，输出出去。输入：房间温度。规则：低于 20 度 → 打开暖气。输出：暖气启动。",
                "因为规则是人写的，你可以预测任何输入所对应的输出。对于规则清晰又不变的任务，这非常好用。",
              ],
              examples: [
                "输入：一枚硬币；规则：检测到硬币 → 送出口香糖；输出：口香糖",
                "输入：一个密码；规则：与保存的密码一致 → 解锁；输出：已解锁",
              ],
            },
            {
              title: "机器学习：由软件自己找出规律",
              body: [
                "有些任务太杂乱，人没法把每条规则都写出来。什么规则能判断一条音乐推荐对你来说是好还是不好呢？机器学习换了个思路：给软件看大量样例，也就是你听完的歌和跳过的歌，让它学出一条能用在新歌上的规律。",
                "关键的转变在于：在机器学习里，学到的规律取代了手写的规则。人仍然要挑选样例、检查结果，但不再一条条把规则讲明白。",
              ],
              examples: [
                "从你播放和跳过的歌里学会你口味的歌单生成器",
                "从大量样本中学会字母形状的手写识别程序",
              ],
            },
          ],
          workedExample: {
            title: "规则还是学到的规律？两种给水果分类的方法",
            steps: [
              "任务：给苹果和香蕉的照片分类。",
              "规则做法：由人写下「如果形状细长且是黄色 → 香蕉，否则是苹果」。这在出现青香蕉或黄苹果之前都还管用。",
              "学习做法：给软件看数百张标注好的苹果和香蕉照片，它会学出各自的规律，包括那些难办的颜色。",
              "规则做法简单但脆弱。学习做法更能应付新奇少见的例子，这正是杂乱任务要用机器学习的原因。",
            ],
            takeaway: "规则清晰又不变时，就用固定规则；规律杂乱到没法手写出来时，就用机器学习。",
          },
          visuals: [
            {
              title: "输入、规则、输出",
              summary: "一个三步流程：输入（房间温度）→ 规则（「低于 20 度 → 打开暖气」）→ 输出（暖气启动）。这就是自动化和传统程序的结构。",
              caption: "在自动化中，中间那条规则是人写的。",
              flow: {
                nodes: [
                  {
                    label: "输入",
                    note: "房间温度",
                  },
                  {
                    label: "规则",
                    note: "低于 20 度 → 打开暖气",
                  },
                  {
                    label: "输出",
                    note: "暖气启动",
                  },
                ],
              },
            },
            {
              title: "规律从哪里来",
              summary: "之前（传统做法）：人写下规则，程序照着用。之后（机器学习）：人收集标注好的样例，软件从中学出一条规律，程序再用这条学到的规律。人的工作从写规则，变成了挑选好的样例。",
              beforeAfter: {
                before: {
                  label: "传统做法",
                  items: [
                    "人写下规则",
                    "程序遵循这条规则",
                  ],
                },
                after: {
                  label: "机器学习",
                  items: [
                    "人收集标注好的样例",
                    "软件学出一条规律",
                    "程序使用这条学到的规律",
                  ],
                },
              },
            },
          ],
          activity: {
            title: "写规则挑战",
            goal: "试着为一项任务写出固定规则，再看看固定规则会在哪里失效、学习又能在哪里帮上忙。",
            overview: "你要为一小组事物写出一步步的分类规则（例如「这个动物是鸟吗？」）。然后用一些棘手的例子来检验你的规则，并标出它们失效的地方，那正是学到的规律会做得更好的位置。",
            steps: [
              "选好任务，把你的规则写成清晰的「如果……那么……」步骤。",
              "用简单的例子，手动跑一遍你的规则。",
              "现在试试棘手的例子（企鹅、鸵鸟），标出你的规则给出错误答案的地方。",
              "写一句话：为什么从大量样例中学习会更好地应付这些情况？",
            ],
            materials: [
              "纸和笔，或者一个记事应用",
            ],
            successCriteria: [
              "至少写出三条清晰的「如果……那么……」规则。",
              "至少指出一个规则失效的棘手例子。",
              "用一句话说明为什么学到的规律更能应付杂乱的情况。",
            ],
            dataset: {
              name: "「是不是鸟」卡片",
              description: "一组内置的动物，既有简单的，也有棘手的（企鹅、蝙蝠、鸵鸟），用来检验手写的规则。",
            },
          },
          knowledgeCheck: {
            instructions: "检验你能否区分自动化和机器学习。",
            questions: [
              {
                prompt: "自动化和机器学习之间的主要区别是什么？",
                explanation: "自动化遵循人写好的固定规则；机器学习从样例中找出规律。",
                choices: [
                  {
                    text: "自动化比机器学习更快。",
                    explanation: "速度不是区别所在；两者都可能快，也都可能慢。",
                  },
                  {
                    text: "自动化遵循写好的规则；机器学习从样例中学习规律。",
                    explanation: "正确：这就是核心区别。",
                  },
                  {
                    text: "只有机器学习才用计算机。",
                    explanation: "两者都在计算机上运行。",
                  },
                  {
                    text: "它们是同一件事的两个名字。",
                    explanation: "它们并不相同：一个是规则，一个是学到的规律。",
                  },
                ],
              },
              {
                prompt: "把传统程序的各个步骤排好顺序。",
                explanation: "传统程序接收一个输入，套用一条规则，产生一个输出。",
                items: [
                  {
                    text: "一个输入到达（比如一次温度读数）",
                  },
                  {
                    text: "由人写好的一条规则决定该做什么",
                  },
                  {
                    text: "产生一个输出（比如暖气启动）",
                  },
                ],
              },
              {
                prompt: "哪项任务更适合用机器学习，而不是手写规则？",
                scenario: "你想要一个软件，它要么（A）在房间超过 27 度时打开风扇，要么（B）判断一张照片里是狗还是猫。",
                explanation: "风扇那条是清晰的固定规则。而在任意照片里分辨狗和猫，对手写规则来说太杂乱了，正适合机器学习。",
                choices: [
                  {
                    text: "超过 27 度时打开风扇",
                    explanation: "那是一条清晰的规则，自动化完全能胜任。",
                  },
                  {
                    text: "在照片里分辨狗和猫",
                    explanation: "正确：这种规律太杂乱，没法手写出来，所以适合机器学习。",
                  },
                  {
                    text: "两者都同样容易写成规则",
                    explanation: "照片那项任务很难用固定规则来概括。",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "用规则，还是用学习？",
            prompt: "想出两项任务：一项适合用固定规则解决，另一项则需要机器学习。",
            steps: [
              "描述一项人能轻松写出规则的任务。把那条规则写出来。",
              "描述一项对固定规则来说太杂乱的任务。说明为什么。",
              "对那项杂乱的任务，你会收集哪些样例来教它？",
            ],
            successCriteria: [
              "一项清晰的、基于规则的任务，并写出它的规则。",
              "一项基于学习的任务，并说明规则为什么行不通。",
              "描述教会那项杂乱任务所需要的样例。",
            ],
          },
          reflection: [
            {
              prompt: "什么时候自己写规则比用机器学习更好？",
            },
            {
              prompt: "在活动中，你手写的规则在哪里失效了？",
            },
          ],
          recap: {
            summary: "自动化重复固定规则；机器学习则针对那些杂乱到无法手写规则的任务，从样例中学习规律。",
            keyPoints: [
              "传统程序遵循「输入 → 规则 → 输出」。",
              "机器学习用学到的规律取代了手写的规则。",
              "在机器学习中，人仍然要挑选样例并检查结果。",
            ],
          },
          extension: {
            title: "谁来决定样例？",
            body: [
              "在机器学习中，系统用来学习的样例是由人挑选的。这意味着每个模型里都嵌着人为的决定：收录哪些样例，以及正确的标签是什么。",
              "想一项你会教给模型的任务。谁来挑选样例？他们的选择又可能怎样改变模型学到的东西？",
            ],
          },
        },
        {
          title: "第 1 周设备调查",
          summary: "调查你身边的设备和应用，梳理它们的输入和输出，并揭示你所依赖的人工智能功能背后的人为决定。",
          estimatedTime: "45-60 分钟",
          objectives: [
            {
              text: "调查真实的设备和应用，找出其中的人工智能功能。",
            },
            {
              text: "梳理你使用的某个人工智能功能的输入和输出。",
            },
            {
              text: "指出一个日常人工智能背后的人为决定。",
            },
          ],
          materials: [
            {
              name: "在网页浏览器中打开的这节课",
            },
            {
              name: "纸和笔，或者一个记事应用",
            },
            {
              name: "一台你常用的设备，用来查看上面的应用和设置",
              note: "不需要改动账号，也不需要提供个人数据，只要看看有哪些功能。",
            },
          ],
          vocabulary: [
            {
              term: "人工智能功能",
              definition: "应用或设备中用到人工智能的那一部分，比如照片搜索、自动补全或推荐。",
            },
            {
              term: "人为决定",
              definition: "人在打造一个人工智能时做出的选择，比如用哪些样例，或者什么才算正确答案。",
            },
            {
              term: "日常人工智能",
              definition: "你在普通日常生活中遇到的人工智能，往往不知不觉就用上了。",
            },
          ],
          openingScenario: {
            prompt: "午饭之前，你多半已经在不知不觉中用过好几个人工智能了。你觉得手机或笔记本电脑上的哪些应用里藏着人工智能功能？",
          },
          predictionPrompt: {
            prompt: "预测一下：在你最常用的那些应用和设备里，你能找出多少个人工智能功能？",
            howToCheck: "逐个调查每个应用，数一数其中有多少功能是在学习规律，而不是在遵循固定规则。",
          },
          concepts: [
            {
              title: "人工智能就藏在明处",
              body: [
                "许多应用都在悄悄使用人工智能。你的键盘会建议下一个词，你的相机会把人脸提亮，你的地图会预测到达时间，你的视频应用会替你排好下一段。这些都是在后台工作的人工智能功能。",
                "能把它们认出来是一项真本事。一旦你开始留意「学到的规律」，就会发现人工智能无处不在。",
              ],
              examples: [
                "键盘的词语建议",
                "按照片内容来搜索（「狗」「海滩」）",
                "地图应用里的预计到达时间",
              ],
            },
            {
              title: "每个人工智能功能都有输入和输出",
              body: [
                "只要说出输入和输出，你就能理解任何一个人工智能功能。自动补全：输入是你已经打出的字母，输出是建议的下一个词。照片搜索：输入是你的照片和一个搜索词，输出是匹配的图片。",
                "梳理输入和输出，能把一个神秘的功能变成你可以讲清楚、也可以质疑的东西。",
              ],
            },
            {
              title: "每个人工智能背后都有人在做决定",
              body: [
                "人工智能功能不是自己冒出来的。有人决定了它该做什么、用哪些样例来训练它，以及「正确」答案是什么样。这些人为决定塑造了人工智能的行为，也决定了它是否对所有人都好用。",
                "当一个人工智能做出令人意外或不公平的事时，往往能追溯到某个人为决定，比如当初收集了哪些样例。",
              ],
              examples: [
                "决定让自动更正去建议常用词",
                "在照片搜索模型学习期间，挑选给它看哪些照片",
              ],
            },
          ],
          workedExample: {
            title: "调查自动补全",
            steps: [
              "选定功能：键盘建议你的下一个词。",
              "输入：你到目前为止打出的字母和词。",
              "输出：一个或多个建议的下一个词。",
              "是学来的还是靠规则？它从海量文本中学到了常用词的规律，那就是人工智能。",
              "人为决定：是人挑选了它学习所用的文本，所以它才会建议某些词而不是另一些。",
            ],
            takeaway: "只要说出输入、输出，以及背后的一个人为决定，任何人工智能功能都会变得清晰起来。",
          },
          visuals: [
            {
              title: "一个日常人工智能功能的构造",
              summary: "一张带标注的人工智能功能示意图。左边：「输入」（你交给它的东西）。中间：「学到的规律」（用人挑选的样例训练而成）。右边：「输出」（它返回给你的东西）。一条注释指向中间：「人为决定：用哪些样例，什么算正确」。",
              caption: "输入和输出是看得见的；学到的规律和人为决定则藏在里面。",
            },
          ],
          activity: {
            title: "设备调查",
            goal: "调查你使用的应用和设备，记录下你找到的人工智能功能。",
            overview: "你要调查熟悉的应用和设备，列出找到的人工智能功能，并为每一个梳理出输入、输出，以及背后的一个人为决定。不需要账号、个人数据、摄像头或麦克风，你只是在描述功能而已。",
            steps: [
              "列出你最常用的应用和设备。",
              "在每一个里面，找出任何会学习规律的功能（推荐、自动补全、照片搜索、人脸提亮等等）。",
              "至少为三个功能写下输入、输出，以及背后的一个人为决定。",
              "把你最意外的发现分享给全班。",
            ],
            materials: [
              "纸和笔，或者一个记事应用",
              "一台你常用的设备（可选）",
            ],
            successCriteria: [
              "在你的应用和设备中至少找到三个人工智能功能。",
              "每一个都记录了输入、输出和一个人为决定。",
              "你能说明每个功能为什么是人工智能，而不是固定规则。",
            ],
            dataset: {
              name: "常见应用清单",
              description: "一份内置的常见应用类型清单（通讯、地图、照片、视频、音乐、浏览器），并提示人工智能功能常藏在什么地方，供手边没有设备的学习者使用。",
            },
          },
          knowledgeCheck: {
            instructions: "检验你能否调查并讲清楚日常中的人工智能。",
            questions: [
              {
                prompt: "要理解任何一个人工智能功能，你应该说出哪两样东西？",
                explanation: "说出输入和输出，就能把一个神秘的功能变成你讲得清楚的功能。",
                choices: [
                  {
                    text: "它的价格和品牌",
                    explanation: "价格和品牌说明不了这个功能是怎么运作的。",
                  },
                  {
                    text: "它的输入和输出",
                    explanation: "正确：输入和输出是理解任何人工智能功能的钥匙。",
                  },
                  {
                    text: "它的颜色和尺寸",
                    explanation: "这些描述的是设备，不是人工智能功能。",
                  },
                  {
                    text: "它的电池和屏幕",
                    explanation: "这些是硬件部件，和人工智能怎样做判断无关。",
                  },
                ],
              },
              {
                prompt: "判断这句话是对还是错。",
                statement: "人工智能的表现可以追溯到人为决定，比如它是从哪些样例中学习的。",
                explanation: "对：样例、标签以及什么算正确，都是由人决定的，这些选择塑造了人工智能的行为。",
              },
              {
                prompt: "下面哪个是日常人工智能功能的例子？",
                scenario: "在公交车上，里奥打出「图书」两个字时，手机建议了「图书馆」；而他摘下耳机时，耳机自动暂停了。",
                explanation: "词语建议是从大量文本中学到了规律，所以是人工智能功能。耳机暂停则是传感器触发的固定规则。",
                choices: [
                  {
                    text: "摘下耳机时耳机暂停",
                    explanation: "那是一条固定的传感器规则，不是学到的规律。",
                  },
                  {
                    text: "键盘建议「图书馆」",
                    explanation: "正确：词语建议是从文本中学到了规律，所以是人工智能。",
                  },
                  {
                    text: "两者都不是人工智能功能",
                    explanation: "词语建议确实是一项人工智能功能。",
                  },
                ],
              },
              {
                prompt: "在这种情况下，最诚实的判断是什么？",
                scenario: "一个朋友说某个天气应用「肯定是人工智能」。但你并不知道它用的是物理方程、从过往天气中学习的机器学习，还是两者兼有。",
                explanation: "不了解它内部是怎么运作的，你就无法确定。有些天气系统用固定方程，有些用机器学习，还有很多两者结合，所以「信息不足」才是诚实的答案。",
                choices: [
                  {
                    text: "肯定是机器学习",
                    explanation: "你无法确定，它可能用的是物理方程，而不是从样例中学习。",
                  },
                  {
                    text: "肯定是固定规则的程序",
                    explanation: "这一点你同样无法确定，它也可能在从过往天气数据中学习。",
                  },
                  {
                    text: "信息不足，无法下结论",
                    explanation: "正确：在不了解内部机制的情况下，诚实的答案就是还需要更多信息。",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "人工智能功能野外图鉴",
            prompt: "用你找到的五个人工智能功能做一本简短的「野外图鉴」，就像自然图鉴，只不过主角是人工智能。",
            steps: [
              "从你的调查里挑出五个人工智能功能。",
              "为每一个写下名称、输入、输出，以及背后的一个人为决定。",
              "按对你「最有用」到「最没用」排个序，并说明理由。",
            ],
            successCriteria: [
              "五个人工智能功能，每个都有输入、输出和一个人为决定。",
              "一个排序，并至少给出一条清晰的理由。",
            ],
          },
          reflection: [
            {
              prompt: "哪个人工智能功能是你想都不想就最依赖的？",
            },
            {
              prompt: "既然你已经能看出人工智能背后的人为决定，你想对自己用的人工智能提出哪些问题？",
            },
          ],
          recap: {
            summary: "日常人工智能无处不在；只要说出输入、输出以及背后的人为决定，你就能理解任何一个功能。",
            keyPoints: [
              "人工智能功能常常在你用的应用后台悄悄工作。",
              "每个人工智能功能都有你能说得出的输入和输出。",
              "人为决定，尤其是用了哪些样例，塑造着人工智能的行为。",
            ],
          },
          extension: {
            title: "设计一个更好的日常人工智能",
            body: [
              "挑一个你找到的日常人工智能功能，设想你可以改进它。补上哪些样例，能让它对更多人更好用？",
              "写一份简短的提案：这个功能、它存在的一个问题，以及能够解决问题的样例或人为决定。",
            ],
          },
        },
      ],
    },
    {
      title: "数据如何教会一个模型",
      subtitle: "看看样例、标签和特征是怎样变成模型学习所依据的数据的，以及为什么数据干净、均衡如此重要。",
      summary: "学生深入一个数据集，找出其中的样例、标签和特征；弄清为什么模型要用一组样例来训练、再用另一组来测试，以此衡量泛化能力和准确率；并动手修复真实的数据问题，比如重复项、错误标签和类别不均衡。",
      bigQuestion: "数据是怎样教会一个模型的？什么样的数据才足够好，值得从中学习？",
      estimatedTime: "2.5-3 小时",
      objectives: [
        "找出一个数据集中的样例、标签、特征和类别。",
        "说明规律是怎样把特征和类别联系起来的。",
        "描述为什么模型要用一组数据训练、用另一组数据测试，并给泛化和准确率下定义。",
        "找出并修复重复项、错误标签和不均衡的类别。",
      ],
      requiredConcepts: [
        "数据集",
        "样例",
        "标签",
        "特征",
        "类别",
        "规律",
        "训练",
        "测试",
        "均衡的数据",
        "重复项",
        "错误标签",
        "泛化",
        "准确率",
      ],
      lessons: [
        {
          title: "样例、标签和特征",
          summary: "打开一个数据集，认识它的组成部分：每一个样例、说明它属于哪个类别的标签，以及描述它的那些特征。",
          estimatedTime: "45-55 分钟",
          objectives: [
            {
              text: "说出数据集的各个组成部分：样例、标签和特征。",
            },
            {
              text: "读懂一张数据表，并指出一个样例、它的特征和它的标签。",
            },
            {
              text: "说明特征和标签如何帮助模型学出某个类别的规律。",
            },
          ],
          materials: [
            {
              name: "在网页浏览器中打开的这节课",
            },
            {
              name: "纸和笔，或者一个记事应用",
            },
            {
              name: "本课中内置的水果数据集",
              note: "无需下载，也不需要外部数据，它就在这里。",
            },
          ],
          vocabulary: [
            {
              term: "数据集",
              definition: "为了让模型从中学习而收集在一起的一批样例，通常以由行和列构成的表格形式呈现。",
            },
            {
              term: "样例",
              definition: "数据集中的一项，通常就是一行，比如一个水果、一张照片或一条消息。",
            },
            {
              term: "标签",
              definition: "附在样例上的正确答案，说明它属于哪个类别，比如「苹果」或「香蕉」。",
            },
            {
              term: "特征",
              definition: "描述一个样例的一条信息，比如它的颜色、重量或形状。每个特征通常是表格中的一列。",
            },
            {
              term: "类别",
              definition: "模型把样例归入的其中一组。标签就来自这份类别清单。",
            },
            {
              term: "规律",
              definition: "特征中常常与某个类别相伴出现的规律性，比如「又长又黄通常意味着香蕉」。",
            },
          ],
          openingScenario: {
            prompt: "设想一张表，每一行是一个水果。各列写着它的颜色、重量和形状，最后一列写着它是什么水果。如果把最后一列盖住，你还猜得出每个水果吗？你会看哪些信息？",
            context: "记住你的答案，这节课会给那张表的每一部分都取好名字。",
          },
          predictionPrompt: {
            prompt: "预测一下：水果表里的哪一项信息是模型要学会的「答案」，哪些又是线索？",
            howToCheck: "读概念时，把「答案」和「标签」这个词对上，把「线索」和「特征」这个词对上。",
          },
          concepts: [
            {
              title: "数据集是一张由样例组成的表",
              body: [
                "数据集是供模型学习的一批样例。最容易想象的方式就是一张表：每一行是一个样例，每一列存放关于这个样例的一类信息。",
                "如果数据集讲的是水果，那么一行可能就是一根香蕉。如果讲的是邮件，一行就是一条消息。数据集的意义，就是把大量样例汇集到一处，好让模型从中找出规律。",
              ],
              examples: [
                "一张表，每行一个水果，列有颜色、重量和形状",
                "一张表，每行一封邮件，有一列写着「垃圾邮件」或「不是垃圾邮件」",
                "一张表，每行一张照片，有一列写出照片里的动物",
              ],
            },
            {
              title: "特征负责描述；标签负责回答",
              body: [
                "在每个样例里，特征就是那些描述，也就是线索。在水果表中，颜色、重量和形状都是特征。特征通常是那些告诉你这个样例是什么样子的列。",
                "标签是这个样例的正确答案，也就是它所属的类别。对一根香蕉来说，标签就是「香蕉」。特征和标签的分工不同：特征是你要看的线索，标签是你想对上的答案。",
              ],
              examples: [
                "一个水果的特征：颜色 = 黄色，形状 = 细长，重量 = 120 克",
                "这个水果的标签：香蕉",
                "一封邮件的特征：链接很多，出现「免费」一词；标签：垃圾邮件",
              ],
            },
            {
              title: "类别，以及与之相配的规律",
              body: [
                "类别是你可以把样例归入的其中一组。如果一个数据集里只有苹果和香蕉，那么「苹果」和「香蕉」就是两个类别，而每一个标签都是其中之一。",
                "模型通过找出规律来学习：也就是特征往往与某个类别相对应的方式。从许多带标签的水果中，它可能学到「又长又黄通常意味着香蕉」以及「又圆又红通常意味着苹果」。之后，它就能只凭特征给一个从没见过的新水果贴上标签。",
              ],
              examples: [
                "类别：苹果、香蕉",
                "学到的规律：圆 + 红 → 苹果；长 + 黄 → 香蕉",
                "一个特征为又圆又红的新水果 → 模型预测为「苹果」",
              ],
            },
          ],
          workedExample: {
            title: "读懂水果数据集中的一行",
            steps: [
              "看一行：颜色 = 黄色，形状 = 细长，重量 = 120 克，水果 = 香蕉。",
              "找出样例：这一整行就是一个样例，也就是一个水果。",
              "找出特征：颜色、形状和重量就是描述它的特征。",
              "找出标签：「香蕉」就是标签，也就是这个样例的正确类别。",
              "留意规律正在成形：标注为香蕉的那些行反复出现「黄色」和「细长」，于是这些特征就成了香蕉这个类别的线索。",
            ],
            takeaway: "每个样例都是一行；它的特征是那些起描述作用的列，它的标签则是答案那一列。",
          },
          visuals: [
            {
              title: "一个标注清楚的水果数据集",
              summary: "一张小小的数据表。每一行是一个水果样例。颜色、重量和形状这三列是特征。最后一列「水果」是标签，也就是该样例的类别。第 1 行：红色，150 克，圆形，苹果。第 2 行：黄色，120 克，细长，香蕉。第 3 行：绿色，160 克，圆形，苹果。第 4 行：黄色，115 克，细长，香蕉。",
              caption: "前三列是特征；最后一列是标签。",
              table: {
                columns: [
                  "颜色",
                  "重量（克）",
                  "形状",
                  "水果（标签）",
                ],
                rows: [
                  [
                    null,
                    null,
                    "圆形",
                    "苹果",
                  ],
                  [
                    "黄色",
                    null,
                    "细长",
                    "香蕉",
                  ],
                  [
                    "绿色",
                    null,
                    "圆形",
                    "苹果",
                  ],
                  [
                    "黄色",
                    null,
                    "细长",
                    "香蕉",
                  ],
                ],
              },
            },
            {
              title: "一个样例的各个部分",
              summary: "一张关于数据集中单独一行的示意图。一个箭头指向整行，标注为「样例」。三个单元格（颜色、重量、形状）被框在一起，标注为「特征：线索」。末尾的一个单元格（水果）标注为「标签：答案」。一条注释写着：「标签指明了这个样例所属的类别。」",
              caption: "特征是描述样例的线索；标签则是它的类别。",
            },
          ],
          activity: {
            title: "数据标注工作台",
            goal: "查看一个内置的太空水果数据集，仅凭特征给每个样例贴上「安全」或「不安全」的标签，并把重复项和缺失值找出来。",
            overview: "在一张关于虚构太空水果的实时数据表里操作。每一行有八个特征：颜色、形状、质地、种子、甜度、发光程度、大小和生长地点，但还没有标签。给它们贴标签，用筛选和排序来调查，留意重复的行和缺失的值，然后把你的标签和本课的答案对照检查。",
            steps: [
              "读一读表中每个水果的特征。",
              "尽可能多地给水果贴上「安全」或「不安全」的标签。",
              "用筛选和排序找出重复的行和缺失的值。",
              "把你的标签和答案对照检查，并记下每个标签是由哪些特征决定的。",
            ],
            materials: [
              "本活动中内置的太空水果数据集",
              "可选：用来记笔记的纸和笔",
            ],
            successCriteria: [
              "大部分样例都贴上了「安全」或「不安全」的标签。",
              "借助标记和筛选功能找出了重复的行和缺失的值。",
              "标签与答案做了对照，并给出了规律的理由。",
            ],
            dataset: {
              name: "太空水果标注数据集",
              description: "一张安全的虚构太空水果表格，有八列特征和两个类别：可以安全食用、不可安全食用。其中包含一些重复的行和几处缺失值，等你去发现。不含任何真实、个人或外部数据。",
              columns: [
                "颜色",
                "形状",
                "质地",
                "生长地点",
                "种子",
                "甜度",
                "发光程度",
                "大小",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "回答这些题，检验你能否说出数据集的各个组成部分。",
            questions: [
              {
                prompt: "在水果表里，写着「苹果」或「香蕉」的那一列是……",
                explanation: "标签是每个样例的正确答案，也就是它所属的类别。",
                choices: [
                  {
                    text: "特征",
                    explanation: "特征是像颜色和重量这样起描述作用的列，不是答案。",
                  },
                  {
                    text: "标签",
                    explanation: "正确：标签就是每个样例的类别答案。",
                  },
                  {
                    text: "样例",
                    explanation: "样例是一整行，不是单独的答案列。",
                  },
                  {
                    text: "数据集",
                    explanation: "数据集是整张表，不是某一列。",
                  },
                ],
              },
              {
                prompt: "在一个水果数据集中，下面哪些是特征？选出所有符合的。",
                explanation: "特征是描述样例的那些信息。颜色、重量和形状都在描述这个水果；水果的名字则是标签。",
                choices: [
                  {
                    text: "颜色",
                    explanation: "正确：颜色描述了这个水果，所以它是特征。",
                  },
                  {
                    text: "重量",
                    explanation: "正确：重量描述了这个水果，所以它是特征。",
                  },
                  {
                    text: "形状",
                    explanation: "正确：形状描述了这个水果，所以它是特征。",
                  },
                  {
                    text: "水果的名字（苹果／香蕉）",
                    explanation: "水果的名字是标签，也就是答案，而不是起描述作用的特征。",
                  },
                ],
              },
              {
                prompt: "判断这句话是对还是错。",
                statement: "数据集中的一个样例，通常就是表格里的一行。",
                explanation: "对：每一行就是一个样例，而它的各列存放着这个样例的特征和标签。",
              },
            ],
          },
          challenge: {
            title: "设计一个属于你的小数据集",
            prompt: "为你熟悉的一组类别编一个小数据集，比如「狗还是猫」或者「工作日还是周末」。",
            steps: [
              "选定两个类别，把它们写下来作为你的标签。",
              "挑出三个有助于区分这两个类别的特征。",
              "做一张有五行样例的表，为每一行填上特征和正确的标签。",
            ],
            successCriteria: [
              "有两个清晰的类别，用作标签。",
              "挑出了三个合理的特征。",
              "有五行样例，每行都有特征和正确的标签。",
            ],
          },
          reflection: [
            {
              prompt: "在水果表里，你觉得哪个特征对区分苹果和香蕉最有用？为什么？",
            },
            {
              prompt: "你对「答案」那一列的预测正确吗？标签和特征这两个词是怎样帮你把它解释清楚的？",
            },
          ],
          recap: {
            summary: "数据集是一张由样例组成的表；每个样例都有描述它的特征和指明其类别的标签，而模型学的是把特征与类别联系起来的规律。",
            keyPoints: [
              "一个样例就是一行；特征是起描述作用的列，标签是答案那一列。",
              "类别就是那些分组；每个标签都是其中的一个类别。",
              "模型学的是把特征与某个类别联系起来的规律。",
            ],
          },
          extension: {
            title: "哪些特征才真正管用？",
            body: [
              "并不是每个特征都有用。在水果表里，「形状」和「颜色」能很好地把苹果和香蕉分开，但像「水果的采摘日期」这样的特征，多半对模型毫无帮助。",
              "看看你自己的小数据集。哪个特征在区分类别上出力最多？有没有哪个特征可以去掉而不影响规律？说说你的理由。",
            ],
          },
        },
        {
          title: "训练数据与测试数据",
          summary: "看看为什么要用一组样例来教模型、再用另一组来检验它，以及用没见过的样例来测试，是如何衡量它是否真的学到了规律的。",
          estimatedTime: "45-55 分钟",
          objectives: [
            {
              text: "说明训练数据和测试数据的区别。",
            },
            {
              text: "描述为什么必须用模型没学过的样例来测试它。",
            },
            {
              text: "给泛化和准确率下定义，并把它们和测试联系起来。",
            },
          ],
          materials: [
            {
              name: "在网页浏览器中打开的这节课",
            },
            {
              name: "纸和笔，或者一个记事应用",
            },
            {
              name: "本课中内置的动物数据集",
              note: "就在这里，无需外部数据，也不用下载。",
            },
          ],
          vocabulary: [
            {
              term: "训练",
              definition: "给模型看大量带标签的样例，让它学出把特征和某个类别联系起来的规律。",
            },
            {
              term: "测试",
              definition: "用模型没学过的、带标签的新样例来检验它，看看它究竟表现如何。",
            },
            {
              term: "训练数据",
              definition: "模型在训练过程中用来学习的那些样例。",
            },
            {
              term: "测试数据",
              definition: "另外单独的一组样例，从训练中留出来，只用于检验模型。",
            },
            {
              term: "泛化",
              definition: "模型在从未见过的新样例上表现得有多好，而不只是在它学过的那些样例上。",
            },
            {
              term: "准确率",
              definition: "模型正确标注的测试样例所占的比例，常写成分数或百分数。",
            },
          ],
          openingScenario: {
            prompt: "老师发下一张练习题，随后又出了一场小测验，题目和答案跟练习题一模一样。如果所有人都拿了 100 分，这能证明他们学会了内容吗，还是只说明他们背下了那些答案？",
            context: "记住这一点：用模型学过的那些样例去检验它，会遇到同样的问题。",
          },
          predictionPrompt: {
            prompt: "预测一下：如果你只用模型训练时用过的那些样例来测试它，得分能告诉你它面对全新样例时表现如何吗？",
            howToCheck: "读一读概念，判断一次公平的测试需要什么：见过的样例，还是没见过的样例。",
          },
          concepts: [
            {
              title: "训练：从样例中学出规律",
              body: [
                "训练是模型查看大量带标签的样例、并学出一条把特征和类别联系起来的规律的那个步骤。用于此的样例就是训练数据。",
                "在训练过程中，模型既能看到每个样例的特征，也能看到它的正确标签，因此它可以不断调整，直到自己的判断大体上与标签一致。",
              ],
              examples: [
                "给模型看 100 行带标签的动物数据，让它学出「有翅膀通常意味着鸟」",
                "把成千上万封已标记为垃圾或非垃圾的邮件喂给一个垃圾邮件过滤器",
              ],
            },
            {
              title: "测试：用没见过的样例做一次公平检验",
              body: [
                "如果你只用模型学过的那些样例来检验它，它完全可能只是复述已经背下的答案，就像一个学生被考了他练过的那张一模一样的练习题。那证明不了它学到了任何有用的东西。",
                "所以我们会留出一部分样例作为测试数据。模型绝不会用它们来训练。测试的意思，就是把模型跑在这组单独的、没见过的数据上，再把它的判断和真实标签作比较。那才是对它真正学到了什么的公平检验。",
              ],
              examples: [
                "留出 20 行动物数据；用另外 80 行训练；然后用留出的那 20 行来测试",
                "一份用来复习的练习题，和一场用来评分的单独测验",
              ],
            },
            {
              title: "泛化与准确率",
              body: [
                "泛化是指模型在从未见过的新样例上表现得有多好。泛化得好的模型，学到的是真正的规律，而不只是训练时那些具体的行。用没见过的数据来测试，正是我们衡量泛化能力的方式。",
                "准确率是这次检验的一个简单分数：在全部测试样例中，模型标注正确的占多大比例？如果它把 20 个测试动物中的 18 个标对了，准确率就是 18/20，也就是 90%。在没见过的测试数据上准确率高，才是模型真正会泛化的标志。",
              ],
              examples: [
                "20 个测试样例中对了 16 个 → 准确率 80%",
                "在训练数据上得分很高、在测试数据上得分很低的模型，没有实现泛化",
              ],
            },
          ],
          workedExample: {
            title: "把 20 个动物分成训练集和测试集",
            steps: [
              "先有一个含 20 个带标签动物的数据集（每一行都有特征，以及「是鸟」或「不是鸟」的标签）。",
              "拆分：把 15 行放进训练集，留出 5 行作为测试集。",
              "训练：只用那 15 行训练数据，让模型学出规律。",
              "测试：把留出的 5 行去掉标签给模型看，并记录它的判断。",
              "计算准确率：把它的 5 个判断和真实标签作比较。如果对了 4 个，准确率就是 4/5，也就是 80%，这衡量了它泛化得有多好。",
            ],
            takeaway: "用一部分数据训练，用留出的另一部分测试，并在没见过的那部分上计算准确率，以此判断泛化能力。",
          },
          visuals: [
            {
              title: "先拆分数据，再做检验",
              summary: "两个阶段。阶段 1（训练）：训练数据，也就是大部分行，流入模型，模型从中学出一条规律。阶段 2（测试）：留出的测试数据流入，这些数据模型从未见过；把模型的判断与真实标签比较，得出准确率。关键在于：测试用的那些行始终与训练完全分开。",
              caption: "模型从训练数据中学习，并用另外单独的测试数据来评分。",
            },
            {
              title: "同一个模型，两个分数",
              summary: "一张条形图，用百分比对比同一个模型在训练所用数据上和在没见过的测试数据上的准确率。第 1 条「在训练数据上」为 98%。第 2 条「在没见过的测试数据上」为 82%。测试分数才是衡量模型泛化能力的诚实指标；测试那条明显偏低，就是在提醒你这个模型主要是在死记硬背。",
              chart: {
                unit: "正确率（%）",
                bars: [
                  {
                    label: "在训练数据上",
                  },
                  {
                    label: "在没见过的测试数据上",
                  },
                ],
              },
            },
          ],
          activity: {
            title: "训练、测试，并改动数据",
            goal: "把一个太空水果数据集拆成训练集和测试集，运行一个透明的模型，再试验均衡、不均衡和标签错误的数据会如何改变结果。",
            overview: "把十六个太空水果分成模型用来学习的训练集，和用来检验它的测试集。这个模型是一个简单、可查看内部的最近邻分类器：它把每个测试水果与最相似的那些训练水果作比较，并采用它们中最常见的标签，同时会明确告诉你是哪些邻居决定了每一次预测。随后针对同一个留出的测试集做三组实验（均衡数据、不均衡数据、标签错误的数据），每次都先预测结果。",
            steps: [
              "先预测为什么必须对训练隐藏一部分样例，然后把水果分成训练集和测试集。",
              "运行模型，读出它的总体准确率和各类别的结果。",
              "每组实验都先预测会发生什么，再运行，然后把结果和你的预测作比较。",
              "可选（7 至 8 年级）：展开准确率的计算过程，算出「正确数 ÷ 总数」的百分比。",
            ],
            materials: [
              "本活动中内置的太空水果数据集",
              "可选：用来记笔记的纸和笔",
            ],
            successCriteria: [
              "每个水果都恰好归入一个集合，并且两个类别在测试集中都有出现。",
              "运行了模型，并读出了它的准确率和各类别的结果。",
              "每组实验都保存了预测，并把结果与预测作了比较。",
            ],
            dataset: {
              name: "太空水果训练与测试数据集",
              description: "一个安全、虚构、标注正确的太空水果数据集（安全／不安全），已拆分为训练样例和留出的测试样例，并附有均衡、不均衡和标签错误三种实验版本。不含任何真实、个人或外部数据。",
              columns: [
                "颜色",
                "形状",
                "质地",
                "生长地点",
                "种子",
                "甜度",
                "发光程度",
                "大小",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "回答这些题，检验你是否理解了训练、测试和准确率。",
            questions: [
              {
                prompt: "我们为什么要用模型没训练过的样例去测试它？",
                explanation: "用没见过的样例测试，能查明模型是学到了真正的规律，还是只是把训练数据背了下来。",
                choices: [
                  {
                    text: "为了让测试花更长时间",
                    explanation: "目的是做一次公平的检验，不是把过程拖慢。",
                  },
                  {
                    text: "为了看它是真的学会了规律，还是只背下了答案",
                    explanation: "正确：没见过的样例能揭示模型是否会泛化。",
                  },
                  {
                    text: "因为训练样例太多了",
                    explanation: "训练数据的数量不是原因；原因在于检验是否公平。",
                  },
                  {
                    text: "为了给模型出更简单的题",
                    explanation: "测试样例并不是要更简单，而是要是新的。",
                  },
                ],
              },
              {
                prompt: "谁的测验结果才是对学习成果的公平衡量？",
                scenario: "艾娃复习了一张练习题，随后被考了同一类型但全新的题目。本复习了一张练习题，随后被考了一模一样的题目，而且练习时答案就摆在他面前。",
                explanation: "艾娃被考的是新题，所以她的分数体现了真实的学习成果（泛化）。本的测验重复了练习题，所以高分也可能只是背下来的。",
                choices: [
                  {
                    text: "艾娃的，因为她的测验用的是新题",
                    explanation: "正确：用新题来考，才能衡量她是否实现了泛化。",
                  },
                  {
                    text: "本的，因为他已经看过答案了",
                    explanation: "事先看过一模一样的答案，会让他的高分很可能只是死记硬背。",
                  },
                  {
                    text: "两个都同样公平",
                    explanation: "并不相同：本的题目是重复的，这让他的结果不可靠。",
                  },
                ],
              },
              {
                prompt: "一个模型把 20 个测试样例中的 15 个标注正确。它的准确率是多少？",
                explanation: "准确率是标注正确的比例：20 个中的 15 个就是 15/20，等于 75%。",
                choices: [
                  {
                    text: "大约 75%",
                    explanation: "正确：15 除以 20 等于 0.75，也就是 75%。",
                  },
                  {
                    text: "大约 15%",
                    explanation: "15 是答对的个数，不是比例；比例是 20 个中的 15 个。",
                  },
                  {
                    text: "大约 50%",
                    explanation: "20 的一半是答对 10 个，但这个模型答对了 15 个。",
                  },
                  {
                    text: "大约 95%",
                    explanation: "20 的 95% 是答对 19 个，而不是 15 个。",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "设计一次公平的测试",
            prompt: "为一个把消息分成「是问句」或「不是问句」的模型，设计一套公平的训练与测试方案。",
            steps: [
              "决定你总共要收集多少条示例消息。",
              "选择如何把它们分成训练集和测试集，并说明理由。",
              "说明你会如何根据测试结果计算准确率。",
            ],
            successCriteria: [
              "有明确的样例总数，以及训练集与测试集的划分。",
              "说明了测试集为什么要与训练分开。",
              "正确描述了准确率的计算方式。",
            ],
          },
          reflection: [
            {
              prompt: "为什么一个模型可能在训练数据上得分极高，面对新样例却仍然失败？",
            },
            {
              prompt: "留出测试数据，和老师出一份与练习题不同的测验，两者有什么相似之处？",
            },
          ],
          recap: {
            summary: "模型用一组样例训练，再用另一组从未见过的样例测试；在那组测试数据上的准确率，衡量的是模型的泛化能力。",
            keyPoints: [
              "训练数据教会模型；测试数据检验模型。",
              "测试用的那些行必须留出来，训练时绝不能看到。",
              "泛化是指在新样例上表现良好；准确率是测试样例中标注正确的比例。",
            ],
          },
          extension: {
            title: "当训练看着很棒、测试却很糟",
            body: [
              "有时候模型在训练数据上几乎满分，在测试数据上却很差。这通常意味着它把训练数据中那些具体的行背了下来，而没有学到普遍的规律。",
              "描述一种可能发生这种情况的例子，比如一个靠精确重量把特定水果记下来的模型。你可以改变数据或划分方式中的什么，来更诚实地看清它的真实表现？",
            ],
          },
        },
        {
          title: "修复数据集",
          summary: "当一回数据侦探：揪出重复项、错误标签和不均衡的类别，把它们一一修好，让模型能学到公平又准确的规律。",
          estimatedTime: "45-60 分钟",
          objectives: [
            {
              text: "发现常见的数据问题：重复项、错误标签和不均衡的类别。",
            },
            {
              text: "说明每个问题会怎样损害模型的准确率或公平性。",
            },
            {
              text: "修复一个小数据集，让它的样例都正确、类别也均衡。",
            },
          ],
          materials: [
            {
              name: "在网页浏览器中打开的这节课",
            },
            {
              name: "纸和笔，或者一个记事应用",
            },
            {
              name: "本课中内置的那个杂乱数据集",
              note: "就在这里：无需外部数据、下载或任何个人信息。",
            },
          ],
          vocabulary: [
            {
              term: "均衡的数据",
              definition: "每个类别的样例数量都公平、大致相等的数据集，这样模型才能把每个类别都学好。",
            },
            {
              term: "重复项",
              definition: "在数据集中出现不止一次的样例，它可能让模型过度关注那个被重复的个例。",
            },
            {
              term: "错误标签",
              definition: "被标上了错误答案的样例，比如一根香蕉被标成「苹果」，这会教给模型一条假的规律。",
            },
            {
              term: "准确率",
              definition: "模型标注正确的样例所占的比例；糟糕的数据通常会把它拉低。",
            },
            {
              term: "泛化",
              definition: "模型在新样例上表现得有多好；干净、均衡的数据有助于模型泛化。",
            },
          ],
          openingScenario: {
            prompt: "一个学生正在教模型分辨苹果和香蕉。他的表里有 18 个苹果，却只有 2 根香蕉，其中一根香蕉被复制了三次，还有一个苹果被误标成了「香蕉」。当模型从这些数据中学习时，可能出什么问题？",
            context: "上完这节课，你就能说出并修好这三个问题。",
          },
          predictionPrompt: {
            prompt: "预测一下：如果一个数据集里有 18 个苹果、只有 2 根香蕉，你觉得模型会把哪个类别学得更好？为什么？",
            howToCheck: "读一读关于均衡数据的概念，看看某个类别的样例更多，是不是有助于模型学好它。",
          },
          concepts: [
            {
              title: "重复项：同一个样例被算了两次",
              body: [
                "重复项是指出现不止一次的样例。它看起来人畜无害，但一行重复的数据会让模型把这个单一个例当成许多个，从而给了它过大的分量。",
                "如果同一根香蕉出现了三次，模型可能会过度关注那根特定的香蕉，而不是学会香蕉总体上是什么样。去掉重复项，能让每个真实样例只算一次。",
              ],
              examples: [
                "表格里那一行完全相同的香蕉被复制了三次",
                "同一张照片被粘贴进数据集两次",
              ],
            },
            {
              title: "错误标签：错的答案会教出错的规律",
              body: [
                "错误标签是指被标上了错误类别的样例，比如一个苹果不小心被标成了「香蕉」。因为模型把标签当作事实来信任，一个错误的标签就会教给它一条假的规律。",
                "哪怕只有少数几个错误标签，也可能拉低准确率，因为模型在努力迎合那些本来就不对的答案。修正一个标签，就是把它改成正确的类别（如果你实在判断不出来，就把这个样例删掉）。",
              ],
              examples: [
                "一个又圆又红的水果被标成了「香蕉」",
                "动物数据集里，一张猫的照片被标成了「狗」",
              ],
            },
            {
              title: "均衡的数据：给每个类别公平的份额",
              body: [
                "数据均衡的意思是，每个类别都有公平、大致相等的样例数量。如果一个数据集有 18 个苹果、却只有 2 根香蕉，模型看到的苹果就多得多，可能几乎学不会香蕉长什么样，于是它会过于频繁地猜「苹果」。",
                "让类别变均衡，无论是收集更多香蕉样例，还是把苹果削减一些，都能帮助模型学好每一个类别、并公平地泛化。干净、正确、均衡的数据，是一个准确模型的根基。",
              ],
              examples: [
                "10 个苹果配 10 根香蕉，比 18 个苹果配 2 根香蕉均衡得多",
                "主要用某一个类别训练出来的模型，往往会过多地预测那个类别",
              ],
            },
          ],
          workedExample: {
            title: "一步步修复一张杂乱的水果表",
            steps: [
              "先看这张杂乱的表：18 个苹果、2 根香蕉，其中一行香蕉被复制了三次，还有一个苹果被标成了「香蕉」。",
              "找出重复项：那根一模一样的香蕉出现了三次，删掉两份，保留一份。",
              "修正错误标签：那个被标成「香蕉」的又圆又红的水果其实是苹果，把它的标签改成「苹果」。",
              "检查均衡：现在两个类别悬殊得厉害，于是补充更多真实的香蕉样例，直到苹果和香蕉大致相当。",
              "结果：一个干净、标注正确、类别均衡的数据集，模型可以从中学到公平的规律。",
            ],
            takeaway: "在模型学习之前，通过删除重复项、修正错误标签和让类别均衡来修复数据集。",
          },
          visuals: [
            {
              title: "均衡前后对比",
              summary: "一张条形图，按样例个数显示每个类别有多少样例。修复前：苹果 18，香蕉 2，非常不均衡。修复后：苹果 10，香蕉 10，已经均衡。让类别均衡，能给模型一个公平的机会去学会两种水果，而不是过多地预测苹果。",
              chart: {
                unit: "个样例",
                bars: [
                  {
                    label: "苹果（修复前）",
                  },
                  {
                    label: "香蕉（修复前）",
                  },
                  {
                    label: "苹果（修复后）",
                  },
                  {
                    label: "香蕉（修复后）",
                  },
                ],
              },
            },
            {
              title: "三个问题及其修复办法",
              summary: "一张表，把每个数据问题与它的修复办法和重要性对应起来。重复项：某个样例被重复；修复办法是删掉多余的副本；之所以重要，是因为它让单个个例分量过大。错误标签：某个样例的答案是错的；修复办法是把标签改正；之所以重要，是因为它教出一条假的规律。类别不均衡：某个类别的样例远多于另一个；修复办法是给较少的类别补充样例，或削减较多的那个；之所以重要，是因为模型会把稀少的那个类别学得不够。",
              table: {
                columns: [
                  "问题",
                  "如何修复",
                  "为什么重要",
                ],
                rows: [
                  [
                    "重复项",
                    "删掉多余的副本",
                    "单个个例分量过大",
                  ],
                  [
                    "错误标签",
                    "把它改成正确的类别",
                    "错误的答案会教出假的规律",
                  ],
                  [
                    "类别不均衡",
                    "给少的类别补样例，或削减多的那个",
                    "模型把稀少的类别学得不够",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "修复有缺陷的数据集",
            goal: "修好一个杂乱的太空水果数据集，删除重复项、改正错误标签、改善均衡程度，然后重新运行模型，对比修复前后的结果。",
            overview: "从一个有缺陷的太空水果训练集开始，它有重复的行、若干错误标签，而且严重偏向「安全」这一类。删掉重复项、改正标签，并补充稀少类别的样例来让它更均衡，与此同时测试用的水果始终保持隐藏且不作改动。之后检查你的成果，重新运行那个透明的模型，看一份关于数据集健康度和准确率的完整前后对比。",
            steps: [
              "查看这个有缺陷的数据集；重复的行会被自动标出来。",
              "改正看起来不对的标签，并删掉重复的副本。",
              "补充样例数量偏少那一类的样例，以改善均衡。",
              "检查你的数据集并重新运行模型，然后对比修复前后的结果。",
            ],
            materials: [
              "本活动中内置的那个有缺陷的太空水果数据集",
              "可选：用来记笔记的纸和笔",
            ],
            successCriteria: [
              "重复的行被删除，错误的标签被改正。",
              "通过补充样例，各类别变得更均衡。",
              "重新运行了模型，并对比了修复前后的准确率。",
            ],
            dataset: {
              name: "有缺陷的太空水果数据集",
              description: "一个安全、虚构的太空水果训练集，里面故意埋了一些问题：重复的行、错误的标签，以及偏向「安全」的不均衡；另外还配有一个留出的测试集和一些标注正确的备用样例可供补充。不含任何真实、个人或外部数据。",
              columns: [
                "颜色",
                "形状",
                "质地",
                "生长地点",
                "种子",
                "甜度",
                "发光程度",
                "大小",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "回答这些题，检验你能否发现并修复数据问题。",
            questions: [
              {
                prompt: "在训练模型之前，下面哪些是你应该修好的问题？选出所有符合的。",
                explanation: "重复项、错误标签和类别不均衡都会损害模型学到的东西，所以这三者都应当修复。",
                choices: [
                  {
                    text: "同一个样例重复了好几次",
                    explanation: "正确：重复项让单个个例分量过大，应当删除。",
                  },
                  {
                    text: "某个样例被标上了错误的标签",
                    explanation: "正确：错误标签会教出假的规律，应当改正。",
                  },
                  {
                    text: "某个类别的样例远多于另一个",
                    explanation: "正确：类别不均衡会让模型把稀少的那个类别学得不够。",
                  },
                  {
                    text: "表格有清晰的列名",
                    explanation: "清晰的列名是好事，不是需要修复的问题。",
                  },
                ],
              },
              {
                prompt: "判断这句话是对还是错。",
                statement: "一个有 18 个苹果、只有 2 根香蕉的数据集是很均衡的。",
                explanation: "错：数据均衡意味着每个类别的样例数量大致相等。有 18 个苹果、2 根香蕉时，模型几乎学不会香蕉。",
              },
              {
                prompt: "把修复数据集的各个步骤排成合理的顺序。",
                explanation: "先查看数据，然后删除重复项、改正错误标签，让每个样例都正确，接着让类别均衡，最后重新训练并检查准确率。",
                items: [
                  {
                    text: "查看数据集，找出其中的问题",
                  },
                  {
                    text: "删除重复的行，并改正错误的标签",
                  },
                  {
                    text: "让各个类别变得均衡",
                  },
                  {
                    text: "重新训练模型，并检查它的准确率",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "先弄坏，再修好",
            prompt: "拿一个干净的小数据集，故意把这三个问题一一加进去，然后再把它们修好，并描述效果。",
            steps: [
              "从一个干净、均衡、只有两个类别的小数据集开始。",
              "加一行重复数据，把一个标签改成错的，再删掉一些样例，让其中一个类别变得大得多。",
              "现在把这三个问题都修好，并针对每一个说明这次修复应当如何改善模型的准确率或公平性。",
            ],
            successCriteria: [
              "三个问题都被故意加入并清楚地标了出来。",
              "三个问题都被修复了。",
              "每一次修复都给出了与准确率或公平性相关的理由。",
            ],
          },
          reflection: [
            {
              prompt: "这三个数据问题中，你觉得哪一个最难被发现？为什么？",
            },
            {
              prompt: "清理并均衡数据集，和上一节课的训练与测试思路有什么联系？",
            },
          ],
          recap: {
            summary: "重复项、错误标签和类别不均衡都会损害模型；修复它们能得到干净、均衡的数据，从而提高准确率，并帮助模型公平地泛化。",
            keyPoints: [
              "删除重复项，别让任何一个样例分量过大。",
              "改正错误标签，别让模型学到假的规律。",
              "让类别均衡，好让模型学会每一类并公平地泛化。",
            ],
          },
          extension: {
            title: "当你没法收集更多数据时",
            body: [
              "通过补充稀少类别的样例来实现均衡是最理想的，但有时你没那么容易收集到更多。另一个办法是把较多的那个类别削减到数量相当，尽管这意味着要丢掉一些真实的样例。",
              "针对那张杂乱的水果表，说说你会选哪种做法（补充更多香蕉，还是删掉一些苹果），并解释每种选择在模型的准确率和公平性上各自做了什么取舍。",
            ],
          },
        },
      ],
    },
    {
      title: "图像识别与模型的错误",
      subtitle: "看看图像分类器如何把像素变成预测，衡量它的表现，并找出并修正它犯的错误。",
      summary: "学生深入图像分类：分类器如何把像素读成视觉特征、给出带置信度的预测；如何在留出的测试集上用准确率和各类别准确率来公平地衡量它；以及如何读懂混淆矩阵，找出假阳性、假阴性和边缘情况，然后用有针对性的样例来改进模型。",
      bigQuestion: "分类器是怎样把像素变成预测的？我们又该如何找出并修正它犯的错误？",
      estimatedTime: "2.5-3 小时",
      objectives: [
        "说明图像分类器如何把像素变成视觉特征、一个预测和一个置信度。",
        "在单独的测试集上用准确率和各类别准确率公平地衡量一个分类器。",
        "区分假阳性和假阴性，并找出导致它们的边缘情况。",
        "读懂混淆矩阵，并针对某个具体错误提出有针对性的改进方案。",
      ],
      requiredConcepts: [
        "像素",
        "视觉特征",
        "分类",
        "预测",
        "置信度",
        "准确率",
        "假阳性",
        "假阴性",
        "边缘情况",
        "混淆矩阵",
        "各类别准确率",
      ],
      lessons: [
        {
          title: "图像分类器是怎样工作的",
          summary: "跟着一张照片从像素走到标签，了解图像分类器如何把视觉特征变成带置信度分数的预测。",
          estimatedTime: "45-55 分钟",
          objectives: [
            {
              text: "说明图像是由像素组成的，而计算机把像素读作数字。",
            },
            {
              text: "描述分类器如何利用视觉特征做出预测。",
            },
            {
              text: "读懂置信度分数，并说出它代表什么、不代表什么。",
            },
            {
              text: "追踪一张图像走过分类器的全过程，从输入到带标签的输出。",
            },
          ],
          materials: [
            {
              name: "在网页浏览器中打开的这节课",
            },
            {
              name: "纸和笔，或者一个记事应用",
            },
            {
              name: "本课中展示的内置带标签图像集",
              note: "课程里已作说明，你不需要上传自己的任何照片。",
            },
          ],
          vocabulary: [
            {
              term: "像素",
              definition: "图像中的一个极小的点。一张图片就是一格一格的像素网格，计算机把每个像素以数字形式存下它的颜色和亮度。",
            },
            {
              term: "视觉特征",
              definition: "图片中分类器会留意的某种规律，比如边缘、颜色、形状或质地。",
            },
            {
              term: "分类",
              definition: "把某样东西归入一组有名称的分组之一，这些分组称为类别或类。",
            },
            {
              term: "预测",
              definition: "分类器针对一张输入图像所选出的、它认为最合适的类别。",
            },
            {
              term: "置信度",
              definition: "一个数字，常以百分比显示，表示分类器对自己的预测有多确定。数值越高越确定，但未必越正确。",
            },
          ],
          openingScenario: {
            prompt: "你给一个相册应用看一张图片，它立刻说「猫，96% 确定」。它从没见过这张具体的照片。一台只看得到数字的计算机，怎么可能判断出这是猫？",
            context: "记住你的第一个猜想，看完像素如何变成预测之后，你会回来核对它。",
          },
          predictionPrompt: {
            prompt: "预测一下：分类器看一张照片时，你觉得它是一下子认出整只「猫」，还是从边缘、形状这样更小的规律里一点点拼出答案？",
            howToCheck: "读一读下面的概念，看看像素怎样变成视觉特征，特征又怎样变成预测。",
          },
          concepts: [
            {
              title: "图片是一张像素网格，而像素就是数字",
              body: [
                "计算机没法像你那样「看」照片。对计算机来说，图像是由无数称为像素的小点排成的网格，每个像素都以描述其颜色和亮度的数字形式存储。一张小照片就可能有几十万个像素。",
                "所以分类器最先拿到的并不是一只「猫」，而是一大片数字。分类器所做的一切判断，都必须从这些数字里搭建起来。",
              ],
              examples: [
                "一个黑白像素可能存成一个从 0（黑）到 255（白）的数字。",
                "一个彩色像素通常存成三个数字：它含有多少红、绿、蓝。",
                "一张 100 乘 100 的照片就是 10,000 个像素，对一张小图来说已是海量数字。",
              ],
            },
            {
              title: "从像素到视觉特征",
              body: [
                "只靠原始像素来处理很困难，所以分类器会去寻找视觉特征：像边缘、拐角、颜色、质地和形状这些有用的规律。靠近上方的尖尖的三角形状，可能就是一种常与猫一起出现的特征（耳朵）。",
                "分类器是在早先的训练中，通过研究大量带标签的样例，学会哪些特征重要的。没有人把「猫有尖耳朵」当成规则告诉它，是它自己从样例中找出了这样的规律，这正是前几周讲过的同一种学习思路。",
              ],
              examples: [
                "深色区域与浅色区域相接处的边缘",
                "圆形，可能是眼睛，也可能是轮子",
                "毛发、鳞片或光滑金属这样的质地",
              ],
            },
            {
              title: "预测与置信度",
              body: [
                "把视觉特征累加起来之后，分类器就做出预测：挑出最匹配的那个类别，比如「猫」或「狗」。在给出预测的同时，它通常还会报告一个置信度，也就是表示它有多确定的数字，常以百分比显示。",
                "置信度有用，但也很微妙。置信度高，意味着这些特征与某个类别高度吻合，而不是说答案一定正确。分类器完全可能自信满满地弄错，而这正是你这周要研究的那类错误。",
              ],
              examples: [
                "「狗，91%」：这些特征与狗的吻合程度远高于其他任何类别。",
                "「猫 55%，狗 45%」：分类器拿不准，这张图两边的特征都有。",
                "如果照片很不寻常，哪怕 98% 的自信也可能是错的。",
              ],
            },
          ],
          workedExample: {
            title: "跟着一张照片从像素走到标签",
            steps: [
              "输入：一张猫的照片以像素网格的形式到来，只是一堆关于颜色和亮度的数字。",
              "寻找特征：分类器先检测出边缘，然后是靠近上方的两个尖形、圆圆的眼睛形状，以及毛发质地。",
              "为每个类别打分：这些特征与「猫」高度吻合，与「狗」只有一点点吻合。",
              "给出带置信度的预测：它输出「猫」，置信度 96%，因为猫的特征得分远高于其他类别。",
              "输出：标签「猫」和置信度呈现在你面前。整个答案都是从像素搭建起来的，并不是计算机真的「看见」了一只猫。",
            ],
            takeaway: "分类器把像素变成视觉特征，依据这些特征给每个类别打分，再把最匹配的那个作为带置信度的预测报告出来。",
          },
          visuals: [
            {
              title: "从像素到带标签的预测",
              summary: "一个四步流程。第 1 步：输入图像，画成一张像素（数字）网格。第 2 步：寻找视觉特征，包括边缘、形状、颜色、质地。第 3 步：依据这些特征为每个类别打分，例如猫 96、狗 3、兔子 1。第 4 步：把得分最高的类别作为预测输出，并附上置信度：「猫，96%」。箭头清楚地表明，标签是从像素一步步搭起来的，而不是直接看出来的。",
              caption: "每一个预测都是从像素出发、经由特征、最终变成一个带分数的判断。",
            },
            {
              title: "同一张照片在各个类别上的置信度",
              summary: "一张条形图，用百分比显示分类器对一张猫照片在各个类别上的置信度。猫这一条遥遥领先，为 96%，狗为 3%，兔子为 1%。最高的那条就是预测，它的高度就是置信度。各条加起来约为 100%，因为分类器是在各个类别之间分配它的确定程度。",
              caption: "最高的那条就是预测；它的高度就是置信度。",
              chart: {
                unit: "置信度（%）",
                bars: [
                  null,
                  null,
                  {
                    label: "兔子",
                  },
                ],
              },
            },
          ],
          activity: {
            title: "分类器全流程演示",
            goal: "跟随一张内置图片从像素走到带标签的预测，看看置信度如何在类别之间做比较，却并不保证答案正确。",
            overview: "挑一张生成的图形图片，用计算机的方式来看它：一张 16×16 的、标有数字的像素网格。活动会展示它从这些像素中测出的视觉特征、它的预测，以及每个类别的置信度条，并用通俗的语言说明它匹配到了哪些最接近的训练图片。一个示范例子会展示模型很自信却依然出错的情形。你还可以选择上传自己的图片，它只在你的设备上处理，绝不会被保存或发送到任何地方。",
            steps: [
              "选一张图片，查看它的像素网格。",
              "读一读模型从像素中测出的视觉特征。",
              "读一读预测、每个类别的置信度条，以及它匹配到了什么的说明。",
              "看看那个自信却出错的例子，并记住：置信度不等于确定无疑。",
            ],
            materials: [
              "本活动中内置的生成图片",
              "可选：上传你自己的一张画（仅在你的设备上处理）",
            ],
            successCriteria: [
              "完整追踪了一张图片从像素到特征再到预测的过程。",
              "把置信度条理解为类别之间的比较，而不是一种保证。",
              "理解了自信却出错的那个例子。",
            ],
            dataset: {
              name: "生成的图形图片（带标签）",
              description: "在本地生成的 16×16 像素的圆形、三角形和正方形图片，每一张都依据一份规格绘制（不下载也不上传任何文件）。分类器及其置信度都在你的设备上依据像素计算得出。",
              columns: [
                "图片",
                "真实标签",
                "预测标签",
                "置信度",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "回答这些题，检验你是否理解图像分类器如何把像素变成预测。",
            questions: [
              {
                prompt: "图像分类器真正接收到的输入是什么？",
                explanation: "对计算机来说，图像是一张以数字形式存储的像素网格；分类器的其他一切都是从这些数字搭建出来的。",
                choices: [
                  {
                    text: "照片中物体的名称",
                    explanation: "名称是分类器试图产出的输出，不是它开始时拿到的输入。",
                  },
                  {
                    text: "一张以数字形式存储的像素网格",
                    explanation: "正确：分类器从像素（表示颜色和亮度的数字）出发，再一步步往上搭建。",
                  },
                  {
                    text: "一份写好的物体特征清单",
                    explanation: "没人会给分类器一份特征清单；它自己从像素中把特征找出来。",
                  },
                  {
                    text: "一个置信度分数",
                    explanation: "置信度属于输出，是最后产生的，并不是输入。",
                  },
                ],
              },
              {
                prompt: "把图像分类的各个步骤按顺序排好，从收到照片到显示答案。",
                explanation: "分类器从像素出发，到视觉特征，再到为每个类别打分，最后得出得分最高的预测及其置信度。",
                items: [
                  {
                    text: "以像素网格的形式接收图像",
                  },
                  {
                    text: "寻找边缘、形状、质地等视觉特征",
                  },
                  {
                    text: "为这些特征与每个类别的吻合程度打分",
                  },
                  {
                    text: "把得分最高的类别作为预测输出，并附上置信度",
                  },
                ],
              },
              {
                prompt: "判断这句话是对还是错。",
                statement: "置信度为 98% 的预测一定是正确的。",
                explanation: "错：高置信度意味着特征与某个类别高度吻合，但分类器仍可能自信满满地出错，在不寻常的照片上尤其如此。",
              },
            ],
          },
          challenge: {
            title: "由你来当分类器",
            prompt: "挑一个你想象得出的简单物体（苹果、自行车、房子），并说明分类器可以怎样借助视觉特征把它和一个近亲区分开。",
            steps: [
              "选定你的物体，以及一个可能与它混淆的相似物体（苹果与西红柿，自行车与摩托车）。",
              "列出三个会把预测推向你那个物体的视觉特征。",
              "列出一个两个物体共有的、可能让分类器犹豫的特征。",
            ],
            successCriteria: [
              "选出了一对相似的物体。",
              "列出了三个用于区分的视觉特征。",
              "指出了一个可能拉低置信度的共有特征。",
            ],
          },
          reflection: [
            {
              prompt: "既然你已经知道照片对计算机来说只是像素，它得出标签的方式中最让你意外的是什么？",
            },
            {
              prompt: "在什么情况下，你会想先看看置信度分数，再决定要不要相信分类器的预测？",
            },
          ],
          recap: {
            summary: "图像分类器把一张像素网格变成视觉特征，为每个类别打分，再把最匹配的那个作为带置信度的预测输出。",
            keyPoints: [
              "对计算机来说，图像是一张以数字形式存储的像素网格。",
              "分类器依据边缘、形状、颜色、质地这类视觉特征来工作。",
              "预测会附带一个置信度，而高置信度并不保证答案正确。",
            ],
          },
          extension: {
            title: "置信度为什么会骗到你",
            body: [
              "置信度告诉你的是特征与某个类别吻合得有多强，而不是答案有多正确。一个只用清晰的白天照片训练出来的分类器，面对一张模糊的夜间照片时，可能有 95% 的自信却是错的，因为那些不寻常的像素碰巧仍与某一个类别最吻合。",
              "描述一种你希望系统说「我不确定」而不是给出自信答案的情形。设计者为什么可能会定下「如果置信度低于 60%，就交给人来判断」这样的规则？",
            ],
          },
        },
        {
          title: "训练并测试一个分类器",
          summary: "弄清为什么要用分类器从没训练过的照片来检验它，并用一个公平测试集上的准确率来衡量它的表现。",
          estimatedTime: "45-55 分钟",
          objectives: [
            {
              text: "说明为什么要用另外的、没参与训练的照片来测试分类器。",
            },
            {
              text: "用「预测正确数除以预测总数」来计算准确率。",
            },
            {
              text: "读懂各类别准确率，并找出最弱的那个类别。",
            },
            {
              text: "说明为什么单一的总体准确率会掩盖某个薄弱类别。",
            },
          ],
          materials: [
            {
              name: "在网页浏览器中打开的这节课",
            },
            {
              name: "纸和笔，或者一个记事应用",
            },
            {
              name: "本课中展示的内置带标签测试集",
              note: "照片已经分好训练组和测试组；学生不需要添加照片。",
            },
          ],
          vocabulary: [
            {
              term: "准确率",
              definition: "分类器答对的频率，通常是预测正确的数量除以预测总数，以百分比表示。",
            },
            {
              term: "各类别准确率",
              definition: "分别针对每个类别测出的准确率，让你看清分类器擅长哪些类别、又在哪些类别上吃力。",
            },
            {
              term: "测试集",
              definition: "一组带标签、被单独留出且从未用于训练的照片，用来公平地检验分类器面对新图像时的表现。",
            },
            {
              term: "训练集",
              definition: "分类器在接受测试之前，用来学出各种规律的那些带标签照片。",
            },
          ],
          openingScenario: {
            prompt: "一个分类器把每一张训练照片都答对了。制作它的人说它「完美无缺」。可当它遇到全新的照片时，却错了一大堆。他们衡量它的方式出了什么问题？",
            context: "想一想「背下答案」和「真正学会规律」之间的区别。",
          },
          predictionPrompt: {
            prompt: "预测一下：如果一个分类器在猫、狗、兔子上的总体准确率是 90%，你觉得它在这三个类别上的表现同样好吗？",
            howToCheck: "读一读关于各类别准确率的内容，并看看内置的结果表，来核对你的预测。",
          },
          concepts: [
            {
              title: "为什么要用分类器从没训练过的照片来测试",
              body: [
                "分类器是从训练集里学习的。如果你之后又拿同样这些照片去测试它，它可能仅仅因为把它们背下来就显得很出色，就像一个提前看过考题的学生。那个分数根本说明不了它面对新照片时表现如何。",
                "所以我们会另外保留一个测试集：一批带标签、留出不用于训练的照片。用分类器没见过的照片来测试，才是衡量它是否真正学到规律的公平方式。",
              ],
              examples: [
                "用 800 张宠物照片训练，再用另外 200 张不同的宠物照片测试。",
                "训练分数高而测试分数低，是「死记硬背」的警示信号。",
                "测试照片也必须带标签，你才能核对每一个预测。",
              ],
            },
            {
              title: "准确率：分类器答对的频率",
              body: [
                "准确率是最简单的分数：预测正确的数量除以预测总数，写成百分比。如果分类器在 100 张测试照片中答对 90 张，它的准确率就是 90%。",
                "准确率容易理解，所以特别常用。但一个数字一次性把所有情况都概括了，因此它也可能掩盖问题，而各类别准确率正是为此而生。",
              ],
              examples: [
                "50 张照片答对 45 张，就是 90% 的准确率。",
                "两个分类器可能准确率相同，犯的错误却大不一样。",
                "只有在带标签的数据集上，也就是你知道正确答案时，准确率才有意义。",
              ],
            },
            {
              title: "各类别准确率能讲出更完整的故事",
              body: [
                "各类别准确率单独衡量每一个类别的得分。总体准确率可能是 90%，但分类器也许 98% 的时候能答对猫，而兔子只有 74%。那个总体数字悄悄把薄弱的类别平均掉了。",
                "把准确率按类别拆开，能准确告诉你该在哪里改进。这通常是查明分类器把哪个类别搞混的第一步，也正是下一节课的重点。",
              ],
              examples: [
                "总体 90%，但猫 98%、狗 92%、兔子 74%。",
                "如果某个薄弱类别在测试集里照片很少，它可能被藏起来。",
                "修好最弱的那个类别，通常能把总体准确率抬得最多。",
              ],
            },
          ],
          workedExample: {
            title: "公平地衡量一个宠物分类器",
            steps: [
              "拆分照片：800 张进训练集，另外 200 张不同的进测试集。",
              "训练：分类器只用那 800 张训练照片来学习猫、狗和兔子的规律。",
              "测试：把留出的 200 张全部跑一遍，把每个预测和真实标签作比较。",
              "总体准确率：200 张里对了 180 张，所以 180 ÷ 200 = 90% 的准确率。",
              "按类别看：猫 98%、狗 92%、兔子 74%。尽管总体的 90% 看着挺不错，其实是兔子在拖后腿。",
            ],
            takeaway: "用留出的照片测试，按「答对数除以总数」算出准确率，再按类别拆开，找出被总体数字掩盖的薄弱环节。",
          },
          visuals: [
            {
              title: "测试集上的各类别准确率",
              summary: "一张条形图，用百分比显示在 200 张照片的测试集上各类别的准确率。猫为 98%，狗为 92%，而兔子只有 74%。一条虚线参考线标出了 90% 的总体准确率。图表清楚地表明兔子是最弱的类别，正把总体分数往下拉，尽管那个单一的总体数字看上去挺不错。",
              caption: "总体的 90% 掩盖了兔子远弱于猫和狗这一事实。",
              chart: {
                unit: "准确率（%）",
                bars: [
                  {
                    label: "猫",
                  },
                  {
                    label: "狗",
                  },
                  {
                    label: "兔子",
                  },
                ],
              },
            },
            {
              title: "为什么单独的测试集才公平",
              summary: "之前（不公平）：用分类器训练时用过的同一批照片来测试它，于是它可能仅凭背下这些照片就拿到高分，而这个分数无法预示它面对新照片时的表现。之后（公平）：把照片拆开，训练和测试使用不同的照片；只用它训练时从未见过的照片来给它打分，这才能看出它是否真正学到了规律。",
              caption: "用分类器没见过的照片来测试，分数才靠得住。",
            },
          ],
          activity: {
            title: "训练并测试一个分类器",
            goal: "选定一个主题，挑选训练图片，在你的设备上真正训练出一个分类器，并读出它在没见过的图片上的总体准确率、各类别准确率和混淆矩阵。",
            overview: "从三个主题里选一个：几何图形、文具或可回收物品，然后挑选分类器要用哪些生成的图片来训练。留意各类别的数量统计和校验提示，预测哪个类别最容易、哪个最难，然后开始训练。模型会从像素中计算出真实的特征，并对一个留出的测试集进行分类。你要读出总体准确率和各类别准确率、一张混淆矩阵、你所选类别的假阳性与假阴性，以及带置信度条和说明的逐张图片复盘。什么都不会被上传；一切都在你的设备上运行。",
            steps: [
              "选一个主题，并读一读各个类别的定义。",
              "挑选训练图片，并留意各类别的数量统计和任何提示。",
              "预测最容易和最难的类别，然后训练分类器。",
              "读出总体准确率、混淆矩阵、各类别准确率，以及假阳性和假阴性的数量。",
            ],
            materials: [
              "本活动中内置的生成图片集",
            ],
            successCriteria: [
              "用学生自己挑选的图片训练出一个分类器，并在没见过的图片上完成测试。",
              "读出了总体准确率、各类别准确率和混淆矩阵。",
              "为所选的类别找出了假阳性和假阴性。",
            ],
            dataset: {
              name: "三个生成图片主题（训练／测试）",
              description: "三个在本地生成的主题：图形（圆形／三角形／正方形）、文具（书写类／测量类／纸类）和回收（纸／塑料／金属），每个主题都配有一个训练图片池和一个留出的测试集。图片依据规格在你的设备上绘制；不下载也不上传任何内容。",
              columns: [
                "图片",
                "所属划分",
                "真实标签",
                "预测标签",
                "置信度",
                "是否正确？",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "回答这些题，检验你能否用准确率公平地衡量一个分类器。",
            questions: [
              {
                prompt: "一个分类器在 50 张测试照片中答对了 45 张。它的准确率是多少？",
                explanation: "准确率是预测正确数除以预测总数：45 ÷ 50 = 0.90，也就是 90%。",
                choices: [
                  {
                    explanation: "45 是答对的张数，不是准确率；你还得除以总数 50。",
                  },
                  {
                    explanation: "正确：45 ÷ 50 = 0.90，也就是 90% 的准确率。",
                  },
                  {
                    explanation: "50 是照片的总数，不是准确率。",
                  },
                  {
                    explanation: "5 是答错的张数，不是准确率。",
                  },
                ],
              },
              {
                prompt: "哪一个分类器是用公平的方式衡量的？",
                scenario: "A 组用它训练时用过的那 500 张照片来测试自己的分类器，报告准确率 99%。B 组留出 100 张照片，用其余照片训练，只用留出的那 100 张来测试。",
                explanation: "用训练时用过的同一批照片来测试，是在奖励死记硬背。B 组留出了照片，所以它的分数反映了分类器面对新图像时的表现。",
                choices: [
                  {
                    text: "A 组，因为 99% 更高",
                    explanation: "如果高分来自用训练照片做测试，那它意义不大，可能只是纯粹的死记硬背。",
                  },
                  {
                    text: "B 组，因为它用的是留出的照片",
                    explanation: "正确：用训练中从未用过的照片来测试，才是衡量真实表现的公平方式。",
                  },
                  {
                    text: "两者同样公平",
                    explanation: "并不一样；A 组用自己的训练照片来测试，那不是一次公平的测试。",
                  },
                  {
                    text: "两者都没法用准确率来衡量",
                    explanation: "两者都可以用准确率；问题在于测试用的是哪些照片。",
                  },
                ],
              },
              {
                prompt: "判断这句话是对还是错。",
                statement: "单一的总体准确率可能掩盖分类器在某个特定类别上表现很差这一事实。",
                explanation: "对：总体准确率把所有类别平均在一起，所以某个薄弱类别（比如只有 74% 的兔子）可能被强势类别掩盖。各类别准确率能把它揭示出来。",
              },
            ],
          },
          challenge: {
            title: "公平地划分",
            prompt: "为一个给三种水果照片分类的分类器，设计一套公平的训练／测试方案，并说明你会衡量什么。",
            steps: [
              "决定多少张照片进训练集，多少张留出来做测试集。",
              "说明为什么测试照片不能在训练中使用。",
              "列出你会报告的准确率数字：总体准确率，以及每种水果的准确率。",
            ],
            successCriteria: [
              "把照片清楚地划分成训练组和测试组。",
              "说明了测试照片必须排除在训练之外的理由。",
              "把总体准确率和各类别准确率都列为需要报告的内容。",
            ],
          },
          reflection: [
            {
              prompt: "你关于三个类别表现同样好的预测正确吗？各类别准确率揭示了什么？",
            },
            {
              prompt: "为什么去相信一个只宣传单一总体准确率的产品，可能是有风险的？",
            },
          ],
          recap: {
            summary: "分类器要在留出的测试集上用准确率来公平衡量，而把准确率按类别拆开，能揭示总体数字所掩盖的薄弱环节。",
            keyPoints: [
              "用一组分类器从未训练过的、单独的照片来测试。",
              "准确率是预测正确数除以预测总数。",
              "即使总体分数看着不错，各类别准确率也能指出哪个类别最弱。",
            ],
          },
          extension: {
            title: "准确率什么时候会误导人",
            body: [
              "设想一个测试集里 95% 是猫，只有 5% 是兔子。一个偷懒的分类器每次都猜「猫」，就能拿到 95% 的准确率，同时把每一只兔子都答错。高准确率掩盖了它在兔子上的彻底失败。",
              "说明测试集中各类别的比例为什么重要。你可以衡量什么、或者改变什么，才能让分类器无法靠无视某个稀少类别来「作弊」？",
            ],
          },
        },
        {
          title: "把模型搞糊涂，再把它改进",
          summary: "找出那些能骗过分类器的边缘情况，在混淆矩阵里读懂它的错误，并提出让它变得更好的改动。",
          estimatedTime: "50-60 分钟",
          objectives: [
            {
              text: "针对某个类别，区分假阳性和假阴性。",
            },
            {
              text: "找出那些很可能让分类器犯糊涂的边缘情况。",
            },
            {
              text: "读懂混淆矩阵，看清哪些类别被弄混了。",
            },
            {
              text: "提出一项改动，比如补充样例，来减少某个具体错误。",
            },
          ],
          materials: [
            {
              name: "在网页浏览器中打开的这节课",
            },
            {
              name: "纸和笔，或者一个记事应用",
            },
            {
              name: "本课中展示的内置错误集和混淆矩阵",
              note: "预测和真实标签都是事先记录好的；学生不需要上传照片。",
            },
          ],
          vocabulary: [
            {
              term: "假阳性",
              definition: "分类器说某样东西属于某个类别，但其实不属于；比如把一张其实是狗的照片叫作「猫」。",
            },
            {
              term: "假阴性",
              definition: "分类器说某样东西不属于某个类别，但其实属于；比如漏掉一只真正的猫，把它说成狗。",
            },
            {
              term: "边缘情况",
              definition: "处在两个类别边界附近的不寻常或棘手输入，比如一只看着有点像猫的毛茸茸小狗，很容易被判断错。",
            },
            {
              term: "混淆矩阵",
              definition: "一张把真实标签与分类器的预测对照排列的表格，让你看清究竟是哪些类别被弄混、又混了多少次。",
            },
          ],
          openingScenario: {
            prompt: "一个宠物分类器老是把某只特定的毛茸茸小狗叫作「猫」。而且它每次都很自信。这是随机的倒霉，还是它的错误里其实藏着一个你能找出来并修好的规律？",
            context: "这节课要做的，是找出分类器错误背后的规律，而不只是注意到它会出错。",
          },
          predictionPrompt: {
            prompt: "预测一下：在一个分辨猫、狗、兔子的分类器里，你觉得哪两个类别最常被弄混？为什么？",
            howToCheck: "读一读下面的混淆矩阵，看看对角线之外哪个格子里的错误最多。",
          },
          concepts: [
            {
              title: "假阳性与假阴性",
              body: [
                "并非所有错误都一样。对「猫」而言，假阳性是分类器说了「猫」，但照片并不是猫。对「猫」而言，假阴性是照片确实是猫，分类器却说成了别的。每个类别都有这两种错误。",
                "这个区别很重要，因为两种错误的代价可能天差地别。漏掉一次真正的火警（假阴性）可能远比一次误报（假阳性）严重得多，所以人们往往很在意一个系统会犯哪一类错误。",
              ],
              examples: [
                "「猫」的假阳性：一张兔子照片被标成了「猫」。",
                "「猫」的假阴性：一张真正的猫照片被标成了「狗」。",
                "垃圾邮件过滤器把一封真实邮件标成垃圾，就是「垃圾邮件」这一类的假阳性。",
              ],
            },
            {
              title: "边缘情况就落在边界附近",
              body: [
                "分类器的大部分错误都出在边缘情况上：那些落在两个类别边界附近的不寻常输入。一只毛茸茸的小狗与猫共享一些特征，一只耳朵耷拉着被拍下的兔子失去了关键特征，而一张昏暗模糊的照片把所有类别的特征都藏了起来。",
                "边缘情况并非随机。如果你能预判哪些输入靠近边界，就能预判分类器会在哪里吃力，并针对这些情况去收集更好的样例。",
              ],
              examples: [
                "一只无毛猫，缺少通常的毛发质地。",
                "一只穿着服装的狗，身形被遮住了。",
                "一张在极暗光线下拍的照片，颜色和边缘都不清楚。",
              ],
            },
            {
              title: "读懂混淆矩阵，然后改进模型",
              body: [
                "混淆矩阵把真实标签和预测排成一张网格。对角线上的数字（真实为猫、预测为猫）是答对的；对角线之外的数字是错误，而每一个非对角格子都准确告诉你发生了哪种混淆、发生了多少次。「真实为狗、预测为猫」那格数字很大，就意味着狗经常被误认成猫。",
                "一旦你看清了最大的那个错误，就可以有意识地改进模型。最常见的办法是为那个易混情形补充更多、更好的样例，比如更多毛茸茸小狗的照片，好让分类器学会区分它们的特征。矩阵指向哪里，你就在哪里改进，然后再测一次。",
              ],
              examples: [
                "「真实为兔子、预测为猫」那格很大，就说明兔子经常被叫成猫。",
                "补充更清晰的兔子照片，正是针对这个错误。",
                "修改之后，你要重新检查准确率和矩阵，确认那个错误确实变少了。",
              ],
            },
          ],
          workedExample: {
            title: "从一个令人困惑的错误到一次有针对性的修正",
            steps: [
              "看混淆矩阵，找出对角线之外最大的数字：「真实为兔子、预测为猫」，有 9 次错误。",
              "说出错误的类型：对猫这个类别来说，这些是假阳性（被叫成猫，其实是兔子）；对兔子这个类别来说，这些是假阴性（真兔子被漏掉了）。",
              "追问为什么：兔子和猫可能共享毛发质地和圆润的外形，而耳朵耷拉着的兔子又失去了那个区分特征，这是典型的边缘情况。",
              "提出修正方案：往训练集里补充更多兔子照片，尤其是耳朵耷拉着的、以及拍摄角度接近猫的，好让分类器学会两者的差别。",
              "重新衡量：再测一次，看看「真实为兔子、预测为猫」那格是否变小了，兔子的准确率是否上去了。",
            ],
            takeaway: "在混淆矩阵里找出最大的错误，说清它属于哪一类，解释背后的边缘情况，补充有针对性的样例，然后重新衡量。",
          },
          visuals: [
            {
              title: "宠物分类器的混淆矩阵",
              summary: "一张针对猫、狗、兔子分类器在测试集上的 3×3 混淆矩阵。行是真实标签，列是预测标签。真实的猫：47 个被预测为猫，2 个为狗，1 个为兔子。真实的狗：3 个猫，44 个狗，3 个兔子。真实的兔子：9 个猫，4 个狗，37 个兔子。对角线（47、44、37）是答对的。最大的错误是「真实为兔子、预测为猫」那格的 9，说明兔子最常被误认成猫，正是准确率图里那个薄弱的兔子类别。",
              caption: "对角线上的格子是答对的；「真实为兔子、预测为猫」那格的 9 是最该修正的错误。",
              matrix: {
                labels: [
                  null,
                  null,
                  "兔子",
                ],
              },
            },
            {
              title: "改进最弱的那个类别",
              summary: "之前：训练集里耳朵耷拉着的兔子照片很少，于是许多这样的兔子被预测成猫，兔子的准确率停在 74%。之后：补充了更多兔子照片，尤其是耳朵耷拉着、以及拍摄角度接近猫的边缘情况；分类器学会了两者的差别，「真实为兔子、预测为猫」的错误减少了，兔子的准确率也上去了。这次修正正好瞄准了混淆矩阵所指出的那个错误。",
              caption: "针对最大的那处混淆去补充样例，就是有意识地改进模型的方法。",
            },
          ],
          activity: {
            title: "搞糊涂它，再改进它",
            goal: "试着用边缘情况把分类器搞糊涂，然后通过补充几张多样的训练图片来改进一个薄弱模型，并比较最初的模型和改进后的模型。",
            overview: "第 1 部分：用内置的边缘情况来跑分类器，包括旋转过的图形、被部分遮挡的图形、有噪点的背景、模糊的图、极小的图形、笔画过粗的图，以及一张混合图。先预测每个结果，再看模型的答案、置信度和可能的混淆来源，并决定这张图该归入训练、测试，还是哪边都不放。第 2 部分：一个薄弱的初始模型只见过圆形和正方形，从没见过三角形，所以它把每个三角形都答错；补充最多四张多样的图片，重新训练，再把最初的模型和改进后的模型并排比较：训练数量、总体和各类别准确率、两张混淆矩阵，以及究竟哪些测试图片被修好了、哪些又被弄坏了。所有内容都是生成的，并且在你的设备上运行。",
            steps: [
              "对每一个边缘情况，先预测模型的答案，再运行它，然后读一读混淆的来源。",
              "决定每个边缘情况该归入训练、测试，还是哪边都不放。",
              "给那个薄弱的初始模型补充最多四张多样的图片，然后重新训练。",
              "比较最初的模型和改进后的模型，并说明你的改动为什么有效或无效。",
            ],
            materials: [
              "本活动中内置的生成边缘情况和图片集",
            ],
            successCriteria: [
              "每个边缘情况都保存了预测，并解释了它的混淆原因。",
              "通过补充多样的训练图片并重新训练，得到了改进后的模型。",
              "比较了最初的模型和改进后的模型，并指出了被修好的和新出错的图片。",
            ],
            dataset: {
              name: "生成的边缘情况 + 图形训练／测试集",
              description: "在本地生成的边缘情况图片（旋转、遮挡、噪点、模糊、极小、共享特征和混合），外加用于「最初对比改进」的图形训练池和留出的测试集。全部依据规格在你的设备上绘制；不上传任何内容。",
              columns: [
                "图片",
                "边缘情况类型",
                "真实标签",
                "预测标签",
                "置信度",
                "原因（混淆之处）",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "回答这些题，检验你能否读懂分类器的错误并加以改进。",
            questions: [
              {
                prompt: "对「猫」这个类别来说，这属于哪一类错误？",
                scenario: "一张照片其实是兔子，但分类器预测为「猫」。",
                explanation: "分类器把一个并非猫的对象放进了猫这个类别，所以这是猫的假阳性。（它同时也是兔子的假阴性，因为一只真兔子被漏掉了。）",
                choices: [
                  {
                    text: "猫的假阳性",
                    explanation: "正确：它对一个不是猫的对象说了「猫」，这就是猫这个类别的假阳性。",
                  },
                  {
                    text: "猫的假阴性",
                    explanation: "猫的假阴性应当是分类器漏掉了一只真正的猫；而这里的照片根本不是猫。",
                  },
                  {
                    text: "一个正确的预测",
                    explanation: "这是个错误：照片是兔子，不是猫。",
                  },
                  {
                    text: "混淆矩阵无法显示的一种错误",
                    explanation: "混淆矩阵恰恰能显示这一点：它会出现在「真实为兔子、预测为猫」那一格里。",
                  },
                ],
              },
              {
                prompt: "针对混淆矩阵揭示出的某个具体错误，下面哪些是好的减少办法？选出所有符合的。",
                explanation: "有针对性的改进，意味着对准最大的那处混淆下手：补充易混情形的样例、聚焦边缘情况，并重新衡量以确认修正有效。单纯删掉薄弱类别或隐藏置信度，都不能解决根本的错误。",
                choices: [
                  {
                    text: "为那个被弄混的类别补充更多训练样例，包括边缘情况",
                    explanation: "正确：为易混情形提供更多、更好的样例，能帮助分类器学会区分。",
                  },
                  {
                    text: "改动之后重新测试，看看那个错误是否变少了",
                    explanation: "正确：你要重新衡量，确认这次修正确实减少了那个错误。",
                  },
                  {
                    text: "删掉薄弱的类别，这样它就永远不会出错了",
                    explanation: "删掉一个类别并不能改进分类器；它只是让分类器不再去做本该做的工作。",
                  },
                  {
                    text: "隐藏置信度分数，让错误不那么显眼",
                    explanation: "隐藏信息解决不了任何错误；它只会让错误更难被发现。",
                  },
                ],
              },
              {
                prompt: "判断这句话是对还是错。",
                statement: "在混淆矩阵中，对角线上的数字是预测正确的部分。",
                explanation: "对：对角线上的格子正是真实标签与预测标签一致的地方（真实为猫、预测为猫），所以那些是预测正确的；对角线之外的格子则是错误。",
              },
            ],
          },
          challenge: {
            title: "追猎那处混淆",
            prompt: "挑一对你预计分类器会弄混的类别，并规划你会如何找出并修正这处混淆。",
            steps: [
              "选两个相似的类别（例如玛芬和纸杯蛋糕，或者狼和狗）。",
              "描述一个位于边界附近的边缘情况，并预测它对每个类别来说会变成假阳性还是假阴性。",
              "说出混淆矩阵中哪一格会变大，以及你会补充哪些样例来让它变小。",
            ],
            successCriteria: [
              "一对可信的易混类别，并配有一个边界上的边缘情况。",
              "把错误正确地判定为假阳性或假阴性。",
              "一项有针对性的修正，并与混淆矩阵中某个具体格子相对应。",
            ],
          },
          reflection: [
            {
              prompt: "你关于哪两个类别最常被弄混的预测正确吗？混淆矩阵显示了什么？",
            },
            {
              prompt: "什么时候假阴性比假阳性更危险，什么时候又反过来？举一个真实的例子。",
            },
          ],
          recap: {
            summary: "混淆矩阵准确显示出分类器把哪些类别弄混了，边缘情况则解释了为什么；你可以补充有针对性的样例并重新衡量，从而改进模型。",
            keyPoints: [
              "假阳性和假阴性是两种不同的错误，代价也不同。",
              "类别边界附近的边缘情况造成了大部分混淆。",
              "读懂混淆矩阵，为最大的错误补充样例，然后重新衡量。",
            ],
          },
          extension: {
            title: "你宁愿犯哪一种错？",
            body: [
              "对许多真实系统来说，你没法把错误全部消除，所以设计者会选择更愿意偏向哪一种。医学筛查工具可能宁愿接受更多假阳性（多做几次检查），以避免假阴性（漏掉一种疾病）；而垃圾邮件过滤器可能宁愿接受更多假阴性（放过一些垃圾邮件），以避免假阳性（丢掉一封真实邮件）。",
              "挑一个真实的分类器，论证它最该避免哪一种错误。它的制作者可以如何调整模型或它的判定阈值，来用一种错误换取另一种？",
            ],
          },
        },
      ],
    },
    {
      title: "文本人工智能、聊天机器人与推荐",
      subtitle: "看看人工智能如何处理语言和推荐：从关键词聊天机器人，到文本预测，再到塑造你所见内容的信息流。",
      summary: "学生探索日常文本和推荐背后的人工智能：他们用关键词、意图和一条兜底回复搭建一个基于规则的聊天机器人；深入了解预测下一段可能文本的语言模型，并弄清为什么流畅的输出不等于真实的输出；还要审视依靠相似度和反馈运作的推荐系统，诚实地考察它们如何造成过滤气泡。",
      bigQuestion: "人工智能是怎样处理语言和推荐的？我们又该在什么时候质疑它告诉我们、展示给我们的东西？",
      estimatedTime: "2.5-3 小时",
      objectives: [
        "用关键词、意图、决策树和一条兜底回复，搭建一个基于规则的聊天机器人。",
        "说明语言模型如何根据提示词预测下一段可能的文本。",
        "说明为什么人工智能流畅的输出不等于真实或正确的输出。",
        "审视推荐如何利用相似度和反馈，以及它们如何形成过滤气泡。",
      ],
      requiredConcepts: [
        "关键词",
        "意图",
        "决策树",
        "兜底回复",
        "语言模型",
        "词元或文本片段",
        "下一段可能的文本",
        "提示词",
        "推荐",
        "相似度",
        "反馈",
        "过滤气泡",
      ],
      lessons: [
        {
          title: "搭一个基于规则的聊天机器人",
          summary: "用老派的方式设计一个聊天机器人，靠关键词、意图和决策树，并发现它为什么需要一条兜底回复，来应付所有它没被设计去处理的情况。",
          estimatedTime: "50-60 分钟",
          objectives: [
            {
              text: "说明基于规则的聊天机器人如何用关键词猜出用户的意图。",
            },
            {
              text: "把一组意图和回复画成一棵决策树。",
            },
            {
              text: "说明聊天机器人为什么需要一条兜底回复，来应对它听不懂的消息。",
            },
            {
              text: "把基于规则的聊天机器人和从样例中学习的人工智能作比较。",
            },
          ],
          materials: [
            {
              name: "在网页浏览器中打开的这节课",
            },
            {
              name: "纸和笔，或者一个记事应用",
            },
            {
              name: "一把尺子或直边，用来画整齐的树状图",
              note: "只是让决策树画得整洁一些；徒手画也完全可以。",
            },
          ],
          vocabulary: [
            {
              term: "关键词",
              definition: "聊天机器人在消息里寻找的重要词语，用来弄清这个人想要什么，比如「营业时间」或「价格」。",
            },
            {
              term: "意图",
              definition: "这个人真正想做或想问的事情，比如「查营业时间」，哪怕他用了很多不同的说法。",
            },
            {
              term: "决策树",
              definition: "一组分叉的「是／否」或「如果／那么」选择，把一条消息一路引到一个回复，就像流程图一样。",
            },
            {
              term: "兜底回复",
              definition: "当聊天机器人没匹配上任何关键词或意图时给出的保底回答，比如「抱歉，我没听懂。」",
            },
          ],
          openingScenario: {
            prompt: "一家比萨店的聊天窗口对「你们几点关门？」立刻作答，可当你打「你们开到什么时候？」时，它却回「抱歉，我没听懂」。这两个问题意思一样。为什么一个管用，另一个却失灵？",
            context: "记住你的猜想，到最后你就能准确说出问题出在哪里。",
          },
          predictionPrompt: {
            prompt: "预测一下：如果一个聊天机器人只认识关键词「关门」，顾客能用多少种不同的说法问到打烊时间，却一次都不用这个词？",
            howToCheck: "边读边列出顾客可能用的说法，然后数一数有多少种漏掉了关键词「关门」。",
          },
          concepts: [
            {
              title: "关键词：聊天机器人盯着的那些词",
              body: [
                "基于规则的聊天机器人并不像你那样理解语言。相反，是由人给它一份要寻找的关键词清单。当你的消息里含有「营业时间」「开门」或「关门」这样的关键词时，机器人就挑出人为那个词写好的回复。",
                "这样又快又好预料，但很脆弱。如果你换个说法问同一件事，关键词不在其中，机器人就完全察觉不到。",
              ],
              examples: [
                "关键词「营业时间」→ 回复营业时间",
                "关键词「价格」或「多少钱」→ 回复菜单价格",
                "关键词「退款」→ 回复退换货政策",
              ],
            },
            {
              title: "意图：这个人真正想要的东西",
              body: [
                "词语背后是意图，也就是这个人真正想做的事。「你们几点关门？」「你们开到很晚吗？」和「你们开到什么时候？」是三句不同的话，却只有一个意图：查清营业时间。",
                "好的聊天机器人设计，会把许多关键词和说法归到同一个意图之下。你给一个意图挂上的关键词越多，机器人能接住的提问方式就越多，但仍然得由人事先把它们都想到。",
              ],
              examples: [
                "意图「查营业时间」匹配的关键词：营业时间、开门、关门、打烊、多晚、什么时候",
                "意图「找地址」匹配：在哪、地址、怎么走、位置",
                "意图「下单」匹配：下单、买、外送、自取",
              ],
            },
            {
              title: "决策树与兜底回复：把一条消息送到一个回复",
              body: [
                "基于规则的聊天机器人沿着决策树走：先查第一个意图的关键词；找到了就给出那个回复；没找到就查下一个意图，依次沿着分支往下。每个分支的末端，都是一条由人写好的回复。",
                "但没有哪份关键词清单能覆盖所有可能的消息。当什么都匹配不上时，这棵树就走到了最后一个分支：兜底回复。它是一句诚实的「我没听懂」，在好的设计里还会加上一点提示，说明机器人能帮上什么。要是没有兜底回复，一条没匹配上的消息就会得不到任何回应。",
              ],
              examples: [
                "消息「你们开到什么时候？」里没有「营业时间」这个关键词 → 落到兜底回复",
                "兜底回复：「抱歉，我可以帮你查营业时间、地址和订单。可以试着问问这几项。」",
              ],
            },
          ],
          workedExample: {
            title: "跟着一条消息走过这棵树",
            steps: [
              "有人给机器人设好了三个意图：「查营业时间」（关键词：营业时间、开门、关门）、「找地址」（在哪、地址）和「下单」（下单、外送）。",
              "一位顾客打字：「大号比萨多少钱？」",
              "分支 1：里面有营业时间、开门或关门吗？没有。继续。",
              "分支 2：里面有在哪或地址吗？没有。继续。",
              "分支 3：里面有下单或外送吗？没有。继续。",
              "没有任何分支匹配上，于是这棵树走到兜底回复：「抱歉，我没听懂。我可以帮你查营业时间、地址和订单。」而顾客真正想要的是价格，那是一个从没被赋予机器人的意图。",
            ],
            takeaway: "基于规则的机器人只能回答有人事先设好的意图；其他任何内容都会落到兜底回复，哪怕在人看来那个问题清清楚楚。",
          },
          visuals: [
            {
              title: "基于规则的聊天机器人如何把消息导向回复",
              summary: "一棵决策树，从顶部收到的消息开始，向下依次经过每个意图的一次判断。节点 1 问：「这条消息里有营业时间、开门或关门吗？」如果有，该分支止于回复「我们上午 11 点到晚上 10 点营业。」如果没有，就往下到节点 2：「里面有在哪或地址吗？」如果有，该分支止于「我们在主街 5 号。」如果没有，就到节点 3：「里面有下单或外送吗？」如果有，该分支止于「上网下单或拨打 555-1234。」如果没有，最后一个分支就是兜底回复：「抱歉，我没听懂。我可以帮你查营业时间、地址和订单。」每一个「是」分支都是一片叶子，带着人写好的回复；最后那个「否」分支永远是兜底回复，好让任何消息都不会没人应答。",
              caption: "每个意图就是一次判断；最后一个分支是兜底回复，接住所有没匹配上的内容。",
              tree: {
                label: "收到的消息",
                branches: [
                  {
                    condition: "提到营业时间、开门或关门",
                    child: {
                      label: "回复：「我们上午 11 点到晚上 10 点营业。」",
                    },
                  },
                  {
                    condition: "提到在哪或地址",
                    child: {
                      label: "回复：「我们在主街 5 号。」",
                    },
                  },
                  {
                    condition: "提到下单或外送",
                    child: {
                      label: "回复：「上网下单或拨打 555-1234。」",
                    },
                  },
                  {
                    condition: "以上都没匹配上",
                    child: {
                      label: "兜底回复：「抱歉，我没听懂。我可以帮你查营业时间、地址和订单。」",
                    },
                  },
                ],
              },
            },
            {
              title: "同一个意图，许多种说法",
              summary: "一张表，显示同一个意图「查营业时间」可以有很多种问法。各行：「你们几点关门？」含有关键词「关门」，所以匹配上了。「你们开到很晚吗？」含有「开门」，所以匹配上了。「你们开到什么时候？」不含任何列出的关键词，所以没匹配上，落到兜底回复。「还在营业吗？」同样不含任何列出的关键词，也没匹配上。这一课的启示是：多加关键词能接住更多说法，但得由人把它们全都想到。",
              table: {
                columns: [
                  "顾客的消息",
                  "找到关键词了吗？",
                  "结果",
                ],
                rows: [
                  [
                    "你们几点关门？",
                    "关门",
                    "匹配「查营业时间」",
                  ],
                  [
                    "你们开到很晚吗？",
                    "开门",
                    "匹配「查营业时间」",
                  ],
                  [
                    "你们开到什么时候？",
                    null,
                    "落到兜底回复",
                  ],
                  [
                    "还在供餐吗？",
                    null,
                    "落到兜底回复",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "基于规则的聊天机器人搭建器",
            goal: "从一个模板出发，搭出一个能用的基于规则的聊天机器人，包含意图、关键词、一个追问分支和一条兜底回复，并在实时预览中测试它，预览会明确显示是哪条规则匹配上了。",
            overview: "从一个安全的模板起步（图书馆、回收、博物馆、社团或作业助手），用结构化的控件来编辑它，无需写代码。添加并调整意图的顺序，给每个意图配上关键词和回复，加一个追问分支，再设定兜底回复、隐私边界和转人工帮助的选项。一份决策树大纲和实时校验会标出死路、无法到达的节点，以及缺少兜底回复的问题。之后在实时预览里和你的机器人聊天，预览会显示每条回复匹配到的规则，并保留一份测试记录，你可以清空它而不删掉机器人。任何内容都不会发送到外部服务；匹配是真实的、确定性的关键词匹配。",
            steps: [
              "挑一个模板，编辑欢迎语、各个意图（关键词 + 回复）、一个追问分支，以及兜底回复。",
              "留意决策树大纲，以及关于死路、无法到达的节点和缺少兜底回复的检查。",
              "实时测试机器人：普通问题、意料之外的输入，以及要求转人工。",
              "查看每条回复的规则追踪，以及测试记录日志。",
            ],
            materials: [
              "本活动中内置的聊天机器人搭建器和模板",
            ],
            successCriteria: [
              "一个聊天机器人，至少有三个意图、一个追问分支、一条兜底回复、一条隐私边界，以及一个转人工帮助的选项。",
              "各项校验通过（没有死路、无法到达的节点，也不缺兜底回复）。",
              "用普通输入和意料之外的输入测试了机器人，并能看到匹配上的规则。",
            ],
            dataset: {
              name: "聊天机器人模板（安全主题）",
              description: "五个内置且可编辑的、基于规则的聊天机器人模板，主题都很安全（学校图书馆、回收、博物馆、社团、作业规划）。不涉及医疗、法律或危机方面的建议；任何内容都不会发送到外部服务；关键词匹配是确定性的。",
              columns: [
                "模板",
                "意图",
                "追问分支",
                "兜底回复",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "回答这些题，检验你是否理解基于规则的聊天机器人怎样工作。",
            questions: [
              {
                prompt: "在聊天机器人里，「意图」是什么？",
                explanation: "意图是一条消息背后的目的，也就是这个人想要什么，无论他用的是哪些具体词语。",
                choices: [
                  {
                    text: "这个人打出的确切词语",
                    explanation: "确切的词语只是消息本身；许多不同的词语可以对应同一个意图。",
                  },
                  {
                    text: "这个人真正想做或想问的事",
                    explanation: "正确：意图是背后的目的，比如「查营业时间」，无论怎么措辞。",
                  },
                  {
                    text: "聊天机器人发出的回复",
                    explanation: "那是输出的回复，不是这个人消息背后的意图。",
                  },
                  {
                    text: "机器人没认出来的一个词",
                    explanation: "没认出来的词会引向兜底回复；那并不是意图的定义。",
                  },
                ],
              },
              {
                prompt: "判断这句话是对还是错。",
                statement: "基于规则的聊天机器人需要一条兜底回复，好让它匹配不上的消息也能得到某种回应。",
                explanation: "对：没有兜底回复，任何漏过所有关键词的消息都会得不到答复。兜底回复就是那个接住一切的最后分支。",
              },
              {
                prompt: "把基于规则的聊天机器人回复一条消息的各个步骤排成正确顺序。",
                explanation: "机器人收到消息，依次拿它去比对每个意图的关键词，发出匹配上的那条回复，只有在什么都没匹配上时才用兜底回复。",
                items: [
                  {
                    text: "收到来自这个人的一条消息",
                  },
                  {
                    text: "机器人逐个分支地，拿消息去比对每个意图的关键词",
                  },
                  {
                    text: "如果某个分支匹配上了，机器人就发出那个分支的回复",
                  },
                  {
                    text: "如果没有分支匹配上，机器人就发出兜底回复",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "把你自己的聊天机器人难住",
            prompt: "拿上你设计的聊天机器人，试着把它难住。找出三条真人可能会发、而你的关键词却接不住的消息。",
            steps: [
              "写出三条消息，它们表达的都是你的机器人本该处理的意思，却避开了你所有的关键词。",
              "把每一条都在你的树里走一遍，确认它确实落到了兜底回复。",
              "对每一条判断：加一个关键词就能解决吗，还是它差别太大、根本没法靠规则接住？",
            ],
            successCriteria: [
              "三条消息，人一看就懂，却都落到了兜底回复。",
              "对每一条，都注明加个关键词能否解决。",
              "一个明确的、单靠关键词解决不了的例子。",
            ],
          },
          reflection: [
            {
              prompt: "你的聊天机器人处理得很好的是哪一类问题？又总是答错哪一类？",
            },
            {
              prompt: "从成千上万条真实消息中学习，会怎样帮助聊天机器人接住那些你从没想到的说法？",
            },
          ],
          recap: {
            summary: "基于规则的聊天机器人用关键词匹配来猜出用户的意图，把消息沿决策树导向回复，并对所有匹配不上的内容使用兜底回复。",
            keyPoints: [
              "关键词是机器人盯着的那些词；意图才是这个人真正想要的东西。",
              "决策树每个分支检查一个意图，最后止于一条兜底回复。",
              "基于规则的机器人只处理有人设好的意图，其余的全都会漏掉。",
            ],
          },
          extension: {
            title: "从规则走向学习",
            body: [
              "大型的真实聊天机器人并不只靠关键词清单。许多都使用在成千上万条真实消息上训练出来的机器学习，因此即便是没人手工录入过的说法，它们也能识别出意图。",
              "与你那个基于规则的机器人相比，说出基于学习的聊天机器人的一个优点和一个风险。想一想，如果训练用的消息里没有包含某些人的说话方式，会发生什么。",
            ],
          },
        },
        {
          title: "语言模型如何预测文本",
          summary: "看看自动补全和聊天助手背后的人工智能：它把文本拆成片段，再预测下一个可能的片段，这听起来很流畅，但流畅并不等于真实。",
          estimatedTime: "50-60 分钟",
          objectives: [
            {
              text: "说明语言模型预测的是下一段可能的文本。",
            },
            {
              text: "描述文本如何被拆成模型所处理的词元（片段）。",
            },
            {
              text: "说明提示词如何开启并引导预测。",
            },
            {
              text: "说明为什么听起来流畅的输出不等于真实或正确的输出。",
            },
          ],
          materials: [
            {
              name: "在网页浏览器中打开的这节课",
            },
            {
              name: "纸和笔，或者一个记事应用",
            },
          ],
          vocabulary: [
            {
              term: "语言模型",
              definition: "一种在海量文本上训练出来的人工智能，用来预测接下来可能出现什么文本。",
            },
            {
              term: "词元（文本片段）",
              definition: "模型处理的一小块文本，通常是一个词或词的一部分，比如「玩」「耍」，或者一个标点符号。",
            },
            {
              term: "下一段可能的文本",
              definition: "模型根据它所学文本中的规律，估计最有可能接下来出现的那些片段。",
            },
            {
              term: "提示词",
              definition: "你给语言模型的起始文本，它会通过预测接下来的内容把这段文本续写下去。",
            },
            {
              term: "流畅",
              definition: "读起来顺、听着自然。流畅的文本仍然可能是错的，因为听着对不等于就是对。",
            },
          ],
          openingScenario: {
            prompt: "在手机上打「从前有」，它会建议「一」。在聊天助手里打「澳大利亚的首都是」，它可能顺顺当当地答「悉尼」，而这是错的，正确答案是堪培拉。既然两个答案听着都很自然，人工智能是怎么决定该说什么的？",
            context: "记住这一点：听着对和确实对，是两码事。",
          },
          predictionPrompt: {
            prompt: "预测一下：当你打「花生酱和」时，你觉得语言模型最有可能接上哪个词？为什么偏偏是它？",
            howToCheck: "边读边留意：模型挑的是在它所学的内容里，最常跟在类似文本后面的那个片段。",
          },
          concepts: [
            {
              title: "文本会被拆成叫作词元的片段",
              body: [
                "语言模型不会一口气读完整篇文章。它把文本拆成叫作词元的小片段。词元通常是一个词，但又长又生僻的词会被拆开：「难以置信」可能被拆成「难以」和「置信」。空格和标点也算数。",
                "以词元为单位来处理，让模型能应付任何文本，哪怕是它从没见过的词，也能靠拼合熟悉的片段来处理。",
              ],
              examples: [
                "「我爱比萨」→ 词元：「我」「爱」「比萨」",
                "「玩耍」→ 词元：「玩」「耍」",
                "一个句号「。」本身就是一个词元",
              ],
            },
            {
              title: "模型预测下一个可能的片段",
              body: [
                "语言模型有一项核心任务：根据到目前为止的文本，预测下一个词元。它从海量文本中学到了哪些片段往往跟在哪些片段后面。在「花生酱和」之后，「果酱」这个片段非常可能，所以它就这么预测。",
                "它一遍遍地这样做：预测一个片段，加上去，再预测下一个，从而写出完整的句子。你的提示词就是让这一切启动的起始文本；换一个提示词，接下来可能的片段也会跟着变。",
              ],
              examples: [
                "提示词「天空是」→ 下一个可能的片段「蓝色的」",
                "提示词「尊敬的校长：」→ 接下来可能的片段会开启一封正式信件",
                "提示词「def add(a, b):」→ 接下来可能的片段看起来像计算机代码",
              ],
            },
            {
              title: "流畅不等于真实",
              body: [
                "这是本节课最重要的一点。语言模型预测的是哪种文本可能出现，而不是哪种说法是真的。「可能」意味着它符合模型学到的语言规律，并不意味着有人核对过事实。",
                "所以模型完全可能写出一句流畅、笃定、语法工整、却根本不对的话。人们有时把这叫作编造出来的答案，或者「幻觉」。输出流畅只说明词与词衔接得好；它丝毫不能说明那个说法是否正确。重要的事实一定要拿去和可靠来源核对，而不能只因为人工智能「听上去很确定」。",
              ],
              examples: [
                "模型可能在一句非常自然的话里，说出一个并不存在的书名",
                "它可能笃定地给出一个错误日期，读起来却毫不别扭",
                "它可能编造一个听着像真的、实际却不存在的出处",
              ],
            },
          ],
          workedExample: {
            title: "从提示词开始，一片一片地预测",
            steps: [
              "提示词：「夏天最棒的是」。",
              "模型把它拆成词元，并查看在类似开头之后出现过的文本规律。",
              "它预测出下一个最可能的片段，也许是「游泳」，然后把它加上去。",
              "现在文本是「夏天最棒的是游泳」；它再预测一次，也许是「在」，然后是「泳池」，然后是「里」。",
              "就这样一片一片地，它拼出一句流畅的话。请注意：它从头到尾都没有核实过游泳是不是真的就是夏天最棒的事；它只是顺着可能的规律往下走。",
            ],
            takeaway: "语言模型从你的提示词出发，一次一个可能的片段地拼出文本；结果听着自然，但那是一次预测，而不是经过核实的事实。",
          },
          visuals: [
            {
              title: "预测、追加、重复",
              summary: "一个以流程形式呈现的循环。起点：提示词文本。第 1 步：拆成词元（片段）。第 2 步：预测下一个最可能的片段。第 3 步：把这个片段追加到文本上。一支箭头从第 3 步绕回第 2 步，再次预测，如此往复，让文本一片一片地生长，直到停下。这个流程强调：每一步只问「下一个可能是什么片段？」，从不问「这是真的吗？」",
              caption: "模型反复问的只有一个问题：下一个可能是什么片段，而从不问「这对吗？」",
            },
            {
              title: "在「天空是」之后，每个下一片段有多大可能",
              summary: "一张条形图，展示提示词「天空是」之后各个下一片段的可能性，数值是虚构但合乎实际的。「蓝色的」遥遥领先，约为 100 分之 60；「晴朗的」约为 15，「塌下来了」约为 8，「灰色的」约为 7，而「绿色的」是一条很短的条，约为 2。模型往往会挑高的那一条，所以它通常说「蓝色的」，但像「绿色的」这样的短条依然有可能被选中，而且「可能」从来都不等于「经核实为真」。",
              chart: {
                unit: "可能性（满分 100）",
                bars: [
                  {
                    label: "蓝色的",
                  },
                  {
                    label: "晴朗的",
                  },
                  {
                    label: "塌下来了",
                  },
                  {
                    label: "灰色的",
                  },
                  {
                    label: "绿色的",
                  },
                ],
              },
            },
          ],
          activity: {
            title: "下一段文本预测实验室",
            goal: "运行一个小型的本地下一词预测器：查看某个提示词之后可能出现的词，换掉一个词看概率如何变化，并判断流畅的文本是否真的属实。",
            overview: "一个用精选本地词表构建的微型 n 元语法模型，会预测某个提示词之后最可能出现的词，并用一张小图展示它们的相对可能性，全程不使用任何外部语言模型，也不联网。换掉一个词（暴风雨 → 游行），或者加入你自己的词，预测就会确定性地重新计算，并说明它用的是最后两个词，还是退回到只看一个词。之后来评判那些流畅度卡片：一句句顺畅又笃定的话，却仍可能编造出一个日期、一段引语或一个虚假说法，每张卡片都附有核实的方法。",
            steps: [
              "挑一个提示词，读一读最可能出现的下一批词及其可能性。",
              "换掉一个词，或者加入你自己的词，观察概率如何变化。",
              "读一读模型匹配到了什么的说明：它是在匹配规律，而不是在理解。",
              "评判流畅度卡片：先判断是真、是假，还是需要核实，然后揭晓答案，看看该怎样去核实。",
            ],
            materials: [
              "本活动中内置的下一段文本预测实验室",
            ],
            successCriteria: [
              "至少读了两个提示词之后可能出现的词，其中包括一次换词。",
              "观察到了改变上下文对概率的影响。",
              "识别出一张流畅却虚假的卡片，并给出核实它的方法。",
            ],
            dataset: {
              name: "本地语料 + 流畅度卡片",
              description: "一份小型、经过挑选、适合这个年龄的词表，本地的 n 元语法模型就由它构建；外加流畅度卡片：那些语句顺畅、内容或真或假的句子（编造的日期、张冠李戴的引语），并附有核实说明。不会有任何文本被发送到人工智能服务。",
              columns: [
                "提示词",
                "可能出现的下一批词",
                "续写内容",
                "是否属实？",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "回答这些题，检验你是否理解语言模型如何预测文本。",
            questions: [
              {
                prompt: "语言模型在写出一个答案时，实际上在做什么？",
                explanation: "语言模型一次又一次地预测下一段可能的文本；它并不是在查阅经过核实的事实。",
                choices: [
                  {
                    text: "在可靠的百科全书里查阅已核实的事实",
                    explanation: "它并不核实事实；它预测可能的文本，而那可能是错的。",
                  },
                  {
                    text: "一次又一次地预测下一段可能的文本",
                    explanation: "正确：它依据学到的规律，一次一个可能的片段地把文本拼出来。",
                  },
                  {
                    text: "从某个网站上一字不差地照抄整个答案",
                    explanation: "它是依据规律一片一片地生成文本，而不是照抄某一个网页。",
                  },
                  {
                    text: "每次都去问一个人要答案",
                    explanation: "并没有人在作答；模型是自己预测出来的。",
                  },
                ],
              },
              {
                prompt: "判断这句话是对还是错。",
                statement: "如果语言模型的回答流畅又听着笃定，那就证明这个回答是真的。",
                explanation: "错：流畅只说明词与词衔接得顺，并不说明那个说法正确。模型完全可能非常顺畅地说出错误的内容，所以重要的事实必须去核对。",
              },
              {
                prompt: "在这种情形下，最明智的下一步是什么？",
                scenario: "为了写报告，普里娅问聊天助手某座著名桥梁是什么时候建成的。它用一句流畅的话作答，给出了一个她从没见过的具体年份。",
                explanation: "这个答案是对可能文本的预测，而不是经过核实的事实，所以普里娅在使用之前，应当用可靠来源确认这个年份。",
                choices: [
                  {
                    text: "因为那句话听着笃定，就直接用上这个年份",
                    explanation: "听着笃定属于流畅，不是证据；模型可能预测出了一个错误的年份。",
                  },
                  {
                    text: "在使用之前，用可靠来源核对这个年份",
                    explanation: "正确：重要事实要核实，因为模型预测的是可能的文本，而不是核实过的真相。",
                  },
                  {
                    text: "认定它肯定是错的，完全不予理会",
                    explanation: "它可能对，也可能错；关键在于核实，而不是盲目相信或盲目否定。",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "「可能」与「真实」的侦探",
            prompt: "收集两个例子，让「下一段可能的文本」和「真实」朝着不同方向拉扯。",
            steps: [
              "写一个提示词，让可能的续写同时也是真实的（例如「二加二等于」）。",
              "写一个提示词，让听起来很可能的续写很容易是假的（例如某个具体日期，或某本书的作者）。",
              "对那个有风险的提示词，具体说明你会怎样核实答案是否属实。",
            ],
            successCriteria: [
              "一个「可能」与「真实」一致的提示词。",
              "一个流畅答案有可能是假的提示词。",
              "一份用可靠来源核实那个高风险答案的明确计划。",
            ],
          },
          reflection: [
            {
              prompt: "什么时候可以放心相信人工智能流畅的回答，什么时候又应当每次都再核实一遍？",
            },
            {
              prompt: "把文本看成「带着可能性的片段」，这怎样改变了你对人工智能写作的看法？",
            },
          ],
          recap: {
            summary: "语言模型把文本拆成片段，并根据提示词预测下一个可能的片段；输出听着流畅，但那是一次预测，而不是经过核实的事实。",
            keyPoints: [
              "文本被拆成词元（片段）；模型一次又一次地预测下一个可能的片段。",
              "你的提示词就是引导这些预测的起始文本。",
              "流畅不等于真实：重要的事实一定要核实。",
            ],
          },
          extension: {
            title: "模型为什么会编造",
            body: [
              "因为语言模型总是预测看起来最可能的文本，所以哪怕它并没有真实信息，也会笃定地把空缺填上，编出一个符合真实答案模式的假答案。人们把这叫作「幻觉」。",
              "用几句话说明：一个被造出来预测可能文本的系统，为什么会去编造一个假出处，而不是直接说「我不知道」，并提出一个能让你不被糊弄的习惯。",
            ],
          },
        },
        {
          title: "构建并质疑推荐系统",
          summary: "看看推荐系统如何利用相似度和你的反馈来推荐接下来的内容，并质疑同一套系统怎样可能把你困在过滤气泡里。",
          estimatedTime: "50-60 分钟",
          objectives: [
            {
              text: "说明推荐系统如何利用相似度来推荐内容。",
            },
            {
              text: "描述你的反馈（点赞、跳过、观看时长）如何训练推荐。",
            },
            {
              text: "说明什么是过滤气泡，以及推荐如何造成它。",
            },
            {
              text: "审视一个推荐信息流，并提出看到更多样内容的办法。",
            },
          ],
          materials: [
            {
              name: "在网页浏览器中打开的这节课",
            },
            {
              name: "纸和笔，或者一个记事应用",
            },
          ],
          vocabulary: [
            {
              term: "推荐",
              definition: "由人工智能系统挑选出来、你接下来可能会喜欢的东西，比如一个视频、一首歌、一件商品或一条帖子。",
            },
            {
              term: "相似度",
              definition: "两个内容或两个人有多相像。推荐系统会推荐与你喜欢过的内容相似的东西，或者和你相似的人喜欢过的东西。",
            },
            {
              term: "反馈",
              definition: "你给系统的信号，比如点赞、跳过、点击、观看时长，系统用它们来了解你的口味。",
            },
            {
              term: "过滤气泡",
              definition: "当系统不断给你看相似的东西时，你主要只看到很窄的一小片观点或内容，而错过了其余的部分。",
            },
          ],
          openingScenario: {
            prompt: "你看了一个关于滑板技巧的视频。没过多久，你的整个信息流全是滑板，其他任何话题的视频都不见了。应用是怎么决定只给你看这些的？你又可能错过了什么？",
            context: "你会同时学到这套机制是怎么造出来的，以及它为什么值得质疑。",
          },
          predictionPrompt: {
            prompt: "预测一下：如果一个音乐应用只给你放和你最喜欢的三首歌相似的歌，你可能永远都发现不了哪些类型的音乐？",
            howToCheck: "边读边把你的答案和「相似度与反馈如何一步步收窄信息流」联系起来。",
          },
          concepts: [
            {
              title: "推荐依靠相似度运作",
              body: [
                "推荐系统通过衡量相似度来推荐内容。如果你喜欢过某个视频，它就去找其他相似的视频，可能是同一话题、同一风格或同一创作者，也可能是与你相似的人也喜欢过的视频。然后把这些放到你信息流的最上面。",
                "这确实有用：不用你去搜索，就能帮你找到你会喜欢的东西。系统回答的问题是「和这个人已经喜欢过的东西最相似的是什么？」",
              ],
              examples: [
                "喜欢过一个做饭视频 → 推荐更多做饭视频",
                "购物网站上的「买了这个的人还买了……」",
                "根据你喜欢的一位歌手生成的一个歌曲电台",
              ],
            },
            {
              title: "你的反馈在训练这套系统",
              body: [
                "系统事先并不知道你的口味，它是从你的反馈里学的。每一次点赞、跳过、点击、重播，甚至你看了多久，都是一个信号。看到结尾，就算作一次强烈的「多来点这种」。两秒就跳过，则算作「少来点这种」。",
                "所以你一直在训练自己的信息流，而且常常并非有意为之。在一个视频上停留得够久，就可能推动系统给你看更多同类内容，无论你是不是真的想要更多。",
              ],
              examples: [
                "看完一个视频 → 更多这个话题的内容",
                "很快跳过 → 更少这类内容",
                "给一条帖子点赞 → 更多来自该创作者和相似创作者的内容",
              ],
            },
            {
              title: "过滤气泡：当相似度收窄了你的世界",
              body: [
                "这里有一个必须诚实面对的取舍。因为系统不断给你看与你已经喜欢的东西最相似的内容，你的信息流会变得越来越窄。这就叫过滤气泡：你最后只看到一小片内容，而完全错过了其他话题、观点和创作者。",
                "过滤气泡的影响远不止娱乐。如果一个新闻或观点信息流只给你看你本来就认同的看法，你可能会以为所有人都这么想，也很少遇到那些能挑战你的好想法。过滤气泡并不是「坏」的人工智能造成的，它是一个系统恰恰在做它被造出来要做的事，也就是最大化与你过往行为的相似度，所带来的副作用。明白了这一点，你就能反过来推一把：去搜索新话题、关注不同的创作者，或者使用那些能增加多样性的功能。",
              ],
              examples: [
                "看了一个视频之后，整个信息流就只剩下某一种爱好",
                "只呈现某个议题一方观点的新闻信息流",
                "从不给你看更便宜或不同品牌的购物网站",
              ],
            },
          ],
          workedExample: {
            title: "一次点击如何让信息流变窄",
            steps: [
              "你打开一个视频应用；信息流内容很杂：体育、科学、音乐、喜剧、烹饪。",
              "你把一个科学视频从头看到尾。这是很强的正面反馈。",
              "系统找出与它最相似的视频并把它们往上提，因为相似度说的是「多展示一些和他看完的那个像的内容」。",
              "你又看了几个科学视频；每看完一个，都是又一次朝着同一方向的反馈。",
              "现在信息流几乎全是科学。你可能同样喜欢的音乐和喜剧视频却难得出现：你已经滑进了一个由你自己的反馈造出来的过滤气泡。",
              "要把它撑开，你可以刻意搜索一个新话题、跳过几个科学视频，或者用「不感兴趣」的按钮发出不一样的反馈。",
            ],
            takeaway: "相似度加上你的反馈让推荐变得好用，但同样这个循环也可能悄悄把你的信息流收成一个过滤气泡，除非你主动去把它撑开。",
          },
          visuals: [
            {
              title: "推荐的反馈循环",
              summary: "一个包含四个阶段的环形流程。阶段 1：你观看、点赞或跳过某个内容（反馈）。阶段 2：系统更新它对你口味的判断。阶段 3：它找出与你喜欢过的内容最相似的东西。阶段 4：它把这些内容展示给你，从而影响你接下来看什么，箭头再绕回阶段 1。图注指出：这个循环很有用，但随着时间推移，它往往会围着一小撮内容越收越紧，形成过滤气泡。",
              caption: "这个循环学得很快，但每转一圈都可能把你的信息流拉向更窄的一批相似内容。",
            },
            {
              title: "过滤气泡形成前后的信息流",
              summary: "之前：一个均衡的信息流，五个话题占比大致相当，包括体育、科学、音乐、喜剧和烹饪。之后：在看完一个科学视频以及随后几个之后，同一个信息流现在几乎全是科学，其他话题只剩极细的一条。这个变化说明相似度和反馈如何把一个多样的信息流变成一个狭窄的信息流，并指出那些能找回多样性的做法（搜索新话题、跳过、标记「不感兴趣」）。",
            },
          ],
          activity: {
            title: "推荐系统搭建器",
            goal: "搭建一个基于内容的推荐器：给项目打分、选择哪些特征重要、阅读会自我解释的推荐结果，并做一次过滤气泡实验。",
            overview: "给一个虚构目录里的项目打分，并设定每个特征有多重要。一个透明且确定性的推荐器会构建出一份偏好画像，并按加权特征相似度为其余每个项目打分，而且每条推荐都附有一句通俗的「你为什么会看到这个」，以及拉高或拉低它得分的那些特征。当可依据的信息不足时，会出现数据不足的提示。之后做过滤气泡实验：只给一个话题打分，看着信息流变窄，把当前状态存下来，再加入一个不同的话题或打开「探索」模式，然后作对比。不需要账号，也不涉及个人数据，只用内置的目录。",
            steps: [
              "从目录里给几个你喜欢或不喜欢的项目打分。",
              "用权重滑块选择哪些特征更重要。",
              "阅读推荐结果，以及每一条的解释和起作用的特征。",
              "做过滤气泡实验：只用一个话题，存下当前状态，然后加入一个话题或打开探索模式，并作对比。",
            ],
            materials: [
              "本活动中内置的推荐搭建器和目录",
            ],
            successCriteria: [
              "通过给项目打分建立了一份画像，并生成了推荐结果。",
              "每条推荐都有解释，并且理解了数据不足的提示。",
              "完成了过滤气泡实验，并描述了信息流如何变窄以及怎样把它撑开。",
            ],
            dataset: {
              name: "虚构的学习活动目录",
              description: "一份内置的、虚构的学习内容目录（活动、书籍、游戏、展览），覆盖六个话题，每一项都有结构化的特征（话题、类型、难度、时长、形式、适龄范围、虚构的受欢迎程度）。不涉及个人数据或账号；打分和解释都是确定性的，并在你的设备上完成。",
              columns: [
                "项目",
                "话题",
                "类型",
                "难度",
                "形式",
                "适龄范围",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "回答这些题，检验你能否解释并质疑推荐系统。",
            questions: [
              {
                prompt: "推荐系统主要靠什么来决定接下来推荐什么？",
                explanation: "推荐系统推荐的是与你喜欢过的内容相似的东西，或者相似的人喜欢过的东西，这就是相似度。",
                choices: [
                  {
                    text: "内容之间的相似度，以及人们口味之间的相似度",
                    explanation: "正确：它会找与你喜欢过的内容相似的东西，或相似的人喜欢过的东西。",
                  },
                  {
                    text: "毫无规律的随机挑选",
                    explanation: "推荐并不是随机的；驱动它的是相似度和你的反馈。",
                  },
                  {
                    text: "标题的字母顺序",
                    explanation: "按标题排序并不是推荐系统挑选展示内容的方式。",
                  },
                  {
                    text: "不管你的口味，一律推最新的",
                    explanation: "新不新可能有一点影响，但主要的驱动力还是与你口味的相似度。",
                  },
                ],
              },
              {
                prompt: "下面哪些是把信息流撑宽、逃出过滤气泡的办法？（选出所有符合的。）",
                explanation: "发出不同的反馈、并有意去寻找多样性，都会把系统从狭窄的气泡里推开；而被动地看完一个个相似视频，只会让气泡越收越紧。",
                choices: [
                  {
                    text: "搜索一个你从没看过的全新话题",
                    explanation: "正确：新的搜索会给系统带来新鲜信号，拓宽你的推荐。",
                  },
                  {
                    text: "关注与你平时不同的创作者",
                    explanation: "正确：不同的创作者带来的多样性，是相似度循环自己不会提供的。",
                  },
                  {
                    text: "继续把一个个和上一个一模一样的视频看到底",
                    explanation: "那是强烈的「多来点这种」反馈，只会让气泡收得更紧，而不是撑开。",
                  },
                  {
                    text: "对重复的推荐使用「不感兴趣」按钮",
                    explanation: "正确：那会发出「少来点这种」的反馈，为其他话题腾出空间。",
                  },
                ],
              },
              {
                prompt: "哪个选项最能解释这个情景里发生的事？",
                scenario: "萨姆看完好几个为学校辩论中某一方辩护的视频之后，他的信息流彻底不再展示另一方的内容，他也开始觉得所有人都和他想的一样。",
                explanation: "系统不断推荐与萨姆看完的内容相似的东西，把他的信息流收窄到单一观点：这就是过滤气泡，而它在新闻和观点上影响最大。",
                choices: [
                  {
                    text: "这个应用没有关于另一方的视频了",
                    explanation: "另一方的内容仍然存在；只是系统不再把它推到前面，因为它和萨姆看过的东西不那么相似。",
                  },
                  {
                    text: "萨姆身处一个由他自己的反馈造出来的过滤气泡里",
                    explanation: "正确：相似度加上他看完的那些视频，把信息流收窄到了单一观点，也就是一个过滤气泡。",
                  },
                  {
                    text: "系统坏了，在随机展示内容",
                    explanation: "它正按设计运转；最大化相似度，恰恰就是造出这个气泡的原因。",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "设计一个戳破气泡的功能",
            prompt: "为一个视频或音乐应用发明一个功能，既能帮人逃出过滤气泡，又能让推荐保持有用。",
            steps: [
              "描述这个功能，以及用户会看到什么按钮或控件。",
              "说明它如何改变系统所用的反馈或相似度。",
              "指出一个缺点，例如有些用户并不想要更多样的内容，以及你会怎样应对。",
            ],
            successCriteria: [
              "一个清晰的功能，并配有用户可以使用的控件。",
              "说明了它如何把信息流撑宽。",
              "一个诚实的缺点，以及对它的回应。",
            ],
          },
          reflection: [
            {
              prompt: "在你自己的生活里，你在哪些地方注意到某个信息流随着时间变得越来越窄？",
            },
            {
              prompt: "什么时候过滤气泡基本无害，什么时候它又可能真的要紧？",
            },
          ],
          recap: {
            summary: "推荐系统利用相似度和你的反馈来推荐接下来的内容，这很有用，但除非你主动去撑开，否则它可能把你的信息流收成一个过滤气泡。",
            keyPoints: [
              "推荐系统推荐的是与你（或和你相似的人）喜欢过的内容相似的东西。",
              "你的点赞、跳过和观看时长，就是训练你信息流的反馈。",
              "同样这个循环也会造出过滤气泡；主动搜索和给出多样的反馈，能把信息流撑宽。",
            ],
          },
          extension: {
            title: "你的反馈让谁受益？",
            body: [
              "推荐系统常常被设计成让你一直看下去，因为更长的观看时长可能意味着公司赚更多钱。这个目标未必和你「广泛学习」或「好好花时间」的目标一致。",
              "说明公司的目标（更长的观看时长）和用户的目标（多样性、把时间花得值）如何可能背道而驰，并提出一项诚实的设计改动，它即便会降低观看时长，也能更好地服务用户。",
            ],
          },
        },
      ],
    },
  ],
}

const pt: DeepPartial<IntroToAiCourse> = {
  title: "Introdução à Inteligência Artificial",
  subtitle: "Um curso de seis semanas em que alunos do 5.º ao 8.º ano aprendem o que a IA realmente é, como os dados treinam um modelo, onde a IA erra e como usá-la com responsabilidade.",
  description: "Descubra o que é a IA e como ela funciona por meio de atividades adequadas à idade. Explore como os dados ensinam um modelo, como funcionam a IA de imagens e a de texto e onde elas falham, e como usar a IA de forma justa e segura, terminando com o projeto da sua própria IA em um estúdio de design. Não é preciso ter experiência em programação.",
  gradeRange: "5.º ao 8.º ano",
  duration: "6 semanas",
  estimatedTotalTime: "Cerca de 7-9 horas",
  requirements: [
    "Não é preciso ter experiência em programação",
    "Funciona em um navegador web, nos Chromebooks, tablets ou notebooks da escola",
    "Os conjuntos de dados já vêm incluídos: sem downloads nem contas",
    "Não é preciso câmera nem microfone",
    "Nenhuma informação pessoal é necessária",
  ],
  learningOutcomes: [
    "Distinguir a inteligência artificial de softwares comuns e da automação.",
    "Explicar como exemplos, rótulos e características treinam um modelo, e por que importa que os dados estejam equilibrados e rotulados corretamente.",
    "Ler a acurácia e a confiança de um modelo, e interpretar falsos positivos, falsos negativos e uma matriz de confusão.",
    "Descrever como funcionam os chatbots, os modelos de linguagem e os sistemas de recomendação, e onde eles erram.",
    "Verificar se uma IA tem viés, proteger a privacidade, conferir informações e saber quando as pessoas precisam continuar no comando.",
    "Projetar, prototipar, testar e apresentar uma solução de IA responsável para um problema real.",
  ],
  finalProjectPreview: "No Estúdio de Design de IA da semana 6, você projeta uma ferramenta de IA que ajuda um grupo real de pessoas: define o problema, decide se a IA se encaixa, planeja as entradas e as saídas, esboça um protótipo, escreve casos de teste e explica como manteria tudo justo, privado e sob supervisão humana.",
  skills: [
    {
      label: "Distinguir IA de software comum",
      description: "Decidir se uma tecnologia segue regras escritas ou aprende padrões a partir de exemplos.",
    },
    {
      label: "Raciocinar sobre dados",
      description: "Usar exemplos, rótulos e características, e julgar se um conjunto de dados está equilibrado e rotulado corretamente.",
    },
    {
      label: "Avaliar um modelo",
      description: "Ler acurácia, confiança e matrizes de confusão, e identificar falsos positivos, falsos negativos e casos-limite.",
    },
    {
      label: "Entender IA de texto e recomendações",
      description: "Explicar árvores de decisão, a previsão do texto seguinte, e como se formam as recomendações e as bolhas de filtro.",
    },
    {
      label: "Usar a IA com responsabilidade",
      description: "Verificar vieses, proteger a privacidade, conferir as fontes e saber quando são necessárias supervisão humana e possibilidade de recurso.",
    },
    {
      label: "Projetar uma solução de IA",
      description: "Definir um problema, decidir se a IA se encaixa, planejar entradas e saídas, prototipar, testar e apresentar.",
    },
  ],
  materials: {
    required: [
      {
        name: "Um navegador web em um Chromebook, tablet ou notebook da escola",
        note: "Sem instalações. Funciona nos aparelhos fornecidos pela escola.",
      },
      {
        name: "Papel e lápis, ou um aplicativo de notas",
      },
      {
        name: "Conjuntos de dados inclusos",
        note: "Vêm dentro do curso: sem downloads nem contas.",
      },
    ],
    optional: [
      {
        name: "Um aparelho pessoal para explorar os aplicativos dele",
        note: "Apenas para achar exemplos de IA no mundo real; nunca é obrigatório, e nenhum dado pessoal é coletado.",
      },
      {
        name: "Folhas de atividades impressas",
        note: "Para as turmas que preferem trabalhar no papel.",
      },
    ],
  },
  weeks: [
    {
      title: "O que a IA é e o que não é",
      subtitle: "Distinga a inteligência artificial de softwares comuns e perceba a IA que já está ao seu redor.",
      summary: "Os alunos aprendem o que inteligência artificial realmente significa, como ela se diferencia dos programas tradicionais e da automação, e como reconhecer a IA do dia a dia que já usam, sempre perguntando se o software segue regras escritas ou aprende padrões a partir de exemplos.",
      bigQuestion: "O que faz de algo \"inteligência artificial\" em vez de software comum?",
      estimatedTime: "2,5-3 horas",
      objectives: [
        "Definir inteligência artificial e distingui-la de softwares tradicionais.",
        "Explicar a diferença entre automação e aprendizado de máquina.",
        "Acompanhar a entrada, as regras, a saída e os padrões aprendidos.",
        "Reconhecer a IA do dia a dia e as decisões humanas por trás dela.",
      ],
      requiredConcepts: [
        "Inteligência artificial",
        "Automação",
        "Programas tradicionais",
        "Aprendizado de máquina",
        "Entrada",
        "Regra",
        "Saída",
        "Padrão aprendido",
        "As decisões humanas por trás da IA",
      ],
      lessons: [
        {
          title: "É IA ou não?",
          summary: "Separe as tecnologias do dia a dia entre inteligência artificial e software comum, e aprenda a única pergunta que distingue as duas.",
          estimatedTime: "45-55 minutos",
          objectives: [
            {
              text: "Explicar com suas próprias palavras o que significa inteligência artificial.",
            },
            {
              text: "Diferenciar a IA de softwares comuns (tradicionais).",
            },
            {
              text: "Dar três exemplos de IA que você encontra no dia a dia.",
            },
          ],
          materials: [
            {
              name: "Esta aula em um navegador web",
            },
            {
              name: "Papel e lápis, ou um aplicativo de notas",
            },
            {
              name: "Um aparelho que você usa bastante (celular, tablet, notebook) para olhar os aplicativos dele",
              note: "Para reunir os seus próprios exemplos.",
            },
          ],
          vocabulary: [
            {
              term: "Inteligência artificial (IA)",
              definition: "Software de computador que faz tarefas que normalmente parecem exigir o pensamento humano, como reconhecer imagens, entender linguagem ou fazer previsões.",
            },
            {
              term: "Programa tradicional",
              definition: "Software que segue regras exatas escritas por uma pessoa, passo a passo, e faz sempre a mesma coisa para a mesma entrada.",
            },
            {
              term: "Entrada",
              definition: "A informação que você dá a um programa, como uma foto, uma frase ou um toque em um botão.",
            },
            {
              term: "Saída",
              definition: "O resultado que um programa devolve, como uma resposta, um rótulo ou uma ação.",
            },
          ],
          openingScenario: {
            prompt: "Uma calculadora soma números. Um aplicativo de fotos encontra todas as imagens do seu cachorro. Os dois são software. Algum deles é \"inteligência artificial\"? Como você decidiria?",
            context: "Guarde a sua primeira resposta: você vai conferi-la no fim da aula.",
          },
          predictionPrompt: {
            prompt: "Preveja: entre uma calculadora, um filtro de spam, um interruptor de luz e um assistente de voz, quais você acha que usam IA?",
            howToCheck: "Enquanto lê os conceitos abaixo, decida se cada um apenas segue regras fixas ou se aprende padrões a partir de exemplos.",
          },
          concepts: [
            {
              title: "O que \"inteligência artificial\" realmente significa",
              body: [
                "Inteligência artificial é software que faz trabalhos que normalmente parecem exigir o pensamento humano, como diferenciar um gato de um cachorro em uma foto, entender uma pergunta falada ou adivinhar de que filme você pode gostar.",
                "A palavra \"artificial\" significa feito por pessoas, e \"inteligência\" aponta para essas tarefas parecidas com pensar. A IA não é um corpo de robô e não é viva. É um programa rodando em um computador.",
              ],
              misconception: "Um robô não é a mesma coisa que IA. Muitos robôs apenas seguem instruções fixas, e muita IA (como um filtro de spam) não tem corpo nenhum.",
              examples: [
                "Um celular que desbloqueia quando reconhece o seu rosto",
                "Um aplicativo que transforma a sua fala em texto",
                "Um site de vídeos que recomenda o que assistir em seguida",
              ],
            },
            {
              title: "O software tradicional segue regras exatas",
              body: [
                "A maior parte dos softwares é um programa tradicional: uma pessoa escreveu regras exatas, e o computador as segue do mesmo jeito toda vez. Uma calculadora sempre devolve 4 para 2 + 2 porque alguém programou essa regra.",
                "Programas tradicionais são previsíveis. Se você conhece a entrada e as regras, consegue saber a saída. Ninguém precisou mostrar à calculadora milhares de exemplos de adição: a regra foi escrita diretamente.",
              ],
              examples: [
                "Um aplicativo de calculadora",
                "Um controlador de luz que acende uma lâmpada quando você toca um botão",
                "Um alarme que toca exatamente na hora que você marcou",
              ],
            },
            {
              title: "A IA aprende padrões em vez de apenas seguir regras escritas",
              body: [
                "A IA funciona de outro jeito. Em vez de uma pessoa escrever cada regra, o software recebe muitos exemplos e encontra padrões neles. É por isso que um aplicativo de fotos consegue identificar um cachorro que nunca viu: ele aprendeu com que os cachorros costumam se parecer a partir de um monte de fotos de cachorro.",
                "Então a pergunta-chave é: alguém escreveu regras exatas para isso, ou o software aprendeu padrões a partir de exemplos? Se aprendeu com exemplos, provavelmente é IA.",
              ],
              examples: [
                "Um filtro de spam que aprendeu como é um e-mail indesejado a partir de milhões de mensagens",
                "Um assistente de voz que aprendeu a reconhecer muitas vozes e sotaques",
                "Um aplicativo de mapas que prevê o trânsito a partir de padrões de viagens anteriores",
              ],
            },
          ],
          workedExample: {
            title: "Decidindo: um filtro de spam é IA?",
            steps: [
              "Diga qual é a entrada e qual é a saída. Entrada: um e-mail. Saída: um rótulo, \"spam\" ou \"não é spam\".",
              "Pergunte: alguém escreveu uma regra exata para cada e-mail? Não, existem e-mails demais possíveis, e quem manda spam vive mudando as palavras.",
              "Pergunte: mostraram exemplos a ele? Sim, ele aprendeu com milhões de e-mails que as pessoas já tinham marcado como spam ou não.",
              "Como aprendeu padrões a partir de exemplos em vez de seguir uma regra fixa escrita à mão, o filtro de spam é IA.",
            ],
            takeaway: "Para classificar algo, ache a entrada e a saída, e depois pergunte se aquilo segue regras escritas ou se aprendeu com exemplos.",
          },
          visuals: [
            {
              title: "Duas maneiras de um software funcionar",
              summary: "Dois caminhos da entrada até a saída. Caminho tradicional: a entrada vai para \"Regras escritas por uma pessoa\", que produzem a saída. Caminho da IA: a entrada vai para \"Padrões aprendidos com exemplos\", que produzem a saída. A diferença está na caixa do meio: regras escritas à mão contra padrões aprendidos.",
              caption: "O passo do meio é o que separa o software tradicional da IA.",
              beforeAfter: {
                before: {
                  label: "Software tradicional",
                  items: [
                    "A entrada chega",
                    "As regras escritas por uma pessoa decidem",
                    "Saída",
                  ],
                },
                after: {
                  items: [
                    "A entrada chega",
                    "Os padrões aprendidos com exemplos decidem",
                    "Saída",
                  ],
                },
              },
            },
            {
              title: "Regras contra padrões aprendidos, de relance",
              summary: "Uma tabela comparativa. Calculadora: regras escritas por uma pessoa, sempre a mesma saída, não é IA. Filtro de spam: padrões aprendidos com exemplos, dá conta de e-mails novos, é IA. Interruptor de luz: regra escrita por uma pessoa, não é IA. Assistente de voz: padrões aprendidos com exemplos, é IA.",
              table: {
                columns: [
                  "Tecnologia",
                  "Como ela decide",
                ],
                rows: [
                  [
                    "Calculadora",
                    "Regras fixas escritas por uma pessoa",
                  ],
                  [
                    "Interruptor de luz",
                    "Regra fixa (botão → luz)",
                  ],
                  [
                    "Filtro de spam",
                    "Padrões aprendidos com exemplos",
                  ],
                  [
                    "Assistente de voz",
                    "Padrões aprendidos com exemplos",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "Detetive de IA",
            goal: "Decidir se cada tecnologia do dia a dia usa IA, e dar o motivo.",
            overview: "Você vai analisar um conjunto de tecnologias do dia a dia e classificar cada uma como \"usa IA\" ou \"software comum\". Para cada uma, escreve a entrada, a saída e o único motivo da sua escolha.",
            steps: [
              "Para cada tecnologia, anote a entrada e a saída dela.",
              "Faça a pergunta-chave: regras fixas escritas por uma pessoa, ou padrões aprendidos com exemplos?",
              "Classifique como \"usa IA\" ou \"software comum\" e escreva o seu motivo em uma frase.",
              "Compare com um colega e conversem sobre aquelas em que vocês discordaram.",
            ],
            materials: [
              "Papel e lápis, ou um aplicativo de notas",
            ],
            successCriteria: [
              "Toda tecnologia tem uma entrada e uma saída anotadas.",
              "Toda escolha tem um motivo claro baseado em regras contra padrões aprendidos.",
              "Você consegue explicar pelo menos um caso que achou difícil.",
            ],
            dataset: {
              name: "Cartas de tecnologia do dia a dia",
              description: "Um conjunto já incluído de tecnologias conhecidas (calculadora, desbloqueio facial, termostato, busca de fotos, corretor ortográfico, feed de recomendações e mais) para classificar.",
            },
          },
          knowledgeCheck: {
            instructions: "Responda a estas perguntas para conferir se você sabe distinguir a IA de softwares comuns.",
            questions: [
              {
                prompt: "Qual é a melhor pista de que um software é IA, e não um programa tradicional?",
                explanation: "O que define a IA é aprender padrões a partir de exemplos, em vez de seguir apenas regras que uma pessoa escreveu à mão.",
                choices: [
                  {
                    text: "Ele roda em um computador.",
                    explanation: "Todo software roda em um computador, então isso não separa a IA de nada.",
                  },
                  {
                    text: "Ele aprendeu padrões a partir de muitos exemplos.",
                    explanation: "Correto: aprender padrões a partir de exemplos é o sinal principal da IA.",
                  },
                  {
                    text: "Ele é rápido.",
                    explanation: "A velocidade não decide se algo é IA; uma calculadora é rápida e não é IA.",
                  },
                  {
                    text: "Ele tem uma tela.",
                    explanation: "Ter tela é coisa do aparelho, não de o software aprender ou não.",
                  },
                ],
              },
              {
                prompt: "Decida se a afirmação é verdadeira ou falsa.",
                statement: "Uma calculadora simples é um exemplo de inteligência artificial.",
                explanation: "Uma calculadora segue regras exatas escritas por uma pessoa e nunca aprende com exemplos, então é software tradicional, e não IA.",
              },
              {
                prompt: "Qual tecnologia desta situação está usando IA?",
                scenario: "Maya marca um alarme para as 7:00. O celular dela também sugere uma lembrança em fotos de \"um ano atrás\", encontrando imagens parecidas dela na praia.",
                explanation: "O alarme segue uma regra fixa (tocar às 7:00). Encontrar fotos parecidas da praia exige reconhecer padrões em imagens, e isso é IA.",
                choices: [
                  {
                    text: "O alarme tocando às 7:00",
                    explanation: "O alarme só segue a regra exata do horário que você marcou: software tradicional.",
                  },
                  {
                    text: "Agrupar fotos parecidas da praia em uma lembrança",
                    explanation: "Correto: reconhecer quais fotos se parecem é uma tarefa de padrão aprendido, então é IA.",
                  },
                  {
                    text: "Nenhum dos dois usa IA",
                    explanation: "A lembrança em fotos usa sim IA para reconhecer imagens parecidas.",
                  },
                ],
              },
              {
                prompt: "Qual destes robôs mostra sinais de IA?",
                scenario: "O robô A sempre percorre exatamente o mesmo caminho quadrado que uma pessoa programou. O robô B usa uma câmera para reconhecer e pegar só os blocos vermelhos que aprendeu a identificar.",
                explanation: "Ter corpo de robô não faz de algo uma IA. O robô A só repete instruções fixas. O robô B reconhece objetos a partir de padrões aprendidos, e isso é IA.",
                choices: [
                  {
                    text: "O robô A, porque se move sozinho",
                    explanation: "Mover-se sozinho não basta: o robô A apenas repete um caminho fixo e pré-programado.",
                  },
                  {
                    text: "O robô B, porque reconhece objetos que aprendeu",
                    explanation: "Correto: reconhecer objetos aprendidos é uma tarefa de aprendizado de máquina, então o robô B mostra IA.",
                  },
                  {
                    text: "Os dois, porque ambos são robôs",
                    explanation: "Ser robô não faz de algo inteligente; o robô A só segue passos fixos.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Ache três IAs no seu dia",
            prompt: "Sozinho, ache três exemplos de IA que você realmente usou ou viu no último dia, e um exemplo de software comum.",
            steps: [
              "Liste três tecnologias que você usou recentemente e que aprendem com exemplos.",
              "Para cada uma, diga a entrada e a saída.",
              "Acrescente um exemplo de software comum e explique por que ele não é IA.",
            ],
            successCriteria: [
              "Três exemplos reais de IA, cada um com entrada e saída.",
              "Um exemplo de software comum com um motivo para não ser IA.",
            ],
          },
          reflection: [
            {
              prompt: "O que mais te surpreendeu sobre quais tecnologias usam IA e quais não usam?",
            },
            {
              prompt: "A sua previsão do começo estava certa? O que te fez mudar de ideia?",
            },
          ],
          recap: {
            summary: "IA é software que aprende padrões a partir de exemplos, enquanto programas tradicionais seguem regras exatas escritas por uma pessoa.",
            keyPoints: [
              "A IA faz tarefas que parecem exigir pensamento humano, como reconhecer imagens ou linguagem.",
              "A pergunta-chave é: regras escritas, ou padrões aprendidos com exemplos?",
              "O dia a dia é cheio de IA: desbloqueio facial, recomendações, assistentes de voz.",
            ],
          },
          extension: {
            title: "Onde fica a linha?",
            body: [
              "Algumas tecnologias misturam as duas abordagens. Um aplicativo de e-mail moderno pode usar uma regra escrita à mão para bloquear um endereço já conhecido como ruim E um modelo de IA para pegar spam novo que ele nunca viu.",
              "Ache uma tecnologia que você acha que usa tanto regras fixas quanto padrões aprendidos. Descreva qual parte é qual, e por que quem projetou talvez tenha querido combinar as duas.",
            ],
          },
        },
        {
          title: "Regras contra padrões aprendidos",
          summary: "Olhe de perto a automação e o aprendizado de máquina: quando é uma pessoa que escreve as regras e quando o software aprende padrões a partir de exemplos.",
          estimatedTime: "45-55 minutos",
          objectives: [
            {
              text: "Definir automação e aprendizado de máquina e distinguir os dois.",
            },
            {
              text: "Acompanhar como entrada, regras e saída funcionam em um programa tradicional.",
            },
            {
              text: "Explicar como um padrão aprendido substitui as regras escritas à mão no aprendizado de máquina.",
            },
          ],
          materials: [
            {
              name: "Esta aula em um navegador web",
            },
            {
              name: "Papel e lápis, ou um aplicativo de notas",
            },
          ],
          vocabulary: [
            {
              term: "Automação",
              definition: "Fazer uma tarefa acontecer sozinha usando regras fixas, sem uma pessoa executando cada passo.",
            },
            {
              term: "Aprendizado de máquina",
              definition: "Um tipo de IA em que o software aprende padrões a partir de muitos exemplos, em vez de receber cada regra.",
            },
            {
              term: "Regra",
              definition: "Uma instrução exata que uma pessoa escreve, como \"se a temperatura ficar abaixo de 20 graus, ligue o aquecedor\".",
            },
            {
              term: "Padrão aprendido",
              definition: "Uma regularidade que o software descobriu a partir de exemplos e usa para decidir sobre entradas novas.",
            },
          ],
          openingScenario: {
            prompt: "Um termostato liga o aquecedor quando um cômodo fica abaixo de 20 graus. Um aplicativo de música monta uma playlist de músicas \"de que você pode gostar\". Os dois agem sozinhos. Eles estão fazendo o mesmo tipo de raciocínio?",
          },
          predictionPrompt: {
            prompt: "Preveja: dos dois, o termostato ou o montador de playlists, qual precisou que alguém lhe mostrasse milhares de exemplos?",
            howToCheck: "Leia os conceitos e decida qual funciona com uma regra fixa e qual aprendeu um padrão.",
          },
          concepts: [
            {
              title: "Automação: uma tarefa que se executa sozinha com regras fixas",
              body: [
                "Automação significa que uma tarefa acontece automaticamente seguindo regras definidas por uma pessoa. Um termostato automatiza o aquecimento: \"se o cômodo estiver abaixo de 20 graus, ligue o aquecedor\". Ninguém precisa apertar um botão, mas um ser humano ainda assim escreveu a regra exata.",
                "A automação pode ser muito útil e mesmo assim não ser IA. A máquina não está aprendendo: ela está repetindo instruções fielmente.",
              ],
              examples: [
                "Um termostato aquecendo um cômodo a uma temperatura definida",
                "Uma porta automática que abre quando um sensor é acionado",
                "Uma lava-louças rodando um ciclo de lavagem cronometrado",
              ],
            },
            {
              title: "Entrada, regra, saída: o formato de um programa tradicional",
              body: [
                "Programas tradicionais e automações simples têm o mesmo formato: uma entrada chega, uma regra decide o que fazer e uma saída acontece. Entrada: a temperatura do cômodo. Regra: abaixo de 20 → aquecedor ligado. Saída: o aquecedor liga.",
                "Como uma pessoa escreveu a regra, você consegue prever a saída para qualquer entrada. Isso é muito poderoso em tarefas com regras claras e que não mudam.",
              ],
              examples: [
                "Entrada: uma moeda; Regra: moeda detectada → soltar chiclete; Saída: chiclete",
                "Entrada: uma senha; Regra: bate com a senha guardada → desbloquear; Saída: desbloqueado",
              ],
            },
            {
              title: "Aprendizado de máquina: o software acha o padrão",
              body: [
                "Algumas tarefas são bagunçadas demais para uma pessoa escrever cada regra. Que regra distingue, para você, uma boa recomendação de música de uma ruim? Em vez disso, o aprendizado de máquina mostra ao software muitos exemplos (músicas de que você gostou e que você pulou) e ele aprende um padrão que consegue aplicar a músicas novas.",
                "A grande virada: no aprendizado de máquina, um padrão aprendido toma o lugar das regras escritas à mão. As pessoas continuam escolhendo os exemplos e conferindo os resultados, mas não detalham cada regra.",
              ],
              examples: [
                "Um montador de playlists que aprendeu o seu gosto a partir das músicas que você tocou e pulou",
                "Um leitor de letra à mão que aprendeu o formato das letras a partir de muitas amostras",
              ],
            },
          ],
          workedExample: {
            title: "Regra ou padrão aprendido? Dois jeitos de separar frutas",
            steps: [
              "Tarefa: separar fotos de maçãs e bananas.",
              "Pelo caminho das regras: uma pessoa escreve \"se o formato for comprido e amarelo → banana; senão, maçã\". Isso funciona até aparecer uma banana verde ou uma maçã amarela.",
              "Pelo caminho do aprendizado: mostre ao software centenas de fotos rotuladas de maçãs e bananas; ele aprende os padrões de cada uma, inclusive as cores complicadas.",
              "O caminho das regras é simples, mas frágil. O caminho do aprendizado lida melhor com exemplos novos e incomuns, e é por isso que tarefas bagunçadas usam aprendizado de máquina.",
            ],
            takeaway: "Use regras fixas quando a regra for clara e não mudar; use aprendizado de máquina quando o padrão for bagunçado demais para escrever à mão.",
          },
          visuals: [
            {
              title: "Entrada, regra, saída",
              summary: "Um fluxo de três passos: Entrada (temperatura do cômodo) → Regra (\"abaixo de 20 → aquecedor ligado\") → Saída (o aquecedor liga). Esse é o formato da automação e dos programas tradicionais.",
              caption: "Na automação, é uma pessoa que escreve a regra do meio.",
              flow: {
                nodes: [
                  {
                    label: "Entrada",
                    note: "Temperatura do cômodo",
                  },
                  {
                    label: "Regra",
                    note: "Abaixo de 20 → aquecedor ligado",
                  },
                  {
                    label: "Saída",
                    note: "O aquecedor liga",
                  },
                ],
              },
            },
            {
              title: "De onde vem o padrão",
              summary: "Antes (tradicional): uma pessoa escreve a regra e o programa a usa. Depois (aprendizado de máquina): uma pessoa reúne exemplos rotulados, o software aprende um padrão com eles e o programa usa esse padrão aprendido. O trabalho da pessoa deixa de ser escrever regras e passa a ser escolher bons exemplos.",
              beforeAfter: {
                before: {
                  label: "Tradicional",
                  items: [
                    "Uma pessoa escreve a regra",
                    "O programa segue a regra",
                  ],
                },
                after: {
                  label: "Aprendizado de máquina",
                  items: [
                    "Uma pessoa reúne exemplos rotulados",
                    "O software aprende um padrão",
                    "O programa usa o padrão aprendido",
                  ],
                },
              },
            },
          ],
          activity: {
            title: "Desafio de montar regras",
            goal: "Tentar escrever regras fixas para uma tarefa e depois ver onde as regras fixas quebram e onde o aprendizado ajudaria.",
            overview: "Você vai escrever regras passo a passo para classificar um pequeno conjunto de itens (por exemplo, \"este animal é uma ave?\"). Depois vai testar as suas regras com exemplos complicados e marcar onde elas falham: exatamente os pontos em que um padrão aprendido se sairia melhor.",
            steps: [
              "Escolha a tarefa e escreva as suas regras como passos claros do tipo \"se … então …\".",
              "Aplique as suas regras à mão nos exemplos fáceis.",
              "Agora teste os exemplos complicados (um pinguim, um avestruz) e marque onde as suas regras dão a resposta errada.",
              "Escreva uma frase: por que aprender com muitos exemplos lidaria melhor com esses casos?",
            ],
            materials: [
              "Papel e lápis, ou um aplicativo de notas",
            ],
            successCriteria: [
              "Pelo menos três regras claras escritas como \"se … então …\".",
              "Pelo menos um exemplo complicado em que as regras falham foi identificado.",
              "Uma frase explicando por que padrões aprendidos lidam melhor com casos bagunçados.",
            ],
            dataset: {
              name: "Cartas de \"é uma ave?\"",
              description: "Um conjunto já incluído de animais, com casos fáceis e casos complicados (pinguim, morcego, avestruz) para testar regras escritas à mão.",
            },
          },
          knowledgeCheck: {
            instructions: "Confira se você sabe distinguir automação de aprendizado de máquina.",
            questions: [
              {
                prompt: "Qual é a principal diferença entre automação e aprendizado de máquina?",
                explanation: "A automação segue regras fixas escritas por uma pessoa; o aprendizado de máquina acha padrões a partir de exemplos.",
                choices: [
                  {
                    text: "A automação é mais rápida que o aprendizado de máquina.",
                    explanation: "A velocidade não é a diferença; os dois podem ser rápidos ou lentos.",
                  },
                  {
                    text: "A automação segue regras escritas; o aprendizado de máquina aprende padrões a partir de exemplos.",
                    explanation: "Correto: essa é a diferença central.",
                  },
                  {
                    text: "Só o aprendizado de máquina usa computador.",
                    explanation: "Os dois rodam em computadores.",
                  },
                  {
                    text: "São dois nomes para a mesma coisa.",
                    explanation: "São coisas diferentes: regras contra padrões aprendidos.",
                  },
                ],
              },
              {
                prompt: "Coloque em ordem os passos de um programa tradicional.",
                explanation: "Um programa tradicional recebe uma entrada, aplica uma regra e produz uma saída.",
                items: [
                  {
                    text: "Uma entrada chega (como uma leitura de temperatura)",
                  },
                  {
                    text: "Uma regra escrita por uma pessoa decide o que fazer",
                  },
                  {
                    text: "Uma saída acontece (como o aquecedor ligando)",
                  },
                ],
              },
              {
                prompt: "Qual tarefa combina mais com aprendizado de máquina do que com regras escritas à mão?",
                scenario: "Você quer um software que (A) ligue um ventilador quando o cômodo passar de 27 graus, ou (B) diga se uma foto mostra um cachorro ou um gato.",
                explanation: "O ventilador é uma regra fixa e clara. Diferenciar cachorros de gatos em qualquer foto é bagunçado demais para regras escritas à mão e combina com aprendizado de máquina.",
                choices: [
                  {
                    text: "Ligar um ventilador acima de 27 graus",
                    explanation: "Essa é uma regra clara: a automação dá conta tranquilamente.",
                  },
                  {
                    text: "Diferenciar um cachorro de um gato em uma foto",
                    explanation: "Correto: esse padrão é bagunçado demais para escrever à mão, então o aprendizado de máquina se encaixa.",
                  },
                  {
                    text: "As duas são igualmente fáceis de escrever como regras",
                    explanation: "A tarefa da foto é muito difícil de capturar com regras fixas.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Regra ou aprendizado?",
            prompt: "Proponha duas tarefas: uma que regras fixas resolvem bem, e outra que precisa de aprendizado de máquina.",
            steps: [
              "Descreva uma tarefa em que uma pessoa consiga escrever a regra com facilidade. Enuncie a regra.",
              "Descreva uma tarefa bagunçada demais para regras fixas. Explique por quê.",
              "Para a tarefa bagunçada, que exemplos você reuniria para ensiná-la?",
            ],
            successCriteria: [
              "Uma tarefa clara baseada em regras, com a regra dela.",
              "Uma tarefa baseada em aprendizado, com um motivo para as regras não funcionarem.",
              "Uma descrição dos exemplos necessários para ensinar a tarefa bagunçada.",
            ],
          },
          reflection: [
            {
              prompt: "Quando é melhor escrever você mesmo as regras em vez de usar aprendizado de máquina?",
            },
            {
              prompt: "Onde as suas regras escritas à mão quebraram durante a atividade?",
            },
          ],
          recap: {
            summary: "A automação repete regras fixas; o aprendizado de máquina aprende padrões a partir de exemplos para tarefas bagunçadas demais para resolver com regras feitas à mão.",
            keyPoints: [
              "Programas tradicionais seguem entrada → regra → saída.",
              "O aprendizado de máquina troca as regras escritas à mão por um padrão aprendido.",
              "No aprendizado de máquina, as pessoas continuam escolhendo os exemplos e conferindo os resultados.",
            ],
          },
          extension: {
            title: "Quem decide os exemplos?",
            body: [
              "No aprendizado de máquina, os exemplos com que um sistema aprende são escolhidos por pessoas. Isso quer dizer que há decisões humanas embutidas em todo modelo: quais exemplos incluir e qual é o rótulo correto.",
              "Pense em uma tarefa que você ensinaria a um modelo. Quem escolheria os exemplos, e como as escolhas dessa pessoa poderiam mudar o que o modelo aprende?",
            ],
          },
        },
        {
          title: "Investigação de aparelhos da semana 1",
          summary: "Investigue os aparelhos e aplicativos ao seu redor, mapeie as entradas e saídas deles e descubra as decisões humanas por trás dos recursos de IA em que você confia.",
          estimatedTime: "45-60 minutos",
          objectives: [
            {
              text: "Investigar aparelhos e aplicativos reais para achar recursos de IA.",
            },
            {
              text: "Mapear a entrada e a saída de um recurso de IA que você usa.",
            },
            {
              text: "Identificar as decisões humanas por trás de uma IA do dia a dia.",
            },
          ],
          materials: [
            {
              name: "Esta aula em um navegador web",
            },
            {
              name: "Papel e lápis, ou um aplicativo de notas",
            },
            {
              name: "Um aparelho que você usa bastante, para explorar os aplicativos e as configurações dele",
              note: "Não é preciso mexer em contas nem fornecer dados pessoais: é só olhar os recursos.",
            },
          ],
          vocabulary: [
            {
              term: "Recurso de IA",
              definition: "Uma parte de um aplicativo ou aparelho que usa IA, como busca de fotos, autocompletar ou recomendações.",
            },
            {
              term: "Decisão humana",
              definition: "Uma escolha que uma pessoa fez ao construir uma IA, como quais exemplos usar ou o que conta como resposta certa.",
            },
            {
              term: "IA do dia a dia",
              definition: "IA que você encontra na vida diária comum, muitas vezes sem perceber.",
            },
          ],
          openingScenario: {
            prompt: "Você provavelmente usou várias IAs antes do almoço sem perceber. Quais aplicativos de um celular ou notebook você acha que têm um recurso de IA escondido dentro?",
          },
          predictionPrompt: {
            prompt: "Preveja quantos recursos de IA você vai conseguir achar entre os aplicativos e aparelhos que mais usa.",
            howToCheck: "Investigue cada aplicativo e conte os recursos que aprendem padrões em vez de seguir regras fixas.",
          },
          concepts: [
            {
              title: "A IA está escondida à vista de todos",
              body: [
                "Muitos aplicativos usam IA em silêncio. Seu teclado sugere a próxima palavra, sua câmera clareia rostos, seu mapa prevê o horário de chegada e seu aplicativo de vídeo já engata o próximo clipe. Todos são recursos de IA trabalhando em segundo plano.",
                "Conseguir enxergá-los é uma habilidade de verdade. Assim que você passa a procurar \"padrões aprendidos\", começa a notar IA por toda parte.",
              ],
              examples: [
                "As sugestões de palavras do teclado",
                "Buscar fotos pelo que aparece na imagem (\"cachorro\", \"praia\")",
                "O horário estimado de chegada em um aplicativo de mapas",
              ],
            },
            {
              title: "Todo recurso de IA tem uma entrada e uma saída",
              body: [
                "Você consegue entender qualquer recurso de IA dizendo qual é a entrada e qual é a saída. Autocompletar: a entrada são as letras que você digitou, a saída é uma palavra sugerida. Busca de fotos: a entrada são as suas fotos e uma palavra de busca, a saída são as imagens correspondentes.",
                "Mapear entrada e saída transforma um recurso misterioso em algo que você consegue explicar e questionar.",
              ],
            },
            {
              title: "Houve pessoas decidindo por trás de cada IA",
              body: [
                "Um recurso de IA não apareceu sozinho. Pessoas decidiram o que ele deveria fazer, com quais exemplos treiná-lo e como é uma resposta \"correta\". Essas decisões humanas moldam o comportamento da IA, e determinam se ela funciona bem para todo mundo.",
                "Quando uma IA faz algo surpreendente ou injusto, muitas vezes dá para rastrear até uma decisão humana, como quais exemplos foram reunidos.",
              ],
              examples: [
                "Decidir que o corretor automático deve sugerir palavras comuns",
                "Escolher quais fotos mostrar a um modelo de busca de imagens enquanto ele aprende",
              ],
            },
          ],
          workedExample: {
            title: "Investigando o autocompletar",
            steps: [
              "Escolha o recurso: o teclado sugerindo a sua próxima palavra.",
              "Entrada: as letras e palavras que você digitou até agora.",
              "Saída: uma ou mais palavras sugeridas.",
              "Aprendido ou por regras? Ele aprendeu padrões de palavras comuns a partir de enormes quantidades de texto: isso é IA.",
              "Decisão humana: pessoas escolheram o texto com que ele aprendeu, e é por isso que ele sugere algumas palavras e não outras.",
            ],
            takeaway: "Qualquer recurso de IA fica claro assim que você diz qual é a entrada, qual é a saída e uma decisão humana por trás dele.",
          },
          visuals: [
            {
              title: "Anatomia de um recurso de IA do dia a dia",
              summary: "Um diagrama com rótulos de um recurso de IA. À esquerda: \"Entrada\" (o que você dá a ele). No meio: \"Padrão aprendido\" (treinado com exemplos escolhidos por pessoas). À direita: \"Saída\" (o que ele devolve). Uma nota aponta para o meio: \"Decisões humanas: quais exemplos, o que conta como correto\".",
              caption: "A entrada e a saída ficam visíveis; o padrão aprendido e as decisões humanas ficam escondidos por dentro.",
            },
          ],
          activity: {
            title: "Investigação de aparelhos",
            goal: "Investigar os aplicativos e aparelhos que você usa e documentar os recursos de IA que encontrar.",
            overview: "Você vai investigar aplicativos e aparelhos conhecidos, listar os recursos de IA que encontrar e, para cada um, mapear a entrada, a saída e uma decisão humana por trás dele. Não são necessárias contas, dados pessoais, câmera nem microfone: você só vai descrever recursos.",
            steps: [
              "Liste os aplicativos e aparelhos que você mais usa.",
              "Em cada um, procure algum recurso que aprenda padrões (recomendações, autocompletar, busca de fotos, clareamento de rostos e assim por diante).",
              "Para pelo menos três recursos, escreva a entrada, a saída e uma decisão humana por trás deles.",
              "Compartilhe com a turma a sua descoberta mais surpreendente.",
            ],
            materials: [
              "Papel e lápis, ou um aplicativo de notas",
              "Um aparelho que você usa bastante (opcional)",
            ],
            successCriteria: [
              "Pelo menos três recursos de IA encontrados entre os seus aplicativos e aparelhos.",
              "Cada um tem entrada, saída e uma decisão humana documentadas.",
              "Você consegue explicar por que cada recurso é IA e não regras fixas.",
            ],
            dataset: {
              name: "Lista de aplicativos comuns",
              description: "Uma lista já incluída de tipos comuns de aplicativo (mensagens, mapas, fotos, vídeo, música, navegador) com dicas de onde os recursos de IA costumam se esconder, para quem não tiver um aparelho por perto.",
            },
          },
          knowledgeCheck: {
            instructions: "Confira se você sabe investigar e explicar a IA do dia a dia.",
            questions: [
              {
                prompt: "Quais são as duas coisas que você deve identificar para entender qualquer recurso de IA?",
                explanation: "Identificar a entrada e a saída transforma um recurso misterioso em um que você consegue explicar.",
                choices: [
                  {
                    text: "O preço e a marca dele",
                    explanation: "Preço e marca não explicam como o recurso funciona.",
                  },
                  {
                    text: "A entrada e a saída dele",
                    explanation: "Correto: entrada e saída são a chave para entender qualquer recurso de IA.",
                  },
                  {
                    text: "A cor e o tamanho dele",
                    explanation: "Isso descreve o aparelho, não o recurso de IA.",
                  },
                  {
                    text: "A bateria e a tela dele",
                    explanation: "Essas são peças de hardware, não o jeito como a IA decide.",
                  },
                ],
              },
              {
                prompt: "Decida se a afirmação é verdadeira ou falsa.",
                statement: "O jeito como uma IA se comporta pode ser rastreado até decisões humanas, como com quais exemplos ela aprendeu.",
                explanation: "Verdadeiro: pessoas decidem os exemplos, os rótulos e o que conta como correto, e essas escolhas moldam o comportamento da IA.",
              },
              {
                prompt: "Qual é um exemplo de recurso de IA do dia a dia?",
                scenario: "No ônibus, o celular do Leo sugere a palavra \"biblioteca\" enquanto ele digita \"bibl\", e os fones dele pausam quando ele os tira.",
                explanation: "A sugestão de palavras aprendeu padrões a partir de muito texto, então é um recurso de IA. A pausa dos fones é uma regra fixa de um sensor.",
                choices: [
                  {
                    text: "Os fones pausando quando são tirados",
                    explanation: "Isso é uma regra fixa de sensor, não um padrão aprendido.",
                  },
                  {
                    text: "O teclado sugerindo \"biblioteca\"",
                    explanation: "Correto: a sugestão de palavras aprendeu padrões a partir de texto, então é IA.",
                  },
                  {
                    text: "Nenhum dos dois é um recurso de IA",
                    explanation: "A sugestão de palavras é sim um recurso de IA.",
                  },
                ],
              },
              {
                prompt: "Qual é a classificação mais honesta aqui?",
                scenario: "Um amigo diz que um aplicativo de previsão do tempo \"com certeza é IA\". Mas você não sabe se ele usa equações de física, aprendizado de máquina a partir do tempo passado, ou os dois.",
                explanation: "Sem saber como ele funciona por dentro, não dá para ter certeza. Alguns sistemas de previsão usam equações fixas, outros usam aprendizado de máquina e muitos combinam os dois, então \"informação insuficiente\" é a resposta honesta.",
                choices: [
                  {
                    text: "Com certeza é aprendizado de máquina",
                    explanation: "Não dá para ter certeza: ele pode usar equações de física em vez de aprender com exemplos.",
                  },
                  {
                    text: "Com certeza é um programa de regras fixas",
                    explanation: "Também não dá para ter certeza disso: ele pode aprender com dados de tempo passado.",
                  },
                  {
                    text: "Informação insuficiente para afirmar",
                    explanation: "Correto: sem saber o que há por dentro, a resposta honesta é que falta informação.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Guia de campo de recursos de IA",
            prompt: "Faça um pequeno \"guia de campo\" com cinco recursos de IA que você encontrou, como um guia de natureza, mas de IA.",
            steps: [
              "Escolha cinco recursos de IA da sua investigação.",
              "Para cada um, escreva um nome, a entrada, a saída e uma decisão humana por trás dele.",
              "Coloque-os em ordem, do \"mais útil\" ao \"menos útil\" para você, com um motivo.",
            ],
            successCriteria: [
              "Cinco recursos de IA, cada um com entrada, saída e uma decisão humana.",
              "Uma ordenação com pelo menos um motivo claro.",
            ],
          },
          reflection: [
            {
              prompt: "De qual recurso de IA você mais depende sem nem pensar nisso?",
            },
            {
              prompt: "Agora que você sabe perceber as decisões humanas por trás da IA, que perguntas quer fazer sobre a IA que usa?",
            },
          ],
          recap: {
            summary: "A IA do dia a dia está em toda parte; você consegue entender qualquer recurso identificando a entrada, a saída e as decisões humanas por trás dele.",
            keyPoints: [
              "Recursos de IA costumam trabalhar em silêncio, em segundo plano, nos aplicativos que você usa.",
              "Todo recurso de IA tem uma entrada e uma saída que você consegue identificar.",
              "As decisões humanas, principalmente quais exemplos foram usados, moldam o comportamento da IA.",
            ],
          },
          extension: {
            title: "Projete uma IA do dia a dia melhor",
            body: [
              "Escolha um recurso de IA do dia a dia que você encontrou e imagine que pudesse melhorá-lo. Que exemplos a mais o ajudariam a funcionar melhor para mais pessoas?",
              "Escreva uma proposta curta: o recurso, um problema que ele tem, e os exemplos ou decisões humanas que poderiam resolver isso.",
            ],
          },
        },
      ],
    },
    {
      title: "Como os dados ensinam um modelo",
      subtitle: "Veja como exemplos, rótulos e características viram os dados com que um modelo aprende, e por que importa que os dados estejam limpos e equilibrados.",
      summary: "Os alunos olham dentro de um conjunto de dados para achar os exemplos, os rótulos e as características; aprendem por que um modelo é treinado com um conjunto de exemplos e testado com outro para medir generalização e acurácia; e praticam consertando problemas reais de dados, como duplicatas, rótulos incorretos e categorias desequilibradas.",
      bigQuestion: "Como os dados ensinam um modelo, e o que torna um conjunto de dados bom o bastante para aprender com ele?",
      estimatedTime: "2,5-3 horas",
      objectives: [
        "Identificar os exemplos, rótulos, características e categorias de um conjunto de dados.",
        "Explicar como os padrões ligam características a categorias.",
        "Descrever por que os modelos são treinados com um conjunto de dados e testados com outro, e definir generalização e acurácia.",
        "Achar e consertar duplicatas, rótulos incorretos e categorias desequilibradas.",
      ],
      requiredConcepts: [
        "Conjunto de dados",
        "Exemplo",
        "Rótulo",
        "Característica",
        "Categoria",
        "Padrão",
        "Treinamento",
        "Teste",
        "Dados equilibrados",
        "Duplicata",
        "Rótulo incorreto",
        "Generalização",
        "Acurácia",
      ],
      lessons: [
        {
          title: "Exemplos, rótulos e características",
          summary: "Abra um conjunto de dados e conheça as peças que o formam: cada exemplo, o rótulo que diz a que categoria ele pertence, e as características que o descrevem.",
          estimatedTime: "45-55 minutos",
          objectives: [
            {
              text: "Nomear as partes de um conjunto de dados: exemplos, rótulos e características.",
            },
            {
              text: "Ler uma tabela de dados e apontar um exemplo, as características dele e o rótulo dele.",
            },
            {
              text: "Explicar como características e rótulos ajudam um modelo a aprender um padrão para uma categoria.",
            },
          ],
          materials: [
            {
              name: "Esta aula em um navegador web",
            },
            {
              name: "Papel e lápis, ou um aplicativo de notas",
            },
            {
              name: "O conjunto de dados de frutas já incluído que aparece nesta aula",
              note: "Sem downloads nem dados de fora: ele já vem aqui.",
            },
          ],
          vocabulary: [
            {
              term: "Conjunto de dados",
              definition: "Uma coleção de exemplos reunidos para um modelo aprender com eles, muitas vezes mostrada como uma tabela de linhas e colunas.",
            },
            {
              term: "Exemplo",
              definition: "Um item do conjunto de dados, normalmente uma linha, como uma única fruta, foto ou mensagem.",
            },
            {
              term: "Rótulo",
              definition: "A resposta certa ligada a um exemplo, dizendo a que categoria ele pertence, como \"maçã\" ou \"banana\".",
            },
            {
              term: "Característica",
              definition: "Uma informação que descreve um exemplo, como a cor, o peso ou o formato dele. Cada característica costuma ser uma coluna da tabela.",
            },
            {
              term: "Categoria",
              definition: "Um dos grupos em que um modelo separa os exemplos. Os rótulos saem da lista de categorias.",
            },
            {
              term: "Padrão",
              definition: "Uma regularidade nas características que costuma andar junto com uma categoria, como \"comprido e amarelo geralmente quer dizer banana\".",
            },
          ],
          openingScenario: {
            prompt: "Imagine uma tabela em que cada linha é uma fruta. As colunas dizem a cor, o peso e o formato dela, e a última coluna diz qual é a fruta. Se você tapasse essa última coluna, ainda conseguiria adivinhar cada fruta? Para o que você olharia?",
            context: "Guarde a sua resposta: esta aula dá nome a cada parte dessa tabela.",
          },
          predictionPrompt: {
            prompt: "Preveja: de todas as informações da tabela de frutas, qual é a \"resposta\" que o modelo está tentando aprender, e quais são as pistas?",
            howToCheck: "Enquanto lê os conceitos, ligue \"resposta\" à palavra rótulo e \"pistas\" à palavra características.",
          },
          concepts: [
            {
              title: "Um conjunto de dados é uma tabela de exemplos",
              body: [
                "Um conjunto de dados é uma coleção de exemplos com que um modelo aprende. O jeito mais fácil de imaginar isso é uma tabela: cada linha é um exemplo, e cada coluna guarda um tipo de informação sobre esse exemplo.",
                "Se o conjunto de dados for sobre frutas, uma linha pode ser uma única banana. Se for sobre e-mail, uma linha é uma mensagem. O sentido de um conjunto de dados é reunir muitos exemplos em um só lugar para um modelo achar padrões entre eles.",
              ],
              examples: [
                "Uma tabela com uma linha por fruta e colunas de cor, peso e formato",
                "Uma tabela com uma linha por e-mail e uma coluna dizendo \"spam\" ou \"não é spam\"",
                "Uma tabela com uma linha por foto e uma coluna nomeando o animal que aparece nela",
              ],
            },
            {
              title: "As características descrevem; os rótulos respondem",
              body: [
                "Em cada exemplo, as características são as descrições, ou seja, as pistas. Na tabela de frutas, cor, peso e formato são características. As características costumam ser as colunas que dizem como um exemplo é.",
                "O rótulo é a resposta certa daquele exemplo: a categoria a que ele pertence. Para uma banana, o rótulo é \"banana\". Características e rótulos têm funções diferentes: as características são as pistas que você olha, e o rótulo é a resposta que você quer acertar.",
              ],
              examples: [
                "Características de uma fruta: cor = amarela, formato = comprido, peso = 120 gramas",
                "Rótulo dessa fruta: banana",
                "Características de um e-mail: muitos links, a palavra \"grátis\"; Rótulo: spam",
              ],
            },
            {
              title: "As categorias e os padrões que combinam com elas",
              body: [
                "Uma categoria é um dos grupos em que você pode separar os exemplos. Se um conjunto de dados só tem maçãs e bananas, então \"maçã\" e \"banana\" são as duas categorias, e todo rótulo é uma delas.",
                "Um modelo aprende achando um padrão: um jeito como as características costumam se alinhar com uma categoria. A partir de muitas frutas rotuladas, ele pode aprender que \"comprido e amarelo geralmente quer dizer banana\" e que \"redondo e vermelho geralmente quer dizer maçã\". Depois ele pode usar esse padrão para rotular uma fruta nova que nunca viu, só pelas características dela.",
              ],
              examples: [
                "Categorias: maçã, banana",
                "Padrão aprendido: redondo + vermelho → maçã; comprido + amarelo → banana",
                "Uma fruta nova com as características redonda e vermelha → o modelo prevê \"maçã\"",
              ],
            },
          ],
          workedExample: {
            title: "Lendo uma linha do conjunto de dados de frutas",
            steps: [
              "Olhe uma linha: cor = amarela, formato = comprido, peso = 120 gramas, fruta = banana.",
              "Ache o exemplo: essa linha inteira é um exemplo, uma única fruta.",
              "Ache as características: cor, formato e peso são as características que a descrevem.",
              "Ache o rótulo: \"banana\" é o rótulo, a categoria correta deste exemplo.",
              "Repare no padrão se formando: as linhas rotuladas como banana continuam mostrando \"amarela\" e \"comprido\", então essas características viram pistas da categoria banana.",
            ],
            takeaway: "Todo exemplo é uma linha; as características dele são as colunas que descrevem, e o rótulo é a coluna da resposta.",
          },
          visuals: [
            {
              title: "Um conjunto de dados de frutas, com as partes indicadas",
              summary: "Uma tabela pequena de dados. Cada linha é uma fruta de exemplo. As colunas Cor, Peso e Formato são características. A última coluna, Fruta, é o rótulo, a categoria daquele exemplo. Linha 1: vermelha, 150 gramas, redonda, maçã. Linha 2: amarela, 120 gramas, comprida, banana. Linha 3: verde, 160 gramas, redonda, maçã. Linha 4: amarela, 115 gramas, comprida, banana.",
              caption: "As três primeiras colunas são características; a última coluna é o rótulo.",
              table: {
                columns: [
                  "Cor",
                  "Peso (g)",
                  "Formato",
                  "Fruta (rótulo)",
                ],
                rows: [
                  [
                    null,
                    null,
                    "Redonda",
                    "Maçã",
                  ],
                  [
                    "Amarela",
                    null,
                    "Comprida",
                    "Banana",
                  ],
                  [
                    "Verde",
                    null,
                    "Redonda",
                    "Maçã",
                  ],
                  [
                    "Amarela",
                    null,
                    "Comprida",
                    "Banana",
                  ],
                ],
              },
            },
            {
              title: "As partes de um exemplo",
              summary: "Um diagrama de uma única linha do conjunto de dados. Uma seta aponta para a linha inteira, marcada como \"Exemplo\". Três células (cor, peso, formato) estão agrupadas e marcadas como \"Características: as pistas\". Uma célula no fim (fruta) está marcada como \"Rótulo: a resposta\". Uma nota diz: \"O rótulo nomeia a categoria a que este exemplo pertence\".",
              caption: "As características são as pistas que descrevem um exemplo; o rótulo é a categoria dele.",
            },
          ],
          activity: {
            title: "Espaço de trabalho para rotular dados",
            goal: "Examinar um conjunto de dados já incluído de frutas espaciais, atribuir a cada exemplo o rótulo Segura ou Não segura usando apenas as características dele, e caçar duplicatas e valores faltando.",
            overview: "Trabalhe em uma tabela de dados ao vivo de frutas espaciais fictícias. Cada linha tem oito características (cor, formato, textura, sementes, doçura, nível de brilho, tamanho e onde cresce), mas ainda não tem rótulo. Atribua rótulos, filtre e ordene para investigar, fique de olho em linhas duplicadas e valores faltando, e depois confira os seus rótulos com o gabarito da aula.",
            steps: [
              "Leia as características de cada fruta na tabela.",
              "Atribua o rótulo Segura ou Não segura ao maior número de frutas que conseguir.",
              "Use filtro e ordenação para achar linhas duplicadas e valores faltando.",
              "Confira os seus rótulos com o gabarito e anote quais características decidiram cada um.",
            ],
            materials: [
              "O conjunto de dados de frutas espaciais já incluído nesta atividade",
              "Opcional: papel e lápis para anotações",
            ],
            successCriteria: [
              "Quase todos os exemplos ficam rotulados como Segura ou Não segura.",
              "As linhas duplicadas e os valores faltando são achados com as marcações e os filtros.",
              "Os rótulos são conferidos com o gabarito, com um motivo para o padrão.",
            ],
            dataset: {
              name: "Conjunto de rotulagem de frutas espaciais",
              description: "Uma tabela segura e inventada de frutas espaciais com oito colunas de características e duas categorias: Segura para comer e Não segura para comer. Ela inclui linhas duplicadas e alguns valores faltando para descobrir. Sem dados reais, pessoais ou de fora.",
              columns: [
                "Cor",
                "Formato",
                "Textura",
                "Onde cresce",
                "Sementes",
                "Doçura",
                "Nível de brilho",
                "Tamanho",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responda a estas perguntas para conferir se você sabe nomear as partes de um conjunto de dados.",
            questions: [
              {
                prompt: "Na tabela de frutas, a coluna que diz \"maçã\" ou \"banana\" é o…",
                explanation: "O rótulo é a resposta certa de cada exemplo, a categoria a que ele pertence.",
                choices: [
                  {
                    text: "Característica",
                    explanation: "As características são as colunas que descrevem, como cor e peso, não a resposta.",
                  },
                  {
                    text: "Rótulo",
                    explanation: "Correto: o rótulo é a resposta de categoria de cada exemplo.",
                  },
                  {
                    text: "Exemplo",
                    explanation: "Um exemplo é uma linha inteira, não uma única coluna de resposta.",
                  },
                  {
                    text: "Conjunto de dados",
                    explanation: "O conjunto de dados é a tabela inteira, não uma coluna.",
                  },
                ],
              },
              {
                prompt: "Quais destes são características em um conjunto de dados de frutas? Escolha todos que se aplicam.",
                explanation: "Características são as informações que descrevem um exemplo. Cor, peso e formato descrevem a fruta; o nome da fruta é o rótulo.",
                choices: [
                  {
                    text: "Cor",
                    explanation: "Correto: a cor descreve a fruta, então é uma característica.",
                  },
                  {
                    text: "Peso",
                    explanation: "Correto: o peso descreve a fruta, então é uma característica.",
                  },
                  {
                    text: "Formato",
                    explanation: "Correto: o formato descreve a fruta, então é uma característica.",
                  },
                  {
                    text: "O nome da fruta (maçã/banana)",
                    explanation: "O nome da fruta é o rótulo, ou seja, a resposta, e não uma característica que descreve.",
                  },
                ],
              },
              {
                prompt: "Decida se a afirmação é verdadeira ou falsa.",
                statement: "Um exemplo em um conjunto de dados costuma ser uma única linha da tabela.",
                explanation: "Verdadeiro: cada linha é um exemplo, e as colunas dela guardam as características e o rótulo desse exemplo.",
              },
            ],
          },
          challenge: {
            title: "Crie o seu próprio conjunto de dados bem pequeno",
            prompt: "Invente um conjunto de dados pequeno para uma categoria que você conhece bem, como \"cachorro ou gato\" ou \"dia de semana ou fim de semana\".",
            steps: [
              "Escolha duas categorias e anote-as como os seus rótulos.",
              "Escolha três características que ajudariam a diferenciar as categorias.",
              "Faça uma tabela com cinco linhas de exemplo, preenchendo as características e o rótulo correto de cada uma.",
            ],
            successCriteria: [
              "Duas categorias claras usadas como rótulos.",
              "Três características bem escolhidas.",
              "Cinco linhas de exemplo, cada uma com características e um rótulo correto.",
            ],
          },
          reflection: [
            {
              prompt: "Qual característica da tabela de frutas você achou mais útil para diferenciar maçãs de bananas, e por quê?",
            },
            {
              prompt: "A sua previsão sobre a coluna da \"resposta\" estava certa? Como as palavras rótulo e característica ajudaram você a explicar isso?",
            },
          ],
          recap: {
            summary: "Um conjunto de dados é uma tabela de exemplos; cada exemplo tem características que o descrevem e um rótulo que nomeia a categoria dele, e os modelos aprendem padrões que ligam características a categorias.",
            keyPoints: [
              "Um exemplo é uma linha; as características são as colunas que descrevem e o rótulo é a coluna da resposta.",
              "As categorias são os grupos; todo rótulo é uma das categorias.",
              "Um modelo aprende padrões que ligam características a uma categoria.",
            ],
          },
          extension: {
            title: "Quais características realmente importam?",
            body: [
              "Nem toda característica é útil. Na tabela de frutas, \"formato\" e \"cor\" separam bem maçãs de bananas, mas uma característica como \"dia em que a fruta foi colhida\" provavelmente não diz nada de útil ao modelo.",
              "Olhe o seu próprio conjunto de dados bem pequeno. Qual característica faz mais trabalho para separar as categorias, e existe alguma que você poderia tirar sem prejudicar o padrão? Explique o seu raciocínio.",
            ],
          },
        },
        {
          title: "Dados de treinamento contra dados de teste",
          summary: "Veja por que um modelo é ensinado com um conjunto de exemplos e conferido com outro, e como testar com exemplos nunca vistos mede se ele realmente aprendeu o padrão.",
          estimatedTime: "45-55 minutos",
          objectives: [
            {
              text: "Explicar a diferença entre dados de treinamento e dados de teste.",
            },
            {
              text: "Descrever por que um modelo precisa ser testado com exemplos com que não aprendeu.",
            },
            {
              text: "Definir generalização e acurácia e ligá-las ao teste.",
            },
          ],
          materials: [
            {
              name: "Esta aula em um navegador web",
            },
            {
              name: "Papel e lápis, ou um aplicativo de notas",
            },
            {
              name: "O conjunto de dados de animais já incluído que aparece nesta aula",
              note: "Já vem aqui: sem dados de fora nem downloads.",
            },
          ],
          vocabulary: [
            {
              term: "Treinamento",
              definition: "Mostrar a um modelo muitos exemplos rotulados para que ele aprenda o padrão que liga características a uma categoria.",
            },
            {
              term: "Teste",
              definition: "Conferir um modelo com exemplos rotulados novos, com que ele não aprendeu, para ver o quanto ele realmente funciona.",
            },
            {
              term: "Dados de treinamento",
              definition: "Os exemplos com que um modelo aprende durante o treinamento.",
            },
            {
              term: "Dados de teste",
              definition: "Um conjunto separado de exemplos, guardado fora do treinamento, usado só para conferir o modelo.",
            },
            {
              term: "Generalização",
              definition: "O quanto um modelo funciona bem com exemplos novos que nunca viu, e não só com aqueles com que aprendeu.",
            },
            {
              term: "Acurácia",
              definition: "A proporção de exemplos de teste que um modelo rotula corretamente, muitas vezes escrita como fração ou porcentagem.",
            },
          ],
          openingScenario: {
            prompt: "Um professor entrega uma folha de exercícios e depois aplica uma prova com exatamente as mesmas perguntas e respostas. Se todo mundo tirar 100 por cento, isso prova que aprenderam a matéria, ou só que decoraram aquelas respostas?",
            context: "Guarde essa ideia: um modelo conferido com os mesmos exemplos com que aprendeu tem o mesmo problema.",
          },
          predictionPrompt: {
            prompt: "Preveja: se você testar um modelo só com os mesmos exemplos com que ele treinou, a nota dele vai dizer o quanto ele lida bem com exemplos totalmente novos?",
            howToCheck: "Leia os conceitos e decida do que um teste justo precisa: exemplos já vistos ou exemplos novos.",
          },
          concepts: [
            {
              title: "Treinamento: aprender o padrão a partir de exemplos",
              body: [
                "O treinamento é a etapa em que um modelo olha muitos exemplos rotulados e aprende um padrão que liga características a categorias. Os exemplos usados para isso são os dados de treinamento.",
                "Durante o treinamento, o modelo pode ver tanto as características quanto o rótulo correto de cada exemplo, então ele consegue se ajustar até que os palpites dele passem a bater com os rótulos.",
              ],
              examples: [
                "Mostrar a um modelo 100 linhas rotuladas de animais para que ele aprenda que \"ter asas geralmente quer dizer ave\"",
                "Alimentar um filtro de spam com milhares de e-mails já marcados como spam ou não",
              ],
            },
            {
              title: "Teste: uma conferência justa com exemplos nunca vistos",
              body: [
                "Se você só conferisse um modelo com os mesmos exemplos com que ele aprendeu, ele poderia simplesmente repetir respostas que já decorou, como um aluno que responde exatamente à folha de exercícios que estudou. Isso não provaria que ele aprendeu nada útil.",
                "Por isso guardamos alguns exemplos como dados de teste. O modelo nunca treina com eles. Testar significa rodar o modelo nesse conjunto separado e nunca visto e comparar os palpites dele com os rótulos verdadeiros. Essa é uma conferência justa do que ele realmente aprendeu.",
              ],
              examples: [
                "Guardar 20 linhas de animais; treinar com as outras 80; depois testar com as 20 linhas guardadas",
                "Uma folha de exercícios para estudar e uma prova separada para ser avaliado",
              ],
            },
            {
              title: "Generalização e acurácia",
              body: [
                "Generalização é o quanto um modelo se sai bem com exemplos novos que nunca viu. Um modelo que generaliza bem aprendeu o padrão de verdade, e não apenas as linhas exatas do treinamento. Testar com dados nunca vistos é como medimos a generalização.",
                "Acurácia é uma nota simples dessa conferência: de todos os exemplos de teste, que proporção o modelo rotulou corretamente? Se ele rotula 18 de 20 animais de teste certo, a acurácia dele é 18/20, ou seja, 90 por cento. Acurácia alta em dados de teste nunca vistos é o sinal de que um modelo realmente generaliza.",
              ],
              examples: [
                "16 de 20 exemplos de teste corretos → acurácia de 80 por cento",
                "Um modelo com nota alta nas linhas de treinamento mas baixa nas de teste não generalizou",
              ],
            },
          ],
          workedExample: {
            title: "Dividindo 20 animais em treinamento e teste",
            steps: [
              "Comece com um conjunto de dados de 20 animais rotulados (cada linha tem características e um rótulo \"ave\" ou \"não é ave\").",
              "Divida: ponha 15 linhas no conjunto de treinamento e guarde 5 linhas como conjunto de teste.",
              "Treine: deixe o modelo aprender o padrão usando só as 15 linhas de treinamento.",
              "Teste: mostre ao modelo as 5 linhas guardadas sem os rótulos delas e anote os palpites dele.",
              "Calcule a acurácia: compare os 5 palpites dele com os rótulos verdadeiros. Se 4 estiverem certos, a acurácia é 4/5, ou seja, 80 por cento, uma medida do quanto ele generaliza.",
            ],
            takeaway: "Treine com uma parte dos dados, teste com uma parte guardada, e meça a acurácia na parte nunca vista para julgar a generalização.",
          },
          visuals: [
            {
              title: "Divida os dados e depois confira",
              summary: "Duas etapas. Etapa 1 (Treinamento): os dados de treinamento, a maior parte das linhas, entram no modelo, que aprende um padrão. Etapa 2 (Teste): entram os dados de teste guardados, que o modelo nunca viu; os palpites dele são comparados aos rótulos verdadeiros para obter uma nota de acurácia. O ponto central: as linhas de teste ficam completamente separadas do treinamento.",
              caption: "O modelo aprende com os dados de treinamento e é avaliado com dados de teste separados.",
            },
            {
              title: "Mesmo modelo, duas notas",
              summary: "Um gráfico de barras comparando a acurácia de um mesmo modelo nos dados com que ele treinou e em dados de teste nunca vistos, medida em porcentagem. Barra 1, \"Nos dados de treinamento\", 98 por cento. Barra 2, \"Em dados de teste nunca vistos\", 82 por cento. A nota do teste é a medida honesta do quanto o modelo generaliza; uma barra de teste bem mais baixa avisa que o modelo em boa parte decorou.",
              chart: {
                unit: "% de acertos",
                bars: [
                  {
                    label: "Nos dados de treinamento",
                  },
                  {
                    label: "Em dados de teste nunca vistos",
                  },
                ],
              },
            },
          ],
          activity: {
            title: "Treine, teste e mude os dados",
            goal: "Dividir um conjunto de dados de frutas espaciais em treinamento e teste, rodar um modelo transparente e depois experimentar como dados equilibrados, desequilibrados e mal rotulados mudam os resultados.",
            overview: "Divida dezesseis frutas espaciais em um conjunto de treinamento com que o modelo aprende e um conjunto de teste com que ele é conferido. O modelo é um classificador simples e inspecionável de vizinhos mais próximos: ele compara cada fruta de teste com as frutas de treinamento mais parecidas e copia o rótulo mais comum entre elas, e mostra exatamente quais vizinhos decidiram cada previsão. Depois rode três experimentos (dados equilibrados, desequilibrados e mal rotulados) contra o mesmo conjunto de teste guardado, prevendo cada resultado antes.",
            steps: [
              "Preveja por que alguns exemplos precisam ficar escondidos do treinamento e depois divida as frutas em treinamento e teste.",
              "Rode o modelo e leia a acurácia geral e os resultados por categoria.",
              "Para cada experimento, preveja o que vai acontecer, rode-o e compare o resultado com a sua previsão.",
              "Opcional (7.º e 8.º ano): abra a conta da acurácia para calcular acertos ÷ total como porcentagem.",
            ],
            materials: [
              "O conjunto de dados de frutas espaciais já incluído nesta atividade",
              "Opcional: papel e lápis para anotações",
            ],
            successCriteria: [
              "Cada fruta fica em exatamente um conjunto, e as duas categorias aparecem no conjunto de teste.",
              "O modelo é rodado e a acurácia e os resultados por categoria são lidos.",
              "Cada experimento tem uma previsão salva e o resultado é comparado com ela.",
            ],
            dataset: {
              name: "Conjunto de treinamento e teste de frutas espaciais",
              description: "Um conjunto de dados seguro, inventado e corretamente rotulado de frutas espaciais (Segura / Não segura), dividido em exemplos de treinamento e exemplos de teste guardados, com versões equilibrada, desequilibrada e mal rotulada para os experimentos. Sem dados reais, pessoais ou de fora.",
              columns: [
                "Cor",
                "Formato",
                "Textura",
                "Onde cresce",
                "Sementes",
                "Doçura",
                "Nível de brilho",
                "Tamanho",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responda a estas perguntas para conferir se você entendeu treinamento, teste e acurácia.",
            questions: [
              {
                prompt: "Por que testamos um modelo com exemplos com que ele não treinou?",
                explanation: "Testar com exemplos nunca vistos verifica se o modelo aprendeu o padrão de verdade, em vez de apenas decorar as linhas de treinamento.",
                choices: [
                  {
                    text: "Para o teste demorar mais",
                    explanation: "O objetivo é uma conferência justa, não deixar tudo mais lento.",
                  },
                  {
                    text: "Para ver se ele realmente aprendeu o padrão, e não só decorou as respostas",
                    explanation: "Correto: exemplos nunca vistos revelam se o modelo generaliza.",
                  },
                  {
                    text: "Porque há exemplos de treinamento demais",
                    explanation: "A quantidade de dados de treinamento não é o motivo; o motivo é a conferência ser justa.",
                  },
                  {
                    text: "Para dar ao modelo perguntas mais fáceis",
                    explanation: "Os exemplos de teste não devem ser mais fáceis, e sim novos.",
                  },
                ],
              },
              {
                prompt: "O resultado de quem é uma medida justa de aprendizado?",
                scenario: "Ava estuda uma folha de exercícios e depois é avaliada com perguntas totalmente novas do mesmo tipo. Ben estuda uma folha de exercícios e depois é avaliado com exatamente as mesmas perguntas, com as respostas que ele já viu durante o estudo.",
                explanation: "Ava é avaliada com perguntas novas, então a nota dela mostra aprendizado real (generalização). A prova do Ben repete as perguntas de estudo, então uma nota alta pode ser só memorização.",
                choices: [
                  {
                    text: "O da Ava, porque a prova dela usou perguntas novas",
                    explanation: "Correto: avaliar com perguntas novas mede se ela generalizou.",
                  },
                  {
                    text: "O do Ben, porque ele já tinha visto as respostas",
                    explanation: "Ter visto antes as respostas exatas faz com que a nota alta dele possa ser só memorização.",
                  },
                  {
                    text: "Os dois são igualmente justos",
                    explanation: "Não são iguais: as perguntas repetidas do Ben tornam o resultado dele pouco confiável.",
                  },
                ],
              },
              {
                prompt: "Um modelo rotula corretamente 15 de 20 exemplos de teste. Qual é a acurácia dele?",
                explanation: "Acurácia é a proporção rotulada corretamente: 15 de 20 é 15/20, que dá 75 por cento.",
                choices: [
                  {
                    text: "Cerca de 75 por cento",
                    explanation: "Correto: 15 dividido por 20 é 0,75, ou seja, 75 por cento.",
                  },
                  {
                    text: "Cerca de 15 por cento",
                    explanation: "15 é o número de acertos, não a proporção; a proporção é 15 de 20.",
                  },
                  {
                    text: "Cerca de 50 por cento",
                    explanation: "Metade de 20 seriam 10 acertos, mas o modelo acertou 15.",
                  },
                  {
                    text: "Cerca de 95 por cento",
                    explanation: "95 por cento de 20 seriam 19 acertos, e não 15.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Planeje um teste justo",
            prompt: "Monte um plano justo de treinamento e teste para um modelo que separa mensagens em \"pergunta\" ou \"não é pergunta\".",
            steps: [
              "Decida quantas mensagens de exemplo você reuniria no total.",
              "Escolha como dividi-las em um conjunto de treinamento e um de teste, e diga por quê.",
              "Explique como você calcularia a acurácia a partir dos resultados do teste.",
            ],
            successCriteria: [
              "Um número total claro de exemplos e uma divisão entre treinamento e teste.",
              "Um motivo para o conjunto de teste ficar separado do treinamento.",
              "Uma descrição correta de como a acurácia seria medida.",
            ],
          },
          reflection: [
            {
              prompt: "Por que um modelo pode tirar uma nota altíssima nos dados de treinamento e mesmo assim falhar com exemplos novos?",
            },
            {
              prompt: "Em que guardar dados de teste se parece com um professor montar uma prova diferente da folha de exercícios?",
            },
          ],
          recap: {
            summary: "Os modelos treinam com um conjunto de exemplos e são testados com um conjunto separado e nunca visto; a acurácia nesses dados de teste mede o quanto o modelo generaliza.",
            keyPoints: [
              "Os dados de treinamento ensinam o modelo; os dados de teste o conferem.",
              "As linhas de teste precisam ficar guardadas e nunca ser vistas durante o treinamento.",
              "Generalizar é ir bem com exemplos novos; acurácia é a proporção de exemplos de teste rotulados corretamente.",
            ],
          },
          extension: {
            title: "Quando o treinamento parece ótimo mas o teste parece ruim",
            body: [
              "Às vezes um modelo tira uma nota quase perfeita nos dados de treinamento, mas vai mal nos dados de teste. Isso normalmente quer dizer que ele decorou as linhas exatas do treinamento em vez de aprender o padrão geral.",
              "Descreva um caso em que isso poderia acontecer, por exemplo, um modelo que decorou frutas específicas pelo peso exato delas. O que você poderia mudar nos dados ou na divisão para ter um retrato mais honesto de como ele vai se sair?",
            ],
          },
        },
        {
          title: "Conserte o conjunto de dados",
          summary: "Brinque de detetive de dados: cace duplicatas, rótulos incorretos e categorias desequilibradas, e conserte tudo para que um modelo possa aprender um padrão justo e preciso.",
          estimatedTime: "45-60 minutos",
          objectives: [
            {
              text: "Perceber problemas comuns de dados: duplicatas, rótulos incorretos e categorias desequilibradas.",
            },
            {
              text: "Explicar como cada problema pode prejudicar a acurácia ou a justiça de um modelo.",
            },
            {
              text: "Consertar um conjunto de dados pequeno para que os exemplos fiquem corretos e as categorias equilibradas.",
            },
          ],
          materials: [
            {
              name: "Esta aula em um navegador web",
            },
            {
              name: "Papel e lápis, ou um aplicativo de notas",
            },
            {
              name: "O conjunto de dados bagunçado já incluído que aparece nesta aula",
              note: "Já vem aqui: sem dados de fora, downloads ou informações pessoais.",
            },
          ],
          vocabulary: [
            {
              term: "Dados equilibrados",
              definition: "Um conjunto de dados em que cada categoria tem uma quantidade justa e mais ou menos igual de exemplos, para o modelo aprender bem todas as categorias.",
            },
            {
              term: "Duplicata",
              definition: "Um exemplo que aparece mais de uma vez no conjunto de dados, o que pode fazer o modelo se concentrar demais naquele caso repetido.",
            },
            {
              term: "Rótulo incorreto",
              definition: "Um exemplo que recebeu a resposta errada, como uma banana rotulada \"maçã\", o que ensina ao modelo um padrão falso.",
            },
            {
              term: "Acurácia",
              definition: "A proporção de exemplos que um modelo rotula corretamente; dados ruins normalmente a diminuem.",
            },
            {
              term: "Generalização",
              definition: "O quanto um modelo funciona bem com exemplos novos; dados limpos e equilibrados ajudam um modelo a generalizar.",
            },
          ],
          openingScenario: {
            prompt: "Um aluno está ensinando um modelo a diferenciar maçãs de bananas. A tabela dele tem 18 maçãs e só 2 bananas, uma banana está copiada três vezes, e uma maçã foi rotulada como \"banana\" por engano. O que pode dar errado quando o modelo aprender com isso?",
            context: "No fim da aula você vai conseguir nomear e consertar os três problemas.",
          },
          predictionPrompt: {
            prompt: "Preveja: se um conjunto de dados tem 18 maçãs e só 2 bananas, qual categoria você acha que o modelo vai aprender melhor, e por quê?",
            howToCheck: "Leia o conceito de dados equilibrados e verifique se ter mais exemplos de uma categoria ajuda o modelo a aprendê-la.",
          },
          concepts: [
            {
              title: "Duplicatas: o mesmo exemplo contado duas vezes",
              body: [
                "Uma duplicata é um exemplo que aparece mais de uma vez. Pode parecer inofensivo, mas uma linha duplicada faz o modelo tratar aquele único caso como se fossem muitos, dando peso demais a ele.",
                "Se uma banana idêntica aparece três vezes, o modelo pode se concentrar demais naquela banana específica em vez de aprender como as bananas são no geral. Tirar as duplicatas faz cada exemplo real contar uma vez só.",
              ],
              examples: [
                "A linha idêntica da banana copiada três vezes na tabela",
                "A mesma foto colada duas vezes em um conjunto de dados",
              ],
            },
            {
              title: "Rótulos incorretos: a resposta errada ensina o padrão errado",
              body: [
                "Um rótulo incorreto é um exemplo marcado com a categoria errada, como uma maçã rotulada \"banana\" sem querer. Como o modelo confia nos rótulos como se fossem a verdade, um rótulo errado ensina a ele um padrão falso.",
                "Até uns poucos rótulos incorretos podem baixar a acurácia, porque o modelo tenta satisfazer respostas que nunca estiveram certas. Consertar um rótulo é trocá-lo pela categoria correta (ou tirar o exemplo, se você não conseguir saber).",
              ],
              examples: [
                "Uma fruta redonda e vermelha rotulada \"banana\"",
                "A foto de um gato rotulada \"cachorro\" em um conjunto de dados de animais",
              ],
            },
            {
              title: "Dados equilibrados: dê a cada categoria uma parte justa",
              body: [
                "Dados equilibrados quer dizer que cada categoria tem uma quantidade justa e mais ou menos igual de exemplos. Se um conjunto de dados tem 18 maçãs mas só 2 bananas, o modelo vê muito mais maçãs e pode quase não aprender como é uma banana, então ele chuta \"maçã\" com frequência demais.",
                "Equilibrar as categorias, seja reunindo mais exemplos de banana, seja reduzindo as maçãs, ajuda o modelo a aprender todas as categorias e a generalizar com justiça. Dados limpos, corretos e equilibrados são a base de um modelo preciso.",
              ],
              examples: [
                "10 maçãs e 10 bananas é mais equilibrado que 18 maçãs e 2 bananas",
                "Um modelo treinado principalmente com uma categoria tende a prever demais essa categoria",
              ],
            },
          ],
          workedExample: {
            title: "Consertando passo a passo uma tabela de frutas bagunçada",
            steps: [
              "Comece com uma tabela bagunçada: 18 maçãs e 2 bananas, uma linha de banana copiada três vezes, e uma maçã rotulada como \"banana\".",
              "Ache as duplicatas: a banana idêntica aparece três vezes, então tire duas cópias e fique com uma.",
              "Conserte os rótulos incorretos: a fruta redonda e vermelha rotulada \"banana\" é na verdade uma maçã, então mude o rótulo dela para \"maçã\".",
              "Confira o equilíbrio: agora as categorias estão bem desiguais, então acrescente mais exemplos reais de banana até que maçãs e bananas fiquem mais ou menos parelhas.",
              "Resultado: um conjunto de dados limpo, corretamente rotulado e equilibrado, com que o modelo pode aprender um padrão justo.",
            ],
            takeaway: "Conserte um conjunto de dados tirando duplicatas, corrigindo rótulos errados e equilibrando as categorias antes que um modelo aprenda com ele.",
          },
          visuals: [
            {
              title: "Antes e depois de equilibrar",
              summary: "Um gráfico de barras de quantos exemplos cada categoria tem, contados em exemplos. Antes do conserto: Maçã 18, Banana 2, bem desequilibrado. Depois do conserto: Maçã 10, Banana 10, equilibrado. Equilibrar as categorias dá ao modelo uma chance justa de aprender as duas frutas em vez de prever maçã demais.",
              chart: {
                unit: "exemplos",
                bars: [
                  {
                    label: "Maçã (antes)",
                  },
                  {
                    label: "Banana (antes)",
                  },
                  {
                    label: "Maçã (depois)",
                  },
                  {
                    label: "Banana (depois)",
                  },
                ],
              },
            },
            {
              title: "Três problemas e os consertos deles",
              summary: "Uma tabela ligando cada problema de dados ao conserto dele e ao motivo de isso importar. Duplicata: um exemplo repetido; conserta-se tirando as cópias a mais; importa porque dá peso demais a um único caso. Rótulo incorreto: resposta errada em um exemplo; conserta-se corrigindo o rótulo; importa porque ensina um padrão falso. Categorias desequilibradas: uma categoria tem muito mais exemplos; conserta-se acrescentando à categoria menor ou reduzindo a maior; importa porque o modelo aprende de menos a categoria rara.",
              table: {
                columns: [
                  "Problema",
                  "Como consertar",
                  "Por que importa",
                ],
                rows: [
                  [
                    "Duplicata",
                    "Tirar as cópias a mais",
                    "Um único caso ganha peso demais",
                  ],
                  [
                    "Rótulo incorreto",
                    "Trocá-lo pela categoria correta",
                    "Uma resposta errada ensina um padrão falso",
                  ],
                  [
                    "Categorias desequilibradas",
                    "Acrescentar à categoria pequena ou reduzir a grande",
                    "O modelo aprende de menos a categoria rara",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "Conserte o conjunto de dados defeituoso",
            goal: "Consertar um conjunto de dados bagunçado de frutas espaciais (tirar duplicatas, corrigir rótulos errados e melhorar o equilíbrio) e depois rodar o modelo de novo e comparar antes e depois.",
            overview: "Comece com um conjunto de treinamento defeituoso de frutas espaciais que tem linhas duplicadas, vários rótulos incorretos e um forte desequilíbrio em favor de Segura. Tire duplicatas, conserte rótulos e acrescente mais exemplos da categoria rara para equilibrar, enquanto as frutas de teste continuam escondidas e sem mudanças. Depois confira o seu trabalho e rode de novo o modelo transparente para ver uma comparação completa de antes e depois na saúde do conjunto de dados e na acurácia.",
            steps: [
              "Examine o conjunto de dados defeituoso; as linhas duplicadas são marcadas automaticamente.",
              "Conserte os rótulos que parecerem errados e tire as cópias duplicadas.",
              "Acrescente exemplos da categoria com poucos casos para melhorar o equilíbrio.",
              "Confira o seu conjunto de dados e rode o modelo de novo, depois compare os resultados de antes e depois.",
            ],
            materials: [
              "O conjunto de dados defeituoso de frutas espaciais já incluído nesta atividade",
              "Opcional: papel e lápis para anotações",
            ],
            successCriteria: [
              "As linhas duplicadas são removidas e os rótulos errados são corrigidos.",
              "As categorias ficam mais equilibradas com o acréscimo de exemplos.",
              "O modelo é rodado de novo e a acurácia de antes e depois é comparada.",
            ],
            dataset: {
              name: "Conjunto de dados defeituoso de frutas espaciais",
              description: "Um conjunto de treinamento seguro e inventado de frutas espaciais com problemas colocados de propósito (linhas duplicadas, rótulos incorretos e desequilíbrio em favor de Segura), mais um conjunto de teste guardado e exemplos extras corretamente rotulados para acrescentar. Sem dados reais, pessoais ou de fora.",
              columns: [
                "Cor",
                "Formato",
                "Textura",
                "Onde cresce",
                "Sementes",
                "Doçura",
                "Nível de brilho",
                "Tamanho",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responda a estas perguntas para conferir se você sabe achar e consertar problemas de dados.",
            questions: [
              {
                prompt: "Quais destes são problemas que você deve consertar antes de treinar um modelo? Escolha todos que se aplicam.",
                explanation: "Duplicatas, rótulos incorretos e categorias desequilibradas prejudicam o que um modelo aprende, então os três devem ser consertados.",
                choices: [
                  {
                    text: "O mesmo exemplo repetido várias vezes",
                    explanation: "Correto: duplicatas dão peso demais a um único caso e devem ser removidas.",
                  },
                  {
                    text: "Um exemplo com o rótulo errado",
                    explanation: "Correto: um rótulo incorreto ensina um padrão falso e precisa ser consertado.",
                  },
                  {
                    text: "Uma categoria com muito mais exemplos que outra",
                    explanation: "Correto: categorias desequilibradas fazem o modelo aprender de menos a categoria rara.",
                  },
                  {
                    text: "A tabela ter nomes de coluna claros",
                    explanation: "Nomes de coluna claros ajudam; não são um problema a consertar.",
                  },
                ],
              },
              {
                prompt: "Decida se a afirmação é verdadeira ou falsa.",
                statement: "Um conjunto de dados com 18 maçãs e só 2 bananas está bem equilibrado.",
                explanation: "Falso: dados equilibrados significam quantidades mais ou menos iguais por categoria. Com 18 maçãs e 2 bananas, o modelo quase não aprenderia bananas.",
              },
              {
                prompt: "Coloque em uma ordem sensata os passos para consertar um conjunto de dados.",
                explanation: "Primeiro examine os dados, depois tire duplicatas e conserte rótulos errados para cada exemplo ficar correto, então equilibre as categorias e, por fim, treine de novo e confira a acurácia.",
                items: [
                  {
                    text: "Examinar o conjunto de dados para achar problemas",
                  },
                  {
                    text: "Remover linhas duplicadas e corrigir rótulos errados",
                  },
                  {
                    text: "Equilibrar as categorias",
                  },
                  {
                    text: "Treinar o modelo de novo e conferir a acurácia dele",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Quebre e depois conserte",
            prompt: "Pegue um conjunto de dados pequeno e limpo, acrescente de propósito cada um dos três problemas, depois conserte tudo e descreva o efeito.",
            steps: [
              "Comece com um conjunto de dados pequeno, limpo e equilibrado, de duas categorias.",
              "Acrescente uma linha duplicada, mude um rótulo para ficar incorreto, e tire exemplos para que uma categoria fique bem maior.",
              "Agora conserte os três problemas e explique, para cada um, como o conserto deve ajudar a acurácia ou a justiça do modelo.",
            ],
            successCriteria: [
              "Os três problemas são acrescentados de propósito e claramente marcados.",
              "Os três são consertados.",
              "Cada conserto tem um motivo ligado à acurácia ou à justiça.",
            ],
          },
          reflection: [
            {
              prompt: "Qual dos três problemas de dados você acha mais difícil de perceber, e por quê?",
            },
            {
              prompt: "Como limpar e equilibrar um conjunto de dados se liga à ideia de treinamento e teste da aula passada?",
            },
          ],
          recap: {
            summary: "Duplicatas, rótulos incorretos e categorias desequilibradas prejudicam um modelo; consertá-los produz dados limpos e equilibrados que melhoram a acurácia e ajudam o modelo a generalizar com justiça.",
            keyPoints: [
              "Remova duplicatas para que nenhum exemplo receba peso demais.",
              "Corrija rótulos incorretos para o modelo não aprender um padrão falso.",
              "Equilibre as categorias para o modelo aprender cada uma e generalizar com justiça.",
            ],
          },
          extension: {
            title: "Quando não dá para coletar mais dados",
            body: [
              "Equilibrar acrescentando mais exemplos da categoria rara é o ideal, mas às vezes não dá para coletar mais com facilidade. Outra opção é reduzir a categoria maior para as contagens baterem, embora isso signifique jogar fora alguns exemplos reais.",
              "Para a tabela de frutas bagunçada, defenda qual abordagem você escolheria (acrescentar mais bananas ou tirar algumas maçãs) e explique que compromisso cada escolha traz para a acurácia e a justiça do modelo.",
            ],
          },
        },
      ],
    },
    {
      title: "Reconhecimento de imagens e erros do modelo",
      subtitle: "Veja como um classificador de imagens transforma pixels em previsões, meça o quanto ele funciona bem, e ache e conserte os erros que ele comete.",
      summary: "Os alunos abrem a classificação de imagens: como um classificador lê pixels como características visuais para fazer uma previsão com uma confiança, como medi-lo com justiça usando acurácia e acurácia por categoria em um conjunto de teste guardado, e como ler uma matriz de confusão para achar falsos positivos, falsos negativos e casos-limite, e depois melhorar o modelo com exemplos direcionados.",
      bigQuestion: "Como um classificador transforma pixels em uma previsão, e como achamos e consertamos os erros que ele comete?",
      estimatedTime: "2,5-3 horas",
      objectives: [
        "Explicar como um classificador de imagens transforma pixels em características visuais, uma previsão e uma confiança.",
        "Medir um classificador com justiça usando acurácia e acurácia por categoria em um conjunto de teste separado.",
        "Diferenciar falsos positivos de falsos negativos e perceber os casos-limite que os causam.",
        "Ler uma matriz de confusão e propor melhorias direcionadas para reduzir um erro específico.",
      ],
      requiredConcepts: [
        "Pixel",
        "Característica visual",
        "Classificação",
        "Previsão",
        "Confiança",
        "Acurácia",
        "Falso positivo",
        "Falso negativo",
        "Caso-limite",
        "Matriz de confusão",
        "Acurácia por categoria",
      ],
      lessons: [
        {
          title: "Como funciona um classificador de imagens",
          summary: "Acompanhe uma foto dos pixels até o rótulo, e aprenda como um classificador de imagens transforma características visuais em uma previsão com uma pontuação de confiança.",
          estimatedTime: "45-55 minutos",
          objectives: [
            {
              text: "Explicar que uma imagem é feita de pixels que o computador lê como números.",
            },
            {
              text: "Descrever como um classificador usa características visuais para fazer uma previsão.",
            },
            {
              text: "Ler uma pontuação de confiança e dizer o que ela significa e o que não significa.",
            },
            {
              text: "Acompanhar uma imagem pelo classificador, da entrada até a saída rotulada.",
            },
          ],
          materials: [
            {
              name: "Esta aula em um navegador web",
            },
            {
              name: "Papel e lápis, ou um aplicativo de notas",
            },
            {
              name: "Os conjuntos de imagens rotuladas já incluídos que aparecem na aula",
              note: "Descritos na aula: você não envia nenhuma foto sua.",
            },
          ],
          vocabulary: [
            {
              term: "Pixel",
              definition: "Um pontinho minúsculo de uma imagem. Uma foto é uma grade de pixels, e o computador guarda cada um como números que indicam a cor e o brilho dele.",
            },
            {
              term: "Característica visual",
              definition: "Um padrão em uma imagem ao qual o classificador presta atenção, como bordas, cores, formas ou texturas.",
            },
            {
              term: "Classificação",
              definition: "Colocar algo em um de vários grupos com nome, chamados categorias ou classes.",
            },
            {
              term: "Previsão",
              definition: "A categoria que o classificador escolhe como melhor palpite para uma imagem de entrada.",
            },
            {
              term: "Confiança",
              definition: "Um número, muitas vezes mostrado como porcentagem, que indica o quanto o classificador está seguro da previsão dele. Mais alto significa mais seguro, mas nem sempre mais correto.",
            },
          ],
          openingScenario: {
            prompt: "Você mostra uma imagem a um aplicativo de fotos e na hora ele diz \"gato, 96% de certeza\". Ele nunca viu essa foto exata antes. Como um computador, que só enxerga números, consegue decidir que é um gato?",
            context: "Guarde o seu primeiro palpite: você vai conferi-lo depois de ver como os pixels viram uma previsão.",
          },
          predictionPrompt: {
            prompt: "Preveja: quando um classificador olha uma foto, você acha que ele reconhece o \"gato\" inteiro de uma vez, ou que monta a resposta a partir de padrões menores, como bordas e formas?",
            howToCheck: "Leia os conceitos abaixo e veja como os pixels viram características visuais, e como as características viram uma previsão.",
          },
          concepts: [
            {
              title: "Uma imagem é uma grade de pixels, e pixels são números",
              body: [
                "Um computador não consegue \"ver\" uma foto do jeito que você vê. Para um computador, uma imagem é uma grade de pontinhos chamados pixels, e cada pixel é guardado como números que descrevem a cor e o brilho dele. Uma foto pequena pode ter centenas de milhares de pixels.",
                "Então a primeira coisa que um classificador recebe não é um \"gato\": é uma grade enorme de números. Tudo o que o classificador decidir precisa ser construído a partir desses números.",
              ],
              examples: [
                "Um pixel em preto e branco pode ser guardado como um número de 0 (preto) a 255 (branco).",
                "Um pixel colorido costuma ser guardado como três números: quanto de vermelho, verde e azul ele tem.",
                "Uma foto de 100 por 100 tem 10.000 pixels: um monte de números para uma imagem pequena.",
              ],
            },
            {
              title: "Dos pixels às características visuais",
              body: [
                "Trabalhar só com pixels crus é difícil, então um classificador procura características visuais: padrões úteis como bordas, cantos, cores, texturas e formas. Formas triangulares e pontudas perto do topo podem ser uma característica que costuma aparecer com gatos (as orelhas).",
                "O classificador aprendeu quais características importam estudando muitos exemplos rotulados no treinamento anterior. Ninguém disse a ele, como regra, que \"gatos têm orelhas pontudas\": ele achou padrões assim a partir dos exemplos, a mesma ideia de aprendizado das semanas anteriores.",
              ],
              examples: [
                "Bordas onde uma área escura encontra uma área clara",
                "Formas redondas, que podem ser olhos ou rodas",
                "Texturas como pelo, escamas ou metal liso",
              ],
            },
            {
              title: "Previsão e confiança",
              body: [
                "Depois de somar as características visuais, o classificador faz uma previsão: escolhe a categoria que melhor combina, como \"gato\" ou \"cachorro\". Junto com a previsão ele normalmente informa uma confiança, um número de o quanto ele está seguro, muitas vezes mostrado como porcentagem.",
                "A confiança é útil, mas traiçoeira. Uma confiança alta significa que as características combinaram muito com uma categoria, e não que a resposta esteja com certeza correta. Um classificador pode errar com toda a segurança, e é exatamente esse tipo de erro que você vai estudar esta semana.",
              ],
              examples: [
                "\"Cachorro, 91%\": as características combinaram com cachorro muito mais do que com qualquer outra categoria.",
                "\"Gato 55%, cachorro 45%\": o classificador está inseguro, a imagem tinha características dos dois.",
                "Um seguro 98% ainda pode estar errado se a foto for incomum.",
              ],
            },
          ],
          workedExample: {
            title: "Acompanhando uma foto dos pixels até o rótulo",
            steps: [
              "Entrada: a foto de um gato chega como uma grade de pixels, só números de cor e brilho.",
              "Achar características: o classificador detecta bordas, depois duas formas pontudas perto do topo, formas redondas de olhos e uma textura de pelo.",
              "Pontuar cada categoria: essas características combinam muito com \"gato\" e só um pouquinho com \"cachorro\".",
              "Prever com uma confiança: ele devolve \"gato\" com 96% de confiança, porque as características de gato pontuaram bem mais alto que as outras.",
              "Saída: o rótulo \"gato\" e a confiança são mostrados a você. A resposta inteira foi construída a partir de pixels, e não de o computador realmente \"ver\" um gato.",
            ],
            takeaway: "Um classificador transforma pixels em características visuais, pontua cada categoria a partir dessas características, e informa a melhor combinação como uma previsão com uma confiança.",
          },
          visuals: [
            {
              title: "Dos pixels a uma previsão rotulada",
              summary: "Um fluxo de quatro passos. Passo 1: imagem de entrada, desenhada como uma grade de pixels (números). Passo 2: achar características visuais: bordas, formas, cores, texturas. Passo 3: pontuar cada categoria a partir das características, por exemplo gato 96, cachorro 3, coelho 1. Passo 4: devolver a categoria mais alta como previsão, com a confiança dela: \"gato, 96%\". A seta deixa claro que o rótulo é construído a partir dos pixels, e não visto diretamente.",
              caption: "Toda previsão é construída a partir dos pixels, passando pelas características, até virar um palpite pontuado.",
            },
            {
              title: "A confiança em cada categoria para uma foto",
              summary: "Um gráfico de barras da confiança do classificador para cada categoria em uma única foto de gato, em porcentagem. Gato é de longe a barra mais alta, com 96 por cento; cachorro tem 3 por cento e coelho, 1 por cento. A barra mais alta é a previsão; a altura dela é a confiança. As barras somam cerca de 100 por cento porque o classificador divide a certeza dele entre as categorias.",
              caption: "A barra mais alta é a previsão; a altura dela é a confiança.",
              chart: {
                unit: "% de confiança",
                bars: [
                  null,
                  null,
                  {
                    label: "Coelho",
                  },
                ],
              },
            },
          ],
          activity: {
            title: "Passo a passo pelo classificador",
            goal: "Acompanhar uma imagem já incluída dos pixels até uma previsão rotulada, e ver como a confiança compara as categorias sem garantir a resposta.",
            overview: "Escolha uma imagem de formas gerada e veja-a como o computador vê: uma grade de 16×16 pixels numerados. A atividade mostra as características visuais que ele mediu a partir desses pixels, a previsão dele e uma barra de confiança para cada categoria, com uma explicação em linguagem simples das imagens de treinamento mais parecidas com que ela combinou. Um exemplo resolvido mostra um caso em que o modelo está seguro e mesmo assim erra. De forma opcional, você pode enviar uma imagem sua que é processada apenas no seu aparelho; ela nunca é salva nem enviada a lugar nenhum.",
            steps: [
              "Escolha uma imagem e veja a grade de pixels dela.",
              "Leia as características visuais que o modelo mediu a partir dos pixels.",
              "Leia a previsão e a barra de confiança de cada categoria, e a explicação do que ela combinou.",
              "Veja o exemplo de seguro mas errado, e repare que confiança não é certeza.",
            ],
            materials: [
              "As imagens geradas já incluídas nesta atividade",
              "Opcional: um desenho seu para enviar (processado apenas no seu aparelho)",
            ],
            successCriteria: [
              "Uma imagem é acompanhada dos pixels às características e a uma previsão.",
              "As barras de confiança são lidas como uma comparação entre categorias, e não como uma garantia.",
              "O caso de seguro mas errado é compreendido.",
            ],
            dataset: {
              name: "Imagens de formas geradas (rotuladas)",
              description: "Imagens de 16×16 pixels de círculos, triângulos e quadrados geradas localmente, cada uma desenhada a partir de uma especificação (nenhum arquivo é baixado ou enviado). O classificador e a confiança dele são calculados no seu aparelho a partir dos pixels.",
              columns: [
                "imagem",
                "rótulo verdadeiro",
                "rótulo previsto",
                "confiança",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responda a estas perguntas para conferir se você entendeu como um classificador de imagens transforma pixels em uma previsão.",
            questions: [
              {
                prompt: "O que um classificador de imagens realmente recebe como entrada?",
                explanation: "Para um computador, uma imagem é uma grade de pixels guardados como números; o classificador constrói todo o resto a partir desses números.",
                choices: [
                  {
                    text: "O nome do objeto que aparece na foto",
                    explanation: "O nome é a saída que o classificador tenta produzir, não a entrada com que ele começa.",
                  },
                  {
                    text: "Uma grade de pixels guardados como números",
                    explanation: "Correto: o classificador parte dos pixels (números de cor e brilho) e constrói a partir daí.",
                  },
                  {
                    text: "Uma lista escrita das características do objeto",
                    explanation: "Ninguém entrega ao classificador uma lista de características; ele mesmo as acha a partir dos pixels.",
                  },
                  {
                    text: "Uma pontuação de confiança",
                    explanation: "A confiança faz parte da saída, produzida no fim, e não é a entrada.",
                  },
                ],
              },
              {
                prompt: "Coloque em ordem os passos da classificação de imagens, de receber a foto até mostrar a resposta.",
                explanation: "Um classificador vai dos pixels às características visuais, daí a uma pontuação para cada categoria, e daí à previsão mais alta com a confiança dela.",
                items: [
                  {
                    text: "Receber a imagem como uma grade de pixels",
                  },
                  {
                    text: "Achar características visuais como bordas, formas e texturas",
                  },
                  {
                    text: "Pontuar o quanto as características combinam com cada categoria",
                  },
                  {
                    text: "Devolver a categoria mais alta como previsão, com a confiança dela",
                  },
                ],
              },
              {
                prompt: "Decida se a afirmação é verdadeira ou falsa.",
                statement: "Uma previsão com 98% de confiança tem garantia de estar correta.",
                explanation: "Falso: confiança alta significa que as características combinaram muito com uma categoria, mas um classificador ainda pode errar com toda a segurança, principalmente em fotos incomuns.",
              },
            ],
          },
          challenge: {
            title: "Seja você o classificador",
            prompt: "Escolha um objeto simples que você consiga imaginar (uma maçã, uma bicicleta, uma casa) e descreva como um classificador poderia diferenciá-lo de um parente próximo usando características visuais.",
            steps: [
              "Escolha o seu objeto e um objeto parecido com que ele possa ser confundido (maçã e tomate, bicicleta e motocicleta).",
              "Liste três características visuais que empurrariam a previsão na direção do seu objeto.",
              "Liste uma característica que os dois objetos compartilham e que poderia deixar o classificador inseguro.",
            ],
            successCriteria: [
              "Um par de objetos parecidos é escolhido.",
              "Três características visuais que os distinguem são listadas.",
              "Uma característica compartilhada que poderia baixar a confiança é apontada.",
            ],
          },
          reflection: [
            {
              prompt: "Agora que você sabe que, para um computador, uma foto é só pixels, o que mais te surpreendeu no jeito como ele chega a um rótulo?",
            },
            {
              prompt: "Em que situações você iria querer ver a pontuação de confiança antes de confiar na previsão de um classificador?",
            },
          ],
          recap: {
            summary: "Um classificador de imagens transforma uma grade de pixels em características visuais, pontua cada categoria e devolve a melhor combinação como uma previsão com uma confiança.",
            keyPoints: [
              "Para um computador, uma imagem é uma grade de pixels guardados como números.",
              "Os classificadores trabalham a partir de características visuais como bordas, formas, cores e texturas.",
              "Uma previsão vem com uma confiança, e confiança alta não garante uma resposta correta.",
            ],
          },
          extension: {
            title: "Por que a confiança pode te enganar",
            body: [
              "A confiança diz o quanto as características combinaram com uma categoria, e não o quanto a resposta está correta. Um classificador treinado só com fotos claras de dia pode estar 95% confiante e errado em uma foto noturna borrada, porque aqueles pixels incomuns mesmo assim combinaram melhor com uma categoria.",
              "Descreva uma situação em que você iria querer que um sistema dissesse \"não tenho certeza\" em vez de dar uma resposta segura. Por que quem projeta poderia criar uma regra como \"se a confiança for menor que 60%, pergunte a uma pessoa\"?",
            ],
          },
        },
        {
          title: "Treine e teste um classificador",
          summary: "Aprenda por que um classificador é conferido com fotos com que ele nunca treinou, e meça o quanto ele se sai bem usando a acurácia em um conjunto de teste justo.",
          estimatedTime: "45-55 minutos",
          objectives: [
            {
              text: "Explicar por que um classificador é testado com fotos separadas, com que ele não treinou.",
            },
            {
              text: "Calcular a acurácia como previsões corretas sobre o total de previsões.",
            },
            {
              text: "Ler a acurácia por categoria e perceber qual categoria é a mais fraca.",
            },
            {
              text: "Explicar por que um único número de acurácia geral pode esconder uma categoria fraca.",
            },
          ],
          materials: [
            {
              name: "Esta aula em um navegador web",
            },
            {
              name: "Papel e lápis, ou um aplicativo de notas",
            },
            {
              name: "O conjunto de teste rotulado já incluído que aparece na aula",
              note: "Fotos já divididas em grupos de treinamento e de teste; os alunos não acrescentam fotos.",
            },
          ],
          vocabulary: [
            {
              term: "Acurácia",
              definition: "Com que frequência um classificador acerta, normalmente o número de previsões corretas dividido pelo total de previsões, mostrado como porcentagem.",
            },
            {
              term: "Acurácia por categoria",
              definition: "A acurácia medida separadamente para cada categoria, para você ver quais o classificador domina e com quais ele tem dificuldade.",
            },
            {
              term: "Conjunto de teste",
              definition: "Um grupo de fotos rotuladas guardado à parte e nunca usado no treinamento, que serve para conferir com justiça o quanto o classificador se sai bem com imagens novas.",
            },
            {
              term: "Conjunto de treinamento",
              definition: "As fotos rotuladas com que o classificador aprende os padrões dele antes de ser testado.",
            },
          ],
          openingScenario: {
            prompt: "Um classificador acerta absolutamente todas as fotos de treinamento. Quem o construiu diz que ele é \"perfeito\". Depois ele encontra fotos totalmente novas e erra várias. O que deu errado no jeito como o mediram?",
            context: "Pense na diferença entre decorar as respostas e realmente aprender o padrão.",
          },
          predictionPrompt: {
            prompt: "Preveja: se um classificador tira 90% de acurácia geral com gatos, cachorros e coelhos, você acha que ele vai igualmente bem nas três categorias?",
            howToCheck: "Leia sobre acurácia por categoria e olhe a tabela de resultados incluída para conferir a sua previsão.",
          },
          concepts: [
            {
              title: "Por que testar com fotos com que o classificador nunca treinou",
              body: [
                "Um classificador aprende com um conjunto de treinamento. Se você depois o testa com essas mesmas fotos, ele pode parecer ótimo só por tê-las decorado, como um aluno que viu antes as questões exatas da prova. Essa nota não diria como ele se sai com fotos novas.",
                "Por isso guardamos um conjunto de teste separado: fotos rotuladas mantidas à parte e nunca usadas no treinamento. Testar com fotos novas para o classificador é o jeito justo de medir se ele realmente aprendeu o padrão.",
              ],
              examples: [
                "Treinar com 800 fotos de bichos de estimação e depois testar com 200 fotos diferentes.",
                "Nota alta no treinamento junto com nota baixa no teste é um sinal de alerta de que ele decorou.",
                "As fotos de teste também precisam estar rotuladas, para você conferir cada previsão.",
              ],
            },
            {
              title: "Acurácia: com que frequência o classificador acerta",
              body: [
                "A acurácia é a nota mais simples: o número de previsões corretas dividido pelo total de previsões, escrito como porcentagem. Se o classificador acerta 90 de 100 fotos de teste, a acurácia dele é 90%.",
                "A acurácia é fácil de entender, e é por isso que ela é tão comum. Mas um único número cobre tudo de uma vez, então ele pode esconder problemas, e é aí que entra a acurácia por categoria.",
              ],
              examples: [
                "45 acertos em 50 fotos dá 90% de acurácia.",
                "Dois classificadores podem ter a mesma acurácia e cometer erros bem diferentes.",
                "A acurácia só faz sentido em um conjunto rotulado, em que você conhece as respostas certas.",
              ],
            },
            {
              title: "A acurácia por categoria conta a história completa",
              body: [
                "A acurácia por categoria mede a nota de cada categoria sozinha. A acurácia geral pode ser 90%, mas o classificador pode acertar gatos 98% das vezes e coelhos só 74%. O número geral silenciosamente diluiu a categoria fraca na média.",
                "Abrir a acurácia por categoria mostra exatamente onde melhorar. Costuma ser o primeiro passo para descobrir qual categoria o classificador confunde, o tema da próxima aula.",
              ],
              examples: [
                "Geral 90%, mas gatos 98%, cachorros 92%, coelhos 74%.",
                "Uma categoria fraca pode ficar escondida se tiver poucas fotos no conjunto de teste.",
                "Consertar a categoria mais fraca costuma ser o que mais aumenta a acurácia geral.",
              ],
            },
          ],
          workedExample: {
            title: "Medindo com justiça um classificador de bichos de estimação",
            steps: [
              "Divida as fotos: 800 vão para o conjunto de treinamento e outras 200, diferentes, para o conjunto de teste.",
              "Treine: o classificador aprende os padrões de gato, cachorro e coelho só com as 800 fotos de treinamento.",
              "Teste: passe todas as 200 fotos guardadas e compare cada previsão com o rótulo verdadeiro.",
              "Acurácia geral: 180 das 200 estavam corretas, então 180 ÷ 200 = 90% de acurácia.",
              "Por categoria: gatos 98%, cachorros 92%, coelhos 74%. Os coelhos estão puxando tudo para baixo, mesmo que os 90% gerais parecessem sólidos.",
            ],
            takeaway: "Teste com fotos guardadas, calcule a acurácia como acertos sobre o total, e depois abra por categoria para achar o ponto fraco que o número geral esconde.",
          },
          visuals: [
            {
              title: "Acurácia por categoria no conjunto de teste",
              summary: "Um gráfico de barras da acurácia por categoria, em porcentagem, no conjunto de teste de 200 fotos. Gatos estão em 98 por cento, cachorros em 92 por cento e coelhos em apenas 74 por cento. Uma linha tracejada de referência marca os 90 por cento de acurácia geral. O gráfico deixa evidente que os coelhos são a categoria mais fraca e estão puxando a nota geral para baixo, mesmo que o número geral sozinho parecesse sólido.",
              caption: "Os 90% gerais escondem que os coelhos estão bem mais fracos que gatos e cachorros.",
              chart: {
                unit: "% de acurácia",
                bars: [
                  {
                    label: "Gatos",
                  },
                  {
                    label: "Cachorros",
                  },
                  {
                    label: "Coelhos",
                  },
                ],
              },
            },
            {
              title: "Por que um conjunto de teste separado é justo",
              summary: "Antes (injusto): o classificador é testado com exatamente as mesmas fotos com que treinou, então ele pode tirar nota alta só por tê-las decorado, e essa nota não prevê como ele lida com fotos novas. Depois (justo): as fotos são divididas para que treinamento e teste usem fotos diferentes; o classificador é avaliado só com fotos que nunca viu no treinamento, o que mostra se ele realmente aprendeu o padrão.",
              caption: "Testar com fotos novas para o classificador é o que torna a nota confiável.",
            },
          ],
          activity: {
            title: "Treine e teste um classificador",
            goal: "Escolher um tema, selecionar as imagens de treinamento, treinar de verdade um classificador no seu aparelho, e ler acurácia geral, acurácia por categoria e uma matriz de confusão em imagens nunca vistas.",
            overview: "Escolha um de três temas (formas geométricas, material escolar ou itens recicláveis) e depois selecione com quais imagens geradas o classificador vai treinar. Observe as contagens por categoria e os avisos de validação, preveja a categoria mais fácil e a mais difícil, e treine. O modelo calcula características reais a partir dos pixels e classifica um conjunto de teste guardado. Você lê a acurácia geral e por categoria, uma matriz de confusão, os falsos positivos contra os falsos negativos de uma categoria que escolher, e uma revisão imagem por imagem com barras de confiança e explicações. Nada é enviado; tudo roda no seu aparelho.",
            steps: [
              "Escolha um tema e leia as definições das categorias.",
              "Selecione as imagens de treinamento e observe as contagens por categoria e quaisquer avisos.",
              "Preveja a categoria mais fácil e a mais difícil, e depois treine o classificador.",
              "Leia a acurácia geral, a matriz de confusão, a acurácia por categoria e as contagens de falsos positivos e falsos negativos.",
            ],
            materials: [
              "Os conjuntos de imagens geradas já incluídos nesta atividade",
            ],
            successCriteria: [
              "Um classificador é treinado com imagens escolhidas pelo aluno e testado com imagens nunca vistas.",
              "A acurácia geral e por categoria e a matriz de confusão são lidas.",
              "Falsos positivos e falsos negativos são identificados para uma categoria escolhida.",
            ],
            dataset: {
              name: "Três temas de imagens geradas (treino/teste)",
              description: "Três temas gerados localmente: formas (círculo/triângulo/quadrado), material escolar (de escrever/de medir/de papel) e reciclagem (papel/plástico/metal), cada um com um grupo de treinamento e um conjunto de teste guardado. As imagens são desenhadas no seu aparelho a partir de especificações; nada é baixado nem enviado.",
              columns: [
                "imagem",
                "divisão",
                "rótulo verdadeiro",
                "rótulo previsto",
                "confiança",
                "correto?",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responda a estas perguntas para conferir se você sabe medir um classificador com justiça usando a acurácia.",
            questions: [
              {
                prompt: "Um classificador acerta 45 de 50 fotos de teste. Qual é a acurácia dele?",
                explanation: "Acurácia é previsões corretas divididas pelo total de previsões: 45 ÷ 50 = 0,90, ou 90%.",
                choices: [
                  {
                    explanation: "45 é o número de acertos, não a acurácia; ainda falta dividir pelo total de 50.",
                  },
                  {
                    explanation: "Correto: 45 ÷ 50 = 0,90, que é 90% de acurácia.",
                  },
                  {
                    explanation: "50 é o total de fotos, não a acurácia.",
                  },
                  {
                    explanation: "5 é o número de erros, não a acurácia.",
                  },
                ],
              },
              {
                prompt: "Qual classificador foi medido de um jeito justo?",
                scenario: "A equipe A testa o classificador dela com exatamente as mesmas 500 fotos com que ele treinou e informa 99%. A equipe B guarda 100 fotos, treina com o resto, e testa só com as 100 guardadas.",
                explanation: "Testar com as mesmas fotos usadas no treinamento premia a decoreba. A equipe B guardou fotos, então a nota dela reflete como o classificador se sai com imagens novas.",
                choices: [
                  {
                    text: "A equipe A, porque 99% é mais alto",
                    explanation: "Uma nota alta significa pouco se veio de testar com as fotos de treinamento; pode ser pura decoreba.",
                  },
                  {
                    text: "A equipe B, porque testou com fotos guardadas",
                    explanation: "Correto: testar com fotos nunca usadas no treinamento é o jeito justo de medir o desempenho real.",
                  },
                  {
                    text: "As duas são igualmente justas",
                    explanation: "Não são iguais; a equipe A testou com as próprias fotos de treinamento, e isso não é um teste justo.",
                  },
                  {
                    text: "Nenhuma das duas pode ser medida com acurácia",
                    explanation: "As duas podem usar acurácia; a questão é com quais fotos o teste foi feito.",
                  },
                ],
              },
              {
                prompt: "Decida se a afirmação é verdadeira ou falsa.",
                statement: "Um único número de acurácia geral pode esconder que o classificador vai mal em uma categoria específica.",
                explanation: "Verdadeiro: a acurácia geral tira a média de todas as categorias juntas, então uma categoria fraca (como coelhos com 74%) pode ficar mascarada pelas fortes. A acurácia por categoria revela isso.",
              },
            ],
          },
          challenge: {
            title: "Divida com justiça",
            prompt: "Monte um plano justo de treino e teste para um classificador que separa fotos de três tipos de fruta, e descreva o que você mediria.",
            steps: [
              "Decida quantas fotos vão para o conjunto de treinamento e quantas ficam guardadas para o conjunto de teste.",
              "Explique por que as fotos de teste não podem ser usadas durante o treinamento.",
              "Liste os números de acurácia que você informaria: a acurácia geral e a acurácia de cada fruta.",
            ],
            successCriteria: [
              "Uma divisão clara das fotos em grupos de treinamento e de teste.",
              "Um motivo para as fotos de teste ficarem fora do treinamento.",
              "A acurácia geral e a acurácia por categoria são ambas apontadas como coisas a informar.",
            ],
          },
          reflection: [
            {
              prompt: "A sua previsão de que as três categorias iriam igualmente bem estava certa? O que a acurácia por categoria revelou?",
            },
            {
              prompt: "Por que pode ser arriscado confiar em um produto que só anuncia um número de acurácia geral?",
            },
          ],
          recap: {
            summary: "Um classificador é medido com justiça em um conjunto de teste guardado usando a acurácia, e abrir a acurácia por categoria revela pontos fracos que o número geral esconde.",
            keyPoints: [
              "Teste com um conjunto separado de fotos com que o classificador nunca treinou.",
              "Acurácia é previsões corretas divididas pelo total de previsões.",
              "A acurácia por categoria mostra qual categoria é a mais fraca, mesmo quando a nota geral parece sólida.",
            ],
          },
          extension: {
            title: "Quando a acurácia pode enganar",
            body: [
              "Imagine um conjunto de teste que é 95% gatos e só 5% coelhos. Um classificador preguiçoso que chutasse \"gato\" todas as vezes tiraria 95% de acurácia errando todos os coelhos. A acurácia alta esconde um fracasso total com os coelhos.",
              "Explique por que a mistura de categorias em um conjunto de teste importa. O que você poderia medir ou mudar para que um classificador não consiga \"trapacear\" ignorando uma categoria rara?",
            ],
          },
        },
        {
          title: "Confunda e melhore o modelo",
          summary: "Ache os casos-limite que enganam um classificador, leia os erros dele em uma matriz de confusão, e proponha mudanças que o deixem melhor.",
          estimatedTime: "50-60 minutos",
          objectives: [
            {
              text: "Diferenciar um falso positivo de um falso negativo para uma categoria.",
            },
            {
              text: "Identificar casos-limite com boas chances de confundir um classificador.",
            },
            {
              text: "Ler uma matriz de confusão para ver quais categorias se misturam.",
            },
            {
              text: "Propor uma mudança, como acrescentar exemplos, que reduza um erro específico.",
            },
          ],
          materials: [
            {
              name: "Esta aula em um navegador web",
            },
            {
              name: "Papel e lápis, ou um aplicativo de notas",
            },
            {
              name: "O conjunto de erros e a matriz de confusão já incluídos que aparecem na aula",
              note: "Previsões e rótulos verdadeiros já registrados; os alunos não enviam fotos.",
            },
          ],
          vocabulary: [
            {
              term: "Falso positivo",
              definition: "Quando o classificador diz que algo ESTÁ em uma categoria mas não está; por exemplo, chamar de \"gato\" uma foto que na verdade é de um cachorro.",
            },
            {
              term: "Falso negativo",
              definition: "Quando o classificador diz que algo NÃO está em uma categoria mas na verdade está; por exemplo, deixar passar um gato de verdade e chamá-lo de cachorro.",
            },
            {
              term: "Caso-limite",
              definition: "Uma entrada incomum ou complicada, perto da fronteira entre categorias, como um cachorro peludo que lembra um pouco um gato, e que é fácil de errar.",
            },
            {
              term: "Matriz de confusão",
              definition: "Uma tabela que alinha os rótulos verdadeiros contra as previsões do classificador, para você ver exatamente quais categorias se misturam e com que frequência.",
            },
          ],
          openingScenario: {
            prompt: "Um classificador de bichos de estimação vive chamando um cachorrinho peludo específico de \"gato\". E ele está confiante todas as vezes. Isso é azar aleatório, ou pode haver um padrão nos erros dele que você consiga achar e consertar?",
            context: "Esta aula é sobre achar o padrão nos erros de um classificador, e não apenas notar que ele erra.",
          },
          predictionPrompt: {
            prompt: "Preveja: em um classificador de gato, cachorro e coelho, quais duas categorias você acha que são mais confundidas entre si, e por quê?",
            howToCheck: "Leia a matriz de confusão abaixo e veja qual célula fora da diagonal tem mais erros.",
          },
          concepts: [
            {
              title: "Falsos positivos e falsos negativos",
              body: [
                "Nem todo erro é igual. Um falso positivo de \"gato\" é quando o classificador diz \"gato\" mas a foto não é de um gato. Um falso negativo de \"gato\" é quando a foto é mesmo de um gato mas o classificador diz que é outra coisa. Toda categoria tem os dois tipos.",
                "A diferença importa porque os dois erros podem ter custos bem diferentes. Deixar passar um alarme de incêndio de verdade (um falso negativo) pode ser bem mais grave que um alarme falso (um falso positivo), então as pessoas muitas vezes se importam com qual tipo de erro um sistema comete.",
              ],
              examples: [
                "Falso positivo de \"gato\": a foto de um coelho rotulada como \"gato\".",
                "Falso negativo de \"gato\": a foto de um gato de verdade rotulada como \"cachorro\".",
                "Um filtro de spam marcar uma mensagem real como spam é um falso positivo de \"spam\".",
              ],
            },
            {
              title: "Os casos-limite ficam perto da fronteira",
              body: [
                "Os classificadores cometem a maior parte dos erros em casos-limite: entradas incomuns que ficam perto da fronteira entre duas categorias. Um cachorrinho peludo compartilha características com gatos, um coelho fotografado com as orelhas abaixadas perde uma característica-chave, e uma foto escura e borrada esconde características de todas as categorias.",
                "Casos-limite não são aleatórios. Se você consegue prever quais entradas ficam perto da fronteira, consegue prever onde o classificador vai ter dificuldade, e reunir exemplos melhores exatamente para esses casos.",
              ],
              examples: [
                "Um gato sem pelo, que não tem a textura de pelo de sempre.",
                "Um cachorro de fantasia, que esconde o formato dele.",
                "Uma foto tirada com pouquíssima luz, em que cores e bordas ficam pouco nítidas.",
              ],
            },
            {
              title: "Ler uma matriz de confusão e depois melhorar o modelo",
              body: [
                "Uma matriz de confusão coloca os rótulos verdadeiros contra as previsões em uma grade. Os números na diagonal (gato verdadeiro previsto como gato) são acertos; os números fora da diagonal são erros, e cada célula fora da diagonal diz exatamente qual confusão aconteceu e com que frequência. Um número grande na célula \"cachorro verdadeiro, previsto gato\" quer dizer que cachorros são muito confundidos com gatos.",
                "Assim que você enxerga o maior erro, dá para melhorar o modelo de propósito. O conserto mais comum é acrescentar mais e melhores exemplos do caso confuso, como mais fotos de cachorrinhos peludos, para o classificador aprender as características que os diferenciam. Você melhora onde a matriz aponta, e mede de novo.",
              ],
              examples: [
                "A célula \"coelho verdadeiro, previsto gato\" estar grande quer dizer que coelhos são chamados de gatos com frequência.",
                "Acrescentar fotos de coelho mais nítidas mira exatamente esse erro.",
                "Depois de um conserto, você confere de novo a acurácia e a matriz para confirmar que o erro diminuiu.",
              ],
            },
          ],
          workedExample: {
            title: "De um erro confuso a um conserto direcionado",
            steps: [
              "Olhe a matriz de confusão e ache o maior número fora da diagonal: \"coelho verdadeiro, previsto gato\", com 9 erros.",
              "Diga o tipo de erro: para a categoria gato, são falsos positivos (chamados de gato, mas na verdade coelhos); para a categoria coelho, são falsos negativos (coelhos de verdade que passaram batido).",
              "Pergunte por quê: coelhos e gatos podem compartilhar textura de pelo e formas arredondadas, e coelhos com as orelhas abaixadas perdem a característica que os distingue; casos-limite clássicos.",
              "Proponha um conserto: acrescente mais fotos de coelho ao conjunto de treinamento, principalmente coelhos com orelhas abaixadas e em ângulos parecidos com os de gato, para o classificador aprender as diferenças.",
              "Meça de novo: teste outra vez e veja se a célula \"coelho verdadeiro, previsto gato\" diminuiu e se a acurácia de coelho subiu.",
            ],
            takeaway: "Ache o maior erro na matriz de confusão, diga de que tipo ele é, explique o caso-limite por trás dele, acrescente exemplos direcionados e meça de novo.",
          },
          visuals: [
            {
              title: "Matriz de confusão do classificador de bichos de estimação",
              summary: "Uma matriz de confusão 3 por 3 de um classificador de gato, cachorro e coelho no conjunto de teste. As linhas são o rótulo verdadeiro, as colunas são o rótulo previsto. Gatos verdadeiros: 47 previstos como gato, 2 como cachorro, 1 como coelho. Cachorros verdadeiros: 3 gato, 44 cachorro, 3 coelho. Coelhos verdadeiros: 9 gato, 4 cachorro, 37 coelho. A diagonal (47, 44, 37) são os acertos. O maior erro é o 9 na célula \"coelho verdadeiro, previsto gato\", mostrando que coelhos são confundidos sobretudo com gatos, a mesma categoria fraca do gráfico de acurácia.",
              caption: "As células da diagonal são acertos; o 9 em \"coelho verdadeiro, previsto gato\" é o maior erro a consertar.",
              matrix: {
                labels: [
                  null,
                  null,
                  "Coelho",
                ],
              },
            },
            {
              title: "Melhorando a categoria mais fraca",
              summary: "Antes: o conjunto de treinamento tinha poucas fotos de coelhos com as orelhas abaixadas, então muitos desses coelhos eram previstos como gatos, e a acurácia de coelho ficava em 74 por cento. Depois: mais fotos de coelho foram acrescentadas, principalmente casos-limite com orelhas abaixadas e em ângulos parecidos com os de gato; o classificador aprendeu a diferença, os erros de \"coelho verdadeiro, previsto gato\" caíram, e a acurácia de coelho subiu. O conserto mirou exatamente o erro que a matriz de confusão apontava.",
              caption: "Acrescentar exemplos mirando a maior confusão é como se melhora de propósito.",
            },
          ],
          activity: {
            title: "Confunda e melhore",
            goal: "Tentar confundir o classificador com casos-limite, e depois melhorar um modelo fraco acrescentando algumas imagens de treinamento variadas e comparando o primeiro modelo com o melhorado.",
            overview: "Parte 1: rode o classificador nos casos-limite já incluídos: uma forma girada, uma forma parcialmente escondida, um fundo com ruído, um borrão, uma forma minúscula, um traço grosso demais e uma imagem misturada. Preveja cada resultado antes, depois veja a resposta do modelo, a confiança e a provável fonte da confusão, e decida se aquela imagem pertence ao treinamento, ao teste ou a nenhum dos dois. Parte 2: um modelo inicial fraco só viu círculos e quadrados, nunca um triângulo, então erra todos os triângulos; acrescente até quatro imagens variadas, treine de novo e compare lado a lado o primeiro modelo e o melhorado: contagens de treinamento, acurácia geral e por categoria, as duas matrizes de confusão, e exatamente quais imagens de teste foram consertadas ou passaram a errar. Tudo é gerado e roda no seu aparelho.",
            steps: [
              "Para cada caso-limite, preveja a resposta do modelo, rode-o e leia a fonte da confusão.",
              "Decida se cada caso-limite pertence ao treinamento, ao teste ou a nenhum dos dois.",
              "Acrescente até quatro imagens variadas ao modelo inicial fraco e treine de novo.",
              "Compare o primeiro modelo com o melhorado, e explique por que as suas mudanças ajudaram ou não.",
            ],
            materials: [
              "Os casos-limite e os conjuntos de imagens gerados já incluídos nesta atividade",
            ],
            successCriteria: [
              "Cada caso-limite tem uma previsão salva e a confusão dele é explicada.",
              "O modelo melhorado é construído acrescentando imagens de treinamento variadas e treinando de novo.",
              "O primeiro modelo e o melhorado são comparados, identificando as imagens consertadas e as que passaram a errar.",
            ],
            dataset: {
              name: "Casos-limite gerados + conjuntos de treino e teste de formas",
              description: "Imagens de casos-limite geradas localmente (giradas, obstruídas, com ruído, borradas, bem pequenas, com características compartilhadas e misturadas), além do grupo de treinamento de formas e do conjunto de teste guardado usados na comparação entre o primeiro modelo e o melhorado. Tudo desenhado no seu aparelho a partir de especificações; nada é enviado.",
              columns: [
                "imagem",
                "tipo de caso-limite",
                "rótulo verdadeiro",
                "rótulo previsto",
                "confiança",
                "por quê (confusão)",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responda a estas perguntas para conferir se você sabe ler os erros de um classificador e melhorá-lo.",
            questions: [
              {
                prompt: "Que tipo de erro é este para a categoria \"gato\"?",
                scenario: "Uma foto é na verdade de um coelho, mas o classificador prevê \"gato\".",
                explanation: "O classificador colocou algo que não é gato na categoria gato, então é um falso positivo de gato. (Também é um falso negativo de coelho, já que um coelho de verdade passou batido.)",
                choices: [
                  {
                    text: "Um falso positivo de gato",
                    explanation: "Correto: ele disse \"gato\" sobre algo que não é um gato, e isso é um falso positivo da categoria gato.",
                  },
                  {
                    text: "Um falso negativo de gato",
                    explanation: "Um falso negativo de gato seria um gato de verdade que o classificador deixou passar; aqui a foto não é de gato de jeito nenhum.",
                  },
                  {
                    text: "Uma previsão correta",
                    explanation: "É um erro: a foto é de um coelho, não de um gato.",
                  },
                  {
                    text: "Um erro que uma matriz de confusão não consegue mostrar",
                    explanation: "Uma matriz de confusão mostra exatamente isso: apareceria na célula \"coelho verdadeiro, previsto gato\".",
                  },
                ],
              },
              {
                prompt: "Quais destas são boas maneiras de reduzir um erro específico que a matriz de confusão revela? Escolha todas que se aplicam.",
                explanation: "Melhorar de forma direcionada significa agir sobre a maior confusão: acrescentar exemplos do caso confuso, focar nos casos-limite, e medir de novo para confirmar o conserto. Simplesmente apagar a categoria fraca ou esconder a confiança não conserta o erro de fundo.",
                choices: [
                  {
                    text: "Acrescentar mais exemplos de treinamento da categoria que é confundida, incluindo casos-limite",
                    explanation: "Correto: mais e melhores exemplos do caso confuso ajudam o classificador a aprender a diferença.",
                  },
                  {
                    text: "Testar de novo depois da mudança para ver se aquele erro diminuiu",
                    explanation: "Correto: você mede de novo para confirmar que o conserto realmente reduziu o erro.",
                  },
                  {
                    text: "Apagar a categoria fraca para que ela nunca possa errar",
                    explanation: "Remover uma categoria não melhora o classificador; só faz com que ele deixe de fazer um trabalho que deveria fazer.",
                  },
                  {
                    text: "Esconder a pontuação de confiança para os erros ficarem menos evidentes",
                    explanation: "Esconder informação não conserta erro nenhum; só torna os erros mais difíceis de perceber.",
                  },
                ],
              },
              {
                prompt: "Decida se a afirmação é verdadeira ou falsa.",
                statement: "Em uma matriz de confusão, os números da diagonal são as previsões corretas.",
                explanation: "Verdadeiro: uma célula da diagonal é onde o rótulo verdadeiro e o previsto coincidem (gato verdadeiro previsto como gato), então essas são as previsões corretas; as células fora da diagonal são os erros.",
              },
            ],
          },
          challenge: {
            title: "Cace a confusão",
            prompt: "Escolha um par de categorias que você espera que um classificador confunda e planeje como acharia e consertaria essa confusão.",
            steps: [
              "Escolha duas categorias parecidas (por exemplo, bolinhos e cupcakes, ou lobos e cachorros).",
              "Descreva um caso-limite perto da fronteira e preveja se ele vira falso positivo ou falso negativo para cada categoria.",
              "Diga qual célula de uma matriz de confusão cresceria, e que exemplos você acrescentaria para diminuí-la.",
            ],
            successCriteria: [
              "Um par confundível plausível, com um caso-limite na fronteira.",
              "O erro é corretamente enquadrado como falso positivo ou falso negativo.",
              "Um conserto direcionado, ligado a uma célula específica da matriz de confusão.",
            ],
          },
          reflection: [
            {
              prompt: "A sua previsão sobre quais duas categorias são mais confundidas estava certa? O que a matriz de confusão mostrou?",
            },
            {
              prompt: "Quando um falso negativo seria mais perigoso que um falso positivo, ou o contrário? Dê um exemplo real.",
            },
          ],
          recap: {
            summary: "Uma matriz de confusão mostra exatamente quais categorias um classificador mistura, e os casos-limite explicam por quê; você melhora o modelo acrescentando exemplos direcionados e medindo de novo.",
            keyPoints: [
              "Falsos positivos e falsos negativos são erros diferentes, com custos diferentes.",
              "Casos-limite perto da fronteira de uma categoria causam a maioria das confusões.",
              "Leia a matriz de confusão, acrescente exemplos para o maior erro, e meça de novo.",
            ],
          },
          extension: {
            title: "Que erro você preferiria cometer?",
            body: [
              "Em muitos sistemas reais, não dá para eliminar todos os erros, então quem projeta escolhe para que tipo pender. Uma ferramenta de triagem médica pode aceitar mais falsos positivos (exames extras) para evitar falsos negativos (uma doença que passa despercebida), enquanto um filtro de spam pode aceitar mais falsos negativos (algum spam passa) para evitar falsos positivos (perder uma mensagem real).",
              "Escolha um classificador real e defenda qual erro ele deveria evitar mais. Como quem o construiu poderia ajustar o modelo ou o limiar dele para trocar um tipo de erro pelo outro?",
            ],
          },
        },
      ],
    },
    {
      title: "IA de texto, chatbots e recomendações",
      subtitle: "Veja como a IA lida com linguagem e sugestões: dos chatbots de palavras-chave à previsão de texto e aos feeds que moldam o que você vê.",
      summary: "Os alunos exploram a IA por trás do texto e das sugestões do dia a dia: constroem um chatbot baseado em regras com palavras-chave, intenções e uma resposta de reserva; olham por dentro dos modelos de linguagem que preveem o próximo trecho provável de texto e aprendem por que um texto fluente não é o mesmo que um texto verdadeiro; e auditam sistemas de recomendação que funcionam por similaridade e retorno, examinando com honestidade como eles podem criar bolhas de filtro.",
      bigQuestion: "Como a IA trabalha com linguagem e sugestões, e quando devemos questionar o que ela nos diz ou nos mostra?",
      estimatedTime: "2,5-3 horas",
      objectives: [
        "Construir um chatbot baseado em regras usando palavras-chave, intenções, uma árvore de decisão e uma resposta de reserva.",
        "Explicar como um modelo de linguagem prevê o próximo trecho provável de texto a partir de um comando.",
        "Explicar por que um texto fluente de IA não é o mesmo que um texto verdadeiro ou correto.",
        "Auditar como as recomendações usam similaridade e retorno, e como elas formam bolhas de filtro.",
      ],
      requiredConcepts: [
        "Palavra-chave",
        "Intenção",
        "Árvore de decisão",
        "Resposta de reserva",
        "Modelo de linguagem",
        "Token ou trecho de texto",
        "Próximo texto provável",
        "Comando",
        "Recomendação",
        "Similaridade",
        "Retorno",
        "Bolha de filtro",
      ],
      lessons: [
        {
          title: "Construa um chatbot baseado em regras",
          summary: "Monte um chatbot do jeito antigo, com palavras-chave, intenções e uma árvore de decisão, e descubra por que ele precisa de uma resposta de reserva para tudo aquilo que não foi feito para lidar.",
          estimatedTime: "50-60 minutos",
          objectives: [
            {
              text: "Explicar como um chatbot baseado em regras usa palavras-chave para adivinhar a intenção de um usuário.",
            },
            {
              text: "Mapear um conjunto de intenções e respostas como uma árvore de decisão.",
            },
            {
              text: "Explicar por que um chatbot precisa de uma resposta de reserva para as mensagens que ele não entende.",
            },
            {
              text: "Comparar um chatbot baseado em regras com uma IA que aprende com exemplos.",
            },
          ],
          materials: [
            {
              name: "Esta aula em um navegador web",
            },
            {
              name: "Papel e lápis, ou um aplicativo de notas",
            },
            {
              name: "Uma régua ou borda reta para desenhar um diagrama de árvore caprichado",
              note: "Só ajuda a deixar a árvore de decisão organizada; à mão livre serve.",
            },
          ],
          vocabulary: [
            {
              term: "Palavra-chave",
              definition: "Uma palavra importante que o chatbot procura em uma mensagem para descobrir o que a pessoa quer, como \"horário\" ou \"preço\".",
            },
            {
              term: "Intenção",
              definition: "O que a pessoa está de fato tentando fazer ou perguntar, como \"descobrir o horário de funcionamento\", mesmo que ela diga isso de várias maneiras diferentes.",
            },
            {
              term: "Árvore de decisão",
              definition: "Um conjunto ramificado de escolhas sim/não ou se/então que leva de uma mensagem a uma resposta, como um fluxograma.",
            },
            {
              term: "Resposta de reserva",
              definition: "A resposta de segurança que um chatbot dá quando não bate com nenhuma palavra-chave nem intenção, como \"Desculpe, não entendi isso\".",
            },
          ],
          openingScenario: {
            prompt: "A janela de chat de uma pizzaria responde na hora a \"Que horas vocês fecham?\", mas devolve \"Desculpe, não entendi\" quando você digita \"até que horas vocês atendem?\". As duas perguntas querem dizer a mesma coisa. Por que uma funciona e a outra falha?",
            context: "Guarde o seu palpite: no fim você vai conseguir explicar exatamente o que deu errado.",
          },
          predictionPrompt: {
            prompt: "Preveja: se um chatbot só conhece a palavra-chave \"fecham\", de quantas maneiras diferentes um cliente poderia perguntar sobre o horário de fechamento sem nunca usar essa palavra?",
            howToCheck: "Enquanto lê, liste jeitos que um cliente poderia usar e conte quantos deixam de fora a palavra-chave \"fecham\".",
          },
          concepts: [
            {
              title: "Palavras-chave: as palavras que o chatbot fica de olho",
              body: [
                "Um chatbot baseado em regras não entende linguagem do jeito que você entende. Em vez disso, uma pessoa dá a ele uma lista de palavras-chave para procurar. Quando a sua mensagem contém uma palavra-chave como \"horário\", \"abrem\" ou \"fecham\", o bot escolhe a resposta que um humano escreveu para aquela palavra.",
                "Isso é rápido e previsível, mas frágil. Se você perguntar a mesma coisa com outras palavras, a palavra-chave não está lá, e o bot não percebe nada.",
              ],
              examples: [
                "Palavra-chave \"horário\" → responder com o horário de funcionamento",
                "Palavra-chave \"preço\" ou \"custa\" → responder com os preços do cardápio",
                "Palavra-chave \"devolução\" → responder com a política de trocas",
              ],
            },
            {
              title: "Intenção: o que a pessoa realmente quer",
              body: [
                "Por trás das palavras existe uma intenção: aquilo que a pessoa está de fato tentando fazer. \"Que horas vocês fecham?\", \"Vocês abrem até tarde?\" e \"Até que horas vocês atendem?\" são três frases diferentes com uma única intenção: descobrir o horário.",
                "Um bom projeto de chatbot agrupa muitas palavras-chave e formulações sob a mesma intenção. Quanto mais palavras-chave você ligar a uma intenção, mais jeitos de perguntar o bot consegue pegar, mas alguém ainda precisa pensar em todos eles com antecedência.",
              ],
              examples: [
                "A intenção \"ver horário\" combina com: horário, abrem, fecham, fechamento, tarde, quando",
                "A intenção \"achar o endereço\" combina com: onde, endereço, como chegar, localizados",
                "A intenção \"fazer um pedido\" combina com: pedido, comprar, entrega, retirada",
              ],
            },
            {
              title: "Árvore de decisão e resposta de reserva: levar uma mensagem até uma resposta",
              body: [
                "Um chatbot baseado em regras segue uma árvore de decisão: procura as palavras-chave da primeira intenção; se achar, dá aquela resposta; se não, procura a intenção seguinte, e assim por diante, descendo pelos galhos. Cada galho termina em uma resposta que uma pessoa escreveu.",
                "Mas nenhuma lista de palavras-chave cobre todas as mensagens possíveis. Quando nada bate, a árvore chega ao último galho: a resposta de reserva. Ela é um honesto \"não entendi isso\" mais, nos bons projetos, uma dica do que o bot consegue ajudar. Sem uma resposta de reserva, uma mensagem sem correspondência não receberia resposta nenhuma.",
              ],
              examples: [
                "A mensagem \"até que horas vocês atendem?\", sem a palavra-chave \"horário\" → cai na resposta de reserva",
                "Resposta de reserva: \"Desculpe, posso ajudar com horário, endereço e pedidos. Experimente perguntar sobre um desses.\"",
              ],
            },
          ],
          workedExample: {
            title: "Acompanhando uma mensagem pela árvore",
            steps: [
              "Uma pessoa configurou três intenções no bot: \"ver horário\" (palavras-chave: horário, abrem, fecham), \"achar o endereço\" (onde, endereço) e \"fazer um pedido\" (pedido, entrega).",
              "Um cliente digita: \"Quanto custa uma pizza grande?\"",
              "Galho 1: contém horário, abrem ou fecham? Não. Vá em frente.",
              "Galho 2: contém onde ou endereço? Não. Vá em frente.",
              "Galho 3: contém pedido ou entrega? Não. Vá em frente.",
              "Nenhum galho bateu, então a árvore chega à resposta de reserva: \"Desculpe, não entendi. Posso ajudar com horário, endereço e pedidos.\" O cliente queria mesmo era o preço, uma intenção que nunca foi dada ao bot.",
            ],
            takeaway: "Um bot baseado em regras só consegue responder às intenções que alguém programou; qualquer outra coisa cai na resposta de reserva, mesmo quando a pergunta é perfeitamente clara para uma pessoa.",
          },
          visuals: [
            {
              title: "Como um chatbot baseado em regras encaminha uma mensagem",
              summary: "Uma árvore de decisão que começa no topo com a mensagem que chega e desce por uma verificação para cada intenção. O nó 1 pergunta: \"A mensagem contém horário, abrem ou fecham?\". Se sim, o galho termina na resposta \"Abrimos das 11h às 22h\". Se não, desce para o nó 2: \"Contém onde ou endereço?\". Se sim, o galho termina em \"Estamos na Rua Principal, 5\". Se não, vai para o nó 3: \"Contém pedido ou entrega?\". Se sim, o galho termina em \"Peça pelo site ou ligue 555-1234\". Se não, o galho final é a resposta de reserva: \"Desculpe, não entendi. Posso ajudar com horário, endereço e pedidos\". Todo galho de sim é uma folha com uma resposta escrita por uma pessoa; o último galho de não é sempre a resposta de reserva, para que nenhuma mensagem fique sem resposta.",
              caption: "Cada intenção é uma verificação; o último galho é a resposta de reserva, que pega tudo o que não bateu.",
              tree: {
                label: "Mensagem recebida",
                branches: [
                  {
                    condition: "menciona horário, abrem ou fecham",
                    child: {
                      label: "Resposta: \"Abrimos das 11h às 22h.\"",
                    },
                  },
                  {
                    condition: "menciona onde ou endereço",
                    child: {
                      label: "Resposta: \"Estamos na Rua Principal, 5.\"",
                    },
                  },
                  {
                    condition: "menciona pedido ou entrega",
                    child: {
                      label: "Resposta: \"Peça pelo site ou ligue 555-1234.\"",
                    },
                  },
                  {
                    condition: "não bate com nada acima",
                    child: {
                      label: "Resposta de reserva: \"Desculpe, não entendi. Posso ajudar com horário, endereço e pedidos.\"",
                    },
                  },
                ],
              },
            },
            {
              title: "A mesma intenção, muitas formulações",
              summary: "Uma tabela mostrando que uma única intenção, \"ver horário\", pode ser perguntada de várias maneiras. Linhas: \"Que horas vocês fecham?\" contém a palavra-chave \"fecham\", então bate. \"Vocês abrem até tarde?\" contém \"abrem\", então bate. \"Até que horas vocês atendem?\" não contém nenhuma palavra-chave listada, então falha e cai na resposta de reserva. \"Ainda estão servindo?\" também não contém nenhuma palavra-chave listada, então também falha. A lição: acrescentar mais palavras-chave pega mais formulações, mas uma pessoa precisa pensar em todas elas.",
              table: {
                columns: [
                  "Mensagem do cliente",
                  "Palavra-chave encontrada?",
                  "Resultado",
                ],
                rows: [
                  [
                    "Que horas vocês fecham?",
                    "fecham",
                    "Bate com \"ver horário\"",
                  ],
                  [
                    "Vocês abrem até tarde?",
                    "abrem",
                    "Bate com \"ver horário\"",
                  ],
                  [
                    "Até que horas vocês atendem?",
                    null,
                    "Cai na resposta de reserva",
                  ],
                  [
                    "Ainda estão servindo comida?",
                    null,
                    "Cai na resposta de reserva",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "Construtor de chatbots baseados em regras",
            goal: "Construir um chatbot funcional baseado em regras a partir de um modelo pronto (intenções, palavras-chave, um galho de acompanhamento e uma resposta de reserva) e testá-lo em uma prévia ao vivo que mostra exatamente qual regra bateu.",
            overview: "Comece de um modelo seguro (biblioteca, reciclagem, museu, clube ou ajuda com a lição) e edite-o com controles estruturados, sem programar. Acrescente e reordene intenções, dê a cada uma suas palavras-chave e sua resposta, acrescente um galho de acompanhamento, e defina uma resposta de reserva, um limite de privacidade e uma opção de ajuda humana. Um esboço da árvore de decisão e uma validação ao vivo apontam becos sem saída, nós inalcançáveis e a falta de uma resposta de reserva. Depois converse com o seu bot em uma prévia ao vivo que mostra a regra que bateu em cada resposta, e mantenha uma transcrição de teste que você pode apagar sem excluir o bot. Nada é enviado a nenhum serviço externo; a correspondência é real, por palavras-chave e determinística.",
            steps: [
              "Escolha um modelo e edite a saudação, as intenções (palavras-chave + respostas), um galho de acompanhamento e a resposta de reserva.",
              "Observe o esboço da árvore de decisão e as verificações de becos sem saída, nós inalcançáveis e falta de resposta de reserva.",
              "Teste o bot ao vivo: perguntas normais, entradas inesperadas e pedir para falar com uma pessoa.",
              "Leia o rastro da regra de cada resposta e o registro da transcrição de teste.",
            ],
            materials: [
              "O construtor de chatbots e os modelos já incluídos nesta atividade",
            ],
            successCriteria: [
              "Um chatbot com pelo menos três intenções, um galho de acompanhamento, uma resposta de reserva, um limite de privacidade e uma opção de ajuda humana.",
              "As verificações de validação passam (sem becos sem saída, nós inalcançáveis ou falta de resposta de reserva).",
              "O bot é testado com entradas normais e inesperadas, e a regra que bateu fica visível.",
            ],
            dataset: {
              name: "Modelos de chatbot (temas seguros)",
              description: "Cinco modelos de chatbot baseados em regras, já incluídos e editáveis, sobre temas seguros (biblioteca escolar, reciclagem, museu, clube, planejamento de lição de casa). Sem conselhos médicos, jurídicos ou de crise; nada é enviado a um serviço externo; a correspondência por palavras-chave é determinística.",
              columns: [
                "Modelo",
                "Intenções",
                "Galho de acompanhamento",
                "Resposta de reserva",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responda a estas perguntas para conferir se você entendeu como funciona um chatbot baseado em regras.",
            questions: [
              {
                prompt: "O que é uma \"intenção\" em um chatbot?",
                explanation: "Uma intenção é o objetivo por trás de uma mensagem, o que a pessoa quer, não importa quais palavras exatas ela use.",
                choices: [
                  {
                    text: "As palavras exatas que a pessoa digitou",
                    explanation: "As palavras exatas são só a mensagem; muitas palavras diferentes podem ter uma mesma intenção.",
                  },
                  {
                    text: "O que a pessoa está realmente tentando fazer ou perguntar",
                    explanation: "Correto: a intenção é o objetivo de fundo, como \"ver o horário\", seja qual for a formulação.",
                  },
                  {
                    text: "A resposta que o chatbot envia",
                    explanation: "Essa é a resposta de saída, não a intenção por trás da mensagem da pessoa.",
                  },
                  {
                    text: "Uma palavra que o bot não reconheceu",
                    explanation: "Uma palavra não reconhecida leva à resposta de reserva; não é a definição de uma intenção.",
                  },
                ],
              },
              {
                prompt: "Decida se a afirmação é verdadeira ou falsa.",
                statement: "Um chatbot baseado em regras precisa de uma resposta de reserva para que as mensagens sem correspondência ainda recebam alguma resposta.",
                explanation: "Verdadeiro: sem uma resposta de reserva, qualquer mensagem que escapasse de todas as palavras-chave não receberia resposta alguma. A resposta de reserva é o último galho, que pega tudo.",
              },
              {
                prompt: "Coloque na ordem certa os passos de como um chatbot baseado em regras responde a uma mensagem.",
                explanation: "O bot recebe a mensagem, confere as palavras-chave de cada intenção uma por vez, envia a resposta que bateu, e usa a resposta de reserva só se nada bateu.",
                items: [
                  {
                    text: "Chega uma mensagem da pessoa",
                  },
                  {
                    text: "O bot confere a mensagem contra as palavras-chave de cada intenção, galho por galho",
                  },
                  {
                    text: "Se um galho bate, o bot envia a resposta daquele galho",
                  },
                  {
                    text: "Se nenhum galho bateu, o bot envia a resposta de reserva",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Quebre o seu próprio chatbot",
            prompt: "Pegue o chatbot que você criou e tente enganá-lo. Ache três mensagens que uma pessoa de verdade poderia enviar e que as suas palavras-chave não pegam.",
            steps: [
              "Escreva três mensagens que signifiquem algo que o seu bot deveria dar conta, mas que evitem todas as suas palavras-chave.",
              "Acompanhe cada uma pela sua árvore e confirme que ela cai na resposta de reserva.",
              "Para cada uma, decida: dava para consertar acrescentando uma palavra-chave, ou é diferente demais para pegar com regras?",
            ],
            successCriteria: [
              "Três mensagens que chegam à resposta de reserva mesmo sendo compreensíveis para uma pessoa.",
              "Para cada uma, uma anotação sobre se uma palavra-chave resolveria.",
              "Um exemplo claro que palavras-chave sozinhas não resolvem.",
            ],
          },
          reflection: [
            {
              prompt: "Que tipo de pergunta o seu chatbot resolveu bem, e qual ele continuou errando?",
            },
            {
              prompt: "Como aprender com milhares de mensagens reais ajudaria um chatbot a pegar formulações em que você nunca pensou?",
            },
          ],
          recap: {
            summary: "Um chatbot baseado em regras casa palavras-chave para adivinhar a intenção do usuário, leva a mensagem por uma árvore de decisão, e usa uma resposta de reserva para tudo que não consegue casar.",
            keyPoints: [
              "Palavras-chave são as palavras que o bot fica de olho; intenções são o que a pessoa realmente quer.",
              "Uma árvore de decisão confere uma intenção por galho e termina em uma resposta de reserva.",
              "Bots baseados em regras só dão conta das intenções que alguém programou; todo o resto escapa.",
            ],
          },
          extension: {
            title: "Das regras ao aprendizado",
            body: [
              "Os grandes chatbots reais não dependem só de listas de palavras-chave. Muitos usam aprendizado de máquina treinado com milhares de mensagens reais, então conseguem reconhecer uma intenção até em formulações que ninguém digitou à mão.",
              "Descreva uma vantagem e um risco de um chatbot baseado em aprendizado comparado ao seu, baseado em regras. Pense no que acontece quando as mensagens de treinamento não incluem o jeito de falar de algumas pessoas.",
            ],
          },
        },
        {
          title: "Como os modelos de linguagem preveem texto",
          summary: "Olhe por dentro da IA por trás do autocompletar e dos assistentes de chat: ela quebra o texto em trechos e prevê o próximo trecho provável, o que soa fluente mas não é o mesmo que ser verdadeiro.",
          estimatedTime: "50-60 minutos",
          objectives: [
            {
              text: "Explicar que um modelo de linguagem prevê o próximo trecho provável de texto.",
            },
            {
              text: "Descrever como o texto é quebrado em tokens (trechos) com que o modelo trabalha.",
            },
            {
              text: "Explicar como um comando inicia e direciona a previsão.",
            },
            {
              text: "Explicar por que um texto que soa fluente não é o mesmo que um texto verdadeiro ou correto.",
            },
          ],
          materials: [
            {
              name: "Esta aula em um navegador web",
            },
            {
              name: "Papel e lápis, ou um aplicativo de notas",
            },
          ],
          vocabulary: [
            {
              term: "Modelo de linguagem",
              definition: "Uma IA treinada com quantidades enormes de texto, que prevê qual texto tem chance de vir a seguir.",
            },
            {
              term: "Token (trecho de texto)",
              definition: "Um pedacinho de texto com que o modelo trabalha, muitas vezes uma palavra ou parte de uma palavra, como \"brinc\", \"ando\", ou um sinal de pontuação.",
            },
            {
              term: "Próximo texto provável",
              definition: "Os trechos que o modelo estima como mais prováveis de vir a seguir, com base nos padrões do texto com que ele aprendeu.",
            },
            {
              term: "Comando",
              definition: "O texto inicial que você dá a um modelo de linguagem, que ele continua prevendo o que vem depois.",
            },
            {
              term: "Fluente",
              definition: "Que se lê de forma corrida e soa natural. Um texto fluente ainda pode estar errado, porque soar certo não é o mesmo que estar certo.",
            },
          ],
          openingScenario: {
            prompt: "Digite \"Era uma vez\" em um celular e ele sugere \"um\". Digite \"A capital da Austrália é\" em um assistente de chat e ele pode responder com toda a fluência \"Sydney\", o que está errado; é Camberra. Se as duas respostas soam naturais, como a IA decide o que dizer?",
            context: "Guarde isto: soar certo e estar certo são duas coisas diferentes.",
          },
          predictionPrompt: {
            prompt: "Preveja: quando você digita \"pão com\", que palavra você acha que um modelo de linguagem tem mais chance de acrescentar, e por que justo essa?",
            howToCheck: "Enquanto lê, repare que o modelo escolhe o trecho que mais vezes veio depois de textos parecidos naquilo com que ele aprendeu.",
          },
          concepts: [
            {
              title: "O texto é quebrado em trechos chamados tokens",
              body: [
                "Um modelo de linguagem não lê redações inteiras de uma vez. Ele quebra o texto em pedacinhos chamados tokens. Um token costuma ser uma palavra, mas palavras longas ou incomuns são divididas: \"inacreditável\" pode virar \"ina\", \"credit\" e \"ável\". Espaços e pontuação também contam.",
                "Trabalhar em tokens permite ao modelo lidar com qualquer texto, até com palavras que ele nunca viu, combinando pedaços conhecidos.",
              ],
              examples: [
                "\"Eu amo pizza\" → tokens: \"Eu\", \" amo\", \" pizza\"",
                "\"brincando\" → tokens: \"brinc\", \"ando\"",
                "Um ponto final \".\" é um token por si só",
              ],
            },
            {
              title: "O modelo prevê o próximo trecho provável",
              body: [
                "Um modelo de linguagem tem uma tarefa central: dado o texto até aqui, prever o próximo token. Ele aprendeu com enormes quantidades de texto quais trechos costumam vir depois de quais. Depois de \"pão com\", o trecho \"manteiga\" é bem provável, então é isso que ele prevê.",
                "E ele faz isso de novo e de novo: prevê um trecho, acrescenta, e prevê o seguinte, para montar frases inteiras. O seu comando é o texto inicial que põe tudo em movimento; mude o comando e os próximos trechos prováveis mudam também.",
              ],
              examples: [
                "Comando \"O céu está\" → próximo trecho provável \"azul\"",
                "Comando \"Prezada diretora,\" → os próximos trechos prováveis começam uma carta formal",
                "Comando \"def somar(a, b):\" → os próximos trechos prováveis parecem código de computador",
              ],
            },
            {
              title: "Fluente não é o mesmo que verdadeiro",
              body: [
                "Esta é a ideia mais importante da aula. Um modelo de linguagem prevê qual texto é provável, não o que é verdadeiro. \"Provável\" quer dizer que aquilo se encaixa nos padrões de linguagem que ele aprendeu, e não que alguém conferiu os fatos.",
                "Então um modelo pode produzir uma frase corrida, confiante e bem construída que é simplesmente falsa. Às vezes isso é chamado de resposta inventada ou \"alucinada\". Uma saída fluente significa que as palavras se encaixam bem; não diz nada sobre a afirmação estar correta. Sempre confira fatos importantes em uma fonte confiável, e não só porque a IA \"pareceu segura\".",
              ],
              examples: [
                "Um modelo pode citar o título de um livro falso em uma frase perfeitamente natural",
                "Ele pode dar com toda a segurança uma data errada que se lê de forma corrida",
                "Ele pode inventar uma fonte que parece real mas não existe",
              ],
            },
          ],
          workedExample: {
            title: "Prevendo trecho por trecho a partir de um comando",
            steps: [
              "Comando: \"A melhor parte do verão é\".",
              "O modelo quebra isso em tokens e olha os padrões de texto que vieram depois de começos parecidos.",
              "Ele prevê o próximo trecho mais provável, talvez \" nadar\", e acrescenta.",
              "Agora o texto é \"A melhor parte do verão é nadar\"; ele prevê de novo, talvez \" na\", depois \" piscina\".",
              "Trecho por trecho ele monta uma frase fluente. Repare: em momento nenhum ele conferiu se nadar é mesmo a melhor parte do verão; ele só seguiu padrões prováveis.",
            ],
            takeaway: "Um modelo de linguagem monta o texto um trecho provável por vez a partir do seu comando; o resultado soa natural, mas é uma previsão, não um fato conferido.",
          },
          visuals: [
            {
              title: "Prever, acrescentar, repetir",
              summary: "Um ciclo mostrado como fluxo. Início: o texto do comando. Passo 1: quebrar em tokens (trechos). Passo 2: prever o próximo trecho mais provável. Passo 3: acrescentar esse trecho ao texto. Uma seta volta do passo 3 ao passo 2 para prever de novo, e de novo, fazendo o texto crescer trecho por trecho até parar. O fluxo destaca que cada passo só pergunta \"que trecho é provável a seguir?\", nunca \"isso é verdade?\".",
              caption: "O modelo repete uma única pergunta, que trecho é provável a seguir, nunca \"isso está correto?\".",
            },
            {
              title: "Qual a probabilidade de cada próximo trecho depois de \"O céu está\"",
              summary: "Um gráfico de barras com probabilidades inventadas mas realistas para o próximo trecho depois do comando \"O céu está\". \"azul\" é de longe a barra mais alta, com cerca de 60 em 100; \"limpo\" fica por volta de 15, \"caindo\" por volta de 8, \"cinza\" por volta de 7, e \"verde\" é uma barra bem curta, de cerca de 2. O modelo tende a escolher uma barra alta, e é por isso que ele normalmente diz \"azul\", mas uma barra curta como \"verde\" ainda é possível, e \"provável\" nunca quer dizer \"conferido como verdadeiro\".",
              chart: {
                unit: "probabilidade em 100",
                bars: [
                  {
                    label: "azul",
                  },
                  {
                    label: "limpo",
                  },
                  {
                    label: "caindo",
                  },
                  {
                    label: "cinza",
                  },
                  {
                    label: "verde",
                  },
                ],
              },
            },
          ],
          activity: {
            title: "Laboratório de previsão do próximo texto",
            goal: "Rodar um pequeno previsor local da próxima palavra: ver as próximas palavras prováveis para um comando, trocar uma palavra para observar as probabilidades mudarem, e julgar se um texto fluente é de fato verdadeiro.",
            overview: "Um modelo de n-gramas minúsculo, construído a partir de uma lista local e selecionada de palavras, prevê as próximas palavras mais prováveis para um comando e mostra as probabilidades relativas delas em um gráfico pequeno, sem nenhum modelo de linguagem externo e sem rede. Troque uma palavra (tempestade → desfile) ou acrescente palavras suas, e as previsões são recalculadas de forma determinística, com uma explicação de se ele usou as duas últimas palavras ou recuou para apenas uma. Depois julgue as cartas de fluência: frases corridas e confiantes que ainda assim podem inventar uma data, uma citação ou uma afirmação falsa, cada uma com um jeito de verificar.",
            steps: [
              "Escolha um comando e leia as próximas palavras mais prováveis e as probabilidades delas.",
              "Troque uma palavra ou acrescente as suas, e observe as probabilidades mudarem.",
              "Leia a explicação do que o modelo casou: ele está casando padrões, não compreendendo.",
              "Julgue as cartas de fluência: decida verdadeiro / falso / precisa conferir, depois revele e veja como verificar.",
            ],
            materials: [
              "O laboratório de previsão do próximo texto já incluído nesta atividade",
            ],
            successCriteria: [
              "As próximas palavras prováveis são lidas para pelo menos dois comandos, incluindo uma troca de palavra.",
              "O efeito de mudar o contexto sobre as probabilidades é observado.",
              "Uma carta fluente mas falsa é identificada, com um jeito de verificá-la.",
            ],
            dataset: {
              name: "Corpus local + cartas de fluência",
              description: "Uma lista de palavras pequena, selecionada e adequada à idade, com que o modelo local de n-gramas é construído, além das cartas de fluência: frases corridas que são verdadeiras ou fluentes mas falsas (uma data inventada, uma citação atribuída errado), com notas de verificação. Nenhum texto é enviado a um serviço de IA.",
              columns: [
                "Comando",
                "Próximas palavras prováveis",
                "Continuação",
                "É verdade?",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responda a estas perguntas para conferir se você entendeu como um modelo de linguagem prevê texto.",
            questions: [
              {
                prompt: "O que um modelo de linguagem está de fato fazendo quando escreve uma resposta?",
                explanation: "Um modelo de linguagem prevê, repetidas vezes, o próximo trecho provável de texto; ele não está consultando fatos conferidos.",
                choices: [
                  {
                    text: "Consultando fatos verificados em uma enciclopédia confiável",
                    explanation: "Ele não verifica fatos; ele prevê texto provável, que pode estar errado.",
                  },
                  {
                    text: "Prevendo o próximo trecho provável de texto, de novo e de novo",
                    explanation: "Correto: ele monta o texto um trecho provável por vez, com base em padrões aprendidos.",
                  },
                  {
                    text: "Copiando uma resposta inteira, palavra por palavra, de um site",
                    explanation: "Ele gera texto trecho por trecho a partir de padrões, e não copiando uma página.",
                  },
                  {
                    text: "Perguntando a resposta a uma pessoa toda vez",
                    explanation: "Não há pessoa nenhuma respondendo; o modelo prevê por conta própria.",
                  },
                ],
              },
              {
                prompt: "Decida se a afirmação é verdadeira ou falsa.",
                statement: "Se a resposta de um modelo de linguagem é fluente e soa confiante, isso prova que a resposta é verdadeira.",
                explanation: "Falso: fluente quer dizer que as palavras se encaixam bem, não que a afirmação esteja correta. Um modelo pode dizer algo errado com muita naturalidade, então fatos importantes precisam ser conferidos.",
              },
              {
                prompt: "Qual é a atitude mais inteligente nesta situação?",
                scenario: "Para um trabalho, Priya pergunta a um assistente de chat quando uma ponte famosa foi construída. Ele responde com uma frase corrida e um ano específico que ela nunca tinha visto.",
                explanation: "A resposta é uma previsão de texto provável, e não um fato conferido, então Priya deveria confirmar o ano em uma fonte confiável antes de usá-lo.",
                choices: [
                  {
                    text: "Usar o ano na hora, porque a frase soou confiante",
                    explanation: "Soar confiante é fluência, não prova; o modelo pode ter previsto um ano errado.",
                  },
                  {
                    text: "Conferir o ano em uma fonte confiável antes de usá-lo",
                    explanation: "Correto: verifique fatos importantes, porque o modelo prevê texto provável, e não verdade conferida.",
                  },
                  {
                    text: "Presumir que deve estar errado e ignorar completamente",
                    explanation: "Pode estar certo ou errado; a questão é verificar, e não confiar nem rejeitar às cegas.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Detetive do provável contra o verdadeiro",
            prompt: "Reúna dois exemplos em que \"próximo texto provável\" e \"verdadeiro\" puxam para lados diferentes.",
            steps: [
              "Escreva um comando em que a continuação provável também seja verdadeira (por exemplo, \"Dois mais dois é\").",
              "Escreva um comando em que uma continuação de aparência provável poderia facilmente ser falsa (por exemplo, uma data específica ou o autor de um livro).",
              "Para o arriscado, descreva exatamente como você conferiria se a resposta é verdadeira.",
            ],
            successCriteria: [
              "Um comando em que provável e verdadeiro coincidem.",
              "Um comando em que uma resposta fluente poderia ser falsa.",
              "Um plano claro para verificar a resposta arriscada em uma fonte confiável.",
            ],
          },
          reflection: [
            {
              prompt: "Quando tudo bem confiar em uma resposta fluente de IA, e quando você deveria sempre conferir duas vezes?",
            },
            {
              prompt: "Como ver o texto como \"trechos com probabilidades\" mudou o seu jeito de pensar sobre a escrita feita por IA?",
            },
          ],
          recap: {
            summary: "Um modelo de linguagem quebra o texto em trechos e prevê o próximo trecho provável a partir de um comando; a saída soa fluente, mas é uma previsão, e não um fato conferido.",
            keyPoints: [
              "O texto é quebrado em tokens (trechos); o modelo prevê o próximo provável, repetidas vezes.",
              "O seu comando é o texto inicial que direciona as previsões.",
              "Fluente não é o mesmo que verdadeiro: sempre verifique fatos importantes.",
            ],
          },
          extension: {
            title: "Por que os modelos inventam coisas",
            body: [
              "Como um modelo de linguagem sempre prevê o texto de aparência mais provável, ele vai preencher uma lacuna com toda a confiança mesmo sem ter informação real, produzindo uma resposta inventada que se encaixa no padrão de uma verdadeira. As pessoas chamam isso de \"alucinação\".",
              "Explique em poucas frases por que um sistema feito para prever texto provável inventaria uma fonte falsa em vez de dizer \"não sei\", e sugira um hábito que te proteja de ser enganado.",
            ],
          },
        },
        {
          title: "Construa e questione as recomendações",
          summary: "Veja como os sistemas de recomendação usam similaridade e o seu retorno para sugerir o que vem a seguir, e questione como esse mesmo sistema pode te prender em uma bolha de filtro.",
          estimatedTime: "50-60 minutos",
          objectives: [
            {
              text: "Explicar como um sistema de recomendação usa similaridade para sugerir itens.",
            },
            {
              text: "Descrever como o seu retorno (curtidas, pulos, tempo assistido) treina as recomendações.",
            },
            {
              text: "Explicar o que é uma bolha de filtro e como as recomendações podem criar uma.",
            },
            {
              text: "Auditar um feed de recomendações e sugerir maneiras de ver uma variedade maior.",
            },
          ],
          materials: [
            {
              name: "Esta aula em um navegador web",
            },
            {
              name: "Papel e lápis, ou um aplicativo de notas",
            },
          ],
          vocabulary: [
            {
              term: "Recomendação",
              definition: "Uma sugestão de algo de que você pode gostar em seguida (um vídeo, uma música, um produto ou uma publicação), escolhida por um sistema de IA.",
            },
            {
              term: "Similaridade",
              definition: "O quanto dois itens ou duas pessoas se parecem. Os recomendadores sugerem itens parecidos com os de que você gostou, ou de que pessoas parecidas com você gostaram.",
            },
            {
              term: "Retorno",
              definition: "Os sinais que você dá a um sistema (curtidas, pulos, cliques, tempo assistido) e que ele usa para aprender os seus gostos.",
            },
            {
              term: "Bolha de filtro",
              definition: "Quando um sistema continua mostrando coisas parecidas, então você vê principalmente uma fatia estreita de ideias ou conteúdos e perde o resto.",
            },
          ],
          openingScenario: {
            prompt: "Você assiste a um vídeo sobre manobras de skate. Logo o seu feed inteiro é skate, e os vídeos de qualquer outro assunto somem. Como o aplicativo decidiu te mostrar só isso, e o que você pode estar perdendo?",
            context: "Você vai aprender tanto como isso é construído quanto por que vale a pena questionar.",
          },
          predictionPrompt: {
            prompt: "Preveja: se um aplicativo de música só tocasse músicas parecidas com as suas três favoritas, que tipos de música você provavelmente nunca descobriria?",
            howToCheck: "Enquanto lê, ligue a sua resposta ao jeito como a similaridade e o retorno vão estreitando o que um feed mostra.",
          },
          concepts: [
            {
              title: "As recomendações funcionam por similaridade",
              body: [
                "Um sistema de recomendação sugere itens medindo similaridade. Se você gostou de um vídeo, ele procura outros vídeos parecidos (mesmo assunto, estilo ou criador) ou vídeos de que pessoas parecidas com você também gostaram. E então coloca esses no topo do seu feed.",
                "Isso é genuinamente útil: ajuda você a achar coisas de que gostaria sem precisar procurar. O sistema está respondendo a \"o que é mais parecido com aquilo de que esta pessoa já gostou?\".",
              ],
              examples: [
                "Gostou de um vídeo de culinária → recomenda mais vídeos de culinária",
                "\"Quem comprou isto também comprou…\" em um site de compras",
                "Uma estação de músicas montada a partir de um artista de que você gosta",
              ],
            },
            {
              title: "O seu retorno treina o sistema",
              body: [
                "O sistema não conhece o seu gosto de antemão: ele aprende com o seu retorno. Cada curtida, pulo, clique, repetição e até quanto tempo você assiste é um sinal. Assistir até o fim conta como um forte \"mais disso\". Pular depois de dois segundos conta como \"menos disso\".",
                "Ou seja, você está treinando o seu próprio feed o tempo todo, muitas vezes sem querer. Parar em um vídeo por tempo suficiente pode empurrar o sistema a te mostrar mais daquele tipo, quer você quisesse mais ou não.",
              ],
              examples: [
                "Terminar um vídeo → mais daquele assunto",
                "Pular rápido → menos daquele tipo",
                "Curtir uma publicação → mais daquele criador e de criadores parecidos",
              ],
            },
            {
              title: "Bolhas de filtro: quando a similaridade estreita o seu mundo",
              body: [
                "Aqui está o compromisso honesto. Como o sistema continua te mostrando o que é mais parecido com aquilo de que você já gostou, o seu feed pode ficar cada vez mais estreito. Isso se chama bolha de filtro: você acaba vendo uma fatia só de conteúdo e perde inteiramente outros assuntos, pontos de vista e criadores.",
                "Bolhas de filtro importam para além do entretenimento. Se um feed de notícias ou opiniões só te mostra visões com que você já concorda, você pode achar que todo mundo concorda, e raramente encontrar boas ideias que te desafiem. Bolhas de filtro não são causadas por uma IA \"ruim\": são um efeito colateral de um sistema fazendo exatamente aquilo para o que foi construído, maximizar a similaridade com o seu comportamento passado. Saber disso permite reagir: procurando assuntos novos, seguindo criadores diferentes, ou usando controles que acrescentam variedade.",
              ],
              examples: [
                "Um feed que vira só um hobby depois de um único vídeo",
                "Um feed de notícias que mostra só um lado de uma questão",
                "Um site de compras que nunca te mostra uma marca mais barata ou diferente",
              ],
            },
          ],
          workedExample: {
            title: "Como um clique pode encolher um feed",
            steps: [
              "Você abre um aplicativo de vídeos; o feed é variado: esportes, ciência, música, comédia, culinária.",
              "Você assiste a um vídeo de ciência inteiro, do começo ao fim. Isso é um forte retorno positivo.",
              "O sistema acha os vídeos mais parecidos com aquele e os sobe de posição, porque a similaridade diz \"mostre mais parecido com o que a pessoa terminou\".",
              "Você assiste a mais alguns vídeos de ciência; cada um que termina é mais retorno apontando na mesma direção.",
              "Agora o feed é quase todo de ciência. Os vídeos de música e comédia, de que você também poderia adorar, quase não aparecem: você escorregou para uma bolha de filtro construída com o seu próprio retorno.",
              "Para alargá-la, você procura de propósito um assunto novo, pula alguns vídeos de ciência, ou usa um controle de \"não tenho interesse\" para enviar outro retorno.",
            ],
            takeaway: "Similaridade mais o seu retorno tornam as recomendações úteis, mas esse mesmo ciclo pode estreitar silenciosamente o seu feed até virar uma bolha de filtro, a não ser que você aja para alargá-lo.",
          },
          visuals: [
            {
              title: "O ciclo de retorno das recomendações",
              summary: "Um fluxo circular com quatro etapas. Etapa 1: você assiste, curte ou pula algo (retorno). Etapa 2: o sistema atualiza o palpite dele sobre o seu gosto. Etapa 3: ele acha os itens mais parecidos com aquilo de que você gostou. Etapa 4: ele te mostra esses itens, o que molda o que você assiste em seguida, e a seta volta para a etapa 1. A legenda observa que o ciclo é útil, mas tende a se fechar em torno de um conjunto estreito de itens com o tempo, formando uma bolha de filtro.",
              caption: "O ciclo aprende rápido, mas cada volta pode puxar o seu feed para um conjunto mais estreito de itens parecidos.",
            },
            {
              title: "Um feed antes e depois de uma bolha de filtro",
              summary: "Antes: um feed equilibrado com cinco assuntos em proporções mais ou menos iguais: esportes, ciência, música, comédia e culinária. Depois: após um vídeo de ciência assistido até o fim e mais alguns, esse mesmo feed agora é quase todo de ciência, com só fatias mínimas dos outros. A mudança mostra como similaridade e retorno podem transformar um feed variado em um estreito, e aponta ações (procurar assuntos novos, pular, marcar \"não tenho interesse\") que devolvem a variedade.",
            },
          ],
          activity: {
            title: "Construtor de sistemas de recomendação",
            goal: "Construir um recomendador baseado em conteúdo: avaliar itens, escolher quais características importam, ler recomendações que se explicam sozinhas, e fazer um experimento de bolha de filtro.",
            overview: "Avalie itens de um catálogo fictício e defina o quanto cada característica importa. Um recomendador transparente e determinístico monta um perfil de preferências e pontua todos os outros itens por similaridade ponderada de características, e cada recomendação vem com um \"por que você está vendo isto\" em linguagem simples, além das características que subiram ou baixaram a pontuação dela. Um aviso de dados insuficientes aparece quando não há material suficiente. Depois faça o experimento da bolha de filtro: avalie um assunto só e veja o feed estreitar, tire uma foto do estado, acrescente um assunto diferente ou ligue o modo Explorar, e compare. Sem contas nem dados pessoais; apenas o catálogo já incluído.",
            steps: [
              "Avalie vários itens do catálogo de que você gosta ou não.",
              "Escolha quais características importam com os controles de peso.",
              "Leia as recomendações, junto com a explicação e as características que contribuíram para cada uma.",
              "Faça o experimento da bolha de filtro: um assunto só, foto do estado, depois acrescente um assunto ou ligue o modo Explorar e compare.",
            ],
            materials: [
              "O construtor de recomendações e o catálogo já incluídos nesta atividade",
            ],
            successCriteria: [
              "Um perfil é montado avaliando itens, e recomendações são geradas.",
              "Toda recomendação tem uma explicação, e o aviso de dados insuficientes é compreendido.",
              "O experimento da bolha de filtro é feito e o estreitamento (e como alargá-lo) é descrito.",
            ],
            dataset: {
              name: "Catálogo fictício de atividades de aprendizagem",
              description: "Um catálogo já incluído e inventado de itens de aprendizagem (atividades, livros, jogos, exposições) em seis assuntos, cada um com características estruturadas (assunto, tipo, dificuldade, duração, formato, faixa etária, popularidade fictícia). Sem dados pessoais nem contas; a pontuação e as explicações são determinísticas e calculadas no seu aparelho.",
              columns: [
                "Item",
                "Assunto",
                "Tipo",
                "Dificuldade",
                "Formato",
                "Faixa etária",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responda a estas perguntas para conferir se você sabe explicar e questionar recomendações.",
            questions: [
              {
                prompt: "O que um sistema de recomendação usa principalmente para decidir o que sugerir em seguida?",
                explanation: "Os recomendadores sugerem itens parecidos com aquilo de que você gostou, ou de que pessoas parecidas gostaram: isso é similaridade.",
                choices: [
                  {
                    text: "A similaridade entre itens, e entre os gostos das pessoas",
                    explanation: "Correto: ele acha itens parecidos com aquilo de que você gostou, ou de que pessoas parecidas gostaram.",
                  },
                  {
                    text: "Uma escolha aleatória, sem padrão nenhum",
                    explanation: "Recomendações não são aleatórias; são movidas por similaridade e pelo seu retorno.",
                  },
                  {
                    text: "A ordem alfabética dos títulos",
                    explanation: "Ordenar por título não é como os recomendadores escolhem o que mostrar.",
                  },
                  {
                    text: "O que for mais novo, sem levar em conta os seus gostos",
                    explanation: "Ser novo pode contar um pouco, mas o motor principal é a similaridade com os seus gostos.",
                  },
                ],
              },
              {
                prompt: "Quais destas são maneiras de alargar um feed e escapar de uma bolha de filtro? (Escolha todas que se aplicam.)",
                explanation: "Enviar um retorno diferente e buscar variedade de propósito afastam o sistema de uma bolha estreita; terminar passivamente vídeos parecidos só a aperta mais.",
                choices: [
                  {
                    text: "Procurar um assunto totalmente novo que você nunca assistiu",
                    explanation: "Correto: buscas novas dão sinais frescos ao sistema e ampliam as suas recomendações.",
                  },
                  {
                    text: "Seguir criadores diferentes dos de sempre",
                    explanation: "Correto: criadores diferentes acrescentam uma variedade que o ciclo de similaridade não ofereceria sozinho.",
                  },
                  {
                    text: "Continuar assistindo até o fim só vídeos idênticos ao anterior",
                    explanation: "Isso é um forte retorno de \"mais disso\", que aperta a bolha em vez de alargá-la.",
                  },
                  {
                    text: "Usar o controle de \"não tenho interesse\" nas sugestões repetitivas",
                    explanation: "Correto: isso envia um retorno de \"menos disso\" e abre espaço para outros assuntos.",
                  },
                ],
              },
              {
                prompt: "Qual alternativa explica melhor o que está acontecendo nesta situação?",
                scenario: "Depois que Sam termina vários vídeos defendendo um lado de um debate escolar, o feed dele para de mostrar o outro lado por completo, e ele começa a sentir que todo mundo concorda com ele.",
                explanation: "O sistema continua recomendando conteúdo parecido com o que Sam terminou, estreitando o feed dele a um único ponto de vista: uma bolha de filtro, que importa sobretudo em notícias e opiniões.",
                choices: [
                  {
                    text: "O aplicativo ficou sem vídeos sobre o outro lado",
                    explanation: "O outro lado continua existindo; o sistema só parou de trazê-lo à tona porque é menos parecido com o que Sam assistiu.",
                  },
                  {
                    text: "Sam está em uma bolha de filtro construída com o próprio retorno dele",
                    explanation: "Correto: a similaridade somada aos vídeos que ele terminou estreitou o feed a um único ponto de vista, uma bolha de filtro.",
                  },
                  {
                    text: "O sistema está quebrado e mostrando conteúdo aleatório",
                    explanation: "Ele está funcionando como foi projetado; maximizar a similaridade é exatamente o que criou a bolha.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Crie um recurso fura-bolha",
            prompt: "Invente um recurso para um aplicativo de vídeo ou de música que ajude as pessoas a escapar de bolhas de filtro sem deixar as recomendações de serem úteis.",
            steps: [
              "Descreva o recurso e que botão ou controle o usuário veria.",
              "Explique como ele muda o retorno ou a similaridade que o sistema usa.",
              "Aponte uma desvantagem (por exemplo, alguns usuários podem não querer mais variedade) e como você lidaria com ela.",
            ],
            successCriteria: [
              "Um recurso claro, com um controle que o usuário possa usar.",
              "Uma explicação de como ele alarga o feed.",
              "Uma desvantagem honesta e uma resposta a ela.",
            ],
          },
          reflection: [
            {
              prompt: "Em que parte da sua própria vida você já notou um feed ficando mais estreito com o tempo?",
            },
            {
              prompt: "Quando uma bolha de filtro é praticamente inofensiva, e quando ela poderia realmente importar?",
            },
          ],
          recap: {
            summary: "Os sistemas de recomendação usam similaridade e o seu retorno para sugerir o que vem a seguir, o que é útil, mas pode estreitar o seu feed até virar uma bolha de filtro, a não ser que você aja para alargá-lo.",
            keyPoints: [
              "Os recomendadores sugerem itens parecidos com os de que você (ou pessoas como você) gostou.",
              "As suas curtidas, pulos e tempo assistido são o retorno que treina o seu feed.",
              "Esse mesmo ciclo pode criar bolhas de filtro; procurar e dar retornos variados alargam o feed.",
            ],
          },
          extension: {
            title: "Quem se beneficia do seu retorno?",
            body: [
              "Sistemas de recomendação muitas vezes são projetados para manter você assistindo, porque mais tempo assistido pode significar mais lucro para a empresa. Esse objetivo nem sempre coincide com o seu objetivo de aprender de forma ampla ou de usar bem o seu tempo.",
              "Explique como o objetivo de uma empresa (mais tempo assistido) e o de um usuário (variedade, tempo bem gasto) podem puxar para lados diferentes, e sugira uma mudança de projeto honesta que serviria melhor aos usuários mesmo que reduzisse o tempo assistido.",
            ],
          },
        },
      ],
    },
  ],
}

const overlays: LocaleOverlays<IntroToAiCourse> = { es, zh, pt }

/** The Intro to Artificial Intelligence curriculum in the requested language. */
export const getIntroToAiCourse = createLocalizedResolver(
  introToAiCourse,
  overlays,
)

/** Whether this course has been translated into `language` at all. */
export function introToAiCourseHasTranslation(language: Language): boolean {
  return hasLocaleOverlay(overlays, language)
}

/** The week with this number, in the requested language. */
export function findAiWeek(language: Language, week: number): CourseWeek | undefined {
  return getIntroToAiCourse(language).weeks.find((entry) => entry.week === week)
}

/** The lesson with this slug inside a week, in the requested language. */
export function findAiLesson(
  language: Language,
  week: number,
  slug: string,
): Lesson | undefined {
  return findAiWeek(language, week)?.lessons.find((lesson) => lesson.slug === slug)
}

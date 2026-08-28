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
  finalProject: {
    title: "Estudio de Diseño de IA: diseña una IA que ayude",
    overview: "Con todo lo que aprendiste en las seis semanas, diseña una herramienta de IA que ayude a un grupo real de personas. Vas a definir el problema, decidir si la IA de verdad encaja, planear las entradas, las salidas, las etiquetas, las características o las reglas, dibujar un prototipo, escribir casos de prueba y explicar cómo la mantendrías justa, privada y bajo supervisión humana. Este es un proyecto de diseño y planeación: no vas a entrenar un modelo real.",
    choices: [
      {
        name: "Clasificador útil",
        scenario: "A un grupo le cuesta clasificar muchos objetos rápido, como una biblioteca ordenando libros devueltos o un club organizando fotos.",
        exampleGoal: "Diseña una IA que clasifique objetos en las categorías correctas.",
        suitableBecause: "Clasificar a partir de muchos ejemplos etiquetados encaja bien con el aprendizaje automático.",
      },
      {
        name: "Ayudante de preguntas",
        scenario: "La gente hace una y otra vez las mismas preguntas y un equipo pequeño no se da abasto, como la oficina de una escuela o el soporte de un juego.",
        exampleGoal: "Diseña un ayudante de reglas que responda las preguntas comunes y pase el resto a una persona.",
        suitableBecause: "Las preguntas comunes con intenciones claras encajan con un chatbot de árbol de decisión y una respuesta de reserva humana.",
      },
      {
        name: "Recomendador justo",
        scenario: "Una comunidad quiere sugerencias (libros, actividades o recetas) sin atrapar a la gente en una burbuja de filtros.",
        exampleGoal: "Diseña un recomendador que sugiera opciones nuevas y explique por qué.",
        suitableBecause: "Las recomendaciones usan la similitud y la retroalimentación, y te dejan practicar cómo evitar las burbujas de filtros.",
      },
      {
        name: "Tu propia idea",
        scenario: "Tienes un problema en tu escuela o tu comunidad con el que crees que la IA podría ayudar.",
        exampleGoal: "Define tu propio problema y diseña una IA (o decide que la IA no es la herramienta adecuada).",
        suitableBecause: "Decidir si la IA siquiera encaja es parte de un buen diseño.",
      },
    ],
    brief: [
      {
        label: "Necesidad de la persona usuaria",
        hint: "¿Para quién es esto, y qué problema tiene esa persona?",
      },
      {
        label: "Definición del problema",
        hint: "Enuncia la tarea exacta en una o dos oraciones.",
      },
      {
        label: "¿La IA es la herramienta adecuada?",
        hint: "Explica por qué la IA encaja, o por qué sería mejor una herramienta más sencilla.",
      },
      {
        label: "Entradas y salidas",
        hint: "¿Qué entra y qué sale?",
      },
      {
        label: "Etiquetas, características o reglas",
        hint: "¿De qué ejemplos, etiquetas y características aprendería, o qué reglas seguiría?",
      },
      {
        label: "Boceto del prototipo",
        hint: "Describe o dibuja cómo lo usaría una persona.",
      },
      {
        label: "Casos de prueba",
        hint: "Enumera los ejemplos que probarías, incluidos casos límite difíciles.",
      },
      {
        label: "Limitaciones",
        hint: "¿Dónde podría equivocarse o ser injusta?",
      },
      {
        label: "Justicia, privacidad y supervisión",
        hint: "¿Cómo vas a proteger la privacidad, revisar la justicia y mantener a una persona al mando? ¿Cómo puede alguien apelar un resultado equivocado?",
      },
    ],
    requirements: [
      {
        label: "Necesidad clara de la persona usuaria",
        description: "Nombra un grupo real de personas y el problema que enfrentan.",
      },
      {
        label: "Decisión sobre la idoneidad de la IA",
        description: "Argumenta si la IA es la herramienta adecuada, usando las ideas de entrada y salida y de reglas frente a aprendizaje.",
      },
      {
        label: "Entradas y salidas diseñadas",
        description: "Define las entradas y las salidas, y las etiquetas y características o las reglas involucradas.",
      },
      {
        label: "Prototipo y casos de prueba",
        description: "Incluye un boceto del prototipo y al menos tres casos de prueba, uno de ellos un caso límite.",
      },
      {
        label: "Plan de uso responsable",
        description: "Aborda la justicia, la privacidad, las limitaciones, la supervisión humana y las apelaciones.",
      },
      {
        label: "Presentación clara",
        description: "Explica el diseño de modo que otra persona pueda entenderlo y cuestionarlo.",
      },
      {
        label: "Nota de iteración (opcional avanzado)",
        description: "Describe un cambio que harías después de probarlo.",
      },
    ],
    rubric: [
      {
        name: "Problema e idoneidad",
        description: "Qué tan claro queda el problema y si la IA es la herramienta adecuada.",
        levels: [
          {
            descriptor: "El problema es vago y no hay razonamiento sobre si la IA encaja.",
          },
          {
            descriptor: "El problema está enunciado, pero el razonamiento sobre la idoneidad de la IA es flojo.",
          },
          {
            descriptor: "Problema claro y un argumento sólido sobre si la IA es la herramienta adecuada.",
          },
          {
            descriptor: "Definición del problema muy precisa, con una decisión de idoneidad convincente y bien razonada.",
          },
        ],
      },
      {
        name: "Entradas, salidas y datos",
        description: "Calidad del diseño de entradas y salidas y de las etiquetas y características o reglas.",
        levels: [
          {
            descriptor: "Faltan las entradas y las salidas, o no quedan claras.",
          },
          {
            descriptor: "Las entradas y las salidas están nombradas, pero las etiquetas y características o las reglas no quedan claras.",
          },
          {
            descriptor: "Entradas y salidas claras, y un plan sensato de etiquetas y características o reglas.",
          },
          {
            descriptor: "Un diseño cuidado y bien ajustado, con etiquetas, características o reglas realistas.",
          },
        ],
      },
      {
        name: "Prototipo y pruebas",
        description: "El boceto del prototipo y la calidad de los casos de prueba.",
        levels: [
          {
            descriptor: "No hay prototipo ni casos de prueba.",
          },
          {
            descriptor: "Un prototipo básico con una o dos pruebas sencillas.",
          },
          {
            descriptor: "Un prototipo claro con al menos tres pruebas, incluido un caso límite.",
          },
          {
            descriptor: "Un prototipo bien explicado, con pruebas sólidas que sondean las fallas probables.",
          },
        ],
      },
      {
        name: "Responsabilidad y presentación",
        description: "Justicia, privacidad, supervisión, apelaciones y claridad de la presentación.",
        levels: [
          {
            descriptor: "Ignora la justicia, la privacidad o la supervisión, y es difícil de seguir.",
          },
          {
            descriptor: "Menciona la responsabilidad, pero deja huecos, o la presentación no queda clara.",
          },
          {
            descriptor: "Aborda con claridad la justicia, la privacidad, la supervisión y las apelaciones.",
          },
          {
            descriptor: "Un plan de uso responsable a fondo, presentado con claridad y abierto a preguntas.",
          },
        ],
      },
    ],
  },
  finalAssessment: {
    title: "Repaso del curso: lo que aprendiste sobre la IA",
    instructions: "Un repaso corto de las seis semanas. Responde cada pregunta y lee la explicación. Esto es para tu propio aprendizaje: no hay calificaciones y no se envía nada a ningún lado.",
    questions: [
      {
        prompt: "¿Cuál es la señal más clara de que un programa es IA y no un programa tradicional?",
        explanation: "La IA aprende patrones a partir de muchos ejemplos, en lugar de solo seguir reglas que una persona escribió a mano.",
        choices: [
          {
            text: "Aprendió patrones a partir de ejemplos.",
            explanation: "Correcto: aprender de ejemplos es la señal clave de la IA.",
          },
          {
            text: "Corre rápido.",
            explanation: "La velocidad no decide si un programa es IA.",
          },
          {
            text: "Tiene una interfaz bonita.",
            explanation: "La interfaz no dice nada sobre si aprende.",
          },
          {
            text: "Funciona en una computadora.",
            explanation: "Todo el software funciona en una computadora.",
          },
        ],
      },
      {
        prompt: "Decide si la afirmación es verdadera o falsa.",
        statement: "Un conjunto de datos con muchísimos más ejemplos de una categoría que de otra está desequilibrado y puede hacer que un modelo sea menos justo.",
        explanation: "Verdadero: unos datos desequilibrados hacen que el modelo vea muy pocos casos de algunos tipos, y puede funcionar peor con ellos.",
      },
      {
        prompt: "¿Por qué probamos un modelo con datos con los que no se entrenó?",
        explanation: "Probar con ejemplos nunca vistos comprueba si el modelo generaliza, en lugar de solo memorizar los datos de entrenamiento.",
        choices: [
          {
            text: "Para ver si generaliza a ejemplos nuevos.",
            explanation: "Correcto: los datos de prueba nunca vistos muestran el desempeño real.",
          },
          {
            text: "Para que el entrenamiento sea más rápido.",
            explanation: "Probar es algo aparte de la velocidad del entrenamiento.",
          },
          {
            text: "Para aprovechar los datos que sobran.",
            explanation: "Los datos de prueba tienen un propósito: medir la generalización.",
          },
          {
            text: "Porque los datos de entrenamiento siempre están mal.",
            explanation: "Los datos de entrenamiento no siempre están mal; simplemente necesitamos una prueba justa.",
          },
        ],
      },
      {
        prompt: "Un clasificador de fotos etiqueta la imagen de un panquecito como un perro. ¿Qué tipo de error es este?",
        scenario: "El modelo predijo \"perro\" para algo que no es un perro.",
        explanation: "Predecir \"perro\" cuando no es un perro es un falso positivo de la categoría perro.",
        choices: [
          {
            text: "Un falso positivo de \"perro\".",
            explanation: "Correcto: dijo por error que había un \"perro\".",
          },
          {
            text: "Un falso negativo de \"perro\".",
            explanation: "Un falso negativo sería no detectar un perro de verdad.",
          },
          {
            text: "Exactitud perfecta.",
            explanation: "Cometió un error, así que la exactitud no es perfecta.",
          },
          {
            text: "Un error de entrada.",
            explanation: "La imagen era válida; lo que estuvo mal fue la predicción del modelo.",
          },
        ],
      },
      {
        prompt: "Decide si la afirmación es verdadera o falsa.",
        statement: "Si la respuesta de un modelo de lenguaje suena fluida y segura, tiene que ser cierta.",
        explanation: "Falso: los modelos de lenguaje predicen el texto siguiente probable, así que una salida fluida puede seguir estando mal. Verifica siempre los datos.",
      },
      {
        prompt: "¿Qué es una burbuja de filtros?",
        explanation: "Una burbuja de filtros es cuando las recomendaciones te siguen mostrando cosas parecidas, así que rara vez ves opciones nuevas o distintas.",
        choices: [
          {
            text: "Cuando las recomendaciones te siguen mostrando cosas parecidas y esconden las distintas.",
            explanation: "Correcto: ese estrechamiento es una burbuja de filtros.",
          },
          {
            text: "Una herramienta que limpia datos.",
            explanation: "Eso no es lo que significa una burbuja de filtros.",
          },
          {
            text: "Un ajuste de privacidad.",
            explanation: "Una burbuja de filtros tiene que ver con recomendaciones que se estrechan, no con un ajuste.",
          },
          {
            text: "Un tipo de filtro de cámara.",
            explanation: "Se trata de recomendaciones, no de filtros para fotos.",
          },
        ],
      },
      {
        prompt: "¿Cuáles de estas son buenas formas de usar la IA de manera responsable? (Elige todas las que correspondan.)",
        explanation: "El uso responsable incluye recopilar menos datos, verificar las fuentes, estar pendiente de los sesgos, y mantener la supervisión humana con una vía de apelación.",
        choices: [
          {
            text: "Recopilar solo los datos que de verdad necesitas.",
            explanation: "Correcto: la minimización de datos protege la privacidad.",
          },
          {
            text: "Revisar la fuente original antes de confiar en contenido de IA.",
            explanation: "Correcto: la confirmación independiente atrapa la desinformación.",
          },
          {
            text: "Dejar que la IA tome decisiones importantes sin revisión humana.",
            explanation: "Las decisiones importantes necesitan supervisión humana y una vía de apelación.",
          },
          {
            text: "Estar pendiente de los sesgos y de resultados injustos por grupo.",
            explanation: "Correcto: revisar la justicia entre grupos es uso responsable.",
          },
        ],
      },
      {
        prompt: "Ordena de forma sensata los pasos para diseñar una herramienta de IA.",
        explanation: "Un buen diseño parte de la necesidad de la persona usuaria y del problema, decide si la IA encaja, diseña las entradas y salidas, prototipa, y luego prueba y mejora.",
        items: [
          {
            text: "Definir la necesidad de la persona usuaria y el problema",
          },
          {
            text: "Decidir si la IA es la herramienta adecuada",
          },
          {
            text: "Diseñar las entradas, las salidas y las etiquetas y características o reglas",
          },
          {
            text: "Prototipar, y luego probar y mejorar",
          },
        ],
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
    {
      title: "Estudio de Diseño de IA",
      subtitle: "Junta todo: define un problema real, decide si la IA encaja, diseña y prueba un prototipo, y preséntalo de forma responsable.",
      summary: "En la semana final, los estudiantes trabajan como un equipo de diseño: convierten la necesidad de una persona usuaria en una definición clara del problema, juzgan si la IA es la herramienta adecuada, diseñan las entradas, las salidas, las características, las etiquetas y las reglas, construyen y prueban un prototipo de papel, encuentran sus limitaciones con casos de prueba, y presentan el resultado con honestidad, con supervisión humana y uso responsable, mientras exploran las carreras de quienes construyen y regulan la IA. Esta semana prepara a los estudiantes para el estudio del Proyecto Final y la Evaluación Final, que van aparte.",
      bigQuestion: "¿Cómo llevas una idea desde un problema real hasta un proyecto de IA probado y presentado de forma responsable?",
      estimatedTime: "2.5-3 horas",
      objectives: [
        "Convertir la necesidad de una persona usuaria en una definición clara del problema y juzgar si la IA le queda bien.",
        "Diseñar las entradas, las salidas, las características, las etiquetas y las reglas de un sistema.",
        "Construir un prototipo, probarlo con casos de prueba, encontrar sus limitaciones e iterar.",
        "Presentar un proyecto de forma responsable, con supervisión, y describir carreras reales en IA.",
      ],
      requiredConcepts: [
        "Necesidad de la persona usuaria",
        "Definición del problema",
        "Idoneidad de la IA",
        "Entrada",
        "Salida",
        "Característica",
        "Etiqueta",
        "Regla",
        "Prototipo",
        "Caso de prueba",
        "Limitación",
        "Supervisión",
        "Iteración",
        "Uso responsable",
      ],
      lessons: [
        {
          title: "Elige el problema y la herramienta correctos",
          summary: "Empieza un proyecto de diseño como lo hacen los equipos de verdad: nombra la necesidad de una persona usuaria, escribe una definición clara del problema, y decide si la IA es siquiera la herramienta adecuada para el trabajo.",
          estimatedTime: "50-60 minutos",
          objectives: [
            {
              text: "Convertir la necesidad de una persona usuaria en una definición del problema clara y de una sola oración.",
            },
            {
              text: "Juzgar la idoneidad de la IA: decidir si un problema encaja mejor con IA o con reglas fijas.",
            },
            {
              text: "Nombrar la entrada y la salida que usaría tu proyecto.",
            },
            {
              text: "Explicar por qué elegir el problema correcto importa antes de construir nada.",
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
              name: "Tus apuntes de las semanas 1 a 5",
              note: "Para recordar cómo aprende la IA a partir de ejemplos.",
            },
          ],
          vocabulary: [
            {
              term: "Necesidad de la persona usuaria",
              definition: "Un problema real que tiene una persona o un grupo concreto y que quiere resolver, descrito desde su punto de vista.",
            },
            {
              term: "Definición del problema",
              definition: "Un enunciado claro, de una sola oración, de qué estás tratando de resolver exactamente y para quién.",
            },
            {
              term: "Idoneidad de la IA",
              definition: "Qué tan bien encaja un problema con la IA, que aprende patrones a partir de muchos ejemplos, frente a una regla fija que una persona simplemente puede escribir.",
            },
            {
              term: "Entrada",
              definition: "La información que recibiría el sistema, como una foto, una oración o un conjunto de números.",
            },
            {
              term: "Salida",
              definition: "El resultado que devolvería el sistema, como una etiqueta, una predicción o una sugerencia.",
            },
          ],
          openingScenario: {
            prompt: "Un club escolar dice: \"¡Queremos usar IA!\". Pero ¿para qué? Un equipo de diseño nunca empieza por la herramienta: empieza por una persona que tiene un problema. ¿De quién sería el problema que resolvería tu proyecto, y cuál es exactamente?",
            context: "Esta semana planeas un proyecto real. Todo empieza por el problema, no por la tecnología.",
          },
          predictionPrompt: {
            prompt: "Predice: de estas dos ideas, \"clasificar fotos de libros de la biblioteca en ficción y no ficción\" y \"abrir una puerta con la contraseña correcta\", ¿cuál encaja mejor con la IA?",
            howToCheck: "Mientras lees, pregúntate si cada tarea es demasiado enredada para que una persona escriba reglas exactas, o si una sola regla clara ya la resuelve.",
          },
          concepts: [
            {
              title: "Empieza por una necesidad de la persona usuaria, no por una herramienta",
              body: [
                "Los buenos proyectos empiezan con una persona real que tiene un problema real: una necesidad de la persona usuaria. \"A los niños de mi salón se les olvida en qué bote de reciclaje va cada cosa\" es una necesidad. \"Quiero usar IA\" no lo es; nombra una herramienta, no un problema.",
                "Cuando partes de una necesidad real, después puedes saber si tu proyecto de verdad ayudó. Describe la necesidad desde el punto de vista de la persona usuaria: quién es y qué se le está dificultando ahora.",
              ],
              examples: [
                "Una jardinera no logra distinguir qué hojas tienen una enfermedad de la planta",
                "Los estudiantes nuevos se pierden buscando sus salones el primer día",
                "Un club de amigos por correspondencia recibe mensajes en idiomas que sus miembros no leen",
              ],
            },
            {
              title: "Escribe una definición clara del problema",
              body: [
                "Una vez que tienes una necesidad, escribes una definición del problema: una oración clara que dice exactamente qué estás resolviendo y para quién. Una definición precisa evita que un proyecto se desvíe. \"Ayudar a estudiantes de sexto a separar la basura del salón en reciclaje, composta y basura a partir de una foto\" es lo bastante específica como para construirla y probarla.",
                "Una definición vaga como \"mejorar el reciclaje\" no se puede probar: nunca sabrías si lo lograste. Una buena definición del problema nombra a la persona usuaria, la tarea y cómo se ve un buen resultado.",
              ],
              examples: [
                "Vaga: \"Ayudar con las plantas\". Clara: \"Decirle a quien cultiva si la foto de una hoja de jitomate se ve sana o enferma\".",
                "Vaga: \"Hacer la escuela más fácil\". Clara: \"Darle a un estudiante nuevo indicaciones para llegar a un salón a partir de su número\".",
              ],
            },
            {
              title: "Decide la idoneidad de la IA: ¿es siquiera la herramienta adecuada?",
              body: [
                "No todo problema necesita IA. La IA brilla cuando una tarea es demasiado enredada para escribir reglas exactas, pero tienes muchos ejemplos de los cuales aprender, como distinguir hojas sanas de hojas enfermas en fotos. Un problema que una sola regla clara ya resuelve no necesita IA: \"abrir si la contraseña coincide\" es una regla, no una tarea de aprendizaje.",
                "Para juzgar la idoneidad de la IA, hazte tres preguntas: ¿la tarea es demasiado enredada para reglas escritas a mano? ¿Podrías reunir muchos ejemplos etiquetados? ¿Y está bien que el sistema a veces se equivoque? Si las respuestas son sí, quizá la IA encaje. Si una regla sencilla funciona, usa la regla: es más barata, más clara y más fácil de revisar.",
              ],
              examples: [
                "Buen encaje para la IA: clasificar fotos de basura en reciclaje, composta o basura.",
                "Mal encaje para la IA: encender las luces del pasillo a las 7:00 de la mañana; eso es una regla fija.",
                "Mal encaje para la IA: una tarea donde equivocarse aunque sea una vez podría dañar gravemente a alguien.",
              ],
            },
          ],
          workedExample: {
            title: "De un deseo difuso a un proyecto que se puede construir",
            steps: [
              "Empieza con el deseo: \"Quiero usar IA para ayudar al club de reciclaje\".",
              "Encuentra la necesidad: los miembros del club y otros estudiantes seguido tiran la basura en el bote equivocado porque no saben qué es reciclable.",
              "Escribe la definición del problema: \"Ayudar a los estudiantes a decidir en cuál de tres botes (reciclaje, composta o basura) va un objeto, a partir de una foto de ese objeto\".",
              "Nombra entrada y salida: la entrada es la foto de un objeto; la salida es una etiqueta: \"reciclaje\", \"composta\" o \"basura\".",
              "Revisa la idoneidad de la IA: ¿demasiado enredado para reglas exactas? Sí, los objetos varían muchísimo. ¿Puedes reunir muchas fotos etiquetadas? Sí. ¿Está bien equivocarse a veces, si una persona revisa? Sí. La IA encaja.",
            ],
            takeaway: "Un proyecto que se puede construir tiene una necesidad real, una definición del problema de una oración, una entrada y una salida con nombre, y un sí en la idoneidad de la IA.",
          },
          visuals: [
            {
              title: "¿Este problema debería usar IA?",
              summary: "Un árbol de decisión para la idoneidad de la IA. Inicio: \"¿Una sola regla clara lo resuelve?\". Si sí, usa una regla, no IA. Si no, pregunta: \"¿Puedes reunir muchos ejemplos etiquetados?\". Si no, probablemente la IA todavía no va a funcionar. Si sí, pregunta: \"¿Está bien que a veces se equivoque, con una persona revisando?\". Si no, ten mucho cuidado o no uses IA. Si sí, la IA puede encajar bien.",
              caption: "Usa una regla cuando una regla funciona; reserva la IA para tareas enredadas con ejemplos y revisión humana.",
            },
            {
              title: "Lista de comprobación de la definición del problema",
              summary: "Una tabla de lo que incluye una buena definición del problema. Persona usuaria: nombra a una persona o grupo concreto. Tarea: dice exactamente qué hay que decidir o producir. Entrada: nombra lo que recibe el sistema. Salida: nombra lo que devuelve. Comprobable: después podrías saber si funcionó.",
              table: {
                columns: [
                  "Parte",
                  "Pregunta que responde",
                  "Ejemplo débil",
                  "Ejemplo fuerte",
                ],
                rows: [
                  [
                    "Persona usuaria",
                    "¿Quién tiene este problema?",
                    "\"La gente\"",
                    "\"Los estudiantes nuevos de sexto grado\"",
                  ],
                  [
                    "Tarea",
                    "¿Qué estamos resolviendo exactamente?",
                    "\"Ayudar con las indicaciones\"",
                    "\"Dar la ruta a un salón a partir de su número\"",
                  ],
                  [
                    "Entrada",
                    "¿Qué entra?",
                    "\"Algo de información\"",
                    "\"Un número de salón\"",
                  ],
                  [
                    "Salida",
                    "¿Qué sale?",
                    "\"Una respuesta\"",
                    "\"Indicaciones paso a paso\"",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "Estudio de encaje entre problema y herramienta",
            goal: "Elegir un problema para tu proyecto, escribir su definición del problema, y decidir si la IA es la herramienta correcta.",
            overview: "Vas a revisar un conjunto de problemas candidatos, elegir uno (o traer tu propia necesidad de persona usuaria) y convertirlo en un resumen de proyecto que se pueda construir: una necesidad, una definición del problema de una oración, una entrada y una salida con nombre, y una decisión sobre la idoneidad de la IA. Esta es la semilla de tu Proyecto Final.",
            steps: [
              "Lee los problemas candidatos y elige uno que te interese, o escribe tu propia necesidad de persona usuaria.",
              "Escribe la necesidad desde el punto de vista de la persona usuaria: quién es y qué se le dificulta.",
              "Escribe una definición del problema de una oración que nombre a la persona usuaria, la tarea y cómo se ve un buen resultado.",
              "Nombra la entrada y la salida que usaría tu sistema.",
              "Haz la revisión de idoneidad de la IA y escribe una oración: ¿la IA encaja, o bastaría con una regla sencilla?",
            ],
            materials: [
              "Papel y lápiz, o una app de notas",
            ],
            successCriteria: [
              "Una necesidad escrita desde el punto de vista de la persona usuaria.",
              "Una definición del problema de una oración que nombre a la persona usuaria, la tarea y un resultado comprobable.",
              "Una entrada y una salida con nombre.",
              "Una decisión clara sobre la idoneidad de la IA, con una razón de una oración.",
            ],
            dataset: {
              name: "Problemas candidatos para el proyecto",
              description: "Un conjunto incluido de problemas iniciales para el estudio: clasificar la basura del salón a partir de una foto, señalar hojas con enfermedades de las plantas, agrupar objetos perdidos, traducir mensajes de amigos por correspondencia, ordenar libros de la biblioteca por tema, y \"abrir un casillero con una contraseña\" (una trampa que solo requiere reglas y hay que descartar). Cada tarjeta lista una persona usuaria aproximada, una posible entrada y una posible salida.",
              columns: [
                "Problema",
                "Posible persona usuaria",
                "Posible entrada",
                "Posible salida",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Comprueba que sabes definir un problema y juzgar si la IA le queda bien.",
            questions: [
              {
                prompt: "¿Cuál es la definición del problema más sólida?",
                explanation: "Una definición sólida nombra a la persona usuaria, la tarea exacta y un resultado que después podrías comprobar.",
                choices: [
                  {
                    text: "Usar IA para mejorar la escuela.",
                    explanation: "Esto nombra una herramienta y un deseo, no una persona usuaria concreta, una tarea ni un resultado comprobable.",
                  },
                  {
                    text: "Ayudar a los estudiantes nuevos a encontrar un salón dándoles indicaciones a partir del número del salón.",
                    explanation: "Correcto: nombra a la persona usuaria (estudiantes nuevos), la tarea (indicaciones) y un resultado comprobable.",
                  },
                  {
                    text: "Hacer algo padrísimo con fotos.",
                    explanation: "No hay persona usuaria, ni tarea, ni nada que pudieras comprobar.",
                  },
                  {
                    text: "Mejorar el reciclaje para todos.",
                    explanation: "Es demasiado vago: nunca podrías saber si funcionó.",
                  },
                ],
              },
              {
                prompt: "Decide si la afirmación es verdadera o falsa.",
                statement: "Si una sola regla clara ya resuelve un problema, de todos modos deberías usar IA porque la IA es más avanzada.",
                explanation: "Falso: si una regla sencilla funciona, usa la regla. Es más barata, más clara y más fácil de revisar que la IA.",
              },
              {
                prompt: "¿Qué proyecto encaja mejor con la IA?",
                scenario: "Un club está eligiendo entre: (A) tocar un timbre exactamente cuando termina la clase, o (B) decir a partir de una foto si la hoja de una planta se ve sana o enferma.",
                explanation: "El timbre es una sola regla clara de horario. Distinguir hojas sanas de enfermas es enredado y necesita muchos ejemplos etiquetados, lo cual encaja con la IA.",
                choices: [
                  {
                    text: "Tocar un timbre cuando termina la clase",
                    explanation: "Esa es una regla fija de horario: no hace falta aprender nada, así que la IA no encaja.",
                  },
                  {
                    text: "Distinguir una hoja sana de una enferma en una foto",
                    explanation: "Correcto: es demasiado enredado para reglas a mano y tiene ejemplos de los cuales aprender, así que la IA encaja.",
                  },
                  {
                    text: "Los dos encajan igual de bien con la IA",
                    explanation: "El timbre es una regla sencilla y no necesita IA.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Tres problemas, uno que se queda",
            prompt: "Propón tres necesidades de personas usuarias, luego elige la que mejor encaje con la IA y defiende tu elección.",
            steps: [
              "Escribe tres necesidades distintas, cada una desde el punto de vista de una persona usuaria real.",
              "Para cada una, nombra una posible entrada y una posible salida.",
              "Haz la revisión de idoneidad de la IA con las tres y elige la que mejor encaje.",
              "Escribe dos oraciones defendiendo por qué la que elegiste encaja mejor con la IA que las otras.",
            ],
            successCriteria: [
              "Tres necesidades de personas usuarias, cada una con una entrada y una salida.",
              "Una decisión de idoneidad de la IA para cada una.",
              "Un problema elegido, con una defensa de dos oraciones.",
            ],
          },
          reflection: [
            {
              prompt: "¿Por qué resulta tentador empezar por la herramienta (\"usemos IA\") en lugar de por el problema, y qué sale mal cuando lo haces?",
            },
            {
              prompt: "¿Qué parte de escribir una definición del problema fue la más difícil: nombrar a la persona usuaria, la tarea o el resultado comprobable?",
            },
          ],
          recap: {
            summary: "Los grandes proyectos de IA parten de una necesidad real, una definición clara del problema y una revisión honesta de si la IA es siquiera la herramienta adecuada.",
            keyPoints: [
              "Una necesidad de persona usuaria describe el problema de una persona real, no una herramienta que quieres usar.",
              "Una definición del problema nombra a la persona usuaria, la tarea, la entrada, la salida y un resultado comprobable.",
              "Juzga la idoneidad de la IA: usa una regla cuando una regla funciona; reserva la IA para tareas enredadas con muchos ejemplos.",
            ],
          },
          extension: {
            title: "¿Oportunidad o puro ruido?",
            body: [
              "A veces las empresas le agregan \"IA\" a un producto sobre todo por mercadotecnia, incluso cuando una regla sencilla funcionaría mejor. Eso puede desperdiciar dinero y volver el producto más difícil de confiar y de revisar.",
              "Encuentra un producto o una app real que anuncie una función de \"IA\". Decide si la tarea de verdad necesita IA o si bastaría con una regla fija. Escribe un párrafo corto explicando tu juicio.",
            ],
          },
        },
        {
          title: "Planea, prototipa y prueba",
          summary: "Convierte tu problema en un plan que puedas construir y revisar: diseña las entradas, las salidas, las características, las etiquetas y las reglas; haz un prototipo sencillo; y pruébalo con casos de prueba reales.",
          estimatedTime: "50-65 minutos",
          objectives: [
            {
              text: "Diseñar las entradas, las salidas, las características, las etiquetas y las reglas de tu sistema.",
            },
            {
              text: "Explicar qué es un prototipo y hacer uno sencillo en papel.",
            },
            {
              text: "Escribir casos de prueba y usarlos para encontrar limitaciones.",
            },
            {
              text: "Mejorar tu diseño mediante la iteración, con base en lo que muestran las pruebas.",
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
              name: "Tu definición del problema de la lección 1",
              note: "Vas a construir el plan encima de ella.",
            },
          ],
          vocabulary: [
            {
              term: "Característica",
              definition: "Una pista medible sobre una entrada que el sistema usa para decidir, como el color, la forma o el tamaño de un objeto.",
            },
            {
              term: "Etiqueta",
              definition: "La respuesta correcta asociada a un ejemplo, como marcar una foto con \"reciclaje\" para que el sistema pueda aprender de ella.",
            },
            {
              term: "Regla",
              definition: "Una instrucción exacta que escribe una persona, como \"si el objeto es una botella de vidrio, etiquétalo como reciclaje\".",
            },
            {
              term: "Prototipo",
              definition: "Una primera versión rápida y tosca de una idea, hecha para probar cómo funciona antes de construir lo de verdad.",
            },
            {
              term: "Caso de prueba",
              definition: "Un ejemplo con una respuesta correcta conocida que pasas por tu prototipo para comprobar si funciona.",
            },
            {
              term: "Iteración",
              definition: "Repetir el ciclo de construir, probar y mejorar para que el diseño quede mejor cada vez.",
            },
          ],
          openingScenario: {
            prompt: "Ya tienes una definición del problema: clasificar la foto de un residuo en reciclaje, composta o basura. ¿Qué pistas (características) miraría el sistema? ¿Qué etiquetas le enseñarías? ¿Y cómo sabrías, antes de construir nada de verdad, si tu plan sirve?",
            context: "En esta lección conviertes tu idea en un plan que de verdad puedes probar en papel.",
          },
          predictionPrompt: {
            prompt: "Predice: cuando pruebes tu prototipo por primera vez con ejemplos difíciles, ¿acertará la mayoría o fallará en algunos? ¿Qué tipo de ejemplo crees que lo va a hacer tropezar?",
            howToCheck: "Después de escribir y \"correr\" tus casos de prueba, compara lo que realmente pasó con tu predicción.",
          },
          concepts: [
            {
              title: "Diseña las piezas: entradas, salidas, características, etiquetas y reglas",
              body: [
                "Antes de construir, diseña las piezas. La entrada es lo que entra (la foto de un objeto). La salida es lo que sale (una etiqueta: reciclaje, composta o basura). Las etiquetas son el conjunto de respuestas correctas que le enseñarías al sistema y que usarías para revisarlo.",
                "Las características son las pistas que el sistema usa para decidir: el material de un objeto, su forma, o si está mojado o grasoso. Si una parte de la tarea es sencilla y clara, puedes incluso agregar una regla: \"si es una botella de vidrio limpia, etiquétala como reciclaje\". Un buen plan nombra todo esto, para que cualquiera pueda entender cómo se toma una decisión.",
              ],
              examples: [
                "Entrada: foto de un objeto. Salida: una de tres etiquetas.",
                "Características: material, está mojado, es papel, tiene comida encima.",
                "Regla: \"si es una cáscara de plátano, etiquétala como composta\".",
              ],
            },
            {
              title: "Un prototipo es una primera versión tosca hecha para probar",
              body: [
                "Un prototipo es una versión rápida y tosca de tu idea, construida para aprender de ella, no el producto terminado. El tuyo puede ser de papel: un juego de tarjetas de \"si tiene estas características, entonces esta etiqueta\", o un diagrama de flujo sencillo que un compañero pueda seguir a mano. La idea es volver la idea lo bastante concreta como para probarla.",
                "Los prototipos están hechos para ser imperfectos. Hacer uno barato y pronto te ahorra gastar muchísimo esfuerzo construyendo lo equivocado. Puedes tirar un prototipo y no pasa nada: te quedaste con lo que aprendiste.",
              ],
              examples: [
                "Un diagrama de flujo en papel: \"¿Es papel? ¿Está mojado? → etiqueta\".",
                "Un montón de tarjetas de decisión que un amigo pueda seguir sin que tú le expliques.",
                "Un boceto a mano de la pantalla de la app, con la entrada y la salida.",
              ],
            },
            {
              title: "Los casos de prueba revelan limitaciones, y la iteración las arregla",
              body: [
                "Un caso de prueba es un ejemplo con una respuesta correcta conocida. Lo pasas por tu prototipo y ves si le pone la etiqueta correcta. Un puñado de buenos casos de prueba, incluidos algunos difíciles, muestra rapidísimo dónde se rompe tu diseño. Esos puntos débiles son sus limitaciones: las situaciones donde se equivoca o no puede decidir.",
                "Todos los sistemas tienen limitaciones; la meta es encontrarlas a propósito, no que te sorprendan después. Cuando un caso de prueba falla, mejoras el diseño y vuelves a probar. Ese ciclo de repetir hasta que quede mejor es la iteración, el corazón de cómo se construyen los productos de verdad.",
              ],
              examples: [
                "Caso de prueba: una caja de pizza grasosa. Etiqueta correcta: basura o composta, no reciclaje.",
                "Limitación encontrada: el prototipo etiqueta todas las cajas como \"reciclaje\", así que las grasosas quedan mal.",
                "Iteración: agregar una característica de \"¿tiene grasa de comida?\" y una regla para mandar a otro lado las cajas grasosas.",
              ],
            },
          ],
          workedExample: {
            title: "Prototipar y probar un clasificador de residuos",
            steps: [
              "Diseña las piezas: entrada = foto de un objeto; salida = reciclaje / composta / basura; características = material, es papel, está mojado, tiene grasa de comida.",
              "Construye un prototipo de papel: tarjetas de decisión. \"Si es resto de comida → composta. Si es papel limpio o botella limpia → reciclaje. Si no → basura\".",
              "Escribe casos de prueba con respuestas conocidas: botella de agua limpia (reciclaje), cáscara de plátano (composta), caja de pizza grasosa (basura), bolsa de papas con aluminio (basura).",
              "Corre las pruebas a mano: el prototipo acierta con la botella y la cáscara de plátano, pero etiqueta la caja de pizza grasosa como \"reciclaje\": una falla.",
              "Encuentra la limitación e itera: agrega una característica de \"¿tiene grasa de comida?\" y una regla para que el papel grasoso vaya a la basura. Vuelve a correr los casos de prueba; ahora la caja de pizza pasa.",
            ],
            takeaway: "Diseña las piezas, haz un prototipo tosco, pruébalo con casos de respuesta conocida, encuentra sus limitaciones e itera hasta que mejore.",
          },
          visuals: [
            {
              title: "El ciclo de construir, probar y mejorar",
              summary: "Un ciclo de cuatro pasos que se repite. Paso 1: diseña las piezas (entrada, salida, características, etiquetas, reglas). Paso 2: construye un prototipo tosco. Paso 3: corre los casos de prueba y anota cuáles pasan y cuáles fallan. Paso 4: encuentra las limitaciones y mejora. Una flecha va del paso 4 de vuelta al paso 2, mostrando la iteración.",
              caption: "Iterar significa dar vuelta a este ciclo más de una vez, mejorando en cada pasada.",
            },
            {
              title: "Una hoja de casos de prueba",
              summary: "Una tabla de casos de prueba para el clasificador de residuos. Cada fila tiene un ejemplo, su etiqueta correcta conocida, la etiqueta que dio el prototipo, y si pasó o falló. Botella de agua limpia: correcta reciclaje, dio reciclaje, pasó. Cáscara de plátano: correcta composta, dio composta, pasó. Caja de pizza grasosa: correcta basura, dio reciclaje, falló. Bolsa de papas con aluminio: correcta basura, dio basura, pasó.",
              table: {
                columns: [
                  "Caso de prueba",
                  "Etiqueta correcta",
                  "Etiqueta del prototipo",
                  "Resultado",
                ],
                rows: [
                  [
                    "Botella de agua limpia",
                    "Reciclaje",
                    "Reciclaje",
                  ],
                  [
                    "Cáscara de plátano",
                    "Composta",
                    "Composta",
                  ],
                  [
                    "Caja de pizza grasosa",
                    "Basura",
                    "Reciclaje",
                    "Falló",
                  ],
                  [
                    "Bolsa de papas con aluminio",
                    "Basura",
                    "Basura",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "Estudio del plan de prototipo",
            goal: "Convertir tu definición del problema en un plan diseñado, prototipado y probado que puedas presentar.",
            overview: "Con tu problema de la lección 1, vas a diseñar las entradas, las salidas, las características, las etiquetas y cualquier regla; dibujar un prototipo de papel; escribir al menos cuatro casos de prueba, incluidos algunos difíciles; \"correrlos\" a mano; y anotar las limitaciones que encuentres y una mejora que harías. Esto se vuelve el núcleo de tu Proyecto Final.",
            steps: [
              "Diseña las piezas: nombra tu entrada, tu salida, las etiquetas, de tres a cinco características y cualquier regla sencilla.",
              "Haz un prototipo de papel: dibuja un diagrama de flujo o escribe tarjetas de decisión que un compañero pueda seguir sin tu ayuda.",
              "Escribe al menos cuatro casos de prueba con respuestas correctas conocidas, incluidos dos difíciles.",
              "Pasa cada caso de prueba por tu prototipo a mano y anota si pasó o falló en una hoja de casos de prueba.",
              "Enumera las limitaciones que revelaron las fallas, y escribe una mejora que harías después (tu iteración).",
            ],
            materials: [
              "Papel y lápiz, o una app de notas",
            ],
            successCriteria: [
              "Quedan nombradas la entrada, la salida, las etiquetas, de tres a cinco características y cualquier regla.",
              "Un prototipo de papel que un compañero pueda seguir sin explicaciones extra.",
              "Al menos cuatro casos de prueba con respuestas conocidas, incluidos algunos difíciles, corridos y marcados como pasó o falló.",
              "Al menos una limitación identificada y una mejora (iteración) propuesta.",
            ],
            dataset: {
              name: "Kit inicial de casos de prueba",
              description: "Una lista incluida para escribir buenos casos de prueba: incluye ejemplos fáciles, casos límite (mojado, grasoso, dañado, poco común) y ejemplos que podrían irse para cualquiera de dos lados. También incluye una plantilla en blanco de hoja de casos de prueba (ejemplo, etiqueta correcta, etiqueta del prototipo, pasó o falló) para copiar.",
              columns: [
                "Tipo de caso de prueba",
                "Por qué incluirlo",
                "Ejemplo de consigna",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Comprueba que sabes planear, prototipar y probar un diseño.",
            questions: [
              {
                prompt: "¿Cuáles de estas cosas deberías diseñar antes de construir tu sistema? (Elige todas las que correspondan.)",
                explanation: "Las entradas, las salidas, las características y las etiquetas son todas parte del diseño. Las diapositivas de la presentación vienen después y no son parte de diseñar cómo se toman las decisiones.",
                choices: [
                  {
                    text: "La entrada que recibe el sistema",
                    explanation: "Correcto: nombrar la entrada es una parte central del diseño.",
                  },
                  {
                    text: "La salida que devuelve",
                    explanation: "Correcto: la salida, incluido el conjunto de etiquetas, hay que diseñarla.",
                  },
                  {
                    text: "Las características que usa para decidir",
                    explanation: "Correcto: las características son las pistas que usa el sistema, así que son parte del diseño.",
                  },
                  {
                    text: "El color de tus diapositivas de presentación",
                    explanation: "El color de las diapositivas es cosa de presentar después, no de cómo el sistema toma decisiones.",
                  },
                ],
              },
              {
                prompt: "Ordena el ciclo de construir, probar y mejorar para una ronda de prototipado.",
                explanation: "Diseñas las piezas, construyes un prototipo tosco, corres los casos de prueba, y luego encuentras limitaciones y mejoras; y el ciclo se puede repetir.",
                items: [
                  {
                    text: "Diseñar las piezas (entrada, salida, características, etiquetas, reglas)",
                  },
                  {
                    text: "Construir un prototipo tosco",
                  },
                  {
                    text: "Correr los casos de prueba y anotar si pasan o fallan",
                  },
                  {
                    text: "Encontrar limitaciones y mejorar el diseño",
                  },
                ],
              },
              {
                prompt: "¿Qué debería hacer el equipo a continuación?",
                scenario: "El prototipo de papel de un equipo pasa todos los casos de prueba fáciles, pero etiqueta una caja de pizza grasosa como \"reciclaje\" cuando la respuesta correcta es basura.",
                explanation: "Un caso de prueba fallido reveló una limitación. La respuesta correcta es iterar: mejorar el diseño (agregar una característica o una regla de grasa) y volver a probar, no esconder ni ignorar la falla.",
                choices: [
                  {
                    text: "Ignorar la caja grasosa porque los casos fáciles pasaron",
                    explanation: "Ignorar una falla conocida deja una limitación real dentro del diseño.",
                  },
                  {
                    text: "Mejorar el diseño para manejar la grasa, y luego volver a correr los casos de prueba",
                    explanation: "Correcto: eso es iterar, arreglar la limitación que reveló la prueba y volver a probar.",
                  },
                  {
                    text: "Borrar el caso de prueba de la caja de pizza grasosa para que pase",
                    explanation: "Quitar un caso de prueba difícil esconde el problema en lugar de arreglarlo.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Rompe tu propio prototipo",
            prompt: "Esfuérzate por hacer fallar tu propio prototipo, y luego usa lo que aprendas para mejorarlo.",
            steps: [
              "Escribe tres casos de prueba especialmente difíciles, pensados para hacer tropezar a tu prototipo.",
              "Córrelos a mano y anota cuáles fallan.",
              "Para cada falla, nombra la limitación que revela.",
              "Propón un cambio (una iteración) y predice si arreglaría las fallas.",
            ],
            successCriteria: [
              "Tres casos de prueba difíciles que pongan a prueba el prototipo.",
              "Cada falla ligada a una limitación con nombre.",
              "Una iteración propuesta, con una predicción de su efecto.",
            ],
          },
          reflection: [
            {
              prompt: "¿Por qué es útil construir un prototipo tosco en lugar de saltar directo a la versión terminada?",
            },
            {
              prompt: "¿Qué caso de prueba te enseñó más sobre las limitaciones de tu diseño, y por qué?",
            },
          ],
          recap: {
            summary: "Conviertes un problema en un plan comprobable diseñando las piezas, construyendo un prototipo tosco, corriendo casos de prueba de respuesta conocida, e iterando para arreglar las limitaciones que encuentres.",
            keyPoints: [
              "Diseña la entrada, la salida, las etiquetas, las características y cualquier regla antes de construir.",
              "Un prototipo es una versión tosca, hecha barata, para probar una idea desde temprano.",
              "Los casos de prueba revelan limitaciones; la iteración es el ciclo de mejorar hasta que quede mejor.",
            ],
          },
          extension: {
            title: "¿Cuántas pruebas son suficientes?",
            body: [
              "Los equipos reales no pueden probar todas las entradas posibles, así que eligen los casos de prueba con cuidado: casos comunes, casos límite, y casos donde un error importaría más. Una IA médica se prueba muchísimo más estrictamente que un juego que sugiere emojis.",
              "Para tu proyecto, decide qué casos de prueba importan más y por qué. Escribe un breve \"plan de pruebas\" que explique cuántas pruebas crees que son suficientes antes de que personas usuarias reales pudieran confiar en este sistema.",
            ],
          },
        },
        {
          title: "Presenta, revisa y explora las carreras en IA",
          summary: "Termina con fuerza: presenta tu proyecto con honestidad, incluidas sus limitaciones y la supervisión humana que necesita, da y recibe retroalimentación útil, y explora qué hace realmente la gente que construye, regula y diseña IA.",
          estimatedTime: "50-65 minutos",
          objectives: [
            {
              text: "Presentar un proyecto con claridad: el problema, tu diseño, tus pruebas y sus limitaciones.",
            },
            {
              text: "Explicar la supervisión y el uso responsable que tu proyecto necesita para ser confiable.",
            },
            {
              text: "Dar y recibir retroalimentación específica, amable y útil en una revisión.",
            },
            {
              text: "Describir varias carreras reales en IA: las personas que construyen, regulan y diseñan IA.",
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
              name: "Tu plan y tus resultados de prueba de la lección 2",
              note: "Los vas a presentar.",
            },
          ],
          vocabulary: [
            {
              term: "Limitación",
              definition: "Una situación en la que un sistema se equivoca, no puede decidir, o no debería tener nuestra confianza; algo que los proyectos honestos dicen abiertamente.",
            },
            {
              term: "Supervisión",
              definition: "Que una persona siga siendo responsable de revisar y corregir las decisiones de una IA, sobre todo cuando un error podría importar.",
            },
            {
              term: "Uso responsable",
              definition: "Usar la IA de una forma justa, honesta y segura, que respete la privacidad de las personas, siendo claros sobre lo que puede y no puede hacer.",
            },
            {
              term: "Carrera en IA",
              definition: "Un trabajo en el que las personas construyen, estudian, regulan o diseñan sistemas de IA y la forma en que se usan.",
            },
          ],
          openingScenario: {
            prompt: "Dos equipos presentan proyectos de clasificación de residuos. Uno dice: \"¡Funciona perfecto!\". El otro dice: \"Acierta la mayoría de las veces, pero batalla con el papel grasoso, así que una persona revisa esos casos\". ¿En qué equipo confías más, y por qué?",
            context: "Una presentación honesta que nombra limitaciones y supervisión se gana más confianza que una afirmación grandilocuente.",
          },
          predictionPrompt: {
            prompt: "Predice: ¿los proyectos más sólidos serán los que aseguran no cometer errores, o los que explican con claridad sus limitaciones y cómo una persona se mantiene al pendiente?",
            howToCheck: "Mientras lees, fíjate en por qué nombrar las limitaciones y la supervisión hace que un proyecto sea más confiable, no menos.",
          },
          concepts: [
            {
              title: "Presenta con honestidad: problema, diseño, pruebas y limitaciones",
              body: [
                "Una buena presentación cuenta una historia clara: aquí está la necesidad de la persona usuaria y la definición del problema, aquí está mi diseño (entrada, salida, características, etiquetas, reglas), así lo probé, y esto fue lo que encontré, incluidas sus limitaciones. Nombrar las limitaciones no es una debilidad; muestra que entiendes tu propio sistema.",
                "Evita prometer de más. \"Funciona perfecto\" casi nunca es cierto y pierde la confianza en cuanto alguien encuentra una falla. \"Acierta en la mayoría de los casos pero batalla con X\" es honesto, y es justo lo que un público reflexivo quiere escuchar.",
              ],
              examples: [
                "\"Entrada: la foto de un objeto. Salida: reciclaje, composta o basura\".",
                "\"Pasó 7 de 9 casos de prueba; falla con el papel grasoso y el aluminio brillante\".",
                "\"Como puede equivocarse, una persona revisa los casos dudosos\".",
              ],
            },
            {
              title: "La supervisión y el uso responsable hacen confiable un proyecto",
              body: [
                "Como la IA puede equivocarse o ser injusta, un proyecto responsable planea la supervisión humana: una persona sigue siendo responsable de revisar y corregir la IA, sobre todo donde un error podría importar. Tu presentación debería decir quién supervisa el sistema y cuándo.",
                "El uso responsable también significa ser justo, ser honesto sobre lo que el sistema puede hacer, proteger la privacidad de las personas, y no usar IA donde los riesgos son demasiado altos. Amarra todo lo del curso: la justicia, la privacidad, las limitaciones y las decisiones humanas aparecen en qué tan responsablemente se diseña y se describe un proyecto.",
              ],
              examples: [
                "\"Un estudiante revisa cualquier objeto sobre el que el clasificador tenga dudas, antes de tirarlo\".",
                "\"No recopilamos el nombre ni la cara de nadie, solo fotos de los objetos\".",
                "\"Nunca usaríamos esto para decidir algo serio sobre una persona\".",
              ],
            },
            {
              title: "Las revisiones funcionan mejor con retroalimentación específica y amable, y la IA también es una carrera",
              body: [
                "En una revisión, das y recibes retroalimentación. La retroalimentación útil es específica (\"tu caso de prueba del papel grasoso es un gran hallazgo; ¿podrías agregar una regla para eso?\") en lugar de vaga (\"está bien\") o dura. Recibir bien la retroalimentación significa escuchar, hacer preguntas y tomarla como ayuda, no como ataque. La iteración sigue aquí: las revisiones muchas veces disparan tu siguiente mejora.",
                "Construir IA también es un campo de trabajo que crece. Quienes hacen ingeniería de aprendizaje automático y ciencia de datos construyen y entrenan modelos. Quienes etiquetan y anotan datos crean los ejemplos etiquetados de los que aprenden los sistemas. Quienes trabajan en ética de la IA, auditoría y políticas públicas regulan la IA: revisan que sea justa, segura y respetuosa de la privacidad, y escriben las reglas de cómo se puede usar. Quienes diseñan producto y experiencia de usuario deciden cómo interactúan realmente las personas con la IA y cómo mantienen el control. Docentes, médicos, artistas y muchas otras personas usan cada vez más la IA como herramienta. No tienes que ser programador para influir en cómo se construye y se usa la IA.",
              ],
              examples: [
                "Ingeniera de aprendizaje automático: construye y entrena el modelo.",
                "Persona que etiqueta o anota datos: crea los ejemplos etiquetados para el aprendizaje.",
                "Especialista en ética de la IA o auditor: revisa que los sistemas sean justos, seguros y respetuosos de la privacidad.",
                "Diseñadora de producto o de experiencia de usuario: diseña cómo la gente usa la IA y mantiene la supervisión.",
              ],
            },
          ],
          workedExample: {
            title: "Una presentación confiable de dos minutos",
            steps: [
              "Enuncia el problema: \"Los estudiantes nuevos no saben en qué bote va su basura, así que clasificamos una foto en reciclaje, composta o basura\".",
              "Muestra el diseño: \"La entrada es la foto de un objeto; la salida es una de tres etiquetas; las características incluyen el material y la grasa de comida\".",
              "Reporta las pruebas: \"Corrimos nueve casos de prueba y pasamos siete; falla con el papel grasoso y el aluminio\".",
              "Nombra las limitaciones y la supervisión: \"Esos son límites reales, así que una persona revisa cualquier objeto sobre el que tenga dudas, antes de tirarlo\".",
              "Cierra con el uso responsable: \"Solo recopilamos fotos de objetos, nunca caras ni nombres, y no lo usaríamos para nada de alto riesgo\".",
            ],
            takeaway: "La presentación más confiable enuncia el problema, el diseño, resultados de prueba honestos, las limitaciones y la supervisión humana que mantiene responsable su uso.",
          },
          visuals: [
            {
              title: "Prometer de más frente a presentar con honestidad",
              summary: "Antes (prometiendo de más): \"¡Nuestra IA clasifica la basura a la perfección!\": sin limitaciones, sin supervisión, y pierde la confianza en cuanto alguien encuentra una falla. Después (honesto): \"Pasa la mayoría de los casos pero falla con el papel grasoso y el aluminio, así que una persona revisa los objetos dudosos, y solo usamos fotos de objetos\": enuncia limitaciones, supervisión y uso responsable, y se gana más confianza.",
              caption: "Ser honesto sobre los límites y la supervisión hace un proyecto más confiable, no menos.",
            },
            {
              title: "Quién construye y regula la IA",
              summary: "Una tabla de carreras en IA. Ingeniería de aprendizaje automático: construye y entrena modelos; su habilidad central es diseñar y probar sistemas. Etiquetado y anotación de datos: crea los ejemplos etiquetados; su habilidad central es etiquetar con cuidado y de forma consistente. Ética y auditoría de la IA: regula la IA en cuanto a justicia, seguridad y privacidad; su habilidad central es detectar daños y fijar reglas. Diseño de producto y experiencia de usuario: diseña cómo la gente usa la IA y mantiene la supervisión; su habilidad central es entender a las personas usuarias.",
              table: {
                columns: [
                  "Rol",
                  "Qué hace",
                  "Una habilidad que usa",
                ],
                rows: [
                  [
                    "Ingeniería de aprendizaje automático",
                    "Construye y entrena modelos",
                    "Diseñar y probar sistemas",
                  ],
                  [
                    "Etiquetado y anotación de datos",
                    "Crea los ejemplos etiquetados",
                    "Etiquetar con cuidado y consistencia",
                  ],
                  [
                    "Ética y auditoría de la IA",
                    "Regula la IA en justicia y seguridad",
                    "Detectar daños, fijar reglas",
                  ],
                  [
                    "Diseño de producto y experiencia de usuario",
                    "Diseña cómo la gente usa la IA",
                    "Entender a las personas usuarias reales",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "Estudio de presentación y revisión",
            goal: "Presentar tu proyecto con honestidad y dar y recibir retroalimentación específica y útil usando una rúbrica de revisión.",
            overview: "Vas a preparar una presentación corta y honesta de tu proyecto (problema, diseño, pruebas, limitaciones, supervisión y uso responsable) y luego participar en una revisión, dándoles a otros equipos retroalimentación específica y amable y recibiendo la suya, con una lista compartida. Las revisiones de aquí pueden disparar una iteración más antes del Proyecto Final.",
            steps: [
              "Prepara una presentación de dos minutos que cubra problema, diseño, resultados de prueba, limitaciones, supervisión y uso responsable.",
              "Preséntala ante un compañero o un grupo pequeño.",
              "Como revisor, usa la lista de revisión para dar al menos dos comentarios específicos y amables por proyecto.",
              "Como presentador, anota la retroalimentación que recibas y elige una mejora que vas a hacer (tu siguiente iteración).",
              "Conversen sobre con qué carreras en IA conecta cada proyecto y cuáles les interesan.",
            ],
            materials: [
              "Papel y lápiz, o una app de notas",
            ],
            successCriteria: [
              "Una presentación que incluya limitaciones, supervisión y uso responsable, no solo lo que funciona.",
              "Al menos dos comentarios específicos y amables dados a otras personas.",
              "La retroalimentación recibida queda anotada y se elige una siguiente mejora.",
              "Se nombra al menos una carrera en IA con la que conecta tu proyecto.",
            ],
            dataset: {
              name: "Rúbrica de revisión de proyectos",
              description: "Una lista de revisión incluida que los equipos usan para dar retroalimentación. Las filas cubren: definición clara del problema; entrada, salida, etiquetas y características sensatas; resultados de prueba honestos; limitaciones nombradas; un plan de supervisión humana; y uso responsable (justicia, privacidad, honestidad). Cada fila tiene una consigna y espacio para un comentario específico.",
              columns: [
                "Área de revisión",
                "Qué buscar",
                "Comentario específico",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Comprueba que sabes presentar de forma responsable y describir el trabajo real en IA.",
            questions: [
              {
                prompt: "¿Por qué la presentación de un proyecto debería incluir sus limitaciones?",
                explanation: "Nombrar las limitaciones con honestidad genera confianza y muestra que entiendes tu propio sistema; esconderlas te sale contraproducente cuando alguien encuentra una falla.",
                choices: [
                  {
                    text: "Para que el proyecto se vea débil y nadie haga preguntas",
                    explanation: "Nombrar limitaciones no se trata de verse débil; muestra comprensión y honestidad.",
                  },
                  {
                    text: "Porque ser honesto sobre los límites genera confianza y muestra que entiendes el sistema",
                    explanation: "Correcto: unos límites honestos se ganan la confianza y demuestran que sabes cómo se comporta tu sistema.",
                  },
                  {
                    text: "Porque todo proyecto está obligado a fallar",
                    explanation: "Los proyectos no están obligados a fallar; están obligados a ser honestos sobre sus límites reales.",
                  },
                  {
                    text: "Para que no tengas que probarlo",
                    explanation: "Las limitaciones se encuentran justamente probando; nombrarlas no sustituye a las pruebas.",
                  },
                ],
              },
              {
                prompt: "Decide si la afirmación es verdadera o falsa.",
                statement: "Tienes que ser programador de computadoras para tener algún papel en la construcción o la regulación de la IA.",
                explanation: "Falso: quienes etiquetan datos, quienes trabajan en ética, auditoría, políticas públicas y diseño le dan forma a la IA sin necesariamente programarla.",
              },
              {
                prompt: "¿Qué respuesta da la retroalimentación de revisión más útil?",
                scenario: "Un compañero presenta un detector de enfermedades de las plantas que pasó casi todas las pruebas, pero no se probó con fotos borrosas, y no hay ningún plan de quién revisa sus decisiones.",
                explanation: "La retroalimentación específica señala un hueco real y sugiere un siguiente paso concreto, a diferencia de un elogio vago o un rechazo duro.",
                choices: [
                  {
                    text: "\"Está bien\".",
                    explanation: "Un elogio vago no le da a quien presenta nada sobre lo cual actuar.",
                  },
                  {
                    text: "\"Agrega un caso de prueba con foto borrosa y di quién supervisa los resultados dudosos\".",
                    explanation: "Correcto: es específica, amable y apunta a iteraciones concretas.",
                  },
                  {
                    text: "\"Esto nunca va a funcionar, ni te molestes\".",
                    explanation: "Es dura y vaga: no es específica y no ayuda a mejorar el proyecto.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Conoce un trabajo de IA",
            prompt: "Investiga una carrera en IA y conéctala con el proyecto que diseñaste esta semana.",
            steps: [
              "Elige un rol: ingeniería de aprendizaje automático, etiquetado de datos, ética o auditoría de la IA, políticas públicas, o diseño de producto y experiencia de usuario en IA.",
              "Escribe de tres a cuatro oraciones sobre qué hace esa persona en su día a día y una habilidad que usa.",
              "Explica qué parte de tu propio proyecto se encargaría ese rol.",
              "Anota una cosa de ese trabajo sobre la que te gustaría saber más.",
            ],
            successCriteria: [
              "Un rol de IA descrito con precisión, junto con una habilidad que usa.",
              "Una conexión clara entre el rol y una parte de tu proyecto.",
              "Una pregunta genuina que tengas sobre esa carrera.",
            ],
          },
          reflection: [
            {
              prompt: "De todo el curso, ¿qué es lo más importante que vas a recordar sobre usar la IA de forma responsable?",
            },
            {
              prompt: "¿Qué carrera en IA te suena más interesante, y qué te gustaría aprender después para explorarla?",
            },
          ],
          recap: {
            summary: "Un proyecto terminado se presenta con honestidad (problema, diseño, pruebas, limitaciones, supervisión y uso responsable), se mejora con la revisión, y se conecta con las personas reales que construyen y regulan la IA.",
            keyPoints: [
              "Presenta el problema, el diseño y resultados de prueba honestos, incluidas las limitaciones.",
              "Planea la supervisión humana y el uso responsable para que se pueda confiar en el proyecto.",
              "La IA la construyen y la regulan muchos roles, no solo quienes programan.",
            ],
          },
          extension: {
            title: "Escribe la etiqueta de \"uso responsable\" de tu proyecto",
            body: [
              "Algunos sistemas de IA ya se publican con una breve \"ficha del modelo\" o etiqueta de uso: para qué sirve el sistema, para qué no, cuáles son sus limitaciones conocidas y quién es responsable de supervisarlo.",
              "Escribe una etiqueta de uso responsable de un párrafo para tu propio proyecto. Di para qué se debería y para qué no se debería usar, sus limitaciones principales, quién provee la supervisión y cómo protege la privacidad de las personas.",
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
  finalProject: {
    title: "人工智能设计工作室：设计一个能帮上忙的人工智能",
    overview: "运用这六周学到的全部内容，设计一个能帮助某个真实人群的人工智能工具。你要定义问题，判断人工智能是否真的合适，规划输入、输出、标签、特征或规则，画出原型草图，写出测试用例，并说明你打算如何让它保持公平、保护隐私、始终处于人的监督之下。这是一个设计与规划项目：你不会真的训练一个模型。",
    choices: [
      {
        name: "帮忙分类的助手",
        scenario: "某个团体很难快速把大量物品分门别类，比如图书馆整理还回来的书，或者社团整理照片。",
        exampleGoal: "设计一个能把物品归入正确类别的人工智能。",
        suitableBecause: "从大量带标签的例子中学着分类，非常适合用机器学习来做。",
      },
      {
        name: "答疑小助手",
        scenario: "大家反复问同样的问题，一个小团队应付不过来，比如学校的办公室或某款游戏的客服。",
        exampleGoal: "设计一个基于规则的助手，回答常见问题，其余的转交给人来处理。",
        suitableBecause: "意图明确的常见问题适合用决策树聊天机器人来应对，答不上来时再交给人。",
      },
      {
        name: "公平的推荐器",
        scenario: "一个社区想要一些推荐（书籍、活动或食谱），又不想把大家困在信息茧房里。",
        exampleGoal: "设计一个推荐器，推荐新的选项并说明推荐的理由。",
        suitableBecause: "推荐要用到相似度和用户反馈，正好让你练习如何避开信息茧房。",
      },
      {
        name: "你自己的想法",
        scenario: "你的学校或社区里有个问题，你觉得人工智能也许帮得上忙。",
        exampleGoal: "定义你自己的问题，并设计一个人工智能（或者判断人工智能并不是合适的工具）。",
        suitableBecause: "判断人工智能到底适不适合，本身就是好设计的一部分。",
      },
    ],
    brief: [
      {
        label: "用户需求",
        hint: "这是给谁用的？他们遇到了什么问题？",
      },
      {
        label: "问题定义",
        hint: "用一两句话说清楚具体的任务。",
      },
      {
        label: "人工智能是合适的工具吗？",
        hint: "说明人工智能为什么合适，或者为什么用更简单的工具反而更好。",
      },
      {
        label: "输入与输出",
        hint: "什么进去，什么出来？",
      },
      {
        label: "标签、特征或规则",
        hint: "它会从哪些例子、标签和特征中学习，或者它要遵循哪些规则？",
      },
      {
        label: "原型草图",
        hint: "描述或画出一个人会怎样使用它。",
      },
      {
        label: "测试用例",
        hint: "列出你会拿来测试的例子，包括棘手的边界情况。",
      },
      {
        label: "局限",
        hint: "它可能在哪里出错，或者对谁不公平？",
      },
      {
        label: "公平、隐私与监督",
        hint: "你打算怎样保护隐私、检查公平性，并让人始终说了算？如果结果错了，别人该怎么申诉？",
      },
    ],
    requirements: [
      {
        label: "清晰的用户需求",
        description: "点明一个真实的人群，以及他们面临的问题。",
      },
      {
        label: "人工智能适用性的判断",
        description: "运用输入输出以及「规则还是学习」的思路，论证人工智能是不是合适的工具。",
      },
      {
        label: "设计好输入与输出",
        description: "定义输入和输出，以及涉及的标签、特征或规则。",
      },
      {
        label: "原型与测试用例",
        description: "包含一份原型草图和至少三个测试用例，其中一个是边界情况。",
      },
      {
        label: "负责任使用方案",
        description: "涉及公平、隐私、局限、人的监督以及申诉渠道。",
      },
      {
        label: "清楚的展示",
        description: "把设计讲清楚，让别人既能听懂，也能提出质疑。",
      },
      {
        label: "迭代说明（进阶）",
        description: "描述测试之后你会做的一处改动。",
      },
    ],
    rubric: [
      {
        name: "问题与适用性",
        description: "问题定义得有多清楚，以及人工智能是不是合适的工具。",
        levels: [
          {
            descriptor: "问题含糊不清，也没有分析人工智能是否合适。",
          },
          {
            descriptor: "问题说出来了，但关于人工智能是否适用的分析比较单薄。",
          },
          {
            descriptor: "问题清晰，对人工智能是否合适给出了扎实的论证。",
          },
          {
            descriptor: "问题定义十分精准，适用性判断有说服力，理由充分。",
          },
        ],
      },
      {
        name: "输入、输出与数据",
        description: "输入输出设计的质量，以及标签、特征或规则的质量。",
        levels: [
          {
            descriptor: "输入和输出缺失，或者交代不清。",
          },
          {
            descriptor: "点出了输入和输出，但标签、特征或规则交代不清。",
          },
          {
            descriptor: "输入输出清晰，标签、特征或规则的方案也合理。",
          },
          {
            descriptor: "设计考虑周到、契合需求，标签、特征或规则都很切合实际。",
          },
        ],
      },
      {
        name: "原型与测试",
        description: "原型草图，以及测试用例的质量。",
        levels: [
          {
            descriptor: "没有原型，也没有测试用例。",
          },
          {
            descriptor: "有一个简单的原型，配了一两个简单的测试。",
          },
          {
            descriptor: "原型清晰，至少有三个测试，其中包括一个边界情况。",
          },
          {
            descriptor: "原型讲解到位，测试有力，能探到最可能出问题的地方。",
          },
        ],
      },
      {
        name: "责任与展示",
        description: "公平、隐私、监督、申诉渠道，以及展示是否清楚。",
        levels: [
          {
            descriptor: "忽略了公平、隐私或监督，而且让人看不明白。",
          },
          {
            descriptor: "提到了责任，但留有缺口，或者展示得不够清楚。",
          },
          {
            descriptor: "把公平、隐私、监督和申诉渠道都交代清楚了。",
          },
          {
            descriptor: "负责任使用方案周全细致，展示清楚，也乐于接受提问。",
          },
        ],
      },
    ],
  },
  finalAssessment: {
    title: "课程检测：你学到的人工智能知识",
    instructions: "一次涵盖六周内容的小测。回答每道题，并读一读解析。这是给你自己检验学习用的：不计分，也不会把任何内容发送到别处。",
    questions: [
      {
        prompt: "要判断一个软件是人工智能而不是传统程序，最明显的标志是什么？",
        explanation: "人工智能是从大量例子中学出规律，而不是只按人一条条手写的规则去执行。",
        choices: [
          {
            text: "它从例子中学到了规律。",
            explanation: "正确：从例子中学习正是人工智能的关键标志。",
          },
          {
            text: "它运行得很快。",
            explanation: "快慢并不能决定一个软件是不是人工智能。",
          },
          {
            text: "它的界面很好看。",
            explanation: "界面说明不了它会不会学习。",
          },
          {
            text: "它在计算机上运行。",
            explanation: "所有软件都在计算机上运行。",
          },
        ],
      },
      {
        prompt: "判断这句话是对还是错。",
        statement: "如果一个数据集里某一类的例子远远多于另一类，它就是不均衡的，可能会让模型变得不那么公平。",
        explanation: "对：数据不均衡意味着模型见到的某些情况太少，在这些情况上就可能表现更差。",
      },
      {
        prompt: "为什么要用模型没有训练过的数据来测试它？",
        explanation: "用没见过的例子测试，才能看出模型是真的会举一反三，还是只是把训练数据背了下来。",
        choices: [
          {
            text: "为了看它能不能推广到新的例子上。",
            explanation: "正确：没见过的测试数据才能反映真实水平。",
          },
          {
            text: "为了让训练变得更快。",
            explanation: "测试和训练速度是两码事。",
          },
          {
            text: "为了把多余的数据用掉。",
            explanation: "测试数据是有用途的：衡量泛化能力。",
          },
          {
            text: "因为训练数据总是错的。",
            explanation: "训练数据并不总是错的；我们只是需要一次公平的检验。",
          },
        ],
      },
      {
        prompt: "一个图片分类器把一张松饼的照片标成了狗。这属于哪一类错误？",
        scenario: "模型对一个并不是狗的东西预测出了「狗」。",
        explanation: "把不是狗的东西预测成「狗」，属于「狗」这一类的假阳性。",
        choices: [
          {
            text: "「狗」的假阳性。",
            explanation: "正确：它错误地报告说有「狗」。",
          },
          {
            text: "「狗」的假阴性。",
            explanation: "假阴性指的是漏掉了一只真正的狗。",
          },
          {
            text: "完美的准确率。",
            explanation: "它出错了，所以准确率并不完美。",
          },
          {
            text: "输入错误。",
            explanation: "图片本身没问题；错的是模型的预测。",
          },
        ],
      },
      {
        prompt: "判断这句话是对还是错。",
        statement: "如果语言模型的回答读起来很流畅、很有把握，那它就一定是真的。",
        explanation: "错：语言模型预测的是接下来最可能出现的文字，所以流畅的回答照样可能是错的。一定要核实事实。",
      },
      {
        prompt: "什么是信息茧房？",
        explanation: "信息茧房指的是推荐系统一直给你看类似的东西，于是你很少见到新的或不一样的选项。",
        choices: [
          {
            text: "推荐系统一直给你看类似的东西，却把不一样的藏了起来。",
            explanation: "正确：这种越来越窄的情况就是信息茧房。",
          },
          {
            text: "一种清洗数据的工具。",
            explanation: "信息茧房不是这个意思。",
          },
          {
            text: "一项隐私设置。",
            explanation: "信息茧房说的是推荐范围越来越窄，不是某项设置。",
          },
          {
            text: "一种相机滤镜。",
            explanation: "它讲的是推荐，不是照片滤镜。",
          },
        ],
      },
      {
        prompt: "以下哪些是负责任地使用人工智能的好做法？（把符合的都选出来。）",
        explanation: "负责任的使用包括：尽量少收集数据、核对来源、留意偏见，以及保留人的监督和申诉渠道。",
        choices: [
          {
            text: "只收集你确实需要的数据。",
            explanation: "正确：数据收集得越少，隐私越有保障。",
          },
          {
            text: "在相信人工智能生成的内容之前，先查证原始来源。",
            explanation: "正确：独立求证能识破虚假信息。",
          },
          {
            text: "让人工智能在没有人审核的情况下做重要决定。",
            explanation: "重要的决定需要有人监督，也需要留出申诉的渠道。",
          },
          {
            text: "留意偏见，以及对某些群体不公平的结果。",
            explanation: "正确：检查不同群体之间是否公平，正是负责任的使用。",
          },
        ],
      },
      {
        prompt: "把设计一个人工智能工具的步骤排成合理的顺序。",
        explanation: "好的设计从用户需求和问题出发，先判断人工智能是否合适，再设计输入输出，做出原型，然后测试并改进。",
        items: [
          {
            text: "定义用户需求和问题",
          },
          {
            text: "判断人工智能是不是合适的工具",
          },
          {
            text: "设计输入、输出，以及标签、特征或规则",
          },
          {
            text: "做出原型，然后测试并改进",
          },
        ],
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
    {
      title: "公平、隐私与可信的信息",
      subtitle: "审视人工智能是否存在偏见，保护人们的数据，并核查你看到的内容是否值得信任。",
      summary: "学生学习负责任地评判人工智能：数据不均衡如何造成偏见，而分组结果又如何把它揭示出来；隐私和知情同意为什么重要，数据最小化又如何降低风险；以及如何通过找到原始出处、核对上下文、独立确认来核实人工智能生成的内容和网上的内容，并且始终通过监督和申诉权，让人保持在掌控之中。",
      bigQuestion: "我们怎么判断一个人工智能系统是否公平、是否尊重隐私，以及它给出的信息是否可信？",
      estimatedTime: "2.5-3 小时",
      objectives: [
        "说明偏见如何来自不均衡的代表性，并读懂分组结果来发现它。",
        "给隐私、个人数据和知情同意下定义，并把数据最小化应用到某个功能上。",
        "利用原始出处、上下文和独立确认来核实内容。",
        "说明为什么人工智能的重要决定需要人的监督和申诉权。",
      ],
      requiredConcepts: [
        "偏见",
        "代表性",
        "分组结果",
        "公平",
        "隐私",
        "知情同意",
        "个人数据",
        "数据最小化",
        "深度伪造",
        "错误信息",
        "原始出处",
        "上下文",
        "独立确认",
        "人的监督",
        "申诉",
      ],
      lessons: [
        {
          title: "审视一个数据集是否公平",
          summary: "了解不均衡的样例如何造成偏见，读懂分组结果，看清一个系统对谁管用，并审视一个数据集是否公平。",
          estimatedTime: "50-60 分钟",
          objectives: [
            {
              text: "给偏见和代表性下定义，并说明二者如何相互关联。",
            },
            {
              text: "读懂分组结果，比较一个系统对不同群体的效果好坏。",
            },
            {
              text: "说明当人工智能对不同群体区别对待时，公平意味着什么。",
            },
            {
              text: "审视一个被描述的数据集，并指出它的样例在哪一方面不均衡。",
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
              term: "偏见",
              definition: "当一个系统对某些人或某些事物总是表现得更好或更差时，通常是因为它学习所用的样例。",
            },
            {
              term: "代表性",
              definition: "某个群体在数据集中出现得有多多。样例多，这个群体的代表性就好；样例少，就是代表性不足。",
            },
            {
              term: "分组结果",
              definition: "为每个群体分别测出的成绩，而不是用一个数字概括所有人，好让你看清系统对谁管用。",
            },
            {
              term: "公平",
              definition: "以人们会认为公道、合理的方式对待各个群体，不让某个群体在没有正当理由的情况下处于不利地位。",
            },
          ],
          openingScenario: {
            prompt: "语音助手几乎每次都能听懂一位朋友，却老是听错另一位口音不同的朋友。对两个人来说，软件是同一个。为什么它对两人的表现会差这么多？",
            context: "记住你的第一个猜想，本课后面你会拿真实的分组数字来检验它。",
          },
          predictionPrompt: {
            prompt: "预测一下：如果一个人脸识别系统主要是从成年人的照片中学习的，你觉得它在儿童照片上会同样好用吗？",
            howToCheck: "阅读下面的概念和分组图表时，留意某个群体的样例数量，是否会改变系统对该群体的效果。",
          },
          concepts: [
            {
              title: "偏见来自样例，而不是计算机「想要」什么",
              body: [
                "计算机没有观点，也没有感情。我们说一个人工智能有偏见，意思是它总是对某些人或某些事物表现得更好。几乎无一例外，这都源于它学习所用的样例。",
                "如果一个系统是从不均衡的样例中学习的，它就会擅长常见情况，而在少见情况上更弱。软件做的正是它被训练去做的事，不均衡是人给它的数据带来的。",
              ],
              examples: [
                "主要用一种口音训练出的语音系统，对那种口音理解得最好。",
                "主要用白天照片训练出的图片分类器，在夜里就吃力。",
                "用正式书面语训练出的翻译工具，处理俚语就很差。",
              ],
            },
            {
              title: "代表性：样例里有谁，又有多少",
              body: [
                "代表性说的是每个群体在数据中出现得有多多。一个群体样例多，代表性就好；样例少，就是代表性不足。一个数据集可能有成千上万个样例，却仍然让某些群体几乎一个都没有。",
                "代表性不足是偏见最大的来源之一。模型只能学到它见过的规律。如果某个群体在样例中几乎不出现，模型就没什么可学的，于是往往对那个群体犯更多错。",
              ],
              examples: [
                "一个含 10,000 张狗照片的数据集，其中某个品种只有 20 张。",
                "一份主要采自成年人、儿童很少的医学数据集。",
                "一个手写数据集，印刷体很多，连笔字却极少。",
              ],
            },
            {
              title: "分组结果能显示单一总分所掩盖的东西",
              body: [
                "人很容易用一个数字来评判一个系统，比如「它的准确率有 92%」。但一个数字是所有人身上的平均值。它可能看着很棒，同时却在某个较小的群体上惨败，而那些错误被平均值埋掉了。",
                "分组结果为每个群体分别测量准确率。把成绩拆开，你就能看出系统对谁管用、对谁不管用。关于公平的问题，几乎总是需要分组结果，而不只是一个总数。",
              ],
              examples: [
                "总体 92%，但某个口音群体只有 74%。",
                "总体准确率很高，但夜间照片的错误远多于白天照片。",
                "一项平均下来通过的测试，对左手写字的人却经常出错。",
              ],
            },
            {
              title: "公平：有没有人在没有正当理由的情况下吃了亏？",
              body: [
                "公平意味着以人们会认为公道、合理的方式对待各个群体。它并不总是要求结果完全一样，但它要追问：是否有某个群体在吃亏，以及这个差距是否有正当理由。",
                "公平是人的判断，不是计算机来决定的事。必须由人去看分组结果、判断某个差距是否可以接受，并承担起纠正它的责任，而这往往意味着去收集更均衡的样例。",
              ],
              examples: [
                "判定 74% 与 92% 的准确率差距太大，不适合上线。",
                "选择为代表性不足的群体收集更多样例。",
                "追问：如果系统对某个特定群体出错，受害的是谁。",
              ],
            },
          ],
          workedExample: {
            title: "审视一个微笑检测器的数据集",
            steps: [
              "说清任务。一个相机应用想在所有人都在微笑时按下快门。输入：一张人脸。输出：「在微笑」或「没在微笑」。",
              "看看代表性。训练集里有 8,000 张成年人照片，却只有 500 张幼儿照片。",
              "预测后果。儿童样例这么少，模型几乎学不到孩子是怎么笑的，因此很可能在儿童身上犯更多错。",
              "看分组结果，而不只是平均值。总体准确率是 90%，但按群体拆开，成年人是 94%，儿童只有 71%。",
              "做出关于公平的判断。差距很大，而且儿童在没有正当理由的情况下吃了亏，所以公平的做法是收集更多儿童样例，在上线前重新测试。",
            ],
            takeaway: "审视一个数据集，先问谁的代表性不足，再看分组结果，判断这种不均衡是否变成了不公平的错误。",
          },
          visuals: [
            {
              title: "各群体的准确率：一个平均值掩盖了真实差距",
              summary: "一张条形图，用百分比分别显示一个语音识别系统在四个口音群体上的准确率。总体平均为 88%，但各群体并不均衡：口音群体 A 为 94%，口音群体 B 为 91%，口音群体 C 为 82%，口音群体 D 为 74%。训练样例最少的 C 组和 D 组，成绩远低于平均水平，所以单一的总体数字掩盖了最好与最差群体之间约 20 个百分点的真实差距。",
              caption: "把平均值拆开，就能清楚看到这个系统对某些群体明显比对另一些更管用。",
              chart: {
                unit: "准确率（%）",
                bars: [
                  {
                    label: "总体平均",
                  },
                  {
                    label: "口音群体 A",
                  },
                  {
                    label: "口音群体 B",
                  },
                  {
                    label: "口音群体 C",
                  },
                  {
                    label: "口音群体 D",
                  },
                ],
              },
            },
            {
              title: "代表性与准确率差距正好对得上",
              summary: "一张表，把每个口音群体的训练样例数量与它的准确率对应起来。A 组：5,000 个样例，准确率 94%。B 组：4,200 个样例，91%。C 组：900 个样例，82%。D 组：400 个样例，74%。样例最少的群体准确率最低，显示出代表性不足是怎样变成偏见的。",
              table: {
                columns: [
                  "口音群体",
                  "训练样例数",
                  "准确率",
                ],
              },
            },
          ],
          activity: {
            title: "公平性审查",
            goal: "审查一所虚构学校的理工科项目推荐系统：看清总体准确率如何掩盖了某个较小群体的糟糕结果，再通过限制一个替代特征、补充代表性不足的样例来纠正它。",
            overview: "一所虚构的学校在推荐课后理工项目。一个透明的最近邻模型预测某个项目是否合适；你要把总体准确率与各群体（Hillside，以及更小、更远的 Riverside）的准确率作比较。这个有缺陷的模型过度依赖一个具有误导性的替代特征「住在学校附近」，它反映的是居住区域而不是适配程度，而且训练时来自 Riverside 的「合适」样例太少。调低那个替代特征的权重，补上缺失的样例，然后重新运行，并与有缺陷的基线作比较。全部内容都是虚构且确定性的；改善代表性有帮助，但绝不保证完全公平。",
            steps: [
              "先读总体准确率，再读各群体的准确率，留意其中的差距。",
              "调低具有误导性的「靠近学校」替代特征的权重。",
              "为代表性不足的 Riverside 群体补上缺失的「合适」样例。",
              "重新运行，并比较修改前后的分组准确率、错误批准数和被漏掉的学生数。",
            ],
            materials: [
              "本活动中内置的公平性审查",
            ],
            successCriteria: [
              "找出了被总体数字掩盖的分组差距。",
              "限制了替代特征，并补充了代表性不足的样例。",
              "比较了修改前后的分组准确率，并指出公平有所改善但并无保证。",
            ],
            dataset: {
              name: "理工科项目推荐系统审查数据集",
              description: "一份用于学校理工科项目推荐系统的虚构、确定性数据集：带有群体标签（Hillside／Riverside）的学生记录、相关特征、一个具有误导性的「靠近学校」替代特征、群体之间不均衡的代表性，以及一个留出的测试集。不含真实或个人数据。",
              columns: [
                "群体",
                "特征",
                "替代特征",
                "是否合适？",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "回答这些题，检验你能否发现偏见、读懂分组结果并判断公平。",
            questions: [
              {
                prompt: "人工智能系统里的偏见，最常来自哪里？",
                explanation: "计算机没有观点；偏见几乎总能追溯到训练数据中不均衡的样例。",
                choices: [
                  {
                    text: "计算机认定自己不喜欢某个群体。",
                    explanation: "软件没有喜好，它只是反映了自身数据中的规律。",
                  },
                  {
                    text: "它学习所用的样例不均衡，所以某些群体学得比另一些好。",
                    explanation: "正确：数据中代表性不均衡，是偏见最常见的来源。",
                  },
                  {
                    text: "计算机太慢了。",
                    explanation: "速度和一个系统有没有偏见毫无关系。",
                  },
                  {
                    text: "只有系统被黑客入侵时才会出现偏见。",
                    explanation: "偏见通常来自普通的不均衡数据，而不是入侵。",
                  },
                ],
              },
              {
                prompt: "判断这句话是对还是错。",
                statement: "单一的总体准确率数字，足以证明一个系统对每个群体都公平。",
                explanation: "一个数字是平均值，可能掩盖某个较小群体的糟糕结果；要判断公平，需要分组结果。",
              },
              {
                prompt: "根据分组结果，最合理的下一步是什么？",
                scenario: "一个照片应用报告说总体准确率为 90%。按群体拆开后，成年人为 95%，儿童为 70%。训练集里的儿童照片非常少。",
                explanation: "儿童成绩低，正好对应儿童样例太少，所以公平的做法是收集更多儿童样例并重新测试。",
                choices: [
                  {
                    text: "直接上线，因为总体 90% 已经够好了。",
                    explanation: "90% 的平均值掩盖了系统在儿童身上表现很差这一事实。",
                  },
                  {
                    text: "收集更多儿童照片来让数据更均衡，然后重新测试。",
                    explanation: "正确：更均衡的代表性，正好对准了造成差距的根源。",
                  },
                  {
                    text: "把成年人的照片删掉，好让数字对得上。",
                    explanation: "扔掉好数据既帮不了儿童，还会削弱系统对所有人的表现。",
                  },
                  {
                    text: "什么都不做，因为计算机不可能有偏见。",
                    explanation: "分组差距正是偏见的明确证据，应当加以处理。",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "设计一个更公平的数据集",
            prompt: "挑一项简单的人工智能任务，在训练任何模型之前，先规划一个对各群体都公平的数据集。",
            steps: [
              "选一项任务，比如识读手写字，或者辨认宠物。",
              "列出这个系统应当为之服务好的那些群体。",
              "大致决定每个群体需要多少样例，才能让谁都不至于代表性不足。",
              "写下你会如何用分组准确率、而不只是总体平均值来检查结果。",
            ],
            successCriteria: [
              "至少写出三个系统应当服务的群体。",
              "方案给每个群体的样例足够多，避免代表性不足。",
              "方案用分组结果来检查公平性。",
            ],
          },
          reflection: [
            {
              prompt: "想一想你用过的某个工具，它对某些人可能比对另一些人更好用。它的数据里可能缺了谁的样例？",
            },
            {
              prompt: "为什么一个系统只看总体成绩时显得公平，看分组结果时却可能并不公平？",
            },
          ],
          recap: {
            summary: "偏见通常来自不均衡的代表性，而只有分组结果才能揭示一个系统是否对每个群体都公平。",
            keyPoints: [
              "偏见指的是系统总是对某些群体比对另一些表现更好，通常源于它的样例。",
              "代表性不足的群体往往会遇到更多错误，因为模型见到的样例更少。",
              "单一的总体成绩可能掩盖真实差距；分组结果才显示系统对谁管用。",
              "公平是人的判断：某个差距是否可以接受，又该如何纠正。",
            ],
          },
          extension: {
            title: "当准确率相同却依然不公平",
            body: [
              "有时两个群体的准确率一样，但错误对其中一个群体的影响要严重得多。设想一个把图书馆藏书标记为「逾期」的系统。一次错误标记，对一个群体可能只是小小的麻烦，对另一个群体却可能让他们完全借不到书。",
              "挑一个人工智能可能做出的决定，描述这样一种情形：各群体准确率相同，却仍然导致不公平的后果，因为犯错的代价并不相等。你还需要哪些额外信息，才能察觉到这一点？",
            ],
          },
        },
        {
          title: "保护隐私，最小化数据",
          summary: "弄清什么算个人数据、知情同意为什么重要，以及数据最小化如何在少收集得多的情况下，仍让一个人工智能功能照常运转。",
          estimatedTime: "45-55 分钟",
          objectives: [
            {
              text: "给隐私和个人数据下定义，并各举出例子。",
            },
            {
              text: "说明知情同意是什么意思，以及它为什么必须建立在被充分告知的基础上。",
            },
            {
              text: "运用数据最小化，只保留某个功能真正需要的数据。",
            },
            {
              text: "重新设计一个被描述的功能，让它少收集个人数据。",
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
              term: "隐私",
              definition: "一个人有权决定谁可以查看和使用关于自己的信息。",
            },
            {
              term: "个人数据",
              definition: "任何关于某个具体的人的信息，比如姓名、住址、精确位置、生日、照片或消息。",
            },
            {
              term: "知情同意",
              definition: "在被用通俗的语言告知这些数据会被怎样使用之后，一个人明确同意收集或使用自己的数据。",
            },
            {
              term: "数据最小化",
              definition: "只收集和保存某个功能真正需要用来运转的数据，多一点都不要。",
            },
          ],
          openingScenario: {
            prompt: "一个免费的手电筒应用，在点亮灯光之前，要求查看你的通讯录、你的精确位置和你的照片。手电筒只需要控制灯光。为什么一个应用会索取远超其功能所需的数据？",
            context: "记住你的答案：到最后，你将能够重新设计一个功能，让它不再过度收集。",
          },
          predictionPrompt: {
            prompt: "预测一下：要让一个天气应用显示今天的预报，哪一样就够了：你所在的城市，还是你的确切街道地址加上完整的位置历史？",
            howToCheck: "阅读数据最小化的内容时，判断哪一个是仍能让这个功能完成任务的最小数据。",
          },
          concepts: [
            {
              title: "隐私与个人数据：什么需要保护",
              body: [
                "隐私是你决定谁可以查看和使用关于你的信息的权利。个人数据是任何关于某个具体的人的信息：姓名、家庭住址、精确位置、生日、一张露脸的照片，或者私人消息。",
                "并非所有数据都是个人数据。「星期二下雨了」不是关于任何一个人的。但「小安 4:00 在公园」就是个人数据，因为它告诉了别人关于某个具体的人的事。人工智能功能常常依赖个人数据运转，这正是隐私在这里如此重要的原因。",
              ],
              examples: [
                "个人数据：全名、家庭住址、精确的 GPS 位置、露脸照片。",
                "通常不是个人数据：当前天气、公交时刻表。",
                "敏感的个人数据：健康信息、私人消息。",
              ],
            },
            {
              title: "知情同意是明明白白的「愿意」，不是被藏起来的「愿意」",
              body: [
                "知情同意是指一个人明确同意收集或使用自己的数据。要让同意成为真正的同意，它必须是知情的：用通俗的语言告诉这个人，收集了哪些数据、用来做什么，而且他可以说不。",
                "埋在小字条款里、默认勾选的方框，或者一个让人一头雾水的弹窗，都不算真正的同意，因为这个人从未真正理解，也没有自由地做出选择。好的设计会问得清清楚楚，并让「不同意」成为一个容易又安全的选项。",
              ],
              examples: [
                "清晰的同意：「共享你的位置，以便我们显示附近的站点？是 / 否。」",
                "不是真正的同意：一份长长的协议，把数据共享藏在第 40 段里。",
                "不是真正的同意：一个应用非要你允许毫不相关的追踪，否则就不给用。",
              ],
            },
            {
              title: "数据最小化：只收集这项工作需要的东西",
              body: [
                "数据最小化是一条简单又强大的规则：只收集和保存某个功能真正需要用来运转的数据。如果一个功能用更少的数据就能完成任务，那它就应该那样做。你从未收集的数据，就不可能泄露、被滥用，或被不该看到的人看到。",
                "要做到最小化，对每一项数据都问一句：「这个功能真的需要它才能运转吗？」天气预报需要的是你的大致区域，而不是你的确切地址或全部位置历史。砍掉多余的数据，能让功能照样好用，同时降低对人们的风险。",
              ],
              examples: [
                "用你所在的城市、而不是你精确的 GPS 轨迹来做天气预报。",
                "一个计步器只保存今天的总步数，而不是你走过的所有地方。",
                "注册时只要一个昵称，而不是你的法定全名。",
              ],
            },
            {
              title: "数据更少，工作照旧：最小化的实际做法",
              body: [
                "最小化并不意味着把功能弄坏。大多数功能都可以重新设计成需要更少数据，办法是使用范围更宽或保存期更短的数据版本。不用精确位置，用一个大致区域。不永久保存，任务一结束就删掉。",
                "这是由人做出的设计选择。当你构建或评判一个人工智能功能时，你可以坚持选那个既能完成任务、又收集最少个人数据的版本，这就是通过设计来尊重隐私，而不是碰运气。",
              ],
              examples: [
                "在天气功能里，把「确切地址」变成「城市」。",
                "对地图路线，把「永久保存」变成「行程结束后删除」。",
                "对游戏排行榜，把「真实姓名和生日」变成「只要昵称」。",
              ],
            },
          ],
          workedExample: {
            title: "为校车追踪功能做数据最小化",
            steps: [
              "说清这个功能的任务。在校车还有大约五分钟到站时提醒学生，好让他动身去站点。",
              "列出一个粗心的版本可能会收集什么。学生一整天的精确 GPS 位置、他的全名、他的家庭住址，以及他的全部位置历史。",
              "对每一项都问一遍最小化的问题。要提醒「校车快到你的站点了」，这个功能需要的是学生使用的那一个站点，而不是一整天的行踪追踪。",
              "用更少的数据重新设计。让学生从列表里选出自己的站点。只保存那个站点，并且只在校车运行期间把它和校车位置作比较。",
              "检查知情同意。问得明明白白：「校车快到你的站点时提醒你？是 / 否」，并确保学生和家人都理解、也可以拒绝。",
            ],
            takeaway: "从这个功能真正的任务出发，只保留仍能完成任务的最小数据，并用清晰的方式征得同意。",
          },
          visuals: [
            {
              title: "重新设计一个功能，让它少收集",
              summary: "一张校车追踪功能的前后对比图。之前（过度收集）：保存学生一整天的精确位置、法定全名、家庭住址，以及永久保留的完整位置历史。之后（最小化）：只保存学生选定的那一个校车站点，只在校车运行期间与校车位置作比较，并在当天结束时删除。「之后」的版本完成的是同一件事，也就是在校车临近时提醒学生，却保存了远远更少的个人数据。",
              caption: "同样的任务，个人数据却少得多：最小化的设计降低了学生面临的风险。",
            },
            {
              title: "这个功能真的需要它吗？",
              summary: "一张表，逐项检验一个天气功能可能索取的数据是否真的必要。大致区域或城市：需要，因为预报是本地的。精确 GPS 地址：不需要，城市就够了。完整位置历史：不需要，只有当前区域才重要。通讯录：不需要，和天气毫无关系。经验法则是只保留标着「需要」的那些行。",
              table: {
                columns: [
                  "索取的数据",
                  "本地预报需要它吗？",
                  "保留吗？",
                ],
                rows: [
                  [
                    "大致区域或城市",
                    "需要，预报是本地的",
                    "保留",
                  ],
                  [
                    "精确 GPS 地址",
                    "不需要，城市就够了",
                    "舍弃",
                  ],
                  [
                    "完整位置历史",
                    "不需要，只有当前区域才重要",
                    "舍弃",
                  ],
                  [
                    "通讯录",
                    "不需要，与天气无关",
                    "舍弃",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "隐私与数据最小化实验室",
            goal: "针对几个虚构的应用，把每一个数据字段归类为必需、有帮助、不必要或过于敏感，然后对照关于更安全替代方案、知情同意和保存时长的指引。",
            overview: "挑一个虚构的应用（图书推荐、活动提醒、回收助手、学习计划或博物馆导览），逐个字段地看下去，包括名字、确切生日、年龄段、精确位置、语音录音、照片、设备标识等等，判断对那个用途来说它是必需的、有帮助但可选的、不必要的，还是过于敏感的。揭晓指引，看看每个字段为什么可能需要或不需要、有什么更安全的替代方案、是否需要征得同意、应保存多久，以及在设备本地处理是否能降低风险。目标是数据最小化：只收集真正必要的东西。不需要输入任何个人信息；应用和字段都是内置的。",
            steps: [
              "选一个应用，读一读它是做什么用的。",
              "把每个数据字段归类：必需、有帮助、不必要，或过于敏感。",
              "揭晓指引并作对照，读一读每一项的更安全替代方案、知情同意和保存时长。",
              "留意同一个字段，如何在一个应用里是必需的，在另一个应用里却是不必要的。",
            ],
            materials: [
              "本活动中内置的隐私实验室",
            ],
            successCriteria: [
              "至少为一个应用把所有字段都归了类。",
              "识别出了不必要和过于敏感的字段（数据最小化）。",
              "读过了更安全的替代方案、同意方面的要求，以及保存时长的指引。",
            ],
            dataset: {
              name: "应用情景与数据字段",
              description: "五个内置的虚构应用情景和十三个可能的数据字段，每个都配有编写好的答案（推荐的归类、原因、更安全的替代方案、知情同意、保存时长、设备本地处理）。不会输入任何真实的个人数据。",
              columns: [
                null,
                "数据字段",
                "归类",
                "更安全的替代方案",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "回答这些题，检验你是否理解个人数据、知情同意和数据最小化。",
            questions: [
              {
                prompt: "下面哪些算个人数据？选出所有符合的。",
                explanation: "个人数据是关于某个具体的人的信息；公开的公交时刻表不是关于任何一个人的。",
                choices: [
                  {
                    text: "一个人的家庭住址",
                    explanation: "正确：家庭住址是关于某个具体的人的信息。",
                  },
                  {
                    text: "一张能看到某人脸部的照片",
                    explanation: "正确：露脸照片能识别出某个具体的人，所以它是个人数据。",
                  },
                  {
                    text: "一座城市的公开公交时刻表",
                    explanation: "公开的时刻表不是关于任何一个人的，所以它不是个人数据。",
                  },
                  {
                    text: "某个人此刻的精确位置",
                    explanation: "正确：精确位置说明了某个具体的人在哪里，所以它是个人数据。",
                  },
                ],
              },
              {
                prompt: "哪个选项最符合数据最小化？",
                scenario: "一个问答游戏应用需要一个名字，显示在得分榜上。它给出了三种从每位玩家那里收集信息的方案。",
                explanation: "排行榜只需要一个显示用的名字，所以昵称是仍能完成任务的最少个人数据。",
                choices: [
                  {
                    text: "收集玩家自己输入的一个昵称。",
                    explanation: "正确：昵称用最少的个人数据完成了任务。",
                  },
                  {
                    text: "收集玩家的法定全名和生日。",
                    explanation: "排行榜并不需要法定姓名或生日，所以这是过度收集。",
                  },
                  {
                    text: "顺便把玩家的通讯录和位置也收集了。",
                    explanation: "通讯录和位置与显示一个分数毫无关系，所以这远远超出了需要。",
                  },
                ],
              },
              {
                prompt: "判断这句话是对还是错。",
                statement: "把共享数据的条款藏在小字里、藏在用户多半不会读到的地方，仍然算作真正的知情同意。",
                explanation: "知情同意意味着这个人被清楚地告知、并且可以自由选择；藏在小字里的数据共享不是知情同意。",
              },
            ],
          },
          challenge: {
            title: "为你用的某个功能做最小化",
            prompt: "挑一个常见的应用功能，重新设计它，让它在照常工作的同时收集最少的个人数据。",
            steps: [
              "用一句话描述这个功能和它真正的任务。",
              "列出它可能会收集的个人数据。",
              "把这项任务并不真正需要的都划掉。",
              "写出最小化之后的版本，并为它写一个清晰的知情同意问句。",
            ],
            successCriteria: [
              "把这个功能的任务说清楚了。",
              "至少去掉了一项不必要的个人数据。",
              "写出了清晰的知情同意问句，并给出容易拒绝的方式。",
            ],
          },
          reflection: [
            {
              prompt: "你设备上的哪个应用，你觉得收集的数据超出了它的功能所需？它可以不再索取什么？",
            },
            {
              prompt: "为什么少收集个人数据，即便从来没人滥用过，也仍然是在保护人们？",
            },
          ],
          recap: {
            summary: "隐私就是掌控个人数据；同意必须建立在知情的基础上，而数据最小化只保留一个功能真正需要的东西。",
            keyPoints: [
              "个人数据是关于某个具体的人的信息，比如姓名、住址或精确位置。",
              "真正的同意是知情且自愿给出的，而不是藏在小字里的。",
              "数据最小化意味着只收集这个功能运转所必需的东西。",
              "你从未收集的数据不会泄露、也不会被滥用，所以数据越少，风险越小。",
            ],
          },
          extension: {
            title: "「免费」应用背后的取舍",
            body: [
              "许多应用之所以免费，是因为它们收集并使用了用户的数据。这并不意味着每个免费应用都有害，但确实意味着「这个应用从我这里得到了什么？」是一个值得问的问题。",
              "挑一个免费的应用或服务，描述其中可能的交换：用户得到了什么，而公司可能作为回报收集了哪些数据？按照数据最小化的标准，这些数据里有哪些是这个应用其实并不需要的？",
            ],
          },
        },
        {
          title: "调查人工智能内容，并做出一个伦理决定",
          summary: "学会通过找到原始出处、核对上下文、独立确认，来核实人工智能生成的内容和网上的内容，然后在人的监督和申诉权之下做出一个伦理决定。",
          estimatedTime: "50-60 分钟",
          objectives: [
            {
              text: "给深度伪造和错误信息下定义，并说明它们如何误导人。",
            },
            {
              text: "通过找到一个说法的原始出处并核对上下文来核实它。",
            },
            {
              text: "使用来自彼此独立且可信来源的独立确认。",
            },
            {
              text: "说明为什么人工智能的重要决定需要人的监督和申诉权。",
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
              term: "深度伪造",
              definition: "由人工智能制作或篡改的照片、视频或音频，让某个人看起来在说或在做他其实并没有说过、做过的事。",
            },
            {
              term: "错误信息",
              definition: "传播开来的虚假或有误导性的信息，不论转发的人是否有意欺骗。",
            },
            {
              term: "原始出处",
              definition: "一个说法、一段引语或一张图片在被复制或转发之前，最早真正出现的地方。",
            },
            {
              term: "上下文",
              definition: "围绕某件事的完整来龙去脉，也就是何时、何地、为何发生，它赋予一个事实真正的含义。",
            },
            {
              term: "独立确认",
              definition: "用两个或更多彼此独立、并非互相照抄的可信来源来核对一个说法。",
            },
            {
              term: "人的监督",
              definition: "由人来复核人工智能的重要决定并对其负责，而不是让软件自己说了算。",
            },
            {
              term: "申诉",
              definition: "你有权要求由人来复核、并在必要时更改人工智能对你做出的某个决定。",
            },
          ],
          openingScenario: {
            prompt: "网上流传着一段视频，画面中一位著名科学家说了非常惊人的话。看起来、听起来都很真。在相信它或转发它之前，你会想先核实什么？",
            context: "如今人工智能已经能造出以假乱真的图像、视频和音频，所以「看起来是真的」已经不足以让人相信一样东西了。",
          },
          predictionPrompt: {
            prompt: "预测一下：如果同一个惊人说法出现在五个账号上，而它们都是照抄同一条帖子，这算不算五次独立确认？",
            howToCheck: "阅读关于独立确认的内容时，判断同一个来源的复制品能否算作彼此独立的确认。",
          },
          concepts: [
            {
              title: "深度伪造与错误信息：为什么「看起来是真的」不算证据",
              body: [
                "深度伪造是指人工智能制作或篡改出来的照片、视频或音频，让某个人看起来在说或在做他从未做过的事。由于人工智能在这方面越来越强，一段视频完全可能看着、听着都很有说服力，实际上却是假的。",
                "错误信息是指传播开来的虚假或有误导性的信息。它不一定是深度伪造，转发的人也未必想误导别人：一张真实的照片配上虚假的说明照样会流传。无论哪种情况，办法都一样：不要仅仅因为某样东西看着像真的、或者很多人转发过，就去相信它。",
              ],
              examples: [
                "一段视频里，人物的口型和声音被人工智能改动，伪造出一句引语。",
                "一张真实的旧照片被重新转发，并谎称是今天发生的事。",
                "一个编造出来的「统计数字」，被重复太多次，以至于开始让人觉得是真的。",
              ],
            },
            {
              title: "找到原始出处，核对上下文",
              body: [
                "要核实一个说法，就把它追溯到原始出处，也就是它在被复制、转发之前最早真正出现的地方。一段引语的截图不是出处；真正的报道、视频或官方页面才是。如果你根本找不到任何原始出处，那就是一个警示信号。",
                "然后核对上下文：何时、何地、为何发生。一张真实的照片如果年代久远、来自别的地方，或者缺了周围的来龙去脉，同样可能误导人。上下文正是把一个孤零零的事实，变成一个诚实的事实的东西。",
              ],
              examples: [
                "把一句引语追溯到它被剪出来的那场完整访谈。",
                "发现一张「突发」照片其实是好几年前某场活动的。",
                "读完整段声明后发现，那句引语是从半句话里截断的。",
              ],
            },
            {
              title: "独立确认：彼此独立的来源，而不是回声",
              body: [
                "单一来源可能出错，所以有分量的说法需要独立确认：两个或更多彼此独立、并非互相照抄的可信来源。十个账号转发同一条帖子，仍然只是一个来源在回声，而不是十次确认。",
                "要做独立确认，就去找那些自己独立得出这一说法的报道或记录：另一家新闻机构、一个官方页面、一位专家。如果彼此独立的来源都一致，这个说法为真的可能性就大得多。如果只有一个来源提到它，就继续保持谨慎。",
              ],
              examples: [
                "两家不同的新闻机构，各自独立地报道了同一件事。",
                "一家官方机构在自己的页面上确认自己发布的消息。",
                "发现五个「来源」最后都指向同一条帖子。",
              ],
            },
            {
              title: "人的监督与申诉权",
              body: [
                "人工智能可以帮忙标记可能的伪造内容或整理信息，但它会出错，所以重要的决定需要人的监督，也就是由一个人来复核这个决定并对它负责。当一个决定会影响某人的生活时，这一点最为要紧，比如把一条帖子标记为虚假、给作业评分，或者封禁一个账号。",
                "受人工智能决定影响的人，也应当拥有申诉权：可以要求由人来复核这个决定，并在人工智能弄错时予以更改。监督和申诉，正是我们让人、而不是软件，掌控重要决定的方式。",
              ],
              examples: [
                "在任何帖子被删除之前，由人来复核人工智能标记出来的内容。",
                "学生请老师重新核对一道由人工智能评分的答案。",
                "在人工智能误封账号之后，用户向人工客服提出申诉。",
              ],
            },
          ],
          workedExample: {
            title: "调查一段惊人的爆红视频",
            steps: [
              "转发之前先停一停。这段视频既惊人又煽情，而这恰恰是错误信息传播最快的时候。",
              "找到原始出处。去搜索完整视频或官方声明，而不只是别人转发的那个短片段。",
              "核对上下文。你会发现这段片段是从一场更长的演讲里剪出来的，而那位讲者说的其实是相反的意思；这句引语被断章取义了。",
              "做独立确认。去找一个彼此独立且可信的来源。没有任何独立媒体报道过这个惊人说法，这是一个强烈的信号，说明它并不属实。",
              "在监督与申诉之下作决定。因为事关重大，是由一位人工审核员、而不是人工智能自己来复核并把它标注为具有误导性，而发帖者如果拿得出真实证据，可以提出申诉。",
            ],
            takeaway: "在对一个严肃说法采取行动之前，先按出处和上下文核实，再做独立确认，并让人保持在掌控之中、留有申诉的途径。",
          },
          visuals: [
            {
              title: "网络内容核查清单",
              summary: "一个四步流程，用于在相信或转发之前核查一个说法。第 1 步：找到原始出处（它最早出现的地方，而不是一张截图）。第 2 步：核对上下文（何时、何地、为何发生）。第 3 步：做独立确认（两个或更多彼此独立、并非互相照抄的可信来源）。第 4 步：在人的监督之下作决定，并保留申诉权。任何一步没通过，就不要把它当作真的转发出去。",
              caption: "按顺序走完这四步；某一步没通过的说法，就不该被当作真的转发出去。",
            },
            {
              title: "真正的确认与回声之别",
              summary: "一张表，用来分辨真正的独立确认和一个来源的回声。同一条原帖被转发五次：不是独立的，因为它们都追溯到同一个来源。两家不同的新闻机构各自独立报道：是独立的，因为它们分别得出了这一说法。一家官方机构确认自己发布的消息：既独立又可信。一个没有出处的匿名账号：不算确认，要谨慎对待。",
              table: {
                columns: [
                  "你找到了什么",
                  "算独立确认吗？",
                ],
                rows: [
                  [
                    "同一条原帖被转发了五次",
                    "不算，是一个来源在回声",
                  ],
                  [
                    "两家不同的新闻机构，各自独立报道",
                    "算，是独立的",
                  ],
                  [
                    "一家官方机构确认自己发布的消息",
                    "算，是可信来源",
                  ],
                  [
                    "一个没有附任何出处的匿名账号",
                    "不算，相信之前先核实",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "内容调查与伦理决定",
            goal: "用出处和上下文方面的证据去调查虚构的帖子，然后作为伦理委员会审议若干被提出的人工智能系统，并设计一套申诉流程。",
            overview: "第 1 部分：调查一批虚构的帖子，包括一张诚实标注的人工智能插画、一张配了误导性说明的真实照片、一句伪造的引语、一个虚假的日期、一个没有出处的说法、一个来源可靠的说法，以及一条煽情的连环转发帖。对每一条，都做那七项出处与上下文核查（谁发布的、有没有原始出处、日期对不对、说明文字与上下文是否相符、有没有证据、是否有独立来源确认、它是否在催促你的情绪），并判断该相信、该质疑，还是暂不下结论。像手指怪异这类视觉「破绽」被视为不可靠依据，本活动也不声称能完美识别人工智能内容。第 2 部分：作为伦理委员会评估六个被提出的人工智能系统，选出一项决定和相应的保障措施，反馈依据的是你的保障措施是否与事关的轻重相称，而不是某个唯一「正确」答案。第 3 部分：设计一套申诉流程。全部为虚构；任何内容都不会被发送到任何地方。",
            steps: [
              "对每一条帖子，读完那七项证据核查，然后判断：相信、质疑，还是暂不下结论。",
              "与推荐结论以及关于出处和上下文的教学说明作对照。",
              "作为伦理委员会，为一个被提出的人工智能系统选出一项决定和相应的保障措施。",
              "设计一套申诉流程：告知、说明理由、由谁复核、如何纠正、如何留档，以及推翻决定的权力。",
            ],
            materials: [
              "本活动中内置的内容调查、伦理委员会和申诉流程设计器",
            ],
            successCriteria: [
              "对帖子的判断依据的是出处和上下文的证据，而不是某个视觉小技巧。",
              "做出了一项伦理决定，其保障措施与事关的轻重相称。",
              "设计出一套完整的申诉流程，包含人的监督和纠错的途径。",
            ],
            dataset: {
              name: "帖子、伦理情景与申诉流程设计器",
              description: "一批内置的虚构帖子共八条（每条都配有七项出处与上下文的证据核查和一个推荐结论）、六个伦理委员会情景（附有事关的轻重、可能出现的差错和关键保障措施），以及一个分为六部分的申诉流程设计器。全部为虚构；不含真实账号、真实人物或个人数据。",
              columns: [
                "帖子／情景",
                "证据或事关的轻重",
                "推荐结论／保障措施",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "回答这些题，检验你能否核实内容，并就监督和申诉进行思考。",
            questions: [
              {
                prompt: "把核实一个惊人说法的各个步骤排成合理的顺序。",
                explanation: "核实的做法是：先找到原始出处，再核对它的上下文，然后用独立来源加以确认，最后才决定该怎么做。",
                items: [
                  {
                    text: "找到这个说法出自的原始出处",
                  },
                  {
                    text: "核对上下文：何时、何地、为何发生",
                  },
                  {
                    text: "用两个或更多独立来源加以确认",
                  },
                  {
                    text: "决定该怎么做，并由人来复核这个决定",
                  },
                ],
              },
              {
                prompt: "下面哪一项才是对一个说法的真正独立确认？",
                explanation: "独立确认需要彼此独立、各自得出这一说法的来源，而不是同一条帖子的复制品。",
                choices: [
                  {
                    text: "同一条帖子被许多账号转发",
                    explanation: "同一条帖子的转发只是一个来源在回声，不是独立确认。",
                  },
                  {
                    text: "两个彼此独立且可信的来源，各自独立地报道了它",
                    explanation: "正确：并非互相照抄的彼此独立来源，才是真正的独立确认。",
                  },
                  {
                    text: "一个匿名账号说「相信我」",
                    explanation: "一个没有署名、也没有出处的账号，根本算不上确认。",
                  },
                  {
                    text: "因为这个说法很惊人，所以感觉它是真的",
                    explanation: "感觉不是证据；越是惊人的说法，越需要核查。",
                  },
                ],
              },
              {
                prompt: "处理这个人工智能决定，最负责任的做法是什么？",
                scenario: "一个学校应用用人工智能标记它认为是抄袭的作文。它标记了普里娅的作文，而那篇其实是她自己写的。",
                explanation: "人工智能会出错，所以应当由人来复核这个标记，普里娅也应当能够向人提出申诉。",
                choices: [
                  {
                    text: "自动判零分，因为人工智能从不出错。",
                    explanation: "人工智能确实会出错，所以不经人工复核就照着标记处理，是不公平的。",
                  },
                  {
                    text: "让老师复核这个标记，并让普里娅申诉和解释。",
                    explanation: "正确：人的监督加上申诉权，能保护人们不受人工智能差错的伤害。",
                  },
                  {
                    text: "对普里娅隐瞒这个标记，让她无从争辩。",
                    explanation: "隐瞒决定会剥夺一切申诉的机会，这对普里娅不公平。",
                  },
                  {
                    text: "把这篇作文删掉，这样谁都不用做决定了。",
                    explanation: "删掉她的作业既惩罚了普里娅，也依然没有给她一次公正的复核。",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "写一份核实指南",
            prompt: "做一份简短的指南，让朋友在转发一条爆红帖子之前，能用它来判断这条帖子是否可信。",
            steps: [
              "写下这四个步骤：原始出处、上下文、独立确认，以及人工复核。",
              "为每一步加上一个朋友可以问自己的、简单直白的问题。",
              "加上一句话，说明什么时候一个决定需要人的监督和申诉的途径。",
            ],
            successCriteria: [
              "四个核实步骤按清晰的顺序都出现了。",
              "每一步都有一个简单、能用得上的问题。",
              "指南中提到了人的监督和申诉权。",
            ],
          },
          reflection: [
            {
              prompt: "想一想某件惊人的事在网上传开的经历。有什么本可以帮人们在转发之前核实它？",
            },
            {
              prompt: "为什么即使人工智能通常是对的，对它的决定提出申诉的权利依然重要？",
            },
          ],
          recap: {
            summary: "因为人工智能能够伪造并传播极具说服力的内容，所以要按出处和上下文核实、做独立确认，并让人保持在掌控之中、拥有申诉权。",
            keyPoints: [
              "深度伪造和错误信息意味着「看起来是真的」并不算证据。",
              "把说法追溯到原始出处，并核对它周围的上下文。",
              "独立确认需要彼此独立的来源，而不是同一条帖子的复制品。",
              "人工智能的重要决定需要人的监督和申诉权。",
            ],
          },
          extension: {
            title: "当速度和准确彼此拉扯",
            body: [
              "在网上，抢先往往比说对更能吸引注意力，所以误导性内容可能在还没人核实之前就传开了。认真核实需要时间，而节奏飞快的信息流并不奖励这种时间。",
              "描述一种情形：抢着转发的压力，与核实一个说法所需的步骤发生冲突。平台或个人可以做些什么，让「准确的选择」比「快的选择」更容易？",
            ],
          },
        },
      ],
    },
    {
      title: "人工智能设计工作室",
      subtitle: "把所学汇总起来：界定一个真实问题，判断人工智能是否合适，设计并测试一个原型，再负责任地把它展示出来。",
      summary: "在收官这一周，学生像设计团队一样工作：把用户的需求转化为清晰的问题界定，判断人工智能是不是合适的工具，设计输入、输出、特征、标签和规则，做出并测试一个纸上原型，用测试用例找出它的局限，再诚实地展示成果，包含人的监督和负责任的使用，同时了解那些构建和治理人工智能的人的职业。这一周为单独进行的最终项目工作室和期末测评做准备。",
      bigQuestion: "你要如何把一个想法，从一个真实问题一路做成一个经过测试、并被负责任地展示出来的人工智能项目？",
      estimatedTime: "2.5-3 小时",
      objectives: [
        "把用户的需求转化为清晰的问题界定，并判断人工智能是否适合它。",
        "设计一个系统的输入、输出、特征、标签和规则。",
        "做出一个原型，用测试用例检验它，找出它的局限并进行迭代。",
        "在有监督的前提下负责任地展示一个项目，并描述真实的人工智能职业。",
      ],
      requiredConcepts: [
        "用户需求",
        "问题界定",
        "人工智能的适用性",
        "输入",
        "输出",
        "特征",
        "标签",
        "规则",
        "原型",
        "测试用例",
        "局限",
        "监督",
        "迭代",
        "负责任的使用",
      ],
      lessons: [
        {
          title: "选对问题，也选对工具",
          summary: "像真正的团队那样启动一个设计项目：说出一个用户需求，写下清晰的问题界定，并判断人工智能究竟是不是这项工作的合适工具。",
          estimatedTime: "50-60 分钟",
          objectives: [
            {
              text: "把用户需求转化为一句话说清楚的问题界定。",
            },
            {
              text: "判断人工智能的适用性：决定一个问题更适合人工智能，还是更适合固定规则。",
            },
            {
              text: "说出你的项目会用到的输入和输出。",
            },
            {
              text: "说明为什么在动手做任何东西之前，选对问题很重要。",
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
              name: "你第 1 至 5 周的笔记",
              note: "用来回忆人工智能是怎样从样例中学习的。",
            },
          ],
          vocabulary: [
            {
              term: "用户需求",
              definition: "某个具体的人或群体想要解决的一个真实问题，从他们的角度来描述。",
            },
            {
              term: "问题界定",
              definition: "用一句清晰的话说明你到底要解决什么、为谁解决。",
            },
            {
              term: "人工智能的适用性",
              definition: "一个问题与人工智能的契合程度。人工智能从大量样例中学习规律，而固定规则则是人可以直接写出来的。",
            },
            {
              term: "输入",
              definition: "系统会接收的信息，比如一张照片、一句话，或一组数字。",
            },
            {
              term: "输出",
              definition: "系统会返回的结果，比如一个标签、一个预测或一条建议。",
            },
          ],
          openingScenario: {
            prompt: "学校的一个社团说：「我们想用人工智能！」可是用来做什么呢？设计团队从来不从工具开始，而是从一个有问题的人开始。你的项目要解决的是谁的问题？这个问题究竟是什么？",
            context: "这一周你要规划一个真实的项目。一切都从问题出发，而不是从技术出发。",
          },
          predictionPrompt: {
            prompt: "预测一下：在「把图书馆书籍的照片分成小说和非小说」与「用正确的密码打开一扇门」这两个想法中，哪一个更适合人工智能？",
            howToCheck: "边读边问：这项任务是不是杂乱到人没法写出精确规则，还是已经有一条清晰的规则能解决它。",
          },
          concepts: [
            {
              title: "从用户需求出发，而不是从工具出发",
              body: [
                "好项目都始于一个有真实问题的真实的人，也就是一个用户需求。「我们班的同学总记不清该把垃圾扔进哪个回收桶」是一个用户需求。「我想用人工智能」不是，它说的是一个工具，而不是一个问题。",
                "当你从用户需求出发时，日后才能判断你的项目是否真的帮上了忙。描述需求时要站在用户的角度：他是谁，此刻什么事对他来说很难。",
              ],
              examples: [
                "一位园丁分辨不出哪些叶子得了植物病害",
                "新生第一天在校园里找不到教室",
                "一个笔友社团收到成员看不懂的语言写的信息",
              ],
            },
            {
              title: "写下清晰的问题界定",
              body: [
                "有了用户需求之后，你要写下问题界定：用一句清晰的话说明你到底在解决什么、为谁解决。界定得越准，项目越不容易跑偏。「帮六年级学生根据一张照片，把教室垃圾分成可回收、堆肥和其他垃圾」就足够具体，既能动手做，也能测试。",
                "像「让回收变得更好」这样含糊的界定没法测试，你永远不会知道自己有没有成功。好的问题界定会说清用户、任务，以及一个好结果是什么样。",
              ],
              examples: [
                "含糊：「帮帮植物。」清晰：「告诉园丁一张番茄叶照片看起来是健康的还是有病的。」",
                "含糊：「让上学更轻松。」清晰：「根据教室编号，给新生指出去那间教室的路线。」",
              ],
            },
            {
              title: "判断人工智能的适用性：它究竟是不是合适的工具？",
              body: [
                "并不是每个问题都需要人工智能。当一项任务杂乱到写不出精确规则，而你又有大量可供学习的样例时，人工智能才最出彩，比如从照片中分辨健康叶片和病叶。一个已经能被一条清晰规则解决的问题不需要人工智能：「密码匹配就解锁」是一条规则，不是一项学习任务。",
                "要判断人工智能的适用性，问三个问题：这项任务是不是杂乱到没法手写规则？你能不能收集到大量带标签的样例？以及，系统偶尔出错是不是可以接受？如果答案都是肯定的，人工智能可能合适。如果一条简单规则就能解决，那就用规则：它更便宜、更清楚，也更容易核查。",
              ],
              examples: [
                "适合人工智能：把垃圾照片分成可回收、堆肥或其他垃圾。",
                "不适合人工智能：早上 7:00 打开走廊的灯，那是一条固定规则。",
                "不适合人工智能：哪怕错一次都可能严重伤害到人的任务。",
              ],
            },
          ],
          workedExample: {
            title: "从一个模糊的愿望到一个能动手做的项目",
            steps: [
              "从这个愿望开始：「我想用人工智能来帮回收社团。」",
              "找出用户需求：社团成员和其他同学常常把垃圾扔错桶，因为他们分不清什么是可回收的。",
              "写出问题界定：「根据一件物品的照片，帮学生判断它该扔进可回收、堆肥、其他垃圾这三个桶中的哪一个。」",
              "说出输入和输出：输入是一件物品的照片；输出是一个标签，「可回收」「堆肥」或「其他垃圾」。",
              "检查人工智能的适用性：对精确规则来说太杂乱吗？是的，物品千差万别。能收集到大量带标签的照片吗？能。偶尔出错可以接受吗（仍有人来复核）？可以。人工智能合适。",
            ],
            takeaway: "一个能动手做的项目，具备真实的用户需求、一句话的问题界定、说得出的输入和输出，以及在适用性判断上的一个「是」。",
          },
          visuals: [
            {
              title: "这个问题该用人工智能吗？",
              summary: "一棵关于人工智能适用性的决策树。起点：「一条清晰的规则能解决吗？」如果能，就用规则，而不是人工智能。如果不能，接着问：「能收集到大量带标签的样例吗？」如果不能，人工智能多半还派不上用场。如果能，接着问：「偶尔出错、并且有人来复核，可以接受吗？」如果不可以，就要非常谨慎，或者干脆不用人工智能。如果可以，人工智能可能很合适。",
              caption: "规则能解决时就用规则；把人工智能留给那些有样例、又有人复核的杂乱任务。",
            },
            {
              title: "问题界定核查表",
              summary: "一张表，列出一个有力的问题界定应包含什么。用户：指明某个具体的人或群体。任务：说清究竟要判断或产出什么。输入：说明系统接收什么。输出：说明它返回什么。可检验：日后你能判断它有没有奏效。",
              table: {
                columns: [
                  "组成部分",
                  "它回答的问题",
                  "薄弱的例子",
                  "有力的例子",
                ],
                rows: [
                  [
                    "用户",
                    "谁有这个问题？",
                    "「人们」",
                    "「刚入学的六年级新生」",
                  ],
                  [
                    "任务",
                    "我们究竟在解决什么？",
                    "「帮忙指路」",
                    "「根据教室编号给出到那间教室的路线」",
                  ],
                  [
                    "输入",
                    "什么进来？",
                    "「一些信息」",
                    "「一个教室编号」",
                  ],
                  [
                    "输出",
                    "什么出去？",
                    "「一个答案」",
                    "「一步步的路线指引」",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "问题与工具契合度工作室",
            goal: "选定一个项目问题，写出它的问题界定，并判断人工智能是不是合适的工具。",
            overview: "你将浏览一组候选问题，挑出一个（或者带来你自己的用户需求），把它变成一份能动手做的项目简介：一个用户需求、一句话的问题界定、说得出的输入和输出，以及关于人工智能适用性的判断。这就是你最终项目的种子。",
            steps: [
              "读一读候选问题，挑一个你感兴趣的，或者写下你自己的用户需求。",
              "站在用户的角度写下这个需求：他是谁，什么事对他来说很难。",
              "写一句话的问题界定，说清用户、任务，以及一个好结果是什么样。",
              "说出你的系统会用到的输入和输出。",
              "做一遍人工智能适用性检查，并写一句话：人工智能合适吗，还是一条简单规则就够了？",
            ],
            materials: [
              "纸和笔，或者一个记事应用",
            ],
            successCriteria: [
              "一个站在用户角度写下的需求。",
              "一句话的问题界定，说清了用户、任务和一个可检验的结果。",
              "说得出的输入和输出。",
              "关于人工智能适用性的明确判断，并附一句话的理由。",
            ],
            dataset: {
              name: "候选项目问题",
              description: "一组内置的工作室起步问题：根据照片分类教室垃圾、标记有病害的植物叶片、给失物招领的物品归类、翻译笔友信息、按主题整理图书馆藏书，以及「用密码打开储物柜」（一个只需规则、应当排除的陷阱）。每张卡片都列出了大致的用户、一个可能的输入和一个可能的输出。",
              columns: [
                "问题",
                "可能的用户",
                "可能的输入",
                "可能的输出",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "检验你能否界定一个问题，并判断人工智能是否适合它。",
            questions: [
              {
                prompt: "哪一个是最有力的问题界定？",
                explanation: "有力的问题界定会说清用户、具体任务，以及一个你日后能检验的结果。",
                choices: [
                  {
                    text: "用人工智能让学校变得更好。",
                    explanation: "这说的是一个工具和一个愿望，既没有具体用户，也没有任务或可检验的结果。",
                  },
                  {
                    text: "根据教室编号给出路线，帮新生找到教室。",
                    explanation: "正确：它说清了用户（新生）、任务（指路）和一个可检验的结果。",
                  },
                  {
                    text: "用照片做点酷炫的东西。",
                    explanation: "既没有用户，也没有任务，更没有任何你能检验的东西。",
                  },
                  {
                    text: "让所有人的回收都变得更好。",
                    explanation: "太含糊了：你永远没法判断它有没有奏效。",
                  },
                ],
              },
              {
                prompt: "判断这句话是对还是错。",
                statement: "如果一条清晰的规则已经能解决问题，你还是应该用人工智能，因为人工智能更先进。",
                explanation: "错：如果一条简单规则管用，就用规则。它比人工智能更便宜、更清楚，也更容易核查。",
              },
              {
                prompt: "哪个项目最适合用人工智能？",
                scenario: "一个社团在两者之间选择：（A）在下课的那一刻准时打铃，或者（B）根据一张照片判断植物叶子看起来是健康的还是有病的。",
                explanation: "打铃是一条清晰的时间规则。而分辨健康叶片和病叶很杂乱，需要大量带标签的样例，这正适合人工智能。",
                choices: [
                  {
                    text: "下课时打铃",
                    explanation: "那是一条固定的时间规则，不需要学习，所以人工智能并不合适。",
                  },
                  {
                    text: "在照片里分辨健康的叶子和有病的叶子",
                    explanation: "正确：它对手写规则来说太杂乱，又有可供学习的样例，所以人工智能合适。",
                  },
                  {
                    text: "两者同样适合人工智能",
                    explanation: "打铃是一条简单规则，并不需要人工智能。",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "三个问题，留下一个",
            prompt: "想出三个用户需求，然后挑出最适合人工智能的那一个，并为你的选择辩护。",
            steps: [
              "写出三个不同的用户需求，每一个都站在一位真实用户的角度。",
              "为每一个说出一个可能的输入和一个可能的输出。",
              "对这三个都做一遍人工智能适用性检查，并挑出最合适的那个。",
              "写两句话，为你挑中的那个比其他两个更适合人工智能作辩护。",
            ],
            successCriteria: [
              "三个用户需求，每个都有输入和输出。",
              "对每一个都做出了人工智能适用性判断。",
              "挑出了一个问题，并配有两句话的辩护。",
            ],
          },
          reflection: [
            {
              prompt: "为什么人容易从工具出发（「我们来用人工智能吧」）而不是从问题出发？这样做又会出什么岔子？",
            },
            {
              prompt: "写问题界定时，哪一部分最难：说清用户、任务，还是可检验的结果？",
            },
          ],
          recap: {
            summary: "出色的人工智能项目，都始于一个真实的用户需求、一份清晰的问题界定，以及对「人工智能究竟是不是合适工具」的一次诚实检验。",
            keyPoints: [
              "用户需求描述的是一个真实的人的问题，而不是你想用的某个工具。",
              "问题界定要说清用户、任务、输入、输出，以及一个可检验的结果。",
              "判断人工智能的适用性：规则管用时就用规则；把人工智能留给样例充足的杂乱任务。",
            ],
          },
          extension: {
            title: "是机会，还是噱头？",
            body: [
              "有些公司给产品加上「人工智能」，主要是为了营销，哪怕一条简单规则会更管用。这可能浪费钱，也让产品更难被信任和核查。",
              "找一个宣传自己带有「人工智能」功能的真实产品或应用。判断这项任务是否真的需要人工智能，还是一条固定规则就够了。写一小段话说明你的判断。",
            ],
          },
        },
        {
          title: "规划、做原型、做测试",
          summary: "把你的问题变成一个能动手做、也能检验的方案：设计输入、输出、特征、标签和规则；做一个简单的原型；再用真实的测试用例来检验它。",
          estimatedTime: "50-65 分钟",
          objectives: [
            {
              text: "设计你的系统的输入、输出、特征、标签，以及任何规则。",
            },
            {
              text: "说明什么是原型，并在纸上做一个简单的原型。",
            },
            {
              text: "写出测试用例，并用它们找出局限。",
            },
            {
              text: "根据测试所显示的结果，通过迭代改进你的设计。",
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
              name: "你在第 1 课写下的问题界定",
              note: "你会在它的基础上搭建方案。",
            },
          ],
          vocabulary: [
            {
              term: "特征",
              definition: "关于某个输入的、可衡量的一条线索，系统用它来做判断，比如物品的颜色、形状或大小。",
            },
            {
              term: "标签",
              definition: "附在一个样例上的正确答案，比如把一张照片标注为「可回收」，好让系统从中学习。",
            },
            {
              term: "规则",
              definition: "由人写下的精确指令，比如「如果这件物品是玻璃瓶，就标注为可回收」。",
            },
            {
              term: "原型",
              definition: "一个想法的、快速而粗糙的第一版，做出来是为了在造出真东西之前先检验它怎么运作。",
            },
            {
              term: "测试用例",
              definition: "一个已知正确答案的例子，你把它送进原型，检验原型是否管用。",
            },
            {
              term: "迭代",
              definition: "反复走「制作、测试、改进」这个循环，让设计一次比一次更好。",
            },
          ],
          openingScenario: {
            prompt: "你已经有了问题界定：把一张垃圾照片分成可回收、堆肥或其他垃圾。系统会看哪些线索（特征）？你会教给它哪些标签？而在真正动手做任何东西之前，你又怎么知道自己的方案靠不靠谱？",
            context: "这节课，你要把自己的想法变成一个真的能在纸上检验的方案。",
          },
          predictionPrompt: {
            prompt: "预测一下：当你第一次用棘手的例子测试自己的原型时，它会大部分都答对，还是会在一些例子上失败？你觉得哪种例子会把它绊倒？",
            howToCheck: "写完并「跑完」你的测试用例之后，把实际发生的情况和你的预测作比较。",
          },
          concepts: [
            {
              title: "设计各个部件：输入、输出、特征、标签和规则",
              body: [
                "动手之前，先设计各个部件。输入是进来的东西（一件物品的照片）。输出是出去的东西（一个标签：可回收、堆肥或其他垃圾）。标签则是你要教给系统、并用来核查它的那组正确答案。",
                "特征是系统用来做判断的线索，比如物品的材质、形状，或者它是否湿了、是否有油。如果任务中有一部分既简单又清楚，你甚至可以加一条规则：「如果是干净的玻璃瓶，就标注为可回收。」好的方案会把这些都写清楚，好让任何人都能看懂一个判断是怎么做出来的。",
              ],
              examples: [
                "输入：一件物品的照片。输出：三个标签中的一个。",
                "特征：材质、是否湿了、是不是纸、上面有没有食物。",
                "规则：「如果是香蕉皮，就标注为堆肥。」",
              ],
            },
            {
              title: "原型是为了检验而做的粗糙初版",
              body: [
                "原型是你这个想法的快速、粗糙版本，做出来是为了从中学习，而不是成品。你的原型可以在纸上：一叠「如果有这些特征，就用这个标签」的卡片，或者一张同学能用手跟着走的简单流程图。关键是把想法变得足够具体，好拿来试一试。",
                "原型本来就该是不完美的。趁早、花很少的成本做一个，能让你免于花大力气去做错的东西。你完全可以把一个原型扔掉，那没关系，你留下了从中学到的东西。",
              ],
              examples: [
                "纸上的流程图：「是纸吗？湿了吗？→ 标签」。",
                "一叠决策卡片，朋友不用你解释就能照着走。",
                "手绘的应用界面草图，标出输入和输出。",
              ],
            },
            {
              title: "测试用例揭示局限，迭代把它们修好",
              body: [
                "测试用例是一个已知正确答案的例子。你把它送进原型，看它给出的标签对不对。几个精心挑选的测试用例，包括棘手的那些，很快就能显示出你的设计在哪里崩掉。那些薄弱之处就是它的局限：它会出错或者拿不定主意的情形。",
                "任何系统都有局限；目标是有意去把它们找出来，而不是日后被它们打个措手不及。当某个测试用例失败时，你就改进设计，再测一次。这个「一直重复直到更好」的循环就是迭代，也是真实产品被造出来的核心方式。",
              ],
              examples: [
                "测试用例：一个油腻的比萨盒。正确标签：其他垃圾或堆肥，而不是可回收。",
                "发现的局限：原型把所有盒子都标成「可回收」，所以油腻的那些就错了。",
                "迭代：加一个「有没有食物油渍？」的特征，再加一条规则，把油腻的盒子送到别处。",
              ],
            },
          ],
          workedExample: {
            title: "为一个垃圾分类器做原型并测试",
            steps: [
              "设计各个部件：输入 = 一件物品的照片；输出 = 可回收／堆肥／其他垃圾；特征 = 材质、是不是纸、是否湿了、有没有食物油渍。",
              "做一个纸上原型：决策卡片。「如果是剩饭剩菜 → 堆肥。如果是干净的纸或干净的瓶子 → 可回收。否则 → 其他垃圾。」",
              "写下已知答案的测试用例：干净的水瓶（可回收）、香蕉皮（堆肥）、油腻的比萨盒（其他垃圾）、铝箔薯片袋（其他垃圾）。",
              "用手跑一遍测试：原型答对了水瓶和香蕉皮，却把油腻的比萨盒标成了「可回收」，这是一次失败。",
              "找出局限并迭代：加一个「有没有食物油渍？」的特征，再加一条规则，让油腻的纸类进其他垃圾。重新跑一遍测试用例；这次比萨盒通过了。",
            ],
            takeaway: "设计各个部件，做一个粗糙原型，用已知答案的用例来测试，找出它的局限，然后不断迭代直到变好。",
          },
          visuals: [
            {
              title: "制作、测试、改进的循环",
              summary: "一个不断重复的四步循环。第 1 步：设计各个部件（输入、输出、特征、标签、规则）。第 2 步：做一个粗糙的原型。第 3 步：跑测试用例，记录哪些通过、哪些失败。第 4 步：找出局限并改进。一支箭头从第 4 步回到第 2 步，表示迭代。",
              caption: "迭代意味着把这个循环走不止一遍，每一遍都更好一点。",
            },
            {
              title: "一张测试用例表",
              summary: "垃圾分类器的测试用例表。每一行都有一个例子、它已知的正确标签、原型给出的标签，以及通过还是失败。干净的水瓶：正确答案可回收，给出可回收，通过。香蕉皮：正确答案堆肥，给出堆肥，通过。油腻的比萨盒：正确答案其他垃圾，给出可回收，失败。铝箔薯片袋：正确答案其他垃圾，给出其他垃圾，通过。",
              table: {
                columns: [
                  "测试用例",
                  "正确标签",
                  "原型给出的标签",
                  "结果",
                ],
                rows: [
                  [
                    "干净的水瓶",
                    "可回收",
                    "可回收",
                  ],
                  [
                    "香蕉皮",
                    "堆肥",
                    "堆肥",
                  ],
                  [
                    "油腻的比萨盒",
                    "其他垃圾",
                    "可回收",
                    "失败",
                  ],
                  [
                    "铝箔薯片袋",
                    "其他垃圾",
                    "其他垃圾",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "原型方案工作室",
            goal: "把你的问题界定，变成一份经过设计、做出原型并测试过、可以拿去展示的方案。",
            overview: "用你在第 1 课确定的问题，设计输入、输出、特征、标签和任何规则；画出一个纸上原型；写至少四个测试用例，包括棘手的那些；用手「跑」一遍；再记下你发现的局限和你会做的一项改进。这将成为你最终项目的核心。",
            steps: [
              "设计各个部件：写出你的输入、输出、标签、三到五个特征，以及任何简单规则。",
              "做一个纸上原型：画一张流程图，或者写出同学不用你帮忙就能照着走的决策卡片。",
              "写至少四个已知正确答案的测试用例，其中包括两个棘手的。",
              "用手把每个测试用例送进原型，并在测试用例表上记录通过还是失败。",
              "列出失败所揭示的局限，并写下你接下来会做的一项改进（你的迭代）。",
            ],
            materials: [
              "纸和笔，或者一个记事应用",
            ],
            successCriteria: [
              "写出了输入、输出、标签、三到五个特征，以及任何规则。",
              "一个同学不需要额外解释就能照着走的纸上原型。",
              "至少四个已知答案的测试用例，包括棘手的，已跑过并标注了通过或失败。",
              "至少找出一项局限，并提出一项改进（迭代）。",
            ],
            dataset: {
              name: "测试用例入门包",
              description: "一份内置的清单，教你怎样写好测试用例：既要有简单的例子，也要有边缘情况（湿的、油腻的、破损的、少见的），还要有可能两边都说得通的例子。另外附有一张空白的测试用例表模板（例子、正确标签、原型给出的标签、通过／失败）供你抄用。",
              columns: [
                "测试用例类型",
                "为什么要包含它",
                "示例提示",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "检验你能否规划、做原型并测试一个设计。",
            questions: [
              {
                prompt: "在动手做系统之前，下面哪些是你应当设计好的？（选出所有符合的。）",
                explanation: "输入、输出、特征和标签都属于设计的一部分。展示用的幻灯片是后面的事，不属于「决定怎样做判断」的设计。",
                choices: [
                  {
                    text: "系统接收的输入",
                    explanation: "正确：写清输入是设计的核心部分。",
                  },
                  {
                    text: "它返回的输出",
                    explanation: "正确：输出，包括那组标签，都必须经过设计。",
                  },
                  {
                    text: "它用来做判断的特征",
                    explanation: "正确：特征是系统所用的线索，所以属于设计的一部分。",
                  },
                  {
                    text: "你展示用幻灯片的颜色",
                    explanation: "幻灯片的颜色是之后展示的事，与系统怎样做判断无关。",
                  },
                ],
              },
              {
                prompt: "把一轮原型制作中「制作、测试、改进」的循环排好顺序。",
                explanation: "你先设计各个部件，做出粗糙原型，跑测试用例，然后找出局限并改进；这个循环还可以再来一遍。",
                items: [
                  {
                    text: "设计各个部件（输入、输出、特征、标签、规则）",
                  },
                  {
                    text: "做一个粗糙的原型",
                  },
                  {
                    text: "跑测试用例，并记录通过还是失败",
                  },
                  {
                    text: "找出局限并改进设计",
                  },
                ],
              },
              {
                prompt: "这个团队接下来该做什么？",
                scenario: "一个团队的纸上原型通过了所有简单的测试用例，却把一个油腻的比萨盒标成了「可回收」，而正确答案是其他垃圾。",
                explanation: "一个失败的测试用例揭示了一处局限。正确的做法是迭代：改进设计（加一个关于油渍的特征或规则）并重新测试，而不是掩盖或无视这次失败。",
                choices: [
                  {
                    text: "不理会那个油腻的盒子，因为简单的用例都通过了",
                    explanation: "无视一个已知的失败，等于把一处真实的局限留在了设计里。",
                  },
                  {
                    text: "改进设计以处理油渍，然后重新跑一遍测试用例",
                    explanation: "正确：这就是迭代，修好测试所揭示的局限，再测一次。",
                  },
                  {
                    text: "把油腻比萨盒那个测试用例删掉，好让它通过",
                    explanation: "删掉一个难的测试用例，是在掩盖问题，而不是在解决它。",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "把你自己的原型难倒",
            prompt: "使劲想办法让你自己的原型失败，然后用你学到的东西把它变得更好。",
            steps: [
              "写三个特别棘手的测试用例，专门用来绊倒你的原型。",
              "用手跑一遍，记录哪些失败了。",
              "对每一次失败，说出它揭示的那处局限。",
              "提出一项改动（一次迭代），并预测它会不会修好那些失败。",
            ],
            successCriteria: [
              "三个能给原型施加压力的棘手测试用例。",
              "每一次失败都对应上一处说得出名字的局限。",
              "提出一次迭代，并预测它的效果。",
            ],
          },
          reflection: [
            {
              prompt: "为什么先做一个粗糙的原型，比直接跳到成品版本更有用？",
            },
            {
              prompt: "哪个测试用例让你对自己设计的局限了解最多？为什么？",
            },
          ],
          recap: {
            summary: "你把一个问题变成可检验的方案：设计各个部件，做一个粗糙原型，跑已知答案的测试用例，再通过迭代修好你发现的局限。",
            keyPoints: [
              "动手之前，先设计输入、输出、标签、特征和任何规则。",
              "原型是花很少成本做出的粗糙版本，用来尽早检验一个想法。",
              "测试用例揭示局限；迭代就是不断改进直到更好的那个循环。",
            ],
          },
          extension: {
            title: "测试到什么程度才算够？",
            body: [
              "真实的团队没法测试每一种可能的输入，所以他们会精心挑选测试用例：常见情况、边缘情况，以及出错代价最大的情况。一个医疗人工智能受到的测试，要比一个推荐表情符号的小游戏严格得多。",
              "针对你的项目，判断哪些测试用例最重要，以及为什么。写一份简短的「测试计划」，说明在真实用户能够信任这个系统之前，你认为测试到什么程度才算够。",
            ],
          },
        },
        {
          title: "展示、评议，并了解人工智能职业",
          summary: "有力地收尾：诚实地展示你的项目，包括它的局限和它所需要的人的监督，给出并接受有用的反馈，再了解那些构建、治理和设计人工智能的人究竟在做什么。",
          estimatedTime: "50-65 分钟",
          objectives: [
            {
              text: "清楚地展示一个项目：问题、你的设计、你的测试，以及它的局限。",
            },
            {
              text: "说明你的项目需要怎样的监督和负责任的使用，才能值得信任。",
            },
            {
              text: "在评议中给出并接受具体、善意且有用的反馈。",
            },
            {
              text: "描述几种真实的人工智能职业，也就是那些构建、治理和设计人工智能的人。",
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
              name: "你在第 2 课做出的方案和测试结果",
              note: "你要把它们展示出来。",
            },
          ],
          vocabulary: [
            {
              term: "局限",
              definition: "系统会出错、拿不定主意，或者不该被信任的那些情形；诚实的项目会把它们坦率地说出来。",
            },
            {
              term: "监督",
              definition: "由人持续负责检查并纠正人工智能的判断，尤其是在出错会造成影响的时候。",
            },
            {
              term: "负责任的使用",
              definition: "以公平、诚实、安全且尊重他人隐私的方式使用人工智能，并清楚说明它能做什么、不能做什么。",
            },
            {
              term: "人工智能职业",
              definition: "人们构建、研究、治理或设计人工智能系统及其使用方式的工作。",
            },
          ],
          openingScenario: {
            prompt: "两个团队展示垃圾分类项目。一个说：「它完美无缺！」另一个说：「它大多数时候是对的，但对油腻的纸类比较吃力，所以那些会由人再看一遍。」你更信任哪个团队？为什么？",
            context: "一场坦白说明局限和监督的展示，比一句夸下海口的断言更能赢得信任。",
          },
          predictionPrompt: {
            prompt: "预测一下：最出色的项目，会是那些声称从不出错的，还是那些清楚说明自身局限、以及由谁在把关的？",
            howToCheck: "边读边留意：为什么说出局限和监督，会让一个项目更值得信任，而不是更不值得。",
          },
          concepts: [
            {
              title: "诚实地展示：问题、设计、测试和局限",
              body: [
                "一场有力的展示会讲出一个清晰的故事：这是用户需求和问题界定，这是我的设计（输入、输出、特征、标签、规则），这是我怎么测试的，这是我的发现，包括它的局限。说出局限不是示弱，它说明你真正理解自己的系统。",
                "别夸下海口。「它完美无缺」几乎从来不是真的，一旦有人发现一处失败，信任就会迅速崩塌。「它大多数情况都对，但在某某上比较吃力」既诚实，也正是有思考力的听众想听的。",
              ],
              examples: [
                "「输入：一件物品的照片。输出：可回收、堆肥或其他垃圾。」",
                "「9 个测试用例中通过了 7 个；它在油腻的纸类和发亮的铝箔上会失败。」",
                "「因为它可能出错，所以那些拿不准的情况由人来复核。」",
              ],
            },
            {
              title: "监督和负责任的使用让项目值得信任",
              body: [
                "因为人工智能可能出错或不公平，一个负责任的项目会为人的监督做好安排：由一个人持续负责检查并纠正人工智能，尤其是在出错会造成影响的地方。你的展示应当说明谁在监督这个系统，以及什么时候监督。",
                "负责任的使用还意味着保持公平、如实说明系统能做什么、保护人们的隐私，以及在风险过高的地方不使用人工智能。把整门课程串起来：公平、隐私、局限和人的决定，都会体现在一个项目被设计和被描述得有多负责任上。",
              ],
              examples: [
                "「凡是分类器拿不准的物品，都由一名学生在丢弃前复核。」",
                "「我们不收集任何人的姓名或面部，只收集物品的照片。」",
                "「我们绝不会用它来决定关于某个人的重大事项。」",
              ],
            },
            {
              title: "反馈具体又善意时，评议最有效；而人工智能也是一份职业",
              body: [
                "在评议中，你既给出反馈也接受反馈。有用的反馈是具体的（「你那个油腻纸类的测试用例抓得真好；能不能为它加一条规则？」），而不是含糊的（「挺好的」）或刻薄的。好好接受反馈，意味着倾听、提问，并把它当作帮助而不是攻击。迭代在这里继续：评议常常会激发你的下一次改进。",
                "构建人工智能也是一个不断成长的行业。机器学习工程师和数据科学家构建并训练模型。数据标注员制作系统学习所依据的带标签样例。人工智能伦理研究者、审计人员和政策制定者治理人工智能：检查它的公平性、安全性和隐私保护，并制定它可以如何被使用的规则。产品设计师和用户体验设计师决定人们实际如何与人工智能互动、如何保持掌控。教师、医生、艺术家以及许多其他人，也越来越多地把人工智能当作工具来用。你不必是程序员，也能影响人工智能被怎样构建和使用。",
              ],
              examples: [
                "机器学习工程师：构建并训练模型。",
                "数据标注员：制作供学习使用的带标签样例。",
                "人工智能伦理研究者或审计人员：检查系统的公平性、安全性和隐私保护。",
                "产品或用户体验设计师：设计人们如何使用人工智能并保持监督。",
              ],
            },
          ],
          workedExample: {
            title: "一场值得信任的两分钟展示",
            steps: [
              "说明问题：「新生分不清自己的垃圾该进哪个桶，所以我们根据一张照片把它分成可回收、堆肥或其他垃圾。」",
              "展示设计：「输入是一件物品的照片；输出是三个标签之一；特征包括材质和食物油渍。」",
              "汇报测试：「我们跑了九个测试用例，通过了七个；它在油腻的纸类和铝箔上会失败。」",
              "说出局限和监督：「这些是真实的局限，所以凡是它拿不准的物品，都由人在丢弃前复核。」",
              "以负责任的使用收尾：「我们只收集物品照片，绝不收集面部或姓名，也不会把它用在任何高风险的事情上。」",
            ],
            takeaway: "最值得信任的展示，会说明问题、设计、诚实的测试结果、局限，以及那份让使用保持负责任的人的监督。",
          },
          visuals: [
            {
              title: "夸下海口与诚实展示的对比",
              summary: "之前（夸下海口）：「我们的人工智能能完美地分类垃圾！」没有局限，没有监督，一旦有人发现失败就会失去信任。之后（诚实）：「它在大多数情况下都能通过，但在油腻的纸类和铝箔上会失败，所以拿不准的物品由人复核，而且我们只使用物品照片。」它说明了局限、监督和负责任的使用，也赢得了更多信任。",
              caption: "对局限和监督保持诚实，会让一个项目更值得信任，而不是更不值得。",
            },
            {
              title: "谁在构建和治理人工智能",
              summary: "一张人工智能职业表。机器学习工程师：构建并训练模型；核心技能是设计并测试系统。数据标注员：制作带标签的样例；核心技能是细致、一致地标注。人工智能伦理研究者或审计人员：在公平性、安全性和隐私方面治理人工智能；核心技能是发现危害并制定规则。产品或用户体验设计师：设计人们如何使用人工智能并保持监督；核心技能是理解用户。",
              table: {
                columns: [
                  "角色",
                  "他们做什么",
                  "他们用到的一项技能",
                ],
                rows: [
                  [
                    "机器学习工程师",
                    "构建并训练模型",
                    "设计并测试系统",
                  ],
                  [
                    "数据标注员",
                    "制作带标签的样例",
                    "细致、一致地标注",
                  ],
                  [
                    "人工智能伦理研究者或审计人员",
                    "在公平与安全方面治理人工智能",
                    "发现危害、制定规则",
                  ],
                  [
                    "产品或用户体验设计师",
                    "设计人们如何使用人工智能",
                    "理解真实的用户",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "展示与评议工作室",
            goal: "诚实地展示你的项目，并借助一份评议量表给出并接受具体、有用的反馈。",
            overview: "你要准备一场简短而诚实的项目展示，涵盖问题、设计、测试、局限、监督和负责任的使用，然后参加评议，用一份共享清单给其他团队具体又善意的反馈，也接受他们的反馈。这里的评议，可能会在最终项目之前再激发一次迭代。",
            steps: [
              "准备一场两分钟的展示，涵盖问题、设计、测试结果、局限、监督和负责任的使用。",
              "向一位同伴或一个小组做展示。",
              "作为评议者，用评议清单为每个项目至少给出两条具体又善意的反馈。",
              "作为展示者，记下你收到的反馈，并挑出一项要做的改进（你的下一次迭代）。",
              "讨论每个项目与哪些人工智能职业相关，以及你们对哪些感兴趣。",
            ],
            materials: [
              "纸和笔，或者一个记事应用",
            ],
            successCriteria: [
              "一场包含局限、监督和负责任使用的展示，而不只是讲哪些地方管用。",
              "至少给别人两条具体又善意的反馈。",
              "收到的反馈被记录下来，并挑出了下一项改进。",
              "至少说出一个与你的项目相关的人工智能职业。",
            ],
            dataset: {
              name: "项目评议量表",
              description: "一份内置的评议清单，供各团队用来给反馈。各行涵盖：清晰的问题界定；合理的输入、输出、标签和特征；诚实的测试结果；写明的局限；一份人的监督方案；以及负责任的使用（公平、隐私、诚实）。每一行都有一个提示，以及写具体评语的空位。",
              columns: [
                "评议方面",
                "要看什么",
                "具体评语",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "检验你能否负责任地展示，并描述真实的人工智能工作。",
            questions: [
              {
                prompt: "项目展示为什么应当包含它的局限？",
                explanation: "如实说出局限能建立信任，也表明你理解自己的系统；把局限藏起来，一旦有人发现失败就会适得其反。",
                choices: [
                  {
                    text: "为了让项目显得弱一点，好让没人来提问",
                    explanation: "说出局限不是为了显得弱；它体现的是理解和诚实。",
                  },
                  {
                    text: "因为对局限保持诚实能建立信任，也表明你理解这个系统",
                    explanation: "正确：诚实的局限能赢得信任，也证明你了解自己的系统表现如何。",
                  },
                  {
                    text: "因为每个项目都必须失败",
                    explanation: "项目并不是必须失败；而是必须对真实的局限保持诚实。",
                  },
                  {
                    text: "这样你就不用去测试了",
                    explanation: "局限恰恰是通过测试才发现的；说出它们并不能代替测试。",
                  },
                ],
              },
              {
                prompt: "判断这句话是对还是错。",
                statement: "你必须是计算机程序员，才能在构建或治理人工智能中扮演任何角色。",
                explanation: "错：数据标注员、伦理研究者、审计人员、政策制定者和设计师，都在塑造人工智能，却未必要去编程。",
              },
              {
                prompt: "哪一种回应给出的评议反馈最有用？",
                scenario: "一位同学展示了一个植物病害检测器，它通过了大部分测试，但没有用模糊照片测试过，而且也没有安排谁来复核它的判断。",
                explanation: "具体的反馈会指出一处真实的缺口，并建议一个明确的下一步，这不同于含糊的夸奖或刻薄的否定。",
                choices: [
                  {
                    text: "「挺好的。」",
                    explanation: "含糊的夸奖，让展示者无从下手。",
                  },
                  {
                    text: "「加一个模糊照片的测试用例，并说明谁来监督那些拿不准的结果。」",
                    explanation: "正确：它具体、善意，并指向了明确的下一步迭代。",
                  },
                  {
                    text: "「这永远做不成，别费劲了。」",
                    explanation: "既刻薄又含糊：它不具体，也帮不了这个项目变好。",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "认识一份人工智能工作",
            prompt: "去了解一种人工智能职业，并把它和你这周设计的项目联系起来。",
            steps: [
              "挑一个角色：机器学习工程师、数据标注员、人工智能伦理研究者或审计人员、政策制定者，或者人工智能产品与用户体验设计师。",
              "写三到四句话，说明这个人日常在做什么，以及他用到的一项技能。",
              "说明你自己的项目里，哪一部分会由这个角色来负责。",
              "记下关于这份工作，你还想进一步了解的一件事。",
            ],
            successCriteria: [
              "准确描述了一个人工智能角色，并写出它用到的一项技能。",
              "这个角色与你项目某一部分之间有清晰的联系。",
              "你对那份职业提出了一个真诚的问题。",
            ],
          },
          reflection: [
            {
              prompt: "纵观整门课程，关于负责任地使用人工智能，你最会记住的一点是什么？",
            },
            {
              prompt: "哪一种人工智能职业让你最感兴趣？为了去探索它，你接下来想学些什么？",
            },
          ],
          recap: {
            summary: "一个完成的项目会被诚实地展示出来，包括问题、设计、测试、局限、监督和负责任的使用，会通过评议得到改进，也会与那些真正构建和治理人工智能的人联系起来。",
            keyPoints: [
              "展示问题、设计和诚实的测试结果，包括其中的局限。",
              "规划好人的监督和负责任的使用，好让这个项目值得信任。",
              "构建和治理人工智能的角色有很多，不只是程序员。",
            ],
          },
          extension: {
            title: "为你的项目写一份「负责任使用」说明",
            body: [
              "现在有些人工智能系统会随附一份简短的「模型卡」或使用说明：这个系统是做什么用的、不该用来做什么、它已知的局限，以及由谁负责监督它。",
              "为你自己的项目写一段负责任使用说明。写明它应该和不应该被用来做什么、它的主要局限、由谁提供监督，以及它如何保护人们的隐私。",
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
  finalProject: {
    title: "Estúdio de Design de IA: projete uma IA que ajude",
    overview: "Usando tudo o que você aprendeu ao longo das seis semanas, projete uma ferramenta de IA que ajude um grupo real de pessoas. Você vai definir o problema, decidir se a IA realmente serve, planejar as entradas, as saídas, os rótulos, as características ou as regras, esboçar um protótipo, escrever casos de teste e explicar como manteria tudo justo, privado e sob supervisão humana. Este é um projeto de design e planejamento: você não vai treinar um modelo de verdade.",
    choices: [
      {
        name: "Organizador útil",
        scenario: "Um grupo tem dificuldade para separar muitos itens rapidamente, como uma biblioteca organizando livros devolvidos ou um clube organizando fotos.",
        exampleGoal: "Projete uma IA que separe itens nas categorias certas.",
        suitableBecause: "Classificar a partir de muitos exemplos rotulados combina bem com aprendizado de máquina.",
      },
      {
        name: "Ajudante de perguntas",
        scenario: "As pessoas fazem sempre as mesmas perguntas e uma equipe pequena não dá conta, como a secretaria de uma escola ou o suporte de um jogo.",
        exampleGoal: "Projete um ajudante baseado em regras que responda às perguntas mais comuns e passe o resto para uma pessoa.",
        suitableBecause: "Perguntas comuns com intenções claras combinam com um chatbot de árvore de decisão que recorre a um humano quando trava.",
      },
      {
        name: "Recomendador justo",
        scenario: "Uma comunidade quer sugestões (livros, atividades ou receitas) sem prender as pessoas numa bolha de filtros.",
        exampleGoal: "Projete um recomendador que sugira opções novas e explique o porquê.",
        suitableBecause: "As recomendações usam semelhança e retorno das pessoas, e deixam você praticar como evitar bolhas de filtros.",
      },
      {
        name: "Sua própria ideia",
        scenario: "Você tem um problema na sua escola ou comunidade com o qual acha que a IA poderia ajudar.",
        exampleGoal: "Defina seu próprio problema e projete uma IA (ou decida que a IA não é a ferramenta certa).",
        suitableBecause: "Decidir se a IA sequer serve já faz parte de um bom design.",
      },
    ],
    brief: [
      {
        label: "Necessidade da pessoa usuária",
        hint: "Para quem é isso, e que problema essa pessoa tem?",
      },
      {
        label: "Definição do problema",
        hint: "Enuncie a tarefa exata em uma ou duas frases.",
      },
      {
        label: "A IA é a ferramenta certa?",
        hint: "Explique por que a IA serve, ou por que uma ferramenta mais simples seria melhor.",
      },
      {
        label: "Entradas e saídas",
        hint: "O que entra e o que sai?",
      },
      {
        label: "Rótulos, características ou regras",
        hint: "De quais exemplos, rótulos e características ela aprenderia, ou que regras seguiria?",
      },
      {
        label: "Esboço do protótipo",
        hint: "Descreva ou desenhe como uma pessoa usaria isso.",
      },
      {
        label: "Casos de teste",
        hint: "Liste exemplos que você testaria, incluindo casos extremos complicados.",
      },
      {
        label: "Limitações",
        hint: "Onde ela poderia errar ou ser injusta?",
      },
      {
        label: "Justiça, privacidade e supervisão",
        hint: "Como você vai proteger a privacidade, verificar a justiça e manter uma pessoa no comando? Como alguém pode recorrer de um resultado errado?",
      },
    ],
    requirements: [
      {
        label: "Necessidade clara da pessoa usuária",
        description: "Nomeia um grupo real de pessoas e o problema que elas enfrentam.",
      },
      {
        label: "Decisão sobre a adequação da IA",
        description: "Argumenta se a IA é a ferramenta certa, usando as ideias de entrada e saída e de regras versus aprendizado.",
      },
      {
        label: "Entradas e saídas projetadas",
        description: "Define as entradas e as saídas, além dos rótulos e características ou das regras envolvidas.",
      },
      {
        label: "Protótipo e casos de teste",
        description: "Inclui um esboço do protótipo e pelo menos três casos de teste, sendo um deles um caso extremo.",
      },
      {
        label: "Plano de uso responsável",
        description: "Trata de justiça, privacidade, limitações, supervisão humana e recursos.",
      },
      {
        label: "Apresentação clara",
        description: "Explica o projeto de um jeito que outra pessoa consiga entender e questionar.",
      },
      {
        label: "Nota de iteração (desafio extra)",
        description: "Descreve uma mudança que você faria depois de testar.",
      },
    ],
    rubric: [
      {
        name: "Problema e adequação",
        description: "O quanto o problema está bem definido e se a IA é a ferramenta certa.",
        levels: [
          {
            descriptor: "O problema é vago e não há raciocínio sobre se a IA serve.",
          },
          {
            descriptor: "O problema está enunciado, mas o raciocínio sobre a adequação da IA é raso.",
          },
          {
            descriptor: "Problema claro e um bom argumento sobre se a IA é a ferramenta certa.",
          },
          {
            descriptor: "Definição do problema bem afiada, com uma decisão de adequação convincente e bem fundamentada.",
          },
        ],
      },
      {
        name: "Entradas, saídas e dados",
        description: "Qualidade do projeto de entradas e saídas e dos rótulos e características ou regras.",
        levels: [
          {
            descriptor: "As entradas e saídas estão faltando ou não estão claras.",
          },
          {
            descriptor: "As entradas e saídas estão nomeadas, mas os rótulos e características ou as regras não estão claros.",
          },
          {
            descriptor: "Entradas e saídas claras, e um plano sensato de rótulos e características ou regras.",
          },
          {
            descriptor: "Um projeto cuidadoso e bem ajustado, com rótulos, características ou regras realistas.",
          },
        ],
      },
      {
        name: "Protótipo e testes",
        description: "O esboço do protótipo e a qualidade dos casos de teste.",
        levels: [
          {
            descriptor: "Sem protótipo nem casos de teste.",
          },
          {
            descriptor: "Um protótipo básico com um ou dois testes simples.",
          },
          {
            descriptor: "Um protótipo claro com pelo menos três testes, incluindo um caso extremo.",
          },
          {
            descriptor: "Um protótipo bem explicado, com testes fortes que investigam as falhas mais prováveis.",
          },
        ],
      },
      {
        name: "Responsabilidade e apresentação",
        description: "Justiça, privacidade, supervisão, recursos e clareza da apresentação.",
        levels: [
          {
            descriptor: "Ignora justiça, privacidade ou supervisão, e é difícil de acompanhar.",
          },
          {
            descriptor: "Menciona a responsabilidade, mas deixa lacunas, ou a apresentação não está clara.",
          },
          {
            descriptor: "Trata com clareza de justiça, privacidade, supervisão e recursos.",
          },
          {
            descriptor: "Plano de uso responsável completo, apresentado com clareza e aberto a perguntas.",
          },
        ],
      },
    ],
  },
  finalAssessment: {
    title: "Revisão do curso: o que você aprendeu sobre IA",
    instructions: "Uma revisão curta das seis semanas. Responda cada pergunta e leia a explicação. Isto é para o seu próprio aprendizado: não há notas e nada é enviado para lugar nenhum.",
    questions: [
      {
        prompt: "Qual é o sinal mais claro de que um programa é IA, e não um programa tradicional?",
        explanation: "A IA aprende padrões a partir de muitos exemplos, em vez de apenas seguir regras que uma pessoa escreveu à mão.",
        choices: [
          {
            text: "Ele aprendeu padrões a partir de exemplos.",
            explanation: "Correto: aprender com exemplos é o sinal principal da IA.",
          },
          {
            text: "Ele roda rápido.",
            explanation: "A velocidade não decide se um programa é IA.",
          },
          {
            text: "Ele tem uma interface bonita.",
            explanation: "A interface não diz nada sobre se ele aprende.",
          },
          {
            text: "Ele roda num computador.",
            explanation: "Todo software roda num computador.",
          },
        ],
      },
      {
        prompt: "Decida se a afirmação é verdadeira ou falsa.",
        statement: "Um conjunto de dados com muito mais exemplos de uma categoria do que de outra está desequilibrado e pode deixar um modelo menos justo.",
        explanation: "Verdadeiro: dados desequilibrados fazem o modelo ver poucos casos de alguns tipos, e ele pode ir pior com eles.",
      },
      {
        prompt: "Por que testamos um modelo com dados nos quais ele não treinou?",
        explanation: "Testar com exemplos inéditos verifica se o modelo generaliza, em vez de apenas decorar os dados de treino.",
        choices: [
          {
            text: "Para ver se ele generaliza para exemplos novos.",
            explanation: "Correto: dados de teste inéditos mostram o desempenho real.",
          },
          {
            text: "Para deixar o treino mais rápido.",
            explanation: "Testar é uma coisa separada da velocidade do treino.",
          },
          {
            text: "Para gastar os dados que sobraram.",
            explanation: "Os dados de teste têm uma finalidade: medir a generalização.",
          },
          {
            text: "Porque os dados de treino estão sempre errados.",
            explanation: "Os dados de treino nem sempre estão errados; nós só precisamos de um teste justo.",
          },
        ],
      },
      {
        prompt: "Um classificador de fotos rotula a imagem de um muffin como cachorro. Que tipo de erro é esse?",
        scenario: "O modelo previu \"cachorro\" para uma coisa que não é cachorro.",
        explanation: "Prever \"cachorro\" quando não é cachorro é um falso positivo da categoria cachorro.",
        choices: [
          {
            text: "Um falso positivo de \"cachorro\".",
            explanation: "Correto: ele disse por engano que havia um \"cachorro\".",
          },
          {
            text: "Um falso negativo de \"cachorro\".",
            explanation: "Um falso negativo seria deixar passar um cachorro de verdade.",
          },
          {
            text: "Acurácia perfeita.",
            explanation: "Ele errou, então a acurácia não é perfeita.",
          },
          {
            text: "Um erro de entrada.",
            explanation: "A imagem era válida; o que estava errado era a previsão do modelo.",
          },
        ],
      },
      {
        prompt: "Decida se a afirmação é verdadeira ou falsa.",
        statement: "Se a resposta de um modelo de linguagem soa fluente e confiante, ela tem que ser verdadeira.",
        explanation: "Falso: modelos de linguagem preveem qual texto vem a seguir, então uma resposta fluente ainda pode estar errada. Sempre confira os fatos.",
      },
      {
        prompt: "O que é uma bolha de filtros?",
        explanation: "Uma bolha de filtros é quando as recomendações continuam mostrando coisas parecidas, então você quase nunca vê opções novas ou diferentes.",
        choices: [
          {
            text: "Quando as recomendações continuam mostrando coisas parecidas e escondem as diferentes.",
            explanation: "Correto: esse estreitamento é uma bolha de filtros.",
          },
          {
            text: "Uma ferramenta que limpa dados.",
            explanation: "Não é isso que bolha de filtros significa.",
          },
          {
            text: "Uma configuração de privacidade.",
            explanation: "Uma bolha de filtros tem a ver com recomendações que se estreitam, não com uma configuração.",
          },
          {
            text: "Um tipo de filtro de câmera.",
            explanation: "É sobre recomendações, não sobre filtros de foto.",
          },
        ],
      },
      {
        prompt: "Quais destas são boas formas de usar a IA com responsabilidade? (Escolha todas que valem.)",
        explanation: "Uso responsável inclui coletar o mínimo de dados, conferir as fontes, ficar de olho no viés e manter a supervisão humana com um caminho para recorrer.",
        choices: [
          {
            text: "Coletar só os dados de que você realmente precisa.",
            explanation: "Correto: coletar o mínimo de dados protege a privacidade.",
          },
          {
            text: "Conferir a fonte original antes de confiar em conteúdo de IA.",
            explanation: "Correto: a confirmação independente pega a desinformação.",
          },
          {
            text: "Deixar a IA tomar decisões importantes sem revisão humana.",
            explanation: "Decisões importantes precisam de supervisão humana e de um caminho para recorrer.",
          },
          {
            text: "Ficar de olho no viés e em resultados injustos para certos grupos.",
            explanation: "Correto: verificar a justiça entre grupos é uso responsável.",
          },
        ],
      },
      {
        prompt: "Coloque numa ordem sensata as etapas de projetar uma ferramenta de IA.",
        explanation: "Um bom projeto parte da necessidade da pessoa usuária e do problema, decide se a IA serve, projeta as entradas e saídas, cria o protótipo e depois testa e melhora.",
        items: [
          {
            text: "Definir a necessidade da pessoa usuária e o problema",
          },
          {
            text: "Decidir se a IA é a ferramenta certa",
          },
          {
            text: "Projetar as entradas, as saídas e os rótulos e características ou regras",
          },
          {
            text: "Criar o protótipo, e depois testar e melhorar",
          },
        ],
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
    {
      title: "Justiça, privacidade e informação confiável",
      subtitle: "Audite a IA em busca de vieses, proteja os dados das pessoas e verifique se dá para confiar no conteúdo que você vê.",
      summary: "Os alunos aprendem a julgar a IA com responsabilidade: como dados desiguais criam viés e como os resultados por grupo o revelam; por que privacidade e consentimento importam e como a minimização de dados reduz o risco; e como verificar conteúdo feito por IA e conteúdo on-line achando a fonte original, conferindo o contexto e confirmando de forma independente, tudo isso mantendo as pessoas no comando por meio da supervisão e do direito de recurso.",
      bigQuestion: "Como saber se um sistema de IA é justo, respeita a privacidade e nos dá informação em que podemos confiar?",
      estimatedTime: "2,5-3 horas",
      objectives: [
        "Explicar como o viés vem de uma representação desigual e ler resultados por grupo para detectá-lo.",
        "Definir privacidade, dados pessoais e consentimento, e aplicar a minimização de dados a um recurso.",
        "Verificar conteúdo usando a fonte original, o contexto e a confirmação independente.",
        "Explicar por que decisões importantes de uma IA precisam de supervisão humana e de direito de recurso.",
      ],
      requiredConcepts: [
        "Viés",
        "Representação",
        "Resultado por grupo",
        "Justiça",
        "Privacidade",
        "Consentimento",
        "Dados pessoais",
        "Minimização de dados",
        "Deepfake",
        "Desinformação",
        "Fonte original",
        "Contexto",
        "Confirmação independente",
        "Supervisão humana",
        "Recurso",
      ],
      lessons: [
        {
          title: "Audite um conjunto de dados em busca de justiça",
          summary: "Aprenda como exemplos desiguais criam viés, leia resultados por grupo para ver para quem um sistema funciona bem, e audite um conjunto de dados em busca de justiça.",
          estimatedTime: "50-60 minutos",
          objectives: [
            {
              text: "Definir viés e representação e explicar como eles se conectam.",
            },
            {
              text: "Ler um resultado por grupo para comparar o quanto um sistema funciona bem para grupos diferentes.",
            },
            {
              text: "Explicar o que significa justiça quando uma IA trata grupos de forma diferente.",
            },
            {
              text: "Auditar um conjunto de dados descrito e apontar um jeito em que os exemplos dele estão desequilibrados.",
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
              term: "Viés",
              definition: "Quando um sistema funciona sistematicamente melhor ou pior para algumas pessoas ou coisas do que para outras, normalmente por causa dos exemplos com que ele aprendeu.",
            },
            {
              term: "Representação",
              definition: "O quanto um grupo aparece em um conjunto de dados. Um grupo está bem representado se tem muitos exemplos, e sub-representado se tem poucos.",
            },
            {
              term: "Resultado por grupo",
              definition: "Uma nota medida separadamente para cada grupo, em vez de um único número para todo mundo, para você ver para quem o sistema funciona bem.",
            },
            {
              term: "Justiça",
              definition: "Tratar os grupos de um jeito que as pessoas considerariam parelho e razoável, para que nenhum grupo fique em desvantagem sem um bom motivo.",
            },
          ],
          openingScenario: {
            prompt: "Um assistente de voz entende um amigo quase sempre, mas vive entendendo errado outro amigo que tem um sotaque diferente. O software é o mesmo para os dois. Por que ele funcionaria de forma tão diferente para cada um?",
            context: "Guarde o seu primeiro palpite: mais adiante na aula você vai testá-lo contra números reais por grupo.",
          },
          predictionPrompt: {
            prompt: "Preveja: se um sistema de reconhecimento facial aprendeu principalmente com fotos de adultos, você acha que ele vai funcionar igualmente bem com fotos de crianças?",
            howToCheck: "Enquanto lê os conceitos e o gráfico por grupo abaixo, repare se a quantidade de exemplos de um grupo muda o quanto o sistema funciona bem para aquele grupo.",
          },
          concepts: [
            {
              title: "O viés vem dos exemplos, e não de o computador \"querer\" alguma coisa",
              body: [
                "Um computador não tem opiniões nem sentimentos. Quando dizemos que uma IA tem viés, queremos dizer que ela funciona sistematicamente melhor para algumas pessoas ou coisas do que para outras. Quase sempre isso acontece por causa dos exemplos com que ela aprendeu.",
                "Se um sistema aprende com exemplos desiguais, ele fica bom nos casos comuns e mais fraco nos raros. O software está fazendo exatamente aquilo para o que foi treinado: a desigualdade veio dos dados que as pessoas deram a ele.",
              ],
              examples: [
                "Um sistema de fala treinado principalmente com um sotaque entende melhor aquele sotaque.",
                "Um classificador de fotos treinado principalmente com imagens diurnas tem dificuldade à noite.",
                "Uma ferramenta de tradução treinada com escrita formal lida mal com gírias.",
              ],
            },
            {
              title: "Representação: quem aparece nos exemplos, e o quanto",
              body: [
                "Representação tem a ver com o quanto cada grupo aparece nos dados. Um grupo está bem representado quando tem muitos exemplos e sub-representado quando tem poucos. Um conjunto de dados pode ter milhares de exemplos e ainda assim deixar alguns grupos com quase nenhum.",
                "A sub-representação é uma das maiores fontes de viés. Um modelo só consegue aprender padrões que ele viu. Se um grupo quase não aparece nos exemplos, o modelo tem pouco com que aprender, então tende a errar mais para aquele grupo.",
              ],
              examples: [
                "Um conjunto de 10.000 fotos de cachorros com apenas 20 fotos de uma raça.",
                "Um conjunto de dados médicos coletado principalmente com adultos, com poucas crianças.",
                "Um conjunto de escrita à mão com muita letra de forma e pouquíssima letra cursiva.",
              ],
            },
            {
              title: "Os resultados por grupo mostram o que uma nota geral esconde",
              body: [
                "É tentador julgar um sistema por um único número, como \"ele tem 92 por cento de acurácia\". Mas um único número é uma média de todo mundo. Ele pode parecer ótimo e mesmo assim falhar feio para um grupo menor, cujos erros ficam enterrados na média.",
                "Um resultado por grupo mede a acurácia separadamente para cada grupo. Quando você abre a nota, dá para ver para quem o sistema funciona bem e para quem funciona mal. Perguntas sobre justiça quase sempre precisam de resultados por grupo, e não só de um número geral.",
              ],
              examples: [
                "92 por cento no geral, mas só 74 por cento para um grupo de sotaque.",
                "Acurácia geral alta, mas muito mais erros em fotos noturnas do que em fotos diurnas.",
                "Um teste que passa na média, mas falha com frequência para quem escreve com a mão esquerda.",
              ],
            },
            {
              title: "Justiça: alguém está ficando em desvantagem sem um bom motivo?",
              body: [
                "Justiça significa tratar os grupos de um jeito que as pessoas considerariam parelho e razoável. Nem sempre isso exige resultados idênticos, mas exige perguntar se algum grupo está ficando em desvantagem, e se há um bom motivo para essa diferença.",
                "Justiça é um julgamento humano, não algo que o computador decide. São as pessoas que precisam olhar os resultados por grupo, decidir se uma diferença é aceitável e assumir a responsabilidade de corrigi-la, muitas vezes reunindo exemplos mais equilibrados.",
              ],
              examples: [
                "Decidir que uma diferença de 74 por cento contra 92 por cento de acurácia é grande demais para lançar.",
                "Escolher reunir mais exemplos dos grupos sub-representados.",
                "Perguntar quem é prejudicado se o sistema errar com um grupo específico.",
              ],
            },
          ],
          workedExample: {
            title: "Auditando o conjunto de dados de um detector de sorrisos",
            steps: [
              "Diga qual é a tarefa. Um aplicativo de câmera tenta bater a foto quando todo mundo está sorrindo. Entrada: um rosto. Saída: \"sorrindo\" ou \"não sorrindo\".",
              "Olhe a representação. O conjunto de treinamento tem 8.000 fotos de adultos e apenas 500 fotos de crianças pequenas.",
              "Preveja o efeito. Com tão poucos exemplos de crianças, o modelo tem pouco com que aprender sobre como as crianças sorriem, então provavelmente vai errar mais com elas.",
              "Confira o resultado por grupo, e não só a média. A acurácia geral é de 90 por cento, mas, aberta por grupo, é 94 por cento para adultos e 71 por cento para crianças.",
              "Tome a decisão sobre justiça. A diferença é grande e as crianças ficam em desvantagem sem um bom motivo, então o conserto justo é reunir mais exemplos de crianças e testar de novo antes de lançar.",
            ],
            takeaway: "Audite um conjunto de dados perguntando quem está sub-representado, e depois confira os resultados por grupo para ver se essa desigualdade virou erros injustos.",
          },
          visuals: [
            {
              title: "Acurácia por grupo: uma média esconde uma diferença real",
              summary: "Um gráfico de barras da acurácia de um sistema de reconhecimento de fala, medida separadamente para quatro grupos de sotaque, em porcentagem. A média geral é 88 por cento, mas os grupos são desiguais: grupo de sotaque A, 94 por cento; grupo de sotaque B, 91 por cento; grupo de sotaque C, 82 por cento; e grupo de sotaque D, 74 por cento. Os grupos C e D, que tiveram menos exemplos de treinamento, ficam bem abaixo da média, então o número geral sozinho esconde uma diferença real de cerca de 20 pontos entre o melhor e o pior grupo.",
              caption: "Abra a média e fica claro que o sistema funciona melhor para alguns grupos do que para outros.",
              chart: {
                unit: "% de acurácia",
                bars: [
                  {
                    label: "Média geral",
                  },
                  {
                    label: "Grupo de sotaque A",
                  },
                  {
                    label: "Grupo de sotaque B",
                  },
                  {
                    label: "Grupo de sotaque C",
                  },
                  {
                    label: "Grupo de sotaque D",
                  },
                ],
              },
            },
            {
              title: "A representação bate com a diferença de acurácia",
              summary: "Uma tabela ligando quantos exemplos de treinamento cada grupo de sotaque teve à acurácia dele. Grupo A: 5.000 exemplos, 94 por cento de acurácia. Grupo B: 4.200 exemplos, 91 por cento. Grupo C: 900 exemplos, 82 por cento. Grupo D: 400 exemplos, 74 por cento. Os grupos com menos exemplos têm a menor acurácia, mostrando como a sub-representação vira viés.",
              table: {
                columns: [
                  "Grupo de sotaque",
                  "Exemplos de treinamento",
                  "Acurácia",
                ],
              },
            },
          ],
          activity: {
            title: "Auditoria de justiça",
            goal: "Auditar o recomendador de programas de ciência e tecnologia de uma escola fictícia: ver como uma acurácia geral esconde um resultado fraco para um grupo menor, e depois corrigir isso limitando uma característica substituta e acrescentando exemplos sub-representados.",
            overview: "Uma escola inventada recomenda programas extracurriculares de ciência e tecnologia. Um modelo transparente de vizinhos mais próximos prevê se o programa combina; você compara a acurácia geral com a acurácia de cada grupo (Hillside e o menor e mais distante Riverside). O modelo defeituoso depende demais de uma característica substituta enganosa, \"mora perto do campus\", que reflete o bairro e não a afinidade, e ainda foi treinado com pouquíssimos exemplos de bom encaixe de Riverside. Reduza o peso dessa característica substituta e acrescente os exemplos que faltam, depois rode de novo e compare com a versão defeituosa. Tudo é fictício e determinístico; melhorar a representação ajuda, mas nunca garante justiça perfeita.",
            steps: [
              "Leia a acurácia geral e depois a acurácia de cada grupo; repare na diferença.",
              "Reduza o peso da característica substituta enganosa \"perto do campus\".",
              "Acrescente os exemplos de bom encaixe que faltam do grupo sub-representado de Riverside.",
              "Rode de novo e compare a acurácia por grupo, as aprovações erradas e os alunos que ficaram de fora, antes e depois.",
            ],
            materials: [
              "A auditoria de justiça já incluída nesta atividade",
            ],
            successCriteria: [
              "A diferença por grupo escondida pelo número geral é identificada.",
              "A característica substituta é limitada e exemplos sub-representados são acrescentados.",
              "A acurácia por grupo de antes e depois é comparada, notando que a justiça melhorou mas não está garantida.",
            ],
            dataset: {
              name: "Conjunto de auditoria do recomendador de programas de ciência e tecnologia",
              description: "Um conjunto de dados fictício e determinístico para o recomendador de programas de ciência e tecnologia de uma escola: registros de alunos com um rótulo de grupo (Hillside/Riverside), características relevantes, uma característica substituta enganosa de \"perto do campus\", representação desigual entre grupos e um conjunto de teste guardado. Sem dados reais ou pessoais.",
              columns: [
                "Grupo",
                "Características",
                "Característica substituta",
                "Bom encaixe?",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responda a estas perguntas para conferir se você sabe perceber viés, ler resultados por grupo e julgar justiça.",
            questions: [
              {
                prompt: "De onde o viés em um sistema de IA vem com mais frequência?",
                explanation: "Um computador não tem opiniões; o viés quase sempre é rastreado até exemplos desiguais nos dados de treinamento.",
                choices: [
                  {
                    text: "O computador decide que não gosta de um grupo.",
                    explanation: "Software não gosta nem desgosta de nada; ele só reflete padrões dos dados dele.",
                  },
                  {
                    text: "Os exemplos com que ele aprendeu eram desiguais, então ele aprendeu alguns grupos melhor que outros.",
                    explanation: "Correto: representação desigual nos dados é a fonte mais comum de viés.",
                  },
                  {
                    text: "O computador é lento demais.",
                    explanation: "Velocidade não tem nada a ver com um sistema ter viés ou não.",
                  },
                  {
                    text: "Viés só acontece quando alguém invade o sistema.",
                    explanation: "O viés costuma vir de dados desiguais comuns, e não de invasão.",
                  },
                ],
              },
              {
                prompt: "Decida se a afirmação é verdadeira ou falsa.",
                statement: "Um único número de acurácia geral basta para provar que um sistema é justo com todos os grupos.",
                explanation: "Um único número é uma média que pode esconder resultados ruins para um grupo menor; para julgar justiça são necessários resultados por grupo.",
              },
              {
                prompt: "Com base nos resultados por grupo, qual é o próximo passo mais razoável?",
                scenario: "Um aplicativo de fotos informa 90 por cento de acurácia no geral. Aberta por grupo, ela é 95 por cento para adultos e 70 por cento para crianças. O conjunto de treinamento tinha pouquíssimas fotos de crianças.",
                explanation: "A nota baixa com crianças bate com os pouquíssimos exemplos de crianças, então o conserto justo é reunir mais exemplos de crianças e testar de novo.",
                choices: [
                  {
                    text: "Lançar, porque 90 por cento no geral já é bom o bastante.",
                    explanation: "A média de 90 por cento esconde que o sistema funciona mal com crianças.",
                  },
                  {
                    text: "Reunir mais fotos de crianças para equilibrar os dados, e depois testar de novo.",
                    explanation: "Correto: uma representação mais equilibrada ataca diretamente a causa da diferença.",
                  },
                  {
                    text: "Apagar as fotos de adultos para os números baterem.",
                    explanation: "Jogar fora dados bons não ajuda as crianças e enfraquece o sistema para todo mundo.",
                  },
                  {
                    text: "Nada, porque computadores não podem ter viés.",
                    explanation: "A diferença por grupo é prova clara de um viés que precisa ser resolvido.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Crie um conjunto de dados mais justo",
            prompt: "Escolha uma tarefa simples de IA e planeje um conjunto de dados que seria justo entre grupos, antes de treinar qualquer modelo.",
            steps: [
              "Escolha uma tarefa, como ler letra à mão ou reconhecer bichos de estimação.",
              "Liste os grupos para os quais o sistema deveria funcionar bem.",
              "Decida mais ou menos quantos exemplos cada grupo precisa para que nenhum fique sub-representado.",
              "Escreva como você conferiria o resultado com uma acurácia por grupo, e não só com uma média geral.",
            ],
            successCriteria: [
              "Pelo menos três grupos que o sistema deveria atender são nomeados.",
              "Um plano dá a cada grupo exemplos suficientes para evitar sub-representação.",
              "O plano confere a justiça usando resultados por grupo.",
            ],
          },
          reflection: [
            {
              prompt: "Pense em uma ferramenta que você usa e que talvez funcione melhor para algumas pessoas do que para outras. De quem podem estar faltando exemplos nos dados dela?",
            },
            {
              prompt: "Por que um sistema pode parecer justo quando você lê só a nota geral dele, e ser injusto quando você lê os resultados por grupo?",
            },
          ],
          recap: {
            summary: "O viés costuma vir de representação desigual, e só os resultados por grupo revelam se um sistema é justo com todos os grupos.",
            keyPoints: [
              "Viés significa que um sistema funciona sistematicamente melhor para alguns grupos do que para outros, normalmente por causa dos exemplos dele.",
              "Grupos sub-representados tendem a receber mais erros, porque o modelo viu menos deles.",
              "Uma única nota geral pode esconder uma diferença real; os resultados por grupo mostram para quem o sistema funciona.",
              "Justiça é um julgamento humano sobre se uma diferença é aceitável e como corrigi-la.",
            ],
          },
          extension: {
            title: "Quando acurácia igual ainda não é justiça",
            body: [
              "Às vezes dois grupos têm a mesma acurácia, mas os erros pesam mais para um deles. Imagine um sistema que marca livros da biblioteca como \"atrasados\". Uma marcação errada pode ser um aborrecimento pequeno para um grupo, mas impedir outro grupo de pegar livros emprestados.",
              "Escolha uma decisão que uma IA poderia tomar e descreva um caso em que acurácia igual entre grupos ainda leva a um resultado injusto, porque o custo de um erro não é igual. Que informação a mais você precisaria para perceber isso?",
            ],
          },
        },
        {
          title: "Proteja a privacidade e minimize os dados",
          summary: "Aprenda o que conta como dados pessoais, por que o consentimento importa, e como a minimização de dados mantém um recurso de IA funcionando coletando muito menos sobre as pessoas.",
          estimatedTime: "45-55 minutos",
          objectives: [
            {
              text: "Definir privacidade e dados pessoais e dar exemplos de cada um.",
            },
            {
              text: "Explicar o que significa consentimento e por que ele precisa ser informado.",
            },
            {
              text: "Aplicar a minimização de dados para ficar só com os dados de que um recurso realmente precisa.",
            },
            {
              text: "Redesenhar um recurso descrito para que ele colete menos dados pessoais.",
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
              term: "Privacidade",
              definition: "O direito de uma pessoa de controlar quem pode ver e usar informações sobre ela.",
            },
            {
              term: "Dados pessoais",
              definition: "Qualquer informação que seja sobre uma pessoa específica, como nome, endereço, localização exata, data de nascimento, foto ou mensagens.",
            },
            {
              term: "Consentimento",
              definition: "Uma pessoa concordar claramente que os dados dela sejam coletados ou usados, depois de lhe explicarem em linguagem simples o que vai acontecer com eles.",
            },
            {
              term: "Minimização de dados",
              definition: "Coletar e guardar só os dados de que um recurso realmente precisa para funcionar, e nada além disso.",
            },
          ],
          openingScenario: {
            prompt: "Um aplicativo de lanterna gratuito pede para ver os seus contatos, a sua localização exata e as suas fotos antes de acender a luz. Uma lanterna só precisa controlar a luz. Por que um aplicativo pediria muito mais dados do que a função dele exige?",
            context: "Guarde a sua resposta: no fim você vai conseguir redesenhar um recurso para ele parar de coletar demais.",
          },
          predictionPrompt: {
            prompt: "Preveja: para um aplicativo de previsão do tempo mostrar a previsão de hoje, o que basta: a sua cidade, ou o seu endereço exato e todo o seu histórico de localização?",
            howToCheck: "Enquanto lê sobre minimização de dados, decida qual é o menor dado que ainda permite ao recurso fazer o trabalho dele.",
          },
          concepts: [
            {
              title: "Privacidade e dados pessoais: o que precisa de proteção",
              body: [
                "Privacidade é o seu direito de controlar quem pode ver e usar informações sobre você. Dados pessoais são qualquer informação sobre uma pessoa específica: um nome, um endereço residencial, uma localização exata, uma data de nascimento, a foto de um rosto ou mensagens privadas.",
                "Nem todo dado é pessoal. \"Choveu na terça\" não é sobre ninguém em particular. Mas \"Ana estava no parque às 16h\" é dado pessoal, porque conta algo sobre uma pessoa específica. Recursos de IA muitas vezes funcionam com dados pessoais, e é justamente por isso que a privacidade importa aqui.",
              ],
              examples: [
                "Dados pessoais: nome completo, endereço residencial, localização GPS exata, foto de rosto.",
                "Normalmente não pessoais: o tempo agora, o horário de um ônibus público.",
                "Dados pessoais sensíveis: informações de saúde, mensagens privadas.",
              ],
            },
            {
              title: "Consentimento é um sim informado, não um sim escondido",
              body: [
                "Consentimento é a pessoa concordar claramente que os dados dela sejam coletados ou usados. Para o consentimento ser real, ele precisa ser informado: a pessoa é avisada, em linguagem simples, de quais dados são coletados e para que servem, e pode dizer não.",
                "Consentimento enterrado em letras miúdas, caixas já marcadas ou um pop-up confuso não é consentimento real, porque a pessoa nunca entendeu de verdade nem escolheu livremente. Um bom projeto pergunta com clareza e faz do \"não\" uma opção fácil e segura.",
              ],
              examples: [
                "Consentimento claro: \"Compartilhar a sua localização para mostrarmos os pontos próximos? Sim / Não.\"",
                "Não é consentimento real: um contrato longuíssimo que esconde o compartilhamento de dados no parágrafo 40.",
                "Não é consentimento real: um aplicativo que não funciona a menos que você permita um rastreamento que nada tem a ver.",
              ],
            },
            {
              title: "Minimização de dados: colete só o que a função precisa",
              body: [
                "A minimização de dados é uma regra simples e poderosa: colete e guarde só os dados de que um recurso realmente precisa para funcionar. Se um recurso consegue fazer o trabalho dele com menos, ele deve fazer. Dados que você nunca coleta não podem vazar, ser usados indevidamente nem cair nas mãos erradas.",
                "Para minimizar, pergunte de cada dado: \"o recurso realmente precisa disto para funcionar?\". Uma previsão do tempo precisa da sua região geral, não do seu endereço exato nem de todo o seu histórico de localização. Cortar os dados a mais mantém o recurso útil e reduz o risco para as pessoas.",
              ],
              examples: [
                "Uma previsão que usa a sua cidade em vez do seu trajeto exato de GPS.",
                "Um contador de passos que guarda o total de hoje, e não todos os lugares por onde você andou.",
                "Um cadastro que pede um apelido em vez do seu nome completo de registro.",
              ],
            },
            {
              title: "Menos dados, o mesmo trabalho: minimização na prática",
              body: [
                "Minimizar não significa quebrar o recurso. A maior parte dos recursos pode ser redesenhada para precisar de menos, usando uma versão mais ampla ou de vida mais curta do dado. Em vez de uma localização exata, use uma região geral. Em vez de guardar o dado para sempre, apague-o quando a tarefa terminar.",
                "Essa é uma escolha de projeto feita por pessoas. Quando você construir ou julgar um recurso de IA, pode insistir na versão que coleta o mínimo de dados pessoais e ainda faz o trabalho: isso é respeitar a privacidade por projeto, e não por acaso.",
              ],
              examples: [
                "Transformar \"endereço exato\" em \"cidade\" para um recurso de previsão do tempo.",
                "Transformar \"guardar para sempre\" em \"apagar quando a viagem terminar\" para uma rota de mapa.",
                "Transformar \"nome real e data de nascimento\" em \"só apelido\" para o placar de um jogo.",
              ],
            },
          ],
          workedExample: {
            title: "Minimizando um recurso de rastreio do ônibus escolar",
            steps: [
              "Diga qual é a função do recurso. Avisar um aluno quando o ônibus dele estiver a uns cinco minutos, para ele ir até o ponto.",
              "Liste o que uma versão descuidada poderia coletar. A localização GPS exata do aluno o dia todo, o nome completo dele, o endereço residencial e todo o histórico de localização.",
              "Faça a pergunta da minimização para cada item. Para avisar \"o ônibus está perto do seu ponto\", o recurso precisa do único ponto que o aluno usa, e não de um dia inteiro de rastreamento.",
              "Redesenhe com menos. Deixe o aluno escolher o ponto dele em uma lista. Guarde só esse ponto, e compare com a localização do ônibus apenas enquanto o ônibus estiver rodando.",
              "Confira o consentimento. Pergunte com clareza: \"Avisar você quando o ônibus chegar perto do seu ponto? Sim / Não\", e garanta que o aluno e a família entendam e possam recusar.",
            ],
            takeaway: "Parta da função real do recurso, e depois fique só com o menor dado que ainda faça essa função, e peça por ele com um consentimento claro.",
          },
          visuals: [
            {
              title: "Redesenhando um recurso para coletar menos",
              summary: "Uma comparação de antes e depois de um recurso de rastreio de ônibus escolar. Antes (coletando demais): guarda a localização exata do aluno o dia todo, o nome completo de registro, o endereço residencial e o histórico completo de localização, mantido para sempre. Depois (minimizado): guarda só o ponto de ônibus que o aluno escolheu, comparado com a localização do ônibus apenas enquanto o ônibus está rodando, e apagado no fim do dia. A versão de \"depois\" faz o mesmo trabalho, avisar o aluno quando o ônibus está perto, guardando muito menos dados pessoais.",
              caption: "O mesmo trabalho, muito menos dados pessoais: o projeto minimizado reduz o risco para o aluno.",
            },
            {
              title: "O recurso precisa mesmo disso?",
              summary: "Uma tabela testando cada dado que um recurso de previsão do tempo poderia pedir, conforme ele seja realmente necessário. Região geral ou cidade: necessário, porque a previsão é local. Endereço GPS exato: não necessário, a cidade basta. Histórico completo de localização: não necessário, só a região atual importa. Lista de contatos: não necessário, nada a ver com o tempo. A regra prática é ficar só com as linhas marcadas como necessárias.",
              table: {
                columns: [
                  "Dado solicitado",
                  "Necessário para uma previsão local?",
                  "Guardar?",
                ],
                rows: [
                  [
                    "Região geral ou cidade",
                    "Sim, a previsão é local",
                    "Guardar",
                  ],
                  [
                    "Endereço GPS exato",
                    "Não, a cidade basta",
                    "Descartar",
                  ],
                  [
                    "Histórico completo de localização",
                    "Não, só a região atual importa",
                    "Descartar",
                  ],
                  [
                    "Lista de contatos",
                    "Não, nada a ver com o tempo",
                    "Descartar",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "Laboratório de privacidade e minimização de dados",
            goal: "Para vários aplicativos fictícios, classificar cada campo de dados como obrigatório, útil, desnecessário ou sensível demais, e depois comparar com orientações sobre alternativas mais seguras, consentimento e por quanto tempo guardar os dados.",
            overview: "Escolha um aplicativo fictício (recomendador de livros, lembrete de eventos, ajudante de reciclagem, planejador de estudos ou guia de museu) e vá campo por campo (primeiro nome, data de nascimento exata, faixa etária, localização exata, gravação de voz, foto, identificador do aparelho e mais), decidindo se ele é obrigatório, útil mas opcional, desnecessário ou sensível demais para aquela finalidade. Revele a orientação para ver por que cada campo pode ou não ser necessário, uma alternativa mais segura, se é preciso consentimento, por quanto tempo guardar, e se processar no próprio aparelho reduz o risco. O objetivo é a minimização de dados: coletar só o que é realmente necessário. Nada de pessoal é digitado; os aplicativos e campos já vêm prontos.",
            steps: [
              "Escolha um aplicativo e leia para que ele serve.",
              "Classifique cada campo de dados: obrigatório, útil, desnecessário ou sensível demais.",
              "Revele a orientação e compare, lendo a alternativa mais segura, o consentimento e o prazo de guarda de cada um.",
              "Repare em como um mesmo campo pode ser obrigatório para um aplicativo e desnecessário para outro.",
            ],
            materials: [
              "O laboratório de privacidade já incluído nesta atividade",
            ],
            successCriteria: [
              "Todos os campos são classificados para pelo menos um aplicativo.",
              "Campos desnecessários e sensíveis demais são reconhecidos (minimização de dados).",
              "As alternativas mais seguras, as necessidades de consentimento e as orientações de guarda são lidas.",
            ],
            dataset: {
              name: "Cenários de aplicativos e campos de dados",
              description: "Cinco cenários de aplicativos fictícios já incluídos e treze campos de dados possíveis, cada um com um gabarito escrito (classificação recomendada, por quê, alternativa mais segura, consentimento, prazo de guarda, processamento no aparelho). Nenhum dado pessoal real é digitado.",
              columns: [
                null,
                "Campo de dados",
                "Classificação",
                "Alternativa mais segura",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responda a estas perguntas para conferir se você entendeu dados pessoais, consentimento e minimização de dados.",
            questions: [
              {
                prompt: "Quais destes contam como dados pessoais? Selecione todos que se aplicam.",
                explanation: "Dados pessoais são informações sobre uma pessoa específica; o horário público de um ônibus não é sobre ninguém em particular.",
                choices: [
                  {
                    text: "O endereço residencial de uma pessoa",
                    explanation: "Correto: um endereço residencial é informação sobre uma pessoa específica.",
                  },
                  {
                    text: "Uma foto mostrando o rosto de alguém",
                    explanation: "Correto: a foto de um rosto identifica uma pessoa específica, então é dado pessoal.",
                  },
                  {
                    text: "O horário público dos ônibus de uma cidade",
                    explanation: "Um horário público não é sobre ninguém em particular, então não é dado pessoal.",
                  },
                  {
                    text: "A localização exata de uma pessoa agora",
                    explanation: "Correto: uma localização exata diz onde uma pessoa específica está, então é dado pessoal.",
                  },
                ],
              },
              {
                prompt: "Qual alternativa segue melhor a minimização de dados?",
                scenario: "Um aplicativo de jogo de perguntas precisa de um nome para mostrar na lista de pontuações. Ele oferece três opções do que coletar de cada jogador.",
                explanation: "O placar só precisa de um nome de exibição, então um apelido é o menor dado pessoal que ainda faz o trabalho.",
                choices: [
                  {
                    text: "Coletar um apelido que o jogador digita.",
                    explanation: "Correto: um apelido faz o trabalho com o mínimo de dados pessoais.",
                  },
                  {
                    text: "Coletar o nome completo de registro e a data de nascimento do jogador.",
                    explanation: "O placar não precisa de nome de registro nem de data de nascimento, então isso coleta demais.",
                  },
                  {
                    text: "Coletar também os contatos e a localização do jogador.",
                    explanation: "Contatos e localização nada têm a ver com mostrar uma pontuação, então isso é muito mais do que o necessário.",
                  },
                ],
              },
              {
                prompt: "Decida se a afirmação é verdadeira ou falsa.",
                statement: "Esconder um acordo de compartilhamento de dados no fundo das letras miúdas, onde é improvável que as pessoas leiam, ainda conta como consentimento real e informado.",
                explanation: "Consentimento informado significa que a pessoa é avisada com clareza e pode escolher livremente; compartilhamento de dados escondido em letras miúdas não é consentimento informado.",
              },
            ],
          },
          challenge: {
            title: "Minimize um recurso que você usa",
            prompt: "Escolha um recurso comum de aplicativo e redesenhe-o para coletar o mínimo de dados pessoais e ainda funcionar.",
            steps: [
              "Descreva o recurso e a função real dele em uma frase.",
              "Liste os dados pessoais que ele poderia coletar.",
              "Risque tudo de que a função não precisa de verdade.",
              "Escreva a versão minimizada e uma pergunta de consentimento clara para ela.",
            ],
            successCriteria: [
              "A função do recurso é enunciada com clareza.",
              "Pelo menos um dado pessoal desnecessário é removido.",
              "Uma pergunta de consentimento clara é escrita, com um jeito fácil de recusar.",
            ],
          },
          reflection: [
            {
              prompt: "Qual aplicativo do seu aparelho você acha que coleta mais dados do que a função dele precisa? O que ele poderia deixar de pedir?",
            },
            {
              prompt: "Por que coletar menos dados pessoais protege as pessoas mesmo que ninguém nunca os use indevidamente?",
            },
          ],
          recap: {
            summary: "Privacidade é controlar os dados pessoais; o consentimento precisa ser informado, e a minimização de dados mantém só o que um recurso realmente precisa.",
            keyPoints: [
              "Dados pessoais são informações sobre uma pessoa específica, como nome, endereço ou localização exata.",
              "Consentimento real é informado e dado livremente, e não escondido em letras miúdas.",
              "Minimização de dados significa coletar só o que o recurso precisa para funcionar.",
              "Dados que você nunca coleta não podem vazar nem ser usados indevidamente, então menos dados significa menos risco.",
            ],
          },
          extension: {
            title: "O compromisso por trás dos aplicativos \"gratuitos\"",
            body: [
              "Muitos aplicativos são gratuitos porque coletam e usam dados sobre quem os usa. Isso não torna todo aplicativo gratuito prejudicial, mas significa que vale a pena perguntar \"o que este aplicativo ganha comigo?\".",
              "Escolha um aplicativo ou serviço gratuito e descreva a troca possível: o que a pessoa recebe, e que dados a empresa pode coletar em troca? Quais desses dados a minimização de dados diria que o aplicativo na verdade não precisa?",
            ],
          },
        },
        {
          title: "Investigue conteúdo de IA e tome uma decisão ética",
          summary: "Aprenda a verificar conteúdo feito por IA e conteúdo on-line achando a fonte original, conferindo o contexto e confirmando de forma independente, e depois tome uma decisão ética com supervisão humana e direito de recurso.",
          estimatedTime: "50-60 minutos",
          objectives: [
            {
              text: "Definir deepfake e desinformação e explicar como eles podem enganar.",
            },
            {
              text: "Verificar uma afirmação achando a fonte original dela e conferindo o contexto.",
            },
            {
              text: "Usar a confirmação independente de fontes separadas e confiáveis.",
            },
            {
              text: "Explicar por que decisões importantes de uma IA precisam de supervisão humana e de direito de recurso.",
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
              term: "Deepfake",
              definition: "Uma foto, um vídeo ou um áudio feito ou alterado por IA para mostrar uma pessoa dizendo ou fazendo algo que ela não disse nem fez de verdade.",
            },
            {
              term: "Desinformação",
              definition: "Informação falsa ou enganosa que se espalha, quer quem compartilha tenha a intenção de enganar, quer não.",
            },
            {
              term: "Fonte original",
              definition: "O primeiro lugar de onde uma afirmação, citação ou imagem realmente veio, antes de ser copiada ou recompartilhada.",
            },
            {
              term: "Contexto",
              definition: "Toda a história em volta (quando, onde e por que algo aconteceu) que dá a um fato o significado real dele.",
            },
            {
              term: "Confirmação independente",
              definition: "Conferir uma afirmação em duas ou mais fontes separadas e confiáveis que não simplesmente copiaram uma à outra.",
            },
            {
              term: "Supervisão humana",
              definition: "Uma pessoa revisando e continuando responsável pelas decisões importantes de uma IA, em vez de deixar o software decidir sozinho.",
            },
            {
              term: "Recurso",
              definition: "O direito de pedir que uma pessoa revise e possivelmente mude uma decisão que uma IA tomou sobre você.",
            },
          ],
          openingScenario: {
            prompt: "Um vídeo se espalha na internet mostrando uma cientista famosa dizendo algo chocante. Parece e soa real. Antes de acreditar ou compartilhar, o que você iria querer conferir primeiro?",
            context: "A IA já consegue criar imagens, vídeos e áudios falsos muito convincentes, então \"parece real\" não basta mais para confiar em algo.",
          },
          predictionPrompt: {
            prompt: "Preveja: se a mesma afirmação surpreendente aparece em cinco contas que todas copiaram uma única publicação, isso conta como cinco confirmações independentes?",
            howToCheck: "Enquanto lê sobre confirmação independente, decida se cópias de uma única fonte contam como confirmações separadas.",
          },
          concepts: [
            {
              title: "Deepfakes e desinformação: por que \"parece real\" não é prova",
              body: [
                "Um deepfake é uma foto, um vídeo ou um áudio que a IA criou ou alterou para mostrar uma pessoa dizendo ou fazendo algo que ela nunca fez. Como a IA fica cada vez melhor nisso, um vídeo pode parecer e soar convincente e ainda assim ser falso.",
                "Desinformação é informação falsa ou enganosa que se espalha. Nem sempre é um deepfake, e quem compartilha nem sempre quer enganar: uma foto real pode circular com uma legenda falsa. De todo jeito, a solução é a mesma: não confie em algo só porque parece real ou porque muita gente compartilhou.",
              ],
              examples: [
                "Um vídeo em que a boca e a voz de uma pessoa foram alteradas por IA para forjar uma citação.",
                "Uma foto antiga e real recompartilhada com a alegação falsa de que aconteceu hoje.",
                "Uma \"estatística\" inventada, repetida tantas vezes que começa a parecer verdade.",
              ],
            },
            {
              title: "Ache a fonte original e confira o contexto",
              body: [
                "Para verificar uma afirmação, rastreie-a até a fonte original: o primeiro lugar de onde ela realmente veio, antes de ser copiada e recompartilhada. Uma captura de tela de uma citação não é a fonte; a reportagem, o vídeo ou a página oficial de verdade são. Se você não consegue achar nenhuma fonte original, isso é um sinal de alerta.",
                "Depois confira o contexto: quando, onde e por que aquilo aconteceu. Uma foto real pode enganar se for antiga, de outro lugar, ou se faltar a história em volta. O contexto é o que transforma um fato solto em um fato honesto.",
              ],
              examples: [
                "Rastrear uma citação até a entrevista completa de onde ela foi recortada.",
                "Descobrir que uma foto de \"última hora\" é na verdade de um evento de anos atrás.",
                "Ler a declaração inteira e ver que uma citação foi cortada no meio da frase.",
              ],
            },
            {
              title: "Confirmação independente: fontes separadas, e não ecos",
              body: [
                "Uma fonte só pode estar errada, então afirmações fortes precisam de confirmação independente: duas ou mais fontes separadas e confiáveis que não simplesmente copiaram uma à outra. Dez contas recompartilhando a mesma publicação continuam sendo uma única fonte ecoando, e não dez confirmações.",
                "Para confirmar de forma independente, procure reportagens ou registros que tenham chegado à afirmação por conta própria: outro veículo de imprensa, uma página oficial, uma pessoa especialista. Se fontes independentes concordam, é bem mais provável que a afirmação seja verdadeira. Se só uma fonte tem aquilo, continue cauteloso.",
              ],
              examples: [
                "Dois veículos de imprensa distintos que cada um noticiou por conta própria.",
                "A página da própria organização oficial confirmando o próprio anúncio dela.",
                "Perceber que cinco \"fontes\" apontam todas para a mesma publicação única.",
              ],
            },
            {
              title: "Supervisão humana e o direito de recurso",
              body: [
                "A IA pode ajudar a sinalizar possíveis falsificações ou a organizar informação, mas ela erra, então decisões importantes precisam de supervisão humana: uma pessoa que revisa a decisão e continua responsável por ela. Isso importa mais quando uma decisão afeta a vida de alguém, como marcar uma publicação como falsa, avaliar um trabalho ou bloquear uma conta.",
                "Quem é afetado por uma decisão de IA também deveria ter direito de recurso: poder pedir que uma pessoa revise a decisão e a mude se a IA errou. Supervisão e recurso são o jeito de manter as pessoas, e não o software, no comando das decisões que importam.",
              ],
              examples: [
                "Uma pessoa revisando as publicações que uma IA sinalizou antes de qualquer uma ser removida.",
                "Um aluno pedindo à professora que reveja uma resposta avaliada por IA.",
                "Uma pessoa recorrendo a um humano depois de uma IA bloquear a conta dela por engano.",
              ],
            },
          ],
          workedExample: {
            title: "Investigando um vídeo viral chocante",
            steps: [
              "Pare antes de compartilhar. O vídeo é surpreendente e emocionante, que é justamente quando a desinformação se espalha mais rápido.",
              "Ache a fonte original. Procure o vídeo completo ou a declaração oficial, e não só o trecho curto que alguém republicou.",
              "Confira o contexto. Repare que o trecho foi recortado de uma palestra mais longa em que a pessoa disse o contrário; a citação foi tirada de contexto.",
              "Confirme de forma independente. Procure uma fonte separada e confiável. Nenhum veículo independente noticia a afirmação chocante, um forte sinal de que ela não é real.",
              "Decida com supervisão e recurso. Como há muito em jogo, uma pessoa moderadora, e não a IA sozinha, revisa e rotula como enganoso, e quem publicou pode recorrer se tiver provas reais.",
            ],
            takeaway: "Verifique por fonte e contexto, confirme de forma independente, e mantenha uma pessoa no comando com um caminho de recurso antes de agir diante de uma afirmação séria.",
          },
          visuals: [
            {
              title: "Uma lista de verificação para conteúdo on-line",
              summary: "Um fluxo de quatro passos para conferir uma afirmação antes de acreditar ou compartilhar. Passo 1: ache a fonte original (o primeiro lugar de onde veio, e não uma captura de tela). Passo 2: confira o contexto (quando, onde e por que aconteceu). Passo 3: confirme de forma independente (duas ou mais fontes separadas e confiáveis que não copiaram uma à outra). Passo 4: decida com supervisão humana e mantenha um direito de recurso. Se algum passo falhar, não compartilhe aquilo como verdade.",
              caption: "Siga os quatro passos em ordem; uma afirmação que falha em um passo não deve ser compartilhada como verdade.",
            },
            {
              title: "Confirmação real contra um eco",
              summary: "Uma tabela distinguindo confirmação independente real do eco de uma única fonte. Cinco republicações da mesma publicação original: não é independente, porque todas remetem a uma única fonte. Dois veículos de imprensa diferentes noticiando por conta própria: independente, porque chegaram à afirmação separadamente. Uma organização oficial confirmando a própria notícia: independente e confiável. Uma conta anônima sem fonte: não é confirmação, trate com cautela.",
              table: {
                columns: [
                  "O que você encontrou",
                  "É confirmação independente?",
                ],
                rows: [
                  [
                    "Cinco republicações da mesma publicação original",
                    "Não, uma única fonte ecoando",
                  ],
                  [
                    "Dois veículos de imprensa distintos, cada um noticiando por conta própria",
                    "Sim, é independente",
                  ],
                  [
                    "Uma organização oficial confirmando a própria notícia",
                    "Sim, fonte confiável",
                  ],
                  [
                    "Uma conta anônima sem nenhuma fonte ligada",
                    "Não, verifique antes de confiar",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "Investigação de conteúdo e decisão ética",
            goal: "Investigar publicações fictícias usando provas de fonte e contexto, e depois atuar como comitê de ética diante de sistemas de IA propostos e desenhar um processo de recurso.",
            overview: "Parte 1: investigue uma coleção de publicações fictícias: uma ilustração de IA rotulada com honestidade, uma foto real com legenda enganosa, uma citação forjada, uma data falsa, uma afirmação sem fonte, uma afirmação com fonte confiável e uma corrente que apela às emoções. Para cada uma, faça as sete conferências de fonte e contexto (quem publicou, existe uma fonte original, a data está certa, a legenda combina com o contexto, há provas, fontes independentes confirmam, aquilo acelera as suas emoções) e julgue se deve confiar, questionar ou deixar sem confirmação. \"Pistas\" visuais, como mãos estranhas, são tratadas como pouco confiáveis, e a atividade não afirma detectar conteúdo de IA com perfeição. Parte 2: avalie seis sistemas de IA propostos como um comitê de ética, escolhendo uma decisão e salvaguardas, com retorno baseado em se as suas salvaguardas combinam com o que está em jogo, e não em uma única resposta \"certa\". Parte 3: desenhe um processo de recurso. Tudo fictício; nada é enviado a lugar nenhum.",
            steps: [
              "Para cada publicação, leia as sete conferências de provas e julgue: confiar, questionar ou deixar sem confirmação.",
              "Compare com a recomendação e com a nota didática sobre fonte e contexto.",
              "Como comitê de ética, escolha uma decisão e salvaguardas para um sistema de IA proposto.",
              "Desenhe um processo de recurso: aviso, explicação, quem revisa, correção, documentação e possibilidade de reverter a decisão.",
            ],
            materials: [
              "A investigação de conteúdo, o comitê de ética e o desenhador de recursos já incluídos nesta atividade",
            ],
            successCriteria: [
              "As publicações são julgadas usando provas de fonte e contexto, e não um truque visual.",
              "Uma decisão ética é tomada com salvaguardas que combinam com o que está em jogo.",
              "Um processo de recurso completo é desenhado, com supervisão humana e um jeito de corrigir erros.",
            ],
            dataset: {
              name: "Publicações, cenários de ética e desenhador de recursos",
              description: "Uma coleção já incluída de oito publicações fictícias (cada uma com sete conferências de provas de fonte e contexto e um veredito recomendado), seis cenários para o comitê de ética (com o que está em jogo, os erros prováveis e as salvaguardas principais) e um desenhador de processo de recurso em seis partes. Tudo fictício; sem contas, pessoas ou dados pessoais reais.",
              columns: [
                "Publicação / cenário",
                "Provas ou o que está em jogo",
                "Veredito recomendado / salvaguardas",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Responda a estas perguntas para conferir se você sabe verificar conteúdo e raciocinar sobre supervisão e recurso.",
            questions: [
              {
                prompt: "Coloque em uma ordem sensata os passos de verificar uma afirmação surpreendente.",
                explanation: "Verifique achando a fonte original, conferindo o contexto dela, confirmando com fontes independentes, e só então decidindo o que fazer.",
                items: [
                  {
                    text: "Achar a fonte original de onde a afirmação veio",
                  },
                  {
                    text: "Conferir o contexto: quando, onde e por que aconteceu",
                  },
                  {
                    text: "Confirmá-la com duas ou mais fontes independentes",
                  },
                  {
                    text: "Decidir o que fazer, com uma pessoa revisando a decisão",
                  },
                ],
              },
              {
                prompt: "Qual destas é uma verdadeira confirmação independente de uma afirmação?",
                explanation: "Confirmação independente exige fontes separadas que chegaram à afirmação por conta própria, e não cópias de uma única publicação.",
                choices: [
                  {
                    text: "A mesma publicação recompartilhada por muitas contas",
                    explanation: "Recompartilhamentos de uma publicação são uma única fonte ecoando, e não confirmação independente.",
                  },
                  {
                    text: "Duas fontes separadas e confiáveis que cada uma noticiou por conta própria",
                    explanation: "Correto: fontes separadas que não copiaram uma à outra são confirmação independente de verdade.",
                  },
                  {
                    text: "Uma conta anônima que diz \"confie em mim\"",
                    explanation: "Uma única conta sem nome e sem fonte não é confirmação nenhuma.",
                  },
                  {
                    text: "A afirmação parecer verdadeira por ser surpreendente",
                    explanation: "Uma sensação não é prova; afirmações surpreendentes precisam ainda mais de conferência.",
                  },
                ],
              },
              {
                prompt: "Qual é o jeito mais responsável de lidar com esta decisão de IA?",
                scenario: "Um aplicativo escolar usa IA para sinalizar redações que ele prevê terem sido copiadas. Ele sinaliza a redação de Priya, que ela mesma escreveu.",
                explanation: "A IA pode errar, então uma pessoa deveria revisar a sinalização e Priya deveria poder recorrer a um humano.",
                choices: [
                  {
                    text: "Dar zero automaticamente, porque a IA nunca erra.",
                    explanation: "A IA erra sim, então agir com base na sinalização sem revisão humana é injusto.",
                  },
                  {
                    text: "Fazer uma professora revisar a sinalização, e deixar Priya recorrer e explicar.",
                    explanation: "Correto: supervisão humana somada ao direito de recurso protege as pessoas dos erros da IA.",
                  },
                  {
                    text: "Esconder a sinalização de Priya para ela não poder contestar.",
                    explanation: "Esconder a decisão elimina qualquer chance de recurso, o que é injusto com Priya.",
                  },
                  {
                    text: "Apagar a redação para ninguém precisar decidir.",
                    explanation: "Apagar o trabalho dela pune Priya e ainda assim não lhe dá uma revisão justa.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Escreva um guia de verificação",
            prompt: "Faça um guia curto que um amigo possa usar para conferir se uma publicação viral é confiável antes de compartilhar.",
            steps: [
              "Escreva os quatro passos: fonte original, contexto, confirmação independente e uma conferência humana.",
              "Para cada passo, acrescente uma pergunta simples que a pessoa possa se fazer.",
              "Acrescente uma linha sobre quando uma decisão precisa de supervisão humana e de um caminho de recurso.",
            ],
            successCriteria: [
              "Os quatro passos de verificação aparecem em uma ordem clara.",
              "Cada passo tem uma pergunta simples e utilizável.",
              "O guia menciona a supervisão humana e o direito de recurso.",
            ],
          },
          reflection: [
            {
              prompt: "Pense em uma vez em que algo surpreendente se espalhou on-line. O que teria ajudado as pessoas a conferir antes de compartilhar?",
            },
            {
              prompt: "Por que o direito de recorrer de uma decisão de IA é importante, mesmo quando a IA costuma acertar?",
            },
          ],
          recap: {
            summary: "Como a IA consegue falsificar e espalhar conteúdo convincente, verifique por fonte e contexto, confirme de forma independente, e mantenha as pessoas no comando com direito de recurso.",
            keyPoints: [
              "Deepfakes e desinformação significam que \"parece real\" não é prova.",
              "Rastreie as afirmações até a fonte original e confira o contexto em volta delas.",
              "Confirmação independente exige fontes separadas, e não cópias de uma única publicação.",
              "Decisões importantes de IA precisam de supervisão humana e de direito de recurso.",
            ],
          },
          extension: {
            title: "Quando a pressa briga com a exatidão",
            body: [
              "Na internet, ser o primeiro muitas vezes rende mais atenção do que estar certo, então conteúdo enganoso pode se espalhar antes que alguém verifique. Verificar com cuidado leva um tempo que um feed acelerado não recompensa.",
              "Descreva uma situação em que a pressão para compartilhar rápido entra em conflito com os passos de verificar uma afirmação. O que uma plataforma, ou uma pessoa, poderia fazer para tornar a escolha correta mais fácil do que a rápida?",
            ],
          },
        },
      ],
    },
    {
      title: "Estúdio de Design de IA",
      subtitle: "Junte tudo: defina um problema real, decida se a IA se encaixa, projete e teste um protótipo, e apresente com responsabilidade.",
      summary: "Na semana final, os alunos trabalham como uma equipe de design: transformam a necessidade de uma pessoa usuária em uma definição clara do problema, julgam se a IA é a ferramenta certa, projetam as entradas, saídas, características, rótulos e regras, constroem e testam um protótipo de papel, encontram as limitações dele por meio de casos de teste, e apresentam o resultado com honestidade, com supervisão humana e uso responsável, enquanto exploram as carreiras de quem constrói e regula a IA. Esta semana prepara os alunos para o estúdio do Projeto Final e para a Avaliação Final, que vêm à parte.",
      bigQuestion: "Como levar uma ideia de um problema real até um projeto de IA testado e apresentado com responsabilidade?",
      estimatedTime: "2,5-3 horas",
      objectives: [
        "Transformar a necessidade de uma pessoa usuária em uma definição clara do problema e julgar se a IA combina com ela.",
        "Projetar as entradas, saídas, características, rótulos e regras de um sistema.",
        "Construir um protótipo, testá-lo com casos de teste, achar as limitações dele e iterar.",
        "Apresentar um projeto com responsabilidade, com supervisão, e descrever carreiras reais em IA.",
      ],
      requiredConcepts: [
        "Necessidade da pessoa usuária",
        "Definição do problema",
        "Adequação da IA",
        "Entrada",
        "Saída",
        "Característica",
        "Rótulo",
        "Regra",
        "Protótipo",
        "Caso de teste",
        "Limitação",
        "Supervisão",
        "Iteração",
        "Uso responsável",
      ],
      lessons: [
        {
          title: "Escolha o problema e a ferramenta certos",
          summary: "Comece um projeto de design do jeito que as equipes de verdade fazem: aponte a necessidade de uma pessoa usuária, escreva uma definição clara do problema, e decida se a IA é sequer a ferramenta certa para a tarefa.",
          estimatedTime: "50-60 minutos",
          objectives: [
            {
              text: "Transformar a necessidade de uma pessoa usuária em uma definição do problema clara, de uma frase só.",
            },
            {
              text: "Julgar a adequação da IA: decidir se um problema combina mais com IA ou com regras fixas.",
            },
            {
              text: "Apontar a entrada e a saída que o seu projeto usaria.",
            },
            {
              text: "Explicar por que escolher o problema certo importa antes de construir qualquer coisa.",
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
              name: "Suas anotações das semanas 1 a 5",
              note: "Para relembrar como a IA aprende com exemplos.",
            },
          ],
          vocabulary: [
            {
              term: "Necessidade da pessoa usuária",
              definition: "Um problema real que uma pessoa ou grupo específico tem e quer resolver, descrito do ponto de vista dessa pessoa.",
            },
            {
              term: "Definição do problema",
              definition: "Uma afirmação clara, de uma frase só, sobre exatamente o que você está tentando resolver e para quem.",
            },
            {
              term: "Adequação da IA",
              definition: "O quanto um problema combina com a IA, que aprende padrões a partir de muitos exemplos, em comparação com uma regra fixa que uma pessoa simplesmente pode escrever.",
            },
            {
              term: "Entrada",
              definition: "A informação que o sistema receberia, como uma foto, uma frase ou um conjunto de números.",
            },
            {
              term: "Saída",
              definition: "O resultado que o sistema devolveria, como um rótulo, uma previsão ou uma sugestão.",
            },
          ],
          openingScenario: {
            prompt: "Um clube da escola diz: \"Queremos usar IA!\". Mas para quê? Uma equipe de design nunca começa pela ferramenta: ela começa por uma pessoa que tem um problema. De quem seria o problema que o seu projeto resolveria, e qual é ele exatamente?",
            context: "Esta semana você planeja um projeto de verdade. Tudo começa pelo problema, e não pela tecnologia.",
          },
          predictionPrompt: {
            prompt: "Preveja: destas duas ideias, \"separar fotos de livros da biblioteca em ficção e não ficção\" e \"destrancar uma porta com a senha correta\", qual combina mais com IA?",
            howToCheck: "Enquanto lê, pergunte se cada tarefa é bagunçada demais para uma pessoa escrever regras exatas, ou se uma regra clara já resolve.",
          },
          concepts: [
            {
              title: "Comece por uma necessidade da pessoa usuária, e não por uma ferramenta",
              body: [
                "Bons projetos começam com uma pessoa real que tem um problema real: uma necessidade da pessoa usuária. \"As crianças da minha turma esquecem em qual lixeira de reciclagem jogar cada coisa\" é uma necessidade. \"Quero usar IA\" não é; isso aponta uma ferramenta, e não um problema.",
                "Quando você parte de uma necessidade real, dá para saber depois se o seu projeto realmente ajudou. Descreva a necessidade do ponto de vista da pessoa usuária: quem ela é, e o que está difícil para ela agora.",
              ],
              examples: [
                "Uma jardineira não consegue dizer quais folhas mostram doença na planta",
                "Alunos novos se perdem procurando as salas no primeiro dia",
                "Um clube de correspondência recebe mensagens em idiomas que os membros não leem",
              ],
            },
            {
              title: "Escreva uma definição clara do problema",
              body: [
                "Depois de ter uma necessidade, você escreve uma definição do problema: uma frase clara que diz exatamente o que você está resolvendo e para quem. Uma definição afiada evita que um projeto se perca. \"Ajudar alunos do sexto ano a separar o lixo da sala em reciclagem, compostagem e lixo comum a partir de uma foto\" é específica o bastante para construir e para testar.",
                "Uma definição vaga como \"melhorar a reciclagem\" não pode ser testada: você nunca saberia se deu certo. Uma boa definição do problema aponta a pessoa usuária, a tarefa, e como é um bom resultado.",
              ],
              examples: [
                "Vaga: \"Ajudar com plantas.\" Clara: \"Dizer a quem cultiva se a foto de uma folha de tomate parece saudável ou doente.\"",
                "Vaga: \"Facilitar a escola.\" Clara: \"Dar a um aluno novo o caminho até uma sala a partir do número dela.\"",
              ],
            },
            {
              title: "Decida a adequação da IA: ela é sequer a ferramenta certa?",
              body: [
                "Nem todo problema precisa de IA. A IA brilha quando uma tarefa é bagunçada demais para escrever regras exatas, mas você tem muitos exemplos com que aprender, como diferenciar folhas saudáveis de doentes em fotos. Um problema que uma regra clara já resolve não precisa de IA: \"destrancar se a senha bater\" é uma regra, não uma tarefa de aprendizado.",
                "Para julgar a adequação da IA, faça três perguntas: a tarefa é bagunçada demais para regras escritas à mão? Você conseguiria reunir muitos exemplos rotulados? E tudo bem se o sistema errar às vezes? Se as respostas forem sim, a IA pode se encaixar. Se uma regra simples funciona, use a regra: ela é mais barata, mais clara e mais fácil de conferir.",
              ],
              examples: [
                "Boa combinação com IA: separar fotos de lixo em reciclagem, compostagem ou lixo comum.",
                "Combinação ruim com IA: acender as luzes do corredor às 7h; isso é uma regra fixa.",
                "Combinação ruim com IA: uma tarefa em que errar uma única vez poderia machucar seriamente alguém.",
              ],
            },
          ],
          workedExample: {
            title: "De um desejo vago a um projeto que dá para construir",
            steps: [
              "Comece pelo desejo: \"Quero usar IA para ajudar o clube de reciclagem\".",
              "Ache a necessidade: os membros do clube e outros alunos muitas vezes jogam o lixo na lixeira errada porque não sabem o que é reciclável.",
              "Escreva a definição do problema: \"Ajudar os alunos a decidir em qual de três lixeiras (reciclagem, compostagem ou lixo comum) um item vai, a partir de uma foto do item\".",
              "Aponte entrada e saída: a entrada é a foto de um item; a saída é um rótulo: \"reciclagem\", \"compostagem\" ou \"lixo comum\".",
              "Confira a adequação da IA: bagunçado demais para regras exatas? Sim, os itens variam muito. Dá para reunir muitas fotos rotuladas? Sim. Tudo bem errar às vezes, se uma pessoa confere? Sim. A IA se encaixa.",
            ],
            takeaway: "Um projeto que dá para construir tem uma necessidade real, uma definição do problema de uma frase, uma entrada e uma saída apontadas, e um sim na adequação da IA.",
          },
          visuals: [
            {
              title: "Este problema deve usar IA?",
              summary: "Uma árvore de decisão para a adequação da IA. Início: \"Uma regra clara resolve?\". Se sim, use uma regra, e não IA. Se não, pergunte \"Dá para reunir muitos exemplos rotulados?\". Se não, a IA provavelmente ainda não vai funcionar. Se sim, pergunte \"Tudo bem se ela errar às vezes, com uma pessoa conferindo?\". Se não, tenha muito cuidado ou não use IA. Se sim, a IA pode ser uma boa escolha.",
              caption: "Use uma regra quando uma regra funciona; guarde a IA para tarefas bagunçadas, com exemplos e conferência humana.",
            },
            {
              title: "Lista de verificação da definição do problema",
              summary: "Uma tabela do que uma boa definição do problema inclui. Pessoa usuária: aponta uma pessoa ou grupo específico. Tarefa: diz exatamente o que decidir ou produzir. Entrada: aponta o que o sistema recebe. Saída: aponta o que ele devolve. Testável: depois você conseguiria dizer se funcionou.",
              table: {
                columns: [
                  "Parte",
                  "Pergunta que ela responde",
                  "Exemplo fraco",
                  "Exemplo forte",
                ],
                rows: [
                  [
                    "Pessoa usuária",
                    "Quem tem este problema?",
                    "\"As pessoas\"",
                    "\"Alunos novos do sexto ano\"",
                  ],
                  [
                    "Tarefa",
                    "O que exatamente estamos resolvendo?",
                    "\"Ajudar com o caminho\"",
                    "\"Dar o caminho até uma sala a partir do número dela\"",
                  ],
                  [
                    "Entrada",
                    "O que entra?",
                    "\"Alguma informação\"",
                    "\"Um número de sala\"",
                  ],
                  [
                    "Saída",
                    "O que sai?",
                    "\"Uma resposta\"",
                    "\"Instruções passo a passo\"",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "Estúdio de encaixe entre problema e ferramenta",
            goal: "Escolher um problema para o projeto, escrever a definição do problema dele, e decidir se a IA é a ferramenta certa.",
            overview: "Você vai analisar um conjunto de problemas candidatos, escolher um (ou trazer a sua própria necessidade de pessoa usuária), e transformá-lo em um resumo de projeto que dê para construir: uma necessidade, uma definição do problema de uma frase, uma entrada e uma saída apontadas, e uma decisão sobre a adequação da IA. Esta é a semente do seu Projeto Final.",
            steps: [
              "Leia os problemas candidatos e escolha um que te interesse, ou escreva a sua própria necessidade de pessoa usuária.",
              "Escreva a necessidade do ponto de vista da pessoa usuária: quem ela é e o que está difícil.",
              "Escreva uma definição do problema de uma frase, apontando a pessoa usuária, a tarefa e como é um bom resultado.",
              "Aponte a entrada e a saída que o seu sistema usaria.",
              "Faça a verificação de adequação da IA e escreva uma frase: a IA se encaixa, ou uma regra simples resolveria?",
            ],
            materials: [
              "Papel e lápis, ou um aplicativo de notas",
            ],
            successCriteria: [
              "Uma necessidade escrita do ponto de vista da pessoa usuária.",
              "Uma definição do problema de uma frase que aponte a pessoa usuária, a tarefa e um resultado testável.",
              "Uma entrada e uma saída apontadas.",
              "Uma decisão clara sobre a adequação da IA, com um motivo de uma frase.",
            ],
            dataset: {
              name: "Problemas candidatos para o projeto",
              description: "Um conjunto já incluído de problemas iniciais para o estúdio: separar o lixo da sala a partir de uma foto, sinalizar folhas com doenças de plantas, agrupar itens de achados e perdidos, traduzir mensagens de correspondência, organizar livros da biblioteca por assunto, e \"destrancar um armário com uma senha\" (uma armadilha que só precisa de regras e deve ser descartada). Cada carta lista uma pessoa usuária aproximada, uma entrada possível e uma saída possível.",
              columns: [
                "Problema",
                "Pessoa usuária possível",
                "Entrada possível",
                "Saída possível",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Confira se você sabe definir um problema e julgar se a IA combina com ele.",
            questions: [
              {
                prompt: "Qual é a definição do problema mais forte?",
                explanation: "Uma definição forte aponta a pessoa usuária, a tarefa exata, e um resultado que você poderia testar depois.",
                choices: [
                  {
                    text: "Usar IA para melhorar a escola.",
                    explanation: "Isso aponta uma ferramenta e um desejo, e não uma pessoa usuária específica, uma tarefa ou um resultado testável.",
                  },
                  {
                    text: "Ajudar alunos novos a achar uma sala dando o caminho a partir do número dela.",
                    explanation: "Correto: aponta a pessoa usuária (alunos novos), a tarefa (o caminho) e um resultado testável.",
                  },
                  {
                    text: "Fazer algo legal com fotos.",
                    explanation: "Não há pessoa usuária, nem tarefa, nem nada que você pudesse testar.",
                  },
                  {
                    text: "Melhorar a reciclagem para todo mundo.",
                    explanation: "É vago demais: você nunca conseguiria dizer se funcionou.",
                  },
                ],
              },
              {
                prompt: "Decida se a afirmação é verdadeira ou falsa.",
                statement: "Se uma regra clara já resolve um problema, você ainda assim deve usar IA porque a IA é mais avançada.",
                explanation: "Falso: se uma regra simples funciona, use a regra. Ela é mais barata, mais clara e mais fácil de conferir do que a IA.",
              },
              {
                prompt: "Qual projeto combina melhor com IA?",
                scenario: "Um clube está escolhendo entre: (A) tocar um sinal exatamente quando a aula acaba, ou (B) dizer, a partir de uma foto, se a folha de uma planta parece saudável ou doente.",
                explanation: "O sinal é uma regra clara de horário. Diferenciar folhas saudáveis de doentes é bagunçado e precisa de muitos exemplos rotulados, o que combina com IA.",
                choices: [
                  {
                    text: "Tocar um sinal quando a aula acaba",
                    explanation: "Isso é uma regra fixa de horário: não precisa aprender nada, então a IA não se encaixa.",
                  },
                  {
                    text: "Diferenciar uma folha saudável de uma doente em uma foto",
                    explanation: "Correto: é bagunçado demais para regras à mão e tem exemplos com que aprender, então a IA se encaixa.",
                  },
                  {
                    text: "Os dois combinam igualmente com IA",
                    explanation: "O sinal é uma regra simples e não precisa de IA.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Três problemas, um escolhido",
            prompt: "Proponha três necessidades de pessoas usuárias, depois escolha a que melhor combina com IA e defenda a sua escolha.",
            steps: [
              "Escreva três necessidades diferentes, cada uma do ponto de vista de uma pessoa usuária real.",
              "Para cada uma, aponte uma entrada possível e uma saída possível.",
              "Faça a verificação de adequação da IA nas três e escolha a que melhor combina.",
              "Escreva duas frases defendendo por que a que você escolheu combina mais com IA do que as outras.",
            ],
            successCriteria: [
              "Três necessidades de pessoas usuárias, cada uma com uma entrada e uma saída.",
              "Uma decisão de adequação da IA para cada uma.",
              "Um problema escolhido, com uma defesa de duas frases.",
            ],
          },
          reflection: [
            {
              prompt: "Por que é tentador começar pela ferramenta (\"vamos usar IA\") em vez de pelo problema, e o que dá errado quando você faz isso?",
            },
            {
              prompt: "Qual parte de escrever uma definição do problema foi a mais difícil: apontar a pessoa usuária, a tarefa ou o resultado testável?",
            },
          ],
          recap: {
            summary: "Grandes projetos de IA partem de uma necessidade real, de uma definição clara do problema, e de uma verificação honesta de se a IA é sequer a ferramenta certa.",
            keyPoints: [
              "Uma necessidade de pessoa usuária descreve o problema de uma pessoa real, e não uma ferramenta que você quer usar.",
              "Uma definição do problema aponta a pessoa usuária, a tarefa, a entrada, a saída e um resultado testável.",
              "Julgue a adequação da IA: use uma regra quando uma regra funciona; guarde a IA para tarefas bagunçadas com muitos exemplos.",
            ],
          },
          extension: {
            title: "Oportunidade ou só barulho?",
            body: [
              "Às vezes as empresas acrescentam \"IA\" a um produto principalmente por marketing, mesmo quando uma regra simples funcionaria melhor. Isso pode desperdiçar dinheiro e tornar o produto mais difícil de confiar e de conferir.",
              "Ache um produto ou aplicativo real que anuncie um recurso de \"IA\". Decida se a tarefa realmente precisa de IA ou se uma regra fixa resolveria. Escreva um parágrafo curto explicando o seu julgamento.",
            ],
          },
        },
        {
          title: "Planeje, prototipe e teste",
          summary: "Transforme o seu problema em um plano que dê para construir e conferir: projete as entradas, saídas, características, rótulos e regras; faça um protótipo simples; e teste com casos de teste de verdade.",
          estimatedTime: "50-65 minutos",
          objectives: [
            {
              text: "Projetar as entradas, saídas, características, rótulos e quaisquer regras do seu sistema.",
            },
            {
              text: "Explicar o que é um protótipo e fazer um simples no papel.",
            },
            {
              text: "Escrever casos de teste e usá-los para achar limitações.",
            },
            {
              text: "Melhorar o seu projeto por meio da iteração, com base no que os testes mostram.",
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
              name: "A sua definição do problema da aula 1",
              note: "Você vai construir o plano em cima dela.",
            },
          ],
          vocabulary: [
            {
              term: "Característica",
              definition: "Uma pista mensurável sobre uma entrada que o sistema usa para decidir, como a cor, o formato ou o tamanho de um item.",
            },
            {
              term: "Rótulo",
              definition: "A resposta certa ligada a um exemplo, como marcar uma foto com \"reciclagem\" para o sistema poder aprender com ela.",
            },
            {
              term: "Regra",
              definition: "Uma instrução exata que uma pessoa escreve, como \"se o item for uma garrafa de vidro, rotule como reciclagem\".",
            },
            {
              term: "Protótipo",
              definition: "Uma primeira versão rápida e tosca de uma ideia, feita para testar como funciona antes de construir a coisa de verdade.",
            },
            {
              term: "Caso de teste",
              definition: "Um exemplo com uma resposta certa conhecida que você passa pelo seu protótipo para conferir se ele funciona.",
            },
            {
              term: "Iteração",
              definition: "Repetir o ciclo de construir, testar e melhorar, para o projeto ficar melhor a cada vez.",
            },
          ],
          openingScenario: {
            prompt: "Você já tem uma definição do problema: separar a foto de um resíduo em reciclagem, compostagem ou lixo comum. Que pistas (características) o sistema olharia? Que rótulos você ensinaria a ele? E como você saberia, antes de construir qualquer coisa de verdade, se o seu plano presta?",
            context: "Nesta aula você transforma a sua ideia em um plano que dá para testar de fato no papel.",
          },
          predictionPrompt: {
            prompt: "Preveja: quando você testar o seu protótipo pela primeira vez com exemplos complicados, ele vai acertar a maioria ou vai falhar em alguns? Que tipo de exemplo você acha que vai derrubá-lo?",
            howToCheck: "Depois de escrever e \"rodar\" os seus casos de teste, compare o que realmente aconteceu com a sua previsão.",
          },
          concepts: [
            {
              title: "Projete as peças: entradas, saídas, características, rótulos e regras",
              body: [
                "Antes de construir, projete as peças. A entrada é o que entra (a foto de um item). A saída é o que sai (um rótulo: reciclagem, compostagem ou lixo comum). Os rótulos são o conjunto de respostas certas que você ensinaria ao sistema e usaria para conferi-lo.",
                "As características são as pistas que o sistema usa para decidir: o material de um item, o formato dele, ou se está molhado ou engordurado. Se uma parte da tarefa for simples e clara, você pode até acrescentar uma regra: \"se for uma garrafa de vidro limpa, rotule como reciclagem\". Um bom plano aponta tudo isso, para qualquer pessoa entender como uma decisão é tomada.",
              ],
              examples: [
                "Entrada: foto de um item. Saída: um de três rótulos.",
                "Características: material, está molhado, é papel, tem comida em cima.",
                "Regra: \"se for casca de banana, rotule como compostagem\".",
              ],
            },
            {
              title: "Um protótipo é uma primeira versão tosca feita para testar",
              body: [
                "Um protótipo é uma versão rápida e tosca da sua ideia, feita para aprender com ela, e não o produto acabado. O seu pode ser no papel: um conjunto de cartas de \"se tiver estas características, então este rótulo\", ou um fluxograma simples que um colega consiga seguir na mão. A questão é tornar a ideia concreta o bastante para experimentar.",
                "Protótipos são feitos para serem imperfeitos. Fazer um barato e cedo evita que você gaste muito esforço construindo a coisa errada. Você pode jogar um protótipo fora e tudo bem: você ficou com o que aprendeu.",
              ],
              examples: [
                "Um fluxograma no papel: \"É papel? Está molhado? → rótulo\".",
                "Um monte de cartas de decisão que um amigo consiga seguir sem você explicar.",
                "Um rascunho à mão da tela do aplicativo, mostrando a entrada e a saída.",
              ],
            },
            {
              title: "Casos de teste revelam limitações, e a iteração as conserta",
              body: [
                "Um caso de teste é um exemplo com uma resposta certa conhecida. Você o passa pelo seu protótipo e vê se ele dá o rótulo certo. Um punhado de bons casos de teste, incluindo os complicados, mostra rapidinho onde o seu projeto quebra. Esses pontos fracos são as limitações dele: as situações em que ele erra ou não consegue decidir.",
                "Todo sistema tem limitações; o objetivo é achá-las de propósito, e não ser surpreendido por elas depois. Quando um caso de teste falha, você melhora o projeto e testa de novo. Esse ciclo de repetir até melhorar é a iteração, o coração de como os produtos de verdade são feitos.",
              ],
              examples: [
                "Caso de teste: uma caixa de pizza engordurada. Rótulo certo: lixo comum ou compostagem, não reciclagem.",
                "Limitação encontrada: o protótipo rotula todas as caixas como \"reciclagem\", então as engorduradas ficam erradas.",
                "Iteração: acrescentar uma característica de \"tem gordura de comida?\" e uma regra para mandar as caixas engorduradas para outro lugar.",
              ],
            },
          ],
          workedExample: {
            title: "Prototipando e testando um separador de resíduos",
            steps: [
              "Projete as peças: entrada = foto de um item; saída = reciclagem / compostagem / lixo comum; características = material, é papel, está molhado, tem gordura de comida.",
              "Faça um protótipo de papel: cartas de decisão. \"Se for resto de comida → compostagem. Se for papel limpo ou garrafa limpa → reciclagem. Senão → lixo comum\".",
              "Escreva casos de teste com respostas conhecidas: garrafa de água limpa (reciclagem), casca de banana (compostagem), caixa de pizza engordurada (lixo comum), saco de salgadinho metalizado (lixo comum).",
              "Rode os testes na mão: o protótipo acerta a garrafa e a casca de banana, mas rotula a caixa de pizza engordurada como \"reciclagem\", uma falha.",
              "Ache a limitação e itere: acrescente uma característica de \"tem gordura de comida?\" e uma regra para papel engordurado ir para o lixo comum. Rode os casos de teste de novo; agora a caixa de pizza passa.",
            ],
            takeaway: "Projete as peças, faça um protótipo tosco, teste com casos de resposta conhecida, ache as limitações dele, e itere até melhorar.",
          },
          visuals: [
            {
              title: "O ciclo de construir, testar e melhorar",
              summary: "Um ciclo de quatro passos que se repete. Passo 1: projete as peças (entrada, saída, características, rótulos, regras). Passo 2: construa um protótipo tosco. Passo 3: rode os casos de teste e registre quais passam e quais falham. Passo 4: ache as limitações e melhore. Uma seta leva do passo 4 de volta ao passo 2, mostrando a iteração.",
              caption: "Iterar significa dar mais de uma volta neste ciclo, melhorando a cada vez.",
            },
            {
              title: "Uma folha de casos de teste",
              summary: "Uma tabela de casos de teste do separador de resíduos. Cada linha tem um exemplo, o rótulo certo conhecido dele, o rótulo que o protótipo deu, e passou ou falhou. Garrafa de água limpa: certo reciclagem, deu reciclagem, passou. Casca de banana: certo compostagem, deu compostagem, passou. Caixa de pizza engordurada: certo lixo comum, deu reciclagem, falhou. Saco de salgadinho metalizado: certo lixo comum, deu lixo comum, passou.",
              table: {
                columns: [
                  "Caso de teste",
                  "Rótulo certo",
                  "Rótulo do protótipo",
                  "Resultado",
                ],
                rows: [
                  [
                    "Garrafa de água limpa",
                    "Reciclagem",
                    "Reciclagem",
                  ],
                  [
                    "Casca de banana",
                    "Compostagem",
                    "Compostagem",
                  ],
                  [
                    "Caixa de pizza engordurada",
                    "Lixo comum",
                    "Reciclagem",
                    "Falhou",
                  ],
                  [
                    "Saco de salgadinho metalizado",
                    "Lixo comum",
                    "Lixo comum",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "Estúdio do plano de protótipo",
            goal: "Transformar a sua definição do problema em um plano projetado, prototipado e testado que você possa apresentar.",
            overview: "Usando o seu problema da aula 1, você vai projetar as entradas, saídas, características, rótulos e quaisquer regras; rascunhar um protótipo de papel; escrever pelo menos quatro casos de teste, incluindo alguns complicados; \"rodá-los\" na mão; e anotar as limitações que achar e uma melhoria que faria. Isso vira o núcleo do seu Projeto Final.",
            steps: [
              "Projete as peças: aponte a sua entrada, a saída, os rótulos, de três a cinco características, e quaisquer regras simples.",
              "Faça um protótipo de papel: desenhe um fluxograma ou escreva cartas de decisão que um colega consiga seguir sem a sua ajuda.",
              "Escreva pelo menos quatro casos de teste com respostas certas conhecidas, incluindo dois complicados.",
              "Passe cada caso de teste pelo seu protótipo na mão e registre passou ou falhou em uma folha de casos de teste.",
              "Liste as limitações que as falhas revelaram, e escreva uma melhoria que você faria em seguida (a sua iteração).",
            ],
            materials: [
              "Papel e lápis, ou um aplicativo de notas",
            ],
            successCriteria: [
              "Entrada, saída, rótulos, de três a cinco características e quaisquer regras ficam apontados.",
              "Um protótipo de papel que um colega consiga seguir sem explicação extra.",
              "Pelo menos quatro casos de teste com respostas conhecidas, incluindo complicados, rodados e marcados como passou ou falhou.",
              "Pelo menos uma limitação identificada e uma melhoria (iteração) proposta.",
            ],
            dataset: {
              name: "Kit inicial de casos de teste",
              description: "Uma lista já incluída para escrever bons casos de teste: inclua exemplos fáceis, casos-limite (molhado, engordurado, danificado, incomum) e exemplos que poderiam ir para os dois lados. Também inclui um modelo em branco de folha de casos de teste (exemplo, rótulo certo, rótulo do protótipo, passou/falhou) para copiar.",
              columns: [
                "Tipo de caso de teste",
                "Por que incluir",
                "Exemplo de proposta",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Confira se você sabe planejar, prototipar e testar um projeto.",
            questions: [
              {
                prompt: "Quais destas coisas você deve projetar antes de construir o seu sistema? (Escolha todas que se aplicam.)",
                explanation: "Entradas, saídas, características e rótulos fazem todos parte do projeto. Os slides da apresentação vêm depois e não fazem parte de projetar como as decisões são tomadas.",
                choices: [
                  {
                    text: "A entrada que o sistema recebe",
                    explanation: "Correto: apontar a entrada é uma parte central do projeto.",
                  },
                  {
                    text: "A saída que ele devolve",
                    explanation: "Correto: a saída, incluindo o conjunto de rótulos, precisa ser projetada.",
                  },
                  {
                    text: "As características que ele usa para decidir",
                    explanation: "Correto: as características são as pistas que o sistema usa, então fazem parte do projeto.",
                  },
                  {
                    text: "A cor dos slides da sua apresentação",
                    explanation: "A cor dos slides é sobre apresentar depois, e não sobre como o sistema decide.",
                  },
                ],
              },
              {
                prompt: "Coloque em ordem o ciclo de construir, testar e melhorar para uma rodada de prototipagem.",
                explanation: "Você projeta as peças, constrói um protótipo tosco, roda os casos de teste, e então acha limitações e melhora; e o ciclo pode se repetir.",
                items: [
                  {
                    text: "Projetar as peças (entrada, saída, características, rótulos, regras)",
                  },
                  {
                    text: "Construir um protótipo tosco",
                  },
                  {
                    text: "Rodar os casos de teste e registrar passou ou falhou",
                  },
                  {
                    text: "Achar limitações e melhorar o projeto",
                  },
                ],
              },
              {
                prompt: "O que a equipe deve fazer em seguida?",
                scenario: "O protótipo de papel de uma equipe passa em todos os casos de teste fáceis, mas rotula uma caixa de pizza engordurada como \"reciclagem\" quando a resposta certa é lixo comum.",
                explanation: "Um caso de teste que falhou revelou uma limitação. A resposta certa é iterar: melhorar o projeto (acrescentar uma característica ou regra de gordura) e testar de novo, e não esconder nem ignorar a falha.",
                choices: [
                  {
                    text: "Ignorar a caixa engordurada porque os casos fáceis passaram",
                    explanation: "Ignorar uma falha conhecida deixa uma limitação real dentro do projeto.",
                  },
                  {
                    text: "Melhorar o projeto para lidar com gordura, e depois rodar os casos de teste de novo",
                    explanation: "Correto: isso é iterar, consertar a limitação que o teste revelou e testar de novo.",
                  },
                  {
                    text: "Apagar o caso de teste da caixa de pizza engordurada para ele passar",
                    explanation: "Tirar um caso de teste difícil esconde o problema em vez de consertá-lo.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Quebre o seu próprio protótipo",
            prompt: "Esforce-se para fazer o seu próprio protótipo falhar, e depois use o que aprender para melhorá-lo.",
            steps: [
              "Escreva três casos de teste especialmente complicados, pensados para derrubar o seu protótipo.",
              "Rode-os na mão e registre quais falham.",
              "Para cada falha, aponte a limitação que ela revela.",
              "Proponha uma mudança (uma iteração) e preveja se ela consertaria as falhas.",
            ],
            successCriteria: [
              "Três casos de teste complicados que pressionem o protótipo.",
              "Cada falha ligada a uma limitação apontada.",
              "Uma iteração proposta, com uma previsão do efeito dela.",
            ],
          },
          reflection: [
            {
              prompt: "Por que é útil construir um protótipo tosco em vez de pular direto para a versão acabada?",
            },
            {
              prompt: "Qual caso de teste te ensinou mais sobre as limitações do seu projeto, e por quê?",
            },
          ],
          recap: {
            summary: "Você transforma um problema em um plano testável projetando as peças, construindo um protótipo tosco, rodando casos de teste de resposta conhecida, e iterando para consertar as limitações que achar.",
            keyPoints: [
              "Projete a entrada, a saída, os rótulos, as características e quaisquer regras antes de construir.",
              "Um protótipo é uma versão tosca, feita barato, para testar uma ideia cedo.",
              "Casos de teste revelam limitações; iteração é o ciclo de melhorar até ficar melhor.",
            ],
          },
          extension: {
            title: "Quanto teste é suficiente?",
            body: [
              "Equipes de verdade não conseguem testar todas as entradas possíveis, então escolhem os casos de teste com cuidado: casos comuns, casos-limite, e casos em que um erro pesaria mais. Uma IA médica é testada com muito mais rigor do que um joguinho que sugere emojis.",
              "Para o seu projeto, decida quais casos de teste importam mais e por quê. Escreva um breve \"plano de teste\" explicando quanto teste você acha que basta antes que pessoas usuárias reais pudessem confiar neste sistema.",
            ],
          },
        },
        {
          title: "Apresente, revise e explore as carreiras em IA",
          summary: "Termine com força: apresente o seu projeto com honestidade, incluindo as limitações dele e a supervisão humana de que ele precisa, dê e receba retorno útil, e explore o que as pessoas que constroem, regulam e projetam IA realmente fazem.",
          estimatedTime: "50-65 minutos",
          objectives: [
            {
              text: "Apresentar um projeto com clareza: o problema, o seu projeto, os seus testes e as limitações dele.",
            },
            {
              text: "Explicar a supervisão e o uso responsável de que o seu projeto precisa para ser confiável.",
            },
            {
              text: "Dar e receber um retorno específico, gentil e útil em uma revisão.",
            },
            {
              text: "Descrever várias carreiras reais em IA: as pessoas que constroem, regulam e projetam IA.",
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
              name: "O seu plano e os seus resultados de teste da aula 2",
              note: "Você vai apresentá-los.",
            },
          ],
          vocabulary: [
            {
              term: "Limitação",
              definition: "Uma situação em que um sistema erra, não consegue decidir, ou não deveria ser considerado confiável; algo que projetos honestos dizem abertamente.",
            },
            {
              term: "Supervisão",
              definition: "Uma pessoa continuar responsável por conferir e corrigir as decisões de uma IA, principalmente quando um erro pode pesar.",
            },
            {
              term: "Uso responsável",
              definition: "Usar a IA de um jeito justo, honesto e seguro, que respeite a privacidade das pessoas, deixando claro o que ela pode e o que não pode fazer.",
            },
            {
              term: "Carreira em IA",
              definition: "Um trabalho em que as pessoas constroem, estudam, regulam ou projetam sistemas de IA e o modo como eles são usados.",
            },
          ],
          openingScenario: {
            prompt: "Duas equipes apresentam projetos de separação de resíduos. Uma diz: \"Funciona perfeitamente!\". A outra diz: \"Ele acerta na maioria das vezes, mas tem dificuldade com papel engordurado, então uma pessoa confere esses casos\". Em qual equipe você confia mais, e por quê?",
            context: "Uma apresentação honesta, que aponta limitações e supervisão, ganha mais confiança do que uma promessa grandiosa.",
          },
          predictionPrompt: {
            prompt: "Preveja: os projetos mais fortes vão ser os que garantem não errar, ou os que explicam com clareza as limitações deles e como uma pessoa fica de olho?",
            howToCheck: "Enquanto lê, repare por que apontar limitações e supervisão deixa um projeto mais confiável, e não menos.",
          },
          concepts: [
            {
              title: "Apresente com honestidade: problema, projeto, testes e limitações",
              body: [
                "Uma apresentação forte conta uma história clara: aqui está a necessidade da pessoa usuária e a definição do problema, aqui está o meu projeto (entrada, saída, características, rótulos, regras), foi assim que testei, e foi isto que encontrei, incluindo as limitações. Apontar limitações não é fraqueza; mostra que você entende o seu próprio sistema.",
                "Evite prometer demais. \"Funciona perfeitamente\" quase nunca é verdade e perde a confiança no instante em que alguém acha uma falha. \"Acerta na maioria dos casos, mas tem dificuldade com X\" é honesto, e é exatamente o que um público atento quer ouvir.",
              ],
              examples: [
                "\"Entrada: a foto de um item. Saída: reciclagem, compostagem ou lixo comum.\"",
                "\"Passou em 7 de 9 casos de teste; falha com papel engordurado e alumínio brilhante.\"",
                "\"Como ele pode errar, uma pessoa confere os casos duvidosos.\"",
              ],
            },
            {
              title: "Supervisão e uso responsável tornam um projeto confiável",
              body: [
                "Como a IA pode errar ou ser injusta, um projeto responsável planeja a supervisão humana: uma pessoa continua responsável por conferir e corrigir a IA, principalmente onde um erro pode pesar. A sua apresentação deve dizer quem supervisiona o sistema e quando.",
                "Uso responsável também significa ser justo, ser honesto sobre o que o sistema consegue fazer, proteger a privacidade das pessoas, e não usar IA onde os riscos são altos demais. Amarre tudo do curso: justiça, privacidade, limitações e decisões humanas aparecem no quanto um projeto é projetado e descrito com responsabilidade.",
              ],
              examples: [
                "\"Um aluno revisa qualquer item sobre o qual o separador esteja em dúvida, antes de ele ser jogado fora.\"",
                "\"Não coletamos o nome nem o rosto de ninguém, só fotos dos itens.\"",
                "\"Nunca usaríamos isto para decidir algo sério sobre uma pessoa.\"",
              ],
            },
            {
              title: "Revisões funcionam melhor com retorno específico e gentil, e a IA também é uma carreira",
              body: [
                "Em uma revisão, você dá e recebe retorno. Um retorno útil é específico (\"o seu caso de teste do papel engordurado é um ótimo achado; dá para acrescentar uma regra para ele?\") em vez de vago (\"está bom\") ou duro. Receber bem o retorno significa ouvir, fazer perguntas e tratá-lo como ajuda, e não como ataque. A iteração continua aqui: as revisões muitas vezes dão a faísca da sua próxima melhoria.",
                "Construir IA também é uma área de trabalho em crescimento. Quem faz engenharia de aprendizado de máquina e ciência de dados constrói e treina modelos. Quem rotula e anota dados cria os exemplos rotulados com que os sistemas aprendem. Quem trabalha com ética da IA, auditoria e políticas públicas regula a IA, conferindo justiça, segurança e privacidade, e escrevendo as regras de como ela pode ser usada. Quem projeta produto e experiência do usuário decide como as pessoas realmente interagem com a IA e mantêm o controle. Professores, médicos, artistas e muitas outras pessoas usam cada vez mais a IA como ferramenta. Você não precisa ser programador para influenciar como a IA é construída e usada.",
              ],
              examples: [
                "Engenheira de aprendizado de máquina: constrói e treina o modelo.",
                "Pessoa que rotula ou anota dados: cria os exemplos rotulados para o aprendizado.",
                "Especialista em ética da IA ou auditor: confere se os sistemas são justos, seguros e respeitam a privacidade.",
                "Designer de produto ou de experiência do usuário: projeta como as pessoas usam a IA e mantêm a supervisão.",
              ],
            },
          ],
          workedExample: {
            title: "Uma apresentação confiável de dois minutos",
            steps: [
              "Enuncie o problema: \"Alunos novos não sabem em qual lixeira o resíduo deles vai, então separamos uma foto em reciclagem, compostagem ou lixo comum\".",
              "Mostre o projeto: \"A entrada é a foto de um item; a saída é um de três rótulos; as características incluem o material e a gordura de comida\".",
              "Relate os testes: \"Rodamos nove casos de teste e passamos em sete; ele falha com papel engordurado e alumínio\".",
              "Aponte as limitações e a supervisão: \"Esses são limites reais, então uma pessoa confere qualquer item sobre o qual ele esteja em dúvida, antes de jogar fora\".",
              "Feche com o uso responsável: \"Coletamos só fotos de itens, nunca rostos ou nomes, e não usaríamos isto para nada de alto risco\".",
            ],
            takeaway: "A apresentação mais confiável enuncia o problema, o projeto, resultados de teste honestos, as limitações, e a supervisão humana que mantém o uso responsável.",
          },
          visuals: [
            {
              title: "Prometer demais contra apresentar com honestidade",
              summary: "Antes (prometendo demais): \"Nossa IA separa resíduos perfeitamente!\": sem limitações, sem supervisão, e ela perde a confiança no instante em que alguém acha uma falha. Depois (honesto): \"Ela passa na maioria dos casos, mas falha com papel engordurado e alumínio, então uma pessoa confere os itens duvidosos, e usamos só fotos dos itens\": enuncia limitações, supervisão e uso responsável, e ganha mais confiança.",
              caption: "Ser honesto sobre limites e supervisão deixa um projeto mais confiável, e não menos.",
            },
            {
              title: "Quem constrói e regula a IA",
              summary: "Uma tabela de carreiras em IA. Engenharia de aprendizado de máquina: constrói e treina modelos; a habilidade central é projetar e testar sistemas. Rotulagem e anotação de dados: cria os exemplos rotulados; a habilidade central é rotular com cuidado e consistência. Ética e auditoria da IA: regula a IA quanto a justiça, segurança e privacidade; a habilidade central é perceber danos e definir regras. Design de produto e de experiência do usuário: projeta como as pessoas usam a IA e mantêm a supervisão; a habilidade central é entender as pessoas usuárias.",
              table: {
                columns: [
                  "Função",
                  "O que faz",
                  "Uma habilidade que usa",
                ],
                rows: [
                  [
                    "Engenharia de aprendizado de máquina",
                    "Constrói e treina modelos",
                    "Projetar e testar sistemas",
                  ],
                  [
                    "Rotulagem e anotação de dados",
                    "Cria os exemplos rotulados",
                    "Rotular com cuidado e consistência",
                  ],
                  [
                    "Ética e auditoria da IA",
                    "Regula a IA quanto a justiça e segurança",
                    "Perceber danos, definir regras",
                  ],
                  [
                    "Design de produto e experiência do usuário",
                    "Projeta como as pessoas usam a IA",
                    "Entender pessoas usuárias reais",
                  ],
                ],
              },
            },
          ],
          activity: {
            title: "Estúdio de apresentação e revisão",
            goal: "Apresentar o seu projeto com honestidade e dar e receber um retorno específico e útil usando uma rubrica de revisão.",
            overview: "Você vai preparar uma apresentação curta e honesta do seu projeto (problema, projeto, testes, limitações, supervisão e uso responsável) e depois participar de uma revisão, dando a outras equipes um retorno específico e gentil e recebendo o delas, com uma lista compartilhada. As revisões daqui podem dar a faísca de mais uma iteração antes do Projeto Final.",
            steps: [
              "Prepare uma apresentação de dois minutos cobrindo problema, projeto, resultados de teste, limitações, supervisão e uso responsável.",
              "Apresente para um colega ou um grupo pequeno.",
              "Como revisor, use a lista de revisão para dar pelo menos dois comentários específicos e gentis por projeto.",
              "Como apresentador, anote o retorno que receber e escolha uma melhoria para fazer (a sua próxima iteração).",
              "Conversem sobre com quais carreiras em IA cada projeto se conecta e quais interessam a vocês.",
            ],
            materials: [
              "Papel e lápis, ou um aplicativo de notas",
            ],
            successCriteria: [
              "Uma apresentação que inclua limitações, supervisão e uso responsável, e não só o que funciona.",
              "Pelo menos dois comentários específicos e gentis dados a outras pessoas.",
              "O retorno recebido fica anotado e uma próxima melhoria é escolhida.",
              "Pelo menos uma carreira em IA com que o seu projeto se conecta é apontada.",
            ],
            dataset: {
              name: "Rubrica de revisão de projetos",
              description: "Uma lista de revisão já incluída que as equipes usam para dar retorno. As linhas cobrem: definição clara do problema; entrada, saída, rótulos e características sensatos; resultados de teste honestos; limitações apontadas; um plano de supervisão humana; e uso responsável (justiça, privacidade, honestidade). Cada linha tem uma proposta e espaço para um comentário específico.",
              columns: [
                "Área de revisão",
                "O que procurar",
                "Comentário específico",
              ],
            },
          },
          knowledgeCheck: {
            instructions: "Confira se você sabe apresentar com responsabilidade e descrever o trabalho real com IA.",
            questions: [
              {
                prompt: "Por que a apresentação de um projeto deve incluir as limitações dele?",
                explanation: "Apontar limitações com honestidade constrói confiança e mostra que você entende o seu próprio sistema; escondê-las sai pela culatra quando uma falha aparece.",
                choices: [
                  {
                    text: "Para o projeto parecer fraco e ninguém fazer perguntas",
                    explanation: "Apontar limitações não é sobre parecer fraco; mostra compreensão e honestidade.",
                  },
                  {
                    text: "Porque honestidade sobre os limites constrói confiança e mostra que você entende o sistema",
                    explanation: "Correto: limites honestos conquistam confiança e provam que você sabe como o seu sistema se comporta.",
                  },
                  {
                    text: "Porque todo projeto é obrigado a falhar",
                    explanation: "Projetos não são obrigados a falhar; são obrigados a ser honestos sobre limites reais.",
                  },
                  {
                    text: "Para você não precisar testar",
                    explanation: "As limitações são achadas justamente testando; apontá-las não substitui os testes.",
                  },
                ],
              },
              {
                prompt: "Decida se a afirmação é verdadeira ou falsa.",
                statement: "Você precisa ser programador de computadores para ter qualquer papel na construção ou na regulação da IA.",
                explanation: "Falso: quem rotula dados, quem trabalha com ética, auditoria, políticas públicas e design molda a IA sem necessariamente programá-la.",
              },
              {
                prompt: "Qual resposta dá o retorno de revisão mais útil?",
                scenario: "Um colega apresenta um detector de doenças de plantas que passou na maioria dos testes, mas não foi testado com fotos borradas, e não há plano de quem confere as decisões dele.",
                explanation: "Um retorno específico aponta uma lacuna real e sugere um próximo passo concreto, diferente de um elogio vago ou de uma rejeição dura.",
                choices: [
                  {
                    text: "\"Está bom.\"",
                    explanation: "Um elogio vago não dá a quem apresenta nada em que agir.",
                  },
                  {
                    text: "\"Acrescente um caso de teste com foto borrada e diga quem supervisiona os resultados duvidosos.\"",
                    explanation: "Correto: é específico, gentil, e aponta iterações concretas.",
                  },
                  {
                    text: "\"Isso nunca vai funcionar, nem se dê ao trabalho.\"",
                    explanation: "Duro e vago: não é específico e não ajuda o projeto a melhorar.",
                  },
                ],
              },
            ],
          },
          challenge: {
            title: "Conheça um trabalho com IA",
            prompt: "Pesquise uma carreira em IA e conecte-a ao projeto que você criou nesta semana.",
            steps: [
              "Escolha uma função: engenharia de aprendizado de máquina, rotulagem de dados, ética ou auditoria de IA, políticas públicas, ou design de produto e experiência do usuário em IA.",
              "Escreva três a quatro frases sobre o que essa pessoa faz no dia a dia e uma habilidade que ela usa.",
              "Explique de qual parte do seu próprio projeto essa função cuidaria.",
              "Anote uma coisa sobre esse trabalho que você gostaria de conhecer melhor.",
            ],
            successCriteria: [
              "Uma função de IA descrita com precisão, junto com uma habilidade que ela usa.",
              "Uma ligação clara entre a função e uma parte do seu projeto.",
              "Uma pergunta genuína que você tem sobre essa carreira.",
            ],
          },
          reflection: [
            {
              prompt: "Em todo o curso, qual é a coisa mais importante que você vai levar sobre usar a IA com responsabilidade?",
            },
            {
              prompt: "Qual carreira em IA parece mais interessante para você, e o que você gostaria de aprender em seguida para explorá-la?",
            },
          ],
          recap: {
            summary: "Um projeto terminado é apresentado com honestidade (problema, projeto, testes, limitações, supervisão e uso responsável), melhorado pela revisão, e conectado às pessoas reais que constroem e regulam a IA.",
            keyPoints: [
              "Apresente o problema, o projeto e resultados de teste honestos, incluindo as limitações.",
              "Planeje a supervisão humana e o uso responsável para o projeto poder ser confiável.",
              "A IA é construída e regulada por muitas funções, e não só por quem programa.",
            ],
          },
          extension: {
            title: "Escreva o rótulo de \"uso responsável\" do seu projeto",
            body: [
              "Alguns sistemas de IA já são publicados com uma breve \"ficha do modelo\" ou rótulo de uso: para que o sistema serve, para que não serve, quais são as limitações conhecidas dele, e quem é responsável por supervisioná-lo.",
              "Escreva um rótulo de uso responsável de um parágrafo para o seu próprio projeto. Diga para que ele deve e não deve ser usado, as principais limitações dele, quem faz a supervisão, e como ele protege a privacidade das pessoas.",
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

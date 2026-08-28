import type {
  EngineeringCurriculum,
  EngineeringLesson,
} from "./index.ts"
import { engineeringFundamentalsCurriculum } from "./index.ts"
import {
  createLocalizedResolver,
  hasLocaleOverlay,
  type DeepPartial,
  type LocaleOverlays,
} from "../../../lib/localize-content.ts"
import type { Language } from "../../../i18n/translations.ts"

/**
 * Translations for the Engineering Fundamentals course.
 *
 * Sparse overlays merged onto the English `engineeringFundamentalsCurriculum` by
 * `lib/localize-content`. Only prose lives here: slugs, week numbers, hrefs,
 * answer keys, and diagram/accent identifiers stay shared with English so the
 * course cannot structurally drift between locales.
 *
 * Untranslated strings fall through to English automatically, so this file can
 * grow one week at a time.
 */
const es: DeepPartial<EngineeringCurriculum> = {
  title: "Fundamentos de Ingeniería",
  subtitle: "Aprende cómo los ingenieros diseñan, construyen, prueban y mejoran soluciones a través de seis retos prácticos.",
  description: "Un curso práctico de ingeniería de 6 semanas donde los estudiantes aprenden a pensar como ingenieros de verdad construyendo, probando y rediseñando estructuras, máquinas y soluciones con materiales de todos los días.",
  gradeRange: "2.º a 5.º grado",
  duration: "6 semanas",
  estimatedTimePerLesson: "45-75 minutos",
  requirement: "Materiales de construcción comunes, sin computadora",
  summary: "Los estudiantes aprenden ingeniería como trabajan los ingenieros de verdad: reciben un reto, dibujan un plan, construyen una primera versión, la prueban con mediciones reales y mejoran el diseño. Cada semana gira en torno a un proyecto hecho con materiales baratos y cotidianos (papel, cartón, cinta y cuerda) y una gran idea de la ingeniería, de la estabilidad a las máquinas simples y al vuelo. El curso termina con un reto final que combina todo en un solo diseño de misión de rescate.",
  format: [
    "Una idea de ingeniería y una construcción por semana, en un orden que va sumando habilidades.",
    "Cada lección sigue el mismo proceso de diseño: preguntar, imaginar, planear, construir, probar y mejorar.",
    "Los estudiantes prueban lo que construyen con mediciones reales y anotan los resultados.",
    "El rediseño es parte del curso: la primera versión nunca es la versión final.",
    "Todos los proyectos usan materiales comunes y baratos, sin computadora ni kit especial.",
  ],
  learningGoals: [
    "Explicar qué hacen los ingenieros",
    "Usar el proceso de diseño de ingeniería",
    "Construir y probar estructuras simples",
    "Entender las fuerzas, las cargas y la estabilidad",
    "Comparar materiales",
    "Mejorar un diseño después de una falla",
    "Resolver problemas con restricciones",
    "Completar un reto final de diseño de ingeniería",
  ],
  materials: [
    "Papel de impresora o papel de construcción, y fichas",
    "Cartón (cajas de cereal, cajas de envío) y cartulina",
    "Cinta de papel y cinta adhesiva transparente",
    "Cuerda, estambre y ligas",
    "Palitos de manualidades (palitos de paleta) y palillos de madera o popotes",
    "Tijeras, una regla y lápices",
    "Vasos de papel, platos de papel pequeños y clips o broches de mariposa",
    "Monedas, arandelas o pesos pequeños para las pruebas de carga",
    "Algodón, arena o grava, y un vaso transparente para la lección del filtro de agua",
    "Un cuaderno de dibujo o las hojas de planeación imprimibles de cada lección",
  ],
  materialGroups: [
    {
      label: "Materiales básicos",
      items: [
        "Papel",
        "Cartón",
        "Cinta adhesiva",
        "Tijeras",
        "Regla",
        "Lápiz",
      ],
    },
    {
      label: "Materiales de construcción",
      items: [
        "Palitos de paleta",
        "Popotes",
        "Fichas",
        "Vasos de papel",
        "Clips",
      ],
    },
    {
      label: "Materiales de movimiento",
      items: [
        "Cuerda",
        "Ligas",
        "Broches de mariposa",
        "Objetos pequeños para levantar",
      ],
    },
    {
      label: "Materiales de prueba",
      items: [
        "Monedas",
        "Arandelas",
        "Libros",
        "Cinta métrica",
        "Pesos pequeños",
      ],
    },
    {
      label: "Materiales opcionales",
      items: [
        "Filtros de café",
        "Bolas de algodón",
        "Grava",
        "Arena",
        "Huevos de plástico",
        "Pelotas de ping pong",
      ],
    },
  ],
  materialProperties: [
    {
      name: "Papel",
      property: "Ligero y se dobla con facilidad. Es mucho más fuerte cuando lo doblas o lo enrollas.",
    },
    {
      name: "Cartón",
      property: "Más fuerte que el papel. Sirve para paneles, plataformas y bases.",
    },
    {
      name: "Popotes",
      property: "Ligeros y prácticos para armazones, pero se doblan si nada los sostiene.",
    },
    {
      name: "Palitos de paleta",
      property: "Fuertes como vigas y difíciles de doblar, pero más pesados que el papel.",
    },
    {
      name: "Cuerda",
      property: "Excelente para jalar, pero no puede empujar: simplemente se afloja.",
    },
    {
      name: "Cinta adhesiva",
      property: "Útil para unir piezas, pero las uniones pueden fallar si les pones demasiada carga.",
    },
    {
      name: "Ligas",
      property: "Se estiran para guardar energía y jalan las piezas de regreso.",
    },
  ],
  materialsNote: "No necesitas todos los materiales para empezar. Cada lección incluye sustituciones.",
  planningPrompts: [
    "Dibuja tu idea antes de construirla. Un boceto rápido es suficiente.",
    "Señala la parte más fuerte de tu diseño y la parte de la que menos seguro estás.",
    "Predice qué podría fallar primero cuando lo pruebes.",
    "Decide qué material va en cada lugar y por qué ese material sirve para ese trabajo.",
  ],
  designProcess: [
    {
      description: "Lee el reto y sus reglas. ¿Qué tiene que funcionar y qué no tienes permitido hacer?",
    },
    {
      title: "Imagina",
      description: "Piensa en varias formas distintas de resolverlo. Los ingenieros nunca empiezan con una sola idea.",
    },
    {
      title: "Planea",
      description: "Dibuja tu diseño y ponle nombre a las partes. Decide qué materiales necesita cada parte.",
    },
    {
      title: "Crea",
      description: "Construye una primera versión, un prototipo. No tiene que ser perfecto; tiene que poder probarse.",
    },
    {
      title: "Prueba",
      description: "Haz siempre la misma prueba justa y anota lo que realmente pasó.",
    },
    {
      title: "Mejora",
      description: "Usa lo que te mostró la prueba para cambiar una sola cosa, y prueba otra vez. Eso es rediseñar.",
    },
  ],
  lessons: [
    {
      title: "Piensa como un ingeniero",
      projectName: "Reto de la torre de papel",
      summary: "Los estudiantes conocen el proceso de diseño de ingeniería construyendo la torre más alta que puedan con unas hojas de papel y un poco de cinta, y luego la rediseñan para que quede más alta y más firme.",
      estimatedTime: "45-60 minutos",
      concepts: [
        {
          term: "Proceso de diseño de ingeniería",
          definition: "Los pasos que los ingenieros repiten para resolver un problema: preguntar, imaginar, planear, construir, probar y mejorar.",
        },
        {
          term: "Estabilidad",
          definition: "Qué tan bien se mantiene algo de pie sin volcarse. Una base ancha y baja es más estable.",
        },
        {
          term: "Prototipo",
          definition: "Una primera versión de un diseño que construyes para poder probarla y aprender de ella.",
        },
        {
          term: "Rediseño",
          definition: "Cambiar tu diseño después de una prueba para que funcione mejor, en lugar de empezar de cero.",
        },
      ],
      designBrief: "Construye la torre de papel más alta que puedas y que se sostenga sola durante al menos diez segundos. Después usa lo que aprendiste al probarla para construir una segunda versión mejor.",
      problem: "Tu equipo tiene un montón de papel y un poco de cinta, y una sola tarea: construir la torre más alta que puedan y que se sostenga sola. Tiene que quedarse firme al menos diez segundos sin que nadie la toque. Mientras más alta, mejor, pero una torre alta que se cae no cuenta.",
      realWorldConnection: {
        intro: "Todo lo que es alto tiene que resolver el mismo problema que tu torre: cómo mantenerse de pie sin volcarse. Los ingenieros que diseñan estructuras altas dedican casi todo su esfuerzo a la base y al equilibrio, no a la punta.",
        appearsIn: [
          "Rascacielos",
          "Torres de telefonía y de radio",
          "Torres de vigilancia",
          "Grúas de construcción",
        ],
      },
      constraints: [
        "Usa solo el papel y la cinta que te dieron (por ejemplo, 5 hojas de papel y 30 cm de cinta).",
        "La torre tiene que sostenerse sola: no puede recargarse en una pared ni la puedes detener con la mano.",
        "Nada de otros materiales, y no puedes acortar la torre para apuntalarla.",
      ],
      materials: [
        "Papel",
        "Cinta adhesiva",
        "Tijeras",
        "Regla",
        "Monedas o pesos pequeños",
      ],
      substitutions: [
        "Fichas en lugar de papel",
        "Libros o bloques pequeños en lugar de monedas",
      ],
      buildSteps: [
        "Empieza por la base. Decide qué tan ancha hacerla: una base más ancha es más difícil de volcar.",
        "Elige cómo usar tu papel: tubos enrollados, columnas dobladas, tiras planas o una mezcla. No hay una sola forma correcta.",
        "Construye por secciones que puedas probar, en lugar de armar toda la torre de una vez.",
        "Usa cinta solo donde se unen las piezas. Demasiada cinta cerca de la punta agrega peso justo donde no lo quieres.",
        "Párala conforme avanzas para revisar que no esté inclinada antes de seguir subiendo.",
      ],
      redesignPrompts: [
        "Si se volcó, ensancha la base o baja más peso hacia abajo.",
        "Si se hundió o se dobló a la mitad, agrega un doblez o un soporte para endurecer esa sección.",
        "Si la punta se venció, usa menos papel arriba para que la torre pese menos donde es más débil.",
        "Cambia una sola cosa y vuelve a probar, así sabes qué fue lo que de verdad ayudó.",
      ],
      realWorldExamples: [
        "Los rascacielos tienen una base ancha y pesada para que el viento no los tumbe.",
        "Las torres de telefonía y de radio usan un armazón reforzado con triángulos para ser altas sin caerse.",
        "Un cono de tránsito es ancho abajo y ligero arriba, por eso es difícil tumbarlo.",
      ],
      testingChallenges: [
        {
          test: "Prueba de altura",
          howTo: "Para la torre terminada sobre una mesa plana y mide desde la mesa hasta la punta.",
          measure: "Altura en centímetros",
        },
        {
          test: "Prueba de sostenerse sola",
          howTo: "Suéltala por completo y empieza a contar.",
          measure: "Cuántos segundos se sostiene antes de caerse (meta: 10 o más)",
        },
        {
          test: "Prueba de bamboleo",
          howTo: "Sopla suavemente sobre la torre desde la distancia de un brazo.",
          measure: "¿Se mece y se recupera, o se cae?",
        },
      ],
      reflectionQuestions: [
        "¿Qué hizo que tu torre fuera estable o inestable?",
        "¿Qué forma o qué base funcionó mejor?",
        "¿Qué falló primero?",
        "¿Qué mejoraste después de probarla?",
        "¿En qué fue mejor tu segundo diseño que el primero?",
      ],
      extensionChallenges: [
        "Reconstruye tu torre para que sostenga una moneda hasta arriba sin caerse.",
        "Intenta superar tu mejor altura usando una hoja de papel menos.",
        "Diseña una torre que aguante tanto un golpecito en la mesa como un soplido.",
      ],
      teacherNotes: "La meta de la primera semana es el proceso, no la torre más alta. Dale a los estudiantes una primera construcción corta, luego detén al grupo para probar y conversar antes de dejarlos reconstruir: el rediseño es donde ocurre el aprendizaje. Error común: enrollar el papel en tubos delgados que quedan altos pero se caen de inmediato; guía a los estudiantes hacia una base más ancha. Anímalos a hacer un boceto rápido antes de usar la cinta.",
      teacherGuide: {
        setup: [
          "Despeja una mesa plana para cada estudiante o equipo y reparte 5 hojas de papel y unos 30 cm de cinta a cada uno.",
          "Arma una sola estación de pruebas con una regla o cinta métrica para que todas las torres se midan igual.",
          "Planea la sesión en dos rondas: una primera construcción (unos 10 minutos), una pausa para probar y conversar, y luego un rediseño (unos 10 minutos).",
        ],
        materialsPrep: [
          "Corta la cinta de antemano en tiras de 30 cm para no perder tiempo desenrollándola.",
          "Ten un vasito con monedas en la estación de pruebas para la prueba opcional de sostener una moneda arriba.",
        ],
        safetyNotes: [
          "El riesgo es bajo en general. Las tijeras se quedan sobre la mesa y se pasan con el mango por delante.",
        ],
        learningObjectives: [
          "Nombrar los pasos del proceso de diseño de ingeniería y reconocer que un primer intento es un prototipo.",
          "Explicar que una base más ancha y más baja hace que una torre sea más estable.",
          "Cambiar un diseño con base en lo que mostró una prueba, en lugar de adivinar.",
        ],
        commonFailures: [
          "Tubos delgados enrollados que quedan altos pero se caen de inmediato: la base es demasiado angosta.",
          "Demasiada cinta cerca de la punta, que agrega peso justo donde la torre es más débil.",
          "Construir toda la torre antes de probarla, así que una falla aparece hasta el final.",
        ],
        questionsToAsk: [
          "\"¿A dónde se va el peso?\", los lleva a pensar en la base y el equilibrio.",
          "\"¿Qué parte falló primero cuando se cayó?\"",
          "\"¿Qué cambió entre tu primera torre y la segunda?\"",
          "\"¿Cómo podrías hacerla más alta con la misma cantidad de papel?\"",
        ],
        easierVersion: "Da una altura meta que alcanzar (por ejemplo, 30 cm) en lugar de \"lo más alta posible\", y deja que los estudiantes empiecen con tubos de papel ya enrollados.",
        harderVersion: "Pide que la torre sostenga una moneda arriba durante 10 segundos, o limita la cinta a 15 cm para que la elección de materiales pese más.",
        cleanup: [
          "Aplana y recicla las torres de papel; guarda como reúso las hojas que no tengan cinta.",
          "Junta las monedas y las reglas de vuelta en la estación de pruebas.",
        ],
      },
    },
    {
      comparedMaterials: [
        "Palitos de paleta",
        "Popotes",
        "Cartón",
        "Papel",
        "Cinta adhesiva",
      ],
      title: "Constrúyelo fuerte",
      projectName: "Reto de resistencia: puente o plataforma",
      summary: "Los estudiantes descubren por qué los triángulos y los buenos soportes hacen fuertes a las estructuras, construyendo un puente o una plataforma pequeña que tiene que aguantar todo el peso posible sin colapsar.",
      estimatedTime: "50-60 minutos",
      concepts: [
        {
          term: "Estructura",
          definition: "Algo construido para sostenerse a sí mismo y cargar un peso, como un puente o un estante.",
        },
        {
          term: "Carga",
          definition: "El peso que una estructura tiene que soportar, incluido su propio peso.",
        },
        {
          term: "Soporte",
          definition: "Una pieza que sostiene la carga y pasa la fuerza hacia el suelo.",
        },
        {
          term: "Refuerzo triangular",
          definition: "Agregar formas de triángulo a un diseño, porque los triángulos conservan su forma bajo carga mejor que los cuadrados.",
        },
        {
          term: "Resistencia del material",
          definition: "Cuánta fuerza aguanta un material antes de doblarse o romperse. La forma puede hacer que un material débil actúe como uno fuerte.",
        },
      ],
      designBrief: "Construye un puente o una plataforma elevada que cruce un hueco de unos 20 cm y aguante la mayor cantidad posible de monedas (o arandelas) antes de doblarse demasiado o colapsar.",
      problem: "Un pueblo pequeño quedó incomunicado por un hueco (un arroyo, un barranco, un camino que se lavó) y necesita que le lleguen provisiones al otro lado. Tu trabajo es construir un puente o una plataforma elevada que cruce el hueco y aguante todo el peso posible sin doblarse demasiado ni colapsar.",
      realWorldConnection: {
        intro: "Toda estructura que sostiene algo está resolviendo el problema de tu puente: cargar un peso a lo largo de una distancia sin doblarse ni romperse. Las mismas ideas sostienen un librero y un puente de carretera.",
        appearsIn: [
          "Puentes",
          "Estantes",
          "Techos",
          "Mesas",
          "Juegos de parque",
        ],
      },
      constraints: [
        "El puente tiene que cruzar un hueco fijo, por ejemplo, la distancia entre dos pilas de libros.",
        "Usa solo los materiales que te dieron (palitos de manualidades, papel, fichas y cinta).",
        "La carga tiene que descansar sobre la plataforma, no ir pegada con cinta ni amarrada.",
      ],
      materials: [
        "Palitos de paleta",
        "Popotes",
        "Fichas",
        "Cinta adhesiva",
        "Cuerda",
        "Vasos o libros para los soportes",
        "Monedas, arandelas o pesos pequeños",
      ],
      substitutions: [
        "Tubos de papel enrollado en lugar de popotes",
        "Pilas de libros en lugar de vasos para los soportes",
        "Arandelas o tuercas de metal en lugar de monedas",
      ],
      buildSteps: [
        "Primero arma tu hueco: coloca dos vasos o dos pilas de libros a unos 20 cm de distancia. Ese hueco es lo que tu estructura tiene que cruzar.",
        "Construye la plataforma, la parte plana donde descansan las provisiones, para que llegue de un lado al otro.",
        "Agrega soportes debajo o a los lados para llevar el peso hasta la mesa.",
        "Prueba con triángulos: tres palitos unidos en triángulo donde la plataforma se junta con los soportes.",
        "Deja el centro listo para probarlo. Ahí vas a poner el peso, así que hazlo fuerte sin construir de más.",
      ],
      redesignPrompts: [
        "Si se dobló en el centro, agrega un soporte o un refuerzo triangular justo debajo de ese punto.",
        "Si una unión se separó, agrega cinta o cuerda para amarrar mejor esa conexión.",
        "Si se torció de lado, conecta los dos costados para que se muevan juntos.",
        "Si un material fallaba una y otra vez, cámbialo por una forma más fuerte, como una ficha doblada o un tubo, y prueba otra vez.",
      ],
      realWorldExamples: [
        "Los puentes de armadura están hechos de filas de triángulos para poder cargar trenes pesados.",
        "Los armazones de los techos usan triángulos para que el techo no se hunda con la nieve.",
        "Un pedazo de cartón doblado es mucho más fuerte que uno plano: la forma agrega resistencia.",
      ],
      testingChallenges: [
        {
          test: "Prueba de carga",
          howTo: "Agrega monedas una por una en el centro de la plataforma, contándolas conforme las pones.",
          measure: "Cuántas monedas aguanta antes de colapsar",
        },
        {
          test: "Prueba de flexión",
          howTo: "Observa la plataforma mientras agregas peso y marca cuándo empieza a hundirse.",
          measure: "Cuántas monedas aguanta antes de doblarse más que el ancho de un dedo",
        },
        {
          test: "Prueba del triángulo",
          howTo: "Compara una versión reforzada con cuadrados contra una reforzada con triángulos, usando los mismos materiales.",
          measure: "Cuál diseño aguanta más y por cuántas monedas",
        },
      ],
      reflectionQuestions: [
        "¿Dónde se dobló primero tu estructura?",
        "¿Qué parte cargó más peso?",
        "¿Ayudaron los triángulos?",
        "¿Qué material funcionó mejor?",
        "¿Qué cambiarías si tuvieras menos materiales?",
      ],
      extensionChallenges: [
        "Reconstrúyelo para que aguante la misma carga con menos palitos de manualidades.",
        "Haz que el puente cruce un hueco más ancho sin agregar un soporte en el centro.",
        "Diseña una plataforma que reparta la carga para que una pila de monedas no se vuelque.",
      ],
      teacherNotes: "Haz una comparación rápida lado a lado entre un armazón cuadrado y uno reforzado con triángulos para que los estudiantes sientan por qué importan los triángulos. Error común: amontonar todo el peso en una orilla; muéstrales que hay que cargar el centro para que la prueba sea justa. Cuida los dedos cuando las estructuras colapsen, y usa monedas o arandelas ligeras en lugar de objetos pesados.",
      teacherGuide: {
        setup: [
          "Prepara con anticipación el hueco de cada equipo: dos pilas de libros iguales (o dos vasos) a unos 20 cm de distancia.",
          "Pon la carga, un vaso con monedas o arandelas, en una estación de pruebas compartida.",
          "Haz una demostración: una ficha plana contra una ficha doblada, y un cuadrado contra un triángulo, para que los estudiantes sientan por qué importa la forma.",
        ],
        materialsPrep: [
          "Cuenta unos 20 palitos de manualidades y unas cuantas fichas por equipo para que todos empiecen parejo.",
          "Usa monedas ligeras o arandelas de metal, nunca objetos pesados, para que un colapso sea seguro.",
        ],
        safetyNotes: [
          "Las estructuras se rompen de golpe cuando fallan: mantén las caras alejadas y los dedos fuera de la plataforma durante una prueba de carga.",
          "Si usan palillos, tienen punta; supervisa de cerca o cámbialos por popotes con los estudiantes más pequeños.",
        ],
        learningObjectives: [
          "Explicar qué es una carga y un soporte, y cómo la fuerza baja hasta los soportes.",
          "Mostrar que los triángulos conservan su forma bajo carga mejor que los cuadrados.",
          "Comparar materiales y elegir una forma más fuerte para un material débil.",
        ],
        commonFailures: [
          "Amontonar el peso en una orilla en lugar del centro: no es una prueba justa.",
          "Uniones pegadas con poca cinta, así que la estructura se separa en una conexión antes de que falle el material.",
          "Una plataforma plana y sin refuerzo que se hunde en el centro.",
        ],
        questionsToAsk: [
          "\"¿Dónde se dobló o se rompió primero, y por qué justo ahí?\"",
          "\"¿Qué está cargando más peso en este momento?\"",
          "\"¿Dónde podría ayudar un triángulo?\"",
          "\"¿Cómo podrías aguantar el mismo peso usando menos palitos?\"",
        ],
        easierVersion: "Acorta el hueco a 10-12 cm y arma tú los dos soportes de antemano, para que los estudiantes se concentren solo en la plataforma.",
        harderVersion: "Ensancha el hueco, prohíbe un soporte en el centro o pon un presupuesto de materiales, como 12 palitos de manualidades.",
        cleanup: [
          "Quita la cinta de los palitos que se puedan reutilizar y guárdalos de nuevo en una caja.",
          "Regresa las monedas y arandelas a la estación de pruebas y recicla las plataformas que fallaron.",
        ],
      },
    },
    {
      comparedMaterials: [
        "Cartón",
        "Palitos de paleta",
        "Cuerda",
        "Ligas",
        "Cinta adhesiva",
      ],
      title: "Hazlo moverse",
      projectName: "Pinza de cartón o mini grúa",
      summary: "Los estudiantes exploran las máquinas simples construyendo una pinza de cartón o una mini grúa que usa palancas y pivotes para estirarse, levantar y mover un objeto pequeño.",
      estimatedTime: "50-60 minutos",
      concepts: [
        {
          term: "Máquina simple",
          definition: "Una herramienta básica que facilita el trabajo, como una palanca, una polea o una rueda.",
        },
        {
          term: "Palanca",
          definition: "Una barra rígida que gira alrededor de un punto fijo para levantar o mover algo.",
        },
        {
          term: "Pivote",
          definition: "El punto fijo alrededor del cual gira una palanca, también llamado fulcro.",
        },
        {
          term: "Ventaja mecánica",
          definition: "Cuando una máquina hace que un empujón pequeño mueva una carga más grande, o llegue más lejos de lo que alcanza tu brazo.",
        },
        {
          term: "Movimiento",
          definition: "Cómo se mueven las partes de una máquina: deslizándose, girando, abriéndose o levantando.",
        },
      ],
      designBrief: "Construye una pinza o una grúa de cartón y broches que alcance al menos 20 cm, levante un objeto ligero como una bola de papel arrugado y lo deje en un punto marcado.",
      problem: "Hay que mover algo, pero no puedes tocarlo con las manos: está muy lejos, muy alto o en un lugar incómodo. Diseña una herramienta que pueda estirarse y mover o levantar un objeto pequeño por ti, manejada por completo desde tu extremo.",
      realWorldConnection: {
        intro: "Las máquinas que alcanzan, agarran y levantan dependen todas de palancas y pivotes, las mismas piezas que hay en tu pinza. Un movimiento pequeño en tu mano se convierte en un movimiento más grande o más fuerte en el otro extremo.",
        appearsIn: [
          "Grúas",
          "Excavadoras",
          "Tijeras",
          "Máquinas de garra",
          "Elevadores",
          "Brazos robóticos",
        ],
      },
      constraints: [
        "La máquina se maneja con la mano desde un solo extremo: no puedes meter la otra mano para ayudar.",
        "Usa cartón, palitos de manualidades, broches de mariposa o cuerda, y cinta.",
        "El objeto tiene que levantarse y soltarse, no solo empujarse.",
      ],
      materials: [
        "Cartón",
        "Broches de mariposa",
        "Cuerda",
        "Popotes",
        "Cinta adhesiva",
        "Palitos de paleta",
        "Ligas",
        "Vasos u objetos pequeños para levantar",
      ],
      substitutions: [
        "Una unión de cuerda anudada en lugar de un broche de mariposa",
        "Popotes o palillos en lugar de palitos de paleta",
        "Una bola de papel arrugado o de algodón como objeto para levantar",
      ],
      buildSteps: [
        "Elige tu máquina: una pinza que se abre y se cierra, o una grúa que levanta con una cuerda. Las dos usan las mismas ideas.",
        "Encuentra tu pivote, el punto alrededor del cual giran tus piezas, y une ahí dos partes con un broche de mariposa.",
        "Haz mangos o una cuerda de jalar lo bastante largos para manejar la máquina desde tu extremo sin tocar el objeto.",
        "Agrega la garra o el gancho que de verdad sostiene el objeto.",
        "Prueba el movimiento pronto y seguido. Las uniones casi siempre necesitan ajustes antes de que la máquina funcione bien.",
      ],
      redesignPrompts: [
        "Si el brazo se venció o se dobló, usa una pieza más rígida o agrega una segunda capa de cartón.",
        "Si una unión quedó muy floja se bamboleaba; si quedó muy apretada no se movía. Ajusta el broche hasta que quede justo.",
        "Si la garra dejaba caer el objeto, agrégale textura, un gancho o un vasito más hondo para sujetarlo mejor.",
        "Si la cuerda de la grúa se resbalaba, amárrala o enróllala en un carrete para controlarla.",
      ],
      realWorldExamples: [
        "Una grúa de construcción es una palanca gigante que gira sobre un pivote para levantar cargas pesadas.",
        "Las tijeras y un sube y baja son palancas que giran alrededor de un punto de pivote.",
        "Una máquina de garra y un brazo robótico usan articulaciones, igual que los broches de tu pinza.",
      ],
      testingChallenges: [
        {
          test: "Prueba de alcance",
          howTo: "Mide qué tanto se estira la pinza desde donde la sostiene tu mano.",
          measure: "Alcance en centímetros",
        },
        {
          test: "Prueba de agarre",
          howTo: "Intenta levantar el objeto y sostenerlo en el aire cinco segundos.",
          measure: "¿Lo sostiene, se le resbala o se le cae?",
        },
        {
          test: "Prueba de colocación",
          howTo: "Lleva el objeto levantado hasta un círculo marcado y suéltalo.",
          measure: "Cuántos de cinco intentos caen dentro del blanco",
        },
      ],
      reflectionQuestions: [
        "¿Tu diseño era fuerte o fácil de mover?",
        "¿Dónde se dobló?",
        "¿Qué parte funcionó como palanca?",
        "¿Qué hizo que el movimiento fuera mejor o peor?",
        "¿Cómo podrías mejorar el agarre o la fuerza para levantar?",
      ],
      extensionChallenges: [
        "Agrega una segunda articulación para que tu pinza pueda doblarse en una esquina.",
        "Rediseña la garra para que pueda levantar un objeto redondo como una pelota.",
        "Haz que la grúa levante el objeto en línea recta hacia arriba en lugar de columpiarlo.",
      ],
      teacherNotes: "Deja que los estudiantes sientan primero la idea del pivote con un sube y baja de palitos de manualidades antes de construir. Error común: broches tan apretados que el brazo no se mueve, o tan flojos que se vence; busquen una unión justa. Controlar la tensión de la cuerda es lo difícil de una grúa: la pinza es el punto de partida más sencillo para los estudiantes más pequeños.",
      teacherGuide: {
        setup: [
          "Reparte tiras de cartón, broches de mariposa, cuerda y cinta por equipo, más un objeto ligero para levantar, como una bola de papel arrugado.",
          "Marca un \"punto blanco\" en cada mesa para que los estudiantes practiquen colocar el objeto, no solo levantarlo.",
          "Demuestra primero un pivote: une dos palitos de manualidades con un broche y muestra cómo giran alrededor de él.",
        ],
        materialsPrep: [
          "Perfora de antemano los agujeros de los broches en algunas tiras de cartón para los estudiantes a los que se les dificulte ese paso.",
          "Corta la cuerda en tramos de unos 40 cm para quienes construyan una grúa.",
        ],
        safetyNotes: [
          "Los broches de mariposa y cualquier herramienta para perforar tienen punta: haz los agujeros hacia abajo, sobre el cartón apoyado en la mesa, nunca hacia una mano.",
          "Las tijeras se pasan con el mango por delante y se quedan sobre la mesa.",
        ],
        learningObjectives: [
          "Señalar el pivote y explicar que una palanca gira alrededor de él.",
          "Explicar que una cuerda puede jalar, pero no empujar.",
          "Explicar que un movimiento pequeño en un extremo puede producir un movimiento más grande o más fuerte en el otro.",
        ],
        commonFailures: [
          "Broches demasiado apretados, con los que el brazo no se mueve, o demasiado flojos, con los que se vence.",
          "Una garra que empuja el objeto en lugar de cerrarse sobre él.",
          "Una cuerda de grúa sin forma de mantener la tensión, así que la carga se cae.",
        ],
        questionsToAsk: [
          "\"¿Dónde está el pivote y qué pasa si lo mueves?\"",
          "\"¿Qué parte funcionó como palanca?\"",
          "\"¿Por qué la garra dejó caer el objeto?\"",
          "\"¿Cómo podrías tener más fuerza para levantar sin agregar más cartón?\"",
        ],
        easierVersion: "Empieza a todo el grupo con una pinza tipo \"pinza de ropa\" de dos tiras y sáltate la grúa, así solo hay un pivote que manejar.",
        harderVersion: "Pide que la máquina alcance 30 cm, o que levante un objeto redondo como una pelota.",
        cleanup: [
          "Recupera en un recipiente pequeño los broches de mariposa y la cuerda que se puedan reutilizar.",
          "Recicla los recortes de cartón y guarda los pedazos grandes para la próxima vez.",
        ],
      },
    },
    {
      title: "Diseña para volar",
      projectName: "Planeador de papel o módulo de aterrizaje en Marte",
      summary: "Los estudiantes investigan las fuerzas del vuelo construyendo un planeador de papel o un módulo de aterrizaje marciano de prueba de caída, y luego prueban cómo el peso y el equilibrio cambian su forma de volar o de aterrizar.",
      estimatedTime: "50-60 minutos",
      concepts: [
        {
          term: "Ingeniería aeroespacial",
          definition: "Diseñar cosas que se mueven por el aire y el espacio, como aviones, drones, paracaídas y naves espaciales.",
        },
        {
          term: "Peso",
          definition: "La fuerza con la que jala la gravedad. El peso jala todos los objetos hacia el suelo.",
        },
        {
          term: "Resistencia del aire",
          definition: "La forma en que el aire empuja de regreso a un objeto en movimiento y lo frena.",
        },
        {
          term: "Equilibrio",
          definition: "Cómo está repartido el peso. El equilibrio decide si un diseño vuela derecho o se inclina y da vueltas.",
        },
        {
          term: "Cambios pequeños",
          definition: "Un solo cambio pequeño (un doblez, un clip, un poco de acolchado) puede cambiar cómo vuela o cómo cae algo.",
        },
      ],
      designBrief: "Construye un planeador de papel que vuele derecho y lejos, o un módulo de aterrizaje marciano que proteja una carga pequeña en una caída. Pruébalo, cambia una sola cosa y vuelve a probarlo.",
      problem: "Diseña algo que se mueva con seguridad por el aire. Elige tu camino: un planeador que vuele lejos y derecho, o un módulo de aterrizaje que proteja un objeto pequeño cuando caiga y golpee el suelo. En los dos casos, el aire y la gravedad juegan en tu contra.",
      realWorldConnection: {
        intro: "Todo lo que vuela o cae pelea contra las mismas dos fuerzas que tu diseño: la gravedad que lo jala hacia abajo y el aire que lo empuja de regreso. Los ingenieros aeroespaciales dan forma a sus diseños para controlar las dos.",
        appearsIn: [
          "Aviones",
          "Paracaídas",
          "Helicópteros",
          "Naves espaciales",
          "Drones",
        ],
      },
      constraints: [
        "El mismo lanzamiento cada vez para que la prueba sea justa: mismo lugar, mismo empujón suave o misma altura de caída.",
        "Camino del planeador: empieza con una hoja de papel y un clip. Camino del módulo: usa vasos, papel, cinta y acolchado.",
        "Cambia una sola cosa entre pruebas (un doblez, un clip o un acolchado).",
      ],
      materials: [
        "Papel",
        "Fichas",
        "Popotes",
        "Cinta adhesiva",
        "Cuerda",
        "Filtros de café",
        "Vasos",
        "Bolas de algodón",
        "Ligas",
        "Un huevo de plástico, una pelota de ping pong o un juguete pequeño para proteger",
      ],
      substitutions: [
        "Una bola de papel arrugado en lugar de un huevo de plástico o una pelota de ping pong",
        "Una bolsa de plástico en lugar de un filtro de café para el paracaídas",
        "Papel enrollado en lugar de popotes",
      ],
      buildSteps: [
        "Elige tu camino: un planeador que vuele lejos y derecho, o un módulo que proteja un objeto pequeño al caer.",
        "Planeador: dobla o recorta una forma de ala y empieza ligero. Después puedes agregar un clip para cambiar el equilibrio.",
        "Módulo: arma un vaso o una caja para sostener el objeto y luego agrega acolchado, patas o un paracaídas para suavizar el aterrizaje.",
        "Deja tu primera versión sencilla para que puedas ver qué hace un solo cambio.",
        "Define una prueba justa antes de construir de más: mismo punto de lanzamiento para los planeadores, misma altura de caída para los módulos.",
      ],
      redesignPrompts: [
        "Si el planeador se picaba hacia abajo, mueve un poco de peso (un clip) hacia atrás, o dobla hacia arriba las aletas de la cola.",
        "Si el planeador se curvaba o giraba, revisa que las dos alas sean iguales y que la nariz esté derecha.",
        "Si el objeto del módulo se dañó, agrega más acolchado o frena la caída con un paracaídas de filtro de café.",
        "Si el módulo se volcó, ensancha su base o baja su peso.",
        "Cambia una cosa a la vez para saber cuál cambio de verdad ayudó.",
      ],
      realWorldExamples: [
        "Las alas de los aviones tienen una forma que genera sustentación mientras avanzan por el aire.",
        "Los módulos de aterrizaje marcianos de verdad usan bolsas de aire, patas que se aplastan o paracaídas para sobrevivir al aterrizaje.",
        "Un avión de papel con la nariz doblada se pica hacia abajo: el equilibrio decide todo su recorrido.",
      ],
      testingChallenges: [
        {
          test: "Planeador: distancia",
          howTo: "Lánzalo igual tres veces y mide qué tan lejos llega cada vez.",
          measure: "La distancia más larga en centímetros",
        },
        {
          test: "Planeador: puntería",
          howTo: "Apunta a un blanco en el piso y lánzalo cinco veces de la misma forma.",
          measure: "Cuántos de los cinco aterrizajes caen cerca del blanco",
        },
        {
          test: "Planeador: estabilidad",
          howTo: "Observa cómo se mueve el planeador por el aire.",
          measure: "Derecho, curvado o en picada",
        },
        {
          test: "Módulo: proteger el objeto",
          howTo: "Deja caer el módulo desde una altura fija y revisa el objeto después de cada caída.",
          measure: "¿El objeto salió sin daños? (sí / no)",
        },
        {
          test: "Módulo: comparar diseños",
          howTo: "Prueba dos diseños de aterrizaje distintos desde la misma altura.",
          measure: "Cuál diseño protege mejor el objeto",
        },
      ],
      reflectionQuestions: [
        "¿Los diseños más pesados volaron mejor o peor?",
        "¿Qué pasó cuando el diseño quedó desequilibrado?",
        "¿Qué frenó la caída?",
        "¿Qué hizo que el aterrizaje fuera más seguro?",
        "¿Qué cambiaste después de probarlo?",
      ],
      extensionChallenges: [
        "Logra que tu planeador dé una vuelta amplia en lugar de volar derecho.",
        "Haz un módulo que proteja dos monedas en lugar de una en la misma caída.",
        "Encuentra el módulo más ligero que aun así mantenga segura la carga.",
      ],
      teacherNotes: "Esta es la lección donde de verdad se entiende la idea de cambiar una variable a la vez: insiste en un lanzamiento o una altura de caída iguales. Error común: lanzar el planeador con más fuerza para que llegue más lejos, lo que esconde el efecto del cambio de diseño. Deja que cada estudiante elija el camino del planeador o del módulo según el espacio; los módulos funcionan bien donde no se puede lanzar con seguridad.",
      teacherGuide: {
        setup: [
          "Decide según el espacio: los planeadores necesitan piso libre para lanzarlos; los módulos necesitan una altura de caída segura, como una silla o un escalón. Divide al grupo por camino.",
          "Marca una línea de lanzamiento y un blanco en el piso para los planeadores; marca una sola altura de caída para los módulos.",
          "Ten clips a la mano para cambiar el equilibrio del planeador de uno en uno.",
        ],
        materialsPrep: [
          "Dobla de antemano un planeador de muestra tipo dardo para mostrar un punto de partida sin imponer un solo diseño.",
          "Para los módulos, proporciona un objeto pequeño que proteger (una pelota de ping pong o papel arrugado) y acolchado como algodón y filtros de café.",
        ],
        safetyNotes: [
          "Los planeadores se lanzan: lancen en una sola dirección, nunca hacia las caras, y un equipo a la vez.",
          "Para los módulos, deja caer desde un escalón o una silla estable con un adulto al lado. Nadie se trepa.",
        ],
        learningObjectives: [
          "Explicar el peso (la gravedad que jala hacia abajo) y la resistencia del aire (el aire que empuja de regreso).",
          "Mostrar cómo mover el peso cambia el equilibrio y la trayectoria de un planeador.",
          "Hacer una prueba controlada cambiando una sola cosa a la vez.",
        ],
        commonFailures: [
          "Lanzar el planeador con más fuerza para ganar distancia, lo que esconde lo que de verdad hizo el cambio de diseño.",
          "Un planeador con la nariz pesada que se pica, o alas disparejas que lo hacen girar.",
          "Un módulo con el acolchado del lado equivocado, así que el objeto igual recibe el golpe.",
        ],
        questionsToAsk: [
          "\"¿Qué única cosa cambiaste y qué pasó?\"",
          "\"¿Dónde está el peso: adelante, atrás o en el centro?\"",
          "\"¿Qué frenó la caída?\"",
          "\"¿Puedes hacer el módulo más ligero y aun así proteger el objeto?\"",
        ],
        easierVersion: "Que todos vuelen primero el mismo planeador tipo dardo y solo agreguen o muevan un clip, para que el cambio que se prueba quede clarísimo.",
        harderVersion: "Agrega un blanco en el piso para medir puntería, o pide que un módulo proteja su objeto desde una caída más alta.",
        cleanup: [
          "Recicla los planeadores de papel; guarda los módulos que queden enteros para un segundo día de pruebas.",
          "Junta los clips, el algodón y los objetos protegidos de vuelta en sus cajas.",
        ],
      },
    },
    {
      comparedMaterials: [
        "Cartón",
        "Papel",
        "Popotes",
        "Cuerda",
        "Cinta adhesiva",
      ],
      title: "Ingeniería para las personas y el planeta",
      projectName: "Filtro de agua, barrera contra inundaciones o rediseño de un producto",
      summary: "Los estudiantes se enfrentan a la ingeniería del mundo real diseñando un modelo de filtro de agua, una barrera contra inundaciones o el rediseño de un producto de uso diario, midiendo lo que necesitan usuarios reales frente a restricciones reales.",
      estimatedTime: "50-60 minutos",
      concepts: [
        {
          term: "Ingeniería para las personas",
          definition: "Los ingenieros suelen resolver problemas para personas reales, no solo por diversión. Las personas que van a usar un diseño son lo primero.",
        },
        {
          term: "Los materiales importan",
          definition: "Cada material se comporta distinto: unos absorben agua, otros la bloquean, otros se doblan o se rompen. Elegir el correcto es parte del diseño.",
        },
        {
          term: "Restricción",
          definition: "Un límite de tu diseño, como qué materiales puedes usar, qué tan grande puede ser o cuánto tiempo tienes.",
        },
        {
          term: "Compensación",
          definition: "Cuando mejorar una cosa hace más difícil otra, así que tienes que elegir qué es lo más importante.",
        },
        {
          term: "Diseñar para el usuario",
          definition: "Los buenos diseños parten de lo que el usuario realmente necesita, y se prueban con alguien que los use.",
        },
      ],
      designBrief: "Elige un reto: construye un filtro que aclare el agua sucia, una barrera que mantenga el agua lejos de una casa pequeña, o el rediseño de un objeto de uso diario que resuelva un problema de un usuario específico.",
      problem: "Diseña una solución que ayude a las personas o proteja el medio ambiente. Primero decide a quién estás ayudando y qué problema le estás resolviendo, y luego construye un modelo que haga el trabajo con los materiales que tienes.",
      realWorldConnection: {
        intro: "Mucha de la ingeniería no se trata de aparatos, sino de mantener a las personas seguras, sanas y capaces de hacer su vida diaria. Estos diseños resuelven problemas reales de comunidades reales.",
        appearsIn: [
          "Sistemas de agua potable",
          "Protección contra inundaciones",
          "Reciclaje",
          "Productos más seguros",
          "Empaques reutilizables",
        ],
      },
      constraints: [
        "Nombra a tu usuario y el problema que le vas a resolver antes de construir.",
        "Usa solo los materiales que te dieron y anota cuáles cuestan dinero o podrían dañar el medio ambiente.",
        "Seguridad: en los modelos de filtro de agua, el agua filtrada es solo para observarla y nunca se debe probar ni beber.",
      ],
      materials: [
        "Vasos",
        "Filtros de café",
        "Bolas de algodón",
        "Grava",
        "Arena",
        "Cartón",
        "Cinta adhesiva",
        "Popotes",
        "Papel",
        "Fichas",
        "Un recipiente para probar el agua",
      ],
      substitutions: [
        "Una botella de plástico cortada en lugar de un vaso para el filtro",
        "Una charola para hornear o papel aluminio para contener el agua de la barrera",
        "Barro o plastilina para darle forma al muro de la barrera",
      ],
      buildSteps: [
        "Elige tu reto: un filtro de agua, una barrera contra inundaciones o el rediseño de un objeto de uso diario.",
        "Nombra a tu usuario y el problema que le vas a resolver antes de construir nada.",
        "Filtro: acomoda capas de materiales (algodón, arena, grava, un filtro de café) dentro de un vaso para que el agua pase por ellas.",
        "Barrera: dale forma a un muro o a un canal que mantenga el agua lejos de una casita de papel o cartón.",
        "Rediseño: estudia el objeto, encuentra lo único que le molesta al usuario y cambia solo esa parte.",
      ],
      redesignPrompts: [
        "Filtro: si el agua sigue turbia, agrega otra capa o un material más fino, como un filtro de café encima.",
        "Filtro: si escurre demasiado lento, usa capas más gruesas o un recipiente más ancho.",
        "Barrera: si el agua se filtró, sella las rendijas o haz el muro más alto donde falló.",
        "Rediseño: observa dónde se atoró tu usuario y arregla justo ese punto.",
        "Fíjate en la compensación: ¿mejorarlo de una forma lo empeoró de otra?",
      ],
      realWorldExamples: [
        "Las plantas de tratamiento pasan el agua por capas de arena y grava para limpiarla.",
        "Las ciudades construyen diques y muros de costales de arena para contener los ríos crecidos.",
        "Los ingenieros de producto rediseñan los empaques para usar menos plástico y seguir protegiendo lo que va adentro.",
      ],
      testingChallenges: [
        {
          test: "Filtro de agua: transparencia",
          howTo: "Vierte la misma agua turbia por el filtro y compárala con el recipiente original.",
          measure: "Más clara, un poco más clara o sin cambio",
        },
        {
          test: "Barrera contra inundaciones: mantener seca la casa",
          howTo: "Vierte una cantidad fija de agua contra la barrera y revisa la casa que está detrás.",
          measure: "Seca, un poco mojada o empapada",
        },
        {
          test: "Rediseño de producto: prueba con el usuario",
          howTo: "Pide a un compañero que haga de usuario y pruebe el objeto rediseñado.",
          measure: "¿Le resolvió su problema? ¿Qué falta por mejorar?",
        },
      ],
      reflectionQuestions: [
        "¿Para quién estabas diseñando?",
        "¿Qué problema resolvió tu diseño?",
        "¿Qué material funcionó mejor?",
        "¿Qué compensación hiciste?",
        "¿Qué mejorarías para un usuario real?",
      ],
      extensionChallenges: [
        "Mejora tu filtro para que además funcione más rápido, no solo más limpio.",
        "Diseña tu barrera para que se pueda reutilizar en lugar de tirarla.",
        "Rediseña tu producto para que use un material menos sin perder lo que lo hace funcionar.",
      ],
      teacherNotes: "Esta lección conecta la ingeniería con la justicia y el medio ambiente, así que dale tiempo a la conversación de \"¿para quién es esto?\" antes de construir. Refuerza con firmeza que el agua filtrada nunca se bebe. Error común: saltar a la solución antes de nombrar al usuario y el problema; aquí detén a los estudiantes un poco más en el paso de planeación.",
      teacherGuide: {
        setup: [
          "Arma todas las estaciones que puedas de las tres: filtro (vasos, arena, grava, algodón, agua turbia), barrera contra inundaciones (charola, agua, una casita de papel) y rediseño de producto (cartón, cinta, un objeto de uso diario).",
          "Prepara con anticipación el agua \"sucia\" turbia revolviendo un poco de tierra o pimienta en una jarra, nada peligroso.",
          "Ten cerca una charola, una cubeta o un fregadero para recoger el agua y los derrames.",
        ],
        materialsPrep: [
          "Corta de antemano las botellas de plástico para hacer las carcasas del filtro, si vas a usar botellas.",
          "Sirve por adelantado vasos iguales de agua turbia para que todos los equipos prueben con la misma agua inicial.",
        ],
        safetyNotes: [
          "El agua filtrada es solo para verse: los estudiantes NO deben probar ni beber nada del agua de esta lección. Dilo en voz alta y ponlo por escrito en la estación.",
          "Limpia los derrames de inmediato para evitar resbalones, y mantén toda el agua lejos de los aparatos electrónicos.",
        ],
        learningObjectives: [
          "Explicar que los ingenieros diseñan para un usuario específico y un problema real.",
          "Nombrar una restricción y una compensación de su propio diseño.",
          "Elegir un material según cómo se comporta: si absorbe, bloquea o filtra el agua.",
        ],
        commonFailures: [
          "Empezar a construir antes de nombrar al usuario y el problema.",
          "Capas del filtro demasiado sueltas, así que el agua turbia pasa de largo.",
          "Una barrera con huecos en las orillas por donde se cuela el agua.",
        ],
        questionsToAsk: [
          "\"¿Para quién es esto y qué problema le estás resolviendo?\"",
          "\"¿Qué compensación hiciste? ¿Qué empeoró cuando algo mejoró?\"",
          "\"¿Qué material funcionó mejor y por qué crees que fue así?\"",
          "\"¿Con qué seguiría batallando un usuario real?\"",
        ],
        easierVersion: "Asigna un solo camino, normalmente el filtro de agua, a todo el grupo, y dales ya definidos el usuario y el problema.",
        harderVersion: "Agrega una segunda meta, como un filtro que además sea rápido o una barrera reutilizable, lo que obliga a una compensación clara.",
        cleanup: [
          "Vacía el agua usada en un fregadero o una cubeta, no en la basura; exprime y tira los materiales empapados.",
          "Seca y guarda los vasos, las charolas y el cartón que todavía sirvan.",
        ],
      },
    },
    {
      title: "Reto final de ingeniería",
      projectName: "Reto de diseño: misión de rescate",
      summary: "En el proyecto final, los estudiantes combinan todo lo del curso (estructuras, fuerzas, movimiento y pruebas) para diseñar un sistema que lleve un paquete de provisiones a través de una zona peligrosa y lo entregue sin daños.",
      estimatedTime: "60-75 minutos",
      conceptsReviewed: [
        "Proceso de diseño de ingeniería",
        "Estructuras",
        "Fuerzas",
        "Materiales",
        "Movimiento",
        "Pruebas",
        "Fallas",
        "Rediseño",
        "Restricciones",
        "Compensaciones",
      ],
      concepts: [
        {
          term: "Sistema",
          definition: "Varias partes trabajando juntas hacia una misma meta, como una estructura más una pieza que se mueve.",
        },
        {
          term: "Combinar ideas",
          definition: "Usar más de una idea de ingeniería a la vez: resistencia, movimiento y equilibrio en un solo diseño.",
        },
        {
          term: "Restricciones y compensaciones",
          definition: "Cumplir todas las reglas de un reto mientras eliges qué es lo que vas a hacer mejor.",
        },
        {
          term: "Iteración",
          definition: "Probar y mejorar tu diseño una y otra vez hasta que cumpla la meta.",
        },
      ],
      designBrief: "Diseña y construye un sistema que lleve un paquete de provisiones a través de una zona de peligro (un hueco, un \"río\" o una caída) y lo entregue sin daños del otro lado. Usa las habilidades de estructura, movimiento, materiales y pruebas de todo el curso.",
      problem: "Un paquete de provisiones tiene que cruzar una zona peligrosa, evitar daños y llegar seguro. Tu trabajo es diseñar un sistema que mueva o proteja el paquete al cruzar el peligro usando solo los materiales que te dieron. Este es tu reto final: junta todo lo del curso completo.",
      realWorldConnection: {
        intro: "Las misiones reales de rescate y de entrega enfrentan exactamente este problema: llevar algo valioso a través de un lugar peligroso sin dañarlo. Los ingenieros combinan estructuras, movimiento y protección para lograrlo.",
        appearsIn: [
          "Equipos de búsqueda y rescate",
          "Drones de carga",
          "Entregas de ayuda humanitaria",
          "Teleféricos",
          "Sistemas de entrega",
        ],
      },
      solutionPaths: [
        "Un puente que cruce el paquete por encima del hueco",
        "Una tirolesa con un carrito que deslice el paquete al otro lado",
        "Un sistema de paracaídas que lo baje con suavidad",
        "Una grúa o una pinza que lo levante y lo coloque",
        "Un empaque protector que sobreviva el viaje",
        "Un vehículo o un trineo pequeño que lo lleve al otro lado",
      ],
      constraints: [
        "El paquete tiene que cruzar la zona de peligro sin que nadie lo lleve en la mano.",
        "Tiene que llegar sin daños: cruzar no es suficiente.",
        "Usa solo los materiales que te dieron.",
        "Tienes tres intentos de prueba, y puedes mejorar tu diseño entre uno y otro.",
      ],
      materials: [
        "Papel",
        "Cartón",
        "Vasos",
        "Cuerda",
        "Cinta adhesiva",
        "Popotes",
        "Palitos de paleta",
        "Ligas",
        "Fichas",
        "Clips",
        "Un objeto pequeño que sirva de paquete",
      ],
      substitutions: [
        "Un juguete, una goma de borrar o una cajita como paquete",
        "Estambre en lugar de cuerda",
        "Tubos de papel enrollado en lugar de popotes",
      ],
      buildSteps: [
        "Elige un camino de solución y dibújalo antes de construir.",
        "Construye una primera versión sencilla, un prototipo, que de verdad puedas probar, no un modelo final perfecto.",
        "Arma tu zona de peligro y decide cómo vas a hacer la misma prueba cada vez.",
        "Haz que el paquete sea fácil de cargar y, si tu diseño se mueve, fácil de soltar al final.",
        "Deja margen para cambiar cosas: vas a probar, encontrar qué falla y mejorar.",
      ],
      redesignPrompts: [
        "Si el paquete se cayó o se dañó, agrégale protección o frénalo al final del recorrido.",
        "Si una estructura se hundió o se rompió, agrega un refuerzo triangular o un soporte donde falló.",
        "Si una pieza móvil se atoró o se resbaló, ajusta la tensión, el pivote o la inclinación.",
        "Cambia una sola cosa, repite la misma prueba y observa si ayudó.",
        "Cuida las compensaciones: un diseño más pesado y más fuerte puede moverse más lento.",
      ],
      realWorldExamples: [
        "Los equipos de búsqueda y rescate usan poleas y tirolesas para cruzar personas por cañones y ríos.",
        "Las grúas de carga y los teleféricos combinan una estructura fuerte con una línea que se mueve.",
        "Los ingenieros de emergencias diseñan puentes y elevadores que se montan rápido y aun así aguantan una carga.",
      ],
      testingChallenges: [
        {
          test: "Prueba de cruce",
          howTo: "Haz la misión de principio a fin cruzando la zona de peligro.",
          measure: "¿El paquete llegó al otro lado? (sí / no)",
        },
        {
          test: "Prueba de llegada segura",
          howTo: "Revisa el paquete al final de cada intento.",
          measure: "¿Llegó sin daños y derecho, o se cayó o se dañó?",
        },
        {
          test: "Prueba de confiabilidad",
          howTo: "Haz la misión tres veces sin reconstruir desde cero.",
          measure: "Cuántos de los tres intentos salen bien",
        },
      ],
      reflectionQuestions: [
        "¿Qué ideas de lecciones anteriores combinaste y cómo funcionaron juntas?",
        "¿Qué falló en tu primer intento y cómo lo usaste para mejorar el diseño?",
        "¿Qué restricción o compensación marcó más tu diseño?",
        "Si tuvieras otra semana, ¿qué sería lo primero que rediseñarías?",
      ],
      presentationPrompts: [
        "¿Qué problema resolviste?",
        "¿Qué construiste?",
        "¿Qué falló al principio?",
        "¿Qué mejoraste?",
        "¿Cuál lección anterior te ayudó más?",
        "¿Qué cambiarías con más tiempo?",
      ],
      extensionChallenges: [
        "Entrega dos paquetes en un solo intento sin agregar mucho peso.",
        "Haz que el cruce funcione sobre una zona de peligro más larga o más difícil.",
        "Agrega una forma de bajar el paquete con suavidad al final en lugar de dejarlo caer.",
      ],
      teacherNotes: "Toma esta lección como una muestra de todo el curso, no como una idea nueva. Exige a los estudiantes un boceto de planeación de verdad que diga qué habilidades anteriores están usando. Reserva tiempo para al menos dos rondas de probar y mejorar: la iteración es el punto. Una breve exposición donde cada equipo demuestre su rescate es un cierre muy bueno.",
      teacherGuide: {
        setup: [
          "Arma una sola \"zona de peligro\" compartida: un hueco marcado con cinta en el piso o entre dos mesas, de unos 40-60 cm de ancho.",
          "Pon toda la mesa de materiales a la vista y pide a los equipos que elijan un camino de solución antes de empezar a construir.",
          "Planea tres intentos de prueba cronometrados con tiempo de rediseño entre ellos.",
        ],
        materialsPrep: [
          "Dale a cada equipo el mismo tipo de objeto como \"paquete\" (una cajita, una goma de borrar o un juguete) para que los resultados se puedan comparar.",
          "Ten cuerda, cinta y clips bien surtidos: las tirolesas y las grúas son las que más los gastan.",
        ],
        safetyNotes: [
          "Las tirolesas necesitan un anclaje: usa cuerda pegada con cinta o una silla, nunca nada a la altura de la cabeza que pueda regresarse de golpe.",
          "Mantén los pies fuera de la zona de peligro y haz la prueba de un equipo a la vez.",
        ],
        learningObjectives: [
          "Combinar estructuras, movimiento, materiales y pruebas en un solo sistema que funcione.",
          "Usar el proceso de diseño completo, incluido al menos un rediseño después de un intento fallido.",
          "Explicar las restricciones y las compensaciones que marcaron su diseño.",
        ],
        commonFailures: [
          "Construir algo tan grande que no alcanza a terminarse ni probarse a tiempo: empuja hacia una primera versión sencilla y probable.",
          "El paquete llega, pero dañado, porque la protección se pensó al último.",
          "Una pieza móvil (tirolesa o grúa) sin control de tensión, así que el paquete se atora o se cae.",
        ],
        questionsToAsk: [
          "\"¿Qué lección anterior usa más esta construcción?\"",
          "\"¿Qué falló en tu primer intento y qué única cosa vas a cambiar?\"",
          "\"¿Dónde es más probable que el paquete se dañe?\"",
          "\"¿Qué compensación hiciste: velocidad, resistencia o peso?\"",
        ],
        easierVersion: "Angosta la zona de peligro y guía a los equipos hacia los caminos del empaque protector o del puente, que son los que menos piezas móviles necesitan.",
        harderVersion: "Pide dos paquetes, una zona de peligro más larga o una llegada suave sin dejar caer el paquete al final.",
        cleanup: [
          "Quita la cinta de la zona de peligro y recupera la cuerda, los clips y los objetos que hicieron de paquete.",
          "Guarda las mejores construcciones para una exposición y recicla las demás.",
        ],
      },
    },
  ],
}

const zh: DeepPartial<EngineeringCurriculum> = {
  title: "工程基础",
  subtitle: "通过六个动手挑战，学习工程师如何设计、制作、测试并改进解决方案。",
  description: "为期 6 周的动手工程课程，学生用日常材料制作、测试并重新设计结构、机械和解决方案，学会像真正的工程师那样思考。",
  gradeRange: "2 至 5 年级",
  duration: "6 周",
  estimatedTimePerLesson: "45-75 分钟",
  requirement: "常见的搭建材料，无需电脑",
  summary: "学生按照工程师真正的工作方式学习工程：接下一个挑战，画出方案，做出第一个版本，用真实测量来测试，再改进设计。每周围绕一个用便宜的日常材料（纸、纸板、胶带和绳子）完成的项目，以及一个核心工程概念展开，从稳定性到简单机械，再到飞行。课程以一个把所有内容汇聚成一次救援任务设计的终极挑战收尾。",
  format: [
    "每周一个工程概念、一次动手制作，顺序层层递进。",
    "每节课都遵循同一个设计流程：提问、构想、规划、制作、测试、改进。",
    "学生用真实测量来检验自己的作品，并记录结果。",
    "重新设计是课程的一部分：第一个版本永远不是最终版本。",
    "所有项目都使用常见的低成本材料，不需要电脑或专门的套件。",
  ],
  learningGoals: [
    "说清楚工程师是做什么的",
    "运用工程设计流程",
    "制作并测试简单结构",
    "理解力、荷载和稳定性",
    "比较材料",
    "在失败之后改进设计",
    "在限制条件下解决问题",
    "完成一次终极工程设计挑战",
  ],
  materials: [
    "打印纸或手工纸，以及卡片纸",
    "纸板（麦片盒、快递纸箱）和厚卡纸",
    "美纹纸胶带和透明胶带",
    "绳子、毛线和橡皮筋",
    "手工棒（雪糕棒）和木签或吸管",
    "剪刀、一把尺子和铅笔",
    "纸杯、小纸盘，以及回形针或工字钉",
    "硬币、垫圈或小重物，用于荷载测试",
    "棉球、沙子或碎石，以及一个透明杯子，用于净水器那节课",
    "一本速写本，或每节课的可打印规划表",
  ],
  materialGroups: [
    {
      label: "基础用品",
      items: [
        "纸",
        "纸板",
        "胶带",
        "剪刀",
        "尺子",
        "铅笔",
      ],
    },
    {
      label: "搭建材料",
      items: [
        "雪糕棒",
        "吸管",
        "卡片纸",
        "纸杯",
        "回形针",
      ],
    },
    {
      label: "运动部件材料",
      items: [
        "绳子",
        "橡皮筋",
        "工字钉",
        "可供抓取的小物件",
      ],
    },
    {
      label: "测试材料",
      items: [
        "硬币",
        "垫圈",
        "书本",
        "卷尺",
        "小重物",
      ],
    },
    {
      label: "可选材料",
      items: [
        "咖啡滤纸",
        "棉球",
        "碎石",
        "沙子",
        "塑料蛋",
        "乒乓球",
      ],
    },
  ],
  materialProperties: [
    {
      name: "纸",
      property: "又轻又容易弯。折叠或卷起来之后会结实得多。",
    },
    {
      name: "纸板",
      property: "比纸结实。适合做面板、桥面和底座。",
    },
    {
      name: "吸管",
      property: "又轻又顺手，适合搭骨架，但没有支撑就会弯。",
    },
    {
      name: "雪糕棒",
      property: "当横梁很结实，不容易弯，但比纸重。",
    },
    {
      name: "绳子",
      property: "拉东西非常好用，但推不动东西，一推就松了。",
    },
    {
      name: "胶带",
      property: "适合把零件连起来，但荷载过大时接头会失效。",
    },
    {
      name: "橡皮筋",
      property: "拉伸时储存能量，再把零件拉回原位。",
    },
  ],
  materialsNote: "一开始不需要备齐所有材料。每节课都提供了替代方案。",
  planningPrompts: [
    "动手之前先把想法画下来。草图就够了。",
    "标出设计中最结实的部分，以及你最没把握的部分。",
    "预测测试时哪里会最先失败。",
    "决定每种材料放在哪里，以及那种材料为什么适合那个位置。",
  ],
  designProcess: [
    {
      description: "读一读挑战和它的规则。什么必须做到，什么不允许做？",
    },
    {
      title: "构想",
      description: "想出几种不同的解决办法。工程师从不只带着一个想法开始。",
    },
    {
      title: "规划",
      description: "画出设计图并标注各个部分。决定每个部分需要什么材料。",
    },
    {
      title: "制作",
      description: "做出第一个版本，也就是原型。它不必完美，但必须能测试。",
    },
    {
      title: "测试",
      description: "每次都做同样的公平测试，并写下真正发生了什么。",
    },
    {
      title: "改进",
      description: "根据测试告诉你的信息只改一处，然后再测一次。这就是重新设计。",
    },
  ],
  lessons: [
    {
      title: "像工程师一样思考",
      projectName: "纸塔挑战",
      summary: "学生用几张纸和一点胶带搭出尽可能高的塔，再重新设计让它更高更稳，从中认识工程设计流程。",
      estimatedTime: "45-60 分钟",
      concepts: [
        {
          term: "工程设计流程",
          definition: "工程师解决问题时反复走的几个步骤：提问、构想、规划、制作、测试和改进。",
        },
        {
          term: "稳定性",
          definition: "一样东西能站得多稳而不倒。底座又宽又低会更稳。",
        },
        {
          term: "原型",
          definition: "设计的第一个版本，做出来是为了能测试它、从中学习。",
        },
        {
          term: "重新设计",
          definition: "测试之后调整设计让它更好用，而不是推倒重来。",
        },
      ],
      designBrief: "搭出你能做到的最高的纸塔，并让它自己站立至少十秒。然后用测试中学到的经验，做出更好的第二个版本。",
      problem: "你们小组有一叠纸和一点胶带，任务只有一个：搭出尽可能高、并且能自己站住的塔。它必须在没人扶的情况下稳住至少十秒。越高越好，但站不住的高塔不算数。",
      realWorldConnection: {
        intro: "所有高的东西都要解决和你的塔一样的问题：怎样立住而不倒。设计高层建筑的工程师，大部分精力都花在底座和平衡上，而不是顶端。",
        appearsIn: [
          "摩天大楼",
          "通信塔和广播塔",
          "瞭望塔",
          "建筑起重机",
        ],
      },
      constraints: [
        "只能用发给你的纸和胶带（例如 5 张纸和 30 厘米胶带）。",
        "塔必须自己站住，不能靠墙，也不能用手扶着。",
        "不能用其他材料，也不能把塔剪短来撑住它。",
      ],
      materials: [
        "纸",
        "胶带",
        "剪刀",
        "尺子",
        "硬币或小重物",
      ],
      substitutions: [
        "用卡片纸代替纸",
        "用书本或小积木代替硬币",
      ],
      buildSteps: [
        "从底座开始。想好要做多宽，底座越宽越不容易倒。",
        "选择怎么用你的纸：卷成筒、折成柱、裁成平条，或者混着来。没有唯一正确的形状。",
        "一段一段地搭，边搭边测，不要一口气把整座塔做完。",
        "只在零件连接处贴胶带。顶端胶带太多，会把重量加在你最不想加的地方。",
        "边搭边把它立起来，确认没有歪斜再往上加高。",
      ],
      redesignPrompts: [
        "如果它倒了，就把底座加宽，或者把更多重量移到下面。",
        "如果中间塌了或弯了，就在那一段加一道折痕或一个支撑，让它更硬。",
        "如果顶端往下垂，就在上面少用点纸，让塔在最脆弱的地方更轻。",
        "每次只改一处再测试，这样你才知道到底是什么起了作用。",
      ],
      realWorldExamples: [
        "摩天大楼采用又宽又重的底座，让风吹不倒它们。",
        "通信塔和广播塔用三角形支撑的骨架，才能又高又不倒。",
        "交通锥下宽上轻，所以很难被撞倒。",
      ],
      testingChallenges: [
        {
          test: "高度测试",
          howTo: "把做好的塔立在平整的桌面上，从桌面量到塔顶。",
          measure: "高度（厘米）",
        },
        {
          test: "独立站立测试",
          howTo: "完全松手，然后开始数数。",
          measure: "倒下之前站住了多少秒（目标：10 秒以上）",
        },
        {
          test: "晃动测试",
          howTo: "在一臂远的地方轻轻朝塔吹气。",
          measure: "它是晃一下又稳住，还是倒了？",
        },
      ],
      reflectionQuestions: [
        "是什么让你的塔变稳或变不稳？",
        "哪种形状或哪种底座效果最好？",
        "最先失败的是什么？",
        "测试之后你改进了什么？",
        "第二个设计比第一个好在哪里？",
      ],
      extensionChallenges: [
        "重新搭一座塔，让它在塔顶托住一枚硬币而不倒。",
        "少用一张纸，试着打破你自己的最高纪录。",
        "设计一座既能扛住轻轻撞一下桌子、也能扛住一口气的塔。",
      ],
      teacherNotes: "第一周的目标是流程，不是最高的塔。先让学生做一次简短的搭建，然后叫停全班，一起测试和讨论，再让他们重做：重新设计才是学习真正发生的地方。常见错误：把纸卷成细筒，看着高但立刻就倒；引导学生把底座做宽。鼓励他们在撕胶带之前先画一张草图。",
      teacherGuide: {
        setup: [
          "为每位学生或每个小组清出一张平整的桌子，每份发 5 张纸和大约 30 厘米胶带。",
          "设一个「测试站」，配一把尺子或卷尺，让所有塔都用同样的方法测量。",
          "把这节课分成两轮：第一次搭建（约 10 分钟）、测试与讨论的暂停，然后重新设计（约 10 分钟）。",
        ],
        materialsPrep: [
          "事先把胶带剪成 30 厘米的条，免得课上花时间从卷上撕胶带。",
          "在测试站放一小杯硬币，用于可选的「塔顶托硬币」测试。",
        ],
        safetyNotes: [
          "整体风险很低。剪刀放在桌上，递的时候把手朝前。",
        ],
        learningObjectives: [
          "说出工程设计流程的各个步骤，并明白第一次尝试就是原型。",
          "解释底座越宽越低，塔就越稳。",
          "根据测试结果来调整设计，而不是靠猜。",
        ],
        commonFailures: [
          "卷得很细的纸筒，看着高却立刻倒下，因为底座太窄。",
          "顶端胶带太多，把重量加在塔最脆弱的地方。",
          "整座塔搭完才测试，问题到最后一刻才暴露。",
        ],
        questionsToAsk: [
          "「重量跑到哪里去了？」这会把他们的注意力引向底座和平衡。",
          "「它倒下的时候，哪一部分最先失败？」",
          "「你的第一座塔和第二座塔之间改了什么？」",
          "「用同样多的纸，你怎样才能把它做得更高？」",
        ],
        easierVersion: "给出一个目标高度（例如 30 厘米），而不是「越高越好」，并让学生从已经卷好的纸筒开始。",
        harderVersion: "要求塔顶托住一枚硬币 10 秒，或把胶带限制在 15 厘米，让材料的取舍更关键。",
        cleanup: [
          "把纸塔压平回收；没有粘胶带的纸留作草稿纸。",
          "把硬币和尺子收回测试站。",
        ],
      },
    },
    {
      comparedMaterials: [
        "雪糕棒",
        "吸管",
        "纸板",
        "纸",
        "胶带",
      ],
      title: "把它做结实",
      projectName: "桥梁或平台承重挑战",
      summary: "学生搭建一座小桥或一个平台，让它在不塌的前提下尽量多承重，从中理解为什么三角形和好的支撑能让结构变结实。",
      estimatedTime: "50-60 分钟",
      concepts: [
        {
          term: "结构",
          definition: "为了撑住自己并承载重量而造出来的东西，比如一座桥或一个书架。",
        },
        {
          term: "荷载",
          definition: "结构必须承受的重量，也包括结构自身的重量。",
        },
        {
          term: "支撑",
          definition: "托住荷载、并把力传到地面的部件。",
        },
        {
          term: "三角形加固",
          definition: "在设计中加入三角形，因为三角形在受力时比正方形更能保持形状。",
        },
        {
          term: "材料强度",
          definition: "材料在弯曲或断裂之前能承受多大的力。形状可以让一种较弱的材料表现得很结实。",
        },
      ],
      designBrief: "搭一座桥或一个架高的平台，跨过大约 20 厘米的缺口，并在弯得太厉害或塌掉之前尽可能多地承住硬币（或垫圈）。",
      problem: "一个小镇被一道缺口隔断了，可能是一条小溪、一道沟壑，或者一段被冲垮的路，物资必须送到对岸。你的任务是搭一座桥或一个架高的平台，跨过缺口，并且在不过度弯曲、不塌掉的情况下尽量多承重。",
      realWorldConnection: {
        intro: "每一个托住东西的结构，解决的都是你这座桥的问题：在一段距离上承住重量而不弯不断。撑起一个书架和撑起一座高架桥，用的是同样的道理。",
        appearsIn: [
          "桥梁",
          "书架",
          "屋顶",
          "桌子",
          "游乐场设施",
        ],
      },
      constraints: [
        "跨度必须越过一个固定的缺口，例如两摞书之间的距离。",
        "只能使用提供的材料（手工棒、纸、卡片纸和胶带）。",
        "荷载必须放在桥面上，不能用胶带粘住或绑上去。",
      ],
      materials: [
        "雪糕棒",
        "吸管",
        "卡片纸",
        "胶带",
        "绳子",
        "用作支撑的杯子或书本",
        "硬币、垫圈或小重物",
      ],
      substitutions: [
        "用卷起的纸筒代替吸管",
        "用摞起来的书代替杯子做支撑",
        "用垫圈或金属螺母代替硬币",
      ],
      buildSteps: [
        "先摆好你的缺口：把两个杯子或两摞书放在相距约 20 厘米的位置。那道缺口就是你的结构要跨过的距离。",
        "搭出桥面，也就是物资放置的那块平面，让它从一边一直伸到另一边。",
        "在下面或两侧加上支撑，把重量传到桌面上。",
        "试着加三角形：在桥面与支撑相接的地方，用三根棒子拼成一个三角形。",
        "把中间留成可测试的状态。你会在那里加重量，所以要做得结实，但也别过度堆料。",
      ],
      redesignPrompts: [
        "如果中间弯了，就在那个位置下面加一个支撑或一道三角形斜撑。",
        "如果接头被拉开了，就加胶带或绳子，把那处连接绑得更紧。",
        "如果它往一侧扭，就把两边连起来，让它们一起动。",
        "如果某种材料一直失败，就换成更结实的形状，比如折过的卡片纸或纸筒，然后再测一次。",
      ],
      realWorldExamples: [
        "桁架桥由一排排三角形组成，所以能承载沉重的火车。",
        "屋架用三角形，好让屋顶在积雪下不会塌陷。",
        "折过的纸板比平整的纸板结实得多，形状本身就带来了强度。",
      ],
      testingChallenges: [
        {
          test: "承重测试",
          howTo: "把硬币一枚一枚放到桥面中央，边放边数。",
          measure: "塌掉之前承住了多少枚硬币",
        },
        {
          test: "弯曲测试",
          howTo: "一边加重量一边观察桥面，记下它开始下沉的时刻。",
          measure: "弯曲超过一指宽之前放了多少枚硬币",
        },
        {
          test: "三角形测试",
          howTo: "用同样的材料，把正方形加固的版本和三角形加固的版本做对比。",
          measure: "哪个设计承得更多，多出几枚硬币",
        },
      ],
      reflectionQuestions: [
        "你的结构最先在哪里弯了？",
        "哪一部分承受的重量最多？",
        "三角形起作用了吗？",
        "哪种材料效果最好？",
        "如果材料更少，你会改什么？",
      ],
      extensionChallenges: [
        "用更少的手工棒重搭一次，承住同样的重量。",
        "让桥跨过更宽的缺口，并且中间不加支撑。",
        "设计一个能分散荷载的平台，让一摞硬币不会倒。",
      ],
      teacherNotes: "把正方形骨架和三角形加固骨架并排快速对比一次，让学生亲手感受三角形为什么重要。常见错误：把重量全堆在一边；提醒学生要放在中央，测试才公平。结构塌落时注意手指，并使用轻的硬币或垫圈，而不是重物。",
      teacherGuide: {
        setup: [
          "提前布置好每组的缺口：两摞一样高的书（或两个杯子），相距约 20 厘米。",
          "把荷载，也就是一杯硬币或垫圈，放在共用的测试站。",
          "演示一次：平整卡片纸对比折过的卡片纸，正方形对比三角形，让学生感受形状为什么重要。",
        ],
        materialsPrep: [
          "每组数出大约 20 根手工棒和几张卡片纸，让所有人起点一致。",
          "使用轻的硬币或金属垫圈，绝不要用重物，这样结构塌落时才安全。",
        ],
        safetyNotes: [
          "结构失败时会突然断裂：承重测试时让脸远一点，手指不要放在桥面上。",
          "如果用到木签，它们是尖的；要密切看护，或者给年龄较小的学生换成吸管。",
        ],
        learningObjectives: [
          "解释什么是荷载和支撑，以及力如何往下传到支撑上。",
          "说明三角形在受力时比正方形更能保持形状。",
          "比较材料，并为较弱的材料挑一个更结实的形状。",
        ],
        commonFailures: [
          "重量堆在一边而不是中央，这不是公平的测试。",
          "接头胶带贴得太少，材料还没坏，结构先从连接处散开。",
          "平整、没有加固的桥面，中间会下陷。",
        ],
        questionsToAsk: [
          "「它最先在哪里弯了或断了，为什么偏偏是那里？」",
          "「现在承重最多的是哪一部分？」",
          "「哪里加一个三角形会有帮助？」",
          "「用更少的手工棒，你怎样承住同样的重量？」",
        ],
        easierVersion: "把缺口缩短到 10-12 厘米，并事先搭好两个支撑，让学生只专注于桥面。",
        harderVersion: "加宽缺口、禁止在中间加支撑，或者规定材料预算，比如 12 根手工棒。",
        cleanup: [
          "把可重复使用的手工棒上的胶带撕掉，分类收回箱子。",
          "把硬币和垫圈还回测试站，并回收失败的桥面。",
        ],
      },
    },
    {
      comparedMaterials: [
        "纸板",
        "雪糕棒",
        "绳子",
        "橡皮筋",
        "胶带",
      ],
      title: "让它动起来",
      projectName: "纸板抓夹或迷你起重机",
      summary: "学生制作一个纸板抓夹或迷你起重机，用杠杆和支点伸出去、抬起并移动一个小物件，从中探索简单机械。",
      estimatedTime: "50-60 分钟",
      concepts: [
        {
          term: "简单机械",
          definition: "让干活变轻松的基本工具，比如杠杆、滑轮或轮子。",
        },
        {
          term: "杠杆",
          definition: "一根绕着固定点转动、用来抬起或移动东西的硬杆。",
        },
        {
          term: "支点",
          definition: "杠杆绕着转动的那个固定点，也叫支撑点。",
        },
        {
          term: "机械优势",
          definition: "机械让一个小小的力推动更大的荷载，或者伸得比你的手臂更远。",
        },
        {
          term: "运动",
          definition: "机械的各个部件是怎么动的：滑动、转动、张开或抬起。",
        },
      ],
      designBrief: "用纸板和工字钉做一个抓夹或起重机，让它能伸出至少 20 厘米，夹起像纸团这样的轻物件，并把它放到指定的位置。",
      problem: "有个东西需要移动，但你不能用手去碰它，因为它太远、太高，或者在一个别扭的地方。设计一个工具，让它替你伸过去移动或抬起一个小物件，而且全程只能从你这一端操作。",
      realWorldConnection: {
        intro: "能伸、能抓、能抬的机械，靠的都是杠杆和支点，也就是你抓夹里的那些部件。你手上的一个小动作，会在另一端变成更大或更有力的动作。",
        appearsIn: [
          "起重机",
          "挖掘机",
          "剪刀",
          "抓娃娃机",
          "电梯",
          "机械臂",
        ],
      },
      constraints: [
        "这台机械只能用手从一端操作，不能用另一只手伸过去帮忙。",
        "使用纸板、手工棒、工字钉或绳子，以及胶带。",
        "物件必须被抬起来再放下，不能只是被推走。",
      ],
      materials: [
        "纸板",
        "工字钉",
        "绳子",
        "吸管",
        "胶带",
        "雪糕棒",
        "橡皮筋",
        "用来抬起的杯子或小物件",
      ],
      substitutions: [
        "用打结的绳子接头代替工字钉",
        "用吸管或木签代替雪糕棒",
        "用纸团或棉球当作要抬起的物件",
      ],
      buildSteps: [
        "选一种机械：会张开合上的抓夹，或者用绳子提升的起重机。两者用的是同样的道理。",
        "找到你的支点，也就是零件绕着转动的那个点，在那里用工字钉把两片连起来。",
        "做出足够长的把手或拉绳，让你能从自己这一端操作，而不用碰到物件。",
        "加上真正夹住物件的夹口或挂钩。",
        "尽早、经常测试动作。接头通常要调好几次，机械才会顺畅。",
      ],
      redesignPrompts: [
        "如果臂软塌塌或弯了，就换更硬的材料，或者再加一层纸板。",
        "接头太松会晃，太紧又转不动。把工字钉调到不松不紧刚刚好。",
        "如果夹口老是让物件掉下去，就加点摩擦面、一个挂钩，或者一个更深的小杯来兜住它。",
        "如果起重机的绳子打滑，就把它系住，或者绕在一个卷轴上来控制。",
      ],
      realWorldExamples: [
        "建筑起重机就是一根绕支点转动的巨大杠杆，用来吊起重物。",
        "剪刀和跷跷板都是绕着支点转动的杠杆。",
        "抓娃娃机和机械臂都用关节，就像你抓夹上的工字钉一样。",
      ],
      testingChallenges: [
        {
          test: "伸展测试",
          howTo: "从你手握的位置量起，看看抓夹能伸出多远。",
          measure: "伸展长度（厘米）",
        },
        {
          test: "夹持测试",
          howTo: "试着夹起物件，并在空中稳住五秒。",
          measure: "它是夹得住、打滑，还是把物件掉了？",
        },
        {
          test: "放置测试",
          howTo: "把夹起来的物件移到目标圆圈上再松开。",
          measure: "五次尝试中有几次落在目标里",
        },
      ],
      reflectionQuestions: [
        "你的设计是结实，还是好操作？",
        "它在哪里弯了？",
        "哪一部分起了杠杆的作用？",
        "是什么让动作变好或变差？",
        "你怎样才能改进夹持力或提升力？",
      ],
      extensionChallenges: [
        "加第二个关节，让你的抓夹能绕过一个拐角。",
        "重新设计夹口，让它能夹起球这样的圆形物件。",
        "让起重机把物件竖直提起来，而不是把它荡过去。",
      ],
      teacherNotes: "动手之前，先用手工棒做的跷跷板让学生感受支点这个概念。常见错误：工字钉钉得太紧，臂根本动不了，或者太松，整个软塌塌；目标是不松不紧。绳子张力最难掌握，所以起重机偏难，抓夹是低年级学生更合适的起点。",
      teacherGuide: {
        setup: [
          "给每组备好纸板条、工字钉、绳子和胶带，再加一个用来抬起的轻物件，比如一个纸团。",
          "在每张桌子上标出一个「目标点」，让学生练习把物件放下，而不只是抬起来。",
          "先演示一次支点：用工字钉把两根手工棒别在一起，展示它们怎样绕着它转动。",
        ],
        materialsPrep: [
          "在几条纸板上事先扎好工字钉的孔，给那些难以自己戳穿的学生使用。",
          "给做起重机的学生把绳子剪成大约 40 厘米一段。",
        ],
        safetyNotes: [
          "工字钉和任何扎孔工具都很尖：把纸板放在桌上向下扎孔，绝不要朝着手扎。",
          "剪刀递的时候把手朝前，并且放在桌上。",
        ],
        learningObjectives: [
          "指出支点，并解释杠杆绕着它转动。",
          "解释绳子只能拉，不能推。",
          "解释一端的小动作，可以在另一端变成更大或更有力的动作。",
        ],
        commonFailures: [
          "工字钉太紧导致臂动不了，或太松导致臂软塌塌。",
          "夹口把物件推开，而不是合上夹住它。",
          "起重机的绳子没有办法保持张力，所以荷载掉了下来。",
        ],
        questionsToAsk: [
          "「支点在哪里？如果把它挪个位置会怎样？」",
          "「哪一部分起了杠杆的作用？」",
          "「夹口为什么会让物件掉下去？」",
          "「不加更多纸板，你怎样获得更大的提升力？」",
        ],
        easierVersion: "让所有人都从两片式的「夹子」抓夹开始，跳过起重机，这样只需要照顾一个支点。",
        harderVersion: "要求机械伸出 30 厘米，或者要求它夹起球这样的圆形物件。",
        cleanup: [
          "把还能用的工字钉和绳子收回一个小盒子里。",
          "回收纸板边角料，较大的余料留到下次用。",
        ],
      },
    },
    {
      title: "为飞行而设计",
      projectName: "纸滑翔机或火星着陆器",
      summary: "学生制作一架纸滑翔机或一个用于跌落测试的火星着陆器，再测试重量和平衡如何改变它飞行或着陆的方式，从中研究飞行中的各种力。",
      estimatedTime: "50-60 分钟",
      concepts: [
        {
          term: "航空航天工程",
          definition: "设计在空中和太空中移动的东西，比如飞机、无人机、降落伞和航天器。",
        },
        {
          term: "重力",
          definition: "地球的吸引力。它把每一个物体都往地面方向拉。",
        },
        {
          term: "空气阻力",
          definition: "空气反过来推运动中的物体、让它慢下来的方式。",
        },
        {
          term: "平衡",
          definition: "重量的分布方式。平衡决定一个设计是飞得平稳，还是歪斜打转。",
        },
        {
          term: "微小的改动",
          definition: "一处小小的改动，一道折痕、一枚回形针、一点缓冲，就能改变一样东西飞行或坠落的方式。",
        },
      ],
      designBrief: "做一架能飞得又直又远的纸滑翔机，或者一个能在跌落中保护小载荷的火星着陆器。测试它，改一处，再测一次。",
      problem: "设计一样能安全穿过空气的东西。选一条路：一架飞得又远又直的滑翔机，或者一个在坠落着地时能保护小物件的着陆器。无论哪一条，空气和重力都在跟你作对。",
      realWorldConnection: {
        intro: "所有会飞或会落的东西，对抗的都是和你的设计一样的两种力：把它往下拉的重力，和反过来推它的空气。航空航天工程师通过外形来同时控制这两者。",
        appearsIn: [
          "飞机",
          "降落伞",
          "直升机",
          "航天器",
          "无人机",
        ],
      },
      constraints: [
        "每次都用同样的方式发射，测试才公平：同一个位置、同样轻推一下，或者同样的跌落高度。",
        "滑翔机路线：从一张纸和一枚回形针开始。着陆器路线：使用杯子、纸、胶带和缓冲材料。",
        "两次测试之间只改一处（一道折痕、一枚回形针，或一层缓冲）。",
      ],
      materials: [
        "纸",
        "卡片纸",
        "吸管",
        "胶带",
        "绳子",
        "咖啡滤纸",
        "杯子",
        "棉球",
        "橡皮筋",
        "一个塑料蛋、乒乓球或小玩具，作为要保护的对象",
      ],
      substitutions: [
        "用纸团代替塑料蛋或乒乓球",
        "做降落伞时用塑料袋代替咖啡滤纸",
        "用卷起的纸代替吸管",
      ],
      buildSteps: [
        "选一条路：一架飞得又远又直的滑翔机，或者一个在跌落时能保护小物件的着陆器。",
        "滑翔机：折出或剪出机翼形状，先做轻一点。之后可以加回形针来改变平衡。",
        "着陆器：先做一个能装住物件的杯子或盒子，再加缓冲、支腿或降落伞来减轻着陆冲击。",
        "第一个版本要简单，这样你才看得出一处改动带来了什么。",
        "别做过头，先定好公平的测试方法：滑翔机用同一个发射点，着陆器用同一个跌落高度。",
      ],
      redesignPrompts: [
        "如果滑翔机一头栽下去，就把一点重量（一枚回形针）往后移，或者把尾翼往上折。",
        "如果滑翔机拐弯或打转，检查两侧机翼是否一样，机头是否正。",
        "如果着陆器里的物件受损了，就加更多缓冲，或者用咖啡滤纸做的降落伞减慢下落。",
        "如果着陆器翻倒了，就把底座加宽，或者把重量降低。",
        "一次只改一处，这样你才知道到底哪一处改动起了作用。",
      ],
      realWorldExamples: [
        "飞机机翼的形状，能在穿过空气时产生升力。",
        "真正的火星着陆器用气囊、可压溃的支腿或降落伞来挺过着陆。",
        "机头折歪的纸飞机会一头栽下去，平衡决定了它的整条飞行路线。",
      ],
      testingChallenges: [
        {
          test: "滑翔机：距离",
          howTo: "用同样的方式发射三次，每次都量出它飞了多远。",
          measure: "最远距离（厘米）",
        },
        {
          test: "滑翔机：准头",
          howTo: "瞄准地板上的目标，用同样的方式发射五次。",
          measure: "五次落点中有几次靠近目标",
        },
        {
          test: "滑翔机：稳定性",
          howTo: "观察滑翔机在空中怎么移动。",
          measure: "笔直、拐弯，还是一头栽下",
        },
        {
          test: "着陆器：保护物件",
          howTo: "从固定高度放开着陆器，每次跌落后都检查物件。",
          measure: "物件完好无损吗？（是 / 否）",
        },
        {
          test: "着陆器：比较设计",
          howTo: "从同样的高度测试两种不同的着陆设计。",
          measure: "哪个设计更能保护物件",
        },
      ],
      reflectionQuestions: [
        "更重的设计飞得更好还是更差？",
        "设计失去平衡时发生了什么？",
        "是什么减慢了下落？",
        "是什么让着陆更安全？",
        "测试之后你改了什么？",
      ],
      extensionChallenges: [
        "让你的滑翔机绕一个大弯，而不是直着飞。",
        "做一个着陆器，在同样的跌落中保护两枚硬币而不是一枚。",
        "找出仍然能保住载荷的最轻的着陆器。",
      ],
      teacherNotes: "这节课最能让「每次只改一个变量」的道理真正落地，所以务必坚持统一的发射方式或跌落高度。常见错误：为了飞得更远而把滑翔机扔得更用力，这会掩盖设计改动本身的效果。让每个学生根据场地选择滑翔机或着陆器路线；在不方便安全投掷的地方，着陆器很合适。",
      teacherGuide: {
        setup: [
          "按场地来决定：滑翔机需要开阔的地面来发射，着陆器需要一个安全的跌落高度，比如一把椅子或一级台阶。按路线把学生分组。",
          "给滑翔机标出发射线和地面目标；给着陆器定出一个统一的跌落高度。",
          "把回形针放在手边，方便一次一枚地调整滑翔机的平衡。",
        ],
        materialsPrep: [
          "事先折好一架示范用的标枪式滑翔机，给出一个起点，但不规定唯一的设计。",
          "做着陆器的学生要有一个待保护的小物件（乒乓球或纸团），以及棉球、咖啡滤纸之类的缓冲材料。",
        ],
        safetyNotes: [
          "滑翔机是要扔出去的：只朝一个方向发射，绝不朝着人脸，并且一次只让一组发射。",
          "做着陆器时，要从稳固的台阶或椅子上放手，旁边有成年人看护。不许攀爬。",
        ],
        learningObjectives: [
          "解释重力（把物体往下拉）和空气阻力（空气反过来推）。",
          "说明移动重量如何改变滑翔机的平衡和飞行路线。",
          "每次只改一处，做一次受控测试。",
        ],
        commonFailures: [
          "为了距离而把滑翔机扔得更用力，这掩盖了设计改动真正起到的作用。",
          "机头过重的滑翔机会一头栽下，两侧机翼不对称则会让它打转。",
          "着陆器的缓冲放错了一侧，物件照样承受了冲击。",
        ],
        questionsToAsk: [
          "「你只改了哪一处，结果怎么样？」",
          "「重量在哪里：前面、后面，还是中间？」",
          "「是什么减慢了下落？」",
          "「你能把着陆器做得更轻，同时仍然保护住物件吗？」",
        ],
        easierVersion: "让所有人先飞同一款基础标枪式滑翔机，只加一枚回形针或挪动它的位置，这样被测试的改动一目了然。",
        harderVersion: "加一个地面目标来考察准头，或者要求着陆器从更高处跌落仍保住物件。",
        cleanup: [
          "回收纸滑翔机；把完好的着陆器留到第二次测试日。",
          "把回形针、棉球和被保护的物件收回各自的盒子。",
        ],
      },
    },
    {
      comparedMaterials: [
        "纸板",
        "纸",
        "吸管",
        "绳子",
        "胶带",
      ],
      title: "为人和地球做工程",
      projectName: "净水器、防洪屏障或产品再设计",
      summary: "学生设计一个净水器模型、一道防洪屏障，或对一件日常用品做再设计，在真实用户的需求与真实限制之间权衡，直面现实世界中的工程。",
      estimatedTime: "50-60 分钟",
      concepts: [
        {
          term: "为人而做的工程",
          definition: "工程师常常是在为真实的人解决问题，而不只是为了好玩。将来会使用这个设计的人排在第一位。",
        },
        {
          term: "材料很重要",
          definition: "不同材料的表现不一样：有的吸水，有的挡水，有的会弯或会断。选对材料本身就是设计的一部分。",
        },
        {
          term: "限制条件",
          definition: "设计上的约束，比如你能用哪些材料、它能做多大，或者你有多少时间。",
        },
        {
          term: "取舍",
          definition: "当把一件事做好会让另一件事变难时，你必须选出最重要的那一个。",
        },
        {
          term: "为用户而设计",
          definition: "好的设计从用户真正的需求出发，并且要交给真的会用它的人来测试。",
        },
      ],
      designBrief: "挑一个挑战：做一个能把脏水变清的过滤器、一道能把水挡在小房子之外的屏障，或者对一件日常用品做再设计，为某个具体用户解决问题。",
      problem: "设计一个能帮助人们或保护环境的方案。先想清楚你在帮谁、为他们解决什么问题，然后用手上的材料做出一个能完成这项工作的模型。",
      realWorldConnection: {
        intro: "工程中有很大一部分并不是做小玩意，而是让人们更安全、更健康，能过好日常生活。这些设计解决的是真实社区里的真实问题。",
        appearsIn: [
          "清洁供水系统",
          "防洪工程",
          "回收再利用",
          "更安全的产品",
          "可重复使用的包装",
        ],
      },
      constraints: [
        "动手之前，先说清楚你的用户是谁，以及你要为他们解决的那一个问题。",
        "只使用提供的材料，并记下哪些是要花钱的、哪些可能对环境有害。",
        "安全提示：净水器模型过滤出的水只用于测试，绝不能尝或喝。",
      ],
      materials: [
        "杯子",
        "咖啡滤纸",
        "棉球",
        "碎石",
        "沙子",
        "纸板",
        "胶带",
        "吸管",
        "纸",
        "卡片纸",
        "一个用于测试水的容器",
      ],
      substitutions: [
        "做过滤器时用剪开的塑料瓶代替杯子",
        "用烤盘或锡纸盛住防洪测试用的水",
        "用黏土或橡皮泥捏出屏障的墙体",
      ],
      buildSteps: [
        "选择你的挑战：净水器、防洪屏障，或者一件日常用品的再设计。",
        "在动手做任何东西之前，先说清楚你的用户是谁，以及你要为他们解决的那一个问题。",
        "过滤器：在杯子里一层层铺上材料（棉花、沙子、碎石、一张咖啡滤纸），让水依次穿过它们。",
        "防洪屏障：做出一道墙或一条水道，把水挡在一间纸或纸板做的小房子之外。",
        "再设计：研究那件物品，找出最让用户困扰的那一点，只改那一处。",
      ],
      redesignPrompts: [
        "过滤器：如果水还是浑，就再加一层，或者在顶上加更细的材料，比如咖啡滤纸。",
        "过滤器：如果流得太慢，就换更粗的材料层，或者用更宽的容器。",
        "防洪屏障：如果水漏过去了，就把缝隙堵上，或者在失守的地方把墙加高。",
        "再设计：观察你的用户卡在哪里，然后专门修好那一处。",
        "注意其中的取舍：某方面变好，是不是让另一方面变差了？",
      ],
      realWorldExamples: [
        "自来水厂让水穿过一层层沙子和碎石来把它净化。",
        "城市修筑堤坝和沙袋墙来挡住上涨的河水。",
        "产品工程师重新设计包装，既少用塑料，又照样保护里面的东西。",
      ],
      testingChallenges: [
        {
          test: "净水器：清澈度",
          howTo: "把同样的浑水倒进去过滤，再和原来的容器做对比。",
          measure: "更清、稍微清一点，还是没变化",
        },
        {
          test: "防洪屏障：让房子保持干燥",
          howTo: "朝屏障倒入固定量的水，再检查它后面的房子。",
          measure: "干的、有点湿，还是湿透了",
        },
        {
          test: "产品再设计：用户测试",
          howTo: "请一位同学扮演用户，试用重新设计过的物品。",
          measure: "它解决了对方的问题吗？还有哪里需要改进？",
        },
      ],
      reflectionQuestions: [
        "你是在为谁做设计？",
        "你的设计解决了什么问题？",
        "哪种材料效果最好？",
        "你做了什么取舍？",
        "为真实用户着想的话，你会改进什么？",
      ],
      extensionChallenges: [
        "改进你的过滤器，让它不只是过滤得更干净，还要更快。",
        "把你的屏障设计成可以重复使用，而不是用完就扔。",
        "重新设计你的产品，少用一种材料，又不失去它管用的关键之处。",
      ],
      teacherNotes: "这节课把工程和公平、环境联系了起来，所以动手之前要留出时间讨论「这是为谁做的」。要明确强调，过滤后的水绝不能喝。常见错误：还没说清用户和问题就跳去做方案；这节课要让学生在规划这一步多停留一会儿。",
      teacherGuide: {
        setup: [
          "尽量把三个工位都摆出来：过滤器（杯子、沙子、碎石、棉花、浑水）、防洪屏障（托盘、水、一间纸做的小房子）和产品再设计（纸板、胶带、一件日常用品）。",
          "提前在水壶里搅入一点泥土或胡椒，做出浑浊的「脏水」，不要用任何不安全的东西。",
          "旁边备好托盘、水桶或水槽，用来接水和处理溅洒。",
        ],
        materialsPrep: [
          "如果要用塑料瓶，就事先把它们剪成过滤器的外壳。",
          "提前倒出等量的浑水，让每个小组都用同样的起始用水来测试。",
        ],
        safetyNotes: [
          "过滤后的水只能看：学生绝不可以尝或喝这节课里的任何水。要说出来，并在工位上贴出提示。",
          "立刻擦干溅出的水以防滑倒，并让所有水远离电子设备。",
        ],
        learningObjectives: [
          "解释工程师是在为具体的用户和真实的问题做设计。",
          "说出自己设计中的一个限制条件和一个取舍。",
          "根据材料的表现来选材：它是吸水、挡水，还是能过滤水。",
        ],
        commonFailures: [
          "还没说清用户和问题就开始动手。",
          "过滤层铺得太松，浑水直接穿了过去。",
          "防洪屏障边缘留有缝隙，水从那里溜了过去。",
        ],
        questionsToAsk: [
          "「这是为谁做的？你在为他们解决什么问题？」",
          "「你做了什么取舍？有东西变好的时候，什么变差了？」",
          "「哪种材料效果最好？你觉得为什么是它？」",
          "「真实用户还会在什么地方觉得难用？」",
        ],
        easierVersion: "给全班只指定一条路线，通常是净水器，并且直接把用户和问题告诉他们。",
        harderVersion: "加上第二个目标，比如过滤器还要够快，或者屏障必须可以重复使用，这会逼出一个明确的取舍。",
        cleanup: [
          "把用过的水倒进水槽或水桶，不要倒进垃圾桶；湿透的材料拧干后再扔。",
          "把还能用的杯子、托盘和纸板擦干收好。",
        ],
      },
    },
    {
      title: "终极工程挑战",
      projectName: "救援任务设计挑战",
      summary: "在这个总结性项目里，学生把课程中的一切，也就是结构、力、运动和测试，汇聚起来，设计一套能把补给包送过危险区域并完好送达的系统。",
      estimatedTime: "60-75 分钟",
      conceptsReviewed: [
        "工程设计流程",
        "结构",
        "力",
        "材料",
        "运动",
        "测试",
        "失败",
        "重新设计",
        "限制条件",
        "取舍",
      ],
      concepts: [
        {
          term: "系统",
          definition: "几个部分为同一个目标一起工作，比如一个结构再加一个会动的部件。",
        },
        {
          term: "把想法组合起来",
          definition: "在一个设计里同时用上不止一个工程概念：强度、运动和平衡。",
        },
        {
          term: "限制条件与取舍",
          definition: "在满足挑战全部规则的同时，选出你要把哪一点做到最好。",
        },
        {
          term: "迭代",
          definition: "一次又一次地测试并改进你的设计，直到它达成目标。",
        },
      ],
      designBrief: "设计并制作一套系统，把一个补给包送过危险区（一道缺口、一条「河」或一段落差），并完好地送到对岸。运用整门课程学到的结构、运动、材料和测试本领。",
      problem: "一个补给包需要穿过一片危险区域，避免损坏并安全抵达。你的任务是只用发给你的材料，设计一套能把补给包送过或护过这片危险区的系统。这是你的终极挑战，它汇聚了整门课程的全部内容。",
      realWorldConnection: {
        intro: "真实的救援和运送任务面对的正是这个问题：把贵重的东西送过危险的地方而不损坏它。工程师把结构、运动和防护结合起来才做到这一点。",
        appearsIn: [
          "搜救队",
          "货运无人机",
          "空投救援物资",
          "缆车",
          "配送系统",
        ],
      },
      solutionPaths: [
        "一座把补给包送过缺口的桥",
        "一条把补给包滑到对岸的溜索",
        "一套把它缓缓放下的降落伞系统",
        "一台把它吊起并放好的起重机或抓夹",
        "一个能挺过整段旅程的防护包装",
        "一辆把它运到对岸的小车或小雪橇",
      ],
      constraints: [
        "补给包必须穿过危险区，不能用手拿过去。",
        "它必须完好抵达，只是过去了并不算数。",
        "只能使用提供的材料。",
        "你有三次测试机会，两次之间可以改进设计。",
      ],
      materials: [
        "纸",
        "纸板",
        "杯子",
        "绳子",
        "胶带",
        "吸管",
        "雪糕棒",
        "橡皮筋",
        "卡片纸",
        "回形针",
        "一个当作补给包的小物件",
      ],
      substitutions: [
        "用玩具、橡皮或小盒子当作补给包",
        "用毛线代替绳子",
        "用卷起的纸筒代替吸管",
      ],
      buildSteps: [
        "选一条解决路线，动手之前先把它画出来。",
        "先做一个简单的第一版，也就是原型，要真的能测试，而不是一个完美的成品模型。",
        "布置好你的危险区，并想好每次都怎样进行同一个测试。",
        "让补给包好装上去，如果你的设计会移动，也要让它在终点好放下来。",
        "留出可以改动的余地：你会测试、找出失败之处，然后改进。",
      ],
      redesignPrompts: [
        "如果补给包掉了或损坏了，就加防护，或者在旅程末端让它慢下来。",
        "如果结构下陷或断了，就在失败的地方加一道三角形斜撑或一个支撑。",
        "如果活动部件卡住或打滑，就调整张力、支点或坡度。",
        "改一处，再做一次同样的测试，看看有没有用。",
        "留意取舍：更重更结实的设计，可能会走得更慢。",
      ],
      realWorldExamples: [
        "搜救队用滑轮和溜索把人送过峡谷和河流。",
        "货运起重机和缆车把结实的结构和一条会动的索道结合在一起。",
        "灾害工程师设计的桥梁和升降设备既能快速架起，又照样承得住荷载。",
      ],
      testingChallenges: [
        {
          test: "穿越测试",
          howTo: "从头到尾跑一遍任务，穿过危险区。",
          measure: "补给包到达对岸了吗？（是 / 否）",
        },
        {
          test: "安全抵达测试",
          howTo: "每一轮结束时检查补给包。",
          measure: "完好且端正，还是掉落或受损了？",
        },
        {
          test: "可靠性测试",
          howTo: "不重新制作，把任务连做三次。",
          measure: "三次里有几次成功",
        },
      ],
      reflectionQuestions: [
        "你把前面几节课的哪些想法组合起来了？它们是怎样配合的？",
        "第一轮里什么失败了？你怎样用它来改进设计？",
        "哪个限制条件或取舍对你的设计影响最大？",
        "如果再给你一周，你最先重新设计哪一部分？",
      ],
      presentationPrompts: [
        "你解决了什么问题？",
        "你做了什么？",
        "一开始什么失败了？",
        "你改进了什么？",
        "前面哪一节课对你帮助最大？",
        "如果时间更充裕，你会改什么？",
      ],
      extensionChallenges: [
        "在一轮之内送两个补给包，而且不增加多少重量。",
        "让这次穿越跨过更长或更险的危险区。",
        "加上一种在终点把补给包轻轻放下的方式，而不是让它掉下去。",
      ],
      teacherNotes: "把这节课当作整门课程的成果展示，而不是一个新概念。要求学生画出真正的规划草图，并写明自己用到了前面哪些本领。留出时间做至少两轮测试与改进，迭代才是重点。最后安排一次简短的作品巡展，让各组演示自己的救援方案，收尾会很有力。",
      teacherGuide: {
        setup: [
          "布置一个全班共用的「危险区」：在地上用胶带标出一道缺口，或利用两张桌子之间的空隙，宽约 40-60 厘米。",
          "把全部材料摆在材料桌上，并要求各组在动手之前先选定一条解决路线。",
          "安排三轮计时测试，每两轮之间留出重新设计的时间。",
        ],
        materialsPrep: [
          "给每组同一种「补给包」物件（一个小盒子、一块橡皮或一个玩具），这样结果才可比。",
          "绳子、胶带和回形针要备足：溜索和起重机方案消耗得最快。",
        ],
        safetyNotes: [
          "溜索需要固定点：用胶带粘牢的绳子或一把椅子，绝不要用头部高度、可能会突然弹回的东西。",
          "脚不要踏进危险区，并且一次只测试一个组。",
        ],
        learningObjectives: [
          "把结构、运动、材料和测试组合成一套能运转的系统。",
          "走完整个设计流程，其中至少包含一次失败之后的重新设计。",
          "说明是哪些限制条件和取舍塑造了自己的设计。",
        ],
        commonFailures: [
          "做得太大，来不及完成和测试；要推动他们先做一个简单、可测试的版本。",
          "补给包送到了，却是坏的，因为防护是最后才想起来的。",
          "活动部件（溜索或起重机）没有张力控制，导致补给包卡住或掉落。",
        ],
        questionsToAsk: [
          "「这个作品最多用到了前面哪一节课的内容？」",
          "「第一轮里什么失败了？你打算只改哪一处？」",
          "「补给包最可能在哪里受损？」",
          "「你做了什么取舍：速度、强度，还是重量？」",
        ],
        easierVersion: "把危险区收窄，并引导各组选择防护包装或桥梁路线，它们需要的活动部件最少。",
        harderVersion: "要求送两个补给包、加长危险区，或者要求终点轻放，不许让补给包掉下去。",
        cleanup: [
          "撕掉危险区的胶带，收回绳子、回形针和当作补给包的物件。",
          "把最好的作品留作展示，其余的回收。",
        ],
      },
    },
  ],
}

const pt: DeepPartial<EngineeringCurriculum> = {
  title: "Fundamentos de Engenharia",
  subtitle: "Aprenda como os engenheiros projetam, constroem, testam e melhoram soluções por meio de seis desafios práticos.",
  description: "Um curso prático de engenharia de 6 semanas em que os alunos aprendem a pensar como engenheiros de verdade, construindo, testando e redesenhando estruturas, máquinas e soluções com materiais do dia a dia.",
  gradeRange: "2.º ao 5.º ano",
  duration: "6 semanas",
  estimatedTimePerLesson: "45-75 minutos",
  requirement: "Materiais de construção comuns, sem computador",
  summary: "Os alunos aprendem engenharia do jeito que os engenheiros realmente trabalham: recebem um desafio, desenham um plano, constroem uma primeira versão, testam com medições reais e melhoram o projeto. Cada semana gira em torno de um projeto feito com materiais baratos e do dia a dia (papel, papelão, fita e barbante) e de uma grande ideia da engenharia, da estabilidade às máquinas simples e ao voo. O curso termina com um desafio final que reúne tudo em um único projeto de missão de resgate.",
  format: [
    "Uma ideia de engenharia e uma construção por semana, em uma ordem que vai somando habilidades.",
    "Cada aula segue o mesmo processo de projeto: perguntar, imaginar, planejar, construir, testar e melhorar.",
    "Os alunos testam o que constroem com medições reais e anotam os resultados.",
    "O redesenho faz parte do curso: a primeira versão nunca é a versão final.",
    "Todos os projetos usam materiais comuns e baratos, sem computador nem kit especial.",
  ],
  learningGoals: [
    "Explicar o que os engenheiros fazem",
    "Usar o processo de projeto de engenharia",
    "Construir e testar estruturas simples",
    "Entender forças, cargas e estabilidade",
    "Comparar materiais",
    "Melhorar um projeto depois de uma falha",
    "Resolver problemas com restrições",
    "Concluir um desafio final de projeto de engenharia",
  ],
  materials: [
    "Papel sulfite ou papel colorido, e fichas de cartolina",
    "Papelão (caixas de cereal, caixas de papelão) e cartolina grossa",
    "Fita crepe e fita adesiva transparente",
    "Barbante, lã e elásticos",
    "Palitos de picolé e espetos de madeira ou canudos",
    "Tesoura, uma régua e lápis",
    "Copos de papel, pratinhos de papel e clipes ou colchetes bailarina",
    "Moedas, arruelas ou pesinhos para os testes de carga",
    "Algodão, areia ou pedrisco, e um copo transparente para a aula do filtro de água",
    "Um caderno de desenho ou as folhas de planejamento imprimíveis de cada aula",
  ],
  materialGroups: [
    {
      label: "Materiais básicos",
      items: [
        "Papel",
        "Papelão",
        "Fita adesiva",
        "Tesoura",
        "Régua",
        "Lápis",
      ],
    },
    {
      label: "Materiais de construção",
      items: [
        "Palitos de picolé",
        "Canudos",
        "Fichas de cartolina",
        "Copos de papel",
        "Clipes",
      ],
    },
    {
      label: "Materiais de movimento",
      items: [
        "Barbante",
        "Elásticos",
        "Colchetes bailarina",
        "Objetos pequenos para levantar",
      ],
    },
    {
      label: "Materiais de teste",
      items: [
        "Moedas",
        "Arruelas",
        "Livros",
        "Fita métrica",
        "Pesinhos",
      ],
    },
    {
      label: "Materiais opcionais",
      items: [
        "Filtros de café",
        "Bolinhas de algodão",
        "Pedrisco",
        "Areia",
        "Ovinhos de plástico",
        "Bolinhas de pingue-pongue",
      ],
    },
  ],
  materialProperties: [
    {
      name: "Papel",
      property: "Leve e dobra com facilidade. Fica bem mais forte quando é dobrado ou enrolado.",
    },
    {
      name: "Papelão",
      property: "Mais forte que o papel. Bom para painéis, plataformas e bases.",
    },
    {
      name: "Canudos",
      property: "Leves e práticos para estruturas, mas entortam se nada os apoiar.",
    },
    {
      name: "Palitos de picolé",
      property: "Fortes como vigas e difíceis de entortar, mas mais pesados que o papel.",
    },
    {
      name: "Barbante",
      property: "Ótimo para puxar, mas não consegue empurrar: ele simplesmente afrouxa.",
    },
    {
      name: "Fita adesiva",
      property: "Útil para unir peças, mas as junções podem falhar se receberem carga demais.",
    },
    {
      name: "Elásticos",
      property: "Esticam para guardar energia e puxam as peças de volta.",
    },
  ],
  materialsNote: "Você não precisa de todos os materiais para começar. Cada aula traz substituições.",
  planningPrompts: [
    "Desenhe sua ideia antes de construir. Um rascunho rápido já basta.",
    "Aponte a parte mais forte do seu projeto e a parte de que você menos tem certeza.",
    "Preveja o que pode falhar primeiro quando você testar.",
    "Decida qual material vai em cada lugar e por que aquele material serve para aquela função.",
  ],
  designProcess: [
    {
      description: "Leia o desafio e as regras dele. O que precisa funcionar e o que você não pode fazer?",
    },
    {
      title: "Imagine",
      description: "Pense em algumas maneiras diferentes de resolver. Engenheiros nunca começam com uma ideia só.",
    },
    {
      title: "Planeje",
      description: "Desenhe seu projeto e nomeie as partes. Decida de que material cada parte precisa.",
    },
    {
      title: "Crie",
      description: "Construa uma primeira versão, um protótipo. Ele não precisa ser perfeito; precisa poder ser testado.",
    },
    {
      title: "Teste",
      description: "Faça sempre o mesmo teste justo e anote o que realmente aconteceu.",
    },
    {
      title: "Melhore",
      description: "Use o que o teste mostrou para mudar uma coisa só e teste de novo. Isso é redesenhar.",
    },
  ],
  lessons: [
    {
      title: "Pense como um engenheiro",
      projectName: "Desafio da torre de papel",
      summary: "Os alunos conhecem o processo de projeto de engenharia construindo a torre mais alta que conseguirem com algumas folhas de papel e um pouco de fita, e depois a redesenham para que fique mais alta e mais firme.",
      estimatedTime: "45-60 minutos",
      concepts: [
        {
          term: "Processo de projeto de engenharia",
          definition: "Os passos que os engenheiros repetem para resolver um problema: perguntar, imaginar, planejar, construir, testar e melhorar.",
        },
        {
          term: "Estabilidade",
          definition: "O quanto uma coisa se mantém em pé sem tombar. Uma base larga e baixa é mais estável.",
        },
        {
          term: "Protótipo",
          definition: "Uma primeira versão de um projeto que você constrói para poder testar e aprender com ela.",
        },
        {
          term: "Redesenho",
          definition: "Mudar seu projeto depois de um teste para que funcione melhor, em vez de começar do zero.",
        },
      ],
      designBrief: "Construa a torre de papel mais alta que você conseguir e que fique em pé sozinha por pelo menos dez segundos. Depois use o que aprendeu no teste para construir uma segunda versão, melhor.",
      problem: "Sua equipe tem uma pilha de papel, um pouco de fita e uma única tarefa: construir a torre mais alta possível que fique em pé sozinha. Ela precisa se manter firme por pelo menos dez segundos sem ninguém encostar. Quanto mais alta, melhor, mas uma torre alta que cai não vale.",
      realWorldConnection: {
        intro: "Tudo o que é alto precisa resolver o mesmo problema da sua torre: como ficar em pé sem tombar. Os engenheiros que projetam estruturas altas dedicam quase todo o esforço à base e ao equilíbrio, não ao topo.",
        appearsIn: [
          "Arranha-céus",
          "Torres de telefonia e de rádio",
          "Torres de observação",
          "Guindastes de construção",
        ],
      },
      constraints: [
        "Use apenas o papel e a fita que você recebeu (por exemplo, 5 folhas de papel e 30 cm de fita).",
        "A torre precisa ficar em pé sozinha: não pode se apoiar na parede nem ser segurada.",
        "Nada de outros materiais, e não vale encurtar a torre para escorá-la.",
      ],
      materials: [
        "Papel",
        "Fita adesiva",
        "Tesoura",
        "Régua",
        "Moedas ou pesinhos",
      ],
      substitutions: [
        "Fichas de cartolina no lugar do papel",
        "Livros ou blocos pequenos no lugar das moedas",
      ],
      buildSteps: [
        "Comece pela base. Decida a largura dela: uma base mais larga é mais difícil de tombar.",
        "Escolha como usar seu papel: tubos enrolados, colunas dobradas, tiras lisas ou uma mistura. Não existe uma única forma certa.",
        "Construa por seções que você possa testar, em vez de montar a torre inteira de uma vez.",
        "Use fita só onde as peças se juntam. Fita demais perto do topo acrescenta peso justamente onde você não quer.",
        "Vá colocando a torre em pé enquanto constrói, para conferir se não está inclinada antes de subir mais.",
      ],
      redesignPrompts: [
        "Se ela tombou, alargue a base ou desça mais peso para baixo.",
        "Se ela cedeu ou entortou no meio, acrescente uma dobra ou um apoio para enrijecer aquela seção.",
        "Se o topo pendeu, use menos papel lá em cima para que a torre pese menos onde é mais fraca.",
        "Mude uma coisa só e teste de novo, assim você sabe o que realmente ajudou.",
      ],
      realWorldExamples: [
        "Os arranha-céus têm uma base larga e pesada para que o vento não os derrube.",
        "As torres de telefonia e de rádio usam uma estrutura travada com triângulos para ficarem altas sem cair.",
        "Um cone de trânsito é largo embaixo e leve em cima, por isso é difícil derrubá-lo.",
      ],
      testingChallenges: [
        {
          test: "Teste de altura",
          howTo: "Coloque a torre pronta em pé sobre uma mesa lisa e meça da mesa até o topo.",
          measure: "Altura em centímetros",
        },
        {
          test: "Teste de ficar em pé sozinha",
          howTo: "Solte a torre completamente e comece a contar.",
          measure: "Quantos segundos ela fica em pé antes de tombar (meta: 10 ou mais)",
        },
        {
          test: "Teste de balanço",
          howTo: "Sopre de leve na torre, a um braço de distância.",
          measure: "Ela balança e se recupera, ou cai?",
        },
      ],
      reflectionQuestions: [
        "O que deixou sua torre estável ou instável?",
        "Qual formato ou qual base funcionou melhor?",
        "O que falhou primeiro?",
        "O que você melhorou depois de testar?",
        "Em que o seu segundo projeto ficou melhor que o primeiro?",
      ],
      extensionChallenges: [
        "Reconstrua sua torre para que ela segure uma moeda bem no topo sem cair.",
        "Tente bater a sua melhor altura usando uma folha de papel a menos.",
        "Projete uma torre que aguente tanto uma batidinha na mesa quanto um sopro de ar.",
      ],
      teacherNotes: "A meta da primeira semana é o processo, não a torre mais alta. Dê aos alunos uma primeira construção curta, depois pare a turma para testar e conversar antes de deixá-los reconstruir: o redesenho é onde o aprendizado acontece. Erro comum: enrolar o papel em tubos finos, que ficam altos mas tombam na hora; oriente os alunos para uma base mais larga. Incentive um rascunho rápido antes de usar qualquer fita.",
      teacherGuide: {
        setup: [
          "Libere uma mesa lisa para cada aluno ou equipe e separe 5 folhas de papel e cerca de 30 cm de fita para cada um.",
          "Monte uma única \"estação de testes\" com uma régua ou fita métrica, para que todas as torres sejam medidas do mesmo jeito.",
          "Planeje a aula em duas rodadas: uma primeira construção (cerca de 10 minutos), uma pausa para testar e conversar, e depois um redesenho (cerca de 10 minutos).",
        ],
        materialsPrep: [
          "Corte a fita antes em tiras de 30 cm, para não perder tempo puxando fita do rolo.",
          "Deixe um copinho de moedas na estação de testes para o teste opcional de segurar uma moeda no topo.",
        ],
        safetyNotes: [
          "O risco é baixo no geral. A tesoura fica sobre a mesa e é passada com o cabo para a frente.",
        ],
        learningObjectives: [
          "Nomear os passos do processo de projeto de engenharia e reconhecer que uma primeira tentativa é um protótipo.",
          "Explicar que uma base mais larga e mais baixa deixa a torre mais estável.",
          "Mudar um projeto com base no que o teste mostrou, em vez de chutar.",
        ],
        commonFailures: [
          "Tubos finos enrolados, que ficam altos mas tombam na hora: a base é estreita demais.",
          "Fita demais perto do topo, acrescentando peso onde a torre é mais fraca.",
          "Construir a torre inteira antes de testar, então a falha só aparece no fim.",
        ],
        questionsToAsk: [
          "\"Para onde está indo o peso?\", isso os leva a pensar na base e no equilíbrio.",
          "\"Que parte falhou primeiro quando ela caiu?\"",
          "\"O que mudou entre a sua primeira torre e a segunda?\"",
          "\"Como você poderia deixá-la mais alta usando a mesma quantidade de papel?\"",
        ],
        easierVersion: "Dê uma altura-alvo a alcançar (por exemplo, 30 cm) em vez de \"a mais alta possível\", e deixe os alunos começarem com tubos de papel já enrolados.",
        harderVersion: "Peça que a torre segure uma moeda no topo por 10 segundos, ou limite a fita a 15 cm para que a escolha dos materiais pese mais.",
        cleanup: [
          "Achate e recicle as torres de papel; guarde como rascunho as folhas sem fita.",
          "Recolha as moedas e as réguas de volta para a estação de testes.",
        ],
      },
    },
    {
      comparedMaterials: [
        "Palitos de picolé",
        "Canudos",
        "Papelão",
        "Papel",
        "Fita adesiva",
      ],
      title: "Construa forte",
      projectName: "Desafio de resistência: ponte ou plataforma",
      summary: "Os alunos descobrem por que triângulos e bons apoios deixam as estruturas fortes, construindo uma pequena ponte ou plataforma que precisa aguentar o máximo de peso possível sem desabar.",
      estimatedTime: "50-60 minutos",
      concepts: [
        {
          term: "Estrutura",
          definition: "Algo construído para se sustentar e carregar um peso, como uma ponte ou uma prateleira.",
        },
        {
          term: "Carga",
          definition: "O peso que uma estrutura precisa aguentar, incluindo o peso da própria estrutura.",
        },
        {
          term: "Apoio",
          definition: "Uma peça que sustenta a carga e passa a força até o chão.",
        },
        {
          term: "Travamento em triângulo",
          definition: "Acrescentar formas de triângulo a um projeto, porque os triângulos mantêm o formato sob carga melhor que os quadrados.",
        },
        {
          term: "Resistência do material",
          definition: "Quanta força um material aguenta antes de entortar ou quebrar. O formato pode fazer um material fraco agir como forte.",
        },
      ],
      designBrief: "Construa uma ponte ou plataforma elevada que vença um vão de cerca de 20 cm e segure o maior número possível de moedas (ou arruelas) antes de entortar demais ou desabar.",
      problem: "Uma cidadezinha ficou isolada por um vão (um riacho, uma ravina, uma estrada levada pela água) e precisa receber mantimentos do outro lado. Sua tarefa é construir uma ponte ou plataforma elevada que vença o vão e aguente o máximo de peso possível sem entortar demais nem desabar.",
      realWorldConnection: {
        intro: "Toda estrutura que sustenta alguma coisa está resolvendo o problema da sua ponte: carregar um peso ao longo de uma distância sem entortar nem quebrar. As mesmas ideias sustentam uma estante e um viaduto de rodovia.",
        appearsIn: [
          "Pontes",
          "Prateleiras",
          "Telhados",
          "Mesas",
          "Brinquedos de parquinho",
        ],
      },
      constraints: [
        "A ponte precisa vencer um vão definido, por exemplo, a distância entre duas pilhas de livros.",
        "Use apenas os materiais fornecidos (palitos de picolé, papel, fichas de cartolina e fita).",
        "A carga precisa ficar apoiada sobre o tabuleiro, não colada com fita nem amarrada.",
      ],
      materials: [
        "Palitos de picolé",
        "Canudos",
        "Fichas de cartolina",
        "Fita adesiva",
        "Barbante",
        "Copos ou livros para os apoios",
        "Moedas, arruelas ou pesinhos",
      ],
      substitutions: [
        "Tubos de papel enrolado no lugar dos canudos",
        "Pilhas de livros no lugar dos copos para os apoios",
        "Arruelas ou porcas de metal no lugar das moedas",
      ],
      buildSteps: [
        "Monte primeiro o seu vão: coloque dois copos ou duas pilhas de livros a cerca de 20 cm de distância. Esse vão é o que a sua estrutura precisa vencer.",
        "Construa o tabuleiro, a parte plana onde os mantimentos ficam apoiados, para que ele vá de um lado ao outro.",
        "Acrescente apoios embaixo ou nas laterais para levar o peso até a mesa.",
        "Experimente usar triângulos: três palitos unidos em triângulo onde o tabuleiro encontra os apoios.",
        "Deixe o meio pronto para o teste. É ali que você vai pôr o peso, então deixe forte sem construir demais.",
      ],
      redesignPrompts: [
        "Se entortou no meio, acrescente um apoio ou um travamento em triângulo logo abaixo daquele ponto.",
        "Se uma junção se soltou, acrescente fita ou barbante para prender melhor aquela conexão.",
        "Se torceu para o lado, ligue os dois lados para que se movam juntos.",
        "Se um material falhava sempre, troque por um formato mais forte, como uma ficha dobrada ou um tubo, e teste de novo.",
      ],
      realWorldExamples: [
        "As pontes de treliça são feitas de fileiras de triângulos para conseguirem carregar trens pesados.",
        "As estruturas de telhado usam triângulos para que o telhado não ceda com a neve.",
        "Um pedaço de papelão dobrado é muito mais forte que um liso: o formato acrescenta resistência.",
      ],
      testingChallenges: [
        {
          test: "Teste de carga",
          howTo: "Coloque moedas uma a uma no centro do tabuleiro, contando conforme adiciona.",
          measure: "Quantas moedas ela aguenta antes de desabar",
        },
        {
          test: "Teste de flexão",
          howTo: "Observe o tabuleiro enquanto acrescenta peso e marque quando ele começa a ceder.",
          measure: "Quantas moedas até entortar mais que a largura de um dedo",
        },
        {
          test: "Teste do triângulo",
          howTo: "Compare uma versão travada com quadrados a uma travada com triângulos, usando os mesmos materiais.",
          measure: "Qual projeto aguenta mais, e por quantas moedas",
        },
      ],
      reflectionQuestions: [
        "Onde a sua estrutura entortou primeiro?",
        "Que parte carregou mais peso?",
        "Os triângulos ajudaram?",
        "Qual material funcionou melhor?",
        "O que você mudaria com menos materiais?",
      ],
      extensionChallenges: [
        "Reconstrua para aguentar a mesma carga com menos palitos de picolé.",
        "Faça a ponte vencer um vão mais largo sem acrescentar um apoio no meio.",
        "Projete uma plataforma que espalhe a carga para que uma pilha de moedas não tombe.",
      ],
      teacherNotes: "Faça uma comparação rápida, lado a lado, entre uma estrutura quadrada e uma travada com triângulos, para que os alunos sintam por que os triângulos importam. Erro comum: empilhar todo o peso em uma borda; mostre que a carga vai no centro para que o teste seja justo. Cuidado com os dedos quando as estruturas desabarem, e use moedas ou arruelas leves em vez de objetos pesados.",
      teacherGuide: {
        setup: [
          "Prepare com antecedência o vão de cada equipe: duas pilhas de livros iguais (ou dois copos) a cerca de 20 cm de distância.",
          "Deixe a carga, um copo de moedas ou arruelas, em uma estação de testes compartilhada.",
          "Demonstre uma vez: uma ficha lisa contra uma ficha dobrada, e um quadrado contra um triângulo, para que os alunos sintam por que o formato importa.",
        ],
        materialsPrep: [
          "Separe cerca de 20 palitos de picolé e algumas fichas de cartolina por equipe, para que todos comecem iguais.",
          "Use moedas leves ou arruelas de metal, nunca objetos pesados, para que um desabamento seja seguro.",
        ],
        safetyNotes: [
          "As estruturas estalam quando falham: mantenha os rostos afastados e os dedos fora do tabuleiro durante um teste de carga.",
          "Se usarem espetos, eles são pontudos; supervisione de perto ou troque por canudos com os alunos menores.",
        ],
        learningObjectives: [
          "Explicar o que é carga e apoio, e como a força desce até os apoios.",
          "Mostrar que os triângulos mantêm o formato sob carga melhor que os quadrados.",
          "Comparar materiais e escolher um formato mais forte para um material fraco.",
        ],
        commonFailures: [
          "Peso empilhado em uma borda em vez do centro: não é um teste justo.",
          "Junções coladas com pouca fita, então a estrutura se solta em uma conexão antes de o material falhar.",
          "Um tabuleiro liso e sem travamento, que cede no meio.",
        ],
        questionsToAsk: [
          "\"Onde entortou ou quebrou primeiro, e por que justo ali?\"",
          "\"O que está carregando mais peso agora?\"",
          "\"Onde um triângulo poderia ajudar?\"",
          "\"Como você aguentaria o mesmo peso usando menos palitos?\"",
        ],
        easierVersion: "Diminua o vão para 10-12 cm e monte antes os dois apoios, para que os alunos se concentrem só no tabuleiro.",
        harderVersion: "Alargue o vão, proíba um apoio no meio ou defina um orçamento de materiais, como 12 palitos de picolé.",
        cleanup: [
          "Tire a fita dos palitos reaproveitáveis e guarde-os de volta em uma caixa.",
          "Devolva moedas e arruelas à estação de testes e recicle os tabuleiros que falharam.",
        ],
      },
    },
    {
      comparedMaterials: [
        "Papelão",
        "Palitos de picolé",
        "Barbante",
        "Elásticos",
        "Fita adesiva",
      ],
      title: "Faça se mover",
      projectName: "Garra de papelão ou miniguindaste",
      summary: "Os alunos exploram as máquinas simples construindo uma garra de papelão ou um miniguindaste que usa alavancas e pivôs para se esticar, levantar e mover um objeto pequeno.",
      estimatedTime: "50-60 minutos",
      concepts: [
        {
          term: "Máquina simples",
          definition: "Uma ferramenta básica que facilita o trabalho, como uma alavanca, uma roldana ou uma roda.",
        },
        {
          term: "Alavanca",
          definition: "Uma barra rígida que gira em torno de um ponto fixo para levantar ou mover alguma coisa.",
        },
        {
          term: "Pivô",
          definition: "O ponto fixo em torno do qual a alavanca gira, também chamado de fulcro.",
        },
        {
          term: "Vantagem mecânica",
          definition: "Quando uma máquina faz um empurrão pequeno mover uma carga maior, ou alcançar mais longe do que o seu braço.",
        },
        {
          term: "Movimento",
          definition: "Como as partes de uma máquina se movem: deslizando, girando, abrindo ou levantando.",
        },
      ],
      designBrief: "Construa uma garra ou um guindaste de papelão e colchetes que alcance pelo menos 20 cm, pegue um objeto leve como uma bolinha de papel amassado e o deixe em um ponto marcado.",
      problem: "Uma coisa precisa ser movida, mas você não pode tocá-la com as mãos: está longe demais, alta demais ou em um lugar difícil. Projete uma ferramenta que consiga se esticar e mover ou levantar um objeto pequeno para você, operada inteiramente da sua ponta.",
      realWorldConnection: {
        intro: "As máquinas que alcançam, agarram e levantam dependem todas de alavancas e pivôs, as mesmas peças da sua garra. Um movimento pequeno na sua mão vira um movimento maior ou mais forte na outra ponta.",
        appearsIn: [
          "Guindastes",
          "Escavadeiras",
          "Tesouras",
          "Máquinas de garra",
          "Elevadores",
          "Braços robóticos",
        ],
      },
      constraints: [
        "A máquina precisa ser operada com a mão a partir de uma ponta só: nada de usar a outra mão para ajudar.",
        "Use papelão, palitos de picolé, colchetes bailarina ou barbante, e fita.",
        "O objeto precisa ser levantado e solto, não apenas empurrado.",
      ],
      materials: [
        "Papelão",
        "Colchetes bailarina",
        "Barbante",
        "Canudos",
        "Fita adesiva",
        "Palitos de picolé",
        "Elásticos",
        "Copos ou objetos pequenos para levantar",
      ],
      substitutions: [
        "Uma junção de barbante com nó no lugar do colchete bailarina",
        "Canudos ou espetos no lugar dos palitos de picolé",
        "Uma bolinha de papel amassado ou de algodão como objeto a levantar",
      ],
      buildSteps: [
        "Escolha sua máquina: uma garra que abre e fecha, ou um guindaste que levanta com um barbante. As duas usam as mesmas ideias.",
        "Ache o seu pivô, o ponto em torno do qual as peças giram, e junte ali duas partes com um colchete bailarina.",
        "Faça cabos ou um barbante de puxar compridos o bastante para operar a máquina da sua ponta sem encostar no objeto.",
        "Acrescente a pega ou o gancho que realmente segura o objeto.",
        "Teste o movimento cedo e sempre. As junções quase sempre precisam de ajuste antes de a máquina funcionar direito.",
      ],
      redesignPrompts: [
        "Se o braço bambeou ou entortou, use uma peça mais rígida ou acrescente uma segunda camada de papelão.",
        "Se uma junção ficou frouxa, ela bamba; se ficou apertada demais, não se move. Ajuste o colchete até ficar firme mas solto.",
        "Se a pega deixava o objeto cair, acrescente textura, um gancho ou um copinho mais fundo para segurá-lo melhor.",
        "Se o barbante do guindaste escorregava, amarre-o ou enrole-o em um carretel para ter controle.",
      ],
      realWorldExamples: [
        "Um guindaste de construção é uma alavanca gigante que gira em um pivô para levantar cargas pesadas.",
        "A tesoura e a gangorra são alavancas que giram em torno de um ponto de pivô.",
        "Uma máquina de garra e um braço robótico usam articulações, iguais aos colchetes da sua garra.",
      ],
      testingChallenges: [
        {
          test: "Teste de alcance",
          howTo: "Meça o quanto a garra se estica a partir do ponto em que sua mão a segura.",
          measure: "Alcance em centímetros",
        },
        {
          test: "Teste de pega",
          howTo: "Tente pegar o objeto e segurá-lo no ar por cinco segundos.",
          measure: "Ela segura, escorrega ou deixa o objeto cair?",
        },
        {
          test: "Teste de colocação",
          howTo: "Leve o objeto levantado até um círculo-alvo e solte.",
          measure: "Quantas das cinco tentativas caem no alvo",
        },
      ],
      reflectionQuestions: [
        "Seu projeto ficou forte ou fácil de mover?",
        "Onde ele entortou?",
        "Que parte funcionou como alavanca?",
        "O que deixou o movimento melhor ou pior?",
        "Como você poderia melhorar a pega ou a força de levantar?",
      ],
      extensionChallenges: [
        "Acrescente uma segunda articulação para que sua garra consiga dobrar em uma quina.",
        "Redesenhe a pega para que ela consiga pegar um objeto redondo, como uma bolinha.",
        "Faça o guindaste levantar o objeto em linha reta para cima em vez de balançá-lo.",
      ],
      teacherNotes: "Deixe os alunos sentirem primeiro a ideia do pivô com uma gangorra de palitos de picolé antes de construir. Erro comum: colchetes tão apertados que o braço não se move, ou tão frouxos que ele bamba; busquem uma junção firme mas solta. Controlar a tensão do barbante é a parte difícil de um guindaste: a garra é o ponto de partida mais simples para os alunos menores.",
      teacherGuide: {
        setup: [
          "Separe tiras de papelão, colchetes bailarina, barbante e fita por equipe, mais um objeto leve para levantar, como uma bolinha de papel amassado.",
          "Marque um \"ponto-alvo\" em cada mesa para que os alunos pratiquem colocar o objeto, não só levantá-lo.",
          "Demonstre primeiro um pivô: prenda dois palitos de picolé com um colchete e mostre como eles giram em torno dele.",
        ],
        materialsPrep: [
          "Fure antes os buracos dos colchetes em algumas tiras de papelão, para os alunos que tiverem dificuldade nessa etapa.",
          "Corte o barbante em pedaços de cerca de 40 cm para quem for construir um guindaste.",
        ],
        safetyNotes: [
          "Os colchetes bailarina e qualquer ferramenta de furar são pontudos: fure para baixo, com o papelão apoiado na mesa, nunca na direção da mão.",
          "A tesoura é passada com o cabo para a frente e fica sobre a mesa.",
        ],
        learningObjectives: [
          "Apontar o pivô e explicar que a alavanca gira em torno dele.",
          "Explicar que o barbante consegue puxar, mas não empurrar.",
          "Explicar que um movimento pequeno em uma ponta pode gerar um movimento maior ou mais forte na outra.",
        ],
        commonFailures: [
          "Colchetes apertados demais, com o braço travado, ou frouxos demais, com o braço bambo.",
          "Uma pega que empurra o objeto em vez de se fechar sobre ele.",
          "Um barbante de guindaste sem como manter a tensão, então a carga cai.",
        ],
        questionsToAsk: [
          "\"Onde está o pivô, e o que acontece se você mudá-lo de lugar?\"",
          "\"Que parte funcionou como alavanca?\"",
          "\"Por que a pega deixou o objeto cair?\"",
          "\"Como você teria mais força para levantar sem acrescentar mais papelão?\"",
        ],
        easierVersion: "Comece com toda a turma em uma garra tipo \"pregador de roupa\" de duas tiras e pule o guindaste, assim há um pivô só para administrar.",
        harderVersion: "Exija que a máquina alcance 30 cm, ou que pegue um objeto redondo, como uma bolinha.",
        cleanup: [
          "Recupere em um potinho os colchetes bailarina e o barbante reaproveitáveis.",
          "Recicle as sobras de papelão e guarde os pedaços maiores para a próxima vez.",
        ],
      },
    },
    {
      title: "Projete para voar",
      projectName: "Planador de papel ou sonda de pouso em Marte",
      summary: "Os alunos investigam as forças do voo construindo um planador de papel ou uma sonda de pouso marciana para teste de queda, e depois testam como o peso e o equilíbrio mudam o jeito como ela voa ou pousa.",
      estimatedTime: "50-60 minutos",
      concepts: [
        {
          term: "Engenharia aeroespacial",
          definition: "Projetar coisas que se movem pelo ar e pelo espaço, como aviões, drones, paraquedas e naves espaciais.",
        },
        {
          term: "Peso",
          definition: "A força com que a gravidade puxa. O peso puxa todo objeto para baixo, na direção do chão.",
        },
        {
          term: "Resistência do ar",
          definition: "O jeito como o ar empurra de volta um objeto em movimento e o freia.",
        },
        {
          term: "Equilíbrio",
          definition: "Como o peso está distribuído. O equilíbrio decide se um projeto voa firme ou se inclina e roda.",
        },
        {
          term: "Mudanças pequenas",
          definition: "Uma única mudança pequena (uma dobra, um clipe, um pouco de acolchoamento) pode mudar como algo voa ou cai.",
        },
      ],
      designBrief: "Construa um planador de papel que voe reto e longe, ou uma sonda de pouso marciana que proteja uma carga pequena numa queda. Teste, mude uma coisa só e teste de novo.",
      problem: "Projete algo que se mova com segurança pelo ar. Escolha o seu caminho: um planador que voe longe e reto, ou uma sonda que proteja um objeto pequeno quando ele cair e bater no chão. Dos dois jeitos, o ar e a gravidade jogam contra você.",
      realWorldConnection: {
        intro: "Tudo o que voa ou cai enfrenta as mesmas duas forças que o seu projeto: a gravidade puxando para baixo e o ar empurrando de volta. Os engenheiros aeroespaciais dão forma aos projetos para controlar as duas.",
        appearsIn: [
          "Aviões",
          "Paraquedas",
          "Helicópteros",
          "Naves espaciais",
          "Drones",
        ],
      },
      constraints: [
        "O mesmo lançamento sempre, para que o teste seja justo: mesmo lugar, mesmo empurrãozinho ou mesma altura de queda.",
        "Caminho do planador: comece com uma folha de papel e um clipe. Caminho da sonda: use copos, papel, fita e acolchoamento.",
        "Mude uma coisa só entre os testes (uma dobra, um clipe ou um acolchoamento).",
      ],
      materials: [
        "Papel",
        "Fichas de cartolina",
        "Canudos",
        "Fita adesiva",
        "Barbante",
        "Filtros de café",
        "Copos",
        "Bolinhas de algodão",
        "Elásticos",
        "Um ovinho de plástico, uma bolinha de pingue-pongue ou um brinquedo pequeno para proteger",
      ],
      substitutions: [
        "Uma bolinha de papel amassado no lugar do ovinho de plástico ou da bolinha de pingue-pongue",
        "Um saco plástico no lugar do filtro de café para o paraquedas",
        "Papel enrolado no lugar dos canudos",
      ],
      buildSteps: [
        "Escolha o seu caminho: um planador que voe longe e reto, ou uma sonda que proteja um objeto pequeno na queda.",
        "Planador: dobre ou recorte um formato de asa e comece leve. Depois você pode acrescentar um clipe para mudar o equilíbrio.",
        "Sonda: monte um copo ou uma caixa para segurar o objeto e depois acrescente acolchoamento, pernas ou um paraquedas para suavizar o pouso.",
        "Deixe a primeira versão simples, para conseguir ver o que uma única mudança faz.",
        "Defina um teste justo antes de construir demais: mesmo ponto de lançamento para os planadores, mesma altura de queda para as sondas.",
      ],
      redesignPrompts: [
        "Se o planador mergulhou, mova um pouco de peso (um clipe) para trás, ou dobre para cima as abas da cauda.",
        "Se o planador curvou ou rodou, confira se as duas asas estão iguais e se o nariz está reto.",
        "Se o objeto da sonda se danificou, acrescente mais acolchoamento ou freie a queda com um paraquedas de filtro de café.",
        "Se a sonda tombou, alargue a base dela ou desça o peso.",
        "Mude uma coisa por vez para saber qual mudança realmente ajudou.",
      ],
      realWorldExamples: [
        "As asas dos aviões têm um formato que gera sustentação enquanto avançam pelo ar.",
        "As sondas de pouso em Marte de verdade usam bolsas de ar, pernas que amassam ou paraquedas para sobreviver ao pouso.",
        "Um avião de papel com o nariz dobrado mergulha: o equilíbrio decide todo o percurso.",
      ],
      testingChallenges: [
        {
          test: "Planador: distância",
          howTo: "Lance do mesmo jeito três vezes e meça a distância de cada voo.",
          measure: "A maior distância em centímetros",
        },
        {
          test: "Planador: pontaria",
          howTo: "Mire em um alvo no chão e lance cinco vezes do mesmo jeito.",
          measure: "Quantos dos cinco pousos caem perto do alvo",
        },
        {
          test: "Planador: estabilidade",
          howTo: "Observe como o planador se move pelo ar.",
          measure: "Reto, curvado ou em mergulho",
        },
        {
          test: "Sonda: proteger o objeto",
          howTo: "Solte a sonda de uma altura fixa e confira o objeto depois de cada queda.",
          measure: "O objeto saiu sem danos? (sim / não)",
        },
        {
          test: "Sonda: comparar projetos",
          howTo: "Teste dois projetos de pouso diferentes da mesma altura.",
          measure: "Qual projeto protege melhor o objeto",
        },
      ],
      reflectionQuestions: [
        "Os projetos mais pesados voaram melhor ou pior?",
        "O que aconteceu quando o projeto ficou desequilibrado?",
        "O que freou a queda?",
        "O que deixou o pouso mais seguro?",
        "O que você mudou depois de testar?",
      ],
      extensionChallenges: [
        "Faça o seu planador dar uma volta larga em vez de voar reto.",
        "Faça uma sonda que proteja duas moedas em vez de uma na mesma queda.",
        "Encontre a sonda mais leve que ainda assim mantenha a carga segura.",
      ],
      teacherNotes: "Esta é a aula em que a ideia de mudar uma variável por vez realmente pega: insista em um lançamento ou uma altura de queda iguais. Erro comum: jogar o planador com mais força para ganhar distância, o que esconde o efeito da mudança de projeto. Deixe cada aluno escolher o caminho do planador ou da sonda conforme o espaço; as sondas funcionam bem onde não dá para lançar com segurança.",
      teacherGuide: {
        setup: [
          "Decida pelo espaço: planadores precisam de chão livre para lançar; sondas precisam de uma altura de queda segura, como uma cadeira ou um degrau. Divida a turma por caminho.",
          "Marque uma linha de lançamento e um alvo no chão para os planadores; marque uma única altura de queda para as sondas.",
          "Deixe clipes à mão para mudar o equilíbrio do planador um clipe por vez.",
        ],
        materialsPrep: [
          "Dobre antes um planador de amostra tipo dardo, para mostrar um ponto de partida sem impor um único projeto.",
          "Para as sondas, forneça um objeto pequeno a proteger (bolinha de pingue-pongue ou papel amassado) e acolchoamento, como algodão e filtros de café.",
        ],
        safetyNotes: [
          "Planadores são lançados: lancem em uma direção só, nunca na direção do rosto, e uma equipe por vez.",
          "Para as sondas, solte de um degrau ou de uma cadeira firme com um adulto ao lado. Ninguém sobe.",
        ],
        learningObjectives: [
          "Explicar o peso (a gravidade puxando para baixo) e a resistência do ar (o ar empurrando de volta).",
          "Mostrar como mover o peso muda o equilíbrio e a trajetória de um planador.",
          "Fazer um teste controlado mudando uma coisa só por vez.",
        ],
        commonFailures: [
          "Jogar o planador com mais força para ganhar distância, o que esconde o que a mudança de projeto realmente fez.",
          "Um planador com o nariz pesado, que mergulha, ou asas desiguais, que o fazem rodar.",
          "Uma sonda com o acolchoamento do lado errado, então o objeto leva o impacto assim mesmo.",
        ],
        questionsToAsk: [
          "\"Que única coisa você mudou, e o que aconteceu?\"",
          "\"Onde está o peso: na frente, atrás ou no meio?\"",
          "\"O que freou a queda?\"",
          "\"Dá para deixar a sonda mais leve e ainda proteger o objeto?\"",
        ],
        easierVersion: "Que todos voem primeiro o mesmo planador tipo dardo e só acrescentem ou mudem um clipe de lugar, para que a mudança testada fique bem clara.",
        harderVersion: "Acrescente um alvo no chão para medir pontaria, ou exija que a sonda proteja o objeto de uma queda mais alta.",
        cleanup: [
          "Recicle os planadores de papel; guarde as sondas inteiras para um segundo dia de testes.",
          "Recolha os clipes, o algodão e os objetos protegidos de volta para suas caixas.",
        ],
      },
    },
    {
      comparedMaterials: [
        "Papelão",
        "Papel",
        "Canudos",
        "Barbante",
        "Fita adesiva",
      ],
      title: "Engenharia para as pessoas e para o planeta",
      projectName: "Filtro de água, barreira contra enchentes ou redesenho de produto",
      summary: "Os alunos encaram a engenharia do mundo real projetando um modelo de filtro de água, uma barreira contra enchentes ou o redesenho de um produto do dia a dia, pesando o que usuários reais precisam diante de restrições reais.",
      estimatedTime: "50-60 minutos",
      concepts: [
        {
          term: "Engenharia para as pessoas",
          definition: "Os engenheiros costumam resolver problemas de pessoas reais, não só por diversão. Quem vai usar o projeto vem primeiro.",
        },
        {
          term: "Os materiais importam",
          definition: "Cada material se comporta de um jeito: uns absorvem água, outros bloqueiam, outros entortam ou quebram. Escolher o certo faz parte do projeto.",
        },
        {
          term: "Restrição",
          definition: "Um limite do seu projeto, como quais materiais você pode usar, que tamanho ele pode ter ou quanto tempo você tem.",
        },
        {
          term: "Compromisso",
          definition: "Quando melhorar uma coisa torna outra mais difícil, então você precisa escolher o que importa mais.",
        },
        {
          term: "Projetar para o usuário",
          definition: "Os bons projetos partem do que o usuário realmente precisa, e são testados por alguém que os use.",
        },
      ],
      designBrief: "Escolha um desafio: construa um filtro que deixe a água suja mais limpa, uma barreira que mantenha a água longe de uma casinha, ou o redesenho de um objeto do dia a dia que resolva o problema de um usuário específico.",
      problem: "Projete uma solução que ajude as pessoas ou proteja o meio ambiente. Primeiro decida quem você está ajudando e que problema está resolvendo para essa pessoa, e depois construa um modelo que dê conta do recado com os materiais que você tem.",
      realWorldConnection: {
        intro: "Boa parte da engenharia não é sobre aparelhos, e sim sobre manter as pessoas seguras, saudáveis e capazes de fazer o dia a dia. Esses projetos resolvem problemas reais de comunidades reais.",
        appearsIn: [
          "Sistemas de água potável",
          "Proteção contra enchentes",
          "Reciclagem",
          "Produtos mais seguros",
          "Embalagens reutilizáveis",
        ],
      },
      constraints: [
        "Diga quem é o seu usuário e qual problema você vai resolver para ele antes de construir.",
        "Use apenas os materiais fornecidos e anote quais custam dinheiro ou podem prejudicar o meio ambiente.",
        "Segurança: nos modelos de filtro de água, a água filtrada é só para observar e nunca deve ser provada nem bebida.",
      ],
      materials: [
        "Copos",
        "Filtros de café",
        "Bolinhas de algodão",
        "Pedrisco",
        "Areia",
        "Papelão",
        "Fita adesiva",
        "Canudos",
        "Papel",
        "Fichas de cartolina",
        "Um recipiente para testar a água",
      ],
      substitutions: [
        "Uma garrafa plástica cortada no lugar do copo para o filtro",
        "Uma assadeira ou papel-alumínio para segurar a água da barreira",
        "Argila ou massinha para moldar o muro da barreira",
      ],
      buildSteps: [
        "Escolha o seu desafio: um filtro de água, uma barreira contra enchentes ou o redesenho de um objeto do dia a dia.",
        "Diga quem é o seu usuário e qual problema você vai resolver para ele antes de construir qualquer coisa.",
        "Filtro: monte camadas de materiais (algodão, areia, pedrisco, um filtro de café) dentro de um copo para que a água passe por elas.",
        "Barreira: molde um muro ou um canal que mantenha a água longe de uma casinha de papel ou papelão.",
        "Redesenho: estude o objeto, ache a única coisa que incomoda o usuário e mude só aquela parte.",
      ],
      redesignPrompts: [
        "Filtro: se a água continua turva, acrescente outra camada ou um material mais fino, como um filtro de café por cima.",
        "Filtro: se escoa devagar demais, use camadas mais grossas ou um recipiente mais largo.",
        "Barreira: se a água vazou, vede as frestas ou deixe o muro mais alto onde ele falhou.",
        "Redesenho: observe onde o seu usuário travou e conserte exatamente aquele ponto.",
        "Repare no compromisso: melhorar de um jeito piorou de outro?",
      ],
      realWorldExamples: [
        "As estações de tratamento passam a água por camadas de areia e pedrisco para limpá-la.",
        "As cidades constroem diques e muros de sacos de areia para conter os rios cheios.",
        "Os engenheiros de produto redesenham embalagens para usar menos plástico e continuar protegendo o que está dentro.",
      ],
      testingChallenges: [
        {
          test: "Filtro de água: transparência",
          howTo: "Despeje a mesma água turva pelo filtro e compare com o recipiente original.",
          measure: "Mais limpa, um pouco mais limpa ou sem mudança",
        },
        {
          test: "Barreira contra enchentes: manter a casa seca",
          howTo: "Despeje uma quantidade fixa de água contra a barreira e confira a casa atrás dela.",
          measure: "Seca, um pouco molhada ou encharcada",
        },
        {
          test: "Redesenho de produto: teste com o usuário",
          howTo: "Peça a um colega que faça o papel de usuário e experimente o objeto redesenhado.",
          measure: "Resolveu o problema dele? O que ainda precisa melhorar?",
        },
      ],
      reflectionQuestions: [
        "Para quem você estava projetando?",
        "Que problema o seu projeto resolveu?",
        "Qual material funcionou melhor?",
        "Que compromisso você assumiu?",
        "O que você melhoraria para um usuário real?",
      ],
      extensionChallenges: [
        "Melhore o seu filtro para que ele também funcione mais rápido, não só mais limpo.",
        "Projete a sua barreira para que possa ser reutilizada em vez de descartada.",
        "Redesenhe o seu produto para usar um material a menos sem perder o que o faz funcionar.",
      ],
      teacherNotes: "Esta aula liga a engenharia à justiça e ao meio ambiente, então dê tempo para a conversa de \"para quem é isso\" antes de construir. Reforce com firmeza que a água filtrada nunca é para beber. Erro comum: pular para a solução antes de nomear o usuário e o problema; aqui segure os alunos um pouco mais na etapa de planejamento.",
      teacherGuide: {
        setup: [
          "Monte quantas das três estações você conseguir: filtro (copos, areia, pedrisco, algodão, água turva), barreira contra enchentes (bandeja, água, uma casinha de papel) e redesenho de produto (papelão, fita, um objeto do dia a dia).",
          "Prepare com antecedência a água \"suja\" turva mexendo um pouco de terra ou pimenta em uma jarra, nada perigoso.",
          "Deixe por perto uma bandeja, um balde ou uma pia para recolher a água e os respingos.",
        ],
        materialsPrep: [
          "Corte antes as garrafas plásticas para virarem carcaças de filtro, se for usar garrafas.",
          "Sirva de antemão copos iguais de água turva, para que toda equipe teste com a mesma água inicial.",
        ],
        safetyNotes: [
          "A água filtrada é só para olhar: os alunos NÃO devem provar nem beber nenhuma água desta aula. Diga em voz alta e deixe escrito na estação.",
          "Limpe os respingos na hora para evitar escorregões, e mantenha toda a água longe de aparelhos eletrônicos.",
        ],
        learningObjectives: [
          "Explicar que os engenheiros projetam para um usuário específico e um problema real.",
          "Nomear uma restrição e um compromisso do próprio projeto.",
          "Escolher um material pelo modo como ele se comporta: se absorve, bloqueia ou filtra a água.",
        ],
        commonFailures: [
          "Começar a construir antes de nomear o usuário e o problema.",
          "Camadas do filtro soltas demais, então a água turva passa direto.",
          "Uma barreira com frestas nas bordas por onde a água escapa.",
        ],
        questionsToAsk: [
          "\"Para quem é isso, e que problema você está resolvendo para essa pessoa?\"",
          "\"Que compromisso você assumiu? O que piorou quando algo melhorou?\"",
          "\"Qual material funcionou melhor, e por que você acha que foi assim?\"",
          "\"Com o que um usuário real ainda teria dificuldade?\"",
        ],
        easierVersion: "Atribua um caminho só, normalmente o filtro de água, para a turma inteira, e já entregue o usuário e o problema definidos.",
        harderVersion: "Acrescente uma segunda meta, como um filtro que também seja rápido ou uma barreira reutilizável, o que força um compromisso claro.",
        cleanup: [
          "Despeje a água usada em uma pia ou balde, não no lixo; torça e descarte os materiais encharcados.",
          "Seque e guarde os copos, as bandejas e o papelão que ainda servirem.",
        ],
      },
    },
    {
      title: "Desafio final de engenharia",
      projectName: "Desafio de projeto: missão de resgate",
      summary: "No projeto final, os alunos combinam tudo do curso (estruturas, forças, movimento e testes) para projetar um sistema que leve um pacote de mantimentos por uma área perigosa e o entregue sem danos.",
      estimatedTime: "60-75 minutos",
      conceptsReviewed: [
        "Processo de projeto de engenharia",
        "Estruturas",
        "Forças",
        "Materiais",
        "Movimento",
        "Testes",
        "Falhas",
        "Redesenho",
        "Restrições",
        "Compromissos",
      ],
      concepts: [
        {
          term: "Sistema",
          definition: "Várias partes trabalhando juntas rumo a um mesmo objetivo, como uma estrutura mais uma peça que se move.",
        },
        {
          term: "Combinar ideias",
          definition: "Usar mais de uma ideia de engenharia ao mesmo tempo: resistência, movimento e equilíbrio em um único projeto.",
        },
        {
          term: "Restrições e compromissos",
          definition: "Cumprir todas as regras de um desafio enquanto escolhe o que vai fazer melhor.",
        },
        {
          term: "Iteração",
          definition: "Testar e melhorar o seu projeto de novo e de novo até que ele alcance o objetivo.",
        },
      ],
      designBrief: "Projete e construa um sistema que leve um pacote de mantimentos por uma zona de perigo (um vão, um \"rio\" ou uma queda) e o entregue sem danos do outro lado. Use as habilidades de estrutura, movimento, materiais e testes do curso inteiro.",
      problem: "Um pacote de mantimentos precisa atravessar uma área perigosa, escapar de danos e chegar em segurança. Sua tarefa é projetar um sistema que mova ou proteja o pacote na travessia do perigo usando apenas os materiais que você recebeu. Este é o seu desafio final: ele reúne tudo do curso inteiro.",
      realWorldConnection: {
        intro: "As missões reais de resgate e de entrega enfrentam exatamente este problema: levar algo valioso por um lugar perigoso sem danificá-lo. Os engenheiros combinam estruturas, movimento e proteção para dar conta.",
        appearsIn: [
          "Equipes de busca e salvamento",
          "Drones de carga",
          "Entregas de ajuda humanitária",
          "Teleféricos",
          "Sistemas de entrega",
        ],
      },
      solutionPaths: [
        "Uma ponte que leve o pacote por cima do vão",
        "Uma tirolesa com um carrinho que deslize o pacote até o outro lado",
        "Um sistema de paraquedas que o desça com suavidade",
        "Um guindaste ou uma garra que o levante e o coloque no lugar",
        "Uma embalagem protetora que sobreviva à viagem",
        "Um veículo ou trenó pequeno que o transporte até o outro lado",
      ],
      constraints: [
        "O pacote precisa atravessar a zona de perigo sem ser levado na mão.",
        "Ele precisa chegar sem danos: atravessar não basta.",
        "Use apenas os materiais fornecidos.",
        "Você tem três tentativas de teste, e pode melhorar o projeto entre uma e outra.",
      ],
      materials: [
        "Papel",
        "Papelão",
        "Copos",
        "Barbante",
        "Fita adesiva",
        "Canudos",
        "Palitos de picolé",
        "Elásticos",
        "Fichas de cartolina",
        "Clipes",
        "Um objeto pequeno para servir de pacote",
      ],
      substitutions: [
        "Um brinquedo, uma borracha ou uma caixinha como pacote",
        "Lã no lugar do barbante",
        "Tubos de papel enrolado no lugar dos canudos",
      ],
      buildSteps: [
        "Escolha um caminho de solução e desenhe antes de construir.",
        "Construa uma primeira versão simples, um protótipo, que você realmente consiga testar, e não um modelo final perfeito.",
        "Monte a sua zona de perigo e decida como vai fazer o mesmo teste todas as vezes.",
        "Deixe o pacote fácil de carregar e, se o seu projeto se mover, fácil de soltar no fim.",
        "Deixe margem para mudar coisas: você vai testar, achar o que falha e melhorar.",
      ],
      redesignPrompts: [
        "Se o pacote caiu ou se danificou, acrescente proteção ou freie o percurso no final.",
        "Se uma estrutura cedeu ou quebrou, acrescente um travamento em triângulo ou um apoio onde ela falhou.",
        "Se uma peça móvel travou ou escorregou, ajuste a tensão, o pivô ou a inclinação.",
        "Mude uma coisa só, repita o mesmo teste e veja se ajudou.",
        "Fique de olho nos compromissos: um projeto mais pesado e mais forte pode se mover mais devagar.",
      ],
      realWorldExamples: [
        "As equipes de busca e salvamento usam roldanas e tirolesas para atravessar pessoas por cânions e rios.",
        "Os guindastes de carga e os teleféricos combinam uma estrutura forte com uma linha que se move.",
        "Os engenheiros de emergência projetam pontes e elevadores que sobem rápido e ainda assim aguentam carga.",
      ],
      testingChallenges: [
        {
          test: "Teste de travessia",
          howTo: "Faça a missão do início ao fim atravessando a zona de perigo.",
          measure: "O pacote chegou ao outro lado? (sim / não)",
        },
        {
          test: "Teste de chegada segura",
          howTo: "Confira o pacote ao fim de cada tentativa.",
          measure: "Chegou sem danos e em pé, ou caiu / se danificou?",
        },
        {
          test: "Teste de confiabilidade",
          howTo: "Faça a missão três vezes sem reconstruir do zero.",
          measure: "Quantas das três tentativas dão certo",
        },
      ],
      reflectionQuestions: [
        "Que ideias das aulas anteriores você combinou, e como elas funcionaram juntas?",
        "O que falhou na sua primeira tentativa, e como você usou isso para melhorar o projeto?",
        "Que restrição ou compromisso mais marcou o seu projeto?",
        "Se você tivesse mais uma semana, o que redesenharia primeiro?",
      ],
      presentationPrompts: [
        "Que problema você resolveu?",
        "O que você construiu?",
        "O que falhou no começo?",
        "O que você melhorou?",
        "Qual aula anterior ajudou mais?",
        "O que você mudaria com mais tempo?",
      ],
      extensionChallenges: [
        "Entregue dois pacotes em uma única tentativa sem acrescentar muito peso.",
        "Faça a travessia funcionar sobre uma zona de perigo mais longa ou mais difícil.",
        "Acrescente um jeito de descer o pacote com suavidade no fim, em vez de deixá-lo cair.",
      ],
      teacherNotes: "Trate esta aula como uma mostra do curso inteiro, e não como uma ideia nova. Cobre dos alunos um rascunho de planejamento de verdade, que diga quais habilidades anteriores eles estão usando. Reserve tempo para pelo menos duas rodadas de testar e melhorar: a iteração é o ponto central. Uma pequena exposição em que cada equipe demonstre o seu resgate é um ótimo fechamento.",
      teacherGuide: {
        setup: [
          "Monte uma única \"zona de perigo\" compartilhada: um vão marcado com fita no chão ou entre duas mesas, de cerca de 40-60 cm de largura.",
          "Deixe a mesa de materiais toda à vista e peça que as equipes escolham um caminho de solução antes de começar a construir.",
          "Planeje três tentativas de teste cronometradas, com tempo de redesenho entre elas.",
        ],
        materialsPrep: [
          "Dê a cada equipe o mesmo tipo de objeto como \"pacote\" (uma caixinha, uma borracha ou um brinquedo), para que os resultados sejam comparáveis.",
          "Mantenha barbante, fita e clipes bem abastecidos: as tirolesas e os guindastes são os que mais gastam.",
        ],
        safetyNotes: [
          "As tirolesas precisam de uma ancoragem: use barbante preso com fita ou uma cadeira, nunca nada na altura da cabeça que possa voltar de repente.",
          "Mantenha os pés fora da zona de perigo e faça o teste de uma equipe por vez.",
        ],
        learningObjectives: [
          "Combinar estruturas, movimento, materiais e testes em um único sistema que funcione.",
          "Usar o processo de projeto completo, incluindo pelo menos um redesenho depois de uma tentativa fracassada.",
          "Explicar as restrições e os compromissos que moldaram o projeto.",
        ],
        commonFailures: [
          "Construir grande demais para terminar e testar a tempo: puxe para uma primeira versão simples e testável.",
          "O pacote chega, mas danificado, porque a proteção ficou para o fim.",
          "Uma peça móvel (tirolesa ou guindaste) sem controle de tensão, então o pacote trava ou cai.",
        ],
        questionsToAsk: [
          "\"Que aula anterior esta construção usa mais?\"",
          "\"O que falhou na sua primeira tentativa, e que única coisa você vai mudar?\"",
          "\"Onde é mais provável que o pacote se danifique?\"",
          "\"Que compromisso você assumiu: velocidade, resistência ou peso?\"",
        ],
        easierVersion: "Estreite a zona de perigo e oriente as equipes para os caminhos da embalagem protetora ou da ponte, que precisam de menos peças móveis.",
        harderVersion: "Exija dois pacotes, uma zona de perigo mais longa ou uma chegada suave, sem deixar o pacote cair no fim.",
        cleanup: [
          "Tire a fita da zona de perigo e recupere o barbante, os clipes e os objetos que serviram de pacote.",
          "Guarde as melhores construções para uma exposição e recicle as demais.",
        ],
      },
    },
  ],
}

const overlays: LocaleOverlays<EngineeringCurriculum> = { es, zh, pt }

/** The Engineering Fundamentals curriculum in the requested language. */
export const getEngineeringFundamentalsCurriculum = createLocalizedResolver(
  engineeringFundamentalsCurriculum,
  overlays,
)

/** Whether this course has been translated into `language` at all. */
export function engineeringCurriculumHasTranslation(language: Language): boolean {
  return hasLocaleOverlay(overlays, language)
}

/**
 * The lesson with this slug, in the requested language.
 *
 * Lesson pages receive a slug from the route (slugs are language-independent)
 * and look the lesson up in the localized curriculum, so every string on the
 * page comes from one consistent language.
 */
export function findEngineeringLesson(
  language: Language,
  slug: string,
): EngineeringLesson | undefined {
  return getEngineeringFundamentalsCurriculum(language).lessons.find(
    (lesson) => lesson.slug === slug,
  )
}

import type {
  ScienceCurriculum,
  ScienceLesson,
} from "@/features/curriculums/science-experiments"
import { scienceExperimentsCurriculum } from "@/features/curriculums/science-experiments"
import {
  createLocalizedResolver,
  hasLocaleOverlay,
  type DeepPartial,
  type LocaleOverlays,
} from "@/lib/localize-content"
import type { Language } from "@/i18n/translations"

/**
 * Translations for the Science Experiments course.
 *
 * Sparse overlays merged onto the English `scienceExperimentsCurriculum` by
 * `lib/localize-content`. Only prose lives here: slugs, week numbers, hrefs,
 * answer keys, and diagram/accent identifiers stay shared with English so the
 * course cannot structurally drift between locales.
 *
 * Untranslated strings fall through to English automatically, so this file can
 * grow one week at a time.
 */
const es: DeepPartial<ScienceCurriculum> = {
  title: "Experimentos de Ciencia",
  subtitle:
    "Seis semanas de experimentos prácticos donde los estudiantes aprenden a pensar como científicos e ingenieros: hacen preguntas, prueban ideas y explican lo que descubren.",
  description:
    "Un curso práctico de ciencia de 6 semanas para 2.º a 4.º grado. Cada semana gira en torno a un experimento seguro y barato y una gran idea, de las reacciones químicas a las fuerzas y los seres vivos, todo construido alrededor del mismo ciclo de preguntar, probar, explicar y mejorar que usan los científicos de verdad.",
  gradeRange: "2.º a 4.º grado",
  duration: "6 semanas",
  estimatedTimePerLesson: "45-60 minutos",
  requirement: "Materiales caseros comunes, sin laboratorio ni computadora",
  summary:
    "Los estudiantes aprenden ciencia como trabajan los científicos de verdad: empiezan con una pregunta, hacen una predicción, realizan una prueba justa, observan con cuidado, explican lo que pasó con evidencia y luego mejoran su prueba o su diseño. Cada semana es un experimento hecho con materiales baratos y cotidianos (papel, bicarbonato, hielo, un carrito de juguete, semillas) unido a una gran idea científica. El curso avanza desde cómo piensan los científicos e ingenieros, pasando por la química, la materia, las fuerzas y las máquinas, y termina con los seres vivos y los ecosistemas.",
  goals: [
    "Ayudar a los estudiantes a ver la ciencia como algo que hacen, no solo que leen.",
    "Crear el hábito de probar ideas en lugar de adivinar.",
    "Enseñar ideas científicas reales y precisas con palabras que un niño de segundo a cuarto grado entienda.",
    "Mostrar cómo los científicos y los ingenieros usan el mismo ciclo para descubrir cosas y mejorarlas.",
  ],
  learningOutcomes: [
    "Hacer una pregunta científica y una predicción antes de probar.",
    "Realizar una prueba justa cambiando solo una cosa a la vez.",
    "Observar con cuidado y anotar los resultados con palabras, números o dibujos.",
    "Usar evidencia para explicar por qué pasó algo.",
    "Mejorar una prueba o un diseño después de ver los resultados.",
    "Explicar una reacción química, los estados de la materia, las fuerzas y la fricción, las máquinas simples y qué necesitan los seres vivos.",
  ],
  materials: [
    "Papel, fichas y unos cuantos clips",
    "Tijeras, una regla o cinta métrica y lápices",
    "Bicarbonato de sodio, vinagre blanco y un globo",
    "Una botella de plástico vacía y un embudo pequeño (o papel enrollado)",
    "Cubos de hielo y unos vasos o recipientes pequeños",
    "Materiales para probar como aislante: papel aluminio, algodón o un calcetín, toalla de papel, espuma",
    "Un carrito de juguete o algo que ruede, más una tabla o cartón rígido para hacer una rampa",
    "Distintas superficies para probar: una toalla, papel de lija y un piso liso",
    "Palitos de manualidades o popotes, cinta y pesos pequeños como monedas o arandelas",
    "Frijoles secos o semillas de crecimiento rápido, vasos transparentes y toallas de papel",
    "Un cuaderno o la hoja de trabajo imprimible para anotar predicciones y resultados",
  ],
  materialsNote:
    "No necesitas todo a la vez: cada semana usa solo un puñado de materiales, y casi todas las semanas incluyen sustituciones para lo que no tengas a la mano.",
  safetyNotes: [
    "Un adulto debe estar cerca en cada experimento.",
    "Nunca pruebes ni comas los materiales del experimento, ni siquiera alimentos como el bicarbonato o las semillas.",
    "Mantén los líquidos lejos de la cara y los ojos, y limpia los derrames de inmediato para que nadie se resbale.",
    "Lávate las manos después de cada experimento.",
    "Carga y pasa las tijeras con el mango por delante, y mantenlas sobre la mesa.",
    "Usa gafas de protección si tienes un par, sobre todo para la reacción con vinagre.",
    "Usa solo materiales caseros seguros y de uso diario.",
  ],
  investigationLoop: [
    { stage: "Pregunta", description: "Empieza con una pregunta real sobre qué va a pasar." },
    { stage: "Predice", description: "Haz una buena suposición y escríbela antes de probar." },
    { stage: "Prueba", description: "Realiza una prueba justa, cambiando solo una cosa a la vez." },
    { stage: "Observa", description: "Mira con atención y anota lo que realmente pasa." },
    { stage: "Explica", description: "Usa tu evidencia para decir por qué pasó." },
    { stage: "Mejora", description: "Cambia algo y vuelve a probar para aprender más." },
  ],
  format: [
    "Una gran pregunta y un experimento cada semana, en un orden que va construyendo las ideas.",
    "Cada lección sigue el mismo ciclo: pregunta, predice, prueba, observa, explica, mejora.",
    "Los estudiantes anotan predicciones y resultados, y luego los comparan.",
    "Todos los experimentos usan materiales baratos y comunes, y no necesitan laboratorio ni computadora.",
    "Las semanas se conectan: la forma de pensar de la semana 1 se usa en todas las que siguen.",
  ],
  completion: {
    title: "Piensas como científico y como ingeniero",
    summary:
      "En seis semanas hiciste ciencia de verdad. Hiciste caer un helicóptero lentamente, llenaste un globo con un gas que tú mismo generaste, mantuviste el hielo congelado por más tiempo, hiciste correr un carrito por una rampa, construiste una máquina o una torre y cultivaste un ser vivo. Cada vez usaste el mismo ciclo: hiciste una pregunta, una predicción, una prueba justa, observaste de cerca, explicaste tus resultados con evidencia y mejoraste tu trabajo. Ese ciclo es el que los científicos y los ingenieros usan a diario, y ahora tú puedes usarlo con cualquier pregunta que tengas.",
    reflectionPrompts: [
      "¿Qué experimento te sorprendió más, y por qué?",
      "¿Qué predicción resultó equivocada? ¿Qué te enseñó equivocarte?",
      "¿Dónde has visto en tu vida diaria una de estas ideas científicas?",
      "Si pudieras repetir un experimento para probar algo nuevo, ¿qué cambiarías?",
    ],
    finalPrompts: [
      "Mi experimento favorito fue...",
      "La sorpresa más grande fue...",
      "Algo que aprendí sobre la ciencia fue...",
      "Un diseño que mejoré fue...",
      "Un experimento que quiero probar después es...",
      "Puedo pensar como científico si...",
      "Puedo pensar como ingeniero si...",
    ],
    nextSteps: [
      "Elige tu semana favorita y diseña una prueba justa completamente nueva para ella.",
      "Enséñale un experimento a alguien de tu familia y explícale por qué pasa.",
      "Empieza un cuaderno de ciencia y anota las preguntas que quieras probar después.",
      "Prueba uno de los proyectos relacionados, como construir un volcán de bicarbonato.",
    ],
  },
  lessons: [
    {
      title: "Piensa como científico e ingeniero",
      bigQuestion:
        "¿Cómo descubren los científicos y los ingenieros qué es verdad y cómo mejoran sus ideas?",
      mainConcepts: [
        "Los científicos hacen preguntas, hacen predicciones, prueban sus ideas, observan los resultados y usan evidencia para explicar lo que descubren.",
        "Los ingenieros resuelven problemas creando algo, probándolo y mejorando el diseño.",
        "Una prueba justa cambia solo una cosa a la vez, para que sepas qué hizo la diferencia.",
      ],
      explanation:
        "Un científico es cualquiera que hace una pregunta cuidadosa sobre el mundo y luego encuentra la forma de probar la respuesta en lugar de solo adivinar. Un ingeniero toma lo que los científicos aprenden y lo usa para construir y mejorar cosas que resuelven problemas. Los dos usan el mismo truco: cambian una cosa, la prueban, observan qué pasa y lo intentan otra vez. Esta semana vas a soltar un helicóptero de papel (una tira doblada que gira mientras cae) y a descubrir cómo hacer que caiga lo más lento posible. Para eso no puedes solo adivinar. Tienes que hacer una prueba justa: deja todo igual menos la única cosa que quieres estudiar, para saber exactamente qué cambió el resultado.",
      vocabulary: [
        { term: "Predicción", definition: "Una suposición inteligente sobre lo que va a pasar, hecha antes de probar." },
        { term: "Observación", definition: "Algo que notas al mirar con atención, usando tus sentidos." },
        { term: "Variable", definition: "La única cosa que cambias en una prueba, como el largo de las aspas." },
        { term: "Prueba justa", definition: "Una prueba en la que cambias solo una cosa y dejas todo lo demás igual." },
        { term: "Evidencia", definition: "Lo que observas y anotas y que ayuda a demostrar que tu explicación es cierta." },
        { term: "Rediseño", definition: "Cambiar tu diseño después de una prueba para que funcione mejor." },
      ],
      materials: [
        "2 hojas de papel",
        "Tijeras",
        "Una regla",
        "Unos cuantos clips",
        "Un cronómetro o el del teléfono",
        "Un lugar seguro para soltarlo, como junto a una silla (con un adulto)",
      ],
      safetyNotes: [
        "Pide ayuda a un adulto para cualquier caída desde alto: no te subas a muebles inestables.",
        "Mantén despejada la zona de caída para que nadie pase por debajo.",
        "Carga las tijeras con la punta hacia abajo y corta sobre la mesa.",
      ],
      activityTitle: "Prueba de caída del helicóptero de papel",
      steps: [
        "Pregunta: ¿Cuál helicóptero de papel caerá más lento? Esa es la pregunta que vas a probar.",
        "Corta una tira de papel de unos 3 cm de ancho y 20 cm de largo. Haz un corte hasta la mitad y dobla las dos aletas de arriba en direcciones opuestas para formar las aspas. Ponle un clip abajo.",
        "Predice: ¿Crees que las aspas largas o las cortas harán que caiga más lento? Escribe tu predicción antes de probar.",
        "Prueba con justicia: suelta el helicóptero desde la misma altura cada vez y cambia solo UNA cosa: el largo de las aspas. No lo empujes, solo suéltalo.",
        "Observa: mide cuántos segundos tarda en llegar al piso y fíjate cómo gira. Hazlo varias veces para estar seguro.",
        "Anota tus resultados junto a tu predicción.",
        "Mejora: haz un segundo helicóptero con un largo de aspas distinto y pruébalo igual. ¿Cuál cae más lento ahora?",
      ],
      discussionQuestions: [
        "¿Tu predicción fue correcta? ¿Cómo lo sabes?",
        "¿Qué única cosa cambiaste, y qué dejaste igual?",
        "¿Por qué sería injusto cambiar el largo de las aspas Y la altura al mismo tiempo?",
        "¿Qué hizo que el helicóptero cayera más lento?",
      ],
      reflectionPrompt:
        "Dibuja tu mejor helicóptero de papel y escribe una frase sobre qué hizo que cayera más lento.",
      miniChallenge:
        "Usando solo una hoja de papel, diseña el helicóptero que se quede más tiempo en el aire. Tómale el tiempo para demostrarlo.",
      extension:
        "Agrega un segundo y un tercer clip, uno a la vez, y prueba cómo cambia la caída el peso extra. Deja todo lo demás igual.",
      whyItHappens:
        "Mientras el helicóptero cae, la gravedad lo jala hacia abajo, pero el aire empuja hacia arriba contra las aspas inclinadas y las hace girar. Un helicóptero que gira empuja contra mucho aire, y esa resistencia del aire lo frena, así que planea en vez de caer de golpe. Las aspas más largas atrapan más aire y giran más, así que normalmente caen más lento. Agregar peso hace que el jalón de la gravedad gane un poco más, así que cae más rápido.",
      engineeringConnection:
        "Los ingenieros que diseñan helicópteros de verdad, paracaídas e incluso quienes estudian las semillas giratorias que caen de los arces usan la misma idea: la forma y la resistencia del aire pueden controlar qué tan rápido cae algo. Y al igual que tú, los ingenieros cambian una cosa a la vez y vuelven a probar: a eso se le llama rediseño.",
      estimatedTime: "45-60 minutos",
      completionChecklist: [
        "Hice una pregunta y escribí una predicción antes de probar.",
        "Hice una prueba justa cambiando solo una cosa.",
        "Anoté cuánto tardó en caer mi helicóptero.",
        "Expliqué por qué mi helicóptero cayó lento o rápido.",
        "Lo rediseñé y volví a probar.",
      ],
    },
    {
      title: "Reacciones químicas",
      bigQuestion: "¿Qué pasa cuando dos cosas se mezclan y forman algo completamente nuevo?",
      mainConcepts: [
        "Algunas mezclas no se quedan simplemente juntas: reaccionan y forman algo nuevo.",
        "El bicarbonato y el vinagre reaccionan y producen un gas llamado dióxido de carbono.",
        "Las burbujas y el gas pueden ser evidencia de que ocurrió una reacción química.",
      ],
      explanation:
        "Cuando mezclas arena y agua, sigues teniendo arena y agua: podrías secarla y recuperarlas. Eso es solo una mezcla. Pero algunas cosas hacen algo distinto al encontrarse: reaccionan y forman una sustancia completamente nueva que antes no estaba. El bicarbonato y el vinagre hacen exactamente eso. Cuando se tocan, reaccionan y producen dióxido de carbono, un gas que no puedes ver. Esta semana vas a atrapar ese gas dentro de un globo. La efervescencia y el globo inflándose son tu evidencia de que ocurrió una reacción química de verdad, y no solo una mezcla.",
      vocabulary: [
        { term: "Reacción química", definition: "Cuando unas sustancias se combinan y se convierten en algo nuevo." },
        { term: "Gas", definition: "Una forma de la materia, como el aire, que se expande hasta llenar su espacio." },
        { term: "Dióxido de carbono", definition: "El gas que se forma cuando el bicarbonato y el vinagre reaccionan. También está en el aire." },
        { term: "Evidencia", definition: "Lo que ves o mides y que demuestra que algo realmente pasó." },
        { term: "Materia", definition: "Todo lo que ocupa espacio, incluidos los sólidos, los líquidos y los gases." },
      ],
      materials: [
        "1 cucharada de bicarbonato de sodio",
        "Aproximadamente media taza de vinagre blanco",
        "Un globo",
        "Una botella de agua de plástico vacía",
        "Un embudo pequeño, o un papel enrollado en forma de embudo",
        "Una cuchara medidora",
      ],
      safetyNotes: [
        "El vinagre puede arder en los ojos: mantenlo lejos de la cara y no lo salpiques.",
        "Nunca tomes el vinagre ni comas el bicarbonato.",
        "Un adulto debe ayudar a estirar el globo sobre la botella.",
        "Hazlo sobre un fregadero o una bandeja, y limpia los derrames para que nadie se resbale.",
      ],
      activityTitle: "Reacción de gas en un globo",
      steps: [
        "Pregunta: ¿Pueden dos cosas que mezclas producir suficiente gas para inflar un globo? Esa es tu pregunta.",
        "Vierte aproximadamente media taza de vinagre en la botella vacía.",
        "Usa el embudo para poner 1 cucharada de bicarbonato dentro del globo.",
        "Predice: ¿De qué tamaño crees que se pondrá el globo? Dibuja o escribe primero tu predicción.",
        "Estira la boca del globo sobre la parte de arriba de la botella, pero mantén el bicarbonato arriba en el globo para que todavía no caiga.",
        "Prueba: levanta el globo derecho para que el bicarbonato caiga dentro del vinagre.",
        "Observa: mira cómo la mezcla hace efervescencia y el globo se llena. Fíjate qué tan grande queda comparado con tu predicción.",
        "Mejora: prueba otra vez con un poco más o un poco menos de bicarbonato y mira cómo cambia el tamaño del globo.",
      ],
      discussionQuestions: [
        "¿Qué viste, escuchaste o sentiste que te dice que hubo una reacción?",
        "¿De dónde salió el gas que llenó el globo?",
        "¿La efervescencia era algo nuevo, o era solo el bicarbonato y el vinagre mezclándose?",
        "¿Qué crees que pasaría con el doble de bicarbonato?",
      ],
      reflectionPrompt:
        "Escribe o dibuja lo que le pasó al globo, y explica en una frase de dónde salió el gas.",
      miniChallenge:
        "Descubre las cantidades de bicarbonato y vinagre que inflan el globo lo más grande posible sin reventarlo.",
      extension:
        "Prueba si el vinagre tibio hace que la reacción vaya más rápido que el vinagre frío. Deja las cantidades iguales para que sea una prueba justa.",
      whyItHappens:
        "El bicarbonato y el vinagre están hechos de piezas diminutas. Cuando se encuentran, esas piezas se reacomodan y forman sustancias nuevas, y una de ellas es dióxido de carbono en forma de gas. Un gas ocupa mucho más espacio que el líquido, así que sube y llena el globo. Las burbujas de efervescencia que ves son ese gas escapando del líquido. Como se forma una sustancia completamente nueva, esto es una reacción química y no solo una mezcla.",
      engineeringConnection:
        "Los ingenieros y los panaderos usan a propósito reacciones que producen gas. El bicarbonato es lo que hace que el pan, los panqués y los hotcakes se esponjen: el dióxido de carbono forma burbujitas por dentro. Algunos extintores y ciertos artículos de fiesta también usan reacciones rápidas de gas. Controlar cuánto y qué tan rápido es un trabajo de ingeniería.",
      estimatedTime: "45-60 minutos",
      completionChecklist: [
        "Predije de qué tamaño se pondría el globo.",
        "Mezclé el bicarbonato y el vinagre de forma segura.",
        "Observé la efervescencia y cómo se llenaba el globo.",
        "Puedo explicar que el gas es dióxido de carbono producido por una reacción.",
        "Probé una cantidad nueva para ver qué cambiaba.",
      ],
      relatedProject: {
        title: "Volcán de Bicarbonato",
        note: "¿Quieres ver la misma reacción a mayor escala? Construye un volcán de bicarbonato: usa exactamente la misma reacción de dióxido de carbono que hiciste en el globo.",
      },
    },
    {
      title: "Estados de la materia y materiales",
      bigQuestion: "¿Por qué algunas cosas se mantienen frías más tiempo que otras?",
      mainConcepts: [
        "La materia puede ser sólida, líquida o gaseosa.",
        "Que el hielo se derrita es un cambio de estado: agua sólida que se convierte en agua líquida.",
        "Los materiales tienen propiedades, y algunos frenan el calor mejor que otros.",
      ],
      explanation:
        "Todo lo que te rodea es materia, y la materia normalmente viene en tres formas: sólida, líquida y gaseosa. El agua es especial porque puedes verla en las tres: el hielo es sólido, el agua es líquida y el vapor es gas. Cuando el hielo se derrite no está desapareciendo; está cambiando de sólido a líquido. Ese cambio ocurre porque el calor pasa al hielo desde el cuarto más cálido. Esta semana vas a intentar frenar eso. Los distintos materiales (papel aluminio, algodón, una toalla de papel) dejan pasar el calor a velocidades diferentes. A un material que frena el calor se le llama aislante, y tu trabajo es encontrar el mejor.",
      vocabulary: [
        { term: "Sólido", definition: "Materia que mantiene su propia forma, como un cubo de hielo." },
        { term: "Líquido", definition: "Materia que fluye y toma la forma de su recipiente, como el agua." },
        { term: "Gas", definition: "Materia que se expande hasta llenar su espacio, como el vapor o el aire." },
        { term: "Cambio de estado", definition: "Cuando la materia cambia de forma, como un sólido que se derrite y se vuelve líquido." },
        { term: "Aislamiento", definition: "Un material que frena el paso del calor de un lugar a otro." },
        { term: "Calor", definition: "Energía que pasa de las cosas más cálidas a las más frías." },
      ],
      materials: [
        "3 o más cubos de hielo del mismo tamaño",
        "Vasos o recipientes pequeños, uno por material",
        "Materiales para probar: papel aluminio, algodón o un calcetín, una toalla de papel, espuma o una bolsa de plástico",
        "Un plato o bandeja para recoger el agua derretida",
        "Un cronómetro",
      ],
      safetyNotes: [
        "El hielo está muy frío: no lo dejes pegado a tu piel mucho tiempo.",
        "El agua derretida deja el piso resbaloso, así que limpia las gotas de inmediato.",
        "Mantén los vasos sobre una bandeja para que el agua no se esparza por todos lados.",
      ],
      activityTitle: "Reto de aislamiento contra el derretimiento",
      steps: [
        "Pregunta: ¿Qué material mantendrá congelado un cubo de hielo por más tiempo?",
        "Envuelve cada cubo de hielo en un material distinto. Deja un cubo sin nada envuelto: ese es tu control para comparar.",
        "Predice: ordena los materiales del mejor al peor para mantener frío el hielo. Escribe tu orden.",
        "Prueba con justicia: usa cubos del mismo tamaño, ponlos todos en el mismo cuarto y empiézalos al mismo tiempo.",
        "Observa: revisa cada 10 minutos. Fíjate cuáles cubos se derriten más rápido y cuáles siguen sólidos.",
        "Anota qué material mantuvo su hielo congelado más tiempo, y cuánta agua derretida hizo cada uno.",
        "Mejora: toma tu mejor material y agrégale una segunda capa, o combina dos materiales, y prueba si el hielo dura todavía más.",
      ],
      discussionQuestions: [
        "¿Qué material fue el mejor aislante? ¿Cuál el peor?",
        "¿Por qué crees que importa el cubo de hielo sin envolver (el control)?",
        "¿De dónde viene el calor que derrite el hielo?",
        "¿Cuál de estos materiales tienes en tu ropa de invierno?",
      ],
      reflectionPrompt:
        "Escribe qué material mantuvo el hielo congelado más tiempo y una frase que explique por qué crees que funcionó mejor.",
      miniChallenge:
        "Diseña una mini hielera con los materiales que tengas y que mantenga un cubo de hielo congelado el mayor tiempo posible.",
      extension:
        "Prueba si un cubo de hielo se derrite más rápido en un lugar soleado o en uno con sombra. Deja los cubos del mismo tamaño.",
      whyItHappens:
        "El cuarto está más cálido que el hielo, y el calor siempre pasa de las cosas más cálidas a las más frías. Cuando el calor entra al hielo, le da al agua sólida suficiente energía para convertirse en agua líquida: eso es derretirse. Los buenos aislantes, como el algodón y la espuma, están llenos de aire atrapado, y el aire atrapado es muy lento para pasar el calor. Por eso el hielo de adentro se mantiene frío más tiempo. Los materiales delgados y muy compactos dejan pasar el calor más rápido, así que ese hielo se derrite antes.",
      engineeringConnection:
        "Los ingenieros usan aislamiento en todas partes: dentro de hieleras y termos para mantener las cosas frías o calientes, dentro de las paredes de las casas para ahorrar energía, y en los abrigos de invierno para conservar el calor del cuerpo. Elegir el material correcto para cada trabajo es exactamente lo que hiciste en este reto.",
      estimatedTime: "45-60 minutos",
      completionChecklist: [
        "Preparé cubos de hielo del mismo tamaño con distintos materiales y uno sin envolver como control.",
        "Predije qué material funcionaría mejor.",
        "Revisé y anoté el derretimiento a lo largo del tiempo.",
        "Puedo nombrar el cambio de estado de sólido a líquido y explicar el derretimiento.",
        "Mejoré mi mejor aislante y volví a probar.",
      ],
    },
    {
      title: "Fuerzas, movimiento y fricción",
      bigQuestion: "¿Qué hace que las cosas aceleren, frenen o se detengan?",
      mainConcepts: [
        "Una fuerza es un empujón o un jalón.",
        "La gravedad es una fuerza que jala los objetos hacia abajo, incluso por una rampa.",
        "La fricción es una fuerza que frena el movimiento cuando dos superficies se rozan.",
        "La textura de una superficie cambia qué tan lejos o qué tan rápido se mueve algo sobre ella.",
      ],
      explanation:
        "Nada se mueve ni se detiene solo: hace falta una fuerza, que no es más que un empujón o un jalón. La gravedad es un jalón que atrae todo hacia el suelo. Cuando pones un carrito de juguete en lo alto de una rampa, la gravedad lo jala hacia abajo y acelera. Pero cuando el carrito llega al piso, no rueda para siempre. Otra fuerza, la fricción, trabaja en contra del movimiento. La fricción ocurre cuando dos superficies se rozan, y frena las cosas. Esta semana vas a lanzar un carrito por una rampa hacia distintas superficies y ver cuánto cambia la superficie la distancia que recorre.",
      vocabulary: [
        { term: "Fuerza", definition: "Un empujón o un jalón que puede iniciar, detener o cambiar el movimiento." },
        { term: "Gravedad", definition: "La fuerza que jala los objetos hacia el suelo." },
        { term: "Fricción", definition: "Una fuerza que frena el movimiento cuando dos superficies se rozan." },
        { term: "Movimiento", definition: "Cuando algo se traslada de un lugar a otro." },
        { term: "Superficie", definition: "La capa exterior de algo, como la parte de arriba de un piso o de una toalla." },
      ],
      materials: [
        "Un carrito de juguete o cualquier cosa que ruede",
        "Una tabla o un cartón rígido para hacer una rampa",
        "Unos libros para apoyar la rampa",
        "Una cinta métrica o regla",
        "Superficies para probar: piso liso, una toalla, papel de lija y papel aluminio",
        "Cinta para mantener las superficies planas",
      ],
      safetyNotes: [
        "Mantén la rampa firme para que no se deslice ni se voltee.",
        "Despeja el camino para que el carrito no ruede hacia alguien.",
        "No hagas rodar objetos pesados hacia los pies ni desde mesas altas.",
      ],
      activityTitle: "Prueba de superficies con rampa",
      steps: [
        "Pregunta: ¿En qué superficie rodará más lejos el carrito después de salir de la rampa?",
        "Arma una rampa apoyando una tabla sobre unos libros. Marca una línea de salida arriba.",
        "Predice: ordena las superficies de 'el carrito rueda más lejos' a 'el carrito se detiene antes'. Escríbelo.",
        "Prueba con justicia: suelta el carrito desde la misma línea de salida cada vez sin empujarlo, y deja la rampa a la misma altura. Cambia solo la superficie de abajo.",
        "Observa: mide qué tan lejos viaja el carrito después del final de la rampa en cada superficie.",
        "Anota cada distancia junto a tu predicción.",
        "Mejora: intenta que el carrito llegue aún más lejos (sube la rampa o elige la superficie más lisa) y prueba qué ayuda de verdad.",
      ],
      discussionQuestions: [
        "¿Qué superficie dejó rodar más lejos al carrito? ¿Cuál lo detuvo más rápido?",
        "¿Por qué es importante soltar el carrito en lugar de empujarlo?",
        "¿Qué fuerza jaló al carrito rampa abajo? ¿Qué fuerza lo frenó abajo?",
        "¿Dónde sientes la fricción en la vida real?",
      ],
      reflectionPrompt:
        "Escribe qué superficie dejó viajar más lejos al carrito y explica por qué usando la palabra fricción.",
      miniChallenge:
        "Marca una línea objetivo en el piso y ajusta tu rampa para que el carrito se detenga lo más cerca posible de ella.",
      extension:
        "Sube más la rampa y mide cómo cambia la distancia con la altura extra. Deja el mismo carrito y la misma superficie.",
      whyItHappens:
        "La gravedad jala el carrito rampa abajo y le da movimiento y velocidad. Cuando el carrito llega al piso, la fricción entre sus ruedas y la superficie empuja en contra de ese movimiento y lo frena. Las superficies ásperas o blandas, como el papel de lija y la toalla, agarran más las ruedas, así que hay más fricción y el carrito se detiene antes. Las superficies lisas tienen menos fricción, así que el carrito sigue rodando más lejos. Una rampa más alta le da a la gravedad más ventaja, así que el carrito empieza más rápido.",
      engineeringConnection:
        "Los ingenieros usan la fricción a propósito cuando quieren que las cosas se detengan o agarren, como el hule de las suelas, los frenos de los autos y las llantas. También trabajan para reducir la fricción cuando quieren que las cosas se muevan con facilidad, como las ruedas, los toboganes y las cuchillas lisas de los patines de hielo. Saber cuándo quieres más o menos fricción es una decisión real de ingeniería.",
      estimatedTime: "45-60 minutos",
      completionChecklist: [
        "Armé una rampa y la dejé a la misma altura en cada prueba.",
        "Predije cómo cambiaría la distancia cada superficie.",
        "Medí qué tan lejos rodó el carrito en cada superficie.",
        "Puedo explicar el papel de la gravedad y de la fricción.",
        "Cambié algo y probé para que el carrito llegara más lejos o diera en un objetivo.",
      ],
    },
    {
      title: "Máquinas simples, estructuras y estabilidad",
      bigQuestion: "¿Cómo pueden las herramientas sencillas y las formas inteligentes ayudarnos con trabajos difíciles?",
      mainConcepts: [
        "Las máquinas simples facilitan el trabajo.",
        "Las rampas, las palancas, las ruedas y las poleas nos ayudan a mover o levantar cosas.",
        "Las estructuras son más fuertes cuando tienen una base estable y usan formas de apoyo como los triángulos.",
        "Los buenos diseños se prueban y luego se mejoran.",
      ],
      explanation:
        "Una máquina simple es una herramienta sencilla que facilita un trabajo difícil, como una rampa, una palanca, una rueda o una polea. Una palanca, por ejemplo, es una barra rígida que gira sobre un punto de apoyo, y permite que un empujón pequeño levante una carga pesada. Las estructuras, como las torres y los puentes, tienen otro trabajo: deben sostener peso sin caerse. Una base ancha evita que una estructura se voltee, y los triángulos son la forma secreta que evita que se doble. Esta semana eliges tu reto: construir una máquina simple que levante un peso, o construir una estructura que se mantenga alta y firme. En cualquier caso la vas a probar y luego a mejorar.",
      vocabulary: [
        { term: "Máquina simple", definition: "Una herramienta sencilla que facilita el trabajo, como una palanca o una rampa." },
        { term: "Palanca", definition: "Una barra rígida que gira sobre un punto de apoyo para levantar o mover una carga." },
        { term: "Polea", definition: "Una rueda con una cuerda encima que ayuda a levantar cosas." },
        { term: "Estructura", definition: "Algo construido para sostener peso o mantenerse en pie, como una torre o un puente." },
        { term: "Estable", definition: "Firme y difícil de voltear." },
        { term: "Refuerzo", definition: "Un apoyo, a menudo en forma de triángulo, que evita que una estructura se doble." },
      ],
      materials: [
        "Para una máquina: una regla y un lápiz para hacer una palanca, o un carrete y cuerda para una polea",
        "Pesos pequeños para levantar, como una pila de monedas o un juguete pequeño",
        "Para una estructura: fichas, popotes o palitos de manualidades",
        "Cinta",
        "Una regla",
        "Monedas o arandelas para probar cuánto peso aguanta",
      ],
      safetyNotes: [
        "Mantén los dedos fuera de debajo de las palancas y los pesos cuando caigan.",
        "Usa pesos de prueba pequeños y a poca altura para que nada pesado caiga sobre alguien.",
        "Corta y pasa las tijeras con cuidado, con la punta hacia abajo.",
      ],
      activityTitle: "Reto de mini máquina o torre (elige uno)",
      steps: [
        "Pregunta: ¿Cómo puede una máquina simple o una forma fuerte ayudarme a levantar o sostener más? Elige el camino de la máquina o el de la torre.",
        "Camino de la máquina: coloca una regla cruzada sobre un lápiz para hacer una palanca. Pon un peso pequeño en un extremo.",
        "Camino de la torre: construye la torre más alta que puedas con fichas o popotes y cinta, y que todavía sostenga un peso arriba.",
        "Predice: para la palanca, adivina dónde poner el lápiz para levantar el peso con más facilidad. Para la torre, adivina cuántas monedas aguantará. Escríbelo.",
        "Prueba: para la palanca, presiona el otro extremo y desliza el lápiz a distintos puntos. Para la torre, agrega monedas una por una hasta que se doble o se voltee.",
        "Observa: fíjate qué posición del lápiz hizo más fácil levantar, o cuántas monedas aguantó la torre antes de fallar.",
        "Mejora: acerca el lápiz al peso, o agrégale refuerzos triangulares y una base más ancha a la torre, y vuelve a probar.",
      ],
      discussionQuestions: [
        "¿Qué hizo más fácil levantar el peso, o qué hizo más fuerte la torre?",
        "¿Por qué crees que los triángulos aguantan mejor que los cuadrados?",
        "¿Dónde ayuda una base ancha a que algo se mantenga en pie?",
        "¿Qué máquinas simples has usado hoy sin darte cuenta?",
      ],
      reflectionPrompt:
        "Dibuja tu máquina o tu torre y señala la parte que hizo más trabajo para facilitar la tarea.",
      miniChallenge:
        "Camino de la máquina: levanta el peso más pesado que puedas con tu palanca. Camino de la torre: construye la torre que aguante más monedas.",
      extension:
        "Agrega una segunda máquina simple, como una polea para levantar tu carga, o combina una rampa y una palanca para mover algo.",
      whyItHappens:
        "Una palanca gira sobre su punto de apoyo, llamado fulcro. Cuando mueves el fulcro más cerca de la carga, un empujón pequeño en el extremo lejano puede levantar mucho peso: la máquina cambia un empujón más largo por uno más fácil. Las estructuras funcionan distinto: una base ancha reparte el peso y reduce la probabilidad de voltearse, y los triángulos mantienen su forma bajo peso mientras que los cuadrados se doblan. Por eso las torres reforzadas y de base ancha aguantan mucho más.",
      engineeringConnection:
        "Los ingenieros meten estas ideas en la vida real todos los días: los sube y baja y los destapadores son palancas, las grúas y las astas de bandera usan poleas, las rampas para silla de ruedas son planos inclinados, y los puentes y rascacielos se refuerzan con triángulos y bases anchas. Y como tú, los ingenieros siempre prueban un diseño y luego lo mejoran.",
      estimatedTime: "50-60 minutos",
      completionChecklist: [
        "Construí una máquina simple o una estructura.",
        "Hice una predicción antes de probarla.",
        "Probé cuánto podía levantar o sostener.",
        "Puedo explicar cómo una palanca, o una base ancha y triángulos, facilitaron el trabajo.",
        "Mejoré mi diseño y lo volví a probar.",
      ],
    },
    {
      title: "Ciencias de la vida y ecosistemas",
      bigQuestion: "¿Qué necesitan los seres vivos para crecer y sobrevivir?",
      mainConcepts: [
        "Los seres vivos necesitan agua, aire, luz, espacio y el ambiente adecuado para sobrevivir.",
        "Las plantas y los animales interactúan con las partes vivas y no vivas de su ecosistema.",
        "Los científicos observan los sistemas vivos a lo largo del tiempo para saber cómo cambian.",
        "Los ingenieros pueden diseñar herramientas que ayuden a los seres vivos a crecer o sobrevivir.",
      ],
      explanation:
        "Los seres vivos (las plantas, los animales e incluso tú) necesitan ciertas cosas para seguir vivos: agua, aire, luz, espacio y un lugar que les acomode. Todas las cosas vivas y no vivas de una zona, trabajando juntas, forman un ecosistema. Un jardín tiene plantas e insectos (vivos) y también tierra, agua y luz del sol (no vivos), y todos dependen unos de otros. A diferencia de un experimento de un solo día, los seres vivos cambian despacio, así que los científicos los observan durante días y semanas. Esta semana vas a cultivar una semilla y a cambiar una sola cosa de cómo vive, y luego observarás con el tiempo qué condiciones la ayudan a crecer mejor.",
      vocabulary: [
        { term: "Vivo", definition: "Algo que crece, necesita comida o agua y puede producir más de sí mismo, como una planta." },
        { term: "No vivo", definition: "Algo que no está vivo, como el agua, las rocas o la luz del sol." },
        { term: "Ecosistema", definition: "Todas las cosas vivas y no vivas de una zona, trabajando juntas." },
        { term: "Ambiente", definition: "El entorno en el que vive un ser vivo." },
        { term: "Germinar", definition: "Cuando una semilla empieza a crecer y brota como planta." },
        { term: "Sobrevivir", definition: "Mantenerse con vida al conseguir lo que se necesita." },
      ],
      materials: [
        "Unos cuantos frijoles secos o semillas de crecimiento rápido",
        "Vasos transparentes o bolsas de plástico con cierre",
        "Toallas de papel",
        "Agua",
        "Un alféizar soleado y un lugar oscuro como una alacena",
        "Un cuaderno para anotar lo que ves cada día",
      ],
      safetyNotes: [
        "No comas las semillas ni los frijoles, aunque sean alimentos.",
        "Lávate las manos después de tocar semillas, tierra o toallas de papel mojadas.",
        "Limpia el agua para que nadie se resbale.",
      ],
      activityTitle: "Laboratorio de crecimiento de semillas",
      steps: [
        "Pregunta: ¿Qué necesita una semilla para crecer mejor: agua, luz o las dos cosas?",
        "Dobla una toalla de papel húmeda dentro de cada vaso transparente y acomoda una semilla contra la pared para que puedas verla.",
        "Prepara semillas con distintas condiciones: una con agua y luz, una con agua en la oscuridad, y una con luz pero sin agua.",
        "Predice: ¿Cuál semilla crees que crecerá mejor? Escribe tu predicción.",
        "Prueba con justicia: deja las semillas iguales y cambia solo una condición a la vez.",
        "Observa con el tiempo: revisa cada día durante una semana aproximadamente. Dibuja y mide lo que ves, y anota la fecha.",
        "Explica y mejora: compara las semillas, explica qué condiciones ayudaron, luego diseña un mejor montaje y cultiva otra semilla para probarlo.",
      ],
      discussionQuestions: [
        "¿Qué semilla creció mejor, y cuál peor?",
        "¿Qué le pasó a la semilla sin agua? ¿Y a la que no tuvo luz?",
        "¿Por qué los científicos tienen que observar este experimento durante muchos días?",
        "¿Qué cosas vivas y no vivas necesitó tu semilla?",
      ],
      reflectionPrompt:
        "Dibuja cómo cambió tu mejor semilla durante la semana y escribe una frase sobre lo que necesitan los seres vivos.",
      miniChallenge:
        "Diseña el mejor montaje de cultivo que puedas y predice cuánto crecerá tu semilla en una semana.",
      extension:
        "Construye un mini ecosistema en un frasco transparente con tierra, una plantita y un poco de agua, y observa cómo cambia durante dos semanas.",
      whyItHappens:
        "Una semilla guarda una plantita diminuta y una pequeña reserva de alimento. Cuando recibe agua, aire y calor, germina: la plantita despierta, usa su alimento guardado y brota. Una vez que aparecen las hojas, la planta necesita luz para fabricar su propio alimento y seguir creciendo. Por eso la semilla sin agua no puede arrancar, y la semilla en la oscuridad brota pero después crece débil y pálida. Lo que ves es evidencia directa de lo que los seres vivos necesitan para sobrevivir.",
      engineeringConnection:
        "Los ingenieros diseñan herramientas que ayudan a los seres vivos a crecer y sobrevivir: invernaderos que atrapan calor y luz, sistemas de goteo que riegan las plantas poco a poco, macetas que se autorriegan, e incluso hábitats y refugios para animales. Entender lo que los seres vivos necesitan es el primer paso para diseñar algo que los ayude.",
      estimatedTime: "45-60 minutos (más revisiones diarias durante una semana)",
      completionChecklist: [
        "Preparé semillas con distintas condiciones y un solo cambio justo.",
        "Predije qué semilla crecería mejor.",
        "Observé y anoté las semillas durante varios días.",
        "Puedo explicar qué necesitan los seres vivos para sobrevivir.",
        "Diseñé un mejor montaje y lo probé.",
      ],
    },
  ],
}

const zh: DeepPartial<ScienceCurriculum> = {
  title: "科学实验",
  subtitle:
    "六周的动手实验，让学生学会像科学家和工程师那样思考：提出问题、检验想法，并解释自己的发现。",
  description:
    "面向 2 至 4 年级的 6 周动手科学课程。每周围绕一个安全、低成本的实验和一个核心概念展开，从化学反应到力，再到生物，全部建立在真正的科学家所用的「提问—检验—解释—改进」循环之上。",
  gradeRange: "2 至 4 年级",
  duration: "6 周",
  estimatedTimePerLesson: "45-60 分钟",
  requirement: "常见的家用材料，无需实验室或电脑",
  summary:
    "学生按照科学家真正的工作方式学习科学：从一个问题开始，做出预测，进行一次公平测试，仔细观察，用证据解释发生了什么，然后改进自己的测试或设计。每周都是一个用便宜的日常材料（纸、小苏打、冰、玩具小车、种子）完成的实验，并搭配一个核心科学概念。课程从科学家和工程师如何思考讲起，经过化学、物质、力和机械，最后落到生物与生态系统。",
  goals: [
    "帮助学生把科学看成自己动手做的事，而不只是读到的东西。",
    "养成检验想法的习惯，而不是靠猜。",
    "用二到四年级孩子听得懂的话，讲真实而准确的科学概念。",
    "展示科学家和工程师如何用同一个循环去弄清事情、把东西做得更好。",
  ],
  learningOutcomes: [
    "在动手之前提出一个科学问题并做出预测。",
    "每次只改变一件事，进行一次公平测试。",
    "仔细观察，并用文字、数字或图画记录结果。",
    "用证据解释某件事为什么会发生。",
    "看到结果之后改进测试或设计。",
    "解释化学反应、物质的状态、力与摩擦、简单机械，以及生物需要什么。",
  ],
  materials: [
    "纸、卡片和几个回形针",
    "剪刀、直尺或卷尺，以及铅笔",
    "小苏打、白醋和一个气球",
    "一个空的塑料瓶和一个小漏斗（或卷起来的纸）",
    "冰块和几个小杯子或容器",
    "用来测试保温效果的材料：锡箔、棉花或袜子、纸巾、泡沫",
    "一辆玩具车或任何会滚的东西，再加一块木板或硬纸板做斜坡",
    "用来测试的不同表面：毛巾、砂纸和光滑地板",
    "手工棒或吸管、胶带，以及硬币、垫圈之类的小重物",
    "干豆子或快速发芽的种子、透明杯子和纸巾",
    "一个笔记本或可打印的记录表，用来写下预测和结果",
  ],
  materialsNote:
    "你不需要一次备齐所有东西——每周只用到少数几样材料，而且大多数周都列出了手边没有时的替代方案。",
  safetyNotes: [
    "每个实验都要有大人在旁边。",
    "绝对不要尝或吃实验材料，即使是小苏打或种子这样的食物也不行。",
    "液体要远离脸和眼睛，洒出来要马上擦干，免得有人滑倒。",
    "每次实验后都要洗手。",
    "拿剪刀和递剪刀时手柄朝前，并把剪刀放在桌面上。",
    "如果有护目镜就戴上，尤其是做醋的反应时。",
    "只使用安全的日常家用材料。",
  ],
  investigationLoop: [
    { stage: "提问", description: "从一个关于将会发生什么的真实问题开始。" },
    { stage: "预测", description: "做一个合理的猜测，并在动手前写下来。" },
    { stage: "测试", description: "进行公平测试，每次只改变一件事。" },
    { stage: "观察", description: "仔细看，并记录真正发生了什么。" },
    { stage: "解释", description: "用你的证据说明它为什么会这样。" },
    { stage: "改进", description: "改动一处再测一次，学到更多。" },
  ],
  format: [
    "每周一个核心问题、一个实验，顺序层层递进。",
    "每一课都遵循同一个循环：提问、预测、测试、观察、解释、改进。",
    "学生先记录预测和结果，然后进行对比。",
    "所有实验都用便宜常见的材料，不需要实验室或电脑。",
    "各周互相衔接：第 1 周学到的思考方式，在之后每一周都要用。",
  ],
  completion: {
    title: "你会像科学家和工程师一样思考了",
    summary:
      "在六周里，你做的是真正的科学。你让一架纸直升机慢慢降落，用自己制造的气体吹起了气球，让冰块保持更久不化，让小车沿斜坡飞驰，搭出了一台机械或一座塔，还养活了一个生命。每一次，你都用了同一个循环：提出问题、做出预测、进行公平测试、仔细观察、用证据解释结果，并改进自己的作品。这个循环正是科学家和工程师每天都在用的，现在你也可以把它用在任何你想到的问题上。",
    reflectionPrompts: [
      "哪个实验最让你意外，为什么？",
      "哪一个预测最后是错的？「错了」这件事教会了你什么？",
      "你在日常生活的什么地方见过这些科学概念之一？",
      "如果可以重做一个实验来检验新的东西，你会改什么？",
    ],
    finalPrompts: [
      "我最喜欢的实验是……",
      "最大的意外是……",
      "我学到的一件关于科学的事是……",
      "我改进过的一个设计是……",
      "我接下来想试的一个实验是……",
      "我可以这样像科学家一样思考……",
      "我可以这样像工程师一样思考……",
    ],
    nextSteps: [
      "挑出你最喜欢的一周，为它设计一个全新的公平测试。",
      "把一个实验教给家里人，并解释它为什么会这样。",
      "开一本科学笔记，写下你接下来想检验的问题。",
      "试试相关项目，比如做一座小苏打火山。",
    ],
  },
  lessons: [
    {
      title: "像科学家和工程师一样思考",
      bigQuestion: "科学家和工程师怎样弄清什么是真的，又怎样把想法变得更好？",
      mainConcepts: [
        "科学家提出问题、做出预测、检验想法、观察结果，并用证据解释自己的发现。",
        "工程师通过做出一个东西、测试它、再改进设计来解决问题。",
        "公平测试每次只改变一件事，这样你才知道是什么造成了差别。",
      ],
      explanation:
        "科学家就是那种会对世界提出仔细的问题、然后想办法去检验答案而不是随便猜的人。工程师把科学家学到的东西拿来建造和改进能解决问题的事物。两者用的其实是同一招：改一处，测一次，看看发生什么，再来一遍。这一周你要放飞一架纸直升机——一条折好的纸条，会一边旋转一边下落——并想办法让它落得尽可能慢。要做到这一点，你不能只靠猜。你得做一次公平测试：除了你想研究的那一样，其他都保持不变，这样你才知道究竟是什么改变了结果。",
      vocabulary: [
        { term: "预测", definition: "在动手检验之前，对将要发生什么做出的合理猜测。" },
        { term: "观察", definition: "你用感官仔细看而注意到的东西。" },
        { term: "变量", definition: "测试中你唯一改变的那一样，比如叶片的长度。" },
        { term: "公平测试", definition: "只改变一样、其余全部保持不变的测试。" },
        { term: "证据", definition: "你观察并记录下来、能帮助证明你的解释成立的东西。" },
        { term: "再设计", definition: "测试之后修改你的设计，让它效果更好。" },
      ],
      materials: [
        "2 张纸",
        "剪刀",
        "一把直尺",
        "几个回形针",
        "一个计时器或手机秒表",
        "一个安全的投放位置，比如站在椅子旁边（要有大人陪同）",
      ],
      safetyNotes: [
        "从高处投放时请大人帮忙——不要爬到不稳的家具上。",
        "保持投放区域畅通，别让人从下面走过。",
        "拿剪刀时刀尖朝下，并在桌上裁剪。",
      ],
      activityTitle: "纸直升机降落测试",
      steps: [
        "提问：哪一架纸直升机落得最慢？这就是你要检验的问题。",
        "剪一条约 3 厘米宽、20 厘米长的纸条。从中间剪开一半，把上面两片朝相反方向折开做成叶片。在底部夹上一个回形针。",
        "预测：你觉得叶片长一点还是短一点会落得更慢？在测试前写下你的预测。",
        "公平测试：每次都从同一高度放开直升机，并且只改变一样——叶片长度。不要推它，松手就好。",
        "观察：记录它落到地面用了几秒，并留意它如何旋转。多做几次以确认结果。",
        "把你的结果记在预测旁边。",
        "改进：做第二架叶片长度不同的直升机，用同样的方法测试。现在哪一架落得更慢？",
      ],
      discussionQuestions: [
        "你的预测对吗？你怎么知道的？",
        "你改变了哪一样，又保持了哪些不变？",
        "为什么同时改变叶片长度和高度就不公平了？",
        "是什么让直升机落得更慢？",
      ],
      reflectionPrompt: "把你最好的那架纸直升机画下来，并写一句话说明是什么让它落得最慢。",
      miniChallenge: "只用一张纸，设计出能在空中停留最久的直升机。用计时来证明。",
      extension: "一次加一个，加上第二个和第三个回形针，测试额外的重量如何改变下落。其他一切保持不变。",
      whyItHappens:
        "直升机下落时，重力把它往下拉，但空气向上顶住倾斜的叶片，让它们旋转起来。旋转的直升机会推开大量空气，这种空气阻力让它慢下来——于是它是飘着落，而不是直直砸下去。叶片更长能兜住更多空气、转得更多，所以通常落得更慢。加上重量后，重力这一边赢得更多一点，于是落得更快。",
      engineeringConnection:
        "设计真直升机、降落伞，甚至研究枫树上那些旋转下落的「直升机」种子的工程师，用的都是同一个道理：形状和空气阻力可以控制物体下落的快慢。而且和你一样，工程师每次只改一样再重新测试——这就叫再设计。",
      estimatedTime: "45-60 分钟",
      completionChecklist: [
        "我在测试前提出了问题并写下了预测。",
        "我只改变一样，做了一次公平测试。",
        "我记录了直升机下落所用的时间。",
        "我解释了自己的直升机为什么落得慢或快。",
        "我重新设计并再测了一次。",
      ],
    },
    {
      title: "化学反应",
      bigQuestion: "当两样东西混在一起、生成全新的物质时，到底发生了什么？",
      mainConcepts: [
        "有些混合物不会只是待在一起——它们会反应并生成新的东西。",
        "小苏打和醋反应会生成一种叫二氧化碳的气体。",
        "气泡和气体可以作为发生了化学反应的证据。",
      ],
      explanation:
        "把沙子和水混在一起，你得到的还是沙子和水——晒干就能分回来。那只是混合物。但有些东西相遇时会做点别的：它们会反应，生成一种原本不存在的全新物质。小苏打和醋正是如此。它们一接触就反应，生成你看不见的气体二氧化碳。这一周你要把这种气体收进气球里。冒泡和气球鼓起来，就是真的发生了化学反应、而不只是混合的证据。",
      vocabulary: [
        { term: "化学反应", definition: "几种物质结合并变成新东西的过程。" },
        { term: "气体", definition: "像空气那样、会扩散并充满整个空间的一种物质形态。" },
        { term: "二氧化碳", definition: "小苏打和醋反应时生成的气体。空气里也有它。" },
        { term: "证据", definition: "你看到或量到的、能说明某件事确实发生了的东西。" },
        { term: "物质", definition: "任何占据空间的东西，包括固体、液体和气体。" },
      ],
      materials: [
        "1 汤匙小苏打",
        "大约半杯白醋",
        "一个气球",
        "一个空的塑料水瓶",
        "一个小漏斗，或一张卷成漏斗的纸",
        "一把量勺",
      ],
      safetyNotes: [
        "醋会刺激眼睛——让它远离脸，也不要溅出来。",
        "绝对不要喝醋或吃小苏打。",
        "请大人帮忙把气球套到瓶口上。",
        "在水槽或托盘上方进行，洒了要擦干，免得有人滑倒。",
      ],
      activityTitle: "气球产气反应",
      steps: [
        "提问：两样混在一起的东西，能产生足够的气体把气球吹起来吗？这就是你的问题。",
        "往空瓶里倒入大约半杯醋。",
        "用漏斗把 1 汤匙小苏打装进气球里。",
        "预测：你觉得气球会鼓到多大？先画下来或写下你的预测。",
        "把气球口套到瓶口上，但让小苏打先留在气球里，暂时不要掉下去。",
        "测试：把气球竖直提起来，让小苏打落进醋里。",
        "观察：看着混合物冒泡、气球被充起来。留意它比你的预测大还是小。",
        "改进：再试一次，多放一点或少放一点小苏打，看看气球的大小如何变化。",
      ],
      discussionQuestions: [
        "你看到、听到或感觉到什么，说明发生了反应？",
        "把气球充满的气体是从哪里来的？",
        "冒泡是新出现的东西，还是只是小苏打和醋混在一起？",
        "如果小苏打的量翻一倍，你觉得会怎样？",
      ],
      reflectionPrompt: "写下或画出气球发生了什么，并用一句话解释气体是从哪里来的。",
      miniChallenge: "找出能把气球吹到最大又不撑破的小苏打和醋的用量。",
      extension: "测试温热的醋是否比冷醋反应更快。用量保持不变，这样才是公平测试。",
      whyItHappens:
        "小苏打和醋都是由极小的微粒组成的。它们相遇时，这些微粒重新组合，形成新的物质——其中之一就是二氧化碳气体。气体占的空间比原来的液体大得多，于是它上升并把气球撑起来。你看到的气泡就是气体从液体里逃出来。因为生成了全新的物质，所以这是化学反应，而不只是混合。",
      engineeringConnection:
        "工程师和面包师会特意利用产气反应。小苏打正是让面包、松饼和薄煎饼膨松的东西——二氧化碳在里面形成了细小的气泡。有些灭火器和派对拉炮也用到快速产气反应。控制产多少、产多快，就是工程师的工作。",
      estimatedTime: "45-60 分钟",
      completionChecklist: [
        "我预测了气球会鼓到多大。",
        "我安全地把小苏打和醋混在了一起。",
        "我观察了冒泡和气球被充起来的过程。",
        "我能解释这种气体是反应生成的二氧化碳。",
        "我换了一个用量，看看有什么变化。",
      ],
      relatedProject: {
        title: "小苏打火山",
        note: "想看同样的反应放大版吗？做一座小苏打火山吧——它用的正是你在气球里做出的那个二氧化碳反应。",
      },
    },
    {
      title: "物质的状态与材料",
      bigQuestion: "为什么有些东西能比别的东西保持低温更久？",
      mainConcepts: [
        "物质可以是固体、液体或气体。",
        "冰融化是状态变化——固态的水变成液态的水。",
        "材料各有性质，有些材料比别的更能减缓热的传递。",
      ],
      explanation:
        "你身边的一切都是物质，而物质通常有三种形态：固体、液体和气体。水很特别，因为这三种你都能看到——冰是固体，水是液体，水蒸气是气体。冰融化并不是消失了，而是从固体变成了液体。这个变化之所以发生，是因为热量从较暖的房间传进了冰里。这一周你要设法把它拖慢。不同的材料——锡箔、棉花、纸巾——让热量通过的速度并不一样。能减缓热传递的材料叫作绝热材料，找出最好的那一种就是你的任务。",
      vocabulary: [
        { term: "固体", definition: "能保持自己形状的物质，比如一块冰。" },
        { term: "液体", definition: "会流动、并且随容器改变形状的物质，比如水。" },
        { term: "气体", definition: "会扩散并充满空间的物质，比如水蒸气或空气。" },
        { term: "状态变化", definition: "物质改变形态，比如固体融化成液体。" },
        { term: "绝热", definition: "减缓热量从一个地方传到另一个地方的材料。" },
        { term: "热", definition: "从较暖的物体传向较冷物体的能量。" },
      ],
      materials: [
        "3 块或更多同样大小的冰块",
        "小杯子或容器，每种材料一个",
        "用来测试的材料：锡箔、棉花或袜子、纸巾、泡沫或塑料袋",
        "一个盘子或托盘，用来接融化的水",
        "一个计时器",
      ],
      safetyNotes: [
        "冰非常冷——不要长时间贴在皮肤上。",
        "融化的水会让地面变滑，滴出来要立刻擦干。",
        "把杯子放在托盘上，别让水到处流。",
      ],
      activityTitle: "冰块融化绝热挑战",
      steps: [
        "提问：哪种材料能让冰块保持冻结最久？",
        "用不同的材料分别包住每块冰。留一块什么都不包——那是你的对照组，用来做比较。",
        "预测：把这些材料从保冷最好到最差排个序。把你的排序写下来。",
        "公平测试：使用同样大小的冰块，全部放在同一个房间，并同时开始。",
        "观察：每 10 分钟检查一次。注意哪些冰块化得最快，哪些还是固体。",
        "记录哪种材料让冰保持冻结最久，以及每一种化出了多少水。",
        "改进：拿你最好的材料，再加一层，或把两种材料组合起来，测试冰是否能撑得更久。",
      ],
      discussionQuestions: [
        "哪种材料绝热效果最好？哪种最差？",
        "你觉得那块没有包裹的冰（对照组）为什么重要？",
        "融化冰块的热量是从哪里来的？",
        "这些材料里，你的冬装中有哪一种？",
      ],
      reflectionPrompt: "写下哪种材料让冰保持冻结最久，并用一句话解释你认为它为什么效果最好。",
      miniChallenge: "用手边的材料设计一个迷你「保温箱」，让冰块保持冻结最久。",
      extension: "测试冰块在阳光下还是阴凉处融化得更快。冰块大小要保持一致。",
      whyItHappens:
        "房间比冰暖，而热量总是从较暖的东西流向较冷的东西。热量进入冰里，给固态的水足够的能量变成液态的水——这就是融化。棉花和泡沫这类好的绝热材料里充满了被困住的空气，而被困住的空气传热非常慢。所以里面的冰能更久保持低温。又薄又密实的材料让热量更快通过，那块冰也就化得更早。",
      engineeringConnection:
        "工程师到处都在用绝热：保温箱和保温杯里用它来保冷或保热，房屋墙体里用它来省能源，冬季外套里用它来留住体温。为具体任务挑选合适的材料，正是你在这个挑战里做的事。",
      estimatedTime: "45-60 分钟",
      completionChecklist: [
        "我用不同材料准备了同样大小的冰块，还留了一块不包的作对照。",
        "我预测了哪种材料效果最好。",
        "我在一段时间里检查并记录了融化情况。",
        "我能说出固体到液体的状态变化，并解释融化。",
        "我改进了最好的绝热方案，并再测了一次。",
      ],
    },
    {
      title: "力、运动与摩擦",
      bigQuestion: "是什么让东西加速、减速或停下来？",
      mainConcepts: [
        "力就是推或拉。",
        "重力是把物体往下拉的力，也包括沿斜坡往下。",
        "摩擦是两个表面互相摩擦时减慢运动的力。",
        "表面的粗糙程度会改变东西在上面移动的远近或快慢。",
      ],
      explanation:
        "没有东西会自己动起来或自己停下——那需要力，而力不过就是推或拉。重力是把一切都拽向地面的拉力。当你把玩具车放在斜坡顶端时，重力把它往下拉，它就加速了。但当车子到了地面，它不会永远滚下去。另一种力，摩擦力，在跟运动作对。两个表面互相摩擦时就产生摩擦力，它会让东西慢下来。这一周你要让小车沿斜坡冲到不同的表面上，看看表面能让它跑的距离差多少。",
      vocabulary: [
        { term: "力", definition: "能让运动开始、停止或改变的推或拉。" },
        { term: "重力", definition: "把物体拉向地面的力。" },
        { term: "摩擦力", definition: "两个表面互相摩擦时减慢运动的力。" },
        { term: "运动", definition: "某样东西从一个地方移动到另一个地方。" },
        { term: "表面", definition: "某样东西的最外层，比如地板或毛巾的上面。" },
      ],
      materials: [
        "一辆玩具车或任何会滚的东西",
        "一块木板或硬纸板做斜坡",
        "几本书用来把斜坡垫高",
        "一把卷尺或直尺",
        "用来测试的表面：光地板、毛巾、砂纸和锡箔",
        "胶带，用来把表面固定平整",
      ],
      safetyNotes: [
        "把斜坡固定稳，别让它滑动或翻倒。",
        "清空前方通道，别让车子撞到人。",
        "不要把重物朝着脚滚，也不要从高桌上往下滚。",
      ],
      activityTitle: "斜坡赛车表面测试",
      steps: [
        "提问：小车离开斜坡后，在哪种表面上滚得最远？",
        "用书把木板垫起来做成斜坡。在顶端画一条起跑线。",
        "预测：把这些表面按「车滚得最远」到「车最快停下」排序。写下来。",
        "公平测试：每次都从同一条起跑线放手，不要推它，斜坡高度也保持不变。只改变底下的表面。",
        "观察：测量小车在每种表面上，离开斜坡末端后走了多远。",
        "把每个距离记在你的预测旁边。",
        "改进：想办法让小车跑得更远——把斜坡垫高，或选最光滑的表面——并测试到底哪一招最有用。",
      ],
      discussionQuestions: [
        "哪种表面让小车滚得最远？哪种让它停得最快？",
        "为什么一定要放手，而不能推车？",
        "是什么力把小车拉下斜坡？又是什么力在底下让它慢下来？",
        "你在现实生活的哪些地方感受到摩擦力？",
      ],
      reflectionPrompt: "写下哪种表面让小车走得最远，并用「摩擦力」这个词解释原因。",
      miniChallenge: "在地上定一条目标线，调整你的斜坡，让小车尽量停在离它最近的地方。",
      extension: "把斜坡垫得更高，测量额外的高度如何改变距离。小车和表面保持不变。",
      whyItHappens:
        "重力把小车拉下斜坡，给了它运动和速度。当小车到达地面时，车轮和表面之间的摩擦力顶住这个运动，把它慢下来。砂纸和毛巾这类粗糙或柔软的表面更「抓」轮子，摩擦力更大，所以小车更早停下。光滑表面摩擦力更小，小车就能滚得更远。斜坡越高，重力的助跑越长，小车起步也就更快。",
      engineeringConnection:
        "当工程师希望东西停住或抓牢时，会特意利用摩擦力——比如鞋底的橡胶、汽车刹车和轮胎。当他们希望东西轻松移动时，又会想办法减少摩擦——比如车轮、滑梯，还有冰刀光滑的刀刃。知道什么时候要更多、什么时候要更少摩擦，是真正的工程决策。",
      estimatedTime: "45-60 分钟",
      completionChecklist: [
        "我搭了一个斜坡，并在每次测试中保持同样的高度。",
        "我预测了每种表面会如何改变距离。",
        "我测量了小车在每种表面上滚了多远。",
        "我能解释重力和摩擦力各自的作用。",
        "我改动了一处，测试让小车跑得更远或击中目标。",
      ],
    },
    {
      title: "简单机械、结构与稳定性",
      bigQuestion: "简单的工具和聪明的形状，怎样帮我们完成难做的活？",
      mainConcepts: [
        "简单机械让工作变得更省力。",
        "斜面、杠杆、轮子和滑轮帮我们移动或抬起东西。",
        "结构有稳固的底座、并用上三角形这类支撑形状时会更结实。",
        "好的设计都会先测试、再改进。",
      ],
      explanation:
        "简单机械就是让难活变轻松的简单工具，比如斜面、杠杆、轮子或滑轮。以杠杆为例，它是一根架在支点上的硬棒，能让很小的一按抬起很重的东西。塔和桥这样的结构任务不同：它们必须承住重量而不倒。宽底座让结构不容易翻倒，而三角形正是让它不弯折的秘密形状。这一周由你来选挑战：做一台能抬起重物的简单机械，或者搭一座又高又稳的结构。无论选哪个，你都要先测试，再把它做得更好。",
      vocabulary: [
        { term: "简单机械", definition: "让工作更省力的简单工具，比如杠杆或斜面。" },
        { term: "杠杆", definition: "架在支点上转动、用来抬起或移动重物的硬棒。" },
        { term: "滑轮", definition: "上面绕着绳子、能帮忙提起东西的轮子。" },
        { term: "结构", definition: "为了承重或立住而搭起来的东西，比如塔或桥。" },
        { term: "稳定", definition: "站得稳、不容易翻倒。" },
        { term: "斜撑", definition: "一种支撑，通常是三角形，用来防止结构弯折。" },
      ],
      materials: [
        "做机械：一把直尺和一支铅笔做杠杆，或一个线轴和一根绳子做滑轮",
        "用来抬起的小重物，比如一摞硬币或一个小玩具",
        "做结构：卡片、吸管或手工棒",
        "胶带",
        "一把直尺",
        "硬币或垫圈，用来测试能承住多少重量",
      ],
      safetyNotes: [
        "重物落下时，手指不要放在杠杆和重物下面。",
        "测试用的重物要小、位置要低，别让重东西砸到人。",
        "剪东西和递剪刀都要注意安全，刀尖朝下。",
      ],
      activityTitle: "迷你机械或高塔挑战（二选一）",
      steps: [
        "提问：简单机械或结实的形状，怎样帮我抬得更重、撑得更多？选机械路线或高塔路线。",
        "机械路线：把直尺横架在一支铅笔上做成杠杆。在一端放上一个小重物。",
        "高塔路线：用卡片或吸管加胶带，搭出你能搭的最高的塔，并且顶上还能放住一个重物。",
        "预测：对杠杆，猜猜铅笔放在哪里最省力。对高塔，猜猜它能承住几枚硬币。写下来。",
        "测试：对杠杆，按下另一端，并把铅笔滑到不同位置。对高塔，一次加一枚硬币，直到它弯折或倾倒。",
        "观察：留意铅笔放在哪个位置最省力，或高塔在失败前承住了几枚硬币。",
        "改进：把铅笔往重物那边挪，或给高塔加上三角斜撑和更宽的底座，然后再测一次。",
      ],
      discussionQuestions: [
        "是什么让抬起重物变得更省力，或者让高塔变得更结实？",
        "你觉得三角形为什么比正方形更能撑住？",
        "宽底座在什么地方能帮东西站稳？",
        "今天你不知不觉用过哪些简单机械？",
      ],
      reflectionPrompt: "把你的机械或高塔画下来，并标出出力最多、让活变轻松的那个部分。",
      miniChallenge: "机械路线：用你的杠杆抬起你能抬起的最重的东西。高塔路线：搭出能承住最多硬币的塔。",
      extension: "再加一台简单机械——比如用滑轮提起你的负载——或者把斜面和杠杆组合起来搬东西。",
      whyItHappens:
        "杠杆绕着它的支点转动。当你把支点挪得离重物更近时，在远端轻轻一按就能抬起很重的东西——这台机械是用「按得更远」换来了「按得更省力」。结构的原理不同：宽底座把重量摊开，降低翻倒的可能，而三角形受力时能保持形状，正方形却会折叠变形。这正是有斜撑、底座宽的塔能承住多得多的原因。",
      engineeringConnection:
        "工程师每天都把这些道理用进现实：跷跷板和开瓶器是杠杆，起重机和旗杆用滑轮，轮椅坡道是斜面，桥梁和摩天大楼靠三角形和宽底座来加固。而且和你一样，工程师总是先测试一个设计，再去改进它。",
      estimatedTime: "50-60 分钟",
      completionChecklist: [
        "我做了一台简单机械或一个结构。",
        "我在测试之前做了预测。",
        "我测试了它能抬起或承住多少。",
        "我能解释杠杆，或者宽底座加三角形，是怎样让活变轻松的。",
        "我改进了设计，并再测了一次。",
      ],
    },
    {
      title: "生命科学与生态系统",
      bigQuestion: "生物要生长和存活，需要什么？",
      mainConcepts: [
        "生物需要水、空气、光、空间和合适的环境才能存活。",
        "植物和动物与生态系统中有生命和无生命的部分互相作用。",
        "科学家会长期观察生命系统，以了解它们如何变化。",
        "工程师可以设计出帮助生物生长或存活的工具。",
      ],
      explanation:
        "生物——植物、动物，甚至你自己——要活下去就需要一些东西：水、空气、光、空间，还有适合它的地方。一个区域里所有有生命和无生命的东西共同运作，就构成一个生态系统。花园里有植物和虫子（有生命），也有土壤、水和阳光（无生命），它们彼此依赖。和一天就能做完的实验不同，生物变化得很慢，所以科学家要连着好几天甚至好几周去观察。这一周你要种一颗种子，并改变它生活条件中的一样，然后长期观察哪种条件最有利于它生长。",
      vocabulary: [
        { term: "有生命的", definition: "会生长、需要食物或水、并且能繁殖的东西，比如植物。" },
        { term: "无生命的", definition: "没有生命的东西，比如水、石头或阳光。" },
        { term: "生态系统", definition: "一个区域里所有有生命和无生命的东西，共同运作。" },
        { term: "环境", definition: "生物所生活的周围条件。" },
        { term: "发芽", definition: "种子开始生长、冒出成为植物的过程。" },
        { term: "存活", definition: "通过获得所需要的东西而活下去。" },
      ],
      materials: [
        "几颗干豆子或快速发芽的种子",
        "透明杯子或可封口的塑料袋",
        "纸巾",
        "水",
        "一处阳光充足的窗台，以及一个像橱柜那样的暗处",
        "一个笔记本，用来记录每天看到的变化",
      ],
      safetyNotes: [
        "不要吃这些种子或豆子，即使它们本来是食物。",
        "接触种子、土壤或湿纸巾之后要洗手。",
        "把水擦干，免得有人滑倒。",
      ],
      activityTitle: "种子生长实验",
      steps: [
        "提问：种子要长得最好，需要什么——水、光，还是两者都要？",
        "把一张湿纸巾折好放进每个透明杯子里，再把一颗种子贴着杯壁塞好，这样你能看见它。",
        "布置不同条件的种子：一颗有水有光，一颗有水但放在暗处，一颗有光但没有水。",
        "预测：你觉得哪颗种子会长得最好？写下你的预测。",
        "公平测试：让种子本身保持一致，每次只改变一个条件。",
        "长期观察：大约一周里每天检查一次。画下来、量一量你看到的变化，并写上日期。",
        "解释并改进：比较这些种子，说明哪些条件有帮助，然后设计一个更好的方案，再种一颗种子来验证。",
      ],
      discussionQuestions: [
        "哪颗种子长得最好，哪颗最差？",
        "没有水的那颗种子怎么样了？没有光的呢？",
        "科学家为什么必须连着很多天观察这个实验？",
        "你的种子需要哪些有生命和无生命的东西？",
      ],
      reflectionPrompt: "画出你那颗长得最好的种子这一周的变化，并写一句话说明生物需要什么。",
      miniChallenge: "设计你能想到的最好的种植方案，并预测你的种子一周能长多高。",
      extension: "在一个透明罐子里用土壤、一株小植物和一点水做一个迷你生态系统，观察它两周内的变化。",
      whyItHappens:
        "一颗种子里装着一株小小的幼苗和一点储备的养分。当它得到水、空气和温暖时，它就会发芽——幼苗醒过来，用掉储备的养分，冒出芽来。长出叶子之后，植物需要光来自己制造养分、继续生长。这就是为什么没有水的种子根本无法起步，而放在暗处的种子虽然发了芽，之后却长得又弱又白。你看到的，正是生物存活所需条件的直接证据。",
      engineeringConnection:
        "工程师设计各种帮助生物生长和存活的工具：留住温度和光照的温室、慢慢给植物浇水的滴灌系统、自动补水的花盆，甚至给动物用的栖息地和庇护所。搞清楚生物需要什么，是设计出能帮到它们的东西的第一步。",
      estimatedTime: "45-60 分钟（外加一周每天的观察）",
      completionChecklist: [
        "我布置了不同条件的种子，并且只做了一处公平的改变。",
        "我预测了哪颗种子会长得最好。",
        "我连着好几天观察并记录了这些种子。",
        "我能解释生物存活需要什么。",
        "我设计了一个更好的方案并做了测试。",
      ],
    },
  ],
}

const pt: DeepPartial<ScienceCurriculum> = {
  title: "Experimentos de Ciências",
  subtitle:
    "Seis semanas de experimentos práticos em que os estudantes aprendem a pensar como cientistas e engenheiros: fazem perguntas, testam ideias e explicam o que descobrem.",
  description:
    "Um curso prático de ciências de 6 semanas para o 2º ao 4º ano. Cada semana gira em torno de um experimento seguro e barato e de uma grande ideia, das reações químicas às forças e aos seres vivos, tudo construído em cima do mesmo ciclo de perguntar, testar, explicar e melhorar que os cientistas de verdade usam.",
  gradeRange: "2º ao 4º ano",
  duration: "6 semanas",
  estimatedTimePerLesson: "45 a 60 minutos",
  requirement: "Materiais comuns de casa, sem laboratório nem computador",
  summary:
    "Os estudantes aprendem ciência do jeito que os cientistas trabalham de verdade: começam com uma pergunta, fazem uma previsão, montam um teste justo, observam com cuidado, explicam o que aconteceu com evidências e depois melhoram o teste ou o projeto. Cada semana é um experimento feito com materiais baratos do dia a dia (papel, bicarbonato, gelo, um carrinho de brinquedo, sementes) ligado a uma grande ideia científica. O curso avança de como cientistas e engenheiros pensam, passando por química, matéria, forças e máquinas, e termina com os seres vivos e os ecossistemas.",
  goals: [
    "Ajudar os estudantes a ver a ciência como algo que eles fazem, não só leem.",
    "Criar o hábito de testar ideias em vez de chutar.",
    "Ensinar ideias científicas reais e precisas com palavras que uma criança do 2º ao 4º ano entenda.",
    "Mostrar como cientistas e engenheiros usam o mesmo ciclo para descobrir coisas e melhorá-las.",
  ],
  learningOutcomes: [
    "Fazer uma pergunta científica e uma previsão antes de testar.",
    "Montar um teste justo mudando só uma coisa por vez.",
    "Observar com cuidado e registrar os resultados com palavras, números ou desenhos.",
    "Usar evidências para explicar por que algo aconteceu.",
    "Melhorar um teste ou um projeto depois de ver os resultados.",
    "Explicar uma reação química, os estados da matéria, as forças e o atrito, as máquinas simples e o que os seres vivos precisam.",
  ],
  materials: [
    "Papel, fichas de cartolina e alguns clipes",
    "Tesoura, uma régua ou fita métrica e lápis",
    "Bicarbonato de sódio, vinagre branco e um balão",
    "Uma garrafa PET vazia e um funil pequeno (ou papel enrolado)",
    "Cubos de gelo e alguns copos ou potinhos",
    "Materiais para testar como isolante: papel-alumínio, algodão ou uma meia, papel-toalha, isopor",
    "Um carrinho de brinquedo ou algo que role, mais uma tábua ou papelão firme para fazer uma rampa",
    "Superfícies diferentes para testar: uma toalha, lixa e um piso liso",
    "Palitos de artesanato ou canudos, fita e pesos pequenos como moedas ou arruelas",
    "Feijões secos ou sementes de crescimento rápido, copos transparentes e papel-toalha",
    "Um caderno ou a folha para imprimir, para anotar previsões e resultados",
  ],
  materialsNote:
    "Você não precisa de tudo de uma vez: cada semana usa só um punhado de materiais, e a maioria das semanas traz substituições para o que você não tiver em casa.",
  safetyNotes: [
    "Um adulto precisa estar por perto em todo experimento.",
    "Nunca prove nem coma os materiais do experimento, nem mesmo alimentos como bicarbonato ou sementes.",
    "Mantenha os líquidos longe do rosto e dos olhos, e limpe o que derramar na hora, para ninguém escorregar.",
    "Lave as mãos depois de cada experimento.",
    "Carregue e entregue a tesoura com o cabo para a frente, e deixe-a sobre a mesa.",
    "Use óculos de proteção se tiver um par, principalmente na reação com vinagre.",
    "Use apenas materiais caseiros seguros e do dia a dia.",
  ],
  investigationLoop: [
    { stage: "Pergunte", description: "Comece com uma pergunta real sobre o que vai acontecer." },
    { stage: "Preveja", description: "Faça um bom palpite e escreva antes de testar." },
    { stage: "Teste", description: "Monte um teste justo, mudando só uma coisa por vez." },
    { stage: "Observe", description: "Olhe com atenção e anote o que realmente acontece." },
    { stage: "Explique", description: "Use suas evidências para dizer por que aquilo aconteceu." },
    { stage: "Melhore", description: "Mude alguma coisa e teste de novo para aprender mais." },
  ],
  format: [
    "Uma grande pergunta e um experimento por semana, em uma ordem que vai construindo as ideias.",
    "Toda aula segue o mesmo ciclo: pergunte, preveja, teste, observe, explique, melhore.",
    "Os estudantes anotam previsões e resultados e depois comparam os dois.",
    "Todos os experimentos usam materiais baratos e comuns e não precisam de laboratório nem computador.",
    "As semanas se conectam: o jeito de pensar da semana 1 é usado em todas as seguintes.",
  ],
  completion: {
    title: "Você pensa como cientista e como engenheiro",
    summary:
      "Em seis semanas você fez ciência de verdade. Fez um helicóptero cair devagar, encheu um balão com um gás que você mesmo produziu, manteve o gelo congelado por mais tempo, fez um carrinho descer uma rampa, construiu uma máquina ou uma torre e cultivou um ser vivo. Toda vez você usou o mesmo ciclo: fez uma pergunta, uma previsão, um teste justo, observou de perto, explicou os resultados com evidências e melhorou o seu trabalho. Esse ciclo é o que cientistas e engenheiros usam todos os dias, e agora você pode usá-lo com qualquer pergunta que tiver.",
    reflectionPrompts: [
      "Qual experimento mais te surpreendeu, e por quê?",
      "Qual previsão acabou dando errado? O que errar te ensinou?",
      "Onde, no seu dia a dia, você já viu uma dessas ideias científicas?",
      "Se pudesse refazer um experimento para testar algo novo, o que você mudaria?",
    ],
    finalPrompts: [
      "Meu experimento favorito foi...",
      "A maior surpresa foi...",
      "Uma coisa que aprendi sobre ciência foi...",
      "Um projeto que eu melhorei foi...",
      "Um experimento que quero tentar depois é...",
      "Eu consigo pensar como cientista quando...",
      "Eu consigo pensar como engenheiro quando...",
    ],
    nextSteps: [
      "Escolha a sua semana favorita e crie um teste justo totalmente novo para ela.",
      "Ensine um experimento para alguém da família e explique por que ele acontece.",
      "Comece um caderno de ciências e anote as perguntas que você quer testar em seguida.",
      "Faça um dos projetos relacionados, como construir um vulcão de bicarbonato.",
    ],
  },
  lessons: [
    {
      title: "Pense como cientista e engenheiro",
      bigQuestion:
        "Como cientistas e engenheiros descobrem o que é verdade e deixam as próprias ideias melhores?",
      mainConcepts: [
        "Os cientistas fazem perguntas, fazem previsões, testam as ideias, observam os resultados e usam evidências para explicar o que descobrem.",
        "Os engenheiros resolvem problemas criando algo, testando e melhorando o projeto.",
        "Um teste justo muda só uma coisa por vez, para você saber o que fez a diferença.",
      ],
      explanation:
        "Cientista é qualquer pessoa que faz uma pergunta cuidadosa sobre o mundo e depois encontra um jeito de testar a resposta em vez de só chutar. O engenheiro pega o que os cientistas aprendem e usa para construir e melhorar coisas que resolvem problemas. Os dois usam o mesmo truque: mudam uma coisa, testam, olham o que acontece e tentam de novo. Nesta semana você vai soltar um helicóptero de papel (uma tira dobrada que gira enquanto cai) e descobrir como fazê-lo cair o mais devagar possível. Para isso, não dá para só chutar. Você precisa fazer um teste justo: mantenha tudo igual, menos a única coisa que quer estudar, para saber exatamente o que mudou o resultado.",
      vocabulary: [
        { term: "Previsão", definition: "Um palpite bem pensado sobre o que vai acontecer, feito antes de testar." },
        { term: "Observação", definition: "Algo que você percebe olhando com atenção, usando os sentidos." },
        { term: "Variável", definition: "A única coisa que você muda em um teste, como o comprimento das pás." },
        { term: "Teste justo", definition: "Um teste em que você muda só uma coisa e mantém todo o resto igual." },
        { term: "Evidência", definition: "O que você observa e registra e que ajuda a provar que a sua explicação está certa." },
        { term: "Redesenho", definition: "Mudar o seu projeto depois de um teste para ele funcionar melhor." },
      ],
      materials: [
        "2 folhas de papel",
        "Tesoura",
        "Uma régua",
        "Alguns clipes de papel",
        "Um cronômetro ou o do celular",
        "Um lugar seguro para soltar, como ao lado de uma cadeira (com um adulto)",
      ],
      safetyNotes: [
        "Peça ajuda de um adulto para qualquer queda de lugar alto: não suba em móveis bambos.",
        "Deixe a área de queda livre para ninguém passar por baixo.",
        "Carregue a tesoura com a ponta para baixo e corte sobre a mesa.",
      ],
      activityTitle: "Teste de queda do helicóptero de papel",
      steps: [
        "Pergunte: qual helicóptero de papel vai cair mais devagar? Essa é a pergunta que você vai testar.",
        "Corte uma tira de papel com cerca de 3 cm de largura e 20 cm de comprimento. Faça um corte até a metade e dobre as duas abas de cima em direções opostas para formar as pás. Encaixe um clipe embaixo.",
        "Preveja: você acha que pás mais compridas ou mais curtas vão fazer o helicóptero cair mais devagar? Escreva a sua previsão antes de testar.",
        "Teste com justiça: solte o helicóptero sempre da mesma altura e mude só UMA coisa, o comprimento das pás. Não empurre; apenas solte.",
        "Observe: marque quantos segundos ele leva para chegar ao chão e veja como ele gira. Faça isso algumas vezes para ter certeza.",
        "Anote os seus resultados ao lado da previsão.",
        "Melhore: faça um segundo helicóptero com pás de outro comprimento e teste do mesmo jeito. Qual cai mais devagar agora?",
      ],
      discussionQuestions: [
        "A sua previsão estava certa? Como você sabe?",
        "Qual única coisa você mudou, e o que manteve igual?",
        "Por que seria injusto mudar o comprimento das pás E a altura ao mesmo tempo?",
        "O que fez o helicóptero cair mais devagar?",
      ],
      reflectionPrompt:
        "Desenhe o seu melhor helicóptero de papel e escreva uma frase sobre o que fez ele cair mais devagar.",
      miniChallenge:
        "Usando só uma folha de papel, crie o helicóptero que fica mais tempo no ar. Cronometre para provar.",
      extension:
        "Acrescente um segundo e um terceiro clipe, um de cada vez, e teste como o peso extra muda a queda. Mantenha todo o resto igual.",
      whyItHappens:
        "Enquanto o helicóptero cai, a gravidade puxa para baixo, mas o ar empurra para cima contra as pás inclinadas e as faz girar. Um helicóptero girando empurra muito ar, e essa resistência do ar o segura, então ele plana em vez de despencar. Pás mais compridas pegam mais ar e giram mais, por isso costumam cair mais devagar. Acrescentar peso faz o puxão da gravidade vencer um pouco mais, então ele cai mais rápido.",
      engineeringConnection:
        "Os engenheiros que projetam helicópteros de verdade, paraquedas e até quem estuda as sementes giratórias que caem dos bordos usam a mesma ideia: a forma e a resistência do ar controlam a velocidade da queda. E, igual a você, os engenheiros mudam uma coisa por vez e testam de novo: isso se chama redesenho.",
      estimatedTime: "45 a 60 minutos",
      completionChecklist: [
        "Fiz uma pergunta e escrevi uma previsão antes de testar.",
        "Fiz um teste justo mudando só uma coisa.",
        "Anotei quanto tempo o meu helicóptero levou para cair.",
        "Expliquei por que o meu helicóptero caiu devagar ou rápido.",
        "Redesenhei e testei de novo.",
      ],
    },
    {
      title: "Reações químicas",
      bigQuestion: "O que acontece quando duas coisas se misturam e formam algo totalmente novo?",
      mainConcepts: [
        "Algumas misturas não ficam só paradas juntas: elas reagem e formam algo novo.",
        "O bicarbonato e o vinagre reagem e produzem um gás chamado dióxido de carbono.",
        "As bolhas e o gás podem ser evidência de que houve uma reação química.",
      ],
      explanation:
        "Quando você mistura areia e água, continua tendo areia e água: dava para secar e recuperar as duas. Isso é só uma mistura. Mas algumas coisas fazem algo diferente ao se encontrar: elas reagem e formam uma substância totalmente nova, que antes não existia. O bicarbonato e o vinagre fazem exatamente isso. Quando se tocam, reagem e produzem dióxido de carbono, um gás que você não consegue ver. Nesta semana você vai prender esse gás dentro de um balão. A efervescência e o balão enchendo são a sua evidência de que houve mesmo uma reação química, e não apenas uma mistura.",
      vocabulary: [
        { term: "Reação química", definition: "Quando substâncias se combinam e viram algo novo." },
        { term: "Gás", definition: "Uma forma da matéria, como o ar, que se espalha e ocupa todo o espaço." },
        { term: "Dióxido de carbono", definition: "O gás formado quando o bicarbonato e o vinagre reagem. Ele também está no ar." },
        { term: "Evidência", definition: "O que você vê ou mede e que mostra que algo realmente aconteceu." },
        { term: "Matéria", definition: "Tudo o que ocupa espaço, incluindo sólidos, líquidos e gases." },
      ],
      materials: [
        "1 colher de sopa de bicarbonato de sódio",
        "Cerca de meia xícara de vinagre branco",
        "Um balão",
        "Uma garrafa PET de água vazia",
        "Um funil pequeno, ou um papel enrolado em forma de funil",
        "Uma colher medidora",
      ],
      safetyNotes: [
        "O vinagre arde nos olhos: mantenha longe do rosto e não deixe respingar.",
        "Nunca beba o vinagre nem coma o bicarbonato.",
        "Um adulto deve ajudar a esticar o balão sobre a garrafa.",
        "Faça isso sobre a pia ou uma bandeja, e limpe o que derramar para ninguém escorregar.",
      ],
      activityTitle: "Reação de gás no balão",
      steps: [
        "Pergunte: duas coisas misturadas conseguem produzir gás suficiente para encher um balão? Essa é a sua pergunta.",
        "Coloque cerca de meia xícara de vinagre na garrafa vazia.",
        "Use o funil para colocar 1 colher de sopa de bicarbonato dentro do balão.",
        "Preveja: quão grande você acha que o balão vai ficar? Desenhe ou escreva a sua previsão antes.",
        "Estique a boca do balão sobre o gargalo da garrafa, mas deixe o bicarbonato lá em cima no balão, para ele ainda não cair.",
        "Teste: levante o balão na vertical para o bicarbonato cair dentro do vinagre.",
        "Observe: veja a mistura borbulhar e o balão encher. Repare no tamanho comparado com a sua previsão.",
        "Melhore: tente de novo com um pouco mais ou um pouco menos de bicarbonato e veja como o tamanho do balão muda.",
      ],
      discussionQuestions: [
        "O que você viu, ouviu ou sentiu que mostra que houve uma reação?",
        "De onde veio o gás que encheu o balão?",
        "A efervescência era algo novo, ou era só o bicarbonato e o vinagre se misturando?",
        "O que você acha que aconteceria com o dobro de bicarbonato?",
      ],
      reflectionPrompt:
        "Escreva ou desenhe o que aconteceu com o balão e explique em uma frase de onde veio o gás.",
      miniChallenge:
        "Descubra as quantidades de bicarbonato e vinagre que enchem o balão ao máximo sem estourar.",
      extension:
        "Teste se o vinagre morno faz a reação acontecer mais rápido que o vinagre gelado. Mantenha as quantidades iguais para o teste ser justo.",
      whyItHappens:
        "O bicarbonato e o vinagre são feitos de partículas minúsculas. Quando se encontram, essas partículas se reorganizam e formam substâncias novas, e uma delas é o gás dióxido de carbono. Um gás ocupa muito mais espaço que o líquido ocupava, então ele sobe e enche o balão. As bolhas que você vê são esse gás escapando do líquido. Como uma substância totalmente nova é formada, isso é uma reação química, e não apenas uma mistura.",
      engineeringConnection:
        "Engenheiros e padeiros usam reações que produzem gás de propósito. O bicarbonato é o que faz o pão, os muffins e as panquecas crescerem: o dióxido de carbono forma bolhinhas por dentro. Alguns extintores e itens de festa também usam reações rápidas de gás. Controlar quanto e com que velocidade é trabalho de engenharia.",
      estimatedTime: "45 a 60 minutos",
      completionChecklist: [
        "Previ o tamanho que o balão ia ficar.",
        "Misturei o bicarbonato e o vinagre com segurança.",
        "Observei a efervescência e o balão enchendo.",
        "Consigo explicar que o gás é dióxido de carbono produzido por uma reação.",
        "Testei uma quantidade nova para ver o que mudava.",
      ],
      relatedProject: {
        title: "Vulcão de Bicarbonato",
        note: "Quer ver a mesma reação em escala maior? Construa um vulcão de bicarbonato: ele usa exatamente a mesma reação de dióxido de carbono que você fez no balão.",
      },
    },
    {
      title: "Estados da matéria e materiais",
      bigQuestion: "Por que algumas coisas ficam geladas por mais tempo que outras?",
      mainConcepts: [
        "A matéria pode ser sólida, líquida ou gasosa.",
        "O gelo derretendo é uma mudança de estado: água sólida virando água líquida.",
        "Os materiais têm propriedades, e alguns seguram o calor melhor que outros.",
      ],
      explanation:
        "Tudo à sua volta é matéria, e a matéria costuma aparecer em três formas: sólida, líquida e gasosa. A água é especial porque dá para vê-la nas três: o gelo é sólido, a água é líquida e o vapor é gás. Quando o gelo derrete, ele não está sumindo; está mudando de sólido para líquido. Essa mudança acontece porque o calor entra no gelo vindo do cômodo mais quente. Nesta semana você vai tentar deixar isso mais lento. Materiais diferentes (papel-alumínio, algodão, papel-toalha) deixam o calor passar em velocidades diferentes. Um material que segura o calor se chama isolante, e achar o melhor deles é o seu trabalho.",
      vocabulary: [
        { term: "Sólido", definition: "Matéria que mantém a própria forma, como um cubo de gelo." },
        { term: "Líquido", definition: "Matéria que escorre e toma a forma do recipiente, como a água." },
        { term: "Gás", definition: "Matéria que se espalha e ocupa todo o espaço, como o vapor ou o ar." },
        { term: "Mudança de estado", definition: "Quando a matéria muda de forma, como um sólido derretendo e virando líquido." },
        { term: "Isolamento", definition: "Um material que segura o calor na passagem de um lugar para outro." },
        { term: "Calor", definition: "Energia que passa das coisas mais quentes para as mais frias." },
      ],
      materials: [
        "3 ou mais cubos de gelo do mesmo tamanho",
        "Copos ou potinhos, um para cada material",
        "Materiais para testar: papel-alumínio, algodão ou uma meia, papel-toalha, isopor ou um saco plástico",
        "Um prato ou bandeja para recolher a água derretida",
        "Um cronômetro",
      ],
      safetyNotes: [
        "O gelo é muito frio: não deixe encostado na pele por muito tempo.",
        "A água derretida deixa o chão escorregadio, então limpe os pingos na hora.",
        "Deixe os copos sobre uma bandeja para a água não se espalhar.",
      ],
      activityTitle: "Desafio de isolamento contra o derretimento",
      steps: [
        "Pergunte: qual material vai manter um cubo de gelo congelado por mais tempo?",
        "Embrulhe cada cubo de gelo em um material diferente. Deixe um cubo sem nada em volta: esse é o seu controle, para comparar.",
        "Preveja: coloque os materiais em ordem, do melhor ao pior em manter o gelo frio. Escreva a sua ordem.",
        "Teste com justiça: use cubos do mesmo tamanho, coloque todos no mesmo cômodo e comece ao mesmo tempo.",
        "Observe: confira a cada 10 minutos. Veja quais cubos estão derretendo mais rápido e quais ainda estão sólidos.",
        "Anote qual material manteve o gelo congelado por mais tempo e quanta água derretida cada um produziu.",
        "Melhore: pegue o seu melhor material e acrescente uma segunda camada, ou combine dois materiais, e teste se o gelo dura ainda mais.",
      ],
      discussionQuestions: [
        "Qual material foi o melhor isolante? Qual foi o pior?",
        "Por que você acha que o cubo sem embrulho (o controle) importa?",
        "De onde vem o calor que derrete o gelo?",
        "Qual desses materiais você tem nas suas roupas de frio?",
      ],
      reflectionPrompt:
        "Escreva qual material manteve o gelo congelado por mais tempo e uma frase explicando por que você acha que ele funcionou melhor.",
      miniChallenge:
        "Crie um mini cooler com os materiais que você tem e que mantenha um cubo de gelo congelado por mais tempo.",
      extension:
        "Teste se um cubo de gelo derrete mais rápido no sol ou na sombra. Mantenha os cubos do mesmo tamanho.",
      whyItHappens:
        "O cômodo está mais quente que o gelo, e o calor sempre vai das coisas mais quentes para as mais frias. Quando o calor entra no gelo, ele dá à água sólida energia suficiente para virar água líquida: isso é derreter. Bons isolantes, como o algodão e o isopor, são cheios de ar preso, e o ar preso é bem lento para passar calor adiante. Por isso o gelo lá dentro fica frio por mais tempo. Materiais finos e bem compactados deixam o calor passar mais rápido, então aquele gelo derrete antes.",
      engineeringConnection:
        "Os engenheiros usam isolamento em todo lugar: dentro de coolers e garrafas térmicas para manter as coisas geladas ou quentes, dentro das paredes das casas para economizar energia, e em casacos de inverno para segurar o calor do corpo. Escolher o material certo para cada tarefa é exatamente o que você fez neste desafio.",
      estimatedTime: "45 a 60 minutos",
      completionChecklist: [
        "Preparei cubos de gelo do mesmo tamanho com materiais diferentes e um sem embrulho como controle.",
        "Previ qual material funcionaria melhor.",
        "Conferi e registrei o derretimento ao longo do tempo.",
        "Consigo nomear a mudança de estado de sólido para líquido e explicar o derretimento.",
        "Melhorei o meu melhor isolante e testei de novo.",
      ],
    },
    {
      title: "Forças, movimento e atrito",
      bigQuestion: "O que faz as coisas acelerarem, desacelerarem ou pararem?",
      mainConcepts: [
        "Uma força é um empurrão ou um puxão.",
        "A gravidade é uma força que puxa os objetos para baixo, inclusive rampa abaixo.",
        "O atrito é uma força que reduz o movimento quando duas superfícies se esfregam.",
        "A textura de uma superfície muda o quanto ou a que velocidade algo se move sobre ela.",
      ],
      explanation:
        "Nada se move nem para sozinho: é preciso uma força, que nada mais é do que um empurrão ou um puxão. A gravidade é um puxão que atrai tudo para o chão. Quando você coloca um carrinho de brinquedo no alto de uma rampa, a gravidade o puxa para baixo e ele acelera. Mas, quando o carrinho chega ao chão, ele não rola para sempre. Outra força, o atrito, age contra o movimento. O atrito acontece quando duas superfícies se esfregam, e ele reduz a velocidade das coisas. Nesta semana você vai lançar um carrinho por uma rampa em direção a superfícies diferentes e ver o quanto a superfície muda a distância percorrida.",
      vocabulary: [
        { term: "Força", definition: "Um empurrão ou puxão que pode iniciar, parar ou mudar o movimento." },
        { term: "Gravidade", definition: "A força que puxa os objetos para o chão." },
        { term: "Atrito", definition: "Uma força que reduz o movimento quando duas superfícies se esfregam." },
        { term: "Movimento", definition: "Quando algo se desloca de um lugar para outro." },
        { term: "Superfície", definition: "A camada de fora de algo, como o topo de um piso ou de uma toalha." },
      ],
      materials: [
        "Um carrinho de brinquedo ou qualquer coisa que role",
        "Uma tábua ou papelão firme para fazer uma rampa",
        "Alguns livros para apoiar a rampa",
        "Uma fita métrica ou régua",
        "Superfícies para testar: piso liso, uma toalha, lixa e papel-alumínio",
        "Fita para manter as superfícies esticadas",
      ],
      safetyNotes: [
        "Deixe a rampa firme para ela não escorregar nem tombar.",
        "Deixe o caminho livre para o carrinho não rolar em cima de alguém.",
        "Não role objetos pesados em direção aos pés nem de mesas altas.",
      ],
      activityTitle: "Teste de superfícies com rampa",
      steps: [
        "Pergunte: em qual superfície o carrinho vai rolar mais longe depois de sair da rampa?",
        "Monte uma rampa apoiando uma tábua sobre alguns livros. Marque uma linha de partida no alto.",
        "Preveja: coloque as superfícies em ordem, de \"o carrinho rola mais longe\" a \"o carrinho para antes\". Escreva.",
        "Teste com justiça: solte o carrinho sempre da mesma linha de partida, sem empurrar, e mantenha a rampa na mesma altura. Mude só a superfície de baixo.",
        "Observe: meça a distância que o carrinho percorre depois do fim da rampa em cada superfície.",
        "Anote cada distância ao lado da sua previsão.",
        "Melhore: tente fazer o carrinho ir ainda mais longe (levante mais a rampa ou escolha a superfície mais lisa) e teste o que realmente ajuda mais.",
      ],
      discussionQuestions: [
        "Qual superfície deixou o carrinho rolar mais longe? Qual o parou mais rápido?",
        "Por que é importante soltar o carrinho em vez de empurrar?",
        "Qual força puxou o carrinho rampa abaixo? Qual o freou lá embaixo?",
        "Onde você sente atrito na vida real?",
      ],
      reflectionPrompt:
        "Escreva qual superfície deixou o carrinho ir mais longe e explique por quê usando a palavra atrito.",
      miniChallenge:
        "Marque uma linha-alvo no chão e ajuste a sua rampa para o carrinho parar o mais perto possível dela.",
      extension:
        "Levante mais a rampa e meça como a altura extra muda a distância. Mantenha o mesmo carrinho e a mesma superfície.",
      whyItHappens:
        "A gravidade puxa o carrinho rampa abaixo, dando a ele movimento e velocidade. Quando o carrinho chega ao chão, o atrito entre as rodas e a superfície empurra contra esse movimento e o reduz. Superfícies ásperas ou macias, como a lixa e a toalha, agarram mais as rodas, então há mais atrito e o carrinho para antes. Superfícies lisas têm menos atrito, então o carrinho continua rolando mais longe. Uma rampa mais alta dá à gravidade mais vantagem, então o carrinho começa mais rápido.",
      engineeringConnection:
        "Os engenheiros usam o atrito de propósito quando querem que as coisas parem ou agarrem, como a borracha das solas, os freios dos carros e os pneus. Eles também trabalham para reduzir o atrito quando querem que as coisas se movam com facilidade, como rodas, escorregadores e as lâminas lisas dos patins de gelo. Saber quando você quer mais ou menos atrito é uma decisão de engenharia de verdade.",
      estimatedTime: "45 a 60 minutos",
      completionChecklist: [
        "Montei uma rampa e mantive a mesma altura em cada teste.",
        "Previ como cada superfície mudaria a distância.",
        "Medi o quanto o carrinho rolou em cada superfície.",
        "Consigo explicar o papel da gravidade e do atrito.",
        "Mudei alguma coisa e testei para o carrinho ir mais longe ou acertar um alvo.",
      ],
    },
    {
      title: "Máquinas simples, estruturas e estabilidade",
      bigQuestion: "Como ferramentas simples e formas inteligentes podem nos ajudar em tarefas difíceis?",
      mainConcepts: [
        "As máquinas simples facilitam o trabalho.",
        "Rampas, alavancas, rodas e roldanas ajudam a mover ou levantar coisas.",
        "As estruturas ficam mais fortes quando têm uma base estável e usam formas de apoio, como triângulos.",
        "Os bons projetos são testados e depois melhorados.",
      ],
      explanation:
        "Uma máquina simples é uma ferramenta simples que facilita uma tarefa difícil, como uma rampa, uma alavanca, uma roda ou uma roldana. Uma alavanca, por exemplo, é uma barra rígida que gira sobre um ponto de apoio e permite que um empurrão pequeno levante uma carga pesada. Estruturas como torres e pontes têm outra tarefa: precisam segurar peso sem cair. Uma base larga impede a estrutura de tombar, e os triângulos são a forma secreta que impede que ela entorte. Nesta semana você escolhe o seu desafio: construir uma máquina simples que levante um peso, ou construir uma estrutura que fique alta e firme. De qualquer jeito, você vai testar e depois melhorar.",
      vocabulary: [
        { term: "Máquina simples", definition: "Uma ferramenta simples que facilita o trabalho, como uma alavanca ou uma rampa." },
        { term: "Alavanca", definition: "Uma barra rígida que gira sobre um ponto de apoio para levantar ou mover uma carga." },
        { term: "Roldana", definition: "Uma roda com uma corda por cima que ajuda a levantar coisas." },
        { term: "Estrutura", definition: "Algo construído para segurar peso ou ficar em pé, como uma torre ou uma ponte." },
        { term: "Estável", definition: "Firme e difícil de tombar." },
        { term: "Escora", definition: "Um apoio, muitas vezes em forma de triângulo, que impede a estrutura de entortar." },
      ],
      materials: [
        "Para uma máquina: uma régua e um lápis para fazer uma alavanca, ou um carretel e barbante para uma roldana",
        "Pesos pequenos para levantar, como uma pilha de moedas ou um brinquedo pequeno",
        "Para uma estrutura: fichas de cartolina, canudos ou palitos de artesanato",
        "Fita",
        "Uma régua",
        "Moedas ou arruelas para testar quanto peso ela aguenta",
      ],
      safetyNotes: [
        "Mantenha os dedos fora de baixo das alavancas e dos pesos quando eles caírem.",
        "Use pesos de teste pequenos e baixos, para nada pesado cair em cima de alguém.",
        "Corte e passe a tesoura com segurança, com a ponta para baixo.",
      ],
      activityTitle: "Desafio da minimáquina ou da torre (escolha um)",
      steps: [
        "Pergunte: como uma máquina simples ou uma forma resistente pode me ajudar a levantar ou segurar mais? Escolha o caminho da máquina ou o da torre.",
        "Caminho da máquina: apoie uma régua atravessada sobre um lápis para fazer uma alavanca. Coloque um peso pequeno em uma das pontas.",
        "Caminho da torre: construa a torre mais alta que conseguir com fichas ou canudos e fita, e que ainda segure um peso em cima.",
        "Preveja: na alavanca, adivinhe onde colocar o lápis para levantar o peso com mais facilidade. Na torre, adivinhe quantas moedas ela vai aguentar. Escreva.",
        "Teste: na alavanca, pressione a outra ponta e deslize o lápis para posições diferentes. Na torre, acrescente moedas uma a uma até ela entortar ou tombar.",
        "Observe: repare em qual posição do lápis deixou o levantamento mais fácil, ou quantas moedas a torre aguentou antes de falhar.",
        "Melhore: aproxime o lápis do peso, ou acrescente escoras triangulares e uma base mais larga à torre, e teste de novo.",
      ],
      discussionQuestions: [
        "O que deixou o levantamento do peso mais fácil, ou o que deixou a torre mais forte?",
        "Por que você acha que os triângulos aguentam melhor que os quadrados?",
        "Onde uma base larga ajuda algo a ficar em pé?",
        "Quais máquinas simples você usou hoje sem perceber?",
      ],
      reflectionPrompt:
        "Desenhe a sua máquina ou torre e identifique a parte que fez mais trabalho para facilitar a tarefa.",
      miniChallenge:
        "Caminho da máquina: levante o peso mais pesado que conseguir com a sua alavanca. Caminho da torre: construa a torre que aguenta mais moedas.",
      extension:
        "Acrescente uma segunda máquina simples, como uma roldana para levantar a sua carga, ou combine uma rampa e uma alavanca para mover algo.",
      whyItHappens:
        "Uma alavanca gira sobre o ponto de apoio dela, chamado fulcro. Quando você move o fulcro para mais perto da carga, um empurrão pequeno na ponta distante consegue levantar um peso grande: a máquina troca um empurrão mais longo por um mais fácil. As estruturas funcionam diferente: uma base larga espalha o peso e reduz a chance de tombar, e os triângulos mantêm a forma sob peso, enquanto os quadrados dobram e entortam. É por isso que torres escoradas e de base larga aguentam muito mais.",
      engineeringConnection:
        "Os engenheiros colocam essas ideias na vida real todos os dias: gangorras e abridores de garrafa são alavancas, guindastes e mastros de bandeira usam roldanas, rampas para cadeira de rodas são planos inclinados, e pontes e arranha-céus são reforçados com triângulos e bases largas. E, igual a você, os engenheiros sempre testam um projeto e depois o melhoram.",
      estimatedTime: "50 a 60 minutos",
      completionChecklist: [
        "Construí uma máquina simples ou uma estrutura.",
        "Fiz uma previsão antes de testar.",
        "Testei quanto ela conseguia levantar ou segurar.",
        "Consigo explicar como uma alavanca, ou uma base larga e triângulos, facilitaram a tarefa.",
        "Melhorei o meu projeto e testei de novo.",
      ],
    },
    {
      title: "Ciências da vida e ecossistemas",
      bigQuestion: "Do que os seres vivos precisam para crescer e sobreviver?",
      mainConcepts: [
        "Os seres vivos precisam de água, ar, luz, espaço e do ambiente certo para sobreviver.",
        "Plantas e animais interagem com as partes vivas e não vivas do ecossistema deles.",
        "Os cientistas observam sistemas vivos ao longo do tempo para entender como eles mudam.",
        "Os engenheiros podem criar ferramentas que ajudam os seres vivos a crescer ou sobreviver.",
      ],
      explanation:
        "Os seres vivos (as plantas, os animais e até você) precisam de certas coisas para continuar vivos: água, ar, luz, espaço e um lugar que combine com eles. Todas as coisas vivas e não vivas de uma área, funcionando juntas, formam um ecossistema. Um jardim tem plantas e insetos (vivos) e também terra, água e luz do sol (não vivos), e todos dependem uns dos outros. Diferente de um experimento de um dia, os seres vivos mudam devagar, então os cientistas os observam por dias e semanas. Nesta semana você vai cultivar uma semente e mudar uma coisa no jeito como ela vive, e depois observar ao longo do tempo quais condições a ajudam a crescer melhor.",
      vocabulary: [
        { term: "Vivo", definition: "Algo que cresce, precisa de alimento ou água e consegue gerar mais de si, como uma planta." },
        { term: "Não vivo", definition: "Algo que não tem vida, como água, pedras ou luz do sol." },
        { term: "Ecossistema", definition: "Todas as coisas vivas e não vivas de uma área, funcionando juntas." },
        { term: "Ambiente", definition: "O entorno em que um ser vivo vive." },
        { term: "Germinar", definition: "Quando uma semente começa a crescer e brota virando planta." },
        { term: "Sobreviver", definition: "Continuar vivo conseguindo aquilo de que se precisa." },
      ],
      materials: [
        "Alguns feijões secos ou sementes de crescimento rápido",
        "Copos transparentes ou saquinhos plásticos com fecho",
        "Papel-toalha",
        "Água",
        "Um parapeito ensolarado e um lugar escuro, como um armário",
        "Um caderno para registrar o que você vê a cada dia",
      ],
      safetyNotes: [
        "Não coma as sementes nem os feijões, mesmo sendo alimentos.",
        "Lave as mãos depois de mexer com sementes, terra ou papel-toalha molhado.",
        "Limpe qualquer água para ninguém escorregar.",
      ],
      activityTitle: "Laboratório de crescimento de sementes",
      steps: [
        "Pergunte: do que uma semente mais precisa para crescer bem: água, luz ou as duas coisas?",
        "Dobre um papel-toalha úmido dentro de cada copo transparente e encaixe uma semente encostada na parede, para você conseguir vê-la.",
        "Prepare sementes em condições diferentes: uma com água e luz, uma com água no escuro e uma com luz mas sem água.",
        "Preveja: qual semente você acha que vai crescer melhor? Escreva a sua previsão.",
        "Teste com justiça: mantenha as sementes iguais e mude só uma condição por vez.",
        "Observe ao longo do tempo: confira todo dia por cerca de uma semana. Desenhe e meça o que você vê, e anote a data.",
        "Explique e melhore: compare as sementes, explique quais condições ajudaram, depois crie um arranjo melhor e cultive outra semente para testar.",
      ],
      discussionQuestions: [
        "Qual semente cresceu melhor, e qual cresceu pior?",
        "O que aconteceu com a semente sem água? E com a que ficou sem luz?",
        "Por que os cientistas precisam acompanhar este experimento por muitos dias?",
        "De quais coisas vivas e não vivas a sua semente precisou?",
      ],
      reflectionPrompt:
        "Desenhe como a sua melhor semente mudou durante a semana e escreva uma frase sobre o que os seres vivos precisam.",
      miniChallenge:
        "Crie o melhor arranjo de cultivo que conseguir e preveja quanto a sua semente vai crescer em uma semana.",
      extension:
        "Monte um mini ecossistema em um pote transparente com terra, uma plantinha e um pouco de água, e observe como ele muda ao longo de duas semanas.",
      whyItHappens:
        "Uma semente guarda uma plantinha minúscula e uma pequena reserva de alimento. Quando recebe água, ar e calor, ela germina: a plantinha acorda, usa o alimento guardado e brota. Assim que as folhas aparecem, a planta precisa de luz para fabricar o próprio alimento e continuar crescendo. É por isso que a semente sem água não consegue começar, e a semente no escuro brota mas depois cresce fraca e pálida. O que você vê é evidência direta do que os seres vivos precisam para sobreviver.",
      engineeringConnection:
        "Os engenheiros criam ferramentas que ajudam os seres vivos a crescer e sobreviver: estufas que retêm calor e luz, sistemas de gotejamento que regam as plantas devagar, vasos que se autorregam e até habitats e abrigos para animais. Entender o que os seres vivos precisam é o primeiro passo para projetar algo que os ajude.",
      estimatedTime: "45 a 60 minutos (mais conferidas diárias por uma semana)",
      completionChecklist: [
        "Preparei sementes em condições diferentes, com uma única mudança justa.",
        "Previ qual semente cresceria melhor.",
        "Observei e registrei as sementes ao longo de vários dias.",
        "Consigo explicar o que os seres vivos precisam para sobreviver.",
        "Criei um arranjo melhor e testei.",
      ],
    },
  ],
}

const overlays: LocaleOverlays<ScienceCurriculum> = { es, zh, pt }

/** The Science Experiments curriculum in the requested language. */
export const getScienceExperimentsCurriculum = createLocalizedResolver(
  scienceExperimentsCurriculum,
  overlays,
)

/** Whether this course has been translated into `language` at all. */
export function scienceCurriculumHasTranslation(language: Language): boolean {
  return hasLocaleOverlay(overlays, language)
}

/** The lesson with this slug, in the requested language. */
export function findScienceLesson(language: Language, slug: string): ScienceLesson | undefined {
  return getScienceExperimentsCurriculum(language).lessons.find((lesson) => lesson.slug === slug)
}

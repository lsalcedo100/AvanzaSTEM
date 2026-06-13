import { getProjectGuide, type ProjectGuide } from "@/features/projects/data"
import { getBreadcrumbJsonLd } from "@/lib/structured-data"
import { siteConfig } from "@/lib/site-config"
import { translations, type Language } from "@/i18n/translations"

export type ProjectFaq = {
  question: string
  answer: string
}

/**
 * FAQ entries used to build each project's FAQPage JSON-LD (and, for some
 * dedicated guides, an on-page FAQ section). Currently only the highest-value
 * project slugs have entries. `getProjectFaqJsonLd` falls back to the English
 * entries if a slug has no translation for the requested language - this is
 * called out in that function's docs.
 */
export const projectFaqs: Record<Language, Partial<Record<string, ProjectFaq[]>>> = {
  en: {
    "popsicle-stick-bridge": [
      {
        question: "What is the strongest popsicle stick bridge design for beginners?",
        answer:
          "A Warren truss bridge is a strong beginner choice because repeating triangles spread the load clearly and are easier to measure than curved or highly angled designs.",
      },
      {
        question: "How do you make a truss bridge out of popsicle sticks?",
        answer:
          "Build two matching side trusses first, connect them with cross pieces, add diagonal bracing, let every glue joint cure fully, then run a slow center load test.",
      },
      {
        question: "Why does a triangle truss make the bridge stronger?",
        answer:
          "Triangles resist changing shape. That helps the bridge move force through the sticks instead of letting the frame lean into a weak diamond shape.",
      },
      {
        question: "How much weight can a popsicle stick bridge hold?",
        answer:
          "A careful student bridge can often hold many times its own weight, but the result depends on stick quality, glue joints, span length, curing time, and how the load is added.",
      },
      {
        question: "How can this become a science fair or classroom project?",
        answer:
          "Keep the span, materials, and testing method the same, then compare one design change at a time, such as fewer sticks, extra bracing, or a different truss pattern.",
      },
    ],
    "lego-robot-builder": [
      {
        question: "What is the LEGO SPIKE Prime Super Cleanup robot?",
        answer:
          "Super Cleanup is a LEGO Education SPIKE Prime activity where students build and program a grabber-style robot that can pick up, move, and release objects.",
      },
      {
        question: "Is this a beginner robotics project?",
        answer:
          "Yes. It works well for beginners when students build the base first, test the motor and sensor before adding the claw, and break the mission into small code steps.",
      },
      {
        question: "What should students test after building the robot?",
        answer:
          "Students should test different objects, jaw shapes, motor speeds, and release positions, then record which design choices make the cleanup robot more reliable.",
      },
      {
        question: "Do I need the official LEGO SPIKE Prime set?",
        answer:
          "The guide is written for LEGO Education SPIKE Prime set #45678 or a similar LEGO robotics kit with a hub, motor, wheels, beams, pins, and a simple grabber mechanism.",
      },
    ],
    "coke-mentos-experiment": [
      {
        question: "What is the Coke and Mentos science project?",
        answer:
          "The Coke and Mentos science project is a hands-on experiment where dropping Mentos candies into a bottle of soda triggers a fast-rising foam geyser, which students can turn into a real science fair project with a hypothesis, variables, and measurements.",
      },
      {
        question: "Why does the mentos and soda reaction happen so fast?",
        answer:
          "Mentos candies have thousands of tiny rough pits on their surface. Those pits give dissolved carbon dioxide bubbles many places to form at once, a process called nucleation, so the gas escapes the soda almost instantly and pushes liquid out the bottle opening.",
      },
      {
        question: "Is Diet Coke or regular Coke better for a Mentos and Coke science project?",
        answer:
          "Diet Coke usually produces a taller geyser because it has less sugar and a thinner texture, which lets carbon dioxide bubbles rise and escape more easily than in regular Coke.",
      },
      {
        question: "Is the Coke and Mentos experiment safe to do at home?",
        answer:
          "Yes, as long as it is done outdoors on flat ground, with safety goggles on, and everyone stands back the moment the Mentos are dropped in. Never point the bottle at people, and do not drink the soda afterward.",
      },
      {
        question: "How do I turn the Coke and Mentos experiment into a science fair project?",
        answer:
          "Pick one variable to test at a time, such as soda type, number of Mentos, soda temperature, or bottle size, keep everything else the same, then record geyser height for each trial in a data table to compare results.",
      },
    ],
    "baking-soda-volcano": [
      {
        question: "What household items do I need for a baking soda volcano?",
        answer:
          "You need baking soda, vinegar, a small plastic bottle or cup, modeling material such as play dough or foil to build the volcano shape, plus dish soap and food coloring for a foamier, more colorful eruption.",
      },
      {
        question: "Is a baking soda volcano safe for kids to make at home?",
        answer:
          "Yes. Baking soda and vinegar are safe, food-grade ingredients. Keep the mixture away from eyes, wash hands afterward, and have an adult help if food coloring is used since it can stain clothes and surfaces.",
      },
      {
        question: "What is the chemical reaction inside a baking soda volcano?",
        answer:
          "Baking soda is a base and vinegar is an acid. When they combine, they react to produce carbon dioxide gas, and that gas creates the bubbling foam that erupts out of the bottle like lava.",
      },
      {
        question: "How do you clean up after a baking soda volcano eruption?",
        answer:
          "Work on a tray or pan to catch the foam, then rinse the tray, bottle, and volcano materials with water. The leftover liquid is a mild, non-toxic mixture of water, salt, and dissolved baking soda that is safe to pour down a drain.",
      },
      {
        question: "What can kids learn from the baking soda volcano experiment?",
        answer:
          "Kids see a real acid-base reaction produce a new gas, practice measuring ingredients, and can extend the activity into a fair test by changing the amount of baking soda or vinegar and comparing how big each eruption gets.",
      },
    ],
    "elephant-toothpaste-experiment": [
      {
        question: "Is the elephant toothpaste experiment safe for kids?",
        answer:
          "It can be done safely with adult supervision. An adult should handle and pour the hydrogen peroxide, and everyone should wear safety goggles and gloves. The foam is warm but safe to touch once it has fully settled.",
      },
      {
        question: "What ingredients do you need for elephant toothpaste?",
        answer:
          "You need hydrogen peroxide (6% or 12%, from a beauty supply store), dry active yeast, warm water, dish soap, food coloring, a plastic bottle, and a tray to contain the foam.",
      },
      {
        question: "Why does elephant toothpaste foam up so quickly?",
        answer:
          "Yeast acts as a catalyst that makes hydrogen peroxide break down into water and oxygen gas almost instantly instead of slowly. The oxygen gets trapped in the dish soap, creating a huge tower of foam, and the reaction releases heat as it happens.",
      },
      {
        question: "What does the elephant toothpaste experiment teach about chemistry?",
        answer:
          "It demonstrates how catalysts speed up chemical reactions, how gases can be trapped to create foam, and how exothermic reactions release heat, which students can feel in the warm foam afterward.",
      },
      {
        question: "How do you clean up elephant toothpaste foam?",
        answer:
          "Once the foam has cooled and settled, rinse it and any leftover liquid down a drain with plenty of water. Wipe down the tray and bottle, and wash hands and any tools used.",
      },
      {
        question: "Can elephant toothpaste be done at home, or only in a classroom?",
        answer:
          "It works well in both settings. At home, do it outside or in a bathtub for easy cleanup with one adult supervising. In a classroom, it makes a great demonstration when the teacher handles the hydrogen peroxide and students observe from a safe distance.",
      },
    ],
    "making-oobleck": [
      {
        question: "What ingredients do you need to make oobleck?",
        answer:
          "Oobleck only needs two ingredients: 2 cups of cornstarch and 1 cup of water, plus optional food coloring. Mix them slowly in a bowl until the texture feels strange to stir.",
      },
      {
        question: "Is oobleck safe for kids to touch and play with?",
        answer:
          "Yes. Oobleck is made from food-safe cornstarch and water, so it is safe to touch and squeeze. The main thing to watch for is mess, since it can drip and spread if not contained on a tray.",
      },
      {
        question: "Why does oobleck act like a solid and a liquid?",
        answer:
          "Oobleck is a non-Newtonian fluid, which means its thickness changes depending on pressure. A quick hit or squeeze locks the cornstarch particles together so it feels solid, while gentle pressure lets the particles slide past each other so it flows like a liquid.",
      },
      {
        question: "What does making oobleck teach kids about science?",
        answer:
          "It introduces the idea that not all liquids behave the same way under pressure, a property called shear thickening. Kids can connect this to real engineering uses, like materials designed for body armor or pothole fillers.",
      },
      {
        question: "How do you clean up oobleck without clogging drains?",
        answer:
          "Never rinse oobleck down a sink because cornstarch can build up in pipes. Instead, let leftover oobleck dry out completely on its tray, then scrape the dried pieces into the trash before washing the bowl and your hands.",
      },
      {
        question: "Is making oobleck a good activity for home or the classroom?",
        answer:
          "Yes to both. It takes about 20 minutes, uses ingredients most kitchens already have, and works well as a quick home science activity or as a classroom station for exploring non-Newtonian fluids.",
      },
    ],
  },
  es: {
    "popsicle-stick-bridge": [
      {
        question: "Cual es el mejor diseno de puente de palitos de helado para principiantes?",
        answer:
          "Un puente tipo Warren (con triangulos repetidos) es una buena opcion para principiantes porque los triangulos reparten el peso de forma clara y son mas faciles de medir que disenos curvos o con angulos complicados.",
      },
      {
        question: "Como se hace un puente de armadura con palitos de helado?",
        answer:
          "Primero construye dos armaduras laterales iguales, unelas con piezas cruzadas, agrega refuerzos diagonales, deja que cada union de pegamento seque por completo, y luego haz una prueba de carga lenta en el centro.",
      },
      {
        question: "Por que un triangulo hace que el puente sea mas fuerte?",
        answer:
          "Los triangulos resisten cambiar de forma. Eso ayuda a que la fuerza pase a traves de los palitos en lugar de dejar que la estructura se deforme en un rombo debil.",
      },
      {
        question: "Cuanto peso puede soportar un puente de palitos de helado?",
        answer:
          "Un puente hecho con cuidado a menudo puede soportar muchas veces su propio peso, pero el resultado depende de la calidad de los palitos, las uniones con pegamento, la longitud del puente, el tiempo de secado y como se agrega la carga.",
      },
      {
        question: "Como puedo convertir esto en un proyecto de feria de ciencias o de clase?",
        answer:
          "Manten el largo del puente, los materiales y el metodo de prueba iguales, y luego compara un cambio de diseno a la vez, como usar menos palitos, agregar refuerzos extra o cambiar el patron de la armadura.",
      },
    ],
    "lego-robot-builder": [
      {
        question: "Que es el robot Super Cleanup de LEGO SPIKE Prime?",
        answer:
          "Super Cleanup es una actividad de LEGO Education SPIKE Prime en la que los estudiantes construyen y programan un robot tipo pinza que puede agarrar, mover y soltar objetos.",
      },
      {
        question: "Es este un proyecto de robotica para principiantes?",
        answer:
          "Si. Funciona muy bien para principiantes cuando los estudiantes construyen primero la base, prueban el motor y el sensor antes de agregar la pinza, y dividen la mision en pequenos pasos de codigo.",
      },
      {
        question: "Que deberian probar los estudiantes despues de construir el robot?",
        answer:
          "Los estudiantes deberian probar diferentes objetos, formas de pinza, velocidades de motor y posiciones de liberacion, y luego anotar que decisiones de diseno hacen que el robot de limpieza sea mas confiable.",
      },
      {
        question: "Necesito el set oficial de LEGO SPIKE Prime?",
        answer:
          "La guia esta escrita para el set LEGO Education SPIKE Prime #45678 o un kit de robotica LEGO similar que incluya un hub, motor, ruedas, vigas, pines y un mecanismo de pinza simple.",
      },
    ],
    "coke-mentos-experiment": [
      {
        question: "Que es el experimento de Coca-Cola y Mentos?",
        answer:
          "El experimento de Coca-Cola y Mentos es una actividad practica donde dejar caer dulces Mentos en una botella de soda provoca un geiser de espuma que sale rapidamente, y los estudiantes pueden convertirlo en un proyecto de feria de ciencias real con hipotesis, variables y mediciones.",
      },
      {
        question: "Por que la reaccion entre los Mentos y la soda ocurre tan rapido?",
        answer:
          "Los dulces Mentos tienen miles de pequenos hoyitos rugosos en su superficie. Esos hoyitos le dan a las burbujas de dioxido de carbono disuelto muchos lugares para formarse a la vez, un proceso llamado nucleacion, asi que el gas escapa de la soda casi al instante y empuja el liquido fuera de la botella.",
      },
      {
        question:
          "Es mejor usar Coca-Cola Diet o Coca-Cola normal para el proyecto de Mentos y Coca-Cola?",
        answer:
          "La Coca-Cola Diet por lo general produce un geiser mas alto porque tiene menos azucar y una textura mas ligera, lo que permite que las burbujas de dioxido de carbono suban y escapen mas facilmente que en la Coca-Cola normal.",
      },
      {
        question: "Es seguro hacer el experimento de Coca-Cola y Mentos en casa?",
        answer:
          "Si, siempre que se haga al aire libre, en suelo plano, con gafas de seguridad puestas, y que todos se alejen en el momento en que se echan los Mentos. Nunca apuntes la botella hacia las personas, y no tomes la soda despues.",
      },
      {
        question: "Como convierto el experimento de Coca-Cola y Mentos en un proyecto de feria de ciencias?",
        answer:
          "Elige una variable para probar a la vez, como el tipo de soda, la cantidad de Mentos, la temperatura de la soda o el tamano de la botella, manten todo lo demas igual, y luego anota la altura del geiser en cada prueba en una tabla de datos para comparar resultados.",
      },
    ],
    "baking-soda-volcano": [
      {
        question: "Que materiales caseros necesito para un volcan de bicarbonato?",
        answer:
          "Necesitas bicarbonato de sodio, vinagre, una botella o vaso pequeno de plastico, material para modelar como masa de jugar o papel aluminio para darle forma al volcan, ademas de jabon liquido para platos y colorante de alimentos para una erupcion mas espumosa y colorida.",
      },
      {
        question: "Es seguro que los ninos hagan un volcan de bicarbonato en casa?",
        answer:
          "Si. El bicarbonato de sodio y el vinagre son ingredientes seguros y de grado alimenticio. Manten la mezcla lejos de los ojos, lavate las manos despues, y pide ayuda a un adulto si usas colorante de alimentos porque puede manchar ropa y superficies.",
      },
      {
        question: "Cual es la reaccion quimica dentro de un volcan de bicarbonato?",
        answer:
          "El bicarbonato de sodio es una base y el vinagre es un acido. Cuando se combinan, reaccionan y producen gas de dioxido de carbono, y ese gas crea la espuma burbujeante que sale de la botella como lava.",
      },
      {
        question: "Como se limpia despues de la erupcion de un volcan de bicarbonato?",
        answer:
          "Trabaja sobre una bandeja o charola para atrapar la espuma, y luego enjuaga la bandeja, la botella y los materiales del volcan con agua. El liquido que queda es una mezcla suave y no toxica de agua, sal y bicarbonato disuelto que se puede tirar por el drenaje sin problema.",
      },
      {
        question: "Que pueden aprender los ninos del experimento del volcan de bicarbonato?",
        answer:
          "Los ninos ven una reaccion real entre acido y base que produce un gas nuevo, practican medir ingredientes, y pueden extender la actividad a una prueba justa cambiando la cantidad de bicarbonato o vinagre y comparando que tan grande es cada erupcion.",
      },
    ],
    "elephant-toothpaste-experiment": [
      {
        question: "Es seguro el experimento de pasta de dientes de elefante para ninos?",
        answer:
          "Se puede hacer de forma segura con supervision de un adulto. Un adulto debe manejar y servir el peroxido de hidrogeno, y todos deben usar gafas y guantes de seguridad. La espuma queda tibia pero es segura de tocar una vez que se ha asentado por completo.",
      },
      {
        question: "Que ingredientes necesitas para la pasta de dientes de elefante?",
        answer:
          "Necesitas peroxido de hidrogeno (al 6% o 12%, de una tienda de productos de belleza), levadura seca activa, agua tibia, jabon liquido para platos, colorante de alimentos, una botella de plastico y una bandeja para contener la espuma.",
      },
      {
        question: "Por que la pasta de dientes de elefante hace tanta espuma tan rapido?",
        answer:
          "La levadura actua como catalizador y hace que el peroxido de hidrogeno se descomponga en agua y oxigeno casi de inmediato en lugar de lentamente. El oxigeno queda atrapado en el jabon para platos, creando una gran torre de espuma, y la reaccion libera calor mientras ocurre.",
      },
      {
        question: "Que ensena el experimento de pasta de dientes de elefante sobre quimica?",
        answer:
          "Demuestra como los catalizadores aceleran las reacciones quimicas, como los gases pueden quedar atrapados para crear espuma, y como las reacciones exotermicas liberan calor, lo cual los estudiantes pueden sentir despues en la espuma tibia.",
      },
      {
        question: "Como se limpia la espuma de pasta de dientes de elefante?",
        answer:
          "Una vez que la espuma se haya enfriado y asentado, enjuagala junto con cualquier liquido restante por el drenaje con suficiente agua. Limpia la bandeja y la botella, y lavate las manos y cualquier herramienta usada.",
      },
      {
        question: "Se puede hacer la pasta de dientes de elefante en casa, o solo en el salon de clases?",
        answer:
          "Funciona bien en ambos lugares. En casa, hazlo afuera o en la tina del bano para que sea facil de limpiar, con un adulto supervisando. En el salon de clases, es una excelente demostracion cuando el maestro maneja el peroxido de hidrogeno y los estudiantes observan desde una distancia segura.",
      },
    ],
    "making-oobleck": [
      {
        question: "Que ingredientes necesitas para hacer oobleck?",
        answer:
          "El oobleck solo necesita dos ingredientes: 2 tazas de maicena y 1 taza de agua, ademas de colorante de alimentos opcional. Mezclalos despacio en un tazon hasta que la textura se sienta extrana al revolver.",
      },
      {
        question: "Es seguro que los ninos toquen y jueguen con el oobleck?",
        answer:
          "Si. El oobleck esta hecho de maicena y agua, ingredientes seguros para consumo, asi que es seguro tocarlo y apretarlo. Lo principal a tener en cuenta es el desorden, ya que puede gotear y esparcirse si no se contiene en una bandeja.",
      },
      {
        question: "Por que el oobleck actua como solido y como liquido?",
        answer:
          "El oobleck es un fluido no newtoniano, lo que significa que su espesor cambia segun la presion que recibe. Un golpe rapido o un apreton hace que las particulas de maicena se junten y se sienta solido, mientras que una presion suave permite que las particulas se deslicen entre si y fluya como liquido.",
      },
      {
        question: "Que les ensena hacer oobleck a los ninos sobre ciencia?",
        answer:
          "Introduce la idea de que no todos los liquidos se comportan igual bajo presion, una propiedad llamada espesamiento por cizalla. Los ninos pueden relacionar esto con usos reales de ingenieria, como materiales disenados para chalecos antibalas o para rellenar baches.",
      },
      {
        question: "Como se limpia el oobleck sin tapar el drenaje?",
        answer:
          "Nunca enjuagues el oobleck en el lavabo porque la maicena puede acumularse en las tuberias. En su lugar, deja que el oobleck que sobra se seque por completo en su bandeja, luego raspa los pedazos secos y tiralos a la basura antes de lavar el tazon y tus manos.",
      },
      {
        question: "Es hacer oobleck una buena actividad para casa o para el salon de clases?",
        answer:
          "Si, para ambos. Toma alrededor de 20 minutos, usa ingredientes que la mayoria de las cocinas ya tienen, y funciona bien como actividad rapida de ciencia en casa o como estacion de clase para explorar fluidos no newtonianos.",
      },
    ],
  },
  zh: {
    "popsicle-stick-bridge": [
      {
        question: "适合新手的最坚固冰棒棍桥设计是什么?",
        answer:
          "沃伦式桁架桥（Warren truss）很适合新手，因为重复的三角形结构能让受力清晰地分散开，而且比曲线或角度复杂的设计更容易测量和搭建。",
      },
      {
        question: "怎样用冰棒棍做出一座桁架桥?",
        answer:
          "先搭建两侧相同的桁架结构，再用横向连接件把它们连起来，加上斜向支撑，等每个胶水接口完全干透后，再慢慢地在桥中央加重测试承重能力。",
      },
      {
        question: "为什么三角形结构能让桥更结实?",
        answer:
          "三角形不容易变形。这能让力量顺着冰棒棍传递出去，而不是让整个结构歪斜成一个不稳固的菱形。",
      },
      {
        question: "一座冰棒棍桥能承受多重的重量?",
        answer:
          "一座精心制作的桥往往能承受自身重量的好几倍，但具体结果取决于冰棒棍的质量、胶水接口、桥的跨度长度、晾干时间，以及加重的方式。",
      },
      {
        question: "怎样把这个活动变成科学展览或课堂项目?",
        answer:
          "保持桥的跨度、材料和测试方法不变，然后每次只改变一个设计变量，例如减少冰棒棍数量、增加支撑结构，或换一种不同的桁架图案，再进行比较。",
      },
    ],
    "lego-robot-builder": [
      {
        question: "LEGO SPIKE Prime的Super Cleanup机器人是什么?",
        answer:
          "Super Cleanup是LEGO Education SPIKE Prime的一个活动项目，学生在其中搭建并编程一个夹爪式机器人，让它能够抓取、移动和释放物品。",
      },
      {
        question: "这是适合新手的机器人项目吗?",
        answer:
          "是的。如果学生先搭建好底盘，在加上夹爪之前先测试电机和传感器，再把任务拆分成一个个小的编程步骤，这个项目就非常适合新手。",
      },
      {
        question: "搭建完机器人后，学生应该测试什么?",
        answer:
          "学生应该尝试抓取不同的物体，测试不同的夹爪形状、电机速度和释放位置，然后记录哪些设计选择能让清洁机器人工作得更稳定可靠。",
      },
      {
        question: "我一定需要官方的LEGO SPIKE Prime套装吗?",
        answer:
          "这份指南是基于LEGO Education SPIKE Prime套装#45678编写的，也可以使用配有主控、电机、轮子、梁、销和简单夹爪机构的类似LEGO机器人套装。",
      },
    ],
    "coke-mentos-experiment": [
      {
        question: "可乐曼妥思（Mentos）科学实验是什么?",
        answer:
          "可乐曼妥思科学实验是一个动手实验：把曼妥思糖放入一瓶汽水中会迅速喷出泡沫喷泉，学生可以把它变成一个真正的科学展览项目，设定假设、控制变量并进行测量。",
      },
      {
        question: "为什么曼妥思和汽水的反应会发生得这么快?",
        answer:
          "曼妥思糖表面有成千上万个微小的粗糙小坑。这些小坑给汽水中溶解的二氧化碳气泡提供了大量同时形成的位置，这个过程叫做成核作用，因此气体几乎瞬间就从汽水中逃出，把液体从瓶口推出来。",
      },
      {
        question: "做曼妥思可乐实验时，用健怡可乐还是普通可乐效果更好?",
        answer:
          "健怡可乐通常会产生更高的喷泉，因为它含糖更少、质地更稀薄，让二氧化碳气泡比在普通可乐中更容易上升和逸出。",
      },
      {
        question: "在家做可乐曼妥思实验安全吗?",
        answer:
          "只要在室外平地上进行，戴上护目镜，并且在曼妥思糖放入的那一刻所有人都立刻退后，就是安全的。千万不要把瓶口对着人，实验后也不要喝那瓶汽水。",
      },
      {
        question: "怎样把可乐曼妥思实验变成科学展览项目?",
        answer:
          "每次只测试一个变量，比如汽水种类、曼妥思的数量、汽水温度或瓶子大小，保持其他条件不变，然后把每次试验的喷泉高度记录在数据表中进行比较。",
      },
    ],
    "baking-soda-volcano": [
      {
        question: "做小苏打火山需要哪些家中常见的材料?",
        answer:
          "你需要小苏打、白醋、一个小塑料瓶或杯子，以及用来塑造火山形状的材料，比如橡皮泥或锡纸，另外还可以加入洗洁精和食用色素，让喷发的泡沫更多、颜色更丰富。",
      },
      {
        question: "孩子在家做小苏打火山安全吗?",
        answer:
          "是的。小苏打和白醋都是安全的食品级材料。要避免混合液接触眼睛，实验后记得洗手，如果使用食用色素，最好有大人帮忙，因为它可能会染到衣物和台面。",
      },
      {
        question: "小苏打火山里发生的化学反应是什么?",
        answer:
          "小苏打是一种碱，白醋是一种酸。它们混合后会发生反应，产生二氧化碳气体，正是这种气体形成了像岩浆一样从瓶子里喷出的泡泡泡沫。",
      },
      {
        question: "小苏打火山喷发后该怎么清理?",
        answer:
          "在托盘或浅盘上操作以接住泡沫，之后用水冲洗托盘、瓶子和火山材料。剩下的液体只是水、盐和溶解的小苏打混合而成的温和无毒液体，可以直接倒入下水道。",
      },
      {
        question: "小苏打火山实验能让孩子学到什么?",
        answer:
          "孩子可以亲眼看到真实的酸碱反应产生新气体，练习测量材料的用量，还可以把活动延伸成一个对照实验，通过改变小苏打或白醋的用量，比较每次喷发的大小有什么不同。",
      },
    ],
    "elephant-toothpaste-experiment": [
      {
        question: "象牙膏实验对孩子安全吗?",
        answer:
          "在大人监督下可以安全完成。过氧化氢应由大人来取用和倒出，所有人都应佩戴护目镜和手套。泡沫摸起来是温的，但完全沉淀后触摸是安全的。",
      },
      {
        question: "做象牙膏实验需要哪些材料?",
        answer:
          "你需要过氧化氢（6%或12%浓度，可在美容用品店购买）、干酵母、温水、洗洁精、食用色素、一个塑料瓶，以及一个用来接住泡沫的托盘。",
      },
      {
        question: "为什么象牙膏会这么快地冒出大量泡沫?",
        answer:
          "酵母起到催化剂的作用，让过氧化氢几乎瞬间分解成水和氧气，而不是缓慢分解。氧气被洗洁精包裹住，形成一座巨大的泡沫塔，同时这个反应还会释放出热量。",
      },
      {
        question: "象牙膏实验在化学方面教会了我们什么?",
        answer:
          "它展示了催化剂如何加快化学反应速度、气体如何被包裹形成泡沫，以及放热反应如何释放热量，学生稍后可以从温热的泡沫中亲身感受到这一点。",
      },
      {
        question: "怎样清理象牙膏的泡沫?",
        answer:
          "等泡沫冷却并沉淀后，用大量的水把泡沫和剩余液体冲入下水道即可。然后擦干净托盘和瓶子，并把手和用过的工具都洗干净。",
      },
      {
        question: "象牙膏实验可以在家做，还是只能在课堂上做?",
        answer:
          "两种场合都适合。在家可以选择在户外或浴缸里进行，方便清理，并由一名大人监督。在课堂上，老师负责操作过氧化氢、学生在安全距离外观察，这会是一个很棒的演示实验。",
      },
    ],
    "making-oobleck": [
      {
        question: "做史莱姆糊（oobleck）需要哪些材料?",
        answer:
          "Oobleck只需要两种材料：2杯玉米淀粉和1杯水，再加上可选的食用色素。把它们慢慢放进碗里搅拌，直到搅拌时感觉质地变得很奇怪。",
      },
      {
        question: "孩子触摸和玩oobleck安全吗?",
        answer:
          "是的。Oobleck是用食品级的玉米淀粉和水做成的，所以触摸和揉捏都是安全的。主要需要注意的是弄得到处都是，因为如果不放在托盘里，它会滴落并到处扩散。",
      },
      {
        question: "为什么oobleck又像固体又像液体?",
        answer:
          "Oobleck是一种非牛顿流体，意思是它的粘稠度会随着受到的压力而改变。快速地打或捏会让玉米淀粉颗粒紧紧锁在一起，感觉像固体；而轻轻施压时，颗粒可以相互滑动，让它像液体一样流动。",
      },
      {
        question: "做oobleck能让孩子学到什么科学知识?",
        answer:
          "它让孩子了解到，不是所有液体在受压时的表现都一样，这种特性叫做剪切增稠。孩子还可以把这和实际的工程应用联系起来，比如用于防弹衣或填补坑洞的材料。",
      },
      {
        question: "怎样清理oobleck才不会堵塞下水道?",
        answer:
          "千万不要把oobleck冲进水槽，因为玉米淀粉会在管道里积聚堵塞。应该让剩下的oobleck在托盘里完全晾干，然后把干燥后的碎块刮进垃圾桶，再清洗碗和双手。",
      },
      {
        question: "做oobleck适合在家还是在课堂上进行?",
        answer:
          "两者都很适合。大约只需要20分钟，用的材料大多数厨房里都有，无论是作为家庭科学小活动，还是作为课堂上探索非牛顿流体的活动站，都效果很好。",
      },
    ],
  },
}

const howToEligibleSlugs = new Set([
  "popsicle-stick-bridge",
  "baking-soda-volcano",
  "lemon-powered-batteries",
  "balloon-powered-car",
  "rubber-band-powered-car",
  "simple-circuit-light",
  "my-first-python-program",
  "lego-robot-builder",
  "coke-mentos-experiment",
  "elephant-toothpaste-experiment",
  "making-oobleck",
])

function getTotalTime(time: string) {
  const normalized = time.toLowerCase()
  if (normalized.includes("20 minutes")) return "PT20M"
  if (normalized.includes("30 minutes")) return "PT30M"
  if (normalized.includes("45-60 minutes")) return "PT1H"
  if (normalized.includes("1 hour")) return "PT1H"
  if (normalized.includes("1-2 hours")) return "PT2H"
  if (normalized.includes("2-3 hours")) return "PT3H"
  return undefined
}

function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  return encodeURI(`${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`)
}

function getTools(project: ProjectGuide) {
  return project.materials
    .filter((material) =>
      /\b(gun|scissors|cutters|ruler|marker|keyboard|computer|tablet|app|editor|voltmeter)\b/i.test(
        material,
      ),
    )
    .map((material) => ({
      "@type": "HowToTool",
      name: material,
    }))
}

export function getProjectHowToJsonLd(slug: string, language: Language = "en") {
  if (!howToEligibleSlugs.has(slug)) return null

  const project = getProjectGuide(slug, language)
  if (!project || project.steps.length === 0 || project.materials.length === 0) return null

  const tools = getTools(project)
  const totalTime = getTotalTime(project.time)

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: project.title,
    description: project.description,
    mainEntityOfPage: `${siteConfig.url}/projects/${slug}`,
    image: [absoluteUrl(project.image)],
    url: `${siteConfig.url}/projects/${slug}`,
    ...(totalTime ? { totalTime } : {}),
    supply: project.materials.map((material) => ({
      "@type": "HowToSupply",
      name: material,
    })),
    ...(tools.length > 0 ? { tool: tools } : {}),
    step: project.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step,
      name: step,
    })),
  }
}

/**
 * Builds FAQPage JSON-LD for a project. If the requested language has no FAQ
 * entries for this slug (translation not yet written), falls back to the
 * English entries so the page still ships valid FAQ structured data; returns
 * null only if no English entries exist either.
 */
export function getProjectFaqJsonLd(slug: string, language: Language = "en") {
  const faqs = projectFaqs[language]?.[slug] ?? projectFaqs.en[slug]
  if (!faqs || faqs.length === 0) return null

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function getProjectBreadcrumbJsonLd(slug: string, language: Language = "en") {
  const project = getProjectGuide(slug, language)
  if (!project) return null

  const t = translations[language]

  return getBreadcrumbJsonLd(
    [
      { name: t.nav.home, path: "/" },
      { name: t.nav.projects, path: "/projects" },
      { name: project.title, path: `/projects/${slug}` },
    ],
    language,
  )
}

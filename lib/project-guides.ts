import type { Language } from "@/lib/translations"

export type ProjectCategoryKey = "engineering" | "science" | "coding" | "robotics"

export type ProjectGuide = {
  slug: string
  title: string
  category: string
  categoryKey: ProjectCategoryKey
  difficulty: string
  time: string
  image: string
  description: string
  introduction: string[]
  why: string
  materials: string[]
  steps: string[]
  safety: string
  challenge: string
}

const localizedProjectGuides: Record<Language, ProjectGuide[]> = {
  en: [
    {
      slug: "popsicle-stick-bridge",
      title: "Popsicle Stick Bridge",
      category: "Engineering",
      categoryKey: "engineering",
      difficulty: "Easy",
      time: "1-2 hours",
      image: "/images/trussbridge.jpg",
      description:
        "Build a real truss bridge from popsicle sticks, then watch how triangles guide compression and tension during your load test.",
      introduction: [
        "Bridge engineers do not just glue random pieces together. They design structures that guide forces through a smart pattern of strong shapes.",
        "This project is exciting because your popsicle sticks turn into a real truss bridge with named parts, force paths, and a load test at the end.",
      ],
      why:
        "A truss bridge spreads force through triangles. The top chord often gets squeezed in compression, the bottom chord gets pulled in tension, and the diagonal web members help move the load across the whole structure.",
      materials: [
        "60 or more popsicle sticks",
        "Hot glue gun and glue sticks",
        "A ruler",
        "A marker or pen",
        "Scissors or sturdy craft cutters",
        "Two sturdy supports for testing, like chairs or tables",
        "Weights for testing, like books or gym plates",
      ],
      steps: [
        "Mark about 16 sticks at the quarter points so your joints line up neatly.",
        "Cut 4 of those sticks in half and use them to splice whole sticks into 2 long rails.",
        "Build the first side truss with 4 triangles, then add 3 more staggered triangles between them.",
        "Flip the truss, glue on the top rail, and sandwich the triangles with another layer of sticks.",
        "Repeat the same layout to build a second matching side truss.",
        "Let both sides harden, then connect them with cross pieces while keeping the bridge square.",
        "Add diagonal braces, let the glue set again, and test the bridge slowly between two supports.",
      ],
      safety:
        "Ask an adult for help with the hot glue gun and when cutting sticks. Fresh glue and the glue tip get very hot, and testing should happen slowly so weights or feet do not slip off the bridge.",
      challenge:
        "Try keeping the same truss pattern but using fewer sticks, then compare how much weight the lighter bridge can still hold.",
    },
    {
      slug: "lego-robot-builder",
      title: "LEGO Grabber Robot",
      category: "Robotics",
      categoryKey: "robotics",
      difficulty: "Medium",
      time: "2-3 hours",
      image: "/images/lego robotics.jpeg",
      description:
        "Build a source-backed grabber robot inspired by LEGO Education's SPIKE Prime Super Cleanup lesson and test how well it picks up different objects.",
      introduction: [
        "This project is not just any robot. You are building a grabber-style cleanup machine inspired by a real LEGO Education lesson used to teach robotics thinking.",
        "That makes it extra cool because you are not guessing what a robot could look like. You are following a proven build idea and learning why each part is there.",
      ],
      why:
        "A grabber robot mixes mechanics and programming. The base must stay balanced, the motor must transfer motion into the claw, and the code must tell the machine when to drive, grab, and release.",
      materials: [
        "LEGO Education SPIKE Prime set #45678 or a similar LEGO robotics kit",
        "SPIKE Prime hub",
        "1 large angular motor",
        "1 force sensor",
        "Technic beams, pins, axles, and wheels",
        "Small test objects like crumpled paper, an apple or ball, and a block",
      ],
      steps: [
        "Open the official Super Cleanup lesson and the build books before you begin.",
        "Sort the hub, motor, sensor, wheels, beams, pins, and axles into easy-to-see groups.",
        "Build the wide rolling base first so the robot stays balanced.",
        "Add the front tower and grabber arm support.",
        "Mount the motor, sensor, and front jaws so the robot can grip objects.",
        "Load a simple cleanup routine that tells the robot to grab, move, and release.",
        "Run fair tests with different objects and compare what works best.",
      ],
      safety:
        "Keep tiny LEGO parts away from little brothers, sisters, and pets because they can be a choking hazard. Ask an adult for help charging the hub, connecting cables, and handling any battery-related parts safely.",
      challenge:
        "Compare two different grabber jaw shapes and record which one works better on round, squishy, or rigid objects.",
    },
    {
      slug: "coke-mentos-experiment",
      title: "Coke & Mentos Experiment",
      category: "Science",
      categoryKey: "science",
      difficulty: "Easy",
      time: "30 minutes",
      image: "/images/coke.jpg",
      description:
        "Launch a fizzy soda fountain outdoors and learn why tiny candy surfaces make gas rush out fast.",
      introduction: [
        "Get ready for a sky-high splash because this experiment can make soda shoot up like a rocket fountain.",
        "It is exciting to watch, and it also teaches you a real science idea that looks almost like magic.",
      ],
      why:
        "Soda has carbon dioxide gas dissolved inside it. Mentos candies have lots of tiny bumps that give the gas many places to escape at once, a process called nucleation, so the soda rushes out fast. Diet Coke usually works better than regular Coke because it has less sugar and is not as thick, so the bubbles can race upward more easily and make a taller geyser.",
      materials: [
        "1 two-liter bottle of Diet Coke or other soda",
        "1 roll of Mentos",
        "An open outdoor space",
        "Safety goggles",
        "A piece of paper or an index card",
        "Optional: a tube or paper roll to help drop the Mentos together",
      ],
      steps: [
        "Go outside to an open area like a driveway or yard and put on safety goggles.",
        "Set the soda bottle on flat ground where it will not tip over.",
        "Open the bottle and get your Mentos ready as quickly as you can.",
        "Stack 5 or 6 Mentos in a paper tube or hold them above the bottle opening with an index card under them.",
        "Pull the card away so all the Mentos drop in at the same time.",
        "Step back right away and watch the soda fountain blast upward.",
        "Talk about what happened and measure which soda or number of Mentos made the biggest geyser.",
      ],
      safety:
        "Do this experiment only outside and stand back as soon as the Mentos drop in. Never point the bottle at people, and do not drink the soda after the experiment.",
      challenge:
        "Test two different sodas and compare which one makes the taller fountain.",
    },
    {
      slug: "my-first-python-program",
      title: "My First Python Program",
      category: "Coding",
      categoryKey: "coding",
      difficulty: "Easy",
      time: "1 hour",
      image: "/images/pythoncode.jpeg",
      description:
        "Write a simple quiz game and see how code can turn your ideas into something interactive.",
      introduction: [
        "Coding is like giving super-clear instructions to a computer so it can do something amazing for you.",
        "This project is fun because you will create a real program that asks questions, keeps score, and talks back to the player.",
      ],
      why:
        "Computer programs follow instructions one step at a time. Python uses commands like `print()` to show messages, `input()` to collect answers, and variables to remember information such as a score.",
      materials: [
        "A computer or tablet with internet access",
        "A Python website or app, like Replit or Trinket",
        "Paper to plan your questions",
        "A keyboard",
        "Curiosity and patience",
      ],
      steps: [
        "Open a beginner-friendly Python editor online and start a new project.",
        "Type a `print()` line to welcome the player to your quiz game.",
        "Make a score variable and set it to 0 so your game can count points.",
        "Use `input()` to ask the player a question and store the answer in a variable.",
        "Add an `if` statement to check whether the answer is correct.",
        "Increase the score when the player gets a question right, then show the new score with `print()`.",
        "Run your program, test it, and fix any mistakes until your quiz works smoothly.",
      ],
      safety:
        "Only use trusted coding websites and ask an adult before making accounts online. Do not share your real name, address, or passwords inside your program or in chat boxes.",
      challenge:
        "Add three questions instead of one and make your game print a special message if the player gets a perfect score.",
    },
    {
      slug: "baking-soda-volcano",
      title: "Baking Soda Volcano",
      category: "Science",
      categoryKey: "science",
      difficulty: "Easy",
      time: "1 hour",
      image: "/images/bsvolcano.jpg",
      description:
        "Build a mini volcano and trigger a bubbly eruption with a classic acid-and-base reaction.",
      introduction: [
        "Volcanoes are some of the most dramatic natural wonders on Earth, and now you can build one on your own table.",
        "This project is exciting because you get to mix ingredients, create an eruption, and watch chemistry in action.",
      ],
      why:
        "Baking soda is a base and vinegar is an acid. When they mix, they make a new gas called carbon dioxide, and that gas creates bubbling foam that pours out like an erupting volcano.",
      materials: [
        "Baking soda",
        "Vinegar",
        "A small plastic bottle or cup",
        "Play dough, clay, or aluminum foil",
        "Dish soap",
        "Food coloring",
        "A tray or pan for easy cleanup",
      ],
      steps: [
        "Place your bottle in the middle of a tray so your mess stays in one spot.",
        "Build a volcano shape around the bottle with clay, play dough, or foil, but keep the bottle opening clear.",
        "Put 2 or 3 spoonfuls of baking soda into the bottle.",
        "Add a squirt of dish soap and a few drops of food coloring.",
        "Pour vinegar into the bottle and watch the foamy lava rise up and spill over.",
        "Observe the bubbles closely and talk about the gas being made inside the bottle.",
        "Rinse the tray and try again with different amounts to see how the eruption changes.",
      ],
      safety:
        "Keep the mixture away from your eyes and wash your hands after the experiment. Ask an adult before using food coloring because it can stain clothes and tables.",
      challenge:
        "Try changing the amount of baking soda or vinegar and see which recipe makes the biggest eruption.",
    },
    {
      slug: "simple-circuit-light",
      title: "Simple Circuit Light",
      category: "Engineering",
      categoryKey: "engineering",
      difficulty: "Medium",
      time: "1-2 hours",
      image: "/images/circuit.jpg",
      description:
        "Make a tiny light turn on by building a complete path for electricity to travel through.",
      introduction: [
        "Flipping on a light feels ordinary, but inside that tiny click is a big science idea called electricity.",
        "This project is awesome because you will build your own working circuit and watch a real bulb light up from your design.",
      ],
      why:
        "Electricity needs a complete loop, called a circuit, to move from one end of the battery to the other. When the path is closed, energy can travel through the wires and power the LED light.",
      materials: [
        "1 LED light",
        "1 battery pack or 9V battery",
        "2 or 3 insulated wires",
        "Electrical tape",
        "A small switch, paper clip, or binder clip",
        "Optional: adult help with a resistor or battery holder",
      ],
      steps: [
        "Look at your battery, wires, and LED and find the two ends where electricity will enter and leave.",
        "Connect one wire from the positive side of the battery to the long leg of the LED.",
        "Connect a second wire from the short leg of the LED back to the negative side of the battery.",
        "Tape the connections gently so the wires stay in place.",
        "If the LED does not light, flip the LED around because LEDs only work in one direction.",
        "Add a simple switch in one part of the circuit so you can open and close the path.",
        "Test the switch and watch your circuit turn the light on and off.",
      ],
      safety:
        "Use only small batteries for this project and never plug your circuit into a wall outlet. Ask an adult for help checking the battery, LED direction, and any resistor parts before you connect everything.",
      challenge:
        "Build a second light into the circuit and compare what happens when you place it in a different spot.",
    },
  ],
  es: [
    {
      slug: "popsicle-stick-bridge",
      title: "Puente de Palitos de Helado",
      category: "Ingenieria",
      categoryKey: "engineering",
      difficulty: "Facil",
      time: "1-2 horas",
      image: "/images/trussbridge.jpg",
      description:
        "Construye un puente de celosia con palitos de helado y observa como los triangulos guian la compresion y la tension durante tu prueba de carga.",
      introduction: [
        "Los ingenieros de puentes no pegan piezas al azar. Disenan estructuras que guian las fuerzas con un patron inteligente de formas fuertes.",
        "Este proyecto es emocionante porque tus palitos de helado se convierten en un puente real con partes, caminos de fuerza y una prueba de carga al final.",
      ],
      why:
        "Un puente de celosia reparte la fuerza a traves de triangulos. La cuerda superior suele comprimirse, la cuerda inferior suele estar en tension y las piezas diagonales ayudan a mover la carga por toda la estructura.",
      materials: [
        "60 o mas palitos de helado",
        "Pistola de silicona caliente y barras de pegamento",
        "Una regla",
        "Un marcador o boligrafo",
        "Tijeras o cortadores resistentes",
        "Dos soportes firmes para la prueba, como sillas o mesas",
        "Pesos para probar, como libros o discos de gimnasio",
      ],
      steps: [
        "Marca unos 16 palitos en los cuartos para que las uniones queden alineadas.",
        "Corta 4 de esos palitos por la mitad y usalos para empalmar palitos completos en 2 rieles largos.",
        "Construye la primera cercha lateral con 4 triangulos y luego agrega otros 3 triangulos escalonados entre ellos.",
        "Voltea la cercha, pega el riel superior y refuerza los triangulos con otra capa de palitos.",
        "Repite el mismo patron para hacer una segunda cercha lateral igual.",
        "Deja que ambos lados se endurezcan y luego conectalos con piezas transversales manteniendo el puente cuadrado.",
        "Agrega refuerzos diagonales, deja que el pegamento se asiente y prueba el puente lentamente entre dos soportes.",
      ],
      safety:
        "Pide ayuda a un adulto con la pistola de silicona y al cortar los palitos. El pegamento fresco y la punta se ponen muy calientes, y la prueba debe hacerse despacio para que los pesos o los pies no se resbalen.",
      challenge:
        "Intenta mantener el mismo patron de cercha usando menos palitos y luego compara cuanto peso puede sostener el puente mas ligero.",
    },
    {
      slug: "lego-robot-builder",
      title: "Robot LEGO con Garra",
      category: "Robotica",
      categoryKey: "robotics",
      difficulty: "Medio",
      time: "2-3 horas",
      image: "/images/lego robotics.jpeg",
      description:
        "Construye un robot con garra inspirado en la leccion Super Cleanup de LEGO Education y prueba que tan bien recoge distintos objetos.",
      introduction: [
        "Este no es cualquier robot. Estas construyendo una maquina de limpieza con garra inspirada en una leccion real de LEGO Education usada para ensenar pensamiento robotico.",
        "Eso lo hace aun mas genial porque no estas adivinando como podria verse un robot. Estas siguiendo una idea comprobada y aprendiendo por que cada parte esta ahi.",
      ],
      why:
        "Un robot con garra combina mecanica y programacion. La base debe mantenerse equilibrada, el motor debe transferir movimiento a la garra y el codigo debe decirle a la maquina cuando avanzar, agarrar y soltar.",
      materials: [
        "Set LEGO Education SPIKE Prime #45678 o un kit similar de robotica LEGO",
        "Hub SPIKE Prime",
        "1 motor angular grande",
        "1 sensor de fuerza",
        "Vigas Technic, pines, ejes y ruedas",
        "Objetos pequenos para probar, como papel arrugado, una manzana o pelota y un bloque",
      ],
      steps: [
        "Abre la leccion oficial Super Cleanup y los libros de construccion antes de comenzar.",
        "Organiza el hub, motor, sensor, ruedas, vigas, pines y ejes en grupos faciles de ver.",
        "Construye primero la base ancha con ruedas para que el robot se mantenga equilibrado.",
        "Agrega la torre delantera y el soporte del brazo con garra.",
        "Monta el motor, el sensor y las pinzas delanteras para que el robot pueda sujetar objetos.",
        "Carga una rutina simple de limpieza que le diga al robot que agarre, se mueva y suelte.",
        "Haz pruebas justas con diferentes objetos y compara lo que funciona mejor.",
      ],
      safety:
        "Manten las piezas pequenas de LEGO lejos de hermanos pequenos y mascotas porque pueden provocar asfixia. Pide ayuda a un adulto para cargar el hub, conectar cables y manejar las partes relacionadas con la bateria.",
      challenge:
        "Compara dos formas diferentes de garras y anota cual funciona mejor con objetos redondos, blandos o rigidos.",
    },
    {
      slug: "coke-mentos-experiment",
      title: "Experimento de Coca-Cola y Mentos",
      category: "Ciencia",
      categoryKey: "science",
      difficulty: "Facil",
      time: "30 minutos",
      image: "/images/coke.jpg",
      description:
        "Lanza una fuente de soda al aire libre y aprende por que la superficie de los caramelos hace que el gas escape rapidamente.",
      introduction: [
        "Preparate para una salpicadura enorme porque este experimento puede hacer que la soda salga disparada como una fuente cohete.",
        "Es emocionante de ver y tambien ensena una idea cientifica real que casi parece magia.",
      ],
      why:
        "La soda tiene gas de dioxido de carbono disuelto. Los Mentos tienen muchas pequenas irregularidades que le dan al gas muchos lugares para escapar al mismo tiempo, un proceso llamado nucleacion, por eso la soda sale tan rapido. La Diet Coke suele funcionar mejor que la Coca-Cola regular porque tiene menos azucar y es menos espesa, asi que las burbujas pueden subir mas facilmente y formar un geiser mas alto.",
      materials: [
        "1 botella de dos litros de Diet Coke u otra soda",
        "1 paquete de Mentos",
        "Un espacio abierto al aire libre",
        "Gafas de seguridad",
        "Una hoja de papel o una ficha",
        "Opcional: un tubo o rollo de papel para dejar caer los Mentos juntos",
      ],
      steps: [
        "Ve afuera a un area abierta como una entrada o patio y ponte las gafas de seguridad.",
        "Coloca la botella de soda en un piso plano donde no se caiga.",
        "Abre la botella y prepara tus Mentos lo mas rapido que puedas.",
        "Apila 5 o 6 Mentos en un tubo de papel o sostenlos sobre la abertura con una ficha debajo.",
        "Quita la ficha para que todos los Mentos caigan al mismo tiempo.",
        "Retrocede de inmediato y observa como la fuente de soda sale disparada hacia arriba.",
        "Habla sobre lo que paso y mide que soda o que numero de Mentos produjo el geiser mas grande.",
      ],
      safety:
        "Haz este experimento solo afuera y retrocede en cuanto caigan los Mentos. Nunca apuntes la botella hacia personas y no bebas la soda despues del experimento.",
      challenge:
        "Prueba dos sodas diferentes y compara cual produce la fuente mas alta.",
    },
    {
      slug: "my-first-python-program",
      title: "Mi Primer Programa en Python",
      category: "Programacion",
      categoryKey: "coding",
      difficulty: "Facil",
      time: "1 hora",
      image: "/images/pythoncode.jpeg",
      description:
        "Escribe un juego de preguntas sencillo y descubre como el codigo puede convertir tus ideas en algo interactivo.",
      introduction: [
        "Programar es como darle instrucciones super claras a una computadora para que haga algo increible por ti.",
        "Este proyecto es divertido porque crearas un programa real que hace preguntas, guarda puntajes y responde al jugador.",
      ],
      why:
        "Los programas siguen instrucciones paso a paso. Python usa comandos como `print()` para mostrar mensajes, `input()` para recibir respuestas y variables para recordar informacion como un puntaje.",
      materials: [
        "Una computadora o tableta con acceso a internet",
        "Una pagina o app de Python, como Replit o Trinket",
        "Papel para planear tus preguntas",
        "Un teclado",
        "Curiosidad y paciencia",
      ],
      steps: [
        "Abre un editor de Python para principiantes en linea y comienza un proyecto nuevo.",
        "Escribe una linea con `print()` para darle la bienvenida al jugador.",
        "Crea una variable llamada score y ponla en 0 para contar los puntos.",
        "Usa `input()` para hacer una pregunta y guardar la respuesta en una variable.",
        "Agrega una sentencia `if` para comprobar si la respuesta es correcta.",
        "Aumenta el puntaje cuando el jugador acierte y muestra el nuevo valor con `print()`.",
        "Ejecuta tu programa, pruebalo y corrige errores hasta que funcione bien.",
      ],
      safety:
        "Usa solo sitios de programacion confiables y pide permiso a un adulto antes de crear cuentas. No compartas tu nombre real, direccion ni contrasenas dentro del programa o en chats.",
      challenge:
        "Agrega tres preguntas en lugar de una y haz que tu juego muestre un mensaje especial si el jugador obtiene una puntuacion perfecta.",
    },
    {
      slug: "baking-soda-volcano",
      title: "Volcan de Bicarbonato",
      category: "Ciencia",
      categoryKey: "science",
      difficulty: "Facil",
      time: "1 hora",
      image: "/images/bsvolcano.jpg",
      description:
        "Construye un mini volcan y provoca una erupcion espumosa con una reaccion clasica entre acido y base.",
      introduction: [
        "Los volcanes son algunas de las maravillas naturales mas dramaticas de la Tierra, y ahora puedes construir uno en tu propia mesa.",
        "Este proyecto es emocionante porque mezclas ingredientes, creas una erupcion y observas la quimica en accion.",
      ],
      why:
        "El bicarbonato es una base y el vinagre es un acido. Cuando se mezclan, producen un gas nuevo llamado dioxido de carbono, y ese gas crea espuma burbujeante que sale como si fuera lava.",
      materials: [
        "Bicarbonato de sodio",
        "Vinagre",
        "Una botella o vaso pequeno de plastico",
        "Masa moldeable, arcilla o papel aluminio",
        "Jabon para platos",
        "Colorante de comida",
        "Una bandeja para limpiar facilmente",
      ],
      steps: [
        "Coloca tu botella en el centro de una bandeja para que el desorden quede en un solo lugar.",
        "Construye la forma del volcan alrededor de la botella con arcilla, masa o papel aluminio, pero deja libre la abertura.",
        "Pon 2 o 3 cucharadas de bicarbonato dentro de la botella.",
        "Agrega un chorrito de jabon y unas gotas de colorante.",
        "Vierte vinagre en la botella y observa como la lava espumosa sube y se derrama.",
        "Mira las burbujas de cerca y habla sobre el gas que se esta formando dentro de la botella.",
        "Enjuaga la bandeja y vuelve a intentarlo con cantidades diferentes para ver como cambia la erupcion.",
      ],
      safety:
        "Manten la mezcla lejos de tus ojos y lavate las manos despues del experimento. Pide ayuda a un adulto antes de usar colorante porque puede manchar ropa y mesas.",
      challenge:
        "Prueba cambiando la cantidad de bicarbonato o vinagre y descubre que receta produce la erupcion mas grande.",
    },
    {
      slug: "simple-circuit-light",
      title: "Luz de Circuito Simple",
      category: "Ingenieria",
      categoryKey: "engineering",
      difficulty: "Medio",
      time: "1-2 horas",
      image: "/images/circuit.jpg",
      description:
        "Enciende una pequena luz construyendo un camino completo para que la electricidad viaje por el circuito.",
      introduction: [
        "Encender una luz parece algo normal, pero dentro de ese pequeno clic hay una gran idea cientifica llamada electricidad.",
        "Este proyecto es genial porque construiras tu propio circuito funcional y veras una luz real encenderse gracias a tu diseno.",
      ],
      why:
        "La electricidad necesita un lazo completo, llamado circuito, para moverse de un extremo de la bateria al otro. Cuando el camino se cierra, la energia puede viajar por los cables y alimentar la luz LED.",
      materials: [
        "1 luz LED",
        "1 portapilas o bateria de 9V",
        "2 o 3 cables aislados",
        "Cinta electrica",
        "Un interruptor pequeno, clip o broche",
        "Opcional: ayuda de un adulto con una resistencia o portabateria",
      ],
      steps: [
        "Observa tu bateria, cables y LED y encuentra los dos extremos por donde entrara y saldra la electricidad.",
        "Conecta un cable desde el lado positivo de la bateria hasta la pata larga del LED.",
        "Conecta un segundo cable desde la pata corta del LED hasta el lado negativo de la bateria.",
        "Pega las conexiones con cuidado para que los cables no se muevan.",
        "Si el LED no enciende, voltealo porque los LED solo funcionan en una direccion.",
        "Agrega un interruptor sencillo en una parte del circuito para abrir y cerrar el camino.",
        "Prueba el interruptor y observa como tu circuito enciende y apaga la luz.",
      ],
      safety:
        "Usa solo baterias pequenas para este proyecto y nunca conectes tu circuito a un enchufe de pared. Pide ayuda a un adulto para revisar la bateria, la direccion del LED y cualquier resistencia antes de conectar todo.",
      challenge:
        "Construye una segunda luz en el circuito y compara que pasa cuando la colocas en otro lugar.",
    },
  ],
  zh: [
    {
      slug: "popsicle-stick-bridge",
      title: "冰棒棍桥",
      category: "工程",
      categoryKey: "engineering",
      difficulty: "简单",
      time: "1-2小时",
      image: "/images/trussbridge.jpg",
      description:
        "用冰棒棍搭建一座真正的桁架桥，观察三角形如何在承重测试中引导压缩力和拉力。",
      introduction: [
        "桥梁工程师不会随便把材料粘在一起。他们会用坚固的形状设计结构，让力量沿着清晰的路径传递。",
        "这个项目很有趣，因为你的冰棒棍会变成一座真正的桁架桥，拥有真实的部件名称、受力路径和最后的承重测试。",
      ],
      why:
        "桁架桥通过三角形来分散力量。上弦杆通常承受压缩，下弦杆通常承受拉力，而斜向构件会把重量传到整个结构中。",
      materials: [
        "60根或更多冰棒棍",
        "热熔胶枪和胶棒",
        "一把尺子",
        "记号笔或圆珠笔",
        "剪刀或结实的手工剪",
        "两个结实的测试支撑物，比如椅子或桌子",
        "测试重量，比如书本或健身杠铃片",
      ],
      steps: [
        "先在大约16根冰棒棍的四分之一位置做记号，让接缝更整齐。",
        "把其中4根剪成两半，用来把整根冰棒棍拼接成2条长梁。",
        "先搭出第一侧桁架，做4个三角形，再在中间补上3个错开的三角形。",
        "把桁架翻面，粘上顶部横梁，再加一层冰棒棍增强刚度。",
        "按同样的样式再做第二个一模一样的侧桁架。",
        "等两侧变硬后，用横向连接件把它们连起来，并保持桥身方正。",
        "加上斜撑，等胶水固定，再把桥放在两个支撑物之间慢慢测试。",
      ],
      safety:
        "使用热熔胶枪和剪切冰棒棍时请让大人帮忙。刚挤出的胶和胶枪头都很烫，测试时也要慢慢加重，避免重物或脚滑下来。",
      challenge:
        "试着保持同样的桁架结构，但减少冰棒棍数量，再比较更轻的桥还能承受多少重量。",
    },
    {
      slug: "lego-robot-builder",
      title: "乐高抓取机器人",
      category: "机器人",
      categoryKey: "robotics",
      difficulty: "中等",
      time: "2-3小时",
      image: "/images/lego robotics.jpeg",
      description:
        "参考 LEGO Education 的 Super Cleanup 课程搭建一个抓取机器人，并测试它抓取不同物体的效果。",
      introduction: [
        "这不只是普通机器人。你要搭建的是一台受真实 LEGO Education 课程启发的抓取清理机器人。",
        "这让它更酷，因为你不是随便猜机器人该长什么样，而是在跟随一个经过验证的设计，并理解每个部件为什么存在。",
      ],
      why:
        "抓取机器人把机械结构和编程结合在一起。底盘要保持平衡，电机要把运动传到夹爪，代码还要告诉机器人什么时候前进、抓取和释放。",
      materials: [
        "LEGO Education SPIKE Prime 套装 #45678 或类似的乐高机器人套件",
        "SPIKE Prime 主控",
        "1个大角电机",
        "1个力传感器",
        "Technic 梁、销、轴和轮子",
        "用于测试的小物体，比如纸团、苹果或球、积木块",
      ],
      steps: [
        "开始前先打开官方 Super Cleanup 课程和搭建手册。",
        "把主控、电机、传感器、轮子、梁、销和轴分类摆好。",
        "先搭建宽底盘，让机器人更稳定。",
        "加上前方立柱和夹爪支架。",
        "安装电机、传感器和前夹爪，让机器人能够抓住物体。",
        "加载一个简单的清理程序，让机器人执行抓取、移动和释放。",
        "用不同物体做公平测试，并比较哪种效果最好。",
      ],
      safety:
        "小乐高零件要远离年幼的弟弟妹妹和宠物，以免误吞。给主控充电、连接线缆和处理电池相关部件时，请让大人帮忙。",
      challenge:
        "比较两种不同形状的夹爪，并记录它们对圆形、柔软或坚硬物体的表现。",
    },
    {
      slug: "coke-mentos-experiment",
      title: "可乐曼妥思实验",
      category: "科学",
      categoryKey: "science",
      difficulty: "简单",
      time: "30分钟",
      image: "/images/coke.jpg",
      description:
        "在户外制造一股喷泉，了解为什么糖果表面的微小结构会让气体迅速释放。",
      introduction: [
        "准备迎接高高喷起的水柱吧，因为这个实验能让汽水像火箭喷泉一样冲上天空。",
        "它看起来很神奇，也能教你一个真正的科学概念。",
      ],
      why:
        "汽水里溶解了二氧化碳气体。曼妥思表面有很多细小凹凸，给气体提供了大量同时逃出的地方，这个过程叫成核，所以汽水会一下子冲出来。健怡可乐通常比普通可乐效果更好，因为它含糖更少、液体也没有那么黏，气泡更容易快速向上冲，形成更高的喷泉。",
      materials: [
        "1瓶两升装健怡可乐或其他汽水",
        "1卷曼妥思",
        "一个开阔的户外空间",
        "护目镜",
        "一张纸或索引卡",
        "可选：一个纸筒，帮助同时放下所有曼妥思",
      ],
      steps: [
        "到车道或院子这样的空旷户外区域，并戴上护目镜。",
        "把汽水瓶放在平坦地面上，确保不会倒下。",
        "打开瓶盖，并尽快准备好曼妥思。",
        "把5到6颗曼妥思叠在纸筒里，或用一张卡片托在瓶口上方。",
        "抽走卡片，让所有曼妥思同时掉进去。",
        "立刻后退，观察汽水喷泉冲向空中。",
        "讨论刚才发生了什么，并测量哪种汽水或多少颗曼妥思能喷得最高。",
      ],
      safety:
        "这个实验只能在户外做，曼妥思掉进去后要立刻后退。不要把瓶子对着人，也不要在实验后饮用汽水。",
      challenge:
        "测试两种不同的汽水，比较哪一种能喷得更高。",
    },
    {
      slug: "my-first-python-program",
      title: "我的第一个 Python 程序",
      category: "编程",
      categoryKey: "coding",
      difficulty: "简单",
      time: "1小时",
      image: "/images/pythoncode.jpeg",
      description:
        "写一个简单的问答小游戏，看看代码怎样把你的想法变成可以互动的作品。",
      introduction: [
        "编程就像给电脑一组非常清楚的指令，让它替你完成很棒的事情。",
        "这个项目很好玩，因为你会做出一个真正的程序，它会提问、记分，还会对玩家做出回应。",
      ],
      why:
        "计算机程序会一步一步执行指令。Python 用 `print()` 显示信息，用 `input()` 收集答案，用变量记住分数这样的信息。",
      materials: [
        "一台可以上网的电脑或平板",
        "一个 Python 网站或应用，比如 Replit 或 Trinket",
        "用来规划问题的纸张",
        "键盘",
        "好奇心和耐心",
      ],
      steps: [
        "打开一个适合初学者的在线 Python 编辑器，并新建项目。",
        "输入一行 `print()`，欢迎玩家来到你的问答游戏。",
        "创建一个名为 score 的变量，并把它设为 0 来记录分数。",
        "使用 `input()` 提出问题，并把答案存进变量里。",
        "加入一个 `if` 语句来检查答案是否正确。",
        "答对时增加分数，再用 `print()` 显示新的分数。",
        "运行程序，反复测试并修正错误，直到游戏顺畅运行。",
      ],
      safety:
        "只使用可信的编程网站，并在注册账号前先征求大人同意。不要在程序或聊天框里分享真实姓名、住址或密码。",
      challenge:
        "把问题从1个增加到3个，如果玩家全对，就让程序打印一条特别的信息。",
    },
    {
      slug: "baking-soda-volcano",
      title: "小苏打火山",
      category: "科学",
      categoryKey: "science",
      difficulty: "简单",
      time: "1小时",
      image: "/images/bsvolcano.jpg",
      description:
        "搭建一座迷你火山，用经典的酸碱反应制造充满泡沫的喷发。",
      introduction: [
        "火山是地球上最壮观的自然景象之一，现在你也可以在桌面上做出一座。",
        "这个项目很有趣，因为你会混合材料、制造喷发，并亲眼看到化学在发生。",
      ],
      why:
        "小苏打是碱，醋是酸。它们混合后会产生一种叫二氧化碳的新气体，这种气体会制造大量泡沫，像火山熔岩一样涌出来。",
      materials: [
        "小苏打",
        "醋",
        "一个小塑料瓶或杯子",
        "橡皮泥、黏土或铝箔",
        "洗洁精",
        "食用色素",
        "一个托盘，方便清理",
      ],
      steps: [
        "把瓶子放在托盘中央，这样喷发时的液体都能留在一个地方。",
        "用黏土、橡皮泥或铝箔围着瓶子做出火山外形，但要留出瓶口。",
        "往瓶子里加入2到3勺小苏打。",
        "加入一点洗洁精和几滴食用色素。",
        "把醋倒进瓶子里，观察泡沫熔岩升起并流出来。",
        "仔细观察气泡，并讨论瓶子里正在产生的气体。",
        "冲洗托盘后再试一次，改变材料用量，看看喷发会怎样变化。",
      ],
      safety:
        "不要让混合液碰到眼睛，实验后要洗手。使用食用色素前请先问大人，因为它可能会弄脏衣服和桌面。",
      challenge:
        "试着改变小苏打或醋的用量，看看哪一种配方能产生最大的喷发。",
    },
    {
      slug: "simple-circuit-light",
      title: "简单电路小灯",
      category: "工程",
      categoryKey: "engineering",
      difficulty: "中等",
      time: "1-2小时",
      image: "/images/circuit.jpg",
      description:
        "搭建一条完整的电流通路，让一盏小灯真正亮起来。",
      introduction: [
        "打开一盏灯看起来很普通，但在这个小动作背后有一个重要的科学概念，叫做电。",
        "这个项目很棒，因为你会亲手搭建一个真正能工作的电路，并看到灯在你的设计下亮起来。",
      ],
      why:
        "电需要一个完整的回路，也就是电路，才能从电池一端流到另一端。当路径闭合时，能量就能沿着导线流动并点亮 LED 灯。",
      materials: [
        "1个 LED 灯",
        "1个电池盒或9V电池",
        "2到3根绝缘导线",
        "电工胶带",
        "一个小开关、回形针或长尾夹",
        "可选：让大人帮忙准备电阻或电池座",
      ],
      steps: [
        "观察电池、导线和 LED，找出电流进入和离开的两端。",
        "把一根导线从电池正极连到 LED 的长脚。",
        "再把第二根导线从 LED 的短脚连回电池负极。",
        "轻轻用胶带固定连接处，让导线保持稳定。",
        "如果 LED 不亮，就把 LED 反过来，因为它只能按一个方向工作。",
        "在电路中的一个位置加上简单开关，这样你就能打开和关闭回路。",
        "测试开关，看看你的电路如何让灯亮起和熄灭。",
      ],
      safety:
        "这个项目只能使用小电池，绝对不要把电路接到墙上的插座。连接之前，请让大人帮你检查电池、LED 方向和任何电阻部件。",
      challenge:
        "在电路里再加入第二盏灯，比较把它放在不同位置时会发生什么。",
    },
  ],
}

export const projectGuides = localizedProjectGuides.en

export function getProjectGuides(language: Language = "en") {
  return localizedProjectGuides[language] ?? localizedProjectGuides.en
}

export function getProjectGuide(slug: string, language: Language = "en") {
  return getProjectGuides(language).find((project) => project.slug === slug)
}

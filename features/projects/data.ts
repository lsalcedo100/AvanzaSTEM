import type { Language } from "@/i18n/translations"

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
      image: "/images/home/featured-bridge.jpg",
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
      image: "/images/shared/lego-robotics.jpeg",
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
      image: "/images/home/coke-mentos-science-experiment-kids.png",
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
      image: "/images/home/featured-python.jpg",
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
      image: "/images/blog/egg-experiment.jpg",
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
      image: "/images/workshops/past-engineering.jpg",
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
    {
      slug: "elephant-toothpaste-experiment",
      title: "Elephant Toothpaste Experiment",
      category: "Science",
      categoryKey: "science",
      difficulty: "Medium",
      time: "30 minutes",
      image: "/images/blog/egg-experiment.jpg",
      description:
        "Watch a giant foam tower erupt from a single bottle as hydrogen peroxide breaks apart and releases oxygen in a spectacular exothermic reaction.",
      introduction: [
        "Elephant toothpaste gets its name because the foam that shoots out is so huge it looks like it could belong to an elephant. But this is not just a cool explosion—it is a real chemical reaction you can control.",
        "This experiment teaches you how catalysts speed up reactions, why heat is released when chemicals change, and how oxygen gas turns a liquid into an enormous pile of foam right before your eyes.",
      ],
      why:
        "Hydrogen peroxide naturally breaks down into water and oxygen gas, but it does so very slowly on its own. Adding a catalyst, like yeast mixed with warm water, gives the reaction a shortcut and makes it happen almost instantly. The oxygen gas escapes so quickly that it gets trapped inside the dish soap, creating thousands of bubbles stacked into thick foam. The reaction is also exothermic, meaning it releases heat you can feel when you touch the foam carefully after it settles.",
      materials: [
        "1/2 cup of 6% or 12% hydrogen peroxide (found at beauty supply stores)",
        "1 packet of dry active yeast",
        "3 tablespoons of warm water",
        "A squirt of dish soap",
        "A few drops of food coloring",
        "A 16-ounce or larger plastic bottle or graduated cylinder",
        "A tray or baking sheet for easy cleanup",
        "Safety goggles and gloves",
      ],
      steps: [
        "Put on safety goggles and gloves before handling the hydrogen peroxide.",
        "Set the bottle in the center of the tray so the foam stays contained.",
        "Add the dish soap and a few drops of food coloring directly into the bottle.",
        "Pour the hydrogen peroxide into the bottle and swirl it gently to mix.",
        "In a separate cup, stir the yeast packet into the warm water for about 30 seconds until it dissolves.",
        "Pour the yeast mixture quickly into the bottle and step back right away.",
        "Watch the foam shoot up fast and notice how warm it feels when you touch it carefully after it slows down.",
        "Discuss what happened: what was the catalyst, where did the heat come from, and what was inside all those bubbles?",
      ],
      safety:
        "Always have an adult handle and pour the hydrogen peroxide, which can irritate skin and eyes. Wear safety goggles and gloves throughout the experiment. The foam is warm and safe to touch after it fully settles, but do not let liquid contact eyes or skin during the reaction. Dispose of the foam and any leftover liquid by rinsing them down a drain with plenty of water.",
      challenge:
        "Try two different concentrations of hydrogen peroxide—3% from the drugstore and 6% or higher from a beauty supply store—and compare how tall each foam tower grows.",
    },
    {
      slug: "making-oobleck",
      title: "Making Oobleck",
      category: "Science",
      categoryKey: "science",
      difficulty: "Easy",
      time: "20 minutes",
      image: "/images/blog/egg-experiment.jpg",
      description:
        "Mix just two ingredients to make a mysterious goop that flows like a liquid but turns solid when you squeeze it—and discover the science of non-Newtonian fluids.",
      introduction: [
        "Oobleck is named after a sticky substance in a Dr. Seuss story, and it is just as weird and unpredictable as it sounds. It runs through your fingers like water, but the moment you squeeze or hit it, it goes hard as a rock.",
        "This activity explores a fascinating class of materials called non-Newtonian fluids, and it only takes two ingredients and a few minutes to make a bowlful of science you can actually hold in your hands.",
      ],
      why:
        "Most liquids like water and juice flow at the same rate no matter how hard you push them. Oobleck is different because it is a non-Newtonian fluid, meaning its viscosity—how thick or runny it is—changes depending on pressure. When you push or hit the oobleck quickly, the cornstarch particles lock together and it behaves like a solid. When pressure is released, the particles separate and it flows like a liquid again. This property is called shear thickening, and engineers study materials like this for things like body armor and pothole filler.",
      materials: [
        "2 cups of cornstarch",
        "1 cup of water",
        "A few drops of food coloring (optional)",
        "A large mixing bowl",
        "A spoon or spatula",
        "A rimmed tray to contain the mess",
      ],
      steps: [
        "Pour the cornstarch into the large mixing bowl.",
        "Add the food coloring to the water if you want your oobleck to be colorful.",
        "Slowly pour the water into the cornstarch, stirring as you go—do not add it all at once.",
        "Keep mixing until the oobleck has no dry lumps and feels strange to stir.",
        "Try poking the surface fast with your finger, then dipping your finger in slowly and notice the difference.",
        "Pick up a handful and squeeze it tight, then open your hand and let it drip.",
        "Talk about what you notice: when does it feel solid? When does it flow like a liquid?",
      ],
      safety:
        "Oobleck is made from food-safe ingredients and is safe to touch, but it can be very messy. Avoid pouring it down drains because cornstarch can build up inside pipes and cause clogs. Instead, let leftover oobleck dry out completely on the tray, then scrape it into the trash. Wash bowls and hands with warm water and let any residue dry before scraping it off.",
      challenge:
        "Try changing the ratio of cornstarch to water by adding a little more of each and notice how the texture changes. You can also place a bag of oobleck on a speaker and watch it dance when you play music with strong bass.",
    },
    {
      slug: "rubber-band-powered-car",
      title: "Rubber Band-Powered Car",
      category: "Engineering",
      categoryKey: "engineering",
      difficulty: "Easy",
      time: "1-2 hours",
      image: "/images/projects/Rubber Band Powered Car.png",
      description:
        "A simple DIY car that moves without electricity or batteries — just the stored energy of a twisted rubber band powering the wheels and axle forward.",
      introduction: [
        "A rubber band-powered car is one of the most satisfying builds because you do all the work, wind it up, set it down, and then watch physics take over.",
        "You can build one from everyday materials and then start tweaking — change the rubber band, the wheels, or the car weight — and see exactly how each change affects how far it travels.",
      ],
      why:
        "The rubber band stores energy when it is twisted or wound up. When the car is released, the rubber band untwists and transfers that stored energy into the wheels or axle. This changes potential energy into kinetic energy, which is the energy of motion. The car moves best on a smooth, flat surface, and students can improve the design by changing the rubber band, wheels, car length, or car weight.",
      materials: [
        "Cardboard, foam board, or another lightweight material for the car body",
        "4 wheels such as bottle caps, cardboard circles, or small toy wheels",
        "2 wooden skewers, pencils, or straws for axles",
        "Straw pieces to hold the axles in place",
        "1–2 rubber bands",
        "Tape, glue, and scissors",
        "Optional: different wheel sizes or rubber bands for testing improvements",
      ],
      steps: [
        "Build the main body of the car using cardboard, foam board, or another lightweight material.",
        "Attach straw pieces to the bottom of the car body to hold the axles in place.",
        "Slide skewers, pencils, or straws through the axle holders.",
        "Attach the wheels carefully to each end of the axles, making sure they spin smoothly.",
        "Connect one end of the rubber band to the car body and the other end to the rear axle.",
        "Twist or wind the rubber band by turning the rear wheels or axle backward.",
        "Place the car on a smooth, flat surface.",
        "Release the car and watch it move forward using rubber band power.",
      ],
      safety:
        "Ask an adult for help with scissors and sharp skewers. Keep the rubber band away from your face when winding it up since it can snap back. Do not aim the car at anyone when releasing it.",
      challenge:
        "Can your car travel farther? Try a stronger or thicker rubber band, different wheel sizes, or a longer or shorter car body. Test whether a lighter car moves farther than a heavier one, and race against another team to see whose design wins.",
    },
    {
      slug: "lemon-powered-batteries",
      title: "Lemon-Powered Batteries",
      category: "Science",
      categoryKey: "science",
      difficulty: "Easy",
      time: "30-45 minutes",
      image: "/images/projects/Lemon powered batteries.png",
      description:
        "Turn lemons into a real battery and light up an LED by discovering how chemical energy becomes electrical energy.",
      introduction: [
        "Did you know a lemon can power a light? It sounds impossible, but lemons contain acid that can kickstart a chemical reaction between two different metals and produce a small electric current.",
        "This project teaches you how real batteries work, why scientists pair different metals together, and what electrolytes do — all from something you can find in your kitchen.",
      ],
      why:
        "A lemon battery works because of a chemical reaction between two different metals and the acidic lemon juice. The zinc nail and copper piece act as electrodes, while the lemon juice acts as the electrolyte. Electrons move from the zinc through the wires to the copper, creating a small electric current. One lemon may not produce enough power for every device, so connecting multiple lemons in a chain increases the total voltage.",
      materials: [
        "2–4 lemons",
        "Copper coins, copper wire, or copper strips",
        "Zinc nails or galvanized nails (lightly sanded so the surface is clean)",
        "Alligator clip wires",
        "Small LED light, digital clock, or voltmeter",
        "Paper towels for cleanup",
      ],
      steps: [
        "Roll the lemons gently on a table to loosen the juice inside.",
        "Insert one zinc nail and one copper piece into each lemon, making sure they do not touch each other.",
        "Connect the copper piece from one lemon to the zinc nail of the next lemon using alligator clips.",
        "Continue connecting lemons in a chain if using multiple lemons.",
        "Attach the two free ends at either end of the chain to an LED, small digital clock, or voltmeter.",
        "Observe whether the device turns on or how much voltage the lemons produce.",
      ],
      safety:
        "The lemon juice is acidic and can sting if it gets in your eyes, so wash your hands after handling cut lemons. Ask an adult for help pushing nails into the lemons and when connecting the wires. Do not put the wires or clips in your mouth.",
      challenge:
        "Can you power an LED with more than one lemon? Try adding more lemons and see what changes. Swap the lemon for a potato, orange, or apple and compare which fruit produces the most voltage.",
    },
    {
      slug: "balloon-powered-car",
      title: "Balloon-Powered Car",
      category: "Engineering",
      categoryKey: "engineering",
      difficulty: "Easy",
      time: "1-2 hours",
      image: "/images/projects/Balloon Powered Car.png",
      description:
        "Build a car that runs on air and discover how Newton's Third Law of Motion turns a simple balloon into a powerful engine.",
      introduction: [
        "A balloon-powered car uses the air rushing out of a balloon to push itself forward. When air escapes backward through a straw, the car moves forward — that is Newton's Third Law of Motion at work.",
        "You can build one from everyday recycled materials and then test how small changes in design — like wheel size, car weight, or how tightly the balloon is sealed — make it travel farther.",
      ],
      why:
        "When the balloon is inflated, it stores potential energy in the stretched rubber and compressed air. When the balloon is released, the air escapes backward through the straw. That backward push creates an equal and opposite reaction, pushing the car forward. The stored potential energy becomes kinetic energy, which is the energy of motion.",
      materials: [
        "Small piece of stiff cardboard or a plastic water bottle for the car body",
        "4 plastic bottle caps for wheels",
        "2 wooden skewers or sturdy straws for axles",
        "4 short straw pieces to hold the axles",
        "1 balloon",
        "1 straw",
        "Tape, scissors, and glue",
      ],
      steps: [
        "Tape straw pieces to the underside of the car body to hold the axles.",
        "Slide skewers or straws through the axle holders.",
        "Attach bottle caps to the ends of each axle to create wheels.",
        "Insert a straw into the balloon and tape it tightly so no air leaks out.",
        "Tape the balloon-and-straw engine to the top of the car with the straw pointing off the back.",
        "Blow up the balloon, pinch the straw, place the car on a flat surface, and release it.",
      ],
      safety:
        "Ask an adult for help with scissors and sharp skewers. Make sure the car is placed on a flat, safe surface before releasing it, and keep fingers away from spinning wheels and axles during the test run.",
      challenge:
        "Can your car travel farther? Try using bigger wheels, making the car body lighter, creating a more airtight balloon connection, or racing against another team to see whose design wins.",
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
      image: "/images/home/featured-bridge.jpg",
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
      image: "/images/shared/lego-robotics.jpeg",
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
      image: "/images/home/coke-mentos-science-experiment-kids.png",
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
      image: "/images/home/featured-python.jpg",
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
      image: "/images/blog/egg-experiment.jpg",
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
      image: "/images/workshops/past-engineering.jpg",
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
    {
      slug: "elephant-toothpaste-experiment",
      title: "Experimento Pasta de Dientes de Elefante",
      category: "Ciencia",
      categoryKey: "science",
      difficulty: "Medio",
      time: "30 minutos",
      image: "/images/blog/egg-experiment.jpg",
      description:
        "Observa como una enorme torre de espuma erupciona de una botella cuando el peroxido de hidrogeno se descompone y libera oxigeno en una espectacular reaccion exotermica.",
      introduction: [
        "La pasta de dientes de elefante recibe su nombre porque la espuma que sale disparada es tan enorme que pareceria que pertenece a un elefante. Pero no es solo una explosion espectacular: es una reaccion quimica real que tu puedes controlar.",
        "Este experimento te ensena como los catalizadores aceleran las reacciones, por que se libera calor cuando los quimicos cambian y como el gas oxigeno convierte un liquido en una pila gigante de espuma ante tus propios ojos.",
      ],
      why:
        "El peroxido de hidrogeno se descompone naturalmente en agua y gas oxigeno, pero lo hace muy lentamente por si solo. Agregar un catalizador, como levadura mezclada con agua tibia, le da a la reaccion un atajo y hace que ocurra casi al instante. El gas oxigeno escapa tan rapido que queda atrapado dentro del jabon para platos, creando miles de burbujas apiladas en espuma espesa. La reaccion tambien es exotermica, lo que significa que libera calor que puedes sentir cuando tocas la espuma con cuidado despues de que se calme.",
      materials: [
        "1/2 taza de peroxido de hidrogeno al 6% o 12% (se consigue en tiendas de belleza)",
        "1 sobre de levadura seca activa",
        "3 cucharadas de agua tibia",
        "Un chorrito de jabon para platos",
        "Unas gotas de colorante de comida",
        "Una botella de plastico de 500 ml o mas grande, o un cilindro graduado",
        "Una bandeja o charola para facilitar la limpieza",
        "Gafas de seguridad y guantes",
      ],
      steps: [
        "Ponte las gafas de seguridad y los guantes antes de manejar el peroxido de hidrogeno.",
        "Coloca la botella en el centro de la bandeja para que la espuma quede contenida.",
        "Agrega el jabon y unas gotas de colorante directamente en la botella.",
        "Vierte el peroxido de hidrogeno en la botella y agitala suavemente para mezclar.",
        "En un vaso aparte, mezcla el sobre de levadura con el agua tibia durante unos 30 segundos hasta que se disuelva.",
        "Vierte rapidamente la mezcla de levadura en la botella y alejate enseguida.",
        "Observa como la espuma sube disparada y nota el calor que emite cuando la tocas con cuidado despues de que se calme.",
        "Habla sobre lo que paso: que fue el catalizador, de donde vino el calor y que habia dentro de todas esas burbujas.",
      ],
      safety:
        "Siempre pide a un adulto que maneje y vierta el peroxido de hidrogeno, ya que puede irritar la piel y los ojos. Usa gafas de seguridad y guantes durante todo el experimento. La espuma es tibia y segura de tocar despues de que se calme completamente, pero no permitas que el liquido entre en contacto con los ojos o la piel durante la reaccion. Desecha la espuma y el liquido sobrante enjuagandolos por el desague con abundante agua.",
      challenge:
        "Prueba dos concentraciones diferentes de peroxido de hidrogeno: al 3% de la farmacia y al 6% o mas de una tienda de belleza, y compara que tan alta crece cada torre de espuma.",
    },
    {
      slug: "making-oobleck",
      title: "Haciendo Oobleck",
      category: "Ciencia",
      categoryKey: "science",
      difficulty: "Facil",
      time: "20 minutos",
      image: "/images/blog/egg-experiment.jpg",
      description:
        "Mezcla solo dos ingredientes para crear una sustancia misteriosa que fluye como liquido pero se solidifica al apretarla, y descubre la ciencia de los fluidos no newtonianos.",
      introduction: [
        "El oobleck toma su nombre de una sustancia pegajosa en un cuento del Dr. Seuss, y es tan extrano e impredecible como suena. Corre entre tus dedos como agua, pero en el momento en que lo aprietas o golpeas, se endurece como una roca.",
        "Esta actividad explora una fascinante clase de materiales llamados fluidos no newtonianos, y solo necesitas dos ingredientes y unos minutos para hacer un tazon lleno de ciencia que puedes sostener en tus propias manos.",
      ],
      why:
        "La mayoria de los liquidos como el agua y el jugo fluyen a la misma velocidad sin importar con que fuerza los empujes. El oobleck es diferente porque es un fluido no newtoniano, lo que significa que su viscosidad, es decir que tan espeso o liquido es, cambia segun la presion. Cuando empujas o golpeas el oobleck rapidamente, las particulas de maicena se traban entre si y se comporta como un solido. Cuando se libera la presion, las particulas se separan y fluye como liquido de nuevo. Esta propiedad se llama espesamiento por cizallamiento, y los ingenieros estudian materiales similares para cosas como armaduras corporales y relleno de baches.",
      materials: [
        "2 tazas de maicena",
        "1 taza de agua",
        "Unas gotas de colorante de comida (opcional)",
        "Un tazon grande para mezclar",
        "Una cuchara o espatula",
        "Una bandeja con bordes para contener el desorden",
      ],
      steps: [
        "Vierte la maicena en el tazon grande.",
        "Agrega el colorante al agua si quieres que tu oobleck tenga color.",
        "Vierte el agua lentamente sobre la maicena, revolviendo mientras lo haces; no la agregues toda de una vez.",
        "Sigue mezclando hasta que el oobleck no tenga grumos secos y se sienta extrano al revolver.",
        "Intenta pinchar la superficie rapidamente con el dedo, luego sumerge el dedo lentamente y nota la diferencia.",
        "Toma un punado y apretalo con fuerza, luego abre la mano y deja que gotee.",
        "Habla sobre lo que notas: cuando se siente solido? Cuando fluye como liquido?",
      ],
      safety:
        "El oobleck esta hecho con ingredientes seguros para el contacto con la piel, pero puede ser muy desordenado. Evita vertirlo por el desague porque la maicena puede acumularse dentro de las tuberias y causar obstrucciones. En cambio, deja que el oobleck sobrante se seque completamente en la bandeja y luego raspalo y echalo a la basura. Lava los tazones y las manos con agua tibia y deja que cualquier residuo se seque antes de rasparlo.",
      challenge:
        "Prueba cambiar la proporcion de maicena y agua agregando un poco mas de cada uno y nota como cambia la textura. Tambien puedes poner una bolsa con oobleck sobre un parlante y ver como baila cuando pones musica con mucho bajo.",
    },
    {
      slug: "rubber-band-powered-car",
      title: "Auto Propulsado por Liga",
      category: "Ingenieria",
      categoryKey: "engineering",
      difficulty: "Facil",
      time: "1-2 horas",
      image: "/images/projects/Rubber Band Powered Car.png",
      description:
        "Un auto DIY sencillo que se mueve sin electricidad ni baterias, usando solo la energia almacenada de una liga retorcida para impulsar las ruedas y el eje hacia adelante.",
      introduction: [
        "Un auto propulsado por liga es uno de los proyectos mas satisfactorios porque tu haces todo el trabajo — lo enrollas, lo sueltas sobre una superficie plana — y observas como la fisica hace el resto.",
        "Puedes construirlo con materiales del hogar y luego comenzar a ajustarlo: cambia la liga, las ruedas o el peso del auto, y observa exactamente como cada cambio afecta la distancia que recorre.",
      ],
      why:
        "La liga almacena energia cuando se retuerce o enrolla. Al soltar el auto, la liga se desenrolla y transfiere esa energia almacenada a las ruedas o al eje. Esto convierte la energia potencial en energia cinetica, que es la energia del movimiento. El auto funciona mejor en una superficie lisa y plana, y los estudiantes pueden mejorar el diseno cambiando la liga, las ruedas, la longitud o el peso del auto.",
      materials: [
        "Carton, foamy u otro material ligero para el cuerpo del auto",
        "4 ruedas, como tapas de botella, circulos de carton o ruedas de juguete pequenas",
        "2 palitos de madera, lapices o popotes para los ejes",
        "Trozos de popote para sostener los ejes en su lugar",
        "1 a 2 ligas",
        "Cinta adhesiva, pegamento y tijeras",
        "Opcional: diferentes tamanos de ruedas o ligas para probar mejoras",
      ],
      steps: [
        "Construye el cuerpo principal del auto usando carton, foamy u otro material ligero.",
        "Pega trozos de popote en la parte inferior del cuerpo del auto para sostener los ejes.",
        "Desliza palitos, lapices o popotes a traves de los soportes de eje.",
        "Pega las ruedas con cuidado en cada extremo de los ejes, asegurandote de que giren bien.",
        "Conecta un extremo de la liga al cuerpo del auto y el otro extremo al eje trasero.",
        "Retuerce o enrolla la liga girando las ruedas traseras o el eje hacia atras.",
        "Coloca el auto en una superficie lisa y plana.",
        "Suelta el auto y observa como avanza usando la energia de la liga.",
      ],
      safety:
        "Pide ayuda a un adulto con las tijeras y los palitos afilados. Mantén la liga lejos de tu cara al enrollarla porque puede regresar de golpe. No apuntes el auto hacia nadie al soltarlo.",
      challenge:
        "¿Puede tu auto recorrer mas distancia? Prueba con una liga mas resistente o mas gruesa, diferentes tamanos de ruedas o un cuerpo de auto mas largo o corto. Verifica si un auto mas ligero va mas lejos que uno mas pesado y compite contra otro equipo para ver que diseno gana.",
    },
    {
      slug: "lemon-powered-batteries",
      title: "Baterias de Limon",
      category: "Ciencia",
      categoryKey: "science",
      difficulty: "Facil",
      time: "30-45 minutos",
      image: "/images/projects/Lemon powered batteries.png",
      description:
        "Convierte limones en una bateria real y enciende un LED descubriendo como la energia quimica se convierte en energia electrica.",
      introduction: [
        "¿Sabias que un limon puede encender una luz? Parece imposible, pero el jugo de limon contiene acido que puede iniciar una reaccion quimica entre dos metales diferentes y producir una pequena corriente electrica.",
        "Este proyecto te ensena como funcionan las baterias reales, por que los cientificos combinan metales diferentes y que hacen los electrolitos — con algo que puedes encontrar en tu cocina.",
      ],
      why:
        "Una bateria de limon funciona gracias a una reaccion quimica entre dos metales diferentes y el jugo acido del limon. El clavo de zinc y la pieza de cobre actuan como electrodos, mientras que el jugo de limon actua como electrolito. Los electrones se mueven del zinc al cobre a traves de los cables, creando una pequena corriente electrica. Un solo limon puede no producir suficiente energia, por lo que conectar varios limones en cadena aumenta el voltaje total.",
      materials: [
        "2 a 4 limones",
        "Monedas de cobre, alambre de cobre o tiras de cobre",
        "Clavos de zinc o clavos galvanizados (lijados levemente para limpiar la superficie)",
        "Cables con pinzas de cocodrilo",
        "Foco LED pequeno, reloj digital o voltimetro",
        "Toallas de papel para la limpieza",
      ],
      steps: [
        "Rueda los limones suavemente sobre una mesa para aflojar el jugo por dentro.",
        "Inserta un clavo de zinc y una pieza de cobre en cada limon, asegurandote de que no se toquen entre si.",
        "Conecta la pieza de cobre de un limon al clavo de zinc del siguiente usando pinzas de cocodrilo.",
        "Continua conectando los limones en cadena si usas varios.",
        "Conecta los dos extremos libres de la cadena a un LED, reloj digital pequeno o voltimetro.",
        "Observa si el dispositivo enciende o cuanto voltaje producen los limones.",
      ],
      safety:
        "El jugo de limon es acido y puede arder si te llega a los ojos, asi que lavate las manos despues de manipular limones cortados. Pide ayuda a un adulto para insertar los clavos y conectar los cables. No pongas los cables ni las pinzas en la boca.",
      challenge:
        "¿Puedes encender un LED con mas de un limon? Intenta agregar mas limones y observa que cambia. Cambia el limon por una papa, naranja o manzana y compara cual fruta produce mas voltaje.",
    },
    {
      slug: "balloon-powered-car",
      title: "Auto Propulsado por Globo",
      category: "Ingenieria",
      categoryKey: "engineering",
      difficulty: "Facil",
      time: "1-2 horas",
      image: "/images/projects/Balloon Powered Car.png",
      description:
        "Construye un auto que funciona con aire y descubre como la Tercera Ley de Newton convierte un globo en un motor poderoso.",
      introduction: [
        "Un auto propulsado por globo usa el aire que sale del globo para empujarse hacia adelante. Cuando el aire escapa hacia atras por un popote, el auto avanza — eso es la Tercera Ley del Movimiento de Newton en accion.",
        "Puedes construirlo con materiales reciclados del hogar y luego probar como pequenos cambios en el diseno — como el tamano de las ruedas, el peso del auto o que tan bien esta sellado el globo — lo hacen recorrer mas distancia.",
      ],
      why:
        "Cuando el globo esta inflado, almacena energia potencial en el hule estirado y el aire comprimido. Al soltar el globo, el aire escapa hacia atras por el popote. Ese empuje hacia atras crea una reaccion igual y opuesta que impulsa el auto hacia adelante. La energia potencial almacenada se convierte en energia cinetica, que es la energia del movimiento.",
      materials: [
        "Un trozo pequeno de carton rigido o una botella de plastico para el cuerpo del auto",
        "4 tapas de botella de plastico para las ruedas",
        "2 palitos de madera o popotes resistentes para los ejes",
        "4 trozos cortos de popote para sostener los ejes",
        "1 globo",
        "1 popote",
        "Cinta adhesiva, tijeras y pegamento",
      ],
      steps: [
        "Pega trozos de popote en la parte de abajo del cuerpo del auto para sostener los ejes.",
        "Desliza los palitos o popotes a traves de los soportes de ejes.",
        "Pega las tapas de botella en los extremos de cada eje para crear las ruedas.",
        "Inserta un popote en el globo y pegalo con cinta para que no salga aire.",
        "Pega el motor de globo y popote encima del auto con el popote apuntando hacia la parte trasera.",
        "Infla el globo, pellizca el popote, coloca el auto en una superficie plana y sueltalo.",
      ],
      safety:
        "Pide ayuda a un adulto con las tijeras y los palitos afilados. Asegurate de colocar el auto en una superficie plana y segura antes de soltarlo, y mantén los dedos alejados de las ruedas y ejes giratorios durante la prueba.",
      challenge:
        "¿Puede tu auto recorrer mas distancia? Intenta usar ruedas mas grandes, hacer el cuerpo del auto mas liviano, crear una conexion de globo mas hermetica o competir contra otro equipo para ver que diseno gana.",
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
      image: "/images/home/featured-bridge.jpg",
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
      image: "/images/shared/lego-robotics.jpeg",
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
      image: "/images/home/coke-mentos-science-experiment-kids.png",
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
      image: "/images/home/featured-python.jpg",
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
      image: "/images/blog/egg-experiment.jpg",
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
      image: "/images/workshops/past-engineering.jpg",
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
    {
      slug: "elephant-toothpaste-experiment",
      title: "大象牙膏实验",
      category: "科学",
      categoryKey: "science",
      difficulty: "中等",
      time: "30分钟",
      image: "/images/blog/egg-experiment.jpg",
      description:
        "看着一瓶液体喷出巨大泡沫柱——当双氧水分解并释放氧气时，会发生一场令人惊叹的放热反应。",
      introduction: [
        "大象牙膏得名于它喷出的泡沫大得像大象才能用的牙膏。但这不只是一场酷炫的爆发——它是一个你可以亲手控制的真实化学反应。",
        "这个实验教你了解催化剂如何加快反应速度、化学变化为什么会释放热量，以及氧气如何将液体瞬间变成一大堆泡沫。",
      ],
      why:
        "双氧水在自然状态下会慢慢分解成水和氧气，但速度非常缓慢。加入催化剂（比如溶于温水的酵母），反应就会加速，几乎瞬间完成。氧气迅速逸出，被洗洁精困住形成千万个气泡，堆叠成厚厚的泡沫。这个反应还是放热反应，泡沫平息后小心触摸，你会感到它还有些温热。",
      materials: [
        "半杯 6% 或 12% 双氧水（在美发用品店可以买到）",
        "1 包干活酵母",
        "3 汤匙温水",
        "少量洗洁精",
        "几滴食用色素",
        "一个 500 毫升或更大的塑料瓶或量筒",
        "一个托盘，方便清理",
        "护目镜和手套",
      ],
      steps: [
        "在接触双氧水之前，先戴好护目镜和手套。",
        "把瓶子放在托盘中央，让泡沫不会到处乱跑。",
        "往瓶子里直接加入洗洁精和几滴食用色素。",
        "把双氧水倒入瓶中，轻轻摇晃混合。",
        "在另一个杯子里，把酵母包倒入温水中搅拌约 30 秒，直到溶解。",
        "迅速把酵母溶液倒进瓶子，然后立刻后退。",
        "观察泡沫迅速涌出，等它完全平息后小心触摸，感受它的温度。",
        "讨论发生了什么：催化剂是什么？热量从哪里来？泡沫里面是什么气体？",
      ],
      safety:
        "双氧水会刺激皮肤和眼睛，请务必由大人负责取用和倒入。全程佩戴护目镜和手套。泡沫完全平息后可以安全触摸，但反应过程中不要让液体接触眼睛或皮肤。实验结束后，用大量清水冲洗托盘，将泡沫和液体安全排入下水道。",
      challenge:
        "分别用药店的 3% 双氧水和美发店的 6% 或更高浓度双氧水做实验，比较两次泡沫柱的高度有什么不同。",
    },
    {
      slug: "making-oobleck",
      title: "制作奥不力克",
      category: "科学",
      categoryKey: "science",
      difficulty: "简单",
      time: "20分钟",
      image: "/images/blog/egg-experiment.jpg",
      description:
        "只需两种材料就能调出一种神奇的东西——它像液体一样流淌，但用手一捏就变成固体，一起来探索非牛顿流体的科学吧。",
      introduction: [
        "奥不力克（Oobleck）这个名字来自苏斯博士的故事里的神奇黏稠物质，它也像故事里写的那样奇怪和难以捉摸。它能像水一样从手指间流过，但一旦你捏紧或拍打它，就会像石头一样变硬。",
        "这个活动探索一类叫非牛顿流体的迷人材料，只需两种材料和几分钟，你就能做出一碗可以用手感受的科学实验。",
      ],
      why:
        "大多数液体，比如水和果汁，不管用多大力推压，流动速度都一样。奥不力克不同，它是一种非牛顿流体，意味着它的粘度——有多稠或多稀——会随压力变化。当你快速按压或拍打它时，玉米淀粉颗粒互相锁住，表现得像固体。压力释放后，颗粒分开，它又像液体一样流动。这种特性叫做剪切增稠，工程师们研究类似材料用于防弹衣和路面修补等领域。",
      materials: [
        "2 杯玉米淀粉",
        "1 杯水",
        "几滴食用色素（可选）",
        "一个大号混合碗",
        "一把勺子或刮刀",
        "一个有边缘的托盘，方便控制散落",
      ],
      steps: [
        "把玉米淀粉倒入大碗中。",
        "如果想让奥不力克有颜色，把食用色素滴入水中。",
        "边搅拌边慢慢把水倒入玉米淀粉，不要一次全倒进去。",
        "继续搅拌直到没有干结块，感觉搅拌起来有点奇怪为止。",
        "用手指快速戳一下表面，然后再慢慢把手指按进去，感受两者的不同。",
        "抓起一把捏紧，然后张开手让它滴落。",
        "说说你观察到了什么：它什么时候像固体？什么时候像液体？",
      ],
      safety:
        "奥不力克由食品级材料制成，接触皮肤是安全的，但会很乱。不要把它倒进下水道，因为玉米淀粉会堵塞管道。剩余的奥不力克应让其在托盘上自然晾干，再刮入垃圾桶丢弃。碗和手用温水冲洗，等残留物干燥后再刮去。",
      challenge:
        "试着调整玉米淀粉和水的比例，各多加一点，观察质地怎样变化。你也可以把一袋奥不力克放在音箱上，播放重低音音乐，看看它如何随节奏舞动。",
    },
    {
      slug: "rubber-band-powered-car",
      title: "橡皮筋动力车",
      category: "工程",
      categoryKey: "engineering",
      difficulty: "简单",
      time: "1-2小时",
      image: "/images/projects/Rubber Band Powered Car.png",
      description:
        "一辆不需要电力或电池的手工小车——只用扭紧的橡皮筋储存的能量推动车轮和车轴向前转动。",
      introduction: [
        "橡皮筋动力车是最有成就感的手工之一：你完成所有的搭建，把它绕紧，放在平面上，然后看着物理学把剩下的事做完。",
        "你可以用日常材料搭建它，然后开始调整——换橡皮筋、改变轮子或者调整车重——观察每次改动对行驶距离的影响。",
      ],
      why:
        "橡皮筋被扭紧或绕圈时会储存能量。松开小车后，橡皮筋回弹并将储存的能量传递给车轮或车轴。这将势能转化为动能，也就是运动的能量。小车在光滑的平面上跑得最好，学生可以通过改变橡皮筋、轮子、车身长度或车重来优化设计。",
      materials: [
        "纸板、泡沫板或其他轻质材料，用作车身",
        "4个轮子，例如瓶盖、纸板圆圈或小玩具轮子",
        "2根竹签、铅笔或吸管，用作车轴",
        "吸管段，用于固定车轴",
        "1到2根橡皮筋",
        "胶带、胶水和剪刀",
        "可选：不同尺寸的轮子或橡皮筋，用于测试改进效果",
      ],
      steps: [
        "用纸板、泡沫板或其他轻质材料搭建车身主体。",
        "将吸管段粘在车身底部，用来固定车轴。",
        "将竹签、铅笔或吸管穿过轴套。",
        "将轮子仔细安装到每根轴的两端，确保它们能顺畅旋转。",
        "将橡皮筋一端固定在车身上，另一端固定在后轴上。",
        "向后转动后轮或后轴，将橡皮筋扭紧或绕圈。",
        "把小车放在光滑的平面上。",
        "松开小车，看着它靠橡皮筋的力量向前驶去。",
      ],
      safety:
        "使用剪刀和尖竹签时请让大人帮忙。绕紧橡皮筋时让它远离脸部，以免弹回伤人。放车时不要朝着任何人的方向。",
      challenge:
        "能让你的车跑更远吗？试试更粗或更强的橡皮筋、不同尺寸的轮子，或者更长、更短的车身。测试更轻的车是否比更重的跑得更远，和另一组比赛看谁的设计赢。",
    },
    {
      slug: "lemon-powered-batteries",
      title: "柠檬电池",
      category: "科学",
      categoryKey: "science",
      difficulty: "简单",
      time: "30-45分钟",
      image: "/images/projects/Lemon powered batteries.png",
      description:
        "把柠檬变成真正的电池，点亮一个LED灯，探索化学能如何转化为电能。",
      introduction: [
        "你知道柠檬能点亮灯泡吗？听起来不可思议，但柠檬汁里含有酸性物质，能引发两种不同金属之间的化学反应，产生微弱的电流。",
        "这个项目教你了解真实电池的工作原理、科学家为什么要配对不同金属，以及电解质的作用——材料就藏在你家厨房里。",
      ],
      why:
        "柠檬电池靠的是两种不同金属与酸性柠檬汁之间的化学反应。锌钉和铜片充当电极，柠檬汁充当电解质。电子从锌通过导线流向铜，形成微弱的电流。单个柠檬产生的电压可能不够，但将多个柠檬串联起来可以提高总电压。",
      materials: [
        "2到4个柠檬",
        "铜币、铜线或铜条",
        "锌钉或镀锌钉（轻轻打磨表面使其清洁）",
        "带鳄鱼夹的导线",
        "小型LED灯、数字时钟或电压表",
        "纸巾用于清洁",
      ],
      steps: [
        "将柠檬在桌上轻轻滚动，让内部汁液松动。",
        "在每个柠檬上分别插入一根锌钉和一片铜，确保两者不互相接触。",
        "用鳄鱼夹将一个柠檬的铜片连接到下一个柠檬的锌钉。",
        "如果使用多个柠檬，继续按顺序串联连接。",
        "将链条两端的空余导线连接到LED灯、小型数字时钟或电压表。",
        "观察设备是否点亮，或柠檬产生了多少电压。",
      ],
      safety:
        "柠檬汁是酸性的，溅入眼睛会刺痛，切开柠檬后请洗手。插钉子和连接导线时请让大人帮忙。不要把导线或鳄鱼夹放进嘴里。",
      challenge:
        "能用超过一个柠檬点亮LED吗？多加几个柠檬看看有什么变化。换成土豆、橙子或苹果试试，比较哪种水果产生的电压最大。",
    },
    {
      slug: "balloon-powered-car",
      title: "气球动力车",
      category: "工程",
      categoryKey: "engineering",
      difficulty: "简单",
      time: "1-2小时",
      image: "/images/projects/Balloon Powered Car.png",
      description:
        "造一辆靠空气驱动的小车，探索牛顿第三定律如何让一个简单气球变成强力引擎。",
      introduction: [
        "气球动力车利用从气球里冲出来的空气推动自己前进。当空气通过吸管向后喷出，小车就会向前运动——这就是牛顿第三运动定律在起作用。",
        "你可以用家里常见的废旧材料来搭建它，然后测试轮子大小、车身重量或气球密封程度等细节变化，看看哪些改动能让小车跑得更远。",
      ],
      why:
        "气球充气后，拉伸的橡皮和压缩的空气中储存了势能。松开气球时，空气通过吸管向后喷出。这个向后的推力产生了一个等大反向的作用力，将小车推向前方。储存的势能转化为动能，也就是运动的能量。",
      materials: [
        "一小块硬纸板或塑料水瓶，用作车身",
        "4个塑料瓶盖，用作车轮",
        "2根竹签或结实的吸管，用作车轴",
        "4段短吸管，用于固定车轴",
        "1个气球",
        "1根吸管",
        "胶带、剪刀和胶水",
      ],
      steps: [
        "将短吸管段粘在车身底部，作为车轴的固定套管。",
        "将竹签或吸管穿过轴套。",
        "把瓶盖粘在每根轴的两端，制成车轮。",
        "将一根吸管插入气球口，用胶带紧紧缠绕，确保不漏气。",
        "将气球和吸管组成的动力装置粘在车身顶部，吸管末端朝向车尾。",
        "吹满气球，捏住吸管，将小车放在平坦的地面上，松手放开。",
      ],
      safety:
        "使用剪刀和尖竹签时请让大人帮忙。放开小车前，确保它放在平坦、安全的地面上，测试时手指远离转动的车轮和车轴。",
      challenge:
        "你的车能跑更远吗？试试换更大的轮子、让车身更轻、把气球接口封得更严，或者和另一组比赛，看谁的设计跑得更远。",
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

export type ProjectGuide = {
  slug: string
  title: string
  category: string
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

export const projectGuides: ProjectGuide[] = [
  {
    slug: "popsicle-stick-bridge",
    title: "Popsicle Stick Bridge",
    category: "Engineering",
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
      "50 or more popsicle sticks",
      "White school glue or wood glue",
      "A ruler",
      "A printed truss template or paper and pencil for tracing one",
      "Books, coins, or other small weights for testing",
      "Wax paper or scrap cardboard to protect your table",
    ],
    steps: [
      "Print or trace a truss template and cover it with wax paper before you start gluing.",
      "Build the first side truss directly on top of the template so the triangles stay neat and even.",
      "Flip the truss and reinforce the busiest joints by doubling up sticks or adding simple gusset-style supports.",
      "Build a second truss that matches the first one as closely as possible.",
      "Connect the two trusses with deck sticks and top lateral bracing.",
      "Let the glue dry completely before you stand the bridge on test supports.",
      "Add small weights slowly and record how much the bridge holds before it starts to sag.",
    ],
    safety:
      "Ask an adult for help if you use hot glue, and keep fingers away from the glue tip because it gets very hot. Add test weights slowly so nothing heavy rolls off the bridge or lands on your toes.",
    challenge:
      "Try building a lighter bridge that still holds the same amount of weight by reinforcing only the most important joints.",
  },
  {
    slug: "lego-robot-builder",
    title: "LEGO Grabber Robot",
    category: "Robotics",
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
      "Soda has carbon dioxide gas dissolved inside it. Mentos candies have lots of tiny bumps that give the gas many places to escape at once, a process called nucleation, so the soda rushes out fast.",
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
]

export function getProjectGuide(slug: string) {
  return projectGuides.find((project) => project.slug === slug)
}

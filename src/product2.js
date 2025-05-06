const products = [
  {
    id: 1,
    brand: "Apple",
    title: "iPhone 14 Pro",
    description:
      "Apple's latest flagship with A16 Bionic chip and 48MP camera.",
    price: 999,
    tags: ["iOS", "flagship", "5G", "camera"],
    image: "https://source.unsplash.com/400x400/?iphone,apple"
  },
  {
    id: 2,
    brand: "Samsung",
    title: "Galaxy S23 Ultra",
    description: "Premium Android phone with 200MP camera and stylus support.",
    price: 1199,
    tags: ["Android", "flagship", "camera", "stylus"],
    image: "https://source.unsplash.com/400x400/?samsung,galaxy"
  },
  {
    id: 3,
    brand: "Xiaomi",
    title: "13 Pro",
    description: "Affordable flagship with Leica camera and fast charging.",
    price: 699,
    tags: ["Android", "budget flagship", "fast charging"],
    image: "https://source.unsplash.com/400x400/?xiaomi,smartphone"
  },
  {
    id: 4,
    brand: "OnePlus",
    title: "OnePlus 11",
    description:
      "Smooth OxygenOS experience with top-tier Snapdragon performance.",
    price: 749,
    tags: ["Android", "fast", "Snapdragon", "OxygenOS"],
    image: "https://source.unsplash.com/400x400/?oneplus,smartphone"
  },
  {
    id: 5,
    brand: "Google",
    title: "Pixel 7 Pro",
    description:
      "Best-in-class Android experience with Tensor G2 chip and AI camera.",
    price: 899,
    tags: ["Android", "Google", "camera", "AI"],
    image: "https://source.unsplash.com/400x400/?google,pixel"
  },
  {
    id: 6,
    brand: "Sony",
    title: "Xperia 1 IV",
    description: "4K OLED display with professional-grade camera features.",
    price: 1599,
    tags: ["Android", "4K", "camera", "OLED"],
    image: "https://source.unsplash.com/400x400/?sony,xperia"
  },
  {
    id: 7,
    brand: "Huawei",
    title: "Mate 50 Pro",
    description: "Leica camera system with HarmonyOS and satellite messaging.",
    price: 1299,
    tags: ["HarmonyOS", "camera", "flagship"],
    image: "https://source.unsplash.com/400x400/?huawei,smartphone"
  },
  {
    id: 8,
    brand: "Oppo",
    title: "Find X5 Pro",
    description:
      "Premium design with MariSilicon imaging chip and fast charging.",
    price: 1099,
    tags: ["Android", "fast charging", "premium"],
    image: "https://source.unsplash.com/400x400/?oppo,smartphone"
  },
  {
    id: 9,
    brand: "Vivo",
    title: "X90 Pro+",
    description: "ZEISS optics with Snapdragon 8 Gen 2 and 120W fast charging.",
    price: 1199,
    tags: ["Android", "camera", "fast charging"],
    image: "https://source.unsplash.com/400x400/?vivo,smartphone"
  },
  {
    id: 10,
    brand: "Realme",
    title: "GT 2 Pro",
    description:
      "Flagship killer with paper-inspired design and Snapdragon 8 Gen 1.",
    price: 799,
    tags: ["Android", "budget flagship", "performance"],
    image: "https://source.unsplash.com/400x400/?realme,smartphone"
  },
  {
    id: 11,
    brand: "Motorola",
    title: "Edge 30 Ultra",
    description:
      "200MP camera with 125W charging and stock Android experience.",
    price: 899,
    tags: ["Android", "stock", "fast charging"],
    image: "https://source.unsplash.com/400x400/?motorola,smartphone"
  },
  {
    id: 12,
    brand: "Nokia",
    title: "X30 5G",
    description: "Sustainable design with 100% recycled aluminum frame.",
    price: 599,
    tags: ["Android", "eco-friendly", "durable"],
    image: "https://source.unsplash.com/400x400/?nokia,smartphone"
  },
  {
    id: 13,
    brand: "Asus",
    title: "ROG Phone 6",
    description:
      "Gaming powerhouse with 165Hz AMOLED display and air triggers.",
    price: 999,
    tags: ["Android", "gaming", "performance"],
    image: "https://source.unsplash.com/400x400/?asus,rog"
  },
  {
    id: 14,
    brand: "LG",
    title: "Wing 5G",
    description:
      "Unique swivel display design for multitasking (discontinued).",
    price: 999,
    tags: ["Android", "innovative", "dual screen"],
    image: "https://source.unsplash.com/400x400/?lg,smartphone"
  },
  {
    id: 15,
    brand: "ZTE",
    title: "Nubia Red Magic 8 Pro",
    description: "Gaming phone with under-display camera and active cooling.",
    price: 799,
    tags: ["Android", "gaming", "performance"],
    image: "https://source.unsplash.com/400x400/?zte,smartphone"
  },
  {
    id: 16,
    brand: "BlackBerry",
    title: "Key2 LE",
    description: "Physical keyboard with Android and enhanced security.",
    price: 499,
    tags: ["Android", "keyboard", "security"],
    image: "https://source.unsplash.com/400x400/?blackberry,smartphone"
  },
  {
    id: 17,
    brand: "HTC",
    title: "U23 Pro",
    description: "Vive VR-ready phone with 120Hz display and 5G.",
    price: 799,
    tags: ["Android", "VR", "5G"],
    image: "https://source.unsplash.com/400x400/?htc,smartphone"
  },
  {
    id: 18,
    brand: "Lenovo",
    title: "Legion Phone Duel 3",
    description: "Gaming phone with dual USB-C ports and side pop-up camera.",
    price: 1099,
    tags: ["Android", "gaming", "performance"],
    image: "https://source.unsplash.com/400x400/?lenovo,smartphone"
  },
  {
    id: 19,
    brand: "Honor",
    title: "Magic5 Pro",
    description: "Flagship with eye-tracking and 5450mAh battery.",
    price: 1199,
    tags: ["Android", "flagship", "battery"],
    image: "https://source.unsplash.com/400x400/?honor,smartphone"
  },
  {
    id: 20,
    brand: "Tecno",
    title: "Phantom X2 Pro",
    description: "First phone with retractable portrait lens.",
    price: 599,
    tags: ["Android", "innovative", "camera"],
    image: "https://source.unsplash.com/400x400/?tecno,smartphone"
  },
  {
    id: 21,
    brand: "Infinix",
    title: "Zero Ultra",
    description: "180W fast charging and 200MP camera.",
    price: 499,
    tags: ["Android", "fast charging", "budget"],
    image: "https://source.unsplash.com/400x400/?infinix,smartphone"
  },
  {
    id: 22,
    brand: "Fairphone",
    title: "Fairphone 4",
    description: "Modular, repairable phone with ethical sourcing.",
    price: 649,
    tags: ["Android", "eco-friendly", "modular"],
    image: "https://source.unsplash.com/400x400/?fairphone,smartphone"
  },
  {
    id: 23,
    brand: "CAT",
    title: "S62 Pro",
    description: "Rugged phone with thermal camera and 3-year warranty.",
    price: 699,
    tags: ["Android", "rugged", "thermal"],
    image: "https://source.unsplash.com/400x400/?cat,rugged,phone"
  },
  {
    id: 24,
    brand: "Sharp",
    title: "Aquos R7",
    description: "1-inch camera sensor with 240Hz Pro IGZO OLED display.",
    price: 1299,
    tags: ["Android", "display", "camera"],
    image: "https://source.unsplash.com/400x400/?sharp,smartphone"
  },
  {
    id: 25,
    brand: "Panasonic",
    title: "Eluga X1",
    description: "Japanese premium phone with Leica-like camera.",
    price: 899,
    tags: ["Android", "premium", "Japan"],
    image: "https://source.unsplash.com/400x400/?panasonic,smartphone"
  },
  {
    id: 26,
    brand: "Micromax",
    title: "In Note 2",
    description: "Indian brand with stock Android and 5000mAh battery.",
    price: 199,
    tags: ["Android", "budget", "India"],
    image: "https://source.unsplash.com/400x400/?micromax,smartphone"
  },
  {
    id: 27,
    brand: "Lava",
    title: "Agni 5G",
    description: "Indian-made 5G phone with clean software.",
    price: 299,
    tags: ["Android", "5G", "India"],
    image: "https://source.unsplash.com/400x400/?lava,smartphone"
  },
  {
    id: 28,
    brand: "Nothing",
    title: "Phone (2)",
    description:
      "Transparent design with Glyph interface and Snapdragon 8+ Gen 1.",
    price: 699,
    tags: ["Android", "design", "premium"],
    image: "https://source.unsplash.com/400x400/?nothing,phone"
  },
  {
    id: 29,
    brand: "Leica",
    title: "Leitz Phone 2",
    description:
      "Camera-first phone with 1-inch sensor and Maestro III processor.",
    price: 1599,
    tags: ["Android", "camera", "luxury"],
    image: "https://source.unsplash.com/400x400/?leica,smartphone"
  },
  {
    id: 30,
    brand: "Vertu",
    title: "Metavertu",
    description:
      "Luxury phone with Web3 capabilities and sapphire crystal display.",
    price: 3999,
    tags: ["Android", "luxury", "Web3"],
    image: "https://source.unsplash.com/400x400/?luxury,smartphone"
  },
  {
    id: 31,
    brand: "TCL",
    title: "40 R 5G",
    description: "Affordable 5G with NXTVISION display technology.",
    price: 299,
    tags: ["Android", "budget", "5G"],
    image: "https://source.unsplash.com/400x400/?tcl,smartphone"
  },
  {
    id: 32,
    brand: "Alcatel",
    title: "3X (2023)",
    description: "Entry-level phone with triple camera setup.",
    price: 179,
    tags: ["Android", "budget", "entry-level"],
    image: "https://source.unsplash.com/400x400/?alcatel,smartphone"
  },
  {
    id: 33,
    brand: "Meizu",
    title: "20 Pro",
    description: "Sleek design with Flyme OS and ultrasonic fingerprint.",
    price: 699,
    tags: ["Android", "design", "Flyme"],
    image: "https://source.unsplash.com/400x400/?meizu,smartphone"
  },
  {
    id: 34,
    brand: "POCO",
    title: "F5 Pro",
    description: "Xiaomi sub-brand with flagship specs at mid-range price.",
    price: 499,
    tags: ["Android", "value", "performance"],
    image: "https://source.unsplash.com/400x400/?poco,smartphone"
  },
  {
    id: 35,
    brand: "Redmi",
    title: "Note 12 Pro+",
    description: "200MP camera with 120W HyperCharge.",
    price: 399,
    tags: ["Android", "budget", "camera"],
    image: "https://source.unsplash.com/400x400/?redmi,smartphone"
  },
  {
    id: 36,
    brand: "iQOO",
    title: "11 5G",
    description: "Vivo sub-brand focused on performance and gaming.",
    price: 799,
    tags: ["Android", "gaming", "performance"],
    image: "https://source.unsplash.com/400x400/?iqoo,smartphone"
  },
  {
    id: 37,
    brand: "ROG",
    title: "Phone 6D Ultimate",
    description: "Asus gaming phone with MediaTek Dimensity 9000+.",
    price: 1299,
    tags: ["Android", "gaming", "performance"],
    image: "https://source.unsplash.com/400x400/?rog,gaming,phone"
  },
  {
    id: 38,
    brand: "Razer",
    title: "Phone 3",
    description: "Gaming phone with 144Hz display and vapor chamber cooling.",
    price: 999,
    tags: ["Android", "gaming", "display"],
    image: "https://source.unsplash.com/400x400/?razer,smartphone"
  },
  {
    id: 39,
    brand: "Essential",
    title: "PH-2",
    description: "Andy Rubin's modular phone concept (discontinued).",
    price: 699,
    tags: ["Android", "modular", "concept"],
    image: "https://source.unsplash.com/400x400/?essential,smartphone"
  },
  {
    id: 40,
    brand: "Palm",
    title: "Palm Phone (2023)",
    description: "Ultra-compact companion phone with Android.",
    price: 349,
    tags: ["Android", "compact", "companion"],
    image: "https://source.unsplash.com/400x400/?palm,smartphone"
  },
  {
    id: 41,
    brand: "Land Rover",
    title: "Explore R",
    description: "Rugged phone with thermal imaging and adventure features.",
    price: 899,
    tags: ["Android", "rugged", "outdoors"],
    image: "https://source.unsplash.com/400x400/?landrover,rugged"
  },
  {
    id: 42,
    brand: "Turing",
    title: "SpaceOS Phone",
    description: "Phone with built-in crypto wallet and security focus.",
    price: 1599,
    tags: ["Android", "security", "crypto"],
    image: "https://source.unsplash.com/400x400/?crypto,smartphone"
  },
  {
    id: 43,
    brand: "Sirin",
    title: "Finney U1",
    description: "Blockchain phone with cold storage wallet.",
    price: 899,
    tags: ["Android", "blockchain", "crypto"],
    image: "https://source.unsplash.com/400x400/?blockchain,smartphone"
  },
  {
    id: 44,
    brand: "Energizer",
    title: "Hard Case P28K",
    description: "Phone with massive 28,000mAh battery.",
    price: 599,
    tags: ["Android", "battery", "rugged"],
    image: "https://source.unsplash.com/400x400/?battery,smartphone"
  },
  {
    id: 45,
    brand: "Unihertz",
    title: "Titan Slim",
    description: "Modern phone with physical keyboard.",
    price: 299,
    tags: ["Android", "keyboard", "compact"],
    image: "https://source.unsplash.com/400x400/?keyboard,smartphone"
  },
  {
    id: 46,
    brand: "Doogee",
    title: "S100 Pro",
    description: "Rugged phone with night vision camera.",
    price: 499,
    tags: ["Android", "rugged", "night vision"],
    image: "https://source.unsplash.com/400x400/?rugged,smartphone"
  },
  {
    id: 47,
    brand: "Ulefone",
    title: "Armor 14",
    description: "Rugged phone with 10,000mAh battery.",
    price: 399,
    tags: ["Android", "rugged", "battery"],
    image: "https://source.unsplash.com/400x400/?armor,smartphone"
  },
  {
    id: 48,
    brand: "Blackview",
    title: "BL9000",
    description: "Foldable rugged phone with dual screens.",
    price: 899,
    tags: ["Android", "rugged", "foldable"],
    image: "https://source.unsplash.com/400x400/?foldable,smartphone"
  },
  {
    id: 49,
    brand: "Oukitel",
    title: "WP20 Pro",
    description: "Affordable rugged phone with 5G.",
    price: 299,
    tags: ["Android", "rugged", "5G"],
    image: "https://source.unsplash.com/400x400/?oukitel,smartphone"
  },
  {
    id: 50,
    brand: "Cubot",
    title: "KingKong 9",
    description: "Budget rugged phone with thermal camera.",
    price: 249,
    tags: ["Android", "rugged", "budget"],
    image: "https://source.unsplash.com/400x400/?cubot,smartphone"
  }
];

export default products;

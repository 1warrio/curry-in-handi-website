// ---------------------------------------------------------------------------
// Structured menu data. Update dish names, descriptions, tags, and prices
// here — the Menu page and homepage "Explore the Menu" section both read
// from this single source. Prices are placeholders until the client
// supplies current menu pricing.
// ---------------------------------------------------------------------------

export type DietaryTag =
  | "HALAL"
  | "VEGETARIAN"
  | "VEGAN"
  | "GLUTEN-FREE"
  | "SWEET"
  | "SPICY"
  | "CHEF's SPECIAL"
  ;

export type MenuItem = {
  name: string;
  description: string;
  tags?: DietaryTag[];
  price: string;
  popular?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: "appetizers",
    name: "Appetizers",
    items: [
      {
        name: "Vegetable Samosa",
        description: "Crisp pastry filled with spiced potatoes and peas, served with tamarind and mint chutney.",
        tags: ["VEGETARIAN"],
        price: "$8.95",
        popular: true,
      },
      {
        name: "Chicken Pakora",
        description: "Boneless chicken pieces battered in chickpea flour and fried until golden.",
        tags: ["HALAL", "SPICY"],
        price: "$8.95",
      },
      {
        name: "Vegetable Pakora",
        description: "Assorted vegetables dipped in a light chickpea batter, fried crisp.",
        tags: ["VEGETARIAN"],
        price: "$7.95",
      },
      {
        name: "Chicken 65",
        description: "Spiced, deep-fried chicken bites tossed with curry leaves and green chili.",
        tags: ["HALAL", "SPICY"],
        price: "$10.95",
      },
      {
        name: "Papadum",
        description: "Thin, crisp lentil wafers served with chutney.",
        tags: ["VEGETARIAN"],
        price: "$6.95",
      },
    ],
  },
  {
    id: "tandoor",
    name: "Tandoor",
    items: [
      {
        name: "Chicken Tikka",
        description: "Boneless chicken marinated in yogurt and spices, cooked in the clay tandoor.",
        tags: ["HALAL", "CHEF's SPECIAL"],
        price: "$18.99",
        popular: true,
      },
      {
        name: "Tandoori Chicken",
        description: "Bone-in chicken marinated overnight and roasted over charcoal in the tandoor.",
        tags: ["HALAL", "SPICY"],
        price: "$17.95",
      },
      {
        name: "Seekh Kebab",
        description: "Ground meat skewers seasoned with herbs and spices, grilled in the tandoor.",
        tags: ["HALAL"],
        price: "$19.45",
      },
      {
        name: "Tandoori Shrimp",
        description: "Shrimp marinated in tandoori spices and yogurt, char-grilled to order.",
        tags: ["HALAL", "SPICY"],
        price: "$18.95",
      },
      {
        name: "Tandoori Mixed Grill",
        description: "A selection of tandoor specialties served together on a sizzling platter.",
        tags: ["HALAL"],
        price: "$23.95",
      },
    ],
  },
  {
    id: "biryani",
    name: "Biryani",
    items: [
      {
        name: "Chicken Biryani",
        description: "Basmati rice layered with marinated chicken and whole spices, finished on slow dum.",
        tags: ["HALAL", "GLUTEN-FREE", "SPICY", "CHEF's SPECIAL"],
        price: "$17.95",
        popular: true,
      },
      {
        name: "Lamb Biryani",
        description: "Basmati rice layered with tender lamb, caramelized onion, and fragrant spices.",
        tags: ["HALAL", "GLUTEN-FREE", "SPICY"],
        price: "$18.95",
      },
      {
        name: "Goat Biryani",
        description: "Slow-cooked goat layered with basmati rice and traditional biryani spices.",
        tags: ["HALAL", "GLUTEN-FREE", "SPICY"],
        price: "$18.95",
      },
      {
        name: "Mixed Vegetable Biryani",
        description: "Basmati rice layered with seasonal vegetables and aromatic whole spices.",
        tags: ["VEGETARIAN", "GLUTEN-FREE"],
        price: "$15.95",
      },
      {
        name: "Shrimp Biryani",
        description: "Basmati rice layered with shrimp, herbs, and traditional biryani spices.",
        tags: ["HALAL", "GLUTEN-FREE", "SPICY"],
        price: "$19.95",
      },
    ],
  },
  {
    id: "chicken",
    name: "Chicken",
    items: [
      {
        name: "Butter Chicken",
        description: "Tandoor-roasted chicken simmered in a mildly spiced tomato and butter sauce.",
        tags: ["HALAL", "CHEF's SPECIAL"],
        price: "$15.95",
        popular: true,
      },
      {
        name: "Chicken Tikka Masala",
        description: "Grilled chicken tikka finished in a spiced curry sauce.",
        tags: ["HALAL", "SPICY", "CHEF's SPECIAL"],
        price: "$15.95",
        popular: true,
      },
      {
        name: "Chicken Korma",
        description: "Chicken simmered in a mild, creamy sauce with cashew and aromatic spices.",
        tags: ["HALAL"],
        price: "$15.95",
      },
      {
        name: "Chicken Curry",
        description: "Bone-in chicken cooked in a traditional onion and tomato masala.",
        tags: ["HALAL", "SPICY"],
        price: "$15.95",
      },
      {
        name: "Chicken Vindaloo",
        description: "Chicken cooked in a fiery, tangy vindaloo sauce.",
        tags: ["HALAL"],
        price: "$15.95",
      },
    ],
  },
  {
    id: "lamb-goat",
    name: "Lamb & Goat",
    items: [
      {
        name: "Lamb Curry",
        description: "Tender lamb simmered in a rich, spiced onion and tomato gravy.",
        tags: ["HALAL", "SPICY", "CHEF's SPECIAL"],
        price: "$17.95",
        popular: true,
      },
      {
        name: "Lamb Kadhai",
        description: "Lamb cooked and braised in a masala of coarse ground spices with sauteed onion & bell peppers.",
        tags: ["HALAL"],
        price: "$17.95",
      },
      {
        name: "Goat Curry",
        description: "Bone-in goat slow-cooked with traditional whole spices.",
        tags: ["HALAL", "SPICY"],
        price: "$17.95",
      },
      {
        name: "Lamb Vindaloo",
        description: "Lamb cooked in a fiery, tangy vindaloo sauce.",
        tags: ["HALAL"],
        price: "$17.95",
      },
      {
        name: "Shah Jahan's Lamb Shank",
        description: "Peice of Lamb led that become tender & juicy w. slow-cooked spices served on a bed o curry sauce.",
        tags: ["HALAL"],
        price: "$20.95",
      },
    ],
  },
  {
    id: "vegetarian",
    name: "Vegetarian",
    items: [
      {
        name: "Dal Makhani",
        description: "Black lentils and kidney beans slow-simmered with butter and cream.",
        tags: ["VEGETARIAN", "GLUTEN-FREE", "CHEF's SPECIAL"],
        price: "$13.95",
        popular: true,
      },
      {
        name: "Palak Paneer",
        description: "Fresh paneer cheese in a spiced, pureed spinach sauce.",
        tags: ["VEGETARIAN", "GLUTEN-FREE"],
        price: "$13.95",
      },
      {
        name: "Chana Masala",
        description: "Chickpeas simmered in a spiced tomato and onion masala.",
        tags: ["VEGAN", "GLUTEN-FREE", "SPICY", "CHEF's SPECIAL"],
        price: "$13.95",
        popular: true,
      },
      {
        name: "Malai Kofta",
        description: "Vegetable and paneer dumplings served in a mildly sweet, creamy sauce.",
        tags: ["VEGETARIAN"],
        price: "$13.95",
      },
      {
        name: "Baingan Bharta",
        description: "Smoked and mashed eggplant cooked with onion, tomato, and spices.",
        tags: ["VEGAN", "GLUTEN-FREE"],
        price: "$14.95",
      },
    ],
  },
  {
    id: "seafood",
    name: "Seafood",
    items: [
      {
        name: "Shrimp / Scallops Curry",
        description: "Shrimp / Scallops cooked in a chef's special sweet and spicy gravy.",
        tags: ["SPICY"],
        price: "$18.95 / $20.95",
      },
      {
        name: "Shrimp / Scallops Tikka Masala",
        description: "Shrimp / Scallops simmered in a spiced tomato-based curry.",
        tags: ["SPICY"],
        price: "$17.95",
      },
      {
        name: "Fish Curry",
        description: "Fish simmered in a traditional tangy and spiced curry sauce.",
        tags: [],
        price: "$17.95",
      },
      {
        name: "Shrimp Saagwala",
        description: "Shrimp cooked in creamy spinach gravy perfumed with cinnamon and cumin seeds.",
        tags: [],
        price: "$17.95",
      },
      {
        name: "Goan Fish / Goan Shrimp Curry",
        description: "Salmon Fish / Shrimp cooked in a special pan with coconut and curry leaves.",
        tags: [],
        price: "$17.95",
      },
      {
        name: "Banana Leaves Fish",
        description: "Salmon Fish steamed filet in banana leaves with coriander, chili, and coconut.",
        tags: ["CHEF's SPECIAL"],
        price: "$19.95",
      },
      {
        name: "Fish Tikka Masala",
        description: "Salmon Fish enveloped in a creamy tomato sauce.",
        tags: ["SPICY"],
        price: "$17.95",
      },
    ],
  },
  {
    id: "breads",
    name: "Breads",
    items: [
      {
        name: "Naan",
        description: "Classic leavened bread baked fresh in the tandoor.",
        tags: ["GLUTEN-FREE"],
        price: "$2.95",
      },
      {
        name: "Garlic Naan",
        description: "Naan topped with fresh garlic and herbs.",
        tags: ["GLUTEN-FREE"],
        price: "$3.95",
        popular: true,
      },
      {
        name: "Butter Naan",
        description: "Naan brushed with butter straight from the tandoor.",
        tags: ["GLUTEN-FREE"],
        price: "$2.95",
      },
      {
        name: "Roti",
        description: "Whole wheat flatbread baked in the tandoor.",
        tags: ["GLUTEN-FREE"],
        price: "$2.95",
      },
      {
        name: "Paratha",
        description: "Layered whole wheat flatbread, pan-cooked until flaky.",
        tags: ["GLUTEN-FREE"],
        price: "$3.95",
      },
      {
        name: "Cheese Naan",
        description: " Naan stuffed with cheese ",
        tags:["GLUTEN-FREE"],
        price:"$4.95",
      }
    ],
  },
  {
    id: "rice",
    name: "Rice",
    items: [
      {
        name: "Steamed Basmati Rice",
        description: "Fragrant long-grain basmati rice, steamed.",
        tags: ["GLUTEN-FREE"],
        price: "$2.95",
      },
      {
        name: "Jeera Rice",
        description: "Basmati rice tempered with cumin seeds.",
        tags: ["GLUTEN-FREE"],
        price: "$4.95",
      },
      {
        name:"Brown Rice",
        description: "Steamed Brown rice",
        tags: ["GLUTEN-FREE"],
        price:"$4.95",
      },
      {
        name:"Kashmiri Pulao",
        description:"Rice mixed with assorted fruits",
        tags:["GLUTEN-FREE"],
        price:"$5.95",
      },
      {
        name:"Lemon Rice",
        description:"Rice flavored with Lemon",
        tags:["GLUTEN-FREE"],
        price:"$4.95",
      },
      {
        name:"Peas Pulao Rice",
        description:"Steamed rice",
        tags:["GLUTEN-FREE"],
        price:"$4.95",
      },

    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      {
        name: "Gulab Jamun",
        description: "Warm milk dumplings soaked in rose-scented sugar syrup.",
        tags: ["GLUTEN-FREE", "SWEET"],
        price: "$4.95",
      },
      {
        name: "Anar Ka Kheer",
        description: "Traditional rice pudding slow-cooked with coconut milk, raisins, nuts and Pomegranate.",
        tags: ["GLUTEN-FREE", "SWEET"],
        price: "$4.95",
      },
      {
        name:"Gajar ka Halwa",
        description:"Summer grated carrots worked with milk and sugar",
        tags:["GLUTEN-FREE", "SWEET"],
        price:"$4.95",
      },
      {
        name:"Orange Panna COtta",
        description:"Orange Pudding",
        tags:["GLUTEN-FREE", "SWEET"],
        price:"$5.95",
      },
      {
        name:"Rasmalai",
        description:"Dainty Cheesecakes in Cream Sauce",
        tags:["GLUTEN-FREE", "SWEET"],
        price:"$5.95",
      },
    ],
  },
  {
    id: "drinks",
    name: "Drinks — The Halal Bar",
    items: [
      {
        name: "Mango Lassi",
        description: "Yogurt-based drink blended with sweet mango.",
        tags: ["SWEET", "CHEF's SPECIAL"],
        price: "$4.95",
        popular: true,
      },
      {
        name: "Sweet or Salted Lassi",
        description: "Traditional churned yogurt drink.",
        tags: [],
        price: "$4.95",
      },
      {
        name: "Signature Mocktail",
        description: "A rotating, handcrafted non-alcoholic specialty drink from the Halal Bar menu — 0.0% ALCOHOL.",
        tags: [],
        price: "$5.95",
      },
      {
        name: "Masala Chai",
        description: "Black tea simmered with milk and warming spices.",
        tags: ["SWEET"],
        price: "$4.95",
      },
      {
        name: "Soft Drinks",
        description: "Assorted bottled and fountain soft drinks.",
        tags: [],
        price: "$1.95",
      },
       {
        name: "Fresh Juice (Apple, Orange)",
        description: "Chilled Seasonal Fresh Juice",
        tags: [],
        price: "$4.95",
      },
       {
        name: "Martinelli's Gold Medal Apple Juice",
        description: "",
        tags: [],
        price: "$4.95",
      },
       {
        name: "Bottle Water",
        description: "",
        tags: [],
        price: "$1.95",
      },
       {
        name: "Perrier",
        description: "",
        tags: [],
        price: "$3.95",
      },
      
    ],
  },
  {
    id: "SPARKLING BEVERAGE",
    name: "SPARKLING BEVERAGE",
    items: [
       {
        name: "La Croix (Original, Lime, Cococut, Razz Cranberry, Pamplemousse)",
        description: "",
        tags: [],
        price: "$1.95",
      },

       { 
      name: "Perrier",
        description: "",
        tags: [],
        price: "$3.95",
      },
       {
        name: "Saratoga",
        description: "",
        tags: [],
        price: "$5.95",
      },
       {
        name: "Sparkling Cider",
        description: "",
        tags: [],
        price: "$9.95",
      },
       {
        name: "Sparkling Apple Cranberry",
        description: "",
        tags: [],
        price: "$9.95",
      },
       {
        name: "Sparkling Apple Grape",
        description: "",
        tags: [],
        price: "$9.95",
      },
    ], 
  },
];

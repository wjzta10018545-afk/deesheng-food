import sauceCatalog from "./sauce-catalog.json";

export type CatalogItem = {
  name: string;
  group: string;
  packing: string;
  shelfLife: string;
  storage: string;
  image?: string;
  detailSlug?: string;
};

export type CatalogCategory = {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  description: string;
  buyerNote: string;
  image: string;
  imageAlt: string;
  items: CatalogItem[];
};

const saucePacks = "200 g × 24; 350 g × 24; 400 g × 30; 1 kg × 12";
const pouchPack = "1 kg pouch × 12";
const dryPack = "Retail bottle/pouch; 1 kg foodservice pouch";

const sauce = (name: string, group: string, packing = saucePacks, detailSlug?: string): CatalogItem => ({
  name,
  group,
  packing,
  shelfLife: "12 months",
  storage: "Ambient",
  detailSlug,
});

const dry = (name: string, group: string, packing = dryPack, detailSlug?: string): CatalogItem => ({
  name,
  group,
  packing,
  shelfLife: "12 months",
  storage: "Ambient",
  detailSlug,
});

const catalogCategorySource: CatalogCategory[] = [
  {
    slug: "korean-sauces",
    name: "Korean Sauces",
    shortName: "Sauces",
    eyebrow: "Retail & foodservice",
    description:
      "A broad Korean-style sauce portfolio for supermarkets, restaurant chains, central kitchens, distributors and private-label brands.",
    buyerNote:
      "Choose a proven export formula or request flavor adjustment for your channel and target market.",
    image: "/media/fried-chicken-sauces.webp",
    imageAlt: "Korean fried chicken and foodservice sauce range",
    items: [
      sauce("Stone Pot Bibimbap Sauce — Spicy", "Bibimbap", saucePacks, "bibimbap-sauce"),
      sauce("Stone Pot Bibimbap Sauce — Non-Spicy", "Bibimbap"),
      sauce("Classic Buldak Sauce", "Buldak", saucePacks, "classic-buldak-sauce"),
      sauce("Creamy Buldak Sauce", "Buldak", saucePacks, "creamy-buldak-sauce"),
      sauce("Cheese Buldak Sauce", "Buldak"),
      sauce("Sesame Paste Buldak Sauce", "Buldak"),
      sauce("Mild Spicy Buldak Sauce", "Buldak"),
      sauce("Non-Spicy Buldak Sauce", "Buldak"),
      sauce("Tteokbokki Sauce — Original", "Street Food", saucePacks, "tteokbokki-sauce"),
      sauce("Tteokbokki Sauce — Creamy", "Street Food"),
      sauce("Korean BBQ Sauce — Marinating / Dipping / Grilling", "BBQ", saucePacks, "korean-bbq-sauce"),
      sauce("Korean BBQ Dipping Paste", "BBQ"),
      sauce("Korean BBQ Dipping Dressing", "BBQ"),
      sauce("Korean Sweet & Spicy Fried Chicken Sauce", "Fried Chicken", saucePacks, "sweet-spicy-fried-chicken-sauce"),
      sauce("Soy Garlic Fried Chicken Sauce", "Fried Chicken", saucePacks, "soy-garlic-fried-chicken-sauce"),
      sauce("Amber Fried Chicken Sauce", "Fried Chicken"),
      sauce("Yuzu Fried Chicken Sauce", "Fried Chicken"),
      sauce("Honey Mustard Sauce", "Fried Chicken", "180 g × 24; 320 g × 24; 360 g × 24; 1 kg × 12", "honey-mustard-sauce"),
      sauce("Yogurt Cheese Fried Chicken Sauce", "Fried Chicken", "180 g × 24; 320 g × 24; 360 g × 24; 1 kg × 12"),
      sauce("Creamy Cheese Fried Chicken Sauce", "Fried Chicken", "180 g × 24; 320 g × 24; 360 g × 24; 1 kg × 12"),
      sauce("Sweet & Sour Fried Chicken Sauce", "Fried Chicken"),
      sauce("Extra Hot Fried Chicken Sauce", "Fried Chicken"),
      sauce("Spicy Fried Chicken Sauce", "Fried Chicken"),
      sauce("Mala Fried Chicken Sauce", "Fried Chicken"),
      sauce("Jajangmyeon Sauce — Sweet / Mild Spicy", "Noodle", "100 g pouch × 100; 1 kg pouch × 12"),
      sauce("Cold Noodle Dressing", "Noodle", "100 g pouch × 100; 1 kg pouch × 12"),
      sauce("Korean Cold Noodle Sauce", "Noodle", pouchPack),
      sauce("Spicy Seafood Noodle Sauce", "Noodle", pouchPack),
      sauce("Budae Jjigae Sauce", "Soup & Stew"),
      sauce("Soft Tofu Stew Sauce", "Soup & Stew", pouchPack),
      sauce("Spicy Beef Soup Sauce", "Soup & Stew", pouchPack),
      sauce("Doenjang Soup Sauce", "Soup & Stew", pouchPack),
      sauce("Kimchi Sauce", "Soup & Stew", pouchPack),
      sauce("Teriyaki Sauce", "Cooking Sauce"),
      sauce("Angus Beef Sauce", "Cooking Sauce", pouchPack),
      sauce("Teppanyaki Sauce", "Cooking Sauce", pouchPack),
      sauce("Spicy Chicken Feet Sauce", "Cooking Sauce", pouchPack),
      sauce("Korean Spicy Stir-Fry Sauce", "Cooking Sauce", pouchPack),
      sauce("Spicy Pork Belly Sauce", "Cooking Sauce", pouchPack),
      sauce("Japchae Sauce", "Cooking Sauce", pouchPack),
      sauce("Black Pepper Sauce", "Cooking Sauce", pouchPack),
      sauce("Korean Spicy Crab & Raw Marinade Sauce", "Cooking Sauce", pouchPack),
      sauce("Korean Meat Marinade", "Cooking Sauce", pouchPack),
      sauce("Tomato Basil Pasta Sauce", "International"),
      sauce("Pizza Sauce", "International"),
      sauce("Thai Sweet Chili Sauce", "International"),
      sauce("Tomato Ketchup", "International", "6 g / 9 g sachet; 500 g bottle; 1 kg pouch"),
      sauce("Crispy Chili Oil with Chili Flakes", "Chili Oil", "210 g bottle × 12; 1 kg pouch × 12"),
      sauce("Nut Chili Oil", "Chili Oil", "210 g bottle × 12; 1 kg pouch × 12"),
      sauce("Mala Xiang Guo Sauce", "Chili Oil", "240 g bottle × 12; 1 kg pouch × 12"),
      sauce("Dry Pot Sauce", "Chili Oil", "240 g bottle × 12; 1 kg pouch × 12"),
      sauce("Red Chili Oil", "Chili Oil", "1 kg pouch × 12"),
    ],
  },
  {
    slug: "gochujang-pastes",
    name: "Gochujang & Korean Pastes",
    shortName: "Pastes",
    eyebrow: "Korean essentials",
    description:
      "Core Korean fermented-style pastes in retail tubs and foodservice cartons for import, distribution and menu production.",
    buyerNote:
      "Retail 500 g tubs and 14 kg foodservice formats support both supermarket and restaurant channels.",
    image: "/media/gochujang.webp",
    imageAlt: "Gochujang, doenjang and Korean garlic sauce packaging",
    items: [
      sauce("Gochujang — Korean Chili Paste", "Korean Paste", "500 g tub × 20; 14 kg carton", "gochujang"),
      sauce("Extra Hot Gochujang", "Korean Paste", "500 g tub × 20; 14 kg carton", "extra-hot-gochujang"),
      sauce("Doenjang — Korean Soybean Paste", "Korean Paste", "500 g tub × 20; 14 kg carton"),
      sauce("Korean Garlic Sauce", "Korean Paste", "500 g tub × 20; 14 kg carton", "korean-garlic-sauce"),
    ],
  },
  {
    slug: "chili-seasonings",
    name: "Chili Powder & Dry Seasonings",
    shortName: "Seasonings",
    eyebrow: "Dry ingredients",
    description:
      "Korean chili powders, sesame products, coating mixes and dry seasonings for retail, foodservice and further processing.",
    buyerNote:
      "Tell us the required mesh, color, heat level and application when sourcing chili powder.",
    image: "/media/seasonings.webp",
    imageAlt: "Korean chili powder, sesame and dry seasoning products",
    items: [
      dry("Coarse Chili Powder — Grade A", "Chili Powder", "100 g × 110; 200 g × 60; 1 kg × 10", "coarse-korean-chili-powder"),
      dry("Fine Chili Powder — Grade A", "Chili Powder", "100 g × 110; 200 g × 60; 1 kg × 10", "fine-korean-chili-powder"),
      dry("Shichimi Togarashi", "Spices", "17 g bottle; 300 g pouch; 1 kg pouch"),
      dry("Sansho Pepper Powder", "Spices", "14 g bottle; 100 g pouch; 1 kg pouch"),
      dry("Roasted White Sesame Seeds", "Sesame", "200 g bottle × 60; 1 kg pouch × 10"),
      dry("Roasted Black Sesame Seeds", "Sesame", "200 g bottle × 60; 1 kg pouch × 10"),
      dry("Perilla Seed Powder", "Spices", "180 g bottle × 60; 1 kg pouch × 10"),
      dry("Beef Seasoning Powder", "Foodservice Mix", "1 kg pouch × 10"),
      dry("Crispy Frying Mix", "Fried Chicken System", "1 kg pouch × 10"),
      dry("Korean Pancake Mix", "Foodservice Mix", "1 kg pouch × 10"),
      dry("Fried Chicken Coating Mix", "Fried Chicken System", "1 kg pouch × 10", "fried-chicken-coating-mix"),
      dry("Fried Chicken Marinade Seasoning", "Fried Chicken System", "1 kg pouch × 10"),
      dry("Snow Cheese Powder", "Fried Chicken System", "1 kg pouch × 10"),
    ],
  },
  {
    slug: "kimchi",
    name: "Korean Kimchi",
    shortName: "Kimchi",
    eyebrow: "Refrigerated range",
    description:
      "Korean-style cabbage, radish and specialty kimchi for retail, wholesale and foodservice distribution.",
    buyerNote:
      "Kimchi requires a refrigerated supply chain. Shelf life varies by product and final specification.",
    image: "/media/kimchi.webp",
    imageAlt: "Korean cabbage, radish and specialty kimchi range",
    items: [
      { name: "Korean Cabbage Kimchi — 1 kg", group: "Cabbage", packing: "1 kg bag × 10", shelfLife: "4–6 months", storage: "0–4°C", detailSlug: "korean-cabbage-kimchi" },
      { name: "Korean Cabbage Kimchi — 10 kg", group: "Cabbage", packing: "10 kg carton; whole or cut", shelfLife: "4–6 months", storage: "0–4°C" },
      { name: "Green Onion Kimchi", group: "Specialty Kimchi", packing: "300 g bag × 30", shelfLife: "4–6 months", storage: "0–4°C" },
      { name: "Chili Pepper Kimchi", group: "Specialty Kimchi", packing: "200 g bag × 40", shelfLife: "4–6 months", storage: "0–4°C" },
      { name: "Young Radish Kimchi", group: "Radish", packing: "500 g bag × 20", shelfLife: "4–6 months", storage: "0–4°C" },
      { name: "Diced Radish Kimchi", group: "Radish", packing: "500 g bag × 20", shelfLife: "4–6 months", storage: "0–4°C" },
      { name: "Sweet & Sour Radish", group: "Radish", packing: "2 kg bag × 6; 100 g tub × 100", shelfLife: "4 months", storage: "Refrigerated" },
      { name: "Soy Sauce Radish", group: "Radish", packing: "500 g bag × 20", shelfLife: "4–6 months", storage: "0–4°C" },
      { name: "Soy Sauce Perilla Leaves", group: "Specialty Kimchi", packing: "500 g bag × 20", shelfLife: "4–6 months", storage: "0–4°C" },
      { name: "Mixed Chili Kimchi", group: "Specialty Kimchi", packing: "2 kg bag × 6", shelfLife: "6 months", storage: "0–10°C" },
      { name: "Sweet & Sour Garlic Scapes", group: "Specialty Kimchi", packing: "2 kg bag × 6", shelfLife: "6 months", storage: "0–10°C" },
      { name: "Seasoned Dried Radish", group: "Radish", packing: "2 kg bag × 6", shelfLife: "6 months", storage: "0–10°C" },
    ],
  },
  {
    slug: "frozen-vegetables",
    name: "Frozen Vegetables",
    shortName: "Frozen",
    eyebrow: "Frozen at −18°C",
    description:
      "Frozen vegetables for bibimbap, central kitchens, foodservice distribution and industrial food production.",
    buyerNote:
      "Frozen vegetable pricing is confirmed against the selected item, cut, grade, pack and current raw-material market.",
    image: "/media/frozen-vegetables.webp",
    imageAlt: "Frozen spinach, carrots, mushrooms and vegetables for bibimbap",
    items: [
      { name: "Seasoned Frozen Mushrooms", group: "Bibimbap", packing: "500 g bag × 20", shelfLife: "12 months", storage: "−18°C" },
      { name: "Frozen Spinach", group: "Bibimbap", packing: "500 g bag × 20", shelfLife: "12 months", storage: "−18°C", detailSlug: "frozen-spinach" },
      { name: "Frozen Carrots", group: "Bibimbap", packing: "500 g bag × 20", shelfLife: "12 months", storage: "−18°C" },
      { name: "Frozen Zucchini", group: "Bibimbap", packing: "500 g bag × 20", shelfLife: "12 months", storage: "−18°C" },
      { name: "Frozen Corn Kernels", group: "Vegetables", packing: "500 g bag × 20", shelfLife: "12 months", storage: "−18°C" },
      { name: "Frozen Broccoli", group: "Vegetables", packing: "1 kg × 10; 2.5 kg × 4; 10 kg carton", shelfLife: "12 months", storage: "−18°C", detailSlug: "frozen-broccoli" },
      { name: "Diced Frozen Onions", group: "Vegetables", packing: "1 kg × 10; 2.5 kg × 4; 10 kg carton", shelfLife: "12 months", storage: "−18°C" },
      { name: "Chopped Frozen Scallions", group: "Vegetables", packing: "1 kg × 10; 2.5 kg × 4; 10 kg carton", shelfLife: "12 months", storage: "−18°C" },
      { name: "Diced Frozen Potatoes", group: "Vegetables", packing: "1 kg × 10; 2.5 kg × 4; 10 kg carton", shelfLife: "12 months", storage: "−18°C" },
      { name: "Mixed Frozen Vegetables", group: "Vegetables", packing: "1 kg × 10; 2.5 kg × 4; 10 kg carton", shelfLife: "12 months", storage: "−18°C" },
      { name: "Frozen Green Peas", group: "Vegetables", packing: "1 kg × 10; 2.5 kg × 4; 10 kg carton", shelfLife: "12 months", storage: "−18°C" },
      { name: "Tri-Color Frozen Bell Peppers", group: "Vegetables", packing: "1 kg × 10; 2.5 kg × 4; 10 kg carton", shelfLife: "12 months", storage: "−18°C" },
    ],
  },
  {
    slug: "oils-ingredients",
    name: "Cooking Oils & Korean Essentials",
    shortName: "Ingredients",
    eyebrow: "Foodservice essentials",
    description:
      "Sesame and perilla oils, syrups, seaweed and Korean cooking staples for retail and foodservice buyers.",
    buyerNote:
      "Multiple retail, foodservice and bulk formats are available; final packing is confirmed by product.",
    image: "/media/oils.webp",
    imageAlt: "Sesame oil, perilla oil and Korean cooking ingredients",
    items: [
      dry("Pure Sesame Oil", "Cooking Oil", "180 ml; 245 ml; 500 ml; 1 L; 1.8 L; 5 L; 16.5 kg", "pure-sesame-oil"),
      dry("Blended Sesame Oil — 50:50", "Cooking Oil", "180 ml; 245 ml; 1 L; 1.8 L; 5 L; 16.5 kg"),
      dry("Perilla Seed Oil", "Cooking Oil", "180 ml; 245 ml; 1 L; 1.8 L; 5 L; 16.5 kg"),
      dry("Corn Syrup", "Syrup", "13.5 kg pail"),
      dry("Baking Syrup", "Syrup", "13.5 kg pail"),
      dry("Seasoned Seaweed Flakes with Sesame", "Seaweed", "500 g pouch × 10"),
      dry("Seaweed Flakes — No Sesame", "Seaweed", "500 g pouch × 10"),
      dry("Dried Wakame", "Seaweed", "100 g bag × 24"),
      dry("Jajangmyeon Noodles", "Noodles", "500 g bag; carton quantity confirmed per order"),
      dry("Rice Cake Strips", "Rice Cake", "1 kg bag; carton quantity confirmed per order"),
    ],
  },
];

const sourceCategory = (slug: string) => {
  const category = catalogCategorySource.find((item) => item.slug === slug);
  if (!category) throw new Error(`Missing catalogue category: ${slug}`);
  return category;
};

const sauceSource = sourceCategory("korean-sauces");
const kimchiSource = sourceCategory("kimchi");
const chiliSource = sourceCategory("chili-seasonings");
const frozenSource = sourceCategory("frozen-vegetables");

type BrochureRow = readonly [name: string, group: string, image: string, packing?: string, detailSlug?: string];

const brochureItems = (
  folder: string,
  rows: readonly BrochureRow[],
  defaults: Pick<CatalogItem, "packing" | "shelfLife" | "storage">,
): CatalogItem[] => rows.map(([name, group, image, packing, detailSlug]) => ({
  name,
  group,
  image: `/media/catalog-products/${folder}/${image}.webp`,
  packing: packing ?? defaults.packing,
  shelfLife: defaults.shelfLife,
  storage: defaults.storage,
  detailSlug,
}));

type SauceCatalogSourceItem = {
  name: string;
  group: string;
  image: string;
  packing: string;
  shelfLife?: string;
  storage?: string;
  detailSlug: string | null;
};

const sauceBrochureItems: CatalogItem[] = (sauceCatalog as SauceCatalogSourceItem[]).map((item) => ({
  name: item.name,
  group: item.group,
  image: `/media/catalog-products/sauces/${item.image}.webp`,
  packing: item.packing,
  shelfLife: item.shelfLife ?? "12 months",
  storage: item.storage ?? "Ambient",
  detailSlug: item.detailSlug ?? undefined,
}));

const chiliBrochureItems = brochureItems("chili", [
  ["Sweet Paprika — With Stem / Stemless", "Whole Dried Chilies", "sweet-paprika"],
  ["Yidu Chili — With Stem / Stem-cut / Stemless", "Whole Dried Chilies", "yidu-chili"],
  ["Jinta Chili — With Stem / Stemless", "Whole Dried Chilies", "jinta-chili"],
  ["Tanying Chili — Stemless", "Whole Dried Chilies", "tanying-chili"],
  ["Yunnan Chili — With Stem / Stemless", "Whole Dried Chilies", "yunnan-chili"],
  ["Dry Xian Chili — With Stem / Stemless", "Whole Dried Chilies", "dry-xian-chili"],
  ["Teja / S-17 Chili — With Stem / Stemless", "Whole Dried Chilies", "teja-s17-chili"],
  ["Sanam / S-4 Chili — With Stem / Stemless", "Whole Dried Chilies", "sanam-s4-chili"],
  ["Paprika Powder — 20–240 ASTA", "Paprika Ingredients", "paprika-powder"],
  ["Paprika Crushed — With / Without Seeds", "Paprika Ingredients", "paprika-crushed"],
  ["Paprika Flakes — With / Without Seeds", "Paprika Ingredients", "paprika-flakes"],
  ["Paprika Chopped — 180–240 ASTA", "Paprika Ingredients", "paprika-chopped"],
  ["Chili Powder — 3,000–50,000 SHU", "Chili Powder & Flakes", "chili-powder"],
  ["Chili Crushed — With / Without Seeds", "Chili Powder & Flakes", "chili-crushed"],
  ["Chili Flakes — With / Without Seeds", "Chili Powder & Flakes", "chili-flakes"],
  ["Chili Chopped", "Chili Powder & Flakes", "chili-chopped"],
  ["Paprika / Chili Seeds", "Chili Cuts & Seeds", "paprika-chili-seeds"],
  ["Seed Powder", "Chili Cuts & Seeds", "seeds-powder"],
  ["Chili Segment", "Chili Cuts & Seeds", "chili-segment"],
  ["Chili Slice", "Chili Cuts & Seeds", "chili-slice"],
  ["Chili Ring", "Korean Seasonings", "chili-ring"],
  ["Shichimi", "Korean Seasonings", "shichimi"],
  ["Ichimi", "Korean Seasonings", "ichimi"],
  ["Korean Gochujang Powder", "Korean Seasonings", "korean-gochujang"],
  ["Fine Chili Powder — Retail Pack", "Packaged Dry Seasonings", "fine-chili-powder-packaged", "200 g × 60", "fine-korean-chili-powder"],
  ["Coarse Chili Powder — Retail Pack", "Packaged Dry Seasonings", "coarse-chili-powder-packaged", "200 g × 60", "coarse-korean-chili-powder"],
  ["Shichimi Togarashi — Foodservice Pack", "Packaged Dry Seasonings", "shichimi-togarashi-packaged", "300 g × 30"],
  ["Roasted White Sesame", "Packaged Dry Seasonings", "roasted-white-sesame-packaged", "200 g × 60"],
  ["Roasted Black Sesame", "Packaged Dry Seasonings", "roasted-black-sesame-packaged", "200 g × 60"],
  ["Perilla Seed Powder", "Packaged Dry Seasonings", "perilla-seed-powder-packaged", "200 g × 60"],
  ["Beef Seasoning Powder", "Packaged Dry Seasonings", "beef-seasoning-powder", "Foodservice pack; specification confirmed per order"],
] as const, { packing: "Bulk foodservice pack; specification confirmed per order", shelfLife: "12 months", storage: "Ambient; cool and dry" });

const kimchiBrochureItems = brochureItems("kimchi", [
  ["Cabbage Kimchi — Whole", "Cabbage Kimchi", "cabbage-kimchi-whole", "10 kg"],
  ["Cabbage Kimchi — Mat", "Cabbage Kimchi", "cabbage-kimchi-mat", "10 kg"],
  ["Cabbage Kimchi — Mini Mat", "Cabbage Kimchi", "cabbage-kimchi-mini-mat", "10 kg"],
  ["Cabbage Kimchi — Retail Jar", "Cabbage Kimchi", "cabbage-kimchi-mat-retail", "300 g / 400 g / 480 g / 1 kg", "korean-cabbage-kimchi"],
  ["White Kimchi", "Cabbage Kimchi", "white-kimchi", "10 kg"],
  ["Seasoned Pepper Kimchi", "Specialty Kimchi", "seasoned-pepper-kimchi", "5 kg / 10 kg"],
  ["Chonggak Kimchi", "Radish Kimchi", "chonggak-kimchi", "10 kg"],
  ["Spring Onion Kimchi", "Specialty Kimchi", "spring-onion-kimchi", "5 kg / 10 kg"],
  ["Kkakdugi Kimchi", "Radish Kimchi", "kkakdugi-kimchi", "10 kg"],
  ["Pickled Radish", "Pickled Vegetables", "pickled-radish", "2 kg × 6 bags"],
  ["Soy Sauce Perilla Leaves", "Pickled Vegetables", "soy-sauce-perilla-leaves", "10 kg"],
  ["Stir-fried Kimchi", "Specialty Kimchi", "stir-fried-kimchi", "5 kg / 10 kg"],
  ["Leaf Mustard Kimchi", "Specialty Kimchi", "leaf-mustard-kimchi", "5 kg"],
  ["Green Onion Kimchi", "Specialty Kimchi", "green-onion-kimchi", "5 kg / 10 kg"],
  ["Nabak Kimchi", "Radish Kimchi", "nabak-kimchi", "5 kg / 10 kg"],
  ["Yeolmu Kimchi", "Radish Kimchi", "yeolmu-kimchi", "10 kg"],
  ["Washed Kimchi", "Cabbage Kimchi", "washed-kimchi", "5 kg / 10 kg"],
  ["Sweet & Sour Green Onion", "Pickled Vegetables", "sweet-sour-green-onion", "10 kg"],
  ["Sweet & Sour Spring Onion", "Pickled Vegetables", "sweet-sour-spring-onion", "5 kg / 10 kg"],
  ["Soy Sauce Green Onion", "Pickled Vegetables", "soy-sauce-green-onion", "10 kg"],
  ["Soy Sauce Spring Onion", "Pickled Vegetables", "soy-sauce-spring-onion", "10 kg"],
  ["Pickled Lettuce", "Pickled Vegetables", "pickled-lettuce", "10 kg"],
  ["Pickled Yamakurage", "Pickled Vegetables", "pickled-yamakurage", "10 kg"],
  ["Sweet & Sour Yamakurage", "Pickled Vegetables", "sweet-sour-yamakurage", "5 kg / 10 kg"],
] as const, { packing: "Pack size confirmed per order", shelfLife: "Confirm for the selected SKU", storage: "Refrigerated; confirm SKU temperature" });

const frozenBrochureItems = brochureItems("frozen", [
  ["IQF Red Pepper — Dice / Slice", "Peppers & Aromatics", "iqf-red-pepper"],
  ["IQF Green Pepper — Dice / Slice", "Peppers & Aromatics", "iqf-green-pepper"],
  ["IQF Yellow Pepper — Dice / Slice", "Peppers & Aromatics", "iqf-yellow-pepper"],
  ["IQF Onion — Dice / Slice", "Peppers & Aromatics", "iqf-onion"],
  ["IQF Carrot — Dice / Slice", "Roots, Tubers & Squash", "iqf-carrot"],
  ["IQF Green Beans — Whole / Cut", "Beans, Peas & Corn", "iqf-green-beans"],
  ["IQF Spinach — Ball / Chopped", "Leafy & Green Vegetables", "iqf-spinach", undefined, "frozen-spinach"],
  ["IQF Pumpkin — Blanching / Steamed", "Roots, Tubers & Squash", "iqf-pumpkin"],
  ["IQF Garlic — Clove / Purée", "Peppers & Aromatics", "iqf-garlic"],
  ["IQF Ginger — Block / Purée", "Peppers & Aromatics", "iqf-ginger"],
  ["IQF Green Onion", "Peppers & Aromatics", "iqf-green-onion"],
  ["IQF Green Peas", "Beans, Peas & Corn", "iqf-green-peas"],
  ["IQF Broccoli", "Leafy & Green Vegetables", "iqf-broccoli", undefined, "frozen-broccoli"],
  ["IQF Cauliflower", "Leafy & Green Vegetables", "iqf-cauliflower"],
  ["IQF Chungyang Chili Rings", "Peppers & Aromatics", "iqf-chungyang-ring"],
  ["IQF Jalapeño", "Peppers & Aromatics", "iqf-jalapeno"],
  ["IQF Cabbage", "Leafy & Green Vegetables", "iqf-cabbage"],
  ["IQF Sweet Corn", "Beans, Peas & Corn", "iqf-sweet-corn"],
  ["IQF French Fries", "Roots, Tubers & Squash", "iqf-french-fries"],
  ["IQF Potato", "Roots, Tubers & Squash", "iqf-potato"],
  ["IQF Sugar Snap Peas", "Beans, Peas & Corn", "iqf-sugar-snap-peas"],
  ["IQF Green Asparagus", "Leafy & Green Vegetables", "iqf-green-asparagus"],
  ["IQF Soy Peas", "Beans, Peas & Corn", "iqf-soy-peas"],
  ["IQF Celery — Diced", "Leafy & Green Vegetables", "iqf-celery-diced"],
  ["IQF Spring Onion", "Peppers & Aromatics", "iqf-spring-onion"],
  ["IQF Rape Flower", "Leafy & Green Vegetables", "iqf-rape-flower"],
  ["3-way Mixed Vegetables", "Prepared & Mixed Vegetables", "iqf-3-way-mixed"],
  ["4-way Mixed Vegetables", "Prepared & Mixed Vegetables", "iqf-4-way-mixed"],
  ["California Mixed Vegetables", "Prepared & Mixed Vegetables", "california-mixed"],
  ["Pepper Dice Mix", "Prepared & Mixed Vegetables", "pepper-dice-mixed"],
  ["IQF Carrot Slices", "Roots, Tubers & Squash", "iqf-carrot-slice"],
  ["IQF Shredded Carrot", "Roots, Tubers & Squash", "iqf-shredded-carrot"],
  ["IQF Green Beans — Cut", "Beans, Peas & Corn", "iqf-green-beans-cut"],
  ["IQF Soybean", "Beans, Peas & Corn", "iqf-soybean"],
  ["IQF Broccoli Stems", "Leafy & Green Vegetables", "iqf-broccoli-stems"],
  ["IQF Sweet Corn Dice", "Beans, Peas & Corn", "iqf-sweet-corn-dice"],
  ["IQF Sweet Potato — Cut", "Roots, Tubers & Squash", "iqf-sweet-potato-cut"],
  ["IQF Lotus Root Slices", "Roots, Tubers & Squash", "iqf-lotus-root-slice"],
  ["IQF Lotus Root Block", "Roots, Tubers & Squash", "iqf-lotus-root-block"],
  ["IQF Water Chestnut Granules", "Roots, Tubers & Squash", "iqf-water-chestnut-granules"],
  ["IQF Water Chestnut Stems", "Roots, Tubers & Squash", "iqf-water-chestnut-stems"],
  ["IQF Water Chestnut Slices", "Roots, Tubers & Squash", "iqf-water-chestnut-slices"],
  ["IQF Fungus Block", "Mushrooms & Specialty Vegetables", "iqf-fungus-block"],
  ["IQF Mung Bean Sprouts", "Beans, Peas & Corn", "iqf-mung-bean-sprouts"],
  ["IQF Mushroom", "Mushrooms & Specialty Vegetables", "iqf-mushroom"],
  ["IQF Agaricus Bisporus", "Mushrooms & Specialty Vegetables", "iqf-agaricus-bisporus"],
  ["IQF Baby Corn", "Beans, Peas & Corn", "iqf-baby-corn"],
  ["IQF Baby Corn — Cut", "Beans, Peas & Corn", "iqf-baby-corn-cut"],
  ["IQF Okra", "Leafy & Green Vegetables", "iqf-okra"],
  ["IQF Chinese Chives", "Leafy & Green Vegetables", "iqf-chinese-chives"],
  ["IQF Yellow Zucchini Slices", "Roots, Tubers & Squash", "iqf-yellow-zucchini-slices"],
  ["IQF Zucchini Slices", "Roots, Tubers & Squash", "iqf-zucchini-slices"],
  ["IQF Zucchini Dices", "Roots, Tubers & Squash", "iqf-zucchini-dices"],
  ["IQF Broad Bean", "Beans, Peas & Corn", "iqf-broad-bean"],
  ["IQF Shepherd's Purse", "Leafy & Green Vegetables", "iqf-shepherds-purse"],
  ["IQF Boiled Peanuts", "Beans, Peas & Corn", "iqf-boiled-peanuts"],
  ["IQF Garlic — Diced", "Peppers & Aromatics", "iqf-garlic-diced"],
  ["IQF Garlic Purée", "Peppers & Aromatics", "iqf-garlic-puree"],
  ["IQF Ginger — Diced", "Peppers & Aromatics", "iqf-ginger-diced"],
  ["IQF Ginger Purée", "Peppers & Aromatics", "iqf-ginger-puree"],
  ["IQF Taro Purée Block", "Roots, Tubers & Squash", "iqf-taro-puree-block"],
  ["IQF Red Onion Dice", "Peppers & Aromatics", "iqf-red-onion-dice"],
  ["IQF Wave French Fries", "Roots, Tubers & Squash", "iqf-wave-french-fries"],
  ["IQF Chinese Cabbage Dice", "Leafy & Green Vegetables", "iqf-chinese-cabbage-dice"],
  ["IQF Green Radish Dice", "Roots, Tubers & Squash", "iqf-green-radish-dice"],
  ["IQF Green Radish Slices", "Roots, Tubers & Squash", "iqf-green-radish-slice"],
  ["IQF White Radish Dice", "Roots, Tubers & Squash", "iqf-white-radish-dice"],
  ["IQF White Radish Slices", "Roots, Tubers & Squash", "iqf-white-radish-slice"],
  ["IQF White Radish Block", "Roots, Tubers & Squash", "iqf-white-radish-block"],
  ["IQF Potato Purée", "Roots, Tubers & Squash", "iqf-potato-puree"],
  ["IQF Pumpkin Purée", "Roots, Tubers & Squash", "iqf-pumpkin-puree"],
  ["IQF Garlic Sprout", "Peppers & Aromatics", "iqf-garlic-sprout"],
  ["IQF Coriander Dice", "Leafy & Green Vegetables", "iqf-coriander-dice"],
  ["IQF Spinach Dice", "Leafy & Green Vegetables", "iqf-spinach-dice"],
  ["IQF Spinach Segment", "Leafy & Green Vegetables", "iqf-spinach-segment"],
  ["IQF Elm Seed", "Mushrooms & Specialty Vegetables", "iqf-elm-seed"],
  ["IQF Sophora Flower", "Mushrooms & Specialty Vegetables", "iqf-sophora-flower"],
  ["IQF Purple Sweet Potato", "Roots, Tubers & Squash", "iqf-purple-sweet-potato"],
  ["IQF Golden Potato Ball", "Roots, Tubers & Squash", "iqf-golden-potato-ball"],
  ["IQF Maple Leaf Pumpkin", "Roots, Tubers & Squash", "iqf-maple-leaf-pumpkin"],
  ["IQF Taro Ball", "Roots, Tubers & Squash", "iqf-taro-ball"],
  ["IQF Burdock Shred", "Roots, Tubers & Squash", "iqf-burdock-shred"],
  ["IQF Tomato Dice", "Peppers & Aromatics", "iqf-tomatoes-dice"],
  ["IQF Toon Sprouts", "Leafy & Green Vegetables", "iqf-toon-sprouts"],
  ["IQF Bamboo Shoot Slices", "Mushrooms & Specialty Vegetables", "iqf-bamboo-shoot-slice"],
  ["IQF Whole Bamboo Shoot", "Mushrooms & Specialty Vegetables", "iqf-whole-bamboo-shoot"],
  ["IQF Bamboo Shoot Shred", "Mushrooms & Specialty Vegetables", "iqf-bamboo-shoot-shred"],
  ["Mirepoix Mixed Vegetables", "Prepared & Mixed Vegetables", "mirepoix-mixed"],
  ["Hawaiian Mixed Vegetables", "Prepared & Mixed Vegetables", "hawaiian-mixed"],
  ["Winter Mixed Vegetables", "Prepared & Mixed Vegetables", "winter-mixed"],
] as const, { packing: "Confirm pack and carton quantity by SKU", shelfLife: "Confirm for the selected SKU", storage: "Frozen; confirm SKU temperature" });

/** The four product lines currently offered by Deesheng Food. */
export const catalogCategories: CatalogCategory[] = [
  {
    ...sauceSource,
    eyebrow: "Korean sauce series",
    description:
      "Wholesale Korean sauces from Qingdao for food importers, distributors, restaurant suppliers and private-label brands. Compare gochujang, fried-chicken glazes, buldak, BBQ sauces and related seasonings in retail and foodservice packs.",
    buyerNote:
      "Tell us your target market, sales channel, products, preferred packs and estimated cartons. We will confirm the formula, label requirements and quotation for your order.",
    image: "/media/categories/korean-sauces.webp",
    imageAlt: "Korean fried chicken sauces, gochujang and seasoning products",
    items: sauceBrochureItems,
  },
  {
    ...kimchiSource,
    eyebrow: "Korean kimchi series",
    image: "/media/categories/kimchi.webp",
    imageAlt: "Korean cabbage, radish and green onion kimchi selection",
    items: kimchiBrochureItems,
  },
  {
    ...chiliSource,
    name: "Korean Chili Powder & Seasonings",
    shortName: "Chili powder",
    eyebrow: "Korean chili series",
    image: "/media/categories/chili-powder.webp",
    imageAlt: "Korean chili powder, chili flakes and dry seasonings",
    items: chiliBrochureItems,
  },
  {
    ...frozenSource,
    eyebrow: "Frozen vegetable series",
    image: "/media/categories/frozen-vegetables.webp",
    imageAlt: "Frozen mixed vegetables with peppers, carrots, cauliflower and zucchini",
    items: frozenBrochureItems,
  },
];

export function getCatalogItemImage(categorySlug: string, item: Pick<CatalogItem, "name" | "group" | "image">) {
  return item.image
    ?? catalogCategories.find((category) => category.slug === categorySlug)?.image
    ?? "/media/categories/korean-sauces.webp";
}

export type ProductDetail = {
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  headline: string;
  summary: string;
  seoTitle?: string;
  metaDescription?: string;
  applications: string[];
  packing: string[];
  packingNote?: string;
  shelfLife: string;
  storage: string;
  image: string;
  imageAlt: string;
  buyerAnswer?: string;
  buyerQuestions: { question: string; answer: string }[];
};

const standardFaq = (product: string) => [
  { question: `Can ${product} be private labelled?`, answer: "Yes. OEM/private-label service can cover the label, packaging and, where the project requires it, flavor adjustment." },
  { question: "What is the standard OEM MOQ?", answer: "MOQ is confirmed for the selected product, formula and pack. Ask for the quantity and SKU scope in your quotation; trial orders are assessed separately." },
  { question: "How is an export quotation prepared?", answer: "Quotations are prepared after the product, pack size, quantity and destination requirements are confirmed." },
  { question: `Is ${product} available with HALAL documentation?`, answer: "Please identify the product, formula, destination and required documents. We will check the actual manufacturing site, current certificate and product scope before confirming applicability to your order." },
];

export const productDetails: ProductDetail[] = [
  {
    slug: "gochujang", name: "Gochujang — Korean Chili Paste", categorySlug: "korean-sauces", categoryName: "Korean Sauces",
    headline: "Private-label gochujang for retail and foodservice.",
    summary: "Korean-style red pepper paste for bibimbap, marinades, stir-fries and dipping sauces. Choose 500 g retail tubs or a 14 kg foodservice format for wholesale and private-label supply.",
    seoTitle: "Gochujang Wholesale & Private Label | 500 g and 14 kg",
    metaDescription: "Source Korean-style gochujang in 500 g tubs × 20 or 14 kg foodservice cartons. Compare packing, 12-month shelf life and private-label options with Deesheng.",
    applications: ["Bibimbap", "Marinades", "Stir-fry", "Dipping sauces", "Soup and stew bases"], packing: ["500 g tub × 20 per carton", "14 kg foodservice carton"], shelfLife: "12 months", storage: "Ambient; cool, dry and away from light", image: "/media/catalog-products/sauces/gochujang-chili-sauce.webp", imageAlt: "Gochujang retail tub and 14 kg foodservice carton",
    packingNote: "500 g × 20: carton net weight 10 kg, gross weight 11.5 kg, dimensions 490 × 260 × 175 mm. 14 kg format: carton net weight 14 kg, gross weight 14.8 kg, dimensions 245 × 240 × 255 mm. Dimensions are length × width × height; confirm the final shipping specification with your order.",
    buyerAnswer: "Deesheng Food supplies Korean-style gochujang for importers, distributors, restaurant suppliers and private-label brands. The listed formats are 500 g tubs packed 20 per carton and a 14 kg foodservice carton. Both have a 12-month shelf life under the stated ambient storage conditions. Use the retail format for a packaged sauce range or the larger format for commercial kitchens and food preparation. Send your market, intended use, preferred pack and estimated quantity so we can match a sample and confirm the formula, ingredient information, label and applicable product documents.",
    buyerQuestions: [
      ...standardFaq("gochujang"),
      { question: "Which gochujang pack should I choose for retail or foodservice?", answer: "The listed retail format is a 500 g tub packed 20 per carton; the foodservice format is a 14 kg carton. Confirm the channel, handling needs and estimated cartons before requesting a quotation." },
      { question: "What heat level does this gochujang have?", answer: "Select the heat and sweetness profile by tasting the proposed formula in your intended dish. No single Scoville value is specified here; request the current specification for the sample you approve." },
      { question: "How can I check ingredients, allergens and dietary suitability?", answer: "Request the ingredient list, allergen statement and relevant documents for the exact formula and pack. Do not infer gluten-free, vegan or other dietary suitability from the product name." },
      { question: "What are the shelf life and storage conditions?", answer: "The listed shelf life is 12 months under ambient storage, in a cool, dry place away from light. Follow the approved label for the selected formula, including its instructions after opening." },
    ],
  },
  {
    slug: "extra-hot-gochujang", name: "Extra Hot Gochujang", categorySlug: "korean-sauces", categoryName: "Korean Sauces", headline: "A hotter gochujang option for spice-led markets.", summary: "An extra-hot Korean-style chili paste for buyers who need a stronger heat profile while retaining the familiar fermented, savory and slightly sweet character of gochujang.", applications: ["Spicy bibimbap", "Hot marinades", "Korean fried chicken", "Stir-fry", "Foodservice sauces"], packing: ["500 g tub × 20 per carton", "14 kg foodservice carton"], shelfLife: "12 months", storage: "Ambient; cool and dry", image: "/media/catalog-products/sauces/gochujang-chili-sauce.webp", imageAlt: "Gochujang retail tub and foodservice carton used for the extra-hot specification", buyerQuestions: standardFaq("extra-hot gochujang"),
  },
  {
    slug: "korean-garlic-sauce", name: "Korean Garlic Sauce", categorySlug: "korean-sauces", categoryName: "Korean Sauces", headline: "Versatile Korean garlic sauce in retail and bulk packs.", summary: "A savory garlic-forward sauce for Korean cooking, marinades and foodservice production.", applications: ["Marinades", "Grilled meat", "Stir-fry", "Rice dishes", "Foodservice bases"], packing: ["500 g tub × 20 per carton", "14 kg foodservice carton"], shelfLife: "12 months", storage: "Ambient; cool and dry", image: "/media/catalog-products/sauces/garlic-sauce-ssamjang.webp", imageAlt: "Korean garlic sauce retail tub and 14 kg foodservice carton", buyerQuestions: standardFaq("Korean garlic sauce"),
  },
  {
    slug: "bibimbap-sauce", name: "Stone Pot Bibimbap Sauce", categorySlug: "korean-sauces", categoryName: "Korean Sauces", headline: "Bibimbap sauce for retail bottles and restaurant kitchens.", summary: "A balanced Korean-style bibimbap sauce available in spicy and non-spicy versions for supermarkets, restaurants and private-label programs.", applications: ["Stone pot bibimbap", "Rice bowls", "Vegetable bowls", "Dipping", "Meal kits"], packing: ["200 g bottle × 24", "350 g bottle × 24", "400 g bottle × 30", "1 kg pouch × 12"], shelfLife: "12 months", storage: "Ambient", image: "/media/catalog-products/sauces/stone-pot-bibimbap-classic.webp", imageAlt: "Stone pot bibimbap sauce in retail bottle, pouch and sachet formats", buyerQuestions: standardFaq("bibimbap sauce"),
  },
  {
    slug: "classic-buldak-sauce", name: "Classic Korean-Style Fire Noodle Sauce", categorySlug: "korean-sauces", categoryName: "Korean Sauces",
    headline: "Fire noodle sauce for retail, foodservice and private label.",
    summary: "A spicy Korean-style noodle sauce for noodles, fried chicken, rice bowls and dipping. Retail bottles and 1 kg foodservice pouches support wholesale and private-label projects.",
    seoTitle: "Fire Noodle Sauce Wholesale & Private Label | Deesheng",
    metaDescription: "Source Korean-style fire noodle sauce in 200 g, 350 g and 400 g bottles or 1 kg pouches. Compare 10- and 12-pouch cartons for wholesale and private label.",
    applications: ["Spicy noodles", "Fried chicken", "Rice bowls", "Dips", "Menu sauces"], packing: ["200 g bottle × 24", "350 g bottle × 24", "400 g bottle × 30", "1 kg pouch × 12", "1 kg pouch × 10"], shelfLife: "12 months", storage: "Ambient; cool, dry and away from light", image: "/media/catalog-products/sauces/turkey-noodle-sauce-classic.webp", imageAlt: "Classic Korean fire-noodle sauce in bottle and foodservice pouch formats",
    packingNote: "For 1 kg × 12, carton net weight is 12 kg, gross weight is 12.85 kg and dimensions are 320 × 240 × 250 mm (length × width × height). The 1 kg × 10 option is a separate carton configuration; request its shipping dimensions and gross weight when ordering.",
    buyerAnswer: "Deesheng Food supplies classic Korean-style fire noodle sauce for food importers, distributors, noodle brands and restaurant suppliers. Choose 200 g bottles × 24, 350 g bottles × 24, 400 g bottles × 30, or 1 kg pouches in 10- or 12-pouch cartons. The listed shelf life is 12 months with ambient storage away from light. Select the carton configuration explicitly when comparing quotations. For private label, share your target market, intended dish, heat preference, pack and quantity; approve a sample and confirm the ingredient, allergen and label information for the selected formula.",
    buyerQuestions: [
      ...standardFaq("classic fire noodle sauce"),
      { question: "Which retail and foodservice packs are available?", answer: "Listed retail packs are 200 g bottles × 24, 350 g bottles × 24 and 400 g bottles × 30. The 1 kg pouch comes in both 10-pouch and 12-pouch carton configurations. State the required carton count in your inquiry." },
      { question: "How should I choose the heat level?", answer: "The classic formula is a spicy option. Confirm the target heat by testing the selected sample with your noodles or other application; this page does not specify a measured Scoville value." },
      { question: "Does the catalogue name Turkey Noodle Sauce mean it contains turkey?", answer: "The catalogue name identifies the fire-noodle sauce range; it is not an ingredient declaration. Request the exact ingredient list and allergen statement before making meat-content or dietary claims." },
      { question: "What are the shelf life and storage conditions?", answer: "The listed shelf life is 12 months under ambient storage, in a cool, dry place away from light. Follow the approved pack label for storage and handling after opening." },
    ],
  },
  {
    slug: "creamy-buldak-sauce", name: "Creamy Korean-Style Noodle Sauce", categorySlug: "korean-sauces", categoryName: "Korean Sauces",
    headline: "Creamy noodle sauce for retail and foodservice buyers.",
    summary: "A creamy Korean-style noodle sauce for noodles, chicken, rice cakes and dipping. Choose retail bottles or 1 kg foodservice pouches, then confirm the heat profile of the selected formula.",
    seoTitle: "Creamy Noodle Sauce Wholesale & Private Label | Deesheng",
    metaDescription: "Source creamy Korean-style noodle sauce in retail bottles or 1 kg pouches. Compare 10- and 12-pouch cartons, shelf life and private-label options with Deesheng.",
    applications: ["Creamy noodles", "Fried chicken", "Rice cakes", "Dips", "Restaurant menu sauces"], packing: ["200 g bottle × 24", "350 g bottle × 24", "400 g bottle × 30", "1 kg pouch × 12", "1 kg pouch × 10"], shelfLife: "12 months", storage: "Ambient; cool, dry and away from light", image: "/media/catalog-products/sauces/turkey-noodle-sauce-milk-flavor.webp", imageAlt: "Creamy Korean fire-noodle sauce in bottle and foodservice pouch formats",
    packingNote: "For 1 kg × 12, carton net weight is 12 kg, gross weight is 12.85 kg and dimensions are 320 × 240 × 250 mm (length × width × height). The 1 kg × 10 option is a separate carton configuration; request its shipping dimensions and gross weight when ordering. Confirm the heat profile for the selected formula and pack.",
    buyerAnswer: "Deesheng Food supplies creamy Korean-style noodle sauce for importers, distributors, foodservice operators and private-label brands. Available formats include 200 g bottles × 24, 350 g bottles × 24, 400 g bottles × 30, and 1 kg pouches packed 10 or 12 per carton. The listed shelf life is 12 months under ambient storage away from light. Creamy describes the flavor style and does not establish one heat level for every format. Send your intended dish, market, preferred pack and quantity, then approve a sample and the ingredient, allergen and label information for that exact formula.",
    buyerQuestions: [
      ...standardFaq("creamy noodle sauce"),
      { question: "Which creamy noodle sauce packs can I order?", answer: "Choose 200 g bottles × 24, 350 g bottles × 24, 400 g bottles × 30, or 1 kg pouches in 10-pouch or 12-pouch cartons. Specify the carton configuration when requesting samples and a quotation." },
      { question: "Is every creamy version mild?", answer: "No single heat level is specified across the range. Creamy describes the flavor style; confirm the heat of the selected formula and pack with an approved sample." },
      { question: "How do I check milk, meat content and allergens?", answer: "Request the ingredient list and allergen statement for the exact formula. The names creamy, milk flavor and Turkey Noodle Sauce are not a substitute for these documents, and do not establish dairy-free, vegan or meat-content claims." },
      { question: "What are the shelf life and storage conditions?", answer: "The listed shelf life is 12 months under ambient storage, in a cool, dry place away from light. Follow the approved label for the selected formula, including handling after opening." },
    ],
  },
  {
    slug: "tteokbokki-sauce", name: "Tteokbokki Sauce", categorySlug: "korean-sauces", categoryName: "Korean Sauces", headline: "Tteokbokki sauce for retail, foodservice and meal kits.", summary: "Korean-style rice cake sauce available in original and creamy variants for street-food concepts and ready-to-cook formats.", applications: ["Tteokbokki", "Rice cake meal kits", "Street-food menus", "Noodles", "Dipping"], packing: ["200 g bottle × 24", "350 g bottle × 24", "400 g bottle × 30", "1 kg pouch × 12"], shelfLife: "12 months", storage: "Ambient", image: "/media/catalog-products/sauces/tteokbokki-sauce-classic.webp", imageAlt: "Classic tteokbokki sauce in bottle and foodservice pouch formats", buyerQuestions: standardFaq("tteokbokki sauce"),
  },
  {
    slug: "korean-bbq-sauce", name: "Korean BBQ Sauce", categorySlug: "korean-sauces", categoryName: "Korean Sauces", headline: "One Korean BBQ range for marinating, dipping and grilling.", summary: "Korean-style BBQ sauces for meat marinades, table dipping and grill applications in retail and foodservice packs.", applications: ["Beef and pork marinade", "Korean barbecue", "Grilled chicken", "Table dipping", "Central kitchens"], packing: ["200 g bottle × 24", "350 g bottle × 24", "400 g bottle × 30", "1 kg pouch × 12"], shelfLife: "12 months", storage: "Ambient", image: "/media/catalog-products/sauces/barbecue-bbq-sauce.webp", imageAlt: "Korean barbecue sauce in retail bottle and foodservice pouch formats", buyerQuestions: standardFaq("Korean BBQ sauce"),
  },
  {
    slug: "sweet-spicy-fried-chicken-sauce", name: "Sweet & Spicy Fried Chicken Sauce", categorySlug: "korean-sauces", categoryName: "Korean Sauces", headline: "Korean sweet-spicy glaze for fried chicken brands.", summary: "A glossy sweet, savory and moderately spicy Korean-style coating sauce for chicken, rice dishes and casual dining concepts.", applications: ["Korean fried chicken", "Chicken tenders", "Rice bowls", "Dipping", "Central kitchens"], packing: ["200 g bottle × 24", "350 g bottle × 24", "400 g bottle × 30", "1 kg pouch × 12"], shelfLife: "12 months", storage: "Ambient", image: "/media/catalog-products/sauces/fried-chicken-sauce-spicy.webp", imageAlt: "Spicy Korean fried chicken sauce in retail bottle and foodservice pouch formats", buyerQuestions: standardFaq("sweet and spicy fried chicken sauce"),
  },
  {
    slug: "soy-garlic-fried-chicken-sauce", name: "Soy Garlic Fried Chicken Sauce", categorySlug: "korean-sauces", categoryName: "Korean Sauces", headline: "Savory soy-garlic glaze for Korean fried chicken.", summary: "A balanced savory soy profile with rich garlic aroma, suitable for Korean fried chicken, stir-fries and rice cakes.", applications: ["Korean fried chicken", "Stir-fry", "Rice cakes", "Grilled chicken", "Dipping"], packing: ["200 g bottle × 24", "350 g bottle × 24", "400 g bottle × 30", "1 kg pouch × 12"], shelfLife: "12 months", storage: "Ambient", image: "/media/catalog-products/sauces/fried-chicken-sauce-soy-garlic.webp", imageAlt: "Soy-garlic Korean fried chicken sauce in retail bottle and foodservice pouch formats", buyerQuestions: standardFaq("soy garlic fried chicken sauce"),
  },
  {
    slug: "honey-mustard-sauce", name: "Honey Mustard Sauce", categorySlug: "korean-sauces", categoryName: "Korean Sauces", headline: "Creamy honey mustard for retail and foodservice.", summary: "A sweet and tangy creamy sauce for fried chicken, snacks, sandwiches and dipping applications.", applications: ["Fried chicken", "Dipping", "Sandwiches", "Salads", "Snack foods"], packing: ["180 g bottle × 24", "320 g bottle × 24", "360 g bottle × 24", "1 kg pouch × 12"], shelfLife: "12 months", storage: "Ambient", image: "/media/catalog-products/sauces/honey-mustard-sauce.webp", imageAlt: "Honey mustard sauce in retail bottle and foodservice pouch formats", buyerQuestions: standardFaq("honey mustard sauce"),
  },
  {
    slug: "korean-cabbage-kimchi", name: "Korean Cabbage Kimchi", categorySlug: "kimchi", categoryName: "Korean Kimchi", headline: "Korean-style cabbage kimchi for retail and foodservice.", summary: "Refrigerated cabbage kimchi in 1 kg retail/foodservice bags and 10 kg bulk cartons, with cut and pack availability confirmed for each order.", applications: ["Retail grocery", "Restaurants", "Korean menus", "Side dishes", "Foodservice distribution"], packing: ["1 kg bag × 10", "10 kg carton — confirm cut and current availability"], shelfLife: "Typically 4–6 months", storage: "Refrigerated at 0–4°C", image: "/media/catalog-products/kimchi/cabbage-kimchi-mat-retail.webp", imageAlt: "Retail jar of cut Korean cabbage kimchi", buyerQuestions: standardFaq("Korean cabbage kimchi"),
  },
  {
    slug: "coarse-korean-chili-powder", name: "Coarse Korean Chili Powder", categorySlug: "chili-seasonings", categoryName: "Chili Powder & Dry Seasonings", headline: "Coarse Korean chili powder for kimchi and foodservice.", summary: "Grade A coarse Korean chili powder for kimchi and food production. Buyers sourcing gochugaru or Korean chili flakes can specify the cut, seed content, color and heat to match the selected grade.", applications: ["Kimchi production", "Marinades", "Soup bases", "Korean seasoning", "Further processing"], packing: ["100 g bottle × 110", "200 g bottle × 60", "1 kg pouch × 10"], shelfLife: "12 months", storage: "Ambient; cool and dry", image: "/media/catalog-products/chili/coarse-chili-powder-packaged.webp", imageAlt: "Coarse Korean chili powder in a 200 g retail bottle",
    buyerAnswer: "For a gochugaru or Korean chili flakes sourcing brief, Deesheng Food can review a coarse chili powder grade for kimchi and foodservice. Specify particle size, seed content, color, heat, pack, quantity and destination; the exact grade is confirmed against the product specification.",
    buyerQuestions: [
      ...standardFaq("coarse Korean chili powder"),
      { question: "What should I specify when asking for gochugaru or Korean chili flakes?", answer: "Tell us the intended use, target particle size or mesh, seed preference, color, heat level, pack size, expected quantity and destination. We will confirm the matching product specification before sampling or quoting." },
    ],
  },
  {
    slug: "fine-korean-chili-powder", name: "Fine Korean Chili Powder", categorySlug: "chili-seasonings", categoryName: "Chili Powder & Dry Seasonings", headline: "Fine Korean chili powder for sauces and seasoning blends.", summary: "Grade A fine Korean chili powder for sauces, marinades and dry seasoning. Buyers using gochugaru as a sourcing term can specify a fine grind, color and heat for the intended application.", applications: ["Sauce production", "Dry seasoning", "Marinades", "Processed foods", "Retail spice packs"], packing: ["100 g bottle × 110", "200 g bottle × 60", "1 kg pouch × 10"], shelfLife: "12 months", storage: "Ambient; cool and dry", image: "/media/catalog-products/chili/fine-chili-powder-packaged.webp", imageAlt: "Fine Korean chili powder in a 200 g retail bottle",
    buyerAnswer: "Deesheng Food offers a fine Korean chili powder option for sauces and seasoning blends. If your brief uses the term gochugaru, specify the fine grind, target color and heat, pack, quantity and destination so the matching grade can be confirmed before sampling.",
    buyerQuestions: [
      ...standardFaq("fine Korean chili powder"),
      { question: "How do I choose a fine Korean chili powder grade?", answer: "Share the sauce or seasoning application, required fineness, color, heat level and pack. The selected grade and supporting specification are confirmed for the order rather than assumed from a generic product name." },
    ],
  },
  {
    slug: "fried-chicken-coating-mix", name: "Fried Chicken Coating Mix", categorySlug: "chili-seasonings", categoryName: "Chili Powder & Dry Seasonings", headline: "Wholesale 1 kg coating mix for fried-chicken foodservice.", summary: "A dry fried-chicken coating mix for restaurant chains, central kitchens and foodservice distributors. Compare the coating, marinade and finishing sauce together for your menu.", applications: ["Korean fried chicken", "Restaurant chains", "Central kitchens", "Cloud kitchens", "Foodservice distribution"], packing: ["1 kg pouch × 10"], shelfLife: "12 months", storage: "Ambient; cool and dry", image: "/media/catalog-products/sauces/fried-chicken-coating-powder-normal.webp", imageAlt: "One kilogram foodservice pouch of fried chicken coating powder",
    buyerAnswer: "Deesheng Food supplies fried chicken coating mix in 1 kg pouches, 10 per carton, with a listed 12-month shelf life and cool, dry storage. Share your chicken format, preparation method, expected usage and destination so the selected mix and matching sauces can be assessed before an order.",
    buyerQuestions: [
      ...standardFaq("fried chicken coating mix"),
      { question: "What information is needed to assess a coating-mix sample?", answer: "Share the chicken cut, your current preparation and frying method, target coating texture, and whether the chicken is served immediately or for takeaway. Compare samples using the same kitchen process; confirm preparation instructions for the selected mix with the factory." },
      { question: "Can I order a coating mix with fried-chicken sauces?", answer: "The range includes sweet-spicy and soy-garlic fried-chicken sauces. Share the quantities and packs needed for each item so the product mix and shipment requirements can be confirmed together." },
    ],
  },
  {
    slug: "pure-sesame-oil", name: "Pure Sesame Oil", categorySlug: "korean-sauces", categoryName: "Korean Sauces & Essentials", headline: "Pure sesame oil from retail bottles to bulk foodservice packs.", summary: "A versatile Korean cooking essential offered across retail, foodservice and bulk formats for distributors and food manufacturers.", applications: ["Korean cooking", "Seasoning", "Marinades", "Salad dressing", "Further processing"], packing: ["180 ml bottle × 28", "245 ml bottle × 24", "500 ml can × 12", "1 L × 12", "1.8 L × 6", "5 L × 4", "16.5 kg pail"], shelfLife: "12 months", storage: "Ambient; away from light", image: "/media/catalog-products/sauces/sesame-oil.webp", imageAlt: "Pure sesame oil in a 245 ml retail bottle", buyerQuestions: standardFaq("pure sesame oil"),
  },
  {
    slug: "frozen-spinach", name: "Frozen Spinach", categorySlug: "frozen-vegetables", categoryName: "Frozen Vegetables", headline: "Frozen spinach prepared for bibimbap and foodservice.", summary: "Frozen spinach in a practical foodservice format for bibimbap, side dishes, central kitchens and further processing.", applications: ["Bibimbap", "Side dishes", "Central kitchens", "Foodservice distribution", "Further processing"], packing: ["500 g bag × 20"], shelfLife: "12 months", storage: "Frozen at −18°C", image: "/media/catalog-products/frozen/iqf-spinach.webp", imageAlt: "IQF frozen spinach balls and chopped spinach", buyerQuestions: standardFaq("frozen spinach"),
  },
  {
    slug: "frozen-broccoli", name: "Frozen Broccoli", categorySlug: "frozen-vegetables", categoryName: "Frozen Vegetables", headline: "Frozen broccoli in foodservice and bulk formats.", summary: "Frozen broccoli for importers, distributors, central kitchens and industrial food production.", applications: ["Foodservice", "Meal production", "Retail repacking", "Central kitchens", "Further processing"], packing: ["1 kg bag × 10", "2.5 kg bag × 4", "10 kg carton"], shelfLife: "12 months", storage: "Frozen at −18°C", image: "/media/catalog-products/frozen/iqf-broccoli.webp", imageAlt: "IQF frozen broccoli florets", buyerQuestions: standardFaq("frozen broccoli"),
  },
];

export function getCategory(slug: string) {
  return catalogCategories.find((category) => category.slug === slug);
}

export function getProduct(slug: string) {
  return productDetails.find((product) => product.slug === slug);
}

export const allCatalogItems = catalogCategories.flatMap((category) =>
  category.items.map((item) => ({ ...item, categorySlug: category.slug, categoryName: category.name })),
);

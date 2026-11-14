import sauceCatalog from "./sauce-catalog.json";
import aeoSauces from "./aeo-sauces.json";

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
      { name: "Korean Cabbage Kimchi — 1 kg", group: "Cabbage", packing: "1 kg bag × 10", shelfLife: "Confirm for the selected SKU and pack", storage: "0–4°C", detailSlug: "korean-cabbage-kimchi" },
      { name: "Korean Cabbage Kimchi — 10 kg", group: "Cabbage", packing: "10 kg carton; whole or cut", shelfLife: "Confirm for the selected SKU and pack", storage: "0–4°C" },
      { name: "Green Onion Kimchi", group: "Specialty Kimchi", packing: "300 g bag × 30", shelfLife: "Confirm for the selected SKU and pack", storage: "0–4°C" },
      { name: "Chili Pepper Kimchi", group: "Specialty Kimchi", packing: "200 g bag × 40", shelfLife: "Confirm for the selected SKU and pack", storage: "0–4°C" },
      { name: "Young Radish Kimchi", group: "Radish", packing: "500 g bag × 20", shelfLife: "Confirm for the selected SKU and pack", storage: "0–4°C" },
      { name: "Diced Radish Kimchi", group: "Radish", packing: "500 g bag × 20", shelfLife: "Confirm for the selected SKU and pack", storage: "0–4°C" },
      { name: "Sweet & Sour Radish", group: "Radish", packing: "2 kg bag × 6; 100 g tub × 100", shelfLife: "4 months", storage: "Refrigerated" },
      { name: "Soy Sauce Radish", group: "Radish", packing: "500 g bag × 20", shelfLife: "Confirm for the selected SKU and pack", storage: "0–4°C" },
      { name: "Soy Sauce Perilla Leaves", group: "Specialty Kimchi", packing: "500 g bag × 20", shelfLife: "Confirm for the selected SKU and pack", storage: "0–4°C" },
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
  shelfLife: item.shelfLife ?? "Confirm for the selected SKU and pack",
  storage: item.storage ?? "Confirm for the selected SKU and pack",
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
  ["Cabbage Kimchi — Whole", "Cabbage Kimchi", "cabbage-kimchi-whole", "10 kg", "korean-cabbage-kimchi"],
  ["Cabbage Kimchi — Mat", "Cabbage Kimchi", "cabbage-kimchi-mat", "10 kg", "korean-cabbage-kimchi"],
  ["Cabbage Kimchi — Mini Mat", "Cabbage Kimchi", "cabbage-kimchi-mini-mat", "10 kg"],
  ["Cabbage Kimchi — Retail Jar", "Cabbage Kimchi", "cabbage-kimchi-mat-retail", "300 g / 400 g / 480 g / 1 kg"],
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

export function getCatalogItemId(categorySlug: string, item: Pick<CatalogItem, "name">): string {
  return `${categorySlug}-${item.name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
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
  packSpecifications?: {
    pack: string;
    shelfLife: string;
    storage: string;
    netWeightKg?: number;
    grossWeightKg?: number;
    dimensionsMm?: string;
  }[];
  packingNote?: string;
  shelfLife: string;
  storage: string;
  image: string;
  imageAlt: string;
  buyerAnswer?: string;
  buyerQuestions: { question: string; answer: string }[];
  relatedProductSlugs?: string[];
  resourceLinks?: { href: string; label: string }[];
};

const standardFaq = (product: string) => [
  { question: `Can ${product} be private labelled?`, answer: "Yes. OEM/private-label service can cover the label, packaging and, where the project requires it, flavor adjustment." },
  { question: "What is the standard OEM MOQ?", answer: "MOQ is confirmed for the selected product, formula and pack. Ask for the quantity and SKU scope in your quotation; trial orders are assessed separately." },
  { question: "How is an export quotation prepared?", answer: "Quotations are prepared after the product, pack size, quantity and destination requirements are confirmed." },
  { question: `Is ${product} available with HALAL documentation?`, answer: "Please identify the product, formula, destination and required documents. We will check the actual manufacturing site, current certificate and product scope before confirming applicability to your order." },
];

export const productDetails: ProductDetail[] = [
  ...aeoSauces,
  {
    slug: "extra-hot-gochujang", name: "Extra Hot Gochujang", categorySlug: "korean-sauces", categoryName: "Korean Sauces", headline: "Extra-hot gochujang for retail and foodservice sourcing.", summary: "An extra-hot Korean-style chili paste for buyers who need a stronger heat profile while retaining the familiar fermented, savory and slightly sweet character of gochujang.",
    seoTitle: "Extra Hot Gochujang Supplier | Retail & Foodservice | Deesheng Food",
    metaDescription: "Source extra-hot gochujang in listed 500 g × 20 and 14 kg formats. Review the exact formula, sample, pack and product documents for your market.",
    applications: ["Spicy bibimbap", "Hot marinades", "Korean fried chicken", "Stir-fry", "Foodservice sauces"], packing: ["500 g tub × 20 per carton", "14 kg foodservice carton"], shelfLife: "12 months", storage: "Ambient; cool and dry", image: "/media/catalog-products/sauces/gochujang-chili-sauce.webp", imageAlt: "Gochujang packaging reference; confirm the extra-hot formula and final pack",
    buyerAnswer: "Deesheng Food lists extra-hot gochujang in 500 g tubs packed 20 per carton and a 14 kg foodservice format, with a listed 12-month shelf life and cool, dry ambient storage. Extra-hot is a product option, not a verified numerical heat rating. Share your application, target heat, pack, quantity and destination to request the matching sample and specification.",
    packSpecifications: [
      { pack: "500 g tub × 20 per carton", shelfLife: "12 months", storage: "Ambient; cool and dry" },
      { pack: "14 kg foodservice carton", shelfLife: "12 months", storage: "Ambient; cool and dry" },
    ],
    packingNote: "Select the extra-hot formula explicitly; do not substitute another gochujang specification. Carton logistics available on request.",
    buyerQuestions: [
      ...standardFaq("extra-hot gochujang"),
      { question: "Does extra-hot gochujang have a confirmed SHU rating?", answer: "No numerical SHU rating is listed here. Describe your target heat and request the selected formula's specification and a sample for evaluation in your recipe." },
      { question: "Which extra-hot gochujang packs are listed?", answer: "The listed formats are 500 g tubs packed 20 per carton and a 14 kg foodservice carton. Confirm the extra-hot formula, final pack and label in the order specification." },
      { question: "How should I compare an extra-hot gochujang sample?", answer: "Use the intended recipe and serving quantity, and compare the samples under the same preparation conditions. Approve the exact formula and pack before ordering." },
    ],
  },
  {
    slug: "bibimbap-sauce", name: "Stone Pot Bibimbap Sauce", categorySlug: "korean-sauces", categoryName: "Korean Sauces", headline: "Bibimbap sauce for retail bottles and restaurant kitchens.", summary: "Stone pot bibimbap sauce for supermarkets, restaurant suppliers and private-label programs. Choose the exact flavor and carton configuration; the classic and non-spicy catalogue entries remain separate options.",
    seoTitle: "Stone Pot Bibimbap Sauce Supplier | Wholesale & OEM | Deesheng Food",
    metaDescription: "Compare listed retail bottles and 1 kg foodservice packs for stone pot bibimbap sauce. Confirm the flavor, carton configuration, sample and export label.",
    applications: ["Stone pot bibimbap", "Rice bowls", "Vegetable bowls", "Dipping", "Meal kits"], packing: ["200 g bottle × 24", "350 g bottle × 24", "400 g bottle × 30", "1 kg pouch × 12"], shelfLife: "12 months", storage: "Ambient", image: "/media/catalog-products/sauces/stone-pot-bibimbap-classic.webp", imageAlt: "Classic stone pot bibimbap sauce catalogue image",
    buyerAnswer: "Deesheng Food offers stone pot bibimbap sauce for retail and foodservice buyers. This specification lists 200 g × 24, 350 g × 24 and 400 g × 30 bottles, plus 1 kg pouches packed 12 per carton, with a 12-month shelf life and ambient storage. Select the flavor explicitly. The catalogue also shows a separate 1 kg × 10 configuration; its carton data must be requested separately.",
    packSpecifications: [
      { pack: "200 g bottle × 24", shelfLife: "12 months", storage: "Ambient" },
      { pack: "350 g bottle × 24", shelfLife: "12 months", storage: "Ambient" },
      { pack: "400 g bottle × 30", shelfLife: "12 months", storage: "Ambient" },
      { pack: "1 kg pouch × 12", shelfLife: "12 months", storage: "Ambient" },
    ],
    packingNote: "Confirm the flavor for the selected format. The catalogue's 1 kg × 10 entry is a separate carton configuration. Carton logistics available on request.",
    buyerQuestions: [
      ...standardFaq("bibimbap sauce"),
      { question: "Are classic and non-spicy bibimbap sauce the same SKU?", answer: "No. They are separate catalogue options. State the flavor and pack you want, and request the matching formula and sample rather than assuming that one specification covers both." },
      { question: "Are 1 kg × 10 and 1 kg × 12 the same carton?", answer: "No. This product specification lists 1 kg × 12, while the catalogue also lists 1 kg × 10. Specify the required count and request the corresponding carton data; do not transfer shipping data between them." },
      { question: "What should I include in a bibimbap sauce sample brief?", answer: "Include the classic or non-spicy option, rice-bowl recipe, target flavor, retail or foodservice channel, preferred pack, quantity and destination." },
    ],
  },
  {
    slug: "korean-cabbage-kimchi", name: "Korean Cabbage Kimchi", categorySlug: "kimchi", categoryName: "Korean Kimchi", headline: "Refrigerated cabbage kimchi in bagged and bulk formats.", summary: "Refrigerated cabbage kimchi in 1 kg bags packed 10 per carton and 10 kg bulk cartons. Confirm the cut, selected formula, shelf life and current availability for each order; retail jars are a separate catalogue format.",
    seoTitle: "Korean Cabbage Kimchi Supplier | 1 kg & 10 kg | Deesheng Food",
    metaDescription: "Source refrigerated cabbage kimchi in 1 kg × 10 bags and 10 kg bulk cartons. Storage at 0–4°C; shelf life confirmed for the selected product and pack.",
    applications: ["Retail grocery", "Restaurants", "Korean menus", "Side dishes", "Foodservice distribution"], packing: ["1 kg bag × 10", "10 kg carton — confirm cut and current availability"], shelfLife: "Confirm for the selected product and pack", storage: "Refrigerated at 0–4°C", image: "/media/catalog-products/kimchi/cabbage-kimchi-mat.webp", imageAlt: "Cabbage kimchi shown in the catalogue for the 10 kg Mat format",
    buyerAnswer: "Deesheng Food supplies refrigerated Korean cabbage kimchi in 1 kg bags packed 10 per carton and 10 kg bulk cartons. The storage requirement for these formats is 0–4°C. Shelf life must be confirmed for the selected product, formula and packaging before ordering. Share your required cut, pack, quantity, destination and refrigerated delivery route. Retail jars are listed separately and do not inherit the bagged product specification.",
    packSpecifications: [
      { pack: "1 kg bag × 10", shelfLife: "Confirm for the selected product and pack", storage: "Refrigerated at 0–4°C" },
      { pack: "10 kg carton — confirm cut and current availability", shelfLife: "Confirm for the selected product and pack", storage: "Refrigerated at 0–4°C" },
    ],
    packingNote: "Confirm the cut, formula, shelf life and current availability for the selected bagged or bulk product. Retail jars require a separate specification. Carton logistics available on request.",
    buyerQuestions: [
      ...standardFaq("Korean cabbage kimchi"),
      { question: "Which cabbage kimchi packs does this page cover?", answer: "This page covers 1 kg bags packed 10 per carton and 10 kg bulk cartons, with cut and availability confirmed for the order. The catalogue's retail jars are separate formats and require their own specification." },
      { question: "What is the shelf life of cabbage kimchi?", answer: "Shelf life must be confirmed for the selected product, formula and packaging. Request the applicable specification and approved label before ordering; no single duration is stated for every cabbage kimchi format." },
      { question: "What storage temperature applies to these cabbage kimchi formats?", answer: "The listed bagged and bulk cabbage kimchi formats require refrigeration at 0–4°C. Share the destination and delivery route so the refrigerated shipment requirements can be reviewed." },
      { question: "Can I use the same specification for retail jars or frozen kimchi?", answer: "No. The bagged and bulk refrigerated specification does not establish a retail-jar or frozen product specification. Identify the exact format and request its applicable packing, storage and shelf-life information." },
    ],
  },
  {
    slug: "coarse-korean-chili-powder", name: "Coarse Korean Chili Powder", categorySlug: "chili-seasonings", categoryName: "Chili Powder & Dry Seasonings", headline: "Coarse Korean chili powder for kimchi and foodservice.", summary: "Grade A coarse Korean chili powder for kimchi and food production. Buyers sourcing gochugaru or Korean chili flakes can specify the cut, seed content, color and heat to match the selected grade.", applications: ["Kimchi production", "Marinades", "Soup bases", "Korean seasoning", "Further processing"], packing: ["100 g bottle × 110", "200 g bottle × 60", "1 kg pouch × 10"], shelfLife: "12 months", storage: "Ambient; cool and dry", image: "/media/catalog-products/chili/coarse-chili-powder-packaged.webp", imageAlt: "Coarse Korean chili powder in a 200 g retail bottle",
    seoTitle: "Coarse Korean Chili Powder Supplier | Gochugaru | Deesheng Food",
    metaDescription: "Source coarse Korean chili powder for kimchi and foodservice. Listed 100 g, 200 g and 1 kg packs; confirm particle size, seed content, color and heat.",
    buyerAnswer: "Deesheng Food lists coarse Korean chili powder for kimchi and foodservice in 100 g bottles × 110, 200 g bottles × 60 and 1 kg pouches × 10. The listed shelf life is 12 months with cool, dry ambient storage. For a gochugaru or Korean chili flakes sourcing brief, specify particle size, seed content, color, heat, pack, quantity and destination; the exact grade is confirmed against the product specification.",
    packSpecifications: [
      { pack: "100 g bottle × 110", shelfLife: "12 months", storage: "Ambient; cool and dry" },
      { pack: "200 g bottle × 60", shelfLife: "12 months", storage: "Ambient; cool and dry" },
      { pack: "1 kg pouch × 10", shelfLife: "12 months", storage: "Ambient; cool and dry" },
    ],
    packingNote: "Confirm the selected coarse grade, cut and pack before ordering. Carton logistics available on request.",
    buyerQuestions: [
      ...standardFaq("coarse Korean chili powder"),
      { question: "What should I specify when asking for gochugaru or Korean chili flakes?", answer: "Tell us the intended use, target particle size or mesh, seed preference, color, heat level, pack size, expected quantity and destination. We will confirm the matching product specification before sampling or quoting." },
      { question: "Can I use the fine chili powder specification for the coarse grade?", answer: "No. Coarse and fine are separate grade choices. Request the exact cut, seed content, color and heat for the intended application and assess the selected sample before ordering." },
      { question: "How should I evaluate coarse chili powder for kimchi?", answer: "Use your intended kimchi recipe and preparation process when comparing samples. Record the selected grade, cut and pack so the approved sample can be matched to the order specification." },
    ],
  },
  {
    slug: "fine-korean-chili-powder", name: "Fine Korean Chili Powder", categorySlug: "chili-seasonings", categoryName: "Chili Powder & Dry Seasonings", headline: "Fine Korean chili powder for sauces and seasoning blends.", summary: "Grade A fine Korean chili powder for sauces, marinades and dry seasoning. Buyers using gochugaru as a sourcing term can specify a fine grind, color and heat for the intended application.", applications: ["Sauce production", "Dry seasoning", "Marinades", "Processed foods", "Retail spice packs"], packing: ["100 g bottle × 110", "200 g bottle × 60", "1 kg pouch × 10"], shelfLife: "12 months", storage: "Ambient; cool and dry", image: "/media/catalog-products/chili/fine-chili-powder-packaged.webp", imageAlt: "Fine Korean chili powder in a 200 g retail bottle",
    seoTitle: "Fine Korean Chili Powder Supplier | Wholesale | Deesheng Food",
    metaDescription: "Source fine Korean chili powder for sauces and seasoning blends. Listed 100 g, 200 g and 1 kg packs; confirm the required grind, color and heat.",
    buyerAnswer: "Deesheng Food offers fine Korean chili powder for sauces and seasoning blends in 100 g bottles × 110, 200 g bottles × 60 and 1 kg pouches × 10. The listed shelf life is 12 months with cool, dry ambient storage. If your brief uses the term gochugaru, specify the fine grind, target color and heat, pack, quantity and destination so the matching grade can be confirmed before sampling.",
    packSpecifications: [
      { pack: "100 g bottle × 110", shelfLife: "12 months", storage: "Ambient; cool and dry" },
      { pack: "200 g bottle × 60", shelfLife: "12 months", storage: "Ambient; cool and dry" },
      { pack: "1 kg pouch × 10", shelfLife: "12 months", storage: "Ambient; cool and dry" },
    ],
    packingNote: "Confirm the selected fine grade, grind and pack before ordering. Carton logistics available on request.",
    buyerQuestions: [
      ...standardFaq("fine Korean chili powder"),
      { question: "How do I choose a fine Korean chili powder grade?", answer: "Share the sauce or seasoning application, required fineness, color, heat level and pack. The selected grade and supporting specification are confirmed for the order rather than assumed from a generic product name." },
      { question: "Does fine chili powder have one fixed mesh or heat rating?", answer: "No fixed mesh or numerical heat rating is stated on this page. Provide your required fineness and heat target and request the selected grade's specification before approving a sample." },
      { question: "Which packing formats are listed for fine chili powder?", answer: "The listed formats are 100 g bottles packed 110 per carton, 200 g bottles packed 60 per carton and 1 kg pouches packed 10 per carton. Confirm the exact grade and final label for the selected pack." },
    ],
  },
  {
    slug: "fried-chicken-coating-mix", name: "Fried Chicken Coating Mix", categorySlug: "chili-seasonings", categoryName: "Chili Powder & Dry Seasonings", headline: "Wholesale 1 kg coating mix for fried-chicken foodservice.", summary: "A dry fried-chicken coating mix for restaurant chains, central kitchens and foodservice distributors. Compare the coating, marinade and finishing sauce together for your menu.", applications: ["Korean fried chicken", "Restaurant chains", "Central kitchens", "Cloud kitchens", "Foodservice distribution"], packing: ["1 kg pouch × 10"], shelfLife: "12 months", storage: "Ambient; cool and dry", image: "/media/catalog-products/sauces/fried-chicken-coating-powder-normal.webp", imageAlt: "One kilogram foodservice pouch of fried chicken coating powder",
    seoTitle: "Fried Chicken Coating Mix Supplier | 1 kg Wholesale | Deesheng Food",
    metaDescription: "Source fried chicken coating mix in 1 kg × 10 cartons. Listed 12-month shelf life and cool, dry storage; review the mix, sample and sauce pairing.",
    buyerAnswer: "Deesheng Food supplies fried chicken coating mix in 1 kg pouches, 10 per carton, with a listed 12-month shelf life and cool, dry storage. Share your chicken format, preparation method, expected usage and destination so the selected mix and matching sauces can be assessed before an order.",
    packSpecifications: [
      { pack: "1 kg pouch × 10", shelfLife: "12 months", storage: "Ambient; cool and dry" },
    ],
    packingNote: "Select the original coating mix explicitly; other coatings and marinades have their own specifications. Carton logistics available on request.",
    buyerQuestions: [
      ...standardFaq("fried chicken coating mix"),
      { question: "What information is needed to assess a coating-mix sample?", answer: "Share the chicken cut, your current preparation and frying method, target coating texture, and whether the chicken is served immediately or for takeaway. Compare samples using the same kitchen process; confirm preparation instructions for the selected mix with the factory." },
      { question: "Can I order a coating mix with fried-chicken sauces?", answer: "The range includes sweet-spicy and soy-garlic fried-chicken sauces. Share the quantities and packs needed for each item so the product mix and shipment requirements can be confirmed together." },
      { question: "Does this specification also cover the golden coating mix or marinade?", answer: "No. This page is linked to the original fried chicken coating mix. Golden coating mix and chicken marinades are separate catalogue items; request the exact formula, preparation instructions and pack for each selected item." },
    ],
  },
  {
    slug: "pure-sesame-oil", name: "Pure Sesame Oil", categorySlug: "korean-sauces", categoryName: "Korean Sauces & Essentials", headline: "Pure sesame oil from retail bottles to bulk foodservice packs.", summary: "A Korean cooking essential offered across retail, foodservice and bulk formats for distributors and food manufacturers. Select the exact pack and keep litre and kilogram specifications distinct.",
    seoTitle: "Pure Sesame Oil Supplier | Wholesale & Bulk | Deesheng Food",
    metaDescription: "Compare listed retail, foodservice and bulk sesame oil packs. 12-month shelf life and storage away from light; confirm the exact volume or weight format.",
    applications: ["Korean cooking", "Seasoning", "Marinades", "Salad dressing", "Further processing"], packing: ["180 ml bottle × 28", "245 ml bottle × 24", "500 ml can × 12", "1 L × 12", "1.8 L × 6", "5 L × 4", "16.5 kg pail"], shelfLife: "12 months", storage: "Ambient; away from light", image: "/media/catalog-products/sauces/sesame-oil.webp", imageAlt: "Pure sesame oil in a 245 ml retail bottle",
    buyerAnswer: "Deesheng Food lists pure sesame oil in retail bottles, foodservice formats and a 16.5 kg bulk pail. The listed shelf life is 12 months with ambient storage away from light. Choose the exact format from the pack table and provide your sales channel, quantity and destination. The catalogue's separate 16.5 L item is not interchangeable with a 16.5 kg specification.",
    packSpecifications: [
      { pack: "180 ml bottle × 28", shelfLife: "12 months", storage: "Ambient; away from light" },
      { pack: "245 ml bottle × 24", shelfLife: "12 months", storage: "Ambient; away from light" },
      { pack: "500 ml can × 12", shelfLife: "12 months", storage: "Ambient; away from light" },
      { pack: "1 L × 12", shelfLife: "12 months", storage: "Ambient; away from light" },
      { pack: "1.8 L × 6", shelfLife: "12 months", storage: "Ambient; away from light" },
      { pack: "5 L × 4", shelfLife: "12 months", storage: "Ambient; away from light" },
      { pack: "16.5 kg pail", shelfLife: "12 months", storage: "Ambient; away from light" },
    ],
    packingNote: "Keep the 16.5 kg pail separate from the catalogue's 16.5 L entry. Confirm the exact unit and selected pack. Carton logistics available on request.",
    buyerQuestions: [
      ...standardFaq("pure sesame oil"),
      { question: "Are 16.5 L and 16.5 kg sesame oil the same specification?", answer: "No. Litres describe volume and kilograms describe weight. This detail page lists a 16.5 kg pail, while the catalogue separately lists a 16.5 L item. Specify the required unit and request the matching product and shipping specification." },
      { question: "Does this page cover bibimbap special oil or every sesame oil sachet?", answer: "No. Bibimbap special oil and sesame oil sachets are separate catalogue entries. Identify the exact item and pack so the corresponding formula and specification can be checked." },
      { question: "What storage is listed for pure sesame oil?", answer: "The listed storage is ambient, away from light, with a 12-month shelf life. Confirm the selected pack's approved label and any instructions for use after opening." },
    ],
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

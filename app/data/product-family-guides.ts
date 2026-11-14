export type ProductFamilyGuide = {
  summary: string;
  selection: string;
  kind: "sauce" | "supporting" | "kimchi";
};

/** Buyer guidance describes how to choose a variant; it does not merge recipes. */
export const productFamilyGuides: Record<string, ProductFamilyGuide> = {
  "Catering Small Packs": {
    kind: "sauce",
    summary: "Portion packs for bibimbap, noodle, teriyaki and mushroom sauce projects. Each named flavor remains a separate selection.",
    selection: "Specify the portion size, meal application and sachets per carton. A similarly named foodservice sauce does not establish the sachet formula or shelf life.",
  },
  "Korean Bibimbap Sauces": {
    kind: "sauce",
    summary: "Rice-bowl and cooking sauces covering stone-pot bibimbap and the other named menu applications below.",
    selection: "Choose the exact sauce and heat direction, then evaluate it with your rice, vegetables or other ingredients. Teriyaki and mushroom sauces should be requested by their own names.",
  },
  "Noodle Sauces": {
    kind: "sauce",
    summary: "Fried-bean-paste, cold-noodle and spicy seafood noodle sauces for different serving styles.",
    selection: "State whether the noodles are served hot or cold, and whether you need a dressing, mixing sauce or soup application. Request the preparation ratio for the selected formula.",
  },
  "Turkey Noodle Sauces": {
    kind: "sauce",
    summary: "Korean-style fire noodle sauces, including classic, creamy, mild and other named flavor variants. These listings are sauces, not finished instant noodles.",
    selection: "Compare heat and texture using a sample. The catalogue's Turkey Noodle naming does not confirm turkey or other meat ingredients; request the ingredient and allergen statement for the exact formula.",
  },
  "BBQ Sauces": {
    kind: "sauce",
    summary: "BBQ dipping sauces, dressings and marinades for distinct cooking and serving steps.",
    selection: "Identify dipping, glazing or marinating use. Keep BBQ Dip, BBQ Dipping Sauce and Korean BBQ Sauce separate until the selected formula and pack have been confirmed.",
  },
  "Soup & Stew Sauces": {
    kind: "sauce",
    summary: "Sauce bases for kimchi, soft tofu, spicy beef, doenjang and budae jjigae soup or stew applications.",
    selection: "Share the broth, ingredients and serving portion for sample evaluation. Dish names do not establish meat content or a dilution ratio; confirm both for the selected product.",
  },
  "Stir-fry Sauces": {
    kind: "sauce",
    summary: "Sauces for vegetable, seafood, pork-belly, chicken-feet and rice-cake cooking applications, with classic and creamy rice-cake variants listed separately.",
    selection: "Specify the recipe, portion and cooking process. These are sauce listings; the named dish ingredients are not supplied as part of the sauce unless confirmed in the product specification.",
  },
  "Fried Chicken Sauces": {
    kind: "sauce",
    summary: "Finishing sauces spanning sweet-spicy, soy-garlic, honey mustard and the other named flavors below. Coating and marinade products are listed separately.",
    selection: "Test your selected sauce with the actual chicken cut, coating, serving portion and holding time. Confirm retail or foodservice packing and pack-specific shelf life, especially for honey mustard.",
  },
  "Korean Basic Pastes": {
    kind: "sauce",
    summary: "Gochujang, doenjang and Korean garlic sauce in separately listed retail and foodservice formats.",
    selection: "Select the exact product and pack before requesting documents. Korean garlic sauce is not automatically ssamjang, and doenjang paste is separate from Doenjang Soup Special Sauce.",
  },
  "Supermarket Series": {
    kind: "sauce",
    summary: "Retail sauce, dressing and chili-oil selections for supermarket and private-label projects.",
    selection: "Use the named retail variant and listed pack for your inquiry. Similar foodservice names do not establish identical recipes, ingredients, carton quantities or shelf life.",
  },
  "Korean Essential Dry Seasonings": {
    kind: "supporting",
    summary: "Chili powders, sesame, pepper and other dry seasonings supporting cooking and manufacturing applications.",
    selection: "Request the grade, grind, ingredient statement and pack for the exact seasoning. These supporting ingredients are separate from the sauce range.",
  },
  "Coating, Marinade & Cooking Mixes": {
    kind: "supporting",
    summary: "Coatings, marinade seasonings and cooking mixes for preparation before a finishing sauce is applied.",
    selection: "Specify the original or spicy variant, preparation method and target application. Obtain product-specific mixing instructions and allergens before kitchen trials.",
  },
  "Cooking Oils": {
    kind: "supporting",
    summary: "Sesame oil and bibimbap oil listings in portion, retail and foodservice formats.",
    selection: "Confirm the exact oil, composition, volume and pack. A bibimbap oil listing should not inherit the specification of pure sesame oil.",
  },
  "Korean Cooking Essentials": {
    kind: "supporting",
    summary: "Syrups, seaweed, noodles and rice-cake products that can support a Korean food range.",
    selection: "Request each item by name and pack. Storage, shelf life, preparation and documents must be checked independently of sauce specifications.",
  },
  "Cabbage Kimchi": {
    kind: "kimchi",
    summary: "Whole, mat, mini-mat, white and washed cabbage kimchi, plus a separately listed retail-jar format.",
    selection: "Compare whole, cut and diced cabbage kimchi by pack. Retail jars have their own carton specifications; white, washed and stir-fried products remain separately named variants. Confirm storage and shelf life for the exact selection.",
  },
  "Radish Kimchi": {
    kind: "kimchi",
    summary: "Chonggak, kkakdugi, nabak and yeolmu listings for distinct radish kimchi selections.",
    selection: "Name the variant and preferred pack, then confirm the vegetable cut, net weight, shelf life and temperature for that SKU. Do not apply cabbage kimchi specifications to radish products.",
  },
  "Specialty Kimchi": {
    kind: "kimchi",
    summary: "Seasoned pepper, spring onion, green onion, leaf mustard and stir-fried kimchi options.",
    selection: "Keep each named vegetable and preparation separate. Use the Korean product name to distinguish spring onion (쪽파) from scallion (대파); confirm ingredients, pack, storage and shipping conditions for the selected product.",
  },
  "Pickled Vegetables": {
    kind: "kimchi",
    summary: "Pickled radish, garlic sprouts, green pepper, perilla leaves and other named vegetable preparations. Seasoned, sweet-sour and soy variants are listed separately.",
    selection: "Choose the exact vegetable, preparation and pack. Request SKU-specific shelf life and storage rather than using one temperature or shelf life for the complete range.",
  },
};

export type BuyerGuide = {
  slug: string;
  title: string;
  description: string;
  question: string;
  audience: string;
  updated: string;
  readTime: string;
  category: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  faqs: { question: string; answer: string }[];
};

export const buyerGuides: BuyerGuide[] = [
  {
    slug: "korean-sauce-oem-guide",
    title: "Korean Sauce OEM: A Practical Buyer Guide",
    description: "What importers and brand owners should prepare before asking a Korean-style sauce manufacturer for samples and pricing.",
    question: "How does Korean sauce OEM manufacturing work?",
    audience: "Importers, distributors and private-label brands",
    updated: "2026-08-24",
    readTime: "6 min",
    category: "OEM",
    sections: [
      { heading: "Start with a commercial brief, not only a flavor name", paragraphs: ["A useful OEM inquiry explains where the product will be sold, who will use it and what order scale is realistic. The same ‘Korean fried chicken sauce’ can require very different sweetness, heat, viscosity and pack formats for a supermarket bottle, restaurant pouch or central kitchen."], bullets: ["Target country and sales channel", "Product or reference brand", "Retail or foodservice pack size", "Estimated quantity by item", "Required certification and launch timing"] },
      { heading: "Choose the right development route", paragraphs: ["The fastest route is an existing export formula with standard packing. An adjusted-formula project starts from a proven product and changes selected sensory targets. A new-formula project needs a clear reference, detailed feedback and more development time.", "Buyers should avoid treating every first inquiry as a full custom-development project. Market testing is usually faster when the first sample set includes several relevant standard products." ] },
      { heading: "Evaluate samples with measurable feedback", paragraphs: ["Feedback such as ‘not right’ does not help the development team. Compare the sample against its intended use and specify whether heat, sweetness, salt, garlic, color, aroma, thickness or coating performance should change.", "For foodservice products, test the sauce with the actual chicken, noodle, rice or cooking process that will be used in the market." ] },
      { heading: "Confirm packing and label early", paragraphs: ["Packing affects carton weight, container planning, label space, MOQ and price. Deesheng Food’s common sauce formats include 200 g, 350 g and 400 g bottles plus 1 kg foodservice pouches. Gochujang and Korean pastes are commonly offered in 500 g tubs and 14 kg foodservice cartons.", "The buyer remains responsible for confirming destination-market label requirements. Artwork, ingredients, allergens, nutrition information, language and importer details should be settled before print approval." ] },
      { heading: "Commercial baseline at Deesheng Food", paragraphs: ["The standard OEM MOQ is 200 cartons per item. A lower quantity may be discussed for a first trial after the product mix is confirmed. Quotations are prepared after the product, pack, quantity and destination are confirmed. For confirmed standard products, the typical production target is about 14 days after final label approval and payment confirmation." ] },
    ],
    faqs: [
      { question: "Can I use my own brand on Korean sauce?", answer: "Yes. Private-label service can cover the product label and packaging, subject to final artwork, pack format and order quantity." },
      { question: "What is the normal Korean sauce OEM MOQ?", answer: "At Deesheng Food, the standard MOQ is 200 cartons per item. A smaller first trial may be discussed after the range is narrowed." },
      { question: "Can one container include several sauces?", answer: "A mixed-product container can be discussed if each item meets the agreed MOQ and the carton size, weight and production schedule work together." },
    ],
  },
  {
    slug: "private-label-gochujang-supplier",
    title: "How to Source Private-Label Gochujang",
    description: "A buyer-focused checklist covering product profile, 500 g and 14 kg packs, private label, MOQ, samples and export quotation.",
    question: "What should I check when choosing a private-label gochujang supplier?",
    audience: "Food importers, supermarket suppliers and restaurant distributors",
    updated: "2026-08-24",
    readTime: "5 min",
    category: "Gochujang",
    sections: [
      { heading: "Define how the gochujang will be used", paragraphs: ["Retail gochujang must work as a consumer-facing cooking paste with clear instructions and market-appropriate label content. Foodservice gochujang is judged more heavily on consistency, cost in use, application performance and bulk handling.", "State whether the target is bibimbap, marinades, stir-fry, soup bases, dipping sauces or further sauce manufacturing." ] },
      { heading: "Select the heat and flavor profile", paragraphs: ["Gochujang is not defined by heat alone. Buyers should evaluate fermented aroma, sweetness, salt, chili character, color, smoothness and aftertaste. Deesheng Food offers a standard Korean-style gochujang and an extra-hot option for spice-led markets." ] },
      { heading: "Match the pack to the channel", paragraphs: ["A 500 g tub packed 20 units per carton is a practical format for retail and smaller foodservice customers. A 14 kg foodservice carton supports restaurant chains, central kitchens and further processing. Final net weight, carton data and label specification should be confirmed before quotation." ] },
      { heading: "Check supplier qualification against the project", paragraphs: ["Deesheng Food’s export program is supported by BRCGS Grade A, HACCP, HALAL and OU Kosher certification. Buyers should request documents relevant to the selected item and destination, then review the product specification, ingredient list, allergens, shelf life, storage and label." ] },
      { heading: "Sampling and commercial terms", paragraphs: ["Qualified B2B buyers should share company details, sales channel, selected pack and estimated quantity before requesting samples. The standard OEM MOQ is 200 cartons per item, with first-trial flexibility discussed case by case. Export quotations are prepared after the project details and shipment requirements are confirmed." ] },
    ],
    faqs: [
      { question: "What private-label gochujang packs are available?", answer: "Common options are 500 g tubs packed 20 per carton and 14 kg foodservice cartons." },
      { question: "How long is the shelf life?", answer: "The standard ambient shelf life shown for Deesheng gochujang is 12 months under recommended storage conditions." },
      { question: "Is extra-hot gochujang available?", answer: "Yes. A hotter gochujang option is available for buyers targeting a stronger heat profile." },
    ],
  },
  {
    slug: "halal-korean-sauce-manufacturer",
    title: "Choosing a HALAL Korean Sauce Manufacturer",
    description: "How Muslim-market buyers can evaluate certification, product scope, ingredients, labels, packing and OEM readiness.",
    question: "How do I evaluate a HALAL Korean sauce manufacturer?",
    audience: "Importers and distributors serving Muslim markets",
    updated: "2026-08-24",
    readTime: "5 min",
    category: "HALAL",
    sections: [
      { heading: "Confirm the certification and product scope", paragraphs: ["Qingdao Deesheng Hengxin Food Co., Ltd. maintains SHC HALAL certification for relevant Korean sauces and related products. Qualified B2B buyers can request the current signed documents after company and project verification, then confirm that the selected formula, manufacturing location and label route align with the import qualification process." ] },
      { heading: "Review ingredients and allergens", paragraphs: ["Korean-style sauces may contain soy, wheat, fermented ingredients, flavor enhancers or other additives. A professional review includes the complete ingredient list, allergen declaration and any market-specific restrictions—not only the front-label HALAL mark." ] },
      { heading: "Separate certification from label approval", paragraphs: ["HALAL certification does not automatically make a retail label compliant in every destination. The buyer should confirm required language, nutrition format, importer details, country of origin, shelf-life marking and any local registration before approving artwork." ] },
      { heading: "Check commercial fit", paragraphs: ["A qualified supplier must also fit the project’s pack size, MOQ, lead time and channel. Deesheng Food’s common sauce packs include 200 g, 350 g and 400 g bottles, 1 kg pouches, 500 g paste tubs and 14 kg foodservice cartons. Standard OEM MOQ is 200 cartons per item." ] },
      { heading: "Deesheng Food’s qualification baseline", paragraphs: ["The available factory credentials include HALAL, BRCGS Grade A, HACCP and OU Kosher. The HALAL annex specifically names gochujang, soy-garlic and spicy fried chicken sauces, classic and non-spicy bibimbap sauce, tteokbokki sauce, jajangmyun sauce, kimchi sauce, sundubu soup sauce, yukgaejang sauce and related products. Relevant certificates and specifications can be provided after the exact product and destination are identified." ] },
    ],
    faqs: [
      { question: "Does Deesheng Food have HALAL certification?", answer: "Yes. Deesheng Food maintains SHC HALAL certification for relevant products. Current signed documents are supplied to qualified B2B buyers after company and project verification." },
      { question: "Can HALAL sauces be private labelled?", answer: "Yes, for suitable products and orders. Label use must align with the applicable certificate, product scope and destination-market requirements." },
      { question: "Which markets commonly require HALAL documents?", answer: "Requirements vary by country and channel. Buyers in Malaysia, Indonesia, the Middle East and other Muslim-market channels should confirm the local authority and import rules for their exact product." },
    ],
  },
  {
    slug: "import-korean-sauces-from-china",
    title: "How to Import Korean-Style Sauces from China",
    description: "A step-by-step sourcing sequence from product shortlist and samples to export quotation, label approval, production and shipping.",
    question: "What is the process for importing Korean-style sauces from China?",
    audience: "First-time and experienced food importers",
    updated: "2026-08-24",
    readTime: "7 min",
    category: "Importing",
    sections: [
      { heading: "1. Build a focused shortlist", paragraphs: ["Start with products that match an existing sales channel. A supermarket buyer may prioritize 200–500 g consumer packs, while a restaurant distributor may focus on 1 kg pouches or 14 kg cartons. Avoid requesting an unfocused sample set without an estimated order plan." ] },
      { heading: "2. Confirm the commercial specification", paragraphs: ["For each item, confirm the exact product, pack size, units per carton, shelf life, storage, quantity, label route and destination. These inputs determine the accurate carton volume, weight and export quotation." ] },
      { heading: "3. Qualify the supplier and product", paragraphs: ["Review company identity, relevant food safety certificates, product specifications, ingredients, allergens and destination-market requirements. Deesheng Food’s available credentials include BRCGS Grade A, HACCP, HALAL and OU Kosher." ] },
      { heading: "4. Test samples in the real application", paragraphs: ["Sauces should be tested with the actual recipe and process. For a fried chicken project, evaluate marinade, coating, frying and final sauce pickup together. For retail, evaluate taste, packaging, label clarity and likely consumer use." ] },
      { heading: "5. Approve price, label and payment", paragraphs: ["Deesheng Food prepares quotations after the product, pack, quantity, destination and shipment requirements are confirmed. The standard payment baseline is T/T 50% in advance and 50% before shipment. Final contract and invoice terms govern the actual order. Label artwork must be approved before print and production." ] },
      { heading: "6. Plan freight and import clearance", paragraphs: ["The agreed Incoterm defines which party arranges each stage of freight, insurance and clearance. Select a freight forwarder that understands food cargo, storage temperature and destination documentation. Kimchi and frozen vegetables require cold-chain planning that differs from ambient sauces." ] },
    ],
    faqs: [
      { question: "How are shipment terms agreed?", answer: "The seller and buyer confirm the Incoterm and allocation of freight, insurance and clearance responsibilities in the signed quotation or contract." },
      { question: "Can sauces and frozen products ship together?", answer: "Ambient sauces and frozen products have different temperature requirements and are normally planned separately. Product mix must respect storage and container conditions." },
      { question: "What information is needed for an accurate quote?", answer: "Product name, pack size, quantity per item, destination or trade term, label route and any required specification or certification." },
    ],
  },
  {
    slug: "korean-fried-chicken-sauce-system",
    title: "Building a Korean Fried Chicken Sauce System",
    description: "How foodservice buyers combine marinade, coating mix and finishing sauces for consistent Korean fried chicken.",
    question: "What products are needed for a Korean fried chicken system?",
    audience: "Restaurant suppliers, chains and central kitchens",
    updated: "2026-08-24",
    readTime: "5 min",
    category: "Foodservice",
    sections: [
      { heading: "Think in systems, not a single sauce", paragraphs: ["Consistent Korean fried chicken depends on raw chicken preparation, marinade, coating, frying conditions and finishing sauce. Buying only a glaze without testing the coating and process can produce inconsistent crispness and sauce pickup." ] },
      { heading: "The core components", paragraphs: ["A practical system may include fried chicken marinade seasoning, coating mix or crispy frying mix, and one or more finishing sauces. Deesheng Food’s sauce range includes sweet and spicy, soy garlic, amber, yuzu, honey mustard, cheese, extra hot, mala and other variants." ], bullets: ["Marinade seasoning for flavor and preparation", "Coating mix for the intended crust", "Finishing sauce for signature flavor", "Optional dry seasoning such as snow cheese powder"] },
      { heading: "Choose foodservice packing", paragraphs: ["One-kilogram pouches are practical for restaurant and distributor testing because they balance handling with repeatable batch use. Retail bottles can support take-home or supermarket programs. The pack decision should follow batch size, storage and expected daily usage." ] },
      { heading: "Test the complete operating method", paragraphs: ["Document the chicken cut, marinade dose and time, coating method, oil temperature, frying time, drain time and sauce application. Compare yield, crispness after holding, flavor intensity and cost per serving before approving the product." ] },
      { heading: "Scale into a branded range", paragraphs: ["After the operating method is stable, a buyer can combine several finishing flavors under one brand while keeping the underlying marinade and coating consistent. This reduces kitchen complexity and makes menu expansion easier." ] },
    ],
    faqs: [
      { question: "Can Deesheng supply sauce, marinade and coating together?", answer: "Yes. The range includes fried chicken sauces, marinade seasonings, coating mixes, crispy frying mix and selected dry flavor powders." },
      { question: "Which sauce flavors are available?", answer: "Examples include sweet and spicy, soy garlic, amber, yuzu, honey mustard, cheese, extra hot and mala. The current catalogue contains additional variants." },
      { question: "What pack is common for foodservice?", answer: "Many sauces are available in 1 kg pouches packed 12 per carton, while dry mixes are commonly 1 kg pouches packed 10 per carton." },
    ],
  },
  {
    slug: "korean-chili-powder-sourcing",
    title: "Korean Chili Powder Sourcing Checklist",
    description: "How buyers should specify grind, color, heat, application, packing and documentation for Korean-style chili powder.",
    question: "What specifications matter when buying Korean chili powder?",
    audience: "Kimchi producers, food manufacturers and spice distributors",
    updated: "2026-08-24",
    readTime: "5 min",
    category: "Chili Powder",
    sections: [
      { heading: "Application determines the right specification", paragraphs: ["Chili powder for kimchi is not automatically the same as fine powder for sauce production or a retail spice bottle. State whether the product will be used for kimchi, seasoning blends, marinades, sauces or further processing." ] },
      { heading: "Confirm particle size", paragraphs: ["Coarse and fine are commercial labels, but the buyer should still provide a reference sample, mesh target or visual standard where possible. Particle size affects color release, texture, suspension and the appearance of the finished food." ] },
      { heading: "Evaluate color and heat separately", paragraphs: ["A bright red appearance does not by itself define heat. Agree on the expected color and pungency separately, then test the chili powder in the actual recipe. Flavor, aroma and aftertaste also matter for Korean food applications." ] },
      { heading: "Choose retail or foodservice packing", paragraphs: ["Deesheng Food’s listed formats for coarse and fine Grade A chili powder include 100 g bottles, 200 g bottles and 1 kg pouches. Carton quantities are 110, 60 and 10 units respectively in the current export list." ] },
      { heading: "Request the right documents", paragraphs: ["For an import project, ask for the applicable product specification, ingredient statement, shelf life, storage, packing data and any destination-required testing. Final requirements depend on the market and intended use." ] },
    ],
    faqs: [
      { question: "What is the shelf life of Deesheng Korean chili powder?", answer: "The current export list shows a 12-month shelf life under recommended ambient storage conditions." },
      { question: "What packing is available?", answer: "Listed options include 100 g bottles packed 110 per carton, 200 g bottles packed 60 per carton and 1 kg pouches packed 10 per carton." },
      { question: "Can the grind or heat be customized?", answer: "Specification adjustment can be discussed against the application, reference standard and planned order quantity." },
    ],
  },
];

export function getGuide(slug: string) {
  return buyerGuides.find((guide) => guide.slug === slug);
}

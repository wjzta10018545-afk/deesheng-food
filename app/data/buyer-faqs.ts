import questions from "./buyer-faqs.json";

export const faqTopics = [
  { id: "ordering", title: "Orders, samples & shipping", description: "Clarify the quote, MOQ, sample plan, freight and shipment documents before placing an order.", href: "/resources/import-korean-sauces-from-china/", link: "Read the import guide" },
  { id: "kimchi", title: "Kimchi packs & cold chain", description: "Compare cuts, jars and bags, then confirm the specification and refrigerated route for your project.", href: "/products/kimchi/", link: "Browse kimchi" },
  { id: "sauces", title: "Sauce selection & kitchen testing", description: "Match Korean sauces, gochujang and seasoning systems to your channel and actual application.", href: "/products/korean-sauces/", link: "Browse Korean sauces" },
  { id: "oem", title: "Private label & custom formulas", description: "Set the flavor brief, packaging, artwork and validation requirements before approving production.", href: "/oem-private-label/", link: "Explore private label" },
  { id: "quality", title: "Certificates, ingredients & labels", description: "Check current documents against the actual product, formula, factory and destination.", href: "/quality-certifications/", link: "Review quality documents" },
  { id: "chili", title: "Chili powder, flakes & paprika", description: "Specify heat, grind, color, seed content and acceptance criteria for a comparable quotation.", href: "/products/chili-seasonings/", link: "Browse chili products" },
  { id: "frozen", title: "Frozen vegetables & loading", description: "Confirm vegetables, cuts, packing, mixed loads and the cold-chain plan by SKU.", href: "/products/frozen-vegetables/", link: "Browse frozen vegetables" },
] as const;

export type FaqTopic = (typeof faqTopics)[number]["id"];
export const buyerFaqs = questions;
export const faqTopicForCategory: Record<string, FaqTopic> = {
  "korean-sauces": "sauces", "gochujang-pastes": "sauces", kimchi: "kimchi",
  "chili-seasonings": "chili", "frozen-vegetables": "frozen",
};

import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";

// Use the same public product records as the rendered pages. No source workbook,
// supplier quotation or platform account export is read by this generator.
const catalogFile = new URL("../app/data/catalog.ts", import.meta.url);
const compiled = ts.transpileModule(await readFile(catalogFile, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText;
const catalogModule = { exports: {} };
vm.runInNewContext(compiled, { module: catalogModule, exports: catalogModule.exports, require: createRequire(catalogFile) }, { filename: "catalog.ts" });
const { catalogCategories, productDetails, getCatalogItemId } = catalogModule.exports;
const origin = "https://deesheng.food";
const date = "2026-11-14";
const mainPages = [
  ["Complete product catalogue", "/products/"],
  ...catalogCategories.map((category) => [category.name, `/products/${category.slug}/`]),
  ["OEM and private label", "/oem-private-label/"],
  ["Quality and certification scope", "/quality-certifications/"],
  ["HALAL Korean sauce sourcing", "/halal-korean-sauce-manufacturer/"],
  ["Buyer resources", "/resources/"],
  ["Food importer FAQ", "/buyer-faq/"],
  ["Mongolia buyer guide", "/markets/mongolia/"],
  ["Singapore buyer guide", "/markets/singapore/"],
  ["Request a quotation", "/contact/"],
];
const links = (items) => items.map(([label, path]) => `- [${label}](${origin}${path})`).join("\n");
const qualification = [
  "Product and pack specifications are specific to the named variant. Catalogue entries can represent flavors or pack formats and are not a count of unique formulas.",
  "Where a field requires confirmation, request the current specification for the exact SKU. Do not infer shelf life, storage, carton logistics, ingredients or allergens from another product or packaging format.",
  "The cabbage kimchi detail page lists 1 kg bags × 10 and 10 kg bulk packs with 0–4°C storage. Shelf life is confirmed for the selected product and pack. Retail jars and frozen kimchi projects require separate specifications.",
  "MOQ, samples, quotation, production timing and shipment terms are confirmed for the selected product, formula, pack, quantity and destination. Prices are not published.",
  "Relevant factory credentials include BRCGS Grade A, HACCP, HALAL and OU Kosher. Check current validity, manufacturing site, product and formula coverage, and destination recognition before order approval; a credential list does not certify every catalogue item.",
];
const contact = `Legal company: Qingdao Deesheng Hengxin Food Co., Ltd.\nLocation: Qingdao, Shandong, China\nContact: Kevin Wang, Deesheng Food\nEmail: info@deesheng.food\nWhatsApp / Tel: +86 156 2108 9573`;

const short = `# Deesheng Food

Last updated: ${date}

> B2B export supply of Korean sauces, gochujang, kimchi, chili powder, dry seasonings and frozen vegetables for importers, distributors, restaurant suppliers and private-label brands.

Canonical website: ${origin}/
${contact}

## Product and order qualification

${qualification.map((line) => `- ${line}`).join("\n")}

## Main pages

${links(mainPages)}

## Detailed product pages

${links(productDetails.map((product) => [product.name, `/product/${product.slug}/`]))}

## Machine-readable catalogue

${links([["Catalogue JSON", "/catalog.json"], ["Full product reference", "/llms-full.txt"], ["XML sitemap", "/sitemap.xml"]])}
`;

const full = [`# Deesheng Food — Full B2B Reference`, `Last updated: ${date}\nCanonical source: ${origin}/`, contact,
  `## Product and order qualification\n\n${qualification.map((line) => `- ${line}`).join("\n")}`,
  "## Product families and catalogue selections"];
for (const category of catalogCategories) {
  full.push(`### ${category.name}\n\nURL: ${origin}/products/${category.slug}/\n${category.description}\n${category.buyerNote}`);
  for (const item of category.items) {
    full.push(`#### ${item.name}\n\nSelection URL: ${origin}/products/${category.slug}/#${getCatalogItemId(category.slug, item)}\nGroup: ${item.group}\nPacking: ${item.packing}\nShelf life: ${item.shelfLife}\nStorage: ${item.storage}${item.detailSlug ? `\nProduct details: ${origin}/product/${item.detailSlug}/` : ""}`);
  }
}
full.push("## Detailed product specifications");
for (const product of productDetails) {
  full.push(`### ${product.name}\n\nURL: ${origin}/product/${product.slug}/\n${product.buyerAnswer ?? product.summary}\nApplications: ${product.applications.join("; ")}.`);
  if (product.packSpecifications?.length) {
    full.push(product.packSpecifications.map((spec) => {
      const logistics = [spec.netWeightKg === undefined ? null : `net ${spec.netWeightKg} kg`, spec.grossWeightKg === undefined ? null : `gross ${spec.grossWeightKg} kg`, spec.dimensionsMm ? `carton ${spec.dimensionsMm} mm` : null].filter(Boolean);
      if (spec.netWeightKg === undefined || spec.grossWeightKg === undefined || !spec.dimensionsMm) logistics.push("Carton logistics available on request");
      return `- ${spec.pack}: ${spec.shelfLife}; storage: ${spec.storage}; ${logistics.join("; ")}.`;
    }).join("\n"));
  } else {
    full.push(`Packing: ${product.packing.join("; ")}\nShelf life: ${product.shelfLife}\nStorage: ${product.storage}`);
  }
  if (product.packingNote) full.push(product.packingNote);
  full.push(product.buyerQuestions.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n\n"));
}
full.push(`## Buyer resources and contact\n\n${links(mainPages)}\n\nEmail: info@deesheng.food\nWhatsApp: https://wa.me/8615621089573`);

const outputs = [["llms.txt", short], ["llms-full.txt", `${full.join("\n\n")}\n`]];
const check = process.argv.includes("--check");
for (const [name, content] of outputs) {
  const file = new URL(`../public/${name}`, import.meta.url);
  if (check) {
    if (await readFile(file, "utf8") !== content) throw new Error(`${name} is stale. Run npm run catalog:generate.`);
  } else {
    await writeFile(file, content);
  }
}
console.log(`${check ? "Verified" : "Generated"} public references: ${catalogCategories.reduce((count, category) => count + category.items.length, 0)} catalogue entries and ${productDetails.length} detailed products.`);

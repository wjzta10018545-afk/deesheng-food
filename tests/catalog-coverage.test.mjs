import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const origin = "https://deesheng.food";
const { default: worker } = await import("../dist/server/index.js");
const cache = new Map();
const fetchPage = async (path) => {
  if (!cache.has(path)) {
    const response = await worker.fetch(new Request(`${origin}${path}`, { headers: { accept: "text/html" } }), {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    }, { waitUntil() {}, passThroughOnException() {} });
    assert.equal(response.status, 200, path);
    cache.set(path, await response.text());
  }
  return cache.get(path);
};
const decodeHtml = (value) => value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (_, entity) => {
  if (/^#x/i.test(entity)) return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
  if (entity.startsWith("#")) return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
  return { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " }[entity.toLowerCase()];
});
const normalizeText = (text) => text.replace(/\s+/g, " ").trim();
const visibleText = (html) => normalizeText(decodeHtml(html.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]*>/g, "")));
const structuredNodes = (html) => [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((match) => {
  const json = JSON.parse(match[1]);
  return json["@graph"] ?? [json];
});
const visibleFaqs = (html) => [...html.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/g)].flatMap((match) => {
  const question = match[1].match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/)?.[1];
  const answer = match[1].match(/<\/summary>\s*<p\b[^>]*>([\s\S]*?)<\/p>/)?.[1];
  if (question === undefined || answer === undefined) return [];
  return [{
    question: visibleText(question.replace(/<span\b[^>]*>[\s\S]*?<\/span>/g, "")),
    answer: visibleText(answer),
  }];
});
const sortedFaqs = (faqs) => faqs.map(({ question, answer }) => ({
  question: normalizeText(question), answer: normalizeText(answer),
})).sort((a, b) => a.question.localeCompare(b.question) || a.answer.localeCompare(b.answer));
const assertOnlyFields = (value, allowed, label) => {
  const extras = Object.keys(value).filter((field) => !allowed.includes(field));
  assert.deepEqual(extras, [], `${label}: only intentionally public fields`);
};
const pickFields = (value, allowed) => Object.fromEntries(Object.entries(value).filter(([field]) => allowed.includes(field)));
const publicProductFields = [
  "slug", "name", "categorySlug", "categoryName", "headline", "summary", "seoTitle", "metaDescription", "buyerAnswer",
  "applications", "packing", "packSpecifications", "packingNote", "shelfLife", "storage", "image", "imageAlt",
  "buyerQuestions", "relatedProductSlugs", "resourceLinks", "url",
];
const publicItemFields = ["name", "nameKo", "group", "packing", "packSpecifications", "shelfLife", "storage", "image", "detailSlug", "citation_url"];
const publicCategoryPackFields = ["variant", "pack", "dimensionsMm", "shelfLife", "storage"];
const publicPackFields = ["variant", "pack", "shelfLife", "storage", "netWeightKg", "grossWeightKg", "dimensionsMm"];
const forbiddenPublicData = /\[HOLD\]|Sheet[13]\b|DS-\d{3}|\b(?:profound|athenahq)\b|FOB\s*\d|(?:USD|CNY|RMB|US\$|\$|¥)\s*\d|\d[\d,.]*\s*(?:USD|CNY|RMB)\b|"(?:price|unitPrice|unit_price|cost|costPrice|cost_price|offers|aggregateRating)"\s*:/i;

const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
const pageUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const catalogue = JSON.parse(await fetchPage("/catalog.json/"));

test("every sitemap page exposes complete visible FAQ text matching its FAQ schema", async () => {
  assert.ok(pageUrls.length > 0);
  assert.equal(new Set(pageUrls).size, pageUrls.length, "Sitemap URLs are unique");
  for (const url of pageUrls) {
    const parsed = new URL(url);
    assert.equal(parsed.origin, origin, url);
    const html = await fetchPage(parsed.pathname);
    const visible = visibleFaqs(html);
    const schemaFaqs = structuredNodes(html)
      .filter((node) => node["@type"] === "FAQPage")
      .flatMap((node) => node.mainEntity.map((item) => ({ question: item.name, answer: item.acceptedAnswer.text })));
    assert.deepEqual(sortedFaqs(visible), sortedFaqs(schemaFaqs), `${url}: complete questions and answers match`);
    for (const faq of schemaFaqs) {
      assert.ok(normalizeText(faq.question) && normalizeText(faq.answer), `${url}: no empty FAQ text`);
    }
    // Flight payloads contain references such as "$1" which are not prices.
    // Check visible copy and structured data, not framework transport scripts.
    const publicCopy = visibleText(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, ""));
    assert.doesNotMatch(publicCopy, forbiddenPublicData, `${url}: no public prices or internal source markers`);
    assert.doesNotMatch(JSON.stringify(structuredNodes(html)), forbiddenPublicData, `${url}: no price or internal fields in structured data`);
  }
});

test("public catalogue preserves documented fields and every category citation resolves to its own card", async () => {
  assert.equal(catalogue.updated, "2026-11-14");
  assert.doesNotMatch(JSON.stringify(catalogue), forbiddenPublicData);
  assert.deepEqual(new Set(pageUrls.filter((url) => new URL(url).pathname.startsWith("/product/"))), new Set(catalogue.detailed_products.map((product) => product.url)));
  assert.equal(new Set(catalogue.detailed_products.map((product) => product.slug)).size, catalogue.detailed_products.length);
  const productsBySlug = new Map(catalogue.detailed_products.map((product) => [product.slug, product]));

  for (const category of catalogue.categories) {
    assertOnlyFields(category, ["slug", "name", "description", "products"], category.slug);
    const categoryHtml = await fetchPage(`/products/${category.slug}/`);
    const itemList = structuredNodes(categoryHtml).find((node) => node["@type"] === "ItemList");
    assert.ok(itemList, `${category.slug}: discoverable structured product list`);
    assert.deepEqual(itemList.itemListElement.map((item) => item.url), category.products.map((item) => item.citation_url), `${category.slug}: schema and catalogue cite the same product cards`);
    const citationUrls = new Set();
    for (const item of category.products) {
      assertOnlyFields(item, publicItemFields, `${category.slug}/${item.name}`);
      const id = `${category.slug}-${item.name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
      assert.equal(item.citation_url, `${origin}/products/${category.slug}/#${id}`);
      assert.ok(!citationUrls.has(item.citation_url), `${item.name}: distinct stable citation`);
      citationUrls.add(item.citation_url);
      const card = categoryHtml.match(new RegExp(`<article\\b[^>]*\\bid="${id}"[^>]*>([\\s\\S]*?)<\\/article>`))?.[1];
      assert.ok(card, `${item.citation_url}: target card exists`);
      assert.equal(visibleText(card.match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/)?.[1] ?? ""), item.name, `${item.name}: citation targets the named product`);
      const cardSpecs = Object.fromEntries([...card.matchAll(/<dt>([^<]+)<\/dt><dd>([\s\S]*?)<\/dd>/g)].map((match) => [match[1], visibleText(match[2])]));
      assert.deepEqual(cardSpecs, { Packing: normalizeText(item.packing), "Shelf life": normalizeText(item.shelfLife), Storage: normalizeText(item.storage) }, `${item.name}: each card preserves its own pack, shelf life and storage`);
      if (item.nameKo) {
        const koreanName = card.match(/<p\b[^>]*lang="ko"[^>]*>([\s\S]*?)<\/p>/)?.[1];
        assert.equal(visibleText(koreanName ?? ""), item.nameKo, `${item.name}: Korean product name is preserved`);
      }
      if (item.packSpecifications?.length) {
        const packTable = card.match(/<table class="catalogue-pack-table">([\s\S]*?)<\/table>/)?.[1];
        assert.ok(packTable, `${item.name}: catalogue carton table is visible`);
        const packBody = packTable.match(/<tbody>([\s\S]*?)<\/tbody>/)?.[1] ?? "";
        const packRows = [...packBody.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((row) => [...row[1].matchAll(/<(?:td|th)\b[^>]*>([\s\S]*?)<\/(?:td|th)>/g)].map((cell) => visibleText(cell[1])));
        assert.deepEqual(packRows, item.packSpecifications.map((spec) => [spec.pack, spec.dimensionsMm ?? "Confirm for this pack"]), `${item.name}: each catalogue pack has its own carton dimensions`);
        for (const spec of item.packSpecifications) assertOnlyFields(spec, publicCategoryPackFields, `${item.name}/${spec.pack}`);
      }
      for (const field of ["name", "group", "packing", "shelfLife", "storage"]) {
        assert.equal(typeof item[field], "string", `${item.name}/${field}`);
        assert.ok(item[field].trim(), `${item.name}/${field} is not empty`);
      }
      if (item.detailSlug) {
        assert.ok(productsBySlug.has(item.detailSlug), `${item.name}: linked product exists`);
        assert.ok(card.includes(`href="/product/${item.detailSlug}/"`), `${item.name}: detail link exists on its own card`);
      }
    }
  }

  for (const product of catalogue.detailed_products) {
    assertOnlyFields(product, publicProductFields, product.slug);
    assert.equal(product.url, `${origin}/product/${product.slug}/`);
    for (const field of ["slug", "name", "categorySlug", "categoryName", "headline", "summary", "shelfLife", "storage", "image", "imageAlt"]) {
      assert.equal(typeof product[field], "string", `${product.slug}/${field}`);
      assert.ok(product[field].trim(), `${product.slug}/${field} is not empty`);
    }
    assert.ok(Array.isArray(product.applications) && product.applications.length > 0, product.slug);
    assert.ok(Array.isArray(product.packing) && product.packing.length > 0, product.slug);
    const html = await fetchPage(new URL(product.url).pathname);
    assert.ok(html.includes(`<link rel="canonical" href="${product.url}"`), product.slug);
    assert.deepEqual(sortedFaqs(visibleFaqs(html)), sortedFaqs(product.buyerQuestions), `${product.slug}: catalogue FAQ text`);
    for (const faq of product.buyerQuestions) assertOnlyFields(faq, ["question", "answer"], product.slug);
    for (const resource of product.resourceLinks ?? []) assertOnlyFields(resource, ["href", "label"], product.slug);
    for (const spec of product.packSpecifications ?? []) assertOnlyFields(spec, publicPackFields, `${product.slug}/${spec.pack}`);
    if (!product.seoTitle && (product.categorySlug === "korean-sauces" || product.categorySlug === "gochujang-pastes")) {
      assert.doesNotMatch(visibleText(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ""), /^HALAL\b/i, `${product.slug}: no category-wide certification claim`);
    }
    await access(new URL(`../public${product.image}`, import.meta.url));
  }
});

test("each carton row retains its own specification and missing logistics stay explicitly unknown", async () => {
  const onRequest = "Carton logistics available on request";
  for (const product of catalogue.detailed_products) {
    const html = await fetchPage(new URL(product.url).pathname);
    const table = html.match(/<table class="pack-spec-table">([\s\S]*?)<\/table>/)?.[1];
    if (!product.packSpecifications) {
      assert.equal(table, undefined, `${product.slug}: no invented pack table`);
      continue;
    }
    assert.ok(table, product.slug);
    const body = table.match(/<tbody>([\s\S]*?)<\/tbody>/)?.[1] ?? "";
    const rows = [...body.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((row) => [...row[1].matchAll(/<(?:td|th)\b[^>]*>([\s\S]*?)<\/(?:td|th)>/g)].map((cell) => visibleText(cell[1])));
    const hasVariants = product.packSpecifications.some((spec) => Boolean(spec.variant));
    const headers = [...(table.match(/<thead>([\s\S]*?)<\/thead>/)?.[1] ?? "").matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map((cell) => visibleText(cell[1]));
    assert.deepEqual(headers, [...(hasVariants ? ["Variant"] : []), "Pack per carton", "Shelf life", "Storage", "Net weight", "Gross weight", "Carton dimensions"], `${product.slug}: optional variant column preserves existing tables`);
    const expected = product.packSpecifications.map((spec) => [
      ...(hasVariants ? [spec.variant ?? "Confirm variant"] : []),
      spec.pack, spec.shelfLife, spec.storage,
      spec.netWeightKg === undefined ? onRequest : `${spec.netWeightKg} kg`,
      spec.grossWeightKg === undefined ? onRequest : `${spec.grossWeightKg} kg`,
      spec.dimensionsMm ? `${spec.dimensionsMm} mm` : onRequest,
    ].map(normalizeText));
    assert.deepEqual(rows, expected, `${product.slug}: exact row/column values prevent borrowing another pack's logistics`);
    assert.equal(new Set(product.packSpecifications.map((spec) => JSON.stringify([spec.variant ?? "", spec.pack]))).size, product.packSpecifications.length, `${product.slug}: variant/pack rows are unambiguous`);
  }

  // Compare JSON-backed source records too, so omissions in the public projection
  // cannot pass merely because the page and the public record share an omission.
  const dataDirectory = new URL("../app/data/", import.meta.url);
  for (const file of await readdir(dataDirectory)) {
    if (!file.endsWith(".json")) continue;
    const data = JSON.parse(await readFile(new URL(file, dataDirectory), "utf8"));
    if (!Array.isArray(data)) continue;
    for (const source of data.filter((item) => item.slug && Array.isArray(item.buyerQuestions))) {
      const published = catalogue.detailed_products.find((item) => item.slug === source.slug);
      assert.ok(published, `${file}/${source.slug}: source product is published`);
      const publicSource = pickFields(source, publicProductFields);
      if (publicSource.packSpecifications) publicSource.packSpecifications = publicSource.packSpecifications.map((spec) => pickFields(spec, publicPackFields));
      if (publicSource.buyerQuestions) publicSource.buyerQuestions = publicSource.buyerQuestions.map((faq) => pickFields(faq, ["question", "answer"]));
      if (publicSource.resourceLinks) publicSource.resourceLinks = publicSource.resourceLinks.map((link) => pickFields(link, ["href", "label"]));
      for (const [field, value] of Object.entries(publicSource)) {
        assert.deepEqual(published[field], value, `${file}/${source.slug}/${field}: original public fact preserved`);
      }
    }
  }
});

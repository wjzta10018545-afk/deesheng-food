import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const sauces = JSON.parse(await readFile(new URL("../app/data/aeo-sauces.json", import.meta.url), "utf8"));
const { default: worker } = await import("../dist/server/index.js");
const htmlCache = new Map();
const fetchPage = async (path) => {
  if (!htmlCache.has(path)) {
    const response = await worker.fetch(new Request(`https://deesheng.food${path}`, { headers: { accept: "text/html" } }), {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    }, { waitUntil() {}, passThroughOnException() {} });
    assert.equal(response.status, 200, path);
    htmlCache.set(path, await response.text());
  }
  return htmlCache.get(path);
};
const escapeHtml = (text) => text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const tableRows = (html) => {
  const table = html.match(/<table class="pack-spec-table">([\s\S]*?)<\/table>/)?.[1];
  assert.ok(table, "A visible pack specification table must be rendered");
  const body = table.match(/<tbody>([\s\S]*?)<\/tbody>/)?.[1];
  assert.ok(body);
  return [...body.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((match) => match[1]);
};
const rowFor = (html, pack) => {
  const row = tableRows(html).find((row) => row.includes(`>${escapeHtml(pack)}</th>`));
  assert.ok(row, pack);
  return row;
};

test("all 18 sauce pages render matching buyer answers, FAQs, specifications and working links", async () => {
  assert.equal(sauces.length, 18);
  assert.equal(new Set(sauces.map((item) => item.slug)).size, 18);
  const category = await fetchPage("/products/korean-sauces/");
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  const llms = await readFile(new URL("../public/llms.txt", import.meta.url), "utf8");
  const fullReference = await readFile(new URL("../public/llms-full.txt", import.meta.url), "utf8");
  // Vinext normalizes route handlers to a trailing slash; the canonical export
  // also writes the extension URL as out/catalog.json for the public host.
  const catalogue = JSON.parse(await fetchPage("/catalog.json/"));
  assert.equal(catalogue.detailed_products.length, 27);
  const productUrls = [...sitemap.matchAll(/<loc>(https:\/\/deesheng\.food\/product\/[^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(new Set(productUrls), new Set(catalogue.detailed_products.map((product) => product.url)));

  for (const product of sauces) {
    const path = `/product/${product.slug}/`;
    const html = await fetchPage(path);
    const url = `https://deesheng.food${path}`;
    assert.ok(category.includes(`href="${path}"`), `${path} is discoverable from its category`);
    assert.ok(llms.includes(url) && fullReference.includes(url));
    assert.ok(html.includes(`<link rel="canonical" href="${url}"`));
    assert.ok(html.includes(`<title>${escapeHtml(product.seoTitle)}</title>`));
    assert.ok(html.includes(`name="description" content="${escapeHtml(product.metaDescription)}"`));
    assert.ok(html.includes(escapeHtml(product.buyerAnswer)));
    assert.ok(html.indexOf(escapeHtml(product.buyerAnswer)) < html.indexOf('class="spec-band"'), "The direct buyer answer appears before specifications");
    assert.equal((html.match(/<details>/g) ?? []).length, 8, product.slug);
    assert.equal(new Set(product.buyerQuestions.map((faq) => faq.question)).size, 8);
    const structured = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((match) => {
      const json = JSON.parse(match[1]);
      return json["@graph"] ?? [json];
    });
    const faqSchema = structured.find((item) => item["@type"] === "FAQPage");
    assert.ok(faqSchema, product.slug);
    assert.deepEqual(faqSchema.mainEntity.map((item) => ({ question: item.name, answer: item.acceptedAnswer.text })), product.buyerQuestions);
    for (const faq of product.buyerQuestions) {
      assert.ok(html.includes(`<summary>${escapeHtml(faq.question)}<span>`), `${product.slug}: visible question`);
      assert.ok(html.includes(`<p>${escapeHtml(faq.answer)}</p>`), `${product.slug}: visible answer`);
    }
    assert.equal(tableRows(html).length, product.packSpecifications.length);
    for (const spec of product.packSpecifications) {
      const row = rowFor(html, spec.pack);
      for (const value of [spec.shelfLife, spec.storage, spec.netWeightKg === undefined ? "Confirm" : `${spec.netWeightKg} kg`, spec.grossWeightKg === undefined ? "Confirm" : `${spec.grossWeightKg} kg`, spec.dimensionsMm ? `${spec.dimensionsMm} mm` : "Confirm"]) {
        assert.ok(row.includes(`>${escapeHtml(value)}</td>`), `${product.slug} / ${spec.pack} / ${value}`);
      }
    }
    const publicRecord = catalogue.detailed_products.find((item) => item.slug === product.slug);
    assert.deepEqual(publicRecord.packSpecifications, product.packSpecifications);
    assert.deepEqual(publicRecord.buyerQuestions, product.buyerQuestions);
    for (const href of [...product.relatedProductSlugs.map((slug) => `/product/${slug}/`), ...product.resourceLinks.map((link) => link.href)]) {
      assert.ok(html.includes(`href="${href}"`), `${product.slug}: ${href}`);
      await fetchPage(href);
    }
    await access(new URL(`../public${product.image}`, import.meta.url));
    assert.doesNotMatch(JSON.stringify(publicRecord), /\[HOLD\]|Sheet[13]|DS-\d{3}|profound|athenahq|FOB\s*\d|(?:USD|CNY|RMB|\$|¥)\s*\d|"(?:price|offers|aggregateRating)"/i);
  }
});

test("pack-specific shelf lives and exceptional carton weights survive rendering", async () => {
  const mustard = await fetchPage("/product/honey-mustard-sauce/");
  assert.match(rowFor(mustard, "360 g bottle × 24"), />12 months<\/td>/);
  assert.match(rowFor(mustard, "360 g × 30"), />9 months<\/td>/);
  assert.match(rowFor(mustard, "360 g × 30"), />Confirm for this pack<\/td>/);
  assert.match(rowFor(mustard, "1 kg × 10"), />9 months<\/td>/);
  assert.match(rowFor(mustard, "1 kg pouch × 12"), />12 months<\/td>/);
  for (const slug of ["soft-tofu-soup-sauce", "spicy-pork-belly-sauce"]) {
    const html = await fetchPage(`/product/${slug}/`);
    assert.match(rowFor(html, "1 kg pouch × 12"), />12\.9 kg<\/td>/);
    assert.doesNotMatch(rowFor(html, "1 kg × 10"), /12\.9|12\.85|320 × 240 × 250/);
  }
  for (const slug of ["spicy-bbq-dipping-sauce", "non-spicy-bbq-dipping-sauce", "non-spicy-budae-jjigae-sauce"]) {
    const html = await fetchPage(`/product/${slug}/`);
    assert.equal(tableRows(html).length, 2);
    assert.ok(rowFor(html, "400 g × 30"));
    assert.ok(rowFor(html, "1 kg × 10"));
    assert.doesNotMatch(tableRows(html).join(""), /200 g|350 g|12\.85|13\.7/);
  }
  const sweet = await fetchPage("/product/sweet-spicy-fried-chicken-sauce/");
  assert.doesNotMatch(tableRows(sweet).join(""), /40 g|48 g/);
  const gochujang = await fetchPage("/product/gochujang/");
  assert.equal(tableRows(gochujang).length, 2);
  assert.doesNotMatch(tableRows(gochujang).join(""), /200 g/);
});

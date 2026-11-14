import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const { default: worker } = await import("../dist/server/index.js");
const cache = new Map();
async function fetchText(path) {
  if (!cache.has(path)) {
    const response = await worker.fetch(new Request(`https://deesheng.food${path}`), {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    }, { waitUntil() {}, passThroughOnException() {} });
    assert.equal(response.status, 200, path);
    cache.set(path, await response.text());
  }
  return cache.get(path);
}
const catalogue = JSON.parse(await fetchText("/catalog.json/"));
const dimensionNumbers = (text) => text === undefined ? null : (text.match(/\d+/g) ?? []).map(Number);
const escapeHtml = (text) => text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

// Independent acceptance fixtures transcribed from the reviewed source sheet,
// not derived from aeo-kimchi.json. Each variant/pack retains its own carton.
const expectedRows = {
  "korean-cabbage-kimchi": [
    ["Whole cabbage kimchi", "10 kg carton", [325, 212, 212]],
    ["Whole cabbage kimchi", "5 kg carton", [250, 170, 190]],
    ["Whole cabbage kimchi", "5 kg bag × 2", [333, 220, 217]],
    ["Mat cut cabbage kimchi", "10 kg carton", [325, 212, 212]],
    ["Mini mat diced cabbage kimchi", "10 kg carton", [325, 212, 212]],
  ],
  "cabbage-kimchi-jars": [
    ["Mat cut cabbage kimchi — jars", "300 g jar × 36", [431, 325, 230]],
    ["Mat cut cabbage kimchi — jars", "480 g jar × 24", [470, 355, 185]],
    ["Mat cut cabbage kimchi — jars", "1 kg jar × 12", [350, 250, 260]],
  ],
  "white-washed-stir-fried-kimchi": [
    ["White kimchi", "10 kg carton", [325, 215, 217]],
    ["Washed kimchi", "10 kg carton", [325, 215, 217]],
    ["Stir-fried kimchi", "10 kg carton", [325, 212, 212]],
  ],
  "radish-kimchi": [
    ["Chonggak radish kimchi", "5 kg carton", [250, 190, 200]],
    ["Chonggak radish kimchi", "1 kg bottle × 12", [350, 250, 260]],
    ["Kkakdugi cubed radish kimchi", "10 kg carton", [325, 212, 207]],
    ["Kkakdugi cubed radish kimchi", "1 kg bottle × 12", [350, 250, 260]],
    ["Kkakdugi cubed radish kimchi", "300 g bottle × 36", [431, 325, 230]],
    ["Kkakdugi cubed radish kimchi", "500 g bottle × 24", [470, 355, 185]],
  ],
  "scallion-kimchi": [
    ["Spring onion kimchi (쪽파김치)", "5 kg carton", [250, 190, 200]],
    ["Spring onion kimchi (쪽파김치)", "1 kg bottle × 12", [350, 250, 260]],
    ["Scallion kimchi (대파김치)", "5 kg carton", [250, 190, 200]],
  ],
  "garlic-sprout-pickles": [
    ["Seasoned garlic sprouts", "1 kg bag × 10", [380, 285, 150]],
    ["Seasoned garlic sprouts", "200 g bag × 10", [275, 200, 100]],
    ["Seasoned garlic sprouts", "3 kg bag × 4", [380, 280, 210]],
    ["Soy sauce garlic sprouts", "300 g bottle × 36", [431, 325, 230]],
    ["Soy sauce garlic sprouts", "500 g bottle × 24", [470, 355, 185]],
    ["Soy sauce garlic sprouts", "3 kg bag × 4", [380, 280, 210]],
    ["Sweet and sour garlic sprouts", "300 g bottle × 36", [431, 325, 230]],
    ["Sweet and sour garlic sprouts", "500 g bottle × 24", [470, 355, 185]],
    ["Sweet and sour garlic sprouts", "3 kg bag × 4", [380, 280, 210]],
  ],
  "pickled-green-pepper": [
    ["Seasoned green pepper", "300 g bottle × 36", [431, 325, 230]],
    ["Seasoned green pepper", "500 g bottle × 24", [470, 355, 185]],
    ["Seasoned green pepper", "3 kg bag × 4", [380, 280, 210]],
    ["Soy sauce green pepper", "300 g bottle × 36", [431, 325, 230]],
    ["Soy sauce green pepper", "500 g bottle × 24", [470, 355, 185]],
    ["Soy sauce green pepper", "3 kg bag × 4", [380, 280, 210]],
    ["Sweet and sour green pepper", "300 g bottle × 36", [431, 325, 230]],
    ["Sweet and sour green pepper", "500 g bottle × 24", [470, 355, 185]],
    ["Sweet and sour green pepper", "3 kg bag × 4", [380, 280, 210]],
  ],
};

test("seven kimchi family pages retain all 38 independently verified variant/pack/carton rows", async () => {
  assert.equal(Object.values(expectedRows).reduce((sum, rows) => sum + rows.length, 0), 38);
  for (const [slug, expected] of Object.entries(expectedRows)) {
    const product = catalogue.detailed_products.find((item) => item.slug === slug);
    assert.ok(product, `${slug}: public detail page`);
    assert.deepEqual(product.packSpecifications.map((spec) => [spec.variant, spec.pack, dimensionNumbers(spec.dimensionsMm)]), expected, `${slug}: exact source variant/pack/carton mapping`);
    const html = await fetchText(`/product/${slug}/`);
    const body = html.match(/<table class="pack-spec-table">[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/)?.[1];
    assert.ok(body, slug);
    const rows = [...body.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((row) => row[1]);
    assert.equal(rows.length, expected.length, slug);
    expected.forEach(([variant, pack, dimensions], index) => {
      assert.ok(rows[index].startsWith(`<th scope="row">${escapeHtml(variant)}</th><td>${escapeHtml(pack)}</td>`), `${slug}: variant and pack share one visible row`);
      assert.ok(rows[index].includes(`<td>${dimensions.join(" × ")} mm</td>`), `${slug}/${variant}/${pack}: correct carton on the same row`);
    });
    for (const spec of product.packSpecifications) {
      assert.equal(spec.shelfLife, "Confirm for the selected product and pack");
      assert.equal(spec.storage, "Confirm for the selected product and pack");
      assert.equal(spec.netWeightKg, undefined, `${slug}: no invented carton net weight`);
      assert.equal(spec.grossWeightKg, undefined, `${slug}: no invented carton gross weight`);
    }
  }
});

test("catalogue carton details preserve special packs and withhold the anomalous radish dimension", async () => {
  const kimchi = catalogue.categories.find((item) => item.slug === "kimchi");
  assert.ok(kimchi);
  assert.equal(kimchi.products.length, 37);
  assert.equal(kimchi.products.filter((item) => item.packSpecifications?.length).length, 27);
  const selected = {
    "Cabbage Kimchi — Retail Jar": [
      ["300 g jar × 36", [431, 325, 230]], ["480 g jar × 24", [470, 355, 185]], ["1 kg jar × 12", [350, 250, 260]],
    ],
    "Pickled Radish": [
      ["1 kg × 10", null], ["300 g bottle × 36", [431, 325, 230]], ["500 g bottle × 24", [470, 355, 185]],
    ],
    "Seasoned Perilla Leaves": [
      ["1 kg bag × 10", [380, 285, 150]], ["180 g bag × 10", [275, 200, 100]],
    ],
    "Soy Sauce Perilla Leaves": [
      ["1 kg × 10", [380, 285, 150]], ["180 g bag × 10", [275, 200, 100]], ["3 kg bag × 4", [380, 280, 210]],
    ],
  };
  for (const [name, expected] of Object.entries(selected)) {
    const item = kimchi.products.find((product) => product.name === name);
    assert.ok(item, name);
    assert.deepEqual(item.packSpecifications.map((spec) => [spec.pack, dimensionNumbers(spec.dimensionsMm)]), expected, `${name}: source-specific carton mappings`);
  }
  const html = await fetchText("/products/kimchi/");
  const radish = html.match(/<article\b[^>]*id="kimchi-pickled-radish"[^>]*>([\s\S]*?)<\/article>/)?.[1];
  assert.ok(radish);
  assert.ok(radish.includes('<th scope="row">1 kg × 10</th><td>Confirm for this pack</td>'), "Do not silently correct or publish the anomalous source value");
});

test("public kimchi outputs omit the anomalous dimension, raw source identifiers and prices", async () => {
  const forbidden = /\b3380\b|"(?:sourceNumber|nameZh|provenance|supplier|price|unitPrice|grossWeight)"\s*:|(?:USD|CNY|RMB|\$|¥)\s*\d/i;
  assert.doesNotMatch(JSON.stringify(catalogue), forbidden);
  for (const path of ["/products/kimchi/", ...Object.keys(expectedRows).map((slug) => `/product/${slug}/`)]) {
    const html = await fetchText(path);
    const copy = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, "");
    assert.doesNotMatch(copy, forbidden, path);
  }
  for (const filename of ["llms.txt", "llms-full.txt"]) {
    assert.doesNotMatch(await readFile(new URL(`../public/${filename}`, import.meta.url), "utf8"), forbidden, filename);
  }
});

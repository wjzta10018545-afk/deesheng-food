import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const fetchHtml = async (worker, path = "/") => {
  const response = await worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
};

test("renders the branded homepage and four active product entrances", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const html = await fetchHtml(worker);
  assert.match(html, /<title>Korean Sauce Manufacturer &amp; Food OEM China \| Deesheng/);
  assert.match(html, /Korean food manufacturing for global buyers/);
  assert.equal((html.match(/class="sourcing-shortcuts-grid"/g) ?? []).length, 1);
  assert.match(html, /Private-label gochujang buyer guide/);
  assert.equal((html.match(/class="primary-category-card"/g) ?? []).length, 4);
  assert.match(html, /Korean Sauces/);
  assert.match(html, /Korean Kimchi/);
  assert.match(html, /Korean Chili Powder &amp; Seasonings/);
  assert.match(html, /Frozen Vegetables/);
  assert.match(html, /Request current documents/);
  assert.match(html, /shc-halal-document\.webp/);
  assert.doesNotMatch(html, /certificate no\./i);
  assert.match(html, /BRCGS Food Safety/);
  assert.match(html, /SHC HALAL/);
  assert.match(html, /OU Kosher/);
  assert.match(html, /From brief to export-ready product/);
  assert.equal((html.match(/class="home-assurance-card/g) ?? []).length, 8);
  assert.doesNotMatch(html, /USDA Organic|EU Organic/);
  assert.equal((html.match(/<li><span>0[1-4]<\/span><div><h3>/g) ?? []).length, 4);
});

test("renders buyer-decision content and the export-facing company identity", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const productHtml = await fetchHtml(worker, "/product/gochujang/");
  assert.match(productHtml, /B2B buying guide/);
  assert.match(productHtml, /Best-fit buyers/);
  assert.match(productHtml, /Supermarket and Asian-grocery distributors/);
  assert.match(productHtml, /Send this buyer brief/);

  const aboutHtml = await fetchHtml(worker, "/about/");
  assert.match(aboutHtml, /Factory-backed export support/);
  assert.match(aboutHtml, /Export inquiry website/);
  assert.doesNotMatch(aboutHtml, /deesheng\.com/);
});

test("publishes one trailing-slash URL format for search engines", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const productHtml = await fetchHtml(worker, "/product/gochujang/");
  assert.match(productHtml, /<link rel="canonical" href="https:\/\/deesheng\.food\/product\/gochujang\/"/);
  assert.match(productHtml, /<meta property="og:url" content="https:\/\/deesheng\.food\/product\/gochujang\/"/);
  assert.match(productHtml, /href="\/products\/korean-sauces\/"/);
  assert.match(productHtml, /href="\/contact\/\?product=gochujang"/);

  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  const locations = [...sitemap.matchAll(/<loc>(https:\/\/deesheng\.food\/[^<]*)<\/loc>/g)].map((match) => match[1]);
  assert.equal(locations.length, 38);
  assert.ok(locations.every((location) => new URL(location).pathname.endsWith("/")));
  assert.ok(locations.includes("https://deesheng.food/markets/mongolia/"));
  assert.ok(locations.includes("https://deesheng.food/markets/singapore/"));
  assert.equal((sitemap.match(/<lastmod>2026-09-17<\/lastmod>/g) ?? []).length, 19);
  assert.equal((sitemap.match(/<lastmod>2026-09-14<\/lastmod>/g) ?? []).length, 5);
  assert.equal((sitemap.match(/<lastmod>2026-09-07<\/lastmod>/g) ?? []).length, locations.length - 24);
});

test("renders country buyer pages with qualified B2B search intent", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const mongoliaHtml = await fetchHtml(worker, "/markets/mongolia/");
  assert.match(mongoliaHtml, /Korean Sauce Supplier for Mongolia \| HALAL OEM &amp; Wholesale/);
  assert.match(mongoliaHtml, /How can a Mongolia importer source wholesale Korean sauce from China/);
  assert.match(mongoliaHtml, /14 kg foodservice cartons/);
  assert.match(mongoliaHtml, /does not claim destination-market approval/);

  const singaporeHtml = await fetchHtml(worker, "/markets/singapore/");
  assert.match(singaporeHtml, /Korean Sauce Supplier for Singapore \| HALAL OEM &amp; Wholesale/);
  assert.match(singaporeHtml, /restaurant and central-kitchen supply/);
  assert.match(singaporeHtml, /local acceptance, registration and label requirements/);
});

test("renders every brochure product with its own catalogue image", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  for (const [path, expectedCount, folder] of [
    ["/products/korean-sauces/", 114, "sauces"],
    ["/products/kimchi/", 24, "kimchi"],
    ["/products/chili-seasonings/", 31, "chili"],
    ["/products/frozen-vegetables/", 90, "frozen"],
  ]) {
    const html = await fetchHtml(worker, path);
    assert.equal((html.match(/class="product-card"/g) ?? []).length, expectedCount);
    const images = [...html.matchAll(new RegExp(`/media/catalog-products/${folder}/[^"?]+\\.webp`, "g"))].map((match) => match[0]);
    assert.equal(new Set(images).size, expectedCount);
  }
});

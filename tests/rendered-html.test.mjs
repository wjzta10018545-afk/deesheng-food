import assert from "node:assert/strict";
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
  assert.match(html, /<title>Deesheng Food \| HALAL Korean Sauce Manufacturer/);
  assert.equal((html.match(/class="primary-category-card"/g) ?? []).length, 4);
  assert.match(html, /Korean Sauces/);
  assert.match(html, /Korean Kimchi/);
  assert.match(html, /Korean Chili Powder &amp; Seasonings/);
  assert.match(html, /Frozen Vegetables/);
  assert.match(html, /Current documents supplied to qualified B2B buyers/);
  assert.match(html, /shc-halal\.png/);
  assert.doesNotMatch(html, /certificate no\./i);
  assert.match(html, /BRCGS Food Safety/);
  assert.match(html, /SHC HALAL/);
  assert.match(html, /OU Kosher/);
  assert.match(html, /From brief to export-ready product/);
  assert.equal((html.match(/class="home-assurance-card/g) ?? []).length, 10);
  assert.equal((html.match(/<li><span>0[1-4]<\/span><div><h3>/g) ?? []).length, 4);
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

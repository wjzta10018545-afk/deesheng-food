import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve("out");
const origin = "https://deesheng.food";
const decode = (value) => value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (_, entity) => {
  if (/^#x/i.test(entity)) return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
  if (entity.startsWith("#")) return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
  return { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " }[entity.toLowerCase()];
});
const text = (value) => decode(value.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const localFile = (pathname) => resolve(root, `.${decodeURIComponent(pathname)}${pathname.endsWith("/") ? "index.html" : ""}`);
const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.equal(new Set(urls).size, urls.length, "Unique sitemap URLs");
assert.ok(urls.length > 0, "Sitemap is populated");
const pages = new Map();
const resources = new Set();
let faqCount = 0;
for (const url of urls) {
  const parsed = new URL(url);
  assert.equal(parsed.origin, origin, url);
  assert.ok(parsed.pathname.endsWith("/"), url);
  const html = await readFile(localFile(parsed.pathname), "utf8");
  pages.set(parsed.pathname, html);
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`), `${url}: self canonical`);
  assert.doesNotMatch(html, /(?:href|src)="\/deesheng-food(?:\/|\")/, `${url}: root-domain export without GitHub Pages prefix`);
  const nodes = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((match) => {
    const data = JSON.parse(match[1]);
    return data["@graph"] ?? [data];
  });
  const schema = nodes.filter((node) => node["@type"] === "FAQPage").flatMap((node) => node.mainEntity.map((faq) => [text(faq.name), text(faq.acceptedAnswer.text)]));
  const visible = [...html.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/g)].flatMap((match) => {
    const question = match[1].match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/)?.[1];
    const answer = match[1].match(/<\/summary>\s*<p\b[^>]*>([\s\S]*?)<\/p>/)?.[1];
    return question === undefined || answer === undefined ? [] : [[text(question.replace(/<span\b[^>]*>[\s\S]*?<\/span>/g, "")), text(answer)]];
  });
  const sortFaqs = (faqs) => faqs.map((faq) => JSON.stringify(faq)).sort();
  assert.deepEqual(sortFaqs(schema), sortFaqs(visible), `${url}: complete visible FAQ/schema equality`);
  faqCount += visible.length;
  const copy = text(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, ""));
  assert.doesNotMatch(copy, /(?:USD|CNY|RMB|US\$|\$|¥)\s*\d|\d[\d,.]*\s*(?:USD|CNY|RMB)\b|\[HOLD\]|\b(?:profound|athenahq)\b/i, `${url}: public copy excludes prices and internal source markers`);
  for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
    const resource = new URL(decode(match[1]), url);
    if (resource.origin !== origin) continue;
    resources.add(resource.pathname);
    assert.ok(localFile(resource.pathname).startsWith(`${root}/`), "Resource remains inside export");
  }
}
for (const resource of resources) await access(localFile(resource));
const catalogue = JSON.parse(await readFile(resolve(root, "catalog.json"), "utf8"));
assert.deepEqual(new Set(catalogue.detailed_products.map((product) => product.url)), new Set(urls.filter((url) => new URL(url).pathname.startsWith("/product/"))));
let selections = 0;
for (const category of catalogue.categories) {
  const html = pages.get(`/products/${category.slug}/`);
  const ids = new Set();
  for (const item of category.products) {
    const citation = new URL(item.citation_url);
    const id = citation.hash.slice(1);
    assert.equal(citation.pathname, `/products/${category.slug}/`);
    assert.ok(id && !ids.has(id) && html.includes(`id="${id}"`), `${item.name}: distinct citation target`);
    ids.add(id);
    selections += 1;
  }
}
for (const file of ["llms.txt", "llms-full.txt", "sitemap.xml"]) {
  assert.equal(await readFile(resolve(root, file), "utf8"), await readFile(resolve("public", file), "utf8"), `${file}: exported copy is current`);
}
console.log(`Canonical export verified: ${urls.length} pages, ${catalogue.detailed_products.length} detailed products, ${selections} catalogue selections, ${faqCount} matching FAQ pairs, ${resources.size} local resources and links.`);

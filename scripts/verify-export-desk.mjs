import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

// A production capture supplies independent route/canonical/H1 expectations.
// Pass the full pre-release qa-before.json as argv[2] to compare with that capture.
const baselinePath = process.argv[2] || "tests/fixtures/export-desk-baseline-20261125.json";
const baseline = JSON.parse(await readFile(resolve(baselinePath), "utf8"));
const origin = "https://deesheng.food";
const exportOrigin = "https://nexuspointtrade.com";
const out = resolve("out");
const decode = (value) => value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (_, entity) => {
  if (/^#x/i.test(entity)) return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
  if (entity.startsWith("#")) return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
  return { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " }[entity.toLowerCase()];
});
const text = (value) => decode(value.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const attr = (attributes, name) => decode(attributes.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1] || "");
const assertFollowed = (attributes, label) => assert.doesNotMatch(attr(attributes, "rel"), /\b(nofollow|sponsored|ugc)\b/i, label);
const assertUtm = (url, medium, label) => {
  assert.equal(url.origin, exportOrigin, label);
  assert.equal(url.searchParams.get("utm_source"), "deesheng_food", label);
  assert.equal(url.searchParams.get("utm_medium"), medium, label);
  assert.equal(url.searchParams.get("utm_campaign"), "export_desk", label);
};
const department = {
  "@type": "Organization",
  name: "NexusPoint Food Trade (International Export & Private-Label Desk)",
  url: "https://nexuspointtrade.com/",
  email: "info@nexuspointtrade.com",
};
const expectedEditorial = new Map([
  ["/", "https://nexuspointtrade.com/"],
  ["/products/korean-sauces/", "https://nexuspointtrade.com/food/shelf-stable-sauces"],
  ["/products/kimchi/", "https://nexuspointtrade.com/food/kimchi"],
  ["/products/chili-seasonings/", "https://nexuspointtrade.com/food/dried-chili-seasonings"],
  ["/products/frozen-vegetables/", "https://nexuspointtrade.com/food/frozen-fruit-vegetables"],
  ["/halal-korean-sauce-manufacturer/", "https://nexuspointtrade.com/quality#halal-certification"],
]);
const note = "Direct export quotation, OEM Studio & consolidated FOB Qingdao shipping handled by our export desk at NexusPoint (nexuspointtrade.com).";
const announcement = "International Export, OEM & Private-Label Desk — Managed by NexusPoint (nexuspointtrade.com) · U.S. & China Contracting · FOB Qingdao";
const sitemap = await readFile(resolve(out, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
assert.equal(urls.length, 54, "All 54 original public pages remain in the export");
assert.equal(new Set(urls).size, urls.length, "Sitemap URLs remain unique");
assert.deepEqual(new Set(urls), new Set(baseline.sitemap_urls), "Original sitemap route set is unchanged");
let ctaCount = 0;
let editorialCount = 0;
for (const url of urls) {
  const pathname = new URL(url).pathname;
  const expected = baseline.pages.find((page) => page.url === url);
  assert.ok(expected, `${url}: independently captured baseline exists`);
  const html = await readFile(resolve(out, `.${pathname}index.html`), "utf8");
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  assert.ok(head, `${url}: document head exists`);
  const scripts = [...head.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const organization = scripts.flatMap((data) => data["@graph"] ?? [data]).find((node) => node["@type"] === "Organization" && node["@id"] === `${origin}/#organization`);
  assert.ok(organization, `${url}: manufacturer Organization is rendered in head`);
  assert.deepEqual(organization.department, department, `${url}: exact official export department entity`);
  assert.equal(attr(head.match(/<link\b[^>]*rel="canonical"[^>]*>/i)?.[0] || "", "href"), expected.canonical, `${url}: original canonical retained`);
  assert.doesNotMatch(head, /<meta\b[^>]*name="robots"[^>]*content="[^"]*\bnoindex\b/i, `${url}: no new noindex`);
  const rendered = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, "");
  assert.equal(text(rendered.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || ""), expected.h1, `${url}: original H1 retained`);
  assert.doesNotMatch(rendered, /Play MAMAZAN|mamazan-legend|nexuspointapparel\.com|\bapparel\b|\bknitwear\b/i, `${url}: professional food-only public page`);
  assert.doesNotMatch(rendered, /<a\b[^>]*href="(?:\/contact\/(?:\?|\")|https:\/\/wa\.me\/8615621089573|mailto:info@deesheng\.food)/i, `${url}: no old contact conversion links`);
  const banner = rendered.match(/<aside\b[^>]*class="export-announcement"[^>]*>[\s\S]*?<a([^>]*)>([\s\S]*?)<\/a>/);
  assert.ok(banner, `${url}: announcement bar is visible`);
  assert.equal(text(banner[2]), announcement, `${url}: exact announcement text`);
  const bannerUrl = new URL(attr(banner[1], "href"));
  assertUtm(bannerUrl, "banner", `${url}: banner attribution`);
  assert.equal(bannerUrl.pathname, "/", `${url}: banner links to export homepage`);
  assertFollowed(banner[1], `${url}: banner passes ordinary link signals`);
  const ctas = [...rendered.matchAll(/<span\b[^>]*class="export-cta"[^>]*>\s*<a([^>]*)>([\s\S]*?)<\/a>/g)];
  assert.ok(ctas.length >= 4, `${url}: desktop/mobile navigation and footer inquiry routes present`);
  for (const [index, cta] of ctas.entries()) {
    const destination = new URL(attr(cta[1], "href"));
    assert.equal(destination.pathname, "/request", `${url}: CTA ${index} opens the verified inquiry form`);
    assertUtm(destination, "cta", `${url}: CTA ${index} attribution`);
    assertFollowed(cta[1], `${url}: CTA ${index} is followed`);
    ctaCount += 1;
  }
  assert.ok(text(rendered).includes(note), `${url}: adjacent export handling explanation is visible`);
  const editorial = [...rendered.matchAll(/<p\b[^>]*class="export-partner-intro"[^>]*>([\s\S]*?)<\/p>/g)];
  if (expectedEditorial.has(pathname)) {
    assert.equal(editorial.length, 1, `${url}: one early editorial partner paragraph`);
    const link = editorial[0][1].match(/<a([^>]*)>([\s\S]*?)<\/a>/);
    assert.ok(link, `${url}: editorial anchor exists`);
    assert.equal(attr(link[1], "href"), expectedEditorial.get(pathname), `${url}: relevant category destination`);
    assertFollowed(link[1], `${url}: editorial anchor is followed`);
    assert.match(text(link[2]), /NexusPoint Food Trade/, `${url}: descriptive entity anchor`);
    assert.ok(rendered.indexOf(editorial[0][0]) < rendered.indexOf('class="export-cta"', rendered.indexOf("<main")), `${url}: editorial link precedes the first main-body CTA`);
    editorialCount += 1;
  }
  if (pathname === "/contact/") assert.doesNotMatch(rendered, /<form\b/i, "The retained contact route hands off to the export desk instead of collecting an old-site inquiry");
}
assert.equal(editorialCount, 6, "All six specified editorial placements are present");
console.log(`Export desk verified: ${urls.length} original pages and canonicals, ${ctaCount} followed attributed CTAs, ${urls.length} followed banners/head Organization departments, ${editorialCount} precise editorial destinations.`);

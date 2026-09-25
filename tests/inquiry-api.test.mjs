import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const inquiry = {
  company: "Example Foods", country: "Malaysia", businessType: "Importer / Distributor",
  product: "Korean BBQ Sauce", packing: "1 kg", quantity: "200 cartons",
  channel: "Restaurants", message: "Sample request", landingPath: "/products/korean-sauces/",
  source: "google", medium: "organic", campaign: "", referrerHost: "google.com",
};

const context = { waitUntil() {}, passThroughOnException() {} };
const request = (origin, body = inquiry, method = "POST") => new Request("https://deesheng-food.wjzta10018545.chatgpt.site/api/inquiries", {
  method,
  headers: { Origin: origin, "Content-Type": "application/json" },
  ...(method === "POST" ? { body: JSON.stringify(body) } : {}),
});

test("stores a prepared inquiry and returns a reference without exposing the form", async () => {
  let saved;
  const env = { DB: { prepare(sql) {
    assert.match(sql, /INSERT INTO inquiries/);
    return { bind(...values) { saved = values; return { async run() { return { success: true }; } }; } };
  } } };
  const response = await worker.fetch(request("https://deesheng.food"), env, context);
  assert.equal(response.status, 201);
  assert.equal(response.headers.get("access-control-allow-origin"), "https://deesheng.food");
  const result = await response.json();
  assert.match(result.id, /^DS-[A-F0-9]{8}$/);
  assert.equal(result.status, "prepared");
  assert.equal(saved[0], result.id);
  assert.deepEqual(saved.slice(1), [
    "Example Foods", "Malaysia", "Importer / Distributor", "Korean BBQ Sauce", "1 kg",
    "200 cartons", "Restaurants", "Sample request", "/products/korean-sauces/",
    "google", "organic", "", "google.com",
  ]);
});

test("rejects unapproved origins and incomplete inquiries before database access", async () => {
  const env = { DB: { prepare() { throw new Error("Should not be called"); } } };
  assert.equal((await worker.fetch(request("https://example.com"), env, context)).status, 403);
  assert.equal((await worker.fetch(request("https://deesheng.food", { ...inquiry, company: "" }), env, context)).status, 400);
});

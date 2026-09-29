import assert from "node:assert/strict";
import test from "node:test";
import { resolveInquirySource, attributedContactUrl, inquirySourceLines } from "../app/lib/inquiry-source.ts";

const chatgpt = "https://deesheng.food/products/?utm_source=chatgpt&utm_medium=paid&utm_campaign=deesheng_us_food_wholesale&utm_content=private_label";

test("paid ad identity survives navigation to the quote page and contact draft", () => {
  const entry = resolveInquirySource(chatgpt, "https://chatgpt.com/");
  const quote = resolveInquirySource("https://deesheng.food/contact/", chatgpt, entry);
  assert.deepEqual(quote, entry);
  const whatsapp = new URL(attributedContactUrl("https://wa.me/8615621089573?text=Hello%20Kevin", quote, "/contact/"));
  assert.equal(whatsapp.pathname, "/8615621089573");
  const text = whatsapp.searchParams.get("text");
  assert.match(text, /^Hello Kevin\n/);
  assert.match(text, /Website source: chatgpt \/ paid/);
  assert.match(text, /Ad: private_label/);
  assert.match(text, /Entry page: \/products\//);
  assert.match(text, /Inquiry page: \/contact\//);
  const email = new URL(attributedContactUrl("mailto:info@deesheng.food", quote, "/contact/"));
  assert.equal(email.pathname, "info@deesheng.food");
  assert.match(email.searchParams.get("body"), /Ad: private_label/);
});

test("new tagged traffic replaces prior session attribution without confusing organic ChatGPT", () => {
  const entry = resolveInquirySource(chatgpt, "");
  const meta = resolveInquirySource("https://deesheng.food/?utm_source=meta&utm_medium=paid_social&utm_campaign=us_sauce&utm_content=sauce_1", "", entry);
  assert.equal(meta.source, "meta");
  assert.equal(meta.content, "sauce_1");
  const organic = resolveInquirySource("https://deesheng.food/products/", "https://chatgpt.com/");
  assert.equal(organic.source, "chatgpt.com");
  assert.equal(organic.medium, "referral");
  assert.equal(organic.content, "");
});

test("older sessions, missing referrers and unsafe control characters remain bounded", () => {
  const direct = resolveInquirySource("https://deesheng.food/contact/", "");
  assert.equal(direct.source, "direct");
  const {content, ...old} = direct;
  assert.equal(resolveInquirySource("https://deesheng.food/products/", "", old).content, "");
  const dirty = resolveInquirySource("https://deesheng.food/?utm_source=chatgpt%0AFAKE&utm_campaign=" + "x".repeat(200), "invalid");
  assert.equal(dirty.source, "chatgpt FAKE");
  assert.equal(dirty.campaign.length, 120);
  assert.ok(inquirySourceLines(dirty, "/contact/").every(line => !line.includes("\n")));
  assert.equal(attributedContactUrl("https://example.com/contact", direct, "/"), "https://example.com/contact");
});

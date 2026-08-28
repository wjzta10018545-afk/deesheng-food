"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { trackAnalyticsEvent } from "../components/GoogleAnalytics";

export function QuoteForm({ initialProduct = "" }: { initialProduct?: string }) {
  const [sent, setSent] = useState(false);
  const productInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const selectedProduct = new URLSearchParams(window.location.search).get("product");
    if (selectedProduct && productInput.current) productInput.current.value = selectedProduct;
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lines = [
      "Hello Deesheng Food export team, I would like to request a B2B quotation.",
      "",
      `Company: ${form.get("company") || "Not provided"}`,
      `Country / market: ${form.get("country") || "Not provided"}`,
      `Business type: ${form.get("businessType") || "Not provided"}`,
      `Product(s): ${form.get("product") || "Not provided"}`,
      `Pack size: ${form.get("packing") || "To be discussed"}`,
      `Estimated quantity: ${form.get("quantity") || "To be discussed"}`,
      `Sales channel: ${form.get("channel") || "Not provided"}`,
      `Requirements: ${form.get("message") || "None added"}`,
    ];
    trackAnalyticsEvent("generate_lead", { method: "whatsapp_quote_form" });
    setSent(true);
    window.open(`https://wa.me/8615621089573?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label><span>Company name *</span><input name="company" required placeholder="Your company" autoComplete="organization" /></label>
        <label><span>Country / target market *</span><input name="country" required placeholder="e.g. Malaysia" autoComplete="country-name" /></label>
        <label><span>Business type *</span><select name="businessType" required defaultValue=""><option value="" disabled>Select one</option><option>Importer / Distributor</option><option>Food brand / Private label</option><option>Foodservice / Restaurant supplier</option><option>Supermarket / Retail buyer</option><option>Food manufacturer</option><option>Other B2B buyer</option></select></label>
        <label><span>Sales channel</span><input name="channel" placeholder="Supermarket, restaurant, wholesale…" /></label>
        <label className="form-span-2"><span>Product or product family *</span><input ref={productInput} name="product" required defaultValue={initialProduct} placeholder="e.g. 500 g gochujang, fried chicken sauces" /></label>
        <label><span>Preferred pack size</span><input name="packing" placeholder="e.g. 500 g × 20 / carton" /></label>
        <label><span>Estimated order quantity *</span><input name="quantity" required placeholder="Cartons or container plan" /></label>
        <label className="form-span-2"><span>Requirements</span><textarea name="message" rows={5} placeholder="Flavor, OEM label, certification, sample or other requirements" /></label>
      </div>
      <div className="form-consent"><p>Submitting opens a prepared WhatsApp message. You can review it before sending.</p><button className="button button-primary" type="submit">Prepare WhatsApp inquiry ↗</button></div>
      {sent && <p className="form-success" role="status">Your inquiry was prepared in WhatsApp. Please press send there to complete it.</p>}
    </form>
  );
}

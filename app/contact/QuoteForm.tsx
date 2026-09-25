"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { trackAnalyticsEvent } from "../components/GoogleAnalytics";
import { INQUIRY_SOURCE_KEY, type InquirySource } from "../components/InquiryAttribution";

const INQUIRY_API = "https://deesheng-food.wjzta10018545.chatgpt.site/api/inquiries";

function getInquirySource(): InquirySource {
  try {
    const stored = JSON.parse(sessionStorage.getItem(INQUIRY_SOURCE_KEY) || "null");
    if (stored && typeof stored.landingPath === "string") return stored;
  } catch {
    // Use the current page when session storage is unavailable.
  }
  return { landingPath: location.pathname, source: "unknown", medium: "unknown", campaign: "", referrerHost: "" };
}

export function QuoteForm({ initialProduct = "" }: { initialProduct?: string }) {
  const [sent, setSent] = useState(false);
  const [recorded, setRecorded] = useState<boolean | null>(null);
  const [preparing, setPreparing] = useState(false);
  const productInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const selectedProduct = new URLSearchParams(window.location.search).get("product");
    if (selectedProduct && productInput.current) productInput.current.value = selectedProduct;
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (preparing) return;
    setPreparing(true);
    const form = new FormData(event.currentTarget);
    const fields = Object.fromEntries(["company", "country", "businessType", "product", "packing", "quantity", "channel", "message"]
      .map((key) => [key, String(form.get(key) || "")]));
    const inquiryTab = window.open("", "_blank");
    let inquiryId = "";
    try {
      const response = await fetch(INQUIRY_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, ...getInquirySource() }),
        signal: AbortSignal.timeout(6000),
      });
      if (!response.ok) throw new Error("Inquiry was not recorded");
      const result = await response.json();
      inquiryId = result.id;
      setRecorded(true);
    } catch {
      setRecorded(false);
    }
    const lines = [
      "Hello Kevin, I would like to request a B2B quotation from Deesheng Food.",
      ...(inquiryId ? [`Inquiry reference: ${inquiryId}`] : []),
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
    trackAnalyticsEvent("inquiry_prepared", { method: "whatsapp_quote_form", recorded: !!inquiryId });
    setSent(true);
    const whatsappUrl = `https://wa.me/8615621089573?text=${encodeURIComponent(lines.join("\n"))}`;
    if (inquiryTab) {
      inquiryTab.opener = null;
      inquiryTab.location.replace(whatsappUrl);
    } else {
      window.location.assign(whatsappUrl);
    }
    setPreparing(false);
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
      <div className="form-consent"><p>Submitting saves your inquiry details and the page that brought you here for sales follow-up, then opens a prepared WhatsApp message. Review and press send there to contact us.</p><button className="button button-primary" type="submit" disabled={preparing}>{preparing ? "Preparing…" : "Prepare WhatsApp inquiry ↗"}</button></div>
      {sent && <p className="form-success" role="status">{recorded ? "Your request was recorded. Please press send in WhatsApp to reach our sales team." : "WhatsApp was prepared, but we could not save this request. Please press send in WhatsApp to reach our sales team."}</p>}
    </form>
  );
}

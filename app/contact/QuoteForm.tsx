"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { trackAnalyticsEvent } from "../components/GoogleAnalytics";
import { getInquirySource, inquirySourceLines } from "../lib/inquiry-source";
import { inquiryLimits, validateInquiry, type InquiryErrors, type InquiryField } from "../lib/inquiry-validation";

const INQUIRY_API = "https://deesheng-food.wjzta10018545.chatgpt.site/api/inquiries";

export function QuoteForm({ initialProduct = "" }: { initialProduct?: string }) {
  const [sent, setSent] = useState(false);
  const [recorded, setRecorded] = useState<boolean | null>(null);
  const [preparing, setPreparing] = useState(false);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const productInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const selectedProduct = new URLSearchParams(window.location.search).get("product");
    if (selectedProduct && productInput.current) productInput.current.value = selectedProduct;
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (preparing) return;
    const form = new FormData(event.currentTarget);
    const source = getInquirySource();
    const sourceLines = inquirySourceLines(source, location.pathname);
    const fields = Object.fromEntries(["company", "country", "businessType", "product", "packing", "quantity", "channel", "message", "contact"]
      .map((key) => [key, String(form.get(key) || "")]));
    const checked = validateInquiry({ ...fields, ...source, inquiryPath: location.pathname });
    setErrors(checked.errors);
    if (!checked.valid) {
      const first = event.currentTarget.elements.namedItem(Object.keys(checked.errors)[0]);
      if (first instanceof HTMLElement) first.focus();
      return;
    }
    setPreparing(true);
    const lines = [
      "Hello Kevin, I would like to request a B2B quotation from Deesheng Food.",
      "",
      `Company: ${form.get("company") || "Not provided"}`,
      ...(checked.values.contact ? [`Reply contact: ${checked.values.contact}`] : []),
      `Country / market: ${form.get("country") || "Not provided"}`,
      `Business type: ${form.get("businessType") || "Not provided"}`,
      `Product(s): ${form.get("product") || "Not provided"}`,
      `Pack size: ${form.get("packing") || "To be discussed"}`,
      `Estimated quantity: ${form.get("quantity") || "To be discussed"}`,
      `Sales channel: ${form.get("channel") || "Not provided"}`,
      `Requirements: ${form.get("message") || "None added"}`,
      "",
      ...sourceLines,
    ];
    const draftUrl = `https://wa.me/8615621089573?text=${encodeURIComponent(lines.join("\n"))}`;
    setWhatsappUrl(draftUrl);
    const inquiryTab = window.open(draftUrl, "_blank");
    if (inquiryTab) inquiryTab.opener = null;
    setSent(true);
    setRecorded(null);
    trackAnalyticsEvent("inquiry_prepared", { method: "whatsapp_quote_form" });
    try {
      const recording = fetch(INQUIRY_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checked.values),
        keepalive: true,
        signal: AbortSignal.timeout(6000),
      });
      const response = await recording;
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 400 && result.fields) setErrors(result.fields);
        throw new Error("Inquiry was not recorded");
      }
      if (!result.id || result.status !== "prepared") throw new Error("Invalid inquiry response");
      setRecorded(true);
      trackAnalyticsEvent("inquiry_recorded", { method: "whatsapp_quote_form" });
    } catch {
      setRecorded(false);
      trackAnalyticsEvent("inquiry_record_failed", { method: "whatsapp_quote_form" });
    } finally {
      setPreparing(false);
    }
  }

  const fieldProps = (name: InquiryField) => ({
    id: `inquiry-${name}`, name, maxLength: inquiryLimits[name],
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `inquiry-${name}-error` : undefined,
  });
  const fieldError = (name: InquiryField) => errors[name]
    ? <small id={`inquiry-${name}-error`}>{errors[name]}</small> : null;

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label><span>Company name *</span><input {...fieldProps("company")} required placeholder="Your company" autoComplete="organization" />{fieldError("company")}</label>
        <label><span>Country / target market *</span><input {...fieldProps("country")} required placeholder="e.g. Malaysia" autoComplete="country-name" />{fieldError("country")}</label>
        <label><span>Business type *</span><select name="businessType" required defaultValue=""><option value="" disabled>Select one</option><option>Importer / Distributor</option><option>Food brand / Private label</option><option>Foodservice / Restaurant supplier</option><option>Supermarket / Retail buyer</option><option>Food manufacturer</option><option>Other B2B buyer</option></select></label>
        <label><span>Sales channel</span><input {...fieldProps("channel")} placeholder="Supermarket, restaurant, wholesale…" />{fieldError("channel")}</label>
        <label className="form-span-2"><span>Email or WhatsApp (optional)</span><input {...fieldProps("contact")} placeholder="Email address or WhatsApp number with country code" autoComplete="off" /><small>Leave a contact so we can reply if your WhatsApp message is not sent.</small>{fieldError("contact")}</label>
        <label className="form-span-2"><span>Product or product family *</span><input {...fieldProps("product")} ref={productInput} required defaultValue={initialProduct} placeholder="e.g. 500 g gochujang, fried chicken sauces" />{fieldError("product")}</label>
        <label><span>Preferred pack size</span><input {...fieldProps("packing")} placeholder="e.g. 500 g × 20 / carton" />{fieldError("packing")}</label>
        <label><span>Estimated order quantity *</span><input {...fieldProps("quantity")} required placeholder="Cartons or container plan" />{fieldError("quantity")}</label>
        <label className="form-span-2"><span>Requirements</span><textarea {...fieldProps("message")} rows={5} onChange={(event) => setMessageLength(event.currentTarget.value.length)} placeholder="Flavor, OEM label, certification, sample or other requirements" /><small>{messageLength} / {inquiryLimits.message} characters. You can send more details in WhatsApp.</small>{fieldError("message")}</label>
      </div>
      {Object.keys(errors).length > 0 && <p className="form-success" role="alert">Please check the highlighted fields. Your details are still here.</p>}
      <div className="form-consent"><p>Submitting opens a prepared WhatsApp message and saves your inquiry details and the page that brought you here for sales follow-up. Review and press send there to contact us.</p><button className="button button-primary" type="submit" disabled={preparing}>{preparing ? "Preparing…" : "Prepare WhatsApp inquiry ↗"}</button></div>
      {sent && <p className="form-success" role="status">{recorded === null ? "WhatsApp is ready. Please press send there while we save your request." : recorded ? "Your request was recorded. Please press send in WhatsApp to reach our sales team." : "WhatsApp was prepared, but we could not save this request. Please press send in WhatsApp to reach our sales team."}</p>}
      {whatsappUrl && <p><a data-inquiry-prepared="true" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Open your WhatsApp message</a></p>}
    </form>
  );
}

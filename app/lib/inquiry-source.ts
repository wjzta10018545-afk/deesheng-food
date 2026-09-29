export const INQUIRY_SOURCE_KEY = "deesheng.inquiry-source";

export type InquirySource = {
  landingPath: string;
  source: string;
  medium: string;
  campaign: string;
  content: string;
  referrerHost: string;
};

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, limit) : "";
}

export function resolveInquirySource(href: string, referrer: string, previous?: unknown): InquirySource {
  const url = new URL(href);
  const params = url.searchParams;
  const prior = previous as Partial<InquirySource> | null;
  // A new tagged visit replaces the prior session source; internal navigation does not.
  if (!params.get("utm_source") && prior && typeof prior.landingPath === "string" && prior.landingPath.startsWith("/")) {
    return {
      landingPath: clean(prior.landingPath, 240), source: clean(prior.source, 100) || "unknown",
      medium: clean(prior.medium, 100) || "unknown", campaign: clean(prior.campaign, 120),
      content: clean(prior.content, 100), referrerHost: clean(prior.referrerHost, 160),
    };
  }
  let externalReferrer = "";
  try {
    const host = new URL(referrer).hostname;
    if (host !== url.hostname) externalReferrer = host;
  } catch { /* An absent or invalid referrer is a direct visit. */ }
  return {
    landingPath: clean(url.pathname, 240),
    source: clean(params.get("utm_source"), 100) || externalReferrer || "direct",
    medium: clean(params.get("utm_medium"), 100) || (externalReferrer ? "referral" : "none"),
    campaign: clean(params.get("utm_campaign"), 120),
    content: clean(params.get("utm_content"), 100),
    referrerHost: clean(externalReferrer, 160),
  };
}

let memorySource: InquirySource | undefined;

export function getInquirySource(): InquirySource {
  let previous: unknown = memorySource;
  try { previous = JSON.parse(sessionStorage.getItem(INQUIRY_SOURCE_KEY) || "null") || previous; } catch { /* Use memory. */ }
  const source = resolveInquirySource(location.href, document.referrer, previous);
  memorySource = source;
  try { sessionStorage.setItem(INQUIRY_SOURCE_KEY, JSON.stringify(source)); } catch { /* Inquiry still works without storage. */ }
  return source;
}

export function inquirySourceLines(source: InquirySource, pagePath: string): string[] {
  return [
    `Website source: ${source.source} / ${source.medium}`,
    ...(source.campaign ? [`Campaign: ${source.campaign}`] : []),
    ...(source.content ? [`Ad: ${source.content}`] : []),
    `Entry page: ${source.landingPath}`,
    `Inquiry page: ${clean(pagePath, 240)}`,
  ];
}

export function attributedContactUrl(href: string, source: InquirySource, pagePath: string): string {
  const url = new URL(href);
  const context = inquirySourceLines(source, pagePath).join("\n");
  if (url.hostname === "wa.me" && url.pathname === "/8615621089573") {
    const greeting = url.searchParams.get("text") || "Hello Kevin, I am interested in Deesheng Food products. Please help with a B2B quotation.";
    url.searchParams.set("text", `${greeting}\n\n${context}`);
  } else if (url.protocol === "mailto:" && url.pathname === "info@deesheng.food") {
    if (!url.searchParams.has("subject")) url.searchParams.set("subject", "Deesheng Food B2B inquiry");
    const body = url.searchParams.get("body") || "Hello Kevin,\n\nCompany:\nCountry / market:\nProduct:\nQuantity:";
    url.searchParams.set("body", `${body}\n\n${context}`);
  }
  return url.href;
}

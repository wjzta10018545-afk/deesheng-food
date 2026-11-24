export const EXPORT_DESK_NOTE = "Direct export quotation, OEM Studio & consolidated FOB Qingdao shipping handled by our export desk at NexusPoint (nexuspointtrade.com).";

export function exportQuoteUrl(product?: string): string {
  const url = new URL("https://nexuspointtrade.com/request");
  url.searchParams.set("utm_source", "deesheng_food");
  url.searchParams.set("utm_medium", "cta");
  url.searchParams.set("utm_campaign", "export_desk");
  if (product) url.searchParams.set("product", product);
  return url.toString();
}

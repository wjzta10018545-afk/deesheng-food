export const inquiryLimits = {
  company: 120, country: 100, businessType: 80, product: 240,
  packing: 120, quantity: 120, channel: 120, message: 1200,
  contact: 160, landingPath: 240, source: 100, medium: 100,
  campaign: 120, content: 100, referrerHost: 160, inquiryPath: 240,
} as const;

export type InquiryField = keyof typeof inquiryLimits;
export type InquiryValues = Record<InquiryField, string>;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

const required = new Set<InquiryField>(["company", "country", "businessType", "product", "quantity", "landingPath"]);

export function validateInquiry(payload: Record<string, unknown>) {
  const values = {} as InquiryValues;
  const errors: InquiryErrors = {};
  for (const key of Object.keys(inquiryLimits) as InquiryField[]) {
    const raw = payload[key] ?? "";
    values[key] = typeof raw === "string" ? raw.trim() : "";
    if (typeof raw !== "string") errors[key] = "Please enter text.";
    else if (values[key].length > inquiryLimits[key]) errors[key] = `Please use ${inquiryLimits[key]} characters or fewer.`;
    else if (required.has(key) && !values[key]) errors[key] = "Please complete this field.";
  }
  for (const key of ["landingPath", "inquiryPath"] as const) {
    if (values[key] && (!values[key].startsWith("/") || values[key].startsWith("//"))) {
      errors[key] = "Please reload this page and try again.";
    }
  }
  return { values, errors, valid: Object.keys(errors).length === 0 };
}

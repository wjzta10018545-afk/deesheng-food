import assert from "node:assert/strict";
import test from "node:test";
import { inquiryLimits, validateInquiry } from "../app/lib/inquiry-validation.ts";

const valid = {company: "Example", country: "Australia", businessType: "Importer / Distributor", product: "Kimchi", quantity: "Container", landingPath: "/products/kimchi/"};

test("the same validator accepts legacy forms and rejects each over-limit field", () => {
  assert.equal(validateInquiry(valid).valid, true);
  for (const [field, limit] of Object.entries(inquiryLimits)) {
    const result = validateInquiry({...valid, [field]: "x".repeat(limit + 1)});
    assert.equal(result.valid, false);
    assert.ok(result.errors[field]);
  }
  assert.equal(validateInquiry({...valid, company: "   "}).valid, false);
  assert.equal(validateInquiry({...valid, message: "x".repeat(1200)}).valid, true);
});

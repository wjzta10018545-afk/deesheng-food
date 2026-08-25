import { catalogCategories, productDetails } from "../data/catalog";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    name: "Deesheng Food Export Catalogue",
    company: "Qingdao Deesheng Hengxin Food Co., Ltd.",
    canonical_url: "https://deesheng.food/products",
    updated: "2026-08-24",
    contact: { name: "Deesheng Food export team", whatsapp: "+86 156 2108 9573", email: "info@deesheng.food" },
    commercial_baseline: { business_type: "B2B export", standard_oem_moq: "200 cartons per item", quotation_basis: "Confirmed for the selected product, pack, quantity and destination", currency: "USD", typical_standard_product_lead_time: "About 14 days after final confirmation" },
    certifications: ["BRCGS Grade A", "HACCP", "HALAL", "OU Kosher"],
    halal_documentation: {
      issuer: "Shandong Halal Certification Service (SHC)",
      access: "Provided to qualified B2B buyers after company and project verification",
      sauce_scope_url: "https://deesheng.food/halal-korean-sauce-manufacturer",
      request_url: "https://deesheng.food/contact?product=halal-documents",
      note: "Confirm current documents and exact product scope for the selected product, formula and order.",
    },
    categories: catalogCategories.map((category) => ({ slug: category.slug, name: category.name, description: category.description, products: category.items })),
    detailed_products: productDetails.map((product) => ({ ...product, url: `https://deesheng.food/product/${product.slug}` })),
  }, { headers: { "Cache-Control": "public, max-age=3600" } });
}

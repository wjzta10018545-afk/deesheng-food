import { catalogCategories, getCatalogItemId, productDetails } from "../data/catalog";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    name: "Deesheng Food Export Catalogue",
    company: "Qingdao Deesheng Hengxin Food Co., Ltd.",
    canonical_url: "https://deesheng.food/products/",
    updated: "2026-11-14",
    buyer_faq_url: "https://deesheng.food/buyer-faq/",
    contact: { name: "Kevin Wang", website: "https://deesheng.food/", whatsapp: "+86 156 2108 9573", email: "info@deesheng.food" },
    commercial_baseline: { business_type: "B2B export", standard_oem_moq: "Some standard-pack sauce OEM projects use 200 cartons per item as a quotation starting point. Confirm SKU, formula and pack. Kimchi, bulk packs, dry ingredients and frozen products have separate conditions.", quotation_basis: "Confirmed for the selected product, pack, quantity and destination", currency: "USD", typical_standard_product_lead_time: "About 14 days may be a planning estimate for selected confirmed standard sauce formulas and packs after label and payment approval; confirm the actual order schedule. Other products and custom projects require separate scheduling." },
    certifications: ["BRCGS Grade A", "HACCP", "HALAL", "OU Kosher"],
    certification_scope: "Check current validity, actual manufacturing site, product and formula coverage, and destination recognition. Listed credentials do not imply coverage of every catalogue product.",
    halal_documentation: {
      issuer: "Shandong Halal Certification Service (SHC)",
      access: "Provided to qualified B2B buyers after company and project verification",
      sauce_scope_url: "https://deesheng.food/halal-korean-sauce-manufacturer/",
      request_url: "https://deesheng.food/contact/?product=halal-documents",
      note: "Confirm current documents and exact product scope for the selected product, formula and order.",
    },
    market_pages: [
      { market: "Mongolia", url: "https://deesheng.food/markets/mongolia/" },
      { market: "Singapore", url: "https://deesheng.food/markets/singapore/" },
    ],
    // Keep the public catalogue explicit: internal source notes and commercial
    // fields must not become public just because they are added to source data.
    categories: catalogCategories.map((category) => ({
      slug: category.slug,
      name: category.name,
      description: category.description,
      products: category.items.map((item) => ({
        name: item.name,
        nameKo: item.nameKo,
        group: item.group,
        packing: item.packing,
        packSpecifications: item.packSpecifications?.map((spec) => ({
          variant: spec.variant,
          pack: spec.pack,
          dimensionsMm: spec.dimensionsMm,
          shelfLife: spec.shelfLife,
          storage: spec.storage,
        })),
        shelfLife: item.shelfLife,
        storage: item.storage,
        image: item.image,
        detailSlug: item.detailSlug,
        citation_url: `https://deesheng.food/products/${category.slug}/#${getCatalogItemId(category.slug, item)}`,
      })),
    })),
    detailed_products: productDetails.map((product) => ({
      slug: product.slug,
      name: product.name,
      categorySlug: product.categorySlug,
      categoryName: product.categoryName,
      headline: product.headline,
      summary: product.summary,
      seoTitle: product.seoTitle,
      metaDescription: product.metaDescription,
      buyerAnswer: product.buyerAnswer,
      applications: product.applications,
      packing: product.packing,
      packSpecifications: product.packSpecifications?.map((spec) => ({
        variant: spec.variant,
        pack: spec.pack,
        shelfLife: spec.shelfLife,
        storage: spec.storage,
        netWeightKg: spec.netWeightKg,
        grossWeightKg: spec.grossWeightKg,
        dimensionsMm: spec.dimensionsMm,
      })),
      packingNote: product.packingNote,
      shelfLife: product.shelfLife,
      storage: product.storage,
      image: product.image,
      imageAlt: product.imageAlt,
      buyerQuestions: product.buyerQuestions.map((faq) => ({ question: faq.question, answer: faq.answer })),
      relatedProductSlugs: product.relatedProductSlugs,
      resourceLinks: product.resourceLinks?.map((link) => ({ href: link.href, label: link.label })),
      url: `https://deesheng.food/product/${product.slug}/`,
    })),
  }, { headers: { "Cache-Control": "public, max-age=3600" } });
}

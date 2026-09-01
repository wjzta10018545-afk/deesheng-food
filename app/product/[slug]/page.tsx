import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "../../components/JsonLd";
import { getProduct, productDetails } from "../../data/catalog";

type Props = { params: Promise<{ slug: string }> };

const productBuyingGuides: Record<string, {
  buyerFit: string[];
  customization: string[];
  brief: string[];
}> = {
  gochujang: {
    buyerFit: ["Supermarket and Asian-grocery distributors", "Korean restaurant and foodservice suppliers", "Private-label sauce brands", "Meal-kit and prepared-food manufacturers"],
    customization: ["Heat and sweetness balance", "Retail tub or 14 kg foodservice format", "Private-label artwork and export label", "Application-led sample selection"],
    brief: ["Target market and sales channel", "Required heat profile", "500 g retail or 14 kg foodservice pack", "Estimated cartons per item"],
  },
  "bibimbap-sauce": {
    buyerFit: ["Retail sauce importers", "Restaurant and central-kitchen suppliers", "Rice-bowl and meal-kit brands", "Private-label Korean food ranges"],
    customization: ["Spicy or non-spicy profile", "Sweetness, heat and viscosity", "Retail bottle or 1 kg foodservice pouch", "Label and carton artwork"],
    brief: ["Spicy or non-spicy version", "Retail, foodservice or meal-kit channel", "Preferred bottle or pouch size", "Target quantity and destination"],
  },
  "classic-buldak-sauce": {
    buyerFit: ["Noodle and convenience-food brands", "Korean fried-chicken operators", "Retail sauce distributors", "Private-label spicy-sauce programs"],
    customization: ["Heat level and flavor balance", "Noodle, chicken or dipping application", "Retail bottle or foodservice pouch", "Private-label packaging"],
    brief: ["Target heat level", "Primary menu or retail application", "Required pack size", "Estimated order quantity"],
  },
  "tteokbokki-sauce": {
    buyerFit: ["Korean street-food distributors", "Ready-to-cook and meal-kit brands", "Restaurant suppliers", "Asian-grocery private labels"],
    customization: ["Original or creamy profile", "Heat, sweetness and sauce body", "Retail or foodservice packing", "Private-label artwork"],
    brief: ["Original or creamy version", "Rice-cake pack or standalone sauce", "Target pack size", "Market, quantity and channel"],
  },
  "sweet-spicy-fried-chicken-sauce": {
    buyerFit: ["Fried-chicken chains", "Restaurant and foodservice distributors", "Central kitchens", "Retail Korean-sauce brands"],
    customization: ["Heat and sweetness balance", "Glaze viscosity and coating performance", "Retail bottle or 1 kg pouch", "Matching marinade and coating mix"],
    brief: ["Chicken format and serving method", "Target flavor profile", "Outlet count or expected volume", "Pack size and destination"],
  },
  "soy-garlic-fried-chicken-sauce": {
    buyerFit: ["Fried-chicken restaurants", "Foodservice wholesalers", "Central kitchens", "Retail and private-label sauce brands"],
    customization: ["Soy, garlic and sweetness balance", "Glaze viscosity", "Retail bottle or 1 kg foodservice pouch", "Complete fried-chicken sauce system"],
    brief: ["Restaurant or retail use", "Target soy-garlic profile", "Required pack size", "Estimated cartons and destination"],
  },
  "korean-cabbage-kimchi": {
    buyerFit: ["Refrigerated-food importers", "Asian supermarkets", "Restaurant and foodservice distributors", "Korean side-dish suppliers"],
    customization: ["Whole or cut cabbage", "Retail bag or 10 kg bulk carton", "Flavor and fermentation target", "Export label and refrigerated shipment plan"],
    brief: ["Required retail or foodservice pack", "Whole or cut format", "Destination and cold-chain route", "Estimated order quantity"],
  },
  "frozen-spinach": {
    buyerFit: ["Frozen-food importers", "Bibimbap and prepared-meal producers", "Central kitchens", "Foodservice distributors"],
    customization: ["Cut and preparation format", "Retail or foodservice packing", "Bibimbap product mix", "Carton and export specification"],
    brief: ["Required cut or preparation", "Standalone item or mixed container", "Pack size", "Destination and estimated volume"],
  },
};

const defaultBuyingGuide = (product: { categorySlug: string; applications: string[]; packing: string[] }) => ({
  buyerFit: product.categorySlug === "frozen-vegetables"
    ? ["Frozen-food importers", "Foodservice distributors", "Central kitchens", "Food manufacturers"]
    : ["Food importers and distributors", "Foodservice suppliers", "Restaurant operators", "Private-label brands"],
  customization: ["Product specification", "Standard export packing", "OEM or private-label presentation", "Carton and export label"],
  brief: ["Target market and sales channel", `Primary use: ${product.applications.slice(0, 2).join(" or ")}`, `Preferred pack: ${product.packing[0]}`, "Estimated quantity and destination"],
});

export function generateStaticParams() {
  return productDetails.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const halalPrefix = product.categorySlug === "korean-sauces" || product.categorySlug === "gochujang-pastes" ? "HALAL " : "";
  return {
    title: `${halalPrefix}${product.name} Manufacturer & OEM Supplier`,
    description: `${product.summary} HALAL certificate scope confirmation, export packing, private-label support and an export quotation from Deesheng Food.`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.name} | Deesheng Food`,
      description: product.summary,
      url: `https://deesheng.food/product/${product.slug}`,
      images: [{ url: product.image, alt: product.imageAlt }],
    },
    twitter: { card: "summary_large_image", images: [product.image] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = productDetails.filter((item) => item.categorySlug === product.categorySlug && item.slug !== product.slug).slice(0, 3);
  const pageUrl = `https://deesheng.food/product/${product.slug}`;
  const imageUrl = `https://deesheng.food${product.image}`;
  const organizationId = "https://deesheng.food/#organization";
  const buyingGuide = productBuyingGuides[product.slug] ?? defaultBuyingGuide(product);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Qingdao Deesheng Hengxin Food Co., Ltd.",
        alternateName: "Deesheng Food",
        url: "https://deesheng.food",
        brand: { "@type": "Brand", name: "Deesheng Food" },
        hasCertification: {
          "@type": "Certification",
          name: "SHC HALAL Certification - product scope confirmation required",
          issuedBy: { "@type": "Organization", name: "Shandong Halal Certification Service (SHC)" },
          url: "https://deesheng.food/halal-korean-sauce-manufacturer",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${product.name} Manufacturer & OEM Supplier`,
        description: product.summary,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
          caption: product.imageAlt,
        },
        publisher: { "@id": organizationId },
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Food importers, distributors, foodservice operators and private-label brands",
        },
        about: [
          { "@type": "Thing", name: product.name, description: product.summary },
          { "@type": "Thing", name: product.categoryName },
          { "@type": "Thing", name: "Food OEM and private-label manufacturing" },
        ],
        mainEntity: { "@id": `${pageUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `${product.name} B2B supply and OEM service`,
        description: `${product.summary} Export packing, samples, wholesale supply and private-label support are confirmed for each B2B project.`,
        serviceType: ["B2B food supply", "Food OEM manufacturing", "Private-label manufacturing", "Export support"],
        category: product.categoryName,
        provider: { "@id": organizationId },
        areaServed: "Worldwide",
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Food importers, distributors, foodservice operators and private-label brands",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: product.buyerQuestions.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://deesheng.food" },
          { "@type": "ListItem", position: 2, name: "Products", item: "https://deesheng.food/products" },
          { "@type": "ListItem", position: 3, name: product.categoryName, item: `https://deesheng.food/products/${product.categorySlug}` },
          { "@type": "ListItem", position: 4, name: product.name, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="product-detail-hero shell">
        <div className="product-detail-image"><img src={product.image} alt={product.imageAlt} width="900" height="650" /></div>
        <div className="product-detail-copy">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href={`/products/${product.categorySlug}`}>{product.categoryName}</Link><span>/</span><b>{product.name}</b></nav>
          <p className="eyebrow">Manufacturer · OEM · wholesale</p>
          <h1>{product.name}</h1>
          <h2>{product.headline}</h2>
          <p>{product.summary}</p>
          <div className="button-row"><Link className="button button-primary" href={`/contact?product=${product.slug}`}>Request price & samples</Link><Link className="button button-ghost" href={`/products/${product.categorySlug}`}>View full range</Link></div>
        </div>
      </section>

      <section className="spec-band"><div className="shell spec-grid"><div><span>Shelf life</span><strong>{product.shelfLife}</strong></div><div><span>Storage</span><strong>{product.storage}</strong></div><div><span>OEM MOQ</span><strong>200 cartons / item</strong></div><div><span>Buyer type</span><strong>B2B export</strong></div></div></section>

      <section className="section shell product-info-grid">
        <div><p className="eyebrow">Applications</p><h2>Built for commercial use</h2><p>Use the standard formulation as a fast route to market or discuss a project-specific adjustment after your channel and target profile are clear.</p><ul className="application-list">{product.applications.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul></div>
        <div className="packing-panel"><p className="eyebrow">Standard export packing</p><h2>Available formats</h2><ul>{product.packing.map((pack) => <li key={pack}><span>{pack}</span><b>Export pack</b></li>)}</ul><p>Carton dimensions, net and gross weight are confirmed with the selected pack and final order.</p></div>
      </section>

      <section className="section section-tint">
        <div className="shell buying-guide-heading">
          <div><p className="eyebrow">B2B buying guide</p><h2>Is this product right for your project?</h2></div>
          <p><strong>Direct answer:</strong> {product.name} is available for qualified importers, distributors, foodservice buyers and private-label projects. The fastest route to a useful sample and quotation is to confirm the application, pack, quantity and destination.</p>
        </div>
        <div className="shell buying-guide-grid">
          <article><span>01</span><h3>Best-fit buyers</h3><ul>{buyingGuide.buyerFit.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <article><span>02</span><h3>What can be confirmed</h3><ul>{buyingGuide.customization.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <article><span>03</span><h3>Send this buyer brief</h3><ul>{buyingGuide.brief.map((item) => <li key={item}>{item}</li>)}</ul></article>
        </div>
      </section>

      <section className="section"><div className="shell faq-layout"><div><p className="eyebrow">Sourcing facts</p><h2>Answers for buyers</h2><p>These are the commercial basics most B2B buyers need before requesting a sample or quotation.</p></div><div className="faq-list">{product.buyerQuestions.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>

      {related.length > 0 && <section className="section shell"><div className="section-heading compact-heading"><p className="eyebrow">Related products</p><h2>Build a stronger product mix</h2></div><div className="related-grid">{related.map((item) => <Link href={`/product/${item.slug}`} key={item.slug}><span>{item.categoryName}</span><h3>{item.name}</h3><p>{item.summary}</p><b>View product →</b></Link>)}</div></section>}

      <section className="section shell"><div className="cta-panel"><div><p className="eyebrow eyebrow-light">Qualified B2B inquiry</p><h2>Share your market, pack and target quantity.</h2></div><div><p>We will confirm the best-fit format, sample route and quotation for your project.</p><Link className="button button-light" href={`/contact?product=${product.slug}`}>Ask about {product.name} ↗</Link></div></div></section>
    </main>
  );
}

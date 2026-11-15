import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyerFaqLink } from "../../components/BuyerFaqLink";
import { faqTopicForCategory } from "../../data/buyer-faqs";
import { JsonLd } from "../../components/JsonLd";
import { catalogCategories, getCatalogItemId, getCatalogItemImage, getCategory } from "../../data/catalog";
import { productFamilyGuides } from "../../data/product-family-guides";

type Props = { params: Promise<{ category: string }> };

const sourcingGuides: Record<string, {
  heading: string;
  introduction: string;
  steps: { title: string; description: string }[];
  startingPoints: { name: string; slug: string }[];
}> = {
  kimchi: {
    heading: "Compare Korean kimchi and pickled vegetables by product and pack",
    introduction: "Compare the named product, cut and container first. Pack sizes and carton dimensions are listed separately for each selection; storage, shelf life and shipping conditions must be confirmed for the selected product and order.",
    steps: [
      { title: "Choose the product and format", description: "Compare whole, cut or diced cabbage kimchi with jarred cabbage, radish, onion and other named vegetables. Different cuts, recipes and pack formats remain separate selections." },
      { title: "Check carton and transport requirements", description: "Use the pack-specific carton dimensions when planning your order. Request the applicable storage temperature, shelf life and transport conditions before arranging samples or shipment." },
      { title: "Brief the OEM project", description: "Specify cut, flavor target, pack, label language and estimated cartons. MOQ and trial quantities depend on the kimchi specification and packaging and must be confirmed in the quotation." },
    ],
    startingPoints: [
      { name: "Whole, cut and diced cabbage kimchi", slug: "korean-cabbage-kimchi" },
      { name: "Jarred cabbage kimchi", slug: "cabbage-kimchi-jars" },
      { name: "White, washed and stir-fried kimchi", slug: "white-washed-stir-fried-kimchi" },
      { name: "Radish kimchi", slug: "radish-kimchi" },
      { name: "Spring onion and scallion kimchi", slug: "scallion-kimchi" },
      { name: "Garlic sprout pickles", slug: "garlic-sprout-pickles" },
      { name: "Green pepper pickles", slug: "pickled-green-pepper" },
    ],
  },
  "korean-sauces": {
    heading: "Choose Korean sauces for wholesale and private label",
    introduction: "Compare the product, pack and order quantity for your channel. Some standard-pack sauce OEM projects use 200 cartons per item as a quotation starting point. Confirm the applicable SKU, formula and pack; trials are assessed separately.",
    steps: [
      { title: "Pick an application", description: "Compare fried-chicken, fire-noodle, bibimbap, tteokbokki, BBQ and soup sauces by menu use and target heat level. Classic, creamy and non-spicy variants have separate specifications." },
      { title: "Match the pack to the channel", description: "Review retail bottles and 1 kg sauce pouches. Gochujang also has 500 g tubs and 14 kg foodservice cartons. Sizes and carton quantities are product-specific." },
      { title: "Confirm project scope", description: "Ask about samples, flavor adjustment and private label. HALAL documents and coverage must be checked against the selected formula and order." },
    ],
    startingPoints: [
      { name: "Gochujang packs", slug: "gochujang" },
      { name: "Korean BBQ sauce", slug: "korean-bbq-sauce" },
      { name: "Classic fire noodle sauce", slug: "classic-buldak-sauce" },
      { name: "Creamy noodle sauce", slug: "creamy-buldak-sauce" },
      { name: "Mild spicy noodle sauce", slug: "mild-spicy-fire-noodle-sauce" },
      { name: "Fried chicken sauce", slug: "sweet-spicy-fried-chicken-sauce" },
    ],
  },
};

export function generateStaticParams() {
  return catalogCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const halalPrefix = category.slug === "korean-sauces" || category.slug === "gochujang-pastes" ? "HALAL " : "";
  const isKoreanSauce = category.slug === "korean-sauces";
  const isKimchi = category.slug === "kimchi";
  return {
    title: isKoreanSauce
      ? { absolute: "Wholesale Korean Sauces & Private Label | Deesheng Food" }
      : isKimchi ? { absolute: "Korean Kimchi Manufacturer in China | Wholesale & OEM" }
      : `${halalPrefix}${category.name} Manufacturer & OEM Supplier`,
    description: isKoreanSauce
      ? "Source Korean sauces from Qingdao: gochujang, fried-chicken, buldak and BBQ. Compare retail and foodservice packs, private label and product-specific order quantities."
      : isKimchi ? "Compare Deesheng Korean kimchi and pickled vegetables, retail jars, bulk packs and carton dimensions. Confirm shelf life and storage for the selected product."
      : `${category.description} Review standard export packs, OEM/private-label support and quotation requirements for B2B buyers.`,
    alternates: { canonical: `/products/${category.slug}/` },
    openGraph: {
      title: isKoreanSauce
        ? "Wholesale Korean Sauces & Private Label | Deesheng Food"
        : `${category.name} | Deesheng Food`,
      description: category.description,
      url: `https://deesheng.food/products/${category.slug}/`,
      images: [{ url: category.image, alt: category.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: isKoreanSauce ? "Wholesale Korean Sauces & Private Label | Deesheng Food" : category.name, description: category.description, images: [category.image] },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const groups = [...new Set(category.items.map((item) => item.group))];
  const sauceCount = category.items.filter((item) => productFamilyGuides[item.group]?.kind === "sauce").length;
  const supportingCount = category.items.filter((item) => productFamilyGuides[item.group]?.kind === "supporting").length;
  const sauceGroupCount = groups.filter((group) => productFamilyGuides[group]?.kind === "sauce").length;
  const supportingGroupCount = groups.filter((group) => productFamilyGuides[group]?.kind === "supporting").length;
  const sourcingGuide = sourcingGuides[category.slug];
  const faqs = [
    {
      question: `Can ${category.name.toLowerCase()} be supplied under our own brand?`,
      answer: "Yes. Private-label and OEM service can include label artwork, export packaging and, for suitable projects, flavor or specification adjustment.",
    },
    {
      question: "What is the normal minimum order quantity?",
      answer: "MOQ depends on the selected product, formula, packaging and order plan. Confirm the quantity and SKU scope in the quotation. Trial orders are assessed separately.",
    },
    {
      question: "Can we request samples before placing an order?",
      answer: "Sample availability, costs and transport are confirmed after you share the products, packs, intended use and expected quantity. Kimchi and frozen samples require a suitable cold-chain plan; ordinary courier delivery should not be assumed.",
    },
    {
      question: "How is an export quotation prepared?",
      answer: "Product, pack size, quantity and destination are confirmed before pricing and shipment terms are agreed for the order.",
    },
    {
      question: `Are relevant ${category.name.toLowerCase()} covered by HALAL certification?`,
      answer: "Please specify the product, formula, destination and required recognition. We will check the actual manufacturing site, current certificate and product coverage before confirming whether the order meets your requirements.",
    },
    ...(category.slug === "kimchi" ? [{
      question: "What temperature should imported kimchi be kept at?",
      answer: "Request the applicable storage temperature, shelf life and transport conditions for the exact product, recipe and pack before ordering. The listed packaging and carton dimensions do not establish a temperature or shelf life for the whole range.",
    }, {
      question: "Are bulk cabbage kimchi and retail jars the same specification?",
      answer: "No. Whole cabbage kimchi is listed in 10 kg and 5 kg cartons and 5 kg × 2 bags; cut and diced cabbage kimchi have 10 kg cartons. Jarred cut cabbage kimchi has its own page with 300 g × 36, 480 g × 24 and 1 kg × 12 jars. Confirm the selected product and container before ordering.",
    }, {
      question: "Can we discuss a frozen kimchi project?",
      answer: "Please send the intended application, destination, pack and volume. Frozen kimchi specifications, shelf life and cold-chain requirements must be confirmed for the project. The cabbage packaging list does not establish a frozen product specification.",
    }] : []),
    ...(category.slug === "korean-sauces" ? [{
      question: "Which Korean sauces are suitable for restaurants or private label?",
      answer: "The range includes fried-chicken glazes, buldak, bibimbap, tteokbokki and Korean BBQ sauces. Share the application, flavor target, pack size, market and estimated volume to shortlist foodservice or retail options.",
    }, {
      question: "Do all sauce flavors and pack sizes have the same shelf life?",
      answer: "No. Use the exact product and pack specification. Honey mustard, for example, has both 9- and 12-month configurations. Where a catalogue field asks for SKU confirmation, request the current specification rather than assuming a standard shelf life or storage condition.",
    }, {
      question: "Are fire noodle sauces finished noodles or branded instant-noodle products?",
      answer: "The classic, creamy and mild fire noodle detail pages describe Deesheng sauces for noodle applications. They are sauce products, not finished instant noodles. Confirm the exact recipe, ingredients, heat and packaging for your own brand or foodservice project.",
    }] : []),
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: category.name,
        description: category.description,
        url: `https://deesheng.food/products/${category.slug}/`,
        isPartOf: { "@type": "WebSite", name: "Deesheng Food", url: "https://deesheng.food/" },
      },
      {
        "@type": "ItemList",
        name: `${category.name} product list`,
        numberOfItems: category.items.length,
        itemListElement: category.items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          image: `https://deesheng.food${getCatalogItemImage(category.slug, item)}`,
          url: `https://deesheng.food/products/${category.slug}/#${getCatalogItemId(category.slug, item)}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="category-hero shell">
        <div className="category-hero-copy">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/products/">Products</Link><span>/</span><b>{category.shortName}</b></nav>
          <p className="eyebrow">{category.eyebrow}</p>
          <h1>{category.slug === "korean-sauces" ? "Wholesale Korean sauces & private-label supply." : category.name}</h1>
          <p>{category.description}</p>
          <div className="button-row"><Link className="button button-primary" href={`/contact/?product=${category.slug}`}>Request a quote</Link><a className="button button-ghost" href="/downloads/Deesheng-Food-Product-Catalogue-2026.pdf" download>Download catalogue</a></div>
        </div>
        <div className="category-hero-image"><img src={category.image} alt={category.imageAlt} width="1200" height="537" /></div>
      </section>

      <section className="note-band"><div className="shell"><span>Buyer note</span><p>{category.buyerNote}</p></div></section>

      {sourcingGuide && <section className="section shell category-sourcing">
        <div className="section-heading compact-heading"><p className="eyebrow">Buyer selection guide</p><h2>{sourcingGuide.heading}</h2><p>{sourcingGuide.introduction}</p></div>
        <div className="category-sourcing-grid">{sourcingGuide.steps.map((step, index) => <article key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div>
        <p className="category-sourcing-links">Start with: {sourcingGuide.startingPoints.map((item) => <Link key={item.slug} href={`/product/${item.slug}/`}>{item.name} ↗</Link>)}{category.slug === "kimchi" && <Link href="/markets/singapore/">Singapore kimchi buyer guide ↗</Link>}{category.slug === "korean-sauces" && <><Link href="/oem-private-label/">Private-label process and MOQ</Link><Link href="/quality-certifications/">Certification scope and documents</Link></>}</p>
      </section>}

      <section className="section shell">
        <div className="section-heading compact-heading"><p className="eyebrow">Export selection</p><h2>{category.items.length} listed products and variants</h2><p>Choose products and listed packs below. Entries can represent different flavors or packaging formats; the count is not a count of unique recipes. Final specifications are confirmed for the selected item and order.</p>{category.slug === "korean-sauces" && <p>The catalogue includes {sauceCount} sauce and paste entries across {sauceGroupCount} groups, plus {supportingCount} supporting seasoning, mix, oil and cooking-essential entries across {supportingGroupCount} groups.</p>}</div>
        <div className="group-nav" aria-label="Product groups">{groups.map((group) => <a key={group} href={`#${group.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{group}</a>)}</div>
        <div className="group-sections">
          {groups.map((group) => (
            <section className="product-group" id={group.toLowerCase().replace(/[^a-z0-9]+/g, "-")} key={group}>
              <div className="product-group-title"><p>{group}</p><span>{category.items.filter((item) => item.group === group).length} products</span></div>
              {productFamilyGuides[group] && <div className="product-family-guide">
                <p className="eyebrow">{productFamilyGuides[group].kind === "supporting" ? "Supporting ingredients" : "Product family"}</p>
                <p>{productFamilyGuides[group].summary}</p>
                <p><strong>Before requesting a sample:</strong> {productFamilyGuides[group].selection}</p>
                {group === "Fried Chicken Sauces" && <p><Link href="/resources/korean-fried-chicken-sauce-system/">Compare sauce, marinade and coating for your kitchen ↗</Link></p>}
              </div>}
              <div className="product-card-grid">
                {category.items.filter((item) => item.group === group).map((item) => (
                  <article className="product-card" id={getCatalogItemId(category.slug, item)} key={item.name}>
                    <div className="product-card-media">
                      <img src={getCatalogItemImage(category.slug, item)} alt={`${item.name} from the Deesheng Food catalogue`} width="900" height="650" loading="lazy" />
                    </div>
                    <div className="product-card-body">
                      <div className="product-card-top"><span>{category.shortName}</span>{item.detailSlug && <Link href={`/product/${item.detailSlug}/`} aria-label={`Open ${item.name}`}>↗</Link>}</div>
                      <h3>{item.name}</h3>
                      {item.nameKo && <p lang="ko" className="catalogue-product-name-ko">{item.nameKo}</p>}
                      <dl><div><dt>Packing</dt><dd>{item.packing}</dd></div><div><dt>Shelf life</dt><dd>{item.shelfLife}</dd></div><div><dt>Storage</dt><dd>{item.storage}</dd></div></dl>
                      {item.packSpecifications && item.packSpecifications.length > 0 && <details className="catalogue-pack-details">
                        <summary>View packing and carton dimensions</summary>
                        <div className="product-table-wrap"><table className="catalogue-pack-table">
                          <caption>{item.name} — carton dimensions in mm</caption>
                          <thead><tr><th scope="col">Pack</th><th scope="col">Carton (mm)</th></tr></thead>
                          <tbody>{item.packSpecifications.map((spec) => <tr key={`${spec.variant ?? item.name}:${spec.pack}`}><th scope="row">{spec.pack}</th><td>{spec.dimensionsMm ?? "Confirm for this pack"}</td></tr>)}</tbody>
                        </table></div>
                      </details>}
                      <a className="catalogue-item-link" href={`#${getCatalogItemId(category.slug, item)}`} aria-label={`Link to ${item.name}`}>Link to this selection</a>
                      {item.detailSlug ? <Link className="card-link" href={`/product/${item.detailSlug}/`}>Product details <span>→</span></Link> : <Link className="card-link" href={`/contact/?product=${encodeURIComponent(item.name)}`}>Ask about this item <span>↗</span></Link>}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="section section-tint">
        <div className="shell faq-layout">
          <div><p className="eyebrow">Buyer questions</p><h2>What importers usually ask</h2><p>Clear commercial basics before sampling and quotation.</p></div>
          <div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div>
        </div>
      </section>

      <section className="section shell"><div className="cta-panel"><div><p className="eyebrow eyebrow-light">Ready to shortlist?</p><h2>Send your channel, pack and estimated quantity.</h2></div><div><p>We will recommend a practical starting mix and confirm sample or quotation details for your market.</p><Link className="button button-light" href={`/contact/?product=${category.slug}`}>Discuss this range ↗</Link></div></div></section>
      <BuyerFaqLink topic={faqTopicForCategory[category.slug] ?? "ordering"} />
    </main>
  );
}

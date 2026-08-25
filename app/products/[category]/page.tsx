import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "../../components/JsonLd";
import { catalogCategories, getCatalogItemImage, getCategory } from "../../data/catalog";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return catalogCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const halalPrefix = category.slug === "korean-sauces" || category.slug === "gochujang-pastes" ? "HALAL " : "";
  return {
    title: `${halalPrefix}${category.name} Manufacturer & OEM Supplier`,
    description: `${category.description} Certificate-backed HALAL product scope, standard export packs, OEM/private-label support and export quotations for B2B buyers.`,
    alternates: { canonical: `/products/${category.slug}` },
    openGraph: {
      title: `${category.name} | Deesheng Food`,
      description: category.description,
      url: `https://deesheng.food/products/${category.slug}`,
      images: [{ url: category.image, alt: category.imageAlt }],
    },
    twitter: { card: "summary_large_image", images: [category.image] },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const groups = [...new Set(category.items.map((item) => item.group))];
  const faqs = [
    {
      question: `Can ${category.name.toLowerCase()} be supplied under our own brand?`,
      answer: "Yes. Private-label and OEM service can include label artwork, export packaging and, for suitable projects, flavor or specification adjustment.",
    },
    {
      question: "What is the normal minimum order quantity?",
      answer: "The standard OEM MOQ is 200 cartons per item. A lower quantity may be discussed for an initial trial after the selected products and packing are confirmed.",
    },
    {
      question: "Can we request samples before placing an order?",
      answer: "Yes. Qualified B2B buyers can request samples after sharing their company, sales channel, target products and expected order quantity.",
    },
    {
      question: "How is an export quotation prepared?",
      answer: "Product, pack size, quantity and destination are confirmed before pricing and shipment terms are agreed for the order.",
    },
    {
      question: `Are relevant ${category.name.toLowerCase()} covered by HALAL certification?`,
      answer: "Deesheng Food maintains SHC HALAL certification for relevant products. Qualified B2B buyers can request current documents and exact scope confirmation for the selected product, formula and order.",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: category.name,
        description: category.description,
        url: `https://deesheng.food/products/${category.slug}`,
        isPartOf: { "@type": "WebSite", name: "Deesheng Food", url: "https://deesheng.food" },
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
          url: item.detailSlug
            ? `https://deesheng.food/product/${item.detailSlug}`
            : `https://deesheng.food/products/${category.slug}`,
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
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><b>{category.shortName}</b></nav>
          <p className="eyebrow">{category.eyebrow}</p>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
          <div className="button-row"><Link className="button button-primary" href={`/contact?product=${category.slug}`}>Request a quote</Link><a className="button button-ghost" href="/downloads/Deesheng-Food-Product-Catalogue-2026.pdf" download>Download catalogue</a></div>
        </div>
        <div className="category-hero-image"><img src={category.image} alt={category.imageAlt} width="1200" height="537" /></div>
      </section>

      <section className="note-band"><div className="shell"><span>Buyer note</span><p>{category.buyerNote}</p></div></section>

      <section className="section shell">
        <div className="section-heading compact-heading"><p className="eyebrow">Export selection</p><h2>{category.items.length} listed products and variants</h2><p>Choose products and standard packs below. Final carton specification, pricing and production details are confirmed for each inquiry.</p></div>
        <div className="group-nav" aria-label="Product groups">{groups.map((group) => <a key={group} href={`#${group.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{group}</a>)}</div>
        <div className="group-sections">
          {groups.map((group) => (
            <section className="product-group" id={group.toLowerCase().replace(/[^a-z0-9]+/g, "-")} key={group}>
              <div className="product-group-title"><p>{group}</p><span>{category.items.filter((item) => item.group === group).length} products</span></div>
              <div className="product-card-grid">
                {category.items.filter((item) => item.group === group).map((item) => (
                  <article className="product-card" key={item.name}>
                    <div className="product-card-media">
                      <img src={getCatalogItemImage(category.slug, item)} alt={`${item.name} from the Deesheng Food catalogue`} width="900" height="650" loading="lazy" />
                    </div>
                    <div className="product-card-body">
                      <div className="product-card-top"><span>{category.shortName}</span>{item.detailSlug && <Link href={`/product/${item.detailSlug}`} aria-label={`Open ${item.name}`}>↗</Link>}</div>
                      <h3>{item.name}</h3>
                      <dl><div><dt>Packing</dt><dd>{item.packing}</dd></div><div><dt>Shelf life</dt><dd>{item.shelfLife}</dd></div><div><dt>Storage</dt><dd>{item.storage}</dd></div></dl>
                      {item.detailSlug ? <Link className="card-link" href={`/product/${item.detailSlug}`}>Product details <span>→</span></Link> : <Link className="card-link" href={`/contact?product=${encodeURIComponent(item.name)}`}>Ask about this item <span>↗</span></Link>}
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

      <section className="section shell"><div className="cta-panel"><div><p className="eyebrow eyebrow-light">Ready to shortlist?</p><h2>Send your channel, pack and estimated quantity.</h2></div><div><p>We will recommend a practical starting mix and confirm sample or quotation details for your market.</p><Link className="button button-light" href={`/contact?product=${category.slug}`}>Discuss this range ↗</Link></div></div></section>
    </main>
  );
}

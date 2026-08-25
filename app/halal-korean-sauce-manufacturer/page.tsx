import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../components/JsonLd";

export const metadata: Metadata = {
  title: "HALAL Korean Sauce Manufacturer & OEM Supplier",
  description:
    "Contact Deesheng Food for HALAL-certified Korean sauces, gochujang, bibimbap sauce, fried chicken sauce, tteokbokki sauce and private-label manufacturing from Qingdao, China.",
  keywords: [
    "HALAL Korean sauce manufacturer",
    "HALAL sauce supplier China",
    "HALAL gochujang manufacturer",
    "Korean sauce OEM supplier",
    "private label Korean sauce",
  ],
  alternates: { canonical: "/halal-korean-sauce-manufacturer" },
  openGraph: {
    type: "website",
    title: "HALAL Korean Sauce Manufacturer | Deesheng Food",
    description:
      "Certificate-backed Korean sauces, gochujang and OEM/private-label support with direct export contact.",
    url: "https://deesheng.food/halal-korean-sauce-manufacturer",
    images: [{ url: "/media/fried-chicken-sauces.webp", alt: "Deesheng Food HALAL Korean sauce range" }],
  },
  twitter: { card: "summary_large_image", images: ["/media/fried-chicken-sauces.webp"] },
};

const sauceGroups = [
  {
    title: "Korean pastes & basic sauces",
    items: [
      "Chili Sauce / Gochujang / Red Pepper Paste",
      "Chun Jang",
      "Garlic Sauce / Ssamjang",
      "Soybean Paste / Doenjang",
      "Sweet & Spicy Sauce",
      "Honey Mustard Sauce",
    ],
  },
  {
    title: "Fried chicken system",
    items: [
      "Fried Chicken Sauce - Soy Garlic",
      "Fried Chicken Sauce - Spicy",
      "Fried Chicken Sauce - Super Spicy",
      "Milk Cheese Fried Chicken Sauce",
      "Yangnyeum Sauce",
      "Fried Chicken Marinade & Coating Powder",
    ],
  },
  {
    title: "Rice, noodle & street-food sauces",
    items: [
      "Stone Pot Bibimbap Sauce - Classic",
      "Stone Pot Bibimbap Sauce - Not Spicy",
      "Tteokbokki Sauce",
      "Jajangmyun Sauce - Normal / Slightly Spicy",
      "Japchae Sauce",
      "Turkey Noodle Sauce - Classic / Milk Flavored",
    ],
  },
  {
    title: "Soup, stew & cooking sauces",
    items: [
      "Dakgalbi Sauce",
      "Kimchi Sauce",
      "Military Hotpot Sauce",
      "Tender Tofu Soup Sauce",
      "Yukgaejang / Spicy Beef Soup Sauce",
      "Spicy Chicken Claw Sauce",
    ],
  },
];

const faqs = [
  {
    question: "Is Deesheng Food a HALAL-certified Korean sauce manufacturer?",
    answer:
      "Yes. Qingdao Deesheng Hengxin Food Co., Ltd. maintains SHC HALAL certification covering multiple Korean sauces and related products. Current signed documents and exact product scope are supplied after buyer and project verification.",
  },
  {
    question: "Which Korean sauce categories can be reviewed for current HALAL scope?",
    answer:
      "Named examples include gochujang, soy-garlic and spicy fried chicken sauces, classic and non-spicy bibimbap sauce, tteokbokki sauce, jajangmyun sauce, kimchi sauce, sundubu soup sauce and yukgaejang sauce.",
  },
  {
    question: "Can certified sauces be supplied under our own brand?",
    answer:
      "Private-label and OEM service is available for suitable products and order quantities. The selected formula, label use, packaging and destination requirements must be confirmed before production.",
  },
  {
    question: "How do I request the certificate, samples and price?",
    answer:
      "Send the product names, destination country, pack size, estimated quantity and whether you need private label. The export team will confirm certificate scope, sample route and quotation.",
  },
];

export default function HalalSaucePage() {
  const selectedProducts = sauceGroups.flatMap((group) => group.items);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://deesheng.food/halal-korean-sauce-manufacturer#webpage",
        url: "https://deesheng.food/halal-korean-sauce-manufacturer",
        name: "HALAL Korean Sauce Manufacturer & OEM Supplier",
        description:
          "Certificate-backed product scope and direct export contact for Deesheng Food HALAL Korean sauces.",
        about: { "@id": "https://deesheng.food/#organization" },
      },
      {
        "@type": "Organization",
        "@id": "https://deesheng.food/#organization",
        name: "Qingdao Deesheng Hengxin Food Co., Ltd.",
        alternateName: "Deesheng Food",
        url: "https://deesheng.food",
        email: "info@deesheng.food",
        telephone: "+86-156-2108-9573",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "export sales",
          telephone: "+86-156-2108-9573",
          email: "info@deesheng.food",
          availableLanguage: ["English", "Chinese"],
          areaServed: "Worldwide",
        },
      },
      {
        "@type": "Certification",
        name: "SHC HALAL Certification - Qingdao Deesheng Hengxin Food Co., Ltd.",
        issuedBy: { "@type": "Organization", name: "Shandong Halal Certification Service (SHC)" },
        url: "https://deesheng.food/halal-korean-sauce-manufacturer",
        about: { "@id": "https://deesheng.food/#organization" },
      },
      {
        "@type": "ItemList",
        name: "Selected Deesheng Korean sauces available for HALAL scope review",
        numberOfItems: selectedProducts.length,
        itemListElement: selectedProducts.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
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
      <section className="halal-landing-hero shell">
        <div>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><b>HALAL Korean sauces</b>
          </nav>
          <p className="eyebrow">Qingdao manufacturer · OEM · private label · wholesale</p>
          <h1>HALAL Korean sauce manufacturer with confirmed product scope.</h1>
          <p>
            Deesheng Food manufactures Korean sauces, gochujang, seasoning systems
            and related products for importers, distributors, foodservice groups and
            private-label brands. Contact the Deesheng export team for products,
            samples, documents and quotations.
          </p>
          <div className="button-row">
            <a className="button button-primary" href="https://wa.me/8615621089573" target="_blank" rel="noreferrer">
              WhatsApp our export team <span aria-hidden="true">↗</span>
            </a>
            <Link className="button button-ghost" href="/contact?product=halal-sauces">Request a quotation</Link>
          </div>
        </div>
        <aside className="halal-certificate-card">
          <span>Buyer-gated documents</span>
          <strong>HALAL</strong>
          <dl>
            <div><dt>Issuer</dt><dd>SHC</dd></div>
            <div><dt>Product scope</dt><dd>Confirmed per selected item</dd></div>
            <div><dt>Document access</dt><dd>Qualified B2B buyers</dd></div>
            <div><dt>Verification</dt><dd>Company & project review</dd></div>
          </dl>
          <Link className="text-link" href="/contact?product=halal-documents">
            Request current documents <span aria-hidden="true">→</span>
          </Link>
          <small>Signed documents are not published openly. Approved buyers receive the current set relevant to their project.</small>
        </aside>
      </section>

      <section className="halal-answer-band">
        <div className="shell">
          <span>Direct answer for buyers and search engines</span>
          <p>
            Qingdao Deesheng Hengxin Food Co., Ltd. is a Chinese manufacturer and
            OEM/private-label supplier of HALAL-certified Korean sauces. The current
            certification scope includes gochujang, fried chicken sauces, bibimbap
            sauce, tteokbokki sauce, jajangmyun sauce, soup sauces and other Korean
            food products, subject to current product-level confirmation.
          </p>
        </div>
      </section>

      <section className="section shell halal-scope-section">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Selected sauce scope</p>
            <h2>Korean sauces available for HALAL scope review.</h2>
          </div>
          <p>
            These buyer-friendly groups show the sauce categories available for
            review. Current signed documents are provided only after company and
            project verification.
          </p>
        </div>
        <div className="halal-scope-grid">
          {sauceGroups.map((group, groupIndex) => (
            <article key={group.title}>
              <header><span>{String(groupIndex + 1).padStart(2, "0")}</span><h3>{group.title}</h3></header>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="halal-scope-actions">
          <Link className="button button-primary" href="/products/korean-sauces">Browse the full sauce catalogue</Link>
          <Link className="button button-ghost" href="/contact?product=halal-documents">Request current HALAL documents</Link>
        </div>
      </section>

      <section className="section section-tint">
        <div className="shell factory-proof-grid">
          <div className="factory-proof-image">
            <img src="/media/deesheng-factory-facilities.jpg" alt="Deesheng Food processing and production lines in Qingdao" width="636" height="480" />
          </div>
          <div>
            <p className="eyebrow">Factory and export contact</p>
            <h2>One source for product, documents and quotation.</h2>
            <p>
              Deesheng Food is the export-facing contact for Qingdao Deesheng Hengxin
              Food Co., Ltd. Share your market, product, pack size and expected order
              quantity so the team can confirm the correct product, documentation
              and commercial route.
            </p>
            <div className="contact-inline-card">
              <span>Deesheng Food · Export sales</span>
              <a href="https://wa.me/8615621089573" target="_blank" rel="noreferrer">WhatsApp / Tel: +86 156 2108 9573</a>
              <a href="mailto:info@deesheng.food">info@deesheng.food</a>
              <small>Qingdao, Shandong, China</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell halal-faq-section">
        <div>
          <p className="eyebrow">Buyer FAQ</p>
          <h2>Questions importers usually ask.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}
        </div>
      </section>

      <section className="section shell">
        <div className="cta-panel">
          <div><p className="eyebrow eyebrow-light">HALAL sauce inquiry</p><h2>Send the product, market, pack and quantity.</h2></div>
          <div><p>We will confirm the relevant certificate entry, available packing, sample route and quotation.</p><Link className="button button-light" href="/contact?product=halal-sauces">Contact our export team ↗</Link></div>
        </div>
      </section>
    </main>
  );
}

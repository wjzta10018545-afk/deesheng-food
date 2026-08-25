import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../components/JsonLd";
import { buyerGuides } from "../data/guides";

export const metadata: Metadata = {
  title: "Korean Food Buyer Resources",
  description: "Practical sourcing guides for Korean sauce OEM, private-label gochujang, HALAL supplier qualification, food importing and foodservice product systems.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  const data = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Deesheng Food Buyer Resources", description: "Practical sourcing guides for professional food buyers.", hasPart: buyerGuides.map((guide) => ({ "@type": "Article", headline: guide.title, url: `https://deesheng.food/resources/${guide.slug}`, dateModified: guide.updated })) };
  return (
    <main>
      <JsonLd data={data} />
      <section className="inner-hero shell"><div><p className="eyebrow">Buyer resources</p><h1>Useful answers before you request a quote.</h1></div><div className="inner-hero-aside"><p>Clear, specific guidance for importers, distributors, foodservice operators and private-label brands sourcing Korean-style foods from China.</p></div></section>
      <section className="shell featured-guide"><div><span>{buyerGuides[0].category}</span><h2>{buyerGuides[0].question}</h2><p>{buyerGuides[0].description}</p><Link className="button button-light" href={`/resources/${buyerGuides[0].slug}`}>Read the complete guide →</Link></div><div><p>Most requested guide</p><strong>OEM</strong><span>{buyerGuides[0].readTime} read</span></div></section>
      <section className="section shell"><div className="section-heading compact-heading"><p className="eyebrow">Sourcing knowledge</p><h2>Guides for better buying decisions</h2></div><div className="guide-grid">{buyerGuides.slice(1).map((guide, index) => <Link href={`/resources/${guide.slug}`} key={guide.slug}><div className="guide-meta"><span>{guide.category}</span><b>0{index + 2}</b></div><h2>{guide.title}</h2><p>{guide.description}</p><div><span>{guide.readTime} read</span><b>Read guide →</b></div></Link>)}</div></section>
      <section className="section section-tint"><div className="shell resource-principles"><div><p className="eyebrow">How we write</p><h2>Specific facts beat vague claims.</h2></div><div><article><span>01</span><h3>Buyer intent first</h3><p>Every guide begins with the commercial question a real importer or distributor needs answered.</p></article><article><span>02</span><h3>Product facts</h3><p>Packing, shelf life, storage, MOQ and trade terms are stated where confirmed.</p></article><article><span>03</span><h3>No invented pricing</h3><p>Prices are quoted only after product, pack and quantity are clear.</p></article></div></div></section>
      <section className="section shell"><div className="cta-panel"><div><p className="eyebrow eyebrow-light">Still comparing suppliers?</p><h2>Send us the product question you need answered.</h2></div><div><p>Our export team will connect the question to the right product, pack, specification or document.</p><Link className="button button-light" href="/contact">Ask Deesheng Food ↗</Link></div></div></section>
    </main>
  );
}

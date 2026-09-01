import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../components/JsonLd";
import { officialSocialProfileUrls } from "../components/SocialLinks";

export const metadata: Metadata = {
  title: "About Deesheng Food",
  description: "Meet Qingdao Deesheng Hengxin Food Co., Ltd., an export manufacturer of Korean sauces, seasonings, kimchi, oils and frozen ingredients.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const data = { "@context": "https://schema.org", "@type": "Organization", "@id": "https://deesheng.food/#organization", name: "Qingdao Deesheng Hengxin Food Co., Ltd.", alternateName: "Deesheng Food", url: "https://deesheng.food", logo: "https://deesheng.food/media/deesheng-ds-logo.png", email: "info@deesheng.food", telephone: "+86-156-2108-9573", address: { "@type": "PostalAddress", streetAddress: "Shanghetou Village, Baishahe Street Agency", addressLocality: "Pingdu, Qingdao", addressRegion: "Shandong", postalCode: "266700", addressCountry: "CN" }, sameAs: ["https://qd-deesheng.en.made-in-china.com/", ...officialSocialProfileUrls] };
  return (
    <main>
      <JsonLd data={data} />
      <section className="about-hero"><div className="shell"><p className="eyebrow eyebrow-light">Qingdao · China · Global export</p><h1>We help food buyers turn Korean flavor into commercial products.</h1></div></section>
      <section className="section shell about-intro"><div><p className="eyebrow">Who we are</p><h2>A manufacturing partner built around the buyer&apos;s next step.</h2></div><div><p>Qingdao Deesheng Hengxin Food Co., Ltd. focuses its current export portfolio on Korean sauces and pastes, kimchi, chili powder and dry seasonings, and frozen vegetables for retail and foodservice markets.</p><p>Deesheng Food is our export-facing platform for importers, distributors, restaurant suppliers and brand owners who need clear product selection, practical OEM support and dependable follow-through from samples to shipment.</p></div></section>
      <section className="shell about-values"><article><span>01</span><h2>Commercial clarity</h2><p>We confirm product, pack, quantity, channel and trade term before turning a conversation into a quotation.</p></article><article><span>02</span><h2>Factory-backed answers</h2><p>Product questions are tied to actual manufacturing, specifications and available export formats.</p></article><article><span>03</span><h2>Long-term range building</h2><p>We aim to help buyers build repeatable product lines, not simply send an isolated sample.</p></article></section>
      <section className="section shell"><div className="about-facts"><div><strong>Qingdao</strong><span>Manufacturing and export base</span></div><div><strong>6 families</strong><span>Sauces, pastes, seasonings, kimchi, frozen vegetables and essentials</span></div><div><strong>4 credentials</strong><span>BRCGS Grade A, HACCP, HALAL and OU Kosher</span></div><div><strong>B2B only</strong><span>Importers, distributors, foodservice and brands</span></div></div></section>
      <section className="section shell entity-facts"><div><p className="eyebrow">Company identity</p><h2>Factory-backed export support.</h2><p>Deesheng Food presents the export product portfolio of Qingdao Deesheng Hengxin Food Co., Ltd. for overseas importers, distributors, foodservice buyers and private-label projects. Product, certificate, sample and quotation requests are coordinated through the export contact team.</p></div><dl><div><dt>Manufacturer</dt><dd>Qingdao Deesheng Hengxin Food Co., Ltd.</dd></div><div><dt>Export-facing name</dt><dd>Deesheng Food</dd></div><div><dt>Manufacturing location</dt><dd>Pingdu, Qingdao, Shandong, China</dd></div><div><dt>Export inquiry website</dt><dd><a href="https://deesheng.food">deesheng.food</a></dd></div></dl></section>
      <section className="section section-tint"><div className="shell about-portfolio"><div><p className="eyebrow">Our portfolio</p><h2>Four focused product lines.</h2><p>Build a practical Korean food range with one export conversation.</p><Link className="button button-dark" href="/products">Explore all products</Link></div><div className="about-portfolio-list"><Link href="/products/korean-sauces"><span>01</span>Korean sauces &amp; gochujang<b>→</b></Link><Link href="/products/kimchi"><span>02</span>Korean kimchi<b>→</b></Link><Link href="/products/chili-seasonings"><span>03</span>Chili powder &amp; seasonings<b>→</b></Link><Link href="/products/frozen-vegetables"><span>04</span>Frozen vegetables<b>→</b></Link></div></div></section>
      <section className="section shell"><div className="cta-panel"><div><p className="eyebrow eyebrow-light">Speak with export sales</p><h2>Start with the product and market you know.</h2></div><div><p>We will help turn that starting point into a practical sample, quotation or OEM discussion.</p><Link className="button button-light" href="/contact">Contact Deesheng Food ↗</Link></div></div></section>
    </main>
  );
}

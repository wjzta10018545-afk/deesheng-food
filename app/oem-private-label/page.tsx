import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../components/JsonLd";

export const metadata: Metadata = {
  title: "Korean Sauce OEM & Private Label Manufacturing",
  description: "Develop Korean sauces, gochujang, seasonings and related foods under your own brand with samples, flavor adjustment, packaging and export support.",
  alternates: { canonical: "/oem-private-label" },
};

const steps = [
  ["01", "Buyer brief", "Tell us the product, market, sales channel, desired pack and estimated order quantity."],
  ["02", "Product route", "Choose an existing export formula for speed or define the reference taste and required adjustment."],
  ["03", "Samples", "Evaluate samples and return structured feedback on heat, sweetness, texture, color and application."],
  ["04", "Label & packing", "Confirm artwork, language, nutrition panel, carton marks and market-specific label requirements."],
  ["05", "Commercial approval", "Confirm product specification, price, shipment terms, quantity, payment terms and lead time."],
  ["06", "Production & export", "Production begins after final confirmation, with quality documents prepared for shipment."],
];

const faq = [
  { question: "What is the standard OEM minimum order quantity?", answer: "The standard MOQ is 200 cartons per item. For a first market test, a lower quantity may be discussed after the selected products and packs are confirmed." },
  { question: "Is private label priced differently from the factory brand?", answer: "The product price is normally assessed on the same commercial basis. Final cost depends on formula, pack, label, packaging materials, quantity and any new tooling or design requirements." },
  { question: "Can Deesheng help create a formula from a reference product?", answer: "Yes. A reference brand, target ingredient direction or detailed flavor brief can be used to start development. The more precise the benchmark, the faster sample rounds can be evaluated." },
  { question: "How long does production take?", answer: "For confirmed standard export products, a typical target is about 14 days after label approval and payment confirmation. New formula or custom packaging projects require a separate schedule." },
  { question: "Can several products be mixed in one container?", answer: "Yes. Mixed-product container planning can be discussed, subject to the MOQ, carton dimensions, weight, storage temperature and production availability of each item." },
];

export default function OemPage() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", name: "Korean Food OEM and Private Label Manufacturing", provider: { "@type": "Organization", name: "Qingdao Deesheng Hengxin Food Co., Ltd." }, areaServed: "Worldwide", serviceType: ["Food OEM", "Private label sauce manufacturing", "Packaging customization", "Export support"] },
      { "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    ],
  };
  return (
    <main>
      <JsonLd data={data} />
      <section className="inner-hero shell"><div><p className="eyebrow">OEM / ODM / Private label</p><h1>Turn a market opportunity into your own food brand.</h1></div><div className="inner-hero-aside"><p>Work with one export team from product selection and samples through label, production and shipment.</p><Link className="button button-primary" href="/contact?product=oem">Discuss an OEM project</Link></div></section>
      <section className="oem-visual-band"><div className="shell oem-visual-grid"><div><span>YOUR BRAND</span><h2>Standard formula</h2><p>Fastest route: select a proven export product, pack and label.</p></div><div><span>YOUR MARKET</span><h2>Adjusted flavor</h2><p>Refine heat, sweetness, texture or application against a clear brief.</p></div><div><span>YOUR PRODUCT</span><h2>Custom development</h2><p>Build from a reference product or more detailed formulation requirement.</p></div></div></section>
      <section className="section shell"><div className="section-heading split-heading"><div><p className="eyebrow">Development process</p><h2>Six clear steps from brief to shipment.</h2></div><p>A strong project starts with a specific channel, pack and order plan. That allows the factory to recommend the right technical and commercial route.</p></div><ol className="oem-steps">{steps.map(([number, title, text]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>
      <section className="section section-tint"><div className="shell capability-grid"><div><p className="eyebrow">What can be customized</p><h2>Commercial flexibility without losing production discipline.</h2></div><div className="capability-cards"><article><h3>Flavor profile</h3><p>Heat, sweetness, salt, texture, color and application can be discussed for suitable volume.</p></article><article><h3>Pack format</h3><p>Retail bottles and tubs, foodservice pouches, bulk cartons and selected custom formats.</p></article><article><h3>Branding</h3><p>Private label, export label, carton mark and customized packaging artwork.</p></article><article><h3>Product mix</h3><p>Coordinate sauces, dry mixes, seasonings and related items for one market launch.</p></article></div></div></section>
      <section className="section shell"><div className="faq-layout"><div><p className="eyebrow">OEM buyer FAQ</p><h2>Commercial questions, answered.</h2><p>Precise product and quantity information allows us to give a precise answer.</p></div><div className="faq-list">{faq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div></div></section>
      <section className="section shell"><div className="cta-panel"><div><p className="eyebrow eyebrow-light">Start with a useful brief</p><h2>Product, market, channel, pack and quantity.</h2></div><div><p>Send these five points and we can quickly judge whether a stock formula, adjusted product or new development route fits best.</p><Link className="button button-light" href="/contact?product=oem">Send your project brief ↗</Link></div></div></section>
    </main>
  );
}

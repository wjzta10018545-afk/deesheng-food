import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../components/JsonLd";
import { buyerFaqs, faqTopics } from "../data/buyer-faqs";

export const metadata: Metadata = {
  title: "Food Importer FAQ: Korean Sauces, Kimchi & OEM",
  description: "Practical answers for food importers: product-specific MOQ, kimchi packs and cold chain, sauce samples, private label, certificates, chili specifications and shipping.",
  alternates: { canonical: "/buyer-faq/" },
  openGraph: { title: "Food Importer FAQ | Deesheng Food", description: "Answers to sourcing, samples, specifications, private label and shipment questions.", url: "https://deesheng.food/buyer-faq/", type: "website" },
};

export default function BuyerFaqPage() {
  const data = { "@context": "https://schema.org", "@graph": [
    { "@type": "FAQPage", "@id": "https://deesheng.food/buyer-faq/#faq", url: "https://deesheng.food/buyer-faq/", name: "Food Importer FAQ", dateModified: "2026-10-09", mainEntity: buyerFaqs.map((faq) => ({ "@type": "Question", "@id": `https://deesheng.food/buyer-faq/#${faq.id.toLowerCase()}`, name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
    { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: "https://deesheng.food/" }, { "@type": "ListItem", position: 2, name: "Buyer Resources", item: "https://deesheng.food/resources/" }, { "@type": "ListItem", position: 3, name: "Buyer FAQ", item: "https://deesheng.food/buyer-faq/" } ] },
  ] };
  return (
    <main>
      <JsonLd data={data} />
      <section className="inner-hero shell"><div><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/resources/">Buyer Resources</Link><span>/</span><b>Buyer FAQ</b></nav><p className="eyebrow">Food importer questions</p><h1>Clear answers before your next order.</h1></div><div className="inner-hero-aside"><p>Practical sourcing questions for importers, distributors, food manufacturers and private-label brands. Choose a topic to compare products and prepare a useful inquiry.</p><p>Updated October 9, 2026. Availability, specifications and commercial terms are confirmed for the selected product and order.</p></div></section>
      <nav id="topics" className="shell buyer-faq-topics" aria-label="FAQ topics">{faqTopics.map((topic) => <a href={`#${topic.id}`} key={topic.id}><strong>{topic.title}</strong><span>{buyerFaqs.filter((faq) => faq.topic === topic.id).length} questions ↓</span></a>)}</nav>
      {faqTopics.map((topic) => <section id={topic.id} className="section shell buyer-faq-topic" key={topic.id}><div className="faq-layout"><div><p className="eyebrow">Buyer FAQ</p><h2>{topic.title}</h2><p>{topic.description}</p><p><Link className="text-link" href={topic.href}>{topic.link} →</Link></p><a href="#topics">Back to topics ↑</a></div><div className="faq-list">{buyerFaqs.filter((faq) => faq.topic === topic.id).map((faq) => <details id={faq.id.toLowerCase()} key={faq.id}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>)}
      <section className="section shell"><div className="cta-panel"><div><p className="eyebrow eyebrow-light">Ready to discuss a project?</p><h2>Send the product, pack, quantity and destination.</h2></div><div><p>Add your intended use, label and document requirements so we can check the right specification and quotation.</p><Link className="button button-light" href="/contact/?product=buyer-faq">Ask our export team ↗</Link></div></div></section>
    </main>
  );
}

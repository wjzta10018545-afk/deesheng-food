import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "../../components/JsonLd";
import { buyerGuides, getGuide } from "../../data/guides";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return buyerGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.description, alternates: { canonical: `/resources/${guide.slug}` }, openGraph: { type: "article", title: guide.title, description: guide.description, url: `https://deesheng.food/resources/${guide.slug}`, modifiedTime: guide.updated }, twitter: { card: "summary" } };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const related = buyerGuides.filter((item) => item.slug !== guide.slug).slice(0, 3);
  const data = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", headline: guide.title, description: guide.description, datePublished: guide.updated, dateModified: guide.updated, author: { "@type": "Organization", name: "Deesheng Food Export Team", url: "https://deesheng.food/about" }, publisher: { "@type": "Organization", name: "Qingdao Deesheng Hengxin Food Co., Ltd.", url: "https://deesheng.food" }, mainEntityOfPage: `https://deesheng.food/resources/${guide.slug}`, audience: { "@type": "BusinessAudience", audienceType: guide.audience } },
    { "@type": "FAQPage", mainEntity: guide.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ] };
  return (
    <main>
      <JsonLd data={data} />
      <article className="guide-article shell">
        <header className="guide-header"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/resources">Buyer Resources</Link><span>/</span><b>{guide.category}</b></nav><p className="eyebrow">{guide.category} · {guide.readTime} read</p><h1>{guide.title}</h1><p>{guide.description}</p><div className="guide-byline"><span>By Deesheng Food Export Team</span><span>Updated {new Date(`${guide.updated}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</span></div></header>
        <div className="guide-layout"><aside><p>In this guide</p><nav>{guide.sections.map((section, index) => <a key={section.heading} href={`#section-${index + 1}`}><span>0{index + 1}</span>{section.heading}</a>)}<a href="#buyer-faq"><span>Q</span>Buyer FAQ</a></nav><Link className="button button-primary" href="/contact">Discuss a project</Link></aside><div className="guide-content"><div className="answer-box"><span>Direct answer</span><h2>{guide.question}</h2><p>{guide.description} The sections below explain the practical sourcing and commercial decisions in detail.</p></div>{guide.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.heading}><span className="section-number">0{index + 1}</span><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}<section id="buyer-faq" className="guide-faq"><span className="section-number">Q</span><h2>Buyer FAQ</h2>{guide.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</section></div></div>
      </article>
      <section className="section section-tint"><div className="shell"><div className="section-heading compact-heading"><p className="eyebrow">Continue researching</p><h2>Related buyer guides</h2></div><div className="related-grid">{related.map((item) => <Link href={`/resources/${item.slug}`} key={item.slug}><span>{item.category}</span><h3>{item.title}</h3><p>{item.description}</p><b>Read guide →</b></Link>)}</div></div></section>
      <section className="section shell"><div className="cta-panel"><div><p className="eyebrow eyebrow-light">Turn research into a shortlist</p><h2>Tell us what you plan to sell and where.</h2></div><div><p>We can connect your market brief to specific products, packs, samples and a practical quotation route.</p><Link className="button button-light" href="/contact">Start an inquiry ↗</Link></div></div></section>
    </main>
  );
}

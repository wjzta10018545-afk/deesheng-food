import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../components/JsonLd";
import { certificationMarks } from "../data/certifications";

export const metadata: Metadata = {
  title: "Food Quality & Certifications",
  description: "Review Deesheng Food's BRCGS Grade A, HACCP, OU Kosher and SHC HALAL qualification process for professional food buyers.",
  alternates: { canonical: "/quality-certifications" },
};

const certifications = [
  ["BRCGS", "Grade A", "A recognized food safety and quality framework used by major food buyers and retailers."],
  ["HACCP", "Food safety", "Hazard analysis and critical control principles applied to production control."],
  ["HALAL", "SHC HALAL", "Current documents and exact product scope are supplied to qualified B2B buyers after project verification."],
  ["OU Kosher", "Kosher", "Kosher certification support for relevant export products."],
];

const certificateDocumentPreviews = [
  { name: "BRCGS Grade A", image: "/media/certificate-previews/brcgs-document.webp" },
  { name: "HACCP", image: "/media/certificate-previews/haccp-document.webp" },
  { name: "SHC HALAL", image: "/media/certificate-previews/shc-halal-document.webp" },
  { name: "OU Kosher", image: "/media/certificate-previews/ou-kosher-document.webp" },
];

export default function QualityPage() {
  const data = { "@context": "https://schema.org", "@graph": [
    { "@type": "AboutPage", name: "Deesheng Food Quality and Certifications", about: certifications.map(([name]) => ({ "@type": "DefinedTerm", name })) },
    { "@type": "Certification", name: "SHC HALAL Certification - Qingdao Deesheng Hengxin Food Co., Ltd.", issuedBy: { "@type": "Organization", name: "Shandong Halal Certification Service (SHC)" }, url: "https://deesheng.food/halal-korean-sauce-manufacturer" },
  ] };
  return (
    <main>
      <JsonLd data={data} />
      <section className="inner-hero shell"><div><p className="eyebrow">Food safety & export readiness</p><h1>Quality evidence for professional food buyers.</h1></div><div className="inner-hero-aside"><p>Certification is the starting point. Product specifications, labels, storage, shelf life and batch documents must also match the actual project.</p><Link className="button button-primary" href="/contact?product=documents">Request qualification documents</Link></div></section>
      <section className="quality-proof-section">
        <div className="shell">
          <div className="quality-proof-heading">
            <div>
              <p className="eyebrow eyebrow-light">Certifications, registrations & audits</p>
              <h2>Verified systems supporting global food supply.</h2>
            </div>
            <p>
              Real certification previews are shown for buyer confidence. Current signed documents,
              certificate numbers and exact product scope are supplied after company and project verification.
            </p>
          </div>

          <div className="quality-page-proof">
            <div className="quality-certificate-visual">
              <div className="quality-document-grid" aria-label="Selected Deesheng Food certification document previews">
                {certificateDocumentPreviews.map((certificate) => (
                  <figure key={certificate.name}>
                    <img
                      src={certificate.image}
                      alt={`${certificate.name} certificate preview`}
                      width="400"
                      height="500"
                    />
                    <figcaption>{certificate.name}</figcaption>
                  </figure>
                ))}
              </div>
              <div className="quality-document-access">
                <div>
                  <span>Protected document access</span>
                  <strong>Current documents for qualified B2B buyers</strong>
                  <p>Signed copies and applicable product scope are provided after buyer and project verification.</p>
                </div>
                <Link className="text-link" href="/contact?product=documents">
                  Request current documents <b aria-hidden="true">↗</b>
                </Link>
              </div>
            </div>

            <div className="quality-assurance-visual">
              <div className="quality-certification-wall" aria-label="Deesheng Food certifications, registrations and audit marks">
                {certificationMarks.map((mark) => (
                  <article key={mark.name}>
                    <img src={mark.image} alt={`${mark.name} mark`} width="400" height="220" />
                    <strong>{mark.name}</strong>
                    <span>{mark.detail}</span>
                  </article>
                ))}
              </div>
              <div className="quality-assurance-caption">
                <span>Ten listed credentials</span>
                <strong>Certification-backed export readiness</strong>
                <p>Applicability is confirmed against the exact product, formula and destination market.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section shell"><div className="cert-grid">{certifications.map(([name, label, description]) => <article key={name}><span>{label}</span><h2>{name}</h2><p>{description}</p></article>)}</div><div className="halal-proof-line"><div><span>HALAL product evidence</span><strong>Current documents provided after buyer verification</strong></div><div><Link className="text-link" href="/halal-korean-sauce-manufacturer">Review the sauce scope →</Link><Link className="text-link" href="/contact?product=halal-documents">Request documents ↗</Link></div></div></section>
      <section className="section section-tint"><div className="shell quality-system"><div><p className="eyebrow">Buyer due diligence</p><h2>Documents should follow the product—not just the company.</h2><p>For a qualified project, we align the relevant documentation with the selected product and destination-market requirements.</p></div><ol><li><span>01</span><div><h3>Company & factory</h3><p>Business identity, factory profile and available audit or certification documents.</p></div></li><li><span>02</span><div><h3>Product specification</h3><p>Ingredients, allergens, packing, storage, shelf life and technical parameters by product.</p></div></li><li><span>03</span><div><h3>Label review</h3><p>Buyer artwork and destination-market information are checked before print and production.</p></div></li><li><span>04</span><div><h3>Shipment documents</h3><p>Commercial and packing documents are prepared against the confirmed order and trade term.</p></div></li></ol></div></section>
      <section className="section shell"><div className="cta-panel"><div><p className="eyebrow eyebrow-light">Qualifying a supplier?</p><h2>Tell us the exact product and destination.</h2></div><div><p>That lets us provide the most relevant certificates, specifications and export information for your review.</p><Link className="button button-light" href="/contact?product=documents">Request documents ↗</Link></div></div></section>
    </main>
  );
}

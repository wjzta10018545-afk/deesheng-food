import type { Metadata } from "next";
import { BuyerFaqLink } from "../components/BuyerFaqLink";
import { ContactLinks } from "../components/ContactLinks";
import { JsonLd } from "../components/JsonLd";
import { officialSocialProfileUrls, SocialLinks } from "../components/SocialLinks";
import { ExportCta } from "../components/ExportCta";

export const metadata: Metadata = {
  title: "Request a B2B Quote",
  description: "Contact Deesheng Food for Korean sauce, gochujang, seasoning, kimchi and frozen vegetable samples, OEM projects and export quotations.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Deesheng Food Export Sales",
    mainEntity: {
      "@type": "Organization",
      name: "Qingdao Deesheng Hengxin Food Co., Ltd.",
      email: "info@deesheng.food",
      telephone: "+86-156-2108-9573",
      sameAs: officialSocialProfileUrls,
      contactPoint: {
        "@type": "ContactPoint",
        name: "Kevin Wang",
        contactType: "sales",
        telephone: "+86-156-2108-9573",
        email: "info@deesheng.food",
        availableLanguage: ["English", "Chinese"],
      },
    },
  };
  return (
    <main>
      <JsonLd data={data} />
      <section className="contact-hero shell">
        <div><p className="eyebrow">B2B export inquiry</p><h1>Tell us what you plan to buy.</h1><p>Product, pack, quantity, market and channel are the fastest route to a useful answer.</p></div>
        <div className="contact-direct">
          <span>Direct export sales</span>
          <ContactLinks variant="contact" />
          <div className="contact-social-block">
            <small>Official social media</small>
            <SocialLinks variant="contact" />
          </div>
          <p><strong>Kevin Wang</strong><br />NexusPoint international export desk<br /><a href="https://nexuspointtrade.com/">nexuspointtrade.com</a><br />Qingdao, Shandong, China</p>
        </div>
      </section>
      <section className="section section-tint"><div className="shell quote-layout"><div><p className="eyebrow">Request price or samples</p><h2>Build a complete inquiry</h2><p>Our official international export and private-label desk at NexusPoint handles quotations, samples, OEM briefs and consolidated FOB Qingdao shipping. Prepare the details below and continue to the export inquiry form.</p><ul><li><span>1</span>Company and market</li><li><span>2</span>Product and pack</li><li><span>3</span>Estimated quantity</li><li><span>4</span>OEM or sample requirement</li></ul></div><div className="export-contact-panel"><h3>NexusPoint international export desk</h3><p>U.S. & China contracting · FOB Qingdao</p><ExportCta className="button button-primary">Continue to quotation & samples</ExportCta></div></div></section>
      <section className="section shell contact-expect"><div><p className="eyebrow">What happens next</p><h2>A practical response, not a generic catalogue dump.</h2></div><ol><li><span>01</span><h3>We qualify the request</h3><p>We check whether the buyer, product, quantity and target market fit our export range.</p></li><li><span>02</span><h3>We narrow the products</h3><p>We confirm the most relevant product variants and packing before quoting or sampling.</p></li><li><span>03</span><h3>We agree the next step</h3><p>Depending on the project, this may be specifications, certificates, samples, quotation or OEM development.</p></li></ol></section>
      <BuyerFaqLink />
    </main>
  );
}

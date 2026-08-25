import Link from "next/link";
import { JsonLd } from "./components/JsonLd";
import { FactoryHero } from "./components/FactoryHero";
import { catalogCategories } from "./data/catalog";
import { certificationMarks } from "./data/certifications";

const highlights = [
  ["Verified HALAL", "Current documents supplied to qualified B2B buyers"],
  ["90+", "Products and variants across four active ranges"],
  ["4 ranges", "Sauces, kimchi, chili seasonings and frozen vegetables"],
  ["B2B OEM", "Private-label product and packaging support"],
];

const categoryHighlights: Record<string, string[]> = {
  "korean-sauces": ["Fried chicken", "Gochujang & pastes", "Bibimbap"],
  kimchi: ["Cabbage kimchi", "Radish kimchi", "Specialty kimchi"],
  "chili-seasonings": ["Chili powder", "Sesame", "Dry seasonings"],
  "frozen-vegetables": ["Bibimbap vegetables", "IQF vegetables", "Mixed vegetables"],
};

const halalSauceSpotlight = [
  ["Gochujang / red pepper paste", "/product/gochujang"],
  ["Classic & non-spicy bibimbap sauce", "/product/bibimbap-sauce"],
  ["Soy garlic fried chicken sauce", "/product/soy-garlic-fried-chicken-sauce"],
  ["Spicy fried chicken sauce", "/products/korean-sauces"],
  ["Tteokbokki sauce", "/product/tteokbokki-sauce"],
  ["Honey mustard sauce", "/product/honey-mustard-sauce"],
  ["Doenjang & ssamjang", "/products/korean-sauces#korean-paste"],
  ["Kimchi & Korean soup sauces", "/products/korean-sauces"],
];

const certificateDocumentPreviews = [
  { name: "BRCGS Grade A", image: "/media/certificate-previews/brcgs-document.webp" },
  { name: "HACCP", image: "/media/certificate-previews/haccp-document.webp" },
  { name: "SHC HALAL", image: "/media/certificate-previews/shc-halal-document.webp" },
  { name: "OU Kosher", image: "/media/certificate-previews/ou-kosher-document.webp" },
];

const partnerBrands = [
  { name: "Nongshim", image: "/media/partners/nongshim.png" },
  { name: "CJ", image: "/media/partners/cj.png" },
  { name: "Sempio", image: "/media/partners/sempio.png" },
  { name: "Ottogi", image: "/media/partners/ottogi.png" },
  { name: "CU", image: "/media/partners/cu.png" },
  { name: "Tesco", image: "/media/partners/tesco.png" },
  { name: "ALDI", image: "/media/partners/aldi.png" },
  { name: "Nestle", image: "/media/partners/nestle.png" },
  { name: "Nissin", image: "/media/partners/nissin.png" },
  { name: "Hela", image: "/media/partners/hela.png" },
  { name: "PRAN", image: "/media/partners/pran.png" },
  { name: "Farmfoods", image: "/media/partners/farmfoods.png" },
  { name: "Yoshinoya", image: "/media/partners/yoshinoya.png" },
  { name: "Indofood", image: "/media/partners/indofood.png" },
  { name: "Mayora", image: "/media/partners/mayora.png" },
  { name: "Sias", image: "/media/partners/sias.png" },
  { name: "Midangnae Global Sourcing Group", image: "/media/partners/midangnae.png" },
  { name: "Hwangbo Village", image: "/media/partners/hwangbo-village.png" },
  { name: "Myeong Ryun Jinsa Pork Ribs", image: "/media/partners/myeong-ryun-jinsa.png" },
  { name: "Haessalchan Bing Chae", image: "/media/partners/haessalchan.png" },
  { name: "Deoksugung", image: "/media/partners/deoksugung.png" },
  { name: "Korean Foodservice Brand", image: "/media/partners/korean-color-mark.png" },
  { name: "De Sang", image: "/media/partners/daesang.png" },
  { name: "Fresh Village", image: "/media/partners/fresh-village.png" },
  { name: "On Gukmin", image: "/media/partners/ongukmin.png" },
  { name: "Gaya Kimchi", image: "/media/partners/gaya-kimchi.png" },
  { name: "Farmpia", image: "/media/partners/farmpia.png" },
  { name: "Gidae Manjok", image: "/media/partners/gidae-manjok.png" },
  { name: "Cheonnyeon Banchan", image: "/media/partners/cheonnyeon-banchan.png" },
  { name: "Modeun Banchan", image: "/media/partners/modeun-banchan.png" },
  { name: "Gemüse Meyer", image: "/media/partners/gemuse-meyer.png" },
  { name: "Maimon", image: "/media/partners/maimon.png" },
  { name: "National Frozen Foods", image: "/media/partners/national-frozen-foods.png" },
  { name: "Freddy Hirsch", image: "/media/partners/freddy-hirsch.png" },
  { name: "RB", image: "/media/partners/rb.png" },
  { name: "Fararo", image: "/media/partners/fararo.png" },
  { name: "Hanguk Kitchen", image: "/media/partners/hanguk-kitchen.png" },
  { name: "Myungga", image: "/media/partners/myungga.png" },
  { name: "Otosan", image: "/media/partners/otosan.png" },
  { name: "Montabo Below Zero", image: "/media/partners/montabo.png" },
  { name: "Seco Spice", image: "/media/partners/seco-spice.png" },
  { name: "Roshen", image: "/media/partners/roshen.png" },
  { name: "PMJ Foods", image: "/media/partners/pmj-foods.png" },
  { name: "Seabrook Brothers & Sons", image: "/media/partners/seabrook.png" },
  { name: "Vestey", image: "/media/partners/vestey.png" },
];

export default function Home() {
  const organization = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://deesheng.food/#organization",
        name: "Qingdao Deesheng Hengxin Food Co., Ltd.",
        alternateName: "Deesheng Food",
        url: "https://deesheng.food",
        logo: "https://deesheng.food/media/deesheng-ds-logo.png",
        email: "info@deesheng.food",
        telephone: "+86-156-2108-9573",
        description:
          "HALAL-certified export manufacturer and OEM supplier of Korean-style sauces, gochujang, kimchi, chili powder, dry seasonings and frozen vegetables.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Shanghetou Village, Baishahe Street Agency",
          addressLocality: "Pingdu, Qingdao",
          addressRegion: "Shandong",
          postalCode: "266700",
          addressCountry: "CN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "export sales",
          telephone: "+86-156-2108-9573",
          email: "info@deesheng.food",
          availableLanguage: ["English", "Chinese"],
          areaServed: "Worldwide",
        },
        sameAs: [
          "https://qd-deesheng.en.made-in-china.com/",
          "https://www.ife.co.uk/exhibitors/qingdao-deeshenghengxin-food-co",
          "https://certificat.ecocert.com/company/1A0B3E17-E3D9-49C2-A068-5040376A4388",
        ],
        hasCertification: {
          "@type": "Certification",
          name: "SHC HALAL Certification for Deesheng Food Products",
          issuedBy: {
            "@type": "Organization",
            name: "Shandong Halal Certification Service (SHC)",
          },
          url: "https://deesheng.food/halal-korean-sauce-manufacturer",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://deesheng.food/#website",
        url: "https://deesheng.food",
        name: "Deesheng Food",
        publisher: { "@id": "https://deesheng.food/#organization" },
      },
    ],
  };

  return (
    <main>
      <JsonLd data={organization} />
      <FactoryHero />

      <section className="proof-band">
        <div className="shell proof-grid">
          {highlights.map(([value, label]) => (
            <div className="proof-item" key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section shell catalog-section" id="products">
        <div className="section-heading split-heading catalogue-heading">
          <div>
            <p className="eyebrow">Four active product lines</p>
            <h2>Four focused ranges. One export-ready factory.</h2>
          </div>
          <p>
            Enter a range to see the detailed products, catalogue photography,
            standard packs and direct inquiry route for each item.
          </p>
        </div>
        <div className="primary-category-grid">
          {catalogCategories.map((category, index) => (
            <Link className="primary-category-card" href={`/products/${category.slug}`} key={category.slug}>
              <img src={category.image} alt={category.imageAlt} width="1600" height="1000" loading="lazy" />
              <span className="primary-category-shade" aria-hidden="true" />
              <div className="primary-category-topline">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <b>{category.eyebrow}</b>
              </div>
              <div className="primary-category-content">
                <h3>{category.name}</h3>
                <div className="primary-category-tags">
                  {categoryHighlights[category.slug].map((item) => <span key={item}>{item}</span>)}
                </div>
                <div className="primary-category-action">
                  <span>{category.items.length} products & variants</span>
                  <b aria-hidden="true">↗</b>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="center-action">
          <Link className="text-link" href="/products">
            Search the complete product index <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="home-evidence">
        <div className="shell">
          <div className="home-evidence-main">
            <Link className="home-certificate-thumb" href="/quality-certifications" aria-label="View Deesheng Food certification and assurance details">
              <div className="home-certificate-documents">
                {certificateDocumentPreviews.map((certificate) => (
                  <figure key={certificate.name}>
                    <img
                      src={certificate.image}
                      alt={`${certificate.name} certificate preview`}
                      width="200"
                      height="233"
                      loading="lazy"
                    />
                    <figcaption>{certificate.name}</figcaption>
                  </figure>
                ))}
              </div>
              <span>View certification details <b aria-hidden="true">↗</b></span>
            </Link>

            <div className="home-evidence-copy">
              <p className="eyebrow eyebrow-light">Verifiable certification</p>
              <h2>HALAL Korean sauces with confirmed product scope.</h2>
              <p>
                Qingdao Deesheng Hengxin Food Co., Ltd. manufactures HALAL Korean
                sauces for export. Current certification supports Korean sauces,
                pastes, seasonings and related products. Signed documents and the
                applicable product scope are provided after buyer and project verification.
              </p>
              <div className="home-evidence-tags" aria-label="Selected products available for HALAL scope review">
                {halalSauceSpotlight.map(([name, href]) => (
                  <Link href={href} key={name}>{name}</Link>
                ))}
              </div>
            </div>

            <aside className="home-evidence-facts" aria-label="HALAL certification facts">
              <dl>
                <div><dt>Issuer</dt><dd>SHC</dd></div>
                <div><dt>Product scope</dt><dd>Confirmed per selected item</dd></div>
                <div><dt>Document access</dt><dd>Qualified B2B buyers</dd></div>
              </dl>
              <Link className="button button-light" href="/contact?product=halal-documents">
                Request current documents <span aria-hidden="true">→</span>
              </Link>
            </aside>
          </div>

          <div className="home-assurance-heading">
            <div>
              <span>Certifications, registrations & audits</span>
              <strong>Buyer assurance at a glance</strong>
            </div>
            <Link className="text-link" href="/quality-certifications">Quality details <span aria-hidden="true">→</span></Link>
          </div>
          <div className="home-assurance-grid" aria-label="Deesheng Food certifications, registrations and audits">
            {certificationMarks.map((mark) => (
              <article className="home-assurance-card" key={mark.name}>
                <div>
                  <img src={mark.image} alt={`${mark.name} mark`} width="400" height="220" loading="lazy" />
                </div>
                <strong>{mark.name}</strong>
                <span>{mark.detail}</span>
              </article>
            ))}
          </div>
          <p className="home-assurance-note">
            Certification, registration and audit applicability is confirmed against the exact product, formula and destination market.
          </p>
        </div>
      </section>

      <section className="home-oem">
        <div className="shell">
          <div className="home-oem-heading">
            <div>
              <p className="eyebrow">OEM & private label</p>
              <h2>From brief to export-ready product.</h2>
            </div>
            <p>
              Standard products, flavor adjustment, private-label packaging and
              export support from one manufacturing team.
            </p>
            <Link className="button button-dark" href="/oem-private-label">See how OEM works</Link>
          </div>
          <ol className="home-oem-steps">
            <li><span>01</span><div><h3>Define the brief</h3><p>Product, flavor, pack, channel and quantity.</p></div></li>
            <li><span>02</span><div><h3>Confirm samples</h3><p>Select a standard item or refine the formula.</p></div></li>
            <li><span>03</span><div><h3>Approve packaging</h3><p>Confirm label, artwork and export-ready pack.</p></div></li>
            <li><span>04</span><div><h3>Produce & ship</h3><p>Quality-controlled production and export documents.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section shell partner-showcase">
        <div className="section-heading split-heading partner-heading">
          <div>
            <p className="eyebrow">Selected cooperation</p>
            <h2>Brands and buyers across global food markets.</h2>
          </div>
          <p>
            All 45 customer and cooperation brands shown in the supplied Deesheng
            corporate materials, spanning retail, food manufacturing and foodservice.
          </p>
        </div>
        <div className="partner-logo-grid" aria-label="Deesheng Food customer and cooperation brands">
          {partnerBrands.map((partner) => (
            <figure className="partner-logo-card" key={partner.name}>
              <img src={partner.image} alt={`${partner.name} cooperation brand logo`} width="800" height="400" loading="lazy" />
              <figcaption>{partner.name}</figcaption>
            </figure>
          ))}
        </div>
        <p className="partner-note">Logos are reproduced from Deesheng corporate materials for factual cooperation reference. All third-party trademarks remain the property of their respective owners.</p>
      </section>

      <section className="section shell contact-cta-section">
        <div className="cta-panel">
          <div>
            <p className="eyebrow eyebrow-light">Direct export contact</p>
            <h2>Ask our export team for products, samples or a quotation.</h2>
          </div>
          <div>
            <p>
              Send your product, pack size, destination market and estimated quantity.
              We will confirm the suitable product and document route.
            </p>
            <Link className="button button-light" href="/contact">
              Contact Deesheng Food <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

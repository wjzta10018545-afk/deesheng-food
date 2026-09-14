import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "../../components/JsonLd";

type Props = { params: Promise<{ market: string }> };

type Market = {
  slug: string;
  country: string;
  title: string;
  description: string;
  summary: string;
  buyerNote: string;
  buyerTypes: [string, string, string];
  routes: Array<{ title: string; copy: string; link: string }>;
  searchQuestions: Array<{ question: string; answer: string }>;
};

const markets: Market[] = [
  {
    slug: "mongolia",
    country: "Mongolia",
    title: "Korean Sauce Supplier for Mongolia | HALAL OEM & Wholesale",
    description:
      "Source Korean sauces, gochujang, chili powder, kimchi and frozen vegetables for Mongolia. B2B supply for importers, distributors, restaurants and private-label projects.",
    summary:
      "Deesheng Food supplies Korean sauces and related food products from Qingdao, China for qualified Mongolian importers, distributors, foodservice operators, retailers and private-label buyers.",
    buyerNote:
      "Start with the exact product, preferred pack, estimated cartons or container plan, sales channel and target purchase month. Freight, documents and local compliance are confirmed for the actual order route.",
    buyerTypes: [
      "Food importers and national or regional distributors",
      "Restaurant groups, central kitchens and foodservice suppliers",
      "Supermarkets, Asian-grocery chains and private-label brands",
    ],
    routes: [
      {
        title: "Bulk Korean sauces",
        copy: "Gochujang, fried chicken sauce, tteokbokki sauce, bibimbap sauce, Korean BBQ sauce and soup or stew sauces in retail and foodservice formats.",
        link: "/products/korean-sauces/",
      },
      {
        title: "Gochujang & Korean pastes",
        copy: "Review 500 g retail tubs and 14 kg foodservice cartons for distribution, restaurant supply and private-label projects.",
        link: "/product/gochujang/",
      },
      {
        title: "Korean chili powder",
        copy: "Coarse and fine red pepper powder for kimchi, foodservice and processing. State mesh, color, heat level, pack and expected quantity.",
        link: "/products/chili-seasonings/",
      },
      {
        title: "Cold-chain products",
        copy: "Kimchi and frozen vegetables can be reviewed when the importer has a suitable refrigerated or frozen distribution plan.",
        link: "/products/kimchi/",
      },
    ],
    searchQuestions: [
      {
        question: "How can a Mongolia importer source wholesale Korean sauce from China?",
        answer:
          "Send the company name, distribution channel, exact sauces, preferred packs, estimated quantity and destination. Deesheng Food will qualify the project before confirming samples, documents and quotation scope.",
      },
      {
        question: "Can Mongolia buyers request HALAL Korean sauces and current documents?",
        answer:
          "Yes. Qualified B2B buyers can request current documents and exact product-level scope for the selected formula and order. Local acceptance must be confirmed for the destination market.",
      },
      {
        question: "Is OEM or private-label Korean sauce available for Mongolia?",
        answer:
          "Yes, for suitable products and order quantities. Share the target channel, reference flavor, pack, estimated volume and intended purchase month so the factory can assess the right route.",
      },
      {
        question: "What information is needed for a bulk gochujang or foodservice sauce quote?",
        answer:
          "Specify the product, heat or flavor target, retail or foodservice pack, cartons or container plan, destination and whether a private label is required.",
      },
    ],
  },
  {
    slug: "singapore",
    country: "Singapore",
    title: "Korean Sauce Supplier for Singapore | HALAL OEM & Wholesale",
    description:
      "Source Korean sauces, gochujang, kimchi, chili powder and frozen vegetables for Singapore import, foodservice, retail and private-label projects.",
    summary:
      "Deesheng Food supplies Korean sauces and related food products from Qingdao, China for qualified Singapore importers, distributors, foodservice suppliers, central kitchens, retailers and private-label buyers.",
    buyerNote:
      "Tell us whether the project is for retail, wholesale, restaurants or a central kitchen, then add the product, pack, estimated quantity and purchase month. Product documents and destination requirements are checked per project.",
    buyerTypes: [
      "Food importers, distributors and wholesale suppliers",
      "Restaurant groups, caterers, central kitchens and foodservice buyers",
      "Supermarkets, specialty retailers and private-label brands",
    ],
    routes: [
      {
        title: "HALAL Korean sauces",
        copy: "Review gochujang, fried chicken, tteokbokki, bibimbap, Korean BBQ and soup sauces with current product-scope confirmation for qualified projects.",
        link: "/halal-korean-sauce-manufacturer/",
      },
      {
        title: "Foodservice packs",
        copy: "Shortlist 1 kg sauce pouches, selected 14 kg Korean paste cartons and dry seasoning formats for restaurants, catering and central kitchens.",
        link: "/products/korean-sauces/",
      },
      {
        title: "Retail & private label",
        copy: "Discuss stock formulas, flavor adjustment, export labels and selected retail packs for supermarket or specialty-channel launches.",
        link: "/oem-private-label/",
      },
      {
        title: "Kimchi & frozen range",
        copy: "Cabbage and radish kimchi plus frozen vegetables can be reviewed with the importer’s refrigerated or frozen supply-chain plan.",
        link: "/products/kimchi/",
      },
    ],
    searchQuestions: [
      {
        question: "How can a Singapore importer source wholesale Korean sauces from China?",
        answer:
          "Send the company, sales channel, exact products, preferred packs, estimated quantity and target purchase month. Deesheng Food will qualify the project before confirming samples, documents and quotation scope.",
      },
      {
        question: "Can Singapore buyers request HALAL documents for Korean sauces?",
        answer:
          "Yes. Current documents and exact product-level scope can be reviewed for qualified B2B projects. The importer remains responsible for confirming local acceptance, registration and label requirements.",
      },
      {
        question: "Which Korean sauces suit restaurant and central-kitchen supply?",
        answer:
          "Common starting points include fried chicken sauces, gochujang, tteokbokki sauce, bibimbap sauce, Korean BBQ sauce, japchae sauce and soup or stew bases. Final selection depends on menu, pack and volume.",
      },
      {
        question: "Is private-label Korean sauce available for Singapore retail?",
        answer:
          "Yes, for suitable products and order quantities. Share the target channel, reference taste, pack, estimated volume and launch timing for a practical OEM assessment.",
      },
    ],
  },
];

const getMarket = (slug: string) => markets.find((market) => market.slug === slug);

export function generateStaticParams() {
  return markets.map((market) => ({ market: market.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { market: slug } = await params;
  const market = getMarket(slug);
  if (!market) return {};
  return {
    title: { absolute: market.title },
    description: market.description,
    keywords: [
      `Korean sauce supplier ${market.country}`,
      `HALAL Korean sauce ${market.country}`,
      `gochujang wholesale ${market.country}`,
      `Korean sauce OEM ${market.country}`,
      `Korean fried chicken sauce supplier ${market.country}`,
      `Korean chili powder wholesale ${market.country}`,
    ],
    alternates: { canonical: `/markets/${market.slug}/` },
    openGraph: {
      type: "website",
      title: market.title,
      description: market.description,
      url: `https://deesheng.food/markets/${market.slug}/`,
      images: [{ url: "/media/fried-chicken-sauces.webp", alt: `Deesheng Food supply for ${market.country} B2B buyers` }],
    },
    twitter: { card: "summary_large_image", images: ["/media/fried-chicken-sauces.webp"] },
  };
}

export default async function MarketPage({ params }: Props) {
  const { market: slug } = await params;
  const market = getMarket(slug);
  if (!market) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://deesheng.food/markets/${market.slug}/#webpage`,
        url: `https://deesheng.food/markets/${market.slug}/`,
        name: market.title,
        description: market.description,
        about: { "@id": "https://deesheng.food/#organization" },
      },
      {
        "@type": "Service",
        name: `Korean food B2B supply for ${market.country}`,
        provider: { "@id": "https://deesheng.food/#organization" },
        areaServed: { "@type": "Country", name: market.country },
        audience: market.buyerTypes.map((name) => ({ "@type": "BusinessAudience", name })),
        serviceType: ["B2B food export", "Wholesale supply", "Foodservice supply", "OEM and private label"],
      },
      {
        "@type": "FAQPage",
        mainEntity: market.searchQuestions.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="inner-hero shell">
        <div>
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><b>{market.country}</b></nav>
          <p className="eyebrow">China manufacturer · B2B export · OEM · wholesale</p>
          <h1>Korean food supply for {market.country} buyers.</h1>
        </div>
        <div className="inner-hero-aside">
          <p>{market.summary}</p>
          <Link className="button button-primary" href={`/contact/?product=Korean%20food%20supply%20for%20${market.country}`}>Request a B2B quotation</Link>
        </div>
      </section>

      <section className="note-band"><div className="shell"><span>Buyer brief</span><p>{market.buyerNote}</p></div></section>

      <section className="section shell">
        <div className="capability-grid">
          <div><p className="eyebrow">Best-fit buyers</p><h2>Built for commercial orders, not single units.</h2></div>
          <div className="capability-cards">
            {market.buyerTypes.map((buyer, index) => <article key={buyer}><span>{String(index + 1).padStart(2, "0")}</span><h3>{buyer}</h3><p>Share your route to market and expected buying volume so Kevin Wang can qualify the right product and pack.</p></article>)}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="shell">
          <div className="section-heading compact-heading"><p className="eyebrow">High-intent product routes</p><h2>Start with what your customers or kitchens will actually use.</h2><p>These are practical starting points for bulk, wholesale, foodservice and private-label discussions.</p></div>
          <div className="market-route-grid">
            {market.routes.map((route) => <Link href={route.link} key={route.title}><span>B2B supply</span><h3>{route.title}</h3><p>{route.copy}</p><b>Review products →</b></Link>)}
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="faq-layout">
          <div><p className="eyebrow">Procurement FAQ</p><h2>Answers for {market.country} importers.</h2><p>Useful starting answers for buyers searching by product, supplier type, pack, order size and destination.</p></div>
          <div className="faq-list">{market.searchQuestions.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div>
        </div>
      </section>

      <section className="section shell">
        <div className="cta-panel">
          <div><p className="eyebrow eyebrow-light">Quote qualification</p><h2>Company, product, pack, quantity and purchase month.</h2></div>
          <div><p>Deesheng Food does not claim destination-market approval on this page. The buyer and relevant local professionals or authorities must confirm import, label and certification acceptance.</p><Link className="button button-light" href={`/contact/?product=Korean%20food%20supply%20for%20${market.country}`}>Send the buyer brief ↗</Link></div>
        </div>
      </section>
    </main>
  );
}

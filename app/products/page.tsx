import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../components/JsonLd";
import { catalogCategories } from "../data/catalog";
import { ProductExplorer } from "./ProductExplorer";

export const metadata: Metadata = {
  title: "HALAL Korean Sauce & Food Product Catalogue",
  description:
    "Search Deesheng Food's four active export ranges: Korean sauces and gochujang, kimchi, chili powder and dry seasonings, and frozen vegetables.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Deesheng Food Export Product Categories",
    itemListElement: catalogCategories.map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: category.name,
      url: `https://deesheng.food/products/${category.slug}`,
    })),
  };

  return (
    <main>
      <JsonLd data={itemList} />
      <section className="inner-hero shell">
        <div>
          <p className="eyebrow">2026 export catalogue · HALAL certificate-backed range</p>
          <h1>Find the right product for your market.</h1>
        </div>
        <div className="inner-hero-aside">
          <p>Explore our complete B2B range, compare pack formats and open detailed product pages for priority export items.</p>
          <a className="text-link" href="/downloads/Deesheng-Food-Product-Catalogue-2026.pdf" download>
            Download English catalogue <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section className="shell category-jump-grid" aria-label="Product families">
        {catalogCategories.map((category) => (
          <Link href={`/products/${category.slug}`} className="category-jump" key={category.slug}>
            <img src={category.image} alt={category.imageAlt} width="1200" height="537" />
            <div><span>{category.eyebrow}</span><h2>{category.name}</h2><p>{category.items.length} listed products and variants</p></div>
          </Link>
        ))}
      </section>

      <section className="section shell">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Search the range</p>
          <h2>Complete export product index</h2>
          <p>Standard packing is shown for selection. Final specification, carton data, pricing and availability are confirmed with your inquiry.</p>
        </div>
        <ProductExplorer />
      </section>
    </main>
  );
}

import Link from "next/link";
import { catalogCategories } from "../data/catalog";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link className="wordmark" href="/" aria-label="Deesheng Food home">
          <span className="brand-lockup" aria-hidden="true">
            <img className="brand-logo" src="/media/deesheng-ds-logo.png" alt="" width="118" height="61" />
            <b>DEESHENG FOOD</b>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <div className="nav-products-menu">
            <Link className="nav-products-trigger" href="/products">Products <span aria-hidden="true">⌄</span></Link>
            <div className="nav-products-panel" aria-label="Product ranges">
              <div className="nav-products-heading"><span>Current portfolio</span><b>Four product lines</b></div>
              {catalogCategories.map((category, index) => (
                <Link href={`/products/${category.slug}`} key={category.slug}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><strong>{category.name}</strong><small>{category.items.length} products & variants</small></div>
                  <b aria-hidden="true">↗</b>
                </Link>
              ))}
              <Link className="nav-products-all" href="/products">Search all active products <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <Link href="/halal-korean-sauce-manufacturer">HALAL Sauces</Link>
          <Link href="/oem-private-label">OEM / Private Label</Link>
          <Link href="/quality-certifications">Quality</Link>
          <Link href="/resources">Buyer Resources</Link>
          <Link href="/about">About</Link>
        </nav>
        <Link className="nav-cta" href="/contact">Get a quote <span aria-hidden="true">↗</span></Link>
        <details className="mobile-menu">
          <summary aria-label="Open menu"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <Link className="mobile-products-main" href="/products">Products</Link>
            <div className="mobile-product-links">
              {catalogCategories.map((category) => (
                <Link href={`/products/${category.slug}`} key={category.slug}>{category.name}<span aria-hidden="true">→</span></Link>
              ))}
            </div>
            <Link href="/halal-korean-sauce-manufacturer">HALAL Sauces</Link>
            <Link href="/oem-private-label">OEM / Private Label</Link>
            <Link href="/quality-certifications">Quality</Link>
            <Link href="/resources">Buyer Resources</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Get a quote</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { allCatalogItems, catalogCategories } from "../data/catalog";

export function ProductExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return allCatalogItems.filter((item) => {
      const inCategory = category === "all" || item.categorySlug === category;
      const inSearch =
        !normalized ||
        `${item.name} ${item.group} ${item.categoryName} ${item.packing}`
          .toLowerCase()
          .includes(normalized);
      return inCategory && inSearch;
    });
  }, [query, category]);

  return (
    <section className="product-explorer" aria-label="Product catalog search">
      <div className="explorer-controls">
        <label className="search-field">
          <span>Search products</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try gochujang, fried chicken, kimchi…"
          />
        </label>
        <label className="select-field">
          <span>Product family</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">All product families</option>
            {catalogCategories.map((item) => (
              <option key={item.slug} value={item.slug}>{item.name}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="results-bar">
        <b>{results.length}</b> export products and variants
        {(query || category !== "all") && (
          <button type="button" onClick={() => { setQuery(""); setCategory("all"); }}>
            Clear filters
          </button>
        )}
      </div>
      {results.length ? (
        <div className="product-table-wrap">
          <table className="product-table">
            <thead><tr><th>Product</th><th>Family</th><th>Standard packing</th><th>Storage</th><th /></tr></thead>
            <tbody>
              {results.map((item) => (
                <tr key={`${item.categorySlug}-${item.name}`}>
                  <td><strong>{item.name}</strong><span>{item.group}</span></td>
                  <td><Link href={`/products/${item.categorySlug}`}>{item.categoryName}</Link></td>
                  <td>{item.packing}</td>
                  <td>{item.storage}<span>{item.shelfLife}</span></td>
                  <td>{item.detailSlug ? <Link className="row-link" href={`/product/${item.detailSlug}`} aria-label={`View ${item.name}`}>→</Link> : <Link className="row-link" href="/contact" aria-label={`Ask about ${item.name}`}>↗</Link>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state"><h2>No exact match yet.</h2><p>Try a broader term or send us the product you want to source.</p><Link className="button button-primary" href="/contact">Ask our export team</Link></div>
      )}
    </section>
  );
}

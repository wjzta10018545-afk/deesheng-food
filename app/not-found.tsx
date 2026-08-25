import Link from "next/link";

export default function NotFound() {
  return <main className="not-found shell"><span>404</span><h1>This page is not in the export catalogue.</h1><p>Search the complete product range or tell us what you are trying to source.</p><div className="button-row"><Link className="button button-primary" href="/products">Browse products</Link><Link className="button button-ghost" href="/contact">Contact export sales</Link></div></main>;
}

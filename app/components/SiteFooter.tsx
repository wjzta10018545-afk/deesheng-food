import Link from "next/link";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="wordmark wordmark-light" href="/" aria-label="Deesheng Food home">
            <span className="brand-lockup" aria-hidden="true">
              <img className="brand-logo" src="/media/deesheng-ds-logo.png" alt="" width="76" height="40" />
              <b>DEESHENG FOOD</b>
            </span>
          </Link>
          <p>Export-ready Korean food manufacturing for importers, distributors, foodservice operators and private-label brands.</p>
        </div>
        <div><h2>Products</h2><Link href="/products/korean-sauces">Korean sauces & gochujang</Link><Link href="/products/kimchi">Korean kimchi</Link><Link href="/products/chili-seasonings">Chili powder & seasonings</Link><Link href="/products/frozen-vegetables">Frozen vegetables</Link></div>
        <div><h2>Company</h2><Link href="/halal-korean-sauce-manufacturer">HALAL sauce manufacturer</Link><Link href="/oem-private-label">OEM / Private Label</Link><Link href="/quality-certifications">Quality & certifications</Link><Link href="/resources">Buyer resources</Link><Link href="/about">About us</Link><Link href="/contact">Contact</Link></div>
        <div className="footer-contact">
          <h2>Export sales</h2>
          <a href="https://wa.me/8615621089573" target="_blank" rel="noreferrer">WhatsApp<br /><b>+86 156 2108 9573</b></a>
          <a href="mailto:info@deesheng.food">info@deesheng.food</a>
          <span>Qingdao, Shandong, China</span>
          <div className="footer-social-block">
            <span className="footer-social-label">Follow Deesheng Food</span>
            <SocialLinks />
          </div>
        </div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Qingdao Deesheng Hengxin Food Co., Ltd.</span><span>B2B export inquiries only</span></div>
    </footer>
  );
}

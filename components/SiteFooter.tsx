import Link from "next/link";
import { site } from "@/lib/site";

const footerLinks = [
  ["For Men", "/programs/brotherhood/"], ["Reach Back", "/programs/mentorship/"],
  ["For Boys", "/programs/"], ["Impact", "/impact/"], ["About", "/about/"],
  ["Get Support", "/get-help/"], ["Stories", "/stories/"], ["Events", "/events/"],
  ["Safeguarding", "/safeguarding/"], ["Reports", "/reports/"], ["Privacy", "/privacy/"],
  ["Contact", "/contact/"],
];

export function SiteFooter() {
  return (
    <footer>
      <div className="shell footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark">FR</span>
            <span><strong>FutureRise</strong><small>FOUNDATION</small></span>
          </Link>
          <p>{site.tagline}</p>
        </div>
        <div className="footer-links" aria-label="Footer navigation">
          {footerLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </div>
        <div>
          <strong>Talk to FutureRise</strong><br/>
          <a href={`mailto:${site.email}`}>{site.email}</a><br/>
          <span>{site.location}</span>
        </div>
      </div>
      <div className="shell copyright">© 2026 FutureRise Foundation. Supporting men first, then creating safeguarded pathways for men to strengthen boys coming behind them.</div>
    </footer>
  );
}

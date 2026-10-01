import Link from "next/link";
import { actionNav, primaryNav } from "@/lib/site";

export function SiteHeader() {
  return (
    <>
      <div className="announcement">🌈 Building safer childhoods and stronger futures across Kenya.</div>
      <header className="site-header shell">
        <Link className="brand" href="/" aria-label="FutureRise Foundation home">
          <span className="brand-mark">FR</span>
          <span><strong>FutureRise</strong><small>FOUNDATION</small></span>
        </Link>
        <nav aria-label="Primary navigation">
          {primaryNav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="header-actions">
          {actionNav.slice(0,2).map((item) => <Link className="header-action-link" key={item.href} href={item.href}>{item.label}</Link>)}
          <Link className="button button-small" href="/donate/">Donate</Link>
        </div>
      </header>
    </>
  );
}

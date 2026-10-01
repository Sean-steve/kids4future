import Link from "next/link";

const sections = [
  ["Overview", "/admin/"],
  ["Inquiries", "/admin/inquiries/"],
  ["Content", "/admin/content/"],
  ["Finance", "/admin/finance/"],
  ["Audit", "/admin/audit/"],
] as const;

export function AdminSectionNav() {
  return <nav className="admin-section-nav" aria-label="Administration sections">
    {sections.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
  </nav>;
}

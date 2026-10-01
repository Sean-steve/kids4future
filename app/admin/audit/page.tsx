import { AuditViewer } from "@/components/admin/AuditViewer";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Admin — Audit" };

export default function AdminAuditPage() {
  return <main>
    <PageHero eyebrow="Administrator only" title="Operational audit trail." intro="Inspect privacy-minimized change history for content, inquiry, role and finance operations without exposing full sensitive payloads." tone="coral" />
    <section className="content-section shell"><AuditViewer /></section>
  </main>;
}

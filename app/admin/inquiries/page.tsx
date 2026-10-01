import { InquiryManager } from "@/components/admin/InquiryManager";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Admin — Inquiries" };

export default function AdminInquiriesPage() {
  return <main>
    <PageHero eyebrow="Staff only" title="Inquiry operations." intro="Review website contact, volunteer and partnership submissions without exposing public write access to the underlying database." tone="sky" />
    <section className="content-section shell"><InquiryManager /></section>
  </main>;
}

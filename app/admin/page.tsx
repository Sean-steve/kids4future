import { AdminConsole } from "@/components/AdminConsole";
import { AdminSectionNav } from "@/components/admin/AdminSectionNav";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Admin" };

export default function AdminPage() {
  return <main>
    <PageHero eyebrow="Staff only" title="FutureRise administration." intro="Manage public content, enquiries and finance workflows through authenticated, role-controlled access. Database RLS—not page visibility—is the security boundary." tone="berry" />
    <section className="content-section shell">
      <AdminSectionNav />
      <AdminConsole />
    </section>
  </main>;
}

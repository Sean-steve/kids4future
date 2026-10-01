import { StaffManager } from "@/components/admin/StaffManager";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Admin — Staff Access" };

export default function AdminUsersPage() {
  return <main>
    <PageHero eyebrow="Administrator only" title="Staff access & roles." intro="Invite FutureRise staff, assign least-privilege roles, and deactivate access through audited server-side administration." tone="berry" />
    <section className="content-section shell"><StaffManager /></section>
  </main>;
}

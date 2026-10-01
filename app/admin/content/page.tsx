import { ContentManager } from "@/components/admin/ContentManager";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Admin — Content" };

export default function AdminContentPage() {
  return <main>
    <PageHero eyebrow="Staff only" title="Content governance." intro="Operate FutureRise stories, events, reports and campaigns through role-controlled workflows, with safeguarding enforced in the database rather than by convention." tone="sun" />
    <section className="content-section shell"><ContentManager /></section>
  </main>;
}

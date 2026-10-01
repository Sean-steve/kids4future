import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PublishedContent } from "@/components/PublishedContent";

export const metadata = { title: "Events" };

export default function EventsPage(){return <main>
  <PageHero eyebrow="Events" title="Gather around action, not spectacle." intro="FutureRise events connect volunteers, partners, mentors and supporters around practical program needs and learning." tone="coral" />
  <section className="content-section shell">
    <div className="section-heading"><span className="section-label">Upcoming & published</span><h2>Verified FutureRise events.</h2><p>The legacy website’s 2024 event dates have been retired. Only CMS records that have completed publication appear below.</p></div>
    <PublishedContent kind="events"/>
  </section>
  <section className="content-section soft"><div className="shell content-grid three"><article className="info-card sun"><h3>Community days</h3><p>Structured activities around education, mentorship, family support and community awareness.</p></article><article className="info-card sky"><h3>Skills & career events</h3><p>Employer exposure, apprenticeships, practical demonstrations, digital skills and career pathways.</p></article><article className="info-card leaf"><h3>Partner sessions</h3><p>Safeguarding briefings, program learning, fundraising accountability and collaborative planning.</p></article></div></section>
  <section className="shell content-section"><div className="cta-band"><div><h2>Want to host or support an event?</h2><p>Companies, schools, professionals and community groups can propose an event through the partnership pathway.</p></div><Link className="button button-light" href="/partner/">Partner with FutureRise</Link></div></section>
</main>}

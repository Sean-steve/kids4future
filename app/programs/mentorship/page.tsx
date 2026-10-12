import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "FutureRise Mentors" };

export default function MentorshipPage(){return <main>
  <PageHero eyebrow="FutureRise Mentors" title="Rise—and reach back." intro="FutureRise Mentors connects prepared adults with boys and young men through screened, trained and supervised roles. It is the bridge between supporting today's men and strengthening tomorrow's." tone="mint" />

  <section className="content-section shell">
    <div className="section-heading"><span className="section-label">The intergenerational loop</span><h2>Supported man → stronger man → prepared mentor → stronger boy.</h2><p>The loop is an opportunity, never an obligation. A person can receive support from FutureRise without ever volunteering, mentoring or giving anything back.</p></div>
    <div className="content-grid">
      <article className="info-card sun"><span className="eyebrow">Receive support</span><h2>No debt attached.</h2><p>Support is given because a person matters—not because FutureRise expects future service, loyalty or disclosure.</p></article>
      <article className="info-card sky"><span className="eyebrow">Become ready</span><h2>Stability before responsibility.</h2><p>Lived experience can make someone empathetic, but it does not automatically make them ready to mentor a child or young person.</p></article>
      <article className="info-card berry"><span className="eyebrow">Prepare</span><h2>Screen, train and supervise.</h2><p>Approved mentors learn safeguarding, boundaries, listening, reporting routes, confidentiality and role limitations.</p></article>
      <article className="info-card leaf"><span className="eyebrow">Reach back</span><h2>Be consistently present.</h2><p>Mentorship focuses on reliable relationships, positive identity, life skills, education, work exposure, healthy choices and hope.</p></article>
    </div>
  </section>

  <section className="content-section soft"><div className="shell">
    <div className="section-heading"><span className="section-label">Who can contribute</span><h2>More than one kind of man can be a positive example.</h2><p>FutureRise can draw from fathers, professionals, tradespeople, entrepreneurs, educators, coaches, creatives, community leaders and suitable men with lived experience.</p></div>
    <div className="content-grid three">
      <article className="info-card"><h3>Life mentorship</h3><p>Identity, responsibility, emotional literacy, relationships, choices, discipline and navigating adulthood.</p></article>
      <article className="info-card"><h3>Skills mentorship</h3><p>Trades, technology, entrepreneurship, financial capability, career exposure and workplace readiness.</p></article>
      <article className="info-card"><h3>Community mentorship</h3><p>Sport, creativity, service, positive peer networks and consistent adult presence through approved group activities.</p></article>
    </div>
  </div></section>

  <section className="content-section shell">
    <div className="section-heading"><span className="section-label">Mentor pathway</span><h2>Interest → screen → train → match → supervise → review.</h2></div>
    <div className="timeline">
      <article><span>01</span><div><h3>Express interest</h3><p>Tell FutureRise how you want to contribute and what experience you bring.</p></div></article>
      <article><span>02</span><div><h3>Suitability screening</h3><p>Identity, references, background and role-specific checks are completed before child-facing access.</p></div></article>
      <article><span>03</span><div><h3>Training</h3><p>Safeguarding, boundaries, listening, confidentiality, reporting, referral and expectations come before placement.</p></div></article>
      <article><span>04</span><div><h3>Approved placement</h3><p>Mentors work only through the role and format for which they have been approved.</p></div></article>
      <article><span>05</span><div><h3>Supervision & review</h3><p>FutureRise maintains oversight, feedback, escalation routes and the ability to pause or end placements when necessary.</p></div></article>
    </div>
  </section>

  <section className="content-section shell"><div className="danger-note"><strong>Safeguarding first:</strong> private unsupervised access, informal off-program relationships, personal publishing of child information and using mentorship as unqualified counselling are not acceptable FutureRise practices.</div></section>

  <section className="content-section soft"><div className="shell"><div className="cta-band"><div><h2>Ready to explore reaching back?</h2><p>Registering interest starts a screening conversation. It does not approve anyone for access to children or young people.</p></div><Link className="button button-light" href="/volunteer/">Express mentor interest</Link></div></div></section>
</main>}

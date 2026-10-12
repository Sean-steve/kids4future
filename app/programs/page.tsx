import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "For Boys" };

export default function ProgramsPage(){
  return <main>
    <PageHero eyebrow="For boys" title="The boys come from the men." intro="FutureRise starts by supporting men. The boys' work grows from the men who are ready to reach back, supported by structured programs around mentorship, protection, skills and family stability." tone="mint" />

    <section className="content-section shell">
      <div className="section-heading">
        <span className="section-label">Where boys fit</span>
        <h2>Not a separate starting point. The next generation.</h2>
        <p>The boys&apos; work is the downstream impact of stronger men choosing to become present, responsible and prepared role models.</p>
      </div>
      <div className="content-grid">
        <article className="info-card sun"><span className="eyebrow">Flagship impact arm</span><h2>Kids4Future</h2><p>Protection, education, mentorship and long-term development for vulnerable boys and children.</p><Link className="text-link" href="/programs/kids4future/">Explore Kids4Future →</Link></article>
        <article className="info-card sky"><span className="eyebrow">Adolescence</span><h2>Rise Boys</h2><p>Mentorship, identity, wellbeing, relationships, life skills and preparation for healthy adulthood.</p><Link className="text-link" href="/programs/rise-boys/">Explore Rise Boys →</Link></article>
        <article className="info-card berry"><span className="eyebrow">Capability</span><h2>Future Skills</h2><p>Digital skills, TVET, apprenticeships, entrepreneurship and work-readiness pathways.</p><Link className="text-link" href="/programs/future-skills/">Explore Future Skills →</Link></article>
        <article className="info-card leaf"><span className="eyebrow">Environment</span><h2>Family Forward</h2><p>Caregiver and family-strengthening support around boys so development is not isolated from home and community.</p><Link className="text-link" href="/programs/family-forward/">Explore Family Forward →</Link></article>
      </div>
    </section>

    <section className="content-section soft"><div className="shell">
      <div className="section-heading"><span className="section-label">The bridge</span><h2>Men do not move directly from receiving help to mentoring boys.</h2><p>Reaching back requires willingness, stability, screening, safeguarding training, role preparation and supervision.</p></div>
      <div className="cta-band"><div><h2>Support men first.</h2><p>FutureRise Brotherhood is the primary entry point. Mentorship is the bridge. Boys are the next-generation impact.</p></div><Link className="button button-light" href="/programs/brotherhood/">Start with Brotherhood</Link></div>
    </div></section>
  </main>
}

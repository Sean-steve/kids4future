import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Impact" };

const stages = [
  ["01", "Protect", "Was immediate safety addressed and were urgent referrals completed?"],
  ["02", "Stabilize", "Does the young person have a documented support plan and continuity of essential services?"],
  ["03", "Reconnect", "Where appropriate, is family or community reintegration safe and stable?"],
  ["04", "Develop", "Is the young person progressing in education, wellbeing, mentorship or skills?"],
  ["05", "Thrive", "Are gains sustained into training, work, family stability and independent adulthood?"],
];

export default function ImpactPage(){return <main>
  <PageHero eyebrow="Impact" title="Measure the journey, not the photo opportunity." intro="FutureRise will report verified outputs and outcomes while protecting the privacy and dignity of every child and family." tone="sky" />
  <section className="content-section shell">
    <div className="section-heading"><span className="section-label">Public dashboard</span><h2>Numbers will appear when they are verified.</h2><p>Until operational data is audited, FutureRise will not publish invented beneficiary counts, fundraising totals or success rates.</p></div>
    <div className="stat-grid">
      {['Children supported','Safe reintegrations','Education continuations','Youth into skills/work'].map((label)=><article className="stat-card placeholder-stat" key={label}><strong>Verification pending</strong><span>{label}</span></article>)}
    </div>
  </section>
  <section className="content-section soft"><div className="shell"><div className="section-heading"><span className="section-label">Measurement model</span><h2>Five stages of progress.</h2></div><div className="timeline">{stages.map(([num,title,text])=><article key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
  <section className="content-section shell"><div className="content-grid three"><article className="info-card sun"><h3>Outputs</h3><p>Activities completed: referrals, school support, mentoring sessions, training placements and family follow-up.</p></article><article className="info-card sky"><h3>Outcomes</h3><p>Meaningful changes: safety, education retention, stable reintegration, skills progression and transition to opportunity.</p></article><article className="info-card leaf"><h3>Evidence</h3><p>Aggregated operational records, reconciled donations, partner confirmations and periodic review—not public exposure of child case files.</p></article></div></section>
  <section className="shell content-section"><div className="cta-band"><div><h2>Transparency includes what we do not publish.</h2><p>Individual protection histories, exact child locations, medical details and identifying case information remain outside the public impact dashboard.</p></div><Link className="button button-light" href="/reports/">Reports & financials</Link></div></section>
</main>}

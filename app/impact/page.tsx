import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Impact" };

const stages = [
  ["01", "Men reached", "Are men finding and returning to trusted spaces for honest conversation and support?"],
  ["02", "Men supported", "Are men strengthening support networks, seeking help earlier and completing appropriate referrals?"],
  ["03", "Men prepared", "Are suitable volunteers completing screening, safeguarding and mentor preparation before serving?"],
  ["04", "Boys reached", "Are prepared mentors creating consistent, safeguarded relationships and development opportunities for boys?"],
  ["05", "Generations strengthened", "Are boys progressing in wellbeing, education, skills and transition while mentors remain supported and accountable?"],
];

export default function ImpactPage(){return <main>
  <PageHero eyebrow="Impact" title="Measure whether stronger men are building stronger generations." intro="FutureRise measures the full chain: men reached, men supported, men prepared to serve, boys reached and outcomes sustained—without exposing private stories to prove impact." tone="sky" />
  <section className="content-section shell">
    <div className="section-heading"><span className="section-label">Public dashboard</span><h2>Numbers will appear when they are verified.</h2><p>Until operational data is audited, FutureRise will not publish invented beneficiary counts, fundraising totals or success rates.</p></div>
    <div className="stat-grid">
      {["Men engaged","Professional referrals completed","Mentors prepared","Boys supported"].map((label)=><article className="stat-card placeholder-stat" key={label}><strong>Verification pending</strong><span>{label}</span></article>)}
    </div>
  </section>
  <section className="content-section soft"><div className="shell"><div className="section-heading"><span className="section-label">Measurement model</span><h2>Follow the same direction as the program.</h2></div><div className="timeline">{stages.map(([num,title,text])=><article key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
  <section className="content-section shell"><div className="content-grid three">
    <article className="info-card berry"><h3>Men</h3><p>Participation, continuity, support-network strength, earlier help-seeking and appropriate referral completion.</p></article>
    <article className="info-card sky"><h3>Reach Back</h3><p>Screening, training, safeguarding compliance, supervision and mentor continuity.</p></article>
    <article className="info-card sun"><h3>Boys</h3><p>Mentorship continuity, wellbeing, education, skills, opportunity and healthy transition indicators.</p></article>
  </div></section>
  <section className="shell content-section"><div className="cta-band"><div><h2>Impact never requires public exposure.</h2><p>Private mental-health information, child protection histories, exact locations, medical details and identifying case information remain outside the public dashboard.</p></div><Link className="button button-light" href="/reports/">Reports & financials</Link></div></section>
</main>}

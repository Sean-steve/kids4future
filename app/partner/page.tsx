import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Partner" };

const partnerTypes = [
  ["Employers & businesses", "Apprenticeships, first-work opportunities, equipment, sponsorship and employee skills volunteering."],
  ["Schools & training providers", "Education continuity, scholarships, TVET, digital learning and certification pathways."],
  ["Professionals & service providers", "Approved referral capacity in health, psychosocial support, legal aid, finance and safeguarding."],
  ["Community organizations", "Local referrals, family-strengthening networks, outreach and trusted community context."],
];

export default function PartnerPage(){return <main>
  <PageHero eyebrow="Partner" title="Build pathways that one organization cannot build alone." intro="FutureRise partnerships connect protection, family support, education, skills and opportunity into a stronger ecosystem around young people." tone="sky" />
  <section className="content-section shell"><div className="content-grid">{partnerTypes.map(([title,text],i)=><article className="info-card" key={title}><span className="eyebrow">0{i+1}</span><h2>{title}</h2><p>{text}</p></article>)}</div></section>
  <section className="content-section soft"><div className="shell"><div className="section-heading"><span className="section-label">Partnership standard</span><h2>Useful, accountable and safe.</h2><p>Partnerships should solve a defined program need and have clear responsibilities, safeguarding expectations, reporting and review.</p></div><div className="content-grid three"><article className="info-card sun"><h3>Defined contribution</h3><p>What the partner provides, to which program, for what period and with what constraints.</p></article><article className="info-card leaf"><h3>Due diligence</h3><p>Appropriate verification before access to beneficiaries, sensitive data, funds or formal representation of FutureRise.</p></article><article className="info-card berry"><h3>Evidence & review</h3><p>Outputs, outcomes, financial treatment and renewal decisions are documented instead of assumed.</p></article></div></div></section>
  <section className="shell content-section"><div className="cta-band"><div><h2>Bring a capability FutureRise can build around.</h2><p>Tell us what your organization can contribute and which pathway you want to strengthen.</p></div><Link className="button button-light" href="/contact/">Start a partnership conversation</Link></div></section>
</main>}

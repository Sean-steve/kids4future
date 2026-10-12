import { PageHero } from "@/components/PageHero";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata = { title: "Get Involved" };

const roles = [
  ["Mentorship", "A screened, trained and supervised pathway for suitable adults who want to support boys and young men through approved FutureRise roles."],
  ["Brotherhood & peer support", "Facilitated men's wellbeing and peer-support roles with clear boundaries, training, escalation rules and professional-referral pathways."],
  ["Skills & career", "Digital skills, trades, career exposure, entrepreneurship, financial capability and employability support."],
  ["Professional services", "Approved mental-health, legal, health, safeguarding, communications, finance or operational expertise."],
  ["Events & logistics", "Event support, fundraising logistics, materials, transport coordination and administration."],
];

export default function VolunteerPage(){return <main>
  <PageHero eyebrow="Get involved" title="Stand with someone. Strengthen what comes next." intro="FutureRise involvement is role-based and safeguarded. Lived experience can be valuable, but support received from FutureRise never creates an obligation or automatic qualification to mentor others." tone="sun" />
  <section className="content-section shell"><div className="content-grid">{roles.map(([title,text],i)=><article className="info-card" key={title}><span className="eyebrow">{String(i+1).padStart(2,"0")}</span><h2>{title}</h2><p>{text}</p></article>)}</div></section>
  <section className="content-section soft"><div className="shell">
    <div className="section-heading"><span className="section-label">Mentor journey</span><h2>Interest → screen → train → match → supervise.</h2><p>Reaching back is a structured service pathway, not informal access to children.</p></div>
    <div className="timeline">
      <article><span>01</span><div><h3>Choose freely</h3><p>A man may receive support and never become a mentor. Giving back is an opportunity, not a debt.</p></div></article>
      <article><span>02</span><div><h3>Application & screening</h3><p>Identity, references, suitability and role-specific checks are completed before approval.</p></div></article>
      <article><span>03</span><div><h3>Safeguarding & role training</h3><p>Mentors learn boundaries, listening, confidentiality, reporting routes and when to escalate or refer.</p></div></article>
      <article><span>04</span><div><h3>Placement & supervision</h3><p>Mentorship happens only in approved formats with clear oversight, review and accountability.</p></div></article>
    </div>
  </div></section>
  <section className="content-section shell"><div className="danger-note"><strong>Non-negotiable:</strong> volunteers and mentors may not privately contact children, publish child information or imagery, transport children independently, create unsupervised relationships outside approved roles, or present themselves as counsellors without the required professional qualification.</div></section>
  <section className="content-section soft"><div className="shell form-shell"><div className="section-heading"><span className="section-label">Express interest</span><h2>Tell us how you want to contribute.</h2><p>This records initial interest only. It does not approve anyone for a mentorship, peer-support or child-facing role.</p></div><InquiryForm kind="volunteer"/></div></section>
</main>}

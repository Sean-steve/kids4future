import { PageHero } from "@/components/PageHero";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata = { title: "Get Involved" };

const roles = [
  ["Brotherhood & peer support", "Help create reliable spaces for men through approved, trained peer-support and community roles with clear referral boundaries."],
  ["Reach Back mentorship", "A screened, trained and supervised pathway for suitable men who want to support boys and young men."],
  ["Skills & career", "Bring trades, technology, career exposure, entrepreneurship, financial capability or employability experience into approved mentorship activities."],
  ["Professional services", "Contribute qualified mental-health, legal, health, safeguarding, communications, finance or operational expertise."],
];

export default function VolunteerPage(){return <main>
  <PageHero eyebrow="Get involved" title="Stand with men. Then help men reach back." intro="FutureRise involvement follows the same model as the organisation: strengthen the brotherhood first, then prepare suitable men who freely choose to support boys." tone="sun" />
  <section className="content-section shell"><div className="content-grid">{roles.map(([title,text],i)=><article className="info-card" key={title}><span className="eyebrow">{String(i+1).padStart(2,"0")}</span><h2>{title}</h2><p>{text}</p></article>)}</div></section>
  <section className="content-section soft"><div className="shell">
    <div className="section-heading"><span className="section-label">Reach Back pathway</span><h2>Choose → screen → train → place → supervise.</h2><p>A man does not become a mentor simply because he has received support or has a compelling life story.</p></div>
    <div className="timeline">
      <article><span>01</span><div><h3>Choose freely</h3><p>Receiving FutureRise support creates no debt. Reaching back is always voluntary.</p></div></article>
      <article><span>02</span><div><h3>Application & screening</h3><p>Identity, references, suitability and role-specific checks are completed before approval.</p></div></article>
      <article><span>03</span><div><h3>Safeguarding & role training</h3><p>Mentors learn boundaries, listening, confidentiality, reporting routes and when to escalate or refer.</p></div></article>
      <article><span>04</span><div><h3>Placement & supervision</h3><p>Mentorship happens only in approved formats with clear oversight, review and accountability.</p></div></article>
    </div>
  </div></section>
  <section className="content-section shell"><div className="danger-note"><strong>Non-negotiable:</strong> volunteers and mentors may not privately contact children, publish child information or imagery, transport children independently, create unsupervised relationships outside approved roles, or present themselves as counsellors without the required professional qualification.</div></section>
  <section className="content-section soft"><div className="shell form-shell"><div className="section-heading"><span className="section-label">Express interest</span><h2>Tell us where you want to stand.</h2><p>This records initial interest only. It does not approve anyone for a peer-support, mentorship or child-facing role.</p></div><InquiryForm kind="volunteer"/></div></section>
</main>}

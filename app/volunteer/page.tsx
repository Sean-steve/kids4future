import { PageHero } from "@/components/PageHero";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata = { title: "Volunteer" };

const roles = [
  ["Mentorship support", "Structured, supervised mentorship activities after vetting, training and role approval."],
  ["Skills & career", "Digital skills, trades, career exposure, entrepreneurship and employability support."],
  ["Professional services", "Approved legal, health, psychosocial, communications, finance or operational expertise."],
  ["Events & logistics", "Event support, fundraising logistics, materials, transport coordination and administration."],
];

export default function VolunteerPage(){return <main>
  <PageHero eyebrow="Volunteer" title="Give time with structure, boundaries and purpose." intro="FutureRise volunteering is role-based and safeguarded. Supporting children is not the same as gaining unrestricted access to them." tone="sun" />
  <section className="content-section shell"><div className="content-grid">{roles.map(([title,text],i)=><article className="info-card" key={title}><span className="eyebrow">0{i+1}</span><h2>{title}</h2><p>{text}</p></article>)}</div></section>
  <section className="content-section soft"><div className="shell"><div className="section-heading"><span className="section-label">Volunteer journey</span><h2>Apply → screen → train → place → supervise.</h2></div><div className="timeline"><article><span>01</span><div><h3>Application</h3><p>Tell us what you can contribute, your availability and the type of role you are seeking.</p></div></article><article><span>02</span><div><h3>Screening</h3><p>Roles involving children require identity verification, references and any additional checks required by policy.</p></div></article><article><span>03</span><div><h3>Safeguarding orientation</h3><p>Every relevant volunteer receives boundaries, reporting routes, confidentiality and conduct guidance before placement.</p></div></article><article><span>04</span><div><h3>Placement & supervision</h3><p>Access is limited to the approved role, with a named coordinator and review process.</p></div></article></div></div></section>
  <section className="content-section shell"><div className="danger-note"><strong>Non-negotiable:</strong> volunteers may not privately contact children, publish child information or imagery, transport children independently, or create unsupervised relationships outside an approved program role.</div></section>
  <section className="content-section soft"><div className="shell form-shell"><div className="section-heading"><span className="section-label">Apply</span><h2>Register volunteer interest.</h2><p>This collects initial interest only. It does not approve a volunteer for access to children or programs.</p></div><InquiryForm kind="volunteer"/></div></section>
</main>}

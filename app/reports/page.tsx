import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Reports & Financials" };

export default function ReportsPage(){return <main>
  <PageHero eyebrow="Reports & financials" title="Trust should be inspectable." intro="FutureRise will use this page for governance documents, annual reports, audited financial information, program reports and verified fundraising disclosures." tone="mint" />
  <section className="content-section shell">
    <div className="section-heading"><span className="section-label">Document library</span><h2>Publication structure is ready.</h2><p>Documents will be added after the foundation's legal, governance and financial records are formally approved.</p></div>
    <div className="report-list">
      <div className="report-row"><div><strong>Annual report</strong><br/><span>Program activity, outcomes and organizational review</span></div><span className="badge">Pending first reporting year</span></div>
      <div className="report-row"><div><strong>Financial statements / audit</strong><br/><span>Approved financial disclosure and auditor documentation where applicable</span></div><span className="badge">Pending</span></div>
      <div className="report-row"><div><strong>Governance & registration</strong><br/><span>Public foundation registration and governance disclosures appropriate for publication</span></div><span className="badge">Pending legal setup</span></div>
      <div className="report-row"><div><strong>Program impact reports</strong><br/><span>Aggregated outcomes for Kids4Future, Rise Boys, Family Forward and Future Skills</span></div><span className="badge">Pending verified data</span></div>
    </div>
  </section>
  <section className="content-section soft"><div className="shell content-grid three"><article className="info-card sun"><h3>Money received</h3><p>Published fundraising values must reconcile to payment and financial records.</p></article><article className="info-card sky"><h3>Money used</h3><p>Reporting should distinguish program expenditure, restricted funding and organizational costs.</p></article><article className="info-card leaf"><h3>Results achieved</h3><p>Financial reporting should connect to program outputs and outcomes without exposing beneficiary case information.</p></article></div></section>
</main>}

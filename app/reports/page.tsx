import { PageHero } from "@/components/PageHero";
import { PublishedContent } from "@/components/PublishedContent";

export const metadata = { title: "Reports & Financials" };

export default function ReportsPage(){return <main>
  <PageHero eyebrow="Reports & financials" title="Trust should be inspectable." intro="FutureRise uses this page for governance documents, annual reports, audited financial information, program reports and verified fundraising disclosures." tone="mint" />
  <section className="content-section shell">
    <div className="section-heading"><span className="section-label">Document library</span><h2>Approved public reports.</h2><p>The CMS exposes only records marked published. Draft, review-stage and internal finance material remains outside this public page.</p></div>
    <PublishedContent kind="reports"/>
  </section>
  <section className="content-section soft"><div className="shell content-grid three"><article className="info-card sun"><h3>Money received</h3><p>Published fundraising values must reconcile to payment and financial records.</p></article><article className="info-card sky"><h3>Money used</h3><p>Reporting should distinguish program expenditure, restricted funding and organizational costs.</p></article><article className="info-card leaf"><h3>Results achieved</h3><p>Financial reporting should connect to program outputs and outcomes without exposing beneficiary case information.</p></article></div></section>
</main>}

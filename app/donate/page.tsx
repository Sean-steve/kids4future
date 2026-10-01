import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata = { title: "Donate" };

export default function DonatePage(){return <main>
  <PageHero eyebrow="Donate" title="Give toward a clear purpose—and expect a clear record." intro="FutureRise is building donation infrastructure around M-Pesa for Kenya, international payment options, receipts, campaign allocation and reconciliation." tone="coral" />
  <section className="content-section shell">
    <div className="content-grid">
      <article className="info-card leaf"><span className="eyebrow">Kenya</span><h2>M-Pesa</h2><p>M-Pesa will be the primary local payment path once the official organization till/paybill and callback infrastructure are configured.</p><span className="badge">Integration in progress</span></article>
      <article className="info-card sky"><span className="eyebrow">International</span><h2>PayPal</h2><p>The existing PayPal donation option remains available while the full FutureRise payment and reconciliation system is built.</p><a className="button" href={site.paypalUrl}>Donate with PayPal</a></article>
    </div>
  </section>
  <section className="content-section soft"><div className="shell"><div className="section-heading"><span className="section-label">Funding principles</span><h2>Traceable from intention to reporting.</h2></div><div className="content-grid three"><article className="info-card sun"><h3>Designated</h3><p>Where a donor selects a program or campaign, that designation should be stored with the transaction.</p></article><article className="info-card berry"><h3>Receipted</h3><p>Successful digital donations will generate a unique receipt linked to the verified payment event.</p></article><article className="info-card leaf"><h3>Reconciled</h3><p>Payment-provider records, internal donation records and financial reporting should reconcile before totals are published.</p></article></div></div></section>
  <section className="content-section shell"><div className="data-note"><strong>Important:</strong> FutureRise will not publish campaign totals simply because a progress bar looks persuasive. Public fundraising figures will come from reconciled payment records.</div></section>
</main>}

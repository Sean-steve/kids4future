import { PageHero } from "@/components/PageHero";
import { MpesaDonationForm } from "@/components/MpesaDonationForm";
import { site } from "@/lib/site";

export const metadata = { title: "Donate" };

export default function DonatePage(){return <main>
  <PageHero eyebrow="Donate" title="Give toward a clear purpose—and expect a clear record." intro="FutureRise is built around M-Pesa for Kenya, international payment options, receipts, program allocation and reconciliation." tone="coral" />
  <section className="content-section shell">
    <div className="content-grid">
      <article className="info-card leaf"><span className="eyebrow">Kenya</span><h2>M-Pesa</h2><p>Enter your M-Pesa number and FutureRise will request the payment through Safaricom once the production Daraja connection is enabled.</p><MpesaDonationForm/></article>
      <article className="info-card sky"><span className="eyebrow">International</span><h2>PayPal</h2><p>The existing PayPal donation option remains available while FutureRise completes the unified payment and reconciliation system.</p><a className="button" href={site.paypalUrl}>Donate with PayPal</a><p className="form-help">PayPal reconciliation will be migrated into the same canonical donation ledger in a later payment-provider adapter.</p></article>
    </div>
  </section>
  <section className="content-section soft"><div className="shell"><div className="section-heading"><span className="section-label">Funding principles</span><h2>Traceable from intention to reporting.</h2></div><div className="content-grid three"><article className="info-card sun"><h3>Designated</h3><p>When a donor selects a program or campaign, that designation is stored with the transaction.</p></article><article className="info-card berry"><h3>Receipted</h3><p>A successful, correlated payment creates one server-issued receipt. The browser cannot manufacture a paid receipt.</p></article><article className="info-card leaf"><h3>Reconciled</h3><p>Payment-provider records, callback events and internal donation records reconcile before totals are treated as final.</p></article></div></div></section>
  <section className="content-section shell"><div className="data-note"><strong>Important:</strong> FutureRise will not publish campaign totals simply because a progress bar looks persuasive. Public fundraising figures will come from reconciled payment records.</div></section>
</main>}

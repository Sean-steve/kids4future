import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Get Help" };

export default function GetHelpPage(){return <main>
  <PageHero eyebrow="Get help" title="If a child may be unsafe, use the right protection channel." intro="FutureRise is building referral capacity, but this website is not an emergency response service or a substitute for statutory child-protection professionals." tone="coral" />
  <section className="content-section shell">
    <div className="danger-note"><strong>For child protection concerns in Kenya:</strong> the National Child Helpline is available free, 24/7 by dialing <strong>116</strong>. WhatsApp support is available at <strong>0722 116 116</strong>.</div>
    <div className="content-grid" style={{marginTop:24}}>
      <article className="info-card sun"><span className="eyebrow">Urgent child-protection concern</span><h2>Call 116</h2><p>The National Child Helpline can receive reports, provide counselling and coordinate referrals with child-protection officers and other services.</p><a className="button" href="tel:116">Call 116</a></article>
      <article className="info-card sky"><span className="eyebrow">Confidential messaging</span><h2>WhatsApp</h2><p>For confidential support through the national child helpline service.</p><a className="button" href="https://wa.me/254722116116">Message 0722 116 116</a></article>
    </div>
  </section>
  <section className="content-section soft"><div className="shell"><div className="section-heading"><span className="section-label">FutureRise referral intake</span><h2>What this pathway will handle.</h2><p>Once operational, FutureRise will accept non-emergency requests for program assessment, referrals and follow-up without exposing case details publicly.</p></div><div className="content-grid three"><article className="info-card"><h3>Program eligibility</h3><p>Requests related to Kids4Future, Rise Boys, Family Forward or Future Skills.</p></article><article className="info-card"><h3>Partner referrals</h3><p>Referrals from schools, professionals, community organizations and approved service providers.</p></article><article className="info-card"><h3>Follow-up</h3><p>Secure follow-up through the future operations platform, not through public website comments or social media.</p></article></div></div></section>
  <section className="content-section shell"><div className="data-note"><strong>Privacy:</strong> do not send detailed abuse histories, medical records, identity documents or sensitive child case information through ordinary email or public social-media messages. FutureRise will introduce a protected intake channel before accepting such data online.</div></section>
</main>}

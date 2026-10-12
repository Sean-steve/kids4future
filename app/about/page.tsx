import Link from "next/link";

export const metadata = { title: "About" };

export default function AboutPage(){return <main className="content-page">
  <section className="page-hero peach"><div className="shell">
    <span className="section-label">About FutureRise</span>
    <h1>Stand with men. Reach back to boys.</h1>
    <p>FutureRise is a men-centred wellbeing and development movement. We support men first, then create a safe pathway for men who are ready to help strengthen boys coming behind them.</p>
  </div></section>

  <section className="shell prose-grid">
    <div><h2>Our mission</h2><p>To improve men&apos;s wellbeing, connection, purpose and help-seeking—then equip suitable men who freely choose to serve to become positive, safeguarded influences in the lives of boys and young men.</p></div>
    <div><h2>Our vision</h2><p>A society where men are heard, supported and accountable, and where stronger men actively help build a healthier next generation of boys.</p></div>
    <div><h2>Our values</h2><p>Brotherhood, dignity, honesty, courage, accountability, safeguarding, service and growth.</p></div>
    <div><h2>What we are not</h2><p>FutureRise is not anti-women, does not excuse abuse or harmful behavior, and does not treat peer support as a replacement for qualified mental-health, medical or emergency care.</p></div>
  </section>

  <section className="content-section soft"><div className="shell">
    <div className="section-heading"><span className="section-label">Our model</span><h2>One direction. Three layers.</h2></div>
    <div className="content-grid three">
      <article className="info-card berry"><span className="eyebrow">01 — For men</span><h2>Brotherhood</h2><p>Men find honest conversation, peer support, practical guidance, healthier help-seeking and professional referral when needed.</p></article>
      <article className="info-card sky"><span className="eyebrow">02 — The bridge</span><h2>Reach Back</h2><p>Men who choose to serve enter a screened, trained and supervised mentorship pathway. Receiving help never creates an obligation to volunteer.</p></article>
      <article className="info-card sun"><span className="eyebrow">03 — For boys</span><h2>Kids4Future</h2><p>Prepared men contribute to mentorship, identity, education, skills and positive development for boys through structured programs.</p></article>
    </div>
  </div></section>

  <section className="shell content-section"><div className="cta-band"><div><h2>Men first. Boys through men.</h2><p>That is the FutureRise model in one line.</p></div><Link className="button button-light" href="/programs/brotherhood/">Explore Brotherhood</Link></div></section>
</main>}

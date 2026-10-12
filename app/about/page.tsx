import Link from "next/link";

export const metadata = { title: "About" };

export default function AboutPage(){return <main className="content-page">
  <section className="page-hero peach"><div className="shell">
    <span className="section-label">About FutureRise</span>
    <h1>Building boys. Supporting men. Strengthening generations.</h1>
    <p>FutureRise grows from the original Kids4Future mission and a wider conviction: boys need strong developmental pathways, men need places where they can be supported without pretending, and healthy generations are built when prepared adults reach back responsibly.</p>
  </div></section>
  <section className="shell prose-grid">
    <div><h2>Our mission</h2><p>To help boys, young men and men build healthier, stronger and more purposeful lives through protection, mentorship, wellbeing support, education, skills, opportunity and service—so people are supported when they struggle and equipped to strengthen those coming behind them.</p></div>
    <div><h2>Our vision</h2><p>A society where boys grow with guidance, men can ask for help without shame, families have stronger support systems and responsible adults actively invest in the next generation.</p></div>
    <div><h2>Our values</h2><p>Dignity, brotherhood, honesty, courage, safeguarding, accountability, family, service, evidence and long-term development.</p></div>
    <div><h2>Our promise</h2><p>FutureRise will not frame support for men as hostility toward women, excuse abuse in the name of masculinity, or treat peer support as a replacement for qualified professional care.</p></div>
  </section>
  <section className="content-section soft"><div className="shell">
    <div className="section-heading"><span className="section-label">Our model</span><h2>Receive support. Rise. Reach back.</h2><p>People are not permanent beneficiaries. Support can become stability; stability can become capability; and capability can become voluntary service.</p></div>
    <div className="content-grid">
      <article className="info-card sun"><span className="eyebrow">Grow</span><h2>Boys</h2><p>Protection, education, belonging, emotional literacy, healthy identity and positive role models.</p></article>
      <article className="info-card sky"><span className="eyebrow">Rise</span><h2>Young men</h2><p>Purpose, relationships, resilience, life skills, vocational and digital capability, work and opportunity.</p></article>
      <article className="info-card berry"><span className="eyebrow">Stand</span><h2>Men</h2><p>Brotherhood, peer connection, fatherhood, grief, pressure, mental wellbeing, practical guidance and professional referral.</p></article>
      <article className="info-card leaf"><span className="eyebrow">Reach back</span><h2>Mentors</h2><p>Screened, trained and supervised adults who freely choose to guide boys and young men through approved roles.</p></article>
    </div>
  </div></section>
  <section className="shell content-section"><div className="cta-band"><div><h2>Explore the connected pathways.</h2><p>FutureRise is one ecosystem, not a collection of unrelated charity projects.</p></div><Link className="button button-light" href="/programs/">See our work</Link></div></section>
</main>}

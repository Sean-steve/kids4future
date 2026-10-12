import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Get Support" };

export default function GetHelpPage(){return <main>
  <PageHero eyebrow="Get support" title="You do not have to carry everything alone." intro="FutureRise is building separate, safeguarded pathways for children and for adult men. We are not an emergency service and peer support does not replace qualified professional care." tone="coral" />

  <section className="content-section shell">
    <div className="danger-note"><strong>Immediate danger in Kenya:</strong> call <strong>999</strong> or <strong>112</strong>. For a child-protection concern, call the National Child Helpline on <strong>116</strong>. If someone may act on suicidal thoughts or is in immediate danger, seek emergency help now rather than waiting for a FutureRise response.</div>
    <div className="content-grid" style={{marginTop:24}}>
      <article className="info-card sun"><span className="eyebrow">A child or boy may be unsafe</span><h2>Child protection</h2><p>The National Child Helpline can receive reports, provide counselling and coordinate referrals with child-protection services.</p><div className="hero-actions"><a className="button" href="tel:116">Call 116</a><a className="button button-ghost" href="https://wa.me/254722116116">WhatsApp 0722 116 116</a></div></article>
      <article className="info-card berry"><span className="eyebrow">I am a man looking for support</span><h2>Men&apos;s support pathway</h2><p>FutureRise Brotherhood is being designed for conversations around mental wellbeing, loneliness, money, work, relationships, fatherhood, grief, identity, violence, purpose and other pressures men may carry silently.</p><Link className="button" href="/programs/brotherhood/">See how Brotherhood works</Link></article>
    </div>
  </section>

  <section className="content-section soft"><div className="shell">
    <div className="section-heading"><span className="section-label">What FutureRise support means</span><h2>Conversation before crisis. Professional help when peer support is not enough.</h2></div>
    <div className="content-grid three">
      <article className="info-card"><h3>Talk</h3><p>Trusted, facilitated spaces where men can speak honestly without ridicule and without being forced to disclose more than they choose.</p></article>
      <article className="info-card"><h3>Work through options</h3><p>Peer support can help a man think through practical next steps, relationships, work, money, fatherhood, habits and support networks.</p></article>
      <article className="info-card"><h3>Refer</h3><p>When a situation is beyond peer scope, FutureRise should connect the person to an appropriate qualified professional or emergency service.</p></article>
    </div>
  </div></section>

  <section className="content-section shell">
    <div className="data-note"><strong>Privacy:</strong> do not send detailed abuse histories, medical records, identity documents or sensitive child or mental-health information through ordinary email or public social-media messages. FutureRise will introduce protected intake channels before accepting sensitive case information online.</div>
  </section>
</main>}

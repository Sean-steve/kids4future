import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Get Support" };

export default function GetHelpPage(){return <main>
  <PageHero eyebrow="For men" title="You do not have to carry everything alone." intro="FutureRise begins with men: honest conversation, peer connection, practical guidance and earlier help-seeking. Peer support does not replace qualified professional or emergency care." tone="coral" />

  <section className="content-section shell">
    <div className="content-grid">
      <article className="info-card berry"><span className="eyebrow">I am a man looking for support</span><h2>Start with Brotherhood</h2><p>FutureRise Brotherhood is designed for conversations around mental wellbeing, loneliness, money, work, relationships, fatherhood, grief, identity, violence, purpose and other pressures men may carry silently.</p><Link className="button" href="/programs/brotherhood/">See how Brotherhood works</Link></article>
      <article className="info-card sky"><span className="eyebrow">How support works</span><h2>Talk → work through options → refer</h2><p>Peer support creates room to be heard and think through next steps. When something is outside peer scope, the responsible next step is qualified professional or emergency support.</p></article>
    </div>
  </section>

  <section className="content-section soft"><div className="shell">
    <div className="section-heading"><span className="section-label">Safety</span><h2>Some situations need immediate or specialist help.</h2></div>
    <div className="danger-note"><strong>Immediate danger in Kenya:</strong> call <strong>999</strong> or <strong>112</strong>. If someone may act on suicidal thoughts or is in immediate danger, seek emergency help now rather than waiting for a FutureRise response.</div>
    <div className="content-grid" style={{marginTop:24}}>
      <article className="info-card sun"><span className="eyebrow">A child or boy may be unsafe</span><h2>Child protection</h2><p>Kenya&apos;s National Child Helpline can receive reports, provide counselling and coordinate child-protection referrals.</p><div className="hero-actions"><a className="button" href="tel:116">Call 116</a><a className="button button-ghost" href="https://wa.me/254722116116">WhatsApp 0722 116 116</a></div></article>
      <article className="info-card"><span className="eyebrow">FutureRise boundary</span><h2>Brotherhood is not clinical care.</h2><p>FutureRise should connect men to qualified mental-health, medical, legal, safeguarding or emergency services when peer support is not enough.</p></article>
    </div>
  </div></section>

  <section className="content-section shell">
    <div className="data-note"><strong>Privacy:</strong> do not send detailed abuse histories, medical records, identity documents or sensitive child or mental-health information through ordinary email or public social-media messages. FutureRise will introduce protected intake channels before accepting sensitive case information online.</div>
  </section>
</main>}

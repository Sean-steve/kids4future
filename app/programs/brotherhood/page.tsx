import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "FutureRise Brotherhood" };

const topics = [
  ["Mental wellbeing", "Depression, anxiety, stress, loneliness, burnout and difficult thoughts."],
  ["Money & purpose", "Financial pressure, unemployment, debt, career uncertainty and feeling left behind."],
  ["Relationships & family", "Heartbreak, marriage, fatherhood, conflict, separation and communication."],
  ["Identity & masculinity", "Strength, boundaries, responsibility, self-control, purpose and living beyond unhealthy expectations."],
  ["Grief & loss", "Losing a friend, parent, partner, child, relationship, opportunity or imagined future."],
  ["Safety & accountability", "Violence against men, abuse, exploitation, harmful behavior, responsibility and repair."],
];

export default function BrotherhoodPage(){return <main>
  <PageHero eyebrow="FutureRise Brotherhood" title="A place where men do not have to pretend." intro="Brotherhood is a men-centred wellbeing and peer-support pathway rooted in Kenya: honest conversation, practical support, early help-seeking and a bridge to qualified care when peer support is not enough." tone="berry" />

  <section className="content-section shell">
    <div className="section-heading"><span className="section-label">Why it exists</span><h2>Some men become very good at saying, “I am fine.”</h2><p>Pressure can hide behind work, jokes, responsibility and silence. FutureRise Brotherhood is designed to make reaching out feel like strength rather than failure—and to help men check on one another before a crisis.</p></div>
    <div className="content-grid">
      <article className="info-card sky"><h2>What we are</h2><p>A community for honest conversation, peer connection, practical guidance, healthier help-seeking and responsible referral.</p></article>
      <article className="info-card sun"><h2>What we are not</h2><p>Not anti-women. Not a replacement for therapy or emergency care. Not a space for excusing abuse, hostility or avoiding accountability.</p></article>
    </div>
  </section>

  <section className="content-section soft"><div className="shell">
    <div className="section-heading"><span className="section-label">What men can talk about</span><h2>Real life, not only the victories.</h2></div>
    <div className="content-grid three">{topics.map(([title,text])=><article className="info-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
  </div></section>

  <section className="content-section shell">
    <div className="section-heading"><span className="section-label">How it works</span><h2>Listen first. Work through options. Refer when necessary.</h2></div>
    <div className="timeline">
      <article><span>01</span><div><h3>Make room</h3><p>A man can start with one sentence, listen before speaking and choose how much he wants to share.</p></div></article>
      <article><span>02</span><div><h3>Peer support</h3><p>Facilitated conversation focuses on listening without ridicule, rushing to fix or pretending one person has every answer.</p></div></article>
      <article><span>03</span><div><h3>Practical next steps</h3><p>Where appropriate, men can work through options around relationships, work, money, habits, fatherhood and support networks.</p></div></article>
      <article><span>04</span><div><h3>Professional referral</h3><p>When a situation is outside peer scope, the next responsible step is qualified mental-health, medical, legal, safeguarding or emergency support.</p></div></article>
    </div>
  </section>

  <section className="boy-child">
    <div className="shell boy-grid">
      <div><span className="section-label light">A healthier picture of strength</span><h2>Strong does not have to mean silent.</h2><p>FutureRise treats courage, care, integrity, protection, service, accountability and growth as compatible with vulnerability. Men can support women&apos;s safety and dignity while also speaking seriously about harm experienced by men.</p></div>
      <div className="boy-points"><span>🤝 Brotherhood</span><span>🛡️ Dignity</span><span>💬 Honesty</span><span>🧭 Courage</span><span>⚖️ Accountability</span><span>🌱 Growth</span></div>
    </div>
  </section>

  <section className="content-section shell"><div className="cta-band"><div><h2>You do not have to carry it all alone.</h2><p>If you need support, start with the support pathway. If you are doing well and want community, there is room for you too.</p></div><div><Link className="button button-light" href="/get-help/">Find support</Link> <Link className="button button-light" href="/volunteer/">Get involved</Link></div></div></section>
</main>}

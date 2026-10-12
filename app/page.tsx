import Link from "next/link";

const flow = [
  ["01", "Stand with men", "FutureRise begins with men: creating trusted spaces for honest conversation, peer support, practical guidance and earlier help-seeking."],
  ["02", "Help men grow stronger", "Men build healthier support networks, purpose, accountability, relationships and stability—with professional referral when peer support is not enough."],
  ["03", "Prepare men to reach back", "Men who freely choose to serve can enter a screened, trained and supervised mentorship pathway."],
  ["04", "Strengthen boys", "Prepared men become positive role models for boys through mentorship, life skills, education, career exposure and consistent presence."],
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="kicker">Men first. Then reach back.</span>
            <h1>A place where men <em>don&apos;t have to pretend.</em></h1>
            <p>FutureRise stands with men through the pressures of life. As men grow stronger, those who are ready can reach back and help boys coming behind them grow with better support, guidance and examples.</p>
            <div className="hero-actions">
              <Link className="button" href="/programs/brotherhood/">Support for men</Link>
              <Link className="button button-ghost" href="/get-help/">I need support</Link>
            </div>
            <div className="trust-row"><span>Brotherhood</span><span>Dignity</span><span>Accountability</span></div>
          </div>
          <div className="hero-art" aria-label="A colorful illustration representing men receiving support and reaching back to boys">
            <div className="sun-orb">☀</div>
            <div className="rainbow-card card-one"><span>STAND</span><strong>🤝</strong></div>
            <div className="rainbow-card card-two"><span>RISE</span><strong>🌱</strong></div>
            <div className="rainbow-card card-three"><span>REACH BACK</span><strong>🧭</strong></div>
            <div className="hill hill-one"/><div className="hill hill-two"/>
          </div>
        </div>
      </section>

      <section className="intro shell">
        <div>
          <span className="section-label">The FutureRise idea</span>
          <h2>Support men. Strengthen boys through men.</h2>
        </div>
        <div>
          <p>FutureRise starts with the man—not with a list of disconnected programs. We help men speak honestly, find support, build healthier lives and stay connected to a brotherhood. When a man is ready and suitable, he can choose to reach back and become part of strengthening boys.</p>
          <p className="note">Receiving help never creates an obligation to mentor. Reaching back is voluntary, screened, trained and supervised.</p>
          <Link className="text-link" href="/about/">Why this model works →</Link>
        </div>
      </section>

      <section className="journey shell">
        <div className="section-heading narrow">
          <span className="section-label">One clear journey</span>
          <h2>Men → stronger men → mentors → boys.</h2>
          <p>This is the public FutureRise model. Everything else exists to support one of these stages.</p>
        </div>
        <div className="journey-list">
          {flow.map(([num,title,text]) => <article key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
      </section>

      <section className="boy-child">
        <div className="shell boy-grid">
          <div>
            <span className="section-label light">FutureRise Brotherhood</span>
            <h2>Start with the man.</h2>
            <p>Money. Work. Relationships. Fatherhood. Grief. Loneliness. Identity. Violence. Mental health. Purpose. FutureRise Brotherhood is where men can talk about real life without having to perform strength all the time.</p>
            <div className="hero-actions">
              <Link className="button button-light" href="/programs/brotherhood/">Enter Brotherhood</Link>
              <Link className="button button-light" href="/get-help/">Find support</Link>
            </div>
          </div>
          <div className="boy-points">
            <span>🧠 Mental wellbeing</span><span>💼 Work, money & purpose</span><span>❤️ Relationships & fatherhood</span><span>🕯️ Grief & loss</span><span>🛡️ Safety & accountability</span><span>🤝 Community & referral</span>
          </div>
        </div>
      </section>

      <section className="get-involved shell">
        <div className="section-heading">
          <span className="section-label">Reach back</span>
          <h2>When a man is ready, his strength can become someone else&apos;s support.</h2>
          <p>FutureRise prepares suitable men who want to serve, then connects that service to boys through structured, safeguarded mentorship.</p>
        </div>
        <div className="ways-grid">
          <article><span className="way-number">01</span><h3>Choose to serve</h3><p>No pressure. No debt. A man decides for himself that he wants to give time, experience and presence to the next generation.</p></article>
          <article><span className="way-number">02</span><h3>Prepare properly</h3><p>Screening, safeguarding, boundaries, listening, reporting and supervision come before child-facing roles.</p><Link href="/programs/mentorship/">See the mentor pathway →</Link></article>
          <article><span className="way-number">03</span><h3>Stand with boys</h3><p>Mentors support boys with identity, life skills, education, career exposure, healthy choices and consistent positive male presence.</p><Link href="/programs/">See the boys&apos; work →</Link></article>
        </div>
      </section>

      <section className="program-section">
        <div className="shell">
          <div className="section-heading">
            <span className="section-label">The boys&apos; impact arm</span>
            <h2>Kids4Future is where reaching back becomes real.</h2>
            <p>The boys&apos; work sits downstream from the men&apos;s work. Rise Boys, Future Skills and Family Forward support that impact rather than competing as separate headline ideas.</p>
          </div>
          <div className="program-grid">
            <article className="program-card sun"><div className="program-icon">☀️</div><span>Flagship boys&apos; impact arm</span><h3>Kids4Future</h3><p>Protection, education, mentorship and long-term support for vulnerable boys and children.</p><Link href="/programs/kids4future/">Explore Kids4Future <b>→</b></Link></article>
            <article className="program-card sky"><div className="program-icon">🚀</div><span>Boys growing into men</span><h3>Rise Boys</h3><p>Identity, wellbeing, mentorship, life skills and guidance through adolescence and early adulthood.</p><Link href="/programs/rise-boys/">Explore Rise Boys <b>→</b></Link></article>
            <article className="program-card berry"><div className="program-icon">🛠️</div><span>Capability</span><h3>Future Skills</h3><p>Digital skills, trades, apprenticeships, entrepreneurship and pathways into dignified work.</p><Link href="/programs/future-skills/">Explore Future Skills <b>→</b></Link></article>
            <article className="program-card leaf"><div className="program-icon">🏡</div><span>Support around the boy</span><h3>Family Forward</h3><p>Strengthening caregivers and family environments so mentorship and development have a stable foundation.</p><Link href="/programs/family-forward/">Explore Family Forward <b>→</b></Link></article>
          </div>
        </div>
      </section>

      <section className="donate">
        <div className="shell donate-card">
          <div><span className="section-label light">Strengthen the cycle</span><h2>Stand with men. Help men reach boys.</h2><p>Support the brotherhood, mentor preparation and the boys&apos; pathways that turn stronger men into stronger generations.</p></div>
          <div className="donate-actions"><Link className="button button-light" href="/donate/">Support FutureRise</Link><small>FutureRise publishes only verified impact and financial claims.</small></div>
        </div>
      </section>
    </main>
  );
}

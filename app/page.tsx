const programs = [
  {
    eyebrow: "Flagship program",
    title: "Kids4Future",
    text: "Protection, education, family reintegration and long-term support for street-connected and highly vulnerable children.",
    icon: "☀️",
    tone: "sun",
  },
  {
    eyebrow: "Boys & young men",
    title: "Rise Boys",
    text: "Mentorship, wellbeing, positive identity, life skills, vocational pathways and opportunity for boys and young men.",
    icon: "🚀",
    tone: "sky",
  },
  {
    eyebrow: "Families",
    title: "Family Forward",
    text: "Strengthening families and caregivers so children can grow safely in stable homes and communities wherever possible.",
    icon: "🏡",
    tone: "leaf",
  },
  {
    eyebrow: "Skills & livelihoods",
    title: "Future Skills",
    text: "Digital skills, TVET, apprenticeships, entrepreneurship and pathways into dignified work and independent adulthood.",
    icon: "🛠️",
    tone: "berry",
  },
];

const journey = [
  ["01", "Protect", "Meet urgent needs with safety, dignity, healthcare referrals and child-protection response."],
  ["02", "Stabilize", "Understand the child, their circumstances, risks, strengths and immediate support network."],
  ["03", "Reconnect", "Support safe family tracing, reintegration and caregiver strengthening when appropriate."],
  ["04", "Develop", "Create sustained education, mentorship, psychosocial, skills and opportunity pathways."],
  ["05", "Thrive", "Follow progress into stable adulthood instead of ending support at the first intervention."],
];

const ways = [
  ["Give", "Fund a verified program, campaign or practical need with transparent reporting."],
  ["Volunteer", "Contribute time and expertise through safeguarded, role-based volunteer opportunities."],
  ["Partner", "Schools, employers, professionals and companies can build long-term pathways with us."],
];

export default function Home() {
  return (
    <main>
      <div className="announcement">🌈 Building safer childhoods and stronger futures across Kenya.</div>
      <header className="site-header shell">
        <a className="brand" href="#top" aria-label="FutureRise Foundation home">
          <span className="brand-mark">FR</span>
          <span><strong>FutureRise</strong><small>FOUNDATION</small></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a><a href="#programs">Programs</a><a href="#impact">Our approach</a><a href="#involved">Get involved</a>
        </nav>
        <a className="button button-small" href="#donate">Donate</a>
      </header>

      <section className="hero" id="top">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="kicker">Every child deserves a future worth growing into.</span>
            <h1>Helping children <em>rise</em> beyond crisis.</h1>
            <p>FutureRise Foundation supports vulnerable children and young people from immediate protection through family, education, mentorship, skills and opportunity.</p>
            <div className="hero-actions"><a className="button" href="#programs">Explore our programs</a><a className="button button-ghost" href="#involved">Join the movement</a></div>
            <div className="trust-row"><span>Child-first</span><span>Family-aware</span><span>Outcome-driven</span></div>
          </div>
          <div className="hero-art" aria-label="A colorful illustration representing children growing toward a bright future">
            <div className="sun-orb">☀</div>
            <div className="rainbow-card card-one"><span>LEARN</span><strong>📚</strong></div>
            <div className="rainbow-card card-two"><span>GROW</span><strong>🌱</strong></div>
            <div className="rainbow-card card-three"><span>THRIVE</span><strong>⭐</strong></div>
            <div className="hill hill-one"/><div className="hill hill-two"/>
          </div>
        </div>
      </section>

      <section className="intro shell" id="about">
        <div><span className="section-label">Who we are</span><h2>Not just relief. A pathway forward.</h2></div>
        <div><p>Kids4Future began with a simple goal: help street-connected children access basic needs and hope. FutureRise expands that idea into a long-term development model—protecting children today while helping build the conditions for stable adulthood tomorrow.</p><p className="note">We will publish only verified impact data. No invented beneficiary counts, fundraising totals or success claims.</p></div>
      </section>

      <section className="program-section" id="programs">
        <div className="shell">
          <div className="section-heading"><span className="section-label">What we do</span><h2>Four connected pathways to a stronger future.</h2><p>Programs are designed to work together rather than as isolated charity activities.</p></div>
          <div className="program-grid">{programs.map((program) => <article className={`program-card ${program.tone}`} key={program.title}><div className="program-icon">{program.icon}</div><span>{program.eyebrow}</span><h3>{program.title}</h3><p>{program.text}</p><a href="#involved">Learn more <b>→</b></a></article>)}</div>
        </div>
      </section>

      <section className="journey shell" id="impact">
        <div className="section-heading narrow"><span className="section-label">How support works</span><h2>From crisis to capability.</h2><p>FutureRise is being built around a continuous child-development journey, not one-off interventions.</p></div>
        <div className="journey-list">{journey.map(([num,title,text]) => <article key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>

      <section className="boy-child">
        <div className="shell boy-grid"><div><span className="section-label light">Boys & young men</span><h2>Building boys who can become grounded, capable men.</h2><p>FutureRise will create a deliberate pathway for boys and young men around mentorship, mental wellbeing, character, relationships, substance-use prevention, education, trade and digital skills, entrepreneurship and employment.</p><a className="button button-light" href="#involved">Help build Rise Boys</a></div><div className="boy-points"><span>🧭 Mentorship & identity</span><span>🧠 Wellbeing & resilience</span><span>⚽ Community & healthy activity</span><span>💻 Digital and vocational skills</span><span>💼 Work & entrepreneurship</span><span>🤝 Lifelong positive networks</span></div></div>
      </section>

      <section className="get-involved shell" id="involved">
        <div className="section-heading"><span className="section-label">Take part</span><h2>There is more than one way to raise a future.</h2></div>
        <div className="ways-grid">{ways.map(([title,text], i) => <article key={title}><span className="way-number">0{i+1}</span><h3>{title}</h3><p>{text}</p><a href="mailto:streetkids4future@gmail.com">Start here →</a></article>)}</div>
      </section>

      <section className="donate" id="donate"><div className="shell donate-card"><div><span className="section-label light">Support FutureRise</span><h2>Turn generosity into a measurable journey.</h2><p>The rebuilt donation platform will add M-Pesa first, alongside international payment options, receipts and transparent campaign reporting.</p></div><div className="donate-actions"><a className="button button-light" href="https://www.paypal.com/donate/?hosted_button_id=NDU26JYV34K9G">Current donation option</a><small>M-Pesa integration is part of the next implementation phase.</small></div></div></section>

      <footer><div className="shell footer-grid"><div className="brand footer-brand"><span className="brand-mark">FR</span><span><strong>FutureRise</strong><small>FOUNDATION</small></span></div><p>Protect. Nurture. Equip. Rise.</p><div><a href="mailto:streetkids4future@gmail.com">streetkids4future@gmail.com</a><br/><span>Nairobi, Kenya</span></div></div><div className="shell copyright">© 2026 FutureRise Foundation. Foundation development website.</div></footer>
    </main>
  );
}

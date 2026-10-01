import Link from "next/link";

const programs = [
  { eyebrow: "Flagship program", title: "Kids4Future", text: "Protection, education, family reintegration and long-term support for street-connected and highly vulnerable children.", icon: "☀️", tone: "sun", href: "/programs/kids4future/" },
  { eyebrow: "Boys & young men", title: "Rise Boys", text: "Mentorship, wellbeing, positive identity, life skills, vocational pathways and opportunity for boys and young men.", icon: "🚀", tone: "sky", href: "/programs/rise-boys/" },
  { eyebrow: "Families", title: "Family Forward", text: "Strengthening families and caregivers so children can grow safely in stable homes and communities wherever possible.", icon: "🏡", tone: "leaf", href: "/programs/family-forward/" },
  { eyebrow: "Skills & livelihoods", title: "Future Skills", text: "Digital skills, TVET, apprenticeships, entrepreneurship and pathways into dignified work and independent adulthood.", icon: "🛠️", tone: "berry", href: "/programs/future-skills/" },
];

const journey = [
  ["01", "Protect", "Meet urgent needs with safety, dignity, healthcare referrals and child-protection response."],
  ["02", "Stabilize", "Understand the child, their circumstances, risks, strengths and immediate support network."],
  ["03", "Reconnect", "Support safe family tracing, reintegration and caregiver strengthening when appropriate."],
  ["04", "Develop", "Create sustained education, mentorship, psychosocial, skills and opportunity pathways."],
  ["05", "Thrive", "Follow progress into stable adulthood instead of ending support at the first intervention."],
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="kicker">Every child deserves a future worth growing into.</span>
            <h1>Helping children <em>rise</em> beyond crisis.</h1>
            <p>FutureRise Foundation supports vulnerable children and young people from immediate protection through family, education, mentorship, skills and opportunity.</p>
            <div className="hero-actions"><Link className="button" href="/programs/">Explore our programs</Link><Link className="button button-ghost" href="/volunteer/">Join the movement</Link></div>
            <div className="trust-row"><span>Child-first</span><span>Family-aware</span><span>Outcome-driven</span></div>
          </div>
          <div className="hero-art" aria-label="A colorful illustration representing children growing toward a bright future">
            <div className="sun-orb">☀</div><div className="rainbow-card card-one"><span>LEARN</span><strong>📚</strong></div><div className="rainbow-card card-two"><span>GROW</span><strong>🌱</strong></div><div className="rainbow-card card-three"><span>THRIVE</span><strong>⭐</strong></div><div className="hill hill-one"/><div className="hill hill-two"/>
          </div>
        </div>
      </section>

      <section className="intro shell">
        <div><span className="section-label">Who we are</span><h2>Not just relief. A pathway forward.</h2></div>
        <div><p>Kids4Future began with a simple goal: help street-connected children access basic needs and hope. FutureRise expands that idea into a long-term development model—protecting children today while helping build the conditions for stable adulthood tomorrow.</p><p className="note">FutureRise publishes only verified impact data. No invented beneficiary counts, fundraising totals or success claims.</p><Link className="text-link" href="/about/">Meet FutureRise →</Link></div>
      </section>

      <section className="program-section">
        <div className="shell">
          <div className="section-heading"><span className="section-label">What we do</span><h2>Four connected pathways to a stronger future.</h2><p>Programs are designed to work together rather than as isolated charity activities.</p></div>
          <div className="program-grid">{programs.map((program) => <article className={`program-card ${program.tone}`} key={program.title}><div className="program-icon">{program.icon}</div><span>{program.eyebrow}</span><h3>{program.title}</h3><p>{program.text}</p><Link href={program.href}>Explore program <b>→</b></Link></article>)}</div>
        </div>
      </section>

      <section className="journey shell">
        <div className="section-heading narrow"><span className="section-label">How support works</span><h2>From crisis to capability.</h2><p>FutureRise is being built around a continuous child-development journey, not one-off interventions.</p></div>
        <div className="journey-list">{journey.map(([num,title,text]) => <article key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        <Link className="text-link" href="/impact/">See how we measure progress →</Link>
      </section>

      <section className="boy-child">
        <div className="shell boy-grid"><div><span className="section-label light">Boys & young men</span><h2>Building boys who can become grounded, capable men.</h2><p>FutureRise creates a deliberate pathway for boys and young men around mentorship, mental wellbeing, character, relationships, substance-use prevention, education, trade and digital skills, entrepreneurship and employment.</p><Link className="button button-light" href="/programs/rise-boys/">Explore Rise Boys</Link></div><div className="boy-points"><span>🧭 Mentorship & identity</span><span>🧠 Wellbeing & resilience</span><span>⚽ Community & healthy activity</span><span>💻 Digital and vocational skills</span><span>💼 Work & entrepreneurship</span><span>🤝 Lifelong positive networks</span></div></div>
      </section>

      <section className="get-involved shell">
        <div className="section-heading"><span className="section-label">Take part</span><h2>There is more than one way to raise a future.</h2></div>
        <div className="ways-grid"><article><span className="way-number">01</span><h3>Give</h3><p>Fund a verified program, campaign or practical need with transparent reporting.</p><Link href="/donate/">Donate →</Link></article><article><span className="way-number">02</span><h3>Volunteer</h3><p>Contribute time and expertise through safeguarded, role-based opportunities.</p><Link href="/volunteer/">Volunteer →</Link></article><article><span className="way-number">03</span><h3>Partner</h3><p>Schools, employers, professionals and companies can build long-term pathways with us.</p><Link href="/partner/">Partner →</Link></article></div>
      </section>

      <section className="donate"><div className="shell donate-card"><div><span className="section-label light">Support FutureRise</span><h2>Turn generosity into a measurable journey.</h2><p>Give toward clear programs and practical needs, with receipts, reconciliation and transparent reporting as the donation platform comes online.</p></div><div className="donate-actions"><Link className="button button-light" href="/donate/">See donation options</Link><small>M-Pesa is the primary Kenya payment integration planned for the donation platform.</small></div></div></section>
    </main>
  );
}

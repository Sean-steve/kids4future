import Link from "next/link";

const programs = [
  { eyebrow: "Children", title: "Kids4Future", text: "Protection, education, family reintegration and long-term support for street-connected and highly vulnerable children.", icon: "☀️", tone: "sun", href: "/programs/kids4future/" },
  { eyebrow: "Boys & young men", title: "Rise Boys", text: "Mentorship, wellbeing, identity, life skills and opportunity for boys growing toward capable adulthood.", icon: "🚀", tone: "sky", href: "/programs/rise-boys/" },
  { eyebrow: "Men", title: "FutureRise Brotherhood", text: "Trusted spaces where men can speak honestly, find peer support and reach qualified professional help when needed.", icon: "🤝", tone: "berry", href: "/programs/brotherhood/" },
  { eyebrow: "Reach back", title: "FutureRise Mentors", text: "A screened, trained and supervised pathway for adults ready to support boys and young men safely.", icon: "🧭", tone: "leaf", href: "/programs/mentorship/" },
  { eyebrow: "Families", title: "Family Forward", text: "Strengthening families and caregivers so children can grow safely in stable homes and communities wherever possible.", icon: "🏡", tone: "leaf", href: "/programs/family-forward/" },
  { eyebrow: "Skills & livelihoods", title: "Future Skills", text: "Digital skills, TVET, apprenticeships, entrepreneurship and pathways into dignified work and independent adulthood.", icon: "🛠️", tone: "berry", href: "/programs/future-skills/" },
];

const lifeJourney = [
  ["01", "Grow", "Protect childhood, strengthen belonging, education, emotional development and access to positive role models."],
  ["02", "Rise", "Help boys and young men build identity, purpose, skills, healthy relationships, resilience and opportunity."],
  ["03", "Stand", "Stand with men through pressure, fatherhood, work, money, grief, relationships and mental-health challenges."],
  ["04", "Reach back", "Prepare suitable adults who freely choose to mentor, serve and strengthen the generation coming behind them."],
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="kicker">Receive support. Rise. Reach back.</span>
            <h1>Building boys. Supporting <em>men.</em></h1>
            <p>FutureRise Foundation helps boys, young men and men build healthier, stronger and more purposeful lives—then creates safe pathways for those who are ready to strengthen the next generation.</p>
            <div className="hero-actions">
              <Link className="button" href="/programs/">Explore our work</Link>
              <Link className="button button-ghost" href="/get-help/">Find support</Link>
            </div>
            <div className="trust-row"><span>Dignity-first</span><span>Safeguarded</span><span>Intergenerational</span></div>
          </div>
          <div className="hero-art" aria-label="A colorful illustration representing growth, support and reaching back">
            <div className="sun-orb">☀</div>
            <div className="rainbow-card card-one"><span>GROW</span><strong>🌱</strong></div>
            <div className="rainbow-card card-two"><span>STAND</span><strong>🤝</strong></div>
            <div className="rainbow-card card-three"><span>REACH BACK</span><strong>🧭</strong></div>
            <div className="hill hill-one"/><div className="hill hill-two"/>
          </div>
        </div>
      </section>

      <section className="intro shell">
        <div><span className="section-label">The FutureRise idea</span><h2>Every boy needs someone to look up to. Every man deserves someone to stand beside him.</h2></div>
        <div>
          <p>Kids4Future began by responding to vulnerable children. FutureRise keeps that responsibility and extends the journey: support boys as they grow, equip young men for adulthood, stand with men when life becomes heavy, and create a responsible way for prepared adults to reach back.</p>
          <p className="note">Being helped never creates an obligation to become a mentor. Service is voluntary, screened, trained and supervised.</p>
          <Link className="text-link" href="/about/">Understand the model →</Link>
        </div>
      </section>

      <section className="journey shell">
        <div className="section-heading narrow">
          <span className="section-label">The life journey</span>
          <h2>Grow → Rise → Stand → Reach back.</h2>
          <p>This public model connects prevention, development, men's wellbeing and intergenerational mentorship without treating people as permanent beneficiaries.</p>
        </div>
        <div className="journey-list">
          {lifeJourney.map(([num,title,text]) => <article key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
        <Link className="text-link" href="/impact/">See how we measure progress →</Link>
      </section>

      <section className="program-section">
        <div className="shell">
          <div className="section-heading">
            <span className="section-label">Our work</span>
            <h2>Six connected pathways. One stronger generation.</h2>
            <p>Child protection, youth development, family stability, skills, men's wellbeing and mentorship are designed to reinforce one another.</p>
          </div>
          <div className="program-grid">
            {programs.map((program) => <article className={`program-card ${program.tone}`} key={program.title}>
              <div className="program-icon">{program.icon}</div><span>{program.eyebrow}</span><h3>{program.title}</h3><p>{program.text}</p><Link href={program.href}>Explore pathway <b>→</b></Link>
            </article>)}
          </div>
        </div>
      </section>

      <section className="boy-child">
        <div className="shell boy-grid">
          <div>
            <span className="section-label light">FutureRise Brotherhood</span>
            <h2>A place where men do not have to pretend.</h2>
            <p>Men can carry pressure around money, work, relationships, fatherhood, grief, identity, loneliness, violence and mental health while still telling everyone they are fine. Brotherhood creates room for honest conversation, practical peer support and earlier connection to qualified help when peer support is not enough.</p>
            <div className="hero-actions">
              <Link className="button button-light" href="/programs/brotherhood/">Explore Brotherhood</Link>
              <Link className="button button-light" href="/get-help/">Find support</Link>
            </div>
          </div>
          <div className="boy-points">
            <span>🧠 Mental wellbeing</span><span>💼 Work, money & purpose</span><span>❤️ Relationships & fatherhood</span><span>🕯️ Grief & loss</span><span>🛡️ Safety, dignity & accountability</span><span>🤝 Peer connection & referral</span>
          </div>
        </div>
      </section>

      <section className="get-involved shell">
        <div className="section-heading"><span className="section-label">The loop</span><h2>Supported people can become supporters—when they are ready.</h2><p>The goal is not to create dependence. It is to create stronger people, stronger relationships and a safe route into service.</p></div>
        <div className="ways-grid">
          <article><span className="way-number">01</span><h3>Receive support</h3><p>A boy, young man or man enters the pathway that fits his situation. Support comes without a future obligation to FutureRise.</p><Link href="/get-help/">Find support →</Link></article>
          <article><span className="way-number">02</span><h3>Rise</h3><p>Build stability, skills, relationships, wellbeing and a stronger support network through the relevant pathway.</p><Link href="/programs/">Explore our work →</Link></article>
          <article><span className="way-number">03</span><h3>Reach back</h3><p>Adults who independently choose to serve can apply, be screened, trained and supervised before entering mentorship roles.</p><Link href="/programs/mentorship/">Explore mentorship →</Link></article>
        </div>
      </section>

      <section className="donate">
        <div className="shell donate-card">
          <div><span className="section-label light">Strengthen the whole journey</span><h2>Help build support that lasts across generations.</h2><p>Fund protection, development, wellbeing, skills, family stability and safeguarded mentorship—with verified reporting as the platform comes online.</p></div>
          <div className="donate-actions"><Link className="button button-light" href="/donate/">See donation options</Link><small>FutureRise publishes only verified impact and financial claims.</small></div>
        </div>
      </section>
    </main>
  );
}

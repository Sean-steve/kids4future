import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { programs } from "@/lib/programs";

export const metadata = { title: "Our Work" };

export default function ProgramsPage(){
  return <main>
    <PageHero eyebrow="Our work" title="Support across the journey of becoming—and being—a man." intro="FutureRise connects child protection, boys' development, family strength, skills, men's wellbeing and mentorship into one intergenerational system." tone="mint" />
    <section className="content-section shell">
      <div className="section-heading">
        <span className="section-label">Grow → Rise → Stand → Reach back</span>
        <h2>Six pathways designed to reinforce one another.</h2>
        <p>Someone may enter FutureRise at a moment of crisis, during adolescence, while preparing for work, as a father under pressure or later as a mentor ready to serve.</p>
      </div>
      <div className="content-grid">
        {programs.map((program)=><article className={`info-card ${program.tone === "mint" ? "leaf" : program.tone}`} key={program.slug}>
          <div className="program-icon" aria-hidden="true">{program.icon}</div>
          <span className="eyebrow">{program.eyebrow}</span>
          <h2>{program.name}</h2>
          <p>{program.summary}</p>
          <Link className="text-link" href={`/programs/${program.slug}/`}>Explore {program.name} →</Link>
        </article>)}
      </div>
    </section>
    <section className="shell content-section">
      <div className="cta-band">
        <div><h2>Support does not end at the first intervention.</h2><p>FutureRise is built around continuity: protect when necessary, develop capability, support men through difficult seasons and create a safeguarded route for prepared adults to strengthen the next generation.</p></div>
        <Link className="button button-light" href="/impact/">See the measurement model</Link>
      </div>
    </section>
  </main>
}

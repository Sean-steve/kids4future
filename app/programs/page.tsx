import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { programs } from "@/lib/programs";

export const metadata = { title: "Programs" };

export default function ProgramsPage(){
  return <main>
    <PageHero eyebrow="Programs" title="Connected support for the whole journey." intro="FutureRise programs reinforce one another—from protection and family stability to mentorship, skills and independent adulthood." tone="mint" />
    <section className="content-section shell">
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
    <section className="shell content-section"><div className="cta-band"><div><h2>Programs should connect, not compete.</h2><p>A child may move across protection, family-strengthening, mentorship and skills pathways over time. FutureRise is designed around that continuity.</p></div><Link className="button button-light" href="/impact/">See the measurement model</Link></div></section>
  </main>
}

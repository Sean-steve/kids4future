import Link from "next/link";
import type { Program } from "@/lib/programs";
import { PageHero } from "@/components/PageHero";

export function ProgramDetail({ program }: { program: Program }) {
  return (
    <main>
      <PageHero eyebrow={program.eyebrow} title={program.name} intro={program.summary} tone={program.tone === "mint" ? "mint" : program.tone} />
      <section className="program-detail shell">
        <div className="program-detail-grid">
          <div>
            <span className="section-label">Purpose</span>
            <h2>{program.purpose}</h2>
            <div className="content-grid">
              <article className="info-card sun"><h3>Who it serves</h3><ul className="check-list">{program.audience.map((item) => <li key={item}>{item}</li>)}</ul></article>
              <article className="info-card sky"><h3>Core objectives</h3><ul className="check-list">{program.objectives.map((item) => <li key={item}>{item}</li>)}</ul></article>
            </div>
          </div>
          <aside><span className="program-icon" aria-hidden="true">{program.icon}</span><h3>Program principle</h3><p>Support is designed around the young person&apos;s safety, dignity, development and long-term pathway—not around producing a compelling public story.</p><Link className="button" href="/partner/">Partner with this program</Link></aside>
        </div>
      </section>
      <section className="content-section soft"><div className="shell content-grid"><article className="info-card"><span className="eyebrow">What happens</span><h2>Program activities</h2><ul className="check-list">{program.activities.map((item) => <li key={item}>{item}</li>)}</ul></article><article className="info-card"><span className="eyebrow">What we measure</span><h2>Outcome signals</h2><ul className="check-list">{program.measures.map((item) => <li key={item}>{item}</li>)}</ul><p className="data-note">Public impact numbers will appear only after they are verified against operational records.</p></article></div></section>
      <section className="content-section"><div className="shell"><div className="section-heading"><span className="section-label">Safeguarding</span><h2>Boundaries are part of the program.</h2></div><div className="content-grid">{program.safeguards.map((item, index) => <article className="info-card berry" key={item}><span className="eyebrow">0{index + 1}</span><p>{item}</p></article>)}</div></div></section>
      <section className="shell content-section"><div className="cta-band"><div><h2>Help build {program.name} responsibly.</h2><p>Support can include funding, expertise, training capacity, placements, referrals or long-term institutional partnerships.</p></div><div><Link className="button button-light" href="/partner/">Become a partner</Link> <Link className="button button-light" href="/donate/">Support the program</Link></div></div></section>
    </main>
  );
}

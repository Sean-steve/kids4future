import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PublishedContent } from "@/components/PublishedContent";

export const metadata = { title: "Stories" };

export default function StoriesPage(){return <main>
  <PageHero eyebrow="Stories" title="Stories with dignity, consent and purpose." intro="FutureRise stories will show progress without turning a child’s hardest moments into fundraising material." tone="berry" />
  <section className="content-section shell">
    <div className="content-grid three">
      <article className="info-card berry"><span className="eyebrow">Consent</span><h2>Permission is documented.</h2><p>Stories involving children require appropriate consent, a clear purpose, and a safeguarding review before publication.</p></article>
      <article className="info-card sun"><span className="eyebrow">Privacy</span><h2>Identity is protected.</h2><p>Names, locations, schools, protection histories and other details may be changed or withheld when disclosure could create risk.</p></article>
      <article className="info-card leaf"><span className="eyebrow">Agency</span><h2>Young people are not props.</h2><p>Stories should emphasize strengths, choices, progress and context rather than helplessness or shock value.</p></article>
    </div>
  </section>
  <section className="content-section soft"><div className="shell"><div className="section-heading"><span className="section-label">Published stories</span><h2>Reviewed stories from FutureRise.</h2><p>Only records with published CMS status—and the required safeguarding/consent approval where applicable—are returned to this public page.</p></div><PublishedContent kind="stories"/></div></section>
  <section className="shell content-section"><div className="cta-band"><div><h2>Have a FutureRise update to share?</h2><p>Partners and volunteers can submit program updates; beneficiary material still requires safeguarding approval before publication.</p></div><Link className="button button-light" href="/contact/">Contact the team</Link></div></section>
</main>}

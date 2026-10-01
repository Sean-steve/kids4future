export function PageHero({ eyebrow, title, intro, tone = "mint" }: { eyebrow: string; title: string; intro: string; tone?: "mint" | "sun" | "sky" | "berry" | "coral" }) {
  return (
    <section className={`page-hero ${tone}`}>
      <div className="shell page-hero-inner">
        <span className="section-label">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </section>
  );
}

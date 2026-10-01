import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata = { title: "Contact" };

export default function ContactPage(){return <main>
  <PageHero eyebrow="Contact" title="Start with the right conversation." intro="General enquiries, volunteering, partnerships and donor questions can reach FutureRise here. Sensitive child-protection information should use the Get Help pathway instead." tone="sky" />
  <section className="content-section shell">
    <div className="contact-cards">
      <article className="contact-card"><span className="eyebrow">General</span><h2>Email</h2><p>Foundation, media and general questions.</p><a href={`mailto:${site.email}`}>{site.email}</a></article>
      <article className="contact-card"><span className="eyebrow">Location</span><h2>Nairobi</h2><p>FutureRise is being developed in Kenya. A verified public office address will be published once formally established.</p></article>
      <article className="contact-card"><span className="eyebrow">Child protection</span><h2>Need help?</h2><p>Do not email urgent or sensitive child case details.</p><a href="../get-help/">Use the Get Help page →</a></article>
    </div>
  </section>
  <section className="content-section soft"><div className="shell form-shell"><div className="section-heading"><span className="section-label">Online forms</span><h2>Secure forms are the next functional layer.</h2><p>Contact, volunteer and partnership forms will submit to the protected backend with validation, spam protection, consent records and audit fields. Until that is connected, email remains the honest working contact channel.</p></div><a className="button" href={`mailto:${site.email}`}>Email FutureRise</a></div></section>
</main>}

import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { InquiryForm } from "@/components/InquiryForm";
import { site } from "@/lib/site";

export const metadata = { title: "Contact" };

export default function ContactPage(){return <main>
  <PageHero eyebrow="Contact" title="Start with the right conversation." intro="General enquiries, volunteering, partnerships and donor questions can reach FutureRise here. Sensitive child-protection information should use the Get Help pathway instead." tone="sky" />
  <section className="content-section shell">
    <div className="contact-cards">
      <article className="contact-card"><span className="eyebrow">General</span><h2>Email</h2><p>Foundation, media and general questions.</p><a href={`mailto:${site.email}`}>{site.email}</a></article>
      <article className="contact-card"><span className="eyebrow">Location</span><h2>Nairobi</h2><p>FutureRise is being developed in Kenya. A verified public office address will be published once formally established.</p></article>
      <article className="contact-card"><span className="eyebrow">Child protection</span><h2>Need help?</h2><p>Do not email urgent or sensitive child case details.</p><Link href="/get-help/">Use the Get Help page →</Link></article>
    </div>
  </section>
  <section className="content-section soft"><div className="shell form-shell"><div className="section-heading"><span className="section-label">General enquiry</span><h2>Send FutureRise a message.</h2><p>The form is already wired for the secure backend endpoint. If that endpoint is not yet configured on the deployment, it will tell you clearly and keep email available as the fallback.</p></div><InquiryForm kind="contact"/><p className="form-help">Email fallback: <a href={`mailto:${site.email}`}>{site.email}</a></p></div></section>
</main>}

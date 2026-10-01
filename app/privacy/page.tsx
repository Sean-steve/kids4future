import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata = { title: "Privacy" };

export default function PrivacyPage(){return <main>
  <PageHero eyebrow="Privacy" title="Collect less. Protect more. Explain clearly." intro="This development-stage privacy notice describes how FutureRise intends to handle public website data. It will be legally reviewed before the foundation begins processing sensitive beneficiary information." tone="berry" />
  <section className="content-section shell"><div className="policy-copy" style={{padding:0}}>
    <div className="data-note"><strong>Status:</strong> development-stage privacy framework. It is not a substitute for the final registered organization's approved privacy notice, records of processing, retention schedule or data-protection assessment.</div>
    <h2>Public website data</h2><p>FutureRise may collect contact details and information voluntarily submitted for general enquiries, volunteering, partnerships, newsletters or donations. We will limit fields to what is needed for the stated purpose.</p>
    <h2>Children and beneficiary information</h2><p>The public website is not a beneficiary case-management system. Detailed protection histories, health information, identity documents and other sensitive case data should not be submitted through ordinary public forms. A separate protected operations environment will handle authorized case work.</p>
    <h2>Donation data</h2><p>Payment providers process payment credentials. FutureRise will retain the minimum transaction, allocation, donor and receipt information needed for reconciliation, acknowledgements, lawful reporting and donor service.</p>
    <h2>Sharing</h2><p>Data may be shared only with authorized service providers, professional partners or public authorities when required for the stated service, safeguarding, legal obligations or legitimate organizational operations. FutureRise will not sell personal data.</p>
    <h2>Retention</h2><p>Retention periods will be documented by data category. Information should be deleted or anonymized when no longer required, subject to legal, financial, safeguarding and audit obligations.</p>
    <h2>Your questions</h2><p>Privacy questions can currently be directed to <a href={`mailto:${site.email}`}>{site.email}</a>. A formal data-protection contact and request workflow will be added before production processing expands.</p>
  </div></section>
</main>}

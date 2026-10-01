# FutureRise Foundation — Architecture Roadmap

## 1. System boundary

FutureRise is intentionally split into two products:

1. **Public Foundation Platform** — website, programs, campaigns, stories, events, volunteering, partnerships, donations, reports and policies.
2. **Private Foundation Operations System** — beneficiary/case records, referrals, family tracing, intervention history, education/skills progress, reintegration, aftercare and internal analytics.

The public platform must never become the storage layer for sensitive child-case records.

## 2. Public platform target architecture

### Frontend
- Next.js + TypeScript
- server-rendered and statically generated public content where appropriate
- responsive accessible design system
- SEO metadata, sitemap, structured data and social previews

### Content
A headless CMS will manage:
- pages
- programs
- campaigns
- stories
- events
- team/governance profiles
- reports
- policy documents
- FAQs

### Operational data
PostgreSQL will be used for structured records that should not live in the CMS, including:
- donor references
- payment transactions
- campaign allocations
- volunteer applications
- partnership enquiries
- contact enquiries
- consent/audit records

### Payments
- M-Pesa as first-class Kenya payment channel
- card/international provider
- temporary PayPal fallback during migration
- webhook-based payment verification
- receipt generation
- transaction reconciliation

### Communications
- transactional email for acknowledgements and receipts
- newsletter integration
- rate limiting and anti-spam protection for forms

### Infrastructure
- environment-separated development/staging/production
- GitHub Actions for validation and deployment
- secrets managed outside source control
- application monitoring and error reporting
- backups for operational data

## 3. Public information architecture

- Home
- About
- Programs
  - Kids4Future
  - Rise Boys
  - Family Forward
  - Future Skills
- Our Approach
- Impact
- Stories
- Events
- Get Help
- Volunteer
- Partner
- Donate
- Reports & Financials
- Safeguarding
- Privacy
- Contact

## 4. Safeguarding invariants

- no public child case profiles
- no precise location disclosure for vulnerable beneficiaries
- no medical/abuse/family-history disclosure without lawful basis and approved safeguarding review
- no identifying media without appropriate consent and internal approval
- no invented or unverified impact statistics
- safeguarding review required before publishing beneficiary stories
- role-based access to internal systems

## 5. Program model

### Kids4Future
Street-connected and highly vulnerable children: protection, stabilization, family tracing/reintegration, education, healthcare referrals, psychosocial support and long-term development.

### Rise Boys
Boys and young men: positive identity, mentorship, wellbeing, healthy relationships, substance-use prevention, education, vocational/digital skills, entrepreneurship and work pathways.

### Family Forward
Prevention and family strengthening: caregiver support, referrals, livelihood pathways and interventions that reduce avoidable family separation.

### Future Skills
TVET, digital skills, trades, apprenticeships, entrepreneurship, financial capability and employment pathways.

## 6. Delivery phases

### Phase A — Foundation website core
Design system, public pages, responsive UI, SEO baseline and accessible content architecture.

### Phase B — Engagement
Working contact, volunteer, partner, newsletter and event flows.

### Phase C — Donations
M-Pesa, international payment provider, campaigns, receipts, reconciliation and reporting.

### Phase D — Trust layer
Safeguarding, privacy, governance, reports, complaints/reporting and verified impact dashboards.

### Phase E — CMS/admin
Role-based publishing, content workflow and media governance.

### Phase F — Operations platform
Separate private case-management product with strict access controls and data governance.

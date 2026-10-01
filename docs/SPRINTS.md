# FutureRise Foundation — Delivery Sprints

This file tracks the rebuild from the preserved 2024 Kids4Future static website into the FutureRise Foundation public platform.

## Sprint 0 — Preserve and branch

Status: COMPLETE

- preserved original project on `legacy-2024`
- created `revamp/2026-foundation`
- kept `main` untouched during reconstruction

## Sprint 1 — GitHub Pages + shared application shell

Status: COMPLETE / DEPLOYED

- Next.js static export configuration
- GitHub Pages workflow
- shared header
- shared footer
- central site configuration
- page hero and section components
- colorful cheerful design system
- legacy static assets retained only as design reference
- lint, TypeScript, production build and Pages deployment passing

## Sprint 2 — Complete program pages

Status: COMPLETE

- Kids4Future
- Rise Boys
- Family Forward
- Future Skills
- shared program model and program detail component
- audience, objectives, activities, outcomes and safeguarding requirements

## Sprint 3 — Impact

Status: COMPLETE

- public measurement model
- Protect → Stabilize → Reconnect → Develop → Thrive
- verification-pending metrics rather than invented figures
- public/private evidence boundaries

## Sprint 4 — Stories

Status: COMPLETE FOR PUBLIC SITE / CMS-WIRED

- consent-first story architecture
- privacy and agency rules
- no fake beneficiary stories
- published CMS story reads wired
- database safeguarding/consent publication guards implemented

## Sprint 5 — Events

Status: COMPLETE FOR PUBLIC SITE / CMS-WIRED

- current event hub
- legacy 2024 dates removed from current presentation
- event categories and partnership path
- published CMS event reads wired

## Sprint 6 — Get Help

Status: COMPLETE FOR PUBLIC SITE

- Kenya Child Helpline pathway
- emergency/statutory boundary
- future secure FutureRise referral path defined
- sensitive-data warning

## Sprint 7 — Volunteer

Status: COMPLETE FOR PUBLIC SITE / FORM-WIRED

- volunteer roles
- safeguarding boundaries
- application/screen/train/place/supervise pathway
- reusable validated application form
- backend endpoint contract implemented

## Sprint 8 — Partner

Status: COMPLETE FOR PUBLIC SITE / FORM-WIRED

- partnership types
- due-diligence model
- partnership inquiry form
- backend endpoint contract implemented

## Sprint 9 — Donate

Status: PUBLIC SURFACE COMPLETE / M-PESA CLIENT WIRED

- transparent donation page
- existing PayPal option retained
- M-Pesa donation intent UI implemented
- safe unavailable state when backend/credentials are absent
- designated / receipted / reconciled funding model

## Sprint 10 — Reports & Financials

Status: COMPLETE FOR PUBLIC SITE / CMS-WIRED

- reporting document library structure
- annual, financial, governance and impact-report categories
- explicit verification requirements
- published CMS report reads wired

## Sprint 11 — Privacy + Contact

Status: COMPLETE FOR PUBLIC SITE / FORM-WIRED

- development privacy framework
- public/private data boundary
- contact hub
- validated general enquiry form
- backend endpoint contract implemented

## Sprint 12 — Real forms backend

Status: IMPLEMENTED IN SOURCE / BACKEND PROVISIONING REQUIRED

Implemented:

- reusable inquiry component
- client + server contract
- consent field and privacy version capture
- honeypot
- origin allowlist
- payload limits and server validation
- hashed rate-limit fingerprint ledger
- secure database persistence through Edge Function
- safe error/unavailable states
- no fake successful submission when endpoint is absent

Pending production deployment:

- dedicated FutureRise Supabase project
- deploy migrations and Edge Function
- configure allowed origins and server secrets
- optional CAPTCHA/Turnstile layer
- notification workflow

## Sprint 13 — CMS

Status: IMPLEMENTED BASELINE IN SOURCE / BACKEND PROJECT REQUIRED

Implemented content domains:

- stories
- events
- reports
- campaigns
- public published-content reader
- authenticated CMS/admin surface
- draft creation
- RLS role model
- draft → review → published → archived status model
- mandatory safeguarding/consent database guards for beneficiary stories

Pending production deployment:

- deploy Supabase schema
- create staff accounts and role assignments
- complete operator review/publish/archive controls
- media/storage workflow

## Sprint 14 — M-Pesa

Status: IMPLEMENTED IN SOURCE / BUSINESS CREDENTIALS + BACKEND DEPLOY REQUIRED

Implemented:

- donation intent endpoint
- Daraja STK Push server integration path
- server-only credentials
- callback-token protection
- idempotent payment-event ledger
- checkout/provider correlation
- amount and phone validation
- failed/reversed/review states
- public donation UI wired to the intent contract

Required before production:

- FutureRise Safaricom Daraja application
- official PayBill/Till/shortcode as applicable
- Daraja consumer/product credentials
- production callback base URL
- deploy and exercise sandbox test cases

## Sprint 15 — Donor receipts + reconciliation

Status: IMPLEMENTED IN SOURCE / BACKEND + PROVIDER CONFIG REQUIRED

Implemented:

- canonical donation ledger
- immutable/idempotent payment events
- server-generated unique receipt records
- PDF receipt generation
- private receipt storage design
- idempotent email dispatch worker
- finance-only reconciliation function
- provider status query path for delayed/missed callbacks
- mismatches routed to `requires_review`
- cautious receipt language with no unverified tax-deductibility claim

Pending production deployment:

- Supabase project and private storage bucket
- receipt email provider credentials
- finance reviewer account
- scheduled reconciliation cadence
- production payment-provider testing

## Sprint 16 — Admin

Status: IMPLEMENTED BASELINE IN SOURCE / AUTH BACKEND REQUIRED

Implemented:

- authenticated staff sign-in
- `admin`, `content_editor`, `safeguarding_reviewer`, `finance_reviewer`, `viewer` roles
- RLS-backed authorization
- dashboard counts
- inquiries view
- donation view
- stories/events workflow view
- story/event draft creation
- safe disconnected-backend state

Still to complete after backend provisioning:

- inquiry assignment/status actions
- safeguarding review controls
- publish/archive controls
- reports/campaign editor controls
- receipt/reconciliation operator actions
- user/role administration UI
- audit-log viewer

## Sprint 17 — Accessibility / SEO / Security

Status: IMPLEMENTED BASELINE

- skip link
- semantic navigation
- keyboard-friendly mobile menu
- focus-visible styles
- reduced-motion support
- form labels and states
- robots metadata
- sitemap
- custom 404
- security reporting policy
- dependency update automation
- no secrets in public static configuration
- frozen legacy assets excluded from modern lint scope
- Next/Deno runtime source isolated for clean CI

Remaining before full launch:

- automated accessibility audit
- browser/device QA
- final content contrast review
- backend security advisors after migrations are deployed
- production penetration/security review

## Sprint 18 — Production deployment

Status: PUBLIC FRONTEND DEPLOYED / FULL PRODUCTION PENDING BACKEND

Public frontend target:

`https://sean-steve.github.io/kids4future/`

Latest integrated frontend release gate passes:

- dependency install
- ESLint
- TypeScript
- production Next.js build
- static export
- GitHub Pages artifact upload
- GitHub Pages deployment

Full production still requires the dedicated FutureRise backend, live form endpoints, CMS/auth provisioning, M-Pesa credentials, receipt email configuration and production reconciliation testing.

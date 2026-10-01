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

Status: COMPLETE IN SOURCE / BACKEND DEPLOYMENT REQUIRED

Implemented:

- stories
- events
- reports
- campaigns
- public published-content reader
- authenticated CMS/admin surface
- story and event draft creation
- report and campaign draft creation
- RLS role model
- draft → review → published → archived controls
- safeguarding reviewer workflow
- mandatory consent reference before safeguarded story approval
- database-enforced safeguarding/consent publication guards
- public pages read only published records
- privacy-minimized audit trail for CMS changes

Pending production deployment:

- deploy Supabase schema/functions
- bootstrap the first administrator
- configure staff identities and roles
- configure production document/media storage if direct uploads are required

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
- finance reconciliation review queue and resolution notes
- mismatches routed to `requires_review`
- cautious receipt language with no unverified tax-deductibility claim

Pending production deployment:

- Supabase project and private storage bucket
- receipt email provider credentials
- finance reviewer account
- scheduled reconciliation cadence
- production payment-provider testing

## Sprint 16 — Admin

Status: COMPLETE IN SOURCE / AUTH BACKEND DEPLOYMENT REQUIRED

Implemented:

- authenticated staff sign-in
- `admin`, `content_editor`, `safeguarding_reviewer`, `finance_reviewer`, `viewer` roles
- RLS-backed authorization
- dashboard counts and recent records
- inquiry operations with status controls
- story/event/report/campaign workflows
- safeguarding approval and consent controls
- publish/archive controls
- donation and receipt views
- M-Pesa reconciliation actions
- receipt dispatch actions
- reconciliation review queue
- administrator-only audit log viewer
- privacy-minimized database audit triggers
- server-side staff invitation
- user role/activation administration
- self-lockout protection for administrator access
- safe disconnected-backend states
- admin routes marked `noindex` and excluded from crawler discovery

Pending production deployment:

- bootstrap first administrator
- deploy auth/RLS schema and protected Edge Functions
- verify role matrix against live Supabase Auth accounts

## Sprint 17 — Accessibility / SEO / Security

Status: IMPLEMENTED BASELINE / PRODUCTION VERIFICATION PENDING

- skip link
- semantic navigation
- keyboard-friendly mobile menu
- focus-visible styles
- reduced-motion support
- form labels and status messaging
- robots metadata
- sitemap
- custom 404
- admin noindex/crawler exclusions
- security reporting policy
- dependency update automation
- no secrets in public static configuration
- frozen legacy assets excluded from modern lint scope
- Next/Deno runtime source isolated for clean CI
- narrow lint exception only for async Supabase admin loaders; React effect rule remains enabled elsewhere
- database RLS, least-privilege role model and server-only payment/admin credentials designed in source

Remaining before full backend launch:

- automated/live accessibility audit against configured production pages
- browser/device QA
- final content contrast review
- Supabase security/performance advisors after migrations are deployed
- M-Pesa sandbox abuse/error-case testing
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
- 28 statically generated application routes/assets
- static export
- GitHub Pages artifact upload
- GitHub Pages deployment

Full production still requires the dedicated FutureRise backend, live form endpoints, CMS/auth provisioning, M-Pesa credentials, receipt email configuration and production reconciliation/security testing.

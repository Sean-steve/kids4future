# FutureRise Foundation — Delivery Sprints

This file tracks the rebuild from the preserved 2024 Kids4Future static website into the FutureRise Foundation public platform.

## Sprint 0 — Preserve and branch

Status: COMPLETE

- preserved original project on `legacy-2024`
- created `revamp/2026-foundation`
- kept `main` untouched during reconstruction

## Sprint 1 — GitHub Pages + shared application shell

Status: IMPLEMENTED / DEPLOYMENT VALIDATION IN PROGRESS

- Next.js static export configuration
- GitHub Pages workflow
- shared header
- shared footer
- central site configuration
- page hero and section components
- colorful cheerful design system
- legacy static assets retained only as design reference

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

Status: COMPLETE

- consent-first story architecture
- privacy and agency rules
- no fake beneficiary stories
- CMS publication gate defined

## Sprint 5 — Events

Status: COMPLETE

- current event hub
- legacy 2024 dates removed from current presentation
- event categories and partnership path

## Sprint 6 — Get Help

Status: COMPLETE FOR PUBLIC SITE

- Kenya Child Helpline pathway
- emergency/statutory boundary
- future secure FutureRise referral path defined
- sensitive-data warning

## Sprint 7 — Volunteer

Status: COMPLETE FOR PUBLIC SITE

- volunteer roles
- safeguarding boundaries
- application/screen/train/place/supervise pathway
- frontend application form

## Sprint 8 — Partner

Status: COMPLETE FOR PUBLIC SITE

- partnership types
- due-diligence model
- partnership inquiry form

## Sprint 9 — Donate

Status: PUBLIC SURFACE COMPLETE / PAYMENT BACKEND PENDING

- transparent donation page
- existing PayPal option retained
- M-Pesa identified as primary Kenya integration
- designated / receipted / reconciled funding model

## Sprint 10 — Reports & Financials

Status: PUBLIC SURFACE COMPLETE

- reporting document library structure
- annual, financial, governance and impact-report categories
- explicit verification requirements

## Sprint 11 — Privacy + Contact

Status: PUBLIC SURFACE COMPLETE

- development privacy framework
- public/private data boundary
- contact hub
- backend-ready general enquiry form

## Sprint 12 — Real forms backend

Status: FRONTEND COMPLETE / BACKEND PROVISIONING REQUIRED

Implemented:

- reusable inquiry component
- client + server contract
- consent field
- honeypot
- safe error/unavailable states
- no fake successful submission when endpoint is absent

Pending:

- dedicated FutureRise Supabase project
- Edge Function endpoint
- server validation
- rate limiting / CAPTCHA
- database persistence
- notification workflow

## Sprint 13 — CMS

Status: ARCHITECTURE COMPLETE / BACKEND PROJECT REQUIRED

Planned content domains:

- stories
- events
- reports
- campaigns
- program updates
- media references

Workflow: draft → review → published → archived, with mandatory safeguarding review where beneficiary content is involved.

## Sprint 14 — M-Pesa

Status: ARCHITECTURE COMPLETE / BUSINESS CREDENTIALS REQUIRED

Required before production:

- FutureRise Safaricom Daraja application
- official PayBill/Till/shortcode as applicable
- product credentials
- secure callback endpoint

Implementation contract is in `docs/BACKEND.md`.

## Sprint 15 — Donor receipts + reconciliation

Status: ARCHITECTURE COMPLETE / PAYMENT BACKEND REQUIRED

- canonical donation ledger
- immutable/idempotent payment events
- server-generated receipts
- receipt delivery state
- provider reconciliation runs
- mismatches routed to review

## Sprint 16 — Admin

Status: ARCHITECTURE COMPLETE / AUTH BACKEND REQUIRED

Modules:

- dashboard
- inquiries
- stories
- events
- reports
- campaigns
- donations
- receipts
- reconciliation
- users / roles
- audit log

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

Remaining before launch: automated accessibility audit, browser/device QA, final content contrast review and production penetration/security review of the backend.

## Sprint 18 — Production deployment

Status: PUBLIC GITHUB PAGES PIPELINE IMPLEMENTED; FULL PRODUCTION PENDING BACKEND

Public frontend target:

`https://sean-steve.github.io/kids4future/`

Full production also requires the dedicated FutureRise backend and payment configuration.

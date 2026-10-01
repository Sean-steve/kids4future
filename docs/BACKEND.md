# FutureRise Backend Architecture

Status: implementation contract for the server-side sprints.

The public FutureRise website is exported as static files to GitHub Pages. Anything requiring secrets, trusted writes, authentication, payment callbacks, receipts, reconciliation or administrative authorization must run outside GitHub Pages.

## Platform boundary

### Public static frontend

- Next.js static export on GitHub Pages
- public program, impact, story, event and policy content
- contact / volunteer / partner form UI
- donation initiation UI
- no service-role keys
- no M-Pesa consumer secret or passkey
- no beneficiary case database
- no admin authorization decisions in client-only code

### Secure backend

Planned implementation: dedicated FutureRise Supabase project using PostgreSQL, Auth and Edge Functions.

Responsibilities:

- enquiry intake
- CMS storage and publishing workflow
- administrator authentication and authorization
- payment initiation and callbacks
- donation ledger
- receipts
- reconciliation
- audit events
- public-safe content projection

The private beneficiary/case-management platform remains a separate domain and is not part of the public website CMS.

## Core data domains

### `inquiries`

Stores general, volunteer and partnership enquiries.

Minimum fields:

- id
- kind (`contact`, `volunteer`, `partner`)
- name
- email
- phone nullable
- organization nullable
- interest nullable
- message
- consent_at
- source
- status
- assigned_to nullable
- created_at
- updated_at

Public users must never receive SELECT access to this table.

### CMS

Content types:

- stories
- events
- reports
- campaigns
- program updates
- media assets / references

Every publishable record requires:

- stable id
- slug where applicable
- status (`draft`, `review`, `published`, `archived`)
- title
- summary
- content / structured body
- publication timestamps
- author / editor
- safeguarding review state where beneficiary material is involved
- consent / media approval reference where applicable
- audit timestamps

Stories involving beneficiaries must not be publishable unless safeguarding review is complete.

### `donations`

Canonical donation ledger. One row represents one intended donation transaction.

Key fields:

- id
- public_reference
- provider (`mpesa`, `paypal`, future provider)
- provider_reference nullable until known
- checkout_reference nullable
- donor name nullable
- donor email nullable
- donor phone normalized / protected where needed
- amount
- currency
- campaign_id nullable
- program_id nullable
- status (`created`, `pending`, `paid`, `failed`, `reversed`, `refunded`, `requires_review`)
- paid_at nullable
- receipt_id nullable
- created_at
- updated_at

Money values are stored using fixed-precision numeric types. Published totals are calculated only from reconciled successful transactions.

### `payment_events`

Immutable/idempotent record of provider events.

Fields include:

- id
- provider
- provider_event_key / correlation key
- event_type
- verified
- payload checksum
- redacted payload or restricted raw event reference
- received_at
- processed_at
- processing_status
- related_donation_id nullable

Unique constraints prevent duplicate callbacks from creating duplicate donations or receipts.

### `receipts`

- id
- receipt_number
- donation_id unique
- issued_at
- recipient details required for the receipt
- currency / amount snapshot
- delivery_status
- document storage reference

Receipt numbers are generated server-side only.

### `reconciliation_runs` and `reconciliation_items`

Record periodic/provider reconciliation rather than overwriting transaction history.

Track:

- provider
- date/time window
- expected vs observed status
- unresolved mismatches
- resolution notes
- operator / automated source
- completion state

## Authorization model

Administrative authorization must use server-controlled role claims / app metadata, never user-editable profile metadata.

Initial roles:

- `admin`
- `content_editor`
- `safeguarding_reviewer`
- `finance_reviewer`
- `viewer`

Principles:

- default deny
- Row Level Security on exposed tables
- no public SELECT for inquiries, donations, payment events, receipts or audit logs
- content editors cannot approve safeguarding review on their own beneficiary story
- finance access does not grant child/case access
- public CMS reads expose only published and public-safe fields
- all privileged mutations are auditable

## Public form endpoint

The frontend reads `NEXT_PUBLIC_FORMS_ENDPOINT`.

The server endpoint must:

1. accept only `contact`, `volunteer` and `partner` submissions;
2. validate field lengths and email shape server-side;
3. reject the honeypot field when populated;
4. enforce request throttling / abuse controls;
5. use a narrow CORS allowlist for approved FutureRise frontend origins;
6. store consent timestamp and privacy-notice version;
7. reject or quarantine obvious sensitive child case material where feasible;
8. return a generic success response that does not expose internal ids;
9. never expose database credentials to the browser.

CAPTCHA / bot protection can be added before public promotion.

## CMS publishing workflow

`draft -> review -> published -> archived`

Beneficiary-related content adds a mandatory safeguarding review gate.

A public story can be published only when:

- editorial review is complete;
- safeguarding review is complete if required;
- consent/media approval references are present when required;
- no prohibited identifying data remains;
- publication date is set.

## M-Pesa architecture

M-Pesa runs entirely server-side except for the user's phone/amount/campaign selection.

Flow:

1. frontend creates a donation intent through a FutureRise Edge Function;
2. backend validates amount, campaign and phone input;
3. backend requests an M-Pesa access token using server-side credentials;
4. backend initiates the appropriate Daraja payment request;
5. donation remains `pending`;
6. Safaricom sends the asynchronous callback to a dedicated webhook Edge Function;
7. callback is validated, normalized and written idempotently to `payment_events`;
8. canonical donation status is updated exactly once;
9. successful payment creates one receipt record;
10. acknowledgement / receipt delivery is queued;
11. reconciliation later verifies the transaction against provider records;
12. unresolved mismatches become `requires_review` rather than being silently forced to paid/failed.

Required secrets will be configured only in the backend environment:

- M-Pesa consumer key
- M-Pesa consumer secret
- shortcode / till / paybill information
- passkey or other product-specific secret where required
- environment / approved callback configuration

No real credential value belongs in this repository.

## Donor receipts

Receipt generation is triggered only from a verified successful payment event or an authorized finance reconciliation action.

A receipt must not be generated from the browser's claim that a payment succeeded.

Receipt delivery tracks sent/failed/retry state independently from donation payment state.

## Admin

The admin surface is not deployed as an unauthenticated static control panel.

Initial admin modules:

- Dashboard
- Inquiries
- Stories
- Events
- Reports
- Campaigns
- Donations
- Receipts
- Reconciliation
- Users / roles
- Audit log

The final admin implementation will use Supabase Auth plus database-enforced RLS/authorization. Frontend route hiding is convenience only, never the security boundary.

## Audit

Audit events should record:

- actor
- action
- resource type/id
- before/after identifiers or safe change summary
- timestamp
- request/correlation id
- relevant source IP / user-agent where lawful and appropriate

Sensitive data must not be copied indiscriminately into audit logs.

## Deployment environments

- GitHub Pages: public static site
- FutureRise Supabase: server/backend
- payment provider: Safaricom Daraja / PayPal as configured
- email provider: transactional acknowledgement and receipt delivery

Production enablement requires a dedicated FutureRise backend project rather than reusing unrelated projects.

# FutureRise Foundation

FutureRise Foundation is the modernization of the original Kids4Future project.

## Purpose

FutureRise supports vulnerable children and young people through a connected pathway of protection, family strengthening, education, mentorship, skills and opportunity. Kids4Future remains the flagship child-support program, with additional programs for boys and young men, families and future skills.

## Branches

- `legacy-2024` — preserved copy of the original static charity website.
- `revamp/2026-foundation` — active FutureRise rebuild.
- `main` — untouched until the rebuild is reviewed and approved.

## Current stack

- Next.js
- React
- TypeScript
- CSS design system

## Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Current rebuild status

Implemented:

- FutureRise Foundation identity and positioning
- modern application shell
- responsive, colorful design system inspired by the legacy site
- new homepage
- Kids4Future flagship program positioning
- Rise Boys program positioning
- Family Forward positioning
- Future Skills positioning
- crisis-to-capability journey model
- public transparency note for verified impact data
- current PayPal donation fallback preserved
- mobile-responsive layouts

Planned next:

- dedicated About page
- Programs index and individual program pages
- Impact and reporting pages
- Safeguarding and privacy pages
- volunteer and partner application flows
- CMS integration
- M-Pesa donation flow
- verified campaign and donation records
- transactional receipts and email
- analytics, SEO and accessibility QA
- CI/CD and production deployment
- later: separate private Foundation Operations / case-management system

## Design direction

The legacy site remains the visual inspiration rather than the technical base. FutureRise keeps the original project's optimism through cheerful colors, large imagery, approachable cards and strong calls to action, while replacing the old Bootstrap/jQuery template architecture.

## Data and safeguarding rule

No unverified impact totals, beneficiary counts or fundraising claims should be published. Sensitive child information must never be stored in or exposed through the public content layer.

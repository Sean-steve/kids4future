# FutureRise Foundation — Agent Guide

## Mission
Build a cheerful, trustworthy and maintainable public platform for FutureRise Foundation while protecting vulnerable children and preserving the original Kids4Future spirit.

## Non-negotiables
- Keep the design colorful, warm, optimistic and child/youth friendly without becoming childish.
- Preserve `legacy-2024` as historical reference; do not rewrite it.
- Do not publish invented beneficiary counts, fundraising totals, testimonials, partners or impact claims.
- Do not expose child case information, precise locations, medical details, abuse history or other sensitive beneficiary data.
- Treat safeguarding, consent, accessibility, privacy and donation integrity as product requirements.
- Keep public-site data separate from the future private case-management system.
- Prefer reusable typed components and data-driven content over duplicated page markup.
- Every form must have validation, anti-spam controls, meaningful success/error states and a real backend before being labelled functional.
- Payment state must be verified server-side/webhook-side; never trust client-side success alone.

## Visual direction
Use the legacy website for inspiration: bold sections, optimistic imagery, colorful program cards and prominent action buttons. The new visual language uses sun yellow, coral, sky blue, green, violet and warm cream with generous rounded corners and accessible contrast.

## Engineering baseline
Run before merge:

```bash
npm run lint
npm run typecheck
npm run build
```

## Delivery order
1. Public information architecture and reusable layout/components.
2. Program and trust content.
3. Real engagement forms.
4. CMS.
5. Donations/M-Pesa and receipts.
6. Reporting/impact.
7. Private operations system as a separate security boundary.

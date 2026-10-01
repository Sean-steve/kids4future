# FutureRise Deployment

## Public frontend

The public website is statically exported by Next.js and deployed to GitHub Pages.

Target URL:

`https://sean-steve.github.io/kids4future/`

Workflow:

`.github/workflows/pages.yml`

The workflow:

1. checks out `revamp/2026-foundation`;
2. installs Node dependencies;
3. runs lint and TypeScript validation;
4. builds the static export into `out/`;
5. uploads the Pages artifact;
6. deploys it to the `github-pages` environment.

The repository's Pages source must be configured to **GitHub Actions** in GitHub Settings → Pages.

## Base path

The repository site lives below `/kids4future`. `next.config.ts` therefore sets the GitHub Pages base path and asset prefix during Actions builds while leaving local development at `/`.

## Backend

GitHub Pages is deliberately not the backend.

A dedicated FutureRise Supabase project will host:

- forms;
- CMS;
- administrator authentication;
- M-Pesa initiation/callbacks;
- donation records;
- receipts;
- reconciliation;
- audit records.

## Environment values

The static frontend may use public values such as an Edge Function URL. Secrets are forbidden from `NEXT_PUBLIC_*` variables because those values are embedded in client-accessible assets.

Production backend secrets must be stored in the backend secret manager / Edge Function environment, not GitHub Pages.

## Promotion to production

Before treating the website as production-ready:

- final legal entity information must replace development placeholders;
- verified contact address must be published;
- privacy and safeguarding policies must be formally approved;
- real forms backend must be enabled;
- CMS authorization and RLS must be reviewed;
- M-Pesa credentials and callbacks must be configured where applicable;
- receipt and reconciliation tests must pass;
- accessibility/browser/device checks must pass;
- backend security advisors and security review must be clean or remediated;
- final deployment must build from a reviewed release commit.

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
4. injects only approved public backend configuration from GitHub repository variables;
5. builds the static export into `out/`;
6. uploads the Pages artifact;
7. deploys it to the `github-pages` environment.

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

## Public build configuration

The Pages workflow reads these **GitHub repository variables**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_FORMS_ENDPOINT` — optional override
- `NEXT_PUBLIC_DONATION_ENDPOINT` — optional override

When the endpoint overrides are absent, the frontend derives them automatically from `NEXT_PUBLIC_SUPABASE_URL`:

- `/functions/v1/inquiries`
- `/functions/v1/donation-intent`

The Supabase URL and publishable key are intentionally public browser configuration. They do not bypass RLS and must never be replaced with a Supabase secret/service credential.

## Secret configuration

Secrets are forbidden from `NEXT_PUBLIC_*` variables because those values are embedded in client-accessible assets.

Production backend secrets belong in the Supabase Edge Function secret environment. This includes:

- Supabase server secret key;
- rate-limit salt;
- M-Pesa/Daraja consumer key and consumer secret;
- shortcode/passkey and callback token;
- receipt email provider API key;
- receipt sender identity.

The repository's GitHub connection does not expose GitHub secret/variable administration, so repository variables may need to be entered in GitHub Settings → Secrets and variables → Actions after the Supabase project is provisioned.

## Backend activation sequence

1. Create a dedicated FutureRise Supabase project.
2. Apply the migrations in `supabase/migrations/` in order.
3. Deploy the Edge Functions registered in `supabase/config.toml`.
4. Create the private `receipts` storage bucket through the migration/configuration flow.
5. Configure server secrets.
6. Bootstrap the first FutureRise administrator and confirm RLS role behavior.
7. Set the GitHub public repository variables above.
8. Re-run the Pages deployment.
9. Exercise contact/volunteer/partner form submissions.
10. Exercise CMS draft/review/publish/archive and safeguarding gates.
11. Run M-Pesa sandbox happy-path, cancellation, timeout, duplicate callback, amount mismatch and missed-callback reconciliation tests.
12. Verify receipt generation/email idempotency and reconciliation review handling.

## Promotion to production

Before treating the website as fully production-ready:

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

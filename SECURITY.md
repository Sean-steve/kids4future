# FutureRise Foundation Security Policy

## Reporting a vulnerability

Please do not disclose security vulnerabilities publicly in issues, discussions, social media, or beneficiary-facing channels.

Until a dedicated security mailbox is established, report suspected vulnerabilities privately to `streetkids4future@gmail.com` with the subject `SECURITY: FutureRise Foundation`.

Do not include beneficiary case data, child identity documents, or other sensitive personal information when demonstrating a vulnerability.

## Scope priorities

High-priority issues include:

- exposure of child or family information;
- unauthorized admin/CMS access;
- donation or payment manipulation;
- forged payment callbacks or receipts;
- bypass of role or row-level access controls;
- secrets or credentials committed to the public repository;
- form abuse that could expose, spam, or profile users;
- unsafe publication of protected media or case information.

## Current architecture note

The GitHub Pages site is a static public frontend. Future server-side forms, CMS, payments, receipts, reconciliation, and administration will run through a separately secured backend. Secrets must never be embedded in the static bundle.

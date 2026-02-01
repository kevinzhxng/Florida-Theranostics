# Security Overview

This document summarizes the security measures in place and recommendations for deployment.

## What Was Audited & Fixed

### 1. API routes (contact & referral)

- **HTML / XSS in emails**: User-supplied values (name, email, phone, message, replyEmail, and all referral fields) are now escaped with `escapeHtml()` before being interpolated into HTML email bodies. This prevents malicious HTML/script from being rendered in email clients.
- **Input validation (contact)**:
  - Name, email, and message are required and trimmed.
  - Name length limited to 100 characters; email to 254; message to 2,000.
  - Basic email format check (pattern).
  - If phone is provided, it must be exactly 10 digits (after stripping non-digits).
- **Input validation (referral)**:
  - All text fields are read as strings (files from `formData` are ignored for text fields).
  - Field lengths are capped server-side (500 for most fields, 20 for phone/fax, 2,000 for diagnosis reason, 254 for reply email).
  - Required-field checks unchanged.
- **File uploads (referral)**:
  - Attachment filenames are sanitized with `sanitizeFilename()` (path stripped, only safe characters, max 128 chars) to avoid path traversal or unsafe names in emails.
  - Per-file size limit: 10 MB; total attachments: 25 MB; max 5 files (unchanged, now using a named constant).

### 2. Environment variables

- **Server-only secrets** (never exposed to the client): `RESEND_API_KEY`, `RECAPTCHA_SECRET_KEY`, `CONTACT_EMAIL`, `REFERRAL_EMAIL`, `SANITY_API_WRITE_TOKEN`. Used only in API routes or server-side scripts.
- **Public / client-safe**: `NEXT_PUBLIC_SANITY_*`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`. These are intended for client use; no secrets are in `NEXT_PUBLIC_*`.

### 3. HTTP security headers (next.config.mjs)

- **Content-Security-Policy**: `frame-ancestors` restricts who can embed the site (Sanity Studio allowed in production).
- **X-Content-Type-Options**: `nosniff` to reduce MIME sniffing.
- **Referrer-Policy**: `strict-origin-when-cross-origin` to limit referrer leakage.
- **Permissions-Policy**: Disables camera, microphone, and geolocation for this origin.

### 4. reCAPTCHA (contact form)

- Contact form uses reCAPTCHA when `RECAPTCHA_SECRET_KEY` and `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` are set. Token is verified server-side before sending the email.

---

## Recommendations for Production

1. **Rate limiting**: The contact and referral APIs do not currently enforce rate limits. To reduce abuse and spam:
   - Use your host’s rate limiting (e.g. Vercel Rate Limiting, Cloudflare, or API gateway) and/or
   - Add application-level rate limiting (e.g. by IP) with a store that works across instances (e.g. Redis) if you run multiple servers.

2. **Secrets**: Keep `RESEND_API_KEY`, `RECAPTCHA_SECRET_KEY`, `CONTACT_EMAIL`, `REFERRAL_EMAIL`, and `SANITY_API_WRITE_TOKEN` in environment variables only (e.g. Vercel env vars or your host’s secret store). Never commit them or expose them to the client.

3. **Dependencies**: Run `npm audit` regularly and address high/critical findings. Upgrade dependencies when security advisories are published.

4. **HTTPS**: Ensure the site is only served over HTTPS in production (typical when using Vercel or similar hosts).

5. **Resend “from” address**: Replace `onboarding@resend.dev` with a verified domain in Resend for both contact and referral emails.

6. **Referral form**: Consider adding reCAPTCHA (or similar) to the referral API if you see spam or abuse.

---

## Files Touched in This Audit

- `lib/security.ts` – new: `escapeHtml()`, `sanitizeFilename()`.
- `app/api/contact/route.ts` – validation, length limits, phone/email checks, HTML escaping.
- `app/api/referral/route.ts` – string extraction from FormData, length limits, HTML escaping, safe attachment filenames.
- `next.config.mjs` – security headers.

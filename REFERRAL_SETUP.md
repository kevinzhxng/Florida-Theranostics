# Referral Form Setup Guide

The referral / order form sends submissions to **your inbox** (or Microsoft 365) using the same **Resend** service as the contact form. No Cognito Forms or other third-party form service is required.

## Prerequisites

- Resend is already set up for the contact form (see [CONTACT_SETUP.md](./CONTACT_SETUP.md)).
- You need the same `RESEND_API_KEY` in `.env.local`.

## Environment Variables

Add to your `.env.local`:

```env
REFERRAL_EMAIL=referrals@yourdomain.com
```

- **REFERRAL_EMAIL** – Email address where referral/order form submissions should be sent (e.g. your work inbox or a shared referrals inbox).
- If you omit `REFERRAL_EMAIL`, the app falls back to `CONTACT_EMAIL`.

## How It Works

1. A referring provider fills out the form on `/referral`.
2. The form submits to `/api/referral` (multipart: fields + file uploads).
3. The API validates required fields, then sends one email via Resend to `REFERRAL_EMAIL` (or `CONTACT_EMAIL`).
4. The email contains:
   - Patient information  
   - Insurance  
   - Referring provider  
   - Diagnosis and reason for order  
   - Selected molecular imaging studies and radioligand therapies  
   - Optional “Your Email” as reply-to  
5. Any uploaded files (progress notes, imaging reports) are attached to that email (max 5 files, 10 MB each; total attachment size cap 25 MB).

You receive everything in your inbox and can reply from there. If you use **Microsoft 365 / Outlook**, the receiving address can be your normal work email; no extra “Microsoft cloud” setup is required for delivery to your inbox.

## File Uploads

- Accepted types: PDF, DOC, DOCX, JPG, JPEG, PNG.
- Max 5 files per submission, 10 MB per file.
- Files are attached to the referral email; you open them from your mail client.

## Optional: Microsoft Cloud (OneDrive / SharePoint)

If you later want submissions stored in **Microsoft cloud** (e.g. OneDrive or SharePoint) as well as email:

- Use **Power Automate** (Flow) to watch the inbox for referral emails and copy attachments to a OneDrive/SharePoint folder, or
- Add a separate backend step (e.g. Azure Function or API) that uploads attachments to OneDrive/SharePoint via Microsoft Graph API.

The current implementation delivers to your inbox only; adding Microsoft cloud storage would be a separate integration.

## Testing

1. Run `npm run dev`, open `/referral`.
2. Fill required fields and optionally attach files.
3. Submit and check the inbox for `REFERRAL_EMAIL` (or `CONTACT_EMAIL`).
4. Confirm the email body and any attachments look correct.

## Troubleshooting

- **Emails not received** – Confirm `REFERRAL_EMAIL` or `CONTACT_EMAIL` and `RESEND_API_KEY` in `.env.local`. Check Resend dashboard for logs.
- **Attachments missing** – Resend has attachment size limits; keep each file under 10 MB and total under 25 MB.
- **Validation errors** – Ensure all required fields (patient name, DOB, phone, height, weight, address, insurance, referring physician, signature, physician phone, diagnosis, and at least one imaging/therapy selection) are filled.

# Contact Form Setup Guide

## Email Service Setup

The contact form uses **Resend** to send emails. Here's how to set it up:

### Step 1: Get Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free)
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key

### Step 2: Add Environment Variables

Create a `.env.local` file in the root of your project:

```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=your-email@example.com
```

Replace:
- `re_your_api_key_here` with your actual Resend API key
- `your-email@example.com` with the email address where you want to receive contact form submissions

### Step 3: Verify Your Domain (Optional but Recommended)

For production, you should verify your domain with Resend:
1. In Resend dashboard, go to Domains
2. Add your domain (e.g., `floridatheranostics.com`)
3. Add the DNS records they provide
4. Once verified, update the `from` field in `app/api/contact/route.ts`:
   ```typescript
   from: "Florida Theranostics <contact@yourdomain.com>"
   ```

### Step 4: Install Dependencies

Run:
```bash
npm install
```

This will install the `resend` package.

## How It Works

1. User fills out the contact form
2. Form submits to `/api/contact` endpoint
3. API route sends email via Resend to your `CONTACT_EMAIL`
4. You receive the email with all form details
5. You can reply directly to the email (reply-to is set to the user's email)

## Form Fields

- **Name** (required)
- **Email** (required)
- **Phone** (optional)
- **Message** (required)

## Testing

1. Start your dev server: `npm run dev`
2. Go to `/contact`
3. Fill out the form
4. Check your email inbox

## Alternative Email Services

If you prefer a different service, you can replace Resend with:
- **SendGrid** - Similar setup, also has free tier
- **Nodemailer** - Direct SMTP, requires email server
- **Formspree** - No-code solution, but less control

## Troubleshooting

- **Emails not sending**: Check that `RESEND_API_KEY` is set correctly
- **API errors**: Check the browser console and server logs
- **Rate limits**: Resend free tier allows 100 emails/day

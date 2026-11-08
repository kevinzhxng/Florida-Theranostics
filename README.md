# Florida Theranostics

A modern medical website for Florida Theranostics — molecular imaging and theranostics in South Florida. Built with Next.js, Sanity CMS, and Tailwind CSS.

**Live site:** [floridatheranostics.com](https://floridatheranostics.com)

---

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Sanity CMS** – content for hero, pages, team, and site settings
- **Resend** – contact, referral, and chat form emails (requires verified domain for production)
- **reCAPTCHA v2** – bot protection on contact and referral forms
- **GoDaddy Conversations (Reamaze)** – optional live chat widget; see **CHAT_SETUP.md**
- **GSAP** – hero and scroll animations

---

## Prerequisites

- **Node.js 18+**
- **npm** (or yarn)

---

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd florida-theranostics
npm install
```

### 2. Environment variables

Create **`.env.local`** in the project root with:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes (for CMS) | Sanity project ID from [sanity.io/manage](https://sanity.io/manage) |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Sanity dataset (default: `production`) |
| `RESEND_API_KEY` | Yes (for forms) | From [resend.com](https://resend.com) – contact, referral & chat emails |
| `RESEND_FROM` | Yes (for production) | Sender address on a **verified** Resend domain (e.g. `Florida Theranostics <contact@updates.floridatheranostics.com>`). Without this, Resend only allows sending to your own email (testing). See **RESEND_SETUP.md**. |
| `CONTACT_EMAIL` | Yes (for contact) | Email that receives contact form submissions (e.g. `MD@floridatheranostics.com`) |
| `REFERRAL_EMAIL` | No | Referral form recipient (falls back to `CONTACT_EMAIL`) |
| `CHAT_EMAIL` | No | Email for chat API (falls back to `CONTACT_EMAIL`). Not used if GoDaddy chat is enabled. |
| `NEXT_PUBLIC_USE_GODADDY_CHAT` | No | Set to `true` to use GoDaddy Conversations chat widget. Config in `lib/godaddy-chat-config.ts`. See **CHAT_SETUP.md**. |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | No (recommended) | reCAPTCHA site key – contact/referral bot protection |
| `RECAPTCHA_SECRET_KEY` | No | reCAPTCHA secret (required if site key is set) |
| `NEXT_PUBLIC_GOOGLE_TAG_ID` | No | Google tag / GA4 / Ads / GTM ID. Accepts `G-XXXXXXX` (GA4), `AW-XXXXXXX` (Ads), `DC-XXXXXXX` (Floodlight), or `GTM-XXXXXXX` (Tag Manager). If unset, no tag is loaded. |
| `SANITY_API_WRITE_TOKEN` | No | Sanity token with write access – for seed scripts only |

See **RESEND_SETUP.md** (Resend account, domain verification, `RESEND_FROM`), **CHAT_SETUP.md**, and **CONTACT_RECAPTCHA_SETUP.md** for step-by-step setup. Do not commit `.env.local`.

### 3. Run the website

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Run Sanity Studio (CMS) locally

In a second terminal:

```bash
cd studio
npm install
```

Create **`studio/.env`** with at least:

```env
SANITY_STUDIO_PROJECT_ID=<same as NEXT_PUBLIC_SANITY_PROJECT_ID>
SANITY_STUDIO_DATASET=production
```

Then:

```bash
npm run dev
```

Open [http://localhost:3333](http://localhost:3333) and log in with your Sanity account to edit content.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seed:sanity` | Seed team, site settings, and About Us page from defaults |
| `npm run seed:all` | Seed all pages + site settings + team (full site content into CMS) |

Seed scripts require `SANITY_API_WRITE_TOKEN` in `.env.local`.

---

## Project Structure

```
florida-theranostics/
├── app/
│   ├── api/
│   │   ├── contact/     # Contact form API (Resend + reCAPTCHA)
│   │   ├── referral/    # Referral form API (Resend, file uploads, reCAPTCHA)
│   │   └── chat/        # Chat fallback API (Resend; used when GoDaddy chat is off)
│   ├── about-us/
│   ├── contact/
│   ├── molecular-imaging/
│   ├── referral/
│   ├── technology/
│   ├── therapies/
│   ├── layout.tsx
│   ├── page.tsx         # Home
│   └── globals.css
├── components/          # Header, Footer, Hero, sections, GoDaddy chat embed
├── lib/
│   ├── sanity.ts       # Sanity client
│   ├── sanity/         # Queries, helpers
│   ├── godaddy-chat-config.ts  # GoDaddy Conversations widget config
│   ├── security.ts     # escapeHtml, sanitizeFilename (API routes)
│   └── types.ts
├── studio/              # Sanity Studio (separate app)
│   ├── sanity.cli.ts
│   ├── sanity.config.ts
│   └── schemas/
├── scripts/             # seed-sanity.mjs, seed-all-pages.mjs
├── public/              # Images, videos
└── sanity/              # Schema definitions (mirrored for types)
```

---

## Documentation

| Doc | Purpose |
|-----|--------|
| **RESEND_SETUP.md** | New Resend account, verify domain (root or subdomain), `RESEND_FROM`, send to MD@floridatheranostics.com |
| **DOMAIN_GODADDY_VERCEL.md** | Point GoDaddy domain to Vercel (DNS A + CNAME), SSL, go-live checklist |
| **CHAT_SETUP.md** | GoDaddy Conversations widget vs email chat, AI/FAQ config |
| **CMS_SETUP.md** | Sanity project, env vars, seeding, editing content |
| **CLIENT_CMS_GUIDE.md** | Short guide for clients editing content in Studio |
| **CONTACT_SETUP.md** | Contact form and email setup |
| **CONTACT_RECAPTCHA_SETUP.md** | reCAPTCHA keys and verification |
| **REFERRAL_SETUP.md** | Referral form and email setup |
| **CLIENT_HANDOFF.md** | Checklist and steps for handing off to client |

---

## Deployment

- **Website:** Push to GitHub; connect the repo in [Vercel](https://vercel.com). In **Settings → Environment Variables**, set all variables used in production (including `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_EMAIL`, `REFERRAL_EMAIL`, `CHAT_EMAIL`, Sanity, reCAPTCHA, and `NEXT_PUBLIC_USE_GODADDY_CHAT`). Add your domain under **Settings → Domains** and point DNS at GoDaddy per **DOMAIN_GODADDY_VERCEL.md**.
- **Studio:** From `studio/` run `npx sanity login` then `npm run deploy` to host at `*.sanity.studio`.

---

## Content editing

Content is managed in **Sanity Studio**. After seeding (or creating documents manually), edit in Studio and click **Publish** so changes appear on the site. The site reads from the Sanity project configured in `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`. Site-wide contact info (address, phone, hours) is in **Site Settings** in Studio.

---

## Imaging release and editing guide

The approved page copy and original flyers are bundled as defaults. No dataset seed is required. The site uses published Sanity values when present, and uses the defaults if a document or field is missing. Unpublishing a page document restores the defaults; it does not remove the website route. Turn off **Show feature card** to remove an individual promotion without taking its page offline.

| To edit | In Sanity Studio |
| --- | --- |
| FET PET or Cardiac Imaging headings, overview, clinical/service cards, flyer and caption, referral instructions, or SEO | **Pages → FET PET — Glioma Imaging** or **Pages → Cardiac Imaging** |
| Imaging landing cards: badge, heading, description, link label, and visibility | On either service document, open **Imaging landing page** |
| FET PET title, subtitle, and description in the PET-CT grid | **Pages → FET PET — Glioma Imaging → Imaging landing page**. The flyer also supplies the thumbnail. The website inserts the listing after Amyloid PET Brain. An existing FET PET item in the Molecular Imaging document takes precedence; edit that item there if one was added manually. |
| Public physician referral email and fax | **Global → Site Settings → Contact Info**. The displayed phone and address come from the same tab. |
| Display labels for the four new form choices | **Pages → Referral → New imaging study labels**. Study identifiers and the submission flow remain fixed. |

Upload a revised flyer to change text printed inside the image. If an email, fax number, or other detail changes, update both the editable website text and the flyer artwork where it appears.

### Imaging release sequence

1. Build the site and Studio from the same code revision. Verify the Vercel preview uses the intended Sanity project and dataset. Check both landing cards and service pages on desktop and portrait mobile, including the flyers, referral links, FET PET preselection, and search metadata.
2. Confirm the existing hosted Studio target and production preview origin (`https://www.floridatheranostics.com`). Deploy the updated Studio from `studio/` with `npm run deploy` so editors see the new fields. Do not run `seed:sanity` or `seed:all`; those scripts replace existing CMS documents.
3. In Studio, open the two new entries under **Pages**, review the prefilled fields, and publish both documents. The defaults cover fields left empty, including flyers. Existing Site Settings and Referral documents only need to be changed when overriding their defaults. The website reads published content; the Studio website preview is not wired for unpublished drafts.
4. Confirm the production branch in Vercel before merging. Once the website deploys, verify the landing page, both service URLs, and `/sitemap.xml` on the production domain. Keep the previous deployment available for rollback.
5. Confirm the clinic-approved recipient for the online referral form and test delivery with synthetic information only. The public email field controls the visible email link; Vercel’s `REFERRAL_EMAIL` (or the existing `CONTACT_EMAIL` fallback) controls the actual form destination. Confirm the sender and reCAPTCHA configuration too.

The existing referral form advertises 10 MB per file, while [Vercel Functions document a 4.5 MB cap per request](https://vercel.com/docs/functions/limitations). Confirm how the clinic wants larger reports delivered and align the form with that workflow before relying on attachments. The site also runs Next.js 14.2.35, which is [outside Next.js support](https://nextjs.org/support-policy); plan the framework upgrade separately from the imaging changes.

---

## License

Proprietary – Florida Theranostics.

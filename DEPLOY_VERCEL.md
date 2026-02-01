# Deploy Florida Theranostics to Vercel + Custom Domain

Step-by-step guide to deploy your Next.js site on Vercel and use **floridatheranostics.com**.

---

## Part 1: Deploy to Vercel

### Step 1: Push your code to GitHub

1. If you haven’t already, create a repo at [github.com/new](https://github.com/new) (e.g. `florida-theranostics`).
2. From your project folder, run:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/florida-theranostics.git
   git push -u origin main
   ```
   (Use your actual GitHub username and repo name; use `main` or `master` depending on your branch.)

### Step 2: Sign in to Vercel

1. Go to [vercel.com](https://vercel.com).
2. Click **Sign Up** or **Log In**.
3. Choose **Continue with GitHub** and authorize Vercel to access your GitHub account.

### Step 3: Import your project

1. On the Vercel dashboard, click **Add New…** → **Project**.
2. Find **florida-theranostics** in the list and click **Import**.
3. **Configure Project**:
   - **Framework Preset**: Next.js (should be auto-detected).
   - **Root Directory**: leave as `.` (root).
   - **Build Command**: `next build` (default).
   - **Output Directory**: leave default.
4. **Do not** click Deploy yet—add environment variables first.

### Step 4: Add environment variables

1. On the same import screen, expand **Environment Variables**.
2. Add each variable below. For each one:
   - **Name**: exact name (e.g. `RESEND_API_KEY`).
   - **Value**: paste the value from your `.env.local` (never commit these to Git).
   - **Environment**: check **Production**, **Preview**, and **Development** (or at least Production).

Add these (use your real values; names must match exactly):

| Name | Where you use it |
|------|-------------------|
| `RESEND_API_KEY` | Contact + Referral email (Resend) |
| `CONTACT_EMAIL` | Contact form recipient |
| `REFERRAL_EMAIL` | Referral form recipient (optional; falls back to CONTACT_EMAIL) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity CMS |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity (e.g. `production`) |
| `SANITY_API_WRITE_TOKEN` | Sanity server-side (scripts / future server APIs) |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA (contact form) |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA verification (API) |

3. Click **Deploy**. Wait for the build to finish.

### Step 5: Check the live site

- When the build succeeds, Vercel shows a URL like `florida-theranostics-xxxx.vercel.app`.
- Open it and test: homepage, contact form (including reCAPTCHA), referral form, and any Sanity-driven pages.

---

## Part 2: Get and use floridatheranostics.com

You have two options: **buy the domain through Vercel** or **buy it elsewhere and connect it**.

---

### Option A: Buy the domain on Vercel (simplest)

1. In the Vercel dashboard, open your project (**florida-theranostics**).
2. Go to **Settings** → **Domains**.
3. In **Add Domain**, type: `floridatheranostics.com` and press Enter.
4. If the domain is available, Vercel will offer to **Buy Domain** (they use Namecheap/registrars). Follow the flow, pay, and Vercel will:
   - Register the domain and
   - Automatically set the right DNS records so the site is served at floridatheranostics.com.
5. SSL (HTTPS) is turned on automatically. After DNS propagates (often 5–30 minutes), your site will load at **https://floridatheranostics.com**.

**Optional:** Add `www.floridatheranostics.com` in **Domains** and set it to redirect to `floridatheranostics.com` (Vercel usually suggests this).

---

### Option B: You already own floridatheranostics.com (or buy it elsewhere)

If you buy the domain from GoDaddy, Namecheap, Google Domains, Cloudflare, etc.:

1. **Add the domain in Vercel**
   - Project → **Settings** → **Domains**.
   - Add `floridatheranostics.com` (and optionally `www.floridatheranostics.com`).

2. **See what Vercel wants**
   - After adding, Vercel shows the DNS records you need. Usually:
     - **A record**: `76.76.21.21` (or the IP Vercel shows).
     - **CNAME for www** (if you use www): `cname.vercel-dns.com` (or the target Vercel shows).

3. **Configure DNS at your registrar**
   - Log in to where you bought the domain (e.g. Namecheap, GoDaddy).
   - Open **DNS** / **Manage DNS** for floridatheranostics.com.
   - Add the A and CNAME records exactly as Vercel shows (replace any old A/CNAME for the same names).
   - Save.

4. **Wait for DNS**
   - Propagation can take from a few minutes up to 24–48 hours. Vercel will show when the domain is verified and SSL is active.

5. **Optional: Use Vercel DNS (recommended if you want Vercel to manage DNS)**
   - In **Domains**, when you add floridatheranostics.com, you may see an option to **Use Vercel DNS**.
   - You’ll get nameservers (e.g. `ns1.vercel-dns.com`). At your registrar, set the domain’s **nameservers** to those Vercel nameservers. Then Vercel can manage all DNS and auto-configure the domain.

---

## After deployment

- **Future updates**: Push to your `main` (or default) branch on GitHub; Vercel will build and deploy automatically.
- **Preview URLs**: Each pull request gets a unique preview URL so you can test before merging.
- **Env changes**: If you add or change environment variables, go to **Settings** → **Environment Variables**, edit, then trigger a **Redeploy** from the **Deployments** tab.

---

## Checklist

- [ ] Code pushed to GitHub
- [ ] Project imported in Vercel and first deploy succeeded
- [ ] All environment variables added in Vercel (no secrets in repo)
- [ ] Production URL works (contact form, referral form, reCAPTCHA)
- [ ] Domain floridatheranostics.com added (Option A or B)
- [ ] DNS set and domain verified; HTTPS works at https://floridatheranostics.com

If you tell me whether you prefer to buy the domain on Vercel or elsewhere, I can narrow the steps to exactly what you’ll see (e.g. “only Option A” or “only Option B with Namecheap”).

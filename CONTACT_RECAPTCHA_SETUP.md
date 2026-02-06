# reCAPTCHA Setup for Contact Form

This guide walks you through adding Google reCAPTCHA to the contact form so bots can’t submit it.

---

## Step 1: Get reCAPTCHA keys from Google

1. Go to **https://www.google.com/recaptcha/admin** and sign in with your Google account.
2. Click **“+”** (Create) to register a new site.
3. Fill in:
   - **Label:** e.g. `Florida Theranostics Contact`
   - **reCAPTCHA type:** choose **“reCAPTCHA v2”** → **“I’m not a robot” Checkbox**.
   - **Domains:**
     - For local: add `localhost`.
     - For production: add your live domain (e.g. `floridatheranostics.com`).
   - Accept the reCAPTCHA terms if prompted.
4. Click **Submit**.
5. You’ll see:
   - **Site Key** (public) – used in the browser.
   - **Secret Key** (private) – used only on the server. Keep this secret.

---

## Step 2: Add environment variables

1. Open **`.env.local`** in the project root (create it if it doesn’t exist).
2. Add:

```env
# reCAPTCHA (contact form)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

3. Replace `your_site_key_here` with the **Site Key** from Step 1.  
4. Replace `your_secret_key_here` with the **Secret Key** from Step 1.  
5. Save the file. Do **not** commit `.env.local` (it should be in `.gitignore`).

For production (e.g. Vercel), add the same two variables in your hosting dashboard (Environment Variables).

---

## Step 3: How it works in this project

- **Contact form (frontend):**  
  The reCAPTCHA “I’m not a robot” checkbox is shown. When the user submits, the form sends the reCAPTCHA token along with name, email, phone, and message.

- **API route (backend):**  
  Before sending the email, the server sends the token to Google’s verify API. If verification fails (e.g. bot or invalid token), the request is rejected and no email is sent.

---

## Step 4: Test it

1. Restart the dev server: `npm run dev`.
2. Open the Contact page and submit the form **without** checking “I’m not a robot” – you should get an error asking you to complete the captcha.
3. Check the box and submit again – the form should succeed (and you should receive the email if Resend is configured).

---

## Optional: Use reCAPTCHA v3 (invisible)

If you prefer an invisible, score-based captcha instead of the checkbox:

1. In the reCAPTCHA admin, create a new site with type **reCAPTCHA v3**.
2. Use the new Site Key and Secret Key in `.env.local` (you can use different variable names or replace the v2 keys).
3. The code would need to be updated to call `grecaptcha.execute(siteKey)` and send the v3 token; the API would verify with the v3 endpoint. (Current implementation uses v2 checkbox.)

---

## Troubleshooting

- **“Invalid site key” or widget doesn’t load:**  
  Check that `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set and that the domain you’re on (e.g. `localhost` or your production domain) is listed in the reCAPTCHA admin for that key.

- **“Invalid domain for site key” on Vercel (or other hosting):**  
  1. **Exact domain:** Copy the **exact** URL from your browser when you see the error (e.g. `florida-theranostics.vercel.app`). In [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin), open your reCAPTCHA site → **Settings** → **Domains**, and add that hostname only (no `https://`, no path). If you use both `www.florida-theranostics.vercel.app` and `florida-theranostics.vercel.app`, add both.  
  2. **Preview deployments:** If you’re on a Vercel *preview* URL (e.g. `florida-theranostics-abc123-username.vercel.app`), that hostname must be added to Domains too, or test on the main production URL instead.  
  3. **Redeploy after env change:** `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is baked in at **build time**. If you added or changed it in Vercel, trigger a new **Production** deploy (Vercel → Deployments → ⋮ → Redeploy) so the new value is used.  
  4. **Right key:** In Vercel → Settings → Environment Variables, confirm the value of `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is the **Site Key** for the same reCAPTCHA configuration where you added the domain.  
  5. **Cache:** After redeploying, do a hard refresh (Ctrl+Shift+R / Cmd+Shift+R) or try in an incognito window.

- **“Missing input response” or verification fails on submit:**  
  Ensure the user checked the reCAPTCHA box before submitting, and that `RECAPTCHA_SECRET_KEY` in `.env.local` (or production env) matches the Secret Key for the same reCAPTCHA site.

- **Works locally but not in production:**  
  Add your production domain in the reCAPTCHA admin (Step 1) and set both env vars in your production environment. Then **redeploy** so the site key is embedded in the new build.

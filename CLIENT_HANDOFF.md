# Client Handoff Guide – Florida Theranostics

Use this checklist and step-by-step guide before and when handing the website off to your client. It covers access, subscriptions, the domain, and what to tell them.

---

## Part 1: Before You Hand Off (Your Checklist)

### 1. Sensitive information in the repo

- **.md files:** The markdown docs (CONTACT_SETUP.md, CMS_SETUP.md, etc.) use **placeholders** only (e.g. `your_secret_key_here`, `re_your_api_key_here`). They do **not** contain real API keys, tokens, or passwords. **Exception:** `STUDIO_DEPLOY.md` mentions the Sanity **project ID** (`a9vnfj40`). Sanity project IDs are not secret (they appear in the Studio URL and in client config), but you can replace them with “your_project_id” if you prefer.
- **.env files:** Your `.env.local` and `studio/.env` are listed in `.gitignore` and should **not** be in the repo. Confirm they are not committed:
  ```bash
  git status
  # .env.local and studio/.env should not appear as tracked
  ```

**If you ever committed real secrets (API keys, tokens) to GitHub:**

1. **Rotate those secrets immediately** (generate new keys in Resend, Sanity, reCAPTCHA, etc.) and update Vercel env vars and local `.env` files.
2. **Remove the secrets from Git history** so they are no longer in the repo:
   - Option A: Use [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) or `git filter-repo` to remove the file(s) or replace the secret string from history, then **force-push** (`git push --force`). Everyone who has cloned the repo should re-clone.
   - Option B: Create a new repo, copy the current code (without secrets), and use that as the new origin. Then rotate any secrets that might have been in the old repo.

**If you only want to remove .md files from the repo (no secrets in them):**

- Deleting the files and committing will remove them from the **current** version of the repo. They will still exist in **past commits**. If the .md files never contained real secrets, that’s fine; you don’t need to rewrite history. If you want them gone from history too, use BFG/`git filter-repo` to remove those paths from all commits, then force-push.

### 2. Confirm these are done

- [ ] Site is live on Vercel (e.g. https://florida-theranostics.vercel.app).
- [ ] Sanity Studio is deployed (e.g. https://florida-theranostics.sanity.studio).
- [ ] All Vercel environment variables are set (Resend, Sanity, reCAPTCHA, contact/referral emails).
- [ ] Contact form and referral form tested and working (including reCAPTCHA).
- [ ] You have a list of every login and subscription the client will need (see below).

---

## Part 2: Subscriptions and Costs (Tell Your Client)

Give the client a simple list of what they pay for and what’s free.

| Service | Purpose | Cost (typical) | Who pays |
|--------|---------|------------------|----------|
| **Vercel** | Hosting the website | Free (Hobby) or Pro ~$20/mo | Client |
| **Sanity** | CMS (edit content, team, pages) | Free tier (generous); paid if usage grows | Client |
| **Resend** | Sending contact/referral emails | Free tier (e.g. 3k emails/mo); paid above that | Client |
| **reCAPTCHA** | Bot protection on contact form | Free | — |
| **Domain (floridatheranostics.com)** | Custom URL | ~$10–15/year (registrar) or via Vercel | Client |

- **Vercel:** [vercel.com/pricing](https://vercel.com/pricing) – Hobby is free; Pro adds team features and higher limits.
- **Sanity:** [sanity.io/pricing](https://www.sanity.io/pricing) – Free tier is usually enough for one site; they’ll see usage in the Sanity dashboard.
- **Resend:** [resend.com/pricing](https://resend.com/pricing) – Free tier; paid if they exceed it.
- **Domain:** If they buy/transfer floridatheranostics.com (e.g. via Vercel, Namecheap, GoDaddy), they pay the registrar or Vercel.

Tell the client: *“You’ll need accounts and/or subscriptions for: Vercel (hosting), Sanity (content editing), Resend (emails), and the domain. I’ll give you the links and what to do for each.”*

---

## Part 3: Step-by-Step – Giving the Client Access

Do these in an order that makes sense (e.g. domain last if they don’t have it yet).

### Step 1: Vercel (website hosting)

1. Log in to [vercel.com](https://vercel.com) and open the **florida-theranostics** project.
2. Go to **Settings → Members** (or **Team** if it’s under a team).
3. **Invite** the client by email. They’ll get an invite to join the Vercel project/team.
4. Assign them a role (e.g. **Member** so they can see deployments and env vars; avoid “Owner” unless you’re transferring the project).
5. Tell the client:
   - “Accept the Vercel invite. You can see deployments and change env vars under Settings if needed. The site redeploys automatically when we push to the main branch (or when you do, if you give them repo access).”

If the repo is under **your** GitHub and you don’t want to give them code access, leave them as Vercel members only. If they should own the project later, you can transfer the project to their Vercel account.

### Step 2: Sanity (CMS – editing content)

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and open the **Florida Theranostics** project (or the one you use).
2. **Invite** the client: **Members** or **Project settings → Members** → **Invite** by email.
3. Give them a role that can edit content and publish (e.g. **Editor** or **Administrator** if they should manage members).
4. Tell the client:
   - “Your CMS is at **https://florida-theranostics.sanity.studio** (or the URL you deployed). Log in with the same email we invited. You can edit Site Settings, all pages (Home, About Us, Therapies, etc.), and Team Members. After editing, click **Publish** so changes go live on the website.”

No need to give them the Studio “code” or `studio/.env` unless they will run or deploy the Studio themselves.

### Step 3: Resend (contact and referral emails)

1. Log in to [resend.com](https://resend.com) and open the account that holds the **RESEND_API_KEY** used in Vercel.
2. **Invite** the client (team / members) if Resend supports it, or add their email as the **recipient** for contact/referral (via `CONTACT_EMAIL` and `REFERRAL_EMAIL` in Vercel).
3. If the client should own the account: create the API key under their account, then **you** update the Vercel env var `RESEND_API_KEY` to the new key and set `CONTACT_EMAIL` / `REFERRAL_EMAIL` to their addresses.
4. Tell the client:
   - “Contact and referral form submissions are sent via Resend. Emails go to the address we set in the project (Vercel env). If you want them to go to a different address, we update the env vars. You can log in to Resend to see sending stats and logs.”

### Step 4: reCAPTCHA (contact form)

- Keys are in Vercel as `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY`. The client doesn’t need a reCAPTCHA account unless you want them to own the keys (e.g. under their Google account). If you leave as-is, no handoff step. If you switch to their Google account, create new keys, update Vercel, and tell them: “reCAPTCHA is set up for the contact form; no action needed from you.”

### Step 5: Domain (floridatheranostics.com)

- **If the client will buy or transfer the domain:**
  1. They (or you) purchase or transfer **floridatheranostics.com** (e.g. via Vercel, Namecheap, GoDaddy, Cloudflare).
  2. In **Vercel → Project → Settings → Domains**, add **floridatheranostics.com** (and optionally **www.floridatheranostics.com**).
  3. Follow Vercel’s instructions: either **use Vercel DNS** (point the domain’s nameservers to Vercel) or add the **A** / **CNAME** records they show at the current registrar.
  4. After DNS propagates, the site will be available at https://floridatheranostics.com and Vercel will provision SSL.

- **If you already own the domain and are transferring to the client:** Use the registrar’s “transfer” or “change account” process so the client owns the domain; then they (or you) point it to Vercel as above.

Tell the client: “Once the domain is pointed to our hosting (Vercel), the site will be live at floridatheranostics.com. I’ll send you the exact DNS steps when we’re ready.”

### Step 6: GitHub (optional – code access)

- Only if the client should see or push code:
  1. Add them as a **collaborator** to the GitHub repo (or to the organization that owns the repo).
  2. Tell them: “You can clone the repo and see the code. Pushes to the main branch will trigger a new deploy on Vercel.”

Most small clients don’t need GitHub access; Vercel + Sanity is enough.

---

## Part 4: What to Send the Client (Summary)

Send them one short email or document that includes:

1. **Live site:** https://florida-theranostics.vercel.app (and later https://floridatheranostics.com when the domain is connected).
2. **CMS (Sanity Studio):** https://florida-theranostics.sanity.studio – “Log in here to edit all site content; click Publish after changes.”
3. **Subscriptions:** List (as in Part 2) and who pays: Vercel, Sanity, Resend, domain. Mention that reCAPTCHA is free.
4. **Logins:** “You’ll receive invites for Vercel and Sanity; please accept them. Resend / domain: [whatever you decided].”
5. **Support:** “For technical changes (new features, code, env vars), contact [you]. For content changes, use the CMS; for domain or DNS, we’ll do it together when you have the domain.”
6. **Docs (optional):** If you keep and share them, point the client to **CLIENT_CMS_GUIDE.md** (or a short “How to edit content” note) so they know how to use the Studio.

---

## Part 5: Quick Checklist for You

- [ ] No real secrets in the repo (or rotated and removed from history).
- [ ] Vercel env vars set and tested (contact + referral forms, reCAPTCHA).
- [ ] Client invited to Vercel and Sanity; roles assigned.
- [ ] Resend: client has access or knows where emails go; keys in Vercel.
- [ ] Client knows all subscriptions and who pays.
- [ ] Domain plan clear (client gets floridatheranostics.com; you or they add it in Vercel and set DNS).
- [ ] One handoff email/doc sent with URLs, logins, and support contact.

After that, you’re ready to hand off. When the client has the domain, add it in Vercel and complete DNS; no code changes needed.

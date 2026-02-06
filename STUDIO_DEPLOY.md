# Get Sanity Studio Working (After Vercel Deploy)

Your site is live at **https://florida-theranostics.vercel.app**. To edit content (hero, pages, team, etc.) you need the **Sanity Studio** running and pointed at your production site.

## Option 1: Deploy Studio to Sanity’s hosting (recommended)

This gives you a permanent Studio URL (e.g. `florida-theranostics.sanity.studio`) that you and your client can use from anywhere.

### 1. Set preview URL for production

So the Studio’s **“Preview website”** tab shows your Vercel site instead of localhost:

- Open **`studio/.env`** (create it if needed).
- Set the preview origin to your live site:

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PREVIEW_ORIGIN=https://florida-theranostics.vercel.app
```

Use your actual Project ID if it’s different. Do **not** commit `.env` if it contains secrets.

### 2. Deploy the Studio

From your machine (with the repo and the `studio/.env` above):

```bash
cd studio
npm install
npm run deploy
```

- When prompted, log in with your **Sanity** account (sanity.io).
- Choose a hostname (e.g. `florida-theranostics`) if asked.
- When it finishes, you’ll get a URL like **https://florida-theranostics.sanity.studio**.

### 3. Use the Studio

1. Open **https://florida-theranostics.sanity.studio** (or the URL from step 2).
2. Log in with the same Sanity account.
3. Edit **Content → Global → Site Settings**, **Content → Pages → Home**, etc.
4. Click **↑ Publish** after editing so changes show on the site.
5. Use **“Preview website”** in the Studio to see your Vercel site in an iframe.

Content is stored in Sanity’s cloud; [florida-theranostics.vercel.app](https://florida-theranostics.vercel.app) already reads from it via `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in Vercel.

---

## Option 2: Run Studio locally only

If you don’t deploy the Studio, you can still edit content by running it on your computer:

```bash
cd studio
npm install
```

In **`studio/.env`** set:

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PREVIEW_ORIGIN=https://florida-theranostics.vercel.app
```

Then:

```bash
npm run dev
```

Open **http://localhost:3333**, log in to Sanity, and edit. The same content will appear on the Vercel site. Only you can access the Studio when it’s running locally.

---

## Summary

| Goal                         | Action                                                                 |
|-----------------------------|------------------------------------------------------------------------|
| Edit content from anywhere  | Deploy Studio: `cd studio` → set `SANITY_STUDIO_PREVIEW_ORIGIN` in `.env` → `npm run deploy` |
| Preview tab = Vercel site   | `SANITY_STUDIO_PREVIEW_ORIGIN=https://florida-theranostics.vercel.app` |
| See changes on live site   | Edit in Studio → **↑ Publish**; site fetches from Sanity automatically  |

Your Vercel env vars (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`) are already correct for the live site; no change needed there for the Studio to work.

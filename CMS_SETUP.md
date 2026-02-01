# CMS (Sanity) Setup Guide

The site uses **Sanity** so your client can edit content (text, images, team, values) after deployment. Content is stored in Sanity’s cloud; the site fetches it and falls back to built-in content if the CMS isn’t configured.

## 1. Create a Sanity project

1. Go to [sanity.io](https://www.sanity.io) and sign up or log in.
2. Create a new project (e.g. “Florida Theranostics”).
3. Note your **Project ID** and **Dataset** (usually `production`) from the project settings.

## 2. Environment variables

Add to `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Replace `your_project_id` with the Project ID from the Sanity dashboard.

**Optional (for seeding the original team):** Add a write token so you can run the seed script:
1. In [sanity.io/manage](https://sanity.io/manage), open your project → **API** → **Tokens**.
2. Create a token with **Editor** permissions. Copy the token.
3. Add to `.env.local`: `SANITY_API_WRITE_TOKEN=your_token`

## 3. Seed content (one-time)

**Option A – Full website seed (recommended)**  
To load **all** existing website content into the CMS (Site Settings, Team Members, and every page: Home, About Us, Therapies, Molecular Imaging, Technology, Referral, Contact):

1. Ensure `.env.local` has `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_API_WRITE_TOKEN` (see step 2).
2. From the project root run: **`npm run seed:all`**
3. Open the Studio; every page under **Pages** will already contain the current site text. Edit and publish from there—no need to retype content.

**Option B – Team and About Us only**  
To load only the original team (Dr. Ashok, staff), Site Settings, and About Us page:

1. Same env as above.
2. Run: **`npm run seed:sanity`**
3. In the Studio, open **About Us Page** to see the seeded team and values.

## 4. Run the site and the Studio (separate apps)

The Studio runs as a **standalone app** (not embedded in the Next.js site) to avoid React version conflicts.

1. **Run the website:** from the project root: `npm run dev` → open **http://localhost:3000**
2. **Run the Studio:** in a second terminal:
   ```bash
   cd studio
   npm install
   npm run dev
   ```
   Then open **http://localhost:3333** (or the URL shown in the terminal). Log in with your Sanity account when prompted.

3. **Studio env:** The Studio reads from `studio/.env`. Create it if needed:
   ```env
   SANITY_STUDIO_PROJECT_ID=your_project_id
   SANITY_STUDIO_DATASET=production
   SANITY_STUDIO_PREVIEW_ORIGIN=http://localhost:3000
   ```
   `SANITY_STUDIO_PREVIEW_ORIGIN` is the website URL shown in the **Preview website** tab (use your production URL after deploy).

## 5. Add or edit content

- **Team Members**: In the Studio sidebar, open **Team Members** to add or edit people (name, title, bio, photo). After running the seed, the original team is already there.
- **About Us Page**: Open **About Us Page** to set **Chief Physician and Founder** and **Staff** (drag to reorder) and edit **Our Values**.

Until an “About Us Page” document exists and references team members, the site falls back to built-in content. After you run the seed (or create the content manually), the About page will show CMS content.

**Important:** The website only shows **published** content. After editing in the Studio, click **↑ Publish** (top right). Saving alone keeps changes as a draft—they won't appear on the site until you Publish.

**Chief Physician / Staff:** The person you pick as Chief Physician (or in Staff) must be **published** first. In the Studio: open **Team Members** → open that person → click **↑ Publish**. Then open **About Us Page** → set them as Chief Physician (or add to Staff) → click **↑ Publish**. If you only publish the About Us page but not the Team Member, the site will not show them (it falls back to defaults).

## 6. Deploy

- **Website:** Keep `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in your hosting env (e.g. Vercel).
- **Studio:** Deploy the Studio so the client can edit content:
  - From the `studio` folder run: `npm run deploy` (follow Sanity’s prompts to host at `yourproject.sanity.studio`), **or**
  - Use [Sanity’s hosted Studio](https://www.sanity.io/docs/deployment). The client then edits at the Studio URL (e.g. `florida-theranostics.sanity.studio`), not on your website domain.

## Troubleshooting

- **About page still shows defaults**: (1) The site only reads **published** content—open About Us Page and click **↑ Publish**, then refresh. (2) The **Team Member** you set as Chief Physician (or in Staff) must also be published: open **Team Members** → open that person → **↑ Publish**, then set them on About Us Page and **↑ Publish** the About Us Page again.
- **No CMS content on About page**: Ensure you created an “About Us Page” document and set Chief Physician (and optionally Staff and Values). Publish each Team Member first, then publish the About Us Page.
- **Images not loading**: The app is configured to load images from `cdn.sanity.io`. If you use a different Sanity image host, update `next.config.mjs` `images.remotePatterns`.
- **Studio not loading**: Run the Studio from the `studio` folder (`cd studio && npm run dev`) and open the URL it prints (e.g. http://localhost:3333). Ensure `studio/.env` has `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` (or the `NEXT_PUBLIC_*` equivalents) matching your Sanity project.

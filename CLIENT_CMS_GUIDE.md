# How to Edit the Website (Florida Theranostics)

You can update **text and images** for the About Us page (team, values) without touching code. This guide is for the person who will edit the site (e.g. the doctor or office manager).

---

## Quick start: 3 steps

1. **Open the CMS** – Your developer will give you a link (e.g. `http://localhost:3333` or `https://yourproject.sanity.studio`). Log in with your Sanity account.
2. **Edit** – In the left sidebar, click **About Us Page** (to edit who appears and the values) or **Team Members** (to add or edit people). Make your changes.
3. **Publish** – Click the green **↑ Publish** button (top right). Only published content appears on the website.

4. **Refresh the website** – The site does **not** update in real time. After publishing, refresh the website page (e.g. open the About Us page and press F5 or Cmd+R) to see your changes.

---

## See your changes: Preview website tab

At the top of the Studio you’ll see two tabs: **Content** and **Preview website**.

- Click **Preview website** to see your live site in a panel next to the editor.
- After you click **Publish**, refresh the preview (or refresh the website in another tab) to see your updates. The site is not real-time—you must refresh to see changes.
- If you see "Unable to connect," open the website in a separate tab (`http://localhost:3000`) and refresh that tab after publishing.

---

## Where to edit

- **About Us Page** – Who appears as Chief Physician, who appears in Staff (drag to reorder), and the four “Our Values” blocks. Use the **Team** and **Our Values** tabs in the form to switch sections.
- **Team Members** – Add or edit people (name, title, bio, photo). New people must be added here before you can pick them on the About Us Page.

---

## What you can edit (About Us)

### 1. Team members

- Click **Team Members** in the sidebar (or **About Us Page** to edit who appears on the site).
- You’ll see a list of people. Click one to edit, or **Create new** to add someone.
- For each person you can change:
  - **Name**
  - **Title / Role** (e.g. “Founder & Chief Physician”, “Clinical Coordinator”)
  - **Bio** (the paragraph under their name)
  - **Photo** (click the image area to upload a new image or change the current one)
- **Save** (e.g. Ctrl+S or Cmd+S) when you’re done.

### 2. Who appears as “Chief Physician” vs “Staff”

- In the left sidebar, open **About Us Page**.
- There should be a single “About Us Page” document. Open it.
- **Chief Physician and Founder:** Use the dropdown to pick the **one** person who is the chief physician (e.g. Dr. Ashok MuthuKrishnan). Only one person should be selected here.
- **Staff:** Use the list to add and reorder everyone else. The order here is the order they appear on the site. Add references to the Team Members you want in the “Staff” section.

### 3. “Our Values” (four value blocks)

- In the same **About Us Page** document, find the **Our Values** section.
- You’ll see a list of values (e.g. “Patient-Centric Care”, “Excellence & Innovation”). Click one to expand it.
- Edit **Title** and **Description** for each value as you like.
- You can add or remove value blocks using the list controls.

---

## Replacing images

- **Team photos:** Edit the **Team Member** document and use the **Photo** field to upload a new image or replace the existing one. Click **↑ Publish** on that Team Member; then refresh the website to see the update.
- **Other images** (e.g. hero images on other pages): Right now only the About Us team and values are editable in the CMS. If you need to change images on other pages, ask your developer to connect those sections to the CMS as well.

---

## Saving and seeing changes

- Always **Save** (e.g. Ctrl+S / Cmd+S) in the Studio after editing.
- The live site will show your changes after the next load (and after any cache refresh your host uses). If you don’t see updates, try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R) or wait a minute.

---

## Need help?

- If you can’t log in or don’t see “Team Member” or “About Us Page,” ask your developer to check your Sanity project and user permissions.
- For new types of content (e.g. editing Therapies or Contact page text), your developer can add more sections to the CMS using the same system.

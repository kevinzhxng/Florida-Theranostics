import { defineConfig } from "sanity";
import { defineDocuments, presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "";
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

const previewOrigin =
  process.env.SANITY_STUDIO_PREVIEW_ORIGIN || "http://localhost:3000";

export default defineConfig({
  name: "florida-theranostics",
  title: "Florida Theranostics",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // —— Global ——
            S.listItem()
              .title("🌐 Global")
              .id("global")
              .child(
                S.list()
                  .title("Global")
                  .items([
                    S.listItem()
                      .title("Site Settings")
                      .id("siteSettings")
                      .child(
                        S.document()
                          .schemaType("siteSettings")
                          .documentId("siteSettings")
                      ),
                  ])
              ),
            S.divider(),
            // —— Pages ——
            S.listItem()
              .title("📄 Pages")
              .id("pages")
              .child(
                S.list()
                  .title("Pages")
                  .items([
                    S.listItem()
                      .title("Home")
                      .id("homePage")
                      .child(
                        S.document()
                          .schemaType("homePage")
                          .documentId("homePage")
                      ),
                    S.listItem()
                      .title("About Us")
                      .id("aboutPage")
                      .child(
                        S.document()
                          .schemaType("aboutPage")
                          .documentId("aboutPage")
                      ),
                    S.listItem()
                      .title("Therapies")
                      .id("therapiesPage")
                      .child(
                        S.document()
                          .schemaType("therapiesPage")
                          .documentId("therapiesPage")
                      ),
                    S.listItem()
                      .title("Molecular Imaging")
                      .id("molecularImagingPage")
                      .child(
                        S.document()
                          .schemaType("molecularImagingPage")
                          .documentId("molecularImagingPage")
                      ),
                    S.listItem()
                      .title("Technology")
                      .id("technologyPage")
                      .child(
                        S.document()
                          .schemaType("technologyPage")
                          .documentId("technologyPage")
                      ),
                    S.listItem()
                      .title("Referral")
                      .id("referralPage")
                      .child(
                        S.document()
                          .schemaType("referralPage")
                          .documentId("referralPage")
                      ),
                    S.listItem()
                      .title("Contact")
                      .id("contactPage")
                      .child(
                        S.document()
                          .schemaType("contactPage")
                          .documentId("contactPage")
                      ),
                  ])
              ),
            S.divider(),
            // —— Content (shared) ——
            S.listItem()
              .title("👥 Team Members")
              .id("teamMembers")
              .child(
                S.documentTypeList("teamMember")
                  .title("Team Members")
                  .defaultOrdering([{ field: "name", direction: "asc" }])
              ),
          ]),
    }),
    presentationTool({
      title: "Preview website",
      previewUrl: {
        initial: `${previewOrigin}/`,
      },
      allowOrigins: ["http://localhost:*"],
      resolve: {
        mainDocuments: defineDocuments([
          { route: "/", type: "homePage" },
          { route: "/about-us", type: "aboutPage" },
          { route: "/therapies", type: "therapiesPage" },
          { route: "/molecular-imaging", type: "molecularImagingPage" },
          { route: "/technology", type: "technologyPage" },
          { route: "/referral", type: "referralPage" },
          { route: "/contact", type: "contactPage" },
        ]),
      },
    }),
  ],
  schema: { types: schemaTypes },
});

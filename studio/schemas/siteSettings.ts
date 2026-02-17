import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "branding", title: "Branding & Logo", default: true },
    { name: "navbar", title: "Navbar" },
    { name: "footer", title: "Footer" },
    { name: "contact", title: "Contact Info (site-wide)" },
  ],
  fields: [
    // Branding
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      group: "branding",
      initialValue: "Florida Theranostics",
      description: "Used in browser tab and meta.",
    }),
    defineField({
      name: "logoLine1",
      title: "Logo text (line 1)",
      type: "string",
      group: "branding",
      initialValue: "Florida",
    }),
    defineField({
      name: "logoLine2",
      title: "Logo text (line 2)",
      type: "string",
      group: "branding",
      initialValue: "Theranostics",
    }),
    defineField({
      name: "logo",
      title: "Logo image",
      type: "image",
      group: "branding",
      options: { hotspot: true },
    }),
    defineField({
      name: "defaultMetaDescription",
      title: "Default meta description",
      type: "text",
      group: "branding",
    }),
    // Navbar
    defineField({
      name: "navMainLinks",
      title: "Main nav links (About Us, Therapies, etc.)",
      type: "array",
      group: "navbar",
      of: [{ type: "navLink" }],
      description: "Order = order in navbar.",
    }),
    defineField({
      name: "navPatientPortalLabel",
      title: "Patient Portal link label",
      type: "string",
      group: "navbar",
      initialValue: "Patient Portal",
    }),
    defineField({
      name: "navPatientPortalHref",
      title: "Patient Portal URL",
      type: "url",
      group: "navbar",
      description: "e.g. https://mycw174.ecwcloud.com/...",
    }),
    defineField({
      name: "navContactLabel",
      title: "Contact button label",
      type: "string",
      group: "navbar",
      initialValue: "Contact Us",
    }),
    // Footer
    defineField({
      name: "footerTagline",
      title: "Footer tagline",
      type: "text",
      group: "footer",
      initialValue: "Advanced Radioligand Therapy, Providing Patient-Centered Nuclear Medicine Care",
    }),
    defineField({
      name: "footerNavTitle",
      title: "Footer “Navigate” section title",
      type: "string",
      group: "footer",
      initialValue: "Navigate",
    }),
    defineField({
      name: "footerResourcesTitle",
      title: "Footer “Resources” section title",
      type: "string",
      group: "footer",
      initialValue: "Resources",
    }),
    defineField({
      name: "footerContactTitle",
      title: "Footer “Contact” section title",
      type: "string",
      group: "footer",
      initialValue: "Contact",
    }),
    defineField({
      name: "footerCopyright",
      title: "Copyright text",
      type: "string",
      group: "footer",
      initialValue: "Florida Theranostics. All rights reserved.",
    }),
    // Contact (used in footer and Contact page)
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      group: "contact",
      description: "e.g. 431 University Blvd. (new line) Jupiter, FL 33458",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "text",
      group: "contact",
      description: "e.g. Mon - Fri: 8:00 AM - 5:00 PM\\nSat & Sun: Closed",
    }),
  ],
  preview: {
    select: { siteTitle: "siteTitle" },
    prepare({ siteTitle }) {
      return { title: "Site Settings", subtitle: siteTitle || "Global nav, footer, contact" };
    },
  },
});

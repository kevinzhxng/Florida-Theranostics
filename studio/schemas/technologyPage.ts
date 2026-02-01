import { defineField, defineType } from "sanity";

export const technologyPage = defineType({
  name: "technologyPage",
  title: "Technology Page",
  type: "document",
  groups: [
    { name: "section1", title: "Section 1 (uMI Panorama)", default: true },
    { name: "section2", title: "Section 2 (VERITON-CT)" },
    { name: "cta", title: "Bottom CTA" },
  ],
  fields: [
    defineField({
      name: "section1Title",
      title: "Section 1 title",
      type: "string",
      group: "section1",
      initialValue: "uMI Panorama PET/CT",
    }),
    defineField({ name: "section1Body", title: "Section 1 body", type: "text", group: "section1" }),
    defineField({ name: "section1Bullets", title: "Section 1 bullet points", type: "array", group: "section1", of: [{ type: "string" }] }),
    defineField({ name: "section1Image", title: "Section 1 image", type: "image", group: "section1", options: { hotspot: true } }),
    defineField({
      name: "section2Title",
      title: "Section 2 title",
      type: "string",
      group: "section2",
      initialValue: "VERITON-CT SPECT/CT",
    }),
    defineField({ name: "section2Body", title: "Section 2 body", type: "text", group: "section2" }),
    defineField({ name: "section2Bullets", title: "Section 2 bullet points", type: "array", group: "section2", of: [{ type: "string" }] }),
    defineField({ name: "section2Image", title: "Section 2 image", type: "image", group: "section2", options: { hotspot: true } }),
    defineField({
      name: "ctaTitle",
      title: "Bottom CTA title",
      type: "string",
      group: "cta",
      initialValue: "Experience Our Technology",
    }),
    defineField({ name: "ctaBody", title: "Bottom CTA body", type: "text", group: "cta" }),
    defineField({
      name: "ctaButtonLabel",
      title: "Bottom CTA button text",
      type: "string",
      group: "cta",
      initialValue: "Schedule a Visit",
    }),
    defineField({
      name: "ctaButtonHref",
      title: "Bottom CTA button URL",
      type: "string",
      group: "cta",
      initialValue: "/contact",
    }),
  ],
  preview: {
    select: { section1Title: "section1Title" },
    prepare({ section1Title }) {
      return { title: "Technology Page", subtitle: section1Title || "uMI Panorama, VERITON-CT, CTA" };
    },
  },
});

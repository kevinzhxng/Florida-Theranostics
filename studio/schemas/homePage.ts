import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero (top section)", default: true },
    { name: "features", title: "Smart Diagnostics / Features" },
    { name: "sections", title: "Content sections" },
    { name: "testimonials", title: "Testimonials" },
  ],
  fields: [
    // Hero
    defineField({
      name: "heroHeadline",
      title: "Hero headline",
      type: "string",
      group: "hero",
      initialValue: "Setting the Standard in Molecular imaging and Theranostics",
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero button text",
      type: "string",
      group: "hero",
      initialValue: "Schedule a Consultation",
    }),
    defineField({
      name: "heroCtaHref",
      title: "Hero button URL",
      type: "string",
      group: "hero",
      initialValue: "/contact",
    }),
    defineField({
      name: "heroVideoSrc",
      title: "Hero video path",
      type: "string",
      group: "hero",
      description: "e.g. /videos/Florida Theranostics Video 1.mp4",
    }),
    // Features
    defineField({
      name: "featuresSectionTitle",
      title: "Features section title",
      type: "string",
      group: "features",
      initialValue: "Smart Diagnostics, Customized Solutions",
    }),
    defineField({
      name: "features",
      title: "Feature cards",
      type: "array",
      group: "features",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
            { name: "href", title: "Link URL", type: "string", description: "e.g. /therapies" },
          ],
          preview: {
            select: { title: "title" },
            prepare({ title }) {
              return { title: title || "Feature" };
            },
          },
        },
      ],
    }),
    // Content sections (image + text blocks)
    defineField({
      name: "sections",
      title: "Content sections (image + text)",
      type: "array",
      group: "sections",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Section title", type: "string" },
            { name: "body", title: "Body text", type: "text" },
            { name: "imagePosition", title: "Image position", type: "string", options: { list: ["left", "right"] }, initialValue: "right" },
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
            { name: "buttonLabel", title: "Button text (optional)", type: "string" },
            { name: "buttonHref", title: "Button URL (optional)", type: "string" },
          ],
          preview: {
            select: { title: "title" },
            prepare({ title }) {
              return { title: title || "Section" };
            },
          },
        },
      ],
    }),
    // Testimonials
    defineField({
      name: "testimonialsSectionTitle",
      title: "Testimonials section title",
      type: "string",
      group: "testimonials",
      initialValue: "Hear From Our Patients",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "testimonials",
      of: [
        {
          type: "object",
          fields: [
            { name: "quote", title: "Quote", type: "text" },
            { name: "author", title: "Author name", type: "string" },
          ],
          preview: {
            select: { author: "author" },
            prepare({ author }) {
              return { title: author || "Testimonial" };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { heroHeadline: "heroHeadline" },
    prepare({ heroHeadline }) {
      return { title: "Home Page", subtitle: heroHeadline ? heroHeadline.slice(0, 50) + "…" : "Hero + features + testimonials" };
    },
  },
});

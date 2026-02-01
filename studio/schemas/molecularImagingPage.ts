import { defineField, defineType } from "sanity";

export const molecularImagingPage = defineType({
  name: "molecularImagingPage",
  title: "Molecular Imaging Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "intro", title: "Intro (Ultrafast digital PET-CT…)" },
    { name: "petCt", title: "PET-CT Imaging" },
    { name: "spectCt", title: "SPECT-CT Imaging" },
    { name: "precision", title: "Precision Medicine section" },
    { name: "dynamicPet", title: "Dynamic PET Studies" },
    { name: "cta", title: "Bottom CTA" },
  ],
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      group: "hero",
      initialValue: "Advanced Molecular PET Imaging Solutions",
    }),
    defineField({ name: "heroBody", title: "Hero body", type: "text", group: "hero" }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", group: "hero", options: { hotspot: true } }),
    defineField({
      name: "introTitle",
      title: "Intro section title",
      type: "string",
      group: "intro",
      initialValue: "Molecular Imaging with Ultrafast Digital PET-CT and SPECT-CT",
    }),
    defineField({ name: "introBody", title: "Intro body", type: "text", group: "intro" }),
    defineField({
      name: "petCtTitle",
      title: "PET-CT section title",
      type: "string",
      group: "petCt",
      initialValue: "PET-CT Imaging",
    }),
    defineField({
      name: "petCtSubtitle",
      title: "PET-CT subtitle",
      type: "string",
      group: "petCt",
      initialValue: "Positron Emission Tomography – Computed Tomography",
    }),
    defineField({
      name: "petCtModalities",
      title: "PET-CT modalities",
      type: "array",
      group: "petCt",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "subtitle", title: "Subtitle", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
          ],
          preview: { select: { name: "name" }, prepare({ name }) {
            return { title: name || "Modality" };
          } },
        },
      ],
    }),
    defineField({
      name: "spectCtTitle",
      title: "SPECT-CT section title",
      type: "string",
      group: "spectCt",
      initialValue: "SPECT-CT Nuclear Medicine Imaging",
    }),
    defineField({ name: "spectCtIntro", title: "SPECT-CT intro paragraph", type: "text", group: "spectCt" }),
    defineField({
      name: "spectCtModalities",
      title: "SPECT-CT modalities",
      type: "array",
      group: "spectCt",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "subtitle", title: "Subtitle", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
          ],
          preview: { select: { name: "name" }, prepare({ name }) {
            return { title: name || "Modality" };
          } },
        },
      ],
    }),
    defineField({
      name: "precisionTitle",
      title: "Precision Medicine section title",
      type: "string",
      group: "precision",
      initialValue: "Precision Medicine at the Forefront",
    }),
    defineField({ name: "precisionBody", title: "Precision body", type: "text", group: "precision" }),
    defineField({ name: "precisionImage", title: "Precision image", type: "image", group: "precision", options: { hotspot: true } }),
    defineField({
      name: "dynamicPetTitle",
      title: "Dynamic PET section title",
      type: "string",
      group: "dynamicPet",
      initialValue: "Dynamic PET Studies",
    }),
    defineField({ name: "dynamicPetIntro", title: "Dynamic PET intro", type: "text", group: "dynamicPet" }),
    defineField({
      name: "dynamicPetBullets",
      title: "Dynamic PET bullet points",
      type: "array",
      group: "dynamicPet",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "ctaTitle",
      title: "Bottom CTA title",
      type: "string",
      group: "cta",
      initialValue: "Book Your Appointment",
    }),
    defineField({ name: "ctaBody", title: "Bottom CTA body", type: "text", group: "cta" }),
    defineField({
      name: "ctaButtonLabel",
      title: "Bottom CTA button text",
      type: "string",
      group: "cta",
      initialValue: "Schedule Now",
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
    select: { heroTitle: "heroTitle" },
    prepare({ heroTitle }) {
      return { title: "Molecular Imaging Page", subtitle: heroTitle || "PET-CT, SPECT-CT, CTA" };
    },
  },
});

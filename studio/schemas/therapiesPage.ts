import { defineField, defineType } from "sanity";

export const therapiesPage = defineType({
  name: "therapiesPage",
  title: "Therapies Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero section", default: true },
    { name: "therapies", title: "Our Therapies list" },
    { name: "prrt", title: "PRRT section" },
    { name: "goal", title: "Our Goal section" },
    { name: "cta", title: "Bottom CTA" },
  ],
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      group: "hero",
      initialValue: "Advanced Theranostic Services",
    }),
    defineField({ name: "heroBody", title: "Hero body", type: "text", group: "hero" }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", group: "hero", options: { hotspot: true } }),
    defineField({
      name: "therapiesSectionTitle",
      title: "Therapies section title",
      type: "string",
      group: "therapies",
      initialValue: "Our Therapies",
    }),
    defineField({
      name: "therapiesList",
      title: "Therapies",
      type: "array",
      group: "therapies",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name (e.g. Pluvicto®)", type: "string" },
            { name: "subtitle", title: "Subtitle (e.g. Lutetium-177 PSMA)", type: "string" },
            { name: "description", title: "Description", type: "text" },
          ],
          preview: { select: { name: "name" }, prepare({ name }) {
            return { title: name || "Therapy" };
          } },
        },
      ],
    }),
    defineField({
      name: "prrtTitle",
      title: "PRRT section title",
      type: "string",
      group: "prrt",
      initialValue: "Innovative PRRT Treatments",
    }),
    defineField({ name: "prrtBody", title: "PRRT body (rich text / bullets)", type: "text", group: "prrt" }),
    defineField({ name: "prrtImage", title: "PRRT image", type: "image", group: "prrt", options: { hotspot: true } }),
    defineField({
      name: "goalTitle",
      title: "Our Goal section title",
      type: "string",
      group: "goal",
      initialValue: "Our Goal",
    }),
    defineField({ name: "goalIntro", title: "Our Goal intro paragraph", type: "text", group: "goal" }),
    defineField({
      name: "goalBullets",
      title: "Our Goal bullet points",
      type: "array",
      group: "goal",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "ctaTitle",
      title: "Bottom CTA title",
      type: "string",
      group: "cta",
      initialValue: "Deeper Health Insights With Molecular Imaging",
    }),
    defineField({ name: "ctaBody", title: "Bottom CTA body", type: "text", group: "cta" }),
    defineField({
      name: "ctaButtonLabel",
      title: "Bottom CTA button text",
      type: "string",
      group: "cta",
      initialValue: "Explore Our Imaging Capabilities",
    }),
    defineField({
      name: "ctaButtonHref",
      title: "Bottom CTA button URL",
      type: "string",
      group: "cta",
      initialValue: "/molecular-imaging",
    }),
  ],
  preview: {
    select: { heroTitle: "heroTitle" },
    prepare({ heroTitle }) {
      return { title: "Therapies Page", subtitle: heroTitle || "Hero, therapies list, PRRT, CTA" };
    },
  },
});

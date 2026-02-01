import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Us Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero section (Pioneering Radiopharmaceutical…)", default: true },
    { name: "team", title: "Team (Chief Physician & Staff)" },
    { name: "values", title: "Our Values" },
    { name: "cta", title: "Bottom CTA (Partners in Advanced Care)" },
  ],
  fields: [
    // Hero: Pioneering Radiopharmaceutical Therapies
    defineField({
      name: "heroTitle",
      title: "Hero section title",
      type: "string",
      group: "hero",
      initialValue: "Pioneering Radiopharmaceutical Therapies",
    }),
    defineField({
      name: "heroBody",
      title: "Hero body text",
      type: "text",
      group: "hero",
      description: "Paragraph(s) above the button.",
    }),
    defineField({
      name: "heroButtonLabel",
      title: "Hero button text",
      type: "string",
      group: "hero",
      initialValue: "Start the Conversation",
    }),
    defineField({
      name: "heroButtonHref",
      title: "Hero button URL",
      type: "string",
      group: "hero",
      initialValue: "/contact",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
    }),
    // Team
    defineField({
      name: "chiefPhysician",
      title: "Chief Physician and Founder",
      type: "reference",
      to: [{ type: "teamMember" }],
      weak: true,
      group: "team",
      description: "Pick the one person. Publish the Team Member first, then select here.",
    }),
    defineField({
      name: "staffMembers",
      title: "Staff",
      type: "array",
      of: [{ type: "reference", to: [{ type: "teamMember" }], weak: true }],
      group: "team",
      options: { sortable: true },
    }),
    defineField({
      name: "values",
      title: "Our Values",
      type: "array",
      group: "values",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
          ],
        },
      ],
      options: { sortable: true },
    }),
    // Bottom CTA
    defineField({
      name: "ctaTitle",
      title: "Bottom CTA title",
      type: "string",
      group: "cta",
      initialValue: "Your Partners in Advanced Care",
    }),
    defineField({
      name: "ctaBody",
      title: "Bottom CTA body",
      type: "text",
      group: "cta",
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "Bottom CTA button text",
      type: "string",
      group: "cta",
      initialValue: "Collaborate on Patient Care",
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
    select: { chiefName: "chiefPhysician.name", staffCount: "staffMembers" },
    prepare({ chiefName, staffCount }) {
      const count = Array.isArray(staffCount) ? staffCount.length : 0;
      return {
        title: "About Us Page",
        subtitle: chiefName ? `Chief: ${chiefName} • ${count} staff` : count ? `${count} staff` : "Hero, team, values",
      };
    },
  },
});

import { defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  description: "One person who can appear on the About Us page (as Chief Physician or in Staff).",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (R) => R.required(), description: "Full name as shown on the website." },
    { name: "title", title: "Title / Role", type: "string", validation: (R) => R.required(), description: "e.g. Founder & Chief Physician, Clinical Coordinator." },
    { name: "bio", title: "Bio", type: "text", validation: (R) => R.required(), description: "Short paragraph shown under their name." },
    {
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description: "Click to upload or replace. Used on the About Us page.",
    },
  ],
  preview: {
    select: { title: "name", subtitle: "title" },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
});

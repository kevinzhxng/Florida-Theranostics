import { defineType, defineArrayMember } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (R) => R.required() },
    { name: "title", title: "Title / Role", type: "string", validation: (R) => R.required() },
    { name: "bio", title: "Bio", type: "text", validation: (R) => R.required() },
    {
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    },
  ],
  preview: {
    select: { title: "name", subtitle: "title" },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
});

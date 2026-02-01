import { defineField, defineType } from "sanity";

export const navLink = defineType({
  name: "navLink",
  title: "Nav Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (R) => R.required() }),
    defineField({ name: "href", title: "URL (e.g. /about-us)", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "isExternal",
      title: "Opens in new tab",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { label: "label" },
    prepare({ label }) {
      return { title: label || "Link" };
    },
  },
});

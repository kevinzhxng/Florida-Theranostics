import { defineField, defineType } from "sanity";

export const ctaButton = defineType({
  name: "ctaButton",
  title: "Button",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Button text", type: "string", validation: (R) => R.required() }),
    defineField({ name: "href", title: "URL (e.g. /contact)", type: "string", validation: (R) => R.required() }),
  ],
  preview: {
    select: { label: "label" },
    prepare({ label }) {
      return { title: label || "Button" };
    },
  },
});

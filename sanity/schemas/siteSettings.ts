import { defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "title", title: "Site Title", type: "string", initialValue: "Florida Theranostics" },
    { name: "description", title: "Default Meta Description", type: "text" },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    },
    { name: "address", title: "Address", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
    { name: "hours", title: "Hours", type: "text" },
  ],
});

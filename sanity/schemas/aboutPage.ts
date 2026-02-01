import { defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Us Page",
  type: "document",
  fields: [
    {
      name: "chiefPhysician",
      title: "Chief Physician and Founder",
      type: "reference",
      to: [{ type: "teamMember" }],
      description: "The single chief physician (e.g. Dr. Ashok MuthuKrishnan).",
    },
    {
      name: "staffMembers",
      title: "Staff",
      type: "array",
      of: [{ type: "reference", to: [{ type: "teamMember" }] }],
      description: "All other team members (order = display order).",
    },
    {
      name: "values",
      title: "Our Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
          ],
        },
      ],
    },
  ],
});

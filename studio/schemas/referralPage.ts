import { defineField, defineType } from "sanity";

export const referralPage = defineType({
  name: "referralPage",
  title: "Referral Page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page title",
      type: "string",
      initialValue: "Referrals & Order Forms",
    }),
    defineField({
      name: "pageSubtitle",
      title: "Page subtitle",
      type: "string",
      initialValue: "For referring providers · FLT Molecular Imaging and Therapy Ordering Form (HIPAA-compliant)",
    }),
    defineField({
      name: "phoneNumbers",
      title: "Phone numbers (displayed at top)",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g. (561) 847-3797, (561) 600-4476",
    }),
    defineField({
      name: "successMessage",
      title: "Success message after submit",
      type: "string",
      initialValue: "Thank you. Your referral has been submitted. We will process it and contact you as needed.",
    }),
  ],
  preview: {
    select: { pageTitle: "pageTitle" },
    prepare({ pageTitle }) {
      return { title: "Referral Page", subtitle: pageTitle || "Form intro and phone numbers" };
    },
  },
});

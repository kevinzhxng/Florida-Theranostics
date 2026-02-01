import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page title",
      type: "string",
      initialValue: "Contact Us",
    }),
    defineField({
      name: "introParagraph",
      title: "Intro paragraph",
      type: "text",
      initialValue: "We're here to help. Reach out to schedule a consultation or learn more about our services.",
    }),
    defineField({
      name: "formHeading",
      title: "Form heading",
      type: "string",
      initialValue: "Send a Message",
    }),
    defineField({
      name: "submitButtonLabel",
      title: "Submit button text",
      type: "string",
      initialValue: "Send Message",
    }),
    defineField({
      name: "successMessage",
      title: "Success message after submit",
      type: "string",
      initialValue: "Thank you! Your message has been sent. We'll get back to you soon.",
    }),
    defineField({
      name: "overrideAddress",
      title: "Override address (leave blank to use Site Settings)",
      type: "text",
    }),
    defineField({
      name: "overridePhone",
      title: "Override phone (leave blank to use Site Settings)",
      type: "string",
    }),
    defineField({
      name: "overrideHours",
      title: "Override hours (leave blank to use Site Settings)",
      type: "text",
    }),
  ],
  preview: {
    select: { pageTitle: "pageTitle" },
    prepare({ pageTitle }) {
      return { title: "Contact Page", subtitle: pageTitle || "Intro and form labels" };
    },
  },
});

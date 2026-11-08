import { defineField, defineType } from "sanity";
import { imagingPages, type ImagingPageKey } from "../../lib/imaging-content";

function imagingServiceSchema(key: ImagingPageKey) {
  const page = imagingPages[key];
  return defineType({
    name: page.pageType,
    title: page.title,
    type: "document",
    groups: [
      { name: "hero", title: "Introduction", default: true },
      { name: "details", title: key === "fet-pet" ? "Clinical indications" : "Cardiac services" },
      { name: "landing", title: "Imaging landing page" },
      { name: "referral", title: "Physician referral" },
      { name: "seo", title: "Search & sharing" },
    ],
    initialValue: {
      eyebrow: page.eyebrow,
      title: page.title,
      intro: page.intro,
      leadTitle: page.leadTitle,
      leadBody: page.leadBody,
      leadLabel: page.leadLabel,
      ...(key === "fet-pet" ? {
        mriComparison: page.mriComparison,
        petComparison: page.petComparison,
        petListingTitle: page.petListingTitle,
        petListingSubtitle: page.petListingSubtitle,
        petListingDescription: page.petListingDescription,
      } : {}),
      detailsTitle: page.detailsTitle,
      detailsIntro: page.detailsIntro,
      details: page.details.map((detail, index) => ({ _key: `detail-${index}`, ...detail })),
      referralIntro: page.referralIntro,
      referralLabel: page.referralLabel,
      referralTitle: page.referralTitle,
      clinicalNote: page.clinicalNote,
      posterAlt: page.posterAlt,
      posterCaption: page.posterCaption,
      seoTitle: page.seoTitle,
      seoDescription: page.seoDescription,
      showFeature: page.showFeature,
      featureLabel: page.featureLabel,
      featureTitle: page.featureTitle,
      featureDescription: page.featureDescription,
      featureLinkLabel: page.featureLinkLabel,
    },
    fields: [
      defineField({ name: "eyebrow", title: "Small introduction label", type: "string", group: "hero" }),
      defineField({ name: "title", title: "Page heading", type: "string", group: "hero", validation: (R) => R.required() }),
      defineField({ name: "intro", title: "Introduction", type: "text", group: "hero", validation: (R) => R.required() }),
      defineField({ name: "poster", title: "Physician flyer / newsletter", type: "image", group: "hero", description: "Replaces the supplied flyer on the page and its thumbnails on the imaging landing page. The original upload is linked for full-size viewing." }),
      defineField({ name: "posterAlt", title: "Flyer image description (accessibility)", type: "text", group: "hero" }),
      defineField({ name: "posterCaption", title: "Flyer caption", type: "text", group: "hero" }),
      defineField({ name: "leadTitle", title: "Overview heading", type: "string", group: "details" }),
      defineField({ name: "leadLabel", title: "Small overview label", type: "string", group: "details" }),
      defineField({ name: "leadBody", title: "Overview text", type: "text", group: "details" }),
      ...(key === "fet-pet" ? [
        defineField({ name: "mriComparison", title: "MRI comparison text", type: "text", group: "details" }),
        defineField({ name: "petComparison", title: "FET PET comparison text", type: "text", group: "details" }),
      ] : []),
      defineField({ name: "detailsTitle", title: "Cards section heading", type: "string", group: "details" }),
      defineField({ name: "detailsIntro", title: "Cards section introduction", type: "text", group: "details" }),
      defineField({
        name: "details", title: key === "fet-pet" ? "Clinical indication cards" : "Cardiac service cards", type: "array", group: "details",
        of: [{ type: "object", name: "imagingDetail", fields: [
          defineField({ name: "title", title: "Heading", type: "string", validation: (R) => R.required() }),
          defineField({ name: "body", title: "Text", type: "text", validation: (R) => R.required() }),
        ], preview: { select: { title: "title" } } }],
      }),
      defineField({ name: "showFeature", title: "Show feature card", type: "boolean", group: "landing", description: "Turning this off hides the feature card only; the service page and PET-CT listing stay online." }),
      defineField({ name: "featureLabel", title: "Feature badge", type: "string", group: "landing" }),
      defineField({ name: "featureTitle", title: "Feature card heading", type: "string", group: "landing" }),
      defineField({ name: "featureDescription", title: "Feature card text", type: "text", group: "landing", rows: 3 }),
      defineField({ name: "featureLinkLabel", title: "Feature link label", type: "string", group: "landing" }),
      ...(key === "fet-pet" ? [
        defineField({ name: "petListingTitle", title: "PET-CT listing title", type: "string", group: "landing", description: "Used when FET PET is not already listed as a separate item in the Molecular Imaging document." }),
        defineField({ name: "petListingSubtitle", title: "PET-CT listing subtitle", type: "string", group: "landing" }),
        defineField({ name: "petListingDescription", title: "PET-CT listing description", type: "text", group: "landing", rows: 3 }),
      ] : []),
      defineField({ name: "referralLabel", title: "Small referral label", type: "string", group: "referral" }),
      defineField({ name: "referralTitle", title: "Referral heading", type: "string", group: "referral" }),
      defineField({ name: "referralIntro", title: "Referral instructions", type: "text", group: "referral", description: "Set the shared public email and fax under Global → Site Settings → Contact Info." }),
      defineField({ name: "clinicalNote", title: "Clinical context note", type: "text", group: "referral" }),
      defineField({ name: "seoTitle", title: "Search engine title", type: "string", group: "seo", validation: (R) => R.max(70).warning("Aim for a concise search result title.") }),
      defineField({ name: "seoDescription", title: "Search engine description", type: "text", group: "seo", rows: 3, validation: (R) => R.max(170).warning("Aim for a concise search result description.") }),
    ],
    preview: { select: { title: "title" }, prepare({ title }) { return { title: title || page.title }; } },
  });
}

export const fetPetPage = imagingServiceSchema("fet-pet");
export const cardiacImagingPage = imagingServiceSchema("cardiac-imaging");

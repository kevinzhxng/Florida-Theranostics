import { cache } from "react";
import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { fetchOptions, siteSettingsQuery } from "./queries";
import { IMAGING_PATH, SITE_ORIGIN, imagingPages, type ImagingPageContent, type ImagingPageKey } from "@/lib/imaging-content";
import type { SiteSettings } from "@/lib/types";

const textFields = [
  "eyebrow", "title", "intro", "seoTitle", "seoDescription", "leadLabel", "leadTitle", "leadBody",
  "mriComparison", "petComparison", "detailsTitle", "detailsIntro", "referralLabel", "referralTitle",
  "referralIntro", "clinicalNote", "posterAlt", "posterCaption", "featureLabel", "featureTitle",
  "featureDescription", "featureLinkLabel", "petListingTitle", "petListingSubtitle", "petListingDescription",
] as const satisfies readonly (keyof ImagingPageContent)[];

type CmsImagingPage = Partial<Record<(typeof textFields)[number], string | null>> & {
  details?: ImagingPageContent["details"] | null;
  showFeature?: boolean | null;
  posterAsset?: { url?: string; width?: number; height?: number } | null;
};

const imagingPageQuery = `*[_id == $pageType && _type == $pageType][0] {
  ${textFields.join(", ")}, showFeature, details[] { title, body },
  "posterAsset": poster.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height}
}`;

export const getImagingPage = cache(async (key: ImagingPageKey) => {
  const defaults = imagingPages[key];
  let content: ImagingPageContent = { ...defaults };
  let siteSettings: SiteSettings | null = null;
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const [pageResult, settingsResult] = await Promise.allSettled([
      client.fetch<CmsImagingPage | null>(imagingPageQuery, { pageType: defaults.pageType }, fetchOptions),
      client.fetch<SiteSettings | null>(siteSettingsQuery, {}, fetchOptions),
    ]);
    if (settingsResult.status === "fulfilled") siteSettings = settingsResult.value;
    if (pageResult.status === "fulfilled" && pageResult.value) {
      const data = pageResult.value;
      for (const field of textFields) {
        const value = data[field]?.trim();
        if (value) content[field] = value;
      }
      if (typeof data.showFeature === "boolean") content.showFeature = data.showFeature;
      if (data.details?.length) {
        const details = data.details.filter((item) => item.title?.trim() && item.body?.trim());
        if (details.length) content.details = details;
      }
      const poster = data.posterAsset;
      if (poster?.url && poster.width && poster.height) {
        content.posterSrc = `${poster.url}?w=1600&fit=max`;
        content.posterFullSrc = poster.url;
        content.posterWidth = poster.width;
        content.posterHeight = poster.height;
      }
    }
  }
  return { content, siteSettings };
});

export function imagingMetadata(content: ImagingPageContent): Metadata {
  const url = `${SITE_ORIGIN}${IMAGING_PATH}/${content.key}`;
  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website", url, siteName: "Florida Theranostics",
      title: content.seoTitle, description: content.seoDescription,
      images: [{ url: new URL(content.posterSrc, SITE_ORIGIN).toString(), alt: content.posterAlt }],
    },
    twitter: { card: "summary_large_image", title: content.seoTitle, description: content.seoDescription, images: [new URL(content.posterSrc, SITE_ORIGIN).toString()] },
  };
}

// Types for Sanity CMS content (used by layout, Header, Footer, pages)

export interface NavLink {
  label?: string | null;
  href?: string | null;
  isExternal?: boolean;
}

export interface SiteSettings {
  siteTitle?: string | null;
  defaultMetaDescription?: string | null;
  logoLine1?: string | null;
  logoLine2?: string | null;
  logo?: unknown;
  navMainLinks?: NavLink[] | null;
  navPatientPortalLabel?: string | null;
  navPatientPortalHref?: string | null;
  navContactLabel?: string | null;
  footerTagline?: string | null;
  footerNavTitle?: string | null;
  footerResourcesTitle?: string | null;
  footerContactTitle?: string | null;
  footerCopyright?: string | null;
  address?: string | null;
  phone?: string | null;
  hours?: string | null;
}

export interface Page {
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
}

export type SectionType = "hero" | "textBlock" | "featureList" | "imageText" | "callToAction";

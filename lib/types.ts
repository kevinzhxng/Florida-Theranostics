// Type definitions for Sanity CMS content
// Will be expanded in Phase 2 when Sanity schemas are created

export interface SiteSettings {
  siteName: string;
  logoText: string;
  address: string;
  phone: string;
  email: string;
  // Additional fields will be added in Phase 2
}

export interface Page {
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  // Sections will be added in Phase 2
}

// Placeholder - will be expanded with Sanity schema types
export type SectionType = "hero" | "textBlock" | "featureList" | "imageText" | "callToAction";

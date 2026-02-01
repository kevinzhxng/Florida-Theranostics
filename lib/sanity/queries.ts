import groq from "groq";

const fetchOptions = { cache: "no-store" as RequestCache, perspective: "published" as const };

// —— Site Settings (navbar, footer, contact) ——
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    defaultMetaDescription,
    logoLine1,
    logoLine2,
    logo,
    navMainLinks[] { label, href, isExternal },
    navPatientPortalLabel,
    navPatientPortalHref,
    navContactLabel,
    footerTagline,
    footerNavTitle,
    footerResourcesTitle,
    footerContactTitle,
    footerCopyright,
    address,
    phone,
    hours
  }
`;

// —— Home Page ——
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroHeadline,
    heroCtaText,
    heroCtaHref,
    heroVideo { asset->{ url } },
    featuresSectionTitle,
    features[] {
      title,
      description,
      image,
      href
    },
    sections[] {
      title,
      body,
      imagePosition,
      image,
      buttonLabel,
      buttonHref
    },
    testimonialsSectionTitle,
    testimonials[] { quote, author }
  }
`;

// —— About Us Page (with hero) ——
export const aboutPageQuery = groq`
  *[_type == "aboutPage"] | order(_updatedAt desc)[0] {
    heroTitle,
    heroBody,
    heroButtonLabel,
    heroButtonHref,
    heroImage,
    chiefPhysician->{
      _id,
      name,
      title,
      bio,
      image
    },
    staffMembers[]->{
      _id,
      name,
      title,
      bio,
      image
    },
    values[]{
      title,
      description
    },
    ctaTitle,
    ctaBody,
    ctaButtonLabel,
    ctaButtonHref
  }
`;

// —— Therapies Page ——
export const therapiesPageQuery = groq`
  *[_type == "therapiesPage"][0] {
    heroTitle,
    heroBody,
    heroImage,
    therapiesSectionTitle,
    therapiesList[] { name, subtitle, description },
    prrtTitle,
    prrtBody,
    prrtImage,
    goalTitle,
    goalIntro,
    goalBullets,
    ctaTitle,
    ctaBody,
    ctaButtonLabel,
    ctaButtonHref
  }
`;

// —— Molecular Imaging Page ——
export const molecularImagingPageQuery = groq`
  *[_type == "molecularImagingPage"][0] {
    heroTitle,
    heroBody,
    heroImage,
    introTitle,
    introBody,
    petCtTitle,
    petCtSubtitle,
    petCtModalities[] {
      name,
      subtitle,
      description,
      image
    },
    spectCtTitle,
    spectCtIntro,
    spectCtModalities[] {
      name,
      subtitle,
      description,
      image
    },
    precisionTitle,
    precisionBody,
    precisionImage,
    dynamicPetTitle,
    dynamicPetIntro,
    dynamicPetBullets,
    ctaTitle,
    ctaBody,
    ctaButtonLabel,
    ctaButtonHref
  }
`;

// —— Technology Page ——
export const technologyPageQuery = groq`
  *[_type == "technologyPage"][0] {
    section1Title,
    section1Body,
    section1Bullets,
    section1Image,
    section2Title,
    section2Body,
    section2Bullets,
    section2Image,
    ctaTitle,
    ctaBody,
    ctaButtonLabel,
    ctaButtonHref
  }
`;

// —— Referral Page ——
export const referralPageQuery = groq`
  *[_type == "referralPage"][0] {
    pageTitle,
    pageSubtitle,
    phoneNumbers,
    successMessage
  }
`;

// —— Contact Page ——
export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    pageTitle,
    introParagraph,
    formHeading,
    submitButtonLabel,
    successMessage,
    overrideAddress,
    overridePhone,
    overrideHours
  }
`;

export { fetchOptions };

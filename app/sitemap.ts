import type { MetadataRoute } from "next";
import { SITE_ORIGIN, IMAGING_PATH } from "@/lib/imaging-content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "", "/about-us", "/therapies", IMAGING_PATH,
    `${IMAGING_PATH}/fet-pet`, `${IMAGING_PATH}/cardiac-imaging`,
    "/technology", "/referral", "/contact",
  ].map((pathname) => ({ url: `${SITE_ORIGIN}${pathname}` }));
}

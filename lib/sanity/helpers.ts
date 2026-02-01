import { urlFor } from "@/lib/sanity";

/** Build URL for a Sanity image (from CMS). Returns undefined if no image. */
export function getImageUrl(image: unknown, width = 1200): string | undefined {
  if (!image) return undefined;
  const b = urlFor(image as { _ref?: string; asset?: { _ref: string } });
  return typeof b !== "string" ? b.width(width).url() : undefined;
}

export function mapTeamMember(member: {
  name?: string | null;
  title?: string | null;
  bio?: string | null;
  image?: unknown;
} | null) {
  if (!member) return null;
  const imgBuilder = member.image ? urlFor(member.image as { _ref?: string; asset?: { _ref: string } }) : null;
  return {
    name: member.name ?? "",
    title: member.title ?? "",
    bio: member.bio ?? "",
    imageSrc: imgBuilder && typeof imgBuilder !== "string" ? imgBuilder.width(800).url() : undefined,
    imageAlt: member.name ?? "",
  };
}

export function mapValues(values: { title?: string; description?: string }[] | null | undefined) {
  if (!values?.length) return [];
  return values.map((v) => ({
    title: v.title ?? "",
    description: v.description ?? "",
  }));
}

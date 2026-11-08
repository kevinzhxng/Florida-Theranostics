import { IMAGING_PATH, imagingPages } from "./imaging-content";

export interface ImagingModality {
  name: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  href?: string;
}

export const FET_PET_SERVICE: ImagingModality = {
  name: imagingPages["fet-pet"].petListingTitle ?? "FET PET — Glioma Imaging",
  subtitle: imagingPages["fet-pet"].petListingSubtitle ?? "",
  description: imagingPages["fet-pet"].petListingDescription ?? "",
  imageSrc: imagingPages["fet-pet"].posterSrc,
  href: `${IMAGING_PATH}/fet-pet`,
};

/** Add the new service without replacing, reordering or mutating CMS services. */
export function withFetPetService(modalities: ImagingModality[], service = FET_PET_SERVICE): ImagingModality[] {
  const existingIndex = modalities.findIndex((item) =>
    item.href === FET_PET_SERVICE.href || /\bfet[\s-]*pet\b|floretyrosine/i.test(item.name)
  );
  if (existingIndex !== -1) {
    return modalities.map((item, index) => index === existingIndex
      ? { ...item, href: item.href || FET_PET_SERVICE.href }
      : item);
  }
  const amyloidIndex = modalities.findIndex((item) => /amyloid/i.test(item.name));
  const insertAt = amyloidIndex === -1 ? modalities.length : amyloidIndex + 1;
  return [
    ...modalities.slice(0, insertAt),
    { ...service },
    ...modalities.slice(insertAt),
  ];
}

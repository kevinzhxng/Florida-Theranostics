import ImagingServicePage from "@/components/imaging/ImagingServicePage";
import { getImagingPage, imagingMetadata } from "@/lib/sanity/imaging";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return imagingMetadata((await getImagingPage("fet-pet")).content);
}

export default async function FetPetPage() {
  return <ImagingServicePage {...await getImagingPage("fet-pet")} />;
}

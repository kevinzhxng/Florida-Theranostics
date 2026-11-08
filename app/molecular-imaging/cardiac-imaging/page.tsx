import ImagingServicePage from "@/components/imaging/ImagingServicePage";
import { getImagingPage, imagingMetadata } from "@/lib/sanity/imaging";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return imagingMetadata((await getImagingPage("cardiac-imaging")).content);
}

export default async function CardiacImagingPage() {
  return <ImagingServicePage {...await getImagingPage("cardiac-imaging")} />;
}

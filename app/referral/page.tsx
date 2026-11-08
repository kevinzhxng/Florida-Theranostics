import { client } from "@/lib/sanity";
import { referralPageQuery, fetchOptions } from "@/lib/sanity/queries";
import type { ImagingReferralLabels } from "@/lib/imaging-content";
import ReferralForm from "./ReferralForm";

export const dynamic = "force-dynamic";

export default async function ReferralPage({ searchParams }: { searchParams?: { study?: string | string[] } }) {
  let pageTitle = "Referrals & Order Forms";
  let pageSubtitle = "For referring providers · FLT Molecular Imaging and Therapy Ordering Form (HIPAA-compliant)";
  let phoneNumbers: string[] = ["(561) 847-3797", "(561) 600-4476"];
  let successMessage = "Thank you. Your referral has been submitted. We will process it and contact you as needed.";
  let imagingStudyLabels: ImagingReferralLabels | undefined;

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const data = await client.fetch<{
        pageTitle?: string | null;
        pageSubtitle?: string | null;
        phoneNumbers?: string[] | null;
        successMessage?: string | null;
        imagingStudyLabels?: ImagingReferralLabels | null;
      } | null>(referralPageQuery, {}, fetchOptions);
      if (data) {
        if (data.pageTitle) pageTitle = data.pageTitle;
        if (data.pageSubtitle) pageSubtitle = data.pageSubtitle ?? pageSubtitle;
        if (data.phoneNumbers?.length) phoneNumbers = data.phoneNumbers;
        if (data.successMessage) successMessage = data.successMessage;
        imagingStudyLabels = data.imagingStudyLabels ?? undefined;
      }
    } catch {
      // use defaults
    }
  }

  return (
    <ReferralForm
      pageTitle={pageTitle}
      pageSubtitle={pageSubtitle}
      phoneNumbers={phoneNumbers}
      successMessage={successMessage}
      imagingStudyLabels={imagingStudyLabels}
      initialStudy={typeof searchParams?.study === "string" ? searchParams.study : undefined}
    />
  );
}

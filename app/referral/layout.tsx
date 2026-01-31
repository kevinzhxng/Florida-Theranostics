import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral | Florida Theranostics",
  description:
    "Referrals and order forms for referring providers. Molecular imaging and radioligand therapy ordering. HIPAA-compliant.",
};

export default function ReferralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

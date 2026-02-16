"use client";

import { usePathname } from "next/navigation";
import ContactStrip from "./ContactStrip";
import type { SiteSettings } from "@/lib/types";

export default function ContactStripWrapper({
  siteSettings,
  children,
}: {
  siteSettings?: SiteSettings | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  if (isHomepage) {
    return <>{children}</>;
  }

  return (
    <>
      <ContactStrip siteSettings={siteSettings ?? undefined} />
      {children}
    </>
  );
}

"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import HomepageContactBanner from "./HomepageContactBanner";
import type { SiteSettings } from "@/lib/types";

const STORAGE_KEY = "florida-theranostics-contact-banner-dismissed";
export const BANNER_HEIGHT = "2rem";

const BannerVisibleContext = createContext(false);

export function useBannerVisible() {
  return useContext(BannerVisibleContext);
}

/**
 * Renders the contact banner above the navbar on the homepage only.
 * Banner has an "x" to dismiss and revert to the old homepage.
 */
export default function HeaderWithBanner({
  siteSettings,
  children,
}: {
  siteSettings?: SiteSettings | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "true");
    } catch {
      setDismissed(false);
    }
  }, []);

  const showBanner = isHomepage && !dismissed;

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
    setDismissed(true);
  };

  const mainPadding = showBanner ? "pt-[7rem] md:pt-[8rem]" : "pt-24 md:pt-28";

  return (
    <BannerVisibleContext.Provider value={showBanner}>
      {showBanner && (
        <HomepageContactBanner
          phone={siteSettings?.phone ?? undefined}
          address={siteSettings?.address ?? undefined}
          onDismiss={handleDismiss}
        />
      )}
      <Header
        siteSettings={siteSettings ?? undefined}
        topOffset={showBanner ? BANNER_HEIGHT : undefined}
      />
      <main className={`min-h-screen ${mainPadding}`}>
        {children}
      </main>
    </BannerVisibleContext.Provider>
  );
}

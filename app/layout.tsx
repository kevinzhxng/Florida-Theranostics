import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client } from "@/lib/sanity";
import { siteSettingsQuery, fetchOptions } from "@/lib/sanity/queries";
import type { SiteSettings } from "@/lib/types";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Florida Theranostics",
  description: "Premium concierge medicine and theranostics services in Florida",
  icons: {
    icon: "/images/logo/florida theranostics logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let siteSettings: SiteSettings | null = null;
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      siteSettings = await client.fetch<SiteSettings | null>(
        siteSettingsQuery,
        {},
        fetchOptions
      );
    } catch {
      // use defaults in Header/Footer
    }
  }

  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="antialiased bg-warm-white text-charcoal">
        <Header siteSettings={siteSettings ?? undefined} />
        <main className="min-h-screen pt-24 md:pt-28">{children}</main>
        <Footer siteSettings={siteSettings ?? undefined} />
      </body>
    </html>
  );
}

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import type { SiteSettings } from "@/lib/types";

const DEFAULT_NAV_LINKS = [
  { label: "About Us", href: "/about-us", isExternal: false },
  { label: "Therapies", href: "/therapies", isExternal: false },
  { label: "Molecular Imaging", href: "/molecular-imaging", isExternal: false },
  { label: "Technology", href: "/technology", isExternal: false },
  { label: "Referral", href: "/referral", isExternal: false },
];

export default function Header({ siteSettings }: { siteSettings?: SiteSettings | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const isHomepage = pathname === "/";
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLight = !isHomepage || scrolled || isHovered;
  const navLinks = (siteSettings?.navMainLinks?.length ? siteSettings.navMainLinks : DEFAULT_NAV_LINKS).filter(
    (l) => l?.label && l?.href
  );
  const logoLine1 = siteSettings?.logoLine1 ?? "Florida";
  const logoLine2 = siteSettings?.logoLine2 ?? "Theranostics";
  const patientPortalLabel = siteSettings?.navPatientPortalLabel ?? "Patient Portal";
  const patientPortalHref = siteSettings?.navPatientPortalHref ?? "https://mycw174.ecwcloud.com/portal23145/jsp/100mp/login_otp.jsp";
  const contactLabel = siteSettings?.navContactLabel ?? "Contact Us";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLight
          ? "bg-warm-white/95 backdrop-blur-md border-b border-gray-200/50"
          : "bg-transparent"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Container>
        <nav className="flex items-center justify-between h-20 md:h-24">
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="flex-shrink-0">
                <Image
                  src="/images/logo/florida theranostics logo.png"
                  alt="Florida Theranostics Logo"
                  width={50}
                  height={50}
                  className="w-10 h-10 md:w-12 lg:w-14 lg:h-14 object-contain"
                  priority
                />
              </div>
              <div
                className={`flex flex-col leading-tight transition-colors ${
                  isLight ? "text-charcoal" : "text-white"
                }`}
              >
                <span className="text-base md:text-lg lg:text-xl font-serif font-semibold tracking-tight">
                  {logoLine1}
                </span>
                <span className="text-base md:text-lg lg:text-xl font-serif font-semibold tracking-tight">
                  {logoLine2}
                </span>
              </div>
            </Link>
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 ml-8">
              {navLinks.map((link, i) => {
                const href = link.href ?? "#";
                const className = `text-xs md:text-sm font-sans font-medium transition-colors tracking-wide whitespace-nowrap ${
                  isLight
                    ? "text-text-muted hover:text-charcoal"
                    : "text-white/90 hover:text-white"
                }`;
                if (link.isExternal) {
                  return (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {link.label}
                    </a>
                  );
                }
                return (
                  <Link key={i} href={href} className={className}>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a
              href={patientPortalHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs md:text-sm font-sans font-medium transition-colors tracking-wide whitespace-nowrap ${
                isLight
                  ? "text-text-muted hover:text-charcoal"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {patientPortalLabel}
            </a>
            <Link
              href="/contact"
              className={`px-5 py-2.5 text-xs md:text-sm font-sans font-medium tracking-wide transition-all duration-300 border whitespace-nowrap ${
                isLight
                  ? "bg-navy text-warm-white border-navy hover:bg-navy-light"
                  : "bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50 backdrop-blur-sm"
              }`}
            >
              {contactLabel}
            </Link>
          </div>
          <button
            className={`lg:hidden transition-colors ${
              isLight ? "text-text-muted hover:text-charcoal" : "text-white/90 hover:text-white"
            }`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </Container>
    </header>
  );
}

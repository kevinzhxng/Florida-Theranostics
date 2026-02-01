"use client";

import { useEffect, useState, useRef } from "react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const isHomepage = pathname === "/";
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    void import("gsap").then(({ gsap }) => {
      gsap.fromTo(headerRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    });
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isLight = !isHomepage || scrolled || isHovered || isMobileMenuOpen;
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
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLight
          ? "bg-warm-white/95 backdrop-blur-md border-b border-gray-200/50"
          : "bg-transparent"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Container>
        <nav className="flex items-center justify-between h-20 md:h-24 min-h-[5rem]">
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
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
                const isActive =
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(href));
                const baseClasses =
                  "relative inline-block py-3 px-1 -mx-1 text-xs md:text-sm font-sans font-medium transition-colors duration-200 tracking-wide whitespace-nowrap cursor-pointer rounded-sm hover:transition-colors ";
                const activeClasses = isActive ? "font-semibold" : "";
                const colorClasses = isLight
                  ? "text-text-muted hover:text-charcoal"
                  : "text-white/90 hover:text-white";
                const underlineClasses = isActive
                  ? "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-1 after:h-0.5 after:bg-current after:opacity-60 after:rounded-full after:block"
                  : "";
                const className = `${baseClasses} ${activeClasses} ${colorClasses} ${underlineClasses}`.trim();
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
              className={`py-2 text-xs md:text-sm font-sans font-medium transition-colors duration-200 tracking-wide whitespace-nowrap cursor-pointer ${
                isLight
                  ? "text-text-muted hover:text-charcoal"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {patientPortalLabel}
            </a>
            <Link
              href="/contact"
              className={`px-5 py-2.5 text-xs md:text-sm font-sans font-medium tracking-wide transition-all duration-300 border whitespace-nowrap cursor-pointer ${
                isLight
                  ? "bg-navy text-warm-white border-navy hover:bg-navy-light"
                  : "bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50 backdrop-blur-sm"
              }`}
            >
              {contactLabel}
            </Link>
          </div>
          <button
            type="button"
            className={`lg:hidden p-2 -mr-2 transition-colors rounded ${
              isLight ? "text-text-muted hover:text-charcoal" : "text-white/90 hover:text-white"
            }`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>
      </Container>
      {/* Mobile menu panel */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 overflow-hidden transition-all duration-300 ease-out ${
          isMobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="bg-warm-white border-b border-gray-200/50 shadow-lg">
          <Container className="py-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const href = link.href ?? "#";
                const isActive =
                  pathname === href || (href !== "/" && pathname.startsWith(href));
                const baseClasses =
                  "block py-3 px-4 rounded-sm text-sm font-sans font-medium transition-colors text-charcoal hover:bg-gray-100";
                const activeClasses = isActive ? "bg-gray-100 font-semibold" : "";
                if (link.isExternal) {
                  return (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${baseClasses} ${activeClasses}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  );
                }
                return (
                  <Link
                    key={i}
                    href={href}
                    className={`${baseClasses} ${activeClasses}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="border-t border-gray-200 my-2" />
              <a
                href={patientPortalHref}
                target="_blank"
                rel="nopener noreferrer"
                className="block py-3 px-4 rounded-sm text-sm font-sans font-medium text-charcoal hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {patientPortalLabel}
              </a>
              <Link
                href="/contact"
                className="block py-3 px-4 rounded-sm text-sm font-sans font-medium bg-navy text-warm-white hover:bg-navy-light transition-colors text-center mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {contactLabel}
              </Link>
            </nav>
          </Container>
        </div>
      </div>
    </header>
  );
}

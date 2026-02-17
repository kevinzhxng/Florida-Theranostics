import Link from "next/link";
import Container from "./Container";
import Image from "next/image";
import FooterReveal from "./animations/FooterReveal";
import type { SiteSettings } from "@/lib/types";

const DEFAULT_NAV_LINKS: { label: string; href: string; isExternal?: boolean }[] = [
  { label: "About Us", href: "/about-us", isExternal: false },
  { label: "Therapies", href: "/therapies", isExternal: false },
  { label: "Molecular Imaging", href: "/molecular-imaging", isExternal: false },
  { label: "Technology", href: "/technology", isExternal: false },
  { label: "Referral", href: "/referral", isExternal: false },
];

export default function Footer({ siteSettings }: { siteSettings?: SiteSettings | null }) {
  const currentYear = new Date().getFullYear();
  const navLinks = (siteSettings?.navMainLinks?.length ? siteSettings.navMainLinks : DEFAULT_NAV_LINKS).filter(
    (l) => l?.label && l?.href
  );
  const logoLine1 = siteSettings?.logoLine1 ?? "Florida";
  const logoLine2 = siteSettings?.logoLine2 ?? "Theranostics";
  const tagline = siteSettings?.footerTagline ?? "Advanced Radioligand Therapy, Providing Patient-Centered Nuclear Medicine Care";
  const navTitle = siteSettings?.footerNavTitle ?? "Navigate";
  const resourcesTitle = siteSettings?.footerResourcesTitle ?? "Resources";
  const contactTitle = siteSettings?.footerContactTitle ?? "Contact";
  const copyrightText = siteSettings?.footerCopyright ?? "Florida Theranostics. All rights reserved.";
  const address = siteSettings?.address ?? "431 University Blvd.\nJupiter, FL 33458";
  const phone = siteSettings?.phone ?? "(561) 847-3797";
  const hours = siteSettings?.hours ?? "Mon - Fri: 8:00 AM - 5:00 PM\nSat & Sun: Closed";
  const patientPortalHref = siteSettings?.navPatientPortalHref ?? "https://mycw174.ecwcloud.com/portal23145/jsp/100mp/login_otp.jsp";
  const patientPortalLabel = siteSettings?.navPatientPortalLabel ?? "Patient Portal";

  return (
    <footer className="bg-navy text-warm-white">
      <Container>
        <FooterReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 py-16 md:py-20">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/images/logo/florida theranostics logo.png"
                alt="Florida Theranostics Logo"
                width={50}
                height={50}
                className="w-12 h-12 object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-serif font-semibold tracking-tight text-warm-white">
                  {logoLine1}
                </span>
                <span className="text-lg font-serif font-semibold tracking-tight text-warm-white">
                  {logoLine2}
                </span>
              </div>
            </Link>
            <p className="text-sm text-warm-white/70 leading-relaxed whitespace-pre-line">
              {tagline}
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-warm-white/60 mb-6 font-sans font-medium">
              {navTitle}
            </h4>
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link, i) => {
                const href = link.href ?? "#";
                const isExternal = "isExternal" in link ? link.isExternal : false;
                if (isExternal) {
                  return (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-warm-white/80 hover:text-warm-white transition-colors font-sans font-normal"
                    >
                      {link.label}
                    </a>
                  );
                }
                return (
                  <Link
                    key={i}
                    href={href}
                    className="text-sm text-warm-white/80 hover:text-warm-white transition-colors font-sans font-normal"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-warm-white/60 mb-6 font-sans font-medium">
              {resourcesTitle}
            </h4>
            <nav className="flex flex-col space-y-3">
              <a
                href={patientPortalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-warm-white/80 hover:text-warm-white transition-colors font-sans font-normal"
              >
                {patientPortalLabel}
              </a>
              <Link
                href="/contact"
                className="text-sm text-warm-white/80 hover:text-warm-white transition-colors font-sans font-normal"
              >
                Contact Us
              </Link>
            </nav>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-warm-white/60 mb-6 font-sans font-medium">
              {contactTitle}
            </h4>
            <div className="text-sm font-sans font-normal leading-relaxed space-y-4">
              <p className="text-warm-white/90 whitespace-pre-line flex items-start gap-3">
                <svg className="w-5 h-5 shrink-0 mt-0.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{address}</span>
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${phone.replace(/\D/g, "")}`} className="text-warm-white/90 hover:text-teal-200 transition-colors font-medium">
                  {phone}
                </a>
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.replace(/\n/g, " ").trim())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-teal-300 hover:text-teal-200 font-medium transition-colors"
              >
                Get directions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
              <p className="text-warm-white/70 whitespace-pre-line pt-1">{hours}</p>
            </div>
          </div>
          </div>
        </FooterReveal>
        <div className="border-t border-warm-white/20 pt-8 pb-8">
          <p className="text-xs text-warm-white/60 text-center font-sans font-normal">
            © {currentYear} {copyrightText}
          </p>
        </div>
      </Container>
    </footer>
  );
}

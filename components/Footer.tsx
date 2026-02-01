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
  const address = siteSettings?.address ?? "432 University Blvd.\nJupiter, FL 33458";
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
            <div className="text-sm text-warm-white/80 space-y-3 font-sans font-normal leading-relaxed whitespace-pre-line">
              <p>{address}</p>
              <p>
                <a href={`tel:${phone.replace(/\D/g, "")}`} className="hover:text-warm-white transition-colors">
                  {phone}
                </a>
              </p>
              <p>{hours}</p>
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

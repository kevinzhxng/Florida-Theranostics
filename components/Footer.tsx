import Link from "next/link";
import Container from "./Container";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-warm-white">
      <Container>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 py-16 md:py-20">
          {/* Logo and Brand */}
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
                  Florida
                </span>
                <span className="text-lg font-serif font-semibold tracking-tight text-warm-white">
                  Theranostics
                </span>
              </div>
            </Link>
            <p className="text-sm text-warm-white/70 leading-relaxed">
              Advanced Radioligand Therapy, Providing Patient-Centered Nuclear Medicine Care
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-warm-white/60 mb-6 font-sans font-medium">
              Navigate
            </h4>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/about-us"
                className="text-sm text-warm-white/80 hover:text-warm-white transition-colors font-sans font-normal"
              >
                About Us
              </Link>
              <Link
                href="/therapies"
                className="text-sm text-warm-white/80 hover:text-warm-white transition-colors font-sans font-normal"
              >
                Therapies
              </Link>
              <Link
                href="/molecular-imaging"
                className="text-sm text-warm-white/80 hover:text-warm-white transition-colors font-sans font-normal"
              >
                Molecular Imaging
              </Link>
              <Link
                href="/technology"
                className="text-sm text-warm-white/80 hover:text-warm-white transition-colors font-sans font-normal"
              >
                Technology
              </Link>
              <Link
                href="/referral"
                className="text-sm text-warm-white/80 hover:text-warm-white transition-colors font-sans font-normal"
              >
                Referral
              </Link>
            </nav>
          </div>

          {/* Patient Resources */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-warm-white/60 mb-6 font-sans font-medium">
              Resources
            </h4>
            <nav className="flex flex-col space-y-3">
              <a
                href="https://mycw174.ecwcloud.com/portal23145/jsp/100mp/login_otp.jsp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-warm-white/80 hover:text-warm-white transition-colors font-sans font-normal"
              >
                Patient Portal
              </a>
              <Link
                href="/contact"
                className="text-sm text-warm-white/80 hover:text-warm-white transition-colors font-sans font-normal"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-warm-white/60 mb-6 font-sans font-medium">
              Contact
            </h4>
            <div className="text-sm text-warm-white/80 space-y-3 font-sans font-normal leading-relaxed">
              <p>
                432 University Blvd.
                <br />
                Jupiter, FL 33458
              </p>
              <p>
                <a
                  href="tel:+15618473797"
                  className="hover:text-warm-white transition-colors"
                >
                  (561) 847-3797
                </a>
              </p>
              <p>
                <strong className="font-medium text-warm-white">Mon - Fri:</strong> 8:00 AM - 5:00 PM
                <br />
                <strong className="font-medium text-warm-white">Sat & Sun:</strong> Closed
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-warm-white/20 pt-8 pb-8">
          <p className="text-xs text-warm-white/60 text-center font-sans font-normal">
            © {currentYear} Florida Theranostics. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

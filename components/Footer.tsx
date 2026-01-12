import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200/50 bg-warm-white py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-base font-serif font-normal text-charcoal mb-4 tracking-wide">
              Florida Theranostics
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              [PLACEHOLDER: Footer tagline - Client to provide]
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-text-subtle mb-6 font-sans font-normal">
              Navigate
            </h4>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/about-us"
                className="text-sm text-text-muted hover:text-charcoal transition-colors font-sans font-normal"
              >
                About
              </Link>
              <Link
                href="/services"
                className="text-sm text-text-muted hover:text-charcoal transition-colors font-sans font-normal"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="text-sm text-text-muted hover:text-charcoal transition-colors font-sans font-normal"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-text-subtle mb-6 font-sans font-normal">
              Contact
            </h4>
            <div className="text-sm text-text-muted space-y-3 font-sans font-normal leading-relaxed">
              <p>[PLACEHOLDER: Address]</p>
              <p>
                <a
                  href="tel:[PLACEHOLDER-PHONE]"
                  className="hover:text-charcoal transition-colors"
                >
                  [PLACEHOLDER: Phone]
                </a>
              </p>
              <p>
                <a
                  href="mailto:[PLACEHOLDER-EMAIL]"
                  className="hover:text-charcoal transition-colors"
                >
                  [PLACEHOLDER: Email]
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200/30">
          <p className="text-xs text-text-subtle text-center font-sans font-normal">
            © {currentYear} Florida Theranostics. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

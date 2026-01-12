import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-light text-gray-900 mb-4">
              Florida Theranostics
            </h3>
            <p className="text-sm text-gray-600">
              [PLACEHOLDER: Footer tagline - Client to provide]
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Navigate</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/about-us"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </Link>
              <Link
                href="/services"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Contact</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>[PLACEHOLDER: Address]</p>
              <p>
                <a
                  href="tel:[PLACEHOLDER-PHONE]"
                  className="hover:text-gray-900 transition-colors"
                >
                  [PLACEHOLDER: Phone]
                </a>
              </p>
              <p>
                <a
                  href="mailto:[PLACEHOLDER-EMAIL]"
                  className="hover:text-gray-900 transition-colors"
                >
                  [PLACEHOLDER: Email]
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            © {currentYear} Florida Theranostics. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

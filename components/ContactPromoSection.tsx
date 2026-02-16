import Container from "./Container";
import Section from "./Section";

const DEFAULT_PHONE = "(561) 847-3797";
const DEFAULT_ADDRESS = "432 University Blvd., Jupiter, FL 33458";

function buildDirectionsUrl(address: string): string {
  const query = address.replace(/\n/g, " ").trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function ContactPromoSection({
  title = "Call or visit us",
  subtitle = "We’re here to help. Call to schedule or stop by our Jupiter office.",
  phone = DEFAULT_PHONE,
  address = DEFAULT_ADDRESS,
}: {
  title?: string;
  subtitle?: string;
  phone?: string;
  address?: string;
}) {
  const addressOneLine = address.replace(/\n/g, ", ").trim();
  const directionsUrl = buildDirectionsUrl(address);

  return (
    <Section className="bg-[#d5c9b1] text-charcoal border-t border-charcoal/10">
      <Container>
        <div className="max-w-2xl mx-auto text-center py-16">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold tracking-tight text-charcoal mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-text-muted text-sm md:text-base mb-8 font-sans">
              {subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-3 text-lg md:text-xl font-sans font-semibold text-navy hover:text-navy-light transition-colors"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-navy/10 text-navy" aria-hidden>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              {phone}
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-lg md:text-xl font-sans font-semibold text-navy hover:text-navy-light transition-colors"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-navy/10 text-navy" aria-hidden>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              {addressOneLine}
              <span className="text-teal-600 text-base font-medium">— Get directions</span>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}

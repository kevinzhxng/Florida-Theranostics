import Link from "next/link";
import Container from "./Container";
import type { SiteSettings } from "@/lib/types";

function buildDirectionsUrl(address: string): string {
  const query = address.replace(/\n/g, " ").trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function ContactStrip({ siteSettings }: { siteSettings?: SiteSettings | null }) {
  const phone = siteSettings?.phone ?? "(561) 847-3797";
  const address = siteSettings?.address ?? "432 University Blvd., Jupiter, FL 33458";
  const addressOneLine = address.replace(/\n/g, ", ").trim();
  const directionsUrl = buildDirectionsUrl(address);

  return (
    <div className="bg-navy text-warm-white border-b border-navy-light/50">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-6 py-2.5 px-2 text-center sm:text-left">
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="inline-flex items-center justify-center gap-2 text-sm font-sans font-medium hover:text-teal-200 transition-colors"
          >
            <span className="sr-only">Call us</span>
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {phone}
          </a>
          <span className="hidden sm:inline text-warm-white/40" aria-hidden>|</span>
          <Link
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-sm font-sans font-medium text-warm-white/90 hover:text-teal-200 transition-colors"
          >
            <span className="sr-only">Get directions to</span>
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="sm:hidden">Jupiter, FL</span>
            <span className="hidden sm:inline">{addressOneLine}</span>
            <span className="ml-0.5 font-semibold">— Get directions</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}

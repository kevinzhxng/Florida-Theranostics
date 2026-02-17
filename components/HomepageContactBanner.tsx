"use client";

import Link from "next/link";
import Container from "./Container";

function buildDirectionsUrl(address: string): string {
  const query = address.replace(/\n/g, " ").trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function HomepageContactBanner({
  phone = "(561) 847-3797",
  address = "431 University Blvd., Jupiter, FL 33458",
  onDismiss,
}: {
  phone?: string;
  address?: string;
  onDismiss: () => void;
}) {
  const addressOneLine = address.replace(/\n/g, ", ").trim();
  const directionsUrl = buildDirectionsUrl(address);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] flex items-center min-h-[2rem]"
      style={{ backgroundColor: "#d5c9b1" }}
    >
      <Container className="w-full">
        <div className="relative flex items-center justify-center gap-x-3 w-full py-1.5 pl-10 pr-10 text-center min-h-[2rem]">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-xs font-sans text-charcoal">
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className="font-medium text-navy hover:text-navy-light transition-colors"
            >
              {phone}
            </a>
            <span className="text-charcoal/50" aria-hidden>·</span>
            <Link
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-navy hover:text-navy-light transition-colors"
            >
              {addressOneLine}
            </Link>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-charcoal/70 hover:text-charcoal hover:bg-charcoal/10 transition-colors"
            aria-label="Dismiss banner"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </Container>
    </div>
  );
}

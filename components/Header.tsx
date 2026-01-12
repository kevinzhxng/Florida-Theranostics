"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "./Container";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLight = scrolled || isHovered;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isLight
          ? "bg-warm-white/95 backdrop-blur-md border-b border-gray-200/50"
          : "bg-transparent"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Container>
        <nav className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link
            href="/"
            className={`text-lg md:text-xl font-serif font-normal transition-colors tracking-wide ${
              isLight ? "text-charcoal hover:text-charcoal-light" : "text-white"
            }`}
          >
            Florida Theranostics
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/about-us"
              className={`text-sm font-sans font-normal transition-colors tracking-wide relative group ${
                isLight
                  ? "text-text-muted hover:text-charcoal"
                  : "text-white/90 hover:text-white"
              }`}
            >
              About
              {isLight && (
                <span className="absolute bottom-0 left-0 w-0 h-px bg-charcoal transition-all duration-300 group-hover:w-full"></span>
              )}
            </Link>
            <Link
              href="/services"
              className={`text-sm font-sans font-normal transition-colors tracking-wide relative group ${
                isLight
                  ? "text-text-muted hover:text-charcoal"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Services
              {isLight && (
                <span className="absolute bottom-0 left-0 w-0 h-px bg-charcoal transition-all duration-300 group-hover:w-full"></span>
              )}
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-sans font-normal transition-colors tracking-wide relative group ${
                isLight
                  ? "text-text-muted hover:text-charcoal"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Contact
              {isLight && (
                <span className="absolute bottom-0 left-0 w-0 h-px bg-charcoal transition-all duration-300 group-hover:w-full"></span>
              )}
            </Link>
            <Link
              href="/contact"
              className={`ml-4 px-6 py-2.5 text-sm font-sans font-normal tracking-wide transition-all duration-300 border ${
                isLight
                  ? "bg-warm-white text-charcoal border-charcoal/20 hover:border-charcoal hover:bg-charcoal/5"
                  : "bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors ${
              isLight ? "text-text-muted hover:text-charcoal" : "text-white/90 hover:text-white"
            }`}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>
      </Container>
    </header>
  );
}

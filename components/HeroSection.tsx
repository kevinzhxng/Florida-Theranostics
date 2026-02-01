"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";

interface HeroSectionProps {
  videoSrc?: string;
  videoPoster?: string;
  headline: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function HeroSection({
  videoSrc,
  videoPoster,
  headline,
  ctaText = "Get in touch",
  ctaHref = "/contact",
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const parseHeadline = (text: string) => {
    const parts = text.split(/_/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <span key={index} className="italic">{part}</span>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const ctxRef = useRef<{ revert: () => void } | null>(null);
  useEffect(() => {
    void (async () => {
      const { gsap } = await import("gsap");
      ctxRef.current = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (videoRef.current) {
          gsap.fromTo(
            videoRef.current,
            { scale: 1.08 },
            { scale: 1, duration: 2, ease: "power2.inOut" }
          );
        }

        if (headlineRef.current) {
          tl.fromTo(
            headlineRef.current,
            { y: 72, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
            0.3
          );
        }

        if (ctaRef.current) {
          tl.fromTo(
            ctaRef.current,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            0.6
          );
        }
      }, containerRef);
    })();

    return () => {
      ctxRef.current?.revert();
    };
  }, [headline, ctaText, ctaHref]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video/Image Background */}
      <div ref={videoRef} className="absolute inset-0 z-0 will-change-transform">
        {videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={videoPoster}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900" />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end justify-center pb-16 md:pb-20 lg:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            ref={headlineRef}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-normal text-white leading-[1.1] mb-6 md:mb-8 opacity-0"
          >
            {parseHeadline(headline)}
          </h1>
          <Link
            ref={ctaRef}
            href={ctaHref}
            className="inline-block text-sm md:text-lg font-sans font-semibold text-white border-b border-white/50 hover:border-white transition-colors duration-300 tracking-wide opacity-0"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}

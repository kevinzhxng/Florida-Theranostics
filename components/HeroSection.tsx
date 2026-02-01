"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";

interface HeroSectionProps {
  videoSrc?: string;
  videoPoster?: string;
  /** Single headline (legacy) or use headlines array */
  headline?: string;
  /** Rotating phrases; if length > 1, they cycle with fade animation */
  headlines?: string[];
  ctaText?: string;
  ctaHref?: string;
}

const ROTATE_INTERVAL_MS = 5500;
const FADE_DURATION = 0.5;

export default function HeroSection({
  videoSrc,
  videoPoster,
  headline: legacyHeadline,
  headlines: headlinesProp,
  ctaText = "Get in touch",
  ctaHref = "/contact",
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const ctxRef = useRef<{ revert: () => void } | null>(null);

  const headlines = headlinesProp?.length
    ? headlinesProp
    : legacyHeadline
      ? [legacyHeadline]
      : ["Setting the Standard in Molecular Imaging and Theranostics"];
  const [index, setIndex] = useState(0);
  const currentHeadline = headlines[index] ?? headlines[0];

  const parseHeadline = (text: string) => {
    const parts = text.split(/_/);
    return parts.map((part, i) => {
      if (i % 2 === 1) return <span key={i} className="italic">{part}</span>;
      return <span key={i}>{part}</span>;
    });
  };

  // Initial entrance: video + headline + CTA
  useEffect(() => {
    void (async () => {
      const { gsap } = await import("gsap");
      ctxRef.current = gsap.context(() => {
        if (videoRef.current) {
          gsap.fromTo(
            videoRef.current,
            { scale: 1.08 },
            { scale: 1, duration: 2, ease: "power2.inOut" }
          );
        }
        if (headlineRef.current) {
          (gsap.fromTo as (t: unknown, fromV: object, toV: object, pos?: number) => unknown)(
            headlineRef.current,
            { y: 72, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
            0.3
          );
        }
        if (ctaRef.current) {
          (gsap.fromTo as (t: unknown, fromV: object, toV: object, pos?: number) => unknown)(
            ctaRef.current,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            0.6
          );
        }
      }, containerRef);
    })();
    return () => ctxRef.current?.revert();
  }, []);

  // After rotating to next phrase: fade in the new headline
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    const el = headlineRef.current;
    if (!el || headlines.length <= 1) return;
    void import("gsap").then(({ gsap }) => {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: FADE_DURATION, ease: "power2.out" });
    });
  }, [index, headlines.length]);

  // Rotation: fade out, then advance index
  useEffect(() => {
    if (headlines.length <= 1) return;
    const el = headlineRef.current;
    const id = setInterval(() => {
      void import("gsap").then(({ gsap }) => {
        gsap.to(el, {
          opacity: 0,
          duration: FADE_DURATION,
          ease: "power2.in",
          onComplete: () => {
            setIndex((i) => (i + 1) % headlines.length);
          },
        });
      });
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [headlines.length]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
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

      <div className="relative z-10 h-full flex items-end justify-center pb-16 md:pb-20 lg:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            ref={headlineRef}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-normal text-white leading-[1.1] mb-6 md:mb-8 opacity-0"
          >
            {parseHeadline(currentHeadline)}
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

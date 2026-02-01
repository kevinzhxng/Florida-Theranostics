"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";

interface ImageTextSectionProps {
  title?: string;
  content: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  imageCredit?: string;
  className?: string;
}

export default function ImageTextSection({
  title,
  content,
  imageSrc,
  imageAlt = "",
  imagePosition = "right",
  imageCredit,
  className = "",
}: ImageTextSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<{ revert: () => void } | null>(null);

  const parseTitle = (text: string) => {
    const parts = text.split(/_/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <span key={index} className="italic">{part}</span>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  useEffect(() => {
    void (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const trigger = sectionRef.current;
      if (!trigger) return;

      ctxRef.current = gsap.context(() => {
        const imageFromX = imagePosition === "left" ? 80 : -80;

        if (imageColRef.current) {
          gsap.fromTo(
            imageColRef.current,
            { x: imageFromX, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger,
                start: "top 82%",
                end: "top 40%",
                scrub: 1,
              },
            }
          );
        }

        if (textColRef.current) {
          gsap.fromTo(
            textColRef.current,
            { y: 48, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger,
                start: "top 82%",
                end: "top 40%",
                scrub: 1,
              },
            }
          );
        }
      }, sectionRef);
    })();

    return () => {
      ctxRef.current?.revert();
    };
  }, [imagePosition, title]);

  const imageComponent = imageSrc ? (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {imageCredit && (
        <p className="absolute bottom-4 right-4 text-xs text-text-subtle font-sans">
          {imageCredit}
        </p>
      )}
    </div>
  ) : (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] bg-gray-100 flex items-center justify-center">
      <span className="text-text-subtle text-sm font-sans">
        [PLACEHOLDER: Image]
      </span>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className={`py-10 md:py-14 bg-warm-white ${className}`.trim()}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center ${
            imagePosition === "left"
              ? "md:[&>div:first-child]:order-2 md:[&>div:last-child]:order-1"
              : ""
          }`}
        >
          <div ref={imageColRef} className="w-full">
            {imageComponent}
          </div>

          <div ref={textColRef} className="flex flex-col justify-center">
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-charcoal mb-8 md:mb-10 leading-tight">
                {parseTitle(title)}
              </h2>
            )}
            <div className="text-lg md:text-xl text-text-muted leading-loose">
              {content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

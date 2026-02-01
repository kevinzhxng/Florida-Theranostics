"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { useRef, useEffect } from "react";

interface Feature {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
}

interface FeaturesSectionProps {
  title?: string;
  features: Feature[];
}

export default function FeaturesSection({
  title,
  features,
}: FeaturesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<{ revert: () => void } | null>(null);

  useEffect(() => {
    void (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctxRef.current = gsap.context(() => {
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { y: 48, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: titleRef.current,
                start: "top 88%",
                end: "top 55%",
                scrub: 1,
              },
            }
          );
        }

        if (cardsRef.current?.children.length) {
          gsap.fromTo(
            cardsRef.current.children,
            { y: 56, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              ease: "none",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 85%",
                end: "top 45%",
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
  }, [title, features]);

  return (
    <Section ref={sectionRef} className="py-10 md:py-14 bg-warm-white">
      <Container>
        <div className="max-w-7xl mx-auto">
          {title && (
            <h2
              ref={titleRef}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-charcoal mb-12 md:mb-16 text-center leading-tight opacity-0"
            >
              {title}
            </h2>
          )}

          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {features.map((feature, index) => {
              const content = (
                <div className="group cursor-pointer h-full flex flex-col">
                  {feature.imageSrc && (
                    <div className="relative w-full h-64 md:h-80 mb-6 overflow-hidden bg-gray-100">
                      <Image
                        src={feature.imageSrc}
                        alt={feature.imageAlt || feature.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl md:text-2xl font-serif font-normal text-charcoal mb-4 leading-tight group-hover:text-charcoal-light transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-text-muted leading-loose flex-grow">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );

              if (feature.href) {
                return (
                  <Link key={index} href={feature.href} className="block h-full">
                    {content}
                  </Link>
                );
              }

              return <div key={index}>{content}</div>;
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Container from "@/components/Container";
import Section from "@/components/Section";

interface Testimonial {
  quote: string;
  author: string;
}

interface TestimonialsSectionProps {
  title?: string;
  testimonials: Testimonial[];
}

export default function TestimonialsSection({
  title = "Hear From Our Patients",
  testimonials,
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <Section className="py-10 md:py-14 bg-warm-white">
      <Container>
        <div className="max-w-5xl mx-auto">
          {title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-charcoal mb-12 md:mb-16 text-center leading-tight">
              {title}
            </h2>
          )}

          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="min-w-full px-4 md:px-8 flex-shrink-0"
                >
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="text-5xl md:text-6xl text-navy/20 font-serif leading-none">
                      &ldquo;
                    </div>
                    <p className="text-xl md:text-2xl text-text-muted leading-loose max-w-4xl">
                      {testimonial.quote}
                    </p>
                    <p className="text-base md:text-lg font-sans font-medium text-charcoal mt-4">
                      {testimonial.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-navy"
                    : "w-2 bg-navy/30 hover:bg-navy/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";

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
  return (
    <Section className="py-20 md:py-28 bg-warm-white">
      <Container>
        <div className="max-w-7xl mx-auto">
          {title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-charcoal mb-12 md:mb-16 text-center leading-tight">
              {title}
            </h2>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature, index) => {
              const content = (
                <div className="group cursor-pointer h-full flex flex-col">
                  {/* Image */}
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
                  
                  {/* Content */}
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

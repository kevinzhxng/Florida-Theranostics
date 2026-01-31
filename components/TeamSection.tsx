import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface TeamSectionProps {
  title?: string;
  members: TeamMember[];
}

export default function TeamSection({
  title = "Meet The Team",
  members,
}: TeamSectionProps) {
  return (
    <Section className="py-10 md:py-14 bg-warm-white">
      <Container>
        <div className="max-w-7xl mx-auto">
          {title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-charcoal mb-12 md:mb-16 text-center leading-tight">
              {title}
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {members.map((member, index) => (
              <div
                key={index}
                className="flex flex-col bg-warm-white border border-charcoal/10 overflow-hidden"
              >
                {member.imageSrc ? (
                  <div className="relative w-full aspect-[3/4] bg-gray-100">
                    <Image
                      src={member.imageSrc}
                      alt={member.imageAlt || member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[3/4] bg-gray-100 flex items-center justify-center">
                    <span className="text-text-subtle text-sm font-sans">
                      Photo
                    </span>
                  </div>
                )}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl md:text-2xl font-serif font-normal text-charcoal mb-1 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-sm uppercase tracking-wider text-text-subtle font-sans mb-4">
                    {member.title}
                  </p>
                  <p className="text-base text-text-muted leading-relaxed flex-grow">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

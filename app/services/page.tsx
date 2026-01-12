import Container from "@/components/Container";
import Section from "@/components/Section";

export const metadata = {
  title: "Services | Florida Theranostics",
  description: "Our theranostics and concierge medicine services",
};

export default function Services() {
  return (
    <>
      {/* Page Header */}
      <Section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <Container>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-charcoal mb-6 leading-tight">
              Services
            </h1>
            <p className="text-lg md:text-xl text-text-muted leading-loose max-w-3xl">
              [PLACEHOLDER: Services page introduction - Client to provide]
            </p>
          </div>
        </Container>
      </Section>

      {/* Services List */}
      <Section className="py-16 md:py-24">
        <Container>
          <div className="max-w-5xl space-y-16 md:space-y-20">
            {/* Service Item Placeholder */}
            <div className="border-b border-gray-200/50 pb-16 md:pb-20 last:border-0 last:pb-0">
              <h2 className="text-3xl md:text-4xl font-serif font-normal text-charcoal mb-6 leading-tight">
                [PLACEHOLDER: Service Name]
              </h2>
              <p className="text-lg text-text-muted leading-loose max-w-3xl">
                [PLACEHOLDER: Service description - Client to provide from
                current GoDaddy site]
              </p>
            </div>

            {/* Additional service items will be added based on current site */}
          </div>
        </Container>
      </Section>
    </>
  );
}

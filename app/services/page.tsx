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
      <Section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-gray-900">
              Services
            </h1>
            <p className="text-lg text-gray-600">
              [PLACEHOLDER: Services page introduction - Client to provide]
            </p>
          </div>
        </Container>
      </Section>

      {/* Services List */}
      <Section className="py-12 md:py-16">
        <Container>
          <div className="max-w-4xl space-y-12">
            {/* Service Item Placeholder */}
            <div className="border-b border-gray-200 pb-12 last:border-0 last:pb-0">
              <h2 className="text-2xl md:text-3xl font-light mb-4 text-gray-900">
                [PLACEHOLDER: Service Name]
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
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

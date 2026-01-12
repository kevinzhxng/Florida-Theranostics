import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 text-gray-900">
              Precision Medicine for{" "}
              <span className="font-normal">Optimal Health</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              [PLACEHOLDER: Hero subtitle - Client to provide] Advanced
              theranostics and concierge medicine services tailored to your
              unique health needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/contact" variant="primary">
                Request Consultation
              </Button>
              <Button href="/about-us" variant="secondary">
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Introduction Section */}
      <Section className="py-16 md:py-24 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-gray-900">
              [PLACEHOLDER: Section Heading]
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              [PLACEHOLDER: Introduction text - Client to provide content from
              current GoDaddy site]
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

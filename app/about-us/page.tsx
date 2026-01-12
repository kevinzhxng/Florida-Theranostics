import Container from "@/components/Container";
import Section from "@/components/Section";

export const metadata = {
  title: "About Us | Florida Theranostics",
  description: "Learn about Florida Theranostics and our approach to precision medicine",
};

export default function AboutUs() {
  return (
    <>
      {/* Page Header */}
      <Section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-gray-900">
              About Us
            </h1>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="py-12 md:py-16">
        <Container>
          <div className="max-w-3xl prose prose-lg">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              [PLACEHOLDER: About Us content - Client to provide from current
              GoDaddy /about-us/ page]
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              [PLACEHOLDER: Additional paragraphs from current site]
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

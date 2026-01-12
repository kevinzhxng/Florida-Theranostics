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
      <Section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <Container>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-charcoal mb-6 leading-tight">
              About Us
            </h1>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl">
            <div className="space-y-8 text-lg text-text-muted leading-loose">
              <p>
                [PLACEHOLDER: About Us content - Client to provide from current
                GoDaddy /about-us/ page]
              </p>
              <p>
                [PLACEHOLDER: Additional paragraphs from current site]
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

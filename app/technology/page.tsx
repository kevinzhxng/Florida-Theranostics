import Container from "@/components/Container";
import Section from "@/components/Section";

export const metadata = {
  title: "Technology | Florida Theranostics",
  description: "State-of-the-art medical imaging and therapy technology",
};

export default function Technology() {
  return (
    <>
      {/* Page Header */}
      <Section className="py-10 md:py-14">
        <Container>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-charcoal mb-6 leading-tight">
              Technology
            </h1>
            <p className="text-lg md:text-xl text-text-muted leading-loose max-w-3xl">
              Advanced medical imaging and therapy technology
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="py-10 md:py-14">
        <Container>
          <div className="max-w-4xl space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-normal text-charcoal mb-6 leading-tight">
                State-of-the-Art Technology
              </h2>
              <div className="space-y-6 text-lg text-text-muted leading-loose">
                <p>
                  [PLACEHOLDER: Technology content - Client to provide from current GoDaddy site. This section should describe the advanced technology and equipment used at Florida Theranostics.]
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-normal text-charcoal mb-6 leading-tight">
                Accredited Imaging Systems
              </h2>
              <div className="space-y-6 text-lg text-text-muted leading-loose">
                <p>
                  We utilize state-of-the-art PET-CT and SPECT-CT imaging systems, accredited by the American College of Radiology (ACR), to deliver precise and reliable diagnostic results.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

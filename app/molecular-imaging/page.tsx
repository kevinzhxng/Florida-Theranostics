import Container from "@/components/Container";
import Section from "@/components/Section";

export const metadata = {
  title: "Molecular Imaging | Florida Theranostics",
  description: "Advanced molecular imaging and diagnostic services",
};

export default function MolecularImaging() {
  return (
    <>
      {/* Page Header */}
      <Section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <Container>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-charcoal mb-6 leading-tight">
              Molecular Imaging
            </h1>
            <p className="text-lg md:text-xl text-text-muted leading-loose max-w-3xl">
              Smart Diagnostics, Customized Solutions
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-normal text-charcoal mb-6 leading-tight">
                Ultrafast PET Imaging
              </h2>
              <div className="space-y-6 text-lg text-text-muted leading-loose">
                <p>
                  Offers unparalleled diagnostic precision. Our advanced imaging technology enables us to detect and diagnose conditions with exceptional accuracy and speed.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-normal text-charcoal mb-6 leading-tight">
                Explore Imaging Solutions
              </h2>
              <div className="space-y-6 text-lg text-text-muted leading-loose">
                <p>
                  Experience the difference that our advanced imaging and therapy solutions can make in your healthcare journey. We utilize state-of-the-art PET-CT and SPECT-CT imaging systems, accredited by the American College of Radiology (ACR), to deliver precise and reliable diagnostic results.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

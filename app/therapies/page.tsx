import Container from "@/components/Container";
import Section from "@/components/Section";

export const metadata = {
  title: "Therapies | Florida Theranostics",
  description: "Advanced radioligand therapy and theranostics treatments",
};

export default function Therapies() {
  return (
    <>
      {/* Page Header */}
      <Section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <Container>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-charcoal mb-6 leading-tight">
              Therapies
            </h1>
            <p className="text-lg md:text-xl text-text-muted leading-loose max-w-3xl">
              Advanced Radioligand Therapy, Providing Patient-Centered Nuclear Medicine Care
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
                Leading Expertise in Radiopharmaceutical Therapy
              </h2>
              <div className="space-y-6 text-lg text-text-muted leading-loose">
                <p>
                  Our team at Florida Theranostics administers radioligand therapies with a focus on patient safety and treatment efficacy. We collaborate with your primary doctor to optimize therapy management strategies, ensuring a holistic approach to your healthcare. Our nearly 900 cycles of radioligand therapies are a testament to our experience and dedication.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-normal text-charcoal mb-6 leading-tight">
                Why Our Expertise Matters to You
              </h2>
              <div className="space-y-6 text-lg text-text-muted leading-loose">
                <p>
                  Our team of experienced medical professionals is dedicated to providing the highest standard of care.
                </p>
                <ul className="list-disc list-inside space-y-4 ml-4">
                  <li>
                    With our Radiopharmaceutical Therapy Center of Excellence designation, we ensure that every patient receives expert attention and the most advanced treatment options available in South Florida.
                  </li>
                  <li>
                    We utilize state-of-the-art PET-CT and SPECT-CT imaging systems, accredited by the American College of Radiology (ACR), to deliver precise and reliable diagnostic results.
                  </li>
                  <li>
                    Our ultrafast PET imaging capabilities enable us to detect and treat health conditions with unprecedented accuracy and speed.
                  </li>
                  <li>
                    Our radiopharmaceutical therapies, including PRRT and radioligand therapies, are designed to target and treat cancer effectively.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

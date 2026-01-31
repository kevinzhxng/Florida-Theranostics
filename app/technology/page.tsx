import Container from "@/components/Container";
import Section from "@/components/Section";
import ImageTextSection from "@/components/ImageTextSection";
import Button from "@/components/Button";

export const metadata = {
  title: "Technology | Florida Theranostics",
  description:
    "uMI Panorama PET/CT and VERITON-CT SPECT/CT. State-of-the-art molecular imaging and theranostics technology in Jupiter, FL.",
};

export default function Technology() {
  return (
    <>
      {/* Hero: uMI Panorama PET/CT */}
      <ImageTextSection
        title="uMI Panorama PET/CT"
        content={
          <div className="space-y-6">
            <p>
              Blending precision, speed, and comfort, the uMI Panorama
              represents the pinnacle of PET/CT innovation. Its exceptional 2.9 mm
              PET resolution and sub-200 ps TOF performance deliver crystal-clear
              imaging.
            </p>
            <ul className="space-y-3 text-lg text-text-muted leading-relaxed list-none">
              <li className="flex gap-3">
                <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                <span>
                  <strong className="text-charcoal font-sans">Spacious design:</strong>{" "}
                  76 cm bore and 700 lb table ensure accessibility for all patients.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                <span>
                  <strong className="text-charcoal font-sans">AI-driven workflow:</strong>{" "}
                  Intuitive patient positioning and smart scan planning streamline
                  operations.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                <span>
                  <strong className="text-charcoal font-sans">Deep-learning reconstruction:</strong>{" "}
                  Ultra-sharp image detail at low doses, with full support for
                  advanced theranostic and research workflows.
                </span>
              </li>
            </ul>
            <p className="text-lg text-text-muted leading-loose pt-2">
              As Florida&apos;s first institution to offer this technology,
              Florida Theranostics underscores its leadership in delivering early,
              personalized, and precise molecular care.
            </p>
          </div>
        }
        imagePosition="right"
        imageSrc="/images/Group-6.png.webp"
        imageAlt="uMI Panorama PET/CT at Florida Theranostics"
      />

      {/* VERITON-CT SPECT/CT */}
      <ImageTextSection
        className="bg-surface-cool"
        title="VERITON-CT SPECT/CT"
        content={
          <div className="space-y-6">
            <p>
              Redefining SPECT/CT with digital innovation, the VERITON-CT offers
              full 360° CZT detector coverage, delivering total-body 3D imaging
              in under 30 minutes.
            </p>
            <ul className="space-y-3 text-lg text-text-muted leading-relaxed list-none">
              <li className="flex gap-3">
                <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                <span>
                  <strong className="text-charcoal font-sans">Comfort & inclusivity:</strong>{" "}
                  80 cm bore designed for patient comfort and accessibility.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                <span>
                  <strong className="text-charcoal font-sans">Ultra-high sensitivity:</strong>{" "}
                  Quantitative accuracy ideal for theranostics applications and
                  precise radioligand dosimetry.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                <span>
                  <strong className="text-charcoal font-sans">Integrated TruView console:</strong>{" "}
                  Whether you opt for 16-slice or 64-slice CT, acquisition,
                  reconstruction, and analysis are unified to streamline workflow.
                </span>
              </li>
            </ul>
            <p className="text-lg text-text-muted leading-loose pt-2">
              Florida Theranostics is proud to offer this state-of-the-art
              imaging capability for personalized, efficient, and advanced
              molecular imaging care.
            </p>
          </div>
        }
        imagePosition="left"
        imageSrc="/images/GettyImages-1502040018-2048x1367.jpg"
        imageAlt="VERITON-CT SPECT/CT and molecular imaging at Florida Theranostics"
      />

      {/* CTA */}
      <Section className="py-10 md:py-14 bg-charcoal">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-warm-white mb-6 leading-tight">
              Experience Our Technology
            </h2>
            <p className="text-lg md:text-xl text-warm-white/80 leading-loose mb-10">
              Schedule a visit to learn how our uMI Panorama and VERITON-CT
              systems can support your care or practice.
            </p>
            <Button
              href="/contact"
              variant="primary"
              className="!bg-warm-white !text-charcoal hover:!bg-warm-white/90"
            >
              Schedule a Visit
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

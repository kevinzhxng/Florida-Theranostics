import Container from "@/components/Container";
import Section from "@/components/Section";
import ImageTextSection from "@/components/ImageTextSection";
import Button from "@/components/Button";

export const metadata = {
  title: "Therapies | Florida Theranostics",
  description:
    "Advanced theranostic services and radioligand therapy in Jupiter, FL. Pluvicto, Lutathera, Xofigo, and more. Radiopharmaceutical Therapy Center of Excellence.",
};

const therapies = [
  {
    name: "Pluvicto®",
    subtitle: "Lutetium-177 PSMA",
    description:
      "Pluvicto is a targeted radioligand therapy used to treat PSMA-PET positive metastatic castration-resistant prostate cancer in patients who have been previously treated with androgen receptor pathway inhibition.",
  },
  {
    name: "Lutathera®",
    subtitle: "Lutetium-177 DOTATATE",
    description:
      "Lutathera is a targeted radioligand therapy used to treat somatostatin receptor–positive gastroenteropancreatic neuroendocrine tumors (GEP-NETs), pheochromocytomas, recurrent meningiomas, and esthesioneuroblastomas.",
  },
  {
    name: "Xofigo®",
    subtitle: "Radium-223 Dichloride",
    description:
      "Xofigo is a targeted alpha therapy used to treat bone metastases from castration-resistant prostate cancer.",
  },
  {
    name: "RadioIodine-131",
    subtitle: "I-131",
    description:
      "I-131 is a radioactive isotope of iodine used to treat hyperthyroidism and certain types of thyroid cancer by selectively destroying cancerous thyroid tissue.",
  },
];

export default function Therapies() {
  return (
    <>
      {/* Hero: Advanced Theranostic Services */}
      <ImageTextSection
        title="Advanced Theranostic Services"
        content={
          <div className="space-y-6">
            <p>
              We at Florida Theranostics pride ourselves on being pioneers in
              the field of theranostic services. Located in Jupiter, FL, we offer
              a unique blend of cutting-edge technology and compassionate care.
            </p>
            <p>
              With almost 2 years since receiving the Radiopharmaceutical
              Therapy Center of Excellence designation from the Society of
              Nuclear Medicine—the only one of its kind in South Florida—we
              have administered nearly 900 cycles of radioligand therapies.
            </p>
          </div>
        }
        imagePosition="right"
        imageSrc="/images/Advance-Theranostics-Therapy.webp"
        imageAlt="Advanced theranostic care at Florida Theranostics"
      />

      {/* Therapies Grid */}
      <Section className="py-10 md:py-14 bg-surface-cool">
        <Container>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-charcoal mb-12 md:mb-16 text-center leading-tight">
              Our Therapies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              {therapies.map((therapy, index) => (
                <div
                  key={index}
                  className="border-b border-charcoal/10 pb-10 md:pb-12"
                >
                  <h3 className="text-xl md:text-2xl font-serif font-normal text-charcoal mb-1 leading-tight">
                    {therapy.name}
                  </h3>
                  <p className="text-sm uppercase tracking-wider text-navy/80 font-sans mb-4">
                    {therapy.subtitle}
                  </p>
                  <p className="text-lg text-text-muted leading-loose">
                    {therapy.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Innovative PRRT */}
      <ImageTextSection
        title="Innovative PRRT Treatments"
        content={
          <div className="space-y-5">
            <p>
              <strong className="text-charcoal font-sans">
                Peptide Receptor Radionuclide Therapy (PRRT)
              </strong>{" "}
              combines a targeting peptide with a radioactive substance to
              deliver radiation directly to cancer cells—a precise, highly
              targeted option for specific cancers.
            </p>
            <ul className="space-y-3 text-lg text-text-muted leading-relaxed list-none">
              <li className="flex gap-3">
                <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                <span>
                  <strong className="text-charcoal font-sans">Targeted delivery:</strong>{" "}
                  The peptide binds to receptors on cancer cells, minimizing
                  damage to healthy tissue.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                <span>
                  <strong className="text-charcoal font-sans">Neuroendocrine tumors:</strong>{" "}
                  PRRT is especially effective for patients with neuroendocrine
                  tumors.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                <span>
                  <strong className="text-charcoal font-sans">Expert care:</strong>{" "}
                  Our team uses state-of-the-art technology to ensure accurate,
                  effective treatment as part of our comprehensive theranostic
                  services.
                </span>
              </li>
            </ul>
          </div>
        }
        imagePosition="left"
        imageSrc="/images/grand-opening/Group-4.png.webp"
        imageAlt="PRRT and theranostic care at Florida Theranostics"
      />

      {/* Our Goal */}
      <Section className="py-10 md:py-14 bg-surface-cool">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-charcoal mb-8 md:mb-10 leading-tight">
              Our Goal
            </h2>
            <p className="text-lg md:text-xl text-text-muted leading-loose mb-8">
              Our goal is to provide high-quality medical care, exceptional
              customer service, and state-of-the-art PET imaging solutions to all
              our patients.
            </p>
            <ul className="space-y-4 text-lg text-text-muted leading-loose list-none">
              <li className="flex gap-3">
                <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                <span>
                  We are dedicated to improving patient outcomes through
                  innovative treatments like PRRT and radioligand therapies.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                <span>
                  Our experienced medical team collaborates closely with your
                  primary doctor to optimize therapy management strategies,
                  ensuring you receive the best possible care.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                <span>
                  We are committed to serving our community and making a lasting
                  impact on patient lives with our ultrafast digital PET imaging
                  and molecular imaging solutions.
                </span>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* CTA: Molecular Imaging */}
      <Section className="py-10 md:py-14 bg-charcoal">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-warm-white mb-6 leading-tight">
              Deeper Health Insights With Molecular Imaging
            </h2>
            <p className="text-lg md:text-xl text-warm-white/80 leading-loose mb-10">
              Molecular imaging offers an unparalleled view into the
              body&apos;s functions, revealing disease at its earliest stages.
              Learn how our diagnostic tools provide detailed, precise
              information to guide your care.
            </p>
            <Button
              href="/molecular-imaging"
              variant="primary"
              className="!bg-warm-white !text-charcoal hover:!bg-warm-white/90"
            >
              Explore Our Imaging Capabilities
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

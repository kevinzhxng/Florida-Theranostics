import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ImageTextSection from "@/components/ImageTextSection";
import Button from "@/components/Button";

export const metadata = {
  title: "Molecular Imaging | Florida Theranostics",
  description:
    "Advanced molecular PET imaging and SPECT-CT in Jupiter, FL. Ultrafast digital PET-CT, amyloid PET, PSMA, FDG, DOTATATE, and more.",
};

const petCtModalities = [
  {
    name: "Amyloid PET Brain",
    subtitle: "Alzheimer's & neurodegenerative disorders",
    description:
      "Amyloid PET visualizes amyloid plaques in the brain, a hallmark of Alzheimer's disease and other neurodegenerative disorders. It helps differentiate Alzheimer's from other dementias and can aid in selecting patients for therapies targeting amyloid plaques.",
    imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true.webp",
    imageAlt: "Amyloid PET brain imaging",
  },
  {
    name: "PSMA PET-CT",
    subtitle: "Prostate cancer • Ga-68 PSMA (Illucix™) • F-18 PSMA (Pylarify™ or Posluma™)",
    description:
      "PSMA PET targets prostate-specific membrane antigen, overexpressed by prostate cancer cells and metastases. Used to detect and diagnose prostate cancer, especially when the cancer may have spread or recurred.",
    imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true-1.webp",
    imageAlt: "PSMA PET-CT prostate cancer imaging",
  },
  {
    name: "F-18 FDG",
    subtitle: "Oncology & beyond",
    description:
      "FDG-PET uses a radioactive glucose analog to visualize metabolic activity. Primarily used in oncology (cancer imaging), with applications in cardiology, neurology, infection, and inflammation.",
    imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true-2.webp",
    imageAlt: "F-18 FDG oncology PET imaging",
  },
  {
    name: "DOTATATE PET",
    subtitle: "Neuroendocrine tumors, meningiomas, pheochromocytomas",
    description:
      "Uses a radioactive tracer targeting somatostatin receptors (SSTR), which are overexpressed in neuroendocrine tumors (NETs), meningiomas, and pheochromocytomas. Helps detect and diagnose these conditions.",
    imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true-3.webp",
    imageAlt: "DOTATATE PET neuroendocrine imaging",
  },
  {
    name: "FES-PET Cerianna™",
    subtitle: "ER+ breast cancer",
    description:
      "Uses fluoroestradiol to visualize estrogen receptors. Particularly useful in diagnosing and monitoring hormone receptor–positive breast cancer when standard imaging or biopsy is inconclusive or challenging.",
    imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true-4.webp",
    imageAlt: "FES-PET Cerianna ER+ breast cancer imaging",
  },
  {
    name: "F-18 Flurpiridaz FLYRCARDO™",
    subtitle: "Myocardial perfusion",
    description:
      "Used for myocardial perfusion imaging to diagnose and evaluate coronary artery disease (CAD). FDA-approved for known or suspected CAD; designed to improve detection and provide a more accurate assessment of myocardial blood flow.",
    imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true-5.webp",
    imageAlt: "F-18 Flurpiridaz myocardial perfusion imaging",
  },
];

const spectCtModalities = [
  {
    name: "DATscan",
    subtitle: "Parkinson's",
    description:
      "A brain scan that uses a radioactive tracer to visualize dopamine transporters. Primarily used to help diagnose Parkinson's disease and other parkinsonian syndromes.",
    imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true-6.webp",
    imageAlt: "DATscan Parkinson's brain imaging",
  },
  {
    name: "Thyroid scan and uptake",
    subtitle: "RAIU",
    description:
      "Radioactive iodine uptake (RAIU) evaluates thyroid function and identifies abnormalities such as nodules, goiter, or overactive or underactive thyroid. Helps diagnose thyroid problems and evaluate treatment effects.",
    imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true-7.webp",
    imageAlt: "Thyroid scan and uptake imaging",
  },
  {
    name: "Parathyroid Sestamibi SPECT-CT",
    subtitle: "Parathyroid localization",
    description:
      "Helps pinpoint the location of an overactive parathyroid gland, especially before surgery to remove it.",
    imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true-8.webp",
    imageAlt: "Parathyroid Sestamibi SPECT-CT imaging",
  },
];

export default function MolecularImaging() {
  return (
    <>
      {/* Hero: Advanced Molecular PET Imaging Solutions */}
      <ImageTextSection
        title="Advanced Molecular PET Imaging Solutions"
        content={
          <div className="space-y-6">
            <p>
              Florida Theranostics specializes in state-of-the-art molecular
              imaging solutions, including our renowned molecular PET scan. We
              offer advanced diagnostic and therapeutic services for
              comprehensive cancer treatment and management.
            </p>
            <p>
              We proudly partner with oncology experts and primary doctors to
              optimize therapy and improve patient outcomes.
            </p>
          </div>
        }
        imagePosition="right"
        imageSrc="/images/Ultrafast-PET-Imaging.webp"
        imageAlt="Advanced molecular PET imaging at Florida Theranostics"
      />

      {/* Intro: Ultrafast digital PET-CT and SPECT-CT */}
      <Section className="py-10 md:py-14 bg-warm-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-charcoal mb-6 leading-tight">
              Molecular Imaging with Ultrafast Digital PET-CT and SPECT-CT
            </h2>
            <p className="text-lg md:text-xl text-text-muted leading-loose">
              Our imaging capabilities combine the latest in PET-CT and SPECT-CT
              technology to deliver precise, reliable diagnostics.
            </p>
          </div>
        </Container>
      </Section>

      {/* PET-CT Imaging */}
      <Section className="py-10 md:py-14 bg-warm-white">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal text-charcoal mb-2 leading-tight">
                PET-CT Imaging
              </h2>
              <p className="text-sm uppercase tracking-wider text-navy/80 font-sans">
                Positron Emission Tomography – Computed Tomography
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
              {petCtModalities.map((modality, index) => (
                <div
                  key={index}
                  className="border-b border-charcoal/10 pb-10 md:pb-12 flex flex-col"
                >
                  {"imageSrc" in modality && modality.imageSrc && (
                    <div className="relative w-full aspect-[2/1] mb-6 overflow-hidden bg-gray-100 rounded-sm">
                      <Image
                        src={modality.imageSrc}
                        alt={modality.imageAlt ?? modality.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <h3 className="text-xl md:text-2xl font-serif font-normal text-charcoal mb-1 leading-tight">
                    {modality.name}
                  </h3>
                  <p className="text-sm uppercase tracking-wider text-navy/80 font-sans mb-4">
                    {modality.subtitle}
                  </p>
                  <p className="text-lg text-text-muted leading-loose">
                    {modality.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* SPECT-CT Nuclear Medicine Imaging */}
      <Section className="py-10 md:py-14 bg-warm-white">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal text-charcoal mb-2 leading-tight">
                SPECT-CT Nuclear Medicine Imaging
              </h2>
              <p className="text-lg text-text-muted leading-loose max-w-3xl">
                SPECT-CT (Single-Photon Emission Computed Tomography – Computed
                Tomography) combines functional SPECT imaging with anatomical
                CT. Radioactive tracers show how organs and tissues function,
                while CT provides detailed anatomy—enabling more precise
                diagnosis and localization in cancer, cardiac, and neurological
                conditions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {spectCtModalities.map((modality, index) => (
                <div
                  key={index}
                  className="border-b border-charcoal/10 pb-10 md:pb-12 flex flex-col"
                >
                  {"imageSrc" in modality && modality.imageSrc && (
                    <div className="relative w-full aspect-[2/1] mb-6 overflow-hidden bg-gray-100 rounded-sm">
                      <Image
                        src={modality.imageSrc}
                        alt={modality.imageAlt ?? modality.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <h3 className="text-xl md:text-2xl font-serif font-normal text-charcoal mb-1 leading-tight">
                    {modality.name}
                  </h3>
                  <p className="text-sm uppercase tracking-wider text-navy/80 font-sans mb-4">
                    {modality.subtitle}
                  </p>
                  <p className="text-lg text-text-muted leading-loose">
                    {modality.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Our foundation: Precision medicine */}
      <ImageTextSection
        title="Precision Medicine at the Forefront"
        content={
          <div className="space-y-6">
            <p>
              Florida Theranostics is built on the foundation of precision
              medicine, committed to delivering efficient, precise, and
              empathetic care to every patient. Our goal is to be at the
              forefront of radioligand therapy and molecular imaging in South
              Florida.
            </p>
            <p>
              We believe leveraging cutting-edge technology—including the United
              Imaging uMI Panorama PET/CT and the Veriton 400 SPECT-CT—brings us
              closer to that goal.
            </p>
          </div>
        }
        imagePosition="left"
        imageSrc="/images/grand-opening/FLTGOPen-63.jpg"
        imageAlt="Molecular imaging and precision medicine at Florida Theranostics"
      />

      {/* Dynamic PET Studies */}
      <Section className="py-10 md:py-14 bg-warm-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-charcoal mb-8 md:mb-10 leading-tight">
              Dynamic PET Studies
            </h2>
            <p className="text-lg md:text-xl text-text-muted leading-loose mb-8">
              We offer dynamic PET studies that are pivotal in diagnosing and
              managing complex health conditions.
            </p>
            <ul className="space-y-3 text-lg text-text-muted leading-relaxed list-none">
              <li className="flex gap-3">
                <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                <span>
                  Our advanced imaging technology captures real-time data,
                  providing detailed insights into biological processes.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                <span>
                  This precision aids in crafting individualized treatment plans,
                  ensuring optimal patient outcomes.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                <span>
                  Our team utilizes state-of-the-art PET-CT and SPECT-CT
                  imaging to deliver accurate diagnostics.
                </span>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* CTA: Book Your Appointment */}
      <Section className="py-10 md:py-14 bg-charcoal">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-warm-white mb-6 leading-tight">
              Book Your Appointment
            </h2>
            <p className="text-lg md:text-xl text-warm-white/80 leading-loose mb-10">
              Understanding your health begins with accurate and detailed
              diagnostics. Schedule your appointment today.
            </p>
            <Button
              href="/contact"
              variant="primary"
              className="!bg-warm-white !text-charcoal hover:!bg-warm-white/90"
            >
              Schedule Now
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

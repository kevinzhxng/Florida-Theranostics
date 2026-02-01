import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ImageTextSection from "@/components/ImageTextSection";
import Button from "@/components/Button";
import { client } from "@/lib/sanity";
import { molecularImagingPageQuery, fetchOptions } from "@/lib/sanity/queries";
import { getImageUrl } from "@/lib/sanity/helpers";

export const metadata = {
  title: "Molecular Imaging | Florida Theranostics",
  description:
    "Advanced molecular PET imaging and SPECT-CT in Jupiter, FL. Ultrafast digital PET-CT, amyloid PET, PSMA, FDG, DOTATATE, and more.",
};

export const dynamic = "force-dynamic";

const DEFAULT_PET_CT = [
  { name: "Amyloid PET Brain", subtitle: "Alzheimer's & neurodegenerative disorders", description: "Amyloid PET visualizes amyloid plaques in the brain, a hallmark of Alzheimer's disease and other neurodegenerative disorders.", imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true.webp" },
  { name: "PSMA PET-CT", subtitle: "Prostate cancer • Ga-68 PSMA (Illucix™) • F-18 PSMA (Pylarify™ or Posluma™)", description: "PSMA PET targets prostate-specific membrane antigen, overexpressed by prostate cancer cells and metastases.", imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true-1.webp" },
  { name: "F-18 FDG", subtitle: "Oncology & beyond", description: "FDG-PET uses a radioactive glucose analog to visualize metabolic activity. Primarily used in oncology (cancer imaging).", imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true-2.webp" },
  { name: "DOTATATE PET", subtitle: "Neuroendocrine tumors, meningiomas, pheochromocytomas", description: "Uses a radioactive tracer targeting somatostatin receptors (SSTR), overexpressed in neuroendocrine tumors.", imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true-3.webp" },
  { name: "FES-PET Cerianna™", subtitle: "ER+ breast cancer", description: "Uses fluoroestradiol to visualize estrogen receptors. Particularly useful in hormone receptor–positive breast cancer.", imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true-4.webp" },
  { name: "F-18 Flurpiridaz FLYRCARDO™", subtitle: "Myocardial perfusion", description: "Used for myocardial perfusion imaging to diagnose and evaluate coronary artery disease (CAD).", imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true-5.webp" },
];

const DEFAULT_SPECT_CT = [
  { name: "DATscan", subtitle: "Parkinson's", description: "A brain scan that uses a radioactive tracer to visualize dopamine transporters. Primarily used to help diagnose Parkinson's disease.", imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true-6.webp" },
  { name: "Thyroid scan and uptake", subtitle: "RAIU", description: "Radioactive iodine uptake (RAIU) evaluates thyroid function and identifies abnormalities such as nodules, goiter.", imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true-7.webp" },
  { name: "Parathyroid Sestamibi SPECT-CT", subtitle: "Parathyroid localization", description: "Helps pinpoint the location of an overactive parathyroid gland, especially before surgery to remove it.", imageSrc: "/images/molecular-imaging/rsw_508h_254cg_true-8.webp" },
];

export default async function MolecularImagingPage() {
  let heroTitle = "Advanced Molecular PET Imaging Solutions";
  let heroBody = "Florida Theranostics specializes in state-of-the-art molecular imaging solutions, including our renowned molecular PET scan. We offer advanced diagnostic and therapeutic services for comprehensive cancer treatment and management.\n\nWe proudly partner with oncology experts and primary doctors to optimize therapy and improve patient outcomes.";
  let heroImageSrc = "/images/Ultrafast-PET-Imaging.webp";
  let introTitle = "Molecular Imaging with Ultrafast Digital PET-CT and SPECT-CT";
  let introBody = "Our imaging capabilities combine the latest in PET-CT and SPECT-CT technology to deliver precise, reliable diagnostics.";
  let petCtTitle = "PET-CT Imaging";
  let petCtSubtitle = "Positron Emission Tomography – Computed Tomography";
  let petCtModalities = DEFAULT_PET_CT;
  let spectCtTitle = "SPECT-CT Nuclear Medicine Imaging";
  let spectCtIntro = "SPECT-CT (Single-Photon Emission Computed Tomography – Computed Tomography) combines functional SPECT imaging with anatomical CT. Radioactive tracers show how organs and tissues function, while CT provides detailed anatomy.";
  let spectCtModalities = DEFAULT_SPECT_CT;
  let precisionTitle = "Precision Medicine at the Forefront";
  let precisionBody = "Florida Theranostics is built on the foundation of precision medicine, committed to delivering efficient, precise, and empathetic care to every patient.\n\nWe believe leveraging cutting-edge technology—including the United Imaging uMI Panorama PET/CT and the Veriton 400 SPECT-CT—brings us closer to that goal.";
  let precisionImageSrc = "/images/grand-opening/FLTGOPen-63.jpg";
  let dynamicPetTitle = "Dynamic PET Studies";
  let dynamicPetIntro = "We offer dynamic PET studies that are pivotal in diagnosing and managing complex health conditions.";
  let dynamicPetBullets = [
    "Our advanced imaging technology captures real-time data, providing detailed insights into biological processes.",
    "This precision aids in crafting individualized treatment plans, ensuring optimal patient outcomes.",
    "Our team utilizes state-of-the-art PET-CT and SPECT-CT imaging to deliver accurate diagnostics.",
  ];
  let ctaTitle = "Book Your Appointment";
  let ctaBody = "Understanding your health begins with accurate and detailed diagnostics. Schedule your appointment today.";
  let ctaButtonLabel = "Schedule Now";
  let ctaButtonHref = "/contact";

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const data = await client.fetch<{
        heroTitle?: string | null;
        heroBody?: string | null;
        heroImage?: unknown;
        introTitle?: string | null;
        introBody?: string | null;
        petCtTitle?: string | null;
        petCtSubtitle?: string | null;
        petCtModalities?: Array<{ name?: string; subtitle?: string; description?: string; image?: unknown }> | null;
        spectCtTitle?: string | null;
        spectCtIntro?: string | null;
        spectCtModalities?: Array<{ name?: string; subtitle?: string; description?: string; image?: unknown }> | null;
        precisionTitle?: string | null;
        precisionBody?: string | null;
        precisionImage?: unknown;
        dynamicPetTitle?: string | null;
        dynamicPetIntro?: string | null;
        dynamicPetBullets?: string[] | null;
        ctaTitle?: string | null;
        ctaBody?: string | null;
        ctaButtonLabel?: string | null;
        ctaButtonHref?: string | null;
      } | null>(molecularImagingPageQuery, {}, fetchOptions);
      if (data) {
        if (data.heroTitle) heroTitle = data.heroTitle;
        if (data.heroBody) heroBody = data.heroBody;
        if (data.heroImage) heroImageSrc = getImageUrl(data.heroImage) ?? heroImageSrc;
        if (data.introTitle) introTitle = data.introTitle;
        if (data.introBody) introBody = data.introBody ?? introBody;
        if (data.petCtTitle) petCtTitle = data.petCtTitle;
        if (data.petCtSubtitle) petCtSubtitle = data.petCtSubtitle ?? petCtSubtitle;
        if (data.petCtModalities?.length) petCtModalities = data.petCtModalities.map((m, i) => ({ name: m.name ?? DEFAULT_PET_CT[i]?.name ?? "", subtitle: m.subtitle ?? "", description: m.description ?? "", imageSrc: getImageUrl(m.image) ?? DEFAULT_PET_CT[i]?.imageSrc ?? "" }));
        if (data.spectCtTitle) spectCtTitle = data.spectCtTitle;
        if (data.spectCtIntro) spectCtIntro = data.spectCtIntro ?? spectCtIntro;
        if (data.spectCtModalities?.length) spectCtModalities = data.spectCtModalities.map((m, i) => ({ name: m.name ?? DEFAULT_SPECT_CT[i]?.name ?? "", subtitle: m.subtitle ?? "", description: m.description ?? "", imageSrc: getImageUrl(m.image) ?? DEFAULT_SPECT_CT[i]?.imageSrc ?? "" }));
        if (data.precisionTitle) precisionTitle = data.precisionTitle;
        if (data.precisionBody) precisionBody = data.precisionBody ?? precisionBody;
        if (data.precisionImage) precisionImageSrc = getImageUrl(data.precisionImage) ?? precisionImageSrc;
        if (data.dynamicPetTitle) dynamicPetTitle = data.dynamicPetTitle;
        if (data.dynamicPetIntro) dynamicPetIntro = data.dynamicPetIntro ?? dynamicPetIntro;
        if (data.dynamicPetBullets?.length) dynamicPetBullets = data.dynamicPetBullets;
        if (data.ctaTitle) ctaTitle = data.ctaTitle;
        if (data.ctaBody) ctaBody = data.ctaBody ?? ctaBody;
        if (data.ctaButtonLabel) ctaButtonLabel = data.ctaButtonLabel;
        if (data.ctaButtonHref) ctaButtonHref = data.ctaButtonHref;
      }
    } catch {
      // use defaults
    }
  }

  return (
    <>
      <ImageTextSection title={heroTitle} content={<div className="space-y-6">{heroBody.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}</div>} imagePosition="right" imageSrc={heroImageSrc} imageAlt={heroTitle} />
      <Section className="py-10 md:py-14 bg-warm-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-charcoal mb-6 leading-tight">{introTitle}</h2>
            <p className="text-lg md:text-xl text-text-muted leading-loose">{introBody}</p>
          </div>
        </Container>
      </Section>
      <Section className="py-10 md:py-14 bg-warm-white">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal text-charcoal mb-2 leading-tight">{petCtTitle}</h2>
              <p className="text-sm uppercase tracking-wider text-navy/80 font-sans">{petCtSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
              {petCtModalities.map((modality, index) => (
                <div key={index} className="border-b border-charcoal/10 pb-10 md:pb-12 flex flex-col">
                  {modality.imageSrc && (
                    <div className="relative w-full aspect-[2/1] mb-6 overflow-hidden bg-gray-100 rounded-sm">
                      <Image src={modality.imageSrc} alt={modality.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    </div>
                  )}
                  <h3 className="text-xl md:text-2xl font-serif font-normal text-charcoal mb-1 leading-tight">{modality.name}</h3>
                  <p className="text-sm uppercase tracking-wider text-navy/80 font-sans mb-4">{modality.subtitle}</p>
                  <p className="text-lg text-text-muted leading-loose">{modality.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <Section className="py-10 md:py-14 bg-warm-white">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-normal text-charcoal mb-2 leading-tight">{spectCtTitle}</h2>
              <p className="text-lg text-text-muted leading-loose max-w-3xl">{spectCtIntro}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {spectCtModalities.map((modality, index) => (
                <div key={index} className="border-b border-charcoal/10 pb-10 md:pb-12 flex flex-col">
                  {modality.imageSrc && (
                    <div className="relative w-full aspect-[2/1] mb-6 overflow-hidden bg-gray-100 rounded-sm">
                      <Image src={modality.imageSrc} alt={modality.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                  )}
                  <h3 className="text-xl md:text-2xl font-serif font-normal text-charcoal mb-1 leading-tight">{modality.name}</h3>
                  <p className="text-sm uppercase tracking-wider text-navy/80 font-sans mb-4">{modality.subtitle}</p>
                  <p className="text-lg text-text-muted leading-loose">{modality.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <ImageTextSection title={precisionTitle} content={<div className="space-y-6">{precisionBody.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}</div>} imagePosition="left" imageSrc={precisionImageSrc} imageAlt={precisionTitle} />
      <Section className="py-10 md:py-14 bg-warm-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-charcoal mb-8 md:mb-10 leading-tight">{dynamicPetTitle}</h2>
            <p className="text-lg md:text-xl text-text-muted leading-loose mb-8">{dynamicPetIntro}</p>
            <ul className="space-y-3 text-lg text-text-muted leading-relaxed list-none">
              {dynamicPetBullets.map((bullet, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
      <Section className="py-10 md:py-14 bg-charcoal">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-warm-white mb-6 leading-tight">{ctaTitle}</h2>
            <p className="text-lg md:text-xl text-warm-white/80 leading-loose mb-10">{ctaBody}</p>
            <Button href={ctaButtonHref} variant="primary" className="!bg-warm-white !text-charcoal hover:!bg-warm-white/90">{ctaButtonLabel}</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

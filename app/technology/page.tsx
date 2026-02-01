import Container from "@/components/Container";
import Section from "@/components/Section";
import ImageTextSection from "@/components/ImageTextSection";
import Button from "@/components/Button";
import { client } from "@/lib/sanity";
import { technologyPageQuery, fetchOptions } from "@/lib/sanity/queries";
import { getImageUrl } from "@/lib/sanity/helpers";

export const metadata = {
  title: "Technology | Florida Theranostics",
  description:
    "uMI Panorama PET/CT and VERITON-CT SPECT/CT. State-of-the-art molecular imaging and theranostics technology in Jupiter, FL.",
};

export const dynamic = "force-dynamic";

const DEFAULT_SECTION1_BULLETS = [
  "Spacious design: 76 cm bore and 700 lb table ensure accessibility for all patients.",
  "AI-driven workflow: Intuitive patient positioning and smart scan planning streamline operations.",
  "Deep-learning reconstruction: Ultra-sharp image detail at low doses, with full support for advanced theranostic and research workflows.",
];

const DEFAULT_SECTION2_BULLETS = [
  "Comfort & inclusivity: 80 cm bore designed for patient comfort and accessibility.",
  "Ultra-high sensitivity: Quantitative accuracy ideal for theranostics applications and precise radioligand dosimetry.",
  "Integrated TruView console: Whether you opt for 16-slice or 64-slice CT, acquisition, reconstruction, and analysis are unified to streamline workflow.",
];

export default async function TechnologyPage() {
  let section1Title = "uMI Panorama PET/CT";
  let section1Body = "Blending precision, speed, and comfort, the uMI Panorama represents the pinnacle of PET/CT innovation. Its exceptional 2.9 mm PET resolution and sub-200 ps TOF performance deliver crystal-clear imaging.\n\nAs Florida's first institution to offer this technology, Florida Theranostics underscores its leadership in delivering early, personalized, and precise molecular care.";
  let section1Bullets = DEFAULT_SECTION1_BULLETS;
  let section1ImageSrc = "/images/Group-6.png.webp";
  let section2Title = "VERITON-CT SPECT/CT";
  let section2Body = "Redefining SPECT/CT with digital innovation, the VERITON-CT offers full 360° CZT detector coverage, delivering total-body 3D imaging in under 30 minutes.\n\nFlorida Theranostics is proud to offer this state-of-the-art imaging capability for personalized, efficient, and advanced molecular imaging care.";
  let section2Bullets = DEFAULT_SECTION2_BULLETS;
  let section2ImageSrc = "/images/GettyImages-1502040018-2048x1367.jpg";
  let ctaTitle = "Experience Our Technology";
  let ctaBody = "Schedule a visit to learn how our uMI Panorama and VERITON-CT systems can support your care or practice.";
  let ctaButtonLabel = "Schedule a Visit";
  let ctaButtonHref = "/contact";

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const data = await client.fetch<{
        section1Title?: string | null;
        section1Body?: string | null;
        section1Bullets?: string[] | null;
        section1Image?: unknown;
        section2Title?: string | null;
        section2Body?: string | null;
        section2Bullets?: string[] | null;
        section2Image?: unknown;
        ctaTitle?: string | null;
        ctaBody?: string | null;
        ctaButtonLabel?: string | null;
        ctaButtonHref?: string | null;
      } | null>(technologyPageQuery, {}, fetchOptions);
      if (data) {
        if (data.section1Title) section1Title = data.section1Title;
        if (data.section1Body) section1Body = data.section1Body ?? section1Body;
        if (data.section1Bullets?.length) section1Bullets = data.section1Bullets;
        if (data.section1Image) section1ImageSrc = getImageUrl(data.section1Image) ?? section1ImageSrc;
        if (data.section2Title) section2Title = data.section2Title;
        if (data.section2Body) section2Body = data.section2Body ?? section2Body;
        if (data.section2Bullets?.length) section2Bullets = data.section2Bullets;
        if (data.section2Image) section2ImageSrc = getImageUrl(data.section2Image) ?? section2ImageSrc;
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
      <ImageTextSection
        title={section1Title}
        content={
          <div className="space-y-6">
            {section1Body.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
            <ul className="space-y-3 text-lg text-text-muted leading-relaxed list-none">
              {section1Bullets.map((bullet, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        }
        imagePosition="right"
        imageSrc={section1ImageSrc}
        imageAlt={section1Title}
      />
      <ImageTextSection
        className="bg-surface-cool"
        title={section2Title}
        content={
          <div className="space-y-6">
            {section2Body.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
            <ul className="space-y-3 text-lg text-text-muted leading-relaxed list-none">
              {section2Bullets.map((bullet, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-navy shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-navy" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        }
        imagePosition="left"
        imageSrc={section2ImageSrc}
        imageAlt={section2Title}
      />
      <Section className="py-10 md:py-14 bg-charcoal">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-warm-white mb-6 leading-tight">{ctaTitle}</h2>
            <p className="text-lg md:text-xl text-warm-white/80 leading-loose mb-10">{ctaBody}</p>
            <Button href={ctaButtonHref} variant="primary" className="!bg-warm-white !text-charcoal hover:!bg-warm-white/90">
              {ctaButtonLabel}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

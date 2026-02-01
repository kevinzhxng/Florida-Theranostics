import HeroSection from "@/components/HeroSection";
import ImageTextSection from "@/components/ImageTextSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Button from "@/components/Button";
import Section from "@/components/Section";
import { client } from "@/lib/sanity";
import { homePageQuery, fetchOptions } from "@/lib/sanity/queries";
import { getImageUrl } from "@/lib/sanity/helpers";

export const dynamic = "force-dynamic";

const DEFAULT_FEATURES = [
  { title: "Ultrafast PET Imaging", description: "Offers unparalleled diagnostic precision.", imageSrc: "/images/Ultrafast-PET-Imaging.webp", imageAlt: "Ultrafast PET Imaging", href: "/molecular-imaging" },
  { title: "Advance Theranostics Therapy", description: "Ensures high-quality, reliable results.", imageSrc: "/images/Advance-Theranostics-Therapy.webp", imageAlt: "Advance Theranostics Therapy", href: "/therapies" },
  { title: "Tailored Care Plans", description: "Based on accurate data and insights.", imageSrc: "/images/Tailored-Care-Plans.webp", imageAlt: "Tailored Care Plans", href: "/therapies" },
];

const DEFAULT_SECTIONS = [
  { title: "Leading Expertise in Radiopharmaceutical Therapy", body: "Our team at Florida Theranostics administers radioligand therapies with a focus on patient safety and treatment efficacy. We collaborate with your primary doctor to optimize therapy management strategies, ensuring a holistic approach to your healthcare. Our nearly 900 cycles of radioligand therapies are a testament to our experience and dedication.", imagePosition: "right" as const, imageSrc: "/images/grand-opening/8R3A1459.jpeg", imageAlt: "Leading Expertise", buttonLabel: "", buttonHref: "" },
  { title: "Why Our Expertise Matters to You", body: "Our team of experienced medical professionals is dedicated to providing the highest standard of care.\n\nWith our Radiopharmaceutical Therapy Center of Excellence designation, we ensure that every patient receives expert attention and the most advanced treatment options available in South Florida.", imagePosition: "left" as const, imageSrc: "/images/grand-opening/FLTGO-14.jpg", imageAlt: "Why Our Expertise Matters", buttonLabel: "Explore Therapy Options", buttonHref: "/therapies" },
  { title: "Explore Imaging Solutions", body: "Experience the difference that our advanced imaging and therapy solutions can make in your healthcare journey. Dive into our offerings today.", imagePosition: "right" as const, imageSrc: "/images/grand-opening/FLTGOPen-60.jpg", imageAlt: "Explore Imaging Solutions", buttonLabel: "View Imaging Solutions", buttonHref: "/molecular-imaging" },
];

const DEFAULT_TESTIMONIALS = [
  { quote: "Very nice experience here. Office was lovely and comfortable. Jordan was perfect with the IV insertion and she was very friendly. I will recommend here highly and I'll return for any future scans.", author: "Ina McDonald" },
  { quote: "5 stars aren't enough. Staff members were kind, considerate, compassionate, empathetic and caring. HIGH PRAISE FOR THE STAFF. THANK YOU, AGAIN AND AGAIN.", author: "Mark C" },
  { quote: "The staff and the medical team are a dream! Their kindness and patience were exceptional! Chuck couldn't have been more gentle! Thank you for making a stressful situation easy!", author: "Karen Musikoff" },
  { quote: "Great facility and friendly staff. Appointment was on time along with the prep and procedure which was conduced very professionally.", author: "Daniel Ford" },
  { quote: "Top notch in every way. Everyone on the team has been very well-informed and communicative about the procedures and scheduling. The office feels like an immaculate, very welcoming home and is extremely comfortable to get treatments in. Thank you very much to Dr. Krishnan and Chuck for this amazing treatment in Jupiter. I hope to be able to update my review after scans at the end of my rounds of treatment with news that they worked!", author: "Scott Wheeler" },
];

export default async function Home() {
  let heroHeadline = "Setting the Standard in Molecular imaging and Theranostics";
  let heroCtaText = "Schedule a Consultation";
  let heroCtaHref = "/contact";
  let heroVideoUrl: string | undefined = "/videos/Florida Theranostics Video 1.mp4";
  let featuresSectionTitle = "Smart Diagnostics, Customized Solutions";
  let features = DEFAULT_FEATURES;
  let sections = DEFAULT_SECTIONS;
  let testimonialsSectionTitle = "Hear From Our Patients";
  let testimonials = DEFAULT_TESTIMONIALS;

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const data = await client.fetch<{
        heroHeadline?: string | null;
        heroCtaText?: string | null;
        heroCtaHref?: string | null;
        heroVideo?: { asset?: { url?: string | null } | null } | null;
        featuresSectionTitle?: string | null;
        features?: Array<{ title?: string; description?: string; image?: unknown; href?: string }> | null;
        sections?: Array<{ title?: string; body?: string; imagePosition?: string; image?: unknown; buttonLabel?: string; buttonHref?: string }> | null;
        testimonialsSectionTitle?: string | null;
        testimonials?: Array<{ quote?: string; author?: string }> | null;
      } | null>(homePageQuery, {}, fetchOptions);

      if (data) {
        if (data.heroHeadline) heroHeadline = data.heroHeadline;
        if (data.heroCtaText) heroCtaText = data.heroCtaText;
        if (data.heroCtaHref) heroCtaHref = data.heroCtaHref;
        if (data.heroVideo?.asset?.url) heroVideoUrl = data.heroVideo.asset.url;
        if (data.featuresSectionTitle) featuresSectionTitle = data.featuresSectionTitle;
        if (data.testimonialsSectionTitle) testimonialsSectionTitle = data.testimonialsSectionTitle;
        if (data.features?.length) {
          features = data.features.map((f, i) => ({
            title: f.title ?? DEFAULT_FEATURES[i]?.title ?? "",
            description: f.description ?? DEFAULT_FEATURES[i]?.description ?? "",
            imageSrc: getImageUrl(f.image) ?? DEFAULT_FEATURES[i]?.imageSrc ?? "",
            imageAlt: f.title ?? DEFAULT_FEATURES[i]?.imageAlt ?? "",
            href: f.href ?? DEFAULT_FEATURES[i]?.href ?? "",
          }));
        }
        if (data.sections?.length) {
          sections = data.sections.map((s, i) => ({
            title: s.title ?? DEFAULT_SECTIONS[i]?.title ?? "",
            body: s.body ?? DEFAULT_SECTIONS[i]?.body ?? "",
            imagePosition: (s.imagePosition === "left" ? "left" : "right") as "left" | "right",
            imageSrc: getImageUrl(s.image) ?? DEFAULT_SECTIONS[i]?.imageSrc ?? "",
            imageAlt: s.title ?? DEFAULT_SECTIONS[i]?.imageAlt ?? "",
            buttonLabel: s.buttonLabel ?? DEFAULT_SECTIONS[i]?.buttonLabel ?? "",
            buttonHref: s.buttonHref ?? DEFAULT_SECTIONS[i]?.buttonHref ?? "",
          }));
        }
        if (data.testimonials?.length) {
          testimonials = data.testimonials.map((t) => ({
            quote: t.quote ?? "",
            author: t.author ?? "",
          }));
        }
      }
    } catch {
      // use defaults
    }
  }

  return (
    <>
      <div className="-mt-24 md:-mt-28">
        <HeroSection
          videoSrc={heroVideoUrl || undefined}
          headline={heroHeadline}
          ctaText={heroCtaText}
          ctaHref={heroCtaHref}
        />
      </div>
      <FeaturesSection title={featuresSectionTitle} features={features} />
      {sections.map((sec, i) => (
        <ImageTextSection
          key={i}
          className={i % 2 === 1 ? "bg-surface-cool" : ""}
          title={sec.title}
          content={
            <div className="space-y-6">
              {sec.body.split("\n\n").map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {sec.buttonLabel && sec.buttonHref && (
                <div className="pt-4">
                  <Button href={sec.buttonHref} variant="primary">
                    {sec.buttonLabel}
                  </Button>
                </div>
              )}
            </div>
          }
          imagePosition={sec.imagePosition}
          imageSrc={sec.imageSrc}
          imageAlt={sec.imageAlt}
        />
      ))}
      <TestimonialsSection title={testimonialsSectionTitle} testimonials={testimonials} />
    </>
  );
}

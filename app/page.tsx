import HeroSection from "@/components/HeroSection";
import ImageTextSection from "@/components/ImageTextSection";

export default function Home() {
  return (
    <>
      {/* Hero Section with Video Background */}
      <HeroSection
        videoSrc="/videos/Florida Theranostics Video 1.mp4"
        headline="Setting the Standard in Nuclear Medicine"
        ctaText="Schedule a Consultation"
        ctaHref="/contact"
      />

      {/* Our Promise Section */}
      <ImageTextSection
        title="Our Promise"
        content={
          <p>
            [PLACEHOLDER: Our Promise content - Client to provide from current
            GoDaddy site. This section should describe your commitment to
            patients and your approach to care.]
          </p>
        }
        imagePosition="right"
        // imageSrc="/public/images/promise-image.jpg" // Uncomment when image is added
        imageAlt="Our Promise"
      />

      {/* Our Difference Section */}
      <ImageTextSection
        title="Our Difference"
        content={
          <div className="space-y-8">
            <p>
              [PLACEHOLDER: Our Difference content - Client to provide. Describe
              what makes your practice unique.]
            </p>
          </div>
        }
        imagePosition="left"
        // imageSrc="/images/difference-image.jpg" // Uncomment when image is added
        imageAlt="Our Difference"
      />

      {/* Our Principles Section */}
      <ImageTextSection
        title="Our Principles"
        content={
          <div className="space-y-8">
            <p>
              [PLACEHOLDER: Our Principles content - Client to provide. Explain
              your core values and approach to patient care.]
            </p>
          </div>
        }
        imagePosition="right"
        // imageSrc="/images/principles-image.jpg" // Uncomment when image is added
        imageAlt="Our Principles"
      />
    </>
  );
}

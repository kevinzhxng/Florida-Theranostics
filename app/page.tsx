import HeroSection from "@/components/HeroSection";
import ImageTextSection from "@/components/ImageTextSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Section from "@/components/Section";

export default function Home() {
  const features = [
    {
      title: "Ultrafast PET Imaging",
      description: "Offers unparalleled diagnostic precision.",
      imageSrc: "/images/Ultrafast-PET-Imaging.webp",
      imageAlt: "Ultrafast PET Imaging",
      href: "/molecular-imaging",
    },
    {
      title: "Advance Theranostics Therapy",
      description: "Ensures high-quality, reliable results.",
      imageSrc: "/images/Advance-Theranostics-Therapy.webp",
      imageAlt: "Advance Theranostics Therapy",
      href: "/therapies",
    },
    {
      title: "Tailored Care Plans",
      description: "Based on accurate data and insights.",
      imageSrc: "/images/Tailored-Care-Plans.webp",
      imageAlt: "Tailored Care Plans",
      href: "/therapies",
    },
  ];

  const testimonials = [
    {
      quote:
        "Very nice experience here. Office was lovely and comfortable. Jordan was perfect with the IV insertion and she was very friendly. I will recommend here highly and I'll return for any future scans.",
      author: "Ina McDonald",
    },
    {
      quote:
        "5 stars aren't enough. Staff members were kind, considerate, compassionate, empathetic and caring. HIGH PRAISE FOR THE STAFF. THANK YOU, AGAIN AND AGAIN.",
      author: "Mark C",
    },
    {
      quote:
        "The staff and the medical team are a dream! Their kindness and patience were exceptional! Chuck couldn't have been more gentle! Thank you for making a stressful situation easy!",
      author: "Karen Musikoff",
    },
    {
      quote:
        "Great facility and friendly staff. Appointment was on time along with the prep and procedure which was conduced very professionally.",
      author: "Daniel Ford",
    },
    {
      quote:
        "Top notch in every way. Everyone on the team has been very well-informed and communicative about the procedures and scheduling. The office feels like an immaculate, very welcoming home and is extremely comfortable to get treatments in. Thank you very much to Dr. Krishnan and Chuck for this amazing treatment in Jupiter. I hope to be able to update my review after scans at the end of my rounds of treatment with news that they worked!",
      author: "Scott Wheeler",
    },
  ];

  return (
    <>
      {/* Hero Section with Video Background */}
      <HeroSection
        videoSrc="/videos/Florida Theranostics Video 1.mp4"
        headline="Setting the Standard in Nuclear Medicine"
        ctaText="Schedule a Consultation"
        ctaHref="/contact"
      />

      {/* Smart Diagnostics Section */}
      <FeaturesSection
        title="Smart Diagnostics, Customized Solutions"
        features={features}
      />

      {/* Leading Expertise Section */}
      <ImageTextSection
        title="Leading Expertise in Radiopharmaceutical Therapy"
        content={
          <p>
            Our team at Florida Theranostics administers radioligand therapies
            with a focus on patient safety and treatment efficacy. We collaborate
            with your primary doctor to optimize therapy management strategies,
            ensuring a holistic approach to your healthcare. Our nearly 900 cycles
            of radioligand therapies are a testament to our experience and
            dedication.
          </p>
        }
        imagePosition="right"
        // imageSrc="/images/grand-opening/FLTGO-14.jpg"
        imageSrc="/images/grand-opening/8R3A1459.jpeg"
        imageAlt="Leading Expertise"
      />

      {/* Why Our Expertise Matters Section */}
      <ImageTextSection
        title="Why Our Expertise Matters to You"
        content={
          <div className="space-y-6">
            <p>
              Our team of experienced medical professionals is dedicated to
              providing the highest standard of care.
            </p>
            <ul className="space-y-4 text-lg text-text-muted leading-loose">
              <li>
                With our Radiopharmaceutical Therapy Center of Excellence
                designation, we ensure that every patient receives expert
                attention and the most advanced treatment options available in
                South Florida.
              </li>
            </ul>
            <div className="pt-4">
              <Button href="/therapies" variant="primary">
                Explore Therapy Options
              </Button>
            </div>
          </div>
        }
        imagePosition="left"
        imageSrc="/images/grand-opening/FLTGO-14.jpg" // Uncomment when image is added
        imageAlt="Why Our Expertise Matters"
      />

      {/* Explore Imaging Solutions Section */}
      <ImageTextSection
        title="Explore Imaging Solutions"
        content={
          <div className="space-y-6">
            <p>
              Experience the difference that our advanced imaging and therapy
              solutions can make in your healthcare journey. Dive into our offerings
              today.
            </p>
            <div className="pt-4">
              <Button href="/molecular-imaging" variant="primary">
                View Imaging Solutions
              </Button>
            </div>
          </div>
        }
        imagePosition="right"
        imageSrc="/images/grand-opening/FLTGOPen-60.jpg" // Uncomment when image is added
        imageAlt="Explore Imaging Solutions"
      />

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />
    </>
  );
}

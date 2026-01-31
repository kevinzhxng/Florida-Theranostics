import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ImageTextSection from "@/components/ImageTextSection";
import TeamSection from "@/components/TeamSection";
import Button from "@/components/Button";

export const metadata = {
  title: "About Us | Florida Theranostics",
  description:
    "Pioneering radiopharmaceutical therapies. Expert radiologists and team dedicated to patient-centric care in South Florida.",
};

const values = [
  {
    title: "Patient-Centric Care",
    description:
      "We always put our patients first, offering personalized and compassionate support.",
  },
  {
    title: "Excellence & Innovation",
    description:
      "We're committed to high-quality care, constantly embracing the latest advancements in nuclear medicine.",
  },
  {
    title: "Integrity & Trust",
    description:
      "Our expert radiologists operate with honesty and transparency, building strong relationships based on trust.",
  },
  {
    title: "Compassion",
    description:
      "With reliable clinical expertise, we provide empathetic care, understanding and respecting each patient's journey.",
  },
];

const chiefPhysician = {
  name: "Dr. Ashok MuthuKrishnan",
  title: "Founder & Chief Physician",
  bio: "Dr. Krishnan has close to 20 years of academic practice experience as a nuclear medicine physician, teacher, and researcher at the University of Pittsburgh Medical Center. He has published more than 40 peer-reviewed journal articles and presented at national and international conferences. Florida Theranostics has been acknowledged as a distinguished Radiopharmaceutical Therapy Center of Excellence by the Society of Nuclear Medicine and Molecular Imaging—the first and only site of its kind in South Florida.",
  imageSrc: "/images/headshots/FLTDEC2025-25.jpg",
  imageAlt: "Dr. Ashok MuthuKrishnan",
};

const staffMembers = [
  {
    name: 'Charles "Chuck" Jordan',
    title: "Technical Director & Chief Tech",
    bio: "ARRT (N) with close to 30 years of Nuclear Medicine Technology experience. He serves as the major patient care navigator of the practice, dedicated to coordinating all radioactive therapy needs of our patients, and oversees clinical and research operations as technical director.",
    imageSrc: "/images/headshots/FLTDEC2025-35.jpg",
    imageAlt: "Charles Chuck Jordan",
  },
  {
    name: "Nora Felps",
    title: "Physician Relations Liaison",
    bio: "Nora Felps brings several years of marketing and outreach experience in the Florida markets. She works to build strong physician relationships, educate providers on molecular imaging and radioligand therapies, and support the growth of Florida Theranostics.",
    imageSrc: "/images/headshots/FLTDEC2025-21.jpg",
    imageAlt: "Nora Felps",
  },
  {
    name: "Steve Shields",
    title: "Nuclear Medicine Technologist",
    bio: "ARRT (N) with close to three decades of Nuclear Medicine Technology experience. He serves as one of the lead nuclear medicine technologists in preparing and setting up patients for radioactive therapies on the day of radioligand therapy infusion.",
    imageSrc: "/images/headshots/FLTDEC2025-26.jpg",
    imageAlt: "Steve Shields",
  },
  {
    name: "Jasmin Molina",
    title: "Clinical Coordinator",
    bio: "Certified medical assistant with extensive experience in medical office settings. Known for her dedication to organization and efficiency, Jasmin ensures a seamless and supportive environment that prioritizes patient care with professionalism and compassion.",
    imageSrc: "/images/headshots/8R3A7555.jpeg",
    imageAlt: "Jasmin Molina",
  },
  {
    name: "Atika Shakil",
    title: "MHA",
    bio: "Brings over four years of healthcare experience specializing in clinical operations and patient coordination. At Florida Theranostics, she ensures efficient imaging scheduling, collaborates with providers and patients for timely access to advanced diagnostic and molecular imaging, and helps streamline communication with referral offices.",
    imageSrc: "/images/headshots/FLTDEC2025-23.jpg",
    imageAlt: "Atika Shakil",
  },
  {
    name: "Jourdan Garcia",
    title: "Lead Nuclear Medicine Technologist (B.S., CNMT)",
    bio: "Lead Nuclear Medicine Technologist with eight years of experience. Passionate about patient care and making procedures comfortable and stress-free. From cardiac stress testing to general Nuclear Medicine, Theranostics, and PET-CT, she combines expertise with compassion for every patient.",
    imageSrc: "/images/headshots/FLTDEC2025-27.jpg",
    imageAlt: "Jourdan Garcia",
  },
  {
    name: "Alekhya Muliki",
    title: "Clinical Research Coordinator",
    bio: "...",
    imageSrc: "/images/headshots/FLTDEC2025-4.jpg",
    imageAlt: "Alekhya Muliki",
  },
];

export default function AboutUs() {
  return (
    <>
      {/* Hero: Pioneering Radiopharmaceutical Therapies */}
      <ImageTextSection
        title="Pioneering Radiopharmaceutical Therapies"
        content={
          <div className="space-y-6">
            <p>
              Our commitment is to serve the community with honor and to be
              leaders at the forefront of this vital medical field. It&apos;s
              our mission to make a positive impact on patient lives, and we owe
              a great deal of gratitude to our oncology partners and patients
              for their trust and support.
            </p>
            <p>
              Ready to experience the future of personalized care? Contact us at
              Florida Theranostics today to learn more.
            </p>
            <div className="pt-2">
              <Button href="/contact" variant="primary">
                Start the Conversation
              </Button>
            </div>
          </div>
        }
        imagePosition="right"
        imageSrc="/images/grand-opening/8R3A1459.jpeg"
        imageAlt="Expert radiologist and patient in clinical setting"
      />

      {/* Our Values */}
      <Section className="py-10 md:py-14 bg-surface-cool">
        <Container>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-charcoal mb-12 md:mb-16 text-center leading-tight">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              {values.map((value, index) => (
                <div key={index} className="border-b border-charcoal/10 pb-10 md:pb-12">
                  <h3 className="text-xl md:text-2xl font-serif font-normal text-charcoal mb-4 leading-tight">
                    {value.title}
                  </h3>
                  <p className="text-lg text-text-muted leading-loose">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Chief Physician and Founder */}
      <Section className="py-10 md:py-14 bg-warm-white">
        <Container>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-charcoal mb-10 md:mb-12 text-center leading-tight">
              Meet The Team
            </h2>
            <p className="text-center text-lg text-text-muted max-w-2xl mx-auto mb-12 md:mb-14">
              Our team is committed to providing the highest quality care. We encourage you to ask questions and speak freely with us about your concerns and needs.
            </p>
            <h3 className="text-xl md:text-2xl font-serif font-normal text-charcoal mb-6 md:mb-8 uppercase tracking-wider text-navy/90">
              Chief Physician and Founder
            </h3>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start bg-warm-white border border-charcoal/10 overflow-hidden">
              <div className="w-full md:w-80 lg:w-96 shrink-0">
                <div className="relative w-full aspect-[3/4] bg-gray-100">
                  <Image
                    src={chiefPhysician.imageSrc}
                    alt={chiefPhysician.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 384px"
                  />
                </div>
              </div>
              <div className="p-6 md:p-8 lg:p-10 flex flex-col flex-grow">
                <h4 className="text-2xl md:text-3xl font-serif font-normal text-charcoal mb-1 leading-tight">
                  {chiefPhysician.name}
                </h4>
                <p className="text-sm uppercase tracking-wider text-navy font-sans mb-6">
                  {chiefPhysician.title}
                </p>
                <p className="text-base md:text-lg text-text-muted leading-relaxed">
                  {chiefPhysician.bio}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Staff */}
      <TeamSection title="Staff" members={staffMembers} />

      {/* Your Partners in Advanced Care - CTA (charcoal to distinguish from navy footer) */}
      <Section className="py-10 md:py-14 bg-charcoal">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-warm-white mb-8 leading-tight">
              Your Partners in Advanced Care
            </h2>
            <p className="text-lg md:text-xl text-warm-white/80 leading-loose mb-10">
              Reach out to our experts to discuss how our cutting-edge
              solutions can benefit you or your patients.
            </p>
            <Button
              href="/contact"
              variant="primary"
              className="!bg-warm-white !text-charcoal hover:!bg-warm-white/90"
            >
              Collaborate on Patient Care
            </Button>
            <div className="mt-16 pt-12 border-t border-warm-white/20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left sm:text-center">
              <div>
                <p className="text-xs uppercase tracking-wider text-warm-white/60 mb-2 font-sans">
                  Address
                </p>
                <p className="text-sm text-warm-white/90 font-sans leading-relaxed">
                  432 University Blvd.
                  <br />
                  Jupiter, FL 33458
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-warm-white/60 mb-2 font-sans">
                  Phone
                </p>
                <a
                  href="tel:+15618473797"
                  className="text-sm text-warm-white/90 hover:text-warm-white font-sans transition-colors"
                >
                  (561) 847-3797
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-warm-white/60 mb-2 font-sans">
                  Hours
                </p>
                <p className="text-sm text-warm-white/90 font-sans leading-relaxed">
                  Mon - Fri: 8:00 AM - 5:00 PM
                  <br />
                  Sat & Sun: Closed
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

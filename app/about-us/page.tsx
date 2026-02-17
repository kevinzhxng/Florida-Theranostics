import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ImageTextSection from "@/components/ImageTextSection";
import TeamSection from "@/components/TeamSection";
import Button from "@/components/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { client } from "@/lib/sanity";
import { aboutPageQuery, siteSettingsQuery, fetchOptions } from "@/lib/sanity/queries";
import { mapTeamMember, mapValues, getImageUrl } from "@/lib/sanity/helpers";

export const metadata = {
  title: "About Us | Florida Theranostics",
  description:
    "Pioneering radiopharmaceutical therapies. Expert radiologists and team dedicated to patient-centric care in South Florida.",
};

// Always fetch fresh team/values from Sanity so CMS edits show immediately
export const dynamic = "force-dynamic";

const defaultValues = [
  { title: "Patient-Centric Care", description: "We always put our patients first, offering personalized and compassionate support." },
  { title: "Excellence & Innovation", description: "We're committed to high-quality care, constantly embracing the latest advancements in nuclear medicine." },
  { title: "Integrity & Trust", description: "Our expert radiologists operate with honesty and transparency, building strong relationships based on trust." },
  { title: "Compassion", description: "With reliable clinical expertise, we provide empathetic care, understanding and respecting each patient's journey." },
];

const defaultChiefPhysician = {
  name: "Dr. Ashok MuthuKrishnan",
  title: "Founder & Chief Physician",
  bio: "Dr. Krishnan has close to 20 years of academic practice experience as a nuclear medicine physician, teacher, and researcher at the University of Pittsburgh Medical Center. He has published more than 40 peer-reviewed journal articles and presented at national and international conferences. Florida Theranostics has been acknowledged as a distinguished Radiopharmaceutical Therapy Center of Excellence by the Society of Nuclear Medicine and Molecular Imaging—the first and only site of its kind in South Florida.",
  imageSrc: "/images/headshots/FLTDEC2025-25.jpg",
  imageAlt: "Dr. Ashok MuthuKrishnan",
};

const defaultStaffMembers = [
  { name: 'Charles "Chuck" Jordan', title: "Technical Director & Chief Tech", bio: "ARRT (N) with close to 30 years of Nuclear Medicine Technology experience. He serves as the major patient care navigator of the practice, dedicated to coordinating all radioactive therapy needs of our patients, and oversees clinical and research operations as technical director.", imageSrc: "/images/headshots/FLTDEC2025-35.jpg", imageAlt: "Charles Chuck Jordan" },
  { name: "Nora Felps", title: "Physician Relations Liaison", bio: "Nora Felps brings several years of marketing and outreach experience in the Florida markets. She works to build strong physician relationships, educate providers on molecular imaging and radioligand therapies, and support the growth of Florida Theranostics.", imageSrc: "/images/headshots/FLTDEC2025-21.jpg", imageAlt: "Nora Felps" },
  { name: "Steve Shields", title: "Nuclear Medicine Technologist", bio: "ARRT (N) with close to three decades of Nuclear Medicine Technology experience. He serves as one of the lead nuclear medicine technologists in preparing and setting up patients for radioactive therapies on the day of radioligand therapy infusion.", imageSrc: "/images/headshots/FLTDEC2025-26.jpg", imageAlt: "Steve Shields" },
  { name: "Jasmin Molina", title: "Clinical Coordinator", bio: "Certified medical assistant with extensive experience in medical office settings. Known for her dedication to organization and efficiency, Jasmin ensures a seamless and supportive environment that prioritizes patient care with professionalism and compassion.", imageSrc: "/images/headshots/8R3A7555.jpeg", imageAlt: "Jasmin Molina" },
  { name: "Atika Shakil", title: "MHA", bio: "Brings over four years of healthcare experience specializing in clinical operations and patient coordination. At Florida Theranostics, she ensures efficient imaging scheduling, collaborates with providers and patients for timely access to advanced diagnostic and molecular imaging, and helps streamline communication with referral offices.", imageSrc: "/images/headshots/FLTDEC2025-23.jpg", imageAlt: "Atika Shakil" },
  { name: "Jourdan Garcia", title: "Lead Nuclear Medicine Technologist (B.S., CNMT)", bio: "Lead Nuclear Medicine Technologist with eight years of experience. Passionate about patient care and making procedures comfortable and stress-free. From cardiac stress testing to general Nuclear Medicine, Theranostics, and PET-CT, she combines expertise with compassion for every patient.", imageSrc: "/images/headshots/FLTDEC2025-27.jpg", imageAlt: "Jourdan Garcia" },
  { name: "Alekhya Muliki", title: "Clinical Research Coordinator", bio: "...", imageSrc: "/images/headshots/FLTDEC2025-4.jpg", imageAlt: "Alekhya Muliki" },
];

export default async function AboutUs() {
  let values = defaultValues;
  let chiefPhysician = defaultChiefPhysician;
  let staffMembers = defaultStaffMembers;
  let heroTitle = "Pioneering Radiopharmaceutical Therapies";
  let heroBody = "Our commitment is to serve the community with honor and to be leaders at the forefront of this vital medical field. It's our mission to make a positive impact on patient lives, and we owe a great deal of gratitude to our oncology partners and patients for their trust and support.\n\nReady to experience the future of personalized care? Contact us at Florida Theranostics today to learn more.";
  let heroButtonLabel = "Start the Conversation";
  let heroButtonHref = "/contact";
  let heroImageSrc = "/images/grand-opening/8R3A1459.jpeg";
  let ctaTitle = "Your Partners in Advanced Care";
  let ctaBody = "Reach out to our experts to discuss how our cutting-edge solutions can benefit you or your patients.";
  let ctaButtonLabel = "Collaborate on Patient Care";
  let ctaButtonHref = "/contact";
  let ctaAddress = "431 University Blvd.\nJupiter, FL 33458";
  let ctaPhone = "(561) 847-3797";
  let ctaHours = "Mon - Fri: 8:00 AM - 5:00 PM\nSat & Sun: Closed";

  type CmsMember = { name?: string; title?: string; bio?: string; image?: unknown };
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const [data, siteSettings] = await Promise.all([
        client.fetch<{
          heroTitle?: string | null;
          heroBody?: string | null;
          heroButtonLabel?: string | null;
          heroButtonHref?: string | null;
          heroImage?: unknown;
          chiefPhysician?: CmsMember | null;
          staffMembers?: CmsMember[] | null;
          values?: { title?: string; description?: string }[] | null;
          ctaTitle?: string | null;
          ctaBody?: string | null;
          ctaButtonLabel?: string | null;
          ctaButtonHref?: string | null;
        } | null>(aboutPageQuery, {}, fetchOptions),
        client.fetch<{ address?: string | null; phone?: string | null; hours?: string | null } | null>(siteSettingsQuery, {}, fetchOptions),
      ]);

      if (process.env.NODE_ENV === "development") {
        if (data == null) {
          console.warn(
            "[About Us] Sanity returned no About Us Page. In the Studio, open About Us Page and click **Publish** (↑ Publish), then refresh this page."
          );
        } else if (data.chiefPhysician == null && (data.staffMembers?.length ?? 0) === 0) {
          console.warn(
            "[About Us] About Us Page exists but Chief Physician / Staff are missing. Publish each Team Member first (Team Members → open person → ↑ Publish), then set them on About Us Page and ↑ Publish the About Us Page."
          );
        } else {
          const chief = data.chiefPhysician ? "yes" : "no";
          const staffCount = Array.isArray(data.staffMembers) ? data.staffMembers.length : 0;
          console.log(`[About Us] Sanity data: chief=${chief}, staff=${staffCount}, values=${data.values?.length ?? 0}`);
        }
      }

      if (data != null) {
        if (data.heroTitle) heroTitle = data.heroTitle;
        if (data.heroBody) heroBody = data.heroBody;
        if (data.heroButtonLabel) heroButtonLabel = data.heroButtonLabel;
        if (data.heroButtonHref) heroButtonHref = data.heroButtonHref;
        if (data.heroImage) heroImageSrc = getImageUrl(data.heroImage) ?? heroImageSrc;
        if (data.ctaTitle) ctaTitle = data.ctaTitle;
        if (data.ctaBody) ctaBody = data.ctaBody;
        if (data.ctaButtonLabel) ctaButtonLabel = data.ctaButtonLabel;
        if (data.ctaButtonHref) ctaButtonHref = data.ctaButtonHref;
        values = data.values?.length ? mapValues(data.values) : [];
        const mappedChief = data.chiefPhysician ? mapTeamMember(data.chiefPhysician) : null;
        if (mappedChief?.name) {
          chiefPhysician = {
            name: mappedChief.name,
            title: mappedChief.title,
            bio: mappedChief.bio,
            imageSrc: mappedChief.imageSrc ?? defaultChiefPhysician.imageSrc,
            imageAlt: mappedChief.imageAlt,
          };
        }
        staffMembers = data.staffMembers?.length
          ? data.staffMembers
              .map((m) => mapTeamMember(m))
              .filter(Boolean)
              .map((m) => ({
                name: m!.name,
                title: m!.title,
                bio: m!.bio,
                imageSrc: m!.imageSrc ?? "",
                imageAlt: m!.imageAlt,
              }))
          : [];
      }
      if (siteSettings) {
        if (siteSettings.address) ctaAddress = siteSettings.address;
        if (siteSettings.phone) ctaPhone = siteSettings.phone;
        if (siteSettings.hours) ctaHours = siteSettings.hours;
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("[About Us] Sanity fetch failed, using defaults:", err);
      }
    }
  }
  return (
    <>
      {/* Hero */}
      <ImageTextSection
        title={heroTitle}
        content={
          <div className="space-y-6">
            {heroBody.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="pt-2">
              <Button href={heroButtonHref} variant="primary">
                {heroButtonLabel}
              </Button>
            </div>
          </div>
        }
        imagePosition="right"
        imageSrc={heroImageSrc}
        imageAlt={heroTitle}
      />

      {/* Our Values */}
      <Section className="py-10 md:py-14 bg-surface-cool">
        <ScrollReveal>
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
        </ScrollReveal>
      </Section>

      {/* Chief Physician and Founder */}
      <Section className="py-10 md:py-14 bg-warm-white">
        <ScrollReveal>
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
        </ScrollReveal>
      </Section>

      {/* Staff */}
      <TeamSection title="Staff" members={staffMembers} />

      {/* CTA */}
      <Section className="py-10 md:py-14 bg-charcoal">
        <ScrollReveal>
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-warm-white mb-8 leading-tight">
              {ctaTitle}
            </h2>
            {ctaBody && (
              <p className="text-lg md:text-xl text-warm-white/80 leading-loose mb-10">
                {ctaBody}
              </p>
            )}
            <Button
              href={ctaButtonHref}
              variant="primary"
              className="!bg-warm-white !text-charcoal hover:!bg-warm-white/90"
            >
              {ctaButtonLabel}
            </Button>
            <div className="mt-16 pt-12 border-t border-warm-white/20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left sm:text-center">
              <div>
                <p className="text-xs uppercase tracking-wider text-warm-white/60 mb-2 font-sans">
                  Address
                </p>
                <p className="text-sm text-warm-white/90 font-sans leading-relaxed whitespace-pre-line">
                  {ctaAddress}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-warm-white/60 mb-2 font-sans">
                  Phone
                </p>
                <a
                  href={`tel:${ctaPhone.replace(/\D/g, "")}`}
                  className="text-sm text-warm-white/90 hover:text-warm-white font-sans transition-colors"
                >
                  {ctaPhone}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-warm-white/60 mb-2 font-sans">
                  Hours
                </p>
                <p className="text-sm text-warm-white/90 font-sans leading-relaxed whitespace-pre-line">
                  {ctaHours}
                </p>
              </div>
            </div>
          </div>
        </Container>
        </ScrollReveal>
      </Section>
    </>
  );
}

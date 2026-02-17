/**
 * One-time seed: adds the original Florida Theranostics team and Our Values to Sanity.
 * Run from project root: node scripts/seed-sanity.mjs
 * Requires: .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 * and SANITY_API_WRITE_TOKEN (create token at sanity.io/manage → API → Tokens).
 */
import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Load .env.local
const envPath = path.join(root, ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const headshotsDir = path.join(root, "public", "images", "headshots");

function uploadImage(filename) {
  const filePath = path.join(headshotsDir, filename);
  if (!fs.existsSync(filePath)) {
    console.warn("Missing image:", filePath);
    return null;
  }
  const buffer = fs.readFileSync(filePath);
  return client.assets.upload("image", buffer, { filename });
}

async function seed() {
  console.log("Seeding Sanity with original team and values...\n");

  // 1. Chief Physician
  const chiefId = "teamMember-dr-ashok";
  const chiefImage = await uploadImage("FLTDEC2025-25.jpg");
  await client.createOrReplace({
    _id: chiefId,
    _type: "teamMember",
    name: "Dr. Ashok MuthuKrishnan",
    title: "Founder & Chief Physician",
    bio: "Dr. Krishnan has close to 20 years of academic practice experience as a nuclear medicine physician, teacher, and researcher at the University of Pittsburgh Medical Center. He has published more than 40 peer-reviewed journal articles and presented at national and international conferences. Florida Theranostics has been acknowledged as a distinguished Radiopharmaceutical Therapy Center of Excellence by the Society of Nuclear Medicine and Molecular Imaging—the first and only site of its kind in South Florida.",
    image: chiefImage ? { _type: "image", asset: { _type: "reference", _ref: chiefImage._id } } : undefined,
  });
  console.log("Created:", chiefId);

  // 2. Staff (stable IDs for ordering)
  const staff = [
    { id: "teamMember-chuck-jordan", name: 'Charles "Chuck" Jordan', title: "Technical Director & Chief Tech", bio: "ARRT (N) with close to 30 years of Nuclear Medicine Technology experience. He serves as the major patient care navigator of the practice, dedicated to coordinating all radioactive therapy needs of our patients, and oversees clinical and research operations as technical director.", imageFile: "FLTDEC2025-35.jpg" },
    { id: "teamMember-nora-felps", name: "Nora Felps", title: "Physician Relations Liaison", bio: "Nora Felps brings several years of marketing and outreach experience in the Florida markets. She works to build strong physician relationships, educate providers on molecular imaging and radioligand therapies, and support the growth of Florida Theranostics.", imageFile: "FLTDEC2025-21.jpg" },
    { id: "teamMember-steve-shields", name: "Steve Shields", title: "Nuclear Medicine Technologist", bio: "ARRT (N) with close to three decades of Nuclear Medicine Technology experience. He serves as one of the lead nuclear medicine technologists in preparing and setting up patients for radioactive therapies on the day of radioligand therapy infusion.", imageFile: "FLTDEC2025-26.jpg" },
    { id: "teamMember-jasmin-molina", name: "Jasmin Molina", title: "Clinical Coordinator", bio: "Certified medical assistant with extensive experience in medical office settings. Known for her dedication to organization and efficiency, Jasmin ensures a seamless and supportive environment that prioritizes patient care with professionalism and compassion.", imageFile: "8R3A7555.jpeg" },
    { id: "teamMember-atika-shakil", name: "Atika Shakil", title: "MHA", bio: "Brings over four years of healthcare experience specializing in clinical operations and patient coordination. At Florida Theranostics, she ensures efficient imaging scheduling, collaborates with providers and patients for timely access to advanced diagnostic and molecular imaging, and helps streamline communication with referral offices.", imageFile: "FLTDEC2025-23.jpg" },
    { id: "teamMember-jourdan-garcia", name: "Jourdan Garcia", title: "Lead Nuclear Medicine Technologist (B.S., CNMT)", bio: "Lead Nuclear Medicine Technologist with eight years of experience. Passionate about patient care and making procedures comfortable and stress-free. From cardiac stress testing to general Nuclear Medicine, Theranostics, and PET-CT, she combines expertise with compassion for every patient.", imageFile: "FLTDEC2025-27.jpg" },
    { id: "teamMember-alekhya-muliki", name: "Alekhya Muliki", title: "Clinical Research Coordinator", bio: "...", imageFile: "FLTDEC2025-4.jpg" },
  ];

  for (const s of staff) {
    const imageAsset = await uploadImage(s.imageFile);
    await client.createOrReplace({
      _id: s.id,
      _type: "teamMember",
      name: s.name,
      title: s.title,
      bio: s.bio,
      image: imageAsset ? { _type: "image", asset: { _type: "reference", _ref: imageAsset._id } } : undefined,
    });
    console.log("Created:", s.id);
  }

  // 3. Site Settings (navbar, footer, contact)
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: "Florida Theranostics",
    logoLine1: "Florida",
    logoLine2: "Theranostics",
    navMainLinks: [
      { _type: "navLink", label: "About Us", href: "/about-us", isExternal: false },
      { _type: "navLink", label: "Therapies", href: "/therapies", isExternal: false },
      { _type: "navLink", label: "Molecular Imaging", href: "/molecular-imaging", isExternal: false },
      { _type: "navLink", label: "Technology", href: "/technology", isExternal: false },
      { _type: "navLink", label: "Referral", href: "/referral", isExternal: false },
    ],
    navPatientPortalLabel: "Patient Portal",
    navPatientPortalHref: "https://mycw174.ecwcloud.com/portal23145/jsp/100mp/login_otp.jsp",
    navContactLabel: "Contact Us",
    footerTagline: "Advanced Radioligand Therapy, Providing Patient-Centered Nuclear Medicine Care",
    footerNavTitle: "Navigate",
    footerResourcesTitle: "Resources",
    footerContactTitle: "Contact",
    footerCopyright: "Florida Theranostics. All rights reserved.",
    address: "431 University Blvd.\nJupiter, FL 33458",
    phone: "(561) 847-3797",
    hours: "Mon - Fri: 8:00 AM - 5:00 PM\nSat & Sun: Closed",
  });
  console.log("Created: siteSettings (navbar, footer, contact)\n");

  // 4. About Us Page (singleton) – hero + chief + staff refs + values
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heroTitle: "Pioneering Radiopharmaceutical Therapies",
    heroBody: "Our commitment is to serve the community with honor and to be leaders at the forefront of this vital medical field. It's our mission to make a positive impact on patient lives, and we owe a great deal of gratitude to our oncology partners and patients for their trust and support.\n\nReady to experience the future of personalized care? Contact us at Florida Theranostics today to learn more.",
    heroButtonLabel: "Start the Conversation",
    heroButtonHref: "/contact",
    chiefPhysician: { _type: "reference", _ref: chiefId },
    staffMembers: staff.map((s) => ({ _type: "reference", _ref: s.id })),
    values: [
      { title: "Patient-Centric Care", description: "We always put our patients first, offering personalized and compassionate support." },
      { title: "Excellence & Innovation", description: "We're committed to high-quality care, constantly embracing the latest advancements in nuclear medicine." },
      { title: "Integrity & Trust", description: "Our expert radiologists operate with honesty and transparency, building strong relationships based on trust." },
      { title: "Compassion", description: "With reliable clinical expertise, we provide empathetic care, understanding and respecting each patient's journey." },
    ],
    ctaTitle: "Your Partners in Advanced Care",
    ctaBody: "Reach out to our experts to discuss how our cutting-edge solutions can benefit you or your patients.",
    ctaButtonLabel: "Collaborate on Patient Care",
    ctaButtonHref: "/contact",
  });
  console.log("Created: aboutPage (Chief = Dr. Ashok, Staff = 7 members, Values = 4)\n");
  console.log("Done. Open the Studio (Global → Site Settings, Pages → each page) to edit. Refresh the site to see content.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * Full-site seed: populates Sanity with all existing website content.
 * Run from project root: node scripts/seed-all-pages.mjs
 * Requires: .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 * and SANITY_API_WRITE_TOKEN (create at sanity.io/manage → API → Tokens).
 *
 * Seeds: Site Settings, Team Members, About Us, Home, Therapies, Molecular Imaging,
 * Technology, Referral, Contact. After running, open the Studio and edit any page
 * without rewriting content from scratch.
 */
import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

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
const videosDir = path.join(root, "public", "videos");

function uploadImage(filename, dir = headshotsDir) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) {
    console.warn("Missing image:", filePath);
    return null;
  }
  const buffer = fs.readFileSync(filePath);
  return client.assets.upload("image", buffer, { filename });
}

function uploadVideo(filename, dir = videosDir) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) {
    console.warn("Missing video:", filePath);
    return null;
  }
  const buffer = fs.readFileSync(filePath);
  return client.assets.upload("file", buffer, { filename });
}

async function seed() {
  console.log("Seeding Sanity with full website content...\n");

  // —— 1. Team Members (Chief + Staff) ——
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

  // —— 2. Site Settings ——
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
  console.log("Created: siteSettings\n");

  // —— 3. About Us Page ——
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
  console.log("Created: aboutPage\n");

  // —— 4. Home Page ——
  const heroVideoFile = "Florida Theranostics Video 1.mp4";
  const heroVideoAsset = await uploadVideo(heroVideoFile);
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroHeadline: "Setting the Standard in Molecular Imaging and Theranostics",
    heroHeadlines: [
      "Setting the Standard in Molecular Imaging and Theranostics",
      "Precision Medicine. Personalized Care.",
      "Advanced Radioligand Therapy in South Florida",
      "Where Innovation Meets Compassionate Care",
      "Leading the Future of Molecular Imaging",
      "Your Partner in Precision Cancer Care",
    ],
    heroCtaText: "Schedule a Consultation",
    heroCtaHref: "/contact",
    ...(heroVideoAsset && { heroVideo: { _type: "file", asset: { _type: "reference", _ref: heroVideoAsset._id } } }),
    featuresSectionTitle: "Smart Diagnostics, Customized Solutions",
    features: [
      { title: "Ultrafast PET Imaging", description: "Offers unparalleled diagnostic precision.", href: "/molecular-imaging" },
      { title: "Advance Theranostics Therapy", description: "Ensures high-quality, reliable results.", href: "/therapies" },
      { title: "Tailored Care Plans", description: "Based on accurate data and insights.", href: "/therapies" },
    ],
    sections: [
      { title: "Leading Expertise in Radiopharmaceutical Therapy", body: "Our team at Florida Theranostics administers radioligand therapies with a focus on patient safety and treatment efficacy. We collaborate with your primary doctor to optimize therapy management strategies, ensuring a holistic approach to your healthcare. Our nearly 900 cycles of radioligand therapies are a testament to our experience and dedication.", imagePosition: "right" },
      { title: "Why Our Expertise Matters to You", body: "Our team of experienced medical professionals is dedicated to providing the highest standard of care.\n\nWith our Radiopharmaceutical Therapy Center of Excellence designation, we ensure that every patient receives expert attention and the most advanced treatment options available in South Florida.", imagePosition: "left", buttonLabel: "Explore Therapy Options", buttonHref: "/therapies" },
      { title: "Explore Imaging Solutions", body: "Experience the difference that our advanced imaging and therapy solutions can make in your healthcare journey. Dive into our offerings today.", imagePosition: "right", buttonLabel: "View Imaging Solutions", buttonHref: "/molecular-imaging" },
    ],
    testimonialsSectionTitle: "Hear From Our Patients",
    testimonials: [
      { quote: "Very nice experience here. Office was lovely and comfortable. Jordan was perfect with the IV insertion and she was very friendly. I will recommend here highly and I'll return for any future scans.", author: "Ina McDonald" },
      { quote: "5 stars aren't enough. Staff members were kind, considerate, compassionate, empathetic and caring. HIGH PRAISE FOR THE STAFF. THANK YOU, AGAIN AND AGAIN.", author: "Mark C" },
      { quote: "The staff and the medical team are a dream! Their kindness and patience were exceptional! Chuck couldn't have been more gentle! Thank you for making a stressful situation easy!", author: "Karen Musikoff" },
      { quote: "Great facility and friendly staff. Appointment was on time along with the prep and procedure which was conduced very professionally.", author: "Daniel Ford" },
      { quote: "Top notch in every way. Everyone on the team has been very well-informed and communicative about the procedures and scheduling. The office feels like an immaculate, very welcoming home and is extremely comfortable to get treatments in. Thank you very much to Dr. Krishnan and Chuck for this amazing treatment in Jupiter. I hope to be able to update my review after scans at the end of my rounds of treatment with news that they worked!", author: "Scott Wheeler" },
    ],
  });
  console.log("Created: homePage\n");

  // —— 5. Therapies Page ——
  await client.createOrReplace({
    _id: "therapiesPage",
    _type: "therapiesPage",
    heroTitle: "Advanced Theranostic Services",
    heroBody: "We at Florida Theranostics pride ourselves on being pioneers in the field of theranostic services. Located in Jupiter, FL, we offer a unique blend of cutting-edge technology and compassionate care.\n\nWith almost 2 years since receiving the Radiopharmaceutical Therapy Center of Excellence designation from the Society of Nuclear Medicine—the only one of its kind in South Florida—we have administered nearly 900 cycles of radioligand therapies.",
    therapiesSectionTitle: "Our Therapies",
    therapiesList: [
      { name: "Pluvicto®", subtitle: "Lutetium-177 PSMA", description: "Pluvicto is a targeted radioligand therapy used to treat PSMA-PET positive metastatic castration-resistant prostate cancer in patients who have been previously treated with androgen receptor pathway inhibition." },
      { name: "Lutathera®", subtitle: "Lutetium-177 DOTATATE", description: "Lutathera is a targeted radioligand therapy used to treat somatostatin receptor–positive gastroenteropancreatic neuroendocrine tumors (GEP-NETs), pheochromocytomas, recurrent meningiomas, and esthesioneuroblastomas." },
      { name: "Xofigo®", subtitle: "Radium-223 Dichloride", description: "Xofigo is a targeted alpha therapy used to treat bone metastases from castration-resistant prostate cancer." },
      { name: "RadioIodine-131", subtitle: "I-131", description: "I-131 is a radioactive isotope of iodine used to treat hyperthyroidism and certain types of thyroid cancer by selectively destroying cancerous thyroid tissue." },
    ],
    prrtTitle: "Innovative PRRT Treatments",
    prrtBody: "Peptide Receptor Radionuclide Therapy (PRRT) combines a targeting peptide with a radioactive substance to deliver radiation directly to cancer cells—a precise, highly targeted option for specific cancers.\n\n• Targeted delivery: The peptide binds to receptors on cancer cells, minimizing damage to healthy tissue.\n• Neuroendocrine tumors: PRRT is especially effective for patients with neuroendocrine tumors.\n• Expert care: Our team uses state-of-the-art technology to ensure accurate, effective treatment.",
    goalTitle: "Our Goal",
    goalIntro: "Our goal is to provide high-quality medical care, exceptional customer service, and state-of-the-art PET imaging solutions to all our patients.",
    goalBullets: [
      "We are dedicated to improving patient outcomes through innovative treatments like PRRT and radioligand therapies.",
      "Our experienced medical team collaborates closely with your primary doctor to optimize therapy management strategies, ensuring you receive the best possible care.",
      "We are committed to serving our community and making a lasting impact on patient lives with our ultrafast digital PET imaging and molecular imaging solutions.",
    ],
    ctaTitle: "Deeper Health Insights With Molecular Imaging",
    ctaBody: "Molecular imaging offers an unparalleled view into the body's functions, revealing disease at its earliest stages. Learn how our diagnostic tools provide detailed, precise information to guide your care.",
    ctaButtonLabel: "Explore Our Imaging Capabilities",
    ctaButtonHref: "/molecular-imaging",
  });
  console.log("Created: therapiesPage\n");

  // —— 6. Molecular Imaging Page ——
  await client.createOrReplace({
    _id: "molecularImagingPage",
    _type: "molecularImagingPage",
    heroTitle: "Advanced Molecular PET Imaging Solutions",
    heroBody: "Florida Theranostics specializes in state-of-the-art molecular imaging solutions, including our renowned molecular PET scan. We offer advanced diagnostic and therapeutic services for comprehensive cancer treatment and management.\n\nWe proudly partner with oncology experts and primary doctors to optimize therapy and improve patient outcomes.",
    introTitle: "Molecular Imaging with Ultrafast Digital PET-CT and SPECT-CT",
    introBody: "Our imaging capabilities combine the latest in PET-CT and SPECT-CT technology to deliver precise, reliable diagnostics.",
    petCtTitle: "PET-CT Imaging",
    petCtSubtitle: "Positron Emission Tomography – Computed Tomography",
    petCtModalities: [
      { name: "Amyloid PET Brain", subtitle: "Alzheimer's & neurodegenerative disorders", description: "Amyloid PET visualizes amyloid plaques in the brain, a hallmark of Alzheimer's disease and other neurodegenerative disorders." },
      { name: "PSMA PET-CT", subtitle: "Prostate cancer • Ga-68 PSMA (Illucix™) • F-18 PSMA (Pylarify™ or Posluma™)", description: "PSMA PET targets prostate-specific membrane antigen, overexpressed by prostate cancer cells and metastases." },
      { name: "F-18 FDG", subtitle: "Oncology & beyond", description: "FDG-PET uses a radioactive glucose analog to visualize metabolic activity. Primarily used in oncology (cancer imaging)." },
      { name: "DOTATATE PET", subtitle: "Neuroendocrine tumors, meningiomas, pheochromocytomas", description: "Uses a radioactive tracer targeting somatostatin receptors (SSTR), overexpressed in neuroendocrine tumors." },
      { name: "FES-PET Cerianna™", subtitle: "ER+ breast cancer", description: "Uses fluoroestradiol to visualize estrogen receptors. Particularly useful in hormone receptor–positive breast cancer." },
      { name: "F-18 Flurpiridaz FLYRCARDO™", subtitle: "Myocardial perfusion", description: "Used for myocardial perfusion imaging to diagnose and evaluate coronary artery disease (CAD)." },
    ],
    spectCtTitle: "SPECT-CT Nuclear Medicine Imaging",
    spectCtIntro: "SPECT-CT (Single-Photon Emission Computed Tomography – Computed Tomography) combines functional SPECT imaging with anatomical CT. Radioactive tracers show how organs and tissues function, while CT provides detailed anatomy.",
    spectCtModalities: [
      { name: "DATscan", subtitle: "Parkinson's", description: "A brain scan that uses a radioactive tracer to visualize dopamine transporters. Primarily used to help diagnose Parkinson's disease." },
      { name: "Thyroid scan and uptake", subtitle: "RAIU", description: "Radioactive iodine uptake (RAIU) evaluates thyroid function and identifies abnormalities such as nodules, goiter." },
      { name: "Parathyroid Sestamibi SPECT-CT", subtitle: "Parathyroid localization", description: "Helps pinpoint the location of an overactive parathyroid gland, especially before surgery to remove it." },
    ],
    precisionTitle: "Precision Medicine at the Forefront",
    precisionBody: "Florida Theranostics is built on the foundation of precision medicine, committed to delivering efficient, precise, and empathetic care to every patient.\n\nWe believe leveraging cutting-edge technology—including the United Imaging uMI Panorama PET/CT and the Veriton 400 SPECT-CT—brings us closer to that goal.",
    dynamicPetTitle: "Dynamic PET Studies",
    dynamicPetIntro: "We offer dynamic PET studies that are pivotal in diagnosing and managing complex health conditions.",
    dynamicPetBullets: [
      "Our advanced imaging technology captures real-time data, providing detailed insights into biological processes.",
      "This precision aids in crafting individualized treatment plans, ensuring optimal patient outcomes.",
      "Our team utilizes state-of-the-art PET-CT and SPECT-CT imaging to deliver accurate diagnostics.",
    ],
    ctaTitle: "Book Your Appointment",
    ctaBody: "Understanding your health begins with accurate and detailed diagnostics. Schedule your appointment today.",
    ctaButtonLabel: "Schedule Now",
    ctaButtonHref: "/contact",
  });
  console.log("Created: molecularImagingPage\n");

  // —— 7. Technology Page ——
  await client.createOrReplace({
    _id: "technologyPage",
    _type: "technologyPage",
    section1Title: "uMI Panorama PET/CT",
    section1Body: "Blending precision, speed, and comfort, the uMI Panorama represents the pinnacle of PET/CT innovation. Its exceptional 2.9 mm PET resolution and sub-200 ps TOF performance deliver crystal-clear imaging.\n\nAs Florida's first institution to offer this technology, Florida Theranostics underscores its leadership in delivering early, personalized, and precise molecular care.",
    section1Bullets: [
      "Spacious design: 76 cm bore and 700 lb table ensure accessibility for all patients.",
      "AI-driven workflow: Intuitive patient positioning and smart scan planning streamline operations.",
      "Deep-learning reconstruction: Ultra-sharp image detail at low doses, with full support for advanced theranostic and research workflows.",
    ],
    section2Title: "VERITON-CT SPECT/CT",
    section2Body: "Redefining SPECT/CT with digital innovation, the VERITON-CT offers full 360° CZT detector coverage, delivering total-body 3D imaging in under 30 minutes.\n\nFlorida Theranostics is proud to offer this state-of-the-art imaging capability for personalized, efficient, and advanced molecular imaging care.",
    section2Bullets: [
      "Comfort & inclusivity: 80 cm bore designed for patient comfort and accessibility.",
      "Ultra-high sensitivity: Quantitative accuracy ideal for theranostics applications and precise radioligand dosimetry.",
      "Integrated TruView console: Whether you opt for 16-slice or 64-slice CT, acquisition, reconstruction, and analysis are unified to streamline workflow.",
    ],
    ctaTitle: "Experience Our Technology",
    ctaBody: "Schedule a visit to learn how our uMI Panorama and VERITON-CT systems can support your care or practice.",
    ctaButtonLabel: "Schedule a Visit",
    ctaButtonHref: "/contact",
  });
  console.log("Created: technologyPage\n");

  // —— 8. Referral Page ——
  await client.createOrReplace({
    _id: "referralPage",
    _type: "referralPage",
    pageTitle: "Referrals & Order Forms",
    pageSubtitle: "For referring providers · FLT Molecular Imaging and Therapy Ordering Form (HIPAA-compliant)",
    phoneNumbers: ["(561) 847-3797", "(561) 600-4476"],
    successMessage: "Thank you. Your referral has been submitted. We will process it and contact you as needed.",
  });
  console.log("Created: referralPage\n");

  // —— 9. Contact Page ——
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    pageTitle: "Contact Us",
    introParagraph: "We're here to help. Reach out to schedule a consultation or learn more about our services.",
    formHeading: "Send a Message",
    submitButtonLabel: "Send Message",
    successMessage: "Thank you! Your message has been sent. We'll get back to you soon.",
  });
  console.log("Created: contactPage\n");

  console.log("Done. All pages are seeded with current website content.");
  console.log("Open the Studio (Global → Site Settings, Pages → each page) to edit. Refresh the site to see changes.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

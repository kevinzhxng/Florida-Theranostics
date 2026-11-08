export type ImagingPageKey = "fet-pet" | "cardiac-imaging";

export interface ImagingDetail {
  title: string;
  body: string;
}

export interface ImagingPageContent {
  key: ImagingPageKey;
  pageType: "fetPetPage" | "cardiacImagingPage";
  eyebrow: string;
  title: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  leadTitle: string;
  leadBody: string;
  leadLabel: string;
  mriComparison?: string;
  petComparison?: string;
  detailsTitle: string;
  detailsIntro: string;
  details: ImagingDetail[];
  referralIntro: string;
  referralLabel: string;
  referralTitle: string;
  clinicalNote: string;
  posterSrc: string;
  posterFullSrc?: string;
  posterWidth: number;
  posterHeight: number;
  posterAlt: string;
  posterCaption: string;
  showFeature: boolean;
  featureLabel: string;
  featureTitle: string;
  featureDescription: string;
  featureLinkLabel: string;
  petListingTitle?: string;
  petListingSubtitle?: string;
  petListingDescription?: string;
}

export const IMAGING_PATH = "/molecular-imaging";
export const SITE_ORIGIN = "https://www.floridatheranostics.com";
export const IMAGING_REFERRAL_EMAIL = "MD@FLTMIT.ORG";
export const IMAGING_REFERRAL_FAX = "(561) 600-4476";

export const imagingReferralStudies = [
  { field: "fetPetStudyLabel", value: "pet-fet", label: "PET-CT Specialty – FET PET (Glioma Imaging)" },
  { field: "calciumScoreStudyLabel", value: "ct-calcium-score", label: "Cardiac Imaging – Coronary Calcium Score" },
  { field: "cctaStudyLabel", value: "ct-coronary-angiography", label: "Cardiac Imaging – Coronary CT Angiography (CCTA)" },
  { field: "cleerlyStudyLabel", value: "ct-coronary-cleerly", label: "Cardiac Imaging – CCTA with Cleerly Analysis" },
] as const;

export type ImagingReferralLabels = Partial<Record<(typeof imagingReferralStudies)[number]["field"], string>>;

export const imagingPages: Record<ImagingPageKey, ImagingPageContent> = {
  "fet-pet": {
    key: "fet-pet",
    pageType: "fetPetPage",
    eyebrow: "Now available in Jupiter, Florida",
    title: "FET PET — Glioma Imaging",
    intro:
      "When an MRI leaves questions after glioma treatment, another perspective can help. Florida Theranostics offers FET PET, an amino acid PET scan that provides complementary information to support your care team’s clinical decisions.",
    seoTitle: "FET PET Glioma Imaging in Florida | Florida Theranostics",
    seoDescription:
      "FET PET glioma imaging in Jupiter, Florida. Explore amino acid PET brain tumor imaging, MRI comparison, clinical indications and physician referrals.",
    leadTitle: "When MRI is equivocal, look beyond anatomy.",
    leadLabel: "Anatomy meets metabolism",
    mriComparison: "Anatomical detail. Post-treatment findings may be equivocal.",
    petComparison: "Amino acid uptake. Complementary biological information about metabolically active tumor.",
    leadBody:
      "MRI provides detailed anatomical information. FET PET evaluates amino acid transport and tumor metabolism, adding biological information that can help distinguish recurrent or progressive glioma from treatment-related change. The findings are interpreted alongside MRI and other clinical evaluations.",
    detailsTitle: "Clinical indications & considerations",
    detailsIntro:
      "For referring physicians evaluating suspected recurrent or progressive glioma, particularly when post-treatment MRI findings are uncertain.",
    details: [
      {
        title: "Suspected recurrence or progression",
        body: "Additional metabolic information for patients with suspected recurrent or progressive glioma after treatment.",
      },
      {
        title: "Equivocal post-treatment MRI",
        body: "Complementary imaging when MRI findings are indeterminate and the care team needs more information to guide the next step.",
      },
      {
        title: "Recurrence or treatment effect?",
        body: "Support for distinguishing recurrent tumor from treatment-related change, in conjunction with other diagnostic evaluations.",
      },
      {
        title: "Collaborative treatment planning",
        body: "Discuss assessment of metabolically active tumor and questions about preoperative or radiation therapy planning with our physician team.",
      },
    ],
    referralLabel: "Collaborative care. Clear next steps.",
    referralTitle: "Refer a patient or discuss a case.",
    referralIntro:
      "Refer a patient for FET PET or speak with our team about an equivocal MRI. Please include the diagnosis, treatment history and recent MRI reports with the referral.",
    clinicalNote:
      "FET PET complements MRI and clinical assessment. The referring physician and imaging team determine whether the study is appropriate for the individual patient.",
    posterSrc: "/images/imaging-features/fet-pet-glioma-imaging.jpg",
    posterWidth: 1320,
    posterHeight: 1693,
    posterAlt:
      "Florida Theranostics FET PET flyer with a side-by-side post-treatment MRI and FET PET comparison, clinical indications and referral information.",
    posterCaption:
      "The supplied MRI / FET PET comparison illustrates the complementary anatomical and metabolic information discussed in this physician flyer.",
    showFeature: true,
    featureLabel: "Now available",
    featureTitle: "FET PET — Glioma Imaging",
    featureDescription: "Amino acid PET imaging for suspected recurrent or progressive glioma. Another perspective when post-treatment MRI is equivocal.",
    featureLinkLabel: "Explore FET PET",
    petListingTitle: "FET PET — Glioma Imaging",
    petListingSubtitle: "Amino acid PET • Brain tumor imaging",
    petListingDescription: "Complementary metabolic information for suspected recurrent or progressive glioma, particularly when post-treatment MRI findings are equivocal.",
  },
  "cardiac-imaging": {
    key: "cardiac-imaging",
    pageType: "cardiacImagingPage",
    eyebrow: "Advanced imaging. Personalized care.",
    title: "Advanced Cardiac Imaging",
    intro:
      "Earlier answers. Deeper insights. More time for what matters. Our cardiac imaging program in Jupiter, Florida brings together coronary calcium scoring, coronary CT angiography, Cleerly analysis and Flyrcado PET to help guide personalized cardiovascular care.",
    seoTitle: "Cardiac Imaging in Jupiter, FL | Calcium Score, CCTA & PET",
    seoDescription:
      "Explore coronary calcium scoring, CCTA with Cleerly plaque analysis and Flyrcado cardiac PET at Florida Theranostics in Jupiter. Physician referrals welcome.",
    leadTitle: "A fuller picture of heart health.",
    leadLabel: "Clarity for the care ahead",
    leadBody:
      "Different studies answer different questions. Calcium scoring assesses calcified plaque, CCTA shows coronary anatomy, Cleerly adds quantitative plaque analysis, and PET myocardial perfusion imaging evaluates blood flow. Our team works with referring physicians to select the appropriate study and support informed clinical decisions.",
    detailsTitle: "A comprehensive cardiac imaging program",
    detailsIntro:
      "Four complementary capabilities, with a shared focus on clearer answers and care tailored to the patient.",
    details: [
      {
        title: "Coronary calcium score",
        body: "A quick, noninvasive CT study that measures calcified plaque in the coronary arteries. The results can help the physician refine cardiovascular risk and guide discussions about prevention and further testing.",
      },
      {
        title: "Coronary CT angiography (CCTA)",
        body: "High-resolution, noninvasive evaluation of the coronary arteries. CCTA provides information about coronary anatomy and can show both calcified and non-calcified plaque.",
      },
      {
        title: "Cleerly plaque analysis",
        body: "AI-assisted analysis of CCTA images to quantify plaque burden and composition and identify plaque features. It adds detailed information to help the referring physician make personalized care decisions.",
      },
      {
        title: "Flyrcado™ PET myocardial perfusion",
        body: "Rest and stress PET imaging with flurpiridaz F 18 evaluates myocardial perfusion in adults with known or suspected coronary artery disease. It helps the physician assess blood flow and evaluate myocardial ischemia and infarction.",
      },
    ],
    referralLabel: "Collaborative care. Clear next steps.",
    referralTitle: "Refer a patient or discuss a case.",
    referralIntro:
      "Refer a patient for cardiac imaging or discuss which study may best answer your clinical question. Our team can help coordinate calcium scoring, CCTA with Cleerly analysis, and cardiac PET referrals.",
    clinicalNote:
      "The appropriate examination depends on symptoms, history and the clinical question. Your physician will guide study selection and discuss the results with you.",
    posterSrc: "/images/imaging-features/advanced-cardiac-imaging.png",
    posterWidth: 1024,
    posterHeight: 1536,
    posterAlt:
      "Florida Theranostics physician newsletter highlighting coronary calcium score, coronary CT angiography with Cleerly analysis and Flyrcado PET myocardial perfusion imaging.",
    posterCaption:
      "Our physician newsletter introduces the cardiac imaging program, with coronary CT and PET examples and referral details.",
    showFeature: true,
    featureLabel: "Cardiac imaging",
    featureTitle: "A clearer picture of heart health.",
    featureDescription: "Calcium scoring, CCTA, Cleerly plaque analysis and Flyrcado PET. Explore our comprehensive cardiac imaging program.",
    featureLinkLabel: "Explore Cardiac Imaging",
  },
};

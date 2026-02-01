"use client";

import { useState, FormEvent } from "react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ScrollReveal from "@/components/animations/ScrollReveal";

const inputClass =
  "w-full px-4 py-2.5 border border-charcoal/20 bg-warm-white text-charcoal focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all font-sans text-sm";
const labelClass = "block text-sm font-sans font-medium text-charcoal mb-2";

const MOLECULAR_IMAGING_OPTIONS = [
  { value: "pet-fdg-skull-mid-thigh", label: "PET-CT F-18 FDG – Skull-base to Mid-Thigh" },
  { value: "pet-fdg-whole-body", label: "PET-CT F-18 FDG – Whole Body" },
  { value: "pet-fdg-brain", label: "PET-CT F-18 FDG – Brain Metabolic" },
  { value: "pet-fdg-myocardial", label: "PET-CT F-18 FDG – Myocardial Viability" },
  { value: "pet-psma", label: "PET-CT Specialty – PSMA" },
  { value: "pet-dotatate", label: "PET-CT Specialty – DOTATATE" },
  { value: "pet-amyloid", label: "PET-CT Specialty – Amyloid PET (Alzheimer's)" },
  { value: "pet-cerianna", label: "PET-CT Specialty – Cerianna (ER+ Breast Cancer)" },
  { value: "pet-flurpiridaz", label: "PET-CT Specialty – Flurpiridaz (Cardiac PET)" },
  { value: "nm-i123-thyroid", label: "Nuclear Medicine – I-123 Thyroid Uptake and SPECT-CT" },
  { value: "nm-parathyroid", label: "Nuclear Medicine – Parathyroid Sestamibi SPECT-CT" },
  { value: "nm-bone-scan", label: "Nuclear Medicine – Whole Body Bone Scan SPECT-CT" },
  { value: "other", label: "Other" },
];

const RADIOLIGAND_THERAPY_OPTIONS = [
  { value: "pluvicto", label: "Pluvicto (Lu-177 PSMA) with Dosimetry SPECT-CT" },
  { value: "lutathera", label: "Lutathera (Lu-177 DOTATATE) with Dosimetry SPECT-CT" },
  { value: "xofigo", label: "Xofigo (Radium-223)" },
  { value: "radioiodine-131", label: "Radioiodine-131 with Dosimetry SPECT-CT" },
];

function formatPhoneDisplay(digits: string): string {
  const d = digits.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 3) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function parsePhoneDigits(formatted: string): string {
  return formatted.replace(/\D/g, "").slice(0, 10);
}

export default function ReferralForm({
  pageTitle = "Referrals & Order Forms",
  pageSubtitle = "For referring providers · FLT Molecular Imaging and Therapy Ordering Form (HIPAA-compliant)",
  phoneNumbers = ["(561) 847-3797", "(561) 600-4476"],
  successMessage = "Thank you. Your referral has been submitted. We will process it and contact you as needed.",
}: {
  pageTitle?: string;
  pageSubtitle?: string;
  phoneNumbers?: string[];
  successMessage?: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [form, setForm] = useState({
    patientName: "",
    dob: "",
    phone: "",
    cell: "",
    heightFeet: "",
    heightInches: "",
    weight: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    insurancePrimary: "",
    insuranceSecondary: "",
    subscriberIdPrimary: "",
    subscriberIdSecondary: "",
    referringPhysician: "",
    physicianNpi: "",
    physicianSignature: "",
    physicianPhone: "",
    physicianFax: "",
    diagnosisReason: "",
    molecularImaging: [] as string[],
    radioligandTherapy: [] as string[],
    otherImaging: "",
    replyEmail: "",
  });

  const [attachments, setAttachments] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (field: "phone" | "cell" | "physicianPhone" | "physicianFax") => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const digits = parsePhoneDigits(e.target.value);
    setForm((prev) => ({ ...prev, [field]: formatPhoneDisplay(digits) }));
  };

  const handleNpiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((prev) => ({ ...prev, physicianNpi: value }));
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d.]/g, "");
    const parts = raw.split(".");
    const value = parts.length > 1 ? `${parts[0]}.${parts[1].slice(0, 1)}` : parts[0];
    if (value === "" || (Number(value) >= 0 && Number(value) <= 999)) {
      setForm((prev) => ({ ...prev, weight: value }));
    }
  };

  const handleCheckbox = (name: "molecularImaging" | "radioligandTherapy", value: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter((v) => v !== value),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const molecularStr = form.molecularImaging.join("; ");
    const therapyStr = form.radioligandTherapy.join("; ");
    if (!molecularStr && !therapyStr && !form.otherImaging.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please select at least one Molecular Imaging study or Radioligand Therapy.",
      });
      setIsSubmitting(false);
      return;
    }

    const phoneDigits = parsePhoneDigits(form.phone);
    if (phoneDigits.length !== 10) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid 10-digit phone number.",
      });
      setIsSubmitting(false);
      return;
    }

    const physicianPhoneDigits = parsePhoneDigits(form.physicianPhone);
    if (physicianPhoneDigits.length !== 10) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid 10-digit physician phone number.",
      });
      setIsSubmitting(false);
      return;
    }

    if (!form.heightFeet.trim() || !form.heightInches.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please enter height (feet and inches).",
      });
      setIsSubmitting(false);
      return;
    }

    if (!form.weight.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please enter weight.",
      });
      setIsSubmitting(false);
      return;
    }

    const heightStr =
      form.heightFeet && form.heightInches
        ? `${form.heightFeet} ft ${form.heightInches} in`
        : "";
    const weightStr = form.weight ? `${form.weight} lbs` : "";

    try {
      const body = new FormData();
      body.append("patientName", form.patientName);
      body.append("dob", form.dob);
      body.append("phone", form.phone);
      body.append("cell", form.cell);
      body.append("height", heightStr);
      body.append("weight", weightStr);
      body.append("address1", form.address1);
      body.append("address2", form.address2);
      body.append("city", form.city);
      body.append("state", form.state);
      body.append("insurancePrimary", form.insurancePrimary);
      body.append("insuranceSecondary", form.insuranceSecondary);
      body.append("subscriberIdPrimary", form.subscriberIdPrimary);
      body.append("subscriberIdSecondary", form.subscriberIdSecondary);
      body.append("referringPhysician", form.referringPhysician);
      body.append("physicianNpi", form.physicianNpi);
      body.append("physicianSignature", form.physicianSignature);
      body.append("physicianPhone", form.physicianPhone);
      body.append("physicianFax", form.physicianFax);
      body.append("diagnosisReason", form.diagnosisReason);
      body.append(
        "molecularImaging",
        molecularStr + (form.otherImaging.trim() ? " | Other: " + form.otherImaging.trim() : "")
      );
      body.append("radioligandTherapy", therapyStr);
      if (form.replyEmail) body.append("replyEmail", form.replyEmail);

      attachments.forEach((file) => body.append("attachments", file));

      const response = await fetch("/api/referral", {
        method: "POST",
        body,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: "success", message: successMessage });
        setForm({
          patientName: "",
          dob: "",
          phone: "",
          cell: "",
          heightFeet: "",
          heightInches: "",
          weight: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          insurancePrimary: "",
          insuranceSecondary: "",
          subscriberIdPrimary: "",
          subscriberIdSecondary: "",
          referringPhysician: "",
          physicianNpi: "",
          physicianSignature: "",
          physicianPhone: "",
          physicianFax: "",
          diagnosisReason: "",
          molecularImaging: [],
          radioligandTherapy: [],
          otherImaging: "",
          replyEmail: "",
        });
        setAttachments([]);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again or call (561) 847-3797.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Failed to submit. Please try again or call (561) 847-3797.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Section className="py-6 md:py-8 bg-surface-cool">
        <ScrollReveal>
          <Container>
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-normal text-charcoal leading-tight">
                  {pageTitle}
                </h1>
                <p className="text-sm font-sans text-text-muted mt-1">
                  {pageSubtitle}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm font-sans text-text-muted shrink-0">
                {phoneNumbers.map((num, i) => (
                  <a key={i} href={`tel:${num.replace(/\D/g, "")}`} className="hover:text-charcoal transition-colors">
                    {num}
                  </a>
                ))}
              </div>
            </div>
          </Container>
        </ScrollReveal>
      </Section>

      <Section className="py-10 md:py-14 bg-warm-white">
        <ScrollReveal>
          <Container>
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <h2 className="text-2xl font-serif font-normal text-charcoal mb-6 pb-2 border-b border-charcoal/10">
                  Patient Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="patientName" className={labelClass}>Patient Name *</label>
                    <input type="text" id="patientName" name="patientName" required value={form.patientName} onChange={handleChange} className={inputClass} placeholder="First Middle Last" />
                  </div>
                  <div>
                    <label htmlFor="dob" className={labelClass}>DOB *</label>
                    <input type="date" id="dob" name="dob" required max={new Date().toISOString().split("T")[0]} value={form.dob} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone *</label>
                    <input type="tel" id="phone" name="phone" required value={form.phone} onChange={handlePhoneChange("phone")} className={inputClass} placeholder="(555) 555-5555" maxLength={14} inputMode="numeric" autoComplete="tel" />
                    <p className="text-xs text-text-muted mt-1">Primary contact · 10 digits</p>
                  </div>
                  <div>
                    <label htmlFor="cell" className={labelClass}>Cell</label>
                    <input type="tel" id="cell" name="cell" value={form.cell} onChange={handlePhoneChange("cell")} className={inputClass} placeholder="(555) 555-5555" maxLength={14} inputMode="numeric" autoComplete="tel" />
                  </div>
                  <div>
                    <label htmlFor="heightFeet" className={labelClass}>Height *</label>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <input type="number" id="heightFeet" name="heightFeet" required min={1} max={8} value={form.heightFeet} onChange={handleChange} className={inputClass} placeholder="Ft" />
                        <span className="text-xs text-text-muted block mt-0.5">ft</span>
                      </div>
                      <div className="flex-1">
                        <input type="number" id="heightInches" name="heightInches" required min={0} max={11} value={form.heightInches} onChange={handleChange} className={inputClass} placeholder="In" />
                        <span className="text-xs text-text-muted block mt-0.5">in</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="weight" className={labelClass}>Weight *</label>
                    <div className="flex items-center gap-2">
                      <input type="text" id="weight" name="weight" required value={form.weight} onChange={handleWeightChange} className={inputClass} placeholder="170" inputMode="decimal" autoComplete="off" />
                      <span className="text-sm font-sans text-text-muted shrink-0">lbs</span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address1" className={labelClass}>Address *</label>
                    <input type="text" id="address1" name="address1" required value={form.address1} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address2" className={labelClass}>Address Line 2</label>
                    <input type="text" id="address2" name="address2" value={form.address2} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="city" className={labelClass}>City</label>
                    <input type="text" id="city" name="city" value={form.city} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="state" className={labelClass}>State</label>
                    <input type="text" id="state" name="state" value={form.state} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-normal text-charcoal mb-6 pb-2 border-b border-charcoal/10">Insurance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="insurancePrimary" className={labelClass}>Insurance Primary *</label>
                    <input type="text" id="insurancePrimary" name="insurancePrimary" required value={form.insurancePrimary} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="insuranceSecondary" className={labelClass}>Insurance Secondary</label>
                    <input type="text" id="insuranceSecondary" name="insuranceSecondary" value={form.insuranceSecondary} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="subscriberIdPrimary" className={labelClass}>ID / Subscriber # Primary *</label>
                    <input type="text" id="subscriberIdPrimary" name="subscriberIdPrimary" required value={form.subscriberIdPrimary} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="subscriberIdSecondary" className={labelClass}>ID / Subscriber # Secondary</label>
                    <input type="text" id="subscriberIdSecondary" name="subscriberIdSecondary" value={form.subscriberIdSecondary} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-normal text-charcoal mb-6 pb-2 border-b border-charcoal/10">Referring Provider</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="referringPhysician" className={labelClass}>Referring Physician *</label>
                    <input type="text" id="referringPhysician" name="referringPhysician" required value={form.referringPhysician} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="physicianNpi" className={labelClass}>Physician NPI</label>
                    <input type="text" id="physicianNpi" name="physicianNpi" value={form.physicianNpi} onChange={handleNpiChange} className={inputClass} placeholder="10 digits" inputMode="numeric" maxLength={10} />
                  </div>
                  <div>
                    <label htmlFor="physicianSignature" className={labelClass}>Physician Signature *</label>
                    <input type="text" id="physicianSignature" name="physicianSignature" required value={form.physicianSignature} onChange={handleChange} className={inputClass} placeholder="Typed name (signature)" />
                  </div>
                  <div>
                    <label htmlFor="physicianPhone" className={labelClass}>Phone *</label>
                    <input type="tel" id="physicianPhone" name="physicianPhone" required value={form.physicianPhone} onChange={handlePhoneChange("physicianPhone")} className={inputClass} placeholder="(555) 555-5555" maxLength={14} inputMode="numeric" />
                  </div>
                  <div>
                    <label htmlFor="physicianFax" className={labelClass}>Fax</label>
                    <input type="tel" id="physicianFax" name="physicianFax" value={form.physicianFax} onChange={handlePhoneChange("physicianFax")} className={inputClass} placeholder="(555) 555-5555" maxLength={14} inputMode="numeric" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-normal text-charcoal mb-6 pb-2 border-b border-charcoal/10">Order Details</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="diagnosisReason" className={labelClass}>Diagnosis and Reason for Order (complete details) *</label>
                    <textarea id="diagnosisReason" name="diagnosisReason" required rows={4} value={form.diagnosisReason} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Provide complete clinical details" />
                  </div>
                  <div>
                    <p className={labelClass}>Molecular Imaging</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {MOLECULAR_IMAGING_OPTIONS.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2 text-sm font-sans text-charcoal cursor-pointer">
                          <input type="checkbox" checked={form.molecularImaging.includes(opt.value)} onChange={(e) => handleCheckbox("molecularImaging", opt.value, e.target.checked)} className="rounded border-charcoal/30 text-navy focus:ring-navy" />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className={labelClass}>Radioligand Therapies</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {RADIOLIGAND_THERAPY_OPTIONS.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2 text-sm font-sans text-charcoal cursor-pointer">
                          <input type="checkbox" checked={form.radioligandTherapy.includes(opt.value)} onChange={(e) => handleCheckbox("radioligandTherapy", opt.value, e.target.checked)} className="rounded border-charcoal/30 text-navy focus:ring-navy" />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="otherImaging" className={labelClass}>Other (specify)</label>
                    <input type="text" id="otherImaging" name="otherImaging" value={form.otherImaging} onChange={handleChange} className={inputClass} placeholder="Other imaging or therapy" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-normal text-charcoal mb-6 pb-2 border-b border-charcoal/10">Upload Documents</h2>
                <p className="text-sm font-sans text-text-muted mb-2">Recent progress notes and imaging reports (max 5 files, 10 MB each)</p>
                <input type="file" id="attachments" name="attachments" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={(e) => setAttachments(Array.from(e.target.files || []))} className="block w-full text-sm font-sans text-charcoal file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:bg-navy file:text-warm-white file:font-medium file:cursor-pointer hover:file:bg-navy-light" />
                {attachments.length > 0 && <p className="mt-2 text-sm text-text-muted">{attachments.length} file(s) selected</p>}
              </div>

              <div>
                <label htmlFor="replyEmail" className={labelClass}>Your Email (for follow-up)</label>
                <input type="email" id="replyEmail" name="replyEmail" value={form.replyEmail} onChange={handleChange} className={inputClass} placeholder="your.email@example.com" />
              </div>

              {submitStatus.type && (
                <div className={`p-4 rounded-sm ${submitStatus.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                  <p className="text-sm font-sans">{submitStatus.message}</p>
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-8 py-3.5 text-sm font-sans font-medium tracking-wide transition-all duration-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 focus:ring-offset-warm-white bg-navy text-warm-white hover:bg-navy-light disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? "Submitting..." : "Submit Referral"}
              </button>
            </form>
          </div>
        </Container>
        </ScrollReveal>
      </Section>
    </>
  );
}

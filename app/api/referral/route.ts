import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml, sanitizeFilename } from "@/lib/security";

const resend = new Resend(process.env.RESEND_API_KEY);
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;

async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!RECAPTCHA_SECRET) return true;
  if (!token) return false;
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: RECAPTCHA_SECRET, response: token }),
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB per file
const MAX_TOTAL_FILES = 5;
const MAX_TOTAL_ATTACHMENT_SIZE = 25 * 1024 * 1024; // 25 MB total
const MAX_FIELD_LENGTH = 500;
const MAX_DIAGNOSIS_LENGTH = 2000;

function formatSection(title: string, entries: [string, string | undefined][]): string {
  const lines = entries
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `<p style="margin: 6px 0;"><strong>${escapeHtml(k)}:</strong> ${escapeHtml(String(v))}</p>`)
    .join("");
  return `<div style="margin-bottom: 20px;"><h3 style="color: #1a2332; margin-bottom: 8px;">${escapeHtml(title)}</h3>${lines}</div>`;
}

function getString(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function truncate(str: string, max: number): string {
  return str.slice(0, max);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const recaptchaToken = getString(formData, "recaptchaToken");
    if (RECAPTCHA_SECRET) {
      if (!recaptchaToken) {
        return NextResponse.json(
          { error: "Please complete the security check (reCAPTCHA) and try again." },
          { status: 400 }
        );
      }
      const valid = await verifyRecaptcha(recaptchaToken);
      if (!valid) {
        return NextResponse.json(
          { error: "Security check failed. Please try again." },
          { status: 400 }
        );
      }
    }

    const patientName = truncate(getString(formData, "patientName"), MAX_FIELD_LENGTH);
    const dob = truncate(getString(formData, "dob"), MAX_FIELD_LENGTH);
    const phone = truncate(getString(formData, "phone"), 20);
    const cell = truncate(getString(formData, "cell"), 20);
    const height = truncate(getString(formData, "height"), MAX_FIELD_LENGTH);
    const weight = truncate(getString(formData, "weight"), MAX_FIELD_LENGTH);
    const address1 = truncate(getString(formData, "address1"), MAX_FIELD_LENGTH);
    const address2 = truncate(getString(formData, "address2"), MAX_FIELD_LENGTH);
    const city = truncate(getString(formData, "city"), MAX_FIELD_LENGTH);
    const state = truncate(getString(formData, "state"), MAX_FIELD_LENGTH);
    const insurancePrimary = truncate(getString(formData, "insurancePrimary"), MAX_FIELD_LENGTH);
    const insuranceSecondary = truncate(getString(formData, "insuranceSecondary"), MAX_FIELD_LENGTH);
    const subscriberIdPrimary = truncate(getString(formData, "subscriberIdPrimary"), MAX_FIELD_LENGTH);
    const subscriberIdSecondary = truncate(getString(formData, "subscriberIdSecondary"), MAX_FIELD_LENGTH);
    const referringPhysician = truncate(getString(formData, "referringPhysician"), MAX_FIELD_LENGTH);
    const physicianNpi = truncate(getString(formData, "physicianNpi"), MAX_FIELD_LENGTH);
    const physicianSignature = truncate(getString(formData, "physicianSignature"), MAX_FIELD_LENGTH);
    const physicianPhone = truncate(getString(formData, "physicianPhone"), 20);
    const physicianFax = truncate(getString(formData, "physicianFax"), 20);
    const diagnosisReason = truncate(getString(formData, "diagnosisReason"), MAX_DIAGNOSIS_LENGTH);
    const molecularImaging = truncate(getString(formData, "molecularImaging"), MAX_FIELD_LENGTH);
    const radioligandTherapy = truncate(getString(formData, "radioligandTherapy"), MAX_FIELD_LENGTH);
    const replyEmail = truncate(getString(formData, "replyEmail"), 254);

    if (!patientName || !dob || !phone || !height || !weight) {
      return NextResponse.json(
        { error: "Patient name, DOB, phone, height, and weight are required." },
        { status: 400 }
      );
    }
    if (!address1 || !insurancePrimary || !subscriberIdPrimary) {
      return NextResponse.json(
        { error: "Address, primary insurance, and primary subscriber ID are required." },
        { status: 400 }
      );
    }
    if (!referringPhysician || !physicianSignature || !physicianPhone) {
      return NextResponse.json(
        { error: "Referring physician, physician signature, and physician phone are required." },
        { status: 400 }
      );
    }
    if (!diagnosisReason) {
      return NextResponse.json(
        { error: "Diagnosis and reason for order are required." },
        { status: 400 }
      );
    }
    if (!radioligandTherapy && !molecularImaging) {
      return NextResponse.json(
        { error: "Please select at least one Molecular Imaging study or Radioligand Therapy." },
        { status: 400 }
      );
    }

    const attachments: { filename: string; content: Buffer }[] = [];
    const files = formData.getAll("attachments") as File[];
    let totalSize = 0;
    for (const file of files) {
      if (!(file instanceof File) || !file.size) continue;
      if (attachments.length >= MAX_TOTAL_FILES) break;
      if (file.size > MAX_FILE_SIZE) continue;
      if (totalSize + file.size > MAX_TOTAL_ATTACHMENT_SIZE) break;
      totalSize += file.size;
      const buffer = Buffer.from(await file.arrayBuffer());
      const safeName = sanitizeFilename(file.name || "attachment");
      attachments.push({ filename: safeName, content: buffer });
    }

    const recipientEmail = process.env.REFERRAL_EMAIL || process.env.CONTACT_EMAIL || "your-email@example.com";

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
        <h2 style="color: #1a2332; margin-bottom: 24px;">New Referral / Order Form Submission</h2>
        ${formatSection("Patient Information", [
          ["Patient Name", patientName],
          ["DOB", dob],
          ["Phone", phone ?? undefined],
          ["Cell", cell ?? undefined],
          ["Height", height ?? undefined],
          ["Weight", weight ?? undefined],
          ["Address", address1],
          ["Address Line 2", address2 ?? undefined],
          ["City", city ?? undefined],
          ["State", state ?? undefined],
        ])}
        ${formatSection("Insurance", [
          ["Primary", insurancePrimary],
          ["Secondary", insuranceSecondary ?? undefined],
          ["Primary ID/Subscriber #", subscriberIdPrimary],
          ["Secondary ID/Subscriber #", subscriberIdSecondary ?? undefined],
        ])}
        ${formatSection("Referring Provider", [
          ["Referring Physician", referringPhysician],
          ["Physician NPI", physicianNpi ?? undefined],
          ["Physician Signature", physicianSignature],
          ["Phone", physicianPhone ?? undefined],
          ["Fax", physicianFax ?? undefined],
        ])}
        ${formatSection("Order Details", [
          ["Diagnosis and Reason for Order", diagnosisReason],
          ["Molecular Imaging", molecularImaging ?? undefined],
          ["Radioligand Therapy", radioligandTherapy ?? undefined],
        ])}
        ${replyEmail ? `<p style="margin-top: 16px;"><strong>Reply-to email:</strong> ${escapeHtml(replyEmail)}</p>` : ""}
      </div>
    `;

    const text = `
New Referral / Order Form Submission

PATIENT INFORMATION
Patient Name: ${patientName}
DOB: ${dob}
Phone: ${phone}
Cell: ${cell ?? ""}
Height: ${height}
Weight: ${weight}
Address: ${address1}
${address2 ? `Address Line 2: ${address2}` : ""}
City: ${city ?? ""}
State: ${state ?? ""}

INSURANCE
Primary: ${insurancePrimary}
Secondary: ${insuranceSecondary ?? ""}
Primary ID/Subscriber #: ${subscriberIdPrimary}
Secondary ID/Subscriber #: ${subscriberIdSecondary ?? ""}

REFERRING PROVIDER
Referring Physician: ${referringPhysician}
Physician NPI: ${physicianNpi ?? ""}
Physician Signature: ${physicianSignature}
Phone: ${physicianPhone}
Fax: ${physicianFax ?? ""}

ORDER DETAILS
Diagnosis and Reason for Order: ${diagnosisReason}
Molecular Imaging: ${molecularImaging ?? ""}
Radioligand Therapy: ${radioligandTherapy ?? ""}
${replyEmail ? `Reply-to: ${replyEmail}` : ""}
    `.trim();

    const { data, error } = await resend.emails.send({
      from: "Florida Theranostics Referrals <onboarding@resend.dev>",
      to: [recipientEmail],
      reply_to: replyEmail || undefined,
      subject: `New Referral: ${patientName} – ${referringPhysician}`,
      html,
      text,
      attachments: attachments.length ? attachments : undefined,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send referral. Please try again or call (561) 847-3797." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Referral submitted successfully.", data }, { status: 200 });
  } catch (err) {
    console.error("Referral API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or call (561) 847-3797." },
      { status: 500 }
    );
  }
}

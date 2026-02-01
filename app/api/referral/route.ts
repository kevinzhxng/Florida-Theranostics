import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB per file
const MAX_TOTAL_FILES = 5;

function formatSection(title: string, entries: [string, string | undefined][]): string {
  const lines = entries
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `<p style="margin: 6px 0;"><strong>${k}:</strong> ${String(v).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`)
    .join("");
  return `<div style="margin-bottom: 20px;"><h3 style="color: #1a2332; margin-bottom: 8px;">${title}</h3>${lines}</div>`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const patientName = formData.get("patientName") as string | null;
    const dob = formData.get("dob") as string | null;
    const phone = formData.get("phone") as string | null;
    const cell = formData.get("cell") as string | null;
    const height = formData.get("height") as string | null;
    const weight = formData.get("weight") as string | null;
    const address1 = formData.get("address1") as string | null;
    const address2 = formData.get("address2") as string | null;
    const city = formData.get("city") as string | null;
    const state = formData.get("state") as string | null;
    const insurancePrimary = formData.get("insurancePrimary") as string | null;
    const insuranceSecondary = formData.get("insuranceSecondary") as string | null;
    const subscriberIdPrimary = formData.get("subscriberIdPrimary") as string | null;
    const subscriberIdSecondary = formData.get("subscriberIdSecondary") as string | null;
    const referringPhysician = formData.get("referringPhysician") as string | null;
    const physicianNpi = formData.get("physicianNpi") as string | null;
    const physicianSignature = formData.get("physicianSignature") as string | null;
    const physicianPhone = formData.get("physicianPhone") as string | null;
    const physicianFax = formData.get("physicianFax") as string | null;
    const diagnosisReason = formData.get("diagnosisReason") as string | null;
    const molecularImaging = formData.get("molecularImaging") as string | null;
    const radioligandTherapy = formData.get("radioligandTherapy") as string | null;
    const replyEmail = formData.get("replyEmail") as string | null;

    if (!patientName?.trim() || !dob?.trim() || !phone?.trim() || !height?.trim() || !weight?.trim()) {
      return NextResponse.json(
        { error: "Patient name, DOB, phone, height, and weight are required." },
        { status: 400 }
      );
    }
    if (!address1?.trim() || !insurancePrimary?.trim() || !subscriberIdPrimary?.trim()) {
      return NextResponse.json(
        { error: "Address, primary insurance, and primary subscriber ID are required." },
        { status: 400 }
      );
    }
    if (!referringPhysician?.trim() || !physicianSignature?.trim() || !physicianPhone?.trim()) {
      return NextResponse.json(
        { error: "Referring physician, physician signature, and physician phone are required." },
        { status: 400 }
      );
    }
    if (!diagnosisReason?.trim()) {
      return NextResponse.json(
        { error: "Diagnosis and reason for order are required." },
        { status: 400 }
      );
    }
    if (!radioligandTherapy?.trim() && !molecularImaging?.trim()) {
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
      totalSize += file.size;
      if (totalSize > 25 * 1024 * 1024) break;
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({ filename: file.name || "attachment", content: buffer });
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
        ${replyEmail ? `<p style="margin-top: 16px;"><strong>Reply-to email:</strong> ${replyEmail}</p>` : ""}
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

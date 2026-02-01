import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "@/lib/security";

const resend = new Resend(process.env.RESEND_API_KEY);
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;
const PHONE_DIGITS = 10;

const BASIC_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!RECAPTCHA_SECRET) return true; // Skip verification if not configured
  if (!token) return false;
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: RECAPTCHA_SECRET, response: token }),
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

function parsePhoneDigits(value: unknown): string {
  const s = String(value ?? "").replace(/\D/g, "").slice(0, PHONE_DIGITS);
  return s;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, recaptchaToken } = body;

    // reCAPTCHA: require and verify when secret is set
    if (RECAPTCHA_SECRET) {
      if (!recaptchaToken || typeof recaptchaToken !== "string") {
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

    // Validate required fields and types
    const nameStr = typeof name === "string" ? name.trim() : "";
    const emailStr = typeof email === "string" ? email.trim() : "";
    const messageStr = typeof message === "string" ? message.trim() : "";
    if (!nameStr || !emailStr || !messageStr) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }
    if (nameStr.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: `Name must be ${MAX_NAME_LENGTH} characters or less.` },
        { status: 400 }
      );
    }
    if (emailStr.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json(
        { error: "Email address is too long." },
        { status: 400 }
      );
    }
    if (!BASIC_EMAIL_REGEX.test(emailStr)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (messageStr.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or less.` },
        { status: 400 }
      );
    }

    const phoneDigits = phone != null && String(phone).trim() !== "" ? parsePhoneDigits(phone) : "";
    if (phoneDigits.length > 0 && phoneDigits.length !== PHONE_DIGITS) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit phone number." },
        { status: 400 }
      );
    }
    const phoneDisplay = phoneDigits.length === PHONE_DIGITS
      ? `(${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6)}`
      : "";

    // Get recipient email from environment variable
    const recipientEmail = process.env.CONTACT_EMAIL || "your-email@example.com";

    // Escape for HTML to prevent XSS in email content
    const nameEsc = escapeHtml(nameStr);
    const emailEsc = escapeHtml(emailStr);
    const messageEsc = escapeHtml(messageStr);
    const phoneEsc = escapeHtml(phoneDisplay);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Florida Theranostics Contact <onboarding@resend.dev>", // Update this with your verified domain
      to: [recipientEmail],
      reply_to: emailStr,
      subject: `New Contact Form Submission from ${nameStr}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a2332; margin-bottom: 20px;">New Contact Form Submission</h2>
          
          <div style="background-color: #f5f3f0; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${nameEsc}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${emailEsc}">${emailEsc}</a></p>
            ${phoneEsc ? `<p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${phoneEsc}">${phoneEsc}</a></p>` : ""}
          </div>
          
          <div style="margin-top: 20px;">
            <h3 style="color: #1a2332; margin-bottom: 10px;">Message:</h3>
            <p style="color: #2c2c2c; line-height: 1.6; white-space: pre-wrap;">${messageEsc}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${nameStr}
Email: ${emailStr}
${phoneDisplay ? `Phone: ${phoneDisplay}` : ""}

Message:
${messageStr}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

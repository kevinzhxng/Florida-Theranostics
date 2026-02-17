import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "@/lib/security";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_MESSAGE_LENGTH = 2000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim().slice(0, MAX_NAME_LENGTH) : "";
    const email = typeof body.email === "string" ? body.email.trim().slice(0, MAX_EMAIL_LENGTH) : "";

    if (!message) {
      return NextResponse.json(
        { error: "Please enter your question or message." },
        { status: 400 }
      );
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or less.` },
        { status: 400 }
      );
    }

    const recipientEmail =
      process.env.CHAT_EMAIL || process.env.CONTACT_EMAIL || "";
    if (!recipientEmail) {
      return NextResponse.json(
        { error: "Chat is not configured. Please try the Contact page." },
        { status: 500 }
      );
    }

    const nameEsc = escapeHtml(name || "(not provided)");
    const emailEsc = escapeHtml(email || "(not provided)");
    const messageEsc = escapeHtml(message);

    const fromAddress = process.env.RESEND_FROM || "Florida Theranostics Website <onboarding@resend.dev>";
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [recipientEmail],
      reply_to: email || undefined,
      subject: `Website chat: ${name ? `${name} – ` : ""}${message.slice(0, 50)}${message.length > 50 ? "…" : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px;">
          <h2 style="color: #1a2332; margin-bottom: 16px;">New message from website chat</h2>
          <div style="background-color: #f5f3f0; padding: 16px; border-radius: 4px; margin-bottom: 16px;">
            <p style="margin: 6px 0;"><strong>Name:</strong> ${nameEsc}</p>
            <p style="margin: 6px 0;"><strong>Email:</strong> ${emailEsc}</p>
          </div>
          <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
          <p style="color: #2c2c2c; line-height: 1.6; white-space: pre-wrap;">${messageEsc}</p>
        </div>
      `,
      text: `New message from website chat\n\nName: ${name || "(not provided)"}\nEmail: ${email || "(not provided)"}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Chat email error:", error);
      return NextResponse.json(
        { error: "Failed to send. Please try the Contact page or call (561) 847-3797." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or call (561) 847-3797." },
      { status: 500 }
    );
  }
}

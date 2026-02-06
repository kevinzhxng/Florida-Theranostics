"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ScrollReveal from "@/components/animations/ScrollReveal";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

declare global {
  interface Window {
    grecaptcha?: {
      render: (container: string | HTMLElement, options: { sitekey: string; theme?: string; size?: string }) => number;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
    };
  }
}

const inputClass = "w-full px-4 py-2.5 border border-charcoal/20 bg-warm-white text-charcoal focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all font-sans text-sm";
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;

function formatPhoneDisplay(digits: string): string {
  const d = digits.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 3) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function parsePhoneDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, 10);
}

export default function ContactForm({
  pageTitle = "Contact Us",
  introParagraph = "We're here to help. Reach out to schedule a consultation or learn more about our services.",
  formHeading = "Send a Message",
  submitButtonLabel = "Send Message",
  successMessage = "Thank you! Your message has been sent. We'll get back to you soon.",
  address = "432 University Blvd.\nJupiter, FL 33458",
  phone = "(561) 847-3797",
  hours = "Mon - Fri: 8:00 AM - 5:00 PM\nSat & Sun: Closed",
}: {
  pageTitle?: string;
  introParagraph?: string;
  formHeading?: string;
  submitButtonLabel?: string;
  successMessage?: string;
  address?: string;
  phone?: string;
  hours?: string;
}) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const recaptchaWidgetIdRef = useRef<number | null>(null);
  const scriptLoadedRef = useRef(false);

  const tryRenderRecaptcha = () => {
    if (recaptchaWidgetIdRef.current !== null) return;
    const container = recaptchaContainerRef.current;
    if (!container || !window.grecaptcha?.render) return false;
    try {
      recaptchaWidgetIdRef.current = window.grecaptcha.render(container, {
        sitekey: RECAPTCHA_SITE_KEY,
        theme: "light",
        size: "normal",
      });
      return true;
    } catch {
      return false;
    }
  };

  // Load reCAPTCHA script
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || typeof window === "undefined") return;

    const scriptSrc = "https://www.google.com/recaptcha/api.js?render=explicit";
    let script = document.querySelector<HTMLScriptElement>(`script[src="${scriptSrc}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const onScriptLoad = () => {
      scriptLoadedRef.current = true;
    };

    if (window.grecaptcha?.render) {
      scriptLoadedRef.current = true;
      return;
    }
    script.addEventListener("load", onScriptLoad);
    return () => script?.removeEventListener("load", onScriptLoad);
  }, [RECAPTCHA_SITE_KEY]);

  // Render reCAPTCHA only when container is in view (form is inside ScrollReveal which starts at opacity 0)
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || typeof window === "undefined") return;
    const container = recaptchaContainerRef.current;
    if (!container || typeof window.IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || recaptchaWidgetIdRef.current !== null) return;
        if (scriptLoadedRef.current && window.grecaptcha?.render) {
          tryRenderRecaptcha();
        }
      },
      { threshold: 0.1, rootMargin: "80px" }
    );

    // If script loads after we're already in view, render then (stops after ~10s or when rendered)
    let attempts = 0;
    const maxAttempts = 50;
    const checkAndRender = () => {
      if (recaptchaWidgetIdRef.current !== null || !scriptLoadedRef.current || attempts >= maxAttempts) return;
      attempts += 1;
      const el = recaptchaContainerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) tryRenderRecaptcha();
    };

    observer.observe(container);
    const t = setInterval(checkAndRender, 200);
    return () => {
      observer.disconnect();
      clearInterval(t);
    };
  }, [RECAPTCHA_SITE_KEY]);

  const getRecaptchaToken = (): string => {
    if (typeof window === "undefined" || !window.grecaptcha?.getResponse) return "";
    try {
      return window.grecaptcha.getResponse(recaptchaWidgetIdRef.current ?? undefined) ?? "";
    } catch {
      return "";
    }
  };

  const resetRecaptcha = () => {
    if (typeof window !== "undefined" && window.grecaptcha?.reset) {
      try {
        window.grecaptcha.reset(recaptchaWidgetIdRef.current ?? undefined);
      } catch {
        // ignore
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phoneDigits = parsePhoneDigits(formData.phone);
    if (formData.phone && phoneDigits.length !== 10) {
      setSubmitStatus({ type: "error", message: "Please enter a valid 10-digit phone number, or leave phone blank." });
      return;
    }
    if (RECAPTCHA_SITE_KEY) {
      const token = getRecaptchaToken();
      if (!token) {
        setSubmitStatus({ type: "error", message: "Please complete the \"I'm not a robot\" check before sending." });
        return;
      }
    }
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const recaptchaToken = RECAPTCHA_SITE_KEY ? getRecaptchaToken() : undefined;
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: phoneDigits ? formatPhoneDisplay(phoneDigits) : "",
        message: formData.message.trim(),
        recaptchaToken,
      };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitStatus({ type: "success", message: successMessage });
        setFormData({ name: "", email: "", phone: "", message: "" });
        resetRecaptcha();
      } else {
        setSubmitStatus({ type: "error", message: data.error || "Something went wrong. Please try again." });
      }
    } catch {
      setSubmitStatus({ type: "error", message: "Failed to send message. Please try again or call us directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digits = parsePhoneDigits(value);
      setFormData((prev) => ({ ...prev, phone: formatPhoneDisplay(digits) }));
      return;
    }
    if (name === "name") {
      setFormData((prev) => ({ ...prev, name: value.slice(0, MAX_NAME_LENGTH) }));
      return;
    }
    if (name === "email") {
      setFormData((prev) => ({ ...prev, email: value.slice(0, MAX_EMAIL_LENGTH) }));
      return;
    }
    if (name === "message") {
      setFormData((prev) => ({ ...prev, message: value.slice(0, MAX_MESSAGE_LENGTH) }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Section className="py-10 md:py-14 bg-surface-cool">
      <ScrollReveal>
        <Container>
          <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-normal text-charcoal mb-4 leading-tight">
                {pageTitle}
              </h1>
              <p className="text-base md:text-lg text-text-muted leading-relaxed mb-8">
                {introParagraph}
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-text-subtle mb-4 font-sans font-medium">Address</h3>
                  <p className="text-lg text-text-muted leading-loose font-sans whitespace-pre-line">{address}</p>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-text-subtle mb-4 font-sans font-medium">Phone</h3>
                  <a href={`tel:${phone.replace(/\D/g, "")}`} className="text-lg text-text-muted hover:text-charcoal transition-colors font-sans">
                    {phone}
                  </a>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-text-subtle mb-4 font-sans font-medium">Hours</h3>
                  <p className="text-lg text-text-muted leading-loose font-sans whitespace-pre-line">{hours}</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-serif font-normal text-charcoal mb-6 leading-tight">
                {formHeading}
              </h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                data-recaptcha-configured={RECAPTCHA_SITE_KEY ? "yes" : "no"}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-sans font-medium text-charcoal mb-2">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    maxLength={MAX_NAME_LENGTH}
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                  <p className="mt-1 text-xs text-text-subtle font-sans">{formData.name.length}/{MAX_NAME_LENGTH}</p>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-sans font-medium text-charcoal mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    maxLength={MAX_EMAIL_LENGTH}
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="your.email@example.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-sans font-medium text-charcoal mb-2">Phone (10-digit US)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="(555) 123-4567"
                    autoComplete="tel"
                    inputMode="numeric"
                    maxLength={14}
                  />
                  <p className="mt-1 text-xs text-text-subtle font-sans">Optional. Enter 10 digits; formatting is automatic.</p>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-sans font-medium text-charcoal mb-2">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    maxLength={MAX_MESSAGE_LENGTH}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    placeholder="How can we help you?"
                  />
                  <p className="mt-1 text-xs text-text-subtle font-sans">{formData.message.length}/{MAX_MESSAGE_LENGTH} characters</p>
                </div>
                {RECAPTCHA_SITE_KEY && (
                  <div ref={recaptchaContainerRef} aria-label="reCAPTCHA" />
                )}
                {submitStatus.type && (
                  <div className={`p-4 rounded-sm ${submitStatus.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                    <p className="text-sm font-sans">{submitStatus.message}</p>
                  </div>
                )}
                <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 text-sm font-sans font-medium tracking-wide transition-all duration-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 focus:ring-offset-warm-white bg-navy text-warm-white hover:bg-navy-light active:bg-navy-light disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? "Sending..." : submitButtonLabel}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
      </ScrollReveal>
    </Section>
  );
}

"use client";

import { useState, FormEvent } from "react";
import Container from "@/components/Container";
import Section from "@/components/Section";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent. We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again or call us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Contact Section */}
      <Section className="py-10 md:py-14 bg-surface-cool">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Contact Information */}
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-normal text-charcoal mb-4 leading-tight">
                  Contact Us
                </h1>
                <p className="text-base md:text-lg text-text-muted leading-relaxed mb-8">
                  We&apos;re here to help. Reach out to schedule a consultation or learn more about our services.
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-text-subtle mb-4 font-sans font-medium">
                      Address
                    </h3>
                    <p className="text-lg text-text-muted leading-loose font-sans">
                      432 University Blvd.
                      <br />
                      Jupiter, FL 33458
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-text-subtle mb-4 font-sans font-medium">
                      Phone
                    </h3>
                    <a
                      href="tel:+15618473797"
                      className="text-lg text-text-muted hover:text-charcoal transition-colors font-sans"
                    >
                      (561) 847-3797
                    </a>
                  </div>

                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-text-subtle mb-4 font-sans font-medium">
                      Hours
                    </h3>
                    <p className="text-lg text-text-muted leading-loose font-sans">
                      <strong className="font-medium text-charcoal">Mon - Fri:</strong> 8:00 AM - 5:00 PM
                      <br />
                      <strong className="font-medium text-charcoal">Sat & Sun:</strong> Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-xl md:text-2xl font-serif font-normal text-charcoal mb-6 leading-tight">
                  Send a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-sans font-medium text-charcoal mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-charcoal/20 bg-warm-white text-charcoal focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all font-sans text-sm"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-sans font-medium text-charcoal mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-charcoal/20 bg-warm-white text-charcoal focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all font-sans text-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-sans font-medium text-charcoal mb-2"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-charcoal/20 bg-warm-white text-charcoal focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all font-sans text-sm"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-sans font-medium text-charcoal mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-charcoal/20 bg-warm-white text-charcoal focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all font-sans resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {submitStatus.type && (
                    <div
                      className={`p-4 rounded-sm ${
                        submitStatus.type === "success"
                          ? "bg-green-50 text-green-800 border border-green-200"
                          : "bg-red-50 text-red-800 border border-red-200"
                      }`}
                    >
                      <p className="text-sm font-sans">{submitStatus.message}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 text-sm font-sans font-medium tracking-wide transition-all duration-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 focus:ring-offset-warm-white bg-navy text-warm-white hover:bg-navy-light active:bg-navy-light disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

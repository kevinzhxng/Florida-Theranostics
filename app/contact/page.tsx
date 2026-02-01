import { client } from "@/lib/sanity";
import { contactPageQuery, siteSettingsQuery, fetchOptions } from "@/lib/sanity/queries";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact | Florida Theranostics",
  description: "Reach out to schedule a consultation or learn more about our services.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  let pageTitle = "Contact Us";
  let introParagraph = "We're here to help. Reach out to schedule a consultation or learn more about our services.";
  let formHeading = "Send a Message";
  let submitButtonLabel = "Send Message";
  let successMessage = "Thank you! Your message has been sent. We'll get back to you soon.";
  let address = "432 University Blvd.\nJupiter, FL 33458";
  let phone = "(561) 847-3797";
  let hours = "Mon - Fri: 8:00 AM - 5:00 PM\nSat & Sun: Closed";

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const [contactData, siteData] = await Promise.all([
        client.fetch<{
          pageTitle?: string | null;
          introParagraph?: string | null;
          formHeading?: string | null;
          submitButtonLabel?: string | null;
          successMessage?: string | null;
          overrideAddress?: string | null;
          overridePhone?: string | null;
          overrideHours?: string | null;
        } | null>(contactPageQuery, {}, fetchOptions),
        client.fetch<{ address?: string | null; phone?: string | null; hours?: string | null } | null>(siteSettingsQuery, {}, fetchOptions),
      ]);
      if (contactData) {
        if (contactData.pageTitle) pageTitle = contactData.pageTitle;
        if (contactData.introParagraph) introParagraph = contactData.introParagraph;
        if (contactData.formHeading) formHeading = contactData.formHeading;
        if (contactData.submitButtonLabel) submitButtonLabel = contactData.submitButtonLabel;
        if (contactData.successMessage) successMessage = contactData.successMessage;
        if (contactData.overrideAddress) address = contactData.overrideAddress;
        if (contactData.overridePhone) phone = contactData.overridePhone;
        if (contactData.overrideHours) hours = contactData.overrideHours;
      }
      if (siteData) {
        if (!contactData?.overrideAddress && siteData.address) address = siteData.address;
        if (!contactData?.overridePhone && siteData.phone) phone = siteData.phone;
        if (!contactData?.overrideHours && siteData.hours) hours = siteData.hours;
      }
    } catch {
      // use defaults
    }
  }

  return (
    <ContactForm
      pageTitle={pageTitle}
      introParagraph={introParagraph}
      formHeading={formHeading}
      submitButtonLabel={submitButtonLabel}
      successMessage={successMessage}
      address={address}
      phone={phone}
      hours={hours}
    />
  );
}

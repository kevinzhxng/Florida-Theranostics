import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";

export const metadata = {
  title: "Contact | Florida Theranostics",
  description: "Get in touch with Florida Theranostics",
};

export default function Contact() {
  return (
    <>
      {/* Page Header */}
      <Section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-gray-900">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600">
              [PLACEHOLDER: Contact page introduction - Client to provide]
            </p>
          </div>
        </Container>
      </Section>

      {/* Contact Information */}
      <Section className="py-12 md:py-16">
        <Container>
          <div className="max-w-3xl">
            <div className="space-y-8 mb-12">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Address
                </h2>
                <p className="text-gray-700">
                  [PLACEHOLDER: Street Address]
                  <br />
                  [PLACEHOLDER: City, State ZIP]
                </p>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Phone
                </h2>
                <a
                  href="tel:[PLACEHOLDER-PHONE]"
                  className="text-gray-700 hover:text-gray-900"
                >
                  [PLACEHOLDER: Phone Number]
                </a>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Email
                </h2>
                <a
                  href="mailto:[PLACEHOLDER-EMAIL]"
                  className="text-gray-700 hover:text-gray-900"
                >
                  [PLACEHOLDER: Email Address]
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <Button href="mailto:[PLACEHOLDER-EMAIL]" variant="primary">
                Send Email
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

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
      <Section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <Container>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-charcoal mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-text-muted leading-loose max-w-3xl">
              [PLACEHOLDER: Contact page introduction - Client to provide]
            </p>
          </div>
        </Container>
      </Section>

      {/* Contact Information */}
      <Section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl">
            <div className="space-y-10 md:space-y-12 mb-16">
              <div>
                <h2 className="text-sm uppercase tracking-wider text-text-subtle mb-4 font-sans font-normal">
                  Address
                </h2>
                <p className="text-lg text-text-muted leading-loose font-sans">
                  [PLACEHOLDER: Street Address]
                  <br />
                  [PLACEHOLDER: City, State ZIP]
                </p>
              </div>

              <div>
                <h2 className="text-sm uppercase tracking-wider text-text-subtle mb-4 font-sans font-normal">
                  Phone
                </h2>
                <a
                  href="tel:[PLACEHOLDER-PHONE]"
                  className="text-lg text-text-muted hover:text-charcoal transition-colors font-sans leading-loose"
                >
                  [PLACEHOLDER: Phone Number]
                </a>
              </div>

              <div>
                <h2 className="text-sm uppercase tracking-wider text-text-subtle mb-4 font-sans font-normal">
                  Email
                </h2>
                <a
                  href="mailto:[PLACEHOLDER-EMAIL]"
                  className="text-lg text-text-muted hover:text-charcoal transition-colors font-sans leading-loose"
                >
                  [PLACEHOLDER: Email Address]
                </a>
              </div>
            </div>

            <div className="pt-12 border-t border-gray-200/50">
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

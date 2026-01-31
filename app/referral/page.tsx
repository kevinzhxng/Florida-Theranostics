import Container from "@/components/Container";
import Section from "@/components/Section";

export const metadata = {
  title: "Referral | Florida Theranostics",
  description: "Referral information for healthcare providers",
};

export default function Referral() {
  return (
    <>
      {/* Page Header */}
      <Section className="py-10 md:py-14">
        <Container>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-charcoal mb-6 leading-tight">
              Referral
            </h1>
            <p className="text-lg md:text-xl text-text-muted leading-loose max-w-3xl">
              [PLACEHOLDER: Referral page introduction - Client to provide from current GoDaddy site]
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="py-10 md:py-14">
        <Container>
          <div className="max-w-4xl space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-normal text-charcoal mb-6 leading-tight">
                Referring Physicians
              </h2>
              <div className="space-y-6 text-lg text-text-muted leading-loose">
                <p>
                  [PLACEHOLDER: Referral content - Client to provide from current GoDaddy site. This section should include information for healthcare providers about how to refer patients to Florida Theranostics.]
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

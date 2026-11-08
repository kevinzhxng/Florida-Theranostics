import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { IMAGING_PATH, IMAGING_REFERRAL_EMAIL, IMAGING_REFERRAL_FAX, SITE_ORIGIN, type ImagingPageContent } from "@/lib/imaging-content";
import type { SiteSettings } from "@/lib/types";

function Arrow({ className = "" }: { className?: string }) {
  return <svg className={`h-5 w-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" /></svg>;
}

export default function ImagingServicePage({ content, siteSettings }: { content: ImagingPageContent; siteSettings: SiteSettings | null }) {
  const isFet = content.key === "fet-pet";
  const phone = siteSettings?.phone || "(561) 847-3797";
  const address = siteSettings?.address || "431 University Blvd.\nJupiter, FL 33458";
  const referralEmail = siteSettings?.imagingReferralEmail?.trim() || IMAGING_REFERRAL_EMAIL;
  const referralFax = siteSettings?.imagingReferralFax?.trim() || IMAGING_REFERRAL_FAX;
  const referralHref = isFet ? "/referral?study=pet-fet" : "/referral";
  const relatedHref = `${IMAGING_PATH}/${isFet ? "cardiac-imaging" : "fet-pet"}`;
  const relatedTitle = isFet ? "Advanced Cardiac Imaging" : "FET PET — Glioma Imaging";
  const url = `${SITE_ORIGIN}${IMAGING_PATH}/${content.key}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "MedicalWebPage", "@id": `${url}#webpage`, url, name: content.seoTitle, description: content.seoDescription, inLanguage: "en-US", about: { "@type": "MedicalProcedure", name: content.title }, publisher: { "@type": "MedicalClinic", name: "Florida Theranostics", url: SITE_ORIGIN, telephone: phone, address } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
        { "@type": "ListItem", position: 2, name: "Advanced Imaging", item: `${SITE_ORIGIN}${IMAGING_PATH}` },
        { "@type": "ListItem", position: 3, name: content.title, item: url },
      ] },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section className="relative overflow-hidden border-b border-navy/10 bg-[#edf3f3]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,112,128,0.13),transparent_65%)]" aria-hidden="true" />
        <Container className="relative py-7 md:py-10">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-sans text-text-muted">
            <Link href="/" className="hover:text-navy hover:underline">Home</Link><span aria-hidden="true">/</span>
            <Link href={IMAGING_PATH} className="hover:text-navy hover:underline">Advanced Imaging</Link><span aria-hidden="true">/</span>
            <span aria-current="page" className="text-navy">{isFet ? "FET PET" : "Cardiac Imaging"}</span>
          </nav>
          <div className="grid items-center gap-10 py-10 md:py-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
            <div className="max-w-2xl">
              <p className="mb-6 inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.16em] text-[#276c73]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#388c8d]" aria-hidden="true" />{content.eyebrow}
              </p>
              <h1 className="text-4xl font-serif leading-[1.12] text-navy sm:text-5xl lg:text-6xl">{content.title}</h1>
              <div className="my-7 h-px w-16 bg-[#388c8d]" aria-hidden="true" />
              <p className="max-w-xl text-base leading-relaxed text-text-muted md:text-lg">{content.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={referralHref}>Refer a Patient <Arrow className="ml-3" /></Button>
                <Button href="#physician-referrals" variant="secondary">Discuss a Case</Button>
              </div>
              <p className="mt-5 text-sm font-sans text-text-muted">Physician referrals & patient inquiries: <a href={`tel:${phone.replace(/\D/g, "")}`} className="whitespace-nowrap font-medium text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy">{phone}</a></p>
            </div>
            <figure className="mx-auto w-full max-w-[390px] lg:max-w-[420px]">
              <a href={content.posterFullSrc ?? content.posterSrc} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-sm border border-navy/10 bg-white p-2 shadow-[0_16px_50px_-20px_rgba(26,35,50,0.35)] focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-4" aria-label={`View the full-size ${isFet ? "FET PET physician flyer and MRI/PET comparison" : "cardiac imaging physician newsletter"} (opens in a new tab)`}>
                <Image src={content.posterSrc} alt={content.posterAlt} width={content.posterWidth} height={content.posterHeight} priority sizes="(max-width: 640px) 90vw, 420px" className="h-auto w-full" />
                <span className="flex items-center justify-between gap-3 px-3 py-3 text-xs font-sans text-navy">View the full-size physician {isFet ? "flyer" : "newsletter"}<Arrow className="shrink-0 transition-transform group-hover:translate-x-1" /></span>
              </a>
              <figcaption className="mt-3 text-xs leading-relaxed text-text-muted">{content.posterCaption}</figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section className="bg-warm-white py-14 md:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-[0.38fr_0.62fr] md:gap-16">
            <p className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-[#276c73]">{content.leadLabel}</p>
            <div className="max-w-3xl">
              <h2 className="mb-6 text-3xl font-serif text-navy md:text-4xl">{content.leadTitle}</h2>
              <p className="text-base leading-loose text-text-muted md:text-lg">{content.leadBody}</p>
              {isFet && <div className="mt-8 grid gap-5 border-t border-navy/15 pt-6 sm:grid-cols-2">
                <div><h3 className="mb-2 text-xl text-navy">MRI</h3><p className="text-sm leading-relaxed text-text-muted">{content.mriComparison}</p></div>
                <div><h3 className="mb-2 text-xl text-navy">FET PET</h3><p className="text-sm leading-relaxed text-text-muted">{content.petComparison}</p></div>
              </div>}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-navy/10 bg-[#edf3f3] py-14 md:py-20" aria-labelledby="imaging-details-title">
        <Container>
          <div className="mb-10 max-w-3xl">
            <h2 id="imaging-details-title" className="mb-4 text-3xl text-navy md:text-4xl">{content.detailsTitle}</h2>
            <p className="text-base leading-relaxed text-text-muted md:text-lg">{content.detailsIntro}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {content.details.map((detail, index) => <article key={detail.title} className="border border-navy/10 bg-warm-white p-6 md:p-8">
              <span className="mb-5 block text-xs font-sans font-medium tracking-widest text-[#276c73]">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mb-4 text-2xl text-navy">{detail.title}</h3>
              <p className="text-base leading-relaxed text-text-muted">{detail.body}</p>
            </article>)}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-text-muted">{content.clinicalNote}</p>
        </Container>
      </section>

      <section id="physician-referrals" className="scroll-mt-32 bg-navy py-14 text-warm-white md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <p className="mb-4 text-xs font-sans font-semibold uppercase tracking-[0.18em] text-[#9bd1cc]">{content.referralLabel}</p>
              <h2 className="mb-5 text-3xl md:text-4xl">{content.referralTitle}</h2>
              <p className="max-w-xl text-base leading-relaxed text-warm-white/80">{content.referralIntro}</p>
              <Button href={referralHref} className="mt-8 !bg-warm-white !text-navy hover:!bg-white">Start a Physician Referral <Arrow className="ml-3" /></Button>
            </div>
            <address className="border-t border-warm-white/20 pt-7 font-sans not-italic lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <p className="mb-4 text-lg font-medium">Florida Theranostics</p>
              <a href={`tel:${phone.replace(/\D/g, "")}`} className="block text-2xl font-medium text-white hover:text-[#9bd1cc]">{phone}</a>
              <p className="mt-4 text-sm text-warm-white/80">Fax: <a href={`fax:${referralFax.replace(/[^+\d]/g, "")}`} className="hover:text-white">{referralFax}</a></p>
              <a href={`mailto:${referralEmail}`} className="mt-2 inline-block break-all text-sm text-[#9bd1cc] underline underline-offset-4 hover:text-white">{referralEmail}</a>
              <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-warm-white/80">{address}</p>
              <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm text-[#9bd1cc] hover:text-white">Contact our team <Arrow /></Link>
            </address>
          </div>
        </Container>
      </section>

      <section className="bg-warm-white py-9">
        <Container className="flex flex-col justify-between gap-4 sm:flex-row sm:flex-wrap">
          <Link href={IMAGING_PATH} className="inline-flex items-center gap-2 text-sm font-sans text-navy hover:underline"><Arrow className="rotate-180" />Explore all Advanced Imaging services</Link>
          <Link href={relatedHref} className="inline-flex items-center gap-2 text-sm font-sans text-navy hover:underline">{relatedTitle}<Arrow /></Link>
        </Container>
      </section>
    </>
  );
}

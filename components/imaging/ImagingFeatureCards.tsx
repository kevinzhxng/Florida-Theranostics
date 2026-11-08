import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import { IMAGING_PATH, type ImagingPageContent } from "@/lib/imaging-content";

export default function ImagingFeatureCards({ pages }: { pages: ImagingPageContent[] }) {
  const features = pages.filter((page) => page.showFeature);
  if (!features.length) return null;
  return (
    <section aria-label="Featured advanced imaging services" className="bg-warm-white pb-8 md:pb-10">
      <Container>
        <div className="grid gap-5 lg:grid-cols-2">
          {features.map((page) => (
            <Link key={page.key} href={`${IMAGING_PATH}/${page.key}`} className="group grid grid-cols-[1fr_104px] items-center gap-4 overflow-hidden border border-navy/15 bg-[#edf3f3] p-5 transition-colors hover:border-[#388c8d] focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-4 sm:grid-cols-[1fr_124px] sm:gap-6 sm:p-7">
              <div>
                <p className="mb-3 text-[10px] font-sans font-semibold uppercase tracking-[0.17em] text-[#276c73] sm:text-xs">{page.featureLabel}</p>
                <h2 className="mb-3 text-xl leading-tight text-navy sm:text-2xl">{page.featureTitle}</h2>
                <p className="text-sm leading-relaxed text-text-muted">{page.featureDescription}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-sans font-semibold text-navy">{page.featureLinkLabel}<svg className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" /></svg></span>
              </div>
              <Image src={page.posterSrc} alt="" width={page.posterWidth} height={page.posterHeight} sizes="124px" className="h-auto w-full rounded-sm border border-navy/10 bg-white shadow-sm" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

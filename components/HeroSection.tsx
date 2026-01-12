import Link from "next/link";

interface HeroSectionProps {
  videoSrc?: string;
  videoPoster?: string;
  headline: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function HeroSection({
  videoSrc,
  videoPoster,
  headline,
  ctaText = "Get in touch",
  ctaHref = "/contact",
}: HeroSectionProps) {
  // Parse headline with _emphasis_ syntax (e.g., "Welcome to _elite_ medicine")
  const parseHeadline = (text: string) => {
    const parts = text.split(/_/);
    return parts.map((part, index) => {
      // Odd indices are emphasized (between underscores)
      if (index % 2 === 1) {
        return <span key={index} className="italic">{part}</span>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video/Image Background */}
      <div className="absolute inset-0 z-0">
        {videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={videoPoster}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          // Placeholder gradient background until video is added
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900" />
        )}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-normal text-white leading-[1.1] mb-8 md:mb-12">
            {parseHeadline(headline)}
          </h1>
          <Link
            href={ctaHref}
            className="inline-block text-base md:text-lg font-sans font-normal text-white border-b border-white/50 hover:border-white transition-colors duration-300 tracking-wide"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}

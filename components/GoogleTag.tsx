import Script from "next/script";

/**
 * Google tag loader. Supports either:
 *   - Google tag / GA4 / Google Ads IDs: "G-XXXXXXX" or "AW-XXXXXXX"
 *   - Google Tag Manager IDs: "GTM-XXXXXXX"
 *
 * Set NEXT_PUBLIC_GOOGLE_TAG_ID in Vercel to enable. If unset, nothing renders.
 *
 * We use next/script with strategy="afterInteractive" so the tag loads without
 * blocking first paint. IDs are only ever read from an env var (no secrets in
 * code) and are validated with a strict allowlist regex before being injected
 * into any URL or inline script, to avoid HTML/script injection via a
 * misconfigured env var. The measurement ID is public by design (it ships to
 * every browser).
 */
export default function GoogleTag() {
  const rawId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID?.trim();
  if (!rawId) return null;

  const isGtm = /^GTM-[A-Z0-9]+$/i.test(rawId);
  const isGtag = /^(G|AW|DC)-[A-Z0-9]+$/i.test(rawId);
  if (!isGtm && !isGtag) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[GoogleTag] Ignoring NEXT_PUBLIC_GOOGLE_TAG_ID="${rawId}" — expected G-, AW-, DC-, or GTM- prefix.`
      );
    }
    return null;
  }

  const id = rawId;

  if (isGtm) {
    return (
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${id}');`}
      </Script>
    );
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${id}');`}
      </Script>
    </>
  );
}

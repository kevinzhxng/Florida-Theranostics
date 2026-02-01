/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async headers() {
    // Allow Sanity Studio (and localhost iframe) to embed the site for Preview website tab.
    const frameAncestors =
      process.env.NODE_ENV === "development"
        ? "frame-ancestors *"
        : "frame-ancestors 'self' http://localhost:3333 https://*.sanity.studio";
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: frameAncestors,
          },
        ],
      },
    ];
  },
};

export default nextConfig;

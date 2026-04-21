import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Empêche le site d'être intégré dans une iframe (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // Empêche le navigateur de deviner le type MIME
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Contrôle les infos envoyées dans le Referer
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Désactive les fonctionnalités sensibles du navigateur
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          // Force HTTPS pendant 2 ans
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // Empêche XSS via les scripts inline non autorisés
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Retire l'en-tête qui révèle la technologie utilisée
          { key: "X-Powered-By", value: "" },
        ],
      },
      {
        // Headers spécifiques aux routes API — plus stricts
        source: "/api/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "Pragma", value: "no-cache" },
        ],
      },
    ];
  },
};

export default nextConfig;
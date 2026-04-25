import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/playfair-display/700-italic.css";
import "@fontsource/cinzel/400.css";
import "@fontsource/cinzel/600.css";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
export const metadata: Metadata = {
  metadataBase: new URL("https://caribbeanvault.geccostrategy.com"),
  title: {
    default: "CaribbeanVault — Investissez dans les actifs réels caribéens",
    template: "%s | CaribbeanVault",
  },
  description: "Première plateforme RWA caribéenne. Tokenisation de rhum AOC, immobilier tropical, agriculture certifiée et art créole sur XRP Ledger. Dès 100€.",
  keywords: ["RWA", "tokenisation", "Caraïbe", "rhum AOC", "immobilier", "blockchain", "XRPL", "investissement", "Guadeloupe", "Martinique"],
  authors: [{ name: "CaribbeanVault", url: "https://caribbeanvault.geccostrategy.com" }],
  creator: "CaribbeanVault",
  publisher: "GECCO Strategy",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://caribbeanvault.geccostrategy.com",
    siteName: "CaribbeanVault",
    title: "CaribbeanVault — Investissez dans les actifs réels caribéens",
    description: "Première plateforme RWA caribéenne. Rhum AOC, immobilier, agriculture, art créole tokenisés sur XRP Ledger.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CaribbeanVault — Actifs réels caribéens tokenisés",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CaribbeanVault — Investissez dans les actifs réels caribéens",
    description: "Première plateforme RWA caribéenne. Rhum AOC, immobilier, agriculture, art créole tokenisés sur XRP Ledger.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://caribbeanvault.geccostrategy.com",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/kyc/confirmation"],
      },
    ],
    sitemap: "https://caribbeanvault.geccostrategy.com/sitemap.xml",
  };
}
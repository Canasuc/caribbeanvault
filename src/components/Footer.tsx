"use client";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const LIENS = [
    { label: t("mentions"), href: `/${locale}/mentions-legales` },
    { label: t("cgu"), href: `/${locale}/cgu` },
    { label: t("confidentialite"), href: `/${locale}/confidentialite` },
    { label: t("contact"), href: `/${locale}/contact` },
  ];

  return (
    <footer style={{ background: "#111E30", padding: "32px 24px" }}>
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: "16px",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
          <Link href={`/${locale}`} style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "2px" }}>
            <span style={{ color: "#4A5568", fontSize: "12px", fontWeight: 800, letterSpacing: "2px" }}>CARIBBEAN</span>
            <span style={{ color: "#D4884A", fontSize: "12px", fontWeight: 800, letterSpacing: "2px" }}>VAULT</span>
          </Link>
          <span style={{ color: "#374151", fontSize: "11px", marginLeft: "12px" }}>© 2026</span>
        </div>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {LIENS.map(l => (
            <Link key={l.label} href={l.href} style={{ color: "#374151", fontSize: "11px", textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
        </div>

        <p style={{ color: "#374151", fontSize: "10px", margin: 0, maxWidth: "320px", lineHeight: 1.6 }}>
          {t("disclaimer")}
        </p>
      </div>
    </footer>
  );
}
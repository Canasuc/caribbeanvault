"use client";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import { LogoNavy } from "@/components/Logo";
import Image from "next/image";
import NewsboardWidget from "@/components/NewsboardWidget";
import NavbarAuth from "@/components/NavbarAuth";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const NAV_LINKS = [
  { label: "La plateforme", href: "#plateforme" },
  { label: "Nos actifs", href: "#actifs" },
  { label: "Actualites", href: "/actualites" },
  { label: "Simulateur", href: "/simulateur" },
  { label: "Contact", href: "/contact" },
];

const STATS = [
  { val: "35+", label: "Pays & territoires" },
  { val: "100€", label: "Ticket minimum" },
  { val: "8–15%", label: "Rendement historique" },
  { val: "4", label: "Classes d'actifs" },
];

const ASSETS = [
  { icon: "🥃", label: "Rhum AOC", sub: "Guadeloupe & Martinique", desc: "Futs de rhum vieux en vieillissement dans des chais ancestraux. AOC, rare, decorele.", yield: "8–15%/an", min: "Des 500€", href: "/rhum", color: "#0F5240", accent: "#C8992A", photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", tag: "AOC Certifie" },
  { icon: "🏠", label: "Immobilier", sub: "Villas & locaux carribeens", desc: "Villas touristiques, locaux commerciaux avec bail. Revenus locatifs distribues mensuellement.", yield: "6–11%/an", min: "Des 100€", href: "/immobilier", color: "#0891B2", accent: "#0891B2", photo: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80", tag: "Revenus mensuels" },
  { icon: "🌿", label: "Agriculture", sub: "Terroir caribeen certifie", desc: "Banane IGP, cafe Bonifieur, cacao, foret guyanaise FSC. Financement de recoltes reelles.", yield: "10–22%/an", min: "Des 200€", href: "/agriculture", color: "#2C3A1E", accent: "#5A8A3C", photo: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80", tag: "Bio & FSC" },
  { icon: "🎨", label: "Art Creole", sub: "Oeuvres & droits musicaux", desc: "Co-possedez des oeuvres d'artistes carribeens reconnus. Royalties automatiques sur chaque revente.", yield: "Variable", min: "Des 100€", href: "/art", color: "#1A0A2E", accent: "#E8B86D", photo: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80", tag: "Royalties perpetuelles" },
];

const HOW_IT_WORKS = [
  { num: "01", title: "Choisissez un actif", desc: "Parcourez notre selection d'actifs carribeens verifies : rhum, immobilier, agriculture, art." },
  { num: "02", title: "Simulez votre rendement", desc: "Notre simulateur calcule vos projections en temps reel selon 3 scenarios." },
  { num: "03", title: "Investissez en toute securite", desc: "KYC, SPV dediee, actifs assures, blockchain XRPL. Votre capital est protege." },
  { num: "04", title: "Percevez vos revenus", desc: "Distributions automatiques sur votre wallet. Revendez vos tokens a tout moment." },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredAsset, setHoveredAsset] = useState<number | null>(null);
  const { isMobile, isTablet } = useBreakpoint();

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#F8F6F1", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ background: "#F8F6F1", borderBottom: "0.5px solid #E8E2D6", padding: "0 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: isMobile ? "60px" : "72px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <LogoNavy size={isMobile ? 0.7 : 0.85} />
          </Link>
          {!isMobile && (
            <div style={{ display: "flex", gap: isTablet ? "16px" : "28px", alignItems: "center" }}>
              {NAV_LINKS.map(l => (
                <Link key={l.label} href={l.href} style={{ color: "#4A5568", fontSize: "12px", textDecoration: "none" }}>{l.label}</Link>
              ))}
              <NavbarAuth buttonBg="#1A2E4A" buttonColor="white" textColor="#4A5568" borderColor="#E8E2D6" />
            </div>
          )}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <NavbarAuth buttonBg="#1A2E4A" buttonColor="white" textColor="#4A5568" borderColor="#E8E2D6" />
              <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}>
                {[0,1,2].map(i => <div key={i} style={{ width: "22px", height: "2px", background: "#1A2E4A", borderRadius: "2px" }} />)}
              </button>
            </div>
          )}
        </div>
        {isMobile && menuOpen && (
          <div style={{ background: "#F8F6F1", borderTop: "0.5px solid #E8E2D6", padding: "8px 16px" }}>
            {NAV_LINKS.map(l => (
              <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{ display: "block", color: "#4A5568", fontSize: "14px", textDecoration: "none", padding: "12px 0", borderBottom: "0.5px solid #E8E2D6" }}>{l.label}</Link>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ background: "#1A2E4A", padding: isMobile ? "48px 16px 40px" : "80px 24px 60px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", background: "#D4884A", padding: "4px 14px", borderRadius: "2px", marginBottom: "20px" }}>
            <span style={{ color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase" }}>Premiere plateforme RWA caribeenne</span>
          </div>
          <h1 style={{ color: "white", fontSize: isMobile ? "30px" : "clamp(28px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-1px", margin: "0 0 16px", maxWidth: "700px" }}>
            Investissez dans les <span style={{ color: "#D4884A" }}>vrais actifs</span> de la Caraibe
          </h1>
          <p style={{ color: "#B8C4D4", fontSize: isMobile ? "14px" : "15px", lineHeight: 1.8, maxWidth: "540px", margin: "0 0 28px" }}>
            Rhum AOC, immobilier tropical, agriculture certifiee, art creole. Tokenises sur XRP Ledger. Accessibles des 100€, depuis n'importe ou dans le monde.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="#actifs" style={{ background: "#D4884A", color: "white", padding: "12px 22px", borderRadius: "3px", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>Decouvrir les actifs</Link>
            <Link href="/simulateur" style={{ background: "transparent", color: "#B8C4D4", border: "1px solid #3A4E6A", padding: "12px 22px", borderRadius: "3px", fontSize: "14px", textDecoration: "none" }}>Simuler mon rendement →</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#253D5E", borderBottom: "1px solid #1A2E4A" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: isMobile ? "14px 8px" : "22px 16px", borderRight: isMobile ? (i % 2 === 0 ? "0.5px solid #1A2E4A" : "none") : (i < 3 ? "0.5px solid #1A2E4A" : "none"), borderBottom: isMobile && i < 2 ? "0.5px solid #1A2E4A" : "none" }}>
              <div style={{ color: "#D4884A", fontSize: isMobile ? "20px" : "26px", fontWeight: 800 }}>{s.val}</div>
              <div style={{ color: "#6B8AAA", fontSize: "10px", letterSpacing: ".1em", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ACTIFS */}
      <section id="actifs" style={{ padding: isMobile ? "48px 16px" : "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "32px" }}>
            <div style={{ color: "#D4884A", fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px" }}>Nos classes d'actifs</div>
            <h2 style={{ color: "#1A2E4A", fontSize: isMobile ? "24px" : "32px", fontWeight: 800, letterSpacing: "-0.5px", margin: 0 }}>4 verticales, une seule plateforme</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "16px", alignItems: "stretch" }}>
            {ASSETS.map((a, i) => (
              <Link key={i} href={a.href} style={{ textDecoration: "none", display: "flex" }}
                onMouseEnter={() => setHoveredAsset(i)}
                onMouseLeave={() => setHoveredAsset(null)}
              >
                <div style={{ borderRadius: "8px", overflow: "hidden", border: `1.5px solid ${hoveredAsset === i ? a.accent : "#E8E2D6"}`, transition: "all .2s", background: "white", height: "100%", display: "flex", flexDirection: "column", width: "100%" }}>
                  <div style={{ position: "relative", height: isMobile ? "160px" : "200px", overflow: "hidden" }}>
                    <Image src={a.photo} alt={a.label} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${a.color}EE 0%, ${a.color}44 50%, transparent 100%)` }} />
                    <div style={{ position: "absolute", top: "14px", left: "14px", background: a.accent, color: a.color === "#1A0A2E" ? "#120820" : "white", fontSize: "9px", fontWeight: 700, padding: "3px 10px", borderRadius: "2px", letterSpacing: ".08em", textTransform: "uppercase" }}>{a.tag}</div>
                    <div style={{ position: "absolute", bottom: "14px", left: "16px", right: "16px" }}>
                      <div style={{ color: a.accent, fontSize: "11px", fontWeight: 600, textTransform: "uppercase", marginBottom: "4px" }}>{a.icon} {a.sub}</div>
                      <div style={{ color: "white", fontSize: "20px", fontWeight: 800 }}>{a.label}</div>
                    </div>
                  </div>
                  <div style={{ padding: "16px 18px 18px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <p style={{ color: "#4A5568", fontSize: "13px", lineHeight: 1.7, margin: "0 0 14px" }}>{a.desc}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: "16px" }}>
                        <div><div style={{ color: "#9CA3AF", fontSize: "9px", textTransform: "uppercase" }}>Rendement</div><div style={{ color: "#1A2E4A", fontSize: "14px", fontWeight: 700 }}>{a.yield}</div></div>
                        <div><div style={{ color: "#9CA3AF", fontSize: "9px", textTransform: "uppercase" }}>Acces</div><div style={{ color: "#1A2E4A", fontSize: "14px", fontWeight: 700 }}>{a.min}</div></div>
                      </div>
                      <div style={{ color: a.accent === "#C8992A" ? "#0F5240" : a.accent, fontSize: "12px", fontWeight: 600 }}>Explorer →</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT CA MARCHE */}
      <section id="plateforme" style={{ background: "#1A2E4A", padding: isMobile ? "48px 16px" : "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "32px", textAlign: "center" }}>
            <div style={{ color: "#D4884A", fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px" }}>Comment ca marche</div>
            <h2 style={{ color: "white", fontSize: isMobile ? "22px" : "32px", fontWeight: 800, margin: 0 }}>Simple, securise, transparent</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: "12px" }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} style={{ background: "#253D5E", borderRadius: "6px", padding: isMobile ? "16px 14px" : "24px 20px" }}>
                <div style={{ color: "#D4884A", fontSize: "22px", fontWeight: 800, fontFamily: "Georgia, serif", marginBottom: "8px", opacity: .9 }}>{step.num}</div>
                <div style={{ color: "white", fontSize: isMobile ? "12px" : "13px", fontWeight: 700, marginBottom: "6px" }}>{step.title}</div>
                <div style={{ color: "#6B8AAA", fontSize: isMobile ? "11px" : "12px", lineHeight: 1.6 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section style={{ padding: isMobile ? "48px 16px" : "80px 24px", background: "#F0EBE1" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "28px" : "64px", alignItems: "center" }}>
          <div>
            <div style={{ color: "#D4884A", fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px" }}>Notre vision</div>
            <h2 style={{ color: "#1A2E4A", fontSize: isMobile ? "20px" : "28px", fontWeight: 800, lineHeight: 1.2, margin: "0 0 14px" }}>La Caraibe merite une finance a sa hauteur</h2>
            <p style={{ color: "#4A5568", fontSize: "14px", lineHeight: 1.8, margin: "0 0 20px" }}>
              35 pays, 40 millions d'habitants, des actifs uniques au monde. CaribbeanVault connecte les producteurs carribeens a une communaute mondiale d'investisseurs.
            </p>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {[["2026", "Lancement DOM"], ["2028", "Caraibe anglophone"], ["2030", "Expansion"]].map(([yr, lbl]) => (
                <div key={yr}><div style={{ color: "#D4884A", fontSize: "16px", fontWeight: 800 }}>{yr}</div><div style={{ color: "#6B7280", fontSize: "10px", marginTop: "2px" }}>{lbl}</div></div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[{ val: "35+", label: "Pays couverts", icon: "🌍" }, { val: "4", label: "Classes d'actifs", icon: "📊" }, { val: "100€", label: "Ticket minimum", icon: "💶" }, { val: "0", label: "Frais caches", icon: "✓" }].map((s, i) => (
              <div key={i} style={{ background: "white", borderRadius: "8px", padding: isMobile ? "14px 10px" : "20px", border: "0.5px solid #E8E2D6", textAlign: "center" }}>
                <div style={{ fontSize: "20px", marginBottom: "6px" }}>{s.icon}</div>
                <div style={{ color: "#1A2E4A", fontSize: isMobile ? "18px" : "22px", fontWeight: 800 }}>{s.val}</div>
                <div style={{ color: "#9CA3AF", fontSize: "10px", marginTop: "3px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FAMILLE */}
      <section id="contact" style={{ background: "#1A2E4A", padding: isMobile ? "48px 16px" : "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ color: "#D4884A", fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px" }}>Rejoignez-nous</div>
          <h2 style={{ color: "white", fontSize: isMobile ? "22px" : "32px", fontWeight: 800, lineHeight: 1.2, margin: "0 0 14px" }}>Rejoignez la famille CaribbeanVault</h2>
          <p style={{ color: "#B8C4D4", fontSize: "14px", lineHeight: 1.8, margin: "0 0 24px" }}>
            {"Accedez en avant-premiere aux actifs disponibles et a la communaute des investisseurs carribeens. Des 100€, depuis n'importe ou dans le monde."}
          </p>
          <Link href="/kyc" style={{ display: "block", background: "#D4884A", color: "white", padding: "13px 24px", borderRadius: "3px", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
            Rejoindre la famille →
          </Link>
          <p style={{ color: "#B8C4D4", fontSize: "11px", marginTop: "12px" }}>{"Gratuit · Aucun engagement"}</p>
        </div>
      </section>

      {/* NEWSBOARD */}
      <section style={{ padding: isMobile ? "36px 16px" : "56px 24px", background: "#F8F6F1", borderTop: "0.5px solid #E8E2D6" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <div style={{ color: "#D4884A", fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "4px" }}>Actualites</div>
              <h2 style={{ color: "#1A2E4A", fontSize: isMobile ? "18px" : "22px", fontWeight: 800, margin: 0 }}>Les dernieres nouvelles</h2>
            </div>
            <Link href="/actualites" style={{ color: "#1A2E4A", fontSize: "12px", fontWeight: 600, textDecoration: "none", border: "0.5px solid #E8E2D6", padding: "8px 16px", borderRadius: "8px", background: "white" }}>
              Toutes les actualites →
            </Link>
          </div>
          <NewsboardWidget />
        </div>
      </section>

      <Footer />
    </main>
  );
}
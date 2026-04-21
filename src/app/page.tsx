"use client";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import { LogoNavy } from "@/components/Logo";
import Image from "next/image"

const NAV_LINKS = [
  { label: "La plateforme", href: "#plateforme" },
  { label: "Nos actifs", href: "#actifs" },
  { label: "Simulateur", href: "/simulateur" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { val: "35+", label: "Pays & territoires" },
  { val: "100€", label: "Ticket minimum" },
  { val: "8–15%", label: "Rendement historique" },
  { val: "4", label: "Classes d'actifs" },
];

const ASSETS = [
  {
    icon: "🥃",
    label: "Rhum AOC",
    sub: "Guadeloupe & Martinique",
    desc: "Fûts de rhum vieux en vieillissement dans des chais ancestraux. AOC, rare, décorrélé.",
    yield: "8–15%/an",
    min: "Dès 500€",
    href: "/rhum",
    color: "#0F5240",
    accent: "#C8992A",
    photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    tag: "AOC Certifié",
  },
  {
    icon: "🏠",
    label: "Immobilier",
    sub: "Villas & locaux caribéens",
    desc: "Villas touristiques, locaux commerciaux avec bail. Revenus locatifs distribués mensuellement.",
    yield: "6–11%/an",
    min: "Dès 100€",
    href: "/immobilier",
    color: "#0891B2",
    accent: "#0891B2",
    photo: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80",
    tag: "Revenus mensuels",
  },
  {
    icon: "🌿",
    label: "Agriculture",
    sub: "Terroir caribéen certifié",
    desc: "Banane IGP, café Bonifieur, cacao, forêt guyanaise FSC. Financement de récoltes réelles.",
    yield: "10–22%/an",
    min: "Dès 200€",
    href: "/agriculture",
    color: "#2C3A1E",
    accent: "#5A8A3C",
    photo: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80",
    tag: "Bio & FSC",
  },
  {
    icon: "🎨",
    label: "Art Créole",
    sub: "Œuvres & droits musicaux",
    desc: "Co-possédez des œuvres d'artistes caribéens reconnus. Royalties automatiques sur chaque revente.",
    yield: "Variable",
    min: "Dès 100€",
    href: "/art",
    color: "#1A0A2E",
    accent: "#E8B86D",
    photo: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80",
    tag: "Royalties perpétuelles",
  },
];

const HOW_IT_WORKS = [
  { num: "01", title: "Choisissez un actif", desc: "Parcourez notre sélection d'actifs caribéens vérifiés : rhum, immobilier, agriculture, art." },
  { num: "02", title: "Simulez votre rendement", desc: "Notre simulateur calcule vos projections en temps réel selon 3 scénarios." },
  { num: "03", title: "Investissez en toute sécurité", desc: "KYC, SPV dédiée, actifs assurés, blockchain XRPL. Votre capital est protégé." },
  { num: "04", title: "Percevez vos revenus", desc: "Distributions automatiques sur votre wallet. Revendez vos tokens à tout moment." },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredAsset, setHoveredAsset] = useState<number | null>(null);

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#F8F6F1", minHeight: "100vh" }}>

      {/* ── NAVBAR ── */}
      <nav style={{ background: "#F8F6F1", borderBottom: "0.5px solid #E8E2D6", padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
<LogoNavy size={0.85} />
          </Link>
          <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <Link key={l.label} href={l.href} style={{ color: "#4A5568", fontSize: "12px", textDecoration: "none", letterSpacing: ".02em" }}>
                {l.label}
              </Link>
            ))}
            <Link href="#contact" style={{
              background: "#1A2E4A", color: "white", padding: "8px 18px",
              borderRadius: "3px", fontSize: "12px", fontWeight: 600,
              textDecoration: "none", letterSpacing: ".05em",
            }}>
              Rejoindre la famille →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: "#1A2E4A", padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#D4884A", padding: "4px 14px", borderRadius: "2px", marginBottom: "24px" }}>
            <span style={{ color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase" }}>
              Première plateforme RWA caribéenne
            </span>
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1px", margin: "0 0 20px", maxWidth: "700px" }}>
            Investissez dans les<br />
            <span style={{ color: "#D4884A" }}>vrais actifs</span> de la Caraïbe
          </h1>
          <p style={{ color: "#B8C4D4", fontSize: "15px", lineHeight: 1.8, maxWidth: "540px", margin: "0 0 36px" }}>
            Rhum AOC, immobilier tropical, agriculture certifiée, art créole.
            Tokenisés sur XRP Ledger. Accessibles dès 100€, depuis n'importe où dans le monde.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="#actifs" style={{
              background: "#D4884A", color: "white", padding: "13px 28px",
              borderRadius: "3px", fontSize: "14px", fontWeight: 700,
              textDecoration: "none", letterSpacing: ".05em",
            }}>
              Découvrir les actifs
            </Link>
            <Link href="/simulateur" style={{
              background: "transparent", color: "#B8C4D4",
              border: "1px solid #3A4E6A", padding: "13px 28px",
              borderRadius: "3px", fontSize: "14px", fontWeight: 500,
              textDecoration: "none",
            }}>
              Simuler mon rendement →
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: "#253D5E", borderBottom: "1px solid #1A2E4A" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              textAlign: "center", padding: "22px 16px",
              borderRight: i < 3 ? "0.5px solid #1A2E4A" : "none",
            }}>
              <div style={{ color: "#D4884A", fontSize: "26px", fontWeight: 800, letterSpacing: "-0.5px" }}>{s.val}</div>
              <div style={{ color: "#6B8AAA", fontSize: "10px", letterSpacing: ".1em", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ACTIFS ── */}
      <section id="actifs" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "48px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ color: "#D4884A", fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px" }}>
                Nos classes d'actifs
              </div>
              <h2 style={{ color: "#1A2E4A", fontSize: "32px", fontWeight: 800, letterSpacing: "-0.5px", margin: 0 }}>
                4 verticales, une seule plateforme
              </h2>
            </div>
            <p style={{ color: "#6B7280", fontSize: "13px", lineHeight: 1.7, maxWidth: "380px", margin: 0 }}>
              Chaque actif est structuré dans une SPV dédiée, assuré, audité annuellement et tokenisé sur XRP Ledger.
            </p>
          </div>

          {/* Grille des actifs avec photos */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            {ASSETS.map((a, i) => (
              <Link key={i} href={a.href} style={{ textDecoration: "none" }}
                onMouseEnter={() => setHoveredAsset(i)}
                onMouseLeave={() => setHoveredAsset(null)}
              >
                <div style={{
                  borderRadius: "8px", overflow: "hidden",
                  border: `1.5px solid ${hoveredAsset === i ? a.accent : "#E8E2D6"}`,
                  transition: "all .2s",
                  transform: hoveredAsset === i ? "translateY(-3px)" : "none",
                  background: "white",
                  boxShadow: hoveredAsset === i ? "0 8px 24px rgba(0,0,0,.08)" : "none",
                }}>
                  {/* Photo */}
                  <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                   <Image src={a.photo} alt={a.label} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover", transition: "transform .4s", transform: hoveredAsset === i ? "scale(1.04)" : "scale(1)" }}/>
                    {/* Overlay dégradé */}
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${a.color}EE 0%, ${a.color}44 50%, transparent 100%)` }} />
                    {/* Tag */}
                    <div style={{ position: "absolute", top: "14px", left: "14px", background: a.accent, color: a.color === "#1A0A2E" ? "#120820" : "white", fontSize: "9px", fontWeight: 700, padding: "3px 10px", borderRadius: "2px", letterSpacing: ".08em", textTransform: "uppercase" }}>
                      {a.tag}
                    </div>
                    {/* Titre sur photo */}
                    <div style={{ position: "absolute", bottom: "14px", left: "16px", right: "16px" }}>
                      <div style={{ color: a.accent, fontSize: "11px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "4px" }}>
                        {a.icon} {a.sub}
                      </div>
                      <div style={{ color: "white", fontSize: "20px", fontWeight: 800, letterSpacing: "-0.3px" }}>
                        {a.label}
                      </div>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div style={{ padding: "18px 20px 20px" }}>
                    <p style={{ color: "#4A5568", fontSize: "13px", lineHeight: 1.7, margin: "0 0 16px" }}>
                      {a.desc}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: "16px" }}>
                        <div>
                          <div style={{ color: "#9CA3AF", fontSize: "9px", textTransform: "uppercase", letterSpacing: ".1em" }}>Rendement</div>
                          <div style={{ color: "#1A2E4A", fontSize: "14px", fontWeight: 700 }}>{a.yield}</div>
                        </div>
                        <div>
                          <div style={{ color: "#9CA3AF", fontSize: "9px", textTransform: "uppercase", letterSpacing: ".1em" }}>Accès</div>
                          <div style={{ color: "#1A2E4A", fontSize: "14px", fontWeight: 700 }}>{a.min}</div>
                        </div>
                      </div>
                      <div style={{
                        color: a.accent === "#C8992A" ? "#0F5240" : a.accent,
                        fontSize: "12px", fontWeight: 600,
                        display: "flex", alignItems: "center", gap: "4px",
                      }}>
                        Explorer →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section id="plateforme" style={{ background: "#1A2E4A", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "48px", textAlign: "center" }}>
            <div style={{ color: "#D4884A", fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px" }}>
              Comment ça marche
            </div>
            <h2 style={{ color: "white", fontSize: "32px", fontWeight: 800, letterSpacing: "-0.5px", margin: 0 }}>
              Simple, sécurisé, transparent
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} style={{ background: "#253D5E", borderRadius: "6px", padding: "24px 20px" }}>
                <div style={{ color: "#D4884A", fontSize: "28px", fontWeight: 800, fontFamily: "Georgia, serif", marginBottom: "12px", opacity: .9 }}>
                  {step.num}
                </div>
                <div style={{ color: "white", fontSize: "13px", fontWeight: 700, marginBottom: "8px", letterSpacing: ".02em" }}>
                  {step.title}
                </div>
                <div style={{ color: "#6B8AAA", fontSize: "12px", lineHeight: 1.7 }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section style={{ padding: "80px 24px", background: "#F0EBE1" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          <div>
            <div style={{ color: "#D4884A", fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px" }}>
              Notre vision
            </div>
            <h2 style={{ color: "#1A2E4A", fontSize: "28px", fontWeight: 800, letterSpacing: "-0.4px", lineHeight: 1.2, margin: "0 0 20px" }}>
              La Caraïbe mérite<br />une finance à sa hauteur
            </h2>
            <p style={{ color: "#4A5568", fontSize: "14px", lineHeight: 1.8, margin: "0 0 16px" }}>
              35 pays, 40 millions d'habitants, des actifs uniques au monde — et pourtant aucune plateforme d'investissement dédiée. CaribbeanVault comble ce vide en connectant les producteurs caribéens à une communauté mondiale d'investisseurs.
            </p>
            <p style={{ color: "#4A5568", fontSize: "14px", lineHeight: 1.8, margin: "0 0 28px" }}>
              Notre ambition : tokeniser 150 millions d'euros d'actifs caribéens d'ici 2034, dans 30+ pays, au bénéfice des distilleries, des agriculteurs, des artistes et des propriétaires de la région.
            </p>
            <div style={{ display: "flex", gap: "24px" }}>
              {[["2026", "Lancement DOM français"], ["2028", "Caraïbe anglophone"], ["2030", "Expansion régionale"]].map(([yr, lbl]) => (
                <div key={yr}>
                  <div style={{ color: "#D4884A", fontSize: "16px", fontWeight: 800 }}>{yr}</div>
                  <div style={{ color: "#6B7280", fontSize: "10px", letterSpacing: ".05em", marginTop: "2px" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { val: "35+", label: "Pays couverts", icon: "🌍" },
              { val: "4", label: "Classes d'actifs", icon: "📊" },
              { val: "100€", label: "Ticket minimum", icon: "💶" },
              { val: "0", label: "Frais cachés", icon: "✓" },
            ].map((s, i) => (
              <div key={i} style={{ background: "white", borderRadius: "8px", padding: "20px", border: "0.5px solid #E8E2D6", textAlign: "center" }}>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>{s.icon}</div>
                <div style={{ color: "#1A2E4A", fontSize: "22px", fontWeight: 800, letterSpacing: "-0.3px" }}>{s.val}</div>
                <div style={{ color: "#9CA3AF", fontSize: "10px", letterSpacing: ".05em", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FAMILLE ── */}
      <section id="contact" style={{ background: "#1A2E4A", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ color: "#D4884A", fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "16px" }}>
            Rejoignez-nous
          </div>
          <h2 style={{ color: "white", fontSize: "32px", fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1.2, margin: "0 0 16px" }}>
            Rejoignez la famille CaribbeanVault
          </h2>
          <p style={{ color: "#B8C4D4", fontSize: "14px", lineHeight: 1.8, margin: "0 0 36px" }}>
            Accédez en avant-première aux actifs disponibles, aux événements exclusifs et à la communauté des investisseurs caribéens. Dès 100€, depuis n'importe où dans le monde.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "24px" }}>
            <input
              type="email"
              placeholder="Votre adresse email"
              style={{
                padding: "12px 18px", borderRadius: "3px", border: "1px solid #3A4E6A",
                background: "#253D5E", color: "white", fontSize: "13px",
                width: "260px", outline: "none",
              }}
            />
            <button style={{
              background: "#D4884A", color: "white", border: "none",
              padding: "12px 24px", borderRadius: "3px", fontSize: "13px",
              fontWeight: 700, cursor: "pointer", letterSpacing: ".05em",
            }}>
              Rejoindre la famille →
            </button>
          </div>
          <p style={{ color: "#4A5568", fontSize: "11px" }}>
            Gratuit · Aucun engagement · Désabonnement en 1 clic
          </p>
        </div>
      </section>

<Footer />

    </main>
  );
}
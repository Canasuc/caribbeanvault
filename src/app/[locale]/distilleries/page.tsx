"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { DISTILLERIES } from "@/lib/distilleries";
import Footer from "@/components/Footer";
import { LogoEmeraude } from "@/components/Logo";
import NavbarAuth from "@/components/NavbarAuth";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const C = {
  noir:    "#0D2018",
  foret:   "#0F3D2A",
  emeraude:"#0F5240",
  vert:    "#1A6B5A",
  or:      "#C8992A",
  orClair: "#D4B96A",
  orPale:  "#F0E6C8",
  creme:   "#F7F5F0",
  texte:   "#2C1810",
  gris:    "#6B7280",
  menthe:  "#9FE1CB",
};

export default function DistilleriesPage() {
  const [filtre, setFiltre] = useState<"toutes" | "Guadeloupe" | "Martinique">("toutes");
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  const filtrees = DISTILLERIES.filter(d =>
    filtre === "toutes" ? true : d.ile === filtre
  );

  const colsGrille = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.creme, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ background: C.noir, borderBottom: `0.5px solid ${C.foret}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <LogoEmeraude size={isMobile ? 0.6 : 0.7} />
          </Link>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {!isMobile && (
              <Link href="/rhum" style={{ color: C.menthe, fontSize: "11px", textDecoration: "none", opacity: .8 }}>
                {"← Retour Rhum AOC"}
              </Link>
            )}
            <NavbarAuth
              buttonBg="#C8992A"
              buttonColor="#0D2018"
              textColor="#9FE1CB"
              borderColor="rgba(200,153,42,.3)"
            />
            {isMobile && (
              <Link href="/rhum" style={{ color: C.menthe, fontSize: "11px", textDecoration: "none", opacity: .8 }}>
                {"← Rhum"}
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: C.noir, padding: isMobile ? "36px 16px 28px" : "56px 24px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 70% 50%, ${C.or}15 0%, transparent 60%)` }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            <span style={{ background: C.or, color: C.noir, fontSize: "9px", fontWeight: 700, padding: "3px 12px", borderRadius: "1px", letterSpacing: ".2em", textTransform: "uppercase" }}>AOC Certifie</span>
            <span style={{ border: `0.5px solid ${C.vert}`, color: C.menthe, fontSize: "9px", padding: "3px 12px", borderRadius: "1px", letterSpacing: ".15em", textTransform: "uppercase" }}>13 distilleries partenaires</span>
          </div>
          <h1 style={{ color: C.orPale, fontSize: isMobile ? "26px" : "clamp(24px, 4vw, 42px)", fontWeight: 300, lineHeight: 1.2, margin: "0 0 10px", fontFamily: "Georgia, serif" }}>
            Nos distilleries partenaires
          </h1>
          <p style={{ color: C.menthe, fontSize: "13px", lineHeight: 1.8, maxWidth: "560px", margin: "0 0 20px", opacity: .9 }}>
            CaribbeanVault selectionne exclusivement des distilleries AOC de Guadeloupe et Martinique, choisies pour l'excellence de leur terroir et la qualite de leurs futs.
          </p>
          {/* Stats */}
          <div style={{ display: "flex", gap: isMobile ? "20px" : "32px", flexWrap: "wrap" }}>
            {[
              { val: "6", label: "Guadeloupe" },
              { val: "7", label: "Martinique" },
              { val: "1660", label: "Plus ancienne" },
              { val: "AOC", label: "Toutes certifiees" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ color: C.or, fontSize: isMobile ? "16px" : "20px", fontWeight: 700 }}>{s.val}</div>
                <div style={{ color: C.menthe, fontSize: "9px", letterSpacing: ".08em", textTransform: "uppercase", opacity: .7, marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTRES + GRILLE */}
      <section style={{ padding: isMobile ? "28px 16px" : "48px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Filtres */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ color: C.texte, fontSize: "14px", fontWeight: 600 }}>
              {filtrees.length} distillerie{filtrees.length > 1 ? "s" : ""}
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {[
                { key: "toutes", label: isMobile ? "Toutes" : "Toutes (13)" },
                { key: "Guadeloupe", label: isMobile ? "Guadeloupe" : "Guadeloupe (6)" },
                { key: "Martinique", label: isMobile ? "Martinique" : "Martinique (7)" },
              ].map(f => (
                <button key={f.key} onClick={() => setFiltre(f.key as typeof filtre)} style={{
                  padding: isMobile ? "6px 12px" : "7px 18px",
                  borderRadius: "2px", cursor: "pointer",
                  fontSize: "11px", fontWeight: 600,
                  border: filtre === f.key ? `1.5px solid ${C.or}` : `1px solid #D1C5B0`,
                  background: filtre === f.key ? C.foret : "white",
                  color: filtre === f.key ? C.or : C.gris,
                  transition: "all .15s",
                }}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grille */}
          <div style={{ display: "grid", gridTemplateColumns: colsGrille, gap: "14px" }}>
            {filtrees.map(d => (
              <Link key={d.slug} href={`/distilleries/${d.slug}`} style={{ textDecoration: "none" }}
                onMouseEnter={() => setHovered(d.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{
                  background: "white", borderRadius: "6px", overflow: "hidden",
                  border: hovered === d.slug ? `1.5px solid ${C.or}` : "1px solid #E8E2D6",
                  transition: "all .2s",
                  transform: hovered === d.slug ? "translateY(-3px)" : "none",
                  boxShadow: hovered === d.slug ? "0 8px 24px rgba(0,0,0,.08)" : "none",
                }}>

                  {/* Header coloré */}
                  <div style={{ position: "relative", height: isMobile ? "130px" : "160px", background: d.couleur, overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 50%, rgba(255,255,255,.08) 0%, transparent 60%)` }} />
                    {[120, 80, 50].map((size, i) => (
                      <div key={i} style={{
                        position: "absolute", right: `-${size / 4}px`, bottom: `-${size / 4}px`,
                        width: `${size}px`, height: `${size}px`,
                        borderRadius: "50%", border: `1px solid ${C.or}${["20", "30", "40"][i]}`,
                      }} />
                    ))}
                    <div style={{ position: "absolute", bottom: "12px", left: "14px", right: "14px" }}>
                      <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "4px" }}>
                        {d.ile} · {d.region}
                      </div>
                      <div style={{ color: "white", fontSize: isMobile ? "16px" : "18px", fontWeight: 700 }}>{d.nom}</div>
                    </div>
                    <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                      {d.futsDisponibles > 0 ? (
                        <span style={{ background: C.or, color: C.noir, fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "2px" }}>
                          {d.futsDisponibles} fut{d.futsDisponibles > 1 ? "s" : ""} dispo.
                        </span>
                      ) : (
                        <span style={{ background: "rgba(255,255,255,.15)", color: "rgba(255,255,255,.7)", fontSize: "9px", padding: "2px 8px", borderRadius: "2px" }}>
                          {"Liste d'attente"}
                        </span>
                      )}
                    </div>
                    <div style={{ position: "absolute", top: "10px", left: "10px" }}>
                      <span style={{ background: "rgba(0,0,0,.4)", color: C.orClair, fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "2px" }}>
                        Fondee en {d.fondee}
                      </span>
                    </div>
                  </div>

                  {/* Corps */}
                  <div style={{ padding: "12px 14px" }}>
                    <div style={{ color: C.gris, fontSize: "11px", lineHeight: 1.6, marginBottom: "10px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {d.description}
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "10px" }}>
                      {d.specialites.slice(0, isMobile ? 1 : 2).map((s, i) => (
                        <span key={i} style={{ background: "#F0EBE1", color: C.texte, fontSize: "9px", padding: "2px 8px", borderRadius: "2px", fontWeight: 500 }}>
                          {s.split("—")[0].trim()}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "0.5px solid #F0EBE1", paddingTop: "8px" }}>
                      <div style={{ color: C.gris, fontSize: "10px" }}>{d.statut}</div>
                      <div style={{ color: C.or, fontSize: "11px", fontWeight: 700 }}>{"Decouvrir →"}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
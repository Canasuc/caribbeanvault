"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { DISTILLERIES } from "@/lib/distilleries";
import Footer from "@/components/Footer";
import { LogoEmeraude } from "@/components/Logo";
import NavbarAuth from "@/components/NavbarAuth";

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

  const filtrees = DISTILLERIES.filter(d =>
    filtre === "toutes" ? true : d.ile === filtre
  );

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.creme, minHeight: "100vh" }}>

      {/* ── NAVBAR ── */}
      <nav style={{ background: C.noir, borderBottom: `0.5px solid ${C.foret}`, padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
<Link href="/" style={{ textDecoration: "none" }}>
  <LogoEmeraude size={0.7} />
</Link>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Link href="/rhum" style={{ color: C.menthe, fontSize: "11px", textDecoration: "none", opacity: .8 }}>← Retour Rhum AOC</Link>
            <Link href="/rhum#selection" style={{ background: C.or, color: C.noir, padding: "7px 16px", borderRadius: "2px", fontSize: "11px", fontWeight: 700, textDecoration: "none" }}>
              Voir les fûts →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: C.noir, padding: "56px 24px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 70% 50%, ${C.or}15 0%, transparent 60%)` }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-flex", gap: "8px", marginBottom: "16px" }}>
            <span style={{ background: C.or, color: C.noir, fontSize: "9px", fontWeight: 700, padding: "3px 12px", borderRadius: "1px", letterSpacing: ".2em", textTransform: "uppercase" }}>AOC Certifié</span>
            <span style={{ border: `0.5px solid ${C.vert}`, color: C.menthe, fontSize: "9px", padding: "3px 12px", borderRadius: "1px", letterSpacing: ".15em", textTransform: "uppercase" }}>13 distilleries partenaires</span>
          </div>
          <h1 style={{ color: C.orPale, fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 300, lineHeight: 1.2, margin: "0 0 12px", fontFamily: "Georgia, serif" }}>
            Nos distilleries partenaires
          </h1>
          <p style={{ color: C.menthe, fontSize: "14px", lineHeight: 1.8, maxWidth: "560px", margin: "0 0 28px", opacity: .9 }}>
            CaribbeanVault sélectionne exclusivement des distilleries AOC de Guadeloupe et Martinique, choisies pour l'excellence de leur terroir, leur savoir-faire et la qualité de leurs fûts de vieillissement.
          </p>
          {/* Stats */}
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {[
              { val: "6", label: "Distilleries Guadeloupe" },
              { val: "7", label: "Distilleries Martinique" },
              { val: "1660", label: "Plus ancienne fondation" },
              { val: "AOC", label: "Toutes certifiées" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ color: C.or, fontSize: "20px", fontWeight: 700 }}>{s.val}</div>
                <div style={{ color: C.menthe, fontSize: "10px", letterSpacing: ".08em", textTransform: "uppercase", opacity: .7, marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTRES + GRILLE ── */}
      <section style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Filtres */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ color: C.texte, fontSize: "15px", fontWeight: 600 }}>
              {filtrees.length} distillerie{filtrees.length > 1 ? "s" : ""}
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { key: "toutes", label: "Toutes (13)" },
                { key: "Guadeloupe", label: "Guadeloupe (6)" },
                { key: "Martinique", label: "Martinique (7)" },
              ].map(f => (
                <button key={f.key} onClick={() => setFiltre(f.key as typeof filtre)} style={{
                  padding: "7px 18px", borderRadius: "2px", cursor: "pointer",
                  fontSize: "11px", fontWeight: 600, letterSpacing: ".05em",
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
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

                  {/* Photo / Placeholder coloré */}
                  <div style={{ position: "relative", height: "160px", background: d.couleur, overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 50%, rgba(255,255,255,.08) 0%, transparent 60%)` }} />
                    {/* Cercles décoratifs */}
                    {[120, 80, 50].map((size, i) => (
                      <div key={i} style={{
                        position: "absolute", right: `-${size / 4}px`, bottom: `-${size / 4}px`,
                        width: `${size}px`, height: `${size}px`,
                        borderRadius: "50%", border: `1px solid ${C.or}${["20", "30", "40"][i]}`,
                      }} />
                    ))}
                    {/* Contenu sur photo */}
                    <div style={{ position: "absolute", bottom: "12px", left: "14px", right: "14px" }}>
                      <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "4px" }}>
                        {d.ile} · {d.region}
                      </div>
                      <div style={{ color: "white", fontSize: "18px", fontWeight: 700 }}>{d.nom}</div>
                    </div>
                    {/* Badge fûts dispo */}
                    <div style={{ position: "absolute", top: "12px", right: "12px" }}>
                      {d.futsDisponibles > 0 ? (
                        <span style={{ background: C.or, color: C.noir, fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "2px", letterSpacing: ".05em" }}>
                          {d.futsDisponibles} fût{d.futsDisponibles > 1 ? "s" : ""} dispo.
                        </span>
                      ) : (
                        <span style={{ background: "rgba(255,255,255,.15)", color: "rgba(255,255,255,.7)", fontSize: "9px", padding: "2px 8px", borderRadius: "2px" }}>
                          Liste d'attente
                        </span>
                      )}
                    </div>
                    {/* Année fondation */}
                    <div style={{ position: "absolute", top: "12px", left: "12px" }}>
                      <span style={{ background: "rgba(0,0,0,.4)", color: C.orClair, fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "2px" }}>
                        Fondée en {d.fondee}
                      </span>
                    </div>
                  </div>

                  {/* Corps */}
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ color: C.gris, fontSize: "11px", lineHeight: 1.6, marginBottom: "12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {d.description}
                    </div>
                    {/* Spécialités */}
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
                      {d.specialites.slice(0, 2).map((s, i) => (
                        <span key={i} style={{ background: "#F0EBE1", color: C.texte, fontSize: "9px", padding: "2px 8px", borderRadius: "2px", fontWeight: 500 }}>
                          {s.split("—")[0].trim()}
                        </span>
                      ))}
                    </div>
                    {/* Footer carte */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "0.5px solid #F0EBE1", paddingTop: "10px" }}>
                      <div style={{ color: C.gris, fontSize: "10px" }}>{d.statut}</div>
                      <div style={{ color: C.or, fontSize: "11px", fontWeight: 700 }}>
                        Découvrir →
                      </div>
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
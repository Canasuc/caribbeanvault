"use client";
import Link from "next/link";
import { use } from "react";
import { DISTILLERIES, getDistillerie } from "@/lib/distilleries";
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

export default function DistilleriePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const d = getDistillerie(slug);
  const { isMobile, isTablet } = useBreakpoint();

  if (!d) {
    return (
      <main style={{ fontFamily: "system-ui", background: "#F7F5F0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "24px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🥃</div>
          <h1 style={{ color: "#2C1810", fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Distillerie introuvable</h1>
          <p style={{ color: "#6B7280", fontSize: "14px", marginBottom: "20px" }}>Cette distillerie n'existe pas dans notre selection.</p>
          <Link href="/distilleries" style={{ background: "#0F3D2A", color: "#C8992A", padding: "12px 24px", borderRadius: "3px", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
            Voir toutes les distilleries
          </Link>
        </div>
      </main>
    );
  }

  const memeIle = DISTILLERIES.filter(x => x.ile === d.ile && x.slug !== d.slug).slice(0, 3);

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.creme, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ background: C.noir, borderBottom: `0.5px solid ${C.foret}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <LogoEmeraude size={isMobile ? 0.6 : 0.7} />
          </Link>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Link href="/distilleries" style={{ color: C.menthe, fontSize: "11px", textDecoration: "none", opacity: .8 }}>
              {isMobile ? "← Liste" : "← Toutes les distilleries"}
            </Link>
            <NavbarAuth buttonBg="#C8992A" buttonColor="#0D2018" textColor="#9FE1CB" borderColor="rgba(200,153,42,.3)" />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: d.couleur, padding: isMobile ? "36px 16px 28px" : "64px 24px 48px", position: "relative", overflow: "hidden" }}>
        {!isMobile && [300, 200, 120].map((size, i) => (
          <div key={i} style={{ position: "absolute", right: `-${size / 3}px`, top: "50%", transform: "translateY(-50%)", width: `${size}px`, height: `${size}px`, borderRadius: "50%", border: `1px solid ${C.or}${["15", "20", "30"][i]}` }} />
        ))}
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          {/* Breadcrumb */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Link href="/rhum" style={{ color: C.menthe, fontSize: "11px", textDecoration: "none", opacity: .7 }}>Rhum AOC</Link>
              <span style={{ color: C.menthe, opacity: .4 }}>›</span>
              <Link href="/distilleries" style={{ color: C.menthe, fontSize: "11px", textDecoration: "none", opacity: .7 }}>Distilleries</Link>
              <span style={{ color: C.menthe, opacity: .4 }}>›</span>
              <span style={{ color: C.or, fontSize: "11px" }}>{d.nom}</span>
            </div>
          )}
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            <span style={{ background: C.or, color: C.noir, fontSize: "9px", fontWeight: 700, padding: "3px 12px", borderRadius: "1px", letterSpacing: ".2em", textTransform: "uppercase" }}>AOC Certifie</span>
            <span style={{ border: `0.5px solid ${C.menthe}`, color: C.menthe, fontSize: "9px", padding: "3px 12px", borderRadius: "1px", textTransform: "uppercase" }}>
              {d.ile} · Fondee en {d.fondee}
            </span>
            {d.futsDisponibles > 0 && (
              <span style={{ background: "rgba(200,153,42,.2)", color: C.or, fontSize: "9px", fontWeight: 700, padding: "3px 12px", borderRadius: "1px" }}>
                {d.futsDisponibles} fut{d.futsDisponibles > 1 ? "s" : ""} disponible{d.futsDisponibles > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <h1 style={{ color: C.orPale, fontSize: isMobile ? "26px" : "clamp(26px, 4vw, 48px)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 10px", fontFamily: "Georgia, serif" }}>
            {d.nom}
          </h1>
          <p style={{ color: C.menthe, fontSize: isMobile ? "13px" : "15px", lineHeight: 1.7, maxWidth: "580px", margin: "0 0 20px", opacity: .9 }}>
            {d.description}
          </p>
          {/* Stats */}
          <div style={{ display: "flex", gap: "0", flexWrap: "wrap", borderTop: `0.5px solid ${C.or}30`, paddingTop: "20px" }}>
            {[
              { val: String(d.fondee), label: "Fondation" },
              { val: d.acreage, label: "Superficie" },
              { val: d.production, label: "Production" },
              { val: d.region, label: "Localisation" },
            ].map((s, i) => (
              <div key={i} style={{ paddingRight: isMobile ? "16px" : "32px", marginRight: isMobile ? "16px" : "32px", borderRight: i < 3 ? `0.5px solid ${C.or}20` : "none", marginBottom: "8px" }}>
                <div style={{ color: C.or, fontSize: isMobile ? "13px" : "16px", fontWeight: 700 }}>{s.val}</div>
                <div style={{ color: C.menthe, fontSize: "9px", letterSpacing: ".07em", textTransform: "uppercase", marginTop: "2px", opacity: .7 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "20px 16px" : "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "2fr 1fr", gap: "24px", alignItems: "start" }}>

          {/* Colonne principale */}
          <div>

            {/* Sidebar mobile en haut */}
            {isMobile && <SidebarContent d={d} isMobile={isMobile} />}

            {/* Histoire */}
            <div style={{ background: "white", borderRadius: "8px", border: "1px solid #E8E2D6", padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px" }}>Notre histoire</div>
              <p style={{ color: C.gris, fontSize: "14px", lineHeight: 1.9, margin: 0 }}>{d.histoire}</p>
            </div>

            {/* Spécialités */}
            <div style={{ background: "white", borderRadius: "8px", border: "1px solid #E8E2D6", padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px" }}>Nos rhums</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {d.specialites.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", background: C.creme, borderRadius: "4px", borderLeft: `3px solid ${d.couleur}` }}>
                    <span style={{ color: C.or, fontSize: "14px" }}>🥃</span>
                    <span style={{ color: C.texte, fontSize: "13px" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Barriques */}
            <div style={{ background: "white", borderRadius: "8px", border: "1px solid #E8E2D6", padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px" }}>Nos futs de vieillissement</div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                {d.barriques.map((b, i) => (
                  <div key={i} style={{ padding: "12px", background: C.foret, borderRadius: "4px", textAlign: "center" }}>
                    <div style={{ fontSize: "18px", marginBottom: "6px" }}>🪵</div>
                    <div style={{ color: C.orClair, fontSize: "11px", fontWeight: 500 }}>{b}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Récompenses */}
            <div style={{ background: "white", borderRadius: "8px", border: "1px solid #E8E2D6", padding: isMobile ? "18px" : "28px" }}>
              <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px" }}>Distinctions & recompenses</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {d.recompenses.map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ color: C.or, fontSize: "14px", flexShrink: 0 }}>★</span>
                    <span style={{ color: C.gris, fontSize: "13px" }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar desktop */}
          {!isMobile && (
            <div style={{ position: "sticky", top: "76px" }}>
              <SidebarContent d={d} isMobile={isMobile} />
            </div>
          )}
        </div>

        {/* Autres distilleries */}
        {memeIle.length > 0 && (
          <div style={{ marginTop: "40px" }}>
            <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px" }}>
              Aussi en {d.ile}
            </div>
            <h2 style={{ color: C.texte, fontSize: isMobile ? "18px" : "22px", fontWeight: 600, margin: "0 0 16px", fontFamily: "Georgia, serif" }}>
              Autres distilleries partenaires
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : `repeat(${Math.min(memeIle.length, 3)}, 1fr)`, gap: "12px" }}>
              {memeIle.map(autre => (
                <Link key={autre.slug} href={`/distilleries/${autre.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: autre.couleur, borderRadius: "6px", padding: isMobile ? "16px" : "20px", transition: "transform .2s" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "none")}
                  >
                    <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "4px" }}>
                      Fondee en {autre.fondee}
                    </div>
                    <div style={{ color: "white", fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>{autre.nom}</div>
                    <div style={{ color: C.menthe, fontSize: "11px", opacity: .8, marginBottom: "10px" }}>{autre.region}</div>
                    <div style={{ color: C.or, fontSize: "11px", fontWeight: 700 }}>{"Decouvrir →"}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

// Composant sidebar partagé mobile/desktop
function SidebarContent({ d, isMobile }: { d: any; isMobile: boolean }) {
  const C = {
    noir: "#0D2018", foret: "#0F3D2A", or: "#C8992A", orClair: "#D4B96A",
    orPale: "#F0E6C8", creme: "#F7F5F0", texte: "#2C1810", gris: "#6B7280", menthe: "#9FE1CB",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: isMobile ? "20px" : "0" }}>
      {/* Fûts disponibles */}
      <div style={{ background: d.futsDisponibles > 0 ? C.foret : "#F1EFE8", borderRadius: "8px", padding: "20px" }}>
        {d.futsDisponibles > 0 ? (
          <>
            <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "8px" }}>
              Investir dans cette distillerie
            </div>
            <div style={{ color: C.orPale, fontSize: "26px", fontWeight: 700, marginBottom: "4px" }}>
              {d.futsDisponibles} fut{d.futsDisponibles > 1 ? "s" : ""}
            </div>
            <div style={{ color: C.menthe, fontSize: "12px", marginBottom: "14px", opacity: .8 }}>
              disponible{d.futsDisponibles > 1 ? "s" : ""} a l'investissement
            </div>
            <Link href="/rhum#selection" style={{ display: "block", background: C.or, color: C.noir, padding: "12px", borderRadius: "3px", fontSize: "13px", textAlign: "center", fontWeight: 700, textDecoration: "none" }}>
              Voir les futs disponibles →
            </Link>
          </>
        ) : (
          <>
            <div style={{ color: C.gris, fontSize: "12px", marginBottom: "10px", fontWeight: 600 }}>Aucun fut disponible actuellement</div>
            <p style={{ color: C.gris, fontSize: "12px", lineHeight: 1.6, margin: "0 0 12px" }}>
              {"Rejoignez la liste d'attente pour etre alerte en priorite."}
            </p>
            <Link href="/rhum#portefeuille" style={{ display: "block", background: C.foret, color: C.or, padding: "10px", borderRadius: "3px", fontSize: "12px", textAlign: "center", fontWeight: 700, textDecoration: "none", border: `1px solid ${C.or}40` }}>
              {"Rejoindre la liste d'attente"}
            </Link>
          </>
        )}
      </div>

      {/* Infos pratiques */}
      <div style={{ background: "white", borderRadius: "8px", border: "1px solid #E8E2D6", padding: "18px" }}>
        <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "12px" }}>Informations</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <div style={{ color: C.gris, fontSize: "10px", textTransform: "uppercase", letterSpacing: ".08em" }}>Adresse</div>
            <div style={{ color: C.texte, fontSize: "12px", marginTop: "2px" }}>{d.adresse}</div>
          </div>
          <div>
            <div style={{ color: C.gris, fontSize: "10px", textTransform: "uppercase", letterSpacing: ".08em" }}>Statut</div>
            <div style={{ color: C.texte, fontSize: "12px", marginTop: "2px" }}>{d.statut}</div>
          </div>
          {d.site && (
            <div>
              <div style={{ color: C.gris, fontSize: "10px", textTransform: "uppercase", letterSpacing: ".08em" }}>Site officiel</div>
              <a href={d.site} target="_blank" rel="noopener noreferrer" style={{ color: C.or, fontSize: "12px", textDecoration: "none", marginTop: "2px", display: "block" }}>
                {d.site.replace("https://", "")} →
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Simulateur */}
      <div style={{ background: "#F0EBE1", borderRadius: "8px", padding: "18px", border: "1px solid #D5CCBA" }}>
        <div style={{ color: C.texte, fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>Simulez votre rendement</div>
        <p style={{ color: C.gris, fontSize: "12px", lineHeight: 1.6, margin: "0 0 12px" }}>
          Calculez vos projections sur un fut de rhum vieux en 3 scenarios.
        </p>
        <Link href="/simulateur" style={{ display: "block", background: C.texte, color: C.orPale, padding: "10px", borderRadius: "3px", fontSize: "12px", textAlign: "center", fontWeight: 600, textDecoration: "none" }}>
          Ouvrir le simulateur →
        </Link>
      </div>

      {/* Rejoindre */}
      <div style={{ background: C.foret, borderRadius: "8px", padding: "18px", textAlign: "center" }}>
        <div style={{ fontSize: "22px", marginBottom: "8px" }}>🥃</div>
        <div style={{ color: C.or, fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>Rejoindre la famille CaribbeanVault</div>
        <p style={{ color: C.menthe, fontSize: "11px", lineHeight: 1.6, margin: "0 0 12px", opacity: .8 }}>
          Acces privilegie aux nouveaux futs et visites exclusives.
        </p>
        <Link href="/kyc" style={{ display: "block", background: C.or, color: C.noir, padding: "10px", borderRadius: "3px", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>
          Rejoindre la famille →
        </Link>
      </div>
    </div>
  );
}
"use client";
import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import { DISTILLERIES, getDistillerie } from "@/lib/distilleries";
import Footer from "@/components/Footer";
import { LogoEmeraude } from "@/components/Logo";

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



  // Distilleries de la même île pour la section "Aussi sur..."
  const memeIle = d ? DISTILLERIES.filter(x => x.ile === d!.ile && x.slug !== d!.slug).slice(0, 3) : [];

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.creme, minHeight: "100vh" }}>

      {/* ── NAVBAR ── */}
      <nav style={{ background: C.noir, borderBottom: `0.5px solid ${C.foret}`, padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
           <LogoEmeraude size={0.7} />
          </Link>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Link href="/distilleries" style={{ color: C.menthe, fontSize: "11px", textDecoration: "none", opacity: .8 }}>← Toutes les distilleries</Link>
            <Link href="/rhum#selection" style={{ background: C.or, color: C.noir, padding: "7px 16px", borderRadius: "2px", fontSize: "11px", fontWeight: 700, textDecoration: "none" }}>
              Voir les fûts →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO DISTILLERIE ── */}
      <section style={{ background: d.couleur, padding: "64px 24px 48px", position: "relative", overflow: "hidden" }}>
        {/* Décor cercles */}
        {[300, 200, 120].map((size, i) => (
          <div key={i} style={{
            position: "absolute", right: `-${size / 3}px`, top: "50%",
            transform: "translateY(-50%)",
            width: `${size}px`, height: `${size}px`,
            borderRadius: "50%",
            border: `1px solid ${C.or}${["15", "20", "30"][i]}`,
          }} />
        ))}

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <Link href="/rhum" style={{ color: C.menthe, fontSize: "11px", textDecoration: "none", opacity: .7 }}>Rhum AOC</Link>
            <span style={{ color: C.menthe, opacity: .4 }}>›</span>
            <Link href="/distilleries" style={{ color: C.menthe, fontSize: "11px", textDecoration: "none", opacity: .7 }}>Distilleries</Link>
            <span style={{ color: C.menthe, opacity: .4 }}>›</span>
            <span style={{ color: C.or, fontSize: "11px" }}>{d.nom}</span>
          </div>

          <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
            <span style={{ background: C.or, color: C.noir, fontSize: "9px", fontWeight: 700, padding: "3px 12px", borderRadius: "1px", letterSpacing: ".2em", textTransform: "uppercase" }}>
              AOC Certifié
            </span>
            <span style={{ border: `0.5px solid ${C.menthe}`, color: C.menthe, fontSize: "9px", padding: "3px 12px", borderRadius: "1px", letterSpacing: ".12em", textTransform: "uppercase" }}>
              {d.ile} · Fondée en {d.fondee}
            </span>
            {d.futsDisponibles > 0 && (
              <span style={{ background: "rgba(200,153,42,.2)", color: C.or, fontSize: "9px", fontWeight: 700, padding: "3px 12px", borderRadius: "1px", letterSpacing: ".08em" }}>
                {d.futsDisponibles} fût{d.futsDisponibles > 1 ? "s" : ""} disponible{d.futsDisponibles > 1 ? "s" : ""}
              </span>
            )}
          </div>

          <h1 style={{ color: C.orPale, fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 12px", fontFamily: "Georgia, serif" }}>
            {d.nom}
          </h1>
          <p style={{ color: C.menthe, fontSize: "15px", lineHeight: 1.7, maxWidth: "580px", margin: "0 0 28px", opacity: .9 }}>
            {d.description}
          </p>

          {/* Stats rapides */}
          <div style={{ display: "flex", gap: "0", flexWrap: "wrap", borderTop: `0.5px solid ${C.or}30`, paddingTop: "24px" }}>
            {[
              { val: String(d.fondee), label: "Année de fondation" },
              { val: d.acreage, label: "Superficie" },
              { val: d.production, label: "Production annuelle" },
              { val: d.region, label: "Localisation" },
            ].map((s, i) => (
              <div key={i} style={{ paddingRight: "32px", marginRight: "32px", borderRight: i < 3 ? `0.5px solid ${C.or}20` : "none" }}>
                <div style={{ color: C.or, fontSize: "16px", fontWeight: 700 }}>{s.val}</div>
                <div style={{ color: C.menthe, fontSize: "10px", letterSpacing: ".07em", textTransform: "uppercase", marginTop: "2px", opacity: .7 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENU PRINCIPAL ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "32px", alignItems: "start" }}>

          {/* Colonne principale */}
          <div>

            {/* Histoire */}
            <div style={{ background: "white", borderRadius: "8px", border: "1px solid #E8E2D6", padding: "28px", marginBottom: "20px" }}>
              <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>
                Notre histoire
              </div>
              <p style={{ color: C.gris, fontSize: "14px", lineHeight: 1.9, margin: 0 }}>
                {d.histoire}
              </p>
            </div>

            {/* Spécialités */}
            <div style={{ background: "white", borderRadius: "8px", border: "1px solid #E8E2D6", padding: "28px", marginBottom: "20px" }}>
              <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "16px" }}>
                Nos rhums
              </div>
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
            <div style={{ background: "white", borderRadius: "8px", border: "1px solid #E8E2D6", padding: "28px", marginBottom: "20px" }}>
              <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "16px" }}>
                Nos fûts de vieillissement
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                {d.barriques.map((b, i) => (
                  <div key={i} style={{ padding: "12px", background: C.foret, borderRadius: "4px", textAlign: "center" }}>
                    <div style={{ fontSize: "20px", marginBottom: "6px" }}>🪵</div>
                    <div style={{ color: C.orClair, fontSize: "12px", fontWeight: 500 }}>{b}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Récompenses */}
            <div style={{ background: "white", borderRadius: "8px", border: "1px solid #E8E2D6", padding: "28px" }}>
              <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "16px" }}>
                Distinctions & récompenses
              </div>
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

          {/* Colonne latérale */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Fûts disponibles */}
            <div style={{ background: d.futsDisponibles > 0 ? C.foret : "#F1EFE8", borderRadius: "8px", padding: "24px" }}>
              {d.futsDisponibles > 0 ? (
                <>
                  <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "10px" }}>
                    Investir dans cette distillerie
                  </div>
                  <div style={{ color: C.orPale, fontSize: "28px", fontWeight: 700, marginBottom: "4px" }}>
                    {d.futsDisponibles} fût{d.futsDisponibles > 1 ? "s" : ""}
                  </div>
                  <div style={{ color: C.menthe, fontSize: "12px", marginBottom: "16px", opacity: .8 }}>
                    disponible{d.futsDisponibles > 1 ? "s" : ""} à l'investissement
                  </div>
                  <Link href="/rhum#selection" style={{
                    display: "block", background: C.or, color: C.noir,
                    padding: "12px", borderRadius: "3px", fontSize: "13px",
                    textAlign: "center", fontWeight: 700, textDecoration: "none",
                    letterSpacing: ".05em",
                  }}>
                    Voir les fûts disponibles →
                  </Link>
                </>
              ) : (
                <>
                  <div style={{ color: C.gris, fontSize: "12px", marginBottom: "12px", fontWeight: 600 }}>
                    Aucun fût disponible actuellement
                  </div>
                  <p style={{ color: C.gris, fontSize: "12px", lineHeight: 1.6, margin: "0 0 14px" }}>
                    Rejoignez la liste d'attente pour être alerté en priorité lors de la prochaine émission.
                  </p>
                  <Link href="/rhum#portefeuille" style={{
                    display: "block", background: C.foret, color: C.or,
                    padding: "11px", borderRadius: "3px", fontSize: "12px",
                    textAlign: "center", fontWeight: 700, textDecoration: "none",
                    border: `1px solid ${C.or}40`,
                  }}>
                    Rejoindre la liste d'attente
                  </Link>
                </>
              )}
            </div>

            {/* Infos pratiques */}
            <div style={{ background: "white", borderRadius: "8px", border: "1px solid #E8E2D6", padding: "20px" }}>
              <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "14px" }}>
                Informations
              </div>
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
            <div style={{ background: "#F0EBE1", borderRadius: "8px", padding: "20px", border: "1px solid #D5CCBA" }}>
              <div style={{ color: C.texte, fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>
                Simulez votre rendement
              </div>
              <p style={{ color: C.gris, fontSize: "12px", lineHeight: 1.6, margin: "0 0 14px" }}>
                Calculez vos projections de rendement sur un fût de rhum vieux en 3 scénarios.
              </p>
              <Link href="/simulateur" style={{
                display: "block", background: C.texte, color: C.orPale,
                padding: "10px", borderRadius: "3px", fontSize: "12px",
                textAlign: "center", fontWeight: 600, textDecoration: "none",
              }}>
                Ouvrir le simulateur →
              </Link>
            </div>

            {/* Rejoindre la famille */}
            <div style={{ background: C.foret, borderRadius: "8px", padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "24px", marginBottom: "10px" }}>🥃</div>
              <div style={{ color: C.or, fontSize: "12px", fontWeight: 700, marginBottom: "8px" }}>
                Rejoindre la famille CaribbeanVault
              </div>
              <p style={{ color: C.menthe, fontSize: "11px", lineHeight: 1.6, margin: "0 0 14px", opacity: .8 }}>
                Accès privilégié aux nouveaux fûts et visites exclusives de distilleries.
              </p>
              <Link href="/rhum#portefeuille" style={{
                display: "block", background: C.or, color: C.noir,
                padding: "10px", borderRadius: "3px", fontSize: "12px",
                fontWeight: 700, textDecoration: "none",
              }}>
                Rejoindre la famille →
              </Link>
            </div>

          </div>
        </div>

        {/* ── AUTRES DISTILLERIES ── */}
        {memeIle.length > 0 && (
          <div style={{ marginTop: "48px" }}>
            <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px" }}>
              Aussi en {d.ile}
            </div>
            <h2 style={{ color: C.texte, fontSize: "22px", fontWeight: 600, margin: "0 0 20px", fontFamily: "Georgia, serif" }}>
              Autres distilleries partenaires
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
              {memeIle.map(autre => (
                <Link key={autre.slug} href={`/distilleries/${autre.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: autre.couleur, borderRadius: "6px", padding: "20px", transition: "transform .2s" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "none")}
                  >
                    <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "6px" }}>
                      Fondée en {autre.fondee}
                    </div>
                    <div style={{ color: "white", fontSize: "15px", fontWeight: 600, marginBottom: "6px" }}>{autre.nom}</div>
                    <div style={{ color: C.menthe, fontSize: "11px", opacity: .8, marginBottom: "12px" }}>{autre.region}</div>
                    <div style={{ color: C.or, fontSize: "11px", fontWeight: 700 }}>Découvrir →</div>
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
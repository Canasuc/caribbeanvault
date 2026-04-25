"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { LogoTurquoise } from "@/components/Logo";
import Footer from "@/components/Footer";
import { BIENS, REGIONS, PROCESSUS_ONBOARDING, TYPES_BAIL, FISCALITE, getBienSlug } from "@/lib/biens";
import NavbarAuth from "@/components/NavbarAuth";

const CarteLeaflet = dynamic(() => import("@/components/CarteLeaflet"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "420px", background: "#E0F7FA", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", border: "0.5px solid #E5E7EB" }}>
      <span style={{ color: "#0891B2", fontSize: "14px" }}>Chargement de la carte...</span>
    </div>
  ),
});

const C = {
  turquoise: "#0891B2",
  turqDark:  "#0E7490",
  turqLight: "#F0FDFF",
  turqPale:  "#E0F7FA",
  navy:      "#0C2340",
  blanc:     "#FFFFFF",
  gris:      "#F9FAFB",
  grisBord:  "#E5E7EB",
  texte:     "#111827",
  texteSec:  "#4B5563",
  texteTert: "#9CA3AF",
};

function StatutBadge({ statut }: { statut: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    "En levée":         { bg: "#E1F5EE", color: "#0F6E56" },
    "Dernières places": { bg: "#FCEBEB", color: "#A32D2D" },
    "Nouveau":          { bg: "#E6F1FB", color: "#0C447C" },
    "Complet":          { bg: "#F1EFE8", color: "#444441" },
  };
  const s = map[statut] || map["En levée"];
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", letterSpacing: ".05em" }}>
      {statut}
    </span>
  );
}

function scrollToSelection() {
  setTimeout(() => {
    document.getElementById("selection")?.scrollIntoView({ behavior: "smooth" });
  }, 100);
}

export default function ImmobilierPage() {
  const [filtreType, setFiltreType] = useState<"tous" | "villa" | "hotel" | "commercial" | "meuble">("tous");
  const [filtreRegion, setFiltreRegion] = useState<"toutes" | "Guadeloupe" | "Martinique" | "Guyane" | "Saint-Martin">("toutes");
  const [hovered, setHovered] = useState<number | null>(null);
  const [regionActive, setRegionActive] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const ile = e.detail;
      if (ile === "Guyane") setFiltreRegion("Guyane");
      else if (ile === "Martinique") setFiltreRegion("Martinique");
      else if (ile === "Guadeloupe") setFiltreRegion("Guadeloupe");
      else if (ile === "Saint-Martin") setFiltreRegion("Saint-Martin");
    };
    window.addEventListener("filtreRegion", handler as EventListener);
    return () => window.removeEventListener("filtreRegion", handler as EventListener);
  }, []);

  const biensFiltres = BIENS.filter(b => {
    const matchType =
      filtreType === "villa" ? b.type.includes("Villa") :
      filtreType === "hotel" ? (b.type.includes("Hotel") || b.type.includes("Hôtel") || b.type.includes("Boutique")) :
      filtreType === "commercial" ? (b.type.includes("Commercial") || b.type.includes("Bureau")) :
      filtreType === "meuble" ? b.type.includes("Meublé") :
      true;
    const matchRegion = filtreRegion === "toutes" ? true : b.ile === filtreRegion;
    return matchType && matchRegion;
  });

  function handleRegionFilter(region: string) {
    setFiltreRegion(region as typeof filtreRegion);
    scrollToSelection();
  }

  function handleBailFilter(nomBail: string) {
    if (nomBail === "Location Saisonnière") setFiltreType("villa");
    else if (nomBail === "Bail Commercial 3-6-9") setFiltreType("commercial");
    else if (nomBail === "Location Meublée") setFiltreType("meuble");
    else if (nomBail === "Hôtellerie") setFiltreType("hotel");
    else setFiltreType("tous");
    scrollToSelection();
  }

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.gris, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ background: C.blanc, borderBottom: `0.5px solid ${C.grisBord}`, padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <LogoTurquoise size={0.85} />
          </Link>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            {[
  { label: "Notre selection", href: "#selection" },
  { label: "Par region", href: "#regions" },
  { label: "Simulateur", href: "/simulateur" },
].map(l => (
  <Link key={l.label} href={l.href} style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>
    {l.label}
  </Link>
))}
<NavbarAuth
  buttonBg="#0891B2"
  buttonColor="white"
  textColor="#4B5563"
  borderColor="#E5E7EB"
/>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: C.turqLight, borderBottom: "0.5px solid #BAE6FD", padding: "72px 24px 56px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "40px", flexWrap: "wrap" }}>
            <div style={{ maxWidth: "560px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: C.turqPale, border: "0.5px solid #67E8F9", borderRadius: "20px", padding: "4px 12px", marginBottom: "20px" }}>
                <span style={{ color: C.turqDark, fontSize: "10px", fontWeight: 600 }}>Immobilier tokenise - Caraibe</span>
              </div>
              <h1 style={{ color: C.texte, fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-1px", margin: "0 0 16px" }}>
                L'immobilier caribeen,<br />
                <span style={{ color: C.turquoise }}>sans les contraintes.</span>
              </h1>
              <p style={{ color: C.texteSec, fontSize: "15px", lineHeight: 1.8, margin: "0 0 28px" }}>
                Villas touristiques, locaux commerciaux, appartements. Investissez des 100 euros et percevez des revenus locatifs chaque trimestre, sans aucune gestion de votre part.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="#selection" style={{ background: C.turquoise, color: "white", padding: "12px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                  Voir les biens disponibles
                </Link>
                <Link href="/simulateur" style={{ background: "white", color: C.turquoise, border: `1.5px solid ${C.turquoise}`, padding: "12px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                  Simuler mon rendement
                </Link>
              </div>
            </div>
            <div style={{ background: "white", borderRadius: "16px", border: `0.5px solid ${C.grisBord}`, padding: "24px", minWidth: "260px" }}>
              <div style={{ fontSize: "12px", color: C.texteTert, marginBottom: "16px", fontWeight: 500 }}>Performance moyenne du portefeuille</div>
              {[
                { label: "Rendement brut moyen", val: "9,1%", color: C.turquoise },
                { label: "Taux d'occupation moyen", val: "84%", color: "#0F6E56" },
                { label: "Distributions versees", val: "100%", color: C.turquoise },
                { label: "Biens sous gestion", val: "6", color: C.texte },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 3 ? `0.5px solid ${C.grisBord}` : "none" }}>
                  <span style={{ color: C.texteSec, fontSize: "12px" }}>{m.label}</span>
                  <span style={{ color: m.color, fontSize: "15px", fontWeight: 700 }}>{m.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "white", borderBottom: `0.5px solid ${C.grisBord}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { val: "6-11%", label: "Rendement brut moyen", icon: "📈" },
            { val: "100€", label: "Ticket minimum", icon: "💶" },
            { val: "Trimestriel", label: "Distribution", icon: "📅" },
            { val: "SPV", label: "Protection juridique", icon: "🔒" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "20px 16px", borderRight: i < 3 ? `0.5px solid ${C.grisBord}` : "none" }}>
              <div style={{ fontSize: "20px", marginBottom: "6px" }}>{s.icon}</div>
              <div style={{ color: C.turquoise, fontSize: "20px", fontWeight: 700 }}>{s.val}</div>
              <div style={{ color: C.texteTert, fontSize: "10px", marginTop: "3px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CARTE */}
      <section style={{ padding: "64px 24px", background: "white", borderBottom: `0.5px solid ${C.grisBord}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "24px" }}>
            <div style={{ color: C.turquoise, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px" }}>Localisation</div>
            <h2 style={{ color: C.texte, fontSize: "26px", fontWeight: 800, margin: "0 0 8px" }}>Nos biens a travers la Caraibe</h2>
            <p style={{ color: C.texteSec, fontSize: "13px", margin: 0 }}>Zoomez sur la carte et cliquez sur un marqueur pour voir les details.</p>
          </div>
          <CarteLeaflet
            biens={BIENS}
            onBienClick={() => { scrollToSelection(); }}
          />
          <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: C.texteSec }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: C.turquoise }} />
              Biens disponibles
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: C.texteSec }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#9CA3AF" }} />
              Complet
            </div>
          </div>
        </div>
      </section>

      {/* REGIONS */}
      <section id="regions" style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "36px" }}>
            <div style={{ color: C.turquoise, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px" }}>Nos marches</div>
            <h2 style={{ color: C.texte, fontSize: "26px", fontWeight: 800, margin: 0 }}>Par region</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            {REGIONS.map((r, i) => (
              <div key={i}
                onClick={() => setRegionActive(regionActive === r.nom ? null : r.nom)}
                style={{ background: "white", borderRadius: "12px", overflow: "hidden", border: regionActive === r.nom ? `2px solid ${r.couleur}` : `0.5px solid ${C.grisBord}`, cursor: "pointer", transition: "all .2s" }}
              >
                {/* Header coloré */}
                <div style={{ background: r.couleur, padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", overflow: "hidden", minHeight: "80px" }}>
                  {/* Image ile */}
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "35%", overflow: "hidden" }}>
                    <div style={{ position: "relative", width: "100%", height: "100%" }}>
                      <Image
                        src={
                          r.nom === "Guadeloupe" ? "/images/carte-guadeloupe.jpg" :
                          r.nom === "Martinique" ? "/images/carte-martinique.jpg" :
                          r.nom === "Guyane" ? "/images/carte-guyane.jpg" :
                          "/images/carte-saintmartin.jpg"
                        }
                        alt={r.nom}
                        fill
                        sizes="200px"
                        style={{ objectFit: "cover", objectPosition: "center", opacity: .35 }}
                      />
                    </div>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 0%, var(--c) 70%)".replace("var(--c)", r.couleur) }} />
                  </div>
                  {/* Contenu */}
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ fontSize: "28px", marginBottom: "4px" }}>{r.drapeau}</div>
                    <div style={{ color: "white", fontSize: "18px", fontWeight: 700 }}>{r.nom}</div>
                    <div style={{ color: "rgba(255,255,255,.7)", fontSize: "11px", marginTop: "2px" }}>{r.pays}</div>
                  </div>
                  <div style={{ textAlign: "right", position: "relative", zIndex: 1 }}>
                    <div style={{ color: "rgba(255,255,255,.9)", fontSize: "11px", marginBottom: "4px" }}>Rendement moyen</div>
                    <div style={{ color: "white", fontSize: "20px", fontWeight: 800 }}>{r.rendementMoyen}</div>
                  </div>
                </div>

                {/* Metriques */}
                <div style={{ padding: "16px 24px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", borderBottom: "0.5px solid #E5E7EB" }}>
                  {[
                    { label: "Population", val: r.population },
                    { label: "Prix m2", val: r.prixM2Moyen },
                    { label: "Touristes/an", val: r.touristes },
                  ].map((m, j) => (
                    <div key={j}>
                      <div style={{ color: C.texteTert, fontSize: "9px", textTransform: "uppercase", letterSpacing: ".08em" }}>{m.label}</div>
                      <div style={{ color: C.texte, fontSize: "13px", fontWeight: 600, marginTop: "2px" }}>{m.val}</div>
                    </div>
                  ))}
                </div>

                {/* Contexte deplie */}
                {regionActive === r.nom ? (
                  <div style={{ padding: "16px 24px" }}>
                    <p style={{ color: C.texteSec, fontSize: "13px", lineHeight: 1.7, margin: "0 0 14px" }}>{r.histoire}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                      {r.atouts.map((a, k) => (
                        <span key={k} style={{ background: C.turqLight, color: C.turqDark, fontSize: "10px", padding: "3px 10px", borderRadius: "20px", fontWeight: 500 }}>
                          {a}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRegionFilter(r.nom); }}
                      style={{ background: r.couleur, color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                    >
                      Voir les biens de {r.nom} →
                    </button>
                  </div>
                ) : (
                  <div style={{ padding: "10px 24px", color: C.turquoise, fontSize: "11px", fontWeight: 600 }}>
                    Voir le contexte economique →
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* A venir */}
          <div style={{ marginTop: "16px", padding: "16px 24px", background: "white", borderRadius: "12px", border: `0.5px solid ${C.grisBord}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: C.texte, fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Expansion Caraibe anglophone et hispanophone</div>
              <div style={{ color: C.texteSec, fontSize: "12px" }}>Jamaique, Trinidad, Barbade, Republique Dominicaine - lancement prevu 2027</div>
            </div>
            <span style={{ background: "#E6F1FB", color: "#0C447C", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", whiteSpace: "nowrap" }}>
              Bientot disponible
            </span>
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section style={{ background: C.navy, padding: "64px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ color: C.turquoise, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px" }}>Comment ca marche</div>
            <h2 style={{ color: "white", fontSize: "26px", fontWeight: 800, margin: 0 }}>De la selection du bien a votre premier revenu</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {PROCESSUS_ONBOARDING.map((p, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,.05)", borderRadius: "10px", padding: "24px", border: "0.5px solid rgba(255,255,255,.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div style={{ fontSize: "24px" }}>{p.icone}</div>
                  <div style={{ color: C.turquoise, fontSize: "22px", fontWeight: 800, opacity: .5 }}>{p.num}</div>
                </div>
                <div style={{ color: "white", fontSize: "13px", fontWeight: 700, marginBottom: "8px" }}>{p.titre}</div>
                <div style={{ color: "rgba(255,255,255,.6)", fontSize: "12px", lineHeight: 1.7, marginBottom: "12px" }}>{p.desc}</div>
                <div style={{ display: "inline-flex", background: `${C.turquoise}20`, color: C.turquoise, fontSize: "10px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px" }}>
                  {p.duree}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPES DE BAIL */}
      <section style={{ padding: "64px 24px", background: "white", borderBottom: `0.5px solid ${C.grisBord}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "36px" }}>
            <div style={{ color: C.turquoise, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px" }}>Comprendre les types de bail</div>
            <h2 style={{ color: C.texte, fontSize: "26px", fontWeight: 800, margin: "0 0 8px" }}>4 strategies locatives</h2>
            <p style={{ color: C.texteSec, fontSize: "13px", margin: 0 }}>Cliquez sur une strategie pour voir les biens correspondants.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
            {TYPES_BAIL.map((t, i) => (
              <div key={i}
                onClick={() => handleBailFilter(t.nom)}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                style={{
                  background: C.gris, borderRadius: "10px", padding: "20px",
                  borderTop: `3px solid ${t.couleur}`,
                  borderRight: `0.5px solid ${C.grisBord}`,
                  borderBottom: `0.5px solid ${C.grisBord}`,
                  borderLeft: `0.5px solid ${C.grisBord}`,
                  cursor: "pointer", transition: "all .2s",
                }}
              >
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>{t.icone}</div>
                <div style={{ color: C.texte, fontSize: "13px", fontWeight: 700, marginBottom: "4px" }}>{t.nom}</div>
                <div style={{ color: t.couleur, fontSize: "18px", fontWeight: 800, marginBottom: "4px" }}>{t.rendement}</div>
                <div style={{ color: C.texteTert, fontSize: "10px", marginBottom: "12px" }}>Risque : {t.risque}</div>
                <div style={{ color: C.texteSec, fontSize: "11px", lineHeight: 1.6, marginBottom: "12px" }}>{t.description}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "12px" }}>
                  {t.avantages.slice(0, 2).map((a, j) => (
                    <div key={j} style={{ display: "flex", gap: "6px", fontSize: "10px", color: "#0F6E56" }}>
                      <span>✓</span><span>{a}</span>
                    </div>
                  ))}
                </div>
                <div style={{ color: t.couleur, fontSize: "11px", fontWeight: 600 }}>Voir les biens →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FISCALITE */}
      <section style={{ padding: "64px 24px", background: C.gris }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "36px" }}>
            <div style={{ color: C.turquoise, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px" }}>Avantages fiscaux</div>
            <h2 style={{ color: C.texte, fontSize: "26px", fontWeight: 800, margin: "0 0 8px" }}>Defiscalisation et optimisation</h2>
            <p style={{ color: C.texteSec, fontSize: "13px", margin: 0 }}>Les DOM offrent des dispositifs de defiscalisation parmi les plus avantageux de France.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            {FISCALITE.map((f, i) => (
              <div key={i} style={{ background: "white", borderRadius: "10px", padding: "24px", borderTop: `0.5px solid ${C.grisBord}`, borderRight: `0.5px solid ${C.grisBord}`, borderBottom: `0.5px solid ${C.grisBord}`, borderLeft: `4px solid ${f.couleur}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <div>
                    <div style={{ fontSize: "16px", marginBottom: "4px" }}>{f.flag}</div>
                    <div style={{ color: C.texte, fontSize: "14px", fontWeight: 700 }}>{f.nom}</div>
                  </div>
                  <div style={{ background: `${f.couleur}15`, color: f.couleur, fontSize: "12px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", whiteSpace: "nowrap" }}>
                    {f.reduction}
                  </div>
                </div>
                <p style={{ color: C.texteSec, fontSize: "12px", lineHeight: 1.7, margin: "0 0 12px" }}>{f.description}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {f.conditions.map((cond, j) => (
                    <div key={j} style={{ display: "flex", gap: "6px", fontSize: "11px", color: C.texteSec }}>
                      <span style={{ color: f.couleur, flexShrink: 0 }}>›</span><span>{cond}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTION BIENS */}
      <section id="selection" style={{ padding: "64px 24px", background: "white" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Titre + filtres */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ color: C.turquoise, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px" }}>Notre selection</div>
              <h2 style={{ color: C.texte, fontSize: "26px", fontWeight: 800, margin: 0 }}>
                {filtreType === "tous" && filtreRegion === "toutes" ? "Tous les biens disponibles" :
                 `${filtreType !== "tous" ? (filtreType === "villa" ? "Villas" : filtreType === "hotel" ? "Hotels" : filtreType === "commercial" ? "Locaux commerciaux" : "Appartements meubles") : "Biens"} ${filtreRegion !== "toutes" ? `en ${filtreRegion}` : ""}`}
              </h2>
            </div>
          </div>

          {/* Filtres combines */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ color: C.texteTert, fontSize: "11px", fontWeight: 600, minWidth: "60px" }}>Type :</span>
              {[
                { key: "tous", label: "Tous" },
                { key: "villa", label: "Villas" },
                { key: "hotel", label: "Hotels" },
                { key: "commercial", label: "Commercial" },
                { key: "meuble", label: "Meuble" },
              ].map(f => (
                <button key={f.key} onClick={() => setFiltreType(f.key as typeof filtreType)} style={{
                  padding: "6px 14px", borderRadius: "20px", cursor: "pointer", fontSize: "11px", fontWeight: 600,
                  border: filtreType === f.key ? `1.5px solid ${C.turquoise}` : `0.5px solid ${C.grisBord}`,
                  background: filtreType === f.key ? C.turqLight : "white",
                  color: filtreType === f.key ? C.turqDark : C.texteSec,
                  transition: "all .15s",
                }}>{f.label}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ color: C.texteTert, fontSize: "11px", fontWeight: 600, minWidth: "60px" }}>Region :</span>
              {[
                { key: "toutes", label: "Toutes" },
                { key: "Guadeloupe", label: "Guadeloupe" },
                { key: "Martinique", label: "Martinique" },
                { key: "Guyane", label: "Guyane" },
                { key: "Saint-Martin", label: "Saint-Martin" },
              ].map(f => (
                <button key={f.key} onClick={() => setFiltreRegion(f.key as typeof filtreRegion)} style={{
                  padding: "6px 14px", borderRadius: "20px", cursor: "pointer", fontSize: "11px", fontWeight: 600,
                  border: filtreRegion === f.key ? `1.5px solid ${C.turquoise}` : `0.5px solid ${C.grisBord}`,
                  background: filtreRegion === f.key ? C.turqLight : "white",
                  color: filtreRegion === f.key ? C.turqDark : C.texteSec,
                  transition: "all .15s",
                }}>{f.label}</button>
              ))}
            </div>
            {(filtreType !== "tous" || filtreRegion !== "toutes") && (
              <button onClick={() => { setFiltreType("tous"); setFiltreRegion("toutes"); }} style={{
                alignSelf: "flex-start", padding: "5px 12px", borderRadius: "20px", cursor: "pointer",
                fontSize: "10px", background: "#FCEBEB", color: "#A32D2D", border: "none", fontWeight: 600,
              }}>
                Reinitialiser les filtres x
              </button>
            )}
          </div>

          {/* Compteur */}
          <div style={{ color: C.texteSec, fontSize: "12px", marginBottom: "20px" }}>
            {biensFiltres.length} bien{biensFiltres.length > 1 ? "s" : ""} {(filtreType !== "tous" || filtreRegion !== "toutes") ? "correspondant a votre selection" : "disponibles"}
          </div>

          {/* Grille biens */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {biensFiltres.map(bien => {
              const pct = Math.round(((bien.tokensTotal - bien.tokensDispo) / bien.tokensTotal) * 100);
              const complet = bien.tokensDispo === 0;
              return (
                <Link
                  key={bien.id}
                  href={`/immobilier/${getBienSlug(bien)}`}
                  style={{ textDecoration: "none", display: "block" }}
                  onMouseEnter={() => setHovered(bien.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div style={{
                    background: "white", borderRadius: "12px", overflow: "hidden",
                    border: hovered === bien.id ? `1.5px solid ${C.turquoise}` : `0.5px solid ${C.grisBord}`,
                    transition: "all .2s", opacity: complet ? .65 : 1,
                    transform: hovered === bien.id && !complet ? "translateY(-3px)" : "none",
                    boxShadow: hovered === bien.id && !complet ? "0 8px 24px rgba(8,145,178,.1)" : "none",
                    height: "100%",
                  }}>
                    <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
                      <Image src={bien.photo} alt={bien.nom} fill sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover", transition: "transform .4s", transform: hovered === bien.id ? "scale(1.05)" : "scale(1)" }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 60%)" }} />
                      <div style={{ position: "absolute", top: "10px", left: "10px" }}>
                        <span style={{ background: bien.tagColor, color: "white", fontSize: "8px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px" }}>{bien.tag}</span>
                      </div>
                      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                        <StatutBadge statut={bien.statut} />
                      </div>
                      <div style={{ position: "absolute", bottom: "10px", left: "12px" }}>
                        <div style={{ color: "rgba(255,255,255,.8)", fontSize: "9px", textTransform: "uppercase" }}>{bien.type}</div>
                        <div style={{ color: "white", fontSize: "14px", fontWeight: 700 }}>{bien.nom}</div>
                      </div>
                    </div>
                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "8px" }}>
                        <span style={{ fontSize: "11px" }}>📍</span>
                        <span style={{ color: C.texteSec, fontSize: "11px" }}>{bien.ile} · {bien.region}</span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "10px" }}>
                        {[
                          { label: "Rdt brut", val: bien.rendementBrut },
                          { label: "Occupation", val: bien.occupation },
                          { label: "Token", val: `${bien.prixToken}€` },
                        ].map(m => (
                          <div key={m.label} style={{ background: C.gris, borderRadius: "6px", padding: "7px", textAlign: "center" }}>
                            <div style={{ color: C.texte, fontSize: "12px", fontWeight: 700 }}>{m.val}</div>
                            <div style={{ color: C.texteTert, fontSize: "9px", marginTop: "1px" }}>{m.label}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ background: C.turqLight, borderRadius: "6px", padding: "7px 10px", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: C.turqDark, fontSize: "11px" }}>Revenu estime</span>
                        <span style={{ color: C.turqDark, fontSize: "12px", fontWeight: 700 }}>{bien.revenuEstime}</span>
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                          <span style={{ color: C.texteTert, fontSize: "10px" }}>Levee</span>
                          <span style={{ color: C.turquoise, fontSize: "10px", fontWeight: 700 }}>{pct}% - {bien.tokensDispo} restants</span>
                        </div>
                        <div style={{ background: C.grisBord, borderRadius: "4px", height: "5px" }}>
                          <div style={{ background: pct >= 95 ? "#E24B4A" : C.turquoise, height: "100%", borderRadius: "4px", width: `${pct}%` }} />
                        </div>
                      </div>
                      <div style={{ background: C.turquoise, color: "white", padding: "10px", borderRadius: "8px", fontSize: "12px", textAlign: "center", fontWeight: 600 }}>
                        {complet ? "Liste d'attente" : "Voir ce bien →"}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {biensFiltres.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px", color: C.texteSec, fontSize: "14px" }}>
              Aucun bien ne correspond a ce filtre pour le moment.
              <br />
              <button onClick={() => { setFiltreType("tous"); setFiltreRegion("toutes"); }} style={{ marginTop: "12px", background: C.turquoise, color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>
                Voir tous les biens
              </button>
            </div>
          )}
        </div>
      </section>

      {/* REJOINDRE */}
      <section id="rejoindre" style={{ background: C.turquoise, padding: "72px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "580px", margin: "0 auto" }}>
          <div style={{ width: "56px", height: "56px", background: "rgba(255,255,255,.15)", borderRadius: "14px", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "24px" }}>🏠</span>
          </div>
          <h2 style={{ color: "white", fontSize: "28px", fontWeight: 800, letterSpacing: "-.4px", lineHeight: 1.2, margin: "0 0 14px" }}>
            Rejoignez la famille CaribbeanVault
          </h2>
          <p style={{ color: "rgba(255,255,255,.85)", fontSize: "14px", lineHeight: 1.8, margin: "0 0 32px" }}>
            Soyez alerte en avant-premiere des nouveaux biens et rejoignez une communaute d'investisseurs passionnes par la Caraibe.
          </p>
          <div style={{ background: "rgba(255,255,255,.12)", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
              <input type="text" placeholder="Prenom" style={{ padding: "11px 14px", background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.3)", borderRadius: "8px", color: "white", fontSize: "13px", outline: "none" }} />
              <input type="text" placeholder="Nom" style={{ padding: "11px 14px", background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.3)", borderRadius: "8px", color: "white", fontSize: "13px", outline: "none" }} />
            </div>
            <input type="email" placeholder="Votre adresse email" style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.3)", borderRadius: "8px", color: "white", fontSize: "13px", outline: "none", marginBottom: "10px", boxSizing: "border-box" }} />
            <button style={{ width: "100%", background: "white", color: C.turqDark, border: "none", padding: "13px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
              Rejoindre la famille CaribbeanVault
            </button>
          </div>
          <p style={{ color: "rgba(255,255,255,.5)", fontSize: "11px" }}>Gratuit - Sans engagement</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
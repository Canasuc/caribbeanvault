"use client";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import { LogoNuit } from "@/components/Logo";

const C = {
  nuit:     "#0D0518",
  violet:   "#1A0A2E",
  prune:    "#2D1A4A",
  mauve:    "#C084FC",
  mauveC:   "#A855F7",
  or:       "#E8B86D",
  orC:      "#D4A04A",
  orPale:   "#F5F0E8",
  lavande:  "#F5F0FF",
  texte:    "#E8E0F0",
  texteSec: "#A899B8",
  texteTert:"#6B5E7A",
  blanc:    "#FFFFFF",
};

const OEUVRES = [
  {
    id: 1,
    titre: "Femme aux Flamboyants",
    artiste: "Marie-Hélène Caumont",
    origine: "Martinique",
    annee: 2023,
    medium: "Huile sur toile · 120×90 cm",
    estimation: 8500,
    tokens: 85,
    disponibles: 31,
    prixToken: 100,
    royaltes: "5%",
    statut: "En levée",
    style: "Néo-créole expressionniste",
    couleurs: ["#C8192A", "#F5A623", "#1A6B5A", "#F0E6D2"],
    tag: "Martinique",
  },
  {
    id: 2,
    titre: "Mémoire de Saint-Domingue",
    artiste: "Jean-Claude Fortuné",
    origine: "Haïti",
    annee: 2022,
    medium: "Acrylique sur toile · 150×120 cm",
    estimation: 14000,
    tokens: 140,
    disponibles: 8,
    prixToken: 100,
    royaltes: "5%",
    statut: "Dernières places",
    style: "Art haïtien contemporain",
    couleurs: ["#1A3A8A", "#C8992A", "#8B1A1A", "#F5E8C0"],
    tag: "Haïti",
  },
  {
    id: 3,
    titre: "Forêt Amazonienne #3",
    artiste: "Kali Maloum",
    origine: "Guyane française",
    annee: 2024,
    medium: "Techniques mixtes · 200×140 cm",
    estimation: 11000,
    tokens: 110,
    disponibles: 110,
    prixToken: 100,
    royaltes: "5%",
    statut: "Nouveau",
    style: "Art contemporain guyanais",
    couleurs: ["#0D4A1A", "#5A8A3C", "#D4C07A", "#1A3D2E"],
    tag: "Guyane",
  },
  {
    id: 4,
    titre: "Bèlè Nocturne",
    artiste: "David Séjour",
    origine: "Guadeloupe",
    annee: 2023,
    medium: "Huile et or sur toile · 100×80 cm",
    estimation: 6200,
    tokens: 62,
    disponibles: 0,
    prixToken: 100,
    royaltes: "5%",
    statut: "Complet",
    style: "Abstraction caribéenne",
    couleurs: ["#0A0A1A", "#C8992A", "#4A2A6A", "#E8E0F0"],
    tag: "Guadeloupe",
  },
  {
    id: 5,
    titre: "Marché de Jacmel",
    artiste: "Roseline Augustin",
    origine: "Haïti",
    annee: 2021,
    medium: "Huile sur toile · 180×130 cm",
    estimation: 22000,
    tokens: 220,
    disponibles: 44,
    prixToken: 100,
    royaltes: "5%",
    statut: "En levée",
    style: "Réalisme naïf haïtien",
    couleurs: ["#E83A2A", "#F5A020", "#2A8A3A", "#4A2ACA"],
    tag: "Haïti · Millésime",
  },
  {
    id: 6,
    titre: "Droits Musicaux — Kasé Kò",
    artiste: "Collectif Zouk Numérique",
    origine: "Martinique & Guadeloupe",
    annee: 2024,
    medium: "Catalogue 12 titres · Droits numériques",
    estimation: 35000,
    tokens: 350,
    disponibles: 180,
    prixToken: 100,
    royaltes: "8%",
    statut: "En levée",
    style: "Droits musicaux · Zouk",
    couleurs: ["#7B2FBE", "#E8B86D", "#1A0A2E", "#F5E8C0"],
    tag: "Droits musicaux",
  },
];

const ARTISTES = [
  { nom: "Marie-Hélène Caumont", origine: "Martinique", style: "Néo-créole", expositions: "Paris, Fort-de-France, Miami", initiales: "MH" },
  { nom: "Jean-Claude Fortuné", origine: "Haïti", style: "Art haïtien", expositions: "Port-au-Prince, New York, Montréal", initiales: "JC" },
  { nom: "Kali Maloum", origine: "Guyane", style: "Contemporain", expositions: "Cayenne, Paris, Bruxelles", initiales: "KM" },
];

const POURQUOI = [
  { num: "01", titre: "Royalties perpétuelles", desc: "5% à 8% de chaque revente secondaire de vos tokens sont automatiquement distribués aux détenteurs. À vie.", icone: "∞" },
  { num: "02", titre: "Certification blockchain", desc: "Chaque œuvre est authentifiée, photographiée sous toutes ses faces et liée à un token unique sur XRPL.", icone: "◈" },
  { num: "03", titre: "Accès aux vernissages", desc: "Les membres reçoivent des invitations aux vernissages privés, ateliers d'artistes et ventes aux enchères.", icone: "✦" },
  { num: "04", titre: "Mécénat participatif", desc: "Vous financez directement la création de nouveaux projets artistiques caribéens sans intermédiaire.", icone: "❋" },
];

function PaletteOeuvre({ couleurs }: { couleurs: string[] }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {couleurs.map((c, i) => (
        <div key={i} style={{ width: "14px", height: "14px", borderRadius: "50%", background: c, border: "1px solid rgba(255,255,255,.15)" }} />
      ))}
    </div>
  );
}

function StatutBadge({ statut }: { statut: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    "En levée":         { bg: "rgba(192,132,252,.15)", color: C.mauve },
    "Dernières places": { bg: "rgba(232,184,109,.15)", color: C.or },
    "Nouveau":          { bg: "rgba(56,189,248,.15)",  color: "#38BDF8" },
    "Complet":          { bg: "rgba(255,255,255,.08)",  color: C.texteSec },
  };
  const s = map[statut] || map["En levée"];
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", letterSpacing: ".08em", border: `0.5px solid ${s.color}40` }}>
      {statut}
    </span>
  );
}

export default function ArtPage() {
  const [filtre, setFiltre] = useState<"tous" | "peinture" | "haiti" | "martinique" | "musique">("tous");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtrees = OEUVRES.filter(o => {
    if (filtre === "peinture") return o.medium.includes("toile");
    if (filtre === "haiti") return o.origine === "Haïti";
    if (filtre === "martinique") return o.origine === "Martinique";
    if (filtre === "musique") return o.medium.includes("Droits");
    return true;
  });

  return (
    <main style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: C.nuit, minHeight: "100vh", color: C.texte }}>

      {/* ── NAVBAR ── */}
      <nav style={{ background: `${C.nuit}F0`, backdropFilter: "blur(8px)", borderBottom: `0.5px solid ${C.prune}`, padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: C.or, fontSize: "10px", letterSpacing: ".15em", opacity: .7 }}>←</span>
            <LogoNuit size={0.45} />
          </Link>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            {["Les œuvres", "Les artistes", "Le cercle"].map(l => (
              <span key={l} style={{ color: C.texteSec, fontSize: "11px", cursor: "pointer", fontFamily: "system-ui", letterSpacing: ".05em" }}>{l}</span>
            ))}
            <Link href="#cercle" style={{
              background: "transparent", color: C.or, border: `0.5px solid ${C.or}`,
              padding: "7px 18px", borderRadius: "2px", fontSize: "11px",
              fontWeight: 400, textDecoration: "none", letterSpacing: ".15em",
              fontFamily: "system-ui", textTransform: "uppercase",
            }}>
              Rejoindre
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ART CRÉOLE ── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "80px 24px 56px" }}>
        {/* Fond CSS — nuit créole avec motifs géométriques */}
        <div style={{ position: "absolute", inset: 0, background: C.nuit }} />

        {/* Cercles concentriques décoratifs */}
        {[300, 220, 150, 90].map((size, i) => (
          <div key={i} style={{
            position: "absolute", right: "-40px", top: "50%",
            transform: "translateY(-50%)",
            width: `${size}px`, height: `${size}px`,
            borderRadius: "50%",
            border: `0.5px solid ${i % 2 === 0 ? C.mauve : C.or}${["18", "10", "0C", "08"][i]}`,
          }} />
        ))}

        {/* Formes géométriques inspirées art haïtien */}
        <div style={{ position: "absolute", top: "15%", right: "8%", width: "60px", height: "60px", border: `1px solid ${C.or}20`, transform: "rotate(45deg)" }} />
        <div style={{ position: "absolute", top: "60%", right: "15%", width: "30px", height: "30px", background: `${C.mauve}12`, borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: "30%", right: "25%", width: "1px", height: "80px", background: `${C.or}15` }} />

        {/* Étoiles / points lumineux */}
        {[...Array(16)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: i % 3 === 0 ? "2px" : "1px",
            height: i % 3 === 0 ? "2px" : "1px",
            borderRadius: "50%",
            background: i % 4 === 0 ? C.or : C.mauve,
            opacity: .3 + (i % 4) * .1,
            left: `${(i * 13 + 5) % 85}%`,
            top: `${(i * 19 + 8) % 85}%`,
          }} />
        ))}

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <div style={{ width: "32px", height: "0.5px", background: C.mauve }} />
            <span style={{ color: C.mauve, fontSize: "10px", letterSpacing: ".25em", textTransform: "uppercase", fontFamily: "system-ui" }}>
              Art créole & caribéen · Œuvres tokenisées
            </span>
          </div>

          <h1 style={{ color: C.orPale, fontSize: "clamp(26px, 4.5vw, 54px)", fontWeight: 300, lineHeight: 1.2, margin: "0 0 8px", maxWidth: "700px" }}>
            L'âme de la Caraïbe,
          </h1>
          <h1 style={{ color: C.or, fontSize: "clamp(26px, 4.5vw, 54px)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 24px", maxWidth: "700px", fontStyle: "italic" }}>
            fractionnée pour vous.
          </h1>
          <p style={{ color: C.texteSec, fontSize: "15px", lineHeight: 1.9, maxWidth: "520px", margin: "0 0 36px", fontFamily: "system-ui" }}>
            Co-possédez des peintures, sculptures et droits musicaux d'artistes caribéens reconnus. Percevez des royalties automatiques à chaque revente. Devenez mécène et investisseur à la fois.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="#oeuvres" style={{
              background: C.or, color: C.nuit, padding: "13px 28px",
              borderRadius: "2px", fontSize: "13px", fontWeight: 700,
              textDecoration: "none", letterSpacing: ".08em", fontFamily: "system-ui",
            }}>
              Découvrir les œuvres
            </Link>
            <Link href="#cercle" style={{
              background: "transparent", color: C.mauve,
              border: `0.5px solid ${C.mauve}`, padding: "13px 28px",
              borderRadius: "2px", fontSize: "13px", fontFamily: "system-ui",
              textDecoration: "none", letterSpacing: ".05em",
            }}>
              Rejoindre le cercle →
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ maxWidth: "1100px", margin: "48px auto 0", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: `0.5px solid ${C.prune}`, paddingTop: "32px", position: "relative" }}>
          {[
            { val: "5–8%", label: "Royalties perpétuelles", sub: "sur chaque revente" },
            { val: "100€", label: "Ticket minimum", sub: "par token" },
            { val: "XRPL", label: "Certification blockchain", sub: "immuable" },
            { val: "∞", label: "Durée des royalties", sub: "sans limite de temps" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "0 16px", borderRight: i < 3 ? `0.5px solid ${C.prune}` : "none" }}>
              <div style={{ color: C.or, fontSize: "22px", fontWeight: 700 }}>{s.val}</div>
              <div style={{ color: C.texteSec, fontSize: "10px", letterSpacing: ".08em", textTransform: "uppercase", marginTop: "4px", fontFamily: "system-ui" }}>{s.label}</div>
              <div style={{ color: C.texteTert, fontSize: "9px", marginTop: "2px", fontFamily: "system-ui" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ŒUVRES ── */}
      <section id="oeuvres" style={{ padding: "64px 24px", borderTop: `0.5px solid ${C.prune}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "system-ui" }}>
                La galerie
              </div>
              <h2 style={{ color: C.orPale, fontSize: "26px", fontWeight: 300, margin: 0 }}>
                Œuvres disponibles à la co-possession
              </h2>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", fontFamily: "system-ui" }}>
              {[
                { key: "tous", label: "Toutes" },
                { key: "peinture", label: "Peintures" },
                { key: "haiti", label: "Haïti" },
                { key: "martinique", label: "Martinique" },
                { key: "musique", label: "Musique" },
              ].map(f => (
                <button key={f.key} onClick={() => setFiltre(f.key as typeof filtre)} style={{
                  padding: "6px 14px", borderRadius: "20px", cursor: "pointer",
                  fontSize: "11px", fontWeight: 500, letterSpacing: ".03em",
                  border: filtre === f.key ? `0.5px solid ${C.mauve}` : `0.5px solid ${C.prune}`,
                  background: filtre === f.key ? `${C.mauve}18` : "transparent",
                  color: filtre === f.key ? C.mauve : C.texteSec,
                  transition: "all .15s",
                }}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grille œuvres */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {filtrees.map(oe => {
              const pct = Math.round(((oe.tokens - oe.disponibles) / oe.tokens) * 100);
              const complet = oe.disponibles === 0;
              return (
                <div key={oe.id}
                  onMouseEnter={() => setHovered(oe.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: C.violet, borderRadius: "4px", overflow: "hidden",
                    border: hovered === oe.id ? `0.5px solid ${C.or}` : `0.5px solid ${C.prune}`,
                    transition: "all .25s", opacity: complet ? .6 : 1,
                    transform: hovered === oe.id && !complet ? "translateY(-4px)" : "none",
                    boxShadow: hovered === oe.id && !complet ? `0 12px 32px ${C.mauve}18` : "none",
                  }}>

                  {/* Palette visuelle de l'œuvre — remplace la photo */}
                  <div style={{ height: "120px", position: "relative", overflow: "hidden" }}>
                    {/* Fond dégradé inspiré des couleurs de l'œuvre */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: `linear-gradient(135deg, ${oe.couleurs[0]} 0%, ${oe.couleurs[1]} 40%, ${oe.couleurs[2]} 70%, ${oe.couleurs[3] || oe.couleurs[0]} 100%)`,
                      opacity: .85,
                    }} />
                    {/* Motif géométrique inspiré art caribéen */}
                    <div style={{ position: "absolute", inset: 0 }}>
                      <div style={{ position: "absolute", top: "20%", left: "10%", width: "40px", height: "40px", border: `1px solid rgba(255,255,255,.2)`, transform: "rotate(45deg)" }} />
                      <div style={{ position: "absolute", bottom: "15%", right: "15%", width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255,255,255,.12)" }} />
                      <div style={{ position: "absolute", top: "40%", right: "30%", width: "1px", height: "40%", background: "rgba(255,255,255,.15)" }} />
                    </div>
                    {/* Overlay */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,3,24,.8) 0%, transparent 60%)" }} />
                    {/* Badges */}
                    <div style={{ position: "absolute", top: "10px", left: "10px" }}>
                      <span style={{ background: C.or, color: C.nuit, fontSize: "8px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", fontFamily: "system-ui", letterSpacing: ".05em" }}>
                        {oe.tag}
                      </span>
                    </div>
                    <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                      <StatutBadge statut={oe.statut} />
                    </div>
                    {/* Titre sur fond */}
                    <div style={{ position: "absolute", bottom: "10px", left: "12px", right: "12px" }}>
                      <div style={{ color: "rgba(255,255,255,.7)", fontSize: "9px", fontFamily: "system-ui", letterSpacing: ".05em", marginBottom: "2px" }}>{oe.artiste} · {oe.origine}</div>
                      <div style={{ color: "white", fontSize: "14px", fontWeight: 400 }}>{oe.titre}</div>
                    </div>
                  </div>

                  {/* Corps */}
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <div style={{ color: C.texteSec, fontSize: "10px", fontFamily: "system-ui", fontStyle: "italic" }}>{oe.style}</div>
                      <PaletteOeuvre couleurs={oe.couleurs} />
                    </div>
                    <div style={{ color: C.texteTert, fontSize: "10px", fontFamily: "system-ui", marginBottom: "12px" }}>{oe.medium} · {oe.annee}</div>

                    {/* Métriques */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "12px" }}>
                      {[
                        { label: "Estimation", val: `${(oe.estimation / 1000).toFixed(0)}k€` },
                        { label: "Royalties", val: oe.royaltes },
                        { label: "Token", val: `${oe.prixToken}€` },
                      ].map(m => (
                        <div key={m.label} style={{ background: C.prune, borderRadius: "3px", padding: "8px 6px", textAlign: "center" }}>
                          <div style={{ color: C.or, fontSize: "13px", fontWeight: 700 }}>{m.val}</div>
                          <div style={{ color: C.texteTert, fontSize: "9px", fontFamily: "system-ui", marginTop: "1px" }}>{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Barre progression */}
                    <div style={{ marginBottom: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={{ color: C.texteTert, fontSize: "10px", fontFamily: "system-ui" }}>Tokens levés</span>
                        <span style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, fontFamily: "system-ui" }}>{pct}% · {oe.disponibles} restants</span>
                      </div>
                      <div style={{ background: C.prune, borderRadius: "20px", height: "4px" }}>
                        <div style={{ background: pct >= 95 ? "#E24B4A" : C.mauve, height: "100%", borderRadius: "20px", width: `${pct}%`, transition: "width .5s" }} />
                      </div>
                    </div>

                    {/* CTA */}
                    {complet ? (
                      <div style={{ background: C.prune, color: C.texteTert, padding: "10px", borderRadius: "3px", fontSize: "11px", textAlign: "center", fontFamily: "system-ui" }}>
                        Complet · Liste d'attente →
                      </div>
                    ) : (
                      <Link href="#cercle" style={{
                        display: "block", background: "transparent", color: C.or,
                        border: `0.5px solid ${C.or}60`, padding: "10px",
                        borderRadius: "3px", fontSize: "12px", textAlign: "center",
                        fontWeight: 700, textDecoration: "none", fontFamily: "system-ui",
                        letterSpacing: ".08em", transition: "all .15s",
                      }}>
                        Acquérir des fractions →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LES ARTISTES ── */}
      <section style={{ background: C.violet, padding: "64px 24px", borderTop: `0.5px solid ${C.prune}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>
              Les créateurs
            </div>
            <h2 style={{ color: C.orPale, fontSize: "26px", fontWeight: 300, margin: 0 }}>
              Des artistes caribéens reconnus
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {ARTISTES.map((a, i) => (
              <div key={i} style={{ background: C.prune, borderRadius: "4px", padding: "24px", border: `0.5px solid ${C.mauve}20` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "50%",
                    background: `linear-gradient(135deg, ${C.mauve}40, ${C.or}40)`,
                    border: `0.5px solid ${C.or}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "15px", fontWeight: 700, color: C.or, fontFamily: "system-ui",
                  }}>
                    {a.initiales}
                  </div>
                  <div>
                    <div style={{ color: C.orPale, fontSize: "14px", fontWeight: 400 }}>{a.nom}</div>
                    <div style={{ color: C.mauve, fontSize: "11px", fontFamily: "system-ui", marginTop: "2px" }}>{a.origine} · {a.style}</div>
                  </div>
                </div>
                <div style={{ color: C.texteTert, fontSize: "11px", fontFamily: "system-ui", lineHeight: 1.6 }}>
                  Expositions : {a.expositions}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POURQUOI ── */}
      <section style={{ padding: "64px 24px", borderTop: `0.5px solid ${C.prune}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>
              L'investissement autrement
            </div>
            <h2 style={{ color: C.orPale, fontSize: "26px", fontWeight: 300, margin: 0 }}>
              Mécène et investisseur à la fois
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
            {POURQUOI.map((p, i) => (
              <div key={i} style={{ background: i % 2 === 0 ? C.violet : C.prune, padding: "28px 20px" }}>
                <div style={{ color: C.or, fontSize: "28px", opacity: .6, marginBottom: "12px", fontFamily: "system-ui" }}>{p.icone}</div>
                <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".1em", marginBottom: "8px", fontFamily: "system-ui", textTransform: "uppercase" }}>{p.num}</div>
                <div style={{ color: C.orPale, fontSize: "13px", fontWeight: 400, marginBottom: "8px" }}>{p.titre}</div>
                <div style={{ color: C.texteSec, fontSize: "12px", lineHeight: 1.7, fontFamily: "system-ui" }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITATION ── */}
      <section style={{ background: C.violet, padding: "48px 24px", borderTop: `0.5px solid ${C.prune}` }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "40px", height: "0.5px", background: C.or, marginTop: "12px" }} />
            <span style={{ color: C.or, fontSize: "28px", fontWeight: 300 }}>"</span>
            <div style={{ width: "40px", height: "0.5px", background: C.or, marginTop: "12px" }} />
          </div>
          <p style={{ color: C.lavande, fontSize: "18px", fontWeight: 300, lineHeight: 1.7, fontStyle: "italic", margin: "0 0 20px" }}>
            L'art caribéen est massivement sous-valorisé sur le marché mondial. CaribbeanVault change cela — en donnant aux investisseurs l'accès à des œuvres uniques, et aux artistes les moyens de créer librement.
          </p>
          <div style={{ color: C.or, fontSize: "10px", fontFamily: "system-ui", letterSpacing: ".2em", textTransform: "uppercase" }}>
            CaribbeanVault · Manifeste fondateur
          </div>
        </div>
      </section>

      {/* ── REJOINDRE LE CERCLE ── */}
      <section id="cercle" style={{ padding: "72px 24px", borderTop: `0.5px solid ${C.prune}` }}>
        <div style={{ maxWidth: "580px", margin: "0 auto", textAlign: "center" }}>
          {/* Décor cercles concentriques */}
          <div style={{ position: "relative", width: "80px", height: "80px", margin: "0 auto 28px" }}>
            {[80, 60, 40].map((size, i) => (
              <div key={i} style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: `${size}px`, height: `${size}px`,
                borderRadius: "50%",
                border: `0.5px solid ${i === 0 ? C.mauve : C.or}${["30", "50", "80"][i]}`,
              }} />
            ))}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "20px" }}>✦</div>
          </div>

          <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".25em", textTransform: "uppercase", marginBottom: "16px", fontFamily: "system-ui" }}>
            Accès privilégié
          </div>
          <h2 style={{ color: C.orPale, fontSize: "26px", fontWeight: 300, lineHeight: 1.3, margin: "0 0 14px" }}>
            Rejoignez la famille CaribbeanVault
          </h2>
          <p style={{ color: C.texteSec, fontSize: "14px", lineHeight: 1.8, margin: "0 0 32px", fontFamily: "system-ui" }}>
            Accédez en avant-première aux nouvelles œuvres, aux vernissages privés et aux ateliers d'artistes. Un cercle restreint de mécènes-investisseurs passionnés par la création caribéenne.
          </p>

          <div style={{ background: `${C.violet}80`, border: `0.5px solid ${C.mauve}30`, borderRadius: "4px", padding: "24px", marginBottom: "14px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
              <input type="text" placeholder="Prénom" style={{ padding: "11px 14px", background: `${C.nuit}90`, border: `0.5px solid ${C.prune}`, borderRadius: "2px", color: C.orPale, fontSize: "13px", outline: "none", fontFamily: "system-ui" }} />
              <input type="text" placeholder="Nom" style={{ padding: "11px 14px", background: `${C.nuit}90`, border: `0.5px solid ${C.prune}`, borderRadius: "2px", color: C.orPale, fontSize: "13px", outline: "none", fontFamily: "system-ui" }} />
            </div>
            <input type="email" placeholder="Votre adresse email" style={{ width: "100%", padding: "11px 14px", background: `${C.nuit}90`, border: `0.5px solid ${C.prune}`, borderRadius: "2px", color: C.orPale, fontSize: "13px", outline: "none", marginBottom: "10px", boxSizing: "border-box", fontFamily: "system-ui" }} />
            <button style={{
              width: "100%", background: C.or, color: C.nuit, border: "none",
              padding: "13px", borderRadius: "2px", fontSize: "13px", fontWeight: 700,
              cursor: "pointer", letterSpacing: ".1em", fontFamily: "system-ui", textTransform: "uppercase",
            }}>
              Rejoindre la famille CaribbeanVault
            </button>
          </div>
          <p style={{ color: C.texteTert, fontSize: "10px", fontFamily: "system-ui", letterSpacing: ".05em" }}>
            Gratuit · Sélection sur dossier · Aucun engagement
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
<Footer />

    </main>
  );
}
"use client";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import { LogoNuit } from "@/components/Logo";
import NavbarAuth from "@/components/NavbarAuth";
import { useBreakpoint } from "@/hooks/useBreakpoint";

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
  { id: 1, titre: "Femme aux Flamboyants", artiste: "Marie-Helene Caumont", origine: "Martinique", annee: 2023, medium: "Huile sur toile 120x90 cm", estimation: 8500, tokens: 85, disponibles: 31, prixToken: 100, royaltes: "5%", statut: "En levee", style: "Neo-creole expressionniste", couleurs: ["#C8192A", "#F5A623", "#1A6B5A", "#F0E6D2"], tag: "Martinique" },
  { id: 2, titre: "Memoire de Saint-Domingue", artiste: "Jean-Claude Fortune", origine: "Haiti", annee: 2022, medium: "Acrylique sur toile 150x120 cm", estimation: 14000, tokens: 140, disponibles: 8, prixToken: 100, royaltes: "5%", statut: "Dernieres places", style: "Art haitien contemporain", couleurs: ["#1A3A8A", "#C8992A", "#8B1A1A", "#F5E8C0"], tag: "Haiti" },
  { id: 3, titre: "Foret Amazonienne 3", artiste: "Kali Maloum", origine: "Guyane francaise", annee: 2024, medium: "Techniques mixtes 200x140 cm", estimation: 11000, tokens: 110, disponibles: 110, prixToken: 100, royaltes: "5%", statut: "Nouveau", style: "Art contemporain guyanais", couleurs: ["#0D4A1A", "#5A8A3C", "#D4C07A", "#1A3D2E"], tag: "Guyane" },
  { id: 4, titre: "Bele Nocturne", artiste: "David Sejour", origine: "Guadeloupe", annee: 2023, medium: "Huile et or sur toile 100x80 cm", estimation: 6200, tokens: 62, disponibles: 0, prixToken: 100, royaltes: "5%", statut: "Complet", style: "Abstraction caribeenne", couleurs: ["#0A0A1A", "#C8992A", "#4A2A6A", "#E8E0F0"], tag: "Guadeloupe" },
  { id: 5, titre: "Marche de Jacmel", artiste: "Roseline Augustin", origine: "Haiti", annee: 2021, medium: "Huile sur toile 180x130 cm", estimation: 22000, tokens: 220, disponibles: 44, prixToken: 100, royaltes: "5%", statut: "En levee", style: "Realisme naif haitien", couleurs: ["#E83A2A", "#F5A020", "#2A8A3A", "#4A2ACA"], tag: "Haiti Millesime" },
  { id: 6, titre: "Droits Musicaux - Kase Ko", artiste: "Collectif Zouk Numerique", origine: "Martinique & Guadeloupe", annee: 2024, medium: "Catalogue 12 titres Droits numeriques", estimation: 35000, tokens: 350, disponibles: 180, prixToken: 100, royaltes: "8%", statut: "En levee", style: "Droits musicaux Zouk", couleurs: ["#7B2FBE", "#E8B86D", "#1A0A2E", "#F5E8C0"], tag: "Droits musicaux" },
];

const ARTISTES = [
  { nom: "Marie-Helene Caumont", origine: "Martinique", style: "Neo-creole", expositions: "Paris, Fort-de-France, Miami", initiales: "MH" },
  { nom: "Jean-Claude Fortune", origine: "Haiti", style: "Art haitien", expositions: "Port-au-Prince, New York, Montreal", initiales: "JC" },
  { nom: "Kali Maloum", origine: "Guyane", style: "Contemporain", expositions: "Cayenne, Paris, Bruxelles", initiales: "KM" },
];

const POURQUOI = [
  { num: "01", titre: "Royalties perpetuelles", desc: "5% a 8% de chaque revente secondaire distribues automatiquement. A vie.", icone: "∞" },
  { num: "02", titre: "Certification blockchain", desc: "Chaque oeuvre authentifiee et liee a un token unique sur XRPL.", icone: "◈" },
  { num: "03", titre: "Acces aux vernissages", desc: "Invitations aux vernissages prives, ateliers et ventes aux encheres.", icone: "✦" },
  { num: "04", titre: "Mecenat participatif", desc: "Financez directement la creation artistique caribeenne sans intermediaire.", icone: "❋" },
];

function PaletteOeuvre({ couleurs }: { couleurs: string[] }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {couleurs.map((c, i) => (
        <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c, border: "1px solid rgba(255,255,255,.15)" }} />
      ))}
    </div>
  );
}

function StatutBadge({ statut }: { statut: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    "En levee":         { bg: "rgba(192,132,252,.15)", color: C.mauve },
    "Dernieres places": { bg: "rgba(232,184,109,.15)", color: C.or },
    "Nouveau":          { bg: "rgba(56,189,248,.15)",  color: "#38BDF8" },
    "Complet":          { bg: "rgba(255,255,255,.08)",  color: C.texteSec },
  };
  const s = map[statut] || map["En levee"];
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", letterSpacing: ".08em", border: `0.5px solid ${s.color}40` }}>
      {statut}
    </span>
  );
}

export default function ArtPage() {
  const [filtre, setFiltre] = useState<"tous" | "peinture" | "haiti" | "martinique" | "musique">("tous");
  const [hovered, setHovered] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  const filtrees = OEUVRES.filter(o => {
    if (filtre === "peinture") return o.medium.includes("toile");
    if (filtre === "haiti") return o.origine === "Haiti";
    if (filtre === "martinique") return o.origine === "Martinique";
    if (filtre === "musique") return o.medium.includes("Droits");
    return true;
  });

  const colsOeuvres = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  const colsArtistes = isMobile ? "1fr" : "repeat(3, 1fr)";
  const colsPourquoi = isMobile ? "1fr 1fr" : "repeat(4, 1fr)";

  return (
    <main style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: C.nuit, minHeight: "100vh", color: C.texte }}>

      {/* NAVBAR */}
      <nav style={{ background: `${C.nuit}F0`, backdropFilter: "blur(8px)", borderBottom: `0.5px solid ${C.prune}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <LogoNuit size={isMobile ? 0.38 : 0.45} />
          </Link>
          {!isMobile && (
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              {["Les oeuvres", "Les artistes", "Le cercle"].map(l => (
                <span key={l} style={{ color: C.texteSec, fontSize: "11px", cursor: "pointer", fontFamily: "system-ui" }}>{l}</span>
              ))}
              <NavbarAuth buttonBg="#E8B86D" buttonColor="#0D0518" textColor="#A899B8" borderColor="rgba(232,184,109,.3)" />
            </div>
          )}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <NavbarAuth buttonBg="#E8B86D" buttonColor="#0D0518" textColor="#A899B8" borderColor="rgba(232,184,109,.3)" />
              <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}>
                {[0,1,2].map(i => <div key={i} style={{ width: "20px", height: "2px", background: C.or, borderRadius: "2px" }} />)}
              </button>
            </div>
          )}
        </div>
        {isMobile && menuOpen && (
          <div style={{ background: C.violet, borderTop: `0.5px solid ${C.prune}`, padding: "8px 16px" }}>
            {["Les oeuvres", "Les artistes", "Le cercle"].map(l => (
              <div key={l} onClick={() => setMenuOpen(false)} style={{ color: C.texteSec, fontSize: "14px", fontFamily: "system-ui", padding: "12px 0", borderBottom: `0.5px solid ${C.prune}`, cursor: "pointer" }}>{l}</div>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", padding: isMobile ? "48px 16px 36px" : "80px 24px 56px" }}>
        <div style={{ position: "absolute", inset: 0, background: C.nuit }} />
        {!isMobile && [300, 220, 150, 90].map((size, i) => (
          <div key={i} style={{ position: "absolute", right: "-40px", top: "50%", transform: "translateY(-50%)", width: `${size}px`, height: `${size}px`, borderRadius: "50%", border: `0.5px solid ${i % 2 === 0 ? C.mauve : C.or}${["18", "10", "0C", "08"][i]}` }} />
        ))}
        {[...Array(isMobile ? 8 : 16)].map((_, i) => (
          <div key={i} style={{ position: "absolute", width: "1px", height: "1px", borderRadius: "50%", background: i % 4 === 0 ? C.or : C.mauve, opacity: .3, left: `${(i * 13 + 5) % 85}%`, top: `${(i * 19 + 8) % 85}%` }} />
        ))}

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "24px", height: "0.5px", background: C.mauve }} />
            <span style={{ color: C.mauve, fontSize: "10px", letterSpacing: ".2em", textTransform: "uppercase", fontFamily: "system-ui" }}>
              Art creole & caribeen · Oeuvres tokenisees
            </span>
          </div>
          <h1 style={{ color: C.orPale, fontSize: isMobile ? "26px" : "clamp(26px, 4.5vw, 54px)", fontWeight: 300, lineHeight: 1.2, margin: "0 0 6px", maxWidth: "700px" }}>
            {"L'ame de la Caraibe,"}
          </h1>
          <h1 style={{ color: C.or, fontSize: isMobile ? "26px" : "clamp(26px, 4.5vw, 54px)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 20px", maxWidth: "700px", fontStyle: "italic" }}>
            fractionnee pour vous.
          </h1>
          <p style={{ color: C.texteSec, fontSize: isMobile ? "13px" : "15px", lineHeight: 1.9, maxWidth: "520px", margin: "0 0 28px", fontFamily: "system-ui" }}>
            Co-possedez des peintures, sculptures et droits musicaux d'artistes carribeens reconnus. Percevez des royalties automatiques a chaque revente.
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Link href="#oeuvres" style={{ background: C.or, color: C.nuit, padding: isMobile ? "11px 20px" : "13px 28px", borderRadius: "2px", fontSize: "13px", fontWeight: 700, textDecoration: "none", fontFamily: "system-ui" }}>
              Decouvrir les oeuvres
            </Link>
            <Link href="#cercle" style={{ background: "transparent", color: C.mauve, border: `0.5px solid ${C.mauve}`, padding: isMobile ? "11px 20px" : "13px 28px", borderRadius: "2px", fontSize: "13px", fontFamily: "system-ui", textDecoration: "none" }}>
              Rejoindre le cercle →
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ maxWidth: "1100px", margin: isMobile ? "32px auto 0" : "48px auto 0", display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", borderTop: `0.5px solid ${C.prune}`, paddingTop: "24px", position: "relative" }}>
          {[
            { val: "5-8%", label: "Royalties", sub: "sur chaque revente" },
            { val: "100€", label: "Ticket minimum", sub: "par token" },
            { val: "XRPL", label: "Blockchain", sub: "certification immuable" },
            { val: "∞", label: "Duree royalties", sub: "sans limite" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: isMobile ? "12px 8px" : "0 16px", borderRight: isMobile ? (i % 2 === 0 ? `0.5px solid ${C.prune}` : "none") : (i < 3 ? `0.5px solid ${C.prune}` : "none"), borderBottom: isMobile && i < 2 ? `0.5px solid ${C.prune}` : "none", paddingBottom: isMobile && i < 2 ? "12px" : "0" }}>
              <div style={{ color: C.or, fontSize: isMobile ? "18px" : "22px", fontWeight: 700 }}>{s.val}</div>
              <div style={{ color: C.texteSec, fontSize: "10px", letterSpacing: ".08em", textTransform: "uppercase", marginTop: "4px", fontFamily: "system-ui" }}>{s.label}</div>
              {!isMobile && <div style={{ color: C.texteTert, fontSize: "9px", marginTop: "2px", fontFamily: "system-ui" }}>{s.sub}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* OEUVRES */}
      <section id="oeuvres" style={{ padding: isMobile ? "40px 16px" : "64px 24px", borderTop: `0.5px solid ${C.prune}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px", flexWrap: "wrap", gap: "14px" }}>
            <div>
              <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "system-ui" }}>La galerie</div>
              <h2 style={{ color: C.orPale, fontSize: isMobile ? "20px" : "26px", fontWeight: 300, margin: 0 }}>Oeuvres disponibles</h2>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", fontFamily: "system-ui" }}>
              {[{ key: "tous", label: "Toutes" }, { key: "peinture", label: "Peintures" }, { key: "haiti", label: "Haiti" }, { key: "martinique", label: "Martinique" }, { key: "musique", label: "Musique" }].map(f => (
                <button key={f.key} onClick={() => setFiltre(f.key as typeof filtre)} style={{ padding: "5px 12px", borderRadius: "20px", cursor: "pointer", fontSize: "11px", fontWeight: 500, border: filtre === f.key ? `0.5px solid ${C.mauve}` : `0.5px solid ${C.prune}`, background: filtre === f.key ? `${C.mauve}18` : "transparent", color: filtre === f.key ? C.mauve : C.texteSec, transition: "all .15s" }}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: colsOeuvres, gap: "14px" }}>
            {filtrees.map(oe => {
              const pct = Math.round(((oe.tokens - oe.disponibles) / oe.tokens) * 100);
              const complet = oe.disponibles === 0;
              return (
                <div key={oe.id}
                  onMouseEnter={() => setHovered(oe.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ background: C.violet, borderRadius: "4px", overflow: "hidden", border: hovered === oe.id ? `0.5px solid ${C.or}` : `0.5px solid ${C.prune}`, transition: "all .25s", opacity: complet ? .6 : 1, transform: hovered === oe.id && !complet ? "translateY(-4px)" : "none" }}>
                  <div style={{ height: "110px", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${oe.couleurs[0]} 0%, ${oe.couleurs[1]} 40%, ${oe.couleurs[2]} 70%, ${oe.couleurs[3] || oe.couleurs[0]} 100%)`, opacity: .85 }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,3,24,.8) 0%, transparent 60%)" }} />
                    <div style={{ position: "absolute", top: "8px", left: "8px" }}>
                      <span style={{ background: C.or, color: C.nuit, fontSize: "8px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", fontFamily: "system-ui" }}>{oe.tag}</span>
                    </div>
                    <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                      <StatutBadge statut={oe.statut} />
                    </div>
                    <div style={{ position: "absolute", bottom: "8px", left: "10px", right: "10px" }}>
                      <div style={{ color: "rgba(255,255,255,.7)", fontSize: "9px", fontFamily: "system-ui", marginBottom: "2px" }}>{oe.artiste}</div>
                      <div style={{ color: "white", fontSize: "13px", fontWeight: 400 }}>{oe.titre}</div>
                    </div>
                  </div>
                  <div style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <div style={{ color: C.texteSec, fontSize: "10px", fontFamily: "system-ui", fontStyle: "italic" }}>{oe.style}</div>
                      <PaletteOeuvre couleurs={oe.couleurs} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px", marginBottom: "10px" }}>
                      {[{ label: "Estimation", val: `${(oe.estimation / 1000).toFixed(0)}k€` }, { label: "Royalties", val: oe.royaltes }, { label: "Token", val: `${oe.prixToken}€` }].map(m => (
                        <div key={m.label} style={{ background: C.prune, borderRadius: "3px", padding: "6px 4px", textAlign: "center" }}>
                          <div style={{ color: C.or, fontSize: "12px", fontWeight: 700 }}>{m.val}</div>
                          <div style={{ color: C.texteTert, fontSize: "9px", fontFamily: "system-ui", marginTop: "1px" }}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                        <span style={{ color: C.texteTert, fontSize: "10px", fontFamily: "system-ui" }}>Tokens leves</span>
                        <span style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, fontFamily: "system-ui" }}>{pct}%</span>
                      </div>
                      <div style={{ background: C.prune, borderRadius: "20px", height: "3px" }}>
                        <div style={{ background: pct >= 95 ? "#E24B4A" : C.mauve, height: "100%", borderRadius: "20px", width: `${pct}%` }} />
                      </div>
                    </div>
                    {complet ? (
                      <div style={{ background: C.prune, color: C.texteTert, padding: "9px", borderRadius: "3px", fontSize: "11px", textAlign: "center", fontFamily: "system-ui" }}>
                        {"Complet · Liste d'attente →"}
                      </div>
                    ) : (
                      <Link href="#cercle" style={{ display: "block", background: "transparent", color: C.or, border: `0.5px solid ${C.or}60`, padding: "9px", borderRadius: "3px", fontSize: "12px", textAlign: "center", fontWeight: 700, textDecoration: "none", fontFamily: "system-ui" }}>
                        Acquerir des fractions →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ARTISTES */}
      <section style={{ background: C.violet, padding: isMobile ? "40px 16px" : "64px 24px", borderTop: `0.5px solid ${C.prune}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>Les createurs</div>
            <h2 style={{ color: C.orPale, fontSize: isMobile ? "20px" : "26px", fontWeight: 300, margin: 0 }}>Des artistes carribeens reconnus</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: colsArtistes, gap: "14px" }}>
            {ARTISTES.map((a, i) => (
              <div key={i} style={{ background: C.prune, borderRadius: "4px", padding: isMobile ? "18px" : "24px", border: `0.5px solid ${C.mauve}20` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: `linear-gradient(135deg, ${C.mauve}40, ${C.or}40)`, border: `0.5px solid ${C.or}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: C.or, fontFamily: "system-ui", flexShrink: 0 }}>
                    {a.initiales}
                  </div>
                  <div>
                    <div style={{ color: C.orPale, fontSize: "13px", fontWeight: 400 }}>{a.nom}</div>
                    <div style={{ color: C.mauve, fontSize: "11px", fontFamily: "system-ui", marginTop: "2px" }}>{a.origine} · {a.style}</div>
                  </div>
                </div>
                {!isMobile && <div style={{ color: C.texteTert, fontSize: "11px", fontFamily: "system-ui", lineHeight: 1.6 }}>Expositions : {a.expositions}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI */}
      <section style={{ padding: isMobile ? "40px 16px" : "64px 24px", borderTop: `0.5px solid ${C.prune}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>{"L'investissement autrement"}</div>
            <h2 style={{ color: C.orPale, fontSize: isMobile ? "20px" : "26px", fontWeight: 300, margin: 0 }}>Mecene et investisseur a la fois</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: colsPourquoi, gap: "2px" }}>
            {POURQUOI.map((p, i) => (
              <div key={i} style={{ background: i % 2 === 0 ? C.violet : C.prune, padding: isMobile ? "20px 14px" : "28px 20px" }}>
                <div style={{ color: C.or, fontSize: "24px", opacity: .6, marginBottom: "10px", fontFamily: "system-ui" }}>{p.icone}</div>
                <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".1em", marginBottom: "6px", fontFamily: "system-ui", textTransform: "uppercase" }}>{p.num}</div>
                <div style={{ color: C.orPale, fontSize: "12px", fontWeight: 400, marginBottom: "6px" }}>{p.titre}</div>
                {!isMobile && <div style={{ color: C.texteSec, fontSize: "11px", lineHeight: 1.7, fontFamily: "system-ui" }}>{p.desc}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CITATION */}
      <section style={{ background: C.violet, padding: isMobile ? "36px 16px" : "48px 24px", borderTop: `0.5px solid ${C.prune}` }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "32px", height: "0.5px", background: C.or, marginTop: "12px" }} />
            <span style={{ color: C.or, fontSize: "28px", fontWeight: 300 }}>"</span>
            <div style={{ width: "32px", height: "0.5px", background: C.or, marginTop: "12px" }} />
          </div>
          <p style={{ color: C.lavande, fontSize: isMobile ? "15px" : "18px", fontWeight: 300, lineHeight: 1.7, fontStyle: "italic", margin: "0 0 16px" }}>
            {"L'art caribeen est massivement sous-valorise sur le marche mondial. CaribbeanVault change cela en donnant aux investisseurs l'acces a des oeuvres uniques."}
          </p>
          <div style={{ color: C.or, fontSize: "10px", fontFamily: "system-ui", letterSpacing: ".2em", textTransform: "uppercase" }}>
            CaribbeanVault · Manifeste fondateur
          </div>
        </div>
      </section>

      {/* REJOINDRE */}
      <section id="cercle" style={{ padding: isMobile ? "48px 16px" : "72px 24px", borderTop: `0.5px solid ${C.prune}` }}>
        <div style={{ maxWidth: "580px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ position: "relative", width: "70px", height: "70px", margin: "0 auto 24px" }}>
            {[70, 52, 36].map((size, i) => (
              <div key={i} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: `${size}px`, height: `${size}px`, borderRadius: "50%", border: `0.5px solid ${i === 0 ? C.mauve : C.or}${["30", "50", "80"][i]}` }} />
            ))}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "18px" }}>✦</div>
          </div>
          <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".25em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "system-ui" }}>
            Acces privilegie
          </div>
          <h2 style={{ color: C.orPale, fontSize: isMobile ? "22px" : "26px", fontWeight: 300, lineHeight: 1.3, margin: "0 0 12px" }}>
            Rejoignez la famille CaribbeanVault
          </h2>
          <p style={{ color: C.texteSec, fontSize: "14px", lineHeight: 1.8, margin: "0 0 28px", fontFamily: "system-ui" }}>
            {"Accedez en avant-premiere aux nouvelles oeuvres, aux vernissages prives et aux ateliers d'artistes."}
          </p>
          <Link href="/kyc" style={{ display: "inline-block", background: C.or, color: C.nuit, padding: "14px 32px", borderRadius: "2px", fontSize: "13px", fontWeight: 700, textDecoration: "none", letterSpacing: ".1em", fontFamily: "system-ui", textTransform: "uppercase" }}>
            Rejoindre la famille CaribbeanVault
          </Link>
          <p style={{ color: C.texteTert, fontSize: "10px", fontFamily: "system-ui", marginTop: "14px" }}>
            {"Gratuit · Selection sur dossier · Aucun engagement"}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
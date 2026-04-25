"use client";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import { LogoEmeraude } from "@/components/Logo";
import NavbarAuth from "@/components/NavbarAuth";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const C = {
  noir:     "#0D1A08",
  foret:    "#1E2D14",
  vert:     "#2C3A1E",
  feuille:  "#5A8A3C",
  menthe:   "#8FBF6A",
  paille:   "#D4C07A",
  pailleC:  "#C8A84B",
  terre:    "#F5F2EC",
  terreB:   "#EDE8DE",
  cremeV:   "#EAF3DE",
  texte:    "#1E2010",
  texteSec: "#4A5940",
  texteTert:"#7A8A6A",
  blanc:    "#FFFFFF",
};

const PARCELLES = [
  { id: 1, culture: "Banane IGP Antilles", producteur: "Cooperative GIPAM", lieu: "Capesterre-Belle-Eau, Guadeloupe", surface: "18 hectares", certification: "IGP Antilles · Agriculture Raisonnee", tokens: 160, disponibles: 72, prixToken: 250, rendementEst: "12-16%", duree: "12 mois", recolte: "Juillet 2026", statut: "En levee", icone: "🍌", tag: "IGP Certifiee", tagColor: "#3B6D11" },
  { id: 2, culture: "Cafe Bonifieur", producteur: "Domaine Vanibel", lieu: "Vieux-Habitants, Guadeloupe", surface: "4 hectares", certification: "Grand Cru · Agriculture Biologique", tokens: 80, disponibles: 18, prixToken: 400, rendementEst: "15-22%", duree: "14 mois", recolte: "Octobre 2026", statut: "Presque complet", icone: "☕", tag: "Grand Cru", tagColor: "#854F0B" },
  { id: 3, culture: "Cacao Fin de Martinique", producteur: "Plantation Bellevue", lieu: "Le Robert, Martinique", surface: "8 hectares", certification: "Cacao Fin · Bio certifie AB", tokens: 100, disponibles: 100, prixToken: 300, rendementEst: "13-18%", duree: "18 mois", recolte: "Decembre 2026", statut: "Nouveau", icone: "🍫", tag: "Bio AB", tagColor: "#5A8A3C" },
  { id: 4, culture: "Bois Certifie FSC", producteur: "Groupement Forestier Guyane", lieu: "Saint-Laurent-du-Maroni, Guyane", surface: "2 400 hectares", certification: "FSC Gestion Durable · Credits Carbone", tokens: 500, disponibles: 312, prixToken: 150, rendementEst: "10-14%", duree: "24 mois", recolte: "Mars 2027", statut: "En levee", icone: "🌳", tag: "FSC + Carbone", tagColor: "#085041" },
  { id: 5, culture: "Ananas Victoria", producteur: "Famille Montout", lieu: "Le Moule, Guadeloupe", surface: "6 hectares", certification: "Agriculture Raisonnee · Sans pesticides", tokens: 60, disponibles: 60, prixToken: 200, rendementEst: "10-14%", duree: "10 mois", recolte: "Juin 2026", statut: "Nouveau", icone: "🍍", tag: "Sans pesticides", tagColor: "#5A8A3C" },
  { id: 6, culture: "Canne a Sucre AOC", producteur: "Distillerie Longueteau", lieu: "Capesterre, Guadeloupe", surface: "45 hectares", certification: "AOC Rhum Agricole · Filiere selective", tokens: 200, disponibles: 0, prixToken: 180, rendementEst: "11-15%", duree: "12 mois", recolte: "Mai 2026", statut: "Complet", icone: "🌾", tag: "AOC", tagColor: "#C8A84B" },
];

const VALEURS = [
  { icone: "🌱", titre: "Tracabilite totale", desc: "Chaque token est lie a une parcelle geolocalisee. Photos, rapports de recolte et analyses de sol disponibles dans votre espace." },
  { icone: "🤝", titre: "Impact direct", desc: "Vous financez directement des producteurs carribeens independants, sans intermediaire bancaire." },
  { icone: "🌿", titre: "Agriculture durable", desc: "Seules les exploitations certifiees Bio, IGP, FSC ou Agriculture Raisonnee sont acceptees sur la plateforme." },
  { icone: "💧", titre: "Force majeure protegee", desc: "En cas de catastrophe climatique, une assurance recolte couvre jusqu'a 80% de la valeur des tokens." },
];

const CALENDRIER = [
  { mois: "Jan-Fev", label: "Selection des parcelles", color: C.foret },
  { mois: "Mar-Avr", label: "Levee de fonds", color: C.vert },
  { mois: "Mai-Nov", label: "Croissance & suivi", color: C.feuille },
  { mois: "Dec", label: "Recolte & distribution", color: C.pailleC },
];

function StatutBadge({ statut }: { statut: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    "En levee":        { bg: C.cremeV, color: "#3B6D11" },
    "Presque complet": { bg: "#FAEEDA", color: "#854F0B" },
    "Nouveau":         { bg: "#E6F1FB", color: "#0C447C" },
    "Complet":         { bg: "#F1EFE8", color: "#444441" },
  };
  const s = map[statut] || map["En levee"];
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "2px", letterSpacing: ".08em", textTransform: "uppercase" }}>
      {statut}
    </span>
  );
}

export default function AgriculturePage() {
  const [filtre, setFiltre] = useState<"tous" | "guadeloupe" | "martinique" | "guyane" | "bio">("tous");
  const [hovered, setHovered] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  const filtrees = PARCELLES.filter(p => {
    if (filtre === "guadeloupe") return p.lieu.includes("Guadeloupe");
    if (filtre === "martinique") return p.lieu.includes("Martinique");
    if (filtre === "guyane") return p.lieu.includes("Guyane");
    if (filtre === "bio") return p.certification.includes("Bio") || p.certification.includes("FSC");
    return true;
  });

  const colsParcelles = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  const colsValeurs = isMobile ? "1fr 1fr" : "repeat(4, 1fr)";
  const colsCalendrier = isMobile ? "1fr 1fr" : "repeat(4, 1fr)";

  return (
    <main style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: C.terre, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ background: C.foret, borderBottom: `0.5px solid ${C.vert}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <LogoEmeraude size={isMobile ? 0.6 : 0.7} />
          </Link>
          {!isMobile && (
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              {["Nos parcelles", "Notre engagement", "Simulateur"].map(l => (
                <span key={l} style={{ color: C.menthe, fontSize: "11px", cursor: "pointer", fontFamily: "system-ui", opacity: .8 }}>{l}</span>
              ))}
              <NavbarAuth buttonBg="#C8992A" buttonColor="#0D2018" textColor="#9FE1CB" borderColor="rgba(200,153,42,.3)" />
            </div>
          )}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <NavbarAuth buttonBg="#C8992A" buttonColor="#0D2018" textColor="#9FE1CB" borderColor="rgba(200,153,42,.3)" />
              <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}>
                {[0,1,2].map(i => <div key={i} style={{ width: "20px", height: "2px", background: C.paille, borderRadius: "2px" }} />)}
              </button>
            </div>
          )}
        </div>
        {isMobile && menuOpen && (
          <div style={{ background: C.foret, borderTop: `0.5px solid ${C.vert}`, padding: "8px 16px" }}>
            {["Nos parcelles", "Notre engagement", "Simulateur"].map(l => (
              <div key={l} onClick={() => setMenuOpen(false)} style={{ color: C.menthe, fontSize: "14px", fontFamily: "system-ui", padding: "12px 0", borderBottom: `0.5px solid ${C.vert}50`, cursor: "pointer" }}>{l}</div>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ background: C.noir, padding: "0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 60%, ${C.feuille}20 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, ${C.paille}15 0%, transparent 45%)` }} />
        {!isMobile && [...Array(12)].map((_, i) => (
          <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${4 + i * 8}%`, height: "1px", background: `${C.feuille}${i % 3 === 0 ? "18" : "08"}` }} />
        ))}
        {[...Array(isMobile ? 8 : 20)].map((_, i) => (
          <div key={i} style={{ position: "absolute", width: "3px", height: "3px", borderRadius: "50%", background: C.paille, opacity: .12, left: `${(i * 17 + 5) % 100}%`, top: `${(i * 23 + 10) % 90}%` }} />
        ))}

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "48px 16px 36px" : "80px 24px 56px", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", border: `0.5px solid ${C.feuille}`, padding: "4px 14px", borderRadius: "1px", marginBottom: "16px" }}>
            <span style={{ color: C.menthe, fontSize: "10px", letterSpacing: ".15em", textTransform: "uppercase", fontFamily: "system-ui" }}>🌿 Terroir Caribeen · Recoltes Tokenisees</span>
          </div>
          <h1 style={{ color: C.terreB, fontSize: isMobile ? "26px" : "clamp(26px, 4.5vw, 52px)", fontWeight: 300, lineHeight: 1.2, margin: "0 0 6px", maxWidth: "680px" }}>
            La terre des Antilles,
          </h1>
          <h1 style={{ color: C.paille, fontSize: isMobile ? "26px" : "clamp(26px, 4.5vw, 52px)", fontWeight: 400, lineHeight: 1.2, margin: "0 0 20px", maxWidth: "680px", fontStyle: "italic" }}>
            cultivee pour vous.
          </h1>
          <p style={{ color: C.menthe, fontSize: isMobile ? "13px" : "15px", lineHeight: 1.9, maxWidth: "520px", margin: "0 0 28px", fontFamily: "system-ui", opacity: .9 }}>
            Financement direct de recoltes reelles : banane IGP, cafe Bonifieur, cacao fin, foret guyanaise FSC. Chaque token represente une fraction d'une recolte verifiee, tracable et assuree.
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Link href="#parcelles" style={{ background: C.feuille, color: "white", padding: isMobile ? "11px 20px" : "13px 28px", borderRadius: "2px", fontSize: "13px", fontWeight: 700, textDecoration: "none", fontFamily: "system-ui" }}>
              Voir les parcelles
            </Link>
            <Link href="/simulateur" style={{ background: "transparent", color: C.paille, border: `1px solid ${C.feuille}`, padding: isMobile ? "11px 20px" : "13px 28px", borderRadius: "2px", fontSize: "13px", fontFamily: "system-ui", textDecoration: "none" }}>
              Simuler mon rendement →
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ background: C.foret, borderTop: `1px solid ${C.vert}50` }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)" }}>
            {[
              { val: "10-22%", label: "Rendement estime", sub: "par recolte" },
              { val: "12 mois", label: "Cycle moyen", sub: "plantation a la vente" },
              { val: "100%", label: "Parcelles auditees", sub: "expert independant" },
              { val: "80%", label: "Assurance recolte", sub: "force majeure" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: isMobile ? "12px 8px" : "18px 12px", borderRight: isMobile ? (i % 2 === 0 ? `0.5px solid ${C.vert}40` : "none") : (i < 3 ? `0.5px solid ${C.vert}40` : "none"), borderBottom: isMobile && i < 2 ? `0.5px solid ${C.vert}40` : "none" }}>
                <div style={{ color: C.paille, fontSize: isMobile ? "16px" : "20px", fontWeight: 700 }}>{s.val}</div>
                <div style={{ color: C.menthe, fontSize: "9px", letterSpacing: ".07em", textTransform: "uppercase", marginTop: "2px", fontFamily: "system-ui" }}>{s.label}</div>
                {!isMobile && <div style={{ color: `${C.menthe}60`, fontSize: "9px", marginTop: "1px", fontFamily: "system-ui" }}>{s.sub}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARCELLES */}
      <section id="parcelles" style={{ padding: isMobile ? "40px 16px" : "64px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "24px" }}>
            <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "system-ui" }}>Nos parcelles</div>
            <h2 style={{ color: C.texte, fontSize: isMobile ? "20px" : "26px", fontWeight: 400, margin: "0 0 16px" }}>
              Recoltes disponibles
            </h2>
            {/* Filtres */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", fontFamily: "system-ui" }}>
              {[{ key: "tous", label: "Toutes" }, { key: "guadeloupe", label: "Guadeloupe" }, { key: "martinique", label: "Martinique" }, { key: "guyane", label: "Guyane" }, { key: "bio", label: "Bio & FSC" }].map(f => (
                <button key={f.key} onClick={() => setFiltre(f.key as typeof filtre)} style={{ padding: isMobile ? "5px 10px" : "7px 16px", borderRadius: "2px", cursor: "pointer", fontSize: "11px", fontWeight: 600, border: filtre === f.key ? `1.5px solid ${C.feuille}` : `1px solid #C5BB9C`, background: filtre === f.key ? C.foret : C.terreB, color: filtre === f.key ? C.menthe : C.texteSec, transition: "all .15s" }}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: colsParcelles, gap: "14px" }}>
            {filtrees.map(p => {
              const pct = Math.round(((p.tokens - p.disponibles) / p.tokens) * 100);
              const complet = p.disponibles === 0;
              return (
                <div key={p.id}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ background: C.blanc, borderRadius: "4px", overflow: "hidden", border: hovered === p.id ? `1.5px solid ${C.feuille}` : `1px solid #D5CCBA`, transition: "all .2s", opacity: complet ? .65 : 1, transform: hovered === p.id && !complet ? "translateY(-3px)" : "none", borderLeft: `3px solid ${p.tagColor}` }}>
                  {/* Header */}
                  <div style={{ background: C.foret, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "20px" }}>{p.icone}</span>
                      <div>
                        <div style={{ color: C.paille, fontSize: "12px", fontWeight: 700, fontFamily: "system-ui" }}>{p.culture}</div>
                        <div style={{ color: C.menthe, fontSize: "10px", fontFamily: "system-ui", opacity: .8 }}>{p.producteur}</div>
                      </div>
                    </div>
                    <StatutBadge statut={p.statut} />
                  </div>
                  {/* Corps */}
                  <div style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
                      <span style={{ fontSize: "10px" }}>📍</span>
                      <span style={{ color: C.texteSec, fontSize: "10px", fontFamily: "system-ui" }}>{p.lieu}</span>
                    </div>
                    <div style={{ display: "flex", gap: "6px", marginBottom: "8px", flexWrap: "wrap" }}>
                      <span style={{ background: C.cremeV, color: p.tagColor, fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "2px", fontFamily: "system-ui" }}>{p.tag}</span>
                      <span style={{ background: C.terreB, color: C.texteSec, fontSize: "9px", padding: "2px 8px", borderRadius: "2px", fontFamily: "system-ui" }}>{p.surface}</span>
                    </div>
                    {!isMobile && <div style={{ color: C.texteTert, fontSize: "10px", marginBottom: "10px", fontFamily: "system-ui", fontStyle: "italic" }}>{p.certification}</div>}
                    {/* Métriques */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px", marginBottom: "10px" }}>
                      {[{ label: "Rendement", val: p.rendementEst }, { label: "Duree", val: p.duree }, { label: "Token", val: `${p.prixToken}€` }].map(m => (
                        <div key={m.label} style={{ background: C.terre, borderRadius: "3px", padding: "6px 4px", textAlign: "center" }}>
                          <div style={{ color: C.texte, fontSize: "12px", fontWeight: 700, fontFamily: "system-ui" }}>{m.val}</div>
                          <div style={{ color: C.texteTert, fontSize: "9px", fontFamily: "system-ui", marginTop: "1px" }}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                    {/* Récolte */}
                    <div style={{ background: C.cremeV, borderRadius: "3px", padding: "7px 10px", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: C.texteSec, fontSize: "11px", fontFamily: "system-ui" }}>🗓 Recolte</span>
                      <span style={{ color: C.feuille, fontSize: "11px", fontWeight: 700, fontFamily: "system-ui" }}>{p.recolte}</span>
                    </div>
                    {/* Progression */}
                    <div style={{ marginBottom: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                        <span style={{ color: C.texteTert, fontSize: "10px", fontFamily: "system-ui" }}>Levee en cours</span>
                        <span style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, fontFamily: "system-ui" }}>{pct}%</span>
                      </div>
                      <div style={{ background: C.terreB, borderRadius: "2px", height: "4px" }}>
                        <div style={{ background: pct >= 95 ? "#A32D2D" : C.feuille, height: "100%", borderRadius: "2px", width: `${pct}%` }} />
                      </div>
                    </div>
                    {/* CTA */}
                    {complet ? (
                      <div style={{ background: C.terre, color: C.texteTert, padding: "9px", borderRadius: "2px", fontSize: "11px", textAlign: "center", fontFamily: "system-ui" }}>
                        {"Complet · Liste d'attente →"}
                      </div>
                    ) : (
                      <Link href="#famille" style={{ display: "block", background: C.foret, color: C.paille, padding: "9px", borderRadius: "2px", fontSize: "12px", textAlign: "center", fontWeight: 700, textDecoration: "none", fontFamily: "system-ui", border: `1px solid ${C.paille}30` }}>
                        Investir dans cette parcelle →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALENDRIER */}
      <section style={{ background: C.vert, padding: isMobile ? "40px 16px" : "56px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{ color: C.paille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>Le cycle</div>
            <h2 style={{ color: C.terreB, fontSize: isMobile ? "20px" : "24px", fontWeight: 300, margin: 0 }}>De la plantation a votre portefeuille</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: colsCalendrier, gap: "2px" }}>
            {CALENDRIER.map((c, i) => (
              <div key={i} style={{ background: c.color, padding: isMobile ? "18px 14px" : "24px 20px", position: "relative" }}>
                <div style={{ color: C.paille, fontSize: "11px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "6px", fontFamily: "system-ui" }}>{c.mois}</div>
                <div style={{ color: C.terreB, fontSize: isMobile ? "12px" : "14px", fontWeight: 300 }}>{c.label}</div>
                {!isMobile && i < 3 && <div style={{ position: "absolute", right: "-10px", top: "50%", transform: "translateY(-50%)", color: C.paille, fontSize: "16px", zIndex: 1 }}>›</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section style={{ background: C.terreB, padding: isMobile ? "40px 16px" : "64px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>Notre engagement</div>
            <h2 style={{ color: C.texte, fontSize: isMobile ? "20px" : "24px", fontWeight: 300, margin: 0 }}>Un investissement ancre dans le reel</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: colsValeurs, gap: "12px" }}>
            {VALEURS.map((v, i) => (
              <div key={i} style={{ background: C.blanc, borderRadius: "4px", padding: isMobile ? "16px" : "24px 20px", border: `0.5px solid #D5CCBA`, borderTop: `2px solid ${C.feuille}` }}>
                <div style={{ fontSize: "20px", marginBottom: "10px" }}>{v.icone}</div>
                <div style={{ color: C.texte, fontSize: "12px", fontWeight: 700, marginBottom: "6px", fontFamily: "system-ui" }}>{v.titre}</div>
                {!isMobile && <div style={{ color: C.texteSec, fontSize: "12px", lineHeight: 1.7, fontFamily: "system-ui" }}>{v.desc}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REJOINDRE */}
      <section id="famille" style={{ background: C.foret, padding: isMobile ? "48px 16px" : "72px 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "20px" }}>
            {["🌿", "🍃", "🌾", "🍃", "🌿"].map((e, i) => (
              <span key={i} style={{ fontSize: "18px", opacity: .6 + i * .08 }}>{e}</span>
            ))}
          </div>
          <div style={{ color: C.paille, fontSize: "10px", fontWeight: 700, letterSpacing: ".25em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "system-ui" }}>
            Acces privilegie
          </div>
          <h2 style={{ color: C.terreB, fontSize: isMobile ? "22px" : "26px", fontWeight: 300, lineHeight: 1.3, margin: "0 0 12px" }}>
            Rejoignez la famille CaribbeanVault
          </h2>
          <p style={{ color: C.menthe, fontSize: "14px", lineHeight: 1.8, margin: "0 0 28px", fontFamily: "system-ui", opacity: .9 }}>
            {"Accedez en avant-premiere aux nouvelles parcelles, aux rapports de recolte exclusifs et aux visites de terrain."}
          </p>
          <Link href="/kyc" style={{ display: "inline-block", background: C.feuille, color: "white", padding: "14px 32px", borderRadius: "2px", fontSize: "13px", fontWeight: 700, textDecoration: "none", fontFamily: "system-ui" }}>
            Rejoindre la famille CaribbeanVault
          </Link>
          <p style={{ color: `${C.menthe}50`, fontSize: "10px", fontFamily: "system-ui", marginTop: "14px" }}>
            {"Gratuit · Aucun engagement"}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
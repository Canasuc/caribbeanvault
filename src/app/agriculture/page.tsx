"use client";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import { LogoEmeraude } from "@/components/Logo";
import NavbarAuth from "@/components/NavbarAuth";

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
  {
    id: 1,
    culture: "Banane IGP Antilles",
    producteur: "Coopérative GIPAM",
    lieu: "Capesterre-Belle-Eau, Guadeloupe",
    surface: "18 hectares",
    certification: "IGP Antilles · Agriculture Raisonnée",
    tokens: 160,
    disponibles: 72,
    prixToken: 250,
    rendementEst: "12–16%",
    duree: "12 mois",
    recolte: "Juillet 2026",
    statut: "En levée",
    icone: "🍌",
    tag: "IGP Certifiée",
    tagColor: "#3B6D11",
  },
  {
    id: 2,
    culture: "Café Bonifieur",
    producteur: "Domaine Vanibel",
    lieu: "Vieux-Habitants, Guadeloupe",
    surface: "4 hectares",
    certification: "Grand Cru · Agriculture Biologique",
    tokens: 80,
    disponibles: 18,
    prixToken: 400,
    rendementEst: "15–22%",
    duree: "14 mois",
    recolte: "Octobre 2026",
    statut: "Presque complet",
    icone: "☕",
    tag: "Grand Cru",
    tagColor: "#854F0B",
  },
  {
    id: 3,
    culture: "Cacao Fin de Martinique",
    producteur: "Plantation Bellevue",
    lieu: "Le Robert, Martinique",
    surface: "8 hectares",
    certification: "Cacao Fin · Bio certifié AB",
    tokens: 100,
    disponibles: 100,
    prixToken: 300,
    rendementEst: "13–18%",
    duree: "18 mois",
    recolte: "Décembre 2026",
    statut: "Nouveau",
    icone: "🍫",
    tag: "Bio AB",
    tagColor: "#5A8A3C",
  },
  {
    id: 4,
    culture: "Bois Certifié FSC",
    producteur: "Groupement Forestier Guyane",
    lieu: "Saint-Laurent-du-Maroni, Guyane",
    surface: "2 400 hectares",
    certification: "FSC Gestion Durable · Crédits Carbone",
    tokens: 500,
    disponibles: 312,
    prixToken: 150,
    rendementEst: "10–14%",
    duree: "24 mois",
    recolte: "Mars 2027",
    statut: "En levée",
    icone: "🌳",
    tag: "FSC + Carbone",
    tagColor: "#085041",
  },
  {
    id: 5,
    culture: "Ananas Victoria",
    producteur: "Famille Montout",
    lieu: "Le Moule, Guadeloupe",
    surface: "6 hectares",
    certification: "Agriculture Raisonnée · Sans pesticides",
    tokens: 60,
    disponibles: 60,
    prixToken: 200,
    rendementEst: "10–14%",
    duree: "10 mois",
    recolte: "Juin 2026",
    statut: "Nouveau",
    icone: "🍍",
    tag: "Sans pesticides",
    tagColor: "#5A8A3C",
  },
  {
    id: 6,
    culture: "Canne à Sucre AOC",
    producteur: "Distillerie Longueteau",
    lieu: "Capesterre, Guadeloupe",
    surface: "45 hectares",
    certification: "AOC Rhum Agricole · Filière sélective",
    tokens: 200,
    disponibles: 0,
    prixToken: 180,
    rendementEst: "11–15%",
    duree: "12 mois",
    recolte: "Mai 2026",
    statut: "Complet",
    icone: "🌾",
    tag: "AOC",
    tagColor: "#C8A84B",
  },
];

const VALEURS = [
  { icone: "🌱", titre: "Traçabilité totale", desc: "Chaque token est lié à une parcelle géolocalisée. Photos, rapports de récolte et analyses de sol disponibles dans votre espace." },
  { icone: "🤝", titre: "Impact direct", desc: "Vous financez directement des producteurs caribéens indépendants, sans intermédiaire bancaire. Un lien unique entre investisseur et terroir." },
  { icone: "🌿", titre: "Agriculture durable", desc: "Seules les exploitations certifiées Bio, IGP, FSC ou Agriculture Raisonnée sont acceptées sur la plateforme." },
  { icone: "💧", titre: "Force majeure protégée", desc: "En cas de catastrophe climatique, une assurance récolte couvre jusqu'à 80% de la valeur des tokens concernés." },
];

const CALENDRIER = [
  { mois: "Jan–Fév", label: "Sélection des parcelles", color: C.foret },
  { mois: "Mar–Avr", label: "Levée de fonds", color: C.vert },
  { mois: "Mai–Nov", label: "Croissance & suivi", color: C.feuille },
  { mois: "Déc", label: "Récolte & distribution", color: C.pailleC },
];

function StatutBadge({ statut }: { statut: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    "En levée":         { bg: C.cremeV, color: "#3B6D11" },
    "Presque complet":  { bg: "#FAEEDA", color: "#854F0B" },
    "Nouveau":          { bg: "#E6F1FB", color: "#0C447C" },
    "Complet":          { bg: "#F1EFE8", color: "#444441" },
  };
  const s = map[statut] || map["En levée"];
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "2px", letterSpacing: ".08em", textTransform: "uppercase" }}>
      {statut}
    </span>
  );
}

export default function AgriculturePage() {
  const [filtre, setFiltre] = useState<"tous" | "guadeloupe" | "martinique" | "guyane" | "bio">("tous");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtrees = PARCELLES.filter(p => {
    if (filtre === "guadeloupe") return p.lieu.includes("Guadeloupe");
    if (filtre === "martinique") return p.lieu.includes("Martinique");
    if (filtre === "guyane") return p.lieu.includes("Guyane");
    if (filtre === "bio") return p.certification.includes("Bio") || p.certification.includes("FSC");
    return true;
  });

  return (
    <main style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: C.terre, minHeight: "100vh" }}>

      {/* ── NAVBAR ── */}
      <nav style={{ background: C.foret, borderBottom: `0.5px solid ${C.vert}`, padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: C.paille, fontSize: "10px", letterSpacing: ".15em", opacity: .7 }}>←</span>
            <LogoEmeraude size={0.7} />
          </Link>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            {["Nos parcelles", "Notre engagement", "Simulateur"].map(l => (
              <span key={l} style={{ color: C.menthe, fontSize: "11px", cursor: "pointer", fontFamily: "system-ui", opacity: .8 }}>{l}</span>
            ))}
<NavbarAuth 
  buttonBg="#C8992A"
  buttonColor="#0D2018"
  textColor="#9FE1CB"
  borderColor="rgba(200,153,42,.3)"
/>
          </div>
        </div>
      </nav>

      {/* ── HERO CSS TERROIR ── */}
      <section style={{ background: C.noir, padding: "0", position: "relative", overflow: "hidden" }}>
        {/* Fond CSS — texture terroir */}
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse at 30% 60%, ${C.feuille}20 0%, transparent 55%),
            radial-gradient(ellipse at 80% 20%, ${C.paille}15 0%, transparent 45%),
            radial-gradient(ellipse at 60% 90%, ${C.vert}25 0%, transparent 40%)
          `,
        }} />
        {/* Lignes de sillon */}
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: 0, right: 0,
            top: `${4 + i * 8}%`,
            height: "1px",
            background: `${C.feuille}${i % 3 === 0 ? "18" : "08"}`,
          }} />
        ))}
        {/* Points semences */}
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: "3px", height: "3px",
            borderRadius: "50%",
            background: C.paille,
            opacity: .15,
            left: `${(i * 17 + 5) % 100}%`,
            top: `${(i * 23 + 10) % 90}%`,
          }} />
        ))}

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px 56px", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: `0.5px solid ${C.feuille}`, padding: "4px 14px", borderRadius: "1px", marginBottom: "20px" }}>
            <span style={{ color: C.menthe, fontSize: "10px", letterSpacing: ".2em", textTransform: "uppercase", fontFamily: "system-ui" }}>🌿 Terroir Caribéen · Récoltes Tokenisées</span>
          </div>

          <h1 style={{ color: C.terreB, fontSize: "clamp(26px, 4.5vw, 52px)", fontWeight: 300, lineHeight: 1.2, margin: "0 0 8px", maxWidth: "680px" }}>
            La terre des Antilles,
          </h1>
          <h1 style={{ color: C.paille, fontSize: "clamp(26px, 4.5vw, 52px)", fontWeight: 400, lineHeight: 1.2, margin: "0 0 24px", maxWidth: "680px", fontStyle: "italic" }}>
            cultivée pour vous.
          </h1>
          <p style={{ color: C.menthe, fontSize: "15px", lineHeight: 1.9, maxWidth: "520px", margin: "0 0 36px", fontFamily: "system-ui", opacity: .9 }}>
            Financement direct de récoltes réelles : banane IGP, café Bonifieur, cacao fin, forêt guyanaise FSC. Chaque token représente une fraction d'une récolte vérifiée, traçable et assurée.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="#parcelles" style={{
              background: C.feuille, color: "white", padding: "13px 28px",
              borderRadius: "2px", fontSize: "13px", fontWeight: 700,
              textDecoration: "none", letterSpacing: ".05em", fontFamily: "system-ui",
            }}>
              Voir les parcelles
            </Link>
            <Link href="/simulateur" style={{
              background: "transparent", color: C.paille,
              border: `1px solid ${C.feuille}`, padding: "13px 28px",
              borderRadius: "2px", fontSize: "13px", fontFamily: "system-ui",
              textDecoration: "none",
            }}>
              Simuler mon rendement →
            </Link>
          </div>
        </div>

        {/* Bande stats */}
        <div style={{ background: C.foret, borderTop: `1px solid ${C.vert}50` }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {[
              { val: "10–22%", label: "Rendement estimé", sub: "par récolte" },
              { val: "12 mois", label: "Cycle moyen", sub: "de la plantation à la vente" },
              { val: "100%", label: "Parcelles auditées", sub: "par expert indépendant" },
              { val: "80%", label: "Assurance récolte", sub: "en cas de force majeure" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "18px 12px", borderRight: i < 3 ? `0.5px solid ${C.vert}40` : "none" }}>
                <div style={{ color: C.paille, fontSize: "20px", fontWeight: 700 }}>{s.val}</div>
                <div style={{ color: C.menthe, fontSize: "10px", letterSpacing: ".07em", textTransform: "uppercase", marginTop: "2px", fontFamily: "system-ui" }}>{s.label}</div>
                <div style={{ color: `${C.menthe}60`, fontSize: "9px", marginTop: "1px", fontFamily: "system-ui" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARCELLES ── */}
      <section id="parcelles" style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "system-ui" }}>
                Nos parcelles
              </div>
              <h2 style={{ color: C.texte, fontSize: "26px", fontWeight: 400, margin: 0 }}>
                Récoltes disponibles à l'investissement
              </h2>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", fontFamily: "system-ui" }}>
              {[
                { key: "tous", label: "Toutes" },
                { key: "guadeloupe", label: "Guadeloupe" },
                { key: "martinique", label: "Martinique" },
                { key: "guyane", label: "Guyane" },
                { key: "bio", label: "Bio & FSC" },
              ].map(f => (
                <button key={f.key} onClick={() => setFiltre(f.key as typeof filtre)} style={{
                  padding: "7px 16px", borderRadius: "2px", cursor: "pointer",
                  fontSize: "11px", fontWeight: 600, letterSpacing: ".03em",
                  border: filtre === f.key ? `1.5px solid ${C.feuille}` : `1px solid #C5BB9C`,
                  background: filtre === f.key ? C.foret : C.terreB,
                  color: filtre === f.key ? C.menthe : C.texteSec,
                  transition: "all .15s",
                }}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grille parcelles */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {filtrees.map(p => {
              const pct = Math.round(((p.tokens - p.disponibles) / p.tokens) * 100);
              const complet = p.disponibles === 0;
              return (
                <div key={p.id}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: C.blanc, borderRadius: "4px", overflow: "hidden",
                    border: hovered === p.id ? `1.5px solid ${C.feuille}` : `1px solid #D5CCBA`,
                    transition: "all .2s", opacity: complet ? .65 : 1,
                    transform: hovered === p.id && !complet ? "translateY(-3px)" : "none",
                    boxShadow: hovered === p.id && !complet ? "0 8px 24px rgba(44,58,30,.1)" : "none",
                    borderLeft: `3px solid ${p.tagColor}`,
                  }}>

                  {/* Header */}
                  <div style={{ background: C.foret, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "22px" }}>{p.icone}</span>
                      <div>
                        <div style={{ color: C.paille, fontSize: "12px", fontWeight: 700, fontFamily: "system-ui" }}>{p.culture}</div>
                        <div style={{ color: C.menthe, fontSize: "10px", fontFamily: "system-ui", opacity: .8 }}>{p.producteur}</div>
                      </div>
                    </div>
                    <StatutBadge statut={p.statut} />
                  </div>

                  {/* Corps */}
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px" }}>
                      <span style={{ fontSize: "11px" }}>📍</span>
                      <span style={{ color: C.texteSec, fontSize: "11px", fontFamily: "system-ui" }}>{p.lieu}</span>
                    </div>
                    <div style={{ display: "flex", gap: "6px", marginBottom: "10px", flexWrap: "wrap" }}>
                      <span style={{ background: C.cremeV, color: p.tagColor, fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "2px", fontFamily: "system-ui", letterSpacing: ".05em" }}>
                        {p.tag}
                      </span>
                      <span style={{ background: C.terreB, color: C.texteSec, fontSize: "9px", padding: "2px 8px", borderRadius: "2px", fontFamily: "system-ui" }}>
                        {p.surface}
                      </span>
                    </div>
                    <div style={{ color: C.texteTert, fontSize: "10px", marginBottom: "12px", fontFamily: "system-ui", fontStyle: "italic" }}>
                      {p.certification}
                    </div>

                    {/* Métriques */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "12px" }}>
                      {[
                        { label: "Rendement", val: p.rendementEst },
                        { label: "Durée", val: p.duree },
                        { label: "Token", val: `${p.prixToken}€` },
                      ].map(m => (
                        <div key={m.label} style={{ background: C.terre, borderRadius: "3px", padding: "8px 6px", textAlign: "center" }}>
                          <div style={{ color: C.texte, fontSize: "12px", fontWeight: 700, fontFamily: "system-ui" }}>{m.val}</div>
                          <div style={{ color: C.texteTert, fontSize: "9px", fontFamily: "system-ui", marginTop: "1px" }}>{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Récolte prévue */}
                    <div style={{ background: C.cremeV, borderRadius: "3px", padding: "8px 12px", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: C.texteSec, fontSize: "11px", fontFamily: "system-ui" }}>🗓 Récolte prévue</span>
                      <span style={{ color: C.feuille, fontSize: "12px", fontWeight: 700, fontFamily: "system-ui" }}>{p.recolte}</span>
                    </div>

                    {/* Barre progression */}
                    <div style={{ marginBottom: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={{ color: C.texteTert, fontSize: "10px", fontFamily: "system-ui" }}>Levée en cours</span>
                        <span style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, fontFamily: "system-ui" }}>{pct}% · {p.disponibles} dispo.</span>
                      </div>
                      <div style={{ background: C.terreB, borderRadius: "2px", height: "5px" }}>
                        <div style={{ background: pct >= 95 ? "#A32D2D" : C.feuille, height: "100%", borderRadius: "2px", width: `${pct}%`, transition: "width .5s" }} />
                      </div>
                    </div>

                    {/* CTA */}
                    {complet ? (
                      <div style={{ background: C.terre, color: C.texteTert, padding: "10px", borderRadius: "2px", fontSize: "11px", textAlign: "center", fontFamily: "system-ui" }}>
                        Complet · Rejoindre la liste d'attente →
                      </div>
                    ) : (
                      <Link href="#famille" style={{
                        display: "block", background: C.foret, color: C.paille,
                        padding: "10px", borderRadius: "2px", fontSize: "12px",
                        textAlign: "center", fontWeight: 700, textDecoration: "none",
                        fontFamily: "system-ui", letterSpacing: ".05em",
                        border: `1px solid ${C.paille}30`,
                      }}>
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

      {/* ── CALENDRIER AGRICOLE ── */}
      <section style={{ background: C.vert, padding: "56px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div style={{ color: C.paille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>
              Le cycle
            </div>
            <h2 style={{ color: C.terreB, fontSize: "24px", fontWeight: 300, margin: 0 }}>
              De la plantation à votre portefeuille
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
            {CALENDRIER.map((c, i) => (
              <div key={i} style={{ background: c.color, padding: "24px 20px", position: "relative" }}>
                <div style={{ color: C.paille, fontSize: "11px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "system-ui" }}>
                  {c.mois}
                </div>
                <div style={{ color: C.terreB, fontSize: "14px", fontWeight: 300 }}>
                  {c.label}
                </div>
                {i < 3 && (
                  <div style={{ position: "absolute", right: "-10px", top: "50%", transform: "translateY(-50%)", color: C.paille, fontSize: "16px", zIndex: 1 }}>›</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALEURS ── */}
      <section style={{ background: C.terreB, padding: "64px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>
              Notre engagement
            </div>
            <h2 style={{ color: C.texte, fontSize: "24px", fontWeight: 300, margin: 0 }}>
              Un investissement ancré dans le réel
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {VALEURS.map((v, i) => (
              <div key={i} style={{ background: C.blanc, borderRadius: "4px", padding: "24px 20px", border: `0.5px solid #D5CCBA`, borderTop: `2px solid ${C.feuille}` }}>
                <div style={{ fontSize: "22px", marginBottom: "12px" }}>{v.icone}</div>
                <div style={{ color: C.texte, fontSize: "13px", fontWeight: 700, marginBottom: "8px", fontFamily: "system-ui" }}>{v.titre}</div>
                <div style={{ color: C.texteSec, fontSize: "12px", lineHeight: 1.7, fontFamily: "system-ui" }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REJOINDRE LA FAMILLE ── */}
<section id="famille" style={{ background: C.foret, padding: "72px 24px" }}>
  <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
    <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "24px" }}>
      {["🌿", "🍃", "🌾", "🍃", "🌿"].map((e, i) => (
        <span key={i} style={{ fontSize: "20px", opacity: .6 + i * .08 }}>{e}</span>
      ))}
    </div>
    <div style={{ color: C.paille, fontSize: "10px", fontWeight: 700, letterSpacing: ".25em", textTransform: "uppercase", marginBottom: "16px", fontFamily: "system-ui" }}>
      Acces privilegie
    </div>
    <h2 style={{ color: C.terreB, fontSize: "26px", fontWeight: 300, lineHeight: 1.3, margin: "0 0 14px" }}>
      Rejoignez la famille CaribbeanVault
    </h2>
    <p style={{ color: C.menthe, fontSize: "14px", lineHeight: 1.8, margin: "0 0 32px", fontFamily: "system-ui", opacity: .9 }}>
      Accedez en avant-premiere aux nouvelles parcelles, aux rapports de recolte exclusifs et aux visites de terrain.
    </p>
    <Link href="/kyc" style={{
      display: "inline-block", background: C.feuille, color: "white",
      padding: "14px 32px", borderRadius: "2px", fontSize: "13px",
      fontWeight: 700, textDecoration: "none", letterSpacing: ".05em", fontFamily: "system-ui",
    }}>
      Rejoindre la famille CaribbeanVault
    </Link>
    <p style={{ color: `${C.menthe}50`, fontSize: "10px", fontFamily: "system-ui", letterSpacing: ".05em", marginTop: "16px" }}>
      {"Gratuit · Aucun engagement"}
    </p>
  </div>
</section>

      {/* ── FOOTER ── */}
<Footer />

    </main>
  );
}
"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import Image from "next/image";
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

const TERRITOIRES = [
  {
    id: "guadeloupe",
    nom: "Guadeloupe",
    pays: "France (DOM)",
    drapeau: "🇬🇵",
    couleur: "#0F5240",
    carteImg: "/images/carte-guadeloupe.jpg",
    surfaceCanne: "12 000 ha",
    productionHAP: "~70 000 HAP/an",
    nbDistilleries: 6,
    rendementMoyen: "9-14%/an",
    aocDepuis: "1996",
    exportPrincipal: "France metropolitaine, Europe",
    subventions: "FEADER + POSEI UE",
    certification: "AOC Rhum Agricole Guadeloupe",
    histoire: "L'archipel guadeloupeen produit un rhum agricole AOC d'exception depuis 1996. La diversite de ses terroirs — sol volcanique de Basse-Terre, calcaire de Marie-Galante, terres plates de Grande-Terre — offre une palette aromatique unique au monde. Ses 6 distilleries partenaires, toutes familiales depuis 3 a 5 generations, maintiennent un savoir-faire artisanal incomparable.",
    atouts: ["AOC Guadeloupe unique", "Marie-Galante 59°+", "Terroir volcanique", "Distilleries familiales"],
    distilleries: ["Damoiseau", "Pere Labat", "Bologne", "Bielle", "Longueteau", "Reimonenq"],
    particularites: "Marie-Galante produit des rhums a 59°+ sur terroir calcaire unique. Basse-Terre beneficie des sols volcaniques de la Soufriere.",
  },
  {
    id: "martinique",
    nom: "Martinique",
    pays: "France (DOM)",
    drapeau: "🇲🇶",
    couleur: "#1A2E4A",
    carteImg: "/images/carte-martinique.jpg",
    surfaceCanne: "4 500 ha",
    productionHAP: "~90 000 HAP/an",
    nbDistilleries: 7,
    rendementMoyen: "10-18%/an",
    aocDepuis: "1996",
    exportPrincipal: "France, USA, Japon, UK",
    subventions: "FEADER + POSEI UE",
    certification: "AOC Rhum Agricole Martinique",
    histoire: "La Martinique est la reference mondiale du rhum agricole. Son AOC, la plus stricte de la Caraibe, garantit une qualite superieure a chaque millésime. Avec des distilleries fondees en 1660, 1749 et 1765, la Martinique produit des rhums vieux qui s'echangent jusqu'a 5 000€ la bouteille. HSE, Clement, JM et Trois Rivieres sont des references absolues pour les amateurs du monde entier.",
    atouts: ["AOC la plus stricte", "Millesimes premium", "Distilleries historiques 1660+", "Marche mondial premium"],
    distilleries: ["Clement", "Trois Rivieres", "HSE", "Saint James", "La Mauny", "Depaz", "J.M."],
    particularites: "La Martinique est la reference mondiale. Ses millesimes s'echangent jusqu'a 5 000€ la bouteille. Finitions Sauternes, Cognac, Banyuls exclusives.",
  },
];

const FUTS = [
  { id: 1, distillerie: "Damoiseau", ile: "Guadeloupe", annee: 2019, type: "Rhum Agricole AOC Blanc", baril: "Fut de chene americain 180L", tokens: 100, disponibles: 34, prixToken: 48, rendementEst: "9-12%/an", maturite: "2029", statut: "En levee", millesime: false },
  { id: 2, distillerie: "Pere Labat", ile: "Guadeloupe", annee: 2017, type: "Rhum Vieux AOC 6 ans", baril: "Fut de chene francais 220L", tokens: 80, disponibles: 12, prixToken: 125, rendementEst: "11-15%/an", maturite: "2027", statut: "Presque complet", millesime: true },
  { id: 3, distillerie: "Clement", ile: "Martinique", annee: 2020, type: "Rhum Agricole AOC Ambre", baril: "Fut de bourbon americain 200L", tokens: 120, disponibles: 89, prixToken: 35, rendementEst: "8-11%/an", maturite: "2030", statut: "En levee", millesime: false },
  { id: 4, distillerie: "HSE", ile: "Martinique", annee: 2016, type: "Rhum Vieux AOC 8 ans", baril: "Fut de Sauternes 180L", tokens: 60, disponibles: 3, prixToken: 280, rendementEst: "13-18%/an", maturite: "2026", statut: "Dernieres places", millesime: true },
  { id: 5, distillerie: "Bologne", ile: "Guadeloupe", annee: 2021, type: "Rhum Agricole AOC Blanc", baril: "Fut de chene americain 160L", tokens: 80, disponibles: 80, prixToken: 28, rendementEst: "8-10%/an", maturite: "2031", statut: "Nouveau", millesime: false },
  { id: 6, distillerie: "J.M.", ile: "Martinique", annee: 2015, type: "Rhum Vieux AOC 10 ans", baril: "Fut de cognac Limousin 200L", tokens: 50, disponibles: 0, prixToken: 420, rendementEst: "14-20%/an", maturite: "2025", statut: "Complet", millesime: true },
];

const STATS = [
  { val: "8-15%", label: "Appreciation annuelle", sub: "historique" },
  { val: "10-15 ans", label: "Horizon optimal", sub: "de vieillissement" },
  { val: "AOC", label: "Label protege", sub: "unique au monde" },
  { val: "100%", label: "Actifs assures", sub: "et audites" },
];

const ETAPES = [
  { num: "01", titre: "La distillation", desc: "Le rhum est distille a partir de canne a sucre fraiche pressee, specificite unique du rhum agricole AOC." },
  { num: "02", titre: "La mise en fut", desc: "Chaque fut est scelle, photographie, reference. La SPV en devient proprietaire legale des ce moment." },
  { num: "03", titre: "Le vieillissement", desc: "En cave sous controle de temperature. Audit physique annuel par un expert independant agree." },
  { num: "04", titre: "La distribution", desc: "A maturite, le fut est vendu aux encheres ou mis en bouteilles. Le produit est distribue aux token-holders." },
];

const DISTILLERIES_GUADELOUPE = [
  { nom: "Damoiseau", annee: "1942", slug: "damoiseau", logo: "/images/logo-damoiseau.jpg", dispo: true },
  { nom: "Pere Labat", annee: "1895", slug: "pere-labat", logo: "/images/logo-pere-labat.jpg", dispo: true },
  { nom: "Bologne", annee: "1887", slug: "bologne", logo: "/images/logo-bologne.jpg", dispo: true },
  { nom: "Bielle", annee: "1975", slug: "bielle", logo: "/images/logo-bielle.jpg", dispo: false },
  { nom: "Longueteau", annee: "1895", slug: "longueteau", logo: "/images/logo-longueteau.jpg", dispo: true },
  { nom: "Reimonenq", annee: "1916", slug: "reimonenq", logo: "/images/logo-reimonenq.jpg", dispo: false },
];

const DISTILLERIES_MARTINIQUE = [
  { nom: "Clement", annee: "1887", slug: "clement", logo: "/images/logo-clement.jpg", dispo: true },
  { nom: "Trois Rivieres", annee: "1660", slug: "trois-rivieres", logo: "/images/logo-trois-rivieres.jpg", dispo: true },
  { nom: "HSE", annee: "1883", slug: "hse", logo: "/images/logo-hse.jpg", dispo: true },
  { nom: "Saint James", annee: "1765", slug: "saint-james", logo: "/images/logo-saint-james.jpg", dispo: false },
  { nom: "La Mauny", annee: "1749", slug: "la-mauny", logo: "/images/logo-la-mauny.jpg", dispo: false },
  { nom: "Depaz", annee: "1917", slug: "depaz", logo: "/images/logo-depaz.jpg", dispo: true },
  { nom: "J.M.", annee: "1845", slug: "jm", logo: "/images/logo-jm.jpg", dispo: true },
];

function StatutBadge({ statut }: { statut: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    "En levee":         { bg: "#E1F5EE", color: "#0F6E56" },
    "Presque complet":  { bg: "#FAEEDA", color: "#854F0B" },
    "Dernieres places": { bg: "#FCEBEB", color: "#A32D2D" },
    "Nouveau":          { bg: "#E6F1FB", color: "#0C447C" },
    "Complet":          { bg: "#F1EFE8", color: "#444441" },
  };
  const s = styles[statut] || styles["En levee"];
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "2px", letterSpacing: ".08em", textTransform: "uppercase" }}>
      {statut}
    </span>
  );
}

function DistillerieCard({ d, ile }: { d: typeof DISTILLERIES_GUADELOUPE[0]; ile: string }) {
  return (
    <Link href={`/distilleries/${d.slug}`} style={{ textDecoration: "none" }}>
      <div style={{ background: C.foret, padding: "16px 8px", textAlign: "center", cursor: "pointer", borderBottom: "2px solid transparent", position: "relative", transition: "all .2s" }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = C.vert; (e.currentTarget as HTMLDivElement).style.borderBottom = `2px solid ${C.or}`; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = C.foret; (e.currentTarget as HTMLDivElement).style.borderBottom = "2px solid transparent"; }}
      >
        {d.dispo && <div style={{ position: "absolute", top: "6px", right: "6px", width: "6px", height: "6px", borderRadius: "50%", background: C.or }} />}
        <div style={{ position: "relative", width: "60px", height: "40px", margin: "0 auto 6px" }}>
          <Image src={d.logo} alt={d.nom} fill sizes="80px" style={{ objectFit: "contain", opacity: .9 }} />
        </div>
        <div style={{ color: C.or, fontSize: "8px", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "2px", opacity: .7 }}>{d.annee}</div>
        <div style={{ color: C.menthe, fontSize: "8px", opacity: .5 }}>{ile}</div>
      </div>
    </Link>
  );
}

// ── CARTE RÉTRACTABLE TERRITOIRE — style immobilier ───────────────────────────
function TerritoireCard({
  territoire,
  isOpen,
  onToggle,
  onFilter,
  isMobile,
}: {
  territoire: typeof TERRITOIRES[0];
  isOpen: boolean;
  onToggle: () => void;
  onFilter: () => void;
  isMobile: boolean;
}) {
  const futsT = FUTS.filter(f => f.ile === territoire.nom);
  const futsDispos = futsT.filter(f => f.disponibles > 0).length;

  return (
    <div style={{
      background: C.noir,
      borderRadius: "12px",
      overflow: "hidden",
      border: isOpen ? `2px solid ${C.or}` : `0.5px solid ${C.or}30`,
      cursor: "pointer",
      transition: "all .2s",
    }}>
      {/* Header avec image carte de l'île — style immobilier */}
      <div onClick={onToggle} style={{ background: territoire.couleur, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", overflow: "hidden", minHeight: "80px" }}>
        {/* Image carte île en fond à gauche */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "40%", overflow: "hidden" }}>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image src={territoire.carteImg} alt={territoire.nom} fill sizes="200px" style={{ objectFit: "cover", opacity: .35 }} />
          </div>
          {/* Gradient droite pour fondu */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, transparent 0%, ${territoire.couleur} 70%)` }} />
        </div>

        {/* Contenu gauche */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "22px" }}>{territoire.drapeau}</span>
            <div style={{ color: "white", fontSize: isMobile ? "16px" : "18px", fontWeight: 700 }}>{territoire.nom}</div>
          </div>
          <div style={{ color: "rgba(255,255,255,.65)", fontSize: "10px", letterSpacing: ".1em", textTransform: "uppercase", fontFamily: "system-ui" }}>
            {territoire.pays} · {territoire.certification}
          </div>
        </div>

        {/* Rendement à droite */}
        <div style={{ textAlign: "right", position: "relative", zIndex: 1 }}>
          <div style={{ color: "rgba(255,255,255,.7)", fontSize: "10px", marginBottom: "2px", fontFamily: "system-ui" }}>Rendement moyen</div>
          <div style={{ color: C.or, fontSize: "18px", fontWeight: 800 }}>{territoire.rendementMoyen}</div>
        </div>
      </div>

      {/* Stats rapides — toujours visibles */}
      <div style={{ padding: "10px 20px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", borderBottom: `0.5px solid ${C.or}15` }}>
        {[
          { label: "Surface canne", val: territoire.surfaceCanne },
          { label: "Production", val: territoire.productionHAP },
          { label: "Futs dispos", val: `${futsDispos}/${futsT.length}` },
        ].map((m, j) => (
          <div key={j}>
            <div style={{ color: `${C.menthe}60`, fontSize: "9px", textTransform: "uppercase", fontFamily: "system-ui" }}>{m.label}</div>
            <div style={{ color: C.orClair, fontSize: "11px", fontWeight: 600, marginTop: "2px", fontFamily: "system-ui" }}>{m.val}</div>
          </div>
        ))}
      </div>

      {/* Contenu rétractable */}
      {isOpen && (
        <div style={{ padding: "16px 20px" }}>
          {/* Histoire */}
          <p style={{ color: `${C.menthe}90`, fontSize: "13px", lineHeight: 1.7, margin: "0 0 14px", fontFamily: "system-ui" }}>{territoire.histoire}</p>

          {/* Atouts */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
            {territoire.atouts.map((a, k) => (
              <span key={k} style={{ background: `${C.or}20`, color: C.or, fontSize: "10px", padding: "3px 10px", borderRadius: "20px", fontWeight: 600, fontFamily: "system-ui" }}>{a}</span>
            ))}
          </div>

          {/* Stats étendues */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", marginBottom: "14px" }}>
            {[
              { label: "Distilleries partenaires", val: `${territoire.nbDistilleries}` },
              { label: "AOC depuis", val: territoire.aocDepuis },
              { label: "Export principal", val: territoire.exportPrincipal },
              { label: "Subventions", val: territoire.subventions },
            ].map((s, i) => (
              <div key={i} style={{ background: `rgba(255,255,255,.04)`, borderRadius: "6px", padding: "8px 10px" }}>
                <div style={{ color: `${C.menthe}60`, fontSize: "9px", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "2px", fontFamily: "system-ui" }}>{s.label}</div>
                <div style={{ color: C.orClair, fontSize: "11px", fontWeight: 600, fontFamily: "system-ui" }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* Particularités */}
          <div style={{ background: `${C.or}10`, borderRadius: "6px", padding: "10px 14px", marginBottom: "14px", border: `0.5px solid ${C.or}25` }}>
            <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "4px", fontFamily: "system-ui" }}>A savoir</div>
            <div style={{ color: C.menthe, fontSize: "12px", fontFamily: "system-ui", lineHeight: 1.6 }}>{territoire.particularites}</div>
          </div>

          {/* Distilleries */}
          <div style={{ marginBottom: "14px" }}>
            <div style={{ color: `${C.menthe}60`, fontSize: "9px", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "8px", fontFamily: "system-ui" }}>Nos distilleries partenaires</div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {territoire.distilleries.map((d, i) => (
                <span key={i} style={{ background: `rgba(255,255,255,.06)`, color: C.menthe, fontSize: "10px", padding: "3px 10px", borderRadius: "2px", fontFamily: "system-ui", border: `0.5px solid ${C.or}20` }}>{d}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button onClick={(e) => { e.stopPropagation(); onFilter(); }}
            style={{ background: C.or, color: C.noir, border: "none", padding: "10px 18px", borderRadius: "4px", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "system-ui" }}>
            Voir les futs de {territoire.nom} →
          </button>
        </div>
      )}

      {/* Footer fermé */}
      {!isOpen && (
        <div onClick={onToggle} style={{ padding: "10px 20px", color: C.or, fontSize: "11px", fontWeight: 600, fontFamily: "system-ui" }}>
          Voir le contexte et les distilleries →
        </div>
      )}
    </div>
  );
}

export default function RhumPage() {
  const [filtre, setFiltre] = useState<"tous" | "guadeloupe" | "martinique" | "millesime">("tous");
  const [territoireOuvert, setTerritoireOuvert] = useState<string | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  function toggleTerritoire(id: string) {
    setTerritoireOuvert(territoireOuvert === id ? null : id);
  }

  function handleFilter(id: string) {
    setFiltre(id as typeof filtre);
    setTimeout(() => { document.getElementById("selection")?.scrollIntoView({ behavior: "smooth" }); }, 100);
  }

  function handleFiltre(f: typeof filtre) {
    setFiltre(f);
  }

  const futsFiltres = FUTS.filter(f => {
    if (filtre === "guadeloupe") return f.ile === "Guadeloupe";
    if (filtre === "martinique") return f.ile === "Martinique";
    if (filtre === "millesime") return f.millesime;
    return true;
  });

  const colsFuts = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  const colsGP = isMobile ? "repeat(3, 1fr)" : "repeat(6, 1fr)";
  const colsMQ = isMobile ? "repeat(4, 1fr)" : "repeat(7, 1fr)";

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.creme, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ background: C.noir, borderBottom: `0.5px solid ${C.foret}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <LogoEmeraude size={isMobile ? 0.6 : 0.7} />
          </Link>
          {!isMobile && (
            <div style={{ display: "flex", gap: isTablet ? "16px" : "24px", alignItems: "center" }}>
              {[{ label: "Territoires", href: "#territoires" }, { label: "Notre selection", href: "#selection" }, { label: "Comment ca marche", href: "#processus" }, { label: "Distilleries", href: "/distilleries" }].map(l => (
                <a key={l.label} href={l.href} style={{ color: C.menthe, fontSize: "11px", cursor: "pointer", opacity: .8, textDecoration: "none" }}>{l.label}</a>
              ))}
              <NavbarAuth buttonBg="#C8992A" buttonColor="#0D2018" textColor="#9FE1CB" borderColor="rgba(200,153,42,.3)" />
            </div>
          )}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <NavbarAuth buttonBg="#C8992A" buttonColor="#0D2018" textColor="#9FE1CB" borderColor="rgba(200,153,42,.3)" />
              <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}>
                {[0,1,2].map(i => <div key={i} style={{ width: "22px", height: "2px", background: C.or, borderRadius: "2px" }} />)}
              </button>
            </div>
          )}
        </div>
        {isMobile && menuOpen && (
          <div style={{ background: C.foret, borderTop: `0.5px solid ${C.vert}30`, padding: "8px 16px" }}>
            {[{ label: "Territoires", href: "#territoires" }, { label: "Notre selection", href: "#selection" }, { label: "Comment ca marche", href: "#processus" }, { label: "Distilleries", href: "/distilleries" }].map(l => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{ display: "block", color: C.menthe, fontSize: "14px", textDecoration: "none", padding: "12px 0", borderBottom: `0.5px solid ${C.vert}30` }}>{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ background: C.noir, padding: "0", position: "relative", overflow: "hidden" }}>
        <Image src="/images/futs.jpg" alt="Chai de vieillissement rhum" fill style={{ objectFit: "cover", opacity: 0.15 }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 70% 50%, ${C.or}18 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, ${C.vert}22 0%, transparent 50%)` }} />
        {!isMobile && [...Array(8)].map((_, i) => (
          <div key={i} style={{ position: "absolute", width: `${80 + i * 20}px`, height: `${80 + i * 20}px`, border: `1px solid ${C.or}${i % 2 === 0 ? "18" : "0C"}`, borderRadius: "50%", top: `${-20 + i * 15}%`, right: `${-5 + i * 3}%`, pointerEvents: "none" }} />
        ))}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "48px 16px 40px" : "80px 24px 64px", position: "relative" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
            <span style={{ background: C.or, color: C.noir, fontSize: "9px", fontWeight: 700, padding: "3px 12px", borderRadius: "1px", letterSpacing: ".2em", textTransform: "uppercase" }}>AOC Certifie</span>
            <span style={{ border: `0.5px solid ${C.vert}`, color: C.menthe, fontSize: "9px", padding: "3px 12px", borderRadius: "1px", letterSpacing: ".15em", textTransform: "uppercase" }}>Guadeloupe & Martinique</span>
          </div>
          <h1 style={{ color: C.orPale, fontSize: isMobile ? "30px" : "clamp(28px, 5vw, 56px)", fontWeight: 300, lineHeight: 1.15, letterSpacing: "-1px", margin: "0 0 6px", fontFamily: "Georgia, 'Times New Roman', serif", maxWidth: "700px" }}>
            {"L'art du rhum vieux,"}
          </h1>
          <h1 style={{ color: C.or, fontSize: isMobile ? "30px" : "clamp(28px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-1px", margin: "0 0 20px", fontFamily: "Georgia, 'Times New Roman', serif", maxWidth: "700px", fontStyle: "italic" }}>
            enfin accessible a tous.
          </h1>
          <p style={{ color: C.menthe, fontSize: isMobile ? "14px" : "15px", lineHeight: 1.8, maxWidth: "520px", margin: "0 0 28px", opacity: .9 }}>
            Investissez dans des futs de rhum agricole AOC selectionnes par nos experts. Chaque fut vieillit en chai et genere un rendement historique de 8 a 15% par an.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="#territoires" style={{ background: C.or, color: C.noir, padding: isMobile ? "11px 20px" : "13px 28px", borderRadius: "2px", fontSize: "13px", fontWeight: 700, textDecoration: "none", letterSpacing: ".08em" }}>
              Explorer les territoires
            </a>
            <Link href="/simulateur" style={{ background: "transparent", color: C.orClair, border: `1px solid ${C.vert}`, padding: isMobile ? "11px 20px" : "13px 28px", borderRadius: "2px", fontSize: "13px", textDecoration: "none" }}>
              Simuler mon rendement →
            </Link>
          </div>
        </div>
        <div style={{ background: C.foret, borderTop: `1px solid ${C.vert}30` }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)" }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: isMobile ? "14px 8px" : "20px 16px", borderRight: isMobile ? (i % 2 === 0 ? `0.5px solid ${C.vert}40` : "none") : (i < 3 ? `0.5px solid ${C.vert}40` : "none"), borderBottom: isMobile && i < 2 ? `0.5px solid ${C.vert}40` : "none" }}>
                <div style={{ color: C.or, fontSize: isMobile ? "18px" : "22px", fontWeight: 700, fontFamily: "Georgia, serif" }}>{s.val}</div>
                <div style={{ color: C.menthe, fontSize: "9px", letterSpacing: ".08em", textTransform: "uppercase", marginTop: "2px" }}>{s.label}</div>
                <div style={{ color: `${C.menthe}70`, fontSize: "8px", marginTop: "1px" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISTILLERIES PARTENAIRES */}
      <section style={{ background: C.noir, padding: isMobile ? "40px 16px" : "56px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px" }}>Nos partenaires</div>
            <h2 style={{ color: C.orPale, fontSize: isMobile ? "20px" : "26px", fontWeight: 300, fontFamily: "Georgia, serif", margin: "0 0 8px" }}>
              13 distilleries d'exception selectionnees
            </h2>
            {!isMobile && <p style={{ color: C.menthe, fontSize: "13px", opacity: .7, margin: 0 }}>Guadeloupe & Martinique · AOC Certifiees · Selection exclusive CaribbeanVault</p>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div style={{ flex: 1, height: "0.5px", background: `${C.or}30` }} />
            <span style={{ color: C.or, fontSize: "9px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase" }}>Guadeloupe</span>
            <div style={{ flex: 1, height: "0.5px", background: `${C.or}30` }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: colsGP, gap: "2px", marginBottom: "16px" }}>
            {DISTILLERIES_GUADELOUPE.map((d, i) => <DistillerieCard key={i} d={d} ile="Guadeloupe" />)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div style={{ flex: 1, height: "0.5px", background: `${C.or}30` }} />
            <span style={{ color: C.or, fontSize: "9px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase" }}>Martinique</span>
            <div style={{ flex: 1, height: "0.5px", background: `${C.or}30` }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: colsMQ, gap: "2px", marginBottom: "28px" }}>
            {DISTILLERIES_MARTINIQUE.map((d, i) => <DistillerieCard key={i} d={d} ile="Martinique" />)}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.or }} />
              <span style={{ color: C.menthe, fontSize: "11px", opacity: .7 }}>{"Futs disponibles a l'investissement"}</span>
            </div>
            <Link href="/distilleries" style={{ background: "transparent", color: C.or, border: `0.5px solid ${C.or}`, padding: "10px 22px", borderRadius: "2px", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>
              {"Decouvrir toutes les distilleries →"}
            </Link>
          </div>
        </div>
      </section>

      {/* TERRITOIRES — cartes rétractables avec image île */}
      <section id="territoires" style={{ padding: isMobile ? "48px 16px" : "64px 24px", background: C.noir }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "28px" }}>
            <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px" }}>Nos marches</div>
            <h2 style={{ color: C.orPale, fontSize: isMobile ? "22px" : "28px", fontWeight: 300, fontFamily: "Georgia, serif", margin: "0 0 6px" }}>Par territoire</h2>
            {!isMobile && <p style={{ color: C.menthe, fontSize: "13px", opacity: .7, margin: 0 }}>Cliquez sur un territoire pour decouvrir son contexte et filtrer les futs disponibles.</p>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "14px" }}>
            {TERRITOIRES.map(t => (
              <TerritoireCard
                key={t.id}
                territoire={t}
                isOpen={territoireOuvert === t.id}
                onToggle={() => toggleTerritoire(t.id)}
                onFilter={() => handleFilter(t.id)}
                isMobile={isMobile}
              />
            ))}
          </div>
          {/* Prochains pays */}
          <div style={{ marginTop: "20px", padding: "14px 20px", background: `${C.or}08`, borderRadius: "12px", border: `0.5px solid ${C.or}20`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <div style={{ color: C.orClair, fontSize: "13px", fontWeight: 600, marginBottom: "2px" }}>Expansion Caraibe anglophone et hispanophone</div>
              <div style={{ color: C.menthe, fontSize: "12px", opacity: .7 }}>Jamaica, Trinidad, Cuba, Dominican Rep., Barbados — lancement prevu 2027</div>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {["🇯🇲", "🇹🇹", "🇨🇺", "🇩🇴", "🇧🇧"].map((f, i) => (
                <span key={i} style={{ fontSize: "18px", opacity: .4 }}>{f}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SELECTION DE FUTS */}
      <section id="selection" style={{ padding: isMobile ? "48px 16px" : "72px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "28px" }}>
            <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px" }}>Notre selection</div>
            <h2 style={{ color: C.texte, fontSize: isMobile ? "22px" : "28px", fontWeight: 700, margin: "0 0 16px", fontFamily: "Georgia, serif" }}>
              {"Futs disponibles a l'investissement"}
            </h2>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[{ key: "tous", label: "Tous" }, { key: "guadeloupe", label: "🇬🇵 Guadeloupe" }, { key: "martinique", label: "🇲🇶 Martinique" }, { key: "millesime", label: "★ Millesimes" }].map(f => (
                <button key={f.key} onClick={() => handleFiltre(f.key as typeof filtre)} style={{ padding: "7px 14px", borderRadius: "2px", cursor: "pointer", fontSize: "11px", fontWeight: 600, border: filtre === f.key ? `1.5px solid ${C.or}` : `1px solid #D1C5B0`, background: filtre === f.key ? C.foret : "white", color: filtre === f.key ? C.or : C.gris, transition: "all .15s" }}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: colsFuts, gap: "16px" }}>
            {futsFiltres.map(fut => {
              const pct = Math.round(((fut.tokens - fut.disponibles) / fut.tokens) * 100);
              const complet = fut.disponibles === 0;
              return (
                <div key={fut.id} onMouseEnter={() => setHovered(fut.id)} onMouseLeave={() => setHovered(null)}
                  style={{ background: "white", borderRadius: "6px", overflow: "hidden", border: hovered === fut.id ? `1.5px solid ${C.or}` : "1px solid #E8E2D6", transition: "all .2s", opacity: complet ? .65 : 1 }}>
                  <div style={{ background: fut.millesime ? C.foret : C.emeraude, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ color: C.or, fontSize: "11px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>{fut.distillerie}</div>
                      <div style={{ color: C.menthe, fontSize: "10px", marginTop: "2px" }}>{fut.ile} · {fut.annee}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                      <StatutBadge statut={fut.statut} />
                      {fut.millesime && <span style={{ background: C.or, color: C.noir, fontSize: "8px", fontWeight: 700, padding: "1px 6px", borderRadius: "1px", textTransform: "uppercase" }}>★ Millesime</span>}
                    </div>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ color: C.texte, fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>{fut.type}</div>
                    <div style={{ color: C.gris, fontSize: "11px", marginBottom: "12px" }}>{fut.baril}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                      {[{ label: "Prix / token", val: `${fut.prixToken}€` }, { label: "Rendement est.", val: fut.rendementEst }, { label: "Maturite", val: fut.maturite }, { label: "Tokens dispo.", val: complet ? "Complet" : `${fut.disponibles}/${fut.tokens}` }].map(info => (
                        <div key={info.label}>
                          <div style={{ color: "#9CA3AF", fontSize: "9px", textTransform: "uppercase", letterSpacing: ".08em" }}>{info.label}</div>
                          <div style={{ color: C.texte, fontSize: "13px", fontWeight: 700, marginTop: "1px" }}>{info.val}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginBottom: "14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={{ color: C.gris, fontSize: "10px" }}>Progression</span>
                        <span style={{ color: C.or, fontSize: "10px", fontWeight: 700 }}>{pct}%</span>
                      </div>
                      <div style={{ background: "#F0EBE1", borderRadius: "2px", height: "4px" }}>
                        <div style={{ background: pct >= 90 ? "#A32D2D" : C.or, height: "100%", borderRadius: "2px", width: `${pct}%`, transition: "width .5s" }} />
                      </div>
                    </div>
                    {complet ? (
                      <div style={{ background: "#F1EFE8", color: "#888780", padding: "10px", borderRadius: "3px", fontSize: "12px", textAlign: "center" }}>
                        {"Fut complet · Liste d'attente →"}
                      </div>
                    ) : (
                      <Link href="#portefeuille" style={{ display: "block", background: C.foret, color: C.or, padding: "10px", borderRadius: "3px", fontSize: "12px", textAlign: "center", fontWeight: 700, textDecoration: "none", border: `1px solid ${C.or}30` }}>
                        Investir dans ce fut →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {futsFiltres.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 20px", background: "white", borderRadius: "8px", border: "1px solid #E8E2D6" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>🥃</div>
              <div style={{ color: C.texte, fontSize: "15px", fontWeight: 600, marginBottom: "6px" }}>Aucun fut pour ce filtre</div>
              <button onClick={() => setFiltre("tous")} style={{ background: C.foret, color: C.or, border: "none", padding: "10px 20px", borderRadius: "4px", fontSize: "12px", cursor: "pointer", marginTop: "8px" }}>
                Voir tous les futs
              </button>
            </div>
          )}
        </div>
      </section>

      {/* COMMENT CA MARCHE */}
      <section id="processus" style={{ background: C.noir, padding: isMobile ? "48px 16px" : "72px 24px", position: "relative", overflow: "hidden" }}>
        <Image src="/images/canne.jpg" alt="Champs de canne a sucre" fill style={{ objectFit: "cover", opacity: 0.35 }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px" }}>Le processus</div>
            <h2 style={{ color: C.orPale, fontSize: isMobile ? "22px" : "28px", fontWeight: 300, fontFamily: "Georgia, serif", margin: 0 }}>
              De la canne a sucre a votre portefeuille
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: "2px" }}>
            {ETAPES.map((e, i) => (
              <div key={i} style={{ background: i % 2 === 0 ? C.foret : C.emeraude, padding: isMobile ? "20px 14px" : "28px 20px" }}>
                <div style={{ color: C.or, fontSize: isMobile ? "24px" : "32px", fontFamily: "Georgia, serif", fontWeight: 300, opacity: .5, marginBottom: "10px" }}>{e.num}</div>
                <div style={{ color: C.or, fontSize: "11px", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "8px" }}>{e.titre}</div>
                <div style={{ color: C.menthe, fontSize: "11px", lineHeight: 1.7, opacity: .85 }}>{e.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REJOINDRE */}
      <section id="portefeuille" style={{ background: C.foret, padding: isMobile ? "48px 16px" : "72px 24px", position: "relative", overflow: "hidden" }}>
        <Image src="/images/recolte.jpg" alt="Recolte de canne a sucre" fill style={{ objectFit: "cover", opacity: 0.15 }} />
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ position: "relative", marginBottom: "24px" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", border: `1px solid ${C.or}40`, margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", border: `1px solid ${C.or}70`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "24px" }}>🥃</span>
              </div>
            </div>
          </div>
          <div style={{ color: C.or, fontSize: "10px", fontWeight: 700, letterSpacing: ".25em", textTransform: "uppercase", marginBottom: "14px" }}>Acces privilegie</div>
          <h2 style={{ color: C.orPale, fontSize: isMobile ? "22px" : "28px", fontWeight: 300, fontFamily: "Georgia, serif", lineHeight: 1.3, margin: "0 0 14px" }}>
            Rejoignez la famille CaribbeanVault
          </h2>
          <p style={{ color: C.menthe, fontSize: "14px", lineHeight: 1.8, margin: "0 0 28px", opacity: .9 }}>
            {"Accedez en avant-premiere aux nouveaux futs, aux visites de distilleries exclusives et aux millesimes rares."}
          </p>
          <Link href="/kyc" style={{ display: "inline-block", background: C.or, color: C.noir, padding: "14px 32px", borderRadius: "2px", fontSize: "13px", fontWeight: 700, textDecoration: "none", letterSpacing: ".1em", textTransform: "uppercase" }}>
            Rejoindre la famille CaribbeanVault
          </Link>
          <p style={{ color: `${C.menthe}60`, fontSize: "10px", letterSpacing: ".05em", marginTop: "16px" }}>
            {"Gratuit · Selection sur dossier · Aucun engagement d'investissement"}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
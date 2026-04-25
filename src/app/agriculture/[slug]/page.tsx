"use client";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LogoEmeraude } from "@/components/Logo";
import Footer from "@/components/Footer";
import NavbarAuth from "@/components/NavbarAuth";
import { PARCELLES, getParcelle } from "@/lib/parcelles";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { createBrowserClient } from "@supabase/ssr";

const CarteLeaflet = dynamic(() => import("@/components/CarteLeaflet"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "220px", background: "#EAF3DE", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#5A8A3C", fontSize: "13px", fontFamily: "system-ui" }}>Chargement de la carte...</span>
    </div>
  ),
});

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

export default function ParcellePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const parcelle = getParcelle(slug);
  const [montant, setMontant] = useState(1000);
  const [authChecked, setAuthChecked] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  // Protection de la route — redirection si non connecté
  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        window.location.href = "/login";
      } else {
        setAuthChecked(true);
      }
    });
  }, []);

  if (!authChecked) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.terre }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "32px", marginBottom: "16px" }}>⏳</div>
          <div style={{ color: C.texteSec, fontSize: "14px", fontFamily: "system-ui" }}>Verification de votre acces...</div>
        </div>
      </div>
    );
  }

  if (!parcelle) {
    return (
      <main style={{ fontFamily: "system-ui", background: C.terre, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "24px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🌿</div>
          <h1 style={{ color: C.texte, fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Parcelle introuvable</h1>
          <p style={{ color: C.texteSec, fontSize: "14px", marginBottom: "20px" }}>Cette parcelle n'existe pas dans notre selection.</p>
          <Link href="/agriculture" style={{ background: C.feuille, color: "white", padding: "12px 24px", borderRadius: "3px", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
            Voir toutes les parcelles
          </Link>
        </div>
      </main>
    );
  }

  const pct = Math.round(((parcelle.tokens - parcelle.disponibles) / parcelle.tokens) * 100);
  const complet = parcelle.disponibles === 0;
  const tokensAchat = Math.floor(montant / parcelle.prixToken);
  const rendementAnnuel = tokensAchat * parcelle.prixToken * (parseFloat(parcelle.rendementEst.split("-")[1]) / 100);

  const autresParcelles = PARCELLES.filter(p => p.ile === parcelle.ile && p.slug !== parcelle.slug).slice(0, 3);

  // Format pour CarteLeaflet
  const bienLeaflet = [{
    id: 1, nom: parcelle.nom, ile: parcelle.ile, region: parcelle.region,
    photo: parcelle.photo, type: parcelle.culture, tag: parcelle.tag,
    tagColor: parcelle.tagColor, rendementBrut: parcelle.rendementEst,
    occupation: "100%", revenuEstime: `Sur ${parcelle.duree}`,
    prixToken: parcelle.prixToken, tokensDispo: parcelle.disponibles,
    tokensTotal: parcelle.tokens, statut: parcelle.statut,
    tagColor2: parcelle.tagColor, couleur: parcelle.couleur,
    adresse: parcelle.adresse,
    coordonnees: parcelle.coordonnees,
  }];

  // Composant sidebar partagé
  const SidebarContent = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: isMobile ? "20px" : "0" }}>
      {/* Carte investissement */}
      <div style={{ background: complet ? C.terreB : C.foret, borderRadius: "8px", padding: "20px" }}>
        {complet ? (
          <>
            <div style={{ color: C.texteSec, fontSize: "12px", marginBottom: "10px", fontWeight: 600, fontFamily: "system-ui" }}>Levee terminee</div>
            <p style={{ color: C.texteSec, fontSize: "12px", lineHeight: 1.6, margin: "0 0 12px", fontFamily: "system-ui" }}>
              {"Rejoignez la liste d'attente pour etre alerte en priorite lors de la prochaine levee."}
            </p>
            <Link href="/kyc" style={{ display: "block", background: C.feuille, color: "white", padding: "11px", borderRadius: "3px", fontSize: "12px", textAlign: "center", fontWeight: 700, textDecoration: "none", fontFamily: "system-ui" }}>
              {"Rejoindre la liste d'attente"}
            </Link>
          </>
        ) : (
          <>
            <div style={{ color: C.paille, fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "system-ui" }}>
              Investir dans cette parcelle
            </div>
            <div style={{ color: C.cremeV, fontSize: "26px", fontWeight: 700, marginBottom: "2px" }}>
              {parcelle.rendementEst}
            </div>
            <div style={{ color: C.menthe, fontSize: "12px", marginBottom: "14px", opacity: .8, fontFamily: "system-ui" }}>rendement estime</div>

            {/* Progression */}
            <div style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: C.menthe, fontSize: "11px", fontFamily: "system-ui" }}>Levee en cours</span>
                <span style={{ color: C.paille, fontSize: "11px", fontWeight: 700, fontFamily: "system-ui" }}>{pct}%</span>
              </div>
              <div style={{ background: C.vert, borderRadius: "2px", height: "6px" }}>
                <div style={{ background: pct >= 95 ? "#A32D2D" : C.feuille, height: "100%", borderRadius: "2px", width: `${pct}%` }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                <span style={{ color: `${C.menthe}80`, fontSize: "10px", fontFamily: "system-ui" }}>{parcelle.tokens - parcelle.disponibles} tokens vendus</span>
                <span style={{ color: `${C.menthe}80`, fontSize: "10px", fontFamily: "system-ui" }}>{parcelle.disponibles} restants</span>
              </div>
            </div>

            {/* Métriques */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "14px" }}>
              {[
                { label: "Prix / token", val: `${parcelle.prixToken}€` },
                { label: "Tokens dispo.", val: String(parcelle.disponibles) },
                { label: "Duree", val: parcelle.duree },
                { label: "Recolte", val: parcelle.recolte },
              ].map((m, i) => (
                <div key={i} style={{ background: C.vert, borderRadius: "4px", padding: "8px 10px" }}>
                  <div style={{ color: `${C.menthe}80`, fontSize: "9px", marginBottom: "2px", fontFamily: "system-ui" }}>{m.label}</div>
                  <div style={{ color: C.cremeV, fontSize: "12px", fontWeight: 700, fontFamily: "system-ui" }}>{m.val}</div>
                </div>
              ))}
            </div>

            {/* Simulateur */}
            <div style={{ background: C.vert, borderRadius: "6px", padding: "12px", marginBottom: "12px" }}>
              <div style={{ color: C.paille, fontSize: "11px", fontWeight: 600, marginBottom: "8px", fontFamily: "system-ui" }}>Simulez votre investissement</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: C.menthe, fontSize: "11px", fontFamily: "system-ui" }}>Montant</span>
                <span style={{ color: C.paille, fontSize: "12px", fontWeight: 700, fontFamily: "system-ui" }}>{montant}€</span>
              </div>
              <input type="range" min={parcelle.prixToken} max={parcelle.disponibles * parcelle.prixToken} step={parcelle.prixToken} value={montant}
                onChange={e => setMontant(Number(e.target.value))}
                style={{ width: "100%", accentColor: C.feuille }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
                <div style={{ background: C.foret, borderRadius: "4px", padding: "8px", textAlign: "center" }}>
                  <div style={{ color: `${C.menthe}80`, fontSize: "9px", fontFamily: "system-ui" }}>Tokens acquis</div>
                  <div style={{ color: C.cremeV, fontSize: "14px", fontWeight: 700, fontFamily: "system-ui" }}>{tokensAchat}</div>
                </div>
                <div style={{ background: C.foret, borderRadius: "4px", padding: "8px", textAlign: "center" }}>
                  <div style={{ color: `${C.menthe}80`, fontSize: "9px", fontFamily: "system-ui" }}>Revenu estime</div>
                  <div style={{ color: C.paille, fontSize: "14px", fontWeight: 700, fontFamily: "system-ui" }}>{Math.round(rendementAnnuel)}€</div>
                </div>
              </div>
            </div>

            <Link href="/kyc" style={{ display: "block", background: C.feuille, color: "white", padding: "13px", borderRadius: "3px", fontSize: "13px", textAlign: "center", fontWeight: 700, textDecoration: "none", fontFamily: "system-ui" }}>
              Investir dans cette parcelle →
            </Link>
            <p style={{ color: `${C.menthe}60`, fontSize: "10px", textAlign: "center", marginTop: "8px", fontFamily: "system-ui" }}>
              KYC requis · Minimum {parcelle.prixToken}€ · Risque de perte en capital
            </p>
          </>
        )}
      </div>

      {/* Infos pratiques */}
      <div style={{ background: C.blanc, borderRadius: "8px", border: `1px solid #D5CCBA`, padding: "18px" }}>
        <div style={{ color: C.pailleC, fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "12px", fontFamily: "system-ui" }}>Informations</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            { label: "Producteur", val: parcelle.producteur },
            { label: "Surface", val: parcelle.surface },
            { label: "Assurance", val: parcelle.assurance },
            { label: "Adresse", val: parcelle.adresse },
          ].map((r, i) => (
            <div key={i}>
              <div style={{ color: C.texteTert, fontSize: "10px", textTransform: "uppercase", letterSpacing: ".08em", fontFamily: "system-ui" }}>{r.label}</div>
              <div style={{ color: C.texte, fontSize: "12px", marginTop: "2px", fontFamily: "system-ui" }}>{r.val}</div>
            </div>
          ))}
          {parcelle.site && (
            <div>
              <div style={{ color: C.texteTert, fontSize: "10px", textTransform: "uppercase", letterSpacing: ".08em", fontFamily: "system-ui" }}>Site officiel</div>
              <a href={parcelle.site} target="_blank" rel="noopener noreferrer" style={{ color: C.feuille, fontSize: "12px", textDecoration: "none", fontFamily: "system-ui" }}>
                {parcelle.site.replace("https://", "")} →
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Simulateur complet */}
      <div style={{ background: C.foret, borderRadius: "8px", padding: "18px", textAlign: "center" }}>
        <div style={{ fontSize: "20px", marginBottom: "8px" }}>📊</div>
        <div style={{ color: C.paille, fontSize: "12px", fontWeight: 600, marginBottom: "6px", fontFamily: "system-ui" }}>Simulation complete</div>
        <p style={{ color: C.menthe, fontSize: "11px", lineHeight: 1.6, margin: "0 0 12px", fontFamily: "system-ui", opacity: .8 }}>
          Calculez vos projections sur 1, 3 ou 5 ans avec 3 scenarios.
        </p>
        <Link href="/simulateur" style={{ display: "block", background: C.feuille, color: "white", padding: "10px", borderRadius: "3px", fontSize: "12px", fontWeight: 600, textDecoration: "none", fontFamily: "system-ui" }}>
          Ouvrir le simulateur →
        </Link>
      </div>
    </div>
  );

  return (
    <main style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: C.terre, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ background: C.foret, borderBottom: `0.5px solid ${C.vert}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 200 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <LogoEmeraude size={isMobile ? 0.6 : 0.7} />
          </Link>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Link href="/agriculture" style={{ color: C.menthe, fontSize: "11px", textDecoration: "none", opacity: .8, fontFamily: "system-ui" }}>
              {isMobile ? "← Parcelles" : "← Toutes les parcelles"}
            </Link>
            <NavbarAuth buttonBg="#C8992A" buttonColor="#0D2018" textColor="#9FE1CB" borderColor="rgba(200,153,42,.3)" />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: parcelle.couleur, padding: isMobile ? "36px 16px 28px" : "64px 24px 48px", position: "relative", overflow: "hidden" }}>
        {!isMobile && [300, 200, 120].map((size, i) => (
          <div key={i} style={{ position: "absolute", right: `-${size / 3}px`, top: "50%", transform: "translateY(-50%)", width: `${size}px`, height: `${size}px`, borderRadius: "50%", border: `1px solid ${C.paille}${["15", "20", "30"][i]}` }} />
        ))}
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Link href="/agriculture" style={{ color: C.menthe, fontSize: "11px", textDecoration: "none", opacity: .7, fontFamily: "system-ui" }}>Agriculture</Link>
              <span style={{ color: C.menthe, opacity: .4 }}>›</span>
              <span style={{ color: C.menthe, fontSize: "11px", opacity: .7, fontFamily: "system-ui" }}>{parcelle.ile}</span>
              <span style={{ color: C.menthe, opacity: .4 }}>›</span>
              <span style={{ color: C.paille, fontSize: "11px", fontFamily: "system-ui" }}>{parcelle.culture}</span>
            </div>
          )}
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            <span style={{ background: parcelle.tagColor, color: "white", fontSize: "9px", fontWeight: 700, padding: "3px 12px", borderRadius: "1px", letterSpacing: ".2em", textTransform: "uppercase", fontFamily: "system-ui" }}>{parcelle.tag}</span>
            <span style={{ border: `0.5px solid ${C.menthe}`, color: C.menthe, fontSize: "9px", padding: "3px 12px", borderRadius: "1px", textTransform: "uppercase", fontFamily: "system-ui" }}>
              {parcelle.ile} · {parcelle.surface}
            </span>
            {complet && <span style={{ background: "rgba(255,255,255,.15)", color: "rgba(255,255,255,.8)", fontSize: "9px", fontWeight: 700, padding: "3px 12px", borderRadius: "1px", fontFamily: "system-ui" }}>Complet</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
            <span style={{ fontSize: isMobile ? "36px" : "48px" }}>{parcelle.icone}</span>
            <div>
              <h1 style={{ color: C.terreB, fontSize: isMobile ? "22px" : "clamp(22px, 3.5vw, 40px)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 4px" }}>
                {parcelle.culture}
              </h1>
              <div style={{ color: C.paille, fontSize: isMobile ? "14px" : "16px", fontWeight: 400, fontFamily: "system-ui" }}>
                {parcelle.producteur} · {parcelle.region}
              </div>
            </div>
          </div>
          <p style={{ color: C.menthe, fontSize: isMobile ? "13px" : "15px", lineHeight: 1.8, maxWidth: "580px", margin: "0 0 20px", opacity: .9, fontFamily: "system-ui" }}>
            {parcelle.description}
          </p>
          {/* Stats */}
          <div style={{ display: "flex", gap: "0", flexWrap: "wrap", borderTop: `0.5px solid ${C.paille}30`, paddingTop: "18px" }}>
            {[
              { val: parcelle.rendementEst, label: "Rendement estime" },
              { val: parcelle.duree, label: "Duree" },
              { val: `${parcelle.prixToken}€`, label: "Prix / token" },
              { val: parcelle.recolte, label: "Recolte prevue" },
            ].map((s, i) => (
              <div key={i} style={{ paddingRight: isMobile ? "14px" : "28px", marginRight: isMobile ? "14px" : "28px", borderRight: i < 3 ? `0.5px solid ${C.paille}20` : "none", marginBottom: "8px" }}>
                <div style={{ color: C.paille, fontSize: isMobile ? "14px" : "18px", fontWeight: 700, fontFamily: "system-ui" }}>{s.val}</div>
                <div style={{ color: C.menthe, fontSize: "9px", letterSpacing: ".07em", textTransform: "uppercase", marginTop: "2px", opacity: .7, fontFamily: "system-ui" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "20px 16px 40px" : "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "2fr 1fr", gap: "24px", alignItems: "start" }}>

          {/* COLONNE PRINCIPALE */}
          <div>

            {/* Sidebar mobile en haut */}
            {isMobile && <SidebarContent />}

            {/* Histoire */}
            <div style={{ background: C.blanc, borderRadius: "8px", border: `1px solid #D5CCBA`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>Notre histoire</div>
              <p style={{ color: C.texteSec, fontSize: "14px", lineHeight: 1.9, margin: 0, fontFamily: "system-ui" }}>{parcelle.histoire}</p>
            </div>

            {/* Techniques */}
            <div style={{ background: C.blanc, borderRadius: "8px", border: `1px solid #D5CCBA`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "system-ui" }}>Techniques culturales</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {parcelle.techniques.map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 12px", background: C.cremeV, borderRadius: "4px", borderLeft: `3px solid ${C.feuille}` }}>
                    <span style={{ color: C.feuille, fontSize: "14px", flexShrink: 0 }}>🌱</span>
                    <span style={{ color: C.texte, fontSize: "13px", fontFamily: "system-ui" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div style={{ background: C.blanc, borderRadius: "8px", border: `1px solid #D5CCBA`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "system-ui" }}>Certifications & garanties</div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "10px" }}>
                {parcelle.certificationDetails.map((c, i) => (
                  <div key={i} style={{ padding: "12px", background: C.terre, borderRadius: "4px", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: parcelle.tagColor, fontSize: "14px", flexShrink: 0 }}>✓</span>
                    <span style={{ color: C.texte, fontSize: "12px", fontFamily: "system-ui" }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Carte */}
            <div style={{ background: C.blanc, borderRadius: "8px", border: `1px solid #D5CCBA`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>Localisation</div>
              <p style={{ color: C.texteSec, fontSize: "13px", marginBottom: "12px", fontFamily: "system-ui" }}>{parcelle.adresse}</p>
              <CarteLeaflet biens={bienLeaflet as any} onBienClick={() => {}} />
            </div>

            {/* Récompenses */}
            <div style={{ background: C.blanc, borderRadius: "8px", border: `1px solid #D5CCBA`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "system-ui" }}>Distinctions & recompenses</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {parcelle.recompenses.map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ color: C.pailleC, fontSize: "14px", flexShrink: 0 }}>★</span>
                    <span style={{ color: C.texteSec, fontSize: "13px", fontFamily: "system-ui" }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div style={{ background: C.blanc, borderRadius: "8px", border: `1px solid #D5CCBA`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "system-ui" }}>Documents legaux</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { nom: "Titre de propriete / bail agricole", disponible: true },
                  { nom: "Certificat de certification", disponible: true },
                  { nom: "Rapport d'audit independant", disponible: true },
                  { nom: "Contrat d'assurance recolte", disponible: true },
                  { nom: "Smart contract audite XRPL", disponible: false },
                ].map((doc, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: C.terre, borderRadius: "4px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "14px" }}>📄</span>
                      <span style={{ color: C.texte, fontSize: "12px", fontFamily: "system-ui" }}>{doc.nom}</span>
                    </div>
                    {doc.disponible ? (
                      <span style={{ color: C.feuille, fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "system-ui" }}>Telecharger →</span>
                    ) : (
                      <span style={{ color: C.texteTert, fontSize: "11px", fontFamily: "system-ui" }}>KYC requis</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Risques */}
            <div style={{ background: "#FFFBEB", borderRadius: "8px", border: "1px solid #FCD34D44", padding: isMobile ? "16px" : "22px", marginBottom: "16px" }}>
              <div style={{ color: "#92400E", fontSize: "12px", fontWeight: 700, marginBottom: "10px", fontFamily: "system-ui" }}>⚠️ Avertissements et risques</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  "L'investissement agricole tokenise comporte des risques de perte en capital.",
                  "Les rendements passes ne prejudgent pas des rendements futurs.",
                  "Les risques climatiques (cyclones, secheresses) sont partiellement couverts par l'assurance recolte.",
                  "CaribbeanVault ne fournit pas de conseil en investissement.",
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: "6px", fontSize: "12px", color: "#92400E", fontFamily: "system-ui" }}>
                    <span style={{ flexShrink: 0 }}>›</span><span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Autres parcelles */}
            {autresParcelles.length > 0 && (
              <div style={{ background: C.blanc, borderRadius: "8px", border: `1px solid #D5CCBA`, padding: isMobile ? "18px" : "28px" }}>
                <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "6px", fontFamily: "system-ui" }}>Aussi en {parcelle.ile}</div>
                <h3 style={{ color: C.texte, fontSize: "15px", fontWeight: 700, margin: "0 0 14px", fontFamily: "system-ui" }}>Autres parcelles disponibles</h3>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(autresParcelles.length, 3)}, 1fr)`, gap: "10px" }}>
                  {autresParcelles.map(p => (
                    <Link key={p.slug} href={`/agriculture/${p.slug}`} style={{ textDecoration: "none" }}>
                      <div style={{ background: p.couleur, borderRadius: "6px", padding: "14px", transition: "transform .2s" }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "none")}
                      >
                        <div style={{ fontSize: "20px", marginBottom: "6px" }}>{p.icone}</div>
                        <div style={{ color: C.paille, fontSize: "12px", fontWeight: 700, marginBottom: "3px", fontFamily: "system-ui" }}>{p.culture}</div>
                        <div style={{ color: C.menthe, fontSize: "10px", fontFamily: "system-ui", opacity: .8 }}>{p.rendementEst}</div>
                        <div style={{ color: C.paille, fontSize: "11px", fontWeight: 700, marginTop: "8px", fontFamily: "system-ui" }}>Decouvrir →</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR DESKTOP */}
          {!isMobile && (
            <div style={{ position: "sticky", top: "76px" }}>
              <SidebarContent />
            </div>
          )}
        </div>
      </div>

      {/* BARRE FIXE MOBILE */}
      {isMobile && !complet && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.blanc, borderTop: `0.5px solid #D5CCBA`, padding: "12px 16px", zIndex: 150, display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.texteTert, fontSize: "10px", fontFamily: "system-ui" }}>Rendement estime</div>
            <div style={{ color: C.feuille, fontSize: "18px", fontWeight: 800, fontFamily: "system-ui" }}>{parcelle.rendementEst}</div>
          </div>
          <Link href="/kyc" style={{ background: C.feuille, color: "white", padding: "13px 24px", borderRadius: "3px", fontSize: "14px", fontWeight: 700, textDecoration: "none", flexShrink: 0, fontFamily: "system-ui" }}>
            Investir →
          </Link>
        </div>
      )}

      <Footer />
    </main>
  );
}
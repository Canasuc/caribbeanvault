"use client";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useTranslations, useLocale } from "next-intl";
import { LogoNavy } from "@/components/Logo";
import Footer from "@/components/Footer";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const C = {
  navy:     "#1A2E4A",
  navyL:    "#253D5E",
  sable:    "#D4884A",
  sableL:   "#FFF7ED",
  creme:    "#F8F6F1",
  cremeB:   "#F0EBE1",
  grisBord: "#E8E2D6",
  texte:    "#1A2E4A",
  texteSec: "#4A5568",
  texteTert:"#9CA3AF",
  blanc:    "#FFFFFF",
  vert:     "#0F6E56",
  vertL:    "#E1F5EE",
};

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const [user, setUser] = useState<any>(null);
  const [investisseur, setInvestisseur] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    async function loadData() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.href = `/${locale}/login`; return; }
      setUser(session.user);
      const { data } = await supabase.from("investisseurs").select("*").eq("email", session.user.email).single();
      if (data) setInvestisseur(data);
      setLoading(false);
    }
    loadData();
  }, []);

  async function handleSignOut() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    window.location.href = `/${locale}`;
  }

  if (loading) {
    return (
      <main style={{ fontFamily: "system-ui", background: C.creme, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "32px", marginBottom: "16px" }}>⏳</div>
          <div style={{ color: C.texteSec, fontSize: "14px" }}>Chargement...</div>
        </div>
      </main>
    );
  }

  const ACTIFS = [
    { label: "Rhum AOC", icon: "🥃", href: `/${locale}/rhum`, color: "#0F5240", desc: t("rhum_desc") },
    { label: t("actifs_label") === "Nos actifs" ? "Immobilier" : "Real Estate", icon: "🏠", href: `/${locale}/immobilier`, color: "#0891B2", desc: t("immo_desc") },
    { label: "Agriculture", icon: "🌿", href: `/${locale}/agriculture`, color: "#2C3A1E", desc: t("agri_desc") },
    { label: "Art Créole", icon: "🎨", href: `/${locale}/art`, color: "#1A0A2E", desc: t("art_desc") },
    { label: "Distilleries", icon: "🏭", href: `/${locale}/distilleries`, color: "#0F3D2A", desc: t("distilleries_desc") },
    { label: "Actualités", icon: "📰", href: `/${locale}/actualites`, color: "#1A2E4A", desc: t("actualites_desc") },
  ];

  const ETAPES = [
    { titre: t("etape1_titre"), desc: t("etape1_desc"), done: true },
    { titre: t("etape2_titre"), desc: t("etape2_desc"), done: false },
    { titre: t("etape3_titre"), desc: t("etape3_desc"), done: false },
    { titre: t("etape4_titre"), desc: t("etape4_desc"), done: false },
  ];

  const colsActifs = isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)";

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.creme, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ background: C.blanc, borderBottom: `0.5px solid ${C.grisBord}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: isMobile ? "60px" : "72px" }}>
          <Link href={`/${locale}`} style={{ textDecoration: "none" }}>
            <LogoNavy size={isMobile ? 0.7 : 0.85} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {!isMobile && (
              <span style={{ color: C.texteSec, fontSize: "12px" }}>
                {investisseur ? `${investisseur.prenom} ${investisseur.nom}` : user?.email}
              </span>
            )}
            <button onClick={handleSignOut} style={{ background: C.creme, color: C.texteSec, border: `0.5px solid ${C.grisBord}`, padding: isMobile ? "7px 12px" : "7px 16px", borderRadius: "8px", fontSize: "12px", cursor: "pointer" }}>
              {t("deconnexion")}
            </button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "20px 16px 40px" : "40px 24px 60px" }}>

        {/* HERO BIENVENUE */}
        <div style={{ background: C.navy, borderRadius: "16px", padding: isMobile ? "24px 20px" : "36px 40px", marginBottom: "20px", position: "relative", overflow: "hidden" }}>
          {/* Décorations */}
          <div style={{ position: "absolute", right: "-30px", top: "-30px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(212,136,74,.08)" }} />
          <div style={{ position: "absolute", right: "60px", top: "60px", width: "130px", height: "130px", borderRadius: "50%", background: "rgba(212,136,74,.06)" }} />
          <div style={{ position: "absolute", left: "-10px", bottom: "-10px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,.03)" }} />

          <div style={{ position: "relative" }}>
            <div style={{ color: C.sable, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px" }}>
              {t("espace")}
            </div>
            <h1 style={{ color: "white", fontSize: isMobile ? "22px" : "28px", fontWeight: 800, margin: "0 0 8px" }}>
              {t("bienvenue")}{investisseur ? `, ${investisseur.prenom}` : ""} ! 🌴
            </h1>
            <p style={{ color: "rgba(255,255,255,.65)", fontSize: "13px", lineHeight: 1.7, margin: "0 0 20px", maxWidth: "500px" }}>
              {t("desc")}
            </p>

            {/* Métriques profil */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[
                { label: t("statut_compte"), val: investisseur?.statut === "en_attente" ? t("en_attente") : t("valide"), highlight: true },
                { label: t("actif_interet"), val: investisseur?.actif_interet || t("non_renseigne"), highlight: false },
                ...(!isMobile ? [{ label: t("montant"), val: investisseur?.montant_envisage || t("non_renseigne"), highlight: false }] : []),
              ].map((m, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.08)", borderRadius: "10px", padding: "12px 16px", backdropFilter: "blur(4px)", border: "0.5px solid rgba(255,255,255,.1)" }}>
                  <div style={{ color: "rgba(255,255,255,.5)", fontSize: "10px", marginBottom: "4px", textTransform: "uppercase", letterSpacing: ".08em" }}>{m.label}</div>
                  <div style={{ color: m.highlight ? C.sable : "white", fontSize: "13px", fontWeight: 700 }}>{m.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STATUT KYC */}
        {investisseur?.statut === "en_attente" && (
          <div style={{ background: "#FFFBEB", borderRadius: "12px", border: "1px solid #FCD34D44", padding: isMobile ? "16px" : "20px 24px", marginBottom: "20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <div style={{ fontSize: "22px", flexShrink: 0 }}>⏳</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#92400E", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                {t("kyc_titre")}
              </div>
              <p style={{ color: "#92400E", fontSize: "12px", lineHeight: 1.7, margin: "0 0 12px" }}>
                {t("kyc_desc")}
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                {[t("kyc_step1"), t("kyc_step2"), t("kyc_step3")].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: i === 0 ? C.vert : i === 1 ? C.sable : C.grisBord, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: "white", fontSize: "8px", fontWeight: 700 }}>{i === 0 ? "✓" : i + 1}</span>
                    </div>
                    <span style={{ color: "#92400E", fontSize: "11px" }}>{s}</span>
                    {i < 2 && <span style={{ color: "#FCD34D", fontSize: "12px" }}>›</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STATS MARCHÉ */}
        <div style={{ background: C.cremeB, borderRadius: "12px", padding: isMobile ? "16px" : "20px 24px", marginBottom: "20px", border: `0.5px solid ${C.grisBord}` }}>
          <div style={{ color: C.sable, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "4px" }}>{t("marche_titre")}</div>
          <div style={{ color: C.texteSec, fontSize: "12px", marginBottom: "14px" }}>{t("marche_desc")}</div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "10px" }}>
            {[
              { val: "8–15%", label: t("stat1_label"), icon: "📈" },
              { val: "100€", label: t("stat2_label"), icon: "💶" },
              { val: "4", label: t("stat3_label"), icon: "🏝️" },
              { val: "80%", label: t("stat4_label"), icon: "🛡️" },
            ].map((s, i) => (
              <div key={i} style={{ background: C.blanc, borderRadius: "8px", padding: "12px 14px", border: `0.5px solid ${C.grisBord}`, textAlign: "center" }}>
                <div style={{ fontSize: "18px", marginBottom: "6px" }}>{s.icon}</div>
                <div style={{ color: C.navy, fontSize: "18px", fontWeight: 800 }}>{s.val}</div>
                <div style={{ color: C.texteTert, fontSize: "10px", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ACCÈS RAPIDE ACTIFS */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ color: C.sable, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "6px" }}>
            {t("acces_rapide")}
          </div>
          <h2 style={{ color: C.texte, fontSize: isMobile ? "18px" : "22px", fontWeight: 800, margin: "0 0 14px" }}>
            {t("explorer_actifs")}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: colsActifs, gap: "10px" }}>
            {ACTIFS.map((a, i) => (
              <Link key={i} href={a.href} style={{ textDecoration: "none" }}>
                <div style={{ background: C.blanc, borderRadius: "10px", padding: isMobile ? "14px" : "18px", border: `0.5px solid ${C.grisBord}`, borderTop: `3px solid ${a.color}`, transition: "all .2s", height: "100%" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 16px rgba(0,0,0,.08)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: isMobile ? "22px" : "26px", marginBottom: "8px" }}>{a.icon}</div>
                  <div style={{ color: C.texte, fontSize: isMobile ? "12px" : "13px", fontWeight: 700, marginBottom: "3px" }}>{a.label}</div>
                  {!isMobile && <div style={{ color: C.texteSec, fontSize: "11px", lineHeight: 1.5, marginBottom: "8px" }}>{a.desc}</div>}
                  <div style={{ color: a.color, fontSize: "11px", fontWeight: 600, marginTop: isMobile ? "6px" : "10px" }}>{t("explorer")}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* PROFIL + ÉTAPES */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px", marginBottom: "20px" }}>

          {/* Profil */}
          <div style={{ background: C.blanc, borderRadius: "12px", border: `0.5px solid ${C.grisBord}`, padding: isMobile ? "18px" : "24px" }}>
            <div style={{ color: C.sable, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px" }}>
              {t("mon_profil")}
            </div>
            {investisseur ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { label: t("nom_complet"), val: `${investisseur.prenom} ${investisseur.nom}` },
                  { label: t("email"), val: investisseur.email },
                  { label: t("telephone"), val: investisseur.telephone || t("non_renseigne") },
                  { label: t("pays"), val: investisseur.pays },
                  { label: t("statut"), val: investisseur.statut_investisseur },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 4 ? `0.5px solid ${C.grisBord}` : "none", gap: "8px" }}>
                    <span style={{ color: C.texteTert, fontSize: "11px", flexShrink: 0 }}>{r.label}</span>
                    <span style={{ color: C.texte, fontSize: "11px", fontWeight: 600, textAlign: "right", wordBreak: "break-all" }}>{r.val}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: C.texteSec, fontSize: "13px" }}>—</p>
            )}
          </div>

          {/* Étapes */}
          <div style={{ background: C.blanc, borderRadius: "12px", border: `0.5px solid ${C.grisBord}`, padding: isMobile ? "18px" : "24px" }}>
            <div style={{ color: C.sable, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px" }}>
              {t("etapes")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {ETAPES.map((e, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: e.done ? C.vert : C.grisBord, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: e.done ? "none" : `2px solid ${C.grisBord}` }}>
                    <span style={{ color: "white", fontSize: "10px", fontWeight: 700 }}>{e.done ? "✓" : i + 1}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: e.done ? C.vert : C.texte, fontSize: "12px", fontWeight: 700, marginBottom: "2px" }}>{e.titre}</div>
                    {!isMobile && <div style={{ color: C.texteSec, fontSize: "11px", lineHeight: 1.5 }}>{e.desc}</div>}
                  </div>
                  {e.done && <span style={{ color: C.vert, fontSize: "14px" }}>✓</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SIMULATEUR CTA */}
        <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyL} 100%)`, borderRadius: "12px", padding: isMobile ? "20px" : "28px 32px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>📊</div>
            <div style={{ color: C.sable, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "4px" }}>{t("simulateur_titre")}</div>
            <div style={{ color: "rgba(255,255,255,.7)", fontSize: "13px", maxWidth: "380px" }}>{t("simulateur_desc")}</div>
          </div>
          <Link href={`/${locale}/simulateur`} style={{ background: C.sable, color: "white", padding: "12px 22px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
            {t("simulateur_cta")}
          </Link>
        </div>

        {/* CONTACT */}
        <div style={{ background: C.blanc, borderRadius: "12px", border: `0.5px solid ${C.grisBord}`, padding: isMobile ? "18px" : "22px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
          <div>
            <div style={{ color: C.sable, fontSize: "11px", fontWeight: 700, marginBottom: "3px" }}>{t("question")}</div>
            <div style={{ color: C.texte, fontSize: isMobile ? "14px" : "15px", fontWeight: 700, marginBottom: "2px" }}>{t("equipe_dispo")}</div>
            <div style={{ color: C.texteTert, fontSize: "12px" }}>{t("horaires")}</div>
          </div>
          <Link href={`/${locale}/contact`} style={{ background: C.navy, color: "white", padding: "12px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
            {t("contact_cta")}
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  );
}
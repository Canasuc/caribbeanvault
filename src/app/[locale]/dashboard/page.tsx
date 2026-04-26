"use client";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { LogoNavy } from "@/components/Logo";
import Footer from "@/components/Footer";
import NavbarAuth from "@/components/NavbarAuth";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const C = {
  navy:     "#1A2E4A",
  sable:    "#D4884A",
  sableL:   "#FFF7ED",
  creme:    "#F8F6F1",
  grisBord: "#E8E2D6",
  texte:    "#1A2E4A",
  texteSec: "#4A5568",
  texteTert:"#9CA3AF",
  blanc:    "#FFFFFF",
  vert:     "#0F6E56",
  vertL:    "#E1F5EE",
};

const ACTIFS_DISPONIBLES = [
  { label: "Rhum AOC", icon: "🥃", href: "/rhum", color: "#0F5240", desc: "Futs de rhum vieux en vieillissement" },
  { label: "Immobilier", icon: "🏠", href: "/immobilier", color: "#0891B2", desc: "Villas et locaux commerciaux" },
  { label: "Agriculture", icon: "🌿", href: "/agriculture", color: "#2C3A1E", desc: "Banane, cafe, cacao certifies" },
  { label: "Art Creole", icon: "🎨", href: "/art", color: "#1A0A2E", desc: "Oeuvres et droits musicaux" },
  { label: "Distilleries", icon: "🏭", href: "/distilleries", color: "#0F3D2A", desc: "13 distilleries partenaires" },
  { label: "Actualites", icon: "📰", href: "/actualites", color: "#1A2E4A", desc: "News immobilier et blockchain" },
];

export default function DashboardPage() {
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
      if (!session) { window.location.href = "/login"; return; }
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
    window.location.href = "/";
  }

  if (loading) {
    return (
      <main style={{ fontFamily: "system-ui", background: C.creme, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "32px", marginBottom: "16px" }}>⏳</div>
          <div style={{ color: C.texteSec, fontSize: "14px" }}>Chargement de votre espace...</div>
        </div>
      </main>
    );
  }

  const colsActifs = isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(3, 1fr)";

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.creme, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ background: C.blanc, borderBottom: `0.5px solid ${C.grisBord}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: isMobile ? "60px" : "72px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <LogoNavy size={isMobile ? 0.7 : 0.85} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {!isMobile && (
              <span style={{ color: C.texteSec, fontSize: "12px" }}>
                {investisseur ? `${investisseur.prenom} ${investisseur.nom}` : user?.email}
              </span>
            )}
            <button onClick={handleSignOut} style={{ background: C.creme, color: C.texteSec, border: `0.5px solid ${C.grisBord}`, padding: isMobile ? "7px 12px" : "7px 16px", borderRadius: "8px", fontSize: "12px", cursor: "pointer" }}>
              {isMobile ? "Deconnexion" : "Se deconnecter"}
            </button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "20px 16px" : "40px 24px" }}>

        {/* BIENVENUE */}
        <div style={{ background: C.navy, borderRadius: "16px", padding: isMobile ? "24px 20px" : "32px", marginBottom: "20px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: "-20px", top: "-20px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(212,136,74,.1)" }} />
          <div style={{ position: "absolute", right: "40px", top: "40px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(212,136,74,.08)" }} />
          <div style={{ position: "relative" }}>
            <div style={{ color: C.sable, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px" }}>
              Espace investisseur
            </div>
            <h1 style={{ color: "white", fontSize: isMobile ? "20px" : "clamp(20px, 3vw, 28px)", fontWeight: 800, margin: "0 0 8px" }}>
              Bienvenue{investisseur ? `, ${investisseur.prenom}` : ""} !
            </h1>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: "13px", lineHeight: 1.7, margin: "0 0 16px", maxWidth: "500px" }}>
              Votre espace investisseur CaribbeanVault. Explorez nos actifs disponibles et suivez vos investissements.
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[
                { label: "Statut du compte", val: investisseur?.statut === "en_attente" ? "En cours de validation" : "Valide" },
                { label: "Actif d'interet", val: investisseur?.actif_interet || "Non renseigne" },
                ...(!isMobile ? [{ label: "Montant envisage", val: investisseur?.montant_envisage || "Non renseigne" }] : []),
              ].map((m, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.1)", borderRadius: "8px", padding: isMobile ? "10px 12px" : "12px 16px" }}>
                  <div style={{ color: "rgba(255,255,255,.6)", fontSize: "10px", marginBottom: "3px" }}>{m.label}</div>
                  <div style={{ color: i === 0 ? C.sable : "white", fontSize: "12px", fontWeight: 700 }}>{m.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STATUT KYC */}
        {investisseur?.statut === "en_attente" && (
          <div style={{ background: "#FFFBEB", borderRadius: "12px", border: "1px solid #FCD34D44", padding: isMobile ? "16px" : "20px 24px", marginBottom: "20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <div style={{ fontSize: "22px", flexShrink: 0 }}>⏳</div>
            <div>
              <div style={{ color: "#92400E", fontSize: "13px", fontWeight: 700, marginBottom: "4px" }}>
                Validation de votre profil en cours
              </div>
              <p style={{ color: "#92400E", fontSize: "12px", lineHeight: 1.7, margin: "0 0 10px" }}>
                Notre equipe examine votre dossier. Vous recevrez un email de confirmation sous 48h.
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["Dossier recu", "Verification en cours", "Acces complet"].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: i === 0 ? C.vert : i === 1 ? C.sable : C.grisBord, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "white", fontSize: "8px", fontWeight: 700 }}>{i === 0 ? "✓" : i + 1}</span>
                    </div>
                    <span style={{ color: "#92400E", fontSize: "10px" }}>{s}</span>
                    {i < 2 && <span style={{ color: C.grisBord, fontSize: "10px" }}>→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ACCES RAPIDE */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ color: C.sable, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "6px" }}>
            Acces rapide
          </div>
          <h2 style={{ color: C.texte, fontSize: isMobile ? "18px" : "20px", fontWeight: 800, margin: "0 0 14px" }}>
            Explorez nos actifs
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: colsActifs, gap: "10px" }}>
            {ACTIFS_DISPONIBLES.map((a, i) => (
              <Link key={i} href={a.href} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "white", borderRadius: "10px",
                  padding: isMobile ? "14px" : "20px",
                  border: `0.5px solid ${C.grisBord}`,
                  borderTop: `3px solid ${a.color}`,
                  transition: "all .2s", height: "100%",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 12px rgba(0,0,0,.08)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: isMobile ? "20px" : "24px", marginBottom: "8px" }}>{a.icon}</div>
                  <div style={{ color: C.texte, fontSize: isMobile ? "12px" : "13px", fontWeight: 700, marginBottom: "3px" }}>{a.label}</div>
                  {!isMobile && <div style={{ color: C.texteSec, fontSize: "11px", lineHeight: 1.5, marginBottom: "8px" }}>{a.desc}</div>}
                  <div style={{ color: a.color, fontSize: "11px", fontWeight: 600, marginTop: isMobile ? "6px" : "10px" }}>Explorer →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* MON PROFIL + PROCHAINES ETAPES */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px", marginBottom: "20px" }}>

          {/* Profil */}
          <div style={{ background: "white", borderRadius: "12px", border: `0.5px solid ${C.grisBord}`, padding: isMobile ? "18px" : "24px" }}>
            <div style={{ color: C.sable, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px" }}>
              Mon profil
            </div>
            {investisseur ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { label: "Nom complet", val: `${investisseur.prenom} ${investisseur.nom}` },
                  { label: "Email", val: investisseur.email },
                  { label: "Telephone", val: investisseur.telephone || "Non renseigne" },
                  { label: "Pays", val: investisseur.pays },
                  { label: "Statut", val: investisseur.statut_investisseur },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: i < 4 ? `0.5px solid ${C.grisBord}` : "none", gap: "8px" }}>
                    <span style={{ color: C.texteTert, fontSize: "11px", flexShrink: 0 }}>{r.label}</span>
                    <span style={{ color: C.texte, fontSize: "11px", fontWeight: 600, textAlign: "right", wordBreak: "break-all" }}>{r.val}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: C.texteSec, fontSize: "13px" }}>Informations non disponibles.</p>
            )}
          </div>

          {/* Prochaines etapes */}
          <div style={{ background: "white", borderRadius: "12px", border: `0.5px solid ${C.grisBord}`, padding: isMobile ? "18px" : "24px" }}>
            <div style={{ color: C.sable, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px" }}>
              Prochaines etapes
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { num: "1", titre: "Validation du dossier", desc: "Notre equipe valide votre profil sous 48h", done: true },
                { num: "2", titre: "Entretien telephonique", desc: "Un conseiller vous contacte pour personnaliser votre strategie", done: false },
                { num: "3", titre: "KYC complet", desc: "Verification d'identite pour acceder aux investissements", done: false },
                { num: "4", titre: "Premier investissement", desc: "Selectionnez votre premier actif et investissez", done: false },
              ].map((e, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: e.done ? C.vert : C.grisBord, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "white", fontSize: "10px", fontWeight: 700 }}>{e.done ? "✓" : e.num}</span>
                  </div>
                  <div>
                    <div style={{ color: C.texte, fontSize: "12px", fontWeight: 600, marginBottom: "2px" }}>{e.titre}</div>
                    {!isMobile && <div style={{ color: C.texteSec, fontSize: "11px", lineHeight: 1.5 }}>{e.desc}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div style={{ background: C.navy, borderRadius: "12px", padding: isMobile ? "20px" : "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
          <div>
            <div style={{ color: C.sable, fontSize: "11px", fontWeight: 700, marginBottom: "4px" }}>Une question ?</div>
            <div style={{ color: "white", fontSize: isMobile ? "14px" : "15px", fontWeight: 700, marginBottom: "3px" }}>Notre equipe est disponible</div>
            <div style={{ color: "rgba(255,255,255,.6)", fontSize: "12px" }}>{"Lun-Ven, 8h-18h (heure Antilles)"}</div>
          </div>
          <Link href="/contact" style={{ background: C.sable, color: "white", padding: "12px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
            Contacter notre equipe →
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  );
}
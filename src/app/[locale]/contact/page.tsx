"use client";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import { LogoNavy } from "@/components/Logo";
import NavbarAuth from "@/components/NavbarAuth";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const C = {
  navy: "#1A2E4A", navyMid: "#253D5E", sable: "#D4884A",
  beige: "#F8F6F1", beigeB: "#E8E2D6", texte: "#111827",
  texteSec: "#4A5568", texteTert: "#9CA3AF", blanc: "#FFFFFF",
};

const SUJETS = [
  "Je souhaite investir — questions generales",
  "Je suis proprietaire d'actifs — partenariat",
  "Je suis distillerie — tokenisation de futs",
  "Je suis proprietaire immobilier",
  "Je suis agriculteur ou cooperative",
  "Je suis artiste ou galerie",
  "Question technique sur la plateforme",
  "Presse & medias",
  "Autre",
];

const CONTACTS_DIRECTS = [
  { titre: "Investisseurs", desc: "Questions sur les actifs, le processus d'investissement, les rendements", email: "invest@geccostrategy.com", icon: "💼", color: C.navy },
  { titre: "Partenaires", desc: "Distilleries, proprietaires immobiliers, agriculteurs, artistes", email: "partenaires@geccostrategy.com", icon: "🤝", color: "#0F5240" },
  { titre: "Presse & Medias", desc: "Relations presse, demandes d'interview, partenariats medias", email: "presse@geccostrategy.com", icon: "📰", color: C.sable },
];

const inputStyle = {
  width: "100%", padding: "10px 12px",
  border: `1px solid ${C.beigeB}`,
  borderRadius: "6px", fontSize: "13px",
  outline: "none", boxSizing: "border-box" as const,
  color: C.texte, background: C.blanc,
};

const labelStyle = {
  color: C.texte, fontSize: "12px",
  fontWeight: 500 as const, display: "block" as const,
  marginBottom: "6px",
};

export default function ContactPage() {
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", sujet: "", message: "", consentement: false });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isMobile, isTablet } = useBreakpoint();

  const handleSubmit = async () => {
    if (!form.email || !form.message || !form.sujet || !form.consentement) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) { setSent(true); }
      else { setError(data.error || "Une erreur est survenue."); }
    } catch {
      setError("Erreur de connexion. Verifiez votre connexion internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.beige, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ background: C.beige, borderBottom: `0.5px solid ${C.beigeB}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: isMobile ? "60px" : "64px" }}>
          <LogoNavy size={isMobile ? 0.7 : 0.85} />
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Link href="/" style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>← Retour</Link>
            <NavbarAuth buttonBg="#1A2E4A" buttonColor="white" textColor="#4A5568" borderColor="#E8E2D6" />
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <section style={{ background: C.navy, padding: isMobile ? "28px 16px" : "40px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", background: C.sable, padding: "3px 14px", borderRadius: "2px", marginBottom: "12px" }}>
            <span style={{ color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase" }}>Nous contacter</span>
          </div>
          <h1 style={{ color: "white", fontSize: isMobile ? "22px" : "28px", fontWeight: 800, margin: "0 0 6px", letterSpacing: "-.3px" }}>Contact</h1>
          <p style={{ color: "#B8C4D4", fontSize: "13px", margin: 0 }}>
            Une question, un projet de partenariat ? Nous vous repondons sous 48h.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "24px 16px" : "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "1fr 1fr", gap: "20px", alignItems: "start" }}>

          {/* FORMULAIRE */}
          <div style={{ background: C.blanc, borderRadius: "10px", border: `0.5px solid ${C.beigeB}`, padding: isMobile ? "20px 16px" : "28px" }}>
            <h2 style={{ color: C.navy, fontSize: "18px", fontWeight: 700, margin: "0 0 18px" }}>Envoyer un message</h2>

            {sent ? (
              <div style={{ textAlign: "center", padding: "32px 16px" }}>
                <div style={{ fontSize: "36px", marginBottom: "14px" }}>✅</div>
                <div style={{ color: "#0F6E56", fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>Message envoye !</div>
                <p style={{ color: C.texteSec, fontSize: "13px", lineHeight: 1.7 }}>
                  Merci pour votre message. Notre equipe vous repondra dans les 48 heures ouvrées.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ prenom: "", nom: "", email: "", sujet: "", message: "", consentement: false }); }}
                  style={{ marginTop: "14px", background: C.navy, color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", fontSize: "12px", cursor: "pointer" }}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* Prénom / Nom */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={labelStyle}>Prenom</label>
                    <input type="text" value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} placeholder="Jean" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Nom</label>
                    <input type="text" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Dupont" style={inputStyle} />
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jean.dupont@email.com" style={inputStyle} />
                </div>
                {/* Sujet */}
                <div>
                  <label style={labelStyle}>Sujet *</label>
                  <select value={form.sujet} onChange={e => setForm({ ...form, sujet: e.target.value })} style={{ ...inputStyle, color: form.sujet ? C.texte : C.texteTert }}>
                    <option value="" disabled>Selectionnez un sujet...</option>
                    {SUJETS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                {/* Message */}
                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Decrivez votre demande en detail..." rows={isMobile ? 4 : 5}
                    style={{ ...inputStyle, resize: "vertical" as const, fontFamily: "inherit" }} />
                </div>
                {/* Consentement */}
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "12px", background: "#F0FDF4", borderRadius: "8px", border: "1px solid #BBF7D0" }}>
                  <input type="checkbox" checked={form.consentement} onChange={e => setForm({ ...form, consentement: e.target.checked })}
                    style={{ marginTop: "2px", accentColor: "#0F6E56", flexShrink: 0 }} />
                  <span style={{ color: C.texteSec, fontSize: "11px", lineHeight: 1.6 }}>
                    {"J'accepte que mes donnees soient traitees conformement a la "}
                    <Link href="/confidentialite" style={{ color: C.navy, fontWeight: 600 }}>politique de confidentialite</Link>. *
                  </span>
                </div>
                {/* Erreur */}
                {error && (
                  <div style={{ background: "#FEE2E2", borderRadius: "8px", padding: "10px 14px", color: "#DC2626", fontSize: "12px" }}>
                    ❌ {error}
                  </div>
                )}
                {/* Bouton */}
                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.email || !form.message || !form.sujet || !form.consentement}
                  style={{ background: loading || !form.email || !form.message || !form.sujet || !form.consentement ? "#9CA3AF" : C.navy, color: "white", border: "none", padding: "12px", borderRadius: "6px", fontSize: "13px", fontWeight: 700, cursor: loading ? "wait" : "pointer", transition: "background .15s" }}
                >
                  {loading ? "Envoi en cours..." : "Envoyer le message →"}
                </button>
                <p style={{ color: C.texteTert, fontSize: "10px", margin: 0 }}>
                  {"* Champs obligatoires · "}
                  <Link href="/confidentialite" style={{ color: C.sable }}>Politique de confidentialite</Link>
                </p>
              </div>
            )}
          </div>

          {/* INFOS + CONTACTS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

            {/* Contacts directs */}
            {CONTACTS_DIRECTS.map((c, i) => (
              <div key={i} style={{ background: C.blanc, borderRadius: "10px", border: `0.5px solid ${C.beigeB}`, padding: isMobile ? "16px" : "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <div style={{ width: "38px", height: "38px", background: `${c.color}15`, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{ color: C.navy, fontSize: "13px", fontWeight: 700 }}>{c.titre}</div>
                    {!isMobile && <div style={{ color: C.texteSec, fontSize: "11px", marginTop: "1px" }}>{c.desc}</div>}
                  </div>
                </div>
                <a href={`mailto:${c.email}`} style={{ color: c.color, fontSize: "12px", fontWeight: 600, textDecoration: "none" }}>
                  {c.email} →
                </a>
              </div>
            ))}

            {/* Infos pratiques */}
            <div style={{ background: C.navy, borderRadius: "10px", padding: isMobile ? "16px" : "20px" }}>
              <div style={{ color: C.sable, fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "12px" }}>
                Informations pratiques
              </div>
              {[
                { label: "Delai de reponse", val: "48h ouvertes" },
                { label: "Siege social", val: "Guadeloupe, France (DOM)" },
                { label: "Langues", val: "Francais, English, Espanol" },
                { label: "Horaires", val: "Lun-Ven, 8h-18h (Antilles)" },
              ].map((info, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: i < 3 ? "0.5px solid #253D5E" : "none", flexWrap: "wrap", gap: "4px" }}>
                  <span style={{ color: "#6B8AAA", fontSize: "11px" }}>{info.label}</span>
                  <span style={{ color: "white", fontSize: "11px", fontWeight: 500 }}>{info.val}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ background: C.sable, borderRadius: "10px", padding: isMobile ? "16px" : "20px", textAlign: "center" }}>
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>🌴</div>
              <div style={{ color: "white", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>Rejoindre la famille CaribbeanVault</div>
              <p style={{ color: "rgba(255,255,255,.85)", fontSize: "12px", lineHeight: 1.6, margin: "0 0 12px" }}>
                {"Accedez en avant-premiere aux actifs disponibles."}
              </p>
              <Link href="/kyc" style={{ background: C.navy, color: "white", padding: "10px 20px", borderRadius: "5px", fontSize: "12px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
                S'inscrire maintenant →
              </Link>
            </div>
          </div>
        </div>

        {/* Liens footer */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "28px", flexWrap: "wrap" }}>
          {[
            { label: "Mentions legales", href: "/mentions-legales" },
            { label: "CGU", href: "/cgu" },
            { label: "Confidentialite", href: "/confidentialite" },
            { label: "Accueil", href: "/" },
          ].map(l => (
            <Link key={l.label} href={l.href} style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>{l.label}</Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
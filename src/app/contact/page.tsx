"use client";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import { LogoNavy } from "@/components/Logo";

const C = {
  navy: "#1A2E4A", navyMid: "#253D5E", sable: "#D4884A", sableC: "#C07A3E",
  beige: "#F8F6F1", beigeB: "#E8E2D6", texte: "#111827",
  texteSec: "#4A5568", texteTert: "#9CA3AF", blanc: "#FFFFFF",
};

const SUJETS = [
  "Je souhaite investir — questions générales",
  "Je suis propriétaire d'actifs — partenariat",
  "Je suis distillerie — tokenisation de fûts",
  "Je suis propriétaire immobilier",
  "Je suis agriculteur ou coopérative",
  "Je suis artiste ou galerie",
  "Question technique sur la plateforme",
  "Presse & médias",
  "Autre",
];

const CONTACTS_DIRECTS = [
  {
    titre: "Investisseurs",
    desc: "Questions sur les actifs, le processus d'investissement, les rendements",
    email: "invest@geccostrategy.com",
    icon: "💼",
    color: C.navy,
  },
  {
    titre: "Partenaires",
    desc: "Distilleries, propriétaires immobiliers, agriculteurs, artistes",
    email: "partenaires@geccostrategy.com",
    icon: "🤝",
    color: "#0F5240",
  },
  {
    titre: "Presse & Médias",
    desc: "Relations presse, demandes d'interview, partenariats médias",
    email: "presse@geccostrategy.com",
    icon: "📰",
    color: C.sable,
  },
];

export default function ContactPage() {
const [form, setForm] = useState({ prenom: "", nom: "", email: "", sujet: "", message: "", consentement: false });
const [sent, setSent] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

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
    if (res.ok) {
      setSent(true);
    } else {
      setError(data.error || "Une erreur est survenue.");
    }
  } catch {
    setError("Erreur de connexion. Vérifiez votre connexion internet.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.beige, minHeight: "100vh" }}>

      {/* Navbar */}
      <nav style={{ background: C.beige, borderBottom: `0.5px solid ${C.beigeB}`, padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
<LogoNavy size={0.85} />
          <Link href="/" style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>← Retour à l'accueil</Link>
        </div>
      </nav>

      {/* Header */}
      <section style={{ background: C.navy, padding: "40px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", background: C.sable, padding: "3px 14px", borderRadius: "2px", marginBottom: "14px" }}>
            <span style={{ color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase" }}>Nous contacter</span>
          </div>
          <h1 style={{ color: "white", fontSize: "28px", fontWeight: 800, margin: "0 0 8px", letterSpacing: "-.3px" }}>Contact</h1>
          <p style={{ color: "#B8C4D4", fontSize: "13px", margin: 0 }}>
            Une question, un projet de partenariat, une demande d'information ? Nous vous répondons sous 48h.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }}>

          {/* Formulaire */}
          <div style={{ background: C.blanc, borderRadius: "10px", border: `0.5px solid ${C.beigeB}`, padding: "28px" }}>
            <h2 style={{ color: C.navy, fontSize: "18px", fontWeight: 700, margin: "0 0 20px" }}>Envoyer un message</h2>

            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>✅</div>
                <div style={{ color: "#0F6E56", fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>Message envoyé !</div>
                <p style={{ color: C.texteSec, fontSize: "13px", lineHeight: 1.7 }}>
                  Merci pour votre message. Notre équipe vous répondra dans les 48 heures ouvrées.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ prenom: "", nom: "", email: "", sujet: "", message: "" , consentement: false }); }}
                  style={{ marginTop: "16px", background: C.navy, color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", fontSize: "12px", cursor: "pointer" }}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ color: C.texte, fontSize: "12px", fontWeight: 500, display: "block", marginBottom: "6px" }}>Prénom</label>
                    <input type="text" value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })}
                      placeholder="Jean" style={{ width: "100%", padding: "10px 12px", border: `1px solid ${C.beigeB}`, borderRadius: "6px", fontSize: "13px", outline: "none", boxSizing: "border-box", color: C.texte }} />
                  </div>
                  <div>
                    <label style={{ color: C.texte, fontSize: "12px", fontWeight: 500, display: "block", marginBottom: "6px" }}>Nom</label>
                    <input type="text" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })}
                      placeholder="Dupont" style={{ width: "100%", padding: "10px 12px", border: `1px solid ${C.beigeB}`, borderRadius: "6px", fontSize: "13px", outline: "none", boxSizing: "border-box", color: C.texte }} />
                  </div>
                </div>

                <div>
                  <label style={{ color: C.texte, fontSize: "12px", fontWeight: 500, display: "block", marginBottom: "6px" }}>Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="jean.dupont@email.com" style={{ width: "100%", padding: "10px 12px", border: `1px solid ${C.beigeB}`, borderRadius: "6px", fontSize: "13px", outline: "none", boxSizing: "border-box", color: C.texte }} />
                </div>

                <div>
                  <label style={{ color: C.texte, fontSize: "12px", fontWeight: 500, display: "block", marginBottom: "6px" }}>Sujet *</label>
                  <select value={form.sujet} onChange={e => setForm({ ...form, sujet: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", border: `1px solid ${C.beigeB}`, borderRadius: "6px", fontSize: "13px", outline: "none", background: C.blanc, color: form.sujet ? C.texte : C.texteTert }}>
                    <option value="" disabled>Sélectionnez un sujet...</option>
                    {SUJETS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ color: C.texte, fontSize: "12px", fontWeight: 500, display: "block", marginBottom: "6px" }}>Message *</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Décrivez votre demande en détail..." rows={5}
                    style={{ width: "100%", padding: "10px 12px", border: `1px solid ${C.beigeB}`, borderRadius: "6px", fontSize: "13px", outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit", color: C.texte }} />
                </div>
<div style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "12px", background: "#F0FDF4", borderRadius: "8px", border: "1px solid #BBF7D0" }}>
  <input
    type="checkbox"
    checked={form.consentement}
    onChange={e => setForm({ ...form, consentement: e.target.checked })}
    style={{ marginTop: "2px", accentColor: "#0F6E56", flexShrink: 0 }}
  />
  <span style={{ color: C.texteSec, fontSize: "11px", lineHeight: 1.6 }}>
    J'accepte que mes données soient traitées conformément à la{" "}
    <Link href="/confidentialite" style={{ color: C.navy, fontWeight: 600 }}>politique de confidentialité</Link>. *
  </span>
</div>

{error && (
  <div style={{ background: "#FEE2E2", borderRadius: "8px", padding: "10px 14px", color: "#DC2626", fontSize: "12px" }}>
    ❌ {error}
  </div>
)}
                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.email || !form.message || !form.sujet  || !form.consentement}
                  style={{
                    background: loading || !form.email || !form.message || !form.sujet ? "#9CA3AF" : C.navy,
                    color: "white", border: "none", padding: "12px",
                    borderRadius: "6px", fontSize: "13px", fontWeight: 700,
                    cursor: loading ? "wait" : "pointer", letterSpacing: ".05em",
                    transition: "background .15s",
                  }}
                >
                  {loading ? "Envoi en cours..." : "Envoyer le message →"}
                </button>

                <p style={{ color: C.texteTert, fontSize: "10px", margin: 0 }}>
                  * Champs obligatoires. En soumettant ce formulaire, vous acceptez notre{" "}
                  <Link href="/confidentialite" style={{ color: C.sable }}>politique de confidentialité</Link>.
                </p>
              </div>
            )}
          </div>

          {/* Infos contact + contacts directs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Contacts directs */}
            {CONTACTS_DIRECTS.map((c, i) => (
              <div key={i} style={{ background: C.blanc, borderRadius: "10px", border: `0.5px solid ${C.beigeB}`, padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                  <div style={{ width: "40px", height: "40px", background: `${c.color}15`, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{ color: C.navy, fontSize: "14px", fontWeight: 700 }}>{c.titre}</div>
                    <div style={{ color: C.texteSec, fontSize: "11px", marginTop: "1px" }}>{c.desc}</div>
                  </div>
                </div>
                <a href={`mailto:${c.email}`} style={{ color: c.color, fontSize: "12px", fontWeight: 600, textDecoration: "none" }}>
                  {c.email} →
                </a>
              </div>
            ))}

            {/* Infos pratiques */}
            <div style={{ background: C.navy, borderRadius: "10px", padding: "20px" }}>
              <div style={{ color: C.sable, fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "14px" }}>
                Informations pratiques
              </div>
              {[
                { label: "Délai de réponse", val: "48h ouvrées" },
                { label: "Siège social", val: "Guadeloupe, France (DOM)" },
                { label: "Langues", val: "Français, English, Español" },
                { label: "Horaires", val: "Lun–Ven, 8h–18h (heure Antilles)" },
              ].map((info, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? "0.5px solid #253D5E" : "none" }}>
                  <span style={{ color: "#6B8AAA", fontSize: "12px" }}>{info.label}</span>
                  <span style={{ color: "white", fontSize: "12px", fontWeight: 500 }}>{info.val}</span>
                </div>
              ))}
            </div>

            {/* Rejoindre la famille */}
            <div style={{ background: C.sable, borderRadius: "10px", padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "24px", marginBottom: "10px" }}>🌴</div>
              <div style={{ color: "white", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>
                Rejoindre la famille CaribbeanVault
              </div>
              <p style={{ color: "rgba(255,255,255,.85)", fontSize: "12px", lineHeight: 1.6, margin: "0 0 14px" }}>
                Accédez en avant-première aux actifs disponibles et rejoignez notre communauté d'investisseurs caribéens.
              </p>
              <Link href="/#contact" style={{ background: C.navy, color: "white", padding: "10px 20px", borderRadius: "5px", fontSize: "12px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
                S'inscrire maintenant →
              </Link>
            </div>

          </div>
        </div>

        {/* Liens footer */}
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "32px", flexWrap: "wrap" }}>
          {[
            { label: "Mentions légales", href: "/mentions-legales" },
            { label: "CGU", href: "/cgu" },
            { label: "Politique de confidentialité", href: "/confidentialite" },
            { label: "Retour à l'accueil", href: "/" },
          ].map(l => (
            <Link key={l.label} href={l.href} style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>{l.label}</Link>
          ))}
        </div>
      </div>

<Footer />
    </main>
  );
}
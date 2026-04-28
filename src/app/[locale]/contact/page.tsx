"use client";
import Link from "next/link";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { LogoNavy } from "@/components/Logo";
import NavbarAuth from "@/components/NavbarAuth";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const C = {
  navy: "#1A2E4A", navyMid: "#253D5E", sable: "#D4884A",
  beige: "#F8F6F1", beigeB: "#E8E2D6", texte: "#111827",
  texteSec: "#4A5568", texteTert: "#9CA3AF", blanc: "#FFFFFF",
};

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

const LOCALES = [
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "es", label: "ES", flag: "🇪🇸" },
];

function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {LOCALES.map(l => (
        <button key={l.code} onClick={() => switchLocale(l.code)} style={{
          background: locale === l.code ? C.navy : "transparent",
          color: locale === l.code ? "white" : C.texteSec,
          border: locale === l.code ? "none" : `1px solid ${C.beigeB}`,
          borderRadius: "4px", padding: "3px 8px", fontSize: "10px",
          fontWeight: 700, cursor: "pointer", fontFamily: "system-ui",
        }}>{l.flag} {l.label}</button>
      ))}
    </div>
  );
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", sujet: "", message: "", consentement: false });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isMobile, isTablet } = useBreakpoint();

  const SUJETS = t.raw("sujets") as string[];

  const CONTACTS_DIRECTS = [
    { titre: t("contacts.investisseurs_titre"), desc: t("contacts.investisseurs_desc"), email: "invest@geccostrategy.com", icon: "💼", color: C.navy },
    { titre: t("contacts.partenaires_titre"), desc: t("contacts.partenaires_desc"), email: "partenaires@geccostrategy.com", icon: "🤝", color: "#0F5240" },
    { titre: t("contacts.presse_titre"), desc: t("contacts.presse_desc"), email: "presse@geccostrategy.com", icon: "📰", color: C.sable },
  ];

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
      setError("Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.beige, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ background: C.beige, borderBottom: `0.5px solid ${C.beigeB}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: isMobile ? "60px" : "64px" }}>
          <Link href={`/${locale}`} style={{ textDecoration: "none" }}>
            <LogoNavy size={isMobile ? 0.7 : 0.85} />
          </Link>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <LanguageSwitcher />
            <Link href={`/${locale}`} style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>{t("retour")}</Link>
            <NavbarAuth buttonBg="#1A2E4A" buttonColor="white" textColor="#4A5568" borderColor="#E8E2D6" />
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <section style={{ background: C.navy, padding: isMobile ? "28px 16px" : "40px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", background: C.sable, padding: "3px 14px", borderRadius: "2px", marginBottom: "12px" }}>
            <span style={{ color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase" }}>{t("badge")}</span>
          </div>
          <h1 style={{ color: "white", fontSize: isMobile ? "22px" : "28px", fontWeight: 800, margin: "0 0 6px" }}>{t("titre")}</h1>
          <p style={{ color: "#B8C4D4", fontSize: "13px", margin: 0 }}>{t("sous_titre")}</p>
        </div>
      </section>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "24px 16px" : "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "1fr 1fr", gap: "20px", alignItems: "start" }}>

          {/* FORMULAIRE */}
          <div style={{ background: C.blanc, borderRadius: "10px", border: `0.5px solid ${C.beigeB}`, padding: isMobile ? "20px 16px" : "28px" }}>
            <h2 style={{ color: C.navy, fontSize: "18px", fontWeight: 700, margin: "0 0 18px" }}>{t("form_titre")}</h2>

            {sent ? (
              <div style={{ textAlign: "center", padding: "32px 16px" }}>
                <div style={{ fontSize: "36px", marginBottom: "14px" }}>✅</div>
                <div style={{ color: "#0F6E56", fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>{t("succes_titre")}</div>
                <p style={{ color: C.texteSec, fontSize: "13px", lineHeight: 1.7 }}>{t("succes_desc")}</p>
                <button onClick={() => { setSent(false); setForm({ prenom: "", nom: "", email: "", sujet: "", message: "", consentement: false }); }}
                  style={{ marginTop: "14px", background: C.navy, color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", fontSize: "12px", cursor: "pointer" }}>
                  {t("autre_message")}
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={labelStyle}>{t("prenom")}</label>
                    <input type="text" value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} placeholder="Jean" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t("nom")}</label>
                    <input type="text" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Dupont" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>{t("email")}</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jean.dupont@email.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{t("sujet")}</label>
                  <select value={form.sujet} onChange={e => setForm({ ...form, sujet: e.target.value })} style={{ ...inputStyle, color: form.sujet ? C.texte : C.texteTert }}>
                    <option value="" disabled>{t("sujet_placeholder")}</option>
                    {SUJETS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>{t("message")}</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder={t("message_placeholder")} rows={isMobile ? 4 : 5}
                    style={{ ...inputStyle, resize: "vertical" as const, fontFamily: "inherit" }} />
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "12px", background: "#F0FDF4", borderRadius: "8px", border: "1px solid #BBF7D0" }}>
                  <input type="checkbox" checked={form.consentement} onChange={e => setForm({ ...form, consentement: e.target.checked })}
                    style={{ marginTop: "2px", accentColor: "#0F6E56", flexShrink: 0 }} />
                  <span style={{ color: C.texteSec, fontSize: "11px", lineHeight: 1.6 }}>
                    {t("consentement")}{" "}
                    <Link href={`/${locale}/confidentialite`} style={{ color: C.navy, fontWeight: 600 }}>{t("politique")}</Link>. *
                  </span>
                </div>
                {error && (
                  <div style={{ background: "#FEE2E2", borderRadius: "8px", padding: "10px 14px", color: "#DC2626", fontSize: "12px" }}>
                    ❌ {error}
                  </div>
                )}
                <button onClick={handleSubmit}
                  disabled={loading || !form.email || !form.message || !form.sujet || !form.consentement}
                  style={{ background: loading || !form.email || !form.message || !form.sujet || !form.consentement ? "#9CA3AF" : C.navy, color: "white", border: "none", padding: "12px", borderRadius: "6px", fontSize: "13px", fontWeight: 700, cursor: loading ? "wait" : "pointer" }}>
                  {loading ? t("envoi_cours") : t("envoyer")}
                </button>
                <p style={{ color: C.texteTert, fontSize: "10px", margin: 0 }}>
                  {t("champs_obligatoires")} · <Link href={`/${locale}/confidentialite`} style={{ color: C.sable }}>{t("politique")}</Link>
                </p>
              </div>
            )}
          </div>

          {/* INFOS + CONTACTS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
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

            <div style={{ background: C.navy, borderRadius: "10px", padding: isMobile ? "16px" : "20px" }}>
              <div style={{ color: C.sable, fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "12px" }}>
                {t("infos_titre")}
              </div>
              {[
                { label: t("delai"), val: t("delai_val") },
                { label: t("siege"), val: t("siege_val") },
                { label: t("langues"), val: t("langues_val") },
                { label: t("horaires"), val: t("horaires_val") },
              ].map((info, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: i < 3 ? "0.5px solid #253D5E" : "none", flexWrap: "wrap", gap: "4px" }}>
                  <span style={{ color: "#6B8AAA", fontSize: "11px" }}>{info.label}</span>
                  <span style={{ color: "white", fontSize: "11px", fontWeight: 500 }}>{info.val}</span>
                </div>
              ))}
            </div>

            <div style={{ background: C.sable, borderRadius: "10px", padding: isMobile ? "16px" : "20px", textAlign: "center" }}>
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>🌴</div>
              <div style={{ color: "white", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>{t("cta_titre")}</div>
              <p style={{ color: "rgba(255,255,255,.85)", fontSize: "12px", lineHeight: 1.6, margin: "0 0 12px" }}>{t("cta_desc")}</p>
              <Link href={`/${locale}/kyc`} style={{ background: C.navy, color: "white", padding: "10px 20px", borderRadius: "5px", fontSize: "12px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
                {t("cta_btn")}
              </Link>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "28px", flexWrap: "wrap" }}>
          {[
            { label: "Mentions légales", href: `/${locale}/mentions-legales` },
            { label: "CGU", href: `/${locale}/cgu` },
            { label: "Confidentialité", href: `/${locale}/confidentialite` },
            { label: "Accueil", href: `/${locale}` },
          ].map(l => (
            <Link key={l.label} href={l.href} style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>{l.label}</Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
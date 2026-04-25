"use client";
import Link from "next/link";
import { useState } from "react";
import { LogoNavy } from "@/components/Logo";
import Footer from "@/components/Footer";
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
  rouge:    "#DC2626",
  rougeL:   "#FEE2E2",
};

const PAYS_EU = [
  "France", "Belgique", "Luxembourg", "Suisse", "Monaco",
  "Allemagne", "Espagne", "Italie", "Portugal", "Pays-Bas",
  "Autriche", "Suede", "Danemark", "Finlande", "Irlande",
  "Guadeloupe", "Martinique", "Guyane", "Saint-Martin", "La Reunion",
  "Autre pays de l'UE", "Autre pays",
];

const ACTIFS = [
  { val: "rhum", label: "🥃 Rhum AOC" },
  { val: "immobilier", label: "🏠 Immobilier" },
  { val: "agriculture", label: "🌿 Agriculture" },
  { val: "art", label: "🎨 Art Creole" },
  { val: "tous", label: "📊 Tous les actifs" },
];

const MONTANTS = [
  "100€ - 500€", "500€ - 1 000€", "1 000€ - 5 000€",
  "5 000€ - 10 000€", "10 000€ - 50 000€", "Plus de 50 000€",
];

const STATUTS = [
  "Particulier", "Investisseur averti",
  "Professionnel de la finance", "Family office", "Societe",
];

export default function KYCPage() {
  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", telephone: "",
    pays: "", actif_interet: "", montant_envisage: "",
    statut_investisseur: "", message: "", consentement: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const { isMobile } = useBreakpoint();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/kyc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) { setSuccess(true); }
      else { setError(data.error || "Une erreur est survenue."); }
    } catch {
      setError("Erreur de connexion. Verifiez votre connexion internet.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%", padding: "11px 14px",
    border: `1px solid ${C.grisBord}`,
    borderRadius: "8px", fontSize: "13px",
    color: C.texte, background: "white",
    outline: "none", boxSizing: "border-box" as const,
    fontFamily: "system-ui",
  };

  const labelStyle = {
    display: "block", color: C.texteSec,
    fontSize: "11px", fontWeight: 600,
    marginBottom: "6px", letterSpacing: ".02em",
  };

  if (success) {
    return (
      <main style={{ fontFamily: "system-ui", background: C.creme, minHeight: "100vh" }}>
        <nav style={{ background: C.blanc, borderBottom: `0.5px solid ${C.grisBord}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", alignItems: "center", height: "64px" }}>
            <Link href="/" style={{ textDecoration: "none" }}><LogoNavy size={0.8} /></Link>
          </div>
        </nav>
        <div style={{ maxWidth: "560px", margin: isMobile ? "40px auto" : "80px auto", padding: "0 16px", textAlign: "center" }}>
          <div style={{ background: "white", borderRadius: "16px", border: `0.5px solid ${C.grisBord}`, padding: isMobile ? "32px 20px" : "48px 32px" }}>
            <div style={{ width: "64px", height: "64px", background: C.vertL, borderRadius: "50%", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>✓</div>
            <h1 style={{ color: C.texte, fontSize: isMobile ? "20px" : "24px", fontWeight: 800, margin: "0 0 12px" }}>Demande enregistree !</h1>
            <p style={{ color: C.texteSec, fontSize: "14px", lineHeight: 1.8, margin: "0 0 24px" }}>
              Merci pour votre inscription ! Un lien de connexion securise vient d'etre envoye a votre adresse email.
            </p>
            <div style={{ background: C.sableL, borderRadius: "10px", padding: "14px", marginBottom: "20px", textAlign: "left" }}>
              <div style={{ color: C.sable, fontSize: "11px", fontWeight: 700, marginBottom: "8px" }}>Prochaines etapes</div>
              {["Verification de votre email sous 24h", "Entretien telephonique avec notre equipe", "Validation KYC complete", "Acces a la plateforme d'investissement"].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: "8px", fontSize: "12px", color: C.texteSec, marginBottom: "6px" }}>
                  <span style={{ color: C.sable, fontWeight: 700 }}>{i + 1}.</span><span>{s}</span>
                </div>
              ))}
            </div>
            <Link href="/" style={{ display: "block", background: C.navy, color: "white", padding: "12px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
              {"Retour a l'accueil"}
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.creme, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ background: C.blanc, borderBottom: `0.5px solid ${C.grisBord}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: isMobile ? "60px" : "72px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <LogoNavy size={isMobile ? 0.7 : 0.85} />
          </Link>
          <Link href="/" style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>
            {isMobile ? "← Accueil" : "← Retour a l'accueil"}
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: C.navy, padding: isMobile ? "32px 16px 28px" : "48px 24px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(212,136,74,.15)", border: "0.5px solid rgba(212,136,74,.3)", borderRadius: "20px", padding: "4px 12px", marginBottom: "14px" }}>
            <span style={{ color: C.sable, fontSize: "10px", fontWeight: 600 }}>🔒 Formulaire securise · RGPD conforme</span>
          </div>
          <h1 style={{ color: "white", fontSize: isMobile ? "22px" : "clamp(22px, 4vw, 36px)", fontWeight: 800, lineHeight: 1.2, margin: "0 0 10px" }}>
            Rejoindre CaribbeanVault
          </h1>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: "13px", lineHeight: 1.8, margin: 0 }}>
            {"Premiere etape vers l'investissement dans les actifs reels carribeens. Notre equipe vous contactera sous 48h."}
          </p>
        </div>
      </section>

      {/* FORMULAIRE */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: isMobile ? "24px 16px" : "40px 24px" }}>

        {/* Indicateur étapes */}
        <div style={{ display: "flex", marginBottom: "28px" }}>
          {["Informations", "Profil", "Confirmation"].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && <div style={{ flex: 1, height: "2px", background: step > i ? C.sable : C.grisBord }} />}
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: step > i + 1 ? C.vert : step === i + 1 ? C.navy : C.grisBord,
                  color: step >= i + 1 ? "white" : C.texteTert,
                  fontSize: "11px", fontWeight: 700, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                {i < 2 && <div style={{ flex: 1, height: "2px", background: step > i + 1 ? C.sable : C.grisBord }} />}
              </div>
              <div style={{ color: step === i + 1 ? C.navy : C.texteTert, fontSize: isMobile ? "9px" : "10px", marginTop: "6px", fontWeight: step === i + 1 ? 600 : 400 }}>
                {s}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ background: "white", borderRadius: "16px", border: `0.5px solid ${C.grisBord}`, padding: isMobile ? "20px 16px" : "32px", marginBottom: "14px" }}>

            {/* ÉTAPE 1 */}
            {step === 1 && (
              <div>
                <h2 style={{ color: C.texte, fontSize: isMobile ? "16px" : "18px", fontWeight: 700, margin: "0 0 20px" }}>Vos informations</h2>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                  <div>
                    <label style={labelStyle}>Prenom *</label>
                    <input name="prenom" value={form.prenom} onChange={handleChange} required placeholder="Jean" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Nom *</label>
                    <input name="nom" value={form.nom} onChange={handleChange} required placeholder="Dupont" style={inputStyle} />
                  </div>
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jean.dupont@email.com" style={inputStyle} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                  <div>
                    <label style={labelStyle}>Telephone</label>
                    <input name="telephone" value={form.telephone} onChange={handleChange} placeholder="+33 6 12 34 56 78" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Pays de residence *</label>
                    <select name="pays" value={form.pays} onChange={handleChange} required style={inputStyle}>
                      <option value="">Selectionnez...</option>
                      {PAYS_EU.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { if (form.prenom && form.nom && form.email && form.pays) setStep(2); }}
                  style={{ width: "100%", background: C.navy, color: "white", border: "none", padding: "13px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer", marginTop: "8px" }}
                >
                  Continuer →
                </button>
              </div>
            )}

            {/* ÉTAPE 2 */}
            {step === 2 && (
              <div>
                <h2 style={{ color: C.texte, fontSize: isMobile ? "16px" : "18px", fontWeight: 700, margin: "0 0 20px" }}>Votre profil investisseur</h2>
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Actif d'interet *</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {ACTIFS.map(a => (
                      <button key={a.val} type="button" onClick={() => setForm(f => ({ ...f, actif_interet: a.val }))} style={{
                        padding: "10px 12px", borderRadius: "8px", cursor: "pointer",
                        border: form.actif_interet === a.val ? `2px solid ${C.navy}` : `1px solid ${C.grisBord}`,
                        background: form.actif_interet === a.val ? "#EEF2FF" : "white",
                        color: form.actif_interet === a.val ? C.navy : C.texteSec,
                        fontSize: isMobile ? "11px" : "12px",
                        fontWeight: form.actif_interet === a.val ? 700 : 400,
                        textAlign: "left",
                      }}>
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>Montant envisage *</label>
                  <select name="montant_envisage" value={form.montant_envisage} onChange={handleChange} required style={inputStyle}>
                    <option value="">Selectionnez...</option>
                    {MONTANTS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>Statut investisseur *</label>
                  <select name="statut_investisseur" value={form.statut_investisseur} onChange={handleChange} required style={inputStyle}>
                    <option value="">Selectionnez...</option>
                    {STATUTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Message (optionnel)</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Questions, precisions sur votre profil..." rows={3}
                    style={{ ...inputStyle, resize: "vertical" as const }} />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="button" onClick={() => setStep(1)} style={{ flex: 1, background: C.creme, color: C.texteSec, border: `1px solid ${C.grisBord}`, padding: "13px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                    ← Retour
                  </button>
                  <button
                    type="button"
                    onClick={() => { if (form.actif_interet && form.montant_envisage && form.statut_investisseur) setStep(3); }}
                    style={{ flex: 2, background: C.navy, color: "white", border: "none", padding: "13px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}
                  >
                    Continuer →
                  </button>
                </div>
              </div>
            )}

            {/* ÉTAPE 3 */}
            {step === 3 && (
              <div>
                <h2 style={{ color: C.texte, fontSize: isMobile ? "16px" : "18px", fontWeight: 700, margin: "0 0 20px" }}>Confirmation</h2>
                {/* Récap */}
                <div style={{ background: C.creme, borderRadius: "10px", padding: "14px", marginBottom: "16px" }}>
                  <div style={{ color: C.texteTert, fontSize: "10px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "10px" }}>Recapitulatif</div>
                  {[
                    { label: "Nom", val: `${form.prenom} ${form.nom}` },
                    { label: "Email", val: form.email },
                    { label: "Pays", val: form.pays },
                    { label: "Actif", val: ACTIFS.find(a => a.val === form.actif_interet)?.label || form.actif_interet },
                    { label: "Montant", val: form.montant_envisage },
                    { label: "Statut", val: form.statut_investisseur },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 5 ? `0.5px solid ${C.grisBord}` : "none", flexWrap: "wrap", gap: "4px" }}>
                      <span style={{ color: C.texteTert, fontSize: "12px" }}>{r.label}</span>
                      <span style={{ color: C.texte, fontSize: "12px", fontWeight: 600, maxWidth: isMobile ? "200px" : "none", textAlign: "right", wordBreak: "break-all" }}>{r.val}</span>
                    </div>
                  ))}
                </div>
                {/* Consentement */}
                <div style={{ background: "#F0FDF4", borderRadius: "8px", padding: "14px", marginBottom: "16px", border: "1px solid #BBF7D0" }}>
                  <label style={{ display: "flex", gap: "10px", cursor: "pointer", alignItems: "flex-start" }}>
                    <input type="checkbox" name="consentement" checked={form.consentement} onChange={handleChange}
                      style={{ marginTop: "2px", accentColor: C.vert, flexShrink: 0 }} />
                    <span style={{ color: C.texteSec, fontSize: "11px", lineHeight: 1.6 }}>
                      {"J'accepte que CaribbeanVault collecte et traite mes donnees personnelles dans le cadre de ma demande d'investissement, conformement a la "}
                      <Link href="/confidentialite" style={{ color: C.navy, fontWeight: 600 }}>politique de confidentialite</Link>
                      {" et au RGPD. Je peux exercer mes droits a tout moment en contactant "}
                      <a href="mailto:privacy@caribbeanvault.com" style={{ color: C.navy }}>privacy@caribbeanvault.com</a>. *
                    </span>
                  </label>
                </div>
                {/* Avertissement */}
                <div style={{ background: "#FFFBEB", borderRadius: "8px", padding: "12px", marginBottom: "16px", border: "1px solid #FCD34D44" }}>
                  <div style={{ color: "#92400E", fontSize: "11px", lineHeight: 1.6 }}>
                    ⚠️ <strong>Avertissement :</strong> {"L'investissement dans des actifs tokenises comporte des risques de perte en capital. Les performances passees ne prejudgent pas des performances futures."}
                  </div>
                </div>
                {/* Erreur */}
                {error && (
                  <div style={{ background: C.rougeL, borderRadius: "8px", padding: "12px", marginBottom: "14px", color: C.rouge, fontSize: "12px" }}>
                    ❌ {error}
                  </div>
                )}
                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="button" onClick={() => setStep(2)} style={{ flex: 1, background: C.creme, color: C.texteSec, border: `1px solid ${C.grisBord}`, padding: "13px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                    ← Retour
                  </button>
                  <button
                    type="submit"
                    disabled={!form.consentement || loading}
                    style={{
                      flex: 2, background: form.consentement && !loading ? C.navy : C.grisBord,
                      color: "white", border: "none", padding: "13px", borderRadius: "8px",
                      fontSize: "13px", fontWeight: 700,
                      cursor: form.consentement && !loading ? "pointer" : "not-allowed",
                    }}
                  >
                    {loading ? "Envoi en cours..." : "Envoyer ma demande →"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div style={{ textAlign: "center", color: C.texteTert, fontSize: "10px", lineHeight: 1.6 }}>
            🔒 Connexion securisee HTTPS · Donnees chiffrees · RGPD conforme · Hebergement EU
          </div>
        </form>
      </div>

      <Footer />
    </main>
  );
}
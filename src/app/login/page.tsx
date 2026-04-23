"use client";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { LogoNavy } from "@/components/Logo";

const C = {
  navy:     "#1A2E4A",
  sable:    "#D4884A",
  creme:    "#F8F6F1",
  grisBord: "#E8E2D6",
  texte:    "#1A2E4A",
  texteSec: "#4A5568",
  texteTert:"#9CA3AF",
  blanc:    "#FFFFFF",
  vert:     "#0F6E56",
  vertL:    "#E1F5EE",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    // Initialisation Supabase INSIDE la fonction
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError("Erreur lors de l'envoi. Verifiez votre email et reessayez.");
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.creme, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* NAVBAR */}
      <nav style={{ background: C.blanc, borderBottom: `0.5px solid ${C.grisBord}`, padding: "0 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <LogoNavy size={0.85} />
          </Link>
          <Link href="/kyc" style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>
            Pas encore de compte ? S'inscrire
          </Link>
        </div>
      </nav>

      {/* CONTENU */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>

          {!sent ? (
            <div style={{ background: "white", borderRadius: "16px", border: `0.5px solid ${C.grisBord}`, padding: "40px 32px" }}>
              <div style={{ textAlign: "center", marginBottom: "28px" }}>
                <div style={{ width: "56px", height: "56px", background: "#EEF2FF", borderRadius: "14px", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
                  🔐
                </div>
                <h1 style={{ color: C.texte, fontSize: "22px", fontWeight: 800, margin: "0 0 8px" }}>
                  Acces investisseur
                </h1>
                <p style={{ color: C.texteSec, fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
                  Entrez votre email pour recevoir un lien de connexion securise. Aucun mot de passe requis.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", color: C.texteSec, fontSize: "11px", fontWeight: 600, marginBottom: "6px" }}>
                    Adresse email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    style={{
                      width: "100%", padding: "12px 14px",
                      border: `1px solid ${C.grisBord}`,
                      borderRadius: "8px", fontSize: "13px",
                      color: C.texte, outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {error && (
                  <div style={{ background: "#FEE2E2", borderRadius: "8px", padding: "10px 14px", color: "#DC2626", fontSize: "12px", marginBottom: "16px" }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !email}
                  style={{
                    width: "100%", padding: "13px",
                    background: loading || !email ? C.texteTert : C.navy,
                    color: "white", border: "none",
                    borderRadius: "8px", fontSize: "14px",
                    fontWeight: 700, cursor: loading || !email ? "not-allowed" : "pointer",
                    transition: "background .15s",
                  }}
                >
                  {loading ? "Envoi en cours..." : "Recevoir mon lien de connexion"}
                </button>
              </form>

              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <p style={{ color: C.texteTert, fontSize: "11px", lineHeight: 1.6, margin: 0 }}>
                  Pas encore de compte ?{" "}
                  <Link href="/kyc" style={{ color: C.sable, fontWeight: 600, textDecoration: "none" }}>
                    Rejoindre CaribbeanVault
                  </Link>
                </p>
              </div>

              <div style={{ marginTop: "20px", padding: "12px", background: C.creme, borderRadius: "8px", textAlign: "center" }}>
                <p style={{ color: C.texteTert, fontSize: "10px", margin: 0, lineHeight: 1.6 }}>
                  {"Connexion securisee - Lien valable 24h - RGPD conforme"}
                </p>
              </div>
            </div>

          ) : (
            <div style={{ background: "white", borderRadius: "16px", border: `0.5px solid ${C.grisBord}`, padding: "40px 32px", textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", background: C.vertL, borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>
                ✉️
              </div>
              <h2 style={{ color: C.texte, fontSize: "20px", fontWeight: 800, margin: "0 0 12px" }}>
                Verifiez votre email !
              </h2>
              <p style={{ color: C.texteSec, fontSize: "13px", lineHeight: 1.8, margin: "0 0 8px" }}>
                Un lien de connexion a ete envoye a
              </p>
              <p style={{ color: C.navy, fontSize: "14px", fontWeight: 700, margin: "0 0 20px" }}>
                {email}
              </p>
              <p style={{ color: C.texteSec, fontSize: "12px", lineHeight: 1.7, margin: "0 0 24px" }}>
                Cliquez sur le lien dans l'email pour acceder a votre espace investisseur. Le lien est valable 24h.
              </p>
              <div style={{ background: "#FFFBEB", borderRadius: "8px", padding: "12px", marginBottom: "20px" }}>
                <p style={{ color: "#92400E", fontSize: "11px", margin: 0, lineHeight: 1.6 }}>
                  Vous ne voyez pas l'email ? Verifiez votre dossier spam ou{" "}
                  <button
                    onClick={() => setSent(false)}
                    style={{ color: C.sable, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontSize: "11px", padding: 0 }}
                  >
                    reessayez avec un autre email
                  </button>.
                </p>
              </div>
              <Link href="/" style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>
                Retour a l'accueil
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
"use client";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function AdminLogin() {
  const [email, setEmail] = useState("contact@geccostrategy.com");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setLoading(true);
    setError("");
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setError(error.message);
    else setSent(true);
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0F1E30" }}>
      <div style={{ background: "#1A2E4A", borderRadius: "12px", padding: "40px", width: "100%", maxWidth: "380px", border: "1px solid #253D5E" }}>
        <div style={{ color: "#D4884A", fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "system-ui" }}>
          CaribbeanVault
        </div>
        <div style={{ color: "white", fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>
          Accès administration
        </div>

        {!sent ? (
          <>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ color: "#6B8AAA", fontSize: "11px", display: "block", marginBottom: "6px", fontFamily: "system-ui" }}>
                Email administrateur
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #253D5E", background: "#0F1E30", color: "white", fontSize: "13px", fontFamily: "system-ui", boxSizing: "border-box", outline: "none" }}
              />
            </div>
            {error && <div style={{ color: "#FCA5A5", fontSize: "12px", marginBottom: "12px", fontFamily: "system-ui" }}>{error}</div>}
            <button
              onClick={handleLogin}
              disabled={loading}
              style={{ width: "100%", background: "#D4884A", color: "white", border: "none", padding: "12px", borderRadius: "6px", fontSize: "13px", fontWeight: 700, cursor: loading ? "wait" : "pointer", fontFamily: "system-ui", opacity: loading ? .7 : 1 }}>
              {loading ? "Envoi en cours..." : "Recevoir le lien de connexion"}
            </button>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>📬</div>
            <div style={{ color: "white", fontSize: "15px", fontWeight: 600, marginBottom: "8px" }}>Lien envoyé !</div>
            <div style={{ color: "#6B8AAA", fontSize: "13px", lineHeight: 1.6, fontFamily: "system-ui" }}>
              Vérifiez votre boîte mail {email} et cliquez sur le lien de connexion.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
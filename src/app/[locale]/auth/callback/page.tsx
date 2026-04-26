"use client";
export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function AuthCallback() {
  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Récupère les tokens depuis le hash de l'URL
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      }).then(({ error }) => {
        if (error) {
          console.error("Session error:", error.message);
          window.location.href = "/fr/login";
        } else {
          window.location.href = "/fr/dashboard";
        }
      });
    } else {
      // Pas de token dans le hash — attendre l'événement auth
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN" && session) {
          subscription.unsubscribe();
          window.location.href = "/fr/dashboard";
        }
      });
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8F6F1" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "32px", marginBottom: "16px" }}>⏳</div>
        <div style={{ color: "#4A5568", fontSize: "14px" }}>Connexion en cours...</div>
      </div>
    </div>
  );
}
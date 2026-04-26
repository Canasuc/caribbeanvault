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

    // Échange le token du hash URL en session active
    supabase.auth.exchangeCodeForSession(window.location.href).then(({ error }) => {
      if (error) {
        console.error("Auth error:", error.message);
        window.location.href = "/fr/login";
      } else {
        window.location.href = "/fr/dashboard";
      }
    });
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
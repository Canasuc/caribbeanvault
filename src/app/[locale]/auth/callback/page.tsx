"use client";
export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

const ADMIN_EMAIL = "contact@geccostrategy.com";

export default function AuthCallback() {
  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    async function handleSession() {
      let session = null;

      if (accessToken && refreshToken) {
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (error) { window.location.href = "/fr/login"; return; }
        session = data.session;
      } else {
        const { data } = await supabase.auth.getSession();
        session = data.session;
      }

      if (!session) { window.location.href = "/fr/login"; return; }

      // Redirection selon le rôle
      if (session.user.email === ADMIN_EMAIL) {
        window.location.href = "/fr/admin";
      } else {
        window.location.href = "/fr/dashboard";
      }
    }

    handleSession();
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8F6F1" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "32px", marginBottom: "16px" }}>⏳</div>
        <div style={{ color: "#4A5568", fontSize: "14px", fontFamily: "system-ui" }}>Connexion en cours...</div>
      </div>
    </div>
  );
}
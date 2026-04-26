"use client";
export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

const ADMIN_EMAIL = "axel.darnis@geccostrategy.com";

export default function AuthCallback() {
  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    async function handleSession() {
      // Attendre que Supabase traite le hash
      await new Promise(resolve => setTimeout(resolve, 1000));

      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace("#", ""));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (accessToken && refreshToken) {
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (error) { window.location.href = "/fr/login"; return; }
        const email = data.session?.user?.email;
        window.location.href = email === ADMIN_EMAIL ? "/fr/admin" : "/fr/dashboard";
      } else {
        // Écouter l'événement auth
        supabase.auth.onAuthStateChange((event, session) => {
          if (event === "SIGNED_IN" && session) {
            const email = session.user.email;
            window.location.href = email === ADMIN_EMAIL ? "/fr/admin" : "/fr/dashboard";
          }
        });
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
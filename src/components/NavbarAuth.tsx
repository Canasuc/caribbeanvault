"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useTranslations, useLocale } from "next-intl";
import type { User } from "@supabase/supabase-js";

interface NavbarAuthProps {
  buttonBg?: string;
  buttonColor?: string;
  textColor?: string;
  borderColor?: string;
}

export default function NavbarAuth({
  buttonBg = "#D4884A",
  buttonColor = "#1A2E4A",
  textColor = "#4A5568",
  borderColor = "rgba(255,255,255,.3)",
}: NavbarAuthProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    window.location.href = `/${locale}`;
  }

  if (loading) return null;

  if (user) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href={`/${locale}/dashboard`} style={{ color: textColor, fontSize: "12px", textDecoration: "none", opacity: .8 }}>
          {t("dashboard")}
        </Link>
        <button onClick={handleSignOut} style={{ background: "transparent", border: `1px solid ${borderColor}`, color: textColor, padding: "6px 14px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>
          {t("logout")}
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Link href={`/${locale}/login`} style={{ color: textColor, fontSize: "12px", textDecoration: "none", opacity: .8 }}>
        {t("login")}
      </Link>
      <Link href={`/${locale}/kyc`} style={{ background: buttonBg, color: buttonColor, padding: "8px 18px", borderRadius: "2px", fontSize: "11px", fontWeight: 700, textDecoration: "none" }}>
        {t("join")}
      </Link>
    </div>
  );
}
"use client";
import { useEffect } from "react";

export default function AuthCallbackRoot() {
  useEffect(() => {
    const search = window.location.search;
    const hash = window.location.hash;
    window.location.href = `/fr/auth/callback${search}${hash}`;
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
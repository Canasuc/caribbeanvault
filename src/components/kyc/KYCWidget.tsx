"use client";

import { useState, useEffect, useRef } from "react";

interface KYCWidgetProps {
  investorId: string;
  currentStatus?: string | null;
  onComplete?: (status: string) => void;
}

export default function KYCWidget({ investorId, currentStatus, onComplete }: KYCWidgetProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sdkToken, setSdkToken] = useState<string | null>(null);
  const [showWidget, setShowWidget] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sdkRef = useRef<unknown>(null);

  // ── Charger le SDK Sumsub ──
  useEffect(() => {
    if (!showWidget || !sdkToken) return;

    const script = document.createElement("script");
    script.src = "https://static.sumsub.com/idensic/static/sns-websdk-builder.js";
    script.async = true;
    script.onload = () => initWidget();
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [showWidget, sdkToken]);

  function initWidget() {
    if (!containerRef.current || !sdkToken) return;

    // @ts-expect-error — SDK Sumsub global
    const snsWebSdkInstance = window.snsWebSdk
      .init(sdkToken, () => getNewToken())
      .withConf({
        lang: "fr",
        theme: "light",
      })
      .withOptions({ addViewportTag: false, adaptIframeHeight: true })
      .on("idCheck.onStepCompleted", (payload: unknown) => {
        console.log("Step completed:", payload);
      })
      .on("idCheck.onApplicantStatusChanged", (payload: { reviewStatus: string }) => {
        console.log("Status changed:", payload);
        if (payload.reviewStatus === "completed") {
          onComplete?.("approved");
        }
      })
      .on("idCheck.onError", (error: unknown) => {
        console.error("Sumsub error:", error);
      })
      .build();

    snsWebSdkInstance.launch("#sumsub-websdk-container");
    sdkRef.current = snsWebSdkInstance;
  }

  async function getNewToken(): Promise<string> {
    const res = await fetch("/api/kyc/sdk-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ investorId }),
    });
    const data = await res.json();
    return data.token;
  }

  async function startKYC() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/kyc/sdk-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ investorId }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? "Erreur initialisation KYC");
        return;
      }

      setSdkToken(data.token);
      setShowWidget(true);
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  // ── Statut KYC approuvé ──
  if (currentStatus === "approved") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#E1F5EE", borderRadius: "12px", padding: "16px 20px", border: "0.5px solid #0F6E5630" }}>
        <div style={{ fontSize: "24px" }}>✅</div>
        <div>
          <div style={{ color: "#0F6E56", fontSize: "13px", fontWeight: 700 }}>Identité vérifiée</div>
          <div style={{ color: "#4A5568", fontSize: "11px", marginTop: "2px" }}>Votre KYC est approuvé — vous pouvez investir sans restriction.</div>
        </div>
      </div>
    );
  }

  // ── Statut KYC en attente ──
  if (currentStatus === "pending") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#FFFBEB", borderRadius: "12px", padding: "16px 20px", border: "0.5px solid #FCD34D44" }}>
        <div style={{ fontSize: "24px" }}>⏳</div>
        <div>
          <div style={{ color: "#92400E", fontSize: "13px", fontWeight: 700 }}>Vérification en cours</div>
          <div style={{ color: "#92400E", fontSize: "11px", marginTop: "2px" }}>Votre dossier est en cours d&apos;analyse. Vous recevrez un email de confirmation.</div>
        </div>
      </div>
    );
  }

  // ── Statut KYC rejeté ──
  if (currentStatus === "rejected") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#FEF2F2", borderRadius: "12px", padding: "16px 20px", border: "0.5px solid #FECACA" }}>
          <div style={{ fontSize: "24px" }}>❌</div>
          <div>
            <div style={{ color: "#DC2626", fontSize: "13px", fontWeight: 700 }}>Vérification refusée</div>
            <div style={{ color: "#DC2626", fontSize: "11px", marginTop: "2px" }}>Votre dossier a été refusé. Vous pouvez soumettre à nouveau vos documents.</div>
          </div>
        </div>
        <button
          onClick={startKYC}
          disabled={loading}
          style={{ padding: "12px", borderRadius: "10px", border: "none", background: "#D4884A", color: "white", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}
        >
          Soumettre à nouveau →
        </button>
      </div>
    );
  }

  // ── Widget affiché ──
  if (showWidget) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#1A2E4A", fontSize: "13px", fontWeight: 700 }}>Vérification d&apos;identité</div>
          <button
            onClick={() => setShowWidget(false)}
            style={{ background: "none", border: "none", color: "#9CA3AF", fontSize: "18px", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>
        <div id="sumsub-websdk-container" ref={containerRef} style={{ minHeight: "600px", borderRadius: "12px", overflow: "hidden" }} />
      </div>
    );
  }

  // ── Bouton de démarrage ──
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ background: "#F8F6F1", borderRadius: "12px", padding: "16px 20px", border: "0.5px solid #E8E2D6" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <div style={{ fontSize: "24px", flexShrink: 0 }}>🪪</div>
          <div>
            <div style={{ color: "#1A2E4A", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
              Vérification d&apos;identité requise
            </div>
            <p style={{ color: "#4A5568", fontSize: "12px", lineHeight: 1.6, margin: 0 }}>
              Pour investir dans les actifs RWA, nous devons vérifier votre identité conformément à la réglementation AMF/MiCA. La vérification prend 2 à 5 minutes.
            </p>
            <div style={{ display: "flex", gap: "16px", marginTop: "12px", flexWrap: "wrap" }}>
              {["🪪 Pièce d'identité", "🤳 Selfie", "✅ Résultat immédiat"].map((item, i) => (
                <div key={i} style={{ color: "#0F6E56", fontSize: "11px", fontWeight: 600 }}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div style={{ background: "#FEF2F2", borderRadius: "10px", padding: "12px 16px", color: "#DC2626", fontSize: "13px" }}>
          ❌ {error}
        </div>
      )}

      <button
        onClick={startKYC}
        disabled={loading}
        style={{
          padding: "14px", borderRadius: "10px", border: "none",
          background: loading ? "#9CA3AF" : "#1A2E4A",
          color: "white", fontSize: "13px", fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Initialisation..." : "Commencer la vérification →"}
      </button>
    </div>
  );
}
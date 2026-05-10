"use client";

import { useState, useEffect } from "react";

interface Holding {
  id: string;
  asset_id: string;
  actif_nom: string;
  currency_code: string;
  tokens_qty: number;
  montant_total_eur: number;
  amount_eur: number;
  prix_achat_unitaire: number;
  mint_tx_hash: string;
  xrpl_issuer_address: string;
  wallet_address: string;
  network: string;
  first_purchase_at: string;
  minted_at: string;
}

interface PortfolioData {
  holdings: Holding[];
  totalInvesti: number;
  totalTokens: number;
  nombreActifs: number;
}

const ACTIF_ICONS: Record<string, string> = {
  "rhum": "🥃",
  "immobilier": "🏠",
  "agriculture": "🌿",
  "art": "🎨",
};

function getIcon(assetId: string): string {
  for (const [key, icon] of Object.entries(ACTIF_ICONS)) {
    if (assetId.toLowerCase().includes(key)) return icon;
  }
  return "🪙";
}

const C = {
  navy:     "#1A2E4A",
  sable:    "#D4884A",
  creme:    "#F8F6F1",
  cremeB:   "#F0EBE1",
  grisBord: "#E8E2D6",
  texte:    "#1A2E4A",
  texteSec: "#4A5568",
  texteTert:"#9CA3AF",
  blanc:    "#FFFFFF",
  vert:     "#0F6E56",
  vertL:    "#E1F5EE",
};

interface PortfolioProps {
  investorId: string;
  isMobile: boolean;
}

export default function Portfolio({ investorId, isMobile }: PortfolioProps) {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const res = await fetch(`/api/portfolio?investorId=${investorId}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setData(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erreur");
      } finally {
        setLoading(false);
      }
    }
    void loadPortfolio();
  }, [investorId]);

  if (loading) {
    return (
      <div style={{ padding: "32px", textAlign: "center", color: C.texteTert, fontSize: "13px" }}>
        ⏳ Chargement du portfolio...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", background: "#FEF2F2", borderRadius: "10px", color: "#DC2626", fontSize: "13px" }}>
        ❌ {error}
      </div>
    );
  }

  if (!data || data.holdings.length === 0) {
    return (
      <div style={{ padding: "32px", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>🌴</div>
        <div style={{ color: C.texte, fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>
          Aucun token détenu pour l&apos;instant
        </div>
        <div style={{ color: C.texteSec, fontSize: "12px" }}>
          Investissez dans un actif caribéen pour voir votre portfolio ici.
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* ── Stats globales ── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "10px" }}>
        {[
          { label: "Total investi", val: `${data.totalInvesti.toLocaleString("fr-FR")} €`, icon: "💶" },
          { label: "Tokens détenus", val: `${data.totalTokens}`, icon: "🪙" },
          { label: "Actifs", val: `${data.nombreActifs}`, icon: "🏝️" },
        ].map((s, i) => (
          <div key={i} style={{ background: C.cremeB, borderRadius: "10px", padding: "14px 16px", border: `0.5px solid ${C.grisBord}`, textAlign: "center" }}>
            <div style={{ fontSize: "20px", marginBottom: "6px" }}>{s.icon}</div>
            <div style={{ color: C.navy, fontSize: "18px", fontWeight: 800 }}>{s.val}</div>
            <div style={{ color: C.texteTert, fontSize: "10px", marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Liste des holdings ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {data.holdings.map((h) => (
          <div key={h.id} style={{ background: C.blanc, borderRadius: "12px", border: `0.5px solid ${C.grisBord}`, padding: isMobile ? "16px" : "20px 24px", borderLeft: `4px solid ${C.vert}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <div style={{ fontSize: "28px" }}>{getIcon(h.asset_id)}</div>
                <div>
                  <div style={{ color: C.texte, fontSize: "13px", fontWeight: 700, marginBottom: "2px" }}>
                    {h.actif_nom ?? h.asset_id}
                  </div>
                  <div style={{ color: C.texteTert, fontSize: "11px" }}>
                    {h.currency_code} • {h.network === "testnet" ? "🧪 Testnet" : "🌐 Mainnet"}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ color: C.vert, fontSize: "18px", fontWeight: 800 }}>
                  {h.tokens_qty} tokens
                </div>
                <div style={{ color: C.texteSec, fontSize: "11px" }}>
                  {(h.montant_total_eur ?? h.amount_eur ?? 0).toLocaleString("fr-FR")} €
                </div>
              </div>
            </div>

            {/* Détails */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginTop: "14px", paddingTop: "14px", borderTop: `0.5px solid ${C.grisBord}` }}>
              {[
                { label: "Prix unitaire", val: `${h.prix_achat_unitaire ?? 0} €/token` },
                { label: "Date d'achat", val: h.first_purchase_at ? new Date(h.first_purchase_at).toLocaleDateString("fr-FR") : "—" },
                { label: "Réseau", val: h.network === "testnet" ? "XRPL Testnet" : "XRPL Mainnet" },
              ].map((d, i) => (
                <div key={i}>
                  <div style={{ color: C.texteTert, fontSize: "10px", marginBottom: "2px" }}>{d.label}</div>
                  <div style={{ color: C.texte, fontSize: "11px", fontWeight: 600 }}>{d.val}</div>
                </div>
              ))}
            </div>

            {/* Lien explorer */}
            {h.mint_tx_hash && (
              <div style={{ marginTop: "10px" }}>
                <a
                  href={`https://${h.network === "testnet" ? "testnet." : ""}xrpl.org/transactions/${h.mint_tx_hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: C.vert, fontSize: "11px", textDecoration: "underline" }}
                >
                  Voir sur XRPL Explorer →
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
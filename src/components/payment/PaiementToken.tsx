"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// ── Types ──────────────────────────────────────────────────────────────────────
interface ActifInfo {
  id: string;
  nom: string;
  prixToken: number; // prix en € par token
  minInvest: number; // minimum en €
  maxInvest: number; // maximum en €
}

interface PaiementTokenProps {
  actif: ActifInfo;
  investorId: string;
  onSuccess: (paymentIntentId: string) => void;
  onCancel: () => void;
}

// ── Formulaire de paiement (intérieur) ────────────────────────────────────────
function CheckoutForm({
  montant,
  actif,
  onSuccess,
  onCancel,
}: {
  montant: number;
  actif: ActifInfo;
  onSuccess: (piId: string) => void;
  onCancel: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMsg(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/${window.location.pathname.split("/")[1]}/confirmation`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMsg(error.message ?? "Une erreur est survenue");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      onSuccess(paymentIntent.id);
    }

    setLoading(false);
  }

  const tokensQty = Math.floor(montant / actif.prixToken);
  const fraisEmission = montant * 0.02; // 2% frais d'émission

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* Récapitulatif */}
      <div style={{ background: "#F8F6F1", borderRadius: "12px", padding: "16px 20px", border: "0.5px solid #E8E2D6" }}>
        <div style={{ color: "#D4884A", fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "12px" }}>
          Récapitulatif
        </div>
        {[
          { label: "Actif", val: actif.nom },
          { label: "Montant investi", val: `${montant.toLocaleString("fr-FR")} €` },
          { label: "Prix par token", val: `${actif.prixToken} €` },
          { label: "Tokens acquis", val: `${tokensQty} tokens` },
          { label: "Frais d'émission (2%)", val: `${fraisEmission.toFixed(2)} €` },
          { label: "Total prélevé", val: `${(montant + fraisEmission).toFixed(2)} €` },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 5 ? "0.5px solid #E8E2D6" : "none" }}>
            <span style={{ color: "#9CA3AF", fontSize: "12px" }}>{r.label}</span>
            <span style={{ color: "#1A2E4A", fontSize: "12px", fontWeight: 600 }}>{r.val}</span>
          </div>
        ))}
      </div>

      {/* Stripe Elements */}
      <div style={{ background: "white", borderRadius: "12px", padding: "20px", border: "0.5px solid #E8E2D6" }}>
        <div style={{ color: "#9CA3AF", fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "14px" }}>
          Informations de paiement
        </div>
        <PaymentElement />
      </div>

      {/* Erreur */}
      {errorMsg && (
        <div style={{ background: "#FEF2F2", border: "0.5px solid #FECACA", borderRadius: "10px", padding: "12px 16px", color: "#DC2626", fontSize: "13px" }}>
          ❌ {errorMsg}
        </div>
      )}

      {/* Boutons */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          onClick={onCancel}
          style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "0.5px solid #E8E2D6", background: "white", color: "#4A5568", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading || !stripe}
          style={{
            flex: 2, padding: "12px", borderRadius: "10px", border: "none",
            background: loading ? "#9CA3AF" : "#D4884A",
            color: "white", fontSize: "13px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
            transition: "background .2s",
          }}
        >
          {loading ? "Traitement en cours..." : `Payer ${(montant + fraisEmission).toFixed(2)} €`}
        </button>
      </div>

      <p style={{ color: "#9CA3AF", fontSize: "10px", textAlign: "center" }}>
        🔒 Paiement sécurisé par Stripe — vos données bancaires ne transitent pas par nos serveurs
      </p>
    </form>
  );
}

// ── Composant principal ────────────────────────────────────────────────────────
export default function PaiementToken({ actif, investorId, onSuccess, onCancel }: PaiementTokenProps) {
  const [montant, setMontant] = useState(actif.minInvest);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "pay">("select");

  const tokensQty = Math.floor(montant / actif.prixToken);

  async function createPaymentIntent() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          investorId,
          actifId: actif.id,
          actifNom: actif.nom,
          montantEuros: montant,
          tokensQty,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? "Erreur lors de la création du paiement");
        return;
      }

      setClientSecret(data.clientSecret);
      setPaymentIntentId(data.paymentIntentId);
      setStep("pay");
    } catch {
      setError("Erreur réseau — veuillez réessayer");
    } finally {
      setLoading(false);
    }
  }

  // ── Étape 1 : sélection du montant ──
  if (step === "select") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        <div>
          <label style={{ color: "#4A5568", fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "8px" }}>
            Montant à investir
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input
              type="range"
              min={actif.minInvest}
              max={actif.maxInvest}
              step={100}
              value={montant}
              onChange={e => setMontant(Number(e.target.value))}
              style={{ flex: 1, accentColor: "#D4884A" }}
            />
            <div style={{ background: "#F8F6F1", border: "0.5px solid #E8E2D6", borderRadius: "8px", padding: "8px 14px", minWidth: "90px", textAlign: "center" }}>
              <span style={{ color: "#1A2E4A", fontSize: "15px", fontWeight: 800 }}>{montant.toLocaleString("fr-FR")} €</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
            <span style={{ color: "#9CA3AF", fontSize: "10px" }}>Min : {actif.minInvest} €</span>
            <span style={{ color: "#9CA3AF", fontSize: "10px" }}>Max : {actif.maxInvest.toLocaleString("fr-FR")} €</span>
          </div>
        </div>

        {/* Montants rapides */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[500, 1000, 2500, 5000, 10000].filter(m => m >= actif.minInvest && m <= actif.maxInvest).map(m => (
            <button
              key={m}
              onClick={() => setMontant(m)}
              style={{
                padding: "6px 14px", borderRadius: "8px", border: "0.5px solid",
                borderColor: montant === m ? "#D4884A" : "#E8E2D6",
                background: montant === m ? "#FFF7ED" : "white",
                color: montant === m ? "#D4884A" : "#4A5568",
                fontSize: "12px", fontWeight: 600, cursor: "pointer",
              }}
            >
              {m.toLocaleString("fr-FR")} €
            </button>
          ))}
        </div>

        {/* Résumé */}
        <div style={{ background: "#E1F5EE", borderRadius: "12px", padding: "16px 20px", border: "0.5px solid #0F6E5630" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: "#0F6E56", fontSize: "13px", fontWeight: 700 }}>
                {tokensQty} tokens {actif.nom}
              </div>
              <div style={{ color: "#4A5568", fontSize: "11px", marginTop: "2px" }}>
                à {actif.prixToken} € / token
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#0F6E56", fontSize: "18px", fontWeight: 800 }}>{montant.toLocaleString("fr-FR")} €</div>
              <div style={{ color: "#9CA3AF", fontSize: "10px" }}>+ 2% frais d&apos;émission</div>
            </div>
          </div>
        </div>

        {error && (
          <div style={{ background: "#FEF2F2", borderRadius: "10px", padding: "12px 16px", color: "#DC2626", fontSize: "13px" }}>
            ❌ {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={onCancel}
            style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "0.5px solid #E8E2D6", background: "white", color: "#4A5568", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
          >
            Annuler
          </button>
          <button
            onClick={createPaymentIntent}
            disabled={loading}
            style={{
              flex: 2, padding: "12px", borderRadius: "10px", border: "none",
              background: loading ? "#9CA3AF" : "#D4884A",
              color: "white", fontSize: "13px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Chargement..." : "Continuer vers le paiement →"}
          </button>
        </div>
      </div>
    );
  }

  // ── Étape 2 : formulaire Stripe ──
  if (!clientSecret) return null;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#D4884A",
            colorBackground: "#ffffff",
            colorText: "#1A2E4A",
            colorDanger: "#DC2626",
            fontFamily: "system-ui, -apple-system, sans-serif",
            borderRadius: "10px",
          },
        },
      }}
    >
      <CheckoutForm
        montant={montant}
        actif={actif}
        onSuccess={(piId) => {
          setPaymentIntentId(piId);
          onSuccess(piId);
        }}
        onCancel={() => {
          setStep("select");
          setClientSecret(null);
        }}
      />
    </Elements>
  );
}
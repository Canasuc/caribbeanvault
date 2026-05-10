"use client";

import { useState, useEffect, useCallback } from "react";
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
  prixToken: number;
  minInvest: number;
  maxInvest: number;
  currencyCode?: string;
}

interface PaiementTokenProps {
  actif: ActifInfo;
  investorId: string;
  walletAddress?: string;
  onSuccess: (paymentIntentId: string) => void;
  onCancel: () => void;
}

type Step = "check-trust" | "trust-pending" | "select" | "pay";
type TrustStatus = "checking" | "missing" | "ok";

// ── Formulaire de paiement ─────────────────────────────────────────────────────
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
  const fraisEmission = montant * 0.02;

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ background: "#F8F6F1", borderRadius: "12px", padding: "16px 20px", border: "0.5px solid #E8E2D6" }}>
        <div style={{ color: "#D4884A", fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "12px" }}>Récapitulatif</div>
        {[
          { label: "Actif", val: actif.nom },
          { label: "Montant investi", val: `${montant.toLocaleString("fr-FR")} €` },
          { label: "Prix par token", val: `${actif.prixToken} €` },
          { label: "Tokens acquis", val: `${tokensQty} tokens ${actif.currencyCode ?? ""}` },
          { label: "Frais d'émission (2%)", val: `${fraisEmission.toFixed(2)} €` },
          { label: "Total prélevé", val: `${(montant + fraisEmission).toFixed(2)} €` },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 5 ? "0.5px solid #E8E2D6" : "none" }}>
            <span style={{ color: "#9CA3AF", fontSize: "12px" }}>{r.label}</span>
            <span style={{ color: "#1A2E4A", fontSize: "12px", fontWeight: 600 }}>{r.val}</span>
          </div>
        ))}
      </div>

      <div style={{ background: "white", borderRadius: "12px", padding: "20px", border: "0.5px solid #E8E2D6" }}>
        <div style={{ color: "#9CA3AF", fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "14px" }}>Informations de paiement</div>
        <PaymentElement />
      </div>

      {errorMsg && (
        <div style={{ background: "#FEF2F2", border: "0.5px solid #FECACA", borderRadius: "10px", padding: "12px 16px", color: "#DC2626", fontSize: "13px" }}>
          ❌ {errorMsg}
        </div>
      )}

      <div style={{ display: "flex", gap: "10px" }}>
        <button type="button" onClick={onCancel} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "0.5px solid #E8E2D6", background: "white", color: "#4A5568", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
          Retour
        </button>
        <button type="submit" disabled={loading || !stripe} style={{ flex: 2, padding: "12px", borderRadius: "10px", border: "none", background: loading ? "#9CA3AF" : "#D4884A", color: "white", fontSize: "13px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
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
export default function PaiementToken({ actif, investorId, walletAddress, onSuccess, onCancel }: PaiementTokenProps) {
  const [step, setStep] = useState<Step>("check-trust");
  const [trustStatus, setTrustStatus] = useState<TrustStatus>("checking");
  const [trustQrUrl, setTrustQrUrl] = useState<string | null>(null);
  const [trustUuid, setTrustUuid] = useState<string | null>(null);
  const [montant, setMontant] = useState(actif.minInvest);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const issuerAddress = process.env.NEXT_PUBLIC_XRPL_ADMIN_ADDRESS ?? "";
  const currencyCode = actif.currencyCode ?? "RHM";

  // ── Étape 0 : vérifier la trust line au montage ──
  const checkTrustLine = useCallback(async () => {
    if (!walletAddress) {
      // Pas de wallet connecté → skip trust line check, aller à select
      setStep("select");
      return;
    }

    setTrustStatus("checking");

    try {
      const res = await fetch(
        `/api/xrpl/check-trust-line?address=${walletAddress}&currency=${currencyCode}&issuer=${issuerAddress}`
      );
      const data = await res.json();

      if (data.exists) {
        setTrustStatus("ok");
        setStep("select");
      } else {
        setTrustStatus("missing");
        // Rester sur check-trust pour afficher l'alerte
      }
    } catch {
      // En cas d'erreur réseau → skip et continuer
      setStep("select");
    }
  }, [walletAddress, currencyCode, issuerAddress]);

  useEffect(() => {
    void checkTrustLine();
  }, [checkTrustLine]);

  // ── Générer le QR XUMM pour la trust line ──
  async function createTrustLinePayload() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/xrpl/create-trust-line-payload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ investorId, actifId: actif.id, walletAddress }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? "Erreur génération QR");
        return;
      }

      setTrustQrUrl(data.qrUrl);
      setTrustUuid(data.payloadUuid);
      setStep("trust-pending");
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  // ── Polling statut trust line ──
  useEffect(() => {
    if (step !== "trust-pending" || !trustUuid) return;

    const poll = setInterval(async () => {
      try {
        const res = await fetch(`/api/xrpl/xumm-status?uuid=${trustUuid}`);
        const data = await res.json();

        if (data.signed) {
          setTrustStatus("ok");
          setTrustQrUrl(null);
          setTrustUuid(null);
          setStep("select");
          clearInterval(poll);
        }
        if (data.expired) {
          setTrustQrUrl(null);
          setTrustUuid(null);
          setStep("check-trust");
          clearInterval(poll);
        }
      } catch { /* silencieux */ }
    }, 2000);

    return () => clearInterval(poll);
  }, [step, trustUuid]);

  // ── Créer le PaymentIntent ──
  async function createPaymentIntent() {
    setLoading(true);
    setError(null);

    const tokensQty = Math.floor(montant / actif.prixToken);

    try {
      const res = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ investorId, actifId: actif.id, actifNom: actif.nom, montantEuros: montant, tokensQty }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? "Erreur création paiement");
        return;
      }

      setClientSecret(data.clientSecret);
      setStep("pay");
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  const tokensQty = Math.floor(montant / actif.prixToken);

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDU PAR ÉTAPE
  // ─────────────────────────────────────────────────────────────────────────────

  // ── Étape 0a : vérification en cours ──
  if (step === "check-trust" && trustStatus === "checking") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "32px 20px" }}>
        <div style={{ fontSize: "24px" }}>⏳</div>
        <div style={{ color: "#4A5568", fontSize: "13px" }}>Vérification de votre wallet...</div>
      </div>
    );
  }

  // ── Étape 0b : trust line manquante → alerte ──
  if (step === "check-trust" && trustStatus === "missing") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Alerte */}
        <div style={{ background: "#FFFBEB", border: "1px solid #FCD34D", borderRadius: "12px", padding: "16px 20px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ fontSize: "20px", flexShrink: 0 }}>⚠️</div>
            <div>
              <div style={{ color: "#92400E", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>
                Autorisation requise avant le paiement
              </div>
              <p style={{ color: "#92400E", fontSize: "12px", lineHeight: 1.6, margin: 0 }}>
                Pour recevoir vos tokens <strong>{currencyCode}</strong> sur votre wallet XRPL, vous devez d&apos;abord autoriser leur réception dans Xaman. Cette opération est gratuite et ne prend que 30 secondes.
              </p>
            </div>
          </div>
        </div>

        {/* Explication */}
        <div style={{ background: "#F8F6F1", borderRadius: "10px", padding: "14px 16px", border: "0.5px solid #E8E2D6" }}>
          <div style={{ color: "#4A5568", fontSize: "11px", lineHeight: 1.7 }}>
            <strong>Pourquoi ?</strong> Le protocole XRPL exige que chaque wallet autorise explicitement la réception d&apos;un nouveau type de token. C&apos;est une mesure de sécurité qui protège votre wallet.
          </div>
        </div>

        {error && (
          <div style={{ background: "#FEF2F2", borderRadius: "10px", padding: "12px 16px", color: "#DC2626", fontSize: "13px" }}>
            ❌ {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onCancel} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "0.5px solid #E8E2D6", background: "white", color: "#4A5568", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
            Annuler
          </button>
          <button
            onClick={createTrustLinePayload}
            disabled={loading}
            style={{ flex: 2, padding: "12px", borderRadius: "10px", border: "none", background: loading ? "#9CA3AF" : "#0F6E56", color: "white", fontSize: "13px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Chargement..." : "Autoriser dans Xaman →"}
          </button>
        </div>

        {/* Option skip si pas de wallet */}
        <button
          onClick={() => setStep("select")}
          style={{ background: "none", border: "none", color: "#9CA3AF", fontSize: "11px", cursor: "pointer", textDecoration: "underline" }}
        >
          Ignorer et payer quand même (tokens émis manuellement)
        </button>
      </div>
    );
  }

  // ── Étape 0c : QR trust line affiché, attente signature ──
  if (step === "trust-pending") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
        <div style={{ color: "#1A2E4A", fontSize: "14px", fontWeight: 700 }}>
          Scannez avec Xaman pour autoriser
        </div>
        <p style={{ color: "#4A5568", fontSize: "12px", textAlign: "center", maxWidth: "300px", margin: 0 }}>
          Ouvrez Xaman sur votre téléphone, scannez ce QR code et appuyez sur &ldquo;Accepter&rdquo;
        </p>

        {trustQrUrl && (
          <img
            src={trustQrUrl}
            alt="QR code autorisation trust line"
            width={180}
            height={180}
            style={{ borderRadius: "12px", border: "2px solid #E8E2D6" }}
          />
        )}

        <p style={{ color: "#9CA3AF", fontSize: "11px", textAlign: "center", animation: "pulse 2s infinite" }}>
          ⏳ En attente de votre confirmation dans Xaman...
        </p>

        {trustUuid && (
          <a
            href={`https://xumm.app/sign/${trustUuid}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0F6E56", fontSize: "12px", textDecoration: "underline" }}
          >
            Ouvrir directement dans Xaman →
          </a>
        )}

        <button
          onClick={() => { setStep("check-trust"); setTrustStatus("missing"); }}
          style={{ background: "none", border: "none", color: "#9CA3AF", fontSize: "11px", cursor: "pointer", textDecoration: "underline" }}
        >
          Annuler
        </button>
      </div>
    );
  }

  // ── Étape 1 : sélection du montant ──
  if (step === "select") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* Badge trust line OK */}
        {trustStatus === "ok" && walletAddress && (
          <div style={{ background: "#E1F5EE", borderRadius: "10px", padding: "10px 14px", border: "0.5px solid #0F6E5630", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "14px" }}>✅</span>
            <span style={{ color: "#0F6E56", fontSize: "12px", fontWeight: 600 }}>
              Wallet autorisé à recevoir les tokens {currencyCode}
            </span>
          </div>
        )}

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
            <button key={m} onClick={() => setMontant(m)} style={{ padding: "6px 14px", borderRadius: "8px", border: "0.5px solid", borderColor: montant === m ? "#D4884A" : "#E8E2D6", background: montant === m ? "#FFF7ED" : "white", color: montant === m ? "#D4884A" : "#4A5568", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
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
              <div style={{ color: "#4A5568", fontSize: "11px", marginTop: "2px" }}>à {actif.prixToken} € / token</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#0F6E56", fontSize: "18px", fontWeight: 800 }}>{montant.toLocaleString("fr-FR")} €</div>
              <div style={{ color: "#9CA3AF", fontSize: "10px" }}>+ 2% frais d&apos;émission</div>
            </div>
          </div>
        </div>

        {error && (
          <div style={{ background: "#FEF2F2", borderRadius: "10px", padding: "12px 16px", color: "#DC2626", fontSize: "13px" }}>❌ {error}</div>
        )}

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onCancel} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "0.5px solid #E8E2D6", background: "white", color: "#4A5568", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
            Annuler
          </button>
          <button onClick={createPaymentIntent} disabled={loading} style={{ flex: 2, padding: "12px", borderRadius: "10px", border: "none", background: loading ? "#9CA3AF" : "#D4884A", color: "white", fontSize: "13px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
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
        onSuccess={onSuccess}
        onCancel={() => { setStep("select"); setClientSecret(null); }}
      />
    </Elements>
  );
}
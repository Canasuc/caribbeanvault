/**
 * CARIBBEANVAULT — src/lib/xrpl/validate.ts
 * Validation d'adresse XRPL — branché sur la page onboarding wallet
 */

import * as xrpl from "xrpl";
import { getClient } from "./client";

// ── Validation format (sans réseau) ─────────────────────────────────────────
export function validateAddress(address: string): { valid: boolean; error?: string; address?: string } {
  const trimmed = address?.trim();
  if (!trimmed) return { valid: false, error: "Adresse manquante" };
  if (!trimmed.startsWith("r")) return { valid: false, error: "L'adresse XRPL doit commencer par 'r'" };
  if (trimmed.length < 25 || trimmed.length > 34) return { valid: false, error: "Longueur incorrecte (25-34 caractères)" };
  if (!xrpl.isValidAddress(trimmed)) return { valid: false, error: "Adresse invalide (checksum incorrect)" };
  return { valid: true, address: trimmed };
}

// ── Vérification activation on-chain (balance ≥ 2 XRP) ──────────────────────
export async function checkActivated(address: string): Promise<{
  activated: boolean;
  balance_xrp?: number;
  error?: string;
}> {
  try {
    const client = await getClient();
    const info = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });
    const balance = Number(info.result.account_data.Balance) / 1_000_000;
    if (balance < 2) {
      return { activated: false, balance_xrp: balance, error: `Balance insuffisante : ${balance} XRP (minimum 2 XRP requis)` };
    }
    return { activated: true, balance_xrp: balance };
  } catch {
    return { activated: false, balance_xrp: 0, error: "Compte non trouvé — envoyez au moins 2 XRP à cette adresse" };
  }
}

// ── Fonction complète — utilisée dans l'API route Next.js ───────────────────
export async function validateInvestorWallet(address: string): Promise<{
  ok: boolean;
  step?: string;
  reason?: string;
  address?: string;
  balance_xrp?: number;
}> {
  const fmt = validateAddress(address);
  if (!fmt.valid) return { ok: false, step: "format", reason: fmt.error };

  const act = await checkActivated(fmt.address!);
  if (!act.activated) return { ok: false, step: "activation", reason: act.error, balance_xrp: act.balance_xrp };

  return { ok: true, address: fmt.address, balance_xrp: act.balance_xrp };
}
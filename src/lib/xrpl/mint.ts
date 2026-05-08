/**
 * CARIBBEANVAULT — src/lib/xrpl/mint.ts
 * Mint d'un token XLS-20 — déclenché par le webhook Stripe
 */

import * as xrpl from "xrpl";
import { getClient } from "./client";

// NFTokenTaxon par verticale
export const TAXON = {
  RHUM:  1,
  IMMO:  2,
  AGRI:  3,
  ART:   4,
} as const;

export type TaxonKey = keyof typeof TAXON;

export interface MintParams {
  assetId:        string;      // ex: "fut-damoiseau-2024-001"
  assetType:      TaxonKey;    // "RHUM" | "IMMO" | "AGRI" | "ART"
  metadataUrl:    string;      // URL vers le JSON des métadonnées
  transferFeePct: number;      // ex: 0.5 pour 0.5%
}

export interface MintResult {
  nftTokenId: string;
  txHash:     string;
  ledger:     number;
}

// ── Mint un token XLS-20 depuis le wallet ISSUER ─────────────────────────────
export async function mintToken(params: MintParams): Promise<MintResult> {
  const { assetId, assetType, metadataUrl, transferFeePct } = params;

  // Charger le wallet ISSUER depuis les variables d'environnement
  const issuerSeed = process.env.XRPL_ISSUER_SEED;
  if (!issuerSeed) throw new Error("XRPL_ISSUER_SEED manquant dans .env.local");

  const issuerWallet = xrpl.Wallet.fromSeed(issuerSeed);
  const client = await getClient();

  // Vérifier que l'URI ne dépasse pas 512 bytes (1024 chars hex)
  const uriHex = xrpl.convertStringToHex(metadataUrl);
  if (uriHex.length > 1024) {
    throw new Error(`URI trop longue : ${uriHex.length} chars (max 1024). Utilisez une URL courte.`);
  }

  // TransferFee : 0.5% = 500, max 50% = 50000
  const transferFee = Math.round(transferFeePct * 1000);
  if (transferFee < 0 || transferFee > 50000) {
    throw new Error(`TransferFee invalide : ${transferFee} (0 à 50000)`);
  }

  const mintTx: xrpl.NFTokenMint = {
    TransactionType: "NFTokenMint",
    Account:         issuerWallet.classicAddress,
    URI:             uriHex,
    Flags:           xrpl.NFTokenMintFlags.tfTransferable,
    TransferFee:     transferFee,
    NFTokenTaxon:    TAXON[assetType],
    Memos: [
      {
        Memo: {
          MemoType: xrpl.convertStringToHex("caribbeanvault/asset"),
          MemoData: xrpl.convertStringToHex(assetId),
        },
      },
    ],
  };

  const result = await client.submitAndWait(mintTx, { wallet: issuerWallet });

  // Vérifier le résultat — meta peut être string (erreur réseau) ou TransactionMetadata
  const { meta } = result.result;
  if (typeof meta === "string" || !meta) {
    throw new Error("Métadonnées de transaction invalides");
  }
  if (meta.TransactionResult !== "tesSUCCESS") {
    throw new Error(`Mint échoué : ${meta.TransactionResult}`);
  }

  // Extraire le NFTokenID via la fonction officielle xrpl.js
  const nftTokenId = xrpl.getNFTokenID(meta);
  if (!nftTokenId) {
    throw new Error("NFTokenID introuvable dans les métadonnées de la transaction");
  }

  return {
    nftTokenId,
    txHash:  result.result.hash,
    ledger:  result.result.ledger_index ?? 0,
  };
}
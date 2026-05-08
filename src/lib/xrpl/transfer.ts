/**
 * CARIBBEANVAULT — src/lib/xrpl/transfer.ts
 * Transfert d'un token XLS-20 vers le wallet d'un investisseur
 * Déclenché automatiquement après le mint
 */

import * as xrpl from "xrpl";
import { getClient } from "./client";

export interface TransferResult {
  offerId:       string;
  offerTxHash:   string;
  acceptTxHash?: string; // présent si accepté automatiquement
  deepLink?:     string; // lien XUMM si acceptation manuelle requise
}

// ── Créer une offre de vente à 0 XRP réservée à l'investisseur ──────────────
export async function createTransferOffer(
  nftTokenId:      string,
  investorAddress: string
): Promise<{ offerId: string; txHash: string }> {
  const issuerSeed = process.env.XRPL_ISSUER_SEED;
  if (!issuerSeed) throw new Error("XRPL_ISSUER_SEED manquant");

  const issuerWallet = xrpl.Wallet.fromSeed(issuerSeed);
  const client = await getClient();

  const sellOfferTx: xrpl.NFTokenCreateOffer = {
    TransactionType: "NFTokenCreateOffer",
    Account:         issuerWallet.classicAddress,
    NFTokenID:       nftTokenId,
    Amount:          "0", // gratuit — paiement déjà fait via Stripe
    Flags:           xrpl.NFTokenCreateOfferFlags.tfSellNFToken,
    Destination:     investorAddress, // seul cet investisseur peut accepter
  };

  const result = await client.submitAndWait(sellOfferTx, { wallet: issuerWallet });

  const { meta } = result.result;
  if (typeof meta === "string" || !meta) {
    throw new Error("Métadonnées de transaction invalides");
  }
  if (meta.TransactionResult !== "tesSUCCESS") {
    throw new Error(`NFTokenCreateOffer échoué : ${meta.TransactionResult}`);
  }

  // Extraire l'OfferID depuis les AffectedNodes
  let offerId = "";
  for (const node of meta.AffectedNodes || []) {
    const created = (node as xrpl.CreatedNode).CreatedNode;
    if (created?.LedgerEntryType === "NFTokenOffer") {
      offerId = created.LedgerIndex;
      break;
    }
  }

  if (!offerId) throw new Error("OfferID introuvable dans les métadonnées");

  return { offerId, txHash: result.result.hash };
}

// ── Générer un deep link XUMM pour que l'investisseur accepte depuis l'app ──
export function buildXummDeepLink(offerId: string): string {
  // En production : utiliser l'API XUMM pour créer un payload signable
  // https://docs.xumm.dev/
  // Pour le pilote : deep link direct XUMM
  return `https://xumm.app/sign/${offerId}`;
}

// ── Flux complet : mint → offre → deep link email ────────────────────────────
export async function transferToken(
  nftTokenId:      string,
  investorAddress: string,
  investorEmail:   string
): Promise<TransferResult> {
  // Créer l'offre de vente réservée à l'investisseur
  const { offerId, txHash: offerTxHash } = await createTransferOffer(nftTokenId, investorAddress);

  // Générer le deep link XUMM
  const deepLink = buildXummDeepLink(offerId);

  // En production : envoyer l'email avec le deep link via Brevo
  // await sendTransferEmail(investorEmail, deepLink, nftTokenId);
  console.log(`[XRPL] Deep link XUMM généré pour ${investorEmail} : ${deepLink}`);

  return {
    offerId,
    offerTxHash,
    deepLink,
  };
}
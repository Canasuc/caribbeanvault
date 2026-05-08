/**
 * CARIBBEANVAULT — src/app/api/purchase/route.ts
 * Webhook Stripe → Mint XRPL → Transfert token investisseur
 *
 * Flux complet :
 * 1. Stripe envoie un webhook POST quand un paiement est confirmé
 * 2. On vérifie la signature Stripe (sécurité)
 * 3. On récupère les métadonnées : userId, assetId, walletAddress
 * 4. On mint le token XLS-20 depuis le wallet ISSUER
 * 5. On crée une offre de transfert vers le wallet de l'investisseur
 * 6. On envoie un email avec le deep link XUMM
 * 7. On met à jour Supabase (table holdings)
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { mintToken, TaxonKey } from "@/lib/xrpl/mint";
import { transferToken } from "@/lib/xrpl/transfer";
import { createClient } from "@supabase/supabase-js";

// ── Client Stripe (niveau module — pas d'erreur si clé absente au build) ────
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2026-04-22.dahlia",
});

// Supabase est instancié dans le handler pour éviter les erreurs au build
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}


// ── Handler principal ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const body      = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Signature Stripe manquante" }, { status: 400 });
  }

  // ── Étape 1 : Vérifier la signature Stripe ──────────────────────────────
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[Webhook] Signature invalide :", err);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  // On ne traite que les paiements confirmés
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // ── Étape 2 : Récupérer les métadonnées du paiement ────────────────────
  // Ces métadonnées sont définies lors de la création de la session Stripe
  const metadata = session.metadata;
  if (!metadata) {
    console.error("[Webhook] Métadonnées Stripe manquantes");
    return NextResponse.json({ error: "Métadonnées manquantes" }, { status: 400 });
  }

  const {
    user_id:         userId,
    asset_id:        assetId,        // ex: "fut-damoiseau-2024"
    asset_type:      assetType,      // ex: "RHUM"
    token_number:    tokenNumber,    // ex: "001"
    metadata_url:    metadataUrl,    // ex: "https://assets.caribbeanvault.com/rhum/fut-damoiseau-2024-001.json"
    wallet_address:  walletAddress,  // wallet XRPL de l'investisseur
    investor_email:  investorEmail,
    amount_eur:      amountEur,
  } = metadata;

  // Validation des métadonnées requises
  if (!userId || !assetId || !assetType || !walletAddress || !metadataUrl) {
    console.error("[Webhook] Métadonnées incomplètes :", metadata);
    return NextResponse.json({ error: "Métadonnées incomplètes" }, { status: 400 });
  }

  // ID unique de l'actif token
  const fullAssetId = `${assetId}-${tokenNumber?.padStart(3, "0") || "001"}`;

  console.log(`[Webhook] Paiement confirmé — userId: ${userId}, asset: ${fullAssetId}`);

  const supabase = getSupabase();

  try {
    // ── Étape 3 : Vérifier que ce paiement n'a pas déjà été traité ─────────
    const { data: existing } = await supabase
      .from("holdings")
      .select("id")
      .eq("stripe_session_id", session.id)
      .single();

    if (existing) {
      console.warn(`[Webhook] Paiement déjà traité : ${session.id}`);
      return NextResponse.json({ received: true, already_processed: true });
    }

    // ── Étape 4 : Mint du token XLS-20 ─────────────────────────────────────
    console.log(`[Webhook] Mint du token ${fullAssetId}...`);

    const mintResult = await mintToken({
      assetId:        fullAssetId,
      assetType:      assetType as TaxonKey,
      metadataUrl,
      transferFeePct: 0.5, // 0.5% de royalties sur les reventes
    });

    console.log(`[Webhook] Token minté : ${mintResult.nftTokenId}`);

    // ── Étape 5 : Transfert vers le wallet de l'investisseur ────────────────
    console.log(`[Webhook] Transfert vers ${walletAddress}...`);

    const transferResult = await transferToken(
      mintResult.nftTokenId,
      walletAddress,
      investorEmail || ""
    );

    console.log(`[Webhook] Offre créée : ${transferResult.offerId}`);

    // ── Étape 6 : Mise à jour Supabase ──────────────────────────────────────
    const { error: dbError } = await supabase
      .from("holdings")
      .insert({
        user_id:          userId,
        asset_id:         assetId,
        nft_token_id:     mintResult.nftTokenId,
        wallet_address:   walletAddress,
        amount_eur:       parseFloat(amountEur || "0"),
        stripe_session_id: session.id,
        offer_id:         transferResult.offerId,
        offer_tx_hash:    transferResult.offerTxHash,
        deep_link_xumm:   transferResult.deepLink,
        status:           "offer_pending", // l'investisseur doit encore accepter
        minted_at:        new Date().toISOString(),
        network:          process.env.XRPL_NODE?.includes("altnet") ? "testnet" : "mainnet",
      });

    if (dbError) {
      console.error("[Webhook] Erreur Supabase :", dbError);
      // On ne retourne pas d'erreur — le mint et le transfert ont réussi
      // Un job de réconciliation pourrait corriger la DB plus tard
    }

    // ── Étape 7 : Log final ──────────────────────────────────────────────────
    console.log(`[Webhook] ✅ Succès complet pour ${userId} :`, {
      nftTokenId:  mintResult.nftTokenId,
      txHash:      mintResult.txHash,
      offerId:     transferResult.offerId,
      deepLink:    transferResult.deepLink,
    });

    return NextResponse.json({
      received:   true,
      nftTokenId: mintResult.nftTokenId,
      offerId:    transferResult.offerId,
      deepLink:   transferResult.deepLink,
    });

  } catch (error) {
    // Erreur critique : le mint ou le transfert a échoué
    console.error("[Webhook] Erreur critique :", error);

    // Alerter l'équipe technique (en prod : Slack, Sentry, email)
    try {
      await supabase
      .from("webhook_errors")
      .insert({
        stripe_session_id: session.id,
        user_id:           userId,
        asset_id:          assetId,
        error:             String(error),
        created_at:        new Date().toISOString(),
      })
;
    } catch { /* on ignore erreur table webhook_errors */ }

    // Retourner 500 pour que Stripe réessaie automatiquement
    return NextResponse.json(
      { error: "Erreur interne — Stripe va réessayer" },
      { status: 500 }
    );
  }
}
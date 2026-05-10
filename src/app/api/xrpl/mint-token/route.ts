import { NextRequest, NextResponse } from "next/server";
import { Client, Wallet, Payment, TrustSet, AccountSet } from "xrpl";
import { createClient } from "@supabase/supabase-js";

// ── Currency codes par verticale (3 caractères ASCII) ──────────────────────
const CURRENCY_CODES: Record<string, string> = {
  "rhum":        "RHM", // Rhum AOC
  "immobilier":  "IMM", // Immobilier
  "agriculture": "AGR", // Agriculture
  "art":         "ART", // Art créole
};

function getCurrencyCode(actifId: string): string {
  for (const [key, code] of Object.entries(CURRENCY_CODES)) {
    if (actifId.toLowerCase().includes(key)) return code;
  }
  return "CVT"; // CaribbeanVault Token — fallback
}

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  try {
    const body = await req.json();
    const { transactionId } = body;

    if (!transactionId) {
      return NextResponse.json({ error: "transactionId requis" }, { status: 400 });
    }

    // ── Récupérer la transaction depuis Supabase ──
    const { data: tx, error: txError } = await supabase
      .from("transactions")
      .select("*, investisseurs(xrpl_address, prenom, nom)")
      .eq("id", transactionId)
      .single();

    if (txError || !tx) {
      return NextResponse.json({ error: "Transaction introuvable" }, { status: 404 });
    }

    if (tx.statut !== "completed") {
      return NextResponse.json({ error: "Transaction non complétée — paiement requis" }, { status: 400 });
    }

    if (tx.tokens_emis) {
      return NextResponse.json({ error: "Tokens déjà émis pour cette transaction" }, { status: 400 });
    }

    const investisseurAddress = tx.investisseurs?.xrpl_address;
    if (!investisseurAddress) {
      return NextResponse.json({ error: "Wallet XRPL investisseur non configuré" }, { status: 400 });
    }

    const currencyCode = getCurrencyCode(tx.actif_id);
    const tokensQty = tx.tokens_qty;

    // ── Connexion XRPL ──
    const client = new Client(process.env.XRPL_NETWORK ?? "wss://s.altnet.rippletest.net:51233");
    await client.connect();

    try {
      const issuerWallet = Wallet.fromSeed(process.env.XRPL_ADMIN_SEED!);
      const issuerAddress = issuerWallet.address;

      // ── Étape 1 : Configurer le wallet émetteur (Default Ripple ON) ──
      // Nécessaire pour les IOU fungibles
      const accountSetTx: AccountSet = {
        TransactionType: "AccountSet",
        Account: issuerAddress,
        SetFlag: 8, // asfDefaultRipple
      };

      try {
        const accountSetResult = await client.submitAndWait(accountSetTx, { wallet: issuerWallet });
        console.log("AccountSet result:", accountSetResult.result.meta);
      } catch {
        // Peut échouer si déjà configuré — on continue
        console.log("AccountSet déjà configuré ou ignoré");
      }

      // ── Étape 2 : Vérifier que la trust line existe côté investisseur ──
      // L'investisseur doit avoir une trust line vers l'émetteur CV
      // pour recevoir les tokens IOU
      let trustLineExists = false;
      try {
        const accountLines = await client.request({
          command: "account_lines",
          account: investisseurAddress,
          peer: issuerAddress,
        });
        trustLineExists = accountLines.result.lines.some(
          (line: { currency: string }) => line.currency === currencyCode
        );
      } catch {
        trustLineExists = false;
      }

      if (!trustLineExists) {
        // Créer la trust line depuis le wallet admin CV vers l'investisseur
        // En production : l'investisseur doit signer lui-même via Xaman
        // En testnet : on la crée programmatiquement pour les tests
        const trustSetTx: TrustSet = {
          TransactionType: "TrustSet",
          Account: investisseurAddress,
          LimitAmount: {
            currency: currencyCode,
            issuer: issuerAddress,
            value: "1000000", // limite maximale
          },
        };

        console.log("Trust line requise — en production l'investisseur signe via Xaman");
        // En testnet seulement : on skip si pas de seed investisseur
        // En production : déclencher un payload XUMM pour signature
      }

      // ── Étape 3 : Émettre les tokens IOU vers le wallet investisseur ──
      const paymentTx: Payment = {
        TransactionType: "Payment",
        Account: issuerAddress,
        Destination: investisseurAddress,
        Amount: {
          currency: currencyCode,
          issuer: issuerAddress,
          value: String(tokensQty),
        },
      };

      const result = await client.submitAndWait(paymentTx, { wallet: issuerWallet });

      const txHash = result.result.hash;
      const txSuccess = result.result.meta &&
        typeof result.result.meta === "object" &&
        "TransactionResult" in result.result.meta &&
        result.result.meta.TransactionResult === "tesSUCCESS";

      console.log(`Mint XRPL — hash: ${txHash} — success: ${txSuccess}`);

      // ── Étape 4 : Mettre à jour Supabase ──
      await supabase
        .from("transactions")
        .update({
          tokens_emis: txSuccess,
          xrpl_tx_hash: txHash,
        })
        .eq("id", transactionId);

      // ── Étape 5 : Mettre à jour holdings ──
      if (txSuccess) {
        const { data: existingHolding } = await supabase
          .from("holdings")
          .select("id, tokens_qty")
          .eq("investor_id", tx.investor_id)
          .eq("actif_id", tx.actif_id)
          .single();

        if (existingHolding) {
          await supabase
            .from("holdings")
            .update({ tokens_qty: existingHolding.tokens_qty + tokensQty })
            .eq("id", existingHolding.id);
        } else {
          await supabase
            .from("holdings")
            .insert({
              investor_id: tx.investor_id,
              actif_id: tx.actif_id,
              actif_nom: tx.actif_nom,
              currency_code: currencyCode,
              tokens_qty: tokensQty,
              prix_achat_unitaire: tx.montant_euros / tokensQty,
              montant_total_eur: tx.montant_euros,
              first_purchase_at: new Date().toISOString(),
            });
        }
      }

      return NextResponse.json({
        success: txSuccess,
        txHash,
        currencyCode,
        tokensQty,
        investisseurAddress,
        xrplExplorerUrl: `https://testnet.xrpl.org/transactions/${txHash}`,
      });

    } finally {
      await client.disconnect();
    }

  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    console.error("Mint XRPL error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erreur webhook";
    console.error("Stripe webhook signature error:", msg);
    return NextResponse.json({ error: `Webhook Error: ${msg}` }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  switch (event.type) {

    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      const { investorId, actifNom, tokensQty, montantEuros } = pi.metadata;

      console.log(`✅ Paiement réussi — ${montantEuros}€ — investisseur ${investorId}`);

      // ── Mettre à jour la transaction ──
      const { data: tx } = await supabase
        .from("transactions")
        .update({
          statut: "completed",
          stripe_charge_id: pi.latest_charge as string,
          completed_at: new Date().toISOString(),
        })
        .eq("stripe_payment_intent_id", pi.id)
        .select("id")
        .single();

      // ── Déclencher le mint XRPL automatiquement ──
      if (tx?.id) {
        try {
          const mintResponse = await fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/xrpl/mint-token`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ transactionId: tx.id }),
            }
          );
          const mintData = await mintResponse.json();

          if (mintData.success) {
            console.log(`✅ Tokens mintés — hash: ${mintData.txHash}`);
          } else {
            console.error("❌ Mint échoué:", mintData.error);
          }
        } catch (mintErr) {
          console.error("❌ Erreur appel mint:", mintErr);
          // On continue — le mint peut être relancé manuellement
        }
      }

      // ── Récupérer l'email depuis le customer Stripe ──
      let customerEmail = "";
      if (pi.customer) {
        const customer = await stripe.customers.retrieve(pi.customer as string);
        if (!("deleted" in customer)) {
          customerEmail = customer.email ?? "";
        }
      }

      // ── Envoyer email de confirmation ──
      if (customerEmail) {
        try {
          await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-key": process.env.BREVO_API_KEY!,
            },
            body: JSON.stringify({
              sender: { name: "CaribbeanVault", email: "contact@geccostrategy.com" },
              to: [{ email: customerEmail }],
              subject: `✅ Confirmation d'investissement — ${actifNom}`,
              htmlContent: `
                <div style="font-family: system-ui; max-width: 600px; margin: 0 auto; padding: 32px;">
                  <h2 style="color: #1A2E4A;">Votre investissement est confirmé 🌴</h2>
                  <p>Merci pour votre investissement dans <strong>${actifNom}</strong>.</p>
                  <div style="background: #F8F6F1; border-radius: 12px; padding: 20px; margin: 20px 0;">
                    <p><strong>Actif :</strong> ${actifNom}</p>
                    <p><strong>Montant :</strong> ${montantEuros}€</p>
                    <p><strong>Tokens acquis :</strong> ${tokensQty}</p>
                    <p><strong>Référence :</strong> ${pi.id}</p>
                  </div>
                  <p>Vos tokens <strong>RHM</strong> ont été émis sur votre wallet XRPL.</p>
                  <p style="color: #9CA3AF; font-size: 12px;">CaribbeanVault — ${new Date().toLocaleDateString("fr-FR")}</p>
                </div>
              `,
            }),
          });
        } catch (emailErr) {
          console.error("Email confirmation error:", emailErr);
        }
      }

      // ── Récupérer l'avance XRP ──
      if (investorId) {
        await supabase
          .from("investisseurs")
          .update({
            xrp_advance_status: "recovered",
            xrp_advance_recovered_at: new Date().toISOString(),
          })
          .eq("id", investorId)
          .eq("xrp_advance_status", "pending");
      }

      break;
    }

    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.log(`❌ Paiement échoué — ${pi.id}`);

      await supabase
        .from("transactions")
        .update({ statut: "failed", failed_at: new Date().toISOString() })
        .eq("stripe_payment_intent_id", pi.id);

      break;
    }

    case "payment_intent.canceled": {
      const pi = event.data.object as Stripe.PaymentIntent;
      await supabase
        .from("transactions")
        .update({ statut: "canceled" })
        .eq("stripe_payment_intent_id", pi.id);
      break;
    }

    default:
      console.log(`Événement Stripe non géré : ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { investorId, actifId, actifNom, montantEuros, tokensQty } = body;

    if (!investorId || !actifId || !montantEuros || montantEuros < 100) {
      return NextResponse.json(
        { error: "Paramètres invalides — montant minimum 100€" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    const { data: investisseur, error: dbError } = await supabase
      .from("investisseurs")
      .select("id, email, prenom, nom")
      .eq("id", investorId)
      .single();

    // ── Debug temporaire ──
    console.log("investorId:", investorId);
    console.log("investisseur:", investisseur);
    console.log("dbError:", dbError);
    console.log("hasServiceKey:", !!process.env.SUPABASE_SERVICE_KEY);
    console.log("serviceKeyPrefix:", process.env.SUPABASE_SERVICE_KEY?.slice(0, 30));

    if (dbError || !investisseur) {
      return NextResponse.json({
        error: "Investisseur introuvable",
        debug: {
          investorId,
          dbError: dbError?.message,
          hasServiceKey: !!process.env.SUPABASE_SERVICE_KEY,
          serviceKeyPrefix: process.env.SUPABASE_SERVICE_KEY?.slice(0, 30),
        }
      }, { status: 404 });
    }

    // ── Créer ou récupérer le Customer Stripe ──
    let stripeCustomerId: string;

    const { data: existingTx } = await supabase
      .from("transactions")
      .select("stripe_customer_id")
      .eq("investor_id", investorId)
      .not("stripe_customer_id", "is", null)
      .limit(1)
      .single();

    if (existingTx?.stripe_customer_id) {
      stripeCustomerId = existingTx.stripe_customer_id as string;
    } else {
      const customer = await stripe.customers.create({
        email: investisseur.email,
        name: `${investisseur.prenom ?? ""} ${investisseur.nom ?? ""}`.trim(),
        metadata: { investorId },
      });
      stripeCustomerId = customer.id;
    }

    // ── Créer le PaymentIntent ──
    const montantCentimes = Math.round(montantEuros * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: montantCentimes,
      currency: "eur",
      customer: stripeCustomerId,
      automatic_payment_methods: { enabled: true },
      metadata: {
        investorId,
        actifId,
        actifNom: actifNom ?? "",
        tokensQty: String(tokensQty ?? 0),
        montantEuros: String(montantEuros),
      },
      description: `CaribbeanVault — ${actifNom ?? actifId} — ${tokensQty ?? ""} tokens`,
    }, {
      idempotencyKey: `pi-${investorId}-${actifId}-${montantCentimes}-${Date.now()}`,
    });

    // ── Créer la transaction en base ──
    await supabase.from("transactions").insert({
      investor_id: investorId,
      actif_id: actifId,
      actif_nom: actifNom ?? "",
      montant_euros: montantEuros,
      tokens_qty: tokensQty ?? 0,
      stripe_payment_intent_id: paymentIntent.id,
      stripe_customer_id: stripeCustomerId,
      statut: "pending",
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import { sendXrpFromAdmin } from "@/lib/xrpl";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const XRP_ADVANCE_AMOUNT = 2;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { investorId, address } = body;

    // ── Validation ──
    if (!investorId || !address) {
      return NextResponse.json({ error: "investorId et address requis" }, { status: 400 });
    }

    if (!/^r[1-9A-HJ-NP-Za-km-z]{24,33}$/.test(address)) {
      return NextResponse.json({ error: "Adresse XRPL invalide" }, { status: 400 });
    }

    // ── Vérifier que l'avance n'a pas déjà été envoyée ──
    const { data: investor } = await supabase
      .from("investisseurs")
      .select("xrp_advance_sent, xrp_advance_status")
      .eq("id", investorId)
      .single();

    if (investor?.xrp_advance_sent === true) {
      return NextResponse.json(
        { error: "Avance XRP déjà envoyée pour cet investisseur" },
        { status: 409 }
      );
    }

    // ── Envoi des XRP ──
    const result = await sendXrpFromAdmin(address, XRP_ADVANCE_AMOUNT);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    // ── Enregistrement en base ──
    await supabase
      .from("investisseurs")
      .update({
        xrp_advance_sent: true,
        xrp_advance_amount: XRP_ADVANCE_AMOUNT,
        xrp_advance_eur: result.eurAmount,
        xrp_advance_tx_hash: result.txHash,
        xrp_advance_status: "pending",
        xrp_advance_sent_at: new Date().toISOString(),
      })
      .eq("id", investorId);

    return NextResponse.json({
      success: true,
      txHash: result.txHash,
      eurAmount: result.eurAmount,
      amountXrp: XRP_ADVANCE_AMOUNT,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
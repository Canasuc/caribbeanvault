import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  try {
    const investorId = req.nextUrl.searchParams.get("investorId");

    if (!investorId) {
      return NextResponse.json({ error: "investorId requis" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    const { data: holdings, error } = await supabase
      .from("holdings")
      .select("*")
      .eq("investor_id", investorId)
      .eq("status", "completed")
      .order("first_purchase_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Calculer les totaux
    const totalInvesti = holdings?.reduce((sum, h) => sum + (h.montant_total_eur ?? h.amount_eur ?? 0), 0) ?? 0;
    const totalTokens = holdings?.reduce((sum, h) => sum + (h.tokens_qty ?? 0), 0) ?? 0;

    return NextResponse.json({
      holdings: holdings ?? [],
      totalInvesti,
      totalTokens,
      nombreActifs: holdings?.length ?? 0,
    });

  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
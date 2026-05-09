import { NextRequest, NextResponse } from "next/server";
import { checkAccountActivated } from "@/lib/xrpl";

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Adresse manquante" }, { status: 400 });
  }

  if (!/^r[1-9A-HJ-NP-Za-km-z]{24,33}$/.test(address)) {
    return NextResponse.json({ error: "Adresse XRPL invalide" }, { status: 400 });
  }

  try {
    const activated = await checkAccountActivated(address);
    return NextResponse.json({ activated });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import { prepareTrustLineTransaction, checkTrustLine, STABLECOIN_ISSUERS } from "@/lib/xrpl";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { address, currency, issuer } = body;

    // ── Validation ──
    if (!address || !currency || !issuer) {
      return NextResponse.json(
        { error: "address, currency et issuer requis" },
        { status: 400 }
      );
    }

    if (!/^r[1-9A-HJ-NP-Za-km-z]{24,33}$/.test(address)) {
      return NextResponse.json({ error: "Adresse XRPL invalide" }, { status: 400 });
    }

    const validCurrencies = Object.keys(STABLECOIN_ISSUERS);
    if (!validCurrencies.includes(currency)) {
      return NextResponse.json(
        { error: `Currency invalide. Valeurs acceptées : ${validCurrencies.join(", ")}` },
        { status: 400 }
      );
    }

    // ── Vérifier si la trust line existe déjà ──
    const alreadyExists = await checkTrustLine(address, currency, issuer);
    if (alreadyExists) {
      return NextResponse.json({ success: true, alreadyExists: true });
    }

    // ── Préparer la transaction (sera signée par Xaman côté client) ──
    const txPayload = await prepareTrustLineTransaction(address, currency, issuer);

    return NextResponse.json({
      success: true,
      alreadyExists: false,
      txPayload,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
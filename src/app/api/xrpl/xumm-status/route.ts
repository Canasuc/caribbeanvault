import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const xummModule = require("xumm");
const XummClass = xummModule.Xumm ?? xummModule.default ?? xummModule;


export async function GET(req: NextRequest) {
  try {
    const uuid = req.nextUrl.searchParams.get("uuid");

    if (!uuid) {
      return NextResponse.json({ error: "uuid requis" }, { status: 400 });
    }

    const xumm = new XummClass(
      process.env.XUMM_API_KEY!,
      process.env.XUMM_API_SECRET!
    );

    const result = await xumm.payload?.get(uuid);

    if (!result) {
      return NextResponse.json({ error: "Payload introuvable" }, { status: 404 });
    }

    const signed = result.meta.signed;
    const expired = result.meta.expired;
    const account = result.response?.account ?? null;

    return NextResponse.json({
      signed,
      expired,
      account, // adresse XRPL de l'investisseur si signé
    });

  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
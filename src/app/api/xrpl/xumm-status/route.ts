import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const uuid = req.nextUrl.searchParams.get("uuid");

    if (!uuid) {
      return NextResponse.json({ error: "uuid requis" }, { status: 400 });
    }

    const response = await fetch(`https://xumm.app/api/v1/platform/payload/${uuid}`, {
      headers: {
        "X-API-Key": process.env.XUMM_API_KEY!,
        "X-API-Secret": process.env.XUMM_API_SECRET!,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: 500 });
    }

    return NextResponse.json({
      signed: data.meta.signed,
      expired: data.meta.expired,
      account: data.response?.account ?? null,
    });

  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
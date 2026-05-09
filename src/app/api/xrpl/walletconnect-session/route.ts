import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { investorId } = body;

    if (!investorId) {
      return NextResponse.json({ error: "investorId requis" }, { status: 400 });
    }

    const apiKey = process.env.XUMM_API_KEY!;
    const apiSecret = process.env.XUMM_API_SECRET!;

    const response = await fetch("https://xumm.app/api/v1/platform/payload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
        "X-API-Secret": apiSecret,
      },
      body: JSON.stringify({
        txjson: { TransactionType: "SignIn" },
        options: {
          submit: false,
          expire: 5,
          return_url: {
            web: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/dashboard`,
          },
        },
        custom_meta: {
          identifier: investorId,
          instruction: "Connectez votre wallet Xaman à CaribbeanVault",
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      qrUrl: data.refs.qr_png,
      uri: data.next.always,
      payloadUuid: data.uuid,
      mobileUrl: `https://xumm.app/sign/${data.uuid}`,
    });

  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
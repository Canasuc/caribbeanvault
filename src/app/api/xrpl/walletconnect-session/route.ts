import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const xummModule = require("xumm");
const XummClass = xummModule.Xumm ?? xummModule.default ?? xummModule;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { investorId } = body;

    if (!investorId) {
      return NextResponse.json({ error: "investorId requis" }, { status: 400 });
    }

    const xumm = new XummClass(
      process.env.XUMM_API_KEY!,
      process.env.XUMM_API_SECRET!
    );

    // ── Créer un payload de sign-in XUMM ──
    const payload = await xumm.payload?.create({
      txjson: {
        TransactionType: "SignIn",
      },
      options: {
        submit: false,
        expire: 5, // expire en 5 minutes
        return_url: {
          web: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/dashboard`,
        },
      },
      custom_meta: {
        identifier: investorId,
        blob: { investorId },
        instruction: "Connectez votre wallet Xaman à CaribbeanVault",
      },
    });

    if (!payload) {
      return NextResponse.json({ error: "Impossible de créer le payload XUMM" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      // URL du QR code à afficher sur desktop
      qrUrl: payload.refs.qr_png,
      // URI pour deep link mobile
      uri: payload.next.always,
      // UUID pour polling du statut
      payloadUuid: payload.uuid,
      // Lien direct Xaman mobile
      mobileUrl: `https://xumm.app/sign/${payload.uuid}`,
    });

  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
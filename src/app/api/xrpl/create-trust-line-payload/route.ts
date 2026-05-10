import { NextRequest, NextResponse } from "next/server";

const CURRENCY_CODES: Record<string, string> = {
  "rhum":        "RHM",
  "immobilier":  "IMM",
  "agriculture": "AGR",
  "art":         "ART",
};

function getCurrencyCode(actifId: string): string {
  for (const [key, code] of Object.entries(CURRENCY_CODES)) {
    if (actifId.toLowerCase().includes(key)) return code;
  }
  return "CVT";
}

// ── Convertir currency code en hex 40 chars sans Buffer ──
function toHexCurrency(code: string): string {
  let hex = "";
  for (let i = 0; i < code.length; i++) {
    hex += code.charCodeAt(i).toString(16).toUpperCase().padStart(2, "0");
  }
  return hex.padEnd(40, "0");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { investorId, actifId, walletAddress } = body;

    if (!investorId || !actifId || !walletAddress) {
      return NextResponse.json(
        { error: "investorId, actifId et walletAddress requis" },
        { status: 400 }
      );
    }

    const currencyCode = getCurrencyCode(actifId);
    const issuerAddress = process.env.XRPL_ADMIN_ADDRESS!;

    // ── Créer un payload XUMM pour le TrustSet ──
    const response = await fetch("https://xumm.app/api/v1/platform/payload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.XUMM_API_KEY!,
        "X-API-Secret": process.env.XUMM_API_SECRET!,
      },
      body: JSON.stringify({
        txjson: {
          TransactionType: "TrustSet",
          Account: walletAddress,
          LimitAmount: {
            currency: currencyCode,
            issuer: issuerAddress,
            value: "1000000",
          },
          Flags: 131072,
        },
        options: {
          submit: true,
          expire: 10,
          return_url: {
            web: `${process.env.NEXT_PUBLIC_SITE_URL}/fr/dashboard`,
          },
        },
        custom_meta: {
          identifier: investorId,
          instruction: `Autorisez la réception des tokens ${currencyCode} de CaribbeanVault`,
          blob: { investorId, actifId, currencyCode },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erreur XUMM", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      qrUrl: data.refs.qr_png,
      payloadUuid: data.uuid,
      mobileUrl: `https://xumm.app/sign/${data.uuid}`,
      currencyCode,
      issuerAddress,
    });

  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
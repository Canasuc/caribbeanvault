import { NextRequest, NextResponse } from "next/server";
import { Client } from "xrpl";

export async function GET(req: NextRequest) {
  try {
    const address = req.nextUrl.searchParams.get("address");
    const currency = req.nextUrl.searchParams.get("currency");
    const issuer = req.nextUrl.searchParams.get("issuer");

    if (!address || !currency || !issuer) {
      return NextResponse.json(
        { error: "address, currency et issuer requis" },
        { status: 400 }
      );
    }

    const client = new Client(
      process.env.XRPL_NETWORK ?? "wss://s.altnet.rippletest.net:51233"
    );
    await client.connect();

    try {
      const response = await client.request({
        command: "account_lines",
        account: address,
        peer: issuer,
      });

      const trustLineExists = response.result.lines.some(
        (line: { currency: string; account: string }) =>
          line.currency === currency && line.account === issuer
      );

      return NextResponse.json({
        exists: trustLineExists,
        address,
        currency,
        issuer,
      });

    } finally {
      await client.disconnect();
    }

  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
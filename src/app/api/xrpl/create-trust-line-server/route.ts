import { NextRequest, NextResponse } from "next/server";
import { Client, Wallet, TrustSet } from "xrpl";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { walletAddress, currencyCode } = body;

    const client = new Client(process.env.XRPL_NETWORK ?? "wss://s.altnet.rippletest.net:51233");
    await client.connect();

    try {
      const issuerWallet = Wallet.fromSeed(process.env.XRPL_ADMIN_SEED!);

      // En testnet uniquement — trust line côté investisseur
      // signée par le wallet admin (simulation)
      // En production : l'investisseur signe via Xaman
      const trustSetTx: TrustSet = {
        TransactionType: "TrustSet",
        Account: walletAddress,
        LimitAmount: {
          currency: currencyCode,
          issuer: issuerWallet.address,
          value: "1000000",
        },
      };

      const result = await client.submitAndWait(trustSetTx, {
        wallet: issuerWallet,
      });

      const success = result.result.meta &&
        typeof result.result.meta === "object" &&
        "TransactionResult" in result.result.meta &&
        result.result.meta.TransactionResult === "tesSUCCESS";

      return NextResponse.json({ success, hash: result.result.hash });

    } finally {
      await client.disconnect();
    }

  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
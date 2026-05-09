import { Client, Wallet, xrpToDrops, dropsToXrp } from "xrpl";

// ─── Config ───────────────────────────────────────────────────────────────────

const XRPL_NETWORK = process.env.XRPL_NETWORK ?? "wss://s.altnet.rippletest.net:51233";
const XRPL_ADMIN_SEED = process.env.XRPL_ADMIN_SEED!;

// Émetteurs officiels stablecoins
export const STABLECOIN_ISSUERS = {
  GEUR: "rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq",
  RLUSD: "rMxCKbEDwqr76QuheSUMdEGf4B9xJ8m5De",
} as const;

// ─── Client XRPL ─────────────────────────────────────────────────────────────

async function getClient(): Promise<Client> {
  const client = new Client(XRPL_NETWORK);
  await client.connect();
  return client;
}

// ─── Vérifier si un compte XRPL est activé ───────────────────────────────────

export async function checkAccountActivated(address: string): Promise<boolean> {
  const client = await getClient();
  try {
    await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });
    return true;
  } catch (e: unknown) {
    if (
      typeof e === "object" &&
      e !== null &&
      "data" in e &&
      typeof (e as { data: unknown }).data === "object" &&
      (e as { data: { error: string } }).data?.error === "actNotFound"
    ) {
      return false;
    }
    return false;
  } finally {
    await client.disconnect();
  }
}

// ─── Récupérer le solde XRP d'un compte ──────────────────────────────────────

export async function getXrpBalance(address: string): Promise<number> {
  const client = await getClient();
  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });
    return Number(dropsToXrp(response.result.account_data.Balance));
  } catch {
    return 0;
  } finally {
    await client.disconnect();
  }
}

// ─── Récupérer le cours XRP/EUR approximatif ─────────────────────────────────

export async function getXrpEurRate(): Promise<number> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=eur",
      { next: { revalidate: 300 } }
    );
    const data = await res.json();
    return data?.ripple?.eur ?? 0.55;
  } catch {
    return 0.55;
  }
}

// ─── Envoyer des XRP depuis le wallet admin CV ────────────────────────────────

export interface SendXrpResult {
  success: boolean;
  txHash: string | null;
  eurAmount: number;
  error?: string;
}

export async function sendXrpFromAdmin(
  destinationAddress: string,
  amountXrp: number
): Promise<SendXrpResult> {
  if (!XRPL_ADMIN_SEED) {
    return { success: false, txHash: null, eurAmount: 0, error: "XRPL_ADMIN_SEED non configuré" };
  }

  const client = await getClient();
  try {
    const adminWallet = Wallet.fromSeed(XRPL_ADMIN_SEED);

    const alreadyActivated = await checkAccountActivated(destinationAddress);
    if (alreadyActivated) {
      return { success: false, txHash: null, eurAmount: 0, error: "Compte déjà activé" };
    }

    const eurRate = await getXrpEurRate();
    const eurAmount = Math.round(amountXrp * eurRate * 100) / 100;

    const prepared = await client.autofill({
      TransactionType: "Payment",
      Account: adminWallet.address,
      Destination: destinationAddress,
      Amount: xrpToDrops(amountXrp),
    });

    const signed = adminWallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    const success =
      typeof result.result.meta === "object" &&
      result.result.meta !== null &&
      "TransactionResult" in result.result.meta &&
      result.result.meta.TransactionResult === "tesSUCCESS";

    return {
      success,
      txHash: signed.hash,
      eurAmount,
      error: success ? undefined : "Transaction échouée",
    };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return { success: false, txHash: null, eurAmount: 0, error: msg };
  } finally {
    await client.disconnect();
  }
}

// ─── Préparer une trust line (signée par l'investisseur via Xaman) ────────────

export async function prepareTrustLineTransaction(
  accountAddress: string,
  currency: string,
  issuer: string,
  limitAmount: string = "1000000"
): Promise<Record<string, unknown>> {
  const client = await getClient();
  try {
    const prepared = await client.autofill({
      TransactionType: "TrustSet",
      Account: accountAddress,
      LimitAmount: {
        currency,
        issuer,
        value: limitAmount,
      },
    });
    return prepared as Record<string, unknown>;
  } finally {
    await client.disconnect();
  }
}

// ─── Vérifier qu'une trust line existe ───────────────────────────────────────

export async function checkTrustLine(
  address: string,
  currency: string,
  issuer: string
): Promise<boolean> {
  const client = await getClient();
  try {
    const response = await client.request({
      command: "account_lines",
      account: address,
      peer: issuer,
    });
    return response.result.lines.some(
      (line) => line.currency === currency && line.account === issuer
    );
  } catch {
    return false;
  } finally {
    await client.disconnect();
  }
}
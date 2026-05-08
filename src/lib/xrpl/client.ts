/**
 * CARIBBEANVAULT — src/lib/xrpl/client.ts
 * Connexion XRPL singleton — réutilisée dans toutes les fonctions
 */

import * as xrpl from "xrpl";

let client: xrpl.Client | null = null;

export async function getClient(): Promise<xrpl.Client> {
  if (client && client.isConnected()) {
    return client;
  }
  const node = process.env.XRPL_NODE || "wss://s.altnet.rippletest.net:51233";
  client = new xrpl.Client(node);
  await client.connect();
  return client;
}

export async function disconnectClient(): Promise<void> {
  if (client && client.isConnected()) {
    await client.disconnect();
    client = null;
  }
}
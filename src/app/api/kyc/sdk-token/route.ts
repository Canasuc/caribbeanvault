import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const SUMSUB_BASE_URL = "https://api.sumsub.com";

// ── Générer la signature HMAC pour Sumsub ──────────────────────────────────────
function generateSignature(
  method: string,
  url: string,
  body: string,
  timestamp: number
): string {
  const data = timestamp + method.toUpperCase() + url + body;
  return crypto
    .createHmac("sha256", process.env.SUMSUB_SECRET_KEY!)
    .update(data)
    .digest("hex");
}

// ── Appel API Sumsub signé ─────────────────────────────────────────────────────
async function sumsubRequest(
  method: string,
  path: string,
  body?: object
): Promise<Response> {
  const timestamp = Math.floor(Date.now() / 1000);
  const bodyStr = body ? JSON.stringify(body) : "";
  const signature = generateSignature(method, path, bodyStr, timestamp);

  return fetch(`${SUMSUB_BASE_URL}${path}`, {
    method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-App-Token": process.env.SUMSUB_APP_TOKEN!,
      "X-App-Access-Sig": signature,
      "X-App-Access-Ts": String(timestamp),
    },
    body: body ? bodyStr : undefined,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { investorId } = await req.json();

    if (!investorId) {
      return NextResponse.json({ error: "investorId requis" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    // ── Récupérer l'investisseur ──
const { data: investisseur, error: dbError } = await supabase
  .from("investisseurs")
  .select("id, email, prenom, nom, statut_kyc")
  .eq("id", investorId)
  .single();

console.log("DEBUG investorId:", investorId);
console.log("DEBUG investisseur:", investisseur);
console.log("DEBUG dbError:", dbError?.message);
console.log("DEBUG hasServiceKey:", !!process.env.SUPABASE_SERVICE_KEY);

if (!investisseur) {
  return NextResponse.json({ 
    error: "Investisseur introuvable",
    debug: { investorId, dbError: dbError?.message, hasServiceKey: !!process.env.SUPABASE_SERVICE_KEY }
  }, { status: 404 });
}
    

    const externalUserId = `cv-${investorId}`;
    const levelName = "basic-kyc-level"; // Niveau KYC configuré dans Sumsub

    // ── Créer ou récupérer l'applicant Sumsub ──
    let applicantId: string;

    // Vérifier si l'applicant existe déjà
    const checkRes = await sumsubRequest(
      "GET",
      `/resources/applicants/-;externalUserId=${externalUserId}/one`
    );

    if (checkRes.ok) {
      const existingApplicant = await checkRes.json();
      applicantId = existingApplicant.id;
    } else {
      // Créer un nouvel applicant
      const createRes = await sumsubRequest(
        "POST",
        "/resources/applicants?levelName=" + encodeURIComponent(levelName),
        {
          externalUserId,
          email: investisseur.email,
          info: {
            firstName: investisseur.prenom ?? "",
            lastName: investisseur.nom ?? "",
          },
        }
      );

      if (!createRes.ok) {
        const err = await createRes.json();
        return NextResponse.json({ error: "Erreur création applicant", details: err }, { status: 500 });
      }

      const newApplicant = await createRes.json();
      applicantId = newApplicant.id;
    }

    // ── Générer le SDK token ──
    const tokenRes = await sumsubRequest(
      "POST",
      `/resources/accessTokens?userId=${encodeURIComponent(externalUserId)}&levelName=${encodeURIComponent(levelName)}&ttlInSecs=3600`
    );

    if (!tokenRes.ok) {
      const err = await tokenRes.json();
      return NextResponse.json({ error: "Erreur génération token", details: err }, { status: 500 });
    }

    const tokenData = await tokenRes.json();

    // ── Mettre à jour le statut KYC dans Supabase ──
    await supabase
      .from("investisseurs")
      .update({ statut_kyc: "pending" })
      .eq("id", investorId);

    return NextResponse.json({
      token: tokenData.token,
      applicantId,
      externalUserId,
    });

  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

// ── Vérifier la signature du webhook Sumsub ──
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secretKey: string
): boolean {
  const expectedSig = crypto
    .createHmac("sha256", secretKey)
    .update(payload)
    .digest("hex");
  console.log("Expected:", expectedSig);
  console.log("Received:", signature);
  return expectedSig === signature;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-payload-digest") ?? "";

    // TODO Production : réactiver la vérification de signature
    // if (!verifyWebhookSignature(body, signature, process.env.SUMSUB_WEBHOOK_SECRET!)) {
    //   return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
    // }
    console.log("Signature reçue:", signature);
    verifyWebhookSignature(body, signature, process.env.SUMSUB_WEBHOOK_SECRET ?? "");

    const event = JSON.parse(body);
    console.log("Sumsub webhook event:", event.type, event.externalUserId);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    // Extraire l'investorId depuis externalUserId (format: "cv-{investorId}")
    const externalUserId = event.externalUserId ?? "";
    const investorId = externalUserId.startsWith("cv-")
      ? externalUserId.slice(3)
      : null;

    if (!investorId) {
      return NextResponse.json({ received: true });
    }

    switch (event.type) {

      case "applicantReviewed": {
        const reviewResult = event.reviewResult?.reviewAnswer;
        const newStatus = reviewResult === "GREEN" ? "approved" : "rejected";

        await supabase
          .from("investisseurs")
          .update({
            statut_kyc: newStatus,
            statut: newStatus === "approved" ? "valide" : "en_attente",
          })
          .eq("id", investorId);

        console.log(`KYC ${newStatus} pour investisseur ${investorId}`);

        if (newStatus === "approved") {
          const { data: inv } = await supabase
            .from("investisseurs")
            .select("email, prenom")
            .eq("id", investorId)
            .single();

          if (inv?.email) {
            await fetch("https://api.brevo.com/v3/smtp/email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY!,
              },
              body: JSON.stringify({
                sender: { name: "CaribbeanVault", email: "contact@geccostrategy.com" },
                to: [{ email: inv.email }],
                subject: "✅ Votre identité a été vérifiée — CaribbeanVault",
                htmlContent: `
                  <div style="font-family: system-ui; max-width: 600px; margin: 0 auto; padding: 32px;">
                    <h2 style="color: #1A2E4A;">Vérification d'identité confirmée 🌴</h2>
                    <p>Bonjour ${inv.prenom ?? ""},</p>
                    <p>Votre identité a été vérifiée avec succès. Vous pouvez maintenant investir dans tous les actifs CaribbeanVault.</p>
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/fr/dashboard" style="display:inline-block; background:#D4884A; color:white; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:700; margin-top:16px;">
                      Accéder à mon espace →
                    </a>
                    <p style="color:#9CA3AF; font-size:12px; margin-top:24px;">CaribbeanVault — ${new Date().toLocaleDateString("fr-FR")}</p>
                  </div>
                `,
              }),
            });
          }
        }
        break;
      }

      case "applicantPending": {
        await supabase
          .from("investisseurs")
          .update({ statut_kyc: "pending" })
          .eq("id", investorId);
        break;
      }

      case "applicantOnHold": {
        await supabase
          .from("investisseurs")
          .update({ statut_kyc: "on_hold" })
          .eq("id", investorId);
        break;
      }

      default:
        console.log(`Événement Sumsub non géré : ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    console.error("Sumsub webhook error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
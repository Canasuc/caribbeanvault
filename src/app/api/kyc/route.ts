import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }
  if (limit.count >= 5) return false;
  limit.count++;
  return true;
}

function hashIP(ip: string): string {
  return createHash("sha256").update(ip + "caribbeanvault_salt").digest("hex").slice(0, 16);
}

function validateEmail(email: string): boolean {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
}

function sanitize(str: string, maxLen: number): string {
  return str.trim().slice(0, maxLen).replace(/[<>]/g, "");
}

// ── EMAIL CONFIRMATION UTILISATEUR ────────────────────────────────────────────
function buildUserEmail(prenom: string, actif: string, montant: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F5F2EC;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F2EC;padding:40px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#1A2E4A;border-radius:8px;overflow:hidden;max-width:580px;">
        <!-- Header -->
        <tr><td style="background:#1A2E4A;padding:32px 40px 24px;text-align:center;border-bottom:1px solid #253D5E;">
          <div style="color:#D4884A;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;font-family:system-ui;margin-bottom:8px;">CaribbeanVault</div>
          <div style="color:white;font-size:22px;font-weight:300;font-family:Georgia,serif;">Bienvenue dans la famille</div>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:32px 40px;background:#1A2E4A;">
          <p style="color:#B8C4D4;font-size:15px;line-height:1.8;margin:0 0 20px;font-family:system-ui;">
            Bonjour <strong style="color:white;">${prenom}</strong>,
          </p>
          <p style="color:#B8C4D4;font-size:14px;line-height:1.8;margin:0 0 24px;font-family:system-ui;">
            Votre demande d'accès à CaribbeanVault a bien été enregistrée. Notre équipe va examiner votre dossier et vous recontacter sous 48h.
          </p>
          <!-- Récap -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#253D5E;border-radius:6px;margin-bottom:24px;">
            <tr><td style="padding:20px 24px;">
              <div style="color:#D4884A;font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;font-family:system-ui;margin-bottom:14px;">Votre profil d'investisseur</div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color:#6B8AAA;font-size:12px;font-family:system-ui;padding:6px 0;border-bottom:0.5px solid #1A2E4A;">Actif d'intérêt</td>
                  <td style="color:white;font-size:12px;font-weight:600;font-family:system-ui;padding:6px 0;border-bottom:0.5px solid #1A2E4A;text-align:right;">${actif}</td>
                </tr>
                <tr>
                  <td style="color:#6B8AAA;font-size:12px;font-family:system-ui;padding:6px 0;">Montant envisagé</td>
                  <td style="color:white;font-size:12px;font-weight:600;font-family:system-ui;padding:6px 0;text-align:right;">${montant}</td>
                </tr>
              </table>
            </td></tr>
          </table>
          <p style="color:#B8C4D4;font-size:13px;line-height:1.8;margin:0 0 24px;font-family:system-ui;">
            En attendant, vous pouvez explorer nos actifs disponibles et simuler vos rendements sur notre plateforme.
          </p>
          <div style="text-align:center;margin-bottom:24px;">
            <a href="https://caribbeanvault.geccostrategy.com" style="display:inline-block;background:#D4884A;color:white;padding:12px 28px;border-radius:3px;font-size:13px;font-weight:700;text-decoration:none;font-family:system-ui;">
              Accéder à la plateforme →
            </a>
          </div>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#0F1E30;padding:20px 40px;text-align:center;border-top:1px solid #253D5E;">
          <p style="color:#6B8AAA;font-size:11px;font-family:system-ui;margin:0 0 6px;">CaribbeanVault · La Caraïbe, tokenisée.</p>
          <p style="color:#6B8AAA;font-size:10px;font-family:system-ui;margin:0;">
            Cet email a été envoyé suite à votre inscription sur caribbeanvault.geccostrategy.com
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── EMAIL NOTIFICATION ÉQUIPE ─────────────────────────────────────────────────
function buildTeamEmail(data: Record<string, string>): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F5F2EC;font-family:system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F2EC;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:white;border-radius:8px;overflow:hidden;border:1px solid #E8E2D6;max-width:560px;">
        <tr><td style="background:#D4884A;padding:20px 32px;">
          <div style="color:white;font-size:14px;font-weight:700;">🔔 Nouveau candidat CaribbeanVault</div>
          <div style="color:rgba(255,255,255,.8);font-size:11px;margin-top:4px;">Reçu le ${new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
        </td></tr>
        <tr><td style="padding:24px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${[
              ["Prénom", data.prenom],
              ["Nom", data.nom],
              ["Email", data.email],
              ["Téléphone", data.telephone || "—"],
              ["Pays", data.pays],
              ["Actif d'intérêt", data.actif_interet],
              ["Montant envisagé", data.montant_envisage],
              ["Statut investisseur", data.statut_investisseur],
            ].map(([label, val]) => `
            <tr>
              <td style="color:#6B7280;font-size:12px;padding:8px 0;border-bottom:0.5px solid #F0EBE1;width:40%;">${label}</td>
              <td style="color:#1A2E4A;font-size:12px;font-weight:600;padding:8px 0;border-bottom:0.5px solid #F0EBE1;">${val}</td>
            </tr>`).join("")}
            ${data.message ? `
            <tr>
              <td colspan="2" style="padding-top:16px;">
                <div style="color:#6B7280;font-size:12px;margin-bottom:6px;">Message :</div>
                <div style="background:#F5F2EC;border-radius:4px;padding:12px;color:#1A2E4A;font-size:13px;line-height:1.6;">${data.message}</div>
              </td>
            </tr>` : ""}
          </table>
          <div style="margin-top:20px;text-align:center;">
            <a href="https://supabase.com/dashboard/project/zkhiifvnvhcopdbapvav/editor" style="display:inline-block;background:#1A2E4A;color:white;padding:10px 22px;border-radius:4px;font-size:12px;font-weight:600;text-decoration:none;">
              Voir dans Supabase →
            </a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── ENVOI BREVO ───────────────────────────────────────────────────────────────
async function sendBrevoEmail({
  to, toName, subject, html,
}: {
  to: string; toName: string; subject: string; html: string;
}) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      sender: { name: "CaribbeanVault", email: "noreply@geccostrategy.com" },
      to: [{ email: to, name: toName }],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Brevo error:", err);
    throw new Error(`Brevo: ${res.status}`);
  }

  return res.json();
}

// ── ROUTE POST ────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    { auth: { persistSession: false } }
  );

  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const ipHash = hashIP(ip);

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez dans 1 heure." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { prenom, nom, email, telephone, pays, actif_interet, montant_envisage, statut_investisseur, message, consentement } = body;

    if (!prenom || !nom || !email || !pays || !actif_interet || !montant_envisage || !statut_investisseur) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    if (!consentement) {
      return NextResponse.json(
        { error: "Le consentement RGPD est obligatoire." },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    const data = {
      prenom: sanitize(prenom, 100),
      nom: sanitize(nom, 100),
      email: sanitize(email, 255),
      telephone: telephone ? sanitize(telephone, 20) : null,
      pays: sanitize(pays, 100),
      actif_interet: sanitize(actif_interet, 100),
      montant_envisage: sanitize(montant_envisage, 50),
      statut_investisseur: sanitize(statut_investisseur, 100),
      message: message ? sanitize(message, 1000) : null,
      ip_hash: ipHash,
      statut: "en_attente",
    };

    const { data: existing } = await supabase
      .from("investisseurs")
      .select("id")
      .eq("email", data.email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Cette adresse email est déjà enregistrée." },
        { status: 409 }
      );
    }

    const { error } = await supabase
      .from("investisseurs")
      .insert([data]);

    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement. Réessayez." },
        { status: 500 }
      );
    }

    // ── Envoi emails Brevo en parallèle ───────────────────────────────────────
    const emailResults = await Promise.allSettled([
      // Email confirmation utilisateur
      sendBrevoEmail({
        to: data.email,
        toName: `${data.prenom} ${data.nom}`,
        subject: "Bienvenue dans la famille CaribbeanVault 🌴",
        html: buildUserEmail(data.prenom, data.actif_interet, data.montant_envisage),
      }),
      // Email notification équipe
      sendBrevoEmail({
        to: process.env.TEAM_EMAIL || "contact@geccostrategy.com",
        toName: "Équipe CaribbeanVault",
        subject: `🔔 Nouveau candidat : ${data.prenom} ${data.nom} — ${data.actif_interet}`,
        html: buildTeamEmail({
          prenom: data.prenom,
          nom: data.nom,
          email: data.email,
          telephone: data.telephone || "",
          pays: data.pays,
          actif_interet: data.actif_interet,
          montant_envisage: data.montant_envisage,
          statut_investisseur: data.statut_investisseur,
          message: data.message || "",
        }),
      }),
    ]);

    emailResults.forEach((result, i) => {
      if (result.status === "rejected") {
        console.error(`Email ${i === 0 ? "utilisateur" : "équipe"} failed:`, result.reason);
      }
    });

    // ── Magic link Supabase ───────────────────────────────────────────────────
const { error: authError } = await supabase.auth.signInWithOtp({
  email: data.email,
  options: {
    emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://caribbeanvault.geccostrategy.com"}/auth/callback`,
  },
});

    if (authError) {
      console.error("Auth error:", authError.message);
    }

    return NextResponse.json(
      { success: true, message: "Votre demande a bien été enregistrée. Un lien de connexion vous a été envoyé par email." },
      { status: 201 }
    );

  } catch (err) {
    console.error("KYC error:", err);
    return NextResponse.json(
      { error: "Erreur serveur. Réessayez." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Méthode non autorisée." }, { status: 405 });
}
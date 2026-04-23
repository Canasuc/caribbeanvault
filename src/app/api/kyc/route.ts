import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Client Supabase avec service role (côté serveur uniquement)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  {
    auth: { persistSession: false },
  }
);

// Rate limiting simple en mémoire
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 }); // 1h
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

// Pas de cache sur cette route
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    // Récupérer l'IP (hashée, jamais stockée en clair)
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const ipHash = hashIP(ip);

    // Rate limiting — max 5 soumissions par IP par heure
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez dans 1 heure." },
        { status: 429 }
      );
    }

    // Parser le body
    const body = await request.json();
    const {
      prenom,
      nom,
      email,
      telephone,
      pays,
      actif_interet,
      montant_envisage,
      statut_investisseur,
      message,
      consentement,
    } = body;

    // Validation des champs obligatoires
    if (!prenom || !nom || !email || !pays || !actif_interet || !montant_envisage || !statut_investisseur) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    // Validation consentement RGPD
    if (!consentement) {
      return NextResponse.json(
        { error: "Le consentement RGPD est obligatoire." },
        { status: 400 }
      );
    }

    // Validation email
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    // Sanitisation de tous les champs
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

    // Vérifier si email déjà enregistré
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

// Insérer dans Supabase
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

// Envoyer le magic link automatiquement
const { error: authError } = await supabase.auth.signInWithOtp({
  email: data.email,
  options: {
    emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://caribbeanvault.geccostrategy.com"}/dashboard`,
  },
});

if (authError) {
  console.error("Auth error:", authError.message);
}

return NextResponse.json(
  { 
    success: true, 
    message: "Votre demande a bien été enregistrée. Un lien de connexion vous a été envoyé par email." 
  },
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

// Bloquer toutes les autres méthodes HTTP
export async function GET() {
  return NextResponse.json({ error: "Méthode non autorisée." }, { status: 405 });
}
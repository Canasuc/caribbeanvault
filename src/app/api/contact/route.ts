
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";
export const dynamic = "force-dynamic"
export const revalidate = 0;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  { auth: { persistSession: false } }
);

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }
  if (limit.count >= 3) return false;
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

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: NextRequest) {
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
    const { prenom, nom, email, sujet, message, consentement } = body;

    if (!prenom || !nom || !email || !sujet || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires." },
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
      sujet: sanitize(sujet, 200),
      message: sanitize(message, 2000),
      ip_hash: ipHash,
      statut: "non_lu",
    };

    const { error } = await supabase
      .from("contacts")
      .insert([data]);

    if (error) {
      console.error("Supabase contact error:", error.message);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi. Réessayez." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Votre message a bien été envoyé. Nous vous répondrons sous 48h." },
      { status: 201 }
    );

  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json(
      { error: "Erreur serveur. Réessayez." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Méthode non autorisée." }, { status: 405 });
}
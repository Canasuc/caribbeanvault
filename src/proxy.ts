import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Pages publiques — accessibles sans connexion
const PUBLIC_ROUTES = [
  "/",
  "/rhum",
  "/immobilier",
  "/agriculture",
  "/art",
  "/simulateur",
  "/kyc",
  "/login",
  "/contact",
  "/mentions-legales",
  "/cgu",
  "/confidentialite",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Toujours autoriser les assets et API
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/images/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Vérifier si la route est publique
  const isPublic = PUBLIC_ROUTES.some(route => pathname === route);
  if (isPublic) return NextResponse.next();

  // Vérifier le cookie de session Supabase
  const token = request.cookies.get("sb-zkhiifvnvhcopdbapvav-auth-token");

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
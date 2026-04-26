import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const locales = ["fr", "en", "es"];
const defaultLocale = "fr";

const PUBLIC_ROUTES = [
  "/",
  "/rhum",
  "/immobilier",
  "/agriculture",
  "/art",
  "/simulateur",
  "/kyc",
  "/login",
  "/admin",
  "/admin/login",
  "/contact",
  "/mentions-legales",
  "/cgu",
  "/confidentialite",
  "/auth/callback",
];

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const intlResponse = intlMiddleware(request);

  const pathnameWithoutLocale = pathname.replace(/^\/(fr|en|es)/, "") || "/";
  const isPublic = PUBLIC_ROUTES.some(r => r === pathnameWithoutLocale);

  if (!isPublic) {
    const token = request.cookies.get("sb-access-token")?.value ||
                  request.cookies.get("sb-zkhiifvnvhcopdbapvav-auth-token")?.value;
    if (!token) {
      const locale = pathname.match(/^\/(fr|en|es)/)?.[1] || defaultLocale;
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
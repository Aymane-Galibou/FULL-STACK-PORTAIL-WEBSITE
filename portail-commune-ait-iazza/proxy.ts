import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const environment = process.env.ENVIRONMENT;

  // 1. Bypass maintenance mode in local environment
  if (environment === "local") {
    return NextResponse.next();
  }

  // 2. Allow requests targeting the maintenance page itself
  if (pathname === "/maintenance") {
    return NextResponse.next();
  }

  // 3. Create redirect response to /maintenance
  const response = NextResponse.redirect(new URL("/maintenance", request.url));

  // 4. Set default user language cookie if missing
  if (!request.cookies.has("user_lang")) {
    const userLang = "FR";
    response.cookies.set("user_lang", userLang, {
      path: "/",
      maxAge: 31536000, // 1 year
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Exclude matching for:
     * - API routes (/api/*)
     * - Next.js internal static assets (_next/static, _next/image)
     * - Common static file extensions (svg, png, jpg, jpeg, gif, webp, ico, woff2, css, js)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|css|js)$).*)",
  ],
};
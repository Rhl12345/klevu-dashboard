import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/login",
  "/two-factor-authentication",
  "/forgot-password",
  "/reset-password",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("auth_token")?.value;

  if (pathname === "/") {
    const redirectUrl = token ? "/dashboard" : "/login";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  if (publicRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!publicRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - images (static files)
     * - favicon.ico (favicon file)
     * - public routes
     */
    "/((?!api|_next/static|images|favicon.ico|two-factor-authentication).*)",
  ],
};

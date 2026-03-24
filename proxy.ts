import { NextResponse } from "next/server";
import { auth } from "@/auth";

const AUTH_PAGES = new Set(["/auth/signin", "/auth/signup"]);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = Boolean(req.auth);
  const isAuthPage = AUTH_PAGES.has(nextUrl.pathname);

  if (!isLoggedIn && !isAuthPage) {
    const signInUrl = new URL("/auth/signin", nextUrl.origin);
    signInUrl.searchParams.set(
      "callbackUrl",
      `${nextUrl.pathname}${nextUrl.search}`,
    );
    return NextResponse.redirect(signInUrl);
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/profile", nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip all /api/* (Auth.js lives under /api/auth/*). If proxy runs on those routes,
    // session fetch gets an HTML redirect instead of JSON → ClientFetchError.
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};

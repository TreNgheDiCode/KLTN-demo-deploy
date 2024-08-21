import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  apiEdgestorePrefix,
  authRoutes,
} from "@/routes";
import { NextResponse } from "next/server";
import { analytics } from "./lib/analytics";
import { auth } from "./auth";

export default auth((req) => {
  // Analytics
  if (!req.nextUrl.pathname.startsWith("/api")) {
    console.log("Tracking pageview", req.nextUrl.pathname);
    analytics.track("pageview", {
      page: req.nextUrl.pathname,
      country: req.geo?.country,
    });
  }

  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiEdgestoreRoute = nextUrl.pathname.startsWith(apiEdgestorePrefix);
  const isAuthRoute = authRoutes.includes(
    nextUrl.pathname.replace(/^\/[a-zA-Z]{2}/, ""),
  );

  if (isApiAuthRoute || isApiEdgestoreRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(`${DEFAULT_LOGIN_REDIRECT}`, nextUrl));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

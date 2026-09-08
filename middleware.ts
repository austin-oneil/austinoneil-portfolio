import { NextResponse } from "next/server";

/**
 * Keeps the development-only design system reference off the public site.
 *
 * Doing this inside the page with notFound() did not work. The route rendered,
 * the root loading boundary began streaming, HTTP 200 and the loading skeleton
 * went out before notFound() was ever reached, and production served a page
 * stuck on "Loading" forever under a 200. That is a soft 404, which is a
 * genuinely bad thing to ship on a site whose whole argument is that the author
 * knows how crawlers read a page.
 *
 * Middleware runs before rendering, so the status is decided while the response
 * is still ours to write. The matcher is a single path, so nothing else on the
 * site pays for this.
 */
export function middleware() {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/design-system",
};

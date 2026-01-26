import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    // TEMP LOG: Remove after testing
    console.log(`[Middleware] Path: ${req.nextUrl.pathname}, Token: ${!!req.nextauth.token}, Role: ${req.nextauth.token?.role || 'none'}`);

    // Custom redirect for non-admins (only if protected route)
    const pathname = req.nextUrl.pathname;
    if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !req.nextauth.token?.role === "ADMIN") {
      console.log(`[Middleware] Redirecting to login from ${pathname}`);
      return Response.redirect(new URL("/admin/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        // TEMP LOG: Remove after testing
        console.log(`[Authorized Check] Path: ${pathname}, Authorized: ${!!token && token.role === "ADMIN"}`);

        // Protect /admin/* but EXCLUDE login explicitly (even with queries/fragments)
        if (pathname.startsWith("/admin") && !pathname.match(/^\/admin\/login($|\?)/)) {
          return !!token && token.role === "ADMIN";
        }
        // All else (incl. /admin/login?anything) is public
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
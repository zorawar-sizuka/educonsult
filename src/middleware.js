import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    // TEMP LOG: Remove after testing
    console.log(`[Middleware] Path: ${req.nextUrl.pathname}, Token: ${!!req.nextauth.token}, Role: ${req.nextauth.token?.role || 'none'}`);

    // Custom redirect for non-admins (only if protected route)
    const pathname = req.nextUrl.pathname;
    if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !(req.nextauth.token?.role === "ADMIN")) {
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











// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   // You don't need the manual redirect logic here. 
//   // withAuth handles redirects automatically if 'authorized' returns false.
//   function middleware(req) {
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         const { pathname } = req.nextUrl;

//         // 1. Allow access to the login page unconditionally
//         // If we don't do this, the middleware loops (Redirect -> Login -> Redirect)
//         if (pathname.startsWith("/admin/login")) {
//           return true;
//         }

//         // 2. Protect all other Admin routes
//         // Return true if user is Admin, false otherwise
//         return token?.role === "ADMIN";
//       },
//     },
//   }
// );

// export const config = {
//   // Apply this middleware to everything starting with /admin
//   matcher: ["/admin/:path*"],
// };
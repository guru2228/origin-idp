import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isApiRoute = request.nextUrl.pathname.startsWith("/api");
  const isLandingPage = request.nextUrl.pathname === "/";

  // Allow public routes
  if (isLandingPage || isApiRoute) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login page
  if (!isAuthenticated && !isAuthPage) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthPage) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Role-based access control
  if (isAuthenticated && request.nextUrl.pathname.startsWith("/dashboard")) {
    const role = token.role as string;
    
    // Admin section routes
    const isAdminRoute = 
      request.nextUrl.pathname.startsWith("/dashboard/workspaces") ||
      request.nextUrl.pathname.startsWith("/dashboard/users") ||
      request.nextUrl.pathname.startsWith("/dashboard/settings") ||
      request.nextUrl.pathname.startsWith("/dashboard/subscriptions");
    
    // Only platform admins and tenant admins can access admin routes
    if (isAdminRoute && role !== "platform_admin" && role !== "tenant_admin") {
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
    
    // Only platform admins can access subscription management
    if (
      request.nextUrl.pathname.startsWith("/dashboard/subscriptions") && 
      role !== "platform_admin"
    ) {
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export function ProtectedRoute({ 
  children, 
  requiredRoles = [] 
}: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAuthenticated = status === "authenticated";
  const userRole = session?.user?.role as string;
  
  useEffect(() => {
    // Check if user is not authenticated
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }
    
    // Check if user has required role (if specified)
    if (isAuthenticated && 
        requiredRoles.length > 0 && 
        !requiredRoles.includes(userRole)) {
      router.push("/dashboard");
    }
  }, [status, router, isAuthenticated, userRole, requiredRoles]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  // If authenticated and has required role (or no specific role required), render children
  if (isAuthenticated && (requiredRoles.length === 0 || requiredRoles.includes(userRole))) {
    return <>{children}</>;
  }

  // Default fallback - should not reach here due to the useEffect redirect
  return null;
}

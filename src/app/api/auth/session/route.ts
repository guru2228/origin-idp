import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });
  
  if (!token) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }
  
  // Get tenant information based on user
  // In a real implementation, this would query the database
  const tenantInfo = {
    id: "tenant-1",
    name: "Demo Organization",
    subscription: {
      plan: "Enterprise",
      status: "active",
      features: ["AI Studio", "Spectrum", "Knowledge Base", "Metrics"]
    }
  };
  
  return NextResponse.json({
    user: {
      id: token.sub,
      name: token.name,
      email: token.email,
      role: token.role,
      isPlatformAdmin: token.isPlatformAdmin
    },
    tenant: tenantInfo
  });
}

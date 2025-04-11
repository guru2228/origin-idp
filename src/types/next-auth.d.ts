import "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
      id?: string;
      isPlatformAdmin?: boolean;
    };
  }

  interface User {
    role?: string;
    isPlatformAdmin?: boolean;
  }
}

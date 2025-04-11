import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { users } from "../../../drizzle/schema";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        // This is a mock implementation for demo purposes
        // In a real app, you would verify credentials against the database
        if (!credentials?.email || !credentials?.password || !credentials?.role) {
          return null;
        }

        // For demo purposes, we'll use predefined users based on role
        const demoUsers = {
          "platform_admin": {
            id: "1",
            name: "Platform Admin",
            email: "admin@origin-idp.com",
            role: "platform_admin",
            isPlatformAdmin: true,
          },
          "tenant_admin": {
            id: "2",
            name: "Tenant Admin",
            email: "tenant@origin-idp.com",
            role: "tenant_admin",
            isPlatformAdmin: false,
          },
          "product_owner": {
            id: "3",
            name: "Product Owner",
            email: "product@origin-idp.com",
            role: "product_owner",
            isPlatformAdmin: false,
          },
          "engineer": {
            id: "4",
            name: "Engineer",
            email: "engineer@origin-idp.com",
            role: "engineer",
            isPlatformAdmin: false,
          },
        };

        const user = demoUsers[credentials.role as keyof typeof demoUsers];
        
        if (user && credentials.email === user.email && credentials.password === "password") {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.isPlatformAdmin = user.isPlatformAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
        session.user.isPlatformAdmin = token.isPlatformAdmin as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

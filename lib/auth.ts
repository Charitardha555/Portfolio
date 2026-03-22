import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { prisma } from "@/lib/db";

const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  pages: {
    signIn: "/admin"
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? ""
    })
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.isAdmin = user.email?.toLowerCase() === adminEmail;
      }

      return session;
    }
  }
});

export type AppSession = DefaultSession & {
  user: DefaultSession["user"] & {
    id: string;
    isAdmin: boolean;
  };
};

export function isAuthorizedAdmin(email?: string | null) {
  return Boolean(email && adminEmail && email.toLowerCase() === adminEmail);
}

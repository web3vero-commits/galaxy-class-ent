import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ALLOWED = (process.env.ALLOWED_USERS || "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

const WORKSPACE_DOMAIN = process.env.GOOGLE_WORKSPACE_DOMAIN || "galaxyclassent.com";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
      authorization: {
        params: {
          // hd= forces Google to only show Workspace accounts on this domain
          hd: WORKSPACE_DOMAIN,
          prompt: "select_account",
        },
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 12 * 60 * 60 }, // 12h
  callbacks: {
    async signIn({ profile }: any) {
      const email = (profile?.email || "").toLowerCase();
      // Reject anything not on the Workspace domain
      if (!email.endsWith("@" + WORKSPACE_DOMAIN.toLowerCase()) && !ALLOWED.includes(email)) {
        return false;
      }
      // If allowlist defined, enforce it even within the domain
      if (ALLOWED.length && !ALLOWED.includes(email)) return false;
      return true;
    },
    async jwt({ token, profile }: any) {
      if (profile?.email) token.email = profile.email;
      return token;
    },
    async session({ session, token }: any) {
      if (token?.email) session.user = { ...session.user, email: token.email };
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";

import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import {
  CertificateType,
  DegreeType,
  Gender,
  GradeType,
  StudentStatus,
} from "@prisma/client";
import { GetUserEmailLib } from "./lib/user";
import { UserEmailLib } from "./types";

export type ExtendedUser = DefaultSession["user"] & {
  studentCode: string;
  isTwoFactorEnabled: boolean;
  status: StudentStatus;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.studentCode) {
          session.user.studentCode = token.studentCode as string;
        }
        if (token.status) {
          session.user.status = token.status as StudentStatus;
        }
        if (token.isTwoFactorEnabled) {
          session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        }
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.email || !token.sub) return token;

      const existingUser: UserEmailLib = await GetUserEmailLib(token.email);

      if (!existingUser) {
        return token;
      }

      token.sub = existingUser.id;
      token.studentCode = existingUser.studentCode;
      token.status = existingUser.status;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  ...authConfig,
});

import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/lib/db";
import { StudentStatus } from "@prisma/client";
import { LoginSchema } from "./schemas";

declare module "@auth/core/jwt" {
  interface JWT {
    student: {
      studentCode: string;
      status: StudentStatus;
    };
    isTwoFactorEnabled: boolean;
    emailVerified: Date;
  }
}

declare module "@auth/core/types" {
  interface User {
    emailVerified: Date;
    student: {
      studentCode: string;
      status: StudentStatus;
    };
    isTwoFactorEnabled: boolean;
  }
  interface Session {
    user: ExtendedUser;
    expires: string;
  }
}

export type ExtendedUser = DefaultSession["user"] & {
  emailVerified: Date;
  student: {
    studentCode: string;
    status: StudentStatus;
  };
  isTwoFactorEnabled: boolean;
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const req = await fetch(`${process.env.API_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const res = await req.json();

        if (res.error) {
          return null;
        }

        return {
          email: res.email,
          name: res.name,
          student: {
            studentCode: res.student.studentCode,
            status: res.student.status,
          },
          isTwoFactorEnabled: res.isTwoFactorEnabled,
          emailVerified: res.emailVerified,
          id: res.id,
        };
      },
    }),
  ],
  callbacks: {
    // @ts-ignore
    async jwt({ token, user }) {
      if (user && user.id && user.emailVerified) {
        return {
          ...token,
          emailVerified: user.emailVerified,
          name: user.name,
          picture: user.image,
          student: {
            studentCode: user.student.studentCode,
            status: user.student.status,
          },
          isTwoFactorEnabled: user.isTwoFactorEnabled,
          email: user.email,
          sub: user.id,
          iat: new Date(),
          exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days
        };
      } else if (token.exp && Date.now() < token.exp) {
        return token;
      } else {
        if (!token.sub || !token.emailVerified) {
          throw new Error("Invalid token");
        }

        const req = await fetch(
          `${process.env.API_URL}/api/accounts/${token.sub}`,
          { method: "GET" },
        );

        const res = await req.json();

        if (res.error) {
          throw new Error(res.error);
        }

        return {
          ...token,
          emailVerified: res.emailVerified,
          name: res.name,
          picture: res.image,
          student: {
            studentCode: res.student.studentCode,
            status: res.student.status,
          },
          isTwoFactorEnabled: res.isTwoFactorEnabled,
          email: res.email,
          sub: res.id,
          iat: new Date(),
          exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days
        };
      }
    },
    async session({ token, session }) {
      session.user.emailVerified = token.emailVerified;
      session.user.student = token.student;
      session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      session.user.email = token.email as string;
      session.user.id = token.sub as string;
      session.user.name = token.name as string;
      session.user.image = token.picture as string;
      session.userId = token.sub as string;

      return {
        ...session,
      };
    },
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
});

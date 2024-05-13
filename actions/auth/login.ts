"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const { email, password } = values;

    await signIn("credentials", {
      email,
      password,
      redirectTo: `${DEFAULT_LOGIN_REDIRECT}`,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid creadentials or not yet verified email!" };
        case "AccessDenied":
          return { success: "Confirmation email sent!" };
        case "CallbackRouteError":
          return { twoFactor: "Please use student id for login" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};

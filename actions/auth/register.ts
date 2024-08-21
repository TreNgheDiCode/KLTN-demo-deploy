"use server";

import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import { analytics } from "@/lib/analytics";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/auth/register`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const result = await res.json();

    if (result.error) {
      return { error: result.error };
    }

    await analytics.track(
      "register",
      {
        country: values.country,
        school: values.schoolName,
        program: values.programName,
        date: new Date().toISOString(),
      },
      { persist: true },
    );

    return {
      success:
        "Register successfully, please check your email for verification",
    };
  } catch (error) {
    console.log("REGISTER ERROR", error);

    return { error: "Register failed" };
  }
};

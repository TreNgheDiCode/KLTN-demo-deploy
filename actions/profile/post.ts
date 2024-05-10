"use server";

import { currentAccount } from "@/lib/account";
import { PostSchema } from "@/schemas";
import { z } from "zod";

export const CreatePost = async (values: z.infer<typeof PostSchema>) => {
  try {
    const user = await currentAccount();
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/accounts/students/profiles/${user?.studentCode}/posts`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      },
    );
    const res = await req.json();
    console.log(res);

    if (res.error) {
      console.log(res.error);
      return { error: res.error };
    }

    return { success: "Create new post successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Error creating new post" };
  }
};

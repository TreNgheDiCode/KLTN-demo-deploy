"use server";

import { auth } from "@/auth";
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

    if (res.error) {
      return { error: res.error };
    }

    return { success: "Create new post successfully" };
  } catch (error) {
    return { error: "Error creating new post" };
  }
};

export const deletePost = async (postId: string) => {
  try {
    const session = await auth();
    const studentCode = session?.user.studentCode;
    const reqUrl = `${process.env.NEXT_PUBLIC_API}/api/accounts/students/profiles/${studentCode}/posts/${postId}`;
    const req = await fetch(reqUrl, {
      method: "DELETE",
      cache: "no-store",
    });

    const res = await req.json();

    if (res) {
      return { success: "Xóa bài viết thành công" };
    }
  } catch (error) {
    return { error: "Xóa bài viết thất bại" };
  }
};

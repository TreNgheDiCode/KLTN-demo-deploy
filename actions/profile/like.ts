"use server";

import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
export const Like = async (postId: string) => {
  try {
    const session = await auth();
    const studentCode = session?.user.studentCode;
    const Url = `${process.env.NEXT_PUBLIC_API}/api/accounts/students/profiles/${studentCode}/posts/${postId}/like`;
    const reqUrl = await fetch(Url, {
      method: "GET",
    });
    const res = await reqUrl.json();
    return await res.json();
  } catch (error) {
    return { error: "Thích bài viết thất bại" };
  }
};

export const onDeleteListLike = async (likeId: string) => {
  try {
    const session = await auth();
    const requestUrl = `${process.env.NEXT_PUBLIC_API}/api/accounts/students/profiles/${session?.user.studentCode}/likes/${likeId}`;
    const respone = await fetch(requestUrl, {
      method: "DELETE",
    });

    return await respone.json();
  } catch (error) {
    console.log(error);
  }
};

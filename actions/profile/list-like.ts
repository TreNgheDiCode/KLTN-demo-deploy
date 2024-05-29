"use server";

import { auth } from "@/auth";

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

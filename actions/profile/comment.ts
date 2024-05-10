"use server";

import { db } from "@/lib/db";
import { GetAccountIdLib, currentAccount } from "@/lib/account";
import { CommentSchema } from "@/schemas";
import { z } from "zod";
import { auth } from "@/auth";
import { AccountIdLib } from "@/types";

export const Comment = async (
  values: z.infer<typeof CommentSchema>,
  id: string,
  parentCommentId?: string,
) => {
  try {
    const validatedFields = CommentSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid comment values" };
    }
    const session = await auth();

    if (!session?.user) {
      return { error: "User not found" };
    }
    const existingUser: AccountIdLib = await GetAccountIdLib(session.user.id!);

    if (!existingUser) {
      return { error: "User not found" };
    }
    if (!existingUser.student.profile) {
      return { error: "Profile not found" };
    }

    const { ...value } = validatedFields.data;

    const existingPost = await db.post.findUnique({
      where: {
        id,
      },
    });

    if (!existingPost) {
      return { error: "Post not found" };
    }

    const comment = await db.postComment.create({
      data: {
        postId: existingPost.id,
        content: value.content,
        profileId: existingUser.student.profile.id,
        parentCommentId: parentCommentId,
        isArchived: false,
        image: value.image,
      },
    });

    return { success: "Success" };
  } catch (error) {
    console.log(error);
    return { error: "Error while posting comment" };
  }
};

export const GetCommentsByParentId = async (
  postId: string,
  parentId: string,
) => {
  try {
    const comments = await db.postComment.findMany({
      where: {
        postId: postId,
        parentCommentId: parentId,
      },
      include: {
        likes: true,
        children: true,
      },
    });

    return comments;
  } catch {
    return null;
  }
};

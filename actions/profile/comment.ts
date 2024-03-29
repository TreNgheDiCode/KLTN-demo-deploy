"use server";

import { db } from "@/lib/db";
import { GetUserEmailLib, currentUser } from "@/lib/user";
import { CommentSchema } from "@/schemas";
import { z } from "zod";

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

    const user = await currentUser();

    if (!user) {
      return { error: "User not found" };
    }

    const existingUser = await GetUserEmailLib(user.email!);

    if (!existingUser) {
      return { error: "User not found" };
    }

    console.log(existingUser);

    if (!existingUser.profile) {
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
        profileId: existingUser.profile.id,
        parentCommentId: parentCommentId,
        isArchived: false,
      },
    });

    if (value.image) {
      await db.postCommentImage.create({
        data: {
          postCommentId: comment.id,
          url: value.image,
        },
      });
    }

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
        image: true,
        children: {
          select: {
            id: true,
          },
        },
      },
    });

    return comments;
  } catch {
    return null;
  }
};

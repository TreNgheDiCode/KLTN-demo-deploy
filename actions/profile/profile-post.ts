"use server";

import { db } from "@/lib/db";
import { GetAccountIdLib, currentAccount } from "@/lib/account";
import { PostSchema } from "@/schemas";
import { PostStatus } from "@prisma/client";
import { z } from "zod";

export const CreateNewProfilePost = async (
  values: z.infer<typeof PostSchema>,
) => {
  try {
    const validatedFields = PostSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid post values" };
    }

    const user = await currentAccount();

    if (!user) {
      return { error: "User not found" };
    }

    const existingUser = await GetAccountIdLib(user.email!);

    if (!existingUser) {
      return { error: "User not found" };
    }

    if (!existingUser.profile) {
      return { error: "Profile not found" };
    }

    const { images, ...value } = validatedFields.data;

    if (!value.status) {
      value.status = PostStatus.PUBLIC;
    }

    const post = await db.post.create({
      data: {
        profileId: existingUser.profile.id,
        ...value,
      },
      select: {
        id: true,
        images: true,
      },
    });

    if (!images) {
      return { success: "Create new post successfully" };
    } else {
      for (const image of images) {
        await db.postImage.create({
          data: {
            postId: post.id,
            url: image,
          },
        });
      }

      return { success: "Create new post successfully" };
    }
  } catch (error) {
    return { error: "Error occurred while creating new post" };
  }
};

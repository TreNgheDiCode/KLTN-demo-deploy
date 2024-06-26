"use server";

import { db } from "@/lib/db";
import { GetAccountIdLib } from "@/lib/account";
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

    console.log(existingUser.student.profile);
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
  } catch (error) {
    throw new Error("Không bình luận được");
  }
};
export const DeleteComment = async (id: string) => {
  try {
    const parentComment = await db.postComment.findUnique({
      where: {
        id: id,
      },
      include: {
        children: true,
        likes: true,
      },
    });
    if (!parentComment) {
      throw new Error("Không tìm thấy bình luận");
    }
    const childCmtLike = parentComment.likes.map((child) => child.id);
    const deleteCmtLike = await db.postCommentLike.deleteMany({
      where: {
        id: {
          in: childCmtLike,
        },
      },
    });
    if (!childCmtLike) {
      return {
        error: "Xóa lượt thích bình luận thất bại",
      };
    }
    const childCmt = parentComment.children.map((child) => child.id);
    const deleteChildCmt = await db.postComment.deleteMany({
      where: {
        id: {
          in: childCmt,
        },
      },
    });

    if (!deleteChildCmt) {
      return { error: "lỗi xóa bình luận thất bại" };
    }
    const deleteComment = await db.postComment.delete({
      where: {
        id: id,
      },
    });
    if (!deleteComment) {
      return { error: "Lỗi xóa bình luận thất bại" };
    }
    return { succses: "Xóa bình luận thành công" };
  } catch (error) {
    return { error: "Lỗi khi xóa bình luận" };
  }
};
export const LikeCmt = async (id: string) => {
  try {
    const session = await auth();
    const studentCode = session?.user.studentCode;
    const postComment = await db.postComment.findFirst({
      where: {
        id: id,
      },
    });
    if (!postComment) {
      return { error: "Không tìm thấy bình luận" };
    }
    const profile = await db.profile.findFirst({
      where: {
        student: {
          studentCode: studentCode,
        },
      },
    });
    if (!profile) {
      return { error: "Không tìm thấy thông tin sinh viên" };
    }
    const likeCmt = await db.postCommentLike.findUnique({
      where: {
        profileId_postCommentId: {
          profileId: profile.id,
          postCommentId: postComment.id,
        },
      },
    });
    if (likeCmt) {
      await db.postCommentLike.delete({
        where: {
          id: likeCmt.id,
        },
      });
      return { success: "Hủy thích bình luận thành công" };
    }
    await db.postCommentLike.create({
      data: {
        profileId: profile.id,
        postCommentId: postComment.id,
      },
    });
    return { success: "Thích bình luận thành công" };
  } catch (error) {
    return { error: "Thích bình luận thất bại" };
  }
};

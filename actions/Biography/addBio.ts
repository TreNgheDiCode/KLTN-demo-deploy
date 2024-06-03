"use server";
import { db } from "@/lib/db";

export const BiographyAdd = async (studentCode: string, content: string) => {
  try {
    const profile = await db.profile.findFirst({
      where: {
        student: {
          studentCode,
        },
      },
    });
    if (!profile) {
      return { error: "Khong tim thay profile" };
    }
    await db.profileBiography.create({
      data: {
        profileId: profile.id,
        content: content,
      },
    });
    return { success: "tao biography thanh cong" };
  } catch (error) {
    return { error: "tao biography that bai" };
  }
};

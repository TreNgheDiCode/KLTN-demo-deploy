"use server";
import { db } from "@/lib/db";
export const updateBiography = async (
  studentCode: string,
  contentBio: string,
) => {
  try {
    const profile = await db.profile.findFirst({
      where: {
        student: {
          studentCode,
        },
      },
    });

    if (!profile) {
      return { error: "Không tìm thấy sinh viên" };
    }

    const existingBio = await db.profileBiography.findUnique({
      where: {
        profileId: profile.id,
      },
    });

    if (!existingBio) {
      return { error: "Khong tim thay tieu su" };
    }

    await db.profileBiography.update({
      where: {
        id: existingBio.id,
      },
      data: {
        content: contentBio,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "update bio thất bại" };
  }
};

"use server";

import { getProfileByStudentCode } from "@/data/profile";
import { db } from "@/lib/db";

export const uploadProfileCoverImage = async (
  studentCode: string,
  url: string,
) => {
  try {
    const profile = await getProfileByStudentCode(studentCode);

    if (!profile) {
      return { error: "Profile not found" };
    }

    await db.student.update({
      where: {
        id: profile.id,
      },
      data: {
        cover: url,
      },
    });

    return { success: "Uploaded profile cover image successful" };
  } catch {
    return { error: "Error while uploading profile cover image" };
  }
};

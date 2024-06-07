import { db } from "@/lib/db";

export const getProfileByStudentCode = async (
  studentCode: string,
  url: string,
) => {
  try {
    const profile = await db.profile.findFirst({
      where: {
        student: {
          studentCode: studentCode,
        },
      },
    });
    if (!profile) {
      return { error: "Không tìm thấy profile" };
    }
    console.log(profile);

    const updateProfile = await db.student.update({
      where: {
        id: profile?.studentId,
      },
      data: {
        cover: url,
      },
    });
    if (!updateProfile) {
      return { error: "Lỗi khi update ảnh bìa" };
    }
    return { success: "Update ảnh bìa thành công" };
  } catch {
    return { error: "Lỗi api" };
  }
};

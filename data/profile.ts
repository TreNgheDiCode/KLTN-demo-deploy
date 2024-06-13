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
export const uploadAvatar = async (accountId: string, avatar: string) => {
  try {
    const updateProfile = await db.account.update({
      where: {
        id: accountId,
      },
      data: {
        image: avatar,
      },
    });
    if (!updateProfile) {
      return { error: "Lỗi khi update ảnh avatar" };
    }
    return { success: "Update ảnh avatar thành công" };
  } catch (error) {
    return { error: "Lỗi " };
  }
};

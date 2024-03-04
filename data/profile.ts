import { db } from "@/lib/db";
import { currentUser } from "@/lib/user";

export const getProfileByStudentCode = async (code: string) => {
  try {
    const session = await currentUser();
    const user = await db.user.findUnique({
      where: {
        id: session?.id,
        studentCode: code,
      },
    });

    if (!user) {
      return null;
    }

    const profile = await db.profile.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        status: true,
        coverImage: true,
        id: true,
      },
    });

    return profile;
  } catch {
    return null;
  }
};

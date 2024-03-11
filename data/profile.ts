import { db } from "@/lib/db";
import { currentAccount } from "@/lib/account";

export const getProfileByStudentCode = async (code: string) => {
  try {
    const session = await currentAccount();
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
        biography: true,
      },
    });

    return profile;
  } catch {
    return null;
  }
};

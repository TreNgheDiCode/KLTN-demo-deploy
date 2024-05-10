import { db } from "@/lib/db";
import { currentAccount } from "@/lib/account";

export const getProfileByStudentCode = async (code: string) => {
  try {
    const session = await currentAccount();
    const user = await db.account.findUnique({
      where: {
        id: session?.id,
      },
    });

    if (!user) {
      return null;
    }

    const profile = await db.profile.findUnique({
      where: {
        studentId: user.id,
      },
      select: {
        status: true,
        id: true,
        biography: true,
      },
    });

    return profile;
  } catch {
    return null;
  }
};

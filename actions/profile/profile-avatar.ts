"use server";

import { uploadAvatar } from "@/data/profile";

export const uploadProfileAvatar = async (accountId: string, image: string) => {
  try {
    const profile = await uploadAvatar(accountId, image);
    return profile;
  } catch {
    return { error: "Error" };
  }
};

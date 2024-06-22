"use server";

import { getProfileByStudentCode } from "@/data/profile";

export const uploadProfileCoverImage = async (
  studentCode: string,
  url: string,
) => {
  try {
    const profile = await getProfileByStudentCode(studentCode, url);
    return profile;
  } catch {
    return { error: "Error while uploading profile cover image" };
  }
};

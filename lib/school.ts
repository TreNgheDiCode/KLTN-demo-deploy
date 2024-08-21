import { SchoolLib } from "@/types";

export const GetSchoolLib = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/auth/schools`, {
      method: "GET",
      cache: "no-cache",
    });
    const schools = await res.json();

    return schools as SchoolLib;
  } catch (error) {
    return null;
  }
};

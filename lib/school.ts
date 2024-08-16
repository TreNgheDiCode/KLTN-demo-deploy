import { SchoolLib } from "@/types";

export const GetSchoolLib = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/schools`, {
      method: "GET",
      cache: "no-cache",
    });

    const { schools } = await res.json();

    return schools as SchoolLib;
  } catch (error) {
    return null;
  }
};

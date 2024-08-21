"use server";

import { SchoolAuth } from "@/types/school";

export const GetSchoolsAuth = async () => {
  const schools = await fetch(`${process.env.API_URL}/api/auth/schools`, {
    method: "GET",
    cache: "no-cache",
  });

  const res = await schools.json();

  if (res.length === 0) {
    return [];
  }

  return res.schools as SchoolAuth[];
};

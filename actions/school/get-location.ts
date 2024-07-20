import { School } from "@prisma/client";

const getLocation = async (schoolId: string): Promise<School> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/schools/${schoolId}/locations`,
  );

  if (!res.ok) {
    throw new Error(`Lỗi HTTP! Trạng thái: ${res.status}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new TypeError("LỐi, chúng ta không nhận được JSON!");
  }

  return res.json();
};

export default getLocation;

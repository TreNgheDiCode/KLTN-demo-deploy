import { NameSchool } from "@/types";

export const GetNameSchools = async (): Promise<NameSchool[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/nameSchools`, {
      method: "GET",
      cache: "no-cache",
    });
    // Kiểm tra mã trạng thái HTTP
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};

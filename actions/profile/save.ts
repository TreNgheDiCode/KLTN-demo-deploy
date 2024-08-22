"use server";
import { auth } from "@/auth";
export const Save = async (postId: string) => {
  try {
    const session = await auth();
    const studentCode = session?.user.student.studentCode;
    const Url = `${process.env.NEXT_PUBLIC_API}/api/accounts/students/profiles/${studentCode}/posts/${postId}/save`;
    const reqUrl = await fetch(Url, {
      method: "GET",
    });
    const res = await reqUrl.json();
    return await res.json;
  } catch (error) {
    return { error: "Lưu bài viết thất bại" };
  }
};

export const onDeleteListSave = async (saveId: string) => {
  try {
    const session = await auth();
    const requestUrl = `${process.env.NEXT_PUBLIC_API}/api/accounts/students/profiles/${session?.user.student.studentCode}/save/${saveId}`;
    const res = await fetch(requestUrl, {
      method: "DELETE",
    });
    return await res.json();
  } catch (error) {
    return { error: "Xóa bài lưu thất bại" };
  }
};

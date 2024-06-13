"use server";
export const updateBiography = async (bioId: String, content: string) => {
  try {
    const Url = `${process.env.NEXT_PUBLIC_API}/api/profile/Bio/${bioId}`;
    const reqUrl = await fetch(Url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    const res = await reqUrl.json();
    return res;
  } catch (error) {
    return { error: "Lỗi khi update Bio" };
  }
};

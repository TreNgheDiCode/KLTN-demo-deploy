"use server";
export const updateAddress = async (accountId: String, address: string) => {
  try {
    const Url = `${process.env.NEXT_PUBLIC_API}/api/accounts/${accountId}`;
    const fetchUrl = await fetch(Url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    });
    const res = await fetchUrl.json();
    return res;
  } catch (error) {
    return { error: "Lỗi khi update address" };
  }
};
